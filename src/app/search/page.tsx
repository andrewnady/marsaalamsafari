import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Section } from '@/components/ui/Section';
import { SearchClient } from './SearchClient';
import { buildMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = {
  ...buildMetadata({
    title: 'Search',
    description: 'Search Marsa Alam tours, destinations and travel guides.',
    path: '/search',
    noindex: true,
  }),
};

export default function SearchPage() {
  return (
    <Section>
      <h1 className="mb-8 text-center text-3xl font-bold sm:text-4xl">Search</h1>
      <Suspense fallback={<p className="text-center text-charcoal-muted">Loading…</p>}>
        <SearchClient />
      </Suspense>
    </Section>
  );
}
