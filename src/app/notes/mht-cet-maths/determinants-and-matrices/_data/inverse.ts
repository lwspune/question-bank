import type { SubtopicNote } from "@/app/notes/_types";

export const INVERSE_NOTE: SubtopicNote = {
  subtopicName: "Inverse of a Matrix — Adjoint Formula, Products and Verification",
  title: "Inverse of a Matrix — Adjoint Formula, Products and Verification",
  oneLineDefinition:
    "A⁻¹ = adj(A)/|A| — for a 2 × 2 that is swap-the-diagonal, negate-the-off-diagonal, divide by the determinant — and (AB)⁻¹ = B⁻¹A⁻¹ handles anything built from products.",
  whyItMatters:
    "15 PYQs at 33% HARD — the chapter's steady marks. A plain 2 × 2 inverse is set most years, and the HARD variants only add one step before it: compute A² − 5A or A + B first, or notice that a matrix with tan x or cot(θ/2) entries has a trigonometric determinant and an adjoint equal to its transpose. " +
    "The two-matrix stems — (AB)⁻¹ given, find B⁻¹ — and the unknown-entries stems are the same fact, AA⁻¹ = I, read in two directions.",
  concepts: [
    // 1 — 2x2 inverse
    {
      kind: "formula" as const,
      slug: "cetdm-inverse-of-a-2x2-matrix",
      name: "Inverse of a 2 × 2 Matrix",
      intuition:
        "Since \\(A\\,\\operatorname{adj}A = |A|\\,I\\), dividing the adjoint by the determinant gives a matrix that multiplies \\(A\\) to the identity. For \\(2 \\times 2\\) the adjoint is a swap and two sign changes, so the inverse takes ten seconds.",
      definition:
        "- \\(A^{-1} = \\dfrac{1}{|A|}\\operatorname{adj}A\\), defined only when \\(|A| \\ne 0\\).\n" +
        "- \\(\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}^{-1} = \\dfrac{1}{ad - bc}\\begin{pmatrix} d & -b \\\\ -c & a \\end{pmatrix}\\).\n" +
        "- The options are usually written with the scalar outside: \\(\\dfrac{1}{14}\\begin{pmatrix} 3 & 2 \\\\ -4 & 2 \\end{pmatrix}\\); match the sign of the scalar AND the signs inside — \\(-\\dfrac{1}{14}\\begin{pmatrix} 3 & 2 \\\\ -4 & 2 \\end{pmatrix}\\) is a different matrix.\n" +
        "- A matrix with \\(|A| = 1\\) (like \\(\\begin{pmatrix} 0.8 & -0.6 \\\\ 0.6 & 0.8 \\end{pmatrix}\\)) has \\(A^{-1} = \\operatorname{adj}A\\); a rotation-type matrix has \\(A^{-1} = A^T\\).\n" +
        "- Verify when in doubt: \\(AA^{-1}\\) must be \\(I\\).",
      formula: {
        label: "2 × 2 inverse",
        latex:
          "\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}^{-1} = \\frac{1}{ad - bc}\\begin{pmatrix} d & -b \\\\ -c & a \\end{pmatrix}, \\quad ad - bc \\ne 0",
      },
      authoredExample: {
        prompt: "Find the inverse of \\(A = \\begin{pmatrix} 4 & 3 \\\\ 2 & 5 \\end{pmatrix}\\).",
        steps: [
          "\\(|A| = 20 - 6 = 14\\).",
          "\\(\\operatorname{adj}A = \\begin{pmatrix} 5 & -3 \\\\ -2 & 4 \\end{pmatrix}\\).",
          "\\(A^{-1} = \\dfrac{1}{14}\\begin{pmatrix} 5 & -3 \\\\ -2 & 4 \\end{pmatrix}\\).",
        ],
        answer: "\\(\\dfrac{1}{14}\\begin{pmatrix} 5 & -3 \\\\ -2 & 4 \\end{pmatrix}\\)",
      },
      selfCheckExample: {
        prompt: "Find the inverse of \\(\\begin{pmatrix} 1 & 2 \\\\ 3 & 7 \\end{pmatrix}\\) and verify by multiplication.",
        steps: [
          "\\(|A| = 7 - 6 = 1\\), so \\(A^{-1} = \\operatorname{adj}A = \\begin{pmatrix} 7 & -2 \\\\ -3 & 1 \\end{pmatrix}\\).",
          "\\(\\begin{pmatrix} 1 & 2 \\\\ 3 & 7 \\end{pmatrix}\\begin{pmatrix} 7 & -2 \\\\ -3 & 1 \\end{pmatrix} = \\begin{pmatrix} 1 & 0 \\\\ 0 & 1 \\end{pmatrix}\\).",
        ],
        answer: "\\(\\begin{pmatrix} 7 & -2 \\\\ -3 & 1 \\end{pmatrix}\\)",
      },
      practiceSet: [
        {
          prompt: "\\(\\begin{pmatrix} 2 & 1 \\\\ 1 & 1 \\end{pmatrix}^{-1} = ?\\)",
          answer: "\\(\\begin{pmatrix} 1 & -1 \\\\ -1 & 2 \\end{pmatrix}\\)",
        },
        {
          prompt: "\\(\\begin{pmatrix} 3 & 0 \\\\ 0 & 5 \\end{pmatrix}^{-1} = ?\\)",
          answer: "\\(\\begin{pmatrix} 1/3 & 0 \\\\ 0 & 1/5 \\end{pmatrix}\\)",
        },
        {
          prompt: "Does \\(\\begin{pmatrix} 2 & 4 \\\\ 1 & 2 \\end{pmatrix}\\) have an inverse?",
          answer: "No — determinant \\(0\\).",
        },
        {
          prompt: "Inverse of \\(\\begin{pmatrix} 0 & 1 \\\\ -1 & 0 \\end{pmatrix}\\)?",
          answer: "\\(\\begin{pmatrix} 0 & -1 \\\\ 1 & 0 \\end{pmatrix}\\)",
        },
      ],
      pyqExampleId: "9818d24a-07dc-41aa-a28b-9342d8c22dac",
      traps: [
        {
          title: "Swapping signs on the diagonal instead of the off-diagonal",
          body:
            "The adjoint of \\(\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}\\) is \\(\\begin{pmatrix} d & -b \\\\ -c & a \\end{pmatrix}\\): the diagonal entries SWAP places and keep their signs; the off-diagonal entries stay put and change sign. Every option list contains the other three sign patterns.",
        },
      ],
    },

    // 2 — inverse of an expression
    {
      kind: "formula" as const,
      slug: "cetdm-inverse-of-a-matrix-expression",
      name: "Invert an Expression: Compute A² − 5A or A + B First, Then Invert",
      intuition:
        "\\((A^2 - 5A)^{-1}\\) is not \\((A^2)^{-1} - (5A)^{-1}\\). Multiply out \\(A^2\\), subtract \\(5A\\), and invert the single \\(2 \\times 2\\) matrix that results — the difficulty is arithmetic discipline, not theory.",
      definition:
        "- Compute the expression entry by entry first: \\(A^2 = A\\cdot A\\), then combine, then invert the result.\n" +
        "- For \\(A = \\begin{pmatrix} 2 & 1 \\\\ 7 & 4 \\end{pmatrix}\\): \\(A^2 - 5A = \\begin{pmatrix} 1 & 1 \\\\ 7 & 3 \\end{pmatrix}\\), determinant \\(-4\\), inverse \\(\\dfrac14\\begin{pmatrix} -3 & 1 \\\\ 7 & -1 \\end{pmatrix}\\).\n" +
        "- \\((A + B)^{-1}\\): add first — \\((A + B)^{-1} \\ne A^{-1} + B^{-1}\\).\n" +
        "- A power with a parameter: \\(A = \\begin{pmatrix} x & 1 \\\\ 1 & 0 \\end{pmatrix}\\) gives \\(A^4 = \\begin{pmatrix} x^4 + 3x^2 + 1 & x^3 + 2x \\\\ x^3 + 2x & x^2 + 1 \\end{pmatrix}\\); \\(a_{11} = 109\\) forces \\(x = 3\\), \\(A^4 = \\begin{pmatrix} 109 & 33 \\\\ 33 & 10 \\end{pmatrix}\\) with determinant \\(1\\), so its inverse is \\(\\begin{pmatrix} 10 & -33 \\\\ -33 & 109 \\end{pmatrix}\\).\n" +
        "- Factor out a scalar at the end: \\(\\dfrac{1}{475}\\begin{pmatrix} 35 & 15 \\\\ 15 & 20 \\end{pmatrix} = \\dfrac{1}{95}\\begin{pmatrix} 7 & 3 \\\\ 3 & 4 \\end{pmatrix}\\) — the options are reduced.",
      formula: {
        label: "Order of operations",
        latex:
          "(A^2 - 5A)^{-1} = \\left(\\text{the matrix } A^2 - 5A\\right)^{-1} \\ne (A^2)^{-1} - (5A)^{-1}, \\qquad (A + B)^{-1} \\ne A^{-1} + B^{-1}",
      },
      authoredExample: {
        prompt: "For \\(A = \\begin{pmatrix} 1 & 2 \\\\ 0 & 1 \\end{pmatrix}\\), find \\((A^2 + A)^{-1}\\).",
        steps: [
          "\\(A^2 = \\begin{pmatrix} 1 & 4 \\\\ 0 & 1 \\end{pmatrix}\\), so \\(A^2 + A = \\begin{pmatrix} 2 & 6 \\\\ 0 & 2 \\end{pmatrix}\\).",
          "Determinant \\(4\\); adjoint \\(\\begin{pmatrix} 2 & -6 \\\\ 0 & 2 \\end{pmatrix}\\).",
          "Inverse \\(= \\dfrac14\\begin{pmatrix} 2 & -6 \\\\ 0 & 2 \\end{pmatrix} = \\dfrac12\\begin{pmatrix} 1 & -3 \\\\ 0 & 1 \\end{pmatrix}\\).",
        ],
        answer: "\\(\\dfrac12\\begin{pmatrix} 1 & -3 \\\\ 0 & 1 \\end{pmatrix}\\)",
      },
      selfCheckExample: {
        prompt: "For \\(A = \\begin{pmatrix} 1 & 0 \\\\ 2 & 1 \\end{pmatrix}\\) and \\(B = \\begin{pmatrix} 1 & 1 \\\\ 0 & 3 \\end{pmatrix}\\), find \\((A + B)^{-1}\\).",
        steps: [
          "\\(A + B = \\begin{pmatrix} 2 & 1 \\\\ 2 & 4 \\end{pmatrix}\\), determinant \\(6\\).",
          "Inverse \\(= \\dfrac16\\begin{pmatrix} 4 & -1 \\\\ -2 & 2 \\end{pmatrix}\\).",
        ],
        answer: "\\(\\dfrac16\\begin{pmatrix} 4 & -1 \\\\ -2 & 2 \\end{pmatrix}\\)",
      },
      pyqExampleId: "df815944-cc45-49a1-8c0e-ad6a98af4f0b",
      traps: [
        {
          title: "Distributing the inverse over a sum",
          body:
            "There is no rule for \\((A + B)^{-1}\\) or \\((A^2 - 5A)^{-1}\\) except to form the matrix and invert it. The distractors are exactly what distributing produces.",
        },
      ],
    },

    // 3 — trig matrices
    {
      kind: "formula" as const,
      slug: "cetdm-trig-matrices-adjoint-equals-transpose",
      name: "Matrices with tan x Entries: |A| = sec²x and adj A = Aᵀ",
      intuition:
        "\\(A = \\begin{pmatrix} 1 & \\tan x \\\\ -\\tan x & 1 \\end{pmatrix}\\) has determinant \\(1 + \\tan^2x = \\sec^2x\\), and its adjoint is exactly its transpose. So \\(A^{-1} = \\cos^2x\\,A^T\\), and \\(A^TA^{-1}\\) turns out to be a rotation by \\(2x\\).",
      definition:
        "- For \\(A = \\begin{pmatrix} 1 & t \\\\ -t & 1 \\end{pmatrix}\\): \\(|A| = 1 + t^2\\), \\(\\operatorname{adj}A = \\begin{pmatrix} 1 & -t \\\\ t & 1 \\end{pmatrix} = A^T\\), so \\(A^{-1} = \\dfrac{A^T}{1 + t^2}\\).\n" +
        "- With \\(t = \\tan x\\): \\(A^TA^{-1} = \\dfrac{(A^T)^2}{1 + \\tan^2x} = \\dfrac{1}{1 + \\tan^2x}\\begin{pmatrix} 1 - \\tan^2x & -2\\tan x \\\\ 2\\tan x & 1 - \\tan^2x \\end{pmatrix} = \\begin{pmatrix} \\cos 2x & -\\sin 2x \\\\ \\sin 2x & \\cos 2x \\end{pmatrix}\\).\n" +
        "- With \\(t = \\cot\\dfrac{\\theta}{2}\\): \\(|A| = \\csc^2\\dfrac{\\theta}{2}\\), so \\(A^{-1} = \\sin^2\\dfrac{\\theta}{2}\\,A^T = \\dfrac{1 - \\cos\\theta}{2}A^T\\).\n" +
        "- The identities used: \\(\\dfrac{1 - \\tan^2x}{1 + \\tan^2x} = \\cos 2x\\), \\(\\dfrac{2\\tan x}{1 + \\tan^2x} = \\sin 2x\\), \\(\\sin^2\\dfrac{\\theta}{2} = \\dfrac{1 - \\cos\\theta}{2}\\).",
      formula: {
        label: "The tan-entry matrix",
        latex:
          "A = \\begin{pmatrix} 1 & \\tan x \\\\ -\\tan x & 1 \\end{pmatrix}:\\ |A| = \\sec^2x,\\ \\operatorname{adj}A = A^T,\\ A^{-1} = \\cos^2x\\,A^T,\\ A^TA^{-1} = \\begin{pmatrix} \\cos 2x & -\\sin 2x \\\\ \\sin 2x & \\cos 2x \\end{pmatrix}",
      },
      authoredExample: {
        prompt: "For \\(A = \\begin{pmatrix} 1 & \\tan x \\\\ -\\tan x & 1 \\end{pmatrix}\\), find \\(A^{-1}\\) in terms of \\(A^T\\).",
        steps: [
          "\\(|A| = 1 + \\tan^2x = \\sec^2x\\).",
          "\\(\\operatorname{adj}A = \\begin{pmatrix} 1 & -\\tan x \\\\ \\tan x & 1 \\end{pmatrix} = A^T\\).",
          "\\(A^{-1} = \\dfrac{A^T}{\\sec^2x} = \\cos^2x\\,A^T\\).",
        ],
        answer: "\\(A^{-1} = \\cos^2x\\,A^T\\)",
      },
      selfCheckExample: {
        prompt: "Show that \\(A = \\begin{pmatrix} \\cos\\theta & -\\sin\\theta \\\\ \\sin\\theta & \\cos\\theta \\end{pmatrix}\\) satisfies \\(A^{-1} = A^T\\).",
        steps: [
          "\\(|A| = \\cos^2\\theta + \\sin^2\\theta = 1\\), so \\(A^{-1} = \\operatorname{adj}A = \\begin{pmatrix} \\cos\\theta & \\sin\\theta \\\\ -\\sin\\theta & \\cos\\theta \\end{pmatrix} = A^T\\).",
        ],
        answer: "\\(A^{-1} = A^T\\) (a rotation matrix is orthogonal).",
      },
      practiceSet: [
        {
          prompt: "\\(\\dfrac{1 - \\tan^2x}{1 + \\tan^2x} = ?\\)",
          answer: "\\(\\cos 2x\\)",
        },
        {
          prompt: "\\(\\dfrac{2\\tan x}{1 + \\tan^2x} = ?\\)",
          answer: "\\(\\sin 2x\\)",
        },
        {
          prompt: "Determinant of \\(\\begin{pmatrix} 1 & \\cot\\alpha \\\\ -\\cot\\alpha & 1 \\end{pmatrix}\\)?",
          answer: "\\(\\csc^2\\alpha\\)",
        },
        {
          prompt: "\\(\\sin^2\\dfrac{\\theta}{2}\\) in terms of \\(\\cos\\theta\\)?",
          answer: "\\(\\dfrac{1 - \\cos\\theta}{2}\\)",
        },
      ],
      pyqExampleId: "18597fa5-801d-4185-a7d9-dc6788f29ac4",
      traps: [
        {
          title: "Sign of the sin 2x entries",
          body:
            "\\(A^TA^{-1}\\) has \\(-\\sin 2x\\) in the top-right and \\(+\\sin 2x\\) in the bottom-left. The four sign arrangements are all offered; compute the \\((1,2)\\) entry explicitly — \\(\\dfrac{-\\tan x - \\tan x}{1 + \\tan^2x} = -\\sin 2x\\).",
        },
      ],
    },

    // 4 — inverse of a product
    {
      kind: "formula" as const,
      slug: "cetdm-inverse-of-a-product",
      name: "(AB)⁻¹ = B⁻¹A⁻¹: Inverting Products and Recovering a Factor",
      intuition:
        "To undo 'first \\(B\\), then \\(A\\)' you undo \\(A\\) first, then \\(B\\) — so the inverse of a product reverses the order. Given \\((AB)^{-1}\\) and \\(A^{-1}\\), multiplying by \\(A\\) on the right peels \\(A^{-1}\\) off and leaves \\(B^{-1}\\).",
      definition:
        "- \\((AB)^{-1} = B^{-1}A^{-1}\\); hence \\(B^{-1} = (AB)^{-1}A\\) and \\(A^{-1} = B\\,(AB)^{-1}\\).\n" +
        "- \\((A^{-1})^{-1} = A\\): to recover \\(A\\) from \\(A^{-1} = \\dfrac13\\begin{pmatrix} 4 & 3 \\\\ -1 & 0 \\end{pmatrix}\\), invert it — determinant \\(\\dfrac13\\), so \\(A = \\begin{pmatrix} 0 & -3 \\\\ 1 & 4 \\end{pmatrix}\\).\n" +
        "- \\((A^T)^{-1} = (A^{-1})^T\\), \\((kA)^{-1} = \\dfrac1k A^{-1}\\), \\((A^n)^{-1} = (A^{-1})^n\\).\n" +
        "- For a non-square product like \\(A_{2\\times3}B_{3\\times2}\\): compute \\(AB\\) (a \\(2 \\times 2\\)) and invert it directly — the factors themselves have no inverse.",
      formula: {
        label: "Inverse of a product",
        latex:
          "(AB)^{-1} = B^{-1}A^{-1} \\qquad B^{-1} = (AB)^{-1}A \\qquad (A^{-1})^{-1} = A \\qquad (A^T)^{-1} = (A^{-1})^T",
      },
      authoredExample: {
        prompt: "If \\((AB)^{-1} = \\begin{pmatrix} 1 & 2 \\\\ 0 & 1 \\end{pmatrix}\\) and \\(A = \\begin{pmatrix} 1 & 0 \\\\ 1 & 1 \\end{pmatrix}\\), find \\(B^{-1}\\).",
        steps: [
          "\\(B^{-1} = (AB)^{-1}A\\).",
          "\\(\\begin{pmatrix} 1 & 2 \\\\ 0 & 1 \\end{pmatrix}\\begin{pmatrix} 1 & 0 \\\\ 1 & 1 \\end{pmatrix} = \\begin{pmatrix} 3 & 2 \\\\ 1 & 1 \\end{pmatrix}\\).",
        ],
        answer: "\\(B^{-1} = \\begin{pmatrix} 3 & 2 \\\\ 1 & 1 \\end{pmatrix}\\)",
      },
      selfCheckExample: {
        prompt: "If \\(A^{-1} = \\begin{pmatrix} 2 & 1 \\\\ 1 & 1 \\end{pmatrix}\\), find \\(A\\).",
        steps: [
          "\\(A = (A^{-1})^{-1}\\); determinant of \\(A^{-1}\\) is \\(1\\), so \\(A = \\operatorname{adj}(A^{-1}) = \\begin{pmatrix} 1 & -1 \\\\ -1 & 2 \\end{pmatrix}\\).",
        ],
        answer: "\\(A = \\begin{pmatrix} 1 & -1 \\\\ -1 & 2 \\end{pmatrix}\\)",
      },
      practiceSet: [
        {
          prompt: "\\((AB)^{-1} = ?\\)",
          answer: "\\(B^{-1}A^{-1}\\)",
        },
        {
          prompt: "\\((3A)^{-1} = ?\\)",
          answer: "\\(\\dfrac13A^{-1}\\)",
        },
        {
          prompt: "If \\((AB)^{-1}\\) and \\(B\\) are known, \\(A^{-1} = ?\\)",
          answer: "\\(B\\,(AB)^{-1}\\)",
        },
        {
          prompt: "\\((A^T)^{-1} = ?\\)",
          answer: "\\((A^{-1})^T\\)",
        },
      ],
      pyqExampleId: "f209d0b1-bbd5-442f-b806-93b2cb54a0ab",
      traps: [
        {
          title: "Keeping the order",
          body:
            "\\((AB)^{-1} = A^{-1}B^{-1}\\) is false unless the matrices commute. Reversing is the whole rule; with it, \\(B^{-1} = (AB)^{-1}A\\) and NOT \\(A\\,(AB)^{-1}\\).",
        },
      ],
    },

    // 5 — verify AA^{-1} = I
    {
      kind: "formula" as const,
      slug: "cetdm-verify-a-a-inverse-equals-i",
      name: "Unknown Entries and A⁻¹ = A³: Use AA⁻¹ = I",
      intuition:
        "If \\(B\\) is claimed to be \\(A^{-1}\\), then \\(AB = I\\), and each entry of that product is an equation. Three well-chosen entries give the three unknowns. The same fact read backwards — \\(A^{-1} = A^3\\) means \\(A^4 = I\\) — settles 'which power is the inverse' questions.",
      definition:
        "- Write out only the entries of \\(AB\\) that contain the unknowns; each must equal the corresponding entry of \\(I\\) (\\(1\\) on the diagonal, \\(0\\) off it).\n" +
        "- Pick entries where ONE unknown appears: \\(15b = 0\\) gives \\(b\\) at once; then use \\(b\\) in the next.\n" +
        "- \\(A^{-1} = A^k \\iff A^{k+1} = I\\). Test \\(A^2\\), then \\(A^4 = (A^2)^2\\): if \\(A^4 = I\\) then \\(A^{-1} = A^3\\).\n" +
        "- A stem with a printed inconsistency (two entries forcing different values of \\(a\\)) has happened; the official key follows the entry the setter used. Prefer the entry involving the most unknowns' pairing that the answer options confirm.",
      formula: {
        label: "The defining property of the inverse",
        latex:
          "AB = I \\iff B = A^{-1} \\qquad A^{-1} = A^{3} \\iff A^{4} = I",
      },
      authoredExample: {
        prompt: "If \\(A = \\begin{pmatrix} 2 & 1 \\\\ 3 & 2 \\end{pmatrix}\\) and \\(A^{-1} = \\begin{pmatrix} p & -1 \\\\ q & 2 \\end{pmatrix}\\), find \\(p\\) and \\(q\\).",
        steps: [
          "\\(AA^{-1} = I\\). Row 1 × column 1: \\(2p + q = 1\\). Row 2 × column 1: \\(3p + 2q = 0\\).",
          "From the first, \\(q = 1 - 2p\\); substitute: \\(3p + 2 - 4p = 0 \\Rightarrow p = 2\\), \\(q = -3\\).",
          "Check row 1 × column 2: \\(-2 + 2 = 0\\). Consistent.",
        ],
        answer: "\\(p = 2,\\ q = -3\\)",
      },
      selfCheckExample: {
        prompt: "For \\(A = \\begin{pmatrix} 0 & -1 \\\\ 1 & 0 \\end{pmatrix}\\), which power of \\(A\\) equals \\(A^{-1}\\)?",
        steps: [
          "\\(A^2 = \\begin{pmatrix} -1 & 0 \\\\ 0 & -1 \\end{pmatrix} = -I\\), so \\(A^4 = I\\).",
          "Hence \\(A^{-1} = A^3\\).",
        ],
        answer: "\\(A^{-1} = A^3\\)",
      },
      pyqExampleId: "9c158a5f-18d2-4b25-b70a-3019be6b5d64",
      traps: [
        {
          title: "Solving all nine entries",
          body:
            "Three unknowns need three equations; the other six entries are checks. Choosing the entries that isolate one unknown each keeps the arithmetic to a few lines — solving the whole product is where time goes.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Determinants, Cofactors and the Adjoint Identities — where adj A and A·adj A = |A|I are built",
      href: "/notes/mht-cet-maths/determinants-and-matrices/cetdm-determinants-and-adjoint",
    },
    {
      label: "Cayley–Hamilton — the inverse as αI + βA without computing the adjoint",
      href: "/notes/mht-cet-maths/determinants-and-matrices/cetdm-cayley-hamilton",
    },
  ],
};
