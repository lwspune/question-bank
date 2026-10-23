import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_CG_POINTS_NOTE: SubtopicNote = {
  subtopicName: "Distance, Section Formula and Area",
  title: "Distance, Section Formula and Area",
  oneLineDefinition:
    "Work with points alone: how far apart two points are, the point halfway between them, the centroid of a triangle, and the area of a triangle from its three corners.",
  whyItMatters:
    "Seven questions in the bank, five EASY and two MODERATE, all from the 2025 shifts. Four are about the midpoint or the centroid, often run backwards to find a missing corner. Each is one formula applied once, so the only real risk is a sign slip with a negative coordinate.",
  related: [{ label: "Triangles: centres of a triangle", href: "/notes/ssc-cgl-maths/triangles/ssc-tr-centres" }],
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssccgpt-distance",
      name: "Distance between two points",
      intuition:
        "Join the two points and drop a horizontal and a vertical line to make a right triangle. The across-gap and the up-gap are its two legs, and the distance is the hypotenuse, so it is Pythagoras on the coordinate grid.",
      definition:
        "- The across-gap is \\(x_2 - x_1\\) and the up-gap is \\(y_2 - y_1\\). Square each, add, take the square root.\n" +
        "- The order of the points does not matter: squaring removes any minus sign.\n" +
        "- From the origin to \\((x, y)\\) the distance is \\(\\sqrt{x^2 + y^2}\\).\n" +
        "- **Fast route:** if the two gaps are a known triple, read the answer. Gaps 3 and 4 give 5, 5 and 12 give 13, 8 and 15 give 17, 7 and 24 give 25, and any multiple of these works too (6 and 8 give 10). If the gaps match no triple, square and add.",
      formula: {
        label: "Distance formula",
        latex: "d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2} \\qquad d_{\\text{origin}} = \\sqrt{x^2 + y^2}",
      },
      authoredExample: {
        prompt: "Find the distance between \\(P(-2, 3)\\) and \\(Q(4, -5)\\).",
        steps: [
          "Across-gap: \\(4 - (-2) = 6\\). Up-gap: \\(-5 - 3 = -8\\).",
          "\\(d = \\sqrt{6^2 + (-8)^2} = \\sqrt{36 + 64} = \\sqrt{100} = 10\\).",
          "Fast route: 6 and 8 are twice 3 and 4, so the distance is twice 5.",
        ],
        answer: "10",
      },
      selfCheckExample: {
        prompt: "How far is the point \\((-8, 15)\\) from the origin?",
        steps: ["\\(\\sqrt{(-8)^2 + 15^2} = \\sqrt{64 + 225} = \\sqrt{289} = 17\\)."],
        answer: "17",
      },
      practiceSet: [
        { prompt: "Find the distance between \\((0, 0)\\) and \\((7, 24)\\).", answer: "25" },
        { prompt: "Find the distance between \\((2, -1)\\) and \\((2, 9)\\).", answer: "10", method: "Same \\(x\\), so the distance is the up-gap alone: \\(9 - (-1) = 10\\)." },
        { prompt: "Find the distance between \\((-3, 4)\\) and \\((9, -1)\\).", answer: "13", method: "Gaps 12 and 5: \\(\\sqrt{144 + 25} = 13\\)." },
        { prompt: "The point \\((0, y)\\) with \\(y > 0\\) is 10 units from \\((6, 0)\\). Find \\(y\\).", answer: "8", method: "\\(36 + y^2 = 100\\), so \\(y^2 = 64\\)." },
      ],
      pyqExampleId: "11bd3e72-d5d2-418a-aa76-5e799ed48f4a",
      traps: [
        {
          title: "Losing the minus sign when a coordinate is negative",
          body:
            "The gap between \\(x = -2\\) and \\(x = 4\\) is \\(4 - (-2) = 6\\), not 2. Write the subtraction with brackets whenever a coordinate is negative.",
        },
        {
          title: "Adding the gaps instead of squaring them",
          body:
            "Gaps of 3 and 4 give a distance of 5, not 7. The distance is the square root of the sum of the squares of the gaps, never the plain sum.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssccgpt-midpoint",
      name: "Midpoint, section formula and centroid",
      intuition:
        "The midpoint is the average of the two ends, coordinate by coordinate. The centroid of a triangle is the average of its three corners. Both are averages, so a missing point comes back by multiplying out and subtracting.",
      definition:
        "- **Midpoint** of \\((x_1, y_1)\\) and \\((x_2, y_2)\\): average the x values and average the y values.\n" +
        "- **Section formula:** the point dividing the segment in the ratio \\(m : n\\) from the first point is a weighted average, with weight \\(m\\) on the second point and \\(n\\) on the first. The midpoint is the case \\(1 : 1\\).\n" +
        "- **Centroid** of a triangle: the average of the three corners. It lies on each median and divides it \\(2 : 1\\) from the corner, so with corner A and midpoint D of the opposite side, \\(G = \\frac{A + 2D}{3}\\).\n" +
        "- **Missing corner, fast route:** \\(x_3 = 3x_G - x_1 - x_2\\), and the same for \\(y\\). A missing end of a segment: \\(x_2 = 2x_M - x_1\\).\n" +
        "- **Right triangle:** the point at the same distance from all three corners (the circumcentre) is the midpoint of the hypotenuse. This holds only when the triangle has a right angle.",
      formula: {
        label: "Midpoint, section point and centroid",
        latex:
          "M = \\left(\\frac{x_1 + x_2}{2}, \\frac{y_1 + y_2}{2}\\right) \\qquad P = \\left(\\frac{m x_2 + n x_1}{m + n}, \\frac{m y_2 + n y_1}{m + n}\\right) \\qquad G = \\left(\\frac{x_1 + x_2 + x_3}{3}, \\frac{y_1 + y_2 + y_3}{3}\\right)",
        symbols: [
          { symbol: "m : n", meaning: "the ratio in which P divides the segment, measured from the first point" },
          { symbol: "G", meaning: "the centroid, where the three medians meet" },
        ],
      },
      authoredExample: {
        prompt:
          "A triangle has corners \\(A(0, 3)\\), \\(B(-3, 8)\\) and \\(C(9, -2)\\). Find the midpoint M of BC and the centroid G of the triangle.",
        steps: [
          "\\(M = \\left(\\frac{-3 + 9}{2}, \\frac{8 + (-2)}{2}\\right) = (3, 3)\\).",
          "\\(G = \\left(\\frac{0 - 3 + 9}{3}, \\frac{3 + 8 - 2}{3}\\right) = (2, 3)\\).",
          "Check with the median: \\(G = \\frac{A + 2M}{3} = \\left(\\frac{0 + 6}{3}, \\frac{3 + 6}{3}\\right) = (2, 3)\\).",
        ],
        answer: "M = (3, 3) and G = (2, 3)",
      },
      selfCheckExample: {
        prompt:
          "The centroid of a triangle is \\((-3, 7)\\), and two of its corners are \\((8, 10)\\) and \\((-9, 3)\\). Find the third corner.",
        steps: [
          "\\(x = 3(-3) - 8 - (-9) = -9 - 8 + 9 = -8\\).",
          "\\(y = 3(7) - 10 - 3 = 8\\).",
          "Check: \\(\\frac{8 - 9 - 8}{3} = -3\\) and \\(\\frac{10 + 3 + 8}{3} = 7\\).",
        ],
        answer: "\\((-8, 8)\\)",
      },
      practiceSet: [
        { prompt: "Find the midpoint of \\((-6, 1)\\) and \\((2, 9)\\).", answer: "\\((-2, 5)\\)" },
        { prompt: "\\(M(4, -1)\\) is the midpoint of AB, and A is \\((7, 3)\\). Find B.", answer: "\\((1, -5)\\)", method: "\\(B = (2 \\times 4 - 7, 2 \\times (-1) - 3)\\)." },
        { prompt: "Find the centroid of the triangle with corners \\((0, 0)\\), \\((9, 0)\\) and \\((0, 12)\\).", answer: "\\((3, 4)\\)" },
        {
          prompt: "In triangle ABC, A is \\((1, 7)\\) and the midpoint of BC is \\((4, 1)\\). Find the centroid.",
          answer: "\\((3, 3)\\)",
          method: "\\(G = \\frac{A + 2D}{3} = \\left(\\frac{1 + 8}{3}, \\frac{7 + 2}{3}\\right)\\).",
        },
        {
          prompt: "A triangle has corners \\((0, 0)\\), \\((8, 0)\\) and \\((0, 6)\\). Which point is at the same distance from all three corners?",
          answer: "\\((4, 3)\\)",
          method: "The right angle is at the origin, so the point is the midpoint of the hypotenuse from \\((8, 0)\\) to \\((0, 6)\\).",
        },
      ],
      pyqExampleId: "cdd95318-6133-416a-ae10-5c94c904cb38",
      traps: [
        {
          title: "Dividing by 2 for a centroid",
          body:
            "The centroid averages three corners, so the sum is divided by 3. Dividing by 2 gives a point that is not on any median.",
        },
        {
          title: "Taking the centroid one third of the way from the corner",
          body:
            "The centroid is two thirds of the way along a median from the corner, and one third of the way from the midpoint of the opposite side. The ratio from the corner is \\(2 : 1\\).",
        },
        {
          title: "Using the midpoint of the hypotenuse for any triangle",
          body:
            "The point equidistant from three corners is the midpoint of the longest side only in a right triangle. Check first that two sides lie along perpendicular lines, such as the two axes.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssccgpt-area",
      name: "Area of a triangle from its corners",
      intuition:
        "Three corners fix a triangle, so they fix its area. The formula is a criss-cross of the coordinates, and when the three points lie on one line the triangle is flat and the area comes out as zero.",
      definition:
        "- Multiply each x by the difference of the other two y values, taken in turn, add the three products, take the absolute value and halve it.\n" +
        "- **Fast route:** if one corner is the origin, the area is \\(\\frac{1}{2}|x_1 y_2 - x_2 y_1|\\) from the other two corners. If two sides lie along the axes, it is half the base times the height.\n" +
        "- **Collinear test:** three points lie on one straight line exactly when this area is 0.",
      formula: {
        label: "Area of a triangle from coordinates",
        latex: "\\text{Area} = \\frac{1}{2}\\left|x_1(y_2 - y_3) + x_2(y_3 - y_1) + x_3(y_1 - y_2)\\right|",
      },
      authoredExample: {
        prompt: "Find the area of the triangle with corners \\((1, -2)\\), \\((5, 1)\\) and \\((-1, 4)\\).",
        steps: [
          "\\(1(1 - 4) = -3\\), \\(5(4 - (-2)) = 30\\), \\(-1(-2 - 1) = 3\\).",
          "Sum: \\(-3 + 30 + 3 = 30\\).",
          "Area \\(= \\frac{1}{2} \\times 30 = 15\\) square units.",
        ],
        answer: "15 square units",
      },
      selfCheckExample: {
        prompt: "Do the points \\((0, 1)\\), \\((3, 10)\\) and \\((-2, -5)\\) lie on one straight line?",
        steps: [
          "\\(0(10 - (-5)) + 3(-5 - 1) + (-2)(1 - 10) = 0 - 18 + 18 = 0\\).",
          "The area is 0, so the three points are collinear.",
        ],
        answer: "Yes, they are collinear",
      },
      practiceSet: [
        { prompt: "Find the area of the triangle with corners \\((0, 0)\\), \\((8, 0)\\) and \\((0, 5)\\).", answer: "20 square units" },
        {
          prompt: "Find the area of the triangle with corners \\((0, 0)\\), \\((4, 1)\\) and \\((2, 5)\\).",
          answer: "9 square units",
          method: "\\(\\frac{1}{2}|4 \\times 5 - 2 \\times 1| = \\frac{18}{2}\\).",
        },
        { prompt: "Find the area of the triangle with corners \\((1, 1)\\), \\((5, 1)\\) and \\((5, 4)\\).", answer: "6 square units", method: "Base 4 along \\(y = 1\\), height 3." },
        {
          prompt: "For what value of \\(k\\) are the points \\((k, 0)\\), \\((0, 3)\\) and \\((2, 1)\\) collinear?",
          answer: "\\(k = 3\\)",
          method: "\\(k(3 - 1) + 0 + 2(0 - 3) = 2k - 6 = 0\\).",
        },
      ],
      pyqExampleId: "88f14dd2-64ef-4620-82b8-1a615015c253",
      traps: [
        {
          title: "Forgetting the half",
          body:
            "The bracket gives twice the area. An option equal to the full bracket is usually printed to catch the student who stops before halving.",
        },
        {
          title: "Reporting a negative area",
          body:
            "Going round the corners in the other order flips the sign of the bracket. Area is never negative: take the absolute value before halving.",
        },
      ],
    },
  ],
};
