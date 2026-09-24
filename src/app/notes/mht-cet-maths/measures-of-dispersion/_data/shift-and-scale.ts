import type { SubtopicNote } from "@/app/notes/_types";

export const SHIFT_AND_SCALE_NOTE: SubtopicNote = {
  subtopicName: "Shift and Scale — How Adding and Multiplying Change Mean, Variance and SD",
  title: "Shift and Scale — How Adding and Multiplying Change Mean, Variance and SD",
  oneLineDefinition:
    "Add a constant: the mean shifts by it and the variance does not move. Multiply by λ: the mean multiplies by λ, the SD by |λ|, the variance by λ².",
  whyItMatters:
    "10 PYQs at 30% HARD — the chapter's only HARD questions are here, though six of the ten are one-line applications of the two rules. The HARD three are the same rules used inside an algebraic identity: the mean of (x − 5)² from a known mean and variance (set twice), and the b = a + c identity whose stored options had lost a factor of 3 until this session restored them from the paper. " +
    "Learn the rules as facts about the formula, not as slogans.",
  concepts: [
    // 1 — adding a constant
    {
      kind: "formula" as const,
      slug: "cetdisp-adding-a-constant",
      name: "Adding a Constant: Mean Shifts, Variance Stays",
      intuition:
        "Adding \\(8\\) to every observation slides the whole data set along the line. Distances between values — and so the spread — are untouched; only the centre moves.",
      definition:
        "- \\(y_i = x_i + c\\): \\(\\bar y = \\bar x + c\\), \\(\\sigma_y^2 = \\sigma_x^2\\), \\(\\sigma_y = \\sigma_x\\).\n" +
        "- Variance \\(6\\), mean \\(10\\); each observation increased by \\(8\\): new variance \\(6\\), new mean \\(18\\).\n" +
        "- Why: \\(y_i - \\bar y = (x_i + c) - (\\bar x + c) = x_i - \\bar x\\), so every squared deviation is the same.\n" +
        "- This is the fact behind the assumed-mean method and behind 'the SD of \\(a + 2, b + 2, c + 2\\) is \\(d\\)' meaning the SD of \\(a, b, c\\) is \\(d\\).",
      formula: {
        label: "Shift rule",
        latex:
          "\\overline{x + c} = \\bar x + c,\\qquad \\operatorname{Var}(x + c) = \\operatorname{Var}(x)",
      },
      visualizationSlug: "mean-balance-point",
      authoredExample: {
        prompt: "The mean and variance of \\(12\\) observations are \\(25\\) and \\(9\\). Each observation is decreased by \\(5\\). Find the new mean and SD.",
        steps: [
          "Mean \\(25 - 5 = 20\\); variance unchanged at \\(9\\), SD \\(3\\).",
        ],
        answer: "Mean \\(20\\), SD \\(3\\).",
      },
      selfCheckExample: {
        prompt: "The SD of \\(x_1, \\dots, x_n\\) is \\(4\\). What is the SD of \\(x_1 + 100, \\dots, x_n + 100\\)?",
        steps: [
          "A shift leaves the SD unchanged.",
        ],
        answer: "\\(4\\)",
      },
      practiceSet: [
        {
          prompt: "Mean \\(10\\), each value \\(+8\\): new mean?",
          answer: "\\(18\\)",
        },
        {
          prompt: "Variance \\(6\\), each value \\(+8\\): new variance?",
          answer: "\\(6\\)",
        },
        {
          prompt: "SD of \\(5, 5, 5\\) after adding \\(3\\)?",
          answer: "\\(0\\)",
        },
        {
          prompt: "Variance of \\(x - 7\\) vs variance of \\(x\\)?",
          answer: "Equal.",
        },
      ],
      pyqExampleId: "f6a9da66-b29d-42e0-bdee-c1609794f91f",
      traps: [
        {
          title: "Adding the constant to the variance",
          body:
            "New variance \\(14\\) is option (C) on the classic stem. Adding a constant moves nothing but the mean.",
        },
      ],
    },

    // 2 — multiplying by a constant
    {
      kind: "formula" as const,
      slug: "cetdisp-multiplying-by-a-constant",
      name: "Multiplying by λ: Mean × λ, SD × |λ|, Variance × λ²",
      intuition:
        "Scaling every value by \\(3\\) stretches every deviation by \\(3\\), so the SD triples and the variance — a square — grows nine-fold. A multiply-then-add stem uses both rules; only the multiplication touches the variance.",
      definition:
        "- \\(y_i = \\lambda x_i\\): \\(\\bar y = \\lambda\\bar x\\), \\(\\sigma_y = |\\lambda|\\sigma_x\\), \\(\\sigma_y^2 = \\lambda^2\\sigma_x^2\\).\n" +
        "- Variance \\(12\\), each value \\(\\times 3\\): \\(108\\). Variance \\(16\\), \\(\\times 3\\): \\(144\\). Variance \\(5\\), \\(\\times 2\\): \\(20\\).\n" +
        "- Variance \\(5\\), each value \\(\\times 3\\) THEN \\(+ 8\\): \\(9 \\times 5 = 45\\); the \\(+8\\) does nothing to the variance.\n" +
        "- The sign of \\(\\lambda\\) is lost in the variance and the SD (\\(|\\lambda|\\)) but kept in the mean; that matters when a stem lets \\(p = \\pm\\frac12\\).",
      formula: {
        label: "Scale rule",
        latex:
          "\\overline{\\lambda x} = \\lambda\\bar x,\\qquad \\sigma_{\\lambda x} = |\\lambda|\\,\\sigma_x,\\qquad \\operatorname{Var}(\\lambda x) = \\lambda^2\\operatorname{Var}(x)",
      },
      visualizationSlug: "mean-deviation-spread",
      authoredExample: {
        prompt: "The variance of \\(10\\) observations is \\(7\\). Each observation is multiplied by \\(4\\) and then \\(3\\) is subtracted. Find the new variance and the new SD.",
        steps: [
          "Variance \\(16 \\times 7 = 112\\); the subtraction changes nothing. SD \\(\\sqrt{112} = 4\\sqrt7\\).",
        ],
        answer: "Variance \\(112\\), SD \\(4\\sqrt7\\).",
      },
      selfCheckExample: {
        prompt: "The SD of a data set is \\(6\\). Each value is multiplied by \\(-\\dfrac12\\). Find the new SD and variance.",
        steps: [
          "SD \\(\\left|-\\tfrac12\\right| \\times 6 = 3\\); variance \\(9\\).",
        ],
        answer: "SD \\(3\\), variance \\(9\\).",
      },
      practiceSet: [
        {
          prompt: "Variance \\(12\\), values \\(\\times 3\\)?",
          answer: "\\(108\\)",
        },
        {
          prompt: "Variance \\(5\\), values \\(\\times 3\\) then \\(+8\\)?",
          answer: "\\(45\\)",
        },
        {
          prompt: "SD \\(2\\), values \\(\\times 5\\)?",
          answer: "\\(10\\)",
        },
        {
          prompt: "Variance of \\(\\lambda x\\) in terms of \\(\\sigma_x^2\\)?",
          answer: "\\(\\lambda^2\\sigma_x^2\\)",
        },
      ],
      pyqExampleId: "a7138317-5869-46e7-bf63-26842bbbb8e0",
      traps: [
        {
          title: "Multiplying the variance by λ, not λ²",
          body:
            "\\(3 \\times 12 = 36\\) is option (B). The variance carries a square, so it scales by \\(9\\): \\(108\\).",
        },
      ],
    },

    // 3 — combined transformation, solve for parameters
    {
      kind: "formula" as const,
      slug: "cetdisp-combined-transformation-solve-for-parameters",
      name: "y = px − q With Target Mean and SD: Two Equations, Watch the Sign of p",
      intuition:
        "A combined transformation gives one equation from the mean (\\(p\\bar x - q\\)) and one from the SD (\\(|p|\\sigma\\)). The SD equation fixes \\(|p|\\), leaving two candidates; the mean equation, together with any condition like \\(q \\ne 0\\), picks the sign.",
      definition:
        "- \\(\\bar x = 20\\), \\(\\sigma = 2\\); \\(y = px - q\\) with new mean \\(10\\) and new SD \\(1\\): \\(|p| \\cdot 2 = 1 \\Rightarrow p = \\pm\\frac12\\); \\(20p - q = 10\\). With \\(p = \\frac12\\): \\(q = 0\\), excluded by \\(q \\ne 0\\); with \\(p = -\\frac12\\): \\(-10 - q = 10\\), \\(q = -20\\).\n" +
        "- Order of operations matters for the mean only: \\(px - q\\) and \\(p(x - q)\\) have the same SD but different means.\n" +
        "- Always solve the SD equation first; it is the one with two solutions.",
      formula: {
        label: "Combined rule",
        latex:
          "y = px - q:\\quad \\bar y = p\\bar x - q,\\qquad \\sigma_y = |p|\\,\\sigma_x",
      },
      authoredExample: {
        prompt: "A data set has mean \\(30\\) and SD \\(4\\). Each value is transformed to \\(y = px + q\\) so that the new mean is \\(15\\) and the new SD is \\(2\\), with \\(q \\ne 0\\). Find \\(p\\) and \\(q\\).",
        steps: [
          "\\(|p| \\cdot 4 = 2 \\Rightarrow p = \\pm\\frac12\\). Mean: \\(30p + q = 15\\).",
          "\\(p = \\frac12\\) gives \\(q = 0\\), excluded; \\(p = -\\frac12\\) gives \\(q = 30\\).",
        ],
        answer: "\\(p = -\\dfrac12,\\ q = 30\\)",
      },
      selfCheckExample: {
        prompt: "Mean \\(8\\), SD \\(3\\). After \\(y = px - q\\) the mean is \\(-1\\) and the SD is \\(6\\), with \\(p > 0\\). Find \\(q\\).",
        steps: [
          "\\(p = 2\\); \\(16 - q = -1 \\Rightarrow q = 17\\).",
        ],
        answer: "\\(17\\)",
      },
      practiceSet: [
        {
          prompt: "\\(\\sigma = 2\\), new SD \\(1\\): \\(|p| = ?\\)",
          answer: "\\(\\dfrac12\\)",
        },
        {
          prompt: "\\(p = -\\dfrac12\\), \\(\\bar x = 20\\), new mean \\(10\\), \\(y = px - q\\): \\(q = ?\\)",
          answer: "\\(-20\\)",
        },
        {
          prompt: "Does \\(y = 2x + 5\\) or \\(y = 2(x + 5)\\) have the larger SD?",
          answer: "Equal.",
        },
        {
          prompt: "Which of the two equations has two solutions?",
          answer: "The SD one (\\(|p|\\)).",
        },
      ],
      pyqExampleId: "d30259d8-9d74-4cfa-8221-e147c48f0065",
      traps: [
        {
          title: "Taking p positive by default",
          body:
            "\\(p = \\frac12\\) forces \\(q = 0\\), which the stem forbids. The SD fixes only \\(|p|\\); the remaining condition chooses the sign, and here it is negative.",
        },
      ],
    },

    // 4 — mean of shifted squares and identities
    {
      kind: "formula" as const,
      slug: "cetdisp-mean-of-shifted-squares",
      name: "Mean of (x − k)² and the b = a + c Identity: Expand, Then Use σ² + x̄²",
      intuition:
        "\\(\\dfrac{\\sum (x - k)^2}{n} = \\dfrac{\\sum x^2}{n} - 2k\\bar x + k^2\\), and \\(\\dfrac{\\sum x^2}{n} = \\sigma^2 + \\bar x^2\\). Any 'mean of squares of shifted values' collapses to \\(\\sigma^2 + (\\bar x - k)^2\\).",
      definition:
        "- \\(\\bar x = 16\\), \\(\\sigma^2 = 256\\), mean of \\((x_i - 5)^2\\): \\(\\sigma^2 + (\\bar x - 5)^2 = 256 + 121 = 377\\). Same by expansion: \\(512 - 160 + 25\\).\n" +
        "- **\\(b = a + c\\) identity**: the SD of \\(a + 2, b + 2, c + 2\\) is \\(d\\), so \\(d\\) is the SD of \\(a, b, c\\); mean \\(= \\dfrac{2b}{3}\\); \\(d^2 = \\dfrac{a^2 + b^2 + c^2}{3} - \\dfrac{4b^2}{9}\\), so \\(9d^2 = 3a^2 + 3c^2 - b^2\\), i.e. \\(b^2 = 3(a^2 + c^2) - 9d^2\\).\n" +
        "- The three-observation identity is the same expansion with symbols; the shift rule is what lets the \\(+2\\) be ignored.\n" +
        "- \\(\\sigma^2 + (\\bar x - k)^2\\) is minimised at \\(k = \\bar x\\) — the mean is the value about which the mean squared deviation is least.",
      formula: {
        label: "Shifted squares",
        latex:
          "\\frac{\\sum (x_i - k)^2}{n} = \\sigma^2 + (\\bar x - k)^2",
      },
      authoredExample: {
        prompt: "The mean and variance of \\(20\\) observations are \\(10\\) and \\(4\\). Find the mean of \\((x_i - 7)^2\\).",
        steps: [
          "\\(\\sigma^2 + (\\bar x - 7)^2 = 4 + 9 = 13\\).",
        ],
        answer: "\\(13\\)",
      },
      selfCheckExample: {
        prompt: "Three observations \\(p, q, r\\) satisfy \\(q = 2p\\) and \\(r = 3p\\). Their SD is \\(s\\). Express \\(p^2\\) in terms of \\(s^2\\).",
        steps: [
          "Values \\(p, 2p, 3p\\): mean \\(2p\\); \\(s^2 = \\dfrac{p^2 + 4p^2 + 9p^2}{3} - 4p^2 = \\dfrac{14p^2}{3} - 4p^2 = \\dfrac{2p^2}{3}\\).",
        ],
        answer: "\\(p^2 = \\dfrac{3s^2}{2}\\)",
      },
      practiceSet: [
        {
          prompt: "\\(\\bar x = 16\\), \\(\\sigma^2 = 256\\): \\(\\dfrac{\\sum x^2}{n} = ?\\)",
          answer: "\\(512\\)",
        },
        {
          prompt: "Mean of \\((x - 5)^2\\) with \\(\\bar x = 16\\), \\(\\sigma^2 = 256\\)?",
          answer: "\\(377\\)",
        },
        {
          prompt: "Mean of \\(a, b, c\\) with \\(b = a + c\\)?",
          answer: "\\(\\dfrac{2b}{3}\\)",
        },
        {
          prompt: "At which \\(k\\) is the mean of \\((x - k)^2\\) least?",
          answer: "\\(k = \\bar x\\)",
        },
      ],
      pyqExampleId: "d93632f0-bb68-4bf5-8753-2ea9e972dc7b",
      traps: [
        {
          title: "Using Σx²/n = σ² in the expansion",
          body:
            "The mean of the squares is \\(\\sigma^2 + \\bar x^2 = 512\\), not \\(256\\). Dropping \\(\\bar x^2\\) gives \\(121\\), which is not offered — the offered distractors come from arithmetic slips in \\(512 - 160 + 25\\).",
        },
      ],
    },
  ],
  related: [
    {
      label: "Mean and Variance From Sums — the identity every rule here expands",
      href: "/notes/mht-cet-maths/measures-of-dispersion/cetdisp-mean-and-variance-from-sums",
    },
    {
      label: "Standard Series and Missing Observations — the two-unknowns stem that uses σ² + x̄²",
      href: "/notes/mht-cet-maths/measures-of-dispersion/cetdisp-standard-series-and-missing-observations",
    },
  ],
};
