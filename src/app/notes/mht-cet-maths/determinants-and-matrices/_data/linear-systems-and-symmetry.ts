import type { SubtopicNote } from "@/app/notes/_types";

export const LINEAR_SYSTEMS_AND_SYMMETRY_NOTE: SubtopicNote = {
  subtopicName: "Systems of Linear Equations and Symmetric, Skew-Symmetric Matrices",
  title: "Systems of Linear Equations and Symmetric, Skew-Symmetric Matrices",
  oneLineDefinition:
    "AX = B is solved by elimination or by X = A⁻¹B; a homogeneous system has non-trivial solutions exactly when |A| = 0; and any square matrix splits uniquely into a symmetric plus a skew-symmetric part.",
  whyItMatters:
    "8 PYQs at 38% HARD. The 3 × 3 system AX = B has been set every year — always with small integer solutions, so elimination beats the inverse — and the answer is usually a combination like 2a − 3b + 4c or x² + y² + z², so the solving must be complete. " +
    "The HARD ones are the classification questions: a homogeneous system with a parameter (non-trivial solutions need a vanishing determinant) and a skew-symmetric coefficient matrix, which is singular whenever its order is odd.",
  concepts: [
    // 1 — solve AX = B
    {
      kind: "formula" as const,
      slug: "cetdm-solve-ax-equals-b",
      name: "Solving AX = B: Elimination, or X = A⁻¹B",
      intuition:
        "\\(AX = B\\) is three linear equations written compactly. With small integer coefficients, subtracting equations is faster than building \\(A^{-1}\\); the matrix form is there to make the question look harder than it is.",
      definition:
        "- Read the rows of \\(A\\) as equations: \\(A = \\begin{pmatrix} 1 & 1 & 1 \\\\ 0 & 1 & 3 \\\\ 1 & -2 & 1 \\end{pmatrix}\\), \\(B = \\begin{pmatrix} 6 \\\\ 11 \\\\ 0 \\end{pmatrix}\\) is \\(a + b + c = 6\\), \\(b + 3c = 11\\), \\(a - 2b + c = 0\\).\n" +
        "- **Eliminate**: subtract rows to isolate one unknown, back-substitute. Here \\(R_1 - R_3\\): \\(3b = 6\\), \\(b = 2\\); then \\(c = 3\\), \\(a = 1\\).\n" +
        "- **Matrix method** when \\(|A| \\ne 0\\): \\(X = A^{-1}B\\) — correct but slow by hand for \\(3 \\times 3\\); use it only when \\(A^{-1}\\) is given.\n" +
        "- Answer the **combination** asked (\\(2a + b + 2c = 10\\), \\(x^2 + y^2 + z^2 = 14\\)); the solution triple itself is rarely an option.\n" +
        "- A unique solution exists iff \\(|A| \\ne 0\\). If \\(|A| = 0\\), the system has either no solution or infinitely many.",
      formula: {
        label: "Linear system in matrix form",
        latex:
          "AX = B,\\quad |A| \\ne 0 \\ \\Rightarrow\\ X = A^{-1}B \\ \\text{(unique)}",
      },
      authoredExample: {
        prompt: "Solve \\(\\begin{pmatrix} 1 & 1 & 1 \\\\ 1 & 2 & 3 \\\\ 1 & 4 & 9 \\end{pmatrix}\\begin{pmatrix} x \\\\ y \\\\ z \\end{pmatrix} = \\begin{pmatrix} 3 \\\\ 6 \\\\ 14 \\end{pmatrix}\\) and find \\(x + 2y + 3z\\).",
        steps: [
          "Equations: \\(x + y + z = 3\\), \\(x + 2y + 3z = 6\\), \\(x + 4y + 9z = 14\\).",
          "\\(R_2 - R_1\\): \\(y + 2z = 3\\). \\(R_3 - R_2\\): \\(2y + 6z = 8\\), i.e. \\(y + 3z = 4\\). Subtract: \\(z = 1\\), \\(y = 1\\), \\(x = 1\\).",
          "\\(x + 2y + 3z = 6\\).",
        ],
        answer: "\\(6\\)",
      },
      selfCheckExample: {
        prompt: "Solve \\(x + y + z = 6\\), \\(x - y + z = 2\\), \\(2x + y - z = 1\\) and find \\(xyz\\).",
        steps: [
          "\\(R_1 - R_2\\): \\(2y = 4\\), \\(y = 2\\). Then \\(x + z = 4\\) and \\(2x - z = -1\\); add: \\(3x = 3\\), \\(x = 1\\), \\(z = 3\\).",
          "\\(xyz = 6\\).",
        ],
        answer: "\\(6\\)",
      },
      practiceSet: [
        {
          prompt: "Solve \\(x + y = 5\\), \\(x - y = 1\\).",
          answer: "\\(x = 3,\\ y = 2\\)",
        },
        {
          prompt: "If \\(a = 1, b = 2, c = 3\\), then \\(2a + b + 2c = ?\\)",
          answer: "\\(10\\)",
        },
        {
          prompt: "When is \\(X = A^{-1}B\\) valid?",
          answer: "When \\(|A| \\ne 0\\).",
        },
        {
          prompt: "Rows of \\(A\\) in \\(AX = B\\) correspond to?",
          answer: "The individual equations.",
        },
      ],
      pyqExampleId: "2600e0f2-b730-43fc-8598-1ad29977e679",
      traps: [
        {
          title: "Trusting a solution without checking every equation",
          body:
            "One sitting's stored key gave \\((2, 1, 1)\\) for a system whose first equation that triple fails. Substitute the solution into ALL three equations before choosing — it takes ten seconds and catches both your slips and the paper's.",
        },
      ],
    },

    // 2 — homogeneous systems
    {
      kind: "formula" as const,
      slug: "cetdm-homogeneous-system-non-trivial-solution",
      name: "Homogeneous Systems: Non-Trivial Solutions Need |A| = 0",
      intuition:
        "\\(AX = O\\) always has the trivial solution \\(X = O\\). If \\(|A| \\ne 0\\) that is the only one; if \\(|A| = 0\\) there are infinitely many. So 'find \\(\\lambda\\) so that \\(x, y, z\\) are not all zero' means 'set the determinant to zero'.",
      definition:
        "- \\(AX = O\\): unique (trivial) solution iff \\(|A| \\ne 0\\); infinitely many (non-trivial) iff \\(|A| = 0\\). A homogeneous system is never inconsistent.\n" +
        "- A **vector equation** \\(\\overline{a} + \\overline{b} - \\overline{c} = \\overline{0}\\) with \\(\\overline{a}, \\overline{b}, \\overline{c}\\) linear in \\(x, y, z\\) is three homogeneous equations in \\(x, y, z\\): collect the \\(\\hat{i}, \\hat{j}, \\hat{k}\\) components as rows, then set the \\(3 \\times 3\\) determinant to \\(0\\) and solve for the parameter.\n" +
        "- For the rows \\((\\lambda, 1, 1)\\), \\((1, 1, 2)\\), \\((\\lambda + 1, 3, 4)\\): the determinant is \\(-\\lambda\\), so \\(\\lambda = 0\\).\n" +
        "- Non-homogeneous \\(AX = B\\) with \\(|A| = 0\\) needs the extra test (consistency): either no solution or infinitely many.",
      formula: {
        label: "Homogeneous system",
        latex:
          "AX = O \\text{ has a non-trivial solution} \\iff |A| = 0",
      },
      authoredExample: {
        prompt: "Find \\(k\\) if \\(x + 2y + z = 0\\), \\(2x + y + kz = 0\\), \\(x - y + 2z = 0\\) has a non-trivial solution.",
        steps: [
          "Set \\(\\begin{vmatrix} 1 & 2 & 1 \\\\ 2 & 1 & k \\\\ 1 & -1 & 2 \\end{vmatrix} = 0\\).",
          "Expand: \\(1(2 + k) - 2(4 - k) + 1(-2 - 1) = 2 + k - 8 + 2k - 3 = 3k - 9\\).",
          "\\(3k - 9 = 0 \\Rightarrow k = 3\\).",
        ],
        answer: "\\(k = 3\\)",
      },
      selfCheckExample: {
        prompt: "For which \\(\\mu\\) does \\(\\mu x + y = 0\\), \\(x + \\mu y = 0\\) have a solution other than \\(x = y = 0\\)?",
        steps: [
          "\\(\\begin{vmatrix} \\mu & 1 \\\\ 1 & \\mu \\end{vmatrix} = \\mu^2 - 1 = 0\\).",
        ],
        answer: "\\(\\mu = \\pm1\\)",
      },
      practiceSet: [
        {
          prompt: "Does \\(AX = O\\) always have a solution?",
          answer: "Yes — the trivial one, \\(X = O\\).",
        },
        {
          prompt: "Condition for a non-trivial solution of \\(AX = O\\)?",
          answer: "\\(|A| = 0\\).",
        },
        {
          prompt: "If \\(|A| \\ne 0\\), how many solutions does \\(AX = O\\) have?",
          answer: "Exactly one.",
        },
        {
          prompt: "Rows of the coefficient matrix from \\(\\overline{a} + \\overline{b} - \\overline{c} = \\overline{0}\\) come from?",
          answer: "The \\(\\hat{i}, \\hat{j}, \\hat{k}\\) components.",
        },
      ],
      pyqExampleId: "25b8d6e9-fab2-4985-84cd-99a1b68404f5",
      traps: [
        {
          title: "Reading |A| = 0 as 'no solution'",
          body:
            "For a homogeneous system a zero determinant means infinitely many solutions, never none — \\(X = O\\) always works. 'No solution' is only possible for \\(AX = B\\) with \\(B \\ne O\\).",
        },
      ],
    },

    // 3 — symmetric / skew-symmetric
    {
      kind: "formula" as const,
      slug: "cetdm-symmetric-and-skew-symmetric-decomposition",
      name: "Symmetric + Skew-Symmetric: The Unique Split, and Why Odd-Order Skew Is Singular",
      intuition:
        "Any square matrix \\(M\\) is half of \\(M + M^T\\) (symmetric) plus half of \\(M - M^T\\) (skew-symmetric). A skew-symmetric matrix has zeros on its diagonal and, in odd order, determinant \\(0\\) — so any system it governs has infinitely many solutions.",
      definition:
        "- \\(M = \\underbrace{\\dfrac{M + M^T}{2}}_{\\text{symmetric}} + \\underbrace{\\dfrac{M - M^T}{2}}_{\\text{skew-symmetric}}\\), uniquely. For \\(M = \\begin{pmatrix} 1 & t \\\\ -t & 1 \\end{pmatrix}\\): symmetric part \\(I\\), skew part \\(\\begin{pmatrix} 0 & t \\\\ -t & 0 \\end{pmatrix}\\).\n" +
        "- Skew-symmetric \\(B\\): \\(B^T = -B\\), diagonal entries \\(0\\). For odd \\(n\\), \\(|B| = |B^T| = |-B| = (-1)^n|B| = -|B|\\), so \\(|B| = 0\\).\n" +
        "- Products: if \\(A\\) is symmetric and \\(B\\) skew-symmetric, then \\(A^2\\) and \\(B^2\\) are both symmetric, and \\(A^2B^2 - B^2A^2\\) is skew-symmetric — so for \\(3 \\times 3\\) it is singular and \\((A^2B^2 - B^2A^2)X = O\\) has infinitely many solutions.\n" +
        "- Inverse of the \\(2 \\times 2\\) skew part: \\(\\begin{pmatrix} 0 & t \\\\ -t & 0 \\end{pmatrix}^{-1} = \\begin{pmatrix} 0 & -1/t \\\\ 1/t & 0 \\end{pmatrix}\\); so \\(B + B^{-1} = \\begin{pmatrix} 0 & t - 1/t \\\\ -(t - 1/t) & 0 \\end{pmatrix}\\), and with \\(t = \\tan\\frac{\\pi}{12} = 2 - \\sqrt3\\), \\(t - \\frac1t = -2\\sqrt3\\).",
      formula: {
        label: "Symmetric and skew-symmetric parts",
        latex:
          "M = \\frac{M + M^T}{2} + \\frac{M - M^T}{2} \\qquad B^T = -B,\\ n \\text{ odd} \\ \\Rightarrow\\ |B| = 0",
      },
      authoredExample: {
        prompt: "Write \\(M = \\begin{pmatrix} 2 & 5 \\\\ 1 & 4 \\end{pmatrix}\\) as a symmetric matrix plus a skew-symmetric matrix.",
        steps: [
          "\\(M^T = \\begin{pmatrix} 2 & 1 \\\\ 5 & 4 \\end{pmatrix}\\).",
          "Symmetric part \\(\\dfrac{M + M^T}{2} = \\begin{pmatrix} 2 & 3 \\\\ 3 & 4 \\end{pmatrix}\\); skew part \\(\\dfrac{M - M^T}{2} = \\begin{pmatrix} 0 & 2 \\\\ -2 & 0 \\end{pmatrix}\\).",
        ],
        answer: "\\(\\begin{pmatrix} 2 & 3 \\\\ 3 & 4 \\end{pmatrix} + \\begin{pmatrix} 0 & 2 \\\\ -2 & 0 \\end{pmatrix}\\)",
      },
      selfCheckExample: {
        prompt: "\\(B\\) is a \\(3 \\times 3\\) skew-symmetric matrix. How many solutions does \\(BX = O\\) have?",
        steps: [
          "Odd order and \\(B^T = -B\\) give \\(|B| = -|B|\\), so \\(|B| = 0\\).",
          "A homogeneous system with a singular coefficient matrix has infinitely many solutions.",
        ],
        answer: "Infinitely many.",
      },
      practiceSet: [
        {
          prompt: "Diagonal entries of a skew-symmetric matrix?",
          answer: "All \\(0\\).",
        },
        {
          prompt: "Determinant of a \\(3 \\times 3\\) skew-symmetric matrix?",
          answer: "\\(0\\)",
        },
        {
          prompt: "Is \\(A^2\\) symmetric when \\(A\\) is symmetric?",
          answer: "Yes — \\((A^2)^T = (A^T)^2 = A^2\\).",
        },
        {
          prompt: "\\(\\tan\\dfrac{\\pi}{12} - \\cot\\dfrac{\\pi}{12} = ?\\)",
          answer: "\\(-2\\sqrt3\\)",
        },
      ],
      pyqExampleId: "1b4bb2f4-2698-46df-8497-aef9fd49268a",
      traps: [
        {
          title: "Expecting a 2 × 2 skew-symmetric matrix to be singular",
          body:
            "\\(\\begin{pmatrix} 0 & t \\\\ -t & 0 \\end{pmatrix}\\) has determinant \\(t^2 \\ne 0\\). The 'skew ⇒ singular' rule is for ODD order only; in even order the skew part is invertible whenever \\(t \\ne 0\\).",
        },
      ],
    },
  ],
  related: [
    {
      label: "Determinants, Cofactors and the Adjoint Identities — where |A| = 0 is first read as a degeneracy",
      href: "/notes/mht-cet-maths/determinants-and-matrices/cetdm-determinants-and-adjoint",
    },
    {
      label: "Inverse of a Matrix — for X = A⁻¹B when the inverse is given",
      href: "/notes/mht-cet-maths/determinants-and-matrices/cetdm-inverse",
    },
  ],
};
