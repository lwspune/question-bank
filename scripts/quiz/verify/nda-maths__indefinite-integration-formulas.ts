/**
 * NDA Maths · Indefinite Integration · FORMULA-recall MCQs.
 * One entry per genuine `formula.latex` piece. Bundle pieces that are CONNECTIVES
 * / CONDITIONS / SETUP are skipped (parked, never published):
 *   antiderivative-and-c:formula:1  (\text{where})        — connective
 *   standard-formula-table:formula:1  ((n≠-1))            — condition
 *   sub-reverse-chain-rule:formula:1  (u=g(x))            — setup
 *   pf-substitute-then-decompose:formula:1  (u=cosθ)      — setup
 * Distractors are full-equation permutations — wrong versions of the SAME
 * identity, same shape (no length/format tell).
 *
 * Includes the enriched `antiderivative-properties` concept: coverage flagged it
 * (no formula.latex while its prose stated the inverse-relation facts). Its two
 * genuine recallable identities (∫F'=F+C ; d/dx ∫f = f) were appended to the
 * notes formula.latex and verified here (keys antiderivative-properties:formula:0,1).
 *   npm run quiz:verify nda-maths__indefinite-integration-formulas
 */
import type { VerifiedEntry } from "./nda-maths__probability";

const f = (s: string) => `\\(${s}\\)`;

export const VERIFIED: VerifiedEntry[] = [
  // ── antiderivative-and-c : ∫f dx=F+C | (where) | F'=f ──
  {
    atomKey: "antiderivative-and-c:formula:0",
    stem: "Which correctly states the indefinite integral of \\(f\\)?",
    distractors: [
      f("\\int f(x)\\,dx = F(x)"),
      f("\\int f(x)\\,dx = F'(x) + C"),
      f("\\int f(x)\\,dx = f(x) + C"),
    ],
    theme: "formula",
  },
  {
    atomKey: "antiderivative-and-c:formula:2",
    stem: "If \\(F\\) is an antiderivative of \\(f\\), which relation holds?",
    distractors: [f("F(x) = f'(x)"), f("F'(x) = f'(x)"), f("\\int F(x)\\,dx = f(x)")],
    theme: "formula",
  },

  // ── standard-formula-table : power rule (the leading row) ──
  {
    atomKey: "standard-formula-table:formula:0",
    stem: "What is the power rule \\(\\displaystyle\\int x^n\\,dx\\) for \\(n\\neq-1\\)?",
    distractors: [
      f("\\int x^n\\,dx = \\dfrac{x^{n-1}}{n-1} + C"),
      f("\\int x^n\\,dx = n\\,x^{n-1} + C"),
      f("\\int x^n\\,dx = \\dfrac{x^{n+1}}{n} + C"),
    ],
    theme: "formula",
  },

  // ── linearity-term-by-term ──
  {
    atomKey: "linearity-term-by-term:formula:0",
    stem: "Which correctly states linearity of the integral?",
    distractors: [
      f("\\int\\big(a\\,f(x)+b\\,g(x)\\big)\\,dx = ab\\!\\int\\! f(x)g(x)\\,dx"),
      f("\\int\\big(a\\,f(x)+b\\,g(x)\\big)\\,dx = \\!\\int\\! f(x)\\,dx + \\!\\int\\! g(x)\\,dx"),
      f("\\int f(x)\\,g(x)\\,dx = \\!\\int\\! f(x)\\,dx \\cdot \\!\\int\\! g(x)\\,dx"),
    ],
    theme: "formula",
  },

  // ── simplify-integrand-first : e^{ln u}=u | e^{k ln x}=x^k ──
  {
    atomKey: "simplify-integrand-first:formula:0",
    stem: "Which collapse identity lets you simplify an integrand before integrating?",
    distractors: [f("e^{\\ln u} = \\ln u"), f("e^{\\ln u} = u^e"), f("\\ln(e^u) = e^u")],
    theme: "formula",
  },
  {
    atomKey: "simplify-integrand-first:formula:1",
    stem: "Simplify \\(e^{k\\ln x}\\):",
    distractors: [f("e^{k\\ln x} = kx"), f("e^{k\\ln x} = x^{1/k}"), f("e^{k\\ln x} = k^x")],
    theme: "formula",
  },

  // ── exponential-bases : ∫aˣdx ──
  {
    atomKey: "exponential-bases:formula:0",
    stem: "What is \\(\\displaystyle\\int a^x\\,dx\\) for \\(a>0,\\,a\\neq1\\)?",
    distractors: [
      f("\\int a^x\\,dx = \\dfrac{a^x}{a} + C"),
      f("\\int a^x\\,dx = a^x\\ln a + C"),
      f("\\int a^x\\,dx = \\dfrac{a^{x+1}}{x+1} + C"),
    ],
    theme: "formula",
  },

  // ── complete-the-square-arctan : ∫dx/(x²+k²) ──
  {
    atomKey: "complete-the-square-arctan:formula:0",
    stem: "What is the arctan standard form \\(\\displaystyle\\int \\dfrac{dx}{x^2+k^2}\\)?",
    distractors: [
      f("\\int \\dfrac{dx}{x^2+k^2} = \\tan^{-1}\\!\\Big(\\dfrac{x}{k}\\Big) + C"),
      f("\\int \\dfrac{dx}{x^2+k^2} = \\dfrac{1}{k}\\sin^{-1}\\!\\Big(\\dfrac{x}{k}\\Big) + C"),
      f("\\int \\dfrac{dx}{x^2+k^2} = k\\tan^{-1}\\!\\Big(\\dfrac{x}{k}\\Big) + C"),
    ],
    theme: "formula",
  },

  // ── ex-f-plus-fprime : ∫eˣ(f+f')=eˣf ──
  {
    atomKey: "ex-f-plus-fprime:formula:0",
    stem: "What is \\(\\displaystyle\\int e^x\\big(f(x)+f'(x)\\big)\\,dx\\)?",
    distractors: [
      f("\\int e^x\\big(f(x)+f'(x)\\big)\\,dx = e^x f'(x) + C"),
      f("\\int e^x\\big(f(x)+f'(x)\\big)\\,dx = e^x\\big(f(x)+f'(x)\\big) + C"),
      f("\\int e^x\\big(f(x)+f'(x)\\big)\\,dx = e^x + f(x) + C"),
    ],
    theme: "formula",
  },

  // ── cyclic-paired-ex-trig : ∫eˣcos x | ∫eˣsin x ──
  {
    atomKey: "cyclic-paired-ex-trig:formula:0",
    stem: "What is \\(\\displaystyle\\int e^x\\cos x\\,dx\\)?",
    distractors: [
      f("\\int e^x\\cos x\\,dx = \\tfrac{e^x(\\cos x-\\sin x)}{2}+C"),
      f("\\int e^x\\cos x\\,dx = \\tfrac{e^x(\\sin x-\\cos x)}{2}+C"),
      f("\\int e^x\\cos x\\,dx = e^x\\cos x+C"),
    ],
    theme: "formula",
  },
  {
    atomKey: "cyclic-paired-ex-trig:formula:1",
    stem: "What is \\(\\displaystyle\\int e^x\\sin x\\,dx\\)?",
    distractors: [
      f("\\int e^x\\sin x\\,dx = \\tfrac{e^x(\\sin x+\\cos x)}{2}+C"),
      f("\\int e^x\\sin x\\,dx = \\tfrac{e^x(\\cos x-\\sin x)}{2}+C"),
      f("\\int e^x\\sin x\\,dx = -e^x\\cos x+C"),
    ],
    theme: "formula",
  },

  // ── antiderivative-properties (ENRICHED) : ∫F'=F+C | d/dx ∫f = f ──
  {
    atomKey: "antiderivative-properties:formula:0",
    stem: "What is \\(\\displaystyle \\int F'(x)\\,dx\\)?",
    distractors: [
      f("\\int F'(x)\\,dx = F'(x) + C"),
      f("\\int F'(x)\\,dx = F''(x) + C"),
      f("\\int F'(x)\\,dx = f(x) + C"),
    ],
    theme: "formula",
  },
  {
    atomKey: "antiderivative-properties:formula:1",
    stem: "What is \\(\\displaystyle \\dfrac{d}{dx}\\!\\int f(x)\\,dx\\)?",
    distractors: [
      f("\\dfrac{d}{dx}\\!\\int f(x)\\,dx = f'(x)"),
      f("\\dfrac{d}{dx}\\!\\int f(x)\\,dx = F(x)"),
      f("\\dfrac{d}{dx}\\!\\int f(x)\\,dx = f(x) + C"),
    ],
    theme: "formula",
  },

  // ── sub-reverse-chain-rule : ∫f(g)g'dx = ∫f(u)du ──
  {
    atomKey: "sub-reverse-chain-rule:formula:0",
    stem: "Which is the substitution rule (reverse chain rule)?",
    distractors: [
      f("\\int f\\big(g(x)\\big)\\,g'(x)\\,dx = \\int f(u)\\,g'(u)\\,du"),
      f("\\int f\\big(g(x)\\big)\\,g'(x)\\,dx = f(u)\\int du"),
      f("\\int f\\big(g(x)\\big)\\,dx = \\int f(u)\\,du"),
    ],
    theme: "formula",
  },

  // ── sub-algebraic-composite : ∫(g)ⁿg'dx ──
  {
    atomKey: "sub-algebraic-composite:formula:0",
    stem: "What is \\(\\displaystyle\\int \\big(g(x)\\big)^n\\,g'(x)\\,dx\\)?",
    distractors: [
      f("\\int \\big(g(x)\\big)^n\\,g'(x)\\,dx = \\dfrac{\\big(g(x)\\big)^{n-1}}{n-1} + C"),
      f("\\int \\big(g(x)\\big)^n\\,g'(x)\\,dx = n\\big(g(x)\\big)^{n-1} + C"),
      f("\\int \\big(g(x)\\big)^n\\,g'(x)\\,dx = \\dfrac{\\big(g(x)\\big)^{n+1}}{n} + C"),
    ],
    theme: "formula",
  },

  // ── sub-fprime-over-f : ∫f'/f = ln|f| ──
  {
    atomKey: "sub-fprime-over-f:formula:0",
    stem: "What is \\(\\displaystyle\\int \\dfrac{f'(x)}{f(x)}\\,dx\\)?",
    distractors: [
      f("\\int \\dfrac{f'(x)}{f(x)}\\,dx = \\ln|f'(x)| + C"),
      f("\\int \\dfrac{f'(x)}{f(x)}\\,dx = \\dfrac{f(x)}{f'(x)} + C"),
      f("\\int \\dfrac{f'(x)}{f(x)}\\,dx = -\\ln|f(x)| + C"),
    ],
    theme: "formula",
  },

  // ── sub-trig-identity : divide-by-cos² move ──
  {
    atomKey: "sub-trig-identity:formula:0",
    stem: "Dividing by \\(\\cos^2 x\\), what does \\(\\displaystyle\\int \\dfrac{dx}{a^2\\sin^2 x + b^2\\cos^2 x}\\) become?",
    distractors: [
      f("\\int \\dfrac{\\sec^2 x\\,dx}{a^2 + b^2\\tan^2 x},\\ \\ t=\\tan x"),
      f("\\int \\dfrac{\\csc^2 x\\,dx}{a^2\\tan^2 x + b^2},\\ \\ t=\\tan x"),
      f("\\int \\dfrac{\\sec^2 x\\,dx}{a^2\\tan^2 x + b^2},\\ \\ t=\\cot x"),
    ],
    theme: "formula",
  },

  // ── sub-rationalisation : conjugate clears surd ──
  {
    atomKey: "sub-rationalisation:formula:0",
    stem: "Rationalising, \\(\\dfrac{1}{\\sqrt{x+a}-\\sqrt{x+b}}\\) equals:",
    distractors: [
      f("\\dfrac{\\sqrt{x+a}-\\sqrt{x+b}}{a-b}"),
      f("\\dfrac{\\sqrt{x+a}+\\sqrt{x+b}}{b-a}"),
      f("\\dfrac{\\sqrt{x+a}+\\sqrt{x+b}}{2x+a+b}"),
    ],
    theme: "formula",
  },

  // ── sub-hidden-derivative : d/dx xˣ ──
  {
    atomKey: "sub-hidden-derivative:formula:0",
    stem: "What is \\(\\dfrac{d}{dx}\\,x^x\\)?",
    distractors: [
      f("\\dfrac{d}{dx}\\,x^x = x\\cdot x^{x-1}"),
      f("\\dfrac{d}{dx}\\,x^x = x^x\\ln x"),
      f("\\dfrac{d}{dx}\\,x^x = x^x(1-\\ln x)"),
    ],
    theme: "formula",
  },

  // ── byparts-formula-liate : ∫u dv = uv - ∫v du ──
  {
    atomKey: "byparts-formula-liate:formula:0",
    stem: "Which is the integration-by-parts formula?",
    distractors: [
      f("\\int u\\,dv = uv + \\int v\\,du"),
      f("\\int u\\,dv = uv - \\int u\\,dv"),
      f("\\int u\\,dv = \\int u\\,du - v"),
    ],
    theme: "formula",
  },

  // ── byparts-logarithms : ∫ln x dx ──
  {
    atomKey: "byparts-logarithms:formula:0",
    stem: "What is \\(\\displaystyle\\int \\ln x\\,dx\\)?",
    distractors: [
      f("\\int \\ln x\\,dx = \\dfrac{1}{x} + C"),
      f("\\int \\ln x\\,dx = \\dfrac{(\\ln x)^2}{2} + C"),
      f("\\int \\ln x\\,dx = x\\ln x + x + C"),
    ],
    theme: "formula",
  },

  // ── byparts-products-cancellation : ∫u dv = uv - ∫v du ──
  {
    atomKey: "byparts-products-cancellation:formula:0",
    stem: "The product-rule trade used for products is:",
    distractors: [
      f("\\int u\\,dv = uv + \\int v\\,du"),
      f("\\int u\\,dv = \\int u\\,du\\cdot\\int dv"),
      f("\\int u\\,dv = uv - \\int u\\,du"),
    ],
    theme: "formula",
  },

  // ── pf-decomposition-coverup : linear-factor split ──
  {
    atomKey: "pf-decomposition-coverup:formula:0",
    stem: "Which is the partial-fraction split of \\(\\dfrac{p(x)}{(x-a)(x-b)}\\)?",
    distractors: [
      f("\\dfrac{p(x)}{(x-a)(x-b)} = \\dfrac{A}{x-a} \\cdot \\dfrac{B}{x-b}"),
      f("\\dfrac{p(x)}{(x-a)(x-b)} = \\dfrac{Ax+B}{x-a} + \\dfrac{B}{x-b}"),
      f("\\dfrac{p(x)}{(x-a)(x-b)} = \\dfrac{A}{x-a} - \\dfrac{B}{x-b}"),
    ],
    theme: "formula",
  },

  // ── pf-x-xn-plus-1-family : closed form ──
  {
    atomKey: "pf-x-xn-plus-1-family:formula:0",
    stem: "What is the closed form of \\(\\displaystyle\\int \\dfrac{dx}{x(x^n+1)}\\)?",
    distractors: [
      f("\\int \\dfrac{dx}{x(x^n+1)} = \\ln\\left|\\dfrac{x^n}{x^n+1}\\right| + C"),
      f("\\int \\dfrac{dx}{x(x^n+1)} = \\dfrac{1}{n}\\ln\\left|\\dfrac{x^n+1}{x^n}\\right| + C"),
      f("\\int \\dfrac{dx}{x(x^n+1)} = \\dfrac{1}{n}\\ln\\left|x^n(x^n+1)\\right| + C"),
    ],
    theme: "formula",
  },

  // ── pf-substitute-then-decompose : ∫sinθ/f(cosθ) = -∫du/f(u) ──
  {
    atomKey: "pf-substitute-then-decompose:formula:0",
    stem: "With \\(u=\\cos\\theta\\), what is \\(\\displaystyle\\int \\dfrac{\\sin\\theta\\,d\\theta}{f(\\cos\\theta)}\\)?",
    distractors: [
      f("\\int \\dfrac{\\sin\\theta\\,d\\theta}{f(\\cos\\theta)} = \\int \\dfrac{du}{f(u)}"),
      f("\\int \\dfrac{\\sin\\theta\\,d\\theta}{f(\\cos\\theta)} = -\\int \\dfrac{du}{f'(u)}"),
      f("\\int \\dfrac{\\sin\\theta\\,d\\theta}{f(\\cos\\theta)} = \\int \\dfrac{f(u)\\,du}{\\sin\\theta}"),
    ],
    theme: "formula",
  },

  // ── pf-numerator-as-denominator-combo : N=AD+BD' ──
  {
    atomKey: "pf-numerator-as-denominator-combo:formula:0",
    stem: "Writing \\(N(x)=A\\,D(x)+B\\,D'(x)\\), what is \\(\\displaystyle\\int \\dfrac{N}{D}\\,dx\\)?",
    distractors: [
      f("\\int \\dfrac{N}{D}\\,dx = A\\ln|D| + Bx + C"),
      f("\\int \\dfrac{N}{D}\\,dx = Ax + B\\,D'(x) + C"),
      f("\\int \\dfrac{N}{D}\\,dx = Ax - B\\ln|D| + C"),
    ],
    theme: "formula",
  },
];
