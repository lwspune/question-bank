import type { SubtopicNote } from "@/app/notes/_types";

export const MS4_UN_MONEY_NOTE: SubtopicNote = {
  subtopicName: "Money, Ream and Quire",
  title: "Money, Ream and Quire",
  oneLineDefinition:
    "Work out money in rupees first and then count the notes; for paper, 1 quire is 24 sheets and 1 ream is 20 quires.",
  whyItMatters:
    "3 of the chapter's 7 questions: 1 EASY and 2 MODERATE. Two count notes (change in Rs. 50 notes, and an equal number of four kinds of note), and one asks how many quires are in a ream.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ms4unmo-notes",
      name: "Counting money in notes",
      intuition:
        "First find the amount of money in rupees. Then ask how many notes of one kind make that amount, by dividing.",
      definition:
        "- **Change** = money given − cost.\n" +
        "- **Number of notes** = amount ÷ value of one note.\n" +
        "- **Equal numbers of several notes**: add one of each kind to make a set, divide the total by the set's value to get how many of each, then multiply by the number of kinds for all the notes.",
      authoredExample: {
        prompt: "Ravi buys 3 pens at Rs. 45 each and pays with a Rs. 200 note. He gets his change in Rs. 5 coins. How many coins does he get?",
        steps: [
          "Cost: \\(3 \\times 45 = 135\\).",
          "Change: \\(200 - 135 = 65\\).",
          "Coins: \\(65 \\div 5 = 13\\).",
        ],
        answer: "13 coins",
      },
      selfCheckExample: {
        prompt: "How many Rs. 20 notes make Rs. 180?",
        steps: ["180 ÷ 20 = 9."],
        answer: "9 notes",
      },
      practiceSet: [
        { prompt: "Sara has the same number of Rs. 10, Rs. 20 and Rs. 50 notes, Rs. 400 in all. How many notes does she have?", answer: "15. One of each is Rs. 80, 400 ÷ 80 = 5 of each, and 5 × 3 = 15 notes." },
        { prompt: "How much change do you get from Rs. 500 for a bill of Rs. 365?", answer: "Rs. 135" },
        { prompt: "How many Rs. 100 notes make Rs. 2000?", answer: "20 notes" },
        { prompt: "What do two toys cost at Rs. 125 each?", answer: "Rs. 250" },
      ],
      pyqExampleId: "15908cae-eaf1-496d-856a-f7beb397f1ef",
      traps: [
        {
          title: "Stopping at how many of each kind",
          body: "If there are 4 of each of 4 kinds of note, she has 16 notes, not 4. Check whether the question asks for each kind or for all.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "ms4unmo-ream",
      name: "Quire, ream, dozen and score",
      intuition:
        "Paper and many everyday things are counted in fixed bundles. Learn what each bundle holds, then change from one to another by multiplying or dividing.",
      definition:
        "- In school maths **1 quire = 24 sheets** of paper and **1 ream = 20 quires**, so 1 ream = 480 sheets.\n" +
        "- A **dozen** is 12 things and a **score** is 20.\n" +
        "- Bigger bundle to smaller: **multiply**. Smaller to bigger: **divide**.",
      table: {
        columns: ["Bundle", "Holds"],
        rows: [
          { cells: ["1 quire", "24 sheets of paper"] },
          { cells: ["1 ream", "20 quires, that is 480 sheets"] },
          { cells: ["1 dozen", "12 things"] },
          { cells: ["1 score", "20 things"] },
        ],
        caption: "The counting bundles used in Class 4 maths.",
      },
      selfCheckExample: {
        prompt: "How many sheets are there in 2 quires?",
        steps: ["Each quire has 24 sheets: \\(2 \\times 24\\)."],
        answer: "48 sheets",
      },
      practiceSet: [
        { prompt: "How many quires are there in 2 reams?", answer: "40 quires" },
        { prompt: "How many sheets are there in half a ream?", answer: "240 sheets" },
        { prompt: "How many things are there in 3 dozen?", answer: "36" },
        { prompt: "How many sheets are there in 1 ream?", answer: "480 sheets" },
      ],
      pyqExampleId: "9306c940-3b2f-4d64-92fd-1b793a34da29",
      traps: [
        {
          title: "Answering in sheets when quires are asked",
          body: "A ream is 20 quires but 480 sheets, and both numbers may be options. Check which unit the question counts in.",
        },
      ],
    },
  ],
};
