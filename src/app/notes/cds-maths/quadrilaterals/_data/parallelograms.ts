import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_QU_PARALLELOGRAMS_NOTE: SubtopicNote = {
  subtopicName: "Parallelograms",
  title: "Parallelograms and Midpoint Figures",
  oneLineDefinition:
    "A parallelogram's opposite sides are equal and parallel and its diagonals bisect each other; joining the midpoints of any quadrilateral's sides makes one.",
  whyItMatters:
    "Fourteen PYQs, two of them HARD. Six use the sides and angles (area = ab sin θ, adjacent angles supplementary); the other eight cut the figure with its diagonals or with lines through midpoints and compare the pieces.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdsqu-parallelogram-sides",
      name: "Sides, angles and area",
      intuition:
        "Push a rectangle sideways and it becomes a parallelogram with the same base; the height shrinks to \\(b\\sin\\theta\\). So the area is \\(ab\\sin\\theta\\), and adjacent angles still add to \\(180^\\circ\\).",
      definition:
        "- Opposite sides equal and parallel; opposite angles equal; adjacent angles supplementary.\n" +
        "- Area \\(= ab\\sin\\theta\\) for adjacent sides \\(a, b\\) at angle \\(\\theta\\).\n" +
        "- The bisectors of two adjacent angles meet at \\(90^\\circ\\).\n" +
        "- Four equal sides: a rhombus. Equal diagonals: a rectangle.\n" +
        "- Integer sides with a given area: list the factor pairs of \\(ab\\).",
      formula: {
        label: "Area",
        latex: "S = ab\\sin\\theta",
      },
      authoredExample: {
        prompt: "A parallelogram has integer sides, an angle of \\(30^\\circ\\) and area \\(11\\) cm\\(^2\\). Find its possible perimeters.",
        steps: ["\\(\\dfrac{ab}{2} = 11\\), so \\(ab = 22\\).", "Pairs \\(1 \\times 22\\) and \\(2 \\times 11\\)."],
        answer: "\\(46\\) cm or \\(26\\) cm.",
      },
      selfCheckExample: {
        prompt: "In parallelogram \\(PQRS\\), the bisectors of \\(\\angle P\\) and \\(\\angle Q\\) meet at \\(X\\). Find \\(\\angle PXQ\\).",
        steps: ["\\(\\angle P + \\angle Q = 180^\\circ\\), so the halves add to \\(90^\\circ\\)."],
        answer: "\\(90^\\circ\\).",
      },
      practiceSet: [
        { prompt: "Sides \\(6, 10\\), angle \\(30^\\circ\\). Area?", answer: "\\(30\\)" },
        { prompt: "One angle \\(70^\\circ\\). The adjacent angle?", answer: "\\(110^\\circ\\)" },
        { prompt: "\\(\\angle A = 60^\\circ\\), \\(\\angle ADB = 90^\\circ\\). \\(BD\\) in terms of \\(AB\\)?", answer: "\\(\\dfrac{\\sqrt3}{2}AB\\)" },
        { prompt: "A parallelogram with equal diagonals is a …?", answer: "Rectangle" },
      ],
      pyqExampleId: "505a9542-2bb3-4768-8e1b-e78b5b36b7e9", // 2026 (II) — angle 150°, integer sides, area 17.5 cm²
      traps: [
        {
          title: "sin 150° is ½",
          body:
            "An obtuse angle gives the same area as its supplement: \\(\\sin 150^\\circ = \\sin 30^\\circ = \\tfrac12\\). Using the cosine, or a negative value, loses the factor pairs.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsqu-parallelogram-pieces",
      name: "Pieces cut by diagonals and midpoints",
      intuition:
        "The diagonals cut a parallelogram into four triangles of equal area. A line from a vertex to the midpoint of a side makes similar triangles in the ratio \\(1 : 2\\). Joining midpoints of sides halves the area.",
      definition:
        "- The diagonals bisect each other and cut the figure into four triangles of equal area.\n" +
        "- A line from \\(A\\) to the midpoint \\(E\\) of \\(BC\\) cuts diagonal \\(BD\\) at \\(F\\) with \\(BF = \\dfrac{BD}{3}\\) (triangles \\(BFE\\) and \\(DFA\\), ratio \\(1 : 2\\)).\n" +
        "- Joining the midpoints of the sides of ANY quadrilateral gives a parallelogram (Varignon) of half the area, with sides parallel to the diagonals and half as long.\n" +
        "- Midpoints of a rectangle's sides: a rhombus. Of a rhombus's sides: a rectangle.\n" +
        "- In a triangle, the midpoints and one vertex form a parallelogram of half the triangle's area.",
      formula: {
        label: "Midpoint parallelogram",
        latex: "[PQRS] = \\tfrac12[ABCD], \\quad \\text{perimeter} = d_1 + d_2",
      },
      authoredExample: {
        prompt: "\\(E\\) is the midpoint of \\(BC\\) in parallelogram \\(ABCD\\), and \\(AE\\) meets \\(BD\\) at \\(F\\). If \\(BD = 9\\) cm, find \\(FD\\).",
        steps: ["\\(BF : FD = BE : AD = 1 : 2\\).", "\\(FD = \\dfrac23 \\times 9\\)."],
        answer: "\\(6\\) cm.",
      },
      selfCheckExample: {
        prompt: "A quadrilateral has diagonals \\(8\\) and \\(14\\) cm. Find the perimeter of the figure formed by joining the midpoints of its sides.",
        steps: ["Its sides are half the diagonals, two of each."],
        answer: "\\(22\\) cm.",
      },
      practiceSet: [
        { prompt: "Parallelogram of area \\(40\\). Area of one of the four diagonal triangles?", answer: "\\(10\\)" },
        { prompt: "Midpoints of a rectangle's sides form a …?", answer: "Rhombus" },
        { prompt: "\\([ABCD] = 60\\). Area of the midpoint figure?", answer: "\\(30\\)" },
        { prompt: "\\(BF = 3\\) with \\(E\\) the midpoint of \\(BC\\). \\(BD\\)?", answer: "\\(9\\)" },
      ],
      pyqExampleId: "dd2de9be-44a2-4514-a9ca-f8de7a039a6f", // 2026 (I) — E midpoint of BC, BF = 2.4 cm, find BD
      traps: [
        {
          title: "The midpoint figure's perimeter is the WHOLE sum of the diagonals",
          body:
            "Each side of the midpoint parallelogram is half a diagonal, and there are two of each. So its perimeter is \\(d_1 + d_2\\), not half of it.",
        },
        {
          title: "A rhombus inside a rectangle, not a square",
          body:
            "Midpoints of a rectangle's sides give equal sides (the diagonals are equal) but not right angles, unless the rectangle is a square.",
        },
      ],
    },
  ],
};
