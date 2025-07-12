/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-poppins)', 'sans-serif'],
      },
      colors: {
        'music-purple': '#a21caf',
        'music-pink': '#f472b6',
        'music-yellow': '#facc15',
        'music-blue': '#38bdf8',
      },
    },
  },
  plugins: [],
}; 