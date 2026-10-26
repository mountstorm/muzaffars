import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { caseStudies, getCaseStudy } from '@/lib/case-studies';
import { projects, type Project } from '@/lib/projects';
import { pageMetadata } from '@/lib/metadata';

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const study = getCaseStudy(params.slug);
  if (!study) return {};
  return {
    ...pageMetadata({
      title: study.metaTitle,
      description: study.metaDescription,
      path: `/projects/${study.slug}`,
      og: 'projects'
    }),
    title: { absolute: `${study.metaTitle} | Muzaffar Khaydarov` }
  };
}

const STATUS_COLOR: Record<Project['status'], string> = {
  Live: 'var(--ed-add)',
  Research: 'var(--ed-key)',
  'In development': 'var(--ed-string)',
  'Internal project': 'var(--ed-faint)'
};

export default function CaseStudyPage({
  params
}: {
  params: { slug: string };
}) {
  const study = getCaseStudy(params.slug);
  if (!study) notFound();

  const project = projects.find((p) => p.id === study.projectId)!;

  return (
    <article className="w-full max-w-[80ch] px-[2ch] py-[4ch] sm:px-[4ch]">
      <Link
        href="/projects"
        className="ed-mono inline-flex min-h-[44px] items-center gap-2 text-[13px] text-[var(--ed-dim)] underline-offset-4 hover:text-[var(--ed-accent)] hover:underline"
      >
        <ArrowLeft size={16} aria-hidden="true" />
        cd ../projects
      </Link>

      <header className="mt-[1ch] border-b border-[var(--ed-rule)] pb-[2ch]">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="ed-mono text-[clamp(1.7rem,5.5vw,3rem)] font-semibold leading-[1.12] tracking-tight">
            {study.title}
          </h1>
          <span className="ed-mono text-[12px]" style={{ color: STATUS_COLOR[project.status] }}>
            [{project.status}]
          </span>
        </div>
        <p className="mt-[1.5ch] max-w-[72ch] font-[family-name:var(--font-sans)] text-[1.0625rem] leading-relaxed text-[var(--ed-dim)]">
          {study.standfirst}
        </p>
        <p className="ed-mono mt-[1.5ch] text-[12px] text-[var(--ed-string)]">
          {project.tags.map((t) => `"${t}"`).join(', ')}
        </p>
      </header>

      <div className="mt-[3ch] space-y-[4ch]">
        {[study.overview, study.problem, study.contribution].map((section) => (
          <Prose key={section.heading} heading={section.heading}>
            {section.body.map((p) => (
              <p key={p} className="font-[family-name:var(--font-sans)] leading-relaxed text-[var(--ed-dim)]">
                {p}
              </p>
            ))}
          </Prose>
        ))}

        <Prose heading={study.architecture.heading}>
          <ol className="space-y-4">
            {study.architecture.steps.map((step, i) => (
              <li key={step.label} className="flex gap-4">
                <span
                  aria-hidden="true"
                  className="ed-mono mt-[0.2ch] shrink-0 tabular-nums text-[var(--ed-faint)]"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="font-[family-name:var(--font-sans)] leading-relaxed text-[var(--ed-dim)]">
                  <span className="ed-mono font-semibold text-[var(--ed-key)]">
                    {step.label}
                  </span>{' '}
                  {step.detail}
                </p>
              </li>
            ))}
          </ol>
        </Prose>

        <Prose heading={study.decisions.heading}>
          <dl className="space-y-6">
            {study.decisions.items.map((item) => (
              <div
                key={item.choice}
                className="border-l-2 border-[var(--ed-accent)] bg-[var(--ed-sel)] py-[1ch] pl-[2ch] pr-[2ch]"
              >
                <dt className="ed-mono font-semibold text-[var(--ed-ink)]">{item.choice}</dt>
                <dd className="mt-[1ch] font-[family-name:var(--font-sans)] leading-relaxed text-[var(--ed-dim)]">
                  {item.why}
                </dd>
              </div>
            ))}
          </dl>
        </Prose>

        <Prose heading={study.results.heading}>
          <ul className="space-y-[0.75ch] font-[family-name:var(--font-sans)] text-[var(--ed-dim)]">
            {study.results.outcomes.map((o) => (
              <li key={o} className="flex gap-[1.5ch] leading-relaxed">
                <span aria-hidden="true" className="ed-mono shrink-0 text-[var(--ed-add)]">+</span>
                <span>{o}</span>
              </li>
            ))}
          </ul>
          <h3 className="ed-mono mt-[2.5ch] text-[0.95rem] font-semibold"><span className="text-[var(--ed-faint)]">### </span>limitations</h3>
          <ul className="mt-[1ch] space-y-[0.75ch] font-[family-name:var(--font-sans)] text-[var(--ed-faint)]">
            {study.results.limitations.map((l) => (
              <li key={l} className="flex gap-[1.5ch] leading-relaxed">
                <span aria-hidden="true" className="ed-mono shrink-0 text-[var(--ed-del)]">!</span>
                <span>{l}</span>
              </li>
            ))}
          </ul>
        </Prose>

        <Prose heading="Links">
          <ul className="space-y-3">
            {project.link && (
              <li>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ed-mono inline-flex min-h-[44px] items-center gap-2 text-[13px] text-[var(--ed-accent)] underline-offset-4 hover:underline"
                >
                  {study.title} repository on GitHub
                  <ExternalLink size={15} aria-hidden="true" />
                </a>
              </li>
            )}
            {project.secondaryLink && (
              <li>
                <a
                  href={project.secondaryLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ed-mono inline-flex min-h-[44px] items-center gap-2 text-[13px] text-[var(--ed-accent)] underline-offset-4 hover:underline"
                >
                  {project.secondaryButtonText ?? 'Live demo'}
                  <ExternalLink size={15} aria-hidden="true" />
                </a>
              </li>
            )}
            {!project.link && (
              <li className="ed-mono text-[13px] text-[var(--ed-faint)]">
                {project.noLinkLabel ?? 'No public link for this project.'}
              </li>
            )}
          </ul>
        </Prose>
      </div>
    </article>
  );
}

function Prose({
  heading,
  children
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="ed-mono text-[1.3rem] font-semibold tracking-tight">
        <span className="text-[var(--ed-faint)]">## </span>
        {heading.toLowerCase()}
      </h2>
      <div className="mt-[1.5ch] max-w-[74ch] space-y-[1.5ch]">{children}</div>
    </section>
  );
}
