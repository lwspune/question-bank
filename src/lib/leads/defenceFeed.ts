/**
 * The defence-leads feed (GET /api/leads/defence): students preparing for NDA,
 * CDS or AFCAT who gave a mobile AND ticked "I agree to be contacted", read by
 * GoPost (LWS's marketing app) into its Leads list. Pure, so the request rules,
 * the cursor and the secret check are testable without a DB or a request.
 *
 * WHICH rows count is decided in SQL (`defence_leads_after`, migration 0185),
 * next to the data; this layer only shapes the request and the response.
 *
 * THE CURSOR IS (changed_at, id), NOT A TIMESTAMP ALONE. Bulk backfills have
 * stamped up to 10 student_profiles rows with the same updated_at, so a
 * time-only cursor would either skip the rest of a tie at a page boundary or
 * loop on it forever. The timestamp is passed through as Postgres printed it
 * (microseconds): a JS Date round-trip would cut it to milliseconds and make
 * the next page re-read rows.
 */
import { createHash, timingSafeEqual } from "node:crypto";

export const FEED_SOURCES = ["account", "quiz"] as const;
export type FeedSource = (typeof FEED_SOURCES)[number];

export const DEFAULT_LIMIT = 100;
/** Under PostgREST's 1,000-row cap with room to spare; refused, never truncated. */
export const MAX_LIMIT = 500;

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const SEP = "~";

export type FeedCursor = { at: string; id: string };
export type FeedRequest =
  | { ok: true; source: FeedSource; after: FeedCursor | null; limit: number }
  | { ok: false; error: string };

export function formatCursor(at: string, id: string): string {
  return `${at}${SEP}${id}`;
}

function parseCursor(raw: string): FeedCursor | null {
  const i = raw.lastIndexOf(SEP);
  if (i <= 0) return null;
  const at = raw.slice(0, i), id = raw.slice(i + 1);
  if (!UUID_RE.test(id) || Number.isNaN(Date.parse(at))) return null;
  return { at, id };
}

export function parseFeedRequest(params: URLSearchParams): FeedRequest {
  const source = params.get("source");
  if (!FEED_SOURCES.includes(source as FeedSource)) {
    return { ok: false, error: "`source` must be account or quiz" };
  }

  const rawAfter = params.get("after");
  let after: FeedCursor | null = null;
  if (rawAfter) {
    after = parseCursor(rawAfter);
    if (!after) return { ok: false, error: "`after` must be <timestamp>~<id>, as returned in `next`" };
  }

  const rawLimit = params.get("limit");
  let limit = DEFAULT_LIMIT;
  if (rawLimit !== null) {
    limit = Number(rawLimit);
    if (!Number.isInteger(limit) || limit < 1 || limit > MAX_LIMIT) {
      return { ok: false, error: `\`limit\` must be a whole number from 1 to ${MAX_LIMIT}` };
    }
  }

  return { ok: true, source: source as FeedSource, after, limit };
}

/**
 * Constant-time check of `Authorization: Bearer <secret>` against the server's
 * GOPOST_LEADS_SECRET. Both sides are hashed first so their lengths match
 * (timingSafeEqual throws on a length mismatch). No secret configured = closed.
 */
export function secretMatches(header: string | null, expected: string | undefined): boolean {
  if (!expected || !header?.startsWith("Bearer ")) return false;
  const given = header.slice(7).trim();
  if (!given) return false;
  const digest = (s: string) => createHash("sha256").update(s).digest();
  return timingSafeEqual(digest(given), digest(expected));
}

/** One row of `defence_leads_after`. */
export type FeedRow = {
  id: string;
  changed_at: string;
  lead_at: string;
  name: string | null;
  mobile: string;
  exams: string[];
  stage: string | null;
  city: string | null;
};

export type FeedLead = {
  cursor: string;
  leadAt: string;
  name: string | null;
  /** Canonical 91XXXXXXXXXX, as stored (normalizeMobile). */
  mobile: string;
  exams: string[];
  stage: string | null;
  city: string | null;
};

const blankToNull = (s: string | null) => (s?.trim() ? s.trim() : null);

export function toFeedLead(r: FeedRow): FeedLead {
  return {
    cursor: formatCursor(r.changed_at, r.id),
    leadAt: r.lead_at,
    name: blankToNull(r.name),
    mobile: r.mobile,
    exams: r.exams,
    stage: r.stage,
    city: blankToNull(r.city),
  };
}
