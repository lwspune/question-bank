import type { SubtopicNote } from "@/app/notes/_types";

export const AF_PL_ARTICLES_NOTE: SubtopicNote = {
  subtopicName: "Articles and Rates",
  title: "Profit Counted in Articles, and Rates",
  oneLineDefinition:
    "When a cost or a profit is measured in articles, take the price of one article as 1; the cost of x equalling the sale of y, or a gain worth n articles, becomes a simple fraction.",
  whyItMatters:
    "The largest page of the chapter, with one AFCAT past-year question from 2019. Every row is a fraction once one article's price is set to 1, and the marks go on taking that fraction over the wrong base: the number sold instead of the cost, or the selling price instead of the cost price.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "afpl-cp-x-sp-y",
      name: "Cost of x articles equals the selling price of y",
      intuition:
        "If 13 articles cost what 10 sell for, the seller receives the cost of 13 for every 10 he hands over. He keeps the cost of 3 on a cost of 10, a profit of \\(30\\%\\).",
      definition:
        "- CP of \\(x\\) = SP of \\(y\\) with \\(x > y\\): profit % \\(= \\dfrac{x - y}{y} \\times 100\\).\n" +
        "- With \\(y > x\\) it is a loss: loss % \\(= \\dfrac{y - x}{y} \\times 100\\).\n" +
        "- The base is \\(y\\), the number actually sold.\n" +
        "- The percentage holds for any quantity, so the profit on a whole stock is that percentage of its cost.\n" +
        "- Working back: for a profit of \\(p\\%\\), \\(x : y = (100 + p) : 100\\).",
      formula: {
        label: "Cost of x equals sale of y",
        latex: "\\text{Profit}\\% = \\dfrac{x - y}{y} \\times 100",
      },
      authoredExample: {
        prompt: "The cost price of 21 pens equals the selling price of 15 pens. Find the gain per cent.",
        steps: [
          "Take each pen's cost as 1. Then 15 pens sell for 21.",
          "The gain is 6 on a cost of 15: \\(\\dfrac{6}{15} \\times 100 = 40\\%\\).",
        ],
        answer: "\\(40\\%\\) gain.",
      },
      selfCheckExample: {
        prompt: "The cost price of 30 articles equals the selling price of 36. Find the loss per cent.",
        steps: ["36 articles sell for the cost of 30, a loss of 6 on 36."],
        answer: "\\(16\\tfrac 23\\%\\) loss.",
      },
      practiceSet: [
        { prompt: "The cost of 11 articles equals the selling price of 10. Find the gain per cent.", answer: "\\(10\\%\\)" },
        { prompt: "The cost of 8 articles equals the selling price of 12. Find the loss per cent.", answer: "\\(33\\tfrac 13\\%\\)" },
        {
          prompt: "Goods costing ₹6,000 are sold so that the cost of 9 items equals the selling price of 6. Find the total profit.",
          answer: "₹3,000",
          method: "The profit is \\(50\\%\\) of the cost.",
        },
        { prompt: "For a profit of \\(50\\%\\), the cost of \\(x\\) articles equals the selling price of 8. Find \\(x\\).", answer: "\\(12\\)" },
      ],
      pyqExampleId: "adcc3ae0-05d7-4b91-9827-92f64113e9d7",
      traps: [
        {
          title: "Divide by the number sold",
          body: "The cost of 21 equals the sale of 15: the gain is 6 on 15, \\(40\\%\\). Dividing by 21 gives \\(28.6\\%\\), the wrong base.",
        },
        {
          title: "Which side is larger decides profit or loss",
          body: "If the cost of fewer articles equals the sale of more, each article sells below cost: a loss, however the question words it.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afpl-gain-cp-n",
      name: "A gain equal to the cost of n articles",
      intuition:
        "If selling 40 articles earns the cost of 8, the profit is 8 parts on a cost of 40 parts: one fifth, a profit of \\(20\\%\\). The profit per article is the same fraction of one article's cost.",
      definition:
        "- Selling \\(N\\) articles gains the cost of \\(n\\): profit % \\(= \\dfrac nN \\times 100\\). Losing the cost of \\(n\\) gives the same fraction as a loss.\n" +
        "- Selling \\(M\\) articles then gains the cost of \\(M \\times \\dfrac nN\\) articles.\n" +
        "- To gain the cost of \\(k\\) articles, sell \\(k \\times \\dfrac Nn\\) articles.\n" +
        "- \\(SP : CP = (N + n) : N\\).",
      formula: {
        label: "Gain worth the cost of n articles",
        latex: "\\text{Profit}\\% = \\dfrac{n}{N} \\times 100",
      },
      authoredExample: {
        prompt: "By selling 60 pens, a shopkeeper gains the cost price of 12 pens. Find his gain per cent, and the gain on selling 90 pens.",
        steps: [
          "The gain is 12 on 60: \\(\\dfrac{12}{60} = \\dfrac 15\\), that is \\(20\\%\\).",
          "Each pen gains \\(\\tfrac 15\\) of its cost, so 90 pens gain \\(90 \\times \\tfrac 15 = 18\\) pens' cost.",
        ],
        answer: "\\(20\\%\\); the cost of 18 pens.",
      },
      selfCheckExample: {
        prompt: "A trader loses the cost price of 4 articles by selling 36. Find his loss per cent.",
        steps: ["The loss is 4 on 36: \\(\\dfrac 4{36} = \\dfrac 19\\)."],
        answer: "\\(11\\tfrac 19\\%\\) loss.",
      },
      practiceSet: [
        { prompt: "By selling 30 articles, a man gains the cost of 9. Find his profit per cent.", answer: "\\(30\\%\\)" },
        {
          prompt: "A dealer gains the cost of 6 articles by selling 42. How many must he sell to gain the cost of 10?",
          answer: "\\(70\\)",
        },
        { prompt: "A seller makes a \\(40\\%\\) profit. On selling 35 articles, his profit equals the cost of how many?", answer: "\\(14\\)" },
        { prompt: "By selling 90 articles, a trader loses the cost of 9. Find his loss per cent.", answer: "\\(10\\%\\)" },
      ],
      pyqExampleId: "c30405bb-3a0e-4f23-af92-f0c0ae55ba6f",
      traps: [
        {
          title: "Scale the count, do not add to it",
          body: "If 60 pens gain the cost of 12, then 120 pens gain the cost of 24. The gain grows with the number sold; it is not 12 more each time.",
        },
        {
          title: "The cost of n is not the selling price of n",
          body: "A gain worth the cost of n articles and one worth their selling price give different answers. Read which one the question names; the next concept handles the second.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afpl-gain-sp-n",
      name: "A gain equal to the selling price of n articles",
      intuition:
        "If selling 30 articles gains the selling price of 6, then those 30 cost only the selling price of 24. The profit is 6 on 24.",
      definition:
        "- Selling \\(N\\) gains the SP of \\(n\\): CP of \\(N\\) = SP of \\((N - n)\\), and profit % \\(= \\dfrac{n}{N - n} \\times 100\\).\n" +
        "- Losing the SP of \\(n\\): CP of \\(N\\) = SP of \\((N + n)\\), and loss % \\(= \\dfrac{n}{N + n} \\times 100\\).\n" +
        "- Profit : SP \\(= n : N\\), and CP : SP \\(= (N - n) : N\\).\n" +
        "- Given the price of one article, find the total sale first and subtract the gain to get the total cost.",
      formula: {
        label: "Gain worth the sale of n articles",
        latex: "\\text{Profit}\\% = \\dfrac{n}{N - n} \\times 100",
      },
      authoredExample: {
        prompt: "By selling 30 articles, a trader gains the selling price of 6. Find his profit per cent.",
        steps: [
          "Take each selling price as 1. The 30 articles sell for 30 and the gain is 6.",
          "So they cost 24, and the profit is 6 on 24: \\(25\\%\\).",
        ],
        answer: "\\(25\\%\\).",
      },
      selfCheckExample: {
        prompt: "By selling 44 pens, a man loses the selling price of 4. Find his loss per cent.",
        steps: ["The 44 pens cost the selling price of 48.", "The loss is 4 on 48."],
        answer: "\\(8\\tfrac 13\\%\\) loss.",
      },
      practiceSet: [
        { prompt: "By selling 40 articles, a trader gains the selling price of 10. Find his profit per cent.", answer: "\\(33\\tfrac 13\\%\\)" },
        {
          prompt: "By selling 36 toys, a seller gains the selling price of 6. Each toy sells for ₹24. Find the cost of each toy.",
          answer: "₹20",
          method: "36 toys cost the selling price of 30, that is ₹720.",
        },
        { prompt: "By selling 70 articles, a dealer gains the selling price of 14. Find the ratio of cost price to selling price.", answer: "\\(4 : 5\\)" },
        { prompt: "By selling 27 books, a man loses the selling price of 3. Find his loss per cent.", answer: "\\(10\\%\\)" },
      ],
      pyqExampleId: "d5af41f1-9c06-42a6-be82-1defd79a74c5",
      traps: [
        {
          title: "Subtract before dividing",
          body: "A gain of the selling price of 6 on 30 articles is 6 on a cost of 24, that is \\(25\\%\\). Dividing 6 by 30 gives \\(20\\%\\), which is the profit as a share of the selling price.",
        },
        {
          title: "A loss adds to the count",
          body: "A loss of the selling price of \\(n\\) means the cost is the selling price of \\(N + n\\) articles, not \\(N - n\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afpl-rates",
      name: "Bought and sold at so many for a price",
      intuition:
        "'8 for ₹10' is a price of ₹1.25 an article. Turn both rates into a price per article, or buy and sell a number of articles that both counts divide, and compare.",
      definition:
        "- Price per article = rupees ÷ count.\n" +
        "- LCM method: take the LCM of the two counts as the number bought and sold; both totals come out whole.\n" +
        "- Bought \\(a\\) for ₹\\(b\\) and sold \\(b\\) for ₹\\(a\\) (counts and prices swapped): \\(\\dfrac{SP}{CP} = \\left(\\dfrac ab\\right)^2\\).\n" +
        "- Per dozen and per piece: put both in the same unit first (a dozen is 12).\n" +
        "- 'How many for ₹\\(x\\) to gain \\(y\\%\\)?': find the new selling price per article, then divide \\(x\\) by it.",
      formula: {
        label: "Profit from two rates",
        latex: "\\text{Profit}\\% = \\left(\\dfrac{\\text{SP per article}}{\\text{CP per article}} - 1\\right) \\times 100",
      },
      authoredExample: {
        prompt: "Oranges are bought at 8 for ₹10 and sold at 4 for ₹6. Find the gain per cent.",
        steps: [
          "Cost per orange \\(= \\dfrac{10}{8} = 1.25\\); selling price \\(= \\dfrac 64 = 1.50\\).",
          "The gain is 0.25 on 1.25: \\(20\\%\\).",
          "Check with 8 oranges: they cost 10 and sell for 12.",
        ],
        answer: "\\(20\\%\\) gain.",
      },
      selfCheckExample: {
        prompt: "Eggs are bought at ₹42 a dozen and sold at ₹4 each. Find the gain per cent.",
        steps: ["Each egg costs \\(\\dfrac{42}{12} = 3.50\\).", "The gain is 0.50 on 3.50, that is \\(\\dfrac 17\\)."],
        answer: "\\(14\\tfrac 27\\%\\).",
      },
      practiceSet: [
        { prompt: "Lemons are bought at 4 for ₹3 and sold at 3 for ₹4. Find the profit per cent.", answer: "\\(77\\tfrac 79\\%\\)", method: "\\(\\left(\\tfrac 43\\right)^2 = \\tfrac{16}{9}\\)." },
        { prompt: "Pens are bought at 10 for ₹8 and sold at 8 for ₹8. Find the profit per cent.", answer: "\\(25\\%\\)" },
        {
          prompt: "Bananas are bought at 12 for ₹10. How many must be sold for ₹10 to gain \\(20\\%\\)?",
          answer: "\\(10\\)",
          method: "The new selling price is ₹1 each.",
        },
        { prompt: "Glasses are bought at ₹36 a dozen and sold at ₹4 each. Find the profit per cent.", answer: "\\(33\\tfrac 13\\%\\)" },
      ],
      pyqExampleId: "45f424a1-325f-4ada-9274-61e3cfa5c10f",
      traps: [
        {
          title: "Compare prices per article, not counts",
          body: "'8 for ₹10' against '4 for ₹6' compares nothing until each is a price for one article (or for the same number of articles).",
        },
        {
          title: "Keep the fractions",
          body: "A cost of \\(\\tfrac 23\\) rupee rounded to 0.67 can turn an exact \\(20\\%\\) into \\(19.4\\%\\). Work in fractions, or with an LCM number of articles.",
        },
      ],
    },
  ],
};
