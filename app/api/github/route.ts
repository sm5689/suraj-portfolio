import { NextResponse } from "next/server";

type Repo = {
  name: string;
  html_url: string;
  description: string | null;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
};

type ProjectInput = {
  repo: string;
  title: string;
  blurb?: string;
  tags?: string[];
};

function firstParagraphFromReadme(markdown: string): string {
  const cleaned = markdown
    .replace(/!\[[^\]]*\]\([^)]+\)/g, "")
    .replace(/^#.+$/gm, "")
    .replace(/```[\s\S]*?```/g, "")
    .replace(/\r/g, "")
    .trim();

  const parts = cleaned
    .split("\n\n")
    .map((p) => p.trim())
    .filter(Boolean);

  for (const p of parts) {
    const oneLine = p.replace(/\n/g, " ").trim();
    const badgeLike = /\[!\[.*\]\(.*\)\]\(.*\)/.test(oneLine);
    if (!badgeLike && oneLine.length >= 40) return oneLine.slice(0, 220);
  }

  const firstLine = cleaned.split("\n").map((l) => l.trim()).find(Boolean);
  return (firstLine ?? "").slice(0, 220);
}

async function fetchRepo(
  user: string,
  repo: string,
  headers: Record<string, string>
) {
  const res = await fetch(`https://api.github.com/repos/${user}/${repo}`, {
    headers,
    next: { revalidate: 21600 },
  });
  if (!res.ok) return null;
  return (await res.json()) as Repo;
}

async function fetchReadmeText(
  user: string,
  repo: string,
  headers: Record<string, string>
) {
  const res = await fetch(`https://api.github.com/repos/${user}/${repo}/readme`, {
    headers,
    next: { revalidate: 21600 },
  });
  if (!res.ok) return null;

  const data = (await res.json()) as { content?: string; encoding?: string };
  if (!data.content || data.encoding !== "base64") return null;

  const buff = Buffer.from(data.content, "base64");
  return buff.toString("utf8");
}

async function fetchAllRepos(
  user: string,
  headers: Record<string, string>
): Promise<Repo[]> {
  // First 100 repos sorted by last update (enough for most portfolios)
  // If you ever need more, we can add pagination (page=2,3,...)
  const res = await fetch(
    `https://api.github.com/users/${user}/repos?per_page=100&sort=updated`,
    {
      headers,
      next: { revalidate: 21600 },
    }
  );
  if (!res.ok) return [];
  const data = (await res.json()) as Repo[];
  return data ?? [];
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const user = searchParams.get("user");
  const mode = searchParams.get("mode") ?? "featured";

  if (!user) {
    return NextResponse.json({ error: "Missing user" }, { status: 400 });
  }

  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
  };

  const token = process.env.GITHUB_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;

  // =================== ALL REPOS MODE ===================
  if (mode === "all") {
    const repos = await fetchAllRepos(user, headers);

    // normalize so ProjectCard can render consistently
    const normalized = repos.map((r) => ({
      ...r,
      display_name: r.name,
      display_description: (r.description ?? "").trim() || "No description yet.",
      tags: [],
    }));

    return NextResponse.json({ repos: normalized });
  }

  // =================== FEATURED MODE ===================
  const projectsParam = searchParams.get("projects");
  if (!projectsParam) {
    return NextResponse.json({ error: "Missing projects" }, { status: 400 });
  }

  let projects: ProjectInput[] = [];
  try {
    projects = JSON.parse(projectsParam) as ProjectInput[];
  } catch {
    return NextResponse.json({ error: "Invalid projects JSON" }, { status: 400 });
  }

  const results = [];

  for (const p of projects) {
    const repoData = await fetchRepo(user, p.repo, headers);
    if (!repoData) continue;

    let finalDescription =
      (p.blurb ?? "").trim() || (repoData.description ?? "").trim();

    if (!finalDescription) {
      const readme = await fetchReadmeText(user, p.repo, headers);
      if (readme) {
        const fromReadme = firstParagraphFromReadme(readme);
        if (fromReadme) finalDescription = fromReadme;
      }
    }

    results.push({
      ...repoData,
      display_name: p.title.trim() || repoData.name,
      display_description: finalDescription || "No description yet.",
      tags: p.tags ?? [],
    });
  }

  results.sort((a, b) => +new Date(b.updated_at) - +new Date(a.updated_at));
  return NextResponse.json({ repos: results });
}