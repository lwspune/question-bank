import type { SubtopicNote } from "@/app/notes/_types";

export const SSC2_PP_PROFIT_NOTE: SubtopicNote = {
  subtopicName: "Profit and Loss",
  title: "Profit and Loss",
  oneLineDefinition:
    "Profit and loss are percentages of the cost price: the selling price is the cost times a factor, two selling prices are linked through one cost, and several deals or a chain of sellers are totalled or multiplied, never averaged.",
  whyItMatters:
    "20 questions in the Tier II bank, 17 EASY and 3 MODERATE; with the discount page, it is the largest page of the chapter. Nearly every one is solved by naming the cost price C and writing one line in it.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssc2pppl-basics",
      name: "Profit and loss on the cost price",
      intuition:
        "Unless a stem says otherwise, profit and loss are measured against the cost price. A 20% profit means the selling price is 1.2 times the cost, so the cost is the selling price divided by 1.2.",
      definition:
        "- Profit % \\(= \\frac{SP - CP}{CP} \\times 100\\); \\(SP = CP \\times \\left(1 + \\frac{p}{100}\\right)\\), and a loss uses \\(1 - \\frac{l}{100}\\).\n" +
        "- Two selling prices share one cost, so \\(\\frac{SP_2}{SP_1} = \\frac{100 + p_2}{100 + p_1}\\) (a loss enters as a negative \\(p\\)).\n" +
        "- 'Profit is \\(r\\%\\) of the **selling** price' is a different base: then the cost is \\((100 - r)\\%\\) of the selling price.\n" +
        "- ₹8 more on the price for 10 more points of profit means 10% of the cost is ₹8, so the cost is ₹80.",
      formula: {
        label: "Selling price from cost, and one price from another",
        latex: "SP = CP\\left(1 + \\frac{p}{100}\\right), \\quad \\frac{SP_2}{SP_1} = \\frac{100 + p_2}{100 + p_1}",
      },
      authoredExample: {
        prompt: "A trader sells a bag for ₹1,560 and makes a 20% profit. At what price should he sell it to make a 35% profit?",
        steps: [
          "Cost \\(= 1560 \\div 1.2 = 1300\\).",
          "Price for a 35% profit \\(= 1300 \\times 1.35 = 1755\\).",
          "Check with the ratio: \\(1560 \\times \\frac{135}{120} = 1755\\).",
        ],
        answer: "₹1,755",
      },
      selfCheckExample: {
        prompt: "A watch sold at a 12% loss fetches ₹2,640. At what price would it give a 10% profit?",
        steps: ["Cost \\(= 2640 \\div 0.88 = 3000\\).", "Price for a 10% profit \\(= 3000 \\times 1.1 = 3300\\)."],
        answer: "₹3,300",
      },
      practiceSet: [
        { prompt: "A book costs ₹250 and is sold for ₹290. Find the profit percentage.", answer: "16%" },
        { prompt: "Selling an item for ₹27 more turns a 10% profit into a 19% profit. Find its cost price.", answer: "₹300", method: "9% of the cost is ₹27." },
        { prompt: "A seller's profit is 25% of his selling price. Find his profit as a percentage of his cost price.", answer: "\\(33\\frac{1}{3}\\%\\)", method: "Cost is 75% of the selling price, so profit is \\(\\frac{25}{75}\\) of cost." },
      ],
      pyqExampleId: "69b14c28-c089-417c-8d9a-e05c7018583c",
      traps: [
        {
          title: "Reading a profit on cost as a profit on price",
          body: "Cost ₹500 and a 20% profit give a price of ₹600. The profit, ₹100, is \\(16\\frac{2}{3}\\%\\) of the price, not 20%. Check which base the stem names.",
        },
        {
          title: "Finding the cost by cutting the profit off the price",
          body: "If ₹660 includes a 10% profit, the cost is \\(660 \\div 1.1 = 600\\), not \\(660 - 66 = 594\\). The 10% was of the cost, which is the smaller number.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2pppl-equations",
      name: "Two selling prices, one cost price",
      intuition:
        "Many stems give two selling prices and link the gain at one to the loss at the other. Call the cost price C. Each selling price gives a gain or a loss in C, and the link between them is one equation.",
      definition:
        "- Gain at the higher price \\(= SP_1 - C\\); loss at the lower price \\(= C - SP_2\\).\n" +
        "- 'The gain is \\(k\\) times the loss': \\(SP_1 - C = k(C - SP_2)\\), so \\(C = \\frac{SP_1 + k\\,SP_2}{1 + k}\\).\n" +
        "- When the gain equals the loss (\\(k = 1\\)), the cost is the average of the two prices.\n" +
        "- If a stem changes the cost AND the price (cost cut by 30%, price raised by ₹144), write the new profit line with the new cost on the right.",
      formula: {
        label: "Cost from a gain and a loss",
        latex: "C = \\frac{SP_1 + k\\,SP_2}{1 + k} \\text{ when } SP_1 - C = k\\,(C - SP_2)",
      },
      authoredExample: {
        prompt: "Selling a cycle for ₹4,200 gives a gain 3 times the loss made by selling it for ₹3,400. Find its cost price.",
        steps: [
          "\\(4200 - C = 3(C - 3400)\\).",
          "\\(4C = 4200 + 10200 = 14400\\), so \\(C = 3600\\).",
          "Check: gain 600, loss 200, and \\(600 = 3 \\times 200\\).",
        ],
        answer: "₹3,600",
      },
      selfCheckExample: {
        prompt: "The profit from selling a lamp for ₹920 equals the loss from selling it for ₹680. Find the cost price and the profit percentage at ₹920.",
        steps: ["Equal gain and loss: \\(C = \\frac{920 + 680}{2} = 800\\).", "Profit at ₹920 \\(= \\frac{120}{800} \\times 100 = 15\\%\\)."],
        answer: "₹800, and a 15% profit",
      },
      practiceSet: [
        { prompt: "Selling a fan for ₹1,150 gains twice what selling it for ₹1,000 loses. Find the cost price.", answer: "₹1,050", method: "\\(\\frac{1150 + 2 \\times 1000}{3}\\)" },
        { prompt: "An article is sold at a 10% loss. Sold for ₹90 more, it would give a 5% profit. Find its cost price.", answer: "₹600", method: "15% of the cost is ₹90." },
        { prompt: "An item is sold at a 20% loss. If its cost were halved and the price kept the same, what would the profit percentage be?", answer: "60%", method: "\\(\\frac{0.8C}{0.5C} = 1.6\\)" },
      ],
      pyqExampleId: "c49d34d7-0393-4d52-a4b8-29278df130cf",
      traps: [
        {
          title: "Writing the loss as SP minus C",
          body: "Below the cost price the loss is \\(C - SP\\). Writing \\(SP - C\\) makes the loss negative and the equation gives a wrong cost.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2pppl-chains",
      name: "Overall profit and chains of sellers",
      intuition:
        "When an item passes through several hands, each profit or loss multiplies the price. When several items are sold, total the costs and the takings first and take one percentage of the total.",
      definition:
        "- A chain of sellers: final price \\(=\\) first cost \\(\\times \\left(1 \\pm \\frac{p_1}{100}\\right)\\left(1 \\pm \\frac{p_2}{100}\\right)\\cdots\\)\n" +
        "- Overall profit % on several deals \\(= \\frac{\\text{total SP} - \\text{total CP}}{\\text{total CP}} \\times 100\\). It is never the plain average of the separate percentages.\n" +
        "- Two items sold at the SAME price, one at \\(a\\%\\) profit and the other at \\(a\\%\\) loss, always give an overall loss of \\(\\frac{a^2}{100}\\%\\).\n" +
        "- 'No profit, no loss overall' means total selling price \\(=\\) total cost.",
      formula: {
        label: "Overall profit on several deals",
        latex: "\\text{overall}\\% = \\frac{\\sum SP - \\sum CP}{\\sum CP} \\times 100",
      },
      authoredExample: {
        prompt: "X sells a phone to Y at a 25% profit, and Y sells it to Z at a 12% loss. Z pays ₹8,800. What did X pay for it?",
        steps: ["The two steps multiply the price by \\(1.25 \\times 0.88 = 1.1\\).", "X paid \\(8800 \\div 1.1 = 8000\\)."],
        answer: "₹8,000",
      },
      selfCheckExample: {
        prompt: "Two scooters are sold for ₹30,000 apiece. One earns its seller a 25% profit and the other a 25% loss. Find the overall profit or loss percentage.",
        steps: [
          "Costs: \\(30000 \\div 1.25 = 24000\\) and \\(30000 \\div 0.75 = 40000\\), so ₹64,000 in all.",
          "Takings ₹60,000, a loss of ₹4,000, which is \\(\\frac{4000}{64000} = 6.25\\%\\). The rule \\(\\frac{25^2}{100} = 6.25\\) agrees.",
        ],
        answer: "A 6.25% loss",
      },
      practiceSet: [
        { prompt: "A man buys two plots for ₹2 lakh and ₹3 lakh and sells them for ₹2.4 lakh and ₹2.85 lakh. Find his overall profit percentage.", answer: "5%", method: "₹0.25 lakh on ₹5 lakh" },
        { prompt: "An item passes through two traders, each adding a 20% profit. The second sells it for ₹720. What did the first pay?", answer: "₹500", method: "\\(720 \\div 1.44\\)" },
        { prompt: "Two items are sold for ₹600 each, one at a 25% profit and one at a 25% loss. Find the overall loss in rupees.", answer: "₹80", method: "Costs ₹480 and ₹800 against takings of ₹1,200." },
      ],
      pyqExampleId: "50980dff-9e2c-4b52-8126-b773c446f21f",
      traps: [
        {
          title: "Averaging the percentages of two deals",
          body: "A 20% profit on ₹1,000 and a 10% loss on ₹4,000 is not a 5% profit. It is \\(200 - 400 = -200\\) on ₹5,000, a 4% loss.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2pppl-weights",
      name: "Faulty weights and article counts",
      intuition:
        "A seller who gives less than he charges for earns from the quantity as well as from the price. The two effects multiply. A buyer cheated by a short weight loses in the same way, from the other side.",
      definition:
        "- Gain from the weight alone \\(= \\frac{\\text{true} - \\text{false}}{\\text{false}} \\times 100\\). The base is what he gives.\n" +
        "- With a mark-up or a discount as well: real factor \\(=\\) price factor \\(\\times \\frac{\\text{true}}{\\text{false}}\\).\n" +
        "- A buyer given a 950 g 'kilogram' receives 0.95 kg for each kilogram he pays for.\n" +
        "- 'Cost of \\(x\\) articles \\(=\\) selling price of \\(y\\)' gives a profit of \\(\\frac{x - y}{y} \\times 100\\) (a loss when \\(y > x\\)).",
      formula: {
        label: "Real profit with a short weight",
        latex: "1 + \\frac{g}{100} = \\text{price factor} \\times \\frac{\\text{true weight}}{\\text{false weight}}",
      },
      authoredExample: {
        prompt: "A shopkeeper sells at 10% below cost but gives only 800 g for every kilogram. Find his real gain or loss percentage.",
        steps: ["Price factor 0.9; weight factor \\(\\frac{1000}{800} = 1.25\\).", "Real factor \\(= 0.9 \\times 1.25 = 1.125\\), a gain of 12.5%."],
        answer: "A 12.5% gain",
      },
      selfCheckExample: {
        prompt: "The selling price of 20 pens equals the cost price of 25 pens. Find the profit percentage.",
        steps: ["Let one pen cost ₹1, so 20 pens sell for ₹25.", "Profit \\(= \\frac{25 - 20}{20} \\times 100 = 25\\%\\)."],
        answer: "25%",
      },
      practiceSet: [
        { prompt: "A dealer charges the cost price but gives 875 g for a kilogram. Find his gain percentage.", answer: "\\(14\\frac{2}{7}\\%\\)", method: "\\(\\frac{125}{875} = \\frac{1}{7}\\)" },
        { prompt: "A trader buys with a weight 10% heavier than true and sells with a weight 10% lighter, at the cost price both times. Find his gain percentage.", answer: "\\(22\\frac{2}{9}\\%\\)", method: "\\(\\frac{1.1}{0.9} = \\frac{11}{9}\\)" },
        { prompt: "The cost price of 9 bulbs equals the selling price of 12 bulbs. Find the profit or loss percentage.", answer: "A 25% loss", method: "\\(\\frac{12 - 9}{12} \\times 100\\)" },
      ],
      pyqExampleId: "cbab3290-b394-4670-a8b0-584317c013ac",
      traps: [
        {
          title: "Dividing by the true weight",
          body: "Giving 800 g for a kilogram at cost price is a gain of \\(\\frac{200}{800} = 25\\%\\), not 20%. The base is the 800 g actually handed over.",
        },
      ],
    },
  ],
};
