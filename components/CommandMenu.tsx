"use client";

import { useTheme } from "next-themes";
import { Fragment, useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { ArrowUpRight, Copy, FileText, GitHub, Hash, LinkedIn, Mail, Moon, Search } from "@/components/Icons";
import { navItems, profile } from "@/app/content";
import { cn } from "@/components/ui";

export const OPEN_COMMAND_MENU = "open-command-menu";

type Command = {
  id: string;
  group: "Navigate" | "Actions" | "Links";
  label: string;
  keywords?: string;
  icon: ReactNode;
  /** Return a message to show briefly before closing (e.g. "Copied"). */
  perform: () => void | string | Promise<void | string>;
};

function scrollToSection(id: string) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.getElementById(id)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  history.replaceState(null, "", `#${id}`);
}

export function CommandMenu({ projectLinks }: { projectLinks: { label: string; href: string }[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [status, setStatus] = useState("");
  const { resolvedTheme, setTheme } = useTheme();

  const commands = useMemo<Command[]>(
    () => [
      ...navItems.map((item) => ({
        id: `nav-${item.id}`,
        group: "Navigate" as const,
        label: item.label,
        keywords: "go section jump",
        icon: <Hash />,
        perform: () => scrollToSection(item.id),
      })),
      {
        id: "copy-email",
        group: "Actions",
        label: "Copy email address",
        keywords: "contact mail clipboard",
        icon: <Copy />,
        perform: async () => {
          await navigator.clipboard.writeText(profile.email);
          return "Email copied to clipboard";
        },
      },
      {
        id: "email",
        group: "Actions",
        label: "Send an email",
        keywords: "contact mail",
        icon: <Mail />,
        perform: () => {
          window.location.href = `mailto:${profile.email}`;
        },
      },
      {
        id: "resume",
        group: "Actions",
        label: "Open résumé (PDF)",
        keywords: "resume cv pdf download",
        icon: <FileText />,
        perform: () => {
          window.open(profile.links.resume, "_blank", "noopener");
        },
      },
      {
        id: "theme",
        group: "Actions",
        label: "Toggle dark mode",
        keywords: "theme dark light appearance",
        icon: <Moon />,
        perform: () => setTheme(resolvedTheme === "dark" ? "light" : "dark"),
      },
      {
        id: "github",
        group: "Links",
        label: "GitHub profile",
        keywords: "code repos",
        icon: <GitHub />,
        perform: () => {
          window.open(profile.links.github, "_blank", "noopener");
        },
      },
      {
        id: "linkedin",
        group: "Links",
        label: "LinkedIn",
        keywords: "social connect",
        icon: <LinkedIn />,
        perform: () => {
          window.open(profile.links.linkedin, "_blank", "noopener");
        },
      },
      ...projectLinks.map((p) => ({
        id: `project-${p.href}`,
        group: "Links" as const,
        label: p.label,
        keywords: "project repo code",
        icon: <ArrowUpRight />,
        perform: () => {
          window.open(p.href, "_blank", "noopener");
        },
      })),
    ],
    [projectLinks, resolvedTheme, setTheme]
  );

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) => `${c.label} ${c.group} ${c.keywords ?? ""}`.toLowerCase().includes(q));
  }, [commands, query]);

  const open = useCallback(() => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    setQuery("");
    setActive(0);
    setStatus("");
    dialog.showModal();
    inputRef.current?.focus();
  }, []);

  const close = useCallback(() => dialogRef.current?.close(), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (dialogRef.current?.open) close();
        else open();
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_COMMAND_MENU, open);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_COMMAND_MENU, open);
    };
  }, [open, close]);

  useEffect(() => {
    document.getElementById(`cmd-${active}`)?.scrollIntoView({ block: "nearest" });
  }, [active]);

  async function run(command: Command | undefined) {
    if (!command) return;
    try {
      const message = await command.perform();
      if (message) {
        setStatus(message);
        setTimeout(close, 700);
        return;
      }
    } catch {
      setStatus("Something went wrong. Please try again.");
      return;
    }
    close();
  }

  function onOptionClick(e: React.MouseEvent<HTMLLIElement>) {
    run(results[Number(e.currentTarget.dataset.index)]);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (results.length ? (i + 1) % results.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (results.length ? (i - 1 + results.length) % results.length : 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      run(results[active]);
    }
  }

  return (
    <dialog
      ref={dialogRef}
      aria-label="Command menu"
      onClick={(e) => {
        if (e.target === dialogRef.current) close();
      }}
      className="m-auto mt-[12vh] w-[min(36rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-line-strong bg-card p-0 text-fg shadow-2xl backdrop:bg-black/40 backdrop:backdrop-blur-sm"
    >
      <div className="flex items-center gap-3 border-b border-line px-4">
        <Search className="size-4 shrink-0 text-muted" />
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(0);
          }}
          onKeyDown={onKeyDown}
          placeholder="Type a command or search…"
          role="combobox"
          aria-expanded="true"
          aria-controls="cmd-list"
          aria-activedescendant={results[active] ? `cmd-${active}` : undefined}
          aria-autocomplete="list"
          autoComplete="off"
          spellCheck={false}
          className="h-14 w-full bg-transparent text-[15px] outline-none placeholder:text-subtle"
        />
        <kbd className="hidden rounded border border-line px-1.5 py-0.5 font-mono text-[11px] text-muted sm:block">esc</kbd>
      </div>

      <ul id="cmd-list" role="listbox" aria-label="Commands" className="max-h-[min(60vh,24rem)] overflow-y-auto p-2">
        {results.length === 0 ? (
          <li className="px-3 py-10 text-center text-sm text-muted">No results for “{query}”</li>
        ) : (
          results.map((command, i) => (
            <Fragment key={command.id}>
              {i === 0 || results[i - 1].group !== command.group ? (
                <li role="presentation" className="px-3 pt-3 pb-1.5 font-mono text-[11px] tracking-wide text-subtle uppercase">
                  {command.group}
                </li>
              ) : null}
              <li
                id={`cmd-${i}`}
                role="option"
                aria-selected={i === active}
                onMouseMove={() => setActive(i)}
                data-index={i}
                onClick={onOptionClick}
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm [&>svg]:size-4 [&>svg]:shrink-0",
                  i === active ? "bg-card-hover text-fg" : "text-muted"
                )}
              >
                {command.icon}
                <span className="truncate">{command.label}</span>
              </li>
            </Fragment>
          ))
        )}
      </ul>

      <div className="flex items-center justify-between border-t border-line px-4 py-2.5 font-mono text-[11px] text-subtle">
        <span aria-live="polite" className={status ? "text-accent" : undefined}>
          {status || "↑↓ to move · ↵ to select"}
        </span>
        <span className="hidden sm:inline">⌘K to toggle</span>
      </div>
    </dialog>
  );
}
