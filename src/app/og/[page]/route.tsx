import { ImageResponse } from 'next/og';
import { SITE } from '@/lib/site';

export const runtime = 'edge';

const SUBTITLES: Record<string, string> = {
  home: 'Software Engineer · Distributed AI Researcher · CS @ Ole Miss',
  about: 'Billing systems at C Spire, split-inference research at Ole Miss',
  projects: 'Split inference, 831k-row H-1B ETL, and production billing systems',
  resume: 'Software Engineer · Distributed AI Researcher · CS @ Ole Miss',
  gallery: 'Coding, travelling, sports, and learning',
  contact: "Let's work together"
};

export async function GET(
  _request: Request,
  { params }: { params: { page: string } }
) {
  const page = params.page.toLowerCase();
  const subtitle = SUBTITLES[page] ?? SUBTITLES.home;
  const path = page === 'home' ? '' : `/${page}`;

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: '#121417',
          color: '#ffffff',
          fontFamily: 'monospace'
        }}
      >
        <div style={{ fontSize: 30, color: '#8b949e' }}>$ whoami</div>
        <div
          style={{
            fontSize: 86,
            fontWeight: 700,
            lineHeight: 1.05,
            marginTop: 12,
            letterSpacing: '-0.02em'
          }}
        >
          Muzaffar Khaydarov
        </div>
        <div style={{ fontSize: 34, color: '#c9d1d9', marginTop: 24, maxWidth: 940 }}>
          {subtitle}
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 56,
            fontSize: 26,
            color: '#6e7681'
          }}
        >
          muzaffarkhaydarov.com{path}
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
