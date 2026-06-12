/**
 * NDA Maths · Quadratic Equations · practiceSet + selfCheck MCQs (computation).
 * Hand-authored distractors, theme=computation. Every `correct` re-derived from
 * the notes prompt — all 7 checked out, NO notes errors.
 * Distractors model the standard QE slips: sign of −b/a, discriminant sign,
 * Vieta sum/product swap, completing-the-square sign error.
 *
 * Two atoms have looksMcqClean=false in the JSON (the "Is …?" yes/no item and the
 * equal-magnitude item) — they ARE self-contained as written, so they ride with
 * plausible same-format distractors.
 *   npm run quiz:verify nda-maths__quadratic-equations-computation
 */
import type { VerifiedEntry } from "./nda-maths__probability";

const e = (atomKey: string, distractors: string[]): VerifiedEntry => ({ atomKey, distractors, theme: "computation" });
const f = (s: string) => `\\(${s}\\)`;

export const VERIFIED: VerifiedEntry[] = [
  // ── qe-what-is-a-quadratic ──
  // 3x(x-1)=2x+4 → 3x²-3x = 2x+4 → 3x²-5x-4=0
  e("qe-what-is-a-quadratic:practiceSet:0", [
    f("3x^2 - x - 4 = 0"),
    f("3x^2 - 5x + 4 = 0"),
    f("3x^2 + 5x - 4 = 0"),
  ]),
  // Is 2x+7=0 a quadratic? → No, linear (a=0)
  {
    atomKey: "qe-what-is-a-quadratic:practiceSet:1",
    stem: "Is \\(2x + 7 = 0\\) a quadratic equation?",
    distractors: [
      "Yes — it has degree \\(2\\).",
      "Yes — any polynomial equation is quadratic.",
      "Only if \\(x \\neq 0\\).",
    ],
    theme: "computation",
  },
  // roots 2 and -3, leading coeff 1 → x²-(2-3)x+(2·-3) = x²+x-6=0
  e("qe-what-is-a-quadratic:practiceSet:2", [
    f("x^2 - x - 6 = 0"),
    f("x^2 + x + 6 = 0"),
    f("x^2 + 5x + 6 = 0"),
  ]),

  // ── qe-solving-methods ──
  // x²-6x+7=0: (x-3)²=2 → x=3±√2
  e("qe-solving-methods:selfCheck:0", [
    f("x = -3 \\pm \\sqrt{2}"),
    f("x = 3 \\pm \\sqrt{7}"),
    f("x = 6 \\pm \\sqrt{2}"),
  ]),

  // ── qe-vieta-sum-product ──
  // x²-7x+12=0: sum = -(-7)/1 = 7, product = 12/1 = 12
  {
    atomKey: "qe-vieta-sum-product:practiceSet:0",
    stem: "For the roots of \\(x^2 - 7x + 12 = 0\\), what are the sum and product?",
    distractors: [
      "Sum \\(-7\\), product \\(12\\).",
      "Sum \\(7\\), product \\(-12\\).",
      "Sum \\(12\\), product \\(7\\).",
    ],
    theme: "computation",
  },
  // x²+bx+9=0, roots ±k (equal magnitude, opposite sign) ⇒ sum = -b = 0 ⇒ b=0
  {
    atomKey: "qe-vieta-sum-product:practiceSet:1",
    stem: "For what value of \\(b\\) are the roots of \\(x^2 + bx + 9 = 0\\) equal in magnitude but opposite in sign?",
    distractors: [f("b = 9"), f("b = -9"), f("b = 6")],
    theme: "computation",
  },

  // ── qe-symmetric-functions ──
  // x²-4x+1=0: s=4, p=1. New roots α²,β²: sum=s²-2p=14, product=p²=1 → x²-14x+1=0
  e("qe-symmetric-functions:selfCheck:0", [
    f("x^2 - 16x + 1 = 0"),
    f("x^2 - 14x + 2 = 0"),
    f("x^2 - 18x + 1 = 0"),
  ]),
];
