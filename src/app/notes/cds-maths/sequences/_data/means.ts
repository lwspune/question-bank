import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_SS_MEANS_NOTE: SubtopicNote = {
  subtopicName: "Arithmetic, Geometric and Harmonic Means",
  title: "The Three Means",
  oneLineDefinition:
    "For two positive numbers, AM = (a + b)/2, GM = √(ab) and HM = 2ab/(a + b), with AM ≥ GM ≥ HM and GM² = AM × HM.",
  whyItMatters:
    "Nine PYQs, none HARD. Translate each mean into the sum or the product of the two numbers: AM gives the sum, GM the product, HM = 2 × product ÷ sum. Then the numbers are the roots of t² − (sum)t + (product) = 0.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdsss-means",
      name: "AM, GM and HM of two numbers",
      intuition:
        "The AM fixes the sum, the GM fixes the product, and the HM is the product divided by the average. Knowing any two of the means, you know the sum and the product, and so the numbers.",
      definition:
        "- \\(\\text{AM} = \\dfrac{a + b}{2}\\), \\(\\text{GM} = \\sqrt{ab}\\), \\(\\text{HM} = \\dfrac{2ab}{a + b}\\).\n" +
        "- \\(\\text{GM}^2 = \\text{AM} \\times \\text{HM}\\).\n" +
        "- \\(\\text{AM} \\ge \\text{GM} \\ge \\text{HM}\\), equal only when \\(a = b\\); \\(\\text{AM} - \\text{GM} = \\dfrac{(\\sqrt a - \\sqrt b)^2}{2}\\).\n" +
        "- The numbers are the roots of \\(t^2 - 2\\text{AM}\\,t + \\text{GM}^2 = 0\\).\n" +
        "- \\(x\\) is the HM of \\(y\\) and \\(z\\) exactly when \\(\\dfrac2x = \\dfrac1y + \\dfrac1z\\).",
      formula: {
        label: "The three means",
        latex: "\\text{GM}^2 = \\text{AM} \\times \\text{HM}",
      },
      authoredExample: {
        prompt: "Two numbers have AM \\(13\\) and GM \\(12\\). Find them.",
        steps: ["Sum \\(26\\), product \\(144\\).", "\\(t^2 - 26t + 144 = 0\\)."],
        answer: "\\(18\\) and \\(8\\).",
      },
      selfCheckExample: {
        prompt: "The AM and HM of two numbers are \\(25\\) and \\(16\\). Find their GM.",
        steps: ["\\(\\text{GM}^2 = 25 \\times 16\\)."],
        answer: "\\(20\\).",
      },
      practiceSet: [
        { prompt: "HM of \\(3\\) and \\(6\\)?", answer: "\\(4\\)" },
        { prompt: "GM \\(8\\), HM \\(6.4\\). AM?", answer: "\\(10\\)" },
        { prompt: "\\(\\dfrac{H}{P} + \\dfrac{H}{Q}\\) for the HM \\(H\\) of \\(P, Q\\)?", answer: "\\(2\\)" },
        { prompt: "GM of \\(x, y\\) is \\(4\\); GM of \\(x, y, z\\) is \\(4\\). \\(z\\)?", answer: "\\(4\\)" },
      ],
      pyqExampleId: "5c2cf7b3-57a5-464e-9e01-8ffa8a95eb24", // 2018 (I) — AM 10 and GM 8, find the numbers
      traps: [
        {
          title: "The GM squared, not the GM, is the product",
          body:
            "A GM of \\(8\\) means the product is \\(64\\). Using \\(8\\) as the product gives numbers that do not have the stated AM.",
        },
      ],
    },
  ],
};
