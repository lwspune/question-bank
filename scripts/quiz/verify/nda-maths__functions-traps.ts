/**
 * NDA Maths · Functions · the "Common Traps" theme.
 *
 * Trap atoms are SEEDS (placeholder stem + empty key) — each entry authors the
 * FULL question via `stem` + `correct` overrides, engineered so the concept's
 * classic misconception is the most TEMPTING wrong option (the FIRST distractor).
 * Theme stays 'trap'. The 14 seeds come from the notes' existing `traps` callouts.
 *   npm run quiz:verify nda-maths__functions-traps
 */
import type { VerifiedEntry } from "./nda-maths__probability";

const f = (s: string) => `\\(${s}\\)`;

export const VERIFIED: VerifiedEntry[] = [
  { atomKey: "funcs-composition:trap:0", stem: "If \\(f(x)=x^2\\) and \\(g(x)=x+1\\), find \\((f\\circ g)(2)\\).", correct: f("9"), distractors: [f("5"), f("12"), f("4")] }, // f(g(2))=f(3)=9; trap g(f(2))=g(4)=5 (wrong order)
  { atomKey: "funcs-evaluating-functions:trap:0", stem: "If \\(f(x)=x+2\\) and \\(g(x)=3x\\), find the PRODUCT \\((fg)(1)\\).", correct: f("9"), distractors: [f("5"), f("3"), f("6")] }, // f(1)·g(1)=3·3=9; trap treats it as composition f(g(1))=f(3)=5
  { atomKey: "funcs-even-and-odd:trap:0", stem: "Which of these is an ODD function?", correct: f("x^3-x"), distractors: [f("x^2"), f("x^2+x"), f("|x|")] }, // x³−x is odd; trap: x² and x²+x have f(0)=0 (necessary, not sufficient) so look "odd"
  { atomKey: "funcs-fe-argument-shift:trap:0", stem: "If \\(f(x+1)=x^2+2x\\), find \\(f(x)\\).", correct: f("x^2-1"), distractors: [f("x^2+2x"), f("x^2+1"), f("x^2-2x")] }, // sub x→x−1: f(x)=(x−1)²+2(x−1)=x²−1; trap leaves x²+2x un-substituted
  { atomKey: "funcs-fe-substitution:trap:0", stem: "If \\(f(x)+2f\\!\\left(\\tfrac1x\\right)=x\\) for \\(x\\neq0\\), find \\(f(2)\\).", correct: f("-\\tfrac13"), distractors: [f("\\tfrac23"), f("2"), f("-\\tfrac23")] }, // pair x=2 & x=½: f(2)=−1/3; trap treats f(1/x)=f(x) → 3f(2)=2 → 2/3
  { atomKey: "funcs-finding-domain:trap:0", stem: "Find the domain of \\(f(x)=\\dfrac{1}{\\sqrt{x-3}}\\).", correct: f("(3,\\infty)"), distractors: [f("[3,\\infty)"), f("(-\\infty,3)"), f("\\mathbb{R}-\\{3\\}")] }, // root in denominator ⇒ strict >; trap uses ≥ → [3,∞)
  { atomKey: "funcs-finding-range:trap:0", stem: "Find the range of \\(f(x)=x^2+1,\\ x\\in\\mathbb{R}\\).", correct: f("[1,\\infty)"), distractors: [f("\\mathbb{R}"), f("[0,\\infty)"), f("(1,\\infty)")] }, // min at x=0 is 1 ⇒ [1,∞); trap returns the codomain ℝ
  { atomKey: "funcs-floor-equations:trap:0", stem: "The solution set of \\([x]=3\\) (where \\([\\cdot]\\) is the floor) is:", correct: f("[3,4)"), distractors: [f("\\{3\\}"), f("(3,4)"), f("[3,4]")] }, // [x]=3 ⇔ 3≤x<4; trap treats it as the single point {3}
  { atomKey: "funcs-floor-graph:trap:0", stem: "Evaluate \\([-2.3]\\) (where \\([\\cdot]\\) is the floor function).", correct: f("-3"), distractors: [f("-2"), f("2"), f("3")] }, // floor rounds DOWN ⇒ −3; trap truncates toward zero → −2
  { atomKey: "funcs-inverse:trap:0", stem: "If \\(f(x)=2x+3\\), find \\(f^{-1}(x)\\).", correct: f("\\dfrac{x-3}{2}"), distractors: [f("\\dfrac{1}{2x+3}"), f("\\dfrac{x+3}{2}"), f("2x-3")] }, // solve y=2x+3 ⇒ (x−3)/2; trap writes the reciprocal 1/f
  { atomKey: "funcs-is-it-a-function:trap:0", stem: "For \\(f(x)=\\begin{cases}x^2,&x\\le 1\\\\ 2x,&x>1\\end{cases}\\), find \\(f(1)\\).", correct: f("1"), distractors: [f("2"), f("3"), f("0")] }, // x=1 uses the x≤1 rule ⇒ 1²=1; trap uses the x>1 rule → 2
  { atomKey: "funcs-modulus-function:trap:0", stem: "Is \\(f(x)=|x|\\) odd, even, or neither?", correct: "Even", distractors: ["Odd", "Neither", "Both odd and even"] }, // |−x|=|x| ⇒ even; trap calls it odd
  { atomKey: "funcs-one-one-onto-bijective:trap:0", stem: "Is \\(f:\\mathbb{R}\\to\\mathbb{R},\\ f(x)=x^2\\) onto (surjective)?", correct: "No", distractors: ["Yes", "Only on \\([0,\\infty)\\)", "Cannot be determined"] }, // range [0,∞)≠ℝ; trap ignores the codomain
  { atomKey: "funcs-one-one-onto-bijective:trap:1", stem: "Is \\(f:\\mathbb{R}\\to\\mathbb{R},\\ f(x)=x^2-4x\\) one-one (injective)?", correct: "No", distractors: ["Yes", "Yes, every polynomial is", "Only for \\(x>0\\)"] }, // parabola is non-monotone ⇒ not one-one; trap says yes
];
