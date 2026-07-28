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
