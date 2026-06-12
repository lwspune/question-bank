/**
 * NDA Maths · Limits & Continuity · practiceSet + selfCheck MCQs (computation).
 * Hand-authored distractors, theme=computation. Every `correct` re-derived from
 * scratch (correctness check) — all keys verified correct, NO notes errors found.
 * Wrong distractors model real limit mistakes: wrong standard-limit value,
 * L'Hôpital misapply, one-sided ≠ two-sided, GIF off-by-one, |x| sign flip.
 *   npm run quiz:verify nda-maths__limits-continuity-computation
 */
import type { VerifiedEntry } from "./nda-maths__probability";

const e = (atomKey: string, distractors: string[]): VerifiedEntry => ({ atomKey, distractors, theme: "computation" });
const f = (s: string) => `\\(${s}\\)`;

export const VERIFIED: VerifiedEntry[] = [
  // ── lim-foundations ──
  e("lim-foundations:practiceSet:0", ["Direct substitution", "Only if \\(f\\) is continuous at \\(a\\)", f("f(a) \\text{ exists}")]),
  e("lim-foundations:practiceSet:1", ["Factor and cancel", "L'Hôpital's rule", "Check LHL \\(=\\) RHL"]),
  e("lim-foundations:practiceSet:2", ["Always", "Never", "Only if \\(a=0\\)"]),
  e("lim-foundations:practiceSet:3", [f("4"), f("0"), f("1")]), // x²+1 at 1 = 2
  {
    atomKey: "lim-foundations:selfCheck:0",
    stem: "Does \\(\\lim_{x\\to 0}\\dfrac{|x|}{x}\\) exist?",
    correct: "No — RHL \\(=1\\), LHL \\(=-1\\), so they disagree",
    distractors: ["Yes, it equals \\(1\\)", "Yes, it equals \\(0\\)", "Yes, it equals \\(-1\\)"],
    theme: "computation",
  },

  // ── lim-algebraic-zero-over-zero ──
  e("lim-algebraic-zero-over-zero:practiceSet:0", [f("(n-1)\\,a^{n}"), f("a^{n-1}"), f("n\\,a^{n}")]), // n·a^{n-1}
  {
    atomKey: "lim-algebraic-zero-over-zero:practiceSet:1",
    stem: "Best tool for \\(\\lim_{x\\to a}\\dfrac{\\sqrt{x}-\\sqrt{a}}{x-a}\\)?",
    correct: "Rationalise (multiply by the conjugate)",
    distractors: ["Direct substitution", "Apply \\(x^n-a^n\\) directly", "L'Hôpital is the only way"],
    theme: "computation",
  },
  e("lim-algebraic-zero-over-zero:practiceSet:2", [f("3"), f("1"), f("8")]), // (x⁴-1)/(x-1)→4
  e("lim-algebraic-zero-over-zero:practiceSet:3", [f("6"), f("9"), f("1")]), // (x⁹-1)/(x³-1)→9/3=3
  {
    atomKey: "lim-algebraic-zero-over-zero:selfCheck:0",
    stem: "Evaluate \\(\\lim_{x\\to 1}\\dfrac{x^9-1}{x^3-1}\\).",
    correct: f("3"),
    distractors: [f("9"), f("6"), f("\\tfrac13")],
    theme: "computation",
  },

  // ── lim-standard-limits ──
  e("lim-standard-limits:practiceSet:0", [f("0"), f("\\infty"), f("\\tfrac12")]), // sinx/x → 1
  e("lim-standard-limits:practiceSet:1", [f("1"), f("2"), f("0")]), // (1-cosx)/x² → 1/2
  e("lim-standard-limits:practiceSet:2", [f("1"), f("a"), f("\\tfrac{1}{\\ln a}")]), // (aˣ-1)/x → ln a
  e("lim-standard-limits:practiceSet:3", [f("1"), f("\\tfrac15"), f("0")]), // sin5x/x → 5
  {
    atomKey: "lim-standard-limits:selfCheck:0",
    stem: "Evaluate \\(\\lim_{x\\to 0}\\dfrac{10^{\\sin x}-1}{\\tan x}\\).",
    correct: f("\\ln 10"),
    distractors: [f("1"), f("10"), f("\\tfrac{1}{\\ln 10}")],
    theme: "computation",
  },

  // ── lim-lhopital ──
  e("lim-lhopital:practiceSet:0", [f("\\tfrac00 \\text{ only}"), "Every limit", f("0\\cdot\\infty \\text{ only}")]), // 0/0 and ∞/∞
  e("lim-lhopital:practiceSet:1", ["Multiply numerator and denominator", "Differentiate again immediately (always twice)", "Stop — the answer is the derivative of the top"]),
  e("lim-lhopital:practiceSet:2", [f("1-x+\\tfrac{x^2}{2}-\\cdots"), f("x-\\tfrac{x^3}{6}+\\cdots"), f("1-\\tfrac{x^2}{2}+\\cdots")]), // eˣ = 1+x+x²/2+…
  {
    atomKey: "lim-lhopital:selfCheck:0",
    stem: "Evaluate \\(\\lim_{x\\to 0}\\dfrac{e^x-(1+x)}{x^2}\\).",
    correct: f("\\tfrac12"),
    distractors: [f("1"), f("0"), f("2")],
    theme: "computation",
  },

  // ── lim-one-power-infinity ──
  e("lim-one-power-infinity:practiceSet:0", [f("e^{\\lim (f-1)/g}"), f("1"), f("e^{\\lim g/f}")]), // e^{lim g(f-1)}
  e("lim-one-power-infinity:practiceSet:1", [f("1"), f("e^2"), f("\\infty")]), // (1+x)^{1/x} → e
  e("lim-one-power-infinity:practiceSet:2", [f("e"), f("e^{1/2}"), f("1")]), // (1+2/x)^x → e²
  {
    atomKey: "lim-one-power-infinity:practiceSet:3",
    stem: "\\(\\lim_{x\\to\\infty}\\left(1+\\tfrac2x\\right)^{x}\\) is which indeterminate form before evaluating?",
    correct: f("1^\\infty"),
    distractors: [f("\\infty^0"), f("0^0"), f("\\tfrac00")],
    theme: "computation",
  },
  {
    atomKey: "lim-one-power-infinity:selfCheck:0",
    stem: "Evaluate \\(\\lim_{x\\to\\infty}\\left(1+\\tfrac{3}{x}\\right)^{x}\\).",
    correct: f("e^3"),
    distractors: [f("e"), f("e^{1/3}"), f("3")],
    theme: "computation",
  },

  // ── lim-one-sided ──
  e("lim-one-sided:practiceSet:0", ["LHL and RHL both exist (even if unequal)", f("f(a) \\text{ is defined}"), f("f \\text{ is differentiable at } a")]), // iff LHL=RHL
  {
    atomKey: "lim-one-sided:practiceSet:1",
    stem: "Notation for the right-hand limit of \\(f\\) at \\(a\\)?",
    correct: f("\\lim_{x\\to a^+}f(x)"),
    distractors: [f("\\lim_{x\\to a^-}f(x)"), f("\\lim_{x\\to a}f(x)"), f("f(a^+)-f(a^-)")],
    theme: "computation",
  },
  e("lim-one-sided:practiceSet:2", [f("4"), "Does not exist", f("0")]), // LHL=RHL=2 → 2
  {
    atomKey: "lim-one-sided:practiceSet:3",
    stem: "If LHL \\(=1\\) and RHL \\(=-1\\), what is the two-sided limit?",
    correct: "Does not exist",
    distractors: [f("0"), f("1"), f("-1")],
    theme: "computation",
  },
  {
    atomKey: "lim-one-sided:selfCheck:0",
    stem: "Find \\(\\lim_{x\\to 0}\\dfrac{x^2+x+|x|}{x}\\).",
    correct: "Does not exist (RHL \\(=2\\), LHL \\(=0\\))",
    distractors: [f("2"), f("0"), f("1")],
    theme: "computation",
  },

  // ── lim-greatest-integer-limits ──
  e("lim-greatest-integer-limits:practiceSet:0", [f("3"), f("4"), f("2.5")]), // ⌊x⌋ at 3⁻ = 2
  e("lim-greatest-integer-limits:practiceSet:1", [f("2"), f("4"), f("2.5")]), // ⌊x⌋ at 3⁺ = 3
  {
    atomKey: "lim-greatest-integer-limits:practiceSet:2",
    stem: "Does \\(\\lim_{x\\to n}\\lfloor x\\rfloor\\) exist at an integer \\(n\\)?",
    correct: "No — LHL \\(=n-1\\), RHL \\(=n\\)",
    distractors: [f("\\text{Yes, } =n"), f("\\text{Yes, } =n-1"), f("\\text{Yes, } =n-\\tfrac12")],
    theme: "computation",
  },
  e("lim-greatest-integer-limits:practiceSet:3", [f("3"), f("2.5"), "Not constant"]), // ⌊x⌋ on (2,3) = 2
  {
    atomKey: "lim-greatest-integer-limits:selfCheck:0",
    stem: "Find \\(\\lim_{x\\to 0^-}\\dfrac{\\lfloor x\\rfloor}{|x|}\\).",
    correct: f("-\\infty"),
    distractors: [f("+\\infty"), f("-1"), f("0")],
    theme: "computation",
  },

  // ── lim-absolute-value-limits ──
  e("lim-absolute-value-limits:practiceSet:0", [f("-1"), f("0"), "Does not exist"]), // x/|x|, x>0 = +1
  e("lim-absolute-value-limits:practiceSet:1", [f("+1"), f("0"), "Does not exist"]), // x/|x|, x<0 = -1
  e("lim-absolute-value-limits:practiceSet:2", [f("A"), f("-A"), f("A^2")]), // √(A²) = |A|
  {
    atomKey: "lim-absolute-value-limits:practiceSet:3",
    stem: "Does \\(\\lim_{x\\to 0}\\dfrac{x}{|x|}\\) exist?",
    correct: "No — RHL \\(=+1\\), LHL \\(=-1\\)",
    distractors: [f("\\text{Yes, } =1"), f("\\text{Yes, } =0"), f("\\text{Yes, } =-1")],
    theme: "computation",
  },
  {
    atomKey: "lim-absolute-value-limits:selfCheck:0",
    stem: "Evaluate \\(\\lim_{\\theta\\to 0^+}\\dfrac{\\sqrt{1-\\cos\\theta}}{\\theta}\\).",
    correct: f("\\tfrac{1}{\\sqrt2}"),
    distractors: [f("-\\tfrac{1}{\\sqrt2}"), f("1"), f("0")],
    theme: "computation",
  },

  // ── lim-continuity-definition ──
  e("lim-continuity-definition:practiceSet:0", ["LHL and RHL only", "\\(f(a)\\) only", "The derivative and \\(f(a)\\)"]), // LHL,RHL,f(a)
  {
    atomKey: "lim-continuity-definition:practiceSet:1",
    stem: "Are polynomials continuous everywhere?",
    correct: "Yes",
    distractors: ["No, only on bounded intervals", "Only where the leading coefficient is positive", "Only at integer points"],
    theme: "computation",
  },
  e("lim-continuity-definition:practiceSet:2", [f("\\text{Setting } f(a)=0"), "It cannot be patched", f("\\text{Setting } f(a)=\\text{RHL only}")]), // f(a)=lim
  e("lim-continuity-definition:practiceSet:3", ["Where the numerator is 0", "Nowhere — they are always continuous", "Only at \\(x=0\\)"]), // denom = 0
  {
    atomKey: "lim-continuity-definition:selfCheck:0",
    stem: "\\(f(x)=\\dfrac{x^2-25}{x-5}\\) (\\(x\\neq 5\\)) is made continuous at \\(x=5\\). What value must \\(f(5)\\) take?",
    correct: f("10"),
    distractors: [f("0"), f("5"), f("25")],
    theme: "computation",
  },

  // ── lim-continuity-parameters ──
  e("lim-continuity-parameters:practiceSet:0", ["Two", "Zero", "One per unknown, regardless of joins"]), // one (value-match) per join
  e("lim-continuity-parameters:practiceSet:1", ["Function values again", "Areas", "Nothing extra"]), // slopes
  e("lim-continuity-parameters:practiceSet:2", [f("-2"), f("3"), f("\\tfrac52")]), // 2k+1=5 → k=2
  e("lim-continuity-parameters:practiceSet:3", [f("0"), f("\\tfrac12"), f("\\pi")]), // sinx/x patched → k=1
  {
    atomKey: "lim-continuity-parameters:selfCheck:0",
    stem: "Find \\(k\\) so \\(f(x)=\\dfrac{\\sin x}{x}\\) for \\(x\\neq 0\\) and \\(f(0)=k\\) is continuous at \\(0\\).",
    correct: f("k=1"),
    distractors: [f("k=0"), f("k=\\tfrac12"), f("k=\\infty")],
    theme: "computation",
  },

  // ── lim-discontinuity-types ──
  e("lim-discontinuity-types:practiceSet:0", ["the limit does not exist", "LHL and RHL are infinite", "\\(f(a)=\\) limit (so it's continuous)"]), // removable: limit exists but ≠ f(a)
  {
    atomKey: "lim-discontinuity-types:practiceSet:2",
    stem: "Does \\(\\lim_{x\\to 0}\\sin\\tfrac1x\\) exist?",
    correct: "No — it oscillates between \\(-1\\) and \\(1\\)",
    distractors: [f("\\text{Yes, } =0"), f("\\text{Yes, } =1"), f("\\text{Yes, } =-1")],
    theme: "computation",
  },
  e("lim-discontinuity-types:practiceSet:3", ["Removable", "Oscillatory", "None — it is continuous"]), // ⌊x⌋ → jump
  {
    atomKey: "lim-discontinuity-types:selfCheck:0",
    stem: "Classify the discontinuity of \\(f(x)=\\sin\\tfrac{1}{x^2}\\) at \\(x=0\\).",
    correct: "Oscillatory (no limit exists)",
    distractors: ["Removable", "Jump", "None — it is continuous"],
    theme: "computation",
  },

  // ── lim-continuity-vs-differentiability ──
  e("lim-continuity-vs-differentiability:practiceSet:0", ["differentiable again", "discontinuous", "bounded but not continuous"]), // differentiable ⇒ continuous
  {
    atomKey: "lim-continuity-vs-differentiability:practiceSet:1",
    stem: "Does continuous at a point imply differentiable there?",
    correct: "No",
    distractors: ["Yes, always", "Yes, except at integers", "Only for polynomials"],
    theme: "computation",
  },
  e("lim-continuity-vs-differentiability:practiceSet:2", ["Differentiable yes, continuous no", "Neither continuous nor differentiable", "Both continuous and differentiable"]), // |x| at 0: cont yes, diff no
  {
    atomKey: "lim-continuity-vs-differentiability:practiceSet:3",
    stem: "If \\(f\\) and \\(g\\) are continuous, is \\(f\\circ g\\) continuous?",
    correct: "Yes",
    distractors: ["No, never", "Only if \\(f=g\\)", "Only where \\(g(x)=0\\)"],
    theme: "computation",
  },
  {
    atomKey: "lim-continuity-vs-differentiability:selfCheck:0",
    stem: "If \\(f\\) is differentiable at \\(x=a\\), is it continuous there?",
    correct: "Yes — always",
    distractors: ["No — never", "Only if \\(f'(a)=0\\)", "Only if \\(f\\) is a polynomial"],
    theme: "computation",
  },
];
