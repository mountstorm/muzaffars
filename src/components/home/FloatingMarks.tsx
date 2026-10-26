'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';

/**
 * Glass tiles drifting behind the hero, bouncing off the edges like a DVD
 * screensaver. Each mark is something real: where he studies, where he
 * interned, what he reads, what he plays, what he researches.
 */
const MARKS = [
  { src: '/images/logos/cspire.png', alt: 'C Spire', size: 76, vx: 0.22, vy: 0.17 },
  { src: '/images/logos/olemiss.png', alt: 'University of Mississippi', size: 84, vx: -0.18, vy: 0.23 },
  { src: '/images/logos/chess.png', alt: 'Chess', size: 64, vx: 0.26, vy: -0.2 },
  { src: '/images/logos/stranger.png', alt: 'The Stranger by Albert Camus', size: 60, vx: -0.24, vy: -0.15 },
  { src: '/images/logos/neural.png', alt: 'Neural networks', size: 70, vx: 0.2, vy: 0.26 }
];

export default function FloatingMarks() {
  const hostRef = useRef<HTMLDivElement>(null);
  const tileRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Start spread out, each with its own heading.
    const state = MARKS.map((m, i) => ({
      x: (0.12 + 0.19 * i) * 100,
      y: (0.18 + 0.14 * ((i * 3) % 5)) * 100,
      vx: m.vx,
      vy: m.vy,
      size: m.size
    }));

    let raf = 0;
    let last = performance.now();
    let running = true;

    const step = (now: number) => {
      // Normalised to 60fps so speed does not depend on refresh rate.
      const dt = Math.min((now - last) / 16.67, 3);
      last = now;
      const { width, height } = host.getBoundingClientRect();
      if (width && height) {
        state.forEach((s, i) => {
          const wPct = (s.size / width) * 100;
          const hPct = (s.size / height) * 100;
          s.x += s.vx * dt;
          s.y += s.vy * dt;
          if (s.x <= 0) { s.x = 0; s.vx = Math.abs(s.vx); }
          if (s.x >= 100 - wPct) { s.x = 100 - wPct; s.vx = -Math.abs(s.vx); }
          if (s.y <= 0) { s.y = 0; s.vy = Math.abs(s.vy); }
          if (s.y >= 100 - hPct) { s.y = 100 - hPct; s.vy = -Math.abs(s.vy); }
          const el = tileRefs.current[i];
          if (el) el.style.transform = `translate3d(${(s.x / 100) * width}px, ${(s.y / 100) * height}px, 0)`;
        });
      }
      if (running) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);

    // Stop when the tab is hidden; nothing to animate and it wastes battery.
    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        last = performance.now();
        raf = requestAnimationFrame(step);
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {MARKS.map((m, i) => (
        <div
          key={m.src}
          ref={(el) => {
            tileRefs.current[i] = el;
          }}
          className="glass absolute left-0 top-0 grid place-items-center opacity-80 will-change-transform"
          style={{
            width: m.size,
            height: m.size,
            borderRadius: m.size * 0.28
          }}
        >
          {/* These marks are white-background PNGs, so they need a white chip
              to sit on — otherwise they disappear into light glass. */}
          <div
            className="grid place-items-center bg-white"
            style={{
              width: m.size * 0.78,
              height: m.size * 0.78,
              borderRadius: m.size * 0.2
            }}
          >
            <Image
              src={m.src}
              alt=""
              width={Math.round(m.size * 0.62)}
              height={Math.round(m.size * 0.62)}
              className="object-contain"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
