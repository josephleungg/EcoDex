/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        pocketmonk: ['PocketMonk', 'sans-serif'],
        gameboy: ['Gameboy', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
      colors: {
        'primary': ['#74BE5F'],
        'secondary': ['#D56060'],
        'tertiary': ['#5C5A5A'],
      },
    },
  },
  plugins: [],
};