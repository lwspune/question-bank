/**
 * NDA Maths · Lines (coordinate geometry) · the "Common Traps" theme.
 *
 * Trap atoms are SEEDS (placeholder stem + empty key) — each entry authors the
 * FULL question via `stem` + `correct` overrides, engineered so the concept's
 * classic misconception is the most TEMPTING wrong option (the FIRST distractor).
 * Theme stays 'trap'. Run:
 *   npm run quiz:verify nda-maths__lines-traps
 *
 * 13 distinct traps → one 13-question "Common Traps" quiz. The misconception in
 * each is the trap taught by the matching notes `traps` callout (added 2026-06-10).
 */
import type { VerifiedEntry } from "./nda-maths__probability";

const f = (s: string) => `\\(${s}\\)`;

export const VERIFIED: VerifiedEntry[] = [
  // ── Equation & slope ──
  { atomKey: "lines-slope-and-forms:trap:0", stem: "Find the slope of the line through \\((1,2)\\) and \\((4,8)\\).", correct: f("2"), distractors: [f("\\dfrac12"), f("-2"), f("6")] }, // m=(8−2)/(4−1)=2; trap inverts → (4−1)/(8−2)=1/2
  { atomKey: "lines-intercept-form:trap:0", stem: "Find the x-intercept of the line \\(2x+5y=10\\).", correct: f("5"), distractors: [f("2"), f("10"), f("\\dfrac52")] }, // x-int = 10/2 = 5; trap reads off the coefficient → 2
  { atomKey: "lines-family-and-concurrency:trap:0", stem: "For what \\(\\lambda\\) does \\((x+y-2)+\\lambda(x-y)=0\\) pass through \\((3,1)\\)?", correct: f("-1"), distractors: [f("-2"), f("1"), f("2")] }, // (3+1−2)+λ(3−1)=2+2λ=0 → λ=−1; trap drops the −2 constant: (3+1)+2λ=0 → λ=−2
  { atomKey: "lines-image-reflection:trap:0", stem: "The foot of the perpendicular from \\(P(1,1)\\) to a line is \\(F(3,2)\\). Find the image of \\(P\\) in the line.", correct: f("(5,3)"), distractors: [f("(3,2)"), f("(4,3)"), f("(2,1)")] }, // image = 2F−P = (5,3); trap reports the foot F=(3,2) as the image

  // ── Distance, section & locus ──
  { atomKey: "lines-distance-formulas:trap:0", stem: "Find the distance from \\((0,0)\\) to the line \\(3x+4y-10=0\\).", correct: f("2"), distractors: [f("\\dfrac25"), f("10"), f("\\dfrac{10}{7}")] }, // |−10|/√(9+16)=10/5=2; trap divides by a²+b²=25 → 2/5
  { atomKey: "lines-section-formula:trap:0", stem: "Find the point dividing \\(A(1,1)\\) and \\(B(7,7)\\) internally in the ratio \\(2:1\\).", correct: f("(5,5)"), distractors: [f("(3,3)"), f("(4,4)"), f("(6,6)")] }, // m=2 pairs with B: (2·7+1·1)/3=5 → (5,5); trap swaps weights → (3,3)
  { atomKey: "lines-locus:trap:0", stem: "Find the locus of points equidistant from \\(A(1,0)\\) and \\(B(5,0)\\).", correct: f("x=3"), distractors: [f("(3,0)"), f("y=0"), f("x+y=3")] }, // perpendicular bisector → x=3 (a line); trap gives the midpoint (3,0), a point not a locus line

  // ── Angle, parallel & perpendicular ──
  { atomKey: "lines-angle-between:trap:0", stem: "Find the acute angle between lines of slopes \\(1\\) and \\(\\dfrac13\\).", correct: f("\\tan^{-1}\\dfrac12"), distractors: [f("\\tan^{-1}2"), f("\\tan^{-1}\\dfrac13"), f("45^\\circ")] }, // tan θ=|(1−1/3)/(1+1/3)|=1/2; trap inverts the formula → tan θ=2
  { atomKey: "lines-parallel-perpendicular:trap:0", stem: "A line is perpendicular to a line of slope \\(\\dfrac23\\). What is its slope?", correct: f("-\\dfrac32"), distractors: [f("\\dfrac32"), f("-\\dfrac23"), f("\\dfrac23")] }, // negative reciprocal = −3/2; trap drops the minus → 3/2

  // ── Triangles, quadrilaterals & polygons ──
  { atomKey: "lines-area-of-triangle:trap:0", stem: "Find the area of the triangle with vertices \\((0,0),(4,0),(0,6)\\).", correct: f("12"), distractors: [f("24"), f("6"), f("48")] }, // ½|4·6|=12; trap omits the ½ → 24
  { atomKey: "lines-triangle-centres:trap:0", stem: "Find the centroid of the triangle with vertices \\((1,2),(3,4),(5,0)\\).", correct: f("(3,2)"), distractors: [f("\\left(\\dfrac92,3\\right)"), f("(9,6)"), f("(3,3)")] }, // average → (3,2); trap divides by 2 instead of 3 → (9/2,3)
  { atomKey: "lines-triangle-construction:trap:0", stem: "The midpoint of \\(BC\\) is \\(M(4,2)\\) and \\(B=(1,3)\\). Find \\(C\\).", correct: f("(7,1)"), distractors: [f("(3,-1)"), f("(5,5)"), f("(2.5,2.5)")] }, // C=2M−B=(7,1); trap uses M−B=(3,−1)
  { atomKey: "lines-quadrilaterals:trap:0", stem: "Three consecutive vertices of parallelogram \\(ABCD\\) are \\(A(1,2),B(4,3),C(6,6)\\). Find \\(D\\).", correct: f("(3,5)"), distractors: [f("(-1,-1)"), f("(9,7)"), f("(11,11)")] }, // D=A+C−B=(3,5); trap pairs adjacent vertices A+B−C=(−1,−1)
];
