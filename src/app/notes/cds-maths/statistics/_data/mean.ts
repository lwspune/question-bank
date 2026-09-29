import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_ST_MEAN_NOTE: SubtopicNote = {
  subtopicName: "Properties of the Arithmetic Mean",
  title: "Properties of the Arithmetic Mean",
  oneLineDefinition:
    "The mean moves with every shift and scaling of the data, the deviations from it always add to zero, and a combined mean is the frequency-weighted mean of the group means.",
  whyItMatters:
    "Twelve PYQs, and not one of them needs the data written out. Three properties answer them all: what shifting or scaling does, the zero sum of deviations, and the weighted combined mean.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdsst-shift-scale",
      name: "Shifting and scaling the data",
      intuition:
        "Adding \\(k\\) to every value adds \\(k\\) to the total of each, so the mean moves by \\(k\\). Multiplying every value by \\(c\\) multiplies the total, and the mean, by \\(c\\).",
      definition:
        "- If \\(y = ax + b\\) for every value, then \\(\\bar y = a\\bar x + b\\).\n" +
        "- \\(\\sum (ax_i + b) = a\\sum x_i + nb\\).\n" +
        "- Changing units (marks out of \\(250\\) to marks out of \\(50\\)) scales every value, so differences scale too.",
      formula: {
        label: "Linear change",
        latex: "y = ax + b \\;\\Rightarrow\\; \\bar y = a\\bar x + b",
      },
      authoredExample: {
        prompt: "The mean of \\(40\\) values is \\(12\\). Each value is doubled and then \\(3\\) is subtracted. Find the new mean and the new total.",
        steps: ["New mean \\(= 2\\times 12 - 3 = 21\\).", "New total \\(= 40\\times 21 = 840\\)."],
        answer: "Mean \\(21\\), total \\(840\\).",
      },
      selfCheckExample: {
        prompt: "The mean of \\(10\\) numbers is \\(4\\). Find \\(\\sum_{i=1}^{10}(3x_i - 2)\\).",
        steps: ["\\(3\\sum x_i - 20 = 3\\times 40 - 20\\)."],
        answer: "\\(100\\).",
      },
      practiceSet: [
        { prompt: "Mean \\(25\\); add \\(5\\) to each. New mean?", answer: "\\(30\\)" },
        { prompt: "Mean \\(8\\); multiply each by \\(3\\). New mean?", answer: "\\(24\\)" },
        { prompt: "Marks out of \\(200\\) scaled to \\(50\\): a gap of \\(60\\) becomes?", answer: "\\(15\\)" },
        { prompt: "Mean \\(x\\) is \\(6\\). Mean of \\(\\dfrac{x}{2} + 1\\)?", answer: "\\(4\\)" },
      ],
      pyqExampleId: "31a52976-3b46-4674-84bd-16b1e1de5f99", // 2026 (II) — Σ 5(4xᵢ + 1) with mean 2.5
      traps: [
        {
          title: "The added constant is added n times to the total",
          body:
            "\\(\\sum (4x_i + 1)\\) over \\(15\\) values is \\(4\\sum x_i + 15\\), not \\(4\\sum x_i + 1\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsst-deviations",
      name: "Deviations from the mean and from other points",
      intuition:
        "The mean is the balance point: deviations above it exactly cancel those below. Deviations from any other point \\(A\\) add up to \\(n(\\bar x - A)\\), which gives the mean when two such sums are known.",
      definition:
        "- \\(\\sum (x_i - \\bar x) = 0\\) for every data set.\n" +
        "- \\(\\sum (x_i - A) = n(\\bar x - A)\\), so \\(\\bar x = A + \\dfrac{\\sum(x_i - A)}{n}\\).\n" +
        "- Two such sums, from \\(A\\) and \\(B\\), give two equations in \\(n\\) and \\(\\sum x_i\\).",
      formula: {
        label: "Deviations",
        latex: "\\sum (x_i - \\bar x) = 0, \\qquad \\sum (x_i - A) = n(\\bar x - A)",
      },
      visualizationSlug: "mean-balance-point",
      authoredExample: {
        prompt: "The deviations of some numbers from \\(20\\) add to \\(-12\\), and from \\(14\\) they add to \\(24\\). Find how many numbers there are and their mean.",
        steps: [
          "\\(S - 20n = -12\\) and \\(S - 14n = 24\\). Subtract: \\(6n = 36\\), so \\(n = 6\\).",
          "\\(S = 108\\), so the mean is \\(18\\).",
        ],
        answer: "\\(n = 6\\), mean \\(18\\).",
      },
      selfCheckExample: {
        prompt: "The sum of deviations of \\(8\\) numbers from \\(30\\) is \\(40\\). Find their mean.",
        steps: ["\\(\\bar x = 30 + \\dfrac{40}{8}\\)."],
        answer: "\\(35\\).",
      },
      practiceSet: [
        { prompt: "Sum of deviations from the mean?", answer: "\\(0\\)" },
        { prompt: "\\(n = 5\\), \\(\\sum (x_i - 10) = 15\\). Mean?", answer: "\\(13\\)" },
        { prompt: "Mean \\(12\\), \\(n = 4\\). \\(\\sum(x_i - 10)\\)?", answer: "\\(8\\)" },
        { prompt: "Values \\(2, 4, 9\\): deviations from the mean?", answer: "\\(-3, -1, 4\\)" },
      ],
      pyqExampleId: "c77358f0-cf3a-407d-9e66-98703cbffb5b", // 2022 (II) — deviations from 50 and from 46
      traps: [
        {
          title: "The zero sum needs no arithmetic",
          body:
            "When asked for the sum of deviations from the mean, the answer is \\(0\\) whatever the data. Computing the mean first wastes time.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsst-combined-mean",
      name: "Combined and weighted means",
      intuition:
        "Pooling groups adds their totals and their counts. So the combined mean is a weighted average of the group means, closer to the larger group, and always between the smallest and largest group mean.",
      definition:
        "- \\(\\bar x = \\dfrac{n_1\\bar x_1 + n_2\\bar x_2 + \\cdots}{n_1 + n_2 + \\cdots}\\).\n" +
        "- It lies strictly between the smallest and largest group means (with positive weights).\n" +
        "- It equals the simple average of two group means only when the groups are the same size.\n" +
        "- One large value pulls the mean up, so most values can lie below the mean.",
      formula: {
        label: "Combined mean",
        latex: "\\bar x = \\dfrac{n_1\\bar x_1 + n_2\\bar x_2}{n_1 + n_2}",
      },
      authoredExample: {
        prompt: "A class has \\(30\\) boys with mean \\(62\\) and \\(20\\) girls with mean \\(70\\). Find the class mean.",
        steps: ["\\(\\dfrac{30\\times 62 + 20\\times 70}{50} = \\dfrac{1860 + 1400}{50}\\)."],
        answer: "\\(65.2\\).",
      },
      selfCheckExample: {
        prompt: "Four workers earn Rs. 10,000 each and one earns Rs. 60,000. How many earn less than the mean?",
        steps: ["Mean \\(= \\dfrac{100{,}000}{5} = 20{,}000\\)."],
        answer: "Four.",
      },
      practiceSet: [
        { prompt: "Means \\(40\\) (\\(n = 10\\)) and \\(50\\) (\\(n = 10\\)). Combined?", answer: "\\(45\\)" },
        { prompt: "Means \\(40\\) (\\(n = 30\\)) and \\(50\\) (\\(n = 10\\)). Combined?", answer: "\\(42.5\\)" },
        { prompt: "Can the combined mean exceed both group means?", answer: "No" },
        { prompt: "Mean of \\(5\\) values is \\(8\\); one value \\(18\\) is added. New mean?", answer: "\\(\\dfrac{58}{6} \\approx 9.67\\)" },
      ],
      pyqExampleId: "ee12e1d4-1104-4cbd-87ce-aa8f4a6165b3", // 2025 (II) — three components, frequencies 45, 40, 55
      traps: [
        {
          title: "Weight by the counts",
          body:
            "The mean of two group means is the combined mean only for equal groups. With \\(30\\) and \\(10\\) values the combined mean sits three-quarters of the way toward the larger group's mean.",
        },
      ],
    },
  ],
};
