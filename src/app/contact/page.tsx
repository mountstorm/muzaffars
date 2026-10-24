import ContactClient from './ContactClient';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'Contact',
  description:
    'Get in touch — email, LinkedIn, or GitHub. Currently seeking a Summer 2027 software engineering internship.',
  path: '/contact',
  og: 'contact'
});

export default function Page() {
  return <ContactClient />;
}
