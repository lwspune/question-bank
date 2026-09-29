import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_QE_REDUCIBLE_NOTE: SubtopicNote = {
  subtopicName: "Equations Reducible to Quadratics",
  title: "Equations Reducible to Quadratics",
  oneLineDefinition:
    "Equations in x², in x − 1/x, with square roots or with fractions become quadratics after a substitution or after clearing — and every root must then be checked in the original.",
  whyItMatters:
    "Six PYQs, three of them HARD. The substitution is always one of a few — u = x², t = x ± 1/x — and the check at the end is not optional: squaring can add a root that the original equation does not have.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdsqe-substitution",
      name: "Substitute to get a quadratic",
      intuition:
        "An equation that uses only \\(x^2\\) and \\(x^4\\) is a quadratic in \\(u = x^2\\). One whose terms pair as \\(x^2 + \\dfrac{1}{x^2}\\) and \\(x \\pm \\dfrac1x\\) is a quadratic in \\(t = x \\pm \\dfrac1x\\).",
      definition:
        "- Biquadratic: \\(ax^4 + bx^2 + c = 0\\) with \\(u = x^2\\); keep only \\(u \\ge 0\\).\n" +
        "- Reciprocal pairs: group as \\(A\\left(x^2 + \\dfrac{1}{x^2}\\right) + B\\left(x - \\dfrac1x\\right) + C = 0\\) and put \\(t = x - \\dfrac1x\\), so \\(x^2 + \\dfrac{1}{x^2} = t^2 + 2\\).\n" +
        "- With \\(t = x + \\dfrac1x\\), use \\(x^2 + \\dfrac{1}{x^2} = t^2 - 2\\).\n" +
        "- If \\(u^2 = u + 1\\), higher powers reduce: \\(u^2 = u + 1\\), \\(u^3 = 2u + 1\\).",
      formula: {
        label: "Reciprocal substitution",
        latex: "t = x - \\tfrac1x \\;\\Rightarrow\\; x^2 + \\tfrac{1}{x^2} = t^2 + 2",
      },
      authoredExample: {
        prompt: "Solve \\(x^4 - 5x^2 + 4 = 0\\).",
        steps: ["With \\(u = x^2\\): \\(u^2 - 5u + 4 = 0\\), so \\(u = 1\\) or \\(4\\).", "\\(x^2 = 1\\) or \\(x^2 = 4\\)."],
        answer: "\\(x = \\pm 1, \\pm 2\\).",
      },
      selfCheckExample: {
        prompt: "Find the possible values of \\(x + \\dfrac1x\\) if \\(x^2 + \\dfrac{1}{x^2} - 5\\left(x + \\dfrac1x\\right) + 8 = 0\\).",
        steps: ["With \\(t = x + \\dfrac1x\\): \\(t^2 - 2 - 5t + 8 = 0\\), so \\(t^2 - 5t + 6 = 0\\).", "Both roots satisfy \\(|t| \\ge 2\\), so both give real \\(x\\)."],
        answer: "\\(2\\) or \\(3\\).",
      },
      practiceSet: [
        { prompt: "Solve \\(x^4 - 13x^2 + 36 = 0\\).", answer: "\\(\\pm 2, \\pm 3\\)" },
        { prompt: "\\(t = x - \\dfrac1x = 2\\). \\(x^2 + \\dfrac{1}{x^2}\\)?", answer: "\\(6\\)" },
        { prompt: "Real solutions of \\(x^4 + x^2 - 2 = 0\\)?", answer: "\\(\\pm 1\\)" },
        { prompt: "\\(u^2 = u + 1\\). Write \\(u^3\\) linearly.", answer: "\\(2u + 1\\)" },
      ],
      pyqExampleId: "e1a505f6-62f7-41cb-abfa-3e3c9341420c", // 2025 (II) — x⁴ = x² + 1
      traps: [
        {
          title: "Some roots of the new quadratic give no real x",
          body:
            "\\(u = x^2\\) must be non-negative, and \\(t = x + \\dfrac1x\\) must satisfy \\(|t| \\ge 2\\). A root of the \\(u\\) or \\(t\\) equation outside that range is dropped.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsqe-clear-and-check",
      name: "Clear roots and fractions, then check",
      intuition:
        "Squaring both sides removes a square root but also accepts solutions of the equation with the opposite sign. Clearing fractions is safe, but a root that makes a denominator zero must be thrown out. So check every candidate in the original.",
      definition:
        "- \\(\\sqrt{f(x)} = g(x)\\): square to get \\(f(x) = g(x)^2\\), then keep only roots with \\(g(x) \\ge 0\\).\n" +
        "- For fractions, multiply by the common denominator, solve, and reject roots that make a denominator zero.\n" +
        "- \\(x = 0\\) may satisfy a rearranged form trivially; the question usually wants the non-zero roots.",
      formula: {
        label: "Squaring a root equation",
        latex: "\\sqrt{f(x)} = g(x) \\iff f(x) = g(x)^2 \\text{ and } g(x) \\ge 0",
      },
      authoredExample: {
        prompt: "Solve \\(\\sqrt{x + 7} = x - 5\\).",
        steps: [
          "Square: \\(x + 7 = x^2 - 10x + 25\\), so \\(x^2 - 11x + 18 = 0\\), \\(x = 2\\) or \\(9\\).",
          "\\(x = 2\\): the right side is \\(-3\\), but \\(\\sqrt9 = 3\\). Reject.",
          "\\(x = 9\\): \\(\\sqrt{16} = 4 = 9 - 5\\). Keep.",
        ],
        answer: "\\(x = 9\\).",
      },
      selfCheckExample: {
        prompt: "How many real roots has \\(\\sqrt{2x + 3} = x\\)?",
        steps: ["Square: \\(x^2 - 2x - 3 = 0\\), so \\(x = 3\\) or \\(-1\\).", "\\(x = -1\\) makes the right side negative."],
        answer: "One (\\(x = 3\\)).",
      },
      practiceSet: [
        { prompt: "Solve \\(\\sqrt{x} = x - 2\\).", answer: "\\(x = 4\\)" },
        { prompt: "Solve \\(\\sqrt{x + 2} = x\\).", answer: "\\(x = 2\\)" },
        { prompt: "Solve \\(x + \\dfrac{6}{x} = 5\\).", answer: "\\(x = 2\\) or \\(3\\)" },
        { prompt: "Solve \\(\\dfrac{x^2}{x - 1} = \\dfrac{1}{x - 1}\\).", answer: "\\(x = -1\\) (\\(x = 1\\) is excluded)" },
      ],
      pyqExampleId: "69d24a36-e5d4-4a70-a918-a319b4228349", // 2023 (II) — √(x + 9) = x − 3
      traps: [
        {
          title: "Squaring adds roots",
          body:
            "Both \\(\\sqrt{f} = g\\) and \\(\\sqrt{f} = -g\\) square to the same equation. Every root of the squared equation must be tried in the original; count only those that pass.",
        },
      ],
    },
  ],
};
