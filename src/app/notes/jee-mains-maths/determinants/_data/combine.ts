import type { SubtopicNote } from "@/app/notes/_types";

export const COMBINE_DET_NOTE: SubtopicNote = {
  subtopicName: "Infinitely Many Solutions: One Equation Holds the Parameters",
  title: "Infinitely Many Solutions: One Equation Holds the Parameters",
  oneLineDefinition:
    "Systems of three linear equations where two equations are fully known and the parameters sit in the third: infinitely many solutions means the third is a combination of the first two.",
  whyItMatters:
    "Eighteen PYQs, sixteen of them multiple choice, and three from 2026. Fifteen put both unknown constants in one equation and ask for them, often feeding them into a follow-up; three have a coefficient determinant that is zero for every value, so only the right-hand side decides. Two ideas cover the page.",
  concepts: [
    // C1 — third equation as a combination
    {
      kind: "formula" as const,
      slug: "jdet-combine",
      name: "The third equation as a combination",
      intuition:
        "Two independent equations in three unknowns describe a line of solutions. The system keeps all of them exactly when the third equation adds no new condition, that is, when it is \\(p\\) times the first plus \\(q\\) times the second. Match the \\(x\\) and \\(y\\) coefficients to find \\(p\\) and \\(q\\); the \\(z\\) coefficient and the right-hand side then give the two constants. This is quicker than computing four determinants.",
      definition:
        "- Infinitely many solutions: \\(E_3=pE_1+qE_2\\), including the right-hand side.\n" +
        "- Match two coefficients to find \\(p,q\\), then read off the rest.\n" +
        "- Same result as \\(\\Delta=0\\) and \\(\\Delta_x=\\Delta_y=\\Delta_z=0\\).",
      formula: {
        label: "Dependent third equation",
        latex: "E_3=pE_1+qE_2",
      },
      authoredExample: {
        prompt: "For which \\(\\lambda,\\mu\\) has \\(x+y+z=4\\), \\(x+2y+3z=7\\), \\(x+2y+\\lambda z=\\mu\\) infinitely many solutions?",
        steps: [
          "\\(x\\): \\(p+q=1\\); \\(y\\): \\(p+2q=2\\). So \\(p=0\\), \\(q=1\\): the third must equal the second.",
        ],
        answer: "\\(\\lambda=3\\), \\(\\mu=7\\).",
      },
      selfCheckExample: {
        prompt: "For which \\(\\alpha,\\beta\\) has \\(x+y+z=2\\), \\(2x-y+z=3\\), \\(4x+y+\\alpha z=\\beta\\) infinitely many solutions?",
        steps: [
          "\\(p+2q=4\\) and \\(p-q=1\\) give \\(q=1\\), \\(p=2\\).",
          "\\(z\\): \\(2+1\\); right side: \\(4+3\\).",
        ],
        answer: "\\(\\alpha=3\\), \\(\\beta=7\\).",
      },
      practiceSet: [
        { prompt: "\\(x+y+z=1\\), \\(x-y=0\\), \\(3x+y+\\lambda z=\\mu\\) infinitely many?", answer: "\\(\\lambda=2,\\ \\mu=2\\)" },
        { prompt: "If \\(E_3=2E_1-E_2\\), the right side of \\(E_3\\)?", answer: "\\(2b_1-b_2\\)" },
        { prompt: "Does \\(\\Delta=0\\) alone give infinitely many solutions?", answer: "No — the system may have none" },
        { prompt: "\\(\\Delta=0\\) and the system is consistent: how many solutions?", answer: "Infinitely many" },
      ],
      pyqExampleId: "6de83e55-8f12-4599-aed8-724563df7691", // 2026 — constants in the third equation for infinitely many solutions
      traps: [
        {
          title: "Match the right-hand side too",
          body: "Matching the coefficients alone gives \\(\\Delta=0\\), which also allows no solution. The right-hand side of the third equation must be the same combination of the other two.",
        },
      ],
    },

    // C2 — determinant zero for every value
    {
      kind: "formula" as const,
      slug: "jdet-rank-zero",
      name: "When the determinant vanishes for every value",
      intuition:
        "Sometimes the coefficients make \\(\\Delta=0\\) whatever the parameter — two columns equal, or one row a fixed combination of the others. Then a unique solution is impossible, and the system has infinitely many solutions or none, decided by the right-hand sides alone.",
      definition:
        "- \\(\\Delta\\equiv0\\): never a unique solution.\n" +
        "- Infinitely many exactly when the right-hand sides obey the same relation as the rows.\n" +
        "- Otherwise no solution.",
      formula: {
        label: "Dependent rows",
        latex: "R_3=pR_1+qR_2\\ \\Rightarrow\\ \\text{consistent exactly when } b_3=pb_1+qb_2",
      },
      authoredExample: {
        prompt: "For which \\(k\\) does \\(x+y+z=1\\), \\(x+2y+z=2\\), \\(2x+3y+2z=k\\) have a solution?",
        steps: [
          "The third row of coefficients is the sum of the first two, so \\(\\Delta=0\\).",
          "The right sides must match: \\(k=1+2\\).",
        ],
        answer: "\\(k=3\\) (then infinitely many); none otherwise.",
      },
      selfCheckExample: {
        prompt: "For which \\(k\\) is \\(x+2y+3z=1\\), \\(2x+4y+6z=k\\), \\(x+y+z=0\\) consistent?",
        steps: [
          "The second row is twice the first.",
        ],
        answer: "\\(k=2\\).",
      },
      practiceSet: [
        { prompt: "Two equal columns: \\(\\Delta\\)?", answer: "\\(0\\)" },
        { prompt: "\\(\\Delta\\equiv0\\): can the solution be unique?", answer: "No" },
        { prompt: "\\(x+y=1\\), \\(2x+2y=c\\) has solutions for?", answer: "\\(c=2\\)" },
        { prompt: "Rows dependent, right sides not: solutions?", answer: "None" },
      ],
      pyqExampleId: "404b0810-9087-426f-892d-08fd8c5c2d61", // 2025 — a system whose determinant vanishes for every parameter
      traps: [
        {
          title: "Look for dependence before expanding",
          body: "Expanding a determinant with a parameter and finding it identically 0 wastes time. Check first whether a row is a sum or multiple of others.",
        },
      ],
    },
  ],
};
