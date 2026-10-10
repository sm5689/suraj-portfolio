import type { Project } from "@/app/content";
import type { RepoLinks } from "@/lib/github";
import { ArrowUpRight, GitHub, Star } from "@/components/Icons";

export function ProjectCard({ project, links }: { project: Project; links: RepoLinks }) {
  const stars = links.meta?.stars ?? 0;

  return (
    <article className="reveal flex h-full flex-col rounded-2xl border border-line bg-card p-6 transition-colors duration-200 hover:border-line-strong hover:bg-card-hover">
      <div className="flex items-center justify-between gap-3 font-mono text-xs text-muted">
        <span>{project.year}</span>
        {stars > 0 ? (
          <span className="inline-flex items-center gap-1" aria-label={`${stars} GitHub ${stars === 1 ? "star" : "stars"}`}>
            <Star className="size-3.5" /> {stars}
          </span>
        ) : null}
      </div>

      <h3 className="mt-3 text-lg font-semibold tracking-tight">{project.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-pretty text-muted">{project.summary}</p>

      <ul aria-label="Tech stack" className="mt-5 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11px] text-muted">
        {project.tags.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>

      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line pt-4 text-sm">
        {links.repoUrl ? (
          <a
            href={links.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} source code on GitHub`}
            className="inline-flex items-center gap-1.5 font-medium text-fg transition-opacity hover:opacity-70"
          >
            <GitHub className="size-4" /> Code
          </a>
        ) : null}
        {links.liveUrl ? (
          <a
            href={links.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} live demo`}
            className="inline-flex items-center gap-1 font-medium text-fg transition-opacity hover:opacity-70"
          >
            Live demo <ArrowUpRight className="size-3.5" />
          </a>
        ) : null}
        {project.note ? <span className="text-xs text-muted">{project.note}</span> : null}
      </div>
    </article>
  );
}
