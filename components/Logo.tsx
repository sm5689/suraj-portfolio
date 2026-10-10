"use client";

import { useState } from "react";
import { cn } from "@/components/ui";

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter((w) => /^[A-Za-z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join("");
}

/**
 * Company or school mark on a white tile, so dark logos stay legible in dark
 * mode. Falls back to initials when there's no logo or it fails to load.
 */
export function Logo({ src, name, className }: { src?: string; name: string; className?: string }) {
  const [failed, setFailed] = useState(false);
  const showImage = src && !failed;

  return (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center overflow-hidden rounded-xl border border-line",
        showImage ? "bg-white p-1.5" : "bg-card-hover",
        className
      )}
    >
      {showImage ? (
        // Plain <img>: tiny third-party marks with an error fallback.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt=""
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onError={() => setFailed(true)}
          // Catches images that failed before hydration attached onError.
          ref={(img) => {
            if (img?.complete && img.naturalWidth === 0) setFailed(true);
          }}
          className="size-full object-contain"
        />
      ) : (
        <span aria-hidden="true" className="font-mono text-xs font-semibold text-muted">
          {initials(name)}
        </span>
      )}
    </span>
  );
}
