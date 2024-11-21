import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [ {
      luxury: {
        ...require("daisyui/src/theming/themes")["luxury"],
        "base-content": "#ebcc1b", // Override base-content color
      },
    },],
  },
};
export default config;
