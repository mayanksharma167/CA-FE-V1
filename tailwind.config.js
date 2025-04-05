/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#141414",
        green: "#228B22",
        creamWhite: "#FAF9F6",
      },
      animation: {
        scroll: "scroll 30s linear infinite",
        "bounce-slow": "bounce 3s infinite",
        bgSpinScale: "bgSpinScale 45s linear infinite", // 🔥 added animation
      },
      keyframes: {
        scroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        bounce: {
          "0%, 100%": {
            transform: "translateY(0)",
          },
          "50%": {
            transform: "translateY(-0.5rem)",
          },
        },
        bgSpinScale: {
          "0%": { transform: "scale(1) rotate(0deg)" },
          "50%": { transform: "scale(3) rotate(60deg)" },
          "100%": { transform: "scale(2) rotate(360deg)" },
        },
      },
    },
  },
  plugins: [],
};
