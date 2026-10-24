'use client';

import React from 'react';
import SlidingImages from '@/components/home/SlidingImages';
import Description from '@/components/home/Description/description';

const slider1 = [
  { color: 'white', src: 'projects/neurabash.png', href: '/projects' },
  { color: '#21242b', src: 'projects/valuestop.png', href: '/projects' },
  { color: '#21242b', src: 'gallery/cspire-office.jpg', href: '/projects' },
  {
    color: 'white',
    src: 'gallery/programming-wlkata-robot.jpg',
    href: '/gallery'
  }
];
const slider2 = [
  { color: '#d4e3ec', src: 'gallery/me-at-boston.jpg', href: '/gallery' },
  { color: '#9289BD', src: 'gallery/olemiss.jpg', href: '/gallery' },
  { color: 'white', src: 'gallery/world-cup.jpg', href: '/gallery' },
  { color: 'white', src: 'projects/my-first-repo.jpg', href: '/projects' }
];

/**
 * The scroll-driven part of the homepage. Everything a visitor needs in the
 * first five seconds is rendered on the server above this.
 */
export default function HomeClient() {
  return (
    <div className="overflow-x-hidden">
      <Description />
      <SlidingImages slider1={slider1} slider2={slider2} />
    </div>
  );
}
