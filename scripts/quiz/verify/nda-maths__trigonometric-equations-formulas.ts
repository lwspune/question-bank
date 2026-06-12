/**
 * NDA Maths · Trigonometric Equations · FORMULA-recall MCQs.
 * One entry per `formula.latex` piece authored into the notes _data (pieces are
 * \quad-joined; key index = position in that concept's bundle, 0-based).
 * Distractors are full-equation permutations — wrong versions of the SAME
 * general-solution formula, same shape (no length/format tell).
 *
 * The general-solution-formulas concept was ENRICHED 2026-06-12: the bundle now
 * carries the three core forms PLUS sin θ=0, cos θ=0, and sin²θ=sin²α
 * (formula:3,4,5) — all genuine recall, all taught in the notes prose.
 *
 * SKIPPED (parked, not genuine recall formulas):
 *  - te-counting-solutions:formula:0 — a worked DERIVATION (cot2x·cot3x=1 ⇒
 *    cos5x=0), a technique not a recallable formula.
 *  - te-simultaneous-equations:formula:0 — set-intersection NOTATION
 *    ({θ:eqn1}∩{θ:eqn2}), a concept statement not an equation.
 *   npm run quiz:verify nda-maths__trigonometric-equations-formulas
 */
import type { VerifiedEntry } from "./nda-maths__probability";

const f = (s: string) => `\\(${s}\\)`;

export const VERIFIED: VerifiedEntry[] = [
  // ── te-general-solution-formulas: sin | cos | tan | sin=0 | cos=0 | sin²=sin² ──
  {
    atomKey: "te-general-solution-formulas:formula:0",
    stem: "What is the general solution of \\(\\sin\\theta=\\sin\\alpha\\)?",
    distractors: [
      f("\\theta=2n\\pi\\pm\\alpha"),
      f("\\theta=n\\pi+\\alpha"),
      f("\\theta=2n\\pi+(-1)^n\\alpha"),
    ],
    theme: "formula",
  },
  {
    atomKey: "te-general-solution-formulas:formula:1",
    stem: "What is the general solution of \\(\\cos\\theta=\\cos\\alpha\\)?",
    distractors: [
      f("\\theta=n\\pi+(-1)^n\\alpha"),
      f("\\theta=n\\pi\\pm\\alpha"),
      f("\\theta=2n\\pi+\\alpha"),
    ],
    theme: "formula",
  },
  {
    atomKey: "te-general-solution-formulas:formula:2",
    stem: "What is the general solution of \\(\\tan\\theta=\\tan\\alpha\\)?",
    distractors: [
      f("\\theta=2n\\pi+\\alpha"),
      f("\\theta=n\\pi+(-1)^n\\alpha"),
      f("\\theta=2n\\pi\\pm\\alpha"),
    ],
    theme: "formula",
  },
  {
    atomKey: "te-general-solution-formulas:formula:3",
    stem: "What is the general solution of \\(\\sin\\theta=0\\)?",
    distractors: [
      f("\\theta=(2n+1)\\tfrac{\\pi}{2}"),
      f("\\theta=2n\\pi"),
      f("\\theta=2n\\pi\\pm\\tfrac{\\pi}{2}"),
    ],
    theme: "formula",
  },
  {
    atomKey: "te-general-solution-formulas:formula:4",
    stem: "What is the general solution of \\(\\cos\\theta=0\\)?",
    distractors: [
      f("\\theta=n\\pi"),
      f("\\theta=2n\\pi\\pm\\tfrac{\\pi}{2}"),
      f("\\theta=n\\pi+\\tfrac{\\pi}{2}"),
    ],
    theme: "formula",
  },
  {
    atomKey: "te-general-solution-formulas:formula:5",
    stem: "What is the general solution of \\(\\sin^2\\theta=\\sin^2\\alpha\\)?",
    distractors: [
      f("\\theta=2n\\pi\\pm\\alpha"),
      f("\\theta=n\\pi+(-1)^n\\alpha"),
      f("\\theta=2n\\pi\\pm 2\\alpha"),
    ],
    theme: "formula",
  },

  // ── te-reducing-and-solving: co-function shifts ──
  {
    atomKey: "te-reducing-and-solving:formula:0",
    stem: "Which co-function identity rewrites \\(\\cos\\theta\\) as a sine?",
    distractors: [
      f("\\cos\\theta=\\sin\\!\\left(\\tfrac{\\pi}{2}+\\theta\\right)"),
      f("\\cos\\theta=\\sin\\!\\left(\\theta-\\tfrac{\\pi}{2}\\right)"),
      f("\\cos\\theta=\\cos\\!\\left(\\tfrac{\\pi}{2}-\\theta\\right)"),
    ],
    theme: "formula",
  },
  {
    atomKey: "te-reducing-and-solving:formula:1",
    stem: "Which co-function identity rewrites \\(\\sin\\theta\\) as a cosine?",
    distractors: [
      f("\\sin\\theta=\\cos\\!\\left(\\tfrac{\\pi}{2}+\\theta\\right)"),
      f("\\sin\\theta=\\cos\\!\\left(\\theta-\\tfrac{\\pi}{2}\\right)"),
      f("\\sin\\theta=\\sin\\!\\left(\\tfrac{\\pi}{2}-\\theta\\right)"),
    ],
    theme: "formula",
  },

  // ── te-range-and-existence: existence bound ──
  {
    atomKey: "te-range-and-existence:formula:0",
    stem: "When does \\(a\\sin x=b\\) have a real solution?",
    distractors: [
      f("\\iff |b|\\ge|a|"),
      f("\\iff |a|\\le 1"),
      f("\\iff |b|\\le 1"),
    ],
    theme: "formula",
  },

  // ── te-trig-roots-vieta: tan-sum from Vieta ──
  {
    atomKey: "te-trig-roots-vieta:formula:0",
    stem: "If \\(\\tan\\alpha,\\tan\\beta\\) are roots of \\(ax^2+bx+c=0\\), which gives \\(\\tan(\\alpha+\\beta)\\)?",
    distractors: [
      f("\\tan(\\alpha+\\beta)=\\dfrac{b/a}{1-c/a}"),
      f("\\tan(\\alpha+\\beta)=\\dfrac{-b/a}{1+c/a}"),
      f("\\tan(\\alpha+\\beta)=\\dfrac{-c/a}{1-b/a}"),
    ],
    theme: "formula",
  },

  // ── te-product-and-sum-forms: the 45° product identity ──
  {
    atomKey: "te-product-and-sum-forms:formula:0",
    stem: "The identity \\((1+\\tan A)(1+\\tan B)=2\\) holds exactly when:",
    distractors: [
      f("A+B=\\tfrac{\\pi}{3}"),
      f("A-B=\\tfrac{\\pi}{4}"),
      f("A+B=\\tfrac{\\pi}{2}"),
    ],
    theme: "formula",
  },

  // ── te-logarithmic-and-misc: reciprocal-sum trick ──
  {
    atomKey: "te-logarithmic-and-misc:formula:0",
    stem: "For \\(t>0\\), the equation \\(t+\\tfrac{1}{t}=2\\) forces:",
    distractors: [
      f("t=2"),
      f("t=-1"),
      f("t=0"),
    ],
    theme: "formula",
  },

  // ── te-combined-system-reduction: s = sin x + cos x substitution ──
  {
    atomKey: "te-combined-system-reduction:formula:0",
    stem: "If \\(s=\\sin x+\\cos x\\), what is \\(\\sin x\\cos x\\)?",
    distractors: [
      f("\\sin x\\cos x=\\dfrac{s^2+1}{2}"),
      f("\\sin x\\cos x=\\dfrac{1-s^2}{2}"),
      f("\\sin x\\cos x=s^2-1"),
    ],
    theme: "formula",
  },
  {
    atomKey: "te-combined-system-reduction:formula:1",
    stem: "If \\(s=\\sin x+\\cos x\\), what is \\(\\sin 2x\\)?",
    distractors: [
      f("\\sin 2x=1-s^2"),
      f("\\sin 2x=\\dfrac{s^2-1}{2}"),
      f("\\sin 2x=s^2+1"),
    ],
    theme: "formula",
  },
];
