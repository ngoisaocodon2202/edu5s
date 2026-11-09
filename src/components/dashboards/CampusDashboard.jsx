import React, { useState } from 'react';
import {
  School,
  GraduationCap,
  BookOpen,
  FileCheck2,
  Award,
  Download,
  Users,
  CheckCircle2,
  Clock,
  ExternalLink,
  Play,
  FileCode2,
  UploadCloud,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function CampusDashboard({
  user,
  courses = [],
  unlockedIds = [],
  onStartCourse,
  onBackToCatalog,
}) {
  const { lang } = useLanguage();
  const isEn = lang === 'en';

  const [activeTab, setActiveTab] = useState('courses');

  // Sample academic courses tagged with credits
  const academicCourses = [
    {
      id: 'campus-1',
      code: 'CS-5S101',
      title: 'Kiến Trúc Lập Trình Với Trợ Lý AI (Antigravity & Cursor)',
      titleEn: 'AI-Assisted Software Architecture (Antigravity & Cursor)',
      credits: 3,
      semester: 'Học kỳ 1 (2026-2027)',
      instructor: 'TS. Nguyễn Văn Hùng • Khoa CNTT',
      grade: 'A (9.2)',
      status: 'completed',
      pillar: 'ai-coding',
    },
    {
      id: 'campus-2',
      code: 'SEC-5S204',
      title: 'An Toàn Thông Tin & Phòng Ngừa Tấn Công Zero-Day',
      titleEn: 'Information Security & Zero-Day Defense',
      credits: 3,
      semester: 'Học kỳ 1 (2026-2027)',
      instructor: 'ThS. Trần Thị Mai • Viện An ninh Mạng',
      grade: 'A+ (9.6)',
      status: 'completed',
      pillar: 'google-security',
    },
    {
      id: 'campus-3',
      code: 'DATA-5S302',
      title: 'Xử Lý Dữ Liệu Tự Động Hóa Với Copilot & Python Script',
      titleEn: 'Automated Data Processing with Copilot & Python',
      credits: 3,
      semester: 'Học kỳ 1 (2026-2027)',
      instructor: 'TS. Lê Hoàng Nam • Bộ môn Khoa học Dữ liệu',
      grade: 'Đang học (80%)',
      status: 'in_progress',
      pillar: 'ai-office',
    },
    {
      id: 'campus-4',
      code: 'CAP-5S499',
      title: 'Đồ Án Tốt Nghiệp: Ứng Dụng Agentic AI Vào Doanh Nghiệp',
      titleEn: 'Capstone Project: Enterprise Agentic AI Integration',
      credits: 3,
      semester: 'Học kỳ 2 (2026-2027)',
      instructor: 'Hội đồng Khoa CNTT & 5S Technology',
      grade: 'Chưa đăng ký',
      status: 'upcoming',
      pillar: 'ai-coding',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-16">
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-[#1E1B4B] via-[#312E81] to-[#4338CA] text-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/15 backdrop-blur-md border-2 border-white/30 flex items-center justify-center text-3xl shadow-xl shrink-0">
                🏛️
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-extrabold uppercase tracking-wider mb-2 border border-white/20">
                  <School className="w-3.5 h-3.5" />
                  <span>
                    {isEn
                      ? '5S University Campus Portal • Academic Credits'
                      : 'Cổng Học Thuật Đại Học 5S • Tích Lũy Tín Chỉ'}
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  {user?.name || (isEn ? 'Campus Student' : 'Sinh viên Đại học')}
                </h1>
                <div className="flex flex-wrap items-center gap-3 text-indigo-200 text-xs sm:text-sm mt-1">
                  <span>MSSV: <strong>2202-BK5S</strong></span>
                  <span>•</span>
                  <span>Khoa Công nghệ Thông tin</span>
                  <span>•</span>
                  <span className="font-mono text-indigo-100">{user?.email || 'student@hcmut.edu.vn'}</span>
                </div>
              </div>
            </div>

            {/* Credit Accumulation Widget */}
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 min-w-[260px]">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-200">
                  {isEn ? 'Semester Credits' : 'Tín Chỉ Đã Tích Lũy'}
                </span>
                <span className="text-sm font-extrabold text-amber-300">
                  9 / 12 Tín chỉ
                </span>
              </div>
              <div className="h-3 w-full bg-black/30 rounded-full overflow-hidden p-0.5 border border-white/10">
                <div
                  style={{ width: '75%' }}
                  className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 rounded-full"
                />
              </div>
              <div className="flex items-center justify-between text-[11px] text-indigo-200 mt-2">
                <span>GPA Tạm tính: <strong className="text-white">3.8 / 4.0</strong></span>
                <span className="text-emerald-300 font-bold">✓ Đạt 75% chỉ tiêu</span>
              </div>
            </div>
          </div>

          {/* Navigation Sub-Tabs */}
          <div className="flex items-center gap-2 mt-8 pt-4 border-t border-white/20 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab('courses')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
                activeTab === 'courses'
                  ? 'bg-white text-[#312E81] shadow-md'
                  : 'text-white/80 hover:bg-white/10'
              }`}
            >
              {isEn ? 'Credit-Eligible Courses' : 'Học Phần Tích Lũy Tín Chỉ'}
            </button>
            <button
              onClick={() => setActiveTab('capstone')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
                activeTab === 'capstone'
                  ? 'bg-white text-[#312E81] shadow-md'
                  : 'text-white/80 hover:bg-white/10'
              }`}
            >
              {isEn ? 'Capstones & Projects' : 'Đồ Án & Bài Tập Lớn'}
            </button>
            <button
              onClick={() => setActiveTab('transcript')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
                activeTab === 'transcript'
                  ? 'bg-white text-[#312E81] shadow-md'
                  : 'text-white/80 hover:bg-white/10'
              }`}
            >
              {isEn ? 'Academic Transcript' : 'Bảng Điểm & Chứng Nhận'}
            </button>
            <button
              onClick={() => setActiveTab('faculty')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
                activeTab === 'faculty'
                  ? 'bg-white text-[#312E81] shadow-md'
                  : 'text-white/80 hover:bg-white/10'
              }`}
            >
              {isEn ? 'Faculty Portal' : 'Cổng Giảng Viên & Quản Trị Khoa'}
            </button>
            <div className="ml-auto">
              <button
                onClick={onBackToCatalog}
                className="px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs sm:text-sm font-bold transition flex items-center gap-1.5 whitespace-nowrap"
              >
                <span>{isEn ? '← Course Catalog' : '← Danh Mục Khóa Học'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* Tab 1: Credit Courses */}
        {activeTab === 'courses' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-extrabold text-slate-900">
                  {isEn
                    ? 'Credit-Eligible Academic Curriculum'
                    : 'Danh Mục Học Phần Công Nhận Tín Chỉ Đại Học'}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {isEn
                    ? 'Complete the 20 practical lessons and submit the capstone code to earn official credits.'
                    : 'Hoàn thành 20 bài giảng thực tế và vượt qua bài kiểm tra để được cấp chứng nhận quy đổi tín chỉ học phần.'}
                </p>
              </div>
              <span className="text-xs px-3 py-1.5 rounded-xl bg-indigo-50 text-indigo-700 font-extrabold border border-indigo-200">
                Chương trình chuẩn: 2026-2027
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {academicCourses.map((c) => (
                <div
                  key={c.id}
                  className="bg-white rounded-2xl p-5 border border-indigo-100 shadow-sm hover:shadow-md transition space-y-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-mono font-extrabold text-xs">
                          {c.code}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-700 font-bold text-xs">
                          {c.credits} Tín chỉ
                        </span>
                        <span className="text-xs text-slate-400">
                          {c.semester}
                        </span>
                      </div>
                      <h4 className="text-sm sm:text-base font-extrabold text-slate-900">
                        {isEn ? c.titleEn : c.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1">
                        {c.instructor}
                      </p>
                    </div>

                    <div className="shrink-0">
                      {c.status === 'completed' ? (
                        <span className="px-2.5 py-1 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{c.grade}</span>
                        </span>
                      ) : c.status === 'in_progress' ? (
                        <span className="px-2.5 py-1 rounded-xl bg-sky-50 text-sky-700 border border-sky-200 text-xs font-bold flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-sky-600" />
                          <span>{c.grade}</span>
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-xl bg-slate-100 text-slate-600 text-xs font-semibold">
                          Chưa mở
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-500 font-medium">
                      20 bài học • Giọng Nam 5S AI Video
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        const target = courses.find((item) => item.pillar === c.pillar) || courses[0];
                        if (onStartCourse && target) onStartCourse(target);
                        else onBackToCatalog();
                      }}
                      className="px-4 py-1.5 rounded-xl bg-[#312E81] hover:bg-[#1E1B4B] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                      <span>{isEn ? 'Open Courseroom' : 'Vào Lớp Học Phần'}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Capstones & Projects */}
        {activeTab === 'capstone' && (
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-base sm:text-lg font-extrabold text-slate-900 flex items-center gap-2">
                  <FileCode2 className="w-5 h-5 text-indigo-600" />
                  <span>Cổng Nộp Đồ Án Môn Học Tự Động Chấm Bằng AI</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Hệ thống tự động phân tích Git commit, kiểm tra lỗ hổng bảo mật và đối soát tiêu chuẩn code.
                </p>
              </div>
              <button
                type="button"
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-2 shadow-sm transition whitespace-nowrap"
              >
                <UploadCloud className="w-4 h-4" />
                <span>Nộp Đồ Án Mới (GitHub / Zip)</span>
              </button>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-indigo-700">Đồ án Học phần CS-5S101</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      ✓ Đã chấm: 9.5 / 10
                    </span>
                  </div>
                  <div className="text-xs font-extrabold text-slate-900">
                    Xây dựng nền tảng E-Learning đồng bộ PostgreSQL và mô phỏng Terminal agy CLI
                  </div>
                  <div className="text-[11px] text-slate-500">
                    GitHub: github.com/ngoisaocodon2202/edu5s • Đã qua kiểm thử tự động 100%
                  </div>
                </div>
                <button
                  type="button"
                  className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50"
                >
                  Xem Nhận Xét Giảng Viên
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Transcript */}
        {activeTab === 'transcript' && (
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-base sm:text-lg font-extrabold text-slate-900 flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-500" />
                  <span>Bảng Điểm Học Thuật Tín Chỉ Sinh Viên</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Được đồng xác nhận bởi Công ty Phát triển Công nghệ 5S và Hội đồng Khoa.
                </p>
              </div>

              <button
                type="button"
                onClick={() => alert('Đang xuất bảng điểm PDF chính thức...')}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-2 shadow-sm transition"
              >
                <Download className="w-4 h-4" />
                <span>Xuất Bảng Điểm (PDF)</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 uppercase font-bold border-b border-slate-200">
                    <th className="py-3 px-4">Mã Học Phần</th>
                    <th className="py-3 px-4">Tên Môn Học</th>
                    <th className="py-3 px-4 text-center">Tín Chỉ</th>
                    <th className="py-3 px-4 text-center">Điểm Hệ 10</th>
                    <th className="py-3 px-4 text-center">Điểm Chữ</th>
                    <th className="py-3 px-4 text-center">Trạng Thái</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="py-3 px-4 font-mono font-bold text-indigo-700">CS-5S101</td>
                    <td className="py-3 px-4 font-bold text-slate-900">Kiến Trúc Lập Trình Với AI</td>
                    <td className="py-3 px-4 text-center">3</td>
                    <td className="py-3 px-4 text-center font-bold">9.2</td>
                    <td className="py-3 px-4 text-center font-extrabold text-emerald-600">A</td>
                    <td className="py-3 px-4 text-center text-emerald-600 font-bold">✓ Đã công nhận</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-mono font-bold text-indigo-700">SEC-5S204</td>
                    <td className="py-3 px-4 font-bold text-slate-900">An Toàn Thông Tin & Zero-Day</td>
                    <td className="py-3 px-4 text-center">3</td>
                    <td className="py-3 px-4 text-center font-bold">9.6</td>
                    <td className="py-3 px-4 text-center font-extrabold text-emerald-600">A+</td>
                    <td className="py-3 px-4 text-center text-emerald-600 font-bold">✓ Đã công nhận</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-mono font-bold text-indigo-700">DATA-5S302</td>
                    <td className="py-3 px-4 font-bold text-slate-900">Xử Lý Dữ Liệu Tự Động Hóa</td>
                    <td className="py-3 px-4 text-center">3</td>
                    <td className="py-3 px-4 text-center font-bold">8.5 (Dự kiến)</td>
                    <td className="py-3 px-4 text-center font-extrabold text-sky-600">B+</td>
                    <td className="py-3 px-4 text-center text-sky-600 font-bold">Đang học</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 4: Faculty Portal */}
        {activeTab === 'faculty' && (
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-base sm:text-lg font-extrabold text-slate-900 flex items-center gap-2">
                  <Users className="w-5 h-5 text-indigo-600" />
                  <span>Bảng Quản Trị Khoa & Báo Cáo Chuyên Cần</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Dành cho Giảng viên phụ trách môn học và Trưởng bộ môn theo dõi kết quả đào tạo.
                </p>
              </div>

              <button
                type="button"
                onClick={() => alert('Đang xuất báo cáo CSV cho toàn khoa...')}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-2 transition"
              >
                <Download className="w-4 h-4" />
                <span>Xuất Báo Cáo Khoa (Excel/CSV)</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-200 text-center">
                <div className="text-2xl font-extrabold text-indigo-900">148</div>
                <div className="text-xs font-bold text-indigo-700 mt-0.5">Sinh viên đăng ký lớp</div>
              </div>
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
                <div className="text-2xl font-extrabold text-emerald-900">96.2%</div>
                <div className="text-xs font-bold text-emerald-700 mt-0.5">Tỷ lệ qua môn học phần</div>
              </div>
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-center">
                <div className="text-2xl font-extrabold text-amber-900">3.72</div>
                <div className="text-xs font-bold text-amber-700 mt-0.5">GPA Trung bình môn học</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
