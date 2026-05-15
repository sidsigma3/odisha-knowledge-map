/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        topic: {
          rivers: "#3b82f6",
          soils: "#a16207",
          districts: "#10b981",
          temples: "#f59e0b",
          wildlife: "#16a34a",
          tourist: "#ec4899",
        },
      },
    },
  },
  plugins: [],
};
