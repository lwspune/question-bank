import type { SubtopicNote } from "@/app/notes/_types";

export const AF_MA_PERCENT_NOTE: SubtopicNote = {
  subtopicName: "Percentage Strength of a Mixture",
  title: "Percentage Strength of a Mixture",
  oneLineDefinition:
    "When a mixture is described in percentages, the liquid you do not pour in stays fixed, and its new share of the mixture gives the new total in one division.",
  whyItMatters:
    "Three AFCAT past-year questions sit here, from 2016, 2018 and 2019, and four of the page's questions are HARD. Each one is a single division: the liquid that stays fixed, over its new share of the mixture. The marks go when that share belongs to the liquid being poured in.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "afma-fixed-share",
      name: "When the percentage is of the liquid that stays",
      intuition:
        "Whatever is not poured in stays the same amount. If the target percentage is about that liquid, it tells you the new total at once: the fixed litres are that share of it.",
      definition:
        "- Find the litres of the liquid that is not added. It stays fixed.\n" +
        "- If the new percentage is of that liquid, the new total is the fixed litres divided by the new share.\n" +
        "- The amount to add is the new total minus the old one.\n" +
        "- The fixed liquid can be the milk (water poured in to dilute it) or the water (milk poured in, 'make the water 30%').\n" +
        "- Asked only for the new percentage after adding: fixed litres over the new total.\n" +
        "- Value works the same way: milk worth a fixed sum, sold at a lower price a litre, must fill (value ÷ new price) litres; the extra is water.",
      formula: {
        label: "New total",
        latex: "\\text{new total} = \\dfrac{\\text{fixed amount}}{\\text{its new share}}",
      },
      authoredExample: {
        prompt: "How much water must be added to 30 litres of a 40% acid solution to make it 25% acid?",
        steps: [
          "The acid is \\(0.4 \\times 30 = 12\\) litres, and adding water leaves it at 12.",
          "At 25% the 12 litres are a quarter of the mixture: \\(12 \\div 0.25 = 48\\) litres.",
          "Add \\(48 - 30 = 18\\) litres.",
        ],
        answer: "18 litres.",
      },
      selfCheckExample: {
        prompt: "60 litres of milk contain 15% water. How much pure milk must be added so that the water is 10% of the mixture?",
        steps: [
          "The water is 9 litres and stays 9.",
          "At 10%: \\(9 \\div 0.1 = 90\\) litres, so add 30 litres of milk.",
        ],
        answer: "30 litres.",
      },
      practiceSet: [
        { prompt: "How much water must be added to 32 litres of a 25% sugar solution to make it 20% sugar?", answer: "8 litres" },
        { prompt: "A 36-litre mixture is 75% milk. How much water must be added to make the milk 60%?", answer: "9 litres" },
        { prompt: "How much water must be added to 24 litres of milk costing ₹6 a litre so that the mixture costs ₹4.50 a litre?", answer: "8 litres", method: "The milk is worth ₹144, which fills 32 litres at ₹4.50." },
        { prompt: "25 litres of a 60% alcohol solution are mixed with 5 litres of water. What percentage of the mixture is alcohol?", answer: "50%" },
      ],
      pyqExampleId: "ce8ad7f8-ff6a-4e19-8f2c-52b3beefe45e",
      traps: [
        {
          title: "Divide by the new share; do not subtract percentages",
          body: "Taking 16 litres of 50% milk down to 40% does not need 10% of 16 litres of water. The 8 litres of milk must be 40% of the new mixture, which is 20 litres, so add 4 litres.",
        },
        {
          title: "A percentage is of the whole mixture",
          body: "A 4% impurity means 4 litres in every 100 litres of the mixture, impurity included. It is not 4 litres for every 100 litres of the pure liquid.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afma-added-share",
      name: "When the percentage is of the liquid you add",
      intuition:
        "Pouring pure alcohol in to raise the alcohol percentage changes the alcohol, so the alcohol cannot be the fixed amount. The water is: it was one share before and is 100% minus the target after.",
      definition:
        "- If you pour in the very liquid the percentage is about, that liquid changes. Switch to the other liquid: it stays fixed.\n" +
        "- Its share after is 100% minus the target, so the new total is its litres divided by \\(1 - p\\).\n" +
        "- The amount to add is the new total minus the old one.\n" +
        "- The equation route is a safe check: \\(\\dfrac{a + x}{T + x} = p\\), where \\(a\\) is the liquid being added.",
      formula: {
        label: "New total",
        latex: "\\text{new total} = \\dfrac{\\text{other liquid}}{1 - p}",
      },
      authoredExample: {
        prompt: "How much pure alcohol must be added to 40 litres of a 20% alcohol solution to make it 50% alcohol?",
        steps: [
          "The water is \\(0.8 \\times 40 = 32\\) litres, and adding alcohol leaves it at 32.",
          "At 50% alcohol the water is 50%: \\(32 \\div 0.5 = 64\\) litres.",
          "Add \\(64 - 40 = 24\\) litres. Check: \\(8 + 24 = 32\\) litres of alcohol in 64.",
        ],
        answer: "24 litres.",
      },
      selfCheckExample: {
        prompt: "20 litres of milk and water contain 10% water. How much water must be added so that the water is 25% of the mixture?",
        steps: [
          "The milk is 18 litres and stays 18; afterwards it is 75% of the mixture.",
          "\\(18 \\div 0.75 = 24\\) litres, so add 4 litres of water.",
        ],
        answer: "4 litres.",
      },
      practiceSet: [
        { prompt: "How much pure acid must be added to 15 litres of a 20% acid solution to make it 40% acid?", answer: "5 litres" },
        { prompt: "How much sugar must be added to 60 kg of a 15% sugar solution to make it 40% sugar?", answer: "25 kg", method: "The water, 51 kg, must be 60%." },
        { prompt: "18 litres of a mixture are half milk. How much pure milk must be added to make it 80% milk?", answer: "27 litres" },
      ],
      pyqExampleId: "c79ffb33-da8f-4b6d-bcb2-e430365c5385",
      traps: [
        {
          title: "Using the target share for the liquid that changes",
          body: "Raising 10 litres of 40% acid to 60% by adding acid: dividing the 4 litres of acid by 60% gives 6.67 litres, less than you started with. The acid is the liquid that changes. Divide the 6 litres of water by 40% instead: 15 litres, so add 5.",
        },
      ],
    },
  ],
};
