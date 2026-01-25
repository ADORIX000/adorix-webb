/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // 1. Custom Color Palette (Adorix Purple)
      colors: {
        adorix: {
          50: '#f5f3ff',  // Very light purple (backgrounds)
          100: '#ede9fe', // Light purple (hover backgrounds)
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6', // Main Brand Color (Purple)
          600: '#7c3aed', // Hover states
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95', // Deep purple (Text/Buttons)
          950: '#2e1065',
          dark: '#0f172a', // "Slate 900" - softer alternative to pure black
        }
      },
      // 2. Font Family
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      // 3. Animation Definitions
      animation: {
        'blob': 'blob 7s infinite', // The moving background animation
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
      },
      // 4. Keyframes for Animations
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}