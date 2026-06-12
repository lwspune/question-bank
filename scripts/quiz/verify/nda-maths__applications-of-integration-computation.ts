/**
 * NDA Maths · Applications of Integration · practiceSet + selfCheck MCQs (computation).
 * Hand-authored distractors, theme=computation. Every `correct` re-derived from the
 * notes _data — no notes errors found. The chapter shipped with only ~5 genuine
 * practiceSet/selfCheck atoms (the "MCQ-clean" harvest count conflated formula-piece
 * atoms), so 11 genuine practice items were authored into the notes _data to clear
 * the 12-floor — total 17 computation atoms.
 *
 * Distractors are real area mistakes: dropping the |·| so the area is negative,
 * wrong limits, off-by-a-shape-constant, doubling/halving a symmetric region,
 * x-axis vs y-axis confusion. One stem override (signed-area:practiceSet:2) turns
 * the open-form "positive or negative? give its value" prompt into a clean MCQ.
 *   npm run quiz:verify nda-maths__applications-of-integration-computation
 */
import type { VerifiedEntry } from "./nda-maths__probability";

const e = (atomKey: string, distractors: string[]): VerifiedEntry => ({ atomKey, distractors, theme: "computation" });
const f = (s: string) => `\\(${s}\\)`;

export const VERIFIED: VerifiedEntry[] = [
  // ── aoi-integral-as-signed-area ──
  // ∫₀² 3x² dx = 8
  e("aoi-integral-as-signed-area:practiceSet:0", [f("-8"), f("16"), f("12")]),
  // area under y=4 on [0,5] = 20
  e("aoi-integral-as-signed-area:practiceSet:1", [f("9"), f("40"), f("-20")]),
  // ∫₋₁⁰ x dx = -1/2 (below axis) — open-form prompt → MCQ via stem override
  {
    atomKey: "aoi-integral-as-signed-area:practiceSet:2",
    stem: "Evaluate \\(\\int_{-1}^{0} x\\,dx\\) (note \\(y=x\\) lies below the axis here).",
    correct: f("-\\tfrac{1}{2}"),
    distractors: [f("\\tfrac{1}{2}"), f("-1"), f("1")],
    theme: "computation",
  },
  // ∫₁² x² dx = 7/3
  e("aoi-integral-as-signed-area:practiceSet:3", [f("\\tfrac{8}{3}"), f("3"), f("\\tfrac{1}{3}")]),
  // ∫₀^π sin x dx = 2
  e("aoi-integral-as-signed-area:practiceSet:4", [f("0"), f("1"), f("-2")]),

  // ── aoi-area-under-curve ──
  // area cos x on [0, π/2] = 1
  e("aoi-area-under-curve:selfCheck:0", [f("0"), f("2"), f("\\tfrac{\\pi}{2}")]),
  // upper semicircle √(16-x²) = 8π
  e("aoi-area-under-curve:practiceSet:0", [f("16\\pi"), f("4\\pi"), f("8")]),
  // ∫₀⁴ √x dx = 16/3
  e("aoi-area-under-curve:practiceSet:1", [f("\\tfrac{8}{3}"), f("8"), f("\\tfrac{32}{3}")]),

  // ── aoi-below-axis-and-symmetry ──
  // geometric area x³ on [-2,2] = 8
  e("aoi-below-axis-and-symmetry:practiceSet:0", [f("0"), f("4"), f("16")]),
  // total area y=x on [-2,2] = 4
  e("aoi-below-axis-and-symmetry:practiceSet:1", [f("0"), f("2"), f("8")]),

  // ── aoi-modulus-and-linear-regions ──
  // |x|+|y|=1 diamond = 2
  e("aoi-modulus-and-linear-regions:practiceSet:0", [f("1"), f("4"), f("\\tfrac{1}{2}")]),
  // |x|≤2, |y|≤5 rectangle = 40
  e("aoi-modulus-and-linear-regions:practiceSet:1", [f("10"), f("20"), f("80")]),

  // ── aoi-parabola-latus-rectum-area ──
  // y²=4x cut by latus rectum = 8/3
  e("aoi-parabola-latus-rectum-area:practiceSet:0", [f("\\tfrac{4}{3}"), f("\\tfrac{16}{3}"), f("\\tfrac{2}{3}")]),

  // ── aoi-step-and-piecewise-area ──
  // y=[x] on [-1.8,-1.5] = 0.6
  e("aoi-step-and-piecewise-area:practiceSet:0", [f("0.3"), f("-0.6"), f("0.9")]),

  // ── aoi-top-minus-bottom ──
  // area y=2x-x², y=0 on [0,1] = 2/3
  e("aoi-top-minus-bottom:selfCheck:0", [f("\\tfrac{1}{3}"), f("1"), f("\\tfrac{1}{6}")]),
  // area between x² and x on [0,1] = 1/6
  e("aoi-top-minus-bottom:practiceSet:0", [f("-\\tfrac{1}{6}"), f("\\tfrac{1}{2}"), f("\\tfrac{1}{3}")]),

  // ── aoi-curve-and-line-region ──
  // area y²=2x and y=x = 2/3
  e("aoi-curve-and-line-region:practiceSet:0", [f("\\tfrac{1}{3}"), f("\\tfrac{4}{3}"), f("2")]),
];
