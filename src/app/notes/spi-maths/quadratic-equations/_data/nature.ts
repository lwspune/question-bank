import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_QE_NATURE_NOTE: SubtopicNote = {
  subtopicName: "The Discriminant and Nature of Roots",
  title: "The Discriminant and Nature of Roots",
  oneLineDefinition:
    "The discriminant b² − 4ac tells you, without solving, whether the roots are real and different, real and equal, or not real at all.",
  whyItMatters:
    "Eighteen questions in the bank, half the chapter: eleven EASY, six MODERATE and one HARD. None asks you to find the roots. They ask what kind of roots an equation has, or which values of k give real, distinct or equal roots, and every one is answered by b² − 4ac alone.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "spiqena-discriminant",
      name: "Nature of the roots from the discriminant",
      intuition:
        "In the quadratic formula the roots are \\(\\frac{-b \\pm \\sqrt{D}}{2a}\\), where \\(D = b^2 - 4ac\\). If D is positive the plus and minus give two different real numbers. If D is 0 they give the same number twice. If D is negative there is no real square root, so there are no real roots.",
      definition:
        "- **D > 0:** two real and distinct (unequal) roots.\n" +
        "- **D = 0:** two real and equal roots, each \\(-\\frac{b}{2a}\\).\n" +
        "- **D < 0:** no real roots.\n" +
        "- With whole-number (rational) coefficients and D > 0: if D is a **perfect square** the roots are rational; if not, they are irrational.\n" +
        "- When several options are true, choose the most exact one: 'real and distinct' says more than 'real'.",
      formula: {
        label: "Discriminant",
        latex: "D = b^2 - 4ac",
      },
      authoredExample: {
        prompt: "Find the nature of the roots of \\(2x^2 + 5x + 4 = 0\\).",
        steps: [
          "\\(a = 2\\), \\(b = 5\\), \\(c = 4\\).",
          "\\(D = 25 - 4 \\times 2 \\times 4 = 25 - 32 = -7\\).",
          "\\(D < 0\\).",
        ],
        answer: "No real roots",
      },
      selfCheckExample: {
        prompt: "Find the nature of the roots of \\(3x^2 - 7x + 2 = 0\\).",
        steps: [
          "\\(D = 49 - 24 = 25\\), which is positive and a perfect square.",
          "So the roots are real, distinct and rational (they are 2 and \\(\\frac{1}{3}\\)).",
        ],
        answer: "Real, distinct and rational",
      },
      practiceSet: [
        { prompt: "What is the nature of the roots of \\(x^2 - 10x + 25 = 0\\)?", answer: "\\(D = 100 - 100 = 0\\): real and equal" },
        { prompt: "What is the nature of the roots of \\(x^2 + 2x + 5 = 0\\)?", answer: "\\(D = 4 - 20 = -16\\): no real roots" },
        { prompt: "What is the nature of the roots of \\(x^2 - 5x + 3 = 0\\)?", answer: "\\(D = 25 - 12 = 13\\): real, distinct and irrational" },
        { prompt: "What is the discriminant of \\(2x^2 - 3x - 2 = 0\\)?", answer: "\\(9 + 16 = 25\\)" },
      ],
      pyqExampleId: "07c8ce4c-e76e-48b8-a1c5-d1237143bd9d",
      traps: [
        {
          title: "Dropping the sign of c",
          body: "When c is negative, \\(-4ac\\) is positive. For \\(3x^2 + x - 2 = 0\\), \\(D = 1 + 24 = 25\\), not \\(1 - 24\\).",
        },
        {
          title: "Calling equal roots rational",
          body: "D = 0 means the roots are equal, not that they are rational. \\(x^2 - 2\\sqrt{2}x + 2 = 0\\) has D = 0 and both roots equal to \\(\\sqrt{2}\\), which is irrational.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spiqena-range",
      name: "Values of k that give real, distinct or no real roots",
      intuition:
        "When a coefficient is an unknown k, the discriminant becomes an expression in k. Asking for real roots, distinct roots or no real roots turns into an inequality in k, which you solve like any other.",
      definition:
        "- **Real roots:** \\(D \\ge 0\\) (equal roots are real, so 0 is allowed).\n" +
        "- **Real and distinct roots:** \\(D > 0\\).\n" +
        "- **No real roots:** \\(D < 0\\).\n" +
        "- A square inequality has two sides: \\(k^2 < 9\\) means \\(-3 < k < 3\\), and \\(k^2 > 9\\) means \\(k < -3\\) or \\(k > 3\\).\n" +
        "- If the unknown is the coefficient of \\(x^2\\), it must also be non-zero for the equation to stay quadratic.",
      formula: {
        label: "Conditions on the discriminant",
        latex: "b^2 - 4ac \\ge 0 \\text{ (real roots)} \\qquad b^2 - 4ac > 0 \\text{ (distinct roots)} \\qquad b^2 - 4ac < 0 \\text{ (no real roots)}",
      },
      authoredExample: {
        prompt: "For what values of k does \\(x^2 + 6x + k = 0\\) have real roots?",
        steps: [
          "Real roots need \\(D \\ge 0\\): \\(36 - 4k \\ge 0\\).",
          "\\(36 \\ge 4k\\), so \\(k \\le 9\\).",
        ],
        answer: "\\(k \\le 9\\)",
      },
      selfCheckExample: {
        prompt: "For what values of p does \\(x^2 - px + 9 = 0\\) have no real roots?",
        steps: ["No real roots need \\(D < 0\\): \\(p^2 - 36 < 0\\).", "\\(p^2 < 36\\), so \\(-6 < p < 6\\)."],
        answer: "\\(-6 < p < 6\\)",
      },
      practiceSet: [
        { prompt: "For what values of k does \\(x^2 - 8x + k = 0\\) have two distinct real roots?", answer: "\\(64 - 4k > 0\\), so \\(k < 16\\)" },
        { prompt: "For what values of m does \\(mx^2 + 4x + 1 = 0\\) have real roots?", answer: "\\(16 - 4m \\ge 0\\), so \\(m \\le 4\\), with \\(m \\ne 0\\) for it to be quadratic" },
        { prompt: "Does \\(x^2 + bx - 1 = 0\\) have real roots for every value of b?", answer: "Yes: \\(D = b^2 + 4\\), which is always positive" },
      ],
      pyqExampleId: "2507ec71-1736-4ab4-af5a-c9e8ea126032",
      traps: [
        {
          title: "Keeping only one side of a square inequality",
          body: "\\(b^2 < 25\\) does not mean just \\(b < 5\\): \\(b = -7\\) gives 49. The answer is \\(-5 < b < 5\\).",
        },
        {
          title: "Using > when the question says real",
          body: "Real roots include equal roots, so the condition is \\(D \\ge 0\\). Only 'distinct' or 'unequal' roots need \\(D > 0\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spiqena-equal",
      name: "Equal roots: setting the discriminant to zero",
      intuition:
        "Equal roots happen exactly when the discriminant is 0. So set \\(b^2 - 4ac = 0\\), solve for the unknown, and expect two answers whenever k appears squared.",
      definition:
        "- The roots are equal when \\(b^2 = 4ac\\), and only then.\n" +
        "- Expand any brackets first so that a, b and c are read correctly.\n" +
        "- If \\(k^2 = 9\\), then \\(k = 3\\) or \\(k = -3\\). Keep both unless the question rules one out.\n" +
        "- The equal root is \\(x = -\\frac{b}{2a}\\). Use it when the question also asks for a positive or negative root.",
      formula: {
        label: "Equal roots",
        latex: "b^2 - 4ac = 0 \\qquad x = -\\frac{b}{2a}",
      },
      authoredExample: {
        prompt: "Find k if \\(x^2 - 2kx + 9 = 0\\) has equal roots, and find the root.",
        steps: [
          "\\(D = (-2k)^2 - 4 \\times 1 \\times 9 = 4k^2 - 36\\).",
          "\\(4k^2 - 36 = 0\\), so \\(k^2 = 9\\) and \\(k = 3\\) or \\(k = -3\\).",
          "The root is \\(-\\frac{b}{2a} = \\frac{2k}{2} = k\\): 3 when \\(k = 3\\), and \\(-3\\) when \\(k = -3\\).",
        ],
        answer: "\\(k = \\pm 3\\); the equal root is k itself",
      },
      selfCheckExample: {
        prompt: "Find p if \\(px^2 - 12x + 4 = 0\\) has equal roots.",
        steps: ["\\(144 - 16p = 0\\), so \\(p = 9\\).", "Check: \\(9x^2 - 12x + 4 = (3x - 2)^2\\)."],
        answer: "\\(p = 9\\)",
      },
      practiceSet: [
        { prompt: "Find k if \\(4x^2 + kx + 1 = 0\\) has equal roots.", answer: "\\(k^2 = 16\\), so \\(k = \\pm 4\\)" },
        { prompt: "Find c if \\(x^2 + 10x + c = 0\\) has equal roots.", answer: "\\(100 = 4c\\), so \\(c = 25\\)" },
        { prompt: "Find the equal roots of \\(x^2 - 6x + 9 = 0\\).", answer: "\\(x = 3\\) and \\(x = 3\\)" },
        { prompt: "Find k if \\(kx^2 - 4x + 2 = 0\\) has equal roots.", answer: "\\(16 - 8k = 0\\), so \\(k = 2\\)" },
      ],
      pyqExampleId: "126282e5-c329-465c-b3a7-ded49e8e027b",
      traps: [
        {
          title: "Taking only the positive square root",
          body: "\\(k^2 = 25\\) gives \\(k = 5\\) or \\(k = -5\\). An option with only one sign is incomplete when both values work.",
        },
        {
          title: "Reading b before expanding",
          body: "In \\(x^2 + k(2x - 3) = 0\\) the coefficient of x is \\(2k\\) and the constant is \\(-3k\\). Expand first, then read a, b and c.",
        },
        {
          title: "Ignoring 'positive' in 'equal and positive roots'",
          body: "D = 0 often gives two values of the unknown. Find the equal root \\(-\\frac{b}{2a}\\) for each and keep only the value that makes it positive.",
        },
      ],
    },
  ],
};
