import React, { useState } from 'react';
import {
  Building2,
  Users,
  TrendingUp,
  Clock,
  ShieldCheck,
  FileSpreadsheet,
  Download,
  Mail,
  UserPlus,
  CheckCircle2,
  AlertCircle,
  Play,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function BusinessDashboard({
  user,
  courses = [],
  unlockedIds = [],
  onStartCourse,
  onBackToCatalog,
}) {
  const { lang } = useLanguage();
  const isEn = lang === 'en';

  const [activeTab, setActiveTab] = useState('departments');
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteDept, setInviteDept] = useState('Kỹ thuật & Công nghệ');

  const members = [
    {
      id: 'm1',
      name: 'Nguyễn Quốc Khải',
      email: 'khai.nguyen@company.com',
      dept: 'Khối Kỹ thuật & Công nghệ',
      progress: 100,
      status: 'active',
      lastActive: 'Hôm nay',
    },
    {
      id: 'm2',
      name: 'Trần Thị Thu Trang',
      email: 'trang.tran@company.com',
      dept: 'Khối Kinh doanh & Marketing',
      progress: 85,
      status: 'active',
      lastActive: 'Hôm qua',
    },
    {
      id: 'm3',
      name: 'Lê Hoàng Nam',
      email: 'nam.le@company.com',
      dept: 'Khối Kế toán & Vận hành',
      progress: 95,
      status: 'active',
      lastActive: '2 ngày trước',
    },
    {
      id: 'm4',
      name: 'Phạm Minh Đức',
      email: 'duc.pham@company.com',
      dept: 'Khối Kỹ thuật & Công nghệ',
      progress: 60,
      status: 'active',
      lastActive: '3 ngày trước',
    },
    {
      id: 'm5',
      name: 'Đặng Mai Anh',
      email: 'maianh.dang@company.com',
      dept: 'Khối Nhân sự (HR)',
      progress: 40,
      status: 'pending',
      lastActive: 'Chưa kích hoạt',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-16">
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-[#064E3B] via-[#065F46] to-[#047857] text-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/15 backdrop-blur-md border-2 border-white/30 flex items-center justify-center text-3xl shadow-xl shrink-0">
                🏢
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-extrabold uppercase tracking-wider mb-2 border border-white/20">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>
                    {isEn
                      ? '5S Corporate L&D Portal • Enterprise B2B'
                      : 'Cổng Đào Tạo Doanh Nghiệp 5S AI • Quản Trị Nhân Sự'}
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  {user?.companyName || 'Công Ty Cổ Phần Công Nghệ 5S (Demo Enterprise)'}
                </h1>
                <div className="flex flex-wrap items-center gap-3 text-emerald-100 text-xs sm:text-sm mt-1">
                  <span>Người quản trị L&D: <strong>{user?.name || 'Giám Đốc Đào Tạo'}</strong></span>
                  <span>•</span>
                  <span>Gói License: <strong className="text-white">50 Suất học AI Toàn diện</strong></span>
                  <span>•</span>
                  <span className="text-emerald-200">Đã kích hoạt: 46/50 suất</span>
                </div>
              </div>
            </div>

            {/* Executive ROI Metric Card */}
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 flex items-center gap-4">
              <div className="text-center px-2">
                <div className="text-emerald-200 font-extrabold text-xl sm:text-2xl">
                  +320%
                </div>
                <div className="text-[11px] text-emerald-100 font-semibold">
                  Năng suất nhân sự
                </div>
              </div>
              <div className="h-8 w-px bg-white/20" />
              <div className="text-center px-2">
                <div className="text-amber-300 font-extrabold text-xl sm:text-2xl">
                  15h/tuần
                </div>
                <div className="text-[11px] text-emerald-100 font-semibold">
                  Tiết kiệm mỗi người
                </div>
              </div>
              <div className="h-8 w-px bg-white/20" />
              <div className="text-center px-2">
                <div className="text-white font-extrabold text-xl sm:text-2xl">
                  -95%
                </div>
                <div className="text-[11px] text-emerald-100 font-semibold">
                  Rủi ro bảo mật
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Sub-Tabs */}
          <div className="flex items-center gap-2 mt-8 pt-4 border-t border-white/20 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab('departments')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
                activeTab === 'departments'
                  ? 'bg-white text-[#065F46] shadow-md'
                  : 'text-white/80 hover:bg-white/10'
              }`}
            >
              {isEn ? 'Department Progress' : 'Tiến Độ Theo Phòng Ban'}
            </button>
            <button
              onClick={() => setActiveTab('licenses')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
                activeTab === 'licenses'
                  ? 'bg-white text-[#065F46] shadow-md'
                  : 'text-white/80 hover:bg-white/10'
              }`}
            >
              {isEn ? 'Seat License Management' : 'Quản Lý Suất Học & Thành Viên'}
            </button>
            <button
              onClick={() => setActiveTab('reports')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
                activeTab === 'reports'
                  ? 'bg-white text-[#065F46] shadow-md'
                  : 'text-white/80 hover:bg-white/10'
              }`}
            >
              {isEn ? 'Executive L&D Reports' : 'Báo Cáo Hiệu Quả L&D (Excel/PDF)'}
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
        {/* Tab 1: Departments Progress */}
        {activeTab === 'departments' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-extrabold text-slate-900">
                  Tiến Độ Chuẩn Hóa AI Của Các Khối Phòng Ban
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Đo lường thời gian hoàn thành khóa học và bài kiểm tra thực tế trên hệ thống mô phỏng 5S AI.
                </p>
              </div>
              <span className="text-xs px-3 py-1 rounded-xl bg-emerald-50 text-emerald-700 font-extrabold border border-emerald-200">
                Toàn công ty: 94.3% hoàn thành
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Dept 1 */}
              <div className="bg-white rounded-2xl p-5 border border-emerald-100 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-sm text-slate-900">
                    1. Khối Kỹ thuật & Sản phẩm
                  </span>
                  <span className="text-xs font-extrabold text-emerald-600">
                    94%
                  </span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div style={{ width: '94%' }} className="h-full bg-emerald-500 rounded-full" />
                </div>
                <div className="text-xs text-slate-600 space-y-1">
                  <div>• Trọng tâm: Google Antigravity, Cursor, Claude</div>
                  <div>• Sĩ số: 18 nhân sự</div>
                  <div>• Trạng thái: <strong className="text-emerald-600">Đã kiểm thử dự án 0 lỗi</strong></div>
                </div>
              </div>

              {/* Dept 2 */}
              <div className="bg-white rounded-2xl p-5 border border-emerald-100 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-sm text-slate-900">
                    2. Khối Kinh doanh & Marketing
                  </span>
                  <span className="text-xs font-extrabold text-emerald-600">
                    88%
                  </span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div style={{ width: '88%' }} className="h-full bg-emerald-500 rounded-full" />
                </div>
                <div className="text-xs text-slate-600 space-y-1">
                  <div>• Trọng tâm: Canva Magic, Slide PowerPoint AI</div>
                  <div>• Sĩ số: 16 nhân sự</div>
                  <div>• Trạng thái: <strong className="text-emerald-600">Tiết kiệm 70% thời gian làm Slide</strong></div>
                </div>
              </div>

              {/* Dept 3 */}
              <div className="bg-white rounded-2xl p-5 border border-emerald-100 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-sm text-slate-900">
                    3. Khối Kế toán & Vận hành
                  </span>
                  <span className="text-xs font-extrabold text-emerald-600">
                    100%
                  </span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div style={{ width: '100%' }} className="h-full bg-emerald-500 rounded-full" />
                </div>
                <div className="text-xs text-slate-600 space-y-1">
                  <div>• Trọng tâm: Bảo mật Google Workspace, Excel AI</div>
                  <div>• Sĩ số: 12 nhân sự</div>
                  <div>• Trạng thái: <strong className="text-emerald-600">100% Đạt chứng nhận 2FA</strong></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Seat Licenses */}
        {activeTab === 'licenses' && (
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-base sm:text-lg font-extrabold text-slate-900 flex items-center gap-2">
                  <Users className="w-5 h-5 text-emerald-600" />
                  <span>Quản Lý Suất Học & Danh Sách Nhân Sự Công Ty</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Bạn đang sử dụng <strong className="text-slate-800">46 / 50</strong> suất bản quyền (Còn trống 4 suất).
                </p>
              </div>

              <button
                type="button"
                onClick={() => setInviteModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition whitespace-nowrap"
              >
                <UserPlus className="w-4 h-4" />
                <span>+ Mời Nhân Sự Vào Gói Học</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 uppercase font-bold border-b border-slate-200">
                    <th className="py-3 px-4">Họ và Tên Nhân Sự</th>
                    <th className="py-3 px-4">Email Công Ty</th>
                    <th className="py-3 px-4">Phòng Ban</th>
                    <th className="py-3 px-4 text-center">Tiến Độ Học</th>
                    <th className="py-3 px-4 text-center">Trạng Thái</th>
                    <th className="py-3 px-4 text-right">Thao Tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {members.map((m) => (
                    <tr key={m.id} className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 font-bold text-slate-900">{m.name}</td>
                      <td className="py-3 px-4 text-slate-600 font-mono">{m.email}</td>
                      <td className="py-3 px-4 text-slate-700">{m.dept}</td>
                      <td className="py-3 px-4 text-center">
                        <div className="inline-flex items-center gap-2">
                          <span className="font-bold text-slate-800">{m.progress}%</span>
                          <div className="w-16 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                            <div
                              style={{ width: `${m.progress}%` }}
                              className="h-full bg-emerald-500 rounded-full"
                            />
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center">
                        {m.status === 'active' ? (
                          <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                            Đang hoạt động
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-bold">
                            Chờ kích hoạt
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          type="button"
                          onClick={() => alert(`Đã gửi lại lời mời học tập tới email: ${m.email}`)}
                          className="text-xs text-emerald-600 font-bold hover:underline"
                        >
                          Nhắc học
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Reports */}
        {activeTab === 'reports' && (
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-base sm:text-lg font-extrabold text-slate-900 flex items-center gap-2">
                  <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
                  <span>Báo Cáo Hiệu Quả Đào Tạo Định Kỳ Dành Cho Ban Giám Đốc</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Số liệu đối soát tự động từ hệ thống PostgreSQL phục vụ đánh giá KPI nhân sự hàng tháng.
                </p>
              </div>

              <button
                type="button"
                onClick={() => alert('Đang xuất báo cáo tổng hợp L&D định dạng Excel (.xlsx)...')}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-2 shadow-sm transition"
              >
                <Download className="w-4 h-4" />
                <span>Xuất Báo Cáo Excel (.xlsx)</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
                <div className="text-2xl font-extrabold text-emerald-900">1,420 Giờ</div>
                <div className="text-xs font-bold text-emerald-700 mt-0.5">Tổng số giờ học tích lũy</div>
              </div>
              <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-center">
                <div className="text-2xl font-extrabold text-[#0056D2]">46 Nhân sự</div>
                <div className="text-xs font-bold text-[#0056D2] mt-0.5">Đã hoàn thành chuẩn hóa AI</div>
              </div>
              <div className="p-4 rounded-xl bg-purple-50 border border-purple-200 text-center">
                <div className="text-2xl font-extrabold text-purple-900">100%</div>
                <div className="text-xs font-bold text-purple-700 mt-0.5">Bảo mật Workspace đạt chuẩn</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Invite Member Modal */}
      {inviteModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <h4 className="text-base font-extrabold text-slate-900">
              Mời Nhân Viên Mới Tham Gia Gói Học B2B
            </h4>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">
                  Email nhân sự (@company.com)
                </label>
                <input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="nhanvien@company.com"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">
                  Phòng ban
                </label>
                <select
                  value={inviteDept}
                  onChange={(e) => setInviteDept(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:border-emerald-500"
                >
                  <option value="Khối Kỹ thuật & Công nghệ">Khối Kỹ thuật & Công nghệ</option>
                  <option value="Khối Kinh doanh & Marketing">Khối Kinh doanh & Marketing</option>
                  <option value="Khối Kế toán & Vận hành">Khối Kế toán & Vận hành</option>
                  <option value="Khối Nhân sự & Tuyển dụng">Khối Nhân sự & Tuyển dụng</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setInviteModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={() => {
                  alert(`Đã gửi thư mời kích hoạt tài khoản tới: ${inviteEmail || 'nhanvien@company.com'}`);
                  setInviteModalOpen(false);
                }}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold"
              >
                Gửi Lời Mời Kích Hoạt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
