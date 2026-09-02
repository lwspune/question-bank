/**
 * Two stem-corruption probes, both earned by /dashboard/reports on 2026-07-28.
 * Pure so the false-positive boundary is pinned by tests — each probe's value is
 * entirely in NOT crying wolf, since both shapes have common legitimate look-alikes.
 */

/**
 * DROPPED_SYMBOL — a math zone that opens with a bare `=` because the object it
 * defines was lost upstream: `Let \(= I + adj(A)…\)` should read `Let \(B = I + …\)`.
 * The 2026-07-24 audit filed this class as "not mechanically detectable"; it is, if
 * you anchor on the preceding word.
 *
 * The discriminator is what sits immediately before the zone. A FUNCTION word
 * (and / Let / where / then …) means the object is genuinely missing. A NOUN
 * ("least count", "rate", "specific heat") means the quantity was named outside the
 * zone and pandoc merely split the `=` into it — legitimate and very common. A comma
 * is excluded too: it precedes both a piecewise second branch (`, \(=k\) if x=2`) and
 * a continued bracket (`for water, \(= 1.86\)`), neither of which is a defect.
 */
const DROPPED_SYMBOL_RE = /\b(?:and|Let|let|that|then|If|if|where|when)\s+\\\(\s*=/;

export function hasDroppedSymbol(text: string): boolean {
  return DROPPED_SYMBOL_RE.test(text);
}

/** Strip LaTeX inline-math delimiters so a label run reads the same whether or not
 *  the options were wrapped in `\( \)`. Without this, JEE 2026 Jan21 Q70 hid. */
function unwrapMath(s: string): string {
  return s.replace(/\\\(/g, " ").replace(/\\\)/g, " ");
}

const LABEL_RUN_RE = /\([a-d]\)[^()]{0,80}\([b-d]\)[^()]{0,80}\([b-d]\)/;

/**
 * A leaked option BLOCK begins after the question has terminated — a colon, a question
 * mark, a full stop, or a line break. An NDA GAT "spot the error" stem instead carries
 * its labels INLINE mid-sentence ("… the function (a) / of the kidney (b) …"), and its
 * options legitimately repeat those segments. Without this check that whole family
 * (~30 rows) reads as a leak.
 */
function runStartsAfterQuestionEnd(masked: string, runIndex: number): boolean {
  // strip only spaces/tabs and a stray delimiter backslash — NOT newlines, which are
  // themselves one of the terminators we're looking for
  const before = masked.slice(0, runIndex).replace(/[ \t\\]+$/, "");
  if (before === "") return true;
  return /[:?.\n\r]$/.test(before);
}

/**
 * OPTION_LEAK — the option block was never split off the stem, so the stem still
 * carries `(a) … (b) … (c) …` AND the row's own option rows repeat those values.
 *
 * BOTH conditions are required. A label run alone is the normal shape of a
 * spot-the-error question ("… the function (a) / of the kidney (b) / … no error (d)"),
 * which is why the naive probe returns ~119 hits of which ~3 are real. Echoed values
 * alone are just a stem quoting a number that happens to be an option.
 *
 * Values shorter than 4 characters are ignored — a stem mentioning "2" or "15" tells
 * you nothing.
 */
export function leakedOptionValues(text: string, optionTexts: string[]): boolean {
  const masked = unwrapMath(text);
  const run = LABEL_RUN_RE.exec(masked);
  if (!run) return false;
  if (!runStartsAfterQuestionEnd(masked, run.index)) return false;
  const values = optionTexts
    .map((o) => unwrapMath(o).replace(/[()]/g, "").trim())
    .filter((v) => v.length >= 4);
  const echoed = values.filter((v) => masked.includes(v)).length;
  return echoed >= 3;
}

/**
 * FLATTENED_TABLE — a printed data table stored as parallel runs of prose:
 * `\(x\): 1, 2, 3, 4; \(f\): 4, 6, 9, 7` where the paper prints a bordered grid.
 *
 * Earned 2026-09-02. Four live NDA rows, ALL from `.xlsx` uploads, every one
 * source-verified against the scanned paper. Nothing else could see them: the
 * question stays answerable, `audit:text`'s other classes look for malformed
 * text, and P2 fires only on match-lists. Two of the four stems even announce
 * the missing structure ("The following table gives...") and still passed.
 *
 * THE DISCRIMINATOR IS "TWO PARALLEL RUNS", and the papers themselves justify
 * it: a RAW DATA LIST is printed as prose, and our prose storage of one is
 * FAITHFUL — verified on 2023-I Q110 ("a die is thrown 10 times..."), Q112 and
 * 2021-I Q107, all of which must never fire. Only the two-row x/f shape is a
 * table in print. A run also needs 4+ values, so a pair of coordinates and a
 * two-item list stay out.
 *
 * Triage, not a gate: it says "this looks like a table that lost its grid", and
 * the printed page settles it.
 */
const LABELLED_RUN = /(?:^|[:;.]|\))\s*[^:;\n]{0,30}?:\s*-?[0-9][0-9.,]*(?:\s*,\s*-?[0-9][0-9.,]*){3,}/g;

export function isFlattenedTable(text: string): boolean {
  // A stem that already carries a real GFM table is done, whatever else it says.
  if (/^\s*\|.*\|\s*$/m.test(text) && /\|\s*-{3,}/.test(text)) return false;
  LABELLED_RUN.lastIndex = 0;
  const runs = text.match(LABELLED_RUN) ?? [];
  return runs.length >= 2;
}
