/**
 * NDA Maths · Definite Integration · practiceSet + selfCheck MCQs (computation).
 * Hand-authored distractors, theme=computation. Every `correct` was re-derived
 * from the notes _data — all checked out, NO notes errors found.
 *
 * Distractors model real definite-integral mistakes: sign error on odd symmetry,
 * dropping the ×2 factor on even symmetry, forgetting to swap/convert limits,
 * floor-of-negative slips, dropping the chain-rule factor in Leibniz, etc.
 *
 * Atoms with looksMcqClean=false are SKIPPED (the open-form / formula-restatement
 * prompts whose "correct" is an unbounded expression, not a clean MCQ option):
 *   fundamental-theorem:practiceSet:1 (8ln2 expression restatement)
 *   integrating-absolute-value:practiceSet:0 ("where do you split" — verbal)
 *   standard-results-and-reductions:practiceSet:2 (Beta restated as factorials)
 * The formula-restatement clean atoms (kings-property:practiceSet:2,
 * area-under-curves:practiceSet:{0,1}) ARE included — they have concrete option-shaped
 * answers, but their stems are made fully self-contained below.
 *   npm run quiz:verify nda-maths__definite-integration-computation
 */
import type { VerifiedEntry } from "./nda-maths__probability";

const e = (atomKey: string, distractors: string[]): VerifiedEntry => ({ atomKey, distractors, theme: "computation" });
const f = (s: string) => `\\(${s}\\)`;

export const VERIFIED: VerifiedEntry[] = [
  // ── fundamental-theorem ──
  // ∫₁⁴ f' with f(1)=f(4) = f(4)-f(1) = 0
  e("fundamental-theorem:practiceSet:0", [f("f(4)+f(1)"), f("f'(4)-f'(1)"), f("1")]),
  // ∫₀^{π/2} e^{ln(cos x)}dx = ∫₀^{π/2} cos x dx = 1
  {
    atomKey: "fundamental-theorem:practiceSet:2",
    stem: "Evaluate \\(\\displaystyle\\int_0^{\\pi/2} e^{\\ln(\\cos x)}\\,dx\\) (simplify \\(e^{\\ln u}=u\\) first).",
    distractors: [f("0"), f("\\tfrac{\\pi}{2}"), f("e^{\\pi/2}-1")],
    theme: "computation",
  },
  // ∫_a^b x³=0, ∫_a^b x²=2/3 → a=-1, b=1
  e("fundamental-theorem:selfCheck:0", [
    "\\(a=0,\\ b=1\\).",
    "\\(a=-2,\\ b=2\\).",
    "\\(a=1,\\ b=-1\\).",
  ]),

  // ── periodic-integrals ──
  // period of sin⁴x+cos⁴x = π/2
  e("periodic-integrals:practiceSet:0", [f("2\\pi"), f("\\pi"), f("\\pi/4")]),
  // ∫₀^{4π}|sin x| = 4 periods × 2 = 8
  e("periodic-integrals:practiceSet:1", [f("2"), f("4"), f("16")]),
  // ∫₀^{nT}f for period-T f = n∫₀^T f
  e("periodic-integrals:practiceSet:2", [
    f("\\tfrac1n\\int_0^T f"),
    f("\\int_0^T f"),
    f("nT\\int_0^T f"),
  ]),
  // ∫₀^{6π}sin²x dx = 6·(π/2) = 3π
  e("periodic-integrals:selfCheck:0", [f("6\\pi"), f("\\tfrac{\\pi}{2}"), f("12\\pi")]),

  // ── leibniz-rule ──
  // d/dx ∫₀ˣ e^{t²}dt = e^{x²}
  e("leibniz-rule:practiceSet:0", [f("e^{t^2}"), f("2x\\,e^{x^2}"), f("e^{x^2}-1")]),
  // d/dx ∫₁^{x³} ln t dt = ln(x³)·3x² = 3x²ln(x³)
  e("leibniz-rule:practiceSet:1", [f("\\ln(x^3)"), f("3x^2\\ln x"), f("\\tfrac{1}{x^3}\\cdot 3x^2")]),
  // φ(a)=∫₀ᵃ t f(t)dt → φ'(a) = a f(a)
  e("leibniz-rule:selfCheck:0", [
    "\\(\\phi'(a)=f(a)\\).",
    "\\(\\phi'(a)=\\int_0^a f(t)\\,dt\\).",
    "\\(\\phi'(a)=a\\,f'(a)\\).",
  ]),

  // ── kings-property ──
  // ∫₀ᵃ f(a-x)/(f(x)+f(a-x))dx = a/2
  e("kings-property:practiceSet:0", [f("a"), f("\\tfrac{\\pi}{4}"), f("0")]),
  // ∫₀^{π/2} cos/(sin+cos) = π/4
  e("kings-property:practiceSet:1", [f("\\tfrac{\\pi}{2}"), f("0"), f("\\tfrac{\\pi}{8}")]),
  // King's property statement: ∫₀ᵃ f(x)dx = ∫₀ᵃ f(a-x)dx
  {
    atomKey: "kings-property:practiceSet:2",
    stem: "By King's property, \\(\\displaystyle\\int_0^a f(x)\\,dx\\) equals which of the following?",
    distractors: [
      f("\\int_0^a f(x-a)\\,dx"),
      f("\\int_0^a f(a+x)\\,dx"),
      f("\\int_{-a}^0 f(a-x)\\,dx"),
    ],
    theme: "computation",
  },
  // ∫₀¹ ln((1-x)/x)dx = 0
  e("kings-property:practiceSet:3", [f("1"), f("\\ln 2"), f("\\tfrac12")]),
  // ∫₀^π x sin x/(1+cos²x)dx = π²/4
  e("kings-property:selfCheck:0", [
    "\\(\\frac{\\pi^2}{2}\\).",
    "\\(\\frac{\\pi}{4}\\).",
    "\\(\\frac{\\pi^2}{8}\\).",
  ]),

  // ── symmetry-odd-even ──
  // ∫₋ₐᵃ of an odd function = 0
  e("symmetry-odd-even:practiceSet:0", [
    f("2\\int_0^a f(x)\\,dx"),
    f("\\int_0^a f(x)\\,dx"),
    f("2f(a)"),
  ]),
  // ∫₋₂² x³cos x dx = 0 (odd × even = odd)
  e("symmetry-odd-even:practiceSet:1", [f("2\\int_0^2 x^3\\cos x\\,dx"), f("16"), f("8")]),
  // ∫₋₁¹ x²/(1+5^x)dx = ∫₀¹x²dx = 1/3 (the 1+c^x property)
  e("symmetry-odd-even:practiceSet:2", [
    f("0"),
    f("\\int_{-1}^1 x^2\\,dx = \\tfrac23"),
    f("\\tfrac16"),
  ]),
  // ∫₋{π/2}^{π/2}(e^{cos x}sin x + e^{sin x}cos x)dx = (e²-1)/e
  e("symmetry-odd-even:selfCheck:0", [
    "\\(0\\).",
    "\\(\\frac{e^2+1}{e}\\).",
    "\\(2(e-e^{-1})\\).",
  ]),

  // ── standard-results-and-reductions ──
  // ∫₀^π dx/(1+sin²x) = π/√2
  e("standard-results-and-reductions:practiceSet:0", [f("\\tfrac{\\pi}{2}"), f("\\pi\\sqrt2"), f("\\tfrac{\\pi}{2\\sqrt2}")]),
  // 1-cosθ = 2sin²(θ/2)
  e("standard-results-and-reductions:practiceSet:1", [
    f("2\\cos^2(\\theta/2)"),
    f("1-2\\sin^2(\\theta/2)"),
    f("\\sin^2(\\theta/2)"),
  ]),
  // ∫₀^{π/2} dθ/(1+cosθ) = 1
  e("standard-results-and-reductions:selfCheck:0", [f("\\tfrac{\\pi}{4}"), f("2"), f("\\tfrac{1}{2}")]),

  // ── direct-evaluation ──
  // tan³x+tan x = tan x sec²x
  e("direct-evaluation:practiceSet:0", [
    f("\\tan x\\,(1-\\sec^2 x)"),
    f("\\sec^2 x"),
    f("\\tan^2 x\\,\\sec x"),
  ]),
  // ∫e^x sin x dx = e^x(sin x - cos x)/2
  e("direct-evaluation:practiceSet:1", [
    f("\\tfrac{e^x(\\cos x-\\sin x)}{2}"),
    f("\\tfrac{e^x(\\sin x+\\cos x)}{2}"),
    f("e^x\\sin x"),
  ]),
  // ∫₁^e x ln x dx = (e²+1)/4
  e("direct-evaluation:practiceSet:2", [
    f("\\tfrac{e^2-1}{4}"),
    f("\\tfrac{e^2+1}{2}"),
    f("\\tfrac{e^2-1}{2}"),
  ]),
  // ∫₀^{π/4}(tan³+tan)dx = 1/2
  e("direct-evaluation:selfCheck:0", [
    "\\(1\\).",
    "\\(\\frac14\\).",
    "\\(\\ln\\sqrt2\\).",
  ]),

  // ── integrating-absolute-value ──
  // ∫₋₂^{-1} x/|x| dx = -1 (on negatives x/|x| = -1)
  e("integrating-absolute-value:practiceSet:1", [f("1"), f("-2"), f("0")]),
  // ∫_a^b f = p, ∫_a^b|f| = q ⇒ q ≥ |p|
  e("integrating-absolute-value:practiceSet:2", [
    f("p \\ge |q|"),
    f("q = |p|"),
    f("q \\le |p|"),
  ]),
  // ∫₀^{π/2}|sin x - cos x|dx = 2(√2-1)
  e("integrating-absolute-value:selfCheck:0", [
    "\\(0\\).",
    "\\(\\sqrt2-1\\).",
    "\\(2-\\sqrt2\\).",
  ]),

  // ── integrating-greatest-integer ──
  // ⌊x⌋ on [-1,0) = -1
  e("integrating-greatest-integer:practiceSet:0", [f("0"), f("1"), f("-2")]),
  // ∫ₙ^{n+1}(x-⌊x⌋)dx = 1/2
  e("integrating-greatest-integer:practiceSet:1", [f("1"), f("-\\tfrac12"), f("0")]),
  // ⌊x⌋+⌊-x⌋ = -1 for non-integer x
  e("integrating-greatest-integer:practiceSet:2", [f("0"), f("1"), f("-2x")]),
  // ∫₀^{√2}⌊x²⌋dx = √2-1
  e("integrating-greatest-integer:selfCheck:0", [
    "\\(\\sqrt2\\).",
    "\\(2-\\sqrt2\\).",
    "\\(1\\).",
  ]),

  // ── area-under-curves ──
  // area between y=f(x) and x-axis on [a,b]
  {
    atomKey: "area-under-curves:practiceSet:0",
    stem: "The area between \\(y=f(x)\\) and the x-axis on \\([a,b]\\) is given by which integral?",
    distractors: [
      f("\\int_a^b f(x)\\,dx"),
      f("\\left|\\int_a^b f(x)\\,dx\\right|"),
      f("\\int_a^b f(x)^2\\,dx"),
    ],
    theme: "computation",
  },
  // finding limits for area between two curves
  {
    atomKey: "area-under-curves:practiceSet:1",
    stem: "To find the limits of integration for the area between two curves \\(y=f(x)\\) and \\(y=g(x)\\), you should:",
    distractors: [
      "Solve \\(f(x)=0\\)",
      "Solve \\(f'(x)=g'(x)\\)",
      "Solve \\(f(x)+g(x)=0\\)",
    ],
    theme: "computation",
  },
  // area between y=4-x² and x-axis on [-2,2] = 32/3
  e("area-under-curves:practiceSet:2", [
    f("\\int_{-2}^2(4-x^2)\\,dx = \\tfrac{16}{3}"),
    f("16"),
    f("\\tfrac{32}{3}\\text{ with no factor }2 = \\tfrac{16}{3}"),
  ]),
  // area bounded by y=|x²-1| between roots = 4/3
  e("area-under-curves:selfCheck:0", [
    "\\(\\frac23\\).",
    "\\(\\frac83\\).",
    "\\(0\\).",
  ]),

  // ── integral-function-conditions ──
  // 3 conditions for 3 unknown coefficients
  e("integral-function-conditions:practiceSet:0", [f("6"), f("2"), f("1")]),
  // f=Pe^x+Qe^{2x}+Re^{3x} → f'(0) = P+2Q+3R
  e("integral-function-conditions:practiceSet:1", [
    f("P+Q+R"),
    f("3P+2Q+R"),
    f("P+4Q+9R"),
  ]),
  // ∫₀^c e^{2x}dx = (e^{2c}-1)/2
  e("integral-function-conditions:practiceSet:2", [
    f("e^{2c}-1"),
    f("2(e^{2c}-1)"),
    f("\\tfrac{e^{2c}}{2}"),
  ]),
  // P=1,Q=2,R=3 → f'(0)=1+4+9=14
  e("integral-function-conditions:selfCheck:0", [f("6"), f("36"), f("10")]),
];
