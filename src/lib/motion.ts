/**
 * True when the visitor has asked the OS to reduce motion. Every scroll-driven
 * reveal on the site checks this and renders its content statically instead.
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Reveal animations start their targets at opacity 0 and rely on ScrollTrigger
 * firing. If ScrollTrigger never measures correctly — a transformed ancestor,
 * a bfcache restore, a slow hydrate — the content stays invisible. This forces
 * the element visible after `ms` as a last resort, so a page can never be
 * blank. Returns a cleanup function.
 */
export function failsafeReveal(
  elements: Element | Element[] | null,
  ms = 1200
): () => void {
  const list = elements
    ? Array.isArray(elements)
      ? elements
      : [elements]
    : [];
  if (!list.length) return () => {};

  const timer = window.setTimeout(() => {
    list.forEach((el) => {
      const node = el as HTMLElement;
      if (getComputedStyle(node).opacity !== '0') return;
      node.style.opacity = '1';
      node.style.transform = 'none';
    });
  }, ms);

  return () => window.clearTimeout(timer);
}
