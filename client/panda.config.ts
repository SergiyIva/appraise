import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  preflight: true,
  jsxFramework: "react",
  
  include: ["./src/**/*.{js,jsx,ts,tsx}", "./src/app/**/*.{ts,tsx,js,jsx}"],

  exclude: [],

  theme: {
    extend: {
      tokens: {
        colors: {
          primary: {
            100: { value: "hsl(120,87%,91%)" },
            200: { value: "hsl(120,87%,82%)" },
            300: { value: "hsl(120,78%,72%)" },
            400: { value: "hsl(120,78%,72%)" },
            500: { value: "hsl(120,68%,62%)" },
            600: { value: "hsl(120,69%,41%)" },
            700: { value: "hsl(120,74%,33%)" },
            800: { value: "hsl(120,74%,33%)" },
            900: { value: "hsl(120,85%,21%)" },
          },
          secondary: {
            value: "hsl(300, 30%, 45%)",
          },
          dark: {
            100: { value: "hsl(0,0%,25%)" },
            200: { value: "hsl(0,0%,23%)" },
            300: { value: "hsl(0,0%,21%)" },
            400: { value: "hsl(0,0%,19%)" },
            500: { value: "hsl(0,0%,17%)" },
            600: { value: "hsl(0,0%,15%)" },
            700: { value: "hsl(0,0%,13%)" },
            800: { value: "hsl(0,0%,11%)" },
            900: { value: "hsl(0, 0%, 9%)" },
          },
        },
      },
    },
  },

  globalCss: {
    body: {
      color: "dark",
    },
  },

  outdir: "styled-system",
});
