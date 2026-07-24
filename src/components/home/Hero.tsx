import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@/components/ui/Icons';
import { StarRating } from '@/components/ui/StarRating';
import { siteConfig } from '@/config/site';

/**
 * LCP-critical hero. The background image is marked priority and sized for
 * full-viewport; text sits on a gradient scrim for AA contrast.
 */
export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-charcoal">
      <Image
        src="https://images.unsplash.com/photo-1516815231560-8f41ec531527?auto=format&fit=crop&w=2000&q=70"
        alt="Aerial view of the turquoise Red Sea meeting the golden desert coastline at Marsa Alam, Egypt"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/45 to-charcoal/30" />

      <div className="container-page relative flex min-h-[78vh] flex-col justify-center py-20 text-white lg:min-h-[86vh]">
        <div className="max-w-3xl animate-fade-up">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] backdrop-blur-sm">
            <Icon.Pin width={14} height={14} className="text-turquoise-light" /> Marsa Alam · Red Sea · Egypt
          </p>
          <h1 className="text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
            Premium Marsa Alam safaris, snorkeling &amp; day trips
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/80">
            Swim with wild dolphins, ride the Eastern Desert at sunset, and stand in the temples of
            ancient Egypt — with licensed local guides, free hotel pickup and a best-price guarantee.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/tours" className="btn-primary text-base">
              Explore all tours <Icon.Arrow width={18} height={18} />
            </Link>
            <Link href="/best-marsa-alam-safari" className="btn-outline border-white/25 bg-white/10 text-base text-white hover:bg-white/20">
              Best desert safaris
            </Link>
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm text-white/80">
            <StarRating value={siteConfig.trust.ratingValue} count={siteConfig.trust.reviewCount} size="md" className="[&_*]:text-white" />
            <span className="inline-flex items-center gap-1.5">
              <Icon.Shield width={16} height={16} className="text-turquoise-light" /> Licensed &amp; insured
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Icon.Check width={16} height={16} className="text-turquoise-light" /> Free hotel pickup
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
