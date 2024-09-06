import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-nunito-sans)"],
      },
      colors: {
        white: {
          50: "#FDFDFD",
        },
        gray: {
          50: "#eaeaea",
          100: "#bebebf",
          200: "#9e9ea0",
          300: "#727275",
          400: "#56565a",
          500: "#2c2c31",
          600: "#28282d",
          700: "#1f1f23",
          800: "#18181b",
          900: "#121215",
        },
        green: {
          50: "#e6fbef",
          100: "#b1f1ce",
          200: "#8cebb6",
          300: "#57e295",
          400: "#36dc81",
          500: "#04d361",
          600: "#04c058",
          700: "#039645",
          800: "#027435",
          900: "#025929",
        },
        pink: {
          50: "#fff9fd",
          100: "#ffedf9",
          200: "#ffe4f6",
          300: "#ffd7f2",
          400: "#ffd0ef",
          500: "#ffc4eb",
          600: "#e8b2d6",
          700: "#b58ba7",
          800: "#8c6c81",
          900: "#6b5263",
        },
      },
    },
  },
  plugins: [],
};
export default config;
