import {
  Buffer,
  Section,
  Field,
  MarkedList,
  Comment,
  Cmd,
  PathLink,
  sans
} from '@/components/shell/doc';
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

export default function ResumePage() {
  return (
    <Buffer
      path="~/muzaffarkhaydarov.com/resume.pdf"
      title="resume"
      lede="The same content as the PDF, as readable text. The download is generated from this."
      meta={
        <div className="flex flex-wrap items-center gap-[2ch]">
          <Cmd href={RESUME_PATH} primary>
            download pdf
          </Cmd>
          <Comment tone="add">{SITE.availability}</Comment>
        </div>
      }
    >
      <Section heading="contact">
        <dl className="space-y-[1ch]">
          <Field k="email">
            <a
              href={`mailto:${SITE.email}`}
              className="text-[var(--ed-accent)] underline-offset-4 hover:underline"
            >
              {SITE.email}
            </a>
          </Field>
          <Field k="github">github.com/mountstorm</Field>
          <Field k="linkedin">linkedin.com/in/muzaffar-</Field>
          <Field k="location">{SITE.location}</Field>
        </dl>
      </Section>

      <Section heading="education">
        <div className="border-l border-[var(--ed-rule)] pl-[2ch]">
          <div className="flex flex-col gap-[0.25ch] sm:flex-row sm:items-baseline sm:justify-between sm:gap-[3ch]">
            <h3 className="ed-mono text-[1rem] font-semibold">
              {education.school}
            </h3>
            <span className="ed-mono shrink-0 text-[12px] tabular-nums text-[var(--ed-faint)]">
              {education.dates}
            </span>
          </div>
          <p className={`${sans} mt-[0.5ch] text-[var(--ed-dim)]`}>
            {education.degree}
          </p>
          <div className="mt-[1ch]">
            <MarkedList items={education.highlights} mark="add" />
          </div>
          <div className="mt-[1.5ch]">
            <Comment tone="key">
              coursework: {education.coursework.join(', ')}
            </Comment>
          </div>
        </div>
      </Section>

      <Section heading="experience">
        <ol className="space-y-[3ch]">
          {experience.map((role) => (
            <li
              key={role.title + role.year}
              className="border-l border-[var(--ed-rule)] pl-[2ch]"
            >
              <div className="flex flex-col gap-[0.25ch] sm:flex-row sm:items-baseline sm:justify-between sm:gap-[3ch]">
                <h3 className="ed-mono text-[1rem] font-semibold">
                  {role.title}
                  <span className="font-normal text-[var(--ed-dim)]">
                    {' '}
                    @ {role.company}
                  </span>
                </h3>
                <span className="ed-mono shrink-0 text-[12px] tabular-nums text-[var(--ed-faint)]">
                  {role.year}
                </span>
              </div>
              {role.company.startsWith('C Spire') && (
                <p className="ed-mono mt-[0.5ch] text-[12px] text-[var(--ed-add)]">
                  [received return offer]
                </p>
              )}
              <div className="mt-[1ch]">
                <MarkedList items={role.bullets} mark="add" />
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section heading="leadership">
        {leadership.map((entry) => (
          <div
            key={entry.title}
            className="border-l border-[var(--ed-rule)] pl-[2ch]"
          >
            <div className="flex flex-col gap-[0.25ch] sm:flex-row sm:items-baseline sm:justify-between sm:gap-[3ch]">
              <h3 className="ed-mono text-[1rem] font-semibold">
                {entry.title}
                <span className="font-normal text-[var(--ed-dim)]">
                  {' '}
                  @ {entry.organization}
                </span>
              </h3>
              <span className="ed-mono shrink-0 text-[12px] tabular-nums text-[var(--ed-faint)]">
                {entry.year}
              </span>
            </div>
            <div className="mt-[1ch]">
              <MarkedList items={entry.bullets} mark="add" />
            </div>
          </div>
        ))}
      </Section>

      <Section heading="selected projects">
        <ul className="space-y-[2ch]">
          {featured.map((p) => (
            <li key={p.id} className="border-l border-[var(--ed-rule)] pl-[2ch]">
              <PathLink href={p.link!} external>
                {p.title}
              </PathLink>
              <p className={`${sans} mt-[0.25ch] max-w-[74ch] text-[var(--ed-dim)]`}>
                {p.description}
              </p>
              <p className="ed-mono mt-[0.5ch] text-[12px] text-[var(--ed-string)]">
                {p.tags.join(' · ')}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <Section heading="skills">
        <dl className="space-y-[1ch]">
          {skillGroups.map((g) => (
            <Field key={g.label} k={g.label.toLowerCase()}>
              {g.skills.map((s) => s.name).join(', ')}
            </Field>
          ))}
        </dl>
      </Section>

      <Section heading="certifications">
        <MarkedList items={certifications} mark="neutral" />
      </Section>
    </Buffer>
  );
}
