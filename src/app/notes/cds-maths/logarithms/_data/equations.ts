import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_LG_EQUATIONS_NOTE: SubtopicNote = {
  subtopicName: "Solving Logarithmic Equations",
  title: "Logarithmic and Exponential Equations",
  oneLineDefinition:
    "Turn a log equation into a power (log N = k means N = 10ᵏ), or take logs of an exponential equation, and solve what remains.",
  whyItMatters:
    "Ten PYQs, five of them HARD — the hardest page in the chapter. Two directions: log₁₀[995 + √(…)] = 3 unwraps to 995 + √(…) = 1000; 5ˣ⁻³ = 8 needs logs of both sides. Always check that each root keeps every logarithm's argument positive.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdslg-equations",
      name: "Unwrapping logs and taking logs",
      intuition:
        "\\(\\log_{10}N = k\\) and \\(N = 10^k\\) say the same thing, so a log equation can be turned into an ordinary one. An equation with the unknown in an exponent goes the other way: take logs and the exponent comes down as a multiplier.",
      definition:
        "- \\(\\log_{10}N = k \\iff N = 10^k\\).\n" +
        "- \\(a^{f(x)} = b\\): \\(f(x)\\log a = \\log b\\).\n" +
        "- Collect the logs on one side: \\(\\log x + \\log x^2 = 3\\log x\\).\n" +
        "- An exponential in disguise: put \\(t = 3^x\\) and solve the quadratic in \\(t\\).\n" +
        "- Reject any root that makes a log's argument zero or negative.",
      formula: {
        label: "Unwrapping",
        latex: "\\log_{10} N = k \\iff N = 10^k",
      },
      authoredExample: {
        prompt: "Solve \\(\\log_{10}\\left[996 + \\sqrt{x^2 - 4x + 13}\\right] = 3\\).",
        steps: ["\\(\\sqrt{x^2 - 4x + 13} = 4\\), so \\(x^2 - 4x - 3 = 0\\).", "\\(x = 2 \\pm \\sqrt7\\); both keep the radicand at \\(16\\)."],
        answer: "\\(x = 2 \\pm \\sqrt7\\).",
      },
      selfCheckExample: {
        prompt: "Solve \\(2^{x+1} = 5\\) in terms of \\(\\log_{10}2\\).",
        steps: ["\\((x + 1)\\log 2 = \\log 5 = 1 - \\log 2\\)."],
        answer: "\\(x = \\dfrac{1 - 2\\log 2}{\\log 2}\\).",
      },
      practiceSet: [
        { prompt: "\\(\\log_{10}x = 2\\). \\(x\\)?", answer: "\\(100\\)" },
        { prompt: "\\(\\log x + \\log x^2 = 6\\). \\(x\\)?", answer: "\\(100\\)" },
        { prompt: "\\(10^{x-1} = 1000\\). \\(x\\)?", answer: "\\(4\\)" },
        { prompt: "\\(\\log_{10}(x^2 - 15) = 1\\). Positive \\(x\\)?", answer: "\\(5\\)" },
      ],
      pyqExampleId: "491689b2-565d-4a65-af85-b243e5afaafc", // 2021 (I) — 5^(x−3) = 8
      traps: [
        {
          title: "Check the argument",
          body:
            "A value that solves the algebra can make \\(\\log(100001 - 4^x)\\) the log of a negative number. Substitute each root back before choosing.",
        },
      ],
    },
  ],
};
