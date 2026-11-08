import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import {
  ChevronDown,
  Check,
  GraduationCap,
  Building2,
  Sparkles,
  SlidersHorizontal,
} from 'lucide-react';
import { USER_ROLES } from '../data/coursesData';
import { BrandLogo } from './BrandLogos';
import { useLanguage } from '../context/LanguageContext';

function RoleOptionIcon({ roleId }) {
  switch (roleId) {
    case 'student':
      return (
        <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 text-[#0056D2] flex items-center justify-center shrink-0">
          <GraduationCap className="w-4 h-4" />
        </div>
      );
    case 'business':
      return (
        <div className="w-8 h-8 rounded-lg bg-sky-50 border border-sky-200 text-[#0284C7] flex items-center justify-center shrink-0">
          <Building2 className="w-4 h-4" />
        </div>
      );
    case 'individual_google':
      return (
        <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 p-1.5 flex items-center justify-center shrink-0">
          <BrandLogo brand="google" className="w-5 h-5" />
        </div>
      );
    case 'individual_aicode':
      return (
        <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 p-1 flex items-center justify-center shrink-0">
          <BrandLogo brand="antigravity" className="w-6 h-6" />
        </div>
      );
    case 'individual_aioffice':
      return (
        <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 p-1.5 flex items-center justify-center shrink-0">
          <BrandLogo brand="excel" className="w-5 h-5" />
        </div>
      );
    default:
      return (
        <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 text-[#0056D2] flex items-center justify-center shrink-0">
          <Sparkles className="w-4 h-4" />
        </div>
      );
  }
}

export default function CustomRoleDropdown({
  value,
  onChange,
  variant = 'modal',
  align = 'right',
  prefixLabel,
}) {
  const { lang, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [menuStyle, setMenuStyle] = useState({});
  const triggerRef = useRef(null);
  const menuRef = useRef(null);

  const selectedRole =
    USER_ROLES.find((r) => r.id === value) || USER_ROLES[0];

  const updatePosition = useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    const estimatedMenuHeight = 365;
    const spaceBelow = viewportHeight - rect.bottom;
    const spaceAbove = rect.top;

    // Flip upward if there is not enough space below and more space above
    const openUpward =
      spaceBelow < estimatedMenuHeight && spaceAbove > spaceBelow;

    const minWidth = variant === 'navbar' ? 350 : Math.max(rect.width, 310);
    const width = Math.min(minWidth, viewportWidth - 24);

    let left = rect.left;
    if (variant === 'navbar' && align === 'right') {
      left = rect.right - width;
    }
    if (left + width > viewportWidth - 12) {
      left = viewportWidth - width - 12;
    }
    if (left < 12) {
      left = 12;
    }

    if (openUpward) {
      setMenuStyle({
        position: 'fixed',
        bottom: `${Math.max(12, viewportHeight - rect.top + 8)}px`,
        left: `${left}px`,
        width: `${width}px`,
        maxHeight: `${Math.min(420, spaceAbove - 20)}px`,
        zIndex: 9999,
      });
    } else {
      setMenuStyle({
        position: 'fixed',
        top: `${rect.bottom + 8}px`,
        left: `${left}px`,
        width: `${width}px`,
        maxHeight: `${Math.min(420, Math.max(260, spaceBelow - 16))}px`,
        zIndex: 9999,
      });
    }
  }, [variant, align]);

  useEffect(() => {
    if (!open) return;
    updatePosition();

    function handleClickOutside(e) {
      const clickedTrigger =
        triggerRef.current && triggerRef.current.contains(e.target);
      const clickedMenu =
        menuRef.current && menuRef.current.contains(e.target);
      if (!clickedTrigger && !clickedMenu) {
        setOpen(false);
      }
    }
    function handleKeyDown(e) {
      if (e.key === 'Escape') setOpen(false);
    }
    function handleScrollOrResize() {
      updatePosition();
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    window.addEventListener('scroll', handleScrollOrResize, true);
    window.addEventListener('resize', handleScrollOrResize);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('scroll', handleScrollOrResize, true);
      window.removeEventListener('resize', handleScrollOrResize);
    };
  }, [open, updatePosition]);

  const handleSelect = (roleId) => {
    onChange(roleId);
    setOpen(false);
  };

  const displayShortLabel =
    lang === 'en' ? selectedRole.shortLabelEn : selectedRole.shortLabel;
  const displayFullLabel =
    lang === 'en' ? selectedRole.labelEn : selectedRole.label;

  return (
    <div className="relative" ref={triggerRef}>
      {/* 1. TRIGGER BUTTON */}
      {variant === 'navbar' ? (
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className={`flex items-center gap-2.5 bg-gradient-to-r from-[#F0F7FF] to-blue-50/70 border rounded-xl px-3 py-1.5 shadow-sm transition-all text-left ${
            open
              ? 'border-[#0056D2] ring-2 ring-[#0056D2]/15 bg-white'
              : 'border-blue-200/90 hover:border-[#0056D2]'
          }`}
        >
          <SlidersHorizontal className="w-3.5 h-3.5 text-[#0056D2] shrink-0" />
          <div className="flex flex-col min-w-[140px]">
            <span className="text-[9px] font-extrabold uppercase tracking-wider text-slate-400 leading-none">
              {prefixLabel || t.nav.viewingRole}
            </span>
            <span className="text-xs font-extrabold text-[#0056D2] leading-tight mt-0.5 truncate">
              {displayShortLabel}
            </span>
          </div>
          <ChevronDown
            className={`w-4 h-4 text-[#0056D2] shrink-0 transition-transform duration-200 ${
              open ? 'rotate-180' : ''
            }`}
          />
        </button>
      ) : variant === 'hero' ? (
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className={`w-full p-2.5 px-3.5 rounded-xl bg-white text-slate-900 border-2 transition-all flex items-center justify-between gap-2.5 shadow-md text-left ${
            open
              ? 'border-sky-400 ring-4 ring-sky-400/25'
              : 'border-white/80 hover:border-sky-300'
          }`}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <RoleOptionIcon roleId={selectedRole.id} />
            <div className="min-w-0">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#0056D2] block leading-none">
                {prefixLabel || t.hero.filteringByRole}
              </span>
              <span className="text-xs sm:text-sm font-extrabold text-slate-900 truncate block mt-0.5">
                {displayShortLabel}
              </span>
            </div>
          </div>
          <ChevronDown
            className={`w-4 h-4 text-[#0056D2] shrink-0 transition-transform duration-200 ${
              open ? 'rotate-180' : ''
            }`}
          />
        </button>
      ) : (
        /* variant === 'modal' / 'form' (Used inside AuthModal & Mobile Drawer) */
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className={`w-full bg-white border-2 rounded-xl px-3.5 py-2.5 text-left transition-all flex items-center justify-between gap-3 shadow-sm ${
            open
              ? 'border-[#0056D2] ring-4 ring-[#0056D2]/15'
              : 'border-blue-200 hover:border-[#0056D2]'
          }`}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <RoleOptionIcon roleId={selectedRole.id} />
            <div className="min-w-0">
              <span className="text-xs sm:text-sm font-extrabold text-slate-900 block truncate">
                {displayShortLabel}
              </span>
              <span className="text-[11px] font-medium text-[#0056D2] block truncate">
                {displayFullLabel}
              </span>
            </div>
          </div>
          <ChevronDown
            className={`w-4 h-4 text-[#0056D2] shrink-0 transition-transform duration-200 ${
              open ? 'rotate-180' : ''
            }`}
          />
        </button>
      )}

      {/* 2. PORTAL DROPDOWN MENU (NEVER CLIPPED BY MODAL OVERFLOW-HIDDEN) */}
      {open &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            ref={menuRef}
            style={menuStyle}
            className="bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,40,120,0.28)] border border-blue-100 p-2 overflow-y-auto animate-fadeIn"
          >
            <div className="px-2.5 py-1.5 border-b border-slate-100 flex items-center justify-between mb-1">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                {t.nav.selectRoleHeader}
              </span>
              <span className="text-[10px] font-bold text-[#0056D2] bg-blue-50 px-2 py-0.5 rounded-full">
                {t.nav.autoFilterBadge}
              </span>
            </div>

            <div className="space-y-1">
              {USER_ROLES.map((role) => {
                const isSelected = role.id === value;
                const itemTitle =
                  lang === 'en' ? role.shortLabelEn : role.shortLabel;
                const itemSub = lang === 'en' ? role.labelEn : role.label;

                return (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => handleSelect(role.id)}
                    className={`w-full text-left p-2 rounded-xl transition-all flex items-center justify-between gap-2.5 group ${
                      isSelected
                        ? 'bg-[#EBF5FF] text-[#0056D2] ring-1 ring-[#0056D2]/25'
                        : 'bg-white hover:bg-slate-50 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <RoleOptionIcon roleId={role.id} />
                      <div className="min-w-0">
                        <p
                          className={`text-xs sm:text-[13px] font-bold truncate leading-snug ${
                            isSelected
                              ? 'text-[#0056D2] font-extrabold'
                              : 'text-slate-900 group-hover:text-[#0056D2]'
                          }`}
                        >
                          {itemTitle}
                        </p>
                        <p className="text-[11px] text-slate-500 truncate mt-0.5">
                          {itemSub}
                        </p>
                      </div>
                    </div>

                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-all ${
                        isSelected
                          ? 'bg-[#0056D2] text-white scale-100'
                          : 'border border-slate-200 bg-slate-50 text-transparent group-hover:border-blue-300'
                      }`}
                    >
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
