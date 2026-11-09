import React, { useState } from 'react';
import {
  GraduationCap,
  Flame,
  Award,
  Sparkles,
  BookOpen,
  CheckCircle2,
  Play,
  ArrowRight,
  Compass,
  Trophy,
  Star,
  ShieldCheck,
  Code2,
  Presentation,
  HelpCircle,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function StudentDashboard({
  user,
  courses = [],
  unlockedIds = [],
  onStartCourse,
  onBackToCatalog,
}) {
  const { lang } = useLanguage();
  const isEn = lang === 'en';

  const [activeTab, setActiveTab] = useState('overview');
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Student free courses (beginner tier or marked free for students)
  const studentFreeCourses = courses.filter(
    (c) => c.isFree || c.freeForStudent || c.level === 'beginner'
  );

  const completedCount = unlockedIds.length;

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-16">
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-[#0369A1] via-[#0284C7] to-[#0EA5E9] text-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/15 backdrop-blur-md border-2 border-white/30 flex items-center justify-center text-3xl shadow-xl shrink-0">
                🎓
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-extrabold uppercase tracking-wider mb-2 border border-white/20">
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>
                    {isEn
                      ? '5S Student Campus • 100% Free Pass'
                      : 'Không Gian Học Sinh 5S • Mở Khóa Miễn Phí'}
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  {isEn ? 'Hello,' : 'Chào bạn,'} {user?.name || (isEn ? 'Student' : 'Học sinh')}!
                </h1>
                <p className="text-sky-100 text-xs sm:text-sm mt-1 max-w-xl">
                  {isEn
                    ? 'Explore free foundational AI courses, build algorithmic thinking, and earn your digital badges.'
                    : 'Khám phá các khóa học AI nền tảng miễn phí, rèn luyện tư duy logic thuật toán và tích lũy huy hiệu học tập.'}
                </p>
              </div>
            </div>

            {/* Gamification Stats */}
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-3 sm:p-4 rounded-2xl border border-white/20">
              <div className="text-center px-3 border-r border-white/20">
                <div className="flex items-center justify-center gap-1 text-amber-300 font-extrabold text-lg sm:text-xl">
                  <Flame className="w-5 h-5 fill-amber-300" />
                  <span>5 Ngày</span>
                </div>
                <div className="text-[11px] text-sky-100 font-semibold">
                  {isEn ? 'Daily Streak' : 'Chuỗi học tập'}
                </div>
              </div>
              <div className="text-center px-3 border-r border-white/20">
                <div className="flex items-center justify-center gap-1 text-yellow-300 font-extrabold text-lg sm:text-xl">
                  <Star className="w-5 h-5 fill-yellow-300" />
                  <span>1,250 XP</span>
                </div>
                <div className="text-[11px] text-sky-100 font-semibold">
                  {isEn ? 'Points Earned' : 'Điểm tích lũy'}
                </div>
              </div>
              <div className="text-center px-3">
                <div className="flex items-center justify-center gap-1 text-emerald-300 font-extrabold text-lg sm:text-xl">
                  <Trophy className="w-5 h-5" />
                  <span>3 Huy hiệu</span>
                </div>
                <div className="text-[11px] text-sky-100 font-semibold">
                  {isEn ? 'Badges' : 'Huy hiệu đạt'}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Sub-Tabs */}
          <div className="flex items-center gap-2 mt-8 pt-4 border-t border-white/20 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
                activeTab === 'overview'
                  ? 'bg-white text-[#0284C7] shadow-md'
                  : 'text-white/80 hover:bg-white/10'
              }`}
            >
              {isEn ? 'Free Foundational Courses' : 'Khóa Học Nền Tảng Miễn Phí'}
            </button>
            <button
              onClick={() => setActiveTab('compass')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
                activeTab === 'compass'
                  ? 'bg-white text-[#0284C7] shadow-md'
                  : 'text-white/80 hover:bg-white/10'
              }`}
            >
              {isEn ? 'Future Career Compass' : 'La Bàn Hướng Nghiệp Tương Lai'}
            </button>
            <button
              onClick={() => setActiveTab('badges')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
                activeTab === 'badges'
                  ? 'bg-white text-[#0284C7] shadow-md'
                  : 'text-white/80 hover:bg-white/10'
              }`}
            >
              {isEn ? 'Badges & Quests' : 'Huy Hiệu & Thử Thách'}
            </button>
            <div className="ml-auto">
              <button
                onClick={onBackToCatalog}
                className="px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs sm:text-sm font-bold transition flex items-center gap-1.5 whitespace-nowrap"
              >
                <span>{isEn ? '← Browse All Courses' : '← Xem Toàn Bộ Khóa Học'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Student Motivation Notice */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-sky-50 to-blue-50 border border-sky-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#0284C7] text-white shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900">
                    {isEn
                      ? 'Student Special Privilege: 100% Free Foundational Access'
                      : 'Đặc Quyền Dành Riêng Cho Học Sinh: Học Miễn Phí 100%'}
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    {isEn
                      ? 'You have unlimited access to fundamental lessons. Intermediate and Pro courses can be upgraded at anytime with student scholarship.'
                      : 'Bạn được học trọn đời các bài học nền tảng. Khi muốn học nâng cao để làm dự án lớn, bạn có thể xin cấp học bổng hoặc nâng cấp sau.'}
                  </p>
                </div>
              </div>
              <button
                onClick={onBackToCatalog}
                className="px-4 py-2 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold transition shadow-sm whitespace-nowrap"
              >
                {isEn ? 'Explore Catalog' : 'Xem Thêm Khóa Khác'}
              </button>
            </div>

            {/* Free Courses Grid */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-[#0284C7]" />
                  <span>
                    {isEn
                      ? 'Your Free Foundational Courses'
                      : 'Khóa Học Nền Tảng Miễn Phí Dành Cho Bạn'}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-sky-100 text-[#0284C7] font-bold">
                    {studentFreeCourses.length} {isEn ? 'courses' : 'khóa'}
                  </span>
                </h3>
              </div>

              {studentFreeCourses.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {studentFreeCourses.map((c) => (
                    <div
                      key={c.id}
                      className="bg-white rounded-2xl border border-blue-100 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
                    >
                      <div className="relative aspect-video overflow-hidden bg-slate-100">
                        <img
                          src={c.image || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80'}
                          alt={c.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition"
                        />
                        <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-lg bg-emerald-500 text-white text-[10px] font-extrabold shadow">
                          {isEn ? 'FREE 100%' : 'MIỄN PHÍ 100%'}
                        </div>
                      </div>

                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="text-[11px] font-bold text-[#0284C7] uppercase mb-1">
                            {c.pillar === 'ai-coding'
                              ? 'AI Coding'
                              : c.pillar === 'google-security'
                              ? 'Google & Security'
                              : 'Office AI'}
                          </div>
                          <h4 className="text-sm font-extrabold text-slate-900 line-clamp-2 mb-1.5">
                            {isEn ? c.titleEn || c.title : c.title}
                          </h4>
                          <p className="text-xs text-slate-500 line-clamp-2">
                            {isEn ? c.descriptionEn || c.description : c.description}
                          </p>
                        </div>

                        <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-400">
                            20 {isEn ? 'lessons' : 'bài giảng'}
                          </span>
                          <button
                            type="button"
                            onClick={() => onStartCourse && onStartCourse(c)}
                            className="px-3.5 py-1.5 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold flex items-center gap-1 shadow-sm transition"
                          >
                            <Play className="w-3.5 h-3.5 fill-white" />
                            <span>{isEn ? 'Start Learning' : 'Vào Học Ngay'}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-slate-500">
                  {isEn
                    ? 'No courses available right now.'
                    : 'Chưa có khóa học nào. Quản trị viên đang cập nhật.'}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Future Career Compass */}
        {activeTab === 'compass' && (
          <div className="space-y-6">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-[#0284C7] text-xs font-bold mb-2">
                <Compass className="w-4 h-4" />
                <span>{isEn ? 'CAREER DISCOVERY' : 'ĐỊNH HƯỚNG TƯƠNG LAI'}</span>
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900">
                {isEn
                  ? 'Discover High-Paying Next-Gen Tech Careers'
                  : 'Khám Phá Các Ngành Nghề Công Nghệ Đón Đầu Kỷ Nguyên AI'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                {isEn
                  ? 'Learn the right skills early so you stand out when entering college or the job market.'
                  : 'Trang bị kỹ năng sớm để luôn tự tin khi bước vào giảng đường Đại học hoặc thị trường việc làm.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Career 1 */}
              <div className="bg-white rounded-2xl p-6 border border-sky-200 shadow-sm hover:shadow-md transition">
                <div className="w-12 h-12 rounded-2xl bg-sky-50 text-[#0284C7] flex items-center justify-center mb-4">
                  <Code2 className="w-6 h-6" />
                </div>
                <h4 className="text-base font-extrabold text-slate-900 mb-1">
                  1. Kỹ sư AI-Native (AI Software Engineer)
                </h4>
                <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                  Làm chủ Antigravity IDE, Cursor và Claude để tạo ra Website, App và Tool tự động hóa tốc độ cao.
                </p>
                <div className="space-y-2 text-xs text-slate-700 bg-sky-50/60 p-3 rounded-xl border border-sky-100">
                  <div className="font-bold text-[#0284C7]">Kỹ năng trọng tâm:</div>
                  <div>• Tư duy kiến trúc hệ thống & Prompt kỹ thuật</div>
                  <div>• Sử dụng agy CLI & Quản trị Git</div>
                  <div>• Xây dựng Full-stack Web với React & Node.js</div>
                </div>
              </div>

              {/* Career 2 */}
              <div className="bg-white rounded-2xl p-6 border border-blue-200 shadow-sm hover:shadow-md transition">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0056D2] flex items-center justify-center mb-4">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h4 className="text-base font-extrabold text-slate-900 mb-1">
                  2. Chuyên gia Bảo mật Số (Cyber Security Analyst)
                </h4>
                <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                  Bảo vệ dữ liệu người dùng, chống lừa đảo Phishing, cấu hình 2FA sinh trắc học và hệ thống Zero-Trust.
                </p>
                <div className="space-y-2 text-xs text-slate-700 bg-blue-50/60 p-3 rounded-xl border border-blue-100">
                  <div className="font-bold text-[#0056D2]">Kỹ năng trọng tâm:</div>
                  <div>• Bảo mật tài khoản Google & Workspace</div>
                  <div>• Nhận diện mã độc & bẫy lừa đảo mạng</div>
                  <div>• Mã hóa dữ liệu & Quản lý thiết bị an toàn</div>
                </div>
              </div>

              {/* Career 3 */}
              <div className="bg-white rounded-2xl p-6 border border-emerald-200 shadow-sm hover:shadow-md transition">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                  <Presentation className="w-6 h-6" />
                </div>
                <h4 className="text-base font-extrabold text-slate-900 mb-1">
                  3. Chuyên viên Tự động hóa & Dữ liệu (AI Automation)
                </h4>
                <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                  Tự động hóa báo cáo Excel với Copilot, tạo bài thuyết trình ấn tượng trên PowerPoint và thiết kế đồ họa Canva.
                </p>
                <div className="space-y-2 text-xs text-slate-700 bg-emerald-50/60 p-3 rounded-xl border border-emerald-100">
                  <div className="font-bold text-emerald-700">Kỹ năng trọng tâm:</div>
                  <div>• Xử lý bảng tính & Hàm XLOOKUP tự động</div>
                  <div>• Thiết kế ấn phẩm Canva Magic Studio</div>
                  <div>• Trình bày dữ liệu báo cáo thuyết phục</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Badges & Quests */}
        {activeTab === 'badges' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Badges */}
            <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
              <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-500" />
                <span>{isEn ? 'Your Achievements & Badges' : 'Huy Hiệu & Thành Tựu Học Tập'}</span>
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-center space-y-2">
                  <div className="text-3xl">🏅</div>
                  <div className="text-xs font-extrabold text-amber-900">
                    Thám Hiểm AI
                  </div>
                  <div className="text-[10px] text-amber-700">
                    Hoàn thành bài học đầu tiên
                  </div>
                  <span className="inline-block px-2 py-0.5 rounded bg-emerald-500 text-white text-[9px] font-bold">
                    ✓ Đã nhận
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-sky-50 border border-sky-200 text-center space-y-2">
                  <div className="text-3xl">🛡️</div>
                  <div className="text-xs font-extrabold text-sky-900">
                    Vệ Sĩ An Toàn Số
                  </div>
                  <div className="text-[10px] text-sky-700">
                    Bật 2FA & hiểu về Passkeys
                  </div>
                  <span className="inline-block px-2 py-0.5 rounded bg-emerald-500 text-white text-[9px] font-bold">
                    ✓ Đã nhận
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-purple-50 border border-purple-200 text-center space-y-2">
                  <div className="text-3xl">🚀</div>
                  <div className="text-xs font-extrabold text-purple-900">
                    Thợ Săn Prompt
                  </div>
                  <div className="text-[10px] text-purple-700">
                    Tạo 5 Prompt AI thành công
                  </div>
                  <span className="inline-block px-2 py-0.5 rounded bg-emerald-500 text-white text-[9px] font-bold">
                    ✓ Đã nhận
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-2 opacity-60">
                  <div className="text-3xl">🏆</div>
                  <div className="text-xs font-extrabold text-slate-700">
                    Chiến Binh Antigravity
                  </div>
                  <div className="text-[10px] text-slate-500">
                    Chạy lệnh agy không lỗi
                  </div>
                  <span className="inline-block px-2 py-0.5 rounded bg-slate-300 text-slate-700 text-[9px] font-bold">
                    Khóa (Cần 500 XP)
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-2 opacity-60">
                  <div className="text-3xl">📊</div>
                  <div className="text-xs font-extrabold text-slate-700">
                    Phù Thủy Excel
                  </div>
                  <div className="text-[10px] text-slate-500">
                    Viết hàm XLOOKUP tự động
                  </div>
                  <span className="inline-block px-2 py-0.5 rounded bg-slate-300 text-slate-700 text-[9px] font-bold">
                    Khóa (Cần 800 XP)
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-2 opacity-60">
                  <div className="text-3xl">👑</div>
                  <div className="text-xs font-extrabold text-slate-700">
                    Đại Sứ Công Nghệ 5S
                  </div>
                  <div className="text-[10px] text-slate-500">
                    Hoàn thành chuỗi 30 ngày
                  </div>
                  <span className="inline-block px-2 py-0.5 rounded bg-slate-300 text-slate-700 text-[9px] font-bold">
                    Khóa
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Daily Quest Quiz */}
            <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-sky-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0284C7] flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4" />
                  <span>{isEn ? 'Daily AI Quiz' : 'Thử Thách Đố Vui Hôm Nay'}</span>
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-extrabold">
                  +50 XP
                </span>
              </div>

              <h4 className="text-sm font-extrabold text-slate-900 leading-snug">
                Khi nhận được email yêu cầu đăng nhập khẩn cấp kèm link lạ có đuôi `.exe`, bạn nên làm gì?
              </h4>

              <div className="space-y-2 pt-2">
                {[
                  { id: 'A', text: 'A. Tải về và mở file để kiểm tra nội dung' },
                  { id: 'B', text: 'B. Nhấp ngay vào link và nhập mật khẩu' },
                  { id: 'C', text: 'C. Xóa email, báo cáo lừa đảo và không nhấp vào bất kỳ link nào' },
                  { id: 'D', text: 'D. Chuyển tiếp cho bạn bè cùng mở' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      if (!quizSubmitted) setQuizAnswer(opt.id);
                    }}
                    className={`w-full text-left p-3 rounded-xl text-xs font-semibold border transition ${
                      quizAnswer === opt.id
                        ? 'bg-sky-50 border-[#0284C7] text-[#0284C7] font-bold'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {opt.text}
                  </button>
                ))}
              </div>

              <div className="pt-2">
                {!quizSubmitted ? (
                  <button
                    type="button"
                    disabled={!quizAnswer}
                    onClick={() => setQuizSubmitted(true)}
                    className="w-full py-2.5 rounded-xl bg-[#0284C7] disabled:bg-slate-300 text-white font-bold text-xs shadow-sm transition"
                  >
                    {isEn ? 'Submit Answer' : 'Kiểm Tra Câu Trả Lời'}
                  </button>
                ) : (
                  <div
                    className={`p-3 rounded-xl text-xs font-bold ${
                      quizAnswer === 'C'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'bg-red-50 text-red-800 border border-red-200'
                    }`}
                  >
                    {quizAnswer === 'C'
                      ? '🎉 Chính xác! Bạn nhận được +50 XP vì đã phát hiện đúng dấu hiệu lừa đảo Phishing.'
                      : '❌ Chưa chính xác. Đáp án đúng là C: Không bao giờ mở file .exe từ email lạ!'}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
