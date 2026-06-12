/**
 * NDA Maths · Inverse Trigonometry · FORMULA-recall MCQs.
 * One entry per `formula.latex` piece harvested from the notes _data. Bundle
 * concepts (\quad-joined) yield one piece per identity, key index = position in
 * that bundle (0-based, after splitFormulaPieces strips trailing commas).
 * Distractors are full-equation permutations — wrong versions of the SAME
 * identity, same shape (no length/format tell).
 *
 * Formula pieces (14 total):
 *   it-principal-values            : 0 sin⁻¹ range · 1 cos⁻¹ range · 2 tan⁻¹ range
 *   it-complementary-identities    : 0 sin⁻¹+cos⁻¹ · 1 tan⁻¹+cot⁻¹
 *   it-sum-difference-formulas     : 0 arctan sum · 1 (ab<1) validity condition
 *   it-2tan-substitutions          : 0 tan⁻¹(2x/(1-x²))=2tan⁻¹x  [was auto]
 *   it-principal-value-of-composite: 0 sin⁻¹(sin x) reduction      [was auto]
 *   it-double-half-angle-composite : 0 tan(2tan⁻¹x)               [was auto]
 *   it-converting-to-tangent       : 0 sin⁻¹(3/5)=tan⁻¹(3/4) · 1 cot⁻¹(3/2)=tan⁻¹(2/3)
 *   it-solving-equations           : 0 complementary collapse     [was auto]
 *   it-geometric-applications      : 0 subtended-angle formula     [was auto]
 *   npm run quiz:verify nda-maths__inverse-trigonometry-formulas
 */
import type { VerifiedEntry } from "./nda-maths__probability";

const f = (s: string) => `\\(${s}\\)`;

export const VERIFIED: VerifiedEntry[] = [
  // ── it-principal-values: principal ranges ──
  {
    atomKey: "it-principal-values:formula:0",
    stem: "What is the principal-value range of \\(\\sin^{-1}x\\)?",
    distractors: [f("\\sin^{-1}x \\in [0,\\pi]"), f("\\sin^{-1}x \\in (0,\\pi)"), f("\\sin^{-1}x \\in (-\\tfrac{\\pi}{2},\\tfrac{\\pi}{2})")],
    theme: "formula",
  },
  {
    atomKey: "it-principal-values:formula:1",
    stem: "What is the principal-value range of \\(\\cos^{-1}x\\)?",
    distractors: [
      f("\\cos^{-1}x \\in [-\\tfrac{\\pi}{2},\\tfrac{\\pi}{2}]"),
      f("\\cos^{-1}x \\in (0,\\pi)"),
      f("\\cos^{-1}x \\in (-\\tfrac{\\pi}{2},\\tfrac{\\pi}{2})"),
    ],
    theme: "formula",
  },
  {
    atomKey: "it-principal-values:formula:2",
    stem: "What is the principal-value range of \\(\\tan^{-1}x\\)?",
    distractors: [
      f("\\tan^{-1}x \\in [-\\tfrac{\\pi}{2},\\tfrac{\\pi}{2}]"),
      f("\\tan^{-1}x \\in [0,\\pi]"),
      f("\\tan^{-1}x \\in (0,\\pi)"),
    ],
    theme: "formula",
  },

  // ── it-complementary-identities ──
  {
    atomKey: "it-complementary-identities:formula:0",
    stem: "Which complementary identity is correct for all valid \\(x\\)?",
    distractors: [
      f("\\sin^{-1}x + \\cos^{-1}x = \\pi"),
      f("\\sin^{-1}x - \\cos^{-1}x = \\tfrac{\\pi}{2}"),
      f("\\sin^{-1}x \\cdot \\cos^{-1}x = \\tfrac{\\pi}{2}"),
    ],
    theme: "formula",
  },
  {
    atomKey: "it-complementary-identities:formula:1",
    stem: "What does \\(\\tan^{-1}x + \\cot^{-1}x\\) equal (for all real \\(x\\))?",
    distractors: [
      f("\\tan^{-1}x + \\cot^{-1}x = \\pi"),
      f("\\tan^{-1}x + \\cot^{-1}x = \\tfrac{\\pi}{4}"),
      f("\\tan^{-1}x - \\cot^{-1}x = \\tfrac{\\pi}{2}"),
    ],
    theme: "formula",
  },

  // ── it-sum-difference-formulas ──
  {
    atomKey: "it-sum-difference-formulas:formula:0",
    stem: "Which is the arctangent sum formula (when \\(ab<1\\))?",
    distractors: [
      f("\\tan^{-1}a + \\tan^{-1}b = \\tan^{-1}\\dfrac{a+b}{1+ab}"),
      f("\\tan^{-1}a + \\tan^{-1}b = \\tan^{-1}\\dfrac{a-b}{1-ab}"),
      f("\\tan^{-1}a + \\tan^{-1}b = \\tan^{-1}(a+b)"),
    ],
    theme: "formula",
  },
  {
    atomKey: "it-sum-difference-formulas:formula:1",
    stem: "The formula \\(\\tan^{-1}a+\\tan^{-1}b=\\tan^{-1}\\dfrac{a+b}{1-ab}\\) (no correction term) is valid only when:",
    correct: f("ab<1"),
    distractors: [f("ab>1"), f("a+b<1"), f("ab=1")],
    theme: "formula",
  },

  // ── it-2tan-substitutions ──
  {
    atomKey: "it-2tan-substitutions:formula:0",
    stem: "Which double-angle substitution is correct?",
    distractors: [
      f("\\tan^{-1}\\dfrac{2x}{1+x^2} = 2\\tan^{-1}x"),
      f("\\tan^{-1}\\dfrac{2x}{1-x^2} = \\tfrac12\\tan^{-1}x"),
      f("\\tan^{-1}\\dfrac{1-x^2}{1+x^2} = 2\\tan^{-1}x"),
    ],
    theme: "formula",
  },

  // ── it-principal-value-of-composite ──
  {
    atomKey: "it-principal-value-of-composite:formula:0",
    stem: "Which statement about \\(\\sin^{-1}(\\sin x)\\) is correct?",
    distractors: [
      f("\\sin^{-1}(\\sin x) = x \\ \\text{for all } x"),
      f("\\sin^{-1}(\\sin x) = x \\ \\text{only if } x \\in [0,\\pi]"),
      f("\\sin^{-1}(\\sin x) = \\pi - x \\ \\text{for all } x"),
    ],
    theme: "formula",
  },

  // ── it-double-half-angle-composite ──
  {
    atomKey: "it-double-half-angle-composite:formula:0",
    stem: "What is \\(\\tan(2\\tan^{-1}x)\\)?",
    distractors: [
      f("\\tan(2\\tan^{-1}x) = \\dfrac{2x}{1 + x^2}"),
      f("\\tan(2\\tan^{-1}x) = \\dfrac{1 - x^2}{2x}"),
      f("\\tan(2\\tan^{-1}x) = \\dfrac{2x}{x^2 - 1}"),
    ],
    theme: "formula",
  },

  // ── it-converting-to-tangent ──
  {
    atomKey: "it-converting-to-tangent:formula:0",
    stem: "Writing \\(\\sin^{-1}\\tfrac{3}{5}\\) as an arctangent gives:",
    distractors: [
      f("\\sin^{-1}\\tfrac{3}{5} = \\tan^{-1}\\tfrac{3}{5}"),
      f("\\sin^{-1}\\tfrac{3}{5} = \\tan^{-1}\\tfrac{4}{3}"),
      f("\\sin^{-1}\\tfrac{3}{5} = \\tan^{-1}\\tfrac{5}{4}"),
    ],
    theme: "formula",
  },
  {
    atomKey: "it-converting-to-tangent:formula:1",
    stem: "Writing \\(\\cot^{-1}\\tfrac{3}{2}\\) as an arctangent gives:",
    distractors: [
      f("\\cot^{-1}\\tfrac{3}{2} = \\tan^{-1}\\tfrac{3}{2}"),
      f("\\cot^{-1}\\tfrac{3}{2} = \\tan^{-1}\\tfrac{2}{\\sqrt{13}}"),
      f("\\cot^{-1}\\tfrac{3}{2} = \\tan^{-1}\\tfrac{3}{\\sqrt{13}}"),
    ],
    theme: "formula",
  },

  // ── it-solving-equations ──
  {
    atomKey: "it-solving-equations:formula:0",
    stem: "To collapse \\(a\\sin^{-1}x + b\\cos^{-1}x = c\\) to one unknown, which substitution is used?",
    correct: f("\\cos^{-1}x = \\tfrac{\\pi}{2} - \\sin^{-1}x"),
    distractors: [
      f("\\cos^{-1}x = \\sin^{-1}x - \\tfrac{\\pi}{2}"),
      f("\\cos^{-1}x = \\tfrac{\\pi}{2} + \\sin^{-1}x"),
      f("\\cos^{-1}x = \\pi - \\sin^{-1}x"),
    ],
    theme: "formula",
  },

  // ── it-geometric-applications ──
  {
    atomKey: "it-geometric-applications:formula:0",
    stem: "What is the angle subtended at distance \\(d\\) between heights \\(h_1<h_2\\)?",
    distractors: [
      f("\\tan^{-1}\\dfrac{(h_2-h_1)\\,d}{d^2 - h_1 h_2}"),
      f("\\tan^{-1}\\dfrac{(h_2+h_1)\\,d}{d^2 + h_1 h_2}"),
      f("\\tan^{-1}\\dfrac{(h_2-h_1)\\,d}{d^2 + h_1 + h_2}"),
    ],
    theme: "formula",
  },
];
