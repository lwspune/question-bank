import type { SubtopicNote } from "@/app/notes/_types";

export const UNKNOWNS_STAT_NOTE: SubtopicNote = {
  subtopicName: "Finding Unknown Observations",
  title: "Finding Unknown Observations",
  oneLineDefinition:
    "Recovering missing observations from a given mean and variance: two unknowns give their sum and the sum of their squares, and a part of the data is found by subtracting known totals.",
  whyItMatters:
    "Nineteen PYQs, fourteen of them multiple choice, and three from 2026. Fourteen give a data set with unknown values, usually a pair a and b, and ask for them or for something built from them; five split the data into a known part and the rest — the first four of five, the values left after removing some, or the last value. Two ideas cover the page.",
  concepts: [
    // C1 — two unknowns from mean and variance
    {
      kind: "formula" as const,
      slug: "jstat-pair",
      name: "Two unknowns from the mean and variance",
      intuition:
        "The mean fixes \\(\\sum x_i\\), so it gives \\(a+b\\). The variance fixes \\(\\sum x_i^2\\), so it gives \\(a^2+b^2\\). From these two, \\(ab\\) and \\(a-b\\) follow at once. Many questions ask for \\(ab\\), \\(|a-b|\\) or \\(a+b+ab\\), so you often never need \\(a\\) and \\(b\\) one by one.",
      definition:
        "- Mean: \\(a+b=n\\bar x-(\\text{sum of known values})\\).\n" +
        "- Variance: \\(a^2+b^2=n(\\sigma^2+\\bar x^2)-(\\text{sum of known squares})\\).\n" +
        "- \\(ab=\\frac{(a+b)^2-(a^2+b^2)}{2}\\).\n" +
        "- \\((a-b)^2=2(a^2+b^2)-(a+b)^2\\); the order (\\(a>b\\)) picks the sign.",
      formula: {
        label: "The pair from its sum and sum of squares",
        latex: "(a-b)^2=2\\left(a^2+b^2\\right)-(a+b)^2",
      },
      authoredExample: {
        prompt: "The mean and variance of \\(3,5,a,b,9\\) are 6 and 4, with \\(a>b\\). Find \\(a\\) and \\(b\\).",
        steps: [
          "\\(\\sum x=30\\), so \\(a+b=30-17=13\\).",
          "\\(\\sum x^2=5(4+36)=200\\); the known squares sum to \\(115\\), so \\(a^2+b^2=85\\).",
          "\\((a-b)^2=170-169=1\\), so \\(a-b=1\\).",
        ],
        answer: "\\(a=7\\), \\(b=6\\).",
      },
      selfCheckExample: {
        prompt: "The numbers \\(2,6,x,y\\) have mean 5 and variance 5. Find \\(xy\\).",
        steps: [
          "\\(x+y=20-8=12\\).",
          "\\(\\sum x^2=4(5+25)=120\\), so \\(x^2+y^2=120-40=80\\).",
          "\\(xy=\\frac{144-80}{2}\\).",
        ],
        answer: "\\(32\\).",
      },
      practiceSet: [
        { prompt: "\\(a+b=10\\), \\(a^2+b^2=58\\): \\(ab\\)?", answer: "\\(21\\)" },
        { prompt: "Same pair: \\(|a-b|\\)?", answer: "\\(4\\)" },
        { prompt: "\\(1,3,a,b\\) have mean 4: \\(a+b\\)?", answer: "\\(12\\)" },
        { prompt: "Five values, mean 3, variance 2: \\(\\sum x^2\\)?", answer: "\\(55\\)" },
      ],
      pyqExampleId: "7a086c92-94ab-42ec-8c8c-570a5c9c9294", // 2026 — alpha, beta from mean 8 and variance 16, then a quadratic
      traps: [
        {
          title: "Keep the square of the mean",
          body: "The variance gives \\(\\sum x_i^2=n(\\sigma^2+\\bar x^2)\\), not \\(n\\sigma^2\\). Dropping the \\(\\bar x^2\\) term gives an \\(a^2+b^2\\) that is too small, often negative.",
        },
      ],
    },

    // C2 — a part of the data
    {
      kind: "formula" as const,
      slug: "jstat-part",
      name: "A part of the data",
      intuition:
        "Totals add. The whole data has a \\(\\sum x\\) and a \\(\\sum x^2\\); a part of it takes away its own share of each. So find the two totals of the whole, subtract the known part, and work out the mean and variance of what is left with its own count. The same step run backwards finds the last value, or even the count \\(n\\).",
      definition:
        "- Whole: \\(\\sum x=n\\bar x\\), \\(\\sum x^2=n(\\sigma^2+\\bar x^2)\\).\n" +
        "- The rest: subtract the known part's \\(\\sum x\\) and \\(\\sum x^2\\).\n" +
        "- Mean and variance of the rest use its own count \\(m\\).",
      formula: {
        label: "Totals of the whole",
        latex: "\\sum x_i=n\\bar x,\\qquad \\sum x_i^2=n\\left(\\sigma^2+\\bar x^2\\right)",
      },
      authoredExample: {
        prompt: "Six observations have mean 5 and variance 4. The value 9 is removed. Find the mean and variance of the other five.",
        steps: [
          "\\(\\sum x=30\\), \\(\\sum x^2=6(4+25)=174\\).",
          "Without 9: \\(\\sum x=21\\), \\(\\sum x^2=174-81=93\\).",
          "Mean \\(\\frac{21}{5}=4.2\\); variance \\(\\frac{93}{5}-4.2^2=18.6-17.64=0.96\\).",
        ],
        answer: "Mean \\(4.2\\), variance \\(0.96\\).",
      },
      selfCheckExample: {
        prompt: "Five observations have mean 6 and variance 8. The first four have mean 5. Find the fifth value and the variance of the first four.",
        steps: [
          "\\(\\sum x=30\\) and the first four sum to \\(20\\), so the fifth is \\(10\\).",
          "\\(\\sum x^2=5(8+36)=220\\); the first four have \\(\\sum x^2=220-100=120\\).",
          "Their variance is \\(\\frac{120}{4}-5^2\\).",
        ],
        answer: "The fifth value is \\(10\\); the variance is \\(5\\).",
      },
      practiceSet: [
        { prompt: "Five values have mean 10; four of them sum to 38. The fifth?", answer: "\\(12\\)" },
        { prompt: "Four values, mean 3, variance 2: \\(\\sum x^2\\)?", answer: "\\(44\\)" },
        { prompt: "Remove 0 from \\(0,2,4\\): the new mean?", answer: "\\(3\\)" },
        { prompt: "Remove a value equal to the mean: does the mean change?", answer: "No; the variance rises (unless it is 0)" },
      ],
      pyqExampleId: "e5cddacb-d049-4cc8-ab88-93b161a41378", // 2026 — n from the sums of the first n - 1 values
      traps: [
        {
          title: "Divide by the new count",
          body: "After removing values, the mean and variance of the rest use the new count \\(m\\), not \\(n\\). Only the totals carry over.",
        },
      ],
    },
  ],
};
