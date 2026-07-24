import type { SubtopicNote } from "@/app/notes/_types";

export const SYMMETRIC_ORTHOGONAL_NOTE: SubtopicNote = {
  subtopicName: "Symmetric, Skew-Symmetric and Orthogonal Matrices",
  title: "Symmetric, Skew-Symmetric and Orthogonal Matrices",
  oneLineDefinition:
    "Three matrix families defined by how A relates to its transpose — symmetric (A = Aᵀ), skew-symmetric (A = −Aᵀ, forcing a zero diagonal), and orthogonal (AAᵀ = I, so A⁻¹ = Aᵀ) — each carrying tell-tale determinant and structure facts JEE tests relentlessly.",
  whyItMatters:
    "Fourteen PYQs, every one MODERATE — this is one of the most reliably recurring Matrices themes in " +
    "JEE Mains. The questions cluster into a few fixed shapes: counting symmetric/skew matrices over an " +
    "entry set, splitting A into its symmetric and skew parts, tracking whether a product like ABᵀ or " +
    "A¹³B²⁶ comes out symmetric or skew, the XᵀAX = 0 characterisation of skew matrices, and orthogonal/" +
    "rotation matrices where the inverse is just the transpose. Learn the five recognition patterns below " +
    "and most of these answer themselves with a one-line transpose argument rather than grinding entries.",
  concepts: [
    // C1 — definitions, entry patterns, counting
    {
      kind: "formula" as const,
      slug: "jmat-symmetric-skew-definitions",
      name: "Definitions, entry patterns, and counting",
      intuition:
        "A **symmetric** matrix mirrors across its main diagonal (\\(a_{ij}=a_{ji}\\)); a **skew-symmetric** " +
        "matrix anti-mirrors (\\(a_{ij}=-a_{ji}\\)), which forces every diagonal entry to be 0. Because the " +
        "lower triangle is fully determined by the upper, you only get to choose the diagonal plus the upper " +
        "off-diagonal entries — that count is what JEE's 'how many such matrices?' problems hinge on.",
      definition:
        "\\(A\\) is **symmetric** if \\(A^T = A\\) and **skew-symmetric** if \\(A^T = -A\\) (so \\(a_{ii}=0\\)). " +
        "For an \\(n\\times n\\) matrix the number of **free entries** is:\n" +
        "- **symmetric:** the \\(n\\) diagonal entries \\(+\\) the \\(\\tfrac{n(n-1)}{2}\\) upper off-diagonal entries \\(= \\tfrac{n(n+1)}{2}\\);\n" +
        "- **skew-symmetric:** only the \\(\\tfrac{n(n-1)}{2}\\) upper off-diagonal entries (diagonal is forced to 0).\n" +
        "So if each free entry is chosen from a set of \\(k\\) values, there are \\(k^{\\,n(n+1)/2}\\) symmetric matrices — and **0 skew-symmetric matrices unless \\(0\\) is in the value set** (the diagonal must be 0).",
      formula: {
        label: "Free-entry counts for order n",
        latex: "\\#\\{\\text{symmetric}\\} = k^{\\,n(n+1)/2}, \\qquad \\#\\{\\text{skew}\\} = \\begin{cases} k^{\\,n(n-1)/2} & 0 \\in \\text{value set}\\\\[2pt] 0 & 0 \\notin \\text{value set}\\end{cases}",
        symbols: [
          { symbol: "n", meaning: "order of the square matrix" },
          { symbol: "k", meaning: "number of allowed values per entry" },
        ],
      },
      authoredExample: {
        prompt:
          "How many symmetric \\(2\\times 2\\) matrices have all entries drawn from \\(\\{1,2,3\\}\\)?",
        steps: [
          "A symmetric \\(2\\times2\\) matrix \\(\\begin{pmatrix}a&b\\\\b&c\\end{pmatrix}\\) is fixed by the entries \\(a,b,c\\) — that is \\(\\tfrac{2\\cdot 3}{2}=3\\) free entries.",
          "Each of \\(a,b,c\\) is chosen independently from the \\(3\\) values \\(\\{1,2,3\\}\\).",
          "Count \\(= 3^{3} = 27\\).",
        ],
        answer: "\\(27\\) symmetric matrices.",
      },
      selfCheckExample: {
        prompt:
          "How many skew-symmetric \\(3\\times 3\\) matrices have every entry drawn from \\(\\{1,2,3\\}\\)?",
        steps: [
          "Skew-symmetric forces the diagonal entries to satisfy \\(a_{ii}=-a_{ii}\\), i.e. \\(a_{ii}=0\\).",
          "But \\(0\\notin\\{1,2,3\\}\\), so no diagonal entry can be filled legally.",
          "Hence not a single such matrix exists.",
        ],
        answer: "\\(0\\) — the forced-zero diagonal is unavailable in the value set.",
      },
      practiceSet: [
        { prompt: "Free entries fixing a symmetric \\(n\\times n\\) matrix?", answer: "\\(\\tfrac{n(n+1)}{2}\\)" },
        { prompt: "Number of symmetric \\(2\\times2\\) matrices with entries from \\(\\{0,1\\}\\)?", answer: "\\(2^{3}=8\\)" },
        { prompt: "Diagonal entries of any skew-symmetric matrix?", answer: "All \\(0\\)" },
        { prompt: "Number of skew-symmetric \\(3\\times3\\) matrices with entries from \\(\\{1,2\\}\\)?", answer: "\\(0\\) (diagonal must be 0)" },
      ],
      pyqExampleId: "4abe070e-69ab-41cb-b4cb-92e1e8c54a5a", // 2023 — # symmetric order-3, entries 0..9 = 10^6
      traps: [
        {
          title: "A symmetric matrix is NOT determined by \\(n^2\\) free choices",
          body:
            "For a symmetric \\(3\\times3\\) matrix you choose only \\(\\tfrac{3\\cdot4}{2}=6\\) entries (3 diagonal + 3 upper), " +
            "not \\(9\\). Counting all \\(9\\) entries freely over-counts massively — the lower triangle is a mirror, not a free choice.",
        },
        {
          title: "Skew-symmetric over a set missing \\(0\\) gives ZERO matrices",
          body:
            "The diagonal of a skew matrix is forced to \\(0\\). If the allowed value set does not contain \\(0\\) " +
            "(e.g. \\(\\{-3,-2,-1,1,2\\}\\)), the skew count collapses to \\(0\\) — a favourite JEE curveball hidden inside a union count.",
        },
      ],
    },

    // C2 — symmetric + skew decomposition
    {
      kind: "formula" as const,
      slug: "jmat-symmetric-skew-decomposition",
      name: "The symmetric-plus-skew decomposition",
      intuition:
        "Every square matrix splits **uniquely** into a symmetric part plus a skew-symmetric part. The " +
        "symmetric part is \\(P=\\tfrac12(A+A^T)\\) and the skew part is \\(Q=\\tfrac12(A-A^T)\\). JEE loves " +
        "asking for \\(\\det P\\) or \\(\\det Q\\), which for a \\(2\\times2\\) come out as clean expressions in the entries.",
      definition:
        "For any square \\(A\\), \\(A = P + Q\\) with \\(P=\\tfrac12(A+A^T)\\) **symmetric** and " +
        "\\(Q=\\tfrac12(A-A^T)\\) **skew-symmetric**; this splitting is unique. For a \\(2\\times2\\) " +
        "\\(A=\\begin{pmatrix}a&b\\\\c&d\\end{pmatrix}\\): " +
        "\\(P=\\begin{pmatrix}a&\\frac{b+c}{2}\\\\\\frac{b+c}{2}&d\\end{pmatrix}\\), " +
        "\\(Q=\\begin{pmatrix}0&\\frac{b-c}{2}\\\\-\\frac{b-c}{2}&0\\end{pmatrix}\\), so " +
        "\\(\\det Q=\\left(\\tfrac{b-c}{2}\\right)^2\\) and \\(\\det P = ad-\\left(\\tfrac{b+c}{2}\\right)^2\\).",
      formula: {
        label: "Unique symmetric + skew split",
        latex: "A = \\underbrace{\\tfrac12(A+A^T)}_{P\\ \\text{symmetric}} + \\underbrace{\\tfrac12(A-A^T)}_{Q\\ \\text{skew}}",
      },
      authoredExample: {
        prompt:
          "Write \\(A=\\begin{pmatrix}4&2\\\\0&6\\end{pmatrix}\\) as \\(P+Q\\) with \\(P\\) symmetric and \\(Q\\) skew-symmetric.",
        steps: [
          "\\(A^T=\\begin{pmatrix}4&0\\\\2&6\\end{pmatrix}\\).",
          "\\(P=\\tfrac12(A+A^T)=\\tfrac12\\begin{pmatrix}8&2\\\\2&12\\end{pmatrix}=\\begin{pmatrix}4&1\\\\1&6\\end{pmatrix}\\).",
          "\\(Q=\\tfrac12(A-A^T)=\\tfrac12\\begin{pmatrix}0&2\\\\-2&0\\end{pmatrix}=\\begin{pmatrix}0&1\\\\-1&0\\end{pmatrix}\\).",
          "Check: \\(P+Q=\\begin{pmatrix}4&2\\\\0&6\\end{pmatrix}=A\\). ✓",
        ],
        answer: "\\(P=\\begin{pmatrix}4&1\\\\1&6\\end{pmatrix},\\quad Q=\\begin{pmatrix}0&1\\\\-1&0\\end{pmatrix}\\).",
      },
      selfCheckExample: {
        prompt:
          "For \\(A=\\begin{pmatrix}3&5\\\\1&3\\end{pmatrix}\\), find \\(\\det Q\\) where \\(Q\\) is the skew part of \\(A\\).",
        steps: [
          "\\(Q=\\tfrac12(A-A^T)=\\tfrac12\\begin{pmatrix}0&4\\\\-4&0\\end{pmatrix}=\\begin{pmatrix}0&2\\\\-2&0\\end{pmatrix}\\).",
          "\\(\\det Q = (0)(0)-(2)(-2)=4\\).",
        ],
        answer: "\\(\\det Q = 4\\).",
      },
      practiceSet: [
        { prompt: "Symmetric part \\(P\\) of \\(A\\)?", answer: "\\(\\tfrac12(A+A^T)\\)" },
        { prompt: "Skew part \\(Q\\) of \\(A\\)?", answer: "\\(\\tfrac12(A-A^T)\\)" },
        { prompt: "Is the split \\(A=P+Q\\) unique?", answer: "Yes" },
        { prompt: "\\(\\det Q\\) for \\(A=\\begin{pmatrix}a&b\\\\c&d\\end{pmatrix}\\)?", answer: "\\(\\left(\\tfrac{b-c}{2}\\right)^{2}\\)" },
      ],
      pyqExampleId: "4e3511be-30d2-409d-aaab-241e1a745320", // 2021 — det(Q)=9, modulus of sum of det(P)
    },

    // C3 — transpose of products of symmetric / skew matrices
    {
      kind: "formula" as const,
      slug: "jmat-transpose-of-products",
      name: "Transposing products of symmetric and skew matrices",
      intuition:
        "Almost every 'is this expression symmetric or skew?' question is solved by one move: take the " +
        "transpose using \\((XY)^T=Y^TX^T\\), replace \\(A^T\\) by \\(A\\) (symmetric) and \\(B^T\\) by " +
        "\\(-B\\) (skew), and read off the overall sign. A crucial parity fact drives it: for skew \\(B\\), " +
        "\\((B^n)^T=(-B)^n\\), so \\(B^n\\) is **skew when \\(n\\) is odd, symmetric when \\(n\\) is even**.",
      definition:
        "Use \\((XY)^T=Y^TX^T\\) and \\((X\\pm Y)^T=X^T\\pm Y^T\\). With \\(A^T=A\\) (symmetric), " +
        "\\(B^T=-B\\) (skew): powers obey \\((A^n)^T=A^n\\) (always symmetric) and " +
        "\\((B^n)^T=(-1)^n B^n\\). A result is **symmetric** if its transpose equals itself, **skew** if its " +
        "transpose equals its negative. Handy commutator facts: for symmetric \\(A\\) and skew \\(B\\), " +
        "\\(AB-BA\\) is symmetric while \\(AB+BA\\) is skew.",
      formula: {
        label: "Transpose rules and skew-power parity",
        latex: "(XY)^T = Y^T X^T, \\qquad (B^n)^T = (-1)^n B^n \\ \\ (B\\ \\text{skew})",
      },
      authoredExample: {
        prompt:
          "If \\(A\\) is symmetric and \\(B\\) is skew-symmetric (same order), determine whether \\(AB+BA\\) is symmetric or skew-symmetric.",
        steps: [
          "Take the transpose: \\((AB+BA)^T=(AB)^T+(BA)^T=B^TA^T+A^TB^T\\).",
          "Substitute \\(A^T=A,\\ B^T=-B\\): \\(=(-B)A+A(-B)=-(BA+AB)\\).",
          "So \\((AB+BA)^T=-(AB+BA)\\), i.e. it equals its own negative.",
        ],
        answer: "\\(AB+BA\\) is **skew-symmetric**.",
      },
      selfCheckExample: {
        prompt:
          "With \\(A\\) symmetric and \\(B\\) skew-symmetric, is \\(AB-BA\\) symmetric or skew-symmetric?",
        steps: [
          "\\((AB-BA)^T=(AB)^T-(BA)^T=B^TA^T-A^TB^T=(-B)A-A(-B)\\).",
          "\\(=-BA+AB=AB-BA\\).",
          "The transpose equals the original.",
        ],
        answer: "\\(AB-BA\\) is **symmetric**.",
      },
      practiceSet: [
        { prompt: "\\((AB)^T = ?\\)", answer: "\\(B^TA^T\\)" },
        { prompt: "\\(B\\) skew: is \\(B^{5}\\) symmetric or skew?", answer: "Skew (odd power)" },
        { prompt: "\\(B\\) skew: is \\(B^{26}\\) symmetric or skew?", answer: "Symmetric (even power)" },
        { prompt: "\\(A\\) sym, \\(B\\) skew: \\(AB+BA\\) is?", answer: "Skew-symmetric" },
      ],
      pyqExampleId: "fc3f7229-1b16-47cd-bf64-db8146087433", // 2022 — which is NOT true (B^5 - A^5 skew is false)
      traps: [
        {
          title: "\\(B^n\\) flips type with the parity of \\(n\\)",
          body:
            "For skew \\(B\\), \\(B^{26}\\) is **symmetric** but \\(B^{5}\\) is **skew**. Students who assume every " +
            "power of a skew matrix stays skew mis-answer questions like \\(B^{5}-A^{5}\\): since \\((B^5)^T=-B^5\\) " +
            "and \\((A^5)^T=A^5\\), the difference is neither symmetric nor skew in general.",
        },
        {
          title: "A product of symmetric matrices need not be symmetric",
          body:
            "\\((AB)^T=B^TA^T=BA\\) for symmetric \\(A,B\\) — which equals \\(AB\\) **only if they commute**. " +
            "Don't declare \\(AB\\) symmetric automatically; it is symmetric iff \\(AB=BA\\).",
        },
      ],
    },

    // C4 — quadratic form test for skew-symmetry
    {
      kind: "formula" as const,
      slug: "jmat-quadratic-form-skew",
      name: "The quadratic form test for skew-symmetry",
      intuition:
        "If a matrix \\(A\\) satisfies \\(X^TAX=0\\) for **every** column vector \\(X\\), that is a strong " +
        "structural clue: \\(A\\) must be skew-symmetric (in particular its diagonal is all zeros). It does " +
        "NOT mean \\(A=0\\) — the vanishing quadratic form only kills the symmetric part of \\(A\\).",
      definition:
        "The scalar \\(X^TAX\\) equals its own transpose \\(X^TA^TX\\), so \\(X^T(A+A^T)X=0\\) for all \\(X\\). " +
        "Since \\(A+A^T\\) is symmetric, its quadratic form vanishing for all \\(X\\) forces \\(A+A^T=O\\), i.e. " +
        "\\(A^T=-A\\). Taking \\(X=e_i\\) (a standard basis vector) directly gives \\(a_{ii}=0\\).",
      formula: {
        label: "Quadratic-form characterisation",
        latex: "X^TAX = 0 \\ \\ \\forall X \\;\\Longrightarrow\\; A^T = -A \\ \\ (A\\ \\text{skew-symmetric})",
      },
      authoredExample: {
        prompt:
          "Verify that \\(A=\\begin{pmatrix}0&2\\\\-2&0\\end{pmatrix}\\) gives \\(X^TAX=0\\) for every \\(X=\\begin{pmatrix}x\\\\y\\end{pmatrix}\\).",
        steps: [
          "\\(AX=\\begin{pmatrix}0&2\\\\-2&0\\end{pmatrix}\\begin{pmatrix}x\\\\y\\end{pmatrix}=\\begin{pmatrix}2y\\\\-2x\\end{pmatrix}\\).",
          "\\(X^T(AX)=x(2y)+y(-2x)=2xy-2xy=0\\).",
          "This holds for all \\(x,y\\) precisely because \\(A\\) is skew-symmetric.",
        ],
        answer: "\\(X^TAX=0\\) for all \\(X\\) — the hallmark of a skew-symmetric \\(A\\).",
      },
      selfCheckExample: {
        prompt:
          "A \\(3\\times3\\) matrix \\(A\\) satisfies \\(X^TAX=0\\) for all \\(X\\). What must its diagonal entries be?",
        steps: [
          "Choose \\(X=e_i\\), the vector with \\(1\\) in position \\(i\\) and \\(0\\) elsewhere.",
          "Then \\(X^TAX=e_i^TAe_i=a_{ii}\\).",
          "The hypothesis gives \\(a_{ii}=0\\) for each \\(i\\).",
        ],
        answer: "All diagonal entries are \\(0\\) (consistent with \\(A\\) being skew-symmetric).",
      },
      practiceSet: [
        { prompt: "\\(X^TAX=0\\) for all \\(X\\) \\(\\Rightarrow\\) \\(A\\) is?", answer: "Skew-symmetric" },
        { prompt: "Setting \\(X=e_i\\) in \\(X^TAX=0\\) yields?", answer: "\\(a_{ii}=0\\)" },
        { prompt: "For skew \\(A\\), the value of \\(X^TAX\\) is?", answer: "\\(0\\) (for every \\(X\\))" },
        { prompt: "Does \\(X^TAX=0\\ \\forall X\\) force \\(A=O\\)?", answer: "No — only the symmetric part vanishes" },
      ],
      pyqExampleId: "8f338a18-dfbd-45ff-b773-8fdaf91c71c8", // 2025 — X^T A X = O forces skew; det(adj(...)) = 44
      traps: [
        {
          title: "\\(X^TAX=0\\) does not mean \\(A=O\\)",
          body:
            "The vanishing quadratic form only annihilates the symmetric part \\(A+A^T\\). A non-zero skew " +
            "matrix such as \\(\\begin{pmatrix}0&2\\\\-2&0\\end{pmatrix}\\) satisfies \\(X^TAX=0\\) identically " +
            "while being far from the zero matrix. Read the condition as 'skew', not 'zero'.",
        },
      ],
    },

    // C5 — orthogonal, rotation, Cayley
    {
      kind: "formula" as const,
      slug: "jmat-orthogonal-matrices",
      name: "Orthogonal, rotation, and Cayley-transform matrices",
      intuition:
        "An **orthogonal** matrix has orthonormal rows/columns, packaged as \\(AA^T=I\\). Two huge payoffs: " +
        "the inverse is just the transpose (no adjoint needed), and the determinant is \\(\\pm1\\). Rotation " +
        "matrices are the standard example, they compose by adding angles, and a skew matrix run through the " +
        "**Cayley transform** \\((I+A)(I-A)^{-1}\\) comes out orthogonal.",
      definition:
        "\\(A\\) is **orthogonal** if \\(AA^T=A^TA=I\\); then \\(A^{-1}=A^T\\) and " +
        "\\(\\det A=\\pm1\\) (from \\((\\det A)^2=\\det(AA^T)=1\\)). The **rotation** matrix " +
        "\\(f(x)=\\begin{pmatrix}\\cos x&-\\sin x\\\\\\sin x&\\cos x\\end{pmatrix}\\) is orthogonal with " +
        "\\(\\det=1\\), satisfies \\(f(x)f(y)=f(x+y)\\), and \\(f(-x)=f(x)^{-1}=f(x)^T\\). If \\(A\\) is " +
        "**skew-symmetric**, the **Cayley transform** \\((I+A)(I-A)^{-1}\\) is orthogonal; and a **symmetric** " +
        "\\(A\\) with \\(A^2=I\\) has **orthonormal rows** (each row is a unit vector, distinct rows are orthogonal).",
      formula: {
        label: "Orthogonality and rotation composition",
        latex: "AA^T=I \\;\\Rightarrow\\; A^{-1}=A^T,\\ \\det A=\\pm1 \\qquad f(x)f(y)=f(x+y)",
      },
      authoredExample: {
        prompt:
          "Show that \\(A=\\begin{pmatrix}\\tfrac{3}{5}&\\tfrac{4}{5}\\\\-\\tfrac{4}{5}&\\tfrac{3}{5}\\end{pmatrix}\\) is orthogonal, and write \\(A^{-1}\\).",
        steps: [
          "Row 1 dotted with itself: \\(\\tfrac{9}{25}+\\tfrac{16}{25}=1\\); row 2 with itself: \\(\\tfrac{16}{25}+\\tfrac{9}{25}=1\\).",
          "Row 1 dotted with row 2: \\(\\tfrac35\\cdot(-\\tfrac45)+\\tfrac45\\cdot\\tfrac35=-\\tfrac{12}{25}+\\tfrac{12}{25}=0\\).",
          "Orthonormal rows \\(\\Rightarrow AA^T=I\\), so \\(A\\) is orthogonal and \\(A^{-1}=A^T\\).",
        ],
        answer: "\\(A^{-1}=A^T=\\begin{pmatrix}\\tfrac{3}{5}&-\\tfrac{4}{5}\\\\\\tfrac{4}{5}&\\tfrac{3}{5}\\end{pmatrix}\\).",
      },
      selfCheckExample: {
        prompt:
          "A \\(2\\times2\\) orthogonal matrix with \\(\\det=1\\) has first row \\(\\left(\\tfrac35,\\tfrac45\\right)\\). Find its second row.",
        steps: [
          "The second row must be a unit vector orthogonal to \\(\\left(\\tfrac35,\\tfrac45\\right)\\): the candidates are \\(\\pm\\left(-\\tfrac45,\\tfrac35\\right)\\).",
          "Impose \\(\\det=1\\): the rotation form \\(\\begin{pmatrix}\\cos\\theta&\\sin\\theta\\\\-\\sin\\theta&\\cos\\theta\\end{pmatrix}\\) selects \\(\\left(-\\tfrac45,\\tfrac35\\right)\\).",
          "Check \\(\\det=\\tfrac35\\cdot\\tfrac35-\\tfrac45\\cdot\\left(-\\tfrac45\\right)=\\tfrac{9}{25}+\\tfrac{16}{25}=1\\). ✓",
        ],
        answer: "Second row \\(=\\left(-\\tfrac45,\\tfrac35\\right)\\).",
      },
      practiceSet: [
        { prompt: "Defining property of an orthogonal matrix?", answer: "\\(AA^T=I\\)" },
        { prompt: "For orthogonal \\(A\\), \\(A^{-1}=?\\)", answer: "\\(A^T\\)" },
        { prompt: "\\(\\det\\) of an orthogonal matrix?", answer: "\\(\\pm1\\)" },
        { prompt: "\\(f(x)f(y)=?\\) for rotation \\(f\\)?", answer: "\\(f(x+y)\\)" },
        { prompt: "\\(A\\) skew \\(\\Rightarrow (I+A)(I-A)^{-1}\\) is?", answer: "Orthogonal (Cayley transform)" },
        { prompt: "Symmetric \\(A\\) with \\(A^2=I\\) has rows that are?", answer: "Orthonormal" },
      ],
      pyqExampleId: "5c4f82a5-495f-4297-acad-a8139bb69c8d", // 2021 — AA^T = I_2, alpha^4 + beta^4 = 1
      traps: [
        {
          title: "\\(\\det A=\\pm1\\), not always \\(+1\\)",
          body:
            "Orthogonality only pins \\((\\det A)^2=1\\). Proper rotations have \\(\\det=+1\\), but reflections " +
            "are orthogonal with \\(\\det=-1\\). Never assume the determinant is \\(1\\) unless the matrix is " +
            "specifically a rotation.",
        },
        {
          title: "Orthogonal is about \\(A^T=A^{-1}\\), not \\(A^T=A\\)",
          body:
            "Don't confuse **orthogonal** (\\(AA^T=I\\), so \\(A^T=A^{-1}\\)) with **symmetric** (\\(A^T=A\\)). " +
            "A symmetric matrix with \\(A^2=I\\) happens to be orthogonal too, but symmetry alone never implies orthogonality.",
        },
      ],
    },
  ],
  related: [
    { label: "Matrices — special matrices (NDA)", href: "/notes/nda-maths/matrices-determinants/special-matrices" },
  ],
};
