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
          50: '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          300: '#86EFAC',
          400: '#4ADE80',
          500: '#22C55E',
          600: '#16A34A',
          700: '#15803D',
          800: '#166534',
          900: '#14532D',
        },
        primary: {
          DEFAULT: '#16A34A',
          hover: '#15803D',
          50: '#F0FDF4',
          100: '#DCFCE7',
        },
        dark: {
          DEFAULT: '#1A1A1A',
          100: '#333333',
          200: '#4B5563',
          300: '#6B7280',
          400: '#9CA3AF',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 12px rgba(0,0,0,0.05)',
        'card-hover': '0 8px 24px rgba(0,0,0,0.1)',
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #F8FAF9 0%, #E6F4EC 100%)',
      }
    },
  },
  plugins: [require("daisyui")],
}
