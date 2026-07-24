import { cn } from '@/lib/utils';

/** Consistent vertical rhythm + optional eyebrow/heading block. */
export function Section({
  children,
  className,
  tone = 'white',
  as: Tag = 'section',
}: {
  children: React.ReactNode;
  className?: string;
  tone?: 'white' | 'beige' | 'charcoal';
  as?: 'section' | 'div';
}) {
  const tones = {
    white: 'bg-white',
    beige: 'bg-beige-soft',
    charcoal: 'bg-charcoal text-white',
  };
  return (
    <Tag className={cn('py-14 sm:py-20', tones[tone], className)}>
      <div className="container-page">{children}</div>
    </Tag>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  invert = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  invert?: boolean;
}) {
  return (
    <div className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center')}>
      {eyebrow && <p className={cn('eyebrow', invert && 'text-turquoise-light')}>{eyebrow}</p>}
      <h2
        className={cn(
          'mt-2 text-3xl sm:text-4xl',
          invert ? 'text-white' : 'text-charcoal',
        )}
      >
        {title}
      </h2>
      {description && (
        <p className={cn('mt-4 text-lg leading-relaxed', invert ? 'text-white/70' : 'text-charcoal-muted')}>
          {description}
        </p>
      )}
    </div>
  );
}
