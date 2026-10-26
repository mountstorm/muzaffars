import Image from 'next/image';
import Reveal from '@/components/site/Reveal';
import { Shell, SectionHead, Tags, Status, TextLink, Button } from '@/components/site/ui';
import { featuredProjects } from '@/lib/projects';

export default function SelectedWork() {
  return (
    <section aria-labelledby="work" className="py-20 lg:py-28">
      <Shell>
        <SectionHead
          index="01"
          label="Selected work"
          title="Three that show the range."
          lede="An interactive atlas of history, distributed systems research, and developer tooling built end to end."
          action={<Button href="/projects">All work</Button>}
        />

        <ul className="mt-14 space-y-8">
          {featuredProjects.map((project, i) => (
            <Reveal as="li" key={project.id} delay={i * 60}>
              <article className="glass glass-panel glass-hover grid items-center gap-8 p-6 sm:p-8 lg:grid-cols-2 lg:gap-12 lg:p-10">
                <div
                  className={`glass-media relative aspect-[16/11] w-full bg-[var(--surface-2)] ${
                    i % 2 ? 'lg:order-2' : ''
                  }`}
                >
                  <Image
                    src={project.imagePath}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 100vw, 560px"
                    className="object-cover transition-transform duration-700 ease-out hover:scale-[1.03]"
                  />
                </div>

                <div className={i % 2 ? 'lg:order-1' : ''}>
                  <div className="flex items-center gap-4">
                    <span className="mono text-[0.8rem] text-[var(--faint)]">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <Status status={project.status} />
                  </div>

                  <h3 className="display mt-3 text-[clamp(1.75rem,4vw,2.5rem)]">
                    {project.title}
                  </h3>

                  <p className="measure mt-4 leading-relaxed text-[var(--muted)]">
                    {project.headline}
                  </p>

                  <p className="measure mt-4 border-l-2 border-[var(--accent)] pl-4 text-[0.95rem] leading-relaxed text-[var(--muted)]">
                    {project.result}
                  </p>

                  {project.credit && (
                    <p className="mono mt-4 text-[0.82rem] text-[var(--faint)]">
                      {project.credit}
                    </p>
                  )}

                  <div className="mt-6">
                    <Tags tags={project.tags.slice(0, 5)} />
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-x-8">
                    {project.caseStudy && (
                      <TextLink href={`/projects/${project.caseStudy}`}>
                        {project.caseStudyLabel ?? 'Read the case study'}
                      </TextLink>
                    )}
                    {project.secondaryLink && (
                      <TextLink href={project.secondaryLink} external>
                        {project.secondaryButtonText ?? 'Live demo'}
                      </TextLink>
                    )}
                    {project.link && (
                      <TextLink href={project.link} external>
                        GitHub
                      </TextLink>
                    )}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </Shell>
    </section>
  );
}
