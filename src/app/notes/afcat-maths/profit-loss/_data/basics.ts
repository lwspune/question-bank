import type { SubtopicNote } from "@/app/notes/_types";

export const AF_PL_BASICS_NOTE: SubtopicNote = {
  subtopicName: "Profit and Loss Percentage",
  title: "Cost Price, Selling Price and Profit Per Cent",
  oneLineDefinition:
    "Profit or loss is the gap between the selling price and the cost price, and its percentage is taken on the cost price unless the question says otherwise.",
  whyItMatters:
    "Every later page comes down to two moves made here: a percentage taken on the cost price, and a multiplier such as 1.2 or 0.85. No row on this page is HARD; the marks go on dividing by the selling price instead of the cost, or on adding a percentage where the question needs a division.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "afpl-profit-percent",
      name: "Profit, loss and their percentages",
      intuition:
        "The **cost price** (CP) is what the seller paid and the **selling price** (SP) is what he got. If SP is more, the difference is a profit; if it is less, a loss. A percentage needs a base, and in profit and loss the base is the cost price.",
      definition:
        "- Profit \\(= SP - CP\\); loss \\(= CP - SP\\).\n" +
        "- Profit % \\(= \\dfrac{\\text{profit}}{CP} \\times 100\\); loss % \\(= \\dfrac{\\text{loss}}{CP} \\times 100\\).\n" +
        "- A **markup** of \\(x\\%\\) means a price \\(x\\%\\) above the cost price, so a markup percentage is also taken on the cost.\n" +
        "- Per-unit and whole-lot figures give the same percentage: bought at ₹24 a kg and sold at ₹30 a kg is a profit of 6 on 24, that is \\(25\\%\\), however many kg are sold.\n" +
        "- Given the SP and the profit in rupees, subtract first: the cost is SP minus profit.",
      formula: {
        label: "Profit per cent",
        latex: "\\text{Profit}\\% = \\dfrac{SP - CP}{CP} \\times 100",
      },
      authoredExample: {
        prompt: "A shopkeeper buys a lamp for ₹640 and sells it for ₹800. Find his profit and his profit per cent.",
        steps: [
          "Profit \\(= 800 - 640 = 160\\).",
          "On the cost: \\(\\dfrac{160}{640} \\times 100 = 25\\%\\).",
        ],
        answer: "₹160, a profit of \\(25\\%\\).",
      },
      selfCheckExample: {
        prompt: "A cycle bought for ₹3,200 is sold for ₹2,720. Find the loss per cent.",
        steps: ["Loss \\(= 3200 - 2720 = 480\\).", "\\(\\dfrac{480}{3200} \\times 100 = 15\\%\\)."],
        answer: "\\(15\\%\\) loss.",
      },
      practiceSet: [
        { prompt: "An article bought for ₹450 is sold for ₹540. Find the profit per cent.", answer: "\\(20\\%\\)" },
        { prompt: "An article bought for ₹1,250 is sold for ₹1,150. Find the loss per cent.", answer: "\\(8\\%\\)" },
        { prompt: "A trader buys an article for ₹360 and marks it at ₹450. What is the markup on cost?", answer: "\\(25\\%\\)" },
        {
          prompt: "A shopkeeper sold goods for ₹1,380 and gained ₹180. Find his gain per cent.",
          answer: "\\(15\\%\\)",
          method: "The cost is \\(1380 - 180 = 1200\\).",
        },
      ],
      pyqExampleId: "ce238007-f592-419a-a999-32cdbe8ff809",
      traps: [
        {
          title: "Divide by the cost price",
          body: "Bought for ₹400 and sold for ₹500: the profit of 100 is \\(25\\%\\) of the cost. Dividing by the selling price gives \\(20\\%\\), which is the wrong base.",
        },
        {
          title: "Find the cost before the percentage",
          body: "When a question gives the selling price and the gain in rupees, the cost is SP minus gain. Taking the gain as a share of the selling price is the usual slip.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afpl-multipliers",
      name: "Selling price and cost price as multiples",
      intuition:
        "A \\(30\\%\\) profit makes the selling price 1.3 times the cost; a \\(15\\%\\) loss makes it 0.85 times the cost. Going from cost to selling price multiplies, and going back divides by the same number.",
      definition:
        "- Profit of \\(x\\%\\): \\(SP = CP\\left(1 + \\tfrac{x}{100}\\right)\\). Loss of \\(x\\%\\): \\(SP = CP\\left(1 - \\tfrac{x}{100}\\right)\\).\n" +
        "- Given the SP, divide: \\(CP = SP \\div \\left(1 \\pm \\tfrac{x}{100}\\right)\\).\n" +
        "- A price change works the same way: after a \\(25\\%\\) fall a price is 0.75 of the old one, so the old price is the new one divided by 0.75.\n" +
        "- Common multipliers: a \\(10\\%\\) gain is 1.1, a \\(12.5\\%\\) gain is \\(1.125 = \\tfrac 98\\), a \\(25\\%\\) loss is \\(0.75 = \\tfrac 34\\).",
      formula: {
        label: "Selling price from cost price",
        latex: "SP = CP\\left(1 \\pm \\dfrac{x}{100}\\right)",
      },
      authoredExample: {
        prompt: "A watch is sold for ₹1,955 at a loss of \\(15\\%\\). Find its cost price.",
        steps: [
          "At a \\(15\\%\\) loss, \\(SP = 0.85 \\times CP\\).",
          "\\(CP = \\dfrac{1955}{0.85} = 2300\\).",
          "Check: \\(2300 \\times 0.85 = 1955\\).",
        ],
        answer: "₹2,300.",
      },
      selfCheckExample: {
        prompt: "An article costs ₹750. At what price must it be sold to gain \\(12\\%\\)?",
        steps: ["\\(750 \\times 1.12 = 840\\)."],
        answer: "₹840.",
      },
      practiceSet: [
        { prompt: "An article costs ₹1,500 and is sold at a loss of \\(6\\%\\). Find the selling price.", answer: "₹1,410" },
        { prompt: "An article sold for ₹1,080 gives a profit of \\(35\\%\\). Find the cost price.", answer: "₹800" },
        { prompt: "After a \\(25\\%\\) fall, sugar costs ₹36 a kg. What did it cost before?", answer: "₹48 a kg" },
        { prompt: "An article sold for ₹2,000 gives a gain of \\(25\\%\\). Find the cost price.", answer: "₹1,600" },
      ],
      pyqExampleId: "cd12d859-e365-4fa3-bf74-ee66107361d9",
      traps: [
        {
          title: "The percentage is of the cost, not of the selling price",
          body: "Sold for ₹1,320 at a \\(10\\%\\) profit: the cost is \\(1320 \\div 1.1 = 1200\\), not \\(1320 - 132 = 1188\\).",
        },
        {
          title: "Undo a fall by dividing",
          body: "After a \\(25\\%\\) fall to ₹36, the old price is \\(36 \\div 0.75 = 48\\). Adding \\(25\\%\\) to 36 gives 45, which is too little.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afpl-cp-sp-ratio",
      name: "Profit from a ratio of cost price to selling price",
      intuition:
        "A ratio \\(CP : SP = a : b\\) lets you take the cost as \\(a\\) and the selling price as \\(b\\). The profit is \\(b - a\\) parts out of \\(a\\).",
      definition:
        "- \\(CP : SP = a : b\\) gives profit % \\(= \\dfrac{b - a}{a} \\times 100\\); it is a loss when \\(b < a\\).\n" +
        "- 'SP is \\(k\\) times CP' is the ratio \\(1 : k\\). An SP double the CP is a \\(100\\%\\) profit.\n" +
        "- 'CP is \\(p\\%\\) of SP': take SP as 100 and CP as \\(p\\).\n" +
        "- A loss stated as a share of the selling price must be converted. A loss of \\(0.1\\,SP\\) makes \\(CP = 1.1\\,SP\\), so the loss is \\(\\dfrac{0.1}{1.1} = 9\\tfrac{1}{11}\\%\\) of the cost.",
      formula: {
        label: "Profit from a ratio",
        latex: "CP : SP = a : b \\;\\Rightarrow\\; \\text{Profit}\\% = \\dfrac{b - a}{a} \\times 100",
      },
      authoredExample: {
        prompt: "The cost price and the selling price of an article are in the ratio \\(8 : 11\\). Find the profit per cent.",
        steps: ["Take the cost as 8 and the selling price as 11.", "The profit is 3 on 8: \\(\\dfrac 38 \\times 100 = 37.5\\%\\)."],
        answer: "\\(37.5\\%\\).",
      },
      selfCheckExample: {
        prompt: "The cost price of an article is \\(60\\%\\) of its selling price. Find the profit per cent.",
        steps: ["Take SP as 100, so CP is 60.", "The profit is 40 on 60: \\(66\\tfrac 23\\%\\)."],
        answer: "\\(66\\tfrac 23\\%\\).",
      },
      practiceSet: [
        { prompt: "\\(CP : SP = 6 : 5\\). Find the loss per cent.", answer: "\\(16\\tfrac 23\\%\\)" },
        { prompt: "The selling price is \\(\\tfrac 74\\) of the cost price. Find the profit per cent.", answer: "\\(75\\%\\)" },
        { prompt: "An article sells for three times its cost. Find the profit per cent.", answer: "\\(200\\%\\)" },
        {
          prompt: "A trader reckons his loss as \\(12.5\\%\\) of the selling price. What is his loss per cent on the cost?",
          answer: "\\(11\\tfrac 19\\%\\)",
          method: "\\(CP = 1.125\\,SP\\), so the loss is \\(\\tfrac{0.125}{1.125}\\) of the cost.",
        },
      ],
      pyqExampleId: "685174f3-d311-43a7-b731-309388ab1a70",
      traps: [
        {
          title: "The base is the cost",
          body: "\\(CP : SP = 3 : 2\\) is a loss of 1 on 3, that is \\(33\\tfrac 13\\%\\). Dividing by the 2 gives \\(50\\%\\).",
        },
        {
          title: "A loss on the selling price is a smaller loss on the cost",
          body: "A loss of \\(10\\%\\) of the selling price is \\(9\\tfrac{1}{11}\\%\\) of the cost. The option that repeats the \\(10\\%\\) answers a different question.",
        },
      ],
    },
  ],
};
