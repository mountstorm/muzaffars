'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Layout from '@/components/layout';

// Personal/thematic gallery — "part of me / my becoming". Captions are
// derived from the real photo filenames provided for the site.
const galleryItems = [
  {
    src: '/images/gallery/me-at-boston.jpg',
    caption: 'Me at Boston',
    aspect: 'aspect-[3/4]'
  },
  {
    src: '/images/gallery/programming-wlkata-robot.jpg',
    caption: 'Programming a Wlkata robot',
    aspect: 'aspect-square'
  },
  {
    src: '/images/gallery/cspire-office.jpg',
    caption: 'C Spire office',
    aspect: 'aspect-[4/5]'
  },
  {
    src: '/images/gallery/olemiss.jpg',
    caption: 'Ole Miss',
    aspect: 'aspect-[3/4]'
  },
  {
    src: '/images/gallery/nowruz-at-harvard.jpg',
    caption: 'Nowruz at Harvard',
    aspect: 'aspect-square'
  },
  {
    src: '/images/gallery/world-cup.jpg',
    caption: 'World Cup',
    aspect: 'aspect-[4/5]'
  },
  {
    src: '/images/gallery/san-fran.jpg',
    caption: 'San Francisco',
    aspect: 'aspect-[3/4]'
  },
  {
    src: '/images/gallery/basketball.jpg',
    caption: 'Basketball',
    aspect: 'aspect-square'
  },
  {
    src: '/images/gallery/waymo.jpg',
    caption: 'Waymo',
    aspect: 'aspect-[4/5]'
  },
  {
    src: '/images/gallery/grass.jpg',
    caption: 'Grass',
    aspect: 'aspect-[3/4]'
  },
  {
    src: '/images/gallery/chinese-food.jpg',
    caption: 'Chinese food',
    aspect: 'aspect-square'
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
    <Layout
      title="Part of Me"
      subtitle="A visual thread through the research, code, and life that make up my becoming."
      center
    >
      <div ref={wallRef} className="columns-2 gap-4 md:columns-3 lg:columns-4">
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
    </Layout>
  );
}
