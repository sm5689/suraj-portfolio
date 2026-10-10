import Image from "next/image";
import type { CSSProperties } from "react";
import {
  caseStudies,
  earlierExperience,
  education,
  experience,
  profile,
  projects,
  site,
  skills,
  stats,
} from "@/app/content";
import { CaseStudy } from "@/components/CaseStudy";
import { CommandMenu } from "@/components/CommandMenu";
import { CopyEmail } from "@/components/CopyEmail";
import { EarlierExperience, Education, Timeline } from "@/components/Experience";
import { ArrowRight, ArrowUpRight, FileText, GitHub, LinkedIn, Mail } from "@/components/Icons";
import { Nav } from "@/components/Nav";
import { ProjectCard } from "@/components/ProjectCard";
import { Button, Chip, Container, IconLink, Reveal, Section } from "@/components/ui";
import { getRepoIndex, resolveRepo } from "@/lib/github";

const FEATURED_PROJECT_COUNT = 6;

/** Staggers the hero's load-in animation (see `.rise` in globals.css). */
const stagger = (i: number) => ({ "--i": i }) as CSSProperties;

export default async function Home() {
  const repoIndex = await getRepoIndex(profile.github);
  const resolve = (repo?: string, live?: string) => resolveRepo(repoIndex, profile.github, repo, live);

  const studies = caseStudies.map((study) => ({ study, links: resolve(study.repo, study.live) }));
  const allProjects = projects.map((project) => ({ project, links: resolve(project.repo, project.live) }));
  const featuredProjects = allProjects.slice(0, FEATURED_PROJECT_COUNT);
  const moreProjects = allProjects.slice(FEATURED_PROJECT_COUNT);

  const commandLinks = [
    ...studies.map(({ study, links }) => ({ label: `${study.title} on GitHub`, href: links.repoUrl })),
    ...featuredProjects.map(({ project, links }) => ({ label: `${project.title} on GitHub`, href: links.repoUrl })),
  ].filter((l): l is { label: string; href: string } => Boolean(l.href));

  return (
    <>
      <Nav />
      <CommandMenu projectLinks={commandLinks} />

      <main id="main">
        {/* ============================== HERO ============================== */}
        <section id="top" aria-label="Introduction" className="relative isolate overflow-hidden">
          <div aria-hidden="true" className="hero-grid pointer-events-none absolute inset-0 -z-10" />
          <Container className="pt-10 pb-20 sm:pt-20 sm:pb-28">
            <div className="grid items-center gap-8 md:grid-cols-[1fr_auto] md:gap-16">
              <div className="relative size-24 overflow-hidden rounded-full border border-line-strong bg-card shadow-sm md:order-last md:aspect-[4/5] md:h-auto md:w-72 md:rounded-[2rem] lg:w-80">
                <Image
                  src={profile.photo}
                  alt={`Portrait of ${profile.name}`}
                  fill
                  preload
                  sizes="(min-width: 1024px) 320px, (min-width: 768px) 288px, 96px"
                  className="object-cover object-[center_20%]"
                />
              </div>

              <div>
                <p
                  style={stagger(0)}
                  className="rise inline-flex items-center gap-2 rounded-full border border-line bg-card px-3 py-1 text-xs text-muted"
                >
                  <span className="relative flex size-2">
                    <span className="pulse-ring absolute inset-0 rounded-full bg-live" />
                    <span className="relative size-2 rounded-full bg-live" />
                  </span>
                  {profile.availability} · {profile.location}
                </p>

                <h1
                  style={stagger(1)}
                  className="rise mt-6 max-w-3xl text-[2.5rem] leading-[1.05] font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl"
                >
                  {profile.headline} <span className="text-muted">{profile.headlineTrail}</span>
                </h1>

                <p style={stagger(2)} className="rise mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-muted">
                  {profile.intro}
                </p>

                <div style={stagger(3)} className="rise mt-8 flex flex-wrap items-center gap-3">
                  <Button href="#work" icon={<ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />}>
                    See selected work
                  </Button>
                  <Button href={profile.links.resume} variant="ghost" icon={<FileText className="size-4" />}>
                    Résumé
                  </Button>
                  <div className="flex gap-2">
                    <IconLink href={profile.links.github} label="GitHub">
                      <GitHub />
                    </IconLink>
                    <IconLink href={profile.links.linkedin} label="LinkedIn">
                      <LinkedIn />
                    </IconLink>
                    <IconLink href={`mailto:${profile.email}`} label="Email">
                      <Mail />
                    </IconLink>
                  </div>
                </div>
              </div>
            </div>

            <dl
              style={stagger(4)}
              className="rise mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:mt-20 lg:grid-cols-4"
            >
              {stats.map((s) => (
                <div key={s.label} className="flex flex-col-reverse justify-end gap-1 bg-card p-5 sm:p-6">
                  <dt className="text-sm leading-snug text-muted">{s.label}</dt>
                  <dd className="text-3xl font-semibold tracking-tight sm:text-4xl">{s.value}</dd>
                </div>
              ))}
            </dl>
          </Container>
        </section>

        {/* ========================== SELECTED WORK ========================= */}
        <Section
          id="work"
          index="01"
          eyebrow="Selected work"
          title="Systems I've designed, built and shipped."
          description="Two production products I built at Threadwire and two recent personal projects, each with results you can measure."
        >
          <div className="space-y-6">
            {studies.map(({ study, links }, i) => (
              <CaseStudy key={study.slug} study={study} links={links} flip={i % 2 === 1} />
            ))}
          </div>
        </Section>

        {/* ============================ PROJECTS ============================ */}
        <Section
          id="projects"
          index="02"
          eyebrow="Projects"
          title="More things I've built."
          description="RAG experiments, full-stack apps and systems coursework. Links and stars come live from GitHub."
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map(({ project, links }) => (
              <ProjectCard key={project.title} project={project} links={links} />
            ))}
          </div>

          {moreProjects.length ? (
            <details className="group mt-4">
              <summary className="mx-auto flex w-fit cursor-pointer items-center gap-2 rounded-full border border-line-strong bg-card px-5 py-2.5 text-sm font-medium transition-colors hover:bg-card-hover group-open:mb-4">
                <span className="when-closed">Show {moreProjects.length} more projects</span>
                <span className="when-open">Show fewer projects</span>
              </summary>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {moreProjects.map(({ project, links }) => (
                  <ProjectCard key={project.title} project={project} links={links} />
                ))}
              </div>
            </details>
          ) : null}

          <Reveal className="mt-10 text-center">
            <a
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-fg"
            >
              <GitHub className="size-4" /> Everything else is on GitHub <ArrowUpRight className="size-3.5" />
            </a>
          </Reveal>
        </Section>

        {/* =========================== EXPERIENCE =========================== */}
        <Section
          id="experience"
          index="03"
          eyebrow="Experience"
          title="Where I've worked."
          description="Production SaaS engineering, plus teaching full-stack web development at Northeastern."
        >
          <Timeline jobs={experience} />
          <EarlierExperience jobs={earlierExperience} />

          <Reveal>
            <h3 className="mt-16 font-mono text-xs tracking-wide text-muted uppercase">Education</h3>
          </Reveal>
          <div className="mt-4">
            <Education schools={education} />
          </div>
        </Section>

        {/* ============================= SKILLS ============================= */}
        <Section id="skills" index="04" eyebrow="Toolbox" title="What I work with.">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map(({ group, items }) => (
              <Reveal key={group} className="rounded-2xl border border-line bg-card p-6">
                <h3 className="font-mono text-xs tracking-wide text-muted uppercase">{group}</h3>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {items.map((item) => (
                    <li key={item}>
                      <Chip className="text-fg/85">{item}</Chip>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ============================= CONTACT ============================ */}
        <Section
          id="contact"
          index="05"
          eyebrow="Contact"
          title="Let's build something together."
          description="I'm open to full-time software engineering roles. Email is the fastest way to reach me."
        >
          <Reveal className="flex flex-col items-start gap-6">
            <CopyEmail email={profile.email} />
            <div className="flex flex-wrap gap-3">
              <Button href={profile.links.linkedin} variant="ghost" icon={<LinkedIn className="size-4" />}>
                LinkedIn
              </Button>
              <Button href={profile.links.github} variant="ghost" icon={<GitHub className="size-4" />}>
                GitHub
              </Button>
              <Button href={profile.links.resume} variant="ghost" icon={<FileText className="size-4" />}>
                Résumé
              </Button>
            </div>
          </Reveal>
        </Section>
      </main>

      <footer className="border-t border-line">
        <Container className="flex flex-col gap-3 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {profile.name}
          </p>
          <p className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="hidden sm:inline">
              Press <kbd className="rounded border border-line px-1.5 py-0.5 font-mono text-[11px]">⌘K</kbd> to navigate
            </span>
            <a href={site.repo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-fg">
              View source <ArrowUpRight className="size-3.5" />
            </a>
          </p>
        </Container>
      </footer>
    </>
  );
}
