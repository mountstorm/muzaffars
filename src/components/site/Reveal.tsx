'use client';

import { useEffect, useRef, type ElementType, type ReactNode } from 'react';

/**
 * Reveals children when they scroll into view.
 *
 * The element is visible by default and only becomes hidden once the observer
 * is confirmed working, so a blocked or unsupported observer leaves the
 * content readable rather than blank.
 */
export default function Reveal({
  children,
  as: Tag = 'div',
  delay = 0,
  className = ''
}: {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Already on screen at mount: leave it alone rather than hiding then
    // re-showing, which reads as a flash.
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return;

    el.setAttribute('data-reveal', 'pending');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.setAttribute('data-reveal', 'shown');
            io.unobserve(el);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px' }
    );
    io.observe(el);

    // Safety net: nothing stays hidden for longer than this.
    const t = window.setTimeout(
      () => el.setAttribute('data-reveal', 'shown'),
      2500
    );
    return () => {
      io.disconnect();
      window.clearTimeout(t);
    };
  }, []);

  return (
    <Tag
      ref={ref}
      data-reveal=""
      style={{ '--d': `${delay}ms` } as React.CSSProperties}
      className={className}
    >
      {children}
    </Tag>
  );
}
