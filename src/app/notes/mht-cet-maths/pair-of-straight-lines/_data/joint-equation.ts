import type { SubtopicNote } from "@/app/notes/_types";

export const JOINT_EQUATION_NOTE: SubtopicNote = {
  subtopicName: "Joint Equation of Two Lines — Product of Linear Factors and the Triangle They Form",
  title: "Joint Equation of Two Lines — Product of Linear Factors and the Triangle They Form",
  oneLineDefinition:
    "Multiply two linear equations to get the joint equation; factorise a joint equation to get the two lines back — and with a third line, the three lines bound a triangle whose vertices, centroid and circumcentre follow from the intersections.",
  whyItMatters:
    "12 PYQs at 17% HARD — the cheapest page in the chapter. Lines through the origin at 30° to the Y-axis (set twice), lines through a point parallel to the axis bisectors, the median-and-altitude pair from a vertex, two normal-form lines multiplied, and — the 2025 favourite — a factorable pair plus a third line forming a right triangle whose circumcentre or circumradius is asked. " +
    "The two HARD ones factorise a pair and then do triangle geometry; nothing here is beyond expanding a product.",
  concepts: [
    // 1 — product of two lines
    {
      kind: "formula" as const,
      slug: "cetpsl-joint-equation-as-a-product",
      name: "The Joint Equation Is the Product: (L₁)(L₂) = 0",
      intuition:
        "A point lies on line \\(L_1\\) or line \\(L_2\\) exactly when \\(L_1 \\cdot L_2 = 0\\). So the pair is written by multiplying, and for lines through the origin the result is homogeneous: \\(ax^2 + 2hxy + by^2 = 0\\).",
      definition:
        "- Lines through the origin at \\(30^\\circ\\) to the \\(Y\\)-axis make \\(60^\\circ\\) with the \\(X\\)-axis: slopes \\(\\pm\\sqrt3\\); \\((y - \\sqrt3 x)(y + \\sqrt3 x) = 0 \\Rightarrow 3x^2 - y^2 = 0\\). Lines forming an equilateral triangle with \\(y = 5\\) are the same pair.\n" +
        "- Through \\((-2, 3)\\) parallel to the axis bisectors (slopes \\(\\pm1\\)): \\((x - y + 5)(x + y - 1) = x^2 - y^2 + 4x + 6y - 5 = 0\\).\n" +
        "- Bisectors of the angles between \\(x = 5\\) and \\(y = 3\\): through \\((5, 3)\\) with slopes \\(\\pm1\\): \\((x - y - 2)(x + y - 8) = x^2 - y^2 - 10x + 6y + 16 = 0\\).\n" +
        "- Normal-form lines at unit distance with normals at \\(\\tfrac{\\pi}{4}\\) and \\(\\tfrac{3\\pi}{4}\\): \\(x + y = \\sqrt2\\) and \\(-x + y = \\sqrt2\\); product \\(x^2 - y^2 + 2\\sqrt2 y - 2 = 0\\).\n" +
        "- Median and altitude from \\(O\\) in \\(O(0,0)\\), \\(A(1,2)\\), \\(B(3,4)\\): median to \\((2, 3)\\) is \\(3x - 2y = 0\\), altitude perpendicular to \\(AB\\) (slope \\(1\\)) is \\(x + y = 0\\): \\(3x^2 + xy - 2y^2 = 0\\).",
      formula: {
        label: "Joint equation",
        latex:
          "(a_1x + b_1y + c_1)(a_2x + b_2y + c_2) = 0 \\qquad \\text{through the origin: } (y - m_1x)(y - m_2x) = 0",
      },
      authoredExample: {
        prompt: "Write the joint equation of the lines through \\((1, 2)\\) with slopes \\(2\\) and \\(-3\\).",
        steps: [
          "\\(y - 2 = 2(x - 1) \\Rightarrow 2x - y = 0\\); \\(y - 2 = -3(x - 1) \\Rightarrow 3x + y - 5 = 0\\).",
          "Product: \\((2x - y)(3x + y - 5) = 6x^2 - xy - y^2 - 10x + 5y = 0\\).",
        ],
        answer: "\\(6x^2 - xy - y^2 - 10x + 5y = 0\\)",
      },
      selfCheckExample: {
        prompt: "Write the joint equation of the lines through the origin making \\(45^\\circ\\) with the \\(X\\)-axis on either side.",
        steps: [
          "Slopes \\(\\pm1\\): \\((y - x)(y + x) = 0\\).",
        ],
        answer: "\\(x^2 - y^2 = 0\\)",
      },
      practiceSet: [
        {
          prompt: "Joint equation of \\(x = 0\\) and \\(y = 0\\)?",
          answer: "\\(xy = 0\\)",
        },
        {
          prompt: "Joint equation of \\(y = \\sqrt3 x\\) and \\(y = -\\sqrt3 x\\)?",
          answer: "\\(3x^2 - y^2 = 0\\)",
        },
        {
          prompt: "Joint equation of \\(x - y + 5 = 0\\) and \\(x + y - 1 = 0\\)?",
          answer: "\\(x^2 - y^2 + 4x + 6y - 5 = 0\\)",
        },
        {
          prompt: "Slopes of lines at \\(30^\\circ\\) to the \\(Y\\)-axis?",
          answer: "\\(\\pm\\sqrt3\\)",
        },
      ],
      pyqExampleId: "569e6d8e-97f4-47fe-9f0f-146ac7ac89f7",
      traps: [
        {
          title: "30° to the Y-axis read as slope tan 30°",
          body:
            "A line at \\(30^\\circ\\) to the \\(Y\\)-axis is at \\(60^\\circ\\) to the \\(X\\)-axis: slope \\(\\sqrt3\\), joint equation \\(3x^2 - y^2 = 0\\). Option \\(x^2 - 3y^2 = 0\\) is the \\(\\tan 30^\\circ\\) slip.",
        },
      ],
    },

    // 2 — factorising a pair
    {
      kind: "formula" as const,
      slug: "cetpsl-factorising-a-pair",
      name: "Factorising a Pair: Split the Middle Term, or Complete the Square",
      intuition:
        "A homogeneous pair factorises like a quadratic in \\(\\dfrac{y}{x}\\); a non-homogeneous pair often splits by grouping (\\(xy - x + y - 1 = (x + 1)(y - 1)\\)) or as a difference of squares after completing squares.",
      definition:
        "- \\(6x^2 + xy - y^2 = (2x + y)(3x - y)\\); \\(2x^2 - 5xy + 2y^2 = (2x - y)(x - 2y)\\); \\(x^2 - 4xy - 5y^2 = (x - 5y)(x + y)\\).\n" +
        "- \\(xy - x + y - 1 = (x + 1)(y - 1)\\): lines \\(x = -1\\), \\(y = 1\\), meeting at \\((-1, 1)\\). A third line \\(x + ky - 3 = 0\\) is concurrent with them iff it passes through that point: \\(k = 4\\).\n" +
        "- \\(xy + 2x + 2y + 4 = (x + 2)(y + 2)\\): the lines \\(x = -2\\), \\(y = -2\\).\n" +
        "- \\(x^2 - y^2 - 2x + 4y - 3 = (x - 1)^2 - (y - 2)^2 = (x + y - 3)(x - y + 1)\\) — complete both squares, then difference of squares.",
      formula: {
        label: "Factorising",
        latex:
          "ax^2 + 2hxy + by^2 = b(y - m_1x)(y - m_2x) \\qquad \\text{grouping: } xy + px + qy + pq = (x + q)(y + p)",
      },
      authoredExample: {
        prompt: "Factorise \\(3x^2 + 7xy + 2y^2 = 0\\) into two lines.",
        steps: [
          "\\(3x^2 + 6xy + xy + 2y^2 = 3x(x + 2y) + y(x + 2y) = (3x + y)(x + 2y)\\).",
        ],
        answer: "\\(3x + y = 0\\) and \\(x + 2y = 0\\)",
      },
      selfCheckExample: {
        prompt: "Find the point where the lines \\(xy - 3x + 2y - 6 = 0\\) meet.",
        steps: [
          "\\(x(y - 3) + 2(y - 3) = (x + 2)(y - 3)\\): lines \\(x = -2\\), \\(y = 3\\).",
        ],
        answer: "\\((-2, 3)\\)",
      },
      practiceSet: [
        {
          prompt: "Factorise \\(2x^2 - 5xy + 2y^2\\).",
          answer: "\\((2x - y)(x - 2y)\\)",
        },
        {
          prompt: "Factorise \\(xy - x + y - 1\\).",
          answer: "\\((x + 1)(y - 1)\\)",
        },
        {
          prompt: "Lines of \\(x^2 - y^2 - 2x + 4y - 3 = 0\\)?",
          answer: "\\(x + y = 3\\), \\(x - y = -1\\)",
        },
        {
          prompt: "Slopes of \\(6x^2 + xy - y^2 = 0\\)?",
          answer: "\\(-2\\) and \\(3\\)",
        },
      ],
      pyqExampleId: "7ce27103-5ee5-4af6-b9db-0dc46bbabb9a",
      traps: [
        {
          title: "Reading xy − x + y − 1 as a curve",
          body:
            "Any equation of the form \\(xy + px + qy + pq = 0\\) is two lines. Grouping finds them; treating it as a hyperbola sends you down the wrong chapter.",
        },
      ],
    },

    // 3 — triangle formed with a third line
    {
      kind: "formula" as const,
      slug: "cetpsl-triangle-formed-with-a-third-line",
      name: "The Triangle a Pair Makes With a Third Line: Vertices, Centroid, Median, Circumcentre",
      intuition:
        "Factorise the pair, intersect each factor with the third line, and the three vertices are known — the pair's own intersection is the third. Then the centroid is the average, the median joins a vertex to a midpoint, and a right angle puts the circumcentre at the midpoint of the hypotenuse.",
      definition:
        "- \\(6x^2 + xy - y^2 = 0\\) with \\(x + 3y = 10\\): lines \\(2x + y = 0\\), \\(3x - y = 0\\); vertices \\((0, 0)\\), \\((-2, 4)\\), \\((1, 3)\\); centroid \\(\\left(-\\tfrac13, \\tfrac73\\right)\\).\n" +
        "- \\(x^2 - 4xy + y^2 = 0\\) with \\(AB: 2x + 3y = 1\\): substitute \\(x = \\dfrac{1 - 3y}{2}\\) to get \\(37y^2 - 14y + 1 = 0\\); the midpoint of \\(AB\\) has \\(y = \\dfrac{7}{37}\\) (half the sum of roots) and \\(x = \\dfrac{8}{37}\\); the median from \\(O\\) is \\(7x - 8y = 0\\). No need to find \\(A\\) and \\(B\\) themselves.\n" +
        "- \\(xy + 2x + 2y + 4 = 0\\) (\\(x = -2\\), \\(y = -2\\)) with \\(x + y + 2 = 0\\): vertices \\((-2, -2)\\), \\((0, -2)\\), \\((-2, 0)\\), right angle at \\((-2, -2)\\); circumcentre is the midpoint of the hypotenuse \\((-1, -1)\\), circumradius \\(\\dfrac{2\\sqrt2}{2} = \\sqrt2\\).\n" +
        "- The midpoint-by-Vieta trick works for any pair through the origin: the two intersections with a line are the roots of one quadratic.",
      formula: {
        label: "Triangle from a pair",
        latex:
          "\\text{vertices: } O,\\ L_1 \\cap L_3,\\ L_2 \\cap L_3;\\qquad \\text{centroid} = \\frac{\\sum \\text{vertices}}{3}",
      },
      authoredExample: {
        prompt: "Find the centroid of the triangle formed by \\(x^2 - y^2 = 0\\) and \\(x = 3\\).",
        steps: [
          "Lines \\(y = x\\), \\(y = -x\\); vertices \\((0, 0)\\), \\((3, 3)\\), \\((3, -3)\\).",
          "Centroid \\(\\left(\\dfrac{0 + 3 + 3}{3}, \\dfrac{0 + 3 - 3}{3}\\right)\\).",
        ],
        answer: "\\((2, 0)\\)",
      },
      selfCheckExample: {
        prompt: "Find the circumradius of the triangle formed by \\(xy - 3x - 3y + 9 = 0\\) and \\(x + y = 9\\).",
        steps: [
          "\\((x - 3)(y - 3) = 0\\): lines \\(x = 3\\), \\(y = 3\\); vertices \\((3, 3)\\), \\((3, 6)\\), \\((6, 3)\\); right angle at \\((3, 3)\\).",
          "Hypotenuse from \\((3, 6)\\) to \\((6, 3)\\) has length \\(3\\sqrt2\\); circumradius \\(\\dfrac{3\\sqrt2}{2}\\).",
        ],
        answer: "\\(\\dfrac{3\\sqrt2}{2}\\)",
      },
      practiceSet: [
        {
          prompt: "Intersection of \\(2x + y = 0\\) and \\(x + 3y = 10\\)?",
          answer: "\\((-2, 4)\\)",
        },
        {
          prompt: "Centroid of \\((0,0)\\), \\((-2,4)\\), \\((1,3)\\)?",
          answer: "\\(\\left(-\\dfrac13, \\dfrac73\\right)\\)",
        },
        {
          prompt: "Sum of roots of \\(37y^2 - 14y + 1 = 0\\)?",
          answer: "\\(\\dfrac{14}{37}\\)",
        },
        {
          prompt: "Circumcentre of a right triangle?",
          answer: "Midpoint of the hypotenuse.",
        },
      ],
      pyqExampleId: "a3b06c96-4a62-4521-aa3f-63e99656f0d5",
      traps: [
        {
          title: "Finding A and B explicitly for the median",
          body:
            "The median from \\(O\\) needs only the MIDPOINT of \\(AB\\), which Vieta gives from the quadratic without solving it. Solving \\(37y^2 - 14y + 1 = 0\\) by formula wastes the question's time budget.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Slopes of a Pair — reading m₁ + m₂ and m₁m₂ off the coefficients",
      href: "/notes/mht-cet-maths/pair-of-straight-lines/cetpsl-slopes-of-a-pair",
    },
    {
      label: "Straight Line — section formula and rectangle centres used in the triangle stems",
      href: "/notes/mht-cet-maths/straight-line/cetsl-section-formula-and-rectangles",
    },
  ],
};
