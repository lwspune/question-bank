import type { SubtopicNote } from "@/app/notes/_types";

export const AF_MA_ALLIGATION_NOTE: SubtopicNote = {
  subtopicName: "Rule of Alligation",
  title: "The Rule of Alligation",
  oneLineDefinition:
    "Given two prices or strengths and the mean of their mixture, the alligation cross gives the ratio in which they were mixed, and from it any quantity or missing price.",
  whyItMatters:
    "The cross is the fastest tool in the chapter, and the profit page leans on it. It also settles questions that are not about mixtures at all: heads and legs, wages of men and women. Marks go when the two differences are attached to the wrong sides, or when the ratio is scaled against the wrong known quantity.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "afma-cross-ratio",
      visualizationSlug: "af-alligation-cross",
      name: "The alligation cross",
      intuition:
        "Alligation is the mean price run backwards. Given the two prices and the mean, it gives the ratio of the quantities. Each kind gets the other kind's distance from the mean: the further the dear one is above the mean, the more of the cheap one you need.",
      definition:
        "- Cheaper price \\(c\\), dearer price \\(d\\), mean \\(m\\), with \\(c < m < d\\).\n" +
        "- Cheaper : dearer \\(= (d - m) : (m - c)\\).\n" +
        "- Draw it as a cross: the two values on top, the mean in the middle, and each difference written under the opposite value.\n" +
        "- It works for anything averaged by quantity: prices, percentage strengths, and mixtures given as ratios once they are turned into fractions (alcohol : water \\(2 : 3\\) is 40% alcohol).",
      formula: {
        label: "Rule of alligation",
        latex: "\\dfrac{\\text{cheaper}}{\\text{dearer}} = \\dfrac{d - m}{m - c}",
      },
      authoredExample: {
        prompt: "In what ratio must tea at ₹120 a kg be mixed with tea at ₹180 a kg to make a mixture worth ₹140 a kg?",
        steps: [
          "Dearer minus mean: \\(180 - 140 = 40\\). Mean minus cheaper: \\(140 - 120 = 20\\).",
          "Cheaper : dearer \\(= 40 : 20 = 2 : 1\\).",
          "Check: \\(\\dfrac{2 \\times 120 + 180}{3} = 140\\).",
        ],
        answer: "\\(2 : 1\\).",
      },
      selfCheckExample: {
        prompt: "Mixture A has alcohol and water in the ratio \\(1 : 4\\), mixture B in the ratio \\(2 : 1\\). In what ratio must A and B be mixed to get equal alcohol and water?",
        steps: [
          "Alcohol is \\(\\tfrac 15\\) of A and \\(\\tfrac 23\\) of B; the target is \\(\\tfrac 12\\).",
          "A : B \\(= \\left(\\tfrac 23 - \\tfrac 12\\right) : \\left(\\tfrac 12 - \\tfrac 15\\right) = \\tfrac 16 : \\tfrac{3}{10}\\).",
          "Multiply by 30: \\(5 : 9\\).",
        ],
        answer: "\\(5 : 9\\).",
      },
      practiceSet: [
        { prompt: "In what ratio must a 10% and a 25% acid solution be mixed to get a 16% solution?", answer: "\\(3 : 2\\)" },
        { prompt: "In what ratio must rice at ₹18 a kg and at ₹30 a kg be mixed to make rice worth ₹22 a kg?", answer: "\\(2 : 1\\)" },
        { prompt: "Alloys with 40% and 70% silver are melted together to give 60% silver. Find the ratio of the first alloy to the second.", answer: "\\(1 : 2\\)" },
      ],
      pyqExampleId: "a1115b30-b019-4295-bfdf-1ed65c4669d3",
      traps: [
        {
          title: "The cheaper kind gets the dearer kind's distance",
          body: "Mixing ₹10 and ₹20 to make ₹12: the cheaper gets \\(20 - 12 = 8\\) and the dearer \\(12 - 10 = 2\\), so cheaper : dearer \\(= 4 : 1\\). Pairing each price with its own distance gives \\(1 : 4\\), the ratio turned round.",
        },
        {
          title: "The mean must lie between the two",
          body: "A 40% and a 60% solution can never make a 70% one. If the target is outside the two values, a difference comes out negative: re-read the stem.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afma-cross-quantity",
      name: "From the ratio to a quantity, a price, or any average",
      intuition:
        "The cross gives a ratio. A question usually wants litres, kilograms or a price, so scale the ratio to the one quantity you are given.",
      definition:
        "- Known amount of one kind: divide it by its own term to get one part, then multiply by the other term.\n" +
        "- Known total: split it in the ratio, as in dividing a sum.\n" +
        "- Unknown price: write the given ratio as \\((d - m) : (m - c)\\) and solve for the missing price.\n" +
        "- Any two-group average: heads and legs (2 and 4 legs, the mean is legs per head), wages of men and women, two parts of a stock. Put the two values and their average in the cross.",
      formula: {
        label: "Scaling the ratio",
        latex: "\\text{cheaper} = \\dfrac{d - m}{m - c} \\times \\text{dearer}",
      },
      authoredExample: {
        prompt: "How much of a 25% acid solution must be added to 12 litres of a 55% solution to make a 35% solution?",
        steps: [
          "Weak : strong \\(= (55 - 35) : (35 - 25) = 20 : 10 = 2 : 1\\).",
          "The strong solution is 1 part, 12 litres, so the weak one is \\(2 \\times 12 = 24\\) litres.",
          "Check: \\(6 + 6.6 = 12.6\\) litres of acid in 36 is 35%.",
        ],
        answer: "24 litres.",
      },
      selfCheckExample: {
        prompt: "A farm has hens and goats, 30 heads and 84 legs. How many hens are there?",
        steps: [
          "The mean is \\(84 \\div 30 = 2.8\\) legs a head.",
          "Hens : goats \\(= (4 - 2.8) : (2.8 - 2) = 1.2 : 0.8 = 3 : 2\\).",
          "Hens are \\(\\tfrac 35 \\times 30\\). Check: \\(36 + 48 = 84\\) legs.",
        ],
        answer: "18 hens.",
      },
      practiceSet: [
        { prompt: "Tea at ₹150 a kg is mixed with 8 kg of tea at ₹200 a kg to cost ₹160 a kg. How much of the cheaper tea is used?", answer: "32 kg" },
        { prompt: "24 workers earn ₹10,200 a day. Each man earns ₹500 and each woman ₹350. How many men are there?", answer: "12", method: "The mean wage is ₹425." },
        { prompt: "Tea at ₹100 a kg and a dearer tea are mixed in the ratio \\(3 : 1\\) to cost ₹115 a kg. Find the price of the dearer tea.", answer: "₹160 a kg", method: "\\((x - 115) : 15 = 3 : 1\\)." },
      ],
      pyqExampleId: "4cfe5bf5-2b68-4fb7-a863-aea03c5eefea",
      traps: [
        {
          title: "Scale from the right side",
          body: "If cheaper : dearer is \\(3 : 2\\) and 12 kg of the dearer kind is used, one part is 6 kg and the cheaper kind is 18 kg. Multiplying 12 by \\(\\tfrac 23\\) attaches the known amount to the wrong term.",
        },
      ],
    },
  ],
};
