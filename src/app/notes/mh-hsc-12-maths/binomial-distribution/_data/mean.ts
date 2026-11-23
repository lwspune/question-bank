import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_MA_BD_MEAN_NOTE: SubtopicNote = {
  subtopicName: "Mean and Variance of a Binomial Distribution",
  title: "Mean, Variance and Standard Deviation of a Binomial Distribution",
  oneLineDefinition:
    "For X ~ B(n, p), the mean is E(X) = np, the variance is Var(X) = npq and the standard deviation is the square root of npq; given two of these facts, the others follow.",
  whyItMatters:
    "24 questions, twelve of them from board papers, five of those as MCQs. The board asked for E(X) and Var(X) from the p.m.f. or from n and p (2015, 2023, 2024, 2025, 2026), for Var(X) or p when n and E(X) are given (2020, 2026), and for n and p from the mean and variance (2019, 2024, 2025 twice, 2026). Eleven of the twelve repeat a textbook exercise or solved example with the same numbers: the same p.m.f. was set in 2015, 2023 and 2026, and E(X) = 6 with Var(X) = 4.2 in 2019, 2025 and 2026.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscmbd-meanvar",
      name: "E(X) = np, Var(X) = npq and SD(X)",
      intuition:
        "If you toss a fair coin 10 times you expect about 5 heads: the number of trials times the chance of success. That is the mean, \\(np\\). The variance \\(npq\\) measures how far the number of successes usually strays from \\(np\\). Since \\(q\\) is less than 1, the variance \\(npq\\) is always smaller than the mean \\(np\\). The textbook gives these formulae without proof, so the board asks you to use them, not to prove them.",
      definition:
        "Let \\(X \\sim B(n, p)\\) and \\(q = 1 - p\\). Then:\n" +
        "- mean (expected value): \\(\\mu = E(X) = np\\);\n" +
        "- variance: \\(\\text{Var}(X) = npq\\);\n" +
        "- standard deviation: \\(SD(X) = \\sigma_{x} = \\sqrt{\\text{Var}(X)} = \\sqrt{npq}\\).\n" +
        "- **Given the p.m.f.** \\(P(X = x) = {}^{n}C_{x}\\,p^{x}q^{n-x}\\): \\(n\\) is the top number of \\({}^{n}C_{x}\\), \\(p\\) is the number raised to the power \\(x\\), and \\(q\\) is the number raised to the power \\(n - x\\). Check that \\(p + q = 1\\).\n" +
        "- **From a story:** decide what X counts, then write \\(n\\) and \\(p\\) as on the previous page.",
      formula: {
        label: "Mean, variance and standard deviation",
        latex: "E(X) = np, \\qquad \\text{Var}(X) = npq, \\qquad SD(X) = \\sqrt{npq}",
        symbols: [
          { symbol: "\\(n\\)", meaning: "number of trials" },
          { symbol: "\\(p\\)", meaning: "probability of success in one trial" },
          { symbol: "\\(q\\)", meaning: "1 minus p" },
        ],
      },
      authoredExample: {
        prompt: "Given \\(X \\sim B\\left(12, \\dfrac{1}{4}\\right)\\), find \\(E(X)\\), \\(\\text{Var}(X)\\) and \\(SD(X)\\).",
        steps: [
          "Here \\(n = 12\\), \\(p = \\dfrac{1}{4}\\), \\(q = 1 - \\dfrac{1}{4} = \\dfrac{3}{4}\\).",
          "\\(E(X) = np = 12 \\times \\dfrac{1}{4} = 3\\).",
          "\\(\\text{Var}(X) = npq = 12 \\times \\dfrac{1}{4} \\times \\dfrac{3}{4} = \\dfrac{9}{4} = 2.25\\).",
          "\\(SD(X) = \\sqrt{\\text{Var}(X)} = \\sqrt{\\dfrac{9}{4}} = \\dfrac{3}{2} = 1.5\\).",
        ],
        answer: "\\(E(X) = 3\\), \\(\\text{Var}(X) = 2.25\\), \\(SD(X) = 1.5\\)",
      },
      selfCheckExample: {
        prompt: "A fair coin is tossed 16 times and \\(X\\) is the number of heads. Find \\(E(X)\\), \\(\\text{Var}(X)\\) and \\(SD(X)\\).",
        steps: [
          "\\(X \\sim B\\left(16, \\dfrac{1}{2}\\right)\\): \\(n = 16\\), \\(p = q = \\dfrac{1}{2}\\).",
          "\\(E(X) = 16 \\times \\dfrac{1}{2} = 8\\), \\(\\text{Var}(X) = 16 \\times \\dfrac{1}{2} \\times \\dfrac{1}{2} = 4\\), \\(SD(X) = \\sqrt{4} = 2\\).",
        ],
        answer: "\\(E(X) = 8\\), \\(\\text{Var}(X) = 4\\), \\(SD(X) = 2\\)",
      },
      practiceSet: [
        { prompt: "For \\(X \\sim B(20, 0.5)\\), find \\(SD(X)\\).", answer: "\\(\\sqrt{20 \\times 0.5 \\times 0.5} = \\sqrt{5} \\approx 2.236\\)" },
        { prompt: "Can the variance of a binomial variable be larger than its mean? Give the reason.", answer: "No. \\(\\text{Var}(X) = np \\times q\\) and \\(q < 1\\), so the variance is less than the mean." },
      ],
      pyqExampleId: "d17f8a46-8574-4a6e-a180-cf1d5e6d521b",
      traps: [
        {
          title: "Mixing up the three formulae",
          body: "The mean is \\(np\\), the variance is \\(npq\\) and the SD is \\(\\sqrt{npq}\\). Writing \\(np\\) for the variance, or \\(npq\\) for the SD, are the usual wrong MCQ options.",
        },
        {
          title: "Reading p from the wrong power in the p.m.f.",
          body: "In \\({}^{n}C_{x}\\,a^{x}b^{n-x}\\), \\(p\\) is \\(a\\), the base with power \\(x\\). Taking the base with power \\(n - x\\) as \\(p\\) swaps \\(p\\) and \\(q\\) and gives the wrong mean.",
        },
        {
          title: "Forgetting the square root for SD",
          body: "When the question asks for the standard deviation, finish with \\(\\sqrt{npq}\\). Stopping at \\(npq\\) gives the variance.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmbd-oneunknown",
      name: "One unknown from the mean",
      intuition:
        "If you know the number of trials and the mean, the chance of success follows at once from mean \\(= np\\). If you know \\(p\\) and the mean, the number of trials follows the same way. Once n and p are both known, everything else, the variance and the SD, can be worked out.",
      definition:
        "- From \\(E(X) = np\\): \\(p = \\dfrac{E(X)}{n}\\) when \\(n\\) is known, and \\(n = \\dfrac{E(X)}{p}\\) when \\(p\\) is known.\n" +
        "- Then \\(q = 1 - p\\), \\(\\text{Var}(X) = npq\\) and \\(SD(X) = \\sqrt{npq}\\).\n" +
        "- A short way to the variance: \\(\\text{Var}(X) = (np)q = E(X) \\times q\\).\n" +
        "- \\(n\\) must come out a whole number and \\(p\\) must lie between 0 and 1.",
      formula: {
        label: "Mean gives the unknown",
        latex: "np = E(X), \\qquad \\text{Var}(X) = E(X)\\,q",
      },
      authoredExample: {
        prompt: "Given \\(X \\sim B(n, p)\\) with \\(p = 0.25\\) and \\(E(X) = 5\\), find \\(n\\) and \\(\\text{Var}(X)\\).",
        steps: [
          "\\(E(X) = np\\), so \\(n \\times 0.25 = 5\\).",
          "\\(n = \\dfrac{5}{0.25} = 20\\).",
          "\\(q = 1 - 0.25 = 0.75\\).",
          "\\(\\text{Var}(X) = npq = 20 \\times 0.25 \\times 0.75 = 3.75\\).",
        ],
        answer: "\\(n = 20\\), \\(\\text{Var}(X) = 3.75\\)",
      },
      selfCheckExample: {
        prompt: "Given \\(X \\sim B(n, p)\\) with \\(n = 50\\) and \\(E(X) = 10\\), find \\(p\\) and \\(SD(X)\\).",
        steps: [
          "\\(50p = 10\\), so \\(p = 0.2\\) and \\(q = 0.8\\).",
          "\\(\\text{Var}(X) = 50 \\times 0.2 \\times 0.8 = 8\\), so \\(SD(X) = \\sqrt{8} = 2\\sqrt{2}\\).",
        ],
        answer: "\\(p = 0.2\\), \\(SD(X) = 2\\sqrt{2} \\approx 2.828\\)",
      },
      practiceSet: [
        { prompt: "Given \\(X \\sim B(8, p)\\) and \\(E(X) = 2\\), find \\(q\\).", answer: "\\(p = \\dfrac{2}{8} = \\dfrac{1}{4}\\), so \\(q = \\dfrac{3}{4}\\)" },
        { prompt: "Given \\(X \\sim B(n, 0.4)\\) and \\(E(X) = 12\\), find \\(n\\).", answer: "\\(n = \\dfrac{12}{0.4} = 30\\)" },
      ],
      pyqExampleId: "0edea8da-4360-4588-9d6d-6e638df96147",
      traps: [
        {
          title: "Stopping after finding p",
          body: "If the question asks for the variance, \\(p\\) is only a step. Write \\(q\\), then \\(\\text{Var}(X) = npq\\) with the substitution shown.",
        },
        {
          title: "Taking q as 1 divided by p",
          body: "\\(q = 1 - p\\), not \\(\\dfrac{1}{p}\\). A value of \\(q\\) bigger than 1 is a sure sign of this slip.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmbd-both",
      name: "n and p from the mean and the variance",
      intuition:
        "The mean is \\(np\\) and the variance is \\(np\\) times \\(q\\). Divide the variance by the mean and \\(np\\) cancels, leaving \\(q\\) alone. Then \\(p = 1 - q\\), and \\(n\\) comes from the mean. It takes three short lines, and the board set it in 2019, 2024, 2025 and 2026.",
      definition:
        "- \\(np = E(X)\\) ...(i) and \\(npq = \\text{Var}(X)\\) ...(ii).\n" +
        "- Divide (ii) by (i): \\(q = \\dfrac{\\text{Var}(X)}{E(X)}\\).\n" +
        "- \\(p = 1 - q\\).\n" +
        "- Put \\(p\\) in (i): \\(n = \\dfrac{E(X)}{p}\\).\n" +
        "- Since \\(q < 1\\), the variance must be less than the mean. If it is not, no binomial distribution fits the data.",
      formula: {
        label: "Recovering q",
        latex: "q = \\dfrac{npq}{np} = \\dfrac{\\text{Var}(X)}{E(X)}, \\qquad p = 1 - q, \\qquad n = \\dfrac{E(X)}{p}",
      },
      authoredExample: {
        prompt: "The mean and variance of a binomial distribution are 8 and 6. Find \\(n\\) and \\(p\\).",
        steps: [
          "\\(np = 8\\) ...(i) and \\(npq = 6\\) ...(ii).",
          "Dividing (ii) by (i): \\(q = \\dfrac{6}{8} = \\dfrac{3}{4}\\).",
          "\\(p = 1 - \\dfrac{3}{4} = \\dfrac{1}{4}\\).",
          "From (i): \\(n \\times \\dfrac{1}{4} = 8\\), so \\(n = 32\\).",
        ],
        answer: "\\(n = 32\\), \\(p = \\dfrac{1}{4}\\)",
      },
      selfCheckExample: {
        prompt: "The mean and variance of a binomial distribution are 10 and 6. Find \\(n\\) and \\(p\\).",
        steps: [
          "\\(q = \\dfrac{6}{10} = 0.6\\), so \\(p = 0.4\\).",
          "\\(n = \\dfrac{10}{0.4} = 25\\).",
        ],
        answer: "\\(n = 25\\), \\(p = 0.4\\)",
      },
      practiceSet: [
        { prompt: "The mean and variance of a binomial distribution are 4 and 3. Find \\(p\\) and \\(n\\).", answer: "\\(q = \\dfrac{3}{4}\\), \\(p = \\dfrac{1}{4}\\), \\(n = 16\\)" },
        { prompt: "Can a binomial distribution have mean 3 and variance 4? Give the reason.", answer: "No. It would need \\(q = \\dfrac{4}{3}\\), but \\(q\\) cannot be more than 1." },
      ],
      pyqExampleId: "fdc7df47-0c7f-4fd6-9ba2-c8e4463a83ca",
      traps: [
        {
          title: "Dividing the mean by the variance",
          body: "\\(\\dfrac{np}{npq} = \\dfrac{1}{q}\\), not \\(q\\). Divide the variance by the mean, so that \\(q\\) comes out less than 1.",
        },
        {
          title: "Taking q for p",
          body: "The division gives \\(q\\), the chance of failure. Write \\(p = 1 - q\\) before finding \\(n\\); using \\(q\\) in \\(n = \\dfrac{E(X)}{p}\\) gives the wrong \\(n\\), often one of the MCQ options.",
        },
      ],
    },
  ],
};
