import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_RA_MIXTURES_NOTE: SubtopicNote = {
  subtopicName: "Mixture Quantities and Replacement",
  title: "Mixture Quantities and Replacement",
  oneLineDefinition:
    "A mixture question is bookkeeping: write how much of each ingredient the vessel holds, change only what the stem changes, and form the new ratio or percentage at the end.",
  whyItMatters:
    "Thirty-three questions in the bank, fourteen MODERATE and the chapter's only HARD one. Fifteen add a single ingredient, five combine two mixtures, ten take out part of a mixture before topping it up, and three repeat a replacement. The fast routes here come from spotting the ingredient that does not change.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscrami-fixed",
      name: "Adding one ingredient while the other stays fixed",
      intuition:
        "Pouring water into milk changes the water and the total, but not a drop of the milk. So the milk is a fixed anchor: its amount and the target ratio or percentage tell you exactly what the water and the total must become.",
      definition:
        "- A mixture of total T with A : B = a : b holds \\(A = \\frac{a}{a + b} \\times T\\) and B is the rest.\n" +
        "- **Adding only B** leaves A fixed. From A and the target, find the new B (or the new total) and subtract.\n" +
        "- **Percentage form:** if 12 litres of water must become 15% of the solution, the new total is \\(\\frac{12}{0.15} = 80\\) litres.\n" +
        "- **Adding the ingredient whose share you want to raise:** \\(\\frac{A + x}{T + x} = p\\), where p is the target fraction.\n" +
        "- **Fast route with ratio units:** scale the old and new ratios so the fixed ingredient has the same term in both. The rise in the other term, in units, is the amount added.\n" +
        "- **Adding to both ingredients** at once: write the equation \\(\\frac{A + x}{B + y} = \\frac{m}{n}\\).",
      formula: {
        label: "Adding to a mixture",
        latex: "\\text{new total} = \\frac{\\text{fixed amount}}{\\text{its new fraction}} \\qquad \\frac{A + x}{T + x} = p",
        symbols: [
          { symbol: "A, T", meaning: "the amount of the ingredient being added to, and the total" },
          { symbol: "p", meaning: "the target fraction of that ingredient" },
        ],
      },
      authoredExample: {
        prompt: "A 48-litre mixture has milk and water in the ratio 5 : 3. How much water must be added to make the ratio 5 : 4?",
        steps: [
          "Full method: milk \\(= \\frac{5}{8} \\times 48 = 30\\) litres and water \\(= 18\\) litres.",
          "For 5 : 4 with 30 litres of milk, water must be 24 litres. Add \\(24 - 18 = 6\\) litres.",
          "Fast route: milk is 5 parts in both ratios, so 1 part is \\(\\frac{48}{8} = 6\\) litres and water rises by 1 part, which is 6 litres.",
        ],
        answer: "6 litres",
      },
      selfCheckExample: {
        prompt: "A 30-litre solution is 40% salt. How much water must be added to make it 25% salt?",
        steps: [
          "Salt \\(= 12\\) litres and it does not change.",
          "At 25% the total must be \\(\\frac{12}{0.25} = 48\\) litres, so add \\(48 - 30 = 18\\) litres of water.",
        ],
        answer: "18 litres",
      },
      practiceSet: [
        { prompt: "A 20-litre mixture is 30% acid. 5 litres of water are added. What percentage of the new mixture is acid?", answer: "24%" },
        { prompt: "A 60-litre mixture has juice and water in the ratio 7 : 3. How much juice must be added to make the ratio 4 : 1?", answer: "30 litres" },
        { prompt: "40 litres of milk and water are in the ratio 3 : 1. How much water must be added so that water is half the mixture?", answer: "20 litres" },
        {
          prompt: "Half a litre of a solution is 20% sugar. How much pure sugar must be added to make it 60% sugar?",
          answer: "500 ml",
          method: "\\(\\frac{100 + x}{500 + x} = 0.6\\) gives \\(0.4x = 200\\).",
        },
      ],
      pyqExampleId: "4a152d3b-25c6-41e9-9c68-92e2e2845bbc",
      traps: [
        {
          title: "Working from the total instead of the fixed ingredient",
          body:
            "When only water is added, the total and the water both change, but the milk does not. Start from the milk; a percentage of the old total is the wrong anchor.",
        },
        {
          title: "Adding litres to a ratio term",
          body:
            "Adding 10 litres of water to a 5 : 3 mixture does not make it 5 : 13. Turn the ratio into litres first, add the 10 litres, and then form the new ratio.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrami-combine",
      name: "Combining two mixtures",
      intuition:
        "When two jugs are poured into one, the milk from both ends up together and the water from both ends up together. So add the milk to the milk and the water to the water, and only then compare them.",
      definition:
        "- From each mixture, an ingredient's amount is its fraction times the amount taken: from 8 litres of a 3 : 1 mix, milk is \\(\\frac{3}{4} \\times 8 = 6\\) litres.\n" +
        "- Add each ingredient across the mixtures, then form the new ratio.\n" +
        "- **Equal volumes:** the new fraction of an ingredient is the plain average of its fractions in the two. Unequal volumes need the amounts.\n" +
        "- **The same solution in two containers** has the same ratio in both, whatever the amounts.\n" +
        "- **Comparing two mixtures:** compare the fractions, not the amounts.",
      formula: {
        label: "Combined amount of an ingredient",
        latex: "A_{\\text{new}} = \\frac{a_1}{a_1 + b_1}V_1 + \\frac{a_2}{a_2 + b_2}V_2",
        symbols: [
          { symbol: "a : b", meaning: "the ratio in each mixture" },
          { symbol: "V_1, V_2", meaning: "the amounts taken from each" },
        ],
      },
      authoredExample: {
        prompt: "Vessel P holds milk and water in the ratio 3 : 1 and vessel Q holds them in the ratio 2 : 3. 8 litres from P and 10 litres from Q are mixed. What is the ratio of milk to water?",
        steps: [
          "From P: milk 6 litres, water 2 litres. From Q: milk 4 litres, water 6 litres.",
          "Milk \\(= 10\\) litres and water \\(= 8\\) litres, so the ratio is \\(10 : 8 = 5 : 4\\).",
        ],
        answer: "5 : 4",
      },
      selfCheckExample: {
        prompt: "Two jars of the same size hold milk mixtures that are 30% water and 70% water. Both are emptied into one vessel. What percentage of the mixture is water?",
        steps: [
          "The volumes are equal, so the water fraction is the plain average: \\(\\frac{30 + 70}{2} = 50\\%\\).",
        ],
        answer: "50%",
      },
      practiceSet: [
        { prompt: "Mixture X has acid and water in the ratio 1 : 4 and mixture Y has them in the ratio 3 : 2. Equal volumes of X and Y are mixed. What is the ratio of acid to water?", answer: "2 : 3" },
        { prompt: "A 35-litre can holds juice and water in the ratio 4 : 3. A second can of the same drink holds 21 litres. How much juice is in the second can?", answer: "12 litres" },
        {
          prompt: "One jug has 15 litres of milk and 5 litres of water; another has 6 litres of milk and 3 litres of water. Which jug has the larger share of milk?",
          answer: "The first",
          method: "\\(\\frac{15}{20} = \\frac{3}{4}\\) against \\(\\frac{6}{9} = \\frac{2}{3}\\).",
        },
      ],
      pyqExampleId: "5268b576-d56c-4118-81e1-5958cdb95697",
      traps: [
        {
          title: "Adding the ratio terms of unequal amounts",
          body:
            "10 litres of a 1 : 1 mixture and 30 litres of a 3 : 1 mixture do not give 4 : 2. In litres, milk is \\(5 + 22.5 = 27.5\\) and water \\(5 + 7.5 = 12.5\\), a ratio of 11 : 5.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrami-remove",
      name: "Taking out part of a mixture and topping it up",
      intuition:
        "A well-stirred mixture is the same all through, so any cupful taken out has the mixture's own ratio. Removing a fifth of the mixture removes a fifth of every ingredient, and then whatever is poured back is simply added.",
      definition:
        "- Removing x litres from T litres removes each ingredient in the mixture's ratio: each one falls to \\((1 - \\frac{x}{T})\\) of its amount.\n" +
        "- Then add what is poured back: water, the pure ingredient, or another mixture (split it into its ingredients first).\n" +
        "- **Topped up with water:** the other ingredient left \\(=\\) its original amount \\(\\times (1 - \\frac{x}{T})\\), and the total is T again.\n" +
        "- **Topped up with the pure ingredient:** that ingredient changes twice, so work from the OTHER one, which only falls.\n" +
        "- **Three ingredients and a stated difference:** after the removal, the mixture left is still in the old ratio. Write each ingredient from it, add what is poured in, and use the difference.",
      formula: {
        label: "Amount left after a removal",
        latex: "\\text{left} = \\text{original} \\times \\left(1 - \\frac{x}{T}\\right)",
        symbols: [
          { symbol: "x", meaning: "the amount of mixture taken out" },
          { symbol: "T", meaning: "the total before it is taken out" },
        ],
      },
      authoredExample: {
        prompt: "A 50-litre can holds milk and water in the ratio 4 : 1. 10 litres are taken out and replaced with water. What is the new ratio of milk to water?",
        steps: [
          "Milk \\(= 40\\) litres. Taking out \\(\\frac{10}{50} = \\frac{1}{5}\\) of the mixture leaves \\(40 \\times \\frac{4}{5} = 32\\) litres of milk.",
          "The can is full again at 50 litres, so water \\(= 18\\) litres.",
          "Milk : water \\(= 32 : 18 = 16 : 9\\).",
        ],
        answer: "16 : 9",
      },
      selfCheckExample: {
        prompt: "An 80-litre mixture has acid and water in the ratio 1 : 4. Some of it is taken out and replaced with pure acid, and the ratio becomes 1 : 1. How many litres were replaced?",
        steps: [
          "Water starts at 64 litres and only falls. At 1 : 1 in 80 litres, water is 40 litres.",
          "\\(64\\left(1 - \\frac{x}{80}\\right) = 40\\), so \\(1 - \\frac{x}{80} = \\frac{5}{8}\\) and \\(x = 30\\).",
          "Check: 30 litres removes 6 of acid and 24 of water, leaving 10 and 40; adding 30 of acid gives 40 and 40.",
        ],
        answer: "30 litres",
      },
      practiceSet: [
        { prompt: "A 40-litre mixture is 25% syrup. 8 litres are drawn off and replaced with water. How many litres of syrup are left?", answer: "8 litres" },
        { prompt: "A 90-litre tank holds oil and water in the ratio 2 : 1. 18 litres of the mixture are taken out. How much water is taken out?", answer: "6 litres" },
        {
          prompt: "A 60-litre mixture has milk and water in the ratio 3 : 2. 10 litres are taken out and 10 litres of milk are added. What is the new ratio of milk to water?",
          answer: "2 : 1",
          method: "Left: milk 30, water 20. Then milk 40.",
        },
      ],
      pyqExampleId: "9a6d8cc9-f03c-42f3-9330-18fbac66bb09",
      traps: [
        {
          title: "Taking out only one ingredient",
          body:
            "Drawing 10 litres from a 4 : 1 milk and water mixture takes out 8 litres of milk and 2 of water, not 10 litres of milk. A removal always carries the mixture's own ratio.",
        },
        {
          title: "Tracking the ingredient that is poured back",
          body:
            "When pure acid is poured back, the acid falls and then rises, which needs two steps. The water only falls, so follow the water and the answer comes in one equation.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrami-repeat",
      name: "Repeated replacement",
      intuition:
        "Each round of draw-and-refill keeps the same fraction of the original liquid, because each draw takes the same share of whatever is there. So the liquid left shrinks by the same factor every round, like a percentage applied again and again.",
      definition:
        "- If x litres are drawn from T litres and replaced with water, n times, the original liquid left is \\(A\\left(1 - \\frac{x}{T}\\right)^n\\).\n" +
        "- As a percentage: each round keeps \\(1 - \\frac{x}{T}\\) of the liquid, so a 60% strength after two rounds of keeping \\(\\frac{4}{5}\\) is \\(60 \\times \\frac{16}{25} = 38.4\\%\\).\n" +
        "- Safe only when the same amount is drawn every round, the refill is the same liquid every round, and the total returns to T. If the refill changes between rounds (water, then acid), work round by round.",
      formula: {
        label: "Repeated replacement",
        latex: "A_n = A\\left(1 - \\frac{x}{T}\\right)^n",
        symbols: [
          { symbol: "A", meaning: "the amount of the original liquid at the start" },
          { symbol: "n", meaning: "the number of rounds" },
        ],
      },
      authoredExample: {
        prompt: "A 64-litre can is full of milk. 16 litres are taken out and replaced with water, three times in all. How much milk is left?",
        steps: [
          "Each round keeps \\(1 - \\frac{16}{64} = \\frac{3}{4}\\) of the milk.",
          "Milk left \\(= 64 \\times \\left(\\frac{3}{4}\\right)^3 = 64 \\times \\frac{27}{64} = 27\\) litres.",
          "Check round by round: 48, then 36, then 27.",
        ],
        answer: "27 litres",
      },
      selfCheckExample: {
        prompt: "A 50-litre mixture is 60% acid. 10 litres are taken out and replaced with water, and this is done twice. What percentage of the mixture is now acid?",
        steps: [
          "Each round keeps \\(\\frac{4}{5}\\) of the acid: \\(60\\% \\times \\left(\\frac{4}{5}\\right)^2 = 60\\% \\times 0.64 = 38.4\\%\\).",
        ],
        answer: "38.4%",
      },
      practiceSet: [
        { prompt: "A 40-litre jar of juice has 4 litres taken out and replaced with water, twice. How much juice is left?", answer: "32.4 litres" },
        { prompt: "Each round of draw-and-refill keeps three quarters of the wine in a cask. What fraction of the wine is left after two rounds?", answer: "\\(\\frac{9}{16}\\)" },
      ],
      pyqExampleId: "9228d2e1-fd50-4e86-8d5d-e8acfac4c535",
      traps: [
        {
          title: "Subtracting the same amount every round",
          body:
            "From 40 litres of juice, two draws of 4 litres leave 32.4 litres, not 32. The second draw takes out less juice than the first, because the jar is already weaker.",
        },
      ],
    },
  ],
};
