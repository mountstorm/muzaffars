'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import ProjectLink from '@/app/projects/projectLink';
import Modal from '@/app/projects/project/modal';
import Layout from '@/components/layout';
import { ModalContext } from './modalContext';

// Placeholder projects — replace with real case studies.
const projects = [
  {
    title: 'Project One',
    src: 'm31/controller.jpg',
    description: 'Placeholder description for Project One.',
    href: '/projects/m31',
    tag: 'Placeholder',
    color: '#000000'
  },
  {
    title: 'Project Two',
    src: 'axo/astronaut-square.png',
    description: 'Placeholder description for Project Two.',
    href: '/projects/axo',
    tag: 'Placeholder',
    color: '#ee5622'
  },
  {
    title: 'Project Three',
    description: 'Placeholder description for Project Three.',
    src: 'astra/astra.png',
    href: '/projects/astra',
    tag: 'Placeholder',
    color: '#303030'
  }
];

export default function ProjectsHome() {
  const [modal, setModal] = useState({ active: false, index: 0 });
  return (
    <ModalContext.Provider value={{ modal, setModal }}>
      <Layout title={'My Work'}>
        <div className="m-0">
          <div className="m-0 overflow-hidden">
            {projects.map((project, index) => {
              return (
                <Link href={project.href} key={index}>
                  <ProjectLink
                    index={index}
                    title={project.title}
                    tag={project.tag}
                  />
                </Link>
              );
            })}
          </div>
          <Modal projects={projects} />
        </div>
      </Layout>
    </ModalContext.Provider>
  );
}
