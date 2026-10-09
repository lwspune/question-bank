import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_MAT_EQI_QUADRATICS_NOTE: SubtopicNote = {
  subtopicName: "Quadratic Equations",
  title: "Quadratic Equations, the Discriminant and the Roots",
  oneLineDefinition:
    "A quadratic equation is solved by factorising or by the formula; the discriminant says how many real roots it has, and their sum and product can be read off the coefficients.",
  whyItMatters:
    "The 2018 and 2019 papers asked for the sum of the solutions of an equation that becomes a quadratic once its fractions are cleared. The discriminant also decides the quadratic inequalities asked in 2023 and 2026.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "imat-eqi-quadratic-solve",
      name: "Solving quadratic equations and the discriminant",
      intuition:
        "If a product is zero, one of its factors must be zero, so a factorised quadratic gives its roots at once. When it will not factorise, the formula always works. The part under the square root, the discriminant, decides everything: positive gives two roots, zero gives one, negative gives none.",
      definition:
        "For \\(ax^2 + bx + c = 0\\) with \\(a \\ne 0\\):\n" +
        "- Try **factorising** first. Incomplete forms are quick: \\(ax^2 + bx = 0\\) gives \\(x(ax + b) = 0\\); \\(ax^2 + c = 0\\) gives \\(x^2 = -\\frac{c}{a}\\).\n" +
        "- Otherwise use the **formula** below.\n" +
        "- **Discriminant** \\(\\Delta = b^2 - 4ac\\): \\(\\Delta > 0\\) two distinct real roots; \\(\\Delta = 0\\) one repeated root \\(x = -\\frac{b}{2a}\\); \\(\\Delta < 0\\) no real roots.",
      formula: {
        label: "Quadratic formula",
        latex: "x = \\frac{-b \\pm \\sqrt{\\Delta}}{2a}, \\qquad \\Delta = b^2 - 4ac",
        symbols: [
          { symbol: "\\(a, b, c\\)", meaning: "the coefficients of \\(x^2\\), \\(x\\) and the constant" },
          { symbol: "\\(\\Delta\\)", meaning: "the discriminant" },
        ],
      },
      authoredExample: {
        prompt: "Solve (a) \\(2x^2 - 7x + 3 = 0\\), (b) \\(x^2 - 4x - 1 = 0\\), (c) \\(3x^2 = 12x\\).",
        steps: [
          "(a) \\((2x - 1)(x - 3) = 0\\), so \\(x = \\frac{1}{2}\\) or \\(x = 3\\).",
          "(b) No integer factors. \\(\\Delta = 16 + 4 = 20\\), so \\(x = \\frac{4 \\pm \\sqrt{20}}{2} = 2 \\pm \\sqrt{5}\\).",
          "(c) Bring everything to one side: \\(3x^2 - 12x = 0\\), so \\(3x(x - 4) = 0\\) and \\(x = 0\\) or \\(x = 4\\).",
        ],
        answer: "(a) \\(\\frac{1}{2}, 3\\); (b) \\(2 \\pm \\sqrt{5}\\); (c) \\(0, 4\\)",
      },
      selfCheckExample: {
        prompt: "For which values of \\(k\\) does the equation \\(x^2 + kx + 9 = 0\\) have exactly one (repeated) real solution?",
        options: ["\\(k = 6\\) only", "\\(k = \\pm 3\\)", "\\(k = 9\\) only", "\\(k = \\pm 18\\)", "\\(k = \\pm 6\\)"],
        steps: [
          "One repeated root means \\(\\Delta = 0\\): \\(k^2 - 4 \\times 1 \\times 9 = 0\\).",
          "\\(k^2 = 36\\), so \\(k = 6\\) or \\(k = -6\\). Both give a perfect square: \\((x + 3)^2\\) and \\((x - 3)^2\\).",
          "Option A forgets the negative root of \\(k^2 = 36\\); B takes the square root of 9 instead of solving \\(\\Delta = 0\\).",
        ],
        answer: "(E) \\(k = \\pm 6\\)",
      },
      practiceSet: [
        { prompt: "Solve \\(x^2 - 5x + 6 = 0\\).", answer: "\\(x = 2\\) or \\(x = 3\\)" },
        { prompt: "Solve \\(4x^2 - 9 = 0\\).", answer: "\\(x = \\pm \\frac{3}{2}\\)" },
        { prompt: "How many real roots has \\(x^2 + x + 1 = 0\\)?", answer: "None", method: "\\(\\Delta = 1 - 4 = -3\\)" },
        { prompt: "Solve \\(x^2 + 6x + 4 = 0\\).", answer: "\\(x = -3 \\pm \\sqrt{5}\\)", method: "\\(\\Delta = 20\\)" },
      ],
      traps: [
        {
          title: "Never divide both sides by x",
          body: "Dividing \\(3x^2 = 12x\\) by \\(x\\) gives only \\(x = 4\\) and loses \\(x = 0\\). Bring everything to one side and factorise out \\(x\\) instead.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-eqi-vieta",
      name: "Sum and product of the roots",
      intuition:
        "If the roots are \\(x_1\\) and \\(x_2\\), the equation is \\(a(x - x_1)(x - x_2) = 0\\). Expanding and matching coefficients shows that the sum and the product of the roots are fixed by \\(a\\), \\(b\\) and \\(c\\), so you can find them without solving.",
      definition:
        "For \\(ax^2 + bx + c = 0\\) with real roots \\(x_1, x_2\\) (\\(\\Delta \\ge 0\\)):\n" +
        "- Sum \\(x_1 + x_2 = -\\frac{b}{a}\\), product \\(x_1 x_2 = \\frac{c}{a}\\).\n" +
        "- A negative product means the roots have **opposite signs**.\n" +
        "- Useful combinations: \\(x_1^2 + x_2^2 = (x_1 + x_2)^2 - 2x_1 x_2\\) and \\(\\frac{1}{x_1} + \\frac{1}{x_2} = \\frac{x_1 + x_2}{x_1 x_2}\\).\n" +
        "- The quadratic with roots \\(s\\) and \\(t\\): \\(x^2 - (s + t)x + st = 0\\).",
      formula: {
        label: "Sum and product of the roots",
        latex: "x_1 + x_2 = -\\frac{b}{a} \\qquad x_1 x_2 = \\frac{c}{a}",
      },
      authoredExample: {
        prompt: "The roots of \\(2x^2 - 6x - 5 = 0\\) are \\(x_1\\) and \\(x_2\\). Find \\(x_1 + x_2\\), \\(x_1 x_2\\), \\(x_1^2 + x_2^2\\) and \\(\\frac{1}{x_1} + \\frac{1}{x_2}\\).",
        steps: [
          "Check the roots are real: \\(\\Delta = 36 + 40 = 76 > 0\\).",
          "Sum \\(= -\\frac{-6}{2} = 3\\); product \\(= \\frac{-5}{2}\\).",
          "\\(x_1^2 + x_2^2 = 3^2 - 2 \\times \\left(-\\frac{5}{2}\\right) = 9 + 5 = 14\\).",
          "\\(\\frac{1}{x_1} + \\frac{1}{x_2} = \\frac{3}{-5/2} = -\\frac{6}{5}\\).",
        ],
        answer: "Sum 3, product \\(-\\frac{5}{2}\\), sum of squares 14, sum of reciprocals \\(-\\frac{6}{5}\\)",
      },
      selfCheckExample: {
        prompt: "The equation \\(3x^2 + 12x - 7 = 0\\) has roots \\(p\\) and \\(q\\). What is the value of \\(p + q + pq\\)?",
        options: [
          "\\(-\\frac{19}{3}\\)",
          "\\(\\frac{5}{3}\\)",
          "\\(-\\frac{5}{3}\\)",
          "\\(\\frac{19}{3}\\)",
          "\\(-4\\)",
        ],
        steps: [
          "\\(\\Delta = 144 + 84 > 0\\), so the roots are real.",
          "\\(p + q = -\\frac{12}{3} = -4\\) and \\(pq = -\\frac{7}{3}\\). Total: \\(-4 - \\frac{7}{3} = -\\frac{19}{3}\\).",
          "Option B uses \\(+\\frac{b}{a}\\) for the sum; C takes the product as \\(+\\frac{7}{3}\\); E stops after the sum.",
        ],
        answer: "(A) \\(-\\frac{19}{3}\\)",
      },
      practiceSet: [
        { prompt: "Find the sum and product of the roots of \\(x^2 - 7x + 10 = 0\\).", answer: "Sum 7, product 10" },
        { prompt: "Write a quadratic equation with roots 3 and \\(-5\\).", answer: "\\(x^2 + 2x - 15 = 0\\)", method: "Sum \\(-2\\), product \\(-15\\)" },
        { prompt: "Do the roots of \\(x^2 - 3x - 4 = 0\\) have the same sign?", answer: "No", method: "The product \\(-4\\) is negative" },
        { prompt: "For \\(x^2 - 4x + 1 = 0\\), find the sum of the squares of the roots.", answer: "14", method: "\\(4^2 - 2 \\times 1\\)" },
      ],
      traps: [
        {
          title: "The sum of the roots is minus b over a",
          body: "Expanding \\(a(x - x_1)(x - x_2)\\) gives \\(-a(x_1 + x_2)\\) as the \\(x\\) coefficient, so the sum is \\(-\\frac{b}{a}\\), not \\(\\frac{b}{a}\\). And check \\(\\Delta \\ge 0\\) first: \\(x^2 + 2x + 5 = 0\\) has no real roots, so it has no real roots to add.",
        },
      ],
    },
  ],
};
