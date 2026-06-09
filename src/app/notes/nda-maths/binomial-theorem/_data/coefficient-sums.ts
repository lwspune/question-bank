import type { SubtopicNote } from "@/app/notes/_types";

export const COEFFICIENT_SUMS_NOTE: SubtopicNote = {
  subtopicName: "Sums of Binomial Coefficients — Alternating, Weighted, and Symmetric",
  title: "Sums of Binomial Coefficients",
  oneLineDefinition:
    "Sums of binomial coefficients are read off by substituting clever values of x into (1+x)ⁿ — x = 1 gives the total, x = −1 gives the alternating sum, and differentiating first gives the weighted sums.",
  whyItMatters:
    "14 PYQs. The whole subtopic runs on one idea: the coefficients ARE the expansion, so plug a number into the right identity. x = 1, x = −1, and 'differentiate then substitute' cover almost everything; the Pascal-rule identities mop up the rest.",
  concepts: [
    // 1 — sum of all coefficients
    {
      kind: "formula" as const,
      slug: "bt-sum-of-all-coefficients",
      name: "Sum of All Coefficients — Put x = 1",
      pyqExampleId: "f516f536-61e5-420d-bb56-83452447ddb5",
      intuition:
        "The sum of all the coefficients of a polynomial is just its value at x = 1 — substituting 1 strips away every power of x and leaves the coefficients added up. For (1+x)ⁿ that total is 2ⁿ.",
      definition:
        "For any polynomial \\(f(x)\\), the **sum of all coefficients** is \\(f(1)\\). In particular:\n" +
        "- \\(\\binom{n}{0} + \\binom{n}{1} + \\cdots + \\binom{n}{n} = (1+1)^n = 2^n\\).\n" +
        "- Dropping the first term: \\(\\binom{n}{1} + \\cdots + \\binom{n}{n} = 2^n - 1\\).\n" +
        "- A weighted base: \\(\\sum_r \\binom{n}{r} c^r = (1+c)^n\\) (e.g. \\(\\sum_r 2^r\\binom{n}{r} = 3^n\\)).",
      formula: {
        label: "Sum of coefficients = f(1)",
        latex: "\\sum_{r=0}^{n}\\binom{n}{r} = 2^n, \\qquad \\sum_{r=0}^{n}\\binom{n}{r}c^{r} = (1+c)^n",
      },
      authoredExample: {
        prompt: "Find the sum of all coefficients in the expansion of \\((2x + 3)^5\\).",
        steps: [
          "Sum of coefficients \\(= f(1) = (2\\cdot 1 + 3)^5 = 5^5\\).",
        ],
        answer: "\\(3125\\).",
      },
      traps: [
        {
          title: "Sum of coefficients uses x = 1, not x = 0",
          body:
            "\\(f(0)\\) gives only the CONSTANT term; \\(f(1)\\) gives the sum of ALL coefficients. For a multivariable form set every variable to 1.",
        },
      ],
    },

    // 2 — odd/even & alternating sums
    {
      kind: "formula" as const,
      slug: "bt-odd-even-alternating-sums",
      name: "Alternating & Odd/Even-Index Sums — Put x = −1",
      pyqExampleId: "f04a8076-00b6-4b2f-a064-f19e2576e14d",
      intuition:
        "Substituting x = −1 flips the sign of every odd-power term, so it isolates the alternating sum — which collapses to zero for (1+x)ⁿ because the positives and negatives cancel exactly. Combining the x = 1 and x = −1 results splits the coefficients into odd-index and even-index halves.",
      definition:
        "Substitute \\(x = -1\\):\n" +
        "- **Alternating sum:** \\(\\binom{n}{0} - \\binom{n}{1} + \\binom{n}{2} - \\cdots = (1-1)^n = 0\\) (for \\(n \\ge 1\\)).\n" +
        "- For a general polynomial, \\(a_0 - a_1 + a_2 - \\cdots = f(-1)\\).\n" +
        "- **Odd/even split:** sum of even-index coefficients \\(=\\) sum of odd-index coefficients \\(= \\dfrac{f(1)}{2} = 2^{\\,n-1}\\). (They are equal because \\(f(-1) = 0\\).)\n" +
        "- In \\((a+b)^n + (a-b)^n\\), the odd-power terms cancel; in the difference, the even-power terms cancel.",
      formula: {
        label: "Alternating sum and the split",
        latex: "\\sum_r (-1)^r \\binom{n}{r} = 0, \\qquad \\text{even-sum} = \\text{odd-sum} = 2^{\\,n-1}",
      },
      authoredExample: {
        prompt: "If \\((1 - x + x^2)^4 = a_0 + a_1 x + \\cdots + a_8 x^8\\), find \\(a_0 - a_1 + a_2 - \\cdots + a_8\\).",
        steps: [
          "The alternating sum is \\(f(-1)\\): substitute \\(x = -1\\).",
          "\\(f(-1) = (1 - (-1) + (-1)^2)^4 = (1 + 1 + 1)^4 = 3^4\\).",
        ],
        answer: "\\(81\\).",
      },
    },

    // 3 — weighted sums via differentiation (set S4)
    {
      kind: "formula" as const,
      slug: "bt-weighted-sums-differentiation",
      name: "Weighted Sums via Differentiation",
      pyqExampleId: "2fc6ddc0-c996-4e9f-8681-06da96f2d367",
      intuition:
        "A sum where each coefficient is multiplied by its index — like 1·C₁ + 2·C₂ + 3·C₃ + ⋯ — comes from DIFFERENTIATING (1+x)ⁿ once (which pulls a factor of the index down) and then substituting. Differentiate, then plug in x = 1 (or x = −1 for the alternating version).",
      definition:
        "Start from \\((1+x)^n = \\sum_r \\binom{n}{r} x^r\\) and differentiate:\n" +
        "\\[n(1+x)^{n-1} = \\sum_{r=1}^{n} r\\binom{n}{r} x^{\\,r-1}.\\]\n" +
        "- Put \\(x = 1\\): \\(\\displaystyle\\sum_{r=1}^{n} r\\binom{n}{r} = n\\,2^{\\,n-1}\\).\n" +
        "- Put \\(x = -1\\): \\(\\displaystyle\\sum_{r=1}^{n} (-1)^{r-1} r\\binom{n}{r} = 0\\) for \\(n > 1\\).\n" +
        "Multiplying by \\(x\\) before differentiating, or differentiating twice, handles \\(\\sum r^2\\binom{n}{r}\\)-type sums.",
      formula: {
        label: "Index-weighted sum",
        latex: "\\sum_{r=1}^{n} r\\binom{n}{r} = n\\,2^{\\,n-1}",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\,1\\cdot\\binom{n}{1} + 2\\cdot\\binom{n}{2} + \\cdots + n\\cdot\\binom{n}{n}\\).",
        steps: [
          "This is \\(\\sum_{r=1}^{n} r\\binom{n}{r}\\).",
          "Differentiate \\((1+x)^n\\): \\(n(1+x)^{n-1} = \\sum r\\binom{n}{r}x^{r-1}\\), then set \\(x = 1\\).",
        ],
        answer: "\\(n\\,2^{\\,n-1}\\).",
      },
      traps: [
        {
          title: "Differentiate first, substitute second",
          body:
            "The factor of \\(r\\) only appears AFTER differentiating. Substituting \\(x=1\\) into \\((1+x)^n\\) directly gives \\(2^n\\), not the weighted sum — you must differentiate while \\(x\\) is still a variable.",
        },
      ],
    },

    // 4 — Pascal identities (no viz here; viz lives on the foundation)
    {
      kind: "formula" as const,
      slug: "bt-coefficient-identities-pascal",
      name: "Pascal's Rule & Coefficient Identities",
      pyqExampleId: "75374eef-f498-44ad-ad6a-5f8102f48abf",
      intuition:
        "A handful of structural identities — Pascal's rule, symmetry, and the alternating telescoping sum — collapse the trickiest coefficient questions to a single binomial coefficient. They are pattern-recognition tools: spot the shape, apply the identity.",
      definition:
        "The recurring identities:\n" +
        "- **Pascal's rule:** \\(\\binom{n}{r} + \\binom{n}{r-1} = \\binom{n+1}{r}\\).\n" +
        "- **Pascal applied twice:** \\(\\binom{n}{r} + 2\\binom{n}{r-1} + \\binom{n}{r-2} = \\binom{n+2}{r}\\).\n" +
        "- **Symmetry:** \\(\\binom{n}{r} = \\binom{n}{n-r}\\), so the first and last coefficients are equal, and \"coefficient of \\(a^m\\) and \\(a^n\\) in \\((1+a)^{m+n}\\)\" are equal.\n" +
        "- **Middle-term split:** \\(\\binom{2n}{n} = \\binom{2n-1}{n-1} + \\binom{2n-1}{n}\\) (Pascal's rule on the central coefficient).",
      formula: {
        label: "Pascal's rule (applied twice)",
        latex: "\\binom{n}{r} + 2\\binom{n}{r-1} + \\binom{n}{r-2} = \\binom{n+2}{r}",
      },
      authoredExample: {
        prompt: "Simplify \\(\\binom{n}{r} + 2\\binom{n}{r-1} + \\binom{n}{r-2}\\).",
        steps: [
          "Group as \\(\\left[\\binom{n}{r} + \\binom{n}{r-1}\\right] + \\left[\\binom{n}{r-1} + \\binom{n}{r-2}\\right]\\).",
          "Each bracket is Pascal's rule: \\(\\binom{n+1}{r} + \\binom{n+1}{r-1}\\).",
          "Apply Pascal's rule once more.",
        ],
        answer: "\\(\\binom{n+2}{r}\\).",
      },
      traps: [
        {
          title: "Pascal's rule needs adjacent lower indices on the SAME n",
          body:
            "\\(\\binom{n}{r} + \\binom{n}{r-1}\\) (same top, consecutive bottom) combines to \\(\\binom{n+1}{r}\\). \\(\\binom{n}{r} + \\binom{n+1}{r}\\) (different tops) does NOT — don't force the rule on a mismatched pair.",
        },
      ],
    },
  ],
};
