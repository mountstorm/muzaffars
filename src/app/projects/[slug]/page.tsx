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

const STATUS_STYLE: Record<Project['status'], string> = {
  Live: 'border-emerald-600/30 bg-emerald-600/10 text-emerald-700 dark:text-emerald-300',
  Research: 'border-blue-600/30 bg-blue-600/10 text-blue-700 dark:text-blue-300',
  'In development':
    'border-amber-600/30 bg-amber-600/10 text-amber-700 dark:text-amber-300',
  'Internal project': 'border-foreground/20 bg-foreground/5 text-foreground/70'
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
    <article className="mx-auto w-full max-w-3xl px-6 pb-24 pt-32 sm:px-10 sm:pt-40">
      <Link
        href="/projects"
        className="inline-flex min-h-[44px] items-center gap-2 text-sm text-foreground/60 underline-offset-4 hover:text-foreground hover:underline"
      >
        <ArrowLeft size={16} aria-hidden="true" />
        All projects
      </Link>

      <header className="mt-4">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-[clamp(2rem,6vw,3.25rem)] font-bold leading-tight tracking-tight">
            {study.title}
          </h1>
          <span
            className={`rounded-full border px-3 py-1 text-xs font-medium ${STATUS_STYLE[project.status]}`}
          >
            {project.status}
          </span>
        </div>
        <p className="mt-4 max-w-[70ch] text-lg leading-relaxed text-foreground/75">
          {study.standfirst}
        </p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full bg-foreground/5 px-3 py-1 text-xs font-medium text-foreground/70"
            >
              {tag}
            </li>
          ))}
        </ul>
      </header>

      <div className="mt-14 space-y-14">
        {[study.overview, study.problem, study.contribution].map((section) => (
          <Prose key={section.heading} heading={section.heading}>
            {section.body.map((p) => (
              <p key={p} className="leading-relaxed text-foreground/80">
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
                  className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border text-xs font-medium tabular-nums text-foreground/60"
                >
                  {i + 1}
                </span>
                <p className="leading-relaxed text-foreground/80">
                  <span className="font-semibold text-foreground">
                    {step.label}.
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
                className="rounded-2xl border border-border bg-card p-5 text-card-foreground"
              >
                <dt className="font-semibold">{item.choice}</dt>
                <dd className="mt-2 leading-relaxed text-foreground/75">
                  {item.why}
                </dd>
              </div>
            ))}
          </dl>
        </Prose>

        <Prose heading={study.results.heading}>
          <ul className="list-disc space-y-2 pl-5 text-foreground/80">
            {study.results.outcomes.map((o) => (
              <li key={o} className="leading-relaxed">
                {o}
              </li>
            ))}
          </ul>
          <h3 className="mt-8 text-base font-semibold">Limitations</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-foreground/70">
            {study.results.limitations.map((l) => (
              <li key={l} className="leading-relaxed">
                {l}
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
                  className="inline-flex min-h-[44px] items-center gap-2 font-medium underline-offset-4 hover:underline"
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
                  className="inline-flex min-h-[44px] items-center gap-2 font-medium underline-offset-4 hover:underline"
                >
                  {project.secondaryButtonText ?? 'Live demo'}
                  <ExternalLink size={15} aria-hidden="true" />
                </a>
              </li>
            )}
            {!project.link && (
              <li className="text-foreground/70">
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
      <h2 className="text-2xl font-bold tracking-tight">{heading}</h2>
      <div className="mt-4 max-w-[72ch] space-y-4">{children}</div>
    </section>
  );
}
