import type { SubtopicNote } from "@/app/notes/_types";

export const MS4_CL_WORDS_NOTE: SubtopicNote = {
  subtopicName: "Word and Number Groups",
  title: "Word and Number Groups",
  oneLineDefinition:
    "Find the one thing three of the terms share; the term without it is the odd one, and a term with it is the one that fits the group.",
  whyItMatters:
    "5 of the chapter's 9 questions: 2 EASY and 3 MODERATE. Two are about words (homes, and animals that live in water and on land), and three are about numbers (multiples of 13, square numbers plus 3, and the digit-sum test for 3).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ms4clwo-meaning",
      name: "Words that belong together",
      intuition:
        "Words make a group because of what they mean: things we live in, animals that fly, days of the week. Say each word aloud and ask: what is it, and what is it used for? The word that gives a different answer is the odd one.",
      definition:
        "- Ask **what each word is**: an animal, a fruit, a place, a tool.\n" +
        "- If all four are the same kind, ask a **sharper question**: where does it live, what does it eat, what is it used for?\n" +
        "- The answer must fit **three** words and miss exactly **one**.\n" +
        "- In a \"find the term that fits\" question, choose the option that shares the group's idea.",
      authoredExample: {
        prompt: "Select the odd term: Rose, Lotus, Mango, Jasmine.",
        steps: [
          "Rose, lotus and jasmine are flowers.",
          "A mango is a fruit, not a flower.",
        ],
        answer: "Mango",
      },
      selfCheckExample: {
        prompt: "Which word fits the group Monday, Friday, Sunday: April, Tuesday, Winter or Morning?",
        steps: ["Monday, Friday and Sunday are days of the week. Only Tuesday is a day of the week."],
        answer: "Tuesday",
      },
      practiceSet: [
        { prompt: "Find the odd one out: Sparrow, Crow, Parrot, Bat.", answer: "Bat. Sparrow, crow and parrot are birds; a bat flies but it is not a bird." },
        { prompt: "Find the odd one out: Car, Bus, Boat, Truck.", answer: "Boat. It moves on water; the others move on roads." },
        { prompt: "Which word fits the group Ear, Eye, Nose: Tongue, Shirt, Chair or Book?", answer: "Tongue. Ear, eye, nose and tongue are sense organs." },
        { prompt: "Find the odd one out: Lion, Tiger, Elephant, Leopard.", answer: "Elephant. Lion, tiger and leopard eat meat; an elephant eats plants." },
      ],
      pyqExampleId: "edfcdf04-b115-4679-a3b4-840a6deecaca",
      traps: [
        {
          title: "Stopping at the first difference",
          body: "Every word differs from the others in some small way. Check that your reason fits three words and misses only one before you mark it.",
        },
        {
          title: "Reaching for a rare fact",
          body: "The rule is almost always an everyday idea, such as homes, food or where an animal lives. Try the simple ideas first.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ms4clwo-rules",
      name: "Number groups: tables, squares and digit sums",
      intuition:
        "Numbers make a group because they follow one rule. Test the easy rules one by one, like trying keys in a lock, and stop when one rule fits three numbers and not the fourth.",
      definition:
        "- **Even or odd**: is the number in the table of 2?\n" +
        "- **Tables**: are three numbers in the same table (of 7, 9, 13 and so on)? Divide each one to check.\n" +
        "- **Square numbers**: 1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196. Look for a square, or a square plus or minus a small number.\n" +
        "- **Digit sum for 3 and 9**: add the digits. If the sum is in the table of 3, the number is too; the same works for 9.",
      authoredExample: {
        prompt: "Select the odd term: 21, 35, 48, 63.",
        steps: [
          "Even or odd: 48 is even and the rest are odd. Keep this idea, but check one more rule.",
          "Table of 7: \\(21 = 7 \\times 3\\), \\(35 = 7 \\times 5\\), \\(63 = 7 \\times 9\\). 48 is not in the table of 7.",
          "Both checks point to 48.",
        ],
        answer: "48",
      },
      selfCheckExample: {
        prompt: "Find the odd term: 16, 25, 36, 50.",
        steps: ["\\(16 = 4 \\times 4\\), \\(25 = 5 \\times 5\\), \\(36 = 6 \\times 6\\) are square numbers. 50 is not."],
        answer: "50",
      },
      practiceSet: [
        { prompt: "Find the odd term: 12, 18, 27, 30.", answer: "27. It is odd; 12, 18 and 30 are even." },
        { prompt: "Find the odd term: 1245, 2340, 4128, 5012.", answer: "5012. Its digit sum is 8, not in the table of 3; the others give 12, 9 and 15." },
        { prompt: "Which number fits the group 9, 18, 27: 35, 45, 52 or 61?", answer: "45. It is in the table of 9, like the group." },
        { prompt: "Find the odd term: 10, 17, 26, 35.", answer: "35. The others are one more than a square number (9 + 1, 16 + 1, 25 + 1); 35 is one less than 36." },
      ],
      pyqExampleId: "e5caa564-120d-4990-b9dd-7cca4d77247b",
      traps: [
        {
          title: "Using the digit sum for any table",
          body: "Adding the digits tells you about the tables of 3 and 9 only. To test 7, 11 or 13, divide.",
        },
        {
          title: "Stopping at even and odd",
          body: "If all four numbers are even, or all are odd, the rule is something else. Move on to tables, squares and digit sums.",
        },
      ],
    },
  ],
};
