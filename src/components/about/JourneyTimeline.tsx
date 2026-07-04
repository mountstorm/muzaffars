'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

interface TimelineItem {
  year: string;
  title: string;
  company: string;
  companyUrl?: string;
  description: string;
}

const journeyData: TimelineItem[] = [
  {
    year: 'Aug. 2024 – May 2028',
    title: 'B.S. Computer Science, Minor in Mathematics',
    company: 'University of Mississippi',
    description:
      "GPA 3.87/4.0, Chancellor's Roll every semester, Sally McDonnell Barksdale Honors College (top 5%)."
  },
  {
    year: 'Oct. 2024 – Apr. 2025',
    title: 'Undergraduate Research Assistant',
    company: 'UM Thad Cochran Research Center',
    description:
      'Programmed industrial robots (Wlkata, Epson) in Python and C++ for autonomous pharmaceutical preparation, cutting contamination risk by 85%. Built data pipelines with pandas, NumPy, and Matplotlib.'
  },
  {
    year: 'Jul. 2025 – Present',
    title: 'Computer Science Teaching Assistant',
    company: 'University of Mississippi',
    description:
      'Guide 49+ students through OOP (Java), data structures, and algorithms; review and optimize 300+ programs weekly, improving code quality by 20%.'
  },
  {
    year: 'Jan. 2026 – Present',
    title: 'Undergraduate Research Assistant, Distributed AI Systems',
    company: 'University of Mississippi (Prof. Feng Wang) x University of Memphis',
    description:
      'Implement split-inference systems in PyTorch that partition DNN execution across device, edge, and cloud. Built a two-machine distributed inference pipeline over TCP, verified within 1e-4 of single-machine output, and profiled all 22 AlexNet split points across WiFi, LTE, and backhaul links.'
  },
  {
    year: 'Jun. 2026 – Present',
    title: 'Software Engineering Intern',
    company: 'C Spire',
    description:
      'Own 2-3 repositories handling billing audit logic and application flows, shipping code changes (not just reviews) across production Perl and Python systems. Fixed a production Perl billing flow handling 100+ weekly zero-payment errors, preventing batch-wide failures, and built a Python automation that auto-issues ServiceNow tickets for flagged accounts, saving on-call operators 30 minutes a day.'
  }
];

export default function JourneyTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const line = lineRef.current;
    const items = itemsRef.current;

    if (!line || !items.length) return;

    gsap.fromTo(
      line,
      { scaleY: 0, transformOrigin: 'top' },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 60%',
          end: 'bottom 40%',
          scrub: 0.5
        }
      }
    );

    items.forEach((item, i) => {
      gsap.fromTo(
        item,
        {
          opacity: 0,
          x: i % 2 === 0 ? -60 : 60,
          scale: 0.95
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative py-20">
      {/* Center line */}
      <div
        ref={lineRef}
        className="absolute left-1/2 top-0 hidden h-full w-[2px] -translate-x-1/2 bg-gradient-to-b from-primary via-secondary to-primary/30 md:block"
      />

      <div className="absolute left-8 top-0 h-full w-[2px] bg-gradient-to-b from-primary via-secondary to-primary/30 md:hidden" />

      <div className="relative space-y-16 md:space-y-24">
        {journeyData.map((item, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) itemsRef.current[i] = el;
            }}
            className={`relative flex items-start gap-8 ${
              i % 2 === 0
                ? 'md:flex-row md:text-right'
                : 'md:flex-row-reverse md:text-left'
            }`}
          >
            {/* Content */}
            <div
              className={`ml-16 flex-1 md:ml-0 ${
                i % 2 === 0 ? 'md:pr-16' : 'md:pl-16'
              }`}
            >
              <div className="group relative rounded-2xl border border-border bg-card p-6 text-card-foreground shadow-sm transition-all duration-300 hover:shadow-md">
                <span className="mb-2 inline-block rounded-full bg-foreground/10 px-3 py-1 text-sm font-medium text-foreground">
                  {item.year}
                </span>
                <h3 className="mb-1 text-xl font-bold text-foreground md:text-2xl">
                  {item.title}
                </h3>
                {item.companyUrl ? (
                  <Link
                    href={item.companyUrl}
                    className="mb-3 inline-block font-medium text-primary transition-colors hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    @{item.company} ↗
                  </Link>
                ) : (
                  <span className="mb-3 inline-block font-medium text-foreground/60">
                    @{item.company}
                  </span>
                )}
                <p className="text-foreground/70">{item.description}</p>
              </div>
            </div>

            {/* Timeline dot */}
            <div className="absolute left-6 top-6 z-10 flex h-5 w-5 items-center justify-center rounded-full border-2 border-primary/40 bg-background md:left-1/2 md:-translate-x-1/2">
              <div className="h-2 w-2 rounded-full bg-primary/50" />
            </div>

            {/* Empty space for the other side on desktop */}
            <div className="hidden flex-1 md:block" />
          </div>
        ))}
      </div>
    </div>
  );
}
