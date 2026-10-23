import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_RMO_HIDDEN_NOTE: SubtopicNote = {
  subtopicName: "Hidden Operation Rules",
  title: "Hidden Operation Rules",
  oneLineDefinition:
    "A made-up symbol stands for a rule. Either the stem states the rule, or it shows worked examples and you find the rule, test it on every example, and only then use it.",
  whyItMatters:
    "Fifty-six questions in the bank, 33 EASY and 23 MODERATE, and 49 of them come from the 2025 shifts. Most show two examples of a symbol and ask for a third; a few state the rule, ask for the odd one out, or give chains of operations on sets of numbers.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscrmohi-defined",
      name: "A rule you are given",
      intuition:
        "Sometimes the stem spells the rule out, such as \\(a \\% b = a + b + ab\\). Then there is nothing to find: put each number in its place and work it out.",
      definition:
        "- The first number is \\(a\\) and the second is \\(b\\). Write them into the rule.\n" +
        "- Work out the result in BODMAS order.\n" +
        "- If the stem asks which pair gives a stated value, put each option's pair into the rule and keep the one that matches.\n" +
        "- A rule need not give the same answer both ways round: with \\(a \\& b = ab - a\\), \\(4 \\& 6 = 20\\) but \\(6 \\& 4 = 18\\).",
      authoredExample: {
        prompt: "If \\(a \\# b = 2a + b^2\\), find \\(5 \\# 3\\).",
        steps: ["Here \\(a = 5\\) and \\(b = 3\\).", "\\(2 \\times 5 + 3^2 = 10 + 9 = 19\\)."],
        answer: "19",
      },
      selfCheckExample: {
        prompt: "If \\(a \\# b = a^2 - 3b\\), which pair gives \\(a \\# b = 13\\): (4, 1), (5, 3) or (6, 7)?",
        steps: [
          "(4, 1): \\(16 - 3 = 13\\).",
          "(5, 3): \\(25 - 9 = 16\\). (6, 7): \\(36 - 21 = 15\\).",
        ],
        answer: "(4, 1)",
      },
      practiceSet: [
        { prompt: "If \\(a * b = a + 3b\\), find \\(4 * 2\\).", answer: "10" },
        { prompt: "If \\(a @ b = ab + b\\), find \\(6 @ 2\\).", answer: "14" },
        { prompt: "If \\(a @ b = (a - b)^2\\), find \\(9 @ 4\\).", answer: "25" },
        { prompt: "If \\(a @ b = a^2 + b\\), which pair gives 30: (5, 5) or (4, 10)?", answer: "(5, 5)", method: "\\(25 + 5 = 30\\); the other gives 26." },
      ],
      pyqExampleId: "699b5b95-be42-4c6b-825c-13314b095537",
      traps: [
        {
          title: "Putting the numbers in the wrong places",
          body:
            "The first number is \\(a\\). With \\(a @ b = a - 2b\\), \\(9 @ 2 = 5\\) but \\(2 @ 9 = -16\\), so keep the order the question prints.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrmohi-rule",
      name: "Finding the rule from examples",
      intuition:
        "Two or three examples of a made-up symbol are a puzzle with a short list of usual answers. Try the simple rules on the first example, keep one that fits, and test it on every other example before you use it.",
      definition:
        "Try the rules in this order on the first example:\n" +
        "- **One operation**: \\(a + b\\), \\(a \\times b\\), \\(a - b\\), \\(a \\div b\\).\n" +
        "- **Squares and powers**: \\(a^2 + b^2\\), \\((a + b)^2\\), \\(a^b\\), \\(a^2 + b\\), \\(a^2 - b\\).\n" +
        "- **Mixed**: \\(2(a + b)\\), \\(2ab\\), \\(ab + a + b\\), \\(ab + a\\), \\(ab + b\\), \\(a(a + b)\\), \\((a + b) \\times b\\), \\((a - b)^3\\).\n" +
        "- A result next to a square or cube points to one: 50 is \\(7^2 + 1\\), 343 is \\(7^3\\).\n" +
        "- **Test the rule on every example.** A rule that fits one example is only a guess.\n" +
        "- When two rules fit every example, work out both. If they agree, the answer is safe. If they land on two different options, the question is ambiguous; prefer the rule that uses both numbers.",
      formula: {
        label: "Common hidden rules",
        latex: "a^2 + b^2 \\qquad (a + b)^2 \\qquad a^b \\qquad a^2 + b \\qquad ab + a + b = (a + 1)(b + 1) - 1",
        symbols: [
          { symbol: "\\(a\\)", meaning: "the number before the symbol" },
          { symbol: "\\(b\\)", meaning: "the number after the symbol" },
        ],
      },
      authoredExample: {
        prompt: "If \\(6 @ 1 = 37\\) and \\(2 @ 4 = 20\\), find \\(3 @ 5\\).",
        steps: [
          "One operation on the first example: \\(6 + 1 = 7\\), \\(6 \\times 1 = 6\\). Neither is 37.",
          "Squares: \\(6^2 + 1^2 = 37\\). It fits. \\((6 + 1)^2 = 49\\) does not.",
          "Test on the second example: \\(2^2 + 4^2 = 4 + 16 = 20\\). It fits again.",
          "So \\(3 @ 5 = 9 + 25 = 34\\).",
        ],
        answer: "34",
      },
      selfCheckExample: {
        prompt: "If \\(7 @ 2 = 47\\) and \\(5 @ 3 = 22\\), find \\(4 @ 6\\).",
        steps: [
          "47 is 2 less than \\(7^2 = 49\\), and 2 is the second number: try \\(a^2 - b\\).",
          "Test: \\(5^2 - 3 = 22\\). It fits.",
          "\\(4 @ 6 = 16 - 6 = 10\\).",
        ],
        answer: "10",
      },
      practiceSet: [
        { prompt: "If \\(3 \\# 2 = 9\\) and \\(4 \\# 3 = 64\\), find \\(2 \\# 5\\).", answer: "32", method: "\\(a^b\\): \\(2^5\\)." },
        { prompt: "If \\(5 \\# 4 = 81\\) and \\(2 \\# 6 = 64\\), find \\(3 \\# 4\\).", answer: "49", method: "\\((a + b)^2\\): \\(7^2\\)." },
        { prompt: "If \\(4 \\# 5 = 29\\) and \\(3 \\# 7 = 31\\), find \\(6 \\# 2\\).", answer: "20", method: "\\(ab + a + b\\), or \\(7 \\times 3 - 1\\)." },
        { prompt: "If \\(8 \\# 3 = 11\\) and \\(5 \\# 9 = 14\\), find \\(7 \\# 6\\).", answer: "13", method: "Plain addition." },
      ],
      pyqExampleId: "d5221d08-34f3-437d-b238-9898ccae0cf3",
      traps: [
        {
          title: "Stopping after one example",
          body:
            "\\(6 @ 2 = 12\\) fits \\(a \\times b\\) and also \\(a + b + 4\\). Only the second example tells them apart, so test every example before you use a rule.",
        },
        {
          title: "Missing a second rule that fits",
          body:
            "\\(6 * 1 = 42\\) and \\(3 * 4 = 21\\) fit both \\(a(a + b)\\) and \\(7a\\), because \\(a + b = 7\\) in each. For \\(5 * 3\\) they give 40 and 35. When two rules fit, work out both before you choose.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrmohi-odd-one",
      name: "The odd one out among four results",
      intuition:
        "Four results of one symbol are printed and three follow the same rule. Find the rule three of them share; the one that breaks it is the answer.",
      definition:
        "- Try the simple rules on each option in turn: +, −, ×, ÷, then the rules from the last concept.\n" +
        "- The rule must fit exactly three options. If it fits all four, or only two, try the next rule.\n" +
        "- Fast route: when all four results are the same number, ask what each pair of numbers does to reach it; the one that needs a different step is out.",
      authoredExample: {
        prompt: "Find the odd one out: (a) \\(9 @ 3 = 12\\) (b) \\(8 @ 6 = 14\\) (c) \\(7 @ 4 = 3\\) (d) \\(5 @ 5 = 10\\)",
        steps: [
          "Try addition: \\(9 + 3 = 12\\), \\(8 + 6 = 14\\), \\(5 + 5 = 10\\). Three fit.",
          "(c): \\(7 + 4 = 11\\), not 3. It follows subtraction instead.",
        ],
        answer: "(c)",
      },
      selfCheckExample: {
        prompt: "Find the odd one out: (a) \\(6 @ 3 = 18\\) (b) \\(4 @ 5 = 20\\) (c) \\(9 @ 2 = 11\\) (d) \\(7 @ 3 = 21\\)",
        steps: ["Multiplication fits (a), (b) and (d).", "(c): \\(9 \\times 2 = 18\\), not 11."],
        answer: "(c)",
      },
      practiceSet: [
        { prompt: "Which is the odd one out: \\(8 @ 2 = 4\\), \\(12 @ 3 = 4\\), \\(10 @ 5 = 5\\)?", answer: "\\(10 @ 5 = 5\\)", method: "Division fits the other two; \\(10 \\div 5 = 2\\)." },
        { prompt: "Which is the odd one out: \\(2 @ 3 = 13\\), \\(1 @ 4 = 17\\), \\(3 @ 3 = 15\\)?", answer: "\\(3 @ 3 = 15\\)", method: "\\(a^2 + b^2\\) gives 13 and 17, but 18 here." },
        { prompt: "Which is the odd one out: \\(5 @ 1 = 12\\), \\(3 @ 3 = 12\\), \\(2 @ 4 = 10\\)?", answer: "\\(2 @ 4 = 10\\)", method: "\\(2(a + b)\\) gives 12 for all three pairs." },
      ],
      pyqExampleId: "b0949a75-5e15-42fb-8df6-886422c670cc",
      traps: [
        {
          title: "Settling for a rule that fits two",
          body:
            "A rule that fits only two of the four options leaves two candidates. Keep trying until one rule fits exactly three.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrmohi-sets",
      name: "Chains of operations on number sets",
      intuition:
        "Each set is a chain: the same steps take the first number to the second, the second to the third, and so on. Read the steps from one set, confirm them on the other, then walk each option through them.",
      definition:
        "- Write the step under each link of the first set: \\(\\times 2\\), \\(+ 10\\), square, and so on.\n" +
        "- Confirm the same steps on the second set. If a step does not match, look for one that depends on the first number, such as ‘take away the first number’.\n" +
        "- Walk each option through the steps. The first wrong step rules it out; options are often built to pass the first step and fail a later one.\n" +
        "- Work on whole numbers only: SSC's note forbids splitting 13 into 1 and 3.",
      authoredExample: {
        prompt:
          "In the sets 6, 18, 13, 26 and 9, 27, 22, 44 the same steps link the numbers. Which follows them: (a) 4, 12, 7, 14 (b) 5, 15, 10, 25 (c) 7, 21, 15, 30 (d) 8, 16, 11, 22?",
        steps: [
          "Steps: \\(6 \\times 3 = 18\\), \\(18 - 5 = 13\\), \\(13 \\times 2 = 26\\). Check: \\(9 \\times 3 = 27\\), \\(27 - 5 = 22\\), \\(22 \\times 2 = 44\\).",
          "(a) \\(4 \\times 3 = 12\\), \\(12 - 5 = 7\\), \\(7 \\times 2 = 14\\). It follows.",
          "(b) fails at the last step (\\(10 \\times 2 = 20\\)), (c) at the second (\\(21 - 5 = 16\\)), (d) at the first (\\(8 \\times 3 = 24\\)).",
        ],
        answer: "(a) 4, 12, 7, 14",
      },
      selfCheckExample: {
        prompt:
          "In the sets 3, 10, 30, 21 and 5, 12, 36, 27 the same steps link the numbers. Which follows them: (a) 6, 13, 39, 31 (b) 4, 11, 33, 24 (c) 2, 9, 18, 9 (d) 8, 15, 45, 35?",
        steps: [
          "Steps: \\(+ 7\\), \\(\\times 3\\), \\(- 9\\). Both sets fit.",
          "(b) \\(4 + 7 = 11\\), \\(11 \\times 3 = 33\\), \\(33 - 9 = 24\\). It follows.",
          "(a) and (d) fail at the last step; (c) fails at the second.",
        ],
        answer: "(b) 4, 11, 33, 24",
      },
      practiceSet: [
        { prompt: "A chain goes \\(\\times 2\\), then \\(+ 7\\). What two numbers follow 9?", answer: "18, then 25" },
        { prompt: "The sets 4, 16, 12 and 6, 36, 32 follow the same two steps. What are they?", answer: "Square, then take away 4" },
        { prompt: "A chain goes square, then \\(- 1\\). Does 7, 49, 48 follow it?", answer: "Yes" },
        { prompt: "A chain goes \\(+ 5\\), then \\(\\times 3\\). Which follows it: 2, 7, 21 or 3, 8, 21?", answer: "2, 7, 21", method: "\\(8 \\times 3 = 24\\), not 21." },
      ],
      pyqExampleId: "3d0b7f47-3997-4336-b17a-2dff1705a310",
      traps: [
        {
          title: "Checking only the first step",
          body:
            "Wrong options usually pass the first step and break at the second or third. Walk every option through every step.",
        },
        {
          title: "Splitting a number into digits",
          body:
            "The steps act on whole numbers. Adding the digits of 13 to get 4 is not allowed in these questions.",
        },
      ],
    },
  ],
};
