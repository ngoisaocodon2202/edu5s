import React from 'react';
import {
  CheckCircle2,
  ArrowRight,
  GraduationCap,
  Building2,
  UserCheck,
  Clock,
  BookOpen,
} from 'lucide-react';
import { PILLARS } from '../data/coursesData';
import { BrandLogo, ScrollReveal, getBrandKeyFromText } from './BrandLogos';
import { useLanguage } from '../context/LanguageContext';

export default function WhyLearnSection({
  articles = [],
  onSelectPillar,
  onOpenAuth,
}) {
  const { lang, t } = useLanguage();

  const renderPillarBrandIcon = (id) => {
    if (id === 'google-security')
      return <BrandLogo brand="google" className="w-7 h-7" />;
    if (id === 'ai-coding')
      return <BrandLogo brand="antigravity" className="w-7 h-7" />;
    return <BrandLogo brand="excel" className="w-7 h-7" />;
  };

  return (
    <div id="why-learn-section" className="bg-white">
      {/* PART 1: Why Learn These 3 Pillars in the Modern Era */}
      <section className="py-12 sm:py-16 lg:py-20 border-b border-blue-100/80">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal
            direction="up"
            className="text-center max-w-3xl mx-auto mb-10 sm:mb-12"
          >
            <span className="inline-block px-3.5 py-1 rounded-full bg-blue-50 text-[#0056D2] font-extrabold text-xs uppercase tracking-wider mb-3 border border-blue-200/70">
              {t.why.sectionBadge}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              {t.why.sectionTitle1}{' '}
              <span className="text-[#0056D2]">
                {t.why.sectionTitleHighlight}
              </span>{' '}
              {t.why.sectionTitle2}
            </h2>
            <p className="text-slate-600 mt-3 text-sm sm:text-base lg:text-lg">
              {t.why.sectionDesc}
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {PILLARS.map((pillar, index) => {
              const points =
                lang === 'en' && pillar.whyLearnPointsEn
                  ? pillar.whyLearnPointsEn
                  : pillar.whyLearnPoints;
              return (
                <ScrollReveal
                  key={pillar.id}
                  direction={
                    index === 0 ? 'left' : index === 1 ? 'up' : 'right'
                  }
                  delay={index * 120}
                  className="rounded-3xl p-6 sm:p-7 border border-blue-100 bg-gradient-to-b from-[#F0F7FF]/90 to-white shadow-sm hover:shadow-xl hover:border-[#0056D2]/40 transition flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5 gap-2">
                      <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-blue-100 flex items-center justify-center shrink-0">
                        {renderPillarBrandIcon(pillar.id)}
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-extrabold border bg-blue-50 text-[#0056D2] border-blue-200">
                        {t.why.levelFlow}
                      </span>
                    </div>

                    <div className="text-xs font-extrabold uppercase tracking-wider text-[#0056D2] mb-1">
                      {lang === 'en' ? pillar.nameEn : pillar.name}
                    </div>
                    <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 mb-4 leading-snug">
                      {lang === 'en'
                        ? pillar.whyLearnTitleEn
                        : pillar.whyLearnTitle}
                    </h3>

                    <ul className="space-y-3 mb-6">
                      {points.map((point, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#0056D2] shrink-0 mt-1" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-blue-100/80">
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {pillar.tools.map((tool, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-white text-slate-700 border border-slate-200 shadow-sm"
                        >
                          <BrandLogo
                            brand={getBrandKeyFromText(tool)}
                            className="w-3.5 h-3.5"
                          />
                          {tool}
                        </span>
                      ))}
                    </div>
                    <button
                      onClick={() => {
                        onSelectPillar(pillar.id);
                        document
                          .getElementById('courses-catalog')
                          ?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="w-full py-3 rounded-xl bg-white hover:bg-[#0056D2] text-[#0056D2] hover:text-white font-bold text-xs sm:text-sm border border-[#0056D2] transition flex items-center justify-center gap-2"
                    >
                      <span>{t.why.explorePillarBtn}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* PART 2: 3 User Segments & Role-Based Combobox Explanation */}
      <section className="py-12 sm:py-16 bg-[#F8FAFC] border-b border-blue-100/80">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal
            direction="up"
            className="text-center max-w-3xl mx-auto mb-10 sm:mb-12"
          >
            <span className="inline-block px-3.5 py-1 rounded-full bg-blue-50 text-[#0056D2] font-extrabold text-xs uppercase tracking-wider mb-3 border border-blue-200/70">
              {t.why.roleSectionBadge}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {t.why.roleSectionTitle}
            </h2>
            <p className="text-slate-600 mt-2 text-sm sm:text-base">
              {t.why.roleSectionDesc}
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Segment 1: Students */}
            <ScrollReveal
              direction="left"
              delay={50}
              className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-blue-100 hover:border-[#0056D2] shadow-sm transition flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-28 h-28 bg-blue-500/5 rounded-bl-full pointer-events-none" />
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-2xl bg-blue-50 text-[#0056D2]">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-blue-50 text-[#0056D2]">
                    {t.why.role1Badge}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 mb-2">
                  {t.why.role1Title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mb-4 leading-relaxed">
                  {t.why.role1Desc}
                </p>
                <div className="space-y-2 text-xs text-slate-700 mb-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0056D2] shrink-0" />
                    <span>{t.why.role1Point1}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0056D2] shrink-0" />
                    <span>{t.why.role1Point2}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0056D2] shrink-0" />
                    <span>{t.why.role1Point3}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => onOpenAuth('register', 'student')}
                className="w-full py-3 rounded-xl bg-[#0056D2] hover:bg-[#0046AD] text-white font-bold text-xs sm:text-sm transition shadow-sm"
              >
                {t.why.role1Btn}
              </button>
            </ScrollReveal>

            {/* Segment 2: Business / Enterprise */}
            <ScrollReveal
              direction="up"
              delay={150}
              className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-[#0056D2] shadow-md transition flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-28 h-28 bg-sky-500/10 rounded-bl-full pointer-events-none" />
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-2xl bg-blue-50 text-[#0056D2]">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-[#0056D2] text-white">
                    {t.why.role2Badge}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 mb-2">
                  {t.why.role2Title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mb-4 leading-relaxed">
                  {t.why.role2Desc}
                </p>
                <div className="space-y-2 text-xs text-slate-700 mb-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0056D2] shrink-0" />
                    <span>{t.why.role2Point1}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0056D2] shrink-0" />
                    <span>{t.why.role2Point2}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0056D2] shrink-0" />
                    <span>{t.why.role2Point3}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => onOpenAuth('register', 'business')}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#0056D2] to-[#0284C7] hover:from-[#0046AD] hover:to-[#0369A1] text-white font-bold text-xs sm:text-sm transition shadow-sm"
              >
                {t.why.role2Btn}
              </button>
            </ScrollReveal>

            {/* Segment 3: Individual Learners */}
            <ScrollReveal
              direction="right"
              delay={250}
              className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-blue-100 hover:border-[#0056D2] shadow-sm transition flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-28 h-28 bg-blue-500/5 rounded-bl-full pointer-events-none" />
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-2xl bg-blue-50 text-[#0056D2]">
                    <UserCheck className="w-6 h-6" />
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-blue-50 text-[#0056D2]">
                    {t.why.role3Badge}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 mb-2">
                  {t.why.role3Title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mb-4 leading-relaxed">
                  {t.why.role3Desc}
                </p>
                <div className="space-y-2 text-xs text-slate-700 mb-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0056D2] shrink-0" />
                    <span>{t.why.role3Point1}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0056D2] shrink-0" />
                    <span>{t.why.role3Point2}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0056D2] shrink-0" />
                    <span>{t.why.role3Point3}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => onOpenAuth('register', 'individual_aicode')}
                className="w-full py-3 rounded-xl bg-[#0B1120] hover:bg-[#0056D2] text-white font-bold text-xs sm:text-sm transition shadow-sm"
              >
                {t.why.role3Btn}
              </button>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* PART 3: Featured Articles (Synced from PostgreSQL) */}
      <section id="articles-section" className="py-12 sm:py-16 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="inline-block px-3.5 py-1 rounded-full bg-blue-50 text-[#0056D2] font-extrabold text-xs uppercase tracking-wider mb-2 border border-blue-100">
                {t.why.articlesBadge}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {t.why.articlesTitle}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md">
              {t.why.articlesDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {articles.map((article, idx) => (
              <ScrollReveal
                key={article.id}
                direction="up"
                delay={idx * 120}
                className="group rounded-2xl border border-blue-100 overflow-hidden shadow-sm hover:shadow-xl hover:border-[#0056D2]/40 transition flex flex-col bg-white"
              >
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold bg-slate-900/80 text-white backdrop-blur-sm">
                    {lang === 'en'
                      ? article.categoryEn || article.category
                      : article.category}
                  </div>
                </div>
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-slate-400 font-medium mb-2">
                      <Clock className="w-3.5 h-3.5" />
                      <span>
                        {lang === 'en'
                          ? article.readTimeEn || article.readTime
                          : article.readTime}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-extrabold text-slate-900 group-hover:text-[#0056D2] transition mb-2.5 leading-snug">
                      {lang === 'en'
                        ? article.titleEn || article.title
                        : article.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                      {lang === 'en'
                        ? article.excerptEn || article.excerpt
                        : article.excerpt}
                    </p>
                  </div>
                  <button
                    onClick={() => onOpenAuth('register', 'individual_all')}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#0056D2] hover:gap-2.5 transition-all"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>{t.why.readMoreBtn}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
