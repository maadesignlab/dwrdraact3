/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],

  theme: {
    extend: {
      /* =====================
         🎨 COLORES SEMÁNTICOS
         ===================== */
      colors: {
        brand: {
          primary: "#fdf001",
          secondary: "#FFBABA",
        },
        bg: {
          surface: "#1a1a1a",
          fill: "#333333",
          surface_dark: "#0d0d0d",
          fill_dark: "#1a1a1a",
        },
        text: {
          primary: "#ffffff",
          secondary: "#cccccc",
          accent: "#fdf001",
        },
        state: {
          success: "#4CAF50",
          error: "#F44336",
          warning: "#FF9800",
          info: "#2196F3",
        },
      },

      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },

      boxShadow: {
        soft: "0 4px 12px rgba(0,0,0,0.08)",
        card: "0 8px 24px rgba(0,0,0,0.12)",
        float: "0 12px 40px rgba(0,0,0,0.18)",
        inset: "inset 0 1px 2px rgba(0,0,0,0.1)",
      },

      zIndex: {
        header: "50",
        overlay: "90",
        modal: "100",
      },

      /* =====================
         🎞️ ANIMACIONES (para texto dinámico)
         ===================== */
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        moveInLeft: {
          "0%": {
            opacity: "0",
            transform: "translateX(-30px) scale(0.8)",
          },
          "50%": {
            opacity: "0",
            transform: "translateX(-15px) scale(0.96)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0) scale(1)",
          },
        },
      },

      animation: {
        "fade-up": "fadeUp 700ms ease-out both",
        "move-in-left": "moveInLeft 500ms ease-out both",
      },

      /* =====================
         ⏱️ TRANSITION DELAYS (SCROLL STAGGER)
         ===================== */
      transitionDelay: {
        0: "0ms",
        1: "180ms",
        2: "360ms",
        3: "540ms",
        4: "720ms",
      },
    },
  },

  /* =====================
     🔌 PLUGINS
     ===================== */
  plugins: [
    function ({ addUtilities, theme }) {
      const delays = theme("transitionDelay");

      const utilities = Object.entries(delays).map(([key, value]) => ({
        [`.stagger-${key}`]: {
          transitionDelay: value,
        },
      }));

      addUtilities(utilities);

      addUtilities ({
        ".animdelay-0": { animationDelay: "0ms" },
        ".animdelay-1": { animationDelay: "180ms" },
        ".animdelay-2": { animationDelay: "360ms" },
        ".animdelay-3": { animationDelay: "540ms" },
      });
    },
  ],
};







