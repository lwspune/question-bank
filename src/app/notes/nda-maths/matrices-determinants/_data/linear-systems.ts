import type { SubtopicNote } from "@/app/notes/_types";

export const LINEAR_SYSTEMS_NOTE: SubtopicNote = {
  subtopicName: "Linear Systems — Consistency, Cramer's Rule, Solution Space",
  title: "Linear Systems: Consistency & Cramer's Rule",
  oneLineDefinition:
    "A square linear system AX = B is solved and classified by one number — the coefficient determinant: nonzero gives a unique Cramer's-rule solution, zero gives either no solution or infinitely many.",
  whyItMatters:
    "Eight PYQs — small but a reliable scorer and the payoff of the whole chapter: determinants and " +
    "inverses applied to solving equations. Questions test consistency from the coefficient " +
    "determinant, Cramer's rule, homogeneous systems, and finding the parameter k that makes a system " +
    "consistent or not. Four concepts cover it.",
  concepts: [
    // C1 — consistency
    {
      kind: "formula" as const,
      slug: "consistency-and-determinant",
      name: "Consistency from the coefficient determinant",
      intuition:
        "For a square system \\(AX = B\\), the coefficient determinant \\(|A|\\) tells you everything " +
        "about the solution count BEFORE you solve: \\(|A| \\neq 0\\) means exactly one solution; " +
        "\\(|A| = 0\\) means either no solution or infinitely many.",
      definition:
        "For \\(AX = B\\) (square): if \\(|A| \\neq 0\\) → **unique** solution. If \\(|A| = 0\\): the " +
        "system is **inconsistent** (no solution) or has **infinitely many** solutions, decided by " +
        "whether the equations are genuinely contradictory or just dependent (e.g. two equations the " +
        "same scaling but different constants → no solution).",
      authoredExample: {
        prompt: "Classify the system \\(x+y+z=6,\\ x-y+z=2,\\ 2x+y-z=1\\).",
        steps: [
          "Form the coefficient determinant \\(|A| = \\begin{vmatrix}1&1&1\\\\1&-1&1\\\\2&1&-1\\end{vmatrix}\\).",
          "Expand along row 1: \\(1(1-1) - 1(-1-2) + 1(1+2) = 0 + 3 + 3 = 6\\).",
          "\\(|A| = 6 \\neq 0\\), so the coefficient matrix is non-singular.",
        ],
        answer: "Unique solution — consistent and independent (\\(|A| = 6 \\neq 0\\)).",
      },
      selfCheckExample: {
        prompt: "The equations \\(2x - 3y - 5 = 0\\) and \\(10x - 15y + 50 = 0\\): how many solutions?",
        steps: [
          "Second is \\(5\\times(2x - 3y) = -50\\), i.e. \\(2x - 3y = -10\\).",
          "First says \\(2x - 3y = 5\\). Same left side, different constants.",
          "Contradiction → no solution (the lines are parallel).",
        ],
        answer: "No solution (parallel, inconsistent).",
      },
      practiceSet: [
        { prompt: "\\(|A| \\neq 0\\) ⇒ how many solutions?", answer: "Exactly one" },
        { prompt: "\\(|A| = 0\\) ⇒?", answer: "No solution OR infinitely many" },
        { prompt: "Two equations, same LHS, different RHS ⇒?", answer: "No solution" },
        { prompt: "Unique solution requires the coefficient matrix to be?", answer: "Non-singular (\\(|A|\\neq0\\))" },
      ],
      pyqExampleId: "04473168-1f59-494a-b8f8-5d42cc633f16", // 2023 — inconsistent system
    },

    // C2 — Cramer's rule
    {
      kind: "formula" as const,
      slug: "cramers-rule",
      name: "Cramer's rule",
      intuition:
        "When \\(|A| \\neq 0\\), each unknown is a ratio of determinants: replace the column of " +
        "coefficients for that variable with the constants column, take the determinant, and divide by " +
        "\\(|A|\\).",
      definition:
        "For \\(AX = B\\) with \\(|A| = \\Delta \\neq 0\\): \\(x = \\Delta_x/\\Delta\\), " +
        "\\(y = \\Delta_y/\\Delta\\), \\(z = \\Delta_z/\\Delta\\), where \\(\\Delta_x\\) is \\(\\Delta\\) " +
        "with the \\(x\\)-column replaced by \\(B\\) (and similarly for \\(\\Delta_y, \\Delta_z\\)).",
      formula: {
        label: "Cramer's rule",
        latex: "x = \\frac{\\Delta_x}{\\Delta}, \\quad y = \\frac{\\Delta_y}{\\Delta}, \\quad z = \\frac{\\Delta_z}{\\Delta}",
      },
      authoredExample: {
        prompt: "Solve \\(x + y = 3,\\ x - y = 1\\) by Cramer's rule.",
        steps: [
          "\\(\\Delta = \\begin{vmatrix}1&1\\\\1&-1\\end{vmatrix} = -2\\).",
          "\\(\\Delta_x = \\begin{vmatrix}3&1\\\\1&-1\\end{vmatrix} = -4\\); \\(\\Delta_y = \\begin{vmatrix}1&3\\\\1&1\\end{vmatrix} = -2\\).",
          "\\(x = \\tfrac{-4}{-2} = 2,\\ y = \\tfrac{-2}{-2} = 1\\).",
        ],
        answer: "\\(x = 2,\\ y = 1\\).",
      },
      practiceSet: [
        { prompt: "In Cramer's rule, \\(x = ?\\)", answer: "\\(\\Delta_x/\\Delta\\)" },
        { prompt: "How is \\(\\Delta_x\\) formed?", answer: "Replace the x-column of \\(\\Delta\\) with the constants" },
        { prompt: "Cramer's rule requires \\(\\Delta\\) to be?", answer: "Non-zero" },
        { prompt: "If \\(\\Delta = 0\\), Cramer's rule?", answer: "Fails (use consistency analysis instead)" },
      ],
      pyqExampleId: "82db3496-dd60-45b1-8906-07068f7734b8", // 2025 — Cramer's rule
    },

    // C3 — homogeneous & solution space
    {
      kind: "formula" as const,
      slug: "homogeneous-and-solution-space",
      name: "Homogeneous systems and the solution space",
      intuition:
        "A homogeneous system \\(AX = 0\\) always has the trivial solution \\(X = 0\\). It has extra " +
        "(non-trivial) solutions exactly when \\(|A| = 0\\). And if a non-homogeneous system has two " +
        "distinct solutions, it must have infinitely many.",
      definition:
        "\\(AX = 0\\) has a **non-trivial** solution iff \\(|A| = 0\\) (otherwise only \\(X = 0\\)). For " +
        "\\(AX = B\\): if \\(X_1 \\neq X_2\\) are both solutions, then \\(X_1 + t(X_2 - X_1)\\) is a " +
        "solution for every \\(t\\) → **infinitely many** (the solution set is never exactly two).",
      authoredExample: {
        prompt: "If \\(AX = B\\) has two distinct solutions \\(X_1\\) and \\(X_2\\), how many solutions does it have?",
        steps: [
          "\\(X_1\\) and \\(X_2\\) solve it, so \\(A(X_1 - X_2) = 0\\) — a non-trivial solution of the homogeneous system.",
          "Then \\(X_1 + t(X_2 - X_1)\\) solves \\(AX = B\\) for every scalar \\(t\\).",
          "That's an infinite family.",
        ],
        answer: "Infinitely many solutions.",
      },
      practiceSet: [
        { prompt: "\\(AX = 0\\) always has which solution?", answer: "The trivial one, \\(X = 0\\)" },
        { prompt: "Non-trivial solution of \\(AX=0\\) exists iff?", answer: "\\(|A| = 0\\)" },
        { prompt: "\\(AX = B\\) with 2 distinct solutions ⇒?", answer: "Infinitely many" },
        { prompt: "Can a linear system have exactly 2 solutions?", answer: "No" },
      ],
      pyqExampleId: "caf4ce77-047f-48d2-9484-d301d6f48988", // 2023 — two distinct solutions
    },

    // C4 — parameter for consistency
    {
      kind: "formula" as const,
      slug: "parameter-for-consistency",
      name: "Finding the parameter for consistency",
      intuition:
        "When a coefficient (or constant) contains a parameter \\(k\\), the borderline cases live where " +
        "\\(|A| = 0\\). Set the coefficient determinant to 0 to find the candidate \\(k\\) values, then " +
        "check each to see if it gives no solution or infinitely many.",
      definition:
        "Put the parameter into \\(|A|\\) and solve \\(|A| = 0\\) for the critical \\(k\\). For each such " +
        "\\(k\\), substitute back: dependent-and-consistent → infinitely many; contradictory → no " +
        "solution. Away from those \\(k\\), the solution is unique.",
      authoredExample: {
        prompt: "For what \\(k\\) does \\(kx + y + z = 1,\\ x + ky + z = k,\\ x + y + kz = k^2\\) have no solution?",
        steps: [
          "Coefficient determinant \\(= (k-1)^2(k+2)\\) (standard symmetric system).",
          "It is 0 at \\(k = 1\\) and \\(k = -2\\).",
          "At \\(k = 1\\) all three equations coincide → infinitely many. At \\(k = -2\\) they're contradictory → no solution.",
        ],
        answer: "\\(k = -2\\) (at \\(k = 1\\) there are infinitely many instead).",
      },
      practiceSet: [
        { prompt: "Critical parameter values come from solving?", answer: "\\(|A| = 0\\)" },
        { prompt: "At a critical \\(k\\), the system is?", answer: "No solution or infinitely many (check each)" },
        { prompt: "Away from critical \\(k\\) values, solutions are?", answer: "Unique" },
        { prompt: "Distinguishing no-solution from infinitely-many needs?", answer: "Back-substitution at that \\(k\\)" },
      ],
      pyqExampleId: "87967701-a5bf-43ab-a13a-abf6a51b4f2e", // 2017 — no solution if k
    },
  ],
};
