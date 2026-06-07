import type { SubtopicNote } from "@/app/notes/_types";

export const GEOMETRIC_COUNTING_NOTE: SubtopicNote = {
  subtopicName: "Geometric Counting",
  title: "Geometric Counting",
  oneLineDefinition:
    "Counting lines, triangles, quadrilaterals, diagonals, and intersection points from a set of points or lines — combinations with a correction for collinear (degenerate) cases.",
  whyItMatters:
    "Geometric counting is pure combination with one twist: collinear points make no triangle and concurrent/parallel lines lose intersections. Subtract the degenerate cases and these become routine.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "pc-points-and-polygons",
      name: "Lines, triangles and polygons from points",
      intuition:
        "A line needs 2 points, a triangle 3, a quadrilateral 4 — so the raw counts are \\(^nC_2,\\,^nC_3,\\,^nC_4\\). The correction: any set of collinear points that 'should' form a figure doesn't, so subtract those degenerate selections.",
      definition:
        "From \\(n\\) points, no three collinear: lines \\(^nC_2\\), triangles \\(^nC_3\\), quadrilaterals \\(^nC_4\\). **If \\(k\\) points are collinear:** subtract their degenerate selections — lines \\(^nC_2-^kC_2+1\\); triangles \\(^nC_3-^kC_3\\). **Diagonals** of an \\(n\\)-gon: \\(^nC_2-n=\\dfrac{n(n-3)}{2}\\). **Parallelograms** from \\(m\\) and \\(n\\) parallel lines: \\(^mC_2\\cdot{}^nC_2\\). **Max intersection points** of \\(n\\) lines: \\(^nC_2\\).",
      visualizationSlug: "pc-geometric-counting-diagram",
      authoredExample: {
        prompt: "How many triangles can be formed from 8 points, of which 3 are collinear?",
        steps: [
          "All triples: \\(^8C_3=56\\); degenerate (the 3 collinear): \\(^3C_3=1\\).",
          "\\(56-1=55\\).",
        ],
        answer: "\\(55\\).",
      },
      selfCheckExample: {
        prompt: "How many triangles from 12 points, of which 7 are collinear?",
        steps: [
          "\\(^{12}C_3-^7C_3=220-35\\).",
        ],
        answer: "\\(185\\).",
      },
      practiceSet: [
        { prompt: "Triangles from \\(n\\) points (no 3 collinear)?", answer: "\\(^nC_3\\)" },
        { prompt: "Correction for \\(k\\) collinear points (triangles)?", answer: "Subtract \\(^kC_3\\)" },
        { prompt: "Diagonals of an \\(n\\)-gon?", answer: "\\(\\dfrac{n(n-3)}{2}\\)" },
        { prompt: "Parallelograms from \\(m\\) and \\(n\\) parallel lines?", answer: "\\(^mC_2\\cdot{}^nC_2\\)" },
      ],
      pyqExampleId: "6d978186-3c76-486d-aa45-8ab2a891a822", // triangles from points
    },
  ],
  related: [
    { label: "Combinations", href: "/notes/nda-maths/permutation-combination/pc-combinations" },
    { label: "Forming Numbers from Digits", href: "/notes/nda-maths/permutation-combination/pc-forming-numbers" },
  ],
};
