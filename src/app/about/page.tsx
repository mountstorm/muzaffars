import Image from 'next/image';
import Reveal from '@/components/site/Reveal';
import { Shell, PageHead, SectionHead, Button } from '@/components/site/ui';
import { pageMetadata } from '@/lib/metadata';
import { roles, education, leadership, skillGroups, certifications } from '@/lib/resume';

export const metadata = pageMetadata({
  title: 'About',
  description:
    'Junior at Ole Miss studying CS and maths. Production billing systems at C Spire, distributed inference research with Prof. Feng Wang, and the path that got me here.',
  path: '/about',
  og: 'about'
});

export default function AboutPage() {
  const timeline = [...roles].reverse();

  return (
    <Shell>
      <PageHead
        index="03"
        label="About"
        title="Muzaffar Khaydarov"
        lede="Junior at Ole Miss studying computer science and maths, undergraduate researcher on distributed AI systems, and a 2026 software engineering intern at C Spire."
      />

      <div className="grid gap-12 pb-20 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <Reveal>
          <div className="relative aspect-[4/5] w-full max-w-[420px] overflow-hidden border border-[var(--rule)]">
            <Image
              src="/images/portrait.webp"
              alt="Muzaffar Khaydarov"
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 420px"
              className="object-cover object-[center_22%]"
            />
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="space-y-8">
            <div>
              <p className="label">What I work on</p>
              <p className="measure mt-4 text-[1.0625rem] leading-relaxed text-[var(--muted)]">
                I like problems that span layers. At one end, billing systems
                processing thousands of records a week, where a wrong branch
                shows up on somebody&apos;s bill. At the other, running one
                object detection model across a laptop and two Linux VMs and
                proving the answer is still the same.
              </p>
              <p className="measure mt-4 text-[1.0625rem] leading-relaxed text-[var(--muted)]">
                Right now that means distributed inference research with Prof.
                Feng Wang, in collaboration with the University of Memphis, and
                whatever I&apos;m building on the side.
              </p>
            </div>

            <div>
              <p className="label">Beyond code</p>
              <p className="measure mt-4 text-[1.0625rem] leading-relaxed text-[var(--muted)]">
                Chess and football. Camus, Kafka and Dostoevsky. Maths puzzles
                when I want the kind of problem that has an answer.
              </p>
            </div>

            <dl className="grid grid-cols-2 gap-6 border-t border-[var(--rule)] pt-6 sm:grid-cols-3">
              {[
                ['Degree', 'B.S. Computer Science'],
                ['Minor', 'Mathematics'],
                ['GPA', '3.87 / 4.0'],
                ['Honors', 'Barksdale, top 5%'],
                ['Based in', education.location],
                ['Graduating', 'May 2028']
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="label">{k}</dt>
                  <dd className="mono mt-1.5 text-[0.9rem] text-[var(--ink)]">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>

      <section aria-labelledby="path" className="pb-20">
        <SectionHead index="—" label="Timeline" title="The path here." />
        <ol className="mt-14 space-y-12">
          {timeline.map((role, i) => (
            <Reveal as="li" key={role.title + role.year} delay={(i % 3) * 50}>
              <div className="grid gap-4 border-t border-[var(--rule)] pt-8 lg:grid-cols-[14rem_1fr] lg:gap-12">
                <p className="mono text-[0.82rem] tabular-nums text-[var(--faint)]">
                  {role.year}
                </p>
                <div>
                  <h3 className="text-[1.2rem] font-medium">{role.title}</h3>
                  <p className="mt-1 text-[var(--muted)]">{role.company}</p>
                  <ul className="measure mt-5 space-y-3">
                    {role.bullets.map((b) => (
                      <li key={b} className="flex gap-3 leading-relaxed text-[var(--muted)]">
                        <span
                          aria-hidden="true"
                          className="mt-[0.7em] inline-block h-px w-3 shrink-0 bg-[var(--rule-strong)]"
                        />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}

          {leadership.map((entry) => (
            <Reveal as="li" key={entry.title}>
              <div className="grid gap-4 border-t border-[var(--rule)] pt-8 lg:grid-cols-[14rem_1fr] lg:gap-12">
                <p className="mono text-[0.82rem] tabular-nums text-[var(--faint)]">
                  {entry.year}
                </p>
                <div>
                  <h3 className="text-[1.2rem] font-medium">{entry.title}</h3>
                  <p className="mt-1 text-[var(--muted)]">{entry.organization}</p>
                  <ul className="measure mt-5 space-y-3">
                    {entry.bullets.map((b) => (
                      <li key={b} className="flex gap-3 leading-relaxed text-[var(--muted)]">
                        <span
                          aria-hidden="true"
                          className="mt-[0.7em] inline-block h-px w-3 shrink-0 bg-[var(--rule-strong)]"
                        />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </section>

      <section aria-labelledby="toolchain" className="pb-16">
        <SectionHead
          index="—"
          label="Toolchain"
          title="What I reach for."
          lede="Every entry is backed by shipped work. If it isn't here, nothing public demonstrates it yet."
        />
        <div className="mt-14 space-y-12">
          {skillGroups.map((group, gi) => (
            <Reveal key={group.label} delay={gi * 60}>
              <div className="grid gap-4 border-t border-[var(--rule)] pt-8 lg:grid-cols-[14rem_1fr] lg:gap-12">
                <p className="label">{group.label}</p>
                <ul className="space-y-3">
                  {group.skills.map((s) => (
                    <li
                      key={s.name}
                      className="flex flex-col gap-1 sm:flex-row sm:gap-6"
                    >
                      <span className="mono shrink-0 text-[0.9rem] sm:w-[14rem]">
                        {s.name}
                      </span>
                      <span className="text-[0.95rem] leading-relaxed text-[var(--muted)]">
                        {s.evidence}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
          <p className="mono border-t border-[var(--rule)] pt-8 text-[0.88rem] text-[var(--faint)]">
            Certifications: {certifications.join(' · ')}
          </p>
        </div>
      </section>

      <div className="flex flex-wrap gap-4 pb-8">
        <Button href="/projects" variant="solid">
          See selected work
        </Button>
        <Button href="/contact">Get in touch</Button>
      </div>
    </Shell>
  );
}
