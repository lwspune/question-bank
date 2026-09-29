import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_QE_COMMON_NOTE: SubtopicNote = {
  subtopicName: "Common Roots",
  title: "Common Roots",
  oneLineDefinition:
    "Two quadratics share a root when one value of x satisfies both; subtracting the equations removes the x² term and finds it.",
  whyItMatters:
    "Six PYQs, all short. Either one of the two equations factorises and its roots can be tried in the other, or neither does and subtracting the equations gives the common root directly.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdsqe-subtract-equations",
      name: "Subtract to find the common root",
      intuition:
        "At the common root both equations hold, so their difference also holds. Both have \\(x^2\\) with coefficient \\(1\\), so the difference is linear and gives the root at once.",
      definition:
        "- If \\(x^2 + px + q = 0\\) and \\(x^2 + qx + p = 0\\) share a root and \\(p \\ne q\\): subtracting gives \\((p - q)(x - 1) = 0\\), so the root is \\(1\\) and \\(1 + p + q = 0\\).\n" +
        "- A common factor \\((x - r)\\) means a common root \\(r\\): substitute \\(r\\) into both.\n" +
        "- If the common root is given, substitute it into each equation separately.",
      formula: {
        label: "Common root by subtraction",
        latex: "(x^2 + px + q) - (x^2 + qx + p) = (p - q)(x - 1)",
      },
      authoredExample: {
        prompt: "\\(x^2 - 3x + k = 0\\) and \\(x^2 - 5x + 2k = 0\\) have a common root, \\(k \\ne 0\\). Find \\(k\\).",
        steps: [
          "Subtract: \\(2x - k = 0\\), so the root is \\(x = \\dfrac k2\\).",
          "Substitute in the first: \\(\\dfrac{k^2}{4} - \\dfrac{3k}{2} + k = 0\\), so \\(k^2 - 2k = 0\\).",
          "\\(k \\ne 0\\) gives \\(k = 2\\) (common root \\(1\\)).",
        ],
        answer: "\\(k = 2\\).",
      },
      selfCheckExample: {
        prompt: "\\((x - 1)\\) is a common factor of \\(x^2 + ax + b\\) and \\(x^2 + bx + a\\). Find \\(a + b\\).",
        steps: ["Put \\(x = 1\\): \\(1 + a + b = 0\\)."],
        answer: "\\(-1\\).",
      },
      practiceSet: [
        { prompt: "Common root of \\(x^2 + 2x - 3 = 0\\) and \\(x^2 - 1 = 0\\)?", answer: "\\(1\\)" },
        { prompt: "Common root \\(3\\) of \\(x^2 + px - 3 = 0\\). \\(p\\)?", answer: "\\(-2\\)" },
        { prompt: "\\(x^2 + ax + 2 = 0\\) and \\(x^2 + 2x + a = 0\\) share a root, \\(a \\ne 2\\). \\(a\\)?", answer: "\\(-3\\)" },
        { prompt: "Subtracting two monic quadratics leaves which degree?", answer: "At most \\(1\\)" },
      ],
      pyqExampleId: "6c4dd94a-d906-4af7-bd43-55ee00252698", // 2025 (I) — x² + px + q and x² + qx + p, p ≠ q
      traps: [
        {
          title: "Discard the value the stem rules out",
          body:
            "The subtraction often gives two candidates, one of which makes a parameter zero or makes the two equations identical. If the stem says \\(k \\ne 0\\) or \\(p \\ne q\\), that candidate is gone.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsqe-factor-and-try",
      name: "Factor one and try its roots",
      intuition:
        "If one of the two equations factorises, the common root must be one of its two roots. Try each in the other equation; each choice gives one value of the unknown.",
      definition:
        "- Factorise the equation with numbers only.\n" +
        "- Substitute each of its roots into the other equation and solve for the unknown.\n" +
        "- Both roots may work, giving two answers; the options often list them as a pair.\n" +
        "- In data sufficiency, a common root needs BOTH equations, so neither alone can decide it.",
      formula: {
        label: "Common root from a factorised equation",
        latex: "(x - r_1)(x - r_2) = 0 \\;\\Rightarrow\\; \\text{common root is } r_1 \\text{ or } r_2",
      },
      authoredExample: {
        prompt: "\\(x^2 - 3x + 2 = 0\\) and \\(x^2 + kx + 4 = 0\\) have a common root. Find \\(k\\).",
        steps: [
          "The first has roots \\(1\\) and \\(2\\).",
          "\\(x = 1\\): \\(1 + k + 4 = 0\\), \\(k = -5\\). \\(x = 2\\): \\(4 + 2k + 4 = 0\\), \\(k = -4\\).",
        ],
        answer: "\\(k = -5\\) or \\(-4\\).",
      },
      selfCheckExample: {
        prompt: "Do \\(x^2 - 8x + 15 = 0\\) and \\(x^2 - 12x + 35 = 0\\) have a common root?",
        steps: ["The roots are \\(3, 5\\) and \\(5, 7\\)."],
        answer: "Yes, \\(5\\).",
      },
      practiceSet: [
        { prompt: "Roots of \\(x^2 + 7x + 12 = 0\\)?", answer: "\\(-3\\) and \\(-4\\)" },
        { prompt: "\\(x^2 - 4 = 0\\) and \\(x^2 + kx - 6 = 0\\) share the root \\(2\\). \\(k\\)?", answer: "\\(1\\)" },
        { prompt: "Common root of \\(x^2 - 5x + 6\\) and \\(x^2 - 7x + 12\\)?", answer: "\\(3\\)" },
        { prompt: "Can one equation alone decide a common root?", answer: "No" },
      ],
      pyqExampleId: "c2359ef0-9847-4b06-b493-19a8633c5db0", // 2019 (I) — x² + 5x + 6 and x² + kx + 1
      traps: [
        {
          title: "Two answers, not one",
          body:
            "Each root of the factorised equation can be the shared one, so there are usually two values of the unknown. An option giving only one of them is incomplete.",
        },
      ],
    },
  ],
};
