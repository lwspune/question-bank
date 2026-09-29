import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_IN_SIMPLE_NOTE: SubtopicNote = {
  subtopicName: "Simple Interest",
  title: "Simple Interest",
  oneLineDefinition:
    "Simple interest is charged on the original sum only, so it grows by the same amount every year: SI = PRT/100.",
  whyItMatters:
    "Thirteen PYQs, one of them HARD. Everything is SI = PRT/100 read in a different direction: find the sum from extra interest at a higher rate, split a sum so each part earns equally, or settle two debts due at different times by bringing both to today.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdsin-simple",
      name: "SI = PRT/100",
      intuition:
        "The interest each year is the same slice of the original sum, so after \\(T\\) years it is \\(T\\) slices. A change of rate by \\(1\\%\\) for \\(T\\) years changes the interest by \\(\\dfrac{PT}{100}\\), whatever the rate was.",
      definition:
        "- \\(\\text{SI} = \\dfrac{PRT}{100}\\); amount \\(= P + \\text{SI}\\).\n" +
        "- A sum that becomes \\(k\\) times in \\(T\\) years earns \\((k - 1)P\\) in \\(T\\) years, the same every year.\n" +
        "- Rate higher by \\(\\Delta R\\): extra interest \\(= \\dfrac{P\\,\\Delta R\\,T}{100}\\).\n" +
        "- Parts earning equal interest over the same time: \\(P_1R_1 = P_2R_2 = \\cdots\\).\n" +
        "- Present worth of \\(A\\) due in \\(t\\) years: \\(\\dfrac{A}{1 + \\frac{Rt}{100}}\\).",
      formula: {
        label: "Simple interest",
        latex: "\\text{SI} = \\dfrac{PRT}{100}",
      },
      authoredExample: {
        prompt: "At \\(2\\%\\) more a year, a sum earns Rs. \\(90\\) more in \\(3\\) years. Find the sum.",
        steps: ["\\(\\dfrac{P \\times 2 \\times 3}{100} = 90\\)."],
        answer: "Rs. \\(1500\\).",
      },
      selfCheckExample: {
        prompt: "A sum doubles in \\(10\\) years at simple interest. In how many years does it become four times?",
        steps: ["It earns \\(P\\) every \\(10\\) years; four times needs \\(3P\\) of interest."],
        answer: "\\(30\\) years.",
      },
      practiceSet: [
        { prompt: "Rs. \\(4000\\) at \\(5\\%\\) for \\(3\\) years. SI?", answer: "Rs. \\(600\\)" },
        { prompt: "SI is a ninth of the sum; rate \\(=\\) years. Years?", answer: "\\(\\tfrac{10}{3}\\)" },
        { prompt: "Parts at \\(4\\%\\) and \\(6\\%\\) earn equally. Ratio of parts?", answer: "\\(3 : 2\\)" },
        { prompt: "Present worth of Rs. \\(1100\\) due in \\(2\\) years at \\(5\\%\\)?", answer: "Rs. \\(1000\\)" },
      ],
      pyqExampleId: "9ac2aaf8-e8c1-43d1-bf77-3f36e02be196", // 2019 (I) — Rs. 25000 to B and some to C at 7% for 4 years
      traps: [
        {
          title: "Triples means twice the sum in interest",
          body:
            "A sum that triples has earned \\(2P\\), not \\(3P\\). The amount includes the principal; the interest does not.",
        },
      ],
    },
  ],
};
