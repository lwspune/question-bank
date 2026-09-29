import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_QE_MAX_MIN_NOTE: SubtopicNote = {
  subtopicName: "Maximum and Minimum of Quadratic Expressions",
  title: "Maximum and Minimum of a Quadratic",
  oneLineDefinition:
    "Completing the square shows the least value of ax² + bx + c when a > 0, or the greatest when a < 0, and where it occurs.",
  whyItMatters:
    "Five PYQs, all EASY or MODERATE, and all the same move: complete the square. The vertex is at x = −b/2a, so the question 'for which x is it least' needs no square at all.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdsqe-complete-square",
      name: "Completing the square",
      intuition:
        "Write the expression as a constant plus or minus a square. A square is never negative, so the constant is the least value (or the greatest, if the square is subtracted), reached where the square is zero.",
      definition:
        "- \\(ax^2 + bx + c = a\\left(x + \\dfrac{b}{2a}\\right)^2 + \\dfrac{4ac - b^2}{4a}\\).\n" +
        "- If \\(a > 0\\): least value \\(\\dfrac{4ac - b^2}{4a}\\) at \\(x = -\\dfrac{b}{2a}\\).\n" +
        "- If \\(a < 0\\): greatest value \\(\\dfrac{4ac - b^2}{4a}\\) at the same \\(x\\).\n" +
        "- A word problem ('a number plus four times its square') becomes an expression in one variable first.",
      formula: {
        label: "Vertex of a quadratic",
        latex: "x = -\\dfrac{b}{2a}, \\qquad \\text{extreme value} = \\dfrac{4ac - b^2}{4a}",
      },
      authoredExample: {
        prompt: "Find the least value of \\(3x^2 - 6x + 7\\).",
        steps: ["\\(3(x^2 - 2x) + 7 = 3(x - 1)^2 + 4\\).", "The square is zero at \\(x = 1\\)."],
        answer: "\\(4\\).",
      },
      selfCheckExample: {
        prompt: "For which \\(x\\) is \\(6x - x^2\\) greatest, and what is the greatest value?",
        steps: ["\\(6x - x^2 = 9 - (x - 3)^2\\)."],
        answer: "At \\(x = 3\\); the value is \\(9\\).",
      },
      practiceSet: [
        { prompt: "Least value of \\(x^2 - 4x + 7\\)?", answer: "\\(3\\)" },
        { prompt: "Greatest value of \\(-x^2 + 2x + 5\\)?", answer: "\\(6\\)" },
        { prompt: "\\(x\\) at which \\(2x^2 + 8x + 1\\) is least?", answer: "\\(-2\\)" },
        { prompt: "Least value of \\(x^2 + x\\)?", answer: "\\(-\\dfrac14\\)" },
      ],
      pyqExampleId: "b9b266dd-d39d-4463-b816-83a04aa70410", // 2018 (II) — minimum of 2x² + 5x + 5
      traps: [
        {
          title: "Take out a before completing",
          body:
            "In \\(2x^2 + 8x + 1\\), factor \\(2\\) from the \\(x\\) terms first: \\(2(x + 2)^2 - 7\\). Completing \\(x^2 + 8x\\) inside without the \\(2\\) gives the wrong vertex.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsqe-reciprocal-extreme",
      name: "Extremes of a reciprocal",
      intuition:
        "If the denominator is always positive, the fraction \\(\\dfrac{1}{\\text{denominator}}\\) is largest exactly where the denominator is smallest.",
      definition:
        "- For \\(\\dfrac{1}{ax^2 + bx + c}\\) with \\(a > 0\\) and \\(b^2 - 4ac < 0\\): the greatest value is \\(\\dfrac{1}{\\text{least value of the denominator}} = \\dfrac{4a}{4ac - b^2}\\).\n" +
        "- It has no least positive value: as \\(x\\) grows the fraction tends to \\(0\\).\n" +
        "- If the denominator can be zero, the fraction has no greatest value.",
      formula: {
        label: "Greatest value of a reciprocal",
        latex: "\\max \\dfrac{1}{ax^2 + bx + c} = \\dfrac{4a}{4ac - b^2} \\quad (a > 0,\\ b^2 < 4ac)",
      },
      authoredExample: {
        prompt: "Find the greatest value of \\(\\dfrac{1}{x^2 - 2x + 5}\\).",
        steps: ["\\(x^2 - 2x + 5 = (x - 1)^2 + 4 \\ge 4\\)."],
        answer: "\\(\\dfrac14\\).",
      },
      selfCheckExample: {
        prompt: "Find the greatest value of \\(\\dfrac{2}{x^2 + 4x + 6}\\).",
        steps: ["\\(x^2 + 4x + 6 = (x + 2)^2 + 2 \\ge 2\\)."],
        answer: "\\(1\\).",
      },
      practiceSet: [
        { prompt: "Greatest value of \\(\\dfrac{1}{x^2 + 1}\\)?", answer: "\\(1\\)" },
        { prompt: "Greatest value of \\(\\dfrac{1}{x^2 + 6x + 10}\\)?", answer: "\\(1\\)" },
        { prompt: "Does \\(\\dfrac{1}{x^2 - 1}\\) have a greatest value?", answer: "No" },
        { prompt: "Least positive value of \\(\\dfrac{1}{x^2 + 1}\\)?", answer: "None (it tends to \\(0\\))" },
      ],
      pyqExampleId: "e7baae41-8b03-4b73-86a3-39200cc3bf18", // 2019 (I) — maximum of 1/(x² + 5x + 10)
      traps: [
        {
          title: "Invert the value, not the expression",
          body:
            "The least denominator is \\(\\dfrac74\\) for \\(x^2 + 3x + 4\\), so the greatest fraction is \\(\\dfrac47\\). An option \\(\\dfrac74\\) is the denominator's value, not the answer.",
        },
      ],
    },
  ],
};
