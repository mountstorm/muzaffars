import React, { type PropsWithChildren } from 'react';

type Props = {
  title: string;
  subtitle?: string;
  /** Kept for call-site compatibility; the editor layout is always left-aligned. */
  center?: boolean;
};

/**
 * Page header in the editor idiom: the filename as a breadcrumb comment, then
 * the title with a selection sweeping across it.
 */
export default function Layout({
  children,
  title,
  subtitle
}: PropsWithChildren<Props>) {
  return (
    <div className="px-[2ch] py-[4ch] sm:px-[4ch]">
      <header className="border-b border-[var(--ed-rule)] pb-[2ch]">
        <h1 className="ed-mono text-[clamp(1.6rem,5vw,3rem)] font-semibold leading-[1.12] tracking-tight">
          <span className="ed-select">{title}</span>
        </h1>
        {subtitle && (
          <p className="mt-[1.5ch] max-w-[70ch] font-[family-name:var(--font-sans)] text-[1.0625rem] leading-relaxed text-[var(--ed-dim)]">
            {subtitle}
          </p>
        )}
      </header>
      <div className="pt-[3ch]">{children}</div>
    </div>
  );
}
