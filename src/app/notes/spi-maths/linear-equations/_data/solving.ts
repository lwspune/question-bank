import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_LE_SOLVING_NOTE: SubtopicNote = {
  subtopicName: "Solving Linear Equations",
  title: "Solving Linear Equations",
  oneLineDefinition:
    "A linear equation is solved by doing the same thing to both sides until the unknown stands alone; a pair in x and y is solved by removing one unknown first.",
  whyItMatters:
    "Eight questions in the bank, 6 EASY and 2 MODERATE. Each is solved by balancing both sides: one equation in one unknown, a linear inequality, or a pair of equations in x and y. The marks are lost to sign slips and to fractions cleared carelessly.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "spilesv-balance",
      name: "Solving an equation in one variable",
      intuition:
        "An equation is a balance. Whatever you do to one side you must do to the other: add, subtract, multiply or divide by the same non-zero number. The aim is to gather the unknown on one side and the numbers on the other.",
      definition:
        "- Moving a term across the equals sign changes its sign: \\(x + 4 = 10\\) becomes \\(x = 10 - 4\\).\n" +
        "- Multiplying or dividing both sides by the same **non-zero** number does not change the solution.\n" +
        "- **Fractions:** multiply every term by the LCM of the denominators first. Put brackets round each numerator, because a minus sign in front of a fraction applies to the whole numerator.\n" +
        "- Check the answer by putting it back into both sides.",
      authoredExample: {
        prompt: "Solve \\(7x - 4 = 3x + 12\\).",
        steps: [
          "Move \\(3x\\) to the left and \\(-4\\) to the right: \\(7x - 3x = 12 + 4\\).",
          "\\(4x = 16\\), so \\(x = 4\\).",
          "Check: \\(7(4) - 4 = 24\\) and \\(3(4) + 12 = 24\\).",
        ],
        answer: "\\(x = 4\\)",
      },
      selfCheckExample: {
        prompt: "Solve \\(\\frac{x}{2} - \\frac{x - 1}{3} = 2\\).",
        steps: [
          "Multiply every term by 6: \\(3x - 2(x - 1) = 12\\).",
          "\\(3x - 2x + 2 = 12\\), so \\(x = 10\\).",
          "Check: \\(5 - \\frac{9}{3} = 2\\).",
        ],
        answer: "\\(x = 10\\)",
      },
      practiceSet: [
        { prompt: "Solve \\(4y + 9 = y - 3\\).", answer: "\\(y = -4\\)" },
        { prompt: "Solve \\(\\frac{2x}{3} = 8\\).", answer: "\\(x = 12\\)" },
        { prompt: "Solve \\(3(x - 2) = 2(x + 1)\\).", answer: "\\(x = 8\\)" },
        { prompt: "Solve \\(\\frac{x + 1}{4} = \\frac{x - 2}{3}\\).", answer: "\\(x = 11\\)" },
      ],
      pyqExampleId: "d79c81a9-241e-47ea-ae55-71b32f625089",
      traps: [
        {
          title: "Not changing the sign when a term moves",
          body:
            "\\(5x - 2 = 3x + 6\\) gives \\(2x = 8\\), so \\(x = 4\\). Moving \\(-2\\) across without changing its sign gives \\(2x = 4\\) and a wrong \\(x = 2\\).",
        },
        {
          title: "The minus sign in front of a fraction",
          body:
            "\\(-\\frac{x - 1}{2}\\) multiplied by 2 is \\(-(x - 1) = -x + 1\\), not \\(-x - 1\\). Bracket the numerator before you multiply.",
        },
        {
          title: "Multiplying only some of the terms",
          body:
            "When clearing fractions, every term is multiplied, including a number standing alone. \\(\\frac{x}{3} + 2 = 5\\) times 3 is \\(x + 6 = 15\\), so \\(x = 9\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spilesv-inequality",
      name: "Solving a linear inequality",
      intuition:
        "An inequality is solved like an equation, with one extra rule: multiplying or dividing both sides by a negative number turns the sign round. The answer is a range of values, not a single number.",
      definition:
        "- Adding or subtracting the same thing on both sides keeps the sign.\n" +
        "- Multiplying or dividing by a **positive** number keeps the sign.\n" +
        "- Multiplying or dividing by a **negative** number flips the sign: \\(<\\) becomes \\(>\\), and \\(\\le\\) becomes \\(\\ge\\).\n" +
        "- Test the answer with one value inside the range.",
      formula: {
        label: "Flipping rule",
        latex: "a < b \\text{ and } k < 0 \\;\\Rightarrow\\; ka > kb",
      },
      authoredExample: {
        prompt: "Solve \\(5 - 3x \\le 14\\).",
        steps: [
          "Subtract 5: \\(-3x \\le 9\\).",
          "Divide by \\(-3\\), a negative number, so the sign flips: \\(x \\ge -3\\).",
          "Test \\(x = 0\\): \\(5 \\le 14\\), true.",
        ],
        answer: "\\(x \\ge -3\\)",
      },
      selfCheckExample: {
        prompt: "Solve \\(\\frac{x}{2} + 1 < \\frac{x}{3} + 3\\).",
        steps: [
          "Multiply by 6, a positive number, so the sign stays: \\(3x + 6 < 2x + 18\\).",
          "\\(x < 12\\).",
        ],
        answer: "\\(x < 12\\)",
      },
      practiceSet: [
        { prompt: "Solve \\(2x + 7 > 15\\).", answer: "\\(x > 4\\)" },
        { prompt: "Solve \\(-4x < 20\\).", answer: "\\(x > -5\\)" },
        { prompt: "Solve \\(3(x - 1) \\ge 2x + 5\\).", answer: "\\(x \\ge 8\\)" },
      ],
      pyqExampleId: "36d5995c-1510-4aa8-8ac9-619f5b4fcf52",
      traps: [
        {
          title: "Forgetting to flip",
          body:
            "\\(-2x > 6\\) gives \\(x < -3\\). Dividing by \\(-2\\) without turning the sign gives \\(x > -3\\), which fails: at \\(x = 0\\), \\(-2x = 0\\) is not more than 6.",
        },
        {
          title: "Flipping when the number is positive",
          body:
            "Multiplying by 15 to clear the denominators 3 and 5 keeps the sign as it is, because 15 is positive. Only a negative multiplier flips it.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spilesv-pair",
      name: "Solving a pair of equations in two variables",
      intuition:
        "One equation in x and y has endless solutions. Two equations usually pin down a single pair. Make the number in front of one unknown the same in both equations, then add or subtract to remove it.",
      definition:
        "- A pair \\((x, y)\\) is a **solution** of \\(ax + by = c\\) when it makes the equation true. To find a missing constant, put the given \\(x\\) and \\(y\\) in.\n" +
        "- **Elimination:** multiply the equations so that one unknown has equal or opposite coefficients, then subtract or add.\n" +
        "- **Substitution:** write one unknown in terms of the other from one equation and put it into the other.\n" +
        "- With fractions, clear the denominators in each equation first.\n" +
        "- Check the answer in **both** equations. In a multiple-choice question you can also test each option.",
      authoredExample: {
        prompt: "Solve \\(3x + 2y = 16\\) and \\(x - y = 2\\).",
        steps: [
          "Multiply the second equation by 2: \\(2x - 2y = 4\\).",
          "Add it to the first: \\(5x = 20\\), so \\(x = 4\\).",
          "Then \\(y = x - 2 = 2\\). Check: \\(12 + 4 = 16\\).",
        ],
        answer: "\\(x = 4\\), \\(y = 2\\)",
      },
      selfCheckExample: {
        prompt: "If \\((2, -1)\\) is a solution of \\(4x + ky = 11\\), find \\(k\\).",
        steps: ["\\(4(2) + k(-1) = 11\\).", "\\(8 - k = 11\\), so \\(k = -3\\)."],
        answer: "\\(k = -3\\)",
      },
      practiceSet: [
        { prompt: "Solve \\(x + y = 10\\) and \\(x - y = 4\\).", answer: "\\(x = 7\\), \\(y = 3\\)" },
        { prompt: "Solve \\(2x + 3y = 12\\) and \\(3x - y = 7\\).", answer: "\\(x = 3\\), \\(y = 2\\)" },
        { prompt: "Solve \\(\\frac{x}{2} + \\frac{y}{3} = 4\\) and \\(x - y = 3\\).", answer: "\\(x = 6\\), \\(y = 3\\)" },
        { prompt: "Is \\((1, 3)\\) a solution of \\(5x - 2y = -1\\)?", answer: "Yes: \\(5 - 6 = -1\\)" },
      ],
      pyqExampleId: "d9f22afa-ad8c-4f5b-9287-a485b9f1cfab",
      traps: [
        {
          title: "Checking in only one equation",
          body:
            "A pair that fits one equation can miss the other. \\((5, 2)\\) fits \\(x - y = 3\\) but not \\(x + 2y = 11\\), since \\(5 + 4 = 9\\).",
        },
        {
          title: "Subtracting when the signs are opposite",
          body:
            "If one equation has \\(+6y\\) and the other \\(-6y\\), add the equations to remove \\(y\\). Subtracting them doubles the y-term instead.",
        },
      ],
    },
  ],
};
