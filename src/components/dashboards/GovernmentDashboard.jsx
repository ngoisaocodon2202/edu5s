import React, { useState } from 'react';
import {
  Landmark,
  Globe2,
  ShieldAlert,
  GraduationCap,
  Plane,
  Briefcase,
  Users,
  CheckCircle2,
  Download,
  Search,
  ExternalLink,
  MapPin,
  HeartHandshake,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function GovernmentDashboard({
  user,
  courses = [],
  unlockedIds = [],
  onStartCourse,
  onBackToCatalog,
}) {
  const { lang } = useLanguage();
  const isEn = lang === 'en';

  const [activeTab, setActiveTab] = useState('literacy');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullname: user?.name || '',
    phone: '',
    province: 'Hà Nội',
    program: 'Du học & Làm việc tại Nhật Bản (AI + Kỹ thuật)',
  });

  const countries = [
    {
      country: 'Nhật Bản (Japan)',
      flag: '🇯🇵',
      title: 'Kỹ Sư Công Nghệ AI & Chuyên Viên Văn Phòng Tiêu Chuẩn 5S',
      slots: '150 Suất học bổng tài trợ',
      desc: 'Đào tạo tiếng Nhật ứng dụng trợ lý AI, văn hóa làm việc kỷ luật 5S và kỹ năng lập trình Antigravity / Office Copilot.',
      requirements: 'Tốt nghiệp Cao đẳng/Đại học hoặc có chứng chỉ nghề tương đương.',
    },
    {
      country: 'Hàn Quốc (South Korea)',
      flag: '🇰🇷',
      title: 'Chuyên Viên Tự Động Hóa Dữ Liệu & Sản Xuất Thông Minh',
      slots: '120 Suất liên kết',
      desc: 'Chương trình đào tạo chuyển đổi số, an toàn thông tin và quản trị chuỗi cung ứng bằng AI.',
      requirements: 'Độ tuổi 20-32, có tinh thần cầu tiến học tập công nghệ mới.',
    },
    {
      country: 'Đức & Liên Minh Châu Âu (Germany & EU)',
      flag: '🇩🇪',
      title: 'Chương Trình Chuyển Đổi Số & Lập Trình Viên AI Remote',
      slots: '80 Suất chuyên gia',
      desc: 'Chuẩn hóa quy trình an toàn bảo mật dữ liệu chuẩn GDPR, kỹ năng điều phối Agentic AI làm việc toàn cầu.',
      requirements: 'Tiếng Anh giao tiếp hoặc Tiếng Đức B1, kinh nghiệm kỹ thuật cơ bản.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-16">
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-[#3B0764] via-[#581C87] to-[#6B21A8] text-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/15 backdrop-blur-md border-2 border-white/30 flex items-center justify-center text-3xl shadow-xl shrink-0">
                🏛️
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-extrabold uppercase tracking-wider mb-2 border border-white/20">
                  <Landmark className="w-3.5 h-3.5" />
                  <span>
                    {isEn
                      ? '5S National Workforce & Government Portal'
                      : 'Cổng Phổ Cập Kỹ Năng Số Quốc Gia & Hợp Tác Quốc Tế'}
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  {isEn
                    ? 'National Digital Literacy & Global Workforce Initiative'
                    : 'Chương Trình Quốc Gia Về Kỹ Năng Số & Việc Làm Toàn Cầu'}
                </h1>
                <p className="text-purple-200 text-xs sm:text-sm mt-1 max-w-2xl">
                  {isEn
                    ? 'Empowering citizens with foundational AI cyber safety, digital literacy, and global career pathways.'
                    : 'Đồng hành cùng công dân Việt Nam làm chủ công nghệ AI, nâng cao sức đề kháng an toàn số và chắp cánh xuất khẩu lao động chất lượng cao.'}
                </p>
              </div>
            </div>

            {/* National Impact Metrics */}
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 flex items-center gap-4">
              <div className="text-center px-2">
                <div className="text-amber-300 font-extrabold text-xl sm:text-2xl">
                  34,500+
                </div>
                <div className="text-[11px] text-purple-200 font-semibold">
                  Người dân được phổ cập
                </div>
              </div>
              <div className="h-8 w-px bg-white/20" />
              <div className="text-center px-2">
                <div className="text-emerald-300 font-extrabold text-xl sm:text-2xl">
                  63 / 63
                </div>
                <div className="text-[11px] text-purple-200 font-semibold">
                  Tỉnh thành triển khai
                </div>
              </div>
              <div className="h-8 w-px bg-white/20" />
              <div className="text-center px-2">
                <div className="text-white font-extrabold text-xl sm:text-2xl">
                  96.4%
                </div>
                <div className="text-[11px] text-purple-200 font-semibold">
                  Phòng chống lừa đảo mạng
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Sub-Tabs */}
          <div className="flex items-center gap-2 mt-8 pt-4 border-t border-white/20 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab('literacy')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
                activeTab === 'literacy'
                  ? 'bg-white text-[#581C87] shadow-md'
                  : 'text-white/80 hover:bg-white/10'
              }`}
            >
              {isEn ? 'Digital Literacy for All' : 'Phổ Cập Kỹ Năng Số Toàn Dân'}
            </button>
            <button
              onClick={() => setActiveTab('workforce')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
                activeTab === 'workforce'
                  ? 'bg-white text-[#581C87] shadow-md'
                  : 'text-white/80 hover:bg-white/10'
              }`}
            >
              {isEn ? 'Global Workforce & Overseas' : 'Du Học & Xuất Khẩu Lao Động'}
            </button>
            <button
              onClick={() => setActiveTab('scholarships')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
                activeTab === 'scholarships'
                  ? 'bg-white text-[#581C87] shadow-md'
                  : 'text-white/80 hover:bg-white/10'
              }`}
            >
              {isEn ? 'Public Scholarship Fund' : 'Quỹ Học Bổng Quốc Gia'}
            </button>
            <button
              onClick={() => setActiveTab('registration')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
                activeTab === 'registration'
                  ? 'bg-white text-[#581C87] shadow-md'
                  : 'text-white/80 hover:bg-white/10'
              }`}
            >
              {isEn ? 'Consultation & Registration' : 'Đăng Ký Tư Vấn Chương Trình'}
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
        {/* Tab 1: Community Digital Literacy */}
        {activeTab === 'literacy' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-extrabold text-slate-900">
                  Các Chuyên Đề Miễn Phí Phổ Cập Kỹ Năng Số Toàn Dân
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Được tài trợ bởi Chương trình Quốc gia và Công ty Phát triển Công nghệ 5S.
                </p>
              </div>
              <span className="text-xs px-3 py-1 rounded-xl bg-purple-50 text-purple-700 font-extrabold border border-purple-200">
                100% Miễn phí không thu phí
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Module 1 */}
              <div className="bg-white rounded-2xl p-5 border border-purple-100 shadow-sm space-y-3">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-extrabold">
                  🛡️
                </div>
                <h4 className="text-sm font-extrabold text-slate-900">
                  Nhận Diện Cuộc Gọi Deepfake & Chống Lừa Đảo Ngân Hàng
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Hướng dẫn người dân nhận biết video call giả mạo khuôn mặt người thân, cách bảo vệ mã OTP và tài khoản ngân hàng.
                </p>
                <div className="pt-2 border-t border-slate-100 text-[11px] text-purple-700 font-bold">
                  ✓ Thời lượng: 45 phút • Video thao tác thực tế
                </div>
              </div>

              {/* Module 2 */}
              <div className="bg-white rounded-2xl p-5 border border-purple-100 shadow-sm space-y-3">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-extrabold">
                  🔑
                </div>
                <h4 className="text-sm font-extrabold text-slate-900">
                  Thiết Lập Bảo Mật Hai Lớp 2FA & Khóa Passkeys Cá Nhân
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Bảo vệ tài khoản Gmail, Facebook, Zalo bằng khóa vân tay hoặc khuôn mặt, ngăn chặn hacker chiếm đoạt tài khoản 100%.
                </p>
                <div className="pt-2 border-t border-slate-100 text-[11px] text-purple-700 font-bold">
                  ✓ Thời lượng: 60 phút • Hướng dẫn từng bước
                </div>
              </div>

              {/* Module 3 */}
              <div className="bg-white rounded-2xl p-5 border border-purple-100 shadow-sm space-y-3">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-extrabold">
                  💻
                </div>
                <h4 className="text-sm font-extrabold text-slate-900">
                  Ứng Dụng AI Vào Đời Sống Hàng Ngày & Dịch Vụ Công
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Cách dùng trợ lý AI tra cứu văn bản pháp luật, soạn thảo đơn từ hành chính và khai thác dịch vụ công trực tuyến.
                </p>
                <div className="pt-2 border-t border-slate-100 text-[11px] text-purple-700 font-bold">
                  ✓ Thời lượng: 50 phút • Bài tập tương tác
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Overseas & Workforce */}
        {activeTab === 'workforce' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-extrabold text-slate-900">
                  Cổng Thông Tin Hành Trang Du Học & Xuất Khẩu Lao Động Toàn Cầu
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Đào tạo kỹ năng số, ngoại ngữ tích hợp AI và văn hóa làm việc theo chuẩn quốc tế.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {countries.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-3xl">{item.flag}</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                        {item.slots}
                      </span>
                    </div>

                    <h4 className="text-base font-extrabold text-slate-900">
                      {item.country}
                    </h4>

                    <div className="text-xs font-bold text-purple-800">
                      {item.title}
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {item.desc}
                    </p>

                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600">
                      <strong>Điều kiện:</strong> {item.requirements}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setFormData((prev) => ({ ...prev, program: `Chương trình ${item.country}` }));
                      setActiveTab('registration');
                    }}
                    className="w-full py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs shadow-sm transition flex items-center justify-center gap-1.5"
                  >
                    <span>Đăng Ký Nhận Tư Vấn</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Scholarships Fund */}
        {activeTab === 'scholarships' && (
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-base sm:text-lg font-extrabold text-slate-900 flex items-center gap-2">
                  <HeartHandshake className="w-5 h-5 text-purple-700" />
                  <span>Quỹ Học Bổng Phát Triển Nguồn Nhân Lực 5S AI</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Dành riêng cho thanh niên vùng sâu vùng xa, lao động tái đào tạo và sinh viên hoàn cảnh khó khăn.
                </p>
              </div>

              <span className="px-3.5 py-1.5 rounded-xl bg-emerald-100 text-emerald-800 font-extrabold text-xs">
                Tổng ngân sách: 2.5 Tỷ VNĐ
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-purple-50 border border-purple-200 text-center">
                <div className="text-2xl font-extrabold text-purple-900">500+</div>
                <div className="text-xs font-bold text-purple-700 mt-0.5">Suất học bổng toàn phần</div>
              </div>
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
                <div className="text-2xl font-extrabold text-emerald-900">100%</div>
                <div className="text-xs font-bold text-emerald-700 mt-0.5">Hỗ trợ thiết bị & đường truyền</div>
              </div>
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-center">
                <div className="text-2xl font-extrabold text-amber-900">85%</div>
                <div className="text-xs font-bold text-amber-700 mt-0.5">Học viên có việc làm sau khóa</div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Registration Form */}
        {activeTab === 'registration' && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-purple-200 shadow-md max-w-2xl mx-auto space-y-6">
            <div className="text-center space-y-1">
              <h3 className="text-xl font-extrabold text-slate-900">
                Đăng Ký Tham Gia Chương Trình Quốc Gia & Tư Vấn Du Học - Lao Động
              </h3>
              <p className="text-xs text-slate-500">
                Chuyên viên tư vấn của Công ty Phát triển Công nghệ 5S sẽ liên hệ hỗ trợ bạn trong vòng 24 giờ làm việc.
              </p>
            </div>

            {formSubmitted ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="text-base font-extrabold text-emerald-900">
                  Đăng Ký Thành Công!
                </h4>
                <p className="text-xs text-emerald-700 max-w-md mx-auto">
                  Cảm ơn bạn đã gửi thông tin. Cán bộ quản lý chương trình sẽ liên hệ qua số điện thoại của bạn để hướng dẫn thủ tục nhận học bổng và tham gia lớp học.
                </p>
                <button
                  type="button"
                  onClick={() => setFormSubmitted(false)}
                  className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700"
                >
                  Gửi Thông Tin Khác
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setFormSubmitted(true);
                }}
                className="space-y-4"
              >
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Họ và tên người đăng ký *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullname}
                    onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
                    placeholder="Nguyễn Văn A"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:border-purple-600"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Số điện thoại / Zalo *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="0988xxxxxx"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:border-purple-600"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Tỉnh / Thành phố sinh sống *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.province}
                      onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                      placeholder="Hà Nội, TP.HCM, Đà Nẵng..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:border-purple-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Chương trình bạn quan tâm *
                  </label>
                  <select
                    value={formData.program}
                    onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:border-purple-600"
                  >
                    <option value="Chương trình Nhật Bản (AI + Kỹ thuật)">Chương trình Nhật Bản (AI + Kỹ thuật)</option>
                    <option value="Chương trình Hàn Quốc (Chuyển đổi số & Tự động hóa)">Chương trình Hàn Quốc (Chuyển đổi số & Tự động hóa)</option>
                    <option value="Chương trình Đức & Châu Âu (Lập trình viên AI)">Chương trình Đức & Châu Âu (Lập trình viên AI)</option>
                    <option value="Phổ cập kỹ năng số & Chống lừa đảo mạng miễn phí">Phổ cập kỹ năng số & Chống lừa đảo mạng miễn phí</option>
                    <option value="Đăng ký nhận Quỹ Học bổng 5S AI">Đăng ký nhận Quỹ Học bổng 5S AI</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-extrabold text-xs sm:text-sm shadow-md transition"
                >
                  Xác Nhận Đăng Ký Tư Vấn Miễn Phí
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
