/**
 * Commit-time render-corruption lint for pandoc/BLIND-ingested stems.
 *
 * Detects the three mechanically-detectable render-corruption classes that the
 * OCR'd-DOCX + BLIND/pandoc ingest keeps re-introducing (see the memory
 * `stem-render-corruption-probes` + the 2026-07-24 CLAUDE.md Decisions entry):
 *
 *   - "lowercase-start"       a STEM that begins mid-sentence (a dropped lead-in,
 *                             e.g. "of the lines…", "et O be the origin").
 *   - "delimiter-scramble"    a field mixing `$` and `\(` — a stray `$` opens a
 *                             `$…$` zone that swallows inner `\(`/`\)`, which
 *                             KaTeX rejects ("Can't use function '\(' in math mode").
 *   - "plaintext-underscore"  an escaped-underscore blank `\_` OUTSIDE a math zone
 *                             (renders as literal `\_`). Inside `\(…\)`/`\[…\]`,
 *                             `\_` is a valid escaped underscore and renders fine,
 *                             so math zones are stripped before the test.
 *
 * REPORT-ONLY: the fixes need source-verification (classes 1 & 3's lead-in/values
 * come from the source DOCX + stored solution), so this flags, it never rewrites.
 * The 4th class (a symbol dropped INSIDE a well-formed math zone, `kI₃`→`k₃`) has
 * no mechanical signature and stays report-driven.
 *
 * Pure + side-effect-free so it can be unit-tested once and reused by every
 * pipeline's validate-db (JEE, MHT-CET, …).
 */
export type RenderCorruption = "lowercase-start" | "delimiter-scramble" | "plaintext-underscore";

export function renderCorruption(value: string, opts: { isStem?: boolean } = {}): RenderCorruption[] {
  const flags: RenderCorruption[] = [];

  // Class 3 — a stem whose first visible character is a lowercase letter began
  // mid-sentence. Only meaningful for the stem; options/solutions/context can
  // legitimately open lowercase.
  if (opts.isStem && /^[a-z]/.test(value.replace(/^\s+/, ""))) flags.push("lowercase-start");

  // Class 1 — both delimiter kinds present in the same field is the scramble.
  if (value.includes("$") && value.includes("\\(")) flags.push("delimiter-scramble");

  // Class 2 — strip `\(…\)` and `\[…\]` zones FIRST (a `\_` inside them is valid),
  // then any surviving `\_` is a plain-text escaped-underscore blank.
  const plain = value.replace(/\\\(.*?\\\)/gs, "").replace(/\\\[.*?\\\]/gs, "");
  if (/\\_/.test(plain)) flags.push("plaintext-underscore");

  return flags;
}
