/** @type {import('tailwindcss').Config} */
export default {
  darkMode:"class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(147.05deg, #F8BBD0 9.87%, #7833F9 43.52%, #00BCD4 92.54%)',
      },
      backdropBlur: {
        custom: '27.182817459106445px', // Custom blur value
      },

    },
  },
  plugins: [],
}

