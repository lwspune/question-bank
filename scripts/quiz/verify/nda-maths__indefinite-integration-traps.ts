/**
 * NDA Maths · Indefinite Integration · COMMON-TRAPS theme — concrete
 * "spot the value / spot the mistake" MCQs. One per misconception callout
 * authored into the notes (each concept's only trap → index 0). The first
 * distractor in each is the WARNED mistake (tempting wrong answer).
 *   npm run quiz:verify nda-maths__indefinite-integration-traps
 */
import type { VerifiedEntry } from "./nda-maths__probability";

const f = (s: string) => `\\(${s}\\)`;

export const VERIFIED: VerifiedEntry[] = [
  {
    // never drop the +C
    atomKey: "antiderivative-and-c:trap:0",
    stem: "Which is the COMPLETE indefinite integral \\(\\displaystyle\\int 2x\\,dx\\)?",
    correct: f("x^2 + C"),
    distractors: [f("x^2"), f("2"), f("x^2 + 2x")],
    theme: "trap",
  },
  {
    // power rule excludes n=-1
    atomKey: "standard-formula-table:trap:0",
    stem: "What is \\(\\displaystyle\\int x^{-1}\\,dx\\)?",
    correct: f("\\ln|x| + C"),
    distractors: [f("\\dfrac{x^0}{0} + C"), f("-x^{-2} + C"), f("\\dfrac{x^0}{1} + C")],
    theme: "trap",
  },
  {
    // can't split a product like a sum
    atomKey: "linearity-term-by-term:trap:0",
    stem: "Which step is VALID for \\(\\displaystyle\\int \\dfrac{1}{x(x^2+1)}\\,dx\\)?",
    correct: "Use partial fractions or substitution — it is a product, not a sum.",
    distractors: [
      "\\(\\int\\dfrac{1}{x}\\,dx \\cdot \\int\\dfrac{1}{x^2+1}\\,dx\\)",
      "\\(\\int\\dfrac{1}{x}\\,dx + \\int\\dfrac{1}{x^2+1}\\,dx\\)",
      "\\(\\dfrac{1}{\\int x(x^2+1)\\,dx}\\)",
    ],
    theme: "trap",
  },
  {
    // resolve exp/log before integrating
    atomKey: "simplify-integrand-first:trap:0",
    stem: "What is \\(\\displaystyle\\int e^{\\ln(\\tan x)}\\,dx\\)?",
    correct: f("\\ln|\\sec x| + C"),
    distractors: [
      f("e^{\\ln(\\tan x)} + C"),
      f("\\tan x\\,\\ln(\\tan x) + C"),
      f("\\sec^2 x + C"),
    ],
    theme: "trap",
  },
  {
    // divide by ln a, not a
    atomKey: "exponential-bases:trap:0",
    stem: "What is \\(\\displaystyle\\int 2^x\\,dx\\)?",
    correct: f("\\dfrac{2^x}{\\ln 2} + C"),
    distractors: [f("\\dfrac{2^x}{2} + C"), f("2^x\\ln 2 + C"), f("\\dfrac{2^{x+1}}{x+1} + C")],
    theme: "trap",
  },
  {
    // factor out leading coefficient first
    atomKey: "complete-the-square-arctan:trap:0",
    stem: "To integrate \\(\\displaystyle\\int\\dfrac{dx}{2x^2-2x+1}\\), what must you do FIRST?",
    correct: "Factor the 2 out of the whole denominator, then complete the square.",
    distractors: [
      "Complete the square on \\(2x^2-2x+1\\) directly.",
      "Apply the arctan form with \\(k^2=1\\).",
      "Split it by partial fractions over real linear factors.",
    ],
    theme: "trap",
  },
  {
    // whole bracket must be f+f'
    atomKey: "ex-f-plus-fprime:trap:0",
    stem: "What is \\(\\displaystyle\\int e^x\\big(\\sin x + \\cos x\\big)\\,dx\\)?",
    correct: f("e^x\\sin x + C"),
    distractors: [f("e^x\\cos x + C"), f("e^x(\\sin x+\\cos x) + C"), f("e^x(\\sin x-\\cos x) + C")],
    theme: "trap",
  },
  {
    // du/dx is the integrand, not the other integral
    atomKey: "cyclic-paired-ex-trig:trap:0",
    stem: "If \\(u=\\displaystyle\\int e^x\\cos x\\,dx\\), what is \\(\\dfrac{du}{dx}\\)?",
    correct: f("e^x\\cos x"),
    distractors: [
      f("-\\!\\int e^x\\sin x\\,dx"),
      f("e^x\\sin x"),
      f("\\tfrac{e^x(\\cos x+\\sin x)}{2}"),
    ],
    theme: "trap",
  },
  {
    // two true facts can still give a false link
    atomKey: "antiderivative-properties:trap:0",
    stem: "The integrand \\(\\sin^2 x\\) is periodic. Is \\(\\displaystyle\\int \\sin^2 x\\,dx\\) periodic?",
    correct: "No — the antiderivative \\(\\tfrac{x}{2}-\\tfrac{\\sin 2x}{4}+C\\) has a growing \\(x\\) term.",
    distractors: [
      "Yes — an antiderivative of a periodic function is always periodic.",
      "Yes — because \\(\\sin^2(x+\\pi)=\\sin^2 x\\).",
      "Only if the period is \\(2\\pi\\).",
    ],
    theme: "trap",
  },
  {
    // every x must disappear before integrating in u
    atomKey: "sub-reverse-chain-rule:trap:0",
    stem: "After \\(u=x^2\\) in \\(\\displaystyle\\int x^3\\,e^{x^2}\\,dx\\), what should the integral look like before you integrate?",
    correct: f("\\tfrac12\\int u\\,e^{u}\\,du"),
    distractors: [
      f("\\tfrac12\\int x\\,e^{u}\\,du"),
      f("\\int e^{u}\\,du"),
      f("\\int x^3\\,e^{u}\\,du"),
    ],
    theme: "trap",
  },
  {
    // carry the sign from du
    atomKey: "sub-algebraic-composite:trap:0",
    stem: "What is \\(\\displaystyle\\int \\cos^4 x\\,\\sin x\\,dx\\)?",
    correct: f("-\\dfrac{\\cos^5 x}{5} + C"),
    distractors: [
      f("\\dfrac{\\cos^5 x}{5} + C"),
      f("\\dfrac{\\sin^5 x}{5} + C"),
      f("-\\dfrac{\\cos^4 x}{4} + C"),
    ],
    theme: "trap",
  },
  {
    // adjust by a constant, never by a variable
    atomKey: "sub-fprime-over-f:trap:0",
    stem: "For which integral does the \\(f'/f\\to\\ln|f|\\) pattern apply directly?",
    correct: f("\\int \\dfrac{6x}{3x^2+1}\\,dx"),
    distractors: [
      f("\\int \\dfrac{x^3}{3x^2+1}\\,dx"),
      f("\\int \\dfrac{1}{3x^2+1}\\,dx"),
      f("\\int \\dfrac{x^2}{6x}\\,dx"),
    ],
    theme: "trap",
  },
  {
    // a square root forces an absolute value
    atomKey: "sub-trig-identity:trap:0",
    stem: "On \\(0<x<\\tfrac{\\pi}{4}\\), what is \\(\\sqrt{1-\\sin 2x}\\)?",
    correct: f("\\cos x - \\sin x"),
    distractors: [
      f("\\sin x - \\cos x"),
      f("\\sin x + \\cos x"),
      f("|\\sin x|-|\\cos x|"),
    ],
    theme: "trap",
  },
  {
    // don't lose the 1/(a-b) factor
    atomKey: "sub-rationalisation:trap:0",
    stem: "After rationalising \\(\\dfrac{1}{\\sqrt{x+1}-\\sqrt{x-1}}\\), what constant multiplies the integral?",
    correct: f("\\tfrac12"),
    distractors: [f("1"), f("2"), f("\\tfrac14")],
    theme: "trap",
  },
  {
    // x^x is neither a power nor an exponential
    atomKey: "sub-hidden-derivative:trap:0",
    stem: "What is \\(\\dfrac{d}{dx}\\,x^x\\)?",
    correct: f("x^x(1+\\ln x)"),
    distractors: [f("x\\cdot x^{x-1}"), f("x^x\\ln x"), f("x^x")],
    theme: "trap",
  },
  {
    // choosing u backwards makes it worse
    atomKey: "byparts-formula-liate:trap:0",
    stem: "In \\(\\displaystyle\\int x\\,e^x\\,dx\\), which factor should be \\(u\\) (the part to differentiate)?",
    correct: f("u = x"),
    distractors: [f("u = e^x"), f("u = x\\,e^x"), f("u = 1")],
    theme: "trap",
  },
  {
    // ln x has no naive antiderivative
    atomKey: "byparts-logarithms:trap:0",
    stem: "What is \\(\\displaystyle\\int \\ln x\\,dx\\)?",
    correct: f("x\\ln x - x + C"),
    distractors: [f("\\dfrac{1}{x} + C"), f("\\dfrac{(\\ln x)^2}{2} + C"), f("x\\ln x + C")],
    theme: "trap",
  },
  {
    // simplify disguised factors before applying parts
    atomKey: "byparts-products-cancellation:trap:0",
    stem: "Before integrating \\(\\displaystyle\\int e^{\\ln x}\\cos x\\,dx\\), simplify the integrand to:",
    correct: f("x\\cos x"),
    distractors: [f("(\\ln x)\\cos x"), f("e^x\\cos x"), f("x\\,e^{\\cos x}")],
    theme: "trap",
  },
  {
    // decompose only a proper fraction
    atomKey: "pf-decomposition-coverup:trap:0",
    stem: "For \\(\\displaystyle\\int \\dfrac{x^2}{(x-1)(x+2)}\\,dx\\), what must you do before partial fractions?",
    correct: "Do polynomial long division first — the fraction is improper.",
    distractors: [
      "Split it straight into \\(\\dfrac{A}{x-1}+\\dfrac{B}{x+2}\\).",
      "Apply the cover-up method directly.",
      "Substitute \\(u=x^2\\) before decomposing.",
    ],
    theme: "trap",
  },
  {
    // 1/n out front is easy to lose
    atomKey: "pf-x-xn-plus-1-family:trap:0",
    stem: "What is the leading coefficient in \\(\\displaystyle\\int \\dfrac{dx}{x(x^7+1)}\\)?",
    correct: f("\\tfrac17"),
    distractors: [f("1"), f("7"), f("\\tfrac{1}{8}")],
    theme: "trap",
  },
  {
    // carry the minus from du, and the chain factor
    atomKey: "pf-substitute-then-decompose:trap:0",
    stem: "Substituting \\(u=\\cos\\theta\\) in \\(\\displaystyle\\int \\dfrac{\\sin\\theta\\,d\\theta}{f(\\cos\\theta)}\\), the integral becomes:",
    correct: f("-\\int \\dfrac{du}{f(u)}"),
    distractors: [
      f("\\int \\dfrac{du}{f(u)}"),
      f("-\\int \\dfrac{du}{f'(u)}"),
      f("\\int \\dfrac{\\sin\\theta\\,du}{f(u)}"),
    ],
    theme: "trap",
  },
  {
    // watch the sign in the denominator's derivative
    atomKey: "pf-numerator-as-denominator-combo:trap:0",
    stem: "What is \\(\\dfrac{d}{dx}(2\\cos x + 5\\sin x)\\)?",
    correct: f("-2\\sin x + 5\\cos x"),
    distractors: [
      f("2\\sin x + 5\\cos x"),
      f("-2\\sin x - 5\\cos x"),
      f("2\\sin x - 5\\cos x"),
    ],
    theme: "trap",
  },
];
