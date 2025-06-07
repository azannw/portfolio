/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#1a1a1a',
        'light-text': '#e0e0e0',
        'accent-red': '#ff4c4c',
      },
      fontFamily: {
        'mono': ['JetBrains Mono', 'Fira Code', 'IBM Plex Mono', 'monospace'],
        'sans': ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
        'display': ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 