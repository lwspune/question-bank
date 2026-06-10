/**
 * NDA Maths · Sequence & Series · COMMON-TRAPS theme — "spot the mistake" MCQs.
 * 9 from the new misconception callouts authored into the notes (the first
 * distractor in each is the warned mistake) + the pre-existing trap seeds below.
 *   npm run quiz:verify nda-maths__sequence-series-traps
 */
import type { VerifiedEntry } from "./nda-maths__probability";

const f = (s: string) => `\\(${s}\\)`;

export const VERIFIED: VerifiedEntry[] = [
  {
    atomKey: "ap-nth-term-and-sum:trap:0",
    stem: "Find the 7th term of the AP \\(4, 9, 14, \\ldots\\)",
    correct: f("34"),
    distractors: [f("39"), f("35"), f("30")],
    theme: "trap",
  },
  {
    atomKey: "ap-nth-term-and-sum:trap:1",
    stem: "Find the sum of the first 10 terms of the AP \\(3, 7, 11, 15, \\ldots\\)",
    correct: f("210"),
    distractors: [f("230"), f("215"), f("420")],
    theme: "trap",
  },
  {
    atomKey: "ap-means-symmetric-terms:trap:0",
    stem: "Three arithmetic means are inserted between \\(4\\) and \\(20\\). What is the common difference of the resulting AP?",
    correct: f("4"),
    distractors: [f("\\dfrac{16}{3}"), f("\\dfrac{16}{5}"), f("8")],
    theme: "trap",
  },
  {
    atomKey: "gp-nth-term-and-mean:trap:0",
    stem: "Find the 5th term of the GP \\(3, 6, 12, 24, \\ldots\\)",
    correct: f("48"),
    distractors: [f("96"), f("60"), f("24")],
    theme: "trap",
  },
  {
    atomKey: "gp-sum-infinite:trap:1",
    stem: "Find the sum to infinity of \\(9 + 3 + 1 + \\tfrac13 + \\cdots\\)",
    correct: f("\\dfrac{27}{2}"),
    distractors: [f("-\\dfrac{27}{2}"), f("\\dfrac{2}{27}"), f("3")],
    theme: "trap",
  },
  {
    atomKey: "hp-definition:trap:0",
    stem: "Three numbers are in HP. The first is \\(2\\) and the third is \\(6\\). What is the middle term?",
    correct: f("3"),
    distractors: [f("4"), f("\\sqrt{12}"), f("\\dfrac{1}{4}")],
    theme: "trap",
  },
  {
    atomKey: "three-means-am-gm-hm:trap:1",
    stem: "Find the harmonic mean (HM) of \\(3\\) and \\(6\\).",
    correct: f("4"),
    distractors: [f("\\dfrac{1}{4}"), f("\\dfrac{9}{2}"), f("\\sqrt{18}")],
    theme: "trap",
  },
  {
    atomKey: "three-means-am-gm-hm:trap:2",
    stem: "Two positive numbers have arithmetic mean \\(9\\) and geometric mean \\(6\\). What is their harmonic mean?",
    correct: f("4"),
    distractors: [f("\\dfrac{27}{2}"), f("\\dfrac{15}{2}"), f("\\dfrac{3}{2}")],
    theme: "trap",
  },
  {
    atomKey: "power-sums:trap:0",
    stem: "Find \\(\\displaystyle\\sum_{k=1}^{4} k^2 = 1^2 + 2^2 + 3^2 + 4^2\\).",
    correct: f("30"),
    distractors: [f("10"), f("100"), f("20")],
    theme: "trap",
  },
  // ── pre-existing trap seeds (authored from their hints; three-means:trap:0 skipped — overlaps trap:1/2) ──
  {
    atomKey: "ap-properties-condition:trap:0",
    stem: "If \\(a, b, c\\) are in AP, which of the following is ALWAYS also in AP?",
    correct: f("a+5,\\; b+5,\\; c+5"),
    distractors: [f("a^2,\\; b^2,\\; c^2"), f("\\tfrac1a,\\; \\tfrac1b,\\; \\tfrac1c"), f("2^a,\\; 2^b,\\; 2^c")],
    theme: "trap",
  },
  {
    atomKey: "gp-sum-finite:trap:0",
    stem: "Is the sequence \\(0.3,\\; 0.33,\\; 0.333,\\; \\ldots\\) a geometric progression?",
    correct: "No — the ratio of consecutive terms is not constant",
    distractors: ["Yes, with \\(r = 1.1\\)", "Yes, with \\(r = 0.1\\)", "Yes, with \\(r = 10\\)"],
    theme: "trap",
  },
  {
    atomKey: "gp-sum-infinite:trap:0",
    stem: "What is the sum to infinity of \\(3 + 6 + 12 + 24 + \\cdots\\)?",
    correct: "It does not exist (the series diverges, \\(|r| = 2 \\ge 1\\))",
    distractors: [f("-3"), f("3"), f("6")],
    theme: "trap",
  },
  {
    atomKey: "self-referential-continued-fractions:trap:0",
    stem: "Find the value of \\(x = \\sqrt{2 + \\sqrt{2 + \\sqrt{2 + \\cdots}}}\\).",
    correct: f("2"),
    distractors: [f("\\sqrt2"), f("1"), f("4")],
    theme: "trap",
  },
];
