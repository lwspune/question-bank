/**
 * NDA Maths · Differentiation · Core Techniques (diff-core-techniques) ·
 * practiceSet + selfCheck MCQs (computation). Hand-authored distractors, theme=computation.
 *   npm run quiz:verify nda-maths__differentiation-computation-a
 */
import type { VerifiedEntry } from "./nda-maths__probability";

const e = (atomKey: string, distractors: string[]): VerifiedEntry => ({ atomKey, distractors, theme: "computation" });
const f = (s: string) => `\\(${s}\\)`;

export const VERIFIED: VerifiedEntry[] = [
  // diff-chain-rule — correct: f'(g(x))g'(x), 6x cos(3x²), e^{sinx}cosx, -tan x
  e("diff-chain-rule:practiceSet:0", [f("f'(g(x)) + g'(x)"), f("f'(g(x))"), f("f'(x)\\,g'(x)")]),
  e("diff-chain-rule:practiceSet:1", [f("\\cos(3x^2)"), f("6x\\cos(6x)"), f("3x^2\\cos(3x^2)")]),
  e("diff-chain-rule:practiceSet:2", [f("e^{\\sin x}"), f("e^{\\cos x}\\cos x"), f("\\cos x\\,e^{\\sin x - 1}")]),
  e("diff-chain-rule:practiceSet:3", [f("\\tan x"), f("\\dfrac{1}{\\cos x}"), f("-\\dfrac{1}{\\cos x}")]),
  e("diff-chain-rule:selfCheck:0", [f("y' = e^{\\sin x}"), f("y' = e^{\\cos x}\\cos x"), f("y' = e^{\\sin x}\\sin x")]),

  // diff-derivative-wrt-function — correct: (du/dx)/(dv/dx), 2/(3x), -1, "No"
  e("diff-derivative-wrt-function:practiceSet:0", [f("\\dfrac{dv/dx}{du/dx}"), f("\\dfrac{du}{dx}\\cdot\\dfrac{dv}{dx}"), f("\\dfrac{du}{dx}")]),
  e("diff-derivative-wrt-function:practiceSet:1", [f("\\dfrac{2x}{3}"), f("\\dfrac{3x}{2}"), f("\\dfrac{2}{3}")]),
  e("diff-derivative-wrt-function:practiceSet:2", [f("1"), f("-2"), f("0")]),
  e("diff-derivative-wrt-function:practiceSet:3", ["Yes", "Only if \\(v = x\\) up to a constant", "Only for monotonic \\(v\\)"]),
  e("diff-derivative-wrt-function:selfCheck:0", [f("1"), f("-2"), f("\\tan^2 x")]),

  // diff-first-principles — correct: lim def, slope of tangent, f'(a), 2x
  e("diff-first-principles:practiceSet:0", [f("\\lim_{h\\to 0}\\frac{f(x+h)+f(x)}{h}"), f("\\lim_{h\\to 0}\\frac{f(x)-f(x-h)}{2h}"), f("\\frac{f(x+h)-f(x)}{h}")]),
  e("diff-first-principles:practiceSet:1", ["Area under the curve up to \\(x=a\\)", "Value of \\(f\\) at \\(x=a\\)", "Slope of the chord from \\(0\\) to \\(a\\)"]),
  e("diff-first-principles:practiceSet:2", [f("f(a)"), f("f''(a)"), f("0")]),
  e("diff-first-principles:practiceSet:3", [f("x^2"), f("2"), f("x")]),
  e("diff-first-principles:selfCheck:0", [f("g'(1) = -\\dfrac{1}{2\\sqrt{24}}"), f("g'(1) = \\dfrac{1}{2\\sqrt{6}}"), f("g'(1) = -\\dfrac{1}{24}")]),

  // diff-functional-equation — correct: f'(0)f(x), 1, exponential e^{kx}, y=0
  e("diff-functional-equation:practiceSet:0", [f("f'(0) + f(x)"), f("f'(x)f(0)"), f("f(x)f(y)")]),
  e("diff-functional-equation:practiceSet:1", [f("0"), f("-1"), f("2")]),
  e("diff-functional-equation:practiceSet:2", ["Logarithm \\(\\ln x\\)", "Power \\(x^k\\)", "Linear \\(kx\\)"]),
  e("diff-functional-equation:practiceSet:3", [f("x=0"), f("y=x"), f("x=1")]),
  e("diff-functional-equation:selfCheck:0", [f("f'(5) = f'(0) + f(5)"), f("f'(5) = 5\\,f'(0)"), f("f'(5) = f'(0)")]),

  // diff-inverse-trig-simplify — correct: 2/(1+x²), π/2−x, "After — simplify first", -1
  e("diff-inverse-trig-simplify:practiceSet:1", [f("\\dfrac{1}{1+x^2}"), f("\\dfrac{2x}{1+x^2}"), f("\\dfrac{2}{1-x^2}")]),
  e("diff-inverse-trig-simplify:practiceSet:2", [f("x-\\dfrac{\\pi}{2}"), f("\\dfrac{\\pi}{2}+x"), f("\\sin^{-1}(\\cos x)")]),
  e("diff-inverse-trig-simplify:practiceSet:3", ["Before — differentiate directly", "Order makes no difference", "Substitute \\(x=\\sin\\theta\\) and differentiate without simplifying"]),
  e("diff-inverse-trig-simplify:selfCheck:0", [f("\\dfrac{dy}{dx} = 1"), f("\\dfrac{dy}{dx} = -\\dfrac{1}{\\sqrt{1-\\sin^2 x}}"), f("\\dfrac{dy}{dx} = \\dfrac{\\pi}{2}-x")]),

  // diff-logarithmic — correct: take ln of both sides, x^x(1+ln x), (1/y)(dy/dx), y=a^y
  e("diff-logarithmic:practiceSet:0", ["Apply the product rule directly", "Differentiate the exponent first", "Take \\(\\log_{10}\\) of one side only"]),
  e("diff-logarithmic:practiceSet:1", [f("x\\cdot x^{x-1}"), f("x^x\\ln x"), f("x^x")]),
  e("diff-logarithmic:practiceSet:2", [f("\\frac{1}{y}"), f("\\ln y\\,\\frac{dy}{dx}"), f("\\frac{dy}{dx}")]),
  e("diff-logarithmic:practiceSet:3", [f("y = y^{a}"), f("y = a^{x}"), f("y = a\\,y")]),

  // diff-product-quotient — correct: u'v+uv', (u'v−uv')/v², 2x sinx + x²cosx, "No"
  e("diff-product-quotient:practiceSet:0", [f("u'v'"), f("u'v - uv'"), f("\\dfrac{u'v + uv'}{v^2}")]),
  e("diff-product-quotient:practiceSet:1", [f("\\dfrac{uv' - u'v}{v^2}"), f("\\dfrac{u'v - uv'}{v}"), f("\\dfrac{u'}{v'}")]),
  e("diff-product-quotient:practiceSet:2", [f("2x\\cos x"), f("2x\\sin x - x^2\\cos x"), f("2x\\sin x + x^2\\sin x")]),
  e("diff-product-quotient:practiceSet:3", ["Yes", "Only when \\(u = v\\)", "Only for polynomials"]),
  e("diff-product-quotient:selfCheck:0", [f("y' = \\dfrac{1}{1+x}"), f("y' = \\dfrac{-1}{(1+x)^2}"), f("y' = \\dfrac{2x+1}{(1+x)^2}")]),

  // diff-standard-derivatives — correct: a^x ln a, 1/(1+x²), 1/(x ln a), "Radians"
  e("diff-standard-derivatives:practiceSet:0", [f("x\\,a^{x-1}"), f("a^x"), f("\\dfrac{a^x}{\\ln a}")]),
  e("diff-standard-derivatives:practiceSet:1", [f("\\dfrac{1}{1-x^2}"), f("\\dfrac{-1}{1+x^2}"), f("\\dfrac{1}{\\sqrt{1-x^2}}")]),
  e("diff-standard-derivatives:practiceSet:2", [f("\\dfrac{1}{x}"), f("\\dfrac{\\ln a}{x}"), f("\\dfrac{1}{x\\ln 10}")]),
  e("diff-standard-derivatives:practiceSet:3", ["Degrees", "Gradians", "Any consistent unit"]),
];
