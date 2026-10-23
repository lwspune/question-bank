import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_CG_LINE_NOTE: SubtopicNote = {
  subtopicName: "Slope and Equation of a Line",
  title: "Slope and Equation of a Line",
  oneLineDefinition:
    "Read a line's slope and intercepts from its equation, test whether a point lies on it, and write its equation from one point and the slope.",
  whyItMatters:
    "Sixteen questions in the bank, every one EASY and every one from the 2025 shifts: more than half the chapter. Each is a single substitution or a single rearrangement, so these are the marks to take in well under 36 seconds. The options are built from the slips: the wrong sign of a slope, the reciprocal, the other intercept.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssccgln-slope",
      name: "Slope of a line",
      intuition:
        "Slope is how much the line climbs for each step to the right. A line going up to the right has a positive slope, one going down has a negative slope, a flat line has slope 0, and a vertical line has no slope at all.",
      definition:
        "- **Through two points:** slope \\(=\\) rise over run, the change in \\(y\\) divided by the change in \\(x\\). Subtract in the same order on top and bottom.\n" +
        "- **From \\(y = mx + c\\):** the slope is \\(m\\), the number in front of \\(x\\), and \\(c\\) is where the line cuts the y-axis.\n" +
        "- **From \\(ax + by + c = 0\\):** rearrange to \\(y = -\\frac{a}{b}x - \\frac{c}{b}\\), so the slope is \\(-\\frac{a}{b}\\).\n" +
        "- **Fast route:** with x and y on the same side, slope \\(= -\\frac{\\text{coefficient of } x}{\\text{coefficient of } y}\\). Safe only in that form: if the equation reads \\(ax = by + c\\), move the terms across first.\n" +
        "- A horizontal line \\(y = k\\) has slope 0. A vertical line \\(x = k\\) has no slope (the run is 0).",
      formula: {
        label: "Slope from two points and from an equation",
        latex: "m = \\frac{y_2 - y_1}{x_2 - x_1} \\qquad y = mx + c \\qquad ax + by + c = 0 \\Rightarrow m = -\\frac{a}{b}",
        symbols: [
          { symbol: "m", meaning: "the slope" },
          { symbol: "c", meaning: "in y = mx + c, the y-intercept" },
        ],
      },
      authoredExample: {
        prompt:
          "Find the slope of the line through \\((-2, 11)\\) and \\((3, -4)\\), and check that both points lie on \\(3x + y = 5\\), whose slope should match.",
        steps: [
          "Rise over run: \\(\\frac{-4 - 11}{3 - (-2)} = \\frac{-15}{5} = -3\\).",
          "From the equation: \\(y = -3x + 5\\), slope \\(-3\\). Or by the fast route, \\(-\\frac{3}{1} = -3\\).",
          "Both points fit: \\(3(-2) + 11 = 5\\) and \\(3(3) - 4 = 5\\).",
        ],
        answer: "\\(-3\\)",
      },
      selfCheckExample: {
        prompt: "What is the slope of the line \\(5x - 2y = 9\\)?",
        steps: ["\\(2y = 5x - 9\\), so \\(y = \\frac{5}{2}x - \\frac{9}{2}\\).", "Fast route check: \\(-\\frac{5}{-2} = \\frac{5}{2}\\)."],
        answer: "\\(\\frac{5}{2}\\)",
      },
      practiceSet: [
        { prompt: "Find the slope of the line through \\((1, 2)\\) and \\((5, 14)\\).", answer: "3" },
        { prompt: "Find the slope of the line through \\((0, -3)\\) and \\((6, 0)\\).", answer: "\\(\\frac{1}{2}\\)" },
        { prompt: "Find the slope of the line \\(3x + 6y = 1\\).", answer: "\\(-\\frac{1}{2}\\)" },
        { prompt: "What is the slope of the line \\(y = 4\\)?", answer: "0" },
        { prompt: "What is the slope of the line through \\((3, 1)\\) and \\((3, 8)\\)?", answer: "It has none: the line is vertical" },
      ],
      pyqExampleId: "669694cc-7fdc-40d1-af60-e89d085dd1bf",
      traps: [
        {
          title: "Dropping the minus sign in minus a over b",
          body:
            "For \\(ax + by + c = 0\\) the slope is \\(-\\frac{a}{b}\\). The positive fraction \\(\\frac{a}{b}\\) and the upside-down \\(\\frac{b}{a}\\) are always among the options.",
        },
        {
          title: "Subtracting in a different order on top and bottom",
          body:
            "Rise over run needs the same point first in both differences: \\(\\frac{y_2 - y_1}{x_2 - x_1}\\). Mixing the order flips the sign of the slope.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssccgln-intercepts",
      name: "Where a line cuts the axes",
      intuition:
        "Every point on the x-axis has \\(y = 0\\) and every point on the y-axis has \\(x = 0\\). So to find where a line crosses an axis, put the other coordinate to zero.",
      definition:
        "- **x-intercept:** put \\(y = 0\\) and solve for \\(x\\). The line meets the x-axis at \\((x, 0)\\).\n" +
        "- **y-intercept:** put \\(x = 0\\) and solve for \\(y\\). The line meets the y-axis at \\((0, y)\\).\n" +
        "- **Intercept form:** a line with intercepts \\(p\\) on the x-axis and \\(q\\) on the y-axis is \\(\\frac{x}{p} + \\frac{y}{q} = 1\\). Divide \\(ax + by = k\\) through by \\(k\\) to read both intercepts at once.\n" +
        "- The intercepts and the origin make a right triangle of area \\(\\frac{1}{2}|pq|\\).",
      formula: {
        label: "Intercept form of a line",
        latex: "\\frac{x}{p} + \\frac{y}{q} = 1",
        symbols: [
          { symbol: "p", meaning: "the x-intercept" },
          { symbol: "q", meaning: "the y-intercept" },
        ],
      },
      authoredExample: {
        prompt: "Find both intercepts of the line \\(3x - 7y = 21\\).",
        steps: [
          "Put \\(y = 0\\): \\(3x = 21\\), so the x-intercept is 7.",
          "Put \\(x = 0\\): \\(-7y = 21\\), so the y-intercept is \\(-3\\).",
          "Check in intercept form: divide by 21 to get \\(\\frac{x}{7} + \\frac{y}{-3} = 1\\).",
        ],
        answer: "x-intercept 7, y-intercept \\(-3\\)",
      },
      selfCheckExample: {
        prompt: "At which point does the line \\(y = 2x + 6\\) cross the x-axis?",
        steps: ["Put \\(y = 0\\): \\(2x + 6 = 0\\), so \\(x = -3\\)."],
        answer: "\\((-3, 0)\\)",
      },
      practiceSet: [
        { prompt: "Find the y-intercept of \\(2x - 3y = 12\\).", answer: "\\(-4\\)" },
        { prompt: "At which point does \\(3x + 2y = 18\\) meet the y-axis?", answer: "\\((0, 9)\\)" },
        { prompt: "Write the line whose x-intercept is 3 and y-intercept is \\(-2\\).", answer: "\\(\\frac{x}{3} - \\frac{y}{2} = 1\\), that is \\(2x - 3y = 6\\)" },
        {
          prompt: "Find the area of the triangle that the line \\(3x + 4y = 24\\) makes with the two axes.",
          answer: "24 square units",
          method: "Intercepts 8 and 6, so the area is \\(\\frac{1}{2} \\times 8 \\times 6\\).",
        },
      ],
      pyqExampleId: "b976fec2-7907-4db8-8ba8-9f4328eb0412",
      traps: [
        {
          title: "Putting the wrong coordinate to zero",
          body:
            "The x-intercept comes from \\(y = 0\\), not \\(x = 0\\). Putting \\(x = 0\\) gives the y-intercept, which the options usually print beside the right answer.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssccgln-point",
      name: "Testing a point on a line, and finding an unknown",
      intuition:
        "A point lies on a line exactly when its coordinates make the equation true. So a point on the line is an equation waiting to be used: put it in, and any unknown in the line drops out.",
      definition:
        "- **Test a point:** put its x into the equation and see whether you get its y. Both sides must match exactly.\n" +
        "- **Find an unknown:** if a line with an unknown slope or intercept passes through a given point, put the point in and solve the one equation.\n" +
        "- **Fast route for 'which point lies on it':** test each option in turn. When one of the options is 'all of the above', test every point before answering, not just the first that works.",
      authoredExample: {
        prompt:
          "The line \\(y = mx - 4\\) passes through \\((3, 17)\\). Find \\(m\\), and then decide whether \\((-1, -11)\\) lies on the line.",
        steps: [
          "Put the point in: \\(17 = 3m - 4\\), so \\(3m = 21\\) and \\(m = 7\\).",
          "The line is \\(y = 7x - 4\\). At \\(x = -1\\): \\(y = -7 - 4 = -11\\).",
          "So \\((-1, -11)\\) lies on the line.",
        ],
        answer: "\\(m = 7\\); yes, it lies on the line",
      },
      selfCheckExample: {
        prompt: "Which of the points \\((2, 3)\\), \\((-1, -6)\\) and \\((4, 9)\\) lie on the line \\(y = 3x - 3\\)?",
        steps: [
          "\\(x = 2\\): \\(6 - 3 = 3\\). Yes.",
          "\\(x = -1\\): \\(-3 - 3 = -6\\). Yes.",
          "\\(x = 4\\): \\(12 - 3 = 9\\). Yes.",
        ],
        answer: "All three",
      },
      practiceSet: [
        { prompt: "Does the point \\((4, -1)\\) lie on \\(2x + 3y = 5\\)?", answer: "Yes", method: "\\(8 - 3 = 5\\)." },
        { prompt: "Find \\(k\\) if \\((k, 3)\\) lies on \\(y = 2x - 7\\).", answer: "\\(k = 5\\)" },
        { prompt: "The line \\(y = mx + 6\\) passes through \\((-2, 0)\\). Find \\(m\\).", answer: "\\(m = 3\\)" },
        { prompt: "Find \\(c\\) if \\(y = 4x + c\\) passes through \\((2, 3)\\).", answer: "\\(c = -5\\)" },
      ],
      pyqExampleId: "46064515-008c-4903-b9e9-cd474d4eceed",
      traps: [
        {
          title: "Stopping at the first option that fits",
          body:
            "When 'all of the above' is an option, a point that fits does not end the question. Test every listed point; if they all fit, the answer is the 'all' option.",
        },
        {
          title: "Swapping the coordinates when substituting",
          body:
            "In \\((3, 17)\\) the 3 is x and the 17 is y. Putting 17 in for x gives a different, wrong value of the unknown.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssccgln-pointslope",
      name: "Equation of a line from a point and its slope",
      intuition:
        "A slope and one point pin a line down completely: start at the point and walk with that slope. The point-slope form writes exactly that walk as an equation.",
      definition:
        "- **Point-slope form:** the line through \\((x_1, y_1)\\) with slope \\(m\\) is \\(y - y_1 = m(x - x_1)\\). Open the bracket to get \\(y = mx + c\\).\n" +
        "- If the given point is on the y-axis, \\((0, c)\\), the line is \\(y = mx + c\\) straight away.\n" +
        "- **Through two points:** find the slope first by rise over run, then use either point in the point-slope form.\n" +
        "- **Fast route with options:** when all four options have the right slope, only the intercept differs. Put the given point into each and keep the one it satisfies.",
      formula: {
        label: "Point-slope form",
        latex: "y - y_1 = m(x - x_1)",
      },
      authoredExample: {
        prompt: "Find the equation of the line through \\((4, -1)\\) with slope 2.",
        steps: [
          "\\(y - (-1) = 2(x - 4)\\), so \\(y + 1 = 2x - 8\\).",
          "\\(y = 2x - 9\\).",
          "Check: at \\(x = 4\\), \\(y = 8 - 9 = -1\\).",
        ],
        answer: "\\(y = 2x - 9\\)",
      },
      selfCheckExample: {
        prompt: "Find the equation of the line through \\((2, 7)\\) and \\((6, 15)\\).",
        steps: [
          "Slope \\(= \\frac{15 - 7}{6 - 2} = \\frac{8}{4} = 2\\).",
          "\\(y - 7 = 2(x - 2)\\), so \\(y = 2x + 3\\).",
          "Check with the other point: \\(2(6) + 3 = 15\\).",
        ],
        answer: "\\(y = 2x + 3\\)",
      },
      practiceSet: [
        { prompt: "Find the line through \\((0, -4)\\) with slope 3.", answer: "\\(y = 3x - 4\\)" },
        { prompt: "Find the line through \\((1, 1)\\) with slope \\(-2\\).", answer: "\\(y = -2x + 3\\)" },
        { prompt: "Find the line through \\((-2, 0)\\) with slope \\(\\frac{1}{2}\\).", answer: "\\(y = \\frac{1}{2}x + 1\\)" },
        { prompt: "Find the line through \\((3, 4)\\) that is parallel to the x-axis.", answer: "\\(y = 4\\)", method: "A line parallel to the x-axis has slope 0." },
      ],
      pyqExampleId: "0f7da853-b4fb-440b-ba6b-432063b3d9b1",
      traps: [
        {
          title: "Keeping the wrong sign inside the bracket",
          body:
            "For the point \\((-4, -6)\\) the form is \\(y + 6 = m(x + 4)\\): subtracting a negative coordinate turns into adding. Writing \\(y - 6\\) or \\(x - 4\\) gives a line through a different point.",
        },
      ],
    },
  ],
};
