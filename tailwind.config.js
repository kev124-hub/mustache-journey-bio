/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          'creme': '#F9F8F4',    // Main background
          'paper': '#FDFCF8',    // Container background
          'stone': '#E5E1D8',    // Borders and dividers
          'gold': '#BFA37E',     // Primary accent
          'charcoal': '#2C2C2C', // Primary buttons/dark elements
          'ink': '#1a1a1a',      // Headings and deep text
        }
      },
      fontFamily: {
        // You'll need to import these in your index.css or HTML head
        serif: ['"Playfair Display"', 'serif'], 
        sans: ['"Inter"', 'sans-serif'],
      },
      letterSpacing: {
        'luxury': '0.3em',
        'ultra': '0.5em',
      },
    },
  },
  plugins: [],
}