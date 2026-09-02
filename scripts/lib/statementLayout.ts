/**
 * Statement-list layout — detect a run-on statement stem, and lay it out.
 *
 * A statement-list question must print each numbered claim on its own line:
 *
 *   Consider the following statements:
 *   1. The null set is a subset of every set.
 *   2. Every set is a subset of itself.
 *   Which of the above statements are correct?
 *
 * Both renderers already honour a real newline — the Word exporter splits on
 * `\n` into `TextRun({break:1})` (docxBuilder `mathRuns`) and the web renderer
 * wraps text in `white-space: pre-wrap` (KatexRenderer) — so a run-on stem is a
 * DATA defect, not a render one. Proof: rows whose stems already carry newlines
 * print correctly today, alongside rows that do not.
 *
 * Pure and side-effect free so the repair can be tested without a database.
 *
 * WHY THIS IS NOT A ONE-LINE REGEX. Every guard below was forced by live bank
 * data, and dropping any of them corrupts real questions:
 *
 *  - A GFM pipe table's cells carry labels (`| A. sin x | 1. one |`). 521 of the
 *    899 rows matching a bare label pattern bank-wide are Match Lists, where the
 *    labels are ALREADY laid out as a table. Those must be left alone.
 *  - Math zones contain label-shaped text — `\(1\cdot5\)`, `\([.]\)`,
 *    `\(z_{1}.\ z_{2}\)`. Masking first is what stops a split inside math.
 *  - A statement can END with a numeral: "...can never be less than 2. Which of
 *    the above...". Scanning each label only AFTER the previous one takes the
 *    real label rather than the trailing numeral.
 *  - A sentence can end in a number: "...power set has 1024. Which of...".
 *    Requiring the run to ASCEND from the first label, and requiring whitespace
 *    on BOTH sides of the token, keeps that out.
 */
import { parseTableBlocks } from "../../src/components/math/parseTableBlocks";
import { maskMathZones } from "../../src/components/math/parseLatex";

export type LabelStyle = "numeric" | "paren" | "roman" | "word";

/** One statement label. `index` is an offset into the math-MASKED string. */
export type StatementLabel = { token: string; index: number; style: LabelStyle };

/**
 * Label runs, in preference order. The first style that yields the most labels
 * wins, so a stem using `1.` is never re-read as an `I.` run.
 *
 * There is deliberately NO `A.`/`B.` alpha style. It was measured against every
 * live candidate in the bank and drove ZERO of them, while prose supplies the
 * shape readily ("Let the answer be A. The reason is B."), so carrying it was
 * pure false-positive risk for no yield.
 */
const SEQUENCES: { style: LabelStyle; tokens: string[] }[] = [
  { style: "numeric", tokens: ["1.", "2.", "3.", "4.", "5.", "6.", "7.", "8.", "9."] },
  { style: "paren", tokens: ["(1)", "(2)", "(3)", "(4)", "(5)", "(6)"] },
  { style: "roman", tokens: ["I.", "II.", "III.", "IV.", "V.", "VI."] },
];

/**
 * The LITERAL-WORD label — "Statement I:", "Statement-2.", "Assertion (A):".
 *
 * THE SINGLE DEFINITION, shared with the P1 gate. `paper-text.ts` used to keep
 * its own copy, and the two drifted in the way that matters: the gate could
 * DETECT this shape while `SEQUENCES` — dot- and paren-delimited only — could
 * not repair it. Measured 2026-09-02, that left 327 PUBLIC rows flagged by a
 * BLOCKING rule with no automated way out. Exported as a SOURCE string rather
 * than a RegExp so each caller builds its own object: a shared `g`-flagged
 * regex carries `lastIndex` state between callers.
 *
 * The label and its delimiter are BOTH required, so the prose word "statements"
 * ("which of the following statements") cannot match. The delimiter is also
 * what stops "Statement I is true because..." matching mid-sentence.
 */
export const WORD_LABEL_SOURCE =
  "(?:Statement\\s*[-–—]?\\s*(?:[IVX]+|\\d+)|Assertion\\s*\\((?:A)\\)|Reason\\s*\\((?:R)\\))\\s*[:.]";

/**
 * Word labels, in printed order.
 *
 * Deliberately NOT subject to `LEAD_IN_END`: that guard exists to separate a
 * list from an enumeration embedded in a sentence, which is a hazard for bare
 * numerals only. "Statement II:" cannot occur as ordinary prose, which is the
 * same reason the 2026-09-02 exam allow-list was needed for the numeral styles
 * and is not needed here. It is also why a stem may OPEN with the label.
 */
function scanWordLabels(masked: string): StatementLabel[] {
  const re = new RegExp(WORD_LABEL_SOURCE, "gi");
  const found: StatementLabel[] = [];
  for (const m of masked.matchAll(re)) {
    found.push({ token: m[0], index: m.index ?? 0, style: "word" });
  }
  return found;
}

/**
 * What may sit immediately before the FIRST label of a real list: a sentence
 * end, a colon, or a line start.
 *
 * This is the guard that separates a list from an ENUMERATION EMBEDDED IN A
 * SENTENCE, and every case below is live bank data that the tool got wrong
 * without it:
 *   "...as the train (1) approaches the station and then (2) recedes..."
 *   "...the radius at the point (1) is 2 cm and at the point (2) is 1 cm..."
 *   "Figure 1. electron probability density Figure 2. wave function..."
 * Breaking those strands a dangling "and then", or leaves a line reading only
 * "Figure". A genuine list is introduced — by ":" ("Following statements are
 * given:"), by "?" ("which of the following are correct?"), or by a full stop.
 */
const LEAD_IN_END = /[:;.?\n]$/;

/**
 * The question that closes a statement list. Matched ONLY after the last label,
 * because the same words routinely open one ("Which of the following are
 * correct? 1. ... 2. ...") and breaking there would be wrong.
 */
const CLOSER =
  /(?:Which\s+(?:of\s+(?:the\s+above|these|the\s+statements|the\s+following)\b|are\s+correct\b|statements?\s+(?:is|are)\b)|In\s+the\s+light\s+of\s+the\s+above|(?:Select|Choose)\s+the\s+correct\s+answer)/i;

/** A label needs whitespace (or a string edge) before it and whitespace after. */
function boundedAt(s: string, token: string, i: number): boolean {
  const beforeOk = i === 0 || /\s/.test(s[i - 1]!);
  const after = s[i + token.length];
  return beforeOk && after !== undefined && /\s/.test(after);
}

/** Scan one style, requiring each label to appear AFTER the previous one. */
function scanStyle(masked: string, tokens: string[], style: LabelStyle): StatementLabel[] {
  const found: StatementLabel[] = [];
  let from = 0;
  for (const token of tokens) {
    let i = masked.indexOf(token, from);
    while (i !== -1 && !boundedAt(masked, token, i)) i = masked.indexOf(token, i + 1);
    if (i === -1) break; // the run has ended; a gap means this is not a list
    found.push({ token, index: i, style });
    from = i + token.length;
  }
  return found;
}

function labelsInMasked(masked: string): StatementLabel[] {
  let best: StatementLabel[] = [];
  for (const { style, tokens } of SEQUENCES) {
    const got = scanStyle(masked, tokens, style);
    if (got.length > best.length) best = got; // strict >, so ties keep the earlier style
  }
  // The word style wins a TIE, unlike the numeral styles which tie to the
  // earlier one: a word label is self-identifying, so where both scans find the
  // same count the word reading is the safer of the two.
  const words = scanWordLabels(masked);
  if (words.length >= 2 && words.length >= best.length) return words;
  // One label is a numeral in a sentence, not a list.
  if (best.length < 2) return [];
  // The first label must be INTRODUCED; otherwise this is an enumeration inside
  // a sentence, not a list. Later labels are not checked — a statement legitimately
  // ends mid-clause before the next one.
  const before = masked.slice(0, best[0]!.index).replace(/[ \t]+$/, "");
  if (before !== "" && !LEAD_IN_END.test(before)) return [];
  return best;
}

/**
 * A MATCHING question linearised into prose — "Match the following with correct
 * response. (1) Phenotype / (2) Genotype / ..." — where the numbered items are a
 * column of pairs, not claims to evaluate.
 *
 * Anchored on the verb + its object so the ordinary word "match" inside a
 * statement ("the sets match exactly") cannot trigger it.
 *
 * Also catches a bare "Column I / Column II" table linearised into prose, which
 * carries no "Match" verb at all. That shape is the worst case for this tool:
 * splitting at the Column-II numerals glues each Column-II entry to the NEXT
 * Column-I entry, so the output ASSERTS pairings the question exists to test —
 * including, in the live NDA Chemistry rows, the correct one.
 */
const MATCHING =
  /\bMatch\s+(?:the\s+(?:following|column)|List)|\bColumn\s*[-–—]?\s*(?:I{1,2}\b|[12]\b)/i;

/**
 * The labels of a statement list, or `[]` if the text is not one.
 *
 * Returns `[]` for a stem carrying a real GFM table, so a Match List can never
 * be mistaken for a run-on statement list by any caller.
 */
export function findStatementLabels(text: string): StatementLabel[] {
  if (parseTableBlocks(text).some((b) => b.kind === "table")) return [];
  // A matching question is P2's defect, not P1's. Without this, the paper-text
  // gate BLOCKS a linearised match-list that `layoutStatements` refuses to
  // repair — a deadlock with no automated way out.
  if (MATCHING.test(text)) return [];
  return labelsInMasked(maskMathZones(text).masked);
}


export type LayoutResult = {
  text: string;
  changed: boolean;
  /**
   * Set when the stem was deliberately left alone.
   *  - "table"    a real GFM table already lays the labels out.
   *  - "matching" a match-the-following linearised into prose. Line breaks would
   *    strand its ' / ' separators and would NOT fix the real defect: it needs to
   *    become a table (rule P2-matchlist-not-a-table). Half-fixing it here would
   *    make that repair harder to spot, so it is reported instead.
   */
  skipped?: "table" | "matching";
};

/**
 * Put each statement, and the closing question, on its own line.
 *
 * IDEMPOTENT: a label already at the start of a line is left untouched, so
 * re-running never stacks blank lines. Math is restored verbatim.
 */
export function layoutStatements(input: string): LayoutResult {
  if (parseTableBlocks(input).some((b) => b.kind === "table")) {
    return { text: input, changed: false, skipped: "table" };
  }
  if (MATCHING.test(input)) return { text: input, changed: false, skipped: "matching" };

  const { masked, unmask } = maskMathZones(input);
  const labels = labelsInMasked(masked);
  if (labels.length < 2) return { text: input, changed: false };

  const breaks = labels.map((l) => l.index);

  const last = labels[labels.length - 1]!;
  const tailFrom = last.index + last.token.length;
  const m = CLOSER.exec(masked.slice(tailFrom));
  if (m) breaks.push(tailFrom + m.index);

  // Apply from the END so earlier offsets stay valid.
  let out = masked;
  for (const pos of [...breaks].sort((a, b) => b - a)) {
    // Where the label VISIBLY begins. A label match starts at the word itself,
    // so for "**Statement I:**" it starts after the "**" — breaking there would
    // split the markup AND would fail to notice a label that is already at the
    // start of its line behind that markup. Found on a live row by the repair's
    // hash guard: a whitespace-only check cannot see it, because stripping
    // whitespace makes "**Statement" and "**\nStatement" identical.
    let visible = pos;
    while (visible > 0 && (out[visible - 1] === "*" || out[visible - 1] === "_")) visible -= 1;
    let start = visible;
    while (start > 0 && (out[start - 1] === " " || out[start - 1] === "\t")) start -= 1;
    if (start === 0) continue; // already opens the stem
    if (out[start - 1] === "\n") continue; // already on its own line
    out = out.slice(0, start) + "\n" + out.slice(visible);
  }

  const text = unmask(out);
  return { text, changed: text !== input };
}
