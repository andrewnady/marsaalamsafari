import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { tours, getTour } from '@/content/tours';
import { landingPages, getLandingPage } from '@/content/landing-pages';
import { getReviewsForTour } from '@/content/reviews';
import { getDestination } from '@/content/destinations';
import { getCategory } from '@/content/categories';
import { TourDetail } from '@/components/tours/TourDetail';
import { LandingPageView } from '@/components/landing/LandingPageView';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildMetadata } from '@/lib/seo/metadata';
import {
  breadcrumbSchema,
  tourSchema,
  touristTripSchema,
  faqSchema,
  webPageSchema,
  itemListSchema,
} from '@/lib/seo/jsonld';
import { absoluteUrl } from '@/config/site';

/**
 * Unified root-level route serving both tour detail pages and SEO landing
 * pages via clean keyword URLs (e.g. /marsa-alam-desert-safari,
 * /best-marsa-alam-safari). Static routes (/tours, /blog…) take precedence.
 */

interface Params {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return [...tours.map((t) => ({ slug: t.slug })), ...landingPages.map((p) => ({ slug: p.slug }))];
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const tour = getTour(slug);
  if (tour) {
    return buildMetadata({
      title: tour.seoTitle,
      description: tour.metaDescription,
      path: `/${tour.slug}`,
      images: [{ url: tour.heroImage.src, alt: tour.heroImage.alt }],
      keywords: [tour.title, ...tour.tags, 'Marsa Alam'],
    });
  }
  const landing = getLandingPage(slug);
  if (landing) {
    return buildMetadata({
      title: landing.seoTitle,
      description: landing.metaDescription,
      path: `/${landing.slug}`,
      images: [{ url: landing.heroImage.src, alt: landing.heroImage.alt }],
    });
  }
  return {};
}

export default async function SlugPage({ params }: Params) {
  const { slug } = await params;
  const tour = getTour(slug);

  if (tour) {
    const reviews = getReviewsForTour(tour.slug);
    const category = getCategory(tour.category);
    const destinations = tour.destinationSlugs
      .map(getDestination)
      .filter((d): d is NonNullable<typeof d> => Boolean(d));
    const url = absoluteUrl(`/${tour.slug}`);

    const crumbs = [
      { name: 'Home', path: '/' },
      { name: 'Tours', path: '/tours' },
      ...(category ? [{ name: category.name, path: `/category/${category.slug}` }] : []),
      { name: tour.title, path: `/${tour.slug}` },
    ];

    return (
      <>
        <JsonLd
          schema={[
            breadcrumbSchema(crumbs, url),
            tourSchema(tour, reviews),
            touristTripSchema(tour, destinations),
            faqSchema(tour.faqs),
            webPageSchema({
              path: `/${tour.slug}`,
              title: tour.seoTitle,
              description: tour.metaDescription,
              image: tour.heroImage.src,
              breadcrumbId: `${url}#breadcrumb`,
            }),
          ]}
        />
        <TourDetail tour={tour} />
      </>
    );
  }

  const landing = getLandingPage(slug);
  if (landing) {
    const url = absoluteUrl(`/${landing.slug}`);
    const landingTours = landing.tourSlugs.map(getTour).filter(Boolean);
    return (
      <>
        <JsonLd
          schema={[
            breadcrumbSchema([{ name: 'Home', path: '/' }, { name: landing.title, path: `/${landing.slug}` }], url),
            faqSchema(landing.faqs),
            itemListSchema(
              landingTours.map((t) => ({ name: t!.title, path: `/${t!.slug}`, image: t!.heroImage.src })),
              landing.title,
            ),
            webPageSchema({
              path: `/${landing.slug}`,
              title: landing.seoTitle,
              description: landing.metaDescription,
              image: landing.heroImage.src,
              breadcrumbId: `${url}#breadcrumb`,
            }),
          ]}
        />
        <LandingPageView page={landing} />
      </>
    );
  }

  notFound();
}
