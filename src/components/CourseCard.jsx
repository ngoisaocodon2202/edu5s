import React from 'react';
import {
  Star,
  Clock,
  Lock,
  Play,
  CheckCircle2,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';
import { PILLARS, LEVELS } from '../data/coursesData';
import { BrandLogo, getBrandKeyFromText } from './BrandLogos';
import { useLanguage } from '../context/LanguageContext';

export default function CourseCard({
  course,
  user,
  unlockedIds = [],
  onSelectCourse,
}) {
  const { lang, t } = useLanguage();
  const pillar = PILLARS.find((p) => p.id === course.pillar);
  const level = LEVELS.find((l) => l.id === course.level);

  const isStudentFree = user?.role === 'student' && course.freeForStudent;
  const isBusinessFree = user?.role === 'business' && course.freeForBusiness;
  const isPurchased =
    unlockedIds.includes(course.id) ||
    (user?.unlockedCourses || []).includes(course.id) ||
    user?.role === 'admin';
  const canLearnFree =
    course.isFree || isStudentFree || isBusinessFree || isPurchased;

  const displayTitle =
    lang === 'en' ? course.titleEn || course.title : course.title;
  const displayDuration =
    lang === 'en' ? course.durationEn || course.duration : course.duration;
  const displaySkills =
    lang === 'en' && Array.isArray(course.skillsEn) && course.skillsEn.length > 0
      ? course.skillsEn
      : course.skills || [];

  const getPrimaryToolKey = () => {
    if (course.tools && course.tools.length > 0) {
      return getBrandKeyFromText(course.tools[0]);
    }
    if (course.pillar === 'google-security') return 'google';
    if (course.pillar === 'ai-coding') return 'antigravity';
    return 'excel';
  };

  const formatPrice = (amount) => {
    if (!amount || amount === 0) return t.card.priceFree;
    return Number(amount).toLocaleString('vi-VN') + 'đ';
  };

  return (
    <div
      onClick={() => onSelectCourse(course)}
      className="coursera-card group bg-white rounded-2xl border border-blue-100 hover:border-[#0056D2]/60 overflow-hidden flex flex-col justify-between cursor-pointer h-full"
    >
      <div>
        {/* Thumbnail Container */}
        <div className="relative h-44 w-full overflow-hidden bg-slate-900">
          <img
            src={course.thumbnail}
            alt={displayTitle}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-95"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/15 to-transparent" />

          {/* Top-Left: Single Status Badge */}
          <div className="absolute top-3 left-3">
            {canLearnFree ? (
              <span className="px-2.5 py-1 rounded-md text-[11px] font-extrabold bg-[#0EA5E9] text-white shadow-sm flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                {isStudentFree && !course.isFree
                  ? t.card.studentFreeBadge
                  : isPurchased && !course.isFree
                  ? t.card.unlockedBadge
                  : t.card.freeBasicBadge}
              </span>
            ) : (
              <span className="px-2.5 py-1 rounded-md text-[11px] font-extrabold bg-[#0B1120]/90 text-sky-300 backdrop-blur-md shadow-sm flex items-center gap-1 border border-sky-400/30">
                <Lock className="w-3 h-3" />
                {t.card.proLockedBadge}
              </span>
            )}
          </div>

          {/* Top-Right: Single Level Badge */}
          <div className="absolute top-3 right-3">
            <span
              className={`px-2.5 py-1 rounded-md text-[11px] font-bold border shadow-sm backdrop-blur-md bg-white/95 ${
                level?.badgeClass || 'text-slate-700'
              }`}
            >
              {lang === 'en' ? level?.shortEn : level?.short}
            </span>
          </div>

          {/* Bottom-Left: B2B Badge */}
          {course.isB2BReady && (
            <div className="absolute bottom-2.5 left-3">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#0056D2]/90 text-white backdrop-blur-sm">
                {t.card.b2bBadge}
              </span>
            </div>
          )}

          {/* Bottom-Right: Duration Badge */}
          <div className="absolute bottom-2.5 right-3">
            <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-900/80 text-white backdrop-blur-sm flex items-center gap-1">
              <Clock className="w-3 h-3 text-sky-300" />
              {displayDuration}
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 pb-3">
          {/* Provider & Pillar Row */}
          <div className="flex items-center justify-between gap-2 mb-2.5">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 min-w-0">
              <span className="w-5 h-5 rounded-md bg-blue-50/70 border border-blue-100 flex items-center justify-center shrink-0">
                <BrandLogo brand={getPrimaryToolKey()} className="w-3.5 h-3.5" />
              </span>
              <span className="truncate">{course.provider}</span>
            </div>
            <span
              className={`px-2 py-0.5 rounded text-[10px] font-bold border shrink-0 ${pillar?.badgeBg}`}
            >
              {lang === 'en' ? pillar?.shortNameEn : pillar?.shortName}
            </span>
          </div>

          {/* Course Title */}
          <h3 className="text-[15px] font-extrabold text-slate-900 group-hover:text-[#0056D2] transition leading-snug line-clamp-2 min-h-[42px] mb-2.5">
            {displayTitle}
          </h3>

          {/* Tool Chips */}
          <div className="flex flex-wrap gap-1.5 mb-2.5">
            {(course.tools || []).slice(0, 2).map((tool, i) => (
              <span
                key={i}
                className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-blue-50/60 text-slate-700 border border-blue-100 flex items-center gap-1"
              >
                <BrandLogo
                  brand={getBrandKeyFromText(tool)}
                  className="w-3 h-3 shrink-0"
                />
                <span className="truncate max-w-[125px]">{tool}</span>
              </span>
            ))}
          </div>

          {/* Skills Preview */}
          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
            <strong className="text-slate-700">{t.card.skillsLabel}</strong>{' '}
            {displaySkills.join(', ')}
          </p>
        </div>
      </div>

      {/* Card Footer */}
      <div className="px-5 pb-5 pt-2">
        <div className="flex items-center justify-between text-xs text-slate-500 pb-3 mb-3 border-b border-slate-100">
          <div className="flex items-center gap-1 font-bold text-slate-800">
            <span>{course.rating}</span>
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="font-normal text-slate-400">
              ({course.reviews} {t.card.reviewsLabel})
            </span>
          </div>
          <div className="font-medium text-slate-500">
            {course.lessons} {t.card.lessonsLabel}
          </div>
        </div>

        <div className="flex items-center justify-between gap-2">
          <div>
            {canLearnFree ? (
              <div>
                <span className="text-base font-extrabold text-[#0056D2]">
                  {isPurchased && !course.isFree
                    ? t.card.priceUnlocked
                    : t.card.priceFree}
                </span>
                <div className="text-[11px] text-slate-400 font-medium">
                  {isStudentFree && !course.isFree
                    ? t.card.subStudentFree
                    : isPurchased && !course.isFree
                    ? t.card.subUnlocked
                    : t.card.subStartNow}
                </div>
              </div>
            ) : (
              <div>
                <div className="text-base font-extrabold text-[#0056D2]">
                  {formatPrice(course.price)}
                </div>
                {course.oldPrice > 0 && (
                  <div className="text-[11px] text-slate-400 line-through">
                    {formatPrice(course.oldPrice)}
                  </div>
                )}
              </div>
            )}
          </div>

          {canLearnFree ? (
            <button
              type="button"
              className="px-3.5 py-2 rounded-xl bg-[#0056D2] hover:bg-[#0046AD] text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition whitespace-nowrap"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>{t.card.btnLearnNow}</span>
            </button>
          ) : (
            <button
              type="button"
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#0056D2] to-[#0284C7] hover:from-[#0046AD] hover:to-[#0369A1] text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.card.btnBuyCourse}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
