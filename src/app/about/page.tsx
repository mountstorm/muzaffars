import AboutClient from './AboutClient';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'About',
  description:
    'Junior at Ole Miss studying CS and math. Production billing systems at C Spire, split-inference research with Prof. Feng Wang, and the path that got me here.',
  path: '/about',
  og: 'about'
});

export default function Page() {
  return <AboutClient />;
}
