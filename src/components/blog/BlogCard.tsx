import Link from 'next/link';
import Image from 'next/image';
import type { BlogPost } from '@/content/types';
import { blogCategoryBySlug } from '@/content/blog-categories';
import { formatDate } from '@/lib/utils';
import { Icon } from '@/components/ui/Icons';

export function BlogCard({ post }: { post: BlogPost }) {
  const category = blogCategoryBySlug.get(post.category);
  return (
    <article className="card group flex flex-col">
      <Link href={`/blog/${post.slug}`} className="relative block aspect-[16/10] overflow-hidden">
        <Image
          src={post.heroImage.src}
          alt={post.heroImage.alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2 text-xs text-charcoal-muted">
          {category && (
            <span className="font-semibold uppercase tracking-wide text-ocean">{category.name}</span>
          )}
          <span aria-hidden>·</span>
          <span>{post.readingMinutes} min read</span>
        </div>
        <h3 className="mt-2 text-lg font-semibold leading-snug">
          <Link href={`/blog/${post.slug}`} className="transition-colors hover:text-ocean">
            {post.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-charcoal-muted">
          {post.excerpt}
        </p>
        <div className="mt-4 flex items-center justify-between border-t border-charcoal/[0.07] pt-3 text-xs text-charcoal-muted">
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          <span className="inline-flex items-center gap-1 font-semibold text-ocean">
            Read <Icon.Arrow width={14} height={14} />
          </span>
        </div>
      </div>
    </article>
  );
}
