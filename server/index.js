import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { initDatabase, getDbInfo } from './db.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

function mapCourseRow(row) {
  return {
    id: row.id,
    pillar: row.pillar,
    level: row.level,
    title: row.title,
    titleEn: row.title_en || row.title,
    provider: row.provider || '5S AI Education',
    duration: row.duration || '10 giờ học',
    durationEn: row.duration_en || '10 hours',
    lessons: Number(row.lessons || 12),
    rating: Number(row.rating || 5.0),
    reviews: Number(row.reviews || 1),
    isFree: Boolean(row.is_free),
    freeForStudent: Boolean(row.free_for_student),
    freeForBusiness: Boolean(row.free_for_business),
    isB2BReady: Boolean(row.is_b2b_ready),
    price: Number(row.price || 0),
    oldPrice: Number(row.old_price || 0),
    tools: Array.isArray(row.tools) ? row.tools : [],
    skills: Array.isArray(row.skills) ? row.skills : [],
    skillsEn: Array.isArray(row.skills_en) ? row.skills_en : [],
    thumbnail:
      row.thumbnail ||
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    description: row.description || '',
    descriptionEn: row.description_en || row.description || '',
    syllabus: Array.isArray(row.syllabus) ? row.syllabus : [],
    createdAt: row.created_at,
  };
}

function mapUserRow(row) {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    role: row.role,
    roleLabel: row.role_label || row.role,
    googleId: row.google_id || null,
    avatar:
      row.avatar ||
      (row.name ? row.name.trim().charAt(0).toUpperCase() : 'U'),
    unlockedCourses: Array.isArray(row.unlocked_courses)
      ? row.unlocked_courses
      : [],
    createdAt: row.created_at,
  };
}

function mapArticleRow(row) {
  return {
    id: row.id,
    category: row.category,
    categoryEn: row.category_en || row.category,
    readTime: row.read_time || '5 phút đọc',
    readTimeEn: row.read_time_en || '5 min read',
    title: row.title,
    titleEn: row.title_en || row.title,
    excerpt: row.excerpt || '',
    excerptEn: row.excerpt_en || row.excerpt || '',
    image: row.image,
    createdAt: row.created_at,
  };
}

// Health & DB Status
app.get('/api/health', async (req, res) => {
  try {
    const db = await initDatabase();
    await db.query('SELECT 1');
    res.json({ status: 'ok', database: getDbInfo() });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// Bootstrap initial data from PostgreSQL
app.get('/api/bootstrap', async (req, res) => {
  try {
    const db = await initDatabase();
    const [coursesRes, articlesRes, settingsRes] = await Promise.all([
      db.query('SELECT * FROM courses ORDER BY is_free DESC, id ASC'),
      db.query('SELECT * FROM articles ORDER BY created_at DESC'),
      db.query('SELECT value FROM system_settings WHERE key = $1', [
        'sepay_config',
      ]),
    ]);

    const sepayConfig = settingsRes.rows[0]?.value || {
      bankName: 'MBBank',
      accountNumber: '789220206',
      accountName: 'CONG TY PHAT TRIEN CONG NGHE 5S',
      template: 'compact2',
      webhookUrl: '/api/webhooks/sepay',
      autoApprove: true,
    };

    res.json({
      courses: coursesRes.rows.map(mapCourseRow),
      articles: articlesRes.rows.map(mapArticleRow),
      sepayConfig,
      dbInfo: getDbInfo(),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==================== AUTHENTICATION APIs ====================

app.post('/api/auth/register', async (req, res) => {
  try {
    const db = await initDatabase();
    const { name, email, password, role, roleLabel } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: 'Vui lòng điền đầy đủ Họ tên, Email và Mật khẩu.' });
    }
    const cleanEmail = email.trim().toLowerCase();
    const existing = await db.query('SELECT id FROM users WHERE email = $1', [
      cleanEmail,
    ]);
    if (existing.rows.length > 0) {
      return res
        .status(409)
        .json({ error: 'Email này đã được đăng ký. Vui lòng đăng nhập.' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const avatar = name.trim().charAt(0).toUpperCase();
    const insertRes = await db.query(
      `INSERT INTO users (name, email, password_hash, role, role_label, avatar, unlocked_courses)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [
        name.trim(),
        cleanEmail,
        passwordHash,
        role || 'student',
        roleLabel || 'Học sinh / Sinh viên',
        avatar,
        JSON.stringify([]),
      ]
    );

    res.json({ user: mapUserRow(insertRes.rows[0]) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const db = await initDatabase();
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: 'Vui lòng nhập đầy đủ Email và Mật khẩu.' });
    }
    const cleanEmail = email.trim().toLowerCase();
    const result = await db.query('SELECT * FROM users WHERE email = $1', [
      cleanEmail,
    ]);
    if (result.rows.length === 0) {
      return res
        .status(401)
        .json({ error: 'Tài khoản không tồn tại. Vui lòng đăng ký trước.' });
    }

    const userRow = result.rows[0];
    const valid = await bcrypt.compare(password, userRow.password_hash);
    if (!valid && password !== userRow.password_hash) {
      return res
        .status(401)
        .json({ error: 'Mật khẩu không chính xác. Vui lòng kiểm tra lại.' });
    }

    res.json({ user: mapUserRow(userRow) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/auth/google', async (req, res) => {
  try {
    const db = await initDatabase();
    const { name, email, googleId, role, roleLabel } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Thiếu thông tin email Google.' });
    }
    const cleanEmail = email.trim().toLowerCase();
    const existing = await db.query('SELECT * FROM users WHERE email = $1', [
      cleanEmail,
    ]);

    if (existing.rows.length > 0) {
      const row = existing.rows[0];
      if (role && row.role !== 'admin') {
        const updated = await db.query(
          `UPDATE users SET role = $1, role_label = $2, google_id = COALESCE(google_id, $3) WHERE id = $4 RETURNING *`,
          [role, roleLabel || row.role_label, googleId || 'google-oauth', row.id]
        );
        return res.json({ user: mapUserRow(updated.rows[0]) });
      }
      return res.json({ user: mapUserRow(row) });
    }

    const displayName = name || cleanEmail.split('@')[0];
    const avatar = displayName.trim().charAt(0).toUpperCase();
    const hash = await bcrypt.hash(googleId || `google_${Date.now()}`, 10);
    const created = await db.query(
      `INSERT INTO users (name, email, password_hash, role, role_label, google_id, avatar, unlocked_courses)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [
        displayName,
        cleanEmail,
        hash,
        role || 'student',
        roleLabel || 'Học sinh / Sinh viên',
        googleId || 'google-oauth',
        avatar,
        JSON.stringify([]),
      ]
    );
    res.json({ user: mapUserRow(created.rows[0]) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==================== COURSES CRUD APIs ====================

app.get('/api/courses', async (req, res) => {
  try {
    const db = await initDatabase();
    const result = await db.query(
      'SELECT * FROM courses ORDER BY created_at DESC'
    );
    res.json({ courses: result.rows.map(mapCourseRow) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/courses', async (req, res) => {
  try {
    const db = await initDatabase();
    const c = req.body;
    const id = c.id || `course-${Date.now()}`;
    const isFree = Boolean(c.isFree);
    const price = isFree ? 0 : Number(c.price || 0);
    const oldPrice = isFree ? 0 : Number(c.oldPrice || price * 1.5);

    const result = await db.query(
      `INSERT INTO courses (
        id, pillar, level, title, title_en, provider, duration, duration_en,
        lessons, rating, reviews, is_free, free_for_student, free_for_business,
        is_b2b_ready, price, old_price, tools, skills, skills_en,
        thumbnail, description, description_en, syllabus
      ) VALUES (
        $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24
      ) RETURNING *`,
      [
        id,
        c.pillar || 'ai-coding',
        c.level || 'beginner',
        c.title,
        c.titleEn || c.title,
        c.provider || '5S AI Education',
        c.duration || '10 giờ học',
        c.durationEn || '10 hours',
        Number(c.lessons || (Array.isArray(c.syllabus) ? c.syllabus.length : 12)),
        Number(c.rating || 5.0),
        Number(c.reviews || 120),
        isFree,
        Boolean(c.freeForStudent),
        Boolean(c.freeForBusiness),
        Boolean(c.isB2BReady),
        price,
        oldPrice,
        JSON.stringify(Array.isArray(c.tools) ? c.tools : []),
        JSON.stringify(Array.isArray(c.skills) ? c.skills : []),
        JSON.stringify(
          Array.isArray(c.skillsEn) && c.skillsEn.length > 0
            ? c.skillsEn
            : Array.isArray(c.skills)
            ? c.skills
            : []
        ),
        c.thumbnail ||
          'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
        c.description || '',
        c.descriptionEn || c.description || '',
        JSON.stringify(Array.isArray(c.syllabus) ? c.syllabus : []),
      ]
    );

    res.json({ course: mapCourseRow(result.rows[0]) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/courses/:id', async (req, res) => {
  try {
    const db = await initDatabase();
    const { id } = req.params;
    const c = req.body;
    const isFree = Boolean(c.isFree);
    const price = isFree ? 0 : Number(c.price || 0);
    const oldPrice = isFree ? 0 : Number(c.oldPrice || 0);

    const result = await db.query(
      `UPDATE courses SET
        pillar = $1, level = $2, title = $3, title_en = $4, provider = $5,
        duration = $6, duration_en = $7, lessons = $8, is_free = $9,
        free_for_student = $10, free_for_business = $11, is_b2b_ready = $12,
        price = $13, old_price = $14, tools = $15, skills = $16, skills_en = $17,
        thumbnail = $18, description = $19, description_en = $20, syllabus = $21,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $22 RETURNING *`,
      [
        c.pillar || 'ai-coding',
        c.level || 'beginner',
        c.title,
        c.titleEn || c.title,
        c.provider || '5S AI Education',
        c.duration || '10 giờ học',
        c.durationEn || '10 hours',
        Number(c.lessons || (Array.isArray(c.syllabus) ? c.syllabus.length : 12)),
        isFree,
        Boolean(c.freeForStudent),
        Boolean(c.freeForBusiness),
        Boolean(c.isB2BReady),
        price,
        oldPrice,
        JSON.stringify(Array.isArray(c.tools) ? c.tools : []),
        JSON.stringify(Array.isArray(c.skills) ? c.skills : []),
        JSON.stringify(Array.isArray(c.skillsEn) ? c.skillsEn : []),
        c.thumbnail,
        c.description || '',
        c.descriptionEn || c.description || '',
        JSON.stringify(Array.isArray(c.syllabus) ? c.syllabus : []),
        id,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Không tìm thấy khóa học.' });
    }
    res.json({ course: mapCourseRow(result.rows[0]) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/courses/:id', async (req, res) => {
  try {
    const db = await initDatabase();
    await db.query('DELETE FROM courses WHERE id = $1', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==================== USERS MANAGEMENT APIs ====================

app.get('/api/users', async (req, res) => {
  try {
    const db = await initDatabase();
    const result = await db.query(
      'SELECT * FROM users ORDER BY created_at DESC'
    );
    res.json({ users: result.rows.map(mapUserRow) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/users/:id', async (req, res) => {
  try {
    const db = await initDatabase();
    const { id } = req.params;
    const { name, role, roleLabel, unlockedCourses } = req.body;
    const current = await db.query('SELECT * FROM users WHERE id = $1', [id]);
    if (current.rows.length === 0) {
      return res.status(404).json({ error: 'Không tìm thấy người dùng.' });
    }
    const row = current.rows[0];
    const updated = await db.query(
      `UPDATE users SET
        name = $1,
        role = $2,
        role_label = $3,
        unlocked_courses = $4
      WHERE id = $5 RETURNING *`,
      [
        name !== undefined ? name : row.name,
        role !== undefined ? role : row.role,
        roleLabel !== undefined ? roleLabel : row.role_label,
        unlockedCourses !== undefined
          ? JSON.stringify(unlockedCourses)
          : JSON.stringify(row.unlocked_courses || []),
        id,
      ]
    );
    res.json({ user: mapUserRow(updated.rows[0]) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/users/:id', async (req, res) => {
  try {
    const db = await initDatabase();
    await db.query('DELETE FROM users WHERE id = $1', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==================== SEPAY ORDERS & WEBHOOK APIs ====================

app.get('/api/orders', async (req, res) => {
  try {
    const db = await initDatabase();
    const result = await db.query(
      'SELECT * FROM orders ORDER BY created_at DESC'
    );
    res.json({ orders: result.rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/orders', async (req, res) => {
  try {
    const db = await initDatabase();
    const { userId, userName, userEmail, courseId, courseTitle, amount } =
      req.body;

    const settingsRes = await db.query(
      'SELECT value FROM system_settings WHERE key = $1',
      ['sepay_config']
    );
    const sepay = settingsRes.rows[0]?.value || {
      bankName: 'MBBank',
      accountNumber: '789220206',
      accountName: 'CONG TY PHAT TRIEN CONG NGHE 5S',
    };

    const orderCode = `5SAI${Date.now().toString().slice(-7)}`;
    const insertRes = await db.query(
      `INSERT INTO orders (
        order_code, user_id, user_name, user_email, course_id, course_title,
        amount, bank_name, account_number, status
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,'pending') RETURNING *`,
      [
        orderCode,
        userId || null,
        userName || 'Học viên',
        userEmail || '',
        courseId,
        courseTitle,
        Number(amount || 0),
        sepay.bankName || 'MBBank',
        sepay.accountNumber || '789220206',
      ]
    );

    const order = insertRes.rows[0];
    const qrUrl = `https://qr.sepay.vn/img?bank=${encodeURIComponent(
      order.bank_name
    )}&acc=${encodeURIComponent(
      order.account_number
    )}&template=compact2&amount=${order.amount}&des=${encodeURIComponent(
      order.order_code
    )}`;

    res.json({ order, qrUrl, sepay });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/orders/:orderCode', async (req, res) => {
  try {
    const db = await initDatabase();
    const result = await db.query(
      'SELECT * FROM orders WHERE order_code = $1',
      [req.params.orderCode]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Không tìm thấy đơn hàng.' });
    }
    res.json({ order: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

async function approveOrderInDb(db, orderRow, transactionId = 'ADMIN_APPROVED') {
  const updatedOrder = await db.query(
    `UPDATE orders SET status = 'paid', sepay_transaction_id = $1, paid_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *`,
    [transactionId, orderRow.id]
  );

  // Unlock course for user in PostgreSQL
  if (orderRow.user_id || orderRow.user_email) {
    const userRes = orderRow.user_id
      ? await db.query('SELECT * FROM users WHERE id = $1', [orderRow.user_id])
      : await db.query('SELECT * FROM users WHERE email = $1', [
          orderRow.user_email,
        ]);

    if (userRes.rows.length > 0) {
      const u = userRes.rows[0];
      const currentUnlocked = Array.isArray(u.unlocked_courses)
        ? u.unlocked_courses
        : [];
      if (!currentUnlocked.includes(orderRow.course_id)) {
        const nextUnlocked = [...currentUnlocked, orderRow.course_id];
        await db.query(
          'UPDATE users SET unlocked_courses = $1 WHERE id = $2',
          [JSON.stringify(nextUnlocked), u.id]
        );
      }
    }
  }
  return updatedOrder.rows[0];
}

app.put('/api/orders/:id/approve', async (req, res) => {
  try {
    const db = await initDatabase();
    const result = await db.query('SELECT * FROM orders WHERE id = $1', [
      req.params.id,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Không tìm thấy đơn hàng.' });
    }
    const order = await approveOrderInDb(
      db,
      result.rows[0],
      req.body?.transactionId || `SEPAY_${Date.now()}`
    );
    res.json({ order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Official SePay Webhook Endpoint
app.post('/api/webhooks/sepay', async (req, res) => {
  try {
    const db = await initDatabase();
    const payload = req.body || {};
    const content = String(
      payload.content || payload.description || ''
    ).toUpperCase();
    const transferAmount = Number(payload.transferAmount || payload.amount || 0);
    const match = content.match(/5SAI\d+/);

    if (!match) {
      return res.json({
        success: false,
        message: 'No matching 5SAI order code found in transfer content',
      });
    }

    const orderCode = match[0];
    const orderRes = await db.query(
      'SELECT * FROM orders WHERE order_code = $1',
      [orderCode]
    );
    if (orderRes.rows.length === 0) {
      return res.json({ success: false, message: 'Order not found' });
    }

    const orderRow = orderRes.rows[0];
    if (transferAmount >= Number(orderRow.amount)) {
      const updated = await approveOrderInDb(
        db,
        orderRow,
        String(payload.id || payload.referenceCode || `SEPAY_WH_${Date.now()}`)
      );
      return res.json({ success: true, order: updated });
    }

    res.json({
      success: false,
      message: 'Transfer amount is less than order amount',
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ==================== ARTICLES & SETTINGS APIs ====================

app.post('/api/articles', async (req, res) => {
  try {
    const db = await initDatabase();
    const a = req.body;
    const id = a.id || `art-${Date.now()}`;
    const result = await db.query(
      `INSERT INTO articles (id, category, category_en, read_time, read_time_en, title, title_en, excerpt, excerpt_en, image)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *`,
      [
        id,
        a.category || 'Chuyên sâu AI',
        a.categoryEn || a.category || 'AI Deep Dive',
        a.readTime || '5 phút đọc',
        a.readTimeEn || '5 min read',
        a.title,
        a.titleEn || a.title,
        a.excerpt || '',
        a.excerptEn || a.excerpt || '',
        a.image ||
          'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
      ]
    );
    res.json({ article: mapArticleRow(result.rows[0]) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/articles/:id', async (req, res) => {
  try {
    const db = await initDatabase();
    await db.query('DELETE FROM articles WHERE id = $1', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/settings/sepay', async (req, res) => {
  try {
    const db = await initDatabase();
    const value = req.body;
    await db.query(
      `INSERT INTO system_settings (key, value, updated_at)
       VALUES ('sepay_config', $1, CURRENT_TIMESTAMP)
       ON CONFLICT (key) DO UPDATE SET value = $1, updated_at = CURRENT_TIMESTAMP`,
      [JSON.stringify(value)]
    );
    res.json({ sepayConfig: value });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==================== NEURAL MALE VOICEOVER TTS API ====================
const ttsCache = new Map();
const inFlightTts = new Map();
const warmTtsSlot = { vi: null, en: null };

async function createTtsInstance(lang) {
  const voice = lang === 'en' ? 'en-US-GuyNeural' : 'vi-VN-NamMinhNeural';
  const { MsEdgeTTS, OUTPUT_FORMAT } = await import('msedge-tts');
  const tts = new MsEdgeTTS();
  await tts.setMetadata(
    voice,
    OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3
  );
  return { tts, createdAt: Date.now() };
}

function replenishWarmSlot(lang) {
  if (!warmTtsSlot[lang]) {
    warmTtsSlot[lang] = createTtsInstance(lang).catch(() => {
      warmTtsSlot[lang] = null;
      return null;
    });
  }
}

async function acquireTtsInstance(lang) {
  const existingPromise = warmTtsSlot[lang];
  warmTtsSlot[lang] = null;
  if (existingPromise) {
    const item = await existingPromise;
    // Only reuse warm socket if it was created less than 20s ago (before Edge idle timeout)
    if (item && item.tts && Date.now() - item.createdAt < 20000) {
      return item.tts;
    }
    try {
      item?.tts?.close?.();
    } catch {
      // ignore
    }
  }
  const fresh = await createTtsInstance(lang);
  return fresh.tts;
}

// Pre-warm both Vietnamese and English Male TTS sockets on server startup
replenishWarmSlot('vi');
replenishWarmSlot('en');

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

  // Strip any XML/SSML-breaking characters (&, <, >, quotes, brackets, slashes)
  return s
    .replace(/[&<>"'`[\]{}()\\/|•✦▶✓⚠—–]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

async function synthesizeSpeechBuffer(text, lang) {
  const voice = lang === 'en' ? 'en-US-GuyNeural' : 'vi-VN-NamMinhNeural';
  const cacheKey = `${voice}::${text}`;
  if (ttsCache.has(cacheKey)) {
    return ttsCache.get(cacheKey);
  }
  if (inFlightTts.has(cacheKey)) {
    return inFlightTts.get(cacheKey);
  }

  const runOnce = async () => {
    const tts = await acquireTtsInstance(lang);
    replenishWarmSlot(lang);
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        try {
          tts.close?.();
        } catch {
          // ignore
        }
        reject(new Error('TTS synthesis timeout'));
      }, 9000);

      try {
        const { audioStream } = tts.toStream(text);
        const chunks = [];
        audioStream.on('data', (chunk) => chunks.push(chunk));
        audioStream.on('end', () => {
          clearTimeout(timeout);
          try {
            tts.close?.();
          } catch {
            // ignore
          }
          const buffer = Buffer.concat(chunks);
          if (buffer.length === 0) {
            reject(new Error('Empty audio buffer'));
          } else {
            resolve(buffer);
          }
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
  };

  const promise = (async () => {
    try {
      let buffer;
      try {
        buffer = await runOnce();
      } catch {
        buffer = await runOnce();
      }
      if (ttsCache.size > 400) {
        const firstKey = ttsCache.keys().next().value;
        ttsCache.delete(firstKey);
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

app.get('/api/tts', async (req, res) => {
  try {
    const lang = req.query.lang === 'en' ? 'en' : 'vi';
    const rawText = String(req.query.text || '').trim().slice(0, 1800);
    const text = sanitizeTtsText(rawText, lang);
    if (!text) {
      return res.status(400).json({ error: 'Missing text' });
    }

    const buffer = await synthesizeSpeechBuffer(text, lang);
    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Content-Length', buffer.length);
    res.setHeader('Accept-Ranges', 'bytes');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    return res.send(buffer);
  } catch (err) {
    if (!res.headersSent) {
      res.status(500).json({ error: err.message });
    }
  }
});

const PORT = parseInt(process.env.PORT || '3001', 10);

initDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `[5S AI Backend] Server running at http://localhost:${PORT} (PostgreSQL synced)`
      );
    });
  })
  .catch((err) => {
    console.error('[5S AI Backend] Failed to initialize database:', err);
  });

