// tailwind.config.js
module.exports = {
  content: [
    "./app/**/*.{js,ts,tsx}",
    "./components/**/*.{js,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        teenPrimary: "#00b4d8",
        teenAccent: "#ff6b6b"
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};
