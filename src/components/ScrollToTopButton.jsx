import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function ScrollToTopButton() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 350);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      title={t.contact.scrollToTopTitle}
      aria-label={t.contact.scrollToTopTitle}
      className="fixed bottom-20 right-5 z-40 w-11 h-11 rounded-full bg-white hover:bg-[#0056D2] text-[#0056D2] hover:text-white border-2 border-blue-200 hover:border-[#0056D2] shadow-[0_8px_25px_rgba(0,86,210,0.25)] flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5 animate-fadeIn"
    >
      <ArrowUp className="w-5 h-5 stroke-[2.5]" />
    </button>
  );
}
