import React from 'react';
import { Mail, ExternalLink } from 'lucide-react';
import { CONTACT_INFO, PILLARS } from '../data/coursesData';
import { BrandLogo } from './BrandLogos';
import { useLanguage } from '../context/LanguageContext';

export default function Footer({ onSelectPillar, onGoHome }) {
  const { lang, t } = useLanguage();

  return (
    <footer className="bg-[#0B1120] text-slate-300 border-t border-slate-800/80 pt-10 pb-6">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 pb-8 border-b border-slate-800/80 items-start">
          {/* Col 1: Brand & Description (4 cols) */}
          <div className="lg:col-span-4 space-y-3.5">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                if (onGoHome) {
                  onGoHome();
                } else {
                  onSelectPillar('all');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              title="Về trang chủ 5S AI Education"
              className="inline-flex items-center bg-white rounded-xl px-3.5 py-2 shadow-sm hover:scale-[1.02] transition-transform cursor-pointer"
            >
              <img
                src="/logo-5s.png"
                alt="5S AI Education"
                className="h-9 sm:h-10 w-auto object-contain"
              />
            </a>

            <p className="text-xs text-slate-400 leading-relaxed pr-2">
              {t.footer.desc}
            </p>
          </div>

          {/* Col 2: 3 Core Pillars (3 cols) */}
          <div className="lg:col-span-3 space-y-2.5">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-white">
              {t.footer.colPillars}
            </h4>
            <ul className="space-y-2 text-xs">
              {PILLARS.map((p) => (
                <li key={p.id}>
                  <button
                    onClick={() => {
                      onSelectPillar(p.id);
                      document
                        .getElementById('courses-catalog')
                        ?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-left text-slate-400 hover:text-sky-400 transition leading-relaxed"
                  >
                    {lang === 'en' ? p.nameEn : p.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Levels & Segments (2 cols) */}
          <div className="lg:col-span-2 space-y-2.5">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-white">
              {t.footer.colLevels}
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>{t.footer.levelBeginner}</li>
              <li>{t.footer.levelIntermediate}</li>
              <li>{t.footer.levelAdvanced}</li>
              <li>{t.footer.forStudents}</li>
            </ul>
          </div>

          {/* Col 4: Official Contact Channels (3 cols - Full text, no truncation) */}
          <div className="lg:col-span-3 space-y-2.5">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-white">
              {t.contact.panelTitle}
            </h4>
            <div className="space-y-2 text-xs">
              <a
                href={CONTACT_INFO.zaloUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-white font-bold transition"
              >
                <BrandLogo
                  brand="zalo"
                  className="w-4 h-4 rounded-sm shrink-0"
                />
                <span>Zalo: {CONTACT_INFO.phoneDisplay}</span>
              </a>

              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-slate-200 font-semibold transition"
              >
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <span className="break-all leading-snug">
                  {CONTACT_INFO.email}
                </span>
              </a>

              <a
                href={CONTACT_INFO.fanpageUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between gap-2 px-3 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-slate-200 font-semibold transition"
              >
                <div className="flex items-center gap-2.5">
                  <BrandLogo
                    brand="facebook"
                    className="w-4 h-4 rounded-sm shrink-0"
                  />
                  <span>{CONTACT_INFO.companyName}</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Row (Padded on right to avoid floating buttons) */}
        <div className="pt-5 pr-14 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <div>{t.footer.copyright}</div>
          <div className="text-slate-500">
            5S AI Education • Google Security • AI Coding • Applied Office AI
          </div>
        </div>
      </div>
    </footer>
  );
}
