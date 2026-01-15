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
        'kids-3xl': ['3.75rem', { lineHeight: '1.2' }],
      },
      colors: {
        // 魔法の森パレット
        'forest': {
          deep: '#1B4332',
          moss: '#2D6A4F',
          leaf: '#40916C',
          glow: '#95D5B2',
          mist: '#D8F3DC',
        },
        // 光の魔法石（白/子ども側）
        'light-magic': {
          core: '#FFFCF2',
          glow: '#FFE66D',
          aura: '#FFF3B0',
          soft: '#FFFBEB',
        },
        // 影の魔法石（黒/大人側）
        'shadow-magic': {
          core: '#2C3E50',
          glow: '#5C6BC0',
          aura: '#9FA8DA',
          deep: '#1A252F',
        },
        // 空と星
        'sky': {
          dawn: '#FEE2E2',
          twilight: '#E0E7FF',
          night: '#1E293B',
          star: '#FDE047',
          aurora: '#C4B5FD',
        },
        // ファンタジー背景
        'fantasy': {
          cream: '#FDF8F3',
          soft: '#FAF5EF',
          warm: '#F7EBDF',
          paper: '#FEF9E7',
        },
        // キャラクターアクセント
        'character': {
          papa: '#7C3AED',
          mama: '#EC4899',
          jiiji: '#059669',
          baaba: '#F97316',
          ojichan: '#3B82F6',
          obachan: '#F472B6',
        },
        // ボード（木と苔）
        'board': {
          wood: '#8B5A2B',
          'wood-dark': '#5D3A1A',
          'wood-light': '#A67C52',
          moss: '#2D6A4F',
          'moss-dark': '#1B4332',
          'moss-light': '#40916C',
        },
        // レガシー互換（徐々に移行）
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
        'fantasy': '2.5rem',
      },
      boxShadow: {
        'kids': '0 4px 14px 0 rgba(0, 0, 0, 0.1)',
        'kids-lg': '0 10px 25px -5px rgba(0, 0, 0, 0.15)',
        'glow-white': '0 0 15px 5px rgba(255, 255, 255, 0.6)',
        'glow-black': '0 0 15px 5px rgba(100, 149, 237, 0.6)',
        'glow-gold': '0 0 20px 8px rgba(255, 230, 109, 0.6)',
        'glow-purple': '0 0 20px 8px rgba(92, 107, 192, 0.6)',
        'fantasy': '0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08)',
        'fantasy-lg': '0 16px 48px rgba(0, 0, 0, 0.15), 0 4px 16px rgba(0, 0, 0, 0.1)',
        'wood': 'inset 0 2px 4px rgba(0, 0, 0, 0.2), 0 4px 12px rgba(0, 0, 0, 0.3)',
        'stone-light': '0 4px 12px rgba(255, 230, 109, 0.4), inset 0 -3px 6px rgba(0, 0, 0, 0.1)',
        'stone-dark': '0 4px 12px rgba(92, 107, 192, 0.4), inset 0 -3px 6px rgba(0, 0, 0, 0.2)',
      },
      backgroundImage: {
        'fantasy-gradient': 'linear-gradient(180deg, #E0E7FF 0%, #FAF5EF 30%, #D8F3DC 100%)',
        'night-gradient': 'linear-gradient(180deg, #1E293B 0%, #2D6A4F 100%)',
        'wood-texture': 'linear-gradient(90deg, #8B5A2B 0%, #A67C52 50%, #8B5A2B 100%)',
        'moss-texture': 'radial-gradient(circle at 50% 50%, #40916C 0%, #2D6A4F 100%)',
        'light-stone': 'radial-gradient(circle at 30% 30%, #FFFCF2 0%, #FFE66D 100%)',
        'dark-stone': 'radial-gradient(circle at 30% 30%, #5C6BC0 0%, #2C3E50 100%)',
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite',
        'sparkle': 'sparkle 1s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'twinkle': 'twinkle 2s ease-in-out infinite',
        'sway': 'sway 4s ease-in-out infinite',
        'magic-pulse': 'magicPulse 2s ease-in-out infinite',
        'stone-glow-light': 'stoneGlowLight 2s ease-in-out infinite',
        'stone-glow-dark': 'stoneGlowDark 2s ease-in-out infinite',
        'firefly': 'firefly 8s ease-in-out infinite',
        'leaf-fall': 'leafFall 10s linear infinite',
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
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
        sway: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        magicPulse: {
          '0%, 100%': {
            boxShadow: '0 0 10px 4px rgba(253, 224, 71, 0.4)',
            transform: 'scale(1)'
          },
          '50%': {
            boxShadow: '0 0 25px 10px rgba(253, 224, 71, 0.8)',
            transform: 'scale(1.05)'
          },
        },
        stoneGlowLight: {
          '0%, 100%': {
            boxShadow: '0 0 8px 4px rgba(255, 230, 109, 0.4), inset 0 -3px 6px rgba(0, 0, 0, 0.1)'
          },
          '50%': {
            boxShadow: '0 0 20px 10px rgba(255, 230, 109, 0.8), inset 0 -3px 6px rgba(0, 0, 0, 0.1)'
          },
        },
        stoneGlowDark: {
          '0%, 100%': {
            boxShadow: '0 0 8px 4px rgba(92, 107, 192, 0.4), inset 0 -3px 6px rgba(0, 0, 0, 0.2)'
          },
          '50%': {
            boxShadow: '0 0 20px 10px rgba(92, 107, 192, 0.8), inset 0 -3px 6px rgba(0, 0, 0, 0.2)'
          },
        },
        firefly: {
          '0%, 100%': { opacity: '0.4', transform: 'translate(0, 0)' },
          '25%': { opacity: '1', transform: 'translate(20px, -15px)' },
          '50%': { opacity: '0.6', transform: 'translate(-10px, -25px)' },
          '75%': { opacity: '1', transform: 'translate(15px, -10px)' },
        },
        leafFall: {
          '0%': { transform: 'translateY(-10%) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateY(110vh) rotate(360deg)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
