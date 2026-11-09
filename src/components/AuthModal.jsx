import React, { useState, useEffect } from 'react';
import {
  X,
  Mail,
  Lock,
  User,
  AlertCircle,
  Loader2,
  ShieldCheck,
  Eye,
  EyeOff,
} from 'lucide-react';
import { USER_ROLES } from '../data/coursesData';
import { BrandLogo } from './BrandLogos';
import CustomDropdown from './CustomDropdown';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../services/api';

export default function AuthModal({
  isOpen,
  onClose,
  initialMode = 'login',
  initialRole = 'student',
  onAuthSuccess,
}) {
  const { lang, t } = useLanguage();
  const [isSignUp, setIsSignUp] = useState(initialMode === 'register');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState(initialRole || 'student');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [infoMsg, setInfoMsg] = useState('');

  // Google OAuth modal state
  const [showGooglePrompt, setShowGooglePrompt] = useState(false);
  const [googleEmail, setGoogleEmail] = useState('');
  const [googleName, setGoogleName] = useState('');

  useEffect(() => {
    setIsSignUp(initialMode === 'register');
    setErrorMsg('');
    setInfoMsg('');
  }, [initialMode, isOpen]);

  useEffect(() => {
    if (initialRole) setSelectedRole(initialRole);
  }, [initialRole]);

  if (!isOpen) return null;

  const currentRoleObj =
    USER_ROLES.find((r) => r.id === selectedRole) || USER_ROLES[0];

  const primaryRoleIds = ['student', 'campus', 'individual', 'business', 'government'];
  const roleOptions = USER_ROLES.filter((r) => primaryRoleIds.includes(r.id)).map((r) => ({
    value: r.id,
    label: lang === 'en' ? r.shortLabelEn : r.shortLabel,
    sublabel: lang === 'en' ? r.labelEn : r.label,
    badge:
      r.id === 'student'
        ? 'FREE'
        : r.id === 'campus'
        ? 'CREDIT'
        : r.id === 'individual'
        ? 'PRO'
        : r.id === 'business'
        ? 'B2B'
        : 'GOV',
  }));

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setInfoMsg('');
    setLoading(true);
    try {
      const { user } = await api.login({ email, password });
      onAuthSuccess(user);
      onClose();
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setInfoMsg('');
    setLoading(true);
    try {
      const { user } = await api.register({
        name,
        email,
        password,
        role: selectedRole,
        roleLabel:
          lang === 'en' ? currentRoleObj.shortLabelEn : currentRoleObj.shortLabel,
      });
      onAuthSuccess(user);
      onClose();
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);
    try {
      const { user } = await api.googleAuth({
        name: googleName || googleEmail.split('@')[0],
        email: googleEmail,
        googleId: `google_${Date.now()}`,
        role: selectedRole,
        roleLabel:
          lang === 'en' ? currentRoleObj.shortLabelEn : currentRoleObj.shortLabel,
      });
      setShowGooglePrompt(false);
      onAuthSuccess(user);
      onClose();
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  const SocialButtonsRow = () => (
    <div className="w-full my-3">
      <button
        type="button"
        onClick={() => {
          setErrorMsg('');
          setShowGooglePrompt(true);
        }}
        className="w-full flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-xl border border-slate-200 bg-white hover:bg-blue-50/60 hover:border-[#0056D2]/40 text-slate-700 font-bold text-xs sm:text-sm shadow-sm transition-all"
      >
        <BrandLogo brand="google" className="w-4 h-4" />
        <span>{t.auth.useGoogleAccount}</span>
      </button>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-sm animate-fadeIn">
      {/* Main Double-Slider Container modeled after login.mp4 */}
      <div className="relative w-full max-w-[880px] min-h-[540px] bg-white rounded-[28px] sm:rounded-[34px] shadow-[0_25px_70px_rgba(0,35,102,0.38)] overflow-hidden border border-blue-100 flex flex-col md:block">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-40 w-9 h-9 rounded-full bg-slate-100/90 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition shadow-sm"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Mobile Mode Switcher (Visible on screens < md) */}
        <div className="flex md:hidden border-b border-slate-100 bg-slate-50 p-2 gap-2 pr-14">
          <button
            type="button"
            onClick={() => {
              setIsSignUp(false);
              setErrorMsg('');
            }}
            className={`flex-1 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all ${
              !isSignUp
                ? 'bg-[#0056D2] text-white shadow-sm'
                : 'text-slate-600 hover:bg-white'
            }`}
          >
            {t.auth.signInTitle}
          </button>
          <button
            type="button"
            onClick={() => {
              setIsSignUp(true);
              setErrorMsg('');
            }}
            className={`flex-1 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all ${
              isSignUp
                ? 'bg-[#0056D2] text-white shadow-sm'
                : 'text-slate-600 hover:bg-white'
            }`}
          >
            {t.auth.createAccountTitle}
          </button>
        </div>

        {/* ============================================================
            LEFT PANEL: SIGN IN FORM
           ============================================================ */}
        <div
          className={`w-full md:w-1/2 md:absolute md:top-0 md:left-0 md:h-full flex flex-col justify-center items-center px-6 sm:px-10 py-8 transition-all duration-700 ease-in-out ${
            isSignUp
              ? 'hidden md:flex md:opacity-0 md:pointer-events-none md:-translate-x-8'
              : 'flex md:opacity-100 md:translate-x-0 z-20'
          }`}
        >
          <div className="w-full max-w-[340px] flex flex-col items-center text-center">
            <button
              type="button"
              onClick={() => {
                onClose();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              title="Về trang chủ 5S AI Education"
              className="focus:outline-none group mb-2 cursor-pointer"
            >
              <img
                src="/logo-5s.png"
                alt="5S AI Education"
                className="h-10 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
              />
            </button>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {t.auth.signInTitle}
            </h2>

            <SocialButtonsRow />

            <span className="text-xs font-medium text-slate-400 mb-3">
              {t.auth.orUseEmailPassword}
            </span>

            {errorMsg && !isSignUp && (
              <div className="w-full mb-3 p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-semibold flex items-center gap-2 text-left">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {infoMsg && !isSignUp && (
              <div className="w-full mb-3 p-2.5 rounded-xl bg-blue-50 border border-blue-200 text-[#0056D2] text-xs font-semibold text-left">
                {infoMsg}
              </div>
            )}

            <form onSubmit={handleSignInSubmit} className="w-full space-y-3">
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.auth.emailPlaceholder}
                  className="w-full pl-10 pr-4 py-3 bg-[#F1F5F9] focus:bg-white border border-transparent focus:border-[#0056D2] rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0056D2]/15 transition"
                />
              </div>

              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t.auth.passwordPlaceholder}
                  className="w-full pl-10 pr-10 py-3 bg-[#F1F5F9] focus:bg-white border border-transparent focus:border-[#0056D2] rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0056D2]/15 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-[#0056D2] transition focus:outline-none"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  title={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>

              <div className="pt-0.5">
                <button
                  type="button"
                  onClick={() => setInfoMsg(t.auth.forgotPasswordAlert)}
                  className="text-xs font-semibold text-slate-500 hover:text-[#0056D2] transition"
                >
                  {t.auth.forgotPassword}
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-8 bg-gradient-to-r from-[#0056D2] to-[#0284C7] hover:from-[#0046AD] hover:to-[#0369A1] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-lg shadow-blue-600/25 transition-all flex items-center justify-center gap-2"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                <span>{t.auth.signInBtn}</span>
              </button>
            </form>
          </div>
        </div>

        {/* ============================================================
            RIGHT PANEL: CREATE ACCOUNT FORM
           ============================================================ */}
        <div
          className={`w-full md:w-1/2 md:absolute md:top-0 md:left-1/2 md:h-full flex flex-col justify-center items-center px-6 sm:px-10 py-6 transition-all duration-700 ease-in-out ${
            isSignUp
              ? 'flex md:opacity-100 md:translate-x-0 z-20'
              : 'hidden md:flex md:opacity-0 md:pointer-events-none md:translate-x-8'
          }`}
        >
          <div className="w-full max-w-[350px] flex flex-col items-center text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {t.auth.createAccountTitle}
            </h2>

            <SocialButtonsRow />

            <span className="text-xs font-medium text-slate-400 mb-2.5">
              {t.auth.orRegisterEmail}
            </span>

            {errorMsg && isSignUp && (
              <div className="w-full mb-2.5 p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-semibold flex items-center gap-2 text-left">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSignUpSubmit} className="w-full space-y-2.5 text-left">
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t.auth.namePlaceholder}
                  className="w-full pl-10 pr-4 py-2.5 bg-[#F1F5F9] focus:bg-white border border-transparent focus:border-[#0056D2] rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0056D2]/15 transition"
                />
              </div>

              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.auth.emailPlaceholder}
                  className="w-full pl-10 pr-4 py-2.5 bg-[#F1F5F9] focus:bg-white border border-transparent focus:border-[#0056D2] rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0056D2]/15 transition"
                />
              </div>

              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t.auth.passwordPlaceholder}
                  className="w-full pl-10 pr-10 py-2.5 bg-[#F1F5F9] focus:bg-white border border-transparent focus:border-[#0056D2] rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0056D2]/15 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-[#0056D2] transition focus:outline-none"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  title={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">
                  {t.auth.roleSelectLabel}
                </label>
                <CustomDropdown
                  value={selectedRole}
                  onChange={setSelectedRole}
                  options={roleOptions}
                  variant="form"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-8 mt-1 bg-gradient-to-r from-[#0056D2] to-[#0284C7] hover:from-[#0046AD] hover:to-[#0369A1] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-lg shadow-blue-600/25 transition-all flex items-center justify-center gap-2"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                <span>{t.auth.signUpBtn}</span>
              </button>
            </form>
          </div>
        </div>

        {/* ============================================================
            SLIDING OVERLAY CONTAINER (EXACTLY AS IN login.mp4)
           ============================================================ */}
        <div
          className={`hidden md:flex absolute top-0 left-1/2 w-1/2 h-full z-30 transition-all duration-700 ease-in-out overflow-hidden bg-gradient-to-br from-[#0056D2] via-[#0284C7] to-[#0B1120] text-white shadow-2xl ${
            isSignUp
              ? '-translate-x-full rounded-r-[105px] rounded-l-[30px]'
              : 'translate-x-0 rounded-l-[105px] rounded-r-[30px]'
          }`}
        >
          {/* Decorative Ambient Glow */}
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-sky-400/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-blue-400/20 blur-3xl pointer-events-none" />

          <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center px-10">
            {isSignUp ? (
              <div className="flex flex-col items-center animate-fadeIn">
                <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mb-5 shadow-lg">
                  <ShieldCheck className="w-7 h-7 text-sky-300" />
                </div>
                <h2 className="text-3xl font-extrabold tracking-tight mb-3">
                  {t.auth.overlayWelcomeTitle}
                </h2>
                <p className="text-sm text-blue-100/90 leading-relaxed mb-7 max-w-xs">
                  {t.auth.overlayWelcomeDesc}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsSignUp(false);
                    setErrorMsg('');
                  }}
                  className="px-10 py-2.5 rounded-xl border-2 border-white text-white hover:bg-white hover:text-[#0056D2] font-extrabold text-xs uppercase tracking-widest transition-all shadow-lg"
                >
                  {t.auth.signInBtn}
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center animate-fadeIn">
                <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mb-5 shadow-lg">
                  <ShieldCheck className="w-7 h-7 text-sky-300" />
                </div>
                <h2 className="text-3xl font-extrabold tracking-tight mb-3">
                  {t.auth.overlayHelloTitle}
                </h2>
                <p className="text-sm text-blue-100/90 leading-relaxed mb-7 max-w-xs">
                  {t.auth.overlayHelloDesc}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsSignUp(true);
                    setErrorMsg('');
                  }}
                  className="px-10 py-2.5 rounded-xl border-2 border-white text-white hover:bg-white hover:text-[#0056D2] font-extrabold text-xs uppercase tracking-widest transition-all shadow-lg"
                >
                  {t.auth.signUpBtn}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ============================================================
            GOOGLE ACCOUNT AUTH PROMPT OVERLAY
           ============================================================ */}
        {showGooglePrompt && (
          <div className="absolute inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
            <div className="bg-white w-full max-w-md rounded-3xl p-6 sm:p-7 shadow-2xl border border-blue-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                  <BrandLogo brand="google" className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900">
                    {t.auth.googlePromptTitle}
                  </h3>
                  <p className="text-xs text-slate-500">
                    5S AI Education • Google Identity Sync
                  </p>
                </div>
              </div>

              <form onSubmit={handleGoogleSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t.auth.googleEmailLabel}
                  </label>
                  <input
                    type="email"
                    required
                    value={googleEmail}
                    onChange={(e) => setGoogleEmail(e.target.value)}
                    placeholder="yourname@gmail.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#0056D2] focus:outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t.auth.googleNameLabel}
                  </label>
                  <input
                    type="text"
                    required
                    value={googleName}
                    onChange={(e) => setGoogleName(e.target.value)}
                    placeholder="Nguyen Van A"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#0056D2] focus:outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t.auth.roleSelectLabel}
                  </label>
                  <CustomDropdown
                    value={selectedRole}
                    onChange={setSelectedRole}
                    options={roleOptions}
                    variant="form"
                  />
                </div>

                <div className="flex items-center gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowGooglePrompt(false)}
                    className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50"
                  >
                    {t.auth.googleCancelBtn}
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 py-2.5 rounded-xl bg-[#0056D2] hover:bg-[#0046AD] text-white font-bold text-xs shadow-md flex items-center justify-center gap-1.5"
                  >
                    {loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                    <span>{t.auth.googleConfirmBtn}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
