/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    screens: {
      'sm': '640px',
      'md': '800px', 
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        'primary-color': '#f0a938',
        'primary-color-hover': '#e88518',
        'product-color': '#f6f6f6'
      },
    },
  },
  plugins: [],
}
