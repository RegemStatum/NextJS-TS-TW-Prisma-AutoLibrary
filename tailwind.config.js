/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "0.25rem",
    },
    extend: {
      keyframes: {
        slideFromRight: {
          "0%": { transform: "translateX(110%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      animation: {
        slideFromRight: "slideFromRight 70ms ease-out",
      },
    },
  },
  plugins: [],
};
