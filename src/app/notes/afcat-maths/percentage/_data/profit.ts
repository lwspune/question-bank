import type { SubtopicNote } from "@/app/notes/_types";

export const AF_PC_PROFIT_NOTE: SubtopicNote = {
  subtopicName: "Profit, Loss and Discount",
  title: "Profit, Loss and Discount with Percentages",
  oneLineDefinition:
    "Profit and loss are percentages of the cost price, discount is a percentage of the marked price: chain cost to marked to selling price, and combine sales made at different rates.",
  whyItMatters:
    "A third of this page is HARD, the most of any page in the chapter. The questions are short, but each one hides a choice of base: profit is on the cost price and discount is on the marked price, and mixing them up gives an answer that is always among the options.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "afpc-profit-loss",
      name: "Profit and loss on the cost price",
      intuition:
        "A 15% profit means the selling price is 1.15 times the cost price. Every profit or loss question is that one multiplication, run forwards or backwards.",
      definition:
        "- **Profit % and loss % are on the cost price (CP).** SP \\(=\\) CP \\(\\times \\left(1 + \\tfrac{p}{100}\\right)\\) for a profit, \\(\\times \\left(1 - \\tfrac{l}{100}\\right)\\) for a loss.\n" +
        "- CP from SP: divide by the same factor.\n" +
        "- Two selling prices for two outcomes: their difference is the difference of the factors times CP. A 12% loss against a 9% gain is 21% of CP.\n" +
        "- 'The profit at ₹940 equals the loss at ₹700' puts CP halfway: \\(\\tfrac{940 + 700}{2}\\).\n" +
        "- CP : SP \\(= 4 : 5\\) means a profit of 1 on 4, which is 25%.",
      formula: {
        label: "Selling price from cost price",
        latex: "SP = CP\\left(1 + \\dfrac{p}{100}\\right), \\qquad CP = \\dfrac{SP}{1 + p/100}",
      },
      authoredExample: {
        prompt: "A trader sells an article at a 12% loss. Had he sold it for ₹126 more, he would have gained 9%. Find the cost price.",
        steps: ["From a 12% loss to a 9% gain is \\(12 + 9 = 21\\%\\) of the cost price.", "\\(126 \\div 0.21 = 600\\)."],
        answer: "₹600.",
      },
      selfCheckExample: {
        prompt: "Selling an article for ₹1,020 gives a 15% loss. At what price should it be sold to gain 20%?",
        steps: ["CP \\(= 1020 \\div 0.85 = 1200\\).", "\\(1200 \\times 1.2 = 1440\\)."],
        answer: "₹1,440.",
      },
      practiceSet: [
        { prompt: "Cost ₹640, sold for ₹720. Find the profit percentage.", answer: "12.5%" },
        { prompt: "Sold for ₹693 at a 10% gain. Find the cost price.", answer: "₹630" },
        { prompt: "The profit when an article is sold for ₹940 equals the loss when it is sold for ₹700. Find the cost price.", answer: "₹820" },
      ],
      pyqExampleId: "0eb2fd59-2696-4303-bd6f-2dcc66cdba60",
      traps: [
        {
          title: "Profit is on cost, not on selling price",
          body: "Bought for ₹640 and sold for ₹720, the profit is 80 on 640, which is 12.5%. Dividing by the selling price gives 11.1%.",
        },
        {
          title: "A loss and a gain add",
          body: "Going from a 12% loss to a 9% gain covers 21% of the cost price. Subtracting the two, 3%, is the usual slip.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afpc-articles",
      name: "Articles bought and sold in different lots",
      intuition:
        "If the cost of 22 articles equals the selling price of 18, then 18 articles bring in what 22 cost. The profit is the 4 extra articles' worth, on the 18 that were sold.",
      definition:
        "- CP of \\(a\\) articles \\(=\\) SP of \\(b\\) articles: profit % \\(= \\dfrac{a - b}{b} \\times 100\\) (a loss if \\(b > a\\)).\n" +
        "- 'Bought \\(x\\) for ₹A, sold \\(y\\) for ₹B': find the cost and the price of **one** article, then compare.\n" +
        "- Per dozen and per item: bring both to the same count first.\n" +
        "- A false weight: selling 900 g as a kilogram at the cost price gives 100 g of profit on 900 g sold.",
      formula: {
        label: "Cost of a equals selling price of b",
        latex: "\\text{profit } \\% = \\dfrac{a - b}{b} \\times 100",
      },
      authoredExample: {
        prompt: "The cost price of 22 articles equals the selling price of 18. Find the profit percentage.",
        steps: ["Take the cost of one article as 1. Then 18 articles sell for 22.", "The profit is 4 on a cost of 18: \\(\\tfrac{4}{18} = 22\\tfrac 29\\%\\)."],
        answer: "\\(22\\tfrac 29\\%\\).",
      },
      selfCheckExample: {
        prompt: "A man buys oranges at 5 for ₹4 and sells them at 4 for ₹5. Find his profit percentage.",
        steps: ["Cost of one: ₹0.80. Price of one: ₹1.25.", "\\(1.25 \\div 0.8 = 1.5625\\), so each orange sells for 1.5625 times its cost."],
        answer: "56.25%.",
      },
      practiceSet: [
        { prompt: "The selling price of 11 articles equals the cost price of 14. Find the profit percentage.", answer: "\\(27\\tfrac 3{11}\\%\\)" },
        { prompt: "A grocer sells at cost price but uses a 900 g weight for a kilogram. Find his gain percentage.", answer: "\\(11\\tfrac 19\\%\\)" },
        { prompt: "Pens are bought at ₹60 a dozen and sold at ₹6.60 each. Find the profit percentage.", answer: "32%" },
      ],
      pyqExampleId: "46bf1130-97f4-4992-9231-e36d285169e3",
      traps: [
        {
          title: "Divide by the articles sold",
          body: "When the cost of 22 equals the selling price of 18, the profit is 4 on 18 (22.2%), not 4 on 22 (18.2%).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afpc-discount",
      name: "Marked price, discount and profit",
      intuition:
        "A shopkeeper marks a price above cost and then takes a discount off it. Discount is a percentage of the marked price; profit is a percentage of the cost price. Chain the two factors: cost to marked to selling.",
      definition:
        "- **Discount is on the marked price (MP).** SP \\(=\\) MP \\(\\times \\left(1 - \\tfrac{d}{100}\\right)\\).\n" +
        "- Marked \\(m\\%\\) above cost, then \\(d\\%\\) off: SP \\(=\\) CP \\(\\times \\left(1 + \\tfrac{m}{100}\\right)\\left(1 - \\tfrac{d}{100}\\right)\\).\n" +
        "- Given CP, the profit wanted and the discount: SP from the profit, then MP \\(=\\) SP \\(\\div \\left(1 - \\tfrac{d}{100}\\right)\\).\n" +
        "- 'Buy 4, get 1 free' gives 5 articles for the price of 4, a discount of 1 in 5, which is 20%.",
      formula: {
        label: "From cost to marked to selling price",
        latex: "SP = CP\\left(1 + \\dfrac{m}{100}\\right)\\left(1 - \\dfrac{d}{100}\\right)",
      },
      authoredExample: {
        prompt: "A shopkeeper marks his goods 60% above cost and allows a 25% discount. Find his profit percentage.",
        steps: ["Take CP = 100. MP = 160.", "SP = \\(160 \\times 0.75 = 120\\)."],
        answer: "20% profit.",
      },
      selfCheckExample: {
        prompt: "An article costs ₹600. The seller wants a 26% profit after giving a 30% discount. What should the marked price be?",
        steps: ["SP for a 26% profit: \\(600 \\times 1.26 = 756\\).", "MP \\(= 756 \\div 0.7 = 1080\\)."],
        answer: "₹1,080.",
      },
      practiceSet: [
        { prompt: "Goods are marked 50% above cost and sold at a 30% discount. Find the profit percentage.", answer: "5%" },
        { prompt: "After a 20% discount an article sells for ₹720. Find the marked price.", answer: "₹900" },
        { prompt: "A dealer allows a 25% discount and still makes a 50% profit. The marked price is what percentage of the cost price?", answer: "200%" },
      ],
      pyqExampleId: "5cdcccd8-84c1-4e9b-a7e1-804766d32ff1",
      traps: [
        {
          title: "Discount on marked price, profit on cost",
          body: "Marked 60% up and sold 25% off is not \\(60 - 25 = 35\\%\\) profit. The 25% comes off 160, leaving 120, so the profit is 20%.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afpc-successive-discounts",
      name: "Successive discounts and chains of profit",
      intuition:
        "Two discounts of 25% and 4% are two successive falls: the price is multiplied by \\(0.75 \\times 0.96 = 0.72\\), one discount of 28%. A chain of profits from maker to wholesaler to shop multiplies the same way.",
      definition:
        "- Successive discounts \\(a\\%\\) and \\(b\\%\\) equal one discount of \\(a + b - \\dfrac{ab}{100}\\) per cent (the successive-change formula with two falls).\n" +
        "- Three or more: multiply all the factors and take the result from 1.\n" +
        "- A trade discount and then a cash discount 'on the balance' are successive discounts.\n" +
        "- Maker to wholesaler to retailer to customer, each adding a profit: the customer's price is the first cost times every factor. Going back, divide.",
      formula: {
        label: "Two successive discounts",
        latex: "\\text{single discount} = a + b - \\dfrac{ab}{100}",
      },
      authoredExample: {
        prompt: "Find the single discount equal to successive discounts of 25% and 4%.",
        steps: ["Factors: \\(0.75 \\times 0.96 = 0.72\\).", "Formula: \\(25 + 4 - \\tfrac{25 \\times 4}{100} = 28\\)."],
        answer: "28%.",
      },
      selfCheckExample: {
        prompt: "Find the single discount equal to successive discounts of 15%, 25% and 40%.",
        steps: ["\\(0.85 \\times 0.75 \\times 0.6 = 0.3825\\).", "\\(1 - 0.3825 = 0.6175\\)."],
        answer: "61.75%.",
      },
      practiceSet: [
        { prompt: "An article marked ₹2,000 gets successive discounts of 15% and 5%. Find the price paid.", answer: "₹1,615" },
        {
          prompt: "A maker sells to a dealer at 25% profit, and the dealer sells to a customer at 12% profit. The customer pays ₹2,100. Find the maker's cost.",
          answer: "₹1,500",
          method: "\\(1.25 \\times 1.12 = 1.4\\).",
        },
        { prompt: "Which is the bigger saving: one discount of 40%, or 25% followed by 15%?", answer: "The single 40% (the pair is 36.25%)" },
      ],
      pyqExampleId: "1c184529-54ba-411e-89b0-be6ad906db84",
      traps: [
        {
          title: "Successive discounts are less than their sum",
          body: "25% and 4% make 28%, not 29%. The second discount is taken on the already reduced price.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afpc-mixed-sales",
      name: "Overall profit when parts sell at different rates",
      intuition:
        "Overall profit is total selling price against total cost. When two items sell for the same price, one at a 20% gain and one at a 20% loss, the loss is on the dearer item, so the deal loses overall.",
      definition:
        "- Overall profit % \\(= \\dfrac{\\text{total SP} - \\text{total CP}}{\\text{total CP}} \\times 100\\). Never average the percentages.\n" +
        "- Two articles sold at the **same selling price**, one at \\(r\\%\\) gain and one at \\(r\\%\\) loss: always a loss of \\(\\dfrac{r^2}{100}\\%\\).\n" +
        "- Parts of one stock sold at different rates: take the cost of each part and apply its own rate (a weighted average of the rates, by cost).\n" +
        "- Spoiled goods: the whole cost must come back from what is left to sell.",
      formula: {
        label: "Same selling price, gain and loss of r%",
        latex: "\\text{loss } \\% = \\dfrac{r^2}{100}",
      },
      authoredExample: {
        prompt: "Two items are sold for ₹2,400 each, one at a 20% gain and the other at a 20% loss. Find the overall gain or loss.",
        steps: [
          "Costs: \\(2400 \\div 1.2 = 2000\\) and \\(2400 \\div 0.8 = 3000\\), so 5,000 in all.",
          "Takings: 4,800. A loss of 200 on 5,000 is 4%.",
          "Check: \\(\\tfrac{20^2}{100} = 4\\).",
        ],
        answer: "4% loss.",
      },
      selfCheckExample: {
        prompt: "A trader buys 100 kg of rice at ₹20 a kg. He sells 40 kg at a 25% profit and the rest at a 5% loss. Find his overall profit percentage.",
        steps: ["40 kg sell for \\(40 \\times 25 = 1000\\), and 60 kg for \\(60 \\times 19 = 1140\\).", "Takings 2,140 on a cost of 2,000."],
        answer: "7% profit.",
      },
      practiceSet: [
        { prompt: "Two articles sell for ₹1,500 each, one at a 25% gain and one at a 25% loss. Find the overall result.", answer: "6.25% loss" },
        { prompt: "50 mangoes are bought at ₹12 each and 20% of them spoil. At what price must the rest sell for a 25% overall profit?", answer: "₹18.75 each" },
      ],
      pyqExampleId: "ff0ef595-7580-4fe4-8a6f-30a45481a420",
      traps: [
        {
          title: "Equal gain and loss is not break-even",
          body: "Sold at the same price, a 20% gain and a 20% loss lose 4% overall. The loss-making item cost more, so its loss outweighs the gain.",
        },
      ],
    },
  ],
};
