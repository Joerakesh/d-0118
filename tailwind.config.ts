
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: "#9b87f5", // Main brand color
          light: "#D6BCFA", // Lighter variant 
          dark: "#7E69AB", // Darker variant
        },
        dark: {
          DEFAULT: "#1A1F2C", // Dark background
          light: "#403E43", // Slightly lighter dark
        },
        neutral: {
          DEFAULT: "#8E9196", // Neutral text color
          light: "#C8C8C9", // Light gray
        }
      },
      fontFamily: {
        sans: ["Inter var", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
