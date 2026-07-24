import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Section } from '@/components/ui/Section';
import { BlogCard } from '@/components/blog/BlogCard';
import { JsonLd } from '@/components/seo/JsonLd';
import { blogCategories, getBlogCategory } from '@/content/blog-categories';
import { getPostsByCategory } from '@/content/blog-posts';
import { buildMetadata } from '@/lib/seo/metadata';
import { breadcrumbSchema, itemListSchema, webPageSchema } from '@/lib/seo/jsonld';
import { absoluteUrl } from '@/config/site';

interface Params {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return blogCategories.map((c) => ({ slug: c.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const category = getBlogCategory(slug);
  if (!category) return {};
  return buildMetadata({
    title: `${category.name} — Marsa Alam Blog`,
    description: category.description,
    path: `/blog/category/${category.slug}`,
  });
}

export default async function BlogCategoryPage({ params }: Params) {
  const { slug } = await params;
  const category = getBlogCategory(slug);
  if (!category) notFound();

  const posts = getPostsByCategory(category.slug);
  const url = absoluteUrl(`/blog/category/${category.slug}`);
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: category.name, path: `/blog/category/${category.slug}` },
  ];

  return (
    <>
      <JsonLd
        schema={[
          breadcrumbSchema(crumbs, url),
          webPageSchema({ path: `/blog/category/${category.slug}`, title: `${category.name} — Marsa Alam Blog`, description: category.description }),
          itemListSchema(posts.map((p) => ({ name: p.title, path: `/blog/${p.slug}`, image: p.heroImage.src })), category.name),
        ]}
      />
      <div className="bg-beige-soft">
        <div className="container-page py-10">
          <Breadcrumbs items={crumbs} />
          <h1 className="mt-4 text-4xl font-bold sm:text-5xl">{category.name}</h1>
          <p className="mt-3 max-w-2xl text-lg text-charcoal-muted">{category.description}</p>
        </div>
      </div>
      <Section>
        {posts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <BlogCard key={p.slug} post={p} />
            ))}
          </div>
        ) : (
          <p className="text-center text-charcoal-muted">No articles in this category yet — check back soon.</p>
        )}
      </Section>
    </>
  );
}
