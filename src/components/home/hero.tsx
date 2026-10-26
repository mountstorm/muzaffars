import Link from 'next/link';
import { SITE } from '@/lib/site';

const NAME = 'Muzaffar Khaydarov';
const ROLE = 'Software Engineer & Distributed AI Researcher';

/** A typed line: reveals a character cell at a time, then leaves a caret. */
function Typed({
  text,
  delay = 0,
  className = ''
}: {
  text: string;
  delay?: number;
  className?: string;
}) {
  return (
    <span
      className={`ed-type ${className}`}
      style={
        {
          '--ed-type-steps': text.length,
          '--ed-type-dur': `${Math.min(text.length * 34, 1400)}ms`,
          animationDelay: `${delay}ms`
        } as React.CSSProperties
      }
    >
      {text}
    </span>
  );
}

export default function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="border-b border-[var(--ed-rule)] px-[2ch] py-[4ch] sm:px-[4ch] sm:py-[6ch]"
    >
      <p className="ed-mono text-[13px] text-[var(--ed-faint)]">
        <span className="text-[var(--ed-key)]">$</span>{' '}
        <Typed text="whoami --long" />
      </p>

      <h1
        id="hero-heading"
        className="ed-mono mt-[1.5ch] text-[clamp(1.75rem,6.2vw,3.5rem)] font-semibold leading-[1.1] tracking-tight"
      >
        <Typed text={NAME} delay={420} />
        <span className="ed-caret ml-[0.25ch] h-[0.85em] align-middle" />
      </h1>

      <p className="ed-mono mt-[1ch] text-[clamp(0.95rem,2.4vw,1.25rem)] text-[var(--ed-accent)]">
        <Typed text={ROLE} delay={1100} />
      </p>

      <p className="mt-[2.5ch] max-w-[62ch] font-[family-name:var(--font-sans)] text-[1.0625rem] leading-relaxed text-[var(--ed-dim)]">
        I build production software and distributed AI systems. Computer
        science student at Ole Miss, and a 2026 Software Engineering Intern at
        C Spire, where I received a return offer.
      </p>

      {/* The availability line reads as a comment in the buffer. */}
      <p className="ed-mono mt-[2ch] text-[13px] text-[var(--ed-add)]">
        <span className="text-[var(--ed-faint)]">{'// '}</span>
        {SITE.availability}
      </p>

      <div className="mt-[3ch] flex flex-wrap items-center gap-[2ch]">
        <Link
          href="/projects"
          className="ed-mono inline-flex min-h-[44px] items-center border border-[var(--ed-accent)] bg-[var(--ed-accent)] px-[2ch] text-[14px] font-medium text-[var(--ed-bg)] transition-opacity hover:opacity-85"
        >
          open projects/
        </Link>
        <Link
          href="/resume"
          className="ed-mono inline-flex min-h-[44px] items-center border border-[var(--ed-rule)] px-[2ch] text-[14px] text-[var(--ed-ink)] transition-colors hover:border-[var(--ed-accent)] hover:text-[var(--ed-accent)]"
        >
          open resume.pdf
        </Link>
      </div>
    </section>
  );
}
