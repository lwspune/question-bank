import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_RMO_TWO_SIGNS_NOTE: SubtopicNote = {
  subtopicName: "Interchanging Two Signs",
  title: "Interchanging Two Signs",
  oneLineDefinition:
    "The equation is wrong as printed. Swap the two signs an option names, everywhere they appear, and keep the option that makes both sides equal.",
  whyItMatters:
    "Forty-two questions in the bank, 21 EASY and 21 MODERATE, asked in all three years. Each prints a wrong equation and four pairs of signs; a check of size, or of how far the value must move, usually leaves one pair to test in full.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscrmots-same-level",
      name: "Swapping plus with minus, or times with divide",
      intuition:
        "Swapping + and − leaves every product and quotient as it was. Only the terms that were added are now taken away, and the other way round, so you can work out in advance how far the value will move.",
      definition:
        "- First work out the printed left side and compare it with the right side. The gap tells you what the swap must do.\n" +
        "- A **term** is what follows a + or − sign: a single number or a whole block such as \\(3 \\times 2\\).\n" +
        "- **+ and − swapped**: the term after the + is now taken away and the term after the − is now added. With one of each, the value changes by twice (minus term less plus term).\n" +
        "- **× and ÷ swapped**: the + and − stay; only the blocks change, so work out the new blocks.\n" +
        "- Fast route: when the needed change equals \\(2(m - p)\\), the + and − swap is the answer. It is safe only when the row has exactly one + and one −; with more, rewrite the row in full.",
      formula: {
        label: "Swapping one plus and one minus",
        latex: "\\text{change in value} = 2\\,(m - p)",
        symbols: [
          { symbol: "\\(m\\)", meaning: "the term after the minus sign" },
          { symbol: "\\(p\\)", meaning: "the term after the plus sign" },
        ],
      },
      authoredExample: {
        prompt:
          "Which two signs should be interchanged to make \\(54 \\div 6 + 11 - 3 \\times 2 = 4\\) correct? (a) + and − (b) ÷ and × (c) + and × (d) − and ÷",
        steps: [
          "As printed: \\(9 + 11 - 6 = 14\\). The value must fall by 10.",
          "Fast check for (a): the plus term is 11 and the minus term is \\(3 \\times 2 = 6\\), so the change is \\(2(6 - 11) = -10\\). That is the fall we need.",
          "Full check: \\(54 \\div 6 - 11 + 3 \\times 2 = 9 - 11 + 6 = 4\\). Correct.",
          "For comparison, (c) gives \\(54 \\div 6 \\times 11 - 3 + 2 = 98\\).",
        ],
        answer: "(a) + and −",
      },
      selfCheckExample: {
        prompt:
          "Which two signs should be interchanged to make \\(84 \\times 7 \\div 3 + 10 - 6 = 40\\) correct? (a) × and ÷ (b) + and − (c) ÷ and + (d) × and −",
        steps: [
          "As printed the block is \\(84 \\times 7 \\div 3 = 196\\), far above 40, so the block itself must change: try (a).",
          "\\(84 \\div 7 \\times 3 + 10 - 6 = 36 + 4 = 40\\). Correct.",
        ],
        answer: "(a) × and ÷",
      },
      practiceSet: [
        { prompt: "Which two signs should be swapped to make \\(20 + 6 - 4 = 18\\) correct?", answer: "+ and −", method: "\\(20 - 6 + 4 = 18\\)." },
        { prompt: "Which two signs should be swapped to make \\(32 \\times 4 \\div 2 = 16\\) correct?", answer: "× and ÷", method: "\\(32 \\div 4 \\times 2 = 16\\)." },
        {
          prompt: "A row has one + and one −. As printed it equals 50; the term after the + is 9 and the term after the − is 4. What does it equal after the + and − are swapped?",
          answer: "40",
          method: "\\(50 + 2(4 - 9) = 40\\).",
        },
        { prompt: "Which two signs should be swapped to make \\(15 - 8 + 3 = 20\\) correct?", answer: "+ and −", method: "\\(15 + 8 - 3 = 20\\)." },
      ],
      pyqExampleId: "483b891c-98b8-4b37-b0e7-c5615340adc5",
      traps: [
        {
          title: "Swapping only one of two signs",
          body:
            "If the row has two + signs, both become − when + and − are interchanged. Leaving one of them as + tests a different equation.",
        },
        {
          title: "Using the 2(m − p) check on a longer row",
          body:
            "The check needs exactly one + and one −. With two + signs, each of their terms is now subtracted, so the change is not \\(2(m - p)\\); rewrite the row and work it out.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrmots-cross-level",
      name: "Swaps that change what is done first",
      intuition:
        "When a swap moves a sign across the levels (+ with ×, − with ÷, + with ÷), the blocks change and so does the size of the answer. A quick look at size throws out most wrong pairs before any arithmetic.",
      definition:
        "- Compare the target with the printed left side. Much smaller, or much bigger?\n" +
        "- If the printed row multiplies two large numbers and the target is small, the × must be one of the swapped signs. If a large number is meant to be divided down, the sign next to it must become ÷.\n" +
        "- **Whole-number check**: after the swap, a ÷ must leave a whole number, or a fraction that a later × clears. If neither, and the target is whole, rule the pair out.\n" +
        "- Test the pairs that survive in full, by BODMAS.",
      authoredExample: {
        prompt:
          "Which two signs should be interchanged to make \\(18 \\times 15 + 3 - 9 = 54\\) correct? (a) + and − (b) × and + (c) × and −",
        steps: [
          "As printed: \\(270 + 3 - 9 = 264\\). The target 54 is much smaller, so the \\(18 \\times 15\\) must go: (a) keeps it and is out.",
          "(b): \\(18 + 15 \\times 3 - 9 = 18 + 45 - 9 = 54\\). Correct.",
          "(c) for comparison: \\(18 - 15 + 3 \\times 9 = 30\\).",
        ],
        answer: "(b) × and +",
      },
      selfCheckExample: {
        prompt:
          "Which two signs should be interchanged to make \\(96 - 12 + 4 \\div 3 = 9\\) correct? (a) + and − (b) + and ÷ (c) − and ÷",
        steps: [
          "The target 9 is tiny next to 96, so 96 must be divided: the − next to it has to become ÷. Only (c) does that.",
          "(c): \\(96 \\div 12 + 4 - 3 = 8 + 4 - 3 = 9\\). Correct.",
        ],
        answer: "(c) − and ÷",
      },
      practiceSet: [
        { prompt: "Which two signs should be swapped to make \\(5 \\times 4 + 3 = 17\\) correct?", answer: "× and +", method: "\\(5 + 4 \\times 3 = 17\\)." },
        { prompt: "Which two signs should be swapped to make \\(40 - 8 \\div 2 = 3\\) correct?", answer: "− and ÷", method: "\\(40 \\div 8 - 2 = 3\\)." },
        { prompt: "Which two signs should be swapped to make \\(30 + 6 \\div 2 = 7\\) correct?", answer: "+ and ÷", method: "\\(30 \\div 6 + 2 = 7\\)." },
        { prompt: "Is \\(9 \\div 6 \\times 4\\) a whole number?", answer: "Yes, 6", method: "\\(1.5 \\times 4 = 6\\): the later × clears the half." },
      ],
      pyqExampleId: "351551fa-5025-48d2-842c-0837d47b09df",
      traps: [
        {
          title: "Ruling out a fraction too early",
          body:
            "\\(9 \\div 6\\) is 1.5, but \\(9 \\div 6 \\times 4 = 6\\). Finish the whole block before you say a swap cannot give a whole number.",
        },
        {
          title: "Choosing on size alone",
          body:
            "A size check removes pairs; it does not prove one. Two pairs can both give an answer of about the right size, so work the last one out in full.",
        },
      ],
    },
  ],
};
