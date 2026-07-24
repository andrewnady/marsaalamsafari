import { Icon } from './Icons';
import { cn } from '@/lib/utils';
import { displayRating } from '@/lib/utils';

export function StarRating({
  value,
  count,
  size = 'sm',
  showValue = true,
  className,
}: {
  value: number;
  count?: number;
  size?: 'sm' | 'md';
  showValue?: boolean;
  className?: string;
}) {
  const px = size === 'md' ? 18 : 15;
  const full = Math.floor(value);
  const hasHalf = value - full >= 0.25 && value - full < 0.75;

  return (
    <div className={cn('flex items-center gap-1.5', className)}>
      <div className="flex text-sand" aria-hidden>
        {Array.from({ length: 5 }).map((_, i) => {
          if (i < full) return <Icon.Star key={i} width={px} height={px} />;
          if (i === full && hasHalf)
            return (
              <span key={i} className="relative inline-block" style={{ width: px, height: px }}>
                <Icon.StarOutline width={px} height={px} className="absolute inset-0 text-sand" />
                <span className="absolute inset-0 overflow-hidden" style={{ width: px / 2 }}>
                  <Icon.Star width={px} height={px} />
                </span>
              </span>
            );
          return <Icon.StarOutline key={i} width={px} height={px} className="text-charcoal/25" />;
        })}
      </div>
      {showValue && (
        <span className="text-sm font-semibold text-charcoal">
          {displayRating(value)}
          {count !== undefined && (
            <span className="ml-1 font-normal text-charcoal-muted">
              ({count.toLocaleString()})
            </span>
          )}
        </span>
      )}
      <span className="sr-only">
        Rated {displayRating(value)} out of 5{count !== undefined ? ` from ${count} reviews` : ''}
      </span>
    </div>
  );
}
