import type { SubtopicNote } from "@/app/notes/_types";

export const MS4_MD_PROBLEMS_NOTE: SubtopicNote = {
  subtopicName: "Multiplication and Division Word Problems",
  title: "Multiplication and Division Word Problems",
  oneLineDefinition:
    "Equal groups mean multiply, sharing into equal groups means divide, and a leftover or a cost is added or taken away as a second step.",
  whyItMatters:
    "6 of the chapter's 8 questions: 2 EASY and 4 MODERATE. Three count things in equal groups (boxes, rows, pens for friends) and three take two steps (wheels on vehicles, money left after a payment, kilograms sold for a price).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ms4mdpr-groups",
      name: "Equal groups and leftovers",
      intuition:
        "When the same number is in each box or row, multiply the number of boxes by the number in each. If some are left over outside the boxes, add them on at the end.",
      definition:
        "- **Total** = number of groups × number in each group, then **+ leftover**.\n" +
        "- Number words: the **greatest 1-digit odd** number is 9, the **smallest 2-digit odd** is 11, the **smallest 2-digit** number is 10, the **greatest 1-digit even** is 8.\n" +
        "- \"As many as\" a number, for each of that number, means the number **times itself**: 7 friends with 7 pens each is \\(7 \\times 7 = 49\\).",
      formula: {
        label: "Equal groups",
        latex: "\\text{total} = \\text{groups} \\times \\text{each} + \\text{leftover}",
      },
      authoredExample: {
        prompt: "A farmer packs 15 crates with 24 eggs each, and 7 eggs are left over. How many eggs did he have?",
        steps: [
          "Eggs in crates: \\(15 \\times 24 = 360\\).",
          "Add the leftover: \\(360 + 7 = 367\\).",
        ],
        answer: "367 eggs",
      },
      selfCheckExample: {
        prompt: "There are 8 rows with 12 chairs in each row. How many chairs are there?",
        steps: ["\\(8 \\times 12 = 96\\)."],
        answer: "96 chairs",
      },
      practiceSet: [
        { prompt: "What is the smallest 2-digit even number?", answer: "10" },
        { prompt: "The greatest 1-digit even number of boxes hold 15 pens each. How many pens are there?", answer: "120, because \\(8 \\times 15 = 120\\)" },
        { prompt: "6 children each get as many sweets as there are children. How many sweets are given?", answer: "36" },
        { prompt: "25 bags hold 40 marbles each, and 12 marbles are left over. How many marbles are there?", answer: "1012" },
      ],
      pyqExampleId: "41ec2f55-690c-4781-967d-0abbe7505942",
      traps: [
        {
          title: "Leaving out the leftover",
          body: "The leftover items are part of the total. Multiply first, then add them.",
        },
        {
          title: "Reading the number words loosely",
          body: "The greatest 1-digit odd number is 9, not 1 and not 99. Say each number word to yourself and write the number down.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ms4mdpr-twostep",
      name: "Two-step problems",
      intuition:
        "Some problems hide two sums. First find what you know for sure (the wheels of the three-wheelers, the money collected), then use it to find what is asked.",
      definition:
        "- **Step 1**: work out the part the question gives you fully.\n" +
        "- **Step 2**: take it away from, or divide into, the total to find the rest.\n" +
        "- **Price problems**: amount = rate × quantity, so quantity = amount ÷ rate.\n" +
        "- Read the **last line** again: is it asking for the vehicles, the money, or the kilograms?",
      authoredExample: {
        prompt: "A shop has 12 bicycles and some tricycles. Together they have 45 wheels. How many tricycles are there?",
        steps: [
          "Bicycle wheels: \\(12 \\times 2 = 24\\).",
          "Wheels left for tricycles: \\(45 - 24 = 21\\).",
          "Tricycles: \\(21 \\div 3 = 7\\).",
        ],
        answer: "7 tricycles",
      },
      selfCheckExample: {
        prompt: "28 children pay Rs. 150 each for a trip, and the bus costs Rs. 3000. How much money is left?",
        steps: ["Collected: \\(28 \\times 150 = 4200\\). Left: \\(4200 - 3000 = 1200\\)."],
        answer: "Rs. 1200",
      },
      practiceSet: [
        { prompt: "A farmer sold rice for Rs. 2400 at Rs. 40 a kilogram. How many kilograms did he sell?", answer: "60 kg" },
        { prompt: "There are 10 cars and some bikes, with 56 wheels in all. How many bikes are there?", answer: "8 bikes. Cars have 40 wheels, leaving 16, and 16 ÷ 2 = 8." },
        { prompt: "Rs. 5000 was kept for school things. 12 notebooks at Rs. 250 each were bought. How much money is left?", answer: "Rs. 2000" },
        { prompt: "45 students each pay Rs. 120. How much money is collected?", answer: "Rs. 5400" },
      ],
      pyqExampleId: "46dd4fc6-cc72-4d8d-a25a-6a8d31814208",
      traps: [
        {
          title: "Stopping after the first step",
          body: "The first step's answer is often one of the options. Check whether the question asks for it, or for the next step.",
        },
      ],
    },
  ],
};
