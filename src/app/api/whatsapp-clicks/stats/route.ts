import { NextResponse } from 'next/server';
import { siteConfig } from '@/config/site';
import { getWhatsAppClickStats } from '@/lib/whatsapp-clicks';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** WhatsApp click totals, read by the "All websites" dashboard on hurghadasafari.travel. */
export async function GET() {
  try {
    const stats = await getWhatsAppClickStats(new URL(siteConfig.url).host);
    return NextResponse.json(stats, { headers: { 'Cache-Control': 'no-store' } });
  } catch (err) {
    console.error('[whatsapp-clicks] could not load stats:', err);
    return NextResponse.json({ error: 'Failed to load WhatsApp click stats' }, { status: 500 });
  }
}
