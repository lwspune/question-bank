/**
 * NDA Maths · Indefinite Integration · practiceSet MCQs (computation).
 * Hand-authored distractors, theme=computation. Every `correct` re-derived from
 * the notes; distractors are the genuine integration mistakes (forgot +C is
 * implicit so not testable as a value here; off-by-one on the power rule, sign
 * on log/substitution, missing chain factor, by-parts ILATE slip).
 *
 * The chapter had ZERO practiceSet/selfCheck items at harvest, so 12 fresh
 * practiceSets were authored into the notes _data (computational concepts only)
 * to lift the computation theme to ≥12. Keys = <conceptSlug>:practiceSet:<i>.
 *   npm run quiz:verify nda-maths__indefinite-integration-computation
 */
import type { VerifiedEntry } from "./nda-maths__probability";

const e = (atomKey: string, distractors: string[]): VerifiedEntry => ({ atomKey, distractors, theme: "computation" });
const f = (s: string) => `\\(${s}\\)`;

export const VERIFIED: VerifiedEntry[] = [
  // ── standard-formula-table ──
  // ∫x⁴dx = x⁵/5 + C  (off-by-one: x⁴/4; derivative 4x³; missing /5)
  e("standard-formula-table:practiceSet:0", [f("\\dfrac{x^4}{4} + C"), f("4x^3 + C"), f("x^5 + C")]),
  // ∫(1/x)dx = ln|x| + C  (power-rule trap x⁰/0; -1/x²; 1/x²)
  e("standard-formula-table:practiceSet:1", [f("\\dfrac{x^0}{0} + C"), f("-\\dfrac{1}{x^2} + C"), f("\\dfrac{1}{x^2} + C")]),
  // ∫3ˣdx = 3ˣ/ln3 + C  (divide by 3; ×ln3 = derivative; 3ˣ⁺¹/(x+1))
  e("standard-formula-table:practiceSet:2", [f("\\dfrac{3^x}{3} + C"), f("3^x\\ln 3 + C"), f("\\dfrac{3^{x+1}}{x+1} + C")]),

  // ── complete-the-square-arctan ──
  // ∫dx/(x²+25) = (1/5)tan⁻¹(x/5) + C  (no 1/5; k=25; sin⁻¹)
  e("complete-the-square-arctan:practiceSet:0", [
    f("\\tan^{-1}\\!\\Big(\\dfrac{x}{5}\\Big) + C"),
    f("\\dfrac{1}{25}\\tan^{-1}\\!\\Big(\\dfrac{x}{25}\\Big) + C"),
    f("\\dfrac{1}{5}\\sin^{-1}\\!\\Big(\\dfrac{x}{5}\\Big) + C"),
  ]),
  // ∫dx/(x²+2x+5) = (1/2)tan⁻¹((x+1)/2) + C  (no shift; no 1/2; wrong k)
  e("complete-the-square-arctan:practiceSet:1", [
    f("\\dfrac{1}{2}\\tan^{-1}\\!\\Big(\\dfrac{x}{2}\\Big) + C"),
    f("\\tan^{-1}\\!\\Big(\\dfrac{x+1}{2}\\Big) + C"),
    f("\\dfrac{1}{5}\\tan^{-1}\\!\\Big(\\dfrac{x+1}{5}\\Big) + C"),
  ]),

  // ── sub-reverse-chain-rule ──
  // ∫cos(5x)dx = (1/5)sin(5x) + C  (no 1/5; ×5 = derivative; -sign)
  e("sub-reverse-chain-rule:practiceSet:0", [
    f("\\sin(5x) + C"),
    f("5\\sin(5x) + C"),
    f("-\\dfrac{1}{5}\\sin(5x) + C"),
  ]),
  // ∫(2x+1)⁷dx = (2x+1)⁸/16 + C  (no /2 chain factor → /8; off-by-one ⁷/16; /2 only)
  e("sub-reverse-chain-rule:practiceSet:1", [
    f("\\dfrac{(2x+1)^8}{8} + C"),
    f("\\dfrac{(2x+1)^7}{16} + C"),
    f("\\dfrac{(2x+1)^8}{2} + C"),
  ]),

  // ── sub-fprime-over-f ──
  // ∫tan x dx = ln|sec x| + C  (sec²x; -ln|sec x|; (1/2)tan²x)
  e("sub-fprime-over-f:practiceSet:0", [
    f("\\sec^2 x + C"),
    f("-\\ln|\\sec x| + C"),
    f("\\dfrac{1}{2}\\tan^2 x + C"),
  ]),
  // ∫2x/(x²+1)dx = ln(x²+1) + C  (½ln; arctan; 2/(x²+1))
  e("sub-fprime-over-f:practiceSet:1", [
    f("\\dfrac{1}{2}\\ln(x^2+1) + C"),
    f("2\\tan^{-1}x + C"),
    f("\\dfrac{2}{x^2+1} + C"),
  ]),

  // ── byparts-formula-liate ──
  // ∫x cos x dx = x sin x + cos x + C  (sign flip; -; chose u=cos)
  e("byparts-formula-liate:practiceSet:0", [
    f("x\\sin x - \\cos x + C"),
    f("-x\\sin x + \\cos x + C"),
    f("\\dfrac{x^2}{2}\\sin x + C"),
  ]),
  // ∫x e^{2x} dx = (e^{2x}/2)(x - 1/2) + C  (no /2 on v; full e^{2x}(x-1); +1/2)
  e("byparts-formula-liate:practiceSet:1", [
    f("\\dfrac{e^{2x}}{2}\\Big(x-1\\Big) + C"),
    f("e^{2x}\\Big(x-\\dfrac12\\Big) + C"),
    f("\\dfrac{e^{2x}}{2}\\Big(x+\\dfrac12\\Big) + C"),
  ]),

  // ── byparts-logarithms ──
  // ∫ln x dx = x ln x - x + C  (1/x = derivative; (ln x)²/2; x ln x)
  e("byparts-logarithms:practiceSet:0", [
    f("\\dfrac{1}{x} + C"),
    f("\\dfrac{(\\ln x)^2}{2} + C"),
    f("x\\ln x + C"),
  ]),
];
