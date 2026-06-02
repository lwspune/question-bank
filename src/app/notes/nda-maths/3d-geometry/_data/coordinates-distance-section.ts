import type { SubtopicNote } from "@/app/notes/_types";

export const COORDINATES_DISTANCE_SECTION_NOTE: SubtopicNote = {
  subtopicName: "Distance, Section, and Collinearity in 3D",
  title: "Foundations: Coordinates, Distance & Section in Space",
  oneLineDefinition:
    "Locate points with three coordinates, then measure between them — distance, the dividing point of a segment, midpoints, centroids, and whether points line up.",
  whyItMatters:
    "Twenty PYQs across 2017–2026, and the launch pad for everything else in the chapter. " +
    "Questions test the octant/coordinate-plane setup, the distance formula, the section " +
    "formula (especially the ratio in which a coordinate plane cuts a segment), centroids, " +
    "and collinearity / shape tests. Six EASY marks live here every other paper — internalise " +
    "these five concepts and you bank them on sight.",
  concepts: [
    // C1 — coordinate system + octants (REFERENCE)
    {
      kind: "reference" as const,
      slug: "coordinate-system-octants",
      name: "The 3D coordinate frame — axes, planes, and octants",
      intuition:
        "Add a third axis (the z-axis) straight up out of the familiar xy-plane. Now every " +
        "point needs three numbers \\((x, y, z)\\). The three axes are mutually perpendicular " +
        "and meet at the origin; the three coordinate planes (XY, YZ, ZX) slice all of space " +
        "into eight corner regions called octants — the 3D version of the four quadrants.",
      definition:
        "A point in space is an ordered triple \\((x, y, z)\\). The three **coordinate planes** are:\n" +
        "- **XY-plane:** all points with \\(z = 0\\).\n" +
        "- **YZ-plane:** all points with \\(x = 0\\).\n" +
        "- **ZX-plane:** all points with \\(y = 0\\).\n" +
        "These three planes divide space into **8 octants**. The first octant holds points with all three coordinates positive. A point on an axis has its other two coordinates zero; a point on a coordinate plane has exactly one coordinate zero.",
      visualizationSlug: "octants-coordinate-planes",
      table: {
        columns: ["Location", "Condition", "Example point"],
        rows: [
          { cells: ["On the x-axis", "\\(y = 0,\\ z = 0\\)", "\\((5, 0, 0)\\)"] },
          { cells: ["On the XY-plane", "\\(z = 0\\)", "\\((3, -2, 0)\\)"] },
          { cells: ["On the YZ-plane", "\\(x = 0\\)", "\\((0, 4, 1)\\)"] },
          {
            cells: ["In the first octant", "\\(x, y, z > 0\\)", "\\((2, 3, 4)\\)"],
            noteAmber:
              "The three coordinate planes (not the three axes) are what divide space — that gives 8 octants, not 6.",
          },
        ],
        caption:
          "Zero coordinates tell you where a point sits: one zero → on a plane, two zeros → on an axis.",
      },
      selfCheckExample: {
        prompt:
          "How many octants do the three coordinate planes divide space into, and how many regions do the two axes of a single plane divide that plane into?",
        steps: [
          "In 2D, the two axes split the plane into 4 quadrants.",
          "In 3D, the three coordinate planes each split space in two; together they create \\(2 \\times 2 \\times 2 = 8\\) regions.",
          "Those regions are the octants.",
        ],
        answer: "8 octants in space; 4 quadrants in a plane.",
      },
      practiceSet: [
        { prompt: "Into how many octants do the coordinate planes divide space?", answer: "8" },
        { prompt: "A point \\((0, 5, -2)\\) lies on which coordinate plane?", answer: "YZ-plane", method: "its x-coordinate is 0" },
        { prompt: "On which axis does \\((0, 0, 7)\\) lie?", answer: "z-axis", method: "only the z-coordinate is non-zero" },
        { prompt: "How many coordinates of a point on the x-axis are zero?", answer: "Two (y and z)" },
      ],
      pyqExampleId: "178b8a82-93c4-4221-b030-2e9f5a7eabe6", // 2020 — how many compartments
    },

    // C2 — distance formula
    {
      kind: "formula" as const,
      slug: "distance-formula",
      name: "Distance between two points",
      intuition:
        "The straight-line distance between two points in space is just Pythagoras done " +
        "twice: take the differences in \\(x\\), \\(y\\), and \\(z\\), square them, add, and " +
        "square-root. To find a point's distance from a coordinate axis, drop the coordinate " +
        "measured along that axis and take the distance of what's left.",
      definition:
        "For \\(A(x_1, y_1, z_1)\\) and \\(B(x_2, y_2, z_2)\\), the distance \\(AB\\) is the " +
        "square root of the summed squared coordinate differences. Distance from a point to the " +
        "**x-axis** is \\(\\sqrt{y^2 + z^2}\\) (ignore \\(x\\)); similarly \\(\\sqrt{x^2+z^2}\\) " +
        "from the y-axis and \\(\\sqrt{x^2+y^2}\\) from the z-axis.",
      formula: {
        label: "Distance between two points",
        latex: "AB = \\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2 + (z_2-z_1)^2}",
        symbols: [
          { symbol: "\\((x_1,y_1,z_1)\\)", meaning: "coordinates of \\(A\\)" },
          { symbol: "\\((x_2,y_2,z_2)\\)", meaning: "coordinates of \\(B\\)" },
        ],
      },
      visualizationSlug: "magnitude-right-triangle",
      authoredExample: {
        prompt: "Find the distance between \\(A(1, -2, 3)\\) and \\(B(4, 2, 15)\\).",
        steps: [
          "Differences: \\(\\Delta x = 4-1 = 3,\\ \\Delta y = 2-(-2) = 4,\\ \\Delta z = 15-3 = 12\\).",
          "Square and add: \\(3^2 + 4^2 + 12^2 = 9 + 16 + 144 = 169\\).",
          "Square root: \\(\\sqrt{169} = 13\\).",
        ],
        answer: "\\(AB = 13\\).",
      },
      selfCheckExample: {
        prompt: "What is the perpendicular distance from the point \\((2, 3, 4)\\) to the x-axis?",
        steps: [
          "Distance to the x-axis ignores the x-coordinate: use \\(\\sqrt{y^2 + z^2}\\).",
          "\\(\\sqrt{3^2 + 4^2} = \\sqrt{9 + 16} = \\sqrt{25}\\).",
        ],
        answer: "\\(5\\).",
      },
      practiceSet: [
        { prompt: "Distance between \\((0,0,0)\\) and \\((2,3,6)\\)?", answer: "\\(7\\)", method: "\\(\\sqrt{4+9+36}=\\sqrt{49}\\)" },
        { prompt: "Distance between \\((1,0,0)\\) and \\((1,4,3)\\)?", answer: "\\(5\\)" },
        { prompt: "Distance from \\((3,4,12)\\) to the origin?", answer: "\\(13\\)", method: "\\(\\sqrt{9+16+144}\\)" },
        { prompt: "Distance from \\((0,6,8)\\) to the y-axis?", answer: "\\(8\\)", method: "\\(\\sqrt{x^2+z^2}=\\sqrt{0+64}\\)" },
      ],
      pyqExampleId: "778decc7-566f-43ea-8764-a3fdbd6d5274", // 2020 — perp distance point to x-axis
    },

    // C3 — section formula
    {
      kind: "formula" as const,
      slug: "section-formula",
      name: "Section formula — dividing a segment in a ratio",
      intuition:
        "A point that splits a segment \\(AB\\) in the ratio \\(m:n\\) is a weighted average of " +
        "the endpoints — the nearer endpoint gets the larger weight. The classic NDA twist asks " +
        "in what ratio a coordinate plane cuts a segment: set the relevant coordinate of the " +
        "dividing point to zero and solve for the ratio.",
      definition:
        "The point dividing \\(A(x_1,y_1,z_1)\\) and \\(B(x_2,y_2,z_2)\\) internally in ratio " +
        "\\(m:n\\) has each coordinate as the weighted mean below. For **external** division, " +
        "replace \\(n\\) with \\(-n\\). To find where the **XY-plane** (\\(z=0\\)) cuts \\(AB\\), " +
        "set the \\(z\\)-coordinate of the dividing point to 0: the ratio is \\(-z_1 : z_2\\) " +
        "(equivalently \\(z_1 : z_2\\) externally / internally depending on signs).",
      formula: {
        label: "Internal division in ratio m : n",
        latex:
          "\\left( \\frac{m x_2 + n x_1}{m+n},\\ \\frac{m y_2 + n y_1}{m+n},\\ \\frac{m z_2 + n z_1}{m+n} \\right)",
        symbols: [
          { symbol: "\\(m:n\\)", meaning: "ratio in which the point divides \\(AB\\)" },
          { symbol: "\\(A, B\\)", meaning: "the two endpoints" },
        ],
      },
      visualizationSlug: "section-formula",
      authoredExample: {
        prompt:
          "In what ratio does the XY-plane divide the segment joining \\((1, 2, 4)\\) and \\((3, -1, 2)\\)?",
        steps: [
          "The XY-plane is \\(z = 0\\). Let it divide \\(AB\\) in ratio \\(k:1\\).",
          "The \\(z\\)-coordinate of the dividing point is \\(\\dfrac{k(2) + 1(4)}{k+1}\\).",
          "Set it to 0: \\(2k + 4 = 0 \\Rightarrow k = -2\\).",
          "A negative ratio means external division: the plane divides \\(AB\\) externally in \\(2:1\\).",
        ],
        answer: "Externally in the ratio \\(2 : 1\\).",
      },
      selfCheckExample: {
        prompt:
          "Find the coordinates of the point dividing \\(A(1, -2, 3)\\) and \\(B(3, 4, -5)\\) internally in the ratio \\(1 : 1\\).",
        steps: [
          "Ratio \\(1:1\\) is just the midpoint — average each coordinate.",
          "\\(x = \\tfrac{1+3}{2} = 2,\\ y = \\tfrac{-2+4}{2} = 1,\\ z = \\tfrac{3+(-5)}{2} = -1\\).",
        ],
        answer: "\\((2, 1, -1)\\).",
      },
      practiceSet: [
        { prompt: "Point dividing \\((0,0,0)\\) and \\((6,9,3)\\) in ratio \\(2:1\\)?", answer: "\\((4,6,2)\\)", method: "weighted mean, B-weight 2" },
        { prompt: "The XY-plane cuts a segment where which coordinate is set to?", answer: "\\(z = 0\\)" },
        { prompt: "Midpoint of \\((2,4,6)\\) and \\((4,8,10)\\)?", answer: "\\((3,6,8)\\)" },
        { prompt: "In ratio \\(k:1\\), the YZ-plane gives which equation?", answer: "x-coordinate of divider \\(= 0\\)" },
      ],
      pyqExampleId: "b70487e2-2f6b-4e1d-bf07-70ec9597547a", // 2021 — xy-plane divides segment
    },

    // C4 — midpoint + centroid
    {
      kind: "formula" as const,
      slug: "midpoint-centroid",
      name: "Midpoint and centroid",
      intuition:
        "The midpoint averages two points; the centroid of a triangle averages its three " +
        "vertices. Both are just coordinate-wise means — no ratio bookkeeping. The centroid " +
        "is the triangle's balance point and divides each median \\(2:1\\).",
      definition:
        "The **midpoint** of \\(A\\) and \\(B\\) averages the two coordinate triples. The " +
        "**centroid** \\(G\\) of triangle \\(ABC\\) averages all three vertices: each coordinate " +
        "of \\(G\\) is the mean of that coordinate over \\(A, B, C\\).",
      formula: {
        label: "Centroid of triangle ABC",
        latex:
          "G = \\left( \\frac{x_1+x_2+x_3}{3},\\ \\frac{y_1+y_2+y_3}{3},\\ \\frac{z_1+z_2+z_3}{3} \\right)",
      },
      visualizationSlug: "triangle-centroid",
      authoredExample: {
        prompt:
          "Find the centroid of the triangle with vertices \\(A(1,2,3)\\), \\(B(4,-1,0)\\) and \\(C(7,2,3)\\).",
        steps: [
          "Average the x-coordinates: \\((1+4+7)/3 = 12/3 = 4\\).",
          "Average the y-coordinates: \\((2-1+2)/3 = 3/3 = 1\\).",
          "Average the z-coordinates: \\((3+0+3)/3 = 6/3 = 2\\).",
        ],
        answer: "\\(G = (4, 1, 2)\\).",
      },
      selfCheckExample: {
        prompt: "The midpoint of \\(A\\) and \\(B(4, 2, 8)\\) is \\((3, 1, 5)\\). Find \\(A\\).",
        steps: [
          "Midpoint = average, so \\(A = 2 \\times \\text{midpoint} - B\\).",
          "\\(x: 2(3) - 4 = 2;\\ y: 2(1) - 2 = 0;\\ z: 2(5) - 8 = 2\\).",
        ],
        answer: "\\(A = (2, 0, 2)\\).",
      },
      practiceSet: [
        { prompt: "Centroid of \\((0,0,0),(3,0,0),(0,3,3)\\)?", answer: "\\((1,1,1)\\)" },
        { prompt: "Midpoint of \\((1,2,3)\\) and \\((5,6,7)\\)?", answer: "\\((3,4,5)\\)" },
        { prompt: "The centroid divides each median in what ratio (vertex : base)?", answer: "\\(2:1\\)" },
        { prompt: "Centroid of \\((2,2,2),(4,4,4),(6,6,6)\\)?", answer: "\\((4,4,4)\\)" },
      ],
      pyqExampleId: "81c9837f-ad35-46a9-9985-ba2717c0ccaa", // 2019 — centroid of triangle
    },

    // C5 — collinearity + shapes
    {
      kind: "formula" as const,
      slug: "collinearity-and-shapes",
      name: "Collinearity and shape tests",
      intuition:
        "Three points are collinear when one segment is a scalar multiple of another — same " +
        "direction ratios — or, equivalently, when the longest distance equals the sum of the " +
        "other two. The same distance toolkit classifies triangles (right-angled, isosceles) and " +
        "quadrilaterals (rectangle, parallelogram): compute side lengths and diagonals and compare.",
      definition:
        "**Collinearity:** \\(A, B, C\\) are collinear iff \\(\\overrightarrow{AB}\\) and " +
        "\\(\\overrightarrow{AC}\\) have proportional components, i.e. the same direction ratios. " +
        "Distance check: collinear iff \\(AB + BC = AC\\) (for \\(B\\) between).\n" +
        "**Shapes:** a triangle is right-angled where two sides satisfy Pythagoras; a parallelogram " +
        "has equal, bisecting diagonals (midpoint of one diagonal = midpoint of the other); a " +
        "rectangle additionally has equal diagonals.",
      authoredExample: {
        prompt:
          "If the points \\(A(1, -1, 2)\\), \\(B(3, k, 4)\\) and \\(C(5, 3, 6)\\) are collinear, find \\(k\\).",
        steps: [
          "Direction ratios of \\(\\overrightarrow{AC} = C - A = \\langle 4, 4, 4\\rangle\\), i.e. \\(\\langle 1,1,1\\rangle\\).",
          "Direction ratios of \\(\\overrightarrow{AB} = B - A = \\langle 2,\\ k+1,\\ 2\\rangle\\).",
          "For collinearity these are proportional: \\(\\dfrac{2}{1} = \\dfrac{k+1}{1} = \\dfrac{2}{1} = 2\\).",
          "So \\(k + 1 = 2 \\Rightarrow k = 1\\).",
        ],
        answer: "\\(k = 1\\).",
      },
      selfCheckExample: {
        prompt:
          "Show whether \\(A(1,2,3)\\), \\(B(2,3,4)\\), \\(C(4,5,6)\\) are collinear using direction ratios.",
        steps: [
          "\\(\\overrightarrow{AB} = \\langle 1,1,1\\rangle\\).",
          "\\(\\overrightarrow{AC} = \\langle 3,3,3\\rangle = 3\\langle 1,1,1\\rangle\\).",
          "Same direction ratios → the points are collinear.",
        ],
        answer: "Collinear — \\(\\overrightarrow{AC} = 3\\,\\overrightarrow{AB}\\).",
      },
      practiceSet: [
        { prompt: "Are \\(\\langle 2,4,6\\rangle\\) and \\(\\langle 1,2,3\\rangle\\) proportional?", answer: "Yes", method: "first is twice the second" },
        { prompt: "Collinearity by distance: which equation holds for B between A and C?", answer: "\\(AB + BC = AC\\)" },
        { prompt: "A parallelogram's diagonals do what?", answer: "Bisect each other", method: "midpoints coincide" },
        { prompt: "A right angle at B means which sides satisfy Pythagoras?", answer: "\\(AB^2 + BC^2 = AC^2\\)" },
      ],
      pyqExampleId: "fb9a92e4-4b7f-4dd9-8d70-937a8d510b11", // 2019 — collinear, find x,y
      traps: [
        {
          title: "Collinear vs coplanar vs concyclic",
          body:
            "NDA likes asking whether four points are collinear, coplanar, or form a specific shape. " +
            "Three points are ALWAYS coplanar; the real test is collinearity (proportional direction ratios). " +
            "For four points, check coplanarity via the scalar triple product of three edge vectors = 0.",
        },
      ],
    },
  ],
};
