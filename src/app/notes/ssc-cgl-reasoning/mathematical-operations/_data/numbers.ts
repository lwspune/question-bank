import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_RMO_NUMBERS_NOTE: SubtopicNote = {
  subtopicName: "Interchanging Signs and Numbers",
  title: "Interchanging Signs and Numbers",
  oneLineDefinition:
    "Here numbers move as well as signs. Put each option's two numbers in each other's places, swap its two signs too if it names any, and check the equation.",
  whyItMatters:
    "Twenty-seven questions in the bank, every one MODERATE: ten swap two numbers only, fourteen swap two numbers and two signs, and three apply a stated swap to four equations. A division that must come out whole usually names the right pair before you calculate.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscrmonu-numbers",
      name: "Swapping two numbers",
      intuition:
        "The signs stay where they are and two numbers trade places. A number that ends up after a ÷ has to divide what comes before it, and that one fact rules out most options.",
      definition:
        "- Swap whole numbers, never digits: 25 and 4 trade places, and 25 does not turn into 52.\n" +
        "- Work out the printed left side first. The gap to the right side shows roughly how big the change must be.\n" +
        "- If one of the two numbers is the right side, the target changes as well.\n" +
        "- Fast route: after each swap, look at every ÷. If the divisor does not divide the number before it, and no later × clears the fraction, that option is out (when the target is a whole number).\n" +
        "- Check the option that survives in full.",
      authoredExample: {
        prompt:
          "Which two numbers should be interchanged to make \\(60 \\div 3 + 5 \\times 6 - 12 = 18\\) correct? (a) 3 and 6 (b) 5 and 12 (c) 60 and 12 (d) 3 and 5",
        steps: [
          "As printed: \\(20 + 30 - 12 = 38\\). The value must fall by 20.",
          "(a) \\(60 \\div 6 + 5 \\times 3 - 12 = 10 + 15 - 12 = 13\\). (b) \\(20 + 72 - 5 = 87\\). (c) \\(12 \\div 3 + 30 - 60 = -26\\).",
          "(d) \\(60 \\div 5 + 3 \\times 6 - 12 = 12 + 18 - 12 = 18\\). Correct.",
        ],
        answer: "(d) 3 and 5",
      },
      selfCheckExample: {
        prompt:
          "Which two numbers should be interchanged to make \\(14 \\times 3 - 48 \\div 6 + 2 = 70\\) correct? (a) 3 and 2 (b) 6 and 2 (c) 48 and 14 (d) 3 and 6",
        steps: [
          "As printed: \\(42 - 8 + 2 = 36\\), so the value must almost double.",
          "(c) leaves \\(14 \\div 6\\), a fraction nothing clears: out. (a) gives 23 and (b) gives 24.",
          "(d) \\(14 \\times 6 - 48 \\div 3 + 2 = 84 - 16 + 2 = 70\\). Correct.",
        ],
        answer: "(d) 3 and 6",
      },
      practiceSet: [
        { prompt: "Which two numbers should be swapped to make \\(12 \\div 4 + 3 = 8\\) correct?", answer: "4 and 3", method: "\\(12 \\div 3 + 4 = 8\\)." },
        { prompt: "Which two numbers should be swapped to make \\(2 \\times 9 - 5 = 43\\) correct?", answer: "2 and 5", method: "\\(5 \\times 9 - 2 = 43\\)." },
        { prompt: "Which two numbers should be swapped to make \\(8 \\div 32 + 6 = 10\\) correct?", answer: "8 and 32", method: "\\(32 \\div 8 + 6 = 10\\)." },
        { prompt: "Which two numbers should be swapped to make \\(10 + 3 \\times 4 = 34\\) correct?", answer: "10 and 4", method: "\\(4 + 3 \\times 10 = 34\\)." },
      ],
      pyqExampleId: "624db271-5c41-4ce9-9f3e-76b96abfcb90",
      traps: [
        {
          title: "Swapping digits",
          body:
            "‘Numbers (not digits)’ means whole numbers trade places. 34 stays 34; it never becomes 43.",
        },
        {
          title: "Forgetting the right side can move",
          body:
            "When one of the two numbers is the one after the = sign, the swap changes the target too. Check the new left side against the new right side.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrmonu-both",
      name: "Swapping two numbers and two signs",
      intuition:
        "Two moves at once: two numbers trade places and two signs trade places. The moves do not affect each other, so make both, then calculate.",
      definition:
        "- Copy the row with the two numbers in each other's places, then swap the two signs in that copy. Doing the signs first gives the same row.\n" +
        "- Work out the new row in BODMAS order.\n" +
        "- Fast route: options often share the pair of signs or the pair of numbers. Find what differs between them and test that first.\n" +
        "- A division in the new row that leaves a fraction no later step clears rules the option out when the target is whole.",
      authoredExample: {
        prompt:
          "Which interchange makes \\(8 + 24 \\div 3 - 6 \\times 4 = 20\\) correct? (a) 6 and 24, ÷ and × (b) 3 and 4, ÷ and × (c) 8 and 6, + and − (d) 24 and 4, − and ×",
        steps: [
          "(a) Numbers: \\(8 + 6 \\div 3 - 24 \\times 4\\). Signs: \\(8 + 6 \\times 3 - 24 \\div 4 = 8 + 18 - 6 = 20\\). Correct.",
          "(b) shares the signs with (a): \\(8 + 24 \\times 4 - 6 \\div 3 = 102\\).",
          "(c) \\(6 - 24 \\div 3 + 8 \\times 4 = 30\\). (d) \\(8 + 4 \\div 3 \\times 6 - 24 = -8\\).",
        ],
        answer: "(a) 6 and 24, ÷ and ×",
      },
      selfCheckExample: {
        prompt:
          "Which interchange makes \\(50 + 9 \\times 6 - 36 \\div 7 = 12\\) correct? (a) 6 and 7, + and − (b) 9 and 36, × and ÷ (c) 9 and 7, + and − (d) 50 and 36, + and −",
        steps: [
          "(a) \\(50 - 9 \\times 7 + 36 \\div 6 = 50 - 63 + 6 = -7\\). (b) \\(50 + 36 \\div 6 - 9 \\times 7 = -7\\).",
          "(c) \\(50 - 7 \\times 6 + 36 \\div 9 = 50 - 42 + 4 = 12\\). Correct.",
          "(d) leaves \\(50 \\div 7\\), a fraction: out.",
        ],
        answer: "(c) 9 and 7, + and −",
      },
      practiceSet: [
        { prompt: "Swap 6 and 9, and the signs + and ×, in \\(6 + 2 \\times 9\\). What is the value?", answer: "24", method: "\\(9 + 2 \\times 6\\) becomes \\(9 \\times 2 + 6\\)." },
        { prompt: "Swap 2 and 8, and the signs ÷ and −, in \\(2 \\div 4 - 8\\). What is the value?", answer: "6", method: "\\(8 \\div 4 - 2\\) becomes \\(8 - 4 \\div 2\\)." },
        { prompt: "Swap 10 and 2, and the signs + and −, in \\(10 + 6 - 2 = 14\\). Is it now correct?", answer: "No: the left side is 6", method: "\\(2 - 6 + 10 = 6\\)." },
        { prompt: "Swap 4 and 12, and the signs × and ÷, in \\(4 \\times 2 \\div 12 = 24\\). Is it now correct?", answer: "Yes", method: "\\(12 \\div 2 \\times 4 = 24\\)." },
      ],
      pyqExampleId: "57add7c1-f224-47e9-b76d-be33a842d1f4",
      traps: [
        {
          title: "Making only one of the two moves",
          body:
            "An option that names two numbers and two signs needs both swaps. Testing the numbers alone, or the signs alone, checks a different equation.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrmonu-given-swap",
      name: "A stated swap applied to four equations",
      intuition:
        "Here the stem names the swap, two signs and two numbers, and asks which equation holds after it. Apply that one swap to every option, then check each.",
      definition:
        "- Apply the stated sign swap and the stated number swap to every option, on both sides.\n" +
        "- Keep the brackets where they are; only the signs and numbers inside them change.\n" +
        "- Work out each option and compare it with its right side.",
      authoredExample: {
        prompt:
          "After interchanging − and ÷ and the numbers 2 and 6, which equation holds? (a) \\((12 - 6) \\div 2 = 4\\) (b) \\((24 - 2) \\div 6 = 3\\) (c) \\((18 - 2) \\div 6 = 1\\) (d) \\((30 - 6) \\div 2 = 3\\)",
        steps: [
          "(a) Numbers: \\((12 - 2) \\div 6\\). Signs: \\((12 \\div 2) - 6 = 0\\), not 4.",
          "(b) \\((24 \\div 6) - 2 = 2\\), not 3.",
          "(c) \\((18 \\div 6) - 2 = 1\\). It holds.",
          "(d) \\((30 \\div 2) - 6 = 9\\), not 3.",
        ],
        answer: "(c)",
      },
      selfCheckExample: {
        prompt:
          "After interchanging + and × and the numbers 4 and 10, which equation holds? (a) \\((4 + 2) \\times 10 = 22\\) (b) \\((10 + 3) \\times 4 = 22\\) (c) \\((4 + 5) \\times 10 = 50\\)",
        steps: [
          "(a) \\((10 \\times 2) + 4 = 24\\), not 22.",
          "(b) \\((4 \\times 3) + 10 = 22\\). It holds.",
          "(c) \\((10 \\times 5) + 4 = 54\\), not 50.",
        ],
        answer: "(b)",
      },
      practiceSet: [
        { prompt: "After interchanging + and × only, what is \\((2 + 7) \\times 3\\)?", answer: "17", method: "\\((2 \\times 7) + 3\\)." },
        { prompt: "After interchanging − and ÷ only, what is \\((20 - 5) \\div 3\\)?", answer: "1", method: "\\((20 \\div 5) - 3\\)." },
        { prompt: "After interchanging the numbers 4 and 8 only, is \\(4 \\div 2 + 1 = 5\\) true?", answer: "Yes", method: "\\(8 \\div 2 + 1 = 5\\)." },
        { prompt: "After interchanging + and × and the numbers 3 and 5, what is \\((3 + 2) \\times 5\\)?", answer: "13", method: "\\((5 \\times 2) + 3\\)." },
      ],
      pyqExampleId: "4c9643ab-a10f-428a-9577-25353418c8db",
      traps: [
        {
          title: "Moving the brackets",
          body:
            "The brackets stay in place. After + and × are interchanged, \\((2 + 7) \\times 3\\) reads \\((2 \\times 7) + 3 = 17\\), not \\(2 \\times (7 + 3) = 20\\).",
        },
      ],
    },
  ],
};
