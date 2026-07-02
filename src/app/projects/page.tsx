'use client';

import React from 'react';
import { ProjectCard } from '@/components/ui/ProjectCard';
import Layout from '@/components/layout';

// Real projects from resume. Live/demo URLs are unconfirmed — hrefs below are
// best-guess GitHub links under github.com/mountstorm and should be swapped
// for the real repo/demo URL once available.
const projects = [
  {
    id: 'neurabash',
    title: 'NeuraBash',
    description:
      'Terminal-based AI coding assistant integrating GPT-4 and local LLMs (Ollama) for online/offline inference, repo analysis, and code explanation.',
    imagePath: '/images/projects/neurabash.png',
    link: 'https://github.com/mountstorm/neurabash', // best-guess placeholder — update with real repo link
    tags: ['Python', 'Bash', 'OpenAI GPT-4', 'Ollama']
  },
  {
    id: 'valuestop',
    title: 'ValueStop',
    description:
      'EmoryHacks 2025 project — AI-powered shopping navigator that optimizes multi-store routes using the Gemini API and A* pathfinding.',
    imagePath: '/images/projects/valuestop.png',
    link: 'https://github.com/mountstorm/valuestop', // best-guess placeholder — update with real repo link
    tags: ['React', 'Vite', 'Gemini API', 'Google Maps API', 'Firestore']
  }
];

export default function ProjectsHome() {
  return (
    <Layout title={'My Work'} center>
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              {...project}
              index={index}
              external
              animated
              buttonText="View on GitHub"
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}
