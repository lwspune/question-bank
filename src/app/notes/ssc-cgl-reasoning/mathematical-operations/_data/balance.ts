import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_RMO_BALANCE_NOTE: SubtopicNote = {
  subtopicName: "Signs to Balance an Equation",
  title: "Signs to Balance an Equation",
  oneLineDefinition:
    "The signs are missing from a row of numbers. Put each option's signs into the gaps in order and keep the one that makes both sides equal.",
  whyItMatters:
    "Thirty-six questions in the bank, 19 EASY and 17 MODERATE, and 30 of them come from the 2023 shifts. Four sign orders are offered and exactly one balances, so the skill is ruling the other three out fast and then checking the last one in full.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscrmoba-given",
      name: "Filling the gaps when the = sign is fixed",
      intuition:
        "When the = sign is already in its place (printed, or last in every option), the right side is one fixed number. Drop each option's signs into the gaps from left to right and see which left side reaches it.",
      definition:
        "- The first sign of the option goes into the first gap, the second into the second, and so on.\n" +
        "- Work out the left side of each option in BODMAS order.\n" +
        "- Fast routes, in this order:\n" +
        "- **Size**: a × between two large numbers overshoots a small target; a ÷ shrinks a big number. Compare with the target before you calculate.\n" +
        "- **Whole numbers**: if a division leaves a fraction that no later × clears, and the target is whole, the option is out.\n" +
        "- **Last digit**: when an option leaves only + and −, the last digit of the result must match the target's.\n" +
        "- A shortcut only removes options. Check the survivor in full before you mark it.",
      authoredExample: {
        prompt:
          "Choose the signs that replace the * signs, in order, to balance \\(45 * 9 * 4 * 6 = 26\\). (a) \\(\\div, \\times, +\\) (b) \\(+, \\times, -\\) (c) \\(\\div, \\times, -\\) (d) \\(-, \\div, +\\)",
        steps: [
          "Size: (b) adds \\(9 \\times 4 = 36\\) to 45, far above 26. Out.",
          "Whole numbers: (d) leaves \\(9 \\div 4 = 2.25\\) with nothing after it to clear the quarter. Out.",
          "(a) and (c) both start \\(45 \\div 9 \\times 4 = 20\\). Then (a) gives \\(20 + 6 = 26\\) and (c) gives \\(20 - 6 = 14\\).",
        ],
        answer: "(a) \\(\\div, \\times, +\\)",
      },
      selfCheckExample: {
        prompt:
          "Choose the signs that replace the * signs, in order, to balance \\(12 * 6 * 3 * 7 = 17\\). (a) \\(+, \\div, -\\) (b) \\(\\times, \\div, +\\) (c) \\(+, \\times, -\\) (d) \\(-, \\div, +\\)",
        steps: [
          "(a) \\(12 + 2 - 7 = 7\\). (b) \\(72 \\div 3 + 7 = 31\\). (c) \\(12 + 18 - 7 = 23\\).",
          "(d) \\(12 - 6 \\div 3 + 7 = 12 - 2 + 7 = 17\\). It balances.",
        ],
        answer: "(d) \\(-, \\div, +\\)",
      },
      practiceSet: [
        { prompt: "Which signs, in order, balance \\(8 * 3 * 5 = 29\\): \\(\\times, +\\) or \\(+, \\times\\)?", answer: "\\(\\times, +\\)", method: "\\(8 \\times 3 + 5 = 29\\); the other gives \\(8 + 15 = 23\\)." },
        { prompt: "Which signs, in order, balance \\(20 * 4 * 6 = 30\\): \\(\\div, \\times\\) or \\(\\times, \\div\\)?", answer: "\\(\\div, \\times\\)", method: "\\(20 \\div 4 \\times 6 = 30\\)." },
        { prompt: "Which signs, in order, balance \\(15 * 5 * 2 = 12\\): \\(-, +\\) or \\(+, -\\)?", answer: "\\(-, +\\)", method: "\\(15 - 5 + 2 = 12\\); the other gives 18." },
        { prompt: "Which signs, in order, balance \\(9 * 7 * 2 = 61\\): \\(\\times, -\\) or \\(+, \\times\\)?", answer: "\\(\\times, -\\)", method: "\\(63 - 2 = 61\\); the other gives \\(9 + 14 = 23\\)." },
      ],
      pyqExampleId: "8ffaa69e-c41d-4b64-94b0-3cb00c9b9eca",
      traps: [
        {
          title: "Filling the gaps out of order",
          body:
            "The option's signs are read left to right into the gaps left to right. Putting the first sign of the option into any other gap tests a different equation.",
        },
        {
          title: "Calling a fraction a dead end too early",
          body:
            "\\(16 \\div 64 \\times 8 = 0.25 \\times 8 = 2\\). A quotient below 1 can be multiplied back to a whole number, so finish the block before you rule an option out.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrmoba-equals",
      name: "When the = sign is one of the signs to place",
      intuition:
        "Now the = sign moves from option to option, so each option cuts the row at a different place. Work out the two sides of each option on their own and compare them.",
      definition:
        "- Put the option's signs in. The = sign splits the row into a left side and a right side.\n" +
        "- Work out each side by itself in BODMAS order. Nothing crosses the = sign.\n" +
        "- Fast route: work out the shorter side of each option first. It is quick, and it tells you the number the longer side has to reach.\n" +
        "- If two options put the = sign in the same place, their left sides may match; compare only their right sides.",
      authoredExample: {
        prompt:
          "Choose the signs that replace the * signs, in order, to balance \\(24 * 6 * 3 * 5 * 7 * 1\\). (a) \\(\\div, \\times, =, +, \\times\\) (b) \\(\\div, \\times, +, =, \\times\\) (c) \\(\\times, \\div, =, +, -\\) (d) \\(-, \\div, \\times, =, +\\)",
        steps: [
          "(a) Left: \\(24 \\div 6 \\times 3 = 12\\). Right: \\(5 + 7 \\times 1 = 12\\). Equal.",
          "(b) Left: \\(12 + 5 = 17\\). Right: \\(7 \\times 1 = 7\\). Not equal.",
          "(c) Left: \\(24 \\times 6 \\div 3 = 48\\). Right: \\(5 + 7 - 1 = 11\\). Not equal.",
          "(d) Left: \\(24 - 6 \\div 3 \\times 5 = 24 - 10 = 14\\). Right: \\(7 + 1 = 8\\). Not equal.",
        ],
        answer: "(a) \\(\\div, \\times, =, +, \\times\\)",
      },
      selfCheckExample: {
        prompt:
          "Choose the signs that replace the * signs, in order, to balance \\(50 * 5 * 2 * 4 * 4 * 4\\). (a) \\(-, \\times, =, \\times, -\\) (b) \\(\\times, \\div, =, +, \\times\\) (c) \\(\\div, \\times, =, \\times, +\\) (d) \\(\\div, +, =, -, \\times\\)",
        steps: [
          "(a) \\(50 - 10 = 40\\) against \\(16 - 4 = 12\\). (b) \\(250 \\div 2 = 125\\) against \\(4 + 16 = 20\\).",
          "(c) \\(50 \\div 5 \\times 2 = 20\\) against \\(4 \\times 4 + 4 = 20\\). Equal.",
          "(d) \\(10 + 2 = 12\\) against \\(4 - 16 = -12\\).",
        ],
        answer: "(c) \\(\\div, \\times, =, \\times, +\\)",
      },
      practiceSet: [
        { prompt: "Which order balances \\(6 * 3 * 2 * 9\\): \\(\\times, =, +\\) or \\(\\times, \\div, =\\)?", answer: "\\(\\times, \\div, =\\)", method: "\\(6 \\times 3 \\div 2 = 9\\); the other gives 18 against 11." },
        { prompt: "Which order balances \\(10 * 2 * 9 * 4\\): \\(+, =, \\times\\) or \\(\\div, =, -\\)?", answer: "\\(\\div, =, -\\)", method: "\\(10 \\div 2 = 5\\) and \\(9 - 4 = 5\\)." },
        { prompt: "Which order balances \\(4 * 9 * 6 * 6\\): \\(\\times, =, \\times\\) or \\(+, =, \\times\\)?", answer: "\\(\\times, =, \\times\\)", method: "\\(36 = 36\\); the other gives 13 against 36." },
        { prompt: "Place \\(+\\) and \\(=\\) in that order to balance \\(7 * 5 * 12\\). Does it balance?", answer: "Yes: \\(7 + 5 = 12\\)" },
      ],
      pyqExampleId: "26d07d7d-3d03-4872-819c-1444c85c1d48",
      traps: [
        {
          title: "Carrying a sign across the = sign",
          body:
            "Each side is worked out alone. In \\(12 = 5 + 7 \\times 1\\) the multiplication belongs to the right side only, and a sign just before the = sign belongs to the left side.",
        },
        {
          title: "Assuming the last number is the right side",
          body:
            "When the = sign is among the signs to place, the right side can be several numbers long. Find where the option puts the = sign before you calculate.",
        },
      ],
    },
  ],
};
