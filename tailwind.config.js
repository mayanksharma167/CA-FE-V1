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
        scroll: "scroll 20s linear infinite",
        // You might want to preserve the bounce-slow animation from your Banner as well
        "bounce-slow": "bounce 3s infinite",
      },
      keyframes: {
        scroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        // Adding bounce keyframes to match your animate-bounce-slow class
        bounce: {
          "0%, 100%": {
            transform: "translateY(0)",
          },
          "50%": {
            transform: "translateY(-0.5rem)",
          },
        },
      },
    },
  },
  plugins: [],
};
