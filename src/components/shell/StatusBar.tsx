'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { SITE } from '@/lib/site';

const MODES = ['NORMAL', 'INSERT', 'VISUAL'] as const;

/**
 * The bar pinned to the bottom of the window: editor mode, current file,
 * local time, and the one line a recruiter should not have to hunt for.
 * The mode flips to INSERT while a field is focused and VISUAL on selection,
 * which makes the chrome feel like it is reacting rather than decorating.
 */
export default function StatusBar() {
  const pathname = usePathname() || '/';
  const [mode, setMode] = useState<(typeof MODES)[number]>('NORMAL');
  const [time, setTime] = useState('');

  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          timeZone: 'America/Chicago'
        })
      );
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const onFocus = (e: FocusEvent) => {
      const t = e.target as HTMLElement | null;
      setMode(
        t && t.matches('input, textarea, [contenteditable]')
          ? 'INSERT'
          : 'NORMAL'
      );
    };
    const onSelect = () => {
      const sel = window.getSelection();
      setMode(sel && sel.toString().length > 0 ? 'VISUAL' : 'NORMAL');
    };
    document.addEventListener('focusin', onFocus);
    document.addEventListener('focusout', () => setMode('NORMAL'));
    document.addEventListener('selectionchange', onSelect);
    return () => {
      document.removeEventListener('focusin', onFocus);
      document.removeEventListener('selectionchange', onSelect);
    };
  }, []);

  const file = pathname === '/' ? 'README.md' : `${pathname.slice(1)}.md`;

  return (
    <div className="ed-mono fixed inset-x-0 bottom-0 z-30 flex items-center gap-[2ch] overflow-hidden border-t border-[var(--ed-rule)] bg-[var(--ed-panel)] px-[2ch] py-[2px] text-[12px] text-[var(--ed-dim)]">
      <span
        key={mode}
        className="ed-mode shrink-0 bg-[var(--ed-accent)] px-[1ch] font-medium text-[var(--ed-bg)]"
      >
        {mode}
      </span>
      <span className="shrink-0 truncate">{file}</span>
      <span className="hidden flex-1 truncate text-[var(--ed-ink)] sm:block">
        {SITE.availability}
      </span>
      <span className="ml-auto shrink-0 tabular-nums">{time} CT</span>
    </div>
  );
}
