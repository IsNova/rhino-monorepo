/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "../../shared/**/*.{js,ts,jsx,tsx,mdx}", // Include shared components
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4CAF50",
        secondary: "#8BC34A",
      },
    },
  },
  plugins: [],
};
