import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        dragDropBackground:"url('/image-background.jpg')",
      }

    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [ {
     black: {
        ...require("daisyui/src/theming/themes")["black"],
      },
    },],
  },
};
export default config;
