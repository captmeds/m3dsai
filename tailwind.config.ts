import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "rgb(var(--bg-primary) / <alpha-value>)",
          secondary: "rgb(var(--bg-secondary) / <alpha-value>)",
          card: "rgb(var(--bg-card) / <alpha-value>)",
          ink: "rgb(var(--bg-ink) / <alpha-value>)",
          "ink-2": "rgb(var(--bg-ink-2) / <alpha-value>)",
          "ink-3": "rgb(var(--bg-ink-3) / <alpha-value>)",
        },
        accent: {
          primary: "rgb(var(--accent-primary) / <alpha-value>)",
          secondary: "rgb(var(--accent-secondary) / <alpha-value>)",
          bright: "rgb(var(--accent-bright) / <alpha-value>)",
          hover: "rgb(var(--accent-hover) / <alpha-value>)",
          on: "rgb(var(--on-accent) / <alpha-value>)",
          glow: "var(--accent-glow)",
          warm: "var(--accent-warm)",
        },
        text: {
          primary: "rgb(var(--text-primary) / <alpha-value>)",
          secondary: "rgb(var(--text-secondary) / <alpha-value>)",
          muted: "rgb(var(--text-muted) / <alpha-value>)",
          "on-ink": "rgb(var(--text-on-ink) / <alpha-value>)",
          "on-ink-muted": "rgb(var(--text-on-ink-muted) / <alpha-value>)",
        },
        border: {
          DEFAULT: "var(--border)",
          accent: "var(--border-accent)",
          ink: "var(--border-ink)",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Inter", "Arial", "sans-serif"],
        body: ["var(--font-body)", "Inter", "Arial", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
      },
      backgroundImage: {
        "gradient-hero": "var(--gradient-hero)",
      },
      animation: {
        "glow-pulse": "glow-pulse 2s ease-in-out infinite alternate",
        "float": "float 6s ease-in-out infinite",
        "marquee": "marquee 25s linear infinite",
      },
      keyframes: {
        "glow-pulse": {
          "0%": { boxShadow: "0 0 20px rgba(232,132,90,0.16)" },
          "100%": { boxShadow: "0 0 44px rgba(232,132,90,0.32)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
