import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Section } from '@/components/ui/Section';
import { DestinationCard } from '@/components/destinations/DestinationCard';
import { CtaBanner } from '@/components/ui/CtaBanner';
import { JsonLd } from '@/components/seo/JsonLd';
import { destinations } from '@/content/destinations';
import { buildMetadata } from '@/lib/seo/metadata';
import { breadcrumbSchema, itemListSchema, webPageSchema } from '@/lib/seo/jsonld';
import { absoluteUrl } from '@/config/site';

export const metadata: Metadata = buildMetadata({
  title: 'Marsa Alam Destinations & Dive Sites',
  description:
    'Discover the best places to visit around Marsa Alam: Sataya Dolphin Reef, Abu Dabbab turtle bay, the Hamata Islands and Wadi El Gemal National Park.',
  path: '/destinations',
});

export default function DestinationsPage() {
  const url = absoluteUrl('/destinations');
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Destinations', path: '/destinations' },
  ];
  return (
    <>
      <JsonLd
        schema={[
          breadcrumbSchema(crumbs, url),
          webPageSchema({ path: '/destinations', title: 'Marsa Alam Destinations', description: metadata.description as string }),
          itemListSchema(destinations.map((d) => ({ name: d.name, path: `/destinations/${d.slug}`, image: d.image.src })), 'Marsa Alam Destinations'),
        ]}
      />
      <div className="bg-beige-soft">
        <div className="container-page py-10">
          <Breadcrumbs items={crumbs} />
          <h1 className="mt-4 text-4xl font-bold sm:text-5xl">Top destinations around Marsa Alam</h1>
          <p className="mt-3 max-w-2xl text-lg text-charcoal-muted">
            From dolphin reefs to desert national parks — the places that make Egypt’s southern Red
            Sea coast so special, and the tours that take you there.
          </p>
        </div>
      </div>
      <Section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {destinations.map((d) => (
            <DestinationCard key={d.slug} destination={d} />
          ))}
        </div>
      </Section>
      <Section tone="beige">
        <CtaBanner />
      </Section>
    </>
  );
}
