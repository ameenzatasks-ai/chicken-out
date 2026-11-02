import type { Config } from "tailwindcss";

/**
 * Chicken Out tokens.
 *   Colors are measured from the supplied logo (Images/Chicken Out.png):
 *   field red #E80404, wordmark yellow #FCC810, polaroid off-white #FFF6E6.
 *   Type: Anton (display, condensed like the reference template's hero),
 *   Yellowtail (retro script, as on the brand's Instagram creatives),
 *   Barlow (body/UI).
 */
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      inherit: "inherit",
      black: "#000000",
      white: "#ffffff",

      // brand/accent are CSS variables so spicy mode can retint the page
      // (values + transition in globals.css). Opacity modifiers like
      // bg-brand/50 don't work on them — use explicit colors for that.
      brand: {
        DEFAULT: "var(--brand)",
        dark: "var(--brand-dark)",
      },
      accent: {
        DEFAULT: "var(--accent)",
      },
      ink: {
        DEFAULT: "#140C0A",
        soft: "#3A302C",
        muted: "#6B605B",
      },
      cream: {
        DEFAULT: "#FFF6E6",
        deep: "#F6E7CB",
      },
      paper: {
        DEFAULT: "#FFFFFF",
        line: "#EADFCF",
      },
    },

    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },

    extend: {
      fontFamily: {
        display: ["var(--font-display)", "var(--font-bengali)", "Impact", "sans-serif"],
        script: ["var(--font-script)", "cursive"],
        sans: ["var(--font-body)", "var(--font-bengali)", "ui-sans-serif", "sans-serif"],
      },

      fontSize: {
        hero: ["clamp(3.4rem, 8.4vw, 8rem)", { lineHeight: "0.9", letterSpacing: "0.005em" }],
        h2: ["clamp(2.6rem, 5.2vw, 4.25rem)", { lineHeight: "0.95", letterSpacing: "0.01em" }],
        h3: ["clamp(1.9rem, 3vw, 2.6rem)", { lineHeight: "1", letterSpacing: "0.01em" }],
        h4: ["1.6rem", { lineHeight: "1.05", letterSpacing: "0.015em" }],
        script: ["clamp(1.75rem, 2.8vw, 2.4rem)", { lineHeight: "1" }],
        lead: ["1.1875rem", { lineHeight: "1.6" }],
        body: ["1.0625rem", { lineHeight: "1.65" }],
        small: ["0.9375rem", { lineHeight: "1.55" }],
        label: ["0.8125rem", { lineHeight: "1.2", letterSpacing: "0.12em" }],
      },

      maxWidth: {
        container: "1200px",
      },

      boxShadow: {
        // Hard offset shadow, same move as the logo's black extrusion.
        stamp: "4px 4px 0 0 #140C0A",
        "stamp-lg": "8px 8px 0 0 #140C0A",
        photo: "0 18px 40px -12px rgba(20,12,10,.45)",
      },

      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        bob: {
          "0%,100%": { transform: "translateY(0) rotate(var(--r,0deg))" },
          "50%": { transform: "translateY(-10px) rotate(var(--r,0deg))" },
        },
        ember: {
          "0%": { transform: "translate3d(0,0,0) scale(1)", opacity: "0" },
          "15%": { opacity: "1" },
          "100%": { transform: "translate3d(var(--dx,0px),-480px,0) scale(.3)", opacity: "0" },
        },
        progress: {
          from: { transform: "scaleX(0)" },
          to: { transform: "scaleX(1)" },
        },
      },
      animation: {
        marquee: "marquee 38s linear infinite",
        bob: "bob 5s ease-in-out infinite",
        ember: "ember var(--dur,3.6s) ease-out infinite",
        // Matches the hero's INTERVAL_MS.
        progress: "progress 6s linear forwards",
      },
    },
  },
  plugins: [],
};

export default config;
