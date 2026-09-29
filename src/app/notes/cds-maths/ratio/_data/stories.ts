import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_RA_STORIES_NOTE: SubtopicNote = {
  subtopicName: "Ratios in Income, Savings and Ages",
  title: "Ratios in Income, Savings and Ages",
  oneLineDefinition:
    "Write each quantity as a multiple of an unknown, apply the change the story describes, and solve the ratio that results.",
  whyItMatters:
    "Ten PYQs. Incomes and expenditures, ages then and now, fares before and after a rise: each is two ratios linked by a fixed difference or a fixed change. The data-sufficiency versions test whether the ratios alone can give an absolute amount — they cannot.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdsra-income-expenditure",
      name: "Income, expenditure and savings",
      intuition:
        "Savings = income − expenditure. Write the incomes as \\(pk, qk\\) and the expenditures as \\(rm, sm\\); a condition on savings then links \\(k\\) and \\(m\\).",
      definition:
        "- Income \\(-\\) expenditure \\(=\\) saving, for each person.\n" +
        "- Equal savings: \\(pk - rm = qk - sm\\). Given savings \\(S\\): substitute and solve.\n" +
        "- Ratios alone fix only proportions; an absolute amount needs at least one rupee figure.\n" +
        "- Percentage changes: multiply each term of the ratio by its own factor (\\(1.2\\), \\(1.3\\)).\n" +
        "- Combining groups: find the actual counts in each group before adding.",
      formula: {
        label: "Savings",
        latex: "\\text{saving} = \\text{income} - \\text{expenditure}",
      },
      authoredExample: {
        prompt: "The incomes of A and B are in the ratio \\(5 : 4\\) and their expenditures \\(3 : 2\\). Each saves Rs. 1,600. Find A's income.",
        steps: [
          "Incomes \\(5x\\), \\(4x\\); expenditures \\(5x - 1600\\), \\(4x - 1600\\).",
          "\\(\\dfrac{5x - 1600}{4x - 1600} = \\dfrac32\\) gives \\(10x - 3200 = 12x - 4800\\), so \\(x = 800\\).",
        ],
        answer: "Rs. \\(4{,}000\\).",
      },
      selfCheckExample: {
        prompt: "Fares are in the ratio \\(5 : 6\\). The first rises by \\(20\\%\\), the second by \\(25\\%\\). New ratio?",
        steps: ["\\(5\\times 1.2 : 6\\times 1.25 = 6 : 7.5\\)."],
        answer: "\\(4 : 5\\).",
      },
      practiceSet: [
        { prompt: "Incomes \\(3 : 2\\), savings equal to Rs. 500, expenditures \\(5 : 3\\). Smaller income?", answer: "Rs. \\(2{,}000\\)" },
        { prompt: "Can two ratios alone give an income in rupees?", answer: "No" },
        { prompt: "Boys : girls \\(= 3 : 2\\) in a class of \\(40\\). Girls?", answer: "\\(16\\)" },
        { prompt: "Ratio \\(2 : 3\\), both terms up \\(10\\%\\). New ratio?", answer: "\\(2 : 3\\)" },
      ],
      pyqExampleId: "a747053a-6183-4405-b721-1e37d46e4aee", // 2019 (I) — incomes 4 : 3, each saves Rs. 600
      traps: [
        {
          title: "Two ratios do not decide who saves more",
          body:
            "Incomes \\(1 : 2\\) and expenses \\(1 : 3\\) are consistent with either person saving more, depending on the actual amounts. Try two cases before choosing.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsra-ages",
      name: "Ages in a ratio",
      intuition:
        "The difference between two people's ages never changes. So a ratio now and a ratio \\(t\\) years ago (or later) give two equations in the two present ages.",
      definition:
        "- Present ages \\(M\\), \\(D\\); \\(t\\) years ago: \\(M - t\\), \\(D - t\\); \\(t\\) years later: \\(M + t\\), \\(D + t\\).\n" +
        "- The age difference is constant: if present ages are \\(4t\\) and \\(5t\\), the difference is \\(t\\).\n" +
        "- A ratio of sum to difference: \\(\\dfrac{F + S}{F - S} = \\dfrac pq\\) fixes \\(F : S\\).\n" +
        "- Whole-number ages restrict the possible values.",
      formula: {
        label: "Ages then and now",
        latex: "\\dfrac{M - t}{D - t} = \\dfrac pq",
      },
      authoredExample: {
        prompt: "Five years ago a father was four times as old as his son; five years from now he will be twice as old. Find their present ages.",
        steps: [
          "\\(F - 5 = 4(S - 5)\\) and \\(F + 5 = 2(S + 5)\\).",
          "So \\(F = 4S - 15\\) and \\(F = 2S + 5\\): \\(2S = 20\\), \\(S = 10\\), \\(F = 25\\).",
        ],
        answer: "\\(25\\) and \\(10\\).",
      },
      selfCheckExample: {
        prompt: "The sum and difference of two ages are in the ratio \\(5 : 1\\). Find the ratio of the ages.",
        steps: ["\\(F + S = 5(F - S)\\) gives \\(4F = 6S\\)."],
        answer: "\\(3 : 2\\).",
      },
      practiceSet: [
        { prompt: "Ages \\(3 : 5\\), difference \\(8\\). Younger age?", answer: "\\(12\\)" },
        { prompt: "Ages \\(40\\) and \\(10\\). Ratio in \\(5\\) years?", answer: "\\(3 : 1\\)" },
        { prompt: "Does an age difference change with time?", answer: "No" },
        { prompt: "Ages \\(2 : 3\\) now, \\(3 : 4\\) in \\(5\\) years. Present ages?", answer: "\\(10\\) and \\(15\\)" },
      ],
      pyqExampleId: "0942fbda-9244-4474-ac6a-7b2fdcb61699", // 2018 (II) — mother and daughter, 3 : 1 then 13 : 7
      traps: [
        {
          title: "Shift both ages",
          body:
            "Ten years ago BOTH were ten years younger. Subtracting from only one age turns a correct setup into a wrong answer that is often printed.",
        },
      ],
    },
  ],
};
