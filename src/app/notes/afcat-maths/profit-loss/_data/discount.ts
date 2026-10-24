import type { SubtopicNote } from "@/app/notes/_types";

export const AF_PL_DISCOUNT_NOTE: SubtopicNote = {
  subtopicName: "Marked Price and Discounts",
  title: "Marked Price, Discount and Successive Discounts",
  oneLineDefinition:
    "A discount is taken on the marked price and a profit on the cost price; successive discounts multiply, and a markup followed by a discount is one product of two multipliers.",
  whyItMatters:
    "Two bases meet on this page: the discount is on the marked price and the profit on the cost. One AFCAT past-year question, from 2016, asks for the cost from a marked price, a discount and a profit. Most lost marks come from adding successive discounts or taking a profit on the marked price.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "afpl-discount-basic",
      name: "Discount on the marked price",
      intuition:
        "The **marked price** (MP), also called the list or label price, is the price on the tag. A discount is a percentage of the MP, and the customer pays the rest.",
      definition:
        "- Discount \\(= MP - SP\\); discount % \\(= \\dfrac{\\text{discount}}{MP} \\times 100\\).\n" +
        "- After a \\(d\\%\\) discount, \\(SP = MP\\left(1 - \\tfrac{d}{100}\\right)\\), so \\(MP = SP \\div \\left(1 - \\tfrac{d}{100}\\right)\\).\n" +
        "- Two discounts compared on the same MP: the extra \\(d\\%\\) is worth \\(d\\%\\) of the MP.",
      formula: {
        label: "Selling price after a discount",
        latex: "SP = MP\\left(1 - \\dfrac{d}{100}\\right)",
      },
      authoredExample: {
        prompt: "A jacket marked ₹2,400 is sold for ₹1,980. Find the discount per cent. At what price would a \\(20\\%\\) discount sell it?",
        steps: [
          "Discount \\(= 2400 - 1980 = 420\\), and \\(\\dfrac{420}{2400} \\times 100 = 17.5\\%\\).",
          "At \\(20\\%\\) off: \\(2400 \\times 0.8 = 1920\\).",
        ],
        answer: "\\(17.5\\%\\); ₹1,920.",
      },
      selfCheckExample: {
        prompt: "After a discount of \\(15\\%\\), a fan costs ₹2,040. Find its marked price.",
        steps: ["\\(MP = \\dfrac{2040}{0.85} = 2400\\)."],
        answer: "₹2,400.",
      },
      practiceSet: [
        { prompt: "An article marked ₹750 is sold at a discount of \\(8\\%\\). Find the selling price.", answer: "₹690" },
        { prompt: "An article marked ₹1,200 is sold for ₹1,020. Find the discount per cent.", answer: "\\(15\\%\\)" },
        { prompt: "A discount of \\(30\\%\\) instead of \\(18\\%\\) saves a buyer ₹300 more. Find the marked price.", answer: "₹2,500" },
        { prompt: "An article costs ₹57 after a discount of \\(5\\%\\). Find its marked price.", answer: "₹60" },
      ],
      pyqExampleId: "021b2a8d-5e93-4fc4-bd46-65872801b926",
      traps: [
        {
          title: "The discount is on the marked price",
          body: "A jacket marked ₹2,400 sold for ₹1,980 has a discount of 420 on 2400, \\(17.5\\%\\). Dividing by 1980 gives \\(21.2\\%\\), which no shop means.",
        },
        {
          title: "Divide to undo a discount",
          body: "A price of ₹960 after a \\(20\\%\\) discount comes from \\(MP = 960 \\div 0.8 = 1200\\). Adding \\(20\\%\\) to 960 gives 1152.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afpl-successive",
      name: "Successive discounts",
      intuition:
        "The second discount is taken on the price left after the first, so the multipliers multiply. Two discounts together are always worth less than their sum.",
      definition:
        "- Discounts of \\(a\\%\\) then \\(b\\%\\): the buyer pays \\(\\left(1 - \\tfrac{a}{100}\\right)\\left(1 - \\tfrac{b}{100}\\right)\\) of the MP.\n" +
        "- The **single equivalent discount** is \\(a + b - \\dfrac{ab}{100}\\) per cent.\n" +
        "- The order of the discounts does not matter.\n" +
        "- Three discounts: multiply three factors, or combine two at a time.",
      formula: {
        label: "Single equivalent of two discounts",
        latex: "a + b - \\dfrac{ab}{100}",
      },
      authoredExample: {
        prompt: "Find the single discount equivalent to successive discounts of \\(25\\%\\) and \\(12\\%\\).",
        steps: [
          "\\(25 + 12 - \\dfrac{25 \\times 12}{100} = 37 - 3 = 34\\).",
          "Check: \\(0.75 \\times 0.88 = 0.66\\), so the buyer pays \\(66\\%\\).",
        ],
        answer: "\\(34\\%\\).",
      },
      selfCheckExample: {
        prompt: "An item marked ₹1,600 gets successive discounts of \\(15\\%\\) and \\(5\\%\\). Find the price paid.",
        steps: ["\\(1600 \\times 0.85 = 1360\\).", "\\(1360 \\times 0.95 = 1292\\)."],
        answer: "₹1,292.",
      },
      practiceSet: [
        { prompt: "Find the single discount equivalent to \\(30\\%\\) and \\(15\\%\\).", answer: "\\(40.5\\%\\)" },
        { prompt: "Successive discounts of \\(40\\%\\) and \\(5\\%\\) are given on ₹2,000. Find the price paid.", answer: "₹1,140" },
        { prompt: "Find the single discount equivalent to \\(5\\%\\), \\(15\\%\\) and \\(25\\%\\).", answer: "\\(39.4375\\%\\)", method: "\\(0.95 \\times 0.85 \\times 0.75 = 0.605625\\)." },
        { prompt: "Successive discounts of \\(50\\%\\) and \\(30\\%\\) equal a single discount of ₹650. Find the marked price.", answer: "₹1,000" },
      ],
      pyqExampleId: "3ba1adf5-3558-4226-b1bf-cad6f5655439",
      traps: [
        {
          title: "Discounts do not add",
          body: "\\(25\\%\\) and \\(12\\%\\) together are \\(34\\%\\), not \\(37\\%\\): the \\(12\\%\\) is taken on a price already cut.",
        },
        {
          title: "A rupee figure is a share of the marked price",
          body: "If the equivalent discount comes to a rupee amount, that amount is the single percentage of the MP. Divide by the percentage, not by what the buyer paid.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afpl-markup-discount",
      name: "Markup, then discount",
      intuition:
        "Marking up by \\(m\\%\\) multiplies the cost by \\(1 + \\tfrac{m}{100}\\); the discount then multiplies by \\(1 - \\tfrac{d}{100}\\). The profit is however much the product exceeds 1.",
      definition:
        "- \\(SP = CP\\left(1 + \\tfrac{m}{100}\\right)\\left(1 - \\tfrac{d}{100}\\right)\\).\n" +
        "- Profit % \\(= m - d - \\dfrac{md}{100}\\); a negative answer is a loss.\n" +
        "- A markup and a discount of the same rate always lose: \\(20\\%\\) up and \\(20\\%\\) off leaves 0.96 of the cost.\n" +
        "- To compare two discount plans on one MP, take the cost as 100 and work out each selling price.",
      formula: {
        label: "Profit after a markup and a discount",
        latex: "\\text{Profit}\\% = m - d - \\dfrac{md}{100}",
      },
      authoredExample: {
        prompt: "A shopkeeper marks his goods \\(50\\%\\) above cost and allows a discount of \\(12\\%\\). Find his profit per cent.",
        steps: [
          "\\(1.5 \\times 0.88 = 1.32\\).",
          "Or by the formula: \\(50 - 12 - \\dfrac{50 \\times 12}{100} = 32\\).",
        ],
        answer: "\\(32\\%\\).",
      },
      selfCheckExample: {
        prompt: "Goods costing ₹800 are marked \\(30\\%\\) above cost and sold at a discount of \\(15\\%\\). Find the profit.",
        steps: ["\\(MP = 1040\\).", "\\(SP = 1040 \\times 0.85 = 884\\)."],
        answer: "₹84.",
      },
      practiceSet: [
        { prompt: "Goods are marked \\(60\\%\\) above cost and sold at a discount of \\(25\\%\\). Find the profit per cent.", answer: "\\(20\\%\\)" },
        { prompt: "Goods are marked \\(25\\%\\) above cost and sold at a discount of \\(20\\%\\). Find the profit or loss.", answer: "No profit, no loss" },
        { prompt: "Goods are marked \\(35\\%\\) above cost and sold at a discount of \\(20\\%\\). Find the profit per cent.", answer: "\\(8\\%\\)" },
        { prompt: "An article costing ₹600 is marked \\(45\\%\\) above cost and sold at a discount of \\(20\\%\\). Find the selling price.", answer: "₹696" },
      ],
      pyqExampleId: "49eab768-f593-4889-8b3a-87d9dd2cdf6a",
      traps: [
        {
          title: "Subtracting the rates overstates the profit",
          body: "\\(50\\%\\) up and \\(12\\%\\) off is a profit of \\(32\\%\\), not \\(38\\%\\): the discount is taken on the raised price.",
        },
        {
          title: "Same rate up and down is a loss",
          body: "\\(30\\%\\) up and \\(30\\%\\) off gives \\(1.3 \\times 0.7 = 0.91\\) of the cost, a \\(9\\%\\) loss, not 'no profit, no loss'.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afpl-mp-for-target",
      name: "Marked price for a target profit",
      intuition:
        "Work backwards from the cost. The target profit gives the selling price, and the discount says what fraction of the marked price that selling price is.",
      definition:
        "- \\(MP = CP \\times \\dfrac{100 + p}{100 - d}\\).\n" +
        "- The markup needed is \\(\\dfrac{100 + p}{100 - d} - 1\\).\n" +
        "- From the MP back to the cost: \\(CP = MP \\times \\dfrac{100 - d}{100 + p}\\).\n" +
        "- Discount needed for a target profit: get the SP from the cost, then the discount is \\(\\dfrac{MP - SP}{MP}\\).\n" +
        "- A retailer who buys at a discount on the list price and sells at a smaller discount: his CP and SP are both shares of the list price.",
      formula: {
        label: "Marked price for a target",
        latex: "MP = CP \\times \\dfrac{100 + p}{100 - d}",
      },
      authoredExample: {
        prompt: "A dealer wants a profit of \\(17\\%\\) after allowing a discount of \\(22\\%\\). By what per cent above cost must he mark his goods?",
        steps: ["\\(\\dfrac{1.17}{0.78} = 1.5\\).", "So the marked price is 1.5 times the cost."],
        answer: "\\(50\\%\\) above cost.",
      },
      selfCheckExample: {
        prompt: "An article marked ₹720 is sold at a discount of \\(15\\%\\) and still gives a profit of \\(20\\%\\). Find its cost price.",
        steps: ["\\(SP = 720 \\times 0.85 = 612\\).", "\\(CP = \\dfrac{612}{1.2} = 510\\)."],
        answer: "₹510.",
      },
      practiceSet: [
        { prompt: "An article costs ₹450. What should its marked price be for a \\(20\\%\\) profit after a \\(25\\%\\) discount?", answer: "₹720" },
        { prompt: "After a \\(20\\%\\) discount a trader still gains \\(12\\%\\). How far above cost are his goods marked?", answer: "\\(40\\%\\)" },
        { prompt: "An article costing ₹400 is marked ₹600. What discount per cent gives a \\(20\\%\\) profit?", answer: "\\(20\\%\\)" },
        { prompt: "A retailer buys at \\(20\\%\\) off the list price and sells at \\(4\\%\\) off it. Find his profit per cent.", answer: "\\(20\\%\\)" },
      ],
      pyqExampleId: "b021f2aa-a63a-4a1d-a01c-ead2147a06cd",
      traps: [
        {
          title: "Divide by the discount factor",
          body: "A selling price of ₹612 after \\(15\\%\\) off means \\(MP = 612 \\div 0.85 = 720\\). Multiplying by 1.15 gives 703.80.",
        },
        {
          title: "The profit is on the cost, not on the marked price",
          body: "A \\(20\\%\\) profit is \\(20\\%\\) of the cost. Taking it on the marked price gives a selling price that is too high.",
        },
      ],
    },
  ],
};
