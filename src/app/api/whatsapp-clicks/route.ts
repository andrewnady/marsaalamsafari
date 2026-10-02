import { rateLimit, clientIp } from '@/lib/rate-limit';
import { parseWhatsAppClick, saveWhatsAppClick } from '@/lib/whatsapp-clicks';

export const runtime = 'nodejs';

/**
 * One click on a WhatsApp button, sent by src/lib/whatsapp-click-tracking.ts with
 * navigator.sendBeacon (text/plain JSON). Always answers 204: the visitor is already
 * on their way to WhatsApp.
 */
export async function POST(req: Request) {
  try {
    if (/bot|crawl|spider|slurp|preview/i.test(req.headers.get('user-agent') ?? '')) {
      return new Response(null, { status: 204 });
    }
    // At most 30 clicks per visitor per minute, so nobody can inflate the numbers by script.
    if (!rateLimit(`whatsapp-click:${clientIp(req)}`, 30).ok) {
      return new Response(null, { status: 204 });
    }
    const text = (await req.text()).slice(0, 4096);
    const click = parseWhatsAppClick(JSON.parse(text || '{}'));
    if (click) await saveWhatsAppClick(click);
  } catch (err) {
    console.error('[whatsapp-clicks] could not save click:', err);
  }
  return new Response(null, { status: 204 });
}
