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
          backdrop: 'var(--color-backdrop)',
          surface: 'var(--color-surface)',
          'surface-soft': 'var(--color-surface-soft)',
          'surface-hover': 'var(--color-surface-hover)',
          'text-primary': 'var(--color-text-primary)',
          'text-secondary': 'var(--color-text-secondary)',
          brand: 'var(--color-brand)',
          'brand-dark': 'var(--color-brand-dark)',
          'brand-soft': 'var(--color-brand-soft)',
          focal: 'var(--color-focal)',
          border: 'var(--color-border)',
          'border-subtle': 'var(--color-border-subtle)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      boxShadow: {
        'soft': 'var(--shadow-soft)',
        'elevated': 'var(--shadow-elevated)',
      }
    },
  },
  plugins: [],
}
