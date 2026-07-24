import { ImageResponse } from 'next/og';
import { siteConfig } from '@/config/site';

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/** Default social share image for the homepage, branded with the palette. */
export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          background: 'linear-gradient(135deg, #005F99 0%, #19A7CE 100%)',
          color: '#fff',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ display: 'flex', flexDirection: 'column', width: 64, height: 64, borderRadius: 32, overflow: 'hidden' }}>
            <div style={{ width: 64, height: 32, background: '#D4A24C' }} />
            <div style={{ width: 64, height: 32, background: '#0a3a5c' }} />
          </div>
          <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: 1 }}>Marsa Alam Safari</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 68, fontWeight: 800, lineHeight: 1.05, maxWidth: 900 }}>
            Premium Red Sea safaris, snorkeling &amp; day trips
          </div>
          <div style={{ fontSize: 30, marginTop: 24, color: 'rgba(255,255,255,0.85)' }}>
            Licensed local guides · Free hotel pickup · Best-price guarantee
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 26 }}>
          <span style={{ background: '#E67E22', padding: '8px 20px', borderRadius: 999 }}>Rated 4.9 / 5</span>
          <span>marsaalamsafari.com</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
