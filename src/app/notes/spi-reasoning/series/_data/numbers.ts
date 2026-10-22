import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_RSS_NUMBERS_NOTE: SubtopicNote = {
  subtopicName: "Number Series",
  title: "Number Series",
  oneLineDefinition:
    "A number series follows one rule from term to term. Find the rule from the differences, the multipliers or the squares, then use it to fill the gap or catch the wrong term.",
  whyItMatters:
    "Five questions in the bank, all from the 2022 paper: three EASY, one MODERATE and one HARD. Two ask for a missing term and three for the wrong term, and each yields to one of three checks: the differences, the multipliers, or squares with one added or taken away.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "spirssns-differences",
      name: "Write the differences first",
      intuition:
        "Under every series is a second, simpler row: the gaps between the terms. Write it out. Usually the gaps are all the same, or grow by a fixed step, or are a list you know, such as the primes.",
      definition:
        "The method:\n" +
        "- Write the difference between each pair of next-door terms under the series.\n" +
        "- **Same each time**: add that number (5, 10, 15, 20 adds 5).\n" +
        "- **Growing by a fixed step**: the differences go up by 2 or 3 each time.\n" +
        "- **A known list**: the differences are 2, 3, 5, 7, 11 (primes) or 1, 4, 9, 16 (squares).\n" +
        "- For a **wrong term**, find the one place where the pattern of differences breaks. One wrong term spoils two differences next to it.",
      formula: {
        label: "Next term from the differences",
        latex: "t_{n+1} = t_n + d_n",
        symbols: [
          { symbol: "tₙ", meaning: "the term in place n" },
          { symbol: "dₙ", meaning: "the difference that follows it" },
        ],
      },
      authoredExample: {
        prompt: "Find the next term: 3, 7, 13, 21, 31, ?",
        steps: [
          "Differences: \\(7 - 3 = 4\\), \\(13 - 7 = 6\\), \\(21 - 13 = 8\\), \\(31 - 21 = 10\\).",
          "They grow by 2, so the next difference is 12.",
          "\\(31 + 12 = 43\\).",
        ],
        answer: "43",
      },
      selfCheckExample: {
        prompt: "Find the wrong term: 4, 9, 15, 22, 30, 41",
        steps: [
          "Differences: 5, 6, 7, 8, 11. They should go 5, 6, 7, 8, 9.",
          "After 30 the term should be \\(30 + 9 = 39\\).",
        ],
        answer: "41 (it should be 39)",
      },
      practiceSet: [
        { prompt: "Find the next term: 2, 5, 8, 11, ?", answer: "14", method: "Add 3 each time." },
        { prompt: "Find the next term: 10, 13, 18, 25, 34, ?", answer: "45", method: "Differences 3, 5, 7, 9, then 11." },
        { prompt: "Find the next term: 2, 4, 7, 12, 19, ?", answer: "30", method: "Differences 2, 3, 5, 7 are primes; next is 11." },
        { prompt: "Find the wrong term: 6, 11, 16, 20, 26", answer: "20 (it should be 21)", method: "Add 5 each time." },
      ],
      pyqExampleId: "8d1dd538-4eb0-4c92-9700-0fde468be982",
      traps: [
        {
          title: "Blaming the wrong term of two",
          body:
            "One wrong term spoils the difference before it and the one after it. Fix the term in the middle of the two odd differences, then check the whole row again.",
        },
        {
          title: "Not recognising the primes",
          body:
            "Differences such as 5, 7, 11, 13 have no fixed step. They are consecutive primes, so the next one is 17, not 15.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spirssns-ratios",
      name: "When the terms grow fast, divide",
      intuition:
        "If the terms jump a long way, the differences are messy. Divide each term by the one before it instead. The multiplier is often the same each time or goes up by one.",
      definition:
        "- Divide each term by the term before it.\n" +
        "- **Same multiplier**: 3, 6, 12, 24 doubles each time.\n" +
        "- **Multiplier rising by one**: \\(\\times 2, \\times 3, \\times 4\\) and so on.\n" +
        "- For a missing term in the middle, check your answer against the term after the gap too.",
      formula: {
        label: "Next term from the multiplier",
        latex: "t_{n+1} = t_n \\times r_n",
        symbols: [{ symbol: "rₙ", meaning: "the multiplier from place n to place n + 1" }],
      },
      authoredExample: {
        prompt: "Find the next term: 2, 4, 12, 48, ?",
        steps: [
          "\\(4 \\div 2 = 2\\), \\(12 \\div 4 = 3\\), \\(48 \\div 12 = 4\\).",
          "The multiplier goes up by one, so the next is \\(\\times 5\\).",
          "\\(48 \\times 5 = 240\\).",
        ],
        answer: "240",
      },
      selfCheckExample: {
        prompt: "Find the next term: 3, 6, 12, 24, ?",
        steps: ["Each term is double the one before.", "\\(24 \\times 2 = 48\\)."],
        answer: "48",
      },
      practiceSet: [
        { prompt: "Find the next term: 5, 15, 45, ?", answer: "135", method: "Multiply by 3." },
        { prompt: "Find the next term: 1, 2, 6, 24, ?", answer: "120", method: "Multiply by 2, 3, 4, then 5." },
        { prompt: "Find the wrong term: 4, 12, 36, 110", answer: "110 (it should be 108)", method: "Multiply by 3." },
        { prompt: "Find the missing term: 7, 14, ?, 56", answer: "28", method: "Doubling: check \\(28 \\times 2 = 56\\)." },
      ],
      pyqExampleId: "27b75cfe-477a-49c6-a3a0-f2facb844629",
      traps: [
        {
          title: "Not checking the term after the gap",
          body:
            "A missing term must lead on to the term after it by the same rule. If your answer does not, the rule is wrong.",
        },
        {
          title: "Keeping the multiplier fixed",
          body:
            "When \\(\\times 3\\) is followed by \\(\\times 4\\), the next step is \\(\\times 5\\). Multiplying by 4 again gives a printed wrong option.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spirssns-two-series",
      name: "Squares, cubes and two series in one",
      intuition:
        "Some series are squares or cubes with a small number added or taken away. Others are two series woven together: read the odd places and the even places separately and each is simple.",
      definition:
        "- Know the squares 1, 4, 9, 16, 25, 36, 49 and the cubes 1, 8, 27, 64, 125.\n" +
        "- If each term is one more or one less than a square, the rule is \\(n^2 + 1\\) or \\(n^2 - 1\\).\n" +
        "- If the terms go up and down, split them: places 1, 3, 5 make one series and places 2, 4, 6 make another.\n" +
        "- Use the other series to check your answer.",
      formula: {
        label: "Square and cube rules",
        latex: "t_n = n^2 \\pm k \\qquad t_n = n^3 \\pm k",
      },
      authoredExample: {
        prompt: "Find the next term: 1, 10, 3, 20, 5, 30, ?",
        steps: [
          "The terms go up and down, so split them.",
          "Odd places: 1, 3, 5, so the next is 7.",
          "Even places: 10, 20, 30 confirm a simple pattern on the other side.",
        ],
        answer: "7",
      },
      selfCheckExample: {
        prompt: "Find the next term: 3, 6, 11, 18, 27, ?",
        steps: [
          "Each term is two more than a square: \\(1 + 2, 4 + 2, 9 + 2, 16 + 2, 25 + 2\\).",
          "Next: \\(36 + 2 = 38\\).",
        ],
        answer: "38",
      },
      practiceSet: [
        { prompt: "Find the next term: 0, 3, 8, 15, 24, ?", answer: "35", method: "\\(n^2 - 1\\): \\(36 - 1\\)." },
        { prompt: "Find the next term: 1, 8, 27, 64, ?", answer: "125", method: "Cubes." },
        { prompt: "Find the next term: 4, 20, 6, 30, 8, 40, ?", answer: "10", method: "Odd places: 4, 6, 8, then 10." },
        { prompt: "Find the wrong term: 2, 9, 28, 65, 125", answer: "125 (it should be 126)", method: "\\(n^3 + 1\\): \\(5^3 + 1 = 126\\)." },
      ],
      pyqExampleId: "8330e981-b73e-4b66-816d-557b315d3662",
      traps: [
        {
          title: "Reading an up-and-down series as one",
          body:
            "If the terms rise and fall in turn, the differences make no sense as one row. Split the odd and even places first.",
        },
        {
          title: "Missing a square by one",
          body:
            "A term one away from the rule, such as 50 where 51 fits \\(n^2 + 2\\), is easy to pass over. Write the square next to each term to see it.",
        },
      ],
    },
  ],
};
