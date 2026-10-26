import Image from 'next/image';
import { Buffer, Section, Comment } from '@/components/shell/doc';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'Gallery',
  description:
    'Coding, travelling, sport and learning — from HackHarvard to Nowruz at Harvard to a first Waymo ride.',
  path: '/gallery',
  og: 'gallery'
});

// Treated as an asset directory: filename, caption, dimensions.
const assets = [
  { file: 'me-at-boston.jpg', caption: 'Happy before HackHarvard' },
  {
    file: 'programming-wlkata-robot.jpg',
    caption: 'Programming a Wlkata robot for the pharmaceutical research project'
  },
  { file: 'cspire-office.jpg', caption: 'First day at C Spire headquarters' },
  { file: 'olemiss.jpg', caption: 'Ole Miss 2026 graduation' },
  { file: 'nowruz-at-harvard.jpg', caption: 'Organizing the Uzbek corner for Nowruz at Harvard' },
  { file: 'world-cup.jpg', caption: 'Uzbekistan v Congo, World Cup 2026' },
  { file: 'san-fran.jpg', caption: 'SilkRoad Innovation Hub in Palo Alto, and San Francisco after' },
  { file: 'basketball.jpg', caption: 'Basketball after 3pm labs' },
  { file: 'waymo.jpg', caption: 'First Waymo ride' },
  { file: 'grass.jpg', caption: 'A walk in the park in Boston' },
  { file: 'chinese-food.jpg', caption: 'Chinese food after finals' },
  { file: 'soccer.jpg', caption: 'A good football poster in the Brussels metro' }
];

export default function GalleryPage() {
  return (
    <Buffer
      path="~/muzaffarkhaydarov.com/gallery/"
      title="gallery"
      lede="A visual memory of the last couple of years — coding, travelling, sport and learning."
      meta={<Comment>{assets.length} assets · jpeg</Comment>}
    >
      <Section>
        <ul className="grid grid-cols-1 gap-[3ch] sm:grid-cols-2 lg:grid-cols-3">
          {assets.map((asset, i) => (
            <li
              key={asset.file}
              className="ed-diff"
              style={{ '--ed-delay': `${i * 45}ms` } as React.CSSProperties}
            >
              <figure>
                <div className="relative aspect-[4/3] w-full overflow-hidden border border-[var(--ed-rule)]">
                  <Image
                    src={`/images/gallery/${asset.file}`}
                    alt={asset.caption}
                    fill
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 ease-out hover:scale-[1.03]"
                  />
                </div>
                <figcaption className="mt-[0.75ch]">
                  <span className="ed-mono block text-[12px] text-[var(--ed-key)]">
                    {asset.file}
                  </span>
                  <span className="ed-mono block text-[12px] leading-relaxed text-[var(--ed-faint)]">
                    {asset.caption}
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Section>
    </Buffer>
  );
}
