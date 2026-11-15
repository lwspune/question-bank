import type { SubtopicNote } from "@/app/notes/_types";

export const SSC2_LE_SYSTEMS_NOTE: SubtopicNote = {
  subtopicName: "Solving Linear Systems",
  title: "Solving Linear Systems",
  oneLineDefinition:
    "Solve a pair of linear equations by removing one letter; three equations by removing one letter twice; and tell whether a pair has one, none or endless solutions by comparing coefficient ratios.",
  whyItMatters:
    "9 questions in the Tier II bank, 8 EASY and 1 MODERATE. Many give the solution among the options, and checking an option is faster than solving.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssc2lesy-solve",
      name: "Solving two or three equations",
      intuition:
        "Two equations in two letters are solved by getting rid of one letter: multiply so that one letter has the same coefficient in both, then add or subtract. Three equations are cut down to two the same way.",
      definition:
        "- Elimination: scale the equations so one letter's coefficients match, then add or subtract.\n" +
        "- Substitution: when one equation gives a letter easily (\\(y = 15 - 8x\\)), put it into the other.\n" +
        "- Three equations: remove the same letter from two different pairs to get two equations in two letters.\n" +
        "- 'The point lies on which line': solve, then test each option at that point.",
      formula: {
        label: "A pair of linear equations",
        latex: "a_1x + b_1y = c_1, \\quad a_2x + b_2y = c_2",
      },
      authoredExample: {
        prompt: "Solve \\(3x + 4y = 18\\) and \\(5x - 2y = 4\\).",
        steps: ["Double the second: \\(10x - 4y = 8\\). Add the first: \\(13x = 26\\), so \\(x = 2\\).", "Then \\(6 + 4y = 18\\), so \\(y = 3\\)."],
        answer: "\\(x = 2, y = 3\\)",
      },
      selfCheckExample: {
        prompt: "Solve \\(x + y + z = 6\\), \\(x - y + z = 2\\) and \\(2x + y - z = 1\\).",
        steps: [
          "Subtracting the second from the first: \\(2y = 4\\), so \\(y = 2\\).",
          "Then \\(x + z = 4\\) and \\(2x - z = -1\\): adding gives \\(3x = 3\\), so \\(x = 1\\) and \\(z = 3\\).",
        ],
        answer: "\\(x = 1, y = 2, z = 3\\)",
      },
      practiceSet: [
        { prompt: "Solve \\(x + 2y = 7\\) and \\(2x - y = 4\\).", answer: "\\(x = 3, y = 2\\)" },
        { prompt: "The lines \\(x + y = 5\\) and \\(x - y = 1\\) meet at P. Does P lie on \\(2x + y = 8\\)?", answer: "Yes: P is (3, 2)" },
        { prompt: "If \\(4x - 3y = 10\\) and \\(x = 4\\), find y.", answer: "2" },
      ],
      pyqExampleId: "b56549e2-974a-4746-8a6b-030a133e1dfa",
      traps: [
        {
          title: "Subtracting a negative term wrongly",
          body: "Subtracting \\(x - 2y = 1\\) from \\(x + 3y = 11\\) gives \\(5y = 10\\), because \\(3y - (-2y) = 5y\\). Taking it as y gives the wrong value.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2lesy-number",
      name: "How many solutions a pair has",
      intuition:
        "Two straight lines either cross once, run side by side and never meet, or lie on top of each other. Setting the coefficients of one line against the other's, as ratios, settles which case it is with no drawing at all.",
      definition:
        "- For \\(a_1x + b_1y + c_1 = 0\\) and \\(a_2x + b_2y + c_2 = 0\\):\n" +
        "- One solution: \\(\\frac{a_1}{a_2} \\ne \\frac{b_1}{b_2}\\).\n" +
        "- No solution (parallel lines): \\(\\frac{a_1}{a_2} = \\frac{b_1}{b_2} \\ne \\frac{c_1}{c_2}\\).\n" +
        "- Infinitely many (the same line): \\(\\frac{a_1}{a_2} = \\frac{b_1}{b_2} = \\frac{c_1}{c_2}\\).",
      formula: {
        label: "No solution",
        latex: "\\frac{a_1}{a_2} = \\frac{b_1}{b_2} \\ne \\frac{c_1}{c_2}",
      },
      authoredExample: {
        prompt: "For what value of k do \\(4x + ky - 7 = 0\\) and \\(12x + 15y - 9 = 0\\) have no solution?",
        steps: ["\\(\\frac{4}{12} = \\frac{k}{15}\\) gives \\(k = 5\\).", "Then \\(\\frac{-7}{-9} = \\frac{7}{9} \\ne \\frac{1}{3}\\), so the lines are parallel and distinct."],
        answer: "\\(k = 5\\)",
      },
      selfCheckExample: {
        prompt: "For what value of m do \\(2x + 3y = 5\\) and \\(6x + my = 15\\) have infinitely many solutions?",
        steps: ["\\(\\frac{2}{6} = \\frac{3}{m} = \\frac{5}{15}\\).", "So \\(m = 9\\)."],
        answer: "9",
      },
      practiceSet: [
        { prompt: "Do \\(x + 2y = 3\\) and \\(2x + 4y = 7\\) have a solution?", answer: "No: the lines are parallel" },
        { prompt: "For what p do \\(px + 6y = 4\\) and \\(2x + 3y = 2\\) have infinitely many solutions?", answer: "4" },
        { prompt: "Do \\(3x - y = 2\\) and \\(x + y = 6\\) have exactly one solution?", answer: "Yes" },
      ],
      pyqExampleId: "3462a51b-6a14-44e6-ace8-65adc0f2c76b",
      traps: [
        {
          title: "Forgetting to check the constants for 'no solution'",
          body: "Equal x and y ratios alone allow either no solution or infinitely many. Check that the constant ratio is DIFFERENT before answering 'no solution'.",
        },
      ],
    },
  ],
};
