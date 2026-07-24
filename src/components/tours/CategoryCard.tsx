import Link from 'next/link';
import Image from 'next/image';
import type { TourCategory } from '@/content/types';
import { Icon } from '@/components/ui/Icons';
import { getToursByCategory } from '@/content/tours';

export function CategoryCard({ category }: { category: TourCategory }) {
  const count = getToursByCategory(category.slug).length;
  return (
    <Link
      href={`/category/${category.slug}`}
      className="card group relative flex aspect-[16/10] flex-col justify-end overflow-hidden"
    >
      <Image
        src={category.image.src}
        alt={category.image.alt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 to-charcoal/10" />
      <div className="relative p-5 text-white">
        <h3 className="flex items-center gap-1.5 text-xl font-semibold">
          {category.name}
          <Icon.Arrow width={18} height={18} className="transition-transform group-hover:translate-x-1" />
        </h3>
        <p className="mt-1 text-sm text-white/75">{count} tour{count === 1 ? '' : 's'}</p>
      </div>
    </Link>
  );
}
