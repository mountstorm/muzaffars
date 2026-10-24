'use client';

import { ReactNode, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { failsafeReveal, prefersReducedMotion } from '@/lib/motion';

gsap.registerPlugin(ScrollTrigger);

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  animation?: 'fade-up' | 'fade-left' | 'fade-right' | 'scale' | 'parallax';
  delay?: number;
  duration?: number;
}

/**
 * Animated section wrapper with ScrollTrigger-based entrance animations.
 * Use for creating scroll-driven reveal effects throughout the page.
 */
export default function AnimatedSection({
  children,
  className = '',
  animation = 'fade-up',
  delay = 0,
  duration = 1
}: AnimatedSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    // Nothing to animate away — leave the content exactly as rendered.
    if (prefersReducedMotion()) return;

    const animations = {
      'fade-up': { y: 80, opacity: 0 },
      'fade-left': { x: -80, opacity: 0 },
      'fade-right': { x: 80, opacity: 0 },
      scale: { scale: 0.9, opacity: 0 },
      parallax: { y: 100, opacity: 0 }
    };

    const initial = animations[animation];

    gsap.set(el, initial);

    gsap.to(el, {
      y: 0,
      x: 0,
      scale: 1,
      opacity: 1,
      duration,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        // Previously 'play none none reverse', which re-hid the section when
        // scrolling back up past it — on a short page that left it invisible.
        toggleActions: 'play none none none',
        once: true
      }
    });

    // The page transition wrapper applies a transform, which can throw off
    // ScrollTrigger's first measurement. Re-measure, then guarantee visibility.
    ScrollTrigger.refresh();
    const cancelFailsafe = failsafeReveal(el);

    return () => {
      cancelFailsafe();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === el) {
          trigger.kill();
        }
      });
    };
  }, [animation, delay, duration]);

  return (
    <div ref={sectionRef} className={className}>
      {children}
    </div>
  );
}
