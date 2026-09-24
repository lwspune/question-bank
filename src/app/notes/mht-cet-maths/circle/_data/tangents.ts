import type { SubtopicNote } from "@/app/notes/_types";

export const TANGENTS_NOTE: SubtopicNote = {
  subtopicName: "Tangents — At a Point, With a Given Slope, From an External Point and Their Loci",
  title: "Tangents — At a Point, With a Given Slope, From an External Point and Their Loci",
  oneLineDefinition:
    "Tangent at (x₁, y₁): xx₁ + yy₁ + g(x + x₁) + f(y + y₁) + c = 0; with slope m to x² + y² = a²: y = mx ± a√(1 + m²); from an external point the tangent length is √S₁ and the two tangents with the two radii make a kite.",
  whyItMatters:
    "14 PYQs at 50% HARD — the chapter's largest page and its most expensive. The tangent at the far end of a diameter (twice), the parametric tangent, tangents of a given slope, a parabola's tangent that also touches a circle (twice), the kite PAOB area (three times), a tangent-length locus, the 60°-tangents locus, and the classical PQ · RS = (2r)² result. " +
    "Half the marks are the kite: tangent length √S₁ times radius is the area, and sin of the half-angle is r over the distance.",
  concepts: [
    // 1 — tangent at a point
    {
      kind: "formula" as const,
      slug: "cetcir-tangent-at-a-point",
      name: "Tangent at a Point on the Circle: T = 0",
      intuition:
        "Replace \\(x^2 \\to xx_1\\), \\(y^2 \\to yy_1\\), \\(2x \\to x + x_1\\), \\(2y \\to y + y_1\\) in the circle's equation — the result is the tangent at \\((x_1, y_1)\\). Equivalently, the tangent is perpendicular to the radius \\(CP\\). At a parametric point on \\(x^2 + y^2 = a^2\\) it is \\(x\\cos\\theta + y\\sin\\theta = a\\).",
      definition:
        "- \\(x^2 + y^2 - 6x - 5y - 1 = 0\\), one end of a diameter \\((-1, 3)\\): centre \\(\\left(3, \\tfrac52\\right)\\), other end \\((7, 2)\\); tangent there: \\(7x + 2y - 3(x + 7) - \\tfrac52(y + 2) - 1 = 0 \\Rightarrow 8x - y - 54 = 0\\).\n" +
        "- \\(x = 5\\cos\\theta\\), \\(y = 5\\sin\\theta\\) at \\(\\theta = \\tfrac{\\pi}{3}\\): \\(\\dfrac{x}{2} + \\dfrac{\\sqrt3 y}{2} = 5 \\Rightarrow x + \\sqrt3 y = 10\\).\n" +
        "- Tangent and normal at \\((\\sqrt3, 1)\\) on \\(x^2 + y^2 = 4\\): tangent \\(\\sqrt3 x + y = 4\\) meets the \\(X\\)-axis at \\(\\left(\\tfrac{4}{\\sqrt3}, 0\\right)\\); the normal is through the origin; triangle area \\(\\tfrac12 \\cdot \\tfrac{4}{\\sqrt3} \\cdot 1 = \\tfrac{2}{\\sqrt3}\\).\n" +
        "- The normal at any point passes through the centre — a one-line fact that kills half the normal stems.",
      formula: {
        label: "Tangent at a point",
        latex:
          "xx_1 + yy_1 + g(x + x_1) + f(y + y_1) + c = 0 \\qquad x^2 + y^2 = a^2:\\ x\\cos\\theta + y\\sin\\theta = a",
      },
      authoredExample: {
        prompt: "Find the tangent to \\(x^2 + y^2 - 4x + 6y - 12 = 0\\) at \\((5, 1)\\).",
        steps: [
          "\\(5x + y - 2(x + 5) + 3(y + 1) - 12 = 0 \\Rightarrow 3x + 4y - 19 = 0\\).",
          "Check: \\((5, 1)\\): \\(15 + 4 - 19 = 0\\) ✓; radius \\(CP\\) from \\((2, -3)\\) has slope \\(\\tfrac43\\), perpendicular to slope \\(-\\tfrac34\\) ✓.",
        ],
        answer: "\\(3x + 4y = 19\\)",
      },
      selfCheckExample: {
        prompt: "Find the tangent to \\(x^2 + y^2 = 16\\) at the parametric point \\(\\theta = \\dfrac{3\\pi}{4}\\).",
        steps: [
          "\\(x\\cos\\tfrac{3\\pi}{4} + y\\sin\\tfrac{3\\pi}{4} = 4 \\Rightarrow -\\dfrac{x}{\\sqrt2} + \\dfrac{y}{\\sqrt2} = 4\\).",
        ],
        answer: "\\(y - x = 4\\sqrt2\\)",
      },
      practiceSet: [
        {
          prompt: "Other end of the diameter from \\((-1, 3)\\) through centre \\(\\left(3, \\dfrac52\\right)\\)?",
          answer: "\\((7, 2)\\)",
        },
        {
          prompt: "Tangent to \\(x^2 + y^2 = 25\\) at \\((3, 4)\\)?",
          answer: "\\(3x + 4y = 25\\)",
        },
        {
          prompt: "Tangent to \\(x^2 + y^2 = 25\\) at \\(\\theta = \\dfrac{\\pi}{3}\\)?",
          answer: "\\(x + \\sqrt3 y = 10\\)",
        },
        {
          prompt: "Does the normal at a point pass through the centre?",
          answer: "Always.",
        },
      ],
      pyqExampleId: "346eaeee-b97b-4f01-81f9-38d3427be8e1",
      traps: [
        {
          title: "Forgetting to halve the linear coefficients in T",
          body:
            "\\(-6x\\) becomes \\(-3(x + x_1)\\), not \\(-6(x + x_1)\\). Doubling gives \\(8x - 2y - 52 = 0\\)-style options that are exactly the planted distractors.",
        },
      ],
    },

    // 2 — tangent with a given slope
    {
      kind: "formula" as const,
      slug: "cetcir-tangent-with-a-given-slope",
      name: "Tangent of a Given Slope, and Whether a Line Touches: Distance From the Centre = Radius",
      intuition:
        "\\(y = mx + c\\) touches \\(x^2 + y^2 = a^2\\) iff \\(c = \\pm a\\sqrt{1 + m^2}\\) — which is just 'distance from the origin equals \\(a\\)'. For any circle, a line is tangent iff the centre's distance from it equals \\(r\\); that one test also settles a tangent to another curve touching the circle.",
      definition:
        "- Perpendicular to \\(5x + y = 2\\) (so slope \\(\\tfrac15\\)) and tangent to \\(x^2 + y^2 = 36\\): \\(y = \\dfrac{x}{5} \\pm 6\\sqrt{1 + \\tfrac{1}{25}} \\Rightarrow x - 5y \\pm 6\\sqrt{26} = 0\\).\n" +
        "- Tangent to \\(x^2 = y - 6\\) at \\((1, 7)\\) is \\(2x - y + 5 = 0\\); it touches \\(x^2 + y^2 + 16x + 12y + C = 0\\) (centre \\((-8, -6)\\), \\(r^2 = 100 - C\\)) iff \\(\\dfrac{|-16 + 6 + 5|}{\\sqrt5} = \\sqrt{100 - C} \\Rightarrow 5 = 100 - C \\Rightarrow C = 95\\).\n" +
        "- The tangent \\(x - 2y = 5\\) to \\(x^2 + y^2 = 5\\) at \\((1, -2)\\) also touches \\(x^2 + y^2 - 8x + 6y + 20 = 0\\) (centre \\((4, -3)\\), \\(r = \\sqrt5\\)); the contact point is the foot of the perpendicular from \\((4, -3)\\): \\((3, -1)\\).\n" +
        "- Two tangents of each slope: the \\(\\pm\\) is the two sides of the circle.",
      formula: {
        label: "Tangency condition",
        latex:
          "y = mx \\pm a\\sqrt{1 + m^2} \\qquad \\text{general: } \\frac{|ah + bk + c|}{\\sqrt{a^2 + b^2}} = r",
      },
      authoredExample: {
        prompt: "Find the tangents to \\(x^2 + y^2 = 9\\) parallel to \\(3x + 4y = 1\\).",
        steps: [
          "Lines \\(3x + 4y = c\\) with \\(\\dfrac{|c|}{5} = 3\\): \\(c = \\pm15\\).",
        ],
        answer: "\\(3x + 4y = \\pm15\\)",
      },
      selfCheckExample: {
        prompt: "For what \\(k\\) does \\(y = 2x + k\\) touch \\(x^2 + y^2 - 2x - 4y + 1 = 0\\)?",
        steps: [
          "Centre \\((1, 2)\\), \\(r = 2\\): \\(\\dfrac{|2 - 2 + k|}{\\sqrt5} = 2 \\Rightarrow |k| = 2\\sqrt5\\).",
        ],
        answer: "\\(k = \\pm2\\sqrt5\\)",
      },
      practiceSet: [
        {
          prompt: "Tangents of slope \\(1\\) to \\(x^2 + y^2 = 2\\)?",
          answer: "\\(y = x \\pm 2\\)",
        },
        {
          prompt: "Slope perpendicular to \\(5x + y = 2\\)?",
          answer: "\\(\\dfrac15\\)",
        },
        {
          prompt: "Tangent to \\(x^2 = y - 6\\) at \\((1, 7)\\)?",
          answer: "\\(2x - y + 5 = 0\\)",
        },
        {
          prompt: "Distance from \\((-8, -6)\\) to \\(2x - y + 5 = 0\\)?",
          answer: "\\(\\sqrt5\\)",
        },
      ],
      pyqExampleId: "bb7c3bcd-1670-4233-9ffc-6e45791e2868",
      traps: [
        {
          title: "Using the slope of the given line instead of the perpendicular one",
          body:
            "'Perpendicular to \\(5x + y = 2\\)' means slope \\(\\dfrac15\\), giving \\(x - 5y \\pm 6\\sqrt{26} = 0\\). Options (C) and (D) use slope \\(-5\\) or \\(5\\).",
        },
      ],
    },

    // 3 — tangents from an external point: length, kite, angle, locus
    {
      kind: "formula" as const,
      slug: "cetcir-tangents-from-an-external-point",
      name: "Tangents From an External Point: Length √S₁, the Kite, the Angle Between Them",
      intuition:
        "From \\(P\\) outside the circle, both tangent lengths equal \\(\\sqrt{S_1}\\), where \\(S_1\\) is the circle's expression evaluated at \\(P\\) — Pythagoras on \\(CP\\), \\(r\\) and the tangent. The quadrilateral \\(PAOB\\) (two tangents, two radii) has area \\(r\\sqrt{S_1}\\), and half the angle between the tangents has \\(\\sin\\) equal to \\(\\dfrac{r}{CP}\\).",
      definition:
        "- \\(P(1, 7)\\), \\(x^2 + y^2 = 25\\): \\(\\sqrt{S_1} = \\sqrt{1 + 49 - 25} = 5\\); area \\(PQOR = 2 \\cdot \\tfrac12 \\cdot 5 \\cdot 5 = 25\\).\n" +
        "- \\(P(-4, 0)\\), \\(x^2 + y^2 = 4\\): \\(PA = \\sqrt{16 - 4} = 2\\sqrt3\\); area \\(PAOB = 2 \\cdot 2\\sqrt3 \\cdot \\tfrac12 \\cdot 2 = 4\\sqrt3\\).\n" +
        "- \\(P(-4, -5)\\), \\(x^2 + y^2 + 6x - 4y - 12 = 0\\) (centre \\((-3, 2)\\), \\(r = 5\\)): tangent length \\(5 = r\\), so the kite is a square of area \\(25\\) and the sector inside it is a quarter circle; the area between the tangents and the circle is \\(25 - \\tfrac{25\\pi}{4} = 25\\left(\\tfrac{4 - \\pi}{4}\\right)\\).\n" +
        "- Angle \\(60^\\circ\\) between the tangents to \\(x^2 + y^2 = 16\\): \\(\\sin 30^\\circ = \\dfrac{4}{OP} \\Rightarrow OP = 8\\); locus of \\(P\\): \\(x^2 + y^2 = 64\\). (Director circle, \\(90^\\circ\\): \\(x^2 + y^2 = 2a^2\\).)",
      formula: {
        label: "External point",
        latex:
          "L = \\sqrt{S_1} = \\sqrt{x_1^2 + y_1^2 + 2gx_1 + 2fy_1 + c},\\qquad [PAOB] = rL,\\qquad \\sin\\frac{\\theta}{2} = \\frac{r}{CP}",
      },
      authoredExample: {
        prompt: "Find the length of the tangent from \\((6, 8)\\) to \\(x^2 + y^2 - 2x - 4y - 20 = 0\\), and the area of the kite formed with the two radii.",
        steps: [
          "\\(S_1 = 36 + 64 - 12 - 32 - 20 = 36\\), \\(L = 6\\); \\(r = \\sqrt{1 + 4 + 20} = 5\\).",
          "Area \\(= rL = 30\\).",
        ],
        answer: "Tangent length \\(6\\); area \\(30\\)",
      },
      selfCheckExample: {
        prompt: "Find the locus of points from which the tangents to \\(x^2 + y^2 = 9\\) are perpendicular.",
        steps: [
          "\\(\\sin 45^\\circ = \\dfrac{3}{OP} \\Rightarrow OP = 3\\sqrt2\\).",
        ],
        answer: "\\(x^2 + y^2 = 18\\)",
      },
      practiceSet: [
        {
          prompt: "Tangent length from \\((1, 7)\\) to \\(x^2 + y^2 = 25\\)?",
          answer: "\\(5\\)",
        },
        {
          prompt: "Tangent length from \\((-4, 0)\\) to \\(x^2 + y^2 = 4\\)?",
          answer: "\\(2\\sqrt3\\)",
        },
        {
          prompt: "Area of kite \\(PAOB\\) with \\(r = 2\\), \\(PA = 2\\sqrt3\\)?",
          answer: "\\(4\\sqrt3\\)",
        },
        {
          prompt: "\\(OP\\) for \\(60^\\circ\\) tangents to a circle of radius \\(4\\)?",
          answer: "\\(8\\)",
        },
      ],
      pyqExampleId: "cda13c24-67b9-4b57-bb32-6b9ec90d91c4",
      traps: [
        {
          title: "Halving the kite",
          body:
            "\\(PAOB\\) is TWO right triangles, so its area is \\(rL\\), not \\(\\tfrac12 rL\\). \\(2\\sqrt3\\) is option (A) on the \\((-4, 0)\\) stem; the answer is \\(4\\sqrt3\\).",
        },
      ],
    },

    // 4 — tangent-length loci and the diameter-tangent result
    {
      kind: "formula" as const,
      slug: "cetcir-tangent-length-loci-and-the-diameter-tangent-result",
      name: "Loci From Tangent Lengths, and PQ · RS = (2r)²",
      intuition:
        "A ratio of tangent lengths to two circles is a ratio of \\(\\sqrt{S_1}\\) values; square it and the locus is a circle (the \\(x^2 + y^2\\) terms do not cancel unless the ratio is \\(1\\), which gives the radical axis, a line). For tangents at the ends of a diameter, the crossed lines meeting on the circle give \\(PQ \\cdot RS = (2r)^2\\).",
      definition:
        "- Ratio \\(2 : 3\\) to \\(x^2 + y^2 + 4x + 3 = 0\\) and \\(x^2 + y^2 - 6x + 5 = 0\\): \\(9(x^2 + y^2 + 4x + 3) = 4(x^2 + y^2 - 6x + 5) \\Rightarrow 5x^2 + 5y^2 + 60x + 7 = 0\\).\n" +
        "- Ratio \\(1 : 1\\): \\(S_1 = S_2\\) is the radical axis, a straight line.\n" +
        "- \\(PQ\\) and \\(RS\\) tangents at the ends of diameter \\(PR\\), \\(PS\\) and \\(RQ\\) meeting at \\(X\\) on the circle: \\(\\angle PXR = 90^\\circ\\), and the similar right triangles \\(PQR\\)-type give \\(PQ \\cdot RS = PR^2 = 4r^2\\), so \\(2r = \\sqrt{PQ \\cdot RS}\\).\n" +
        "- Squaring a ratio of lengths is safe because both lengths are positive.",
      formula: {
        label: "Tangent-length locus",
        latex:
          "\\frac{\\sqrt{S_1}}{\\sqrt{S_2}} = \\frac{m}{n} \\iff n^2 S_1 = m^2 S_2 \\qquad PQ \\cdot RS = (2r)^2",
      },
      authoredExample: {
        prompt: "Find the locus of a point whose tangent lengths to \\(x^2 + y^2 = 4\\) and \\(x^2 + y^2 - 8x + 12 = 0\\) are equal.",
        steps: [
          "\\(x^2 + y^2 - 4 = x^2 + y^2 - 8x + 12 \\Rightarrow 8x = 16\\).",
        ],
        answer: "The line \\(x = 2\\)",
      },
      selfCheckExample: {
        prompt: "The tangent lengths from \\(P\\) to \\(x^2 + y^2 = 1\\) and \\(x^2 + y^2 - 4x = 0\\) are in the ratio \\(1 : 2\\). Find the locus of \\(P\\).",
        steps: [
          "\\(4(x^2 + y^2 - 1) = x^2 + y^2 - 4x \\Rightarrow 3x^2 + 3y^2 + 4x - 4 = 0\\).",
        ],
        answer: "\\(3x^2 + 3y^2 + 4x - 4 = 0\\)",
      },
      practiceSet: [
        {
          prompt: "\\(S_1\\) for \\(x^2 + y^2 + 4x + 3 = 0\\) at \\((x, y)\\)?",
          answer: "\\(x^2 + y^2 + 4x + 3\\)",
        },
        {
          prompt: "Ratio \\(2 : 3\\) of lengths means ratio of \\(S\\) values?",
          answer: "\\(4 : 9\\)",
        },
        {
          prompt: "Locus for equal tangent lengths is a?",
          answer: "Line (radical axis).",
        },
        {
          prompt: "\\(PQ = 4\\), \\(RS = 9\\): \\(2r = ?\\)",
          answer: "\\(6\\)",
        },
      ],
      pyqExampleId: "187ecd74-3014-4313-8e49-3a696d24acf6",
      traps: [
        {
          title: "Sign of the x term after cross-multiplying",
          body:
            "\\(9(4x) - 4(-6x) = 36x + 24x = +60x\\). The bank once carried \\(-60x\\) as its key; the sign is positive.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Distance to a Circle — the centre-to-line distance that decides touch, cut or miss",
      href: "/notes/mht-cet-maths/circle/cetcir-distance-to-a-circle",
    },
    {
      label: "Straight Line — the foot of the perpendicular gives the point of contact",
      href: "/notes/mht-cet-maths/straight-line/cetsl-distance-and-foot-of-perpendicular",
    },
  ],
};
