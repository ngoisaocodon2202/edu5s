import React, { useState } from 'react';
import {
  UserCheck,
  Award,
  Sparkles,
  TrendingUp,
  Download,
  Share2,
  FileCode2,
  ShieldCheck,
  CheckCircle2,
  Play,
  Briefcase,
  Terminal,
  ExternalLink,
  Zap,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function IndividualDashboard({
  user,
  courses = [],
  unlockedIds = [],
  onStartCourse,
  onBackToCatalog,
}) {
  const { lang } = useLanguage();
  const isEn = lang === 'en';

  const [activeTab, setActiveTab] = useState('skills');

  // Skill competencies
  const skills = [
    {
      name: 'Agentic AI Coding (Google Antigravity & Cursor)',
      level: 92,
      tag: 'Chuyên gia (Expert)',
      desc: 'Điều phối CLI agy, viết lệnh /plan, duyệt Diff mã nguồn tự động',
      color: 'from-blue-600 to-sky-500',
    },
    {
      name: 'Bảo Mật Google Workspace & Kiến Trúc Zero-Trust',
      level: 88,
      tag: 'Nâng cao (Advanced)',
      desc: 'Cấu hình 2FA sinh trắc học Passkeys, chặn Phishing, cô lập ứng dụng',
      color: 'from-indigo-600 to-blue-500',
    },
    {
      name: 'Tự Động Hóa Dữ Liệu Excel & Báo Cáo PowerPoint AI',
      level: 85,
      tag: 'Nâng cao (Advanced)',
      desc: 'Viết hàm XLOOKUP tự động, trực quan hóa biểu đồ, xuất 8 Slide chuẩn 5S',
      color: 'from-sky-600 to-teal-500',
    },
    {
      name: 'Kỹ Thuật Viết Prompt Công Nghệ (System Prompting)',
      level: 95,
      tag: 'Bậc thầy (Mastery)',
      desc: 'Tối ưu hóa ngữ cảnh Context Window, kiểm soát Hallucination',
      color: 'from-purple-600 to-indigo-500',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-16">
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-[#0056D2] to-sky-400 p-0.5 shadow-xl shrink-0">
                <div className="w-full h-full rounded-2xl bg-[#0F172A] flex items-center justify-center text-3xl">
                  💼
                </div>
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-sky-300 text-xs font-extrabold uppercase tracking-wider mb-2 border border-sky-400/30">
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>
                    {isEn
                      ? '5S Individual Pro • Career Upskilling'
                      : 'Hồ Sơ Cá Nhân Chuyên Nghiệp • Nâng Tầm Thu Nhập'}
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  {user?.name || (isEn ? 'Professional Learner' : 'Chuyên Viên Học Tập')}
                </h1>
                <div className="flex flex-wrap items-center gap-2 text-slate-300 text-xs sm:text-sm mt-1">
                  <span>Vị trí hiện tại: <strong className="text-white">Software Engineer / AI Practitioner</strong></span>
                  <span>•</span>
                  <span className="text-sky-300 font-semibold">Mục tiêu: Lead AI Architect</span>
                </div>
              </div>
            </div>

            {/* Career Metrics Card */}
            <div className="flex items-center gap-3 bg-slate-800/80 backdrop-blur-md p-4 rounded-2xl border border-slate-700/80">
              <div className="text-center px-3 border-r border-slate-700">
                <div className="text-emerald-400 font-extrabold text-lg sm:text-xl flex items-center justify-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  <span>+35%</span>
                </div>
                <div className="text-[11px] text-slate-400 font-semibold">
                  Tăng trưởng thu nhập
                </div>
              </div>
              <div className="text-center px-3 border-r border-slate-700">
                <div className="text-sky-400 font-extrabold text-lg sm:text-xl">
                  {unlockedIds.length > 0 ? unlockedIds.length : 3}
                </div>
                <div className="text-[11px] text-slate-400 font-semibold">
                  Chứng chỉ nghề
                </div>
              </div>
              <div className="text-center px-3">
                <div className="text-amber-400 font-extrabold text-lg sm:text-xl flex items-center justify-center gap-1">
                  <Zap className="w-4 h-4 fill-amber-400" />
                  <span>Level 4</span>
                </div>
                <div className="text-[11px] text-slate-400 font-semibold">
                  AI Practitioner
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Sub-Tabs */}
          <div className="flex items-center gap-2 mt-8 pt-4 border-t border-slate-800 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab('skills')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
                activeTab === 'skills'
                  ? 'bg-[#0056D2] text-white shadow-md'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              {isEn ? 'Skill Competency Matrix' : 'Bản Đồ Năng Lực Kỹ Năng'}
            </button>
            <button
              onClick={() => setActiveTab('certs')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
                activeTab === 'certs'
                  ? 'bg-[#0056D2] text-white shadow-md'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              {isEn ? 'Verified Certificates' : 'Chứng Chỉ Nghề Nghiệp Quốc Tế'}
            </button>
            <button
              onClick={() => setActiveTab('toolkit')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
                activeTab === 'toolkit'
                  ? 'bg-[#0056D2] text-white shadow-md'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              {isEn ? 'Pro Developer Toolkit' : 'Hộp Công Cụ Thực Chiến'}
            </button>
            <button
              onClick={() => setActiveTab('career')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
                activeTab === 'career'
                  ? 'bg-[#0056D2] text-white shadow-md'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              {isEn ? 'Career Roadmap & Jobs' : 'Lộ Trình Thăng Tiến Nghề Nghiệp'}
            </button>
            <div className="ml-auto">
              <button
                onClick={onBackToCatalog}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-bold transition flex items-center gap-1.5 whitespace-nowrap"
              >
                <span>{isEn ? '← Browse Courses' : '← Xem Toàn Bộ Khóa Học'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* Tab 1: Skill Matrix */}
        {activeTab === 'skills' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-extrabold text-slate-900">
                  {isEn
                    ? 'AI Professional Competency Matrix'
                    : 'Bản Đồ Đo Lường Năng Lực Chuyên Nghiệp'}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Được hệ thống đánh giá tự động dựa trên thời gian thực hành mô phỏng 5S Video và bài tập dự án.
                </p>
              </div>
              <span className="text-xs px-3 py-1 rounded-xl bg-emerald-50 text-emerald-700 font-extrabold border border-emerald-200">
                Đạt chuẩn: Senior AI Practitioner
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skills.map((s, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-sm font-extrabold text-slate-900">
                        {s.name}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {s.desc}
                      </p>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-lg bg-blue-50 text-[#0056D2] font-extrabold text-xs whitespace-nowrap">
                      {s.tag}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-slate-400">Độ thành thạo</span>
                      <span className="text-slate-900">{s.level}%</span>
                    </div>
                    <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div
                        style={{ width: `${s.level}%` }}
                        className={`h-full rounded-full bg-gradient-to-r ${s.color}`}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Verified Certificates */}
        {activeTab === 'certs' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-extrabold text-slate-900">
                  Chứng Chỉ Nghề Nghiệp Đã Được Xác Thực (5S-DRM Verified)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Tích hợp mã QR tra cứu tính minh bạch, hỗ trợ đính kèm trực tiếp lên hồ sơ LinkedIn và CV xin việc.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Certificate 1 */}
              <div className="bg-white rounded-2xl p-6 border-2 border-blue-200 shadow-md space-y-5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-bl-full pointer-events-none" />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img src="/logo-5s.png" alt="5S" className="h-7 w-auto object-contain" />
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#0056D2] border-l border-slate-200 pl-2">
                      Verified Certificate
                    </span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Chứng chỉ có hiệu lực</span>
                  </span>
                </div>

                <div>
                  <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                    CHỨNG NHẬN HOÀN THÀNH CHUYÊN ĐỀ
                  </div>
                  <h4 className="text-base sm:text-lg font-extrabold text-slate-900 mt-0.5">
                    Kỹ Sư Lập Trình Với Google Antigravity & agy CLI v2.0
                  </h4>
                  <p className="text-xs text-slate-600 mt-1">
                    Cấp cho: <strong>{user?.name || 'Học viên'}</strong> • Mã định danh: <span className="font-mono text-[#0056D2]">5S-CERT-2202-AI</span>
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => alert('Đã tạo liên kết chứng chỉ cho LinkedIn!')}
                    className="px-3.5 py-1.5 rounded-xl bg-[#0056D2] hover:bg-[#0046AD] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Thêm vào LinkedIn</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => alert('Đang tải chứng chỉ định dạng PDF chất lượng cao...')}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Tải Bản PDF In Ấn</span>
                  </button>
                </div>
              </div>

              {/* Certificate 2 */}
              <div className="bg-white rounded-2xl p-6 border-2 border-slate-200 shadow-md space-y-5 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img src="/logo-5s.png" alt="5S" className="h-7 w-auto object-contain" />
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#0056D2] border-l border-slate-200 pl-2">
                      Verified Certificate
                    </span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Chứng chỉ có hiệu lực</span>
                  </span>
                </div>

                <div>
                  <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                    CHỨNG NHẬN HOÀN THÀNH CHUYÊN ĐỀ
                  </div>
                  <h4 className="text-base sm:text-lg font-extrabold text-slate-900 mt-0.5">
                    Bảo Mật Zero-Trust Google & Khóa Passkeys FIDO2
                  </h4>
                  <p className="text-xs text-slate-600 mt-1">
                    Cấp cho: <strong>{user?.name || 'Học viên'}</strong> • Mã định danh: <span className="font-mono text-[#0056D2]">5S-CERT-2202-SEC</span>
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => alert('Đã tạo liên kết chứng chỉ cho LinkedIn!')}
                    className="px-3.5 py-1.5 rounded-xl bg-[#0056D2] hover:bg-[#0046AD] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Thêm vào LinkedIn</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => alert('Đang tải chứng chỉ định dạng PDF chất lượng cao...')}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Tải Bản PDF In Ấn</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Toolkit */}
        {activeTab === 'toolkit' && (
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-base sm:text-lg font-extrabold text-slate-900 flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-[#0056D2]" />
                  <span>Kho Tài Nguyên Kỹ Thuật Dành Riêng Cho Thành Viên Pro</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Bộ mã nguồn mẫu, script cấu hình tự động và Prompt cheatsheets sẵn dùng.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="font-bold text-xs text-sky-700">Prompt Kit 5S AI</div>
                <div className="text-xs font-extrabold text-slate-900">
                  Bộ 50 Prompt chuẩn điều phối Antigravity & Cursor
                </div>
                <p className="text-[11px] text-slate-500">
                  Giúp AI tạo mã chuẩn kiến trúc, kiểm tra lỗi cú pháp và viết unit tests tự động.
                </p>
                <button
                  type="button"
                  onClick={() => alert('Đã sao chép liên kết tài nguyên!')}
                  className="text-xs font-bold text-[#0056D2] hover:underline flex items-center gap-1 pt-1"
                >
                  <span>Mở Prompt Kit</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="font-bold text-xs text-emerald-700">Template Báo Cáo Excel</div>
                <div className="text-xs font-extrabold text-slate-900">
                  Bảng tính Dashboard quản trị tích hợp Copilot AI
                </div>
                <p className="text-[11px] text-slate-500">
                  Định dạng sẵn biểu đồ cột, hàm đối soát XLOOKUP và tự động lọc dữ liệu.
                </p>
                <button
                  type="button"
                  onClick={() => alert('Đã tải tệp mẫu .xlsx!')}
                  className="text-xs font-bold text-[#0056D2] hover:underline flex items-center gap-1 pt-1"
                >
                  <span>Tải tệp .xlsx</span>
                  <Download className="w-3 h-3" />
                </button>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="font-bold text-xs text-indigo-700">Slide Master PowerPoint</div>
                <div className="text-xs font-extrabold text-slate-900">
                  Bộ 24 Slide thương hiệu 5S AI chuẩn tư vấn chiến lược
                </div>
                <p className="text-[11px] text-slate-500">
                  Bố cục chuyên nghiệp, tối ưu hóa màu sắc cho báo cáo trước Hội đồng quản trị.
                </p>
                <button
                  type="button"
                  onClick={() => alert('Đã tải bộ Slide .pptx!')}
                  className="text-xs font-bold text-[#0056D2] hover:underline flex items-center gap-1 pt-1"
                >
                  <span>Tải bộ Slide .pptx</span>
                  <Download className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Career Roadmap */}
        {activeTab === 'career' && (
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
            <div>
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-emerald-600" />
                <span>Lộ Trình Thăng Tiến Thu Nhập & Vị Trí Công Việc Đề Xuất</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Các bước nâng cấp sự nghiệp dựa trên kỹ năng bạn đã tích lũy trên hệ thống 5S AI.
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-extrabold">
                    Mục tiêu tiếp theo
                  </span>
                  <h4 className="text-sm font-extrabold text-slate-900 mt-1">
                    Lead AI Automation Engineer ($2,500 – $4,000 / tháng)
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Yêu cầu: Tối ưu hóa mô hình AI đa tác nhân (Multi-agent System), tích hợp bảo mật doanh nghiệp.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onBackToCatalog}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold whitespace-nowrap shadow-sm transition"
                >
                  Khám Phá Khóa Nâng Cao
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
