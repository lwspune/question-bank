import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_MAT_GEO_CIRCLE_PARABOLA_NOTE: SubtopicNote = {
  subtopicName: "Circles and Parabolas in Coordinates",
  title: "Equations of Circles and Parabolas",
  oneLineDefinition:
    "A circle is every point at a fixed distance from its centre, which gives its equation; completing the square turns a messy equation into a centre and a radius, or a parabola into its vertex.",
  whyItMatters:
    "Circle equations are the ministry papers' favourite geometry item: 2023 asked how close a circle comes to the coordinate axes, 2026 asked which statement about a given circle is true, and a 2013 question matched a centre and radius to an equation.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "imat-geo-circle-equation",
      name: "Equation of a circle and completing the square",
      intuition:
        "A point \\((x, y)\\) is on the circle when its distance from the centre is the radius. Write that distance with Pythagoras, square both sides, and you have the equation. Expanded, the equation hides the centre; completing the square brings it back.",
      definition:
        "- **Centre-radius form**: the circle with centre \\((a, b)\\) and radius \\(r\\) is \\((x - a)^2 + (y - b)^2 = r^2\\).\n" +
        "- **Expanded form**: \\(x^2 + y^2 + Dx + Ey + F = 0\\), with the same coefficient on \\(x^2\\) and \\(y^2\\) (divide through first if it is not 1). Then the centre is \\(\\left(-\\tfrac{D}{2}, -\\tfrac{E}{2}\\right)\\) and \\(r^2 = \\tfrac{D^2}{4} + \\tfrac{E^2}{4} - F\\).\n" +
        "- **Completing the square**: \\(x^2 + Dx = \\left(x + \\tfrac{D}{2}\\right)^2 - \\tfrac{D^2}{4}\\).\n" +
        "- If \\(F = 0\\), the point \\((0, 0)\\) satisfies the equation, so the circle passes through the origin.\n" +
        "- The centre \\((a, b)\\) is \\(|b|\\) from the x-axis and \\(|a|\\) from the y-axis. The circle cuts an axis if that distance is less than \\(r\\), touches it if equal, and otherwise misses it by the distance minus \\(r\\).",
      formula: {
        label: "Circle with centre (a, b) and radius r",
        latex: "(x - a)^2 + (y - b)^2 = r^2",
        symbols: [
          { symbol: "\\((a, b)\\)", meaning: "the centre" },
          { symbol: "\\(r\\)", meaning: "the radius" },
        ],
      },
      authoredExample: {
        prompt:
          "Find the centre and radius of \\(x^2 + y^2 + 8x - 10y + 32 = 0\\), and decide whether the circle meets either coordinate axis.",
        steps: [
          "Group and complete the squares: \\((x + 4)^2 - 16 + (y - 5)^2 - 25 + 32 = 0\\).",
          "So \\((x + 4)^2 + (y - 5)^2 = 9\\): centre \\((-4, 5)\\), radius 3.",
          "The centre is 4 from the y-axis and 5 from the x-axis, both more than 3, so the circle meets neither axis.",
          "Its nearest point to the y-axis is \\(4 - 3 = 1\\) away, and to the x-axis \\(5 - 3 = 2\\) away.",
        ],
        answer: "Centre \\((-4, 5)\\), radius 3; it meets neither axis",
      },
      selfCheckExample: {
        prompt: "A circle has the equation \\(2x^2 + 2y^2 - 8x + 12y - 6 = 0\\). What are its centre and radius?",
        options: [
          "Centre \\((-2, 3)\\), radius 4",
          "Centre \\((2, -3)\\), radius 16",
          "Centre \\((4, -6)\\), radius \\(\\sqrt{58}\\)",
          "Centre \\((2, -3)\\), radius \\(\\sqrt{10}\\)",
          "Centre \\((2, -3)\\), radius 4",
        ],
        steps: [
          "Divide by 2: \\(x^2 + y^2 - 4x + 6y - 3 = 0\\).",
          "\\((x - 2)^2 + (y + 3)^2 = 4 + 9 + 3 = 16\\): centre \\((2, -3)\\), radius 4.",
          "A has the signs of the centre reversed; B gives \\(r^2\\) as the radius; C forgets to divide by 2; D subtracts the constant instead of moving it across.",
        ],
        answer: "(E) Centre \\((2, -3)\\), radius 4",
      },
      practiceSet: [
        { prompt: "Centre and radius of \\(x^2 + (y + 2)^2 = 25\\)?", answer: "Centre \\((0, -2)\\), radius 5" },
        { prompt: "Equation of the circle with centre \\((1, -4)\\) and radius 3?", answer: "\\((x - 1)^2 + (y + 4)^2 = 9\\)" },
        { prompt: "Does \\((4, 0)\\) lie on \\(x^2 + y^2 - 4x = 0\\)?", answer: "Yes", method: "\\(16 + 0 - 16 = 0\\)" },
        {
          prompt: "How far is the circle \\((x - 8)^2 + (y + 6)^2 = 16\\) from the x-axis at its nearest point?",
          answer: "2",
          method: "Centre 6 below the axis, radius 4",
        },
      ],
      traps: [
        {
          title: "(x minus a) squared means the centre is at plus a",
          body: "In \\((x + 4)^2 + (y - 5)^2 = 9\\) the centre is \\((-4, 5)\\), not \\((4, -5)\\). And the right-hand side is \\(r^2\\): here the radius is 3, not 9.",
        },
        {
          title: "Divide through before reading off the centre",
          body: "The rule centre \\(= (-D/2, -E/2)\\) only works when \\(x^2\\) and \\(y^2\\) have coefficient 1. If the equation starts \\(2x^2 + 2y^2\\), divide every term by 2 first.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-geo-parabola",
      name: "The parabola y = ax² + bx + c: vertex, axis and where a line meets it",
      intuition:
        "Completing the square writes a parabola as a squared bracket plus a number. The squared bracket is never negative, so the vertex is where it is zero. To see where a line meets the parabola, set the two y-expressions equal: you get a quadratic, and its number of roots is the number of meeting points.",
      definition:
        "- **Vertex form**: \\(y = a(x - p)^2 + q\\) has **vertex** \\((p, q)\\) and **axis of symmetry** \\(x = p\\). Equivalently \\(p = -\\tfrac{b}{2a}\\).\n" +
        "- \\(a > 0\\): opens upwards, vertex is the lowest point. \\(a < 0\\): opens downwards, vertex is the highest point.\n" +
        "- The y-intercept is \\(c\\).\n" +
        "- A line \\(y = mx + k\\) meets the parabola where \\(ax^2 + bx + c = mx + k\\). The discriminant of this quadratic decides: positive, two points; zero, the line **touches** (is a tangent); negative, no meeting point.\n" +
        "- A horizontal line \\(y = k\\) touches an upward parabola only at the height of the vertex.",
      formula: {
        label: "Vertex form",
        latex: "y = a(x - p)^2 + q \\qquad \\text{vertex } (p, q), \\quad \\text{axis } x = p",
      },
      authoredExample: {
        prompt: "Find the vertex of \\(y = x^2 - 4x + 1\\), and find where the line \\(y = 2x - 8\\) meets this parabola.",
        steps: [
          "Complete the square: \\(x^2 - 4x + 1 = (x - 2)^2 - 4 + 1 = (x - 2)^2 - 3\\). Vertex \\((2, -3)\\), axis \\(x = 2\\).",
          "Set equal: \\(x^2 - 4x + 1 = 2x - 8\\), so \\(x^2 - 6x + 9 = 0\\), that is \\((x - 3)^2 = 0\\).",
          "One repeated root, \\(x = 3\\): the line is a tangent, touching at \\((3, 2 \\times 3 - 8) = (3, -2)\\).",
        ],
        answer: "Vertex \\((2, -3)\\); the line touches the parabola at \\((3, -2)\\)",
      },
      selfCheckExample: {
        prompt: "For which value of \\(k\\) does the horizontal line \\(y = k\\) meet the parabola \\(y = 2x^2 - 12x + 23\\) at exactly one point?",
        options: ["3", "5", "23", "77", "\\(-5\\)"],
        steps: [
          "The axis is \\(x = \\dfrac{12}{2 \\times 2} = 3\\); the vertex height is \\(2(9) - 36 + 23 = 5\\).",
          "The parabola opens upwards, so \\(y = k\\) meets it once only at the vertex: \\(k = 5\\).",
          "A gives the x-coordinate of the vertex; C is the y-intercept; D uses \\(x = -3\\) for the axis.",
        ],
        answer: "(B) 5",
      },
      practiceSet: [
        { prompt: "Vertex of \\(y = (x - 2)^2 + 7\\)?", answer: "\\((2, 7)\\)" },
        { prompt: "Axis of symmetry of \\(y = -3x^2 + 12x\\)?", answer: "\\(x = 2\\)" },
        { prompt: "Does the line \\(y = x\\) meet \\(y = x^2 + 1\\)?", answer: "No", method: "\\(x^2 - x + 1 = 0\\) has discriminant \\(-3\\)" },
        { prompt: "Where does \\(y = 4x^2 - x - 9\\) cross the y-axis?", answer: "\\((0, -9)\\)" },
      ],
      traps: [
        {
          title: "Touching means a repeated root",
          body: "A line touches a parabola when the combined quadratic has exactly one solution, which means a discriminant of zero. Two different roots mean the line cuts through at two points; no real roots mean it misses.",
        },
      ],
    },
  ],
};
