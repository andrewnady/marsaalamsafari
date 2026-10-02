/**
 * Counts clicks on every WhatsApp button on the site (browser only).
 *
 * One listener on the whole page catches clicks on any link to wa.me / api.whatsapp.com
 * (new buttons are counted automatically). Each click is sent to /api/whatsapp-clicks and
 * shows up in the "All websites" admin dashboard on hurghadasafari.travel/admin/super/amgad.
 *
 * Name a button in the dashboard by adding data-wa-button="name" to it (or a parent);
 * otherwise its data-testid or the page area (header, footer, page) is used.
 */

const ENDPOINT = '/api/whatsapp-clicks';

/** WhatsApp phone number a link opens a chat with, or null (share links, group invites, other sites). */
export function whatsappNumberFromUrl(
  href: string,
  base = 'https://marsaalamsafari.com',
): string | null {
  try {
    const url = new URL(href, base);
    const host = url.hostname.replace(/^www\./, '');
    let number = '';
    if (host === 'wa.me') number = url.pathname;
    else if (
      host === 'api.whatsapp.com' ||
      host === 'web.whatsapp.com' ||
      url.protocol === 'whatsapp:'
    ) {
      number = url.searchParams.get('phone') ?? '';
    }
    number = number.replace(/\D/g, '');
    return number.length >= 6 ? number : null;
  } catch {
    return null;
  }
}

function buttonName(el: Element): string {
  const named = el.closest('[data-wa-button]')?.getAttribute('data-wa-button');
  if (named) return named;
  const testId =
    el.getAttribute('data-testid') ??
    el.querySelector('[data-testid]')?.getAttribute('data-testid');
  if (testId) return testId;
  if (el.closest('header, nav')) return 'header';
  if (el.closest('footer')) return 'footer';
  return 'page';
}

let lastSent = { key: '', at: 0 };

/** Send one WhatsApp click to the server. Never throws and never delays the click. */
export function trackWhatsAppClick(number: string, button: string): void {
  if (typeof window === 'undefined') return;
  const path = window.location.pathname;
  // Admin pages are not customer clicks.
  if (/(^|\/)admin(\/|$)/.test(path)) return;

  // A double-click on the same button counts once.
  const key = `${path}|${button}`;
  const now = Date.now();
  if (lastSent.key === key && now - lastSent.at < 1500) return;
  lastSent = { key, at: now };

  const body = JSON.stringify({
    path,
    button,
    phone: number,
    lang: document.documentElement.lang || null,
  });
  try {
    // sendBeacon survives the page switching to WhatsApp; a plain string is sent as text/plain.
    if (navigator.sendBeacon && navigator.sendBeacon(ENDPOINT, body)) return;
  } catch {
    // fall through to fetch
  }
  fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain' },
    body,
    keepalive: true,
  }).catch(() => {});
}

function onClick(event: MouseEvent): void {
  // Left click, or middle click (open in new tab)
  if (event.button !== 0 && event.button !== 1) return;
  const link = (event.target as Element | null)?.closest?.('a[href]');
  if (!link) return;
  const number = whatsappNumberFromUrl(link.getAttribute('href') ?? '', window.location.href);
  if (number) trackWhatsAppClick(number, buttonName(link));
}

let installed = false;

/** Start counting WhatsApp clicks on this page (call once, in the browser). */
export function installWhatsAppClickTracking(): void {
  if (installed || typeof document === 'undefined') return;
  installed = true;
  // Capture phase: still counted when a button stops the click from bubbling.
  document.addEventListener('click', onClick, true);
  document.addEventListener('auxclick', onClick, true);
}
