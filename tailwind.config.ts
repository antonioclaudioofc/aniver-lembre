import type { Config } from "tailwindcss";
const colors = require("tailwindcss/colors");

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    colors: {
      black: colors.black,
      white: colors.white,
      transparent: colors.transparent,
      gray: {
        50: "#F9FAFB",
        100: "#F3F4F6",
        200: "#E5E7EB",
        300: "#D1D5DB",
        400: "#9CA3AF",
        500: "#6B7280",
        600: "#4B5563",
        700: "#374151",
        800: "#1F2937",
        900: "#111827",
      },
      violet: {
        50: "#ededf3",
        100: "#e5e3ed",
        200: "#c8c6da",
        300: "#4f4789",
        400: "#47407b",
        500: "#3f396e",
        600: "#3b3567",
        700: "#2f2b52",
        800: "#24203e",
        900: "#1c1930",
      },
      yellow: {
        50: "#fffdef",
        100: "#fffbe7",
        200: "#fef8ce",
        300: "#fce762",
        400: "#e3d058",
        500: "#cab94e",
        600: "#bdad4a",
        700: "#978b3b",
        800: "#71682c",
        900: "#585122",
      },
      orange: {
        50: "#fff7f2",
        100: "#fff3eb",
        200: "#ffe7d6",
        300: "#ffb17a",
        400: "#e69f6e",
        500: "#cc8e62",
        600: "#bf855c",
        700: "#996a49",
        800: "#735037",
        900: "#593e2b",
      },
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
