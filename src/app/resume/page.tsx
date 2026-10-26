import { Download } from 'lucide-react';
import Reveal from '@/components/site/Reveal';
import { Shell, PageHead, Button, TextLink, Tags } from '@/components/site/ui';
import { pageMetadata } from '@/lib/metadata';
import { SITE } from '@/lib/site';
import {
  education,
  experience,
  leadership,
  skillGroups,
  certifications
} from '@/lib/resume';
import { projects } from '@/lib/projects';

const RESUME_PATH = '/Muzaffar-Khaydarov-Resume.pdf';

export const metadata = pageMetadata({
  title: 'Resume',
  description:
    'Summer 2026 Software Engineering Intern at C Spire with a return offer, and distributed AI researcher at Ole Miss. Production Python, KornShell and Django billing systems, 3.87 GPA.',
  path: '/resume',
  og: 'resume'
});

const featured = projects.filter((p) => p.link).slice(0, 4);

function Block({
  label,
  children
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section className="glass glass-panel my-5 grid gap-4 p-6 lg:grid-cols-[14rem_1fr] lg:gap-12 lg:p-9">
      <h2 className="label">{label}</h2>
      <div>{children}</div>
    </section>
  );
}

const Bullets = ({ items }: { items: string[] }) => (
  <ul className="measure mt-4 space-y-3">
    {items.map((b) => (
      <li key={b} className="flex gap-3 leading-relaxed text-[var(--muted)]">
        <span
          aria-hidden="true"
          className="mt-[0.7em] inline-block h-px w-3 shrink-0 bg-[var(--rule-strong)]"
        />
        <span>{b}</span>
      </li>
    ))}
  </ul>
);

export default function ResumePage() {
  return (
    <Shell>
      <PageHead
        index="04"
        label="Resume"
        title="Resume"
        lede="The same content as the PDF, readable here. The download is generated from this."
      />

      <div className="flex flex-wrap items-center gap-4 pb-10">
        <Button href={RESUME_PATH} variant="solid">
          <Download size={16} aria-hidden="true" className="mr-2" />
          Download PDF
        </Button>
        <p className="mono text-[0.85rem] text-[var(--muted)]">
          {SITE.availability}
        </p>
      </div>

      <Reveal>
        <Block label="Contact">
          <dl className="grid gap-x-10 gap-y-3 sm:grid-cols-2">
            {[
              ['Email', SITE.email, `mailto:${SITE.email}`],
              ['GitHub', 'github.com/mountstorm', SITE.github],
              ['LinkedIn', 'linkedin.com/in/muzaffar-', SITE.linkedin],
              ['Location', SITE.location, '']
            ].map(([k, v, href]) => (
              <div key={k} className="flex items-baseline gap-4">
                <dt className="label w-[6rem] shrink-0">{k}</dt>
                <dd className="mono text-[0.9rem]">
                  {href ? (
                    <a
                      href={href}
                      className="text-[var(--accent)] underline-offset-4 hover:underline"
                    >
                      {v}
                    </a>
                  ) : (
                    v
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </Block>
      </Reveal>

      <Reveal>
        <Block label="Education">
          <h3 className="text-[1.2rem] font-medium">{education.school}</h3>
          <p className="mt-1 text-[var(--muted)]">{education.degree}</p>
          <p className="mono mt-1 text-[0.85rem] text-[var(--faint)]">
            {education.dates} · {education.location}
          </p>
          <Bullets items={education.highlights} />
          <p className="mono mt-5 text-[0.85rem] text-[var(--faint)]">
            Coursework: {education.coursework.join(', ')}
          </p>
        </Block>
      </Reveal>

      <Reveal>
        <Block label="Experience">
          <ol className="space-y-10">
            {experience.map((role) => (
              <li key={role.title + role.year}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <h3 className="text-[1.2rem] font-medium">{role.title}</h3>
                  <span className="mono text-[0.85rem] tabular-nums text-[var(--faint)]">
                    {role.year}
                  </span>
                </div>
                <p className="mt-1 text-[var(--muted)]">
                  {role.company}
                  {role.location ? ` · ${role.location}` : ''}
                </p>
                {role.company.startsWith('C Spire') && (
                  <p className="label mt-2 text-[var(--leaf)]">Received return offer</p>
                )}
                <Bullets items={role.bullets} />
              </li>
            ))}
          </ol>
        </Block>
      </Reveal>

      <Reveal>
        <Block label="Leadership">
          {leadership.map((entry) => (
            <div key={entry.title}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <h3 className="text-[1.2rem] font-medium">{entry.title}</h3>
                <span className="mono text-[0.85rem] tabular-nums text-[var(--faint)]">
                  {entry.year}
                </span>
              </div>
              <p className="mt-1 text-[var(--muted)]">{entry.organization}</p>
              <Bullets items={entry.bullets} />
            </div>
          ))}
        </Block>
      </Reveal>

      <Reveal>
        <Block label="Selected projects">
          <ul className="space-y-8">
            {featured.map((p) => (
              <li key={p.id}>
                <TextLink href={p.link!} external>
                  {p.title}
                </TextLink>
                <p className="measure mt-2 leading-relaxed text-[var(--muted)]">
                  {p.description}
                </p>
                <div className="mt-3">
                  <Tags tags={p.tags} />
                </div>
              </li>
            ))}
          </ul>
        </Block>
      </Reveal>

      <Reveal>
        <Block label="Skills">
          <dl className="space-y-4">
            {skillGroups.map((g) => (
              <div key={g.label} className="flex flex-col gap-1 sm:flex-row sm:gap-8">
                <dt className="label shrink-0 sm:w-[11rem]">{g.label}</dt>
                <dd className="mono text-[0.9rem] leading-relaxed text-[var(--muted)]">
                  {g.skills.map((s) => s.name).join(', ')}
                </dd>
              </div>
            ))}
          </dl>
        </Block>
      </Reveal>

      <Reveal>
        <Block label="Certifications">
          <Bullets items={certifications} />
        </Block>
      </Reveal>
    </Shell>
  );
}
