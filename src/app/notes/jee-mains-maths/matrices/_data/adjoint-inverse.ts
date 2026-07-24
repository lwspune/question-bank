import type { SubtopicNote } from "@/app/notes/_types";

export const ADJOINT_INVERSE_NOTE: SubtopicNote = {
  subtopicName: "Adjoint, Inverse and Determinant Identities",
  title: "Adjoint, Inverse & Determinant Identities",
  oneLineDefinition:
    "The identity toolkit that turns adjoint, inverse and determinant questions into one-line exponent arithmetic — det(AB)=det A·det B, |adj A|=|A|ⁿ⁻¹, adj(adj A)=|A|ⁿ⁻² A, and A⁻¹=adj A/|A|.",
  whyItMatters:
    "Twenty-five PYQs, and JEE Mains repeats this cluster almost every session. Very few of them ask you to actually compute an adjoint or an inverse entry-by-entry — the paper rewards students who KNOW the identities cold and finish in three lines of exponent arithmetic. " +
    "The heaviest hitter is the adjoint-of-adjoint family: for a 3×3 matrix, adj(adj A)=|A|·A and |adj(adj A)|=|A|⁴, and getting the order n and the power right is the whole question. " +
    "The rest split between the Cayley–Hamilton route to a 2×2 inverse (A⁻¹=αA+βI), invertibility conditions (det≠0), and a few counting/special-inverse twists. Seven concepts cover every one.",
  concepts: [
    // C1 — determinant multiplicativity
    {
      kind: "formula" as const,
      slug: "jmat-det-multiplicative",
      name: "Determinant of products, transposes and scalar multiples",
      intuition:
        "The determinant is multiplicative: it splits across products, ignores transpose, and pulls a scalar out as \\(k^n\\). " +
        "These three facts collapse a fearsome-looking product like \\(A^TC^2A\\) into a product of numbers.",
      definition:
        "For \\(n\\times n\\) matrices:\n" +
        "- **Product:** \\(\\det(AB) = \\det A\\,\\det B\\)\n" +
        "- **Transpose:** \\(\\det(A^T) = \\det A\\)\n" +
        "- **Scalar:** \\(\\det(kA) = k^n\\det A\\) (the order \\(n\\) is the exponent)\n" +
        "- **Power:** \\(\\det(A^m) = (\\det A)^m\\), and \\(\\det(A^{-1}) = 1/\\det A\\)",
      formula: {
        label: "Determinant identities",
        latex: "\\det(AB)=\\det A\\,\\det B,\\quad \\det(A^T)=\\det A,\\quad \\det(kA)=k^{\\,n}\\det A",
      },
      authoredExample: {
        prompt:
          "Let \\(A,B\\) be \\(3\\times3\\) matrices with \\(|A| = 2\\) and \\(|B| = 5\\). Find \\(|2A^TB|\\).",
        steps: [
          "Pull the scalar out first: \\(|2A^TB| = 2^{\\,3}\\,|A^TB|\\) (order \\(n=3\\), so \\(k^n=2^3\\)).",
          "Split the product and drop the transpose: \\(|A^TB| = |A^T|\\,|B| = |A|\\,|B| = 2\\cdot5 = 10\\).",
          "So \\(|2A^TB| = 8\\cdot10\\).",
        ],
        answer: "\\(|2A^TB| = 80\\).",
      },
      selfCheckExample: {
        prompt:
          "For a \\(3\\times3\\) matrix with \\(|A| = -3\\), find \\(|-A|\\) and \\(|A^3|\\).",
        steps: [
          "\\(|-A| = (-1)^3|A| = -(-3) = 3\\) (scalar \\(k=-1\\), order \\(3\\)).",
          "\\(|A^3| = |A|^3 = (-3)^3 = -27\\).",
        ],
        answer: "\\(|-A| = 3\\) and \\(|A^3| = -27\\).",
      },
      practiceSet: [
        { prompt: "\\(|2A|\\) for a \\(3\\times3\\) matrix with \\(|A| = 4\\)?", answer: "\\(32\\)", method: "\\(2^3\\cdot4\\)" },
        { prompt: "\\(|AB|\\) if \\(|A| = 3,\\ |B| = 2\\)?", answer: "\\(6\\)" },
        { prompt: "\\(|A^T|\\) in terms of \\(|A|\\)?", answer: "\\(|A|\\)" },
        { prompt: "\\(|A^2|\\) if \\(|A| = -2\\)?", answer: "\\(4\\)" },
      ],
      pyqExampleId: "0cada640-c3b6-4042-9460-0bf67839a247", // 2024 — det(A^T C^2 A), C = A B A^T
      traps: [
        {
          title: "\\(\\det(kA) = k^{\\,n}\\det A\\), NOT \\(k\\det A\\)",
          body:
            "Every scalar multiple of an \\(n\\times n\\) matrix multiplies the determinant by \\(k^n\\) — one factor of \\(k\\) per row. " +
            "For a \\(3\\times3\\) matrix, \\(|2A| = 8|A|\\), not \\(2|A|\\). Forgetting the power \\(n\\) is the single most common determinant slip.",
        },
      ],
    },

    // C2 — adjoint–determinant identities
    {
      kind: "formula" as const,
      slug: "jmat-adjoint-determinant-identities",
      name: "Adjoint identities: A·adj A = |A|I and |adj A| = |A|ⁿ⁻¹",
      intuition:
        "You almost never compute an adjoint on JEE Mains. Instead you use its two defining facts: multiplying \\(A\\) by its adjoint gives \\(|A|I\\), " +
        "and the determinant of the adjoint is a single power of \\(|A|\\). Those two identities close most 'adjoint' questions in one line.",
      definition:
        "For an \\(n\\times n\\) matrix:\n" +
        "- **Defining identity:** \\(A(\\operatorname{adj}A) = (\\operatorname{adj}A)A = |A|\\,I_n\\)\n" +
        "- **Determinant:** \\(|\\operatorname{adj}A| = |A|^{\\,n-1}\\)\n" +
        "- **Scalar:** \\(\\operatorname{adj}(kA) = k^{\\,n-1}\\operatorname{adj}A\\)\n" +
        "- **2×2 shortcut:** \\(\\operatorname{adj}\\begin{pmatrix}a&b\\\\c&d\\end{pmatrix} = \\begin{pmatrix}d&-b\\\\-c&a\\end{pmatrix}\\) (swap the diagonal, negate the off-diagonal)",
      formula: {
        label: "Adjoint identities",
        latex: "A(\\operatorname{adj}A) = |A|\\,I_n, \\qquad |\\operatorname{adj}A| = |A|^{\\,n-1}, \\qquad \\operatorname{adj}(kA) = k^{\\,n-1}\\operatorname{adj}A",
      },
      authoredExample: {
        prompt:
          "For a \\(3\\times3\\) matrix \\(A\\) with \\(|A| = 4\\), find \\(|\\operatorname{adj}A|\\), and state \\(A(\\operatorname{adj}A)\\).",
        steps: [
          "\\(|\\operatorname{adj}A| = |A|^{\\,n-1} = 4^{\\,3-1} = 4^2\\).",
          "\\(= 16\\).",
          "By the defining identity, \\(A(\\operatorname{adj}A) = |A|\\,I_3 = 4I_3\\).",
        ],
        answer: "\\(|\\operatorname{adj}A| = 16\\) and \\(A(\\operatorname{adj}A) = 4I_3\\).",
      },
      selfCheckExample: {
        prompt:
          "For a \\(3\\times3\\) matrix \\(A\\) with \\(|A| = 2\\), find \\(|\\operatorname{adj}(3A)|\\).",
        steps: [
          "\\(\\operatorname{adj}(3A) = 3^{\\,n-1}\\operatorname{adj}A = 3^2\\operatorname{adj}A = 9\\operatorname{adj}A\\).",
          "\\(|9\\operatorname{adj}A| = 9^3\\,|\\operatorname{adj}A| = 729\\cdot|A|^2 = 729\\cdot4\\).",
          "(Check via \\(|\\operatorname{adj}(3A)| = |3A|^{\\,n-1} = (3^3\\cdot2)^2 = 54^2 = 2916\\). ✓)",
        ],
        answer: "\\(|\\operatorname{adj}(3A)| = 2916\\).",
      },
      practiceSet: [
        { prompt: "\\(|\\operatorname{adj}A|\\) for \\(3\\times3\\) with \\(|A| = 3\\)?", answer: "\\(9\\)", method: "\\(|A|^{n-1} = 3^2\\)" },
        { prompt: "\\(A(\\operatorname{adj}A) = ?\\)", answer: "\\(|A|\\,I\\)" },
        { prompt: "\\(\\operatorname{adj}(kA) = ?\\) for \\(n\\times n\\)?", answer: "\\(k^{\\,n-1}\\operatorname{adj}A\\)" },
        { prompt: "\\(|\\operatorname{adj}A|\\) for a \\(2\\times2\\) matrix?", answer: "\\(|A|\\)", method: "\\(|A|^{n-1} = |A|^1\\)" },
      ],
      pyqExampleId: "a3254101-85f0-45df-952a-7f205708af6d", // 2022 — sum of det(adj A) over S, det(adj A)=(det A)^2
      traps: [
        {
          title: "\\(|\\operatorname{adj}A| = |A|^{\\,n-1}\\) — the exponent is \\(n-1\\), NOT \\(n\\)",
          body:
            "For a \\(3\\times3\\) matrix, \\(|\\operatorname{adj}A| = |A|^2\\), not \\(|A|^3\\) and not \\(|A|\\). " +
            "Students who write \\(|A|^3\\) (over-counting) or \\(|A|\\) (dropping the power) walk into the two standard distractors.",
        },
        {
          title: "\\(\\operatorname{adj}(kA) = k^{\\,n-1}\\operatorname{adj}A\\) — note \\(n-1\\), not \\(n\\)",
          body:
            "The adjoint scales by \\(k^{n-1}\\), one power LESS than the determinant's \\(k^n\\). For a \\(3\\times3\\), \\(\\operatorname{adj}(2A) = 4\\operatorname{adj}A\\), not \\(8\\operatorname{adj}A\\). Mixing up which one loses the power of \\(n\\) is the trap.",
        },
      ],
    },

    // C3 — adjoint of adjoint
    {
      kind: "formula" as const,
      slug: "jmat-adj-of-adj",
      name: "Adjoint of the adjoint",
      intuition:
        "This is the most-tested identity in the whole subtopic. The double adjoint gives back \\(A\\) scaled by a power of its determinant, and its determinant is a single high power of \\(|A|\\). " +
        "For a \\(3\\times3\\) matrix the numbers are clean: \\(\\operatorname{adj}(\\operatorname{adj}A) = |A|\\,A\\) and \\(|\\operatorname{adj}(\\operatorname{adj}A)| = |A|^4\\).",
      definition:
        "For an \\(n\\times n\\) non-singular matrix:\n" +
        "- **Double adjoint:** \\(\\operatorname{adj}(\\operatorname{adj}A) = |A|^{\\,n-2}A\\)\n" +
        "- **Its determinant:** \\(|\\operatorname{adj}(\\operatorname{adj}A)| = |A|^{\\,(n-1)^2}\\)\n" +
        "For \\(n = 3\\): \\(\\operatorname{adj}(\\operatorname{adj}A) = |A|\\,A\\) and \\(|\\operatorname{adj}(\\operatorname{adj}A)| = |A|^{4}\\). For \\(n = 2\\): \\(\\operatorname{adj}(\\operatorname{adj}A) = A\\).",
      formula: {
        label: "Double adjoint",
        latex: "\\operatorname{adj}(\\operatorname{adj}A) = |A|^{\\,n-2}A, \\qquad |\\operatorname{adj}(\\operatorname{adj}A)| = |A|^{\\,(n-1)^2}",
      },
      authoredExample: {
        prompt:
          "For a \\(3\\times3\\) matrix \\(A\\) with \\(|A| = 3\\), find \\(\\operatorname{adj}(\\operatorname{adj}A)\\) and \\(|\\operatorname{adj}(\\operatorname{adj}A)|\\).",
        steps: [
          "Double adjoint: \\(\\operatorname{adj}(\\operatorname{adj}A) = |A|^{\\,n-2}A = |A|^{1}A = 3A\\).",
          "Its determinant: \\(|\\operatorname{adj}(\\operatorname{adj}A)| = |A|^{\\,(n-1)^2} = 3^{\\,(2)^2} = 3^4\\).",
          "\\(= 81\\). (Check: \\(|3A| = 3^3|A| = 27\\cdot3 = 81\\). ✓)",
        ],
        answer: "\\(\\operatorname{adj}(\\operatorname{adj}A) = 3A\\) and \\(|\\operatorname{adj}(\\operatorname{adj}A)| = 81\\).",
      },
      selfCheckExample: {
        prompt:
          "A \\(3\\times3\\) matrix \\(A\\) satisfies \\(|\\operatorname{adj}(\\operatorname{adj}A)| = 2^{8}\\). Find \\(|A|\\) (positive value).",
        steps: [
          "\\(|\\operatorname{adj}(\\operatorname{adj}A)| = |A|^{\\,(n-1)^2} = |A|^{4}\\).",
          "So \\(|A|^4 = 2^8 = (2^2)^4\\).",
          "\\(|A| = 2^2 = 4\\).",
        ],
        answer: "\\(|A| = 4\\).",
      },
      practiceSet: [
        { prompt: "\\(\\operatorname{adj}(\\operatorname{adj}A)\\) for \\(3\\times3\\)?", answer: "\\(|A|\\,A\\)", method: "\\(|A|^{n-2}A = |A|^1A\\)" },
        { prompt: "\\(|\\operatorname{adj}(\\operatorname{adj}A)|\\) for \\(3\\times3\\), \\(|A| = 2\\)?", answer: "\\(16\\)", method: "\\(|A|^4\\)" },
        { prompt: "Exponent \\((n-1)^2\\) for \\(n = 3\\)?", answer: "\\(4\\)" },
        { prompt: "\\(\\operatorname{adj}(\\operatorname{adj}A)\\) for \\(2\\times2\\)?", answer: "\\(A\\)", method: "\\(|A|^{0}A = A\\)" },
      ],
      pyqExampleId: "75e9d253-fddc-461e-b7b8-346bc963c3e5", // 2025 — B = adj(adj(2A)), |B| + trace(B) = 280
      traps: [
        {
          title: "\\(\\operatorname{adj}(\\operatorname{adj}A) = |A|^{\\,n-2}A\\): for \\(3\\times3\\) it's \\(|A|\\cdot A\\), for \\(2\\times2\\) it's just \\(A\\)",
          body:
            "The power on \\(|A|\\) is \\(n-2\\). For \\(n = 3\\) that is \\(|A|^1\\), so \\(\\operatorname{adj}(\\operatorname{adj}A) = |A|A\\); for \\(n = 2\\) it is \\(|A|^0 = 1\\), so \\(\\operatorname{adj}(\\operatorname{adj}A) = A\\). Writing \\(|A|A\\) for a \\(2\\times2\\) is a classic over-application.",
        },
        {
          title: "\\(|\\operatorname{adj}(\\operatorname{adj}A)| = |A|^{4}\\) for \\(3\\times3\\), NOT \\(|A|^2\\)",
          body:
            "The determinant of the double adjoint carries the exponent \\((n-1)^2\\). For a \\(3\\times3\\) that is \\((3-1)^2 = 4\\), giving \\(|A|^4\\). It is easy to stop at \\(|A|^2\\) (the single-adjoint power) or at \\(|A|^{n-2}=|A|\\) (the matrix power) — both are wrong for the determinant.",
        },
      ],
    },

    // C4 — inverse from adjoint / PQ = kI
    {
      kind: "formula" as const,
      slug: "jmat-inverse-from-adjoint",
      name: "Inverse from the adjoint and PQ = kI",
      intuition:
        "The inverse is the adjoint divided by the determinant. Two common disguises: \\(AB = I\\) means \\(B = A^{-1}\\), and \\(PQ = kI\\) means \\(Q = kP^{-1}\\) — from which the determinant \\(|Q| = k^n/|P|\\) drops out immediately.",
      definition:
        "\\(A^{-1} = \\dfrac{\\operatorname{adj}A}{|A|}\\), defined iff \\(|A| \\neq 0\\). Consequences used in PYQs:\n" +
        "- **From a product = I:** \\(AB = I \\Rightarrow B = A^{-1}\\), so \\(|B| = 1/|A|\\)\n" +
        "- **From \\(PQ = kI_n\\):** \\(Q = kP^{-1}\\), so \\(|Q| = \\dfrac{k^{\\,n}}{|P|}\\)\n" +
        "- **Adjoint from inverse:** \\(\\operatorname{adj}A = |A|\\,A^{-1}\\) (rearranging the defining identity)",
      formula: {
        label: "Inverse and PQ = kI",
        latex: "A^{-1} = \\frac{\\operatorname{adj}A}{|A|}\\ (|A|\\neq0), \\qquad PQ = kI_n \\Rightarrow Q = kP^{-1},\\ \\ |Q| = \\frac{k^{\\,n}}{|P|}",
      },
      authoredExample: {
        prompt:
          "Let \\(P\\) be a \\(3\\times3\\) matrix with \\(|P| = 4\\), and let \\(Q\\) satisfy \\(PQ = 2I_3\\). Find \\(|Q|\\).",
        steps: [
          "\\(PQ = 2I_3 \\Rightarrow Q = 2P^{-1}\\).",
          "\\(|Q| = |2P^{-1}| = 2^{\\,3}\\,|P^{-1}| = 8\\cdot\\dfrac{1}{|P|}\\) (scalar power is the order \\(n=3\\)).",
          "\\(= \\dfrac{8}{4} = 2\\). (Same as \\(|Q| = k^n/|P| = 2^3/4\\).)",
        ],
        answer: "\\(|Q| = 2\\).",
      },
      selfCheckExample: {
        prompt:
          "For a \\(3\\times3\\) matrix \\(A\\) with \\(|A| = 5\\), suppose \\(AB = I\\). Find \\(B\\) in terms of \\(A\\) and \\(|B|\\).",
        steps: [
          "\\(AB = I \\Rightarrow B = A^{-1}\\).",
          "\\(|B| = |A^{-1}| = 1/|A| = 1/5\\).",
        ],
        answer: "\\(B = A^{-1}\\) and \\(|B| = 1/5\\).",
      },
      practiceSet: [
        { prompt: "\\(A^{-1} = ?\\) in terms of the adjoint", answer: "\\(\\operatorname{adj}A/|A|\\)" },
        { prompt: "\\(AB = I \\Rightarrow B = ?\\)", answer: "\\(A^{-1}\\)" },
        { prompt: "\\(PQ = kI_3 \\Rightarrow Q = ?\\)", answer: "\\(kP^{-1}\\)" },
        { prompt: "\\(|A^{-1}|\\) in terms of \\(|A|\\)?", answer: "\\(1/|A|\\)" },
      ],
      pyqExampleId: "8771d325-fd2c-4d3d-9ba3-225142c0d9c2", // 2021 — PQ = kI, |Q| = k^3/|P|
      traps: [
        {
          title: "\\(PQ = kI_n \\Rightarrow |Q| = k^{\\,n}/|P|\\) — the \\(k^n\\), not \\(k\\)",
          body:
            "From \\(Q = kP^{-1}\\), taking determinants pulls the scalar out as \\(k^n\\) (order \\(n\\)), so \\(|Q| = k^n|P^{-1}| = k^n/|P|\\). For a \\(3\\times3\\), that is \\(k^3/|P|\\). Writing \\(k/|P|\\) forgets the \\(k^n\\) rule and is the intended distractor.",
        },
      ],
    },

    // C5 — inverse via Cayley–Hamilton
    {
      kind: "formula" as const,
      slug: "jmat-inverse-via-cayley-hamilton",
      name: "Inverse via Cayley–Hamilton (A⁻¹ = αA + βI)",
      intuition:
        "Every \\(2\\times2\\) matrix satisfies its own characteristic equation \\(A^2 - (\\operatorname{tr}A)A + (\\det A)I = O\\). Multiply through by \\(A^{-1}\\) and the inverse becomes a linear combination of \\(A\\) and \\(I\\) — no adjoint needed. " +
        "The same trick handles a nilpotent \\(X\\) (\\(X^3 = O\\)) via the finite series for \\((\\alpha I + \\beta X + \\gamma X^2)^{-1}\\).",
      definition:
        "**2×2 Cayley–Hamilton:** \\(A^2 - (\\operatorname{tr}A)A + (\\det A)I = O\\). Multiplying by \\(A^{-1}\\):\n" +
        "\\[A^{-1} = \\frac{(\\operatorname{tr}A)\\,I - A}{\\det A}\\]\n" +
        "so in the form \\(A^{-1} = \\alpha A + \\beta I\\), \\(\\alpha = -\\dfrac{1}{\\det A}\\) and \\(\\beta = \\dfrac{\\operatorname{tr}A}{\\det A}\\).\n" +
        "**Nilpotent case:** if \\(X^3 = O\\) then \\(Y = \\alpha I + \\beta X + \\gamma X^2\\) has \\(Y^{-1} = \\tfrac{1}{\\alpha}\\big(I - \\tfrac{\\beta}{\\alpha}X + (\\tfrac{\\beta^2}{\\alpha^2}-\\tfrac{\\gamma}{\\alpha})X^2\\big)\\) — a terminating series because powers \\(\\ge 3\\) vanish.",
      formula: {
        label: "2×2 inverse from Cayley–Hamilton",
        latex: "A^{2} - (\\operatorname{tr}A)A + (\\det A)I = O \\ \\Rightarrow\\ A^{-1} = \\frac{(\\operatorname{tr}A)I - A}{\\det A}",
      },
      authoredExample: {
        prompt:
          "For \\(A = \\begin{pmatrix}2 & 3\\\\1 & 4\\end{pmatrix}\\), write \\(A^{-1} = \\alpha A + \\beta I\\) and find \\(\\alpha,\\beta\\).",
        steps: [
          "\\(\\operatorname{tr}A = 2 + 4 = 6\\), \\(\\det A = 2\\cdot4 - 3\\cdot1 = 5\\).",
          "Cayley–Hamilton: \\(A^2 - 6A + 5I = O\\). Multiply by \\(A^{-1}\\): \\(A - 6I + 5A^{-1} = O\\).",
          "\\(A^{-1} = \\dfrac{6I - A}{5} = -\\dfrac{1}{5}A + \\dfrac{6}{5}I\\).",
        ],
        answer: "\\(\\alpha = -\\dfrac{1}{5},\\ \\beta = \\dfrac{6}{5}\\).",
      },
      selfCheckExample: {
        prompt:
          "A matrix \\(X\\) satisfies \\(X^3 = O\\). Find \\((I + X)^{-1}\\).",
        steps: [
          "Guess a terminating series: \\((I + X)^{-1} = I - X + X^2\\).",
          "Verify: \\((I + X)(I - X + X^2) = I - X + X^2 + X - X^2 + X^3 = I + X^3 = I\\) (since \\(X^3 = O\\)).",
        ],
        answer: "\\((I + X)^{-1} = I - X + X^2\\).",
      },
      practiceSet: [
        { prompt: "2×2 Cayley–Hamilton: \\(A^2 - (\\operatorname{tr}A)A + (\\det A)I = ?\\)", answer: "\\(O\\) (the null matrix)" },
        { prompt: "If \\(A^2 = 5A - 6I\\), then \\(A^{-1} = ?\\)", answer: "\\(\\tfrac{1}{6}(5I - A)\\)", method: "Multiply \\(A^2-5A+6I=O\\) by \\(A^{-1}\\)" },
        { prompt: "For \\(A^{-1} = \\alpha A + \\beta I\\), \\(\\alpha = ?\\)", answer: "\\(-1/\\det A\\)" },
        { prompt: "If \\(X^3 = O\\), then \\((I - X)^{-1} = ?\\)", answer: "\\(I + X + X^2\\)" },
      ],
      pyqExampleId: "a6a93574-9943-4890-84c9-c9ac1a1afd15", // 2021 — A^{-1} = αI + βA, 5(α-β)
      traps: [
        {
          title: "Divide by \\(\\det A\\) — Cayley–Hamilton gives \\(A^{-1}\\), not \\(\\operatorname{adj}A\\)",
          body:
            "After multiplying \\(A^2 - (\\operatorname{tr}A)A + (\\det A)I = O\\) by \\(A^{-1}\\), you get \\((\\det A)A^{-1} = (\\operatorname{tr}A)I - A\\). You MUST divide by \\(\\det A\\) to isolate \\(A^{-1}\\); stopping at \\((\\operatorname{tr}A)I - A\\) gives \\(\\operatorname{adj}A\\) (unnormalised), off by a factor of \\(\\det A\\).",
        },
      ],
    },

    // C6 — invertibility conditions
    {
      kind: "formula" as const,
      slug: "jmat-invertibility-conditions",
      name: "When is a matrix invertible? (det ≠ 0)",
      intuition:
        "A square matrix is invertible exactly when its determinant is non-zero. That single test answers 'for which \\(t\\)…', 'does the system have a unique solution', and 'is \\(A - \\lambda I\\) invertible'. And once \\(AB = I\\) for square \\(A,B\\), the inverse is two-sided: \\(BA = I\\) as well.",
      definition:
        "An \\(n\\times n\\) matrix \\(A\\) is **invertible (non-singular)** \\(\\iff |A| \\neq 0\\).\n" +
        "- **Linear system:** \\(Ax = b\\) has a unique solution \\(\\iff |A| \\neq 0\\).\n" +
        "- **Two-sided inverse:** for square \\(A,B\\), \\(AB = I \\Rightarrow BA = I\\) (a one-sided inverse is automatically two-sided in finite dimension).\n" +
        "- **Deducing a determinant from an invertible factor:** if \\(MN = O\\) and \\(N\\) is invertible, then \\(M = O\\) (multiply by \\(N^{-1}\\)); hence \\(|M| = 0\\).",
      formula: {
        label: "Invertibility test",
        latex: "A^{-1}\\text{ exists} \\iff |A| \\neq 0 \\qquad\\text{and}\\qquad AB = I \\Rightarrow BA = I \\ \\text{(square matrices)}",
      },
      authoredExample: {
        prompt:
          "For which real \\(t\\) is \\(M = \\begin{pmatrix}t & 1\\\\4 & t\\end{pmatrix}\\) invertible?",
        steps: [
          "Invertible \\(\\iff |M| \\neq 0\\).",
          "\\(|M| = t\\cdot t - 1\\cdot4 = t^2 - 4\\).",
          "\\(t^2 - 4 \\neq 0 \\Rightarrow t \\neq \\pm 2\\).",
        ],
        answer: "\\(M\\) is invertible for all \\(t \\in \\mathbb{R} \\setminus \\{-2, 2\\}\\).",
      },
      selfCheckExample: {
        prompt:
          "Square matrices satisfy \\((I - A^2)(I - B) = I\\). What is \\((I - B)(I - A^2)\\)?",
        steps: [
          "\\((I - A^2)(I - B) = I\\) says \\(I - B\\) is a right inverse of \\(I - A^2\\).",
          "For square matrices a one-sided inverse is two-sided, so \\((I - B)(I - A^2) = I\\) as well.",
        ],
        answer: "\\((I - B)(I - A^2) = I\\).",
      },
      practiceSet: [
        { prompt: "A matrix is invertible iff its determinant is…?", answer: "\\(\\neq 0\\)" },
        { prompt: "If \\(|A| = 0\\), \\(A\\) is…?", answer: "singular (not invertible)" },
        { prompt: "For square \\(A,B\\), if \\(AB = I\\) then \\(BA = ?\\)", answer: "\\(I\\)" },
        { prompt: "\\(A - \\lambda I\\) is singular \\(\\Rightarrow \\lambda\\) is a…?", answer: "an eigenvalue of \\(A\\)" },
      ],
      pyqExampleId: "17772572-cd27-4de9-9e82-2d6b90592a15", // 2021 — A^2-B^2 invertible ⇒ det(A^3+B^3)=0
      traps: [
        {
          title: "\\(MN = O\\) with \\(N\\) invertible forces \\(M = O\\) (so \\(|M| = 0\\))",
          body:
            "If a product is the zero matrix and one factor is invertible, the OTHER factor must be zero — multiply \\(MN = O\\) on the right by \\(N^{-1}\\). Questions like '\\(A^2 - B^2\\) invertible, find \\(\\det(A^3 + B^3)\\)' collapse to \\(A^3 + B^3 = O\\), so the determinant is \\(0\\). Don't try to compute entries.",
        },
      ],
    },

    // C7 — special & counting inverses
    {
      kind: "formula" as const,
      slug: "jmat-special-and-counting-inverses",
      name: "Special inverses, counting, and the reversal law",
      intuition:
        "A grab-bag of inverse twists: the reversal law flips the order of a product's inverse, involutory matrices satisfy \\(A = A^{-1}\\) (i.e. \\(A^2 = I\\)) so counting them means counting \\(A^2 = I\\), and for a \\(2\\times2\\) the determinant of \\(A + I\\) has a neat trace formula.",
      definition:
        "- **Reversal law:** \\((AB)^{-1} = B^{-1}A^{-1}\\) and \\(\\operatorname{adj}(AB) = \\operatorname{adj}B\\,\\operatorname{adj}A\\); with \\(\\operatorname{adj}M = |M|M^{-1}\\), expressions like \\(A(\\operatorname{adj}A^{-1} + \\operatorname{adj}B^{-1})^{-1}B\\) simplify to a multiple of \\(\\operatorname{adj}A + \\operatorname{adj}B\\).\n" +
        "- **Involutory / self-inverse:** \\(A = A^{-1} \\iff A^2 = I\\); counting such matrices means counting solutions of \\(A^2 = I\\).\n" +
        "- **2×2 determinant shift:** \\(\\det(A + I) = \\det A + \\operatorname{tr}A + 1\\) (and \\(\\det(\\operatorname{adj}A + I) = \\det A + \\operatorname{tr}A + 1\\) too, since \\(\\operatorname{tr}(\\operatorname{adj}A) = \\operatorname{tr}A\\)).",
      formula: {
        label: "Reversal law and self-inverse",
        latex: "(AB)^{-1} = B^{-1}A^{-1}, \\qquad A = A^{-1} \\iff A^{2} = I, \\qquad \\det(A + I) = \\det A + \\operatorname{tr}A + 1\\ (2\\times2)",
      },
      authoredExample: {
        prompt:
          "Let \\(A\\) be a \\(2\\times2\\) matrix with \\(\\det A = -1\\). Simplify \\(\\det\\big((A + I)(\\operatorname{adj}A + I)\\big)\\) in terms of \\(\\operatorname{tr}A\\).",
        steps: [
          "For a \\(2\\times2\\): \\(\\det(A + I) = \\det A + \\operatorname{tr}A + 1 = -1 + \\operatorname{tr}A + 1 = \\operatorname{tr}A\\).",
          "Also \\(\\operatorname{tr}(\\operatorname{adj}A) = \\operatorname{tr}A\\) and \\(\\det(\\operatorname{adj}A) = \\det A = -1\\), so \\(\\det(\\operatorname{adj}A + I) = -1 + \\operatorname{tr}A + 1 = \\operatorname{tr}A\\).",
          "Multiply: \\(\\det\\big((A + I)(\\operatorname{adj}A + I)\\big) = \\det(A + I)\\,\\det(\\operatorname{adj}A + I) = (\\operatorname{tr}A)^2\\).",
        ],
        answer: "\\(\\det\\big((A + I)(\\operatorname{adj}A + I)\\big) = (\\operatorname{tr}A)^2\\).",
      },
      selfCheckExample: {
        prompt:
          "How many diagonal \\(2\\times2\\) matrices with entries in \\(\\{-1, 1\\}\\) satisfy \\(A = A^{-1}\\)?",
        steps: [
          "\\(A = A^{-1} \\iff A^2 = I\\). For a diagonal matrix \\(\\operatorname{diag}(a, d)\\), \\(A^2 = \\operatorname{diag}(a^2, d^2) = I\\) needs \\(a^2 = d^2 = 1\\).",
          "Each of \\(a, d\\) can be \\(-1\\) or \\(1\\): \\(2 \\times 2 = 4\\) choices, all valid.",
        ],
        answer: "\\(4\\) such matrices.",
      },
      practiceSet: [
        { prompt: "\\((AB)^{-1} = ?\\)", answer: "\\(B^{-1}A^{-1}\\) (order reverses)" },
        { prompt: "\\(A = A^{-1}\\) is equivalent to?", answer: "\\(A^2 = I\\) (involutory)" },
        { prompt: "\\(\\operatorname{adj}M\\) in terms of \\(M^{-1}\\) (invertible \\(M\\))?", answer: "\\(|M|\\,M^{-1}\\)" },
        { prompt: "\\(\\det(A + I)\\) for a \\(2\\times2\\) matrix?", answer: "\\(\\det A + \\operatorname{tr}A + 1\\)" },
      ],
      pyqExampleId: "e61f90e7-d3f5-479f-9b44-40e6900863f9", // 2022 — number of matrices with A = A^{-1}
      traps: [
        {
          title: "\\(A = A^{-1}\\) means \\(A^2 = I\\), NOT \\(A = I\\)",
          body:
            "Self-inverse (involutory) matrices are far more than just the identity — any matrix with \\(A^2 = I\\) qualifies, including \\(-I\\), reflections, and many trace-zero \\(2\\times2\\) matrices. A counting question '\\(A = A^{-1}\\)' asks for ALL solutions of \\(A^2 = I\\), which can number in the dozens.",
        },
        {
          title: "\\(\\det(A + I) = \\det A + \\operatorname{tr}A + 1\\) for \\(2\\times2\\), NOT \\(\\det A + 1\\)",
          body:
            "Adding \\(I\\) to a \\(2\\times2\\) shifts the determinant by \\(\\operatorname{tr}A + 1\\), not just \\(1\\) — the trace term is easy to drop. This is the crux of the \\((A + I)(\\operatorname{adj}A + I)\\) family of questions.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Matrix powers via Cayley–Hamilton (JEE)",
      href: "/notes/jee-mains-maths/matrices/jee-matrix-powers",
    },
    {
      label: "Cofactors, adjoint & inverse (NDA)",
      href: "/notes/nda-maths/matrices-determinants/cofactors-adjoint-inverse",
    },
  ],
};
