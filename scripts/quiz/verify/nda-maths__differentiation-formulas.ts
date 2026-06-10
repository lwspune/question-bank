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

  // ── Bucket 2 enrichment 2026-06-10 (first principles + inverse-trig collapses) ──
  { atomKey: "diff-via-limit-definition:formula:0", stem: "Which is the derivative from first principles, \\(f'(c)\\)?", distractors: [f("f'(c) = \\lim_{h\\to 0}\\dfrac{f(c+h)+f(c)}{h}"), f("f'(c) = \\lim_{h\\to 0}\\dfrac{f(c)-f(c+h)}{h}"), f("f'(c) = \\lim_{h\\to 0}\\dfrac{f(c+h)-f(c)}{c}")], theme: "formula" },
  { atomKey: "diff-inverse-trig-simplify:formula:0", stem: "Which inverse-trig identity is correct?", distractors: [f("\\tan^{-1}\\dfrac{2x}{1-x^2} = \\tan^{-1}x"), f("\\tan^{-1}\\dfrac{2x}{1-x^2} = 2\\sin^{-1}x"), f("\\tan^{-1}\\dfrac{2x}{1-x^2} = \\tfrac12\\tan^{-1}x")], theme: "formula" },
  { atomKey: "diff-inverse-trig-simplify:formula:1", stem: "Which inverse-trig identity is correct?", distractors: [f("\\sin^{-1}\\dfrac{2x}{1+x^2} = 2\\sin^{-1}x"), f("\\sin^{-1}\\dfrac{2x}{1+x^2} = \\tan^{-1}x"), f("\\sin^{-1}\\dfrac{2x}{1+x^2} = 2\\cos^{-1}x")], theme: "formula" },
  { atomKey: "diff-inverse-trig-simplify:formula:2", stem: "Which inverse-trig identity is correct?", distractors: [f("\\cos^{-1}\\dfrac{1-x^2}{1+x^2} = 2\\cos^{-1}x"), f("\\cos^{-1}\\dfrac{1-x^2}{1+x^2} = \\tan^{-1}x"), f("\\cos^{-1}\\dfrac{1-x^2}{1+x^2} = \\pi - 2\\tan^{-1}x")], theme: "formula" },
  { atomKey: "diff-inverse-trig-simplify:formula:3", stem: "Which identity is correct?", distractors: [f("\\cos^{-1}(\\sin x) = x - \\dfrac{\\pi}{2}"), f("\\cos^{-1}(\\sin x) = \\dfrac{\\pi}{2} + x"), f("\\cos^{-1}(\\sin x) = \\pi - x")], theme: "formula" },
  { atomKey: "diff-inverse-trig-simplify:formula:4", stem: "Which inverse-trig difference identity is correct?", distractors: [f("\\tan^{-1}\\dfrac{a-b}{1+ab} = \\tan^{-1}a + \\tan^{-1}b"), f("\\tan^{-1}\\dfrac{a-b}{1-ab} = \\tan^{-1}a - \\tan^{-1}b"), f("\\tan^{-1}\\dfrac{a-b}{1+ab} = \\tan^{-1}b - \\tan^{-1}a")], theme: "formula" },
];
