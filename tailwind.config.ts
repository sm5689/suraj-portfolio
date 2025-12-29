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
        line: "rgba(0,0,0,0.10)",
      },
    },
  },
  plugins: [],
} satisfies Config;