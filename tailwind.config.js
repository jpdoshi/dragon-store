/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        light: {
          bg: "#fafafa",
          tertiary: "#eeeeee",
          surface: "#ffffff",
        },
        dark: {
          bg: "#121212",
          tertiary: "#212121",
          surface: "#181818",
        },
      },
    },
  },
  plugins: [],
};
