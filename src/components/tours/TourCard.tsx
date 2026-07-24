import Link from 'next/link';
import Image from 'next/image';
import type { Tour } from '@/content/types';
import { StarRating } from '@/components/ui/StarRating';
import { Icon } from '@/components/ui/Icons';
import { formatPrice, cn } from '@/lib/utils';

/** Tour route lives at the root for clean, keyword-rich URLs (/tour-slug). */
export function tourHref(tour: Pick<Tour, 'slug'>): string {
  return `/${tour.slug}`;
}

export function TourCard({ tour, priority = false }: { tour: Tour; priority?: boolean }) {
  const hasDiscount = tour.price.compareAt && tour.price.compareAt > tour.price.amount;

  return (
    <article className="card group flex flex-col">
      <Link href={tourHref(tour)} className="relative block aspect-[4/3] overflow-hidden">
        <Image
          src={tour.heroImage.src}
          alt={tour.heroImage.alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          priority={priority}
        />
        <div className="absolute left-3 top-3 flex gap-2">
          {tour.bestseller && (
            <span className="rounded-full bg-sunset px-2.5 py-1 text-[0.68rem] font-bold uppercase tracking-wide text-white shadow-sm">
              Bestseller
            </span>
          )}
          {hasDiscount && (
            <span className="rounded-full bg-ocean px-2.5 py-1 text-[0.68rem] font-bold uppercase tracking-wide text-white shadow-sm">
              Save {Math.round(100 - (tour.price.amount / tour.price.compareAt!) * 100)}%
            </span>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-2">
          <StarRating value={tour.rating} count={tour.reviewCount} />
          <span className="inline-flex items-center gap-1 text-xs text-charcoal-muted">
            <Icon.Clock width={14} height={14} />
            {tour.durationLabel.split('(')[0]?.trim() ?? tour.durationLabel}
          </span>
        </div>

        <h3 className="mt-2.5 text-lg font-semibold leading-snug">
          <Link href={tourHref(tour)} className="transition-colors hover:text-ocean">
            {tour.title}
          </Link>
        </h3>

        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-charcoal-muted">
          {tour.summary}
        </p>

        <div className="mt-4 flex items-end justify-between border-t border-charcoal/[0.07] pt-4">
          <div>
            <span className="block text-[0.68rem] uppercase tracking-wide text-charcoal-muted">From</span>
            <span className="flex items-baseline gap-1.5">
              <span className="text-xl font-bold text-charcoal">
                {formatPrice(tour.price.amount, tour.price.currency)}
              </span>
              {hasDiscount && (
                <span className="text-sm text-charcoal-muted line-through">
                  {formatPrice(tour.price.compareAt!, tour.price.currency)}
                </span>
              )}
              <span className="text-xs text-charcoal-muted">/ {tour.price.unit.replace('per ', '')}</span>
            </span>
          </div>
          <span
            className={cn(
              'inline-flex items-center gap-1 text-sm font-semibold text-ocean',
              'transition-transform group-hover:translate-x-0.5',
            )}
            aria-hidden
          >
            View <Icon.Arrow width={16} height={16} />
          </span>
        </div>
      </div>
    </article>
  );
}
