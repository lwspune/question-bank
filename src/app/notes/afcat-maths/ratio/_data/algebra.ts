import type { SubtopicNote } from "@/app/notes/_types";

export const AF_RP_ALGEBRA_NOTE: SubtopicNote = {
  subtopicName: "Algebraic Ratio Expressions",
  title: "Ratios in Algebra: Substitution and Componendo-Dividendo",
  oneLineDefinition:
    "Work out an expression from a given ratio, find x : y from an equation, and use componendo-dividendo and the k method on equal ratios.",
  whyItMatters:
    "AFCAT's 2019 paper asked the first kind: given x : y, evaluate an expression in x and y. The quick way is to put the ratio's numbers straight in, which works whenever every term has the same degree. The rest of the page is the reverse problem and the two standard properties of equal ratios.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "afrp-substitute-ratio",
      name: "Evaluating an expression from a ratio",
      intuition:
        "If every term of an expression has the same degree, the \\(k\\) in \\(x = pk\\), \\(y = qk\\) cancels. So put the ratio's numbers in directly: for \\(x : y = 3 : 4\\), use \\(x = 3\\) and \\(y = 4\\).",
      definition:
        "- If \\(x : y = p : q\\), write \\(x = pk\\) and \\(y = qk\\). In an expression where every term has the same power (all first powers, or all squares), \\(k\\) cancels.\n" +
        "- So substitute \\(x = p\\), \\(y = q\\) and work out the numbers.\n" +
        "- Keep the sign: with \\(x : y = 3 : 4\\), \\((x + y) : (x - y)\\) is \\(7 : -1\\).\n" +
        "- Three letters work the same way: \\(a : b : c = 1 : 2 : 3\\) gives \\((a + b) : c = 3 : 3 = 1 : 1\\).",
      formula: {
        label: "Substituting the ratio",
        latex: "x : y = p : q \\;\\Rightarrow\\; \\dfrac{ax + by}{cx + dy} = \\dfrac{ap + bq}{cp + dq}",
      },
      authoredExample: {
        prompt: "If \\(x : y = 2 : 5\\), find \\((3x + 4y) : (5x - y)\\).",
        steps: [
          "Put \\(x = 2\\) and \\(y = 5\\): \\(3x + 4y = 6 + 20 = 26\\).",
          "\\(5x - y = 10 - 5 = 5\\).",
        ],
        answer: "\\(26 : 5\\).",
      },
      selfCheckExample: {
        prompt: "If \\(a : b = 4 : 3\\), find \\(\\dfrac{a^2 - b^2}{a^2 + b^2}\\).",
        steps: ["Put \\(a = 4\\) and \\(b = 3\\): \\(\\dfrac{16 - 9}{16 + 9}\\)."],
        answer: "\\(\\dfrac{7}{25}\\).",
      },
      practiceSet: [
        { prompt: "If \\(x : y = 1 : 2\\), find \\((x + y) : (y - x)\\).", answer: "\\(3 : 1\\)" },
        { prompt: "If \\(m : n = 3 : 1\\), find \\((2m + n) : (m + 2n)\\).", answer: "\\(7 : 5\\)" },
        { prompt: "If \\(a : b : c = 1 : 2 : 3\\), find \\((a + b + c) : b\\).", answer: "\\(3 : 1\\)" },
        { prompt: "If \\(p : q = 5 : 2\\), find \\((p - q) : (p + q)\\).", answer: "\\(3 : 7\\)" },
      ],
      pyqExampleId: "dd113b0f-4e02-4c81-bba4-753132d8ebdf",
      traps: [
        {
          title: "Keep the minus sign",
          body: "With \\(x : y = 3 : 7\\), \\((x + y) : (x - y) = 10 : -4 = -5 : 2\\). Dropping the sign gives \\(5 : 2\\), which is often one of the options.",
        },
        {
          title: "Only when every term has the same degree",
          body: "\\(x : y = 2 : 3\\) does not fix \\((x + 1) : y\\), because the 1 carries no \\(k\\). Put \\(x = 2k\\), \\(y = 3k\\) and the \\(k\\) stays.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afrp-ratio-from-equation",
      name: "Finding x : y from an equation",
      intuition:
        "When an equation links \\(x\\) and \\(y\\), collect the \\(x\\) terms on one side and the \\(y\\) terms on the other. What is left is \\(\\dfrac xy\\) as a number.",
      definition:
        "- From a ratio of two expressions, cross-multiply first, then collect \\(x\\) and \\(y\\).\n" +
        "- Percentages and decimals: '40% of \\(x\\) equals 25% of \\(y\\)' means \\(0.4x = 0.25y\\), so \\(x : y = 0.25 : 0.4 = 5 : 8\\).\n" +
        "- 'The ratio \\(x : y\\) is 9 times \\(y : x\\)' means \\(\\dfrac{x^2}{y^2} = 9\\), so \\(x : y = 3 : 1\\) for positive numbers.",
      formula: {
        label: "Collecting x and y",
        latex: "ax + by = cx + dy \\;\\Rightarrow\\; \\dfrac xy = \\dfrac{d - b}{a - c}",
      },
      authoredExample: {
        prompt: "If \\((2x + 3y) : (x + 5y) = 5 : 7\\), find \\(x : y\\).",
        steps: [
          "Cross-multiply: \\(7(2x + 3y) = 5(x + 5y)\\), so \\(14x + 21y = 5x + 25y\\).",
          "Collect: \\(9x = 4y\\).",
        ],
        answer: "\\(4 : 9\\).",
      },
      selfCheckExample: {
        prompt: "30% of one number equals 0.45 of another. Find the ratio of the first number to the second.",
        steps: ["\\(0.3a = 0.45b\\), so \\(\\dfrac ab = \\dfrac{0.45}{0.3} = \\dfrac 32\\)."],
        answer: "\\(3 : 2\\).",
      },
      practiceSet: [
        { prompt: "If \\((x + 2y) : (x - y) = 4 : 1\\), find \\(x : y\\).", answer: "\\(2 : 1\\)" },
        { prompt: "If 60% of A equals 40% of B, find \\(A : B\\).", answer: "\\(2 : 3\\)" },
        { prompt: "If \\(x : y\\) is 16 times \\(y : x\\) and both are positive, find \\(x : y\\).", answer: "\\(4 : 1\\)" },
        { prompt: "If \\(5(x - y) = 3(x + y)\\), find \\(x : y\\).", answer: "\\(4 : 1\\)" },
      ],
      pyqExampleId: "39214cc8-5778-4106-8851-3ef4fa0225d8",
      traps: [
        {
          title: "Collect before you read off the ratio",
          body: "From \\(9x = 4y\\), \\(x : y = 4 : 9\\). Reading \\(9 : 4\\) off the coefficients turns the ratio round.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afrp-componendo-dividendo",
      name: "Componendo and dividendo",
      intuition:
        "If \\(\\dfrac ab = \\dfrac cd\\), adding and subtracting the terms on each side gives \\(\\dfrac{a + b}{a - b} = \\dfrac{c + d}{c - d}\\). It turns a sum over a difference into a plain ratio in one step.",
      definition:
        "- **Componendo:** \\(\\dfrac ab = \\dfrac cd \\Rightarrow \\dfrac{a + b}{b} = \\dfrac{c + d}{d}\\).\n" +
        "- **Dividendo:** \\(\\dfrac ab = \\dfrac cd \\Rightarrow \\dfrac{a - b}{b} = \\dfrac{c - d}{d}\\).\n" +
        "- **Both together:** \\(\\dfrac{a + b}{a - b} = \\dfrac{c + d}{c - d}\\). It works in reverse: from \\(\\dfrac{x + y}{x - y} = \\dfrac pq\\), \\(\\dfrac xy = \\dfrac{p + q}{p - q}\\).\n" +
        "- Look for it whenever a fraction is a sum over a difference, including roots: \\(\\dfrac{\\sqrt a + \\sqrt b}{\\sqrt a - \\sqrt b}\\).\n" +
        "- \\(x^3 + 3x\\) and \\(3x^2 + 1\\) are the two halves of \\((x + 1)^3 = x^3 + 3x^2 + 3x + 1\\), so componendo-dividendo turns their ratio into \\(\\left(\\dfrac{x + 1}{x - 1}\\right)^3\\).",
      formula: {
        label: "Componendo and dividendo",
        latex: "\\dfrac ab = \\dfrac cd \\;\\Rightarrow\\; \\dfrac{a + b}{a - b} = \\dfrac{c + d}{c - d}",
      },
      authoredExample: {
        prompt: "If \\(\\dfrac{x + y}{x - y} = \\dfrac 73\\), find \\(x : y\\).",
        steps: [
          "Componendo and dividendo: \\(\\dfrac{(x + y) + (x - y)}{(x + y) - (x - y)} = \\dfrac{7 + 3}{7 - 3}\\).",
          "So \\(\\dfrac{2x}{2y} = \\dfrac{10}{4}\\).",
        ],
        answer: "\\(5 : 2\\).",
      },
      selfCheckExample: {
        prompt: "If \\(\\dfrac{\\sqrt a + \\sqrt b}{\\sqrt a - \\sqrt b} = 3\\), find \\(a : b\\).",
        steps: [
          "Componendo and dividendo: \\(\\dfrac{2\\sqrt a}{2\\sqrt b} = \\dfrac{3 + 1}{3 - 1} = 2\\).",
          "So \\(\\sqrt a : \\sqrt b = 2 : 1\\), and squaring, \\(a : b = 4 : 1\\).",
        ],
        answer: "\\(4 : 1\\).",
      },
      practiceSet: [
        { prompt: "If \\(\\dfrac{x + y}{x - y} = 3\\), find \\(x : y\\).", answer: "\\(2 : 1\\)" },
        { prompt: "If \\(\\dfrac{a + b}{a - b} = \\dfrac 95\\), find \\(a : b\\).", answer: "\\(7 : 2\\)" },
        { prompt: "If \\(\\dfrac ab = \\dfrac 32\\), find \\(\\dfrac{a + b}{a - b}\\).", answer: "\\(5\\)" },
        { prompt: "If \\(\\dfrac{p + 2q}{p - 2q} = 3\\), find \\(p : q\\).", answer: "\\(4 : 1\\)" },
      ],
      pyqExampleId: "70e56a70-e6e0-4c97-ae84-79648884db10",
      traps: [
        {
          title: "Do the same on both sides",
          body: "From \\(\\dfrac{x + y}{x - y} = \\dfrac 73\\), add and subtract on the left and on the right: \\(\\dfrac{2x}{2y} = \\dfrac{10}{4}\\). Doing it on one side only changes the equation.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afrp-equal-ratios",
      name: "Equal ratios: sums and the k method",
      intuition:
        "When several ratios are equal, \\(\\dfrac ab = \\dfrac cd = \\dfrac ef = k\\), every numerator is \\(k\\) times its denominator. So a sum of numerators over the matching sum of denominators is still \\(k\\).",
      definition:
        "- If \\(\\dfrac ab = \\dfrac cd = \\dfrac ef = k\\), then \\(a = bk\\), \\(c = dk\\) and \\(e = fk\\).\n" +
        "- So \\(\\dfrac{a + c + e}{b + d + f} = k\\). With the same multipliers on top and bottom, \\(\\dfrac{2a + 3c}{2b + 3d} = k\\) too.\n" +
        "- Squares give \\(k^2\\): \\(\\dfrac{a^2 + c^2}{b^2 + d^2} = k^2\\).",
      formula: {
        label: "Sum of equal ratios",
        latex: "\\dfrac ab = \\dfrac cd = \\dfrac ef = k \\;\\Rightarrow\\; \\dfrac{a + c + e}{b + d + f} = k",
      },
      authoredExample: {
        prompt: "If \\(\\dfrac ab = \\dfrac cd = \\dfrac 35\\), find \\(\\dfrac{2a + 7c}{2b + 7d}\\) and \\(\\dfrac{a^2 + c^2}{b^2 + d^2}\\).",
        steps: [
          "\\(a = \\tfrac 35 b\\) and \\(c = \\tfrac 35 d\\), so \\(2a + 7c = \\tfrac 35(2b + 7d)\\): the first is \\(\\tfrac 35\\).",
          "\\(a^2 = \\tfrac{9}{25}b^2\\) and \\(c^2 = \\tfrac{9}{25}d^2\\): the second is \\(\\tfrac{9}{25}\\).",
        ],
        answer: "\\(\\tfrac 35\\) and \\(\\tfrac{9}{25}\\).",
      },
      selfCheckExample: {
        prompt: "If \\(\\dfrac xa = \\dfrac yb = \\dfrac zc = 2\\), find \\(\\dfrac{x + y + z}{a + b + c}\\) and \\(\\dfrac{x^2 + y^2}{a^2 + b^2}\\).",
        steps: ["The sum keeps the common value: \\(2\\).", "Squares give its square: \\(4\\)."],
        answer: "\\(2\\) and \\(4\\).",
      },
      practiceSet: [
        { prompt: "If \\(\\dfrac ab = \\dfrac cd = 4\\), find \\(\\dfrac{a + c}{b + d}\\).", answer: "\\(4\\)" },
        { prompt: "If \\(\\dfrac pq = \\dfrac rs = \\dfrac 13\\), find \\(\\dfrac{p^2 + r^2}{q^2 + s^2}\\).", answer: "\\(\\dfrac 19\\)" },
        { prompt: "If \\(\\dfrac ab = \\dfrac cd = \\dfrac 25\\), find \\(\\dfrac{3a + c}{3b + d}\\).", answer: "\\(\\dfrac 25\\)" },
      ],
      pyqExampleId: "4e1c43df-2a27-4b27-989d-a83c976c182d",
      traps: [
        {
          title: "The multipliers must match",
          body: "\\(\\dfrac{2a + c}{b + 2d}\\) is not \\(k\\) in general, because \\(a\\) and \\(b\\) carry different multipliers. The rule needs the same multiplier on each top-and-bottom pair.",
        },
      ],
    },
  ],
};
