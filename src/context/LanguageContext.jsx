import React, { createContext, useContext, useState, useEffect } from 'react';
import { TRANSLATIONS } from '../i18n/translations';

const LanguageContext = createContext(null);

export function CountryFlag({ code, className = 'w-5 h-3.5 rounded-[3px] shadow-sm shrink-0' }) {
  if (code === 'en') {
    // Crisp UK Union Jack SVG Flag
    return (
      <svg viewBox="0 0 60 36" className={className} aria-label="English Flag">
        <rect width="60" height="36" fill="#012169" rx="3" />
        <path d="M0,0 L60,36 M60,0 L0,36" stroke="#FFFFFF" strokeWidth="7" />
        <path d="M0,0 L60,36 M60,0 L0,36" stroke="#C8102E" strokeWidth="4" />
        <path d="M30,0 V36 M0,18 H60" stroke="#FFFFFF" strokeWidth="11" />
        <path d="M30,0 V36 M0,18 H60" stroke="#C8102E" strokeWidth="6.5" />
      </svg>
    );
  }

  // Crisp Vietnam Flag SVG
  return (
    <svg viewBox="0 0 60 40" className={className} aria-label="Vietnam Flag">
      <rect width="60" height="40" fill="#DA251D" rx="3" />
      <polygon
        points="30,8 33.5,18.5 44.5,18.5 35.6,25 39,35.5 30,29 21,35.5 24.4,25 15.5,18.5 26.5,18.5"
        fill="#FFFF00"
      />
    </svg>
  );
}

export function LanguageSwitcher({ variant = 'light' }) {
  const { lang, setLang } = useLanguage();

  const isDark = variant === 'dark';

  return (
    <div
      className={`inline-flex items-center p-0.5 rounded-full border transition-all ${
        isDark
          ? 'bg-slate-800/90 border-slate-700'
          : 'bg-[#F0F7FF] border-blue-100'
      }`}
      role="group"
      aria-label="Language Switcher"
    >
      <button
        type="button"
        onClick={() => setLang('vi')}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
          lang === 'vi'
            ? 'bg-[#0056D2] text-white shadow-sm'
            : isDark
            ? 'text-slate-300 hover:text-white'
            : 'text-slate-600 hover:text-[#0056D2]'
        }`}
        title="Tiếng Việt"
      >
        <CountryFlag code="vi" className="w-4 h-3 rounded-[2px] shrink-0" />
        <span>VI</span>
      </button>
      <button
        type="button"
        onClick={() => setLang('en')}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
          lang === 'en'
            ? 'bg-[#0056D2] text-white shadow-sm'
            : isDark
            ? 'text-slate-300 hover:text-white'
            : 'text-slate-600 hover:text-[#0056D2]'
        }`}
        title="English"
      >
        <CountryFlag code="en" className="w-4 h-3 rounded-[2px] shrink-0" />
        <span>EN</span>
      </button>
    </div>
  );
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem('eduai_lang') || 'vi';
    } catch {
      return 'vi';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('eduai_lang', lang);
      document.documentElement.lang = lang;
    } catch {
      // ignore storage errors
    }
  }, [lang]);

  const t = TRANSLATIONS[lang] || TRANSLATIONS.vi;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    return {
      lang: 'vi',
      setLang: () => {},
      t: TRANSLATIONS.vi,
    };
  }
  return ctx;
}

