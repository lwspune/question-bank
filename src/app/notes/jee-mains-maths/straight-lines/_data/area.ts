import type { SubtopicNote } from "@/app/notes/_types";

export const AREA_SL_NOTE: SubtopicNote = {
  subtopicName: "Area of Triangles and Quadrilaterals",
  title: "Area of Triangles and Quadrilaterals",
  oneLineDefinition:
    "The area of a triangle from its vertices, collinearity, ratios of areas inside a triangle, and parallelograms, rhombi, squares and isosceles triangles built from given lines and points.",
  whyItMatters:
    "Nineteen PYQs, twelve of them multiple choice, and one from 2026. Eleven compute an area from coordinates or compare areas inside a triangle. Eight build a parallelogram, a rhombus, a square or an isosceles triangle from given lines and points and ask for a vertex or a length. Two ideas cover the page.",
  concepts: [
    // C1 — area from coordinates
    {
      kind: "formula" as const,
      slug: "jsl-area",
      name: "Area from coordinates",
      intuition:
        "The area of a triangle is half the modulus of \\(x_1(y_2-y_3)+x_2(y_3-y_1)+x_3(y_1-y_2)\\). It is zero exactly when the three points are collinear. Because of the modulus, a given area gives two equations. Ratios of areas often need no coordinates: triangles with the same height have areas in the ratio of their bases, and the triangle joining the midpoints of the sides has a quarter of the area.",
      definition:
        "- Area \\(=\\frac12|x_1(y_2-y_3)+x_2(y_3-y_1)+x_3(y_1-y_2)|\\).\n" +
        "- Collinear exactly when the bracket is 0.\n" +
        "- Same height: areas in the ratio of the bases.\n" +
        "- Triangle of midpoints: \\(\\frac14\\) of the area.",
      formula: {
        label: "Area of a triangle",
        latex: "\\Delta=\\frac12\\left|x_1(y_2-y_3)+x_2(y_3-y_1)+x_3(y_1-y_2)\\right|",
      },
      authoredExample: {
        prompt: "Find the area of the triangle with vertices \\((1,2)\\), \\((4,-2)\\), \\((6,5)\\).",
        steps: [
          "\\(1(-2-5)+4(5-2)+6(2+2)=-7+12+24=29\\).",
        ],
        answer: "\\(\\frac{29}2\\).",
      },
      selfCheckExample: {
        prompt: "For which \\(k\\) are \\((1,k)\\), \\((3,5)\\) and \\((5,9)\\) collinear?",
        steps: [
          "\\(1(5-9)+3(9-k)+5(k-5)=0\\).",
          "\\(-4+27-3k+5k-25=2k-2=0\\).",
        ],
        answer: "\\(k=1\\).",
      },
      practiceSet: [
        { prompt: "Area of \\((0,0),(4,0),(0,6)\\)?", answer: "\\(12\\)" },
        { prompt: "Area of the triangle of midpoints of a triangle of area 20?", answer: "\\(5\\)" },
        { prompt: "Are \\((1,1),(2,3),(4,7)\\) collinear?", answer: "Yes" },
        { prompt: "\\(k>0\\) with area 10 for \\((0,0),(k,0),(0,4)\\)?", answer: "\\(5\\)" },
      ],
      pyqExampleId: "4bb58060-3cb4-48e1-a2ac-e92712268a0b", // 2025 — the largest parallelogram inside a triangle
      traps: [
        {
          title: "Two signs from one modulus",
          body: "An area of 4 means the bracket is \\(8\\) or \\(-8\\). Dropping one sign loses half the answers, which matters when the question asks for the sum of all values.",
        },
      ],
    },

    // C2 — special quadrilaterals and triangles
    {
      kind: "formula" as const,
      slug: "jsl-special",
      name: "Parallelograms, rhombi and isosceles triangles",
      intuition:
        "The diagonals of a parallelogram bisect each other, so \\(A+C=B+D\\). A rhombus adds that its diagonals are perpendicular, and a square that they are also equal. In an isosceles triangle, the altitude from the apex is also the median, so its foot is the midpoint of the base. These facts turn a named shape into equations for the unknown vertices.",
      definition:
        "- Parallelogram \\(ABCD\\): \\(A+C=B+D\\), the common midpoint of the diagonals.\n" +
        "- Rhombus: also \\(AC\\perp BD\\). Square: also \\(AC=BD\\).\n" +
        "- Square of side \\(a\\): diagonal \\(a\\sqrt2\\), at \\(45^\\circ\\) to the sides.\n" +
        "- Isosceles with \\(AB=AC\\): the foot of the altitude from \\(A\\) is the midpoint of \\(BC\\).",
      formula: {
        label: "Parallelogram",
        latex: "A+C=B+D",
      },
      authoredExample: {
        prompt: "Three vertices of parallelogram \\(ABCD\\) are \\(A(2,1)\\), \\(B(5,3)\\), \\(C(7,8)\\). Find \\(D\\).",
        steps: [
          "\\(D=A+C-B=(2+7-5,\\ 1+8-3)\\).",
        ],
        answer: "\\((4,6)\\).",
      },
      selfCheckExample: {
        prompt: "Two opposite vertices of a rhombus are \\((0,0)\\) and \\((4,2)\\). On which line does the other diagonal lie?",
        steps: [
          "It is the perpendicular bisector: through the midpoint \\((2,1)\\), with normal \\((4,2)\\).",
          "\\(4x+2y=4\\cdot2+2\\cdot1=10\\).",
        ],
        answer: "\\(2x+y=5\\).",
      },
      practiceSet: [
        { prompt: "Parallelogram with \\(A(0,0)\\), \\(B(3,1)\\), \\(D(1,4)\\): \\(C\\)?", answer: "\\((4,5)\\)" },
        { prompt: "Diagonal of a square of side 5?", answer: "\\(5\\sqrt2\\)" },
        { prompt: "Side of a rhombus with diagonals 6 and 8?", answer: "\\(5\\)" },
        { prompt: "Isosceles triangle, apex \\((0,4)\\), base on the x-axis: foot of the altitude?", answer: "\\((0,0)\\)" },
      ],
      pyqExampleId: "96caea0c-8809-4966-9d5d-f87402b20334", // 2026 — rhombus from two opposite vertices and a side direction
      traps: [
        {
          title: "Which vertices are opposite",
          body: "\\(A+C=B+D\\) holds when \\(A\\) and \\(C\\) are opposite. If the vertices are named \\(ABCD\\) in order, they are. If only three points are given, the fourth vertex has three possible positions.",
        },
      ],
    },
  ],
};
