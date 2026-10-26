'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Line numbers running the height of the content column. The number nearest
 * the vertical centre of the viewport lights up as you scroll, the way a
 * cursor line does in an editor.
 */
export default function LineGutter({ lines = 80 }: { lines?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const mid = window.innerHeight / 2 - rect.top;
        const rowH = rect.height / lines;
        setActive(Math.max(0, Math.min(lines - 1, Math.floor(mid / rowH))));
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [lines]);

  return (
    <div ref={ref} aria-hidden="true" className="ed-gutter sticky top-0 h-full">
      {Array.from({ length: lines }, (_, i) => (
        <span key={i} data-active={i === active}>
          {i + 1}
        </span>
      ))}
    </div>
  );
}
