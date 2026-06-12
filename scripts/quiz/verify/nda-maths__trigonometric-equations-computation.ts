/**
 * NDA Maths · Trigonometric Equations · practiceSet MCQs (computation).
 * Hand-authored distractors, theme=computation. Every `correct` re-derived from
 * the general-solution formulas; no notes errors found.
 *
 * Trig-Equations is a small (33 q), formula/recall-heavy chapter — it shipped
 * with only 2 practiceSet items, so the notes were TOPPED UP with 10 genuine
 * self-contained practice problems (general solutions of sin/cos/tan equations
 * and counting solutions in an interval) to clear the 12-item floor. The added
 * problems improve the student notes too.
 *
 * Distractors are real general-solution mistakes: missing the (-1)^n on sine,
 * using n\pi instead of 2n\pi on cosine, dropping the \pm, period/scale errors
 * in counting.
 *   npm run quiz:verify nda-maths__trigonometric-equations-computation
 */
import type { VerifiedEntry } from "./nda-maths__probability";

const e = (atomKey: string, distractors: string[]): VerifiedEntry => ({ atomKey, distractors, theme: "computation" });
const f = (s: string) => `\\(${s}\\)`;

export const VERIFIED: VerifiedEntry[] = [
  // ── te-general-solution-formulas (general solutions) ──
  // tan θ = 1 → n\pi + \pi/4
  e("te-general-solution-formulas:practiceSet:0", [
    f("\\theta = 2n\\pi + \\tfrac{\\pi}{4}"),
    f("\\theta = n\\pi + (-1)^n\\tfrac{\\pi}{4}"),
    f("\\theta = 2n\\pi \\pm \\tfrac{\\pi}{4}"),
  ]),
  // sin θ = 0 → n\pi
  e("te-general-solution-formulas:practiceSet:1", [
    f("\\theta = (2n+1)\\tfrac{\\pi}{2}"),
    f("\\theta = 2n\\pi"),
    f("\\theta = 2n\\pi \\pm \\pi"),
  ]),
  // sin θ = 1/2 → n\pi + (-1)^n \pi/6
  e("te-general-solution-formulas:practiceSet:2", [
    f("\\theta = 2n\\pi \\pm \\tfrac{\\pi}{6}"),
    f("\\theta = n\\pi + \\tfrac{\\pi}{6}"),
    f("\\theta = n\\pi + (-1)^n\\tfrac{\\pi}{3}"),
  ]),
  // cos θ = -1/2 → 2n\pi ± 2\pi/3
  e("te-general-solution-formulas:practiceSet:3", [
    f("\\theta = 2n\\pi \\pm \\tfrac{\\pi}{3}"),
    f("\\theta = n\\pi + (-1)^n\\tfrac{2\\pi}{3}"),
    f("\\theta = 2n\\pi + \\tfrac{2\\pi}{3}"),
  ]),
  // tan θ = √3 → n\pi + \pi/3
  e("te-general-solution-formulas:practiceSet:4", [
    f("\\theta = 2n\\pi + \\tfrac{\\pi}{3}"),
    f("\\theta = n\\pi + \\tfrac{\\pi}{6}"),
    f("\\theta = 2n\\pi \\pm \\tfrac{\\pi}{3}"),
  ]),
  // cos θ = 0 → (2n+1)\pi/2
  e("te-general-solution-formulas:practiceSet:5", [
    f("\\theta = n\\pi"),
    f("\\theta = 2n\\pi \\pm \\tfrac{\\pi}{2}"),
    f("\\theta = n\\pi + \\tfrac{\\pi}{2}"),
  ]),

  // ── te-counting-solutions (general solutions) ──
  // sin x = 1/2 on [0,2π) → 2
  e("te-counting-solutions:practiceSet:0", [f("1"), f("3"), f("4")]),
  // tan x = 1 on [0,2π) → 2
  e("te-counting-solutions:practiceSet:1", [f("1"), f("4"), f("3")]),
  // sin 2x = 1/2 on [0,2π) → 4
  e("te-counting-solutions:practiceSet:2", [f("2"), f("8"), f("3")]),
  // cos 3x = 1 on [0,2π) → 3
  e("te-counting-solutions:practiceSet:3", [f("1"), f("2"), f("6")]),

  // ── te-range-and-existence (general solutions) ──
  // integers k with sin x = k/2 → 5
  e("te-range-and-existence:practiceSet:0", [f("4"), f("3"), f("7")]),
  // 2 sin x = 3 → No solution
  e("te-range-and-existence:practiceSet:1", [
    "Yes, exactly one",
    "Yes, two per period",
    "Yes, infinitely many",
  ]),
];
