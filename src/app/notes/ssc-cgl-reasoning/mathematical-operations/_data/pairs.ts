import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_RMO_PAIRS_NOTE: SubtopicNote = {
  subtopicName: "Value After Interchanging Signs",
  title: "Value After Interchanging Signs",
  oneLineDefinition:
    "When two signs are interchanged, each takes the other's place everywhere in the row. Make both swaps at once, then work out the new row in BODMAS order.",
  whyItMatters:
    "Fifty-seven questions in the bank, all EASY, and 56 of them come from the 2024 shifts, where this was the most common Mathematical Operations question. In 45 of them the swaps are + with − and × with ÷; the other 12 move a sign to a different level, which changes what is worked out first.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscrmopa-same-level",
      name: "Plus with minus, times with divide",
      intuition:
        "Swapping + with − and × with ÷ keeps the shape of the row. Wherever there was a product or a quotient there is still one, only turned round, so you work the row block by block as before.",
      definition:
        "- ‘+ and − are interchanged’ means every + becomes − **and** every − becomes +.\n" +
        "- Copy the row once with both swaps made, reading each sign from the printed row.\n" +
        "- Inside a block, keep the left-to-right order: \\(a \\times b \\div c\\) becomes \\(a \\div b \\times c\\), worked from the left.\n" +
        "- Work out each block, then the additions and subtractions from left to right.\n" +
        "- Fast route: the blocks sit in the same places before and after the swap, so mark them on the printed row first. Then only the numbers inside each block, and the + or − in front of it, need rewriting.",
      authoredExample: {
        prompt:
          "What will come in place of ? if ‘+’ and ‘−’ are interchanged and ‘×’ and ‘÷’ are interchanged: \\(63 - 72 \\times 8 \\div 3 + 11 = ?\\)",
        steps: [
          "Rewrite with both swaps: \\(63 + 72 \\div 8 \\times 3 - 11\\).",
          "The block, from the left: \\(72 \\div 8 = 9\\), then \\(9 \\times 3 = 27\\).",
          "\\(63 + 27 - 11 = 79\\).",
        ],
        answer: "79",
      },
      selfCheckExample: {
        prompt:
          "What will come in place of ? if ‘+’ and ‘−’ are interchanged and ‘×’ and ‘÷’ are interchanged: \\(120 \\times 8 - 45 \\div 5 + 14 = ?\\)",
        steps: [
          "Rewrite: \\(120 \\div 8 + 45 \\times 5 - 14\\).",
          "Blocks: \\(120 \\div 8 = 15\\) and \\(45 \\times 5 = 225\\).",
          "\\(15 + 225 - 14 = 226\\).",
        ],
        answer: "226",
      },
      practiceSet: [
        { prompt: "If ‘+’ and ‘−’ are interchanged, find \\(40 - 15 + 9\\).", answer: "46", method: "\\(40 + 15 - 9\\)." },
        { prompt: "If ‘×’ and ‘÷’ are interchanged, find \\(81 \\times 9 \\div 4\\).", answer: "36", method: "\\(81 \\div 9 \\times 4\\)." },
        {
          prompt: "If ‘+’ and ‘−’ are interchanged and ‘×’ and ‘÷’ are interchanged, find \\(25 \\div 4 - 60 \\times 12 + 3\\).",
          answer: "102",
          method: "\\(25 \\times 4 + 60 \\div 12 - 3 = 100 + 5 - 3\\).",
        },
        {
          prompt: "If ‘+’ and ‘−’ are interchanged and ‘×’ and ‘÷’ are interchanged, find \\(18 + 7 \\div 2 - 30\\).",
          answer: "34",
          method: "\\(18 - 7 \\times 2 + 30 = 18 - 14 + 30\\).",
        },
      ],
      pyqExampleId: "c70e823d-31c7-4ac2-8cd0-f2b6e45a51f2",
      traps: [
        {
          title: "Swapping in one direction only",
          body:
            "Interchanged means both ways. If every + becomes − but the − signs are left alone, two terms change instead of all of them and the total is wrong.",
        },
        {
          title: "Changing the order inside a block",
          body:
            "\\(a \\times b \\div c\\) becomes \\(a \\div b \\times c\\), worked from the left. Dividing \\(a\\) by the product \\(b \\times c\\) gives a different number.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrmopa-cross-level",
      name: "Swaps across the levels",
      intuition:
        "When + is swapped with × (or − with ÷, or + with ÷), the blocks move. A sum turns into a product and a product into a sum, so the row has a new shape. Rewrite it in full before you work anything out.",
      definition:
        "- Rewrite every sign from the printed row, using both pairs.\n" +
        "- Then find the new blocks of × and ÷ and work them first; the old products mean nothing now.\n" +
        "- A one-way list (‘×’ is replaced by ‘÷’, ‘÷’ by ‘+’, ‘+’ by ‘×’) is not a pair of swaps: follow each arrow once. A sign the list leaves alone stays as it is.\n" +
        "- A fraction inside a block is not a mistake: \\(27 \\div 6 \\times 4 = 4.5 \\times 4 = 18\\). Only the final value has to match an option.",
      authoredExample: {
        prompt:
          "What will come in place of ? if ‘+’ and ‘÷’ are interchanged and ‘−’ and ‘×’ are interchanged: \\(56 + 7 - 3 \\div 9 \\times 4 = ?\\)",
        steps: [
          "Rewrite: + becomes ÷, − becomes ×, ÷ becomes +, × becomes −. The row is \\(56 \\div 7 \\times 3 + 9 - 4\\).",
          "The new block: \\(56 \\div 7 = 8\\), then \\(8 \\times 3 = 24\\).",
          "\\(24 + 9 - 4 = 29\\).",
        ],
        answer: "29",
      },
      selfCheckExample: {
        prompt:
          "What will come in place of ? if ‘×’ is replaced by ‘÷’, ‘÷’ by ‘−’, ‘−’ by ‘+’ and ‘+’ by ‘×’: \\(64 \\times 8 + 5 - 9 \\div 2 = ?\\)",
        steps: [
          "Follow each arrow once: \\(64 \\div 8 \\times 5 + 9 - 2\\).",
          "\\(64 \\div 8 = 8\\), then \\(8 \\times 5 = 40\\).",
          "\\(40 + 9 - 2 = 47\\).",
        ],
        answer: "47",
      },
      practiceSet: [
        { prompt: "If ‘+’ and ‘×’ are interchanged, find \\(6 + 5 \\times 4\\).", answer: "34", method: "\\(6 \\times 5 + 4\\)." },
        { prompt: "If ‘−’ and ‘÷’ are interchanged, find \\(48 - 6 \\div 3\\).", answer: "5", method: "\\(48 \\div 6 - 3\\)." },
        { prompt: "If ‘+’ and ‘÷’ are interchanged, find \\(90 + 10 \\div 7\\).", answer: "16", method: "\\(90 \\div 10 + 7\\)." },
        {
          prompt: "If ‘×’ is replaced by ‘+’, ‘+’ by ‘−’ and ‘−’ by ‘×’, find \\(20 \\times 4 + 3 - 2\\).",
          answer: "18",
          method: "\\(20 + 4 - 3 \\times 2 = 24 - 6\\).",
        },
      ],
      pyqExampleId: "9a9b2c00-cc9b-4be7-aa9a-40bd19582262",
      traps: [
        {
          title: "Keeping the old products",
          body:
            "After + and × are interchanged, \\(6 + 5 \\times 4\\) is \\(6 \\times 5 + 4 = 34\\). Working out the printed \\(5 \\times 4\\) first and then swapping the signs gives a wrong total.",
        },
        {
          title: "Treating a one-way list as swaps",
          body:
            "If × is replaced by ÷ and ÷ by +, a ÷ in the row becomes +, not ×. Only the word interchanged means a two-way swap.",
        },
      ],
    },
  ],
};
