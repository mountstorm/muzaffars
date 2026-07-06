'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star } from 'lucide-react';
import Magnetic from '@/components/animations/magnetic';

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  name: string;
  category: 'languages' | 'frameworks' | 'systems' | 'concepts' | 'certifications';
  proficiency: number; // 0-100
}

const skills: Skill[] = [
  // Languages
  { name: 'Java', category: 'languages', proficiency: 90 },
  { name: 'Python', category: 'languages', proficiency: 90 },
  { name: 'C++', category: 'languages', proficiency: 75 },
  { name: 'C', category: 'languages', proficiency: 70 },
  { name: 'JavaScript', category: 'languages', proficiency: 85 },
  { name: 'TypeScript', category: 'languages', proficiency: 80 },
  { name: 'Perl', category: 'languages', proficiency: 60 },
  { name: 'SQL', category: 'languages', proficiency: 85 },
  { name: 'Bash', category: 'languages', proficiency: 75 },
  // Frameworks & tools
  { name: 'Spring Boot', category: 'frameworks', proficiency: 80 },
  { name: 'Node.js', category: 'frameworks', proficiency: 80 },
  { name: 'Next.js', category: 'frameworks', proficiency: 85 },
  { name: 'Flask', category: 'frameworks', proficiency: 75 },
  { name: 'LangChain', category: 'frameworks', proficiency: 70 },
  { name: 'Vite', category: 'frameworks', proficiency: 75 },
  { name: 'Git', category: 'frameworks', proficiency: 90 },
  { name: 'Docker', category: 'frameworks', proficiency: 75 },
  { name: 'Kubernetes', category: 'frameworks', proficiency: 65 },
  { name: 'AWS (EC2)', category: 'frameworks', proficiency: 75 },
  { name: 'Firebase', category: 'frameworks', proficiency: 70 },
  { name: 'ServiceNow', category: 'frameworks', proficiency: 80 },
  { name: 'PyTorch', category: 'frameworks', proficiency: 65 },
  { name: 'Ollama', category: 'frameworks', proficiency: 70 },
  { name: 'Claude Code', category: 'frameworks', proficiency: 85 },
  { name: 'Cursor', category: 'frameworks', proficiency: 85 },
  // Systems & platforms
  { name: 'Linux', category: 'systems', proficiency: 85 },
  { name: 'RHEL', category: 'systems', proficiency: 80 },
  { name: 'Billing Systems', category: 'systems', proficiency: 85 },
  { name: 'Production Support', category: 'systems', proficiency: 85 },
  // Concepts
  { name: 'Microservices', category: 'concepts', proficiency: 75 },
  { name: 'Distributed Systems', category: 'concepts', proficiency: 70 },
  { name: 'REST APIs', category: 'concepts', proficiency: 90 },
  { name: 'Workflow Automation', category: 'concepts', proficiency: 80 },
  { name: 'Prompt Engineering', category: 'concepts', proficiency: 85 },
  { name: 'pandas', category: 'concepts', proficiency: 80 },
  { name: 'NumPy', category: 'concepts', proficiency: 75 },
  { name: 'pytest', category: 'concepts', proficiency: 75 },
  { name: 'Relational Databases', category: 'concepts', proficiency: 85 },
  { name: 'Algorithms', category: 'concepts', proficiency: 80 },
  { name: 'Edge Computing', category: 'concepts', proficiency: 65 },
  { name: 'Workload Partitioning', category: 'concepts', proficiency: 65 },
  // Certifications
  { name: 'AWS Generative AI Applications', category: 'certifications', proficiency: 100 },
  { name: 'IBM Data Analysis Professional', category: 'certifications', proficiency: 100 }
];

const categoryColors: Record<string, string> = {
  languages:
    'bg-emerald-600/15 text-emerald-800 border-emerald-600/30 hover:bg-emerald-600/25 dark:text-emerald-300',
  frameworks:
    'bg-green-600/15 text-green-800 border-green-600/30 hover:bg-green-600/25 dark:text-green-300',
  systems:
    'bg-teal-600/15 text-teal-800 border-teal-600/30 hover:bg-teal-600/25 dark:text-teal-300',
  concepts:
    'bg-lime-600/15 text-lime-800 border-lime-600/30 hover:bg-lime-600/25 dark:text-lime-300',
  certifications:
    'bg-amber-600/15 text-amber-800 border-amber-600/30 hover:bg-amber-600/25 dark:text-amber-300'
};

export default function SkillsCloud() {
  const containerRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement[]>([]);
  const [hovered, setHovered] = useState<string | null>(null);

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
      {skills.map((skill, i) => {
        const isHovered = hovered === skill.name;
        const filledStars = Math.round(skill.proficiency / 20);
        return (
          <Magnetic key={skill.name}>
            <div
              ref={(el) => {
                if (el) skillsRef.current[i] = el;
              }}
              onMouseEnter={() => setHovered(skill.name)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(skill.name)}
              onBlur={() => setHovered(null)}
              tabIndex={0}
              className={`group relative cursor-default rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 md:px-6 md:py-3 md:text-base ${
                categoryColors[skill.category]
              }`}
            >
              {skill.name}
              <div
                className={`pointer-events-none absolute left-1/2 top-full z-20 mt-2 flex -translate-x-1/2 flex-col items-center gap-1 whitespace-nowrap rounded-lg border border-foreground/10 bg-background px-3 py-2 text-xs text-foreground shadow-lg transition-all duration-200 ${
                  isHovered
                    ? 'translate-y-0 opacity-100'
                    : '-translate-y-1 opacity-0'
                }`}
              >
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Star
                      key={starIndex}
                      size={14}
                      className={
                        starIndex < filledStars
                          ? 'fill-current text-amber-500'
                          : 'text-foreground/20'
                      }
                    />
                  ))}
                </div>
                <span className="font-semibold">{skill.proficiency}% proficiency</span>
              </div>
            </div>
          </Magnetic>
        );
      })}
    </div>
  );
}
