import { describe, it, expect } from 'vitest';
import { buildMetadata, pageTitle } from './metadata';

describe('buildMetadata', () => {
  const meta = buildMetadata({ title: 'All Tours', description: 'd', path: '/tours' });

  it('sets a self-referencing absolute canonical', () => {
    expect(meta.alternates?.canonical).toBe('https://marsaalamsafari.com/tours');
  });

  it('emits no hreflang until translated pages actually exist', () => {
    expect(meta.alternates?.languages).toBeUndefined();
  });

  it('uses an absolute title so the layout template never doubles the brand', () => {
    expect(meta.title).toEqual({ absolute: 'All Tours | Marsa Alam Safari' });
  });

  it('noindex pages still let crawlers follow links', () => {
    const m = buildMetadata({ title: 'x', description: 'd', path: '/search', noindex: true });
    expect(m.robots).toEqual({ index: false, follow: true });
  });
});

describe('pageTitle', () => {
  it('appends the brand only when it fits in 60 characters', () => {
    expect(pageTitle('FAQ')).toBe('FAQ | Marsa Alam Safari');
    const long = 'Marsa Alam Desert Safari 2026 | Quad, Camel & Bedouin Dinner';
    expect(pageTitle(long)).toBe(long);
  });

  it('never repeats the brand', () => {
    expect(pageTitle('About Marsa Alam Safari')).toBe('About Marsa Alam Safari');
  });
});
