/**
 * NDA Maths · Trigonometric Equations · COMMON-TRAPS theme — "spot the
 * value/mistake" MCQs. One per misconception callout authored into the notes
 * (key index = position in each concept's `traps` array). The first distractor
 * in each is the warned mistake.
 *   npm run quiz:verify nda-maths__trigonometric-equations-traps
 */
import type { VerifiedEntry } from "./nda-maths__probability";

const f = (s: string) => `\\(${s}\\)`;

export const VERIFIED: VerifiedEntry[] = [
  // ── te-general-solution-formulas (4 traps) ──
  {
    // sin vs cos forms swapped
    atomKey: "te-general-solution-formulas:trap:0",
    stem: "What is the general solution of \\(\\sin\\theta=\\sin\\tfrac{\\pi}{6}\\)?",
    correct: f("\\theta=n\\pi+(-1)^n\\tfrac{\\pi}{6}"),
    distractors: [f("\\theta=2n\\pi\\pm\\tfrac{\\pi}{6}"), f("\\theta=n\\pi+\\tfrac{\\pi}{6}"), f("\\theta=2n\\pi+\\tfrac{\\pi}{6}")],
    theme: "trap",
  },
  {
    // (-1)^n belongs to sine only — applied wrongly to cosine
    atomKey: "te-general-solution-formulas:trap:1",
    stem: "What is the general solution of \\(\\cos\\theta=\\cos\\tfrac{\\pi}{3}\\)?",
    correct: f("\\theta=2n\\pi\\pm\\tfrac{\\pi}{3}"),
    distractors: [f("\\theta=n\\pi+(-1)^n\\tfrac{\\pi}{3}"), f("\\theta=n\\pi+\\tfrac{\\pi}{3}"), f("\\theta=2n\\pi+\\tfrac{\\pi}{3}")],
    theme: "trap",
  },
  {
    // dropping the ± loses half the cosine solutions
    atomKey: "te-general-solution-formulas:trap:2",
    stem: "Which set is the COMPLETE solution of \\(\\cos\\theta=\\tfrac{1}{2}\\)?",
    correct: f("\\theta=2n\\pi\\pm\\tfrac{\\pi}{3}"),
    distractors: [f("\\theta=2n\\pi+\\tfrac{\\pi}{3}"), f("\\theta=2n\\pi-\\tfrac{\\pi}{3}"), f("\\theta=n\\pi\\pm\\tfrac{\\pi}{3}")],
    theme: "trap",
  },
  {
    // tan steps by n\pi not 2n\pi
    atomKey: "te-general-solution-formulas:trap:3",
    stem: "What is the general solution of \\(\\tan\\theta=\\tan\\tfrac{\\pi}{5}\\)?",
    correct: f("\\theta=n\\pi+\\tfrac{\\pi}{5}"),
    distractors: [f("\\theta=2n\\pi+\\tfrac{\\pi}{5}"), f("\\theta=2n\\pi\\pm\\tfrac{\\pi}{5}"), f("\\theta=n\\pi+(-1)^n\\tfrac{\\pi}{5}")],
    theme: "trap",
  },

  // ── te-reducing-and-solving (3 traps) ──
  {
    // squaring adds false roots — extraneous \cos x = -1
    atomKey: "te-reducing-and-solving:trap:0",
    stem: "Solving \\(\\csc x+\\cot x=\\sqrt3\\) leads to a quadratic whose root \\(\\cos x=-1\\) must be rejected because:",
    correct: "it makes \\(\\csc x\\) and \\(\\cot x\\) undefined in the original equation.",
    distractors: [
      "it satisfies the squared equation, so it is a valid solution.",
      "it lies outside \\([-1,1]\\).",
      "it gives a negative value of \\(x\\).",
    ],
    theme: "trap",
  },
  {
    // dividing by cos x can lose roots
    atomKey: "te-reducing-and-solving:trap:1",
    stem: "When solving \\(\\sin x\\cos x=0\\), why is dividing through by \\(\\cos x\\) a mistake?",
    correct: "it discards the solutions where \\(\\cos x=0\\).",
    distractors: [
      "it introduces extraneous roots.",
      "it changes the period of the equation.",
      "it is never allowed to divide a trig equation.",
    ],
    theme: "trap",
  },
  {
    // \sin x = 2 has no solution
    atomKey: "te-reducing-and-solving:trap:2",
    stem: "How many real solutions does \\(\\sin x=2\\) have?",
    correct: f("0"),
    distractors: [f("1"), f("2"), "Infinitely many"],
    theme: "trap",
  },

  // ── te-counting-solutions (2 traps) ──
  {
    // scale the interval when angle is multiplied
    atomKey: "te-counting-solutions:trap:0",
    stem: "How many solutions does \\(\\sin 2x=\\tfrac{1}{2}\\) have on \\(0\\le x<2\\pi\\)?",
    correct: f("4"),
    distractors: [f("2"), f("8"), f("1")],
    theme: "trap",
  },
  {
    // discard undefined values
    atomKey: "te-counting-solutions:trap:1",
    stem: "While counting solutions of \\(\\cot 2x\\,\\cot 3x=1\\) via the reduced form \\(\\cos 5x=0\\), which values of \\(x\\) must be DISCARDED?",
    correct: "those where \\(\\cot 2x\\) or \\(\\cot 3x\\) is undefined.",
    distractors: [
      "none — every root of \\(\\cos 5x=0\\) is valid.",
      "those where \\(\\cos 5x\\) is positive.",
      "those outside the interval only.",
    ],
    theme: "trap",
  },

  // ── te-range-and-existence (1 trap) ──
  {
    // count integers inclusively across the range
    atomKey: "te-range-and-existence:trap:0",
    stem: "For how many integer values of \\(k\\) does \\(3\\cos x=k\\) have a solution?",
    correct: f("7"),
    distractors: [f("6"), f("5"), f("3")],
    theme: "trap",
  },

  // ── te-trig-roots-vieta (1 trap) ──
  {
    // Vieta: product is +c/a, sum is -b/a
    atomKey: "te-trig-roots-vieta:trap:0",
    stem: "If \\(\\tan\\alpha,\\tan\\beta\\) are roots of \\(x^2-5x+6=0\\), what is \\(\\tan(\\alpha+\\beta)\\)?",
    correct: f("-1"),
    distractors: [f("1"), f("\\tfrac{5}{7}"), f("-\\tfrac{5}{7}")],
    theme: "trap",
  },

  // ── te-logarithmic-and-misc (1 trap) ──
  {
    // log base must be positive and ≠ 1; first-quadrant solution only
    atomKey: "te-logarithmic-and-misc:trap:0",
    stem: "Solving \\(\\log_{\\cos x}\\sin x=1\\) for \\(0<x<\\tfrac{\\pi}{2}\\) gives \\(\\tan x=1\\). Which value of \\(x\\) is admissible?",
    correct: f("\\tfrac{\\pi}{4}"),
    distractors: [f("\\tfrac{5\\pi}{4}"), f("\\tfrac{\\pi}{2}"), f("0")],
    theme: "trap",
  },
];
