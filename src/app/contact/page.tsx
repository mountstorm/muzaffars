import { Shell, PageHead, Button, TextLink } from '@/components/site/ui';
import Reveal from '@/components/site/Reveal';
import { pageMetadata } from '@/lib/metadata';
import { SITE } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Contact',
  description:
    'Get in touch — email, GitHub or LinkedIn. Currently seeking a Summer 2027 software engineering internship.',
  path: '/contact',
  og: 'contact'
});

const DETAILS = [
  { k: 'Email', v: SITE.email, href: `mailto:${SITE.email}` },
  { k: 'GitHub', v: 'github.com/mountstorm', href: SITE.github, external: true },
  { k: 'LinkedIn', v: 'linkedin.com/in/muzaffar-', href: SITE.linkedin, external: true },
  { k: 'Based in', v: SITE.location },
  { k: 'Timezone', v: 'Central Time (CT)' }
];

export default function ContactPage() {
  return (
    <Shell>
      <PageHead
        index="05"
        label="Contact"
        title="Say hello."
        lede="Email is fastest. I read everything and reply to anything that isn't a template."
      />

      <div className="grid gap-16 pb-8 lg:grid-cols-[1fr_1fr] lg:gap-24">
        <Reveal>
          <dl className="space-y-0">
            {DETAILS.map(({ k, v, href, external }) => (
              <div
                key={k}
                className="flex flex-wrap items-baseline justify-between gap-4 border-t border-[var(--rule)] py-5"
              >
                <dt className="label">{k}</dt>
                <dd className="mono text-[0.95rem]">
                  {href ? (
                    <a
                      href={href}
                      {...(external
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {})}
                      className="text-[var(--accent)] underline-offset-4 hover:underline"
                    >
                      {v}
                      {external ? ' ↗' : ''}
                    </a>
                  ) : (
                    <span className="text-[var(--ink)]">{v}</span>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={80}>
          <div className="border-t border-[var(--rule)] pt-5">
            <p className="label">Availability</p>
            <p className="display mt-4 text-[clamp(1.6rem,3.5vw,2.25rem)]">
              Seeking a Summer 2027 SWE internship.
            </p>
            <ul className="mt-6 space-y-3 text-[var(--muted)]">
              {[
                'Available May through August 2027',
                'Open to relocation',
                'Returning C Spire intern — received a return offer from the 2026 billing team internship'
              ].map((line) => (
                <li key={line} className="flex gap-3 leading-relaxed">
                  <span
                    aria-hidden="true"
                    className="mt-[0.7em] inline-block h-px w-3 shrink-0 bg-[var(--rule-strong)]"
                  />
                  <span>{line}</span>
                </li>
              ))}
            </ul>

            <p className="measure mt-8 leading-relaxed text-[var(--muted)]">
              A line about the team and the problem is more useful than a job
              title. If you&apos;re hiring, the resume and the three case
              studies cover most of what you&apos;d ask in a screen.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button href={`mailto:${SITE.email}`} variant="solid">
                Send an email
              </Button>
              <Button href="/resume">Read the resume</Button>
            </div>

            <div className="mt-8">
              <TextLink href="/projects">See selected work</TextLink>
            </div>
          </div>
        </Reveal>
      </div>
    </Shell>
  );
}
