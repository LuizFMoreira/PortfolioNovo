/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cosmic-dark':     '#06040F',
        'cosmic-light':    '#0D0A1E',
        'electric-violet': '#7C3AED',
        'violet-glow':     '#9333EA',
        'indigo-glow':     '#4F46E5',
        'neon-cyan':       colors.cyan[400],
        'neon-amber':      '#F59E0B',
        'neon-emerald':    '#10B981',
        // keep legacy alias so ProjectModal / old refs don't break
        'neon-purple':     colors.violet[500],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      keyframes: {
        'aurora-1': {
          '0%, 100%': { transform: 'translate3d(0px,   0px, 0) scale(1)'    },
          '33%':      { transform: 'translate3d(60px, -40px, 0) scale(1.08)' },
          '66%':      { transform: 'translate3d(-40px, 30px, 0) scale(0.95)' },
        },
        'aurora-2': {
          '0%, 100%': { transform: 'translate3d(0px,   0px,  0) scale(1)'    },
          '40%':      { transform: 'translate3d(-50px, 60px,  0) scale(1.10)' },
          '70%':      { transform: 'translate3d(30px, -50px,  0) scale(0.92)' },
        },
        'aurora-3': {
          '0%, 100%': { transform: 'translate3d(0px, 0px,  0) scale(1)'    },
          '50%':      { transform: 'translate3d(40px, 40px, 0) scale(1.06)' },
        },
        'aurora-4': {
          '0%, 100%': { transform: 'translate3d(0px,  0px,  0) scale(1)'    },
          '45%':      { transform: 'translate3d(-30px,-60px, 0) scale(1.04)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)'  },
          '50%':      { transform: 'translateY(-10px)' },
        },
        'wave-bar': {
          '0%, 100%': { transform: 'scaleY(0.4)' },
          '50%':      { transform: 'scaleY(1)'   },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-400px 0' },
          '100%': { backgroundPosition:  '400px 0' },
        },
        'cursor-blink': {
          '0%, 45%':  { opacity: 1 },
          '55%, 100%':{ opacity: 0 },
        },
      },
      animation: {
        'aurora-1':  'aurora-1 28s ease-in-out infinite',
        'aurora-2':  'aurora-2 22s ease-in-out infinite',
        'aurora-3':  'aurora-3 35s ease-in-out infinite',
        'aurora-4':  'aurora-4 19s ease-in-out infinite',
        'float':     'float     4s ease-in-out infinite',
        'wave-bar':  'wave-bar  1s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
