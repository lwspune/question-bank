import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_AN_ANALOGIES_NOTE: SubtopicNote = {
  subtopicName: "Number and Word Analogies",
  title: "Number and Word Analogies",
  oneLineDefinition:
    "An analogy gives one pair joined by a rule and asks for the partner that the same rule gives; find the rule on the given pair first, then apply it.",
  whyItMatters:
    "Five questions in the bank: two number analogies from the 2022 paper (MODERATE), one word analogy from the 2026 paper (EASY), and a number set and the same word analogy from the Sample Paper. The 2026 paper asked the Sample Paper's word analogy almost word for word, so the patterns here do come back.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "spianan-numbers",
      name: "Finding the rule in a number analogy",
      intuition:
        "The first pair hides one rule. Try the usual rules one by one on that pair, and keep the first one that works exactly. Then use the same rule on the second number, and only on it.",
      definition:
        "Try these rules in order on the given pair:\n" +
        "- the **sum**, **difference** or **product** of the digits;\n" +
        "- a **square** or **cube**, of the number or of its digit sum;\n" +
        "- **multiplying or dividing** by a fixed number.\n" +
        "In a **set** analogy, each step between the numbers must match the given set's steps, in the same order.",
      authoredExample: {
        prompt: "Find the missing number: 45 : 20 :: 63 : ?",
        steps: [
          "Try the digits of 45: \\(4 + 5 = 9\\) (no), \\(5 - 4 = 1\\) (no), \\(4 \\times 5 = 20\\) (yes).",
          "Use the same rule on 63: \\(6 \\times 3 = 18\\).",
        ],
        answer: "18",
      },
      selfCheckExample: {
        prompt: "Find the missing number: 5 : 125 :: 4 : ?",
        steps: ["\\(5^3 = 125\\), so the rule is the cube.", "\\(4^3 = 64\\)."],
        answer: "64",
      },
      practiceSet: [
        { prompt: "Find the missing number: 9 : 81 :: 7 : ?", answer: "The square: 49" },
        { prompt: "Find the missing number: 73 : 10 :: 85 : ?", answer: "The digit sum: \\(8 + 5 = 13\\)" },
        {
          prompt: "Which set is like (2, 6, 18): (a) 3, 9, 27 (b) 3, 6, 9 (c) 2, 4, 8?",
          answer: "(a): each number is 3 times the one before, as in 2, 6, 18",
        },
      ],
      pyqExampleId: "79bcd1e5-4551-4b72-813b-e3a3b5dc2061",
      traps: [
        {
          title: "A rule that fits only one number",
          body: "Check the rule on the whole given pair before you use it. 'Divide by 2' turns 48 into 24 but does not turn 24 into 6, so it is not the rule for (48, 24, 6).",
        },
        {
          title: "Applying the rule to the answer side",
          body: "The rule takes the first number of a pair to the second. In 45 : 20 :: 63 : ?, apply it to 63 to get the answer, not to an option.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spianan-words",
      name: "Word analogies: who leads, who makes, where it lives",
      intuition:
        "Say the link between the first two words as a short sentence, such as 'an orchestra is led by a conductor'. Then try each option in the same sentence. Only one fits as well as the first pair did.",
      definition:
        "- Name the **link** first: person in charge, maker and thing made, worker and workplace, animal and home, tool and use.\n" +
        "- Several options are often linked to the second word in some way. Keep the one with the **same** link as the first pair.\n" +
        "- The person in charge of making a piece of work is not the person who pays for it or acts in it.",
      table: {
        columns: ["Pair", "Link"],
        rows: [
          { cells: ["Orchestra : Conductor", "the person in charge"] },
          { cells: ["Ship : Captain", "the person in charge"] },
          { cells: ["School : Principal", "the person in charge"] },
          { cells: ["Author : Book", "maker and the thing made"] },
          { cells: ["Carpenter : Furniture", "maker and the thing made"] },
          { cells: ["Doctor : Hospital", "worker and workplace"] },
          { cells: ["Bee : Hive", "animal and its home"] },
          { cells: ["Scissors : Cut", "tool and its use"] },
        ],
        caption: "Say each link as a sentence: 'a ship is commanded by a captain'.",
      },
      selfCheckExample: {
        prompt: "Complete the analogy: Author : Book :: Composer : ?",
        steps: ["An author makes a book: maker and the thing made.", "A composer makes music."],
        answer: "Music",
      },
      practiceSet: [
        { prompt: "Complete the analogy: Doctor : Hospital :: Teacher : ?", answer: "School" },
        { prompt: "Complete the analogy: Bee : Hive :: Lion : ?", answer: "Den" },
        { prompt: "Complete the analogy: Ship : Captain :: Aeroplane : ?", answer: "Pilot" },
      ],
      pyqExampleId: "f4f17c4d-d622-4e59-b573-8e04090ec764",
      traps: [
        {
          title: "Picking a word with a different link",
          body: "For Author : Book :: Painter : ?, 'brush' and 'gallery' are both linked to a painter, but only 'painting' is the thing a painter makes, as a book is the thing an author makes.",
        },
      ],
    },
  ],
};
