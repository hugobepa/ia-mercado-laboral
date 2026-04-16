import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    // Definir spacing completo para incluir valores necesarios
    spacing: {
      "0": "0px",
      "1": "0.25rem",
      "2": "0.5rem",
      "3": "0.75rem",
      "4": "1rem",
      "5": "1.25rem",
      "6": "1.5rem",
      "8": "2rem",
      "10": "2.5rem",
      "12": "3rem",
      "16": "4rem",
      "20": "5rem",
      "24": "6rem",
      "32": "8rem",
      "40": "10rem",
      "48": "12rem",
      "56": "14rem",
      "64": "16rem",
    },
    // Definir boxShadow completo
    boxShadow: {
      sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
      DEFAULT: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
      md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
      lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
      xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
      "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
      none: "none",
    },
    extend: {
      fontFamily: {
        heading: ["Manrope", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      colors: {
        primary: {
          DEFAULT: "#C86405",
          hover: "#A55204",
        },
        secondary: {
          DEFAULT: "#4A7C59",
          hover: "#3A6246",
        },
        neutral: {
          DEFAULT: "#F5F1E6",
          dark: "#E8E1D1",
        },
        text: {
          DEFAULT: "#2C2C2C",
          light: "#5A5A5A",
        },
      },
      borderRadius: {
        "t-xl": "1rem 1rem 0 0",
        "b-lg": "0 0 0.75rem 0.75rem",
      },
      transitionDuration: {
        "200": "200ms",
      },
    },
  },
} satisfies Config;
