import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { featuredProjects, type Project } from '@/lib/projects';

const STATUS_STYLE: Record<Project['status'], string> = {
  Live: 'border-emerald-600/30 bg-emerald-600/10 text-emerald-700 dark:text-emerald-300',
  Research: 'border-blue-600/30 bg-blue-600/10 text-blue-700 dark:text-blue-300',
  'In development':
    'border-amber-600/30 bg-amber-600/10 text-amber-700 dark:text-amber-300',
  'Internal project':
    'border-foreground/20 bg-foreground/5 text-foreground/70'
};

export default function FeaturedProjects() {
  return (
    <section
      aria-labelledby="selected-projects"
      className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-10 sm:py-24"
    >
      <h2
        id="selected-projects"
        className="text-2xl font-bold tracking-tight sm:text-3xl"
      >
        Selected projects
      </h2>
      <p className="mt-2 max-w-[70ch] text-foreground/70">
        Three that best show the range: data engineering, distributed systems
        research, and product work.
      </p>

      <ul className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
        {featuredProjects.map((project) => (
          <li key={project.id}>
            <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card text-card-foreground">
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-foreground/5">
                <Image
                  src={project.imagePath}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>

              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-semibold">{project.title}</h3>
                  <span
                    className={`shrink-0 rounded-full border px-2.5 py-1 text-xs font-medium ${STATUS_STYLE[project.status]}`}
                  >
                    {project.status}
                  </span>
                </div>

                <p className="mt-3 text-left text-foreground/80">
                  {project.headline}
                </p>

                <p className="mt-3 text-left text-sm text-foreground/60">
                  {project.result}
                </p>

                <ul className="mt-4 flex flex-wrap gap-2">
                  {project.tags.slice(0, 5).map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full bg-foreground/5 px-2.5 py-1 text-xs font-medium text-foreground/70"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex flex-wrap gap-x-5 gap-y-2 pt-6">
                  {project.caseStudy && (
                    <Link
                      href={`/projects/${project.caseStudy}`}
                      className="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-medium underline-offset-4 hover:underline"
                    >
                      Read the {project.title} case study
                      <ArrowRight size={15} aria-hidden="true" />
                    </Link>
                  )}
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[44px] items-center text-sm text-foreground/70 underline-offset-4 hover:text-foreground hover:underline"
                    >
                      {project.title} on GitHub
                    </a>
                  )}
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>

      <Link
        href="/projects"
        className="mt-10 inline-flex min-h-[44px] items-center gap-2 rounded-full border border-foreground/25 px-6 py-3 text-base font-medium transition-colors hover:bg-foreground/5"
      >
        View all projects
        <ArrowRight size={18} aria-hidden="true" />
      </Link>
    </section>
  );
}
