import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_LE_CONSISTENCY_NOTE: SubtopicNote = {
  subtopicName: "Graphs and Consistency of a Pair",
  title: "Graphs and Consistency of a Pair",
  oneLineDefinition:
    "Every linear equation in x and y is a straight line, and comparing the ratios of two lines' coefficients tells you whether they cross once, run parallel, or are the same line.",
  whyItMatters:
    "Fourteen questions in the bank, 10 EASY and 4 MODERATE. One table of three ratios answers nearly all of them: whether two lines cross, run parallel or lie on top of each other, and so whether the pair has one solution, none, or infinitely many.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "spilecn-graph",
      name: "The graph of a linear equation",
      intuition:
        "Every linear equation in x and y draws a straight line. Which letters appear tells you its direction: with both x and y it slants, with only x it stands upright, and with only y it lies flat.",
      definition:
        "- **\\(x = a\\)** is a vertical line, parallel to the y-axis, \\(a\\) units from it.\n" +
        "- **\\(y = b\\)** is a horizontal line, parallel to the x-axis.\n" +
        "- **\\(x = 0\\)** is the y-axis itself, and **\\(y = 0\\)** is the x-axis.\n" +
        "- A one-letter equation is still linear: \\(y = 3\\) is \\(0x + 1y = 3\\).",
      table: {
        columns: ["Equation", "Graph", "Example"],
        rows: [
          { cells: ["\\(ax + by = c\\), with \\(a\\) and \\(b\\) not zero", "A slanting straight line", "\\(2x + y = 4\\)"] },
          { cells: ["\\(x = a\\)", "A vertical line, parallel to the y-axis", "\\(x = 3\\)"] },
          { cells: ["\\(y = b\\)", "A horizontal line, parallel to the x-axis", "\\(y = 5\\)"] },
          { cells: ["\\(x = 0\\)", "The y-axis itself", "every point \\((0, y)\\)"] },
          { cells: ["\\(y = 0\\)", "The x-axis itself", "every point \\((x, 0)\\)"] },
          { cells: ["\\(y = mx\\)", "A line through the origin", "\\(y = 2x\\)"] },
        ],
        caption:
          "\\(x = a\\) stands up and \\(y = b\\) lies flat: each line is parallel to the axis of the letter that is missing from its equation.",
      },
      selfCheckExample: {
        prompt: "The graph of \\(y = 4\\) is parallel to which axis?",
        steps: ["Only \\(y\\) appears, so the line is horizontal.", "A horizontal line is parallel to the x-axis."],
        answer: "The x-axis.",
      },
      practiceSet: [
        { prompt: "What is the graph of \\(x = 0\\)?", answer: "The y-axis." },
        { prompt: "Is the graph of \\(3x - y = 2\\) vertical, horizontal or slanting?", answer: "Slanting." },
        { prompt: "At what point does the line \\(x = 6\\) cross the x-axis?", answer: "\\((6, 0)\\)" },
      ],
      pyqExampleId: "abfda0ab-2705-402f-bd41-25806a455f9e",
      traps: [
        {
          title: "Getting the axis backwards",
          body:
            "\\(x = 4\\) is parallel to the y-axis, not the x-axis. It is every point whose x is 4, and those points stand in an upright line.",
        },
        {
          title: "Thinking a one-letter equation is not linear",
          body:
            "\\(y = 3\\) is a linear equation in two variables, \\(0x + 1y = 3\\), and its graph is a straight line.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spilecn-cases",
      name: "The three cases of a pair of lines",
      intuition:
        "Two straight lines can meet once, never meet, or be the same line. Compare the three ratios of their coefficients and you know which, without drawing a graph.",
      definition:
        "For \\(a_1x + b_1y = c_1\\) and \\(a_2x + b_2y = c_2\\):\n" +
        "- **Consistent** means at least one solution: intersecting or coincident lines.\n" +
        "- **Inconsistent** means no solution: parallel lines.\n" +
        "- Before comparing, write both equations the same way, with the constant on the same side, and clear any fractions.",
      table: {
        columns: ["Ratios", "Lines", "Solutions", "Pair is"],
        rows: [
          { cells: ["\\(\\frac{a_1}{a_2} \\ne \\frac{b_1}{b_2}\\)", "Intersecting", "Exactly one", "Consistent"] },
          {
            cells: ["\\(\\frac{a_1}{a_2} = \\frac{b_1}{b_2} = \\frac{c_1}{c_2}\\)", "Coincident (the same line)", "Infinitely many", "Consistent (dependent)"],
          },
          {
            cells: ["\\(\\frac{a_1}{a_2} = \\frac{b_1}{b_2} \\ne \\frac{c_1}{c_2}\\)", "Parallel", "None", "Inconsistent"],
            noteAmber: "Two vertical lines such as \\(x = 1\\) and \\(x = 4\\) are parallel too, so a pair like that has no solution.",
          },
        ],
        caption: "Compare the a and b ratios first. Only when they are equal does the c ratio decide.",
      },
      selfCheckExample: {
        prompt: "Do the lines \\(2x + 3y = 6\\) and \\(4x + 6y = 12\\) intersect, run parallel or coincide?",
        steps: [
          "\\(\\frac{2}{4} = \\frac{1}{2}\\), \\(\\frac{3}{6} = \\frac{1}{2}\\), \\(\\frac{6}{12} = \\frac{1}{2}\\).",
          "All three ratios are equal.",
        ],
        answer: "They coincide, so there are infinitely many solutions.",
      },
      practiceSet: [
        { prompt: "How many solutions does the pair \\(x + 2y = 4\\) and \\(3x - y = 5\\) have?", answer: "Exactly one (\\(\\frac{1}{3} \\ne \\frac{2}{-1}\\))" },
        { prompt: "How many solutions does the pair \\(5x - y = 2\\) and \\(10x - 2y = 9\\) have?", answer: "None (the lines are parallel)" },
        { prompt: "Is a pair of parallel lines consistent or inconsistent?", answer: "Inconsistent" },
        { prompt: "How many solutions does the pair \\(y = 2\\) and \\(y = 7\\) have?", answer: "None" },
      ],
      pyqExampleId: "68a3f197-071b-4584-9d9f-12bec98f10c1",
      traps: [
        {
          title: "Comparing before clearing fractions",
          body:
            "\\(\\frac{x}{2} + y = 3\\) and \\(x + 2y = 6\\) look different, but doubling the first gives the second: they are the same line.",
        },
        {
          title: "Calling coincident lines inconsistent",
          body:
            "Coincident lines share every point, so the pair has infinitely many solutions and is consistent. Only parallel lines are inconsistent.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spilecn-find-k",
      name: "Finding an unknown coefficient for a chosen case",
      intuition:
        "When a coefficient is unknown, take the case the question names, write its ratio condition, and solve for the unknown. For infinitely many solutions all three ratios must agree, so always check the third ratio too.",
      definition:
        "- **Unique solution:** \\(\\frac{a_1}{a_2} \\ne \\frac{b_1}{b_2}\\). Solve the equality and leave that value out: the answer is every value except that one.\n" +
        "- **Parallel (no solution):** \\(\\frac{a_1}{a_2} = \\frac{b_1}{b_2}\\), then check that this is not equal to \\(\\frac{c_1}{c_2}\\).\n" +
        "- **Infinitely many (coincident):** all three ratios equal. A squared unknown can give two values; keep only the one that makes the third ratio match.\n" +
        "- **Dependent** equations are multiples of each other: multiply one equation by any non-zero number to get the other.",
      formula: {
        label: "Conditions on the coefficients",
        latex:
          "\\text{one: } \\frac{a_1}{a_2} \\ne \\frac{b_1}{b_2} \\qquad \\text{none: } \\frac{a_1}{a_2} = \\frac{b_1}{b_2} \\ne \\frac{c_1}{c_2} \\qquad \\text{infinitely many: } \\frac{a_1}{a_2} = \\frac{b_1}{b_2} = \\frac{c_1}{c_2}",
      },
      authoredExample: {
        prompt: "Find \\(k\\) so that \\(kx + 4y = 8\\) and \\(3x + 6y = 12\\) have infinitely many solutions.",
        steps: [
          "All three ratios must be equal: \\(\\frac{k}{3} = \\frac{4}{6} = \\frac{8}{12}\\).",
          "\\(\\frac{4}{6} = \\frac{2}{3}\\) and \\(\\frac{8}{12} = \\frac{2}{3}\\), so the last two already agree.",
          "\\(\\frac{k}{3} = \\frac{2}{3}\\) gives \\(k = 2\\). Check: \\(2x + 4y = 8\\) is \\(\\frac{2}{3}\\) of the second equation.",
        ],
        answer: "\\(k = 2\\)",
      },
      selfCheckExample: {
        prompt: "For what values of \\(k\\) do \\(2x + ky = 5\\) and \\(4x - 6y = 1\\) have a unique solution?",
        steps: ["Need \\(\\frac{2}{4} \\ne \\frac{k}{-6}\\).", "Equality would give \\(k = -3\\), so leave that value out."],
        answer: "Every value except \\(k = -3\\).",
      },
      practiceSet: [
        { prompt: "Find \\(k\\) if the lines \\(kx + 2y = 3\\) and \\(6x + 4y = 1\\) are parallel.", answer: "\\(k = 3\\)" },
        { prompt: "Find \\(k\\) if the lines \\(3x - y = 4\\) and \\(9x + ky = 5\\) are parallel.", answer: "\\(k = -3\\)" },
        {
          prompt: "Which equation is dependent with \\(x + 3y = 4\\): \\(2x + 6y = 8\\) or \\(2x + 6y = 4\\)?",
          answer: "\\(2x + 6y = 8\\)",
        },
        {
          prompt: "Find \\(m\\) so that \\(mx + 2y = 4\\) and \\(8x + my = 8\\) have infinitely many solutions.",
          answer: "\\(m = 4\\) (\\(m = -4\\) makes the lines parallel)",
        },
      ],
      pyqExampleId: "c75fb9bd-b1d7-4c01-a3da-564240401054",
      traps: [
        {
          title: "Keeping both roots of a square",
          body:
            "A condition such as \\(p^2 = 25\\) gives \\(p = 5\\) or \\(p = -5\\). Test each in the third ratio: one of them usually gives parallel lines, not the same line.",
        },
        {
          title: "Giving the excluded value as the answer",
          body:
            "For a unique solution the answer is every value **except** the one that makes the first two ratios equal. That one value gives parallel or coincident lines.",
        },
        {
          title: "Dropping a minus sign in a coefficient",
          body:
            "In \\(3x - 5y = 7\\) the coefficient of \\(y\\) is \\(-5\\), not 5. Losing the sign gives the right size of answer with the wrong sign.",
        },
      ],
    },
  ],
};
