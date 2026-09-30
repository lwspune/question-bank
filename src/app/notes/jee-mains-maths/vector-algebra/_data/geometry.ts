import type { SubtopicNote } from "@/app/notes/_types";

export const GEOMETRY_VEC_NOTE: SubtopicNote = {
  subtopicName: "Vectors in Geometry and Rotation",
  title: "Vectors in Geometry and Rotation",
  oneLineDefinition:
    "Vectors applied to points and figures: dividing a segment, collinear points, the centroid, orthocentre and circumcentre, angle bisectors, and rotating a vector or the axes.",
  whyItMatters:
    "Twenty-four PYQs. They are geometry questions in vector language: find a point, a length or a ratio. Each rests on one fact — the section formula, the bisector's direction, or that rotation keeps length. Three ideas cover the page.",
  concepts: [
    // C1 — section and collinearity
    {
      kind: "formula" as const,
      slug: "jvec-section",
      name: "Section points, centroid and collinearity",
      intuition:
        "The point dividing \\(AB\\) internally in the ratio \\(m:n\\) is \\(\\frac{n\\vec a+m\\vec b}{m+n}\\): the weight on each end is the other part of the ratio. The centroid averages the three vertices. Three points are collinear when \\(\\overrightarrow{AB}\\) and \\(\\overrightarrow{AC}\\) are parallel, that is, their components are proportional.",
      definition:
        "- Internal \\(m:n\\): \\(\\frac{n\\vec a+m\\vec b}{m+n}\\). External: \\(\\frac{m\\vec b-n\\vec a}{m-n}\\).\n" +
        "- Centroid \\(G=\\frac{\\vec a+\\vec b+\\vec c}{3}\\); \\(|AG|^2+|BG|^2+|CG|^2=\\frac13(a^2+b^2+c^2)\\).\n" +
        "- Collinear: \\(\\overrightarrow{AB}=t\\,\\overrightarrow{AC}\\).",
      formula: {
        label: "Section formula",
        latex: "\\vec p=\\frac{n\\,\\vec a+m\\,\\vec b}{m+n}",
      },
      authoredExample: {
        prompt: "Find the point dividing \\(A(1,2,3)\\), \\(B(4,8,9)\\) internally in the ratio \\(1:2\\).",
        steps: [
          "\\(\\frac{2(1,2,3)+(4,8,9)}{3}\\).",
        ],
        answer: "\\((2,4,5)\\).",
      },
      selfCheckExample: {
        prompt: "Are \\((1,1,1)\\), \\((2,3,4)\\), \\((3,5,7)\\) collinear?",
        steps: [
          "\\(\\overrightarrow{AB}=(1,2,3)\\), \\(\\overrightarrow{AC}=(2,4,6)=2\\overrightarrow{AB}\\).",
        ],
        answer: "Yes.",
      },
      practiceSet: [
        { prompt: "Midpoint of \\((2,0,4)\\) and \\((0,2,0)\\)?", answer: "\\((1,1,2)\\)" },
        { prompt: "Centroid of \\((3,0,0),(0,3,0),(0,0,3)\\)?", answer: "\\((1,1,1)\\)" },
        { prompt: "\\(\\overrightarrow{AB}=2\\overrightarrow{AC}\\) means?", answer: "\\(A,B,C\\) are collinear" },
        { prompt: "External division \\(m:n\\)?", answer: "\\(\\frac{m\\vec b-n\\vec a}{m-n}\\)" },
      ],
      pyqExampleId: "4f817575-a5d9-46e3-87bc-41f010eafe17", // 2023 — three collinear points, find (19 alpha - 6 beta)^2
      traps: [
        {
          title: "Cross the weights",
          body: "For \\(AP:PB=m:n\\), \\(\\vec a\\) carries weight \\(n\\) and \\(\\vec b\\) weight \\(m\\). Putting \\(m\\) on \\(\\vec a\\) gives the point dividing in \\(n:m\\).",
        },
      ],
    },

    // C2 — centres and bisectors
    {
      kind: "formula" as const,
      slug: "jvec-centres",
      name: "Triangle centres and angle bisectors",
      intuition:
        "The internal bisector of the angle between \\(\\vec a\\) and \\(\\vec b\\) runs along \\(\\hat a+\\hat b\\), the sum of the unit vectors, and it meets the opposite side dividing it in the ratio of the adjacent sides. A point equidistant from two lines through a vertex lies on a bisector. With the circumcentre \\(O\\) at the origin, the orthocentre is \\(\\vec a+\\vec b+\\vec c\\), and the centroid divides \\(OH\\) in the ratio \\(1:2\\).",
      definition:
        "- Internal bisector direction: \\(\\hat a+\\hat b\\); external: \\(\\hat a-\\hat b\\).\n" +
        "- The bisector from \\(O\\) meets \\(AB\\) at \\(C\\) with \\(AC:CB=OA:OB\\).\n" +
        "- Circumcentre at the origin: \\(H=\\vec a+\\vec b+\\vec c\\), \\(G=\\frac{H}{3}\\); in general \\(\\overrightarrow{OA}+\\overrightarrow{OB}+\\overrightarrow{OC}=\\overrightarrow{OH}\\).\n" +
        "- Equilateral triangle: all centres coincide.",
      formula: {
        label: "Internal bisector",
        latex: "\\text{direction}=\\frac{\\vec a}{|\\vec a|}+\\frac{\\vec b}{|\\vec b|}",
      },
      authoredExample: {
        prompt: "Find the direction of the internal bisector of the angle between \\((3,0,0)\\) and \\((0,4,0)\\).",
        steps: [
          "Unit vectors \\((1,0,0)\\) and \\((0,1,0)\\).",
        ],
        answer: "\\((1,1,0)\\).",
      },
      selfCheckExample: {
        prompt: "\\(OA=4\\), \\(OB=6\\). The internal bisector of \\(\\angle AOB\\) meets \\(AB\\) at \\(C\\). Find \\(AC:CB\\).",
        steps: [
          "The ratio of the adjacent sides.",
        ],
        answer: "\\(2:3\\).",
      },
      practiceSet: [
        { prompt: "Circumcentre at the origin: orthocentre?", answer: "\\(\\vec a+\\vec b+\\vec c\\)" },
        { prompt: "\\(G\\) divides \\(OH\\) in the ratio?", answer: "\\(1:2\\)" },
        { prompt: "Equilateral triangle: centroid and orthocentre?", answer: "Coincide" },
        { prompt: "External bisector direction?", answer: "\\(\\hat a-\\hat b\\)" },
      ],
      pyqExampleId: "98d1a131-0c81-4c37-b01c-1fc16f6be374", // 2024 — bisector of angle AOB meets AB at C, find OC
      traps: [
        {
          title: "Add unit vectors",
          body: "\\(\\vec a+\\vec b\\) bisects the angle only when \\(|\\vec a|=|\\vec b|\\). Normalise first: \\(\\hat a+\\hat b\\).",
        },
      ],
    },

    // C3 — rotation
    {
      kind: "formula" as const,
      slug: "jvec-rotation",
      name: "Rotating a vector, and rotating the axes",
      intuition:
        "A rotation keeps length. In the plane, turning \\((x,y)\\) counterclockwise by \\(\\theta\\) gives \\((x\\cos\\theta-y\\sin\\theta,\\ x\\sin\\theta+y\\cos\\theta)\\). In space, a vector rotated in the plane of \\(\\vec a\\) and another vector is a combination of the two, fixed by keeping the length and the angle. Rotating the axes instead leaves the vector alone and changes its components, but \\(x^2+y^2\\) stays the same.",
      definition:
        "- \\(|\\text{rotated vector}|=|\\text{original}|\\).\n" +
        "- Plane rotation by \\(\\theta\\): \\((x\\cos\\theta-y\\sin\\theta,\\ x\\sin\\theta+y\\cos\\theta)\\).\n" +
        "- A point at angle \\(\\theta\\) from \\(\\overrightarrow{OA}\\) on a unit circle: \\(\\cos\\theta\\,\\hat u+\\sin\\theta\\,\\hat w\\), \\(\\hat w\\perp\\hat u\\) in the plane.\n" +
        "- Rotated axes: new components satisfy \\(x'^2+y'^2=x^2+y^2\\).",
      formula: {
        label: "Plane rotation",
        latex: "(x,y)\\mapsto(x\\cos\\theta-y\\sin\\theta,\\ x\\sin\\theta+y\\cos\\theta)",
      },
      authoredExample: {
        prompt: "Rotate \\((1,0)\\) counterclockwise by \\(60^\\circ\\).",
        steps: [
          "\\((\\cos60^\\circ,\\sin60^\\circ)\\).",
        ],
        answer: "\\(\\left(\\frac12,\\frac{\\sqrt3}2\\right)\\).",
      },
      selfCheckExample: {
        prompt: "A vector has components \\((2,1)\\); after the axes are rotated its components are \\((p,2)\\). Find \\(p\\).",
        steps: [
          "\\(p^2+4=4+1\\).",
        ],
        answer: "\\(p=\\pm1\\).",
      },
      practiceSet: [
        { prompt: "Length after rotation?", answer: "Unchanged" },
        { prompt: "\\((0,1)\\) rotated \\(90^\\circ\\) counterclockwise?", answer: "\\((-1,0)\\)" },
        { prompt: "\\(\\vec b\\) is \\(\\vec a\\) rotated through a right angle: \\(\\vec a\\cdot\\vec b\\)?", answer: "\\(0\\)" },
        { prompt: "Arc of \\(90^\\circ\\) with midpoint \\(R\\): angle \\(POR\\)?", answer: "\\(45^\\circ\\)" },
      ],
      pyqExampleId: "bb0c0e47-fbc7-4b98-b235-929880602238", // 2021 — (sqrt3, 1) rotated by 45 degrees, area of a triangle
      traps: [
        {
          title: "Which way it turns",
          body: "A right-angle rotation has two possible results, \\(\\pm\\) a perpendicular vector. The question's words — counterclockwise, 'passing through the y-axis' — pick one; check it against them.",
        },
      ],
    },
  ],
};
