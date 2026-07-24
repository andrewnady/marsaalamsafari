import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Section } from '@/components/ui/Section';
import { TourCard } from '@/components/tours/TourCard';
import { CtaBanner } from '@/components/ui/CtaBanner';
import { JsonLd } from '@/components/seo/JsonLd';
import { categories, getCategory } from '@/content/categories';
import { getToursByCategory } from '@/content/tours';
import { buildMetadata } from '@/lib/seo/metadata';
import { breadcrumbSchema, itemListSchema, webPageSchema } from '@/lib/seo/jsonld';
import { absoluteUrl } from '@/config/site';

interface Params {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};
  return buildMetadata({
    title: category.title,
    description: category.description,
    path: `/category/${category.slug}`,
    images: [{ url: category.image.src, alt: category.image.alt }],
  });
}

export default async function CategoryPage({ params }: Params) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const tours = getToursByCategory(category.slug);
  const url = absoluteUrl(`/category/${category.slug}`);
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Tours', path: '/tours' },
    { name: category.name, path: `/category/${category.slug}` },
  ];

  return (
    <>
      <JsonLd
        schema={[
          breadcrumbSchema(crumbs, url),
          webPageSchema({ path: `/category/${category.slug}`, title: category.title, description: category.description, image: category.image.src }),
          itemListSchema(tours.map((t) => ({ name: t.title, path: `/${t.slug}`, image: t.heroImage.src })), category.title),
        ]}
      />

      <div className="bg-beige-soft">
        <div className="container-page py-10">
          <Breadcrumbs items={crumbs} />
          <h1 className="mt-4 text-4xl font-bold sm:text-5xl">{category.title}</h1>
          <p className="mt-3 max-w-2xl text-lg leading-relaxed text-charcoal-muted">{category.intro}</p>
        </div>
      </div>

      <Section>
        {tours.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tours.map((tour, i) => (
              <TourCard key={tour.slug} tour={tour} priority={i < 3} />
            ))}
          </div>
        ) : (
          <p className="text-center text-charcoal-muted">
            New tours coming soon. <Link href="/tours" className="text-ocean hover:underline">Browse all tours</Link>.
          </p>
        )}
      </Section>

      <Section tone="beige">
        <CtaBanner />
      </Section>
    </>
  );
}
