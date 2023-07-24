/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: "var(--font-inter)",
      },
      backgroundImage: {
        home: "linear-gradient(rgba(0,0,0,.7), rgba(0,0,0,.7)), url('../assets/bg-home.jpg')",
      },
      colors:{
        primary: "#1c74bc",
        primary_600: "#107cb8",
        second: "#26abe2",
        text: "#f2faff",
        green_900: "#022B3A",
        gray_400: "#7C7C7A",
        black_600: "#202024",
      }
    },
  },
  plugins: [],
};
