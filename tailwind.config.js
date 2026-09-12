/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        fostera: {
          bg: 'var(--color-bg)',
          surface: 'var(--color-surface)',
          'surface-soft': 'var(--color-surface-soft)',
          'text-primary': 'var(--color-text-primary)',
          'text-secondary': 'var(--color-text-secondary)',
          brand: 'var(--color-brand)',
          'brand-dark': 'var(--color-brand-dark)',
          'brand-soft': 'var(--color-brand-soft)',
          focal: 'var(--color-focal)',
          border: 'var(--color-border)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}
