// Pure assembly + validation for the NDA Mathematics PYQ ingestion.
//
// This module is deliberately THIN. It RE-EXPORTS the scripts/cds-maths pure
// core verbatim rather than restating it, which is the scripts/mh-sb-9 pattern
// ("whose lib.ts re-exports the stateboard pure core VERBATIM"). The two papers
// are the same animal: a scanned maths booklet with no text layer, no answer
// key, shared-stimulus sets and a per-question chapter decision. Restating 500
// lines would mean applying every future fix twice, and this repo has already
// paid for that drift once.
//
// The cds-maths core is proven over 20 papers / 1,996 questions and is covered
// by tests/cds-maths-lib.test.ts. Everything it exports is used here unchanged;
// the two places NDA diverges are handled by OPTIONS on those same functions
// (`strictSubtopics`, `sourceRowOffset`), not by forked bodies:
//
//   1. SUBTOPIC IS HARD, NOT SOFT. cds-maths is still extending its catalog in
//      rounds, so an unlisted subtopic there is a work item. NDA Mathematics'
//      taxonomy is CLOSED — 31 chapters / 111 subtopics, through a bank-wide
//      cleanup pass — so an unlisted subtopic is a near-miss that commitStaged
//      will AUTO-CREATE, splitting a chapter's corpus in two with no error.
//   2. source_row RUNS 2..121, matching the 18 sittings already in the bank.
//
// Anything genuinely NEW to this pipeline lives below the re-exports.
export {
  type Option,
  type TQ,
  type Band,
  type Derivation,
  type Verdict,
  type CrosstabRow,
  normalizeQuestions,
  findLatexImbalance,
  mergeBands,
  validateCatalog,
  normalizeDerivations,
  crosstab,
  buildRecords,
  validateRows,
  validateSets,
} from "../cds-maths/lib";

import type { Derivation } from "../cds-maths/lib";

/** One entry of an external answer key, once one exists. */
export type KeyEntry = { number: number; answer: string };

export type KeyVerdict = "AGREE" | "DISAGREE" | "NO_KEY_ENTRY" | "NO_DERIVATION";
export type KeyDiffRow = {
  number: number;
  verdict: KeyVerdict;
  derived?: string | null;
  key?: string;
  confidence?: string;
  /** The deriver's own evidence — what a human reads when adjudicating. */
  reasoning?: string;
};

/**
 * Diff a single blind derivation pass against an external answer key.
 *
 * IT NEVER PICKS A WINNER, and that is the whole design. On the sibling CDS
 * Mathematics corpus, of five rows where a blind pass disagreed with a
 * prep-house key, FOUR were the key's error and ZERO were ours — so a script
 * that "applied the key" would have introduced four wrong answers into a corpus
 * that was already right. Output is a work list for a human.
 *
 * Ordering of the output is by CONFIDENCE ascending within DISAGREE, because
 * that is the order a human should read it: on UPSC papers measured here, a
 * MED-confidence derivation's runner-up is repeatedly what the key turns out to
 * say, while HIGH ran 1,337/1,358. A disagreement on a HIGH row is therefore
 * far more likely to be the KEY's defect and deserves the closest reading.
 */
export function diffAgainstKey(
  derivations: Derivation[],
  key: KeyEntry[],
  qFrom: number,
  qTo: number
): KeyDiffRow[] {
  const byNum = new Map(derivations.map((d) => [d.number, d]));
  const keyByNum = new Map(key.map((k) => [k.number, (k.answer ?? "").trim().toUpperCase()]));
  const rows: KeyDiffRow[] = [];

  for (let n = qFrom; n <= qTo; n++) {
    const d = byNum.get(n);
    const k = keyByNum.get(n);
    if (!d) {
      rows.push({ number: n, verdict: "NO_DERIVATION", key: k });
      continue;
    }
    const derived = d.answer == null ? null : d.answer.trim().toUpperCase();
    if (!k) {
      rows.push({ number: n, verdict: "NO_KEY_ENTRY", derived, confidence: d.confidence });
      continue;
    }
    rows.push({
      number: n,
      verdict: derived === k ? "AGREE" : "DISAGREE",
      derived,
      key: k,
      confidence: d.confidence,
      reasoning: d.reasoning,
    });
  }
  return rows;
}

const CONF_RANK: Record<string, number> = { HIGH: 0, MED: 1, LOW: 2 };

/** Disagreements first, HIGH-confidence ones at the top. See diffAgainstKey. */
export function sortForReview(rows: KeyDiffRow[]): KeyDiffRow[] {
  const weight = (v: KeyVerdict) =>
    v === "DISAGREE" ? 0 : v === "NO_DERIVATION" ? 1 : v === "NO_KEY_ENTRY" ? 2 : 3;
  return [...rows].sort((a, b) => {
    const w = weight(a.verdict) - weight(b.verdict);
    if (w !== 0) return w;
    const c =
      (CONF_RANK[(a.confidence ?? "").toUpperCase()] ?? 9) -
      (CONF_RANK[(b.confidence ?? "").toUpperCase()] ?? 9);
    if (c !== 0) return c;
    return a.number - b.number;
  });
}
