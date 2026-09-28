import type { SubtopicNote } from "@/app/notes/_types";

export const ELLIPSE_HYPERBOLA_NOTE: SubtopicNote = {
  subtopicName: "Ellipse and Hyperbola",
  title: "Ellipse and Hyperbola — Eccentricity, Tangents and Orthogonal Curves",
  oneLineDefinition:
    "The eccentricity of an ellipse and a hyperbola and what fixes it, and the tangent condition c² = a²m² ± b², used for tangents of a given slope, for the area a tangent cuts off, and for curves that cross at right angles.",
  whyItMatters:
    "10 PYQs, four HARD. Five ask for an eccentricity or an equation — an ellipse after completing the square, a hyperbola through two points, a curve given parametrically, a hyperbola sharing an ellipse's foci. " +
    "Five are tangents: a tangent of given slope and its intercepts, and two curves that cut at right angles. Two cards.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cetcon-eccentricity",
      name: "Eccentricity and Foci of the Ellipse and Hyperbola",
      intuition:
        "Eccentricity measures how stretched a conic is. For an ellipse the foci are inside, at distance ae from the centre, and e < 1; b² = a²(1 − e²). For a hyperbola they are outside and e > 1; b² = a²(e² − 1). In both, a belongs to the axis that carries the foci. When the larger denominator sits under y², the ellipse's major axis is vertical, and the formula uses that larger number as a².",
      definition:
        "- Ellipse \\(\\dfrac{x^2}{a^2} + \\dfrac{y^2}{b^2} = 1\\), \\(a > b\\): \\(e = \\sqrt{1 - \\dfrac{b^2}{a^2}}\\), foci \\((\\pm ae, 0)\\).\n" +
        "- If the larger denominator is under \\(y^2\\), swap roles: \\(e = \\sqrt{1 - \\dfrac{\\text{smaller}}{\\text{larger}}}\\).\n" +
        "- Hyperbola \\(\\dfrac{x^2}{a^2} - \\dfrac{y^2}{b^2} = 1\\): \\(e = \\sqrt{1 + \\dfrac{b^2}{a^2}}\\), foci \\((\\pm ae, 0)\\).\n" +
        "- A curve through given points: substitute each point to get \\(a^2\\) and \\(b^2\\).\n" +
        "- Parametric \\(x = p(\\cos t + \\sin t)\\), \\(y = q(\\cos t - \\sin t)\\): \\(\\dfrac{x^2}{p^2} + \\dfrac{y^2}{q^2} = 2\\), an ellipse.\n" +
        "- Foci subtending a right angle at an end of the minor axis: \\(b = ae\\), so \\(e = \\dfrac{1}{\\sqrt2}\\).",
      formula: {
        label: "Eccentricity",
        latex: "\\text{ellipse: } b^2 = a^2(1 - e^2) \\qquad \\text{hyperbola: } b^2 = a^2(e^2 - 1)",
      },
      authoredExample: {
        prompt: "Find the eccentricity of \\(4x^2 + 3y^2 - 8x = 8\\).",
        steps: [
          "\\(4(x - 1)^2 + 3y^2 = 12\\), so \\(\\dfrac{(x - 1)^2}{3} + \\dfrac{y^2}{4} = 1\\).",
          "The larger denominator, 4, is under \\(y^2\\): \\(e = \\sqrt{1 - \\frac34}\\).",
        ],
        answer: "\\(\\dfrac12\\)",
      },
      selfCheckExample: {
        prompt: "A hyperbola has foci \\((\\pm 5, 0)\\) and eccentricity \\(\\frac54\\). Find its equation.",
        steps: [
          "\\(ae = 5\\), so \\(a = 4\\).",
          "\\(b^2 = a^2(e^2 - 1) = 16\\left(\\frac{25}{16} - 1\\right) = 9\\).",
        ],
        answer: "\\(\\dfrac{x^2}{16} - \\dfrac{y^2}{9} = 1\\)",
      },
      practiceSet: [
        { prompt: "Eccentricity of \\(\\dfrac{x^2}{25} + \\dfrac{y^2}{16} = 1\\)?", answer: "\\(\\frac35\\)" },
        { prompt: "Eccentricity of \\(\\dfrac{x^2}{16} - \\dfrac{y^2}{9} = 1\\)?", answer: "\\(\\frac54\\)" },
        { prompt: "Foci of \\(\\dfrac{x^2}{169} + \\dfrac{y^2}{144} = 1\\)?", answer: "\\((\\pm 5, 0)\\)" },
      ],
      pyqExampleId: "04c92f14-b551-410e-9584-3918860b5398",
      traps: [
        {
          title: "Dividing by the wrong denominator",
          body: "In x²/5 + (y − 3)²/9 = 1 the major axis is vertical. e = √(1 − 5/9) = 2/3. Always put the smaller denominator on top; 1 − 9/5 is negative.",
        },
        {
          title: "Using the ellipse relation for a hyperbola",
          body: "An ellipse has b² = a²(1 − e²); a hyperbola has b² = a²(e² − 1). A hyperbola's e is always greater than 1, so any option below 1 is out.",
        },
        {
          title: "Forgetting the 2 in the parametric form",
          body: "(cos t + sin t)² + (cos t − sin t)² = 2, not 1. So x = 3(cos t + sin t), y = 4(cos t − sin t) is x²/18 + y²/32 = 1, whose e is √7/4.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetcon-tangents-orthogonal",
      name: "Tangents of a Given Slope, and Curves That Cut at Right Angles",
      intuition:
        "As with the parabola, y = mx + c touches an ellipse or hyperbola when the meeting-point quadratic has equal roots. That gives c² = a²m² + b² for the ellipse and c² = a²m² − b² for the hyperbola. Two curves cut orthogonally when their tangents at a common point are perpendicular. For two central conics this has a shortcut: they must have the same foci.",
      definition:
        "- Ellipse: \\(y = mx \\pm \\sqrt{a^2m^2 + b^2}\\). Hyperbola: \\(y = mx \\pm \\sqrt{a^2m^2 - b^2}\\).\n" +
        "- Tangent at a point: \\(\\dfrac{xx_1}{a^2} \\pm \\dfrac{yy_1}{b^2} = 1\\); at \\((a\\sec\\theta, b\\tan\\theta)\\) on the hyperbola, \\(\\dfrac{x\\sec\\theta}{a} - \\dfrac{y\\tan\\theta}{b} = 1\\), slope \\(\\dfrac{b}{a\\sin\\theta}\\).\n" +
        "- Equal intercepts: slope \\(-1\\). A tangent's intercepts and the origin form a triangle of area \\(\\frac12|x\\text{-int}\\cdot y\\text{-int}|\\).\n" +
        "- Orthogonal curves: at the common point, \\(m_1m_2 = -1\\). For \\(A_1x^2 + B_1y^2 = 1\\) and \\(A_2x^2 + B_2y^2 = 1\\): \\(\\dfrac{1}{A_1} - \\dfrac{1}{B_1} = \\dfrac{1}{A_2} - \\dfrac{1}{B_2}\\) (confocal).",
      formula: {
        label: "Tangent of slope m",
        latex: "\\text{ellipse: } c^2 = a^2m^2 + b^2 \\qquad \\text{hyperbola: } c^2 = a^2m^2 - b^2",
      },
      authoredExample: {
        prompt: "Find the tangents to \\(\\dfrac{x^2}{9} + \\dfrac{y^2}{4} = 1\\) that are perpendicular to \\(y = x\\).",
        steps: [
          "The slope is \\(-1\\): \\(c^2 = 9 + 4 = 13\\).",
          "\\(y = -x \\pm \\sqrt{13}\\).",
        ],
        answer: "\\(x + y = \\pm\\sqrt{13}\\)",
      },
      selfCheckExample: {
        prompt: "The tangent of slope 2 to \\(\\dfrac{x^2}{4} - \\dfrac{y^2}{7} = 1\\) with positive y-intercept. Find its intercepts.",
        steps: [
          "\\(c^2 = 4 \\cdot 4 - 7 = 9\\), so \\(y = 2x + 3\\).",
          "At \\(y = 0\\), \\(x = -\\frac32\\); at \\(x = 0\\), \\(y = 3\\).",
        ],
        answer: "\\(-\\dfrac32\\) and \\(3\\)",
      },
      practiceSet: [
        { prompt: "For which c does \\(y = x + c\\) touch \\(\\dfrac{x^2}{16} + \\dfrac{y^2}{9} = 1\\)?", answer: "\\(c = \\pm 5\\)" },
        { prompt: "\\(y^2 = 4x\\) and \\(x^2 + ky^2 = 1\\) cut at right angles. Find k.", answer: "\\(\\frac12\\)", method: "At the meeting point \\(m_1 = 2/y\\), \\(m_2 = -x/(ky)\\); \\(m_1m_2 = -1\\) gives \\(2x = ky^2 = 4kx\\)." },
      ],
      pyqExampleId: "92d12e9e-c7ad-41c9-9d38-6d9453da23f2",
      traps: [
        {
          title: "Using the ellipse sign for a hyperbola",
          body: "The ellipse adds b², the hyperbola subtracts it. With x²/20 − y²/5 = 1 and m = 3/4, c² = 20(9/16) − 5 = 25/4, so c = ±5/2.",
        },
        {
          title: "Not writing the ellipse in standard form first",
          body: "9x² + 16y² = 288 is x²/32 + y²/18 = 1. The tangent condition uses 32 and 18, not 9 and 16.",
        },
        {
          title: "Slope of a perpendicular line",
          body: "A tangent perpendicular to 4x + 3y = 7 has slope 3/4, the negative reciprocal of −4/3. Using −4/3 gives a tangent parallel to the line.",
        },
      ],
    },
  ],
  related: [
    { label: "The Parabola", href: "/notes/mht-cet-maths/conic-sections/cetcon-parabola" },
  ],
};
