"use client";

import { useLayoutEffect } from "react";

const STAGGER_MS = 80;
const MAX_STAGGER_STEPS = 5;

/**
 * Plays a one-time fade-and-rise on every `.reveal` element as it scrolls
 * into view (styles in globals.css). Elements only start hidden once this
 * runs, so content stays visible without JavaScript or with reduced motion.
 */
export function RevealObserver() {
  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Stagger elements that enter together (e.g. a row of cards), top-left first.
        const entering = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top || a.boundingClientRect.left - b.boundingClientRect.left);

        entering.forEach((entry, i) => {
          const el = entry.target as HTMLElement;
          el.style.setProperty("--reveal-delay", `${Math.min(i, MAX_STAGGER_STEPS) * STAGGER_MS}ms`);
          el.dataset.revealed = "animate";
          observer.unobserve(el);
        });
      },
      { rootMargin: "0px 0px -8% 0px" }
    );

    // Runs before first paint: anything already on screen is shown as-is so it
    // never flickers; everything below the fold waits for its turn.
    document.documentElement.classList.add("js-reveal");
    for (const el of document.querySelectorAll<HTMLElement>(".reveal")) {
      const rect = el.getBoundingClientRect();
      const rendered = rect.width > 0 || rect.height > 0; // false inside a closed <details>
      if (rendered && rect.top < window.innerHeight) el.dataset.revealed = "instant";
      else observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  return null;
}
