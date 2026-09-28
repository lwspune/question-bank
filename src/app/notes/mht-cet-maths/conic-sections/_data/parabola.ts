import type { SubtopicNote } from "@/app/notes/_types";

export const PARABOLA_NOTE: SubtopicNote = {
  subtopicName: "Parabola",
  title: "The Parabola — Standard Forms and Tangents",
  oneLineDefinition:
    "The four standard parabolas, their focus, directrix and latus rectum, a shifted parabola found by completing the square, and the tangent y = mx + a/m with what it does for pairs of tangents and common tangents.",
  whyItMatters:
    "7 PYQs, two HARD. Two read a parabola's parts — a directrix after completing the square, the triangle on the latus rectum. " +
    "Five are tangents: the condition c = a/m, a tangent parallel to a line, the angle between the two tangents from a point, a common tangent to two parabolas, and the angle at which two parabolas cross. Two cards.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cetcon-parabola-forms",
      name: "Standard Forms, Focus, Directrix and Latus Rectum",
      intuition:
        "A parabola is the set of points as far from a fixed point (the focus) as from a fixed line (the directrix). In y² = 4ax the focus is a to the right of the vertex and the directrix a to the left. The latus rectum is the chord through the focus perpendicular to the axis; its length is 4a. A parabola whose vertex is not at the origin is brought to a standard form by completing the square.",
      definition:
        "- \\(y^2 = 4ax\\): focus \\((a, 0)\\), directrix \\(x = -a\\), latus rectum ends \\((a, \\pm 2a)\\).\n" +
        "- \\(y^2 = -4ax\\) opens left; \\(x^2 = 4ay\\) opens up, focus \\((0, a)\\), directrix \\(y = -a\\); \\(x^2 = -4ay\\) opens down.\n" +
        "- Latus rectum length \\(= 4a\\).\n" +
        "- Shifted: \\((y - k)^2 = 4a(x - h)\\) has vertex \\((h, k)\\), focus \\((h + a, k)\\), directrix \\(x = h - a\\).\n" +
        "- Complete the square in the squared variable first; the coefficient of the other variable must then be written as \\(\\pm 4a(\\ldots)\\).",
      formula: {
        label: "Parabola y² = 4ax",
        latex: "y^2 = 4ax: \\quad S(a, 0), \\quad x = -a, \\quad LR = 4a",
      },
      authoredExample: {
        prompt: "Find the focus and directrix of \\(y^2 - 6y - 8x + 17 = 0\\).",
        steps: [
          "\\((y - 3)^2 = 8x - 8 = 8(x - 1)\\), so the vertex is \\((1, 3)\\) and \\(4a = 8\\), \\(a = 2\\).",
          "It opens right: focus \\((1 + 2, 3)\\), directrix \\(x = 1 - 2\\).",
        ],
        answer: "Focus \\((3, 3)\\); directrix \\(x = -1\\)",
      },
      selfCheckExample: {
        prompt: "Find the area of the triangle formed by the vertex and the ends of the latus rectum of \\(y^2 = 12x\\).",
        steps: [
          "\\(a = 3\\): the latus rectum is \\(4a = 12\\) long, at distance \\(a = 3\\) from the vertex.",
          "Area \\(= \\frac12 \\times 12 \\times 3\\).",
        ],
        answer: "18 sq. units",
      },
      practiceSet: [
        { prompt: "Directrix of \\(x^2 = -16y\\)?", answer: "\\(y = 4\\)" },
        { prompt: "Length of the latus rectum of \\(y^2 = 10x\\)?", answer: "10" },
        { prompt: "Vertex of \\((x + 1)^2 = 4(y - 2)\\)?", answer: "\\((-1, 2)\\)" },
      ],
      pyqExampleId: "57f2328f-2118-47c9-96a0-bb2579000d41",
      traps: [
        {
          title: "Putting the directrix on the same side as the focus",
          body: "The directrix is a from the vertex on the side AWAY from the focus. (y + 2)² = −4(x − ½) opens left, so the focus is left of x = ½ and the directrix is to the right, at x = 3/2.",
        },
        {
          title: "Reading 4a as a",
          body: "In x² = 20y, 4a = 20 and a = 5. The latus rectum is 20 long and lies 5 from the vertex.",
        },
        {
          title: "Forgetting the sign when completing the square",
          body: "y² + 4y + 4x + 2 = 0 gives (y + 2)² = −4x + 2 = −4(x − ½). The x-coefficient is negative, so the parabola opens left.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetcon-parabola-tangents",
      name: "Tangents: y = mx + a/m, Pairs of Tangents and Angles Between Curves",
      intuition:
        "A line meets y² = 4ax in two points, one point, or none. It touches when the quadratic for the meeting points has equal roots, which gives c = a/m. From a point outside, that condition becomes a quadratic in m with two roots — the two tangents. A common tangent to two curves satisfies both conditions at once. The angle between two curves at a point is the angle between their tangents there.",
      definition:
        "- \\(y = mx + c\\) touches \\(y^2 = 4ax\\) iff \\(c = \\dfrac{a}{m}\\); it touches \\(x^2 = 4ay\\) iff \\(c = -am^2\\).\n" +
        "- Tangents from \\((h, k)\\): \\(k = mh + \\dfrac{a}{m}\\), i.e. \\(hm^2 - km + a = 0\\). Its roots are the two slopes; \\(\\tan\\theta = \\left|\\dfrac{m_1 - m_2}{1 + m_1m_2}\\right|\\).\n" +
        "- Common tangent to \\(y^2 = 4ax\\) and \\(x^2 = 4by\\): \\(m^3 = -\\dfrac{a}{b}\\), then \\(c = \\dfrac{a}{m}\\).\n" +
        "- Angle between curves at a common point: slopes by implicit differentiation, then the same tan θ formula; \\(m_1m_2 = -1\\) means they cut at right angles.",
      formula: {
        label: "Tangency condition",
        latex: "y = mx + c \\text{ touches } y^2 = 4ax \\iff c = \\frac{a}{m}",
      },
      authoredExample: {
        prompt: "Find the tangent to \\(y^2 = 12x\\) that is parallel to \\(y = 3x + 5\\).",
        steps: [
          "\\(a = 3\\), \\(m = 3\\), so \\(c = \\dfrac{a}{m} = 1\\).",
          "The tangent is \\(y = 3x + 1\\).",
        ],
        answer: "\\(3x - y + 1 = 0\\)",
      },
      selfCheckExample: {
        prompt: "Find the angle between the tangents drawn from \\((2, 3)\\) to \\(y^2 = 4x\\).",
        steps: [
          "\\(3 = 2m + \\dfrac1m \\Rightarrow 2m^2 - 3m + 1 = 0\\), so \\(m = 1, \\frac12\\).",
          "\\(\\tan\\theta = \\dfrac{1 - \\frac12}{1 + \\frac12} = \\dfrac13\\).",
        ],
        answer: "\\(\\tan^{-1}\\dfrac13\\)",
      },
      practiceSet: [
        { prompt: "For which m does \\(y = mx + 2\\) touch \\(y^2 = 8x\\)?", answer: "\\(m = 1\\)" },
        { prompt: "Slope of the common tangent to \\(y^2 = 4x\\) and \\(x^2 = 4y\\)?", answer: "\\(-1\\)", method: "\\(m^3 = -1\\)." },
      ],
      pyqExampleId: "c59e89cf-5db6-40b2-8e7d-4bdb137fb021",
      traps: [
        {
          title: "Using c = a/m for an upward parabola",
          body: "c = a/m is for y² = 4ax. For x² = 4ay the condition is c = −am². A common-tangent question needs both, one for each curve.",
        },
        {
          title: "Forgetting the modulus in the angle",
          body: "The angle between two lines is acute, so take |m₁ − m₂|/|1 + m₁m₂|. From Vieta, |m₁ − m₂| = √((m₁ + m₂)² − 4m₁m₂).",
        },
        {
          title: "Differentiating the wrong variable",
          body: "For x² + 4(y − 3) = 0, differentiate with respect to x: 2x + 4y′ = 0, so y′ = −x/2. At (2, 2) this is −1, not 1.",
        },
      ],
    },
  ],
  related: [
    { label: "Ellipse and Hyperbola", href: "/notes/mht-cet-maths/conic-sections/cetcon-ellipse-hyperbola" },
  ],
};
