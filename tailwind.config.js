/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#eceee9", // fundo
        ink: "#15171a", // texto e linhas fortes
        accent: "#2f3cf0", // única cor de destaque
        mute: "#5f635b", // texto secundário (contraste AA sobre paper)
        line: "#cfd1ca", // divisórias suaves
      },
      fontFamily: {
        display: ['"Instrument Serif"', "Georgia", "serif"],
        sans: ['"Inter Tight"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};
