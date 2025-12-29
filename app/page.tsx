import { Container } from "@/components/Container";
import { Nav } from "@/components/Nav";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/Button";
import { ProjectCard } from "@/components/ProjectCard";
import { AllRepos } from "@/components/AllRepos";
import { experience, education, profile, skills, featuredProjects } from "@/app/content";
import { headers } from "next/headers";

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

async function getBaseUrl() {
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host");
  const proto = h.get("x-forwarded-proto") ?? "http";
  return host ? `${proto}://${host}` : "http://localhost:3000";
}

async function getFeaturedRepos(baseUrl: string) {
  const githubUrl = profile.links.github.replace(/\/+$/, "");
  const user = githubUrl.split("/").pop() || "";

  const res = await fetch(
    `${baseUrl}/api/github?mode=featured&user=${encodeURIComponent(
      user
    )}&projects=${encodeURIComponent(JSON.stringify(featuredProjects))}`,
    { next: { revalidate: 21600 } }
  );

  if (!res.ok) return [];
  const data = (await res.json()) as { repos: Repo[] };
  return data.repos ?? [];
}

async function getAllRepos(baseUrl: string) {
  const githubUrl = profile.links.github.replace(/\/+$/, "");
  const user = githubUrl.split("/").pop() || "";

  const res = await fetch(
    `${baseUrl}/api/github?mode=all&user=${encodeURIComponent(user)}`,
    { next: { revalidate: 21600 } }
  );

  if (!res.ok) return [];
  const data = (await res.json()) as { repos: Repo[] };
  return data.repos ?? [];
}

export default async function Home() {
  const baseUrl = await getBaseUrl();

  const [featured, all] = await Promise.all([
    getFeaturedRepos(baseUrl),
    getAllRepos(baseUrl),
  ]);

  const featuredRepoNames = featured.map((r) => r.name);

  return (
    <div className="min-h-screen bg-paper text-ink">
      <Nav />

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-black/[0.04] blur-3xl" />
          <div className="absolute -bottom-56 right-0 h-[520px] w-[520px] rounded-full bg-black/[0.03] blur-3xl" />
        </div>

        <Container>
          <div className="relative py-16 sm:py-24">
            <div className="grid items-center gap-10 sm:grid-cols-[1.2fr_0.8fr]">
              <Reveal>
                <p className="text-sm text-black/60">{profile.location}</p>

                <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl">
                  {profile.headline}
                </h1>

                <p className="mt-4 max-w-2xl text-base text-black/70 sm:text-lg">
                  {profile.subheadline}
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Button href="#projects" variant="solid">
                    View projects
                  </Button>
                  <Button href={profile.links.resume} variant="ghost">
                    Download resume
                  </Button>
                </div>

                <div className="mt-10 flex flex-wrap gap-2 text-xs text-black/60">
                  <span className="rounded-full border border-line bg-white/70 px-3 py-1">
                    Northeastern University
                  </span>
                  <span className="rounded-full border border-line bg-white/70 px-3 py-1">
                    Software Engineer
                  </span>
                  <span className="rounded-full border border-line bg-white/70 px-3 py-1">
                    Graduate TA ×2
                  </span>
                  <span className="rounded-full border border-line bg-white/70 px-3 py-1">
                    Algorithms + Data Structures
                  </span>
                  <span className="rounded-full border border-line bg-white/70 px-3 py-1">
                    LLD + System Design
                  </span>
                </div>
              </Reveal>

              <Reveal delay={0.05}>
                <div className="flex justify-start sm:justify-end">
                  <div className="relative h-56 w-56 overflow-hidden rounded-full border border-black/10 bg-black/[0.02] shadow-sm sm:h-56 sm:w-56">
                    <img
                      src={profile.photo ?? "/me.jpg"}
                      alt={`${profile.name} portrait`}
                      className="h-full w-full object-cover object-[center_18%] scale-110"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/20 to-transparent" />
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* ================= PROJECTS ================= */}
      <section id="projects" className="border-t border-line">
        <Container>
          <div className="py-16 sm:py-20">
            <Reveal>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Featured projects
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-black/65">
                Curated for signal: systems, performance, and clean engineering.
              </p>
            </Reveal>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {featured.length === 0 ? (
                <Reveal>
                  <div className="rounded-2xl border border-line bg-white p-5 text-sm text-black/70">
                    Loading projects… (Add a GitHub token to avoid rate limits.)
                  </div>
                </Reveal>
              ) : (
                featured.map((repo, i) => (
                  <Reveal key={repo.name} delay={i * 0.05}>
                    <ProjectCard repo={repo} />
                  </Reveal>
                ))
              )}
            </div>

            {/* Bottom-right arrow to show all repos (hidden by default) */}
            <AllRepos repos={all} featuredRepoNames={featuredRepoNames} />
          </div>
        </Container>
      </section>

      {/* ================= APPROACH ================= */}
      <section id="approach" className="border-t border-line">
        <Container>
          <div className="py-16 sm:py-20">
            <Reveal>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                How I build
              </h2>
            </Reveal>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                {
                  title: "Performance-first",
                  body: "Optimize loading, rendering, and data access with measurable improvements.",
                },
                {
                  title: "Clean architecture",
                  body: "Composable components, clear boundaries, and maintainable patterns.",
                },
                {
                  title: "Production mindset",
                  body: "Error handling, accessibility, testing, and scalable systems.",
                },
              ].map((item, i) => (
                <Reveal key={item.title} delay={i * 0.05}>
                  <div className="rounded-2xl border border-line bg-white p-5">
                    <h3 className="text-base font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm text-black/65">{item.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ================= EXPERIENCE ================= */}
      <section id="experience" className="border-t border-line">
        <Container>
          <div className="py-16 sm:py-20">
            <Reveal>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Experience
              </h2>
            </Reveal>

            <div className="mt-8 space-y-4">
              {experience.map((exp, i) => (
                <Reveal key={`${exp.company}-${exp.role}`} delay={i * 0.05}>
                  <div className="rounded-2xl border border-line bg-white p-5">
                    <h3 className="text-base font-semibold">
                      {exp.role} · {exp.company}
                    </h3>
                    <p className="text-sm text-black/60">{exp.period}</p>
                    <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-black/70">
                      {exp.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ================= SKILLS ================= */}
      <section className="border-t border-line">
        <Container>
          <div className="py-16 sm:py-20">
            <Reveal>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Skills
              </h2>
            </Reveal>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {Object.entries(skills).map(([group, items], i) => (
                <Reveal key={group} delay={i * 0.05}>
                  <div className="rounded-2xl border border-line bg-white p-5">
                    <h3 className="text-sm font-semibold">{group}</h3>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {items.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full border border-line px-3 py-1 text-xs text-black/70"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ================= CONTACT ================= */}
      <section id="contact" className="border-t border-line">
        <Container>
          <div className="py-14 sm:py-16">
            <Reveal>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Let’s connect
              </h2>

              <p className="mt-2 text-sm text-black/65">
                Open to full-time software engineering roles.
              </p>

              <p className="mt-4 text-sm text-black/80">
                Email:&nbsp;
                <a
                  href={`mailto:${profile.email}`}
                  className="font-medium underline underline-offset-4 hover:text-black"
                >
                  {profile.email}
                </a>
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Button href={`mailto:${profile.email}`} variant="solid">
                  Email me
                </Button>
                <Button href={profile.links.github} variant="ghost">
                  GitHub
                </Button>
                <Button href={profile.links.linkedin} variant="ghost">
                  LinkedIn
                </Button>
              </div>

              <p className="mt-10 text-xs text-black/50">
                © {new Date().getFullYear()} {profile.name}
              </p>
            </Reveal>
          </div>
        </Container>
      </section>
    </div>
  );
}