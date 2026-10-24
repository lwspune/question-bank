import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_RA_INCOME_NOTE: SubtopicNote = {
  subtopicName: "Ratios in Income, Savings and Ages",
  title: "Ratios in Income, Savings and Ages",
  oneLineDefinition:
    "Income is expenditure plus savings for every person, and the gap between two ages never changes, so each of these stories gives one fixed link that turns the ratios into numbers.",
  whyItMatters:
    "Fourteen questions in the bank, nine on income and savings and five on ages, with six of the fourteen MODERATE. The savings questions with percentage changes are the slowest here unless you pick easy starting numbers, which is the fast route this page teaches.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscrain-savings",
      name: "Income, expenditure and savings in a ratio",
      intuition:
        "Every rupee earned is either spent or saved. So if spending and saving are 3 parts and 1 part, income is 4 parts, and a change in any two of the three fixes the third.",
      definition:
        "- For each person, **income = expenditure + savings**.\n" +
        "- **Expenditure : savings = e : s** means income is \\(e + s\\) parts.\n" +
        "- **Two people, two ratios** (incomes \\(a : b\\), expenditures \\(c : d\\)): write incomes \\(ak, bk\\) and expenditures \\(cm, dm\\). One more fact (equal savings, or one person's saving rate) links k and m.\n" +
        "- **Saving a percentage:** someone who saves 64% of income spends 36% of it.\n" +
        "- **Fast route for percentage changes:** start from easy numbers that fit the ratio (expenditure 40, savings 10, income 50), apply each change, and recompute savings as income minus expenditure. The percentage change in savings is then a one-line division.",
      formula: {
        label: "Income identity",
        latex: "I = E + S \\qquad S_{\\text{new}} = I(1 + r_I) - E(1 + r_E)",
        symbols: [
          { symbol: "I, E, S", meaning: "income, expenditure, savings" },
          { symbol: "r_I, r_E", meaning: "the fractional rises in income and expenditure" },
        ],
      },
      authoredExample: {
        prompt: "A man's income and expenditure are in the ratio 5 : 4. His income rises by 15% and his expenditure by 10%. By what percentage do his savings change?",
        steps: [
          "Take income 100 and expenditure 80, so savings are 20.",
          "New income \\(= 115\\), new expenditure \\(= 88\\), so new savings \\(= 27\\).",
          "Change \\(= \\frac{27 - 20}{20} \\times 100 = 35\\%\\), a rise.",
        ],
        answer: "35% increase",
      },
      selfCheckExample: {
        prompt: "The incomes of A and B are in the ratio 3 : 4 and their expenditures in the ratio 2 : 3. Each saves ₹5,000. Find A's income.",
        steps: [
          "Incomes \\(3k, 4k\\); expenditures \\(2m, 3m\\). So \\(3k - 2m = 5000\\) and \\(4k - 3m = 5000\\).",
          "Subtract: \\(k - m = 0\\), so \\(m = k\\). Then \\(3k - 2k = 5000\\) and \\(k = 5000\\).",
          "A's income \\(= 15000\\). Check: A spends 10,000 and B earns 20,000 and spends 15,000.",
        ],
        answer: "₹15,000",
      },
      practiceSet: [
        { prompt: "Expenditure and savings are in the ratio 7 : 2, and the savings are ₹6,000. What is the income?", answer: "₹27,000" },
        { prompt: "A woman saves 30% of her income of ₹40,000. How much does she spend?", answer: "₹28,000" },
        { prompt: "Income and expenditure are in the ratio 4 : 3, and the income is ₹36,000. What are the savings?", answer: "₹9,000" },
        {
          prompt: "Spending and saving are in the ratio 4 : 1. Income rises by 10% and saving by 30%. By what percentage does spending rise?",
          answer: "5%",
          method: "Spend 40, save 10, earn 50; then earn 55, save 13, spend 42.",
        },
      ],
      pyqExampleId: "48dc7c07-6065-4c30-93f1-f5902381f34a",
      traps: [
        {
          title: "Combining the percentages instead of the amounts",
          body:
            "Income up 20% and expenditure up 10% does not move savings by 10% or 30%. Savings are a difference, so take numbers, apply each rise, and subtract again.",
        },
        {
          title: "Confusing the saving rate with the spending rate",
          body:
            "Saving 25% of income means spending 75% of it. When the stem gives what is saved, turn it into what is spent before comparing expenditures.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrain-ages",
      name: "Ages in a ratio",
      intuition:
        "Two people age at the same speed, so the gap between their ages is the same every year while their ratio drifts towards 1. The ratio of ages is therefore never a fixed fact, but the difference is.",
      definition:
        "- Write the present ages as \\(ak\\) and \\(bk\\). Then t years ago they were \\(ak - t\\) and \\(bk - t\\); in t years they will be \\(ak + t\\) and \\(bk + t\\).\n" +
        "- Set the changed fraction equal to the other ratio and solve for k.\n" +
        "- The **difference** of two ages never changes, so it is the fixed ruler of these questions.\n" +
        "- **Fast route:** scale the two ratios so their DIFFERENCES are equal. Then the age gap is the same number of parts in both, and the change in either term, in parts, equals the years that passed.\n" +
        "- Find the ages first, then answer what is asked (an age in five years, a third person's age, or a new ratio).",
      formula: {
        label: "Ages after t years",
        latex: "\\frac{ak + t}{bk + t} = \\frac{m}{n} \\qquad bk - ak \\text{ stays fixed}",
        symbols: [{ symbol: "t", meaning: "years ahead (use \\(-t\\) for years ago)" }],
      },
      authoredExample: {
        prompt: "The ages of a mother and her son are in the ratio 7 : 2. In 10 years they will be in the ratio 9 : 4. Find their present ages.",
        steps: [
          "Full method: \\(\\frac{7k + 10}{2k + 10} = \\frac{9}{4}\\), so \\(28k + 40 = 18k + 90\\) and \\(k = 5\\). The ages are 35 and 10.",
          "Fast route: the differences are \\(7 - 2 = 5\\) and \\(9 - 4 = 5\\), already equal. The mother goes from 7 parts to 9 parts in 10 years, so 1 part is 5 years.",
          "Check: in 10 years they are 45 and 20, and \\(45 : 20 = 9 : 4\\).",
        ],
        answer: "35 years and 10 years",
      },
      selfCheckExample: {
        prompt: "Ravi is 24 and his sister is 16. In how many years will their ages be in the ratio 5 : 4?",
        steps: [
          "The gap is 8 years, and in 5 : 4 the gap is 1 part, so 1 part is 8 years. The ages will be 40 and 32.",
          "So \\(40 - 24 = 16\\) years. Check: \\(\\frac{24 + 16}{16 + 16} = \\frac{40}{32} = \\frac{5}{4}\\).",
        ],
        answer: "16 years",
      },
      practiceSet: [
        { prompt: "Two ages are in the ratio 4 : 7 and add up to 66 years. What is the younger age?", answer: "24 years" },
        { prompt: "Two people are 30 and 20 years old. What will the ratio of their ages be in 10 years?", answer: "4 : 3" },
        {
          prompt: "Two ages are in the ratio 3 : 5 and differ by 12 years. What will the ratio be in 6 years?",
          answer: "2 : 3",
          method: "1 part is 6 years, so the ages are 18 and 30; in 6 years, 24 and 36.",
        },
      ],
      pyqExampleId: "276acf2a-cadd-47ce-a09e-8b6adc0a829e",
      traps: [
        {
          title: "Adding the years to the ratio terms",
          body:
            "Ages in the ratio 6 : 5 do not become 13 : 12 after 7 years. The terms are parts, not years; find the ages first, then add 7 to each.",
        },
        {
          title: "Letting the age gap change",
          body:
            "After any number of years both ages rise by the same amount, so the difference stays the same. If your working changes the gap, a sign or a term has been misread.",
        },
      ],
    },
  ],
};
