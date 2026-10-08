import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_LOG_SPA_REFLECTIONS_NOTE: SubtopicNote = {
  subtopicName: "Reflections and Rotations",
  title: "Mirror Images, Half Turns and Folded Paper",
  oneLineDefinition:
    "A mirror or a half turn changes both each symbol and the order of the symbols; folding and punching paper is the same idea applied once per fold.",
  whyItMatters:
    "The Cambridge papers asked about digital clock displays turned upside down (2013, 2021), a number plate seen in a mirror (2015), a word that reads the same from both sides of a sign (2021) and paper that is folded, cut and opened out (2016, 2020).",
  concepts: [
    {
      kind: "reference" as const,
      slug: "imat-spa-mirror-digits",
      name: "Letters and digits under mirrors and half turns",
      intuition:
        "A mirror does two things at once: it flips each symbol, and it reverses the order of the symbols in a line. A half turn (turning the object upside down) also reverses the order. So read the transformed line from the other end, and then fix each symbol in turn.",
      definition:
        "- A **vertical mirror** (a looking-glass beside the object) swaps left and right. It **reverses the order** of characters in a line.\n" +
        "- A **horizontal mirror** (a reflection in still water) swaps top and bottom. The order of characters stays the same.\n" +
        "- A **half turn** (rotation by 180°, \"upside down\") swaps both. It **reverses the order** too.\n" +
        "- A symbol looks the same after the change only if it has the matching symmetry. On a **seven-segment display** (the digits of a digital clock), check each digit in the table.",
      table: {
        columns: ["Change", "Order of characters", "Capital letters that look the same", "Seven-segment digits"],
        rows: [
          {
            cells: [
              "Mirror on a vertical line",
              "Reversed",
              "A H I M O T U V W X Y",
              "0, 1 and 8 stay; 2 and 5 swap; the others are not digits",
            ],
          },
          {
            cells: [
              "Mirror on a horizontal line",
              "Unchanged",
              "B C D E H I K O X",
              "0, 1, 3 and 8 stay; 2 and 5 swap; the others are not digits",
            ],
          },
          {
            cells: [
              "Half turn (180°)",
              "Reversed",
              "H I N O S X Z",
              "0, 1, 2, 5 and 8 stay; 6 and 9 swap; 3, 4 and 7 are not digits",
            ],
          },
        ],
        caption: "Letters assume plain capitals with no serifs. A seven-segment 1 moves to the other side of its space but still reads as 1.",
      },
      selfCheckExample: {
        prompt:
          "A 24-hour digital clock with seven-segment digits is seen in a mirror on the wall. In the mirror it appears to show 15:20. What is the real time?",
        options: ["02:51", "12:50", "20:15", "05:21", "21:51"],
        steps: [
          "A mirror reverses the order of the characters: read 15:20 from the right to get 0, 2, :, 5, 1.",
          "Then mirror each digit: 0 stays 0, 2 becomes 5, 5 becomes 2, 1 stays 1. The real time is 05:21.",
          "Check: 05:21 in a mirror reverses to 1, 2, :, 5, 0 and the digits become 1, 5, :, 2, 0, which is 15:20.",
          "A reverses the order but forgets to mirror the digits. B mirrors the digits but keeps the order. C swaps the two halves.",
        ],
        answer: "(D) 05:21",
      },
      practiceSet: [
        { prompt: "What does the word CHOICE look like reflected in still water?", answer: "Exactly the same", method: "Every letter has a horizontal line of symmetry, and the order is unchanged" },
        { prompt: "The number 1986 is shown on a seven-segment display and turned upside down. What does it read?", answer: "9861", method: "Reverse the order, then 6 and 9 swap" },
        { prompt: "Which seven-segment digits become a different digit when turned upside down?", answer: "6 and 9", method: "0, 1, 2, 5 and 8 look the same" },
        { prompt: "A word made only of the letters A, H, M, O, T, U stays readable in a vertical mirror. What else must be true for it to read the same?", answer: "It must be a palindrome (the same backwards)", method: "The mirror reverses the order" },
      ],
      traps: [
        {
          title: "A mirror reverses the order, not only the symbols",
          body: "Mirroring each digit in place, without reading the line from the other end, gives a wrong answer that looks convincing. A vertical mirror and a half turn both reverse the order; only a horizontal mirror keeps it.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-spa-folding",
      name: "Folding, punching and unfolding paper",
      intuition:
        "Each fold doubles the number of layers, so one punch through the folded paper makes one hole per layer. Unfolding is reflecting: each hole appears again as its mirror image across the fold line. Undo the folds in reverse order, reflecting every hole you have so far.",
      definition:
        "- After \\(f\\) folds in half, the paper has \\(2^f\\) layers. A punch away from every fold line makes \\(2^f\\) holes.\n" +
        "- To unfold, reflect every hole across the **last** fold line first, then the one before, and so on.\n" +
        "- Holes are **symmetric** about every fold line, so the unfolded pattern has a line of symmetry along each fold.\n" +
        "- A cut **on** a fold line opens into a single hole, twice as wide, not two holes.",
      formula: {
        label: "Holes after folding and punching",
        latex: "\\text{holes} = \\text{punches} \\times 2^{f}",
        symbols: [{ symbol: "\\(f\\)", meaning: "number of folds in half (punches not on a fold line)" }],
      },
      authoredExample: {
        prompt:
          "A square sheet 8 cm wide is folded in half by laying the right half over the left half. It is then folded again by laying the bottom half up over the top half. A hole is punched 1 cm from the left edge and 1 cm from the top edge of the folded square. Where are the holes after unfolding?",
        steps: [
          "The folded square is the top-left 4 cm by 4 cm quarter of the sheet, 4 layers thick, so there will be 4 holes.",
          "Undo the second fold (the horizontal line 4 cm from the top): the hole 1 cm from the top reflects to 7 cm from the top.",
          "Undo the first fold (the vertical line 4 cm from the left): both holes reflect from 1 cm to 7 cm from the left.",
        ],
        answer: "Four holes, at 1 cm and 7 cm from the left, each at 1 cm and 7 cm from the top (one near each corner)",
      },
      selfCheckExample: {
        prompt:
          "A long paper strip is folded in half three times. A single hole is punched through all the layers, away from every fold. How many holes are there when the strip is opened out?",
        options: ["3", "6", "8", "9", "16"],
        steps: [
          "Each fold doubles the layers: \\(2^3 = 8\\) layers.",
          "One punch through 8 layers makes 8 holes.",
          "A counts one hole per fold. B doubles the number of folds. E uses one fold too many.",
        ],
        answer: "(C) 8",
      },
      practiceSet: [
        { prompt: "A sheet is folded in half twice and punched twice, away from the folds. How many holes?", answer: "8", method: "\\(2 \\times 2^2\\)" },
        { prompt: "A sheet folded once has a hole punched 2 cm from the fold. How far apart are the two holes after unfolding?", answer: "4 cm", method: "Each hole is 2 cm from the fold line" },
        { prompt: "A half circle is cut out of the folded edge of a sheet folded once. What shape is the hole when unfolded?", answer: "One full circle", method: "A cut on the fold opens into a single shape" },
      ],
      traps: [
        {
          title: "A cut on the fold line makes one hole",
          body: "When the cut touches the fold, the two halves of the hole are joined along that line and open into one shape, twice as wide. Counting it as two separate holes is wrong.",
        },
      ],
    },
  ],
};
