import type { SubtopicNote } from "@/app/notes/_types";

export const STANDARD_SERIES_AND_MISSING_OBSERVATIONS_NOTE: SubtopicNote = {
  subtopicName: "Standard Series and Missing Observations — First n Naturals, Evens, Primes and Two Unknowns",
  title: "Standard Series and Missing Observations — First n Naturals, Evens, Primes and Two Unknowns",
  oneLineDefinition:
    "Variance of the first n natural numbers is (n² − 1)/12, and scaling gives the evens; and when two observations are missing, the mean gives x + y and the variance gives x² + y², from which xy and |x − y| follow.",
  whyItMatters:
    "13 PYQs, none HARD — the chapter's largest page and its most repetitive: 'mean 8, variance 16, five of seven observations are 2, 4, 10, 12, 14' has been set FOUR times (asking for the product, its square root, or the difference of the missing pair), and the first-n-naturals variance three times. " +
    "Two closed results and one algebraic move cover the page.",
  concepts: [
    // 1 — variance of first n naturals and scaled series
    {
      kind: "formula" as const,
      slug: "cetdisp-variance-of-first-n-naturals",
      name: "Variance of the First n Natural Numbers, and of the Evens by Scaling",
      intuition:
        "\\(\\dfrac{\\sum k^2}{n} - \\left(\\dfrac{n+1}{2}\\right)^2\\) with \\(\\sum k^2 = \\dfrac{n(n+1)(2n+1)}{6}\\) simplifies to \\(\\dfrac{n^2 - 1}{12}\\). The first \\(n\\) even numbers are twice the naturals, so their variance is \\(4\\) times that.",
      definition:
        "- \\(\\operatorname{Var}(1, 2, \\dots, n) = \\dfrac{(n+1)(2n+1)}{6} - \\dfrac{(n+1)^2}{4} = \\dfrac{n^2 - 1}{12}\\).\n" +
        "- First \\(2n\\) naturals: \\(\\dfrac{4n^2 - 1}{12}\\). First \\(50\\) evens: \\(4 \\times \\dfrac{50^2 - 1}{12} = 4 \\times \\dfrac{2499}{12} = 833\\).\n" +
        "- Check by the sums: first \\(50\\) evens have mean \\(51\\), \\(\\sum x^2 = 4 \\cdot \\dfrac{50 \\cdot 51 \\cdot 101}{6} = 171{,}700\\), \\(\\dfrac{171700}{50} - 2601 = 833\\).\n" +
        "- Non-standard sets (six primes above \\(5\\)) are computed directly: \\(7, 11, 13, 17, 19, 23\\) → mean \\(15\\), \\(\\sum x^2 = 1518\\), variance \\(28\\).\n" +
        "- Option lists always carry \\(\\dfrac{(n+1)(n+5)}{12}\\)-style near-misses; the true numerator is \\(n^2 - 1 = (n-1)(n+1)\\).",
      formula: {
        label: "Standard results",
        latex:
          "\\operatorname{Var}(1..n) = \\frac{n^2 - 1}{12},\\qquad \\operatorname{Var}(2, 4, \\dots, 2n) = \\frac{n^2 - 1}{3},\\qquad \\operatorname{Var}(1..2n) = \\frac{4n^2 - 1}{12}",
      },
      authoredExample: {
        prompt: "Find the variance of the first \\(10\\) natural numbers, and of the first \\(10\\) even natural numbers.",
        steps: [
          "\\(\\dfrac{100 - 1}{12} = \\dfrac{99}{12} = 8.25\\).",
          "Evens: \\(4 \\times 8.25 = 33\\).",
        ],
        answer: "\\(8.25\\) and \\(33\\)",
      },
      selfCheckExample: {
        prompt: "Find the variance of the first \\(7\\) odd natural numbers.",
        steps: [
          "\\(1, 3, \\dots, 13 = 2k - 1\\) for \\(k = 1..7\\): a scaling by \\(2\\) and a shift, so variance \\(= 4 \\times \\dfrac{49 - 1}{12} = 16\\).",
        ],
        answer: "\\(16\\)",
      },
      practiceSet: [
        {
          prompt: "Variance of \\(1, 2, \\dots, 5\\)?",
          answer: "\\(2\\)",
        },
        {
          prompt: "Variance of \\(2, 4, \\dots, 10\\)?",
          answer: "\\(8\\)",
        },
        {
          prompt: "Variance of first \\(2n\\) naturals?",
          answer: "\\(\\dfrac{4n^2 - 1}{12}\\)",
        },
        {
          prompt: "Mean of \\(7, 11, 13, 17, 19, 23\\)?",
          answer: "\\(15\\)",
        },
      ],
      pyqExampleId: "3ed58b29-e119-43d7-9e55-5459a2ae32c0",
      traps: [
        {
          title: "Doubling instead of quadrupling for the evens",
          body:
            "Evens are \\(2 \\times\\) naturals, so the variance is \\(4 \\times\\), not \\(2 \\times\\). \\(\\dfrac{n^2 - 1}{6}\\) is the doubled distractor.",
        },
      ],
    },

    // 2 — two missing observations
    {
      kind: "formula" as const,
      slug: "cetdisp-two-missing-observations",
      name: "Two Missing Observations: x + y From the Mean, x² + y² From the Variance",
      intuition:
        "The mean fixes the sum of the two unknowns; the variance fixes the sum of their squares. Then \\(2xy = (x + y)^2 - (x^2 + y^2)\\) and \\((x - y)^2 = (x^2 + y^2) - 2xy\\) give whatever the stem asks — product, root of the product, or difference.",
      definition:
        "- Seven observations, mean \\(8\\), variance \\(16\\), five known \\(2, 4, 10, 12, 14\\): \\(x + y = 56 - 42 = 14\\); \\(\\sum x^2 = 7(16 + 64) = 560\\), known \\(460\\), so \\(x^2 + y^2 = 100\\).\n" +
        "- Then \\(xy = \\dfrac{196 - 100}{2} = 48\\); \\(\\sqrt{xy} = 4\\sqrt3\\); \\((x - y)^2 = 100 - 96 = 4\\), \\(|x - y| = 2\\); the pair is \\(\\{6, 8\\}\\).\n" +
        "- \\(a, b, 8, 5, 10\\) with mean \\(6\\), variance \\(6.8\\): \\(a + b = 7\\), \\(a^2 + b^2 = 25\\), \\(ab = 12\\): \\(\\{3, 4\\}\\).\n" +
        "- \\(3, 5, 7, a, b\\) with mean \\(5\\), SD \\(2\\): \\(a + b = 10\\), \\(a^2 + b^2 = 62\\), \\(ab = 19\\): \\(a, b\\) are the roots of \\(t^2 - 10t + 19 = 0\\).\n" +
        "- The unknowns are the roots of \\(t^2 - (x + y)t + xy = 0\\); write that quadratic when the stem asks for 'the equation whose roots are…'.",
      formula: {
        label: "Two unknowns",
        latex:
          "x + y = S,\\ x^2 + y^2 = Q \\ \\Rightarrow\\ xy = \\frac{S^2 - Q}{2},\\quad (x - y)^2 = 2Q - S^2",
      },
      authoredExample: {
        prompt: "Six observations have mean \\(5\\) and variance \\(\\dfrac{10}{3}\\). Four of them are \\(2, 4, 6, 8\\). Find the product of the other two.",
        steps: [
          "\\(x + y = 30 - 20 = 10\\). \\(\\sum x^2 = 6\\left(\\dfrac{10}{3} + 25\\right) = 170\\); known \\(4 + 16 + 36 + 64 = 120\\), so \\(x^2 + y^2 = 50\\).",
          "\\(xy = \\dfrac{100 - 50}{2} = 25\\) (the pair is \\(5, 5\\)).",
        ],
        answer: "\\(25\\)",
      },
      selfCheckExample: {
        prompt: "Five observations have mean \\(4\\) and variance \\(5.2\\). Three of them are \\(1, 3, 7\\). Find \\(|x - y|\\) for the remaining two.",
        steps: [
          "\\(x + y = 20 - 11 = 9\\). \\(\\sum x^2 = 5(5.2 + 16) = 106\\); known \\(1 + 9 + 49 = 59\\), so \\(x^2 + y^2 = 47\\).",
          "\\((x - y)^2 = 2(47) - 81 = 13\\).",
        ],
        answer: "\\(\\sqrt{13}\\)",
      },
      practiceSet: [
        {
          prompt: "\\(x + y = 14\\), \\(x^2 + y^2 = 100\\): \\(xy = ?\\)",
          answer: "\\(48\\)",
        },
        {
          prompt: "Same: \\(|x - y| = ?\\)",
          answer: "\\(2\\)",
        },
        {
          prompt: "\\(a + b = 7\\), \\(ab = 12\\): \\(a, b = ?\\)",
          answer: "\\(3, 4\\)",
        },
        {
          prompt: "Quadratic with roots summing to \\(10\\) and product \\(19\\)?",
          answer: "\\(t^2 - 10t + 19 = 0\\)",
        },
      ],
      pyqExampleId: "6835d8f4-b62b-4d14-9de3-f4cd2a6754b3",
      traps: [
        {
          title: "Dividing by n − 1",
          body:
            "\\(\\sum x^2 = 7(16 + 64)\\) uses the population variance. Sample variance gives \\(x^2 + y^2 = 96 + \\dots\\), no integer pair, and a wrong product.",
        },
      ],
    },

    // 3 — one unknown from a given variance
    {
      kind: "formula" as const,
      slug: "cetdisp-one-unknown-from-a-given-variance",
      name: "One Unknown Value: Write the Variance in Terms of It and Solve",
      intuition:
        "With one unknown \\(k\\) in the data, the mean and the sum of squares are both expressions in \\(k\\); the variance equation is then a quadratic in \\(k\\) (or in \\(k^2\\)), and a sign condition picks the root.",
      definition:
        "- \\(-1, 0, 1, k\\) with variance \\(5\\), \\(k > 0\\): \\(\\bar x = \\dfrac{k}{4}\\), \\(\\dfrac{2 + k^2}{4} - \\dfrac{k^2}{16} = 5 \\Rightarrow 8 + 4k^2 - k^2 = 80 \\Rightarrow k^2 = 24 \\Rightarrow k = 2\\sqrt6\\).\n" +
        "- **A missing score fixed by the mean first**: five tests \\(54, 45, 41, 43, 57\\) and a mean of \\(48\\) over six: sixth \\(= 288 - 240 = 48\\). Then deviations from \\(48\\): \\(6, -3, -7, -5, 9, 0\\); \\(\\sigma^2 = \\dfrac{36 + 9 + 49 + 25 + 81}{6} = \\dfrac{100}{3}\\), SD \\(\\dfrac{10}{\\sqrt3}\\).\n" +
        "- When the mean is a clean number, work with deviations \\(x_i - \\bar x\\) directly — smaller squares, no correction term.\n" +
        "- Multiply through by \\(16\\) (or the denominators present) before collecting; the coefficient of \\(k^2\\) comes out as \\(3\\), from \\(4 - 1\\).",
      formula: {
        label: "One unknown",
        latex:
          "\\frac{\\sum x_i^2(k)}{n} - \\bar x(k)^2 = \\sigma^2 \\ \\Rightarrow\\ \\text{solve for } k",
      },
      authoredExample: {
        prompt: "The variance of \\(0, 2, 4, k\\) is \\(5\\) and \\(k > 4\\). Find \\(k\\).",
        steps: [
          "\\(\\bar x = \\dfrac{6 + k}{4}\\); \\(\\dfrac{20 + k^2}{4} - \\dfrac{(6 + k)^2}{16} = 5\\).",
          "\\(\\times 16\\): \\(80 + 4k^2 - 36 - 12k - k^2 = 80 \\Rightarrow 3k^2 - 12k - 36 = 0 \\Rightarrow k^2 - 4k - 12 = 0 \\Rightarrow k = 6\\) (reject \\(-2\\)).",
        ],
        answer: "\\(k = 6\\)",
      },
      selfCheckExample: {
        prompt: "Four scores \\(10, 14, 18\\) and a fourth are unknown; the mean of the four is \\(15\\). Find the SD.",
        steps: [
          "Fourth \\(= 60 - 42 = 18\\). Deviations from \\(15\\): \\(-5, -1, 3, 3\\); \\(\\sigma^2 = \\dfrac{25 + 1 + 9 + 9}{4} = 11\\).",
        ],
        answer: "\\(\\sqrt{11}\\)",
      },
      practiceSet: [
        {
          prompt: "Mean of \\(-1, 0, 1, k\\)?",
          answer: "\\(\\dfrac{k}{4}\\)",
        },
        {
          prompt: "\\(3k^2 = 72 \\Rightarrow k = ?\\) (\\(k > 0\\))",
          answer: "\\(2\\sqrt6\\)",
        },
        {
          prompt: "Sixth score if five sum to \\(240\\) and the mean of six is \\(48\\)?",
          answer: "\\(48\\)",
        },
        {
          prompt: "\\(\\sqrt{\\dfrac{100}{3}} = ?\\)",
          answer: "\\(\\dfrac{10}{\\sqrt3}\\)",
        },
      ],
      pyqExampleId: "2f17a48e-d821-444b-8b15-bd0a9ca731ef",
      traps: [
        {
          title: "Forgetting the mean also contains k",
          body:
            "\\(\\dfrac{2 + k^2}{4} = 5\\) ignores \\(\\bar x = \\dfrac{k}{4}\\) and gives \\(k = \\sqrt{18}\\). The mean moves with the unknown; subtract its square.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Mean and Variance From Sums — the identity behind x² + y²",
      href: "/notes/mht-cet-maths/measures-of-dispersion/cetdisp-mean-and-variance-from-sums",
    },
    {
      label: "Shift and Scale — why the evens are four times the naturals",
      href: "/notes/mht-cet-maths/measures-of-dispersion/cetdisp-shift-and-scale",
    },
  ],
};
