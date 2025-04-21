/** @type {import('tailwindcss').Config} */
export default {
  content: [
    `./index.html`,
    `./src/**/*.{js,ts,jsx,tsx}`,
  ],
  theme: {
    extend: {
      colors: {
        // Deep space background colors
        space: {
          50: `#E2E8F0`,  // Lightest space gray
          100: `#CBD5E1`, // Light space gray
          200: `#94A3B8`, // Space gray
          300: `#475569`, // Deep space gray
          400: `#1E293B`, // Darker space gray
          500: `#0F172A`, // Primary background
          600: `#020617`, // Deepest space
        },
        // Nebula-inspired accent colors
        nebula: {
          red: {
            100: `#FEE2E2`,
            200: `#FECACA`,
            300: `#FCA5A5`,
            400: `#F87171`,
            500: `#EF4444`, // Primary red
            600: `#DC2626`,
            700: `#B91C1C`,
          },
          purple: {
            100: `#F3E8FF`,
            200: `#E9D5FF`,
            300: `#D8B4FE`,
            400: `#C084FC`,
            500: `#A855F7`, // Primary purple
            600: `#9333EA`,
            700: `#7E22CE`,
          },
          blue: {
            100: `#DBEAFE`,
            200: `#BFDBFE`,
            300: `#93C5FD`,
            400: `#60A5FA`,
            500: `#3B82F6`, // Primary blue
            600: `#2563EB`,
            700: `#1D4ED8`,
          },
        },
      },
    },
  },
  plugins: [],
} 