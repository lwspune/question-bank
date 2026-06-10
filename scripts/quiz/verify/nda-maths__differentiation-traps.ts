/**
 * NDA Maths · Differentiation · COMMON-TRAPS theme — "spot the mistake" MCQs.
 * 8 from the new misconception callouts authored into the notes (the first
 * distractor in each is the warned mistake) + pre-existing seeds appended below.
 *   npm run quiz:verify nda-maths__differentiation-traps
 */
import type { VerifiedEntry } from "./nda-maths__probability";

const f = (s: string) => `\\(${s}\\)`;

export const VERIFIED: VerifiedEntry[] = [
  {
    atomKey: "diff-product-quotient:trap:0",
    stem: "Differentiate \\(y = x^2\\sin x\\).",
    correct: f("2x\\sin x + x^2\\cos x"),
    distractors: [f("2x\\cos x"), f("2x\\sin x - x^2\\cos x"), f("2x\\cos x + x^2\\sin x")],
    theme: "trap",
  },
  {
    atomKey: "diff-product-quotient:trap:1",
    stem: "Differentiate \\(y = \\dfrac{x}{1+x}\\).",
    correct: f("\\dfrac{1}{(1+x)^2}"),
    distractors: [f("-\\dfrac{1}{(1+x)^2}"), f("\\dfrac{2x+1}{(1+x)^2}"), f("\\dfrac{1}{1+x}")],
    theme: "trap",
  },
  {
    atomKey: "diff-chain-rule:trap:0",
    stem: "Differentiate \\(y = \\sin(3x^2)\\).",
    correct: f("6x\\cos(3x^2)"),
    distractors: [f("\\cos(3x^2)"), f("6x\\sin(3x^2)"), f("3x^2\\cos(3x^2)")],
    theme: "trap",
  },
  {
    atomKey: "diff-standard-derivatives:trap:1",
    stem: "Find \\(\\dfrac{d}{dx}(3^x)\\).",
    correct: f("3^x\\ln 3"),
    distractors: [f("x\\,3^{x-1}"), f("3^x"), f("\\dfrac{3^x}{\\ln 3}")],
    theme: "trap",
  },
  {
    atomKey: "diff-standard-derivatives:trap:2",
    stem: "Find \\(\\dfrac{d}{dx}(\\ln x)\\).",
    correct: f("\\dfrac{1}{x}"),
    distractors: [f("\\ln x"), f("x"), f("\\dfrac{1}{x\\ln x}")],
    theme: "trap",
  },
  {
    atomKey: "diff-implicit:trap:0",
    stem: "Treating \\(y\\) as a function of \\(x\\), what is \\(\\dfrac{d}{dx}(y^2)\\)?",
    correct: f("2y\\dfrac{dy}{dx}"),
    distractors: [f("2y"), f("2\\dfrac{dy}{dx}"), f("y^2\\dfrac{dy}{dx}")],
    theme: "trap",
  },
  {
    atomKey: "diff-parametric:trap:0",
    stem: "If \\(x = t^2\\) and \\(y = t^3\\), find \\(\\dfrac{dy}{dx}\\).",
    correct: f("\\dfrac{3t}{2}"),
    distractors: [f("\\dfrac{2}{3t}"), f("\\dfrac{3t^2}{2}"), f("6t^5")],
    theme: "trap",
  },
  {
    atomKey: "diff-higher-order:trap:0",
    stem: "For \\(y = x^3\\), find \\(\\dfrac{d^2y}{dx^2}\\).",
    correct: f("6x"),
    distractors: [f("9x^4"), f("3x^2"), f("6x^2")],
    theme: "trap",
  },
  // ── pre-existing trap seeds (authored from their hints) ──
  {
    atomKey: "diff-differentiable-implies-continuous:trap:0",
    stem: "Which statement about a function at a point is TRUE?",
    correct: "Differentiable \\(\\Rightarrow\\) continuous",
    distractors: [
      "Continuous \\(\\Rightarrow\\) differentiable",
      "Differentiable \\(\\Rightarrow\\) not continuous",
      "Continuity and differentiability are equivalent",
    ],
    theme: "trap",
  },
  {
    atomKey: "diff-modulus-corners:trap:0",
    stem: "Which of the following is DIFFERENTIABLE at \\(x = 0\\)?",
    correct: f("x|x|"),
    distractors: [f("|x|"), f("|x| + x"), f("|\\sin x|")],
    theme: "trap",
  },
  {
    atomKey: "diff-standard-derivatives:trap:0",
    stem: "Find \\(\\dfrac{d}{dx}\\sin(x^\\circ)\\) (where \\(x\\) is measured in DEGREES).",
    correct: f("\\tfrac{\\pi}{180}\\cos(x^\\circ)"),
    distractors: [f("\\cos(x^\\circ)"), f("\\tfrac{180}{\\pi}\\cos(x^\\circ)"), f("-\\cos(x^\\circ)")],
    theme: "trap",
  },
  {
    atomKey: "diff-second-derivative-inverse:trap:0",
    stem: "Which is the correct expression for \\(\\dfrac{d^2x}{dy^2}\\) in terms of derivatives of \\(y\\) w.r.t. \\(x\\)?",
    correct: f("-\\dfrac{d^2y/dx^2}{(dy/dx)^3}"),
    distractors: [f("\\dfrac{1}{d^2y/dx^2}"), f("\\dfrac{d^2y/dx^2}{(dy/dx)^2}"), f("\\left(\\dfrac{dx}{dy}\\right)^2")],
    theme: "trap",
  },
];
