"use client";

import { useMemo, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { ProjectCard } from "@/components/ProjectCard";

type Repo = {
  name: string;
  html_url: string;
  description: string | null;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;

  display_name?: string;
  display_description?: string;
  tags?: string[];
};

export function AllRepos({
  repos,
  featuredRepoNames,
}: {
  repos: Repo[];
  featuredRepoNames: string[];
}) {
  const [open, setOpen] = useState(false);

  const filtered = useMemo(() => {
    const featured = new Set(featuredRepoNames.map((n) => n.toLowerCase()));
    return repos.filter((r) => !featured.has(r.name.toLowerCase()));
  }, [repos, featuredRepoNames]);

  return (
    <div className="relative mt-6">
      {/* Bottom-right arrow control */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="group inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm text-black/70 transition hover:bg-black/[0.03]"
        >
          <span>{open ? "Hide repositories" : "More repositories"}</span>
          <span className="transition group-hover:translate-x-0.5">
            {open ? "↘" : "↗"}
          </span>
        </button>
      </div>

      {/* Hidden by default */}
      {open ? (
        <div className="mt-6">
          <Reveal>
            <h3 className="text-lg font-semibold tracking-tight">
              Other repositories
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-black/65">
              Full GitHub activity (auto-fetched). Featured projects remain
              curated above.
            </p>
          </Reveal>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {filtered.map((repo, i) => (
              <Reveal key={repo.name} delay={i * 0.02}>
                <ProjectCard repo={repo} />
              </Reveal>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}