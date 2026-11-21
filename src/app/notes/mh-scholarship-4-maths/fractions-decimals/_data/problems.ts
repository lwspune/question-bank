import type { SubtopicNote } from "@/app/notes/_types";

export const MS4_FR_PROBLEMS_NOTE: SubtopicNote = {
  subtopicName: "Fraction Word Problems",
  title: "Fraction Word Problems",
  oneLineDefinition:
    "Turn each half, quarter or decimal into an amount, add up what is used, and take it away from what there was.",
  whyItMatters:
    "3 of the chapter's 9 questions: 1 EASY and 2 MODERATE. Two fill bottles or boxes with halves and quarters, and one cuts cloth in metres such as 2.5 m and 1.5 m.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ms4frpr-parts",
      name: "Halves and quarters in word problems",
      intuition:
        "Two halves make one whole and four quarters make one whole. Count the halves and quarters in a problem, turn them into wholes, and the sum becomes easy.",
      definition:
        "- 2 halves = 1, 4 quarters = 1, and 2 quarters = 1 half.\n" +
        "- **Many equal parts**: number of parts × size of each, for example \\(4 \\times \\frac{1}{2} = 2\\).\n" +
        "- **Used and left**: add up everything used, then take it away from the total.\n" +
        "- Write a leftover part as a mixed number: 2 and a quarter is \\(2\\frac{1}{4}\\).",
      formula: {
        label: "Halves and quarters",
        latex: "2 \\times \\tfrac{1}{2} = 1 \\qquad 4 \\times \\tfrac{1}{4} = 1 \\qquad 2 \\times \\tfrac{1}{4} = \\tfrac{1}{2}",
      },
      authoredExample: {
        prompt: "Riya pours juice into 6 cups, with \\(\\frac{1}{4}\\) litre in each cup. How much juice did she pour?",
        steps: [
          "4 quarters make 1 litre, so 4 cups hold 1 litre.",
          "The other 2 cups hold 2 quarters, which is half a litre.",
        ],
        answer: "\\(1\\frac{1}{2}\\) litres",
      },
      selfCheckExample: {
        prompt: "How many packets of half a kilogram can be filled from 4 kg of rice?",
        steps: ["Each kilogram fills 2 half-kg packets, so 4 kg fill \\(4 \\times 2\\)."],
        answer: "8 packets",
      },
      practiceSet: [
        { prompt: "Amit has 4 kg of sugar. He fills 4 bags with \\(\\frac{1}{2}\\) kg each. How much sugar is left?", answer: "2 kg" },
        { prompt: "How many glasses of a quarter litre each can be filled from 2 litres?", answer: "8 glasses" },
        { prompt: "Meena buys \\(\\frac{1}{2}\\) kg of tomatoes and \\(\\frac{3}{4}\\) kg of onions. How much does she buy in all?", answer: "\\(1\\frac{1}{4}\\) kg" },
        { prompt: "A rope is 6 m long. Three pieces of \\(1\\frac{1}{2}\\) m each are cut from it. How much rope is left?", answer: "\\(1\\frac{1}{2}\\) m" },
      ],
      pyqExampleId: "9dba492e-f615-45fd-831c-1d87b5e22b5d",
      traps: [
        {
          title: "Forgetting the leftover",
          body: "When a question says some amount is left over, add it to what was filled to find how much there was at the start.",
        },
        {
          title: "Answering a different question",
          body: "If the question asks how many boxes, give the number of boxes, not the kilograms they hold.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ms4frpr-decimals",
      name: "Halves and quarters as decimals",
      intuition:
        "A half is 0.5 and a quarter is 0.25, so two and a half metres is 2.5 m. Line up the decimal points when you add or take away, just like lining up ones and tens.",
      definition:
        "- \\(\\frac{1}{2} = 0.5\\), \\(\\frac{1}{4} = 0.25\\), \\(\\frac{3}{4} = 0.75\\).\n" +
        "- Two and a half = 2.5, one and a half = 1.5.\n" +
        "- To add or take away decimals, **line up the decimal points**.\n" +
        "- Two halves make a whole: 0.5 + 0.5 = 1.",
      authoredExample: {
        prompt: "A ribbon is 8 m long. 3.5 m is cut for one gift and 1.5 m for another. How much ribbon is left?",
        steps: [
          "Used: 3.5 + 1.5 = 5 m (the two halves make one whole).",
          "Left: 8 − 5 = 3 m.",
        ],
        answer: "3 m",
      },
      selfCheckExample: {
        prompt: "Write one and a quarter metres as a decimal.",
        steps: ["One quarter is 0.25, so one and a quarter is 1.25."],
        answer: "1.25 m",
      },
      practiceSet: [
        { prompt: "Write half a metre as a decimal.", answer: "0.5 m" },
        { prompt: "Add: 2.5 + 1.5", answer: "4" },
        { prompt: "A cloth is 5 m long and 2.5 m of it is used. How much is left?", answer: "2.5 m" },
        { prompt: "Three pieces of 0.5 m each are joined. How long is the joined piece?", answer: "1.5 m" },
      ],
      pyqExampleId: "0892a335-dc06-4349-84b8-4ab5034372a9",
      traps: [
        {
          title: "Giving the amount used instead of the amount left",
          body: "Read the last line of the question. If it asks what is left, take the used amount away from the total.",
        },
      ],
    },
  ],
};
