/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        coursera: {
          blue: '#0056D2',
          blueHover: '#00419E',
          blueLight: '#EBF3FF',
          blueSoft: '#F0F6FF',
          dark: '#0F1114',
          navy: '#1F1F1F',
          grayBg: '#F5F7F8',
          border: '#E5E7EB',
          textSub: '#5B6780',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '"Source Sans 3"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'coursera-card': '0 2px 8px rgba(15, 17, 20, 0.06), 0 0 1px rgba(15, 17, 20, 0.12)',
        'coursera-hover': '0 14px 28px rgba(0, 86, 210, 0.12), 0 4px 12px rgba(15, 17, 20, 0.08)',
        'coursera-nav': '0 2px 12px rgba(0, 0, 0, 0.07)',
      },
      keyframes: {
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        }
      },
      animation: {
        'float-slow': 'floatSlow 4s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.45s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'scale-in': 'scaleIn 0.25s cubic-bezier(0.22, 1, 0.36, 1) forwards',
      }
    },
  },
  plugins: [],
}

