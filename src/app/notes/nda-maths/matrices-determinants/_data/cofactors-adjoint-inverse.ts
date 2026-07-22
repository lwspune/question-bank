import type { SubtopicNote } from "@/app/notes/_types";

export const COFACTORS_ADJOINT_INVERSE_NOTE: SubtopicNote = {
  subtopicName: "Cofactors, Adjoint, and Inverse",
  title: "Cofactors, Adjoint & Inverse",
  oneLineDefinition:
    "Minors and cofactors build the adjoint; the adjoint over the determinant gives the inverse — and the powers of the determinant (|adj A| = |A|ⁿ⁻¹) answer most of the rest.",
  whyItMatters:
    "Twenty-eight PYQs spanning EASY to HARD. This is the machinery linking determinants to inverses. " +
    "Questions test cofactor expansion (and the alien-cofactor = 0 trap), adjoint computation, the " +
    "adjoint power formulas, the inverse via adjoint, the reversal law (AB)⁻¹ = B⁻¹A⁻¹, and the easy " +
    "inverses of diagonal/orthogonal matrices. Six concepts cover it.",
  concepts: [
    // C1 — minors & cofactors
    {
      kind: "formula" as const,
      slug: "minors-and-cofactors",
      name: "Minors, cofactors, and expansion",
      intuition:
        "The minor \\(M_{ij}\\) is the determinant left after deleting row \\(i\\) and column \\(j\\); " +
        "the cofactor attaches the sign \\((-1)^{i+j}\\). Expanding a row against its OWN cofactors gives " +
        "the determinant; against ANOTHER row's cofactors (alien cofactors) gives 0.",
      definition:
        "Cofactor \\(C_{ij} = (-1)^{i+j}M_{ij}\\). **Own-row expansion:** " +
        "\\(\\sum_j a_{ij}C_{ij} = \\det A\\). **Alien cofactors:** " +
        "\\(\\sum_j a_{ij}C_{kj} = 0\\) when \\(k \\neq i\\) (a row times another row's cofactors). The " +
        "sign pattern is the checkerboard \\((-1)^{i+j}\\).",
      visualizationSlug: "cofactor-sign-grid",
      formula: {
        label: "Cofactor expansion vs alien cofactors",
        latex: "\\sum_j a_{ij}C_{ij} = \\det A, \\qquad \\sum_j a_{ij}C_{kj} = 0\\ (k \\neq i)",
      },
      authoredExample: {
        prompt: "For \\(A = \\begin{pmatrix}2&1&3\\\\0&5&4\\\\1&2&1\\end{pmatrix}\\), find the cofactor \\(C_{31}\\).",
        steps: [
          "Minor \\(M_{31}\\): delete row 3 and column 1, take the determinant: \\(\\begin{vmatrix}1&3\\\\5&4\\end{vmatrix} = 4 - 15 = -11\\).",
          "Cofactor \\(C_{31} = (-1)^{3+1} M_{31} = (+1)(-11)\\).",
          "\\(= -11\\).",
        ],
        answer: "\\(C_{31} = -11\\).",
      },
      selfCheckExample: {
        prompt: "What is the sign of the cofactor \\(C_{23}\\), and what is \\(a_{11}C_{11} + a_{12}C_{12} + a_{13}C_{13}\\)?",
        steps: [
          "Sign of \\(C_{23}\\): \\((-1)^{2+3} = (-1)^5 = -1\\).",
          "\\(a_{11}C_{11} + a_{12}C_{12} + a_{13}C_{13}\\) is row 1 against its OWN cofactors → \\(\\det A\\).",
        ],
        answer: "\\(C_{23}\\) has sign \\(-\\); the row-1 own expansion equals \\(\\det A\\).",
      },
      practiceSet: [
        { prompt: "Cofactor sign at position (1,2)?", answer: "\\(-\\)" },
        { prompt: "\\(\\sum_j a_{2j}C_{2j} = ?\\)", answer: "\\(\\det A\\)" },
        { prompt: "\\(\\sum_j a_{1j}C_{2j} = ?\\)", answer: "\\(0\\) (alien)" },
        { prompt: "Minor \\(M_{ij}\\) is found by?", answer: "Deleting row i and column j, then taking the determinant" },
      ],
      pyqExampleId: "5910c924-a8b1-444e-8d79-29790dc15d8b", // 2022 — alien cofactor = 0
    },

    // C2 — adjoint
    {
      kind: "formula" as const,
      slug: "adjoint",
      name: "The adjoint (adjugate)",
      intuition:
        "The adjoint is the TRANSPOSE of the cofactor matrix. Its defining property — " +
        "\\(A(\\operatorname{adj}A) = (\\operatorname{adj}A)A = |A|\\,I\\) — is the bridge to the inverse. " +
        "For \\(2\\times2\\) there's a one-line shortcut: swap the diagonal, negate the off-diagonal.",
      definition:
        "\\(\\operatorname{adj}A = [C_{ij}]^T\\) (transpose of the cofactor matrix). Defining identity: " +
        "\\(A(\\operatorname{adj}A) = (\\operatorname{adj}A)A = |A|\\,I_n\\). " +
        "**2×2 shortcut:** \\(\\operatorname{adj}\\begin{pmatrix}a&b\\\\c&d\\end{pmatrix} = \\begin{pmatrix}d&-b\\\\-c&a\\end{pmatrix}\\).",
      formula: {
        label: "Adjoint identity",
        latex: "A(\\operatorname{adj}A) = (\\operatorname{adj}A)A = |A|\\,I_n",
      },
      authoredExample: {
        prompt: "Find the adjoint of \\(A = \\begin{pmatrix}3 & 1\\\\2 & 4\\end{pmatrix}\\).",
        steps: [
          "Use the 2×2 shortcut: swap diagonal entries (3 and 4), negate the off-diagonal (1 and 2).",
          "\\(\\operatorname{adj}A = \\begin{pmatrix}4 & -1\\\\-2 & 3\\end{pmatrix}\\).",
          "Check: \\(A(\\operatorname{adj}A) = (12 - 2)I = 10 I = |A|I\\). ✓",
        ],
        answer: "\\(\\operatorname{adj}A = \\begin{pmatrix}4 & -1\\\\-2 & 3\\end{pmatrix}\\).",
      },
      selfCheckExample: {
        prompt: "What is \\(A(\\operatorname{adj}A)\\) for a \\(3\\times3\\) matrix with \\(|A| = 5\\)?",
        steps: [
          "By the defining identity, \\(A(\\operatorname{adj}A) = |A|\\,I\\).",
          "\\(= 5 I_3 = \\begin{pmatrix}5&0&0\\\\0&5&0\\\\0&0&5\\end{pmatrix}\\).",
        ],
        answer: "\\(5I_3\\).",
      },
      practiceSet: [
        { prompt: "\\(\\operatorname{adj}A = ?\\) (in terms of cofactors)", answer: "Transpose of the cofactor matrix" },
        { prompt: "\\(A(\\operatorname{adj}A) = ?\\)", answer: "\\(|A|\\,I\\)" },
        { prompt: "\\(\\operatorname{adj}\\begin{pmatrix}1&2\\\\3&4\\end{pmatrix}\\)?", answer: "\\(\\begin{pmatrix}4&-2\\\\-3&1\\end{pmatrix}\\)" },
        { prompt: "Adjoint of identity \\(I_3\\)?", answer: "\\(I_3\\)" },
      ],
      pyqExampleId: "82e2f1b7-11a2-4958-a70a-17a0af466e7e", // 2017 — adjoint of 3x3
    },

    // C3 — adjoint properties
    {
      kind: "formula" as const,
      slug: "adjoint-properties",
      name: "Adjoint power formulas",
      intuition:
        "Almost every 'adjoint of adjoint' or '|adj A|' question is a single power formula. The keys: " +
        "\\(|\\operatorname{adj}A| = |A|^{n-1}\\) and \\(\\operatorname{adj}(\\operatorname{adj}A) = |A|^{n-2}A\\) " +
        "for an \\(n\\times n\\) matrix.",
      definition:
        "For an \\(n\\times n\\) non-singular matrix:\n" +
        "- **Determinant:** \\(|\\operatorname{adj}A| = |A|^{n-1}\\)\n" +
        "- **Double adjoint:** \\(\\operatorname{adj}(\\operatorname{adj}A) = |A|^{n-2}A\\)\n" +
        "- **Scalar:** \\(\\operatorname{adj}(kA) = k^{n-1}\\operatorname{adj}A\\)\n" +
        "- **Reversal:** \\(\\operatorname{adj}(AB) = \\operatorname{adj}B\\,\\operatorname{adj}A\\)\n" +
        "- **Transpose:** \\(\\operatorname{adj}(A^T) = (\\operatorname{adj}A)^T\\) (adjoint commutes with transpose, so \\(\\operatorname{adj}A^T - (\\operatorname{adj}A)^T = O\\))",
      formula: {
        label: "Adjoint of an n×n matrix",
        latex: "|\\operatorname{adj}A| = |A|^{\\,n-1}, \\qquad \\operatorname{adj}(\\operatorname{adj}A) = |A|^{\\,n-2}A",
      },
      authoredExample: {
        prompt: "For a \\(3\\times3\\) matrix \\(A\\) with \\(|A| = 3\\), find \\(|\\operatorname{adj}(\\operatorname{adj}A)|\\).",
        steps: [
          "For a \\(3\\times3\\) matrix, \\(\\operatorname{adj}(\\operatorname{adj}A) = |A|^{n-2}A = |A|^{1}A = 3A\\).",
          "So \\(|\\operatorname{adj}(\\operatorname{adj}A)| = |3A| = 3^3\\,|A| = 27 \\cdot 3\\).",
          "\\(= 81\\).",
        ],
        answer: "\\(81\\) (\\(= |A|^{(n-1)^2} = 3^4\\)).",
      },
      selfCheckExample: {
        prompt: "For a \\(3\\times3\\) matrix \\(A\\) with \\(|A| = 4\\), find \\(|2\\,\\operatorname{adj}(3A)|\\).",
        steps: [
          "\\(\\operatorname{adj}(3A) = 3^{2}\\operatorname{adj}A = 9\\operatorname{adj}A\\).",
          "\\(2\\,\\operatorname{adj}(3A) = 18\\,\\operatorname{adj}A\\); \\(|18\\,\\operatorname{adj}A| = 18^3|\\operatorname{adj}A|\\).",
          "\\(|\\operatorname{adj}A| = |A|^{2} = 16\\); so \\(= 18^3 \\cdot 16 = 5832 \\cdot 16 = 93312\\).",
        ],
        answer: "\\(93312\\) (\\(= 2^3 3^6 \\cdot |A|^2\\)).",
      },
      practiceSet: [
        { prompt: "\\(|\\operatorname{adj}A|\\) for 3×3 with \\(|A| = 3\\)?", answer: "\\(9\\)", method: "\\(|A|^{n-1} = 3^2\\)" },
        { prompt: "\\(\\operatorname{adj}(\\operatorname{adj}A)\\) for 3×3?", answer: "\\(|A|\\,A\\)", method: "\\(|A|^{n-2}A = |A|^1 A\\)" },
        { prompt: "\\(\\operatorname{adj}(kA)\\) for n×n?", answer: "\\(k^{n-1}\\operatorname{adj}A\\)" },
        { prompt: "\\(\\operatorname{adj}(AB) = ?\\)", answer: "\\(\\operatorname{adj}B\\,\\operatorname{adj}A\\) (reversal)" },
        { prompt: "\\(\\operatorname{adj}(A^T) - (\\operatorname{adj}A)^T = ?\\)", answer: "\\(O\\) (null matrix — adjoint commutes with transpose)" },
      ],
      pyqExampleId: "221e8350-71d7-4600-972a-78a6775d559b", // 2026 — |M|·|adj M|
      traps: [
        {
          title: "\\(|\\operatorname{adj}A| = |A|^{\\,n-1}\\), NOT \\(|A|\\) or \\(|A|^n\\)",
          body:
            "The determinant of the adjoint carries the exponent \\(n-1\\), where \\(n\\) is the ORDER. " +
            "For a \\(3\\times3\\) matrix it is \\(|A|^2\\) — students who answer \\(|A|\\) (forgetting the power) " +
            "or \\(|A|^3\\) (over-counting) walk into the two standard distractors.",
        },
        {
          title: "\\(\\operatorname{adj}(AB) = \\operatorname{adj}B\\,\\operatorname{adj}A\\) — the order REVERSES",
          body:
            "Like transpose and inverse, the adjoint of a product flips the factors: " +
            "\\(\\operatorname{adj}(AB) = \\operatorname{adj}B\\,\\operatorname{adj}A\\), not " +
            "\\(\\operatorname{adj}A\\,\\operatorname{adj}B\\). Keeping the original order is the trap.",
        },
      ],
    },

    // C4 — inverse via adjoint
    {
      kind: "formula" as const,
      slug: "inverse-via-adjoint",
      name: "Inverse via the adjoint",
      intuition:
        "Divide the adjoint by the determinant and you have the inverse: " +
        "\\(A^{-1} = \\frac{1}{|A|}\\operatorname{adj}A\\). It exists exactly when \\(|A| \\neq 0\\) " +
        "(non-singular).",
      definition:
        "\\(A^{-1} = \\dfrac{1}{|A|}\\operatorname{adj}A\\), defined iff \\(|A| \\neq 0\\). For " +
        "\\(2\\times2\\): \\(A^{-1} = \\dfrac{1}{ad-bc}\\begin{pmatrix}d&-b\\\\-c&a\\end{pmatrix}\\). " +
        "**2×2 shortcut via Cayley–Hamilton:** since \\(A^2 - (a+d)A + |A|\\,I = O\\), multiplying by " +
        "\\(A^{-1}\\) gives \\(A^{-1} = \\dfrac{(a+d)I - A}{|A|}\\) — no adjoint needed. (The same identity " +
        "reduces any power \\(A^n\\) to a combination of \\(A\\) and \\(I\\).)",
      formula: {
        label: "Inverse formula",
        latex: "A^{-1} = \\frac{1}{|A|}\\operatorname{adj}A \\quad (|A| \\neq 0)",
      },
      authoredExample: {
        prompt: "Find the inverse of \\(A = \\begin{pmatrix}3&5\\\\1&2\\end{pmatrix}\\) using the adjoint.",
        steps: [
          "\\(|A| = 3\\cdot2 - 5\\cdot1 = 1\\).",
          "\\(\\operatorname{adj}A = \\begin{pmatrix}2&-5\\\\-1&3\\end{pmatrix}\\) (swap the diagonal, negate the off-diagonal).",
          "\\(A^{-1} = \\dfrac{1}{|A|}\\operatorname{adj}A = \\begin{pmatrix}2&-5\\\\-1&3\\end{pmatrix}\\).",
        ],
        answer: "\\(A^{-1} = \\begin{pmatrix}2&-5\\\\-1&3\\end{pmatrix}\\).",
      },
      selfCheckExample: {
        prompt: "Find \\(A^{-1}\\) for \\(A = \\begin{pmatrix}2&1\\\\3&2\\end{pmatrix}\\).",
        steps: [
          "\\(|A| = 2\\cdot2 - 1\\cdot3 = 1\\).",
          "\\(\\operatorname{adj}A = \\begin{pmatrix}2&-1\\\\-3&2\\end{pmatrix}\\).",
          "\\(A^{-1} = \\tfrac11\\begin{pmatrix}2&-1\\\\-3&2\\end{pmatrix}\\).",
        ],
        answer: "\\(A^{-1} = \\begin{pmatrix}2&-1\\\\-3&2\\end{pmatrix}\\).",
      },
      practiceSet: [
        { prompt: "\\(A^{-1} = ?\\) in terms of adjoint", answer: "\\(\\frac{1}{|A|}\\operatorname{adj}A\\)" },
        { prompt: "Inverse exists iff?", answer: "\\(|A| \\neq 0\\)" },
        { prompt: "Inverse of \\(\\operatorname{diag}(2,5)\\)?", answer: "\\(\\operatorname{diag}(\\tfrac12,\\tfrac15)\\)" },
        { prompt: "\\(|A^{-1}|\\) in terms of \\(|A|\\)?", answer: "\\(1/|A|\\)" },
        { prompt: "If \\(A^2 - kA - I = O\\), then \\(A^{-1} = ?\\)", answer: "\\(A - kI\\)", method: "\\(A(A-kI)=I\\)" },
      ],
      pyqExampleId: "87243760-4ae1-49fc-adae-c4b57b867aa6", // 2017 — inverse of diagonal
    },

    // C5 — inverse properties
    {
      kind: "formula" as const,
      slug: "inverse-properties",
      name: "Inverse properties and the reversal law",
      intuition:
        "The inverse of a product reverses the order — \\((AB)^{-1} = B^{-1}A^{-1}\\) — exactly like " +
        "transpose and adjoint. Other staples: inverting twice returns \\(A\\), and the determinant of " +
        "the inverse is the reciprocal.",
      definition:
        "Key inverse identities:\n" +
        "- **Reversal:** \\((AB)^{-1} = B^{-1}A^{-1}\\) (order flips)\n" +
        "- **Double inverse:** \\((A^{-1})^{-1} = A\\)\n" +
        "- **Determinant:** \\(\\det(A^{-1}) = 1/\\det A\\)\n" +
        "- **Transpose:** \\((A^T)^{-1} = (A^{-1})^T\\)\n" +
        "- **Scalar:** \\((kA)^{-1} = \\tfrac1k A^{-1}\\)\n" +
        "- **Power:** \\((A^n)^{-1} = (A^{-1})^n\\)",
      formula: {
        label: "Reversal law for inverses",
        latex: "(AB)^{-1} = B^{-1}A^{-1}",
      },
      authoredExample: {
        prompt: "If \\(A\\) and \\(B\\) are invertible of the same order, what is \\((AB)^{-1}\\)?",
        steps: [
          "The inverse of a product reverses the order of factors.",
          "Check: \\((AB)(B^{-1}A^{-1}) = A(BB^{-1})A^{-1} = AIA^{-1} = I\\). ✓",
        ],
        answer: "\\((AB)^{-1} = B^{-1}A^{-1}\\).",
      },
      selfCheckExample: {
        prompt: "Is \\((AB)^{-1} = A^{-1}B^{-1}\\) correct? And what is \\((A^{-1})^{-1}\\)?",
        steps: [
          "\\((AB)^{-1} = B^{-1}A^{-1}\\), NOT \\(A^{-1}B^{-1}\\) (order reverses).",
          "\\((A^{-1})^{-1} = A\\) — undoing the inverse returns the matrix.",
        ],
        answer: "First is false (order reverses); \\((A^{-1})^{-1} = A\\).",
      },
      practiceSet: [
        { prompt: "\\((AB)^{-1} = ?\\)", answer: "\\(B^{-1}A^{-1}\\)" },
        { prompt: "\\((A^{-1})^{-1} = ?\\)", answer: "\\(A\\)" },
        { prompt: "\\(\\det(A^{-1}) = ?\\)", answer: "\\(1/\\det A\\)" },
        { prompt: "\\((A^T)^{-1} = ?\\)", answer: "\\((A^{-1})^T\\)" },
      ],
      pyqExampleId: "aec7ab59-a716-43d2-9b8b-3b0366895500", // 2018 — (AB)^-1
      traps: [
        {
          title: "\\((AB)^{-1} = B^{-1}A^{-1}\\), NOT \\(A^{-1}B^{-1}\\)",
          body:
            "The inverse of a product **reverses** the order of factors — the single most-missed inverse fact. " +
            "It must, so that \\((AB)(B^{-1}A^{-1}) = A(BB^{-1})A^{-1} = I\\). Writing \\(A^{-1}B^{-1}\\) is the trap.",
        },
        {
          title: "\\((A^T)^{-1} = (A^{-1})^T\\) — don't drop the transpose",
          body:
            "Transpose and inverse **commute**: \\((A^T)^{-1} = (A^{-1})^T\\). The slip is to compute \\(A^{-1}\\) " +
            "and forget to transpose it (or vice-versa), reporting plain \\(A^{-1}\\) as the answer.",
        },
      ],
    },

    // C6 — inverse of special matrices
    {
      kind: "formula" as const,
      slug: "inverse-of-special-matrices",
      name: "Inverses of special matrices",
      intuition:
        "Some inverses need no adjoint at all: a diagonal matrix inverts entrywise, and an orthogonal " +
        "(or rotation) matrix has \\(A^{-1} = A^T\\). Recognise the type and write the inverse down.",
      definition:
        "**Diagonal:** \\(\\operatorname{diag}(d_i)^{-1} = \\operatorname{diag}(1/d_i)\\). " +
        "**Orthogonal / rotation:** \\(A^{-1} = A^T\\) (and for a rotation \\(R(\\theta)^{-1} = R(-\\theta)\\)). " +
        "**Involutory:** \\(A^{-1} = A\\). Use these instead of the adjoint route when the type is clear.",
      formula: {
        label: "Inverses of special matrices",
        latex: "\\operatorname{diag}(d_i)^{-1} = \\operatorname{diag}(1/d_i) \\qquad \\text{orthogonal: } A^{-1} = A^T \\qquad R(\\theta)^{-1} = R(-\\theta) \\qquad \\text{involutory: } A^{-1} = A",
      },
      authoredExample: {
        prompt: "Find the inverse of \\(A = \\begin{pmatrix}0&1\\\\1&0\\end{pmatrix}\\).",
        steps: [
          "Compute \\(A^2 = \\begin{pmatrix}0&1\\\\1&0\\end{pmatrix}\\begin{pmatrix}0&1\\\\1&0\\end{pmatrix} = \\begin{pmatrix}1&0\\\\0&1\\end{pmatrix} = I\\).",
          "\\(A^2 = I\\) means \\(A\\) is **involutory**, so \\(A^{-1} = A\\).",
        ],
        answer: "\\(A^{-1} = A = \\begin{pmatrix}0&1\\\\1&0\\end{pmatrix}\\).",
      },
      practiceSet: [
        { prompt: "Inverse of an orthogonal matrix?", answer: "\\(A^T\\)" },
        { prompt: "Inverse of \\(\\operatorname{diag}(3,4)\\)?", answer: "\\(\\operatorname{diag}(\\tfrac13,\\tfrac14)\\)" },
        { prompt: "Inverse of a rotation \\(R(\\theta)\\)?", answer: "\\(R(-\\theta)\\)" },
        { prompt: "Inverse of an involutory matrix (\\(A^2=I\\))?", answer: "\\(A\\) itself" },
      ],
      pyqExampleId: "12445ecd-4d68-4347-88e9-0fbc530795c8", // 2018 — inverse of rotation
    },
  ],
};
