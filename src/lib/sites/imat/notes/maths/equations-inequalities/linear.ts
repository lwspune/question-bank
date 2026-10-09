import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_MAT_EQI_LINEAR_NOTE: SubtopicNote = {
  subtopicName: "Linear Equations and Systems",
  title: "Linear Equations, Parameters and Systems",
  oneLineDefinition:
    "A linear equation reduces to ax = b, which has one solution, none or infinitely many; two linear equations in two unknowns are solved by substitution or elimination.",
  whyItMatters:
    "A system of two equations appeared in 2015. The 2025 paper asked twice whether a linear equation with a parameter has one solution, none, or infinitely many.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "imat-eqi-linear-equations",
      name: "Linear equations and equations with a parameter",
      intuition:
        "Whatever you do to one side, do to the other, and a linear equation always ends as \\(ax = b\\). Dividing by \\(a\\) is the last step, and it is allowed only when \\(a \\ne 0\\). When a letter (a parameter) sits in \\(a\\), the case \\(a = 0\\) has to be checked separately.",
      definition:
        "Clear fractions by multiplying every term by the lowest common denominator, collect terms, and reach \\(ax = b\\). Then:\n" +
        "- \\(a \\ne 0\\): exactly one solution, \\(x = \\frac{b}{a}\\). The equation is **determined**.\n" +
        "- \\(a = 0\\) and \\(b = 0\\): \\(0 = 0\\), every real \\(x\\) is a solution. The equation is **indeterminate** (an identity).\n" +
        "- \\(a = 0\\) and \\(b \\ne 0\\): \\(0 = b\\), no solution. The equation is **impossible**.",
      formula: {
        label: "Solution of ax = b",
        latex: "ax = b,\\; a \\ne 0 \\;\\Rightarrow\\; x = \\frac{b}{a}",
      },
      authoredExample: {
        prompt: "(a) Solve \\(\\dfrac{x - 1}{2} - \\dfrac{x + 2}{3} = 1\\). (b) Discuss \\((k - 2)x = k^2 - 4\\) for every value of the parameter \\(k\\).",
        steps: [
          "(a) Multiply by 6: \\(3(x - 1) - 2(x + 2) = 6\\), so \\(3x - 3 - 2x - 4 = 6\\) and \\(x = 13\\).",
          "(b) If \\(k \\ne 2\\): divide by \\(k - 2\\). Since \\(k^2 - 4 = (k - 2)(k + 2)\\), the solution is \\(x = k + 2\\).",
          "If \\(k = 2\\): the equation is \\(0 \\cdot x = 0\\), true for every \\(x\\): indeterminate.",
          "No value of \\(k\\) makes it impossible.",
        ],
        answer: "(a) \\(x = 13\\); (b) one solution \\(x = k + 2\\) for \\(k \\ne 2\\); every \\(x\\) for \\(k = 2\\)",
      },
      selfCheckExample: {
        prompt: "For which value of \\(k\\) does the equation \\((k^2 - 9)\\,x = k - 3\\) have no solution?",
        options: ["\\(k = 3\\)", "\\(k = -3\\)", "\\(k = \\pm 3\\)", "\\(k = 0\\)", "For no value of \\(k\\)"],
        steps: [
          "The coefficient \\(k^2 - 9\\) is zero for \\(k = 3\\) and \\(k = -3\\); every other \\(k\\) gives one solution.",
          "\\(k = 3\\): \\(0 \\cdot x = 0\\), true for every \\(x\\) (indeterminate, not impossible).",
          "\\(k = -3\\): \\(0 \\cdot x = -6\\), never true: no solution. So option C is wrong because it includes \\(k = 3\\).",
        ],
        answer: "(B) \\(k = -3\\)",
      },
      practiceSet: [
        { prompt: "Solve \\(5 - 2(x - 3) = x + 2\\).", answer: "\\(x = 3\\)" },
        { prompt: "How many solutions has \\(3x + 1 = 3x + 4\\)?", answer: "None", method: "It reduces to \\(0 = 3\\)" },
        { prompt: "How many solutions has \\(2(x + 1) = 2x + 2\\)?", answer: "Infinitely many", method: "It reduces to \\(0 = 0\\)" },
        { prompt: "For which values of \\(m\\) does \\((m + 1)x = 4\\) have exactly one solution?", answer: "Every \\(m \\ne -1\\)" },
      ],
      traps: [
        {
          title: "Zero coefficient: check the right-hand side",
          body: "When the coefficient of \\(x\\) is zero, the equation is not automatically impossible. If the right-hand side is also zero, every \\(x\\) works. Only a zero coefficient with a non-zero right-hand side gives no solution.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-eqi-systems",
      name: "Systems of two linear equations",
      intuition:
        "Each linear equation in \\(x\\) and \\(y\\) is a straight line, and a solution of the system is a point on both lines. Two lines usually cross once; parallel lines never meet; and two equations that describe the same line share every point.",
      definition:
        "- **Substitution**: make one unknown the subject of one equation and put it into the other.\n" +
        "- **Elimination**: multiply the equations so one unknown has opposite coefficients, then add.\n" +
        "- **One solution** when the coefficients of \\(x\\) and \\(y\\) are not in proportion.\n" +
        "- **No solution** when they are in proportion but the constants are not (parallel lines): \\(x + 2y = 3\\), \\(2x + 4y = 7\\).\n" +
        "- **Infinitely many** when the whole of one equation is a multiple of the other.\n" +
        "- If a question asks only for \\(x + y\\) or \\(x - y\\), adding or subtracting the equations may give it directly.",
      formula: {
        label: "Two equations in two unknowns",
        latex: "\\begin{cases} a_1 x + b_1 y = c_1 \\\\ a_2 x + b_2 y = c_2 \\end{cases}",
      },
      authoredExample: {
        prompt: "Solve \\(3x + 2y = 16\\) and \\(x - y = 2\\).",
        steps: [
          "From the second equation, \\(x = y + 2\\).",
          "Substitute: \\(3(y + 2) + 2y = 16\\), so \\(5y = 10\\) and \\(y = 2\\).",
          "Then \\(x = 4\\). Check in the first: \\(12 + 4 = 16\\).",
        ],
        answer: "\\(x = 4,\\ y = 2\\)",
      },
      selfCheckExample: {
        prompt: "The numbers \\(x\\) and \\(y\\) satisfy \\(2x + 5y = 1\\) and \\(3x - 2y = 11\\). What is the value of \\(x - y\\)?",
        options: ["2", "\\(-4\\)", "3", "4", "5"],
        steps: [
          "Eliminate \\(y\\): multiply the first by 2 and the second by 5, then add: \\(19x = 57\\), so \\(x = 3\\).",
          "Then \\(5y = 1 - 6 = -5\\), so \\(y = -1\\).",
          "\\(x - y = 3 - (-1) = 4\\). Option A is \\(x + y\\); B is \\(y - x\\); C is \\(x\\) alone.",
        ],
        answer: "(D) 4",
      },
      practiceSet: [
        { prompt: "Solve \\(x + y = 10\\) and \\(x - y = 4\\).", answer: "\\(x = 7,\\ y = 3\\)", method: "Add the equations" },
        { prompt: "Solve \\(4x + 3y = 25\\) and \\(x + 3y = 13\\).", answer: "\\(x = 4,\\ y = 3\\)", method: "Subtract: \\(3x = 12\\)" },
        { prompt: "How many solutions has the system \\(2x + y = 7\\), \\(4x + 2y = 14\\)?", answer: "Infinitely many", method: "The second is twice the first" },
        { prompt: "How many solutions has the system \\(x + 2y = 3\\), \\(2x + 4y = 7\\)?", answer: "None", method: "Parallel lines" },
      ],
      traps: [
        {
          title: "Proportional coefficients do not always mean no solution",
          body: "If the \\(x\\) and \\(y\\) coefficients are in proportion, the lines are parallel. They have no common point only if the constants break the proportion; if the constants follow it too, the lines coincide and there are infinitely many solutions.",
        },
      ],
    },
  ],
};
