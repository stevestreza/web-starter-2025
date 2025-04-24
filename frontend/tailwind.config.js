/** @type {import('tailwindcss').Config} */
export default {
  content: [
    `./index.html`,
    `./src/**/*.{js,ts,jsx,tsx}`,
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Base colors
        primary: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
          950: '#2e1065',
        },
        // Semantic colors
        surface: {
          DEFAULT: '#ffffff',
          dark: '#030814',
        },
        background: {
          DEFAULT: '#f8fafc',
          dark: '#0f172a',
        },
        text: {
          primary: {
            DEFAULT: '#1e293b',
            dark: '#f1f5f9',
          },
          secondary: {
            DEFAULT: '#64748b',
            dark: '#94a3b8',
          },
          muted: {
            DEFAULT: '#94a3b8',
            dark: '#64748b',
          },
        },
        border: {
          DEFAULT: '#e2e8f0',
          dark: '#334155',
        },
        accent: {
          DEFAULT: '#8b5cf6',
          dark: '#a78bfa',
        },
      },
    },
  },
  plugins: [],
}
