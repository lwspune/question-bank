import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_LG_DIGITS_NOTE: SubtopicNote = {
  subtopicName: "Number of Digits and Characteristic",
  title: "Counting Digits with Logarithms",
  oneLineDefinition:
    "A number whose common logarithm has integer part k has k + 1 digits before the decimal point.",
  whyItMatters:
    "Ten PYQs, one of them HARD. Take the log of the power, keep the integer part, add one. The mirror-image question — how many zeros after the decimal point in (0.5)¹⁰⁰⁰ — uses the same log and reads it the other way.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdslg-digits",
      name: "Digits and leading zeros",
      intuition:
        "Every number from \\(10^k\\) up to just below \\(10^{k+1}\\) has \\(k + 1\\) digits, and its log lies between \\(k\\) and \\(k + 1\\). So the integer part of the log counts the digits, less one.",
      definition:
        "- \\(N \\ge 1\\): digits \\(= \\lfloor\\log_{10}N\\rfloor + 1\\).\n" +
        "- \\(N < 1\\): if \\(\\log_{10}N = -m.f\\) (so \\(N = 10^{1 - 0.f} \\times 10^{-(m+1)}\\)), the first significant digit is in place \\(m + 1\\), after \\(m\\) zeros.\n" +
        "- Write the base in primes first: \\(108 = 2^2 \\cdot 3^3\\), \\(125^{100} = 5^{300} = \\dfrac{10^{300}}{2^{300}}\\).\n" +
        "- A number between \\(100\\) and \\(1000\\) has log between \\(2\\) and \\(3\\); a positive number below \\(1\\) has a negative log.",
      formula: {
        label: "Number of digits",
        latex: "\\lfloor \\log_{10} N \\rfloor + 1",
      },
      authoredExample: {
        prompt: "How many digits has \\(2^{50}\\)? (\\(\\log 2 = 0.301\\))",
        steps: ["\\(50 \\times 0.301 = 15.05\\)."],
        answer: "\\(16\\).",
      },
      selfCheckExample: {
        prompt: "How many zeros follow the decimal point before the first significant digit of \\((0.2)^{10}\\)? (\\(\\log 2 = 0.301\\))",
        steps: ["\\(10(\\log 2 - 1) = -6.99\\), so \\((0.2)^{10} \\approx 1.02 \\times 10^{-7}\\)."],
        answer: "\\(6\\).",
      },
      practiceSet: [
        { prompt: "\\(\\log N = 7.4\\). Digits?", answer: "\\(8\\)" },
        { prompt: "\\(3^{20}\\) with \\(\\log 3 = 0.477\\). Digits?", answer: "\\(10\\)" },
        { prompt: "\\(5^{10}\\) with \\(\\log 2 = 0.301\\). Digits?", answer: "\\(7\\)" },
        { prompt: "\\(\\log N = -3.2\\). Zeros after the point?", answer: "\\(3\\)" },
      ],
      pyqExampleId: "f8b5344f-f403-4fe8-8732-541e58f5742d", // 2017 (I) — digits in 2^40
      traps: [
        {
          title: "Add one",
          body:
            "\\(\\log_{10}2^{40} = 12.04\\), so \\(2^{40}\\) has \\(13\\) digits, not \\(12\\). The characteristic is one less than the digit count.",
        },
        {
          title: "Zeros after the point: use the next power down",
          body:
            "\\(\\log N = -17.47\\) means \\(N = 10^{0.53} \\times 10^{-18}\\): the first significant digit is in the 18th place, after \\(17\\) zeros. Reading \\(-17.47\\) as '18 zeros' is the slip.",
        },
      ],
    },
  ],
};
