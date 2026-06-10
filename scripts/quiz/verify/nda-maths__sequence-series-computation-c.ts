/**
 * NDA Maths · Sequence & Series · seq-interrelating-progressions + seq-special-series
 * practiceSet + selfCheck MCQs (computation). Hand-authored distractors, theme=computation.
 *   npm run quiz:verify nda-maths__sequence-series-computation-c
 */
import type { VerifiedEntry } from "./nda-maths__probability";

const e = (atomKey: string, distractors: string[]): VerifiedEntry => ({ atomKey, distractors, theme: "computation" });
const f = (s: string) => `\\(${s}\\)`;

export const VERIFIED: VerifiedEntry[] = [
  // ── seq-interrelating-progressions ──────────────────────────────────────

  // log-bridge-gp-to-ap
  e("log-bridge-gp-to-ap:practiceSet:0", ["GP", "HP", f("\\ln r")]),
  e("log-bridge-gp-to-ap:practiceSet:1", ["AP", "HP", "Equal"]),
  e("log-bridge-gp-to-ap:practiceSet:2", ["No", "Only if base is 10", "They are in GP"]),
  e("log-bridge-gp-to-ap:practiceSet:3", [f("\\ln(xz)"), f("r"), f("\\ln x")]),

  // mixed-progression-problems
  e("mixed-progression-problems:practiceSet:0", ["In GP only", "In AP only", "Distinct and increasing"]),
  e("mixed-progression-problems:practiceSet:1", ["AP", "HP", "Equal"]),
  e("mixed-progression-problems:practiceSet:2", [f("ac"), f("b^2"), f("a - c")]),
  e("mixed-progression-problems:practiceSet:3", [f("c^2 = b + d"), f("2c = b + d"), f("b^2 = cd")]),

  // reciprocal-bridge-hp-to-ap
  e("reciprocal-bridge-hp-to-ap:practiceSet:0", ["HP", "GP", "Equal"]),
  e("reciprocal-bridge-hp-to-ap:practiceSet:1", ["Logarithms", "Squares", "The mean"]),
  e("reciprocal-bridge-hp-to-ap:practiceSet:2", ["AP", "GP", "Reciprocals"]),
  e("reciprocal-bridge-hp-to-ap:practiceSet:3", [f("2a = b + c"), f("2c = a + b"), f("b^2 = ac")]),
  e("reciprocal-bridge-hp-to-ap:selfCheck:0", [f("\\dfrac{2}{a}"), f("\\dfrac{1}{b}"), f("\\dfrac{2}{a+c}")]),

  // three-term-conditions
  e("three-term-conditions:practiceSet:0", [f("2b = ac"), f("b = \\sqrt{a} + \\sqrt{c}"), f("b = \\tfrac{a+c}{2}")]),
  e("three-term-conditions:practiceSet:1", [f("-1"), f("\\tfrac{a}{c}"), f("2")]),
  e("three-term-conditions:practiceSet:2", ["GP", "HP", "None of these"]),
  e("three-term-conditions:practiceSet:3", [f("1"), f("\\tfrac{c}{a}"), f("\\tfrac{a-c}{b}")]),
  e("three-term-conditions:selfCheck:0", ["Both equal 2.", "Both equal 1.", "Both equal 6."]),

  // vieta-progression-conditions
  e("vieta-progression-conditions:practiceSet:0", [f("-7"), f("12"), f("\\tfrac{7}{12}")]),
  e("vieta-progression-conditions:practiceSet:1", [f("-\\tfrac52"), f("\\tfrac32"), f("\\tfrac35")]),
  e("vieta-progression-conditions:practiceSet:2", [f("\\tfrac{\\alpha\\beta}{\\alpha+\\beta}"), f("\\alpha + \\beta"), f("\\tfrac{1}{\\alpha\\beta}")]),
  e("vieta-progression-conditions:practiceSet:3", [f("b^2 = c"), f("b = 4c"), f("b^2 = 2c")]),
  e("vieta-progression-conditions:selfCheck:0", [f("k = 18"), f("k = 81"), f("k = 90")]),

  // ── seq-special-series ──────────────────────────────────────────────────

  // arithmetic-geometric-series
  e("arithmetic-geometric-series:practiceSet:0", [f("r^k"), f("r"), f("k\\,r^k")]),
  e("arithmetic-geometric-series:practiceSet:1", [f("S^2"), f("\\tfrac{S}{r}"), f("kS")]),
  e("arithmetic-geometric-series:practiceSet:2", ["An AP", "An AGP", "An HP"]),
  e("arithmetic-geometric-series:practiceSet:3", [f("12"), f("27"), f("18")]),
  e("arithmetic-geometric-series:selfCheck:0", [f("212"), f("260"), f("114")]),

  // factorial-series
  e("factorial-series:practiceSet:0", [f("(n+1)! - 1"), f("n! - 1"), f("n\\cdot(n-1)!")]),
  e("factorial-series:practiceSet:1", [f("(n+1)! - n!"), f("n! - 1"), f("(n+1)!")]),
  e("factorial-series:practiceSet:2", ["No", "Only for even \\(k\\)", "Only for \\(k \\ge 12\\)"]),
  e("factorial-series:practiceSet:3", [f("0"), f("3"), f("5")]),
  e("factorial-series:selfCheck:0", [f("120"), f("153"), f("5039")]),

  // power-sums
  e("power-sums:practiceSet:0", [f("\\tfrac{n(n+1)(2n+1)}{6}"), f("n(n+1)"), f("\\left(\\tfrac{n(n+1)}{2}\\right)^2")]),
  e("power-sums:practiceSet:1", [f("420"), f("190"), f("400")]),
  e("power-sums:practiceSet:2", [f("100"), f("20"), f("36")]),
  e("power-sums:practiceSet:3", [f("\\sum k^2"), f("\\tfrac{n(n+1)(2n+1)}{6}"), f("n")]),
  e("power-sums:selfCheck:0", [f("55"), f("3025"), f("15")]),

  // telescoping-and-number-patterns
  e("telescoping-and-number-patterns:practiceSet:0", [f("\\tfrac1k + \\tfrac{1}{k+1}"), f("\\tfrac{1}{k+1} - \\tfrac1k"), f("\\tfrac{1}{k} \\cdot \\tfrac{1}{k+1}")]),
  e("telescoping-and-number-patterns:practiceSet:1", [f("\\tfrac{10^n + 1}{9}"), f("10^n - 1"), f("\\tfrac{9}{10^n - 1}")]),
  e("telescoping-and-number-patterns:practiceSet:2", [f("a + b"), f("a^2 - b^2"), f("ab")]),
  e("telescoping-and-number-patterns:practiceSet:3", [f("\\tfrac{1}{4}"), f("\\tfrac{11}{12}"), f("1")]),
];
