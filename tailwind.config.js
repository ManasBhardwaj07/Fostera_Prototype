/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'fostera-warm': '#F6F7F5',
        'fostera-surface': '#FFFFFF',
        'fostera-surface-soft': '#EEF1ED',
        'fostera-text-primary': '#17201B',
        'fostera-text-secondary': '#66736B',
        'fostera-brand': '#2F7D59',
        'fostera-brand-dark': '#216044',
        'fostera-brand-soft': '#E4F0E9',
        'fostera-focal': '#17221C'
      }
    },
  },
  plugins: [],
}
