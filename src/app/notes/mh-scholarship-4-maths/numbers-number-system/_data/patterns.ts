import type { SubtopicNote } from "@/app/notes/_types";

export const MS4_NU_PATTERNS_NOTE: SubtopicNote = {
  subtopicName: "Number Patterns and Counting Digits",
  title: "Number Patterns and Counting Digits",
  oneLineDefinition:
    "Find a pattern from the gaps between its numbers, and count a digit from 1 to 100 by counting the units place and the tens place separately.",
  whyItMatters:
    "2 of the chapter's 6 questions: 1 EASY and 1 HARD. One continues a pattern whose gaps grow by one each time; the hard one counts how often the digits 1 and 2 are written from 1 to 100, and MSCE's key accepts two answers for it.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ms4nupa-pattern",
      name: "Number patterns",
      intuition:
        "Write the gap between each pair of neighbours. The gaps show the rule: the same gap each time, a gap that grows, or a number that doubles.",
      definition:
        "- Write the **gaps** (differences) between neighbouring numbers.\n" +
        "- **Same gap**: keep adding or taking away it.\n" +
        "- **Growing gaps** (1, 2, 3, 4): the next gap is one more.\n" +
        "- If the gaps do not help, try **doubling** or **square numbers** (1, 4, 9, 16).",
      authoredExample: {
        prompt: "Find the next number: 2, 3, 5, 8, 12, ?",
        steps: [
          "Gaps: 1, 2, 3, 4. The next gap is 5.",
          "\\(12 + 5 = 17\\).",
        ],
        answer: "17",
      },
      selfCheckExample: {
        prompt: "Find the next number: 50, 48, 44, 38, ?",
        steps: ["Gaps going down: 2, 4, 6. The next gap is 8: \\(38 - 8 = 30\\)."],
        answer: "30",
      },
      practiceSet: [
        { prompt: "Find the next number: 5, 10, 20, 40, ?", answer: "80. Each number is doubled." },
        { prompt: "Find the next number: 1, 4, 9, 16, ?", answer: "25, the next square number" },
        { prompt: "Find the next number: 100, 95, 90, ?", answer: "85" },
        { prompt: "Find the next number: 3, 4, 6, 9, 13, ?", answer: "18. The gaps are 1, 2, 3, 4, then 5." },
      ],
      pyqExampleId: "9dd72a8c-fd42-4172-a45b-11af779cac33",
      traps: [
        {
          title: "Using the first gap for every step",
          body: "When the gaps grow, the next number is not found with the first gap. Write all the gaps before choosing.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ms4nupa-digits",
      name: "Counting a digit from 1 to 100",
      intuition:
        "A digit can sit in the units place or the tens place, so count the two places separately and add. From 1 to 99, every digit from 1 to 9 is in the units place 10 times and in the tens place 10 times.",
      definition:
        "- **Units place**: 1, 11, 21, ..., 91 gives the digit 1 ten times. The same holds for 2 to 9.\n" +
        "- **Tens place**: 10 to 19 gives the digit 1 ten times. The same holds for 2 to 9.\n" +
        "- So from 1 to 99, each of the digits 1 to 9 is written **20 times**.\n" +
        "- Then check **100**: it adds one more 1 and two more 0s.",
      authoredExample: {
        prompt: "How many times is the digit 5 written from 1 to 50?",
        steps: [
          "Units place: 5, 15, 25, 35, 45 gives 5 times.",
          "Tens place: only 50 gives 1 time.",
          "Total: \\(5 + 1 = 6\\).",
        ],
        answer: "6 times",
      },
      selfCheckExample: {
        prompt: "How many times is the digit 3 written from 1 to 40?",
        steps: ["Units: 3, 13, 23, 33 gives 4. Tens: 30 to 39 gives 10. Total 14."],
        answer: "14 times",
      },
      practiceSet: [
        { prompt: "How many times is the digit 7 written from 1 to 100?", answer: "20 times" },
        { prompt: "How many times is the digit 0 written from 1 to 100?", answer: "11 times: once in each of 10, 20, ..., 90, and twice in 100" },
        { prompt: "How many 2-digit numbers are there?", answer: "90, from 10 to 99" },
        { prompt: "How many times is the digit 9 written from 1 to 30?", answer: "3 times: in 9, 19 and 29" },
      ],
      traps: [
        {
          title: "Counting 11 once",
          body: "In 11 the digit 1 is written twice, once in the tens place and once in the units place. Counting by places takes care of it.",
        },
        {
          title: "Forgetting 100",
          body: "If the counting goes up to 100, it adds a 1 and two 0s.",
        },
      ],
    },
  ],
};
