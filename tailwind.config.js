/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        gold: {
          50: '#fdf8e8',
          100: '#f9edc5',
          200: '#f3d98a',
          300: '#edc24f',
          400: '#e5b020',
          500: '#d49a14',
          600: '#b3780e',
          700: '#8f5c12',
          800: '#774817',
          900: '#653c19',
          950: '#3b1f0b',
        },
        mystic: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7e22ce',
          800: '#581c87',
          900: '#1a1025',
          950: '#0d0515',
        },
      },
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
        cormorant: ['Cormorant Garamond', 'serif'],
        playfair: ['Playfair Display', 'serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
        'particle': 'particle 8s linear infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'card-flip': 'cardFlip 0.8s ease-out forwards',
        'spark': 'spark 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(201, 168, 76, 0.3), 0 0 10px rgba(201, 168, 76, 0.1)' },
          '100%': { boxShadow: '0 0 20px rgba(201, 168, 76, 0.6), 0 0 40px rgba(201, 168, 76, 0.3), 0 0 60px rgba(201, 168, 76, 0.1)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGold: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        particle: {
          '0%': { transform: 'translateY(100vh) scale(0)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateY(-10vh) scale(1)', opacity: '0' },
        },
        shimmer: {
          '0%, 100%': { backgroundPosition: '200% 0' },
          '50%': { backgroundPosition: '-200% 0' },
        },
        cardFlip: {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(180deg)' },
        },
        spark: {
          '0%, 100%': { transform: 'scale(1) rotate(0deg)', opacity: '0.7' },
          '50%': { transform: 'scale(1.5) rotate(180deg)', opacity: '1' },
        },
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #c9a84c 0%, #f0d060 50%, #c9a84c 100%)',
        'mystic-gradient': 'linear-gradient(180deg, #0a0a0a 0%, #1a1025 50%, #0a0a0a 100%)',
        'card-gradient': 'linear-gradient(145deg, rgba(201,168,76,0.15) 0%, rgba(10,10,10,0.95) 40%, rgba(26,16,37,0.9) 100%)',
      },
      boxShadow: {
        'gold': '0 0 15px rgba(201, 168, 76, 0.3)',
        'gold-lg': '0 0 30px rgba(201, 168, 76, 0.4), 0 0 60px rgba(201, 168, 76, 0.1)',
        'gold-inner': 'inset 0 0 20px rgba(201, 168, 76, 0.1)',
        'mystic': '0 0 40px rgba(26, 16, 37, 0.5)',
      },
    },
  },
  plugins: [],
};