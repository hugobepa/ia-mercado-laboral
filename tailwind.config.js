/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
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
      fontFamily: {
        heading: ["Manrope", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      borderRadius: {
        "t-xl": "1rem 1rem 0 0",
        "b-lg": "0 0 0.75rem 0.75rem",
      },
      transitionDuration: {
        200: "200ms",
      },
    },
  },
  plugins: [],
};
