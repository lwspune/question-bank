import type { SubtopicNote } from "@/app/notes/_types";

export const COMBINATIONS_NOTE: SubtopicNote = {
  subtopicName: "Combinations",
  title: "Combinations & Selections",
  oneLineDefinition:
    "Selecting a group where order doesn't matter — straight nCr selections, subsets, and the constrained selections (at-least / at-most, compulsory members, complementary counting).",
  whyItMatters:
    "Selection problems hinge on spotting that order is irrelevant. The high-value trick is complementary counting — 'at least one' is total minus none — which beats summing cases.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "pc-combinations-basics",
      name: "Selections and subsets",
      intuition:
        "A combination counts groups, not orders. Choosing \\(r\\) from \\(n\\) is \\(^nC_r\\); the number of subsets of an \\(n\\)-set is \\(2^n\\). Fixing compulsory members just reduces the pool and the number to choose.",
      definition:
        "Choose \\(r\\) of \\(n\\) (order irrelevant): \\(^nC_r\\). **Subsets** of an \\(n\\)-element set: \\(2^n\\). **Compulsory members:** if \\(k\\) must be included, choose the rest: \\(^{n-k}C_{r-k}\\). Probabilities use \\(\\dfrac{\\text{favourable }C}{\\text{total }C}\\).",
      authoredExample: {
        prompt: "In how many ways can a committee of 3 be chosen from 8 people?",
        steps: [
          "Order irrelevant: \\(^8C_3=\\dfrac{8\\cdot7\\cdot6}{3!}\\).",
        ],
        answer: "\\(56\\).",
      },
      selfCheckExample: {
        prompt: "A team of 5 is chosen from 10 players, 2 of whom must be included. How many teams?",
        steps: [
          "Fix the 2; choose 3 more from the remaining 8.",
          "\\(^8C_3=56\\).",
        ],
        answer: "\\(56\\).",
      },
      practiceSet: [
        { prompt: "Choose \\(r\\) of \\(n\\), order irrelevant?", answer: "\\(^nC_r\\)" },
        { prompt: "Number of subsets of an \\(n\\)-set?", answer: "\\(2^n\\)" },
        { prompt: "\\(^8C_3=\\)?", answer: "\\(56\\)" },
        { prompt: "\\(k\\) compulsory members of \\(r\\) from \\(n\\)?", answer: "\\(^{n-k}C_{r-k}\\)" },
      ],
      pyqExampleId: "ed8034ae-da8d-46e8-abac-8d973ef6d053", // team of 5
    },

    {
      kind: "formula" as const,
      slug: "pc-selection-constraints",
      name: "Constrained selection: at-least, at-most, cases",
      intuition:
        "When a selection must satisfy 'at least one of X', it's almost always faster to count the complement (total minus the forbidden 'none') than to sum cases. Genuinely multi-part constraints split into disjoint cases that add.",
      definition:
        "**At-least-one:** \\(\\text{total}-\\text{none}\\). **At-most \\(k\\):** sum \\(^nC_0+\\cdots+^nC_k\\). **Cases:** when the constraint forces distinct sub-situations (e.g. 'choose 3 from 4 women + 3 men with a balance rule'), count each disjoint case and add. Watch for over-/under-counting at the boundaries.",
      authoredExample: {
        prompt: "From 6 programmers and 4 typists, choose 5 with at least one typist. How many ways?",
        steps: [
          "Total \\(^{10}C_5=252\\); none-typist (all programmers) \\(^6C_5=6\\).",
          "At least one \\(=252-6\\).",
        ],
        answer: "\\(246\\).",
      },
      selfCheckExample: {
        prompt: "How many selections of at most 2 items from 5 distinct items?",
        steps: [
          "\\(^5C_0+^5C_1+^5C_2=1+5+10\\).",
        ],
        answer: "\\(16\\).",
      },
      practiceSet: [
        { prompt: "'At least one' is best counted as?", answer: "Total − none" },
        { prompt: "'At most \\(k\\)' selections?", answer: "\\(^nC_0+\\cdots+^nC_k\\)" },
        { prompt: "At least one typist, 5 of 6+4, none\\(=^6C_5\\): answer?", answer: "\\(252-6=246\\)" },
        { prompt: "When do you sum cases?", answer: "When the constraint forces disjoint sub-situations" },
      ],
      pyqExampleId: "0ec810a7-c5b1-4287-9c8e-1d2abb833b1b", // 7 relatives
    },
  ],
  related: [
    { label: "Arrangements with Restrictions", href: "/notes/nda-maths/permutation-combination/pc-arrangements" },
    { label: "Geometric Counting", href: "/notes/nda-maths/permutation-combination/pc-geometric-counting" },
  ],
};
