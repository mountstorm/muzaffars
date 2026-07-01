'use client';
import React from 'react';
import Image from 'next/image';

interface Props {
  title: string;
  tag: string;
  points: string[];
  src: string;
  color: string;
}

export default function ProjectLink({ title, tag, points, src, color }: Props) {
  return (
    <div
      className="flex w-full flex-col items-start justify-between gap-6 border-b border-b-gray-600 px-4 py-8 transition-all duration-200 hover:opacity-80 sm:flex-row sm:items-center sm:gap-10 sm:px-5 sm:py-10"
    >
      <div className="flex flex-1 flex-col gap-3">
        <div className="flex flex-wrap items-baseline gap-3">
          <h2 className="m-0 text-2xl font-normal sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          <span className="text-xs font-light uppercase tracking-widest text-gray-400 sm:text-sm">
            {tag}
          </span>
        </div>
        <ul className="m-0 flex list-none flex-col gap-1 p-0 text-sm font-light text-gray-300 sm:text-base">
          {points.map((point) => (
            <li key={point}>• {point}</li>
          ))}
        </ul>
      </div>
      <div
        className="relative h-32 w-full shrink-0 overflow-hidden rounded-lg sm:h-28 sm:w-40 lg:h-32 lg:w-48"
        style={{ backgroundColor: color }}
      >
        <Image
          src={`/images/${src}`}
          alt={`${title} preview`}
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}
