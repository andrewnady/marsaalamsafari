import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Section, SectionHeading } from '@/components/ui/Section';
import { TourCard } from '@/components/tours/TourCard';
import { MapEmbed } from '@/components/ui/MapEmbed';
import { CtaBanner } from '@/components/ui/CtaBanner';
import { Icon } from '@/components/ui/Icons';
import { JsonLd } from '@/components/seo/JsonLd';
import { destinations, getDestination } from '@/content/destinations';
import { getTour } from '@/content/tours';
import { buildMetadata } from '@/lib/seo/metadata';
import { breadcrumbSchema, placeSchema, webPageSchema } from '@/lib/seo/jsonld';
import { absoluteUrl } from '@/config/site';

interface Params {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const destination = getDestination(slug);
  if (!destination) return {};
  return buildMetadata({
    title: `${destination.title} — Tours & Guide`,
    description: destination.shortDescription,
    path: `/destinations/${destination.slug}`,
    images: [{ url: destination.image.src, alt: destination.image.alt }],
  });
}

export default async function DestinationPage({ params }: Params) {
  const { slug } = await params;
  const destination = getDestination(slug);
  if (!destination) notFound();

  const relatedTours = destination.relatedTours
    .map(getTour)
    .filter((t): t is NonNullable<typeof t> => Boolean(t));
  const url = absoluteUrl(`/destinations/${destination.slug}`);
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Destinations', path: '/destinations' },
    { name: destination.name, path: `/destinations/${destination.slug}` },
  ];

  return (
    <>
      <JsonLd
        schema={[
          breadcrumbSchema(crumbs, url),
          placeSchema(destination),
          webPageSchema({ path: `/destinations/${destination.slug}`, title: destination.title, description: destination.shortDescription, image: destination.image.src }),
        ]}
      />

      <section className="relative isolate overflow-hidden bg-charcoal">
        <Image src={destination.image.src} alt={destination.image.alt} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/45 to-charcoal/30" />
        <div className="container-page relative py-20 text-white lg:py-28">
          <div className="mb-5 [&_*]:text-white/70">
            <Breadcrumbs items={crumbs} />
          </div>
          <p className="inline-flex items-center gap-1.5 text-sm font-medium text-turquoise-light">
            <Icon.Pin width={15} height={15} /> {destination.region}
          </p>
          <h1 className="mt-2 max-w-3xl text-4xl font-bold sm:text-5xl">{destination.title}</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">{destination.intro}</p>
        </div>
      </section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div className="prose-brand">
            <h2>About {destination.name}</h2>
            <p>{destination.description}</p>
            <h2>Highlights</h2>
            <ul>
              {destination.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </div>
          <div>
            <MapEmbed query={`${destination.name}, Marsa Alam, Egypt`} title={`Map of ${destination.name}`} />
          </div>
        </div>
      </Section>

      {relatedTours.length > 0 && (
        <Section tone="beige">
          <SectionHeading eyebrow="Book a trip" title={`Tours to ${destination.name}`} />
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedTours.map((t) => (
              <TourCard key={t.slug} tour={t} />
            ))}
          </div>
        </Section>
      )}

      <Section>
        <CtaBanner />
      </Section>
    </>
  );
}
