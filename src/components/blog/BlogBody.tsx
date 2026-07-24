import Image from 'next/image';
import type { BlogBlock } from '@/content/types';
import { Icon } from '@/components/ui/Icons';

/** Renders the structured blog body. Headings carry ids for a TOC/anchors. */
export function BlogBody({ blocks }: { blocks: BlogBlock[] }) {
  return (
    <div className="prose-brand">
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'heading':
            return block.level === 2 ? (
              <h2 key={i} id={block.id}>{block.text}</h2>
            ) : (
              <h3 key={i} id={block.id}>{block.text}</h3>
            );
          case 'paragraph':
            return <p key={i}>{block.text}</p>;
          case 'list':
            return block.ordered ? (
              <ol key={i}>{block.items.map((it, j) => <li key={j}>{it}</li>)}</ol>
            ) : (
              <ul key={i}>{block.items.map((it, j) => <li key={j}>{it}</li>)}</ul>
            );
          case 'quote':
            return (
              <blockquote key={i}>
                <p>{block.text}</p>
                {block.cite && <cite className="text-sm text-charcoal-muted">— {block.cite}</cite>}
              </blockquote>
            );
          case 'image':
            return (
              <figure key={i} className="not-prose my-8">
                <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
                  <Image src={block.image.src} alt={block.image.alt} fill sizes="(max-width: 768px) 100vw, 768px" className="object-cover" />
                </div>
                {block.image.caption && (
                  <figcaption className="mt-2 text-center text-sm text-charcoal-muted">{block.image.caption}</figcaption>
                )}
              </figure>
            );
          case 'callout':
            return (
              <div key={i} className="not-prose my-6 flex gap-3 rounded-2xl border border-turquoise/25 bg-turquoise/[0.06] p-5">
                <Icon.Sparkle width={22} height={22} className="mt-0.5 shrink-0 text-turquoise" />
                <div>
                  <p className="font-semibold text-charcoal">{block.title}</p>
                  <p className="mt-1 text-charcoal-soft">{block.text}</p>
                </div>
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}

/** Extract h2/h3 headings for a table of contents. */
export function tableOfContents(blocks: BlogBlock[]) {
  return blocks
    .filter((b): b is Extract<BlogBlock, { type: 'heading' }> => b.type === 'heading')
    .map((h) => ({ text: h.text, id: h.id, level: h.level }));
}
