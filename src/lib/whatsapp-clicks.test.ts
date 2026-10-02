import { describe, it, expect } from 'vitest';
import { whatsappNumberFromUrl } from './whatsapp-click-tracking';
import { parseWhatsAppClick } from './whatsapp-clicks';
import { whatsappLink } from '@/config/site';

describe('whatsappNumberFromUrl', () => {
  it('reads the number from our WhatsApp links', () => {
    expect(whatsappNumberFromUrl(whatsappLink())).toBe('201559165152');
    expect(whatsappNumberFromUrl(whatsappLink('Hi! I’d like to book a tour.'))).toBe(
      '201559165152',
    );
  });

  it('reads api.whatsapp.com and whatsapp:// links', () => {
    expect(whatsappNumberFromUrl('https://api.whatsapp.com/send?phone=201559165152&text=Hi')).toBe(
      '201559165152',
    );
    expect(whatsappNumberFromUrl('whatsapp://send?phone=+20 155 916 5152')).toBe('201559165152');
  });

  it('ignores share links, other sites and relative links', () => {
    expect(whatsappNumberFromUrl('https://wa.me/?text=Look%20at%20this')).toBeNull();
    expect(whatsappNumberFromUrl('https://chat.whatsapp.com/AbCdEf123')).toBeNull();
    expect(whatsappNumberFromUrl('https://example.com/201559165152')).toBeNull();
    expect(whatsappNumberFromUrl('/contact')).toBeNull();
  });
});

describe('parseWhatsAppClick', () => {
  it('keeps a valid click', () => {
    expect(
      parseWhatsAppClick({ path: '/tours', button: 'header', phone: '201559165152', lang: 'en' }),
    ).toEqual({ path: '/tours', button: 'header', phone: '201559165152', lang: 'en' });
  });

  it('rejects requests without a WhatsApp number', () => {
    expect(parseWhatsAppClick({ path: '/', button: 'header' })).toBeNull();
    expect(parseWhatsAppClick('not a click')).toBeNull();
    expect(parseWhatsAppClick(null)).toBeNull();
  });

  it('cleans up odd values', () => {
    expect(
      parseWhatsAppClick({
        path: 'https://evil.example',
        phone: '+20 155',
        button: 'x'.repeat(200),
      }),
    ).toEqual({
      path: '/',
      button: 'x'.repeat(80),
      phone: '20155',
      lang: null,
    });
  });
});
