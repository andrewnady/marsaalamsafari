import { describe, it, expect } from 'vitest';
import {
  organizationSchema,
  websiteSchema,
  breadcrumbSchema,
  faqSchema,
  tourSchema,
  touristTripSchema,
  articleSchema,
  jsonLdScript,
} from './jsonld';
import { destinations } from '@/content/destinations';
import { tours } from '@/content/tours';
import { blogPosts } from '@/content/blog-posts';
import { getReviewsForTour } from '@/content/reviews';

describe('JSON-LD builders', () => {
  it('organization schema is a valid TravelAgency node', () => {
    const org = organizationSchema();
    expect(org['@type']).toBe('TravelAgency');
    expect(org['@context']).toBe('https://schema.org');
    // Self-serving business ratings are ignored/flagged by Google.
    expect(org).not.toHaveProperty('aggregateRating');
    // sameAs must never contain empty strings.
    expect((org.sameAs as string[]).every(Boolean)).toBe(true);
  });

  it('escapes "<" so JSON-LD can never close its <script> tag', () => {
    const out = jsonLdScript({ name: '</script><script>alert(1)</script>' });
    expect(out).not.toContain('<');
    expect(JSON.parse(out).name).toBe('</script><script>alert(1)</script>');
  });

  it('tourist trip itinerary lists real places, not logistics steps', () => {
    const tour = tours.find((t) => t.destinationSlugs.length > 0)!;
    const dests = tour.destinationSlugs.map((s) => destinations.find((d) => d.slug === s)!);
    const trip = touristTripSchema(tour, dests) as { itinerary: { itemListElement: { item: { name: string } }[] } };
    expect(trip.itinerary.itemListElement.map((e) => e.item.name)).toEqual(dests.map((d) => d.name));
  });

  it('website schema exposes a SearchAction', () => {
    const site = websiteSchema();
    const action = (site as { potentialAction: { '@type': string } }).potentialAction;
    expect(action['@type']).toBe('SearchAction');
  });

  it('breadcrumb positions are sequential and absolute', () => {
    const crumbs = breadcrumbSchema(
      [
        { name: 'Home', path: '/' },
        { name: 'Tours', path: '/tours' },
      ],
      'https://marsaalamsafari.com/tours',
    );
    const items = (crumbs as { itemListElement: { position: number; item: string }[] }).itemListElement;
    expect(items[0]!.position).toBe(1);
    expect(items[1]!.position).toBe(2);
    expect(items[0]!.item).toMatch(/^https:\/\//);
  });

  it('faq schema maps every question to an accepted answer', () => {
    const schema = faqSchema([{ question: 'Q?', answer: 'A.' }]);
    const entity = (schema as { mainEntity: { name: string; acceptedAnswer: { text: string } }[] }).mainEntity;
    expect(entity[0]!.name).toBe('Q?');
    expect(entity[0]!.acceptedAnswer.text).toBe('A.');
  });

  it('tour schema is a Product with an Offer and rating', () => {
    const tour = tours[0]!;
    const schema = tourSchema(tour, getReviewsForTour(tour.slug)) as Record<string, unknown>;
    expect(schema['@type']).toBe('Product');
    expect(schema.offers).toHaveProperty('price', tour.price.amount);
    expect(schema.aggregateRating).toHaveProperty('ratingValue', tour.rating);
  });

  it('article schema is a dated BlogPosting', () => {
    const post = blogPosts[0]!;
    const schema = articleSchema(post) as Record<string, unknown>;
    expect(schema['@type']).toBe('BlogPosting');
    expect(schema.datePublished).toBe(post.publishedAt);
  });
});
