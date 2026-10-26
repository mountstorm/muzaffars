import { Shell, PageHead } from '@/components/site/ui';
import ContactForm from '@/components/site/ContactForm';
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
        title="Contact"
        lede="Email is fastest. I read everything and reply to anything that isn't a template."
      />

      <div className="grid gap-16 pb-8 lg:grid-cols-[1fr_1fr] lg:gap-24">
        <Reveal>
          <dl className="space-y-0">
            {DETAILS.map(({ k, v, href, external }) => (
              <div
                key={k}
                className="flex flex-wrap items-baseline justify-between gap-4 border-t border-[var(--glass-hairline)] py-5"
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
          <ContactForm />
        </Reveal>
      </div>
    </Shell>
  );
}
