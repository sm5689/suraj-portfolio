import { Reveal } from "@/components/Reveal";

type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  logo: string;
  bullets: string[];
};

type EducationItem = {
  school: string;
  degree: string;
  location: string;
  period: string;
  logo: string;
  details?: string[];
};

export function TimelineZigZag({
  experience,
  education,
}: {
  experience: ExperienceItem[];
  education: EducationItem[];
}) {
  const all = [
    ...experience.map((x) => ({
      kind: "EXPERIENCE" as const,
      title: `${x.role} · ${x.company}`,
      period: x.period,
      logo: x.logo,
      bullets: x.bullets,
      metaRight: x.company,
    })),
    ...education.map((x) => ({
      kind: "EDUCATION" as const,
      title: x.school,
      subtitle: x.degree,
      period: x.period,
      logo: x.logo,
      bullets: x.details ?? [],
      metaRight: x.location,
    })),
  ];

  return (
    <div className="relative mt-10">
      {/* Center vertical line (desktop) */}
      <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-black/10 sm:block" />

      <div className="space-y-10">
        {all.map((item, idx) => {
          const right = idx % 2 === 0;

          return (
            <Reveal key={`${item.kind}-${item.title}-${idx}`} delay={idx * 0.03}>
              <div className="relative sm:grid sm:grid-cols-2 sm:gap-10">
                {/* Spacer column (keeps the alternating layout clean) */}
                <div className={`${right ? "sm:order-1" : "sm:order-2"} hidden sm:block`} />

                {/* Card column */}
                <div className={`${right ? "sm:order-2" : "sm:order-1"}`}>
                  <div
                    className={`relative rounded-2xl border border-line bg-white p-5 ${
                      right ? "sm:ml-10" : "sm:mr-10"
                    }`}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <p className="text-xs font-medium text-black/60">
                          {item.kind}
                        </p>
                        <h3 className="mt-1 text-base font-semibold">
                          {item.title}
                        </h3>

                        {"subtitle" in item && item.subtitle ? (
                          <p className="mt-1 text-sm text-black/70">
                            {item.subtitle}
                          </p>
                        ) : null}

                        <p className="mt-1 text-sm text-black/60">{item.period}</p>
                      </div>

                      <span className="rounded-full border border-line bg-white px-3 py-1 text-xs text-black/60">
                        {item.metaRight}
                      </span>
                    </div>

                    {item.bullets?.length ? (
                      <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-black/70">
                        {item.bullets.map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </div>

                {/* Center logo node (sits on the vertical line) */}
                <div className="absolute left-0 top-0 sm:left-1/2 sm:top-6 sm:-translate-x-1/2">
                  <div className="flex items-center gap-3 sm:flex-col sm:gap-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white shadow-sm sm:h-12 sm:w-12">
                      <img
                        src={item.logo}
                        alt={`${item.title} logo`}
                        className="h-7 w-7 object-contain sm:h-8 sm:w-8"
                      />
                    </div>
                    <div className={`hidden h-3 w-3 rounded-full sm:block ${item.kind === "EXPERIENCE" ? "bg-black" : "bg-black/60"}`} />
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}