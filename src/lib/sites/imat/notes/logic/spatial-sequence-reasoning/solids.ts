import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_LOG_SPA_SOLIDS_NOTE: SubtopicNote = {
  subtopicName: "Cubes, Nets and Views",
  title: "Painted Cubes, Cube Nets and Views of Solids",
  oneLineDefinition:
    "A large cube cut into small cubes splits into corners, edges, faces and a hidden core; a net folds into a cube with fixed opposite faces; a stack of cubes can be read from a grid of heights.",
  whyItMatters:
    "A 2024 ministry question asked how many small blocks of a painted cube carry paint. Cambridge questions asked which net folds into a given solid (2014), which views of a solid are possible (2014, 2017, 2018) and how many different ways the sides of a box can be coloured (2016).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "imat-spa-painted-cube",
      name: "Painted cubes: how many small cubes have 0, 1, 2 or 3 painted faces",
      intuition:
        "Paint the outside of a big cube made of \\(n \\times n \\times n\\) small cubes. The corner cubes show three faces, the cubes along the edges show two, the cubes in the middle of each face show one, and the cubes inside show none. Peel off one layer from every side and what is left is the unpainted core, a cube of side \\(n - 2\\).",
      definition:
        "For a painted cube of \\(n \\times n \\times n\\) small cubes (\\(n \\ge 2\\)):\n" +
        "- **3 painted faces**: the 8 corners.\n" +
        "- **2 painted faces**: \\(n - 2\\) on each of the 12 edges.\n" +
        "- **1 painted face**: an \\((n-2) \\times (n-2)\\) square on each of the 6 faces.\n" +
        "- **0 painted faces**: the core, \\((n - 2)^3\\).\n" +
        "- **At least one painted face**: everything except the core, \\(n^3 - (n - 2)^3\\).\n" +
        "- If you are told the number of blocks, \\(n\\) is its cube root (64 blocks give \\(n = 4\\)).",
      formula: {
        label: "Painted n × n × n cube",
        latex: "8 \\;+\\; 12(n-2) \\;+\\; 6(n-2)^2 \\;+\\; (n-2)^3 \\;=\\; n^3",
        symbols: [
          { symbol: "\\(8\\)", meaning: "corners, 3 faces painted" },
          { symbol: "\\(12(n-2)\\)", meaning: "edge cubes, 2 faces painted" },
          { symbol: "\\(6(n-2)^2\\)", meaning: "face cubes, 1 face painted" },
          { symbol: "\\((n-2)^3\\)", meaning: "core, no paint" },
        ],
      },
      authoredExample: {
        prompt:
          "A cube built from 125 small cubes is dipped in paint. How many small cubes have 3, 2, 1 and 0 painted faces?",
        steps: [
          "\\(125 = 5^3\\), so \\(n = 5\\) and \\(n - 2 = 3\\).",
          "3 faces: 8. 2 faces: \\(12 \\times 3 = 36\\). 1 face: \\(6 \\times 3^2 = 54\\). 0 faces: \\(3^3 = 27\\).",
          "Check: \\(8 + 36 + 54 + 27 = 125\\). Cubes with at least one painted face: \\(125 - 27 = 98\\).",
        ],
        answer: "8, 36, 54 and 27",
      },
      selfCheckExample: {
        prompt:
          "A large cube is built from 216 identical small cubes and its outside is painted red. How many small cubes have exactly one red face?",
        options: ["64", "48", "152", "216", "96"],
        steps: [
          "\\(216 = 6^3\\), so \\(n = 6\\) and \\(n - 2 = 4\\).",
          "Exactly one face: \\(6 \\times 4^2 = 96\\).",
          "A is the unpainted core \\(4^3\\). B is the two-face count \\(12 \\times 4\\). C is \"at least one face\", \\(216 - 64\\).",
        ],
        answer: "(E) 96",
      },
      practiceSet: [
        { prompt: "A painted \\(4 \\times 4 \\times 4\\) cube: how many small cubes have no paint?", answer: "8", method: "\\(2^3\\)" },
        { prompt: "A painted \\(10 \\times 10 \\times 10\\) cube: how many small cubes have at least one painted face?", answer: "488", method: "\\(1000 - 8^3\\)" },
        { prompt: "A painted \\(3 \\times 3 \\times 3\\) cube: how many small cubes have exactly two painted faces?", answer: "12", method: "One on each edge" },
      ],
      traps: [
        {
          title: "\"At least one face\" includes the corners and edges",
          body: "The quickest route is total minus the hidden core: \\(n^3 - (n-2)^3\\). Answering with only the one-face cubes, or with the core itself, gives two of the usual wrong options.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-spa-nets",
      name: "Nets of a cube and finding opposite faces",
      intuition:
        "A net is a cube cut along some edges and laid flat: six squares joined edge to edge. When you fold it back, squares that share an edge become neighbours, and squares in a straight line with exactly one square between them end up facing each other. Every face has exactly one opposite, so once two pairs are found, the last two faces are the third pair.",
      definition:
        "- A **net** of a cube is six squares joined edge to edge that fold into a cube. There are 11 different nets.\n" +
        "- Two squares sharing an edge in the net are **adjacent** faces of the cube.\n" +
        "- Two squares in the same straight row or column with **exactly one square between them** are **opposite** faces.\n" +
        "- Each face has 4 neighbours and 1 opposite face, so the three opposite pairs use all six faces.\n" +
        "- Four squares in a row fold into a ring: the 1st and 3rd are opposite, and so are the 2nd and 4th.",
      authoredExample: {
        prompt:
          "A net has a column of four squares numbered 1, 2, 3, 4 from top to bottom, with square 5 joined to the left of square 2 and square 6 joined to the right of square 2: \\[\\begin{array}{ccc} & \\boxed{1} & \\\\ \\boxed{5} & \\boxed{2} & \\boxed{6} \\\\ & \\boxed{3} & \\\\ & \\boxed{4} & \\end{array}\\] Which faces are opposite each other?",
        steps: [
          "In the column, 1 and 3 have one square (2) between them, so they are opposite. 2 and 4 have 3 between them, so they are opposite.",
          "In the row, 5 and 6 have 2 between them, so they are opposite.",
        ],
        answer: "1 and 3, 2 and 4, 5 and 6",
      },
      selfCheckExample: {
        prompt:
          "A net has a top row of three squares numbered 1, 2, 3 from left to right. Under square 3 is square 4, and squares 5 and 6 continue that lower row to the right: \\[\\begin{array}{ccccc} \\boxed{1} & \\boxed{2} & \\boxed{3} & & \\\\ & & \\boxed{4} & \\boxed{5} & \\boxed{6} \\end{array}\\] When the net is folded into a cube, which face is opposite face 2?",
        options: ["1", "3", "4", "5", "6"],
        steps: [
          "Top row: 1 and 3 have one square between them, so they are opposite.",
          "Bottom row: 4 and 6 have one square between them, so they are opposite.",
          "Only 2 and 5 are left, so they form the third pair. Face 5 is opposite face 2.",
          "Options A and B (faces 1 and 3) share an edge with face 2 in the net. Option C (face 4) shares a neighbour with face 2, which does not make them opposite.",
        ],
        answer: "(D) 5",
      },
      practiceSet: [
        { prompt: "How many faces of a cube share an edge with any one face?", answer: "4" },
        { prompt: "In a net, squares A, B, C, D lie in a straight row. Which pairs are opposite?", answer: "A and C, B and D" },
        { prompt: "Can six squares arranged as a 2 by 3 rectangle fold into a cube?", answer: "No", method: "It is not one of the 11 nets: two squares land on the same face" },
        { prompt: "On a standard die, opposite faces add up to 7. Which face is opposite 2?", answer: "5" },
      ],
      traps: [
        {
          title: "Neighbours in the net are never opposite",
          body: "Two squares that share an edge in the net always end up as neighbouring faces of the cube. The opposite face is two steps away in a straight line, or is found by elimination once the other two pairs are known.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-spa-views",
      name: "Views of a stack of cubes: front, side and top",
      intuition:
        "A stack of cubes on a grid can be written as a grid of numbers, each number saying how many cubes stand on that square. From the front you see the tallest stack in each column, because a tall stack hides the shorter ones behind it. From above you see every square that holds at least one cube.",
      definition:
        "Write the stack as a **height map**: a grid with the number of cubes on each square (back row at the top).\n" +
        "- **Number of cubes**: the sum of all the numbers.\n" +
        "- **Front view**: for each column, the largest number in that column.\n" +
        "- **Side view**: for each row, the largest number in that row.\n" +
        "- **Top view**: the squares with a number of at least 1.\n" +
        "- Hidden cubes cannot be seen in any single view, so one view alone never fixes the number of cubes.",
      authoredExample: {
        prompt:
          "A stack of cubes has this height map (back row on top, front row below): \\[\\begin{array}{ccc} 3 & 1 & 2 \\\\ 1 & 0 & 2 \\end{array}\\] How many cubes are there, what heights does the front view show from left to right, and how many squares does the top view show?",
        steps: [
          "Total: \\(3 + 1 + 2 + 1 + 0 + 2 = 9\\) cubes.",
          "Front view, column by column: the largest of 3 and 1 is 3; of 1 and 0 is 1; of 2 and 2 is 2. So heights 3, 1, 2.",
          "Top view: every square except the one with 0, so 5 squares.",
        ],
        answer: "9 cubes; front view 3, 1, 2; top view 5 squares",
      },
      selfCheckExample: {
        prompt:
          "A stack of cubes has this height map, with the back row on top and the front row at the bottom: \\[\\begin{array}{ccc} 2 & 2 & 1 \\\\ 1 & 3 & 0 \\\\ 1 & 1 & 1 \\end{array}\\] Seen from the front, what are the heights of the three columns from left to right?",
        options: ["1, 1, 1", "2, 3, 1", "4, 6, 2", "2, 2, 1", "3, 3, 1"],
        steps: [
          "The front view shows the tallest stack in each column.",
          "Left column: 2, 1, 1, tallest 2. Middle: 2, 3, 1, tallest 3. Right: 1, 0, 1, tallest 1. So 2, 3, 1.",
          "A is only the front row. D is only the back row. C adds the columns, but hidden cubes do not make a view taller.",
        ],
        answer: "(B) 2, 3, 1",
      },
      practiceSet: [
        { prompt: "How many cubes are in the self-check stack above?", answer: "12" },
        { prompt: "How many squares does the top view of the self-check stack show?", answer: "8", method: "Every square except the one with 0" },
        { prompt: "A stack on a 2 by 2 grid looks 2 high, then 1 high from the front, and 2, then 2 high from the side. What is the fewest cubes it can contain?", answer: "5", method: "Both 2s must stand in the left column, plus one cube in the right column" },
      ],
      traps: [
        {
          title: "A view shows the tallest stack, not the total",
          body: "Cubes hidden behind a taller stack add nothing to a front view. Adding up a column gives the number of cubes in it, not the height you see, and that sum is a common wrong option.",
        },
      ],
    },
  ],
};
