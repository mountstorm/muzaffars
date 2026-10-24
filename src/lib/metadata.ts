import type { Metadata } from 'next';
import { SITE } from '@/lib/site';

type PageMetaInput = {
  /** Used for the <title>; the root layout appends the site name. */
  title: string;
  description: string;
  /** Site-relative path, e.g. "/projects". */
  path: string;
  /** Key of the /og/[page] route that renders this page's social card. */
  og: string;
};

export function pageMetadata({
  title,
  description,
  path,
  og
}: PageMetaInput): Metadata {
  const image = { url: `/og/${og}`, width: 1200, height: 630, alt: title };
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} — ${SITE.name}`,
      description,
      url: `${SITE.url}${path}`,
      siteName: SITE.shortName,
      type: 'website',
      images: [image]
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} — ${SITE.name}`,
      description,
      images: [image.url]
    }
  };
}
