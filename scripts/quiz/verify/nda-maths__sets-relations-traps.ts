/**
 * NDA Maths · Sets & Relations · COMMON-TRAPS theme — "spot the mistake / compute
 * the value" MCQs. One per misconception callout authored into the notes (13
 * concepts, each with a single trap → index 0). The first distractor in each is
 * the warned mistake from the trap's body.
 *   npm run quiz:verify nda-maths__sets-relations-traps
 */
import type { VerifiedEntry } from "./nda-maths__probability";

const f = (s: string) => `\\(${s}\\)`;

export const VERIFIED: VerifiedEntry[] = [
  {
    // equal vs equivalent
    atomKey: "set-fundamentals:trap:0",
    stem: "How are the sets \\(\\{1,3,5\\}\\) and \\(\\{2,4,7\\}\\) related?",
    correct: "Equivalent but not equal",
    distractors: ["Equal", "Both equal and equivalent", "Neither equal nor equivalent"],
    theme: "trap",
  },
  {
    // A−B is not symmetric: A−B ≠ B−A
    atomKey: "set-operations:trap:0",
    stem: "If \\(A=\\{1,2,3\\}\\) and \\(B=\\{2,3,4\\}\\), what is \\(A - B\\)?",
    correct: f("\\{1\\}"),
    distractors: [f("\\{4\\}"), f("\\{1,4\\}"), f("\\{2,3\\}")],
    theme: "trap",
  },
  {
    // three disjoint pieces rebuild the union
    atomKey: "set-operations:trap:1",
    stem: "Simplify \\((A - B) \\cup (A \\cap B) \\cup (B - A)\\).",
    correct: f("A \\cup B"),
    distractors: [f("A \\cap B"), f("\\emptyset"), f("A")],
    theme: "trap",
  },
  {
    // wrong option is a genuine law with an operation flipped
    atomKey: "set-algebra-laws:trap:0",
    stem: "Which of these is NOT a correct identity of set algebra?",
    correct: f("A\\cup(A\\cap B)=A\\cup B"),
    distractors: [
      f("A\\cap(A\\cup B)=A"),
      f("(A\\cup B)'=A'\\cap B'"),
      f("A\\cup(B\\cap C)=(A\\cup B)\\cap(A\\cup C)"),
    ],
    theme: "trap",
  },
  {
    // you cannot cancel sets like numbers
    atomKey: "symmetric-difference-equality:trap:0",
    stem: "Given \\(A\\cap B = A\\cap C\\), does it follow that \\(B = C\\)?",
    correct: "No — not necessarily",
    distractors: ["Yes, always", "Yes, provided \\(A\\neq\\emptyset\\)", "Only if \\(B\\subseteq C\\)"],
    theme: "trap",
  },
  {
    // count the elements before raising 2 to a power
    atomKey: "power-set-and-subsets:trap:0",
    stem: "How many subsets does \\(A=\\{\\lambda,\\ \\{\\lambda,\\mu\\}\\}\\) have?",
    correct: "4",
    distractors: ["8", "2", "16"],
    theme: "trap",
  },
  {
    // overlap of multiples uses LCM, not product
    atomKey: "inclusion-exclusion-two-sets:trap:0",
    stem: "How many integers from 1 to 60 are divisible by BOTH 4 and 6?",
    correct: "5",
    distractors: ["2", "10", "15"],
    theme: "trap",
  },
  {
    // mind the alternating signs
    atomKey: "inclusion-exclusion-three-sets:trap:0",
    stem: "In the formula for \\(|A\\cup B\\cup C|\\), the triple overlap \\(|A\\cap B\\cap C|\\) is…",
    correct: "Added",
    distractors: ["Subtracted", "Ignored", "Subtracted twice"],
    theme: "trap",
  },
  {
    // 'exactly two' ≠ sum of pairwise intersections
    atomKey: "survey-region-counting:trap:0",
    stem: "The three pairwise intersections sum to 30 and 4 people are in all three sets. How many are in EXACTLY two sets?",
    correct: "18",
    distractors: ["30", "26", "22"],
    theme: "trap",
  },
  {
    // range can be smaller than the codomain
    atomKey: "cartesian-product-and-relations:trap:0",
    stem: "On \\(A=\\{1,2,3\\}\\) with codomain \\(\\{1,2,\\dots,6\\}\\), let \\(R=\\{(x,y):y=2x\\}\\). What is the RANGE of R?",
    correct: f("\\{2,4,6\\}"),
    distractors: [f("\\{1,2,3,4,5,6\\}"), f("\\{1,2,3\\}"), f("\\{1,3,5\\}")],
    theme: "trap",
  },
  {
    // reflexive means EVERY element, not just some
    atomKey: "relation-properties:trap:0",
    stem: "On \\(\\{1,2,3,4\\}\\), \\(R=\\{(1,1),(2,2),(3,3)\\}\\). Is R reflexive?",
    correct: "No — \\((4,4)\\) is missing",
    distractors: ["Yes", "Yes, three self-loops are enough", "Only on the subset \\(\\{1,2,3\\}\\)"],
    theme: "trap",
  },
  {
    // factor before you test
    atomKey: "testing-relations-by-rule:trap:0",
    stem: "The relation defined by \\(x^2 - 5xy + 4y^2 = 0\\) is equivalent to which condition?",
    correct: f("x = y \\text{ or } x = 4y"),
    distractors: [f("x = y \\text{ and } x = 4y"), f("x = 2y"), f("x = 5y \\text{ or } x = 4y")],
    theme: "trap",
  },
  {
    // every function is a relation, not the reverse
    atomKey: "operations-and-special-relations:trap:0",
    stem: "Which statement is TRUE?",
    correct: "Every function is a relation",
    distractors: [
      "Every relation is a function",
      "No relation is a function",
      "A relation and a function are the same thing",
    ],
    theme: "trap",
  },
];
