import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui", "SF Pro Display", "SF Pro Text", "Inter", "sans-serif"],
      },
      colors: {
        ink: "#0b0c10",
        paper: "#ffffff",
        bg: "rgb(var(--bg))",
        fg: "rgb(var(--fg))",
        card: "rgb(var(--card))",
        line: "rgb(var(--border))",
        muted: "rgb(var(--muted))",
      },
    },
  },
  plugins: [],
  darkMode: "class",
} satisfies Config;