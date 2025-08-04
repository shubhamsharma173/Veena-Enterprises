/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        'xl-custom': '1400px',
      },
      colors: {
        // Figma Design Colors - Exact Color Codes
        figma: {
          // Primary Colors
          blue: {
            text: '#095BB3', // Primary blue from Figma
            bg: '#2A64A2'
          },
          yellow: {
            50: '#FFFDF0',
            100: '#FFFBE0',
            200: '#FFF7C2',
            300: '#FFF3A3',
            400: '#FFEF85',
            500: '#FFEB66',
            600: '#FFE747',
            700: '#FFD700', // Primary yellow from Figma - Footer headings
            800: '#FFDF0A',
            900: '#E6C900',
          },
          // Text Colors
          text: {
            primary: '#1A1A1A', // Dark text
            secondary: '#4A4A4A', // Medium text
            light: '#6B7280', // Light text
            white: '#FFFFFF', // White text
            muted: '#9CA3AF', // Muted text
          },
          // Background Colors
          bg: {
            primary: '#FFFFFF', // White background
            secondary: '#F9FAFB', // Light gray background
            dark: '#000000', // Black background
            heroOverlay: 'rgba(0, 0, 0, 0.25)', // Hero overlay
            infoOverlay: 'rgba(0, 0, 0, 0.4)', // Stats overlay
            statsOverlay: 'rgba(0, 0, 0, 0.65)', // Stats overlay
            card: '#F8F9FA', // Card background
          },
          // Border Colors
          border: {
            light: '#E5E7EB',
            medium: '#D1D5DB',
            dark: '#9CA3AF',
          },
          // Shadow Colors
          shadow: {
            light: 'rgba(0, 0, 0, 0.05)',
            medium: 'rgba(0, 0, 0, 0.1)',
            dark: 'rgba(0, 0, 0, 0.2)',
          }
        },
        // Legacy support (updated to Figma colors)
        primary: {
          yellow: '#FFD700',
          blue: '#2A64A2',
          cream: '#F5F5DC',
        },
        brand: {
          yellow: '#FFD700',
          darkBlue: '#2A64A2',
          cream: '#F5F5DC',
          green: '#10B981',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'figma-light': '0 1px 3px rgba(0, 0, 0, 0.05)',
        'figma-medium': '0 4px 6px rgba(0, 0, 0, 0.1)',
        'figma-dark': '0 10px 15px rgba(0, 0, 0, 0.2)',
        'figma-xl': '0 20px 25px rgba(0, 0, 0, 0.15)',
      },
      dropShadow: {
        'figma-text': '0 2px 4px rgba(0, 0, 0, 0.1)',
        'figma-text-lg': '0 4px 8px rgba(0, 0, 0, 0.15)',
      }
    },
  },
  plugins: [],
} 