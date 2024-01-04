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
        DarkerGrayWhite: '#a6a6a6',
        bkg: "hsl(var(--color-bkg) / 1)",
        textcolor: "hsl(var(--color-text) / 1)",
        bordercolor: "hsl(var(--border-outline) / 1)",
        acent:  "hsl(var(--color-acent) / 1)",

      },
      fontFamily: {
        'sans': ['Poppins', 'sans']
      },

       
    }
  },
  plugins: [],
}

