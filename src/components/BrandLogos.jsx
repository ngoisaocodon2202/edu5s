import React, { useEffect, useRef, useState } from 'react';

/**
 * ScrollReveal Component:
 * Hỗ trợ hiệu ứng:
 * - 'up': Lướt từ dưới lên hiển thị từ từ ra
 * - 'left': Trượt từ bên trái vào giữa
 * - 'right': Trượt từ bên phải vào giữa
 * - 'scale': Phóng nhẹ từ tâm ra
 */
export function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  className = '',
  threshold = 0.12
}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const dirClass =
    direction === 'left'
      ? 'reveal-from-left'
      : direction === 'right'
      ? 'reveal-from-right'
      : direction === 'scale'
      ? 'reveal-from-scale'
      : 'reveal-from-up';

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`scroll-reveal-base ${dirClass} ${isVisible ? 'is-revealed' : ''} ${className}`}
    >
      {children}
    </div>
  );
}

/**
 * Bộ SVG Logo Thương Hiệu & Framework Thực Tế (Chuẩn màu hãng)
 */
export function BrandLogo({ name, brand, className = 'w-6 h-6' }) {
  const uid = React.useId().replace(/:/g, '');
  const key = String(name || brand || '').toLowerCase();

  // 1. GOOGLE (Chuẩn 4 màu Google)
  if (
    key.includes('google') &&
    !key.includes('antigravity') &&
    !key.includes('drive') &&
    !key.includes('chrome') &&
    !key.includes('sheets')
  ) {
    return (
      <svg viewBox="0 0 48 48" className={className} fill="none">
        <path
          fill="#FFC107"
          d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
        />
        <path
          fill="#FF3D00"
          d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
        />
        <path
          fill="#4CAF50"
          d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0124 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
        />
        <path
          fill="#1976D2"
          d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 01-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
        />
      </svg>
    );
  }

  // 2. GOOGLE ANTIGRAVITY (Chuẩn Logo Google Antigravity: Nền trắng bo góc + Vòm chữ A đa sắc Google)
  if (key.includes('antigravity') || key.includes('subagent') || key.includes('mcp')) {
    const clipId = `agClip_${uid}`;
    const blueId = `agBlue_${uid}`;
    const greenId = `agGreen_${uid}`;
    const redId = `agRed_${uid}`;
    const yellowId = `agYellow_${uid}`;
    return (
      <svg viewBox="0 0 48 48" className={className} fill="none">
        <defs>
          <clipPath id={clipId}>
            <path d="M24 9.5C21.2 9.5 19.3 12.6 17.5 17.8C15.5 23.5 13.2 29.5 10.3 33.4C9.3 34.7 10.1 36.5 11.7 36.5C13.1 36.5 14.3 35.6 15.4 34.1C17.8 30.8 20.3 25.2 24 25.2C27.7 25.2 30.2 30.8 32.6 34.1C33.7 35.6 34.9 36.5 36.3 36.5C37.9 36.5 38.7 34.7 37.7 33.4C34.8 29.5 32.5 23.5 30.5 17.8C28.7 12.6 26.8 9.5 24 9.5Z" />
          </clipPath>
          <radialGradient id={blueId} cx="50%" cy="78%" r="65%">
            <stop offset="0%" stopColor="#1A73E8" />
            <stop offset="55%" stopColor="#4285F4" />
            <stop offset="100%" stopColor="#4285F4" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={greenId} cx="28%" cy="34%" r="48%">
            <stop offset="0%" stopColor="#34A853" />
            <stop offset="65%" stopColor="#34A853" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#34A853" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={redId} cx="74%" cy="32%" r="48%">
            <stop offset="0%" stopColor="#EA4335" />
            <stop offset="65%" stopColor="#EA4335" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#EA4335" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={yellowId} cx="48%" cy="14%" r="38%">
            <stop offset="0%" stopColor="#FBBC04" />
            <stop offset="70%" stopColor="#FBBC04" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#FBBC04" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Nền trắng Squircle chuẩn icon Antigravity */}
        <rect
          x="3"
          y="3"
          width="42"
          height="42"
          rx="12"
          fill="#FFFFFF"
          stroke="#E2E8F0"
          strokeWidth="1.5"
        />

        {/* Vòm chữ A Antigravity phối màu Mesh Gradient chuẩn Google */}
        <g clipPath={`url(#${clipId})`}>
          <rect x="8" y="8" width="32" height="32" fill="#4285F4" />
          <rect x="8" y="8" width="32" height="32" fill={`url(#${greenId})`} />
          <rect x="8" y="8" width="32" height="32" fill={`url(#${redId})`} />
          <rect x="8" y="8" width="32" height="32" fill={`url(#${yellowId})`} />
          <rect x="8" y="8" width="32" height="32" fill={`url(#${blueId})`} />
        </g>
      </svg>
    );
  }

  // 3. VS CODE (Visual Studio Code Ribbon)
  if (key.includes('vs code') || key.includes('vscode') || key.includes('extension')) {
    return (
      <svg viewBox="0 0 48 48" className={className} fill="none">
        <path
          d="M34.6 5.2L17.4 21.8L8.2 14.7C7.3 14 6 14.1 5.3 15L3.3 17.5C2.7 18.3 2.8 19.5 3.6 20.2L11.8 27L3.6 33.8C2.8 34.5 2.7 35.7 3.3 36.5L5.3 39C6 39.9 7.3 40 8.2 39.3L17.4 32.2L34.6 42.8C36.1 44.2 38.5 43.5 39.1 41.6L43.8 27L39.1 6.4C38.5 4.5 36.1 3.8 34.6 5.2Z"
          fill="#0065A9"
        />
        <path
          d="M35.2 5.4L17.4 22.2L25 27L35.2 18.8V5.4Z"
          fill="#007ACC"
        />
        <path
          d="M35.2 42.6L17.4 25.8L25 21L35.2 29.2V42.6Z"
          fill="#1F9CF0"
        />
        <path
          d="M35.2 5.4C36.8 4.4 39 5.5 39 7.4V40.6C39 42.5 36.8 43.6 35.2 42.6L34 41.5V6.5L35.2 5.4Z"
          fill="#29B6F6"
        />
      </svg>
    );
  }

  // 4. CLAUDE AI (Anthropic Sunburst / Terracotta)
  if (key.includes('claude')) {
    return (
      <svg viewBox="0 0 48 48" className={className} fill="none">
        <rect x="4" y="4" width="40" height="40" rx="12" fill="#D97757" />
        <g stroke="#FFF7ED" strokeWidth="3.2" strokeLinecap="round">
          <line x1="24" y1="10" x2="24" y2="38" />
          <line x1="10" y1="24" x2="38" y2="24" />
          <line x1="14.1" y1="14.1" x2="33.9" y2="33.9" />
          <line x1="33.9" y1="14.1" x2="14.1" y2="33.9" />
          <line x1="18.5" y1="11.2" x2="29.5" y2="36.8" />
          <line x1="11.2" y1="29.5" x2="36.8" y2="18.5" />
        </g>
        <circle cx="24" cy="24" r="4.5" fill="#D97757" />
        <circle cx="24" cy="24" r="2.5" fill="#FFF7ED" />
      </svg>
    );
  }

  // 5. CURSOR IDE (3D Isometric Cube Logo)
  if (key.includes('cursor')) {
    return (
      <svg viewBox="0 0 48 48" className={className} fill="none">
        <rect x="4" y="4" width="40" height="40" rx="11" fill="#141414" />
        <polygon points="24,10 37,17.5 24,25 11,17.5" fill="#FFFFFF" />
        <polygon points="11,17.5 24,25 24,39 11,31.5" fill="#A3A3A3" />
        <polygon points="37,17.5 24,25 24,39 37,31.5" fill="#525252" />
        <path d="M21 20L31 24L25.5 26L23.5 31.5L21 20Z" fill="#0056D2" />
      </svg>
    );
  }

  // 6. POWERPOINT / GAMMA SLIDES (Microsoft PowerPoint Orange-Red)
  if (key.includes('powerpoint') || key.includes('slide') || key.includes('gamma') || key.includes('pitch')) {
    return (
      <svg viewBox="0 0 48 48" className={className} fill="none">
        <circle cx="27" cy="24" r="17" fill="#ED6C47" />
        <path d="M27 7A17 17 0 0144 24H27V7Z" fill="#FF8F6B" />
        <rect x="5" y="12" width="22" height="24" rx="4" fill="#D24726" />
        <path
          d="M12.5 18H16.8C19.1 18 20.5 19.3 20.5 21.3C20.5 23.4 19 24.7 16.7 24.7H14.9V29.5H12.5V18ZM14.9 22.8H16.5C17.6 22.8 18.2 22.2 18.2 21.3C18.2 20.4 17.6 19.9 16.5 19.9H14.9V22.8Z"
          fill="white"
        />
      </svg>
    );
  }

  // 7. CANVA (Canva Cyan-Purple Gradient Circle)
  if (key.includes('canva') || key.includes('magic')) {
    return (
      <svg viewBox="0 0 48 48" className={className} fill="none">
        <defs>
          <linearGradient id="canvaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00C4CC" />
            <stop offset="55%" stopColor="#5A45FF" />
            <stop offset="100%" stopColor="#7D2AE8" />
          </linearGradient>
        </defs>
        <circle cx="24" cy="24" r="20" fill="url(#canvaGrad)" />
        <path
          d="M29.8 28.4C28.3 30.8 25.9 32.2 23.2 32.2C18.7 32.2 15.8 28.6 15.8 23.8C15.8 18.6 19.3 15 24 15C27.2 15 29.4 16.6 29.9 19.1C28.8 19.5 27.6 19.4 27.1 18.4C26.7 17.5 25.6 17 24.2 17C20.9 17 18.8 19.9 18.8 23.8C18.8 27.4 20.8 29.9 23.8 29.9C25.8 29.9 27.4 28.9 28.5 27.1L29.8 28.4Z"
          fill="white"
        />
      </svg>
    );
  }

  // 8. EXCEL / GOOGLE SHEETS (Microsoft Excel Green)
  if (key.includes('excel') || key.includes('sheet') || key.includes('vlookup') || key.includes('pivot') || key.includes('data')) {
    return (
      <svg viewBox="0 0 48 48" className={className} fill="none">
        <rect x="14" y="7" width="28" height="34" rx="3" fill="#21A366" />
        <path d="M14 15H42V24H14V15Z" fill="#107C41" />
        <path d="M14 24H42V33H14V24Z" fill="#185C37" />
        <rect x="5" y="12" width="22" height="24" rx="4" fill="#107C41" />
        <path
          d="M11.2 18L14.5 23.8L11 29.8H13.7L16 25.5L18.3 29.8H21L17.4 23.8L20.8 18H18.2L16 22.1L13.9 18H11.2Z"
          fill="white"
        />
      </svg>
    );
  }

  // 9. GOOGLE DRIVE
  if (key.includes('drive')) {
    return (
      <svg viewBox="0 0 48 48" className={className} fill="none">
        <path d="M17 6L31 6L45 30L31 30L17 6Z" fill="#FFC107" />
        <path d="M3 30L17 6L24 18L10 42L3 30Z" fill="#1976D2" />
        <path d="M10 42L45 30L38 42L10 42Z" fill="#4CAF50" />
      </svg>
    );
  }

  // 10. GOOGLE CHROME
  if (key.includes('chrome')) {
    return (
      <svg viewBox="0 0 48 48" className={className} fill="none">
        <circle cx="24" cy="24" r="20" fill="#4CAF50" />
        <path d="M24 4C32.8 4 40.3 9.7 43 17.7H24V4Z" fill="#EA4335" />
        <path d="M6.7 14C10.1 8 16.6 4 24 4L24 24L6.7 14Z" fill="#EA4335" />
        <path d="M24 44C32.8 44 40.3 38.3 43 30.3L24 24V44Z" fill="#FBBC05" />
        <circle cx="24" cy="24" r="9" fill="white" />
        <circle cx="24" cy="24" r="6.5" fill="#1A73E8" />
      </svg>
    );
  }

  // 11. ZALO (Official Zalo App Icon)
  if (key.includes('zalo')) {
    return (
      <img
        src="/zalo-icon.png"
        alt="Zalo"
        className={`${className} rounded-[22%] object-contain shrink-0`}
      />
    );
  }

  // 12. FACEBOOK
  if (key.includes('facebook') || key.includes('fanpage')) {
    return (
      <svg viewBox="0 0 48 48" className={className} fill="none">
        <rect x="3" y="3" width="42" height="42" rx="12" fill="#1877F2" />
        <path
          d="M29.5 25.5L30.4 19.6H24.8V15.8C24.8 14.2 25.6 12.6 28.1 12.6H30.7V7.6C30.7 7.6 28.4 7.2 26.2 7.2C21.6 7.2 18.6 10 18.6 15V19.6H13.5V25.5H18.6V40H24.8V25.5H29.5Z"
          fill="white"
        />
      </svg>
    );
  }

  // 13. WINDOWS / OS SECURITY (Windows 11 4-square Microsoft Blue)
  if (key.includes('windows') || key.includes('macos')) {
    return (
      <svg viewBox="0 0 48 48" className={className} fill="none">
        <rect x="5" y="5" width="17" height="17" rx="3" fill="#0078D4" />
        <rect x="26" y="5" width="17" height="17" rx="3" fill="#0078D4" />
        <rect x="5" y="26" width="17" height="17" rx="3" fill="#0078D4" />
        <rect x="26" y="26" width="17" height="17" rx="3" fill="#0078D4" />
      </svg>
    );
  }

  // DEFAULT TECH / SECURITY / AI BADGE
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none">
      <rect x="4" y="4" width="40" height="40" rx="12" fill="#0056D2" />
      <path
        d="M24 11L35 16V24.5C35 31.6 30.3 37.9 24 40C17.7 37.9 13 31.6 13 24.5V16L24 11Z"
        stroke="white"
        strokeWidth="2.5"
        fill="#1D4ED8"
      />
      <path d="M19.5 24.5L22.5 27.5L29 21" stroke="#38BDF8" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function getBrandKeyFromText(text = '') {
  return String(text || '');
}


