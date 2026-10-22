import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_OR_RANKS_NOTE: SubtopicNote = {
  subtopicName: "Ranks and Order Puzzles",
  title: "Ranks and Order Puzzles",
  oneLineDefinition:
    "A rank counts a person's place from one end of a line; an order puzzle builds the whole line from comparisons, then matches each person to a job by cutting what the clues forbid.",
  whyItMatters:
    "Five questions in the bank: one EASY rank question from the Sample Paper, and a set of four from the 2022 paper on one puzzle about the incomes and jobs in a family (three MODERATE, one HARD). The puzzle set is won by writing the income line once and answering all four questions from it.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "spiorrp-rank",
      name: "Rank from the top and from the bottom",
      intuition:
        "A person who is 3rd from the top has 2 people above. Counting from both ends counts that person twice, so take one away to get the total.",
      definition:
        "- Total in the line \\(=\\) rank from the top \\(+\\) rank from the bottom \\(- 1\\).\n" +
        "- Rank from the other end \\(=\\) total \\(-\\) rank from this end \\(+ 1\\).\n" +
        "- People above a person ranked \\(r\\) from the top: \\(r - 1\\).\n" +
        "- People between two ranks from the same end: the larger rank minus the smaller, minus 1.",
      formula: {
        label: "Total and rank from the other end",
        latex: "N = T + B - 1 \\qquad B = N - T + 1",
        symbols: [
          { symbol: "N", meaning: "number of people in the line" },
          { symbol: "T", meaning: "rank from the top" },
          { symbol: "B", meaning: "rank from the bottom" },
        ],
      },
      authoredExample: {
        prompt: "Asha is 12th from the top and 20th from the bottom of her class. How many students are in the class?",
        steps: [
          "Asha is counted in both ranks, so take her out once.",
          "\\(12 + 20 - 1 = 31\\).",
          "Check: 11 above her, 19 below her, and Asha: \\(11 + 19 + 1 = 31\\).",
        ],
        answer: "31",
      },
      selfCheckExample: {
        prompt: "A class has 40 students. Ravi is 9th from the top. What is his rank from the bottom?",
        steps: ["\\(40 - 9 + 1 = 32\\).", "Check: \\(9 + 32 - 1 = 40\\)."],
        answer: "32nd",
      },
      practiceSet: [
        { prompt: "In a row of 25 children, Mohan is 7th from the left. What is his place from the right?", answer: "19th", method: "\\(25 - 7 + 1 = 19\\)." },
        { prompt: "Kiran is 5th from the top and 8th from the bottom of a list. How many names are in the list?", answer: "12", method: "\\(5 + 8 - 1 = 12\\)." },
        { prompt: "In a queue of 30 people, how many stand behind the 12th person from the front?", answer: "18", method: "\\(30 - 12 = 18\\)." },
        { prompt: "In a class, Rani is 10th and Gita is 15th from the top. How many students are between them?", answer: "4", method: "\\(15 - 10 - 1 = 4\\)." },
      ],
      pyqExampleId: "fed3152e-79c7-4951-ace1-b10447543746",
      traps: [
        {
          title: "Adding the ranks without taking one away",
          body:
            "Ranks from the top and from the bottom both count the same person, so their plain sum is one too many. The total is the sum minus 1.",
        },
        {
          title: "Counting the end people as between",
          body:
            "Between the 20th and the 24th there are only the 21st, 22nd and 23rd: three people, not four. Leave both named people out.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spiorrp-chain",
      name: "Build the line, then fill the grid",
      intuition:
        "An order puzzle hands you pieces: A earns more than B, C less than D. Join the pieces into one line from top to bottom, then fit the jobs using what each clue rules out. Every question in the set is then read off the same line.",
      definition:
        "The method:\n" +
        "- Turn each comparison into a short chain: 'more than' puts a person above, 'less than' below.\n" +
        "- Join chains that share a person into one line.\n" +
        "- **More than only X** means exactly one person is below, and it is X: X is at the bottom.\n" +
        "- **Earns the most** puts that person at the top of everyone.\n" +
        "- For jobs, draw a grid of people and jobs. Fill what the clues give, cross out what they forbid, and the last box in a row or column is forced.\n" +
        "- Count the people named against the number the puzzle says. If they do not match, answer only what every reading agrees on.",
      authoredExample: {
        prompt:
          "Five friends: A is taller than B. C is shorter than B. D is the tallest. E is taller than A but shorter than D. Who is in the middle?",
        steps: [
          "A above B, and B above C: A, B, C.",
          "E is above A and below D: D, E, A, B, C.",
          "The middle of five is the 3rd: A.",
        ],
        answer: "A",
      },
      selfCheckExample: {
        prompt:
          "Amit earns more than Bina but less than Chetan. Dev earns less than Bina. Esha earns more than Chetan. How many of them earn less than Chetan?",
        steps: [
          "Amit is between Bina and Chetan: Chetan, Amit, Bina.",
          "Dev is below Bina and Esha above Chetan: Esha, Chetan, Amit, Bina, Dev.",
          "Below Chetan: Amit, Bina, Dev.",
        ],
        answer: "3",
      },
      practiceSet: [
        { prompt: "Raj is heavier than Sam, and Sam is heavier than Tom. Who is the lightest?", answer: "Tom" },
        {
          prompt: "In a group of five girls, Meena scored more than only one girl. What is her place from the top?",
          answer: "4th",
          method: "One girl is below her, so three are above her.",
        },
        {
          prompt:
            "Four people each have one job: doctor, teacher, pilot, cook. A is neither the doctor nor the pilot. B is the teacher. C is the pilot. What is A's job?",
          answer: "Cook",
          method: "Teacher and pilot are taken, and A is not the doctor, so A is the cook and D the doctor.",
        },
        { prompt: "In the order X above Y above Z above W, how many people are below Y?", answer: "2 (Z and W)" },
      ],
      pyqExampleId: "48629ecf-f40b-4f69-ba20-a1fa0ebe132b",
      traps: [
        {
          title: "Reading 'more than only' as 'more than'",
          body:
            "'More than only X' fixes X as the very lowest, with nobody else below. Plain 'more than X' leaves others possibly below too.",
        },
        {
          title: "Answering from half the clues",
          body:
            "A person you place from one clue can be moved by another. Join every comparison into one line before you answer any question in the set.",
        },
        {
          title: "Trusting a puzzle that does not add up",
          body:
            "If a puzzle names more people than it says there are, one person is left without a job or a place. Answer from what is fixed whichever person is the extra, and expect a key that rests on a guess.",
        },
      ],
    },
  ],
};
