import {
  Buffer,
  Section,
  Status,
  Tags,
  PathLink,
  Comment,
  sans
} from '@/components/shell/doc';
import { pageMetadata } from '@/lib/metadata';
import { projects } from '@/lib/projects';

export const metadata = pageMetadata({
  title: 'Projects',
  description:
    'Distributed inference research, an H-1B database built from 831k USCIS filings, a co-founded shopping app with paying users, and production billing systems at C Spire.',
  path: '/projects',
  og: 'projects'
});

const PUBLIC_FIRST = (a: { link?: string }, b: { link?: string }) =>
  Number(!!b.link) - Number(!!a.link);

export default function ProjectsPage() {
  const listed = [...projects].sort(PUBLIC_FIRST);

  return (
    <Buffer
      path="~/muzaffarkhaydarov.com/projects/"
      title="projects"
      lede="Everything I have shipped that I can show. Internal work at C Spire is described without the code."
      meta={
        <Comment>
          {listed.length} entries · {listed.filter((p) => p.link).length} public
          · {listed.filter((p) => !p.link).length} internal or in progress
        </Comment>
      }
    >
      <Section>
        <ol className="divide-y divide-[var(--ed-rule)] border-y border-[var(--ed-rule)]">
          {listed.map((project, i) => (
            <li
              key={project.id}
              className="ed-diff py-[2ch]"
              style={{ '--ed-delay': `${i * 55}ms` } as React.CSSProperties}
            >
              <div className="flex flex-wrap items-baseline gap-x-[2ch] gap-y-[0.5ch]">
                <span
                  aria-hidden="true"
                  className="ed-mono text-[12px] tabular-nums text-[var(--ed-faint)]"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h2 className="ed-mono text-[1.0625rem] font-semibold">
                  {project.title}
                </h2>
                <Status status={project.status} />
              </div>

              <p
                className={`${sans} mt-[1ch] max-w-[76ch] pl-[4ch] leading-relaxed text-[var(--ed-dim)]`}
              >
                {project.description}
              </p>

              <div className="mt-[1ch] pl-[4ch]">
                <Tags tags={project.tags} />
              </div>

              <div className="mt-[0.5ch] flex flex-wrap gap-x-[3ch] pl-[4ch]">
                {project.caseStudy && (
                  <PathLink href={`/projects/${project.caseStudy}`}>
                    read the {project.title} case study →
                  </PathLink>
                )}
                {project.link && (
                  <PathLink href={project.link} external>
                    {project.title} on github
                  </PathLink>
                )}
                {project.secondaryLink && (
                  <PathLink href={project.secondaryLink} external>
                    {project.secondaryButtonText?.toLowerCase() ?? 'live demo'}
                  </PathLink>
                )}
                {!project.link && (
                  <span className="ed-mono inline-flex min-h-[44px] items-center text-[13px] text-[var(--ed-faint)]">
                    {project.noLinkLabel}
                  </span>
                )}
              </div>
            </li>
          ))}
        </ol>
      </Section>
    </Buffer>
  );
}
