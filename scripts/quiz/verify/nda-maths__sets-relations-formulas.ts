/**
 * NDA Maths · Sets & Relations · FORMULA-recall + reference-FACT MCQs.
 *
 * FORMULA entries (theme="formula"): one per `formula.latex` piece authored into
 * the notes _data (pieces are \qquad-joined → key index = position in that
 * concept's bundle, 0-based; verified by splitFormulaPieces). 14 pieces across 7
 * formula-kind concepts. Distractors are full-equation permutations — wrong
 * versions of the SAME identity, same shape (no length/format tell).
 * SKIPPED as technique/criterion (no recallable equation, formula.latex left
 * empty): set-fundamentals (vocabulary), testing-relations-by-rule (a METHOD:
 * factor→test), operations-and-special-relations (preservation CRITERIA + the
 * R⁻¹ definition). The set-algebra LAWS (De Morgan / distributive / absorption)
 * live in the `set-algebra-laws` concept which is kind:"reference" — it cannot
 * carry a formula.latex, so those are covered by its reference:N FACT atoms below
 * (no coverage lost).
 *
 * FACT entries (theme="fact"): the 8 pre-existing `auto` reference atoms
 * (set-algebra-laws:reference:0-3 + relation-properties:reference:0-3). They were
 * harvested concrete (real stems + sibling options) but get explicit verify
 * entries here so they promote deterministically with hand-checked distractors.
 *   npm run quiz:verify nda-maths__sets-relations-formulas
 */
import type { VerifiedEntry } from "./nda-maths__probability";

const f = (s: string) => `\\(${s}\\)`;

export const VERIFIED: VerifiedEntry[] = [
  // ───────────────────────── FORMULA pieces ─────────────────────────

  // ── set-operations: A−B=A∩B' | (A')'=A ──
  {
    atomKey: "set-operations:formula:0",
    stem: "Which correctly expresses the set difference \\(A - B\\) using a complement?",
    distractors: [f("A - B = A' \\cap B"), f("A - B = A \\cup B'"), f("A - B = A' \\cap B'")],
    theme: "formula",
  },
  {
    atomKey: "set-operations:formula:1",
    stem: "Which is the double-complement (involution) law?",
    distractors: [f("(A')' = A'"), f("(A')' = \\emptyset"), f("(A')' = U")],
    theme: "formula",
  },

  // ── symmetric-difference-equality: A△B = (A−B)∪(B−A) = (A∪B)−(A∩B) ──
  {
    atomKey: "symmetric-difference-equality:formula:0",
    stem: "Which is the correct expansion of the symmetric difference \\(A \\triangle B\\)?",
    distractors: [
      f("A \\triangle B = (A \\cap B) - (A \\cup B)"),
      f("A \\triangle B = (A - B) \\cap (B - A)"),
      f("A \\triangle B = (A \\cup B) \\cup (A \\cap B)"),
    ],
    theme: "formula",
  },

  // ── power-set-and-subsets: |P|=2^n | proper=2^n−1 | contains fixed elt=2^{n-1} ──
  {
    atomKey: "power-set-and-subsets:formula:0",
    stem: "How many subsets does an \\(n\\)-element set have?",
    distractors: [f("|P(A)| = n^2"), f("|P(A)| = 2n"), f("|P(A)| = 2^n - 1")],
    theme: "formula",
  },
  {
    atomKey: "power-set-and-subsets:formula:1",
    stem: "How many proper subsets does an \\(n\\)-element set have?",
    distractors: [f("\\text{proper subsets} = 2^n"), f("\\text{proper subsets} = 2^n - 2"), f("\\text{proper subsets} = 2^{n-1}")],
    theme: "formula",
  },
  {
    atomKey: "power-set-and-subsets:formula:2",
    stem: "How many subsets of an \\(n\\)-element set contain one fixed element?",
    distractors: [
      f("\\text{subsets containing a fixed element} = 2^n - 1"),
      f("\\text{subsets containing a fixed element} = 2^{n+1}"),
      f("\\text{subsets containing a fixed element} = n\\cdot 2^{n-1}"),
    ],
    theme: "formula",
  },

  // ── inclusion-exclusion-two-sets: |A∪B|=… | least-overlap bound ──
  {
    atomKey: "inclusion-exclusion-two-sets:formula:0",
    stem: "Which is the inclusion–exclusion formula for \\(|A \\cup B|\\)?",
    distractors: [
      f("|A \\cup B| = |A| + |B| + |A \\cap B|"),
      f("|A \\cup B| = |A| + |B|"),
      f("|A \\cup B| = |A| \\cdot |B| - |A \\cap B|"),
    ],
    theme: "formula",
  },
  {
    atomKey: "inclusion-exclusion-two-sets:formula:1",
    stem: "Which is the least-overlap bound on \\(|A \\cap B|\\) inside a universe \\(U\\)?",
    distractors: [
      f("|A \\cap B| \\le |A| + |B| - |U|"),
      f("|A \\cap B| \\ge |A| + |B| - |U| + 1"),
      f("|A \\cap B| \\ge |U| - |A| - |B|"),
    ],
    theme: "formula",
  },

  // ── inclusion-exclusion-three-sets: full 3-set IE ──
  {
    atomKey: "inclusion-exclusion-three-sets:formula:0",
    stem: "Which is the inclusion–exclusion formula for \\(|A \\cup B \\cup C|\\)?",
    distractors: [
      f("|A| + |B| + |C| - |A \\cap B| - |B \\cap C| - |A \\cap C| - |A \\cap B \\cap C|"),
      f("|A| + |B| + |C| + |A \\cap B| + |B \\cap C| + |A \\cap C| - |A \\cap B \\cap C|"),
      f("|A| + |B| + |C| - |A \\cap B \\cap C|"),
    ],
    theme: "formula",
  },

  // ── survey-region-counting: exactly two = Σpairwise − 3(all three) | at least two = exactly two + all three ──
  {
    atomKey: "survey-region-counting:formula:0",
    stem: "In a 3-set survey, which identity gives 'exactly two' from the pairwise intersections?",
    distractors: [
      f("\\text{exactly two} = \\textstyle\\sum\\text{pairwise} - (\\text{all three})"),
      f("\\text{exactly two} = \\textstyle\\sum\\text{pairwise} - 2\\,(\\text{all three})"),
      f("\\text{exactly two} = \\textstyle\\sum\\text{pairwise} + 3\\,(\\text{all three})"),
    ],
    theme: "formula",
  },
  {
    atomKey: "survey-region-counting:formula:1",
    stem: "In a 3-set survey, which identity gives 'at least two'?",
    distractors: [
      f("\\text{at least two} = \\text{exactly two} - (\\text{all three})"),
      f("\\text{at least two} = \\text{exactly one} + (\\text{all three})"),
      f("\\text{at least two} = \\text{exactly two} + 2\\,(\\text{all three})"),
    ],
    theme: "formula",
  },

  // ── cartesian-product-and-relations: |A×B| | #relations | (A×B)∩(B×A) ──
  {
    atomKey: "cartesian-product-and-relations:formula:0",
    stem: "What is the size of the Cartesian product \\(|A \\times B|\\)?",
    distractors: [f("|A \\times B| = |A| + |B|"), f("|A \\times B| = 2^{|A||B|}"), f("|A \\times B| = |A|^{|B|}")],
    theme: "formula",
  },
  {
    atomKey: "cartesian-product-and-relations:formula:1",
    stem: "How many relations are there from \\(A\\) to \\(B\\)?",
    distractors: [
      f("\\text{number of relations} = 2^{|A| + |B|}"),
      f("\\text{number of relations} = |A| \\cdot |B|"),
      f("\\text{number of relations} = |A|^{|B|}"),
    ],
    theme: "formula",
  },
  {
    atomKey: "cartesian-product-and-relations:formula:2",
    stem: "Which identity gives \\((A \\times B) \\cap (B \\times A)\\)?",
    distractors: [
      f("(A \\times B) \\cap (B \\times A) = (A \\cup B) \\times (A \\cup B)"),
      f("(A \\times B) \\cap (B \\times A) = (A \\cap B) \\times (A \\cup B)"),
      f("(A \\times B) \\cap (B \\times A) = A \\cap B"),
    ],
    theme: "formula",
  },

  // ───────────────────────── reference FACT atoms (8 auto) ─────────────────────────

  // set-algebra-laws — name↔statement recall (distractors are the sibling laws)
  {
    atomKey: "set-algebra-laws:reference:0",
    stem: "Which statement is the Distributive law of set algebra?",
    correct: f("A\\cup(B\\cap C)=(A\\cup B)\\cap(A\\cup C)"),
    distractors: [
      f("(A\\cup B)'=A'\\cap B'"),
      f("A\\cup(A\\cap B)=A"),
      f("(A\\cap B)\\subseteq(C\\cap B)\\ \\forall B \\Rightarrow A\\subseteq C"),
    ],
    theme: "fact",
  },
  {
    atomKey: "set-algebra-laws:reference:1",
    stem: "Which statement is De Morgan's law for \\((A\\cup B)'\\)?",
    correct: f("(A\\cup B)'=A'\\cap B'"),
    distractors: [
      f("A\\cup(B\\cap C)=(A\\cup B)\\cap(A\\cup C)"),
      f("A\\cup(A\\cap B)=A"),
      f("(A\\cap B)\\subseteq(C\\cap B)\\ \\forall B \\Rightarrow A\\subseteq C"),
    ],
    theme: "fact",
  },
  {
    atomKey: "set-algebra-laws:reference:2",
    stem: "Which statement is the Absorption law of set algebra?",
    correct: f("A\\cup(A\\cap B)=A"),
    distractors: [
      f("(A\\cup B)'=A'\\cap B'"),
      f("A\\cup(B\\cap C)=(A\\cup B)\\cap(A\\cup C)"),
      f("(A\\cap B)\\subseteq(C\\cap B)\\ \\forall B \\Rightarrow A\\subseteq C"),
    ],
    theme: "fact",
  },
  {
    atomKey: "set-algebra-laws:reference:3",
    stem: "Which statement is the 'for all B' subset test?",
    correct: f("(A\\cap B)\\subseteq(C\\cap B)\\ \\forall B \\Rightarrow A\\subseteq C"),
    distractors: [
      f("(A\\cup B)'=A'\\cap B'"),
      f("A\\cup(A\\cap B)=A"),
      f("A\\cup(B\\cap C)=(A\\cup B)\\cap(A\\cup C)"),
    ],
    theme: "fact",
  },

  // relation-properties — property↔test recall
  {
    atomKey: "relation-properties:reference:0",
    stem: "Which test characterises a REFLEXIVE relation R?",
    correct: "Is \\((a,a)\\in R\\) for every a?",
    distractors: [
      "All three hold",
      "Does \\((a,b)\\in R\\) force \\((b,a)\\in R\\)?",
      "Do \\((a,b),(b,c)\\) force \\((a,c)\\)?",
    ],
    theme: "fact",
  },
  {
    atomKey: "relation-properties:reference:1",
    stem: "Which test characterises a SYMMETRIC relation R?",
    correct: "Does \\((a,b)\\in R\\) force \\((b,a)\\in R\\)?",
    distractors: [
      "Is \\((a,a)\\in R\\) for every a?",
      "All three hold",
      "Do \\((a,b),(b,c)\\) force \\((a,c)\\)?",
    ],
    theme: "fact",
  },
  {
    atomKey: "relation-properties:reference:2",
    stem: "Which test characterises a TRANSITIVE relation R?",
    correct: "Do \\((a,b),(b,c)\\) force \\((a,c)\\)?",
    distractors: [
      "All three hold",
      "Does \\((a,b)\\in R\\) force \\((b,a)\\in R\\)?",
      "Is \\((a,a)\\in R\\) for every a?",
    ],
    theme: "fact",
  },
  {
    atomKey: "relation-properties:reference:3",
    stem: "Which test characterises an EQUIVALENCE relation R?",
    correct: "All three hold",
    distractors: [
      "Do \\((a,b),(b,c)\\) force \\((a,c)\\)?",
      "Does \\((a,b)\\in R\\) force \\((b,a)\\in R\\)?",
      "Is \\((a,a)\\in R\\) for every a?",
    ],
    theme: "fact",
  },
];
