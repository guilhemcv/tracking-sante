/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        confort: ['Comfortaa', 'cursive'],
        secula: ['Secular One', 'sans-serif'],
        mitr: ['Mitr', 'sans-serif'],
        outfit : ['Outfit', 'sans-serif'],
      },
    },
    plugins: [],
  },
};
