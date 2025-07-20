/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          yellow: '#FFD700',
          blue: '#1E3A8A',
          cream: '#F5F5DC',
        },
        brand: {
          yellow: '#FFD700',
          darkBlue: '#1E3A8A',
          cream: '#F5F5DC',
          green: '#10B981',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 