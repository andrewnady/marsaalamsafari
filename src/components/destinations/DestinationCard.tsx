import Link from 'next/link';
import Image from 'next/image';
import type { Destination } from '@/content/types';
import { Icon } from '@/components/ui/Icons';

export function DestinationCard({ destination }: { destination: Destination }) {
  return (
    <Link
      href={`/destinations/${destination.slug}`}
      className="card group relative block aspect-[3/4] overflow-hidden"
    >
      <Image
        src={destination.image.src}
        alt={destination.image.alt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-5 text-white">
        <p className="inline-flex items-center gap-1 text-xs font-medium text-turquoise-light">
          <Icon.Pin width={13} height={13} /> {destination.region}
        </p>
        <h3 className="mt-1 text-xl font-semibold text-white">{destination.name}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-white/75">{destination.shortDescription}</p>
      </div>
    </Link>
  );
}
