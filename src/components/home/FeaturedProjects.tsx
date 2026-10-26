import Link from 'next/link';
import { featuredProjects, type Project } from '@/lib/projects';

const STATUS_COLOR: Record<Project['status'], string> = {
  Live: 'var(--ed-add)',
  Research: 'var(--ed-key)',
  'In development': 'var(--ed-string)',
  'Internal project': 'var(--ed-faint)'
};

export default function FeaturedProjects() {
  return (
    <section
      aria-labelledby="selected-projects"
      className="border-b border-[var(--ed-rule)] px-[2ch] py-[4ch] sm:px-[4ch]"
    >
      <h2
        id="selected-projects"
        className="ed-mono text-[1.4rem] font-semibold tracking-tight sm:text-[1.75rem]"
      >
        <span className="text-[var(--ed-faint)]">## </span>
        selected projects
      </h2>

      <ul className="mt-[3ch] space-y-[3ch]">
        {featuredProjects.map((project, i) => (
          <li
            key={project.id}
            className="ed-diff border-l-2 pl-[2ch]"
            style={
              {
                borderColor: STATUS_COLOR[project.status],
                '--ed-delay': `${i * 110}ms`
              } as React.CSSProperties
            }
          >
            <article>
              <div className="flex flex-wrap items-baseline gap-x-[2ch] gap-y-[0.5ch]">
                <h3 className="ed-mono text-[1.125rem] font-semibold">
                  <span
                    aria-hidden="true"
                    style={{ color: STATUS_COLOR[project.status] }}
                  >
                    +{' '}
                  </span>
                  {project.title}
                </h3>
                <span
                  className="ed-mono text-[12px]"
                  style={{ color: STATUS_COLOR[project.status] }}
                >
                  [{project.status}]
                </span>
              </div>

              <p className="mt-[1ch] max-w-[72ch] font-[family-name:var(--font-sans)] leading-relaxed text-[var(--ed-dim)]">
                {project.headline}
              </p>
              <p className="mt-[1ch] max-w-[72ch] font-[family-name:var(--font-sans)] text-[0.9375rem] leading-relaxed text-[var(--ed-faint)]">
                {project.result}
              </p>

              <p className="ed-mono mt-[1.5ch] text-[12px] text-[var(--ed-string)]">
                {project.tags.slice(0, 5).map((t) => `"${t}"`).join(', ')}
              </p>

              <div className="mt-[1.5ch] flex flex-wrap gap-x-[3ch] gap-y-[0.5ch]">
                {project.caseStudy && (
                  <Link
                    href={`/projects/${project.caseStudy}`}
                    className="ed-mono inline-flex min-h-[44px] items-center text-[13px] text-[var(--ed-accent)] underline-offset-4 hover:underline"
                  >
                    read the {project.title} case study →
                  </Link>
                )}
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ed-mono inline-flex min-h-[44px] items-center text-[13px] text-[var(--ed-dim)] underline-offset-4 hover:text-[var(--ed-ink)] hover:underline"
                  >
                    {project.title} on github ↗
                  </a>
                )}
              </div>
            </article>
          </li>
        ))}
      </ul>

      <Link
        href="/projects"
        className="ed-mono mt-[3ch] inline-flex min-h-[44px] items-center border border-[var(--ed-rule)] px-[2ch] text-[13px] transition-colors hover:border-[var(--ed-accent)] hover:text-[var(--ed-accent)]"
      >
        ls projects/ — view all
      </Link>
    </section>
  );
}
