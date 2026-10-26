'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const NAV = [
  { href: '/projects', label: 'Work' },
  { href: '/#experience', label: 'Experience' },
  { href: '/about', label: 'About' },
  { href: '/resume', label: 'Resume' },
  { href: '/contact', label: 'Contact' }
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [lifted, setLifted] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setLifted(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 px-3 pt-3 sm:px-5 sm:pt-4">
      <div
        className={`glass glass-pill mx-auto flex max-w-[1240px] items-center gap-6 px-5 py-2.5 transition-shadow duration-500 lg:px-7 ${
          lifted ? '' : 'shadow-none'
        }`}
      >
        <Link
          href="/"
          className="display shrink-0 text-[1.35rem] tracking-[-0.02em] text-[var(--ink)]"
        >
          Muzaffar Khaydarov
        </Link>

        <nav aria-label="Main" className="ml-auto hidden items-center md:flex">
          {NAV.map(({ href, label }) => {
            const active = href !== '/#experience' && pathname === href;
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? 'page' : undefined}
                className={`relative inline-flex min-h-[44px] items-center px-4 text-[0.92rem] transition-colors ${
                  active
                    ? 'text-[var(--ink)]'
                    : 'text-[var(--muted)] hover:text-[var(--ink)]'
                }`}
              >
                {label}
                {active && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-4 bottom-2 h-px bg-[var(--accent)]"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-1 md:ml-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="inline-flex h-11 w-11 items-center justify-center text-[var(--muted)] hover:text-[var(--ink)] md:hidden"
          >
            {open ? <X size={19} aria-hidden="true" /> : <Menu size={19} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Main"
          className="glass glass-panel mx-auto mt-2 max-w-[1240px] px-5 py-1 md:hidden"
        >
          {NAV.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="flex min-h-[52px] items-center border-b border-[var(--glass-hairline)] text-[1.05rem] text-[var(--ink)] last:border-b-0"
            >
              {label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
