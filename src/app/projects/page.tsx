'use client';

import React from 'react';
import { ProjectCard } from '@/components/ui/ProjectCard';
import Layout from '@/components/layout';

// Real projects from resume/experience. Live/demo URLs are unconfirmed for the
// public repos — hrefs below are best-guess GitHub links under
// github.com/mountstorm and should be swapped for the real repo/demo URL once
// available. The C Spire projects are internal and have no public link.
const projects = [
  {
    id: 'worldcup-predictor',
    title: 'World Cup Final Predictor',
    description:
      'Predicted the 2026 World Cup final (Argentina vs Spain) from 35k international matches: Elo ratings feed a recency-weighted Poisson goal model, resolved over 10,000 Monte Carlo simulations into score, event, and player probabilities with a visual dashboard.',
    imagePath: '/images/projects/worldcup-predictor.png',
    link: 'https://github.com/mountstorm/worldcup-predictor',
    secondaryLink:
      'https://claude.ai/code/artifact/839a7d75-0845-47af-861c-a69d38793dad',
    secondaryButtonText: 'View Dashboard',
    tags: ['Python', 'pandas', 'scikit-learn', 'Monte Carlo', 'matplotlib']
  },
  {
    id: 'whosponsors',
    title: 'WhoSponsors',
    description:
      'Built the honest H-1B sponsorship database: ETL over 831k USCIS filings with entity resolution across 324k employers, plus a reverse-engineered Tableau extraction for FY2024+ data, served as searchable per-company trend charts.',
    imagePath: '/images/projects/whosponsors.svg',
    link: 'https://github.com/mountstorm/whosponsors',
    tags: ['Python', 'SQLite', 'Next.js', 'Data Engineering', 'SVG Charts']
  },
  {
    id: 'distributed-ai-research',
    title: 'Split-Inference Distributed AI Systems',
    description:
      'Built a distributed inference pipeline splitting neural networks across device, edge, and cloud, accurate within 1e-4 of single-machine output.',
    imagePath: '/images/gallery/programming-wlkata-robot.jpg',
    noLinkLabel: 'Ongoing research, no public repo yet',
    tags: ['Python', 'PyTorch', 'Distributed Systems', 'TCP', 'Edge Computing']
  },
  {
    id: 'dar-ticket-automation',
    title: 'DAR Ticket Automation',
    description:
      'Built a Python pipeline that auto-generates billing reports and files ServiceNow tickets, replacing 10 to 20 manual reviews a day and saving 30 min/day.',
    imagePath: '/images/gallery/cspire-office.jpg',
    tags: ['Python', 'YAML', 'ServiceNow (SNOW)', 'Excel Reporting']
  },
  {
    id: 'intl-day-pass-audit',
    title: 'International Day Pass Audit',
    description:
      'Built a Python tool that catches mismatched billing plans before customers see them, replacing a manual check with one CI/CD-ready command.',
    imagePath: '/images/gallery/cspire-office.jpg',
    tags: ['Python', 'Oracle SQL', 'YAML', 'CI/CD']
  },
  {
    id: 'bbva-lockbox-auto-ignore',
    title: 'BBVA Lockbox Zero-Payment Auto-Ignore',
    description:
      'Fixed payment logic to auto-clear 100+ weekly harmless $0 rejections while still halting on real errors, eliminating a manual step operators ran by hand.',
    imagePath: '/images/gallery/cspire-office.jpg',
    tags: ['Perl', 'Oracle SQL', 'RHEL / Linux', 'SSH']
  },
  {
    id: 'neurabash',
    title: 'NeuraBash',
    description:
      'Built a terminal AI coding assistant using GPT-4 and local LLMs (Ollama), cutting RAM footprint 30% with a modular CLI architecture.',
    imagePath: '/images/projects/neurabash.png',
    link: 'https://github.com/mountstorm/neurabash', // best-guess placeholder — update with real repo link
    tags: ['Python', 'Bash', 'OpenAI GPT-4', 'Ollama']
  },
  {
    id: 'valuestop',
    title: 'ValueStop',
    description:
      'Built an AI shopping navigator optimizing routes across 150 products and 5 stores using the Gemini API and A* pathfinding.',
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
