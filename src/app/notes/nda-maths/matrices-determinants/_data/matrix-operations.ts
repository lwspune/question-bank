import type { SubtopicNote } from "@/app/notes/_types";

export const MATRIX_OPERATIONS_NOTE: SubtopicNote = {
  subtopicName: "Matrix Operations, Polynomials, and Equations",
  title: "Matrices: Order, Algebra, Powers & Equations",
  oneLineDefinition:
    "A matrix is a rectangular array of numbers; you add, scalar-multiply, multiply, transpose, raise to powers, and solve matrix equations — all governed by conformability and the fact that AB ≠ BA.",
  whyItMatters:
    "Thirty-three PYQs, mostly EASY–MODERATE — the foundation the whole chapter stands on. " +
    "Questions test matrix order and multiplication conformability, counting matrices, powers " +
    "and matrix polynomials (A² − kA − I = O), and the algebra traps that catch students who " +
    "assume matrices behave like numbers. Master the eight concepts below and you bank the " +
    "easy marks and stop losing the trap ones.",
  concepts: [
    // F1 — what is a matrix
    {
      kind: "formula" as const,
      slug: "what-is-a-matrix",
      name: "What a matrix is — order and types",
      intuition:
        "A matrix is just a grid of numbers arranged in rows and columns. Its **order** is " +
        "(rows × columns), read rows-first. The shape decides almost everything — which matrices " +
        "can be added, which can be multiplied, and which can have a determinant or inverse.",
      definition:
        "A matrix of **order** \\(m \\times n\\) has \\(m\\) rows and \\(n\\) columns. Key types:\n" +
        "- **Row / column matrix:** a single row (\\(1\\times n\\)) or single column (\\(m\\times 1\\)).\n" +
        "- **Square matrix:** \\(m = n\\) — only these have a determinant and (possibly) an inverse.\n" +
        "- **Null (zero) matrix \\(O\\):** every entry 0.\n" +
        "- **Diagonal / scalar / identity:** square matrices with entries only on the main diagonal (identity \\(I\\) has 1s there).",
      authoredExample: {
        prompt: "A matrix has 12 entries. What orders are possible for it?",
        steps: [
          "The order \\(m \\times n\\) must satisfy \\(mn = 12\\).",
          "Factor pairs of 12: \\(1\\times12,\\ 2\\times6,\\ 3\\times4,\\ 4\\times3,\\ 6\\times2,\\ 12\\times1\\).",
          "That is 6 possible orders.",
        ],
        answer: "6 possible orders (one per ordered factor pair of 12).",
      },
      practiceSet: [
        { prompt: "Order of a matrix with 3 rows and 5 columns?", answer: "\\(3 \\times 5\\)" },
        { prompt: "How many entries in a \\(4 \\times 3\\) matrix?", answer: "\\(12\\)" },
        { prompt: "Which matrices can have a determinant?", answer: "Square matrices only" },
        { prompt: "Possible orders for a matrix with 7 entries?", answer: "\\(1\\times7\\) and \\(7\\times1\\) (7 is prime)" },
      ],
    },

    // F2 — equality, addition, scalar
    {
      kind: "formula" as const,
      slug: "matrix-equality-addition-scalar",
      name: "Equality, addition, and scalar multiplication",
      intuition:
        "Two matrices are equal only if they have the same order AND every corresponding entry " +
        "matches — which turns a matrix equation into a set of ordinary equations. Addition and " +
        "scalar multiplication are entry-by-entry, so they need the same order.",
      definition:
        "Matrices are **equal** iff same order and \\(a_{ij} = b_{ij}\\) for all \\(i, j\\). " +
        "**Addition** is defined only for the same order, done entrywise. **Scalar multiplication** " +
        "\\(kA\\) multiplies every entry by \\(k\\). Equating matrices entrywise is the standard way " +
        "to solve for unknown entries.",
      authoredExample: {
        prompt:
          "If \\(\\begin{pmatrix} x+y & y \\\\ x & x-y \\end{pmatrix} \\begin{pmatrix} 3 \\\\ -2 \\end{pmatrix} = \\begin{pmatrix} 3 \\\\ -1 \\end{pmatrix}\\), find \\(x\\) and \\(y\\).",
        steps: [
          "Multiply out the left side: \\(\\begin{pmatrix} 3(x+y) - 2y \\\\ 3x - 2(x-y) \\end{pmatrix} = \\begin{pmatrix} 3x + y \\\\ x + 2y \\end{pmatrix}\\).",
          "Equate entries: \\(3x + y = 3\\) and \\(x + 2y = -1\\).",
          "Solve: from the first, \\(y = 3 - 3x\\); substitute: \\(x + 2(3-3x) = -1 \\Rightarrow -5x + 6 = -1 \\Rightarrow x = \\tfrac75\\)... ",
          "Re-solve cleanly: \\(6x + 2y = 6\\) and \\(x + 2y = -1\\); subtract → \\(5x = 7 \\Rightarrow x = \\tfrac{7}{5},\\ y = 3 - \\tfrac{21}{5} = -\\tfrac{6}{5}\\).",
        ],
        answer: "\\(x = \\tfrac{7}{5},\\ y = -\\tfrac{6}{5}\\) (equate entries, then solve the linear pair).",
      },
      selfCheckExample: {
        prompt:
          "If \\(2\\begin{pmatrix} a & 1 \\\\ 0 & b \\end{pmatrix} + \\begin{pmatrix} 1 & 0 \\\\ 0 & 1 \\end{pmatrix} = \\begin{pmatrix} 5 & 2 \\\\ 0 & 7 \\end{pmatrix}\\), find \\(a\\) and \\(b\\).",
        steps: [
          "Left side: \\(\\begin{pmatrix} 2a+1 & 2 \\\\ 0 & 2b+1 \\end{pmatrix}\\).",
          "Equate: \\(2a + 1 = 5 \\Rightarrow a = 2\\); \\(2b + 1 = 7 \\Rightarrow b = 3\\).",
        ],
        answer: "\\(a = 2,\\ b = 3\\).",
      },
      practiceSet: [
        { prompt: "Can you add a \\(2\\times3\\) and a \\(3\\times2\\) matrix?", answer: "No — addition needs the same order" },
        { prompt: "\\(3\\begin{pmatrix}1&0\\\\2&1\\end{pmatrix}\\) — top-left entry?", answer: "\\(3\\)" },
        { prompt: "If \\(\\begin{pmatrix}x\\\\2\\end{pmatrix} = \\begin{pmatrix}5\\\\y\\end{pmatrix}\\), find x, y.", answer: "\\(x=5,\\ y=2\\)" },
        { prompt: "Two matrices are equal when?", answer: "Same order and all corresponding entries equal" },
      ],
      pyqExampleId: "66be5b2d-1d73-4dfe-a01b-724f4ee89f1f", // 2017 — solve x,y by equating
    },

    // C3 — multiplication
    {
      kind: "formula" as const,
      slug: "matrix-multiplication",
      name: "Matrix multiplication and conformability",
      intuition:
        "To multiply \\(A\\) by \\(B\\), the **inner dimensions must match**: an \\(m\\times n\\) times " +
        "an \\(n\\times p\\) gives an \\(m\\times p\\). Each entry of the product is a row of \\(A\\) " +
        "dotted with a column of \\(B\\). Crucially, matrix multiplication is **not commutative** — " +
        "\\(AB\\) and \\(BA\\) can differ, or one may not even exist.",
      definition:
        "\\(A_{m\\times n}\\,B_{n\\times p} = (AB)_{m\\times p}\\); the product is defined only when " +
        "\\(A\\)'s column count equals \\(B\\)'s row count. Entry \\((AB)_{ij} = \\sum_k a_{ik}b_{kj}\\). " +
        "In general \\(AB \\neq BA\\). The quadratic form \\([x\\ y\\ z]\\,M\\,[x\\ y\\ z]^T\\) is " +
        "\\(1\\times1\\) (a scalar).",
      formula: {
        label: "Order of a product",
        latex: "A_{m\\times n}\\, B_{n\\times p} = (AB)_{m\\times p}",
      },
      authoredExample: {
        prompt: "If \\(A\\) is \\(3\\times5\\) and \\(B\\) is \\(5\\times3\\), what are the orders of \\(AB\\) and \\(BA\\)?",
        steps: [
          "\\(AB\\): inner dims \\(5 = 5\\) match → order = outer dims = \\(3\\times3\\).",
          "\\(BA\\): inner dims \\(3 = 3\\) match → order = \\(5\\times5\\).",
          "Both exist but have different orders — so \\(AB \\neq BA\\) here.",
        ],
        answer: "\\(AB\\) is \\(3\\times3\\); \\(BA\\) is \\(5\\times5\\).",
      },
      selfCheckExample: {
        prompt: "If \\(A\\) is \\(2\\times3\\) and \\(AB\\) is \\(2\\times5\\), what is the order of \\(B\\)?",
        steps: [
          "For \\(AB\\) to exist, \\(B\\) has 3 rows (matching \\(A\\)'s 3 columns).",
          "\\(AB\\) has 5 columns, which come from \\(B\\)'s columns → \\(B\\) has 5 columns.",
        ],
        answer: "\\(B\\) is \\(3 \\times 5\\).",
      },
      practiceSet: [
        { prompt: "Order of \\((2\\times4)(4\\times1)\\)?", answer: "\\(2\\times1\\)" },
        { prompt: "Can you compute \\((3\\times2)(3\\times2)\\)?", answer: "No — inner dims 2 ≠ 3" },
        { prompt: "Is \\(AB = BA\\) in general?", answer: "No — multiplication is not commutative" },
        { prompt: "Order of \\([x\\ y\\ z]_{1\\times3}\\,M_{3\\times3}\\,[x\\ y\\ z]^T_{3\\times1}\\)?", answer: "\\(1\\times1\\) (a scalar)" },
      ],
      pyqExampleId: "ed22764c-666a-4b81-b0a8-c3bc74369ff3", // 2020 — order of AB
    },

    // C4 — counting matrices
    {
      kind: "formula" as const,
      slug: "counting-matrices",
      name: "Counting matrices",
      intuition:
        "If each of the \\(N\\) entries of a matrix can independently take one of \\(k\\) values, " +
        "there are \\(k^N\\) matrices. If instead you're asked how many ORDERS a matrix with \\(N\\) " +
        "entries can have, count the factor pairs of \\(N\\).",
      definition:
        "**By entries:** an \\(m\\times n\\) matrix has \\(mn\\) entries; if each is chosen from a set " +
        "of \\(k\\) values, there are \\(k^{mn}\\) such matrices. **By order:** the number of possible " +
        "orders for a matrix with exactly \\(N\\) entries equals the number of (ordered) factor pairs " +
        "of \\(N\\), i.e. the number of divisors of \\(N\\).",
      authoredExample: {
        prompt: "How many distinct \\(2\\times2\\) matrices have every entry from \\(\\{1, 2\\}\\)?",
        steps: [
          "A \\(2\\times2\\) matrix has 4 entries.",
          "Each entry independently is 1 or 2 → 2 choices each.",
          "Total \\(= 2^4 = 16\\).",
        ],
        answer: "16 matrices.",
      },
      selfCheckExample: {
        prompt:
          "Using all the prime numbers less than 30 as entries (each used once), how many different ORDERS of matrix are possible?",
        steps: [
          "Primes < 30: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29 — that's 10 numbers.",
          "A matrix using all 10 has 10 entries → order \\(m\\times n\\) with \\(mn = 10\\).",
          "Factor pairs of 10: \\(1\\times10, 2\\times5, 5\\times2, 10\\times1\\) → 4 orders.",
        ],
        answer: "4 orders.",
      },
      practiceSet: [
        { prompt: "Number of \\(2\\times2\\) matrices with entries from \\(\\{0,1\\}\\)?", answer: "\\(16\\)", method: "\\(2^4\\)" },
        { prompt: "Number of \\(3\\times3\\) matrices with entries 0 or 1?", answer: "\\(2^9 = 512\\)" },
        { prompt: "Orders possible for a matrix with 6 entries?", answer: "4 (\\(1\\times6,2\\times3,3\\times2,6\\times1\\))" },
        { prompt: "Number of \\(2\\times2\\) matrices with entries from \\(\\{1,2,3,4\\}\\)?", answer: "\\(4^4 = 256\\)" },
      ],
      pyqExampleId: "3e4c9c33-5a29-4a94-b271-2cbe38395a20", // 2021 — count 2x2 from {1,2}
    },

    // C5 — transpose
    {
      kind: "formula" as const,
      slug: "transpose-rules",
      name: "Transpose and its rules",
      intuition:
        "The transpose \\(A^T\\) (or \\(A'\\)) flips rows into columns. The one rule that trips people " +
        "up is the **reversal** law: the transpose of a product reverses the order — \\((AB)^T = B^T A^T\\).",
      definition:
        "\\((A^T)_{ij} = a_{ji}\\). Rules: \\((A^T)^T = A\\); \\((A+B)^T = A^T + B^T\\); " +
        "\\((kA)^T = kA^T\\); and **\\((AB)^T = B^T A^T\\)** (order reverses). \\(A^T\\) has the " +
        "transposed order: an \\(m\\times n\\) matrix transposes to \\(n\\times m\\).",
      formula: {
        label: "Transpose of a product (reversal law)",
        latex: "(AB)^T = B^T A^T",
      },
      authoredExample: {
        prompt: "Which of these are correct for matrices \\(A, B, C\\) of the same order: (1) \\((A+B+C)^T = A^T+B^T+C^T\\); (2) \\((AB)^T = A^T B^T\\)?",
        steps: [
          "(1) Transpose distributes over addition → TRUE.",
          "(2) Transpose of a product REVERSES order: \\((AB)^T = B^T A^T\\), not \\(A^T B^T\\) → FALSE.",
        ],
        answer: "Only (1) is correct; (2) violates the reversal law.",
      },
      practiceSet: [
        { prompt: "\\((A^T)^T = ?\\)", answer: "\\(A\\)" },
        { prompt: "\\((AB)^T = ?\\)", answer: "\\(B^T A^T\\)" },
        { prompt: "Transpose order of a \\(2\\times5\\) matrix?", answer: "\\(5\\times2\\)" },
        { prompt: "\\((A + B)^T = ?\\)", answer: "\\(A^T + B^T\\)" },
      ],
      pyqExampleId: "d26a370a-1dc8-48b4-a58e-2f3fc45eccb0", // 2018 — transpose statements
    },

    // C6 — powers
    {
      kind: "formula" as const,
      slug: "powers-of-a-matrix",
      name: "Powers of a matrix",
      intuition:
        "\\(A^n\\) means \\(A\\) multiplied by itself \\(n\\) times (only square matrices). The exam " +
        "trick is to compute \\(A^2\\), spot a pattern (it repeats, or equals a multiple of \\(A\\) or " +
        "\\(I\\)), and ride that pattern instead of grinding all \\(n\\) products.",
      definition:
        "For square \\(A\\): \\(A^2 = A\\cdot A\\), \\(A^n = A^{n-1}A\\). Look for cycles: e.g. a " +
        "swap matrix \\(\\begin{pmatrix}0&1\\\\1&0\\end{pmatrix}\\) squares to \\(I\\), so even powers " +
        "are \\(I\\). A rotation by \\(\\theta\\) to the \\(n\\)th power is rotation by \\(n\\theta\\).",
      authoredExample: {
        prompt: "If \\(A = \\begin{pmatrix}0&1\\\\1&0\\end{pmatrix}\\), find \\(A^4\\).",
        steps: [
          "\\(A^2 = \\begin{pmatrix}0&1\\\\1&0\\end{pmatrix}\\begin{pmatrix}0&1\\\\1&0\\end{pmatrix} = \\begin{pmatrix}1&0\\\\0&1\\end{pmatrix} = I\\).",
          "So \\(A^4 = (A^2)^2 = I^2 = I\\).",
        ],
        answer: "\\(A^4 = I\\) (the identity).",
      },
      selfCheckExample: {
        prompt: "If \\(A = \\begin{pmatrix}-2&2\\\\2&-2\\end{pmatrix}\\), express \\(A^2\\) in terms of \\(A\\).",
        steps: [
          "\\(A^2 = \\begin{pmatrix}-2&2\\\\2&-2\\end{pmatrix}^2 = \\begin{pmatrix}8&-8\\\\-8&8\\end{pmatrix}\\).",
          "Compare with \\(A\\): \\(\\begin{pmatrix}8&-8\\\\-8&8\\end{pmatrix} = -4\\begin{pmatrix}-2&2\\\\2&-2\\end{pmatrix}\\).",
        ],
        answer: "\\(A^2 = -4A\\).",
      },
      practiceSet: [
        { prompt: "\\(I^n = ?\\)", answer: "\\(I\\)" },
        { prompt: "If \\(A^2 = I\\), what is \\(A^{10}\\)?", answer: "\\(I\\)" },
        { prompt: "Rotation by \\(\\theta\\), raised to power \\(n\\), is rotation by?", answer: "\\(n\\theta\\)" },
        { prompt: "If \\(A^2 = A\\), what is \\(A^5\\)?", answer: "\\(A\\)", method: "idempotent" },
      ],
      pyqExampleId: "30ec72c3-feeb-40e1-bba2-8f83b589eb96", // 2017 — A^4 of swap matrix
    },

    // C7 — matrix polynomials & equations
    {
      kind: "formula" as const,
      slug: "matrix-polynomials-and-equations",
      name: "Matrix polynomials and equations",
      intuition:
        "A matrix can satisfy a polynomial equation like \\(A^2 - kA - I = O\\). Compute \\(A^2\\), " +
        "write the equation entrywise (or use the Cayley–Hamilton shortcut for \\(2\\times2\\): every " +
        "matrix satisfies \\(A^2 - (\\text{trace})A + (\\det)I = O\\)), and read off the unknown.",
      definition:
        "Expressions like \\(A^2 - 4A\\), \\(23A^3 - 19A^2 - 4A\\) are evaluated by substituting powers " +
        "of \\(A\\). For a \\(2\\times2\\) matrix, **Cayley–Hamilton** gives " +
        "\\(A^2 - (a+d)A + (ad-bc)I = O\\) where \\(a+d\\) is the trace and \\(ad-bc\\) the determinant " +
        "— the fastest route to the constant \\(k\\) in \\(A^2 - kA + cI = O\\) problems.",
      formula: {
        label: "Cayley–Hamilton (2×2)",
        latex: "A^2 - (a+d)\\,A + (ad - bc)\\,I = O",
      },
      authoredExample: {
        prompt: "If \\(A = \\begin{pmatrix}1&2\\\\2&3\\end{pmatrix}\\) and \\(A^2 - kA - I_2 = O\\), find \\(k\\).",
        steps: [
          "Trace \\(= 1 + 3 = 4\\); determinant \\(= 1\\cdot3 - 2\\cdot2 = -1\\).",
          "Cayley–Hamilton: \\(A^2 - 4A + (-1)I = O\\), i.e. \\(A^2 - 4A - I = O\\).",
          "Compare with \\(A^2 - kA - I = O\\): \\(k = 4\\).",
        ],
        answer: "\\(k = 4\\) (the trace).",
      },
      selfCheckExample: {
        prompt: "If \\(A = \\begin{pmatrix}1&2&2\\\\2&1&2\\\\2&2&1\\end{pmatrix}\\), find \\(A^2 - 4A\\).",
        steps: [
          "\\(A^2\\): each diagonal entry \\(= 1+4+4 = 9\\); each off-diagonal \\(= 2+2+2 = ... \\) compute one: row1·col2 \\(= 1\\cdot2+2\\cdot1+2\\cdot2 = 8\\). So \\(A^2 = \\begin{pmatrix}9&8&8\\\\8&9&8\\\\8&8&9\\end{pmatrix}\\).",
          "\\(4A = \\begin{pmatrix}4&8&8\\\\8&4&8\\\\8&8&4\\end{pmatrix}\\).",
          "\\(A^2 - 4A = \\begin{pmatrix}5&0&0\\\\0&5&0\\\\0&0&5\\end{pmatrix} = 5I\\).",
        ],
        answer: "\\(A^2 - 4A = 5I\\).",
      },
      practiceSet: [
        { prompt: "Cayley–Hamilton constant in \\(A^2 - kA + \\dots\\) for 2×2 — k is the?", answer: "trace \\(a+d\\)" },
        { prompt: "If \\(A = I\\), then \\(A^2 - 4A\\) equals?", answer: "\\(-3I\\)" },
        { prompt: "If \\(A^2 = 5I\\), what is \\(A^4\\)?", answer: "\\(25I\\)" },
        { prompt: "Trace of \\(\\begin{pmatrix}2&1\\\\3&5\\end{pmatrix}\\)?", answer: "\\(7\\)" },
      ],
      pyqExampleId: "7f4780f4-0297-4386-bf3a-f03074951e60", // 2018 — A^2 - kA - I = O find k
    },

    // C8 — algebra caveats
    {
      kind: "formula" as const,
      slug: "matrix-algebra-caveats",
      name: "Matrix algebra — where numbers' rules break",
      intuition:
        "Matrices look like numbers but don't always obey number-algebra. Three classics: \\(AB = O\\) " +
        "does NOT force \\(A\\) or \\(B\\) to be zero; \\((A+B)(A-B) \\neq A^2 - B^2\\) unless \\(A, B\\) " +
        "commute; and \\((A+B)^2 \\neq A^2 + 2AB + B^2\\) for the same reason.",
      definition:
        "Because \\(AB \\neq BA\\) in general:\n" +
        "- \\((A+B)(A-B) = A^2 - AB + BA - B^2\\), which equals \\(A^2 - B^2\\) **only if** \\(AB = BA\\).\n" +
        "- \\((A+B)^2 = A^2 + AB + BA + B^2\\).\n" +
        "- \\(AB = O\\) is possible with both \\(A \\neq O\\) and \\(B \\neq O\\) (zero divisors exist).\n" +
        "Transpose/adjoint/inverse of a product all **reverse order**.",
      authoredExample: {
        prompt: "For matrices \\(A, B\\) of the same order, is \\((A+B)(A-B) = A^2 - B^2\\) always true?",
        steps: [
          "Expand: \\((A+B)(A-B) = A^2 - AB + BA - B^2\\).",
          "This equals \\(A^2 - B^2\\) only if \\(-AB + BA = O\\), i.e. \\(AB = BA\\).",
          "Since matrices generally don't commute, the identity fails in general.",
        ],
        answer: "No — only when \\(A\\) and \\(B\\) commute (\\(AB = BA\\)).",
      },
      practiceSet: [
        { prompt: "Does \\(AB = O\\) imply \\(A = O\\) or \\(B = O\\)?", answer: "No" },
        { prompt: "\\((A+B)(A-B) = A^2 - B^2\\) requires?", answer: "\\(AB = BA\\) (they commute)" },
        { prompt: "\\((A+B)^2\\) expands to?", answer: "\\(A^2 + AB + BA + B^2\\)" },
        { prompt: "Is \\(AB = BA\\) generally true?", answer: "No" },
      ],
      pyqExampleId: "c2a8ccbc-7389-4622-b112-a0f86c247603", // 2018 — (A+B)(A-B) statements
      traps: [
        {
          title: "Don't import \\(a^2 - b^2 = (a+b)(a-b)\\) into matrices",
          body:
            "Every number identity that secretly uses commutativity can break for matrices. " +
            "\\((A+B)(A-B)\\), \\((A+B)^2\\), \\((AB)^2 = A^2B^2\\) all FAIL unless \\(AB = BA\\). When an " +
            "option assumes one of these, it's almost always the trap answer.",
        },
      ],
    },
  ],
};
