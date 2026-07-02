'use client';

import React from 'react';
import Link from 'next/link';
import { ProjectCard } from '@/components/ui/ProjectCard';
import Layout from '@/components/layout';
import AnimatedSection from '@/components/about/AnimatedSection';
import GitHubContributionsGraph from '@/app/about/githubActivity';
import { useGitHub } from '@/hooks/useGithub';

// Real projects from resume/experience. Live/demo URLs are unconfirmed for the
// public repos — hrefs below are best-guess GitHub links under
// github.com/mountstorm and should be swapped for the real repo/demo URL once
// available. The C Spire projects are internal and have no public link.
const projects = [
  {
    id: 'dar-ticket-automation',
    title: 'DAR Ticket Automation',
    description:
      "Python automation pipeline that queries C Spire's internal Discount Account Request database daily, compiles flagged billing accounts into a timestamped Excel report, and automatically files a ServiceNow ticket with the report attached. Fully YAML-configured, so the Billing team can change rules without touching code — it eliminated a recurring manual reporting task entirely.",
    imagePath: '/images/gallery/cspire-office.jpg',
    tags: ['Python', 'YAML', 'ServiceNow (SNOW)', 'Excel Reporting']
  },
  {
    id: 'intl-day-pass-audit',
    title: 'International Day Pass Audit',
    description:
      "Python-powered audit tool that queries C Spire's Oracle billing catalogue to automatically detect mismatches between International Day Pass plans and the expected catalogue — catching billing configuration errors before they reach customers. Ships with CI/CD-ready exit codes, YAML-driven configuration, and multi-environment support, turning a tedious manual check into a repeatable, single-command safety net for the Billing team.",
    imagePath: '/images/gallery/cspire-office.jpg',
    tags: ['Python', 'Oracle SQL', 'YAML', 'CI/CD']
  },
  {
    id: 'bbva-lockbox-auto-ignore',
    title: 'BBVA Lockbox Zero-Payment Auto-Ignore',
    description:
      'Fixed the error-checking logic (checkFDUErrors) in the BBVA lockbox payment flow so it automatically recognizes harmless $0 payment rejections and lets the flow finish on its own, while still halting on real errors. Removed a manual step operators previously had to clear by hand on every run. Tested on Red Hat Enterprise Linux via SSH.',
    imagePath: '/images/gallery/cspire-office.jpg',
    tags: ['Perl', 'Oracle SQL', 'RHEL / Linux', 'SSH']
  },
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
  const {
    githubData,
    isLoading: githubLoading,
    error: githubError
  } = useGitHub();

  return (
    <Layout title={'My Work'} center>
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        {!githubLoading && !githubError && githubData && (
          <AnimatedSection animation="fade-up" className="mb-16">
            <Link
              href="https://github.com/mountstorm"
              target="_blank"
              rel="noopener noreferrer"
              className="block transition-transform hover:scale-[1.01]"
            >
              <GitHubContributionsGraph
                contributions={githubData.contributions}
                totalContributions={githubData.totalContributions}
                restrictedContributions={githubData.restrictedContributions}
              />
            </Link>
          </AnimatedSection>
        )}

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
