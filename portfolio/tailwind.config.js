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
        // Nossa nova cor de fundo: um preto profundo com um toque de violeta
        'cosmic-dark': '#030014', 
        // Uma cor secundária para cartões e elementos translúcidos
        'cosmic-light': '#0f0728',
        // Nossa cor de destaque (neon)
        'neon-cyan': colors.cyan[400],
        'neon-purple': colors.violet[500],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
}