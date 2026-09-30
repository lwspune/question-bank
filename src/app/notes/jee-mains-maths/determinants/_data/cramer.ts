import type { SubtopicNote } from "@/app/notes/_types";

export const CRAMER_DET_NOTE: SubtopicNote = {
  subtopicName: "Infinitely Many Solutions: Parameters in Two Equations",
  title: "Infinitely Many Solutions: Parameters in Two Equations",
  oneLineDefinition:
    "Systems with infinitely many solutions where the unknown constants sit in different equations: set the coefficient determinant to zero, then use a Cramer determinant, or eliminate step by step.",
  whyItMatters:
    "Eighteen PYQs, fifteen of them multiple choice. Fourteen solve Δ = 0 together with the Cramer determinant that holds only one of the constants; four are quicker by eliminating to a single equation in z. Two ideas cover the page.",
  concepts: [
    // C1 — Delta = 0 and a Cramer determinant
    {
      kind: "formula" as const,
      slug: "jdet-cramer",
      name: "The coefficient determinant and one Cramer determinant",
      intuition:
        "Infinitely many solutions needs \\(\\Delta=0\\) and \\(\\Delta_x=\\Delta_y=\\Delta_z=0\\). When one constant is a coefficient and the other a right-hand side, \\(\\Delta=0\\) gives the coefficient; then pick the Cramer determinant (the one with a column replaced by the right-hand sides) that contains the other constant, and set it to 0.",
      definition:
        "- Unique: \\(\\Delta\\neq0\\), with \\(x=\\frac{\\Delta_x}{\\Delta}\\) and so on.\n" +
        "- Infinitely many: \\(\\Delta=\\Delta_x=\\Delta_y=\\Delta_z=0\\) (three equations).\n" +
        "- Solve \\(\\Delta=0\\) first; it usually holds only the coefficient.",
      formula: {
        label: "Cramer's rule",
        latex: "x=\\frac{\\Delta_x}{\\Delta},\\quad y=\\frac{\\Delta_y}{\\Delta},\\quad z=\\frac{\\Delta_z}{\\Delta}",
      },
      authoredExample: {
        prompt: "For which \\(\\alpha,\\beta\\) has \\(x+y+z=3\\), \\(x+2y+\\alpha z=4\\), \\(x+3y+5z=\\beta\\) infinitely many solutions?",
        steps: [
          "\\(\\Delta=\\begin{vmatrix}1&1&1\\\\1&2&\\alpha\\\\1&3&5\\end{vmatrix}=6-2\\alpha=0\\), so \\(\\alpha=3\\).",
          "\\(\\Delta_z=\\begin{vmatrix}1&1&3\\\\1&2&4\\\\1&3&\\beta\\end{vmatrix}=\\beta-5=0\\).",
        ],
        answer: "\\(\\alpha=3\\), \\(\\beta=5\\).",
      },
      selfCheckExample: {
        prompt: "For which \\(a,b\\) has \\(2x+y+z=4\\), \\(x+ay+z=3\\), \\(x+y+z=b\\) infinitely many solutions?",
        steps: [
          "\\(\\Delta=a-1=0\\).",
          "With \\(a=1\\) the second and third equations have equal left sides, so \\(b=3\\).",
        ],
        answer: "\\(a=1\\), \\(b=3\\).",
      },
      practiceSet: [
        { prompt: "\\(\\Delta\\neq0\\): how many solutions?", answer: "Exactly one" },
        { prompt: "\\(\\Delta=0\\), \\(\\Delta_x\\neq0\\)?", answer: "No solution" },
        { prompt: "\\(\\begin{vmatrix}1&1\\\\1&k\\end{vmatrix}=0\\) for?", answer: "\\(k=1\\)" },
        { prompt: "Which Cramer determinant replaces the \\(z\\) column?", answer: "\\(\\Delta_z\\)" },
      ],
      pyqExampleId: "06702a6e-f486-475d-b266-6eb6b026e160", // 2025 — constants in two equations, infinitely many solutions
      traps: [
        {
          title: "Confirm consistency",
          body: "\\(\\Delta=0\\) with one vanishing Cramer determinant is the usual shortcut, but the definition asks for all of them to vanish. When two options differ only in the right-hand constant, confirm by eliminating once.",
        },
      ],
    },

    // C2 — elimination
    {
      kind: "formula" as const,
      slug: "jdet-eliminate",
      name: "Elimination instead of determinants",
      intuition:
        "Subtract equations to remove \\(x\\), then \\(y\\), until one equation in \\(z\\) remains, of the form \\(kz=c\\). There is a unique solution when \\(k\\neq0\\), infinitely many when \\(k=c=0\\), and none when \\(k=0\\neq c\\). This reads off every case at once, which suits questions that ask about several cases together.",
      definition:
        "- Reduce to \\(kz=c\\).\n" +
        "- \\(k\\neq0\\): unique; \\(k=0,\\ c=0\\): infinitely many; \\(k=0,\\ c\\neq0\\): none.",
      formula: {
        label: "The last equation decides",
        latex: "kz=c:\\quad k\\neq0\\ \\text{unique};\\ k=c=0\\ \\text{infinite};\\ k=0\\neq c\\ \\text{none}",
      },
      authoredExample: {
        prompt: "Classify \\(x+y+z=1\\), \\(x+2y+3z=2\\), \\(x+3y+az=b\\).",
        steps: [
          "Subtract the first: \\(y+2z=1\\) and \\(2y+(a-1)z=b-1\\).",
          "Subtract twice the first of these: \\((a-5)z=b-3\\).",
        ],
        answer: "Unique if \\(a\\neq5\\); infinitely many if \\(a=5,\\ b=3\\); none if \\(a=5,\\ b\\neq3\\).",
      },
      selfCheckExample: {
        prompt: "For which \\(a,b\\) has \\(x-y=1\\), \\(y-z=2\\), \\(z+ax=b\\) infinitely many solutions?",
        steps: [
          "\\(x=3+z\\), so \\(z+a(3+z)=b\\), i.e. \\((1+a)z=b-3a\\).",
        ],
        answer: "\\(a=-1\\), \\(b=-3\\).",
      },
      practiceSet: [
        { prompt: "\\(0\\cdot z=4\\)?", answer: "No solution" },
        { prompt: "\\(0\\cdot z=0\\)?", answer: "Infinitely many" },
        { prompt: "\\(3z=6\\)?", answer: "Unique" },
        { prompt: "\\((\\lambda-2)z=\\mu-1\\): infinitely many when?", answer: "\\(\\lambda=2,\\ \\mu=1\\)" },
      ],
      pyqExampleId: "14756f7b-e944-4270-b48d-61ca111ec537", // 2025 — eliminate to (1 + beta)z = 3 - alpha
      traps: [
        {
          title: "Keep the right-hand sides",
          body: "Elimination must carry the constants along. Dropping them loses the difference between infinitely many solutions and none.",
        },
      ],
    },
  ],
};
