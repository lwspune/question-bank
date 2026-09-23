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
        "First, what \\(aA+bB+cC\\) means: **do it one coordinate at a time**. The x-coordinate is " +
        "\\(ax_1+bx_2+cx_3\\), the y-coordinate is \\(ay_1+by_2+cy_3\\). Adding points, and multiplying a " +
        "point by a number, always works coordinate-wise in this chapter.\n" +
        "- **Centroid:** \\(\\left(\\dfrac{x_1+x_2+x_3}{3},\\dfrac{y_1+y_2+y_3}{3}\\right)\\) — the plain, unweighted average.\n" +
        "- **Incentre:** \\(\\dfrac{a\\,A+b\\,B+c\\,C}{a+b+c}\\), where \\(a,b,c\\) are the side lengths **opposite** \\(A,B,C\\). You must compute those three lengths first; they are the weights.\n" +
        "- **Circumcentre:** equidistant from all three vertices — solve two perpendicular-bisector equations. For a **right** triangle it is simply the midpoint of the hypotenuse.",
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
        // The INCENTRE is worked here, not the centroid. The centroid is a
        // plain average that the intuition line already gives away; the
        // incentre is the only centre in this concept with a mechanism, and it
        // was previously demonstrated nowhere — its self-check was broken and
        // its featured PYQ is equilateral, where the weights all coincide. So
        // the reader could finish this concept having never seen the weighted
        // average evaluated with unequal weights.
        prompt: "Find the incentre of the triangle with vertices \\(A(0,0)\\), \\(B(4,0)\\), \\(C(0,3)\\).",
        steps: [
          "The weights are the side lengths **opposite** each vertex. Opposite \\(A\\) is \\(BC\\): \\(a=\\sqrt{4^2+3^2}=5\\).",
          "Opposite \\(B\\) is \\(CA\\): \\(b=3\\). Opposite \\(C\\) is \\(AB\\): \\(c=4\\).",
          "\\(I=\\dfrac{aA+bB+cC}{a+b+c}=\\dfrac{5(0,0)+3(4,0)+4(0,3)}{12}=\\left(\\dfrac{12}{12},\\dfrac{12}{12}\\right)\\).",
        ],
        answer: "\\((1,1)\\).",
      },
      selfCheckExample: {
        prompt: "Find the centroid of the triangle with vertices \\((2,1)\\), \\((4,5)\\) and \\((6,3)\\).",
        steps: [
          "The centroid is the plain average — no weights.",
          "\\(\\left(\\dfrac{2+4+6}{3},\\dfrac{1+5+3}{3}\\right)\\).",
        ],
        answer: "\\((4,3)\\).",
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
        "- **Recover a vertex from a midpoint:** if \\(M\\) is the midpoint of \\(BC\\), then \\(B+C=2M\\), so \\(C=2M-B\\). The factor of \\(2\\) is the whole point — \\(M\\) is the *average* of \\(B\\) and \\(C\\).\n" +
        "- **A median** joins a vertex to the **midpoint of the opposite side**. So being given a median is being given a midpoint, and a midpoint hands you the missing vertex by the line above.\n" +
        "- **An altitude** from a vertex is **perpendicular** to the opposite side: its slope is the negative reciprocal of that side's slope, and it passes through the vertex.\n" +
        "- **Special triangles:** an equilateral or isosceles condition fixes the third vertex, usually through equal distances. The third vertex of an equilateral triangle on a given base generally has irrational coordinates.",
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
        // Demonstrates C = 2M - B, which IS this concept's technique. The old
        // worked example computed a midpoint instead (a restatement of the
        // previous block) and did it on B(-5,-1), C(9,3) — the exact two
        // vertices the featured PYQ asks the reader to derive, printed as
        // given data.
        prompt: "The midpoint of side \\(BC\\) of a triangle is \\(M(4,2)\\), and \\(B=(1,3)\\). Find \\(C\\).",
        steps: [
          "\\(M\\) is the average of \\(B\\) and \\(C\\), so \\(B+C=2M\\), giving \\(C=2M-B\\).",
          "\\(C=(8-1,\\;4-3)\\).",
        ],
        answer: "\\(C=(7,1)\\).",
      },
      selfCheckExample: {
        prompt: "In triangle \\(ABC\\), \\(A=(1,2)\\) and the midpoint of \\(AC\\) is \\((4,1)\\). Find \\(C\\).",
        steps: [
          "Same relation on side \\(AC\\): \\(C=2M-A\\).",
          "\\(C=(8-1,\\;2-2)\\).",
        ],
        answer: "\\(C=(7,0)\\).",
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
        "Quadrilateral problems lean on two facts: in a parallelogram the diagonals bisect each other (so the fourth vertex is \\(D=A+C-B\\)), and the diagonals' intersection is their common midpoint. The area comes from a small determinant built out of the two side vectors meeting at one corner.",
      definition:
        "- **Parallelogram \\(ABCD\\):** the diagonals join **opposite** vertices, \\(AC\\) and \\(BD\\), and they bisect each other. So \\(A+C=B+D\\), giving \\(D=A+C-B\\), and they meet at the midpoint of either.\n" +
        "- **Side vector:** the vector from \\(A\\) to \\(B\\) is just \\(B-A\\), computed coordinate by coordinate. Write \\(\\vec{AB}=(u_1,v_1)\\) and \\(\\vec{AD}=(u_2,v_2)\\) for the two sides meeting at \\(A\\).\n" +
        "- **Area** \\(=|u_1v_2-u_2v_1|\\). These are components of the two **side vectors** — note that everywhere else in this chapter \\((x_1,y_1)\\) means a **vertex**, so do not feed vertices into this formula.\n" +
        "- A **square or rectangle** built on two given parallel sides uses the perpendicular distance between them as the other side length.",
      formula: {
        label: "Parallelogram: fourth vertex and area",
        latex:
          "A+C=B+D\\qquad D=A+C-B\\qquad \\text{Area}=|u_1v_2-u_2v_1|",
        symbols: [
          { symbol: "\\(A,B,C,D\\)", meaning: "the vertices, labelled in order around the figure" },
          { symbol: "\\((u_1,v_1)\\)", meaning: "components of the side vector \\(\\vec{AB}=B-A\\)" },
          { symbol: "\\((u_2,v_2)\\)", meaning: "components of the side vector \\(\\vec{AD}=D-A\\)" },
        ],
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
        // Hands over VERTICES, not pre-computed vectors. The old self-check
        // supplied AB and AD ready-made, so the one step a reader actually
        // gets wrong — building a side vector from two vertices — was never
        // practised anywhere in the chapter.
        prompt:
          "\\(A(1,1)\\), \\(B(-1,0)\\) and \\(D(5,4)\\) are three vertices of a parallelogram \\(ABCD\\). Find its area.",
        steps: [
          "Side vectors at \\(A\\): \\(\\vec{AB}=B-A=(-2,-1)\\) and \\(\\vec{AD}=D-A=(4,3)\\).",
          "Area \\(=|u_1v_2-u_2v_1|=|(-2)(3)-(4)(-1)|=|-6+4|\\).",
        ],
        answer: "\\(2\\).",
      },
      practiceSet: [
        { prompt: "Fourth vertex of parallelogram \\(ABCD\\)?", answer: "\\(D=A+C-B\\)" },
        { prompt: "Diagonals of a parallelogram do what?", answer: "Bisect each other" },
        { prompt: "Parallelogram area from the two side vectors at a corner?", answer: "\\(|u_1v_2-u_2v_1|\\)" },
        { prompt: "How do you get the side vector \\(\\vec{AB}\\) from the vertices?", answer: "\\(B-A\\), coordinate by coordinate" },
      ],
      pyqExampleId: "c343981a-30ac-444a-a8a5-24ba5afb1195", // parallelogram fourth vertex
    },
  ],
  related: [
    { label: "Back: Distance, Section & Locus", href: "/notes/nda-maths/lines/lines-distance-section-locus" },
    { label: "Start again: Equations & Slope", href: "/notes/nda-maths/lines/lines-equation-slope" },
  ],
};
