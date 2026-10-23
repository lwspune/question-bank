import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_NS_DIVISION_NOTE: SubtopicNote = {
  subtopicName: "Division Algorithm and Multiples",
  title: "Division Algorithm and Multiples",
  oneLineDefinition:
    "Every division gives a quotient and a remainder smaller than the divisor, and the remainder tells you exactly how far a number is from the nearest multiples.",
  whyItMatters:
    "Eight questions in the bank, seven EASY and one MODERATE. They all use one equation, dividend equals divisor times quotient plus remainder: forwards to rebuild a dividend, and backwards to find the nearest multiple of a number or the least amount to add or take away.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscnsdv-algorithm",
      name: "The division algorithm",
      intuition:
        "Share 47 sweets among 5 children: each gets 9 and 2 are left over. The sweets you started with are the shares plus the leftover, and the leftover is always fewer than the number of children, or each child could have had one more.",
      definition:
        "- **Dividend \\(=\\) divisor \\(\\times\\) quotient \\(+\\) remainder**, and the remainder is at least 0 and less than the divisor.\n" +
        "- 'Exactly divisible' means the remainder is 0.\n" +
        "- When a stem links the divisor to the quotient and the remainder ('the divisor is 6 times the remainder'), start from the one number it gives you directly and follow the links one at a time.\n" +
        "- Fast route for an **exact** division where the dividend and the divisor are both changed by a percentage: the new quotient is the old one times the dividend's factor over the divisor's factor. If the dividend is raised by 20% and the divisor cut by 25%, the quotient becomes \\(q \\times \\frac{1.2}{0.75} = 1.6q\\).",
      formula: {
        label: "Division algorithm",
        latex: "\\text{Dividend} = \\text{Divisor} \\times \\text{Quotient} + \\text{Remainder}, \\qquad 0 \\le \\text{Remainder} < \\text{Divisor}",
      },
      authoredExample: {
        prompt: "In a division, the divisor is 5 times the remainder and the quotient is 3 more than the divisor. If the remainder is 7, find the dividend.",
        steps: [
          "Start from the number given: remainder \\(= 7\\).",
          "Divisor \\(= 5 \\times 7 = 35\\), and quotient \\(= 35 + 3 = 38\\).",
          "Dividend \\(= 35 \\times 38 + 7 = 1330 + 7 = 1337\\).",
          "Check: 7 is less than 35, so it is a valid remainder.",
        ],
        answer: "1337",
      },
      selfCheckExample: {
        prompt: "A number divided by 23 gives quotient 17 and remainder 9. What is the number?",
        steps: ["Number \\(= 23 \\times 17 + 9 = 391 + 9 = 400\\)."],
        answer: "400",
      },
      practiceSet: [
        { prompt: "Find the quotient and the remainder when 500 is divided by 12.", answer: "Quotient 41, remainder 8", method: "\\(12 \\times 41 = 492\\) and \\(500 - 492 = 8\\)." },
        { prompt: "Can the remainder be 18 when the divisor is 18?", answer: "No", method: "The remainder must be less than the divisor; 18 left over is one more full share." },
        {
          prompt: "In a division the divisor is 3 times the remainder, the remainder is 11 and the quotient is 20. Find the dividend.",
          answer: "671",
          method: "Divisor \\(= 33\\), so dividend \\(= 33 \\times 20 + 11 = 671\\).",
        },
        {
          prompt: "A number divided by 15 gives quotient 40 and remainder 0. If the divisor is reduced by 20% and the dividend is kept, what is the new quotient?",
          answer: "50",
          method: "The division is exact, so the quotient becomes \\(40 \\times \\frac{1}{0.8} = 50\\). Check: \\(600 \\div 12 = 50\\).",
        },
      ],
      pyqExampleId: "193f6b3e-225c-4199-bacb-3bc5baa07297",
      traps: [
        {
          title: "Accepting a remainder as large as the divisor",
          body: "A remainder is always less than the divisor. If your working gives a remainder equal to or bigger than the divisor, the quotient is too small.",
        },
        {
          title: "Scaling the quotient of a division that had a remainder",
          body: "Multiplying the quotient by the ratio of the two factors is exact only when the original division left remainder 0. Otherwise rebuild the dividend and divide again.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscnsdv-multiples",
      name: "The nearest multiple of a number",
      intuition:
        "Divide and look at the remainder. It is how far you are above the multiple just below; the divisor minus the remainder is how far you are below the multiple just above.",
      definition:
        "- Divide: \\(N = dq + r\\).\n" +
        "- Largest multiple of \\(d\\) not above \\(N\\): \\(N - r\\). So the **least number to subtract** is \\(r\\).\n" +
        "- Smallest multiple of \\(d\\) not below \\(N\\): \\(N + (d - r)\\) when \\(r \\ne 0\\). So the **least number to add** is \\(d - r\\).\n" +
        "- **Largest \\(n\\)-digit multiple:** take \\(N = 99\\ldots9\\) (the largest \\(n\\)-digit number) and subtract the remainder.\n" +
        "- **Smallest \\(n\\)-digit multiple:** take \\(N = 10\\ldots0\\) (the smallest \\(n\\)-digit number) and add \\(d - r\\).\n" +
        "- Fast route: you rarely need the full division. Jump to a round multiple first (\\(53 \\times 200 = 10600\\)), then take away or add small multiples of \\(d\\) until you reach \\(N\\).",
      formula: {
        label: "Distance to the nearest multiples",
        latex: "N = dq + r: \\quad \\text{subtract } r, \\ \\text{or add } d - r",
        symbols: [
          { symbol: "N", meaning: "the given number" },
          { symbol: "d", meaning: "the divisor" },
          { symbol: "r", meaning: "the remainder when N is divided by d" },
        ],
      },
      authoredExample: {
        prompt: "Find the smallest 4-digit number and the largest 4-digit number that are exactly divisible by 37.",
        steps: [
          "Smallest: \\(37 \\times 27 = 999\\), so \\(1000 = 37 \\times 27 + 1\\). Add \\(37 - 1 = 36\\): \\(1036 = 37 \\times 28\\).",
          "Largest: \\(37 \\times 270 = 9990\\), so \\(9999 = 37 \\times 270 + 9\\). Subtract 9: 9990.",
          "Check: \\(9990 + 37 = 10027\\) has five digits, so 9990 is the largest.",
        ],
        answer: "1036 and 9990",
      },
      selfCheckExample: {
        prompt: "What is the least number that must be subtracted from 2000 so that the result is exactly divisible by 27?",
        steps: [
          "\\(27 \\times 74 = 1998\\), so \\(2000 = 27 \\times 74 + 2\\).",
          "Subtract the remainder, 2. Check: \\(1998 \\div 27 = 74\\).",
        ],
        answer: "2",
      },
      practiceSet: [
        { prompt: "What is the least number that must be added to 500 to make it exactly divisible by 23?", answer: "6", method: "\\(500 = 23 \\times 21 + 17\\), so add \\(23 - 17 = 6\\)." },
        { prompt: "What is the largest 3-digit number exactly divisible by 19?", answer: "988", method: "\\(999 = 19 \\times 52 + 11\\), so \\(999 - 11 = 988\\)." },
        { prompt: "What is the smallest 3-digit number exactly divisible by 41?", answer: "123", method: "\\(41 \\times 2 = 82\\) has two digits; \\(41 \\times 3 = 123\\)." },
        { prompt: "What is the least number that must be subtracted from 1000 to make it exactly divisible by 45?", answer: "10", method: "\\(1000 = 45 \\times 22 + 10\\)." },
      ],
      pyqExampleId: "bd752109-cf02-4096-a79d-3d25d4e1d534",
      traps: [
        {
          title: "Adding the remainder instead of the gap",
          body: "To reach the next multiple you add the divisor minus the remainder. Adding the remainder itself overshoots or falls short: with \\(650 = 30 \\times 21 + 20\\), you add 10, not 20.",
        },
        {
          title: "Landing on a multiple with the wrong number of digits",
          body: "For the smallest 5-digit multiple, start from 10000, not from 9999. A multiple just below 10000 has only four digits, so check the digit count of your answer before you mark it.",
        },
      ],
    },
  ],
};
