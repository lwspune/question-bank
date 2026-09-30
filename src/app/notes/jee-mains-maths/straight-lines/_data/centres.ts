import type { SubtopicNote } from "@/app/notes/_types";

export const CENTRES_SL_NOTE: SubtopicNote = {
  subtopicName: "Centres of a Triangle",
  title: "Centres of a Triangle",
  oneLineDefinition:
    "The orthocentre, circumcentre, centroid and incentre of a triangle given by its vertices or by its sides, and the Euler line that joins three of them.",
  whyItMatters:
    "Twenty-six PYQs, twenty-two of them multiple choice, and four from 2026. Fifteen use the orthocentre, found from two altitudes or given and worked back to a vertex or a side. Six find the circumcentre from perpendicular bisectors. Five use the centroid, the incentre or a point dividing a side. Three ideas cover the page.",
  concepts: [
    // C1 — orthocentre
    {
      kind: "formula" as const,
      slug: "jsl-orthocentre",
      name: "The orthocentre",
      intuition:
        "The orthocentre \\(H\\) is where the altitudes meet. Each altitude passes through a vertex and is perpendicular to the opposite side, so two dot products fix \\(H\\). When \\(H\\) is given and a vertex is unknown, the same two dot products become equations for the vertex. In a right triangle, \\(H\\) is the vertex at the right angle. The centroid lies on the segment from \\(H\\) to the circumcentre \\(O\\), two thirds of the way from \\(H\\).",
      definition:
        "- \\((H-A)\\cdot(C-B)=0\\) and \\((H-B)\\cdot(A-C)=0\\).\n" +
        "- Right angle at \\(A\\): \\(H=A\\).\n" +
        "- Euler line: \\(G=\\frac{H+2O}3\\), with \\(O\\) the circumcentre.\n" +
        "- Equilateral triangle: \\(H\\), \\(G\\) and \\(O\\) coincide.",
      formula: {
        label: "Altitude conditions",
        latex: "\\overrightarrow{AH}\\cdot\\overrightarrow{BC}=0,\\qquad \\overrightarrow{BH}\\cdot\\overrightarrow{CA}=0",
      },
      authoredExample: {
        prompt: "Find the orthocentre of \\(A(0,0)\\), \\(B(6,0)\\), \\(C(2,4)\\).",
        steps: [
          "The altitude from \\(C\\) is perpendicular to \\(AB\\) (the x-axis): \\(x=2\\).",
          "\\(BC\\) has direction \\((-4,4)\\), so the altitude from \\(A\\) is \\(y=x\\).",
        ],
        answer: "\\((2,2)\\).",
      },
      selfCheckExample: {
        prompt: "Two vertices of a triangle are \\(A(0,0)\\) and \\(B(4,0)\\), and its orthocentre is \\(H(1,1)\\). Find the third vertex \\(C\\).",
        steps: [
          "\\(AH\\perp BC\\): \\((1,1)\\cdot(x-4,\\ y)=0\\), so \\(x+y=4\\).",
          "\\(BH\\perp AC\\): \\((-3,1)\\cdot(x,y)=0\\), so \\(y=3x\\).",
        ],
        answer: "\\(C=(1,3)\\).",
      },
      practiceSet: [
        { prompt: "Orthocentre of \\((0,0),(5,0),(0,7)\\)?", answer: "\\((0,0)\\)" },
        { prompt: "Orthocentre of the triangle with sides \\(x=1\\), \\(y=2\\), \\(x+y=6\\)?", answer: "\\((1,2)\\)" },
        { prompt: "Circumcentre \\((0,0)\\), centroid \\((1,2)\\): orthocentre?", answer: "\\((3,6)\\)" },
        { prompt: "Orthocentre of an equilateral triangle with centroid \\((2,3)\\)?", answer: "\\((2,3)\\)" },
      ],
      pyqExampleId: "6bb7fa3d-412d-41f6-b7ee-08023401c81b", // 2025 — orthocentres of two triangles given by their sides
      traps: [
        {
          title: "Check for a right angle first",
          body: "If two sides have slopes whose product is \\(-1\\), the orthocentre is their common vertex, and no altitude needs writing. Missing this turns a one-line question into a page of algebra.",
        },
      ],
    },

    // C2 — circumcentre
    {
      kind: "formula" as const,
      slug: "jsl-circumcentre",
      name: "The circumcentre",
      intuition:
        "The circumcentre \\(O\\) is equally far from the three vertices, so it lies on the perpendicular bisector of each side, and two of them fix it. Setting \\(|OA|^2=|OB|^2\\) removes the squares and leaves a straight line. In a right triangle, \\(O\\) is the midpoint of the hypotenuse. When the triangle is given by its sides, find the vertices first by solving the lines in pairs.",
      definition:
        "- \\(|OA|=|OB|=|OC|=R\\).\n" +
        "- Perpendicular bisector of \\(AB\\): through the midpoint, perpendicular to \\(AB\\).\n" +
        "- Right angle at \\(C\\): \\(O\\) is the midpoint of \\(AB\\), and \\(R=\\frac{AB}2\\).\n" +
        "- Area \\(=\\frac{abc}{4R}\\).",
      formula: {
        label: "Equal distances",
        latex: "|OA|^2=|OB|^2=|OC|^2",
      },
      authoredExample: {
        prompt: "Find the circumcentre of \\(A(0,0)\\), \\(B(8,0)\\), \\(C(2,6)\\).",
        steps: [
          "The perpendicular bisector of \\(AB\\) is \\(x=4\\).",
          "\\(|OA|^2=|OC|^2\\): \\(16+y^2=4+(y-6)^2\\), so \\(12y=24\\) and \\(y=2\\).",
        ],
        answer: "\\((4,2)\\), with \\(R=2\\sqrt5\\).",
      },
      selfCheckExample: {
        prompt: "Find the circumcentre of the triangle with sides \\(x=0\\), \\(y=0\\) and \\(x+2y=6\\).",
        steps: [
          "The right angle is at the origin; the other vertices are \\((6,0)\\) and \\((0,3)\\).",
          "\\(O\\) is the midpoint of the hypotenuse.",
        ],
        answer: "\\(\\left(3,\\frac32\\right)\\).",
      },
      practiceSet: [
        { prompt: "Circumcentre of \\((0,0),(6,0),(0,8)\\)?", answer: "\\((3,4)\\)" },
        { prompt: "Its circumradius?", answer: "\\(5\\)" },
        { prompt: "Perpendicular bisector of \\((1,1)\\) and \\((5,1)\\)?", answer: "\\(x=3\\)" },
        { prompt: "Circumradius of an equilateral triangle of side 6?", answer: "\\(2\\sqrt3\\)" },
      ],
      pyqExampleId: "2af7f08e-15f2-4951-b14d-8e2275648e62", // 2026 — vertices from a midpoint and the centroid, then the circumcentre
      traps: [
        {
          title: "Midpoint alone is not enough",
          body: "The perpendicular bisector needs the midpoint and the perpendicular direction. A median also passes through the midpoint, but it goes through \\(O\\) only when the triangle is isosceles there.",
        },
      ],
    },

    // C3 — centroid, incentre, section
    {
      kind: "formula" as const,
      slug: "jsl-centroid",
      name: "Centroid, incentre and dividing a side",
      intuition:
        "The centroid is the average of the vertices. The midpoints of the sides give it too, since the triangle of midpoints has the same centroid, and they give the vertices: \\(A=E+F-D\\), where \\(D,E,F\\) are the midpoints of \\(BC,CA,AB\\). The incentre is the average of the vertices weighted by the opposite side lengths. A point dividing \\(BC\\) in the ratio \\(m:n\\) is \\(\\frac{nB+mC}{m+n}\\).",
      definition:
        "- Centroid: \\(G=\\frac{A+B+C}3\\).\n" +
        "- From the midpoints \\(D,E,F\\) of \\(BC,CA,AB\\): \\(A=E+F-D\\), \\(B=F+D-E\\), \\(C=D+E-F\\).\n" +
        "- Incentre: \\(I=\\frac{aA+bB+cC}{a+b+c}\\), with \\(a=BC\\), \\(b=CA\\), \\(c=AB\\).\n" +
        "- \\(P\\) divides \\(BC\\) as \\(m:n\\): \\(P=\\frac{nB+mC}{m+n}\\).",
      formula: {
        label: "Incentre",
        latex: "I=\\frac{aA+bB+cC}{a+b+c}",
      },
      authoredExample: {
        prompt: "Find the incentre of \\(A(0,0)\\), \\(B(4,0)\\), \\(C(0,3)\\).",
        steps: [
          "\\(a=BC=5\\), \\(b=CA=3\\), \\(c=AB=4\\).",
          "\\(I=\\frac{5(0,0)+3(4,0)+4(0,3)}{12}=\\frac{(12,12)}{12}\\).",
        ],
        answer: "\\((1,1)\\).",
      },
      selfCheckExample: {
        prompt: "The midpoints of the sides of a triangle are \\((1,2)\\), \\((3,4)\\) and \\((5,0)\\). Find the vertices and the centroid.",
        steps: [
          "Take \\(D=(1,2)\\), \\(E=(3,4)\\), \\(F=(5,0)\\): \\(A=E+F-D=(7,2)\\), \\(B=F+D-E=(3,-2)\\), \\(C=D+E-F=(-1,6)\\).",
          "\\(G=\\frac{(9,6)}3\\), the same as the centroid of the midpoints.",
        ],
        answer: "\\((7,2)\\), \\((3,-2)\\), \\((-1,6)\\); centroid \\((3,2)\\).",
      },
      practiceSet: [
        { prompt: "Centroid of \\((1,2),(3,4),(5,9)\\)?", answer: "\\((3,5)\\)" },
        { prompt: "The point dividing \\((0,0)\\) to \\((6,3)\\) in the ratio \\(2:1\\)?", answer: "\\((4,2)\\)" },
        { prompt: "Incentre of an equilateral triangle with centroid \\((1,1)\\)?", answer: "\\((1,1)\\)" },
        { prompt: "Centroid of a triangle whose midpoints are \\((0,0),(2,0),(0,2)\\)?", answer: "\\(\\left(\\frac23,\\frac23\\right)\\)" },
      ],
      pyqExampleId: "9febe752-e431-4fdd-b6e2-31eef905ddc8", // 2026 — vertices from the midpoints, then the incentre
      traps: [
        {
          title: "Weight by the opposite side",
          body: "In the incentre formula, \\(A\\) is weighted by \\(a=BC\\), the side opposite it, not by a side through it. Weighting by the adjacent sides gives a different point.",
        },
      ],
    },
  ],
};
