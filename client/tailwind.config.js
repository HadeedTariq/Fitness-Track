/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "pt-serif": ["PT Serif", "serif"],
        ubuntu: ["Ubuntu", "sans-serif"],
        "roboto-mono": ["Roboto Mono", "sans-serif"],
        lato: ["Lato", "sans-serif"],
        "kode-mono": ["Kode Mono", "sans-serif"],
      },
    },
  },
  plugins: [],
};
