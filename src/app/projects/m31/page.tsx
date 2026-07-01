'use client';
import ProjectHero from '@/app/projects/project/hero';
import PageScrollParallax from '@/components/pageScrollParallax';
import Picture1 from '../../../../public/images/m31/controller.jpg';
import Picture3 from '../../../../public/images/m31/gold.webp';
import Picture2 from '../../../../public/images/m31/logoblack.png';
import Image from 'next/image';
import React from 'react';

export default function M31Project() {
  const researchAssets = [
    '/images/m31/controller.png',
    '/images/m31/app.png',
    '/images/m31/packaging.png',
    '/images/m31/research.png',
    '/images/m31/specs.png'
  ];
  const introduction =
    'Placeholder description for Project One. This is a placeholder ' +
    'project page reusing the existing layout to demonstrate the site structure — ' +
    'replace this copy with a real project write-up.';

  const description = 'Placeholder Project';
  const myRole = 'Placeholder description of the role and approach for this project.';

  return (
    <div className="bg-foreground">
      <ProjectHero
        description={myRole}
        media={'https://www.youtube.com/embed/bXaLimCtK50'}
        isImage={false}
        title={'Project One'}
      />
      <PageScrollParallax
        title={'Placeholder Project Title'}
        body={introduction}
        word={description}
        staticImgs={[Picture1, Picture2, Picture3]}
      />
      <div>
        {researchAssets.map((asset, index) => (
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
    </div>
  );
}
