import { Inter, JetBrains_Mono, Instrument_Serif } from 'next/font/google';
import './globals.css';
import React, { ReactNode } from 'react';
import { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Header from '@/components/site/Header';
import Footer from '@/components/site/Footer';
import { SITE, abs } from '@/lib/site';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });
const display = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-display'
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: SITE.title, template: `%s — ${SITE.name}` },
  description: SITE.description,
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  keywords: [
    'Muzaffar Khaydarov',
    'software engineer',
    'distributed systems',
    'data engineering',
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
  image: abs('/images/portrait.webp'),
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

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('theme');var d=s?s==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;var e=document.documentElement;e.classList.toggle('dark',d);e.setAttribute('data-theme',d?'dark':'light');}catch(e){}})();`
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body
        className={`${inter.variable} ${mono.variable} ${display.variable} overflow-x-hidden`}
        suppressHydrationWarning
      >
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-[var(--accent)] focus:px-4 focus:py-2 focus:text-[var(--accent-ink)]"
        >
          Skip to content
        </a>
        <Header />
        <main id="content">{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
