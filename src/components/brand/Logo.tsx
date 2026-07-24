import { cn } from '@/lib/utils';

/**
 * Horizon Sun mark from the brand deck: a disc split by a horizon chord with a
 * five-ray fan. Renders crisp at any size; rays are hidden below ~24px via the
 * `compact` prop for favicon-scale use.
 */
export function LogoMark({
  className,
  compact = false,
  reversed = false,
  monochrome = false,
}: {
  className?: string;
  compact?: boolean;
  reversed?: boolean;
  monochrome?: boolean;
}) {
  const sun = monochrome ? (reversed ? '#FFFFFF' : '#222222') : '#D4A24C';
  const sea = monochrome ? (reversed ? '#FFFFFF' : '#222222') : '#005F99';
  const rays = monochrome ? (reversed ? '#FFFFFF' : '#222222') : '#E67E22';

  return (
    <svg
      viewBox="0 0 64 64"
      className={cn('h-8 w-8', className)}
      role="img"
      aria-label="Marsa Alam Safari"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* clip the disc to a circle */}
      <defs>
        <clipPath id="horizon-disc">
          <circle cx="32" cy="34" r="18" />
        </clipPath>
      </defs>
      {!compact && (
        <g stroke={rays} strokeWidth="2.4" strokeLinecap="round">
          <line x1="32" y1="8" x2="32" y2="15" />
          <line x1="20" y1="11" x2="23" y2="17" />
          <line x1="44" y1="11" x2="41" y2="17" />
          <line x1="12" y1="19" x2="17" y2="23" />
          <line x1="52" y1="19" x2="47" y2="23" />
        </g>
      )}
      <g clipPath="url(#horizon-disc)">
        <rect x="14" y="16" width="36" height="18" fill={sun} />
        <rect x="14" y="34" width="36" height="18" fill={sea} />
      </g>
    </svg>
  );
}

export function Logo({
  className,
  reversed = false,
  showTagline = false,
}: {
  className?: string;
  reversed?: boolean;
  showTagline?: boolean;
}) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <LogoMark className="h-9 w-9 shrink-0" reversed={reversed} />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            'font-display text-lg font-semibold tracking-tight',
            reversed ? 'text-white' : 'text-charcoal',
          )}
        >
          Marsa Alam Safari
        </span>
        {showTagline && (
          <span className="mt-1 text-[0.62rem] font-bold uppercase tracking-[0.18em] text-turquoise">
            Red Sea · Egypt
          </span>
        )}
      </span>
    </span>
  );
}
