import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Section, SectionHeading } from '@/components/ui/Section';
import { BlogBody, tableOfContents } from '@/components/blog/BlogBody';
import { BlogCard } from '@/components/blog/BlogCard';
import { TourCard } from '@/components/tours/TourCard';
import { FaqAccordion } from '@/components/ui/FaqAccordion';
import { CtaBanner } from '@/components/ui/CtaBanner';
import { JsonLd } from '@/components/seo/JsonLd';
import { blogPosts, getBlogPost, getPostsByCategory } from '@/content/blog-posts';
import { getBlogCategory } from '@/content/blog-categories';
import { getAuthor } from '@/content/authors';
import { getTour } from '@/content/tours';
import { buildMetadata } from '@/lib/seo/metadata';
import { articleSchema, breadcrumbSchema, faqSchema, webPageSchema } from '@/lib/seo/jsonld';
import { absoluteUrl } from '@/config/site';
import { formatDate } from '@/lib/utils';

interface Params {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  const author = getAuthor(post.authorSlug);
  return buildMetadata({
    title: post.seoTitle,
    description: post.metaDescription,
    path: `/blog/${post.slug}`,
    type: 'article',
    images: [{ url: post.heroImage.src, alt: post.heroImage.alt }],
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt,
    authors: author ? [author.name] : undefined,
    keywords: post.tags,
  });
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const author = getAuthor(post.authorSlug);
  const category = getBlogCategory(post.category);
  const toc = tableOfContents(post.body);
  const relatedTours = post.relatedTours.map(getTour).filter((t): t is NonNullable<typeof t> => Boolean(t));
  const morePosts = getPostsByCategory(post.category).filter((p) => p.slug !== post.slug).slice(0, 3);
  const url = absoluteUrl(`/blog/${post.slug}`);

  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
    ...(category ? [{ name: category.name, path: `/blog/category/${category.slug}` }] : []),
    { name: post.title, path: `/blog/${post.slug}` },
  ];

  return (
    <>
      <JsonLd
        schema={[
          breadcrumbSchema(crumbs, url),
          articleSchema(post),
          ...(post.faqs ? [faqSchema(post.faqs)] : []),
          webPageSchema({ path: `/blog/${post.slug}`, title: post.seoTitle, description: post.metaDescription, image: post.heroImage.src }),
        ]}
      />

      <article>
        <div className="container-page pt-8">
          <Breadcrumbs items={crumbs} />
          <div className="mx-auto mt-6 max-w-3xl">
            {category && (
              <Link href={`/blog/category/${category.slug}`} className="text-sm font-bold uppercase tracking-wide text-ocean hover:underline">
                {category.name}
              </Link>
            )}
            <h1 className="mt-2 text-4xl font-bold leading-tight sm:text-5xl">{post.title}</h1>
            <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-charcoal-muted">
              {author && (
                <span className="flex items-center gap-2.5">
                  <Image src={author.avatar.src} alt={author.avatar.alt} width={36} height={36} className="rounded-full object-cover" />
                  <span>
                    <span className="font-semibold text-charcoal">{author.name}</span>
                    <span className="block text-xs">{author.role}</span>
                  </span>
                </span>
              )}
              <span aria-hidden>·</span>
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
              <span aria-hidden>·</span>
              <span>{post.readingMinutes} min read</span>
            </div>
          </div>
        </div>

        <div className="container-page mt-8">
          <div className="relative mx-auto aspect-[16/9] max-w-4xl overflow-hidden rounded-2xl">
            <Image src={post.heroImage.src} alt={post.heroImage.alt} fill priority sizes="(max-width: 1024px) 100vw, 1024px" className="object-cover" />
          </div>
        </div>

        <div className="container-page mt-10">
          <div className="mx-auto grid max-w-4xl gap-10 lg:grid-cols-[220px_1fr]">
            {/* TOC */}
            {toc.length > 2 && (
              <aside className="hidden lg:block">
                <div className="sticky top-24">
                  <p className="text-xs font-bold uppercase tracking-wide text-charcoal-muted">On this page</p>
                  <nav className="mt-3 space-y-2 text-sm" aria-label="Table of contents">
                    {toc.map((h) => (
                      <a key={h.id} href={`#${h.id}`} className={`block text-charcoal-muted hover:text-ocean ${h.level === 3 ? 'pl-3' : ''}`}>
                        {h.text}
                      </a>
                    ))}
                  </nav>
                </div>
              </aside>
            )}
            <div className={toc.length > 2 ? '' : 'mx-auto max-w-prose lg:col-span-2'}>
              <p className="mb-6 text-xl leading-relaxed text-charcoal-soft">{post.excerpt}</p>
              <BlogBody blocks={post.body} />

              {post.faqs && post.faqs.length > 0 && (
                <div className="mt-12">
                  <h2 className="mb-5 text-2xl font-semibold">Frequently asked questions</h2>
                  <FaqAccordion faqs={post.faqs} />
                </div>
              )}

              {/* Author bio */}
              {author && (
                <div className="mt-12 flex gap-4 rounded-2xl border border-charcoal/[0.08] bg-beige-soft p-6">
                  <Image src={author.avatar.src} alt={author.avatar.alt} width={56} height={56} className="h-14 w-14 rounded-full object-cover" />
                  <div>
                    <p className="font-semibold text-charcoal">{author.name}</p>
                    <p className="text-xs uppercase tracking-wide text-ocean">{author.role}</p>
                    <p className="mt-2 text-sm text-charcoal-muted">{author.bio}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </article>

      {relatedTours.length > 0 && (
        <Section tone="beige" className="mt-14">
          <SectionHeading eyebrow="Book it" title="Tours mentioned in this guide" />
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedTours.map((t) => (
              <TourCard key={t.slug} tour={t} />
            ))}
          </div>
        </Section>
      )}

      {morePosts.length > 0 && (
        <Section>
          <SectionHeading eyebrow="Keep reading" title="More travel guides" />
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {morePosts.map((p) => (
              <BlogCard key={p.slug} post={p} />
            ))}
          </div>
        </Section>
      )}

      <Section tone={morePosts.length > 0 ? 'beige' : 'white'}>
        <CtaBanner />
      </Section>
    </>
  );
}
