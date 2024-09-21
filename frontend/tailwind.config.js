const { nextui } = require("@nextui-org/react");
const withMT = require("@material-tailwind/react/utils/withMT");

/** @type {import('tailwindcss').Config} */
module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}", // Add NextUI's theme files for scanning
  ],
  theme: {
    extend: {
      colors: {
        primary: "#003F62", // Custom primary color
        secondary: "#D4AF37", // Custom secondary color
        background: "#FFFFFF", // Custom background color
      },
      spacing: {
        "spacing-sm": "8px", // Custom small spacing
        "spacing-md": "16px", // Custom medium spacing
        "spacing-lg": "32px", // Custom large spacing
      },
      borderRadius: {
        custom: "12px", // Custom border-radius
      },
      boxShadow: {
        custom: "0 4px 6px rgba(69, 123, 157, 0.5)", // Custom shadow with color #457B9D
      },
    },
  },
  darkMode: "class", // Enable dark mode
  plugins: [
    nextui(), // Add NextUI plugin for Tailwind
  ],
});
