import Image from "next/image";
import type { CaseStudy as CaseStudyData } from "@/app/content";
import type { RepoLinks } from "@/lib/github";
import { ArrowUpRight, GitHub, Lock } from "@/components/Icons";
import { Chip, TextLink, cn } from "@/components/ui";

function Pipeline({ steps }: { steps: string[] }) {
  return (
    <div>
      <p className="font-mono text-[11px] tracking-wide text-muted uppercase">How it works</p>
      <ol aria-label="System pipeline" className="relative mt-4 space-y-2.5">
        <span aria-hidden="true" className="absolute top-4 bottom-4 left-[13px] w-px bg-line-strong" />
        {steps.map((step, i) => (
          <li key={step} className="relative flex items-center gap-3">
            <span className="z-10 flex size-7 shrink-0 items-center justify-center rounded-full border border-line-strong bg-card font-mono text-[11px] text-muted">
              {i + 1}
            </span>
            <span className="flex-1 rounded-lg border border-line bg-card px-3 py-2 font-mono text-xs text-fg">
              {step}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function Metrics({ metrics }: { metrics: CaseStudyData["metrics"] }) {
  return (
    <dl className={cn("grid gap-4", metrics.length === 3 ? "grid-cols-3" : "grid-cols-2")}>
      {metrics.map((m) => (
        <div key={m.label} className="flex flex-col-reverse gap-1">
          <dt className="text-xs leading-snug text-muted">{m.label}</dt>
          <dd className="text-lg font-semibold tracking-tight text-fg sm:text-2xl">{m.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function CaseStudy({
  study,
  links,
  flip,
}: {
  study: CaseStudyData;
  links: RepoLinks;
  flip?: boolean;
}) {
  const isPrivate = study.kind === "Professional work";

  return (
    <article aria-labelledby={`${study.slug}-title`} className="reveal overflow-hidden rounded-3xl border border-line bg-card">
      <div className="grid lg:grid-cols-2">
        <div className="flex flex-col p-6 sm:p-10">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs">
            <span
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-medium",
                isPrivate ? "bg-card-hover text-muted" : "bg-accent-soft text-accent"
              )}
            >
              {isPrivate ? <Lock className="size-3" /> : null}
              {study.kind}
              {study.org ? ` · ${study.org}` : null}
            </span>
            <span className="font-mono text-muted">{study.period}</span>
          </div>

          <h3 id={`${study.slug}-title`} className="mt-5 text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
            {study.title}
          </h3>
          <p className="mt-3 text-pretty text-muted">{study.summary}</p>

          <ul className="mt-6 space-y-3 text-sm leading-relaxed">
            {study.highlights.map((h) => (
              <li key={h} className="flex gap-3">
                <span aria-hidden="true" className="mt-[0.6em] h-px w-3 shrink-0 bg-accent" />
                <span className="text-fg/85">{h}</span>
              </li>
            ))}
          </ul>

          <ul aria-label="Tech stack" className="mt-6 flex flex-wrap gap-1.5">
            {study.stack.map((t) => (
              <li key={t}>
                <Chip>{t}</Chip>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 pt-1 lg:mt-auto lg:pt-8">
            {links.repoUrl ? (
              <TextLink href={links.repoUrl}>
                <GitHub className="size-4" /> View code
              </TextLink>
            ) : null}
            {links.liveUrl ? (
              <TextLink href={links.liveUrl}>
                Live demo <ArrowUpRight className="size-3.5" />
              </TextLink>
            ) : null}
            {study.note ? <span className="text-xs text-muted">{study.note}</span> : null}
          </div>
        </div>

        <div
          className={cn(
            "flex flex-col gap-8 border-t border-line bg-bg/60 p-6 sm:p-10 lg:border-t-0",
            flip ? "lg:order-first lg:border-r" : "lg:border-l"
          )}
        >
          <Metrics metrics={study.metrics} />
          {study.image ? (
            <a
              href={links.repoUrl ?? study.image.src}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block overflow-hidden rounded-xl border border-line-strong shadow-[0_20px_50px_-20px_rgba(0,0,0,0.35)]"
            >
              <Image
                src={study.image.src}
                alt={study.image.alt}
                width={study.image.width}
                height={study.image.height}
                sizes="(min-width: 1024px) 520px, 100vw"
                className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </a>
          ) : null}
          <Pipeline steps={study.pipeline} />
        </div>
      </div>
    </article>
  );
}
