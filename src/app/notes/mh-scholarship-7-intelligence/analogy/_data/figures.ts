import type { SubtopicNote } from "@/app/notes/_types";

export const MS7_AN_FIGURES_NOTE: SubtopicNote = {
  subtopicName: "Pyramid and Figure Pairs",
  title: "Pyramid and Figure Pairs",
  oneLineDefinition:
    "On a pyramid, swap each item with its mirror partner across the middle line; in a grid, follow where each shape moves from box to box.",
  whyItMatters:
    "3 of the chapter's 7 questions: 1 MODERATE and 2 HARD. Two read a pyramid of letters and signs, and one moves shapes between the boxes of a 2 by 2 grid.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ms7anfi-pyramid",
      name: "Mirror partners on a pyramid",
      intuition:
        "Fold the pyramid down its middle line. Each item lands on its mirror partner in the same row. An item on the fold line itself stays where it is.",
      definition:
        "- Each **row** is mirrored on its own: first with last, second with second last.\n" +
        "- In a row with an **odd** number of items, the **middle one stays**.\n" +
        "- Work **item by item**, in order, and write each partner down.\n" +
        "- To go **backwards** (the answer is the first term), the same swap works, because partners swap both ways.",
      authoredExample: {
        prompt: "A pyramid has rows P Q, then R S T, then U V W X. Find the missing term: PS : QS : : RU : ?",
        steps: [
          "Mirror partners: P with Q; R with T, and S stays; U with X, V with W.",
          "PS becomes QS: P went to Q and S stayed. Check: it fits.",
          "R goes to T and U goes to X.",
        ],
        answer: "TX",
      },
      selfCheckExample: {
        prompt: "In the row U V W X, what is the mirror partner of V?",
        steps: ["Second from the left pairs with second from the right."],
        answer: "W",
      },
      practiceSet: [
        { prompt: "In the row U V W X, what is the mirror partner of U?", answer: "X" },
        { prompt: "In the row A B C D E, which letter stays in place when the row is mirrored?", answer: "C, the middle letter" },
        { prompt: "In the row A B C D E, AB : ED : : BC : ?", answer: "DC" },
        { prompt: "In the row F G H I J K, what is the mirror partner of G?", answer: "J" },
      ],
      pyqExampleId: "5651ce31-e869-43a7-8a68-616fff959ccc",
      traps: [
        {
          title: "Mirroring across the whole pyramid",
          body: "Each row folds on its own. A letter never moves to a different row.",
        },
        {
          title: "Swapping the middle item",
          body: "In an odd row the middle item is on the fold line, so it stays the same.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ms7anfi-grids",
      name: "Shapes moving in a grid",
      intuition:
        "In a 2 by 2 grid, track one shape at a time: which box did it start in, and which box did it end up in? Then move the third figure's shapes in exactly the same way.",
      definition:
        "- Name the boxes: **top-left, top-right, bottom-right, bottom-left** (that is the clockwise order).\n" +
        "- For each shape in the first figure, note its **box before and after**.\n" +
        "- Watch for **swaps** (two shapes change boxes), **moves** (one box clockwise) and **stacking** (one shape drawn on top of another).\n" +
        "- Also watch **shading**: a white shape may turn black.",
      authoredExample: {
        prompt: "In the first grid a dot is in the top-left box; in the second it is in the top-right box. The third grid has a star in the bottom-left box. Where is the star in the fourth grid?",
        steps: [
          "The dot moved one box to the right.",
          "Move the star one box to the right: from bottom-left to bottom-right.",
        ],
        answer: "The bottom-right box",
      },
      selfCheckExample: {
        prompt: "A shaded box moves one box clockwise at each step: top-left, then top-right. Where is it next?",
        steps: ["Clockwise after top-right comes bottom-right."],
        answer: "Bottom-right",
      },
      practiceSet: [
        { prompt: "Name the four boxes of a 2 by 2 grid in clockwise order, starting at top-left.", answer: "Top-left, top-right, bottom-right, bottom-left" },
        { prompt: "A circle in the top-right box moves one box anticlockwise. Where does it go?", answer: "The top-left box" },
        { prompt: "In the first pair a triangle and a square swap boxes. In the third grid a circle is top-right and a star bottom-left. Where are they in the fourth?", answer: "The circle is bottom-left and the star top-right" },
        { prompt: "In the first pair a white shape turns black. The third figure is a white star. What is the fourth?", answer: "A black star" },
      ],
      pyqExampleId: "e4e1db7a-77cc-4464-972a-85f756cd8223",
      traps: [
        {
          title: "Tracking only one shape",
          body: "Every shape in the grid may move. Note the before and after box of each one.",
        },
      ],
    },
  ],
};
