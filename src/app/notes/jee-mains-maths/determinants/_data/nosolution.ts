import type { SubtopicNote } from "@/app/notes/_types";

export const NOSOLUTION_DET_NOTE: SubtopicNote = {
  subtopicName: "No Solution and Inconsistent Systems",
  title: "No Solution and Inconsistent Systems",
  oneLineDefinition:
    "Systems that have no solution: the coefficient determinant is zero but the right-hand sides do not fit, and the values of a parameter for which that happens.",
  whyItMatters:
    "Seventeen PYQs, sixteen of them multiple choice, and two from 2026. Nine ask for the value of a constant that leaves the system with no solution; eight count or collect such values, for an angle in an interval or a set of numbers. Two ideas cover the page.",
  concepts: [
    // C1 — the value for no solution
    {
      kind: "formula" as const,
      slug: "jdet-nosol-find",
      name: "The value that gives no solution",
      intuition:
        "No solution needs \\(\\Delta=0\\), so find the parameter values that make it zero. Then check each: if some Cramer determinant is non-zero, or elimination ends in \\(0=c\\) with \\(c\\neq0\\), the system has no solution. A value where everything vanishes gives infinitely many instead.",
      definition:
        "- No solution: \\(\\Delta=0\\) and at least one of \\(\\Delta_x,\\Delta_y,\\Delta_z\\neq0\\).\n" +
        "- Equivalently, elimination gives \\(0=c\\), \\(c\\neq0\\).\n" +
        "- Two equations in two unknowns: parallel lines, \\(\\frac{a_1}{a_2}=\\frac{b_1}{b_2}\\neq\\frac{c_1}{c_2}\\).",
      formula: {
        label: "Inconsistency",
        latex: "\\Delta=0,\\quad(\\Delta_x,\\Delta_y,\\Delta_z)\\neq(0,0,0)",
      },
      authoredExample: {
        prompt: "For which \\(\\lambda\\) has \\(x+y+z=1\\), \\(x+2y+3z=3\\), \\(x+3y+\\lambda z=4\\) no solution?",
        steps: [
          "\\(y+2z=2\\) and \\(2y+(\\lambda-1)z=3\\), so \\((\\lambda-5)z=-1\\).",
        ],
        answer: "\\(\\lambda=5\\).",
      },
      selfCheckExample: {
        prompt: "For which \\(k\\) has \\(2x+y=3\\), \\(4x+ky=5\\) no solution?",
        steps: [
          "Parallel lines need \\(\\frac24=\\frac1k\\), and then \\(\\frac35\\neq\\frac24\\).",
        ],
        answer: "\\(k=2\\).",
      },
      practiceSet: [
        { prompt: "\\(x+y=1\\), \\(x+y=2\\)?", answer: "No solution" },
        { prompt: "\\(\\Delta=0\\), all \\(\\Delta_i=0\\), rank 2?", answer: "Infinitely many" },
        { prompt: "\\(kx+y=1\\), \\(x+ky=1\\) no solution for?", answer: "\\(k=-1\\)" },
        { prompt: "\\(\\Delta\\neq0\\): can there be no solution?", answer: "No" },
      ],
      pyqExampleId: "8d51f092-1bb6-4891-aec0-f2419131aff0", // 2026 — the value of a constant for which a system has no solution
      traps: [
        {
          title: "A root of the determinant may give infinitely many",
          body: "Each value with \\(\\Delta=0\\) must be tested. In \\(kx+y=1,\\ x+ky=1\\), \\(k=1\\) gives the same line twice, and only \\(k=-1\\) gives no solution.",
        },
      ],
    },

    // C2 — counting such values
    {
      kind: "formula" as const,
      slug: "jdet-nosol-count",
      name: "Counting the values",
      intuition:
        "When the parameter is an angle or ranges over a set, solve \\(\\Delta=0\\) as an equation in it, list every solution in the given range, and keep those where the system is inconsistent. The count is the number of values kept.",
      definition:
        "- Solve \\(\\Delta(\\theta)=0\\) in the interval; list every solution.\n" +
        "- Keep only those that are inconsistent.\n" +
        "- Check both ends of a closed interval.",
      formula: {
        label: "Count what survives",
        latex: "\\#\\{\\theta:\\Delta(\\theta)=0,\\ \\text{inconsistent}\\}",
      },
      authoredExample: {
        prompt: "For how many \\(\\theta\\in[0,2\\pi]\\) has \\(x+y=1\\), \\(x+(\\cos\\theta)y=2\\) no solution?",
        steps: [
          "\\(\\Delta=\\cos\\theta-1=0\\) at \\(\\theta=0,2\\pi\\); then the lines are \\(x+y=1\\) and \\(x+y=2\\).",
        ],
        answer: "\\(2\\).",
      },
      selfCheckExample: {
        prompt: "Find the set of \\(k\\) for which \\(kx+y=1\\), \\(x+ky=1\\) has no solution.",
        steps: [
          "\\(k^2-1=0\\): \\(k=1\\) gives one line twice; \\(k=-1\\) gives \\(-x+y=1\\) and \\(x-y=1\\).",
        ],
        answer: "\\(\\{-1\\}\\).",
      },
      practiceSet: [
        { prompt: "Solutions of \\(\\sin\\theta=0\\) in \\([0,2\\pi]\\)?", answer: "\\(3\\)" },
        { prompt: "Solutions of \\(\\cos2\\theta=1\\) in \\((0,\\pi)\\)?", answer: "\\(0\\)" },
        { prompt: "\\(\\Delta=(k-1)(k-2)\\): candidates?", answer: "\\(k=1,2\\)" },
        { prompt: "A candidate with all \\(\\Delta_i=0\\): counted?", answer: "No" },
      ],
      pyqExampleId: "69a0a31d-b365-4481-bcdd-b145f856222d", // 2023 — the set of values for which a system has no solution
      traps: [
        {
          title: "Candidates are not answers",
          body: "Every root of \\(\\Delta\\) is only a candidate. Discard those that give infinitely many solutions before counting.",
        },
      ],
    },
  ],
};
