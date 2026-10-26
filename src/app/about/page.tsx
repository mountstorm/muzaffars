import Image from 'next/image';
import {
  Buffer,
  Section,
  Prose,
  Comment,
  MarkedList,
  Field,
  Cmd,
  sans
} from '@/components/shell/doc';
import { pageMetadata } from '@/lib/metadata';
import { roles, education, leadership, skillGroups, certifications } from '@/lib/resume';

export const metadata = pageMetadata({
  title: 'About',
  description:
    'Junior at Ole Miss studying CS and math. Production billing systems at C Spire, distributed inference research with Prof. Feng Wang, and the path that got me here.',
  path: '/about',
  og: 'about'
});

export default function AboutPage() {
  const timeline = [...roles].reverse();

  return (
    <Buffer
      path="~/muzaffarkhaydarov.com/about.md"
      title="about"
      lede="Junior at Ole Miss studying computer science and maths, undergraduate researcher on distributed AI systems, and a 2026 software engineering intern at C Spire."
    >
      <Section>
        <div className="flex flex-col gap-[3ch] sm:flex-row">
          <div className="relative aspect-[4/5] w-full max-w-[28ch] shrink-0 overflow-hidden border border-[var(--ed-rule)]">
            <Image
              src="/images/profile.png"
              alt="Muzaffar Khaydarov"
              fill
              className="object-cover object-center"
              priority
              sizes="(max-width: 640px) 100vw, 28ch"
            />
          </div>
          <dl className="min-w-0 flex-1 space-y-[1ch]">
            <Field k="name">Muzaffar Khaydarov</Field>
            <Field k="role">Software Engineer &amp; Distributed AI Researcher</Field>
            <Field k="based">{education.location}</Field>
            <Field k="school">{education.school}</Field>
            <Field k="degree">{education.degree}</Field>
            <Field k="gpa">3.87 / 4.0</Field>
            <Field k="seeking">Summer 2027 SWE internship</Field>
          </dl>
        </div>
      </Section>

      <Section heading="what I work on">
        <Prose>
          <p>
            I like problems that span layers. At one end, billing systems
            processing thousands of records a week, where a wrong branch shows
            up on somebody&apos;s bill. At the other, running one object
            detection model across a laptop and two Linux VMs and proving the
            answer is still the same.
          </p>
          <p>
            Right now that means distributed inference research with Prof. Feng
            Wang, in collaboration with the University of Memphis, and whatever
            I am building on the side.
          </p>
        </Prose>
      </Section>

      <Section heading="beyond code">
        <Prose>
          <p>
            Chess and football. Camus, Kafka and Dostoevsky. Maths puzzles when
            I want the kind of problem that has an answer.
          </p>
        </Prose>
        <div className="mt-[1.5ch]">
          <Comment tone="key">
            Photos of most of this live under{' '}
            <span className="text-[var(--ed-accent)]">gallery/</span>.
          </Comment>
        </div>
      </Section>

      <Section heading="where I've been">
        <ol className="space-y-[3ch]">
          {timeline.map((role, i) => (
            <li
              key={role.title + role.year}
              className="ed-diff border-l border-[var(--ed-rule)] pl-[2ch]"
              style={{ '--ed-delay': `${i * 70}ms` } as React.CSSProperties}
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
              <div className="mt-[1ch]">
                <MarkedList items={role.bullets} mark="add" />
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section heading="leadership">
        {leadership.map((entry) => (
          <div key={entry.title} className="border-l border-[var(--ed-rule)] pl-[2ch]">
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

      <Section heading="toolchain">
        <div className="space-y-[2.5ch]">
          {skillGroups.map((group) => (
            <div key={group.label}>
              <h3 className="ed-mono text-[13px] text-[var(--ed-key)]">
                {group.label.toLowerCase()}:
              </h3>
              <ul className="mt-[0.75ch] space-y-[0.5ch]">
                {group.skills.map((s) => (
                  <li
                    key={s.name}
                    className="flex flex-col gap-[0.1ch] sm:flex-row sm:gap-[2ch]"
                  >
                    <span className="ed-mono shrink-0 text-[13px] text-[var(--ed-ink)] sm:w-[24ch]">
                      {s.name}
                    </span>
                    <span className={`${sans} text-[0.9rem] text-[var(--ed-faint)]`}>
                      {s.evidence}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-[2.5ch]">
          <Comment>certifications: {certifications.join(', ')}</Comment>
        </div>
      </Section>

      <Section>
        <div className="flex flex-wrap gap-[2ch]">
          <Cmd href="/projects" primary>
            ls projects/
          </Cmd>
          <Cmd href="/resume">open resume.pdf</Cmd>
          <Cmd href="/contact">contact</Cmd>
        </div>
      </Section>
    </Buffer>
  );
}
