'use client';

import Description from '@/components/animations/smoothScroll/description';
import Intro from '@/components/animations/smoothScroll/intro';
import Body from '@/components/animations/smoothScroll/body';

export default function AstraProject() {
  const introduction = [
    'Placeholder description for Project Three.',
    'This page reuses the existing layout',
    'to demonstrate the site structure —',
    'replace this copy with a real project write-up.'
  ];

  const components = 'Placeholder details about this project go here.';

  const heroText = 'Project Three — placeholder project';

  const description = 'Placeholder description for Project Three.';
  const body = [
    {
      title: 'Placeholder image',
      src: 'astra/astra.png'
    },
    {
      title: 'Placeholder image',
      src: 'astra/giz1.png'
    },
    {
      title: 'Placeholder image',
      src: 'astra/gizmo.png'
    }
  ];
  return (
    <div className="bg-foreground">
      <Intro
        images={['/images/astra/giz1.png', '/images/astra/gizmo.png']}
        title={'Project Three'}
      />
      <Description phrases={introduction} />
      <Body body={body} text={components} description={description} />
    </div>
  );
}
