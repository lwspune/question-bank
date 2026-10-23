import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_PP_SUCCESSIVE_NOTE: SubtopicNote = {
  subtopicName: "Successive Percentage Change",
  title: "Successive Percentage Change",
  oneLineDefinition:
    "Each percentage change multiplies the current value by a factor, so several changes in a row multiply together instead of adding.",
  whyItMatters:
    "28 questions in the bank, 15 of them MODERATE: a price that rises then falls, money spent out of what is left, a value worked back to where it started, and price against consumption. One idea solves all of them, and it is the same idea the profit and discount pages lean on later, so learn it here first.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscppsc-factor",
      name: "Successive changes as a product of factors",
      intuition:
        "A rise of 20% turns 100 into 120, so it multiplies by 1.2. A fall of 15% multiplies by 0.85. The second change acts on the new value, not on the first one, so the factors multiply and the percentages never simply add.",
      definition:
        "- A rise of r% multiplies by \\(1 + \\frac{r}{100}\\); a fall of r% multiplies by \\(1 - \\frac{r}{100}\\).\n" +
        "- Two changes of a% and b% (write a fall as a negative number) give a net change of \\(a + b + \\frac{ab}{100}\\) per cent.\n" +
        "- The order does not matter: up 10% then down 20% ends where down 20% then up 10% ends.\n" +
        "- An equal rise and fall of r% always leaves a loss of \\(\\frac{r^2}{100}\\) per cent.\n" +
        "- The rule works for any product of two quantities: area (length times breadth, or side times side), a wage bill (workers times wage), a quotient (divide by the divisor's factor).\n" +
        "- **Fast route:** for three or more changes, combine two with the formula, then combine the result with the next.",
      formula: {
        label: "Net effect of two changes",
        latex: "\\text{net}\\% = a + b + \\frac{ab}{100} \\qquad \\text{equal rise and fall: } -\\frac{r^2}{100}\\%",
        symbols: [
          { symbol: "a, b", meaning: "the two changes in per cent, a fall written as negative" },
          { symbol: "r", meaning: "the size of an equal rise and fall" },
        ],
      },
      authoredExample: {
        prompt: "The price of a shirt rises by 20% and then falls by 10%. Find the net change.",
        steps: [
          "Factors: \\(1.2 \\times 0.9 = 1.08\\), so the price ends 8% higher.",
          "Formula check with a = 20 and b = \\(-10\\): \\(20 - 10 + \\frac{20 \\times (-10)}{100} = 10 - 2 = 8\\).",
        ],
        answer: "An 8% increase",
      },
      selfCheckExample: {
        prompt: "The length of a rectangle is increased by 10% and its breadth by 20%. By what percentage does its area increase?",
        steps: ["Area is length times breadth, so the factors multiply.", "\\(10 + 20 + \\frac{10 \\times 20}{100} = 32\\)."],
        answer: "32%",
      },
      practiceSet: [
        { prompt: "A price is increased by 40% and then decreased by 40%. What is the net change?", answer: "A 16% decrease" },
        { prompt: "A number is increased by 10% three times in a row. By what percentage has it increased in all?", answer: "33.1% (\\(1.1^3 = 1.331\\))" },
        {
          prompt: "In a factory the number of workers rises by 25% and the wage per worker falls by 20%. How does the total wage bill change?",
          answer: "No change (\\(1.25 \\times 0.8 = 1\\))",
        },
        { prompt: "The side of a square is decreased by 10%. By what percentage does its area decrease?", answer: "19%" },
      ],
      pyqExampleId: "e3001636-4935-42be-8ef5-e16b9720bbf6",
      traps: [
        {
          title: "Adding the percentages",
          body: "A rise of 30% followed by a fall of 30% is not 'no change'. \\(1.3 \\times 0.7 = 0.91\\), a 9% fall.",
        },
        {
          title: "Dropping the sign in the product term",
          body:
            "For a rise of 25% and a fall of 12%, b is \\(-12\\), so the product term is \\(\\frac{25 \\times (-12)}{100} = -3\\). The net change is \\(25 - 12 - 3 = 10\\%\\), not 16%.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscppsc-rest",
      name: "Spending a share of what is left",
      intuition:
        "'18% of the rest' is 18% of whatever remains at that point, not 18% of the whole income. So each step keeps a share of the previous amount, and what is left at the end is the income times all the 'kept' factors.",
      definition:
        "- After spending x% of an amount, \\(\\left(1 - \\frac{x}{100}\\right)\\) of it is left.\n" +
        "- 'y% of the remaining' multiplies what remains by \\(1 - \\frac{y}{100}\\) for the part still left.\n" +
        "- Final amount \\(=\\) total \\(\\times\\) all the kept factors. To find the total, divide the final amount by that product.\n" +
        "- Shares that are all of the **same total** (30% rent and 20% food, both of the salary) add first. Only 'of the rest' shares multiply.",
      formula: {
        label: "Amount left after spending out of the remainder",
        latex: "\\text{left} = S\\left(1 - \\frac{x}{100}\\right)\\left(1 - \\frac{y}{100}\\right)\\left(1 - \\frac{z}{100}\\right)",
      },
      authoredExample: {
        prompt: "Mohan spends 20% of his salary on rent and 25% of the rest on food. He saves the remaining ₹9,000. Find his salary.",
        steps: [
          "Kept after rent: 0.8 of the salary. Kept after food: 0.75 of that.",
          "Savings \\(= 0.8 \\times 0.75 \\times S = 0.6S\\).",
          "\\(0.6S = 9000\\), so \\(S = 15000\\). Check: rent 3,000, food 3,000, savings 9,000.",
        ],
        answer: "₹15,000",
      },
      selfCheckExample: {
        prompt: "Of ₹50,000, 40% is spent on a bike and 30% of the remainder on a phone. How much is left?",
        steps: ["\\(50000 \\times 0.6 = 30000\\) after the bike.", "\\(30000 \\times 0.7 = 21000\\) after the phone."],
        answer: "₹21,000",
      },
      practiceSet: [
        {
          prompt: "25% of the water in a full tank is used, and then 20% of what remains. What percentage of the full tank is left?",
          answer: "60% (\\(0.75 \\times 0.8\\))",
        },
        {
          prompt: "Asha gives away 10% of her stamps and then 50% of the rest, and is left with 90 stamps. How many did she start with?",
          answer: "200 (\\(90 \\div 0.45\\))",
        },
        {
          prompt: "A man spends 30% of his income on rent and 20% of his income on food. What percentage of his income is left?",
          answer: "50% (both shares are of the whole income, so they add)",
        },
      ],
      pyqExampleId: "1fafec9f-c6ae-4d97-86a6-56aaa14399e2",
      traps: [
        {
          title: "Adding shares of different amounts",
          body:
            "20% of the income, then 50% of the rest, then 40% of the rest leaves \\(0.8 \\times 0.5 \\times 0.6 = 0.24\\) of the income. Adding 20, 50 and 40 gives 110%, which means nothing.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscppsc-back",
      name: "Working back to the original value",
      intuition:
        "If you know where a value ended and what changes it went through, divide by the combined factor to get back to the start. To undo a change, the reverse percentage is taken on the new value, so it is a different number.",
      definition:
        "- Original \\(=\\) final \\(\\div\\) (product of all the factors).\n" +
        "- To undo a rise of r%, fall by \\(\\frac{r}{100 + r} \\times 100\\%\\); to undo a fall of r%, rise by \\(\\frac{r}{100 - r} \\times 100\\%\\). This is the changing base from the Percentage Basics page.\n" +
        "- A population or price growing by r% a year for n years is multiplied by \\(\\left(1 + \\frac{r}{100}\\right)^n\\), so its value n years ago is today's value divided by that.\n" +
        "- If a fall of x% and then a rise of x% leave the value k% lower, then \\(\\frac{x^2}{100} = k\\).\n" +
        "- When the rates are unknown, write the product of factors as an equation. With four options, putting each one in is often faster than solving.",
      formula: {
        label: "Back to the start, and growth over years",
        latex:
          "\\text{original} = \\frac{\\text{final}}{\\left(1 + \\frac{a}{100}\\right)\\left(1 + \\frac{b}{100}\\right)} \\qquad P_n = P_0\\left(1 + \\frac{r}{100}\\right)^n",
      },
      authoredExample: {
        prompt: "After a rise of 25% and then a rise of 20%, a price is ₹1,800. What was the original price?",
        steps: [
          "Combined factor: \\(1.25 \\times 1.2 = 1.5\\).",
          "Original \\(= \\frac{1800}{1.5} = 1200\\).",
          "Check: 1,200 up 25% is 1,500, and 1,500 up 20% is 1,800.",
        ],
        answer: "₹1,200",
      },
      selfCheckExample: {
        prompt: "A town's population grows by 10% every year and is 36,300 now. What was it two years ago?",
        steps: ["Two years multiply by \\(1.1^2 = 1.21\\).", "\\(\\frac{36300}{1.21} = 30000\\)."],
        answer: "30,000",
      },
      practiceSet: [
        { prompt: "A price falls by 20%. By what percentage must it rise to get back to the start?", answer: "25%" },
        { prompt: "A salary is cut by 10% and then raised by 10%, ending at ₹19,800. What was it at first?", answer: "₹20,000 (factor 0.99)" },
        { prompt: "A value is increased by x% and then decreased by x%, ending 4% below where it began. Find x.", answer: "20" },
      ],
      pyqExampleId: "0eee787c-5aab-4d98-9e8d-c1eb6364c67d",
      traps: [
        {
          title: "Undoing a change with the same percentage",
          body:
            "A value that rose by 30% does not return by falling 30%. From 130, it must fall by 30 on a base of 130, which is about 23.08%.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscppsc-consumption",
      name: "Price and consumption when spending is fixed",
      intuition:
        "Spending is price times quantity. If the price goes up and the spending must stay the same, the quantity has to come down by just enough to cancel the price factor.",
      definition:
        "- If the price rises by r%, consumption must fall by \\(\\frac{r}{100 + r} \\times 100\\%\\) to keep spending the same.\n" +
        "- If the price falls by r%, the same money buys \\(\\frac{r}{100 - r} \\times 100\\%\\) more.\n" +
        "- If price and consumption both change, new spending \\(=\\) old spending \\(\\times\\) price factor \\(\\times\\) quantity factor.\n" +
        "- 'A fall of r% in price lets a buyer get Q kg more for ₹M': the money saved is r% of M, and it buys the Q kg at the **new** price. So new price \\(= \\frac{r\\% \\text{ of } M}{Q}\\), and old price \\(=\\) new price \\(\\div \\left(1 - \\frac{r}{100}\\right)\\).",
      formula: {
        label: "Cut in consumption to keep spending fixed",
        latex: "\\text{cut} = \\frac{r}{100 + r} \\times 100\\% \\qquad \\text{spending} = \\text{price} \\times \\text{quantity}",
      },
      authoredExample: {
        prompt: "The price of cooking oil rises by 25%. By what percentage should a family cut its use of oil so that its spending stays the same?",
        steps: [
          "Cut \\(= \\frac{25}{125} \\times 100 = 20\\%\\).",
          "Fraction route: a rise of \\(\\frac{1}{4}\\) is cancelled by a cut of \\(\\frac{1}{5}\\).",
          "Check: \\(1.25 \\times 0.8 = 1\\).",
        ],
        answer: "20%",
      },
      selfCheckExample: {
        prompt: "Milk becomes 20% cheaper. By what percentage more milk can a family buy for the same money?",
        steps: ["Quantity rises by \\(\\frac{20}{80} \\times 100\\).", "That is 25%."],
        answer: "25%",
      },
      practiceSet: [
        { prompt: "The price of tea rises by 50%. By what percentage must tea use fall to keep spending the same?", answer: "\\(33\\frac{1}{3}\\%\\)" },
        { prompt: "The price of a fuel rises by 20% and its use falls by 10%. How does the spending on it change?", answer: "An 8% increase (\\(1.2 \\times 0.9 = 1.08\\))" },
        {
          prompt: "A 10% fall in the price of apples lets a buyer get 2 kg more for ₹360. What is the new price per kg?",
          answer: "₹18 (the ₹36 saved buys 2 kg)",
        },
      ],
      pyqExampleId: "d5c00e63-0a17-4343-b065-5d833d147f50",
      traps: [
        {
          title: "Cutting consumption by the price rise",
          body: "A price rise of 25% does not need a 25% cut. A 20% cut is enough, because \\(1.25 \\times 0.8 = 1\\).",
        },
        {
          title: "Mixing up the new price and the old price",
          body:
            "When a price cut lets you buy extra kilograms, the money saved buys them at the new, lower price. Divide that by the price factor to get the old price.",
        },
      ],
    },
  ],
};
