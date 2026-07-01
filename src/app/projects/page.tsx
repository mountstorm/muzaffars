'use client';

import React from 'react';
import Link from 'next/link';
import ProjectLink from '@/app/projects/projectLink';
import Layout from '@/components/layout';

// Placeholder projects — replace with real case studies.
const projects = [
  {
    title: 'Project One',
    src: 'm31/controller.jpg',
    points: ['Placeholder stack: e.g. React, Node', 'What it does in one line', 'Your role / key contribution'],
    href: '/projects/m31',
    tag: 'Placeholder',
    color: '#000000'
  },
  {
    title: 'Project Two',
    src: 'axo/astronaut-square.png',
    points: ['Placeholder stack: e.g. Next.js, Python', 'What it does in one line', 'Your role / key contribution'],
    href: '/projects/axo',
    tag: 'Placeholder',
    color: '#ee5622'
  },
  {
    title: 'Project Three',
    points: ['Placeholder stack: e.g. TypeScript, Figma', 'What it does in one line', 'Your role / key contribution'],
    src: 'astra/astra.png',
    href: '/projects/astra',
    tag: 'Placeholder',
    color: '#303030'
  }
];

export default function ProjectsHome() {
  return (
    <Layout title={'My Work'}>
      <div className="m-0">
        <div className="m-0 overflow-hidden">
          {projects.map((project, index) => (
            <Link href={project.href} key={index}>
              <ProjectLink
                title={project.title}
                tag={project.tag}
                points={project.points}
                src={project.src}
                color={project.color}
              />
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
