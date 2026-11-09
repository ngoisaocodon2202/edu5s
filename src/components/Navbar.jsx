import React, { useState } from 'react';
import {
  Search,
  ChevronDown,
  Menu,
  X,
  LogOut,
  ShieldCheck,
  Code2,
  Briefcase,
  GraduationCap,
  Building2,
  UserCheck,
  School,
  Landmark,
  SlidersHorizontal,
  ArrowRight,
  LayoutGrid,
  LayoutDashboard,
} from 'lucide-react';
import { PILLARS, USER_ROLES, AUDIENCES, CONTACT_INFO } from '../data/coursesData';
import CustomDropdown from './CustomDropdown';
import { useLanguage, LanguageSwitcher } from '../context/LanguageContext';

export default function Navbar({
  user,
  activeAudience = 'all',
  onSelectAudience,
  selectedPillar,
  onSelectPillar,
  searchQuery,
  onSearchChange,
  onOpenAuth,
  onLogout,
  onRoleChange,
  onOpenAdmin,
  onOpenDashboard,
  onGoHome,
}) {
  const { lang, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);

  const currentRoleObj = user
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

  const getPillarIcon = (id) => {
    if (id === 'google-security')
      return <ShieldCheck className="w-5 h-5 text-[#0056D2]" />;
    if (id === 'ai-coding')
      return <Code2 className="w-5 h-5 text-[#0284C7]" />;
    return <Briefcase className="w-5 h-5 text-[#0EA5E9]" />;
  };

  const handleAudienceClick = (audienceId) => {
    if (onSelectAudience) {
      onSelectAudience(audienceId);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-blue-100/80 shadow-[0_2px_20px_-4px_rgba(0,86,210,0.08)]">
      {/* Top Executive Audience Switcher Bar (Coursera 5-Audience Benchmark) */}
      <div className="bg-gradient-to-r from-[#0B1120] via-[#0F1E3A] to-[#0B1120] text-slate-300 text-xs border-b border-slate-800/80">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-9">
          <div className="flex items-center space-x-1 sm:space-x-1.5 overflow-x-auto no-scrollbar">
            {/* 1. Student */}
            <button
              type="button"
              onClick={() => handleAudienceClick('student')}
              className={`px-2.5 py-1.5 rounded-t-md font-semibold transition flex items-center gap-1.5 whitespace-nowrap ${
                activeAudience === 'student' || user?.role === 'student'
                  ? 'bg-white text-[#0284C7] shadow-sm'
                  : 'hover:text-white text-slate-300'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5 text-sky-400" />
              <span>{t.nav.forStudent}</span>
            </button>

            {/* 2. Campus */}
            <button
              type="button"
              onClick={() => handleAudienceClick('campus')}
              className={`px-2.5 py-1.5 rounded-t-md font-semibold transition flex items-center gap-1.5 whitespace-nowrap ${
                activeAudience === 'campus' || user?.role === 'campus'
                  ? 'bg-white text-[#312E81] shadow-sm'
                  : 'hover:text-white text-slate-300'
              }`}
            >
              <School className="w-3.5 h-3.5 text-indigo-400" />
              <span>{t.nav.forCampus}</span>
            </button>

            {/* 3. Individual */}
            <button
              type="button"
              onClick={() => handleAudienceClick('individual')}
              className={`px-2.5 py-1.5 rounded-t-md font-semibold transition flex items-center gap-1.5 whitespace-nowrap ${
                activeAudience === 'individual' || user?.role === 'individual' || user?.role?.startsWith('individual')
                  ? 'bg-white text-[#0056D2] shadow-sm'
                  : 'hover:text-white text-slate-300'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5 text-sky-400" />
              <span>{t.nav.forIndividual}</span>
            </button>

            {/* 4. Business */}
            <button
              type="button"
              onClick={() => handleAudienceClick('business')}
              className={`px-2.5 py-1.5 rounded-t-md font-semibold transition flex items-center gap-1.5 whitespace-nowrap ${
                activeAudience === 'business' || user?.role === 'business'
                  ? 'bg-white text-[#065F46] shadow-sm'
                  : 'hover:text-white text-slate-300'
              }`}
            >
              <Building2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t.nav.forBusiness}</span>
            </button>

            {/* 5. Government */}
            <button
              type="button"
              onClick={() => handleAudienceClick('government')}
              className={`px-2.5 py-1.5 rounded-t-md font-semibold transition flex items-center gap-1.5 whitespace-nowrap ${
                activeAudience === 'government' || user?.role === 'government'
                  ? 'bg-white text-[#581C87] shadow-sm'
                  : 'hover:text-white text-slate-300'
              }`}
            >
              <Landmark className="w-3.5 h-3.5 text-purple-400" />
              <span>{t.nav.forGovernment}</span>
            </button>
          </div>

          <div className="hidden md:flex items-center space-x-3 text-[11px]">
            <a
              href={CONTACT_INFO.zaloUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-800/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 transition whitespace-nowrap"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
              <img
                src="/zalo-icon.png"
                alt="Zalo"
                className="w-3.5 h-3.5 rounded-sm object-contain"
              />
              <span>{t.nav.hotlineLabel}</span>
              <strong className="text-white font-bold">
                {CONTACT_INFO.phoneDisplay}
              </strong>
            </a>
            <span className="text-slate-700">|</span>
            <a
              href="#enterprise-section"
              className="text-sky-400 hover:text-sky-300 font-semibold transition flex items-center gap-1 whitespace-nowrap"
            >
              <span>{t.nav.b2bConsult}</span>
              <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px] gap-2.5 lg:gap-4">
          {/* Left: Official 5S AI Education Logo & Explore */}
          <div className="flex items-center gap-2.5 lg:gap-4 shrink-0">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                setExploreOpen(false);
                if (onGoHome) {
                  onGoHome();
                } else {
                  onSelectPillar('all');
                  onSearchChange('');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              title="Về trang chủ 5S AI Education"
              className="flex items-center group focus:outline-none shrink-0 cursor-pointer"
            >
              <img
                src="/logo-5s.png"
                alt="5S AI Education"
                className="h-10 sm:h-12 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.03]"
              />
            </a>

            {/* Explore Mega Dropdown */}
            <div
              className="relative hidden md:block"
              onMouseEnter={() => setExploreOpen(true)}
              onMouseLeave={() => setExploreOpen(false)}
            >
              <button
                type="button"
                className={`px-3.5 py-2 rounded-xl font-bold text-xs lg:text-sm flex items-center gap-1.5 transition-all whitespace-nowrap ${
                  exploreOpen
                    ? 'bg-[#0056D2] text-white shadow-md shadow-blue-600/20'
                    : 'bg-[#F0F7FF] text-[#0056D2] hover:bg-[#E0EFFE] border border-blue-200/70'
                }`}
              >
                <LayoutGrid className="w-4 h-4 shrink-0" />
                <span>{t.nav.explore}</span>
                <ChevronDown
                  className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
                    exploreOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {exploreOpen && (
                <div className="absolute left-0 top-full pt-2.5 w-[420px] z-50">
                  <div className="bg-white rounded-2xl shadow-2xl border border-slate-200/90 p-4 space-y-2">
                    <div className="flex items-center justify-between px-3 py-1.5">
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                        {t.nav.exploreSubtitle}
                      </span>
                      <span className="text-[10px] font-bold text-[#0056D2] bg-blue-50 px-2 py-0.5 rounded-full">
                        5S AI Curriculum
                      </span>
                    </div>
                    {PILLARS.map((pillar) => (
                      <button
                        key={pillar.id}
                        onClick={() => {
                          onSelectPillar(pillar.id);
                          setExploreOpen(false);
                          const el = document.getElementById('courses-catalog');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="w-full text-left p-3 rounded-xl hover:bg-blue-50/60 transition flex items-start gap-3.5 group border border-transparent hover:border-blue-100"
                      >
                        <div className="p-2.5 rounded-xl bg-slate-50 group-hover:bg-white group-hover:shadow-sm transition shrink-0">
                          {getPillarIcon(pillar.id)}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 group-hover:text-[#0056D2] text-sm">
                            {lang === 'en' ? pillar.nameEn : pillar.name}
                          </div>
                          <div className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                            {lang === 'en'
                              ? pillar.subtitleEn
                              : pillar.subtitle}
                          </div>
                        </div>
                      </button>
                    ))}
                    <div className="pt-2 border-t border-slate-100">
                      <button
                        onClick={() => {
                          onSelectPillar('all');
                          setExploreOpen(false);
                          const el = document.getElementById('courses-catalog');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="w-full py-2.5 text-center text-xs font-extrabold text-[#0056D2] hover:bg-blue-50 rounded-xl transition flex items-center justify-center gap-1"
                      >
                        <span>{t.nav.viewAllCourses}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Center: Search Bar */}
          <div className="flex-1 max-w-md hidden sm:block">
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder={t.nav.searchPlaceholder}
                className="w-full pl-10 pr-20 py-2 bg-slate-50/90 hover:bg-white focus:bg-white border border-slate-200/90 rounded-full text-xs lg:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0056D2] focus:ring-4 focus:ring-[#0056D2]/10 transition-all shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-14 text-slate-400 hover:text-slate-600 p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                onClick={() => {
                  const el = document.getElementById('courses-catalog');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="absolute right-1.5 px-3 py-1 bg-[#0056D2] text-white rounded-full hover:bg-[#00419e] transition text-xs font-bold shadow-sm whitespace-nowrap"
              >
                {t.nav.searchBtn}
              </button>
            </div>
          </div>

          {/* Right: Language Switcher + Admin / Auth / User Controls */}
          <div className="hidden lg:flex items-center gap-2.5 shrink-0">
            <LanguageSwitcher variant="light" />

            {!user ? (
              <>
                <a
                  href="#why-learn-section"
                  className="px-2.5 py-2 text-xs xl:text-sm font-semibold text-slate-600 hover:text-[#0056D2] rounded-lg hover:bg-slate-50 transition whitespace-nowrap"
                >
                  {t.nav.whyLearn}
                </a>
                <a
                  href="#articles-section"
                  className="px-2.5 py-2 text-xs xl:text-sm font-semibold text-slate-600 hover:text-[#0056D2] rounded-lg hover:bg-slate-50 transition whitespace-nowrap"
                >
                  {t.nav.articles}
                </a>
                <div className="h-5 w-px bg-slate-200 mx-0.5" />
                <button
                  onClick={() => onOpenAuth('login')}
                  className="px-3.5 py-2 text-xs xl:text-sm font-bold text-[#0056D2] hover:bg-blue-50 rounded-xl transition whitespace-nowrap"
                >
                  {t.nav.login}
                </button>
                <button
                  onClick={() => onOpenAuth('register')}
                  className="px-4 py-2 text-xs xl:text-sm font-bold text-white bg-gradient-to-r from-[#0056D2] to-[#0284C7] hover:from-[#0046AD] hover:to-[#0369A1] rounded-xl shadow-md shadow-blue-600/20 transition flex items-center gap-1.5 whitespace-nowrap"
                >
                  <span>{t.nav.joinFree}</span>
                  <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                </button>
              </>
            ) : (
              <div className="flex items-center gap-2 shrink-0">
                {isAdmin ? (
                  <button
                    onClick={onOpenAdmin}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0B1120] hover:bg-[#0056D2] text-white font-bold text-xs shadow-md transition whitespace-nowrap"
                  >
                    <LayoutDashboard className="w-3.5 h-3.5 text-sky-400" />
                    <span>{t.nav.adminBtn}</span>
                  </button>
                ) : (
                  <CustomDropdown
                    value={user.role}
                    onChange={(val) => onRoleChange(val)}
                    options={roleDropdownOptions}
                    prefixLabel={t.nav.viewingRole}
                    icon={SlidersHorizontal}
                    variant="navbar"
                  />
                )}

                {/* User Profile Pill */}
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200/90 shrink-0">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#0056D2] to-[#0284C7] text-white font-extrabold text-xs flex items-center justify-center shadow-sm shrink-0">
                    {user.avatar || 'U'}
                  </div>
                  <div className="text-left leading-tight">
                    <div className="text-xs font-bold text-slate-900 whitespace-nowrap max-w-[110px] truncate">
                      {user.name}
                    </div>
                    <div className="text-[10px] font-semibold text-[#0056D2] whitespace-nowrap">
                      {isAdmin
                        ? 'Administrator'
                        : lang === 'en'
                        ? currentRoleObj?.badgeEn
                        : currentRoleObj?.badge}
                    </div>
                  </div>
                </div>

                {/* Prominent My Dashboard Button */}
                {!isAdmin && onOpenDashboard && (
                  <button
                    onClick={onOpenDashboard}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#0056D2] to-[#0284C7] hover:from-[#0046AD] hover:to-[#0369A1] text-white font-bold text-xs shadow-md transition whitespace-nowrap"
                  >
                    <LayoutDashboard className="w-3.5 h-3.5 text-sky-200" />
                    <span>{t.nav.myDashboard}</span>
                  </button>
                )}

                {/* Logout Button */}
                <button
                  onClick={onLogout}
                  title={t.nav.logout}
                  className="px-3 py-2 text-xs font-bold text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-xl border border-slate-200/80 hover:border-red-200 transition flex items-center gap-1.5 shrink-0 whitespace-nowrap"
                >
                  <LogOut className="w-3.5 h-3.5 shrink-0" />
                  <span>{t.nav.logout}</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Right Controls */}
          <div className="flex lg:hidden items-center gap-2">
            <LanguageSwitcher variant="light" />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 border border-slate-200/70"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 px-4 pt-3 pb-6 space-y-4 shadow-xl max-h-[82vh] overflow-y-auto">
          {/* Mobile Search */}
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={t.nav.searchPlaceholder}
              className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-[#0056D2]"
            />
          </div>

          {user && !isAdmin && (
            <div className="space-y-2">
              <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-200">
                <label className="block text-xs font-bold text-[#0056D2] mb-1.5">
                  {t.nav.selectRoleHeader}:
                </label>
                <CustomDropdown
                  value={user.role}
                  onChange={(val) => {
                    onRoleChange(val);
                    setMobileMenuOpen(false);
                  }}
                  options={roleDropdownOptions}
                  variant="form"
                />
              </div>

              {onOpenDashboard && (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenDashboard();
                  }}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#0056D2] to-[#0284C7] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md"
                >
                  <LayoutDashboard className="w-4 h-4 text-sky-200" />
                  <span>{t.nav.myDashboard}</span>
                </button>
              )}
            </div>
          )}

          {isAdmin && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="w-full py-3 rounded-xl bg-[#0B1120] text-white font-bold text-sm flex items-center justify-center gap-2"
            >
              <LayoutDashboard className="w-4 h-4 text-sky-400" />
              <span>{t.nav.adminBtn}</span>
            </button>
          )}

          <div className="space-y-1">
            <div className="text-xs font-bold uppercase text-slate-400 px-2">
              {t.nav.exploreSubtitle}
            </div>
            {PILLARS.map((pillar) => (
              <button
                key={pillar.id}
                onClick={() => {
                  onSelectPillar(pillar.id);
                  setMobileMenuOpen(false);
                  const el = document.getElementById('courses-catalog');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-blue-50 text-sm font-semibold text-slate-800 flex items-center gap-2.5"
              >
                {getPillarIcon(pillar.id)}
                <span>{lang === 'en' ? pillar.nameEn : pillar.name}</span>
              </button>
            ))}
          </div>

          {!user ? (
            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth('login');
                }}
                className="w-full py-2.5 text-sm font-bold text-[#0056D2] border border-[#0056D2] rounded-xl"
              >
                {t.nav.login}
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth('register');
                }}
                className="w-full py-2.5 text-sm font-bold text-white bg-[#0056D2] rounded-xl"
              >
                {t.nav.joinFree}
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#0056D2] text-white font-bold text-xs flex items-center justify-center">
                  {user.avatar || 'U'}
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">
                    {user.name}
                  </div>
                  <div className="text-[11px] text-[#0056D2] font-semibold">
                    {user.email}
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onLogout();
                }}
                className="px-3 py-1.5 text-xs font-bold text-red-600 bg-red-50 rounded-lg"
              >
                {t.nav.logout}
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
