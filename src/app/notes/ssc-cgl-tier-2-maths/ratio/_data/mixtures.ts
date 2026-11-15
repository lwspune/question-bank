import type { SubtopicNote } from "@/app/notes/_types";

export const SSC2_RA_MIXTURES_NOTE: SubtopicNote = {
  subtopicName: "Mixtures and Alligation",
  title: "Mixtures and Alligation",
  oneLineDefinition:
    "A mixture's price or strength lies between its parts, and alligation gives the ratio of the parts from the distances; add ingredients amount by amount, and repeated replacement shrinks one ingredient by the same factor each time.",
  whyItMatters:
    "15 questions in the Tier II bank, 7 EASY and 8 MODERATE, the largest page of the chapter. Most are alligation in disguise: a price, a strength or a profit percentage averaged between two parts.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssc2ramx-alligation",
      name: "Alligation",
      intuition:
        "Mix a cheap thing with a dear one and the mixture's price lies between them. The quantities are in the ratio of the distances from that mean, crossed over: the cheap part takes the dear part's distance.",
      definition:
        "- Cheap price c, dear price d, mean m: cheap : dear \\(= (d - m) : (m - c)\\).\n" +
        "- The 'price' can be anything that is averaged: cost per kg, the fraction of milk, a profit percentage.\n" +
        "- When a selling price and a profit are given, find the mixture's cost price first: SP \\(\\div \\left(1 + \\frac{p}{100}\\right)\\).\n" +
        "- For a strength, use fractions, not the ratio numbers: milk and water 4 : 5 is \\(\\frac{4}{9}\\) milk.",
      formula: {
        label: "Alligation",
        latex: "\\frac{\\text{cheap}}{\\text{dear}} = \\frac{d - m}{m - c}",
      },
      authoredExample: {
        prompt: "Tea at ₹180 a kg is mixed with tea at ₹240 a kg so that the mixture costs ₹200 a kg. In what ratio are they mixed?",
        steps: ["Cheap : dear \\(= (240 - 200) : (200 - 180) = 40 : 20\\).", "That is 2 : 1."],
        answer: "2 : 1",
      },
      selfCheckExample: {
        prompt: "A grocer mixes rice at ₹40 a kg with 15 kg of rice at ₹55 a kg, and sells the mixture at ₹55.20 a kg for a 20% profit. How much of the ₹40 rice did he use?",
        steps: [
          "The mixture costs \\(55.20 \\div 1.2 = 46\\) rupees a kg.",
          "Cheap : dear \\(= (55 - 46) : (46 - 40) = 9 : 6 = 3 : 2\\).",
          "Cheap rice \\(= 15 \\times \\frac{3}{2} = 22.5\\) kg.",
        ],
        answer: "22.5 kg",
      },
      practiceSet: [
        { prompt: "In what ratio must sugar at ₹36 a kg be mixed with sugar at ₹48 a kg to get a mixture worth ₹40 a kg?", answer: "2 : 1" },
        { prompt: "A trader sells part of his stock at a 10% profit and the rest at a 4% loss, making 6% overall. Find the ratio of the profit part to the loss part.", answer: "5 : 2" },
        { prompt: "6 kg of rice at ₹50 a kg is mixed with 4 kg at ₹60 a kg. Find the price of the mixture per kg.", answer: "₹54" },
      ],
      pyqExampleId: "d59c1b64-4cac-4dc1-831c-23084049aa88",
      traps: [
        {
          title: "Putting the distances on the wrong side",
          body: "The cheap part's share is the DEAR price minus the mean. Mixing ₹180 and ₹240 tea to ₹200 takes 40 parts of the cheap tea to 20 of the dear, not the other way round.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2ramx-combine",
      name: "Combining mixtures of known ratios",
      intuition:
        "When two mixtures, each with its own ratio, are poured together, add the actual amounts of each ingredient, never the ratio numbers. Giving both mixtures a common total makes the adding easy.",
      definition:
        "- Turn each ratio into fractions of its own mixture: 4 : 3 is \\(\\frac{4}{7}\\) and \\(\\frac{3}{7}\\).\n" +
        "- Multiply by the amount of that mixture taken, then add ingredient by ingredient.\n" +
        "- For equal amounts, take each mixture as the LCM of the two ratio totals.\n" +
        "- Moving part of a mixture to another vessel carries each ingredient in the mixture's own ratio.",
      formula: {
        label: "An ingredient in the combined mixture",
        latex: "\\text{ingredient} = \\sum \\left(\\text{amount taken} \\times \\text{its fraction in that mixture}\\right)",
      },
      authoredExample: {
        prompt: "Equal volumes of two mixtures are poured together. The first has milk and water in the ratio 3 : 1 and the second 5 : 3. Find the ratio of milk to water in the result.",
        steps: ["Take 8 units of each (the LCM of 4 and 8): the first is 6 : 2, the second 5 : 3.", "Milk \\(6 + 5 = 11\\), water \\(2 + 3 = 5\\): 11 : 5."],
        answer: "11 : 5",
      },
      selfCheckExample: {
        prompt: "Alloy P has copper and zinc in the ratio 3 : 2 and alloy Q has them 1 : 3. 5 kg of P is melted with 4 kg of Q. What fraction of the new alloy is copper?",
        steps: ["Copper: 3 kg from P and 1 kg from Q, so 4 kg.", "The new alloy weighs 9 kg, so copper is \\(\\frac{4}{9}\\)."],
        answer: "\\(\\frac{4}{9}\\)",
      },
      practiceSet: [
        { prompt: "Mixtures with acid and water 1 : 2 and 2 : 3 are mixed in equal quantities. Find acid : water.", answer: "11 : 19" },
        { prompt: "6 litres of a 2 : 1 milk-water mixture is poured into 4 litres of pure water. Find milk : water.", answer: "2 : 3" },
        { prompt: "From 50 litres of a 3 : 2 juice-water mixture, 10 litres are poured into an empty jug. How much juice is in the jug?", answer: "6 litres" },
      ],
      pyqExampleId: "e41ccdf3-0d7e-4f95-997b-965628a89edc",
      traps: [
        {
          title: "Adding the ratio numbers",
          body: "Equal volumes of 3 : 1 and 5 : 3 mixtures do not make 8 : 4. Give both the same total first: 6 : 2 and 5 : 3 make 11 : 5.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2ramx-replace",
      name: "Adding, removing and replacing",
      intuition:
        "Add one ingredient and the other stays exactly as it was. Take out some mixture and refill with water, again and again, and the milk left shrinks by the same fraction every time.",
      definition:
        "- Adding pure water (or pure milk) leaves the other ingredient unchanged: write that ingredient's amount before and after.\n" +
        "- Replacing x litres of a V-litre mixture with water, n times in all, leaves milk \\(=\\) original milk \\(\\times \\left(1 - \\frac{x}{V}\\right)^n\\).\n" +
        "- Count the times carefully: 'done once and then repeated twice more' is 3 times.\n" +
        "- The ingredient put back is found by subtracting from V.",
      formula: {
        label: "After n replacements",
        latex: "\\text{left} = \\text{original} \\times \\left(1 - \\frac{x}{V}\\right)^n",
      },
      authoredExample: {
        prompt: "A 50-litre can is full of milk. Twice, a jug of 5 litres is drawn off and the can is topped up with water. How much milk is left?",
        steps: ["Each round keeps \\(\\frac{45}{50} = 0.9\\) of the milk.", "Milk left \\(= 50 \\times 0.9^2 = 40.5\\) litres."],
        answer: "40.5 litres",
      },
      selfCheckExample: {
        prompt: "A 40-litre mixture is 25% acid. How much water must be added to make it 20% acid?",
        steps: ["Acid \\(= 10\\) litres, and it does not change.", "10 litres must be 20% of the new total, so the total is 50 litres: add 10 litres of water."],
        answer: "10 litres",
      },
      practiceSet: [
        { prompt: "60 litres of a solution is 30% salt. How much salt must be added to make it 40% salt?", answer: "10 litres", method: "The 42 litres of water must be 60% of the new total." },
        { prompt: "From 80 litres of milk, 8 litres are replaced with water three times in all. How much milk remains?", answer: "58.32 litres" },
        { prompt: "A 30-litre mixture of milk and water is 2 : 1. How much water must be added to make it 1 : 1?", answer: "10 litres" },
      ],
      pyqExampleId: "87fa445d-cc97-4a77-a4a3-c16a7f70bc17",
      traps: [
        {
          title: "Taking out the same amount of milk each time",
          body: "Removing 5 litres from 50 litres of milk and refilling with water, three times, leaves \\(50 \\times 0.9^3 = 36.45\\) litres, not 35. Each later removal takes some water with the milk.",
        },
      ],
    },
  ],
};
