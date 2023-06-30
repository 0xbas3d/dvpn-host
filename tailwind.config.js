/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/renderer/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        // Add your custom breakpoints here
        '2xl': '1311px',
        '3xl': '1536px',
      },
      colors: {
        'background-color': '#1E2142',
        'border-color': '#1F5EFF',
        'text-color': '#F1F2FF',
      },
    },
  },
  plugins: [],
};
