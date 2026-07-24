import Link from 'next/link';
import type { Metadata } from 'next';
import { Hero } from '@/components/home/Hero';
import { TrustBadges } from '@/components/home/TrustBadges';
import { StatsBar } from '@/components/home/StatsBar';
import { WhyChooseUs } from '@/components/home/WhyChooseUs';
import { Section, SectionHeading } from '@/components/ui/Section';
import { TourCard } from '@/components/tours/TourCard';
import { CategoryCard } from '@/components/tours/CategoryCard';
import { DestinationCard } from '@/components/destinations/DestinationCard';
import { ReviewCard } from '@/components/reviews/ReviewCard';
import { BlogCard } from '@/components/blog/BlogCard';
import { FaqAccordion } from '@/components/ui/FaqAccordion';
import { CtaBanner } from '@/components/ui/CtaBanner';
import { Icon } from '@/components/ui/Icons';
import { JsonLd } from '@/components/seo/JsonLd';
import { tours } from '@/content/tours';
import { categories } from '@/content/categories';
import { destinations } from '@/content/destinations';
import { getFeaturedReviews } from '@/content/reviews';
import { getFeaturedPosts } from '@/content/blog-posts';
import { itemListSchema } from '@/lib/seo/jsonld';
import { buildMetadata } from '@/lib/seo/metadata';
import type { FAQ } from '@/content/types';

export const metadata: Metadata = buildMetadata({
  title: 'Marsa Alam Safari | Premium Desert, Snorkeling & Day Tours',
  description:
    'Book premium Marsa Alam tours: desert safaris, dolphin & turtle snorkeling, diving and day trips to Luxor. Licensed local guides, free hotel pickup, best-price guarantee.',
  path: '/',
});

const homeFaqs: FAQ[] = [
  {
    question: 'What are the best things to do in Marsa Alam?',
    answer:
      'The most popular experiences are swimming with wild dolphins at Sataya Reef, snorkeling with sea turtles at Abu Dabbab, a desert safari with quad biking and a Bedouin dinner, world-class diving, and a day trip to the temples of Luxor.',
  },
  {
    question: 'Do your tours include hotel pickup?',
    answer:
      'Yes. All our Marsa Alam tours include round-trip air-conditioned hotel pickup from Marsa Alam and Port Ghalib. Pickups from farther resorts may carry a small surcharge, confirmed at booking.',
  },
  {
    question: 'How do I book a tour?',
    answer:
      'Booking takes minutes. Message us on WhatsApp or send an online inquiry with your dates and hotel, and we’ll confirm availability and details right away. Most tours offer free cancellation up to 24 hours before.',
  },
  {
    question: 'Are the tours suitable for families and children?',
    answer:
      'Absolutely. Many of our trips — including camel rides, Abu Dabbab snorkeling and the desert safari — are family-friendly with children’s rates. Let us know your group and we’ll recommend the best options.',
  },
  {
    question: 'Is Marsa Alam safe for tourists?',
    answer:
      'Yes. Marsa Alam is a well-established, tourist-friendly Red Sea resort region. We are a licensed operator with insured vehicles, experienced guides and a strong safety record across thousands of guests.',
  },
];

export default function HomePage() {
  const featuredTours = tours.filter((t) => t.featured).slice(0, 6);
  const reviews = getFeaturedReviews(6);
  const posts = getFeaturedPosts(3);

  return (
    <>
      <JsonLd
        schema={itemListSchema(
          featuredTours.map((t) => ({ name: t.title, path: `/${t.slug}`, image: t.heroImage.src })),
          'Popular Marsa Alam Tours',
        )}
      />

      <Hero />
      <TrustBadges />

      {/* Popular tours */}
      <Section>
        <div className="flex items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Most booked"
            title="Popular Marsa Alam tours"
            description="Hand-picked experiences our guests rate most highly — from dolphin reefs to desert sunsets."
          />
          <Link href="/tours" className="hidden shrink-0 items-center gap-1 text-sm font-semibold text-ocean hover:underline sm:inline-flex">
            View all tours <Icon.Arrow width={16} height={16} />
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredTours.map((tour, i) => (
            <TourCard key={tour.slug} tour={tour} priority={i < 3} />
          ))}
        </div>
      </Section>

      {/* Categories */}
      <Section tone="beige">
        <SectionHeading
          eyebrow="Browse by type"
          title="Find your kind of adventure"
          description="Desert or sea, adrenaline or ancient history — every way to experience Marsa Alam."
          align="center"
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <CategoryCard key={c.slug} category={c} />
          ))}
        </div>
      </Section>

      {/* Destinations */}
      <Section>
        <SectionHeading
          eyebrow="Top destinations"
          title="Where the Red Sea reveals its best"
          description="The reefs, bays and desert valleys that make Marsa Alam unforgettable."
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {destinations.map((d) => (
            <DestinationCard key={d.slug} destination={d} />
          ))}
        </div>
      </Section>

      {/* Why choose us */}
      <Section tone="beige">
        <WhyChooseUs />
      </Section>

      {/* Stats */}
      <Section>
        <StatsBar />
      </Section>

      {/* Reviews */}
      <Section tone="beige">
        <SectionHeading
          eyebrow="Verified reviews"
          title="Loved by travellers from across Europe"
          description="Real, verified reviews from guests who explored Marsa Alam with us."
          align="center"
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r) => (
            <ReviewCard key={r.id} review={r} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/reviews" className="btn-outline">Read all reviews</Link>
        </div>
      </Section>

      {/* Blog */}
      <Section>
        <div className="flex items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Travel journal"
            title="Plan smarter with local guides"
            description="Honest, practical advice from people who live on the Red Sea coast."
          />
          <Link href="/blog" className="hidden shrink-0 items-center gap-1 text-sm font-semibold text-ocean hover:underline sm:inline-flex">
            All articles <Icon.Arrow width={16} height={16} />
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <BlogCard key={p.slug} post={p} />
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section tone="beige">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading
            eyebrow="Good to know"
            title="Frequently asked questions"
            description="Everything you need to book with confidence. Still have a question? Message us anytime."
          />
          <FaqAccordion faqs={homeFaqs} />
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <CtaBanner />
      </Section>
    </>
  );
}
