/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./*.js"
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "surface": "#101415",
        "surface-container": "#1d2022",
        "surface-container-low": "#191c1e",
        "surface-container-high": "#272a2c",
        "surface-container-highest": "#323537",
        "surface-container-lowest": "#0b0f10",
        "on-surface": "#e0e3e5",
        "on-surface-variant": "#c6c6cd",
        "primary": "#bec6e0",
        "primary-container": "#0f172a",
        "secondary": "#ffb77d",
        "secondary-container": "#d97707",
        "on-secondary": "#4d2600",
        "whatsapp": "#25D366"
      }
    },
  },
  plugins: [],
}
