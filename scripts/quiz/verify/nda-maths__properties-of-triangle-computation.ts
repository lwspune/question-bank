/**
 * NDA Maths · Properties of Triangle · practiceSet MCQs (computation).
 * Hand-authored distractors, theme=computation. Every `correct` re-derived from
 * the triangle relations; distractors are tempting triangle mistakes (sine-rule
 * ratio inverted, cosine-rule wrong angle/sign, area sin↔cos, R=abc/4Δ vs Δ/s).
 *
 * Computation was below the 12-atom floor (the chapter had only 2 conceptual
 * practiceSet items), so 10 genuine practiceSet items were authored into the
 * notes _data (sine-rule ×2, cosine-rule ×2, area ×2, angles↔sides ×2,
 * incircle/circumcircle ×2) → 12 total. All keys verified below.
 *   npm run quiz:verify nda-maths__properties-of-triangle-computation
 */
import type { VerifiedEntry } from "./nda-maths__probability";

const e = (atomKey: string, distractors: string[]): VerifiedEntry => ({ atomKey, distractors, theme: "computation" });
const f = (s: string) => `\\(${s}\\)`;

export const VERIFIED: VerifiedEntry[] = [
  // ── pt-triangle-notation ──
  // A=90° ⇒ side a (opposite the right angle) is the hypotenuse
  e("pt-triangle-notation:practiceSet:0", [
    "\\(b\\) (opposite \\(B\\)).",
    "\\(c\\) (opposite \\(C\\)).",
    "The shortest side.",
  ]),
  // sides 5,7,8 ⇒ largest angle faces the longest side (8)
  e("pt-triangle-notation:practiceSet:1", [
    "The angle opposite \\(5\\).",
    "The angle opposite \\(7\\).",
    "All three angles are equal.",
  ]),

  // ── pt-sine-rule ──
  // A=30°, B=45°, a=8 ⇒ b = a·sinB/sinA = 8·(1/√2)/(1/2) = 8√2
  e("pt-sine-rule:practiceSet:0", [f("4\\sqrt2"), f("8"), f("16")]),
  // B=90°, b=10 ⇒ b/sinB = 2R = 10 ⇒ R = 5
  e("pt-sine-rule:practiceSet:1", [f("10"), f("\\dfrac{5}{2}"), f("20")]),

  // ── pt-cosine-rule ──
  // sides 3,5,7 ⇒ largest angle = 120° (cos = -1/2)
  e("pt-cosine-rule:practiceSet:0", [f("60^\\circ"), f("90^\\circ"), f("150^\\circ")]),
  // b=4, c=6, A=60° ⇒ a² = 16+36-24 = 28 ⇒ a = 2√7
  e("pt-cosine-rule:practiceSet:1", [f("2\\sqrt{13}"), f("\\sqrt{52}+1"), f("10")]),

  // ── pt-area-of-triangle ──
  // a=6, b=8, C=30° ⇒ Δ = ½·6·8·sin30° = 12
  e("pt-area-of-triangle:practiceSet:0", [f("24"), f("12\\sqrt3"), f("48")]),
  // Δ=30, r=2, Δ=rs ⇒ s = 15
  e("pt-area-of-triangle:practiceSet:1", [f("60"), f("\\dfrac{15}{2}"), f("30")]),

  // ── pt-angles-sides-relations ──
  // angles in AP ⇒ middle angle = 60°
  e("pt-angles-sides-relations:practiceSet:0", [f("90^\\circ"), f("45^\\circ"), f("30^\\circ")]),
  // a/sinA = 12, A=30° ⇒ a = 12·sin30° = 6
  e("pt-angles-sides-relations:practiceSet:1", [f("12"), f("24"), f("\\dfrac{1}{2}")]),

  // ── pt-incircle-circumcircle ──
  // sides 3,4,5 ⇒ Δ=6, R = abc/4Δ = 60/24 = 5/2
  e("pt-incircle-circumcircle:practiceSet:0", [f("5"), f("1"), f("\\dfrac{60}{4}")]),
  // sides 3,4,5 ⇒ s=6, Δ=6, r = Δ/s = 1
  e("pt-incircle-circumcircle:practiceSet:1", [f("\\dfrac{5}{2}"), f("6"), f("2")]),
];
