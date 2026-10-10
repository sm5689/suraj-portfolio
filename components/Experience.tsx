import type { Job, School } from "@/app/content";
import { Logo } from "@/components/Logo";
import { Chip, cn } from "@/components/ui";

const VISIBLE_BULLETS = 3;

function Bullets({ bullets }: { bullets: string[] }) {
  const shown = bullets.slice(0, VISIBLE_BULLETS);
  const rest = bullets.slice(VISIBLE_BULLETS);

  const list = (items: string[], className?: string) => (
    <ul className={cn("space-y-2 text-sm leading-relaxed text-muted", className)}>
      {items.map((b) => (
        <li key={b} className="flex gap-3">
          <span aria-hidden="true" className="mt-[0.6em] size-1 shrink-0 rounded-full bg-subtle" />
          <span>{b}</span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="mt-3">
      {list(shown)}
      {rest.length ? (
        <details className="group mt-2">
          <summary className="ml-4 inline-flex cursor-pointer items-center gap-1 rounded text-xs font-medium text-fg/80 hover:text-fg">
            <span className="when-closed">Show {rest.length} more</span>
            <span className="when-open">Show less</span>
          </summary>
          {list(rest, "mt-2")}
        </details>
      ) : null}
    </div>
  );
}

export function Timeline({ jobs }: { jobs: Job[] }) {
  return (
    <ol className="space-y-4">
      {jobs.map((job) => (
        <li key={job.company} className="reveal rounded-2xl border border-line bg-card p-6 sm:p-8">
          <div className="flex gap-4 sm:gap-5">
            <Logo src={job.logo} name={job.company} className="size-11 sm:size-12" />
            <div className="min-w-0 flex-1">
              <h3 className="text-lg font-semibold tracking-tight">
                {job.company}
                {job.location ? <span className="ml-2 text-sm font-normal text-muted">· {job.location}</span> : null}
              </h3>

              <div className="mt-1 space-y-6">
                {job.roles.map((role) => (
                  <div key={role.title}>
                    <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                      <p className="font-medium text-fg/90">{role.title}</p>
                      <p className="shrink-0 font-mono text-xs text-muted">{role.period}</p>
                    </div>
                    <Bullets bullets={role.bullets} />
                  </div>
                ))}
              </div>

              {job.stack?.length ? (
                <ul aria-label="Technologies" className="mt-5 flex flex-wrap gap-1.5">
                  {job.stack.map((t) => (
                    <li key={t}>
                      <Chip>{t}</Chip>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function EarlierExperience({ jobs }: { jobs: Job[] }) {
  return (
    <details className="reveal group mt-4 rounded-2xl border border-line bg-card">
      <summary className="flex cursor-pointer items-center justify-between gap-4 rounded-2xl px-6 py-5 sm:px-8">
        <span>
          <span className="font-medium">Earlier experience</span>
          <span className="ml-2 font-mono text-xs text-muted">2021 – 2022 · {jobs.length} internships</span>
        </span>
        <span aria-hidden="true" className="font-mono text-lg text-muted transition-transform group-open:rotate-45">
          +
        </span>
      </summary>
      <ul className="divide-y divide-line border-t border-line">
        {jobs.map((job) =>
          job.roles.map((role) => (
            <li key={`${job.company}-${role.title}`} className="flex gap-4 px-6 py-5 sm:px-8">
              <Logo src={job.logo} name={job.company} className="size-9" />
              <div className="min-w-0 flex-1">
                <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                  <p className="font-medium">
                    {role.title} <span className="font-normal text-muted">· {job.company}</span>
                  </p>
                  <p className="shrink-0 font-mono text-xs text-muted">{role.period}</p>
                </div>
                <ul className="mt-2 space-y-1.5 text-sm text-muted">
                  {role.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))
        )}
      </ul>
    </details>
  );
}

export function Education({ schools }: { schools: School[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {schools.map((s) => (
        <div key={s.school} className="reveal flex gap-4 rounded-2xl border border-line bg-card p-6">
          <Logo src={s.logo} name={s.school} className="size-11" />
          <div className="min-w-0">
            <h4 className="font-semibold tracking-tight">{s.school}</h4>
            <p className="mt-0.5 text-sm text-fg/85">{s.degree}</p>
            <p className="mt-1 font-mono text-xs text-muted">
              {s.period} · {s.location}
            </p>
            {s.gpa ? (
              <p className="mt-2 text-sm">
                <span className="text-muted">GPA</span> <span className="font-medium">{s.gpa}</span>
              </p>
            ) : null}
            <p className="mt-3 text-sm leading-relaxed text-muted">{s.coursework}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
