import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_SQ_GP_NOTE: SubtopicNote = {
  subtopicName: "Geometric Progressions and Means",
  title: "Geometric Progressions and Means",
  oneLineDefinition:
    "A geometric progression multiplies by a fixed common ratio r at every step; the arithmetic mean of two numbers is half their sum and the geometric mean is the square root of their product.",
  whyItMatters:
    "Three questions in the bank, all MODERATE, and one is from the 2022 paper. They need two facts beyond the AP: a geometric progression multiplies instead of adding, and three numbers are in GP when the middle one squared equals the product of the other two.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "spisqgp-gp",
      name: "Geometric progression: ratio, nth term and sum",
      intuition:
        "In a **geometric progression** (GP) you multiply by the same number each time instead of adding it. That number is the **common ratio**. 5, 15, 45, 135 is a GP with common ratio 3.",
      definition:
        "- Common ratio: \\(r = \\dfrac{a_2}{a_1} = \\dfrac{a_3}{a_2}\\).\n" +
        "- nth term: \\(a_n = ar^{n-1}\\).\n" +
        "- Sum of \\(n\\) terms: \\(S_n = \\dfrac{a(r^n - 1)}{r - 1}\\), for \\(r \\ne 1\\).\n" +
        "- Three numbers \\(a, b, c\\) are in GP when \\(b^2 = ac\\).\n" +
        "- A useful split: \\(S_{2n} = S_n(1 + r^n)\\), because the second \\(n\\) terms are the first \\(n\\) terms multiplied by \\(r^n\\).",
      formula: {
        label: "Geometric progression",
        latex: "a_n = ar^{n-1} \\qquad S_n = \\frac{a(r^n - 1)}{r - 1} \\qquad b^2 = ac",
        symbols: [
          { symbol: "a", meaning: "the first term" },
          { symbol: "r", meaning: "the common ratio" },
        ],
      },
      authoredExample: {
        prompt: "Find the 6th term and the sum of the first 6 terms of the GP 3, 6, 12, ...",
        steps: [
          "\\(a = 3\\) and \\(r = \\frac{6}{3} = 2\\).",
          "\\(a_6 = 3 \\times 2^5 = 96\\).",
          "\\(S_6 = \\frac{3(2^6 - 1)}{2 - 1} = 3 \\times 63 = 189\\). Check: \\(3 + 6 + 12 + 24 + 48 + 96 = 189\\).",
        ],
        answer: "6th term 96, sum 189.",
      },
      selfCheckExample: {
        prompt: "Find the common ratio and the 5th term of the GP 2, 6, 18, ...",
        steps: ["\\(r = \\frac{6}{2} = 3\\).", "\\(a_5 = 2 \\times 3^4 = 162\\)."],
        answer: "Ratio 3, 5th term 162.",
      },
      practiceSet: [
        { prompt: "Find the 7th term of the GP 1, 2, 4, 8, ...", answer: "\\(2^6 = 64\\)" },
        { prompt: "Find the sum of the first 5 terms of the GP 4, 12, 36, ...", answer: "\\(\\frac{4(3^5 - 1)}{2} = 484\\)" },
        { prompt: "If 4, \\(x\\), 9 are in GP and \\(x\\) is positive, find \\(x\\).", answer: "\\(x^2 = 36\\), so \\(x = 6\\)" },
        { prompt: "Is 5, 10, 15, 20 a geometric progression?", answer: "No: the ratios are 2 and 1.5 (it is an AP)." },
      ],
      pyqExampleId: "b87a9c35-98b2-485a-8a71-f682a54d6399",
      traps: [
        {
          title: "Using n instead of n minus 1 in the power",
          body: "The 4th term of 5, 10, 20, ... is \\(5 \\times 2^3 = 40\\), not \\(5 \\times 2^4 = 80\\).",
        },
        {
          title: "Testing a GP by subtracting",
          body:
            "A GP is tested by dividing. 2, 4, 8 has equal ratios but unequal gaps, so it is a GP and not an AP.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spisqgp-means",
      name: "Arithmetic and geometric means of two numbers",
      intuition:
        "The arithmetic mean of two numbers fixes their sum, and the geometric mean fixes their product. Know both means and you know the two numbers.",
      definition:
        "- **Arithmetic mean:** \\(\\text{AM} = \\dfrac{a + b}{2}\\), so the sum is \\(2 \\times \\text{AM}\\).\n" +
        "- **Geometric mean** of two positive numbers: \\(\\text{GM} = \\sqrt{ab}\\), so the product is \\(\\text{GM}^2\\).\n" +
        "- Given the sum and the product, the numbers are the roots of \\(t^2 - (\\text{sum})\\,t + \\text{product} = 0\\).\n" +
        "- For positive numbers \\(\\text{AM} \\ge \\text{GM}\\), with equality only when the two numbers are equal.\n" +
        "- When a question mixes an AP and a GP, write the AP terms using \\(d\\), then apply \\(b^2 = ac\\) to the GP.",
      formula: {
        label: "The two means",
        latex: "\\text{AM} = \\frac{a + b}{2} \\qquad \\text{GM} = \\sqrt{ab} \\qquad t^2 - 2\\,\\text{AM}\\,t + \\text{GM}^2 = 0",
      },
      authoredExample: {
        prompt: "Two numbers have an arithmetic mean of 17 and a geometric mean of 15. Find them.",
        steps: [
          "Sum \\(= 2 \\times 17 = 34\\) and product \\(= 15^2 = 225\\).",
          "\\(t^2 - 34t + 225 = 0\\) factors as \\((t - 9)(t - 25) = 0\\).",
          "Check: \\(\\frac{9 + 25}{2} = 17\\) and \\(\\sqrt{9 \\times 25} = 15\\).",
        ],
        answer: "9 and 25",
      },
      selfCheckExample: {
        prompt: "Find the arithmetic mean and the geometric mean of 4 and 9.",
        steps: ["\\(\\text{AM} = \\frac{4 + 9}{2} = 6.5\\).", "\\(\\text{GM} = \\sqrt{36} = 6\\)."],
        answer: "AM 6.5, GM 6",
      },
      practiceSet: [
        { prompt: "Find the geometric mean of 2 and 18.", answer: "6" },
        { prompt: "Two numbers add up to 26 and their geometric mean is 12. Find them.", answer: "8 and 18" },
        {
          prompt: "Can two positive numbers have an arithmetic mean of 5 and a geometric mean of 6?",
          answer: "No: the arithmetic mean is never smaller than the geometric mean.",
        },
      ],
      pyqExampleId: "35d9d71d-e990-4b78-9222-150ccf38562a",
      traps: [
        {
          title: "Treating the geometric mean as the product",
          body: "A geometric mean of 6 means the product is 36, not 6. Square the geometric mean before you use it.",
        },
        {
          title: "Applying a ratio of means to the numbers",
          body:
            "A ratio such as AM : GM = 5 : 4 compares the two means, not the two numbers. Find the AM from the sum first, then scale it to get the GM.",
        },
      ],
    },
  ],
};
