import Image from 'next/image';
import Reveal from '@/components/site/Reveal';
import { Shell, PageHead } from '@/components/site/ui';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'Gallery',
  description:
    'Coding, travelling, sport and learning — from HackHarvard to Nowruz at Harvard to a first Waymo ride.',
  path: '/gallery',
  og: 'gallery'
});

const photos = [
  { src: 'me-at-boston.jpg', caption: 'Before HackHarvard', span: 'sm:col-span-2 sm:row-span-2' },
  { src: 'programming-wlkata-robot.jpg', caption: 'Programming a Wlkata arm for the pharmaceutical research project' },
  { src: 'cspire-office.jpg', caption: 'First day at C Spire' },
  { src: 'nowruz-at-harvard.jpg', caption: 'Organizing the Uzbek corner for Nowruz at Harvard', span: 'sm:col-span-2' },
  { src: 'olemiss.jpg', caption: 'Ole Miss, 2026' },
  { src: 'world-cup.jpg', caption: 'Uzbekistan v Congo, World Cup 2026' },
  { src: 'san-fran.jpg', caption: 'SilkRoad Innovation Hub, Palo Alto' },
  { src: 'basketball.jpg', caption: 'Basketball after 3pm labs' },
  { src: 'waymo.jpg', caption: 'First Waymo ride' },
  { src: 'grass.jpg', caption: 'A walk in Boston' },
  { src: 'chinese-food.jpg', caption: 'After finals' },
  { src: 'soccer.jpg', caption: 'Brussels metro' }
];

export default function GalleryPage() {
  return (
    <Shell>
      <PageHead
        index="06"
        label="Gallery"
        title="Off the clock."
        lede="Coding, travelling, sport and learning — the parts that don't fit on a resume."
      />

      <ul className="grid auto-rows-[18rem] grid-cols-1 gap-4 pb-8 sm:grid-cols-3">
        {photos.map((p, i) => (
          <Reveal
            as="li"
            key={p.src}
            delay={(i % 4) * 50}
            className={p.span ?? ''}
          >
            <figure className="glass-media group relative h-full w-full">
              <Image
                src={`/images/gallery/${p.src}`}
                alt={p.caption}
                fill
                loading="lazy"
                sizes="(max-width: 640px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="mono text-[0.8rem] text-white">{p.caption}</span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </ul>
    </Shell>
  );
}
