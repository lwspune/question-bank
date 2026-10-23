import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_PP_PROBLEMS_NOTE: SubtopicNote = {
  subtopicName: "Percentage Word Problems",
  title: "Percentage Word Problems",
  oneLineDefinition:
    "Elections, exam marks, savings and mixed groups: long stories that reduce to a chain of percentages or a weighted average.",
  whyItMatters:
    "43 questions in the bank, 29 of them MODERATE, and elections alone account for 15. The stems are long but the arithmetic is short once you see the chain. Reading carefully which total each percentage is taken of is where these marks are won or lost.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscppwp-election",
      name: "Elections: voters, votes cast, valid votes and the margin",
      intuition:
        "An election question is a chain of shares: the voter list, then the people who voted, then the valid votes, then each candidate's share. With two candidates every valid vote goes to one of them, so the winning margin is the gap between their two shares.",
      definition:
        "- Valid votes \\(=\\) voters on the list \\(\\times\\) share who voted \\(\\times\\) share of votes that were valid.\n" +
        "- With two candidates, if the winner gets w% of the valid votes, the loser gets \\((100 - w)\\%\\) and the margin is \\((2w - 100)\\%\\) of the valid votes.\n" +
        "- Invalid votes given as a **number** are subtracted from votes cast; given as a **percentage**, they are a factor.\n" +
        "- **Fast route:** go from the number you are given (a margin, a candidate's votes) to the valid votes first, then divide back up the chain one factor at a time.",
      formula: {
        label: "Margin and valid votes",
        latex: "\\text{margin} = (2w - 100)\\% \\text{ of valid votes} \\qquad \\text{valid} = N \\times \\frac{p}{100} \\times \\frac{q}{100}",
        symbols: [
          { symbol: "w", meaning: "winner's share of the valid votes, in per cent" },
          { symbol: "N", meaning: "voters on the list" },
          { symbol: "p", meaning: "percentage of voters who voted" },
          { symbol: "q", meaning: "percentage of votes cast that were valid" },
        ],
      },
      authoredExample: {
        prompt:
          "In an election between two candidates, 75% of the 40,000 voters on the list voted and 4% of the votes cast were invalid. The winner got 55% of the valid votes. By how many votes did he win?",
        steps: [
          "Votes cast \\(= 0.75 \\times 40000 = 30000\\).",
          "Valid votes \\(= 0.96 \\times 30000 = 28800\\).",
          "Margin \\(= (55 - 45)\\% = 10\\%\\) of 28,800, which is 2,880.",
        ],
        answer: "2,880 votes",
      },
      selfCheckExample: {
        prompt: "Two candidates fought an election and every vote was valid. The winner got 62% of the votes and won by 1,200 votes. How many votes were cast?",
        steps: ["Margin \\(= 62\\% - 38\\% = 24\\%\\) of the votes.", "\\(24\\%\\) is 1,200, so the total is \\(\\frac{1200}{0.24} = 5000\\)."],
        answer: "5,000",
      },
      practiceSet: [
        {
          prompt: "In a two-candidate election the loser got 35% of the valid votes. The winner's margin is what percentage of the valid votes?",
          answer: "30%",
        },
        {
          prompt: "A candidate got 60% of the valid votes, which was 9,000 votes, and 25% of the votes cast were invalid. How many votes were cast?",
          answer: "20,000 (valid votes are 15,000)",
        },
        { prompt: "Of 50,000 voters on a list, 80% voted and 2,000 votes were invalid. How many valid votes were there?", answer: "38,000" },
      ],
      pyqExampleId: "acc2712d-a1ce-4660-b89b-b6c0a1f589c6",
      traps: [
        {
          title: "Taking the winner's share as the margin",
          body: "If the winner gets 56% of the valid votes, the margin is \\(56 - 44 = 12\\%\\) of them, not 56%.",
        },
        {
          title: "Taking invalid votes out of the whole list",
          body:
            "'10% of the votes cast were invalid' is 10% of the people who voted, not of everyone on the list. Apply the turnout factor first, then the invalid share.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscppwp-exam",
      name: "Pass marks and marks scored",
      intuition:
        "The pass mark is a fixed percentage of the maximum marks. A student who 'fails by 14' is 14 below it; one who scores '20 more than the pass mark' is 20 above it. Either way the pass mark is the bridge to the maximum.",
      definition:
        "- Pass mark \\(= \\frac{p}{100} \\times\\) maximum marks.\n" +
        "- Score \\(+\\) shortfall \\(=\\) pass mark \\(=\\) score \\(-\\) surplus.\n" +
        "- Two students on the same paper: write each one's pass-mark expression and set them equal; solve for the maximum.\n" +
        "- Overall percentage over several papers \\(= \\frac{\\text{total marks}}{\\text{total maximum}} \\times 100\\). It equals the simple average of the percentages only when every paper has the same maximum.",
      formula: {
        label: "Pass mark",
        latex: "\\frac{p}{100} \\times M = \\text{score} + \\text{shortfall}",
      },
      authoredExample: {
        prompt: "The pass mark in a test is 40%. A student scores 150 and fails by 30 marks. Find the maximum marks.",
        steps: ["Pass mark \\(= 150 + 30 = 180\\).", "\\(40\\%\\) of M is 180, so \\(M = \\frac{180 \\times 100}{40} = 450\\)."],
        answer: "450",
      },
      selfCheckExample: {
        prompt: "Anil scores 30% and fails by 15 marks. Bina scores 45% on the same paper and passes by 30 marks. Find the maximum marks.",
        steps: [
          "Pass mark \\(= 0.30M + 15 = 0.45M - 30\\).",
          "\\(0.15M = 45\\), so \\(M = 300\\). Check: pass mark is 105 for both.",
        ],
        answer: "300",
      },
      practiceSet: [
        { prompt: "A student needs 33% to pass a 600-mark paper. What is the pass mark?", answer: "198" },
        {
          prompt: "Ravi scores 72 out of 120 in one paper and 54 out of 80 in another. What is his overall percentage?",
          answer: "63% (126 out of 200)",
        },
        { prompt: "To pass, Meena needs 45% of 400 marks. She has 160. How many more marks does she need?", answer: "20" },
      ],
      pyqExampleId: "5591aac2-c522-4d25-9e4e-e7c6d8ad44cd",
      traps: [
        {
          title: "Subtracting the shortfall",
          body: "'Failed by 30 marks' means the pass mark is 30 above the score. Add the shortfall to the score; do not take it away.",
        },
        {
          title: "Averaging percentages from papers of different sizes",
          body:
            "80% on a 50-mark paper and 60% on a 150-mark paper is 40 + 90 = 130 out of 200, which is 65%, not the 70% a simple average gives.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscppwp-savings",
      name: "Income, expenditure and savings",
      intuition:
        "Income splits into expenditure and savings. When income and expenditure change by different percentages, the savings change by a third, often much larger, percentage, because savings are the small piece left over.",
      definition:
        "- Savings \\(=\\) income \\(-\\) expenditure, before and after the change.\n" +
        "- Percentage change in savings \\(= \\frac{\\text{new savings} - \\text{old savings}}{\\text{old savings}} \\times 100\\).\n" +
        "- **Fast route:** take income as 100. If expenditure is E and savings are S \\(= 100 - E\\), a rise of i% in income and e% in expenditure changes savings by \\(s = \\frac{100\\,i - E\\,e}{S}\\) per cent.\n" +
        "- If income rises and expenditure stays the same, the whole rise goes into savings.\n" +
        "- 'Spending is 40% more than savings' means spending \\(= 1.4 \\times\\) savings, so income \\(= 2.4 \\times\\) savings.",
      formula: {
        label: "Savings and their change",
        latex: "\\text{income} = \\text{expenditure} + \\text{savings} \\qquad s = \\frac{100\\,i - E\\,e}{S}",
        symbols: [
          { symbol: "i, e, s", meaning: "percentage changes in income, expenditure and savings" },
          { symbol: "E, S", meaning: "expenditure and savings when income is 100" },
        ],
      },
      authoredExample: {
        prompt: "Ritu earns ₹50,000 a month and spends ₹40,000. Her income rises by 10% and her spending by 5%. By what percentage do her savings rise?",
        steps: [
          "Old savings \\(= 50000 - 40000 = 10000\\).",
          "New income \\(= 55000\\), new spending \\(= 42000\\), new savings \\(= 13000\\).",
          "Rise \\(= \\frac{3000}{10000} \\times 100 = 30\\%\\). Fast route: E = 80, S = 20, so \\(s = \\frac{1000 - 400}{20} = 30\\).",
        ],
        answer: "30%",
      },
      selfCheckExample: {
        prompt: "A man saves 20% of his income. His income rises by 15% and his spending by 10%. Find the percentage rise in his savings.",
        steps: [
          "Income 100: spending 80, savings 20.",
          "New income 115, new spending 88, new savings 27.",
          "Rise \\(= \\frac{7}{20} \\times 100 = 35\\%\\).",
        ],
        answer: "35%",
      },
      practiceSet: [
        {
          prompt: "Income is ₹30,000 and spending is ₹24,000. Income rises by 10% and spending stays the same. By what percentage do savings rise?",
          answer: "50%",
        },
        { prompt: "A person's spending is 60% more than his savings, and his income is ₹52,000. Find his savings.", answer: "₹20,000" },
        {
          prompt: "A person spends 70% of her income. Her income falls by 10% and her spending stays the same. By what percentage do her savings fall?",
          answer: "\\(33\\frac{1}{3}\\%\\) (savings go from 30 to 20)",
        },
      ],
      pyqExampleId: "ce391bfb-b667-4d08-8ab0-5762f31d16ca",
      traps: [
        {
          title: "Averaging the two changes",
          body:
            "Income up 20% and spending up 12% does not make savings rise by anything in between. Savings are what is left, so work out old and new savings and compare those.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscppwp-weighted",
      name: "Combined percentage of several groups",
      intuition:
        "When a whole is made of groups (men and women, two incomes, budget heads), the percentage for the whole is a weighted average: each group's percentage counts in proportion to the group's size.",
      definition:
        "- Overall per cent \\(= \\frac{A \\cdot a + B \\cdot b}{A + B}\\), where A and B are the group sizes and a and b their percentages.\n" +
        "- The overall figure always lies between the group figures, nearer the bigger group.\n" +
        "- **Alligation:** the group sizes are in the ratio of the opposite gaps, \\(A : B = (b - \\text{overall}) : (\\text{overall} - a)\\).\n" +
        "- For a budget in a ratio (2 : 4 : 4), give each head its ratio number, apply its own change, and add up.",
      formula: {
        label: "Weighted percentage and alligation",
        latex: "\\text{overall} = \\frac{A\\,a + B\\,b}{A + B} \\qquad A : B = (b - \\text{overall}) : (\\text{overall} - a)",
      },
      authoredExample: {
        prompt: "A class has 40 boys and 60 girls. 30% of the boys and 50% of the girls wear glasses. What percentage of the class wears glasses?",
        steps: ["Boys with glasses: 12. Girls with glasses: 30.", "\\(\\frac{12 + 30}{100} \\times 100 = 42\\%\\)."],
        answer: "42%",
      },
      selfCheckExample: {
        prompt: "The sales of two shops rose by 10% and 20%, and their total sales rose by 14%. Find the ratio of their sales before the rise.",
        steps: ["Gaps from 14: \\(20 - 14 = 6\\) and \\(14 - 10 = 4\\).", "First : second \\(= 6 : 4 = 3 : 2\\)."],
        answer: "3 : 2",
      },
      practiceSet: [
        {
          prompt: "A town has 20,000 people. The number of men grows by 4% and of women by 6%, and the total grows by 1,000. How many men were there?",
          answer: "10,000",
        },
        {
          prompt: "A family spends on rent and food in the ratio 3 : 2. Rent rises by 10% and food falls by 10%. What is the change in their total spending?",
          answer: "A 2% rise",
        },
        {
          prompt: "Two people pay tax at 10% on ₹4 lakh and at 20% on ₹6 lakh. What is the overall tax rate on their combined income?",
          answer: "16%",
        },
      ],
      pyqExampleId: "22d674be-5436-4a2e-81ce-6853a22bfb47",
      traps: [
        {
          title: "Taking a plain average of the rates",
          body:
            "30% of 40 boys and 50% of 60 girls is 42% of the class, not 40%. Weight each percentage by the size of its group.",
        },
      ],
    },
  ],
};
