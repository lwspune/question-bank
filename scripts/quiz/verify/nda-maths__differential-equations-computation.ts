/**
 * NDA Maths · Differential Equations · practiceSet + selfCheck MCQs (computation).
 * Hand-authored distractors, theme=computation. Every `correct` re-derived — all
 * 31 MCQ-clean computation answers checked out; NO notes errors found.
 *
 * Skipped (looksMcqClean=false in the JSON — not MCQ-able / criterion-less):
 *   solutions-and-arbitrary-constants:practiceSet:2  (the notes `answer` string is
 *     a broken "1... actually 2 constants (centre + radius) → 2"; the real answer
 *     is order 2 — left to a notes-side cleanup, not surfaced as a quiz).
 *   matching-ode-to-solution:practiceSet:0           ("To confirm a family solves
 *     an ODE, you?" — criterion-less recall).
 *   linear-equations-integrating-factor:practiceSet:0 ("Integrating factor for
 *     dy/dx+Py=Q?" — the formula itself, covered by the formula file).
 * The 8 `trap` atoms + the 2 `formula` atoms are in the -traps / -formulas files.
 *   npm run quiz:verify nda-maths__differential-equations-computation
 */
import type { VerifiedEntry } from "./nda-maths__probability";

const e = (atomKey: string, distractors: string[]): VerifiedEntry => ({ atomKey, distractors, theme: "computation" });
const f = (s: string) => `\\(${s}\\)`;

export const VERIFIED: VerifiedEntry[] = [
  // ── order-and-degree ──
  // (y''')² = y⁴ + (y')⁵ → order 3, degree 2 (power of highest deriv)
  e("order-and-degree:practiceSet:0", ["Order 3, degree 5", "Order 5, degree 3", "Order 3, degree 4"]),
  // dy/dx inside cos → degree undefined
  e("order-and-degree:practiceSet:1", ["1", "2", "0"]),
  // (y'')^{3/2}=(y')^{5/2} → square → (y'')³=(y')⁵ → degree 3
  e("order-and-degree:practiceSet:2", ["5", "2", "\\tfrac32"]),
  // x²y''' - y' = 0 → highest derivative is y''' → order 3
  e("order-and-degree:practiceSet:3", ["1", "2", "5"]),
  // cube to clear ^{2/3}: (y'')³ = [...]² → order 2, degree 3
  e("order-and-degree:selfCheck:0", ["Order 2, degree 2", "Order 3, degree 2", "Order 2, degree undefined"]),

  // ── solutions-and-arbitrary-constants ──
  // 3 arbitrary constants → order 3
  e("solutions-and-arbitrary-constants:practiceSet:0", ["1", "2", "6"]),
  // + sign → SHM/periodic; - sign → exponential
  e("solutions-and-arbitrary-constants:practiceSet:1", [f("y''-9y=0"), "Both have periodic solutions", "Neither has periodic solutions"]),
  // y = a cos x + b sin x → 2 constants → order 2
  e("solutions-and-arbitrary-constants:selfCheck:0", ["Order 1.", "Order 3.", "Order 0."]),

  // ── forming-ode-by-elimination ──
  // n constants need n differentiations → 2 constants → twice
  e("forming-ode-by-elimination:practiceSet:0", ["Once", "Three times", "Not at all"]),
  // y = A - B/x → x y'' + 2y' = 0
  e("forming-ode-by-elimination:practiceSet:1", [f("x^2 y'' - 2y' = 0"), f("xy'' - 2y' = 0"), f("y'' + 2y' = 0")]),
  // y = eˣ(a cos x + b sin x) → y'' - 2y' + 2y = 0
  e("forming-ode-by-elimination:practiceSet:2", [f("y'' + 2y' + 2y = 0"), f("y'' - 2y' - 2y = 0"), f("y'' - 2y' + y = 0")]),
  // x² = 4ay (one constant) → x y' = 2y
  e("forming-ode-by-elimination:selfCheck:0", [f("y\\dfrac{dy}{dx} - 2x = 0."), f("x\\dfrac{dy}{dx} + 2y = 0."), f("2x\\dfrac{dy}{dx} - y = 0.")]),

  // ── matching-ode-to-solution ──
  // x² - y² = c → opposite-sign squares → hyperbola
  e("matching-ode-to-solution:practiceSet:1", ["Circle", "Ellipse", "Parabola"]),
  // equal same-sign x² and y² coefficients → circle
  e("matching-ode-to-solution:practiceSet:2", ["Hyperbola", "Ellipse", "Pair of straight lines"]),
  // circle only when a = -b ≠ 0
  e("matching-ode-to-solution:selfCheck:0", [f("a = b\\neq 0."), f("a = -b = 0."), f("ab = 1.")]),

  // ── separable-variables ──
  // x dy - y dx = 0 → dy/y = dx/x → y = cx
  e("separable-variables:practiceSet:0", [f("y = x + c"), f("xy = c"), f("y = ce^{x}")]),
  // dy/dx = e^{2y} → e^{-2y} dy = dx
  e("separable-variables:practiceSet:1", [f("e^{2y}\\,dy = dx"), f("e^{-2y}\\,dx = dy"), f("2y\\,dy = dx")]),
  // dy/dx = (ln 5)y → y = A·5ˣ
  e("separable-variables:practiceSet:2", [f("y = A\\cdot e^{5x}"), f("y = A x^{\\ln 5}"), f("y = (\\ln 5)x + A")]),
  // single arbitrary constant must be added after integrating
  e("separable-variables:practiceSet:3", ["Modulus signs", "Limits of integration", "Integrating factor"]),
  // ln(dy/dx)+y=x → eˣ - eʸ = c
  e("separable-variables:selfCheck:0", [f("e^{x} + e^{y} = c."), f("e^{y} - e^{x} = c."), f("e^{x-y} = c.")]),

  // ── reducible-by-substitution ──
  // equation in x+y → substitute v = x+y
  e("reducible-by-substitution:practiceSet:0", [f("v = xy"), f("v = x/y"), f("v = x-y")]),
  // x dy + y dx = d(xy)
  e("reducible-by-substitution:practiceSet:1", [f("d(x/y)"), f("d(x+y)"), f("d(x^2+y^2)")]),
  // (x dy - y dx)/y² = d(x/y)
  e("reducible-by-substitution:practiceSet:2", [f("d(xy)"), f("d(y/x)"), f("d(x-y)")]),
  // dx/dy=(x+y+1)/(x+y-1), v=x+y → x - y - ln|x+y| = c
  e("reducible-by-substitution:selfCheck:0", [f("x + y - \\ln|x+y| = c."), f("x - y + \\ln|x+y| = c."), f("y - x - \\ln|x+y| = c.")]),

  // ── linear-equations-integrating-factor ──
  // dy/dx + (1/x)y → μ = e^{∫(1/x)dx} = e^{ln x} = x
  e("linear-equations-integrating-factor:practiceSet:1", [f("\\ln x"), f("\\tfrac1x"), f("e^{x}")]),
  // Bernoulli dy/dx+Py=Qy² → v = y^{1-n} = y^{-1}
  e("linear-equations-integrating-factor:practiceSet:2", [f("v = y^{2}"), f("v = y"), f("v = x^{-1}")]),
  // y dx - (x+2y²)dy = 0 → linear in x → x = 2y² + cy
  e("linear-equations-integrating-factor:selfCheck:0", [f("y = 2x^2 + cx."), f("x = 2y^2 + c."), f("x = y^2 + cy.")]),

  // ── applications-and-ivp ──
  // dy/dt = ky → y = y₀ e^{kt}
  e("applications-and-ivp:practiceSet:0", [f("y = y_0 + kt"), f("y = y_0 e^{-kt}"), f("y = kt^{y_0}")]),
  // radioactive decay → amount falls → k < 0
  e("applications-and-ivp:practiceSet:1", ["greater than (k > 0)", "equal to (k = 0)", "either sign"]),
  // (y')² - x y' = 0 → y'(y'-x)=0 → y=c or y=x²/2+c
  e("applications-and-ivp:practiceSet:2", [
    "\\(y'(y'+x)=0\\): \\(y=c\\) or \\(y=-\\frac{x^2}{2}+c\\)",
    "\\(y'=x\\) only: \\(y=\\frac{x^2}{2}+c\\)",
    "\\((y'-x)^2=0\\): \\(y=\\frac{x^2}{2}+c\\)",
  ]),
  // y = A·5ˣ, A = ln 5 → y(1) = 5 ln 5
  e("applications-and-ivp:selfCheck:0", [f("\\ln 5."), f("5."), f("\\ln 25.")]),
];
