import { MsEdgeTTS, OUTPUT_FORMAT } from 'msedge-tts';

const ttsCache = new Map();
const inFlightTts = new Map();

function sanitizeTtsText(rawText, lang) {
  let s = String(rawText || '');
  if (lang === 'vi') {
    s = s
      .replace(/&/g, ' và ')
      .replace(/Antigravity IDE/gi, 'An-ti-gra-vi-ti I-D-E')
      .replace(/Antigravity/gi, 'An-ti-gra-vi-ti')
      .replace(/\bagy\b/gi, 'a-gờ-i')
      .replace(/CLI/g, 'C-L-I')
      .replace(/IDE/g, 'I-D-E')
      .replace(/VS Code/gi, 'V-S Code')
      .replace(/Cursor/gi, 'Cơ-sơ')
      .replace(/Claude/gi, 'Clo')
      .replace(/PostgreSQL/gi, 'Pốt-gre S-Q-L')
      .replace(/Passkeys?/gi, 'Pát-ki')
      .replace(/2FA/gi, 'hai lớp')
      .replace(/Phishing/gi, 'lừa đảo trực tuyến')
      .replace(/Zero-Trust/gi, 'bảo mật toàn diện')
      .replace(/Workspace/gi, 'Guốc-x-pây')
      .replace(/PowerPoint/gi, 'Pao-ơ-poi')
      .replace(/Canva/gi, 'Can-va')
      .replace(/Excel/gi, 'Ếch-xen')
      .replace(/Copilot/gi, 'Cô-pai-lớt')
      .replace(/XLOOKUP/gi, 'Ích-lúc-cấp')
      .replace(/Ctrl\+I/gi, 'Ctrl I');
  } else {
    s = s.replace(/&/g, ' and ');
  }

  return s
    .replace(/[&<>"'`[\]{}()\\/|•✦▶✓⚠—–]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

async function synthesizeBuffer(text, lang) {
  const voice = lang === 'en' ? 'en-US-GuyNeural' : 'vi-VN-NamMinhNeural';
  const cacheKey = `${voice}::${text}`;

  if (ttsCache.has(cacheKey)) {
    return ttsCache.get(cacheKey);
  }
  if (inFlightTts.has(cacheKey)) {
    return inFlightTts.get(cacheKey);
  }

  const promise = (async () => {
    try {
      const tts = new MsEdgeTTS();
      await tts.setMetadata(
        voice,
        OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3
      );

      const buffer = await new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          try {
            tts.close?.();
          } catch {
            // ignore
          }
          reject(new Error('TTS timeout'));
        }, 9000);

        try {
          const { audioStream } = tts.toStream(text);
          const chunks = [];
          audioStream.on('data', (c) => chunks.push(c));
          audioStream.on('end', () => {
            clearTimeout(timeout);
            try {
              tts.close?.();
            } catch {
              // ignore
            }
            resolve(Buffer.concat(chunks));
          });
          audioStream.on('error', (err) => {
            clearTimeout(timeout);
            try {
              tts.close?.();
            } catch {
              // ignore
            }
            reject(err);
          });
        } catch (err) {
          clearTimeout(timeout);
          reject(err);
        }
      });

      if (ttsCache.size > 200) {
        const first = ttsCache.keys().next().value;
        ttsCache.delete(first);
      }
      ttsCache.set(cacheKey, buffer);
      return buffer;
    } finally {
      inFlightTts.delete(cacheKey);
    }
  })();

  inFlightTts.set(cacheKey, promise);
  return promise;
}

export default async function handler(req, res) {
  try {
    const lang = req.query.lang === 'en' ? 'en' : 'vi';
    const rawText = String(req.query.text || '').trim().slice(0, 1800);
    const text = sanitizeTtsText(rawText, lang);

    if (!text) {
      return res.status(400).json({ error: 'Missing text parameter' });
    }

    const buffer = await synthesizeBuffer(text, lang);
    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Content-Length', buffer.length);
    res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=86400');
    return res.status(200).send(buffer);
  } catch (err) {
    return res.status(500).json({ error: err.message || 'TTS Error' });
  }
}

