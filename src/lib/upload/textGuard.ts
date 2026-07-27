/**
 * Write-boundary guard for long-form question text.
 *
 * A literal two-character `\n` (backslash + n) is never valid in stored prose:
 * the render layer can't tell it from real text, so a GFM pipe-table authored
 * with `\n` separators silently degrades to a run of raw `| a | b |` pipes on
 * BOTH the website and the Word export. It reaches the DB when a script builds
 * `ParsedRowPayload` from an agent-written JSON that double-escaped its
 * newlines, and the pipeline never ran `normalizeNewlines`.
 *
 * We REJECT rather than silently repair, because `content_hash` is computed by
 * the caller from the pre-normalisation text: rewriting the text at insert time
 * would leave the stored text no longer equal to the hash's preimage, and the
 * next re-ingest from a corrected source would hash differently and duplicate
 * the row. Failing loudly forces the source file to be fixed too.
 *
 * Detection reuses `normalizeNewlines` itself (`normalised !== original`) rather
 * than a second regex, so the guard can never disagree with the normaliser
 * about what counts as a literal newline — in particular both leave LaTeX math
 * zones alone, so `\neq` / `\nabla` / `\nu` and matrix `\\` row separators are
 * not flagged.
 */
import { normalizeNewlines } from "@/lib/text/normalizeNewlines";

/** The long-form fields that render as prose and may carry a pipe-table. */
export const LONG_FORM_FIELDS = ["text", "context", "solution"] as const;
export type LongFormField = (typeof LONG_FORM_FIELDS)[number];

type LongFormRow = Partial<Record<LongFormField, string | null | undefined>>;

/**
 * Names of the long-form fields on `row` that contain a literal `\n`.
 * Empty array = clean.
 */
export function literalNewlineFields(row: LongFormRow): LongFormField[] {
  const bad: LongFormField[] = [];
  for (const field of LONG_FORM_FIELDS) {
    const value = row[field];
    if (typeof value !== "string" || value.length === 0) continue;
    if (normalizeNewlines(value) !== value) bad.push(field);
  }
  return bad;
}
