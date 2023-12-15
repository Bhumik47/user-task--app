/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "mainBackgroundColor": '#D9D9D9',
        "columnBackgroundColor": '#757575',
        "addButtonbg":'#F4F4F4'
      }
    },
  },
  plugins: [],
}

