import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_AI_VALUES_NOTE: SubtopicNote = {
  subtopicName: "Finding Values with Identities",
  title: "Finding Values with Identities",
  oneLineDefinition:
    "An identity turns a given sum and product, or a condition such as a + b + c = 0, straight into the value asked for, without finding the letters themselves.",
  whyItMatters:
    "Five questions in the bank, two EASY and three MODERATE, and both 2022 questions in this chapter are here. None needs the values of the letters: each is one identity, or a chain of brackets that cancels, and the work is choosing which.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "spiaiva-sum-product",
      name: "Squares and cubes from the sum and the product",
      intuition:
        "If you know \\(x + y\\) and \\(xy\\), you know \\(x^2 + y^2\\) and \\(x^3 + y^3\\) too, because each can be rewritten using only the sum and the product. There is no need to find x and y.",
      definition:
        "- \\(x^2 + y^2 = (x + y)^2 - 2xy = (x - y)^2 + 2xy\\).\n" +
        "- \\(x^3 + y^3 = (x + y)^3 - 3xy(x + y)\\) and \\(x^3 - y^3 = (x - y)^3 + 3xy(x - y)\\).\n" +
        "- With \\(y = \\frac{1}{x}\\) the product is 1: \\(x^2 + \\frac{1}{x^2} = \\left(x + \\frac{1}{x}\\right)^2 - 2\\).",
      formula: {
        label: "Sum and product identities",
        latex: "x^2 + y^2 = (x + y)^2 - 2xy \\qquad x^3 + y^3 = (x + y)^3 - 3xy(x + y) \\qquad x^3 - y^3 = (x - y)^3 + 3xy(x - y)",
      },
      authoredExample: {
        prompt: "If \\(a + b = 7\\) and \\(ab = 10\\), find \\(a^2 + b^2\\) and \\(a^3 + b^3\\).",
        steps: [
          "\\(a^2 + b^2 = 7^2 - 2 \\times 10 = 49 - 20 = 29\\).",
          "\\(a^3 + b^3 = 7^3 - 3 \\times 10 \\times 7 = 343 - 210 = 133\\).",
          "Check: a and b are 2 and 5, and \\(4 + 25 = 29\\), \\(8 + 125 = 133\\).",
        ],
        answer: "\\(a^2 + b^2 = 29\\), \\(a^3 + b^3 = 133\\)",
      },
      selfCheckExample: {
        prompt: "If \\(x - y = 3\\) and \\(xy = 4\\), find \\(x^2 + y^2\\).",
        steps: ["\\(x^2 + y^2 = (x - y)^2 + 2xy = 9 + 8 = 17\\)."],
        answer: "17",
      },
      practiceSet: [
        { prompt: "If \\(p + q = 10\\) and \\(pq = 21\\), find \\(p^2 + q^2\\).", answer: "\\(100 - 42 = 58\\)" },
        { prompt: "If \\(x + y = 5\\) and \\(xy = 6\\), find \\(x^3 + y^3\\).", answer: "\\(125 - 90 = 35\\)" },
        { prompt: "If \\(x + \\frac{1}{x} = 4\\), find \\(x^2 + \\frac{1}{x^2}\\).", answer: "\\(16 - 2 = 14\\)" },
        { prompt: "If \\(a - b = 2\\) and \\(ab = 15\\), find \\(a^3 - b^3\\).", answer: "\\(8 + 90 = 98\\)" },
      ],
      pyqExampleId: "00e0d8a8-ef8a-4540-b301-bb278d48e77f",
      traps: [
        {
          title: "Squaring the sum and stopping",
          body: "\\((x + y)^2\\) is \\(x^2 + y^2 + 2xy\\), not \\(x^2 + y^2\\). Subtract \\(2xy\\): with \\(x + y = 6\\) and \\(xy = 5\\), \\(x^2 + y^2 = 36 - 10 = 26\\).",
        },
        {
          title: "Leaving out the bracket in the cube identity",
          body: "\\(x^3 + y^3 = (x + y)^3 - 3xy(x + y)\\). The term taken away is \\(3xy\\) times the sum, not just \\(3xy\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spiaiva-three",
      name: "Three-term identities and the condition a + b + c = 0",
      intuition:
        "Squaring \\(a + b + c\\) gives every square once and every pair product twice. And the cube identity has \\(a + b + c\\) as a factor, so when the three add to 0, the sum of the cubes is simply \\(3abc\\).",
      definition:
        "- \\((a + b + c)^2 = a^2 + b^2 + c^2 + 2(ab + bc + ca)\\).\n" +
        "- \\(a^3 + b^3 + c^3 - 3abc = (a + b + c)(a^2 + b^2 + c^2 - ab - bc - ca)\\).\n" +
        "- So if \\(a + b + c = 0\\): \\(a^3 + b^3 + c^3 = 3abc\\) and \\(a^2 + b^2 + c^2 = -2(ab + bc + ca)\\).\n" +
        "- Take each term with its sign. A condition such as \\(x = 2y + 6\\) is \\(x + (-2y) + (-6) = 0\\).",
      formula: {
        label: "Three-term identities",
        latex: "(a + b + c)^2 = a^2 + b^2 + c^2 + 2(ab + bc + ca) \\qquad a + b + c = 0 \\Rightarrow a^3 + b^3 + c^3 = 3abc",
      },
      authoredExample: {
        prompt: "Find the value of \\(15^3 - 8^3 - 7^3\\) without cubing.",
        steps: [
          "Take \\(a = 15\\), \\(b = -8\\), \\(c = -7\\). Then \\(a + b + c = 0\\).",
          "So the value is \\(3abc = 3 \\times 15 \\times (-8) \\times (-7) = 2520\\).",
          "Check: \\(3375 - 512 - 343 = 2520\\).",
        ],
        answer: "2520",
      },
      selfCheckExample: {
        prompt: "If \\(a + b + c = 9\\) and \\(ab + bc + ca = 26\\), find \\(a^2 + b^2 + c^2\\).",
        steps: ["\\(a^2 + b^2 + c^2 = (a + b + c)^2 - 2(ab + bc + ca)\\).", "\\(= 81 - 52 = 29\\)."],
        answer: "29",
      },
      practiceSet: [
        { prompt: "If \\(a + b + c = 0\\), what is \\(a^3 + b^3 + c^3\\) in terms of a, b and c?", answer: "\\(3abc\\)" },
        { prompt: "Find \\((-12)^3 + 7^3 + 5^3\\) without cubing.", answer: "\\(-12 + 7 + 5 = 0\\), so \\(3 \\times (-12) \\times 7 \\times 5 = -1260\\)" },
        { prompt: "If \\(x + y + z = 6\\) and \\(x^2 + y^2 + z^2 = 14\\), find \\(xy + yz + zx\\).", answer: "\\(\\frac{36 - 14}{2} = 11\\)" },
        { prompt: "If \\(a + b + c = 0\\), find \\(\\frac{a^2}{bc} + \\frac{b^2}{ca} + \\frac{c^2}{ab}\\).", answer: "\\(\\frac{a^3 + b^3 + c^3}{abc} = \\frac{3abc}{abc} = 3\\)" },
      ],
      pyqExampleId: "09520ab3-98f5-4d7d-9063-b91c8b36db8b",
      traps: [
        {
          title: "Forgetting the 2 in the square of three terms",
          body: "\\((a + b + c)^2 = a^2 + b^2 + c^2 + 2(ab + bc + ca)\\). Without the 2, \\(a^2 + b^2 + c^2\\) comes out wrong by \\(ab + bc + ca\\).",
        },
        {
          title: "Dropping the signs of the three terms",
          body: "In \\(p^3 - 27q^3 - 1\\) the three numbers being cubed are p, \\(-3q\\) and \\(-1\\), not p, 3q and 1. Their sum and their product must use those signs.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spiaiva-cancel",
      name: "Simplifying a chain of brackets that cancel",
      intuition:
        "A bracket like \\(1 + \\frac{1}{n}\\) is the single fraction \\(\\frac{n + 1}{n}\\). Write a whole chain of such brackets as fractions, and the top of each one cancels the bottom of the next, leaving almost nothing.",
      definition:
        "- \\(1 + \\frac{1}{n} = \\frac{n + 1}{n}\\) and \\(1 - \\frac{1}{n} = \\frac{n - 1}{n}\\).\n" +
        "- In a chain of these, each numerator cancels the next denominator. Only one number from each end survives: \\(\\frac{5}{4} \\times \\frac{6}{5} \\times \\frac{7}{6} = \\frac{7}{4}\\).\n" +
        "- Do the cancelling first and any outside step (multiply by p, subtract 1) last.",
      formula: {
        label: "One bracket as one fraction",
        latex: "1 + \\frac{1}{n} = \\frac{n + 1}{n} \\qquad 1 - \\frac{1}{n} = \\frac{n - 1}{n}",
      },
      authoredExample: {
        prompt: "Simplify \\(\\left(1 - \\frac{1}{2}\\right)\\left(1 - \\frac{1}{3}\\right)\\left(1 - \\frac{1}{4}\\right) \\cdots \\left(1 - \\frac{1}{10}\\right)\\).",
        steps: [
          "Each bracket is a fraction: \\(\\frac{1}{2} \\times \\frac{2}{3} \\times \\frac{3}{4} \\times \\cdots \\times \\frac{9}{10}\\).",
          "Every numerator after the first cancels the denominator before it.",
          "Left: the first numerator over the last denominator, \\(\\frac{1}{10}\\).",
        ],
        answer: "\\(\\frac{1}{10}\\)",
      },
      selfCheckExample: {
        prompt: "Simplify \\(\\left(1 - \\frac{1}{n}\\right)\\left(1 - \\frac{1}{n + 1}\\right)\\).",
        steps: ["\\(\\frac{n - 1}{n} \\times \\frac{n}{n + 1}\\).", "The n cancels: \\(\\frac{n - 1}{n + 1}\\)."],
        answer: "\\(\\frac{n - 1}{n + 1}\\)",
      },
      practiceSet: [
        { prompt: "Simplify \\(\\left(1 + \\frac{1}{2}\\right)\\left(1 + \\frac{1}{3}\\right)\\left(1 + \\frac{1}{4}\\right)\\).", answer: "\\(\\frac{3}{2} \\times \\frac{4}{3} \\times \\frac{5}{4} = \\frac{5}{2}\\)" },
        { prompt: "Simplify \\(\\left(1 - \\frac{1}{3}\\right)\\left(1 - \\frac{1}{4}\\right)\\left(1 - \\frac{1}{5}\\right)\\).", answer: "\\(\\frac{2}{3} \\times \\frac{3}{4} \\times \\frac{4}{5} = \\frac{2}{5}\\)" },
        { prompt: "Simplify \\(\\left(1 + \\frac{1}{5}\\right)\\left(1 + \\frac{1}{6}\\right)\\left(1 + \\frac{1}{7}\\right)\\left(1 + \\frac{1}{8}\\right)\\left(1 + \\frac{1}{9}\\right)\\).", answer: "\\(\\frac{10}{5} = 2\\)" },
      ],
      pyqExampleId: "f9920bc5-f9ef-4b69-b0ba-b83678fa4e33",
      traps: [
        {
          title: "Multiplying the brackets out",
          body: "Expanding \\(\\left(1 + \\frac{1}{3}\\right)\\left(1 + \\frac{1}{4}\\right)\\) term by term is slow and error-prone. As fractions it is \\(\\frac{4}{3} \\times \\frac{5}{4} = \\frac{5}{3}\\) at once.",
        },
      ],
    },
  ],
};
