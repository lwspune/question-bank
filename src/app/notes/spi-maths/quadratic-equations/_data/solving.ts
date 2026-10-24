import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_QE_SOLVING_NOTE: SubtopicNote = {
  subtopicName: "Solving by Factorisation and the Formula",
  title: "Solving by Factorisation and the Formula",
  oneLineDefinition:
    "A root is a value of x that makes the equation true; you find the roots by splitting the middle term or by the quadratic formula.",
  whyItMatters:
    "Four questions in the bank, three EASY and one MODERATE: check which equation has a given root, factorise, or use the formula. Every option is a pair of numbers, so a sign slip in one factor lands you on a printed wrong pair.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "spiqeso-root",
      name: "A root of a quadratic equation makes it true",
      intuition:
        "A root is a value of x that balances the equation. Put it in place of x: if the left side comes to 0, it is a root; if not, it is not.",
      definition:
        "- A **root** (or solution) of \\(ax^2 + bx + c = 0\\) is a number that makes \\(ax^2 + bx + c\\) equal to 0.\n" +
        "- A quadratic equation has **at most two** roots.\n" +
        "- If a root is given and a coefficient is unknown, put the root in and solve for the coefficient.",
      formula: {
        label: "Condition for a root",
        latex: "a\\alpha^2 + b\\alpha + c = 0",
        symbols: [{ symbol: "α", meaning: "a root of ax² + bx + c = 0" }],
      },
      authoredExample: {
        prompt: "Is \\(x = -2\\) a root of \\(x^2 + 7x + 10 = 0\\)?",
        steps: [
          "Put \\(x = -2\\): \\((-2)^2 + 7(-2) + 10\\).",
          "\\(= 4 - 14 + 10 = 0\\).",
        ],
        answer: "Yes, \\(x = -2\\) is a root.",
      },
      selfCheckExample: {
        prompt: "Is \\(x = 4\\) a root of \\(2x^2 - 7x - 4 = 0\\)?",
        steps: ["\\(2(16) - 7(4) - 4 = 32 - 28 - 4 = 0\\)."],
        answer: "Yes",
      },
      practiceSet: [
        { prompt: "Is \\(x = 1\\) a root of \\(x^2 + x - 2 = 0\\)?", answer: "Yes: \\(1 + 1 - 2 = 0\\)" },
        { prompt: "Is \\(x = 2\\) a root of \\(x^2 - x + 3 = 0\\)?", answer: "No: \\(4 - 2 + 3 = 5\\), not 0" },
        { prompt: "If \\(x = 2\\) is a root of \\(x^2 + kx - 10 = 0\\), find k.", answer: "\\(4 + 2k - 10 = 0\\), so \\(k = 3\\)" },
        { prompt: "If \\(x = -1\\) is a root of \\(2x^2 + px + 5 = 0\\), find p.", answer: "\\(2 - p + 5 = 0\\), so \\(p = 7\\)" },
      ],
      pyqExampleId: "5ed61c26-f407-4a26-9d8a-f22e09e5d213",
      traps: [
        {
          title: "Squaring a negative number wrongly",
          body: "\\((-2)^2 = 4\\), not \\(-4\\). Put a negative root in brackets before squaring it.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spiqeso-factor",
      name: "Solving a quadratic equation by splitting the middle term",
      intuition:
        "If a product of two brackets is 0, one of the brackets must be 0. So turn the quadratic into two brackets and set each one to 0. To find the brackets, split the middle term into two parts that let you group.",
      definition:
        "- First make one side 0.\n" +
        "- For \\(ax^2 + bx + c\\), find two numbers whose **product is ac** and whose **sum is b**.\n" +
        "- Split bx into those two parts, group in pairs, and take out the common bracket.\n" +
        "- Set each factor to 0: \\((x + 3) = 0\\) gives \\(x = -3\\).",
      formula: {
        label: "Zero product rule",
        latex: "(x - p)(x - q) = 0 \\Rightarrow x = p \\text{ or } x = q",
      },
      authoredExample: {
        prompt: "Solve \\(3x^2 - 10x + 8 = 0\\).",
        steps: [
          "\\(ac = 24\\). Two numbers with product 24 and sum \\(-10\\): \\(-4\\) and \\(-6\\).",
          "\\(3x^2 - 6x - 4x + 8 = 3x(x - 2) - 4(x - 2) = (3x - 4)(x - 2)\\).",
          "\\(3x - 4 = 0\\) gives \\(x = \\frac{4}{3}\\); \\(x - 2 = 0\\) gives \\(x = 2\\).",
        ],
        answer: "\\(x = 2\\) or \\(x = \\frac{4}{3}\\)",
      },
      selfCheckExample: {
        prompt: "Solve \\(x^2 - x - 20 = 0\\).",
        steps: ["Product \\(-20\\), sum \\(-1\\): \\(-5\\) and \\(4\\).", "\\((x - 5)(x + 4) = 0\\), so \\(x = 5\\) or \\(x = -4\\)."],
        answer: "\\(5\\) and \\(-4\\)",
      },
      practiceSet: [
        { prompt: "Solve \\(x^2 - 9x + 14 = 0\\).", answer: "\\((x - 2)(x - 7) = 0\\), so 2 and 7" },
        { prompt: "Solve \\(x^2 + 2x - 15 = 0\\).", answer: "\\((x + 5)(x - 3) = 0\\), so \\(-5\\) and 3" },
        { prompt: "Solve \\(2x^2 + 5x - 3 = 0\\).", answer: "\\((2x - 1)(x + 3) = 0\\), so \\(\\frac{1}{2}\\) and \\(-3\\)" },
        { prompt: "Solve \\(x^2 = 7x\\).", answer: "\\(x(x - 7) = 0\\), so 0 and 7" },
      ],
      pyqExampleId: "1adcb5c7-4bff-42c5-a461-904e9cb76945",
      traps: [
        {
          title: "Dividing both sides by x",
          body: "Dividing \\(x^2 = 7x\\) by x leaves only \\(x = 7\\) and loses the root 0. Move everything to one side and factorise: \\(x(x - 7) = 0\\).",
        },
        {
          title: "Taking the root with the bracket's sign",
          body: "The factor \\((x + 3)\\) gives the root \\(-3\\), and \\((x - 3)\\) gives \\(+3\\). The root has the opposite sign to the number in the bracket.",
        },
        {
          title: "Factorising before one side is 0",
          body: "In \\(x^2 + 3x = 10\\), move the 10 first: \\(x^2 + 3x - 10 = 0\\), which is \\((x + 5)(x - 2) = 0\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spiqeso-formula",
      name: "The quadratic formula",
      intuition:
        "When no two whole numbers split the middle term, the formula still works. It gives both roots at once from a, b and c, and the part under the square root decides what kind of roots they are.",
      definition:
        "- Read a, b and c from the standard form, signs included.\n" +
        "- Work out \\(b^2 - 4ac\\) first, then its square root. Simplify the root: \\(\\sqrt{20} = 2\\sqrt{5}\\).\n" +
        "- Divide **every** term on top by 2a.",
      formula: {
        label: "Quadratic formula",
        latex: "x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}",
      },
      authoredExample: {
        prompt: "Solve \\(x^2 - 4x - 1 = 0\\).",
        steps: [
          "\\(a = 1\\), \\(b = -4\\), \\(c = -1\\).",
          "\\(b^2 - 4ac = 16 + 4 = 20\\), and \\(\\sqrt{20} = 2\\sqrt{5}\\).",
          "\\(x = \\frac{4 \\pm 2\\sqrt{5}}{2} = 2 \\pm \\sqrt{5}\\).",
        ],
        answer: "\\(x = 2 \\pm \\sqrt{5}\\)",
      },
      selfCheckExample: {
        prompt: "Solve \\(2x^2 + 3x - 1 = 0\\).",
        steps: ["\\(b^2 - 4ac = 9 + 8 = 17\\).", "\\(x = \\frac{-3 \\pm \\sqrt{17}}{4}\\)."],
        answer: "\\(\\frac{-3 \\pm \\sqrt{17}}{4}\\)",
      },
      practiceSet: [
        { prompt: "Using the quadratic formula, solve \\(x^2 - 6x + 7 = 0\\).", answer: "\\(b^2 - 4ac = 8\\), so \\(x = \\frac{6 \\pm 2\\sqrt{2}}{2} = 3 \\pm \\sqrt{2}\\)" },
        { prompt: "In \\(3x^2 - x - 5 = 0\\), what is the value of \\(b^2 - 4ac\\)?", answer: "\\(1 + 60 = 61\\)" },
        { prompt: "Using the quadratic formula, solve \\(x^2 + 6x + 4 = 0\\).", answer: "\\(b^2 - 4ac = 20\\), so \\(x = -3 \\pm \\sqrt{5}\\)" },
      ],
      pyqExampleId: "3ec2a2c7-6483-439c-8ba1-367e360cb5fe",
      traps: [
        {
          title: "Losing the sign of b",
          body: "The formula starts with \\(-b\\). When \\(b = -4\\), \\(-b = +4\\). Write b with its sign before you start.",
        },
        {
          title: "Dividing only part of the top by 2a",
          body: "\\(\\frac{4 \\pm 2\\sqrt{5}}{2} = 2 \\pm \\sqrt{5}\\): both the 4 and the \\(2\\sqrt{5}\\) are divided by 2, not just one of them.",
        },
      ],
    },
  ],
};
