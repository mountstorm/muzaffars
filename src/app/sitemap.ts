import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';
import { caseStudies } from '@/lib/case-studies';

const routes = [
  { path: '', priority: 1 },
  { path: '/about', priority: 0.9 },
  { path: '/projects', priority: 0.9 },
  { path: '/resume', priority: 0.8 },
  { path: '/gallery', priority: 0.6 },
  { path: '/contact', priority: 0.6 }
];

export default function sitemap(): MetadataRoute.Sitemap {
  const studies = caseStudies.map((c) => ({
    path: `/projects/${c.slug}`,
    priority: 0.8
  }));

  const lastModified = new Date();
  const extra = [{ path: '/projects/worldcup', priority: 0.8 }];

  return [...routes, ...studies, ...extra].map(({ path, priority }) => ({
    url: `${SITE.url}${path}`,
    lastModified,
    changeFrequency: 'monthly',
    priority
  }));
}
