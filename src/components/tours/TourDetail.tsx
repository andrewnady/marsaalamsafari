import Link from 'next/link';
import type { Tour } from '@/content/types';
import { Breadcrumbs, type Crumb } from '@/components/ui/Breadcrumbs';
import { StarRating } from '@/components/ui/StarRating';
import { Icon } from '@/components/ui/Icons';
import { TourGallery } from './TourGallery';
import { IncludedList } from './IncludedList';
import { TourCard } from './TourCard';
import { BookingWidget } from '@/components/booking/BookingWidget';
import { FaqAccordion } from '@/components/ui/FaqAccordion';
import { MapEmbed } from '@/components/ui/MapEmbed';
import { ReviewCard } from '@/components/reviews/ReviewCard';
import { Section, SectionHeading } from '@/components/ui/Section';
import { CtaBanner } from '@/components/ui/CtaBanner';
import { getRelatedTours } from '@/content/tours';
import { getReviewsForTour } from '@/content/reviews';
import { getCategory } from '@/content/categories';
import { getDestination } from '@/content/destinations';

function QuickFact({ icon: I, label, value }: { icon: typeof Icon.Clock; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-charcoal/[0.08] bg-white px-4 py-3">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-ocean/10 text-ocean">
        <I width={18} height={18} />
      </span>
      <div>
        <p className="text-[0.68rem] uppercase tracking-wide text-charcoal-muted">{label}</p>
        <p className="text-sm font-semibold text-charcoal">{value}</p>
      </div>
    </div>
  );
}

export function TourDetail({ tour }: { tour: Tour }) {
  const category = getCategory(tour.category);
  const related = getRelatedTours(tour, 3);
  const reviews = getReviewsForTour(tour.slug);
  const firstDestinationSlug = tour.destinationSlugs[0];
  const primaryDestination = firstDestinationSlug ? getDestination(firstDestinationSlug) : undefined;

  const crumbs: Crumb[] = [
    { name: 'Home', path: '/' },
    { name: 'Tours', path: '/tours' },
    ...(category ? [{ name: category.name, path: `/category/${category.slug}` }] : []),
    { name: tour.title, path: `/${tour.slug}` },
  ];

  const mapQuery = primaryDestination?.name
    ? `${primaryDestination.name}, Marsa Alam, Egypt`
    : 'Marsa Alam, Red Sea, Egypt';

  return (
    <>
      <div className="container-page pt-6">
        <Breadcrumbs items={crumbs} />
      </div>

      {/* Header */}
      <div className="container-page pt-5">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          {tour.bestseller && (
            <span className="rounded-full bg-sunset px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
              Bestseller
            </span>
          )}
          {category && (
            <Link href={`/category/${category.slug}`} className="text-sm font-semibold text-ocean hover:underline">
              {category.name}
            </Link>
          )}
        </div>
        <h1 className="mt-2 max-w-3xl text-3xl font-bold sm:text-4xl lg:text-[2.6rem] lg:leading-[1.1]">
          {tour.title}
        </h1>
        <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-charcoal-muted">
          <StarRating value={tour.rating} count={tour.reviewCount} />
          {primaryDestination && (
            <Link href={`/destinations/${primaryDestination.slug}`} className="inline-flex items-center gap-1 hover:text-ocean">
              <Icon.Pin width={15} height={15} /> {primaryDestination.name}
            </Link>
          )}
          <span className="inline-flex items-center gap-1">
            <Icon.Check width={15} height={15} className="text-ocean" /> Free hotel pickup
          </span>
        </div>
      </div>

      {/* Gallery */}
      <div className="container-page mt-6">
        <TourGallery hero={tour.heroImage} gallery={tour.gallery} title={tour.title} />
      </div>

      {/* Body */}
      <div className="container-page mt-10 grid gap-10 lg:grid-cols-[1.55fr_1fr]">
        <div className="min-w-0">
          {/* Quick facts */}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-2">
            <QuickFact icon={Icon.Clock} label="Duration" value={tour.durationLabel} />
            <QuickFact icon={Icon.Users} label="Group size" value={tour.groupSize} />
            <QuickFact icon={Icon.Calendar} label="Availability" value={tour.availability} />
            <QuickFact icon={Icon.Sparkle} label="Difficulty" value={tour.difficulty} />
            <QuickFact icon={Icon.Globe} label="Languages" value={tour.languages.join(', ')} />
            {tour.minAge !== undefined && (
              <QuickFact icon={Icon.Shield} label="Minimum age" value={`${tour.minAge}+ years`} />
            )}
          </div>

          {/* Overview */}
          <section className="mt-10">
            <h2 className="text-2xl font-semibold">Overview</h2>
            <div className="mt-4 space-y-4 text-lg leading-relaxed text-charcoal-soft">
              {tour.overview.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>

          {/* Highlights */}
          <section className="mt-10">
            <h2 className="text-2xl font-semibold">Highlights</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {tour.highlights.map((h) => (
                <li key={h} className="flex gap-2.5 text-charcoal-soft">
                  <Icon.Sparkle width={18} height={18} className="mt-0.5 shrink-0 text-sand" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Itinerary */}
          <section className="mt-10">
            <h2 className="text-2xl font-semibold">Itinerary</h2>
            <ol className="mt-5 space-y-5 border-l-2 border-ocean/15 pl-6">
              {tour.itinerary.map((step, i) => (
                <li key={i} className="relative">
                  <span className="absolute -left-[1.9rem] top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-ocean bg-white" />
                  {step.time && (
                    <span className="text-xs font-bold uppercase tracking-wide text-ocean">{step.time}</span>
                  )}
                  <h3 className="text-base font-semibold text-charcoal">{step.title}</h3>
                  <p className="mt-0.5 text-charcoal-muted">{step.description}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* Included / excluded */}
          <section className="mt-10">
            <h2 className="text-2xl font-semibold">What’s included</h2>
            <div className="mt-5">
              <IncludedList included={tour.included} excluded={tour.excluded} />
            </div>
          </section>

          {/* Pickup + what to bring */}
          <section className="mt-10 grid gap-8 sm:grid-cols-2">
            <div>
              <h2 className="text-xl font-semibold">Hotel pickup</h2>
              <p className="mt-3 text-charcoal-muted">{tour.pickup.note}</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {tour.pickup.areas.map((area) => (
                  <li key={area} className="rounded-full bg-beige-soft px-3 py-1 text-sm text-charcoal-soft">
                    {area}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-semibold">What to bring</h2>
              <ul className="mt-3 space-y-2">
                {tour.whatToBring.map((item) => (
                  <li key={item} className="flex gap-2.5 text-charcoal-soft">
                    <Icon.Check width={18} height={18} className="mt-0.5 shrink-0 text-ocean" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Map */}
          <section className="mt-10">
            <h2 className="mb-4 text-2xl font-semibold">Where you’ll go</h2>
            <MapEmbed query={mapQuery} title={`Map of ${tour.title}`} />
          </section>

          {/* Cancellation */}
          <section className="mt-10 rounded-2xl border border-ocean/15 bg-ocean/[0.04] p-6">
            <h2 className="flex items-center gap-2 text-lg font-semibold">
              <Icon.Shield width={20} height={20} className="text-ocean" /> Cancellation policy
            </h2>
            <p className="mt-2 text-charcoal-soft">{tour.cancellation}</p>
          </section>
        </div>

        {/* Sticky booking */}
        <aside className="lg:sticky lg:top-24 lg:h-fit">
          <BookingWidget tour={tour} />
        </aside>
      </div>

      {/* Reviews */}
      {reviews.length > 0 && (
        <Section tone="beige" className="mt-14">
          <SectionHeading eyebrow="Traveller reviews" title={`What guests say about this tour`} />
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((r) => (
              <ReviewCard key={r.id} review={r} />
            ))}
          </div>
        </Section>
      )}

      {/* FAQ */}
      <Section className={reviews.length > 0 ? '' : 'mt-14'}>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading
            eyebrow="Questions & answers"
            title="Everything you need to know"
            description="Can’t find your answer? Message us on WhatsApp and we’ll reply quickly."
          />
          <FaqAccordion faqs={tour.faqs} />
        </div>
      </Section>

      {/* Related */}
      <Section tone="beige">
        <SectionHeading eyebrow="You may also like" title="Related tours & experiences" />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((t) => (
            <TourCard key={t.slug} tour={t} />
          ))}
        </div>
      </Section>

      <Section>
        <CtaBanner
          title={`Ready to book ${tour.title.split(':')[0] ?? tour.title}?`}
          whatsappMessage={`Hi! I’d like to book the ${tour.title}.`}
        />
      </Section>
    </>
  );
}
