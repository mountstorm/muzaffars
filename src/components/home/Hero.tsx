import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { SITE } from '@/lib/site';

export default function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="mx-auto max-w-[1240px] px-6 pb-20 pt-10 lg:px-10 lg:pb-28 lg:pt-16"
    >
      <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        {/* Text column */}
        <div>
          <p className="label rise" style={{ '--d': '0ms' } as React.CSSProperties}>
            Software Engineer · Distributed AI Researcher
          </p>

          <h1
            id="hero-heading"
            className="display wipe mt-5 text-[clamp(3rem,10vw,6.5rem)]"
            style={{ '--d': '80ms' } as React.CSSProperties}
          >
            Muzaffar
            <br />
            Khaydarov
          </h1>

          <div
            className="draw mt-8 h-px bg-[var(--rule-strong)]"
            style={{ '--d': '420ms' } as React.CSSProperties}
          />

          <p
            className="rise measure mt-8 text-[1.0625rem] leading-relaxed text-[var(--muted)] sm:text-[1.15rem]"
            style={{ '--d': '300ms' } as React.CSSProperties}
          >
            I build production software and distributed AI systems. Computer
            science student at Ole Miss, and a 2026 Software Engineering Intern
            at C&nbsp;Spire, where I received a return offer.
          </p>

          <div
            className="rise mt-9 flex flex-wrap items-center gap-4"
            style={{ '--d': '400ms' } as React.CSSProperties}
          >
            <Link
              href="/projects"
              className="group inline-flex min-h-[48px] items-center gap-2.5 rounded-full bg-[var(--accent)] px-6 text-[0.95rem] font-medium text-[var(--accent-ink)] shadow-[var(--glass-shadow)] transition-opacity hover:opacity-90"
            >
              View selected work
              <ArrowRight
                size={17}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
            <Link
              href="/resume"
              className="glass glass-pill glass-hover inline-flex min-h-[48px] items-center px-6 text-[0.95rem] text-[var(--ink)]"
            >
              Read the resume
            </Link>
          </div>

          <p
            className="rise glass glass-pill mono mt-8 inline-flex max-w-full items-start gap-2.5 px-4 py-2 text-[0.82rem] text-[var(--muted)]"
            style={{ '--d': '480ms' } as React.CSSProperties}
          >
            {/* shrink-0 keeps the dot on the first line when the text wraps */}
            <span
              aria-hidden="true"
              className="mt-[0.55em] inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--leaf)]"
            />
            <span>{SITE.availability}</span>
          </p>
        </div>

        {/* Portrait */}
        <div
          className="rise relative mx-auto w-full max-w-[460px] lg:mx-0"
          style={{ '--d': '160ms' } as React.CSSProperties}
        >
          {/* The blue block echoes the wall behind him. */}
          <div
            aria-hidden="true"
            className="absolute -left-4 -top-4 h-full w-full rounded-[var(--r-media)] bg-[var(--accent)] opacity-90 lg:-left-6 lg:-top-6"
          />
          <div className="glass-media relative aspect-[4/5] w-full">
            <Image
              src="/images/portrait.webp"
              alt="Muzaffar Khaydarov"
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 460px"
              className="object-cover object-[center_22%]"
            />
          </div>
        </div>
      </div>

      <a
        href="#experience"
        className="label mt-16 hidden items-center gap-2 text-[var(--faint)] transition-colors hover:text-[var(--ink)] lg:inline-flex"
      >
        Scroll
        <ArrowUpRight size={13} aria-hidden="true" className="rotate-45" />
      </a>
    </section>
  );
}
