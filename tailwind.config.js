/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      keyframes: {
        fadeUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(24px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        "fade-up": "fadeUp 700ms ease-out both",
      },
      transitionDelay: {
        0: "0ms",
        1: "120ms",
        2: "240ms",
        3: "360ms",
        4: "480ms",
      },
    },
  },
  plugins: [],
};





