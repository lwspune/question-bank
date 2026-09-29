import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_QE_NATURE_NOTE: SubtopicNote = {
  subtopicName: "Nature of Roots and Discriminant",
  title: "Nature of Roots and the Discriminant",
  oneLineDefinition:
    "The discriminant b² − 4ac decides whether a quadratic has two real roots, one repeated root, or none.",
  whyItMatters:
    "Fourteen PYQs, most of them EASY or MODERATE. Every one is one inequality or one equation in the discriminant; the work is getting the sign of the inequality right and remembering that 'real' allows equal roots while 'distinct' does not.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdsqe-discriminant",
      name: "Real, equal or no real roots",
      intuition:
        "The quadratic formula has \\(\\sqrt{b^2 - 4ac}\\) in it. If that number is positive there are two roots, if it is zero the two roots coincide, and if it is negative the square root is not real.",
      definition:
        "For \\(ax^2 + bx + c = 0\\) with \\(D = b^2 - 4ac\\):\n" +
        "- \\(D > 0\\): two distinct real roots (rational if \\(D\\) is a perfect square and the coefficients are rational);\n" +
        "- \\(D = 0\\): equal roots, \\(x = -\\dfrac{b}{2a}\\);\n" +
        "- \\(D < 0\\): no real roots.\n" +
        "'Real roots' means \\(D \\ge 0\\); 'real and distinct' means \\(D > 0\\).",
      formula: {
        label: "Discriminant",
        latex: "D = b^2 - 4ac",
      },
      authoredExample: {
        prompt: "Find \\(k\\) if \\(x^2 + (k - 1)x + 4 = 0\\) has equal roots.",
        steps: ["\\((k - 1)^2 - 16 = 0\\), so \\(k - 1 = \\pm 4\\)."],
        answer: "\\(k = 5\\) or \\(k = -3\\).",
      },
      selfCheckExample: {
        prompt: "Which of \\(x^2 + 3x + 3\\), \\(x^2 - 4x + 4\\) and \\(2x^2 + 5x - 1\\) has no real roots?",
        steps: ["The discriminants are \\(-3\\), \\(0\\) and \\(33\\)."],
        answer: "\\(x^2 + 3x + 3\\).",
      },
      practiceSet: [
        { prompt: "Nature of the roots of \\(x^2 - 6x + 9 = 0\\)?", answer: "Equal" },
        { prompt: "\\(2x^2 - 8x + k = 0\\) has equal roots. \\(k\\)?", answer: "\\(8\\)" },
        { prompt: "How many real \\(x\\) with \\(x + \\dfrac1x = 3\\)?", answer: "Two" },
        { prompt: "\\(D\\) for \\(3x^2 + x - 2\\)?", answer: "\\(25\\)" },
      ],
      pyqExampleId: "d14748f9-47d6-4910-a691-796852ffcbd9", // 2021 (I) — 4x² − 2kx + 3k = 0 with equal roots
      traps: [
        {
          title: "k = 0 can be a valid answer",
          body:
            "A value of \\(k\\) that makes the equation \\(4x^2 = 0\\) still gives equal roots (both zero). Do not throw it away unless it kills the \\(x^2\\) term.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsqe-discriminant-ranges",
      name: "Ranges and counts from the discriminant",
      intuition:
        "A condition on the discriminant is an inequality in the unknown parameter. Solve it as an inequality, and for counting questions, list the cases one parameter value at a time.",
      definition:
        "- 'Real roots': solve \\(D \\ge 0\\) for the parameter; the largest or smallest allowed value is the boundary.\n" +
        "- \\(k^2 > 8\\) means \\(k < -2\\sqrt2\\) or \\(k > 2\\sqrt2\\) — two pieces, not one.\n" +
        "- 'No real linear factors' means \\(D < 0\\).\n" +
        "- With a \\(\\log\\) or a trig function in a coefficient, turn the inequality on \\(D\\) into one on that function.\n" +
        "- 'For every \\(\\theta\\) in a range': the condition must hold at the worst \\(\\theta\\).",
      formula: {
        label: "Real roots",
        latex: "b^2 - 4ac \\ge 0",
      },
      authoredExample: {
        prompt: "Find the greatest value of \\(k\\) for which \\(3x^2 + 6x + k = 0\\) has real roots.",
        steps: ["\\(36 - 12k \\ge 0\\), so \\(k \\le 3\\)."],
        answer: "\\(3\\).",
      },
      selfCheckExample: {
        prompt: "How many ordered pairs \\((a, b)\\) with \\(a, b \\in \\{1, 2, 3\\}\\) give \\(x^2 + ax + b = 0\\) real roots?",
        steps: [
          "Need \\(a^2 \\ge 4b\\). \\(a = 1\\): none. \\(a = 2\\): \\(b = 1\\). \\(a = 3\\): \\(b = 1, 2\\).",
        ],
        answer: "\\(3\\).",
      },
      practiceSet: [
        { prompt: "\\(x^2 - kx + 4 = 0\\) has real distinct roots. \\(k\\)?", answer: "\\(k < -4\\) or \\(k > 4\\)" },
        { prompt: "\\(x^2 + 2x - \\log_{10} N = 0\\) has real roots. Least \\(N\\)?", answer: "\\(\\dfrac{1}{10}\\)" },
        { prompt: "\\(x^2 + kx + 9\\) has no real linear factors. \\(k\\)?", answer: "\\(-6 < k < 6\\)" },
        { prompt: "\\(x^2 - 2x + k = 0\\) has real roots. Greatest \\(k\\)?", answer: "\\(1\\)" },
      ],
      pyqExampleId: "8e66cb2b-fa0a-4df2-957f-eb83d2554be6", // 2024 (I) — greatest k for real roots of 2x² − 4x + k = 0
      traps: [
        {
          title: "For every θ means the worst θ",
          body:
            "If \\(p \\le \\dfrac14\\cos^2\\theta\\) must hold for every \\(\\theta\\) in a range, \\(p\\) is limited by the SMALLEST value of \\(\\cos^2\\theta\\) there, not the largest.",
        },
      ],
    },
  ],
};
