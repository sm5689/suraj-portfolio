"use client";

import * as React from "react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="h-7 w-[64px] rounded-full border border-zinc-300 bg-white" />
    );
  }

  const current = theme === "system" ? systemTheme : theme;
  const isDark = current === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
      className={[
        "relative h-7 w-[64px] rounded-full",
        "border border-zinc-300 dark:border-white/20",
        "bg-white dark:bg-zinc-900",
        "shadow-sm",
        "transition-colors duration-300",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:focus-visible:ring-white/20",
      ].join(" ")}
    >
      {/* Track sheen */}
      <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-b from-white/65 to-transparent dark:from-white/10" />

      {/* Brighter colored icons */}
      <span className="pointer-events-none absolute inset-0 flex items-center justify-between px-2 text-[12px]">
        {/* Sun */}
        <span
          className={[
            "transition-opacity duration-300",
            "text-amber-400",
            "drop-shadow-[0_0_2px_rgba(251,191,36,0.6)]",
            isDark ? "opacity-40" : "opacity-100",
          ].join(" ")}
        >
          ☀
        </span>

        {/* Moon */}
        <span
          className={[
            "transition-opacity duration-300",
            "text-sky-300",
            "drop-shadow-[0_0_2px_rgba(125,211,252,0.6)]",
            isDark ? "opacity-100" : "opacity-40",
          ].join(" ")}
        >
          ☾
        </span>
      </span>

      {/* Knob */}
      <span
        className={[
          "absolute top-1/2 -translate-y-1/2",
          "h-[20px] w-[28px] rounded-full",
          "border border-zinc-300 dark:border-black/0",
          "bg-white dark:bg-white",
          "shadow-md",
          "transition-all duration-300 ease-out",
          isDark ? "left-[34px]" : "left-[4px]",
        ].join(" ")}
      >
        <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-b from-white/95 to-white/50" />
      </span>
    </button>
  );
}