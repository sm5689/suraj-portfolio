import type { ComponentPropsWithoutRef, ReactNode } from "react";

export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-6xl px-5 sm:px-8", className)}>{children}</div>;
}

/** Fades content in once as it scrolls into view (see RevealObserver). */
export function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("reveal", className)}>{children}</div>;
}

export function Section({
  id,
  index,
  eyebrow,
  title,
  description,
  children,
}: {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="border-t border-line">
      <Container className="py-20 sm:py-28">
        <Reveal>
          <p className="font-mono text-xs tracking-wide text-muted uppercase">
            <span className="text-accent">{index}</span>
            <span className="mx-2 text-subtle">/</span>
            {eyebrow}
          </p>
          <h2 id={`${id}-title`} className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            {title}
          </h2>
          {description ? <p className="mt-3 max-w-2xl text-pretty text-muted">{description}</p> : null}
        </Reveal>
        <div className="mt-12">{children}</div>
      </Container>
    </section>
  );
}

export function Chip({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-line bg-card px-2.5 py-0.5 text-xs text-muted",
        className
      )}
    >
      {children}
    </span>
  );
}

type ButtonProps = ComponentPropsWithoutRef<"a"> & {
  variant?: "solid" | "ghost";
  icon?: ReactNode;
};

/** Anchor styled as a button. External links open in a new tab safely. */
export function Button({ variant = "solid", icon, className, children, href = "#", ...props }: ButtonProps) {
  const external = /^https?:\/\//.test(href) || href.endsWith(".pdf");
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "group inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-medium transition-[background-color,border-color,transform] duration-200 active:scale-[0.98]",
        variant === "solid"
          ? "bg-fg text-bg hover:bg-fg/85"
          : "border border-line-strong bg-card text-fg hover:border-fg/30 hover:bg-card-hover",
        className
      )}
      {...props}
    >
      {children}
      {icon}
    </a>
  );
}

export function IconLink({ href, label, children }: { href: string; label: string; children: ReactNode }) {
  const external = /^https?:\/\//.test(href);
  return (
    <a
      href={href}
      aria-label={label}
      title={label}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="inline-flex size-11 items-center justify-center rounded-full border border-line-strong bg-card text-lg text-muted transition-colors hover:border-fg/30 hover:text-fg"
    >
      {children}
    </a>
  );
}

export function TextLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-1 text-sm font-medium text-fg underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-fg",
        className
      )}
    >
      {children}
    </a>
  );
}
