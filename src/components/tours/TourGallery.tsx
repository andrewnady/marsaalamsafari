import Image from 'next/image';
import type { Image as ImageType } from '@/content/types';

/**
 * Hero gallery mosaic. First image is the LCP element (priority). Remaining
 * images fill a responsive grid; all carry descriptive alt text.
 */
export function TourGallery({ hero, gallery, title }: { hero: ImageType; gallery: ImageType[]; title: string }) {
  const thumbs = gallery.slice(0, 4);
  return (
    <div className="grid gap-2 overflow-hidden rounded-2xl sm:grid-cols-4 sm:grid-rows-2">
      <div className="relative aspect-[16/10] sm:col-span-2 sm:row-span-2 sm:aspect-auto">
        <Image
          src={hero.src}
          alt={hero.alt}
          fill
          priority
          sizes="(max-width: 640px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
      {thumbs.map((image, i) => (
        <div key={i} className="relative hidden aspect-[4/3] sm:block">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="25vw"
            className="object-cover"
          />
          {i === thumbs.length - 1 && gallery.length > 4 && (
            <div className="absolute inset-0 flex items-center justify-center bg-charcoal/50 text-sm font-semibold text-white">
              +{gallery.length - 4} photos
            </div>
          )}
        </div>
      ))}
      <span className="sr-only">Photo gallery for {title}</span>
    </div>
  );
}
