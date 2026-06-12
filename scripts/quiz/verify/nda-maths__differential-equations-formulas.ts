/**
 * NDA Maths · Differential Equations · FORMULA-recall MCQs.
 * One entry per `formula.latex` piece authored into the notes _data (pieces are
 * \qquad-joined, so the key index = position in that concept's bundle, 0-based).
 * Distractors are full-equation permutations — wrong versions of the SAME
 * identity, same shape (no length/format tell).
 *
 * Enriched concepts (genuine recallable formulas):
 *   order-and-degree            (definitional: order / degree)   → 0,1
 *   separable-variables         (∫dy/g(y)=∫f(x)dx)               → 0   (single, non-bundle)
 *   linear-equations-integrating-factor (IF + product-rule + solution) → 0,1,2
 *   applications-and-ivp        (growth/decay + #constants=order) → 0,1
 * Skipped as TECHNIQUES (no recallable equation, formula.latex left empty):
 *   forming-ode-by-elimination (differentiate-and-eliminate recipe),
 *   matching-ode-to-solution   (verification / circle-condition method),
 *   reducible-by-substitution  (substitute the glued combination — a move, not a formula).
 *   npm run quiz:verify nda-maths__differential-equations-formulas
 */
import type { VerifiedEntry } from "./nda-maths__probability";

const f = (s: string) => `\\(${s}\\)`;

export const VERIFIED: VerifiedEntry[] = [
  // ── order-and-degree: order def | degree def ──
  {
    atomKey: "order-and-degree:formula:0",
    stem: "How is the ORDER of a differential equation defined?",
    correct: "The order of the highest-order derivative present",
    distractors: [
      "The power of the highest-order derivative present",
      "The total number of derivative terms in the equation",
      "The highest power of the dependent variable",
    ],
    theme: "formula",
  },
  {
    atomKey: "order-and-degree:formula:1",
    stem: "How is the DEGREE of a differential equation defined?",
    correct: "The power of the highest-order derivative, after the equation is made polynomial in the derivatives",
    distractors: [
      "The order of the highest derivative present",
      "The power of the highest-order derivative, exactly as it first appears",
      "The highest power of any derivative anywhere in the equation",
    ],
    theme: "formula",
  },

  // ── separable-variables: ∫dy/g(y) = ∫f(x)dx + C (single, non-bundle) ──
  {
    atomKey: "separable-variables:formula:0",
    stem: "Which is the correct integrated form of a separable equation \\(g(y)\\,dy = f(x)\\,dx\\)?",
    correct: f("\\int \\frac{dy}{g(y)} = \\int f(x)\\,dx + C"),
    distractors: [
      f("\\int g(y)\\,dy = \\int f(x)\\,dx + C"),
      f("\\int \\frac{dy}{g(y)} = \\int \\frac{dx}{f(x)} + C"),
      f("\\int g(y)\\,dy = \\int \\frac{dx}{f(x)} + C"),
    ],
    theme: "formula",
  },

  // ── linear-equations-integrating-factor: μ=e^∫P | d/dx(μy)=μQ | yμ=∫Qμ dx+c ──
  {
    atomKey: "linear-equations-integrating-factor:formula:0",
    stem: "For the linear ODE \\(\\dfrac{dy}{dx}+P(x)\\,y=Q(x)\\), what is the integrating factor \\(\\mu\\)?",
    correct: f("\\mu = e^{\\int P(x)\\,dx}"),
    distractors: [
      f("\\mu = e^{\\int Q(x)\\,dx}"),
      f("\\mu = e^{-\\int P(x)\\,dx}"),
      f("\\mu = \\int P(x)\\,dx"),
    ],
    theme: "formula",
  },
  {
    atomKey: "linear-equations-integrating-factor:formula:1",
    stem: "After multiplying the linear ODE by its integrating factor \\(\\mu\\), the left side becomes which exact derivative?",
    correct: f("\\frac{d}{dx}(\\mu y) = \\mu Q"),
    distractors: [
      f("\\frac{d}{dx}(\\mu y) = \\mu P"),
      f("\\frac{d}{dx}(\\mu) = \\mu Q"),
      f("\\frac{d}{dx}\\!\\left(\\frac{y}{\\mu}\\right) = \\mu Q"),
    ],
    theme: "formula",
  },
  {
    atomKey: "linear-equations-integrating-factor:formula:2",
    stem: "What is the general solution of \\(\\dfrac{dy}{dx}+Py=Q\\) in terms of the integrating factor \\(\\mu\\)?",
    correct: f("y\\,\\mu = \\int Q\\,\\mu\\,dx + c"),
    distractors: [
      f("y\\,\\mu = \\int P\\,\\mu\\,dx + c"),
      f("y = \\int Q\\,\\mu\\,dx + c"),
      f("\\frac{y}{\\mu} = \\int Q\\,\\mu\\,dx + c"),
    ],
    theme: "formula",
  },

  // ── applications-and-ivp: growth/decay | #constants=order ──
  {
    atomKey: "applications-and-ivp:formula:0",
    stem: "What is the solution of the growth/decay equation \\(\\dfrac{dN}{dt}=kN\\)?",
    correct: f("N = N_0 e^{kt}"),
    distractors: [
      f("N = N_0 e^{-kt}"),
      f("N = N_0 + kt"),
      f("N = N_0 e^{k}t"),
    ],
    theme: "formula",
  },
  {
    atomKey: "applications-and-ivp:formula:1",
    stem: "How does the number of arbitrary constants in a general solution relate to the differential equation?",
    correct: "It equals the order of the equation",
    distractors: [
      "It equals the degree of the equation",
      "It equals (order + degree) of the equation",
      "It is always one, regardless of order",
    ],
    theme: "formula",
  },
];
