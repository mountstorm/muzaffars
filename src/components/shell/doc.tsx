import Link from 'next/link';
import type { ReactNode, CSSProperties } from 'react';

/*
 * Document primitives. Every page composes from these so the grammar stays
 * identical everywhere.
 *
 * The rules, which nothing may break:
 *   - no border-radius: editors do not round corners
 *   - no shadows, no gradients: hairline rules only
 *   - mono for structure and chrome, Inter for body prose only
 *   - left aligned, spacing in `ch` on the character grid
 *   - one marker vocabulary: ## headings, + - ! markers, // comments,
 *     [brackets] for state, "strings" for tags, key: for fields
 */

export const sans = 'font-[family-name:var(--font-sans)]';

/** Page wrapper: the open file, with its path above the title. */
export function Buffer({
  path,
  title,
  lede,
  meta,
  children
}: {
  path: string;
  title: string;
  lede?: string;
  meta?: ReactNode;
  children: ReactNode;
}) {
  return (
    <article className="w-full max-w-[88ch] px-[2ch] py-[4ch] sm:px-[4ch]">
      <p className="ed-mono text-[12px] text-[var(--ed-faint)]">{path}</p>
      <header className="mt-[1ch] border-b border-[var(--ed-rule)] pb-[2ch]">
        <h1 className="ed-mono text-[clamp(1.7rem,5.5vw,3rem)] font-semibold leading-[1.12] tracking-tight">
          <span className="ed-select">{title}</span>
        </h1>
        {lede && (
          <p
            className={`${sans} mt-[1.5ch] max-w-[72ch] text-[1.0625rem] leading-relaxed text-[var(--ed-dim)]`}
          >
            {lede}
          </p>
        )}
        {meta && <div className="mt-[1.5ch]">{meta}</div>}
      </header>
      <div className="mt-[3ch] space-y-[4ch]">{children}</div>
    </article>
  );
}

export function Section({
  heading,
  level = 2,
  children
}: {
  heading?: string;
  level?: 2 | 3;
  children: ReactNode;
}) {
  const Tag = level === 2 ? 'h2' : 'h3';
  const size = level === 2 ? 'text-[1.3rem]' : 'text-[1rem]';
  const hashes = level === 2 ? '## ' : '### ';
  return (
    <section>
      {heading && (
        <Tag
          className={`ed-mono ${size} font-semibold tracking-tight`}
          id={heading.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
        >
          <span aria-hidden="true" className="text-[var(--ed-faint)]">
            {hashes}
          </span>
          {heading.toLowerCase()}
        </Tag>
      )}
      <div className={heading ? 'mt-[1.5ch]' : ''}>{children}</div>
    </section>
  );
}

export function Prose({ children }: { children: ReactNode }) {
  return (
    <div className={`${sans} max-w-[74ch] space-y-[1.5ch] leading-relaxed text-[var(--ed-dim)]`}>
      {children}
    </div>
  );
}

/** A line commented out of the buffer — used for asides and metadata. */
export function Comment({
  children,
  tone = 'faint'
}: {
  children: ReactNode;
  tone?: 'faint' | 'add' | 'key';
}) {
  const color =
    tone === 'add'
      ? 'var(--ed-add)'
      : tone === 'key'
        ? 'var(--ed-key)'
        : 'var(--ed-faint)';
  return (
    <p className="ed-mono max-w-[80ch] text-[13px] leading-relaxed" style={{ color }}>
      <span aria-hidden="true" className="text-[var(--ed-faint)]">
        {'// '}
      </span>
      {children}
    </p>
  );
}

const MARKS = {
  add: { glyph: '+', color: 'var(--ed-add)' },
  del: { glyph: '!', color: 'var(--ed-del)' },
  neutral: { glyph: '-', color: 'var(--ed-faint)' }
} as const;

export function MarkedList({
  items,
  mark = 'add',
  stagger = false
}: {
  items: ReactNode[];
  mark?: keyof typeof MARKS;
  stagger?: boolean;
}) {
  const { glyph, color } = MARKS[mark];
  return (
    <ul className={`${sans} max-w-[76ch] space-y-[0.75ch] text-[var(--ed-dim)]`}>
      {items.map((item, i) => (
        <li
          key={i}
          className={`flex gap-[1.5ch] leading-relaxed ${stagger ? 'ed-diff' : ''}`}
          style={stagger ? ({ '--ed-delay': `${i * 70}ms` } as CSSProperties) : undefined}
        >
          <span aria-hidden="true" className="ed-mono shrink-0" style={{ color }}>
            {glyph}
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** key: value, as in a config block. */
export function Field({ k, children }: { k: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-[0.25ch] sm:flex-row sm:gap-[2ch]">
      <dt className="ed-mono shrink-0 text-[13px] text-[var(--ed-key)] sm:w-[16ch]">
        {k}:
      </dt>
      <dd className="ed-mono text-[13px] text-[var(--ed-ink)]">{children}</dd>
    </div>
  );
}

export function Tags({ tags }: { tags: string[] }) {
  return (
    <p className="ed-mono text-[12px] text-[var(--ed-string)]">
      [{tags.map((t) => `"${t}"`).join(', ')}]
    </p>
  );
}

export function Status({ status }: { status: string }) {
  const color =
    status === 'Live'
      ? 'var(--ed-add)'
      : status === 'Research'
        ? 'var(--ed-key)'
        : status === 'In development'
          ? 'var(--ed-string)'
          : 'var(--ed-faint)';
  return (
    <span className="ed-mono text-[12px]" style={{ color }}>
      [{status.toLowerCase()}]
    </span>
  );
}

/** A command-shaped action. Primary reads as the run button. */
export function Cmd({
  href,
  children,
  primary = false,
  external = false
}: {
  href: string;
  children: ReactNode;
  primary?: boolean;
  external?: boolean;
}) {
  const cls = primary
    ? 'border-[var(--ed-accent)] bg-[var(--ed-accent)] text-[var(--ed-bg)] hover:opacity-85'
    : 'border-[var(--ed-rule)] text-[var(--ed-ink)] hover:border-[var(--ed-accent)] hover:text-[var(--ed-accent)]';
  const props = external
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {};
  return (
    <Link
      href={href}
      {...props}
      className={`ed-mono inline-flex min-h-[44px] items-center border px-[2ch] text-[13px] transition-colors ${cls}`}
    >
      {children}
    </Link>
  );
}

/** An inline link that reads as a path. */
export function PathLink({
  href,
  children,
  external = false
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
}) {
  const props = external
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {};
  return (
    <Link
      href={href}
      {...props}
      className="ed-mono inline-flex min-h-[44px] items-center text-[13px] text-[var(--ed-accent)] underline-offset-4 hover:underline"
    >
      {children}
      {external ? <span aria-hidden="true"> ↗</span> : null}
    </Link>
  );
}
