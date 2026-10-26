import Reveal from '@/components/site/Reveal';
import { Shell, SectionHead, Button } from '@/components/site/ui';
import { roles, education, leadership } from '@/lib/resume';

const ORDER = [
  'Software Engineering Intern',
  'Undergraduate Research Assistant — Distributed AI Systems',
  'Computer Science Teaching Assistant'
];

export default function Experience() {
  const shown = ORDER.map((t) => roles.find((r) => r.title === t)!);

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="scroll-mt-24 px-3 py-16 sm:px-5 lg:py-20"
    >
      <div className="glass glass-panel mx-auto max-w-[1240px] px-6 py-12 lg:px-10 lg:py-16">
        <SectionHead
          index="02"
          label="Experience"
          title="Where I've been."
          action={<Button href="/resume">Full resume</Button>}
        />

        <ol className="mt-16 space-y-14">
          {shown.map((role, i) => (
            <Reveal as="li" key={role.title} delay={i * 60}>
              <div className="grid gap-4 border-t border-[var(--glass-hairline)] pt-8 lg:grid-cols-[14rem_1fr] lg:gap-12">
                <div>
                  <p className="mono text-[0.82rem] tabular-nums text-[var(--faint)]">
                    {role.year}
                  </p>
                  {role.company.startsWith('C Spire') && (
                    <p className="label mt-2 text-[var(--leaf)]">
                      Return offer
                    </p>
                  )}
                </div>
                <div>
                  <h3 className="text-[1.25rem] font-medium">{role.title}</h3>
                  <p className="mt-1 text-[var(--muted)]">{role.company}</p>
                  <ul className="measure mt-5 space-y-3">
                    {role.bullets.slice(0, 3).map((b) => (
                      <li
                        key={b}
                        className="flex gap-3 leading-relaxed text-[var(--muted)]"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-[0.7em] inline-block h-px w-3 shrink-0 bg-[var(--rule-strong)]"
                        />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}

          {leadership.map((entry) => (
            <Reveal as="li" key={entry.title} delay={180}>
              <div className="grid gap-4 border-t border-[var(--glass-hairline)] pt-8 lg:grid-cols-[14rem_1fr] lg:gap-12">
                <p className="mono text-[0.82rem] tabular-nums text-[var(--faint)]">
                  {entry.year}
                </p>
                <div>
                  <h3 className="text-[1.25rem] font-medium">{entry.title}</h3>
                  <p className="mt-1 text-[var(--muted)]">{entry.organization}</p>
                  <ul className="measure mt-5 space-y-3">
                    {entry.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex gap-3 leading-relaxed text-[var(--muted)]"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-[0.7em] inline-block h-px w-3 shrink-0 bg-[var(--rule-strong)]"
                        />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>

        <p className="mono mt-14 border-t border-[var(--glass-hairline)] pt-8 text-[0.88rem] leading-relaxed text-[var(--faint)]">
          {education.degree} · {education.school} · {education.dates} ·{' '}
          {education.highlights.join(' · ')}
        </p>
      </div>
    </section>
  );
}
