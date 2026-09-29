import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_AI_CYCLIC_NOTE: SubtopicNote = {
  subtopicName: "Symmetric and Cyclic Expressions",
  title: "Cyclic Sums and Factors",
  oneLineDefinition:
    "Sums that cycle a → b → c → a have fixed values and fixed factors, and a single numerical test is the fastest way to find them.",
  whyItMatters:
    "Six PYQs, every one of them HARD, and all six are faster by testing numbers than by algebra. Three sums are worth knowing by heart, and one principle: if an expression vanishes when two letters are equal, their difference is a factor.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdsai-cyclic-fraction-sums",
      name: "Three cyclic fraction sums",
      intuition:
        "Fractions with denominators \\((a - b)(a - c)\\), \\((b - c)(b - a)\\), \\((c - a)(c - b)\\) add up to a polynomial of small degree, often just a constant. Put in \\(1, 2, 3\\) and read the answer.",
      definition:
        "For distinct \\(a, b, c\\), summing over the three cyclic terms:\n" +
        "- \\(\\displaystyle\\sum \\dfrac{1}{(a - b)(a - c)} = 0\\)\n" +
        "- \\(\\displaystyle\\sum \\dfrac{a}{(a - b)(a - c)} = 0\\)\n" +
        "- \\(\\displaystyle\\sum \\dfrac{a^2}{(a - b)(a - c)} = 1\\)\n" +
        "- \\(\\displaystyle\\sum \\dfrac{a^3}{(a - b)(a - c)} = a + b + c\\)\n" +
        "Note \\((b - a)(c - a) = (a - b)(a - c)\\), but \\((b - a)(a - c)\\) is the negative. Rewrite every denominator in the standard order before using these.",
      formula: {
        label: "The key cyclic sum",
        latex: "\\dfrac{a^2}{(a - b)(a - c)} + \\dfrac{b^2}{(b - c)(b - a)} + \\dfrac{c^2}{(c - a)(c - b)} = 1",
      },
      authoredExample: {
        prompt: "Check \\(\\displaystyle\\sum \\dfrac{a}{(a - b)(a - c)} = 0\\) at \\(a, b, c = 1, 2, 3\\).",
        steps: [
          "\\(\\dfrac{1}{(-1)(-2)} = \\dfrac12\\), \\(\\dfrac{2}{(-1)(1)} = -2\\), \\(\\dfrac{3}{(2)(1)} = \\dfrac32\\).",
          "\\(\\dfrac12 - 2 + \\dfrac32 = 0\\).",
        ],
        answer: "\\(0\\).",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\displaystyle\\sum \\dfrac{1}{(a - b)(a - c)}\\) at \\(a, b, c = 0, 1, 3\\).",
        steps: ["\\(\\dfrac{1}{(-1)(-3)} + \\dfrac{1}{(-2)(1)} + \\dfrac{1}{(3)(2)} = \\dfrac13 - \\dfrac12 + \\dfrac16\\)."],
        answer: "\\(0\\).",
      },
      practiceSet: [
        { prompt: "\\(\\sum \\dfrac{a^2}{(a - b)(a - c)}\\)?", answer: "\\(1\\)" },
        { prompt: "\\(\\sum \\dfrac{a}{(a - b)(a - c)}\\)?", answer: "\\(0\\)" },
        { prompt: "\\(\\sum \\dfrac{1}{(a - b)(a - c)}\\)?", answer: "\\(0\\)" },
        { prompt: "\\(\\sum \\dfrac{a^3}{(a - b)(a - c)}\\)?", answer: "\\(a + b + c\\)" },
      ],
      pyqExampleId: "ed89bd00-7e55-46b3-ba2b-235ccb339f8e", // 2023 (II) — p + q + r with a², b², c² numerators
      traps: [
        {
          title: "Watch the order of the factors",
          body:
            "Swapping one factor, \\((a - b)\\) for \\((b - a)\\), flips the sign of that term. A sum that 'should' be \\(1\\) can be \\(-1\\) if the question writes the denominators differently — check with numbers.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsai-cyclic-factors",
      name: "Factors of cyclic expressions",
      intuition:
        "If an expression becomes zero when \\(a = b\\), it has \\((a - b)\\) as a factor. A cyclic expression then has \\((b - c)\\) and \\((c - a)\\) too. Compare degrees to see what is left, and test one set of numbers to fix the constant and the sign.",
      definition:
        "- \\(a(b^2 - c^2) + b(c^2 - a^2) + c(a^2 - b^2) = (a - b)(b - c)(c - a)\\).\n" +
        "- If the expression has degree \\(n\\), the remaining factor has degree \\(n - 3\\) and is itself symmetric or cyclic.\n" +
        "- To test whether \\((a + b + c)\\) is a factor, evaluate at a distinct triple with \\(a + b + c = 0\\), such as \\((1, 2, -3)\\): a non-zero value proves it is not.\n" +
        "- The sign of \\((x - y)(y - z)(z - x)\\) is negative when \\(x > y > z\\).",
      formula: {
        label: "The basic cyclic factorisation",
        latex: "a(b^2 - c^2) + b(c^2 - a^2) + c(a^2 - b^2) = (a - b)(b - c)(c - a)",
      },
      authoredExample: {
        prompt: "Check the basic factorisation at \\((a, b, c) = (0, 1, 2)\\).",
        steps: [
          "Left: \\(0 + 1\\times(4 - 0) + 2\\times(0 - 1) = 2\\).",
          "Right: \\((0 - 1)(1 - 2)(2 - 0) = 2\\).",
        ],
        answer: "Both are \\(2\\).",
      },
      selfCheckExample: {
        prompt: "Is \\((a + b + c)\\) a factor of \\(a^2(b - c) + b^2(c - a) + c^2(a - b)\\)?",
        steps: [
          "Test \\((1, 2, -3)\\), whose sum is \\(0\\): \\(1\\times 5 + 4\\times(-4) + 9\\times(-1) = -20\\).",
          "A factor would make it \\(0\\).",
        ],
        answer: "No.",
      },
      practiceSet: [
        { prompt: "Degree-5 cyclic expression with factor \\((a - b)(b - c)(c - a)\\). Degree of the rest?", answer: "\\(2\\)" },
        { prompt: "Sign of \\((x - y)(y - z)(z - x)\\) when \\(x > y > z\\)?", answer: "Negative" },
        { prompt: "\\((a - b)(b - c)(c - a)\\) at \\((1, 2, 3)\\)?", answer: "\\(2\\)" },
        { prompt: "Is \\((a - b)\\) a factor of \\(a^2 - b^2 + c(a - b)\\)?", answer: "Yes" },
      ],
      pyqExampleId: "2907a5e8-a6b7-4a03-b355-558a0c98aff7", // 2022 (II) — sign of x⁴(y − z) + ... by ordering
      traps: [
        {
          title: "One test disproves; it does not prove",
          body:
            "A single triple giving a non-zero value shows a factor is absent. A triple giving zero shows nothing by itself — use the vanishing-when-equal argument to prove a factor is present.",
        },
      ],
    },
  ],
};
