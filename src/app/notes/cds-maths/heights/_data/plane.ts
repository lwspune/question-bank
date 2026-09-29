import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_HD_PLANE_NOTE: SubtopicNote = {
  subtopicName: "Towers on Plane Figures and Bearings",
  title: "Towers on Plane Figures and Bearings",
  oneLineDefinition:
    "When towers stand at the corners or centre of a square, rectangle or hexagon, the ground distances come from the plane figure, and each tower is its own right triangle.",
  whyItMatters:
    "Seven PYQs, five of them HARD — the hardest page in the chapter, because the geometry is in two planes. Find each ground distance from the figure first (a side, a diagonal, half a diagonal), then use the elevation for each tower separately.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdshd-plane",
      name: "Ground distances from the figure",
      intuition:
        "The towers stand upright, so every line of sight is still a right triangle — but its ground leg now runs across a square, a rectangle or a hexagon. Solve the flat figure first, then each tower.",
      definition:
        "- Regular hexagon of side \\(s\\), from vertex \\(A\\): \\(AB = s\\), \\(AC = s\\sqrt3\\), \\(AD = 2s\\).\n" +
        "- Square of side \\(l\\): centre to corner \\(= \\dfrac{l}{\\sqrt2}\\).\n" +
        "- Tower at a corner of a rectangle: the two sides and the diagonal are the three ground distances.\n" +
        "- Bearings: \\(N\\,\\theta\\,E\\) is \\(\\theta\\) east of north; put the bank on one axis and write each bearing as a tangent.",
      formula: {
        label: "Hexagon diagonals",
        latex: "AB : AC : AD = 1 : \\sqrt3 : 2",
      },
      authoredExample: {
        prompt: "Poles stand at \\(B\\) and \\(D\\) of a regular hexagon \\(ABCDEF\\). From \\(A\\), both tops are at elevation \\(45^\\circ\\). Find the ratio of the poles.",
        steps: ["\\(AB = s\\), \\(AD = 2s\\).", "Heights \\(s\\) and \\(2s\\)."],
        answer: "\\(1 : 2\\).",
      },
      selfCheckExample: {
        prompt: "A tower at one corner of a rectangle subtends \\(45^\\circ\\) at both nearer corners. What is the cotangent of the angle at the farthest corner?",
        steps: ["Both sides are \\(h\\), so the diagonal is \\(h\\sqrt2\\)."],
        answer: "\\(\\sqrt2\\).",
      },
      practiceSet: [
        { prompt: "Hexagon side \\(s\\). Distance to the opposite vertex?", answer: "\\(2s\\)" },
        { prompt: "Square side \\(2\\). Centre to corner?", answer: "\\(\\sqrt2\\)" },
        { prompt: "Pole \\(OP = h\\) at the centre \\(O\\) of a square of side \\(l\\); \\(A\\) a corner. \\(\\cot\\angle APO\\)?", answer: "\\(\\dfrac{\\sqrt2\\,h}{l}\\)" },
        { prompt: "Rectangle sides \\(3, 4\\). Diagonal?", answer: "\\(5\\)" },
      ],
      pyqExampleId: "2291551a-70a2-455b-b5b9-a86016566dd2", // 2021 (I) — tower at a corner of a rectangular field
      traps: [
        {
          title: "Which diagonal of the hexagon?",
          body:
            "From \\(A\\), the next-but-one vertex \\(C\\) is \\(s\\sqrt3\\) away and the opposite vertex \\(D\\) is \\(2s\\). Using \\(2s\\) for \\(C\\) changes the ratio of the towers.",
        },
      ],
    },
  ],
};
