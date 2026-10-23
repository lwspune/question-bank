import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_RSE_MULTIPLY_NOTE: SubtopicNote = {
  subtopicName: "Multiplication Series",
  title: "Multiplication Series",
  oneLineDefinition:
    "When the terms grow or shrink fast, divide each term by the one before it: a steady ratio, a ratio with a small amount added, a multiplier that rises by one, or two operations taking turns.",
  whyItMatters:
    "Fifty-two questions in the bank, 34 of them from the 2025 shifts: 37 EASY, 14 MODERATE and the one HARD question of the chapter. Ten have a steady ratio, fifteen multiply by a fixed number and then add or take away a fixed amount, seventeen change the multiplier or the amount added at each step, and ten mix operations or build each term from earlier ones.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscrsemu-ratio",
      name: "A steady ratio",
      intuition:
        "If every term is the one before times the same number, the series is a geometric progression. Divide one pair, check another pair, and keep multiplying.",
      definition:
        "- **When to divide:** if the terms more than double, or fall by half or more, differences grow too fast to help. Divide instead.\n" +
        "- **Steady ratio:** \\(\\frac{21}{7} = \\frac{63}{21} = 3\\), so each term is 3 times the one before.\n" +
        "- **Ratios below 1** work the same way: 625, 125, 25 divides by 5 each time; 120, 96 is times 0.8.\n" +
        "- **Term n directly:** the first term times the ratio raised to \\(n - 1\\).",
      formula: {
        label: "Term n of a geometric progression",
        latex: "T_n = a\\,r^{\\,n-1}",
        symbols: [
          { symbol: "\\(a\\)", meaning: "the first term" },
          { symbol: "\\(r\\)", meaning: "the common ratio" },
          { symbol: "\\(n\\)", meaning: "the place of the term" },
        ],
      },
      authoredExample: {
        prompt: "Find the next term: 7, 21, 63, 189, ?",
        steps: [
          "Ratios: \\(21 \\div 7 = 3\\), \\(63 \\div 21 = 3\\), \\(189 \\div 63 = 3\\).",
          "Next: \\(189 \\times 3 = 567\\).",
        ],
        answer: "567",
      },
      selfCheckExample: {
        prompt: "A geometric progression starts at 2.5 and has common ratio 4. What is its 3rd term?",
        steps: [
          "\\(T_3 = 2.5 \\times 4^2 = 2.5 \\times 16 = 40\\).",
          "Check by listing: 2.5, 10, 40.",
        ],
        answer: "40",
      },
      practiceSet: [
        { prompt: "Find the next term: 1024, 256, 64, 16, ?", answer: "4", method: "Divide by 4 each time." },
        { prompt: "Find the next term: 5, 10, 20, 40, ?", answer: "80" },
        { prompt: "Find the missing term: 4, 6, 9, ?, 20.25", answer: "13.5", method: "Ratio 1.5: \\(9 \\times 1.5 = 13.5\\), and \\(13.5 \\times 1.5 = 20.25\\)." },
        { prompt: "Find the next term: \\(\\frac{1}{3}, 1, 3, 9, ?\\)", answer: "27", method: "Ratio 3." },
      ],
      pyqExampleId: "379f3445-f7cb-47ce-8619-cdccc4c5f3e2",
      traps: [
        {
          title: "Raising the ratio to the power n",
          body:
            "The 3rd term is \\(a r^2\\), not \\(a r^3\\): the first term has had no multiplication yet.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrsemu-fixed",
      name: "Multiply, then add or take away a fixed amount",
      intuition:
        "Many series are almost geometric: each term is about double, or about triple, the last. The small amount left over is the same every time, so the rule is times a, plus b.",
      definition:
        "- **Rough ratio first:** 3, 8, 23, 68 is roughly times 3 each time.\n" +
        "- **Find the leftover:** \\(3 \\times 3 = 9\\), and 8 is one less, so the rule is \\(\\times 3 - 1\\).\n" +
        "- **Check it on a second pair** before trusting it: \\(8 \\times 3 - 1 = 23\\).\n" +
        "- **Halving works the same way:** \\(\\div 2 + 2\\) turns 100 into 52.\n" +
        "- **Quick check for times 2:** in a \\(\\times 2 + b\\) series the differences double (and for times 3 they triple), so the difference route gives the same answer.",
      formula: {
        label: "Times a fixed number, plus a fixed amount",
        latex: "t_{n+1} = a\\,t_n + b",
        symbols: [
          { symbol: "\\(a\\)", meaning: "the fixed multiplier (about the ratio of next-door terms)" },
          { symbol: "\\(b\\)", meaning: "the fixed amount added (negative if taken away)" },
        ],
      },
      authoredExample: {
        prompt: "Find the next term: 3, 8, 23, 68, ?",
        steps: [
          "Each term is roughly 3 times the last. \\(3 \\times 3 = 9\\), one more than 8, so try \\(\\times 3 - 1\\).",
          "Check: \\(8 \\times 3 - 1 = 23\\) and \\(23 \\times 3 - 1 = 68\\).",
          "Next: \\(68 \\times 3 - 1 = 203\\).",
        ],
        answer: "203",
      },
      selfCheckExample: {
        prompt: "Find the next term: 6, 13, 27, 55, ?",
        steps: [
          "\\(6 \\times 2 + 1 = 13\\), \\(13 \\times 2 + 1 = 27\\), \\(27 \\times 2 + 1 = 55\\).",
          "Next: \\(55 \\times 2 + 1 = 111\\).",
        ],
        answer: "111",
      },
      practiceSet: [
        { prompt: "Find the next term: 2, 7, 22, 67, ?", answer: "202", method: "\\(\\times 3 + 1\\)." },
        { prompt: "Find the next term: 10, 17, 31, 59, ?", answer: "115", method: "\\(\\times 2 - 3\\)." },
        { prompt: "Find the missing term: 1, 5, ?, 85, 341", answer: "21", method: "\\(\\times 4 + 1\\)." },
        { prompt: "Find the next term: 100, 52, 28, 16, ?", answer: "10", method: "Halve, then add 2." },
      ],
      pyqExampleId: "1af575d5-cec1-4cf1-b214-44fb86734271",
      traps: [
        {
          title: "Checking the rule on one pair only",
          body:
            "From 5 to 11 alone, both \\(\\times 2 + 1\\) and \\(\\times 3 - 4\\) work. Test the rule on a second pair; only one survives.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrsemu-changing",
      name: "The multiplier or the amount added changes",
      intuition:
        "Here the rough ratios are not steady: they go 2, 3, 4, 5. The series multiplies by a number that rises by one, and sometimes adds a number that rises too.",
      definition:
        "- **List the rough ratios:** for 7, 22, 89 they are about 3 and about 4, so the multipliers rise by one.\n" +
        "- **Common forms:** \\(\\times 1, \\times 2, \\times 3\\) and so on; \\(\\times n + n\\) (\\(\\times 1 + 1\\), \\(\\times 2 + 2\\)); \\(\\times 2\\) plus 1, 2, 3; \\(\\times 2 - 1\\), \\(\\times 3 - 2\\), \\(\\times 4 - 3\\).\n" +
        "- **Shrinking series:** 720, 720, 360, 120 divides by 1, 2, 3, so the next divisor is 4.\n" +
        "- **Work out each leftover** (term minus multiplier times the term before) and look at the row of leftovers; it is steady, rising by one, or taking turns.",
      formula: {
        label: "A multiplier that rises with each step",
        latex: "t_{n+1} = (m + n)\\,t_n + c_n",
        symbols: [
          { symbol: "\\(m + n\\)", meaning: "the multiplier, one more at each step" },
          { symbol: "\\(c_n\\)", meaning: "the amount added at that step (steady, rising or taking turns)" },
        ],
      },
      authoredExample: {
        prompt: "Find the next term: 2, 3, 8, 27, 112, ?",
        steps: [
          "Rough ratios rise: about 1.5, about 2.7, about 3.4, about 4.1. Try multipliers 1, 2, 3, 4.",
          "\\(2 \\times 1 + 1 = 3\\), \\(3 \\times 2 + 2 = 8\\), \\(8 \\times 3 + 3 = 27\\), \\(27 \\times 4 + 4 = 112\\). The rule is \\(\\times n + n\\).",
          "Next: \\(112 \\times 5 + 5 = 565\\).",
        ],
        answer: "565",
      },
      selfCheckExample: {
        prompt: "Find the next term: 3, 3, 6, 18, 72, ?",
        steps: [
          "Multipliers 1, 2, 3, 4.",
          "Next: \\(72 \\times 5 = 360\\).",
        ],
        answer: "360",
      },
      practiceSet: [
        { prompt: "Find the next term: 4, 9, 20, 43, ?", answer: "90", method: "\\(\\times 2\\) plus 1, 2, 3, then 4." },
        { prompt: "Find the next term: 5, 6, 14, 45, ?", answer: "184", method: "\\(\\times 1 + 1\\), \\(\\times 2 + 2\\), \\(\\times 3 + 3\\), then \\(\\times 4 + 4\\)." },
        { prompt: "Find the next term: 720, 720, 360, 120, ?", answer: "30", method: "Divide by 1, 2, 3, then 4." },
        { prompt: "Find the next term: 2, 6, 24, 120, ?", answer: "720", method: "Multipliers 3, 4, 5, then 6." },
      ],
      pyqExampleId: "cd4c7ca0-f460-4aa3-add5-dbae097fe6b1",
      traps: [
        {
          title: "Forcing a fixed multiplier",
          body:
            "In 1, 2, 6, 24 the ratios are 2, 3, 4. Trying a steady \\(\\times 3\\) plus something leaves a messy row of leftovers. When the rough ratios climb, the multiplier climbs.",
        },
        {
          title: "Using the wrong multiplier for the missing step",
          body:
            "When the blank is in the middle, its step uses the multiplier for that place. Count the steps from the start so you do not use the one meant for the last pair.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrsemu-mixed",
      name: "Operations that take turns, and terms built from earlier terms",
      intuition:
        "Two kinds of series break the patterns above: those that switch between two operations, such as times 2 then add 3, and those where each term is made from the terms before it.",
      definition:
        "- **Operations that take turns:** check the steps one at a time. 4, 12, 15, 45, 48 is \\(\\times 3\\), \\(+3\\), \\(\\times 3\\), \\(+3\\).\n" +
        "- **Sum of the two before** (Fibonacci type): 2, 5, 7, 12, 19, each term is the two before added.\n" +
        "- **Product of the two before:** 2, 3, 6, 18, each term is the two before multiplied.\n" +
        "- **Square of the term before, plus 1:** 3, 10, 101.\n" +
        "- **Signal:** differences that jump about with no pattern, or ratios that are whole numbers only at every other step.",
      authoredExample: {
        prompt: "Find the next term: 4, 12, 15, 45, 48, ?",
        steps: [
          "Steps: \\(\\times 3\\), \\(+3\\), \\(\\times 3\\), \\(+3\\). They take turns.",
          "The next step is \\(\\times 3\\): \\(48 \\times 3 = 144\\).",
        ],
        answer: "144",
      },
      selfCheckExample: {
        prompt: "Find the next term: 2, 3, 6, 18, ?",
        steps: [
          "\\(2 \\times 3 = 6\\) and \\(3 \\times 6 = 18\\): each term is the product of the two before it.",
          "Next: \\(6 \\times 18 = 108\\).",
        ],
        answer: "108",
      },
      practiceSet: [
        { prompt: "Find the next term: 2, 5, 7, 12, 19, ?", answer: "31", method: "Each term is the sum of the two before it." },
        { prompt: "Find the next term: 9, 18, 13, 26, 21, ?", answer: "42", method: "\\(\\times 2\\) and \\(-5\\) take turns." },
        { prompt: "Find the next term: 3, 10, 101, ?", answer: "10202", method: "Square the term before and add 1: \\(101^2 + 1\\)." },
        { prompt: "Find the next term: 6, 8, 16, 18, 36, ?", answer: "38", method: "\\(+2\\) and \\(\\times 2\\) take turns." },
      ],
      pyqExampleId: "f7fcd50b-99c8-44fa-a739-e2462cc11d60",
      traps: [
        {
          title: "Using differences on a series that takes turns",
          body:
            "For 4, 12, 15, 45 the differences 8, 3, 30 look random. Look at each step's operation instead: a whole-number ratio at every other step is the giveaway.",
        },
      ],
    },
  ],
};
