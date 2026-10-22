import type { SubtopicNote } from "@/app/notes/_types";

export const AF_MA_PROFIT_NOTE: SubtopicNote = {
  subtopicName: "Profit and Loss on Mixtures",
  title: "Profit and Loss on Mixtures",
  oneLineDefinition:
    "A milkman who adds water, a trader who mixes two grades or sells two parts at different rates: find the cost of one unit of the mixture, then the profit on it.",
  whyItMatters:
    "One AFCAT past-year question (2019) is here: a milkman who adds water and sells at a profit. Every question first needs the cost of one unit of the mixture. The marks go when profit is worked on the selling price, or on the price of pure milk, instead of on that cost.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "afma-water-gain",
      name: "Water sold at the price of milk",
      intuition:
        "Water costs nothing. A milkman who sells the mixture at the price he paid for milk gains exactly on the water: every litre of water is sold at the milk's price.",
      definition:
        "- Sold at the milk's cost price: gain % \\(= \\dfrac{\\text{water}}{\\text{milk}} \\times 100\\), so water : milk \\(=\\) gain : 100.\n" +
        "- Sold at some other price: first find what one litre of the mixture costs, \\(\\text{CP} = \\text{SP} \\times \\dfrac{100}{100 + \\text{gain}}\\).\n" +
        "- Then use the alligation cross with water at ₹0: milk : water \\(= (\\text{CP} - 0) : (\\text{milk price} - \\text{CP})\\).",
      formula: {
        label: "Cost of one litre of the mixture",
        latex: "\\text{CP} = \\text{SP} \\times \\dfrac{100}{100 + \\text{gain}}",
      },
      authoredExample: {
        prompt: "Milk costs ₹40 a litre. A milkman adds water and sells the mixture at ₹42 a litre, gaining 20%. In what ratio does he mix milk and water?",
        steps: [
          "One litre of the mixture costs \\(42 \\times \\dfrac{100}{120} = 35\\) rupees.",
          "Cross with water at 0: milk : water \\(= (35 - 0) : (40 - 35) = 35 : 5\\).",
          "Check: 7 litres of milk cost 280; 8 litres sold at 42 bring 336, a gain of 56, which is 20% of 280.",
        ],
        answer: "\\(7 : 1\\).",
      },
      selfCheckExample: {
        prompt: "A milkman sells milk mixed with water at the price he paid for pure milk and gains 12.5%. Find the ratio of water to milk.",
        steps: ["Water : milk \\(= 12.5 : 100\\).", "Multiply by 8: \\(100 : 800\\), which is \\(1 : 8\\)."],
        answer: "\\(1 : 8\\).",
      },
      practiceSet: [
        { prompt: "In what ratio must water be mixed with milk to gain 10% by selling the mixture at the cost price of milk?", answer: "Water : milk \\(= 1 : 10\\)" },
        { prompt: "Milk costs ₹50 a litre. The mixture with water is sold at ₹48 a litre for a 20% gain. Find the ratio of milk to water.", answer: "\\(4 : 1\\)", method: "A litre of the mixture costs ₹40." },
        { prompt: "Selling milk mixed with water at the cost price of milk, a milkman gains 5%. How much water is in every 21 litres of the mixture?", answer: "1 litre" },
      ],
      pyqExampleId: "387e180f-3ae9-4a24-8d5b-d03a8ef096b6",
      traps: [
        {
          title: "Gain is measured on the milk, not on the mixture",
          body: "1 litre of water in 6 litres of mixture is 1 litre of water to 5 of milk: a gain of 20%. Dividing by the whole 6 litres gives 16.7%.",
        },
        {
          title: "The selling price is not the mean",
          body: "With a profit in the question, the cross needs the cost of a litre of the mixture. Divide the selling price by \\(1 + \\text{gain}\\) before you cross it with the price of milk.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afma-mixture-profit",
      name: "Profit on a mixture, and mixed profit rates",
      intuition:
        "A mixture bought at two prices has one cost a kg, its mean price. Profit is worked on that cost. When one stock is sold in parts at different profit rates, the overall rate is a mean too, and the cross runs it backwards.",
      definition:
        "- Two grades bought and mixed: find the mean cost a kg first (the mean-price page), then the profit or loss on that cost.\n" +
        "- Parts of one stock sold at different profit rates: the overall rate is the weighted mean of the rates, weighted by how much is sold at each.\n" +
        "- Given the overall rate, the alligation cross on the two rates gives the ratio of the two parts.",
      formula: {
        label: "Profit on a mixture",
        latex: "\\text{profit} = \\dfrac{\\text{SP} - \\text{mean cost}}{\\text{mean cost}} \\times 100\\%",
      },
      authoredExample: {
        prompt: "Rice at ₹30 a kg and at ₹60 a kg is mixed in the ratio \\(2 : 1\\) and sold at ₹48 a kg. Find the profit percentage.",
        steps: [
          "Mean cost: \\(\\dfrac{2 \\times 30 + 60}{3} = 40\\) rupees a kg.",
          "Profit \\(48 - 40 = 8\\) rupees a kg, which is \\(\\tfrac{8}{40} = 20\\%\\).",
        ],
        answer: "20% profit.",
      },
      selfCheckExample: {
        prompt: "A trader sells part of 60 kg of sugar at 8% profit and the rest at 18% profit, making 12% on the whole. How much did he sell at 18%?",
        steps: [
          "8% part : 18% part \\(= (18 - 12) : (12 - 8) = 6 : 4 = 3 : 2\\).",
          "The 18% part is \\(\\tfrac 25 \\times 60\\) kg.",
        ],
        answer: "24 kg.",
      },
      practiceSet: [
        { prompt: "Of 40 kg of rice, 24 kg are sold at 10% profit and 16 kg at 20% profit. Find the overall profit percentage.", answer: "14%" },
        { prompt: "Teas at ₹60 and ₹90 a kg are mixed in the ratio \\(2 : 1\\) and sold at ₹84 a kg. Find the profit percentage.", answer: "20%" },
        { prompt: "Wheat at ₹20 and ₹26 a kg is mixed in the ratio \\(1 : 2\\). At what price a kg must the mixture be sold for a 25% profit?", answer: "₹30 a kg", method: "The mean cost is ₹24." },
      ],
      pyqExampleId: "3db8e482-ade8-40a2-a7c9-65ca437edb68",
      traps: [
        {
          title: "Weight the profit rates",
          body: "A quarter of the stock sold at 20% and the rest at 12% gives \\(0.25 \\times 20 + 0.75 \\times 12 = 14\\%\\) overall, not the plain average 16%.",
        },
      ],
    },
  ],
};
