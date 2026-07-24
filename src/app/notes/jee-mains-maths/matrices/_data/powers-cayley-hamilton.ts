import type { SubtopicNote } from "@/app/notes/_types";

export const POWERS_CAYLEY_HAMILTON_NOTE: SubtopicNote = {
  subtopicName: "Powers of a Matrix and Cayley-Hamilton Theorem",
  title: "Powers of a Matrix & the Cayley-Hamilton Theorem",
  oneLineDefinition:
    "To find a high power of a matrix you almost never multiply it out — you spot a structure (a cycle, a nilpotent shift, an idempotent, or the matrix's own characteristic equation) that collapses every power into a simple pattern.",
  whyItMatters:
    "Forty-four PYQs, one from almost every JEE Mains sitting 2021-2025 — the single most-tested idea in the Matrices chapter, and all MODERATE. " +
    "Nobody computes A raised to 2007 by hand: the exam rewards recognising WHICH shortcut applies. " +
    "The nine tools below — cyclic powers, the nilpotent A = I + N binomial, idempotent/involutory reductions, the Cayley-Hamilton equation, polynomial recurrences, sums of powers, conjugation P^{-1}BP, period-counting, and eigenvalue/trace-determinant reasoning — between them crack every one of these 44 questions in under two minutes.",
  concepts: [
    // 1 — cyclic / pattern powers
    {
      kind: "formula" as const,
      slug: "jmat-power-patterns-cyclic",
      name: "Cyclic and pattern powers",
      intuition:
        "Compute \\(A^2\\) and \\(A^3\\) and one of two things happens: the entries follow an obvious pattern " +
        "(e.g. \\(A^n\\) has \\(n\\) or \\(n-1\\) in one slot), or the matrix **cycles** — \\(A^d = I\\) for some " +
        "small period \\(d\\), so \\(A^n\\) depends only on \\(n \\bmod d\\). Rotations and permutation matrices are the classic cyclers.",
      definition:
        "For a square matrix \\(A\\):\n" +
        "- **Pattern powers:** find \\(A^2, A^3\\), guess the closed form of \\(A^n\\), and (optionally) confirm by induction.\n" +
        "- **Cyclic powers:** if \\(A^d = I\\) (smallest such \\(d\\) is the **period**), then \\(A^n = A^{\\,n \\bmod d}\\). A rotation by \\(\\theta\\) satisfies \\(A^n = \\) rotation by \\(n\\theta\\); a rotation by \\(2\\pi/d\\) has period \\(d\\).\n" +
        "- Reduce the exponent FIRST, then read off the answer.",
      formula: {
        label: "Cyclic reduction",
        latex: "A^d = I \\ \\Rightarrow\\ A^n = A^{\\,n \\bmod d}",
      },
      authoredExample: {
        prompt:
          "If \\(A = \\begin{pmatrix} 0 & 1 \\\\ -1 & 0 \\end{pmatrix}\\), find \\(A^{2019}\\).",
        steps: [
          "\\(A^2 = \\begin{pmatrix} 0 & 1 \\\\ -1 & 0 \\end{pmatrix}\\begin{pmatrix} 0 & 1 \\\\ -1 & 0 \\end{pmatrix} = \\begin{pmatrix} -1 & 0 \\\\ 0 & -1 \\end{pmatrix} = -I\\).",
          "So \\(A^4 = (A^2)^2 = I\\): the period is \\(4\\).",
          "\\(2019 = 4(504) + 3\\), so \\(A^{2019} = A^3 = A^2\\cdot A = -A = \\begin{pmatrix} 0 & -1 \\\\ 1 & 0 \\end{pmatrix}\\).",
        ],
        answer: "\\(A^{2019} = \\begin{pmatrix} 0 & -1 \\\\ 1 & 0 \\end{pmatrix}\\).",
      },
      selfCheckExample: {
        prompt:
          "If \\(A = \\begin{pmatrix} 0 & 1 & 0 \\\\ 0 & 0 & 1 \\\\ 1 & 0 & 0 \\end{pmatrix}\\) (a cyclic shift), find \\(A^{100}\\).",
        steps: [
          "A cyclic permutation matrix satisfies \\(A^3 = I\\) — three shifts return every row to its place.",
          "\\(100 = 3(33) + 1\\), so \\(A^{100} = A^1 = A\\).",
        ],
        answer: "\\(A^{100} = A = \\begin{pmatrix} 0 & 1 & 0 \\\\ 0 & 0 & 1 \\\\ 1 & 0 & 0 \\end{pmatrix}\\).",
      },
      practiceSet: [
        { prompt: "If \\(A^2 = -I\\), find \\(A^{10}\\).", answer: "\\(-I\\)", method: "\\((A^2)^5 = (-I)^5\\)" },
        { prompt: "Rotation by \\(60^\\circ\\): smallest \\(n\\) with \\(A^n = I\\)?", answer: "\\(6\\)" },
        { prompt: "\\(A = \\begin{pmatrix}0&1\\\\1&0\\end{pmatrix}\\), find \\(A^{7}\\).", answer: "\\(\\begin{pmatrix}0&1\\\\1&0\\end{pmatrix}\\)", method: "period 2, odd power" },
        { prompt: "If \\(A^3 = I\\), find \\(A^{2024}\\).", answer: "\\(A^2\\)", method: "\\(2024 \\equiv 2 \\pmod 3\\)" },
      ],
      pyqExampleId: "2aa93556-273d-413c-8c98-a3f12aaebd21", // 2023 — rotation A^6=I, A^30+A^25-A=I
      traps: [
        {
          title: "Reduce the exponent modulo the period FIRST",
          body:
            "Once you find \\(A^d = I\\), a power like \\(A^{2019}\\) is just \\(A^{\\,2019 \\bmod d}\\). Students who start multiplying " +
            "\\(A\\cdot A\\cdot A\\dots\\) never finish. Find the period, take the remainder, done.",
        },
      ],
    },

    // 2 — nilpotent / binomial powers (A = I + N)
    {
      kind: "formula" as const,
      slug: "jmat-nilpotent-binomial-powers",
      name: "Nilpotent shift: A = I + N",
      intuition:
        "A triangular matrix with 1's on the diagonal is \\(I\\) plus a **nilpotent** part \\(N\\) (its powers eventually vanish: " +
        "\\(N^k = O\\)). Because \\(I\\) commutes with everything, the binomial theorem applies to \\((I+N)^n\\) — and it **truncates**, " +
        "because every term with \\(N^k = O\\) drops out. So \\(A^n\\) is a short, exact polynomial in \\(N\\).",
      definition:
        "Write \\(A = I + N\\) where \\(N\\) is **nilpotent** (\\(N^k = O\\) for some \\(k\\)). Then\n" +
        "\\[A^n = (I+N)^n = I + nN + \\binom{n}{2}N^2 + \\dots + \\binom{n}{k-1}N^{k-1},\\]\n" +
        "the series stopping at the last non-zero power of \\(N\\). For a \\(2\\times2\\) unitriangular matrix \\(N^2 = O\\), so " +
        "\\(A^n = I + nN\\); for a \\(3\\times3\\) unitriangular matrix \\(N^3 = O\\), so \\(A^n = I + nN + \\binom{n}{2}N^2\\).",
      formula: {
        label: "Binomial for a nilpotent shift",
        latex: "A = I + N,\\ N^k = O \\ \\Rightarrow\\ A^n = I + nN + \\binom{n}{2}N^2 + \\dots",
        symbols: [
          { symbol: "\\(N\\)", meaning: "nilpotent part A − I (strictly triangular)" },
          { symbol: "\\(\\binom{n}{2}\\)", meaning: "n(n−1)/2, the coefficient of N²" },
        ],
      },
      authoredExample: {
        prompt:
          "If \\(A = \\begin{pmatrix} 1 & 3 & 0 \\\\ 0 & 1 & 3 \\\\ 0 & 0 & 1 \\end{pmatrix}\\), find \\(A^4\\).",
        steps: [
          "Write \\(A = I + N\\) with \\(N = \\begin{pmatrix} 0 & 3 & 0 \\\\ 0 & 0 & 3 \\\\ 0 & 0 & 0 \\end{pmatrix}\\).",
          "\\(N^2 = \\begin{pmatrix} 0 & 0 & 9 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 0 \\end{pmatrix}\\) and \\(N^3 = O\\).",
          "\\(A^4 = I + 4N + \\binom{4}{2}N^2 = I + 4N + 6N^2\\).",
          "\\(= \\begin{pmatrix} 1 & 12 & 54 \\\\ 0 & 1 & 12 \\\\ 0 & 0 & 1 \\end{pmatrix}\\) (the \\(N^2\\) slot is \\(6\\times 9 = 54\\)).",
        ],
        answer: "\\(A^4 = \\begin{pmatrix} 1 & 12 & 54 \\\\ 0 & 1 & 12 \\\\ 0 & 0 & 1 \\end{pmatrix}\\).",
      },
      selfCheckExample: {
        prompt:
          "If \\(A = \\begin{pmatrix} 1 & 2 \\\\ 0 & 1 \\end{pmatrix}\\), find \\(A^{10}\\).",
        steps: [
          "\\(N = \\begin{pmatrix} 0 & 2 \\\\ 0 & 0 \\end{pmatrix}\\), \\(N^2 = O\\).",
          "So \\(A^n = I + nN = \\begin{pmatrix} 1 & 2n \\\\ 0 & 1 \\end{pmatrix}\\).",
          "At \\(n = 10\\): \\(\\begin{pmatrix} 1 & 20 \\\\ 0 & 1 \\end{pmatrix}\\).",
        ],
        answer: "\\(A^{10} = \\begin{pmatrix} 1 & 20 \\\\ 0 & 1 \\end{pmatrix}\\).",
      },
      practiceSet: [
        { prompt: "\\(A = \\begin{pmatrix}1&1\\\\0&1\\end{pmatrix}\\), find \\(A^{10}\\).", answer: "\\(\\begin{pmatrix}1&10\\\\0&1\\end{pmatrix}\\)" },
        { prompt: "If \\(A = I + N\\) with \\(N^2 = O\\), then \\(A^n = ?\\)", answer: "\\(I + nN\\)" },
        { prompt: "For \\(N^3 = O\\), how many terms in the expansion of \\(A^n\\)?", answer: "3: \\(I + nN + \\binom{n}{2}N^2\\)" },
        { prompt: "\\(A = \\begin{pmatrix}1&5\\\\0&1\\end{pmatrix}\\), find \\(A^{3}\\).", answer: "\\(\\begin{pmatrix}1&15\\\\0&1\\end{pmatrix}\\)" },
      ],
      pyqExampleId: "1caf2183-70dd-48b3-a947-acc8eef7958d", // 2022 — 3x3 unitriangular A^n given, find n+a+b
      traps: [
        {
          title: "The binomial TRUNCATES — don't chase infinitely many terms",
          body:
            "For \\(A = I + N\\), the expansion of \\(A^n\\) stops at the last non-zero \\(N^k\\). A \\(3\\times3\\) unitriangular matrix has " +
            "\\(N^3 = O\\), so you need exactly three terms — no more. Writing an endless series is wasted effort.",
        },
        {
          title: "This is not a normal binomial — \\(I\\) and \\(N\\) must commute",
          body:
            "\\((I+N)^n = \\sum \\binom{n}{k}N^k\\) is valid ONLY because \\(I\\) commutes with \\(N\\). You may never apply the binomial theorem to " +
            "\\((A+B)^n\\) for two general matrices; here it works purely because one summand is \\(I\\).",
        },
      ],
    },

    // 3 — idempotent / involutory
    {
      kind: "formula" as const,
      slug: "jmat-idempotent-involutory",
      name: "Idempotent (A² = A) and involutory (A² = I) matrices",
      intuition:
        "Two special self-relations make every power trivial. If \\(A^2 = A\\) (**idempotent**), then \\(A^3 = A^2\\cdot A = A\\), and so on: " +
        "\\(A^n = A\\) for all \\(n \\ge 1\\). If \\(A^2 = I\\) (**involutory**), powers just alternate between \\(A\\) and \\(I\\). Spot one of these " +
        "and any expression in powers of \\(A\\) collapses instantly.",
      definition:
        "- **Idempotent:** \\(A^2 = A \\Rightarrow A^n = A\\) for every \\(n \\ge 1\\).\n" +
        "- **Involutory:** \\(A^2 = I \\Rightarrow A^n = I\\) (n even), \\(A^n = A\\) (n odd).\n" +
        "- **Binomial payoff (idempotent):** \\((I+A)^n = \\sum_{k=0}^{n}\\binom{n}{k}A^k = I + \\Big(\\sum_{k=1}^{n}\\binom{n}{k}\\Big)A = I + (2^n - 1)A\\), since every \\(A^k = A\\).",
      formula: {
        label: "Idempotent binomial collapse",
        latex: "A^2 = A \\ \\Rightarrow\\ (I+A)^n = I + (2^n - 1)A",
      },
      authoredExample: {
        prompt:
          "If \\(A = \\begin{pmatrix} 2 & -1 \\\\ 2 & -1 \\end{pmatrix}\\), find \\((I + A)^4\\).",
        steps: [
          "Check idempotence: \\(A^2 = \\begin{pmatrix} 2 & -1 \\\\ 2 & -1 \\end{pmatrix}\\begin{pmatrix} 2 & -1 \\\\ 2 & -1 \\end{pmatrix} = \\begin{pmatrix} 2 & -1 \\\\ 2 & -1 \\end{pmatrix} = A\\). So \\(A^k = A\\).",
          "Idempotent collapse: \\((I+A)^4 = I + (2^4 - 1)A = I + 15A\\).",
          "\\(= \\begin{pmatrix} 1 & 0 \\\\ 0 & 1 \\end{pmatrix} + 15\\begin{pmatrix} 2 & -1 \\\\ 2 & -1 \\end{pmatrix} = \\begin{pmatrix} 31 & -15 \\\\ 30 & -14 \\end{pmatrix}\\).",
        ],
        answer: "\\((I+A)^4 = \\begin{pmatrix} 31 & -15 \\\\ 30 & -14 \\end{pmatrix}\\).",
      },
      selfCheckExample: {
        prompt:
          "If \\(A = \\begin{pmatrix} 0 & 1 \\\\ 1 & 0 \\end{pmatrix}\\), find \\(A^5 + A^6\\).",
        steps: [
          "\\(A^2 = I\\) (a swap matrix is involutory).",
          "\\(A^5 = A\\) (odd), \\(A^6 = I\\) (even).",
          "\\(A^5 + A^6 = A + I = \\begin{pmatrix} 1 & 1 \\\\ 1 & 1 \\end{pmatrix}\\).",
        ],
        answer: "\\(A^5 + A^6 = \\begin{pmatrix} 1 & 1 \\\\ 1 & 1 \\end{pmatrix}\\).",
      },
      practiceSet: [
        { prompt: "\\(A^2 = A\\), find \\(A^{100}\\).", answer: "\\(A\\)" },
        { prompt: "\\(A^2 = I\\), find \\(A^{99}\\).", answer: "\\(A\\)", method: "odd power" },
        { prompt: "\\(A^2 = I\\), find \\(A^{100}\\).", answer: "\\(I\\)", method: "even power" },
        { prompt: "\\(A\\) idempotent, \\((I+A)^3 = ?\\)", answer: "\\(I + 7A\\)", method: "\\(2^3 - 1 = 7\\)" },
      ],
      pyqExampleId: "82df25e4-81bb-458b-9b16-c6dcfcad4be8", // 2025 — A^2=A then (I+A)^8 = I+(2^8-1)A
      traps: [
        {
          title: "\\((I+A)^n = I + (2^n-1)A\\) needs \\(A^2 = A\\)",
          body:
            "This clean collapse holds ONLY for an idempotent \\(A\\). If \\(A^2 \\ne A\\), the binomial doesn't fold up — you must use the " +
            "actual structure (nilpotent, cyclic, or Cayley-Hamilton). Always verify \\(A^2 = A\\) before you use it.",
        },
      ],
    },

    // 4 — Cayley-Hamilton
    {
      kind: "formula" as const,
      slug: "jmat-cayley-hamilton",
      name: "The Cayley-Hamilton equation",
      intuition:
        "Every square matrix satisfies its own characteristic equation. For a \\(2\\times2\\) matrix that reads " +
        "\\(A^2 = (\\operatorname{tr}A)A - (\\det A)I\\) — a single relation that instantly gives the trace, the determinant, or an unknown " +
        "constant in an equation like \\(A^2 + \\gamma A + cI = O\\). Matching your given relation against Cayley-Hamilton is often a one-line solve.",
      definition:
        "**2×2:** \\(A^2 - (\\operatorname{tr}A)A + (\\det A)I = O\\), i.e. \\(A^2 - (a+d)A + (ad-bc)I = O\\).\n" +
        "**3×3:** \\(A^3 - (\\operatorname{tr}A)A^2 + (M)A - (\\det A)I = O\\), where \\(M\\) is the sum of the three \\(2\\times2\\) principal minors.\n" +
        "To solve \"find \\(k\\) in \\(A^2 - kA + cI = O\\)\", just compare coefficients: \\(k = \\operatorname{tr}A\\), \\(c = \\det A\\). The sign on the determinant term is \\(+\\det A\\) for \\(2\\times2\\).",
      formula: {
        label: "Cayley-Hamilton (2×2)",
        latex: "A^2 - (\\operatorname{tr}A)\\,A + (\\det A)\\,I = O",
        symbols: [
          { symbol: "\\(\\operatorname{tr}A\\)", meaning: "a + d, sum of diagonal entries" },
          { symbol: "\\(\\det A\\)", meaning: "ad − bc" },
        ],
      },
      authoredExample: {
        prompt:
          "If \\(A = \\begin{pmatrix} 4 & 3 \\\\ 2 & -1 \\end{pmatrix}\\) and \\(A^2 + pA + qI = O\\), find \\(p\\) and \\(q\\).",
        steps: [
          "\\(\\operatorname{tr}A = 4 + (-1) = 3\\); \\(\\det A = 4(-1) - 3(2) = -10\\).",
          "Cayley-Hamilton: \\(A^2 - 3A + (-10)I = O\\), i.e. \\(A^2 - 3A - 10I = O\\).",
          "Compare with \\(A^2 + pA + qI = O\\): \\(p = -3,\\ q = -10\\).",
        ],
        answer: "\\(p = -3,\\ q = -10\\).",
      },
      selfCheckExample: {
        prompt:
          "A \\(2\\times2\\) matrix \\(A\\) satisfies \\(A^2 = 5A + 2I\\). Find \\(\\operatorname{tr}A\\) and \\(\\det A\\).",
        steps: [
          "Rewrite as \\(A^2 - 5A - 2I = O\\).",
          "Match to \\(A^2 - (\\operatorname{tr}A)A + (\\det A)I = O\\): \\(\\operatorname{tr}A = 5\\), \\(\\det A = -2\\).",
        ],
        answer: "\\(\\operatorname{tr}A = 5,\\ \\det A = -2\\).",
      },
      practiceSet: [
        { prompt: "\\(2\\times2\\) \\(A\\) with \\(\\operatorname{tr}A = 6,\\ \\det A = 5\\): its char. equation?", answer: "\\(A^2 - 6A + 5I = O\\)" },
        { prompt: "\\(A^2 - 7A + 12I = O\\): \\(\\det A = ?\\)", answer: "\\(12\\)" },
        { prompt: "\\(A^2 - 7A + 12I = O\\): \\(\\operatorname{tr}A = ?\\)", answer: "\\(7\\)" },
        { prompt: "\\(A = \\begin{pmatrix}2&1\\\\0&3\\end{pmatrix}\\): char. equation?", answer: "\\(A^2 - 5A + 6I = O\\)", method: "tr 5, det 6" },
      ],
      pyqExampleId: "b19b6b6d-7e71-4e82-91eb-a02322fce7a5", // 2022 — A^2+gamma A+18I=O, det A = 18
      traps: [
        {
          title: "The determinant term is \\(+\\det A\\) for a \\(2\\times2\\)",
          body:
            "Cayley-Hamilton is \\(A^2 - (\\operatorname{tr}A)A + (\\det A)I = O\\): the trace term is negative, the determinant term is " +
            "**positive**. Flipping the sign of \\(\\det A\\) is the single most common slip — read the constant term off directly as \\(+\\det A\\).",
        },
        {
          title: "Cayley-Hamilton is about the CHARACTERISTIC polynomial",
          body:
            "The matrix satisfies \\(p(A) = O\\) where \\(p(\\lambda) = \\det(A - \\lambda I)\\) — not some arbitrary polynomial you'd like. " +
            "For \\(3\\times3\\) the coefficients are \\(\\operatorname{tr}A\\), the sum of principal \\(2\\times2\\) minors, and \\(\\det A\\).",
        },
      ],
    },

    // 5 — polynomial recurrence / power reduction
    {
      kind: "formula" as const,
      slug: "jmat-power-recurrence-reduction",
      name: "Reducing higher powers with a polynomial relation",
      intuition:
        "Once you know a relation like \\(A^2 = pA + qI\\) (from Cayley-Hamilton or given outright), EVERY higher power is a linear " +
        "combination of \\(A\\) and \\(I\\): multiply the relation by \\(A\\) and substitute repeatedly. \\(A^3, A^4, A^5, \\dots\\) all reduce to " +
        "the form \\(\\alpha A + \\beta I\\) — you never need the actual entries.",
      definition:
        "Given \\(A^2 = pA + qI\\):\n" +
        "- \\(A^3 = A\\cdot A^2 = pA^2 + qA = (p^2+q)A + pq\\,I\\), and so on — each step re-uses \\(A^2 = pA + qI\\).\n" +
        "- The same works for a cubic relation \\(A^3 = pA^2 + qA + rI\\): express \\(A^4, A^5\\) in terms of \\(A^2, A, I\\).\n" +
        "- **Trace shortcut:** if \\(\\lambda^2 = p\\lambda + q\\) is the characteristic equation, the power sums \\(s_k = \\operatorname{tr}(A^k)\\) obey the same recurrence \\(s_k = p\\,s_{k-1} + q\\,s_{k-2}\\), with \\(s_0 = 2,\\ s_1 = \\operatorname{tr}A\\).",
      formula: {
        label: "Power reduction",
        latex: "A^2 = pA + qI \\ \\Rightarrow\\ A^3 = (p^2+q)A + pq\\,I",
      },
      authoredExample: {
        prompt:
          "A matrix satisfies \\(A^2 = 3A + 2I\\). Express \\(A^4\\) in the form \\(\\alpha A + \\beta I\\).",
        steps: [
          "\\(A^3 = A\\cdot A^2 = 3A^2 + 2A = 3(3A + 2I) + 2A = 11A + 6I\\).",
          "\\(A^4 = A\\cdot A^3 = 11A^2 + 6A = 11(3A + 2I) + 6A = 39A + 22I\\).",
        ],
        answer: "\\(A^4 = 39A + 22I\\) (so \\(\\alpha = 39,\\ \\beta = 22\\)).",
      },
      selfCheckExample: {
        prompt:
          "A matrix satisfies \\(A^2 = 2A - I\\). Express \\(A^3\\) in the form \\(\\alpha A + \\beta I\\).",
        steps: [
          "\\(A^3 = A\\cdot A^2 = 2A^2 - A = 2(2A - I) - A = 3A - 2I\\).",
        ],
        answer: "\\(A^3 = 3A - 2I\\).",
      },
      practiceSet: [
        { prompt: "\\(A^2 = A + I\\): \\(A^3 = ?\\)", answer: "\\(2A + I\\)", method: "\\(A^2 + A = (A+I)+A\\)" },
        { prompt: "\\(A^2 = 4I\\): \\(A^3 = ?\\)", answer: "\\(4A\\)" },
        { prompt: "\\(A^2 = -I\\): \\(A^4 = ?\\)", answer: "\\(I\\)" },
        { prompt: "\\(A^2 = 2A\\): \\(A^3 = ?\\)", answer: "\\(4A\\)", method: "\\(2A^2 = 2(2A)\\)" },
      ],
      pyqExampleId: "13fd3c57-e178-46c9-bc7c-da4d79b309c6", // 2023 — A^2=3A+aI, A^4=21A+bI, find beta
      traps: [
        {
          title: "Substitute the relation at every step — don't expand entrywise",
          body:
            "When a problem hands you \\(A^2 = pA + qI\\), you are meant to REDUCE powers algebraically, not compute the matrix. " +
            "Re-apply the relation each time a fresh \\(A^2\\) appears; the answer always lands as \\(\\alpha A + \\beta I\\).",
        },
      ],
    },

    // 6 — sums of powers
    {
      kind: "formula" as const,
      slug: "jmat-sum-of-powers",
      name: "Sums of powers of a matrix",
      intuition:
        "A series \\(A + A^2 + \\dots + A^m\\) is easy the moment each power is a scalar multiple of a fixed matrix. Two structures do that: " +
        "a **rank-1** matrix (a column times a row) satisfies \\(A^2 = cA\\), so \\(A^k = c^{k-1}A\\) — a geometric series in \\(A\\); and a matrix with " +
        "\\(M^2 = cI\\) makes every even power a scalar multiple of \\(I\\). Unitriangular sums add up term-by-term via the \\(I+N\\) pattern.",
      definition:
        "- **Rank-1** \\(A = uv^{T}\\): \\(A^2 = (v^{T}u)A = cA\\), hence \\(A^k = c^{k-1}A\\) and \\(\\sum_{k=1}^{m}A^k = \\dfrac{c^m - 1}{c - 1}\\,A\\) (for \\(c \\ne 1\\)). Here \\(c = \\operatorname{tr}A\\).\n" +
        "- **\\(M^2 = cI\\):** even powers \\(M^{2k} = c^{k}I\\), odd powers \\(M^{2k-1} = c^{k-1}M\\) — split the sum into even and odd parts.\n" +
        "- **Unitriangular** \\(A = I + N\\): \\(\\sum A^k = (\\sum 1)I + (\\sum k)N + (\\sum \\binom{k}{2})N^2\\), summing each coefficient separately.",
      formula: {
        label: "Geometric sum for a rank-1 matrix",
        latex: "A^2 = cA \\ \\Rightarrow\\ \\sum_{k=1}^{m}A^k = \\frac{c^m - 1}{c - 1}\\,A",
      },
      authoredExample: {
        prompt:
          "If \\(A = \\begin{pmatrix} 1 & 1 \\\\ 1 & 1 \\end{pmatrix}\\), find \\(A + A^2 + A^3 + A^4 + A^5\\).",
        steps: [
          "\\(A^2 = \\begin{pmatrix} 2 & 2 \\\\ 2 & 2 \\end{pmatrix} = 2A\\), so \\(A\\) is rank-1 with \\(c = 2\\) and \\(A^k = 2^{k-1}A\\).",
          "\\(\\sum_{k=1}^{5}A^k = (1 + 2 + 4 + 8 + 16)A = 31A\\).",
          "\\(= 31\\begin{pmatrix} 1 & 1 \\\\ 1 & 1 \\end{pmatrix} = \\begin{pmatrix} 31 & 31 \\\\ 31 & 31 \\end{pmatrix}\\).",
        ],
        answer: "\\(A + \\dots + A^5 = \\begin{pmatrix} 31 & 31 \\\\ 31 & 31 \\end{pmatrix}\\).",
      },
      selfCheckExample: {
        prompt:
          "If \\(M = \\begin{pmatrix} 0 & 3 \\\\ -3 & 0 \\end{pmatrix}\\), find \\(M^2 + M^4 + M^6\\).",
        steps: [
          "\\(M^2 = \\begin{pmatrix} -9 & 0 \\\\ 0 & -9 \\end{pmatrix} = -9I\\).",
          "\\(M^4 = (M^2)^2 = 81I\\), \\(M^6 = (M^2)^3 = -729I\\).",
          "Sum \\(= (-9 + 81 - 729)I = -657I\\).",
        ],
        answer: "\\(M^2 + M^4 + M^6 = -657I\\).",
      },
      practiceSet: [
        { prompt: "Rank-1 \\(A\\) with \\(A^2 = 3A\\): \\(A^3 = ?\\)", answer: "\\(9A\\)", method: "\\(3^2 A\\)" },
        { prompt: "\\(M^2 = cI\\): \\(M^6 = ?\\)", answer: "\\(c^3 I\\)" },
        { prompt: "Rank-1 \\(A\\) with \\(A^2 = 5A\\): \\(A^4 = ?\\)", answer: "\\(125A\\)", method: "\\(5^3 A\\)" },
        { prompt: "\\(\\sum_{k=0}^{2}(-4)^k = ?\\)", answer: "\\(13\\)", method: "\\(1 - 4 + 16\\)" },
      ],
      pyqExampleId: "b45d37cc-ecda-4b0f-9017-dc07033f8748", // 2022 — a_ij=2^{j-i} rank-1, A^2=3A, sum A^2..A^10
      traps: [
        {
          title: "Spot the rank-1 structure before you multiply",
          body:
            "If a matrix is a column times a row (e.g. \\(a_{ij} = 2^{\\,j-i} = 2^{-i}\\cdot 2^{j}\\)), then \\(A^2 = (\\operatorname{tr}A)A\\) and every power " +
            "is a scalar times \\(A\\). Recognising this turns a scary \\(\\sum A^k\\) into a plain geometric series.",
        },
      ],
    },

    // 7 — conjugation / similarity
    {
      kind: "formula" as const,
      slug: "jmat-conjugation-similarity-powers",
      name: "Powers under conjugation: (P⁻¹BP)ⁿ",
      intuition:
        "When a matrix is dressed up as \\(P^{-1}BP\\) (a **similarity**/conjugation), its powers un-dress cleanly: the inner \\(P\\)'s cancel, " +
        "so \\((P^{-1}BP)^n = P^{-1}B^{n}P\\). For an **orthogonal** \\(P\\) (\\(P^{T}P = I\\)) the inverse is just \\(P^{T}\\). This is the whole trick " +
        "behind the \"\\(P^{T}Q^{2007}P\\)\" monsters — strip the conjugation, power the simple middle matrix, done.",
      definition:
        "For invertible \\(P\\): \\((P^{-1}BP)^n = P^{-1}B^{n}P\\), because " +
        "\\((P^{-1}BP)(P^{-1}BP) = P^{-1}B(PP^{-1})BP = P^{-1}B^{2}P\\), and so on by induction.\n" +
        "- If \\(P\\) is **orthogonal** (\\(P^{T}P = I\\)), then \\(P^{-1} = P^{T}\\), so \\(Q = PBP^{T} \\Rightarrow P^{T}Q^{n}P = B^{n}\\).\n" +
        "- Similar matrices share trace, determinant, and eigenvalues, so a diagonal-element sum of \\(P^{T}Q^{n}P\\) is just that of \\(B^{n}\\).",
      formula: {
        label: "Conjugation commutes with powers",
        latex: "(P^{-1}BP)^n = P^{-1}B^{n}P \\qquad (P^{T}P = I \\Rightarrow P^{T}(PBP^{T})^{n}P = B^{n})",
      },
      authoredExample: {
        prompt:
          "Let \\(P\\) be orthogonal (\\(P^{T}P = I\\)), \\(B = \\begin{pmatrix} 1 & 1 \\\\ 0 & 1 \\end{pmatrix}\\), and \\(Q = PBP^{T}\\). Find \\(P^{T}Q^{5}P\\).",
        steps: [
          "Since \\(Q = PBP^{T}\\), \\(Q^{5} = PB^{5}P^{T}\\) (the inner \\(P^{T}P = I\\) cancel).",
          "\\(P^{T}Q^{5}P = P^{T}(PB^{5}P^{T})P = (P^{T}P)B^{5}(P^{T}P) = B^{5}\\).",
          "\\(B\\) is unitriangular: \\(B^{5} = \\begin{pmatrix} 1 & 5 \\\\ 0 & 1 \\end{pmatrix}\\).",
        ],
        answer: "\\(P^{T}Q^{5}P = \\begin{pmatrix} 1 & 5 \\\\ 0 & 1 \\end{pmatrix}\\).",
      },
      selfCheckExample: {
        prompt:
          "Let \\(P\\) be orthogonal, \\(B = \\begin{pmatrix} 2 & 0 \\\\ 0 & 1 \\end{pmatrix}\\), and \\(Q = PBP^{T}\\). Find \\(P^{T}Q^{3}P\\).",
        steps: [
          "\\(P^{T}Q^{3}P = B^{3}\\) by the same cancellation.",
          "\\(B\\) is diagonal: \\(B^{3} = \\begin{pmatrix} 8 & 0 \\\\ 0 & 1 \\end{pmatrix}\\).",
        ],
        answer: "\\(P^{T}Q^{3}P = \\begin{pmatrix} 8 & 0 \\\\ 0 & 1 \\end{pmatrix}\\).",
      },
      practiceSet: [
        { prompt: "\\(Q = PBP^{T}\\), \\(P\\) orthogonal: \\(Q^{n} = ?\\)", answer: "\\(PB^{n}P^{T}\\)" },
        { prompt: "\\(P^{T}P = I\\): \\(P^{T}Q^{100}P\\) where \\(Q = PBP^{T}\\)?", answer: "\\(B^{100}\\)" },
        { prompt: "\\((P^{-1}BP)^{5} = ?\\)", answer: "\\(P^{-1}B^{5}P\\)" },
        { prompt: "\\(Q = PBP^{T}\\) with \\(B^2 = I\\), \\(P\\) orthogonal: \\(Q^2 = ?\\)", answer: "\\(I\\)", method: "\\(PB^2P^T = PP^T = I\\)" },
      ],
      pyqExampleId: "469f2be2-b797-462f-8b49-52b3bfa64527", // 2023 — P rotation 30deg, P^T Q^2007 P = A^2007
      traps: [
        {
          title: "Strip the conjugation FIRST",
          body:
            "\\((P^{-1}BP)^n\\) is never expanded directly. The middle \\(P P^{-1}\\) pairs telescope, leaving \\(P^{-1}B^{n}P\\). For orthogonal \\(P\\) " +
            "remember \\(P^{-1} = P^{T}\\), so \\(P^{T}(PBP^{T})^{n}P\\) collapses all the way to \\(B^{n}\\).",
        },
      ],
    },

    // 8 — condition counting (A^n = A or I over a range)
    {
      kind: "formula" as const,
      slug: "jmat-power-condition-counting",
      name: "Counting n with Aⁿ = A or Aⁿ = I",
      intuition:
        "\"For how many \\(n \\in \\{1, \\dots, N\\}\\) is \\(A^n = I\\)?\" is really a modular-counting question. Find the **period** \\(d\\) " +
        "(smallest \\(d\\) with \\(A^d = I\\)); then \\(A^n = I \\iff d \\mid n\\), and you just count the multiples of \\(d\\) up to \\(N\\). " +
        "For \\(A^n = A\\), the condition is \\(n \\equiv 1 \\pmod{d}\\).",
      definition:
        "- Determine the period \\(d\\) (via cyclicity, eigenvalues like \\(i\\) or \\(\\omega\\), or a relation such as \\(A^2 = A\\)).\n" +
        "- \\(A^n = I \\iff n \\equiv 0 \\pmod d\\); count \\(= \\lfloor N/d \\rfloor\\).\n" +
        "- \\(A^n = A \\iff n \\equiv 1 \\pmod d\\).\n" +
        "- When eigenvalues are complex roots of unity (\\(i\\) has order 4, \\(\\omega\\) order 3), the order is the period. If \\(A^2 = A\\) (idempotent), \\(A^n = A\\) for ALL \\(n \\ge 1\\).",
      formula: {
        label: "Counting the exponents",
        latex: "A^n = I \\iff d \\mid n \\ \\Rightarrow\\ \\#\\{n \\le N\\} = \\left\\lfloor \\tfrac{N}{d} \\right\\rfloor",
      },
      authoredExample: {
        prompt:
          "A matrix has period 4 (\\(A^4 = I\\), no smaller). For how many \\(n \\in \\{1, 2, \\dots, 50\\}\\) is \\(A^n = I\\)?",
        steps: [
          "\\(A^n = I \\iff 4 \\mid n\\).",
          "Multiples of 4 in \\(\\{1, \\dots, 50\\}\\): \\(4, 8, \\dots, 48\\).",
          "Count \\(= \\lfloor 50/4 \\rfloor = 12\\).",
        ],
        answer: "12 values.",
      },
      selfCheckExample: {
        prompt:
          "If \\(J = \\begin{pmatrix} 0 & 1 \\\\ 1 & 0 \\end{pmatrix}\\), for how many \\(n \\in \\{1, \\dots, 99\\}\\) is \\(J^n = I\\)?",
        steps: [
          "\\(J^2 = I\\), so the period is 2: \\(J^n = I \\iff n\\) even.",
          "Even numbers in \\(\\{1, \\dots, 99\\}\\): \\(2, 4, \\dots, 98\\) — that's \\(49\\).",
        ],
        answer: "49 values.",
      },
      practiceSet: [
        { prompt: "Period 4: count \\(n \\in \\{1,\\dots,100\\}\\) with \\(A^n = A\\).", answer: "\\(25\\)", method: "\\(n \\equiv 1 \\pmod 4\\): 1,5,…,97" },
        { prompt: "Period 3: count \\(n \\in \\{1,\\dots,30\\}\\) with \\(A^n = I\\).", answer: "\\(10\\)" },
        { prompt: "Period 2: count \\(n \\in \\{1,\\dots,20\\}\\) with \\(A^n = I\\).", answer: "\\(10\\)" },
        { prompt: "Order of \\(i\\) (as \\(i^n = 1\\))?", answer: "\\(4\\)" },
      ],
      pyqExampleId: "24b96ad3-4764-4752-90b2-f769b7bd1c4c", // 2022 — A^n = A iff i^n=i iff n=1 mod4, count 25
      traps: [
        {
          title: "Find the PERIOD, then count residues — don't test each n",
          body:
            "The whole question reduces to \"how many \\(n \\le N\\) hit the right residue mod \\(d\\)\". Nail the period first (often the order of a " +
            "complex eigenvalue like \\(i\\) or \\(\\omega\\)), and the rest is arithmetic. Testing powers one by one is a trap for time.",
        },
      ],
    },

    // 9 — characteristic equation / eigenvalue reasoning
    {
      kind: "formula" as const,
      slug: "jmat-char-equation-eigen",
      name: "Eigenvalue and trace-determinant reasoning",
      intuition:
        "The roots of \\(\\det(A - \\lambda I) = 0\\) (the **eigenvalues**) carry the matrix's DNA: their sum is the trace, their product the " +
        "determinant. That lets you answer questions about \\(\\operatorname{tr}(A^2)\\), \\(\\det A\\), or hidden eigenvalues without ever finding " +
        "the entries — and \\(AB = B\\) with \\(B \\ne O\\) instantly tells you \\(1\\) is an eigenvalue.",
      definition:
        "For a \\(2\\times2\\) matrix \\(A\\) with eigenvalues \\(\\lambda_1, \\lambda_2\\) (the roots of \\(|A - \\lambda I| = 0\\)):\n" +
        "- \\(\\lambda_1 + \\lambda_2 = \\operatorname{tr}A\\) and \\(\\lambda_1 \\lambda_2 = \\det A\\).\n" +
        "- \\(\\operatorname{tr}(A^2) = \\lambda_1^2 + \\lambda_2^2 = (\\operatorname{tr}A)^2 - 2\\det A\\).\n" +
        "- If \\(AB = \\lambda B\\) for a non-zero column \\(B\\), then \\(\\lambda\\) is an eigenvalue of \\(A\\); in particular \\(AB = B\\) means \\(1\\) is an eigenvalue.",
      formula: {
        label: "Sum and product of eigenvalues",
        latex: "\\lambda_1 + \\lambda_2 = \\operatorname{tr}A,\\qquad \\lambda_1\\lambda_2 = \\det A",
      },
      authoredExample: {
        prompt:
          "For a \\(2\\times2\\) matrix \\(A\\), the roots of \\(|A - \\lambda I| = 0\\) are \\(2\\) and \\(5\\). Find \\(\\operatorname{tr}(A^2)\\).",
        steps: [
          "\\(\\operatorname{tr}A = \\lambda_1 + \\lambda_2 = 7\\); \\(\\det A = \\lambda_1\\lambda_2 = 10\\).",
          "\\(\\operatorname{tr}(A^2) = \\lambda_1^2 + \\lambda_2^2 = (\\operatorname{tr}A)^2 - 2\\det A = 49 - 20 = 29\\).",
        ],
        answer: "\\(\\operatorname{tr}(A^2) = 29\\).",
      },
      selfCheckExample: {
        prompt:
          "A \\(2\\times2\\) matrix \\(A\\) satisfies \\(AB = B\\) for some non-zero column \\(B\\), and \\(\\operatorname{tr}A = 10\\). Find \\(\\det A\\).",
        steps: [
          "\\(AB = B = 1\\cdot B\\) with \\(B \\ne O\\) means \\(1\\) is an eigenvalue.",
          "The other eigenvalue is \\(\\operatorname{tr}A - 1 = 9\\).",
          "\\(\\det A = \\lambda_1 \\lambda_2 = 1 \\times 9 = 9\\).",
        ],
        answer: "\\(\\det A = 9\\).",
      },
      practiceSet: [
        { prompt: "Eigenvalues \\(3, -1\\): \\(\\operatorname{tr}A\\) and \\(\\det A\\)?", answer: "\\(\\operatorname{tr}A = 2,\\ \\det A = -3\\)" },
        { prompt: "Eigenvalues \\(3, -1\\): \\(\\operatorname{tr}(A^2)\\)?", answer: "\\(10\\)", method: "\\(9 + 1\\)" },
        { prompt: "\\(AB = B,\\ B \\ne O\\): one eigenvalue is?", answer: "\\(1\\)" },
        { prompt: "Roots of \\(|A - \\lambda I| = 0\\) sum to?", answer: "\\(\\operatorname{tr}A\\)" },
      ],
      pyqExampleId: "c141f10d-01f1-4b2f-ad67-f574d578e303", // 2024 — roots -1,3 of |A-xI|=0, tr(A^2)=10
      traps: [
        {
          title: "\\(\\operatorname{tr}(A^2) \\ne (\\operatorname{tr}A)^2\\)",
          body:
            "The sum of diagonal entries of \\(A^2\\) is \\(\\lambda_1^2 + \\lambda_2^2 = (\\operatorname{tr}A)^2 - 2\\det A\\), NOT \\((\\operatorname{tr}A)^2\\). " +
            "Forgetting the \\(-2\\det A\\) correction is the standard error on these trace questions.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Matrices: Order, Algebra, Powers & Equations (NDA notes)",
      href: "/notes/nda-maths/matrices-determinants/matrix-operations",
    },
  ],
};
