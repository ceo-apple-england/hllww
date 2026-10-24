/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#050507',
          secondary: '#0B0A10',
          card: '#0f0e17',
          surface: '#13111c',
        },
        gothic: {
          purple: '#4A176D',
          deep: '#230b36',
          violet: '#310d49',
        },
        blood: {
          red: '#A30D25',
          dark: '#5a0614',
          crimson: '#FF1838',
        },
        moonlight: {
          silver: '#C7C4D5',
          dim: '#8D8998',
        },
        ghost: {
          white: '#F2EDF5',
        },
        muted: '#8D8998',
      },
      fontFamily: {
        gothic: ['"Cinzel Decorative"', 'serif'],
        cinzel: ['"Cinzel Decorative"', 'serif'],
        cormorant: ['"Cormorant Garamond"', 'serif'],
        inter: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'crimson-glow': '0 0 25px rgba(255, 24, 56, 0.35)',
        'crimson-strong': '0 0 40px rgba(255, 24, 56, 0.65)',
        'purple-glow': '0 0 30px rgba(74, 23, 109, 0.45)',
        'silver-glow': '0 0 20px rgba(199, 196, 213, 0.25)',
      },
      animation: {
        'fog-slow': 'fogMove 28s ease-in-out infinite alternate',
        'fog-reverse': 'fogMoveReverse 35s ease-in-out infinite alternate',
        'flicker': 'flicker 3s infinite',
        'pulse-slow': 'pulse 5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fogMove: {
          '0%': { transform: 'translateX(-5%) scale(1)' },
          '100%': { transform: 'translateX(5%) scale(1.08)' },
        },
        fogMoveReverse: {
          '0%': { transform: 'translateX(6%) scale(1.05)' },
          '100%': { transform: 'translateX(-6%) scale(1)' },
        },
        flicker: {
          '0%, 100%': { opacity: '0.9' },
          '50%': { opacity: '0.6' },
          '70%': { opacity: '0.95' },
          '80%': { opacity: '0.4' },
          '90%': { opacity: '0.85' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
