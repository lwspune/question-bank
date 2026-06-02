import type { SubtopicNote } from "@/app/notes/_types";

export const DETERMINANTS_EVALUATION_PROPERTIES_NOTE: SubtopicNote = {
  subtopicName: "Determinant Properties, Operations, and Sums",
  title: "Determinants: Evaluation & Properties",
  oneLineDefinition:
    "A determinant collapses a square matrix to one number; a handful of properties (multiplicativity, row operations, the factor theorem) evaluate almost any exam determinant without brute force.",
  whyItMatters:
    "Fifty-nine PYQs — the largest and hardest area in the chapter (46% HARD). This is where the " +
    "marks and the traps both live: determinant of products and scalars (det(kA) = kⁿ det A is the " +
    "#1 trap), the row/column properties, the factor-theorem and Vandermonde determinants, cyclic " +
    "determinants, and telescoping sums of determinants. The eight concepts below cover the lot.",
  concepts: [
    // C1 — evaluating
    {
      kind: "formula" as const,
      slug: "evaluating-determinants",
      name: "Evaluating 2×2 and 3×3 determinants",
      intuition:
        "A \\(2\\times2\\) determinant is \\(ad - bc\\); geometrically it's the signed area of the " +
        "parallelogram spanned by the columns. A \\(3\\times3\\) is found by cofactor expansion along " +
        "any row/column, or by Sarrus' diagonal rule.",
      definition:
        "\\(\\begin{vmatrix}a&b\\\\c&d\\end{vmatrix} = ad - bc\\). For \\(3\\times3\\), expand along a " +
        "row: \\(\\sum_j a_{1j}(-1)^{1+j}M_{1j}\\), or use **Sarrus** — add the three down-right diagonal " +
        "products, subtract the three down-left ones. Expanding along the row/column with the most zeros " +
        "is fastest.",
      formula: {
        label: "2×2 determinant",
        latex: "\\begin{vmatrix} a & b \\\\ c & d \\end{vmatrix} = ad - bc",
      },
      visualizationSlug: "determinant-as-area",
      authoredExample: {
        prompt: "Evaluate \\(\\begin{vmatrix}1 & 2 & 3\\\\0 & 4 & 5\\\\1 & 0 & 6\\end{vmatrix}\\) by expanding along the first column.",
        steps: [
          "Down column 1 the entries are \\(1, 0, 1\\) with cofactor signs \\(+, -, +\\) — the middle (zero) term drops out.",
          "\\(= 1\\cdot\\begin{vmatrix}4 & 5\\\\0 & 6\\end{vmatrix} + 1\\cdot\\begin{vmatrix}2 & 3\\\\4 & 5\\end{vmatrix}\\).",
          "\\(\\begin{vmatrix}4 & 5\\\\0 & 6\\end{vmatrix} = 24\\); \\(\\begin{vmatrix}2 & 3\\\\4 & 5\\end{vmatrix} = 10 - 12 = -2\\).",
          "Sum: \\(1(24) + 1(-2) = 22\\).",
        ],
        answer: "\\(22\\).",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\begin{vmatrix}2 & 0 & 1\\\\3 & 1 & 2\\\\1 & 0 & 4\\end{vmatrix}\\).",
        steps: [
          "Column 2 is \\((0, 1, 0)\\) — expand along it; only the middle entry contributes.",
          "\\(= 1 \\cdot (+1)\\begin{vmatrix}2 & 1\\\\1 & 4\\end{vmatrix}\\) (cofactor sign at \\((2,2)\\) is \\(+\\)).",
          "\\(= 8 - 1 = 7\\).",
        ],
        answer: "\\(7\\).",
      },
      practiceSet: [
        { prompt: "\\(\\begin{vmatrix}3&1\\\\2&4\\end{vmatrix}\\)?", answer: "\\(10\\)", method: "\\(12 - 2\\)" },
        { prompt: "\\(\\begin{vmatrix}5&2\\\\10&4\\end{vmatrix}\\)?", answer: "\\(0\\)", method: "rows proportional" },
        { prompt: "Geometric meaning of a 2×2 determinant?", answer: "Signed area of the parallelogram of its columns" },
        { prompt: "Best row/column to expand a 3×3 along?", answer: "The one with the most zeros" },
      ],
      pyqExampleId: "81bbff14-de8a-421d-b24a-57bc1e7f8cbe", // 2017 — [[1,1,1],[1,1+xyz,1],[1,1,1+xyz]]
    },

    // C2 — products & scalar
    {
      kind: "formula" as const,
      slug: "det-products-scalar-powers",
      name: "Determinant of products, scalars, and powers",
      intuition:
        "Determinant is multiplicative: \\(\\det(AB) = \\det A \\cdot \\det B\\). The single most-tested " +
        "trap is scaling: pulling a scalar out of the WHOLE matrix multiplies the determinant by " +
        "\\(k^n\\) (not \\(k\\)), because it scales all \\(n\\) rows.",
      definition:
        "For \\(n\\times n\\) matrices: \\(\\det(AB) = \\det A\\,\\det B\\); \\(\\det(A^T) = \\det A\\); " +
        "\\(\\det(kA) = k^n \\det A\\); \\(\\det(A^m) = (\\det A)^m\\); \\(\\det(A^{-1}) = 1/\\det A\\); " +
        "\\(\\det(B^{-1}AB) = \\det A\\); \\(\\det(AA^T) = (\\det A)^2\\).",
      formula: {
        label: "Multiplicativity and scaling",
        latex: "\\det(AB) = \\det A\\,\\det B, \\qquad \\det(kA) = k^{\\,n}\\det A",
      },
      authoredExample: {
        prompt: "If \\(A\\) is a square matrix with \\(|A| = -2\\), find \\(|AA^T|\\).",
        steps: [
          "\\(|AA^T| = |A|\\cdot|A^T|\\).",
          "\\(|A^T| = |A| = -2\\).",
          "\\(|AA^T| = (-2)(-2) = 4 = |A|^2\\).",
        ],
        answer: "\\(4\\).",
      },
      selfCheckExample: {
        prompt: "If \\(A\\) is \\(3\\times3\\) with \\(\\det A = 4\\), find \\(\\det(2A)\\).",
        steps: [
          "Scaling the whole \\(3\\times3\\) matrix by 2 scales all 3 rows.",
          "\\(\\det(2A) = 2^3 \\det A = 8 \\cdot 4\\).",
        ],
        answer: "\\(\\det(2A) = 32\\) (not 8).",
      },
      practiceSet: [
        { prompt: "\\(\\det(kA)\\) for \\(n\\times n\\)?", answer: "\\(k^n \\det A\\)" },
        { prompt: "\\(\\det(A^{-1})\\)?", answer: "\\(1/\\det A\\)" },
        { prompt: "\\(\\det(B^{-1}AB)\\)?", answer: "\\(\\det A\\)" },
        { prompt: "\\(\\det(A^T)\\) vs \\(\\det A\\)?", answer: "Equal" },
      ],
      pyqExampleId: "b22a925b-d5ac-487f-92c2-a625bdd40274", // 2026 — |AA^T| with |A|=-2
      traps: [
        {
          title: "\\(\\det(kA) = k^n \\det A\\), NOT \\(k\\det A\\)",
          body:
            "Pulling a scalar out of a determinant works one ROW at a time. Factoring \\(k\\) from the " +
            "whole \\(n\\times n\\) matrix factors it from each of the \\(n\\) rows → \\(k^n\\). The " +
            "single most common determinant mistake in this bank.",
        },
      ],
    },

    // C3 — core properties
    {
      kind: "formula" as const,
      slug: "core-determinant-properties",
      name: "Core row and column properties",
      intuition:
        "A short list of properties handles most symbolic determinants: swapping two rows flips the " +
        "sign, two equal (or proportional) rows make it 0, a common factor pulls out of a row, and " +
        "adding a multiple of one row to another leaves it unchanged — the workhorse for simplifying.",
      definition:
        "- **Transpose:** \\(\\det A^T = \\det A\\) (rows and columns play identical roles).\n" +
        "- **Swap:** swapping two rows/columns multiplies the determinant by \\(-1\\).\n" +
        "- **Equal/proportional:** two identical or proportional rows/columns \\(\\Rightarrow \\det = 0\\).\n" +
        "- **Common factor:** a factor common to a row/column pulls outside.\n" +
        "- **Row operation:** \\(R_i \\to R_i + \\lambda R_j\\) leaves the determinant unchanged (the key simplification move).",
      visualizationSlug: "sarrus-rule",
      authoredExample: {
        prompt:
          "If \\(\\Delta = \\begin{vmatrix}a&b&c\\\\d&e&f\\\\g&h&i\\end{vmatrix}\\), what happens to \\(\\Delta\\) if you multiply row 1 by 3 and swap rows 2 and 3?",
        steps: [
          "Multiplying one row by 3 multiplies the determinant by 3.",
          "Swapping two rows multiplies by \\(-1\\).",
          "Net effect: \\(3 \\times (-1) = -3\\), so the new determinant is \\(-3\\Delta\\).",
        ],
        answer: "\\(-3\\Delta\\).",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\begin{vmatrix}a & b & c\\\\ l & m & n\\\\ p & q & r\\end{vmatrix}\\) compared with \\(\\begin{vmatrix}l & m & n\\\\ a & b & c\\\\ p & q & r\\end{vmatrix}\\).",
        steps: [
          "The second is the first with rows 1 and 2 swapped.",
          "A single row swap multiplies the determinant by \\(-1\\).",
        ],
        answer: "They are negatives of each other.",
      },
      practiceSet: [
        { prompt: "Two identical rows ⇒ determinant?", answer: "\\(0\\)" },
        { prompt: "Swapping two columns multiplies det by?", answer: "\\(-1\\)" },
        { prompt: "\\(R_2 \\to R_2 + 5R_1\\) changes det by?", answer: "Nothing (unchanged)" },
        { prompt: "\\(\\det A^T\\) vs \\(\\det A\\)?", answer: "Equal" },
      ],
      pyqExampleId: "e380250f-7e68-4315-8de4-ff1a8ec3cdc0", // 2021 — row-op transform of det
    },

    // C4 — singular & equations
    {
      kind: "formula" as const,
      slug: "singular-and-determinant-equations",
      name: "Singular matrices and determinant equations",
      intuition:
        "A matrix is **singular** exactly when its determinant is 0 — that's also when it has no " +
        "inverse. Many questions set a determinant equal to 0 (or to a value) and ask for the unknown: " +
        "expand, then solve the resulting polynomial in \\(x\\).",
      definition:
        "\\(A\\) is **singular** \\(\\iff \\det A = 0 \\iff A^{-1}\\) does not exist. Determinant " +
        "equations \\(\\det(\\cdot) = 0\\) become polynomial equations once expanded; simplify first " +
        "with row operations to lower the degree of work.",
      authoredExample: {
        prompt: "Find \\(x\\) if \\(\\begin{vmatrix}1 & 2 & 3\\\\2 & x & 6\\\\0 & 0 & 1\\end{vmatrix} = 0\\).",
        steps: [
          "Expand along row 3 (it has two zeros): only the \\((3,3)\\) entry \\(= 1\\) contributes.",
          "Cofactor of \\((3,3)\\): \\((+1)\\begin{vmatrix}1&2\\\\2&x\\end{vmatrix} = x - 4\\).",
          "So the determinant \\(= 1 \\cdot (x - 4) = 0\\).",
          "\\(x = 4\\).",
        ],
        answer: "\\(x = 4\\).",
      },
      selfCheckExample: {
        prompt: "For what value of \\(x\\) does \\(\\begin{pmatrix}2 & 4\\\\-8 & x\\end{pmatrix}\\) fail to have an inverse?",
        steps: [
          "No inverse ⇔ singular ⇔ determinant 0.",
          "\\(2x - 4(-8) = 2x + 32 = 0\\).",
          "\\(x = -16\\).",
        ],
        answer: "\\(x = -16\\).",
      },
      practiceSet: [
        { prompt: "Singular means determinant equals?", answer: "\\(0\\)" },
        { prompt: "A singular matrix has an inverse?", answer: "No" },
        { prompt: "\\(\\begin{vmatrix}x&2\\\\2&x\\end{vmatrix}=0\\) ⇒ x?", answer: "\\(x = \\pm 2\\)" },
        { prompt: "Best first step on a determinant equation?", answer: "Simplify with row operations, then expand" },
      ],
      pyqExampleId: "ca983083-fa6c-4a8e-ada8-a7353e9cd668", // 2021 — det=0 find x
    },

    // C5 — factor theorem
    {
      kind: "formula" as const,
      slug: "factor-theorem-determinants",
      name: "Factor-theorem and Vandermonde determinants",
      intuition:
        "When a determinant has symbolic entries, treat it as a polynomial: if setting \\(a = b\\) makes " +
        "two rows equal (determinant 0), then \\((a - b)\\) is a factor. Chaining this gives the famous " +
        "Vandermonde factorisation \\((a-b)(b-c)(c-a)\\).",
      definition:
        "If substituting \\(x = c\\) makes two rows/columns identical, \\((x - c)\\) divides the " +
        "determinant (factor theorem). The **Vandermonde** determinant " +
        "\\(\\begin{vmatrix}1&1&1\\\\a&b&c\\\\a^2&b^2&c^2\\end{vmatrix} = (a-b)(b-c)(c-a)\\). Use known " +
        "factors plus a degree/leading-coefficient check to pin the constant.",
      formula: {
        label: "Vandermonde (3×3)",
        latex: "\\begin{vmatrix}1&1&1\\\\a&b&c\\\\a^2&b^2&c^2\\end{vmatrix} = (a-b)(b-c)(c-a)",
      },
      authoredExample: {
        prompt: "Show \\((a-b)\\) is a factor of \\(D = \\begin{vmatrix}1&1&1\\\\a&b&c\\\\a^2&b^2&c^2\\end{vmatrix}\\), and state \\(D\\).",
        steps: [
          "Put \\(a = b\\): columns 1 and 2 become identical \\(\\Rightarrow D = 0\\). So \\((a-b)\\) divides \\(D\\).",
          "By symmetry \\((b-c)\\) and \\((c-a)\\) also divide \\(D\\); the product has the right degree (3).",
          "A leading-term check fixes the constant as \\(+1\\).",
        ],
        answer: "\\(D = (a-b)(b-c)(c-a)\\).",
      },
      selfCheckExample: {
        prompt: "Which factor does \\(\\begin{vmatrix}x & y & 3\\\\ x^2 & y^2 & 9\\\\ x^3 & y^3 & 27\\end{vmatrix}\\) contain — \\((x-y)\\), \\((x-3)\\), or \\((y-3)\\)?",
        steps: [
          "Put \\(x = y\\): columns 1 and 2 become identical → determinant 0. So \\((x - y)\\) is a factor.",
          "Put \\(x = 3\\): column 1 becomes \\((3,9,27)\\) = column 3 → 0. So \\((x-3)\\) is a factor too.",
          "Likewise \\((y - 3)\\). All three are factors.",
        ],
        answer: "All of \\((x-y)\\), \\((x-3)\\), \\((y-3)\\) are factors.",
      },
      practiceSet: [
        { prompt: "If \\(a=b\\) makes two columns equal, a factor is?", answer: "\\((a-b)\\)" },
        { prompt: "Vandermonde \\(\\begin{vmatrix}1&1&1\\\\a&b&c\\\\a^2&b^2&c^2\\end{vmatrix}\\)?", answer: "\\((a-b)(b-c)(c-a)\\)" },
        { prompt: "Two equal rows give determinant?", answer: "\\(0\\)" },
        { prompt: "How to fix the leftover constant after finding factors?", answer: "Compare a leading term / a coefficient" },
      ],
      pyqExampleId: "52407c0a-fc7a-44fa-bc74-3630b360364c", // 2018 — which factor
    },

    // C6 — cyclic
    {
      kind: "formula" as const,
      slug: "cyclic-determinants",
      name: "Cyclic determinants",
      intuition:
        "The cyclic determinant \\(\\begin{vmatrix}a&b&c\\\\b&c&a\\\\c&a&b\\end{vmatrix}\\) factors as " +
        "\\(-(a^3 + b^3 + c^3 - 3abc) = -(a+b+c)(a^2+b^2+c^2-ab-bc-ca)\\). So it vanishes exactly when " +
        "\\(a+b+c = 0\\) or \\(a = b = c\\).",
      definition:
        "\\(\\begin{vmatrix}a&b&c\\\\b&c&a\\\\c&a&b\\end{vmatrix} = -(a^3+b^3+c^3-3abc) = -(a+b+c)(a^2+b^2+c^2-ab-bc-ca)\\). " +
        "It equals 0 iff \\(a+b+c = 0\\) (real case) or \\(a=b=c\\). Recognising the cyclic pattern " +
        "saves a full expansion.",
      formula: {
        label: "Cyclic determinant",
        latex: "\\begin{vmatrix}a&b&c\\\\b&c&a\\\\c&a&b\\end{vmatrix} = -(a^3+b^3+c^3-3abc)",
      },
      authoredExample: {
        prompt: "Under what condition does \\(\\begin{vmatrix}a&b&c\\\\b&c&a\\\\c&a&b\\end{vmatrix} = 0\\) (for real \\(a,b,c\\))?",
        steps: [
          "It factors as \\(-(a+b+c)(a^2+b^2+c^2-ab-bc-ca)\\).",
          "The quadratic factor \\(= \\tfrac12[(a-b)^2+(b-c)^2+(c-a)^2] = 0\\) only when \\(a=b=c\\).",
          "So the determinant is 0 iff \\(a+b+c = 0\\) or \\(a = b = c\\).",
        ],
        answer: "When \\(a + b + c = 0\\) or \\(a = b = c\\).",
      },
      selfCheckExample: {
        prompt: "If \\(a + b + c = 4\\) and \\(ab + bc + ca = 0\\), find \\(\\begin{vmatrix}a&b&c\\\\b&c&a\\\\c&a&b\\end{vmatrix}\\) given also \\(abc = 0\\).",
        steps: [
          "Value \\(= -(a^3+b^3+c^3 - 3abc)\\).",
          "\\(a^3+b^3+c^3 - 3abc = (a+b+c)(a^2+b^2+c^2 - ab-bc-ca)\\).",
          "\\(a^2+b^2+c^2 = (a+b+c)^2 - 2(ab+bc+ca) = 16 - 0 = 16\\); minus \\((ab+bc+ca)=0\\) → 16.",
          "So value \\(= -(4)(16) = -64\\).",
        ],
        answer: "\\(-64\\).",
      },
      practiceSet: [
        { prompt: "\\(\\begin{vmatrix}a&b&c\\\\b&c&a\\\\c&a&b\\end{vmatrix}\\) in terms of cubes?", answer: "\\(-(a^3+b^3+c^3-3abc)\\)" },
        { prompt: "It vanishes (real) when?", answer: "\\(a+b+c=0\\) or \\(a=b=c\\)" },
        { prompt: "Factor of \\(a^3+b^3+c^3-3abc\\)?", answer: "\\((a+b+c)\\)" },
        { prompt: "If \\(a=b=c=2\\), the cyclic determinant is?", answer: "\\(0\\)" },
      ],
      pyqExampleId: "9f108e52-3784-404f-8aac-cf4d201a1862", // 2022 — when cyclic det vanishes
    },

    // C7 — sums of determinants
    {
      kind: "formula" as const,
      slug: "sum-of-determinants",
      name: "Sums and sequences of determinants",
      intuition:
        "When asked for \\(\\sum_k \\det(A_k)\\) with \\(A_k\\) depending on \\(k\\), first get a clean " +
        "formula for \\(\\det(A_k)\\) (often linear or telescoping in \\(k\\)), then apply the standard " +
        "series sum — don't compute 100 determinants.",
      definition:
        "Evaluate \\(\\det(A_k)\\) symbolically in \\(k\\); it is frequently a constant, linear, or " +
        "telescoping expression. Then sum with \\(\\sum_{k=1}^{n} k = \\tfrac{n(n+1)}{2}\\), " +
        "\\(\\sum k^2 = \\tfrac{n(n+1)(2n+1)}{6}\\), or telescoping cancellation.",
      authoredExample: {
        prompt: "If \\(A_k = \\begin{pmatrix}k & 1\\\\2 & 3\\end{pmatrix}\\), find \\(\\sum_{k=1}^{100}\\det(A_k)\\).",
        steps: [
          "\\(\\det(A_k) = (k)(3) - (1)(2) = 3k - 2\\).",
          "\\(\\sum_{k=1}^{100}(3k - 2) = 3\\sum k - 2\\cdot100 = 3\\cdot\\tfrac{100\\cdot101}{2} - 200 = 15150 - 200\\).",
          "\\(= 14950\\).",
        ],
        answer: "\\(14950\\).",
      },
      selfCheckExample: {
        prompt: "If \\(M_k = \\begin{pmatrix}k & k-1\\\\k-1 & k\\end{pmatrix}\\), find \\(\\det(M_1) + \\det(M_2) + \\dots + \\det(M_n)\\).",
        steps: [
          "\\(\\det(M_k) = k^2 - (k-1)^2 = 2k - 1\\).",
          "\\(\\sum_{k=1}^{n}(2k-1) = n^2\\).",
        ],
        answer: "\\(n^2\\).",
      },
      practiceSet: [
        { prompt: "\\(\\det\\begin{pmatrix}k&k-1\\\\k-1&k\\end{pmatrix}\\)?", answer: "\\(2k-1\\)" },
        { prompt: "\\(\\sum_{k=1}^{n}(2k-1)\\)?", answer: "\\(n^2\\)" },
        { prompt: "First step on \\(\\sum \\det(A_k)\\)?", answer: "Find \\(\\det(A_k)\\) as a formula in k" },
        { prompt: "\\(\\sum_{k=1}^{10} k\\)?", answer: "\\(55\\)" },
      ],
      pyqExampleId: "48e4160c-be94-4d07-bdd1-1912c37d6eda", // 2023 — sum det(A_k) k=1..100
    },

    // C8 — structured special cases
    {
      kind: "formula" as const,
      slug: "structured-determinant-cases",
      name: "Structured and bounded determinants",
      intuition:
        "Some determinants are decided by structure, not arithmetic: if every row is a fixed multiple " +
        "pattern (rank 1) the determinant is 0; if entries are bounded (all \\(\\pm 1\\)), the " +
        "determinant is bounded too. Spot the structure instead of expanding.",
      definition:
        "- **Rank-1 patterns:** if \\(a_{ij}\\) factors as \\(f(i)g(j)\\) (e.g. \\(a_{ij} = 2(i+j)\\) is a " +
        "sum of two rank-1 pieces), the \\(3\\times3\\) determinant collapses to 0.\n" +
        "- **Bounded entries:** a third-order determinant with entries all \\(\\pm1\\) lies in a small " +
        "range; the maximum magnitude is 4.\n" +
        "- **Counting determinants** from a fixed set of numbers uses permutations of the placements.",
      authoredExample: {
        prompt: "The element in row \\(i\\), column \\(j\\) of a 3rd-order determinant is \\(2(i+j)\\). Find its value.",
        steps: [
          "Entries: \\(a_{ij} = 2i + 2j\\) — a sum of a row-only term and a column-only term.",
          "Such a determinant is rank ≤ 2, so for a \\(3\\times3\\) it must be 0 (rows are linear combinations).",
          "Concretely \\(R_3 - R_2 = R_2 - R_1\\) (constant row differences) → rows dependent.",
        ],
        answer: "\\(0\\).",
      },
      practiceSet: [
        { prompt: "If \\(a_{ij} = f(i)g(j)\\), a 3×3 determinant is?", answer: "\\(0\\) (rank 1)" },
        { prompt: "Rows in arithmetic progression ⇒ determinant?", answer: "\\(0\\)" },
        { prompt: "Max magnitude of a 3×3 determinant with entries all \\(\\pm1\\)?", answer: "\\(4\\)" },
        { prompt: "\\(a_{ij} = i + j\\) for 3×3 — determinant?", answer: "\\(0\\)" },
      ],
      pyqExampleId: "de0e9002-1c3f-4165-a5a8-575b68daf59f", // 2021 — a_ij = 2(i+j)
    },
  ],
};
