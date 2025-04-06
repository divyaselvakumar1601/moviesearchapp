/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: { extend: {} },
    plugins: [],
  };
  module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {
        screens: {
          'sm': '640px',    // Mobile
          'md': '768px',    // Tablet
          'lg': '1024px',   // Desktop
        },
      },
    },
    plugins: [],
  }