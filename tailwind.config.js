/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#8B5CF6',
          dark: '#6D28D9',
        },
        secondary: {
          DEFAULT: '#4F46E5',
          dark: '#3730A3',
        },
        dark: {
          DEFAULT: '#1A1A2E',
          lighter: '#2A2A3E',
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-purple': 'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
} 