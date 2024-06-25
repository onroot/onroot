/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        "app-text-color": "#3B3B3B",
        "app-card-color": "#eff6ff",
        "app-stripe-teal": colors.teal[200],
        "app-stripe-vanilla": "#F5DE98",
        "app-stripe-red": "#F598B1",
      },
      fontFamily: {
        sans: ['"Roboto"', ...defaultTheme.fontFamily.sans],
      },
      inset: {
        "1/6": "16.666667%",
      },
    },
  },
  plugins: [],
};
