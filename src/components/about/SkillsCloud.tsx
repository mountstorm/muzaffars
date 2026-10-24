'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Magnetic from '@/components/animations/magnetic';
import { skillGroups, certifications } from '@/lib/resume';
import { prefersReducedMotion } from '@/lib/motion';

const groupColors: Record<string, string> = {
  Languages:
    'bg-emerald-600/15 text-emerald-800 border-emerald-600/30 hover:bg-emerald-600/25 dark:text-emerald-300',
  'Systems & Infrastructure':
    'bg-teal-600/15 text-teal-800 border-teal-600/30 hover:bg-teal-600/25 dark:text-teal-300',
  'ML & Data':
    'bg-green-600/15 text-green-800 border-green-600/30 hover:bg-green-600/25 dark:text-green-300',
  Web: 'bg-lime-600/15 text-lime-800 border-lime-600/30 hover:bg-lime-600/25 dark:text-lime-300'
};

const certColor =
  'bg-amber-600/15 text-amber-800 border-amber-600/30 hover:bg-amber-600/25 dark:text-amber-300';

type Filter = 'all' | string;

export default function SkillsCloud() {
  const skillsRef = useRef<HTMLElement[]>([]);
  const [active, setActive] = useState<Filter>('all');

  const visibleGroups =
    active === 'all'
      ? skillGroups
      : skillGroups.filter((group) => group.label === active);

  useEffect(() => {
    const elements = skillsRef.current.filter(Boolean);
    if (!elements.length || prefersReducedMotion()) return;

    gsap.fromTo(
      elements,
      { opacity: 0, scale: 0.8, y: 20 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.5,
        ease: 'back.out(1.5)',
        stagger: { each: 0.04 },
        // Not scroll-driven: these must never be left invisible.
        clearProps: 'transform'
      }
    );
  }, [active]);

  skillsRef.current = [];
  let cursor = 0;

  return (
    <div className="mx-auto flex max-w-5xl flex-col items-start gap-8 sm:flex-row">
      <div
        className="flex shrink-0 flex-row flex-wrap gap-2 sm:w-56 sm:flex-col"
        role="group"
        aria-label="Filter skills by category"
      >
        <button
          onClick={() => setActive('all')}
          aria-pressed={active === 'all'}
          className={`rounded-full border px-4 py-2 text-center text-sm font-medium transition-colors duration-300 sm:w-full md:px-6 md:py-3 md:text-base ${
            active === 'all'
              ? 'border-foreground bg-foreground text-background'
              : 'border-foreground/20 text-foreground/70 hover:border-foreground/50'
          }`}
        >
          All skills
        </button>
        {skillGroups.map((group) => (
          <button
            key={group.label}
            onClick={() => setActive(group.label)}
            aria-pressed={active === group.label}
            className={`rounded-full border px-4 py-2 text-center text-sm font-medium transition-colors duration-300 sm:w-full md:px-6 md:py-3 md:text-base ${
              active === group.label
                ? 'border-foreground bg-foreground text-background'
                : 'border-foreground/20 text-foreground/70 hover:border-foreground/50'
            }`}
          >
            {group.label}
          </button>
        ))}
      </div>

      <div className="flex-1 space-y-8">
        {visibleGroups.map((group) => (
          <div key={group.label}>
            <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-foreground/50">
              {group.label}
            </h3>
            <ul className="space-y-2">
              {group.skills.map((skill) => {
                const i = cursor++;
                return (
                  <li
                    key={skill.name}
                    className="flex flex-col gap-x-3 gap-y-1 sm:flex-row sm:items-center"
                  >
                    <Magnetic>
                      <span
                        ref={(el) => {
                          if (el) skillsRef.current[i] = el;
                        }}
                        className={`inline-block shrink-0 cursor-default rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-300 sm:w-44 sm:text-center md:text-base ${
                          groupColors[group.label] ?? groupColors.Languages
                        }`}
                      >
                        {skill.name}
                      </span>
                    </Magnetic>
                    {/* The evidence is the point: no skill is listed without
                        shipped work behind it. */}
                    <span className="text-sm text-foreground/60">
                      {skill.evidence}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}

        {active === 'all' && (
          <div>
            <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-foreground/50">
              Certifications
            </h3>
            <div className="flex flex-wrap gap-3">
              {certifications.map((cert) => (
                <div
                  key={cert}
                  className={`cursor-default rounded-full border px-4 py-2 text-sm font-medium md:px-5 md:py-2.5 md:text-base ${certColor}`}
                >
                  {cert}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
