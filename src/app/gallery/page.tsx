'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Layout from '@/components/layout';

// Personal/thematic gallery — "part of me / my becoming". Captions are
// derived from the real photo filenames provided for the site.
const galleryItems = [
  {
    src: '/images/gallery/me-at-boston.jpg',
    caption: 'Happy before HackHarvard',
    aspect: 'aspect-[3/4]'
  },
  {
    src: '/images/gallery/programming-wlkata-robot.jpg',
    caption: 'Programming a Wlkata robot for Pharmaceutical research project',
    aspect: 'aspect-square'
  },
  {
    src: '/images/gallery/cspire-office.jpg',
    caption: 'My first day at C Spire Headquarters',
    aspect: 'aspect-[4/5]'
  },
  {
    src: '/images/gallery/olemiss.jpg',
    caption: 'Attending an Ole Miss 2026 graduation',
    aspect: 'aspect-[3/4]'
  },
  {
    src: '/images/gallery/nowruz-at-harvard.jpg',
    caption: 'Organizing Uzbek corner for Nowruz at Harvard',
    aspect: 'aspect-square'
  },
  {
    src: '/images/gallery/world-cup.jpg',
    caption: 'Uzbekistan v Congo World Cup 2026 match',
    aspect: 'aspect-[4/5]'
  },
  {
    src: '/images/gallery/san-fran.jpg',
    caption: 'Attended SilkRoad Innovation Hub conference in Palo Alto and explored San Francisco',
    aspect: 'aspect-[3/4]'
  },
  {
    src: '/images/gallery/basketball.jpg',
    caption: 'After 3pm labs, I enjoy playing basketball',
    aspect: 'aspect-square'
  },
  {
    src: '/images/gallery/waymo.jpg',
    caption: 'Riding on a Waymo for the first time',
    aspect: 'aspect-[4/5]'
  },
  {
    src: '/images/gallery/grass.jpg',
    caption: 'Walk in the park in Boston',
    aspect: 'aspect-[3/4]'
  },
  {
    src: '/images/gallery/chinese-food.jpg',
    caption: 'Enjoying Chi' +
      'nese food after final exams',
    aspect: 'aspect-square'
  },
  {
    src: '/images/gallery/soccer.jpg',
    caption: 'Nice soccer poster in Brussels Metro (Subway)',
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
    <Layout
      title="Part of Me"
      subtitle="Visual memory palace of my life through coding, travelling, sports, and learning."
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
