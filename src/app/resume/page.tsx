'use client';

import { Download } from 'lucide-react';
import Layout from '@/components/layout';
import Magnetic from '@/components/animations/magnetic';

const RESUME_PATH = '/Muzaffar_Khaydarov_Resume.pdf';

export default function ResumePage() {
  return (
    <Layout title="Resume" center>
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-8">
        <div className="aspect-[8.5/11] w-full overflow-hidden rounded-2xl border border-foreground/10 shadow-lg">
          <iframe
            src={`${RESUME_PATH}#view=FitH`}
            title="Muzaffar Khaydarov Resume"
            className="h-full w-full"
          />
        </div>
        <Magnetic>
          <a
            href={RESUME_PATH}
            download
            className="flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-transform duration-300 hover:scale-105"
          >
            <Download size={18} />
            Download PDF
          </a>
        </Magnetic>
      </div>
    </Layout>
  );
}
