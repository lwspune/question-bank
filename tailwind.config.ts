import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "var(--font-devanagari)", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "var(--font-devanagari)", "ui-serif", "Georgia", "serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        brand: {
          DEFAULT: "hsl(var(--brand))",
          foreground: "hsl(var(--brand-foreground))",
          accent: "hsl(var(--brand-accent))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "pill-in": {
          "0%": { opacity: "0", transform: "translateY(8px) scale(0.92)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        "count-pulse": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.25)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        // The Learn tab's slides (Concept Ladder's slide-in / rise / pop / spark).
        "learn-slide-in": {
          from: { opacity: "0", transform: "translateX(12px)" },
          to: { opacity: "1", transform: "none" },
        },
        "learn-rise": { from: { opacity: "0", transform: "translateY(8px)" } },
        "learn-pop": { from: { opacity: "0", transform: "scale(0.5)" } },
        "learn-spark": {
          from: { opacity: "0", transform: "scale(0.2) translateY(10px)" },
          "40%": { opacity: "1" },
          to: { opacity: "0", transform: "scale(1) translateY(-24px)" },
        },
      },
      animation: {
        "pill-in": "pill-in 220ms ease-out",
        "count-pulse": "count-pulse 320ms ease-out",
        "fade-in-up": "fade-in-up 360ms ease-out both",
        "learn-slide-in": "learn-slide-in 0.25s ease-out",
        "learn-rise": "learn-rise 0.35s ease-out both",
        "learn-pop": "learn-pop 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) both",
        "learn-spark": "learn-spark 0.9s ease-out both",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
