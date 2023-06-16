/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      colors: {
        "transparent": 'transparent',
        "brand-black": "#151515",
        "brand-white": "#FFFFFF",
        "brand-gray": "#7E7E7E",
        "brand-light-gray": "#E0E0E0",
      },
      fontFamily: {
        'sans': ["Basier Square", "sans-serif"],
        'Caros': ["Caros", "sans-serif"]
      },
      container: {
        padding: "2rem",
        center: true,
      },
      screens: {
        sm: "640px",
        md: "768px"
      }
    },
  },
  plugins: [],
};
