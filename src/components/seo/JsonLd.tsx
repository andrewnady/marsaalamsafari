import { jsonLdScript } from '@/lib/seo/jsonld';

type Json = Record<string, unknown>;

/**
 * Renders JSON-LD structured data. Accepts a single schema or an array.
 * Uses dangerouslySetInnerHTML because JSON-LD must be raw JSON in a script.
 */
export function JsonLd({ schema }: { schema: Json | Json[] }) {
  const payload = Array.isArray(schema) ? schema : [schema];
  return (
    <>
      {payload.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          // Content is developer-authored schema, not user input.
          dangerouslySetInnerHTML={{ __html: jsonLdScript(s) }}
        />
      ))}
    </>
  );
}
