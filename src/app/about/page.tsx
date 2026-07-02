'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSpotify } from '@/hooks/useSpotify';
import { useGitHub } from '@/hooks/useGithub';
import Layout from '@/components/layout';
import AnimatedSection from '@/components/about/AnimatedSection';
import TextReveal from '@/components/about/TextReveal';
import JourneyTimeline from '@/components/about/JourneyTimeline';
import SkillsCloud from '@/components/about/SkillsCloud';
import GitHubContributionsGraph from '@/app/about/githubActivity';
import SpotifyPlaylists from '@/app/about/spotifyPlaylists';

export default function About() {
  const {
    playlists,
    isLoading: spotifyLoading,
    error: spotifyError
  } = useSpotify();

  const {
    githubData,
    isLoading: githubLoading,
    error: githubError
  } = useGitHub();

  return (
    <div className="relative overflow-hidden">
      <Layout title="About Me" center>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <section className="grid gap-8 py-12 md:gap-12 lg:grid-cols-5 lg:gap-16">
            <AnimatedSection
              animation="fade-right"
              className="lg:sticky lg:top-32 lg:col-span-2 lg:self-start"
            >
              <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl">
                <Image
                  src="/images/profile.png"
                  alt="Muzaffar Khaydarov"
                  fill
                  className="object-cover object-center"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
                />
              </div>
            </AnimatedSection>

            <div className="space-y-8 lg:col-span-3">
              <AnimatedSection animation="fade-up">
                <TextReveal
                  text="Computer science student at the University of Mississippi, minoring in math, and an undergraduate researcher working on distributed AI systems. Currently a Software Engineering Intern at C Spire."
                  className="text-xl font-medium leading-relaxed text-foreground/90 sm:text-2xl"
                  as="p"
                  highlightWords={['mississippi,', 'distributed', 'c']}
                  scrub={false}
                />
              </AnimatedSection>

              <AnimatedSection animation="fade-up" delay={0.1}>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">
                    What I'm Into
                  </h3>
                  <p className="leading-relaxed text-foreground/70">
                    I like problems that span layers — from billing systems
                    processing thousands of records a week, to splitting a
                    neural network across a phone, an edge server, and the
                    cloud. Right now that means researching split-inference
                    systems with Prof. Feng Wang, in collaboration with the
                    University of Memphis.
                  </p>
                </div>
              </AnimatedSection>

              <AnimatedSection animation="fade-up" delay={0.2}>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">
                    Beyond Code
                  </h3>
                  <p className="leading-relaxed text-foreground/70">
                    Outside of research and my internship, I TA core CS
                    courses at Ole Miss, guiding 49+ students through
                    object-oriented programming, data structures, and
                    algorithms, and I build side projects at hackathons like
                    EmoryHacks.
                  </p>
                </div>
              </AnimatedSection>
            </div>
          </section>

          {/* Education Section */}
          <section className="py-16">
            <AnimatedSection animation="fade-up">
              <div className="rounded-2xl border border-border bg-card p-6 text-card-foreground shadow-sm sm:p-8">
                <h2 className="mb-4 text-xl font-bold text-foreground sm:text-2xl">
                  Education & Recognition
                </h2>
                <p className="mb-6 text-foreground/70">
                  Based in{' '}
                  <span className="font-semibold text-foreground">
                    Oxford, MS
                  </span>
                  , pursuing a B.S. in Computer Science with a minor in
                  Mathematics at the University of Mississippi (Aug. 2024 –
                  May 2028). 3.87/4.0 GPA, Chancellor&apos;s Roll every
                  semester, and a member of the Sally McDonnell Barksdale
                  Honors College (top 5%).
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/projects"
                    className="group inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-sm text-amber-600 transition-all hover:bg-amber-500/20"
                  >
                    See projects
                    <span className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          </section>

          {/* Journey Section */}
          <section className="py-16">
            <AnimatedSection animation="fade-up">
              <div className="mb-12 text-center">
                <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                  Where I&apos;ve Been
                </h2>
              </div>
            </AnimatedSection>
            <JourneyTimeline />
          </section>

          {/* Skills Section */}
          <section className="py-16">
            <AnimatedSection animation="fade-up">
              <div className="mb-8 text-center">
                <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                  Tools & Technologies
                </h2>
              </div>
            </AnimatedSection>
            <SkillsCloud />
          </section>

          {/* GitHub Activity Section */}
          {!githubLoading && !githubError && githubData && (
            <section className="py-16">
              <AnimatedSection animation="fade-up">
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
            </section>
          )}

          {/* Spotify Section */}
          {!spotifyLoading && !spotifyError && playlists.length > 0 && (
            <section className="py-16">
              <AnimatedSection animation="fade-up">
                <SpotifyPlaylists playlists={playlists} />
              </AnimatedSection>
            </section>
          )}
        </div>
      </Layout>
    </div>
  );
}
