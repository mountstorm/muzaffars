import Hero from '@/components/home/hero';
import FeaturedProjects from '@/components/home/FeaturedProjects';
import ExperienceSummary from '@/components/home/ExperienceSummary';
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
  title: { absolute: SITE.title }
};

export default function Page() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <ExperienceSummary />
      <HomeClient />
    </>
  );
}
