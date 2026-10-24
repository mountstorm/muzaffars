import ProjectsClient from './ProjectsClient';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'Projects',
  description:
    'Split-inference across device, edge, and cloud; an H-1B database built from 831k USCIS filings; and production billing systems at C Spire.',
  path: '/projects',
  og: 'projects'
});

export default function Page() {
  return <ProjectsClient />;
}
