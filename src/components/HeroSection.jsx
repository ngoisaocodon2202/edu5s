import React from 'react';
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  GraduationCap,
  School,
  Building2,
  UserCheck,
  Landmark,
  Lock,
  Unlock,
  SlidersHorizontal,
  LayoutDashboard,
} from 'lucide-react';
import { USER_ROLES, AUDIENCES } from '../data/coursesData';
import { BrandLogo, ScrollReveal } from './BrandLogos';
import CustomDropdown from './CustomDropdown';
import { useLanguage } from '../context/LanguageContext';

export default function HeroSection({
  user,
  onOpenAuth,
  onSelectPillar,
  onRoleChange,
  onOpenAdmin,
  onOpenDashboard,
  activeAudience = 'all',
  onSelectAudience,
  stats,
}) {
  const { lang, t } = useLanguage();
  const currentRole = user
    ? USER_ROLES.find((r) => r.id === user.role) || USER_ROLES[0]
    : null;

  const isAdmin = user?.role === 'admin';

  const roleDropdownOptions = USER_ROLES.map((r) => ({
    value: r.id,
    label: lang === 'en' ? r.shortLabelEn : r.shortLabel,
    sublabel: lang === 'en' ? r.labelEn : r.label,
    badge:
      r.id === 'student'
        ? 'FREE'
        : r.id === 'business'
        ? 'B2B'
        : r.id === 'campus'
        ? 'CREDIT'
        : undefined,
  }));

  // Logged-in Personalized Workspace Banner
  if (user) {
    return (
      <section className="relative bg-gradient-to-r from-[#0B1120] via-[#0F2557] to-[#0056D2] text-white py-8 sm:py-12 border-b border-blue-900/50">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-500/20 text-sky-300 border border-sky-400/30 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  {t.hero.personalizedBadge}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-200 border border-blue-400/30">
                  {t.hero.rolePrefix}{' '}
                  {isAdmin
                    ? 'Administrator'
                    : lang === 'en'
                    ? currentRole?.labelEn
                    : currentRole?.label}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight">
                {t.hero.welcomeBack}{' '}
                <span className="text-sky-300">{user.name}</span>! 👋
              </h1>

              <p className="text-blue-100/90 text-sm sm:text-base max-w-3xl leading-relaxed">
                {lang === 'en'
                  ? currentRole?.descriptionEn
                  : currentRole?.description}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                {!isAdmin && onOpenDashboard && (
                  <button
                    type="button"
                    onClick={() => onOpenDashboard()}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-sky-400 to-[#0056D2] hover:from-sky-300 hover:to-[#0046AD] text-white font-extrabold text-xs sm:text-sm shadow-lg transition"
                  >
                    <LayoutDashboard className="w-4 h-4 text-sky-100" />
                    <span>{t.nav.myDashboard}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}

                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3.5 sm:px-4 py-2 rounded-xl border border-white/15">
                  <Unlock className="w-4 h-4 text-sky-300 shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold">
                    <strong className="text-white">
                      {stats.freeCount} {t.hero.freeBasicCount}
                    </strong>{' '}
                    ({t.hero.learnNow})
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3.5 sm:px-4 py-2 rounded-xl border border-white/15">
                  <Lock className="w-4 h-4 text-blue-300 shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold">
                    <strong className="text-white">
                      {stats.paidCount} {t.hero.advancedCount}
                    </strong>{' '}
                    ({t.hero.unlockPaid})
                  </span>
                </div>
                {isAdmin && (
                  <button
                    onClick={onOpenAdmin}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-extrabold text-xs sm:text-sm shadow-lg transition"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>{t.nav.adminBtn}</span>
                  </button>
                )}
              </div>
            </div>

            {/* Right: Combobox Quick Role Switcher */}
            {!isAdmin && (
              <div className="lg:col-span-4 bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 shadow-xl">
                <div className="text-xs font-bold uppercase tracking-wider text-sky-300 mb-1.5">
                  {t.hero.comboboxBoxTitle}
                </div>
                <p className="text-xs text-blue-100 mb-3">
                  {t.hero.comboboxBoxDesc}
                </p>
                <CustomDropdown
                  value={user.role}
                  onChange={(val) => onRoleChange(val)}
                  options={roleDropdownOptions}
                  prefixLabel={t.hero.filteringByRole}
                  icon={SlidersHorizontal}
                  variant="hero"
                  align="right"
                />
                <div className="mt-3 pt-3 border-t border-white/15 flex items-center justify-between text-xs text-blue-100">
                  <span>{t.hero.needB2bSupport}</span>
                  <a
                    href="https://zalo.me/0862034101"
                    target="_blank"
                    rel="noreferrer"
                    className="text-sky-300 hover:underline font-bold"
                  >
                    {t.hero.contactZalo5S}
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  // Guest Hero Banner (Coursera-inspired with Unified Royal & Cyber Blue System)
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F0F7FF] via-white to-[#F8FAFC] pt-6 pb-12 lg:pt-12 lg:pb-16 border-b border-blue-100">
      {/* Subtle Ambient Background Accents */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -left-24 w-80 h-80 rounded-full bg-sky-400/10 blur-3xl pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column */}
          <ScrollReveal
            direction="left"
            className="lg:col-span-7 space-y-5 sm:space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#0056D2] text-xs font-extrabold tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{t.hero.guestBadge}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-[44px] font-extrabold text-slate-900 tracking-tight leading-[1.18]">
              {t.hero.guestTitleLine1}{' '}
              <span className="text-[#0056D2]">
                {t.hero.guestTitleHighlight}
              </span>{' '}
              {t.hero.guestTitleLine2}
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed max-w-2xl">
              {t.hero.guestDesc}
            </p>

            {/* 3 Core Pillars Interactive Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <button
                onClick={() => {
                  onSelectPillar('google-security');
                  document
                    .getElementById('courses-catalog')
                    ?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="p-3.5 rounded-2xl bg-white border border-blue-100 hover:border-[#0056D2] shadow-sm hover:shadow-md transition text-left group"
              >
                <div className="flex items-center gap-2 font-bold text-slate-900 group-hover:text-[#0056D2] text-xs sm:text-sm">
                  <BrandLogo brand="google" className="w-5 h-5" />
                  <span>Google & Security</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  {t.hero.pillar1Sub}
                </p>
              </button>

              <button
                onClick={() => {
                  onSelectPillar('ai-coding');
                  document
                    .getElementById('courses-catalog')
                    ?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="p-3.5 rounded-2xl bg-white border border-blue-100 hover:border-[#0056D2] shadow-sm hover:shadow-md transition text-left group"
              >
                <div className="flex items-center gap-2 font-bold text-slate-900 group-hover:text-[#0056D2] text-xs sm:text-sm">
                  <BrandLogo brand="antigravity" className="w-5 h-5" />
                  <span>AI Coding</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  {t.hero.pillar2Sub}
                </p>
              </button>

              <button
                onClick={() => {
                  onSelectPillar('ai-office');
                  document
                    .getElementById('courses-catalog')
                    ?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="p-3.5 rounded-2xl bg-white border border-blue-100 hover:border-[#0056D2] shadow-sm hover:shadow-md transition text-left group"
              >
                <div className="flex items-center gap-2 font-bold text-slate-900 group-hover:text-[#0056D2] text-xs sm:text-sm">
                  <BrandLogo brand="excel" className="w-5 h-5" />
                  <span>Applied Office AI</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  {t.hero.pillar3Sub}
                </p>
              </button>
            </div>

            {/* Primary CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <button
                onClick={() => onOpenAuth('register', 'student')}
                className="px-6 sm:px-7 py-3.5 sm:py-4 bg-gradient-to-r from-[#0056D2] to-[#0284C7] hover:from-[#0046AD] hover:to-[#0369A1] text-white font-extrabold rounded-xl shadow-lg shadow-blue-600/25 transition flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <span>{t.hero.ctaRegisterRole}</span>
                <ArrowRight className="w-5 h-5 shrink-0" />
              </button>

              <button
                onClick={() => {
                  document
                    .getElementById('courses-catalog')
                    ?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3.5 sm:py-4 bg-white hover:bg-blue-50/50 text-[#0056D2] font-bold rounded-xl border-2 border-[#0056D2] transition flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <span>{t.hero.ctaExploreCatalog}</span>
              </button>
            </div>

            {/* Key Trust Metrics */}
            <div className="pt-2 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-500 font-semibold">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#0056D2] shrink-0" />
                <span>{t.hero.stat3Pillars}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#0056D2] shrink-0" />
                <span>{t.hero.stat3Levels}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#0056D2] shrink-0" />
                <span>{t.hero.statPostgres}</span>
              </div>
            </div>

            {/* 5 Audience Segments Switcher (Coursera Benchmark) */}
            <div className="pt-3 border-t border-slate-200/80">
              <div className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#0056D2]" />
                <span>5 PHÂN HỆ ĐÀO TẠO CHUẨN COURSERA (BẤM ĐỂ KHÁM PHÁ):</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {AUDIENCES.map((aud) => (
                  <button
                    key={aud.id}
                    type="button"
                    onClick={() => {
                      if (onSelectAudience) onSelectAudience(aud.id);
                      document.getElementById('courses-catalog')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border shadow-2xs ${
                      activeAudience === aud.id
                        ? 'bg-[#0056D2] text-white border-[#0056D2] shadow-sm'
                        : 'bg-white hover:bg-blue-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    <span>{lang === 'en' ? aud.shortEn : aud.short}</span>
                    <span
                      className={`text-[9px] px-1.5 py-0.5 rounded font-extrabold ${
                        activeAudience === aud.id
                          ? 'bg-white/20 text-white'
                          : 'bg-slate-100 text-[#0056D2]'
                      }`}
                    >
                      {lang === 'en' ? aud.badgeEn : aud.badge}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column: Visual Ecosystem Showcase */}
          <ScrollReveal direction="right" delay={150} className="lg:col-span-5">
            <div className="relative bg-white rounded-3xl p-5 sm:p-6 shadow-2xl shadow-blue-900/10 border border-blue-100 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3.5 gap-2">
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#0056D2]">
                    {t.hero.showcaseHeader}
                  </span>
                  <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                    Google • Antigravity • Cursor • Claude • Office
                  </h3>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-[#0056D2] border border-blue-200 whitespace-nowrap">
                  {t.hero.showcaseBadge}
                </span>
              </div>

              {/* Pillar 1 Showcase Card */}
              <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-blue-100 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-white shadow-sm">
                      <BrandLogo brand="google" className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-sm font-extrabold text-slate-900">
                        {t.hero.card1Title}
                      </div>
                      <div className="text-xs text-slate-500">
                        {t.hero.card1Sub}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold bg-white text-slate-700 border border-slate-200">
                    <BrandLogo brand="google" className="w-3.5 h-3.5" /> Google
                    Workspace
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold bg-white text-slate-700 border border-slate-200">
                    <BrandLogo brand="drive" className="w-3.5 h-3.5" /> Drive
                    Cloud
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold bg-white text-slate-700 border border-slate-200">
                    <BrandLogo brand="chrome" className="w-3.5 h-3.5" /> Safe
                    Setup & 2FA
                  </span>
                </div>
              </div>

              {/* Pillar 2 Showcase Card */}
              <div className="p-4 rounded-2xl bg-[#F0F7FF] border border-blue-200/80 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-white shadow-sm">
                      <BrandLogo brand="antigravity" className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-sm font-extrabold text-slate-900">
                        {t.hero.card2Title}
                      </div>
                      <div className="text-xs text-slate-600">
                        {t.hero.card2Sub}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-white border border-blue-100 text-xs font-bold text-slate-800 shadow-sm">
                    <BrandLogo
                      brand="antigravity"
                      className="w-4 h-4 shrink-0"
                    />
                    <span className="truncate">Google Antigravity</span>
                  </div>
                  <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-white border border-blue-100 text-xs font-bold text-slate-800 shadow-sm">
                    <BrandLogo brand="vscode" className="w-4 h-4 shrink-0" />
                    <span className="truncate">VS Code</span>
                  </div>
                  <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-white border border-blue-100 text-xs font-bold text-slate-800 shadow-sm">
                    <BrandLogo brand="claude" className="w-4 h-4 shrink-0" />
                    <span className="truncate">Claude AI</span>
                  </div>
                  <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-white border border-blue-100 text-xs font-bold text-slate-800 shadow-sm">
                    <BrandLogo brand="cursor" className="w-4 h-4 shrink-0" />
                    <span className="truncate">Cursor IDE</span>
                  </div>
                </div>
              </div>

              {/* Pillar 3 Showcase Card */}
              <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-blue-100 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-white shadow-sm">
                      <BrandLogo brand="excel" className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-sm font-extrabold text-slate-900">
                        {t.hero.card3Title}
                      </div>
                      <div className="text-xs text-slate-500">
                        {t.hero.card3Sub}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold bg-white text-slate-700 border border-slate-200">
                    <BrandLogo brand="powerpoint" className="w-3.5 h-3.5" />{' '}
                    PowerPoint AI
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold bg-white text-slate-700 border border-slate-200">
                    <BrandLogo brand="canva" className="w-3.5 h-3.5" /> Canva
                    Magic Studio
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold bg-white text-slate-700 border border-slate-200">
                    <BrandLogo brand="excel" className="w-3.5 h-3.5" /> Excel AI
                    & Copilot
                  </span>
                </div>
              </div>

              {/* Bottom Student Free Access Callout */}
              <div className="p-3.5 rounded-2xl bg-[#0B1120] text-white flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <GraduationCap className="w-5 h-5 text-sky-400 shrink-0" />
                  <div className="text-xs truncate">
                    <strong className="text-sky-300">
                      {t.hero.studentBannerTitle}
                    </strong>{' '}
                    {t.hero.studentBannerDesc}
                  </div>
                </div>
                <button
                  onClick={() => onOpenAuth('register', 'student')}
                  className="px-3 py-1.5 rounded-lg bg-[#0056D2] hover:bg-[#0284C7] text-white font-bold text-xs shrink-0 transition whitespace-nowrap"
                >
                  {t.hero.studentBannerBtn}
                </button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
