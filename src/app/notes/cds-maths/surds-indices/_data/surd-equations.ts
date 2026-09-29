import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_SI_SURD_EQUATIONS_NOTE: SubtopicNote = {
  subtopicName: "Equations with Surds",
  title: "Equations with Surds",
  oneLineDefinition:
    "A ratio of the form (√A + √B)/(√A − √B) is untangled by componendo and dividendo; other surd equations clear by factorising or isolating one root and squaring.",
  whyItMatters:
    "Seven PYQs, four of them HARD. Almost all have the same shape — a sum of two roots over their difference, equal to something — and componendo and dividendo turns that into √A/√B in one line.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdssi-componendo",
      name: "Componendo and dividendo",
      intuition:
        "If \\(\\dfrac pq = \\dfrac rs\\), then \\(\\dfrac{p + q}{p - q} = \\dfrac{r + s}{r - s}\\). Applied to \\(\\dfrac{\\sqrt A + \\sqrt B}{\\sqrt A - \\sqrt B} = k\\), the sum and difference of top and bottom are \\(2\\sqrt A\\) and \\(2\\sqrt B\\), so the roots separate.",
      definition:
        "- \\(\\dfrac{\\sqrt A + \\sqrt B}{\\sqrt A - \\sqrt B} = k\\) gives \\(\\dfrac{\\sqrt A}{\\sqrt B} = \\dfrac{k + 1}{k - 1}\\), so \\(\\dfrac AB = \\left(\\dfrac{k + 1}{k - 1}\\right)^2\\).\n" +
        "- Alternatively multiply top and bottom by the numerator: the denominator becomes \\(A - B\\).\n" +
        "- After squaring, reject roots that make the original expression undefined, and the trivial \\(x = 0\\) when the question asks for a non-zero value.",
      formula: {
        label: "Componendo and dividendo",
        latex: "\\dfrac{\\sqrt A + \\sqrt B}{\\sqrt A - \\sqrt B} = k \\;\\Rightarrow\\; \\dfrac{\\sqrt A}{\\sqrt B} = \\dfrac{k + 1}{k - 1}",
      },
      authoredExample: {
        prompt: "Solve \\(\\dfrac{\\sqrt{x + 5} + \\sqrt{x - 3}}{\\sqrt{x + 5} - \\sqrt{x - 3}} = 3\\).",
        steps: [
          "\\(\\dfrac{\\sqrt{x + 5}}{\\sqrt{x - 3}} = \\dfrac{4}{2} = 2\\), so \\(x + 5 = 4(x - 3)\\).",
          "\\(3x = 17\\).",
        ],
        answer: "\\(x = \\dfrac{17}{3}\\).",
      },
      selfCheckExample: {
        prompt: "If \\(\\dfrac{\\sqrt{a + x} + \\sqrt{a - x}}{\\sqrt{a + x} - \\sqrt{a - x}} = 2\\), find \\(x\\) in terms of \\(a\\).",
        steps: [
          "\\(\\dfrac{\\sqrt{a + x}}{\\sqrt{a - x}} = 3\\), so \\(a + x = 9(a - x)\\).",
          "\\(10x = 8a\\).",
        ],
        answer: "\\(x = \\dfrac{4a}{5}\\).",
      },
      practiceSet: [
        { prompt: "\\(\\dfrac{p + q}{p - q} = 5\\). \\(\\dfrac pq\\)?", answer: "\\(\\dfrac32\\)" },
        { prompt: "\\(\\dfrac{\\sqrt A}{\\sqrt B} = 2\\). \\(\\dfrac AB\\)?", answer: "\\(4\\)" },
        { prompt: "\\(\\dfrac{\\sqrt{x + 3} + \\sqrt{x}}{\\sqrt{x + 3} - \\sqrt{x}} = 3\\). \\(x\\)?", answer: "\\(1\\)" },
        { prompt: "\\(\\dfrac{a + b}{a - b} = \\dfrac{7}{3}\\). \\(a : b\\)?", answer: "\\(5 : 2\\)" },
      ],
      pyqExampleId: "0f09e98b-2021-4c0d-a6a2-ce1bfc5a8543", // 2022 (II) — ratio 7/3, find √((x + 20)(x − 1))
      traps: [
        {
          title: "k + 1 over k − 1, not the other way",
          body:
            "From \\(\\dfrac{S + D}{S - D} = k\\) the ratio \\(\\dfrac SD\\) is \\(\\dfrac{k + 1}{k - 1}\\). Swapping it gives the reciprocal, which is usually an option.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdssi-factor-surds",
      name: "Factorising with square roots",
      intuition:
        "Treat \\(\\sqrt x\\) and \\(\\sqrt y\\) as the letters: \\(x - y\\) is a difference of squares and \\(x\\sqrt y + y\\sqrt x\\) has the common factor \\(\\sqrt{xy}\\). Cancelling leaves a linear relation between \\(\\sqrt x\\) and \\(\\sqrt y\\).",
      definition:
        "- \\(x - y = (\\sqrt x - \\sqrt y)(\\sqrt x + \\sqrt y)\\) for \\(x, y \\ge 0\\).\n" +
        "- \\(x\\sqrt y + y\\sqrt x = \\sqrt{xy}(\\sqrt x + \\sqrt y)\\).\n" +
        "- \\((x + \\sqrt{1 + x^2})(-x + \\sqrt{1 + x^2}) = 1\\), and \\(t + \\sqrt{1 + t^2}\\) always increases with \\(t\\).",
      formula: {
        label: "Difference of squares in roots",
        latex: "x - y = (\\sqrt x - \\sqrt y)(\\sqrt x + \\sqrt y)",
      },
      authoredExample: {
        prompt: "Simplify \\(\\dfrac{x - y}{\\sqrt x + \\sqrt y}\\) and find its value at \\(x = 49\\), \\(y = 16\\).",
        steps: ["It is \\(\\sqrt x - \\sqrt y\\).", "\\(7 - 4 = 3\\)."],
        answer: "\\(3\\).",
      },
      selfCheckExample: {
        prompt: "If \\(\\dfrac{x - y}{\\sqrt x - \\sqrt y} = 4\\sqrt y\\) with \\(x \\ne y\\), find \\(\\dfrac xy\\).",
        steps: ["The left side is \\(\\sqrt x + \\sqrt y\\), so \\(\\sqrt x = 3\\sqrt y\\)."],
        answer: "\\(9\\).",
      },
      practiceSet: [
        { prompt: "\\(\\dfrac{x - 9}{\\sqrt x - 3}\\)?", answer: "\\(\\sqrt x + 3\\)" },
        { prompt: "\\(x\\sqrt y + y\\sqrt x\\) factorised?", answer: "\\(\\sqrt{xy}(\\sqrt x + \\sqrt y)\\)" },
        { prompt: "\\((3 + \\sqrt{10})(-3 + \\sqrt{10})\\)?", answer: "\\(1\\)" },
        { prompt: "\\(\\sqrt x = 5\\sqrt y\\). \\(\\dfrac xy\\)?", answer: "\\(25\\)" },
      ],
      pyqExampleId: "d51a38a6-559f-4f0a-9aa6-14d5be5e0f1d", // 2022 (I) — (x − y)/(x√y + y√x) = 1/√x
      traps: [
        {
          title: "Square the ratio at the end",
          body:
            "\\(\\sqrt x = 2\\sqrt y\\) gives \\(\\dfrac xy = 4\\), not \\(2\\). The ratio of the roots is the square root of the ratio asked for.",
        },
      ],
    },
  ],
};
