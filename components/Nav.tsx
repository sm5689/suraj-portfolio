import Link from "next/link";
import { profile } from "@/app/content";

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:px-8">
        <Link href="/" className="text-sm font-semibold tracking-tight">
          {profile.name}
        </Link>
        <nav className="flex items-center gap-3 text-sm text-black/70">
          <a href="#projects" className="hover:text-black">Projects</a>
          <a href="#approach" className="hover:text-black">How I build</a>
          <a href="#experience" className="hover:text-black">Experience</a>
          <a href="#contact" className="hover:text-black">Contact</a>
        </nav>
      </div>
    </header>
  );
}