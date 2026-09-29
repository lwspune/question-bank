import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_QE_RELATION_NOTE: SubtopicNote = {
  subtopicName: "Roots in a Given Relation",
  title: "Roots in a Given Relation",
  oneLineDefinition:
    "When the roots are tied together — in a ratio, reciprocal, or equal to the coefficients themselves — write them in that form and apply the sum and product.",
  whyItMatters:
    "Ten PYQs. Every one starts the same way: name the roots so that the relation is built in (kt and t, t and 1/t, or p and q themselves), then write the sum and product and eliminate. The 'roots are p and q' question has appeared in four papers.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdsqe-roots-in-ratio",
      name: "Roots in a ratio",
      intuition:
        "If the roots are in the ratio \\(m : n\\), call them \\(mt\\) and \\(nt\\). The sum gives \\(t\\), the product gives \\(t^2\\), and squaring the first to match the second removes \\(t\\).",
      definition:
        "For \\(ax^2 + bx + c = 0\\):\n" +
        "- roots in the ratio \\(m : n\\) \\(\\iff\\) \\(mn\\,b^2 = (m + n)^2\\,ac\\);\n" +
        "- one root twice the other (\\(m : n = 2 : 1\\)): \\(2b^2 = 9ac\\);\n" +
        "- reciprocal roots (product \\(1\\)): \\(c = a\\);\n" +
        "- equal in size, opposite in sign (sum \\(0\\)): \\(b = 0\\).",
      formula: {
        label: "Roots in the ratio m : n",
        latex: "mn\\,b^2 = (m + n)^2\\,ac",
      },
      authoredExample: {
        prompt: "One root of \\(x^2 - kx + 18 = 0\\) is twice the other. Find the positive value of \\(k\\).",
        steps: [
          "Roots \\(t\\) and \\(2t\\): product \\(2t^2 = 18\\), so \\(t = \\pm 3\\).",
          "Sum \\(3t = k\\); the positive value uses \\(t = 3\\).",
          "Check with the rule: \\(2k^2 = 9\\times 18\\), so \\(k^2 = 81\\).",
        ],
        answer: "\\(k = 9\\).",
      },
      selfCheckExample: {
        prompt: "The roots of \\(3x^2 + 5x + (k - 1) = 0\\) are reciprocals. Find \\(k\\).",
        steps: ["The product is \\(\\dfrac{k - 1}{3} = 1\\)."],
        answer: "\\(k = 4\\).",
      },
      practiceSet: [
        { prompt: "Roots of \\(ax^2 + bx + c = 0\\) equal and opposite. Condition?", answer: "\\(b = 0\\)" },
        { prompt: "Roots of \\(x^2 - 5x + k = 0\\) in the ratio \\(2 : 3\\). \\(k\\)?", answer: "\\(6\\)" },
        { prompt: "Roots of \\(px^2 + 3x + 7 = 0\\) reciprocal. \\(p\\)?", answer: "\\(7\\)" },
        { prompt: "Condition for one root three times the other?", answer: "\\(3b^2 = 16ac\\)" },
      ],
      pyqExampleId: "ad071226-9d7f-4d27-a1e2-08243e0b8bf9", // 2017 (I) — one root twice the other
      traps: [
        {
          title: "Keep both signs of t",
          body:
            "\\(t^2\\) from the product gives two values of \\(t\\), and each gives a different coefficient. The question usually asks for 'the positive value'; make sure you pick the \\(t\\) that produces it.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsqe-roots-are-coefficients",
      name: "When the roots are the coefficients",
      intuition:
        "If \\(p\\) and \\(q\\) are both the coefficients and the roots of \\(x^2 + px + q = 0\\), the sum and product give two equations in \\(p\\) and \\(q\\). The product equation usually factorises, which splits the problem into cases.",
      definition:
        "For \\(x^2 + px + q = 0\\) with roots \\(p\\) and \\(q\\):\n" +
        "- sum: \\(p + q = -p\\), so \\(q = -2p\\);\n" +
        "- product: \\(pq = q\\), so \\(q(p - 1) = 0\\);\n" +
        "- hence \\(p = q = 0\\), or \\(p = 1\\), \\(q = -2\\). A condition like \\(q \\ne 0\\) picks the second.\n" +
        "Shifted roots: if the roots of one equation increased by \\(k\\) are the roots of another, compare sums (\\(2k\\) apart) and products.",
      formula: {
        label: "Roots p and q of x² + px + q = 0",
        latex: "p + q = -p, \\quad pq = q \\;\\Rightarrow\\; (p, q) = (0, 0) \\text{ or } (1, -2)",
      },
      authoredExample: {
        prompt: "The roots of \\(x^2 + ax + b = 0\\) are \\(2a\\) and \\(b\\), with \\(b \\ne 0\\). Find \\(a\\) and \\(b\\).",
        steps: [
          "Product: \\(2ab = b\\), and \\(b \\ne 0\\), so \\(a = \\dfrac12\\).",
          "Sum: \\(2a + b = -a\\), so \\(b = -3a = -\\dfrac32\\).",
          "Check: \\(x^2 + \\dfrac12x - \\dfrac32 = 0\\) is \\((x - 1)(2x + 3) = 0\\), with roots \\(1 = 2a\\) and \\(-\\dfrac32 = b\\).",
        ],
        answer: "\\(a = \\dfrac12\\), \\(b = -\\dfrac32\\).",
      },
      selfCheckExample: {
        prompt: "The roots of \\(x^2 + mx + n = 0\\), each increased by \\(1\\), are the roots of \\(x^2 - 3x + 2 = 0\\). Find \\(m\\) and \\(n\\).",
        steps: [
          "The new roots are \\(1\\) and \\(2\\), so the old ones are \\(0\\) and \\(1\\).",
          "Old sum \\(1 = -m\\), old product \\(0 = n\\).",
        ],
        answer: "\\(m = -1\\), \\(n = 0\\).",
      },
      practiceSet: [
        { prompt: "Roots \\(p, q\\) of \\(x^2 + px + q = 0\\), \\(q \\ne 0\\). \\(p\\)?", answer: "\\(1\\)" },
        { prompt: "Same equation: \\(q\\)?", answer: "\\(-2\\)" },
        { prompt: "Roots increased by \\(k\\): how does the sum change?", answer: "It increases by \\(2k\\)" },
        { prompt: "Roots of \\(x^2 - 5x + 6 = 0\\) each decreased by \\(2\\). New equation?", answer: "\\(x^2 - x = 0\\)" },
      ],
      pyqExampleId: "11fe175c-e985-4937-96f4-5618bccf27aa", // 2019 (I) — roots are p and q, q ≠ 0
      traps: [
        {
          title: "Do not divide by a letter that can be zero",
          body:
            "From \\(pq = q\\) you may conclude \\(p = 1\\) only when \\(q \\ne 0\\). If the question does not say so, \\(p = q = 0\\) is also a solution, and an option like '\\(p = 0\\) or \\(1\\)' becomes the correct one.",
        },
      ],
    },
  ],
};
