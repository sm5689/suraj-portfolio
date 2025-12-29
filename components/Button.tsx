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
    "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20";

  const solid =
    "bg-black text-white hover:bg-black/90 active:bg-black";

  const ghost =
    "border border-black/15 bg-white text-black hover:bg-black/5 active:bg-black/10";

  return (
    <Link
      href={href}
      className={`${base} ${variant === "solid" ? solid : ghost}`}
    >
      {children}
    </Link>
  );
}