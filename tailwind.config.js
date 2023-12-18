/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customBlack: '#312F2F',
        customWhite: '#FFFEFF',
        GrayWhite: '#dddddd',
        DarkerGrayWhite: '#a6a6a6'

      },
      fontFamily: {
        'sans': ['Poppins', 'sans']
      },

       
    }
  },
  plugins: [],
}
