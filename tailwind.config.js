/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: {
    enabled: true,
    content: ['./src/renderer/**/*.{js,jsx,ts,tsx}'],
  },
  content: ['./src/renderer/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'background-color': '#1E2142',
        'border-color': '#1F5EFF',
        'text-color': '#F1F2FF',
      },
    },
  },
  plugins: [],
};
