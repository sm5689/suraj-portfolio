import Link from "next/link";

type Project = {
  name: string;
  display_name?: string;
  display_description?: string;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
};

export function ProjectCard({ repo }: { repo: Project }) {
  const updated = new Date(repo.updated_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
  });

  return (
    <div className="group rounded-2xl border border-line bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)] dark:bg-white/5 dark:hover:shadow-[0_10px_30px_rgba(255,255,255,0.03)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold tracking-tight text-fg">
            {repo.display_name ?? repo.name}
          </h3>
          <p className="mt-1 text-sm text-muted">
            {repo.display_description ?? "No description yet."}
          </p>
        </div>
        <span className="shrink-0 rounded-full border border-line px-2 py-1 text-xs text-muted">
          {repo.language ?? "-"}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-muted">
        <span className="rounded-full border border-line px-2 py-1">★ {repo.stargazers_count}</span>
        <span className="rounded-full border border-line px-2 py-1">⑂ {repo.forks_count}</span>
        <span className="rounded-full border border-line px-2 py-1">Updated {updated}</span>
      </div>

      <div className="mt-4 flex gap-3 text-sm">
        <Link className="text-fg underline-offset-4 hover:underline" href={repo.html_url}>
          GitHub
        </Link>
        {repo.homepage ? (
          <Link className="text-fg underline-offset-4 hover:underline" href={repo.homepage}>
            Live
          </Link>
        ) : null}
      </div>
    </div>
  );
}