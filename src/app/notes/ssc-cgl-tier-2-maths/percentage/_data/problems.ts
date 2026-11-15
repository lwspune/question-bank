import type { SubtopicNote } from "@/app/notes/_types";

export const SSC2_PP_PROBLEMS_NOTE: SubtopicNote = {
  subtopicName: "Percentage Word Problems",
  title: "Percentage Word Problems",
  oneLineDefinition:
    "Income, expenditure and savings, spending taken out in parts, and elections or mixed groups: each becomes a short sum once you fix the whole as 100 and track each part.",
  whyItMatters:
    "12 questions in the Tier II bank, 8 EASY and 4 MODERATE. Most are about a salary and what is saved from it, which is where Tier II puts its longest percentage stems.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssc2pppr-savings",
      name: "Income, expenditure and savings",
      intuition:
        "Income splits into two parts, what is spent and what is saved. Take the income as 100, or split it in the ratio the stem gives, and every change in the stem becomes a small sum on three numbers.",
      definition:
        "- Income \\(=\\) expenditure \\(+\\) savings, before and after any change.\n" +
        "- Apply each change to its own part, then add the parts again.\n" +
        "- The change in income is the average of the changes in expenditure and savings, **weighted by their shares** of the old income.\n" +
        "- A percentage change in savings is measured from the OLD savings.",
      formula: {
        label: "The savings line and the weighted change",
        latex: "I = E + S, \\quad \\Delta I\\% = \\frac{E}{I}\\,\\Delta E\\% + \\frac{S}{I}\\,\\Delta S\\%",
        symbols: [
          { symbol: "I, E, S", meaning: "income, expenditure and savings before the change" },
          { symbol: "\\(\\Delta\\)", meaning: "the percentage change in each" },
        ],
      },
      authoredExample: {
        prompt: "Neha saves 25% of her income. Her income rises by 20% and her expenditure rises by 10%. By what percentage do her savings rise?",
        steps: [
          "Take income 100: expenditure 75, savings 25.",
          "New income 120, new expenditure 82.5, so new savings 37.5.",
          "Savings rise by \\(\\frac{12.5}{25} \\times 100 = 50\\%\\).",
        ],
        answer: "50%",
      },
      selfCheckExample: {
        prompt: "A man spends 60% of his income. His expenditure rises by 15% and his savings rise by 5%. By what percentage does his income rise?",
        steps: ["Weighted change \\(= 0.6 \\times 15 + 0.4 \\times 5 = 9 + 2 = 11\\%\\).", "Check: expenditure 60 to 69, savings 40 to 42, income 100 to 111."],
        answer: "11%",
      },
      practiceSet: [
        { prompt: "Ravi earns ₹48,000 a month and saves 15% of it. Find his monthly expenditure.", answer: "₹40,800" },
        { prompt: "A woman's expenditure is 4 times her savings. What percentage of her income does she save?", answer: "20%" },
        { prompt: "A man's income and expenditure both rise by 10%. By what percentage do his savings change?", answer: "They rise by 10%", method: "Every part is multiplied by 1.1." },
      ],
      pyqExampleId: "d5346f94-44df-47fa-a612-479e95fe6d01",
      traps: [
        {
          title: "Measuring the savings change from the new savings",
          body: "Savings that go from 25 to 30 have risen by \\(\\frac{5}{25} = 20\\%\\), not \\(\\frac{5}{30}\\). The base is the old value.",
        },
        {
          title: "Giving the savings the income's change",
          body: "When income and expenditure rise by different percentages, savings rise by neither of them. Work out all three numbers.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2pppr-shares",
      name: "Spending taken out in parts",
      intuition:
        "Some stems take one percentage of the whole income and the next one of what is left. Keep track of what is left after each step, as a percentage of the whole, and the savings fall out at the end.",
      definition:
        "- '\\(r\\%\\) of the remaining' is a share of what is left, not of the income. After 40% is spent, '25% of the rest' is 25% of 60%, which is 15% of the income.\n" +
        "- Turn every part into a percentage of the income; savings are 100% minus all the parts.\n" +
        "- 'E was 20% of P' is a share of P, so E is a share of the income only through P.\n" +
        "- Once one rupee amount is known, the income is that amount divided by its share.",
      formula: {
        label: "What is left after two steps",
        latex: "\\text{left} = \\left(1 - \\tfrac{a}{100}\\right)\\left(1 - \\tfrac{b}{100}\\right) \\text{ of the whole}",
      },
      authoredExample: {
        prompt: "Sunil spends 40% of his income on rent and 25% of the remaining income on food. He saves the rest, which is ₹18,000. Find his income.",
        steps: [
          "After rent, 60% of the income is left. Food takes 25% of that, which is 15% of the income.",
          "Savings \\(= 60\\% - 15\\% = 45\\%\\) of the income.",
          "Income \\(= 18000 \\div 0.45 = 40000\\).",
        ],
        answer: "₹40,000",
      },
      selfCheckExample: {
        prompt: "A family spends 30% of its income on food and 20% of the remainder on travel, and saves ₹16,800. Find its income.",
        steps: ["After food, 70% is left; travel takes 20% of it, which is 14%.", "Savings are 56%, so income \\(= 16800 \\div 0.56 = 30000\\)."],
        answer: "₹30,000",
      },
      practiceSet: [
        { prompt: "A man spends 50% of his money, then 50% of the rest, and has ₹2,000 left. How much did he start with?", answer: "₹8,000" },
        { prompt: "A salary is ₹60,000. Rent is 25% of the salary and travel is 10% of the rent. Find the travel spend.", answer: "₹1,500" },
        { prompt: "A woman gives 20% of her money to her son and 25% of the rest to her daughter. What percentage of her money is left?", answer: "60%", method: "\\(0.8 \\times 0.75\\)" },
      ],
      pyqExampleId: "cf26e5ce-66c0-4c46-8cf4-5cf08fe8d3a8",
      traps: [
        {
          title: "Taking 'of the remaining' from the whole",
          body: "Spending 20% and then '30% of the remaining' leaves \\(0.8 \\times 0.7 = 56\\%\\), not \\(100 - 20 - 30 = 50\\%\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2pppr-groups",
      name: "Elections and mixed groups",
      intuition:
        "In a two-candidate election, the winner's share minus the loser's share is the winning margin. In a mixed group, such as two schools or boys and girls, turn each percentage into a count and add the counts before you take a percentage of the whole.",
      definition:
        "- Two candidates, all votes valid: the winner gets \\(w\\%\\), the loser \\((100 - w)\\%\\), and the margin is \\((2w - 100)\\%\\) of the votes.\n" +
        "- Invalid votes come off first. Shares are of the VALID votes unless the stem says otherwise.\n" +
        "- For groups, take one group as 100 (or its real size), change each percentage to a count, add, and only then divide by the total.\n" +
        "- '150% more students than X' means \\(X \\times 2.5\\), not \\(X \\times 1.5\\).",
      formula: {
        label: "Winning margin in a two-way contest",
        latex: "\\text{margin} = (2w - 100)\\% \\text{ of the valid votes}",
      },
      authoredExample: {
        prompt: "In an election between two candidates, all votes are valid. The winner gets 58% of the votes and wins by 1,200 votes. Find the total number of votes.",
        steps: ["The loser gets 42%, so the margin is 16% of the votes.", "Total \\(= 1200 \\div 0.16 = 7500\\)."],
        answer: "7,500",
      },
      selfCheckExample: {
        prompt: "Of 8,000 votes polled, 10% are invalid. In a two-way contest the winner gets 55% of the valid votes. Find the winning margin.",
        steps: ["Valid votes \\(= 7200\\).", "Margin \\(= (110 - 100)\\% = 10\\%\\) of 7200 \\(= 720\\)."],
        answer: "720 votes",
      },
      practiceSet: [
        { prompt: "School A sends 200 students, of whom 90% pass. School B sends 300, of whom 80% pass. What percentage passed in all?", answer: "84%", method: "\\(\\frac{180 + 240}{500}\\)" },
        { prompt: "In a two-way contest the winner gets 70% of 2,500 valid votes. Find the margin.", answer: "1,000 votes" },
        { prompt: "In a class, 40% are girls. 25% of the girls and 50% of the boys play chess. What percentage of the class plays chess?", answer: "40%", method: "\\(10\\% + 30\\%\\)" },
      ],
      pyqExampleId: "14b2717a-3147-4603-a661-77d4b24288b9",
      traps: [
        {
          title: "Averaging two pass rates",
          body: "If 50 students pass at 90% and 150 at 70%, the overall rate is \\(\\frac{45 + 105}{200} = 75\\%\\), not 80%. The bigger group pulls the average towards its own rate.",
        },
        {
          title: "Taking shares of all the votes when some are invalid",
          body: "When 10% of 8,000 votes are invalid, a 55% share is 55% of 7,200, not of 8,000.",
        },
      ],
    },
  ],
};
