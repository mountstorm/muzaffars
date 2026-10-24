import { Download, Mail, Github, Linkedin, MapPin } from 'lucide-react';
import Layout from '@/components/layout';
import { pageMetadata } from '@/lib/metadata';
import { SITE } from '@/lib/site';
import {
  education,
  experience,
  skillGroups,
  certifications
} from '@/lib/resume';
import { projects } from '@/lib/projects';

const RESUME_PATH = '/Muzaffar_Khaydarov_Resume.pdf';

export const metadata = pageMetadata({
  title: 'Resume',
  description:
    'Software Engineering Intern at C Spire and distributed AI researcher at Ole Miss. Production Perl and Python billing systems, PyTorch split inference, 3.87 GPA.',
  path: '/resume',
  og: 'resume'
});

// Only the public projects belong on the resume page.
const featured = projects.filter((p) => p.link).slice(0, 4);

export default function ResumePage() {
  return (
    <Layout title="Resume" center>
      <div className="mx-auto max-w-3xl">
        <div className="mb-10 flex flex-col items-center gap-4">
          <p className="text-center text-foreground/70">{SITE.availability}</p>
          <a
            href={RESUME_PATH}
            download
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-transform duration-300 hover:scale-105"
          >
            <Download size={18} aria-hidden="true" />
            Download PDF
          </a>
        </div>

        {/* The resume itself is real HTML so it is indexable and readable on a
            phone. The PDF above is generated from the same content. */}
        <article className="rounded-2xl border border-border bg-card p-6 text-card-foreground shadow-sm sm:p-10">
          <header className="border-b border-border pb-6">
            <h2 className="text-3xl font-bold text-foreground">{SITE.name}</h2>
            <p className="mt-1 text-lg text-foreground/70">
              Software Engineer · Distributed AI Researcher
            </p>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-foreground/70">
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={15} aria-hidden="true" />
                {SITE.location}
              </span>
              <a
                href={`mailto:${SITE.email}`}
                className="inline-flex items-center gap-1.5 hover:text-foreground hover:underline"
              >
                <Mail size={15} aria-hidden="true" />
                {SITE.email}
              </a>
              <a
                href={SITE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-foreground hover:underline"
              >
                <Github size={15} aria-hidden="true" />
                github.com/mountstorm
              </a>
              <a
                href={SITE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-foreground hover:underline"
              >
                <Linkedin size={15} aria-hidden="true" />
                LinkedIn
              </a>
            </div>
          </header>

          <Section title="Education">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <h4 className="font-semibold text-foreground">{education.school}</h4>
              <span className="text-sm text-foreground/60">{education.dates}</span>
            </div>
            <p className="text-foreground/80">{education.degree}</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-foreground/70">
              {education.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </Section>

          <Section title="Experience">
            <div className="space-y-6">
              {experience.map((role) => (
                <div key={role.title + role.year}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                    <h4 className="font-semibold text-foreground">{role.title}</h4>
                    <span className="text-sm text-foreground/60">{role.year}</span>
                  </div>
                  <p className="text-foreground/80">
                    {role.company}
                    {role.location ? ` · ${role.location}` : ''}
                  </p>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-foreground/70">
                    {role.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Selected Projects">
            <ul className="space-y-3">
              {featured.map((p) => (
                <li key={p.id}>
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-foreground hover:underline"
                  >
                    {p.title} ↗
                  </a>
                  <p className="text-foreground/70">{p.description}</p>
                  <p className="mt-1 text-sm text-foreground/50">
                    {p.tags.join(' · ')}
                  </p>
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Skills">
            <dl className="space-y-3">
              {skillGroups.map((group) => (
                <div
                  key={group.label}
                  className="flex flex-col gap-1 sm:flex-row sm:gap-4"
                >
                  <dt className="shrink-0 font-semibold text-foreground sm:w-56">
                    {group.label}
                  </dt>
                  <dd className="text-foreground/70">
                    {group.skills.map((s) => s.name).join(', ')}
                  </dd>
                </div>
              ))}
            </dl>
          </Section>

          <Section title="Certifications">
            <ul className="list-disc space-y-1 pl-5 text-foreground/70">
              {certifications.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </Section>
        </article>
      </div>
    </Layout>
  );
}

function Section({
  title,
  children
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-8">
      <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-foreground/50">
        {title}
      </h3>
      {children}
    </section>
  );
}
