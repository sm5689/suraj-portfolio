import Link from "next/link";
import { profile } from "@/app/content";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:px-8">
        <Link href="/" className="text-sm font-semibold tracking-tight">
          {profile.name}
        </Link>

        <div className="flex items-center gap-6">
          <nav className="flex items-center gap-4 text-sm text-muted">
            <a href="#projects" className="hover:text-fg transition-colors">
              Projects
            </a>
            <a href="#approach" className="hover:text-fg transition-colors">
              How I build
            </a>
            <a href="#experience" className="hover:text-fg transition-colors">
              Experience
            </a>
            <a href="#contact" className="hover:text-fg transition-colors">
              Contact
            </a>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}