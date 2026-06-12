/**
 * NDA Maths · Inverse Trigonometry · practiceSet MCQs (computation).
 * Hand-authored distractors, theme=computation. Every `correct` re-derived from
 * the notes prompt; no notes answer was wrong. The 2 original practiceSet items
 * (it-principal-values:0,1) are topped up with genuine evaluation reps across the
 * computational concepts to clear the ≥12 floor (24 total).
 * Distractors mirror real inverse-trig mistakes: wrong principal-value branch,
 * sin⁻¹(sin x) outside range, tan⁻¹ addition without the +π correction term.
 *   npm run quiz:verify nda-maths__inverse-trigonometry-computation
 */
import type { VerifiedEntry } from "./nda-maths__probability";

const e = (atomKey: string, distractors: string[]): VerifiedEntry => ({ atomKey, distractors, theme: "computation" });
const f = (s: string) => `\\(${s}\\)`;

export const VERIFIED: VerifiedEntry[] = [
  // ── it-principal-values ──
  // sin⁻¹(-1) = -π/2
  e("it-principal-values:practiceSet:0", [f("\\tfrac{\\pi}{2}"), f("\\tfrac{3\\pi}{2}"), f("\\pi")]),
  // range of tan⁻¹x = (-π/2, π/2) open
  e("it-principal-values:practiceSet:1", [
    f("\\left[-\\tfrac{\\pi}{2},\\tfrac{\\pi}{2}\\right]"),
    f("[0,\\pi]"),
    f("(0,\\pi)"),
  ]),
  // cos⁻¹(-1/2) = 2π/3
  e("it-principal-values:practiceSet:2", [f("-\\tfrac{\\pi}{3}"), f("\\tfrac{\\pi}{3}"), f("-\\tfrac{2\\pi}{3}")]),
  // tan⁻¹(-√3) = -π/3
  e("it-principal-values:practiceSet:3", [f("\\tfrac{\\pi}{3}"), f("\\tfrac{2\\pi}{3}"), f("-\\tfrac{\\pi}{6}")]),
  // sin⁻¹(√3/2) = π/3
  e("it-principal-values:practiceSet:4", [f("\\tfrac{2\\pi}{3}"), f("\\tfrac{\\pi}{6}"), f("\\tfrac{\\pi}{2}")]),

  // ── it-complementary-identities ──
  // sin⁻¹x = π/6 ⇒ cos⁻¹x = π/3
  e("it-complementary-identities:practiceSet:0", [f("\\tfrac{\\pi}{6}"), f("\\tfrac{\\pi}{2}"), f("\\tfrac{2\\pi}{3}")]),
  // sin⁻¹½ + cos⁻¹½ = π/2
  e("it-complementary-identities:practiceSet:1", [f("\\tfrac{2\\pi}{3}"), f("\\tfrac{5\\pi}{6}"), f("\\pi")]),
  // tan⁻¹3 + cot⁻¹3 = π/2
  e("it-complementary-identities:practiceSet:2", [f("\\pi"), f("\\tfrac{\\pi}{4}"), f("\\tfrac{\\pi}{3}")]),

  // ── it-sum-difference-formulas ──
  // tan⁻¹½ + tan⁻¹⅓ = π/4
  e("it-sum-difference-formulas:practiceSet:0", [f("\\tfrac{\\pi}{2}"), f("\\tfrac{\\pi}{6}"), f("\\tfrac{3\\pi}{4}")]),
  // tan⁻¹2 + tan⁻¹3 = 3π/4 (ab>1, add π)
  e("it-sum-difference-formulas:practiceSet:1", [f("-\\tfrac{\\pi}{4}"), f("\\tfrac{\\pi}{4}"), f("\\tfrac{\\pi}{2}")]),
  // tan⁻¹½ - tan⁻¹⅓ = tan⁻¹(1/7)
  e("it-sum-difference-formulas:practiceSet:2", [
    f("\\tan^{-1}\\tfrac{1}{5}"),
    f("\\tan^{-1}\\tfrac{5}{6}"),
    f("\\tan^{-1}\\tfrac{1}{6}"),
  ]),

  // ── it-2tan-substitutions ──
  // tan⁻¹(2x/(1-x²)) = 2 tan⁻¹x
  e("it-2tan-substitutions:practiceSet:0", [f("\\tan^{-1}x"), f("\\tfrac12\\tan^{-1}x"), f("\\sin^{-1}x")]),
  // sin⁻¹(2x/(1+x²)) = 2 tan⁻¹x
  e("it-2tan-substitutions:practiceSet:1", [f("\\tan^{-1}x"), f("2\\sin^{-1}x"), f("\\cos^{-1}x")]),

  // ── it-principal-value-of-composite ──
  // sin⁻¹(sin 2π/3) = π/3
  e("it-principal-value-of-composite:practiceSet:0", [f("\\tfrac{2\\pi}{3}"), f("\\tfrac{\\pi}{6}"), f("-\\tfrac{\\pi}{3}")]),
  // cos⁻¹(cos 4π/3) = 2π/3
  e("it-principal-value-of-composite:practiceSet:1", [f("\\tfrac{4\\pi}{3}"), f("-\\tfrac{\\pi}{3}"), f("\\tfrac{\\pi}{3}")]),
  // tan⁻¹(tan 3π/4) = -π/4
  e("it-principal-value-of-composite:practiceSet:2", [f("\\tfrac{3\\pi}{4}"), f("\\tfrac{\\pi}{4}"), f("-\\tfrac{3\\pi}{4}")]),

  // ── it-double-half-angle-composite ──
  // tan(2 tan⁻¹⅓) = 3/4
  e("it-double-half-angle-composite:practiceSet:0", [f("\\tfrac{2}{3}"), f("\\tfrac{3}{8}"), f("\\tfrac{6}{10}")]),
  // 2 tan⁻¹⅓ = tan⁻¹(3/4)
  e("it-double-half-angle-composite:practiceSet:1", [
    f("\\tan^{-1}\\tfrac{2}{3}"),
    f("\\tan^{-1}\\tfrac{2}{9}"),
    f("\\tan^{-1}\\tfrac{1}{9}"),
  ]),

  // ── it-converting-to-tangent ──
  // sin⁻¹(3/5) = tan⁻¹(3/4)
  e("it-converting-to-tangent:practiceSet:0", [
    f("\\tan^{-1}\\tfrac{3}{5}"),
    f("\\tan^{-1}\\tfrac{4}{3}"),
    f("\\tan^{-1}\\tfrac{5}{4}"),
  ]),
  // cos⁻¹(12/13) = tan⁻¹(5/12)
  e("it-converting-to-tangent:practiceSet:1", [
    f("\\tan^{-1}\\tfrac{12}{5}"),
    f("\\tan^{-1}\\tfrac{12}{13}"),
    f("\\tan^{-1}\\tfrac{5}{13}"),
  ]),

  // ── it-solving-equations ──
  // 2 sin⁻¹x + cos⁻¹x = π ⇒ x = 1
  e("it-solving-equations:practiceSet:0", [f("x = \\tfrac{1}{2}"), f("x = 0"), f("x = -1")]),
  // sin⁻¹x + sin⁻¹y = π ⇒ x = y (= 1)
  e("it-solving-equations:practiceSet:1", [f("x = -y"), f("xy = 1"), f("x + y = 1")]),

  // ── it-geometric-applications ──
  // 4 m at 4 m distance ⇒ θ = π/4
  e("it-geometric-applications:practiceSet:0", [f("\\tfrac{\\pi}{3}"), f("\\tfrac{\\pi}{6}"), f("\\tfrac{\\pi}{2}")]),
  // subtended angle, h₁=1,h₂=2,d=1 ⇒ tan = 1/3
  e("it-geometric-applications:practiceSet:1", [f("1"), f("\\tfrac{1}{2}"), f("\\tfrac{2}{3}")]),
];
