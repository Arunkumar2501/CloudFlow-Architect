/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'aws-blue': '#232F3E',
        'aws-orange': '#FF9900',
        'aws-green': '#146EB4',
      },
    },
  },
  plugins: [],
}

