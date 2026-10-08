import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_LOG_NUR_PERCENT_NOTE: SubtopicNote = {
  subtopicName: "Percentages in Context",
  title: "Percentages: Change, Reverse and Parts of Parts",
  oneLineDefinition:
    "Turn every percentage change into a multiplier; multiply for successive changes, divide to go back to the original, and keep percent apart from percentage points.",
  whyItMatters:
    "Percentages are the most frequent single topic in this chapter: discounts, price offers and reverse percentages run through the Cambridge papers, and the ministry papers asked successive discounts in 2024 and a percentage of a remainder in 2026.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "imat-nur-pct-change",
      name: "Percentage change and the multiplier",
      intuition:
        "A percentage is a fraction out of 100, so a change of p percent is the same as multiplying by one number. A rise of 15% multiplies by 1.15; a fall of 15% multiplies by 0.85. Thinking in multipliers turns every percentage question into a single multiplication or division.",
      definition:
        "- **p% of a quantity** is the quantity times \\(\\dfrac{p}{100}\\).\n" +
        "- An **increase** of p% multiplies by \\(1 + \\dfrac{p}{100}\\); a **decrease** of p% multiplies by \\(1 - \\dfrac{p}{100}\\).\n" +
        "- **Percentage change** compares the change with the **original** value, never with the new one.",
      formula: {
        label: "Percentage change",
        latex: "\\text{percentage change} = \\frac{\\text{new} - \\text{original}}{\\text{original}} \\times 100\\%",
        symbols: [
          { symbol: "\\(\\text{original}\\)", meaning: "the value before the change (the base of the percentage)" },
          { symbol: "\\(\\text{new}\\)", meaning: "the value after the change" },
        ],
      },
      authoredExample: {
        prompt:
          "A bicycle costs €240 and its price rises by 15%. A scooter's price falls from €500 to €420. Find the new price of the bicycle and the percentage fall in the price of the scooter.",
        steps: [
          "Bicycle: multiplier 1.15, so \\(240 \\times 1.15 = 276\\). The new price is €276.",
          "Scooter: the change is \\(500 - 420 = 80\\). Divide by the original: \\(\\dfrac{80}{500} = 0.16\\), a 16% fall.",
        ],
        answer: "€276; a 16% fall",
      },
      selfCheckExample: {
        prompt: "The population of a town grows from 12,500 to 13,250. What is the percentage increase?",
        options: ["5.7%", "0.6%", "7.5%", "60%", "6%"],
        steps: [
          "Increase: \\(13\\,250 - 12\\,500 = 750\\).",
          "Divide by the original: \\(\\dfrac{750}{12\\,500} = 0.06\\), which is 6%.",
          "Option A divides by the new population. Options B and D put the decimal point in the wrong place.",
        ],
        answer: "(E) 6%",
      },
      practiceSet: [
        { prompt: "Increase 80 by 35%.", answer: "108", method: "\\(80 \\times 1.35\\)" },
        { prompt: "A price falls from €60 to €45. What is the percentage fall?", answer: "25%", method: "\\(15/60\\)" },
        { prompt: "Which multiplier gives a 4% decrease?", answer: "0.96", method: "\\(1 - 0.04\\)" },
        { prompt: "What is 12% of 350?", answer: "42", method: "\\(0.12 \\times 350\\)" },
      ],
      traps: [
        {
          title: "Percentage change divides by the original",
          body: "A rise from 12,500 to 13,250 is 750 out of 12,500, which is 6%. Dividing by the new value, 13,250, gives about 5.7%, and that wrong value is usually among the options.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-nur-pct-successive",
      name: "Successive changes and reverse percentages",
      intuition:
        "A second percentage change acts on the value after the first change, not on the original. So the multipliers multiply. Going back to the original is the same idea in reverse: the new value is the original times the multiplier, so the original is the new value divided by the multiplier.",
      definition:
        "- **Successive changes**: the overall multiplier is the product of the separate multipliers. 20% off and then 15% off is \\(0.80 \\times 0.85 = 0.68\\), a single 32% discount.\n" +
        "- A rise of p% followed by a fall of p% always leaves **less** than you started with.\n" +
        "- **Reverse percentage**: if a value **after** a change is known, the original is that value **divided** by the multiplier. Never take the percentage of the new value.",
      formula: {
        label: "Successive changes and the original value",
        latex: "\\text{final} = \\text{original} \\times m_1 \\times m_2 \\qquad \\text{original} = \\frac{\\text{final}}{m}",
        symbols: [
          { symbol: "\\(m_1, m_2\\)", meaning: "the multipliers of each change, e.g. 0.80 for 20% off" },
          { symbol: "\\(m\\)", meaning: "the overall multiplier from the original to the final value" },
        ],
      },
      authoredExample: {
        prompt:
          "A coat is reduced by 20% in a sale, and then a further 15% is taken off the sale price. What single discount is this equal to? A jacket in the same sale costs €91 after a 30% reduction. What was its original price?",
        steps: [
          "Coat: \\(0.80 \\times 0.85 = 0.68\\). The coat now costs 68% of the original, a single discount of 32% (not 35%).",
          "Jacket: €91 is 70% of the original, so the original is \\(\\dfrac{91}{0.70} = 130\\). Check: 30% of €130 is €39, and \\(130 - 39 = 91\\).",
        ],
        answer: "A 32% discount; the jacket was €130",
      },
      selfCheckExample: {
        prompt: "After a pay rise of 8%, Marta earns €2,160 a month. What did she earn before the rise?",
        options: ["€1,987.20", "€2,000", "€2,332.80", "€1,728", "€2,080"],
        steps: [
          "€2,160 is 108% of the old pay, so the old pay is \\(\\dfrac{2160}{1.08} = 2000\\).",
          "Check: 8% of €2,000 is €160, and \\(2000 + 160 = 2160\\).",
          "Option A takes 8% off the new pay, which is the classic error. Option C adds another 8%. Option D uses 0.8 instead of 0.92 or 1.08.",
        ],
        answer: "(B) €2,000",
      },
      practiceSet: [
        { prompt: "A price rises by 10% and then falls by 10%. What is the overall change?", answer: "A 1% decrease", method: "\\(1.1 \\times 0.9 = 0.99\\)" },
        { prompt: "A shirt costs €34 after a 15% discount. What was the original price?", answer: "€40", method: "\\(34 / 0.85\\)" },
        { prompt: "What single increase equals two successive increases of 20%?", answer: "44%", method: "\\(1.2^2 = 1.44\\)" },
      ],
      traps: [
        {
          title: "Successive percentages do not add",
          body: "20% off followed by 15% off is a 32% discount, not 35%, because the second discount is taken from a smaller price. In the same way, two 20% rises make 44%, not 40%.",
        },
        {
          title: "To find the original, divide by the multiplier",
          body: "If a price after an 8% rise is €2,160, subtracting 8% of €2,160 gives €1,987.20, which is wrong. The 8% was 8% of the old price, so divide: \\(2160 / 1.08 = 2000\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-nur-pct-parts",
      name: "Percentages of a part, and percentage points",
      intuition:
        "Many questions take a percentage of a group and then a percentage of what is left. Write each step as a fraction of the whole and multiply. Separately, when the quantity being changed is itself a percentage (a rate, a share of the vote), there are two ways to describe a change, and they give very different numbers.",
      definition:
        "- **Percentage of a part**: \"25% of the remaining 60%\" is \\(0.25 \\times 0.60 = 0.15\\), so 15% of the whole.\n" +
        "- If a known number of people is a known percentage of the whole, the whole is that number divided by the percentage as a decimal.\n" +
        "- **Percentage points** measure the plain difference between two percentages: 4% to 5% is a rise of **1 percentage point**.\n" +
        "- The **percentage change** of the same rate is \\(\\dfrac{1}{4} = 25\\%\\). Both statements are true; they answer different questions.",
      formula: {
        label: "Part of a part",
        latex: "\\text{fraction of the whole} = \\frac{p_1}{100} \\times \\frac{p_2}{100}",
        symbols: [
          { symbol: "\\(p_1\\)", meaning: "the percentage that picks out the first group" },
          { symbol: "\\(p_2\\)", meaning: "the percentage of that group that is wanted" },
        ],
      },
      authoredExample: {
        prompt:
          "In a school, 40% of the students come by bus. Of the other students, 25% cycle. What percentage of all the students cycle? If 270 students cycle, how many students are in the school?",
        steps: [
          "Students not on the bus: 60% of the school.",
          "Cyclists: \\(0.25 \\times 0.60 = 0.15\\), so 15% of all students.",
          "Whole school: \\(\\dfrac{270}{0.15} = 1800\\) students.",
        ],
        answer: "15%; 1800 students",
      },
      selfCheckExample: {
        prompt: "The unemployment rate in a region falls from 8% to 6%. Which statement is correct?",
        options: [
          "It fell by 2%.",
          "It fell by 25 percentage points.",
          "It fell by 2 percentage points, which is a 33% fall.",
          "It fell by 2 percentage points, which is a 25% fall.",
          "It fell by 6 percentage points.",
        ],
        steps: [
          "Difference: \\(8 - 6 = 2\\) percentage points.",
          "Percentage change of the rate: \\(\\dfrac{2}{8} = 0.25\\), a 25% fall.",
          "Option A confuses points with percent. Option C divides by the new rate, 6. Option B mixes the two units.",
        ],
        answer: "(D) It fell by 2 percentage points, which is a 25% fall.",
      },
      practiceSet: [
        { prompt: "60% of a class are girls, and 30% of the girls wear glasses. What percentage of the class are girls who wear glasses?", answer: "18%", method: "\\(0.6 \\times 0.3\\)" },
        { prompt: "A party's share of the vote rises from 20% to 23%. Give the change in percentage points and as a percentage.", answer: "3 percentage points; a 15% rise", method: "\\(3/20 = 0.15\\)" },
        { prompt: "In a survey, 35% chose tea, 45% chose coffee and the remaining 48 people chose water. How many people were surveyed?", answer: "240", method: "48 is 20% of the total" },
      ],
      traps: [
        {
          title: "Percentage points are not percent",
          body: "A rate moving from 8% to 6% falls by 2 percentage points, but by 25% of its old value. An option saying \"it fell by 2%\" uses the wrong unit and is wrong.",
        },
        {
          title: "\"Of the rest\" means of the remainder, not of the whole",
          body: "If 40% take the bus and 25% of the rest cycle, the cyclists are 25% of 60%, which is 15% of the school, not 25%.",
        },
      ],
    },
  ],
};
