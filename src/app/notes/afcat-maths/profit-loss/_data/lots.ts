import type { SubtopicNote } from "@/app/notes/_types";

export const AF_PL_LOTS_NOTE: SubtopicNote = {
  subtopicName: "Mixed Lots and Mixtures",
  title: "Lots Sold at Several Prices, and Mixtures",
  oneLineDefinition:
    "For a lot bought or sold at more than one price, compare the total cost with the total takings; the cost price of a mixture is the weighted average of its parts.",
  whyItMatters:
    "Most rows here are a two-line total, and one AFCAT past-year question, from 2018, sells parts of a single purchase at different prices. Marks are lost by averaging the prices instead of adding the totals, and by taking the profit on the takings instead of the cost.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "afpl-lot-totals",
      name: "Total cost against total takings",
      intuition:
        "However many prices appear, the question asks one thing: what did the whole lot cost, and what did it fetch? Add each side, then take the difference on the cost.",
      definition:
        "- Total cost \\(= \\sum (\\text{quantity} \\times \\text{buying price})\\); total takings \\(= \\sum (\\text{quantity} \\times \\text{selling price})\\).\n" +
        "- Profit % \\(= \\dfrac{\\text{takings} - \\text{cost}}{\\text{cost}} \\times 100\\).\n" +
        "- Parts given as fractions ('a quarter of them', 'the rest'): turn each into a count first.\n" +
        "- An average of the selling prices works only when the quantities are equal.",
      formula: {
        label: "Profit on a lot",
        latex: "\\text{Profit}\\% = \\dfrac{\\text{total takings} - \\text{total cost}}{\\text{total cost}} \\times 100",
      },
      authoredExample: {
        prompt: "A trader buys 50 kg of dal at ₹90 a kg. He sells 20 kg at ₹105 a kg and the rest at ₹85 a kg. Find his profit or loss per cent.",
        steps: [
          "Cost \\(= 50 \\times 90 = 4500\\).",
          "Takings \\(= 20 \\times 105 + 30 \\times 85 = 2100 + 2550 = 4650\\).",
          "Profit \\(= 150\\), and \\(\\dfrac{150}{4500} \\times 100 = 3\\tfrac 13\\%\\).",
        ],
        answer: "\\(3\\tfrac 13\\%\\) profit.",
      },
      selfCheckExample: {
        prompt: "A shopkeeper buys 60 bulbs at ₹40 each. He sells a quarter of them at ₹50, half at ₹45 and the rest at ₹30. Find his profit per cent.",
        steps: [
          "Cost \\(= 2400\\).",
          "Takings \\(= 15 \\times 50 + 30 \\times 45 + 15 \\times 30 = 750 + 1350 + 450 = 2550\\).",
          "Profit \\(= 150\\) on 2400.",
        ],
        answer: "\\(6.25\\%\\).",
      },
      practiceSet: [
        {
          prompt: "A seller sells 10 shirts at ₹500 and 15 at ₹400; each shirt cost ₹420. Find the profit per cent, to two decimal places.",
          answer: "\\(4.76\\%\\)",
          method: "Takings 11000 against a cost of 10500.",
        },
        {
          prompt: "A trader buys 30 kg at ₹40 and 20 kg at ₹50, and sells 25 kg at ₹48 and 25 kg at ₹44. Find the profit per cent, to two decimal places.",
          answer: "\\(4.55\\%\\)",
        },
        { prompt: "200 pens are bought at ₹8 each; 150 are sold at ₹10 and the rest at ₹6. Find the profit per cent.", answer: "\\(12.5\\%\\)" },
      ],
      pyqExampleId: "04ff2de9-60f2-4a61-9396-71d4b30e2332",
      traps: [
        {
          title: "Add the totals, do not average the prices",
          body: "Selling 20 kg at ₹105 and 30 kg at ₹85 is not an average price of ₹95 a kg; it is \\(4650 \\div 50 = 93\\).",
        },
        {
          title: "The base is the total cost",
          body: "A profit of ₹150 on a lot costing ₹4,500 is \\(3\\tfrac 13\\%\\). Dividing by the takings of ₹4,650 gives a smaller, wrong figure.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afpl-mixture-cost",
      name: "Cost price of a mixture",
      intuition:
        "Mixing two grades bought at different prices gives one grade whose cost per kg is the weighted average. Find that average cost, then treat the mixture as a single article.",
      definition:
        "- Cost per kg of a mixture \\(= \\dfrac{q_1 c_1 + q_2 c_2}{q_1 + q_2}\\).\n" +
        "- Mixed in the ratio \\(m : n\\): cost per kg \\(= \\dfrac{m c_1 + n c_2}{m + n}\\).\n" +
        "- To reach a target cost \\(c\\), mix the cheap and the dear grade in the ratio \\((\\text{dear} - c) : (c - \\text{cheap})\\). This is **alligation**.\n" +
        "- Then the selling price for a profit of \\(p\\%\\) is the mean cost times \\(1 + \\tfrac{p}{100}\\).",
      formula: {
        label: "Mean cost of a mixture",
        latex: "\\bar c = \\dfrac{q_1 c_1 + q_2 c_2}{q_1 + q_2}",
      },
      authoredExample: {
        prompt: "Tea at ₹180 a kg and ₹240 a kg is mixed in the ratio \\(2 : 1\\). At what price per kg should the mixture be sold to gain \\(25\\%\\)?",
        steps: [
          "Mean cost \\(= \\dfrac{2 \\times 180 + 1 \\times 240}{3} = \\dfrac{600}{3} = 200\\).",
          "For a \\(25\\%\\) gain: \\(200 \\times 1.25 = 250\\).",
        ],
        answer: "₹250 a kg.",
      },
      selfCheckExample: {
        prompt: "In what ratio should rice at ₹32 a kg and rice at ₹44 a kg be mixed to get a mixture costing ₹36 a kg?",
        steps: ["Cheap : dear \\(= (44 - 36) : (36 - 32) = 8 : 4\\)."],
        answer: "\\(2 : 1\\).",
      },
      practiceSet: [
        { prompt: "25 kg at ₹28 a kg is mixed with 25 kg at ₹36 a kg, and the mixture sells at ₹36.80 a kg. Find the profit per cent.", answer: "\\(15\\%\\)" },
        { prompt: "15 kg at ₹62 a kg is mixed with 25 kg at ₹70 a kg. Find the cost per kg of the mixture.", answer: "₹67" },
        { prompt: "In what ratio must grades at ₹20 and ₹28 a kg be mixed to cost ₹23 a kg?", answer: "\\(5 : 3\\)" },
        { prompt: "A trader buys 30 kg at ₹50 a kg and 20 kg at ₹45 a kg and sells it all at ₹52 a kg. Find the profit per cent.", answer: "\\(8\\tfrac 13\\%\\)" },
      ],
      pyqExampleId: "63d3446c-ebfb-4adf-a1e8-e6ceef79c25e",
      traps: [
        {
          title: "Weight the average",
          body: "Mixed \\(2 : 1\\), tea at ₹180 and ₹240 averages ₹200 a kg, not ₹210. The plain average is right only for equal quantities.",
        },
        {
          title: "Alligation pairs each grade with the other's gap",
          body: "The share of the cheap grade is (dear minus mean), not (mean minus cheap). Swapping them mixes the grades the wrong way round.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afpl-part-rates",
      name: "Part at one profit, the rest at another",
      intuition:
        "When parts of a stock earn different profit percentages, the overall percentage is their average weighted by cost. Read it backwards to find how much went at each rate.",
      definition:
        "- Overall profit % \\(= \\dfrac{w_1 p_1 + w_2 p_2}{w_1 + w_2}\\), where the weights are the costs of the parts (or the quantities, when every unit cost the same).\n" +
        "- To find the split, use alligation on the percentages: the parts at \\(p_1\\) and \\(p_2\\) are in the ratio \\((p_2 - P) : (P - p_1)\\).\n" +
        "- Parts that cost different amounts: work out each part's profit in rupees and add.\n" +
        "- A missing rate for a target: the total selling price needed, minus what the known part fetched, is what the rest must fetch.",
      formula: {
        label: "Splitting by two rates",
        latex: "\\dfrac{\\text{part at } p_1}{\\text{part at } p_2} = \\dfrac{p_2 - P}{P - p_1}",
      },
      authoredExample: {
        prompt: "A dealer has 240 kg of wheat. He sells part at \\(6\\%\\) profit and the rest at \\(16\\%\\) profit, gaining \\(12\\%\\) on the whole. How much does he sell at \\(16\\%\\)?",
        steps: [
          "Part at \\(6\\%\\) : part at \\(16\\%\\) \\(= (16 - 12) : (12 - 6) = 4 : 6 = 2 : 3\\).",
          "At \\(16\\%\\): \\(\\tfrac 35 \\times 240 = 144\\) kg.",
          "Check: \\(\\dfrac{96 \\times 6 + 144 \\times 16}{240} = \\dfrac{2880}{240} = 12\\).",
        ],
        answer: "144 kg.",
      },
      selfCheckExample: {
        prompt: "Goods costing ₹8,000 are sold, three quarters at \\(20\\%\\) profit and the rest at a \\(12\\%\\) loss. Find the overall profit per cent.",
        steps: ["\\(6000 \\times 1.2 = 7200\\) and \\(2000 \\times 0.88 = 1760\\).", "Takings 8960 against a cost of 8000."],
        answer: "\\(12\\%\\).",
      },
      practiceSet: [
        { prompt: "Half a stock, by cost, is sold at \\(10\\%\\) profit and half at \\(30\\%\\) profit. Find the overall profit per cent.", answer: "\\(20\\%\\)" },
        {
          prompt: "Goods worth ₹5,000 are bought; \\(60\\%\\) of them are sold at \\(25\\%\\) profit. At what profit per cent must the rest be sold to gain \\(30\\%\\) overall?",
          answer: "\\(37.5\\%\\)",
          method: "The whole must fetch 6500; the first part fetches 3750.",
        },
        { prompt: "90 kg of rice is sold, part at \\(5\\%\\) profit and the rest at \\(20\\%\\), for \\(10\\%\\) overall. How much is sold at \\(20\\%\\)?", answer: "30 kg" },
      ],
      pyqExampleId: "9e273a8e-d694-4e52-8127-806555a4825e",
      traps: [
        {
          title: "Weight by cost",
          body: "Three quarters at \\(20\\%\\) and a quarter at a \\(12\\%\\) loss is not the plain average of \\(4\\%\\); the bigger part counts three times, giving \\(12\\%\\).",
        },
        {
          title: "Each rate is on its own part",
          body: "A part's profit percentage is on that part's cost, not on the whole stock. Work part by part in rupees when in doubt.",
        },
      ],
    },
  ],
};
