import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_RSE_DIFFERENCES_NOTE: SubtopicNote = {
  subtopicName: "Difference Series",
  title: "Difference Series",
  oneLineDefinition:
    "Write the gap between each pair of next-door terms under the series; the gaps are steady, grow by a fixed step, follow a list you know, or take turns between two rules.",
  whyItMatters:
    "Seventy-five questions in the bank, 33 from the 2023 shifts, 22 from the 2024 shifts and 20 from the 2025 shifts: 71 EASY and four MODERATE. In 44 the differences are steady or grow by a fixed step, in 20 the differences follow a rule of their own (primes, squares, doubling, or a second row of differences), and in eleven two rules take turns. Writing the differences is the first thing to try on any number series, so this page comes before the others.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscrsedi-steady",
      name: "Steady and evenly growing differences",
      intuition:
        "Most number series in SSC are built by adding. Write the differences, and you usually see the same number every time, or a row like 4, 7, 10, 13 that grows by the same amount.",
      definition:
        "- **The order a strong student tries:** differences first; if the terms grow very fast, ratios next (the Multiplication page); then squares, cubes and primes; then alternate terms.\n" +
        "- **Same difference:** add it again. 245, 212, 179 takes away 33 each time.\n" +
        "- **Differences that grow by a fixed step:** 5, 8, 11 grows by 3, so the next difference is 14.\n" +
        "- **Missing term in the middle:** find the differences on both sides of the gap; the blank must make both of them fit.\n" +
        "- **Fast route:** after you get an answer, add the next difference to it and check that you land on the term printed after it. Two options rarely survive that check.",
      formula: {
        label: "Next term when the difference grows by a fixed step",
        latex: "t_{n+1} = t_n + d_n \\qquad d_{n+1} = d_n + k",
        symbols: [
          { symbol: "\\(t_n\\)", meaning: "the term in place n" },
          { symbol: "\\(d_n\\)", meaning: "the difference after that term" },
          { symbol: "\\(k\\)", meaning: "the fixed amount the difference grows by (0 for a steady series)" },
        ],
      },
      authoredExample: {
        prompt: "Find the missing term: 14, 19, 27, 38, ?, 69",
        steps: [
          "Differences you can see: \\(19 - 14 = 5\\), \\(27 - 19 = 8\\), \\(38 - 27 = 11\\). They grow by 3.",
          "Next difference 14: \\(38 + 14 = 52\\).",
          "Check with the term after the gap: the next difference is 17, and \\(52 + 17 = 69\\). It fits.",
        ],
        answer: "52",
      },
      selfCheckExample: {
        prompt: "Find the next term: 150, 141, 130, 117, ?",
        steps: [
          "Differences: \\(-9, -11, -13\\). Each falls by 2, so the next is \\(-15\\).",
          "\\(117 - 15 = 102\\).",
        ],
        answer: "102",
      },
      practiceSet: [
        { prompt: "Find the next term: 7, 19, 31, 43, ?", answer: "55", method: "Add 12 each time." },
        { prompt: "Find the next term: 4, 10, 22, 40, ?", answer: "64", method: "Differences 6, 12, 18, then 24." },
        { prompt: "Find the missing term: 90, 84, ?, 66, 54", answer: "76", method: "Differences \\(-6, -8, -10, -12\\)." },
        { prompt: "Find the next term: 11, 12, 15, 20, 27, ?", answer: "36", method: "Differences 1, 3, 5, 7, then 9." },
      ],
      pyqExampleId: "80ddfa1d-f55e-47e1-b660-8a3cf4a603a4",
      traps: [
        {
          title: "Not checking the term after the blank",
          body:
            "An answer that fits the differences before a middle blank can still break the one after it. Always add the next difference and land on the printed term.",
        },
        {
          title: "Mixing up the sign of the difference",
          body:
            "In a falling series the differences are negative. 70, 58, 47 has differences \\(-12\\) and \\(-11\\), so the next is \\(-10\\) and the term is 37, not 57.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrsedi-second-level",
      name: "Differences that follow their own rule",
      intuition:
        "Sometimes the row of differences is itself a series you know: the primes, the squares, the doubling numbers. If not, take the differences of the differences, and that second row is usually steady.",
      definition:
        "- **Known lists to recognise in the differences:**\n" +
        "- Primes: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47.\n" +
        "- Squares: 1, 4, 9, 16, 25, 36, 49, 64, 81, 100. Cubes: 1, 8, 27, 64, 125.\n" +
        "- Doubling: 1, 2, 4, 8, 16, 32. Powers of 3: 1, 3, 9, 27, 81, 243.\n" +
        "- **Second row of differences:** if the differences are 3, 5, 9, 15, their own differences are 2, 4, 6, so the next difference is \\(15 + 8 = 23\\).\n" +
        "- **Doubling differences** mean the same series as \\(\\times 2\\) plus a fixed number. Either route gives the same answer, so use whichever you see first.",
      authoredExample: {
        prompt: "Find the next term: 6, 8, 11, 16, 23, ?",
        steps: [
          "Differences: 2, 3, 5, 7. These are the primes in order.",
          "The next prime is 11, so the next term is \\(23 + 11 = 34\\).",
        ],
        answer: "34",
      },
      selfCheckExample: {
        prompt: "Find the next term: 5, 6, 10, 19, 35, ?",
        steps: [
          "Differences: 1, 4, 9, 16, the squares of 1, 2, 3, 4.",
          "Next is \\(5^2 = 25\\): \\(35 + 25 = 60\\).",
        ],
        answer: "60",
      },
      practiceSet: [
        { prompt: "Find the next term: 4, 5, 7, 11, 19, ?", answer: "35", method: "Differences 1, 2, 4, 8 double; next is 16." },
        { prompt: "Find the next term: 10, 12, 17, 27, 44, ?", answer: "70", method: "Differences 2, 5, 10, 17; their differences 3, 5, 7, so next is 9 and the difference is 26." },
        { prompt: "Find the next term: 1, 9, 36, 100, ?", answer: "225", method: "Differences 8, 27, 64 are cubes; next is 125." },
        { prompt: "Find the next term: 200, 197, 192, 185, 174, ?", answer: "161", method: "Differences 3, 5, 7, 11 are primes; next is 13." },
      ],
      pyqExampleId: "25be8b59-ef08-47d7-a40f-86dcb507194f",
      traps: [
        {
          title: "Counting 1 or 9 as a prime",
          body:
            "1 is not a prime, and neither are 9, 15, 21 or 27. The primes after 7 are 11 and 13, so a difference row of 5, 7, 9 is not the primes.",
        },
        {
          title: "Skipping a prime",
          body:
            "After 31 come 37, 41, 43, 47: the gaps between primes are uneven, so list them, do not add a fixed step.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrsedi-alternating",
      name: "Two rules taking turns",
      intuition:
        "If the differences zigzag, such as +8, \\(-3\\), +8, \\(-3\\), the series is two rules taking turns. Often it is easier to see it as two separate series woven together: the odd places and the even places.",
      definition:
        "- **Zigzag differences:** look at every other difference. +8, \\(-3\\), +8, \\(-3\\) means the two steps repeat in turn.\n" +
        "- **Two series in one:** write the 1st, 3rd, 5th terms as one series and the 2nd, 4th, 6th as another. Each has its own simple rule.\n" +
        "- **Signs that alternate with a growing size:** \\(+1, -3, +5, -7\\) goes on as \\(+9\\).\n" +
        "- **Count the blank's place** to know which of the two series it belongs to.",
      authoredExample: {
        prompt: "Find the missing term: 12, 20, 17, 25, ?, 30, 27",
        steps: [
          "Differences: \\(+8, -3, +8\\). The steps take turns: +8, then \\(-3\\).",
          "After 25 comes a \\(-3\\) step: \\(25 - 3 = 22\\).",
          "Check: \\(22 + 8 = 30\\) and \\(30 - 3 = 27\\), both printed.",
        ],
        answer: "22",
      },
      selfCheckExample: {
        prompt: "Find the next term: 5, 40, 10, 35, 15, 30, ?",
        steps: [
          "Odd places: 5, 10, 15 (+5). Even places: 40, 35, 30 (\\(-5\\)).",
          "The 7th term is in the odd-place series: \\(15 + 5 = 20\\).",
        ],
        answer: "20",
      },
      practiceSet: [
        { prompt: "Find the next term: 100, 96, 88, 84, 76, ?", answer: "72", method: "Steps \\(-4\\) and \\(-8\\) take turns." },
        { prompt: "Find the next term: 3, 50, 6, 45, 9, ?", answer: "40", method: "Even places 50, 45 fall by 5." },
        { prompt: "Find the next term: 7, 2, 14, 4, 21, 6, ?", answer: "28", method: "Odd places 7, 14, 21 rise by 7." },
        { prompt: "Find the next term: 20, 23, 19, 24, 18, ?", answer: "25", method: "Differences \\(+3, -4, +5, -6\\), then \\(+7\\)." },
      ],
      pyqExampleId: "cb18f69e-694f-48f8-b7ad-b46a63ff6d16",
      traps: [
        {
          title: "Putting the blank in the wrong series",
          body:
            "In a woven series the 7th term belongs to the odd places. Count the places before you decide which rule to continue.",
        },
      ],
    },
  ],
};
