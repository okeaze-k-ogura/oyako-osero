/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Zen Maru Gothic"', 'sans-serif'],
      },
      fontSize: {
        'kids-sm': ['1.125rem', { lineHeight: '1.75' }],
        'kids-base': ['1.375rem', { lineHeight: '1.75' }],
        'kids-lg': ['1.75rem', { lineHeight: '1.5' }],
        'kids-xl': ['2.25rem', { lineHeight: '1.4' }],
        'kids-2xl': ['3rem', { lineHeight: '1.3' }],
      },
      colors: {
        'kids-primary': {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
        },
        'kids-secondary': {
          50: '#F0F9FF',
          100: '#E0F2FE',
          200: '#BAE6FD',
          300: '#7DD3FC',
          400: '#38BDF8',
          500: '#0EA5E9',
          600: '#0284C7',
        },
        'kids-accent': {
          50: '#FFF1F2',
          100: '#FFE4E6',
          200: '#FECDD3',
          300: '#FDA4AF',
          400: '#FB7185',
          500: '#F43F5E',
          600: '#E11D48',
        },
        'kids-mint': {
          50: '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
        },
        'kids-bg': {
          cream: '#FFFEF7',
          soft: '#FEF9E7',
        },
        'board': {
          green: '#2D8B4E',
          'green-dark': '#1F6B3A',
          'green-light': '#3DA863',
        },
      },
      spacing: {
        'touch-min': '44px',
        'touch-kids': '56px',
        'touch-lg': '64px',
      },
      minWidth: {
        'touch': '56px',
      },
      minHeight: {
        'touch': '56px',
      },
      borderRadius: {
        'kids': '1.5rem',
        'kids-lg': '2rem',
      },
      boxShadow: {
        'kids': '0 4px 14px 0 rgba(0, 0, 0, 0.1)',
        'kids-lg': '0 10px 25px -5px rgba(0, 0, 0, 0.15)',
        'glow-white': '0 0 15px 5px rgba(255, 255, 255, 0.6)',
        'glow-black': '0 0 15px 5px rgba(100, 149, 237, 0.6)',
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite',
        'sparkle': 'sparkle 1s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%, 100%': { boxShadow: '0 0 8px 4px rgba(255, 255, 255, 0.4)' },
          '50%': { boxShadow: '0 0 20px 8px rgba(255, 255, 255, 0.8)' },
        },
        sparkle: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
      },
    },
  },
  plugins: [],
}
