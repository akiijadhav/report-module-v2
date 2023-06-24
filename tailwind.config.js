/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.ts',
    './pages/**/*.tsx', // Match all .tsx files in the pages folder and its subdirectories
    './components/**/*.tsx', // Match all .tsx files in the components folder and its subdirectories
  ],
  theme: {
    extend: {
      colors: {
        blue: { disabled: '#9ACEE9' },
        'light-blue': { 50: '#F0F9FF', 100: '#E0F2FE', 600: '#0284C7' },
      },
    },
  },
  plugins: [],
}

