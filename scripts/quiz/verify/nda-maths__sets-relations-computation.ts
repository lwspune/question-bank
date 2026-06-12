/**
 * NDA Maths · Sets & Relations · practiceSet + selfCheck MCQs (computation).
 * Hand-authored distractors, theme=computation. Every `correct` re-derived from
 * the notes — NO notes answer was wrong (all 41 MCQ-clean atoms checked out).
 * The 11 looksMcqClean=false atoms (open-form expression/listing answers, e.g.
 * "Range = {1,5,9,13,17}", "Transitive only", "n(X∪Y∪Z)") are NOT MCQ-able and
 * are skipped.
 * A handful of terse fill-in-the-blank survey/IE stems are rewritten to the full
 * standalone-question form (full object) so a cold quiz-taker needs no context.
 *   npm run quiz:verify nda-maths__sets-relations-computation
 */
import type { VerifiedEntry } from "./nda-maths__probability";

const e = (atomKey: string, distractors: string[]): VerifiedEntry => ({ atomKey, distractors, theme: "computation" });
const f = (s: string) => `\\(${s}\\)`;

export const VERIFIED: VerifiedEntry[] = [
  // ── set-fundamentals ──
  // empty set is a subset of every set → Yes
  e("set-fundamentals:practiceSet:0", ["No", "Only of itself", "Only of non-empty sets"]),
  // {x∈ℝ: x²=-4} = ∅ → 0 elements
  e("set-fundamentals:practiceSet:1", ["1", "2", "Infinitely many"]),
  // {1,2,3} vs {2,4,6}: same size, different elements → equivalent only
  e("set-fundamentals:practiceSet:2", ["Equal", "Both equal and equivalent", "Neither equal nor equivalent"]),

  // ── set-operations ──
  // A−B = A∩B'
  e("set-operations:practiceSet:0", [f("A'\\cap B"), f("A\\cup B'"), f("A'\\cap B'")]),
  // (A')' = A (involution)
  e("set-operations:practiceSet:1", [f("A'"), f("\\emptyset"), f("U")]),
  // (x-1)(x-4)>0 → x<1 or x>4
  e("set-operations:practiceSet:2", [f("1 < x < 4"), f("x > 4"), f("x < 1")]),
  // multiples of 4 ∩ multiples of 6 = multiples of lcm(4,6)=12
  e("set-operations:practiceSet:3", ["24 (the product)", "2 (the GCD)", "10"]),
  // multiples of 2 ∩ multiples of 3 = multiples of 6
  e("set-operations:selfCheck:0", ["The multiples of 5.", "The multiples of 12.", "The multiples of 2."]),

  // ── set-algebra-laws (computation practice) ──
  // De Morgan: (A∩B)' = A'∪B'
  e("set-algebra-laws:practiceSet:0", [f("A'\\cap B'"), f("A\\cup B"), f("A\\cap B'")]),
  // absorption: A∪(A∩B) = A
  e("set-algebra-laws:practiceSet:1", [f("A\\cup B"), f("A\\cap B"), f("B")]),
  // De Morgan in words: x∉(A∪B) ⇒ x∉A AND x∉B
  e("set-algebra-laws:practiceSet:2", ["OR", "NOT", "XOR"]),

  // ── symmetric-difference-equality ──
  // A△B = ∅ ⇔ A = B
  e("symmetric-difference-equality:practiceSet:0", [
    "When \\(A\\cap B=\\emptyset\\)",
    "When \\(A\\subseteq B\\)",
    "Never",
  ]),
  // A∩B = A∩C does NOT force B=C → No
  e("symmetric-difference-equality:practiceSet:1", ["Yes", "Only if \\(A=\\emptyset\\)", "Only if \\(A=B\\)"]),
  // A∪B = A∩B ⇒ A = B
  e("symmetric-difference-equality:practiceSet:2", [f("A\\subseteq B"), f("A\\cap B=\\emptyset"), f("A=\\emptyset")]),

  // ── power-set-and-subsets ──
  // 10-set has 2^10 = 1024 subsets
  e("power-set-and-subsets:practiceSet:0", [f("2^{10}-1 = 1023"), f("10^2 = 100"), f("2\\times 10 = 20")]),
  // 6-set has 2^6 - 1 = 63 proper subsets
  e("power-set-and-subsets:practiceSet:1", [f("2^6 = 64"), f("2^5 = 32"), f("6^2 = 36")]),
  // A={{1,2}} has ONE element → |P(A)| = 2
  e("power-set-and-subsets:practiceSet:2", ["4", "1", "8"]),
  // subsets of an 8-set containing fixed x → 2^7 = 128
  e("power-set-and-subsets:practiceSet:3", [f("2^8 = 256"), f("2^8 - 1 = 255"), f("2^6 = 64")]),
  // supersets of {3} in {1,2,3,4} excluding the whole set → 2^3 - 1 = 7
  e("power-set-and-subsets:selfCheck:0", ["8", "4", "15"]),

  // ── inclusion-exclusion-two-sets ──
  // |A∪B| = 30+25-10 = 45
  e("inclusion-exclusion-two-sets:practiceSet:0", ["55", "65", "15"]),
  // multiples of 4 ∩ 6 = multiples of 12 (LCM)
  e("inclusion-exclusion-two-sets:practiceSet:1", ["24 (the product)", "2 (the GCD)", "10"]),
  // least |A∩B| = 60+50-100 = 10
  e("inclusion-exclusion-two-sets:practiceSet:2", ["0", "50", "110"]),
  // 1..100 divisible by 2 or 5 = 50+20-10 = 60
  e("inclusion-exclusion-two-sets:selfCheck:0", ["70", "50", "30"]),

  // ── inclusion-exclusion-three-sets ──
  // sign of the triple-overlap term in the 3-set IE formula → + (added back)
  e("inclusion-exclusion-three-sets:practiceSet:0", [
    "− (subtracted)",
    "0 (it cancels)",
    "± (depends on the sets)",
  ]),
  // 3-set formula counts the 7 disjoint Venn regions
  e("inclusion-exclusion-three-sets:practiceSet:1", ["8", "6", "3"]),

  // ── survey-region-counting (terse fill-in stems → full standalone form) ──
  {
    atomKey: "survey-region-counting:practiceSet:0",
    stem: "In a 3-set survey, exactly-two = (sum of the three pairwise intersections) − k·(all three). What is k?",
    correct: "3",
    distractors: ["1", "2", "6"],
    theme: "computation",
  },
  {
    atomKey: "survey-region-counting:practiceSet:1",
    stem: "In a 3-set survey, 'at least two' equals 'exactly two' plus which group?",
    correct: "All three",
    distractors: ["Exactly one", "The total in the union", "The sum of pairwise intersections"],
    theme: "computation",
  },
  {
    atomKey: "survey-region-counting:practiceSet:2",
    stem: "In a 3-set survey, the total in the union (exactly form) = exactly one + exactly two + ?",
    correct: "All three (exactly three)",
    distractors: ["At least two", "The sum of pairwise intersections", "Nothing more"],
    theme: "computation",
  },
  {
    atomKey: "survey-region-counting:practiceSet:3",
    stem: "In a 3-set survey, 'exactly one' equals the total in the union minus which group?",
    correct: "At least two",
    distractors: ["Exactly two", "All three", "The sum of pairwise intersections"],
    theme: "computation",
  },

  // ── cartesian-product-and-relations ──
  // |A×A| = 49 → |A| = 7
  e("cartesian-product-and-relations:practiceSet:0", ["49", "14", "24"]),
  // relations from a 3-set to a 2-set = 2^(3·2) = 64
  e("cartesian-product-and-relations:practiceSet:1", [f("2^5 = 32"), "6", "8"]),
  // (A×B)∩(B×A) = (A∩B)×(A∩B)
  e("cartesian-product-and-relations:practiceSet:2", [
    f("\\emptyset"),
    f("(A\\cap B)"),
    f("(A\\cup B)\\times(A\\cup B)"),
  ]),

  // ── relation-properties (computation practice) ──
  // < on ℕ is not reflexive (x<x never holds)
  e("relation-properties:practiceSet:0", ["Yes", "Only on finite sets", "Only for \\(x=0\\)"]),
  // < is transitive
  e("relation-properties:practiceSet:1", ["No", "Only on finite sets", "Only for positive integers"]),
  // (1,2)∈R, (2,1)∉R → symmetry fails
  e("relation-properties:practiceSet:3", ["Reflexive", "Transitive", "Antisymmetric"]),

  // ── testing-relations-by-rule ──
  // x²-5xy+4y² = (x-y)(x-4y)
  e("testing-relations-by-rule:practiceSet:0", [f("(x-2y)^2"), f("(x+y)(x+4y)"), f("(x-y)(x+4y)")]),
  // log_a x > log_a y with 0<a<1 (decreasing) ⇒ x < y
  e("testing-relations-by-rule:practiceSet:1", [f("x > y"), f("x = y"), f("x>0,\\ y>0")]),
  // strict x<y is not reflexive
  e("testing-relations-by-rule:practiceSet:2", ["Yes", "Only if \\(x=y\\) is allowed", "Only on \\(\\mathbb{N}\\)"]),

  // ── operations-and-special-relations ──
  // R symmetric ⇒ R⁻¹ symmetric
  e("operations-and-special-relations:practiceSet:0", ["No", "Only if R is also reflexive", "Only if R is transitive"]),
  // not every relation is a function
  e("operations-and-special-relations:practiceSet:1", ["Yes", "Only if the domain is finite", "Only if it is symmetric"]),
  // 'same age as' is an equivalence relation
  e("operations-and-special-relations:practiceSet:2", ["A partial order", "A function", "Symmetric but not transitive"]),
  // P,Q reflexive ⇒ P∩Q reflexive
  e("operations-and-special-relations:selfCheck:0", ["No", "Only \\(P\\cup Q\\) is reflexive", "Only if \\(P=Q\\)"]),
];
