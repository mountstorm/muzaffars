import { useEffect, useState } from 'react';

export const isMobile = (): boolean => {
  if (typeof window !== 'undefined') {
    const ua = navigator.userAgent;
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      ua
    );
  }
  return false;
};

// Reactive, viewport-width based check (updates on resize/orientation
// change), unlike isMobile() above which only checks the user agent once.
export function useIsMobile(breakpoint = 1024): boolean {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const update = () => setMobile(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, [breakpoint]);

  return mobile;
}
