'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import FileTree from './FileTree';
import LineGutter from './LineGutter';
import StatusBar from './StatusBar';
import ThemeSwitch from './ThemeSwitch';

export default function EditorShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // The drawer is a navigation overlay, so route changes and Escape close it.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <div className="min-h-screen bg-[var(--ed-bg)] text-[var(--ed-ink)]">
      {/* Mobile title bar */}
      <div className="ed-mono sticky top-0 z-30 flex items-center gap-[2ch] border-b border-[var(--ed-rule)] bg-[var(--ed-panel)] px-[2ch] py-[6px] text-[13px] lg:hidden">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="workspace-tree"
          className="min-h-[44px] text-[var(--ed-dim)] hover:text-[var(--ed-ink)]"
        >
          {open ? '▾' : '▸'} files
        </button>
        <span className="truncate text-[var(--ed-faint)]">
          ~/muzaffarkhaydarov.com
        </span>
        <ThemeSwitch className="ml-auto min-h-[44px]" />
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside
          id="workspace-tree"
          className={`${
            open ? 'block' : 'hidden'
          } w-full shrink-0 border-b border-[var(--ed-rule)] bg-[var(--ed-panel)] px-[1ch] py-[2ch] lg:sticky lg:top-0 lg:block lg:h-screen lg:w-[var(--sidebar-w)] lg:overflow-y-auto lg:border-b-0 lg:border-r`}
        >
          <FileTree />
          <div className="mt-[2ch] hidden border-t border-[var(--ed-rule)] pt-[1ch] lg:block">
            <ThemeSwitch className="px-[1ch]" />
          </div>
        </aside>

        {/* Gutter + content */}
        <div className="flex min-w-0 flex-1">
          <div className="hidden shrink-0 justify-end border-r border-[var(--ed-rule)] py-[2ch] pr-[1ch] md:flex">
            <LineGutter lines={120} />
          </div>
          <main id="content" className="min-w-0 flex-1 pb-[6ch]">
            {children}
          </main>
        </div>
      </div>

      <StatusBar />
    </div>
  );
}
