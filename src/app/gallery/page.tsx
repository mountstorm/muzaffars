import GalleryClient from './GalleryClient';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'Gallery',
  description:
    'A visual memory palace — coding, travelling, sports, and learning, from HackHarvard to Nowruz at Harvard to a first Waymo ride.',
  path: '/gallery',
  og: 'gallery'
});

export default function Page() {
  return <GalleryClient />;
}
