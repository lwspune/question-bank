import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_SS_SERIES_NOTE: SubtopicNote = {
  subtopicName: "Progressions and Special Sums",
  title: "Progressions and Special Sums",
  oneLineDefinition:
    "An AP adds a fixed difference, a GP multiplies by a fixed ratio; each has a closed sum, and many harder series telescope.",
  whyItMatters:
    "Ten PYQs, two of them HARD. Use Sₙ = n/2 (first + last) for an AP and a(rⁿ − 1)/(r − 1) for a GP. The two HARD items are telescoping sums: write the general term as a difference f(n) − f(n + 1) and everything in the middle cancels.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdsss-ap-gp",
      name: "Sums of APs and GPs",
      intuition:
        "Pair the first and last terms of an AP: every pair has the same sum, so the total is the number of pairs times that sum. A GP's sum follows from multiplying by the ratio and subtracting.",
      definition:
        "- AP: \\(a_n = a + (n - 1)d\\); \\(S_n = \\dfrac n2(a + l) = \\dfrac n2[2a + (n - 1)d]\\).\n" +
        "- GP: \\(a_n = ar^{n-1}\\); \\(S_n = \\dfrac{a(r^n - 1)}{r - 1}\\).\n" +
        "- A decreasing AP's sum is largest when you stop at the last non-negative term.\n" +
        "- The geometric mean of \\(3^1, \\ldots, 3^7\\) is \\(3\\) to the average exponent.\n" +
        "- \\(1 + 2 + \\cdots + n = \\dfrac{n(n + 1)}{2}\\); \\(\\sum n^2 = \\dfrac{n(n + 1)(2n + 1)}{6}\\); \\(\\sum n^3 = \\left(\\dfrac{n(n + 1)}{2}\\right)^2\\).",
      formula: {
        label: "AP sum",
        latex: "S_n = \\dfrac{n}{2}(a + l)",
      },
      authoredExample: {
        prompt: "Savings start at Rs. \\(500\\) a month and rise by Rs. \\(100\\) each month. After how many months do they total Rs. \\(9500\\)?",
        steps: ["\\(\\dfrac n2[1000 + 100(n - 1)] = 9500\\), so \\(n^2 + 9n - 190 = 0\\).", "\\((n - 10)(n + 19) = 0\\)."],
        answer: "\\(10\\) months.",
      },
      selfCheckExample: {
        prompt: "Find \\(1 + 2 + 4 + \\cdots + 256\\).",
        steps: ["A GP with ratio \\(2\\) and \\(9\\) terms: \\(2^9 - 1\\)."],
        answer: "\\(511\\).",
      },
      practiceSet: [
        { prompt: "\\(5 + 9 + 13 + \\cdots\\) to \\(10\\) terms?", answer: "\\(230\\)" },
        { prompt: "\\(\\sum_{1}^{10} n^2\\)?", answer: "\\(385\\)" },
        { prompt: "Largest sum of \\(20, 17, 14, \\ldots\\)?", answer: "\\(77\\)" },
        { prompt: "Two-digit multiples of \\(7\\): how many?", answer: "\\(13\\)" },
      ],
      pyqExampleId: "ad8aa642-9dfe-40f1-81c2-de76feca4119", // 2021 (II) — savings rise by Rs. 1000 a year from Rs. 2000
      traps: [
        {
          title: "Stop at the last positive term",
          body:
            "In \\(36, 33, 30, \\ldots\\) the sum grows until the terms turn negative. Stop at the last term that is not negative; adding the negatives only reduces it.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsss-telescoping",
      name: "Telescoping sums",
      intuition:
        "If every term is a difference of consecutive values of one function, adding the terms cancels everything in the middle. Only the first and the last survive.",
      definition:
        "- \\(\\dfrac{1}{n(n + 1)} = \\dfrac1n - \\dfrac1{n + 1}\\), so \\(\\sum_{1}^{n} = 1 - \\dfrac{1}{n + 1}\\).\n" +
        "- \\(\\dfrac{2n + 1}{n^2(n + 1)^2} = \\dfrac1{n^2} - \\dfrac1{(n + 1)^2}\\).\n" +
        "- \\(\\sqrt{1 + \\dfrac1{n^2} + \\dfrac1{(n + 1)^2}} = 1 + \\dfrac1n - \\dfrac1{n + 1}\\).\n" +
        "- For an infinite sum, the last surviving piece tends to \\(0\\).",
      formula: {
        label: "Telescoping",
        latex: "\\sum_{r=1}^{n} \\left(\\dfrac1r - \\dfrac1{r + 1}\\right) = 1 - \\dfrac{1}{n + 1}",
      },
      authoredExample: {
        prompt: "Find \\(\\dfrac{1}{2 \\times 3} + \\dfrac{1}{3 \\times 4} + \\cdots + \\dfrac{1}{9 \\times 10}\\).",
        steps: ["\\(\\left(\\dfrac12 - \\dfrac13\\right) + \\cdots + \\left(\\dfrac19 - \\dfrac1{10}\\right) = \\dfrac12 - \\dfrac1{10}\\)."],
        answer: "\\(\\dfrac25\\).",
      },
      selfCheckExample: {
        prompt: "For what \\(n\\) does \\(\\dfrac{1}{1 \\times 2} + \\cdots + \\dfrac{1}{n(n + 1)} = \\dfrac{19}{20}\\)?",
        steps: ["\\(\\dfrac{n}{n + 1} = \\dfrac{19}{20}\\)."],
        answer: "\\(n = 19\\).",
      },
      practiceSet: [
        { prompt: "\\(\\sum_{1}^{\\infty} \\dfrac{1}{n(n + 1)}\\)?", answer: "\\(1\\)" },
        { prompt: "\\(\\dfrac1{n} - \\dfrac1{n + 1}\\) as one fraction?", answer: "\\(\\dfrac{1}{n(n + 1)}\\)" },
        { prompt: "\\(\\sum_{1}^{4}\\left(\\dfrac1{n^2} - \\dfrac1{(n + 1)^2}\\right)\\)?", answer: "\\(\\dfrac{24}{25}\\)" },
        { prompt: "\\(\\sum_{1}^{10} n^3 - \\sum_{1}^{10} n^2\\)?", answer: "\\(2640\\)" },
      ],
      pyqExampleId: "401abfa6-fadb-43f1-af94-be52d0e3665b", // 2021 (I) — sum of 1/n(n + 1) equals 99/100
      traps: [
        {
          title: "Count the surviving ends",
          body:
            "Starting at \\(\\dfrac{1}{2 \\times 3}\\) instead of \\(\\dfrac{1}{1 \\times 2}\\), the first survivor is \\(\\dfrac12\\), not \\(1\\). Write the first two and last two terms out before cancelling.",
        },
      ],
    },
  ],
};
