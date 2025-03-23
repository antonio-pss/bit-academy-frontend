/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-animated': 'linear-gradient(-45deg, #ff6b6b, #f06595, #845ef7, #5c7cfa)',
      },
      backgroundSize: {
        '400': '400% 400%',
      },
      animation: {
        'gradient-x': 'gradient-x 8s ease infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': {'background-position': '0% 50%'},
          '50%': {'background-position': '100% 50%'},
        }
      },
      colors: {
        cornellRed: '#BF211E',       // Cornell red
        richBlack: '#101419',        // Rich black
        carrotOrange: '#F79824',     // Carrot orange
        celestialBlue: '#1E91D6',    // Celestial blue
        darkPastelGreen: '#34C759',  // Dark pastel green
        black: '#050505',            // Black
        white: '#FFFFFF',            // White
      },
    },
    plugins: [],
  }
}
