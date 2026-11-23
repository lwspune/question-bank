import type { SubtopicNote } from "@/app/notes/_types";

export const MS4_NU_PLACE_NOTE: SubtopicNote = {
  subtopicName: "Place Value and Number Names",
  title: "Place Value and Number Names",
  oneLineDefinition:
    "Each digit's value depends on its place: units, tens, hundreds, thousands and ten thousands; put each digit in its place to build, name and order numbers.",
  whyItMatters:
    "4 of the chapter's 6 questions: 3 EASY and 1 MODERATE. One writes a cheque amount in words, one builds a number from its places given out of order, one puts four numbers in descending order, and one makes the smallest 5-digit number from given digits.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ms4nupl-value",
      name: "Place value and number names",
      intuition:
        "A 5-digit number has five places: ten thousands, thousands, hundreds, tens and units. Put each digit in its own place, and use 0 to hold any place that is empty.",
      definition:
        "- Places from the left: **ten thousands, thousands, hundreds, tens, units**.\n" +
        "- **Place value** of a digit = the digit × its place: in 47215 the 7 stands for 7000.\n" +
        "- When the places are given **out of order**, write each one in its own column. An empty place gets a **0**.\n" +
        "- In words, read the first two digits as thousands, then the hundreds, then the last two digits: 64208 is sixty four thousand two hundred and eight.",
      authoredExample: {
        prompt: "Write 3 ten thousands + 6 tens + 2 hundreds + 4 units as a number.",
        steps: [
          "Ten thousands 3, thousands 0 (none given), hundreds 2, tens 6, units 4.",
          "\\(30000 + 200 + 60 + 4\\).",
        ],
        answer: "30264",
      },
      selfCheckExample: {
        prompt: "Write 52708 in words.",
        steps: ["52 thousand, 7 hundred, and 8."],
        answer: "Fifty two thousand seven hundred and eight",
      },
      practiceSet: [
        { prompt: "What is the place value of 7 in 47215?", answer: "7000" },
        { prompt: "Write forty thousand and fifty in figures.", answer: "40050" },
        { prompt: "Write 4 ten thousands + 3 units as a number.", answer: "40003" },
        { prompt: "Write 81096 in words.", answer: "Eighty one thousand and ninety six" },
      ],
      pyqExampleId: "306abeb0-f8e7-41cf-9921-dd210c4f0f98",
      traps: [
        {
          title: "Dropping an empty place",
          body: "If no thousands are given, the thousands place still needs a 0. Leaving it out turns a 5-digit number into a 4-digit one.",
        },
        {
          title: "Writing the places in the order given",
          body: "The question may list units before hundreds. Always put each digit in its own place, not in the order it was given.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ms4nupl-order",
      name: "Ordering numbers and making them from digits",
      intuition:
        "To compare numbers, look at the biggest place first. The number with the bigger digit there is bigger; if those are the same, move one place right.",
      definition:
        "- Compare **from the left**: ten thousands first, then thousands, and so on.\n" +
        "- **Descending** = biggest first; **ascending** = smallest first.\n" +
        "- **Greatest number** from given digits: put them from biggest to smallest.\n" +
        "- **Smallest number**: put them from smallest to biggest, but the **first digit cannot be 0**. Put the smallest non-zero digit first, then the 0.",
      authoredExample: {
        prompt: "Make the smallest 5-digit number using the digits 3, 0, 7, 2, 8 once each.",
        steps: [
          "Smallest to biggest is 0, 2, 3, 7, 8, but a number cannot start with 0.",
          "Start with the smallest non-zero digit, 2, then 0, 3, 7, 8.",
        ],
        answer: "20378",
      },
      selfCheckExample: {
        prompt: "Arrange 62105, 61250, 62501 in descending order.",
        steps: ["All start with 6. Thousands: 2, 1, 2, so 61250 is smallest. Between 62105 and 62501, hundreds 1 and 5: 62501 is bigger."],
        answer: "62501, 62105, 61250",
      },
      practiceSet: [
        { prompt: "Make the greatest 5-digit number from 4, 1, 9, 0, 6.", answer: "96410" },
        { prompt: "What is the smallest 5-digit number?", answer: "10000" },
        { prompt: "Which is bigger: 30999 or 31000?", answer: "31000" },
        { prompt: "Arrange 7032, 7302, 7023 in ascending order.", answer: "7023, 7032, 7302" },
      ],
      pyqExampleId: "dec37d81-3665-4527-b0c1-40fd04cc506f",
      traps: [
        {
          title: "Starting a number with 0",
          body: "A number written 01459 is really the 4-digit number 1459. A 5-digit number never starts with 0.",
        },
        {
          title: "Taking the second from the wrong end",
          body: "The second last number in descending order is the second smallest. Write the whole order out before picking.",
        },
      ],
    },
  ],
};
