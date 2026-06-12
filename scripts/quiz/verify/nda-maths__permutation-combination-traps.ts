/**
 * NDA Maths · Permutation & Combination · COMMON-TRAPS theme — "spot the
 * mistake" MCQs. One per misconception callout authored into the notes (key
 * <conceptSlug>:trap:0, the warned mistake = the first/tempting distractor).
 *   npm run quiz:verify nda-maths__permutation-combination-traps
 */
import type { VerifiedEntry } from "./nda-maths__probability";

const f = (s: string) => `\\(${s}\\)`;

export const VERIFIED: VerifiedEntry[] = [
  {
    atomKey: "pc-fundamental-counting:trap:0",
    stem: "In how many ways can a chairperson and a secretary (two distinct roles) be chosen from 6 people?",
    correct: f("30"),
    distractors: [f("15"), f("12"), f("720")], // 15 = treating it as a committee (6C2); 12 = 6+6; 720 = 6!
    theme: "trap",
  },
  {
    atomKey: "pc-factorial-properties:trap:0",
    stem: "What is the value of \\(0!\\)?",
    correct: f("1"),
    distractors: [f("0"), f("\\text{undefined}"), f("-1")], // 0! = 0 is the classic mistake
    theme: "trap",
  },
  {
    atomKey: "pc-permutations-basics:trap:0",
    stem: "How many distinct arrangements are there of the letters of MATHEMATICS (M, A, T each appear twice)?",
    correct: f("\\dfrac{11!}{2!\\,2!\\,2!}"),
    distractors: [f("11!"), f("\\dfrac{11!}{2!}"), f("\\dfrac{11!}{3!}")], // 11! ignores the repeats
    theme: "trap",
  },
  {
    atomKey: "pc-combinations-basics:trap:0",
    stem: "How many subsets does a set of \\(n\\) elements have?",
    correct: f("2^n"),
    distractors: [f("2^n - 1"), f("n!"), f("n^2")], // 2^n - 1 forgets the empty set
    theme: "trap",
  },
  {
    atomKey: "pc-selection-constraints:trap:0",
    stem: "A team of 5 is chosen from 6 programmers and 4 typists with at least one typist. How many ways?",
    correct: f("246"),
    distractors: [f("252"), f("6"), f("240")], // 252 forgets to subtract the no-typist case
    theme: "trap",
  },
  {
    atomKey: "pc-points-and-polygons:trap:0",
    stem: "How many triangles can be formed from 8 points, of which 3 are collinear?",
    correct: f("55"),
    distractors: [f("56"), f("53"), f("35")], // 56 = 8C3 forgets the collinear correction
    theme: "trap",
  },
];
