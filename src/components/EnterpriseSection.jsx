import React from 'react';
import { Building2, ArrowRight, Phone, Mail } from 'lucide-react';
import { CONTACT_INFO } from '../data/coursesData';
import { BrandLogo, ScrollReveal } from './BrandLogos';
import { useLanguage } from '../context/LanguageContext';

export default function EnterpriseSection({ onOpenAuth }) {
  const { t } = useLanguage();

  return (
    <section id="enterprise-section" className="py-8 sm:py-12 bg-[#F8FAFC]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up">
          <div className="relative rounded-3xl bg-gradient-to-r from-[#0B1120] via-[#0F2557] to-[#0056D2] text-white p-6 sm:p-8 lg:p-10 shadow-xl overflow-hidden border border-blue-900/40">
            {/* Subtle Ambient Glow */}
            <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-sky-400/15 blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
              {/* Left 8 Columns: Concise Info & 3 Compact Pillar Chips */}
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 border border-sky-400/30 text-sky-300 text-[11px] font-extrabold uppercase tracking-wider">
                  <Building2 className="w-3.5 h-3.5 shrink-0" />
                  <span>{t.enterprise.badge}</span>
                </div>

                <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight leading-snug">
                  {t.enterprise.titleLine1}{' '}
                  <span className="text-sky-300">
                    {t.enterprise.titleHighlight}
                  </span>
                </h2>

                <p className="text-blue-100/85 text-xs sm:text-sm leading-relaxed max-w-2xl">
                  {t.enterprise.desc}
                </p>

                {/* 3 Compact Horizontal Pills */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                  <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15">
                    <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center shrink-0">
                      <BrandLogo brand="google" className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-white leading-snug">
                      {t.enterprise.pkg1Title}
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15">
                    <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center shrink-0">
                      <BrandLogo brand="excel" className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-white leading-snug">
                      {t.enterprise.pkg2Title}
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15">
                    <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center shrink-0">
                      <BrandLogo brand="antigravity" className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-white leading-snug">
                      {t.enterprise.pkg3Title}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right 4 Columns: Clean Compact Action Card */}
              <div className="lg:col-span-4 bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 space-y-3.5">
                <div className="text-[11px] font-extrabold uppercase tracking-wider text-sky-300">
                  {t.enterprise.contactBoxHeader}
                </div>

                <div className="space-y-2 text-xs">
                  <a
                    href={CONTACT_INFO.zaloUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 hover:bg-slate-900/90 border border-white/10 transition"
                  >
                    <span className="flex items-center gap-2 text-blue-100 font-semibold">
                      <BrandLogo
                        brand="zalo"
                        className="w-4 h-4 rounded-sm shrink-0"
                      />
                      <span>Zalo B2B:</span>
                    </span>
                    <strong className="text-sky-300 font-extrabold">
                      {CONTACT_INFO.phoneDisplay}
                    </strong>
                  </a>

                  <a
                    href={`mailto:${CONTACT_INFO.email}`}
                    className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-slate-900/60 hover:bg-slate-900/90 border border-white/10 transition"
                  >
                    <span className="flex items-center gap-2 text-blue-100 font-semibold shrink-0">
                      <Mail className="w-3.5 h-3.5 text-sky-300 shrink-0" />
                      <span>Email:</span>
                    </span>
                    <strong className="text-white font-bold text-[11px] truncate">
                      {CONTACT_INFO.email}
                    </strong>
                  </a>
                </div>

                <button
                  onClick={() => onOpenAuth('register', 'business')}
                  className="w-full py-3 px-4 bg-white hover:bg-sky-50 text-[#0056D2] font-extrabold rounded-xl shadow-md transition flex items-center justify-center gap-2 text-xs sm:text-sm"
                >
                  <span>{t.enterprise.requestQuoteBtn}</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
