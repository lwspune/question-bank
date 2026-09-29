import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_LG_LAWS_NOTE: SubtopicNote = {
  subtopicName: "Logarithm Identities and Change of Base",
  title: "Laws of Logarithms",
  oneLineDefinition:
    "A logarithm is an exponent: log turns products into sums, powers into multiples, and any number into a combination of log 2, log 3 and log 5.",
  whyItMatters:
    "Thirteen PYQs, two of them HARD. Almost every one is solved by breaking each number into primes and powers of 10 — 31.25 = 10³/2⁵, 384 = 2⁷·3 — then adding logs. Three facts finish the rest: log 1 = 0, log 10 = 1, and log 2 + log 5 = 1.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdslg-laws",
      name: "Product, power and change of base",
      intuition:
        "Since \\(\\log_{10}N\\) is the power of \\(10\\) that gives \\(N\\), multiplying numbers adds their powers and raising to a power multiplies it. So every log reduces to logs of primes plus whole numbers from the powers of \\(10\\).",
      definition:
        "- \\(\\log(ab) = \\log a + \\log b\\); \\(\\log\\dfrac ab = \\log a - \\log b\\); \\(\\log a^n = n\\log a\\).\n" +
        "- \\(\\log_{10}5 = 1 - \\log_{10}2\\); a factor of \\(10^k\\) adds \\(k\\).\n" +
        "- Change of base: \\(\\log_b a = \\dfrac{\\log a}{\\log b}\\); so \\(\\log_{100}x = \\tfrac12\\log_{10}x\\).\n" +
        "- A negative log written with a bar: \\(-0.0714 = \\overline{1}.9286\\) (characteristic \\(-1\\), positive mantissa).\n" +
        "- For \\(0 < m < 1\\): \\(\\log m < 0\\).",
      formula: {
        label: "Laws",
        latex: "\\log(ab) = \\log a + \\log b, \\qquad \\log a^n = n\\log a",
      },
      authoredExample: {
        prompt: "Write \\(\\log_{10}62.5\\) in terms of \\(\\log_{10}2\\).",
        steps: ["\\(62.5 = \\dfrac{1000}{16} = \\dfrac{10^3}{2^4}\\)."],
        answer: "\\(3 - 4\\log_{10}2\\).",
      },
      selfCheckExample: {
        prompt: "Given \\(\\log 2 = 0.301\\) and \\(\\log 3 = 0.477\\), find \\(\\log_{10}0.36\\).",
        steps: ["\\(0.36 = \\dfrac{2^2 \\cdot 3^2}{100}\\): \\(0.602 + 0.954 - 2\\)."],
        answer: "\\(-0.444\\), that is \\(\\overline{1}.556\\).",
      },
      practiceSet: [
        { prompt: "\\(\\log 2 + \\log 5\\)?", answer: "\\(1\\)" },
        { prompt: "\\(\\log_{10}8000\\) with \\(\\log 8 = 0.903\\)?", answer: "\\(3.903\\)" },
        { prompt: "\\(\\log_{100}10\\)?", answer: "\\(\\tfrac12\\)" },
        { prompt: "\\(\\log x = 2\\), \\(y = x^{\\log x}\\). \\(\\log y\\)?", answer: "\\(4\\)" },
      ],
      pyqExampleId: "3e2a88c3-3eed-47af-b503-19d4473f90b6", // 2021 (I) — log 31.25
      traps: [
        {
          title: "The bar applies to the characteristic only",
          body:
            "\\(\\overline{1}.9286\\) means \\(-1 + 0.9286 = -0.0714\\), not \\(-1.9286\\). Writing negative logs this way keeps the mantissa positive.",
        },
      ],
    },
  ],
};
