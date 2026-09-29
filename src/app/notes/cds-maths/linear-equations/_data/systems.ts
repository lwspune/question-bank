import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_LE_SYSTEMS_NOTE: SubtopicNote = {
  subtopicName: "Solving Linear Systems",
  title: "Solving Two Equations",
  oneLineDefinition:
    "Two linear equations in two unknowns meet in one point, in no point, or in every point, and the ratios of their coefficients tell you which.",
  whyItMatters:
    "Ten PYQs, one of them HARD. Six ask for the solution — usually by adding and subtracting the equations, or by putting u = 1/x when each term is divided by xy. Four ask only whether a solution exists, which the coefficient ratios settle without solving.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdsle-solve",
      name: "Elimination and substitution",
      intuition:
        "Add or subtract the equations so one unknown cancels. When the coefficients are swapped (\\(65x - 33y\\) and \\(33x - 65y\\)), adding and subtracting give \\(x + y\\) and \\(x - y\\) at once.",
      definition:
        "- Eliminate: scale one equation so a variable's coefficients match, then subtract.\n" +
        "- Swapped coefficients: add the equations and subtract them.\n" +
        "- Terms like \\(7xy\\) on one side: divide by \\(xy\\) and put \\(u = \\dfrac1x\\), \\(v = \\dfrac1y\\).\n" +
        "- A combination asked for (\\(2n + 4e\\)) can come from a multiple of each equation without finding every unknown.",
      formula: {
        label: "Swapped coefficients",
        latex: "ax + by = c,\\; bx + ay = d \\;\\Rightarrow\\; x + y = \\dfrac{c + d}{a + b}",
      },
      authoredExample: {
        prompt: "Solve \\(47x + 31y = 125\\) and \\(31x + 47y = 109\\).",
        steps: ["Adding: \\(78(x + y) = 234\\), so \\(x + y = 3\\).", "Subtracting: \\(16(x - y) = 16\\), so \\(x - y = 1\\)."],
        answer: "\\(x = 2\\), \\(y = 1\\).",
      },
      selfCheckExample: {
        prompt: "Solve \\(2x + 3y = 5xy\\) and \\(4x + 3y = 7xy\\) for non-zero \\(x, y\\).",
        steps: ["Divide by \\(xy\\): \\(3u + 2v = 5\\) and \\(3u + 4v = 7\\), with \\(u = \\tfrac1x\\), \\(v = \\tfrac1y\\).", "\\(v = 1\\), \\(u = 1\\)."],
        answer: "\\(x = 1\\), \\(y = 1\\).",
      },
      practiceSet: [
        { prompt: "\\(x + y = 7\\), \\(x - y = 3\\). \\(xy\\)?", answer: "\\(10\\)" },
        { prompt: "\\(3x + 2y = 12\\), \\(x = 2\\). \\(y\\)?", answer: "\\(3\\)" },
        { prompt: "\\(\\tfrac1x + \\tfrac1y = 5\\), \\(\\tfrac1x - \\tfrac1y = 1\\). \\(x\\)?", answer: "\\(\\tfrac13\\)" },
        { prompt: "\\(5x + 4y = 14\\), \\(4x + 5y = 13\\). \\(x + y\\)?", answer: "\\(3\\)" },
      ],
      pyqExampleId: "a06009a7-a098-4804-b235-8592c24d9072", // 2018 (I) — 65x − 33y = 97, 33x − 65y = 1
      traps: [
        {
          title: "Dividing by xy drops x = y = 0",
          body:
            "Putting \\(u = \\tfrac1x\\) assumes \\(x, y \\ne 0\\). \\(x = y = 0\\) also satisfies equations like \\(3(2u + v) = 7uv\\); the options usually exclude it, but check.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsle-consistency",
      name: "One solution, none, or infinitely many",
      intuition:
        "Two lines either cross, run parallel, or lie on top of each other. Parallel means the \\(x\\) and \\(y\\) coefficients are in the same ratio; on top means the constants are in that ratio too.",
      definition:
        "For \\(a_1x + b_1y = c_1\\) and \\(a_2x + b_2y = c_2\\):\n" +
        "- \\(\\dfrac{a_1}{a_2} \\ne \\dfrac{b_1}{b_2}\\): exactly one solution.\n" +
        "- \\(\\dfrac{a_1}{a_2} = \\dfrac{b_1}{b_2} \\ne \\dfrac{c_1}{c_2}\\): no solution (inconsistent).\n" +
        "- \\(\\dfrac{a_1}{a_2} = \\dfrac{b_1}{b_2} = \\dfrac{c_1}{c_2}\\): infinitely many.\n" +
        "- Equivalently, one solution exactly when \\(a_1b_2 - a_2b_1 \\ne 0\\).",
      formula: {
        label: "Unique solution",
        latex: "a_1b_2 - a_2b_1 \\ne 0",
      },
      authoredExample: {
        prompt: "For what \\(k\\) do \\(3x + ky = 5\\) and \\(6x + 8y = 11\\) have no solution?",
        steps: ["\\(\\dfrac36 = \\dfrac k8\\) gives \\(k = 4\\).", "Then \\(\\dfrac{c_1}{c_2} = \\dfrac5{11} \\ne \\dfrac12\\)."],
        answer: "\\(k = 4\\).",
      },
      selfCheckExample: {
        prompt: "Classify \\(x + 2y = 3\\) and \\(3x + 6y = 9\\).",
        steps: ["All three ratios are \\(\\dfrac13\\)."],
        answer: "Infinitely many solutions.",
      },
      practiceSet: [
        { prompt: "\\(x + y = 2\\), \\(2x + 2y = 5\\)?", answer: "No solution" },
        { prompt: "\\(2x + 3y = 1\\), \\(3x + 2y = 1\\)?", answer: "One solution" },
        { prompt: "\\(kx + 2y = 1\\), \\(3x + y = 4\\) cross when …?", answer: "\\(k \\ne 6\\)" },
        { prompt: "\\(5x + ky = 1\\), \\(kx + 5y = 2\\) unique when …?", answer: "\\(k \\ne \\pm 5\\)" },
      ],
      pyqExampleId: "e65d740f-c552-4c77-9185-04cac4cd8069", // 2017 (I) — 2x + 4y = 6 and 4x + 8y = 8
      traps: [
        {
          title: "Both signs of k",
          body:
            "\\(49 - k^2 \\ne 0\\) rules out \\(k = 7\\) AND \\(k = -7\\). An option saying '\\(k \\ne 7\\)' is a correct consequence but not the whole condition.",
        },
      ],
    },
  ],
};
