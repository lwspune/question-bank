import type { SubtopicNote } from "@/app/notes/_types";

export const GEOMETRY_PNC_NOTE: SubtopicNote = {
  subtopicName: "Points, Lines and Polygons",
  title: "Points, Lines and Polygons",
  oneLineDefinition:
    "Counting triangles, quadrilaterals and intersection points formed by given points or lines, taking care of points that lie on one line and of the sides of a polygon.",
  whyItMatters:
    "Ten PYQs, eight of them multiple choice. Every one is a choice of vertices minus the choices that fail — three collinear points make no triangle, parallel lines never meet, concurrent lines meet at one point. Six involve collinear points or special lines; four use the vertices of a polygon. Two ideas cover the page.",
  concepts: [
    // C1 — collinear points and special lines
    {
      kind: "formula" as const,
      slug: "jpnc-collinear",
      name: "Collinear points, parallel and concurrent lines",
      intuition:
        "Triangles from \\(n\\) points are \\(\\binom n3\\) minus the collinear triples: subtract \\(\\binom k3\\) for each line holding \\(k\\) points. Alternatively, when points lie on the sides of a figure, choose how many come from each side (at most two from any one side for a triangle's vertex set to work). For lines, \\(\\binom n2\\) pairs meet unless parallel; \\(k\\) concurrent lines give 1 point instead of \\(\\binom k2\\).",
      definition:
        "- Triangles: \\(\\binom n3-\\sum\\binom{k_i}3\\).\n" +
        "- Vertices taken from points on the sides of a figure: at most two from any one side, since three would be collinear.\n" +
        "- Intersections of \\(n\\) lines: \\(\\binom n2\\); \\(k\\) parallel lose \\(\\binom k2\\); \\(k\\) concurrent lose \\(\\binom k2-1\\).",
      formula: {
        label: "Triangles from points with collinear sets",
        latex: "\\binom n3-\\sum_i\\binom{k_i}{3}",
      },
      authoredExample: {
        prompt: "Points: 4 on one line and 3 on another line, with no common point. How many triangles?",
        steps: [
          "\\(\\binom73-\\binom43-\\binom33=35-4-1\\).",
        ],
        answer: "\\(30\\).",
      },
      selfCheckExample: {
        prompt: "Of 8 lines, 3 are parallel and the rest are in general position. How many intersection points?",
        steps: [
          "\\(\\binom82-\\binom32=28-3\\).",
        ],
        answer: "\\(25\\).",
      },
      practiceSet: [
        { prompt: "Triangles from 10 points, no three collinear?", answer: "\\(120\\)" },
        { prompt: "Intersections of 5 concurrent lines?", answer: "\\(1\\)" },
        { prompt: "Triangles from 5 points on a line and 1 point off it?", answer: "\\(10\\)" },
        { prompt: "Quadrilaterals with one vertex on each side of a rectangle holding \\(a,b,c,d\\) points?", answer: "\\(abcd\\)" },
      ],
      pyqExampleId: "4f121f6d-9f84-4edd-b470-c5e9e503ec3e", // 2021 — triangle with 3, 5 and 6 points on its sides
      traps: [
        {
          title: "Vertices are not among the points",
          body: "When the points lie in the interior of the sides, the triangle's own vertices are not available. Use only the given points, and subtract collinear triples side by side.",
        },
      ],
    },

    // C2 — polygon vertices
    {
      kind: "formula" as const,
      slug: "jpnc-polygon",
      name: "Triangles and diagonals in a polygon",
      intuition:
        "Any 3 vertices of an \\(n\\)-gon form a triangle, so there are \\(\\binom n3\\) of them; any 4 give a quadrilateral. Diagonals are \\(\\binom n2-n\\). Triangles using no side of the polygon are \\(\\frac{n(n-4)(n-5)}{6}\\); with exactly one side, \\(n(n-4)\\); with two sides, \\(n\\).",
      definition:
        "- Triangles: \\(\\binom n3\\). Quadrilaterals: \\(\\binom n4\\).\n" +
        "- Diagonals: \\(\\binom n2-n=\\frac{n(n-3)}{2}\\).\n" +
        "- Triangles with no side of the polygon: \\(\\frac{n(n-4)(n-5)}{6}\\).\n" +
        "- \\(\\binom{n+1}3-\\binom n3=\\binom n2\\); \\(\\binom n3+\\binom n4=\\binom{n+1}4\\).",
      formula: {
        label: "No side of the polygon",
        latex: "\\frac{n(n-4)(n-5)}{6}",
      },
      authoredExample: {
        prompt: "How many diagonals does a decagon have?",
        steps: [
          "\\(\\frac{10\\cdot7}{2}\\).",
        ],
        answer: "\\(35\\).",
      },
      selfCheckExample: {
        prompt: "How many triangles with vertices at the vertices of a regular hexagon use no side of the hexagon?",
        steps: [
          "\\(\\frac{6\\cdot2\\cdot1}{6}\\).",
        ],
        answer: "\\(2\\).",
      },
      practiceSet: [
        { prompt: "Triangles from the vertices of a heptagon?", answer: "\\(35\\)" },
        { prompt: "\\(\\binom n2=66\\): \\(n\\)?", answer: "\\(12\\)" },
        { prompt: "Triangles with exactly two sides of an \\(n\\)-gon?", answer: "\\(n\\)" },
        { prompt: "\\(\\binom73+\\binom74\\)?", answer: "\\(\\binom84=70\\)" },
      ],
      pyqExampleId: "ec5de623-ceb7-4fb2-ae53-783c18c3aef5", // 2024 — triangles in a regular octagon using no side
      traps: [
        {
          title: "Indices on a circle",
          body: "For points \\(P_1,\\dots,P_n\\) on a circle, any three give a triangle; a condition on the indices (like \\(i+j+k\\neq15\\)) removes only the listed triples. List them carefully, with distinct indices.",
        },
      ],
    },
  ],
};
