'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Layout from '@/components/layout';

// Personal/thematic gallery — "part of me / my becoming". Captions are
// written thematically around real milestones from the resume (research,
// coding, competitions, campus life) using the existing placeholder images.
const galleryItems = [
  {
    src: '/images/m31/controller.jpg',
    caption: 'Late nights building — NeuraBash, one CLI command at a time.',
    aspect: 'aspect-[3/4]'
  },
  {
    src: '/images/axo/astronaut-square.png',
    caption: 'ValueStop, EmoryHacks 2025 — 36 hours, three teammates, one idea.',
    aspect: 'aspect-square'
  },
  {
    src: '/images/posters/talksposter.jpg',
    caption: 'Standing in front of a room, explaining what I built.',
    aspect: 'aspect-[4/5]'
  },
  {
    src: '/images/astra/astra.png',
    caption: 'The Ole Miss research lab — where split-inference started as a whiteboard sketch.',
    aspect: 'aspect-[3/4]'
  },
  {
    src: '/images/bottles/stack1.png',
    caption: 'Stacking abstractions: device, edge, cloud.',
    aspect: 'aspect-square'
  },
  {
    src: '/images/posters/coffee.jpg',
    caption: 'Debugging sessions fueled by coffee and stubbornness.',
    aspect: 'aspect-[4/5]'
  },
  {
    src: '/images/art/draw1.png',
    caption: 'Sketching ideas before they become code.',
    aspect: 'aspect-[3/4]'
  },
  {
    src: '/images/onethoughtaday/homepage.png',
    caption: 'Campus life at Ole Miss — Chancellor’s Roll, every semester.',
    aspect: 'aspect-square'
  },
  {
    src: '/images/gallery/hivemind.png',
    caption: 'Teaching 49+ students the fundamentals I once struggled with.',
    aspect: 'aspect-[4/5]'
  },
  {
    src: '/images/posters/sustainability.jpg',
    caption: 'Robots, pipelines, and the pharmaceutical automation lab.',
    aspect: 'aspect-[3/4]'
  },
  {
    src: '/images/dresses/dress2.jpg',
    caption: 'Still becoming — the next milestone, always in progress.',
    aspect: 'aspect-square'
  },
  {
    src: '/images/bottles/stack3.png',
    caption: 'Profiling every split point until the numbers finally made sense.',
    aspect: 'aspect-[4/5]'
  }
];

export default function Gallery() {
  const wallRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wall = wallRef.current;
    if (!wall) return;

    const items = Array.from(
      wall.querySelectorAll<HTMLElement>('[data-parallax-speed]')
    );

    const handleScroll = () => {
      const viewportHeight = window.innerHeight;
      items.forEach((item) => {
        const speed = parseFloat(item.dataset.parallaxSpeed || '0');
        const rect = item.getBoundingClientRect();
        const distance = rect.top + rect.height / 2 - viewportHeight / 2;
        item.style.transform = `translateY(${distance * speed}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Layout title="gallery">
      <div className="min-h-screen bg-background px-4 py-12 md:px-8 lg:px-16">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-foreground">
            Part of Me
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-foreground/70">
            A visual thread through the research, code, and late nights that
            make up my becoming.
          </p>
        </div>

        <div
          ref={wallRef}
          className="columns-2 gap-4 md:columns-3 lg:columns-4"
        >
          {galleryItems.map((item, index) => (
            <div
              key={item.src + index}
              data-parallax-speed={(index % 3) * 0.03 - 0.03}
              className={`group relative mb-4 block w-full overflow-hidden rounded-xl break-inside-avoid ${item.aspect}`}
            >
              <Image
                src={item.src}
                alt={item.caption}
                fill
                loading="lazy"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-black/0 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <p className="translate-y-full p-4 text-sm font-light text-white transition-transform duration-300 ease-out group-hover:translate-y-0">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
