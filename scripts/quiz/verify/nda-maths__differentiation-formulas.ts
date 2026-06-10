/**
 * NDA Maths · Differentiation · FORMULA-recall MCQs (the 2 needs_review bundle
 * pieces; the other 10 formula atoms are auto-ready). Full-equation distractors
 * built from the canonical product/quotient-rule mistakes.
 *   npm run quiz:verify nda-maths__differentiation-formulas
 */
import type { VerifiedEntry } from "./nda-maths__probability";

const f = (s: string) => `\\(${s}\\)`;

export const VERIFIED: VerifiedEntry[] = [
  { atomKey: "diff-product-quotient:formula:0", stem: "Which is the PRODUCT rule, \\((uv)'\\)?", distractors: [f("(uv)' = u'v'"), f("(uv)' = u'v - uv'"), f("(uv)' = uv' - u'v")], theme: "formula" },
  { atomKey: "diff-product-quotient:formula:1", stem: "Which is the QUOTIENT rule, \\(\\left(\\dfrac{u}{v}\\right)'\\)?", distractors: [f("\\left(\\dfrac{u}{v}\\right)' = \\dfrac{uv' - u'v}{v^2}"), f("\\left(\\dfrac{u}{v}\\right)' = \\dfrac{u'v - uv'}{v}"), f("\\left(\\dfrac{u}{v}\\right)' = \\dfrac{u'}{v'}")], theme: "formula" },
];
