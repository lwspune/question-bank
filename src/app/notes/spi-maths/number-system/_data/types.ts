import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_NS_TYPES_NOTE: SubtopicNote = {
  subtopicName: "Number Types and Place Value",
  title: "Number Types and Place Value",
  oneLineDefinition:
    "Every number belongs to a family (natural, whole, integer, even, odd), and every digit in it is worth the digit times the value of its place.",
  whyItMatters:
    "Eight questions in the bank, four of them from the 2022 paper: four EASY and four MODERATE. They ask which family a number belongs to, what a digit is worth in its place, and how many digits or numbers a list holds. Each is quick once you count carefully.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "spinsty-sets",
      name: "Natural numbers, whole numbers, integers, even and odd",
      intuition:
        "The number families sit inside each other. Counting numbers come first, adding 0 gives the whole numbers, and adding the negatives gives the integers. Every integer is then either even or odd.",
      definition:
        "- **0 is a whole number but not a natural number.**\n" +
        "- An **even** integer can be written as \\(2m\\) and an **odd** integer as \\(2m + 1\\), for some integer \\(m\\).\n" +
        "- 0 is even. Every integer is even or odd, never both.\n" +
        "- \\((-1)\\) raised to an even power is \\(1\\); raised to an odd power it is \\(-1\\).",
      table: {
        columns: ["Family", "What it holds", "Examples"],
        rows: [
          { cells: ["Natural numbers", "The counting numbers, starting at 1", "1, 2, 3, 4, ..."] },
          {
            cells: ["Whole numbers", "The natural numbers and 0", "0, 1, 2, 3, ..."],
            noteAmber: "0 is the smallest whole number. There is no smallest integer.",
          },
          { cells: ["Integers", "The whole numbers and their negatives", "..., \\(-2\\), \\(-1\\), 0, 1, 2, ..."] },
          { cells: ["Even integers", "Numbers of the form \\(2m\\)", "\\(-4\\), 0, 6, 10"] },
          { cells: ["Odd integers", "Numbers of the form \\(2m + 1\\)", "\\(-3\\), 1, 7, 11"] },
          { cells: ["Powers of \\(-1\\)", "1 for an even power, \\(-1\\) for an odd power", "\\((-1)^4 = 1\\), \\((-1)^7 = -1\\)"] },
        ],
        caption: "Each family contains the one above it: natural numbers are whole numbers, and whole numbers are integers.",
      },
      selfCheckExample: {
        prompt: "Find \\((-1)^1 + (-1)^2 + (-1)^3 + \\ldots + (-1)^{50}\\).",
        steps: [
          "The terms go \\(-1, +1, -1, +1, \\ldots\\)",
          "50 terms make 25 pairs, and each pair \\(-1 + 1\\) adds to 0.",
        ],
        answer: "\\(0\\)",
      },
      practiceSet: [
        { prompt: "Is 0 a natural number, a whole number, or both?", answer: "A whole number only." },
        { prompt: "What is the smallest whole number?", answer: "0" },
        { prompt: "For an integer m, is \\(2m + 3\\) even or odd?", answer: "Odd, since \\(2m + 3 = 2(m + 1) + 1\\)." },
        { prompt: "What is \\((-1)^{99}\\)?", answer: "\\(-1\\) (99 is odd)" },
      ],
      pyqExampleId: "5a64d414-9c78-4912-b653-54f4c39256b2",
      traps: [
        {
          title: "Calling 0 a natural number",
          body: "The natural numbers start at 1. The set \\(\\{0, 1, 2, 3, \\ldots\\}\\) is the whole numbers.",
        },
        {
          title: "Losing track of alternating signs",
          body:
            "In a long sum of powers of \\(-1\\), pair the terms first. If a minus sign sits in front of every even power, then every term becomes \\(-1\\), and the sum is minus the number of terms.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spinsty-place",
      name: "Place value and face value",
      intuition:
        "A digit means different amounts in different places. The 3 in 3000 is worth three thousand, but the 3 in 30 is worth only thirty. Its face value, the digit itself, stays 3.",
      definition:
        "- **Face value** of a digit is the digit itself.\n" +
        "- **Place value** is the digit times the value of its place: units 1, tens 10, hundreds 100, thousands 1000, and so on.\n" +
        "- Name the places from the right: units, tens, hundreds, thousands, ten thousands, hundred thousands (lakhs), millions (ten lakhs).\n" +
        "- The smallest number of \\(n\\) digits is 1 followed by \\(n - 1\\) zeros; the largest is \\(n\\) nines.",
      formula: {
        label: "Place value",
        latex: "\\text{place value} = \\text{digit} \\times \\text{value of its place}",
      },
      authoredExample: {
        prompt: "In 857394, find the place value of 5, and the difference between the place value and the face value of 7.",
        steps: [
          "From the right: 4 units, 9 tens, 3 hundreds, 7 thousands, 5 ten thousands, 8 hundred thousands.",
          "Place value of 5: \\(5 \\times 10000 = 50000\\).",
          "Place value of 7 is 7000 and its face value is 7, so the difference is \\(7000 - 7 = 6993\\).",
        ],
        answer: "50000 and 6993",
      },
      selfCheckExample: {
        prompt: "In 46382, find the sum of the place values of 6 and 8.",
        steps: [
          "6 is in the thousands place: 6000.",
          "8 is in the tens place: 80.",
          "\\(6000 + 80 = 6080\\).",
        ],
        answer: "6080",
      },
      practiceSet: [
        { prompt: "What is the face value of 9 in 39104?", answer: "9" },
        { prompt: "What is the place value of 3 in 532610?", answer: "30000" },
        { prompt: "What is the difference between the largest and the smallest three-digit numbers?", answer: "\\(999 - 100 = 899\\)" },
        { prompt: "The digit 4 appears twice in 34846. What is the difference between the place values of the two 4s?", answer: "\\(4000 - 40 = 3960\\)" },
      ],
      pyqExampleId: "9cc6bb3e-5173-4ce7-8211-ea80be52058e",
      traps: [
        {
          title: "Confusing place value with face value",
          body: "The face value of a digit never changes. Only the place value grows with the place, so read which one the question asks for.",
        },
        {
          title: "Counting places from the left",
          body: "Always count places from the right, starting with units. In a seven-digit number the second digit from the left is in the hundred thousands place.",
        },
        {
          title: "The smallest five-digit number",
          body: "It is 10000, not 11111 or 00000. A number cannot start with 0, so the first digit is 1 and the rest are zeros.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spinsty-digits",
      name: "Counting digits and numbers made from digits",
      intuition:
        "Writing out a long list of numbers uses up digits in blocks: one digit each for 1 to 9, two each for 10 to 99, three each for 100 to 999. And when a few digits are arranged in every order, each digit sits in each place equally often.",
      definition:
        "- 1 to 9: 9 numbers, 9 digits. 10 to 99: 90 numbers, 180 digits. 100 to 999: 900 numbers, 2700 digits.\n" +
        "- The count of whole numbers from \\(m\\) to \\(n\\), both included, is \\(n - m + 1\\).\n" +
        "- Three different non-zero digits make \\(3 \\times 2 \\times 1 = 6\\) three-digit numbers, and each digit stands in each place twice.\n" +
        "- So the sum of those six numbers is \\(2 \\times (\\text{sum of the digits}) \\times 111\\).",
      formula: {
        label: "Sum of all numbers from three different non-zero digits",
        latex: "\\text{sum} = 2 \\times (a + b + c) \\times 111 \\qquad \\text{numbers from } m \\text{ to } n = n - m + 1",
      },
      authoredExample: {
        prompt: "Find the sum of all three-digit numbers that can be formed from 3, 5 and 8, using each digit once.",
        steps: [
          "There are 6 numbers, and each digit stands twice in the hundreds, twice in the tens and twice in the units.",
          "Sum \\(= 2 \\times (3 + 5 + 8) \\times 111 = 2 \\times 16 \\times 111 = 3552\\).",
          "Check by listing: \\(358 + 385 + 538 + 583 + 835 + 853 = 3552\\).",
        ],
        answer: "3552",
      },
      selfCheckExample: {
        prompt: "A book has 150 pages. How many digits are printed to number all its pages?",
        steps: [
          "Pages 1 to 9: 9 digits.",
          "Pages 10 to 99: \\(90 \\times 2 = 180\\) digits.",
          "Pages 100 to 150: \\(150 - 100 + 1 = 51\\) pages, \\(51 \\times 3 = 153\\) digits.",
          "Total \\(= 9 + 180 + 153 = 342\\).",
        ],
        answer: "342",
      },
      practiceSet: [
        { prompt: "How many two-digit numbers are there?", answer: "90 (10 to 99)" },
        { prompt: "How many digits are needed to write all the numbers from 1 to 99?", answer: "\\(9 + 180 = 189\\)" },
        { prompt: "How many digits are needed to write all the numbers from 1 to 50?", answer: "\\(9 + 41 \\times 2 = 91\\)" },
        { prompt: "How many three-digit numbers can be formed from 2, 4 and 9, using each digit once?", answer: "6" },
      ],
      pyqExampleId: "a948e2a8-d54c-42d9-8e6c-433a3bfd5c49",
      traps: [
        {
          title: "Counting a range one short",
          body: "From 100 to 200 there are 101 numbers, not 100. With both ends included, the count is last minus first plus one.",
        },
        {
          title: "Using the 111 rule when one digit is 0",
          body:
            "A number cannot start with 0. From 0, 3 and 5 only four three-digit numbers exist (305, 350, 503, 530), with sum 1688. The rule \\(2 \\times 8 \\times 111 = 1776\\) wrongly adds 035 and 053.",
        },
      ],
    },
  ],
};
