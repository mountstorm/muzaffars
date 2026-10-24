import { Inter } from 'next/font/google';
import './globals.css';
import React, { ReactNode } from 'react';
import { Metadata } from 'next';
import Animations from './animations';
import Header from '@/components/layout/header';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { SITE, abs } from '@/lib/site';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.title,
    template: `%s — ${SITE.name}`
  },
  description: SITE.description,
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  keywords: [
    'Muzaffar Khaydarov',
    'software engineer',
    'distributed systems',
    'split inference',
    'edge computing',
    'University of Mississippi',
    'Ole Miss computer science'
  ],
  alternates: { canonical: '/' },
  openGraph: {
    title: SITE.title,
    description: SITE.description,
    siteName: SITE.shortName,
    url: SITE.url,
    locale: 'en_US',
    type: 'website',
    images: [{ url: '/og/home', width: 1200, height: 630, alt: SITE.title }]
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE.title,
    description: SITE.description,
    images: ['/og/home']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' }
  }
};

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: SITE.name,
  url: SITE.url,
  email: `mailto:${SITE.email}`,
  image: abs('/images/profile.png'),
  jobTitle: 'Software Engineer',
  description: SITE.description,
  homeLocation: { '@type': 'Place', name: SITE.location },
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'University of Mississippi',
    sameAs: 'https://olemiss.edu'
  },
  worksFor: { '@type': 'Organization', name: 'C Spire', sameAs: 'https://www.cspire.com' },
  knowsAbout: [
    'Distributed Systems',
    'Data Engineering',
    'Billing Systems',
    'Python',
    'TypeScript',
    'Django',
    'Object Detection'
  ],
  sameAs: [SITE.github, SITE.linkedin]
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          // Set the theme class synchronously before hydration to avoid a flash of
          // incorrect theme / hydration mismatch.
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var stored=localStorage.getItem('theme');var isDark=stored?stored==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.classList.toggle('dark',isDark);}catch(e){}})();`
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body className="overflow-scroll overflow-x-hidden" suppressHydrationWarning>
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-foreground focus:px-4 focus:py-2 focus:text-background"
        >
          Skip to content
        </a>
        <Animations>
          <main>
            <Header />
            <div className="flex flex-col bg-background text-foreground">
              <main id="content" className={`flex-grow ${inter.className}`}>
                {children}
              </main>
              <Analytics />
              <SpeedInsights />
            </div>
          </main>
        </Animations>
      </body>
    </html>
  );
}
