import type { Review } from '@/content/types';
import { StarRating } from '@/components/ui/StarRating';
import { Icon } from '@/components/ui/Icons';
import { formatDate } from '@/lib/utils';

export function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="card flex h-full flex-col p-6">
      <StarRating value={review.rating} showValue={false} />
      <blockquote className="mt-3 flex-1">
        <p className="font-display text-lg font-semibold leading-snug text-charcoal">
          “{review.title}”
        </p>
        <p className="mt-2 text-sm leading-relaxed text-charcoal-muted">{review.body}</p>
      </blockquote>
      <figcaption className="mt-5 flex items-center justify-between border-t border-charcoal/[0.07] pt-4">
        <div>
          <p className="text-sm font-semibold text-charcoal">{review.author}</p>
          <p className="text-xs text-charcoal-muted">
            {review.country} · {formatDate(review.date)}
          </p>
        </div>
        {review.verified && (
          <span className="inline-flex items-center gap-1 rounded-full bg-ocean/10 px-2.5 py-1 text-[0.68rem] font-semibold text-ocean">
            <Icon.Check width={12} height={12} /> Verified
          </span>
        )}
      </figcaption>
    </figure>
  );
}
