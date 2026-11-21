import type { SubtopicNote } from "@/app/notes/_types";

export const MS7_PA_SQUARES_NOTE: SubtopicNote = {
  subtopicName: "Squares and Rectangles",
  title: "Squares and Rectangles",
  oneLineDefinition:
    "A square's perimeter is 4 times its side and its area the side squared; a rectangle's are 2(l + b) and l × b; joining a square's midpoints makes a square of half its area.",
  whyItMatters:
    "3 of the chapter's 5 questions: 2 EASY and 1 MODERATE. One finds a square's perimeter from its area, one finds the area of a square with a rectangle's perimeter, and one finds the area of the square made by joining midpoints.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ms7pasq-perimeter",
      name: "Perimeter and area of squares and rectangles",
      intuition:
        "Perimeter is the length all the way round; area is the space inside. For a square everything comes from the side, so find the side first, from the perimeter (divide by 4) or from the area (the square root).",
      definition:
        "- **Square**: perimeter \\(= 4s\\), area \\(= s^2\\).\n" +
        "- **Rectangle**: perimeter \\(= 2(l + b)\\), area \\(= l \\times b\\).\n" +
        "- From the area, the side is the **square root**: area 729 gives side 27.\n" +
        "- \"Same perimeter\" means the same length of border: find the perimeter, then the new side.",
      formula: {
        label: "Square and rectangle",
        latex: "P_{\\square} = 4s \\quad A_{\\square} = s^2 \\qquad P_{\\text{rect}} = 2(l+b) \\quad A_{\\text{rect}} = l \\times b",
        symbols: [
          { symbol: "s", meaning: "side of the square" },
          { symbol: "l, b", meaning: "length and breadth of the rectangle" },
        ],
      },
      authoredExample: {
        prompt: "A rectangle is 18 cm long and 12 cm wide. A square has the same perimeter. What is the area of the square?",
        steps: [
          "Perimeter of the rectangle: \\(2(18 + 12) = 60\\) cm.",
          "Side of the square: \\(60 \\div 4 = 15\\) cm.",
          "Area of the square: \\(15 \\times 15 = 225\\) sq.cm.",
        ],
        answer: "225 sq.cm",
      },
      selfCheckExample: {
        prompt: "The area of a square is 169 sq.cm. What is its perimeter?",
        steps: ["Side \\(= 13\\) cm, because \\(13 \\times 13 = 169\\). Perimeter \\(= 4 \\times 13\\)."],
        answer: "52 cm",
      },
      practiceSet: [
        { prompt: "What is the perimeter of a square of side 9 cm?", answer: "36 cm" },
        { prompt: "A square has a perimeter of 64 cm. What is its area?", answer: "256 sq.cm (side 16 cm)" },
        { prompt: "Find the perimeter and the area of a rectangle 25 m long and 10 m wide.", answer: "Perimeter 70 m, area 250 sq.m" },
        { prompt: "A wire 48 cm long is bent into a square. What is the area of the square?", answer: "144 sq.cm (side 12 cm)" },
      ],
      pyqExampleId: "703678cd-6d57-4cef-acb7-d66d95d80aa7",
      traps: [
        {
          title: "Mixing up perimeter and area",
          body: "Perimeter is in cm and adds the sides; area is in sq.cm and multiplies them. Check the unit the question asks for.",
        },
        {
          title: "Adding only two sides",
          body: "A rectangle's perimeter is \\(2(l + b)\\), all four sides. \\(l + b\\) is only half of it.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ms7pasq-midpoints",
      name: "The square made by joining midpoints",
      intuition:
        "Join the midpoints of a square's sides and you get a smaller square, turned. It cuts four corner triangles off the big square, and those four triangles are exactly as big as the small square, so the small square is half the big one.",
      definition:
        "- Joining the **midpoints** of a square's sides makes a new square of **half the area**.\n" +
        "- Each of the four **corner triangles** is one eighth of the big square.\n" +
        "- Doing it again halves the area again.",
      formula: {
        label: "Midpoint square",
        latex: "A_{\\text{inner}} = \\tfrac{1}{2} A_{\\text{outer}}",
      },
      authoredExample: {
        prompt: "A square has side 10 cm. The midpoints of its sides are joined to make a new square. What is the area of the new square?",
        steps: [
          "Area of the big square: \\(10 \\times 10 = 100\\) sq.cm.",
          "The midpoint square is half of it: \\(100 \\div 2\\).",
        ],
        answer: "50 sq.cm",
      },
      selfCheckExample: {
        prompt: "The square made by joining the midpoints of a bigger square has area 72 sq.cm. What is the area of the bigger square?",
        steps: ["The inner square is half the outer one, so the outer is \\(2 \\times 72\\)."],
        answer: "144 sq.cm",
      },
      practiceSet: [
        { prompt: "The midpoints of a square of area 64 sq.cm are joined. What is the area of the new square?", answer: "32 sq.cm" },
        { prompt: "The midpoints of that new 32 sq.cm square are joined. What is the area now?", answer: "16 sq.cm" },
        { prompt: "What is the area of the square made by joining the midpoints of a square of side 6 cm?", answer: "18 sq.cm" },
        { prompt: "The midpoints of a square of area 100 sq.cm are joined. What is the area of one corner triangle cut off?", answer: "12.5 sq.cm, one eighth of 100" },
      ],
      pyqExampleId: "cd7020d9-2ff1-410a-b72a-bf5ad9896a28",
      traps: [
        {
          title: "Taking a quarter instead of a half",
          body: "The midpoint square's side is not half the big side, so its area is not a quarter. The area is exactly half.",
        },
      ],
    },
  ],
};
