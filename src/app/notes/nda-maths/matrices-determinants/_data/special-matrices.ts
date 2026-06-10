import type { SubtopicNote } from "@/app/notes/_types";

export const SPECIAL_MATRICES_NOTE: SubtopicNote = {
  subtopicName: "Special Matrices — Skew-Symmetric, Diagonal, Idempotent, Orthogonal, Rotation",
  title: "Special Matrices and Their Tell-Tale Properties",
  oneLineDefinition:
    "Named matrix types — symmetric, skew-symmetric, diagonal, orthogonal, rotation, idempotent, involutory — each carry a defining equation that instantly fixes their determinant and inverse.",
  whyItMatters:
    "Twenty-two PYQs, mostly EASY–MODERATE — high-yield because each type is recognised by one " +
    "equation and then answers itself (a skew-symmetric matrix of odd order has determinant 0; an " +
    "orthogonal matrix has inverse equal to its transpose). Learn the catalog and the recognition " +
    "questions become instant.",
  concepts: [
    // C1 — types catalog (REFERENCE)
    {
      kind: "reference" as const,
      slug: "special-matrix-types",
      name: "The special-matrix catalog",
      intuition:
        "Each special matrix is defined by one equation relating \\(A\\) to \\(A^T\\), \\(A^{-1}\\), or " +
        "a power of itself. Recognising that equation is the whole game — it pins down the determinant, " +
        "the inverse, and the diagonal at a glance. For **complex** matrices, the conjugate-transpose " +
        "\\((\\bar{A})^T\\) plays the role of \\(A^T\\) (Hermitian / skew-Hermitian).",
      definition:
        "Memorise the defining property of each type; the exam tests recognition more than computation.",
      table: {
        columns: ["Type", "Defining property", "Key consequence"],
        rows: [
          { cells: ["Symmetric", "\\(A^T = A\\)", "\\(a_{ij} = a_{ji}\\); inverse (if any) is symmetric"] },
          {
            cells: ["Skew-symmetric", "\\(A^T = -A\\)", "diagonal all 0; odd order \\(\\Rightarrow \\det = 0\\)"],
            noteAmber: "Odd-order skew-symmetric is ALWAYS singular (det 0). Even-order need not be.",
          },
          { cells: ["Diagonal", "off-diagonal all 0", "\\(\\det = \\) product of diagonal entries"] },
          { cells: ["Orthogonal", "\\(AA^T = I\\)", "\\(A^{-1} = A^T\\); \\(\\det = \\pm 1\\)"] },
          { cells: ["Idempotent", "\\(A^2 = A\\)", "\\(\\det \\in \\{0, 1\\}\\)"] },
          { cells: ["Involutory", "\\(A^2 = I\\)", "\\(A^{-1} = A\\); \\(\\det = \\pm 1\\)"] },
          {
            cells: ["Hermitian", "\\((\\bar{A})^T = A\\)", "complex analogue of symmetric; diagonal entries are real; \\(A+(\\bar{A})^T\\) is always Hermitian"],
            noteAmber: "For a REAL matrix, Hermitian \\(=\\) symmetric. The conjugate-transpose \\((\\bar{A})^T\\) is also written \\(A^{*}\\) or \\(A^{\\dagger}\\).",
          },
          { cells: ["Skew-Hermitian", "\\((\\bar{A})^T = -A\\)", "complex analogue of skew-symmetric; diagonal entries are 0 or purely imaginary"] },
        ],
        caption: "Recognise the defining equation first; the determinant and inverse follow immediately.",
      },
      selfCheckExample: {
        prompt: "A matrix satisfies \\(A^T = -A\\) and is of order 3. What is \\(\\det A\\), and what are its diagonal entries?",
        steps: [
          "\\(A^T = -A\\) means skew-symmetric.",
          "Diagonal entries satisfy \\(a_{ii} = -a_{ii} \\Rightarrow a_{ii} = 0\\).",
          "For odd order \\(n\\): \\(\\det A^T = \\det(-A) = (-1)^n \\det A\\); with \\(\\det A^T = \\det A\\) and \\(n\\) odd, \\(\\det A = -\\det A \\Rightarrow \\det A = 0\\).",
        ],
        answer: "\\(\\det A = 0\\); all diagonal entries are 0.",
      },
      practiceSet: [
        { prompt: "Defining property of an orthogonal matrix?", answer: "\\(AA^T = I\\)" },
        { prompt: "\\(A^2 = I\\) defines which type?", answer: "Involutory" },
        { prompt: "Diagonal entries of a skew-symmetric matrix?", answer: "All 0" },
        { prompt: "\\(\\det\\) of an orthogonal matrix?", answer: "\\(\\pm 1\\)" },
        { prompt: "Defining property of a Hermitian matrix?", answer: "\\((\\bar{A})^T = A\\) (conjugate-transpose equals itself)" },
        { prompt: "For a real matrix, Hermitian is the same as which type?", answer: "Symmetric" },
      ],
      pyqExampleId: "018b0cb6-7902-487c-afda-c697c548ae9b", // 2019 — [[0,1],[1,0]] is a/an
    },

    // C2 — symmetric & skew
    {
      kind: "formula" as const,
      slug: "symmetric-and-skew-symmetric",
      name: "Symmetric and skew-symmetric matrices",
      intuition:
        "Symmetric mirrors across the diagonal (\\(A^T = A\\)); skew-symmetric anti-mirrors " +
        "(\\(A^T = -A\\), forcing zero diagonal). Any square matrix splits uniquely into a symmetric " +
        "part plus a skew-symmetric part — a decomposition the exam loves.",
      definition:
        "\\(A\\) is **symmetric** if \\(A^T = A\\), **skew-symmetric** if \\(A^T = -A\\) (so \\(a_{ii}=0\\)). " +
        "Every square matrix decomposes as \\(A = \\tfrac12(A + A^T) + \\tfrac12(A - A^T)\\) — symmetric " +
        "part \\(P\\) plus skew part \\(Q\\). Useful facts: \\(A + A^T\\) is symmetric, \\(A - A^T\\) is " +
        "skew, \\(AA^T\\) is symmetric; an **odd-order skew-symmetric** matrix has \\(\\det = 0\\).",
      formula: {
        label: "Symmetric + skew decomposition",
        latex: "A = \\underbrace{\\tfrac12(A + A^T)}_{\\text{symmetric}} + \\underbrace{\\tfrac12(A - A^T)}_{\\text{skew-symmetric}}",
      },
      authoredExample: {
        prompt: "Let \\(A\\) be a skew-symmetric matrix of order 3. Find \\(\\det A\\).",
        steps: [
          "Skew-symmetric: \\(A^T = -A\\). Take determinants: \\(\\det(A^T) = \\det(-A)\\).",
          "\\(\\det(A^T) = \\det A\\); \\(\\det(-A) = (-1)^3 \\det A = -\\det A\\).",
          "So \\(\\det A = -\\det A \\Rightarrow 2\\det A = 0 \\Rightarrow \\det A = 0\\).",
        ],
        answer: "\\(\\det A = 0\\) (odd-order skew-symmetric is always singular).",
      },
      selfCheckExample: {
        prompt: "If \\(A\\) and \\(B\\) are symmetric matrices of the same order, is \\(AB\\) symmetric?",
        steps: [
          "\\((AB)^T = B^T A^T = BA\\) (since \\(A, B\\) symmetric).",
          "\\(BA\\) equals \\(AB\\) only if they commute.",
          "So \\(AB\\) is symmetric **iff** \\(AB = BA\\); not in general.",
        ],
        answer: "Only if \\(A\\) and \\(B\\) commute (\\(AB = BA\\)).",
      },
      practiceSet: [
        { prompt: "\\(A^T = -A\\) — the diagonal entries are?", answer: "All 0" },
        { prompt: "Det of a \\(3\\times3\\) skew-symmetric matrix?", answer: "\\(0\\)" },
        { prompt: "\\(A + A^T\\) is always?", answer: "Symmetric" },
        { prompt: "\\(A - A^T\\) is always?", answer: "Skew-symmetric" },
      ],
      pyqExampleId: "9cb25813-95d1-4b1f-8df8-fe394e8ba43e", // 2024 — skew order 3 det
      traps: [
        {
          title: "Odd-order skew-symmetric \\(\\Rightarrow \\det = 0\\); diagonal entries are 0",
          body:
            "From \\(A^T = -A\\): the diagonal satisfies \\(a_{ii} = -a_{ii}\\), so **every diagonal entry is 0**. " +
            "And for ODD order, \\(\\det A = (-1)^n\\det A = -\\det A\\), forcing \\(\\det A = 0\\). " +
            "Don't assume the determinant is unknown — for odd order it is always 0. (Even order need not be.)",
        },
      ],
    },

    // C3 — diagonal/scalar/identity
    {
      kind: "formula" as const,
      slug: "diagonal-scalar-identity",
      name: "Diagonal, scalar, and identity matrices",
      intuition:
        "Diagonal matrices are the friendliest: their determinant is just the product of the diagonal, " +
        "their powers raise each diagonal entry to that power, and their inverse reciprocates each " +
        "diagonal entry. A scalar matrix is \\(kI\\); the identity is \\(1\\cdot I\\).",
      definition:
        "For a diagonal matrix \\(D = \\text{diag}(d_1,\\dots,d_n)\\): \\(\\det D = \\prod d_i\\), " +
        "\\(D^k = \\text{diag}(d_1^k,\\dots,d_n^k)\\), and \\(D^{-1} = \\text{diag}(1/d_1,\\dots,1/d_n)\\) " +
        "(when all \\(d_i \\neq 0\\)). A **scalar matrix** is \\(kI\\); \\(\\det(kI_n) = k^n\\).",
      formula: {
        label: "Diagonal determinant and inverse",
        latex: "\\det D = \\prod_i d_i, \\qquad D^{-1} = \\operatorname{diag}\\!\\left(\\tfrac{1}{d_1}, \\dots, \\tfrac{1}{d_n}\\right)",
      },
      authoredExample: {
        prompt: "For \\(A = \\begin{pmatrix}3&0&0\\\\0&2&0\\\\0&0&5\\end{pmatrix}\\), find \\(\\det A\\) and \\(\\det(A^2)\\).",
        steps: [
          "Diagonal → \\(\\det A = 3\\cdot2\\cdot5 = 30\\).",
          "\\(A^2 = \\text{diag}(9, 4, 25)\\), so \\(\\det(A^2) = 9\\cdot4\\cdot25 = 900 = 30^2\\).",
        ],
        answer: "\\(\\det A = 30\\), \\(\\det(A^2) = 900\\).",
      },
      practiceSet: [
        { prompt: "\\(\\det(\\text{diag}(1,5,2))\\)?", answer: "\\(10\\)" },
        { prompt: "\\(\\det(kI_3)\\)?", answer: "\\(k^3\\)" },
        { prompt: "Inverse of \\(\\text{diag}(2,4)\\)?", answer: "\\(\\text{diag}(\\tfrac12, \\tfrac14)\\)" },
        { prompt: "\\((\\text{diag}(2,3))^3\\)?", answer: "\\(\\text{diag}(8, 27)\\)" },
      ],
      pyqExampleId: "de8e47a3-dc40-43e6-84b3-613ffb85bc19", // 2023 — diag(2,3,4) statements
    },

    // C4 — orthogonal
    {
      kind: "formula" as const,
      slug: "orthogonal-matrices",
      name: "Orthogonal matrices",
      intuition:
        "An orthogonal matrix has perpendicular unit columns, captured by \\(AA^T = I\\). The huge " +
        "payoff: its inverse is simply its transpose (no adjoint needed), and its determinant is " +
        "\\(\\pm 1\\).",
      definition:
        "\\(A\\) is **orthogonal** if \\(AA^T = A^T A = I\\). Then \\(A^{-1} = A^T\\) and " +
        "\\(\\det A = \\pm 1\\) (since \\(\\det(AA^T) = (\\det A)^2 = 1\\)). Rotation matrices are the " +
        "standard example.",
      formula: {
        label: "Orthogonality",
        latex: "AA^T = I \\;\\Longrightarrow\\; A^{-1} = A^T,\\quad \\det A = \\pm 1",
      },
      authoredExample: {
        prompt: "A square matrix \\(A\\) is called orthogonal under which condition?",
        steps: [
          "By definition, orthogonal means \\(A^T A = I\\) (equivalently \\(AA^T = I\\)).",
          "This is what makes \\(A^{-1} = A^T\\).",
        ],
        answer: "\\(A A^T = I\\) (equivalently \\(A^T = A^{-1}\\)).",
      },
      selfCheckExample: {
        prompt: "If \\(A\\) is orthogonal of order 4, what is the value of \\(\\det(A^4)\\)?",
        steps: [
          "Orthogonal → \\(\\det A = \\pm 1\\).",
          "\\(\\det(A^4) = (\\det A)^4 = (\\pm 1)^4 = 1\\).",
        ],
        answer: "\\(\\det(A^4) = 1\\).",
      },
      practiceSet: [
        { prompt: "For orthogonal \\(A\\), \\(A^{-1} = ?\\)", answer: "\\(A^T\\)" },
        { prompt: "\\(\\det\\) of an orthogonal matrix?", answer: "\\(\\pm 1\\)" },
        { prompt: "Is a rotation matrix orthogonal?", answer: "Yes" },
        { prompt: "If \\(AA^T = I\\), what is \\((\\det A)^2\\)?", answer: "\\(1\\)" },
      ],
      pyqExampleId: "a382e482-1e9f-452d-9f55-eeac0535111e", // 2018 — orthogonal definition
    },

    // C5 — rotation
    {
      kind: "formula" as const,
      slug: "rotation-matrices",
      name: "Rotation matrices",
      intuition:
        "The rotation matrix \\(R(\\theta) = \\begin{pmatrix}\\cos\\theta & \\sin\\theta\\\\-\\sin\\theta & \\cos\\theta\\end{pmatrix}\\) " +
        "rotates the plane. Composing rotations adds angles, so \\(R(\\theta)R(\\phi) = R(\\theta+\\phi)\\) " +
        "and \\(R(\\theta)^n = R(n\\theta)\\) — no matrix grinding needed.",
      definition:
        "\\(R(\\theta) = \\begin{pmatrix}\\cos\\theta & \\sin\\theta\\\\-\\sin\\theta & \\cos\\theta\\end{pmatrix}\\) " +
        "is orthogonal with \\(\\det = 1\\). Composition law: \\(R(\\theta)R(\\phi) = R(\\theta+\\phi)\\); " +
        "hence \\(R(\\theta)^n = R(n\\theta)\\) and \\(R(\\theta)^{-1} = R(-\\theta) = R(\\theta)^T\\).",
      formula: {
        label: "Rotation composition",
        latex: "R(\\theta)\\,R(\\phi) = R(\\theta + \\phi), \\qquad R(\\theta)^n = R(n\\theta)",
      },
      authoredExample: {
        prompt: "If \\(A = \\begin{pmatrix}\\cos\\alpha & \\sin\\alpha\\\\-\\sin\\alpha & \\cos\\alpha\\end{pmatrix}\\), what is \\(A^2\\)?",
        steps: [
          "\\(A\\) is a rotation by \\(\\alpha\\).",
          "\\(A^2 = R(\\alpha)R(\\alpha) = R(2\\alpha)\\).",
          "So \\(A^2 = \\begin{pmatrix}\\cos2\\alpha & \\sin2\\alpha\\\\-\\sin2\\alpha & \\cos2\\alpha\\end{pmatrix}\\).",
        ],
        answer: "\\(A^2 = \\begin{pmatrix}\\cos2\\alpha & \\sin2\\alpha\\\\-\\sin2\\alpha & \\cos2\\alpha\\end{pmatrix}\\).",
      },
      practiceSet: [
        { prompt: "\\(R(\\theta)R(\\phi) = ?\\)", answer: "\\(R(\\theta + \\phi)\\)" },
        { prompt: "\\(\\det R(\\theta)\\)?", answer: "\\(1\\)" },
        { prompt: "\\(R(\\theta)^{-1} = ?\\)", answer: "\\(R(-\\theta) = R(\\theta)^T\\)" },
        { prompt: "\\(R(30°)^3 = ?\\)", answer: "\\(R(90°)\\)" },
      ],
      pyqExampleId: "9ad7b42d-d693-4a0b-beb5-f459c12236cf", // 2017 — rotation A
    },

    // C6 — idempotent / involutory
    {
      kind: "formula" as const,
      slug: "idempotent-involutory",
      name: "Idempotent and involutory matrices",
      intuition:
        "An **idempotent** matrix is unchanged when squared (\\(A^2 = A\\) — like a projection); an " +
        "**involutory** matrix is its own inverse (\\(A^2 = I\\)). Spot the defining square and the " +
        "powers collapse instantly.",
      definition:
        "**Idempotent:** \\(A^2 = A\\) (so \\(A^n = A\\) for all \\(n \\ge 1\\); \\(\\det A \\in \\{0,1\\}\\)). " +
        "**Involutory:** \\(A^2 = I\\) (so \\(A^{-1} = A\\); even powers are \\(I\\), odd powers are \\(A\\)). " +
        "A common test matrix is the all-ones matrix \\(J\\), where \\(J^2 = nJ\\) for order \\(n\\).",
      authoredExample: {
        prompt: "For \\(A = \\begin{pmatrix}1&1&1\\\\1&1&1\\\\1&1&1\\end{pmatrix}\\), express \\(A^2\\) in terms of \\(A\\), and state whether \\(A\\) is invertible.",
        steps: [
          "Each entry of \\(A^2\\) is a row of 1s dotted with a column of 1s \\(= 3\\). So \\(A^2 = 3A\\).",
          "All rows are identical → \\(\\det A = 0\\).",
          "Determinant 0 → \\(A\\) is **not** invertible.",
        ],
        answer: "\\(A^2 = 3A\\); \\(A\\) is singular (no inverse).",
      },
      practiceSet: [
        { prompt: "Idempotent means?", answer: "\\(A^2 = A\\)" },
        { prompt: "Involutory means?", answer: "\\(A^2 = I\\)" },
        { prompt: "If \\(A^2 = A\\), then \\(A^7 = ?\\)", answer: "\\(A\\)" },
        { prompt: "If \\(A^2 = I\\), then \\(A^{-1} = ?\\)", answer: "\\(A\\)" },
      ],
      pyqExampleId: "b6bd6a4c-7550-4c90-985f-b87178736011", // 2021 — all-ones matrix
    },
  ],
};
