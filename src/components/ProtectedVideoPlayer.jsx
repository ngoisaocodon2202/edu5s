import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  ShieldAlert,
  Lock,
  CheckCircle2,
  Terminal,
  FileCode2,
  Sparkles,
  FolderGit2,
  Search,
  GitBranch,
  Cpu,
  ShieldCheck,
  KeyRound,
  Smartphone,
  BarChart3,
  Table2,
  Presentation,
  MousePointer,
} from 'lucide-react';
import { BrandLogo, getBrandKeyFromText } from './BrandLogos';
import { useLanguage } from '../context/LanguageContext';

/**
 * Builds 4 realistic, step-by-step live screen-recording scenes + smooth single-voice
 * Male narration scripts for Vietnamese (vi-VN-NamMinhNeural) and English (en-US-GuyNeural).
 */
function buildLessonScenes(course, lessonIndex, lessonTitleVi, lessonTitleEn) {
  const tool = (course?.tools && course.tools[0]) || 'Google Antigravity';
  const pillar = course?.pillar || 'ai-coding';
  const num = lessonIndex + 1;
  const cleanTitleVi = String(lessonTitleVi || course?.title || '').replace(
    /^Bài\s+\d+\s*(\[[^\]]+\])?:\s*/i,
    ''
  );

  if (pillar === 'ai-coding') {
    return [
      {
        step: 1,
        titleVi: 'Khởi động Antigravity IDE & Gõ lệnh agy trên CLI',
        titleEn: 'Launch Antigravity IDE & Run agy in CLI Terminal',
        shortcutHud: 'Terminal: agy --workspace eduAI',
        cursor: { x: 42, y: 74, clicking: true },
        narrationVi: `Chào mừng bạn đến với bài học số ${num}, ${cleanTitleVi}. Đầu tiên trên giao diện Antigravity IDE, chúng ta mở cửa sổ dòng lệnh ở phía dưới và gõ lệnh a-gờ-i để khởi động trợ lý lập trình và nạp toàn bộ cấu trúc thư mục dự án.`,
        narrationEn: `Welcome to lesson ${num}, ${lessonTitleEn}. First inside the Antigravity IDE workbench, we open the integrated terminal at the bottom and run the agy command to launch the AI agent and index our workspace.`,
      },
      {
        step: 2,
        titleVi: 'Dùng phím tắt Ctrl+I & Lệnh /plan @src/App.jsx',
        titleEn: 'Use Ctrl+I Inline Command & /plan @src/App.jsx',
        shortcutHud: 'Ctrl + I  •  /plan @src/App.jsx',
        cursor: { x: 54, y: 38, clicking: true },
        narrationVi: `Sang bước thứ hai, bạn nhấn tổ hợp phím Ctrl I ngay tại dòng mã nguồn hoặc gõ lệnh gạch chéo plan kèm ký hiệu a-còng tên tệp trong cửa sổ dòng lệnh. Trợ lý AI sẽ lập tức phân tích và hiển thị bản xem trước các dòng mã thêm mới màu xanh lá.`,
        narrationEn: `In step two, press Control I directly inside the editor or run the slash plan command with file mentions in the CLI. The Antigravity agent immediately proposes inline green and red code diffs.`,
      },
      {
        step: 3,
        titleVi: 'Nhấn phím Tab duyệt Diff & Kiểm tra Auxiliary Pane',
        titleEn: 'Press Tab to Accept Diff & Inspect Auxiliary Pane',
        shortcutHud: 'Tab (Accept Diff)  •  Proceed Plan',
        cursor: { x: 82, y: 46, clicking: true },
        narrationVi: `Ở bước thứ ba, bạn nhấn phím Tab để chấp nhận đoạn mã do AI viết và bấm nút Proceed ở khung kế hoạch bên phải. Hệ thống tự động cập nhật tệp tin, chạy lệnh kiểm thử và kết nối cơ sở dữ liệu thành công.`,
        narrationEn: `In step three, press Tab to accept the proposed diff and click Proceed on the implementation plan card on the right. The agent updates the files and verifies the build automatically.`,
      },
      {
        step: 4,
        titleVi: 'Hoàn tất biên dịch 0 lỗi & Đánh dấu hoàn thành bài học',
        titleEn: 'Zero-Error Build Verified & Lesson Completed',
        shortcutHud: '✓ npm run build (0 errors)',
        cursor: { x: 76, y: 68, clicking: true },
        narrationVi: `Như vậy toàn bộ thao tác thực hành trên Antigravity IDE và giao diện dòng lệnh đã hoàn tất chính xác một trăm phần trăm. Hệ thống đã tự động tích xanh hoàn thành bài học này cho bạn.`,
        narrationEn: `All practical actions in Antigravity IDE and the CLI are now one hundred percent complete. This lesson has been automatically marked as completed for you.`,
      },
    ];
  }

  if (pillar === 'google-security') {
    return [
      {
        step: 1,
        titleVi: 'Mở myaccount.google.com/security & Rà soát thiết bị',
        titleEn: 'Open myaccount.google.com/security & Audit Devices',
        shortcutHud: 'Chrome • myaccount.google.com/security',
        cursor: { x: 74, y: 44, clicking: true },
        narrationVi: `Chào mừng bạn đến với bài học số ${num}, ${cleanTitleVi}. Bước đầu tiên trên trình duyệt Chrome, chúng ta truy cập trang bảo mật tài khoản Google, kiểm tra danh sách thiết bị đang đăng nhập và bấm nút Thu hồi ngay thiết bị lạ.`,
        narrationEn: `Welcome to lesson ${num}. First in Google Chrome, we open the Google Account Security page, inspect all signed-in devices, and click Revoke on any unrecognized session.`,
      },
      {
        step: 2,
        titleVi: 'Bật Xác minh 2 bước (2FA) & Tạo khóa Passkey sinh trắc học',
        titleEn: 'Enable 2-Step Verification & Create Biometric Passkey',
        shortcutHud: 'Windows Hello • Create Passkey (FIDO2)',
        cursor: { x: 62, y: 58, clicking: true },
        narrationVi: `Sang bước thứ hai, bạn di chuột xuống mục Cách bạn đăng nhập vào Google, bật công tắc Xác minh hai bước và nhấn nút Tạo khóa truy cập bằng vân tay hoặc khuôn mặt trên máy tính.`,
        narrationEn: `In step two, scroll to How you sign in to Google, toggle on Two-Step Verification, and click Create a Passkey using Windows Hello biometric authentication.`,
      },
      {
        step: 3,
        titleVi: 'Kiểm tra chữ ký số Google LLC & Bật Safe Browsing',
        titleEn: 'Verify Google LLC Digital Signature & Safe Browsing',
        shortcutHud: 'Verified Publisher: Google LLC',
        cursor: { x: 48, y: 66, clicking: true },
        narrationVi: `Ở bước thứ ba, chúng ta kiểm tra chứng chỉ chữ ký số chính hãng trước khi cài đặt phần mềm và bật chế độ Duyệt web an toàn nâng cao để chặn triệt để các đường link giả mạo.`,
        narrationEn: `In step three, we verify the official digital signature certificate before installing apps and enable Enhanced Safe Browsing to block phishing links.`,
      },
      {
        step: 4,
        titleVi: 'Đạt 100% điểm bảo mật Google & Hoàn thành bài học',
        titleEn: '100% Google Security Score & Lesson Completed',
        shortcutHud: '✓ Security Checkup: 100% Protected',
        cursor: { x: 55, y: 36, clicking: true },
        narrationVi: `Tuyệt vời, tài khoản của bạn đã đạt mức bảo vệ tối đa một trăm phần trăm. Hệ thống đã tự động đánh dấu tích xanh hoàn thành bài học này cho bạn.`,
        narrationEn: `Excellent, your account has reached one hundred percent security protection. This lesson is now automatically marked with a completion checkmark.`,
      },
    ];
  }

  // Pillar 3: Office AI (Excel, PowerPoint, Canva)
  return [
    {
      step: 1,
      titleVi: `Mở bảng dữ liệu trên ${tool} & Khởi động Copilot`,
      titleEn: `Open Dataset in ${tool} & Launch AI Copilot`,
      shortcutHud: `${tool} • Alt + C (Open AI Copilot)`,
      cursor: { x: 84, y: 22, clicking: true },
      narrationVi: `Chào mừng bạn đến với bài học số ${num}, ${cleanTitleVi}. Bước đầu tiên trên giao diện ${tool}, chúng ta bôi đen bảng dữ liệu nguồn từ cột A đến cột E và nhấp chuột mở bảng điều khiển trợ lý AI ở góc phải.`,
      narrationEn: `Welcome to lesson ${num}. First inside ${tool}, we highlight our source data table from column A to column E and click to open the AI Copilot sidebar on the right.`,
    },
    {
      step: 2,
      titleVi: 'Nhập yêu cầu vào khung AI & Tự động điền công thức',
      titleEn: 'Enter AI Prompt & Auto-Populate Formulas',
      shortcutHud: 'fx =XLOOKUP(A2, Data!A:A, Data!D:D)',
      cursor: { x: 82, y: 62, clicking: true },
      narrationVi: `Ở bước thứ hai, bạn nhập câu lệnh yêu cầu tổng hợp doanh thu vào khung chat AI và nhấn nút Thực thi. Ngay lập tức, công thức tìm kiếm tự động điền xuống toàn bộ các dòng dữ liệu mà không cần gõ thủ công.`,
      narrationEn: `In step two, type your revenue summary prompt into the AI chat box and click Generate. Instantly, lookup formulas populate across all rows automatically.`,
    },
    {
      step: 3,
      titleVi: 'Tự động dựng biểu đồ tăng trưởng & Bộ Slide chuẩn 5S',
      titleEn: 'Auto-Generate Growth Charts & 5S Branded Slides',
      shortcutHud: 'Brand Kit: #0056D2 • Auto-Layout',
      cursor: { x: 52, y: 55, clicking: true },
      narrationVi: `Sang bước thứ ba, hệ thống tự động chuyển hóa bảng số liệu thành biểu đồ cột tăng trưởng trực quan và căn chỉnh toàn bộ bố cục trang thuyết trình theo đúng màu xanh thương hiệu.`,
      narrationEn: `In step three, the system transforms the spreadsheet numbers into an animated growth bar chart and aligns all presentation slides to the corporate brand kit.`,
    },
    {
      step: 4,
      titleVi: 'Xuất báo cáo hoàn chỉnh & Tích xanh hoàn thành bài học',
      titleEn: 'Export Final Deliverable & Mark Lesson Complete',
      shortcutHud: '✓ Exported: Bao_Cao_5S_AI.pptx / .xlsx',
      cursor: { x: 64, y: 32, clicking: true },
      narrationVi: `Chúc mừng bạn đã hoàn thành toàn bộ thao tác thực tế trên ${tool} và tiết kiệm hơn tám mươi lăm phần trăm thời gian làm việc. Bài học đã được đánh dấu hoàn thành.`,
      narrationEn: `Congratulations on completing the live workflow in ${tool} and saving over eighty-five percent of your working time. This lesson is now marked complete.`,
    },
  ];
}

const clientAudioBlobCache = new Map();

function fetchTtsAudioBlobUrl(langCode, text) {
  const key = `${langCode}::${text}`;
  if (clientAudioBlobCache.has(key)) {
    return clientAudioBlobCache.get(key);
  }
  const url = `/api/tts?lang=${langCode}&text=${encodeURIComponent(text)}`;
  const promise = fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`TTS HTTP ${res.status}`);
      }
      return res.blob();
    })
    .then((blob) => {
      if (!blob || blob.size < 400) {
        throw new Error('Empty TTS audio blob');
      }
      return URL.createObjectURL(blob);
    })
    .catch((err) => {
      clientAudioBlobCache.delete(key);
      throw err;
    });

  clientAudioBlobCache.set(key, promise);
  return promise;
}

export default function ProtectedVideoPlayer({
  course,
  lessonIndex = 0,
  lessonTitleVi,
  lessonTitleEn,
  user,
  isCompleted = false,
  onLessonComplete,
}) {
  const { lang } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [stepProgress, setStepProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [securityAlert, setSecurityAlert] = useState('');
  const [audioLoading, setAudioLoading] = useState(false);
  const [audioBlocked, setAudioBlocked] = useState(false);

  const audioRef = useRef(null);
  const reqIdRef = useRef(0);
  const fallbackTimerRef = useRef(null);
  const audioWaitRef = useRef(false);

  const scenes = buildLessonScenes(
    course,
    lessonIndex,
    lessonTitleVi,
    lessonTitleEn
  );
  const activeScene = scenes[currentStepIdx] || scenes[0];
  const prevScene =
    currentStepIdx > 0 ? scenes[currentStepIdx - 1] : activeScene;
  const primaryTool = (course?.tools && course.tools[0]) || 'Google Antigravity';
  const pillar = course?.pillar || 'ai-coding';
  const isEn = lang === 'en';

  const stopCurrentAudio = useCallback(() => {
    if (fallbackTimerRef.current) {
      clearInterval(fallbackTimerRef.current);
      fallbackTimerRef.current = null;
    }
    audioWaitRef.current = false;
    const audioEl = audioRef.current;
    if (audioEl) {
      audioEl.onloadedmetadata = null;
      audioEl.ontimeupdate = null;
      audioEl.onended = null;
      audioEl.onerror = null;
      try {
        audioEl.pause();
      } catch {
        // ignore
      }
    }
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }, []);

  // Reset to Step 1 when switching course or lesson
  useEffect(() => {
    setCurrentStepIdx(0);
    setStepProgress(0);
    setIsPlaying(true);
    setAudioBlocked(false);
  }, [course?.id, lessonIndex]);

  // ============================================================================
  // UNIFIED VIDEO TIMELINE + SINGLE-VOICE MALE AUDIO ENGINE
  // Video animates immediately at 20fps while audio Blob loads & syncs seamlessly
  // ============================================================================
  useEffect(() => {
    stopCurrentAudio();

    if (!isPlaying) {
      setAudioLoading(false);
      return () => stopCurrentAudio();
    }

    const myReqId = ++reqIdRef.current;
    const stepObj = scenes[currentStepIdx] || scenes[0];
    const langCode = isEn ? 'en' : 'vi';
    const textToSpeak = isEn ? stepObj.narrationEn : stepObj.narrationVi;

    let hasAdvanced = false;
    const advanceToNextStepOrComplete = () => {
      if (hasAdvanced || reqIdRef.current !== myReqId) return;
      hasAdvanced = true;
      if (fallbackTimerRef.current) {
        clearInterval(fallbackTimerRef.current);
        fallbackTimerRef.current = null;
      }
      if (currentStepIdx < scenes.length - 1) {
        setStepProgress(0);
        setCurrentStepIdx((prev) => prev + 1);
      } else {
        setStepProgress(100);
        setIsPlaying(false);
        if (onLessonComplete) {
          onLessonComplete(lessonIndex);
        }
      }
    };

    // 1. Start the Continuous 50ms Master Video Animation Timer immediately
    const stepStartTime = performance.now();
    let fallbackBaseTime = stepStartTime;
    let fallbackBasePct = 0;

    fallbackTimerRef.current = setInterval(() => {
      if (reqIdRef.current !== myReqId) return;
      const audioEl = audioRef.current;

      // If real audio is actively playing, lock timeline to exact audio duration
      if (
        !isMuted &&
        audioEl &&
        !audioEl.paused &&
        audioEl.currentTime > 0 &&
        Number.isFinite(audioEl.duration) &&
        audioEl.duration > 0
      ) {
        const audioPct = Math.min(
          99.5,
          (audioEl.currentTime / audioEl.duration) * 100
        );
        fallbackBasePct = audioPct;
        fallbackBaseTime = performance.now();
        setStepProgress(audioPct);
        return;
      }

      // While waiting for TTS network response (up to 4s), animate smoothly up to 32%
      const totalElapsed = performance.now() - stepStartTime;
      if (!isMuted && audioWaitRef.current && totalElapsed < 4000) {
        const warmPct = Math.min(32, (totalElapsed / 11000) * 100);
        fallbackBasePct = warmPct;
        fallbackBaseTime = performance.now();
        setStepProgress(warmPct);
        return;
      }

      // Otherwise (muted, audio blocked, or TTS fallback), advance smoothly to 100%
      const dt = performance.now() - fallbackBaseTime;
      const nextPct = Math.min(100, fallbackBasePct + (dt / 10000) * 100);
      setStepProgress(nextPct);
      if (nextPct >= 100) {
        advanceToNextStepOrComplete();
      }
    }, 50);

    // 2. If not muted, fetch in-memory Audio Blob and play via persistent <audio>
    if (isMuted) {
      setAudioLoading(false);
      audioWaitRef.current = false;
      return () => stopCurrentAudio();
    }

    setAudioLoading(true);
    audioWaitRef.current = true;

    fetchTtsAudioBlobUrl(langCode, textToSpeak)
      .then((blobUrl) => {
        if (reqIdRef.current !== myReqId) return;
        audioWaitRef.current = false;
        setAudioLoading(false);

        // Pre-warm the NEXT step sequentially so it is instant when needed
        const nextStep = scenes[currentStepIdx + 1];
        if (nextStep) {
          const nextTxt = isEn ? nextStep.narrationEn : nextStep.narrationVi;
          fetchTtsAudioBlobUrl(langCode, nextTxt).catch(() => {});
        }

        const audioEl = audioRef.current;
        if (!audioEl) return;

        audioEl.src = blobUrl;
        audioEl.volume = 1.0;
        audioEl.currentTime = 0;

        audioEl.onended = () => {
          if (reqIdRef.current !== myReqId) return;
          setStepProgress(100);
          setTimeout(() => {
            advanceToNextStepOrComplete();
          }, 200);
        };

        audioEl.onerror = () => {
          if (reqIdRef.current !== myReqId) return;
          audioWaitRef.current = false;
          setAudioLoading(false);
        };

        const playPromise = audioEl.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              if (reqIdRef.current === myReqId) {
                setAudioBlocked(false);
              }
            })
            .catch((err) => {
              if (reqIdRef.current !== myReqId) return;
              if (err?.name === 'NotAllowedError') {
                setAudioBlocked(true);
              }
            });
        }
      })
      .catch(() => {
        if (reqIdRef.current !== myReqId) return;
        audioWaitRef.current = false;
        setAudioLoading(false);
      });

    return () => stopCurrentAudio();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [course?.id, lessonIndex, currentStepIdx, lang, isPlaying, isMuted]);

  // ============================================================================
  // STRICT ANTI-DOWNLOAD & ANTI-SCREEN-RECORDING DRM PROTECTION
  // ============================================================================
  useEffect(() => {
    const triggerSecurityLock = (reasonVi, reasonEn) => {
      setIsPlaying(false);
      stopCurrentAudio();
      setSecurityAlert(isEn ? reasonEn : reasonVi);
    };

    const handleKeyDown = (e) => {
      const key = (e.key || '').toLowerCase();
      if (
        e.key === 'PrintScreen' ||
        e.key === 'F12' ||
        ((e.ctrlKey || e.metaKey) && (key === 's' || key === 'u')) ||
        ((e.ctrlKey || e.metaKey) &&
          e.shiftKey &&
          (key === 'i' || key === 'c' || key === 's')) ||
        (e.metaKey && e.shiftKey && (key === '3' || key === '4' || key === '5'))
      ) {
        e.preventDefault();
        e.stopPropagation();
        triggerSecurityLock(
          'CẢNH BÁO BẢN QUYỀN 5S AI: Hệ thống đã chặn phím tắt tải xuống / chụp hoặc quay màn hình video bài giảng.',
          '5S AI DRM PROTECTION: Screen capture, recording, and video download shortcuts are strictly blocked.'
        );
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden && isPlaying) {
        triggerSecurityLock(
          'Tạm dừng bảo mật: Video tự động khóa khi bạn chuyển tab hoặc mở công cụ quay màn hình bên ngoài.',
          'Security Pause: Video automatically locked when switching tabs or activating external screen recorders.'
        );
      }
    };

    let originalGetDisplayMedia = null;
    if (navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) {
      originalGetDisplayMedia = navigator.mediaDevices.getDisplayMedia;
      navigator.mediaDevices.getDisplayMedia = async () => {
        triggerSecurityLock(
          'PHÁT HIỆN QUAY MÀN HÌNH: Hệ thống 5S AI DRM không cho phép quay màn hình video bài giảng.',
          'SCREEN RECORDING BLOCKED: 5S AI DRM prohibits recording lecture videos.'
        );
        throw new Error('5S AI DRM: Screen recording is disabled.');
      };
    }

    window.addEventListener('keydown', handleKeyDown, true);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('keydown', handleKeyDown, true);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (originalGetDisplayMedia && navigator.mediaDevices) {
        navigator.mediaDevices.getDisplayMedia = originalGetDisplayMedia;
      }
    };
  }, [isPlaying, isEn, stopCurrentAudio]);

  const handleTogglePlay = () => {
    setSecurityAlert('');
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      if (stepProgress >= 100 && currentStepIdx === scenes.length - 1) {
        setCurrentStepIdx(0);
        setStepProgress(0);
      }
      setIsPlaying(true);
    }
  };

  const handleSelectStep = (idx) => {
    setSecurityAlert('');
    setCurrentStepIdx(idx);
    setStepProgress(0);
    setIsPlaying(true);
  };

  const handleToggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  const handleUnlockAudio = useCallback(() => {
    setAudioBlocked(false);
    setIsMuted(false);
    const audioEl = audioRef.current;
    if (audioEl && audioEl.src) {
      audioEl.play().catch(() => {});
    }
  }, []);

  useEffect(() => {
    if (!audioBlocked) return undefined;
    const onUserInteract = () => {
      handleUnlockAudio();
    };
    window.addEventListener('pointerdown', onUserInteract, { once: true });
    return () => window.removeEventListener('pointerdown', onUserInteract);
  }, [audioBlocked, handleUnlockAudio]);

  const stepNum = currentStepIdx + 1;
  const totalSec = 44;
  const currentSec = Math.min(
    totalSec,
    Math.floor(((currentStepIdx * 100 + stepProgress) / 400) * totalSec)
  );
  const formatTime = (sec) => {
    const m = String(Math.floor(sec / 60)).padStart(2, '0');
    const s = String(sec % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  // Smooth cursor glide across the application workbench (0% -> 100%)
  const startCursor =
    currentStepIdx === 0 ? { x: 22, y: 26 } : prevScene.cursor;
  const moveRatio = Math.min(1, stepProgress / 35);
  const cursorX =
    startCursor.x +
    (activeScene.cursor.x - startCursor.x) * moveRatio +
    Math.sin((stepProgress / 100) * Math.PI * 2) * 5;
  const cursorY =
    startCursor.y +
    (activeScene.cursor.y - startCursor.y) * moveRatio +
    Math.cos((stepProgress / 100) * Math.PI * 2) * 3.5;
  const showClickRipple = stepProgress > 28 && stepProgress < 88;

  // Live character-by-character typing helper synced to stepProgress
  const typeText = (fullText) => {
    const str = String(fullText || '');
    const chars = Math.max(
      4,
      Math.floor(str.length * Math.min(1, stepProgress / 55))
    );
    return str.slice(0, chars) + (stepProgress < 60 ? '▋' : '');
  };

  return (
    <div
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
      className="relative shrink-0 rounded-2xl overflow-hidden bg-white border border-blue-200 shadow-lg select-none"
    >
      {/* Hidden Persistent DOM Audio Element for Reliable Neural Male Voiceover */}
      <audio ref={audioRef} preload="auto" className="hidden" />
      {/* ====================================================================
          16:9 REAL APPLICATION SCREEN-RECORDING VIEWPORT
         ==================================================================== */}
      <div className="relative aspect-video w-full bg-[#1E293B] overflow-hidden flex flex-col justify-between">
        {/* 1. PERMANENT TOP-LEFT 5S AI WEBSITE LOGO WATERMARK (Required) */}
        <div className="absolute top-3 left-3 z-40 flex items-center gap-2 bg-white/95 backdrop-blur-md px-3 py-1 rounded-xl shadow-md border border-blue-200 pointer-events-none">
          <img
            src="/logo-5s.png"
            alt="5S AI Education"
            className="h-5 sm:h-6 w-auto object-contain"
            draggable={false}
          />
          <span className="text-[10px] font-extrabold text-[#0056D2] uppercase tracking-wider border-l border-slate-200 pl-2">
            5S AI LIVE
          </span>
        </div>

        {/* Top-Right Step & Voice Indicator Badge */}
        <div className="absolute top-3 right-3 z-40 flex items-center gap-2">
          {audioBlocked && (
            <button
              type="button"
              onClick={handleUnlockAudio}
              className="px-3 py-1 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-[10px] sm:text-xs font-extrabold flex items-center gap-1.5 shadow-lg animate-bounce cursor-pointer"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>
                {isEn
                  ? 'Click to Enable Male Voice'
                  : 'Bấm để Bật Âm Thanh Giọng Nam'}
              </span>
            </button>
          )}
          {isCompleted && (
            <span className="px-2.5 py-1 rounded-xl bg-emerald-500 text-white text-[10px] sm:text-xs font-extrabold flex items-center gap-1 shadow-md pointer-events-none">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{isEn ? 'Completed' : 'Đã hoàn thành'}</span>
            </span>
          )}
          <span className="px-3 py-1 rounded-xl bg-slate-900/90 backdrop-blur-md text-white border border-white/15 text-[10px] sm:text-xs font-bold flex items-center gap-1.5 shadow-md pointer-events-none">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <span>
              {isEn
                ? `REC • Step ${stepNum}/4 (${Math.round(stepProgress)}%)`
                : `REC • Bước ${stepNum}/4 (${Math.round(stepProgress)}%)`}
            </span>
          </span>
        </div>

        {/* Floating Keyboard Shortcut HUD (Like OBS / Camtasia Tutorials) */}
        <div className="absolute top-14 right-3 z-40 pointer-events-none hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#0056D2]/95 text-white text-[11px] font-mono font-bold shadow-lg border border-sky-300/40">
          <Terminal className="w-3.5 h-3.5 text-sky-200" />
          <span>{activeScene.shortcutHud}</span>
        </div>

        {/* Dynamic Anti-Piracy Forensic Watermark */}
        <div
          style={{
            top: `${24 + ((stepNum * 17) % 45)}%`,
            left: `${18 + ((stepNum * 23) % 50)}%`,
          }}
          className="absolute z-30 pointer-events-none opacity-20 text-[10px] font-mono font-bold text-sky-300"
        >
          5S-DRM • {user?.email || 'student@5seduai.vn'} • NO SCREEN RECORDING
        </div>

        {/* Animated Instructor Mouse Cursor + Click Ripple */}
        <div
          style={{ left: `${cursorX}%`, top: `${cursorY}%` }}
          className="absolute z-40 pointer-events-none transition-all duration-75"
        >
          {showClickRipple && (
            <span className="absolute -top-3 -left-3 w-9 h-9 rounded-full bg-sky-400/40 border-2 border-sky-300 animate-ping" />
          )}
          <div className="flex items-center gap-1">
            <MousePointer className="w-5 h-5 text-[#0056D2] fill-sky-400 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]" />
            <span className="px-1.5 py-0.5 rounded bg-[#0056D2] text-white text-[9px] font-extrabold shadow whitespace-nowrap">
              5S Instructor
            </span>
          </div>
        </div>

        {/* ==================================================================
            REAL DESKTOP APPLICATION WORKBENCH RECORDING BY PILLAR
           ================================================================== */}
        <div className="flex-1 w-full h-full overflow-hidden flex flex-col">
          {pillar === 'ai-coding' ? (
            /* ================================================================
               AUTHENTIC GOOGLE ANTIGRAVITY IDE + `agy` CLI WORKBENCH
               ================================================================ */
            <div className="flex-1 flex flex-col bg-[#0F172A] text-slate-200 font-sans overflow-hidden">
              {/* IDE Top Menu Bar */}
              <div className="h-7 bg-[#090D16] border-b border-slate-800 px-3 flex items-center justify-between text-[10px] text-slate-400 shrink-0">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="ml-32 font-semibold text-slate-300 hidden md:inline">
                    File &nbsp; Edit &nbsp; Selection &nbsp; View &nbsp; Go &nbsp; Run &nbsp; Terminal
                  </span>
                </div>
                <div className="font-mono font-bold text-sky-400 truncate">
                  eduAI — Google Antigravity IDE (agy v2.0)
                </div>
                <div className="text-[10px] text-emerald-400 font-bold">
                  ● Gemini 2.5 Pro
                </div>
              </div>

              {/* IDE Main 3-Pane Body (Explorer + Editor/CLI Terminal + Agent Auxiliary Pane) */}
              <div className="flex-1 grid grid-cols-12 min-h-0 overflow-hidden">
                {/* Left 2 Cols: Activity Bar + File Explorer */}
                <div className="col-span-3 sm:col-span-2 bg-[#0B1120] border-r border-slate-800 flex min-h-0">
                  <div className="w-7 bg-[#070B14] border-r border-slate-800/80 flex flex-col items-center py-2 gap-3 text-slate-500 shrink-0">
                    <FolderGit2 className="w-3.5 h-3.5 text-sky-400" />
                    <Search className="w-3.5 h-3.5" />
                    <GitBranch className="w-3.5 h-3.5" />
                    <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <div className="flex-1 p-1.5 text-[10px] font-mono space-y-1 overflow-hidden">
                    <div className="text-[9px] font-bold uppercase text-slate-400 px-1">
                      EXPLORER: EDUAI
                    </div>
                    <div className="px-1 py-0.5 rounded text-sky-300 bg-sky-500/10">
                      ▾ .agents/skills
                    </div>
                    <div className="pl-3 text-slate-300 truncate">
                      📄 SKILL.md
                    </div>
                    <div className="px-1 py-0.5 text-slate-400">▾ server/</div>
                    <div
                      className={`pl-3 rounded px-1 py-0.5 truncate ${
                        stepNum >= 2
                          ? 'bg-emerald-500/15 text-emerald-300 font-bold'
                          : 'text-slate-300'
                      }`}
                    >
                      📄 db.js {stepNum >= 2 ? 'M' : ''}
                    </div>
                    <div className="pl-3 text-slate-300 truncate">
                      📄 index.js
                    </div>
                    <div className="px-1 py-0.5 text-slate-400">▾ src/</div>
                    <div
                      className={`pl-3 rounded px-1 py-0.5 truncate ${
                        stepNum === 2
                          ? 'bg-blue-500/20 text-sky-300 font-bold'
                          : 'text-slate-300'
                      }`}
                    >
                      ⚛ App.jsx {stepNum >= 2 ? 'M' : ''}
                    </div>
                  </div>
                </div>

                {/* Center 6 Cols: Code Editor (with Inline Code Lens & Ctrl+I Diff) + Bottom `agy` CLI Terminal */}
                <div className="col-span-9 sm:col-span-6 flex flex-col min-h-0 border-r border-slate-800">
                  {/* Editor Tabs */}
                  <div className="h-6 bg-[#0B1120] border-b border-slate-800 flex items-center px-2 gap-2 text-[10px] font-mono shrink-0">
                    <span className="px-2 py-0.5 bg-[#1E293B] text-sky-300 rounded-t border-t border-sky-400 font-bold">
                      src/App.jsx
                    </span>
                    <span className="px-2 py-0.5 text-slate-500">
                      server/db.js
                    </span>
                  </div>

                  {/* Code Editor Canvas */}
                  <div className="flex-1 bg-[#0F172A] p-2 font-mono text-[10px] sm:text-[11px] space-y-1 overflow-hidden relative">
                    {/* Antigravity Inline Code Lens */}
                    <div className="text-[9px] text-sky-400/90 flex items-center gap-2 pl-6">
                      <span>✦ Antigravity Code Lens:</span>
                      <span className="underline cursor-pointer">Refactor</span>
                      <span>|</span>
                      <span className="underline cursor-pointer">
                        Explain Code
                      </span>
                      <span>|</span>
                      <span className="underline cursor-pointer">
                        Write Tests
                      </span>
                    </div>

                    <div className="flex gap-2 text-slate-300">
                      <span className="text-slate-600 select-none">01</span>
                      <span>
                        <span className="text-purple-400">export async function</span>{' '}
                        <span className="text-sky-300">syncCoursesToPostgres</span>
                        (courses) {'{'}
                      </span>
                    </div>

                    {/* Visual Red/Green Inline Diff when step >= 2 */}
                    {stepNum >= 2 ? (
                      <>
                        <div className="flex gap-2 bg-red-500/20 border-l-2 border-red-400 text-red-200 px-1">
                          <span className="text-red-400 select-none">-02</span>
                          <span className="line-through">
                            const data = localStorage.getItem(&apos;demo_courses&apos;);
                          </span>
                        </div>
                        <div className="flex gap-2 bg-emerald-500/20 border-l-2 border-emerald-400 text-emerald-200 px-1">
                          <span className="text-emerald-400 select-none">+02</span>
                          <span>
                            const res = await pool.query(&apos;SELECT * FROM courses ORDER BY id&apos;);
                          </span>
                        </div>
                        <div className="flex gap-2 bg-emerald-500/20 border-l-2 border-emerald-400 text-emerald-200 px-1">
                          <span className="text-emerald-400 select-none">+03</span>
                          <span>
                            return res.rows; // Synced with PostgreSQL eduai_5s
                          </span>
                        </div>
                      </>
                    ) : (
                      <div className="flex gap-2 text-slate-400">
                        <span className="text-slate-600 select-none">02</span>
                        <span>
                          const data = localStorage.getItem(&apos;demo_courses&apos;);
                        </span>
                      </div>
                    )}

                    <div className="flex gap-2 text-slate-300">
                      <span className="text-slate-600 select-none">04</span>
                      <span>{'}'}</span>
                    </div>

                    {/* Floating Ctrl+I Inline Command Widget */}
                    {stepNum === 2 && (
                      <div className="mt-1 p-1.5 rounded-lg bg-[#1E293B] border border-sky-400/60 shadow-lg flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5 text-[10px] text-sky-200 truncate">
                          <Sparkles className="w-3 h-3 text-sky-400 shrink-0" />
                          <span>
                            Ctrl+I: Chuyển sang đồng bộ trực tiếp PostgreSQL
                          </span>
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          <span className="px-1.5 py-0.5 rounded bg-emerald-600 text-white text-[9px] font-bold">
                            Accept (Tab)
                          </span>
                          <span className="px-1.5 py-0.5 rounded bg-slate-700 text-slate-300 text-[9px]">
                            Esc
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Bottom Integrated Terminal: Authentic `agy` CLI */}
                  <div className="h-[44%] bg-[#070B14] border-t border-slate-800 p-2 font-mono text-[10px] space-y-1 overflow-hidden shrink-0">
                    <div className="flex items-center justify-between text-[9px] text-slate-400 border-b border-slate-800/80 pb-1">
                      <div className="flex items-center gap-3">
                        <span className="text-sky-400 font-bold border-b border-sky-400">
                          TERMINAL (pwsh — agy CLI)
                        </span>
                        <span>PORTS (3001, 5173, 5432)</span>
                      </div>
                      <span className="text-emerald-400 font-bold">
                        ● agy active
                      </span>
                    </div>

                    <div className="text-slate-300">
                      <span className="text-emerald-400">
                        PS C:\Users\qockh\Downloads\eduAI&gt;
                      </span>{' '}
                      <span className="text-amber-300 font-bold">agy</span>
                    </div>

                    <div className="text-sky-300">
                      <span className="text-purple-400">agy&gt;</span>{' '}
                      {typeText(
                        stepNum === 1
                          ? '/plan @src/App.jsx @server/db.js Chuẩn hóa hệ thống PostgreSQL'
                          : stepNum === 2
                          ? '/boost Tự động tạo API và kiểm tra bảo mật dữ liệu'
                          : 'npm run build && npm run server'
                      )}
                    </div>

                    {stepNum >= 2 && (
                      <div className="text-emerald-400 space-y-0.5">
                        <div>
                          ● invoke_subagent(research) → Indexed 60 courses in PostgreSQL
                        </div>
                        {stepNum >= 3 && (
                          <div>
                            ✓ [Vite Build] 1,594 modules transformed in 1.82s (0 errors)
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Right 4 Cols: Antigravity 2.0 Agent Sidebar & Auxiliary Pane */}
                <div className="hidden sm:flex sm:col-span-4 bg-[#0B1120] flex-col min-h-0 p-2 space-y-2 overflow-hidden">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-1 text-[9px] font-bold text-slate-400">
                    <span className="text-sky-400">ANTIGRAVITY AGENT</span>
                    <span>Artifacts • Subagents • Tasks</span>
                  </div>

                  {/* Thought & Tool Calls */}
                  <div className="p-2 rounded-lg bg-[#111827] border border-slate-800 text-[10px] space-y-1">
                    <div className="text-slate-400 italic">
                      ▾ Thought for 2.1s • Analyzed @src/App.jsx
                    </div>
                    <div className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-emerald-300 font-mono text-[9px]">
                      ✓ Edited src/App.jsx (+42 -8 lines)
                    </div>
                    <div className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-sky-300 font-mono text-[9px]">
                      ✓ Updated server/db.js (PostgreSQL :5432)
                    </div>
                  </div>

                  {/* Artifact Card: implementation_plan.md with Proceed button */}
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-950/80 to-slate-900 border border-blue-500/40 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-extrabold text-sky-300 flex items-center gap-1">
                        <FileCode2 className="w-3 h-3" />
                        implementation_plan.md
                      </span>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-blue-500/30 text-blue-200 font-bold">
                        Artifact
                      </span>
                    </div>
                    <p className="text-[9px] text-slate-300 leading-snug">
                      Kế hoạch triển khai đồng bộ PostgreSQL 5432 & kiểm thử tự động.
                    </p>
                    <div className="flex items-center justify-end gap-1.5 pt-1">
                      <span
                        className={`px-2.5 py-1 rounded-md text-[10px] font-extrabold transition ${
                          stepNum >= 3
                            ? 'bg-emerald-500 text-white'
                            : 'bg-[#0056D2] text-white'
                        }`}
                      >
                        {stepNum >= 3 ? '✓ Approved & Executed' : 'Proceed →'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : pillar === 'google-security' ? (
            /* ================================================================
               AUTHENTIC GOOGLE CHROME + GOOGLE ACCOUNT SECURITY CENTER UI
               ================================================================ */
            <div className="flex-1 flex flex-col bg-[#F8FAFC] text-slate-800 overflow-hidden">
              {/* Chrome Browser Top Bar */}
              <div className="h-9 bg-[#E2E8F0] border-b border-slate-300 px-3 flex items-center gap-3 shrink-0">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                </div>
                <div className="ml-28 flex-1 max-w-md bg-white rounded-full px-3 py-1 text-[10px] font-mono text-slate-700 border border-slate-300 flex items-center gap-1.5 truncate">
                  <Lock className="w-3 h-3 text-emerald-600 shrink-0" />
                  <span>https://myaccount.google.com/security</span>
                </div>
                <BrandLogo brand="google" className="w-4 h-4 shrink-0" />
              </div>

              {/* Google Account Security Body */}
              <div className="flex-1 p-3 sm:p-5 grid grid-cols-12 gap-3 overflow-hidden items-center">
                {/* Left Google Security Summary */}
                <div className="col-span-5 bg-white rounded-2xl p-3.5 border border-slate-200 shadow-xs space-y-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0056D2] flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[11px] font-extrabold text-slate-900">
                        Google Security Checkup
                      </div>
                      <div className="text-[10px] font-bold text-emerald-600">
                        {stepNum >= 3
                          ? '✓ Tài khoản đã bảo vệ 100%'
                          : 'Đang cấu hình bảo mật 2FA'}
                      </div>
                    </div>
                  </div>

                  {/* Device Session Audit */}
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="text-[10px] font-extrabold text-slate-700 flex items-center gap-1">
                      <Smartphone className="w-3.5 h-3.5 text-[#0056D2]" />
                      <span>Thiết bị đang đăng nhập (Your Devices)</span>
                    </div>
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="text-slate-600">
                        {stepNum > 1
                          ? '✓ Windows 11 PC (Chính chủ)'
                          : '⚠ Thiết bị lạ (IP: 103.42.x.x)'}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded font-extrabold text-[9px] ${
                          stepNum > 1
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-red-600 text-white'
                        }`}
                      >
                        {stepNum > 1 ? 'Đã cô lập' : 'Thu hồi ngay'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Passkey & 2FA Interactive Panel */}
                <div className="col-span-7 bg-white rounded-2xl p-3.5 border border-blue-200 shadow-sm space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <KeyRound className="w-4 h-4 text-[#0056D2]" />
                      <span className="text-xs font-extrabold text-slate-900">
                        Xác minh 2 bước (2FA) & Khóa Passkeys
                      </span>
                    </div>
                    {/* Animated Toggle Switch */}
                    <div
                      className={`w-11 h-6 rounded-full p-0.5 transition flex items-center ${
                        stepNum >= 2
                          ? 'bg-[#0056D2] justify-end'
                          : 'bg-slate-300 justify-start'
                      }`}
                    >
                      <span className="w-5 h-5 rounded-full bg-white shadow" />
                    </div>
                  </div>

                  {/* Windows Hello Biometric Passkey Dialog */}
                  <div className="p-3 rounded-xl bg-blue-50/80 border border-blue-200 flex items-center justify-between gap-3">
                    <div className="space-y-0.5">
                      <div className="text-[11px] font-extrabold text-[#0056D2]">
                        Windows Hello Biometric Passkey (FIDO2)
                      </div>
                      <div className="text-[10px] text-slate-600">
                        {stepNum >= 2
                          ? '✓ Đã liên kết khóa vân tay / khuôn mặt chống Phishing 100%'
                          : 'Nhấn nút bên phải để tạo khóa truy cập sinh trắc học'}
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-extrabold shrink-0 ${
                        stepNum >= 2
                          ? 'bg-emerald-600 text-white'
                          : 'bg-[#0056D2] text-white'
                      }`}
                    >
                      {stepNum >= 2 ? '✓ Passkey Active' : '+ Tạo Passkey'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* ================================================================
               AUTHENTIC EXCEL / POWERPOINT / CANVA AI COPILOT WORKBENCH
               ================================================================ */
            <div className="flex-1 flex flex-col bg-[#F8FAFC] text-slate-800 overflow-hidden">
              {/* Office Top Ribbon + Formula Bar */}
              <div className="bg-[#0056D2] text-white px-3 py-1.5 flex items-center justify-between text-[10px] font-bold shrink-0">
                <div className="flex items-center gap-3">
                  <span>File</span>
                  <span className="underline">Home</span>
                  <span>Insert</span>
                  <span>Formulas</span>
                  <span>Data</span>
                </div>
                <span className="ml-24 truncate">
                  {primaryTool} — Bao_Cao_Quan_Tri_5S_AI
                </span>
                <span className="px-2 py-0.5 rounded bg-white text-[#0056D2] font-extrabold">
                  ✦ AI Copilot Active
                </span>
              </div>

              {/* Formula Bar */}
              <div className="h-7 bg-white border-b border-slate-200 px-3 flex items-center gap-2 text-[10px] font-mono shrink-0">
                <span className="font-bold text-[#0056D2] italic">fx</span>
                <span className="text-slate-700 truncate">
                  {typeText(
                    stepNum >= 2
                      ? '=XLOOKUP(A2, DanhMuc!A:A, DanhMuc!D:D, "Đã đối soát 100%")'
                      : 'Chọn ô D2..E12 -> Nhấn Alt+C mở bảng điều khiển AI Copilot...'
                  )}
                </span>
              </div>

              {/* Main Spreadsheet + Live Chart + Copilot Sidebar */}
              <div className="flex-1 p-3 grid grid-cols-12 gap-3 overflow-hidden items-stretch">
                {/* Left 8 Cols: Data Grid & Animated Bar Chart */}
                <div className="col-span-8 bg-white rounded-xl border border-slate-200 p-2.5 flex flex-col justify-between overflow-hidden">
                  <div className="flex items-center justify-between text-[10px] font-extrabold text-slate-700 pb-1.5 border-b border-slate-100">
                    <span className="flex items-center gap-1.5 text-[#0056D2]">
                      <Table2 className="w-3.5 h-3.5" />
                      <span>BẢNG DỮ LIỆU & BIỂU ĐỒ TỰ ĐỘNG HÓA AI</span>
                    </span>
                    <span className="text-emerald-600">
                      {stepNum >= 3 ? '✓ Đã đồng bộ Slide & Biểu đồ' : 'Đang xử lý...'}
                    </span>
                  </div>

                  {/* Mini Spreadsheet Rows */}
                  <div className="grid grid-cols-4 gap-1 text-[9px] font-mono bg-slate-50 p-1.5 rounded border border-slate-200 my-1">
                    <div className="font-bold text-slate-500">A: Khu vực</div>
                    <div className="font-bold text-slate-500">B: Quý 3</div>
                    <div className="font-bold text-slate-500">C: Quý 4</div>
                    <div className="font-bold text-[#0056D2]">D: AI XLOOKUP</div>
                    <div>Miền Bắc</div>
                    <div>1.42 Tỷ</div>
                    <div>1.98 Tỷ</div>
                    <div className="text-emerald-600 font-bold">
                      {stepNum >= 2 ? '+39.4% ✓' : '...'}
                    </div>
                    <div>Miền Nam</div>
                    <div>2.15 Tỷ</div>
                    <div>2.87 Tỷ</div>
                    <div className="text-emerald-600 font-bold">
                      {stepNum >= 2 ? '+33.5% ✓' : '...'}
                    </div>
                  </div>

                  {/* Animated Bar Chart */}
                  <div className="flex items-end justify-around h-20 pt-2 px-3 bg-blue-50/50 rounded-lg border border-blue-100">
                    {[42, 58, 65, 84, 96].map((h, i) => (
                      <div
                        key={i}
                        className="flex flex-col items-center gap-1 w-8"
                      >
                        <div
                          style={{
                            height: `${
                              stepNum >= 2 ? Math.round(h * 0.55) : 14
                            }px`,
                          }}
                          className="w-full rounded-t bg-gradient-to-t from-[#0056D2] to-[#0EA5E9] transition-all duration-500"
                        />
                        <span className="text-[8px] font-bold text-slate-500">
                          T{i + 8}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right 4 Cols: AI Copilot Prompt Panel */}
                <div className="col-span-4 bg-blue-50/90 rounded-xl border border-blue-200 p-2.5 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <div className="text-[10px] font-extrabold text-[#0056D2] flex items-center gap-1">
                      <Presentation className="w-3.5 h-3.5" />
                      <span>AI Copilot Studio</span>
                    </div>
                    <div className="p-2 rounded-lg bg-white border border-blue-200 text-[9px] text-slate-700 leading-snug">
                      &ldquo;Tự động viết hàm XLOOKUP, vẽ biểu đồ tăng trưởng và xuất 8 Slide chuẩn màu 5S AI&rdquo;
                    </div>
                  </div>

                  <div className="px-2.5 py-1.5 rounded-lg bg-[#0056D2] text-white text-[10px] font-extrabold text-center shadow">
                    {stepNum >= 3
                      ? '✓ Đã tạo 8 Slide & Biểu đồ'
                      : '✦ Tạo Báo Cáo Tự Động'}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Bottom Subtitle + Instructor Waveform Strip inside Video Frame */}
          <div className="h-12 bg-slate-950/95 border-t border-slate-800 px-3 sm:px-4 flex items-center justify-between gap-3 shrink-0 z-30">
            <p className="text-[11px] sm:text-xs font-semibold text-white truncate flex-1">
              <span className="text-sky-400 font-extrabold mr-1.5">
                {isEn ? `[Step ${stepNum}/4]:` : `[Bước ${stepNum}/4]:`}
              </span>
              {isEn ? activeScene.narrationEn : activeScene.narrationVi}
            </p>

            {/* Consistent Male Voice Waveform Indicator */}
            <div className="flex items-center gap-2 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-700 shrink-0">
              <div className="flex items-end gap-0.5 h-3">
                {[1, 2, 3, 4, 5].map((bar) => (
                  <span
                    key={bar}
                    className={`w-1 rounded-full bg-sky-400 transition-all ${
                      isPlaying && !isMuted ? 'h-3 animate-pulse' : 'h-1'
                    }`}
                  />
                ))}
              </div>
              <span className="text-[10px] font-extrabold text-sky-300 whitespace-nowrap">
                {audioLoading
                  ? isEn
                    ? 'Loading voice...'
                    : 'Đang tải âm thanh...'
                  : isEn
                  ? 'Male Voice (EN)'
                  : 'Giọng Nam (VI)'}
              </span>
            </div>
          </div>
        </div>

        {/* Big Center Play Button Overlay when Paused */}
        {!isPlaying && !securityAlert && (
          <div
            onClick={handleTogglePlay}
            className="absolute inset-0 z-50 bg-slate-950/40 backdrop-blur-[2px] flex flex-col items-center justify-center cursor-pointer transition group"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#0056D2] group-hover:bg-[#0046AD] text-white flex items-center justify-center shadow-2xl border-4 border-white transition transform group-hover:scale-105">
              <Play className="w-8 h-8 fill-white ml-1" />
            </div>
            <span className="mt-3 px-4 py-1.5 rounded-full bg-white text-[#0056D2] font-extrabold text-xs sm:text-sm shadow-lg">
              {isEn
                ? '▶ Click to Play Live Screen-Recording Video'
                : '▶ Bấm để Phát Video Thao Tác Trực Tiếp (Giọng Nam)'}
            </span>
          </div>
        )}

        {/* DRM Security Alert Overlay */}
        {securityAlert && (
          <div className="absolute inset-0 z-50 bg-white/95 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center">
            <div className="w-12 h-12 rounded-2xl bg-red-50 border border-red-200 text-red-600 flex items-center justify-center mb-3">
              <ShieldAlert className="w-7 h-7" />
            </div>
            <h4 className="text-base sm:text-lg font-extrabold text-slate-900 mb-1.5">
              {isEn
                ? '5S AI Video DRM Protection Active'
                : 'Bảo Vệ Bản Quyền Video 5S AI Education'}
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mb-4">
              {securityAlert}
            </p>
            <button
              type="button"
              onClick={handleTogglePlay}
              className="px-5 py-2.5 rounded-xl bg-[#0056D2] hover:bg-[#0046AD] text-white font-bold text-xs shadow-md"
            >
              {isEn ? 'Resume Protected Playback' : 'Tiếp tục xem bài giảng'}
            </button>
          </div>
        )}
      </div>

      {/* ====================================================================
          VIDEO PLAYER TIMELINE & CONTROLS BAR
         ==================================================================== */}
      <div className="bg-white px-4 py-3 border-t border-slate-200 space-y-2.5">
        {/* Interactive 4-Step Timeline Scrubber */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-bold text-[#0056D2] whitespace-nowrap">
            {formatTime(currentSec)} / {formatTime(totalSec)}
          </span>

          <div className="flex-1 grid grid-cols-4 gap-1.5">
            {scenes.map((s, idx) => {
              const fill =
                idx < currentStepIdx
                  ? 100
                  : idx === currentStepIdx
                  ? stepProgress
                  : 0;
              return (
                <button
                  key={s.step}
                  type="button"
                  onClick={() => handleSelectStep(idx)}
                  className="group text-left space-y-1 focus:outline-none"
                >
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200/80">
                    <div
                      style={{ width: `${fill}%` }}
                      className="h-full bg-gradient-to-r from-[#0056D2] to-[#0EA5E9] transition-all duration-100"
                    />
                  </div>
                  <div
                    className={`text-[10px] font-extrabold truncate ${
                      idx === currentStepIdx
                        ? 'text-[#0056D2]'
                        : 'text-slate-400 group-hover:text-slate-700'
                    }`}
                  >
                    {isEn
                      ? `${s.step}. ${s.titleEn}`
                      : `${s.step}. ${s.titleVi}`}
                  </div>
                </button>
              );
            })}
          </div>

          <span className="px-2 py-0.5 rounded bg-blue-50 text-[#0056D2] border border-blue-200 text-[10px] font-extrabold whitespace-nowrap">
            1080p HD
          </span>
        </div>

        {/* Bottom Controls Row */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleTogglePlay}
              className="px-4 py-1.5 rounded-xl bg-[#0056D2] hover:bg-[#0046AD] text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition whitespace-nowrap"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5" />
                  <span>{isEn ? 'Pause' : 'Tạm dừng'}</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>{isEn ? 'Play Video' : 'Phát Video'}</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => handleSelectStep(0)}
              className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
              title={isEn ? 'Replay from start' : 'Xem lại từ đầu'}
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={handleToggleMute}
              className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition whitespace-nowrap"
            >
              {isMuted ? (
                <>
                  <VolumeX className="w-4 h-4 text-red-500" />
                  <span>{isEn ? 'Muted' : 'Đã tắt tiếng'}</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-[#0056D2]" />
                  <span>
                    {isEn
                      ? 'Consistent Male Voice (EN)'
                      : 'Giọng Nam Đồng Nhất (VI)'}
                  </span>
                </>
              )}
            </button>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 whitespace-nowrap">
            <Lock className="w-3.5 h-3.5 text-[#0056D2] shrink-0" />
            <span>
              {isEn
                ? 'DRM Protected • No Download / No Screen Recording'
                : 'Bảo vệ DRM • Chống tải video & Chống quay màn hình'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
