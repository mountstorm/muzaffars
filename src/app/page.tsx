import HomeClient from './HomeClient';
import { pageMetadata } from '@/lib/metadata';
import { SITE } from '@/lib/site';

export const metadata = {
  ...pageMetadata({
    title: SITE.title,
    description: SITE.description,
    path: '/',
    og: 'home'
  }),
  // The home page carries the full title rather than the "%s — Name" template.
  title: { absolute: SITE.title }
};

export default function Page() {
  return <HomeClient />;
}
