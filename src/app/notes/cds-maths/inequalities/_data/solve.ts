import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_IQ_SOLVE_NOTE: SubtopicNote = {
  subtopicName: "Solving Linear and Quadratic Inequalities",
  title: "Solving Inequalities",
  oneLineDefinition:
    "Solve an inequality like an equation, but reverse the sign when multiplying or dividing by a negative; a factored quadratic is positive outside its roots and negative between them.",
  whyItMatters:
    "Five PYQs, none HARD. Linear pairs: solve each and keep the overlap. Quadratics: factorise, mark the roots on a line, and read the sign of the product in each stretch. One item asks which quadrants a region reaches — test a point in each.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdsiq-solve",
      name: "Linear and quadratic inequalities",
      intuition:
        "A product of two factors is positive when they have the same sign. With roots \\(\\alpha < \\beta\\), \\((x - \\alpha)(x - \\beta)\\) is positive to the left of \\(\\alpha\\) and to the right of \\(\\beta\\), and negative in between.",
      definition:
        "- Multiplying or dividing by a negative number reverses the inequality.\n" +
        "- Two conditions at once: solve each, keep the values that satisfy both.\n" +
        "- \\((x - \\alpha)(x - \\beta) > 0\\): \\(x < \\alpha\\) or \\(x > \\beta\\). \\(< 0\\): \\(\\alpha < x < \\beta\\).\n" +
        "- A region in the plane: test one point in each quadrant.",
      formula: {
        label: "Quadratic sign",
        latex: "(x - \\alpha)(x - \\beta) > 0 \\iff x < \\alpha \\text{ or } x > \\beta",
      },
      authoredExample: {
        prompt: "Solve \\(3x - 4 < 2x + 1\\) and \\(4x + 3 > x + 9\\) together.",
        steps: ["First: \\(x < 5\\). Second: \\(3x > 6\\), so \\(x > 2\\)."],
        answer: "\\(2 < x < 5\\).",
      },
      selfCheckExample: {
        prompt: "Solve \\(x^2 - 5x - 14 < 0\\).",
        steps: ["\\((x - 7)(x + 2) < 0\\): between the roots."],
        answer: "\\(-2 < x < 7\\).",
      },
      practiceSet: [
        { prompt: "\\(-2x > 8\\)?", answer: "\\(x < -4\\)" },
        { prompt: "\\(x^2 - 9 > 0\\)?", answer: "\\(x < -3\\) or \\(x > 3\\)" },
        { prompt: "\\((x - 1)(x - 6) < 0\\)?", answer: "\\(1 < x < 6\\)" },
        { prompt: "\\(x + y \\ge 4\\): can \\(x, y\\) both be negative?", answer: "No" },
      ],
      pyqExampleId: "66fb3061-bf61-4178-bbb3-76e5de3c67d3", // 2025 (II) — 5x + 3 < 8x − 9 and 2x + 20 > 5x + 2
      traps: [
        {
          title: "'Or', not 'and', outside the roots",
          body:
            "\\(x^2 - 6x - 27 > 0\\) holds for \\(x > 9\\) OR \\(x < -3\\). Writing '\\(x < 9\\) or \\(x > -3\\)' covers every number and is the distractor.",
        },
      ],
    },
  ],
};
