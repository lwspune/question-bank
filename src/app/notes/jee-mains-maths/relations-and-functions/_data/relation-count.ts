import type { SubtopicNote } from "@/app/notes/_types";

export const RELATION_COUNT_FN_NOTE: SubtopicNote = {
  subtopicName: "Counting Relations and Their Elements",
  title: "Counting Relations and Their Elements",
  oneLineDefinition:
    "Counting the ordered pairs in a relation, the fewest pairs to add to make it reflexive, symmetric or an equivalence, and the number of relations of a given type on a finite set.",
  whyItMatters:
    "Thirty-nine PYQs, the largest page in the chapter, and seventeen of them are numerical answers with no options to check against. The work is careful counting: go element by element, keep order in the pairs, and use the equivalence classes to count what must be added. Three ideas cover the page.",
  concepts: [
    // C1 — counting pairs
    {
      kind: "formula" as const,
      slug: "jfn-count-pairs",
      name: "Counting the pairs in a relation",
      intuition:
        "Take the first element one value at a time and count its partners, then add. When a relation on \\(A\\times B\\) has a condition linking \\(a_1\\) with \\(b_2\\) and a separate condition linking \\(a_2\\) with \\(b_1\\), count each condition on its own and multiply. When the condition is 'sum on the left = sum on the right', list how often each sum occurs on each side and multiply the matching frequencies.",
      definition:
        "- \\(n(R)=\\sum_a(\\text{number of }b\\text{ with }aRb)\\).\n" +
        "- **Independent conditions:** \\(n(R)=N_1\\times N_2\\).\n" +
        "- **Equal sums:** \\(n(R)=\\sum_s(\\text{ways to make }s\\text{ on the left})\\times(\\text{ways on the right})\\).\n" +
        "- \\((a,b)\\) and \\((b,a)\\) are different pairs unless \\(a=b\\).",
      formula: {
        label: "Pairs in a relation",
        latex: "n(R)=\\sum_{a}\\#\\{b: aRb\\}",
      },
      authoredExample: {
        prompt: "On \\(\\{1,2,3,4\\}\\), \\(xRy\\) if \\(x+2y\\le8\\). Find \\(n(R)\\).",
        steps: [
          "\\(x=1\\): \\(y\\le3.5\\), 3 values. \\(x=2\\): \\(y\\le3\\), 3. \\(x=3\\): \\(y\\le2.5\\), 2. \\(x=4\\): \\(y\\le2\\), 2.",
        ],
        answer: "\\(10\\).",
      },
      selfCheckExample: {
        prompt: "Count the integer pairs \\((x,y)\\) with \\(x^2+y^2<5\\).",
        steps: [
          "\\(x=0\\): 5 values of \\(y\\). \\(x=\\pm1\\): 3 each. \\(x=\\pm2\\): 1 each.",
        ],
        answer: "\\(13\\).",
      },
      practiceSet: [
        { prompt: "\\(a\\le b\\) on \\(\\{1,\\dots,5\\}\\): pairs?", answer: "\\(15\\)" },
        { prompt: "\\(a\\) divides \\(b\\) on \\(\\{1,\\dots,6\\}\\): pairs?", answer: "\\(14\\)" },
        { prompt: "Pairs in \\(\\{1,2,3,4\\}^2\\) with \\(a+b=5\\)?", answer: "\\(4\\)" },
        { prompt: "\\(R=A\\times A\\), \\(|A|=6\\): pairs?", answer: "\\(36\\)" },
      ],
      pyqExampleId: "6945ba6c-94d7-4707-97d7-f3e9b2a1ce74", // 2026 — integer pairs with 4x^2 + y^2 < 52
      traps: [
        {
          title: "Count both orders",
          body: "\\((1,2)\\) and \\((2,1)\\) are two elements of a relation. A count done over unordered pairs must be doubled, except for pairs with equal entries.",
        },
      ],
    },

    // C2 — fewest pairs to add
    {
      kind: "formula" as const,
      slug: "jfn-closure",
      name: "Fewest pairs to add: reflexive, symmetric, equivalence",
      intuition:
        "For reflexive, add each missing \\((a,a)\\). For symmetric, add the reverse of each pair whose reverse is missing. For an equivalence, see which elements the given pairs link into groups; each group becomes a class, unlinked elements are classes of one, and the smallest equivalence has the sum of the squares of the class sizes. Subtract the pairs already there.",
      definition:
        "- **Reflexive:** add the missing diagonal pairs.\n" +
        "- **Symmetric:** add the missing reverses.\n" +
        "- **Equivalence:** classes = linked groups; smallest relation has \\(\\sum k_i^2\\) pairs.\n" +
        "- **Added** = (size of the smallest relation) − \\(n(R)\\).",
      formula: {
        label: "Smallest equivalence containing R",
        latex: "\\sum_i k_i^2\\ \\text{pairs, } k_i=\\text{class sizes}",
      },
      authoredExample: {
        prompt: "\\(R=\\{(1,2),(3,4)\\}\\) on \\(\\{1,2,3,4,5\\}\\). Fewest pairs to add for an equivalence?",
        steps: [
          "Classes \\(\\{1,2\\}\\), \\(\\{3,4\\}\\), \\(\\{5\\}\\): \\(4+4+1=9\\) pairs.",
          "Two are present.",
        ],
        answer: "\\(7\\).",
      },
      selfCheckExample: {
        prompt: "\\(R=\\{(1,2),(2,3)\\}\\) on \\(\\{1,2,3\\}\\). Fewest pairs to add for symmetry?",
        steps: [
          "Add \\((2,1)\\) and \\((3,2)\\).",
        ],
        answer: "\\(2\\).",
      },
      practiceSet: [
        { prompt: "Make \\(\\{(1,1),(1,2)\\}\\) on \\(\\{1,2\\}\\) reflexive: add?", answer: "\\(1\\)" },
        { prompt: "10 pairs, 4 on the diagonal, no reverses present. Add for symmetry?", answer: "\\(6\\)" },
        { prompt: "Smallest equivalence on \\(\\{1,\\dots,5\\}\\) containing \\((1,2),(2,3)\\)?", answer: "\\(11\\) pairs" },
        { prompt: "The given pairs link all of a 4-element set. Smallest equivalence?", answer: "\\(16\\) pairs" },
      ],
      pyqExampleId: "948118df-5915-4858-8c47-722ee5df8e01", // 2025 — {(1,2),(2,3),(3,3)} on {1,2,3,4} to an equivalence
      traps: [
        {
          title: "Symmetry then transitivity brings the diagonal",
          body: "Once \\((1,2)\\) and \\((2,1)\\) are both present, transitivity forces \\((1,1)\\) and \\((2,2)\\). A count for 'symmetric and transitive' must include them.",
        },
      ],
    },

    // C3 — counting relations
    {
      kind: "formula" as const,
      slug: "jfn-count-relations",
      name: "Counting relations of a given type",
      intuition:
        "A relation on an \\(n\\)-element set is any subset of the \\(n^2\\) ordered pairs, so there are \\(2^{n^2}\\). Reflexive fixes the \\(n\\) diagonal pairs: \\(2^{n^2-n}\\). Symmetric decides each diagonal pair and each unordered off-diagonal pair once: \\(2^{n(n+1)/2}\\). Reflexive and symmetric: \\(2^{n(n-1)/2}\\). Equivalence relations match the ways to split the set into classes: 5 for 3 elements, 15 for 4.",
      definition:
        "- All relations: \\(2^{n^2}\\). Reflexive: \\(2^{n^2-n}\\).\n" +
        "- Symmetric: \\(2^{n(n+1)/2}\\). Reflexive and symmetric: \\(2^{n(n-1)/2}\\).\n" +
        "- Equivalence relations = partitions: \\(n=3\\to5\\), \\(n=4\\to15\\).\n" +
        "- Small cases with extra conditions: list them.",
      formula: {
        label: "Symmetric relations",
        latex: "2^{n(n+1)/2}",
      },
      authoredExample: {
        prompt: "How many reflexive relations are there on \\(\\{1,2,3,4\\}\\)?",
        steps: [
          "The 4 diagonal pairs are fixed; the other 12 are free.",
        ],
        answer: "\\(2^{12}=4096\\).",
      },
      selfCheckExample: {
        prompt: "How many equivalence relations are there on \\(\\{1,2,3,4\\}\\)?",
        steps: [
          "Count partitions: 1 (one class) + 7 (two classes) + 6 (three classes) + 1 (four classes).",
        ],
        answer: "\\(15\\).",
      },
      practiceSet: [
        { prompt: "Relations on a 2-element set?", answer: "\\(16\\)" },
        { prompt: "Reflexive relations on a 2-element set?", answer: "\\(4\\)" },
        { prompt: "Equivalence relations on a 3-element set?", answer: "\\(5\\)" },
        { prompt: "Symmetric but not reflexive on \\(\\{1,2\\}\\)?", answer: "\\(8-2=6\\)" },
      ],
      pyqExampleId: "a90ed93f-79d9-48c1-a8d2-d859d1866de9", // 2026 — reflexive and symmetric relations on {a,b,c,d}
      traps: [
        {
          title: "Equivalences are not a power of 2",
          body: "Equivalence relations correspond to partitions, not to free yes/no choices. Count the ways to split the set into classes.",
        },
      ],
    },
  ],
};
