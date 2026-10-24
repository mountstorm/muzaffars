'use client';

import React from 'react';
import { ProjectCard } from '@/components/ui/ProjectCard';
import Layout from '@/components/layout';
import { projects } from '@/lib/projects';

export default function ProjectsClient() {
  return (
    <Layout title={'My Work'} center>
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="sr-only">All projects</h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              external
              buttonText="View on GitHub"
              {...project}
              index={index}
              animated
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}
