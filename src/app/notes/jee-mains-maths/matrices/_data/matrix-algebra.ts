import type { SubtopicNote } from "@/app/notes/_types";

export const MATRIX_ALGEBRA_NOTE: SubtopicNote = {
  subtopicName: "Matrix Algebra, Types and Operations",
  title: "Matrix Algebra, Types & Operations",
  oneLineDefinition:
    "The core operations on matrices — order and equality, adding and scalar-multiplying, multiplying by the row-by-column rule, transposing, and counting matrices — all governed by conformability and the fact that AB is generally not BA.",
  whyItMatters:
    "Twelve PYQs, every one MODERATE — this is the operations layer the whole Matrices chapter is built on, and JEE Mains tests it every year. " +
    "Questions solve for entries by equating matrices, extract a column by hitting a matrix with a basis vector, use the [1,1,1]·B·[1,1,1] sum-of-entries trick, force a matrix to be scalar from a transpose relation, count singular matrices from a value set, and lean on the fact that AB = O with A, B nonzero forces both to be singular. Master the six concepts below and these become fast, reliable marks.",
  concepts: [
    // C1 — order, equality, linear combinations, trace
    {
      kind: "formula" as const,
      slug: "jmat-order-equality-linear-combos",
      name: "Order, equality, linear combinations, and trace",
      intuition:
        "A matrix's **order** is (rows × columns), read rows-first, and it decides which matrices can be added or multiplied. Two matrices are **equal** only when they have the same order AND every corresponding entry matches — so a matrix equation is really a bundle of ordinary scalar equations. When you are given two linear combinations like \\(A+2B\\) and \\(2A-B\\), treat them as simultaneous equations in the 'unknowns' \\(A\\) and \\(B\\) and eliminate one.",
      definition:
        "A matrix of order \\(m\\times n\\) has \\(m\\) rows and \\(n\\) columns.\n" +
        "- **Equality:** \\(A=B\\) iff same order and \\(a_{ij}=b_{ij}\\) for all \\(i,j\\).\n" +
        "- **Addition / scalar:** both are entrywise, so addition needs matching order and \\(kA\\) scales every entry by \\(k\\).\n" +
        "- **Linear systems:** from \\(pA+qB\\) and \\(rA+sB\\) solve for \\(A\\) and \\(B\\) exactly as you would for two numbers — combine to cancel one matrix.\n" +
        "- **Trace:** \\(\\operatorname{tr}(A)=a_{11}+a_{22}+\\cdots+a_{nn}\\) is the sum of the **main-diagonal** entries (square matrices only).",
      formula: {
        label: "Trace (sum of the diagonal)",
        latex: "\\operatorname{tr}(A)=\\sum_{i=1}^{n} a_{ii}",
      },
      authoredExample: {
        prompt:
          "If \\(A+B=\\begin{pmatrix}5&3\\\\2&8\\end{pmatrix}\\) and \\(A-B=\\begin{pmatrix}1&1\\\\0&2\\end{pmatrix}\\), find \\(\\operatorname{tr}(A)+\\operatorname{tr}(B)\\).",
        steps: [
          "Add the two equations to cancel \\(B\\): \\(2A=(A+B)+(A-B)=\\begin{pmatrix}6&4\\\\2&10\\end{pmatrix}\\), so \\(A=\\begin{pmatrix}3&2\\\\1&5\\end{pmatrix}\\).",
          "Subtract to cancel \\(A\\): \\(2B=(A+B)-(A-B)=\\begin{pmatrix}4&2\\\\2&6\\end{pmatrix}\\), so \\(B=\\begin{pmatrix}2&1\\\\1&3\\end{pmatrix}\\).",
          "Traces: \\(\\operatorname{tr}(A)=3+5=8\\) and \\(\\operatorname{tr}(B)=2+3=5\\).",
        ],
        answer: "\\(\\operatorname{tr}(A)+\\operatorname{tr}(B)=13\\).",
      },
      selfCheckExample: {
        prompt:
          "If \\(2A+B=\\begin{pmatrix}4&2\\\\6&0\\end{pmatrix}\\) and \\(A-B=\\begin{pmatrix}-1&1\\\\0&3\\end{pmatrix}\\), find \\(A\\).",
        steps: [
          "Add the equations to cancel \\(B\\): \\(3A=(2A+B)+(A-B)=\\begin{pmatrix}3&3\\\\6&3\\end{pmatrix}\\).",
          "Divide by 3: \\(A=\\begin{pmatrix}1&1\\\\2&1\\end{pmatrix}\\).",
        ],
        answer: "\\(A=\\begin{pmatrix}1&1\\\\2&1\\end{pmatrix}\\).",
      },
      practiceSet: [
        { prompt: "Trace of \\(\\begin{pmatrix}7&2\\\\3&-4\\end{pmatrix}\\)?", answer: "\\(3\\)" },
        { prompt: "How many scalar equations does equating two \\(2\\times3\\) matrices give?", answer: "\\(6\\) (one per entry)" },
        { prompt: "If \\(A+B=\\begin{pmatrix}4&0\\\\0&4\\end{pmatrix}\\) and \\(A-B=\\begin{pmatrix}2&0\\\\0&2\\end{pmatrix}\\), find \\(A\\).", answer: "\\(\\begin{pmatrix}3&0\\\\0&3\\end{pmatrix}\\)", method: "Add and halve" },
        { prompt: "\\(\\operatorname{tr}\\!\\begin{pmatrix}1&9\\\\9&5\\end{pmatrix}\\)?", answer: "\\(6\\)", method: "Diagonal only: \\(1+5\\)" },
      ],
      pyqExampleId: "ed9062a8-b33f-4ea3-a150-04a478535720", // 2021 — Tr(A) - Tr(B) from A+2B, 2A-B
      traps: [
        {
          title: "Trace is the DIAGONAL sum, not the sum of all entries",
          body:
            "\\(\\operatorname{tr}(A)\\) adds only \\(a_{11},a_{22},\\dots,a_{nn}\\) — the main diagonal. Students who total every entry of the matrix get the wrong number. Only the diagonal counts, and only square matrices have a trace at all.",
        },
      ],
    },

    // C2 — multiplication
    {
      kind: "formula" as const,
      slug: "jmat-matrix-multiplication",
      name: "Matrix multiplication: conformability and the row-by-column rule",
      intuition:
        "To form \\(AB\\), the **inner dimensions must match**: an \\(m\\times n\\) times an \\(n\\times p\\) gives an \\(m\\times p\\). Each entry of the product is a **row of \\(A\\) dotted with a column of \\(B\\)**. Two hitting tricks fall straight out of this rule: multiplying a matrix by a standard basis column \\(e_j\\) picks out its \\(j\\)-th column, and \\([1\\ 1\\ \\cdots]\\,M\\,[1\\ 1\\ \\cdots]^{T}\\) adds up **all** the entries of \\(M\\).",
      definition:
        "The product \\(A_{m\\times n}B_{n\\times p}=(AB)_{m\\times p}\\) exists only when \\(A\\)'s column count equals \\(B\\)'s row count, with entry \\((AB)_{ij}=\\sum_k a_{ik}b_{kj}\\).\n" +
        "- **Column extraction:** \\(A\\,e_j\\) is the \\(j\\)-th column of \\(A\\) (where \\(e_j\\) is the column with 1 in position \\(j\\), 0 elsewhere).\n" +
        "- **Sum of all entries:** \\([1\\ \\cdots\\ 1]\\,B\\,[1\\ \\cdots\\ 1]^{T}\\) equals the total of every entry of \\(B\\).\n" +
        "- **Not commutative:** \\(AB\\neq BA\\) in general, and one of them may not even be defined.",
      formula: {
        label: "Row-by-column entry rule",
        latex: "(AB)_{ij}=\\sum_{k} a_{ik}\\,b_{kj}",
      },
      authoredExample: {
        prompt: "Compute \\(AB\\) where \\(A=\\begin{pmatrix}2&1\\\\0&3\\end{pmatrix}\\) and \\(B=\\begin{pmatrix}1&4\\\\2&1\\end{pmatrix}\\).",
        steps: [
          "Inner dims match (\\(2=2\\)), so \\(AB\\) is \\(2\\times2\\).",
          "Row 1 of \\(A\\) with the columns of \\(B\\): \\((2\\cdot1+1\\cdot2,\\ 2\\cdot4+1\\cdot1)=(4,\\ 9)\\).",
          "Row 2 of \\(A\\) with the columns of \\(B\\): \\((0\\cdot1+3\\cdot2,\\ 0\\cdot4+3\\cdot1)=(6,\\ 3)\\).",
        ],
        answer: "\\(AB=\\begin{pmatrix}4&9\\\\6&3\\end{pmatrix}\\).",
      },
      selfCheckExample: {
        prompt: "For \\(B=\\begin{pmatrix}2&-1\\\\3&5\\end{pmatrix}\\), compute \\([1\\ 1]\\,B\\,\\begin{pmatrix}1\\\\1\\end{pmatrix}\\).",
        steps: [
          "First \\([1\\ 1]\\,B=(2+3,\\ -1+5)=(5,\\ 4)\\) — this adds the two columns of \\(B\\).",
          "Then \\((5,\\ 4)\\begin{pmatrix}1\\\\1\\end{pmatrix}=5+4=9\\).",
          "Check: this equals the sum of all entries \\(2+(-1)+3+5=9\\). The 'ones' sandwich totals every entry.",
        ],
        answer: "\\(9\\) (the sum of all entries of \\(B\\)).",
      },
      practiceSet: [
        { prompt: "Order of \\(AB\\) if \\(A\\) is \\(3\\times4\\) and \\(B\\) is \\(4\\times2\\)?", answer: "\\(3\\times2\\)" },
        { prompt: "Can you compute \\((3\\times2)(3\\times2)\\)?", answer: "No — inner dims \\(2\\neq3\\)" },
        { prompt: "What does \\(A\\,e_2\\) give (with \\(e_2=[0,1,0]^{T}\\))?", answer: "The 2nd column of \\(A\\)" },
        { prompt: "\\([1\\ 1\\ 1]\\,M\\,[1\\ 1\\ 1]^{T}\\) equals?", answer: "The sum of all entries of \\(M\\)" },
      ],
      pyqExampleId: "0cdc9f22-fc16-4c2a-a1ee-c66679ac03a3", // 2022 — A'BA sum-of-all-entries trick
      traps: [
        {
          title: "Matrix multiplication is NOT commutative — \\(AB\\neq BA\\)",
          body:
            "Order matters: \\(AB\\) and \\(BA\\) are generally different matrices, and one may be undefined while the other exists. Never swap factors inside a product. If a question defines \\(AB\\), compute \\(AB\\) — reaching for \\(BA\\) is the classic slip.",
        },
      ],
    },

    // C3 — transpose
    {
      kind: "formula" as const,
      slug: "jmat-transpose-rules",
      name: "Transpose and the reversal law",
      intuition:
        "The transpose \\(A^{T}\\) (also written \\(A'\\)) flips rows into columns. Its rules distribute cleanly over sums and scalars, but the **product reverses order**: \\((AB)^{T}=B^{T}A^{T}\\). A powerful exam move is to **transpose both sides of a matrix equation** — a relation like \\(A^{T}=\\alpha A+I\\) can then be forced to make \\(A\\) a scalar multiple of the identity.",
      definition:
        "\\((A^{T})_{ij}=a_{ji}\\), so an \\(m\\times n\\) matrix transposes to \\(n\\times m\\). Rules:\n" +
        "- **Self-inverse:** \\((A^{T})^{T}=A\\)\n" +
        "- **Sum / scalar:** \\((A+B)^{T}=A^{T}+B^{T}\\), \\((kA)^{T}=kA^{T}\\)\n" +
        "- **Reversal:** \\((AB)^{T}=B^{T}A^{T}\\)\n" +
        "- **Symmetric / skew:** \\(A^{T}=A\\) (symmetric) or \\(A^{T}=-A\\) (skew — its diagonal is all zeros).\n" +
        "To exploit a transpose relation, transpose the whole equation and substitute back.",
      formula: {
        label: "Transpose rules",
        latex: "(AB)^{T}=B^{T}A^{T}\\qquad (A^{T})^{T}=A",
      },
      authoredExample: {
        prompt: "For \\(A=\\begin{pmatrix}1&2\\\\0&1\\end{pmatrix}\\) and \\(B=\\begin{pmatrix}1&0\\\\3&1\\end{pmatrix}\\), verify \\((AB)^{T}=B^{T}A^{T}\\).",
        steps: [
          "\\(AB=\\begin{pmatrix}1\\cdot1+2\\cdot3 & 1\\cdot0+2\\cdot1\\\\0\\cdot1+1\\cdot3 & 0\\cdot0+1\\cdot1\\end{pmatrix}=\\begin{pmatrix}7&2\\\\3&1\\end{pmatrix}\\), so \\((AB)^{T}=\\begin{pmatrix}7&3\\\\2&1\\end{pmatrix}\\).",
          "\\(B^{T}=\\begin{pmatrix}1&3\\\\0&1\\end{pmatrix}\\), \\(A^{T}=\\begin{pmatrix}1&0\\\\2&1\\end{pmatrix}\\).",
          "\\(B^{T}A^{T}=\\begin{pmatrix}1\\cdot1+3\\cdot2 & 1\\cdot0+3\\cdot1\\\\0\\cdot1+1\\cdot2 & 0\\cdot0+1\\cdot1\\end{pmatrix}=\\begin{pmatrix}7&3\\\\2&1\\end{pmatrix}\\).",
        ],
        answer: "Both equal \\(\\begin{pmatrix}7&3\\\\2&1\\end{pmatrix}\\) — note \\(A^{T}B^{T}\\) would give the wrong matrix.",
      },
      selfCheckExample: {
        prompt: "A matrix satisfies \\(A^{T}=2A\\). By transposing both sides, show that \\(A=O\\).",
        steps: [
          "Transpose both sides: \\((A^{T})^{T}=(2A)^{T}\\Rightarrow A=2A^{T}\\).",
          "But \\(A^{T}=2A\\), so \\(A=2(2A)=4A\\).",
          "Hence \\(3A=O\\), which forces \\(A=O\\).",
        ],
        answer: "\\(A=O\\) (the zero matrix).",
      },
      practiceSet: [
        { prompt: "\\((A^{T})^{T}=?\\)", answer: "\\(A\\)" },
        { prompt: "\\((AB)^{T}=?\\)", answer: "\\(B^{T}A^{T}\\)" },
        { prompt: "Diagonal entries of a skew-symmetric matrix (\\(A^{T}=-A\\))?", answer: "All \\(0\\)", method: "\\(a_{ii}=-a_{ii}\\Rightarrow a_{ii}=0\\)" },
        { prompt: "Order of the transpose of a \\(3\\times5\\) matrix?", answer: "\\(5\\times3\\)" },
      ],
      pyqExampleId: "982f4cfd-b260-4b16-bafa-2d9f3bc5d05e", // 2023 — A'=alpha A + I forces A scalar
      traps: [
        {
          title: "\\((AB)^{T}=B^{T}A^{T}\\) — the order REVERSES",
          body:
            "The transpose of a product flips the factors: \\((AB)^{T}=B^{T}A^{T}\\), never \\(A^{T}B^{T}\\). Sum and scalar transposes keep their order, so only the PRODUCT reverses. Writing \\(A^{T}B^{T}\\) is the trap answer.",
        },
      ],
    },

    // C4 — non-commutativity, zero divisors, commuting matrices
    {
      kind: "formula" as const,
      slug: "jmat-non-commutativity-zero-divisors",
      name: "Non-commutativity, zero divisors, and commuting matrices",
      intuition:
        "Matrices look like numbers but break number-algebra because \\(AB\\neq BA\\). Two big consequences: \\((A+B)^{2}\\) does **not** simplify to \\(A^{2}+2AB+B^{2}\\), and \\(AB=O\\) does **not** force \\(A\\) or \\(B\\) to be zero — matrices have **zero divisors**. If two nonzero matrices multiply to \\(O\\), both must be singular. **Commuting** matrices (\\(AB=BA\\)) are the special case where the number-rules come back.",
      definition:
        "Because multiplication does not commute:\n" +
        "- \\((A+B)^{2}=A^{2}+AB+BA+B^{2}\\) — the middle collapses to \\(2AB\\) only when \\(AB=BA\\).\n" +
        "- \\((A+B)(A-B)=A^{2}-AB+BA-B^{2}\\), which equals \\(A^{2}-B^{2}\\) only when \\(A,B\\) commute.\n" +
        "- **Zero divisors:** \\(AB=O\\) is possible with \\(A\\neq O\\) and \\(B\\neq O\\). If both are nonzero \\(n\\times n\\) and \\(AB=O\\), then \\(\\det A=0\\) and \\(\\det B=0\\) (both singular), so \\(AX=0\\) has non-trivial (infinitely many) solutions.\n" +
        "- **Commuting count:** requiring \\(AB=BA\\) for a fixed \\(A\\) imposes linear constraints on \\(B\\)'s entries; the free entries then range over the allowed value set.",
      formula: {
        label: "Non-commutative square expansion",
        latex: "(A+B)^{2}=A^{2}+AB+BA+B^{2}",
      },
      authoredExample: {
        prompt: "Find two nonzero \\(2\\times2\\) matrices \\(A,B\\) whose product \\(AB\\) is the zero matrix.",
        steps: [
          "Take \\(A=\\begin{pmatrix}1&1\\\\0&0\\end{pmatrix}\\) and \\(B=\\begin{pmatrix}1&0\\\\-1&0\\end{pmatrix}\\), both clearly nonzero.",
          "Row 1 of \\(A\\) with the columns of \\(B\\): \\((1\\cdot1+1\\cdot(-1),\\ 1\\cdot0+1\\cdot0)=(0,0)\\).",
          "Row 2 of \\(A\\) is \\((0,0)\\), so it dots to \\((0,0)\\) as well.",
        ],
        answer: "\\(AB=\\begin{pmatrix}0&0\\\\0&0\\end{pmatrix}=O\\) with \\(A,B\\neq O\\) — a zero-divisor pair (both are singular).",
      },
      selfCheckExample: {
        prompt: "For \\(A=\\begin{pmatrix}0&1\\\\0&0\\end{pmatrix}\\) and \\(B=\\begin{pmatrix}0&0\\\\1&0\\end{pmatrix}\\), compute \\(AB\\) and \\(BA\\) and confirm they differ.",
        steps: [
          "\\(AB=\\begin{pmatrix}0\\cdot0+1\\cdot1 & 0\\cdot0+1\\cdot0\\\\0 & 0\\end{pmatrix}=\\begin{pmatrix}1&0\\\\0&0\\end{pmatrix}\\).",
          "\\(BA=\\begin{pmatrix}0&0\\\\1\\cdot0+0\\cdot0 & 1\\cdot1+0\\cdot0\\end{pmatrix}=\\begin{pmatrix}0&0\\\\0&1\\end{pmatrix}\\).",
          "The two products are unequal, a concrete witness that \\(AB\\neq BA\\).",
        ],
        answer: "\\(AB=\\begin{pmatrix}1&0\\\\0&0\\end{pmatrix}\\neq\\begin{pmatrix}0&0\\\\0&1\\end{pmatrix}=BA\\).",
      },
      practiceSet: [
        { prompt: "Does \\(AB=O\\) imply \\(A=O\\) or \\(B=O\\)?", answer: "No — matrices have zero divisors" },
        { prompt: "\\((A+B)^{2}=?\\) in general", answer: "\\(A^{2}+AB+BA+B^{2}\\)" },
        { prompt: "If \\(AB=BA\\), then \\((A+B)^{2}=?\\)", answer: "\\(A^{2}+2AB+B^{2}\\)" },
        { prompt: "Nonzero \\(3\\times3\\) matrices with \\(AB=O\\): what is \\(\\det A\\)?", answer: "\\(0\\) (both are singular)" },
      ],
      pyqExampleId: "1d58f2a8-2f8c-4ab2-b052-2e29767732f0", // 2022 — AB=O nonzero => AX=0 infinitely many
      traps: [
        {
          title: "\\(AB=O\\) does NOT force \\(A=O\\) or \\(B=O\\)",
          body:
            "Unlike numbers, matrices have zero divisors: two nonzero matrices can multiply to \\(O\\) (e.g. \\(\\begin{pmatrix}1&0\\\\0&0\\end{pmatrix}\\begin{pmatrix}0&0\\\\0&1\\end{pmatrix}=O\\)). You may not 'cancel' a matrix. When \\(A,B\\) are nonzero with \\(AB=O\\), the correct conclusion is that both are singular (\\(\\det=0\\)).",
        },
        {
          title: "Don't import \\(a^{2}-b^{2}=(a+b)(a-b)\\) into matrices",
          body:
            "Every number identity that secretly uses commutativity can fail for matrices: \\((A+B)(A-B)\\), \\((A+B)^{2}\\), and \\((AB)^{2}=A^{2}B^{2}\\) all break unless \\(AB=BA\\). An option that quietly assumes one of these is almost always the trap.",
        },
      ],
    },

    // C5 — elementary row operations
    {
      kind: "formula" as const,
      slug: "jmat-elementary-row-operations",
      name: "Elementary row operations",
      intuition:
        "There are exactly three elementary row operations: **swap** two rows, **scale** a row by a nonzero constant, and **add a multiple of one row to another**. To decide whether a target matrix is reachable in a **single** operation, compare it row-by-row to the original and check whether the difference is exactly one of these three moves.",
      definition:
        "The three elementary row operations on a matrix are:\n" +
        "- **Interchange:** \\(R_i\\leftrightarrow R_j\\) (changes two rows).\n" +
        "- **Scaling:** \\(R_i\\to kR_i\\) with \\(k\\neq0\\) (changes one row).\n" +
        "- **Row addition:** \\(R_i\\to R_i+kR_j\\) (changes one row, using a multiple of another).\n" +
        "A matrix is obtainable in one operation iff at most the changed row(s) differ from the original by exactly one of these patterns. To test a 'row-addition' candidate, solve for the multiplier \\(k\\) on one entry and check it is consistent on the rest of the row.",
      formula: {
        label: "The three operations",
        latex: "R_i\\leftrightarrow R_j\\qquad R_i\\to kR_i\\ (k\\neq0)\\qquad R_i\\to R_i+kR_j",
      },
      authoredExample: {
        prompt: "Starting from \\(\\begin{pmatrix}2&1\\\\4&3\\end{pmatrix}\\), which single row operation produces \\(\\begin{pmatrix}2&1\\\\0&1\\end{pmatrix}\\)?",
        steps: [
          "Row 1 is unchanged, so the operation acts on \\(R_2\\).",
          "Need \\((4,3)\\to(0,1)\\). Try \\(R_2\\to R_2+kR_1=(4+2k,\\ 3+k)\\).",
          "First entry: \\(4+2k=0\\Rightarrow k=-2\\); check second: \\(3+(-2)=1\\) ✓ consistent.",
        ],
        answer: "\\(R_2\\to R_2-2R_1\\).",
      },
      selfCheckExample: {
        prompt: "Can \\(\\begin{pmatrix}1&2\\\\3&4\\end{pmatrix}\\) become \\(\\begin{pmatrix}3&4\\\\1&2\\end{pmatrix}\\) in a single elementary row operation?",
        steps: [
          "The two rows have simply traded places — \\(R_1\\) became \\((3,4)\\) and \\(R_2\\) became \\((1,2)\\).",
          "That is exactly the interchange \\(R_1\\leftrightarrow R_2\\), one elementary operation.",
        ],
        answer: "Yes — swap \\(R_1\\leftrightarrow R_2\\).",
      },
      practiceSet: [
        { prompt: "Name the three elementary row operations.", answer: "Swap two rows; scale a row by \\(k\\neq0\\); add a multiple of one row to another" },
        { prompt: "\\(R_2\\to R_2+3R_1\\) on \\(\\begin{pmatrix}1&0\\\\0&1\\end{pmatrix}\\) gives?", answer: "\\(\\begin{pmatrix}1&0\\\\3&1\\end{pmatrix}\\)" },
        { prompt: "Is scaling a row by \\(0\\) an elementary operation?", answer: "No — the scalar must be nonzero" },
        { prompt: "Which single operation changes two rows at once?", answer: "The interchange \\(R_i\\leftrightarrow R_j\\)" },
      ],
      pyqExampleId: "f0652be7-97ef-411c-965a-c13ecfd37a7c", // 2022 — which matrix NOT obtainable by one row op
    },

    // C6 — counting matrices
    {
      kind: "formula" as const,
      slug: "jmat-counting-matrices",
      name: "Counting matrices",
      intuition:
        "If each of the \\(mn\\) entries can independently take one of \\(k\\) values, there are \\(k^{mn}\\) matrices — a plain product rule. Two flavoured counts recur in JEE: counting **singular** \\(2\\times2\\) matrices uses the condition \\(ad=bc\\) (group by the common product value), and counting via \\(\\operatorname{tr}(A^{T}A)=\\sum_{i,j}a_{ij}^{2}\\) turns a trace condition into 'how many entries are nonzero'.",
      definition:
        "- **Free-choice count:** an \\(m\\times n\\) matrix with each entry from a \\(k\\)-element set gives \\(k^{mn}\\) matrices.\n" +
        "- **Singular \\(2\\times2\\):** \\(\\det=ad-bc=0\\iff ad=bc\\). Count ordered pairs by product: if \\(n_p\\) pairs from the set have product \\(p\\), the number of singular matrices is \\(\\sum_p n_p^{2}\\).\n" +
        "- **Trace bridge:** \\(\\operatorname{tr}(A^{T}A)=\\sum_{i,j}a_{ij}^{2}\\). Over entries in \\(\\{-1,0,1\\}\\) each square is \\(0\\) or \\(1\\), so the trace simply counts the nonzero entries — choose their positions, then their signs.",
      formula: {
        label: "Counting bridges",
        latex: "\\#=k^{mn}\\qquad \\operatorname{tr}(A^{T}A)=\\sum_{i,j}a_{ij}^{2}",
      },
      authoredExample: {
        prompt: "How many singular \\(2\\times2\\) matrices have every entry from \\(\\{1,2,4\\}\\)? (Singular means \\(ad=bc\\).)",
        steps: [
          "List the product \\(xy\\) over ordered pairs \\((x,y)\\) from \\(\\{1,2,4\\}\\), and count how many pairs give each product: \\(1\\to1\\), \\(2\\to2\\), \\(4\\to3\\), \\(8\\to2\\), \\(16\\to1\\) (total \\(9=3^{2}\\) pairs).",
          "Singular needs \\(ad=bc\\): for each product value \\(p\\), pick \\((a,d)\\) and \\((b,c)\\) both giving \\(p\\) — that's \\(n_p^{2}\\) choices.",
          "Sum: \\(1^{2}+2^{2}+3^{2}+2^{2}+1^{2}=1+4+9+4+1\\).",
        ],
        answer: "\\(19\\) singular matrices.",
      },
      selfCheckExample: {
        prompt: "How many \\(2\\times2\\) matrices with entries from \\(\\{-1,0,1\\}\\) have \\(\\operatorname{tr}(A^{T}A)=2\\)?",
        steps: [
          "\\(\\operatorname{tr}(A^{T}A)=\\sum a_{ij}^{2}\\), and each entry squares to \\(0\\) (if \\(0\\)) or \\(1\\) (if \\(\\pm1\\)), so the trace counts the nonzero entries.",
          "Value \\(2\\) means exactly \\(2\\) of the \\(4\\) entries are nonzero: \\(\\binom{4}{2}=6\\) position choices.",
          "Each nonzero entry is \\(+1\\) or \\(-1\\): \\(2^{2}=4\\) sign choices. Total \\(6\\times4\\).",
        ],
        answer: "\\(24\\) matrices.",
      },
      practiceSet: [
        { prompt: "Number of \\(2\\times2\\) matrices with entries from \\(\\{0,1\\}\\)?", answer: "\\(2^{4}=16\\)" },
        { prompt: "Number of \\(3\\times3\\) matrices with entries from \\(\\{1,2,3\\}\\)?", answer: "\\(3^{9}=19683\\)" },
        { prompt: "\\(\\operatorname{tr}(A^{T}A)\\) equals the sum of what?", answer: "The squares of all entries" },
        { prompt: "\\(2\\times2\\) matrices over \\(\\{-1,0,1\\}\\) with \\(\\operatorname{tr}(A^{T}A)=4\\) (all entries nonzero)?", answer: "\\(2^{4}=16\\)" },
      ],
      pyqExampleId: "09cd8b3a-8c3e-42b1-871f-2a8da4695b3d", // 2025 — count singular 2x2 from {2,3,6,9}
    },
  ],
};
