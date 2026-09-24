import type { SubtopicNote } from "@/app/notes/_types";

export const EQUATION_OF_A_CIRCLE_NOTE: SubtopicNote = {
  subtopicName: "Equation of a Circle — Centre-Radius, General, Diameter and Parametric Forms",
  title: "Equation of a Circle — Centre-Radius, General, Diameter and Parametric Forms",
  oneLineDefinition:
    "(x − h)² + (y − k)² = r²; the general form x² + y² + 2gx + 2fy + c = 0 has centre (−g, −f) and radius √(g² + f² − c); the diameter form (x − x₁)(x − x₂) + (y − y₁)(y − y₂) = 0; and the parametric form x = h + r cos θ, y = k + r sin θ.",
  whyItMatters:
    "12 PYQs at 33% HARD — the chapter's opening page and its largest. The diameter form is the workhorse: the diagonal of a rectangle (twice), the centres of two circles as the diameter's ends, and the 2023/2024 stem whose endpoints are the roots of two quadratics. " +
    "The parametric form and the centre-from-two-diameters stems are one line each; the two HARD algebraic ones — four points (m, 1/m) on a circle and a count of integral k for a bounded radius — are the general equation read as a polynomial.",
  concepts: [
    // 1 — centre-radius and general form
    {
      kind: "formula" as const,
      slug: "cetcir-centre-radius-and-general-form",
      name: "Centre-Radius and General Forms: Read (−g, −f) and √(g² + f² − c)",
      intuition:
        "Expand \\((x - h)^2 + (y - k)^2 = r^2\\) and you get the general form with \\(g = -h\\), \\(f = -k\\), \\(c = h^2 + k^2 - r^2\\). Going back is completing the square. The centre is the intersection of any two diameters, and a circle through two points with its centre on a known line is fixed by equating two distances.",
      definition:
        "- Diameters along \\(3x - 4y = 7\\) and \\(2x - 3y = 5\\) meet at \\((1, -1)\\); area \\(49\\pi\\) gives \\(r = 7\\): \\(x^2 + y^2 - 2x + 2y - 47 = 0\\).\n" +
        "- Centre \\((0, a)\\) on the \\(y\\)-axis, through \\((4, 0)\\) and \\((0, 2)\\): \\(16 + a^2 = (a - 2)^2 \\Rightarrow a = 3\\), \\(r = 5\\); \\(r^2 - r + 1 = 21\\).\n" +
        "- Two diameters given as a pair \\(x^2 - y^2 - 2x + 4y - 3 = (x + y - 3)(x - y + 1)\\): centre \\((1, 2)\\); through \\((1, 1)\\) means \\(r = 1\\).\n" +
        "- \\(x^2 + y^2 + kx + (1 - k)y + 5 = 0\\), radius at most \\(5\\): \\(\\dfrac{k^2 + (1-k)^2}{4} - 5 \\le 25 \\Rightarrow 2k^2 - 2k - 119 \\le 0 \\Rightarrow -7.23 \\le k \\le 8.23\\), sixteen integers — the official key. Strictly the radius must also be REAL (\\(g^2 + f^2 - c > 0\\)), which drops \\(k = -2, \\dots, 3\\) and leaves ten; that count is not offered.\n" +
        "- The coefficients of \\(x^2\\) and \\(y^2\\) must be equal (scale to \\(1\\)) and there must be no \\(xy\\) term; otherwise it is not a circle.",
      formula: {
        label: "Two forms",
        latex:
          "(x - h)^2 + (y - k)^2 = r^2 \\qquad x^2 + y^2 + 2gx + 2fy + c = 0:\\ C(-g, -f),\\ r = \\sqrt{g^2 + f^2 - c}",
      },
      visualizationSlug: "circ-circle-anatomy",
      authoredExample: {
        prompt: "Find the centre and radius of \\(2x^2 + 2y^2 - 8x + 12y - 6 = 0\\).",
        steps: [
          "Divide by \\(2\\): \\(x^2 + y^2 - 4x + 6y - 3 = 0\\); \\(g = -2\\), \\(f = 3\\), \\(c = -3\\).",
          "Centre \\((2, -3)\\); \\(r = \\sqrt{4 + 9 + 3} = 4\\).",
        ],
        answer: "Centre \\((2, -3)\\), radius \\(4\\)",
      },
      selfCheckExample: {
        prompt: "A circle passes through \\((6, 0)\\) and \\((0, 8)\\) and its centre lies on the \\(x\\)-axis. Find its radius.",
        steps: [
          "Centre \\((a, 0)\\): \\((a - 6)^2 = a^2 + 64 \\Rightarrow -12a + 36 = 64 \\Rightarrow a = -\\dfrac73\\).",
          "\\(r = 6 + \\dfrac73 = \\dfrac{25}{3}\\).",
        ],
        answer: "\\(\\dfrac{25}{3}\\)",
      },
      practiceSet: [
        {
          prompt: "Centre of \\(x^2 + y^2 + 8x + 10y - 7 = 0\\)?",
          answer: "\\((-4, -5)\\)",
        },
        {
          prompt: "Radius of \\(x^2 + y^2 - 6x - 4y - 12 = 0\\)?",
          answer: "\\(5\\)",
        },
        {
          prompt: "Circle with centre \\((1, -1)\\), \\(r = 7\\)?",
          answer: "\\(x^2 + y^2 - 2x + 2y - 47 = 0\\)",
        },
        {
          prompt: "Is \\(x^2 + y^2 + 2x + 2y + 3 = 0\\) a real circle?",
          answer: "No: \\(g^2 + f^2 - c = -1\\).",
        },
      ],
      pyqExampleId: "7608471a-6b70-4eb9-a607-a8e03a6bdeb6",
      traps: [
        {
          title: "Reading the centre as (g, f)",
          body:
            "\\(x^2 + y^2 - 4x + 6y - 3 = 0\\) has centre \\((2, -3)\\): the signs FLIP. Both sign-error centres are always on the option list.",
        },
      ],
    },

    // 2 — diameter form
    {
      kind: "formula" as const,
      slug: "cetcir-diameter-form",
      name: "Diameter Form: (x − x₁)(x − x₂) + (y − y₁)(y − y₂) = 0",
      intuition:
        "The angle in a semicircle is a right angle, so a point \\(P\\) is on the circle with diameter \\(AB\\) iff \\(PA \\perp PB\\); the dot product of the two direction vectors is the diameter form. It never needs the centre or radius.",
      definition:
        "- Rectangle \\(x = -2, x = 6, y = -2, y = 5\\): a diagonal joins \\((-2, -2)\\), \\((6, 5)\\): \\((x + 2)(x - 6) + (y + 2)(y - 5) = x^2 + y^2 - 4x - 3y - 22 = 0\\).\n" +
        "- Centres \\((-3, 7)\\) and \\((2, -5)\\) as ends: \\((x + 3)(x - 2) + (y - 7)(y + 5) = x^2 + y^2 + x - 2y - 41 = 0\\).\n" +
        "- Abscissae the roots of \\(x^2 + 2ax - b^2 = 0\\), ordinates of \\(y^2 + 2py - q^2 = 0\\): expanding the diameter form gives \\(x^2 - (x_1 + x_2)x + x_1x_2 + y^2 - (y_1 + y_2)y + y_1y_2 = 0\\), and Vieta fills in: \\(x^2 + y^2 + 2ax + 2py - b^2 - q^2 = 0\\).\n" +
        "- The expansion needs only the SUM and PRODUCT of the coordinates — which is why the roots-of-quadratics stem never asks you to solve the quadratics.",
      formula: {
        label: "Diameter form",
        latex:
          "(x - x_1)(x - x_2) + (y - y_1)(y - y_2) = 0 \\iff x^2 + y^2 - (x_1 + x_2)x - (y_1 + y_2)y + x_1x_2 + y_1y_2 = 0",
      },
      authoredExample: {
        prompt: "Find the circle with \\((1, 2)\\) and \\((5, -4)\\) as the ends of a diameter.",
        steps: [
          "\\((x - 1)(x - 5) + (y - 2)(y + 4) = 0 \\Rightarrow x^2 - 6x + 5 + y^2 + 2y - 8 = 0\\).",
        ],
        answer: "\\(x^2 + y^2 - 6x + 2y - 3 = 0\\)",
      },
      selfCheckExample: {
        prompt: "The abscissae of \\(A\\), \\(B\\) are the roots of \\(x^2 - 6x + 5 = 0\\) and their ordinates the roots of \\(y^2 + 2y - 8 = 0\\). Find the circle on \\(AB\\) as diameter.",
        steps: [
          "\\(x_1 + x_2 = 6\\), \\(x_1x_2 = 5\\), \\(y_1 + y_2 = -2\\), \\(y_1y_2 = -8\\).",
        ],
        answer: "\\(x^2 + y^2 - 6x + 2y - 3 = 0\\)",
      },
      practiceSet: [
        {
          prompt: "Diameter ends \\((0, 0)\\), \\((4, 6)\\): circle?",
          answer: "\\(x^2 + y^2 - 4x - 6y = 0\\)",
        },
        {
          prompt: "Opposite corners of \\(x = -2, x = 6, y = -2, y = 5\\)?",
          answer: "\\((-2, -2)\\) and \\((6, 5)\\)",
        },
        {
          prompt: "Constant term when \\(x_1x_2 = -b^2\\), \\(y_1y_2 = -q^2\\)?",
          answer: "\\(-b^2 - q^2\\)",
        },
        {
          prompt: "Coefficient of \\(x\\) when \\(x_1 + x_2 = -2a\\)?",
          answer: "\\(+2a\\)",
        },
      ],
      pyqExampleId: "2aca0594-def3-4807-801d-00dfde3f4582",
      traps: [
        {
          title: "Sign of the constant with negative products",
          body:
            "\\(x_1x_2 + y_1y_2 = -b^2 - q^2\\). The option with \\(-b^2 + q^2\\) is the planted slip; the paper prints \\(-(b^2 + q^2)\\).",
        },
      ],
    },

    // 3 — parametric form
    {
      kind: "formula" as const,
      slug: "cetcir-parametric-form",
      name: "Parametric Form: x = h + r cos θ, y = k + r sin θ",
      intuition:
        "Every point of a circle is the centre plus a radius-length step at angle \\(\\theta\\). Complete the square to find \\((h, k)\\) and \\(r\\), then write the two coordinates.",
      definition:
        "- \\(x^2 + y^2 + 2x - 4y - 4 = 0 \\Rightarrow (x + 1)^2 + (y - 2)^2 = 9\\): \\(x = -1 + 3\\cos\\theta\\), \\(y = 2 + 3\\sin\\theta\\).\n" +
        "- \\(x^2 + y^2 - ax - by = 0\\): centre \\(\\left(\\dfrac{a}{2}, \\dfrac{b}{2}\\right)\\), \\(r = \\dfrac{\\sqrt{a^2 + b^2}}{2}\\).\n" +
        "- \\(\\cos\\) goes with \\(x\\) and \\(\\sin\\) with \\(y\\); the swapped version is a circle too, but not the standard parametrisation the options test.\n" +
        "- \\(x = 5\\cos\\theta\\), \\(y = 5\\sin\\theta\\) is \\(x^2 + y^2 = 25\\); the tangent at parameter \\(\\theta\\) is \\(x\\cos\\theta + y\\sin\\theta = 5\\).",
      formula: {
        label: "Parametric circle",
        latex:
          "x = h + r\\cos\\theta,\\quad y = k + r\\sin\\theta \\qquad (0 \\le \\theta < 2\\pi)",
      },
      authoredExample: {
        prompt: "Write parametric equations for \\(x^2 + y^2 - 6x + 8y = 0\\).",
        steps: [
          "\\((x - 3)^2 + (y + 4)^2 = 25\\): \\(x = 3 + 5\\cos\\theta\\), \\(y = -4 + 5\\sin\\theta\\).",
        ],
        answer: "\\(x = 3 + 5\\cos\\theta,\\ y = -4 + 5\\sin\\theta\\)",
      },
      selfCheckExample: {
        prompt: "The point \\((1 + 2\\cos\\theta, 3 + 2\\sin\\theta)\\) lies on which circle?",
        steps: [
          "Centre \\((1, 3)\\), radius \\(2\\).",
        ],
        answer: "\\((x - 1)^2 + (y - 3)^2 = 4\\)",
      },
      practiceSet: [
        {
          prompt: "Centre and radius of \\(x^2 + y^2 + 2x - 4y - 4 = 0\\)?",
          answer: "\\((-1, 2)\\), \\(3\\)",
        },
        {
          prompt: "Radius of \\(x^2 + y^2 - ax - by = 0\\)?",
          answer: "\\(\\dfrac{\\sqrt{a^2 + b^2}}{2}\\)",
        },
        {
          prompt: "Cartesian form of \\(x = 2\\cos\\theta\\), \\(y = 2\\sin\\theta\\)?",
          answer: "\\(x^2 + y^2 = 4\\)",
        },
        {
          prompt: "Point at \\(\\theta = \\dfrac{\\pi}{2}\\) on \\(x = -1 + 3\\cos\\theta\\), \\(y = 2 + 3\\sin\\theta\\)?",
          answer: "\\((-1, 5)\\)",
        },
      ],
      pyqExampleId: "cfa0896f-9eb0-4de7-ab8c-815948b57824",
      traps: [
        {
          title: "Halving the radius with the centre",
          body:
            "For \\(x^2 + y^2 - ax - by = 0\\) the centre halves \\(a, b\\) and the radius is \\(\\dfrac{\\sqrt{a^2 + b^2}}{2}\\), not \\(\\dfrac{\\sqrt{a^2 + b^2}}{4}\\). Options (B) and (D) carry the quartered radius.",
        },
      ],
    },

    // 4 — points on a circle as roots
    {
      kind: "formula" as const,
      slug: "cetcir-points-on-a-circle-as-roots",
      name: "Points of a Family on a Circle: Substitute, Get a Polynomial, Use Vieta",
      intuition:
        "If points of the form \\(\\left(m, \\dfrac1m\\right)\\) lie on a circle, substituting into the general equation gives one polynomial in \\(m\\) whose roots are the parameters of the points. Multiply out the denominators and read off the product of the roots.",
      definition:
        "- \\(\\left(m, \\dfrac1m\\right)\\) on \\(x^2 + y^2 + 2gx + 2fy + c = 0\\): \\(m^2 + \\dfrac{1}{m^2} + 2gm + \\dfrac{2f}{m} + c = 0 \\Rightarrow m^4 + 2gm^3 + cm^2 + 2fm + 1 = 0\\). Product of the four roots \\(= \\dfrac{1}{1} = 1\\).\n" +
        "- For a quartic \\(m^4 + \\alpha m^3 + \\beta m^2 + \\gamma m + \\delta = 0\\), the product of the roots is \\(+\\delta\\) (even degree) and the sum is \\(-\\alpha\\).\n" +
        "- The same substitution answers 'how many points of the form … lie on the circle' — the degree of the polynomial bounds the count.",
      formula: {
        label: "Vieta on the substituted polynomial",
        latex:
          "m^4 + 2gm^3 + cm^2 + 2fm + 1 = 0 \\ \\Rightarrow\\ m_1 m_2 m_3 m_4 = 1",
      },
      authoredExample: {
        prompt: "Four points \\(\\left(t, \\dfrac2t\\right)\\) lie on a circle. Find the product of the four values of \\(t\\).",
        steps: [
          "\\(t^2 + \\dfrac{4}{t^2} + 2gt + \\dfrac{4f}{t} + c = 0 \\Rightarrow t^4 + 2gt^3 + ct^2 + 4ft + 4 = 0\\).",
        ],
        answer: "\\(4\\)",
      },
      selfCheckExample: {
        prompt: "Four points \\((m, 1/m)\\) lie on a circle and three of them have \\(m = 1, 2, 4\\). Find the fourth.",
        steps: [
          "Product of the four \\(m\\) is \\(1\\): \\(8m_4 = 1\\).",
        ],
        answer: "\\(m_4 = \\dfrac18\\)",
      },
      pyqExampleId: "a3b3d918-d45f-4e93-a017-dde9d151e1af",
      traps: [
        {
          title: "Product of roots with the wrong sign",
          body:
            "For an even-degree monic polynomial the product of the roots is \\(+\\)(constant term); \\(-1\\) is option (A) and comes from applying the cubic's sign rule.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Concentric and Touching Circles — the same forms with a fixed centre",
      href: "/notes/mht-cet-maths/circle/cetcir-concentric-and-touching",
    },
    {
      label: "Pair of Straight Lines — factorising the two diameters",
      href: "/notes/mht-cet-maths/pair-of-straight-lines/cetpsl-joint-equation",
    },
  ],
};
