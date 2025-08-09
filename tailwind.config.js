/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  safelist: [
    "bg-yellow-100",
    "text-yellow-800",
    "bg-blue-100",
    "text-blue-800",
    "bg-green-100",
    "text-green-800",
    "bg-red-100",
    "text-red-800",
    "bg-rose-50",
    "border-rose-400",
    "bg-gray-50",
    "text-gray-400",
    "bg-white",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3B82F6",
        secondary: "#F472B6",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },
      animation: {
        "bounce-slow": "bounce 4s infinite",
        float: "float 6s ease-in-out infinite",
        "fade-loop": "fade 5s ease-in-out infinite",
        wave: "waveMotion 10s ease-in-out infinite",
        "drift-slow": "drift 60s linear infinite",
        "shooting-star": "shoot 1.5s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        fade: {
          "0%, 100%": { opacity: 0.1 },
          "50%": { opacity: 0.25 },
        },
        waveMotion: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(8px)" },
        },
        drift: {
          "0%": { transform: "translate(0, 0) rotate(0deg)" },
          "100%": { transform: "translate(-2%, -2%) rotate(360deg)" },
        },
        shoot: {
          "0%": { transform: "translate(0, 0)", opacity: "1" },
          "100%": { transform: "translate(300px, 300px)", opacity: "0" },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwind-scrollbar-hide"),
  ],
};
