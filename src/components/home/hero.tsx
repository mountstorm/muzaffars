import React from 'react';
import Link from 'next/link';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import { SITE } from '@/lib/site';

const SMALL_LINKS = [
  { href: `mailto:${SITE.email}`, label: 'Email', Icon: Mail, external: false },
  { href: SITE.github, label: 'GitHub', Icon: Github, external: true },
  { href: SITE.linkedin, label: 'LinkedIn', Icon: Linkedin, external: true }
];

export default function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative flex min-h-[88vh] w-full items-center overflow-hidden bg-foreground px-6 text-background sm:px-10"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.08), transparent 45%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.06), transparent 40%)'
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-4xl pt-24 sm:pt-20">
        <p
          aria-hidden="true"
          className="font-mono text-xs text-background/45 sm:text-sm"
        >
          $ whoami
        </p>

        <h1
          id="hero-heading"
          className="mt-3 text-[clamp(2.5rem,9vw,5rem)] font-semibold leading-[1.02] tracking-tight"
        >
          Muzaffar Khaydarov
        </h1>

        <p className="mt-4 text-xl text-background/85 sm:text-2xl">
          Software Engineer &amp; Distributed AI Researcher
        </p>

        <p className="mt-6 max-w-[62ch] text-base leading-relaxed text-background/70 sm:text-lg">
          I build production software and distributed AI systems. Computer
          science student at Ole Miss and Software Engineering Intern at C
          Spire.
        </p>

        <p className="mt-6 inline-flex flex-wrap items-center gap-x-2 gap-y-1 rounded-full border border-background/25 px-4 py-2 text-sm text-background/80">
          <span className="font-medium text-background">
            Seeking Summer 2027 SWE internships
          </span>
          <span aria-hidden="true" className="text-background/35">
            ·
          </span>
          <span>Available May–August</span>
          <span aria-hidden="true" className="text-background/35">
            ·
          </span>
          <span>Open to relocation</span>
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            href="/projects"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-background px-6 py-3 text-base font-medium text-foreground transition-transform duration-200 hover:scale-[1.03]"
          >
            View Projects
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <Link
            href="/resume"
            className="inline-flex min-h-[44px] items-center rounded-full border border-background/35 px-6 py-3 text-base font-medium text-background transition-colors duration-200 hover:bg-background/10"
          >
            View Resume
          </Link>
        </div>

        <ul className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
          {SMALL_LINKS.map(({ href, label, Icon, external }) => (
            <li key={label}>
              <a
                href={href}
                {...(external
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
                className="inline-flex min-h-[44px] items-center gap-2 text-sm text-background/65 underline-offset-4 transition-colors hover:text-background hover:underline"
              >
                <Icon size={16} aria-hidden="true" />
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
