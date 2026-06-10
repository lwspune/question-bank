import type { SubtopicNote } from "@/app/notes/_types";

export const TRIANGLES_POLYGONS_NOTE: SubtopicNote = {
  subtopicName: "Triangles, Quadrilaterals, and Polygons",
  title: "Triangles, Quadrilaterals & Polygons",
  oneLineDefinition:
    "Coordinate geometry applied to figures: the area of a triangle from its vertices, the triangle centres (centroid, incentre, circumcentre), constructing vertices from medians/altitudes, and quadrilateral relations.",
  whyItMatters:
    "This is the chapter's largest subtopic and its capstone — it combines slope, distance, section and area into figure problems. Knowing the area determinant and the centre formulas cold makes most of it routine.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "lines-area-of-triangle",
      name: "Area of a triangle and collinearity",
      intuition:
        "The area of a triangle from its three vertices is half the absolute value of a determinant. When that determinant is zero the 'triangle' has collapsed — the points are collinear.",
      definition:
        "Area \\(=\\dfrac12\\left|x_1(y_2-y_3)+x_2(y_3-y_1)+x_3(y_1-y_2)\\right|\\) \\(=\\dfrac12\\left|\\begin{smallmatrix}x_1&y_1&1\\\\x_2&y_2&1\\\\x_3&y_3&1\\end{smallmatrix}\\right|\\). **Collinear** iff this is \\(0\\). The same determinant gives the condition three points lie on a line.",
      formula: {
        label: "Area of a triangle from vertices",
        latex:
          "\\text{Area}=\\dfrac12\\left|x_1(y_2-y_3)+x_2(y_3-y_1)+x_3(y_1-y_2)\\right|",
      },
      traps: [
        {
          title: "Don't forget the \\(\\tfrac12\\) and the **absolute value** — and collinearity is area \\(=0\\)",
          body:
            "Two routine slips on the area formula \\(\\tfrac12|x_1(y_2-y_3)+x_2(y_3-y_1)+x_3(y_1-y_2)|\\): dropping the leading **\\(\\tfrac12\\)** (which doubles the answer), and omitting the **modulus** (a clockwise vertex order makes the bare determinant negative — area can't be negative). When the expression equals \\(0\\), the three points are **collinear**, so the 'area' test and the collinearity test are the same computation.",
        },
      ],
      authoredExample: {
        prompt: "Find the area of the triangle with vertices \\((0,0),(4,0),(0,3)\\).",
        steps: [
          "Area \\(=\\dfrac12|0(0-3)+4(3-0)+0(0-0)|=\\dfrac12|12|\\).",
        ],
        answer: "\\(6\\).",
      },
      selfCheckExample: {
        prompt: "Are \\((1,1),(2,3),(3,5)\\) collinear?",
        steps: [
          "Area \\(=\\dfrac12|1(3-5)+2(5-1)+3(1-3)|=\\dfrac12|-2+8-6|=0\\).",
        ],
        answer: "Yes — collinear (area \\(=0\\)).",
      },
      practiceSet: [
        { prompt: "Area of a triangle from vertices?", answer: "\\(\\tfrac12|x_1(y_2-y_3)+x_2(y_3-y_1)+x_3(y_1-y_2)|\\)" },
        { prompt: "Collinear ⇒ area?", answer: "\\(0\\)" },
        { prompt: "Area of \\((0,0),(4,0),(0,3)\\)?", answer: "\\(6\\)" },
        { prompt: "What test does the area determinant double as?", answer: "Collinearity" },
      ],
      pyqExampleId: "ca6224a6-3158-4e62-bcbd-df4488cfc7cd", // area of triangle (vertices)
    },

    {
      kind: "formula" as const,
      slug: "lines-triangle-centres",
      name: "Centroid, incentre, circumcentre",
      intuition:
        "Each triangle centre has a formula: the centroid is the plain average of the vertices; the incentre is the side-length-weighted average; the circumcentre is equidistant from all three vertices (intersection of perpendicular bisectors).",
      definition:
        "- **Centroid:** \\(\\left(\\dfrac{x_1+x_2+x_3}{3},\\dfrac{y_1+y_2+y_3}{3}\\right)\\).\n" +
        "- **Incentre:** \\(\\dfrac{a\\,A+b\\,B+c\\,C}{a+b+c}\\), with \\(a,b,c\\) the side lengths opposite \\(A,B,C\\).\n" +
        "- **Circumcentre:** equidistant from all vertices — solve two perpendicular-bisector equations (for a right triangle it is the hypotenuse's midpoint).",
      formula: {
        label: "Centroid and incentre",
        latex:
          "G=\\left(\\dfrac{x_1+x_2+x_3}{3},\\dfrac{y_1+y_2+y_3}{3}\\right)\\qquad I=\\dfrac{a\\,A+b\\,B+c\\,C}{a+b+c}",
      },
      traps: [
        {
          title: "Centroid is the **plain** average; the incentre weights by the **opposite side lengths** \\(a,b,c\\)",
          body:
            "The **centroid** \\(G\\) is the unweighted average of the three vertices, \\(\\left(\\tfrac{x_1+x_2+x_3}{3},\\tfrac{y_1+y_2+y_3}{3}\\right)\\). The **incentre** is *not* that average — it is the side-length-weighted average \\(\\dfrac{aA+bB+cC}{a+b+c}\\), where \\(a,b,c\\) are the lengths of the sides **opposite** vertices \\(A,B,C\\). Using equal weights for the incentre (or pairing a side with its adjacent vertex) is the usual mistake; the two centres coincide only for an equilateral triangle.",
        },
      ],
      authoredExample: {
        prompt: "Find the centroid of the triangle with vertices \\((1,2),(3,4),(5,0)\\).",
        steps: [
          "\\(\\left(\\dfrac{1+3+5}{3},\\dfrac{2+4+0}{3}\\right)\\).",
        ],
        answer: "\\((3,2)\\).",
      },
      selfCheckExample: {
        prompt: "Find the incentre of the equilateral triangle with vertices \\(A(1,1),B(0,\\,\\cdots)\\) where all sides equal — what coincides with what?",
        steps: [
          "For an equilateral triangle, \\(a=b=c\\), so the incentre formula reduces to the centroid.",
          "Incentre \\(=\\) centroid \\(=\\) average of the vertices.",
        ],
        answer: "Incentre \\(=\\) centroid (all centres coincide for an equilateral triangle).",
      },
      practiceSet: [
        { prompt: "Centroid formula?", answer: "Average of the three vertices" },
        { prompt: "Incentre weights are?", answer: "The side lengths \\(a,b,c\\)" },
        { prompt: "Circumcentre of a right triangle?", answer: "Midpoint of the hypotenuse" },
        { prompt: "For an equilateral triangle the incentre equals?", answer: "The centroid" },
      ],
      pyqExampleId: "9754b891-002d-4945-893b-1f6975a39337", // incentre
    },

    {
      kind: "formula" as const,
      slug: "lines-triangle-construction",
      name: "Constructing a triangle: vertices, medians, altitudes",
      intuition:
        "Many questions give partial data — midpoints, a median, an altitude — and ask for a vertex or a side's equation. Use midpoint and section relations to recover vertices, and slope/perpendicularity for altitudes and bisectors.",
      definition:
        "Recover vertices from midpoints: if \\(M\\) is the midpoint of \\(BC\\), then \\(B+C=2M\\). An **altitude** from a vertex is perpendicular to the opposite side (use negative-reciprocal slope through the vertex). Special triangles: an equilateral/isosceles condition fixes the third vertex (often via rotation or equal-distance). The third vertex of an equilateral triangle on a given base has irrational coordinates in general.",
      formula: {
        label: "Vertex from a midpoint",
        latex: "B+C=2M\\qquad C=2M-B",
      },
      traps: [
        {
          title: "An **altitude** is perpendicular to the opposite side — use the **negative-reciprocal** slope",
          body:
            "The altitude from a vertex is **perpendicular** to the opposite side, so its slope is the **negative reciprocal** of that side's slope (not the same slope, which would be parallel, and not the side's own slope). To recover a vertex from a midpoint, use \\(B+C=2M\\Rightarrow C=2M-B\\) — i.e. \\(2M-B\\), not \\(M-B\\); the factor of \\(2\\) is essential because \\(M\\) is the *average* of \\(B\\) and \\(C\\).",
        },
      ],
      authoredExample: {
        prompt: "Two vertices of a triangle are \\(B(-5,-1)\\) and \\(C(9,3)\\). Find the midpoint of \\(BC\\).",
        steps: [
          "Midpoint \\(=\\left(\\dfrac{-5+9}{2},\\dfrac{-1+3}{2}\\right)\\).",
        ],
        answer: "\\((2,1)\\).",
      },
      selfCheckExample: {
        prompt: "The midpoint of side \\(BC\\) of a triangle is \\(M(4,2)\\) and \\(B=(1,3)\\). Find \\(C\\).",
        steps: [
          "\\(B+C=2M\\Rightarrow C=2M-B\\).",
          "\\(C=(8-1,\\,4-3)=(7,1)\\).",
        ],
        answer: "\\(C=(7,1)\\).",
      },
      practiceSet: [
        { prompt: "If \\(M\\) is the midpoint of \\(BC\\), then \\(B+C=\\)?", answer: "\\(2M\\)" },
        { prompt: "An altitude is perpendicular to?", answer: "The opposite side" },
        { prompt: "Recover \\(B\\) from midpoint \\(M\\) of \\(AB\\) and vertex \\(A\\)?", answer: "\\(B=2M-A\\)" },
        { prompt: "Slope of an altitude vs the opposite side?", answer: "Negative reciprocal" },
      ],
      pyqExampleId: "85ae48f2-19c6-4d3d-9216-c75325517824", // midpoints → vertices/centroid
    },

    {
      kind: "formula" as const,
      slug: "lines-quadrilaterals",
      name: "Parallelograms, squares and diagonals",
      intuition:
        "Quadrilateral problems lean on two facts: in a parallelogram the diagonals bisect each other (so the fourth vertex is \\(D=A+C-B\\)), and the diagonals' intersection is their common midpoint. Areas come from the cross-product of adjacent side vectors.",
      definition:
        "**Parallelogram \\(ABCD\\):** diagonals bisect each other ⇒ \\(A+C=B+D\\), so \\(D=A+C-B\\); the diagonals meet at the midpoint of either. **Area** \\(=|\\,\\vec{AB}\\times\\vec{AD}\\,|=|x_1y_2-x_2y_1|\\) for the side vectors. A **square/rectangle** from two given parallel sides uses the perpendicular distance for the side length.",
      formula: {
        label: "Parallelogram: fourth vertex and area",
        latex:
          "A+C=B+D\\qquad D=A+C-B\\qquad \\text{Area}=|x_1y_2-x_2y_1|",
      },
      traps: [
        {
          title: "In parallelogram \\(ABCD\\) the diagonals are \\(AC\\) and \\(BD\\): \\(A+C=B+D\\)",
          body:
            "The diagonals of \\(ABCD\\) join **opposite** vertices — \\(AC\\) and \\(BD\\) — and they bisect each other, so the midpoints match: \\(A+C=B+D\\), giving \\(D=A+C-B\\). The slip is pairing **adjacent** vertices (e.g. computing \\(A+B\\)); the order of the labels around the parallelogram tells you which pairs are diagonals. Get the pairing wrong and the 'fourth vertex' is misplaced.",
        },
      ],
      authoredExample: {
        prompt: "Three consecutive vertices of a parallelogram are \\(A(1,2),B(4,3),C(6,6)\\). Find \\(D\\).",
        steps: [
          "\\(D=A+C-B=(1+6-4,\\ 2+6-3)\\).",
        ],
        answer: "\\((3,5)\\).",
      },
      selfCheckExample: {
        prompt: "Find the area of the parallelogram with \\(\\vec{AB}=(-2,-1)\\) and \\(\\vec{AD}=(4,3)\\).",
        steps: [
          "Area \\(=|x_1y_2-x_2y_1|=|(-2)(3)-(-1)(4)|=|-6+4|\\).",
        ],
        answer: "\\(2\\).",
      },
      practiceSet: [
        { prompt: "Fourth vertex of parallelogram \\(ABCD\\)?", answer: "\\(D=A+C-B\\)" },
        { prompt: "Diagonals of a parallelogram do what?", answer: "Bisect each other" },
        { prompt: "Parallelogram area from side vectors?", answer: "\\(|x_1y_2-x_2y_1|\\)" },
        { prompt: "Diagonals meet at the ___ of each diagonal.", answer: "Midpoint" },
      ],
      pyqExampleId: "c343981a-30ac-444a-a8a5-24ba5afb1195", // parallelogram fourth vertex
    },
  ],
  related: [
    { label: "Angle, Parallel & Perpendicular", href: "/notes/nda-maths/lines/lines-angle-parallel-perp" },
    { label: "Equations & Slope", href: "/notes/nda-maths/lines/lines-equation-slope" },
  ],
};
