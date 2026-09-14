// Pure core for the sibling-series fidelity / matching pass — no I/O, TDD in
// tests/nda-gat-fidelity.test.ts.
//
// WHAT THIS COMPUTES, and why both halves matter.
//
// The four UPSC series hold the SAME 150 questions in a different ORDER. Given a
// terse transcription of a sibling series and the full transcription of the base
// series, this pairs them up and produces, per variant question:
//
//   base   — which base question it is, so a Series D solution document can be
//            built in Series D's own order;
//   labels — which base option LETTER each of its letters carries, so that
//            series' answer key falls out of the base's once the base is
//            derived.
//
// And the verdict, which is the FIDELITY CHECK: the variant transcription is an
// INDEPENDENT second reading of the same printed options. Where the two readings
// disagree, one of them is wrong and a human goes back to the page. That is the
// control the sibling CDS English corpus did not have when it shipped 19 wrong
// keys — a mis-slotted option produces a question that reads perfectly, passes
// every structural gate, and makes a blind derivation confirm the wrong letter.
//
// ## PERMUTED and OPTION_MISMATCH are deliberately NOT resolved here
//
// A label map that is a bijection but not the identity means either (a) UPSC
// really does permute options between series, or (b) one of the two
// transcriptions mis-slotted an option. Those need opposite responses and
// NOTHING IN THE DATA distinguishes them — only the printed page does. So both
// are reported and neither is smoothed over.
//
// Measured on this project's NDA Mathematics 2026-II paper, across 358 matched
// questions: **0 PERMUTED**. On the first Set A page checked by hand here, Set
// A's Q21-30 are Set D's Q1-10 with the same option order. So the expectation is
// identity throughout — which is exactly what makes a PERMUTED row worth
// reading, rather than a shrug.
//
// ## Why the normalisation is imported rather than rewritten
//
// `normText`, `sim`, `scorePair` and `labelMap` come from
// scripts/nda-pyq/match-variant, whose rules were each earned from a measured
// failure on a real booklet (series B and C independently failed to match the
// SAME nine base questions, which is what identified the base-side normalisation
// as the common factor rather than either transcription). Restating them would
// mean re-earning them. That module guards its own main() behind
// `require.main === module`, so importing it runs nothing.
//
// What IS added here is a GAT pre-pass: the base carries
// `\(\underline{\text{both}}\)` where the terse pass writes `both`, and the
// imported fold leaves a stray "underline" token behind. It is additive and
// changes no shipped behaviour.
import {
  labelMap as baseLabelMap,
  normText as baseNormText,
  scorePair as baseScorePair,
} from "../nda-pyq/match-variant";
import type { GatTQ } from "./lib";

export type VariantQ = {
  number: number;
  stem: string;
  options: { label: string; text: string }[];
};

export type Verdict = "MATCH" | "PERMUTED" | "OPTION_MISMATCH" | "AMBIGUOUS" | "UNMATCHED";

export type FidelityRow = {
  variant: number;
  base: number | null;
  score: number;
  optionScore: number;
  /** variant label -> base label. Null when the option sets do not correspond. */
  labels: Record<string, string> | null;
  verdict: Verdict;
  note?: string;
};

/**
 * A pairing must clear this to be trusted. Below it the row is AMBIGUOUS and a
 * human reads the page — never a silent best-effort pairing, because a wrong
 * pairing puts the wrong answer beside the wrong question in a document a
 * student reads.
 */
export const MATCH_FLOOR = 0.55;

/**
 * Strip the bank's emphasis markup before the shared fold sees it.
 *
 * `\(\underline{\text{both}}\)` is how Part A stores the word a question turns
 * on; the terse sibling pass writes `both`. The imported normaliser expands
 * `\text{...}` but NOT `\underline` or `\textit`, either of which would survive
 * as a bare word — so without this the two readings differ by a token on exactly
 * the questions where the stem is the tie-breaker.
 *
 * `\textit` is not hypothetical: the bank stores an italic-and-underlined target
 * as `\(\underline{\textit{word}}\)`, and Q16-20 of this very paper are printed
 * in italics. A test pins that form, and it FAILED before this handled it.
 */
export function gatNormText(s: string): string {
  return baseNormText(foldUnits(stripEmphasis(s)));
}

/**
 * Fold notation the base writes as LaTeX and the terse pass writes as a word.
 *
 * MEASURED, not anticipated. On the first real run this pipeline matched 133 of
 * 134 Series D questions and refused exactly one — D-Q76 against base Q61 —
 * whose stems are byte-identical and whose options are `\(45^\circ\)` against
 * `45 degrees`. The imported fold reduces those to `45circ` and `45degrees`, so
 * the option score was 0, the total fell under the floor, and the pair was
 * correctly REFUSED rather than guessed.
 *
 * The fix belongs HERE and not in the threshold. Lowering a floor that is
 * protecting 133 other questions in order to admit one is how a wrong pairing
 * gets in; teaching the normaliser a notation it genuinely did not know is not.
 *
 * Kept deliberately narrow — degree notation only. Every extra alias is a chance
 * to collapse two options that should stay distinct, and a test pins that the
 * four angles of that very question remain four different strings after the
 * fold.
 */
function foldUnits(s: string): string {
  return (s ?? "")
    .replace(/\^\s*\\circ/g, " degrees ")
    .replace(/\\circ/g, " degrees ")
    .replace(/°/g, " degrees ")
    .replace(/\bdegree\b/gi, "degrees");
}

/**
 * Pre-fold every text field a scorer will read.
 *
 * The imported `scorePair`/`labelMap` call `normText` on option text THEMSELVES,
 * so a fold applied only to `gatNormText` would never reach the options — which
 * are 60% of the score and the entire basis of the label map. Applying it at the
 * boundary is what makes the two paths agree.
 */
function prep<T extends { stem: string; options: { label: string; text: string }[]; context?: string }>(
  x: T
): T {
  const fold = (s: string) => foldUnits(stripEmphasis(s));
  return {
    ...x,
    stem: fold(x.stem),
    ...(x.context !== undefined ? { context: fold(x.context) } : {}),
    options: x.options.map((o) => ({ ...o, text: fold(o.text) })),
  };
}

function scoreOf(v: VariantQ, q: GatTQ): { score: number; optionScore: number } {
  return baseScorePair(prep(v), prep(q));
}

/**
 * `\underline{X}` / `\textit{X}` / `\emph{X}` -> `X`, repeatedly so a nested pair
 * unwraps. Three passes because the deepest real form is
 * `\underline{\textit{word}}`.
 */
function stripEmphasis(s: string): string {
  let t = s ?? "";
  for (let i = 0; i < 3; i++) {
    t = t.replace(/\\(?:underline|textit|emph)\s*\{((?:[^{}]|\{[^{}]*\})*)\}/g, "$1");
  }
  return t;
}

const IDENTITY = { A: "A", B: "B", C: "C", D: "D" } as const;

function isIdentity(m: Record<string, string>): boolean {
  return (Object.keys(IDENTITY) as (keyof typeof IDENTITY)[]).every((k) => m[k] === IDENTITY[k]);
}

/**
 * Pair every variant question with at most one base question, and vice versa.
 *
 * GREEDY BY DESCENDING SCORE, not in variant order. Taking each variant's best
 * partner in turn lets an early, weak claim steal a base question from a later,
 * stronger one — and on this paper dozens of questions share an option set
 * exactly (`I only / II only / Both I and II / Neither I nor II`), so weak
 * claims are common rather than exotic. Sorting first means the confident
 * pairings are settled before the doubtful ones get to choose.
 */
export function matchVariant(variants: VariantQ[], bases: GatTQ[]): FidelityRow[] {
  type Cand = { v: VariantQ; q: GatTQ; score: number; optionScore: number };
  const cands: Cand[] = [];
  for (const v of variants) {
    for (const q of bases) {
      const { score, optionScore } = scoreOf(v, q);
      if (score >= MATCH_FLOOR) cands.push({ v, q, score, optionScore });
    }
  }
  cands.sort((a, b) => b.score - a.score || a.v.number - b.v.number);

  const takenV = new Set<number>();
  const takenQ = new Set<number>();
  const paired = new Map<number, Cand>();
  for (const c of cands) {
    if (takenV.has(c.v.number) || takenQ.has(c.q.number)) continue;
    takenV.add(c.v.number);
    takenQ.add(c.q.number);
    paired.set(c.v.number, c);
  }

  const rows: FidelityRow[] = [];
  for (const v of variants) {
    const c = paired.get(v.number);
    if (!c) {
      rows.push({
        variant: v.number,
        base: null,
        score: 0,
        optionScore: 0,
        labels: null,
        verdict: "UNMATCHED",
        note: "no base question scored above the floor, or its best partner was claimed by a stronger match",
      });
      continue;
    }
    const labels = baseLabelMap(prep(v), prep(c.q));
    let verdict: Verdict;
    let note: string | undefined;
    if (!labels) {
      verdict = "OPTION_MISMATCH";
      note =
        "the two readings of this question's four options do not correspond one-to-one — read the printed page in BOTH booklets";
    } else if (isIdentity(labels)) {
      verdict = "MATCH";
    } else {
      verdict = "PERMUTED";
      note =
        "same four options at different letters — either the series permutes options or one transcription mis-slotted one; only the page tells them apart";
    }
    rows.push({
      variant: v.number,
      base: c.q.number,
      score: Number(c.score.toFixed(3)),
      optionScore: Number(c.optionScore.toFixed(3)),
      labels,
      verdict,
      note,
    });
  }
  return rows.sort((a, b) => a.variant - b.variant);
}

export type FidelitySummary = {
  counts: Record<Verdict, number>;
  /** Variant question numbers whose row a human must read against the page. */
  needsReading: number[];
  /** Base question numbers that no variant question claimed. */
  unclaimedBase: number[];
};

export function summarise(rows: FidelityRow[], baseNumbers: number[]): FidelitySummary {
  const counts: Record<Verdict, number> = {
    MATCH: 0,
    PERMUTED: 0,
    OPTION_MISMATCH: 0,
    AMBIGUOUS: 0,
    UNMATCHED: 0,
  };
  for (const r of rows) counts[r.verdict] += 1;
  const claimed = new Set(rows.map((r) => r.base).filter((n): n is number => n !== null));
  return {
    counts,
    needsReading: rows.filter((r) => r.verdict !== "MATCH").map((r) => r.variant),
    unclaimedBase: baseNumbers.filter((n) => !claimed.has(n)),
  };
}
