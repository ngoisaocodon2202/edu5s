import React, { useState, useMemo, useEffect, useCallback } from 'react';
import {
  Filter,
  Layers,
  GraduationCap,
  SearchX,
  LayoutDashboard,
} from 'lucide-react';
import {
  PILLARS,
  LEVELS,
  USER_ROLES,
  DEFAULT_SEPAY_CONFIG,
} from './data/coursesData';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import WhyLearnSection from './components/WhyLearnSection';
import CourseCard from './components/CourseCard';
import EnterpriseSection from './components/EnterpriseSection';
import { CourseDetailModal, ClassroomModal } from './components/CourseModals';
import AuthModal from './components/AuthModal';
import AdminDashboard from './components/AdminDashboard';
import FloatingContact from './components/FloatingContact';
import ScrollToTopButton from './components/ScrollToTopButton';
import Footer from './components/Footer';
import { BrandLogo, ScrollReveal } from './components/BrandLogos';
import { useLanguage } from './context/LanguageContext';
import { api } from './services/api';

export default function App() {
  const { lang, t } = useLanguage();

  // Persistent User State
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('eduai_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Purchased / Unlocked course IDs
  const [unlockedIds, setUnlockedIds] = useState(() => {
    try {
      const saved = localStorage.getItem('eduai_unlocked');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Live Data from PostgreSQL (eduai_5s)
  const [courses, setCourses] = useState([]);
  const [articles, setArticles] = useState([]);
  const [sepayConfig, setSepayConfig] = useState(DEFAULT_SEPAY_CONFIG);

  // Admin Dashboard View Toggle
  const [showAdmin, setShowAdmin] = useState(false);

  // Catalog Filters
  const [selectedPillar, setSelectedPillar] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals State
  const [authModal, setAuthModal] = useState({
    open: false,
    mode: 'login',
    role: 'student',
  });
  const [detailCourse, setDetailCourse] = useState(null);
  const [classroomCourse, setClassroomCourse] = useState(null);
  const [classroomLessonIdx, setClassroomLessonIdx] = useState(0);

  const loadBootstrapData = useCallback(async () => {
    try {
      const data = await api.getBootstrap();
      setCourses(Array.isArray(data.courses) ? data.courses : []);
      setArticles(Array.isArray(data.articles) ? data.articles : []);
      if (data.sepayConfig) setSepayConfig(data.sepayConfig);
    } catch (err) {
      console.warn('Bootstrap fetch warning:', err.message);
    }
  }, []);

  useEffect(() => {
    loadBootstrapData();
  }, [loadBootstrapData]);

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('eduai_user', JSON.stringify(user));
        if (Array.isArray(user.unlockedCourses)) {
          setUnlockedIds((prev) =>
            Array.from(new Set([...prev, ...user.unlockedCourses]))
          );
        }
      } else {
        localStorage.removeItem('eduai_user');
      }
    } catch {
      // Ignore storage error
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem('eduai_unlocked', JSON.stringify(unlockedIds));
    } catch {
      // Ignore storage error
    }
  }, [unlockedIds]);

  const currentRoleObj = useMemo(() => {
    if (!user) return null;
    return USER_ROLES.find((r) => r.id === user.role) || USER_ROLES[0];
  }, [user]);

  const roleScopedCourses = useMemo(() => {
    if (!user || user.role === 'admin' || !currentRoleObj) return courses;
    return courses.filter((c) =>
      currentRoleObj.allowedPillars.includes(c.pillar)
    );
  }, [courses, user, currentRoleObj]);

  const roleStats = useMemo(() => {
    const freeCount = roleScopedCourses.filter(
      (c) =>
        c.isFree ||
        (user?.role === 'student' && c.freeForStudent) ||
        (user?.role === 'business' && c.freeForBusiness) ||
        unlockedIds.includes(c.id)
    ).length;
    const paidCount = roleScopedCourses.length - freeCount;
    return { freeCount, paidCount, total: roleScopedCourses.length };
  }, [roleScopedCourses, user, unlockedIds]);

  const filteredCourses = useMemo(() => {
    return roleScopedCourses.filter((course) => {
      if (selectedPillar !== 'all' && course.pillar !== selectedPillar) {
        return false;
      }
      if (selectedLevel !== 'all' && course.level !== selectedLevel) {
        return false;
      }
      const isFreeForCurrentUser =
        course.isFree ||
        (user?.role === 'student' && course.freeForStudent) ||
        (user?.role === 'business' && course.freeForBusiness) ||
        unlockedIds.includes(course.id);

      if (priceFilter === 'free' && !isFreeForCurrentUser) return false;
      if (priceFilter === 'paid' && isFreeForCurrentUser) return false;

      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchTitle =
          (course.title || '').toLowerCase().includes(q) ||
          (course.titleEn || '').toLowerCase().includes(q);
        const matchDesc =
          (course.description || '').toLowerCase().includes(q) ||
          (course.descriptionEn || '').toLowerCase().includes(q);
        const matchTool = (course.tools || []).some((tl) =>
          tl.toLowerCase().includes(q)
        );
        const matchSkill = (course.skills || []).some((s) =>
          s.toLowerCase().includes(q)
        );
        return matchTitle || matchDesc || matchTool || matchSkill;
      }

      return true;
    });
  }, [
    roleScopedCourses,
    selectedPillar,
    selectedLevel,
    priceFilter,
    searchQuery,
    user,
    unlockedIds,
  ]);

  const handleOpenAuth = (mode = 'login', role = 'student') => {
    setAuthModal({ open: true, mode, role });
  };

  const handleAuthSuccess = (userData) => {
    setUser(userData);
    setSelectedPillar('all');
    setSelectedLevel('all');
    setPriceFilter('all');
    if (userData.role === 'admin') {
      setShowAdmin(true);
    }
  };

  const handleRoleChange = async (newRoleId) => {
    const roleObj =
      USER_ROLES.find((r) => r.id === newRoleId) || USER_ROLES[0];
    if (user) {
      const updatedUser = {
        ...user,
        role: newRoleId,
        roleLabel: lang === 'en' ? roleObj.shortLabelEn : roleObj.shortLabel,
      };
      setUser(updatedUser);
      if (user.id) {
        try {
          await api.updateUser(user.id, {
            role: newRoleId,
            roleLabel: roleObj.shortLabel,
          });
        } catch {
          // ignore offline error
        }
      }
    }
    setSelectedPillar('all');
  };

  const handleLogout = () => {
    setUser(null);
    setShowAdmin(false);
    setSelectedPillar('all');
    setSelectedLevel('all');
    setPriceFilter('all');
  };

  const handleCourseUnlocked = (courseId) => {
    if (!unlockedIds.includes(courseId)) {
      setUnlockedIds((prev) => [...prev, courseId]);
    }
    loadBootstrapData();
  };

  const renderPillarLogo = (pillarId) => {
    if (pillarId === 'google-security')
      return <BrandLogo brand="google" className="w-4 h-4" />;
    if (pillarId === 'ai-coding')
      return <BrandLogo brand="antigravity" className="w-4 h-4" />;
    return <BrandLogo brand="excel" className="w-4 h-4" />;
  };

  const handleGoHome = () => {
    setShowAdmin(false);
    setDetailCourse(null);
    setClassroomCourse(null);
    setAuthModal((prev) => ({ ...prev, open: false }));
    setSelectedPillar('all');
    setSelectedLevel('all');
    setPriceFilter('all');
    setSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If Admin Dashboard is open, render AdminDashboard view
  if (showAdmin && user?.role === 'admin') {
    return (
      <AdminDashboard
        onBackToSite={handleGoHome}
        courses={courses}
        articles={articles}
        sepayConfig={sepayConfig}
        onRefreshData={loadBootstrapData}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 overflow-x-hidden">
      {/* Top Navbar */}
      <Navbar
        user={user}
        selectedPillar={selectedPillar}
        onSelectPillar={setSelectedPillar}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
        onRoleChange={handleRoleChange}
        onOpenAdmin={() => setShowAdmin(true)}
        onGoHome={handleGoHome}
      />

      {/* Hero Section */}
      <HeroSection
        user={user}
        onOpenAuth={handleOpenAuth}
        onSelectPillar={setSelectedPillar}
        onRoleChange={handleRoleChange}
        onOpenAdmin={() => setShowAdmin(true)}
        stats={roleStats}
      />

      {/* Guest Educational Value & Articles Section */}
      {!user && (
        <WhyLearnSection
          articles={articles}
          onSelectPillar={setSelectedPillar}
          onOpenAuth={handleOpenAuth}
        />
      )}

      {/* Main Course Catalog Section */}
      <section
        id="courses-catalog"
        className="py-10 sm:py-14 lg:py-16 flex-1"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Catalog Header */}
          <ScrollReveal
            direction="up"
            className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 mb-8"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#0056D2] font-extrabold text-xs uppercase tracking-wider mb-2 border border-blue-200/70">
                <Layers className="w-3.5 h-3.5 shrink-0" />
                <span>
                  {user && user.role !== 'admin'
                    ? `${t.catalog.filteredByRoleBadge} ${
                        lang === 'en'
                          ? currentRoleObj?.shortLabelEn
                          : currentRoleObj?.shortLabel
                      }`
                    : t.catalog.guestCatalogBadge}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {user && user.role !== 'admin'
                  ? `${t.catalog.roleHeadingPrefix} ${
                      lang === 'en'
                        ? currentRoleObj?.shortLabelEn
                        : currentRoleObj?.shortLabel
                    }`
                  : t.catalog.guestHeading}
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-2xl">
                {user && user.role !== 'admin'
                  ? t.catalog.roleSubDesc
                  : t.catalog.guestSubDesc}
              </p>
            </div>

            {/* Free vs Pro Filter Tabs */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 shrink-0">
              <button
                onClick={() => setPriceFilter('all')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap shrink-0 ${
                  priceFilter === 'all'
                    ? 'bg-[#0056D2] text-white shadow-sm'
                    : 'bg-white text-slate-700 border border-blue-100 hover:bg-blue-50/50'
                }`}
              >
                {t.catalog.tabAll} ({roleScopedCourses.length})
              </button>
              <button
                onClick={() => setPriceFilter('free')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                  priceFilter === 'free'
                    ? 'bg-[#0284C7] text-white shadow-sm'
                    : 'bg-white text-slate-700 border border-blue-100 hover:bg-blue-50/50'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-sky-400 shrink-0" />
                <span>
                  {t.catalog.tabFree} ({roleStats.freeCount})
                </span>
              </button>
              <button
                onClick={() => setPriceFilter('paid')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                  priceFilter === 'paid'
                    ? 'bg-[#0B1120] text-white shadow-sm'
                    : 'bg-white text-slate-700 border border-blue-100 hover:bg-blue-50/50'
                }`}
              >
                <span>
                  🔒 {t.catalog.tabPaid} ({roleStats.paidCount})
                </span>
              </button>
            </div>
          </ScrollReveal>

          {/* Filter Bar: Pillars & 3 Difficulty Levels */}
          <div className="bg-white rounded-2xl p-4 border border-blue-100 shadow-sm mb-8 space-y-4">
            {/* Row 1: Pillar Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
              <button
                onClick={() => setSelectedPillar('all')}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition ${
                  selectedPillar === 'all'
                    ? 'bg-[#0B1120] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {t.catalog.all3Pillars}
              </button>

              {PILLARS.map((pillar) => {
                const isAllowed =
                  !user ||
                  user.role === 'admin' ||
                  currentRoleObj?.allowedPillars.includes(pillar.id);
                if (!isAllowed) return null;

                return (
                  <button
                    key={pillar.id}
                    onClick={() => setSelectedPillar(pillar.id)}
                    className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition flex items-center gap-2 ${
                      selectedPillar === pillar.id
                        ? 'bg-[#0056D2] text-white shadow-sm'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <span className="p-0.5 rounded bg-white/90 flex items-center justify-center">
                      {renderPillarLogo(pillar.id)}
                    </span>
                    <span>{lang === 'en' ? pillar.nameEn : pillar.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Row 2: 3 Difficulty Levels */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-slate-400 uppercase flex items-center gap-1 mr-1">
                  <Filter className="w-3.5 h-3.5" />
                  {t.catalog.levelLabel}
                </span>
                {LEVELS.map((lvl) => (
                  <button
                    key={lvl.id}
                    onClick={() => setSelectedLevel(lvl.id)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
                      selectedLevel === lvl.id
                        ? 'bg-blue-50 text-[#0056D2] border border-[#0056D2]'
                        : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {lang === 'en' ? lvl.nameEn : lvl.name}
                  </button>
                ))}
              </div>

              {searchQuery && (
                <div className="text-xs text-slate-500">
                  Từ khóa:{' '}
                  <strong className="text-slate-900">"{searchQuery}"</strong> •{' '}
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-[#0056D2] font-bold hover:underline"
                  >
                    {t.catalog.clearSearch}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Student Notice Callout */}
          {user?.role === 'student' && (
            <div className="mb-8 p-4 rounded-2xl bg-blue-50/80 border border-blue-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start sm:items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#0056D2] text-white shrink-0">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div className="text-xs sm:text-sm text-slate-800">
                  <strong>{t.catalog.studentNoticeTitle}</strong>{' '}
                  {t.catalog.studentNoticeDesc}
                </div>
              </div>
            </div>
          )}

          {/* Course Cards Grid (4 Columns on Desktop, 2 on Tablet, 1 on Mobile) */}
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCourses.map((course, idx) => (
                <ScrollReveal
                  key={course.id}
                  direction="up"
                  delay={(idx % 4) * 70}
                  className="h-full"
                >
                  <CourseCard
                    course={course}
                    user={user}
                    unlockedIds={unlockedIds}
                    onSelectCourse={(c) => setDetailCourse(c)}
                  />
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-8 sm:p-12 text-center border border-blue-100 max-w-xl mx-auto my-6 shadow-sm">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#0056D2] flex items-center justify-center mx-auto mb-4">
                <SearchX className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-extrabold text-slate-900 mb-1.5">
                {t.catalog.emptyTitle}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mb-6 leading-relaxed">
                {t.catalog.emptyDesc}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                {user?.role === 'admin' ? (
                  <button
                    onClick={() => setShowAdmin(true)}
                    className="px-5 py-2.5 rounded-xl bg-[#0056D2] hover:bg-[#0046AD] text-white font-bold text-xs sm:text-sm shadow-md transition inline-flex items-center gap-2"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>{t.catalog.emptyAdminBtn}</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setSelectedPillar('all');
                      setSelectedLevel('all');
                      setPriceFilter('all');
                      setSearchQuery('');
                    }}
                    className="px-5 py-2.5 rounded-xl bg-[#0056D2] text-white font-bold text-xs sm:text-sm hover:bg-[#0046AD] transition"
                  >
                    {t.catalog.resetFilterBtn}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Enterprise B2B Training Section */}
      <EnterpriseSection onOpenAuth={handleOpenAuth} />

      {/* Footer */}
      <Footer onSelectPillar={setSelectedPillar} onGoHome={handleGoHome} />

      {/* Scroll To Top Button */}
      <ScrollToTopButton />

      {/* Floating Contact Widget */}
      <FloatingContact />

      {/* Course Detail & SePay VietQR Payment Modal */}
      <CourseDetailModal
        course={detailCourse}
        user={user}
        unlockedIds={unlockedIds}
        sepayConfig={sepayConfig}
        onClose={() => setDetailCourse(null)}
        onOpenAuth={handleOpenAuth}
        onStartLearning={(c, lessonIdx = 0) => {
          setDetailCourse(null);
          setClassroomLessonIdx(lessonIdx);
          setClassroomCourse(c);
        }}
        onCourseUnlocked={handleCourseUnlocked}
      />

      {/* Interactive Video Classroom Modal */}
      <ClassroomModal
        course={classroomCourse}
        initialLessonIndex={classroomLessonIdx}
        user={user}
        unlockedIds={unlockedIds}
        onClose={() => setClassroomCourse(null)}
        onRequestUnlock={() => {
          const currentCourse = classroomCourse;
          setClassroomCourse(null);
          setDetailCourse(currentCourse);
        }}
      />

      {/* Auth Modal (Double-Slider matching login.mp4 + Google Login + PostgreSQL) */}
      <AuthModal
        isOpen={authModal.open}
        initialMode={authModal.mode}
        initialRole={authModal.role}
        onClose={() => setAuthModal({ ...authModal, open: false })}
        onAuthSuccess={handleAuthSuccess}
      />
    </div>
  );
}
