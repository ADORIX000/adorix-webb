/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        adorix: {
          50: '#f5f3ff',  // Very light purple for backgrounds
          100: '#ede9fe',
          500: '#8b5cf6', // Primary Brand Color
          600: '#7c3aed', // Hover states
          900: '#4c1d95', // Deep purple for text/buttons
          dark: '#0f172a', // Replacement for pure black (Slate)
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'blob': 'blob 7s infinite', // Infinite moving background
      },
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        }
      }
    },
  },
  plugins: [],
}