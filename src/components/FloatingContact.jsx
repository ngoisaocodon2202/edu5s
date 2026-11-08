import React, { useState } from 'react';
import {
  MessageCircle,
  ExternalLink,
  PhoneCall,
  Copy,
  Check,
  Headphones,
} from 'lucide-react';
import { CONTACT_INFO } from '../data/coursesData';
import { BrandLogo } from './BrandLogos';
import { useLanguage } from '../context/LanguageContext';

export default function FloatingContact() {
  const { t } = useLanguage();
  const [copiedField, setCopiedField] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleCopy = (e, text, field) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div
      className="fixed bottom-5 right-5 z-40"
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Popup Social Links Card */}
      {isHovered && (
        <div className="absolute bottom-11 right-0 pb-3 w-[310px] sm:w-[345px] animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl border border-blue-100 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#0056D2] to-[#0284C7] text-white px-4 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center shrink-0">
                  <Headphones className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="font-extrabold text-xs tracking-wide">
                    {t.contact.panelTitle}
                  </div>
                  <div className="text-[11px] text-blue-100">
                    {t.contact.panelSub}
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links List */}
            <div className="p-3 space-y-2 bg-slate-50/70">
              {/* 1. Zalo */}
              <div className="p-2.5 rounded-2xl bg-white border border-slate-200/80 hover:border-[#0068FF] transition flex items-center justify-between gap-2 shadow-sm">
                <a
                  href={CONTACT_INFO.zaloUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 flex-1 min-w-0"
                >
                  <BrandLogo
                    brand="zalo"
                    className="w-9 h-9 shrink-0 rounded-xl shadow-sm"
                  />
                  <div className="min-w-0">
                    <div className="text-[11px] font-bold text-slate-400">
                      {t.contact.zaloLabel}
                    </div>
                    <div className="text-sm font-extrabold text-[#0056D2] truncate">
                      {CONTACT_INFO.phone}
                    </div>
                  </div>
                </a>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={(e) => handleCopy(e, CONTACT_INFO.phone, 'phone')}
                    title="Copy"
                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition"
                  >
                    {copiedField === 'phone' ? (
                      <Check className="w-3.5 h-3.5 text-[#0056D2]" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                  <a
                    href={CONTACT_INFO.zaloUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-2.5 py-1.5 rounded-lg bg-[#0056D2] hover:bg-[#0046AD] text-white text-xs font-bold flex items-center gap-1 transition"
                  >
                    <span>{t.contact.chatBtn}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* 2. Email */}
              <div className="p-2.5 rounded-2xl bg-white border border-slate-200/80 hover:border-[#0056D2] transition flex items-center justify-between gap-2 shadow-sm">
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="flex items-center gap-2.5 flex-1 min-w-0"
                >
                  <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                    <BrandLogo brand="google" className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] font-bold text-slate-400">
                      {t.contact.emailLabel}
                    </div>
                    <div className="text-[11px] font-extrabold text-slate-800 break-all leading-tight">
                      {CONTACT_INFO.email}
                    </div>
                  </div>
                </a>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={(e) => handleCopy(e, CONTACT_INFO.email, 'email')}
                    title="Copy Email"
                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition"
                  >
                    {copiedField === 'email' ? (
                      <Check className="w-3.5 h-3.5 text-[#0056D2]" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                  <a
                    href={`mailto:${CONTACT_INFO.email}`}
                    className="px-2.5 py-1.5 rounded-lg bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold transition"
                  >
                    {t.contact.sendBtn}
                  </a>
                </div>
              </div>

              {/* 3. Fanpage Facebook */}
              <div className="p-2.5 rounded-2xl bg-white border border-slate-200/80 hover:border-[#0056D2] transition flex items-center justify-between gap-2 shadow-sm">
                <a
                  href={CONTACT_INFO.fanpageUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 flex-1 min-w-0"
                >
                  <BrandLogo
                    brand="facebook"
                    className="w-9 h-9 shrink-0 rounded-xl shadow-sm"
                  />
                  <div className="min-w-0">
                    <div className="text-[11px] font-bold text-slate-400">
                      {t.contact.fanpageLabel}
                    </div>
                    <div className="text-xs font-extrabold text-[#0056D2] truncate">
                      {t.contact.companyName}
                    </div>
                  </div>
                </a>
                <a
                  href={CONTACT_INFO.fanpageUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-2.5 py-1.5 rounded-lg bg-[#0056D2] hover:bg-[#0046AD] text-white text-xs font-bold flex items-center gap-1 shrink-0 transition"
                >
                  <span>{t.contact.openBtn}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Footer Call */}
            <div className="px-4 py-2.5 bg-slate-100 border-t border-slate-200 flex items-center justify-center">
              <a
                href={`tel:${CONTACT_INFO.phone}`}
                className="inline-flex items-center gap-1.5 text-xs font-extrabold text-slate-700 hover:text-[#0056D2] transition"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#0056D2]" />
                <span>{t.contact.directCall}</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Single Compact Circular Trigger Button (Same size as ScrollToTopButton: w-11 h-11) */}
      <button
        type="button"
        onMouseEnter={() => setIsHovered(true)}
        onClick={() => setIsHovered((prev) => !prev)}
        aria-label="5S AI Social Links"
        className="relative w-11 h-11 rounded-full bg-gradient-to-tr from-[#0056D2] to-[#0284C7] text-white shadow-[0_8px_25px_rgba(0,86,210,0.35)] hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center border-2 border-white"
      >
        <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-sky-400 border-2 border-white animate-pulse" />
        <MessageCircle className="w-5 h-5" />
      </button>
    </div>
  );
}
