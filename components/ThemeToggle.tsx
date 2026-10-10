"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "@/components/Icons";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  // Icons swap via the `dark:` variant, so the server render is already correct
  // and there's no flash or hydration mismatch.
  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Toggle dark mode"
      title="Toggle dark mode"
      className="inline-flex size-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-card-hover hover:text-fg"
    >
      <Sun className="size-[18px] dark:hidden" />
      <Moon className="hidden size-[18px] dark:block" />
    </button>
  );
}
