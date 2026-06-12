/**
 * NDA Maths · Inverse Trigonometry · COMMON-TRAPS theme — "spot the value/mistake" MCQs.
 * One per misconception callout authored into the notes _data. Keys are
 * `<conceptSlug>:trap:<i>` where i = position of the callout in that concept's
 * `traps` array. The first distractor in each is the warned mistake.
 *
 * Trap callouts per concept (array order), 13 total:
 *   it-principal-values            : 0 cos⁻¹/cot⁻¹ not odd · 1 tan⁻¹ open range · 2 must-land-in-range
 *   it-complementary-identities    : 0 sin⁻¹+cos⁻¹=π/2 always
 *   it-sum-difference-formulas     : 0 check ab<1 · 1 difference uses 1+ab
 *   it-2tan-substitutions          : 0 validity range
 *   it-principal-value-of-composite: 0 sin⁻¹(sin x)≠x · 1 different reduction rules
 *   it-double-half-angle-composite : 0 tan2θ uses 1−tan²θ
 *   it-converting-to-tangent       : 0 triangle not value
 *   it-solving-equations           : 0 reject invalid roots
 *   it-geometric-applications      : 0 denominator d²+h₁h₂
 *   npm run quiz:verify nda-maths__inverse-trigonometry-traps
 */
import type { VerifiedEntry } from "./nda-maths__probability";

const f = (s: string) => `\\(${s}\\)`;

export const VERIFIED: VerifiedEntry[] = [
  // ── it-principal-values ──
  {
    // cos⁻¹(-x) = π - cos⁻¹x, NOT -cos⁻¹x
    atomKey: "it-principal-values:trap:0",
    stem: "Evaluate \\(\\cos^{-1}\\!\\left(-\\tfrac{1}{2}\\right)\\).",
    correct: f("\\tfrac{2\\pi}{3}"),
    distractors: [f("-\\tfrac{\\pi}{3}"), f("\\tfrac{\\pi}{3}"), f("-\\tfrac{2\\pi}{3}")],
    theme: "trap",
  },
  {
    // tan⁻¹ never reaches ±π/2 (open range)
    atomKey: "it-principal-values:trap:1",
    stem: "Which value can \\(\\tan^{-1}x\\) NEVER equal for any finite real \\(x\\)?",
    correct: f("\\tfrac{\\pi}{2}"),
    distractors: [f("\\tfrac{\\pi}{4}"), f("-\\tfrac{\\pi}{3}"), f("0")],
    theme: "trap",
  },
  {
    // an output of π/2 is impossible for sin⁻¹... but valid; trick: which CANNOT be a sin⁻¹ output
    atomKey: "it-principal-values:trap:2",
    stem: "Which angle can NEVER be the value of \\(\\sin^{-1}x\\) (for real \\(x\\in[-1,1]\\))?",
    correct: f("\\tfrac{5\\pi}{6}"),
    distractors: [f("\\tfrac{\\pi}{2}"), f("-\\tfrac{\\pi}{2}"), f("0")],
    theme: "trap",
  },

  // ── it-complementary-identities ──
  {
    // sin⁻¹x + cos⁻¹x = π/2 for ALL valid x
    atomKey: "it-complementary-identities:trap:0",
    stem: "What is \\(\\sin^{-1}\\tfrac{1}{3} + \\cos^{-1}\\tfrac{1}{3}\\)?",
    correct: f("\\tfrac{\\pi}{2}"),
    distractors: [f("\\tfrac{2\\pi}{3}"), f("\\pi"), f("\\tfrac{\\pi}{3}")],
    theme: "trap",
  },

  // ── it-sum-difference-formulas ──
  {
    // ab > 1 → must add π
    atomKey: "it-sum-difference-formulas:trap:0",
    stem: "Evaluate \\(\\tan^{-1}2 + \\tan^{-1}3\\).",
    correct: f("\\tfrac{3\\pi}{4}"),
    distractors: [f("-\\tfrac{\\pi}{4}"), f("\\tfrac{\\pi}{4}"), f("\\tfrac{\\pi}{2}")],
    theme: "trap",
  },
  {
    // difference formula denominator is 1 + ab
    atomKey: "it-sum-difference-formulas:trap:1",
    stem: "Evaluate \\(\\tan^{-1}\\tfrac{1}{2} - \\tan^{-1}\\tfrac{1}{3}\\).",
    correct: f("\\tan^{-1}\\tfrac{1}{7}"),
    distractors: [f("\\tan^{-1}\\tfrac{1}{5}"), f("\\tan^{-1}\\tfrac{5}{6}"), f("\\tan^{-1}\\tfrac{1}{6}")],
    theme: "trap",
  },

  // ── it-2tan-substitutions ──
  {
    // 2 tan⁻¹(1/3) = tan⁻¹(3/4) (validity ok), NOT tan⁻¹(2/3)
    atomKey: "it-2tan-substitutions:trap:0",
    stem: "Simplify \\(2\\tan^{-1}\\tfrac{1}{3}\\).",
    correct: f("\\tan^{-1}\\tfrac{3}{4}"),
    distractors: [f("\\tan^{-1}\\tfrac{2}{3}"), f("\\tan^{-1}\\tfrac{2}{9}"), f("\\tan^{-1}\\tfrac{1}{9}")],
    theme: "trap",
  },

  // ── it-principal-value-of-composite ──
  {
    // sin⁻¹(sin 2π/3) = π/3, NOT 2π/3
    atomKey: "it-principal-value-of-composite:trap:0",
    stem: "Evaluate \\(\\sin^{-1}\\!\\left(\\sin\\dfrac{2\\pi}{3}\\right)\\).",
    correct: f("\\tfrac{\\pi}{3}"),
    distractors: [f("\\tfrac{2\\pi}{3}"), f("\\tfrac{\\pi}{6}"), f("-\\tfrac{\\pi}{3}")],
    theme: "trap",
  },
  {
    // cos⁻¹(cos x) for x in [π,2π] = 2π - x, not π - x
    atomKey: "it-principal-value-of-composite:trap:1",
    stem: "Evaluate \\(\\cos^{-1}\\!\\left(\\cos\\dfrac{4\\pi}{3}\\right)\\).",
    correct: f("\\tfrac{2\\pi}{3}"),
    distractors: [f("-\\tfrac{\\pi}{3}"), f("\\tfrac{4\\pi}{3}"), f("\\tfrac{\\pi}{3}")],
    theme: "trap",
  },

  // ── it-double-half-angle-composite ──
  {
    // tan(2 tan⁻¹(1/5)) = 5/12, using 1 - tan²θ
    atomKey: "it-double-half-angle-composite:trap:0",
    stem: "Evaluate \\(\\tan\\!\\left(2\\tan^{-1}\\tfrac{1}{5}\\right)\\).",
    correct: f("\\tfrac{5}{12}"),
    distractors: [f("\\tfrac{5}{13}"), f("\\tfrac{2}{5}"), f("\\tfrac{1}{12}")],
    theme: "trap",
  },

  // ── it-converting-to-tangent ──
  {
    // tan of sin⁻¹(3/5) is 3/4, NOT 3/5
    atomKey: "it-converting-to-tangent:trap:0",
    stem: "What is \\(\\tan\\!\\left(\\sin^{-1}\\tfrac{3}{5}\\right)\\)?",
    correct: f("\\tfrac{3}{4}"),
    distractors: [f("\\tfrac{3}{5}"), f("\\tfrac{4}{5}"), f("\\tfrac{5}{3}")],
    theme: "trap",
  },

  // ── it-solving-equations ──
  {
    // collapse via complementary identity, x = 1
    atomKey: "it-solving-equations:trap:0",
    stem: "Solve \\(2\\sin^{-1}x + \\cos^{-1}x = \\pi\\).",
    correct: f("x = 1"),
    distractors: [f("x = \\tfrac{1}{2}"), f("x = 0"), f("x = -1")],
    theme: "trap",
  },

  // ── it-geometric-applications ──
  {
    // subtended angle: tan = (h₂-h₁)d / (d² + h₁h₂)
    atomKey: "it-geometric-applications:trap:0",
    stem: "At distance \\(d=2\\) the angle subtended between heights \\(h_1=1\\) and \\(h_2=3\\) has \\(\\tan = ?\\)",
    correct: f("\\tfrac{4}{7}"),
    distractors: [f("\\tfrac{4}{1}"), f("\\tfrac{4}{5}"), f("\\tfrac{2}{7}")],
    theme: "trap",
  },
];
