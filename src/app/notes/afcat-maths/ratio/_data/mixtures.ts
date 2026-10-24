import type { SubtopicNote } from "@/app/notes/_types";

export const AF_RP_MIXTURES_NOTE: SubtopicNote = {
  subtopicName: "Mixtures and Coins",
  title: "Mixtures and Coins",
  oneLineDefinition:
    "Milk and water, and bags of coins, are ratios with one twist each: when one liquid is added the other stays fixed, and a coin ratio counts coins, not rupees.",
  whyItMatters:
    "None of these questions is HARD, but each has one step that is easy to get wrong: keeping the unchanged liquid fixed, or remembering that a ratio of coins is a ratio of how many coins there are. Name that step before you calculate.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "afrp-mixture-ratio",
      name: "A mixture as a ratio of two quantities",
      intuition:
        "A mixture of milk and water is two quantities in a ratio. Its total splits into parts like any other total.",
      definition:
        "- Milk : water \\(= m : w\\) in a total \\(T\\) means the milk is \\(\\dfrac{m}{m + w}T\\) and the water \\(\\dfrac{w}{m + w}T\\).\n" +
        "- Given the actual amounts, the ratio is their simplest form.",
      formula: {
        label: "Milk in a mixture",
        latex: "\\text{milk} = \\dfrac{m}{m + w} \\times T",
      },
      authoredExample: {
        prompt: "A 63-litre mixture has milk and water in the ratio \\(5 : 4\\). How much water is in it?",
        steps: ["\\(5 + 4 = 9\\) parts, so one part is \\(63 \\div 9 = 7\\) litres.", "Water is 4 parts."],
        answer: "28 litres.",
      },
      selfCheckExample: {
        prompt: "36 litres of milk and 9 litres of water are mixed, and then 15 more litres of water are added. Find the final ratio of milk to water.",
        steps: ["Water is now \\(9 + 15 = 24\\) litres.", "\\(36 : 24 = 3 : 2\\)."],
        answer: "\\(3 : 2\\).",
      },
      practiceSet: [
        { prompt: "A 48-litre mixture is milk and water in the ratio \\(5 : 3\\). How much milk is in it?", answer: "30 litres" },
        { prompt: "25 litres of milk are mixed with 10 litres of water. Find the ratio of milk to water.", answer: "\\(5 : 2\\)" },
        { prompt: "A 20-litre mixture has milk and water in the ratio \\(3 : 1\\). How much water is in it?", answer: "5 litres" },
      ],
      pyqExampleId: "1a791491-c9e5-498f-ae39-76f7c9c09d0e",
      traps: [
        {
          title: "The ratio is of the parts, not of the total",
          body: "Milk : water \\(= 5 : 2\\) makes the milk \\(\\tfrac 57\\) of the mixture. It is not \\(\\tfrac 52\\) of the mixture.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afrp-add-one-liquid",
      name: "Adding one liquid: the other stays fixed",
      intuition:
        "When only water is added, the milk does not change. Use the fixed quantity to work out what the other one must become.",
      definition:
        "- Adding water: the milk stays at \\(m\\). For a new ratio \\(r : s\\), the water must become \\(\\dfrac sr m\\). Subtract the water already there.\n" +
        "- Adding milk: the water stays fixed, and the milk must become \\(\\dfrac rs\\) times the water.\n" +
        "- With unknown amounts \\(3k\\) and \\(2k\\), keep the fixed one unchanged in the new ratio: adding 10 litres of water gives \\(\\dfrac{3k}{2k + 10} = \\dfrac 34\\).\n" +
        "- Drying works the same way: only water leaves, so the dry matter is the fixed quantity.",
      formula: {
        label: "Water to add",
        latex: "\\text{water needed} = \\dfrac sr \\times \\text{milk}, \\qquad \\text{add} = \\text{water needed} - \\text{water now}",
      },
      authoredExample: {
        prompt: "A 45-litre mixture has milk and water in the ratio \\(4 : 1\\). How much water must be added to make the ratio \\(3 : 2\\)?",
        steps: [
          "Milk 36 litres, water 9 litres. Adding water leaves the milk at 36.",
          "For \\(3 : 2\\), the water must be \\(36 \\times \\tfrac 23 = 24\\) litres.",
          "Add \\(24 - 9 = 15\\) litres.",
        ],
        answer: "15 litres.",
      },
      selfCheckExample: {
        prompt: "Fresh mushrooms are 92% water by weight and dried ones are 20% water. How much dried mushroom do 50 kg of fresh mushrooms give?",
        steps: [
          "The dry matter is 8% of 50 kg, which is 4 kg, and it does not dry out.",
          "In dried mushrooms it is 80% of the weight: \\(4 \\div 0.8 = 5\\) kg.",
        ],
        answer: "5 kg.",
      },
      practiceSet: [
        { prompt: "40 litres of milk and water are in the ratio \\(3 : 1\\). How much water must be added to make it \\(1 : 1\\)?", answer: "20 litres" },
        { prompt: "A mixture has 30 litres of milk and 12 of water. How much milk must be added to make the ratio \\(3 : 1\\)?", answer: "6 litres" },
        {
          prompt: "Milk and water are in the ratio \\(2 : 1\\). Adding 10 litres of water makes it \\(1 : 1\\). How much milk was there?",
          answer: "20 litres",
        },
      ],
      pyqExampleId: "f422f502-e0c3-4cdb-9963-b80f2cef08b4",
      traps: [
        {
          title: "Adding water never changes the milk",
          body: "A working that splits the new total in the new ratio has quietly changed the amount of milk. Hold the milk fixed and solve for the water.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afrp-replace-and-mix",
      name: "Replacing part of a mixture, and mixing two mixtures",
      intuition:
        "Taking some mixture out removes milk and water in the same ratio as the whole. Mixing two vessels adds their milk together and their water together.",
      definition:
        "- Removing part of a mixture removes the same fraction of each liquid. From 60 litres of milk and 20 of water, removing 20 litres (a quarter) leaves 45 and 15.\n" +
        "- Then add whatever is poured back in.\n" +
        "- Mixing: in each vessel the milk is \\(\\dfrac{m}{m + w}\\) of the volume. Add the milk from both vessels, add the water from both, then form the ratio.",
      formula: {
        label: "Mixing two vessels",
        latex: "\\text{milk} = \\dfrac{m_1}{m_1 + w_1}V_1 + \\dfrac{m_2}{m_2 + w_2}V_2",
      },
      authoredExample: {
        prompt: "Vessel A has milk and water in the ratio \\(3 : 1\\), vessel B in the ratio \\(1 : 1\\). 4 litres of A are mixed with 2 litres of B. Find the ratio of milk to water.",
        steps: [
          "From A: 3 litres of milk and 1 of water.",
          "From B: 1 litre of milk and 1 of water.",
          "Together: \\(4 : 2\\).",
        ],
        answer: "\\(2 : 1\\).",
      },
      selfCheckExample: {
        prompt: "An 80-litre mixture has milk and water in the ratio \\(3 : 1\\). 20 litres are taken out and replaced with water. Find the new ratio.",
        steps: [
          "Milk 60, water 20. Removing a quarter leaves 45 and 15.",
          "Adding 20 litres of water: \\(45 : 35\\).",
        ],
        answer: "\\(9 : 7\\).",
      },
      practiceSet: [
        { prompt: "Equal amounts from vessels with milk and water in the ratios \\(1 : 1\\) and \\(1 : 3\\) are mixed. Find the ratio.", answer: "\\(3 : 5\\)" },
        {
          prompt: "40 litres of milk and water are in the ratio \\(1 : 1\\). 10 litres are removed and replaced with milk. Find the new ratio.",
          answer: "\\(5 : 3\\)",
        },
        {
          prompt: "Mixtures with milk and water in the ratios \\(2 : 1\\) and \\(1 : 2\\) are mixed in equal volumes. Find the ratio.",
          answer: "\\(1 : 1\\)",
        },
      ],
      pyqExampleId: "ccd61f31-d964-43ca-a4dd-41a70b457173",
      traps: [
        {
          title: "Mix litres, not ratio terms",
          body: "Equal amounts of a \\(2 : 3\\) and a \\(4 : 5\\) mixture do not give \\((2 + 4) : (3 + 5)\\). The first is split into 5 parts and the second into 9, so turn each into fractions of a litre first.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afrp-coins-by-count",
      name: "Coins: a ratio of how many coins there are",
      intuition:
        "A coin ratio such as \\(2 : 3\\) compares how many coins there are, not what they are worth. Given the number of coins, split it first, then multiply each count by the coin's value.",
      definition:
        "- ₹5 and ₹10 coins in the ratio \\(a : b\\), \\(N\\) coins in all: \\(\\dfrac{a}{a + b}N\\) of them are ₹5 coins.\n" +
        "- Value is the number of coins times the face value, added over each kind of coin.",
      formula: {
        label: "Total value",
        latex: "\\text{value} = \\sum (\\text{number of coins} \\times \\text{face value})",
      },
      authoredExample: {
        prompt: "A purse has ₹1 and ₹2 coins in the ratio \\(5 : 3\\), 64 coins in all. Find their total value.",
        steps: [
          "8 parts of 8 coins: 40 coins of ₹1 and 24 of ₹2.",
          "Value: \\(40 \\times 1 + 24 \\times 2 = 88\\).",
        ],
        answer: "₹88.",
      },
      selfCheckExample: {
        prompt: "A box has ₹1 and ₹2 coins in the ratio \\(7 : 4\\), with 28 coins of ₹1. How many ₹2 coins are there, and what is the total value?",
        steps: [
          "7 parts are 28 coins, so one part is 4: there are 16 coins of ₹2.",
          "Value: \\(28 \\times 1 + 16 \\times 2 = 28 + 32\\).",
        ],
        answer: "16 coins of ₹2; ₹60.",
      },
      practiceSet: [
        { prompt: "₹5 and ₹10 coins are in the ratio \\(1 : 1\\), 30 coins in all. Find the total value.", answer: "₹225" },
        { prompt: "₹1 and ₹2 coins are in the ratio \\(3 : 2\\), 50 coins in all. How many ₹2 coins are there?", answer: "20" },
        { prompt: "₹2 and ₹5 coins are in the ratio \\(2 : 1\\), with 12 coins of ₹5. Find the total value.", answer: "₹108" },
      ],
      pyqExampleId: "8f988013-e311-44a7-9e50-145db6859a42",
      traps: [
        {
          title: "Count first, then value",
          body: "₹5 and ₹10 coins in the ratio \\(2 : 3\\) is a ratio of counts. Their values are in the ratio \\(10 : 30 = 1 : 3\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afrp-coins-by-value",
      name: "Coins when the total value is given",
      intuition:
        "When the total value is given, work out what one 'set' of coins in the ratio is worth. The total is a whole number of such sets.",
      definition:
        "- Coins in the ratio \\(a : b : c\\) with face values \\(u, v, w\\): one set (\\(a\\) of the first, \\(b\\) of the second, \\(c\\) of the third) is worth \\(au + bv + cw\\).\n" +
        "- The number of sets \\(k\\) is the total value divided by the value of one set. Each count is its term times \\(k\\).\n" +
        "- Write 50 paise as ₹0.5 and 25 paise as ₹0.25 before adding.",
      formula: {
        label: "Number of sets",
        latex: "k = \\dfrac{\\text{total value}}{au + bv + cw}",
      },
      authoredExample: {
        prompt: "A bag has ₹1, ₹2 and ₹5 coins in the ratio \\(4 : 2 : 1\\), worth ₹195 in all. How many ₹2 coins are there?",
        steps: [
          "One set is worth \\(4 \\times 1 + 2 \\times 2 + 1 \\times 5 = 13\\) rupees.",
          "\\(195 \\div 13 = 15\\) sets.",
          "₹2 coins: \\(2 \\times 15 = 30\\).",
        ],
        answer: "30.",
      },
      selfCheckExample: {
        prompt: "A box has ₹1, 50 paise and 25 paise coins in the ratio \\(1 : 2 : 4\\), worth ₹60 in all. How many 25 paise coins are there?",
        steps: [
          "One set is worth \\(1 + 2 \\times 0.5 + 4 \\times 0.25 = 3\\) rupees.",
          "\\(60 \\div 3 = 20\\) sets, so \\(4 \\times 20 = 80\\) coins of 25 paise.",
        ],
        answer: "80.",
      },
      practiceSet: [
        { prompt: "₹2 and ₹5 coins are in the ratio \\(3 : 2\\), worth ₹128 in all. How many ₹5 coins are there?", answer: "16" },
        { prompt: "₹1 and ₹10 coins are in the ratio \\(5 : 1\\), worth ₹300 in all. How many ₹1 coins are there?", answer: "100" },
        { prompt: "₹5 and ₹10 coins are in the ratio \\(2 : 1\\), worth ₹400 in all. How many coins are there altogether?", answer: "60" },
      ],
      pyqExampleId: "aa7b5c65-fdca-4162-82cc-cdc6743c748a",
      traps: [
        {
          title: "Divide by the value of a set, not the sum of the ratio",
          body: "₹1, ₹2 and ₹5 coins in the ratio \\(2 : 1 : 1\\), worth ₹90, are \\(90 \\div 9 = 10\\) sets. Dividing 90 by \\(2 + 1 + 1 = 4\\) treats every coin as worth ₹1.",
        },
      ],
    },
  ],
};
