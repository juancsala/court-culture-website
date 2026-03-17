/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'cc-base': '#F9F8F5',
        'cc-dark': '#0D1A0D',
        'cc-green': '#1A3A1A',
        'cc-mid': '#2D5A2D',
        'cc-accent': '#C4B49A',
        'cc-text': '#0A0A0A',
        'cc-muted': '#6B6B6B',
        'cc-light': '#F0EDE8',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.25em',
      },
    },
  },
  plugins: [],
}
