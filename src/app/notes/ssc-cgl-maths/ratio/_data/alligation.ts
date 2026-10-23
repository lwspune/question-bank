import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_RA_ALLIGATION_NOTE: SubtopicNote = {
  subtopicName: "Mixtures and Alligation",
  title: "Mixtures and Alligation",
  oneLineDefinition:
    "The price of a mixture is the weighted average of the prices that go into it, and alligation runs that average backwards to give the ratio in which two kinds were mixed.",
  whyItMatters:
    "Thirty questions in the bank, nineteen EASY and eleven MODERATE. Fifteen find a mean price or a missing price, four ask straight for a mixing ratio, and eleven are sold at a profit or a loss, which is where most wrong answers come from: the cross must use the cost price, not the selling price.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscraal-mean",
      name: "Mean price of a mixture",
      intuition:
        "If you buy 6 kg of one tea and 4 kg of another, the mixture costs exactly what you paid in total, spread over 10 kg. So its price per kg is a weighted average, and it always lies between the cheapest and the dearest price, nearer to the kind you used more of.",
      definition:
        "- **Mean price** \\(= \\frac{q_1p_1 + q_2p_2 + \\cdots}{q_1 + q_2 + \\cdots}\\): total cost over total quantity.\n" +
        "- **A missing price:** total value of the mixture (its quantity times its mean price) minus the known values is the value of the missing kind. With a ratio 2 : 1 : 3, take 2 kg, 1 kg and 3 kg.\n" +
        "- **Fast route (balance):** the amounts above and below the mean cancel: \\(q_1(p_1 - m) + q_2(p_2 - m) = 0\\). With a convenient mean this is quicker than the totals.\n" +
        "- Change every price to the same unit first: ₹250 for 5 kg is ₹50 per kg.\n" +
        "- Option check: the mean must lie between the lowest and highest price.",
      formula: {
        label: "Mean price",
        latex: "m = \\frac{q_1p_1 + q_2p_2}{q_1 + q_2} \\qquad q_1(p_1 - m) + q_2(p_2 - m) = 0",
        symbols: [
          { symbol: "q", meaning: "the quantity of each kind" },
          { symbol: "p", meaning: "its price per unit" },
          { symbol: "m", meaning: "the mean price of the mixture" },
        ],
      },
      authoredExample: {
        prompt: "6 kg of tea at ₹180 per kg is mixed with 4 kg of tea at ₹230 per kg. What is the price per kg of the mixture?",
        steps: [
          "Full method: \\(\\frac{6 \\times 180 + 4 \\times 230}{10} = \\frac{1080 + 920}{10} = 200\\).",
          "Balance check at 200: \\(6 \\times (-20) + 4 \\times 30 = -120 + 120 = 0\\).",
        ],
        answer: "₹200 per kg",
      },
      selfCheckExample: {
        prompt: "Rice at ₹30 and ₹36 per kg is mixed with a third kind in the ratio 2 : 1 : 3. The mixture is worth ₹40 per kg. What is the price of the third kind?",
        steps: [
          "Take 6 kg in all, worth \\(6 \\times 40 = 240\\) rupees. The first two kinds cost \\(60 + 36 = 96\\).",
          "So 3 kg of the third kind cost 144, which is ₹48 per kg.",
          "Balance check at 40: \\(2(-10) + 1(-4) + 3(8) = 0\\).",
        ],
        answer: "₹48 per kg",
      },
      practiceSet: [
        { prompt: "5 litres of oil at ₹120 per litre are mixed with 3 litres at ₹160 per litre. What is the price per litre of the mixture?", answer: "₹135" },
        { prompt: "8 kg of sugar at ₹40 per kg is mixed with 2 kg of another kind to give a mixture worth ₹44 per kg. What is the price of the second kind?", answer: "₹60 per kg" },
        { prompt: "Two kinds of dal at ₹90 and ₹110 per kg are mixed in equal amounts. What is the mean price?", answer: "₹100 per kg" },
      ],
      pyqExampleId: "774e9f82-d26d-4b81-9a5c-6d7764a838ac",
      traps: [
        {
          title: "Averaging the prices without the quantities",
          body:
            "6 kg at ₹180 and 4 kg at ₹230 do not average ₹205. The mixture has more of the cheaper tea, so its price is ₹200, nearer ₹180.",
        },
        {
          title: "Mixing price units",
          body:
            "A price given per 5 kg must be turned into a price per kg before it meets prices per kg. ₹360 for 5 kg is ₹72 per kg.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscraal-cross",
      name: "The alligation cross for a mixing ratio",
      intuition:
        "The mean price is a balance point between the two prices. The kind whose price is closer to the mean must be present in a larger amount to hold the balance there, so each kind's share is the OTHER kind's distance from the mean.",
      definition:
        "- For a cheaper kind at \\(p_1\\), a dearer kind at \\(p_2\\) and a mean m between them: **cheaper : dearer \\(= (p_2 - m) : (m - p_1)\\)**.\n" +
        "- Write the two prices at the top, the mean in the middle, and subtract across the diagonals.\n" +
        "- It works for any weighted average of two kinds: prices, strengths of solutions, rates of profit. **Water counts as price 0.**\n" +
        "- Once the ratio is known, scale it to the quantity given in the stem.\n" +
        "- It is a two-kind rule. With three kinds, go back to totals.",
      formula: {
        label: "Rule of alligation",
        latex: "\\frac{q_{\\text{cheaper}}}{q_{\\text{dearer}}} = \\frac{p_2 - m}{m - p_1}",
        symbols: [
          { symbol: "p_1, p_2", meaning: "the cheaper and the dearer price" },
          { symbol: "m", meaning: "the mean price, between \\(p_1\\) and \\(p_2\\)" },
        ],
      },
      authoredExample: {
        prompt: "Coffee at ₹520 per kg is mixed with coffee at ₹400 per kg to give a mixture worth ₹450 per kg. In what ratio are they mixed, and how much of the cheaper kind goes with 10 kg of the dearer?",
        steps: [
          "Cheaper : dearer \\(= (520 - 450) : (450 - 400) = 70 : 50 = 7 : 5\\).",
          "10 kg of the dearer is 5 parts, so 1 part is 2 kg and the cheaper kind is 14 kg.",
          "Check: \\(\\frac{14 \\times 400 + 10 \\times 520}{24} = \\frac{10800}{24} = 450\\).",
        ],
        answer: "Cheaper : dearer = 7 : 5, so 14 kg",
      },
      selfCheckExample: {
        prompt: "In what ratio must water be mixed with juice costing ₹60 per litre to give a mixture worth ₹48 per litre?",
        steps: [
          "Water costs ₹0. Water : juice \\(= (60 - 48) : (48 - 0) = 12 : 48 = 1 : 4\\).",
        ],
        answer: "1 : 4",
      },
      practiceSet: [
        { prompt: "Two solutions are 15% and 40% acid. In what ratio should they be mixed to give 30% acid?", answer: "2 : 3" },
        {
          prompt: "A trader sells part of his stock at an 8% profit and the rest at a 20% profit, gaining 12% overall. In what ratio are the two parts?",
          answer: "2 : 1",
          method: "\\((20 - 12) : (12 - 8) = 8 : 4\\).",
        },
        { prompt: "Wheat at ₹24 and ₹32 per kg is mixed to give a mixture worth ₹27 per kg. What is the ratio of the cheaper to the dearer wheat?", answer: "5 : 3" },
      ],
      pyqExampleId: "9d59d968-e50a-4b22-b21a-fad227227907",
      traps: [
        {
          title: "Giving each kind its own distance",
          body:
            "In the cross, the cheaper kind's share is the DEARER price minus the mean. If the mean is close to the cheaper price, the cheaper kind is the larger part.",
        },
        {
          title: "A mean outside the two prices",
          body:
            "The mean of a two-kind mixture must lie between the two prices. A mean outside them means a price was misread or a selling price was used where the cost price belongs.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscraal-profit",
      name: "Mixtures sold at a profit or a loss",
      intuition:
        "Alligation balances COSTS. When the stem gives the price the mixture is sold at and the profit made, that price is not the mixture's cost, so the cost price must be recovered first; only then does it belong in the middle of the cross.",
      definition:
        "- **Cost price of the mixture:** \\(CP = \\frac{SP}{1 + \\frac{r}{100}}\\) for a profit of r%, and \\(\\frac{SP}{1 - \\frac{r}{100}}\\) for a loss of r%.\n" +
        "- **Mixing ratio:** put that CP in the middle of the alligation cross.\n" +
        "- **Gain or loss % of a mixture:** find the mean cost first, then compare the selling price with it.\n" +
        "- **A missing price or quantity:** use the CP as the mean price and work as on the mean-price concept.\n" +
        "- Fast route: a 20% profit means \\(SP = \\frac{6}{5}CP\\), so CP is \\(\\frac{5}{6}\\) of SP. Common fractions: 10% is \\(\\frac{11}{10}\\), 25% is \\(\\frac{5}{4}\\).",
      formula: {
        label: "Cost price of the mixture",
        latex: "CP = \\frac{100 \\times SP}{100 + r} \\qquad \\text{gain \\%} = \\frac{SP - CP}{CP} \\times 100",
        symbols: [
          { symbol: "SP", meaning: "the selling price per unit" },
          { symbol: "r", meaning: "the profit percentage" },
        ],
      },
      authoredExample: {
        prompt: "Rice at ₹48 and ₹68 per kg is mixed and the mixture is sold at ₹70 per kg for a 25% profit. In what ratio were the two kinds mixed?",
        steps: [
          "CP of the mixture \\(= \\frac{70}{1.25} = 56\\) per kg.",
          "Cross: cheaper : dearer \\(= (68 - 56) : (56 - 48) = 12 : 8 = 3 : 2\\).",
          "Check: \\(\\frac{3 \\times 48 + 2 \\times 68}{5} = \\frac{280}{5} = 56\\), and \\(56 \\times 1.25 = 70\\).",
        ],
        answer: "3 : 2",
      },
      selfCheckExample: {
        prompt: "Tea at ₹200 and ₹300 per kg is mixed in the ratio 3 : 2 and sold at ₹264 per kg. What is the gain percent?",
        steps: [
          "CP \\(= \\frac{3 \\times 200 + 2 \\times 300}{5} = 240\\) per kg.",
          "Gain \\(= \\frac{264 - 240}{240} \\times 100 = 10\\%\\).",
        ],
        answer: "10% gain",
      },
      practiceSet: [
        { prompt: "A mixture is sold at ₹66 per kg at a 10% profit. What is its cost price per kg?", answer: "₹60" },
        { prompt: "A mixture costing ₹80 per kg is sold at ₹76 per kg. What is the loss percent?", answer: "5%" },
        {
          prompt: "Sugar at ₹36 and ₹46 per kg is mixed and sold at ₹48 per kg at a 20% gain. In what ratio were the two kinds mixed?",
          answer: "3 : 2",
          method: "CP \\(= 40\\); \\((46 - 40) : (40 - 36) = 6 : 4\\).",
        },
      ],
      pyqExampleId: "efc39971-e5ec-4260-9c9c-bc9fa4a50ab0",
      traps: [
        {
          title: "Putting the selling price in the cross",
          body:
            "A mixture of ₹48 and ₹68 rice sold at ₹70 cannot use 70 in the cross: it lies above both prices. The cross needs the cost price, here ₹56.",
        },
        {
          title: "Taking the profit off the selling price",
          body:
            "A 25% profit means SP is 1.25 times CP, so \\(CP = SP \\div 1.25\\). Taking 25% off the selling price (\\(SP \\times 0.75\\)) gives a cost that is too low.",
        },
      ],
    },
  ],
};
