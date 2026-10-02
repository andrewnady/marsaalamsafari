import { getDb } from '@/lib/db';

/**
 * WhatsApp button click counter (server only).
 *
 * POST /api/whatsapp-clicks         one click (sent by src/lib/whatsapp-click-tracking.ts)
 * GET  /api/whatsapp-clicks/stats   totals for this site
 *
 * The "All websites" dashboard on hurghadasafari.travel/admin/super/amgad reads the stats.
 * The same endpoints (same JSON) exist on hurghadasafari.travel and sharmelsheikhsafari.com.
 * Days are counted in Egypt time (Africa/Cairo).
 */

export interface WhatsAppClickStats {
  site: string;
  total: number;
  today: number;
  last7Days: number;
  last30Days: number;
  firstClickAt: string | null;
  /** Last 30 days (Egypt time), oldest first, days without clicks included. */
  daily: Array<{ date: string; clicks: number }>;
  /** Last 30 days */
  topPages: Array<{ path: string; clicks: number }>;
  /** Last 30 days */
  topButtons: Array<{ button: string; clicks: number }>;
  updatedAt: string;
}

export interface WhatsAppClick {
  path: string;
  button: string;
  phone: string;
  lang: string | null;
}

let tableReady: Promise<void> | null = null;

/** Idempotent: creates the table on first use, never touches existing data. */
function ensureTable(): Promise<void> {
  const sql = getDb();
  if (!sql) return Promise.resolve();
  tableReady ??= (async () => {
    await sql`
      CREATE TABLE IF NOT EXISTS whatsapp_clicks (
        id          BIGSERIAL PRIMARY KEY,
        path        TEXT NOT NULL,
        button      TEXT NOT NULL,
        phone       TEXT,
        lang        TEXT,
        created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
      )
    `;
    await sql`CREATE INDEX IF NOT EXISTS whatsapp_clicks_created_at_idx ON whatsapp_clicks (created_at)`;
  })().catch((error) => {
    tableReady = null;
    throw error;
  });
  return tableReady;
}

function cleanText(value: unknown, maxLength: number): string | null {
  if (typeof value !== 'string') return null;
  const text = value.trim().slice(0, maxLength);
  return text || null;
}

/** Validate a click sent by the browser. Null when it was not sent by our click tracker. */
export function parseWhatsAppClick(data: unknown): WhatsAppClick | null {
  if (!data || typeof data !== 'object') return null;
  const input = data as Record<string, unknown>;
  const phone = cleanText(input.phone, 20)?.replace(/\D/g, '');
  if (!phone) return null;
  const path = cleanText(input.path, 300);
  return {
    path: path?.startsWith('/') ? path : '/',
    button: cleanText(input.button, 80) ?? 'unknown',
    phone,
    lang: cleanText(input.lang, 10),
  };
}

/** Save one click. Returns false when no database is configured. */
export async function saveWhatsAppClick(click: WhatsAppClick): Promise<boolean> {
  const sql = getDb();
  if (!sql) return false;
  await ensureTable();
  await sql`
    INSERT INTO whatsapp_clicks (path, button, phone, lang)
    VALUES (${click.path}, ${click.button}, ${click.phone}, ${click.lang})
  `;
  return true;
}

/** "YYYY-MM-DD" in Egypt time. */
function egyptDate(date: Date): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Africa/Cairo' }).format(date);
}

/** Totals for the dashboard. All zeros when no database is configured. */
export async function getWhatsAppClickStats(site: string): Promise<WhatsAppClickStats> {
  const sql = getDb();
  type Totals = {
    total: number;
    today: number;
    last7: number;
    last30: number;
    first_click: string | Date | null;
  };
  let totals: Totals = { total: 0, today: 0, last7: 0, last30: 0, first_click: null };
  let daily: Array<{ day: string; clicks: number }> = [];
  let topPages: WhatsAppClickStats['topPages'] = [];
  let topButtons: WhatsAppClickStats['topButtons'] = [];

  if (sql) {
    await ensureTable();
    const [totalRows, dailyRows, pageRows, buttonRows] = await Promise.all([
      sql`
        WITH bounds AS (SELECT date_trunc('day', now() AT TIME ZONE 'Africa/Cairo') AS local_today)
        SELECT count(*)::int AS total,
               (count(*) FILTER (WHERE created_at >= local_today AT TIME ZONE 'Africa/Cairo'))::int AS today,
               (count(*) FILTER (WHERE created_at >= (local_today - interval '6 days') AT TIME ZONE 'Africa/Cairo'))::int AS last7,
               (count(*) FILTER (WHERE created_at >= (local_today - interval '29 days') AT TIME ZONE 'Africa/Cairo'))::int AS last30,
               min(created_at) AS first_click
        FROM whatsapp_clicks, bounds
      `,
      sql`
        SELECT to_char(created_at AT TIME ZONE 'Africa/Cairo', 'YYYY-MM-DD') AS day, count(*)::int AS clicks
        FROM whatsapp_clicks WHERE created_at >= now() - interval '31 days'
        GROUP BY 1
      `,
      sql`
        SELECT path, count(*)::int AS clicks FROM whatsapp_clicks
        WHERE created_at >= now() - interval '30 days'
        GROUP BY path ORDER BY clicks DESC, path LIMIT 10
      `,
      sql`
        SELECT button, count(*)::int AS clicks FROM whatsapp_clicks
        WHERE created_at >= now() - interval '30 days'
        GROUP BY button ORDER BY clicks DESC, button LIMIT 10
      `,
    ]);
    totals = (totalRows[0] as Totals | undefined) ?? totals;
    daily = dailyRows as typeof daily;
    topPages = pageRows as typeof topPages;
    topButtons = buttonRows as typeof topButtons;
  }

  const clicksByDay = new Map(daily.map((row) => [row.day, row.clicks]));
  const todayStart = Date.parse(`${egyptDate(new Date())}T00:00:00Z`);
  const days: WhatsAppClickStats['daily'] = [];
  for (let i = 29; i >= 0; i--) {
    const date = new Date(todayStart - i * 86_400_000).toISOString().slice(0, 10);
    days.push({ date, clicks: clicksByDay.get(date) ?? 0 });
  }

  return {
    site,
    total: totals.total,
    today: totals.today,
    last7Days: totals.last7,
    last30Days: totals.last30,
    firstClickAt: totals.first_click ? new Date(totals.first_click).toISOString() : null,
    daily: days,
    topPages,
    topButtons,
    updatedAt: new Date().toISOString(),
  };
}
