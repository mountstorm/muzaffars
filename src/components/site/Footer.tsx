import Link from 'next/link';
import { SITE } from '@/lib/site';

const ELSEWHERE = [
  { href: SITE.github, label: 'GitHub' },
  { href: SITE.linkedin, label: 'LinkedIn' },
  { href: `mailto:${SITE.email}`, label: 'Email' }
];

export default function Footer() {
  return (
    <footer className="px-3 pb-3 pt-24 sm:px-5 sm:pb-5">
      <div className="glass glass-panel mx-auto max-w-[1240px] px-6 py-14 lg:px-10">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="label">Get in touch</p>
            <p className="display mt-4 text-[clamp(1.8rem,4vw,2.75rem)]">
              Contact
            </p>
            <a
              href={`mailto:${SITE.email}`}
              className="mono mt-4 inline-flex min-h-[44px] items-center text-[0.95rem] text-[var(--accent)] underline-offset-4 hover:underline"
            >
              {SITE.email}
            </a>
          </div>

          <div>
            <p className="label">Pages</p>
            <ul className="mt-4 space-y-1">
              {[
                ['/projects', 'Projects'],
                ['/about', 'About'],
                ['/resume', 'Resume'],
                ['/gallery', 'Gallery'],
                ['/contact', 'Contact']
              ].map(([href, label]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="inline-flex min-h-[40px] items-center text-[var(--muted)] transition-colors hover:text-[var(--ink)]"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="label">Elsewhere</p>
            <ul className="mt-4 space-y-1">
              {ELSEWHERE.map(({ href, label }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="inline-flex min-h-[40px] items-center text-[var(--muted)] transition-colors hover:text-[var(--ink)]"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-[var(--glass-hairline)] pt-6">
          <p className="mono text-[0.8rem] text-[var(--faint)]">
            © {new Date().getFullYear()} Muzaffar Khaydarov · {SITE.location}
          </p>
        </div>
      </div>
    </footer>
  );
}
