/** Lazy Google Maps embed (no API key needed for the public embed URL). */
export function MapEmbed({ query, title }: { query: string; title: string }) {
  const src = `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
  return (
    <div className="overflow-hidden rounded-2xl border border-charcoal/[0.08]">
      <iframe
        title={title}
        src={src}
        width="100%"
        height="320"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="block w-full"
      />
    </div>
  );
}
