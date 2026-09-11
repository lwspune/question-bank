/**
 * Request parsing for GET /api/questions/by-ids. Pure, so the rules are
 * testable without a DB or a request object.
 */

/**
 * Hard cap per request. The known `.in()` failure in this repo was 833 ids
 * ≈ 31 kB of URL, and `/guide/nda-maths/principles` still passes 488 (~18 kB)
 * in one call while discarding the error — it renders an empty stats map with
 * no signal. An over-cap request is REFUSED rather than truncated: a caller
 * that silently receives fewer questions than it asked for cannot tell the
 * difference between "not in the bank" and "you asked for too many".
 */
export const MAX_IDS = 100;

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export type ParsedIds =
  | { ok: true; ids: string[] }
  | { ok: false; error: string };

export function parseIdsParam(raw: string | null): ParsedIds {
  const parts = (raw ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  if (parts.length === 0) {
    return { ok: false, error: "`ids` is required: a comma-separated list of question ids" };
  }

  // Dedupe BEFORE the cap — a caller repeating an id should not lose budget
  // for it, and the response is keyed by id anyway.
  const ids = Array.from(new Set(parts));

  const bad = ids.find((id) => !UUID_RE.test(id));
  if (bad) {
    return { ok: false, error: `not a question id: "${bad}"` };
  }

  if (ids.length > MAX_IDS) {
    return { ok: false, error: `too many ids: ${ids.length}, max ${MAX_IDS} per request` };
  }

  return { ok: true, ids };
}
