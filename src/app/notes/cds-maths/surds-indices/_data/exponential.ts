import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_SI_EXPONENTIAL_NOTE: SubtopicNote = {
  subtopicName: "Exponential Equations",
  title: "Exponential Equations",
  oneLineDefinition:
    "An equation in a^x becomes a quadratic when you put t = a^x, and a sum of like powers becomes one power once the common factor is taken out.",
  whyItMatters:
    "Eight PYQs, all MODERATE. Two moves solve every one: substitute t for the power (a^x + a^(−x) becomes t + 1/t), or take out the smallest power as a common factor.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdssi-substitute-t",
      name: "Substitute t = a^x",
      intuition:
        "\\(a^{1 + x}\\) and \\(a^{1 - x}\\) are \\(a\\cdot t\\) and \\(\\dfrac at\\) when \\(t = a^x\\). Multiply through by \\(t\\) and the equation is a quadratic in \\(t\\); each positive root gives one value of \\(x\\).",
      definition:
        "- Put \\(t = a^x\\) (so \\(t > 0\\)): \\(a^{x + k} = a^k t\\) and \\(a^{-x} = \\dfrac1t\\).\n" +
        "- Solve the quadratic in \\(t\\), reject any \\(t \\le 0\\), then \\(x = \\log_a t\\).\n" +
        "- \\(t + \\dfrac1t = 2\\) forces \\(t = 1\\), so \\(x = 0\\); \\(t + \\dfrac1t > 2\\) for every other positive \\(t\\).\n" +
        "- If \\(pq = 1\\) (like \\((2 + \\sqrt3)(2 - \\sqrt3)\\)), then \\(q^x = \\dfrac{1}{p^x}\\) and the same substitution works.",
      formula: {
        label: "Quadratic in t",
        latex: "a^{1 + x} + a^{1 - x} = c \\;\\Rightarrow\\; a t^2 - c t + a = 0,\\ \\ t = a^x",
      },
      authoredExample: {
        prompt: "Solve \\(2^{x + 1} + 2^{3 - x} = 17\\).",
        steps: [
          "With \\(t = 2^x\\): \\(2t + \\dfrac8t = 17\\), so \\(2t^2 - 17t + 8 = 0\\).",
          "\\((2t - 1)(t - 8) = 0\\): \\(t = \\dfrac12\\) or \\(8\\).",
        ],
        answer: "\\(x = -1\\) or \\(x = 3\\).",
      },
      selfCheckExample: {
        prompt: "Solve \\(4^x - 3\\cdot 2^x + 2 = 0\\).",
        steps: ["\\(4^x = t^2\\) with \\(t = 2^x\\): \\(t^2 - 3t + 2 = 0\\), \\(t = 1\\) or \\(2\\)."],
        answer: "\\(x = 0\\) or \\(1\\).",
      },
      practiceSet: [
        { prompt: "\\(3^x + 3^{-x} = 2\\). \\(x\\)?", answer: "\\(0\\)" },
        { prompt: "\\(9^x - 4\\cdot 3^x + 3 = 0\\). \\(x\\)?", answer: "\\(0\\) or \\(1\\)" },
        { prompt: "\\(2^x + 2^{-x} = \\dfrac52\\). \\(x\\)?", answer: "\\(\\pm 1\\)" },
        { prompt: "\\(t = 5^x = -2\\). Allowed?", answer: "No, \\(t > 0\\)" },
      ],
      pyqExampleId: "07a82f70-095b-4d21-8c84-b02ae2d5ab4c", // 2017 (I) — 5^(1+x) + 5^(1−x) = 26
      traps: [
        {
          title: "Reject non-positive t",
          body:
            "A power \\(a^x\\) with \\(a > 0\\) is always positive. A root \\(t = -2\\) of the quadratic gives no \\(x\\), and counting it doubles the answer.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdssi-common-power",
      name: "Take out the common power",
      intuition:
        "\\(5^{x + 1} - 5^{x - 1}\\) is \\(5^{x - 1}\\) times \\((5^2 - 1)\\). Taking out the smallest power turns a sum of powers into one power times a number.",
      definition:
        "- \\(a^{x + m} \\pm a^{x + n} = a^{x + n}(a^{m - n} \\pm 1)\\) for \\(m > n\\).\n" +
        "- Write every number as a power of one prime where possible: \\(2187 = 3^7\\), \\(4^{xy} = 2^{2xy}\\).\n" +
        "- Two equations in the exponents: compare exponents of the same base, then solve the pair.",
      formula: {
        label: "Common factor",
        latex: "a^{x + 1} - a^{x - 1} = a^{x - 1}(a^2 - 1)",
      },
      authoredExample: {
        prompt: "If \\(3^{x + 2} - 3^{x} = 216\\), find \\(x\\).",
        steps: ["\\(3^x(9 - 1) = 216\\), so \\(3^x = 27\\)."],
        answer: "\\(x = 3\\).",
      },
      selfCheckExample: {
        prompt: "If \\(2^{x + 3} + 2^{x + 1} = 320\\), find \\(x\\).",
        steps: ["\\(2^{x + 1}(4 + 1) = 320\\), so \\(2^{x + 1} = 64 = 2^6\\)."],
        answer: "\\(x = 5\\).",
      },
      practiceSet: [
        { prompt: "\\(2^{x + 1} - 2^x = 16\\). \\(x\\)?", answer: "\\(4\\)" },
        { prompt: "\\(5^{x} + 5^{x + 1} = 750\\). \\(x\\)?", answer: "\\(3\\)" },
        { prompt: "\\(9^x\\cdot 3^y = 3^7\\). Relation?", answer: "\\(2x + y = 7\\)" },
        { prompt: "\\(2187\\) as a power of \\(3\\)?", answer: "\\(3^7\\)" },
      ],
      pyqExampleId: "2f341a89-2388-4372-9101-4ca88673faa7", // 2020 (I) — 5^(x+1) − 5^(x−1) = 600
      traps: [
        {
          title: "Answer what is asked",
          body:
            "Solving for \\(x\\) is usually only the first step: the question may want \\(10^{2x}\\) or \\(x + y\\). Keep the requested expression in view.",
        },
      ],
    },
  ],
};
