import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_RNV_COUNT_NOTE: SubtopicNote = {
  subtopicName: "Counting Elements",
  title: "Counting Elements",
  oneLineDefinition:
    "Figure series where something is counted: one more line, petal or circle at each step, one fewer side, or a figure built or rubbed out one part at a time.",
  whyItMatters:
    "Twenty-seven questions in the bank, 12 from the 2023 shifts and 15 from the 2024 shifts, with 16 EASY and 11 MODERATE. They are the quickest figure questions to solve, because the rule is a number you can count in each figure and continue.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscrnvco-method",
      name: "Reading a figure series: the order of checks",
      intuition:
        "A figure series hides one or two rules, and every rule is one of a few kinds. Checking the kinds in a fixed order finds the rule faster than staring at the whole picture.",
      definition:
        "Check each figure against the one before it, in this order:\n" +
        "1. **Count:** does something go up or down by one (lines, dots, sides, petals)?\n" +
        "2. **Turn:** does the whole figure, or one part, turn by the same angle each step (45 or 90 degrees)?\n" +
        "3. **Move:** does a part step from corner to corner, clockwise or anticlockwise?\n" +
        "4. **Alternate:** do two forms take turns, so figure 5 repeats figure 3?\n" +
        "5. **Rearrange:** in a box of many symbols, do the symbols swap places by a fixed move?\n" +
        "- A series often uses two rules at once on two different parts, such as a count and a turn. Find each part's rule on its own.\n" +
        "- **Fast route:** once you have one rule, use it to strike options. Often only one option survives, and you never need the second rule.",
      authoredExample: {
        prompt:
          "In a series, the number of dots runs 2, 3, 4, 5 and an arrow points up, right, down, left. What does the fifth figure show?",
        steps: [
          "Count: the dots go up by one, so the fifth figure has 6 dots.",
          "Turn: the arrow turns 90 degrees clockwise each step, so after left it points up.",
          "The fifth figure has 6 dots and an arrow pointing up.",
        ],
        answer: "6 dots and an upward arrow",
      },
      selfCheckExample: {
        prompt:
          "Two options for the fifth figure of a series both show the right number of lines. One has its circle at the top-right, the other at the bottom-left. What should you check next?",
        steps: [
          "The count is settled, so it cannot choose between them.",
          "Check how the circle moves from figure to figure (a turn or a move round the corners), and continue that one step.",
        ],
        answer: "The circle's movement, continued one step",
      },
      practiceSet: [
        { prompt: "In what order should you check the rules of a figure series?", answer: "Count, turn, move, alternate, rearrange." },
        { prompt: "A series has 1, 2, 3 and 4 lines. How many lines are in the fifth figure?", answer: "5" },
        { prompt: "A rule you have found leaves exactly one option standing. Do you need to find a second rule?", answer: "No: the one option left is the answer." },
        { prompt: "In a series of four figures where figures 1 and 3 match and figures 2 and 4 match, which figure does the fifth repeat?", answer: "The third (and the first)." },
      ],
      traps: [
        {
          title: "Looking at the whole picture at once",
          body:
            "A figure with three changing parts looks confusing as a whole. Take one part at a time, find its rule, and use each rule to strike options.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrnvco-count",
      name: "Counting up and counting down",
      intuition:
        "The most common figure rule is a count: each figure has one more of something, or one fewer. Count it in every figure, write the numbers down, and the next number is the answer's count.",
      definition:
        "- Count the element in each figure and write the numbers as a little series: 2, 3, 4, 5.\n" +
        "- Two elements can change at once, one rising and one falling: arrows 1, 2, 3, 4 while stars go 5, 4, 3, 2. Write both series.\n" +
        "- The count can also be the number of sides of a shape: triangle, square, pentagon (3, 4, 5), so next is a hexagon (6).\n" +
        "- If the steps are not equal, read their differences as a number series (1, 2, 4, 7 grows by 1, 2, 3).\n" +
        "- A count that reaches 0 means the element has gone: the next figure shows none of it.\n" +
        "- **Fast route:** count only in the options. The right one has the next number; most wrong options are one too many or one too few.",
      authoredExample: {
        prompt:
          "In a series, the dots run 3, 5, 7, 9 and the shape around them has 8 sides, then 7, then 6, then 5. What does the fifth figure show?",
        steps: [
          "Dots: up by 2 each step, so 11.",
          "Sides: down by 1 each step, so 4, a four-sided shape.",
          "The fifth figure is a four-sided shape with 11 dots.",
        ],
        answer: "A four-sided shape with 11 dots",
      },
      selfCheckExample: {
        prompt:
          "In a series, the black squares run 1, 2, 4, 7 and the white squares run 10, 9, 7, 4. How many of each are in the fifth figure?",
        steps: [
          "Black: the differences are 1, 2, 3, so the next difference is 4 and the count is 11.",
          "White: the differences are 1, 2, 3 downwards, so the next is 4 fewer: 0.",
        ],
        answer: "11 black squares and no white ones",
      },
      practiceSet: [
        { prompt: "Circles in a series run 9, 7, 5, 3. How many are in the next figure?", answer: "1" },
        { prompt: "Stars in a series run 1, 2, 4, 8. How many are in the next figure?", answer: "16", method: "Each count doubles." },
        { prompt: "A series has 6 arrows and 1 dot, then 5 arrows and 2 dots, then 4 arrows and 3 dots. What comes next?", answer: "3 arrows and 4 dots" },
        { prompt: "The shapes in a series are a hexagon, a pentagon and a square. What shape comes next?", answer: "A triangle", method: "The sides run 6, 5, 4, so next is 3." },
      ],
      pyqExampleId: "4ca1b1c3-d5e5-43f0-b947-f75dad08feb6",
      traps: [
        {
          title: "Counting one element when two are changing",
          body:
            "If the lines go up while the circles go down, an option with the right number of lines and the wrong number of circles is still wrong. Write a count for every element that changes.",
        },
        {
          title: "Keeping one of an element that has run out",
          body:
            "When a count falls 3, 2, 1, the next figure has none of that element. An option that still shows one is the setter's trap.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrnvco-build",
      name: "A figure built or rubbed out part by part",
      intuition:
        "Some series draw a figure one piece at a time: a side, then another side, then a diagonal. Others shade one cell after another or rub lines out. The count tells you how many pieces; the order tells you which piece comes next and where.",
      definition:
        "- Name the piece added at each step and where it goes: top side, right side, bottom side.\n" +
        "- The order usually follows a path you can name: round the box clockwise, along the top row then down the right side, or row by row.\n" +
        "- For shading, list the cells in the order they turn black: top-left, middle-left, bottom-left, so next comes a cell in the other column.\n" +
        "- A series can also rub out: each figure loses one piece, and the last figure has the fewest.\n" +
        "- **Fast route:** first strike options with the wrong number of pieces. Then, among those left, check only the position of the new piece.",
      authoredExample: {
        prompt:
          "In a series, the sides of a square are drawn one at a time: the top side, then the right side, then the bottom side. What does the fourth figure show?",
        steps: [
          "One side is added each step, so the fourth figure has four sides.",
          "The order runs round the square clockwise: top, right, bottom, so the left side comes next.",
          "The fourth figure is the closed square.",
        ],
        answer: "The whole square, all four sides",
      },
      selfCheckExample: {
        prompt:
          "In a 3 by 3 grid, one cell is shaded at each step: top-left, top-middle, top-right. If the shading continues down the right-hand side, which cell is shaded in the fifth figure?",
        steps: [
          "After the top row, the path goes down the right side: middle-right, then bottom-right.",
          "The fourth figure adds the middle-right cell and the fifth adds the bottom-right cell.",
        ],
        answer: "The bottom-right cell",
      },
      practiceSet: [
        { prompt: "One symbol is added each step: @, then @ #, then @ # %. How many symbols are in the fifth figure?", answer: "5" },
        { prompt: "A shape starts with 6 lines and loses one each step. How many lines are left in the fourth figure?", answer: "3", method: "6, 5, 4, 3." },
        { prompt: "A figure gains a vertical line, then a horizontal line, then one diagonal. What is added next?", answer: "The other diagonal" },
        { prompt: "Lines are added round a box clockwise from the top. After the top and right sides, which side comes next?", answer: "The bottom side" },
      ],
      pyqExampleId: "088e95a7-fbeb-4e15-ab68-d7d34a1e18ea",
      traps: [
        {
          title: "Right number of pieces, wrong place",
          body:
            "Two options can both have the right count while the new piece sits in different places. Find the path the pieces follow and check where the next one must go.",
        },
        {
          title: "Missing that the series rubs out",
          body:
            "When each figure has fewer lines than the one before, the next figure has fewer still. Read the series in its own direction before you continue it.",
        },
      ],
    },
  ],
};
