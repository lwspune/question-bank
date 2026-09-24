import type { SubtopicNote } from "@/app/notes/_types";

export const MEAN_AND_VARIANCE_FROM_SUMS_NOTE: SubtopicNote = {
  subtopicName: "Mean and Variance From Sums — Σx, Σx² and Deviations From an Assumed Mean",
  title: "Mean and Variance From Sums — Σx, Σx² and Deviations From an Assumed Mean",
  oneLineDefinition:
    "Variance is the mean of the squares minus the square of the mean: σ² = Σx²/n − x̄². Given any two of Σx, Σx², n, mean and variance, the rest follow — and deviations from an assumed mean plug into the same formula.",
  whyItMatters:
    "9 PYQs, none HARD — the formula page. The stems hand you Σx and Σx² (or Σ(x − a) and Σ(x − a)²) and ask for the SD, or hand you the mean and SD and ask for Σx²; one replaces a wrongly recorded observation, one adds three observations without moving the mean, two are frequency tables. " +
    "All of it is the single identity below, rearranged.",
  concepts: [
    // 1 — variance from sum of squares
    {
      kind: "formula" as const,
      slug: "cetdisp-variance-from-sum-of-squares",
      name: "σ² = Σx²/n − x̄²: Recover Any One Quantity From the Others",
      intuition:
        "Variance is the average squared distance from the mean, and expanding \\((x - \\bar x)^2\\) turns that into the mean of the squares minus the square of the mean. Given the mean and SD, \\(\\sum x^2 = n(\\sigma^2 + \\bar x^2)\\); given \\(\\sum x\\) and \\(\\sum x^2\\), the SD follows.",
      definition:
        "- \\(\\sigma^2 = \\dfrac{\\sum x_i^2}{n} - \\bar x^2\\), \\(\\bar x = \\dfrac{\\sum x_i}{n}\\), SD \\(= \\sigma = \\sqrt{\\sigma^2}\\).\n" +
        "- \\(n = 100\\), \\(\\bar x = 50\\), \\(\\sigma = 5\\): \\(\\sum x^2 = 100(25 + 2500) = 252{,}500\\).\n" +
        "- **Variance zero** means every observation equals the mean: \\(\\bar x = 5\\), \\(\\sigma^2 = 0\\), \\(\\sum x^2 = 400 \\Rightarrow 25n = 400 \\Rightarrow n = 16\\).\n" +
        "- Six primes \\(7, 11, 13, 17, 19, 23\\): \\(\\bar x = 15\\), \\(\\sum x^2 = 1518\\), \\(\\sigma^2 = 253 - 225 = 28\\).\n" +
        "- CET uses the population variance (divide by \\(n\\)), never \\(n - 1\\).",
      formula: {
        label: "The identity",
        latex:
          "\\sigma^2 = \\frac{\\sum x_i^2}{n} - \\bar x^2 \\qquad \\sum x_i^2 = n\\left(\\sigma^2 + \\bar x^2\\right)",
      },
      visualizationSlug: "variance-squared-deviations",
      authoredExample: {
        prompt: "The mean of \\(40\\) observations is \\(12\\) and their SD is \\(3\\). Find the sum of their squares.",
        steps: [
          "\\(\\sum x^2 = n(\\sigma^2 + \\bar x^2) = 40(9 + 144) = 40 \\times 153\\).",
        ],
        answer: "\\(6120\\)",
      },
      selfCheckExample: {
        prompt: "For \\(8\\) observations, \\(\\sum x = 40\\) and \\(\\sum x^2 = 232\\). Find the SD.",
        steps: [
          "\\(\\bar x = 5\\); \\(\\sigma^2 = \\dfrac{232}{8} - 25 = 29 - 25 = 4\\).",
        ],
        answer: "\\(2\\)",
      },
      practiceSet: [
        {
          prompt: "\\(n = 10\\), \\(\\bar x = 4\\), \\(\\sigma = 1\\): \\(\\sum x^2 = ?\\)",
          answer: "\\(170\\)",
        },
        {
          prompt: "Variance of \\(2, 2, 2, 2\\)?",
          answer: "\\(0\\)",
        },
        {
          prompt: "\\(\\sum x = 30\\), \\(\\sum x^2 = 200\\), \\(n = 5\\): \\(\\sigma^2 = ?\\)",
          answer: "\\(4\\)",
        },
        {
          prompt: "SD of \\(1, 3, 5\\)?",
          answer: "\\(\\sqrt{\\dfrac83}\\)",
          method: "\\(\\frac{35}{3} - 9\\).",
        },
      ],
      pyqExampleId: "5bc20dc8-1416-43d1-b0bc-d99e52fd1809",
      traps: [
        {
          title: "Forgetting to add the mean squared",
          body:
            "\\(\\sum x^2 = n\\sigma^2\\) gives \\(2500\\), not \\(252{,}500\\). The mean of the squares is the variance PLUS the square of the mean.",
        },
      ],
    },

    // 2 — deviations from an assumed mean
    {
      kind: "formula" as const,
      slug: "cetdisp-deviations-from-an-assumed-mean",
      name: "Deviations From an Assumed Mean: Σ(x − a) and Σ(x − a)²",
      intuition:
        "Subtracting a constant \\(a\\) from every observation shifts the mean by \\(a\\) and leaves the variance alone. So with \\(d_i = x_i - a\\): \\(\\bar x = a + \\dfrac{\\sum d}{n}\\) and \\(\\sigma^2 = \\dfrac{\\sum d^2}{n} - \\left(\\dfrac{\\sum d}{n}\\right)^2\\) — the same identity, applied to the deviations.",
      definition:
        "- \\(n = 20\\), \\(\\sum(x - 2) = 20\\), \\(\\sum(x - 2)^2 = 100\\): \\(\\sigma^2 = \\dfrac{100}{20} - \\left(\\dfrac{20}{20}\\right)^2 = 5 - 1 = 4\\), SD \\(2\\). (The mean is \\(2 + 1 = 3\\), not needed.)\n" +
        "- \\(50\\) observations with \\(\\sum(x - 30) = 50\\): \\(\\bar x = 30 + \\dfrac{50}{50} = 31\\).\n" +
        "- The correction term \\(\\left(\\dfrac{\\sum d}{n}\\right)^2\\) vanishes only when \\(a\\) IS the mean; otherwise it must be subtracted.\n" +
        "- Choosing \\(a\\) near the centre keeps the deviations small — the point of the method in hand calculation.",
      formula: {
        label: "Assumed-mean formulas",
        latex:
          "\\bar x = a + \\frac{\\sum d_i}{n},\\qquad \\sigma^2 = \\frac{\\sum d_i^2}{n} - \\left(\\frac{\\sum d_i}{n}\\right)^2,\\qquad d_i = x_i - a",
      },
      authoredExample: {
        prompt: "For \\(10\\) observations, \\(\\sum(x - 5) = 10\\) and \\(\\sum(x - 5)^2 = 50\\). Find the mean and the variance.",
        steps: [
          "\\(\\bar x = 5 + \\dfrac{10}{10} = 6\\).",
          "\\(\\sigma^2 = \\dfrac{50}{10} - 1^2 = 4\\).",
        ],
        answer: "Mean \\(6\\), variance \\(4\\).",
      },
      selfCheckExample: {
        prompt: "For \\(25\\) observations, \\(\\sum(x - 10) = -25\\) and \\(\\sum(x - 10)^2 = 125\\). Find the SD.",
        steps: [
          "\\(\\sigma^2 = \\dfrac{125}{25} - (-1)^2 = 5 - 1 = 4\\).",
        ],
        answer: "\\(2\\)",
      },
      practiceSet: [
        {
          prompt: "\\(\\sum(x - 30) = 50\\), \\(n = 50\\): mean?",
          answer: "\\(31\\)",
        },
        {
          prompt: "\\(\\sum d = 0\\): what is \\(a\\)?",
          answer: "The mean itself.",
        },
        {
          prompt: "\\(\\sum d^2 = 100\\), \\(\\sum d = 20\\), \\(n = 20\\): \\(\\sigma^2 = ?\\)",
          answer: "\\(4\\)",
        },
        {
          prompt: "Does the variance depend on \\(a\\)?",
          answer: "No.",
        },
      ],
      pyqExampleId: "b8843c6f-9e6c-4384-af93-cd6b0471f70f",
      traps: [
        {
          title: "Reading Σ(x − 2)²/n as the variance",
          body:
            "\\(\\dfrac{100}{20} = 5\\) is the mean of the squared deviations from \\(2\\), not from the mean. Subtract \\(\\left(\\dfrac{\\sum d}{n}\\right)^2 = 1\\); the SD is \\(2\\), not \\(\\sqrt5\\).",
        },
      ],
    },

    // 3 — corrected and added observations
    {
      kind: "formula" as const,
      slug: "cetdisp-corrected-and-added-observations",
      name: "A Wrong Observation Replaced, or Observations Added: Fix the Sums First",
      intuition:
        "Everything runs through \\(\\sum x\\) and \\(\\sum x^2\\). Replacing a value changes both sums by the difference of the old and new values (and of their squares); adding observations changes \\(n\\) and the sums, and 'the mean stays the same' is an equation in the unknown.",
      definition:
        "- \\(n = 15\\), \\(\\sum x = 170\\), \\(\\sum x^2 = 2830\\); \\(20\\) replaced by \\(30\\): \\(\\sum x = 180\\), \\(\\sum x^2 = 2830 - 400 + 900 = 3330\\); \\(\\sigma^2 = 222 - 144 = 78\\).\n" +
        "- Mean \\(\\bar x\\) of \\(n\\) values; add \\(n + 1\\), \\(n - 1\\), \\(2n - 1\\) (sum \\(4n - 1\\)) with the mean unchanged: \\(\\dfrac{n\\bar x + 4n - 1}{n + 3} = \\bar x \\Rightarrow 4n - 1 = 3\\bar x \\Rightarrow n = \\dfrac{3\\bar x + 1}{4}\\).\n" +
        "- A wrongly recorded value that is REMOVED (not replaced) also reduces \\(n\\) by one.\n" +
        "- Recompute the mean from the corrected sum before the variance; using the old mean with the new sum of squares is the standard slip.",
      formula: {
        label: "Correcting sums",
        latex:
          "\\sum x_{\\text{new}} = \\sum x - x_{\\text{wrong}} + x_{\\text{right}},\\qquad \\sum x^2_{\\text{new}} = \\sum x^2 - x_{\\text{wrong}}^2 + x_{\\text{right}}^2",
      },
      authoredExample: {
        prompt: "The mean of \\(10\\) observations is \\(20\\) and their variance is \\(9\\). One observation, recorded as \\(15\\), should have been \\(25\\). Find the corrected variance.",
        steps: [
          "Old sums: \\(\\sum x = 200\\), \\(\\sum x^2 = 10(9 + 400) = 4090\\). Corrected: \\(\\sum x = 210\\), \\(\\sum x^2 = 4090 - 225 + 625 = 4490\\).",
          "New mean \\(21\\); \\(\\sigma^2 = 449 - 441 = 8\\).",
        ],
        answer: "\\(8\\)",
      },
      selfCheckExample: {
        prompt: "The mean of \\(n\\) observations is \\(12\\). Three observations \\(n + 1\\), \\(n - 3\\) and \\(2n - 2\\) are added and the mean is unchanged. Find \\(n\\).",
        steps: [
          "Added sum \\(= 4n - 4\\). \\(\\dfrac{12n + 4n - 4}{n + 3} = 12 \\Rightarrow 4n - 4 = 36 \\Rightarrow n = 10\\).",
        ],
        answer: "\\(n = 10\\)",
      },
      practiceSet: [
        {
          prompt: "\\(\\sum x = 170\\); \\(20 \\to 30\\): new \\(\\sum x\\)?",
          answer: "\\(180\\)",
        },
        {
          prompt: "\\(\\sum x^2 = 2830\\); \\(20 \\to 30\\): new \\(\\sum x^2\\)?",
          answer: "\\(3330\\)",
        },
        {
          prompt: "\\(n = 15\\), \\(\\sum x = 180\\), \\(\\sum x^2 = 3330\\): \\(\\sigma^2 = ?\\)",
          answer: "\\(78\\)",
        },
        {
          prompt: "Adding values equal to the mean changes the mean?",
          answer: "No.",
        },
      ],
      pyqExampleId: "4f2f8b14-d386-4093-b384-8e80365ec22c",
      traps: [
        {
          title: "Keeping the old mean after correcting the sum",
          body:
            "\\(\\dfrac{3330}{15} - \\left(\\dfrac{170}{15}\\right)^2\\) is wrong; the corrected mean is \\(12\\), giving \\(222 - 144 = 78\\).",
        },
      ],
    },

    // 4 — grouped data
    {
      kind: "formula" as const,
      slug: "cetdisp-grouped-data-mean-and-sd",
      name: "Grouped Data: Midpoints, Σfx and Σfx²",
      intuition:
        "With frequencies, every sum is weighted: \\(\\bar x = \\dfrac{\\sum f x}{N}\\), \\(\\sigma^2 = \\dfrac{\\sum f x^2}{N} - \\bar x^2\\), where \\(N = \\sum f\\) and a class interval is represented by its midpoint.",
      definition:
        "- Classes \\(0\\)–\\(6\\), \\(6\\)–\\(12\\), \\(12\\)–\\(18\\) with \\(f = 2, 4, 6\\): midpoints \\(3, 9, 15\\); \\(N = 12\\); \\(\\sum fx = 6 + 36 + 90 = 132\\), \\(\\bar x = 11\\); \\(\\sum fx^2 = 18 + 324 + 1350 = 1692\\); \\(\\sigma^2 = 141 - 121 = 20\\), SD \\(2\\sqrt5\\).\n" +
        "- **Frequencies in a parameter**: marks \\(2, 3, 5, 7\\) with \\(f = (x+1)^2, 2x - 5, x^2 - 3x, x\\) and \\(N = 20\\): \\(2x^2 + 2x - 4 = 20 \\Rightarrow x = 3\\); frequencies \\(16, 1, 0, 3\\); \\(\\sum fx = 32 + 3 + 0 + 21 = 56\\); mean \\(2.8\\).\n" +
        "- A frequency must be a whole number \\(\\ge 0\\); that is what rejects the negative root of the quadratic in \\(x\\).\n" +
        "- \\(\\sqrt{20} = 2\\sqrt5\\): options list both forms, and both are the same answer.",
      formula: {
        label: "Weighted sums",
        latex:
          "\\bar x = \\frac{\\sum f_i x_i}{N},\\qquad \\sigma^2 = \\frac{\\sum f_i x_i^2}{N} - \\bar x^2,\\qquad N = \\sum f_i",
      },
      visualizationSlug: "histogram-bin-slider",
      authoredExample: {
        prompt: "Find the SD of the distribution: values \\(1, 2, 3\\) with frequencies \\(1, 2, 1\\).",
        steps: [
          "\\(N = 4\\), \\(\\sum fx = 1 + 4 + 3 = 8\\), \\(\\bar x = 2\\); \\(\\sum fx^2 = 1 + 8 + 9 = 18\\); \\(\\sigma^2 = 4.5 - 4 = 0.5\\).",
        ],
        answer: "\\(\\dfrac{1}{\\sqrt2}\\)",
      },
      selfCheckExample: {
        prompt: "Classes \\(0\\)–\\(10\\), \\(10\\)–\\(20\\), \\(20\\)–\\(30\\) have frequencies \\(1, 2, 2\\). Find the mean and variance.",
        steps: [
          "Midpoints \\(5, 15, 25\\); \\(N = 5\\); \\(\\sum fx = 5 + 30 + 50 = 85\\), \\(\\bar x = 17\\); \\(\\sum fx^2 = 25 + 450 + 1250 = 1725\\); \\(\\sigma^2 = 345 - 289 = 56\\).",
        ],
        answer: "Mean \\(17\\), variance \\(56\\).",
      },
      practiceSet: [
        {
          prompt: "Midpoint of \\(12\\)–\\(18\\)?",
          answer: "\\(15\\)",
        },
        {
          prompt: "\\(\\sum fx^2\\) for \\(x = 3, 9, 15\\), \\(f = 2, 4, 6\\)?",
          answer: "\\(1692\\)",
        },
        {
          prompt: "\\(2x^2 + 2x - 4 = 20 \\Rightarrow x = ?\\)",
          answer: "\\(3\\) (reject \\(-4\\))",
        },
        {
          prompt: "\\(\\sqrt{20}\\) simplified?",
          answer: "\\(2\\sqrt5\\)",
        },
      ],
      pyqExampleId: "6469681b-64bb-4761-a08f-41544afed5ea",
      traps: [
        {
          title: "Using class limits instead of midpoints",
          body:
            "The class \\(6\\)–\\(12\\) contributes at \\(x = 9\\). Using \\(6\\) or \\(12\\) shifts every sum and lands on a distractor.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Shift and Scale — why the assumed mean leaves the variance alone",
      href: "/notes/mht-cet-maths/measures-of-dispersion/cetdisp-shift-and-scale",
    },
    {
      label: "Probability Distribution — the same mean and variance formulas for a random variable",
      href: "/notes/mht-cet-maths/probability-distribution",
    },
  ],
};
