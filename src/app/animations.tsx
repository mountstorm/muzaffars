'use client';
import React, { PropsWithChildren, useEffect } from 'react';

export default function Animations({ children }: PropsWithChildren<{}>) {
  useEffect(() => {
    // Smooth-scroll hijacking (LocomotiveScroll) is desktop-only. On phones and
    // tablets it breaks native touch scrolling and can hide part of the page, so
    // those devices keep the browser's own scrolling — smooth and fully visible.
    const isDesktopPointer =
      window.matchMedia('(min-width: 1024px)').matches &&
      window.matchMedia('(pointer: fine)').matches;
    if (!isDesktopPointer) return;

    let instance: { destroy?: () => void } | undefined;
    (async () => {
      // @ts-ignore — no bundled types for the v5 beta
      const LocomotiveScroll = (await import('locomotive-scroll')).default;
      instance = new LocomotiveScroll();
    })();

    return () => instance?.destroy?.();
  }, []);

  return <div className="main">{children}</div>;
}
