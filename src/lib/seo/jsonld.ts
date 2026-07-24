import { siteConfig, absoluteUrl } from '@/config/site';
import type { Tour, BlogPost, Review, FAQ, Destination } from '@/content/types';
import { getAuthor } from '@/content/authors';

/**
 * JSON-LD builders. Every function returns a plain object matching schema.org,
 * ready to be dropped into a <script type="application/ld+json">. IDs are
 * stable URIs so entities can reference each other across the graph.
 */

type Json = Record<string, unknown>;

const ORG_ID = `${siteConfig.url}/#organization`;
const WEBSITE_ID = `${siteConfig.url}/#website`;

export function organizationSchema(): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    '@id': ORG_ID,
    name: siteConfig.legalName,
    alternateName: siteConfig.name,
    url: siteConfig.url,
    logo: {
      '@type': 'ImageObject',
      url: absoluteUrl('/apple-icon'),
      width: 180,
      height: 180,
    },
    image: absoluteUrl('/opengraph-image'),
    description: siteConfig.description,
    foundingDate: String(siteConfig.foundingYear),
    priceRange: siteConfig.priceRange,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.locality,
      addressRegion: siteConfig.address.region,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    areaServed: {
      '@type': 'Place',
      name: 'Marsa Alam, Red Sea, Egypt',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: siteConfig.trust.ratingValue,
      reviewCount: siteConfig.trust.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    sameAs: [
      siteConfig.social.facebook,
      siteConfig.social.instagram,
      siteConfig.social.tripadvisor,
      siteConfig.social.youtube,
      siteConfig.siblingSite,
    ],
  };
}

/** LocalBusiness variant for the /contact + about pages (with opening hours). */
export function localBusinessSchema(): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    '@id': ORG_ID,
    name: siteConfig.legalName,
    url: siteConfig.url,
    image: absoluteUrl('/opengraph-image'),
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    priceRange: siteConfig.priceRange,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.locality,
      addressRegion: siteConfig.address.region,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '00:00',
        closes: '23:59',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: siteConfig.trust.ratingValue,
      reviewCount: siteConfig.trust.reviewCount,
      bestRating: 5,
    },
  };
}

export function websiteSchema(): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.description,
    publisher: { '@id': ORG_ID },
    inLanguage: 'en',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function webPageSchema(input: {
  path: string;
  title: string;
  description: string;
  image?: string;
  breadcrumbId?: string;
}): Json {
  const url = absoluteUrl(input.path);
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: input.title,
    description: input.description,
    isPartOf: { '@id': WEBSITE_ID },
    ...(input.image && { primaryImageOfPage: { '@type': 'ImageObject', url: input.image } }),
    ...(input.breadcrumbId && { breadcrumb: { '@id': input.breadcrumbId } }),
    inLanguage: 'en',
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[], pageUrl: string): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${pageUrl}#breadcrumb`,
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqSchema(faqs: FAQ[]): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  };
}

function reviewNode(review: Review): Json {
  return {
    '@type': 'Review',
    author: { '@type': 'Person', name: review.author },
    datePublished: review.date,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: review.rating,
      bestRating: 5,
      worstRating: 1,
    },
    name: review.title,
    reviewBody: review.body,
  };
}

/**
 * A tour is modelled as both a Product (for rich results with price + rating)
 * and semantically a TouristTrip. We emit a Product with an Offer, aggregate
 * rating, reviews and images — the richest currently supported by Google.
 */
export function tourSchema(tour: Tour, reviews: Review[]): Json {
  const url = absoluteUrl(`/${tour.slug}`);
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${url}#product`,
    name: tour.title,
    description: tour.metaDescription,
    image: [tour.heroImage, ...tour.gallery].map((i) => i.src),
    sku: tour.slug,
    brand: { '@type': 'Brand', name: siteConfig.name },
    category: tour.category,
    offers: {
      '@type': 'Offer',
      url,
      priceCurrency: tour.price.currency,
      price: tour.price.amount,
      availability: 'https://schema.org/InStock',
      validFrom: tour.updatedAt,
      priceValidUntil: `${new Date().getFullYear() + 1}-12-31`,
      seller: { '@id': ORG_ID },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: tour.rating,
      reviewCount: tour.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    review: reviews.map(reviewNode),
  };
}

/** Additional TouristTrip node — richer travel semantics for the same tour. */
export function touristTripSchema(tour: Tour, destinations: Destination[]): Json {
  const url = absoluteUrl(`/${tour.slug}`);
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    '@id': `${url}#trip`,
    name: tour.title,
    description: tour.summary,
    url,
    touristType: 'International leisure travellers',
    provider: { '@id': ORG_ID },
    offers: {
      '@type': 'Offer',
      price: tour.price.amount,
      priceCurrency: tour.price.currency,
      availability: 'https://schema.org/InStock',
    },
    itinerary: {
      '@type': 'ItemList',
      itemListElement: tour.itinerary.map((step, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'TouristAttraction',
          name: step.title,
          description: step.description,
        },
      })),
    },
    ...(destinations.length > 0 && {
      subjectOf: destinations.map((d) => ({
        '@type': 'Place',
        name: d.name,
        ...(d.geo && {
          geo: { '@type': 'GeoCoordinates', latitude: d.geo.latitude, longitude: d.geo.longitude },
        }),
      })),
    }),
  };
}

export function placeSchema(destination: Destination): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristDestination',
    name: destination.name,
    description: destination.shortDescription,
    url: absoluteUrl(`/destinations/${destination.slug}`),
    ...(destination.geo && {
      geo: {
        '@type': 'GeoCoordinates',
        latitude: destination.geo.latitude,
        longitude: destination.geo.longitude,
      },
    }),
    includesAttraction: destination.highlights.map((h) => ({
      '@type': 'TouristAttraction',
      name: h,
    })),
  };
}

export function articleSchema(post: BlogPost): Json {
  const url = absoluteUrl(`/blog/${post.slug}`);
  const author = getAuthor(post.authorSlug);
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    headline: post.title,
    description: post.metaDescription,
    image: {
      '@type': 'ImageObject',
      url: post.heroImage.src,
      width: post.heroImage.width,
      height: post.heroImage.height,
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: author
      ? { '@type': 'Person', name: author.name, description: author.bio, jobTitle: author.role }
      : { '@type': 'Organization', name: siteConfig.name },
    publisher: { '@id': ORG_ID },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    inLanguage: 'en',
    wordCount: post.readingMinutes * 200,
  };
}

/** ItemList for tour/category/blog listing pages — helps carousels. */
export function itemListSchema(
  items: { name: string; path: string; image?: string }[],
  listName: string,
): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: listName,
    numberOfItems: items.length,
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: absoluteUrl(item.path),
      name: item.name,
      ...(item.image && { image: item.image }),
    })),
  };
}

/** Render one or more schema objects as a JSON-LD script tag payload. */
export function jsonLdScript(schema: Json | Json[]): string {
  return JSON.stringify(schema);
}
