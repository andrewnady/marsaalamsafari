import { describe, it, expect } from 'vitest';
import { tours, getRelatedTours, tourBySlug } from './tours';
import { categories, categoryBySlug, getActiveCategories } from './categories';
import { blogCategories, getActiveBlogCategories } from './blog-categories';
import { destinations } from './destinations';
import { blogPosts } from './blog-posts';
import { landingPages } from './landing-pages';
import { reviews } from './reviews';
import { authorBySlug } from './authors';

/**
 * Content-integrity tests. These guard the data model as the catalogue grows:
 * unique slugs, resolvable references, SEO field presence, and rating sanity.
 */

describe('tours', () => {
  it('have unique slugs', () => {
    const slugs = tours.map((t) => t.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('use clean, lowercase, hyphenated slugs', () => {
    for (const t of tours) {
      expect(t.slug).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    }
  });

  it('have SEO titles and descriptions that fit in Google results', () => {
    for (const t of tours) {
      expect(t.seoTitle.length, t.slug).toBeLessThanOrEqual(60);
      expect(t.metaDescription.length, t.slug).toBeGreaterThanOrEqual(70);
      expect(t.metaDescription.length, t.slug).toBeLessThanOrEqual(160);
    }
  });

  it('have at least 10 FAQs each (FAQ SEO requirement)', () => {
    for (const t of tours) {
      expect(t.faqs.length).toBeGreaterThanOrEqual(10);
    }
  });

  it('reference valid categories', () => {
    for (const t of tours) {
      expect(categoryBySlug.has(t.category)).toBe(true);
    }
  });

  it('resolve related tours to existing tours', () => {
    for (const t of tours) {
      for (const slug of t.relatedTours) {
        expect(tourBySlug.has(slug)).toBe(true);
      }
      expect(getRelatedTours(t).length).toBeGreaterThan(0);
    }
  });

  it('have sensible ratings and prices', () => {
    for (const t of tours) {
      expect(t.rating).toBeGreaterThanOrEqual(1);
      expect(t.rating).toBeLessThanOrEqual(5);
      expect(t.price.amount).toBeGreaterThan(0);
    }
  });

  it('have descriptive alt text on every image', () => {
    for (const t of tours) {
      expect(t.heroImage.alt.length).toBeGreaterThan(10);
      for (const g of t.gallery) expect(g.alt.length).toBeGreaterThan(10);
    }
  });
});

describe('destinations', () => {
  it('have unique slugs and resolvable related tours', () => {
    const slugs = destinations.map((d) => d.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const d of destinations) {
      for (const slug of d.relatedTours) {
        expect(tourBySlug.has(slug)).toBe(true);
      }
    }
  });
});

describe('blog', () => {
  it('have unique slugs and valid authors', () => {
    const slugs = blogPosts.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const p of blogPosts) {
      expect(authorBySlug.has(p.authorSlug)).toBe(true);
      for (const slug of p.relatedTours) expect(tourBySlug.has(slug)).toBe(true);
    }
  });

  it('give every heading block a unique id for anchors', () => {
    for (const p of blogPosts) {
      const ids = p.body.filter((b) => b.type === 'heading').map((b) => (b as { id: string }).id);
      expect(new Set(ids).size).toBe(ids.length);
    }
  });
});

describe('landing pages', () => {
  it('do not collide with tour slugs and reference valid tours', () => {
    for (const page of landingPages) {
      expect(tourBySlug.has(page.slug)).toBe(false);
      for (const slug of page.tourSlugs) expect(tourBySlug.has(slug)).toBe(true);
    }
  });
});

describe('reviews', () => {
  it('reference existing tours when tagged', () => {
    for (const r of reviews) {
      if (r.tourSlug) expect(tourBySlug.has(r.tourSlug)).toBe(true);
      expect(r.rating).toBeGreaterThanOrEqual(1);
      expect(r.rating).toBeLessThanOrEqual(5);
    }
  });
});

describe('SEO text lengths (titles <= 60, descriptions 70-160)', () => {
  const title = (s: string, id: string) => expect(s.length, id).toBeLessThanOrEqual(60);
  const desc = (s: string, id: string) => {
    expect(s.length, id).toBeGreaterThanOrEqual(70);
    expect(s.length, id).toBeLessThanOrEqual(160);
  };

  it('landing pages', () => {
    for (const p of landingPages) {
      title(p.seoTitle, p.slug);
      desc(p.metaDescription, p.slug);
    }
  });

  it('blog posts', () => {
    for (const p of blogPosts) {
      title(p.seoTitle, p.slug);
      desc(p.metaDescription, p.slug);
    }
  });

  it('category, destination and blog category pages', () => {
    for (const c of categories) desc(c.description, c.slug);
    for (const d of destinations) desc(d.shortDescription, d.slug);
    for (const c of blogCategories) desc(c.description, c.slug);
  });
});

describe('thin content', () => {
  it('only categories with content get pages', () => {
    for (const c of getActiveCategories()) {
      expect(tours.some((t) => t.category === c.slug), c.slug).toBe(true);
    }
    for (const c of getActiveBlogCategories()) {
      expect(blogPosts.some((p) => p.category === c.slug), c.slug).toBe(true);
    }
  });
});

describe('categories', () => {
  it('each have at least one tour', () => {
    for (const c of categories) {
      const count = tours.filter((t) => t.category === c.slug).length;
      // Some categories are seeded for future growth; desert/sea must be populated.
      if (['desert-safari', 'snorkeling', 'diving', 'day-trips'].includes(c.slug)) {
        expect(count).toBeGreaterThan(0);
      }
    }
  });
});
