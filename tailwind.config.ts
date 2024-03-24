import type { Config } from "tailwindcss";
const colors = require("tailwindcss/colors");

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        light: "#e6e9ef",
        dark: "#0c0f13",
        primary: "#c084fc",
        secondary: "#818cf8",
        accent: "#fbbf24",
      },
    },
  },
  plugins: [],
};
export default config;
