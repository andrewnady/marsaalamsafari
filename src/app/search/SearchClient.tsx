'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { TourCard } from '@/components/tours/TourCard';
import { BlogCard } from '@/components/blog/BlogCard';
import { Icon } from '@/components/ui/Icons';
import { tours } from '@/content/tours';
import { blogPosts } from '@/content/blog-posts';

/** Lightweight client-side search over the static content index. */
export function SearchClient() {
  const params = useSearchParams();
  const [query, setQuery] = useState(params.get('q') ?? '');

  const q = query.trim().toLowerCase();

  const tourResults = useMemo(() => {
    if (!q) return tours;
    return tours.filter((t) =>
      [t.title, t.summary, t.category, ...t.tags].join(' ').toLowerCase().includes(q),
    );
  }, [q]);

  const postResults = useMemo(() => {
    if (!q) return [];
    return blogPosts.filter((p) =>
      [p.title, p.excerpt, ...p.tags].join(' ').toLowerCase().includes(q),
    );
  }, [q]);

  return (
    <>
      <div className="relative mx-auto max-w-xl">
        <Icon.Sparkle className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/30" width={20} height={20} />
        <label htmlFor="site-search" className="sr-only">Search tours and articles</label>
        <input
          id="site-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search tours, destinations, articles…"
          className="w-full rounded-full border border-charcoal/12 bg-white py-3.5 pl-12 pr-4 text-base shadow-card focus-visible:ring-2 focus-visible:ring-ocean"
          autoFocus
        />
      </div>

      <p className="mt-6 text-center text-sm text-charcoal-muted">
        {q
          ? `${tourResults.length + postResults.length} result${tourResults.length + postResults.length === 1 ? '' : 's'} for “${query}”`
          : `Showing all ${tours.length} tours`}
      </p>

      {tourResults.length > 0 && (
        <div className="mt-8">
          <h2 className="mb-5 text-xl font-semibold">Tours</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tourResults.map((t) => (
              <TourCard key={t.slug} tour={t} />
            ))}
          </div>
        </div>
      )}

      {postResults.length > 0 && (
        <div className="mt-12">
          <h2 className="mb-5 text-xl font-semibold">Articles</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {postResults.map((p) => (
              <BlogCard key={p.slug} post={p} />
            ))}
          </div>
        </div>
      )}

      {q && tourResults.length === 0 && postResults.length === 0 && (
        <p className="mt-10 text-center text-charcoal-muted">
          No results found. Try a different search, or <Link href="/tours" className="text-ocean hover:underline">browse all tours</Link>.
        </p>
      )}
    </>
  );
}
