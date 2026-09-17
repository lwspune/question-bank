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

/**
 * MIXED_MATRIX_DELIM — one question that draws its matrices in two different
 * brackets. Reported 2026-09-17 on NDA1 2022 Q24, whose stem prints
 * `A = [m n]` and `B = [-n -m]` in square brackets and `C` in round ones, all
 * in one line; the commoner shape is a round stem whose solution repeats THE
 * SAME matrix in square brackets.
 *
 * Square bracket is the house style by a wide margin (882 question rows carry
 * `bmatrix` against 191 with `pmatrix`), but this probe deliberately does NOT
 * hunt `pmatrix`. It fires only on INTERNAL disagreement, because a uniformly
 * round question has nothing to mismatch against, and rewriting one changes its
 * `content_hash` preimage — desynchronising the dedup key from the source file
 * and from nda-tracker's copy — for a change no reader can see.
 *
 * THE FALSE-POSITIVE BOUNDARY, in the order the bank taught it:
 *
 *  1. `\begin{pmatrix} n \\ k \end{pmatrix}` in Binomial Theorem is nCk, not a
 *     matrix. JEE 2021 Paper19 goes further and defines `(n k)` and `[n k]` as
 *     two DIFFERENT symbols, told apart by their brackets — "normalising" it
 *     would merge them and destroy the question. So an environment is exempt
 *     when it is single-column AND the row talks about combinations. BOTH are
 *     required: the reported row's own `C` is single-column too, and it really
 *     is a matrix. Measured bank-wide, the pair exempts exactly the 3 rows that
 *     want exempting.
 *  2. A determinant is a different axis, so only pmatrix/bmatrix are compared —
 *     `\left| \begin{matrix} ... \right|` beside a `bmatrix` is correct, and 203
 *     rows are written that way.
 *  3. A literal `[ ... ]` counts as a bracket-style matrix only when its entries
 *     are separated by an explicit spacing macro, and only OUTSIDE a matrix
 *     environment's own cells. Without that the greatest-integer
 *     `\lbrack t\rbrack`, the interval `[68,69)` and the dimension `[1\times3]`
 *     all fire. The `\\` that ends a matrix row is excluded by the same
 *     lookbehind that excludes the `\[ ... \]` display-math delimiters.
 *  4. `[a  b  c]` with VECTOR entries is the scalar triple product a·(b×c), not
 *     a row matrix — it is shaped identically and is the one class the live
 *     bank added that the fixtures had not predicted (3 rows: two State Board
 *     Vectors, one MHT-CET). A row matrix's entries are scalars, so a bracket
 *     containing `\vec` / `\overrightarrow` is never one.
 *
 * Triage, not a gate — it says "this question can't decide how to draw a
 * matrix", and the row itself settles it.
 */
const MATRIX_ENV_RE = /\\begin\{([pb])matrix\}([\s\S]*?)\\end\{\1matrix\}/g;

/** The row is demonstrably about combinations, so a single-column `(n k)` is nCk. */
const COMBINATION_RE = /C_\{|\\binom/;

/**
 * A bracketed ROW VECTOR — `[m\ \ n]`, `[x\; y\; z]`. The bracket must not be a
 * `\[` / `\]` display-math delimiter, and the separator must be a single
 * backslash macro, never the `\\` that ends a matrix row.
 */
const LITERAL_ROW_MATRIX_RE =
  /(?<!\\)\[([^[\]]*?(?<!\\)\\(?: |;|quad|qquad)[^[\]]*?)(?<!\\)\]/g;

/** Vector entries mean the bracket is a scalar triple product, not a row matrix. */
const VECTOR_ENTRY_RE = /\\vec|\\overrightarrow/;

function hasLiteralRowMatrix(value: string): boolean {
  LITERAL_ROW_MATRIX_RE.lastIndex = 0;
  for (const [, entries] of value.matchAll(LITERAL_ROW_MATRIX_RE)) {
    if (!VECTOR_ENTRY_RE.test(entries)) return true;
  }
  return false;
}

export function mixedMatrixDelimiters(
  fields: readonly (string | null | undefined)[]
): boolean {
  const body = fields.filter((f): f is string => Boolean(f)).join("\n");
  if (body === "") return false;

  const aboutCombinations = COMBINATION_RE.test(body);
  const styles = new Set<"paren" | "bracket">();

  MATRIX_ENV_RE.lastIndex = 0;
  for (const [, kind, cells] of body.matchAll(MATRIX_ENV_RE)) {
    // Guard 1 — a single-column environment in a combinations question is nCk.
    if (aboutCombinations && !cells.includes("&")) continue;
    styles.add(kind === "p" ? "paren" : "bracket");
  }

  // Guard 3 — hunt a literal row vector only OUTSIDE the matrix cells, so a
  // bracketed ENTRY inside a matrix can't masquerade as one.
  const outsideCells = body.replace(MATRIX_ENV_RE, " ");
  if (hasLiteralRowMatrix(outsideCells)) styles.add("bracket");

  return styles.has("paren") && styles.has("bracket");
}

/** Does this row talk about combinations? Exposed so the repair can reuse guard 1. */
export function mentionsCombinations(body: string): boolean {
  return COMBINATION_RE.test(body);
}

/**
 * The repair `mixedMatrixDelimiters` reports on: round matrix -> square, the
 * house style. Carries the SAME combinations exemption as the probe, so a row
 * flagged for some other reason can never have its nCk turned into a matrix.
 *
 * Cells pass through byte-for-byte — only the fence changes. `\begin{matrix}`
 * (determinants, systems, piecewise) and a literal `[m  n]` are left alone; the
 * literal already renders square, which is the whole point of converting to it.
 *
 * `aboutCombinations` is computed over the WHOLE question by
 * {@link mentionsCombinations}, not per field, because the sentence that defines
 * `(n k)` as nCk is usually in the stem while the usage is anywhere.
 */
export function toBracketMatrices(value: string, aboutCombinations: boolean): string {
  MATRIX_ENV_RE.lastIndex = 0;
  return value.replace(MATRIX_ENV_RE, (whole, kind: string, cells: string) => {
    if (kind !== "p") return whole;
    if (aboutCombinations && !cells.includes("&")) return whole;
    return `\\begin{bmatrix}${cells}\\end{bmatrix}`;
  });
}
