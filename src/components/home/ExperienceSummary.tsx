import Link from 'next/link';
import { roles, education, leadership } from '@/lib/resume';

const HOMEPAGE_ROLES = [
  'Software Engineering Intern',
  'Undergraduate Research Assistant — Distributed AI Systems',
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
      className="scroll-mt-[4ch] border-b border-[var(--ed-rule)] px-[2ch] py-[4ch] sm:px-[4ch]"
    >
      <h2
        id="experience-heading"
        className="ed-mono text-[1.4rem] font-semibold tracking-tight sm:text-[1.75rem]"
      >
        <span className="text-[var(--ed-faint)]">## </span>
        experience
      </h2>

      <ol className="mt-[3ch] space-y-[3ch]">
        {shown.map((role, i) => (
          <li
            key={role.title}
            className="ed-diff"
            style={{ '--ed-delay': `${i * 90}ms` } as React.CSSProperties}
          >
            <div className="flex flex-col gap-[0.25ch] sm:flex-row sm:items-baseline sm:justify-between sm:gap-[3ch]">
              <h3 className="ed-mono text-[1.0625rem] font-semibold">
                {role.title}
                <span className="font-normal text-[var(--ed-dim)]">
                  {' '}
                  @ {role.company}
                </span>
              </h3>
              <p className="ed-mono shrink-0 text-[12px] tabular-nums text-[var(--ed-faint)]">
                {role.year}
              </p>
            </div>
            <ul className="mt-[1ch] max-w-[75ch] space-y-[0.75ch] font-[family-name:var(--font-sans)] text-[var(--ed-dim)]">
              {role.bullets.slice(0, 3).map((b) => (
                <li key={b} className="flex gap-[1.5ch] leading-relaxed">
                  <span
                    aria-hidden="true"
                    className="ed-mono shrink-0 text-[var(--ed-add)]"
                  >
                    +
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>

      <h3 className="ed-mono mt-[4ch] text-[1.0625rem] font-semibold">
        <span className="text-[var(--ed-faint)]">### </span>leadership
      </h3>
      {leadership.map((entry) => (
        <div key={entry.title} className="mt-[1.5ch]">
          <div className="flex flex-col gap-[0.25ch] sm:flex-row sm:items-baseline sm:justify-between sm:gap-[3ch]">
            <h4 className="ed-mono font-semibold">
              {entry.title}
              <span className="font-normal text-[var(--ed-dim)]">
                {' '}
                @ {entry.organization}
              </span>
            </h4>
            <p className="ed-mono shrink-0 text-[12px] tabular-nums text-[var(--ed-faint)]">
              {entry.year}
            </p>
          </div>
          <ul className="mt-[1ch] max-w-[75ch] space-y-[0.75ch] font-[family-name:var(--font-sans)] text-[var(--ed-dim)]">
            {entry.bullets.map((b) => (
              <li key={b} className="flex gap-[1.5ch] leading-relaxed">
                <span
                  aria-hidden="true"
                  className="ed-mono shrink-0 text-[var(--ed-add)]"
                >
                  +
                </span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <p className="ed-mono mt-[3ch] max-w-[75ch] text-[13px] leading-relaxed text-[var(--ed-faint)]">
        <span className="text-[var(--ed-key)]">{'// '}</span>
        {education.degree}, {education.school}, {education.dates} —{' '}
        {education.highlights.join(', ')}.
      </p>

      <div className="mt-[3ch] flex flex-wrap gap-[3ch]">
        <Link
          href="/resume"
          className="ed-mono inline-flex min-h-[44px] items-center border border-[var(--ed-rule)] px-[2ch] text-[13px] transition-colors hover:border-[var(--ed-accent)] hover:text-[var(--ed-accent)]"
        >
          cat resume.pdf
        </Link>
        <Link
          href="/about"
          className="ed-mono inline-flex min-h-[44px] items-center text-[13px] text-[var(--ed-accent)] underline-offset-4 hover:underline"
        >
          more about me →
        </Link>
      </div>
    </section>
  );
}
