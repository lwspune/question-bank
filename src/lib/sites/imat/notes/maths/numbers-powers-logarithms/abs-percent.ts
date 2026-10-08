import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_MAT_NPL_ABS_PERCENT_NOTE: SubtopicNote = {
  subtopicName: "Absolute Value, Percentages and Ratios",
  title: "Absolute Value, Percentages and Ratios",
  oneLineDefinition:
    "The absolute value is the distance from zero; a percentage change is a multiplier; a ratio splits a quantity into equal parts.",
  whyItMatters:
    "The 2014 paper asked for an original price from a reduced one, and the 2023 paper asked for a ratio that changes after both parts grow. Absolute value has not been asked on its own, but it appears inside an inequality in 2024 (see Equations and Inequalities).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "imat-npl-absolute-value",
      name: "Absolute value as distance from zero",
      intuition:
        "The absolute value strips the sign: it measures how far a number is from 0 on the number line. That is why \\(|a - b|\\) is the distance between \\(a\\) and \\(b\\), and why an equation like \\(|A| = 7\\) has two solutions, one on each side.",
      definition:
        "- \\(|x| = x\\) if \\(x \\ge 0\\) and \\(|x| = -x\\) if \\(x < 0\\). So \\(|x| \\ge 0\\) always.\n" +
        "- \\(|a - b|\\) is the **distance** between \\(a\\) and \\(b\\) on the number line.\n" +
        "- \\(\\sqrt{x^2} = |x|\\), not \\(x\\).\n" +
        "- \\(|ab| = |a|\\,|b|\\), but in general \\(|a + b| \\le |a| + |b|\\).\n" +
        "- \\(|A| = k\\) with \\(k > 0\\) means \\(A = k\\) or \\(A = -k\\); with \\(k < 0\\) it has no solution.",
      formula: {
        label: "Absolute value",
        latex: "|x| = \\begin{cases} x & x \\ge 0 \\\\ -x & x < 0 \\end{cases}",
      },
      authoredExample: {
        prompt: "(a) Solve \\(|2x - 3| = 7\\). (b) Solve \\(|x + 4| = -2\\). (c) Evaluate \\(|-3| - |5 - 8|\\).",
        steps: [
          "(a) \\(2x - 3 = 7\\) gives \\(x = 5\\); \\(2x - 3 = -7\\) gives \\(x = -2\\).",
          "(b) An absolute value is never negative, so there is no solution.",
          "(c) \\(3 - |{-3}| = 3 - 3 = 0\\).",
        ],
        answer: "(a) \\(x = 5\\) or \\(x = -2\\); (b) no solution; (c) 0",
      },
      selfCheckExample: {
        prompt: "For every real number \\(x\\), the expression \\(\\sqrt{x^2}\\) is equal to:",
        options: ["\\(x\\)", "\\(-x\\)", "\\(|x|\\)", "\\(x^2\\)", "\\(\\frac{1}{x}\\)"],
        steps: [
          "Test \\(x = -3\\): \\(\\sqrt{9} = 3\\), which is \\(|-3|\\) but not \\(-3\\).",
          "The square root sign always means the non-negative root, so the answer must be non-negative for every \\(x\\).",
          "Option A works only for \\(x \\ge 0\\), and B only for \\(x \\le 0\\).",
        ],
        answer: "(C) \\(|x|\\)",
      },
      practiceSet: [
        { prompt: "Evaluate \\(|-7| + |2|\\).", answer: "9" },
        { prompt: "Solve \\(|x - 1| = 4\\).", answer: "\\(x = 5\\) or \\(x = -3\\)" },
        { prompt: "What is the distance between \\(-6\\) and 9 on the number line?", answer: "15", method: "\\(|-6 - 9|\\)" },
        { prompt: "Write \\(|3 - \\pi|\\) without the bars.", answer: "\\(\\pi - 3\\)", method: "\\(3 - \\pi\\) is negative" },
      ],
      traps: [
        {
          title: "Minus x is not always negative",
          body: "\\(|x| = -x\\) is true for every \\(x \\le 0\\): if \\(x = -5\\), then \\(-x = 5\\). An option claiming \\(|x| = -x\\) is impossible is wrong.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-npl-percentages",
      name: "Percentages: change, reverse percentage and successive changes",
      intuition:
        "Increasing by 20% is the same as multiplying by 1.20, and decreasing by 20% is multiplying by 0.80. Thinking in multipliers makes reverse questions a single division and chains of changes a single product.",
      definition:
        "- \\(p\\%\\) of a quantity is \\(\\frac{p}{100}\\) times it.\n" +
        "- A rise of \\(p\\%\\) multiplies by \\(1 + \\frac{p}{100}\\); a fall multiplies by \\(1 - \\frac{p}{100}\\).\n" +
        "- **Reverse percentage**: to find the original, **divide** the new value by the multiplier.\n" +
        "- **Successive changes** multiply: \\(+20\\%\\) then \\(-25\\%\\) is \\(1.20 \\times 0.75 = 0.90\\), a 10% fall overall.\n" +
        "- Percentage change \\(= \\frac{\\text{new} - \\text{old}}{\\text{old}} \\times 100\\%\\). Word problems with percentages are covered in the Logic chapter.",
      formula: {
        label: "Percentage change as a multiplier",
        latex: "\\text{new} = \\text{original} \\times \\left(1 \\pm \\frac{p}{100}\\right)",
        symbols: [
          { symbol: "\\(p\\)", meaning: "the percentage rise (+) or fall (minus)" },
        ],
      },
      authoredExample: {
        prompt: "(a) After a 25% increase a jacket costs €75. What did it cost before? (b) A price rises by 20% and then falls by 25%. What is the overall change?",
        steps: [
          "(a) The multiplier is 1.25, so the original is \\(75 / 1.25 = 60\\).",
          "(b) Overall multiplier: \\(1.20 \\times 0.75 = 0.90\\).",
          "0.90 means the price is 90% of the start: a 10% decrease.",
        ],
        answer: "(a) €60; (b) a 10% decrease",
      },
      selfCheckExample: {
        prompt: "In a sale, a pair of shoes is reduced by 15% and now costs €68. What was the original price?",
        options: ["€78.20", "€80.00", "€83.00", "€57.80", "€10.20"],
        steps: [
          "The sale price is 85% of the original: \\(0.85 \\times \\text{original} = 68\\).",
          "Original \\(= 68 / 0.85 = 80\\).",
          "Option A adds 15% of the sale price, the classic reverse-percentage slip; C adds 15 euros; D takes 15% off again; E is just 15% of 68.",
        ],
        answer: "(B) €80.00",
      },
      practiceSet: [
        { prompt: "What is 30% of 250?", answer: "75" },
        { prompt: "A value goes from 40 to 50. What is the percentage increase?", answer: "25%", method: "\\(\\frac{10}{40}\\)" },
        { prompt: "A price rises by 50% and then falls by 50%. What is the overall change?", answer: "A 25% decrease", method: "\\(1.5 \\times 0.5 = 0.75\\)" },
        { prompt: "After an 8% increase a book costs €54. What did it cost before?", answer: "€50", method: "\\(54 / 1.08\\)" },
      ],
      traps: [
        {
          title: "A rise and a fall of the same percentage do not cancel",
          body: "Up 20% then down 20% gives \\(1.2 \\times 0.8 = 0.96\\): a 4% loss overall. The fall is a percentage of the larger, already-raised value.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-npl-ratios",
      name: "Ratios and sharing in a given ratio",
      intuition:
        "A ratio \\(a : b\\) says the whole is made of \\(a + b\\) equal parts. Call the size of one part \\(k\\); then the amounts are \\(ak\\) and \\(bk\\). Most ratio questions become one linear equation in \\(k\\).",
      definition:
        "- A ratio is unchanged when both parts are multiplied or divided by the same number: \\(45 : 60 = 3 : 4\\).\n" +
        "- **Sharing** a total \\(T\\) in the ratio \\(a : b\\): the parts are \\(\\frac{a}{a+b}T\\) and \\(\\frac{b}{a+b}T\\).\n" +
        "- **Changing ratios**: write the amounts as \\(ak\\) and \\(bk\\), apply the change, and set up an equation with the new ratio.\n" +
        "- Two quantities are in **direct proportion** when their ratio stays fixed (double one, double the other).",
      formula: {
        label: "Sharing in the ratio a : b",
        latex: "\\text{parts} = \\frac{a}{a+b}\\,T \\quad\\text{and}\\quad \\frac{b}{a+b}\\,T",
        symbols: [
          { symbol: "\\(T\\)", meaning: "the total being shared" },
        ],
      },
      authoredExample: {
        prompt: "(a) Share €84 in the ratio 3 : 4. (b) In a class the ratio of boys to girls is 5 : 7, and there are 12 more girls than boys. How many students are there?",
        steps: [
          "(a) 7 parts in total, so one part is \\(84 / 7 = 12\\). The shares are \\(3 \\times 12 = 36\\) and \\(4 \\times 12 = 48\\).",
          "(b) Boys \\(5k\\), girls \\(7k\\). The difference is \\(2k = 12\\), so \\(k = 6\\).",
          "That gives 30 boys and 42 girls: 72 students.",
        ],
        answer: "(a) €36 and €48; (b) 72 students",
      },
      selfCheckExample: {
        prompt: "A jug holds juice and water in the ratio 2 : 3. After 1 litre of juice is added, the ratio of juice to water is 1 : 1. How much water is in the jug?",
        options: ["2 litres", "5 litres", "1.5 litres", "6 litres", "3 litres"],
        steps: [
          "Juice \\(2k\\), water \\(3k\\). After adding juice: \\(2k + 1 = 3k\\), so \\(k = 1\\).",
          "Water \\(= 3k = 3\\) litres (it did not change).",
          "Option A is the original juice; B is the original total.",
        ],
        answer: "(E) 3 litres",
      },
      practiceSet: [
        { prompt: "Simplify the ratio 45 : 60.", answer: "3 : 4" },
        { prompt: "Share 360 g in the ratio 1 : 2 : 3.", answer: "60 g, 120 g, 180 g" },
        { prompt: "3 pens cost €4.50. At the same price each, what do 7 pens cost?", answer: "€10.50" },
        { prompt: "On a map of scale 1 : 50 000, how far is 4 cm in real life?", answer: "2 km", method: "\\(4 \\times 50\\,000 = 200\\,000\\) cm" },
      ],
      traps: [
        {
          title: "Adding the same amount to both parts changes the ratio",
          body: "Adding 1 to each part of \\(2 : 3\\) gives \\(3 : 4\\), a different ratio. Only multiplying or dividing both parts by the same number keeps a ratio.",
        },
      ],
    },
  ],
};
