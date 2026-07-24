import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Section } from '@/components/ui/Section';
import { ReviewCard } from '@/components/reviews/ReviewCard';
import { StarRating } from '@/components/ui/StarRating';
import { CtaBanner } from '@/components/ui/CtaBanner';
import { JsonLd } from '@/components/seo/JsonLd';
import { reviews } from '@/content/reviews';
import { siteConfig, absoluteUrl } from '@/config/site';
import { buildMetadata } from '@/lib/seo/metadata';
import { breadcrumbSchema, webPageSchema } from '@/lib/seo/jsonld';

export const metadata: Metadata = buildMetadata({
  title: 'Reviews — What Our Guests Say',
  description:
    'Read verified reviews from travellers who explored Marsa Alam with us. Rated 4.9/5 across thousands of desert safaris, snorkeling trips and day tours.',
  path: '/reviews',
});

export default function ReviewsPage() {
  const url = absoluteUrl('/reviews');
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Reviews', path: '/reviews' },
  ];

  // Aggregate rating schema for the review collection page.
  const aggregate = {
    '@context': 'https://schema.org',
    '@type': 'AggregateRating',
    itemReviewed: { '@type': 'TravelAgency', name: siteConfig.legalName },
    ratingValue: siteConfig.trust.ratingValue,
    reviewCount: siteConfig.trust.reviewCount,
    bestRating: 5,
    worstRating: 1,
  };

  return (
    <>
      <JsonLd
        schema={[
          breadcrumbSchema(crumbs, url),
          aggregate,
          webPageSchema({ path: '/reviews', title: 'Reviews', description: metadata.description as string }),
        ]}
      />
      <div className="bg-beige-soft">
        <div className="container-page py-10">
          <Breadcrumbs items={crumbs} />
          <h1 className="mt-4 text-4xl font-bold sm:text-5xl">Traveller reviews</h1>
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <StarRating value={siteConfig.trust.ratingValue} count={siteConfig.trust.reviewCount} size="md" />
            <span className="text-charcoal-muted">
              Rated {siteConfig.trust.ratingValue}/5 from {siteConfig.trust.reviewCount.toLocaleString()} verified reviews
            </span>
          </div>
        </div>
      </div>
      <Section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r) => (
            <ReviewCard key={r.id} review={r} />
          ))}
        </div>
      </Section>
      <Section tone="beige">
        <CtaBanner />
      </Section>
    </>
  );
}
