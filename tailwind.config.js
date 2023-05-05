/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        "3e4396": "#3e4396",
      },
      animation: {
        "bounce-slow": "bounce 0.5s linear",
      },
    },
  },
  plugins: [],
};
