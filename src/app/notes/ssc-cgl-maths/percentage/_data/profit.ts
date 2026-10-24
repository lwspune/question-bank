import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_PP_PROFIT_NOTE: SubtopicNote = {
  subtopicName: "Profit and Loss",
  title: "Profit and Loss",
  oneLineDefinition:
    "Profit or loss is the gap between the selling price and the cost price, and its percentage is always taken on the cost price unless the question says otherwise.",
  whyItMatters:
    "61 questions in the bank, 38 EASY and 23 MODERATE. Most are one division: a cost price from a selling price, or a profit percentage. The MODERATE ones are the 24 that sell several items or lots at different rates, where the overall profit has to be built from totals rather than averaged.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscpppl-basic",
      name: "Cost price, selling price and profit percentage",
      intuition:
        "A trader buys at the cost price (CP) and sells at the selling price (SP). A profit of 20% means the SP is the CP plus a fifth of the CP: the cost price is the base, the 100, of every profit and loss percentage.",
      definition:
        "- Profit \\(= SP - CP\\); loss \\(= CP - SP\\).\n" +
        "- Profit % \\(= \\frac{\\text{profit}}{CP} \\times 100\\), and loss % the same way.\n" +
        "- \\(SP = CP\\left(1 + \\frac{p}{100}\\right)\\) and \\(CP = \\frac{SP}{1 + p/100}\\). For a loss, use \\(1 - \\frac{l}{100}\\).\n" +
        "- **Fraction route:** a 25% profit makes \\(SP = \\frac{5}{4}CP\\); a 20% loss makes \\(SP = \\frac{4}{5}CP\\).\n" +
        "- If the profit is \\(\\frac{1}{n}\\) of the **selling** price, then \\(CP = \\frac{n - 1}{n}SP\\) and the profit is \\(\\frac{1}{n - 1}\\) of the cost.\n" +
        "- Transport, repairs and other expenses are added to the cost price before you work out the profit.",
      formula: {
        label: "Profit percentage and the two prices",
        latex:
          "\\text{profit}\\% = \\frac{SP - CP}{CP} \\times 100 \\qquad SP = CP\\left(1 + \\frac{p}{100}\\right) \\qquad CP = \\frac{SP}{1 + \\frac{p}{100}}",
      },
      authoredExample: {
        prompt: "A cycle bought for ₹4,800 is sold for ₹5,400. Find the profit percentage.",
        steps: [
          "Profit \\(= 5400 - 4800 = 600\\).",
          "Profit % \\(= \\frac{600}{4800} \\times 100 = 12.5\\%\\).",
          "Fraction route: \\(\\frac{600}{4800} = \\frac{1}{8}\\), and one eighth is \\(12\\frac{1}{2}\\%\\).",
        ],
        answer: "12.5%",
      },
      selfCheckExample: {
        prompt: "A lamp is sold for ₹1,035 at a profit of 15%. Find its cost price.",
        steps: ["\\(CP = \\frac{1035}{1.15}\\).", "\\(= 900\\). Check: 15% of 900 is 135, and 900 + 135 = 1,035."],
        answer: "₹900",
      },
      practiceSet: [
        { prompt: "A bag costs ₹640 and is sold at a loss of 25%. Find its selling price.", answer: "₹480" },
        { prompt: "A man's profit is one-fourth of his selling price. What is his profit percentage on cost?", answer: "\\(33\\frac{1}{3}\\%\\)" },
        { prompt: "The profit on an article is 40% of its cost. Find the ratio of cost price to selling price.", answer: "5 : 7" },
        {
          prompt: "A phone bought for ₹9,000 is repaired for ₹1,000 and sold for ₹12,000. Find the profit percentage.",
          answer: "20% (the cost is ₹10,000)",
        },
      ],
      pyqExampleId: "4e747dfb-d162-4e44-83dc-b8de2e30bb5b",
      traps: [
        {
          title: "Taking the profit on the selling price",
          body:
            "Profit percentage uses the cost price as its base. A profit of one-sixth of the selling price is one-fifth of the cost, so it is 20%, not \\(16\\frac{2}{3}\\%\\).",
        },
        {
          title: "Leaving out the overheads",
          body: "Transport or repair money is part of what the trader paid. Add it to the cost price first, or the profit comes out too large.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscpppl-two",
      name: "Two selling prices of the same article",
      intuition:
        "When a question gives two different selling prices for the same article, its cost price is the same in both. So the gap between the two selling prices is the gap between the two percentages, taken of that one cost price.",
      definition:
        "- \\(SP_2 - SP_1 = \\frac{p_2 - p_1}{100} \\times CP\\), with a loss written as a negative profit. From a 5% loss to a 5% gain is a swing of 10%.\n" +
        "- If the profit at one price **equals** the loss at another (in rupees or in per cent), the cost price is halfway between them: \\(CP = \\frac{SP_1 + SP_2}{2}\\).\n" +
        "- For 'if the selling price doubles, the profit becomes k times', write the profits as \\(S - C\\) and \\(2S - C\\) and set \\(2S - C = k(S - C)\\).\n" +
        "- **Fast route:** the options are cost prices. Put one in and see whether both selling prices fit.",
      formula: {
        label: "Swing between two selling prices",
        latex: "SP_2 - SP_1 = \\frac{p_2 - p_1}{100} \\times CP \\qquad CP = \\frac{SP_1 + SP_2}{2} \\text{ (equal profit and loss)}",
      },
      authoredExample: {
        prompt: "A fan sold at a loss of 8% would have given a profit of 12% if it had been sold for ₹240 more. Find its cost price.",
        steps: [
          "The swing is from \\(-8\\%\\) to \\(+12\\%\\), which is 20% of the cost price.",
          "\\(20\\%\\) of CP is 240, so \\(CP = \\frac{240 \\times 100}{20} = 1200\\).",
          "Check: \\(0.92 \\times 1200 = 1104\\) and \\(1.12 \\times 1200 = 1344\\), which differ by 240.",
        ],
        answer: "₹1,200",
      },
      selfCheckExample: {
        prompt: "If the selling price of a book is tripled, the profit becomes five times. Find the profit percentage.",
        steps: [
          "With cost C and price S: \\(3S - C = 5(S - C)\\).",
          "\\(3S - C = 5S - 5C\\), so \\(4C = 2S\\) and \\(S = 2C\\).",
          "The profit is C on a cost of C, which is 100%.",
        ],
        answer: "100%",
      },
      practiceSet: [
        { prompt: "A pen sold at a 6% loss would give a 4% gain if sold for ₹15 more. Find the cost price.", answer: "₹150" },
        { prompt: "The profit when an article is sold for ₹960 equals the loss when it is sold for ₹840. Find the cost price.", answer: "₹900" },
        {
          prompt: "An article is sold at a 10% profit. Had it been sold for ₹60 more, the profit would have been 15%. Find the cost price.",
          answer: "₹1,200",
        },
      ],
      pyqExampleId: "7b0f3fea-3c48-422b-b48c-33a03e733d19",
      traps: [
        {
          title: "Subtracting a loss from a profit",
          body: "From a 16% loss to a 20% gain the price moves by 36% of the cost, not 4%. A loss sits on the other side of zero.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscpppl-chain",
      name: "An article sold through several hands",
      intuition:
        "When A sells to B and B sells to C, B's cost price is A's selling price. Each sale multiplies the price by its own factor, exactly like successive percentage changes.",
      definition:
        "- Final price \\(=\\) first cost \\(\\times \\left(1 + \\frac{p_1}{100}\\right)\\left(1 + \\frac{p_2}{100}\\right)\\cdots\\), with a loss as \\(1 - \\frac{l}{100}\\).\n" +
        "- To find one dealer's share when the total is known, divide the factors: second factor \\(=\\) total factor \\(\\div\\) first factor.\n" +
        "- Selling at a loss and putting all the money into a second deal works the same way: multiply the two factors.",
      formula: {
        label: "Price after two sales",
        latex: "\\text{final} = C\\left(1 + \\frac{p_1}{100}\\right)\\left(1 + \\frac{p_2}{100}\\right)",
      },
      authoredExample: {
        prompt: "A sells a bicycle to B at a 10% profit, and B sells it to C at a 20% profit. C pays ₹3,960. What did A pay for it?",
        steps: ["Combined factor: \\(1.1 \\times 1.2 = 1.32\\).", "A's cost \\(= \\frac{3960}{1.32} = 3000\\)."],
        answer: "₹3,000",
      },
      selfCheckExample: {
        prompt: "A trader sells goods at a 10% loss and spends all the money on new goods, which he sells at a 20% profit. Find his overall gain percentage.",
        steps: ["\\(0.9 \\times 1.2 = 1.08\\).", "An 8% gain on the money he started with."],
        answer: "8%",
      },
      practiceSet: [
        {
          prompt: "A sells a watch to B at a 25% gain and B sells it to C at a 20% loss. What does C pay as a percentage of A's cost?",
          answer: "100% (\\(1.25 \\times 0.8 = 1\\))",
        },
        { prompt: "Goods pass through two dealers, each making a 10% profit, and the customer pays ₹605. What was the first cost?", answer: "₹500" },
      ],
      pyqExampleId: "1b935ca9-d1f1-46aa-a9af-4d8d145685fe",
      traps: [
        {
          title: "Adding the dealers' profits",
          body: "Profits of 20% and then 40% make a factor of \\(1.2 \\times 1.4 = 1.68\\), a total of 68%, not 60%.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscpppl-total",
      name: "Overall profit on several items or lots",
      intuition:
        "When several items or lots are sold at different rates, the overall profit is total profit over total cost. The separate percentages can only be averaged when every item cost the same.",
      definition:
        "- Overall % \\(= \\frac{\\text{total SP} - \\text{total CP}}{\\text{total CP}} \\times 100\\).\n" +
        "- **Equal costs:** average the percentages. A gain of 8% on one and a loss of 6% on an equal-cost other is a 1% gain overall.\n" +
        "- **Equal or ratio selling prices:** find each cost by dividing its SP by its factor, then add the costs.\n" +
        "- **Parts of one stock:** weight each rate by its share of the cost. Five-eighths at a 20% gain and the rest at cost give \\(\\frac{5}{8} \\times 20 = 12.5\\%\\).\n" +
        "- **Mixtures:** cost per kg of the mix \\(=\\) total cost \\(\\div\\) total kg.\n" +
        "- Spoilt or thrown-away stock still counts in the cost; only the rest brings in money.",
      formula: {
        label: "Overall profit",
        latex: "\\text{overall}\\% = \\frac{\\sum SP - \\sum CP}{\\sum CP} \\times 100",
      },
      authoredExample: {
        prompt:
          "A trader buys 40 kg of sugar at ₹45 per kg and 60 kg at ₹50 per kg, mixes them and sells the mixture at ₹52 per kg. Find his profit percentage.",
        steps: [
          "Cost \\(= 40 \\times 45 + 60 \\times 50 = 1800 + 3000 = 4800\\).",
          "Sale \\(= 100 \\times 52 = 5200\\), so the profit is 400.",
          "Profit % \\(= \\frac{400}{4800} \\times 100 = 8\\frac{1}{3}\\%\\).",
        ],
        answer: "\\(8\\frac{1}{3}\\%\\)",
      },
      selfCheckExample: {
        prompt: "Two phones are sold for ₹6,000 each, one at a 20% profit and the other at a 20% loss. Find the overall profit or loss percentage.",
        steps: [
          "Costs: \\(\\frac{6000}{1.2} = 5000\\) and \\(\\frac{6000}{0.8} = 7500\\), total 12,500.",
          "Sales total 12,000, a loss of 500.",
          "Loss % \\(= \\frac{500}{12500} \\times 100 = 4\\%\\).",
        ],
        answer: "A 4% loss",
      },
      practiceSet: [
        { prompt: "Two items cost ₹2,000 each. One is sold at a 15% profit and the other at a 5% loss. Find the overall profit percentage.", answer: "5%" },
        { prompt: "A grocer buys 100 eggs for ₹500. 10 break, and he sells the rest at ₹6 each. Find his profit percentage.", answer: "8% (₹540 against ₹500)" },
        {
          prompt: "Units that all cost the same are sold, half at a 30% profit and half at a 10% loss. What is the overall profit percentage?",
          answer: "10%",
        },
      ],
      pyqExampleId: "70c84884-62ff-4a3c-997b-f80a9fb29181",
      traps: [
        {
          title: "Averaging percentages on different costs",
          body:
            "Two articles sold at the same price, one at a 20% gain and one at a 20% loss, always give a 4% loss overall, not zero, because the loss-making one cost more.",
        },
        {
          title: "Leaving the spoilt stock out of the cost",
          body: "Broken eggs or withered flowers were paid for. Their cost stays in the total cost; only the sales shrink.",
        },
      ],
    },
  ],
};
