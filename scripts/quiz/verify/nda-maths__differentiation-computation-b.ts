/**
 * NDA Maths · Differentiation · diff-differentiability + diff-parametric-implicit-higher
 * practiceSet + selfCheck MCQs (computation). Hand-authored distractors, theme=computation.
 *   npm run quiz:verify nda-maths__differentiation-computation-b
 */
import type { VerifiedEntry } from "./nda-maths__probability";

const e = (atomKey: string, distractors: string[]): VerifiedEntry => ({ atomKey, distractors, theme: "computation" });
const f = (s: string) => `\\(${s}\\)`;

export const VERIFIED: VerifiedEntry[] = [
  // ── diff-differentiability ──────────────────────────────────────────────

  // diff-differentiable-implies-continuous (correct: differentiable ⇒ continuous)
  e("diff-differentiable-implies-continuous:practiceSet:0", [
    "Differentiable everywhere",
    "Not necessarily continuous at " + f("c"),
    "Bounded near " + f("c"),
  ]),
  e("diff-differentiable-implies-continuous:practiceSet:1", [
    "Yes, always",
    "Yes, by the chain rule",
    "Only if " + f("f") + " is also bounded",
  ]),
  e("diff-differentiable-implies-continuous:practiceSet:2", [
    "Yes, always",
    "Yes, if the jump is finite",
    "Only at the point of discontinuity",
  ]),
  e("diff-differentiable-implies-continuous:practiceSet:3", [
    f("x^2") + " at " + f("x=0"),
    f("\\sin x") + " at " + f("x=0"),
    f("e^x") + " at " + f("x=0"),
  ]),
  e("diff-differentiable-implies-continuous:selfCheck:0", [
    "True.",
    "True, by the mean value theorem.",
    "Only on closed intervals.",
  ]),

  // diff-greatest-integer
  e("diff-greatest-integer:practiceSet:0", [f("1"), f("x"), "Does not exist"]),
  e("diff-greatest-integer:practiceSet:1", ["Yes", "Yes (slope 1)", "Yes (constant)"]),
  e("diff-greatest-integer:practiceSet:2", ["No (jump discontinuity)", "No (corner)", "Only at integers"]),
  e("diff-greatest-integer:practiceSet:3", [f("1"), f("x"), "Does not exist"]),

  // diff-lhd-rhd-test
  e("diff-lhd-rhd-test:practiceSet:0", [
    "LHD and RHD both nonzero",
    "Only continuity at the point",
    "LHD " + f("=") + " RHD " + f("= 0"),
  ]),
  e("diff-lhd-rhd-test:practiceSet:1", [
    "The value of the second derivative",
    "That LHD " + f("=") + " RHD",
    "The sign of the slope",
  ]),
  e("diff-lhd-rhd-test:practiceSet:2", [f("1"), f("-2"), f("3")]),
  e("diff-lhd-rhd-test:practiceSet:3", [
    "Yes (continuous there)",
    "Yes (both finite)",
    "Only if the function is continuous",
  ]),

  // diff-modulus-corners
  e("diff-modulus-corners:practiceSet:0", [
    "Yes (slope " + f("0") + ")",
    "Yes (slope " + f("1") + ")",
    "Yes (it is continuous there)",
  ]),
  e("diff-modulus-corners:practiceSet:1", [f("x=0"), f("x=-5"), "Everywhere"]),
  e("diff-modulus-corners:practiceSet:2", [
    "No (corner: slopes " + f("-1, +1") + ")",
    "No (cusp)",
    "Only continuous, not differentiable",
  ]),
  e("diff-modulus-corners:practiceSet:3", [
    "No (corner there)",
    "Only for " + f("x>0"),
    "No (slopes differ)",
  ]),

  // diff-parameter-problems
  e("diff-parameter-problems:practiceSet:3", [f("a=1"), f("a=0"), f("a=-2")]),
  e("diff-parameter-problems:selfCheck:0", [
    f("a=0,\\ b=1"),
    f("a=1,\\ b=0"),
    f("a=2,\\ b=1"),
  ]),

  // diff-via-limit-definition
  e("diff-via-limit-definition:practiceSet:0", [
    f("\\lim_{h\\to 0}\\frac{f(c)-f(c+h)}{h}"),
    f("\\lim_{h\\to 0}\\frac{f(c+h)-f(c)}{f(c)}"),
    f("\\lim_{h\\to 0}\\frac{f(c+h)+f(c)}{h}"),
  ]),
  e("diff-via-limit-definition:practiceSet:1", [f("1"), f("-\\infty"), "Does not exist"]),
  e("diff-via-limit-definition:selfCheck:0", [
    f("f'(0)=1"),
    f("f'(0)=2"),
    f("f'(0)") + " does not exist",
  ]),

  // ── diff-parametric-implicit-higher ─────────────────────────────────────

  // diff-higher-order
  e("diff-higher-order:practiceSet:0", [
    f("\\left(\\dfrac{dy}{dx}\\right)^2"),
    "The derivative taken twice w.r.t. " + f("y"),
    f("\\dfrac{d^2x}{dy^2}"),
  ]),
  e("diff-higher-order:practiceSet:1", [f("a\\,e^{ax}"), f("n\\,a\\,e^{ax}"), f("e^{ax}")]),
  e("diff-higher-order:practiceSet:2", [f("4x^3"), f("24x"), f("12x^3")]),
  e("diff-higher-order:practiceSet:3", ["Before", "Either gives the same answer", "Only for polynomials"]),
  e("diff-higher-order:selfCheck:0", [f("1"), f("-1"), "Does not exist"]),

  // diff-implicit
  e("diff-implicit:practiceSet:0", [f("3y^2"), f("3y^2 + \\dfrac{dy}{dx}"), f("y^3\\dfrac{dy}{dx}")]),
  e("diff-implicit:practiceSet:1", [f("x/y"), f("-y/x"), f("y/x")]),
  e("diff-implicit:practiceSet:2", ["Chain rule", "Quotient rule", "Power rule"]),
  e("diff-implicit:practiceSet:3", ["Yes, always", "Yes, to apply the power rule", "Only for polynomial relations"]),
  e("diff-implicit:selfCheck:0", [
    f("\\dfrac{dy}{dx} = \\dfrac{y}{x}"),
    f("\\dfrac{dy}{dx} = \\dfrac{1}{x^2}"),
    f("\\dfrac{dy}{dx} = -x y"),
  ]),

  // diff-implicit-logarithmic
  e("diff-implicit-logarithmic:practiceSet:0", [
    "Square both sides",
    "Differentiate term by term first",
    "Isolate " + f("y") + " first",
  ]),
  e("diff-implicit-logarithmic:practiceSet:1", [f("mn\\ln(xy)"), f("\\ln x^m + \\ln y^n - \\ln(xy)"), f("m + n\\ln(xy)")]),
  e("diff-implicit-logarithmic:practiceSet:2", [f("-\\dfrac{nx}{my}"), f("\\dfrac{my}{nx}"), f("-\\dfrac{m}{n}")]),
  e("diff-implicit-logarithmic:selfCheck:0", [
    f("\\dfrac{dy}{dx} = -\\dfrac{y}{x}"),
    f("\\dfrac{dy}{dx} = \\dfrac{y}{x\\ln x}"),
    f("\\dfrac{dy}{dx} = -\\dfrac{\\ln x}{y}"),
  ]),

  // diff-parametric
  e("diff-parametric:practiceSet:0", [
    f("\\dfrac{dx/dt}{dy/dt}"),
    f("\\dfrac{dy}{dt}\\cdot\\dfrac{dx}{dt}"),
    f("\\dfrac{d^2y/dt^2}{d^2x/dt^2}"),
  ]),
  e("diff-parametric:practiceSet:1", [f("\\frac{2}{3t}"), f("3t^2"), f("\\frac{2t}{3}")]),
  e("diff-parametric:practiceSet:3", [f("dy/dt \\neq 0"), f("dx/dt = dy/dt"), f("t \\neq 0")]),
  e("diff-parametric:selfCheck:0", [
    f("\\dfrac{dy}{dx} = \\cot\\theta"),
    f("\\dfrac{dy}{dx} = -\\tan\\theta"),
    f("\\dfrac{dy}{dx} = \\tan\\theta"),
  ]),

  // diff-proves-differential-equation
  e("diff-proves-differential-equation:practiceSet:1", [f("2e^{2x}"), f("e^{2x}"), f("4e^{x}")]),
  e("diff-proves-differential-equation:practiceSet:2", [
    f("\\sin(\\ln x)"),
    f("-\\sin(\\ln x)"),
    f("\\dfrac{\\cos(\\ln x)}{x}"),
  ]),
  e("diff-proves-differential-equation:selfCheck:0", [
    "Not satisfied.",
    "Satisfied only at " + f("x=1") + ".",
    "Satisfied only for " + f("x>0") + " near " + f("0") + ".",
  ]),

  // diff-second-derivative-inverse
  e("diff-second-derivative-inverse:practiceSet:0", [
    f("\\dfrac{dy}{dx}"),
    f("-\\dfrac{dy}{dx}"),
    f("1 - \\dfrac{dy}{dx}"),
  ]),
  e("diff-second-derivative-inverse:practiceSet:1", [
    f("\\dfrac{d^2y/dx^2}{(dy/dx)^3}"),
    f("-\\dfrac{d^2y/dx^2}{(dy/dx)^2}"),
    f("\\dfrac{1}{d^2y/dx^2}"),
  ]),
  e("diff-second-derivative-inverse:practiceSet:3", [f("5"), f("-10"), f("-4")]),
];
