// Server-side GitHub enrichment for project cards. Fetched at build time and
// revalidated every 6 hours, so visitors never hit the GitHub API directly.

export type RepoMeta = {
  url: string;
  homepage: string | null;
  stars: number;
  language: string | null;
  pushedAt: string;
};

type ApiRepo = {
  name: string;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  language: string | null;
  pushed_at: string;
};

const REVALIDATE_SECONDS = 60 * 60 * 6;
const MAX_PAGES = 3;

/**
 * Returns metadata for every public repo owned by `user`, keyed by lowercase
 * repo name. Returns `null` when GitHub is unreachable or rate-limited, so the
 * caller can tell "repo doesn't exist" apart from "couldn't check".
 */
export async function getRepoIndex(user: string): Promise<Map<string, RepoMeta> | null> {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

  const index = new Map<string, RepoMeta>();

  try {
    for (let page = 1; page <= MAX_PAGES; page++) {
      const res = await fetch(
        `https://api.github.com/users/${encodeURIComponent(user)}/repos?type=owner&per_page=100&page=${page}`,
        { headers, next: { revalidate: REVALIDATE_SECONDS } }
      );
      if (!res.ok) return null;

      const repos = (await res.json()) as ApiRepo[];
      for (const r of repos) {
        index.set(r.name.toLowerCase(), {
          url: r.html_url,
          homepage: r.homepage?.trim() || null,
          stars: r.stargazers_count,
          language: r.language,
          pushedAt: r.pushed_at,
        });
      }
      if (repos.length < 100) break;
    }
  } catch {
    return null;
  }

  return index;
}

export type RepoLinks = {
  repoUrl: string | null;
  liveUrl: string | null;
  meta: RepoMeta | null;
};

/**
 * Resolves the links to show for a project. When GitHub could not be reached we
 * still link to the expected repo URL; when GitHub answered and the repo isn't
 * public, the link is dropped so the card never points at a 404.
 */
export function resolveRepo(
  index: Map<string, RepoMeta> | null,
  user: string,
  repo: string | undefined,
  live: string | undefined
): RepoLinks {
  if (!repo) return { repoUrl: null, liveUrl: live ?? null, meta: null };

  if (!index) {
    return { repoUrl: `https://github.com/${user}/${repo}`, liveUrl: live ?? null, meta: null };
  }

  const meta = index.get(repo.toLowerCase()) ?? null;
  return {
    repoUrl: meta?.url ?? null,
    liveUrl: live ?? meta?.homepage ?? null,
    meta,
  };
}
