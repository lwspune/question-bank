import type { SubtopicNote } from "@/app/notes/_types";

export const AF_MA_MEAN_NOTE: SubtopicNote = {
  subtopicName: "Mean Price and Mean Concentration",
  title: "Mean Price and Mean Concentration",
  oneLineDefinition:
    "The price of a mixture, or its strength, is a weighted average: total cost over total quantity, or total pure substance over total volume.",
  whyItMatters:
    "None of these questions is HARD: each asks for the price or the strength of a mixture from what went into it. The one mistake that costs marks is averaging the prices or percentages without weighting them by how much of each was used. The next page runs the same average backwards.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "afma-mean-price",
      name: "Mean price of a mixture",
      intuition:
        "Mixing two rices in the ratio \\(3 : 2\\) is the same as buying 3 kg of one and 2 kg of the other. The mixture's price is what the 5 kg cost, divided by 5.",
      definition:
        "- Mixed in the ratio \\(a : b : c\\) at prices \\(p, q, r\\) a kg: take \\(a\\), \\(b\\) and \\(c\\) kg.\n" +
        "- Mean price \\(= \\dfrac{ap + bq + cr}{a + b + c}\\).\n" +
        "- The mean always lies between the cheapest and the dearest price, nearer the one used more.\n" +
        "- This is the cost price of the mixture. Profit on it comes later, on the profit page.",
      formula: {
        label: "Mean price",
        latex: "\\bar p = \\dfrac{ap + bq + cr}{a + b + c}",
      },
      authoredExample: {
        prompt: "Rice at ₹36 a kg and rice at ₹51 a kg are mixed in the ratio \\(3 : 2\\). Find the price of the mixture a kg.",
        steps: [
          "3 kg cost \\(3 \\times 36 = 108\\) and 2 kg cost \\(2 \\times 51 = 102\\).",
          "5 kg cost 210 rupees, so 1 kg costs \\(210 \\div 5 = 42\\).",
        ],
        answer: "₹42 a kg.",
      },
      selfCheckExample: {
        prompt: "Teas at ₹200, ₹250 and ₹300 a kg are mixed in the ratio \\(1 : 2 : 2\\). Find the price of the mixture a kg.",
        steps: ["\\(200 + 500 + 600 = 1300\\) rupees for 5 kg.", "\\(1300 \\div 5 = 260\\)."],
        answer: "₹260 a kg.",
      },
      practiceSet: [
        { prompt: "Sugar at ₹44 a kg and at ₹56 a kg are mixed in equal amounts. Find the price of the mixture a kg.", answer: "₹50" },
        { prompt: "Pulses at ₹12 a kg and ₹18 a kg are mixed in the ratio \\(2 : 1\\). Find the price of the mixture a kg.", answer: "₹14" },
        { prompt: "Nuts at ₹50, ₹70 and ₹90 a kg are mixed in the ratio \\(1 : 1 : 2\\). Find the price of the mixture a kg.", answer: "₹75" },
      ],
      pyqExampleId: "115b726b-c099-478e-ab8f-65d625fb7d25",
      traps: [
        {
          title: "Weight the prices; do not average them",
          body: "₹45 and ₹75 a kg mixed \\(2 : 1\\) cost \\(\\dfrac{90 + 75}{3} = 55\\) rupees a kg. The plain average, 60, treats the two as used equally.",
        },
        {
          title: "Divide by the sum of the ratio",
          body: "Three kinds mixed \\(1 : 2 : 3\\) make 6 kg in one round, so divide the total cost by 6, not by 3, the number of kinds.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afma-mean-strength",
      name: "Mean strength: add up the pure part",
      intuition:
        "Mixing solutions of different strengths, count the litres of pure substance each one brings, add them, and divide by the total volume. Alloys work the same way with kilograms of metal.",
      definition:
        "- Pure part \\(=\\) strength \\(\\times\\) volume. Strength of the mixture \\(=\\) total pure part \\(\\div\\) total volume.\n" +
        "- Given the ratio of the volumes instead, weight each strength by its term, exactly as with prices.\n" +
        "- A mixture given as a ratio (gold : copper \\(5 : 3\\)) is a fraction first: gold is \\(\\tfrac 58\\) of it.\n" +
        "- Equal amounts of two mixtures: average the two fractions, then turn the result back into a ratio.",
      formula: {
        label: "Mean strength",
        latex: "c = \\dfrac{c_1 V_1 + c_2 V_2}{V_1 + V_2}",
      },
      authoredExample: {
        prompt: "30 litres of a 15% salt solution are mixed with 15 litres of a 45% salt solution. Find the strength of the mixture.",
        steps: [
          "Salt: \\(0.15 \\times 30 = 4.5\\) and \\(0.45 \\times 15 = 6.75\\) litres, 11.25 in all.",
          "The mixture is 45 litres: \\(\\dfrac{11.25}{45} = 0.25\\).",
        ],
        answer: "25% salt.",
      },
      selfCheckExample: {
        prompt: "Alloy A has copper and zinc in the ratio \\(3 : 1\\), alloy B in the ratio \\(1 : 1\\). Equal weights of the two are melted together. Find the ratio of copper to zinc.",
        steps: [
          "Copper is \\(\\tfrac 34\\) of A and \\(\\tfrac 12\\) of B.",
          "Equal weights: copper is \\(\\tfrac 12\\left(\\tfrac 34 + \\tfrac 12\\right) = \\tfrac 58\\) of the new alloy.",
        ],
        answer: "\\(5 : 3\\).",
      },
      practiceSet: [
        { prompt: "25 litres of a mixture that is 60% milk are mixed with 15 litres that are 28% milk. Find the percentage of milk.", answer: "48%" },
        { prompt: "Acid solutions of 5%, 15% and 25% are mixed in the ratio \\(1 : 1 : 2\\). Find the strength of the mixture.", answer: "17.5%" },
        { prompt: "Equal volumes of milk and water mixtures in the ratios \\(1 : 2\\) and \\(1 : 1\\) are mixed. Find the ratio of milk to water.", answer: "\\(5 : 7\\)" },
      ],
      pyqExampleId: "8e7049c1-f6e0-44e0-bbc2-acfa5677152e",
      traps: [
        {
          title: "Do not add the ratio terms",
          body: "Equal amounts of a \\(1 : 1\\) and a \\(1 : 4\\) mixture are not \\(2 : 5\\). Milk is \\(\\tfrac 12\\) of one and \\(\\tfrac 15\\) of the other, so the mixture is \\(\\tfrac{7}{20}\\) milk: \\(7 : 13\\).",
        },
      ],
    },
  ],
};
