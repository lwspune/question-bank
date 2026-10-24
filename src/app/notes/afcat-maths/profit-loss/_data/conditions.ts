import type { SubtopicNote } from "@/app/notes/_types";

export const AF_PL_CONDITIONS_NOTE: SubtopicNote = {
  subtopicName: "Finding Cost Price from Conditions",
  title: "Finding the Cost Price, Then Repricing",
  oneLineDefinition:
    "Turn the given sale into the cost price first, then apply the new percentage; when two sales differ by a known sum, that sum is the gap between their percentages of the cost.",
  whyItMatters:
    "A large page, and three AFCAT past-year questions sit on it, from 2016 and 2018. Nearly every row is two steps through the cost price, and the marks go on jumping from one selling price straight to the other.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "afpl-reprice",
      name: "Through the cost price to a new selling price",
      intuition:
        "A question that gives one sale and asks about another never jumps across directly. The first sale fixes the cost price, and the second percentage is taken on that cost.",
      definition:
        "- Step 1: \\(CP = SP_1 \\div \\left(1 \\pm \\tfrac{x}{100}\\right)\\).\n" +
        "- Step 2: \\(SP_2 = CP \\times \\left(1 \\pm \\tfrac{y}{100}\\right)\\).\n" +
        "- In one line: \\(SP_2 = SP_1 \\times \\dfrac{100 \\pm y}{100 \\pm x}\\).\n" +
        "- Given a second selling price instead of a second percentage, compare it with the cost price to get the new profit or loss.",
      formula: {
        label: "Repricing in one line",
        latex: "SP_2 = SP_1 \\times \\dfrac{100 \\pm y}{100 \\pm x}",
      },
      authoredExample: {
        prompt: "By selling a fan for ₹1,890, a trader loses \\(10\\%\\). At what price should he sell it to gain \\(20\\%\\)?",
        steps: [
          "\\(CP = \\dfrac{1890}{0.9} = 2100\\).",
          "For a \\(20\\%\\) gain: \\(2100 \\times 1.2 = 2520\\).",
          "In one line: \\(1890 \\times \\dfrac{120}{90} = 2520\\).",
        ],
        answer: "₹2,520.",
      },
      selfCheckExample: {
        prompt: "A book sold for ₹672 gives a profit of \\(12\\%\\). Find the profit or loss per cent if it is sold for ₹570.",
        steps: ["\\(CP = \\dfrac{672}{1.12} = 600\\).", "At ₹570 the loss is 30 on 600."],
        answer: "\\(5\\%\\) loss.",
      },
      practiceSet: [
        { prompt: "An article sold for ₹960 gives a \\(20\\%\\) profit. At what price would it give a \\(10\\%\\) loss?", answer: "₹720" },
        { prompt: "An article sold for ₹1,530 gives a \\(10\\%\\) loss. At what price would it give a \\(30\\%\\) gain?", answer: "₹2,210" },
        {
          prompt: "A cycle sold for ₹2,640 gives a \\(10\\%\\) gain. What would be the gain or loss per cent at ₹2,280?",
          answer: "\\(5\\%\\) loss",
          method: "The cost is 2400.",
        },
        { prompt: "Oil sold at ₹77 a litre gives a \\(12\\%\\) loss. At what price per litre would it give a \\(20\\%\\) gain?", answer: "₹105" },
      ],
      pyqExampleId: "ba29dcb2-ea19-42c6-bbb5-c1d8eca7c647",
      traps: [
        {
          title: "The percentages do not add",
          body: "From a \\(10\\%\\) loss to a \\(20\\%\\) gain is not 'add \\(30\\%\\) to the selling price': \\(1890 \\times 1.3 = 2457\\), while the right answer is 2520. Both percentages are on the cost.",
        },
        {
          title: "Divide to reach the cost",
          body: "₹1,890 at a \\(10\\%\\) loss means a cost of \\(1890 \\div 0.9 = 2100\\), not \\(1890 + 189 = 2079\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afpl-swing",
      name: "When two prices differ by a known sum",
      intuition:
        "If one sale is at \\(x\\%\\) and another at \\(y\\%\\), the two selling prices differ by the gap between those percentages of the same cost price, counting a loss as negative. That rupee difference fixes the cost at once.",
      definition:
        "- A loss of \\(x\\%\\) and a gain of \\(y\\%\\): the gap is \\((x + y)\\%\\) of CP.\n" +
        "- Two gains (or two losses) of \\(x\\%\\) and \\(y\\%\\): the gap is \\((y - x)\\%\\) of CP.\n" +
        "- \\(CP = \\dfrac{\\text{gap in rupees}}{\\text{gap in per cent}} \\times 100\\).\n" +
        "- Per-kg and per-unit wording works the same way.",
      formula: {
        label: "Cost from a price gap",
        latex: "CP = \\dfrac{\\text{difference in rupees}}{\\text{difference in per cent}} \\times 100",
      },
      authoredExample: {
        prompt:
          "A cooler is sold at a loss of \\(6\\%\\). Had it been sold for ₹540 more, there would have been a gain of \\(12\\%\\). Find the cost price.",
        steps: [
          "From a \\(6\\%\\) loss to a \\(12\\%\\) gain is \\(18\\%\\) of the cost.",
          "\\(18\\%\\) of CP is 540, so \\(CP = \\dfrac{540}{0.18} = 3000\\).",
          "Check: \\(2820\\) and \\(3360\\) differ by 540.",
        ],
        answer: "₹3,000.",
      },
      selfCheckExample: {
        prompt: "Selling an article at \\(18\\%\\) profit instead of \\(11\\%\\) profit earns ₹56 more. Find the cost price.",
        steps: ["The gap is \\(7\\%\\) of the cost.", "\\(\\dfrac{56}{0.07} = 800\\)."],
        answer: "₹800.",
      },
      practiceSet: [
        { prompt: "An article sells at a \\(4\\%\\) loss; ₹96 more would give a \\(12\\%\\) gain. Find the cost price.", answer: "₹600" },
        { prompt: "Selling at \\(25\\%\\) profit gives ₹45 more than selling at \\(15\\%\\) profit. Find the cost price.", answer: "₹450" },
        { prompt: "Selling at \\(20\\%\\) profit gives ₹150 more than selling at a \\(4\\%\\) loss. Find the cost price.", answer: "₹625" },
        { prompt: "Sugar sells at an \\(8\\%\\) loss; ₹2 a kg more would give a \\(12\\%\\) gain. Find the cost per kg.", answer: "₹10" },
      ],
      pyqExampleId: "57bc97bf-9979-4842-952b-3b8399da5936",
      traps: [
        {
          title: "A loss and a gain add",
          body: "From a \\(6\\%\\) loss to a \\(12\\%\\) gain is \\(18\\%\\) of the cost, not \\(6\\%\\). Count the loss as below zero.",
        },
        {
          title: "The gap is a share of the cost",
          body: "The rupee gap is a percentage of the cost price, so divide it by that percentage. Dividing it by either selling price gives nothing useful.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afpl-equations",
      name: "Setting up an equation in the cost price",
      intuition:
        "When a change touches the cost price as well, or the profit is described in words, call the cost \\(c\\) and write the condition as an equation. One line of algebra replaces the guessing.",
      definition:
        "- Equal profit at one price and loss at another: \\(SP_1 - c = c - SP_2\\), so \\(c\\) is the average of the two prices.\n" +
        "- Both cost and selling price change by ₹\\(d\\): write the new sale against the new cost, \\(SP + d = \\left(1 + \\tfrac{r}{100}\\right)(c + d)\\).\n" +
        "- 'If the selling price were doubled, the profit would be \\(k\\) times': \\(2S - C = k(S - C)\\).\n" +
        "- A new cost with the same selling price: take the old cost as 100.",
      formula: {
        label: "Equal profit and loss",
        latex: "SP_1 - c = c - SP_2 \\;\\Rightarrow\\; c = \\dfrac{SP_1 + SP_2}{2}",
      },
      authoredExample: {
        prompt:
          "An article is sold at a profit of \\(20\\%\\). If both its cost price and its selling price were ₹100 more, the profit would be \\(15\\%\\). Find the cost price.",
        steps: [
          "With cost \\(c\\): \\(1.2c + 100 = 1.15(c + 100)\\).",
          "\\(1.2c + 100 = 1.15c + 115\\), so \\(0.05c = 15\\) and \\(c = 300\\).",
          "Check: 400 and 460 give a profit of 60 on 400, that is \\(15\\%\\).",
        ],
        answer: "₹300.",
      },
      selfCheckExample: {
        prompt: "The profit on selling an article for ₹915 equals the loss on selling it for ₹745. Find the cost price.",
        steps: ["\\(915 - c = c - 745\\).", "\\(c = \\dfrac{915 + 745}{2} = 830\\)."],
        answer: "₹830.",
      },
      practiceSet: [
        {
          prompt: "If the selling price of an article were doubled, the profit would be four times as much. Find the profit per cent.",
          answer: "\\(50\\%\\)",
          method: "\\(2S - C = 4(S - C)\\) gives \\(S = 1.5C\\).",
        },
        { prompt: "The profit at ₹1,260 equals the loss at ₹1,040. Find the cost price.", answer: "₹1,150" },
        {
          prompt: "Goods sell at a \\(20\\%\\) profit. The cost rises by \\(10\\%\\) and the selling price stays the same. Find the new profit per cent.",
          answer: "\\(9\\tfrac{1}{11}\\%\\)",
          method: "Cost 100 becomes 110 against a price of 120.",
        },
      ],
      pyqExampleId: "fbbc976e-6d38-424e-ae98-e35b24e77ac1",
      traps: [
        {
          title: "The new percentage is on the new cost",
          body: "If both prices rise by ₹100, the profit in rupees is the same but its percentage is taken on \\(c + 100\\). Dividing by the old cost gives the wrong equation.",
        },
        {
          title: "Midway only for equal rupee amounts",
          body: "The cost is the average of two prices only when the profit at one equals the loss at the other in rupees.",
        },
      ],
    },
  ],
};
