/**
 * NDA Maths · Differential Equations · COMMON-TRAPS theme — "spot the value/mistake" MCQs.
 * One per misconception callout authored into the notes. The chapter had 8 callouts
 * (1 per concept) and was topped up to 12 with 4 NEW callouts (appended after the
 * existing one in their concept's `traps` array → index :1):
 *   order-and-degree:trap:1                    (degree undefined inside a transcendental)
 *   forming-ode-by-elimination:trap:1          (order of resulting ODE = #constants)
 *   separable-variables:trap:1                 (exactly ONE arbitrary constant)
 *   linear-equations-integrating-factor:trap:1 (standard form before reading P)
 * The first distractor in each is the warned mistake.
 *   npm run quiz:verify nda-maths__differential-equations-traps
 */
import type { VerifiedEntry } from "./nda-maths__probability";

const f = (s: string) => `\\(${s}\\)`;

export const VERIFIED: VerifiedEntry[] = [
  // ── order-and-degree ──
  {
    // clear fractional powers BEFORE reading the degree
    atomKey: "order-and-degree:trap:0",
    stem: "What is the degree of \\(\\big(2-(y')^2\\big)^{0.6} = y''\\)?",
    correct: f("5"),
    distractors: [f("0.6"), f("3"), f("2")],
    theme: "trap",
  },
  {
    // degree undefined when a derivative is inside a transcendental — NEW callout
    atomKey: "order-and-degree:trap:1",
    stem: "What is the degree of \\(\\dfrac{d^2y}{dx^2} + \\sin\\!\\big(\\tfrac{dy}{dx}\\big) = 0\\)?",
    correct: "Undefined",
    distractors: [f("1"), f("2"), f("0")],
    theme: "trap",
  },

  // ── solutions-and-arbitrary-constants ──
  {
    // y = A[sin(x+C)+cos(x+C)] collapses to B sin(x+D) → 2 constants → order 2
    atomKey: "solutions-and-arbitrary-constants:trap:0",
    stem: "What is the order of the ODE whose solution is \\(y = A\\big[\\sin(x+C)+\\cos(x+C)\\big]\\)?",
    correct: f("2"),
    distractors: [f("3"), f("4"), f("1")],
    theme: "trap",
  },

  // ── forming-ode-by-elimination ──
  {
    // y² = 4a(x-b) → 2 constants → order 2
    atomKey: "forming-ode-by-elimination:trap:0",
    stem: "How many times must you differentiate the two-constant family \\(y^2 = 4a(x-b)\\) to eliminate the constants?",
    correct: "Twice",
    distractors: ["Once", "Three times", "Four times"],
    theme: "trap",
  },
  {
    // order of the eliminated ODE = number of arbitrary constants — NEW callout
    atomKey: "forming-ode-by-elimination:trap:1",
    stem: "What is the order of the differential equation obtained by eliminating the constants from \\(y = Ae^{2x} + Be^{-3x}\\)?",
    correct: f("2"),
    distractors: [f("1"), f("3"), f("6")],
    theme: "trap",
  },

  // ── matching-ode-to-solution ──
  {
    // a/2 x² - b/2 y² is a circle only when a = -b
    atomKey: "matching-ode-to-solution:trap:0",
    stem: "Integrating \\(\\dfrac{dy}{dx}=\\dfrac{ax}{by}\\) gives a CIRCLE only when?",
    correct: f("a = -b\\neq 0"),
    distractors: [f("a = b"), f("a = b = 0"), f("ab = 1")],
    theme: "trap",
  },

  // ── separable-variables ──
  {
    // ln(dy/dx)=ax+by → exponentiate to separate
    atomKey: "separable-variables:trap:0",
    stem: "After exponentiating \\(\\ln\\!\\big(\\tfrac{dy}{dx}\\big)=x+y\\), which separated form is correct?",
    correct: f("e^{-y}\\,dy = e^{x}\\,dx"),
    distractors: [f("e^{y}\\,dy = e^{x}\\,dx"), f("e^{-y}\\,dy = e^{-x}\\,dx"), f("(x+y)\\,dy = dx")],
    theme: "trap",
  },
  {
    // exactly ONE arbitrary constant after integrating both sides — NEW callout
    atomKey: "separable-variables:trap:1",
    stem: "Integrating \\(\\int e^{y}\\,dy = \\int e^{x}\\,dx\\) gives which (correct) general solution?",
    correct: f("e^{y} = e^{x} + c"),
    distractors: [f("e^{y} + c_1 = e^{x} + c_2"), f("e^{y} = e^{x}"), f("e^{y} = e^{x} + c_1 + c_2")],
    theme: "trap",
  },

  // ── reducible-by-substitution ──
  {
    // spot the glued x+y → substitute v=x+y
    atomKey: "reducible-by-substitution:trap:0",
    stem: "To solve \\(\\dfrac{dy}{dx} = \\cos(x+y)\\), what is the right substitution?",
    correct: f("v = x+y"),
    distractors: [f("v = xy"), f("v = x/y"), f("v = y/x")],
    theme: "trap",
  },
  {
    // exact-differential sign — NEW callout (top-up 2026-06-12)
    atomKey: "reducible-by-substitution:trap:1",
    stem: "Which exact-differential identity has the CORRECT sign?",
    correct: f("\\frac{x\\,dy - y\\,dx}{y^2} = d\\!\\left(\\tfrac{x}{y}\\right)"),
    distractors: [f("\\frac{y\\,dx - x\\,dy}{y^2} = d\\!\\left(\\tfrac{x}{y}\\right)"), f("\\frac{x\\,dy + y\\,dx}{y^2} = d\\!\\left(\\tfrac{x}{y}\\right)"), f("\\frac{x\\,dy - y\\,dx}{x^2} = d\\!\\left(\\tfrac{x}{y}\\right)")],
    theme: "trap",
  },

  // ── linear-equations-integrating-factor ──
  {
    // not linear in y → try linear in x: y dx-(x+2y²)dy=0
    atomKey: "linear-equations-integrating-factor:trap:0",
    stem: "\\(y\\,dx - (x+2y^2)\\,dy = 0\\) is not linear in \\(y\\). Rewriting it linear in \\(x\\) gives which standard form?",
    correct: f("\\frac{dx}{dy} - \\frac{x}{y} = 2y"),
    distractors: [f("\\frac{dy}{dx} - \\frac{y}{x} = 2x"), f("\\frac{dx}{dy} + \\frac{x}{y} = 2y"), f("\\frac{dx}{dy} - x = 2y^2")],
    theme: "trap",
  },
  {
    // Bernoulli substitution exponent — NEW callout (top-up 2026-06-12); the
    // notes callout at this index is the Bernoulli v=y^{1-n} warning.
    atomKey: "linear-equations-integrating-factor:trap:1",
    stem: "To linearise the Bernoulli equation \\(\\dfrac{dy}{dx}+Py=Qy^{2}\\), which substitution is correct?",
    correct: f("v = y^{-1}"),
    distractors: [f("v = y"), f("v = y^{2}"), f("v = y^{-2}")],
    theme: "trap",
  },

  // ── applications-and-ivp ──
  {
    // apply the IC to the GENERAL solution: dy/dx=(ln5)y, y(0)=ln5 → y(1)=5ln5
    atomKey: "applications-and-ivp:trap:0",
    stem: "If \\(\\dfrac{dy}{dx} = (\\ln 5)\\,y\\) with \\(y(0)=\\ln 5\\), find \\(y(1)\\) (solve generally first, THEN apply the condition).",
    correct: f("5\\ln 5"),
    distractors: [f("\\ln 5"), f("5"), f("\\ln 25")],
    theme: "trap",
  },
];
