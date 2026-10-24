import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_RPF_QUARTER_NOTE: SubtopicNote = {
  subtopicName: "Unfolding a Quarter",
  title: "Unfolding a Quarter",
  oneLineDefinition:
    "A square sheet is folded in half twice, down to one quarter, and cut or punched; opening it mirrors every cut across each fold line in turn, giving a copy in each quarter.",
  whyItMatters:
    "Forty-four questions in the bank, 16 from the 2023 shifts and 28 from the 2024 shifts, all MODERATE but one HARD. Every one is solved by undoing the folds one at a time and mirroring the cuts, and the options differ only in where a copy sits or which way it faces.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscrpfqu-land",
      name: "Where the copies land",
      intuition:
        "Folding a sheet in half twice stacks four layers. A cut through all four makes four holes, one in each quarter, placed like reflections of each other in the two fold lines. A cut that sits on a fold line joins its reflection and opens as one larger shape.",
      definition:
        "1. Find the folded quarter and its two fold edges: the edges that meet at the centre of the sheet.\n" +
        "2. Undo the last fold first. Each cut appears again on the other side of that fold line, at the same distance from it.\n" +
        "3. Undo the first fold. Every cut now on the paper appears again across that fold line.\n" +
        "- **How many:** a cut away from the folds, through k folds, makes \\(2^k\\) copies: 4 after two folds.\n" +
        "- **On a fold:** half a circle cut on a fold line opens into one full circle. A small square cut at the corner where both folds meet opens into one larger square at the centre.\n" +
        "- **Near an outer corner:** a cut near the quarter's outer corner opens into one near each corner of the sheet.",
      formula: {
        label: "Copies after k folds",
        latex: "\\text{copies of a cut away from every fold} = 2^k",
        symbols: [{ symbol: "k", meaning: "the number of folds the cut goes through" }],
      },
      authoredExample: {
        prompt:
          "A square sheet is folded right half onto the left, then top half down, so the folded paper is the bottom-left quarter. One round hole is punched near the quarter's outer bottom-left corner. What does the opened sheet show?",
        steps: [
          "Undo the top-to-bottom fold: a second hole appears near the top-left corner.",
          "Undo the right-to-left fold: both holes appear again on the right side.",
          "Four holes in all, one near each corner of the sheet.",
        ],
        answer: "Four holes, one near each corner",
      },
      selfCheckExample: {
        prompt:
          "A square sheet is folded right half onto the left, then top half down, leaving the bottom-left quarter, whose right edge is the vertical fold. Half a circle is cut on that right edge, halfway up the quarter. What does the opened sheet show?",
        steps: [
          "Undo the top fold: the half circle appears again in the top half, also on the vertical fold.",
          "Undo the vertical fold: each half circle meets its reflection and becomes a full circle.",
        ],
        answer: "Two full circles on the vertical centre line, one in each half",
      },
      practiceSet: [
        { prompt: "A sheet folded twice is punched with 2 holes away from the folds. How many holes does the opened sheet have?", answer: "8" },
        { prompt: "A sheet folded once is punched with 3 holes away from the fold. How many holes does the opened sheet have?", answer: "6" },
        { prompt: "In which order should you undo the folds?", answer: "The last fold first." },
        { prompt: "A small square is cut at the corner where both folds of a quarter meet. What does it become when the sheet is opened?", answer: "One larger square at the centre of the sheet" },
      ],
      pyqExampleId: "386a8a87-8196-49cf-9543-97693dbf1b0b",
      traps: [
        {
          title: "Counting four copies of a cut on a fold",
          body:
            "A cut that touches a fold line joins its reflection, so it opens as one shape, not two. Only a cut clear of every fold gives a separate copy in each quarter.",
        },
        {
          title: "Placing the copies at the corners when the cut was near the centre",
          body:
            "A cut near the corner where the folds meet stays near the centre of the opened sheet. Measure each cut's distance from the fold lines, and keep that distance in every copy.",
        },
        {
          title: "Undoing the folds in the wrong order",
          body:
            "Undo the last fold first, then the one before it. Opening the first fold first puts the copies on the wrong side of the sheet.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrpfqu-face",
      name: "Which way each copy faces",
      intuition:
        "Each copy is a reflection, not a slide. Unfolding across a vertical fold reverses a cut left to right; unfolding across a horizontal fold turns it upside down. An arrow, a letter or a pointed triangle shows the difference at once.",
      definition:
        "- **Across a vertical fold:** left and right swap. An arrow pointing left becomes one pointing right; an E becomes a reversed E.\n" +
        "- **Across a horizontal fold:** top and bottom swap. A triangle pointing up becomes one pointing down; left and right stay.\n" +
        "- After two folds, the quarter diagonally opposite the folded one has its cut both reversed and turned upside down.\n" +
        "- A shape that is the same on both sides of a line (a circle, a square, a star) looks the same in every copy, so only its place matters.\n" +
        "- **Fast route:** check the copy in the quarter diagonally opposite the folded one. It is flipped both ways, and most wrong options get it wrong.",
      authoredExample: {
        prompt:
          "A sheet is folded bottom half up, then right half over to the left, so the folded paper is the top-left quarter. An arrow pointing left is cut in it. After opening, which way does the arrow in each quarter point?",
        steps: [
          "Undo the right-to-left fold (a vertical fold): the top-right copy is reversed, so it points right.",
          "Undo the bottom-up fold (a horizontal fold): the bottom copies are turned upside down, and left and right stay.",
          "So the two left quarters have arrows pointing left and the two right quarters have arrows pointing right.",
        ],
        answer: "Left in both left quarters, right in both right quarters",
      },
      selfCheckExample: {
        prompt:
          "A sheet is folded bottom half up, then right half over to the left, and a triangle pointing up is cut in the folded top-left quarter. In which quarters do the triangles point down when the sheet is opened?",
        steps: [
          "The vertical unfold keeps up and down, so the top-right triangle also points up.",
          "The horizontal unfold turns the bottom copies upside down.",
        ],
        answer: "The two bottom quarters",
      },
      practiceSet: [
        { prompt: "A letter E is cut in the top-left quarter. What appears in the top-right quarter after the vertical fold is undone?", answer: "A reversed E" },
        { prompt: "Which unfold turns the cut shapes upside down: across a horizontal fold or a vertical one?", answer: "Across a horizontal fold" },
        { prompt: "An arrow pointing right is mirrored across a horizontal fold. Which way does the copy point?", answer: "Right" },
        { prompt: "Does a round hole change shape in any copy?", answer: "No: only its place changes." },
      ],
      pyqExampleId: "946e2521-2be3-44a7-a5de-962daa058218",
      traps: [
        {
          title: "Sliding a copy instead of reflecting it",
          body:
            "An option whose four arrows all point the same way has slid the cut into each quarter. Unfolding reflects it, so copies on opposite sides of a vertical fold point opposite ways.",
        },
        {
          title: "Turning the copy upside down across a vertical fold",
          body:
            "A vertical fold swaps only left and right. A triangle that points up keeps pointing up in the copy beside it; it turns down only in the copies across the horizontal fold.",
        },
        {
          title: "Ignoring the diagonally opposite quarter",
          body:
            "The copy diagonally across from the folded quarter has been reflected twice, so it is both reversed and upside down. Check it before you choose, because the setter often gets every other quarter right.",
        },
      ],
    },
  ],
};
