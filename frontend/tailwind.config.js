/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",

    // Path to the Tremor module
    "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
