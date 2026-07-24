import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Section } from '@/components/ui/Section';
import { BlogCard } from '@/components/blog/BlogCard';
import { JsonLd } from '@/components/seo/JsonLd';
import { getAllPostsSorted } from '@/content/blog-posts';
import { blogCategories } from '@/content/blog-categories';
import { buildMetadata } from '@/lib/seo/metadata';
import { breadcrumbSchema, itemListSchema, webPageSchema } from '@/lib/seo/jsonld';
import { absoluteUrl } from '@/config/site';

export const metadata: Metadata = buildMetadata({
  title: 'Marsa Alam Travel Blog & Guides',
  description:
    'Expert local travel guides for Marsa Alam and the Red Sea: best things to do, snorkeling and diving tips, packing lists, transport and Egypt travel advice.',
  path: '/blog',
});

export default function BlogPage() {
  const posts = getAllPostsSorted();
  const url = absoluteUrl('/blog');
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
  ];

  return (
    <>
      <JsonLd
        schema={[
          breadcrumbSchema(crumbs, url),
          webPageSchema({ path: '/blog', title: 'Marsa Alam Travel Blog', description: metadata.description as string }),
          itemListSchema(posts.map((p) => ({ name: p.title, path: `/blog/${p.slug}`, image: p.heroImage.src })), 'Marsa Alam Travel Blog'),
        ]}
      />

      <div className="bg-beige-soft">
        <div className="container-page py-10">
          <Breadcrumbs items={crumbs} />
          <h1 className="mt-4 text-4xl font-bold sm:text-5xl">The Marsa Alam travel journal</h1>
          <p className="mt-3 max-w-2xl text-lg text-charcoal-muted">
            Honest, practical guides from a local team — so you can plan a smarter, richer trip to
            Egypt’s Red Sea coast.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {blogCategories.map((c) => (
              <Link
                key={c.slug}
                href={`/blog/category/${c.slug}`}
                className="rounded-full border border-charcoal/12 bg-white px-4 py-2 text-sm font-medium text-charcoal-soft transition-colors hover:border-ocean hover:text-ocean"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <BlogCard key={p.slug} post={p} />
          ))}
        </div>
      </Section>
    </>
  );
}
