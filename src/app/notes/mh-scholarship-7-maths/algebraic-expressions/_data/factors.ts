import type { SubtopicNote } from "@/app/notes/_types";

export const MS7_AL_FACTORS_NOTE: SubtopicNote = {
  subtopicName: "Factorisation",
  title: "Factorisation",
  oneLineDefinition:
    "A difference of two squares splits into (sum)(difference), and a three-term expression whose middle term is twice the product splits into a square.",
  whyItMatters:
    "3 of the chapter's 6 questions, all EASY. Two use the difference of two squares (one with a fraction), and one factorises a perfect square with a minus sign.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ms7alfa-difference",
      name: "Difference of two squares",
      intuition:
        "When one square is taken from another, the expression splits into two brackets: the sum of the square roots times their difference. Work it backwards too: (sum)(difference) multiplies out to a difference of squares.",
      definition:
        "- \\(a^2 - b^2 = (a + b)(a - b)\\).\n" +
        "- First write each term as a square: \\(4a^2 = (2a)^2\\), \\(\\frac{1}{9}b^2 = (\\frac{1}{3}b)^2\\), \\(49 = 7^2\\).\n" +
        "- It works only with a **minus** between the squares. \\(a^2 + b^2\\) does not split this way.\n" +
        "- Handy for sums: \\(52^2 - 48^2 = (52 + 48)(52 - 48)\\).",
      formula: {
        label: "Difference of two squares",
        latex: "a^2 - b^2 = (a+b)(a-b)",
      },
      authoredExample: {
        prompt: "Factorise \\(25m^2 - 4n^2\\).",
        steps: [
          "\\(25m^2 = (5m)^2\\) and \\(4n^2 = (2n)^2\\).",
          "Use \\(a^2 - b^2 = (a + b)(a - b)\\) with \\(a = 5m\\), \\(b = 2n\\).",
        ],
        answer: "\\((5m + 2n)(5m - 2n)\\)",
      },
      selfCheckExample: {
        prompt: "Factorise \\(x^2 - 81\\).",
        steps: ["\\(81 = 9^2\\), so \\(x^2 - 9^2\\)."],
        answer: "\\((x + 9)(x - 9)\\)",
      },
      practiceSet: [
        { prompt: "Multiply out \\((y + 5)(y - 5)\\).", answer: "\\(y^2 - 25\\)" },
        { prompt: "Factorise \\(16p^2 - 1\\).", answer: "\\((4p + 1)(4p - 1)\\)" },
        { prompt: "Find \\(52^2 - 48^2\\) using the difference of two squares.", answer: "\\((52 + 48)(52 - 48) = 100 \\times 4 = 400\\)" },
        { prompt: "Factorise \\(49 - x^2\\).", answer: "\\((7 + x)(7 - x)\\)" },
      ],
      pyqExampleId: "95b6aad4-4f6c-433b-b621-614aea255d68",
      traps: [
        {
          title: "Using the coefficient, not its square root",
          body: "In \\(4a^2\\) the square root is \\(2a\\), not \\(4a\\). Take the square root of the number as well as the letter.",
        },
        {
          title: "Writing the same bracket twice",
          body: "A difference of squares gives one plus bracket and one minus bracket. Two minus brackets give a perfect square instead.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ms7alfa-perfect",
      name: "Perfect-square factorising",
      intuition:
        "If the first and last terms are squares and the middle term is twice their square roots multiplied, the whole expression is a perfect square: the square of a sum or of a difference.",
      definition:
        "- \\(a^2 + 2ab + b^2 = (a + b)^2\\) and \\(a^2 - 2ab + b^2 = (a - b)^2\\).\n" +
        "- **Check**: are the first and last terms squares? Is the middle term exactly twice their roots multiplied?\n" +
        "- The **sign of the middle term** is the sign inside the bracket.\n" +
        "- \\((a - b)^2\\) can also be written \\((a - b)(a - b)\\).",
      authoredExample: {
        prompt: "Factorise \\(a^2 + 6a + 9\\).",
        steps: [
          "\\(a^2\\) is the square of a, and 9 is the square of 3.",
          "Twice their product: \\(2 \\times a \\times 3 = 6a\\), the middle term with a plus sign.",
        ],
        answer: "\\((a + 3)^2\\)",
      },
      selfCheckExample: {
        prompt: "Factorise \\(9x^2 - 12xy + 4y^2\\).",
        steps: ["\\(9x^2 = (3x)^2\\), \\(4y^2 = (2y)^2\\), and \\(2 \\times 3x \\times 2y = 12xy\\) with a minus sign."],
        answer: "\\((3x - 2y)^2\\)",
      },
      practiceSet: [
        { prompt: "Factorise \\(m^2 - 10m + 25\\).", answer: "\\((m - 5)(m - 5)\\)" },
        { prompt: "Is \\(x^2 + 4x + 16\\) a perfect square?", answer: "No. For \\((x + 4)^2\\) the middle term would be \\(8x\\)." },
        { prompt: "Factorise \\(4a^2 + 4ab + b^2\\).", answer: "\\((2a + b)^2\\)" },
        { prompt: "Factorise \\(p^2 - 2p + 1\\).", answer: "\\((p - 1)^2\\)" },
      ],
      pyqExampleId: "e99f0cba-6415-489d-9ea7-1333daf6a1ca",
      traps: [
        {
          title: "Mixing up a perfect square and a difference of squares",
          body: "\\((x + 2y)(x - 2y)\\) gives \\(x^2 - 4y^2\\), with no middle term. A three-term expression with a middle term is a perfect square.",
        },
      ],
    },
  ],
};
