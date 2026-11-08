import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  BookOpen,
  Users,
  CreditCard,
  Settings,
  Plus,
  Trash2,
  Edit3,
  CheckCircle2,
  Clock,
  Database,
  ArrowLeft,
  Save,
  X,
  Upload,
  RefreshCw,
  FileText,
  ShieldCheck,
} from 'lucide-react';
import {
  PILLARS,
  LEVELS,
  AVAILABLE_TOOLS,
  USER_ROLES,
} from '../data/coursesData';
import { useLanguage, LanguageSwitcher } from '../context/LanguageContext';
import { api } from '../services/api';

const EMPTY_COURSE_FORM = {
  title: '',
  titleEn: '',
  pillar: 'ai-coding',
  level: 'beginner',
  provider: '5S AI Education',
  duration: '12 giờ học',
  durationEn: '12 hours',
  isFree: false,
  freeForStudent: false,
  freeForBusiness: false,
  isB2BReady: true,
  price: 790000,
  oldPrice: 1490000,
  tools: ['Google Antigravity', 'VS Code'],
  thumbnail:
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
  description: '',
  descriptionEn: '',
  skillsText: 'Làm chủ công cụ AI thực chiến\nTối ưu hóa hiệu suất công việc gấp 5 lần',
  skillsEnText: 'Master practical AI workflows\nBoost productivity by 5x',
  syllabusText:
    'Bài 1: Tổng quan & Thiết lập môi trường chuẩn\nBài 2: Quy trình thực hành cốt lõi\nBài 3: Dự án thực tế & Tối ưu hóa',
};

export default function AdminDashboard({
  onBackToSite,
  courses,
  articles,
  sepayConfig,
  onRefreshData,
}) {
  const { lang, t } = useLanguage();
  const [activeTab, setActiveTab] = useState('overview');
  const [usersList, setUsersList] = useState([]);
  const [ordersList, setOrdersList] = useState([]);
  const [loadingData, setLoadingData] = useState(false);

  // Course Editor Modal State
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [editingCourseId, setEditingCourseId] = useState(null);
  const [courseForm, setCourseForm] = useState(EMPTY_COURSE_FORM);
  const [savingCourse, setSavingCourse] = useState(false);

  // Article Form State
  const [articleForm, setArticleForm] = useState({
    category: 'Chuyên sâu 5S AI',
    categoryEn: '5S AI Deep Dive',
    readTime: '5 phút đọc',
    readTimeEn: '5 min read',
    title: '',
    titleEn: '',
    excerpt: '',
    excerptEn: '',
    image:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
  });

  // SePay Config State
  const [sepayForm, setSepayForm] = useState({
    bankName: sepayConfig?.bankName || 'MBBank',
    accountNumber: sepayConfig?.accountNumber || '789220206',
    accountName:
      sepayConfig?.accountName || 'CONG TY PHAT TRIEN CONG NGHE 5S',
    webhookUrl: '/api/webhooks/sepay',
  });
  const [savedNotice, setSavedNotice] = useState('');

  const fetchAdminLists = async () => {
    setLoadingData(true);
    try {
      const [uRes, oRes] = await Promise.all([api.getUsers(), api.getOrders()]);
      setUsersList(uRes.users || []);
      setOrdersList(oRes.orders || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    fetchAdminLists();
  }, []);

  useEffect(() => {
    if (sepayConfig) {
      setSepayForm({
        bankName: sepayConfig.bankName || 'MBBank',
        accountNumber: sepayConfig.accountNumber || '789220206',
        accountName:
          sepayConfig.accountName || 'CONG TY PHAT TRIEN CONG NGHE 5S',
        webhookUrl: sepayConfig.webhookUrl || '/api/webhooks/sepay',
      });
    }
  }, [sepayConfig]);

  const openCreateCourse = () => {
    setEditingCourseId(null);
    setCourseForm(EMPTY_COURSE_FORM);
    setShowCourseModal(true);
  };

  const openEditCourse = (c) => {
    setEditingCourseId(c.id);
    setCourseForm({
      title: c.title || '',
      titleEn: c.titleEn || c.title || '',
      pillar: c.pillar || 'ai-coding',
      level: c.level || 'beginner',
      provider: c.provider || '5S AI Education',
      duration: c.duration || '10 giờ học',
      durationEn: c.durationEn || '10 hours',
      isFree: Boolean(c.isFree),
      freeForStudent: Boolean(c.freeForStudent),
      freeForBusiness: Boolean(c.freeForBusiness),
      isB2BReady: Boolean(c.isB2BReady),
      price: Number(c.price || 0),
      oldPrice: Number(c.oldPrice || 0),
      tools: Array.isArray(c.tools) ? c.tools : [],
      thumbnail: c.thumbnail || '',
      description: c.description || '',
      descriptionEn: c.descriptionEn || '',
      skillsText: Array.isArray(c.skills) ? c.skills.join('\n') : '',
      skillsEnText: Array.isArray(c.skillsEn) ? c.skillsEn.join('\n') : '',
      syllabusText: Array.isArray(c.syllabus) ? c.syllabus.join('\n') : '',
    });
    setShowCourseModal(true);
  };

  const handleThumbnailUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setCourseForm((prev) => ({ ...prev, thumbnail: String(reader.result) }));
    };
    reader.readAsDataURL(file);
  };

  const toggleToolInForm = (tool) => {
    setCourseForm((prev) => {
      const exists = prev.tools.includes(tool);
      return {
        ...prev,
        tools: exists
          ? prev.tools.filter((t) => t !== tool)
          : [...prev.tools, tool],
      };
    });
  };

  const handleSaveCourse = async (e) => {
    e.preventDefault();
    setSavingCourse(true);
    try {
      const skills = courseForm.skillsText
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean);
      const skillsEn = courseForm.skillsEnText
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean);
      const syllabus = courseForm.syllabusText
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean);

      const payload = {
        ...courseForm,
        lessons: syllabus.length || 10,
        skills,
        skillsEn: skillsEn.length > 0 ? skillsEn : skills,
        syllabus,
      };

      if (editingCourseId) {
        await api.updateCourse(editingCourseId, payload);
      } else {
        await api.createCourse(payload);
      }
      setShowCourseModal(false);
      await onRefreshData();
    } catch (err) {
      alert(err.message);
    } finally {
      setSavingCourse(false);
    }
  };

  const handleDeleteCourse = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa khóa học này khỏi PostgreSQL?'))
      return;
    try {
      await api.deleteCourse(id);
      await onRefreshData();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleUpdateUserRole = async (userId, newRole) => {
    try {
      const roleObj = USER_ROLES.find((r) => r.id === newRole);
      await api.updateUser(userId, {
        role: newRole,
        roleLabel:
          newRole === 'admin'
            ? 'Administrator'
            : roleObj
            ? roleObj.shortLabel
            : newRole,
      });
      await fetchAdminLists();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Xóa tài khoản này khỏi PostgreSQL?')) return;
    try {
      await api.deleteUser(userId);
      await fetchAdminLists();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleApproveOrder = async (orderId) => {
    try {
      await api.approveOrder(orderId);
      await fetchAdminLists();
      await onRefreshData();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleSaveSepayConfig = async (e) => {
    e.preventDefault();
    try {
      await api.updateSepayConfig(sepayForm);
      await onRefreshData();
      setSavedNotice('Đã lưu cấu hình SePay vào PostgreSQL!');
      setTimeout(() => setSavedNotice(''), 3000);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleCreateArticle = async (e) => {
    e.preventDefault();
    try {
      await api.createArticle(articleForm);
      setArticleForm({
        ...articleForm,
        title: '',
        titleEn: '',
        excerpt: '',
        excerptEn: '',
      });
      await onRefreshData();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDeleteArticle = async (id) => {
    try {
      await api.deleteArticle(id);
      await onRefreshData();
    } catch (err) {
      alert(err.message);
    }
  };

  const confirmedRevenue = ordersList
    .filter((o) => o.status === 'paid')
    .reduce((sum, o) => sum + Number(o.amount || 0), 0);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      {/* Admin Top Header */}
      <header className="bg-[#0B1120] text-white border-b border-slate-800 sticky top-0 z-40">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                onBackToSite();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              title={t.admin.backToSite}
              className="focus:outline-none group shrink-0"
            >
              <img
                src="/logo-5s.png"
                alt="5S AI Education"
                className="h-9 sm:h-10 w-auto bg-white rounded-xl px-2 py-1 transition-transform duration-200 group-hover:scale-105 cursor-pointer"
              />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm sm:text-lg font-extrabold tracking-tight">
                  {t.admin.title}
                </h1>
                <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-sky-500/20 text-sky-300 border border-sky-400/30">
                  <Database className="w-3 h-3" />
                  PostgreSQL: 5432
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                {t.admin.subtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <LanguageSwitcher variant="dark" />
            <button
              type="button"
              onClick={() => {
                fetchAdminLists();
                onRefreshData();
              }}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
              title="Refresh PostgreSQL Data"
            >
              <RefreshCw
                className={`w-4 h-4 ${loadingData ? 'animate-spin' : ''}`}
              />
            </button>
            <button
              type="button"
              onClick={onBackToSite}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0056D2] hover:bg-[#0284C7] text-white font-bold text-xs sm:text-sm transition shadow-md whitespace-nowrap"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t.admin.backToSite}</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-2">
          {[
            {
              id: 'overview',
              label: t.admin.tabOverview,
              icon: LayoutDashboard,
            },
            {
              id: 'courses',
              label: `${t.admin.tabCourses} (${courses.length})`,
              icon: BookOpen,
            },
            {
              id: 'users',
              label: `${t.admin.tabUsers} (${usersList.length})`,
              icon: Users,
            },
            {
              id: 'orders',
              label: `${t.admin.tabOrders} (${ordersList.length})`,
              icon: CreditCard,
            },
            {
              id: 'settings',
              label: t.admin.tabSettings,
              icon: Settings,
            },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-[#0056D2] text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/70'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-2xl p-5 border border-blue-100 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-500 uppercase">
                    {t.admin.statTotalCourses}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0056D2] flex items-center justify-center">
                    <BookOpen className="w-5 h-5" />
                  </div>
                </div>
                <div className="text-3xl font-extrabold text-slate-900">
                  {courses.length}
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  PostgreSQL table: <code>courses</code>
                </p>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-blue-100 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-500 uppercase">
                    {t.admin.statTotalUsers}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-sky-50 text-[#0284C7] flex items-center justify-center">
                    <Users className="w-5 h-5" />
                  </div>
                </div>
                <div className="text-3xl font-extrabold text-slate-900">
                  {usersList.length}
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  PostgreSQL table: <code>users</code>
                </p>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-blue-100 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-500 uppercase">
                    {t.admin.statTotalOrders}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0056D2] flex items-center justify-center">
                    <CreditCard className="w-5 h-5" />
                  </div>
                </div>
                <div className="text-3xl font-extrabold text-slate-900">
                  {ordersList.length}
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  SePay MBBank: <code>{sepayForm.accountNumber}</code>
                </p>
              </div>

              <div className="bg-gradient-to-br from-[#0056D2] to-[#0284C7] text-white rounded-2xl p-5 shadow-md">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-blue-100 uppercase">
                    {t.admin.statTotalRevenue}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold">
                  {confirmedRevenue.toLocaleString('vi-VN')}đ
                </div>
                <p className="text-xs text-blue-100 mt-1">
                  MBBank • {sepayForm.accountNumber}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-blue-100 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-extrabold text-slate-900">
                  Quản lý Khóa học & Đồng bộ Cơ sở dữ liệu PostgreSQL
                </h2>
                <p className="text-sm text-slate-600 mt-1">
                  Toàn bộ dữ liệu mẫu đã được xóa sạch theo yêu cầu. Bạn có thể bấm nút bên phải để thêm khóa học mới trực tiếp vào PostgreSQL.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('courses');
                  openCreateCourse();
                }}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#0056D2] hover:bg-[#0046AD] text-white font-bold text-sm shadow-md transition whitespace-nowrap"
              >
                <Plus className="w-4 h-4" />
                <span>{t.admin.addNewCourseBtn}</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: COURSES MANAGEMENT */}
        {activeTab === 'courses' && (
          <div className="space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-5 rounded-2xl border border-blue-100 shadow-sm">
              <div>
                <h2 className="text-lg font-extrabold text-slate-900">
                  {t.admin.tabCourses} ({courses.length})
                </h2>
                <p className="text-xs text-slate-500">
                  Thêm, chỉnh sửa hoặc xóa khóa học trong bảng <code>courses</code> của PostgreSQL
                </p>
              </div>
              <button
                type="button"
                onClick={openCreateCourse}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0056D2] hover:bg-[#0046AD] text-white font-bold text-xs sm:text-sm shadow-md transition"
              >
                <Plus className="w-4 h-4" />
                <span>{t.admin.addNewCourseBtn}</span>
              </button>
            </div>

            {courses.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-dashed border-blue-200">
                <BookOpen className="w-12 h-12 text-[#0056D2] mx-auto mb-3 opacity-80" />
                <h3 className="text-lg font-extrabold text-slate-900 mb-1">
                  Bảng courses trong PostgreSQL hiện đang trống (0 khóa học)
                </h3>
                <p className="text-sm text-slate-500 max-w-lg mx-auto mb-5">
                  Tất cả dữ liệu mẫu đã được xóa sạch. Hãy bấm nút bên dưới để tạo khóa học đầu tiên của bạn!
                </p>
                <button
                  type="button"
                  onClick={openCreateCourse}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0056D2] hover:bg-[#0046AD] text-white font-bold text-sm shadow-md transition"
                >
                  <Plus className="w-4 h-4" />
                  <span>{t.admin.addNewCourseBtn}</span>
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-blue-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[760px]">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-extrabold text-slate-500 uppercase">
                        <th className="py-3.5 px-4">Khóa học</th>
                        <th className="py-3.5 px-4">Trụ cột & Cấp độ</th>
                        <th className="py-3.5 px-4">Học phí</th>
                        <th className="py-3.5 px-4">Phân quyền Miễn phí</th>
                        <th className="py-3.5 px-4 text-right">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm">
                      {courses.map((c) => (
                        <tr key={c.id} className="hover:bg-blue-50/30">
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={c.thumbnail}
                                alt={c.title}
                                className="w-14 h-10 rounded-lg object-cover shrink-0 border border-slate-200"
                              />
                              <div>
                                <div className="font-bold text-slate-900 line-clamp-1">
                                  {lang === 'en' ? c.titleEn || c.title : c.title}
                                </div>
                                <div className="text-xs text-slate-400">
                                  {c.lessons} bài giảng • {c.duration}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-[#0056D2] mr-1.5">
                              {c.pillar}
                            </span>
                            <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-700">
                              {c.level}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 font-extrabold text-slate-900">
                            {c.isFree || c.price === 0
                              ? 'Miễn phí (0đ)'
                              : `${Number(c.price).toLocaleString('vi-VN')}đ`}
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="flex flex-wrap gap-1">
                              {c.freeForStudent && (
                                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-sky-50 text-[#0284C7]">
                                  HSSV Free
                                </span>
                              )}
                              {c.isB2BReady && (
                                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-blue-50 text-[#0056D2]">
                                  B2B
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-right whitespace-nowrap">
                            <button
                              type="button"
                              onClick={() => openEditCourse(c)}
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-[#0056D2] font-bold text-xs mr-2"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                              <span>{t.admin.editBtn}</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteCourse(c.id)}
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 font-bold text-xs"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>{t.admin.deleteBtn}</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: USERS MANAGEMENT */}
        {activeTab === 'users' && (
          <div className="bg-white rounded-2xl border border-blue-100 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100">
              <h2 className="text-lg font-extrabold text-slate-900">
                {t.admin.tabUsers} ({usersList.length})
              </h2>
              <p className="text-xs text-slate-500">
                Danh sách tài khoản người dùng lưu trữ trong bảng <code>users</code> của PostgreSQL
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[720px]">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-extrabold text-slate-500 uppercase">
                    <th className="py-3.5 px-4">ID / Học viên</th>
                    <th className="py-3.5 px-4">Email</th>
                    <th className="py-3.5 px-4">Vai trò (Role)</th>
                    <th className="py-3.5 px-4">Khóa đã mở</th>
                    <th className="py-3.5 px-4 text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {usersList.map((u) => (
                    <tr key={u.id} className="hover:bg-blue-50/30">
                      <td className="py-3.5 px-4 font-bold text-slate-900">
                        #{u.id} • {u.name}
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">{u.email}</td>
                      <td className="py-3.5 px-4">
                        <select
                          value={u.role}
                          onChange={(e) =>
                            handleUpdateUserRole(u.id, e.target.value)
                          }
                          className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-800 bg-white focus:border-[#0056D2] focus:outline-none"
                        >
                          <option value="admin">Quản trị viên (Admin)</option>
                          {USER_ROLES.map((r) => (
                            <option key={r.id} value={r.id}>
                              {r.shortLabel}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-[#0056D2]">
                          {(u.unlockedCourses || []).length} khóa
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        {u.email !== 'admin@5seduai.vn' && (
                          <button
                            type="button"
                            onClick={() => handleDeleteUser(u.id)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 font-bold text-xs"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>{t.admin.deleteBtn}</span>
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: SEPAY ORDERS */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-2xl border border-blue-100 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-extrabold text-slate-900">
                  {t.admin.tabOrders} ({ordersList.length})
                </h2>
                <p className="text-xs text-slate-500">
                  Quản lý giao dịch thanh toán SePay VietQR (Mặc định: <strong>MBBank - 789220206</strong>)
                </p>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[780px]">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-extrabold text-slate-500 uppercase">
                    <th className="py-3.5 px-4">Mã Đơn (SePay)</th>
                    <th className="py-3.5 px-4">Học viên</th>
                    <th className="py-3.5 px-4">Khóa học</th>
                    <th className="py-3.5 px-4">Số tiền</th>
                    <th className="py-3.5 px-4">Trạng thái</th>
                    <th className="py-3.5 px-4 text-right">Hành động</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {ordersList.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="py-10 text-center text-slate-400 text-sm"
                      >
                        Chưa có đơn hàng SePay nào phát sinh.
                      </td>
                    </tr>
                  ) : (
                    ordersList.map((o) => (
                      <tr key={o.id} className="hover:bg-blue-50/30">
                        <td className="py-3.5 px-4 font-mono font-bold text-[#0056D2]">
                          {o.order_code}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-slate-900">
                            {o.user_name}
                          </div>
                          <div className="text-xs text-slate-500">
                            {o.user_email}
                          </div>
                        </td>
                        <td className="py-3.5 px-4 font-medium text-slate-800">
                          {o.course_title}
                        </td>
                        <td className="py-3.5 px-4 font-extrabold text-slate-900">
                          {Number(o.amount || 0).toLocaleString('vi-VN')}đ
                        </td>
                        <td className="py-3.5 px-4">
                          {o.status === 'paid' ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-[#0056D2]">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              {t.admin.paidBadge}
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700">
                              <Clock className="w-3.5 h-3.5" />
                              {t.admin.pendingBadge}
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          {o.status !== 'paid' && (
                            <button
                              type="button"
                              onClick={() => handleApproveOrder(o.id)}
                              className="px-3.5 py-1.5 rounded-xl bg-[#0056D2] hover:bg-[#0046AD] text-white font-bold text-xs shadow-sm transition"
                            >
                              {t.admin.approveOrderBtn}
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: SETTINGS & ARTICLES */}
        {activeTab === 'settings' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* SePay Config Card */}
            <div className="bg-white rounded-2xl p-6 border border-blue-100 shadow-sm">
              <div className="flex items-center gap-2.5 mb-4">
                <CreditCard className="w-5 h-5 text-[#0056D2]" />
                <h3 className="text-lg font-extrabold text-slate-900">
                  Cấu Hình Thanh Toán SePay (PostgreSQL)
                </h3>
              </div>

              {savedNotice && (
                <div className="mb-4 p-3 rounded-xl bg-blue-50 border border-blue-200 text-[#0056D2] text-xs font-bold">
                  {savedNotice}
                </div>
              )}

              <form onSubmit={handleSaveSepayConfig} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Ngân hàng thụ hưởng (Mặc định: MBBank)
                  </label>
                  <input
                    type="text"
                    value={sepayForm.bankName}
                    onChange={(e) =>
                      setSepayForm({ ...sepayForm, bankName: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Số tài khoản nhận thanh toán (Mặc định: 789220206)
                  </label>
                  <input
                    type="text"
                    value={sepayForm.accountNumber}
                    onChange={(e) =>
                      setSepayForm({
                        ...sepayForm,
                        accountNumber: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-mono font-bold text-[#0056D2]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Tên chủ tài khoản hiển thị
                  </label>
                  <input
                    type="text"
                    value={sepayForm.accountName}
                    onChange={(e) =>
                      setSepayForm({
                        ...sepayForm,
                        accountName: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Endpoint nhận Webhook SePay (Dùng khi cài đặt trên my.sepay.vn)
                  </label>
                  <input
                    type="text"
                    readOnly
                    value="POST /api/webhooks/sepay"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-mono text-slate-600"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0056D2] hover:bg-[#0046AD] text-white font-bold text-sm shadow-md transition"
                >
                  <Save className="w-4 h-4" />
                  <span>Lưu cấu hình SePay</span>
                </button>
              </form>
            </div>

            {/* Articles Management Card */}
            <div className="bg-white rounded-2xl p-6 border border-blue-100 shadow-sm space-y-5">
              <div className="flex items-center gap-2.5">
                <FileText className="w-5 h-5 text-[#0056D2]" />
                <h3 className="text-lg font-extrabold text-slate-900">
                  Quản Lý Bài Viết Chuyên Sâu ({articles.length})
                </h3>
              </div>

              <form onSubmit={handleCreateArticle} className="space-y-3">
                <input
                  type="text"
                  required
                  placeholder="Tiêu đề bài viết (Tiếng Việt)"
                  value={articleForm.title}
                  onChange={(e) =>
                    setArticleForm({ ...articleForm, title: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm"
                />
                <input
                  type="text"
                  placeholder="Tiêu đề bài viết (Tiếng Anh)"
                  value={articleForm.titleEn}
                  onChange={(e) =>
                    setArticleForm({ ...articleForm, titleEn: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm"
                />
                <textarea
                  rows={2}
                  required
                  placeholder="Tóm tắt nội dung (Tiếng Việt)"
                  value={articleForm.excerpt}
                  onChange={(e) =>
                    setArticleForm({ ...articleForm, excerpt: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm"
                />
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0056D2] text-white font-bold text-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>Thêm bài viết mới</span>
                </button>
              </form>

              <div className="divide-y divide-slate-100 max-h-60 overflow-y-auto">
                {articles.map((art) => (
                  <div
                    key={art.id}
                    className="py-2.5 flex items-center justify-between gap-3"
                  >
                    <div className="text-xs font-bold text-slate-800 line-clamp-1">
                      {art.title}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDeleteArticle(art.id)}
                      className="text-red-500 hover:text-red-700 p-1 shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* MODAL ADD / EDIT COURSE */}
      {showCourseModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-blue-100 overflow-hidden my-8">
            <div className="px-6 py-4 bg-[#0B1120] text-white flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-extrabold">
                {editingCourseId
                  ? t.admin.editCourseTitle
                  : t.admin.createCourseTitle}
              </h3>
              <button
                type="button"
                onClick={() => setShowCourseModal(false)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form
              onSubmit={handleSaveCourse}
              className="p-5 sm:p-6 space-y-4 max-h-[80vh] overflow-y-auto"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t.admin.courseTitleVi} *
                  </label>
                  <input
                    type="text"
                    required
                    value={courseForm.title}
                    onChange={(e) =>
                      setCourseForm({ ...courseForm, title: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t.admin.courseTitleEn}
                  </label>
                  <input
                    type="text"
                    value={courseForm.titleEn}
                    onChange={(e) =>
                      setCourseForm({ ...courseForm, titleEn: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t.admin.coursePillar}
                  </label>
                  <select
                    value={courseForm.pillar}
                    onChange={(e) =>
                      setCourseForm({ ...courseForm, pillar: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm bg-white"
                  >
                    {PILLARS.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t.admin.courseLevel}
                  </label>
                  <select
                    value={courseForm.level}
                    onChange={(e) =>
                      setCourseForm({ ...courseForm, level: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm bg-white"
                  >
                    {LEVELS.filter((l) => l.id !== 'all').map((l) => (
                      <option key={l.id} value={l.id}>
                        {l.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Checkboxes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 bg-blue-50/50 p-3.5 rounded-2xl border border-blue-100">
                <label className="flex items-center gap-2 text-xs font-bold text-slate-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={courseForm.isFree}
                    onChange={(e) =>
                      setCourseForm({
                        ...courseForm,
                        isFree: e.target.checked,
                      })
                    }
                    className="rounded text-[#0056D2]"
                  />
                  <span>{t.admin.isFreeCheck}</span>
                </label>
                <label className="flex items-center gap-2 text-xs font-bold text-slate-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={courseForm.freeForStudent}
                    onChange={(e) =>
                      setCourseForm({
                        ...courseForm,
                        freeForStudent: e.target.checked,
                      })
                    }
                    className="rounded text-[#0056D2]"
                  />
                  <span>{t.admin.freeStudentCheck}</span>
                </label>
                <label className="flex items-center gap-2 text-xs font-bold text-slate-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={courseForm.freeForBusiness}
                    onChange={(e) =>
                      setCourseForm({
                        ...courseForm,
                        freeForBusiness: e.target.checked,
                      })
                    }
                    className="rounded text-[#0056D2]"
                  />
                  <span>{t.admin.freeBusinessCheck}</span>
                </label>
                <label className="flex items-center gap-2 text-xs font-bold text-slate-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={courseForm.isB2BReady}
                    onChange={(e) =>
                      setCourseForm({
                        ...courseForm,
                        isB2BReady: e.target.checked,
                      })
                    }
                    className="rounded text-[#0056D2]"
                  />
                  <span>{t.admin.b2bReadyCheck}</span>
                </label>
              </div>

              {!courseForm.isFree && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {t.admin.coursePrice}
                    </label>
                    <input
                      type="number"
                      value={courseForm.price}
                      onChange={(e) =>
                        setCourseForm({
                          ...courseForm,
                          price: Number(e.target.value),
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {t.admin.courseOldPrice}
                    </label>
                    <input
                      type="number"
                      value={courseForm.oldPrice}
                      onChange={(e) =>
                        setCourseForm({
                          ...courseForm,
                          oldPrice: Number(e.target.value),
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm"
                    />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t.admin.courseDurationVi}
                  </label>
                  <input
                    type="text"
                    value={courseForm.duration}
                    onChange={(e) =>
                      setCourseForm({ ...courseForm, duration: e.target.value })
                    }
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t.admin.courseDurationEn}
                  </label>
                  <input
                    type="text"
                    value={courseForm.durationEn}
                    onChange={(e) =>
                      setCourseForm({
                        ...courseForm,
                        durationEn: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm"
                  />
                </div>
              </div>

              {/* Thumbnail URL & File Upload */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t.admin.courseThumbnail}
                </label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={courseForm.thumbnail}
                    onChange={(e) =>
                      setCourseForm({
                        ...courseForm,
                        thumbnail: e.target.value,
                      })
                    }
                    className="flex-1 px-3.5 py-2 rounded-xl border border-slate-200 text-sm"
                  />
                  <label className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer shrink-0">
                    <Upload className="w-4 h-4" />
                    <span>Tải ảnh từ máy</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleThumbnailUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Tools multi-select */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {t.admin.courseTools}
                </label>
                <div className="flex flex-wrap gap-2">
                  {AVAILABLE_TOOLS.map((tool) => {
                    const active = courseForm.tools.includes(tool);
                    return (
                      <button
                        key={tool}
                        type="button"
                        onClick={() => toggleToolInForm(tool)}
                        className={`px-3 py-1 rounded-full text-xs font-bold border transition ${
                          active
                            ? 'bg-[#0056D2] text-white border-[#0056D2]'
                            : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300'
                        }`}
                      >
                        {tool}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t.admin.courseDescVi}
                  </label>
                  <textarea
                    rows={3}
                    value={courseForm.description}
                    onChange={(e) =>
                      setCourseForm({
                        ...courseForm,
                        description: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t.admin.courseDescEn}
                  </label>
                  <textarea
                    rows={3}
                    value={courseForm.descriptionEn}
                    onChange={(e) =>
                      setCourseForm({
                        ...courseForm,
                        descriptionEn: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t.admin.courseSkillsVi}
                  </label>
                  <textarea
                    rows={3}
                    value={courseForm.skillsText}
                    onChange={(e) =>
                      setCourseForm({
                        ...courseForm,
                        skillsText: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t.admin.courseSyllabus}
                  </label>
                  <textarea
                    rows={3}
                    value={courseForm.syllabusText}
                    onChange={(e) =>
                      setCourseForm({
                        ...courseForm,
                        syllabusText: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowCourseModal(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs"
                >
                  {t.admin.cancelBtn}
                </button>
                <button
                  type="submit"
                  disabled={savingCourse}
                  className="px-6 py-2.5 rounded-xl bg-[#0056D2] hover:bg-[#0046AD] text-white font-bold text-xs shadow-md"
                >
                  {savingCourse ? 'Đang lưu...' : t.admin.saveCourseBtn}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

