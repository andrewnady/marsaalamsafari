/**
 * Content model for the whole site. These types are intentionally
 * framework-agnostic so the data files can later be sourced from a headless
 * CMS (Sanity, Contentful, Payload) without touching UI code.
 */

export interface Image {
  /** Path or remote URL. Descriptive filenames improve image SEO. */
  src: string;
  /** Required for accessibility + image SEO. */
  alt: string;
  title?: string;
  caption?: string;
  width: number;
  height: number;
  /** Set true on the single most important above-the-fold image. */
  priority?: boolean;
}

export type Currency = 'EUR' | 'USD' | 'GBP' | 'EGP';

export interface Price {
  amount: number;
  currency: Currency;
  /** Optional original price to show a discount. */
  compareAt?: number;
  /** e.g. "per person", "per group". */
  unit: string;
  childAmount?: number;
}

export interface ItineraryStep {
  time?: string;
  title: string;
  description: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export type TourCategorySlug =
  | 'desert-safari'
  | 'snorkeling'
  | 'diving'
  | 'day-trips'
  | 'boat-trips'
  | 'city-experiences';

export interface TourCategory {
  slug: TourCategorySlug;
  name: string;
  title: string;
  description: string;
  intro: string;
  image: Image;
}

export interface Destination {
  slug: string;
  name: string;
  title: string;
  shortDescription: string;
  description: string;
  intro: string;
  region: string;
  geo?: { latitude: number; longitude: number };
  image: Image;
  highlights: string[];
  /** Tour slugs available at this destination. */
  relatedTours: string[];
}

export interface Review {
  id: string;
  author: string;
  country: string;
  countryCode: string;
  rating: number;
  date: string; // ISO
  title: string;
  body: string;
  tourSlug?: string;
  verified: boolean;
}

export type Difficulty = 'Easy' | 'Moderate' | 'Challenging';

export interface Tour {
  /** Clean, keyword-rich URL slug (also the route). */
  slug: string;
  title: string; // H1
  /** <title> — can differ from H1 for SEO. */
  seoTitle: string;
  metaDescription: string;
  /** Short punchy summary for cards + og. */
  summary: string;
  /** Longer overview, supports multiple paragraphs. */
  overview: string[];
  category: TourCategorySlug;
  /** Secondary categories for cross-linking. */
  tags: string[];
  destinationSlugs: string[];

  price: Price;
  durationHours: number;
  durationLabel: string; // e.g. "Full day (8–9 hrs)"
  difficulty: Difficulty;
  groupSize: string; // e.g. "1–12 people"
  languages: string[];
  availability: string; // e.g. "Daily"
  minAge?: number;

  heroImage: Image;
  gallery: Image[];

  highlights: string[];
  included: string[];
  excluded: string[];
  whatToBring: string[];
  itinerary: ItineraryStep[];
  pickup: {
    included: boolean;
    areas: string[];
    note: string;
  };
  cancellation: string;

  faqs: FAQ[];

  /** Manual related-tour slugs; falls back to same-category if empty. */
  relatedTours: string[];

  rating: number;
  reviewCount: number;

  featured?: boolean;
  bestseller?: boolean;
  /** ISO date, used for sitemaps lastmod + freshness. */
  updatedAt: string;
}

export type BlogCategorySlug =
  | 'travel-guides'
  | 'things-to-do'
  | 'desert-safari'
  | 'snorkeling'
  | 'diving'
  | 'egypt-travel-tips'
  | 'transportation'
  | 'packing-guides'
  | 'family-travel'
  | 'adventure';

export interface BlogCategory {
  slug: BlogCategorySlug;
  name: string;
  description: string;
}

export interface Author {
  slug: string;
  name: string;
  role: string;
  bio: string;
  avatar: Image;
}

export interface BlogPost {
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  excerpt: string;
  category: BlogCategorySlug;
  tags: string[];
  authorSlug: string;
  publishedAt: string; // ISO
  updatedAt: string; // ISO
  readingMinutes: number;
  heroImage: Image;
  /** Simple structured body: rendered by BlogBody. */
  body: BlogBlock[];
  /** Cross-link to relevant tours. */
  relatedTours: string[];
  faqs?: FAQ[];
  featured?: boolean;
}

export type BlogBlock =
  | { type: 'heading'; level: 2 | 3; text: string; id: string }
  | { type: 'paragraph'; text: string }
  | { type: 'list'; ordered?: boolean; items: string[] }
  | { type: 'quote'; text: string; cite?: string }
  | { type: 'image'; image: Image }
  | { type: 'callout'; title: string; text: string };
