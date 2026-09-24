import type { SubtopicNote } from "@/app/notes/_types";

export const CAYLEY_HAMILTON_NOTE: SubtopicNote = {
  subtopicName: "Cayley–Hamilton, Matrix Polynomials and Powers",
  title: "Cayley–Hamilton, Matrix Polynomials and Powers",
  oneLineDefinition:
    "Every 2 × 2 matrix satisfies A² − (trace)A + |A|I = 0 — so A⁻¹ is a combination αI + βA, a factored polynomial in A gives A⁻¹ in one line, and powers of A cycle.",
  whyItMatters:
    "10 PYQs at 50% HARD, and one stem — A⁻¹ = αI + βA for the same 2 × 2 matrix — has been set five times in three years, asked for α − β, α + β, x and y, or 2x + 3y. " +
    "The rest of the page is the same theorem read differently: a matrix given by (A − 3I)(A − 5I) = 0, an inverse of A + 3I from A² − 4A + 3I = 0, and a power A²⁰²⁹ that collapses because A³ is a scalar. " +
    "Nothing here needs the adjoint; that is the point of the page.",
  concepts: [
    // 1 — the theorem
    {
      kind: "formula" as const,
      slug: "cetdm-cayley-hamilton-for-2x2",
      name: "Cayley–Hamilton for 2 × 2: A² − (tr A)A + |A|·I = 0",
      intuition:
        "A matrix satisfies its own characteristic equation. For \\(2 \\times 2\\) that equation is \\(\\lambda^2 - (\\text{trace})\\lambda + \\det = 0\\), so \\(A^2\\) is always a combination of \\(A\\) and \\(I\\) — which is why every higher power and the inverse reduce to \\(\\alpha I + \\beta A\\).",
      definition:
        "- **Trace** \\(\\operatorname{tr}A = a + d\\); **determinant** \\(|A| = ad - bc\\). Then \\(A^2 - (a + d)A + (ad - bc)I = O\\).\n" +
        "- For \\(A = \\begin{pmatrix} 1 & -1 \\\\ 2 & 3 \\end{pmatrix}\\): trace \\(4\\), determinant \\(5\\), so \\(A^2 - 4A + 5I\\) is the **null matrix** — no multiplication needed.\n" +
        "- Consequences: \\(A^2 = (\\operatorname{tr}A)A - |A|I\\); multiply by \\(A^{-1}\\): \\(A = (\\operatorname{tr}A)I - |A|A^{-1}\\), so \\(A^{-1} = \\dfrac{(\\operatorname{tr}A)I - A}{|A|}\\).\n" +
        "- Verify the theorem on any \\(2 \\times 2\\) once by direct multiplication; after that, quote it.",
      formula: {
        label: "Cayley–Hamilton (2 × 2)",
        latex:
          "A^2 - (\\operatorname{tr}A)\\,A + |A|\\,I = O \\qquad A^{-1} = \\frac{(\\operatorname{tr}A)\\,I - A}{|A|}",
        symbols: [
          { symbol: "\\(\\operatorname{tr}A\\)", meaning: "sum of the diagonal entries" },
          { symbol: "\\(O\\)", meaning: "the zero matrix" },
        ],
      },
      authoredExample: {
        prompt: "For \\(A = \\begin{pmatrix} 2 & 1 \\\\ 1 & 3 \\end{pmatrix}\\), find \\(A^2 - 5A + 5I\\) without computing \\(A^2\\).",
        steps: [
          "\\(\\operatorname{tr}A = 5\\), \\(|A| = 6 - 1 = 5\\).",
          "Cayley–Hamilton: \\(A^2 - 5A + 5I = O\\).",
        ],
        answer: "The null matrix \\(O\\).",
      },
      selfCheckExample: {
        prompt: "For \\(A = \\begin{pmatrix} 3 & 1 \\\\ -1 & 2 \\end{pmatrix}\\), express \\(A^2\\) as a combination of \\(A\\) and \\(I\\).",
        steps: [
          "\\(\\operatorname{tr}A = 5\\), \\(|A| = 6 + 1 = 7\\).",
          "\\(A^2 = 5A - 7I\\).",
        ],
        answer: "\\(A^2 = 5A - 7I\\)",
      },
      practiceSet: [
        {
          prompt: "Trace of \\(\\begin{pmatrix} 4 & 9 \\\\ 2 & -1 \\end{pmatrix}\\)?",
          answer: "\\(3\\)",
        },
        {
          prompt: "Characteristic equation of \\(\\begin{pmatrix} 1 & 2 \\\\ -1 & 4 \\end{pmatrix}\\)?",
          answer: "\\(\\lambda^2 - 5\\lambda + 6 = 0\\)",
        },
        {
          prompt: "If \\(A^2 - 4A + 5I = O\\), then \\(A^{-1} = ?\\)",
          answer: "\\(\\dfrac{4I - A}{5}\\)",
        },
        {
          prompt: "For a \\(2 \\times 2\\) matrix with trace \\(0\\) and determinant \\(1\\), \\(A^2 = ?\\)",
          answer: "\\(-I\\)",
        },
      ],
      pyqExampleId: "d8ac1a14-cc9a-443c-bd5a-68a789fd5553",
      traps: [
        {
          title: "Sign of the determinant term",
          body:
            "It is \\(A^2 - (\\operatorname{tr}A)A + |A|I\\): minus the trace, PLUS the determinant. Writing \\(-|A|I\\) turns a null-matrix answer into a wrong 'symmetric matrix' option.",
        },
      ],
    },

    // 2 — inverse as alpha I + beta A
    {
      kind: "formula" as const,
      slug: "cetdm-inverse-as-alpha-i-plus-beta-a",
      name: "A⁻¹ = αI + βA: Read α and β From the Theorem",
      intuition:
        "Rearranging Cayley–Hamilton gives \\(A^{-1} = \\dfrac{\\operatorname{tr}A}{|A|}I - \\dfrac{1}{|A|}A\\). So \\(\\alpha = \\dfrac{\\operatorname{tr}A}{|A|}\\) and \\(\\beta = -\\dfrac{1}{|A|}\\), with no adjoint and no entry-matching.",
      definition:
        "- From \\(A^2 - tA + dI = O\\) (\\(t = \\operatorname{tr}A\\), \\(d = |A|\\)): \\(A^{-1} = \\dfrac{t}{d}I - \\dfrac1d A\\). Hence \\(\\alpha = \\dfrac{t}{d}\\), \\(\\beta = -\\dfrac1d\\).\n" +
        "- \\(A = \\begin{pmatrix} 1 & 2 \\\\ -1 & 4 \\end{pmatrix}\\): \\(t = 5\\), \\(d = 6\\), so \\(\\alpha = \\dfrac56\\), \\(\\beta = -\\dfrac16\\); then \\(4(\\alpha - \\beta) = 4\\), \\(4(\\alpha + \\beta) = \\dfrac83\\).\n" +
        "- \\(A = \\begin{pmatrix} 1 & 2 \\\\ -5 & 1 \\end{pmatrix}\\) with \\(A^{-1} = xA + yI\\): \\(t = 2\\), \\(d = 11\\), so \\(x = -\\dfrac{1}{11}\\), \\(y = \\dfrac{2}{11}\\), and \\(2x + 3y = \\dfrac{4}{11}\\).\n" +
        "- Cross-check by entry-matching if time allows: the \\((1,2)\\) entry of \\(\\alpha I + \\beta A\\) is \\(2\\beta\\), which must equal the \\((1,2)\\) entry of \\(\\dfrac{\\operatorname{adj}A}{|A|}\\).\n" +
        "- Read what is asked: \\(\\alpha - \\beta\\), \\(\\alpha + \\beta\\), \\((x, y)\\) or a weighted sum — the same matrix has been asked all four ways.",
      formula: {
        label: "Inverse as a combination",
        latex:
          "A^{-1} = \\alpha I + \\beta A \\ \\text{ with } \\ \\alpha = \\frac{\\operatorname{tr}A}{|A|},\\ \\beta = -\\frac{1}{|A|}",
      },
      authoredExample: {
        prompt: "For \\(A = \\begin{pmatrix} 3 & 1 \\\\ 2 & 4 \\end{pmatrix}\\), write \\(A^{-1} = \\alpha I + \\beta A\\) and find \\(\\alpha + \\beta\\).",
        steps: [
          "\\(\\operatorname{tr}A = 7\\), \\(|A| = 12 - 2 = 10\\).",
          "\\(\\alpha = \\dfrac{7}{10}\\), \\(\\beta = -\\dfrac{1}{10}\\).",
          "\\(\\alpha + \\beta = \\dfrac{6}{10} = \\dfrac35\\). Check the \\((1,2)\\) entry: \\((\\beta A)_{12} = \\beta \\cdot 1 = -\\dfrac{1}{10}\\), and \\(\\left(\\dfrac{\\operatorname{adj}A}{|A|}\\right)_{12} = \\dfrac{-1}{10}\\). Consistent.",
        ],
        answer: "\\(\\alpha + \\beta = \\dfrac35\\)",
      },
      selfCheckExample: {
        prompt: "For \\(A = \\begin{pmatrix} 2 & 3 \\\\ 1 & 4 \\end{pmatrix}\\) with \\(A^{-1} = xA + yI\\), find \\(x\\) and \\(y\\).",
        steps: [
          "\\(\\operatorname{tr}A = 6\\), \\(|A| = 8 - 3 = 5\\).",
          "\\(x = -\\dfrac15\\), \\(y = \\dfrac65\\).",
        ],
        answer: "\\(x = -\\dfrac15,\\ y = \\dfrac65\\)",
      },
      practiceSet: [
        {
          prompt: "For trace \\(5\\) and determinant \\(6\\), \\(\\alpha = ?\\)",
          answer: "\\(\\dfrac56\\)",
        },
        {
          prompt: "For determinant \\(11\\), \\(\\beta = ?\\)",
          answer: "\\(-\\dfrac{1}{11}\\)",
        },
        {
          prompt: "If \\(\\alpha = \\dfrac56\\), \\(\\beta = -\\dfrac16\\), then \\(4(\\alpha - \\beta) = ?\\)",
          answer: "\\(4\\)",
        },
        {
          prompt: "If \\(x = -\\dfrac{1}{11}\\), \\(y = \\dfrac{2}{11}\\), then \\(2x + 3y = ?\\)",
          answer: "\\(\\dfrac{4}{11}\\)",
        },
      ],
      pyqExampleId: "33597e5e-e620-4bf4-8a4a-935509105f94",
      traps: [
        {
          title: "α from the wrong entry",
          body:
            "Matching the \\((1,1)\\) entry gives \\(\\alpha + \\beta\\), not \\(\\alpha\\) — for \\(\\begin{pmatrix} 1 & 2 \\\\ -1 & 4 \\end{pmatrix}\\) that is \\(\\frac23\\), and reading it as \\(\\alpha\\) makes \\(4(\\alpha - \\beta) = \\frac{10}{3}\\), which is offered. \\(\\alpha = \\operatorname{tr}A/|A| = \\frac56\\).",
        },
      ],
    },

    // 3 — given factored polynomial
    {
      kind: "formula" as const,
      slug: "cetdm-factored-matrix-polynomial-gives-the-inverse",
      name: "A Factored Polynomial in A Gives A⁻¹ in One Line",
      intuition:
        "\\((A - 3I)(A - 5I) = O\\) expands to \\(A^2 - 8A + 15I = O\\). Multiply through by \\(A^{-1}\\) and the inverse appears: \\(15A^{-1} = 8I - A\\). No entries, no adjoint — the relation IS the inverse.",
      definition:
        "- Expand the given factorisation (matrices with \\(I\\) commute, so ordinary algebra applies): \\((A - 3I)(A - 5I) = A^2 - 8A + 15I\\).\n" +
        "- Multiply by \\(A^{-1}\\) (\\(A\\) non-singular): \\(A - 8I + 15A^{-1} = O\\), so \\(A^{-1} = \\dfrac{8I - A}{15}\\), i.e. \\(\\dfrac{15}{8}A^{-1} = I - \\dfrac18A\\); and \\(\\alpha A + \\beta A^{-1} = 4I\\) is matched by \\(\\alpha = \\dfrac12\\), \\(\\beta = \\dfrac{15}{2}\\), sum \\(8\\).\n" +
        "- **Inverse of a shifted matrix**: from \\(A^2 - 4A + 3I = O\\), write \\(A^2 - 4A + 3I = (A + 3I)(A - 7I) + 24I\\), so \\((A + 3I)(A - 7I) = -24I\\) and \\((A + 3I)^{-1} = \\dfrac{7I - A}{24}\\). Choose the second factor so that the product's constant term matches.\n" +
        "- The technique: treat \\(A\\) like a number in polynomial identities, but never divide by a matrix — multiply by the inverse instead.",
      formula: {
        label: "From a polynomial relation to the inverse",
        latex:
          "A^2 - pA + qI = O \\ (q \\ne 0) \\ \\Rightarrow\\ A^{-1} = \\frac{pI - A}{q} \\qquad (A + kI)^{-1}:\\ \\text{write } A^2 - pA + qI = (A + kI)(A - mI) + cI",
      },
      authoredExample: {
        prompt: "If \\(A\\) is non-singular and \\((A - 2I)(A - 4I) = O\\), express \\(A^{-1}\\) in terms of \\(A\\) and \\(I\\).",
        steps: [
          "Expand: \\(A^2 - 6A + 8I = O\\).",
          "Multiply by \\(A^{-1}\\): \\(A - 6I + 8A^{-1} = O\\).",
          "\\(A^{-1} = \\dfrac{6I - A}{8}\\).",
        ],
        answer: "\\(A^{-1} = \\dfrac{6I - A}{8}\\)",
      },
      selfCheckExample: {
        prompt: "If \\(A^2 - 5A + 6I = O\\), find \\((A - I)^{-1}\\).",
        steps: [
          "\\((A - I)(A - 4I) = A^2 - 5A + 4I = (A^2 - 5A + 6I) - 2I = -2I\\).",
          "So \\((A - I)\\cdot\\dfrac{A - 4I}{-2} = I\\), i.e. \\((A - I)^{-1} = \\dfrac{4I - A}{2}\\).",
        ],
        answer: "\\((A - I)^{-1} = \\dfrac{4I - A}{2}\\)",
      },
      practiceSet: [
        {
          prompt: "\\((A - 3I)(A - 5I) = ?\\)",
          answer: "\\(A^2 - 8A + 15I\\)",
        },
        {
          prompt: "From \\(A^2 - 8A + 15I = O\\), \\(A^{-1} = ?\\)",
          answer: "\\(\\dfrac{8I - A}{15}\\)",
        },
        {
          prompt: "\\((A + 3I)(A - 7I) = ?\\) in terms of \\(A^2 - 4A\\)",
          answer: "\\(A^2 - 4A - 21I\\)",
        },
        {
          prompt: "If \\(A^2 = 3A\\) and \\(A\\) is invertible, \\(A = ?\\)",
          answer: "\\(3I\\)",
        },
      ],
      pyqExampleId: "408adcdd-cbad-4f7c-8bc6-76c18fd8b72f",
      traps: [
        {
          title: "Concluding A = 3I or A = 5I",
          body:
            "\\((A - 3I)(A - 5I) = O\\) does NOT force either factor to be zero — matrices have zero divisors. The information is the polynomial relation, and only that.",
        },
      ],
    },

    // 4 — powers cycle
    {
      kind: "formula" as const,
      slug: "cetdm-powers-of-a-matrix-cycle",
      name: "Powers of a Matrix: Find the Cycle",
      intuition:
        "For \\(A = \\begin{pmatrix} i & 1 \\\\ 1 & 0 \\end{pmatrix}\\), \\(A^3\\) turns out to be \\(iI\\), a scalar. Then \\(A^{12} = (iI)^4 = I\\), and \\(A^{2029}\\) is just \\(A\\) — the exponent only matters modulo the cycle length.",
      definition:
        "- Compute \\(A^2\\), \\(A^3\\), … until a scalar multiple of \\(I\\) (or \\(I\\) itself) appears. If \\(A^m = cI\\), then \\(A^{mk} = c^kI\\).\n" +
        "- \\(A = \\begin{pmatrix} i & 1 \\\\ 1 & 0 \\end{pmatrix}\\): \\(A^2 = \\begin{pmatrix} 0 & i \\\\ i & 1 \\end{pmatrix}\\), \\(A^3 = iI\\), so \\(A^{12} = i^4I = I\\). \\(2029 = 12\\cdot169 + 1\\), hence \\(A^{2029} = A\\).\n" +
        "- The inverse of \\(A^{2029}\\) is then \\(A^{-1} = \\dfrac{\\operatorname{adj}A}{|A|}\\) with \\(|A| = -1\\): \\(-\\operatorname{adj}A\\).\n" +
        "- Cayley–Hamilton is the general engine: \\(A^2 = tA - dI\\) lets any power be reduced to \\(pA + qI\\) step by step; a cycle appears when \\(A^m\\) lands on \\(cI\\).",
      formula: {
        label: "Powers modulo a cycle",
        latex:
          "A^m = cI \\ \\Rightarrow\\ A^{mk + r} = c^k A^r \\qquad \\begin{pmatrix} i & 1 \\\\ 1 & 0 \\end{pmatrix}^3 = iI,\\quad i^4 = 1",
      },
      authoredExample: {
        prompt: "For \\(A = \\begin{pmatrix} 0 & 1 \\\\ -1 & 0 \\end{pmatrix}\\), find \\(A^{101}\\).",
        steps: [
          "\\(A^2 = \\begin{pmatrix} -1 & 0 \\\\ 0 & -1 \\end{pmatrix} = -I\\), so \\(A^4 = I\\).",
          "\\(101 = 4\\cdot25 + 1\\), hence \\(A^{101} = A\\).",
        ],
        answer: "\\(A^{101} = A = \\begin{pmatrix} 0 & 1 \\\\ -1 & 0 \\end{pmatrix}\\)",
      },
      selfCheckExample: {
        prompt: "If \\(A^3 = 2I\\), find \\(A^{10}\\) in terms of \\(A\\).",
        steps: [
          "\\(A^{10} = A^9\\cdot A = (A^3)^3A = 8I\\cdot A\\).",
        ],
        answer: "\\(A^{10} = 8A\\)",
      },
      practiceSet: [
        {
          prompt: "If \\(A^3 = iI\\), then \\(A^{12} = ?\\)",
          answer: "\\(I\\)",
        },
        {
          prompt: "\\(2029 \\bmod 12 = ?\\)",
          answer: "\\(1\\)",
        },
        {
          prompt: "If \\(A^2 = -I\\), then \\(A^{-1} = ?\\)",
          answer: "\\(-A\\)",
        },
        {
          prompt: "For \\(|A| = -1\\), \\(A^{-1} = ?\\) in terms of \\(\\operatorname{adj}A\\)",
          answer: "\\(-\\operatorname{adj}A\\)",
        },
      ],
      pyqExampleId: "3698e538-fe8b-4457-9106-1d6d61bfcbc9",
      traps: [
        {
          title: "Reducing 2029 modulo 3 instead of 12",
          body:
            "\\(A^3 = iI\\) is a scalar but NOT the identity; the cycle closes at \\(A^{12} = I\\). Using \\(3\\) gives \\(A^{2029} = A^{1}\\cdot i^{676} = A\\) only by luck of the arithmetic — reduce modulo the exponent at which the power returns to \\(I\\).",
        },
      ],
    },
  ],
  related: [
    {
      label: "Inverse of a Matrix — the adjoint route to the same α and β",
      href: "/notes/mht-cet-maths/determinants-and-matrices/cetdm-inverse",
    },
  ],
};
