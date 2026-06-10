import type { SubtopicNote } from "@/app/notes/_types";

export const GEOMETRIC_PROGRESSIONS_NOTE: SubtopicNote = {
  subtopicName: "Geometric Progressions",
  title: "Geometric Progressions — the constant-ratio engine",
  oneLineDefinition:
    "A list where each term is the one before it times a fixed ratio — so terms grow (or shrink) by multiplication, and an unending GP can still add up to a finite total.",
  whyItMatters:
    "Nineteen PYQs across 2017–2026, mostly EASY–MODERATE. NDA tests the nth term, the finite sum, " +
    "and above all the infinite sum (when the ratio lies strictly between minus one and one) — " +
    "repeating decimals, continued fractions, and infinite products all reduce to it. Two more " +
    "recurring shapes: GP-preserving operations and the product-of-terms symmetry. Five concepts cover the lot.",
  concepts: [
    // C1 — basics: nth term + GM + three-in-GP
    {
      kind: "formula" as const,
      slug: "gp-nth-term-and-mean",
      name: "nth term, geometric mean, and the three-term condition",
      intuition:
        "In a GP every step multiplies by the same number — the common ratio \\(r\\). So the nth term " +
        "is the first term times \\(r\\) raised to \\((n-1)\\). Three numbers are in GP when the middle " +
        "is the geometric mean of the outer two: its square equals their product.",
      definition:
        "A **geometric progression** has first term \\(a\\) and **common ratio** " +
        "\\(r = \\dfrac{a_{k+1}}{a_k}\\) (constant, \\(r \\ne 0\\)). Then:\n" +
        "- **nth term:** \\(a_n = a\\,r^{\\,n-1}\\).\n" +
        "- **Geometric mean** of \\(a\\) and \\(b\\): \\(\\text{GM} = \\sqrt{ab}\\).\n" +
        "- **Three-term condition:** \\(a, b, c\\) are in GP \\(\\iff b^2 = ac\\).",
      formula: {
        label: "nth term and three-term condition",
        latex: "a_n = a\\,r^{\\,n-1}, \\qquad b^2 = ac \\ \\text{(for } a,b,c \\text{ in GP)}",
        symbols: [
          { symbol: "\\(a\\)", meaning: "first term" },
          { symbol: "\\(r\\)", meaning: "common ratio" },
        ],
      },
      authoredExample: {
        prompt: "Find the 6th term of the GP \\(3, 6, 12, 24, \\ldots\\)",
        steps: [
          "First term \\(a = 3\\); common ratio \\(r = 6/3 = 2\\).",
          "\\(a_6 = a\\,r^{5} = 3 \\times 2^{5} = 3 \\times 32\\).",
        ],
        answer: "\\(a_6 = 96\\).",
      },
      selfCheckExample: {
        prompt: "Find the 5th term of the GP \\(2, -6, 18, \\ldots\\)",
        steps: [
          "\\(a = 2,\\ r = -6/2 = -3\\).",
          "\\(a_5 = 2\\,(-3)^{4} = 2 \\times 81\\).",
        ],
        answer: "\\(162\\).",
      },
      practiceSet: [
        { prompt: "4th term of \\(1, 3, 9, \\ldots\\)?", answer: "\\(27\\)" },
        { prompt: "Geometric mean of \\(4\\) and \\(9\\)?", answer: "\\(6\\)", method: "\\(\\sqrt{36}\\)" },
        { prompt: "If \\(2, x, 8\\) are in GP, find \\(x\\) (positive value).", answer: "\\(4\\)", method: "\\(x^2 = 16\\)" },
        { prompt: "Common ratio of \\(81, 27, 9, \\ldots\\)?", answer: "\\(\\tfrac{1}{3}\\)" },
      ],
      pyqExampleId: "7c70cd60-62eb-493b-b0c7-2048a512dd6b", // 2019 — nth term of 25,-125,625
      traps: [
        {
          title: "The GP nth term is \\(a\\,r^{n-1}\\), not \\(a\\,r^{n}\\)",
          body:
            "The first term has the ratio applied zero times, so position \\(n\\) carries \\(r^{n-1}\\): " +
            "\\(a_n = a\\,r^{\\,n-1}\\). Using \\(a\\,r^{n}\\) overshoots by one factor of \\(r\\). For " +
            "\\(3, 6, 12, \\ldots\\) the 5th term is \\(3\\cdot 2^{4} = 48\\), not \\(3\\cdot 2^{5} = 96\\) " +
            "(that is the 6th term).",
        },
    ],
    },

    // C2 — finite sum
    {
      kind: "formula" as const,
      slug: "gp-sum-finite",
      name: "Sum of a finite GP",
      intuition:
        "Adding up a GP has a one-line formula because almost everything cancels when you subtract " +
        "\\(r\\) times the sum from the sum itself. The same formula handles repeating-digit sums " +
        "(\\(0.3 + 0.33 + 0.333 + \\cdots\\)) once you factor each term into a GP.",
      definition:
        "For a GP with first term \\(a\\), ratio \\(r \\ne 1\\), and \\(n\\) terms:\n" +
        "\\[ S_n = \\frac{a\\,(r^n - 1)}{r - 1} = \\frac{a\\,(1 - r^n)}{1 - r}. \\]\n" +
        "Use the first form when \\(r > 1\\), the second when \\(r < 1\\) (both are equal). If \\(r = 1\\) " +
        "the GP is constant and \\(S_n = na\\).",
      formula: {
        label: "Sum of n terms",
        latex: "S_n = \\frac{a\\,(r^n - 1)}{r - 1}\\quad (r \\ne 1)",
      },
      authoredExample: {
        prompt: "Find the sum of the first 6 terms of the GP \\(2, 6, 18, \\ldots\\)",
        steps: [
          "\\(a = 2,\\ r = 3,\\ n = 6\\).",
          "\\(S_6 = \\dfrac{2\\,(3^6 - 1)}{3 - 1} = \\dfrac{2\\,(729 - 1)}{2} = 729 - 1\\).",
        ],
        answer: "\\(728\\).",
      },
      selfCheckExample: {
        prompt: "Find the sum of the first 5 terms of \\(1, \\tfrac12, \\tfrac14, \\ldots\\)",
        steps: [
          "\\(a = 1,\\ r = \\tfrac12,\\ n = 5\\).",
          "\\(S_5 = \\dfrac{1\\,(1 - (1/2)^5)}{1 - 1/2} = \\dfrac{1 - \\tfrac{1}{32}}{\\tfrac12} = 2 \\times \\tfrac{31}{32}\\).",
        ],
        answer: "\\(\\tfrac{31}{16}\\).",
      },
      practiceSet: [
        { prompt: "Sum of \\(1 + 2 + 4 + 8 + 16\\)?", answer: "\\(31\\)", method: "\\(\\tfrac{1(2^5-1)}{1}\\)" },
        { prompt: "Sum of \\(3 + 9 + 27\\)?", answer: "\\(39\\)" },
        { prompt: "Sum of first 4 terms of \\(1, \\tfrac13, \\tfrac19, \\ldots\\)?", answer: "\\(\\tfrac{40}{27}\\)" },
        { prompt: "If \\(r = 1\\) and \\(a = 5\\), \\(S_n = ?\\)", answer: "\\(5n\\)" },
      ],
      pyqExampleId: "2844863e-d3c7-4698-bc64-622f851f5ea5", // 2017 — 0.3+0.33+0.333 to n terms
      traps: [
        {
          title: "Repeating-digit sums hide a GP",
          body:
            "For \\(0.3 + 0.33 + 0.333 + \\cdots\\), write each term as \\(\\tfrac{3}{9}(1 - 10^{-k})\\). " +
            "The sum splits into a constant part (an AP-like count of \\(\\tfrac13\\)) and a true GP " +
            "\\(\\sum 10^{-k}\\). Don't try to treat the original list as a GP directly — it isn't one.",
        },
      ],
    },

    // C3 — infinite sum
    {
      kind: "formula" as const,
      slug: "gp-sum-infinite",
      name: "Sum of an infinite GP",
      intuition:
        "If the ratio is between \\(-1\\) and \\(1\\), the terms shrink toward zero fast enough that the " +
        "whole unending sum settles on a finite number. That single formula cracks repeating decimals " +
        "and infinite products (take logs first for products). A **periodic continued fraction or nested " +
        "radical is NOT a GP** — those refer to themselves and are solved by a self-referential equation; " +
        "see the next concept.",
      definition:
        "For \\(|r| < 1\\), the infinite GP converges:\n" +
        "\\[ S_\\infty = \\frac{a}{1 - r}. \\]\n" +
        "If \\(|r| \\ge 1\\) the sum does not converge (no finite value). Many problems reverse this: " +
        "given \\(S_\\infty\\) and one term, solve for \\(a\\) and \\(r\\).",
      formula: {
        label: "Sum to infinity",
        latex: "S_\\infty = \\frac{a}{1 - r}\\quad (|r| < 1)",
      },
      authoredExample: {
        prompt: "Find the sum to infinity of \\(4 + 2 + 1 + \\tfrac12 + \\cdots\\)",
        steps: [
          "\\(a = 4,\\ r = \\tfrac{2}{4} = \\tfrac12\\), and \\(|r| < 1\\) so it converges.",
          "\\(S_\\infty = \\dfrac{a}{1 - r} = \\dfrac{4}{1 - \\tfrac12} = \\dfrac{4}{\\tfrac12}\\).",
        ],
        answer: "\\(8\\).",
      },
      selfCheckExample: {
        prompt: "Find the sum of \\(1 - \\tfrac13 + \\tfrac19 - \\tfrac{1}{27} + \\cdots\\)",
        steps: [
          "\\(a = 1,\\ r = -\\tfrac13\\), and \\(|r| < 1\\).",
          "\\(S_\\infty = \\dfrac{1}{1 - (-\\tfrac13)} = \\dfrac{1}{\\tfrac43}\\).",
        ],
        answer: "\\(\\tfrac34\\).",
      },
      practiceSet: [
        { prompt: "Sum to infinity of \\(1 + \\tfrac12 + \\tfrac14 + \\cdots\\)?", answer: "\\(2\\)" },
        { prompt: "Sum to infinity of \\(9 + 3 + 1 + \\cdots\\)?", answer: "\\(\\tfrac{27}{2}\\)", method: "\\(\\tfrac{9}{1 - 1/3}\\)" },
        { prompt: "Does \\(1 + 2 + 4 + \\cdots\\) have a finite sum?", answer: "No", method: "\\(|r| = 2 \\ge 1\\)" },
        { prompt: "Infinite GP with \\(a = 5\\), \\(S_\\infty = 10\\). Find \\(r\\).", answer: "\\(\\tfrac12\\)", method: "\\(10 = \\tfrac{5}{1-r}\\)" },
      ],
      pyqExampleId: "ec32a278-b027-4270-a1a7-8f75337c6078", // 2018 — 3-1+1/3-... = 9/4
      traps: [
        {
          title: "The convergence condition is not optional",
          body:
            "\\(S_\\infty = \\tfrac{a}{1-r}\\) is only valid for \\(|r| < 1\\). If a problem's ratio has " +
            "\\(|r| \\ge 1\\), the sum genuinely has no finite value — there is no number to find. Always " +
            "check \\(|r|\\) before reaching for the formula.",
        },
        {
          title: "It is \\(\\dfrac{a}{1-r}\\), watch the sign in the denominator",
          body:
            "The infinite sum is \\(S_\\infty = \\dfrac{a}{1-r}\\) — first term over \\((1 - r)\\). Flipping " +
            "it to \\(\\dfrac{a}{r-1}\\) negates the answer. For \\(4 + 2 + 1 + \\cdots\\) with \\(r = \\tfrac12\\), " +
            "\\(S_\\infty = \\dfrac{4}{1 - \\tfrac12} = 8\\); the wrong \\(\\dfrac{4}{\\tfrac12 - 1} = -8\\) is " +
            "negative even though every term is positive.",
        },
      ],
    },

    {
      kind: "formula" as const,
      slug: "self-referential-continued-fractions",
      name: "Periodic continued fractions & nested radicals",
      intuition:
        "A repeating continued fraction or nested radical contains a copy of ITSELF. The trick is not a " +
        "GP sum: set the whole expression equal to \\(x\\), notice the part inside is the same whole \\(x\\) " +
        "again, replace it, and solve the (usually quadratic) equation that results.",
      definition:
        "For a periodic continued fraction \\(x = a + \\dfrac{1}{a + \\dfrac{1}{a + \\cdots}}\\), the tail equals " +
        "the whole, so \\(x = a + \\dfrac{1}{x} \\Rightarrow x^2 - ax - 1 = 0\\). For a nested radical " +
        "\\(x = \\sqrt{a + \\sqrt{a + \\cdots}}\\), squaring gives \\(x^2 = a + x\\). In both cases take the " +
        "**positive** root (the expression is positive).",
      formula: {
        label: "Self-referential equations",
        latex: "x = a + \\tfrac{1}{x}\\ \\Rightarrow\\ x^2 - ax - 1 = 0, \\qquad x = \\sqrt{a + x}\\ \\Rightarrow\\ x^2 - x - a = 0",
      },
      authoredExample: {
        prompt: "Evaluate the golden continued fraction \\(x = 1 + \\dfrac{1}{1 + \\dfrac{1}{1 + \\cdots}}\\).",
        steps: [
          "The expression repeats, so replace the inner copy with \\(x\\): \\(x = 1 + \\tfrac{1}{x}\\).",
          "Multiply by \\(x\\): \\(x^2 = x + 1 \\Rightarrow x^2 - x - 1 = 0\\).",
          "Positive root: \\(x = \\dfrac{1 + \\sqrt5}{2}\\) (the golden ratio).",
        ],
        answer: "\\(x = \\dfrac{1+\\sqrt5}{2}\\).",
      },
      selfCheckExample: {
        prompt: "Find \\(x = \\sqrt{6 + \\sqrt{6 + \\sqrt{6 + \\cdots}}}\\).",
        steps: [
          "Self-reference: \\(x = \\sqrt{6 + x}\\), so \\(x^2 = 6 + x\\).",
          "\\(x^2 - x - 6 = 0 \\Rightarrow (x-3)(x+2) = 0\\); take the positive root.",
        ],
        answer: "\\(x = 3\\).",
      },
      practiceSet: [
        { prompt: "\\(x = 2 + \\tfrac{1}{x}\\) gives which equation?", answer: "\\(x^2 - 2x - 1 = 0\\)" },
        { prompt: "Is a periodic continued fraction a GP sum?", answer: "No — solve it by self-reference" },
        { prompt: "\\(x = \\sqrt{2 + \\sqrt{2 + \\cdots}}\\)?", answer: "\\(2\\)", method: "\\(x^2 = 2 + x \\Rightarrow x = 2\\)" },
        { prompt: "Which root do you keep?", answer: "The positive one (the expression is positive)" },
      ],
      pyqExampleId: "b05e5dc6-a9da-4e69-8a75-ddf9f6dd6c9a", // 2+1/(2+...) = √2+1
      traps: [
        {
          title: "It is NOT an infinite GP",
          body:
            "Reaching for \\(\\tfrac{a}{1-r}\\) here is wrong — there is no common ratio. The structure is " +
            "self-referential: set it to \\(x\\), substitute the inner copy, solve the quadratic, keep the positive root.",
        },
      ],
    },

    // C4 — GP-preserving operations
    {
      kind: "formula" as const,
      slug: "gp-properties",
      name: "What preserves a GP",
      intuition:
        "Operations that act the same way on every term keep a GP a GP. Multiply or divide each term " +
        "by a constant, raise each to the same power, or take reciprocals — all still GPs (with a new " +
        "ratio). This is the GP mirror of the AP-preserving rules, and it sets up the log-bridge trick " +
        "in the next subtopic.",
      definition:
        "If \\(a, b, c\\) are in GP (so \\(b^2 = ac\\)), then so are:\n" +
        "- \\(ka,\\ kb,\\ kc\\) and \\(\\tfrac{a}{k},\\ \\tfrac{b}{k},\\ \\tfrac{c}{k}\\) (ratio \\(r\\) unchanged);\n" +
        "- \\(a^2,\\ b^2,\\ c^2\\) (ratio \\(r^2\\)) and \\(\\sqrt{a},\\ \\sqrt{b},\\ \\sqrt{c}\\) (ratio \\(\\sqrt{r}\\));\n" +
        "- \\(\\tfrac1a,\\ \\tfrac1b,\\ \\tfrac1c\\) (ratio \\(\\tfrac1r\\)).\n" +
        "Adding a constant to each term, however, does NOT preserve a GP.",
      authoredExample: {
        prompt: "If \\(a, b, c\\) are in GP, prove that \\(\\tfrac1a, \\tfrac1b, \\tfrac1c\\) are in GP.",
        steps: [
          "GP condition on the originals: \\(b^2 = ac\\).",
          "Test the three-term condition on the reciprocals: is \\(\\left(\\tfrac1b\\right)^2 = \\tfrac1a \\cdot \\tfrac1c\\)?",
          "Left side \\(= \\tfrac{1}{b^2}\\); right side \\(= \\tfrac{1}{ac}\\). Since \\(b^2 = ac\\), they are equal.",
        ],
        answer: "Yes — the reciprocals are in GP (with ratio \\(1/r\\)).",
      },
      selfCheckExample: {
        prompt: "The numbers \\(2, 6, 18\\) are in GP. Are their squares \\(4, 36, 324\\) in GP?",
        steps: [
          "Check \\(36^2 = 1296\\) against \\(4 \\times 324 = 1296\\).",
          "They match, so \\(b^2 = ac\\) holds.",
        ],
        answer: "Yes — ratio \\(9\\) (the square of the original ratio 3).",
      },
      practiceSet: [
        { prompt: "If \\(a, b, c\\) are in GP, are \\(5a, 5b, 5c\\) in GP?", answer: "Yes" },
        { prompt: "If \\(1, 2, 4\\) are in GP, is \\(1, 4, 16\\) (squares) in GP?", answer: "Yes" },
        { prompt: "Does adding 1 to each of \\(2, 4, 8\\) keep a GP?", answer: "No", method: "\\(3, 5, 9\\): \\(5^2 \\ne 27\\)" },
        { prompt: "Reciprocals of a GP form a?", answer: "GP", method: "ratio \\(1/r\\)" },
      ],
      pyqExampleId: "00d27cc3-2c95-4fc5-82fd-6b8efccf4252", // 2022 — a,b,c in GP: which transforms stay GP
    },

    // C5 — product-of-terms symmetry
    {
      kind: "formula" as const,
      slug: "gp-product-symmetry",
      name: "Product of terms and the middle-term trick",
      intuition:
        "Pair up terms of a GP from the two ends: each such pair multiplies to the same value (the " +
        "square of the middle term). So the product of an odd number of terms is just the middle term " +
        "raised to that count — no need to know \\(a\\) or \\(r\\) individually.",
      definition:
        "In a GP, terms equidistant from the ends have a constant product: \\(a_k \\cdot a_{n+1-k} = " +
        "a_1 \\cdot a_n\\). Consequently the **product of the first \\(2m-1\\) terms equals the middle " +
        "term raised to the power \\(2m-1\\)**: if the middle term is \\(M\\), the product is \\(M^{2m-1}\\). " +
        "This is why \"the kth term is given\" is often enough to find a product.",
      formula: {
        label: "GP product symmetry",
        latex: "a_k \\cdot a_{n+1-k} = a_1 \\cdot a_n \\qquad \\prod_{i=1}^{2m-1} a_i = M^{2m-1}",
      },
      authoredExample: {
        prompt: "The 4th term of a GP is 2. Find the product of its first 7 terms.",
        steps: [
          "Seven terms have a middle term — the 4th term — equal to 2.",
          "Product of \\(2m - 1 = 7\\) terms \\(= (\\text{middle term})^{7} = 2^{7}\\).",
          "\\(2^7 = 128\\).",
        ],
        answer: "\\(128\\).",
      },
      selfCheckExample: {
        prompt: "The 3rd term of a GP is 4. Find the product of its first 5 terms.",
        steps: [
          "Five terms; the middle (3rd) term is 4.",
          "Product \\(= 4^{5}\\).",
        ],
        answer: "\\(1024\\).",
      },
      practiceSet: [
        { prompt: "Middle term of 5 GP terms is 2; product of all five?", answer: "\\(32\\)", method: "\\(2^5\\)" },
        { prompt: "2nd term of a 3-term GP is 5; product?", answer: "\\(125\\)", method: "\\(5^3\\)" },
        { prompt: "Product of terms equidistant from the ends of a GP is?", answer: "constant", method: "\\(= a_1 a_n\\)" },
        { prompt: "4th term of a 7-term GP is 3; product of all seven?", answer: "\\(2187\\)", method: "\\(3^7\\)" },
      ],
      pyqExampleId: "3b86772a-3200-4043-95a7-e06f8b6095eb", // 2021 — 3rd term 3, product of first five
    },
  ],
  related: [
    { label: "Arithmetic Progressions", href: "/notes/nda-maths/sequence-series/seq-arithmetic-progressions" },
    { label: "Harmonic Progressions and the Three Means", href: "/notes/nda-maths/sequence-series/seq-harmonic-means" },
  ],
};
