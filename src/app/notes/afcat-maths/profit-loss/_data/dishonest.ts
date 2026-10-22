import type { SubtopicNote } from "@/app/notes/_types";

export const AF_PL_DISHONEST_NOTE: SubtopicNote = {
  subtopicName: "Dishonest Dealers and False Weights",
  title: "False Weights, Short Measures and Adulteration",
  oneLineDefinition:
    "A dishonest seller gives less than he charges for; his real profit compares the money taken with what the goods actually handed over cost him.",
  whyItMatters:
    "No AFCAT past-year question sits on this page, but more than a quarter of its rows are HARD. One idea settles all of them: the cost of what is handed over against the money taken. Marks go on dividing by the weight claimed instead of the weight given, and on adding two gains that multiply.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "afpl-short-weight",
      name: "Selling at cost price with a short weight",
      intuition:
        "Charging for 1000 g but handing over 900 g at cost price: the 900 g cost him the price of 900 g and fetch the price of 1000 g. His gain is 100 g worth on 900 g worth.",
      definition:
        "- Gain % \\(= \\dfrac{\\text{true weight} - \\text{weight given}}{\\text{weight given}} \\times 100\\).\n" +
        "- The base is the weight actually given, not the kilogram claimed.\n" +
        "- A weight '\\(x\\%\\) less than standard' gives \\((100 - x)\\) g for every 100 g charged.\n" +
        "- Short lengths and short measures (a 'metre' rod, a 'litre' can) work the same way.",
      formula: {
        label: "Gain from a short weight",
        latex: "\\text{Gain}\\% = \\dfrac{\\text{error}}{\\text{true value} - \\text{error}} \\times 100",
      },
      authoredExample: {
        prompt: "A shopkeeper claims to sell at cost price but uses a weight of 960 g for a kilogram. Find his gain per cent.",
        steps: ["He gains 40 g worth on every 960 g he gives.", "\\(\\dfrac{40}{960} \\times 100 = \\dfrac{25}{6} = 4\\tfrac 16\\%\\)."],
        answer: "\\(4\\tfrac 16\\%\\).",
      },
      selfCheckExample: {
        prompt: "A dealer sells at cost price but gives 750 g for every kilogram. Find his gain per cent.",
        steps: ["He gains 250 g worth on 750 g."],
        answer: "\\(33\\tfrac 13\\%\\).",
      },
      practiceSet: [
        { prompt: "A trader uses a 900 g weight for 1 kg and sells at cost price. Find his gain per cent.", answer: "\\(11\\tfrac 19\\%\\)" },
        { prompt: "A trader's weight is \\(20\\%\\) less than standard and he sells at cost price. Find his gain per cent.", answer: "\\(25\\%\\)" },
        { prompt: "A trader's 'kilogram' weighs only 500 g and he sells at cost price. Find his gain per cent.", answer: "\\(100\\%\\)" },
      ],
      pyqExampleId: "a8f4c923-5c70-49f2-b42a-4da4e9b5b4e2",
      traps: [
        {
          title: "Divide by what was given",
          body: "960 g for a kilogram gains 40 on 960, that is \\(4\\tfrac 16\\%\\). Dividing by 1000 gives \\(4\\%\\), the option set for that slip.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afpl-weight-and-price",
      name: "A short weight with a profit, a loss or a discount",
      intuition:
        "Take the cost of a true kilogram as 100. The price he charges comes from his stated profit, loss or discount; what he hands over costs him only the share of a kilogram he gives.",
      definition:
        "- Price charged per 'kilogram' \\(= 100 \\times \\left(1 \\pm \\tfrac{s}{100}\\right)\\), after any markup and discount.\n" +
        "- Cost of the goods handed over \\(= 100 \\times w\\), where \\(w\\) is the fraction of a true kilogram given.\n" +
        "- Actual profit % \\(= \\left(\\dfrac{1 \\pm s/100}{w} - 1\\right) \\times 100\\).\n" +
        "- A scale that shows \\(x\\%\\) more than the true weight hands over \\(\\dfrac{100}{100 + x}\\) of what it shows.\n" +
        "- A stated loss can turn into a real profit once the weight is short.",
      formula: {
        label: "Actual profit with a short weight",
        latex: "\\text{Profit}\\% = \\left(\\dfrac{1 \\pm \\frac{s}{100}}{w} - 1\\right) \\times 100",
      },
      authoredExample: {
        prompt: "A grocer sells at a \\(4\\%\\) loss but gives only 800 g for every kilogram. Find his actual gain or loss per cent.",
        steps: [
          "Cost of a true kilogram 100, so he charges 96.",
          "He hands over 800 g, which cost him 80.",
          "\\(\\dfrac{96 - 80}{80} \\times 100 = 20\\%\\).",
        ],
        answer: "\\(20\\%\\) gain.",
      },
      selfCheckExample: {
        prompt: "A trader marks goods \\(20\\%\\) above cost, allows a \\(5\\%\\) discount and gives 960 g for a kilogram. Find his profit per cent.",
        steps: ["He charges \\(120 \\times 0.95 = 114\\).", "The goods given cost 96, so the profit is 18 on 96."],
        answer: "\\(18.75\\%\\).",
      },
      practiceSet: [
        { prompt: "A seller claims a \\(25\\%\\) profit and gives 800 g for a kilogram. Find his actual profit per cent.", answer: "\\(56.25\\%\\)" },
        { prompt: "A seller claims a \\(12\\%\\) loss and gives 880 g for a kilogram. Find his actual result.", answer: "No profit, no loss" },
        {
          prompt: "Oil costing ₹100 a litre is sold at ₹120 a litre with a measure that holds only 750 ml. Find the actual profit per cent.",
          answer: "\\(60\\%\\)",
          method: "The oil handed over cost 75.",
        },
      ],
      pyqExampleId: "f1a4b9a5-8e48-4af5-97fd-a7e287b4b000",
      traps: [
        {
          title: "Two gains multiply",
          body: "A \\(25\\%\\) profit together with 800 g for a kilogram is \\(1.25 \\times 1.25 = 1.5625\\), a profit of \\(56.25\\%\\), not \\(50\\%\\).",
        },
        {
          title: "The cost is of what he hands over",
          body: "With 800 g given, the cost to compare against is 80, not 100. Comparing the price with a full kilogram's cost leaves only the stated profit.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afpl-two-weights",
      name: "Different false weights for buying and selling",
      intuition:
        "Cheating on both sides multiplies. Buying, he gets more than he pays for; selling, he gives less than he charges for. Follow one rupee through both.",
      definition:
        "- Buying, he receives \\(b\\) kg for each kilogram paid for (\\(b > 1\\) if he cheats the supplier); selling, he gives \\(s\\) kg for each kilogram charged (\\(s < 1\\)).\n" +
        "- At cost price both ways, the profit factor is \\(\\dfrac bs\\), so profit % \\(= \\left(\\dfrac bs - 1\\right) \\times 100\\).\n" +
        "- A balance that cheats the same way both times cancels: what it gains him when buying it loses him when selling.",
      formula: {
        label: "Two false weights",
        latex: "\\text{Profit}\\% = \\left(\\dfrac{b}{s} - 1\\right) \\times 100",
      },
      authoredExample: {
        prompt:
          "A dealer gets 1.2 kg for every kilogram he pays for when buying, and gives 0.8 kg for every kilogram he charges for when selling, both at cost price. Find his profit per cent.",
        steps: ["Profit factor \\(= \\dfrac{1.2}{0.8} = 1.5\\).", "So the profit is \\(50\\%\\)."],
        answer: "\\(50\\%\\).",
      },
      selfCheckExample: {
        prompt: "A trader treats 1050 g as a kilogram when buying and 840 g as a kilogram when selling. Find his profit per cent.",
        steps: ["\\(\\dfrac{1050}{840} = 1.25\\)."],
        answer: "\\(25\\%\\).",
      },
      practiceSet: [
        { prompt: "A trader gets 1.25 kg for each kilogram he pays for and sells honestly at cost price. Find his gain per cent.", answer: "\\(25\\%\\)" },
        { prompt: "A trader gets \\(15\\%\\) more when buying and gives \\(15\\%\\) less when selling, at cost price. Find his gain per cent, to two decimal places.", answer: "\\(35.29\\%\\)" },
        { prompt: "A faulty balance reads 1 kg for 1.2 kg, and the trader uses it both to buy and to sell at cost price. Find his result.", answer: "No profit, no loss" },
      ],
      pyqExampleId: "20f8a2b9-f314-4a04-976d-4f8a138e1574",
      traps: [
        {
          title: "Do not add the percentages",
          body: "\\(20\\%\\) more when buying and \\(20\\%\\) less when selling is \\(\\tfrac{1.2}{0.8} = 1.5\\), a \\(50\\%\\) profit, not \\(40\\%\\).",
        },
        {
          title: "One balance used both ways cancels",
          body: "If the same faulty balance is used for buying and selling, the gain on one side is lost on the other: no profit, no loss.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afpl-adulteration",
      name: "Mixing in water, sand or a cheaper grade",
      intuition:
        "Water or sand costs nothing but is sold as the real thing. The cost is the real part only, while the money comes in on the whole mixture.",
      definition:
        "- Sold at the cost price of the pure goods: gain % \\(= \\dfrac{\\text{filler}}{\\text{real part}} \\times 100\\). Water : milk \\(= 1 : 3\\) gives \\(33\\tfrac 13\\%\\).\n" +
        "- For a gain of \\(g\\%\\) at cost price, water is \\(\\dfrac{g}{100 + g}\\) of the mixture.\n" +
        "- A filler that costs something: add both costs and divide by the total quantity.\n" +
        "- An alloy sold at the price of the pure metal: the cost is the alloy's price and the selling price the pure metal's.\n" +
        "- A short measure on top of the water: cost only the milk actually handed over.",
      formula: {
        label: "Gain from a free filler at cost price",
        latex: "\\text{Gain}\\% = \\dfrac{\\text{filler}}{\\text{real part}} \\times 100",
      },
      authoredExample: {
        prompt:
          "A milkman adds 1 litre of water to every 5 litres of milk and sells the mixture at the cost price of milk. Find his gain per cent and the percentage of water in the mixture.",
        steps: [
          "6 litres sell at the price of 6 litres of milk but cost only 5: a gain of 1 on 5, \\(20\\%\\).",
          "Water is 1 litre in 6: \\(16\\tfrac 23\\%\\) of the mixture.",
        ],
        answer: "\\(20\\%\\) gain; \\(16\\tfrac 23\\%\\) water.",
      },
      selfCheckExample: {
        prompt: "A grocer mixes 50 kg of sugar costing ₹42 a kg with 10 kg of sand. At what price per kg must he sell to gain \\(20\\%\\)?",
        steps: ["Cost \\(= 50 \\times 42 = 2100\\); for a \\(20\\%\\) gain he needs 2520.", "\\(2520 \\div 60 = 42\\)."],
        answer: "₹42 a kg, the cost price of sugar itself.",
      },
      practiceSet: [
        { prompt: "Water and milk are mixed \\(1 : 9\\) and sold at the cost price of milk. Find the gain per cent.", answer: "\\(11\\tfrac 19\\%\\)" },
        { prompt: "A milkman gains \\(50\\%\\) by adding water and selling at the cost price of milk. What percentage of the mixture is water?", answer: "\\(33\\tfrac 13\\%\\)" },
        { prompt: "An alloy costing ₹45,000 per 100 g is sold at the price of pure gold, ₹54,000 per 100 g. Find the profit per cent.", answer: "\\(20\\%\\)" },
        { prompt: "1 litre of ghee at ₹500 is mixed with 250 ml of oil at ₹100 a litre. Find the cost per litre of the mixture.", answer: "₹420" },
      ],
      pyqExampleId: "afaeea69-7d56-42de-bc1e-6c43c4d0061d",
      traps: [
        {
          title: "Water's share is of the mixture",
          body: "A \\(20\\%\\) gain at cost price means 1 part water to 5 parts milk, which is \\(\\tfrac 16\\) of the mixture, not \\(20\\%\\) of it.",
        },
        {
          title: "Free filler adds weight, not cost",
          body: "Sand mixed in raises the quantity sold but not the cost, so divide the target takings by the whole weight, sand included.",
        },
      ],
    },
  ],
};
