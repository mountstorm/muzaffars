import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { roles, education } from '@/lib/resume';

// C Spire first, then the research role, then teaching — the order a reviewer
// cares about. Education stays as a one-line summary; the detail is on /about.
const HOMEPAGE_ROLES = [
  'Software Engineering Intern',
  'Undergraduate Research Assistant, Distributed AI Systems',
  'Computer Science Teaching Assistant'
];

export default function ExperienceSummary() {
  const shown = HOMEPAGE_ROLES.map(
    (title) => roles.find((r) => r.title === title)!
  );

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="scroll-mt-24 border-t border-border bg-foreground/[0.02]"
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-10 sm:py-24">
        <h2
          id="experience-heading"
          className="text-2xl font-bold tracking-tight sm:text-3xl"
        >
          Experience
        </h2>

        <ol className="mt-10 space-y-10">
          {shown.map((role) => (
            <li key={role.title}>
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                <h3 className="text-lg font-semibold">
                  {role.title}
                  <span className="font-normal text-foreground/60">
                    {' '}
                    · {role.company}
                  </span>
                </h3>
                <p className="shrink-0 text-sm tabular-nums text-foreground/60">
                  {role.year}
                </p>
              </div>
              <ul className="mt-3 max-w-[75ch] list-disc space-y-1.5 pl-5 text-left text-foreground/75">
                {role.bullets.slice(0, 3).map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>

        <p className="mt-10 max-w-[75ch] text-foreground/70">
          <span className="font-medium text-foreground">{education.degree}</span>
          , {education.school}, {education.dates} —{' '}
          {education.highlights.join(', ')}.
        </p>

        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
          <Link
            href="/resume"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-foreground/25 px-6 py-3 text-base font-medium transition-colors hover:bg-foreground/5"
          >
            View full resume
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <Link
            href="/about"
            className="inline-flex min-h-[44px] items-center text-base underline-offset-4 hover:underline"
          >
            More about me
          </Link>
        </div>
      </div>
    </section>
  );
}
