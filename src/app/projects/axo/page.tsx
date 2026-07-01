'use client';

import React, { useEffect } from 'react';
import Lenis from 'lenis';
import ProjectHero from '@/app/projects/project/hero';
import Image from 'next/image';
import TextGradient from '@/components/animations/textAnimations/textGradient';

export default function AstraProject() {
  useEffect(() => {
    (async () => {
      // @ts-ignore
      const LocomotiveScroll = (await import('locomotive-scroll')).default;
      const locomotiveScroll = new LocomotiveScroll();
    })();
  }, []);

  const researchImages = [
    '/images/axo/astronaut.png',
    '/images/axo/prototype.png',
    '/images/axo/concept.png',
    '/images/axo/poster1.png',
    '/images/axo/poster2.png',
    '/images/axo/poster3.png',
    '/images/axo/poster4.png'
  ];
  ``;
  const phrase =
    'Placeholder copy for Project Two. This page reuses the existing layout ' +
    'to demonstrate the site structure — replace this copy with a real project write-up.';

  const description = 'Placeholder Project';
  const heroText =
    'Placeholder description for Project Two. Replace with a real project summary.';

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <div>
      <ProjectHero
        description={heroText}
        media={'https://player.vimeo.com/video/955515979'}
        isImage={false}
        title={'Project Two'}
      />
      <div className="h-[20vh] w-full bg-gradient-to-b from-foreground to-background opacity-60"></div>
      <TextGradient phrase={phrase} colour={'destructive'} />
      {researchImages.map((asset, index) => (
        <Image
          key={index}
          src={asset}
          alt="Project specs"
          width={700}
          height={500}
          quality={100}
          layout="responsive"
        />
      ))}
    </div>
  );
}
