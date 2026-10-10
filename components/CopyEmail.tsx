"use client";

import { useEffect, useState } from "react";
import { Check, Copy } from "@/components/Icons";

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(t);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  }

  return (
    <div className="inline-flex max-w-full items-center gap-1 rounded-full border border-line-strong bg-card p-1 pl-5">
      <a href={`mailto:${email}`} className="truncate font-mono text-sm text-fg hover:underline sm:text-base">
        {email}
      </a>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Email copied" : "Copy email address"}
        className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full bg-fg px-3.5 text-sm font-medium text-bg transition-colors hover:bg-fg/85"
      >
        {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
        <span>{copied ? "Copied" : "Copy"}</span>
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? "Email address copied to clipboard" : ""}
      </span>
    </div>
  );
}
