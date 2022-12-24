/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'disp': ['Grand Hotel']
      },
      boxShadow: {
        'shox': '2px 57px 87px -9px rgba(119,117,138,0.93)',
      }
    },
  },
  plugins: [],
}
