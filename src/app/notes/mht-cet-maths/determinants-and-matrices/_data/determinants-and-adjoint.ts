import type { SubtopicNote } from "@/app/notes/_types";

export const DETERMINANTS_AND_ADJOINT_NOTE: SubtopicNote = {
  subtopicName: "Determinants, Cofactors and the Adjoint Identities",
  title: "Determinants, Cofactors and the Adjoint Identities",
  oneLineDefinition:
    "Cofactors build both the determinant and the adjoint — and three identities, A·adj(A) = |A|I, |adj A| = |A|ⁿ⁻¹ and |kA| = kⁿ|A|, answer most of what MHT-CET asks about them.",
  whyItMatters:
    "16 PYQs at 69% HARD — the hardest page in the chapter and, at the same time, its most learnable, because the HARD questions are recalled identities in disguise rather than long computations. " +
    "'Find α given adj A and |A|' has been set three times, 'A·adj A = AAᵀ, find a and b' four times in three sittings, and the cofactor expansion appears both as a matrix of cofactors and as a single element of the adjoint. " +
    "Learn the three identities as facts; the page then costs about a minute a question.",
  concepts: [
    // 1 — determinant and cofactors
    {
      kind: "formula" as const,
      slug: "cetdm-determinant-and-cofactor-expansion",
      name: "Determinants and Cofactors: Expansion Along a Row",
      intuition:
        "A 3 × 3 determinant is a signed sum of 2 × 2 determinants: each entry of one row times its cofactor. The cofactor is the minor with a checkerboard sign attached, and the same cofactors are the raw material of the adjoint.",
      definition:
        "- \\(\\begin{vmatrix} a & b \\\\ c & d \\end{vmatrix} = ad - bc\\). For \\(3 \\times 3\\): expand along any row or column, \\(|A| = \\sum_j a_{ij}A_{ij}\\), where \\(A_{ij} = (-1)^{i+j}M_{ij}\\) and \\(M_{ij}\\) is the minor (delete row \\(i\\), column \\(j\\)).\n" +
        "- **Sign checkerboard**: \\(\\begin{pmatrix} + & - & + \\\\ - & + & - \\\\ + & - & + \\end{pmatrix}\\).\n" +
        "- Expanding along a row with its OWN cofactors gives \\(|A|\\); with another row's cofactors (an 'alien' expansion) it gives \\(0\\). So \\(a_{21}A_{21} + a_{22}A_{22} + a_{23}A_{23} = |A|\\) — for a rotation-type matrix that is \\(\\cos^2\\theta + \\sin^2\\theta = 1\\).\n" +
        "- The **matrix of cofactors** \\([A_{ij}]\\) is computed entry by entry; the **adjoint** is its transpose, so \\((\\operatorname{adj}A)_{23} = A_{32}\\), the cofactor of the entry in row 3, column 2.\n" +
        "- A determinant with a parameter (\\(x, y, z\\) on the diagonal) expands to a polynomial; substitute the given relations at the end, not the beginning.",
      formula: {
        label: "Expansion and cofactors",
        latex:
          "|A| = \\sum_{j} a_{ij}A_{ij}, \\qquad A_{ij} = (-1)^{i+j}M_{ij}, \\qquad \\sum_j a_{ij}A_{kj} = 0 \\ (k \\ne i)",
      },
      visualizationSlug: "cofactor-sign-grid",
      authoredExample: {
        prompt: "For \\(A = \\begin{pmatrix} 1 & 2 & 0 \\\\ 3 & 1 & 1 \\\\ 0 & 2 & 4 \\end{pmatrix}\\), find the cofactor \\(A_{23}\\) and the element \\((\\operatorname{adj}A)_{32}\\).",
        steps: [
          "\\(M_{23}\\): delete row 2 and column 3, leaving \\(\\begin{vmatrix} 1 & 2 \\\\ 0 & 2 \\end{vmatrix} = 2\\). Sign \\((-1)^{2+3} = -1\\), so \\(A_{23} = -2\\).",
          "The adjoint is the transpose of the cofactor matrix, so \\((\\operatorname{adj}A)_{32} = A_{23} = -2\\).",
        ],
        answer: "\\(A_{23} = -2\\) and \\((\\operatorname{adj}A)_{32} = -2\\)",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\begin{vmatrix} 2 & 0 & 1 \\\\ 1 & 3 & 0 \\\\ 0 & 1 & 2 \\end{vmatrix}\\) by expanding along the first row.",
        steps: [
          "\\(2\\begin{vmatrix} 3 & 0 \\\\ 1 & 2 \\end{vmatrix} - 0 + 1\\begin{vmatrix} 1 & 3 \\\\ 0 & 1 \\end{vmatrix} = 2(6) + 1(1)\\).",
        ],
        answer: "\\(13\\)",
      },
      practiceSet: [
        {
          prompt: "\\(\\begin{vmatrix} 3 & -1 \\\\ -4 & 2 \\end{vmatrix} = ?\\)",
          answer: "\\(2\\)",
        },
        {
          prompt: "Sign attached to the minor \\(M_{12}\\)?",
          answer: "Negative.",
        },
        {
          prompt: "For a \\(3 \\times 3\\) matrix, \\(a_{11}A_{21} + a_{12}A_{22} + a_{13}A_{23} = ?\\)",
          answer: "\\(0\\) (alien cofactors).",
        },
        {
          prompt: "\\((\\operatorname{adj}A)_{13}\\) equals which cofactor?",
          answer: "\\(A_{31}\\).",
        },
      ],
      pyqExampleId: "cad0ca16-5e11-4465-ab48-4d6f5098982c",
      traps: [
        {
          title: "Reading (adj A)₂₃ as the cofactor A₂₃",
          body:
            "The adjoint is the TRANSPOSE of the cofactor matrix, so its \\((2, 3)\\) element is \\(A_{32}\\). With \\(a_{ij} = 2i + j\\) that gives \\(4\\), and the untransposed reading gives \\(-4\\) — both on the option list.",
        },
      ],
    },

    // 2 — A·adj A = |A| I
    {
      kind: "formula" as const,
      slug: "cetdm-adjoint-and-a-adj-a-identity",
      name: "The Adjoint and A·adj(A) = |A|·I",
      intuition:
        "Multiplying \\(A\\) by its adjoint puts each row's own cofactor expansion on the diagonal (giving \\(|A|\\)) and alien expansions off it (giving \\(0\\)). So \\(A\\cdot\\operatorname{adj}A\\) is \\(|A|\\) times the identity — which is why the inverse is \\(\\operatorname{adj}A/|A|\\).",
      definition:
        "- \\(A\\,\\operatorname{adj}A = \\operatorname{adj}A\\,A = |A|\\,I\\). If \\(A\\,\\operatorname{adj}A = 20I\\), then \\(|A| = 20\\) — read it off the diagonal.\n" +
        "- For \\(2 \\times 2\\): \\(\\operatorname{adj}\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix} = \\begin{pmatrix} d & -b \\\\ -c & a \\end{pmatrix}\\) — swap the diagonal, negate the off-diagonal.\n" +
        "- \\(\\operatorname{adj}A = |A|\\,A^{-1}\\), hence \\((\\operatorname{adj}A)^{-1} = \\dfrac{A}{|A|}\\).\n" +
        "- When \\(|A|\\) is given through relations (\\(xyz = 60\\), \\(8x + 4y + 3z = 20\\)), expand \\(|A|\\) symbolically first — \\(xyz - 8x - 4y - 3z + 28\\) — then substitute: \\(60 - 20 + 28 = 68\\), so \\(A\\,\\operatorname{adj}A = 68I\\).\n" +
        "- A polynomial in \\(\\operatorname{adj}A\\) with binomial coefficients, \\(I - 3M + 3M^2 - M^3\\), is \\((I - M)^3\\): compute \\(I - M\\) once and cube it.",
      formula: {
        label: "The adjoint identity",
        latex:
          "A\\,\\operatorname{adj}A = |A|\\,I \\qquad \\operatorname{adj}\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix} = \\begin{pmatrix} d & -b \\\\ -c & a \\end{pmatrix} \\qquad (\\operatorname{adj}A)^{-1} = \\frac{A}{|A|}",
      },
      authoredExample: {
        prompt: "For \\(A = \\begin{pmatrix} 3 & 1 \\\\ 5 & 2 \\end{pmatrix}\\), compute \\(A\\,\\operatorname{adj}A\\) without multiplying the matrices.",
        steps: [
          "\\(|A| = 6 - 5 = 1\\).",
          "By the identity, \\(A\\,\\operatorname{adj}A = |A|\\,I = I\\).",
          "Check by multiplying: \\(\\operatorname{adj}A = \\begin{pmatrix} 2 & -1 \\\\ -5 & 3 \\end{pmatrix}\\), and \\(\\begin{pmatrix} 3 & 1 \\\\ 5 & 2 \\end{pmatrix}\\begin{pmatrix} 2 & -1 \\\\ -5 & 3 \\end{pmatrix} = \\begin{pmatrix} 1 & 0 \\\\ 0 & 1 \\end{pmatrix}\\).",
        ],
        answer: "\\(I\\)",
      },
      selfCheckExample: {
        prompt: "If \\(A\\,\\operatorname{adj}A = \\begin{pmatrix} -7 & 0 & 0 \\\\ 0 & -7 & 0 \\\\ 0 & 0 & -7 \\end{pmatrix}\\), find \\(|A|\\) and \\(|\\operatorname{adj}A|\\).",
        steps: [
          "\\(A\\,\\operatorname{adj}A = |A|\\,I\\), so \\(|A| = -7\\).",
          "For \\(3 \\times 3\\), \\(|\\operatorname{adj}A| = |A|^2 = 49\\).",
        ],
        answer: "\\(|A| = -7,\\ |\\operatorname{adj}A| = 49\\)",
      },
      practiceSet: [
        {
          prompt: "\\(\\operatorname{adj}\\begin{pmatrix} 2 & -1 \\\\ 0 & 2 \\end{pmatrix} = ?\\)",
          answer: "\\(\\begin{pmatrix} 2 & 1 \\\\ 0 & 2 \\end{pmatrix}\\)",
        },
        {
          prompt: "If \\(A\\,\\operatorname{adj}A = 5I_2\\), then \\(|A| = ?\\)",
          answer: "\\(5\\)",
        },
        {
          prompt: "If \\(|A| = k\\), \\((\\operatorname{adj}A)^{-1} = ?\\)",
          answer: "\\(\\dfrac{A}{k}\\)",
        },
        {
          prompt: "\\(I - 3M + 3M^2 - M^3 = ?\\)",
          answer: "\\((I - M)^3\\)",
        },
      ],
      pyqExampleId: "d78fbee3-cc39-493e-9561-e240db114eb5",
      traps: [
        {
          title: "Substituting the relations before expanding",
          body:
            "\\(|A| = xyz - 8x - 4y - 3z + 28\\) contains BOTH given quantities and a constant. Using only \\(8x + 4y + 3z = 20\\) gives \\(20I\\); the full expansion gives \\(68I\\). Expand first, substitute last.",
        },
      ],
    },

    // 3 — |adj A|, |kA|
    {
      kind: "formula" as const,
      slug: "cetdm-determinant-of-adjoint-and-scalar-multiple",
      name: "|adj A| = |A|ⁿ⁻¹ and |kA| = kⁿ|A|",
      intuition:
        "Take determinants of \\(A\\,\\operatorname{adj}A = |A|\\,I\\): the right side is \\(|A|^n\\), so \\(|\\operatorname{adj}A| = |A|^{n-1}\\). A scalar multiplies EVERY row, so it comes out of the determinant once per row: \\(|kA| = k^n|A|\\).",
      definition:
        "- \\(|\\operatorname{adj}A| = |A|^{n-1}\\): for \\(3 \\times 3\\) with \\(|A| = 4\\), \\(|\\operatorname{adj}A| = 16\\); with \\(|A| = 5\\), \\(25\\).\n" +
        "- **The recurring stem**: '\\(P\\) is the adjoint of a \\(3 \\times 3\\) matrix \\(A\\) with \\(|A| = 4\\); find \\(\\alpha\\)'. Expand \\(|P|\\) as a linear expression in \\(\\alpha\\), set it equal to \\(|A|^2 = 16\\), solve.\n" +
        "- \\(|kA| = k^n|A|\\), \\(|A^T| = |A|\\), \\(|AB| = |A||B|\\), \\(|A^{-1}| = \\dfrac{1}{|A|}\\), \\(|A^m| = |A|^m\\).\n" +
        "- \\(\\operatorname{adj}(kA) = k^{n-1}\\operatorname{adj}A\\) and \\(\\operatorname{adj}(\\operatorname{adj}A) = |A|^{n-2}A\\) — rarer, but the same family.",
      formula: {
        label: "Determinant identities",
        latex:
          "|\\operatorname{adj}A| = |A|^{n-1} \\qquad |kA| = k^n|A| \\qquad |AB| = |A||B| \\qquad |A^{-1}| = \\frac{1}{|A|}",
      },
      authoredExample: {
        prompt: "\\(Q = \\begin{pmatrix} 2 & 0 & 1 \\\\ 1 & \\beta & 0 \\\\ 0 & 1 & 1 \\end{pmatrix}\\) is the adjoint of a \\(3 \\times 3\\) matrix \\(A\\) with \\(|A| = 3\\). Find \\(\\beta\\).",
        steps: [
          "\\(|Q| = |\\operatorname{adj}A| = |A|^2 = 9\\).",
          "Expand \\(|Q|\\) along row 1: \\(2(\\beta - 0) - 0 + 1(1 - 0) = 2\\beta + 1\\).",
          "\\(2\\beta + 1 = 9 \\Rightarrow \\beta = 4\\).",
        ],
        answer: "\\(\\beta = 4\\)",
      },
      selfCheckExample: {
        prompt: "If \\(A\\) is \\(3 \\times 3\\) with \\(|A| = 2\\), find \\(|3A|\\), \\(|\\operatorname{adj}A|\\) and \\(|A^{-1}|\\).",
        steps: [
          "\\(|3A| = 3^3\\cdot 2 = 54\\); \\(|\\operatorname{adj}A| = 2^2 = 4\\); \\(|A^{-1}| = \\dfrac12\\).",
        ],
        answer: "\\(54,\\ 4,\\ \\dfrac12\\)",
      },
      practiceSet: [
        {
          prompt: "\\(|\\operatorname{adj}A|\\) for a \\(3 \\times 3\\) \\(A\\) with \\(|A| = 5\\)?",
          answer: "\\(25\\)",
        },
        {
          prompt: "\\(|2A|\\) for a \\(2 \\times 2\\) \\(A\\) with \\(|A| = 3\\)?",
          answer: "\\(12\\)",
        },
        {
          prompt: "\\(|\\operatorname{adj}A|\\) for a \\(2 \\times 2\\) \\(A\\) with \\(|A| = 7\\)?",
          answer: "\\(7\\)",
        },
        {
          prompt: "\\(|A^3|\\) if \\(|A| = -2\\)?",
          answer: "\\(-8\\)",
        },
      ],
      pyqExampleId: "4164d8b8-221c-4869-89db-fe5b0729844b",
      traps: [
        {
          title: "Using |adj A| = |A|",
          body:
            "For \\(3 \\times 3\\), \\(|\\operatorname{adj}A| = |A|^2\\). Setting \\(|P| = 4\\) instead of \\(16\\) gives \\(\\alpha = 5\\), which is the option planted for that mistake.",
        },
      ],
    },

    // 4 — A adj A = A A^T
    {
      kind: "formula" as const,
      slug: "cetdm-a-adj-a-equals-a-a-transpose",
      name: "A·adj(A) = AAᵀ: Two Equations From the Diagonal and Off-Diagonal",
      intuition:
        "\\(A\\,\\operatorname{adj}A\\) is \\(|A|\\) times the identity, so setting it equal to \\(AA^T\\) forces \\(AA^T\\) to be diagonal with \\(|A|\\) on the diagonal. The off-diagonal entry of \\(AA^T\\) must be \\(0\\) and each diagonal entry must equal \\(|A|\\) — two equations in the two unknowns.",
      definition:
        "- Write \\(A = \\begin{pmatrix} p & q \\\\ 3 & 2 \\end{pmatrix}\\) with \\(p, q\\) in terms of the unknowns. \\(AA^T = \\begin{pmatrix} p^2 + q^2 & 3p + 2q \\\\ 3p + 2q & 13 \\end{pmatrix}\\), and \\(|A| = 2p - 3q\\).\n" +
        "- **Off-diagonal**: \\(3p + 2q = 0\\). **Diagonal**: \\(13 = |A| = 2p - 3q\\). Solve the pair.\n" +
        "- For \\(A = \\begin{pmatrix} 2a & -3b \\\\ 3 & 2 \\end{pmatrix}\\): \\(6a - 6b = 0\\) and \\(4a + 9b = 13\\) give \\(a = b = 1\\), so \\(2a + 3b = 5\\). For \\(\\begin{pmatrix} 5a & -b \\\\ 3 & 2 \\end{pmatrix}\\): \\(15a - 2b = 0\\), \\(10a + 3b = 13\\) give \\(a = \\frac25\\), \\(b = 3\\), so \\(5a + b = 5\\).\n" +
        "- The other diagonal entry \\(p^2 + q^2 = |A|\\) is automatically satisfied once the first two hold — use it as a check, not a third equation.",
      formula: {
        label: "The AAᵀ condition",
        latex:
          "A\\,\\operatorname{adj}A = AA^T \\iff AA^T = |A|\\,I \\iff (\\text{off-diagonal of } AA^T) = 0 \\ \\text{and}\\ (\\text{diagonal of } AA^T) = |A|",
      },
      authoredExample: {
        prompt: "If \\(A = \\begin{pmatrix} 3a & -2b \\\\ 2 & 3 \\end{pmatrix}\\) and \\(A\\,\\operatorname{adj}A = AA^T\\), find \\(a\\) and \\(b\\).",
        steps: [
          "Off-diagonal of \\(AA^T\\): \\(3a\\cdot2 + (-2b)\\cdot3 = 6a - 6b = 0 \\Rightarrow a = b\\).",
          "Bottom-right diagonal of \\(AA^T\\) is \\(4 + 9 = 13\\); it must equal \\(|A| = 9a + 4b = 13a\\), so \\(a = 1\\), \\(b = 1\\).",
          "Check the top-left: \\(9a^2 + 4b^2 = 13 = |A|\\). Consistent.",
        ],
        answer: "\\(a = 1,\\ b = 1\\)",
      },
      selfCheckExample: {
        prompt: "If \\(A = \\begin{pmatrix} a & -b \\\\ 1 & 1 \\end{pmatrix}\\) and \\(A\\,\\operatorname{adj}A = AA^T\\), find \\(a + b\\).",
        steps: [
          "Off-diagonal: \\(a - b = 0\\). Diagonal: \\(1 + 1 = 2 = |A| = a + b\\).",
          "So \\(a = b = 1\\) and \\(a + b = 2\\).",
        ],
        answer: "\\(2\\)",
      },
      pyqExampleId: "d942ea14-431b-45c7-a576-2da4971f4d77",
      traps: [
        {
          title: "Equating AAᵀ to |A| only on the diagonal",
          body:
            "The off-diagonal condition is the one that links \\(a\\) and \\(b\\). Without it the diagonal gives one equation in two unknowns and every option looks reachable.",
        },
      ],
    },

    // 5 — determinant equations and singularity
    {
      kind: "formula" as const,
      slug: "cetdm-determinant-equations-and-singularity",
      name: "Determinant Equations: When Does |A| Vanish?",
      intuition:
        "A determinant set to zero is a condition on its entries. Expand, simplify with identities, and read the condition — a trigonometric determinant collapses to \\(1 + \\cos 2B = 0\\), and a matrix over cube roots of unity is singular exactly when one factor \\((1 - a\\omega)\\) vanishes.",
      definition:
        "- Expand fully before simplifying: \\(\\begin{vmatrix} \\cos(A+B) & -\\sin(A+B) & \\cos 2B \\\\ \\sin A & \\cos A & \\sin B \\\\ -\\cos A & \\sin A & \\cos B \\end{vmatrix}\\) along row 1 gives \\(\\cos^2(A+B) + \\sin^2(A+B) + \\cos 2B = 1 + \\cos 2B\\). Zero means \\(\\cos 2B = -1\\), \\(B = (2n+1)\\dfrac{\\pi}{2}\\).\n" +
        "- Over cube roots of unity (\\(\\omega^3 = 1\\), \\(1 + \\omega + \\omega^2 = 0\\)): \\(\\begin{vmatrix} 1 & a & b \\\\ \\omega & 1 & c \\\\ \\omega^2 & \\omega & 1 \\end{vmatrix} = (1 - a\\omega)(1 - c\\omega)\\), so the matrix is non-singular unless \\(a = \\omega^2\\) or \\(c = \\omega^2\\). With \\(a, b, c \\in \\{\\omega, \\omega^2\\}\\): \\(a = c = \\omega\\) forced, \\(b\\) free — \\(2\\) matrices.\n" +
        "- **Singular** means \\(|A| = 0\\): no inverse, and \\(AX = 0\\) has non-trivial solutions (the linear-systems page).\n" +
        "- Count carefully: a 'number of distinct matrices' stem is a product of the free choices after the determinant condition has removed the bad ones.",
      formula: {
        label: "Vanishing determinant",
        latex:
          "|A| = 0 \\iff A \\text{ singular} \\iff A^{-1} \\text{ does not exist} \\qquad 1 + \\omega + \\omega^2 = 0,\\ \\omega^3 = 1",
      },
      authoredExample: {
        prompt: "For what values of \\(\\theta\\) is \\(\\begin{vmatrix} \\cos\\theta & \\sin\\theta \\\\ \\sin\\theta & \\cos\\theta \\end{vmatrix} = 0\\)?",
        steps: [
          "\\(|A| = \\cos^2\\theta - \\sin^2\\theta = \\cos 2\\theta\\).",
          "\\(\\cos 2\\theta = 0 \\Rightarrow 2\\theta = (2n+1)\\dfrac{\\pi}{2} \\Rightarrow \\theta = (2n+1)\\dfrac{\\pi}{4}\\).",
        ],
        answer: "\\(\\theta = (2n+1)\\dfrac{\\pi}{4},\\ n \\in \\mathbb{Z}\\)",
      },
      selfCheckExample: {
        prompt: "For which \\(k\\) is \\(\\begin{pmatrix} k & 2 \\\\ 8 & k \\end{pmatrix}\\) singular?",
        steps: [
          "\\(|A| = k^2 - 16 = 0\\).",
        ],
        answer: "\\(k = \\pm 4\\)",
      },
      practiceSet: [
        {
          prompt: "\\(1 + \\omega + \\omega^2 = ?\\)",
          answer: "\\(0\\)",
        },
        {
          prompt: "\\(\\cos 2B = -1\\) gives \\(B = ?\\)",
          answer: "\\((2n+1)\\dfrac{\\pi}{2}\\)",
        },
        {
          prompt: "Is \\(\\begin{pmatrix} 1 & 2 \\\\ 2 & 4 \\end{pmatrix}\\) singular?",
          answer: "Yes — determinant \\(0\\).",
        },
        {
          prompt: "\\(1 - a\\omega = 0\\) means \\(a = ?\\)",
          answer: "\\(\\omega^2\\) (since \\(\\omega\\cdot\\omega^2 = 1\\)).",
        },
      ],
      pyqExampleId: "b8bb9e13-a259-4131-a30d-86617ba5a268",
      traps: [
        {
          title: "Stopping at cos 2B = 0",
          body:
            "The trigonometric determinant is \\(1 + \\cos 2B\\), not \\(\\cos 2B\\): the two squared terms add to \\(1\\). Zero requires \\(\\cos 2B = -1\\), giving \\((2n+1)\\pi/2\\) — the option \\((2n+1)\\pi/4\\) is the half-finished version.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Inverse of a Matrix — where adj A/|A| becomes the working formula",
      href: "/notes/mht-cet-maths/determinants-and-matrices/cetdm-inverse",
    },
    {
      label: "Systems of Linear Equations — the vanishing determinant as a degeneracy test",
      href: "/notes/mht-cet-maths/determinants-and-matrices/cetdm-linear-systems-and-symmetry",
    },
  ],
};
