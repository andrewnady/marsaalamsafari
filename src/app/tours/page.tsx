import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Section } from '@/components/ui/Section';
import { TourCard } from '@/components/tours/TourCard';
import { CtaBanner } from '@/components/ui/CtaBanner';
import { JsonLd } from '@/components/seo/JsonLd';
import { tours } from '@/content/tours';
import { categories } from '@/content/categories';
import { buildMetadata } from '@/lib/seo/metadata';
import { breadcrumbSchema, itemListSchema, webPageSchema } from '@/lib/seo/jsonld';
import { absoluteUrl } from '@/config/site';

export const metadata: Metadata = buildMetadata({
  title: 'All Marsa Alam Tours & Excursions',
  description:
    'Browse all Marsa Alam tours and excursions: desert safaris, dolphin and turtle snorkeling, diving, boat trips and day trips to Luxor and Aswan. Free hotel pickup on every tour.',
  path: '/tours',
});

export default function ToursPage() {
  const url = absoluteUrl('/tours');
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Tours', path: '/tours' },
  ];
  const sorted = [...tours].sort((a, b) => b.reviewCount - a.reviewCount);

  return (
    <>
      <JsonLd
        schema={[
          breadcrumbSchema(crumbs, url),
          webPageSchema({ path: '/tours', title: 'All Marsa Alam Tours', description: metadata.description as string }),
          itemListSchema(
            sorted.map((t) => ({ name: t.title, path: `/${t.slug}`, image: t.heroImage.src })),
            'All Marsa Alam Tours',
          ),
        ]}
      />

      <div className="bg-beige-soft">
        <div className="container-page py-10">
          <Breadcrumbs items={crumbs} />
          <h1 className="mt-4 text-4xl font-bold sm:text-5xl">Marsa Alam tours &amp; excursions</h1>
          <p className="mt-3 max-w-2xl text-lg text-charcoal-muted">
            {tours.length} carefully curated experiences across the desert, sea and beyond — each with
            licensed local guides, free hotel pickup and our best-price guarantee.
          </p>

          {/* Category filter chips */}
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="rounded-full bg-ocean px-4 py-2 text-sm font-semibold text-white">All tours</span>
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={`/category/${c.slug}`}
                className="rounded-full border border-charcoal/12 bg-white px-4 py-2 text-sm font-medium text-charcoal-soft transition-colors hover:border-ocean hover:text-ocean"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((tour, i) => (
            <TourCard key={tour.slug} tour={tour} priority={i < 3} />
          ))}
        </div>
      </Section>

      <Section tone="beige">
        <CtaBanner />
      </Section>
    </>
  );
}
