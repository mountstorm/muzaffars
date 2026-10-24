import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';

const routes = [
  { path: '', priority: 1 },
  { path: '/about', priority: 0.9 },
  { path: '/projects', priority: 0.9 },
  { path: '/resume', priority: 0.8 },
  { path: '/gallery', priority: 0.6 },
  { path: '/contact', priority: 0.6 }
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map(({ path, priority }) => ({
    url: `${SITE.url}${path}`,
    lastModified,
    changeFrequency: 'monthly',
    priority
  }));
}
