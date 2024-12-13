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
     black: {
        ...require("daisyui/src/theming/themes")["black"],
        "secondary-content": "#ebcc1b", // Override base-content color
      },
    },],
  },
};
export default config;
