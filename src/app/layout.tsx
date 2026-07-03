import { Inter } from 'next/font/google';
import './globals.css';
import React, { ReactNode } from 'react';
import { Metadata } from 'next';
import Animations from './animations';
import Header from '@/components/layout/header';
import { Analytics } from '@vercel/analytics/react';
import { Toaster } from '@/components/ui/toaster';
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Muzaffar's World",
  description: 'Software engineer & builder. Portfolio, projects, and writing.',
  authors: [{ name: 'Muzaffar Khaydarov' }],
  openGraph: {
    title: "Muzaffar's World",
    description: 'Software engineer & builder. Portfolio, projects, and writing.',
    siteName: "Muzaffar's World",
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: "Muzaffar's World",
    description: 'Software engineer & builder. Portfolio, projects, and writing.'
  }
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
      </head>
      <SpeedInsights />
      <body className="overflow-scroll overflow-x-hidden" suppressHydrationWarning>
        <Animations>
          <main>
            <Header />
            <div className="flex flex-col bg-background text-foreground">
              <main className={`flex-grow ${inter.className}`}>{children}</main>
              <Analytics />
            </div>
            <Toaster />
          </main>
        </Animations>
      </body>
    </html>
  );
}
