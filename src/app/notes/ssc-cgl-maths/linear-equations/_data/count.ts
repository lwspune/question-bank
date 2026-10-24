import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_LE_COUNT_NOTE: SubtopicNote = {
  subtopicName: "Number of Solutions",
  title: "Number of Solutions",
  oneLineDefinition:
    "Two linear equations have one solution, no solution or infinitely many, and comparing the ratios of their coefficients tells you which without solving anything.",
  whyItMatters:
    "Fifteen questions in the bank, all from the 2024 shifts and eleven of them EASY. None needs the system solved: five ask which case a system is in, seven find one constant that forces a case, and three find two constants. Each is three fractions and one comparison, a few seconds once the rule is sure.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssclens-ratios",
      name: "One, none or infinitely many solutions from the coefficient ratios",
      intuition:
        "Each linear equation in x and y is a straight line. Two lines either cross at one point, run parallel and never meet, or lie on top of each other and share every point. The ratios of the coefficients tell you which, with no drawing and no solving.",
      definition:
        "- Write both equations in the same form, \\(a_1x + b_1y + c_1 = 0\\) and \\(a_2x + b_2y + c_2 = 0\\), or both with the constant on the right.\n" +
        "- **One solution** (the lines cross): \\(\\frac{a_1}{a_2} \\ne \\frac{b_1}{b_2}\\).\n" +
        "- **No solution** (parallel lines): \\(\\frac{a_1}{a_2} = \\frac{b_1}{b_2} \\ne \\frac{c_1}{c_2}\\).\n" +
        "- **Infinitely many solutions** (the same line, called coincident lines): all three ratios are equal, so one equation is a multiple of the other.\n" +
        "- A system with at least one solution is **consistent**; a system with none is **inconsistent**.\n" +
        "- **Fast route:** if the left side of one equation is a multiple of the other's, multiply the other's constant by the same number. The same constant means infinitely many solutions; a different one means none.\n" +
        "- Two straight lines can never meet at exactly two points, so \"more than one but finitely many\" is never the answer.",
      formula: {
        label: "Number of solutions of two linear equations",
        latex:
          "\\frac{a_1}{a_2} \\ne \\frac{b_1}{b_2} \\;(\\text{one}) \\qquad \\frac{a_1}{a_2} = \\frac{b_1}{b_2} \\ne \\frac{c_1}{c_2} \\;(\\text{none}) \\qquad \\frac{a_1}{a_2} = \\frac{b_1}{b_2} = \\frac{c_1}{c_2} \\;(\\text{infinitely many})",
        symbols: [
          { symbol: "\\(a_1, b_1, c_1\\)", meaning: "the coefficients of x and y and the constant in the first equation" },
          { symbol: "\\(a_2, b_2, c_2\\)", meaning: "the same three numbers in the second equation" },
        ],
      },
      authoredExample: {
        prompt: "How many solutions does the system \\(6x - 4y = 10\\), \\(9x - 6y = 12\\) have?",
        steps: [
          "\\(\\frac{a_1}{a_2} = \\frac{6}{9} = \\frac{2}{3}\\) and \\(\\frac{b_1}{b_2} = \\frac{-4}{-6} = \\frac{2}{3}\\): equal, so the lines are parallel or the same.",
          "\\(\\frac{c_1}{c_2} = \\frac{10}{12} = \\frac{5}{6}\\), which is not \\(\\frac{2}{3}\\), so the lines are parallel and distinct.",
          "Fast route: \\(9x - 6y\\) is 1.5 times \\(6x - 4y\\), but \\(1.5 \\times 10 = 15\\), not 12.",
        ],
        answer: "No solution",
      },
      selfCheckExample: {
        prompt: "How many solutions does the system \\(2x + 5y = 8\\), \\(6x + 15y = 24\\) have?",
        steps: [
          "\\(\\frac{2}{6} = \\frac{5}{15} = \\frac{8}{24} = \\frac{1}{3}\\): all three ratios are equal.",
          "The second equation is 3 times the first, so both are the same line.",
        ],
        answer: "Infinitely many",
      },
      practiceSet: [
        {
          prompt: "How many solutions does the system \\(x + 2y = 4\\), \\(3x - y = 5\\) have?",
          answer: "Exactly one",
          method: "\\(\\frac{1}{3} \\ne \\frac{2}{-1}\\).",
        },
        {
          prompt: "How many solutions does the system \\(2x + 4y = 10\\), \\(x + 2y = 5\\) have?",
          answer: "Infinitely many",
          method: "The first equation is 2 times the second.",
        },
        {
          prompt: "How many solutions does the system \\(4x - 2y = 6\\), \\(2x - y = 5\\) have?",
          answer: "None",
          method: "Coefficient ratios are both 2, but \\(\\frac{6}{5} \\ne 2\\).",
        },
        { prompt: "Two distinct parallel lines are drawn in a plane. How many points do they have in common?", answer: "None" },
      ],
      pyqExampleId: "6e59e6f5-0a64-4592-bd04-4f912a7be574",
      traps: [
        {
          title: "Mixing forms flips the sign of the constant ratio",
          body:
            "Take \\(4x + 6y - 10 = 0\\) and \\(2x + 3y = 5\\). Comparing \\(-10\\) with 5 gives a constant ratio of \\(-2\\) against coefficient ratios of 2, which looks like no solution, yet the first equation is just 2 times the second: the same line. Move both constants to the same side before comparing \\(\\frac{c_1}{c_2}\\).",
        },
        {
          title: "Calling a system with all three ratios different inconsistent",
          body:
            "No solution needs the two coefficient ratios to be equal. If \\(\\frac{a_1}{a_2}\\) and \\(\\frac{b_1}{b_2}\\) differ, the lines cross and there is exactly one solution, whatever the constants are.",
        },
        {
          title: "Choosing \"finitely many, but more than one\"",
          body:
            "Two straight lines share no point, one point or every point. A pair of linear equations never has exactly two or three solutions, so that option is always wrong.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssclens-onek",
      name: "Finding a constant that gives a required number of solutions",
      intuition:
        "The case is given and one coefficient is unknown. Write the ratio that holds the unknown, set it against a ratio made only of numbers, and the constant falls out of a one-step equation.",
      definition:
        "- **Infinitely many solutions:** set the unknown's ratio equal to a ratio of known numbers and solve. Then check that the third ratio matches as well; if it does not, no value works.\n" +
        "- **No solution:** set the unknown's ratio equal to the other coefficient ratio, then confirm that the ratio of the constants is different.\n" +
        "- **One solution:** the answer is a \"not equal\" statement. Find the value at which the two coefficient ratios become equal, and exclude it: \\(k \\ne\\) that value.\n" +
        "- Cross-multiply to clear fractions: \\(\\frac{4}{6} = \\frac{6}{k + 4}\\) becomes \\(4(k + 4) = 36\\).",
      authoredExample: {
        prompt: "For what value of \\(m\\) does the system \\(3x + my = 7\\), \\(9x + 12y = 20\\) have no solution?",
        steps: [
          "No solution needs \\(\\frac{3}{9} = \\frac{m}{12}\\), so \\(m = \\frac{12}{3} = 4\\).",
          "Check the constants: \\(\\frac{7}{20}\\) is not \\(\\frac{1}{3}\\), so the lines are parallel and distinct, not the same line.",
        ],
        answer: "\\(m = 4\\)",
      },
      selfCheckExample: {
        prompt: "For what value of \\(k\\) does the system \\(2x + ky = 5\\), \\(6x + 9y = 15\\) have infinitely many solutions?",
        steps: [
          "\\(\\frac{2}{6} = \\frac{1}{3}\\), so \\(\\frac{k}{9} = \\frac{1}{3}\\) and \\(k = 3\\).",
          "Check the constants: \\(\\frac{5}{15} = \\frac{1}{3}\\) as well, so the two equations are the same line.",
        ],
        answer: "\\(k = 3\\)",
      },
      practiceSet: [
        {
          prompt: "For what value of \\(k\\) does the system \\(x + ky = 4\\), \\(2x + 6y = 9\\) have no solution?",
          answer: "\\(k = 3\\)",
          method: "\\(\\frac{1}{2} = \\frac{k}{6}\\); and \\(\\frac{4}{9} \\ne \\frac{1}{2}\\).",
        },
        {
          prompt: "For what values of \\(k\\) does the system \\(3x + 2y = 5\\), \\(kx + 4y = 7\\) have exactly one solution?",
          answer: "\\(k \\ne 6\\)",
          method: "The coefficient ratios are equal when \\(\\frac{3}{k} = \\frac{2}{4}\\), that is \\(k = 6\\).",
        },
        {
          prompt: "For what value of \\(p\\) are \\(2x - 3y = 1\\) and \\(4x + py = 2\\) the same line?",
          answer: "\\(p = -6\\)",
          method: "\\(\\frac{2}{4} = \\frac{1}{2} = \\frac{-3}{p}\\).",
        },
        {
          prompt: "For what value of \\(k\\) does the system \\(kx + 2y = 3\\), \\(6x + 4y = 6\\) have infinitely many solutions?",
          answer: "\\(k = 3\\)",
          method: "\\(\\frac{2}{4} = \\frac{3}{6} = \\frac{1}{2}\\), so \\(\\frac{k}{6} = \\frac{1}{2}\\).",
        },
      ],
      pyqExampleId: "b04e335c-873e-4069-8d53-98d66ad06820",
      traps: [
        {
          title: "Skipping the constant check for no solution",
          body:
            "The value that makes the coefficient ratios equal can also make the constant ratio equal. Then the lines are the same, not parallel, and the system has infinitely many solutions. For \\(kx + 2y = 3\\) and \\(6x + 4y = 6\\), \\(k = 3\\) gives the same line, so no value of \\(k\\) gives no solution.",
        },
        {
          title: "Giving a single value for a unique solution",
          body:
            "A unique solution holds for every value except one. The answer reads \\(k \\ne 5\\), and an option saying \\(k = 5\\) is the one value that fails.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssclens-twok",
      name: "Finding two unknown constants from the ratio conditions",
      intuition:
        "Infinitely many solutions means three ratios are equal, and that is two equations at once: enough to fix two unknown constants.",
      definition:
        "- **Infinitely many solutions:** write first ratio \\(=\\) second ratio and second ratio \\(=\\) third ratio. Two equations fix two constants.\n" +
        "- When one ratio holds only numbers, set each of the other two equal to it: that is the quickest pair.\n" +
        "- **No solution:** the coefficient ratios give one equation, which may be a quadratic with two roots. The constant ratio then gives a \"not equal\" condition, which can rule out one of the roots or limit the second constant.\n" +
        "- Check the answer by writing out both equations: one should be an exact multiple of the other, left side and right side.",
      authoredExample: {
        prompt: "Find \\(a\\) and \\(b\\) so that \\(2x + 3y = 7\\) and \\((a + b)x + (2a - b)y = 21\\) have infinitely many solutions.",
        steps: [
          "The constants give a ratio of numbers only: \\(\\frac{21}{7} = 3\\). So the second equation must be 3 times the first.",
          "\\(a + b = 3 \\times 2 = 6\\) and \\(2a - b = 3 \\times 3 = 9\\).",
          "Add: \\(3a = 15\\), so \\(a = 5\\) and \\(b = 1\\).",
          "Check: the second equation is \\(6x + 9y = 21\\), which is 3 times \\(2x + 3y = 7\\).",
        ],
        answer: "\\(a = 5,\\ b = 1\\)",
      },
      selfCheckExample: {
        prompt: "The system \\(2x + 3y = 4\\), \\(6x + ay = b\\) has no solution. Find \\(a\\), and the condition on \\(b\\).",
        steps: [
          "The coefficient ratios must be equal: \\(\\frac{2}{6} = \\frac{3}{a}\\), so \\(a = 9\\).",
          "The constant ratio must differ: \\(\\frac{4}{b} \\ne \\frac{1}{3}\\), so \\(b \\ne 12\\).",
        ],
        answer: "\\(a = 9\\) and \\(b \\ne 12\\)",
      },
      practiceSet: [
        {
          prompt: "Find \\(a\\) and \\(b\\) so that \\(ax + by = 4\\) and \\(2x + 3y = 2\\) have infinitely many solutions.",
          answer: "\\(a = 4,\\ b = 6\\)",
          method: "\\(\\frac{4}{2} = 2\\), so the first equation is twice the second.",
        },
        {
          prompt: "Find \\(p\\) and \\(q\\) so that \\(px + 2y = q\\) and \\(3x + y = 5\\) are the same line.",
          answer: "\\(p = 6,\\ q = 10\\)",
          method: "\\(\\frac{2}{1} = 2\\), so \\(p = 6\\) and \\(q = 10\\).",
        },
        {
          prompt:
            "For \\(x + ay = 1\\) and \\(ax + 9y = 3\\), the coefficient ratios are equal when \\(a = 3\\) and when \\(a = -3\\). Which value gives no solution?",
          answer: "\\(a = -3\\)",
          method: "At \\(a = 3\\) all three ratios are \\(\\frac{1}{3}\\) (the same line); at \\(a = -3\\) the coefficient ratios are \\(-\\frac{1}{3}\\) but the constant ratio is \\(\\frac{1}{3}\\).",
        },
      ],
      pyqExampleId: "e38088f3-b8c8-4b72-8eed-3f8fb46a0d50",
      traps: [
        {
          title: "Keeping both roots of the coefficient condition",
          body:
            "Setting two coefficient ratios equal can give a quadratic such as \\(a^2 - 9 = 0\\) with two roots. One root may also make the constants proportional, which gives the same line instead of parallel lines. Test the constant ratio at each root before choosing.",
        },
      ],
    },
  ],
};
