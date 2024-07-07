/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        "xs": "450px"
      },
      colors: {
        primary: "#282829",
        secondary: "#0b5ed7"
      }
    },
  },
  plugins: [],
}