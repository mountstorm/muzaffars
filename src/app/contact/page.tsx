import { Buffer, Section, Field, Comment, Cmd, Prose } from '@/components/shell/doc';
import { pageMetadata } from '@/lib/metadata';
import { SITE } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Contact',
  description:
    'Get in touch — email, GitHub or LinkedIn. Currently seeking a Summer 2027 software engineering internship.',
  path: '/contact',
  og: 'contact'
});

export default function ContactPage() {
  return (
    <Buffer
      path="~/muzaffarkhaydarov.com/contact.toml"
      title="contact"
      lede="The fastest route is email. I read everything and reply to anything that is not a template."
    >
      <Section heading="reach me">
        <dl className="space-y-[1ch]">
          <Field k="email">
            <a
              href={`mailto:${SITE.email}`}
              className="text-[var(--ed-accent)] underline-offset-4 hover:underline"
            >
              {SITE.email}
            </a>
          </Field>
          <Field k="github">
            <a
              href={SITE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--ed-accent)] underline-offset-4 hover:underline"
            >
              github.com/mountstorm ↗
            </a>
          </Field>
          <Field k="linkedin">
            <a
              href={SITE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--ed-accent)] underline-offset-4 hover:underline"
            >
              linkedin.com/in/muzaffar- ↗
            </a>
          </Field>
          <Field k="location">{SITE.location}</Field>
          <Field k="timezone">America/Chicago (CT)</Field>
        </dl>
      </Section>

      <Section heading="availability">
        <dl className="space-y-[1ch]">
          <Field k="seeking">Summer 2027 SWE internship</Field>
          <Field k="window">May – August 2027</Field>
          <Field k="relocation">open</Field>
        </dl>
        <div className="mt-[2ch] space-y-[0.75ch]">
          <Comment tone="add">
            Returning C Spire intern — received a return offer from the 2026
            billing team internship.
          </Comment>
          <Comment>
            Response time is usually under a day during term, longer around
            finals.
          </Comment>
        </div>
      </Section>

      <Section heading="what to send">
        <Prose>
          <p>
            A line about the team and the problem is more useful than a job
            title. If you are hiring, the resume and the three case studies
            under <span className="ed-mono text-[var(--ed-key)]">projects/</span>{' '}
            cover most of what you would ask in a screen.
          </p>
        </Prose>
        <div className="mt-[2.5ch] flex flex-wrap gap-[2ch]">
          <Cmd href={`mailto:${SITE.email}`} primary>
            compose email
          </Cmd>
          <Cmd href="/resume">open resume.pdf</Cmd>
          <Cmd href="/projects">ls projects/</Cmd>
        </div>
      </Section>
    </Buffer>
  );
}
