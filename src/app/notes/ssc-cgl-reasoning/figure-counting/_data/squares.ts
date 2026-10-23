import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_RFC_SQUARES_NOTE: SubtopicNote = {
  subtopicName: "Counting Squares and Other Figures",
  title: "Counting Squares and Other Figures",
  oneLineDefinition:
    "Count the squares in a grid or a set of overlapping squares, the rectangles in a divided rectangle, and the circles or semicircles in a drawing.",
  whyItMatters:
    "Eleven questions in the bank, all from the 2024 shifts, with 1 EASY, 7 MODERATE and 3 HARD. Grids have exact formulas, so the work is splitting the figure into grids and overlaps and adding the parts with care.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscrfcsq-grid",
      name: "Squares in grids and overlapping squares",
      intuition:
        "A grid holds squares of every size: single cells, 2 by 2 blocks, 3 by 3 blocks, up to the whole grid. Count each size separately and add. Overlapping squares add one more square wherever two of them cross in a square shape.",
      definition:
        "- **An n by n grid** holds \\(n^2\\) single cells, \\((n - 1)^2\\) blocks of 2 by 2, and so on down to 1 square the size of the grid. A 3 by 3 grid has \\(9 + 4 + 1 = 14\\).\n" +
        "- **A grid of m rows and n columns** (m less than n) holds mn single cells, \\((m - 1)(n - 1)\\) blocks of 2 by 2, and so on until the smaller side runs out.\n" +
        "- **Overlapping squares:** count each drawn square, then each square formed where two of them overlap.\n" +
        "- **A tilted square** drawn inside another square is one more square.\n" +
        "- **Fast route:** split the figure into grids you can count by formula, then add the loose squares and the overlaps one by one.",
      formula: {
        label: "Squares in an n by n grid",
        latex: "1^2 + 2^2 + \\cdots + n^2 = \\frac{n(n+1)(2n+1)}{6}",
        symbols: [{ symbol: "n", meaning: "the number of cells along one side of the grid" }],
      },
      authoredExample: {
        prompt: "How many squares are there in a 3 by 3 grid of equal cells?",
        steps: [
          "Single cells: 9.",
          "2 by 2 blocks: 4 (each can start in one of the top-left four cells).",
          "The whole grid: 1. Total \\(9 + 4 + 1 = 14\\).",
        ],
        answer: "14",
      },
      selfCheckExample: {
        prompt: "How many squares are there in a 4 by 4 grid of equal cells?",
        steps: ["Sizes 1, 2, 3 and 4: \\(16 + 9 + 4 + 1\\).", "Total 30, which matches \\(\\frac{4 \\times 5 \\times 9}{6} = 30\\)."],
        answer: "30",
      },
      practiceSet: [
        { prompt: "How many squares are there in a 2 by 2 grid?", answer: "5" },
        { prompt: "How many 2 by 2 squares are there in a 4 by 4 grid?", answer: "9" },
        { prompt: "How many squares are there in a grid of 2 rows and 3 columns of equal cells?", answer: "8", method: "6 single cells and 2 blocks of 2 by 2." },
        { prompt: "Two equal squares overlap so that the shared part is a smaller square. How many squares are there?", answer: "3" },
      ],
      pyqExampleId: "0725b786-7b08-40a5-abb5-692f23fb6826",
      traps: [
        {
          title: "Counting only the single cells",
          body:
            "A 3 by 3 grid has 9 cells but 14 squares. Count every size of square, from one cell up to the whole grid.",
        },
        {
          title: "Using the n by n rule on a grid that is not square",
          body:
            "A grid of 2 rows and 3 columns has no 3 by 3 square. In an m by n grid, stop at the size of the shorter side.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrfcsq-other",
      name: "Rectangles, circles and semicircles",
      intuition:
        "A rectangle is fixed by choosing two of the horizontal lines and two of the vertical lines, so rectangles in a grid can be counted by choosing lines. Circles and semicircles have no formula: count them by kind, the large ones first and then the small ones.",
      definition:
        "- **Rectangles in a grid of m rows and n columns** (squares included): choose 2 of the m + 1 horizontal lines and 2 of the n + 1 vertical lines. A 2 by 3 grid gives \\(3 \\times 6 = 18\\).\n" +
        "- A rectangle cut into k strips by k minus 1 lines holds k(k + 1) ÷ 2 rectangles.\n" +
        "- A figure with an open side has fewer: a missing edge cannot close a shape.\n" +
        "- **Circles:** count the nested ones from the outside in, then the separate small ones. A semicircle is half a circle; a full circle cut by a diameter makes 2.\n" +
        "- **Fast route:** for rectangles, count the lines, not the shapes.",
      formula: {
        label: "Rectangles in a grid",
        latex: "\\binom{m+1}{2} \\times \\binom{n+1}{2}",
        symbols: [
          { symbol: "m", meaning: "the number of rows of cells" },
          { symbol: "n", meaning: "the number of columns of cells" },
        ],
      },
      authoredExample: {
        prompt: "How many rectangles, squares included, are there in a grid of 2 rows and 3 columns of equal cells?",
        steps: [
          "The grid has 3 horizontal lines and 4 vertical lines.",
          "Pairs of horizontal lines: 3. Pairs of vertical lines: 6.",
          "Each choice of two of each makes one rectangle: \\(3 \\times 6 = 18\\).",
        ],
        answer: "18",
      },
      selfCheckExample: {
        prompt: "A rectangle is split by two vertical lines into three strips. How many rectangles are there?",
        steps: ["Single strips: 3. Two strips side by side: 2. All three: 1.", "Total \\(3 + 2 + 1 = 6\\)."],
        answer: "6",
      },
      practiceSet: [
        { prompt: "How many rectangles, squares included, are there in a 2 by 2 grid?", answer: "9", method: "\\(3 \\times 3\\)." },
        { prompt: "Three circles are drawn one inside another, and two more small circles stand apart. How many circles are there?", answer: "5" },
        { prompt: "How many semicircles does one full circle cut by a diameter give?", answer: "2" },
        { prompt: "A rectangle is split into four strips by three vertical lines. How many rectangles are there?", answer: "10" },
      ],
      pyqExampleId: "e4f6f0c1-b6c9-495b-82ce-b83bd4597add",
      traps: [
        {
          title: "Forgetting that a square is a rectangle",
          body:
            "When a question asks for rectangles, the squares count too. The line-choosing formula already includes them.",
        },
        {
          title: "Closing an open figure in your head",
          body:
            "If a side of the figure is not drawn, the shapes that would use it do not exist. Count only shapes whose every side is on the page.",
        },
      ],
    },
  ],
};
