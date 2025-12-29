import Link from "next/link";

export function Button({
  href,
  children,
  variant = "solid",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "ghost";
}) {
  const base =
    "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition focus:outline-none focus-visible:ring-2";

  if (variant === "solid") {
    return (
      <Link
        href={href}
        className={base}
        style={{
          backgroundColor: 'rgb(var(--fg))',
          color: 'rgb(var(--bg))',
        }}
      >
        {children}
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={`${base} border hover:opacity-80`}
      style={{
        borderColor: 'var(--line-color)',
        color: 'rgb(var(--fg))',
        backgroundColor: 'transparent',
      }}
    >
      {children}
    </Link>
  );
}