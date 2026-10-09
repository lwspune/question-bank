import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_MAT_GEO_LINES_NOTE: SubtopicNote = {
  subtopicName: "Coordinate Geometry of Lines",
  title: "Distance, Midpoint, Gradient and Lines",
  oneLineDefinition:
    "On a coordinate grid, Pythagoras gives distances, averages give midpoints, and the gradient fixes a line and tells you when two lines are parallel or perpendicular.",
  whyItMatters:
    "Lines were a favourite of the older papers: a gradient from two points (2017), a line through a point perpendicular to a given line (2014, 2018), a perpendicular bisector (2011) and the area enclosed by three lines (2022). The ministry papers have asked about circles instead, but every circle question uses distance and midpoint.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "imat-geo-distance-midpoint",
      name: "Distance and midpoint between two points",
      intuition:
        "The horizontal and vertical gaps between two points are the legs of a right triangle, and the distance between the points is its hypotenuse. The midpoint sits halfway along both gaps, so its coordinates are the averages of the coordinates of the ends.",
      definition:
        "For points \\(P(x_1, y_1)\\) and \\(Q(x_2, y_2)\\):\n" +
        "- **Distance** \\(PQ = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}\\).\n" +
        "- **Midpoint** \\(M = \\left(\\dfrac{x_1 + x_2}{2}, \\dfrac{y_1 + y_2}{2}\\right)\\).\n" +
        "- If \\(M\\) is the midpoint and \\(P\\) one end, the other end is \\(Q = (2x_M - x_1,\\ 2y_M - y_1)\\).",
      formula: {
        label: "Distance and midpoint",
        latex: "d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2} \\qquad M = \\left(\\frac{x_1 + x_2}{2}, \\frac{y_1 + y_2}{2}\\right)",
      },
      authoredExample: {
        prompt: "Find the distance between \\(A(-2, 5)\\) and \\(B(4, -3)\\), and the midpoint of AB.",
        steps: [
          "Gaps: \\(4 - (-2) = 6\\) across and \\(-3 - 5 = -8\\) up.",
          "Distance: \\(\\sqrt{6^2 + 8^2} = \\sqrt{100} = 10\\).",
          "Midpoint: \\(\\left(\\dfrac{-2 + 4}{2}, \\dfrac{5 + (-3)}{2}\\right) = (1, 1)\\).",
        ],
        answer: "\\(AB = 10\\); midpoint \\((1, 1)\\)",
      },
      selfCheckExample: {
        prompt: "The point \\(M(3, -1)\\) is the midpoint of the segment PQ, and \\(P = (7, 4)\\). What are the coordinates of Q?",
        options: ["\\((5, 1.5)\\)", "\\((11, 9)\\)", "\\((4, 5)\\)", "\\((-1, -6)\\)", "\\((-4, -5)\\)"],
        steps: [
          "\\(Q = (2 \\times 3 - 7,\\ 2 \\times (-1) - 4) = (-1, -6)\\).",
          "Check: the midpoint of \\((7, 4)\\) and \\((-1, -6)\\) is \\((3, -1)\\).",
          "A is the midpoint of P and M; B goes the wrong way from P; C and E are the differences \\(P - M\\) and \\(M - P\\).",
        ],
        answer: "(D) \\((-1, -6)\\)",
      },
      practiceSet: [
        { prompt: "Distance from \\((0, 0)\\) to \\((5, 12)\\)?", answer: "13" },
        { prompt: "Midpoint of \\((-4, 6)\\) and \\((8, 2)\\)?", answer: "\\((2, 4)\\)" },
        { prompt: "Distance between \\((1, 2)\\) and \\((4, 6)\\)?", answer: "5" },
        {
          prompt: "A circle has a diameter with ends \\((1, 3)\\) and \\((7, 11)\\). Find its centre and radius.",
          answer: "Centre \\((4, 7)\\), radius 5",
          method: "Midpoint, then half of the distance 10",
        },
      ],
      traps: [
        {
          title: "The midpoint uses sums, the distance uses differences",
          body: "Average the coordinates for a midpoint: \\((x_1 + x_2)/2\\). Half the difference, \\((x_2 - x_1)/2\\), is how far the midpoint is from each end, not where it is.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-geo-gradient-line",
      name: "Gradient and the equation of a straight line",
      intuition:
        "The gradient says how many units a line rises for each unit it moves to the right. One point and the gradient fix a line completely, so the equation follows straight from them.",
      definition:
        "- **Gradient** through \\((x_1, y_1)\\) and \\((x_2, y_2)\\): \\(m = \\dfrac{y_2 - y_1}{x_2 - x_1}\\) (rise over run). Positive \\(m\\) slopes up, negative slopes down.\n" +
        "- **Gradient-intercept form**: \\(y = mx + c\\), with y-intercept \\(c\\).\n" +
        "- **Point-gradient form**: \\(y - y_1 = m(x - x_1)\\).\n" +
        "- **General form** \\(ax + by + c = 0\\): rearrange for \\(y\\); the gradient is \\(-a/b\\).\n" +
        "- Horizontal lines are \\(y = k\\) (gradient 0); vertical lines are \\(x = k\\) (no gradient).\n" +
        "- Intercepts: put \\(x = 0\\) for the y-intercept and \\(y = 0\\) for the x-intercept.",
      formula: {
        label: "Gradient and line through a point",
        latex: "m = \\frac{y_2 - y_1}{x_2 - x_1} \\qquad y - y_1 = m(x - x_1)",
      },
      authoredExample: {
        prompt: "Find the equation of the line through \\((1, -2)\\) and \\((4, 7)\\), and its intercepts with the axes.",
        steps: [
          "\\(m = \\dfrac{7 - (-2)}{4 - 1} = \\dfrac{9}{3} = 3\\).",
          "\\(y - (-2) = 3(x - 1)\\), so \\(y = 3x - 5\\). Check with \\((4, 7)\\): \\(12 - 5 = 7\\).",
          "y-intercept \\(-5\\); x-intercept from \\(0 = 3x - 5\\): \\(x = \\tfrac{5}{3}\\).",
        ],
        answer: "\\(y = 3x - 5\\); intercepts \\((0, -5)\\) and \\(\\left(\\tfrac{5}{3}, 0\\right)\\)",
      },
      selfCheckExample: {
        prompt: "What is the gradient of the line \\(5x - 2y + 8 = 0\\)?",
        options: ["\\(-\\dfrac{5}{2}\\)", "\\(\\dfrac{2}{5}\\)", "\\(\\dfrac{5}{2}\\)", "\\(-\\dfrac{2}{5}\\)", "\\(4\\)"],
        steps: [
          "Rearrange: \\(2y = 5x + 8\\), so \\(y = \\tfrac{5}{2}x + 4\\). The gradient is \\(\\tfrac{5}{2}\\).",
          "A loses a sign in the rearrangement; B and D turn the ratio upside down; E is the y-intercept.",
        ],
        answer: "(C) \\(\\dfrac{5}{2}\\)",
      },
      practiceSet: [
        { prompt: "Gradient of the line through \\((-1, 4)\\) and \\((3, -4)\\)?", answer: "\\(-2\\)" },
        { prompt: "Equation of the line with gradient \\(\\tfrac{1}{2}\\) through \\((0, 3)\\)?", answer: "\\(y = \\tfrac{1}{2}x + 3\\)" },
        { prompt: "Does \\((2, 5)\\) lie on \\(y = 3x - 1\\)?", answer: "Yes", method: "\\(3 \\times 2 - 1 = 5\\)" },
        { prompt: "Where does \\(y = 4x - 12\\) cross the x-axis?", answer: "\\((3, 0)\\)" },
      ],
      traps: [
        {
          title: "Gradient is change in y over change in x",
          body: "Rise over run: \\((y_2 - y_1)/(x_2 - x_1)\\). Putting the x-difference on top gives the reciprocal, which IMAT includes as an option. Subtract in the same order on top and bottom.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-geo-parallel-perp",
      name: "Parallel and perpendicular lines, and where lines meet",
      intuition:
        "Parallel lines climb at the same rate, so they have equal gradients. Turning a line through a right angle swaps its rise and run and flips one sign, so perpendicular gradients are negative reciprocals: they multiply to \\(-1\\). Two lines meet where both equations hold at once.",
      definition:
        "- **Parallel** lines: \\(m_1 = m_2\\).\n" +
        "- **Perpendicular** lines: \\(m_1 m_2 = -1\\), that is \\(m_2 = -\\dfrac{1}{m_1}\\). (A horizontal and a vertical line are also perpendicular.)\n" +
        "- The **perpendicular bisector** of AB passes through the midpoint of AB with the perpendicular gradient. Every point on it is the same distance from A and from B.\n" +
        "- The **intersection** of two lines is found by solving their equations simultaneously.",
      formula: {
        label: "Parallel and perpendicular gradients",
        latex: "\\text{parallel: } m_1 = m_2 \\qquad \\text{perpendicular: } m_1 m_2 = -1",
      },
      authoredExample: {
        prompt: "Find the perpendicular bisector of the segment from \\(A(1, 2)\\) to \\(B(5, 10)\\).",
        steps: [
          "Midpoint: \\((3, 6)\\). Gradient of AB: \\(\\dfrac{10 - 2}{5 - 1} = 2\\).",
          "Perpendicular gradient: \\(-\\tfrac{1}{2}\\).",
          "\\(y - 6 = -\\tfrac{1}{2}(x - 3)\\). Multiply by 2: \\(2y - 12 = -x + 3\\), so \\(x + 2y = 15\\).",
          "Check: \\((5, 5)\\) is on it, and it is \\(\\sqrt{25} = 5\\) from both A and B.",
        ],
        answer: "\\(x + 2y = 15\\)",
      },
      selfCheckExample: {
        prompt: "Which line passes through \\((2, -1)\\) and is perpendicular to \\(2x + 3y = 6\\)?",
        options: ["\\(3x - 2y = 8\\)", "\\(2x + 3y = 1\\)", "\\(3x + 2y = 4\\)", "\\(2x - 3y = 7\\)", "\\(3x - 2y = -8\\)"],
        steps: [
          "Gradient of \\(2x + 3y = 6\\): \\(-\\tfrac{2}{3}\\). Perpendicular gradient: \\(\\tfrac{3}{2}\\).",
          "\\(y + 1 = \\tfrac{3}{2}(x - 2)\\) gives \\(2y + 2 = 3x - 6\\), so \\(3x - 2y = 8\\). Check: \\(6 + 2 = 8\\).",
          "B is the parallel line through the point; C has gradient \\(-\\tfrac{3}{2}\\) (reciprocal without the sign change); D has gradient \\(\\tfrac{2}{3}\\) (sign change without the reciprocal); E has the right gradient but misses the point.",
        ],
        answer: "(A) \\(3x - 2y = 8\\)",
      },
      practiceSet: [
        { prompt: "A line has gradient \\(-4\\). What is the gradient of a line perpendicular to it?", answer: "\\(\\tfrac{1}{4}\\)" },
        { prompt: "Are \\(y = 3x + 1\\) and \\(6x - 2y = 5\\) parallel?", answer: "Yes", method: "Both have gradient 3" },
        { prompt: "Where do \\(y = 2x - 1\\) and \\(y = -x + 8\\) meet?", answer: "\\((3, 5)\\)", method: "\\(2x - 1 = -x + 8\\)" },
        { prompt: "Find the area of the triangle formed by the axes and the line \\(2x + y = 8\\).", answer: "16", method: "Intercepts \\((4, 0)\\) and \\((0, 8)\\); \\(\\tfrac{1}{2} \\times 4 \\times 8\\)" },
      ],
      traps: [
        {
          title: "A perpendicular gradient needs both a flip and a sign change",
          body: "The perpendicular to a line of gradient \\(m\\) has gradient \\(-1/m\\). Taking only the reciprocal (\\(1/m\\)) or only the negative (\\(-m\\)) gives a line that is not perpendicular; both wrong versions appear among the options.",
        },
      ],
    },
  ],
};
