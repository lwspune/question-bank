import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_IN_COMPOUND_NOTE: SubtopicNote = {
  subtopicName: "Compound Interest",
  title: "Compound Interest",
  oneLineDefinition:
    "Compound interest adds each period's interest to the sum, so the amount is multiplied by (1 + r) every period: A = P(1 + r)ⁿ.",
  whyItMatters:
    "Thirteen PYQs, three of them HARD. Two moves: the amount formula with the rate and number of periods adjusted for half-yearly or quarterly compounding, and growth questions (doubles in 5 years, so four times in 10; more than 100 times needs logarithms).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdsin-compound",
      name: "The amount formula and compounding periods",
      intuition:
        "Each period multiplies the amount by the same factor. Compounding quarterly at \\(12\\%\\) a year uses \\(3\\%\\) a quarter over four times as many periods.",
      definition:
        "- \\(A = P\\left(1 + \\dfrac{r}{100}\\right)^n\\); CI \\(= A - P\\).\n" +
        "- Half-yearly: rate \\(\\dfrac r2\\), periods \\(2n\\). Quarterly: rate \\(\\dfrac r4\\), periods \\(4n\\).\n" +
        "- Interest earned in the second year alone: \\(P \\cdot \\dfrac{r}{100}\\left(1 + \\dfrac r{100}\\right)\\).\n" +
        "- More frequent compounding at the same yearly rate gives slightly more.",
      formula: {
        label: "Compound amount",
        latex: "A = P\\left(1 + \\dfrac{r}{100}\\right)^n",
      },
      authoredExample: {
        prompt: "Find the compound interest on Rs. \\(8000\\) for \\(1\\) year at \\(10\\%\\) a year, compounded half-yearly.",
        steps: ["\\(5\\%\\) for \\(2\\) half-years: \\(8000 \\times 1.05^2 = 8820\\)."],
        answer: "Rs. \\(820\\).",
      },
      selfCheckExample: {
        prompt: "A sum grows at \\(20\\%\\) a year compounded. After \\(2\\) years it is Rs. \\(7200\\). Find the sum.",
        steps: ["\\(P \\times 1.44 = 7200\\)."],
        answer: "Rs. \\(5000\\).",
      },
      practiceSet: [
        { prompt: "Rs. \\(2000\\) at \\(10\\%\\) for \\(2\\) years. CI?", answer: "Rs. \\(420\\)" },
        { prompt: "\\(8\\%\\) a year quarterly. Rate per quarter?", answer: "\\(2\\%\\)" },
        { prompt: "Second-year interest on Rs. \\(1000\\) at \\(10\\%\\)?", answer: "Rs. \\(110\\)" },
        { prompt: "Rs. \\(5000\\) at \\(4\\%\\) quarterly for \\(3\\) months. Amount?", answer: "Rs. \\(5050\\)" },
      ],
      pyqExampleId: "22207e65-0d32-4358-b1c9-e79b18aab946", // 2018 (I) — 25% a year for 3 years to Rs. 10,000
      traps: [
        {
          title: "Adjust both the rate and the periods",
          body:
            "Quarterly compounding at \\(12\\%\\) is \\(3\\%\\) for FOUR periods a year. Using \\(12\\%\\) with four periods, or \\(3\\%\\) for one, gives a wrong amount.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsin-growth",
      name: "Doubling times and growth factors",
      intuition:
        "Under compound interest the sum is multiplied by the same factor over any equal stretch of time. So if it doubles in \\(5\\) years, it doubles again in the next \\(5\\).",
      definition:
        "- Doubles in \\(T\\) years: becomes \\(2^k\\) times in \\(kT\\) years.\n" +
        "- 'More than \\(k\\) times': the least \\(n\\) with \\(\\left(1 + \\tfrac r{100}\\right)^n > k\\); try powers or use logarithms.\n" +
        "- \\(n \\log(1 + r) > \\log k\\) with \\(\\log 1.2 = 2\\log 2 + \\log 3 - 1\\).\n" +
        "- If \\(y\\) is the CI on \\(x\\) and \\(z\\) the CI on \\(y\\) (same rate and time), then \\(y^2 = xz\\).",
      formula: {
        label: "Growth condition",
        latex: "\\left(1 + \\dfrac{r}{100}\\right)^n > k",
      },
      authoredExample: {
        prompt: "A sum trebles in \\(4\\) years at compound interest. In how many years does it become \\(27\\) times?",
        steps: ["\\(27 = 3^3\\): three trebling periods."],
        answer: "\\(12\\) years.",
      },
      selfCheckExample: {
        prompt: "At \\(50\\%\\) compound interest a year, in how many complete years is a sum more than five times itself?",
        steps: ["\\(1.5^3 = 3.375\\), \\(1.5^4 = 5.0625\\)."],
        answer: "\\(4\\) years.",
      },
      practiceSet: [
        { prompt: "Doubles in \\(6\\) years. Eight times in?", answer: "\\(18\\) years" },
        { prompt: "\\(10\\%\\) CI. More than doubled after how many complete years?", answer: "\\(8\\)" },
        { prompt: "\\(\\log 1.2\\) with \\(\\log 2 = 0.301\\), \\(\\log 3 = 0.477\\)?", answer: "\\(0.079\\)" },
        { prompt: "CI on \\(x\\) is \\(40\\); CI on \\(40\\) is \\(16\\). \\(x\\)?", answer: "\\(100\\)" },
      ],
      pyqExampleId: "9bc3c8ac-bb68-434d-8944-f20618c235a5", // 2021 (II) — doubles in 5 years, four times in?
      traps: [
        {
          title: "Four times is two doublings, not four",
          body:
            "A sum that doubles in \\(5\\) years is four times itself after \\(10\\), not \\(20\\). Compound growth multiplies; it does not add.",
        },
      ],
    },
  ],
};
