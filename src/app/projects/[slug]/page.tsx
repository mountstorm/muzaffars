import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Reveal from '@/components/site/Reveal';
import { Shell, Tags, Status, TextLink, Button } from '@/components/site/ui';
import { caseStudies, getCaseStudy } from '@/lib/case-studies';
import { projects } from '@/lib/projects';
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

function Block({
  label,
  children
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section className="glass glass-panel my-5 grid gap-5 p-6 lg:grid-cols-[14rem_1fr] lg:gap-12 lg:p-9">
      <h2 className="label">{label}</h2>
      <div className="measure">{children}</div>
    </section>
  );
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const study = getCaseStudy(params.slug);
  if (!study) notFound();
  const project = projects.find((p) => p.id === study.projectId)!;

  return (
    <Shell>
      <article className="pb-8">
        <div className="pt-10 lg:pt-16">
          <TextLink href="/projects">
            <span className="inline-flex items-center gap-2">
              <ArrowLeft size={14} aria-hidden="true" />
              All projects
            </span>
          </TextLink>
        </div>

        <header className="pb-12 pt-6">
          <div className="flex flex-wrap items-center gap-5">
            <p className="label">Case study</p>
            <Status status={project.status} />
          </div>
          <h1 className="display wipe mt-5 text-[clamp(2.6rem,8vw,5rem)]">
            {study.title}
          </h1>
          <p className="measure mt-6 text-[1.0625rem] leading-relaxed text-[var(--muted)] sm:text-[1.2rem]">
            {study.standfirst}
          </p>
          <div className="mt-7">
            <Tags tags={project.tags} />
          </div>
        </header>

        {[study.overview, study.problem, study.contribution].map((section) => (
          <Reveal key={section.heading}>
            <Block label={section.heading}>
              <div className="space-y-4">
                {section.body.map((p) => (
                  <p key={p} className="leading-relaxed text-[var(--muted)]">
                    {p}
                  </p>
                ))}
              </div>
            </Block>
          </Reveal>
        ))}

        <Reveal>
          <Block label={study.architecture.heading}>
            <ol className="space-y-6">
              {study.architecture.steps.map((step, i) => (
                <li key={step.label} className="flex gap-5">
                  <span
                    aria-hidden="true"
                    className="mono mt-0.5 shrink-0 text-[0.8rem] tabular-nums text-[var(--faint)]"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="leading-relaxed text-[var(--muted)]">
                    <span className="font-medium text-[var(--ink)]">
                      {step.label}.
                    </span>{' '}
                    {step.detail}
                  </p>
                </li>
              ))}
            </ol>
          </Block>
        </Reveal>

        <Reveal>
          <Block label={study.decisions.heading}>
            <dl className="space-y-8">
              {study.decisions.items.map((item) => (
                <div key={item.choice} className="rounded-[var(--r-media)] border-l-2 border-[var(--accent)] bg-[var(--glass-bg)] py-4 pl-5 pr-5">
                  <dt className="font-medium">{item.choice}</dt>
                  <dd className="mt-2 leading-relaxed text-[var(--muted)]">
                    {item.why}
                  </dd>
                </div>
              ))}
            </dl>
          </Block>
        </Reveal>

        <Reveal>
          <Block label={study.results.heading}>
            <ul className="space-y-3">
              {study.results.outcomes.map((o) => (
                <li key={o} className="flex gap-3 leading-relaxed text-[var(--muted)]">
                  <span
                    aria-hidden="true"
                    className="mt-[0.7em] inline-block h-px w-3 shrink-0 bg-[var(--leaf)]"
                  />
                  <span>{o}</span>
                </li>
              ))}
            </ul>
            <h3 className="label mt-10">Limitations</h3>
            <ul className="mt-4 space-y-3">
              {study.results.limitations.map((l) => (
                <li key={l} className="flex gap-3 leading-relaxed text-[var(--faint)]">
                  <span
                    aria-hidden="true"
                    className="mt-[0.7em] inline-block h-px w-3 shrink-0 bg-[var(--rule-strong)]"
                  />
                  <span>{l}</span>
                </li>
              ))}
            </ul>
          </Block>
        </Reveal>

        <Reveal>
          <Block label="Links">
            <div className="flex flex-wrap gap-x-8 gap-y-2">
              {project.link && (
                <TextLink href={project.link} external>
                  Repository on GitHub
                </TextLink>
              )}
              {project.secondaryLink && (
                <TextLink href={project.secondaryLink} external>
                  {project.secondaryButtonText ?? 'Live demo'}
                </TextLink>
              )}
              {!project.link && (
                <span className="label">{project.noLinkLabel}</span>
              )}
            </div>
          </Block>
        </Reveal>

        <div className="flex flex-wrap gap-4 pt-8">
          <Button href="/projects" variant="solid">
            All projects
          </Button>
          <Button href="/contact">Get in touch</Button>
        </div>
      </article>
    </Shell>
  );
}
