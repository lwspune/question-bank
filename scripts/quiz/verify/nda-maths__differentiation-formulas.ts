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

  // ── auto-atom fixes (2026-06-11): concrete stems + tight permutation distractors ──
  {
    atomKey: "diff-chain-rule:formula:0",
    stem: "For \\(y = f(g(x))\\), the chain rule gives \\(\\dfrac{d}{dx}f(g(x)) = \\):",
    distractors: [
      f("f'(g(x))"),
      f("f'(g(x))\\cdot g(x)"),
      f("f'(x)\\cdot g'(x)"),
    ],
    theme: "formula",
  },
  {
    atomKey: "diff-derivative-wrt-function:formula:0",
    stem: "If \\(u=u(x)\\) and \\(v=v(x)\\), the derivative of \\(u\\) with respect to \\(v\\) is \\(\\dfrac{du}{dv} = \\):",
    distractors: [
      f("\\frac{dv/dx}{du/dx}"),
      f("\\frac{du}{dx}\\cdot\\frac{dv}{dx}"),
      f("\\frac{du}{dx}"),
    ],
    theme: "formula",
  },
  {
    atomKey: "diff-first-principles:formula:0",
    stem: "By first principles, \\(f'(x)\\) is defined as:",
    distractors: [
      f("\\lim_{h\\to 0}\\frac{f(x+h)+f(x)}{h}"),
      f("\\lim_{h\\to 0}\\frac{f(x+h)-f(x)}{x}"),
      f("\\lim_{h\\to \\infty}\\frac{f(x+h)-f(x)}{h}"),
    ],
    theme: "formula",
  },
  {
    atomKey: "diff-functional-equation:formula:0",
    stem: "If \\(f(x+y)=f(x)f(y)\\) for all \\(x,y\\), then \\(f'(x) = \\):",
    distractors: [
      f("f(0)\\,f(x)"),
      f("f'(0)\\,f'(x)"),
      f("f'(0)+f(x)"),
    ],
    theme: "formula",
  },
  {
    atomKey: "diff-higher-order:formula:0",
    stem: "The second derivative \\(\\dfrac{d^2y}{dx^2}\\) is defined as:",
    distractors: [
      f("\\left(\\frac{dy}{dx}\\right)^2"),
      f("\\frac{d}{dy}\\!\\left(\\frac{dy}{dx}\\right)"),
      f("\\frac{dy}{dx}\\cdot\\frac{d}{dx}(y)"),
    ],
    theme: "formula",
  },
  {
    atomKey: "diff-implicit:formula:0",
    stem: "In implicit differentiation, differentiating a \\(y\\)-term with respect to \\(x\\) gives:",
    distractors: [
      f("(\\text{its derivative})"),
      f("(\\text{its derivative})\\cdot\\frac{dx}{dy}"),
      f("(\\text{its derivative})+\\frac{dy}{dx}"),
    ],
    theme: "formula",
  },
  {
    atomKey: "diff-lhd-rhd-test:formula:0",
    stem: "\\(f\\) is differentiable at \\(x=c\\) if and only if:",
    distractors: [
      f("f'(c^-) \\neq f'(c^+)"),
      f("f(c^-) = f(c^+) \\iff f \\text{ differentiable at } c"),
      f("f'(c^-) + f'(c^+) = 0 \\iff f \\text{ differentiable at } c"),
    ],
    theme: "formula",
  },
  {
    atomKey: "diff-logarithmic:formula:0",
    stem: "For \\(y = f(x)^{g(x)}\\), logarithmic differentiation gives \\(\\dfrac{1}{y}\\dfrac{dy}{dx} = \\):",
    distractors: [
      f("g'(x)\\ln f(x) + g(x)\\,f'(x)"),
      f("g'(x)\\ln f(x) - g(x)\\frac{f'(x)}{f(x)}"),
      f("g(x)\\ln f(x) + g'(x)\\frac{f'(x)}{f(x)}"),
    ],
    theme: "formula",
  },
  {
    atomKey: "diff-parametric:formula:0",
    stem: "For a parametric curve \\(x=x(t),\\ y=y(t)\\), \\(\\dfrac{dy}{dx} = \\):",
    distractors: [
      f("\\frac{dx/dt}{dy/dt}"),
      f("\\frac{dy}{dt}\\cdot\\frac{dx}{dt}"),
      f("\\frac{dy/dt}{dx/dt}\\cdot\\frac{1}{dt}"),
    ],
    theme: "formula",
  },
  {
    atomKey: "diff-second-derivative-inverse:formula:0",
    stem: "For an inverse relation, \\(\\dfrac{d^2x}{dy^2} = \\):",
    distractors: [
      f("\\frac{d^2y/dx^2}{\\left(dy/dx\\right)^{3}}"),
      f("-\\frac{d^2y/dx^2}{\\left(dy/dx\\right)^{2}}"),
      f("\\frac{1}{d^2y/dx^2}"),
    ],
    theme: "formula",
  },
];
