/**
 * Pure helpers for the cart's "Add to paper" picker.
 *
 * The picker lists DRAFT papers, and drafts accumulate (a paper only leaves the
 * list when finalized or deleted), so the list is recency-capped + searchable
 * rather than "every draft in the org". These helpers own the query hygiene; the
 * SQL round-trip lives in listDraftPapersForPicker.
 */

/** Most-recent drafts shown by default; search/batch-filter reveal the rest. */
export const PAPER_PICKER_LIMIT = 20;

/** Trim a raw search box value; blank → undefined so the caller drops the filter. */
export function normalizePaperQuery(
  raw: string | null | undefined
): string | undefined {
  if (!raw) return undefined;
  const trimmed = raw.trim();
  return trimmed.length === 0 ? undefined : trimmed;
}

/**
 * Build a case-insensitive contains-pattern for a PostgREST `ilike`, escaping the
 * `%`/`_`/`\` metacharacters so a literal `%` a user types matches itself instead
 * of acting as a wildcard. Returns undefined for a blank query (no filter).
 */
export function paperTitleIlikePattern(
  raw: string | null | undefined
): string | undefined {
  const q = normalizePaperQuery(raw);
  if (!q) return undefined;
  const escaped = q.replace(/[\\%_]/g, (c) => `\\${c}`);
  return `%${escaped}%`;
}
