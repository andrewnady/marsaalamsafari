import { neon, type NeonQueryFunction } from '@neondatabase/serverless';

/**
 * Neon (serverless Postgres) client. Uses HTTP query-over-fetch, which is
 * ideal for Vercel serverless/edge functions — no connection pooling to manage.
 *
 * The connection string lives ONLY in the DATABASE_URL env var (never in the
 * repo). When it's absent (local dev without a DB, or CI build), `sql` is null
 * and callers fall back gracefully so nothing breaks.
 */

let client: NeonQueryFunction<false, false> | null = null;

export function getDb(): NeonQueryFunction<false, false> | null {
  if (client) return client;
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  client = neon(url);
  return client;
}

export function isDbConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

/**
 * Idempotent schema bootstrap. Safe to call on every cold start — uses
 * CREATE TABLE IF NOT EXISTS so it never destroys data. In a larger app this
 * would move to a proper migration tool (drizzle-kit / node-pg-migrate).
 */
export async function ensureSchema(): Promise<void> {
  const sql = getDb();
  if (!sql) return;
  await sql`
    CREATE TABLE IF NOT EXISTS inquiries (
      id           BIGSERIAL PRIMARY KEY,
      name         TEXT NOT NULL,
      email        TEXT NOT NULL,
      country      TEXT,
      subject      TEXT,
      message      TEXT NOT NULL,
      source_ip    TEXT,
      user_agent   TEXT,
      created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS subscribers (
      id           BIGSERIAL PRIMARY KEY,
      email        TEXT NOT NULL UNIQUE,
      source_ip    TEXT,
      created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
}

export interface InquiryRecord {
  name: string;
  email: string;
  message: string;
  country?: string;
  subject?: string;
  sourceIp?: string;
  userAgent?: string;
}

/** Persist a contact/booking inquiry. Returns the new row id, or null if no DB. */
export async function saveInquiry(record: InquiryRecord): Promise<number | null> {
  const sql = getDb();
  if (!sql) return null;
  await ensureSchema();
  const rows = await sql`
    INSERT INTO inquiries (name, email, country, subject, message, source_ip, user_agent)
    VALUES (${record.name}, ${record.email}, ${record.country ?? null}, ${record.subject ?? null},
            ${record.message}, ${record.sourceIp ?? null}, ${record.userAgent ?? null})
    RETURNING id
  `;
  return (rows[0]?.id as number) ?? null;
}

/** Upsert a newsletter subscriber (idempotent on email). Returns true if stored. */
export async function saveSubscriber(email: string, sourceIp?: string): Promise<boolean> {
  const sql = getDb();
  if (!sql) return false;
  await ensureSchema();
  await sql`
    INSERT INTO subscribers (email, source_ip)
    VALUES (${email}, ${sourceIp ?? null})
    ON CONFLICT (email) DO NOTHING
  `;
  return true;
}
