import React, { useState, useEffect } from 'react';
import {
  X,
  Play,
  Lock,
  CheckCircle2,
  Clock,
  BookOpen,
  Star,
  Sparkles,
  ExternalLink,
  RefreshCw,
  QrCode,
  ShieldCheck,
  FileCode2,
  ClipboardCheck,
  Award,
} from 'lucide-react';
import { PILLARS, LEVELS, CONTACT_INFO } from '../data/coursesData';
import { BrandLogo, getBrandKeyFromText } from './BrandLogos';
import { useLanguage, LanguageSwitcher } from '../context/LanguageContext';
import ProtectedVideoPlayer from './ProtectedVideoPlayer';
import { api } from '../services/api';

function buildLessonExercises(course, lessonIdx, lang) {
  const tool = (course?.tools && course.tools[0]) || 'Google Antigravity';
  const isEn = lang === 'en';

  return {
    quiz: [
      {
        id: 'q1',
        question: isEn
          ? `1. When working with ${tool} in Lesson ${lessonIdx + 1}, what is the most important first step before executing automated actions?`
          : `1. Khi thao tác trên ứng dụng ${tool} ở Bài ${lessonIdx + 1}, bước quan trọng nhất trước khi chạy lệnh tự động là gì?`,
        options: isEn
          ? [
              `Verify environment permissions, input data structure, and security context in ${tool}`,
              'Skip configuration and run unverified scripts immediately',
              'Disable two-factor authentication and backup sync',
              'Share raw credentials publicly',
            ]
          : [
              `Kiểm tra cấu hình môi trường, chuẩn hóa dữ liệu đầu vào và ngữ cảnh bảo mật trên ${tool}`,
              'Bỏ qua bước cấu hình và chạy ngay tệp lạ chưa kiểm chứng',
              'Tắt bảo mật 2 lớp và đồng bộ đám mây',
              'Chia sẻ công khai thông tin nhạy cảm',
            ],
        correctIndex: 0,
      },
      {
        id: 'q2',
        question: isEn
          ? `2. How does the 5S AI standardized workflow improve productivity in ${tool}?`
          : `2. Quy trình chuẩn hóa 5S AI trên ${tool} giúp tối ưu hiệu suất làm việc như thế nào?`,
        options: isEn
          ? [
              'Combines structured Context + Constraints + Verification to achieve 5x faster output with zero errors',
              'Requires manual line-by-line editing without templates',
              'Only works on a single device without cloud sync',
              'Does not support verification or testing',
            ]
          : [
              'Kết hợp công thức Ngữ cảnh (Context) + Ràng buộc (Constraint) + Kiểm thử giúp tăng tốc gấp 5 lần và chính xác 100%',
              'Phải làm thủ công từng bước không có biểu mẫu',
              'Chỉ chạy được trên một máy cố định không đồng bộ',
              'Không hỗ trợ kiểm tra chéo kết quả đầu ra',
            ],
        correctIndex: 0,
      },
      {
        id: 'q3',
        question: isEn
          ? `3. Which security rule must always be enforced when completing this module?`
          : `3. Nguyên tắc an toàn thông tin nào bắt buộc phải tuân thủ sau khi hoàn thành bài học này?`,
        options: isEn
          ? [
              'Protect session tokens/Passkeys, verify digital signatures, and never expose private keys',
              'Use the same weak password across all corporate accounts',
              'Install browser extensions from unknown third-party links',
              'Turn off automatic cloud version history',
            ]
          : [
              'Bảo vệ khóa Passkeys/phiên đăng nhập, kiểm tra chữ ký số và tuyệt đối không làm lộ dữ liệu nội bộ',
              'Dùng chung một mật khẩu đơn giản cho mọi tài khoản',
              'Cài đặt tiện ích mở rộng không rõ nguồn gốc',
              'Tắt tính năng lưu lịch sử phiên bản trên đám mây',
            ],
        correctIndex: 0,
      },
    ],
    practicalPrompt: isEn
      ? `Hands-On Lab Task (Lesson ${lessonIdx + 1}): Write a structured command, formula, or AI prompt for ${tool} to automate the core task of this lesson:`
      : `Bài Tập Thực Hành Thực Tế (Bài ${lessonIdx + 1}): Hãy viết câu lệnh điều phối (Prompt / Công thức / Quy trình cấu hình) trên ${tool} để giải quyết bài toán của bài học này:`,
    sampleSolution: isEn
      ? `[Context]: Using ${tool} for ${course?.titleEn || course?.title}\n[Task]: Automate step-by-step execution for Lesson ${lessonIdx + 1}\n[Verification]: Validate output accuracy & security compliance 100%`
      : `[Ngữ cảnh]: Sử dụng ${tool} cho khóa ${course?.title}\n[Yêu cầu]: Tự động hóa quy trình thực thi Bài ${lessonIdx + 1}\n[Kiểm tra]: Đối chiếu kết quả đầu ra & đảm bảo an toàn dữ liệu 100%`,
  };
}

function readCompletedMap() {
  try {
    const raw = localStorage.getItem('eduai_completed_lessons');
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function markCourseLessonCompleted(courseId, lessonIdx) {
  if (!courseId && courseId !== 0) return {};
  try {
    const map = readCompletedMap();
    const key = String(courseId);
    const list = Array.isArray(map[key]) ? map[key] : [];
    if (!list.includes(lessonIdx)) {
      map[key] = [...list, lessonIdx];
      localStorage.setItem('eduai_completed_lessons', JSON.stringify(map));
    }
    return map;
  } catch {
    return {};
  }
}

export function CourseDetailModal({
  course,
  user,
  unlockedIds = [],
  sepayConfig,
  onClose,
  onStartLearning,
  onOpenAuth,
  onCourseUnlocked,
}) {
  const { lang, t } = useLanguage();
  const [showSepayCheckout, setShowSepayCheckout] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [creatingOrder, setCreatingOrder] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(false);
  const [copiedField, setCopiedField] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [completedMap, setCompletedMap] = useState(() => readCompletedMap());

  useEffect(() => {
    setShowSepayCheckout(false);
    setOrderData(null);
    setStatusMessage('');
    setCompletedMap(readCompletedMap());
  }, [course]);

  if (!course) return null;

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
  const displayDesc =
    lang === 'en'
      ? course.descriptionEn || course.description
      : course.description;
  const displayDuration =
    lang === 'en' ? course.durationEn || course.duration : course.duration;
  const displaySkills =
    lang === 'en' && Array.isArray(course.skillsEn) && course.skillsEn.length > 0
      ? course.skillsEn
      : course.skills || [];

  const bankName = sepayConfig?.bankName || 'MBBank';
  const accountNumber = sepayConfig?.accountNumber || '789220206';

  const handleOpenSepayCheckout = async () => {
    if (!user) {
      onClose();
      onOpenAuth('login');
      return;
    }
    setShowSepayCheckout(true);
    setCreatingOrder(true);
    setStatusMessage('');
    try {
      const res = await api.createOrder({
        userId: user.id,
        userName: user.name,
        userEmail: user.email,
        courseId: course.id,
        courseTitle: course.title,
        amount: course.price,
      });
      setOrderData(res);
    } catch {
      const fallbackCode = `5SAI${Date.now().toString().slice(-7)}`;
      setOrderData({
        order: {
          order_code: fallbackCode,
          amount: course.price,
          bank_name: bankName,
          account_number: accountNumber,
          status: 'pending',
        },
        qrUrl: `https://qr.sepay.vn/img?bank=${encodeURIComponent(
          bankName
        )}&acc=${encodeURIComponent(
          accountNumber
        )}&template=compact2&amount=${course.price}&des=${encodeURIComponent(
          fallbackCode
        )}`,
      });
    } finally {
      setCreatingOrder(false);
    }
  };

  const handleCopy = (text, key) => {
    navigator.clipboard?.writeText(String(text));
    setCopiedField(key);
    setTimeout(() => setCopiedField(''), 2000);
  };

  const handleVerifyOrder = async () => {
    if (!orderData?.order?.order_code) return;
    setCheckingStatus(true);
    setStatusMessage('');
    try {
      const res = await api.getOrderByCode(orderData.order.order_code);
      if (res.order?.status === 'paid') {
        setStatusMessage(t.modals.orderPaidSuccess);
        if (onCourseUnlocked) onCourseUnlocked(course.id);
      } else {
        setStatusMessage(t.modals.waitingWebhookStatus);
      }
    } catch (err) {
      setStatusMessage(err.message);
    } finally {
      setCheckingStatus(false);
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/75 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-5xl max-h-[88vh] rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden flex flex-col animate-fadeIn"
      >
        {/* Clean Compact Hero Header (Never Clipped) */}
        <div className="shrink-0 bg-gradient-to-r from-[#0B1120] via-[#0F1E3A] to-[#0056D2] text-white px-5 py-4 sm:px-7 sm:py-5">
          {/* Top Row: Badges + Close Button */}
          <div className="flex items-center justify-between gap-3 mb-2.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-sky-500/20 text-sky-300 border border-sky-400/30 whitespace-nowrap">
                {lang === 'en' ? pillar?.shortNameEn : pillar?.shortName}
              </span>
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/15 text-white whitespace-nowrap">
                {lang === 'en' ? level?.nameEn : level?.name}
              </span>
              {canLearnFree ? (
                <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-[#0EA5E9] text-white inline-flex items-center gap-1 whitespace-nowrap">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>{t.modals.freeUnlockedBadge}</span>
                </span>
              ) : (
                <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-blue-600 text-white inline-flex items-center gap-1 border border-blue-400/40 whitespace-nowrap">
                  <Lock className="w-3.5 h-3.5 shrink-0" />
                  <span>{t.modals.paidCourseBadge}</span>
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition shrink-0"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Course Title & Description */}
          <h2 className="text-lg sm:text-xl lg:text-2xl font-extrabold leading-snug mb-1.5 text-white">
            {displayTitle}
          </h2>
          <p className="text-blue-100/90 text-xs sm:text-sm leading-relaxed max-w-3xl line-clamp-2 mb-3.5">
            {displayDesc}
          </p>

          {/* Bottom Metadata + Tools Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/10 text-xs text-blue-100">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-1.5 text-amber-400 font-bold whitespace-nowrap">
                <Star className="w-3.5 h-3.5 fill-amber-400 shrink-0" />
                <span>{course.rating}</span>
                <span className="text-blue-200 font-normal">
                  ({course.reviews} {t.card.reviewsLabel})
                </span>
              </div>
              <div className="flex items-center gap-1.5 whitespace-nowrap">
                <Clock className="w-3.5 h-3.5 text-sky-300 shrink-0" />
                <span>{displayDuration}</span>
              </div>
              <div className="flex items-center gap-1.5 whitespace-nowrap">
                <BookOpen className="w-3.5 h-3.5 text-sky-300 shrink-0" />
                <span>
                  {(course.syllabus || []).length || 20} {t.card.lessonsLabel}
                </span>
              </div>
            </div>

            {/* Compact Tool Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              {(course.tools || []).map((tool, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-white/10 text-white border border-white/15 whitespace-nowrap"
                >
                  <span className="p-0.5 rounded bg-white flex items-center justify-center">
                    <BrandLogo
                      brand={getBrandKeyFromText(tool)}
                      className="w-3 h-3"
                    />
                  </span>
                  <span>{tool}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Scrollable 2-Column Body (Single Clean Scrollbar) */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 bg-[#F8FAFC]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left 8 Cols: Skills & 20-Lesson Curriculum */}
            <div className="lg:col-span-8 space-y-5">
              {/* Skills Card */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-sm">
                <h3 className="text-sm sm:text-base font-extrabold text-slate-900 mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#0056D2] shrink-0" />
                  <span>{t.modals.skillsAcquiredTitle}</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {displaySkills.map((skill, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50/80 border border-slate-100 text-xs text-slate-700"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#0056D2] shrink-0 mt-0.5" />
                      <span className="font-semibold leading-snug">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 20-Lesson Curriculum Card */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3.5 border-b border-slate-100">
                  <h3 className="text-sm sm:text-base font-extrabold text-slate-900 whitespace-nowrap">
                    {t.modals.syllabusTitle} ({(course.syllabus || []).length}{' '}
                    {t.modals.lessonsCountUnit})
                  </h3>
                  <span className="text-[11px] font-bold text-[#0056D2] bg-blue-50 px-3 py-1 rounded-full border border-blue-100 whitespace-nowrap shrink-0">
                    {lang === 'en'
                      ? 'Lessons 1–5 Free • 6–20 Pro'
                      : 'Bài 1–5 Miễn phí • Bài 6–20 Nâng cao'}
                  </span>
                </div>

                <div className="space-y-2">
                  {(course.syllabus || []).map((item, idx) => {
                    const isFreeLesson = canLearnFree || idx < 5;
                    const isLessonDone = (
                      completedMap[String(course.id)] || []
                    ).includes(idx);
                    const cleanLessonTitle = String(item || '').replace(
                      /^Bài\s+\d+\s*(\[[^\]]+\])?:\s*/i,
                      ''
                    );

                    return (
                      <div
                        key={idx}
                        onClick={() => {
                          if (isFreeLesson) {
                            onStartLearning(course, idx);
                          } else {
                            handleOpenSepayCheckout();
                          }
                        }}
                        className={`flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl border cursor-pointer transition group ${
                          isLessonDone
                            ? 'border-emerald-200 bg-emerald-50/30 hover:border-emerald-400'
                            : 'border-slate-200/80 hover:border-[#0056D2] hover:bg-blue-50/30 bg-white'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div
                            className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-extrabold shrink-0 ${
                              isLessonDone
                                ? 'bg-emerald-500 text-white'
                                : isFreeLesson
                                ? 'bg-blue-50 text-[#0056D2] border border-blue-200/60'
                                : 'bg-slate-100 text-slate-500'
                            }`}
                          >
                            {isLessonDone ? (
                              <CheckCircle2 className="w-4 h-4" />
                            ) : (
                              String(idx + 1).padStart(2, '0')
                            )}
                          </div>
                          <div className="text-xs sm:text-[13px] font-bold text-slate-800 group-hover:text-[#0056D2] truncate">
                            {cleanLessonTitle}
                          </div>
                        </div>

                        {isLessonDone ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-700 text-[11px] font-extrabold whitespace-nowrap shrink-0">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>
                              {lang === 'en' ? 'Completed' : 'Đã hoàn thành'}
                            </span>
                          </span>
                        ) : isFreeLesson ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 text-[#0056D2] group-hover:bg-[#0056D2] group-hover:text-white text-[11px] font-bold whitespace-nowrap shrink-0 transition">
                            <Play className="w-3 h-3 fill-current" />
                            <span>
                              {lang === 'en' ? 'Watch' : 'Học ngay'}
                            </span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-500 text-[11px] font-semibold whitespace-nowrap shrink-0">
                            <Lock className="w-3 h-3" />
                            <span>Pro</span>
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right 4 Cols: Sticky Enrollment / SePay VietQR Card */}
            <div className="lg:col-span-4 lg:sticky lg:top-0">
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-sm">
                {!showSepayCheckout ? (
                  <>
                    <div className="relative rounded-xl overflow-hidden mb-4">
                      <img
                        src={course.thumbnail}
                        alt={displayTitle}
                        className="w-full h-36 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent" />
                      <span className="absolute bottom-2.5 left-2.5 px-2.5 py-1 rounded-lg bg-slate-950/75 backdrop-blur-sm text-white text-[11px] font-bold flex items-center gap-1.5">
                        <Play className="w-3 h-3 fill-sky-400 text-sky-400" />
                        <span>Video HD + Giọng Nam</span>
                      </span>
                    </div>

                    {canLearnFree ? (
                      <div className="mb-4">
                        <div className="text-[11px] font-extrabold text-[#0056D2] uppercase tracking-wider mb-0.5 whitespace-nowrap">
                          {t.modals.freeForYouTitle}
                        </div>
                        <div className="flex items-baseline gap-1.5 whitespace-nowrap">
                          <span className="text-2xl font-extrabold text-slate-900">
                            0đ
                          </span>
                          <span className="text-xs font-semibold text-slate-500">
                            / 20 {t.modals.lessonsCountUnit}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="mb-4">
                        <div className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider mb-0.5 whitespace-nowrap">
                          {t.modals.CourseFeeTitle}
                        </div>
                        <div className="flex items-baseline gap-2 whitespace-nowrap">
                          <span className="text-2xl font-extrabold text-[#0056D2]">
                            {Number(course.price || 0).toLocaleString('vi-VN')}đ
                          </span>
                          {course.oldPrice > 0 && (
                            <span className="text-xs text-slate-400 line-through">
                              {Number(course.oldPrice).toLocaleString('vi-VN')}đ
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {canLearnFree ? (
                      <button
                        onClick={() => onStartLearning(course, 0)}
                        className="w-full py-3 px-4 bg-[#0056D2] hover:bg-[#0046AD] text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-blue-600/20 transition flex items-center justify-center gap-2 whitespace-nowrap mb-4"
                      >
                        <Play className="w-4 h-4 fill-white shrink-0" />
                        <span>{t.modals.enterClassroomBtn}</span>
                      </button>
                    ) : (
                      <div className="space-y-2 mb-4">
                        <button
                          onClick={handleOpenSepayCheckout}
                          className="w-full py-3 px-4 bg-gradient-to-r from-[#0056D2] to-[#0284C7] hover:from-[#0046AD] hover:to-[#0369A1] text-white font-bold rounded-xl shadow-md shadow-blue-600/20 transition flex items-center justify-center gap-2 text-xs sm:text-sm whitespace-nowrap"
                        >
                          <QrCode className="w-4 h-4 shrink-0" />
                          <span>{t.modals.buyWithSepayBtn}</span>
                        </button>

                        <button
                          onClick={() => onStartLearning(course, 0)}
                          className="w-full py-2.5 px-4 bg-blue-50/70 hover:bg-blue-100/80 text-[#0056D2] font-bold rounded-xl border border-blue-200 transition flex items-center justify-center gap-1.5 text-xs whitespace-nowrap"
                        >
                          <Play className="w-3.5 h-3.5 fill-[#0056D2] shrink-0" />
                          <span>
                            {lang === 'en'
                              ? 'Preview 5 Free Lessons'
                              : 'Học Thử 5 Bài Đầu Miễn Phí'}
                          </span>
                        </button>
                      </div>
                    )}

                    <div className="space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-3.5">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0056D2] shrink-0" />
                        <span className="truncate">{t.modals.guarantee1}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0056D2] shrink-0" />
                        <span className="truncate">{t.modals.guarantee2}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0056D2] shrink-0" />
                        <span className="truncate">{t.modals.guarantee3}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0056D2] shrink-0" />
                        <span className="truncate">{t.modals.guarantee4}</span>
                      </div>
                    </div>
                  </>
                ) : (
                /* SEPAY VIETQR CHECKOUT PANEL (MBBank: 789220206) */
                <div className="space-y-4 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-extrabold text-[#0056D2] bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      {t.modals.sepayHeaderBadge}
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowSepayCheckout(false)}
                      className="text-xs font-bold text-slate-500 hover:text-slate-800"
                    >
                      ← Quay lại
                    </button>
                  </div>

                  <h4 className="text-base font-extrabold text-slate-900">
                    {t.modals.sepayModalTitle}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {t.modals.sepayScanQrInstruction}
                  </p>

                  {creatingOrder ? (
                    <div className="py-10 text-center text-xs font-bold text-slate-500">
                      Đang khởi tạo mã QR SePay...
                    </div>
                  ) : (
                    orderData && (
                      <>
                        <div className="bg-white p-3.5 rounded-2xl border border-blue-200 shadow-sm flex flex-col items-center">
                          <img
                            src={orderData.qrUrl}
                            alt="SePay VietQR MBBank 789220206"
                            className="w-52 h-52 object-contain rounded-lg"
                          />
                          <span className="mt-2 text-[11px] font-bold text-[#0056D2]">
                            SePay • VietQR • {bankName} ({accountNumber})
                          </span>
                        </div>

                        <div className="bg-white rounded-xl p-3.5 border border-slate-200 space-y-2.5 text-xs">
                          <div className="flex items-center justify-between">
                            <span className="text-slate-500">
                              {t.modals.bankLabel}:
                            </span>
                            <span className="font-extrabold text-slate-900">
                              {bankName}
                            </span>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-slate-500">
                              {t.modals.accountNoLabel}:
                            </span>
                            <div className="flex items-center gap-1.5">
                              <span className="font-mono font-extrabold text-[#0056D2] text-sm">
                                {accountNumber}
                              </span>
                              <button
                                type="button"
                                onClick={() =>
                                  handleCopy(accountNumber, 'acc')
                                }
                                className="px-2 py-0.5 rounded bg-blue-50 text-[#0056D2] font-bold text-[11px]"
                              >
                                {copiedField === 'acc'
                                  ? t.modals.copiedBtn
                                  : t.modals.copyBtn}
                              </button>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-slate-500">
                              {t.modals.amountLabel}:
                            </span>
                            <span className="font-extrabold text-slate-900 text-sm">
                              {Number(course.price || 0).toLocaleString('vi-VN')}
                              đ
                            </span>
                          </div>

                          <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                            <span className="text-slate-500">
                              {t.modals.transferContentLabel}:
                            </span>
                            <div className="flex items-center gap-1.5">
                              <span className="font-mono font-extrabold text-[#0056D2] bg-blue-50 px-2 py-0.5 rounded">
                                {orderData.order?.order_code}
                              </span>
                              <button
                                type="button"
                                onClick={() =>
                                  handleCopy(
                                    orderData.order?.order_code,
                                    'code'
                                  )
                                }
                                className="px-2 py-0.5 rounded bg-blue-50 text-[#0056D2] font-bold text-[11px]"
                              >
                                {copiedField === 'code'
                                  ? t.modals.copiedBtn
                                  : t.modals.copyBtn}
                              </button>
                            </div>
                          </div>
                        </div>

                        {statusMessage && (
                          <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-[#0056D2] text-xs font-bold">
                            {statusMessage}
                          </div>
                        )}

                        <button
                          type="button"
                          onClick={handleVerifyOrder}
                          disabled={checkingStatus}
                          className="w-full py-3 px-4 rounded-xl bg-[#0056D2] hover:bg-[#0046AD] text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2 whitespace-nowrap"
                        >
                          <RefreshCw
                            className={`w-3.5 h-3.5 shrink-0 ${
                              checkingStatus ? 'animate-spin' : ''
                            }`}
                          />
                          <span>{t.modals.checkPaymentBtn}</span>
                        </button>

                        <a
                          href={CONTACT_INFO.zaloUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-blue-50 text-[#0056D2] border border-blue-200 font-bold text-xs transition flex items-center justify-center gap-1.5 whitespace-nowrap"
                        >
                          <span>{t.modals.zaloSupportBtn}</span>
                          <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                        </a>
                      </>
                    )
                  )}
                </div>
              )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ClassroomModal({
  course,
  initialLessonIndex = 0,
  user,
  unlockedIds = [],
  onClose,
  onRequestUnlock,
}) {
  const { lang, t } = useLanguage();
  const [activeLesson, setActiveLesson] = useState(initialLessonIndex || 0);
  const [activeTab, setActiveTab] = useState('video'); // 'video' | 'exercises'
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [labText, setLabText] = useState('');
  const [submittedQuiz, setSubmittedQuiz] = useState(false);
  const [completedMap, setCompletedMap] = useState(() => readCompletedMap());

  useEffect(() => {
    setActiveLesson(initialLessonIndex || 0);
    setActiveTab('video');
    setSelectedAnswers({});
    setLabText('');
    setSubmittedQuiz(false);
    setCompletedMap(readCompletedMap());
  }, [course, initialLessonIndex]);

  if (!course) return null;

  const completedLessons = Array.isArray(completedMap[String(course.id)])
    ? completedMap[String(course.id)]
    : [];
  const isCurrentLessonDone = completedLessons.includes(activeLesson);

  const handleMarkCompleted = (lessonIdx = activeLesson) => {
    const updated = markCourseLessonCompleted(course.id, lessonIdx);
    setCompletedMap({ ...updated });
  };

  const isStudentFree = user?.role === 'student' && course.freeForStudent;
  const isBusinessFree = user?.role === 'business' && course.freeForBusiness;
  const isPurchased =
    unlockedIds.includes(course.id) ||
    (user?.unlockedCourses || []).includes(course.id) ||
    user?.role === 'admin';
  const canLearnAll =
    course.isFree || isStudentFree || isBusinessFree || isPurchased;

  const syllabus =
    Array.isArray(course.syllabus) && course.syllabus.length > 0
      ? course.syllabus
      : ['Bài 1: Tổng quan & Thực hành cốt lõi'];

  const displayTitle =
    lang === 'en' ? course.titleEn || course.title : course.title;

  const currentLessonTitleVi = syllabus[activeLesson] || syllabus[0];
  const currentLessonTitleEn = `Lesson ${activeLesson + 1}: ${
    course.titleEn || course.title
  } (${activeLesson < 5 ? 'Free Foundation' : 'Advanced Mastery'})`;

  const exerciseData = buildLessonExercises(course, activeLesson, lang);

  const correctCount = exerciseData.quiz.reduce((acc, q) => {
    return acc + (selectedAnswers[q.id] === q.correctIndex ? 1 : 0);
  }, 0);

  return (
    <div
      onContextMenu={(e) => e.preventDefault()}
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/65 backdrop-blur-sm select-none"
    >
      <div className="bg-white text-slate-900 w-full max-w-[1360px] rounded-3xl shadow-2xl border border-blue-100 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Bar (Bright Clean Header) */}
        <div className="shrink-0 px-4 sm:px-6 py-3.5 bg-white border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <img
              src="/logo-5s.png"
              alt="5S AI Education"
              className="h-7 w-auto object-contain shrink-0"
              draggable={false}
            />
            <span className="px-2.5 py-1 rounded-lg text-xs font-extrabold bg-blue-50 text-[#0056D2] border border-blue-200/80 whitespace-nowrap shrink-0">
              {t.modals.classroomBadge}
            </span>
            <h3 className="font-extrabold text-xs sm:text-base text-slate-900 truncate">
              {displayTitle}
            </h3>
          </div>

          <div className="flex items-center gap-2.5">
            <LanguageSwitcher />
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 flex items-center gap-1.5 whitespace-nowrap shrink-0 transition"
            >
              <X className="w-4 h-4" />
              <span>{t.modals.closeBtn}</span>
            </button>
          </div>
        </div>

        {/* Main Classroom Area (Bright 2-Column Layout, No Flex Squishing) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 min-h-0 overflow-hidden">
          {/* Left 8 Cols: Protected Video + Theory + Interactive Exercises */}
          <div className="lg:col-span-8 p-4 sm:p-6 space-y-5 bg-[#F8FAFC] overflow-y-auto h-full">
            {/* Sub-navigation Tabs: Video & Theory vs Practical Exercises */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-2.5 rounded-2xl border border-slate-200/90 shadow-xs">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('video')}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold flex items-center gap-2 transition whitespace-nowrap ${
                    activeTab === 'video'
                      ? 'bg-[#0056D2] text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'
                  }`}
                >
                  <Play className="w-4 h-4 shrink-0" />
                  <span>
                    {lang === 'en'
                      ? '1. Video Tutorial & Theory'
                      : '1. Video Hướng Dẫn & Lý Thuyết'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('exercises')}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold flex items-center gap-2 transition whitespace-nowrap ${
                    activeTab === 'exercises'
                      ? 'bg-[#0056D2] text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'
                  }`}
                >
                  <ClipboardCheck className="w-4 h-4 shrink-0" />
                  <span>
                    {lang === 'en'
                      ? '2. Practical Exercises & Quiz'
                      : '2. Bài Tập Thực Hành & Kiểm Tra'}
                  </span>
                </button>
              </div>

              <span className="px-3 py-1 rounded-full bg-blue-50 text-[#0056D2] border border-blue-100 text-xs font-extrabold whitespace-nowrap">
                {lang === 'en'
                  ? `Lesson ${activeLesson + 1} / ${syllabus.length}`
                  : `Bài ${activeLesson + 1} / ${syllabus.length}`}
              </span>
            </div>

            {activeTab === 'video' ? (
              <>
                {/* Protected Video Player with Male Voiceover, Top-Left Logo & Anti-Capture DRM */}
                <ProtectedVideoPlayer
                  course={course}
                  lessonIndex={activeLesson}
                  lessonTitleVi={currentLessonTitleVi}
                  lessonTitleEn={currentLessonTitleEn}
                  user={user}
                  isCompleted={isCurrentLessonDone}
                  onLessonComplete={(idx) => handleMarkCompleted(idx)}
                />

                {/* Comprehensive Written Theory Box (Light UI) */}
                <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
                    <h4 className="text-sm sm:text-base font-extrabold text-slate-900 flex items-center gap-2">
                      <FileCode2 className="w-5 h-5 text-[#0056D2] shrink-0" />
                      <span>
                        {lang === 'en'
                          ? `Core Theory & Action Guide — Lesson ${activeLesson + 1}`
                          : `Nội Dung Lý Thuyết & Quy Trình Thao Tác — Bài ${activeLesson + 1}`}
                      </span>
                    </h4>
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          handleMarkCompleted(activeLesson);
                          const nextIdx = activeLesson + 1;
                          if (
                            nextIdx < syllabus.length &&
                            (canLearnAll || nextIdx < 5)
                          ) {
                            setActiveLesson(nextIdx);
                          }
                        }}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition whitespace-nowrap ${
                          isCurrentLessonDone
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-300 hover:bg-emerald-100'
                            : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                        }`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                        <span>
                          {isCurrentLessonDone
                            ? lang === 'en'
                              ? 'Completed • Next Lesson →'
                              : 'Đã hoàn thành • Qua bài tiếp →'
                            : lang === 'en'
                            ? 'Mark Lesson Complete'
                            : 'Hoàn thành bài này'}
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setActiveTab('exercises')}
                        className="px-3.5 py-1.5 rounded-xl bg-blue-50 hover:bg-[#0056D2] text-[#0056D2] hover:text-white border border-blue-200 text-xs font-extrabold transition whitespace-nowrap"
                      >
                        {lang === 'en'
                          ? 'Do Lesson Exercise →'
                          : 'Làm Bài Tập Bài Này →'}
                      </button>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {lang === 'en'
                      ? course.descriptionEn || course.description
                      : course.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                    <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100">
                      <div className="text-xs font-extrabold text-[#0056D2] mb-2">
                        {lang === 'en'
                          ? 'Key Steps Covered in Video:'
                          : 'Các bước thao tác trong Video:'}
                      </div>
                      <ul className="space-y-1.5 text-xs text-slate-700 font-medium">
                        <li>
                          •{' '}
                          {lang === 'en'
                            ? `Step 1: Initialize ${(course.tools || [])[0] || 'AI'} workspace`
                            : `Bước 1: Mở ứng dụng ${(course.tools || [])[0] || 'AI'} & nạp dữ liệu`}
                        </li>
                        <li>
                          •{' '}
                          {lang === 'en'
                            ? 'Step 2: Configure parameters & execute command'
                            : 'Bước 2: Thiết lập tham số & chạy câu lệnh chuẩn 5S'}
                        </li>
                        <li>
                          •{' '}
                          {lang === 'en'
                            ? 'Step 3: Audit security & validate output quality'
                            : 'Bước 3: Kiểm tra chéo kết quả & bảo mật dữ liệu'}
                        </li>
                      </ul>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                      <div className="text-xs font-extrabold text-[#0056D2] mb-2">
                        {lang === 'en'
                          ? 'Competencies Mastered:'
                          : 'Kỹ năng đạt được sau bài học:'}
                      </div>
                      <ul className="space-y-1.5 text-xs text-slate-700 font-medium">
                        {(lang === 'en' && course.skillsEn?.length
                          ? course.skillsEn
                          : course.skills || []
                        )
                          .slice(0, 3)
                          .map((sk, i) => (
                            <li key={i}>• {sk}</li>
                          ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              /* TAB 2: PRACTICAL EXERCISES & QUIZ LAB (LIGHT UI) */
              <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-xs space-y-6 animate-fadeIn">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
                  <div>
                    <h4 className="text-base sm:text-lg font-extrabold text-slate-900 flex items-center gap-2">
                      <Award className="w-5 h-5 text-[#0056D2]" />
                      <span>
                        {lang === 'en'
                          ? `Practical Lab & Quiz — Lesson ${activeLesson + 1}`
                          : `Bài Tập Thực Hành & Trắc Nghiệm — Bài ${activeLesson + 1}`}
                      </span>
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {lang === 'en'
                        ? 'Complete the 3 theory questions and the hands-on exercise below.'
                        : 'Hoàn thành 3 câu hỏi lý thuyết và bài tập viết câu lệnh thực hành bên dưới.'}
                    </p>
                  </div>

                  {submittedQuiz && (
                    <span className="px-3.5 py-1.5 rounded-xl bg-blue-50 border border-blue-200 text-[#0056D2] text-xs font-extrabold whitespace-nowrap">
                      {lang === 'en'
                        ? `Score: ${correctCount}/${exerciseData.quiz.length} Correct`
                        : `Kết quả: Đúng ${correctCount}/${exerciseData.quiz.length} câu`}
                    </span>
                  )}
                </div>

                {/* Multiple Choice Questions */}
                <div className="space-y-4">
                  {exerciseData.quiz.map((q) => (
                    <div
                      key={q.id}
                      className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/80 space-y-2.5"
                    >
                      <div className="text-xs sm:text-sm font-extrabold text-slate-900">
                        {q.question}
                      </div>
                      <div className="space-y-2">
                        {q.options.map((opt, optIdx) => {
                          const isChosen = selectedAnswers[q.id] === optIdx;
                          const isCorrect = q.correctIndex === optIdx;
                          let btnStyle =
                            'bg-white border-slate-200 text-slate-700 hover:border-blue-300';
                          if (submittedQuiz) {
                            if (isCorrect) {
                              btnStyle =
                                'bg-emerald-50 border-emerald-400 text-emerald-800';
                            } else if (isChosen && !isCorrect) {
                              btnStyle =
                                'bg-red-50 border-red-300 text-red-700';
                            }
                          } else if (isChosen) {
                            btnStyle =
                              'bg-blue-50 border-[#0056D2] text-[#0056D2]';
                          }

                          return (
                            <button
                              key={optIdx}
                              type="button"
                              onClick={() => {
                                setSubmittedQuiz(false);
                                setSelectedAnswers((prev) => ({
                                  ...prev,
                                  [q.id]: optIdx,
                                }));
                              }}
                              className={`w-full text-left p-3 rounded-xl border text-xs font-bold transition flex items-center justify-between gap-2 ${btnStyle}`}
                            >
                              <span>{opt}</span>
                              {submittedQuiz && isCorrect && (
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Hands-On Practical Exercise Box */}
                <div className="p-4 rounded-xl bg-blue-50/40 border border-blue-200/70 space-y-3">
                  <label className="block text-xs sm:text-sm font-extrabold text-slate-900">
                    {exerciseData.practicalPrompt}
                  </label>
                  <textarea
                    rows={3}
                    value={labText}
                    onChange={(e) => setLabText(e.target.value)}
                    placeholder={exerciseData.sampleSolution}
                    className="w-full p-3 rounded-xl bg-white border border-slate-300 focus:border-[#0056D2] focus:outline-none text-xs font-mono text-slate-800"
                  />
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => setLabText(exerciseData.sampleSolution)}
                      className="text-xs font-bold text-[#0056D2] hover:underline"
                    >
                      {lang === 'en'
                        ? 'Insert Standard 5S AI Solution Template'
                        : 'Điền mẫu lời giải chuẩn 5S AI'}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setSubmittedQuiz(true);
                        handleMarkCompleted(activeLesson);
                      }}
                      className="px-5 py-2.5 rounded-xl bg-[#0056D2] hover:bg-[#0046AD] text-white font-extrabold text-xs shadow-md transition whitespace-nowrap"
                    >
                      {lang === 'en'
                        ? 'Submit & Mark Lesson Complete'
                        : 'Nộp Bài & Hoàn Thành Bài Học'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right 4 Cols: 20-Lesson Playlist Sidebar (Bright Clean Sidebar + Completion Checkmarks) */}
          <div className="lg:col-span-4 bg-white border-l border-slate-200 p-4 sm:p-5 overflow-y-auto h-full">
            <div className="mb-3.5 pb-3 border-b border-slate-100 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 whitespace-nowrap">
                  {t.modals.courseContentSidebar} ({syllabus.length}{' '}
                  {t.modals.lessonsCountUnit})
                </h4>
                <span className="text-[11px] font-extrabold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full whitespace-nowrap">
                  {lang === 'en'
                    ? `Done: ${completedLessons.length}/${syllabus.length}`
                    : `Hoàn thành: ${completedLessons.length}/${syllabus.length} bài`}
                </span>
              </div>

              {/* Course Completion Progress Bar */}
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  style={{
                    width: `${Math.min(
                      100,
                      Math.round(
                        (completedLessons.length / (syllabus.length || 20)) *
                          100
                      )
                    )}%`,
                  }}
                  className="h-full bg-emerald-500 transition-all duration-300"
                />
              </div>
            </div>

            <div className="space-y-2">
              {syllabus.map((item, idx) => {
                const isLessonUnlocked = canLearnAll || idx < 5;
                const isLessonDone = completedLessons.includes(idx);
                const cleanTitle = String(item || '').replace(
                  /^Bài\s+\d+\s*(\[[^\]]+\])?:\s*/i,
                  ''
                );
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      if (isLessonUnlocked) {
                        setActiveLesson(idx);
                        setSubmittedQuiz(false);
                      } else if (onRequestUnlock) {
                        onRequestUnlock();
                      }
                    }}
                    className={`w-full text-left px-3 py-2.5 rounded-xl border transition flex items-center justify-between gap-2.5 ${
                      activeLesson === idx
                        ? 'bg-blue-50/90 border-[#0056D2] text-[#0056D2] shadow-2xs'
                        : isLessonDone
                        ? 'bg-emerald-50/40 border-emerald-200 text-slate-800 hover:border-emerald-400'
                        : isLessonUnlocked
                        ? 'bg-white border-slate-200/80 text-slate-800 hover:border-blue-300 hover:bg-slate-50/70'
                        : 'bg-slate-50/70 border-slate-200/60 text-slate-400 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        className={`w-6 h-6 rounded-md flex items-center justify-center text-[11px] font-extrabold shrink-0 ${
                          isLessonDone
                            ? 'bg-emerald-500 text-white'
                            : activeLesson === idx
                            ? 'bg-[#0056D2] text-white'
                            : isLessonUnlocked
                            ? 'bg-blue-50 text-[#0056D2]'
                            : 'bg-slate-200/70 text-slate-500'
                        }`}
                      >
                        {isLessonDone ? (
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        ) : (
                          String(idx + 1).padStart(2, '0')
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold leading-snug truncate">
                          {cleanTitle}
                        </div>
                        <div
                          className={`text-[10px] font-semibold ${
                            isLessonDone ? 'text-emerald-600' : 'text-slate-500'
                          }`}
                        >
                          {isLessonDone
                            ? lang === 'en'
                              ? '✓ Completed'
                              : '✓ Đã hoàn thành'
                            : idx < 5
                            ? lang === 'en'
                              ? 'Free Foundation'
                              : 'Cơ bản Miễn phí'
                            : lang === 'en'
                            ? 'Advanced + Lab'
                            : 'Nâng cao + Bài tập'}
                        </div>
                      </div>
                    </div>

                    {isLessonDone ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    ) : isLessonUnlocked ? (
                      <Play className="w-3.5 h-3.5 text-[#0056D2] shrink-0" />
                    ) : (
                      <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
