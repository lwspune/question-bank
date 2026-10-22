import type { SubtopicNote } from "@/app/notes/_types";

export const AF_PL_COMBINED_NOTE: SubtopicNote = {
  subtopicName: "Combined Transactions",
  title: "Two Articles at One Price, and Costs with Overheads",
  oneLineDefinition:
    "When two articles sell at the same price, one at a gain and one at a loss, find each cost price separately and compare the totals; equal percentages always give a loss of x²/100 per cent.",
  whyItMatters:
    "This is where AFCAT asks most: seven of the chapter's thirteen past-year questions are on this page, from 2016, 2018 and 2019. Five of them are two articles sold at one price with an equal gain and loss, and the trap is answering 'no gain, no loss'.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "afpl-equal-gain-loss",
      name: "Equal gain and loss on equal selling prices",
      intuition:
        "The article sold at a loss cost more than the one sold at a gain, so the loss is taken on the bigger cost. The gain and the loss never cancel: with the same percentage \\(x\\) on both, the seller always loses.",
      definition:
        "- Same selling price, a gain of \\(x\\%\\) on one and a loss of \\(x\\%\\) on the other: overall loss % \\(= \\dfrac{x^2}{100}\\).\n" +
        "- The loss in rupees: the costs are \\(\\dfrac{SP}{1 + x/100}\\) and \\(\\dfrac{SP}{1 - x/100}\\); subtract the total takings from their sum.\n" +
        "- The rule needs equal **selling** prices. Two articles with equal **cost** prices, one at \\(x\\%\\) gain and one at \\(x\\%\\) loss, give no gain and no loss.",
      formula: {
        label: "Equal gain and loss",
        latex: "\\text{Loss}\\% = \\dfrac{x^2}{100}",
      },
      authoredExample: {
        prompt:
          "Two phones are sold for ₹6,000 each, one at a gain of \\(25\\%\\) and the other at a loss of \\(25\\%\\). Find the overall loss per cent and the loss in rupees.",
        steps: [
          "By the rule: \\(\\dfrac{25^2}{100} = 6.25\\%\\) loss.",
          "The costs are \\(\\dfrac{6000}{1.25} = 4800\\) and \\(\\dfrac{6000}{0.75} = 8000\\), together 12800.",
          "The takings are 12000, a loss of 800. Check: \\(\\dfrac{800}{12800} = 6.25\\%\\).",
        ],
        answer: "\\(6.25\\%\\) loss, that is ₹800.",
      },
      selfCheckExample: {
        prompt: "Two cows are sold for ₹9,900 each, one at a \\(10\\%\\) gain and the other at a \\(10\\%\\) loss. Find the loss in rupees and per cent.",
        steps: ["The costs are 9000 and 11000, together 20000.", "The takings are 19800."],
        answer: "₹200, a \\(1\\%\\) loss.",
      },
      practiceSet: [
        { prompt: "Two articles sell at the same price, one at a \\(15\\%\\) gain and one at a \\(15\\%\\) loss. Find the overall loss per cent.", answer: "\\(2.25\\%\\)" },
        { prompt: "Two articles sell at the same price, one at a \\(30\\%\\) gain and one at a \\(30\\%\\) loss. Find the overall loss per cent.", answer: "\\(9\\%\\)" },
        { prompt: "Two articles are sold for ₹3,600 each, one at a \\(50\\%\\) gain and one at a \\(50\\%\\) loss. Find the overall loss per cent.", answer: "\\(25\\%\\)" },
        { prompt: "Two articles sell at the same price, one at a \\(12\\%\\) gain and one at a \\(12\\%\\) loss. Find the overall loss per cent.", answer: "\\(1.44\\%\\)" },
      ],
      pyqExampleId: "f6103eeb-30e5-4b6b-988b-2fb7034b8819",
      traps: [
        {
          title: "Not 'no gain, no loss'",
          body: "Equal percentages on equal selling prices always lose \\(\\tfrac{x^2}{100}\\%\\). The option 'no profit, no loss' is the one set for students who let the two cancel.",
        },
        {
          title: "Equal costs are a different question",
          body: "If two articles cost the same and one gains \\(x\\%\\) while the other loses \\(x\\%\\), the result is no gain, no loss. Check which price the question says is equal.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afpl-same-price-unequal",
      name: "One selling price, different percentages",
      intuition:
        "With different percentages there is no shortcut rule. Divide the common selling price by each multiplier to get the two costs, add them, and compare with twice the selling price.",
      definition:
        "- \\(CP_1 = SP \\div \\left(1 + \\tfrac{a}{100}\\right)\\) and \\(CP_2 = SP \\div \\left(1 - \\tfrac{b}{100}\\right)\\).\n" +
        "- Result \\(= 2 \\times SP - (CP_1 + CP_2)\\); a percentage is on the total cost.\n" +
        "- \\(16.67\\%\\) means \\(\\tfrac 16\\) and \\(33.33\\%\\) means \\(\\tfrac 13\\): divide by \\(\\tfrac 76\\), \\(\\tfrac 56\\), \\(\\tfrac 43\\) or \\(\\tfrac 23\\) as fractions.\n" +
        "- Some pairs balance exactly, such as a \\(25\\%\\) gain with a \\(16\\tfrac 23\\%\\) loss, or a \\(50\\%\\) gain with a \\(25\\%\\) loss.",
      formula: {
        label: "Total cost of two articles at one price",
        latex: "CP_1 + CP_2 = \\dfrac{SP}{1 + \\frac{a}{100}} + \\dfrac{SP}{1 - \\frac{b}{100}}",
      },
      authoredExample: {
        prompt: "Two machines are sold at ₹5,600 each, one at a gain of \\(40\\%\\) and the other at a loss of \\(20\\%\\). Find the overall gain or loss.",
        steps: [
          "Costs: \\(\\dfrac{5600}{1.4} = 4000\\) and \\(\\dfrac{5600}{0.8} = 7000\\), together 11000.",
          "Takings: \\(2 \\times 5600 = 11200\\).",
        ],
        answer: "A gain of ₹200.",
      },
      selfCheckExample: {
        prompt: "Two lamps are sold for ₹2,400 each, one at a gain of \\(60\\%\\) and the other at a loss of \\(25\\%\\). Find the overall result.",
        steps: ["Costs: 1500 and 3200, together 4700.", "Takings: 4800."],
        answer: "A gain of ₹100.",
      },
      practiceSet: [
        { prompt: "Two articles sell at ₹1,500 each, one at a \\(50\\%\\) gain and one at a \\(25\\%\\) loss. Find the result.", answer: "No gain, no loss" },
        { prompt: "Two articles sell at ₹4,200 each, one at a \\(40\\%\\) gain and one at a \\(30\\%\\) loss. Find the result.", answer: "A loss of ₹600" },
        { prompt: "Two articles sell at ₹2,000 each, one at a \\(25\\%\\) gain and one at a \\(16.67\\%\\) loss. Find the result.", answer: "No gain, no loss" },
        { prompt: "Two articles sell at ₹1,320 each, one at a \\(20\\%\\) gain and one at a \\(12\\%\\) loss. Find the result.", answer: "A gain of ₹40" },
      ],
      pyqExampleId: "5037c940-d9aa-4177-9f5d-4d8cd2826232",
      traps: [
        {
          title: "Do not average the percentages",
          body: "A \\(50\\%\\) gain and a \\(25\\%\\) loss on equal selling prices is not a \\(12.5\\%\\) gain. The costs are different, and here they balance exactly.",
        },
        {
          title: "The percentage is on the total cost",
          body: "A gain of ₹200 on costs of 4000 and 7000 is \\(\\tfrac{200}{11000}\\), about \\(1.8\\%\\), not \\(\\tfrac{200}{11200}\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afpl-overheads",
      name: "Overheads, repairs and broken stock",
      intuition:
        "Anything the seller spends before selling, on transport, repairs or overheads, belongs to the cost price. Stock he cannot sell still counts in the cost but brings nothing in.",
      definition:
        "- Cost price = purchase price + overheads (repairs, transport, labour).\n" +
        "- Profit % \\(= \\dfrac{\\text{total takings} - \\text{total cost}}{\\text{total cost}} \\times 100\\).\n" +
        "- Broken or lost items: the full purchase is the cost, and only the unbroken ones are sold.\n" +
        "- Items sold in groups at different prices: add up the takings group by group.",
      formula: {
        label: "Cost with overheads",
        latex: "CP = \\text{purchase price} + \\text{overheads}",
      },
      authoredExample: {
        prompt: "A man buys a used bike for ₹18,500, spends ₹1,500 on repairs and sells it for ₹23,000. Find his profit per cent.",
        steps: ["Cost \\(= 18500 + 1500 = 20000\\).", "Profit \\(= 3000\\), and \\(\\dfrac{3000}{20000} \\times 100 = 15\\%\\)."],
        answer: "\\(15\\%\\).",
      },
      selfCheckExample: {
        prompt: "A dealer buys 4 dozen glasses at ₹120 a dozen. Eight break, and he sells the rest at ₹15 each. Find his gain or loss per cent.",
        steps: ["Cost \\(= 4 \\times 120 = 480\\).", "He sells 40 glasses for \\(40 \\times 15 = 600\\), a gain of 120."],
        answer: "\\(25\\%\\) gain.",
      },
      practiceSet: [
        { prompt: "A radio bought for ₹380 has overheads of ₹20 and is sold for ₹460. Find the profit per cent.", answer: "\\(15\\%\\)" },
        { prompt: "A scooter bought for ₹9,200 needs ₹800 of repairs and is sold for ₹9,500. Find the loss per cent.", answer: "\\(5\\%\\)" },
        { prompt: "60 cups are bought at ₹10 each; 12 break, and the rest sell at ₹12 each. Find the gain or loss per cent.", answer: "\\(4\\%\\) loss" },
      ],
      pyqExampleId: "3b046c66-ba7b-4178-8ef3-3fe9864dbacb",
      traps: [
        {
          title: "Overheads are part of the cost",
          body: "The repair money goes into the cost price, so the percentage is taken on purchase plus repairs. Leaving it out overstates the profit.",
        },
        {
          title: "Broken items still cost money",
          body: "If 12 of 60 cups break, the cost is still that of all 60; only 48 bring money in.",
        },
      ],
    },
  ],
};
