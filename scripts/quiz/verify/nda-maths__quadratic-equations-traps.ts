/**
 * NDA Maths · Quadratic Equations · COMMON-TRAPS theme — "spot the value/mistake" MCQs.
 * One per misconception callout authored into the notes (each concept's only trap
 * → index 0). The FIRST distractor in each is the warned mistake (the tempting
 * wrong answer the trap hint describes). Every `correct` is re-derived.
 *   npm run quiz:verify nda-maths__quadratic-equations-traps
 */
import type { VerifiedEntry } from "./nda-maths__probability";

const f = (s: string) => `\\(${s}\\)`;

export const VERIFIED: VerifiedEntry[] = [
  {
    // formula needs standard form first — read b,c off un-rearranged eqn
    atomKey: "qe-solving-methods:trap:0",
    stem: "Solve \\(x^2 = 5x - 6\\). (Rearrange to standard form first.)",
    correct: f("x = 2,\\ 3"),
    distractors: [f("x = -2,\\ -3"), f("x = 1,\\ 6"), f("x = 5,\\ -6")],
    theme: "trap",
  },
  {
    // "real roots" includes the equal case (D ≥ 0, not D > 0)
    atomKey: "qe-discriminant-nature:trap:0",
    stem: "What is the nature of the roots of \\(x^2 - 6x + 9 = 0\\)?",
    correct: "Real and equal (\\(D = 0\\)).",
    distractors: [
      "No real roots (\\(D = 0\\) means none).",
      "Real and distinct.",
      "Complex conjugate pair.",
    ],
    theme: "trap",
  },
  {
    // know all three tests cold — match the EXACT progression
    atomKey: "qe-equal-roots-progressions:trap:0",
    stem: "Equal roots force \\(\\tfrac{2}{b} = \\tfrac{1}{a} + \\tfrac{1}{c}\\). The coefficients \\(a, b, c\\) are then in which progression?",
    correct: "HP (harmonic progression).",
    distractors: ["AP (arithmetic progression).", "GP (geometric progression).", "None of these."],
    theme: "trap",
  },
  {
    // difference uses (sum)² − 4·product, NOT (sum)² − product
    atomKey: "qe-difference-and-ratio-of-roots:trap:0",
    stem: "For the roots of \\(x^2 - 5x + 6 = 0\\), what is \\(|\\alpha - \\beta|\\)?",
    correct: f("1"),
    distractors: [f("\\sqrt{13}"), f("\\sqrt{19}"), f("5")],
    theme: "trap",
  },
  {
    // check a+b+c before reaching for the formula → x=1 is a free root
    atomKey: "qe-vanishing-coefficient-sum:trap:0",
    stem: "One root of \\((b-c)x^2 + (c-a)x + (a-b) = 0\\) is (test the coefficient sum):",
    correct: f("x = 1"),
    distractors: [
      f("x = \\dfrac{-(c-a) \\pm \\sqrt{(c-a)^2 - 4(b-c)(a-b)}}{2(b-c)}"),
      f("x = -1"),
      f("x = \\dfrac{a-b}{b-c}"),
    ],
    theme: "trap",
  },
  {
    // all three conditions needed, not just the endpoints
    atomKey: "qe-location-of-roots:trap:0",
    stem: "For BOTH roots of an upward parabola \\(f(x)=ax^2+bx+c\\) to lie strictly inside \\((p,q)\\), which is the complete condition set?",
    correct: "\\(D \\ge 0\\), \\(f(p)>0\\), \\(f(q)>0\\), and \\(p < -\\tfrac{b}{2a} < q\\).",
    distractors: [
      "\\(f(p)>0\\) and \\(f(q)>0\\) alone.",
      "\\(f(p)<0\\) and \\(f(q)<0\\).",
      "\\(D \\ge 0\\) alone.",
    ],
    theme: "trap",
  },
  {
    // reject substitution values that violate the domain (u = √x ≥ 0)
    atomKey: "qe-reduce-to-quadratic:trap:0",
    stem: "Solve \\(x - \\sqrt{x} - 6 = 0\\). (Put \\(u = \\sqrt{x} \\ge 0\\).)",
    correct: f("x = 9"),
    distractors: [f("x = 9 \\text{ and } 4"), f("x = 4"), f("x = 3 \\text{ and } -2")],
    theme: "trap",
  },
  {
    // sum of squares uses −2p, difference uses −4p
    atomKey: "qe-symmetric-functions:trap:0",
    stem: "If \\(\\alpha, \\beta\\) are the roots of \\(x^2 - 5x + 6 = 0\\), what is \\(\\alpha^2 + \\beta^2\\)?",
    correct: f("13"),
    distractors: [f("1"), f("25"), f("19")],
    theme: "trap",
  },
  {
    // equal magnitude opposite sign needs b=0 AND c/a<0 (else imaginary)
    atomKey: "qe-special-root-relations:trap:0",
    stem: "The roots of \\(x^2 + 9 = 0\\) (so \\(b = 0\\)) are:",
    correct: "\\(\\pm 3i\\) — imaginary, NOT real \\(\\pm 3\\).",
    distractors: [
      "\\(\\pm 3\\) — real, equal magnitude opposite sign.",
      "\\(3\\) and \\(-3\\) (a double root at \\(3\\)).",
      "\\(0\\) and \\(9\\).",
    ],
    theme: "trap",
  },
  {
    // subtract, don't add — to expose the (m−n) factor
    atomKey: "qe-cross-equation-conditions:trap:0",
    stem: "Given \\(n\\) satisfies \\(t^2+pt+m=0\\) and \\(m\\) satisfies \\(t^2+pt+n=0\\) (with \\(m \\neq n\\)), which operation isolates the usable factor \\((m-n)\\)?",
    correct: "Subtract the two equations.",
    distractors: [
      "Add the two equations.",
      "Multiply the two equations.",
      "Divide one equation by the other.",
    ],
    theme: "trap",
  },
  {
    // "number of real roots" ≠ "sum of all roots"
    atomKey: "qe-reduce-symmetric-substitution:trap:0",
    stem: "After \\(u = x - 3\\), \\((x-2)^4 + (x-4)^4 = k\\) becomes \\(u^4 + Au^2 + B = 0\\). What is the sum of ALL four roots \\(x\\) (real and complex)?",
    correct: f("12"),
    distractors: [f("2 \\text{ (only the real roots count)}"), f("6"), f("0")],
    theme: "trap",
  },
  {
    // don't divide away a root you still need (β ≠ 0 must be checked)
    atomKey: "qe-self-referential-roots:trap:0",
    stem: "If \\(\\alpha\\beta = \\beta\\) with \\(\\beta \\neq 0\\) given, what must \\(\\alpha\\) equal?",
    correct: f("\\alpha = 1"),
    distractors: [
      f("\\alpha = 1 \\text{ or } \\beta = 0"),
      f("\\alpha = 0"),
      f("\\alpha = \\beta"),
    ],
    theme: "trap",
  },
  {
    // enumerate set-equality cases — matched AND swapped (ω, ω² enter)
    atomKey: "qe-structural-root-problems:trap:0",
    stem: "Which root values satisfy \\(\\{\\alpha^2, \\beta^2\\} = \\{\\alpha, \\beta\\}\\)? (Don't forget the swapped case.)",
    correct: "Any of \\(0, 1, \\omega, \\omega^2\\) — including the swapped pair \\(\\omega, \\omega^2\\).",
    distractors: [
      "Only \\(0\\) and \\(1\\) (the matched case).",
      "Only \\(1\\) and \\(-1\\).",
      "Only \\(\\omega\\) and \\(\\omega^2\\).",
    ],
    theme: "trap",
  },
  {
    // reduce the exponent mod 3 first: ω^200 = ω^2
    atomKey: "qe-cube-roots-of-unity:trap:0",
    stem: "For a non-real cube root of unity \\(\\omega\\), simplify \\(\\omega^{200}\\).",
    correct: f("\\omega^2"),
    distractors: [f("\\omega"), f("1"), f("\\omega^{200}")],
    theme: "trap",
  },
  {
    // repeated root is −B/2A, not −B/A
    atomKey: "qe-constructed-symmetric-equations:trap:0",
    stem: "The equation \\(x^2 - 6x + 9 = 0\\) has a repeated root. What is that root?",
    correct: f("3"),
    distractors: [f("6"), f("-3"), f("9")],
    theme: "trap",
  },
  {
    // a negative value of the modulus variable is impossible
    atomKey: "qe-modulus-equations:trap:0",
    stem: "Solve \\(|x-2|^2 + |x-2| - 2 = 0\\). (Put \\(t = |x-2| \\ge 0\\); reject \\(t < 0\\).)",
    correct: f("x = 1,\\ 3"),
    distractors: [f("x = 1,\\ 3,\\ 0,\\ 4"), f("x = 0,\\ 4"), f("x = 2,\\ -2")],
    theme: "trap",
  },
  {
    // look for the unit-root before the formula
    atomKey: "qe-parametric-quadratics:trap:0",
    stem: "What is the fastest way to find a root of \\((a-b)x^2 + (b-c)x + (c-a) = 0\\)?",
    correct: "Note the coefficients sum to \\(0\\), so \\(x = 1\\) is a root.",
    distractors: [
      "Apply \\(x = \\tfrac{-b \\pm \\sqrt{D}}{2a}\\) with symbolic coefficients.",
      "Complete the square in \\(x\\).",
      "Assume the roots are \\(a\\) and \\(b\\).",
    ],
    theme: "trap",
  },
  {
    // solve for the log first, the variable second
    atomKey: "qe-logarithmic-quadratics:trap:0",
    stem: "Solve \\((\\log_{10} x)^2 - 3\\log_{10} x + 2 = 0\\). (The quadratic is in \\(t = \\log_{10} x\\).)",
    correct: f("x = 10,\\ 100"),
    distractors: [f("x = 1,\\ 2"), f("x = 2,\\ 3"), f("x = 100,\\ 1000")],
    theme: "trap",
  },
  {
    // expand the constructed form before reading coefficients
    atomKey: "qe-constructed-from-roots:trap:0",
    stem: "For \\(x^2 - ax - bx + (ab - c) = 0\\), what is the sum of the roots? (Collect like terms first.)",
    correct: f("a + b"),
    distractors: [f("-a \\text{ (the first linear coefficient)}"), f("-(a+b)"), f("ab - c")],
    theme: "trap",
  },
];
