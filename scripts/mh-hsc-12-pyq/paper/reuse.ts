/**
 * Detect a board question this bank has already seen.
 *
 * ## Why this exists
 *
 * `content_hash` is unique per `(org_id, exam_id, content_hash)` and catches an
 * EXACT repeat. Boards do not repeat exactly. On 2026-09-19, February-2026 Q.6
 * and March-2024 Q.6 were found to be the same printed question, and they did
 * NOT collide, because the older row reads
 *
 *     Find \(k,\)  ...   (comma INSIDE the math delimiters)
 *     Find \(k\),  ...   (comma in the prose)
 *
 * One character of typography. Keeping both is this project's policy on
 * recurrence, so the outcome was fine — but it was LUCK. Had the older row been
 * typed the other way, the 2026 sitting's provenance would have disappeared into
 * a silent `skipped=1`, and in a whole-paper ingest that is indistinguishable
 * from a question that was never on the paper.
 *
 * So the recurrence signal should be DETECTED and reported, not left to whether
 * two typists agreed about a comma.
 *
 * ## What it deliberately does not do
 *
 * It does not merge, dedupe or suppress anything. A repeat across sittings is
 * signal worth keeping — it tells a student the board asks this. The output is a
 * report.
 *
 * ## The balance the key strikes
 *
 * Loose enough to see through TYPOGRAPHY (delimiter placement, whitespace, case,
 * `\dfrac` vs `\frac`, optional exponent braces, a trailing stop) and strict
 * enough to keep every MATHEMATICAL difference. The board reuses a template with
 * changed constants constantly — `-3y^2` vs `-5y^2` is a different question and
 * must not collapse. Digits and operators are therefore never normalised away.
 *
 * TDD'd in tests/mh-hsc-12-paper-reuse.test.ts.
 */

/** Collapse a stem to what is the SAME question, typographically speaking. */
export function reuseKey(text: string): string {
  return (
    String(text ?? "")
      // Inline math delimiters carry no meaning for identity — and where the
      // punctuation sits relative to them is exactly the difference that let a
      // real repeat through.
      .replace(/\\[()[\]]/g, " ")
      // \dfrac and \frac differ only in rendered size.
      .replace(/\\dfrac/g, "\\frac")
      // x^{2} and x^2 are the same power; {} around ONE character is optional.
      .replace(/([_^])\{(\w)\}/g, "$1$2")
      // LaTeX spacing commands are presentation.
      .replace(/\\[,;:!]|\\quad|\\qquad/g, " ")
      .toLowerCase()
      // Punctuation that floats: commas and stops move around delimiters.
      .replace(/[.,;:]/g, " ")
      .replace(/\s+/g, " ")
      .trim()
  );
}

export type ReuseRow = { id: string; text: string; [k: string]: unknown };

/** Rows sharing a reuse key, as groups. Singletons are omitted. */
export function groupByReuseKey<T extends ReuseRow>(rows: readonly T[]): T[][] {
  const byKey = new Map<string, T[]>();
  for (const r of rows) {
    const k = reuseKey(r.text);
    if (!k) continue;
    const bucket = byKey.get(k);
    if (bucket) bucket.push(r);
    else byKey.set(k, [r]);
  }
  return [...byKey.values()].filter((g) => g.length > 1);
}
