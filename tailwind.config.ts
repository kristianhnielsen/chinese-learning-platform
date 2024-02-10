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
        light: "#f1f1f1",
        dark: "#062015",
        primary: "#93eac7",
        secondary: "#911c51",
        accent: "#d99339",
      },
    },
  },
  plugins: [],
};
export default config;
