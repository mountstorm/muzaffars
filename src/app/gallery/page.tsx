'use client';

import React, { useEffect, useRef } from 'react';
import Layout from '@/components/layout';
import { ProjectCard } from '@/components/ui/ProjectCard';

// Gallery items data
// Placeholder gallery items — replace with real project visuals/links.
const galleryItems = [
  {
    id: 'placeholder-one',
    title: 'Project One',
    description: 'Placeholder description for a future project.',
    imagePath: '/images/onethoughtaday/homepage.png',
    link: '#',
    tags: ['Placeholder']
  },
  {
    id: 'placeholder-two',
    title: 'Project Two',
    description: 'Placeholder description for a future project.',
    imagePath: '/images/gallery/walletcon.png',
    link: '#',
    tags: ['Placeholder']
  },
  {
    id: 'placeholder-three',
    title: 'Project Three',
    description: 'Placeholder description for a future project.',
    imagePath: '/images/gallery/reown.png',
    link: '#',
    tags: ['Placeholder']
  }
];

export default function Gallery() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, galleryItems.length);

    const handleParallax = () => {
      cardRefs.current.forEach((card) => {
        if (!card) return;

        const rect = card.getBoundingClientRect();
        const centerY = rect.top + rect.height / 2;
        const viewportHeight = window.innerHeight;
        const distance = centerY - viewportHeight / 2;
        const parallaxValue = distance * -0.05;

        const imageEl = card.querySelector('.parallax-image') as HTMLElement;
        if (imageEl) {
          imageEl.style.transform = `translateY(${parallaxValue}px) scale(1.1)`;
        }
      });
    };

    window.addEventListener('scroll', handleParallax);
    handleParallax();

    return () => {
      window.removeEventListener('scroll', handleParallax);
    };
  }, []);

  return (
    <Layout title="web gallery">
      <div className="min-h-screen bg-white px-4 py-12 md:px-8 lg:px-16">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">
            Design Gallery
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            A collection of my design work and web projects featuring various
            styles and approaches.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {galleryItems.map((item, index) => (
            <ProjectCard
              key={item.id}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              {...item}
              index={index}
              imageClassName="parallax-image"
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}
