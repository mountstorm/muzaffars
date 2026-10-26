import Link from 'next/link';
import type { ReactNode } from 'react';

export function Shell({ children }: { children: ReactNode }) {
  return <div className="mx-auto max-w-[1240px] px-6 lg:px-10">{children}</div>;
}

/** Numbered section header: mono index + label, serif title. */
export function SectionHead({
  index,
  label,
  title,
  lede,
  action
}: {
  index: string;
  label: string;
  title: string;
  lede?: string;
  action?: ReactNode;
}) {
  return (
    <div className="pt-2">
      <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
        <p className="label">
          <span className="text-[var(--accent)]">{index}</span>
          <span aria-hidden="true"> — </span>
          {label}
        </p>
        {action}
      </div>
      <h2 className="display mt-4 text-[clamp(2rem,5vw,3.25rem)]">{title}</h2>
      {lede && (
        <p className="measure mt-4 text-[1.0625rem] leading-relaxed text-[var(--muted)]">
          {lede}
        </p>
      )}
    </div>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <li className="glass glass-pill mono px-3 py-1 text-[0.72rem] text-[var(--muted)]">
      {children}
    </li>
  );
}

export function Tags({ tags }: { tags: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {tags.map((t) => (
        <Tag key={t}>{t}</Tag>
      ))}
    </ul>
  );
}

const STATUS_TONE: Record<string, string> = {
  Live: 'var(--leaf)',
  Research: 'var(--accent)',
  'In development': 'var(--muted)',
  'Internal project': 'var(--faint)'
};

export function Status({ status }: { status: string }) {
  return (
    <span className="label inline-flex items-center gap-2 whitespace-nowrap">
      <span
        aria-hidden="true"
        className="inline-block h-1.5 w-1.5 rounded-full"
        style={{ background: STATUS_TONE[status] ?? 'var(--faint)' }}
      />
      {status}
    </span>
  );
}

export function TextLink({
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
      className="group inline-flex min-h-[44px] items-center gap-1.5 text-[0.95rem] text-[var(--ink)] transition-colors hover:text-[var(--accent)]"
    >
      <span className="border-b border-[var(--rule-strong)] pb-0.5 transition-colors group-hover:border-[var(--accent)]">
        {children}
      </span>
      <span aria-hidden="true" className="text-[var(--faint)] transition-colors group-hover:text-[var(--accent)]">
        {external ? '↗' : '→'}
      </span>
    </Link>
  );
}

export function Button({
  href,
  children,
  variant = 'outline',
  external = false
}: {
  href: string;
  children: ReactNode;
  variant?: 'solid' | 'outline';
  external?: boolean;
}) {
  const cls =
    variant === 'solid'
      ? 'bg-[var(--accent)] text-[var(--accent-ink)] shadow-[var(--glass-shadow)] hover:opacity-90'
      : 'glass glass-hover text-[var(--ink)] hover:text-[var(--accent)]';
  const props = external
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {};
  return (
    <Link
      href={href}
      {...props}
      className={`inline-flex min-h-[48px] items-center rounded-full px-6 text-[0.95rem] transition-colors ${cls}`}
    >
      {children}
    </Link>
  );
}

/** Page header for interior pages. */
export function PageHead({
  index,
  label,
  title,
  lede
}: {
  index: string;
  label: string;
  title: string;
  lede?: string;
}) {
  return (
    <header className="pb-12 pt-10 lg:pt-16">
      <p className="label">
        <span className="text-[var(--accent)]">{index}</span>
        <span aria-hidden="true"> — </span>
        {label}
      </p>
      <h1 className="display wipe mt-5 text-[clamp(2.6rem,8vw,5rem)]">{title}</h1>
      {lede && (
        <p className="measure mt-6 text-[1.0625rem] leading-relaxed text-[var(--muted)] sm:text-[1.15rem]">
          {lede}
        </p>
      )}
    </header>
  );
}
