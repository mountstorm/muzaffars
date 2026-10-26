'use client';

import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

const apply = (t: Theme) => {
  document.documentElement.setAttribute('data-theme', t);
  document.documentElement.classList.toggle('dark', t === 'dark');
  try {
    localStorage.setItem('theme', t);
  } catch {
    /* private mode: the choice just will not persist */
  }
};

export default function ThemeSwitch({ className = '' }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    const current = document.documentElement.getAttribute('data-theme');
    setTheme(current === 'light' ? 'light' : 'dark');
  }, []);

  const toggle = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    apply(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
      className={`ed-mono text-[12px] text-[var(--ed-dim)] transition-colors hover:text-[var(--ed-ink)] ${className}`}
    >
      theme: <span className="text-[var(--ed-accent)]">{theme}</span>
    </button>
  );
}
