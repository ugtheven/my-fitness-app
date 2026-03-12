/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#0d0d0d',
          paper: '#1a1a1a',
        },
        text: {
          DEFAULT: '#ffffff',
          muted: '#6b6b6b',
        },
        accent: {
          DEFAULT: '#22c55e',
          danger: '#eb4343',
        },
        success: '#22c55e',
        warning: '#fa7c22',
      },
    },
  },
  plugins: [],
};
