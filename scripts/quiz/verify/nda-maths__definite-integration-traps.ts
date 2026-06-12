/**
 * NDA Maths · Definite Integration · COMMON-TRAPS theme — "spot the value/mistake" MCQs.
 * One per misconception callout authored into the notes. 13 total: 11 concepts'
 * `:trap:0` plus 2 added callouts (`kings-property:trap:1`,
 * `integrating-absolute-value:trap:1`) — clearing the 12-floor for a standalone
 * Common-Traps quiz. The first distractor in each is the warned mistake.
 *   npm run quiz:verify nda-maths__definite-integration-traps
 */
import type { VerifiedEntry } from "./nda-maths__probability";

const f = (s: string) => `\\(${s}\\)`;

export const VERIFIED: VerifiedEntry[] = [
  // ── fundamental-theorem:trap:0 — integrating a derivative across a jump ──
  {
    atomKey: "fundamental-theorem:trap:0",
    stem: "Evaluate \\(\\displaystyle\\int_{-1}^{1}\\frac{d}{dx}\\Big(\\tan^{-1}\\tfrac1x\\Big)\\,dx\\). (The function jumps at \\(x=0\\).)",
    correct: f("-\\tfrac{\\pi}{2}"),
    distractors: [f("0"), f("\\tfrac{\\pi}{2}"), f("\\pi")],
    theme: "trap",
  },

  // ── periodic-integrals:trap:0 — use the function's actual period ──
  {
    atomKey: "periodic-integrals:trap:0",
    stem: "What is the period of \\(\\sin^4x+\\cos^4x\\)?",
    correct: f("\\tfrac{\\pi}{2}"),
    distractors: [f("2\\pi"), f("\\pi"), f("\\tfrac{\\pi}{4}")],
    theme: "trap",
  },

  // ── leibniz-rule:trap:0 — don't drop the chain-rule factor ──
  {
    atomKey: "leibniz-rule:trap:0",
    stem: "What is \\(\\displaystyle\\frac{d}{dx}\\int_0^{x^2}\\sin t\\,dt\\)?",
    correct: f("2x\\sin(x^2)"),
    distractors: [f("\\sin(x^2)"), f("\\cos(x^2)"), f("2x\\cos(x^2)")],
    theme: "trap",
  },

  // ── kings-property:trap:0 — add the reflected form ──
  {
    atomKey: "kings-property:trap:0",
    stem: "Using King's property on \\(I=\\displaystyle\\int_0^{\\pi/2}\\frac{\\sin x}{\\sin x+\\cos x}\\,dx\\), what is \\(2I\\)?",
    correct: f("\\tfrac{\\pi}{2}"),
    distractors: [f("I"), f("\\pi"), f("0")],
    theme: "trap",
  },

  // ── kings-property:trap:1 — reflection must match the limits ──
  {
    atomKey: "kings-property:trap:1",
    stem: "To apply King's property to \\(\\displaystyle\\int_2^5 f(x)\\,dx\\), replace \\(x\\) by which expression?",
    correct: f("7-x"),
    distractors: [f("2-x"), f("5-x"), f("3-x")],
    theme: "trap",
  },

  // ── symmetry-odd-even:trap:0 — check parity of the WHOLE integrand ──
  {
    atomKey: "symmetry-odd-even:trap:0",
    stem: "Evaluate \\(\\displaystyle\\int_{-1}^{1}(x^3 + x^2)\\,dx\\). (Only one term is odd.)",
    correct: f("\\tfrac23"),
    distractors: [f("0"), f("\\tfrac13"), f("2")],
    theme: "trap",
  },

  // ── standard-results-and-reductions:trap:0 — reduce the power BEFORE integrating ──
  {
    atomKey: "standard-results-and-reductions:trap:0",
    stem: "Using \\(\\sin^4x+\\cos^4x=\\tfrac{3+\\cos4x}{4}\\), what is \\(\\displaystyle\\int_0^{\\pi}(\\sin^4x+\\cos^4x)\\,dx\\)?",
    correct: f("\\tfrac{3\\pi}{4}"),
    distractors: [f("\\pi"), f("\\tfrac{3\\pi}{2}"), f("\\tfrac{\\pi}{4}")],
    theme: "trap",
  },

  // ── direct-evaluation:trap:0 — transform the limits when you substitute ──
  {
    atomKey: "direct-evaluation:trap:0",
    stem: "In \\(\\displaystyle\\int_0^{\\pi/2} e^{\\sin x}\\cos x\\,dx\\), substitute \\(u=\\sin x\\). What are the new limits for \\(u\\)?",
    correct: "\\(u: 0 \\to 1\\)",
    distractors: ["\\(u: 0 \\to \\tfrac{\\pi}{2}\\)", "\\(u: 0 \\to 0\\)", "\\(u: 1 \\to 0\\)"],
    theme: "trap",
  },

  // ── integrating-absolute-value:trap:0 — find the zeros, don't drop the bars ──
  {
    atomKey: "integrating-absolute-value:trap:0",
    stem: "Evaluate \\(\\displaystyle\\int_{-1}^{1}|x^2-1|\\,dx\\) (note the bars).",
    correct: f("\\tfrac43"),
    distractors: [f("-\\tfrac43"), f("0"), f("\\tfrac23")],
    theme: "trap",
  },

  // ── integrating-absolute-value:trap:1 — split |x| at the interior break-point ──
  {
    atomKey: "integrating-absolute-value:trap:1",
    stem: "Evaluate \\(\\displaystyle\\int_{-2}^{3}|x|\\,dx\\) (split at \\(x=0\\)).",
    correct: f("\\tfrac{13}{2}"),
    distractors: [f("\\tfrac{5}{2}"), f("\\tfrac{9}{2}"), f("\\tfrac{11}{2}")],
    theme: "trap",
  },

  // ── integrating-greatest-integer:trap:0 — ⌊x⌋ on [-1,0) is -1, not 0 ──
  {
    atomKey: "integrating-greatest-integer:trap:0",
    stem: "What is \\(\\lfloor -0.3 \\rfloor\\)?",
    correct: f("-1"),
    distractors: [f("0"), f("-0.3"), f("1")],
    theme: "trap",
  },

  // ── area-under-curves:trap:0 — area is unsigned ──
  {
    atomKey: "area-under-curves:trap:0",
    stem: "The area bounded by \\(y=x^2-1\\) and the x-axis on \\([-1,1]\\) is:",
    correct: f("\\tfrac43"),
    distractors: [f("-\\tfrac43"), f("0"), f("\\tfrac23")],
    theme: "trap",
  },

  // ── integral-function-conditions:trap:0 — match #conditions to #unknowns ──
  {
    atomKey: "integral-function-conditions:trap:0",
    stem: "How many independent conditions are needed to determine the three unknowns \\(P, Q, R\\) in \\(f(x)=Pe^x+Qe^{2x}+Re^{3x}\\)?",
    correct: f("3"),
    distractors: [f("1"), f("2"), f("6")],
    theme: "trap",
  },
];
