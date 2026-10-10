"use client";

import { useEffect, useState } from "react";
import { navItems, profile } from "@/app/content";
import { OPEN_COMMAND_MENU } from "@/components/CommandMenu";
import { Close, Menu, Search } from "@/components/Icons";
import { ThemeToggle } from "@/components/ThemeToggle";
import { cn } from "@/components/ui";

export function Nav() {
  const [active, setActive] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Highlight whichever section occupies the middle of the viewport.
  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => observer.observe(s));

    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      if (window.scrollY < 200) setActive(null);
      // The last section is too short to reach mid-viewport, so treat the
      // bottom of the page as being on it.
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atBottom) setActive(navItems[navItems.length - 1].id);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    const onResize = () => window.innerWidth >= 768 && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [menuOpen]);

  const openCommandMenu = () => {
    setMenuOpen(false);
    window.dispatchEvent(new Event(OPEN_COMMAND_MENU));
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b transition-colors duration-300",
        scrolled || menuOpen ? "border-line bg-bg/80 backdrop-blur-xl backdrop-saturate-150" : "border-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <a href="#top" className="flex items-center gap-2.5 text-sm font-semibold tracking-tight" aria-label={`${profile.name}, back to top`}>
          <span className="inline-flex size-7 items-center justify-center rounded-lg bg-fg font-mono text-[11px] font-bold text-bg">SM</span>
          <span className="whitespace-nowrap">{profile.name}</span>
        </a>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1 text-sm">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={active === item.id ? "true" : undefined}
                  className={cn(
                    "rounded-full px-3 py-1.5 transition-colors",
                    active === item.id ? "bg-card-hover text-fg" : "text-muted hover:text-fg"
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={openCommandMenu}
            aria-label="Open command menu"
            className="hidden h-9 items-center gap-2 rounded-full border border-line bg-card pr-1.5 pl-3 text-sm text-muted transition-colors hover:border-line-strong hover:text-fg sm:inline-flex"
          >
            <Search className="size-3.5" />
            <span>Search</span>
            <kbd className="rounded-full border border-line px-1.5 font-mono text-[10px] leading-5">⌘K</kbd>
          </button>
          <button
            type="button"
            onClick={openCommandMenu}
            aria-label="Open command menu"
            className="inline-flex size-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-card-hover hover:text-fg sm:hidden"
          >
            <Search className="size-[18px]" />
          </button>
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="inline-flex size-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-card-hover hover:text-fg md:hidden"
          >
            {menuOpen ? <Close className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <nav
        id="mobile-menu"
        aria-label="Mobile"
        hidden={!menuOpen}
        className="border-t border-line md:hidden"
      >
        <ul className="mx-auto max-w-6xl px-5 py-3">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  "flex items-center justify-between rounded-xl px-3 py-3 text-base transition-colors",
                  active === item.id ? "bg-card-hover text-fg" : "text-muted hover:text-fg"
                )}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
