'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Magnetic from '@/components/animations/magnetic';

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  name: string;
  category: 'languages' | 'frameworks' | 'systems' | 'concepts' | 'certifications';
}

const skills: Skill[] = [
  // Languages
  { name: 'Java', category: 'languages' },
  { name: 'Python', category: 'languages' },
  { name: 'C++', category: 'languages' },
  { name: 'C', category: 'languages' },
  { name: 'JavaScript', category: 'languages' },
  { name: 'TypeScript', category: 'languages' },
  { name: 'Perl', category: 'languages' },
  { name: 'SQL', category: 'languages' },
  { name: 'Bash', category: 'languages' },
  // Frameworks & tools
  { name: 'Spring Boot', category: 'frameworks' },
  { name: 'Node.js', category: 'frameworks' },
  { name: 'Next.js', category: 'frameworks' },
  { name: 'Flask', category: 'frameworks' },
  { name: 'LangChain', category: 'frameworks' },
  { name: 'Vite', category: 'frameworks' },
  { name: 'Git', category: 'frameworks' },
  { name: 'Docker', category: 'frameworks' },
  { name: 'Kubernetes', category: 'frameworks' },
  { name: 'AWS (EC2)', category: 'frameworks' },
  { name: 'Firebase', category: 'frameworks' },
  { name: 'ServiceNow', category: 'frameworks' },
  { name: 'PyTorch', category: 'frameworks' },
  { name: 'Ollama', category: 'frameworks' },
  { name: 'Claude Code', category: 'frameworks' },
  { name: 'Cursor', category: 'frameworks' },
  // Systems & platforms
  { name: 'Linux', category: 'systems' },
  { name: 'RHEL', category: 'systems' },
  { name: 'Billing Systems', category: 'systems' },
  { name: 'Production Support', category: 'systems' },
  // Concepts
  { name: 'Microservices', category: 'concepts' },
  { name: 'Distributed Systems', category: 'concepts' },
  { name: 'REST APIs', category: 'concepts' },
  { name: 'Workflow Automation', category: 'concepts' },
  { name: 'Prompt Engineering', category: 'concepts' },
  { name: 'pandas', category: 'concepts' },
  { name: 'NumPy', category: 'concepts' },
  { name: 'pytest', category: 'concepts' },
  { name: 'Relational Databases', category: 'concepts' },
  { name: 'Algorithms', category: 'concepts' },
  { name: 'Edge Computing', category: 'concepts' },
  { name: 'Workload Partitioning', category: 'concepts' },
  // Certifications
  { name: 'AWS Generative AI Applications', category: 'certifications' },
  { name: 'IBM Data Analysis Professional', category: 'certifications' }
];

const categoryColors: Record<string, string> = {
  languages:
    'bg-blue-600/15 text-blue-800 border-blue-600/30 hover:bg-blue-600/25',
  frameworks:
    'bg-green-600/15 text-green-800 border-green-600/30 hover:bg-green-600/25',
  systems:
    'bg-purple-600/15 text-purple-800 border-purple-600/30 hover:bg-purple-600/25',
  concepts:
    'bg-slate-600/15 text-slate-800 border-slate-600/30 hover:bg-slate-600/25',
  certifications:
    'bg-amber-600/15 text-amber-800 border-amber-600/30 hover:bg-amber-600/25'
};

export default function SkillsCloud() {
  const containerRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    const skillElements = skillsRef.current;

    if (!container || !skillElements.length) return;

    // Staggered reveal animation
    gsap.fromTo(
      skillElements,
      {
        opacity: 0,
        scale: 0.5,
        y: 30
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.6,
        ease: 'back.out(1.5)',
        stagger: {
          each: 0.05,
          from: 'random'
        },
        scrollTrigger: {
          trigger: container,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === container) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <div ref={containerRef} className="flex flex-wrap justify-center gap-3">
      {skills.map((skill, i) => (
        <Magnetic key={skill.name}>
          <div
            ref={(el) => {
              if (el) skillsRef.current[i] = el;
            }}
            className={`cursor-default rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 md:px-6 md:py-3 md:text-base ${
              categoryColors[skill.category]
            }`}
          >
            {skill.name}
          </div>
        </Magnetic>
      ))}
    </div>
  );
}
