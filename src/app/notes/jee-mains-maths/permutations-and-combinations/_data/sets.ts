import type { SubtopicNote } from "@/app/notes/_types";

export const SETS_PNC_NOTE: SubtopicNote = {
  subtopicName: "Counting Functions, Matrices and Subsets",
  title: "Counting Functions, Matrices and Subsets",
  oneLineDefinition:
    "Counting mathematical objects: one-one or increasing functions under conditions, matrices whose entries satisfy a sum condition, and subsets with a property of their elements.",
  whyItMatters:
    "Eighteen PYQs, thirteen of them numerical answer. Each object is a choice made position by position: a function assigns values, a matrix fills cells, a subset includes or leaves out each element. Four count functions, eight count matrices and six count subsets. Three ideas cover the page.",
  concepts: [
    // C1 — functions
    {
      kind: "formula" as const,
      slug: "jpnc-functions",
      name: "Counting functions",
      intuition:
        "A one-one function from an \\(m\\)-set to an \\(n\\)-set is an arrangement: \\({}^nP_m\\). Handle the constrained inputs first, then fill the rest. A strictly increasing function is fixed by its set of values, so it is a choice: \\(\\binom nm\\). If some inputs must take decreasing values, choose those values and their order is forced.",
      definition:
        "- All functions \\(A\\to B\\): \\(n^m\\). One-one: \\({}^nP_m\\).\n" +
        "- Strictly increasing: \\(\\binom nm\\).\n" +
        "- Constrained inputs first, then the free ones.\n" +
        "- Values forced into an order: choose the set, the order is automatic.",
      formula: {
        label: "One-one and increasing",
        latex: "\\#\\{\\text{one-one}\\}={}^nP_m,\\qquad\\#\\{\\text{strictly increasing}\\}=\\binom nm",
      },
      authoredExample: {
        prompt: "How many one-one functions \\(f:\\{1,2,3\\}\\to\\{1,\\dots,5\\}\\) have \\(f(1)=2\\)?",
        steps: [
          "\\(f(2)\\), \\(f(3)\\) from the remaining 4 values: \\(4\\cdot3\\).",
        ],
        answer: "\\(12\\).",
      },
      selfCheckExample: {
        prompt: "How many strictly increasing functions \\(\\{1,2,3\\}\\to\\{1,\\dots,6\\}\\) are there?",
        steps: [
          "Choose the 3 values.",
        ],
        answer: "\\(\\binom63=20\\).",
      },
      practiceSet: [
        { prompt: "Functions \\(\\{1,2\\}\\to\\{1,2,3\\}\\)?", answer: "\\(9\\)" },
        { prompt: "One-one \\(\\{1,2\\}\\to\\{1,2,3\\}\\)?", answer: "\\(6\\)" },
        { prompt: "Bijections of a 4-set?", answer: "\\(24\\)" },
        { prompt: "Non-decreasing functions \\(\\{1,2\\}\\to\\{1,2,3\\}\\)?", answer: "\\(6\\)" },
      ],
      pyqExampleId: "7f241c27-7262-4d59-8313-6c8278b40804", // 2024 — one-one maps with f(a) + f(c) = 14
      traps: [
        {
          title: "Constrained inputs first",
          body: "Assigning free inputs first can use up a value a constrained input needs, and the count then depends on earlier choices. Fix the constrained values first so every later step has a fixed number of options.",
        },
      ],
    },

    // C2 — matrices
    {
      kind: "formula" as const,
      slug: "jpnc-matrices",
      name: "Counting matrices by their entries",
      intuition:
        "A matrix is a list of entries, so a condition on the sum of entries is a distribution problem, and a condition on \\(\\operatorname{tr}(A^TA)\\) is a condition on the sum of squares of all entries. Break the target into squares (\\(0,1,4,9\\)), choose positions for each, and multiply by the sign choices of the non-zero entries.",
      definition:
        "- \\(\\operatorname{tr}(A^TA)=\\operatorname{tr}(AA^T)=\\sum_{i,j}a_{ij}^2\\).\n" +
        "- Entries \\(0/1\\) with \\(k\\) ones: \\(\\binom{\\text{cells}}{k}\\).\n" +
        "- Each non-zero entry from \\(\\{\\pm1,\\pm2\\}\\) doubles the count for its sign.\n" +
        "- Rows and columns each summing to 1 (0/1 entries): permutation matrices, \\(n!\\).",
      formula: {
        label: "Trace of AᵀA",
        latex: "\\operatorname{tr}(A^{T}A)=\\sum_{i,j}a_{ij}^{2}",
      },
      authoredExample: {
        prompt: "How many \\(2\\times2\\) matrices with entries in \\(\\{-1,0,1\\}\\) have \\(\\operatorname{tr}(A^TA)=2\\)?",
        steps: [
          "Exactly two non-zero entries: \\(\\binom42=6\\) positions, \\(2^2=4\\) signs.",
        ],
        answer: "\\(24\\).",
      },
      selfCheckExample: {
        prompt: "How many \\(2\\times2\\) matrices with entries 0 or 1 have entry sum 2?",
        steps: [
          "Choose 2 of the 4 cells.",
        ],
        answer: "\\(6\\).",
      },
      practiceSet: [
        { prompt: "0/1 matrices of order \\(3\\times3\\)?", answer: "\\(2^9\\)" },
        { prompt: "\\(3\\times3\\) permutation matrices?", answer: "\\(6\\)" },
        { prompt: "Ways to write 5 as a sum of squares from \\(\\{0,1,4\\}\\) (as a multiset)?", answer: "\\(4+1\\) or five 1s" },
        { prompt: "\\(\\operatorname{tr}(A^TA)\\) for \\(A=\\begin{bmatrix}1&2\\\\0&1\\end{bmatrix}\\)?", answer: "\\(6\\)" },
      ],
      pyqExampleId: "6790b1ec-3a38-40d3-810e-55e2e7705e25", // 2022 — 3x3 0/1 matrices with a prime entry sum
      traps: [
        {
          title: "Signs multiply only non-zero entries",
          body: "A zero entry has one form; each non-zero entry from \\(\\{-2,-1,1,2\\}\\) has two signs. Multiply by \\(2^{(\\text{number of non-zero entries})}\\), not \\(2^{(\\text{cells})}\\).",
        },
      ],
    },

    // C3 — subsets
    {
      kind: "formula" as const,
      slug: "jpnc-subsets",
      name: "Subsets with a property",
      intuition:
        "An \\(n\\)-set has \\(2^n\\) subsets and \\(\\binom nk\\) of size \\(k\\). A property is often easier through its complement: 'product even' means 'not all odd'. For a condition on the sum modulo 3, group the elements by remainder and count the ways to pick remainders that add to a multiple of 3. Subsets with no two consecutive elements follow the Fibonacci numbers.",
      definition:
        "- Subsets: \\(2^n\\); of size \\(k\\): \\(\\binom nk\\).\n" +
        "- Containing at least one of \\(m\\) special elements: \\(2^n-2^{n-m}\\).\n" +
        "- Sum \\(\\equiv0\\pmod3\\): combine counts by remainder class.\n" +
        "- No two consecutive from \\(\\{1,\\dots,n\\}\\): \\(F_{n+2}\\) (1, 2, 3, 5, 8, 13, …).",
      formula: {
        label: "Complement",
        latex: "\\#\\{\\text{contains an even}\\}=2^n-2^{\\#\\text{odd}}",
      },
      authoredExample: {
        prompt: "How many subsets of \\(\\{1,2,\\dots,6\\}\\) have an even product (the empty set's product is 1)?",
        steps: [
          "All subsets \\(2^6=64\\); those with only odd elements \\(2^3=8\\).",
        ],
        answer: "\\(56\\).",
      },
      selfCheckExample: {
        prompt: "How many subsets of \\(\\{1,2,3,4\\}\\) have no two consecutive numbers?",
        steps: [
          "\\(F_6\\): \\(\\varnothing\\), 4 singletons, \\(\\{1,3\\},\\{1,4\\},\\{2,4\\}\\).",
        ],
        answer: "\\(8\\).",
      },
      practiceSet: [
        { prompt: "Subsets of an 8-element set with exactly 2 elements?", answer: "\\(28\\)" },
        { prompt: "Subsets of \\(\\{1,\\dots,5\\}\\) containing 1?", answer: "\\(16\\)" },
        { prompt: "Non-empty subsets of a 5-set?", answer: "\\(31\\)" },
        { prompt: "\\(|A\\times B|\\) for \\(|A|=5,|B|=2\\)?", answer: "\\(10\\)" },
      ],
      pyqExampleId: "a08781e6-d4f0-4fca-87f4-34c35380c97c", // 2023 — subsets of A x B with 3 to 6 elements
      traps: [
        {
          title: "The empty set",
          body: "Check whether the question counts the empty set. Its sum is 0 — a multiple of 3 — and its product is taken as 1; 'non-empty' removes it.",
        },
      ],
    },
  ],
};
