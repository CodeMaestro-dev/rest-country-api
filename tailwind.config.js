/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/index.html", "./public/js/script.js", "./public/more-details.html", "./public/js/more-details.js"],
  theme: {
    extend: {
      colors: {
        "dark-blue": "#2b3945",
        "dmbg-very-dark-blue": "#202c37",
        "lmt-very-dark-blue": "#111517",
        "lmt-input-text": "#858585",
        "lmbg-very-light-gray": "#fafafa",
      },
    },
  },
  plugins: [],
};
