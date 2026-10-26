import Hero from '@/components/home/Hero';
import SelectedWork from '@/components/home/SelectedWork';
import Experience from '@/components/home/Experience';
import { pageMetadata } from '@/lib/metadata';
import { SITE } from '@/lib/site';

export const metadata = {
  ...pageMetadata({
    title: SITE.title,
    description: SITE.description,
    path: '/',
    og: 'home'
  }),
  title: { absolute: SITE.title }
};

export default function Page() {
  return (
    <>
      <Hero />
      <SelectedWork />
      <Experience />
    </>
  );
}
