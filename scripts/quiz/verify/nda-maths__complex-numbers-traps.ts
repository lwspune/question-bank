/**
 * NDA Maths · Complex Numbers · COMMON-TRAPS theme — "spot the value/mistake" MCQs.
 * One per misconception callout authored into the notes (each concept's only trap
 * → index 0). The first distractor in each is the warned mistake.
 *   npm run quiz:verify nda-maths__complex-numbers-traps
 */
import type { VerifiedEntry } from "./nda-maths__probability";

const f = (s: string) => `\\(${s}\\)`;

export const VERIFIED: VerifiedEntry[] = [
  {
    // real-part-0 vs imaginary-part-0 swap
    atomKey: "cn-conjugate-and-real-imaginary:trap:0",
    stem: "For what real \\(x\\) is \\(z=(x-2)+3i\\) purely imaginary?",
    correct: f("x=2"),
    distractors: [f("x=-3"), f("x=3"), f("x=0")],
    theme: "trap",
  },
  {
    // zz̄ = |z|², not |z|
    atomKey: "cn-modulus-properties:trap:0",
    stem: "For \\(z=3+4i\\), what is \\(z\\bar z\\)?",
    correct: f("25"),
    distractors: [f("5"), f("7"), f("-7")],
    theme: "trap",
  },
  {
    // |z₁+z₂| ≠ |z₁|+|z₂|
    atomKey: "cn-modulus-properties:trap:1",
    stem: "If \\(z_1=3\\) and \\(z_2=4i\\), what is \\(|z_1+z_2|\\)?",
    correct: f("5"),
    distractors: [f("7"), f("12"), f("1")],
    theme: "trap",
  },
  {
    // argument quadrant
    atomKey: "cn-argument-polar:trap:0",
    stem: "What is the principal argument of \\(-1+i\\)?",
    correct: f("\\tfrac{3\\pi}4"),
    distractors: [f("-\\tfrac\\pi4"), f("\\tfrac\\pi4"), f("-\\tfrac{3\\pi}4")],
    theme: "trap",
  },
  {
    // i^{4k+r}: remainder 2 → -1, not i
    atomKey: "cn-powers-of-i:trap:0",
    stem: "What is \\(i^{102}\\)?",
    correct: f("-1"),
    distractors: [f("i"), f("1"), f("-i")],
    theme: "trap",
  },
  {
    // ω² = ω̄ ≠ -ω
    atomKey: "cn-cube-roots-properties:trap:0",
    stem: "For a non-real cube root of unity \\(\\omega\\), simplify \\(1+\\omega^2\\).",
    correct: f("-\\omega"),
    distractors: [f("1-\\omega"), f("-1-\\omega"), f("\\omega")],
    theme: "trap",
  },
];
