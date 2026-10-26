import Image from 'next/image';
import Reveal from '@/components/site/Reveal';
import { Shell, PageHead, Tags, Status, TextLink } from '@/components/site/ui';
import { pageMetadata } from '@/lib/metadata';
import { projects } from '@/lib/projects';

export const metadata = pageMetadata({
  title: 'Work',
  description:
    'Distributed inference research, an H-1B database built from 831k USCIS filings, a co-founded shopping app with paying users, and production billing systems at C Spire.',
  path: '/projects',
  og: 'projects'
});

export default function ProjectsPage() {
  const listed = [...projects].sort(
    (a, b) => Number(!!b.link) - Number(!!a.link)
  );

  return (
    <Shell>
      <PageHead
        index="01"
        label="Work"
        title="Everything I can show."
        lede="Internal work at C Spire is described without the code. Everything else links to the repository."
      />

      <ul className="pb-8">
        {listed.map((project, i) => (
          <Reveal as="li" key={project.id} delay={(i % 3) * 50}>
            <article className="grid gap-6 border-t border-[var(--rule)] py-10 lg:grid-cols-[18rem_1fr] lg:gap-12">
              <div className="relative aspect-[16/10] w-full overflow-hidden border border-[var(--rule)] bg-[var(--surface-2)] lg:aspect-[4/3]">
                <Image
                  src={project.imagePath}
                  alt=""
                  fill
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 288px"
                  className="object-cover"
                />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                  <span className="mono text-[0.8rem] text-[var(--faint)]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h2 className="text-[1.35rem] font-medium">{project.title}</h2>
                  <Status status={project.status} />
                </div>

                <p className="measure mt-4 leading-relaxed text-[var(--muted)]">
                  {project.description}
                </p>

                {project.credit && (
                  <p className="mono mt-3 text-[0.82rem] text-[var(--faint)]">
                    {project.credit}
                  </p>
                )}

                <div className="mt-5">
                  <Tags tags={project.tags} />
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-x-8">
                  {project.caseStudy && (
                    <TextLink href={`/projects/${project.caseStudy}`}>
                      {project.caseStudyLabel ?? 'Case study'}
                    </TextLink>
                  )}
                  {project.link && (
                    <TextLink href={project.link} external>
                      GitHub
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
              </div>
            </article>
          </Reveal>
        ))}
      </ul>
    </Shell>
  );
}
