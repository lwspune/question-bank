/**
 * Marks patterns for Maharashtra board papers on /question-papers (2026-10-10).
 *
 * One pattern per paper FAMILY, read from the printed papers themselves:
 *   - HSC Physics + Chemistry, HSC Mathematics: the printed General
 *     Instructions on page 1 ("Q. No. 3 to Q. No. 14 ... Two marks each.
 *     (Attempt any Eight)"); the lane's own grammars (scripts/mh-hsc-12-pyq/
 *     paper/lib.ts) agree on every section and mark.
 *   - HSC Geography: the bracketed marks on each question ("Q. 2 ... (Any
 *     FOUR) [12]", "(A) ... (5)"), the same on all six papers.
 *   - SSC Class 10: each group's printed marks and "Any N" (text layer for
 *     2016-2022; the 2023-2026 papers are scans, read from the page image).
 *
 * The builder applies a pattern only where it fits: mhManifest refuses a paper
 * whose questions fall outside its blocks, or whose best possible score is not
 * the printed maximum. So a wrong pattern is a REFUSAL, never a wrong page.
 */
import type { MarksPattern } from "../../src/lib/questionPapers/mhPattern";

const HSC_SECTIONS = (d: number) => [
  { key: "A", title: "Section A", from: 1, to: 2 },
  { key: "B", title: "Section B", from: 3, to: 14 },
  { key: "C", title: "Section C", from: 15, to: 26 },
  { key: "D", title: "Section D", from: 27, to: d },
];

export const MH_PATTERNS = {
  /** HSC Physics and Chemistry: 10 MCQs, 8 one-markers, then any 8 + any 8 + any 3. */
  hscPhysChem: {
    maxMarks: 70,
    minutes: 180,
    sections: HSC_SECTIONS(31),
    blocks: [
      { ref: "Q1", each: 1 },
      { ref: "Q2", each: 1 },
      { from: 3, to: 14, each: 2, attempt: 8 },
      { from: 15, to: 26, each: 3, attempt: 8 },
      { from: 27, to: 31, each: 4, attempt: 3 },
    ],
  },
  /** HSC Mathematics: 8 two-mark MCQs, 4 one-markers, then any 8 + any 8 + any 5. */
  hscMaths: {
    maxMarks: 80,
    minutes: 180,
    sections: HSC_SECTIONS(34),
    blocks: [
      { ref: "Q1", each: 2 },
      { ref: "Q2", each: 1 },
      { from: 3, to: 14, each: 2, attempt: 8 },
      { from: 15, to: 26, each: 3, attempt: 8 },
      { from: 27, to: 34, each: 4, attempt: 5 },
    ],
  },
  /** HSC Geography: Q.1 [20] in four groups of five, then the bracketed groups. */
  hscGeography: {
    maxMarks: 80,
    minutes: 180,
    blocks: [
      { ref: "Q1(A)", each: 1 },
      { ref: "Q1(B)", each: 1 },
      { ref: "Q1(C)", each: 1 },
      { ref: "Q1(D)", each: 1 },
      { ref: "Q2", each: 3, attempt: 4 },
      { ref: "Q3", each: 3, attempt: 3 },
      { ref: "Q4(A)", each: 1, attempt: 6 },
      { ref: "Q4(B)", each: 1 },
      { ref: "Q5", each: 4, attempt: 3 },
      { ref: "Q6(A)", each: 1 },
      { ref: "Q6(B)", each: 2, attempt: 2 },
      { ref: "Q7", each: 8, attempt: 1 },
    ],
  },
  /** SSC Algebra and Geometry, 2016-2018: five "attempt any" questions. */
  sscMathsOld: {
    maxMarks: 40,
    minutes: 120,
    blocks: [
      { ref: "Q1", each: 1, attempt: 5 },
      { ref: "Q2", each: 2, attempt: 4 },
      { ref: "Q3", each: 3, attempt: 3 },
      { ref: "Q4", each: 4, attempt: 2 },
      { ref: "Q5", each: 5, attempt: 2 },
    ],
  },
  /** SSC Algebra and Geometry, 2019. */
  sscMaths2019: {
    maxMarks: 40,
    minutes: 120,
    blocks: [
      { ref: "Q1(A)", each: 1, attempt: 4 },
      { ref: "Q1(B)", each: 2, attempt: 2 },
      { ref: "Q2(A)", each: 1 },
      { ref: "Q2(B)", each: 2, attempt: 2 },
      { ref: "Q3(A)", each: 2, attempt: 2 },
      { ref: "Q3(B)", each: 2, attempt: 2 },
      { ref: "Q4", each: 3, attempt: 3 },
      { ref: "Q5", each: 4, attempt: 1 },
      { ref: "Q6", each: 3, attempt: 1 },
    ],
  },
  /** SSC Algebra and Geometry, 2020 on. */
  sscMathsNew: {
    maxMarks: 40,
    minutes: 120,
    blocks: [
      { ref: "Q1(A)", each: 1 },
      { ref: "Q1(B)", each: 1 },
      { ref: "Q2(A)", each: 2, attempt: 2 },
      { ref: "Q2(B)", each: 2, attempt: 4 },
      { ref: "Q3(A)", each: 3, attempt: 1 },
      { ref: "Q3(B)", each: 3, attempt: 2 },
      { ref: "Q4", each: 4, attempt: 2 },
      { ref: "Q5", each: 3, attempt: 1 },
    ],
  },
  /** SSC Science and Technology I and II, 2016-2019. Q.1 (A) is printed in
   *  sub-groups ((1) fill in, (2) true or false, ...) of one-mark items. */
  sscScienceOld: {
    maxMarks: 40,
    minutes: 120,
    blocks: [
      { ref: "Q1(A)", each: 1, leaf: true },
      { ref: "Q1(B)", each: 1 },
      { ref: "Q2", each: 2, attempt: 5 },
      { ref: "Q3", each: 3, attempt: 5 },
      { ref: "Q4", each: 5, attempt: 1 },
    ],
  },
  /** SSC Science and Technology I and II, 2020 on. */
  sscScienceNew: {
    maxMarks: 40,
    minutes: 120,
    blocks: [
      { ref: "Q1(A)", each: 1 },
      { ref: "Q1(B)", each: 1 },
      { ref: "Q2(A)", each: 2, attempt: 2 },
      { ref: "Q2(B)", each: 2, attempt: 3 },
      { ref: "Q3", each: 3, attempt: 5 },
      { ref: "Q4", each: 5, attempt: 1 },
    ],
  },
  /** SSC Geography, 2020 on (Q.6 is (A) OR (B)). */
  sscGeography: {
    maxMarks: 40,
    minutes: 120,
    blocks: [
      { ref: "Q1", each: 1 },
      { ref: "Q2", each: 1 },
      { ref: "Q3", each: 1, attempt: 4 },
      { ref: "Q4(A)", each: 1, attempt: 4 },
      { ref: "Q4(B)", each: 1, attempt: 4 },
      { ref: "Q5", each: 3, attempt: 2 },
      { ref: "Q6", each: 6, or: true },
      { ref: "Q7", each: 4, attempt: 2 },
    ],
  },
  /** SSC Geography 2024: Q.3 is short notes, any two of three [4]. */
  sscGeography2024: {
    maxMarks: 40,
    minutes: 120,
    blocks: [
      { ref: "Q1", each: 1 },
      { ref: "Q2", each: 1 },
      { ref: "Q3", each: 2, attempt: 2 },
      { ref: "Q4(A)", each: 1, attempt: 4 },
      { ref: "Q4(B)", each: 1, attempt: 4 },
      { ref: "Q5", each: 3, attempt: 2 },
      { ref: "Q6", each: 6, or: true },
      { ref: "Q7", each: 4, attempt: 2 },
    ],
  },
  /** SSC Geography 2022: the printed paper has no Q.2; Q.1 is in two groups. */
  sscGeography2022: {
    maxMarks: 40,
    minutes: 120,
    blocks: [
      { ref: "Q1(A)", each: 1 },
      { ref: "Q1(B)", each: 1 },
      { ref: "Q3", each: 1, attempt: 4 },
      { ref: "Q4(A)", each: 1, attempt: 4 },
      { ref: "Q4(B)", each: 1, attempt: 4 },
      { ref: "Q5", each: 3, attempt: 2 },
      { ref: "Q6", each: 6, or: true },
      { ref: "Q7", each: 4, attempt: 2 },
    ],
  },
  /** SSC History and Political Science (one paper; Q.6-9 are Political Science). */
  sscHistory: {
    maxMarks: 40,
    minutes: 120,
    blocks: [
      { ref: "Q1(A)", each: 1 },
      { ref: "Q1(B)", each: 1 },
      { ref: "Q2(A)", each: 2, attempt: 2 },
      { ref: "Q2(B)", each: 2, attempt: 2 },
      { ref: "Q3", each: 2, attempt: 2 },
      { ref: "Q4", marks: [1, 1, 2] },
      { ref: "Q5", each: 3, attempt: 2 },
      { ref: "Q6", each: 1 },
      { ref: "Q7", each: 2, attempt: 2 },
      { ref: "Q8(A)", each: 2, attempt: 1 },
      { ref: "Q8(B)", each: 2, attempt: 1 },
      { ref: "Q9", each: 2, attempt: 1 },
    ],
  },
} satisfies Record<string, MarksPattern>;

export type PatternName = keyof typeof MH_PATTERNS;

/** The pattern for an SSC paper, by its data id ("alg-2016", "sci2-2024"). */
export function sscPatternFor(id: string): PatternName | null {
  const m = /^([a-z0-9]+)-(\d{4})$/.exec(id);
  if (!m) return null;
  const [, subj, y] = m;
  const year = Number(y);
  if (subj === "alg" || subj === "geo") return year <= 2018 ? "sscMathsOld" : year === 2019 ? "sscMaths2019" : "sscMathsNew";
  if (subj === "sci1" || subj === "sci2") return year <= 2019 ? "sscScienceOld" : "sscScienceNew";
  if (subj === "geog") return year === 2022 ? "sscGeography2022" : year === 2024 ? "sscGeography2024" : "sscGeography";
  if (subj === "hist") return "sscHistory";
  return null;
}
