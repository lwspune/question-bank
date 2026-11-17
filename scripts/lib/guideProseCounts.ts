/**
 * Pure core of `npm run guide:prose` (SUGGESTIONS 2026-09-14, "Guide prose that
 * abbreviates a chapter name went stale"). The guide TABLES are asserted
 * against the live bank; a count written inside a sentence ("Vocab 316",
 * "Indian Geography Economy chapter (81 q)") is not, and drifts on every ingest.
 *
 * This finds every such count and the probe tests it against every count the
 * guide's subject could mean. A miss is a CANDIDATE, never a verdict: a guide
 * also states per-paper rates, per-year slices and sums this cannot see.
 */

export type ProseCount = { n: number; index: number; perPaper: boolean };

/** "316 q", "81 questions", "1,320 PYQs", "a 63-PYQ chapter". Years are skipped. */
const COUNT = /(?<![\d.])(\d{1,3}(?:,\d{3})*|\d+)(?:\s|-)(?:q|qs|questions?|PYQs?)\b/g;

/** A rate, not a total: "4 questions a paper", "2 q per sitting". */
const PER_PAPER = /^\s*(?:a|per|each|every)\s+(?:paper|sitting|shift|year|exam)\b/;

export function extractProseCounts(text: string): ProseCount[] {
  const out: ProseCount[] = [];
  for (const m of text.matchAll(COUNT)) {
    const n = Number(m[1].replace(/,/g, ""));
    if (n >= 1990 && n <= 2099) continue;
    const after = text.slice(m.index! + m[0].length, m.index! + m[0].length + 30);
    out.push({ n, index: m.index!, perPaper: PER_PAPER.test(after) });
  }
  return out;
}
