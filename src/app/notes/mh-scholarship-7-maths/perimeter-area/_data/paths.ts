import type { SubtopicNote } from "@/app/notes/_types";

export const MS7_PA_PATHS_NOTE: SubtopicNote = {
  subtopicName: "Paths and Circles",
  title: "Paths and Circles",
  oneLineDefinition:
    "A path's area is the outer rectangle minus the inner one; a circle's circumference is 2πr and its area πr², with π taken as 22/7.",
  whyItMatters:
    "2 of the chapter's 5 questions, both MODERATE: a road around the outside of a garden, and the same length of wire bent into a square and into a circle.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ms7papa-road",
      name: "Paths and borders",
      intuition:
        "A path around a garden makes a bigger rectangle with the garden inside it. The path is what is left when you take the garden away, so its area is the big area minus the small one.",
      definition:
        "- A path of width w **outside** a rectangle adds **2w** to the length and **2w** to the breadth (w on each side).\n" +
        "- A path **inside**, along the edges, takes **2w** away from each.\n" +
        "- **Area of the path** = outer area − inner area.",
      formula: {
        label: "Area of a path",
        latex: "A_{\\text{path}} = (l + 2w)(b + 2w) - lb \\quad \\text{(outside)}",
        symbols: [
          { symbol: "l, b", meaning: "length and breadth of the garden" },
          { symbol: "w", meaning: "width of the path" },
        ],
      },
      authoredExample: {
        prompt: "A garden 20 m by 15 m has a path 2 m wide all round it, outside. What is the area of the path?",
        steps: [
          "Outer length \\(= 20 + 4 = 24\\) m, outer breadth \\(= 15 + 4 = 19\\) m.",
          "Outer area \\(= 24 \\times 19 = 456\\) sq.m; garden area \\(= 20 \\times 15 = 300\\) sq.m.",
          "Path \\(= 456 - 300\\).",
        ],
        answer: "156 sq.m",
      },
      selfCheckExample: {
        prompt: "A room 8 m by 6 m has a border 1 m wide inside it, along the walls. What is the area of the border?",
        steps: ["Inner part: \\((8 - 2) \\times (6 - 2) = 24\\) sq.m. Room: 48 sq.m. Border: \\(48 - 24\\)."],
        answer: "24 sq.m",
      },
      practiceSet: [
        { prompt: "A lawn 10 m by 8 m has a path 1 m wide outside it. What are the outer length and breadth?", answer: "12 m and 10 m" },
        { prompt: "A lawn 10 m by 8 m has a path 1 m wide outside it. What is the area of the path?", answer: "\\(120 - 80 = 40\\) sq.m" },
        { prompt: "A square plot of side 30 m has a path 5 m wide inside it, along its edges. What is the area of the path?", answer: "\\(900 - 400 = 500\\) sq.m" },
        { prompt: "A picture 20 cm by 10 cm has a frame 2 cm wide around it. What is the area of the frame?", answer: "\\(24 \\times 14 - 200 = 136\\) sq.cm" },
      ],
      pyqExampleId: "3a48131a-c1e0-4dda-9b7e-855a723d2532",
      traps: [
        {
          title: "Adding the width only once",
          body: "A path outside goes along both ends, so the length grows by twice its width. A 3 m path adds 6 m, not 3 m.",
        },
        {
          title: "Giving the outer area",
          body: "The outer rectangle includes the garden. The path is the outer area minus the garden.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ms7papa-circle",
      name: "Circles from a length of wire",
      intuition:
        "Bending a wire into a circle makes the wire's length the circumference. From it find the radius, and from the radius the area. Of all shapes made from the same wire, the circle holds the most area.",
      definition:
        "- **Circumference** \\(= 2\\pi r\\); **area** \\(= \\pi r^2\\); take \\(\\pi = \\frac{22}{7}\\).\n" +
        "- From the wire's length: \\(r = \\text{length} \\div (2\\pi)\\).\n" +
        "- The same wire bent into a **square** has side = length ÷ 4.\n" +
        "- For the same length of wire, a **circle** encloses more area than a square.",
      formula: {
        label: "Circle",
        latex: "C = 2\\pi r \\qquad A = \\pi r^2 \\qquad \\pi = \\tfrac{22}{7}",
        symbols: [
          { symbol: "r", meaning: "radius of the circle" },
          { symbol: "C", meaning: "circumference, the length round the circle" },
          { symbol: "A", meaning: "area of the circle" },
        ],
      },
      authoredExample: {
        prompt: "A wire 44 cm long is bent into a circle. What is the area of the circle?",
        steps: [
          "\\(2 \\times \\frac{22}{7} \\times r = 44\\), so \\(\\frac{44}{7} r = 44\\) and \\(r = 7\\) cm.",
          "Area \\(= \\frac{22}{7} \\times 7 \\times 7 = 154\\) sq.cm.",
        ],
        answer: "154 sq.cm",
      },
      selfCheckExample: {
        prompt: "What is the circumference of a circle of radius 35 cm?",
        steps: ["\\(2 \\times \\frac{22}{7} \\times 35 = 2 \\times 22 \\times 5\\)."],
        answer: "220 cm",
      },
      practiceSet: [
        { prompt: "What is the area of a circle of radius 3.5 cm?", answer: "\\(\\frac{22}{7} \\times 3.5 \\times 3.5 = 38.5\\) sq.cm" },
        { prompt: "A wire 44 cm long is bent into a square, and another 44 cm wire into a circle. Which encloses more area, and by how much?", answer: "The circle, by 33 sq.cm: the square is \\(11 \\times 11 = 121\\) sq.cm and the circle 154 sq.cm" },
        { prompt: "A circle has a circumference of 66 cm. What is its diameter?", answer: "21 cm (radius 10.5 cm)" },
        { prompt: "A circle has an area of 1386 sq.cm. What is its radius?", answer: "21 cm, because \\(r^2 = 1386 \\times \\frac{7}{22} = 441\\)" },
      ],
      pyqExampleId: "6965b92c-da89-46fd-b249-26e3e633d885",
      traps: [
        {
          title: "Using the wire length as the radius",
          body: "The wire is the whole way round the circle. Divide by \\(2\\pi\\) to get the radius.",
        },
        {
          title: "Using the diameter in the area formula",
          body: "Area is \\(\\pi r^2\\) with the radius, half the diameter. Using the diameter makes the area four times too big.",
        },
      ],
    },
  ],
};
