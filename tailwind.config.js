/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inherit: "inherit",
      },
    },
    width: {
      custom: "calc(100% - (0.25rem + 48px))",
    },
  },
  plugins: [],
};
