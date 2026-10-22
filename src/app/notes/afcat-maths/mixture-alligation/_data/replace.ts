import type { SubtopicNote } from "@/app/notes/_types";

export const AF_MA_REPLACE_NOTE: SubtopicNote = {
  subtopicName: "Removal and Replacement",
  title: "Removal and Replacement",
  oneLineDefinition:
    "Some of a mixture is drawn out and the same amount of a liquid is poured back, once or several times: track what each draw takes and what each top-up adds.",
  whyItMatters:
    "Two AFCAT past-year questions (both 2016) are here, and every question on the page is MODERATE or HARD. A draw takes every liquid in proportion, and a top-up with water leaves the milk a fixed fraction of what it was. Miscounting the rounds is the commonest way to lose the marks.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "afma-one-draw",
      name: "One draw and one top-up: track each liquid",
      intuition:
        "Drawing out some of a mixture is like pouring out a small copy of it: the litres removed are in the mixture's own ratio. Take that fraction off each liquid, then add what goes back in.",
      definition:
        "- Drawing \\(x\\) litres out of \\(T\\) removes the fraction \\(\\dfrac{x}{T}\\) of every liquid in it.\n" +
        "- Then add whatever is poured back to its own liquid: water to the water, milk to the milk, the pure part of a solution to the pure part.\n" +
        "- If the total is unknown, write each liquid in terms of \\(T\\) and turn the final ratio into an equation.",
      formula: {
        label: "What a draw leaves",
        latex: "\\text{left} = \\left(1 - \\dfrac{x}{T}\\right) \\times \\text{amount before}",
      },
      authoredExample: {
        prompt: "A 64-litre mixture has milk and water in the ratio \\(3 : 1\\). 16 litres are drawn out and replaced with water. Find the new ratio.",
        steps: [
          "Milk 48, water 16. Drawing 16 litres takes a quarter of each: milk 36, water 12 are left.",
          "16 litres of water go back: water 28.",
          "\\(36 : 28 = 9 : 7\\).",
        ],
        answer: "\\(9 : 7\\).",
      },
      selfCheckExample: {
        prompt: "60 litres of a 30% alcohol solution have 12 litres drawn out and replaced with an 80% alcohol solution. Find the new strength.",
        steps: [
          "Alcohol 18 litres; drawing a fifth leaves \\(14.4\\).",
          "The 12 litres poured in bring \\(9.6\\) litres of alcohol: 24 litres in 60.",
        ],
        answer: "40%.",
      },
      practiceSet: [
        { prompt: "A 40-litre mixture has milk and water in the ratio \\(3 : 1\\). 8 litres are drawn out and replaced with milk. Find the new ratio.", answer: "\\(4 : 1\\)" },
        { prompt: "30 litres of a 40% acid solution have 6 litres drawn out and replaced with water. Find the new strength.", answer: "32%" },
        { prompt: "A 45-litre mixture has milk and water in the ratio \\(4 : 1\\). 9 litres are drawn out and replaced with water. Find the new ratio.", answer: "\\(16 : 9\\)" },
      ],
      pyqExampleId: "a0462822-d7e3-4da7-bd5b-849aa807f6d6",
      traps: [
        {
          title: "A draw takes some of every liquid",
          body: "Removing 10 litres of a \\(4 : 1\\) milk and water mixture removes 8 litres of milk and 2 of water. Taking all 10 from the milk, or all from the water, changes the ratio by the wrong amount.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afma-draw-unknown",
      name: "Topping up with water: the milk keeps a fixed fraction",
      intuition:
        "When the drawn mixture is replaced with water, the milk is the only thing lost. It keeps \\(\\dfrac{T - x}{T}\\) of itself, and since the total is back to \\(T\\), its percentage shrinks by the same fraction.",
      definition:
        "- Drawn mixture replaced with water: the milk keeps the fraction \\(\\dfrac{T - x}{T}\\).\n" +
        "- The total is back to \\(T\\), so the milk's percentage is multiplied by \\(\\dfrac{T - x}{T}\\) as well.\n" +
        "- So \\(\\dfrac{\\text{milk share after}}{\\text{milk share before}} = \\dfrac{T - x}{T}\\). Solve it for \\(T\\) or for \\(x\\).\n" +
        "- Ratios work too: turn each into the milk's fraction first (\\(3 : 2\\) is \\(\\tfrac 35\\) milk).",
      formula: {
        label: "Fraction the milk keeps",
        latex: "\\dfrac{\\text{share after}}{\\text{share before}} = \\dfrac{T - x}{T}",
      },
      authoredExample: {
        prompt: "A vessel holds a mixture that is 80% milk. 6 litres are drawn out and replaced with water, and the milk is now 70%. How much does the vessel hold?",
        steps: [
          "The milk's share went from 80% to 70%, so \\(\\dfrac{T - 6}{T} = \\dfrac{70}{80} = \\dfrac 78\\).",
          "\\(8T - 48 = 7T\\), so \\(T = 48\\).",
        ],
        answer: "48 litres.",
      },
      selfCheckExample: {
        prompt: "A 36-litre mixture has milk and water in the ratio \\(2 : 1\\). How much of it must be drawn out and replaced with water to make the two equal?",
        steps: [
          "Milk goes from \\(\\tfrac 23\\) to \\(\\tfrac 12\\) of the mixture, so it keeps \\(\\tfrac 12 \\div \\tfrac 23 = \\tfrac 34\\).",
          "\\(\\dfrac{36 - x}{36} = \\dfrac 34\\) gives \\(x = 9\\).",
        ],
        answer: "9 litres.",
      },
      practiceSet: [
        { prompt: "A 30-litre mixture is half milk. How much must be drawn out and replaced with water to make it 40% milk?", answer: "6 litres" },
        { prompt: "A mixture is 90% milk. 5 litres are drawn out and replaced with water, leaving it 72% milk. Find the volume of the mixture.", answer: "25 litres" },
        { prompt: "Milk and water are in the ratio \\(4 : 1\\). 10 litres are drawn out and replaced with water, making the ratio \\(2 : 3\\). Find the volume of the mixture.", answer: "20 litres" },
      ],
      pyqExampleId: "1023d268-6f79-4e73-a67d-f28dc4103c45",
      traps: [
        {
          title: "The percentage is multiplied, not reduced by a subtraction",
          body: "Drawing a quarter of a 90% milk mixture and topping it up with water leaves \\(90\\% \\times \\tfrac 34 = 67.5\\%\\) milk. Subtracting 25 points gives 65%, which is wrong.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afma-repeated",
      name: "Repeated replacement",
      intuition:
        "Each round keeps the same fraction of the milk that is there at the time, so the fraction multiplies round after round, like compound interest in reverse.",
      definition:
        "- Each round keeps the fraction \\(\\dfrac{V - x}{V}\\) of the milk; after \\(n\\) rounds the milk is \\(V\\left(1 - \\dfrac xV\\right)^n\\).\n" +
        "- Count the rounds carefully: 'done twice in all' is 2 rounds, 'repeated two more times' is 3.\n" +
        "- The water at the end is \\(V\\) minus the milk left, and the ratio follows from the two.",
      formula: {
        label: "Milk after n rounds",
        latex: "\\text{milk left} = V\\left(1 - \\dfrac{x}{V}\\right)^n",
      },
      authoredExample: {
        prompt: "A can holds 60 litres of milk. 12 litres are drawn out and replaced with water, and this is done twice in all. How much milk is left?",
        steps: [
          "Each round keeps \\(\\dfrac{48}{60} = 0.8\\) of the milk.",
          "After two rounds: \\(60 \\times 0.8^2 = 60 \\times 0.64 = 38.4\\) litres.",
        ],
        answer: "38.4 litres.",
      },
      selfCheckExample: {
        prompt: "A jar holds 64 litres of milk. 16 litres are replaced with water three times in all. Find the ratio of milk to water at the end.",
        steps: [
          "Milk left: \\(64 \\times \\left(\\tfrac 34\\right)^3 = 27\\) litres.",
          "Water: \\(64 - 27 = 37\\) litres.",
        ],
        answer: "\\(27 : 37\\).",
      },
      practiceSet: [
        { prompt: "100 litres of milk have 20 litres replaced with water, twice in all. How much milk is left?", answer: "64 litres" },
        { prompt: "81 litres of pure spirit have 27 litres replaced with water, twice in all. How much spirit is left?", answer: "36 litres" },
        { prompt: "25 litres of milk have 5 litres replaced with water, twice in all. Find the ratio of milk to water.", answer: "\\(16 : 9\\)" },
      ],
      pyqExampleId: "9dfcf54d-9bfa-4f36-88f3-89ef8ff5bdc4",
      traps: [
        {
          title: "Count the rounds",
          body: "'Done once and then repeated twice more' is three rounds. 'Repeated once more' after the first is two. Write the number of rounds before raising the fraction to a power.",
        },
        {
          title: "Do not subtract the same amount each round",
          body: "Two rounds of drawing 10 litres from 50 litres of milk leave \\(50 \\times 0.8^2 = 32\\) litres, not \\(50 - 20 = 30\\). The second draw takes milk and water, so it removes less than 10 litres of milk.",
        },
      ],
    },
  ],
};
