import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_MA_PS_GENERAL_NOTE: SubtopicNote = {
  subtopicName: "General Second Degree Equation of Two Lines",
  title: "General Second Degree Equation of Two Lines",
  oneLineDefinition:
    "When ax² + 2hxy + by² + 2gx + 2fy + c = 0 is a pair of lines: the test for it, its separate equations, the angle between the lines, where they meet, and the median of the triangle a pair makes with a third line.",
  whyItMatters:
    "29 questions, three of them from board papers: the condition on hxy + gx + fy + c = 0 for a pair of lines (an MCQ in 2015), p and q when px² − 8xy + 3y² + 14x + 2y + q = 0 is a pair of perpendicular lines (2019), and the point where the lines x² − y² − 2x + 1 = 0 meet (2025). The textbook rows are Exercise 4.3, its solved examples and the Miscellaneous questions on the general equation.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscmps-pair-test",
      name: "When a general second degree equation is a pair of lines",
      intuition:
        "Multiply two lines that do not pass through the origin and you get every kind of term: x², xy, y², x, y and a constant. That is a general second degree equation. But the converse fails: x² + y² = 25 has the same kinds of terms and is a circle. So there is a test, a determinant built from the six coefficients, and you use it mainly to find an unknown coefficient.",
      definition:
        "- \\(ax^2 + 2hxy + by^2 + 2gx + 2fy + c = 0\\), with at least one of \\(a, h, b\\) not zero, is a **general second degree equation** in \\(x\\) and \\(y\\).\n" +
        "- **Theorem 4.5:** the combined equation of two lines is a general second degree equation: expanding \\((a_1x + b_1y + c_1)(a_2x + b_2y + c_2) = 0\\) gives \\(a = a_1a_2\\), \\(b = b_1b_2\\), \\(2h = a_1b_2 + a_2b_1\\), \\(2g = a_1c_2 + a_2c_1\\), \\(2f = b_1c_2 + b_2c_1\\), \\(c = c_1c_2\\).\n" +
        "- The converse is not true: \\(x^2 + y^2 = 25\\) is a circle, not a pair of lines.\n" +
        "- **Necessary conditions** for a pair of lines: \\(abc + 2fgh - af^2 - bg^2 - ch^2 = 0\\) and \\(h^2 - ab \\geq 0\\). The first expression is the determinant with rows \\(a, h, g\\); \\(h, b, f\\); \\(g, f, c\\).\n" +
        "- The determinant condition alone is not enough to show that an equation is a pair of lines. To **show** that an equation is a pair, factorise it (next concepts); use the condition to **find** an unknown.\n" +
        "- If \\(h^2 - ab < 0\\), the equation is not a pair of lines.",
      formula: {
        label: "Condition for a pair of lines",
        latex: "\\begin{vmatrix} a & h & g \\\\ h & b & f \\\\ g & f & c \\end{vmatrix} = abc + 2fgh - af^2 - bg^2 - ch^2 = 0, \\qquad h^2 - ab \\geq 0",
      },
      authoredExample: {
        prompt: "Find the value of \\(k\\) if the equation \\(2x^2 + 3xy + y^2 + 5x + 2y + k = 0\\) represents a pair of lines.",
        steps: [
          "Comparing with \\(ax^2 + 2hxy + by^2 + 2gx + 2fy + c = 0\\): \\(a = 2\\), \\(h = \\dfrac{3}{2}\\), \\(b = 1\\), \\(g = \\dfrac{5}{2}\\), \\(f = 1\\), \\(c = k\\).",
          "For a pair of lines, \\(abc + 2fgh - af^2 - bg^2 - ch^2 = 0\\).",
          "\\(\\therefore (2)(1)(k) + 2(1)\\left(\\dfrac{5}{2}\\right)\\left(\\dfrac{3}{2}\\right) - 2(1)^2 - (1)\\left(\\dfrac{5}{2}\\right)^2 - k\\left(\\dfrac{3}{2}\\right)^2 = 0\\)",
          "\\(\\therefore 2k + \\dfrac{15}{2} - 2 - \\dfrac{25}{4} - \\dfrac{9k}{4} = 0\\)",
          "Multiply by 4: \\(8k + 30 - 8 - 25 - 9k = 0\\), so \\(-k - 3 = 0\\).",
          "\\(\\therefore k = -3\\). Check: \\(2x^2 + 3xy + y^2 + 5x + 2y - 3 = (2x + y - 1)(x + y + 3)\\).",
        ],
        answer: "\\(k = -3\\)",
      },
      selfCheckExample: {
        prompt: "Show that \\(x^2 + 4xy + 5y^2 - 2x + 1 = 0\\) does not represent a pair of lines.",
        steps: ["\\(a = 1\\), \\(h = 2\\), \\(b = 5\\).", "\\(h^2 - ab = 4 - 5 = -1 < 0\\), so the necessary condition \\(h^2 - ab \\geq 0\\) fails."],
        answer: "It is not a pair of lines, since \\(h^2 - ab < 0\\)",
      },
      practiceSet: [
        { prompt: "In \\(4x^2 - 3xy + 6x - 8y + 5 = 0\\), write the values of \\(h\\), \\(g\\) and \\(f\\).", answer: "\\(h = -\\dfrac{3}{2}\\), \\(g = 3\\), \\(f = -4\\)" },
        { prompt: "Find \\(k\\) if \\(x^2 - 4y^2 + 4y + k = 0\\) represents a pair of lines.", answer: "\\(k = -1\\); the lines are \\(x - 2y + 1 = 0\\) and \\(x + 2y - 1 = 0\\)" },
        { prompt: "Is the condition \\(abc + 2fgh - af^2 - bg^2 - ch^2 = 0\\) enough to show that an equation is a pair of lines?", answer: "No. It is necessary but not sufficient; factorise the equation to show it" },
      ],
      pyqExampleId: "9b347849-3264-4153-b034-0084c1beedb0",
      traps: [
        {
          title: "Taking g and f as the whole coefficients",
          body: "The coefficient of \\(x\\) is \\(2g\\) and of \\(y\\) is \\(2f\\). In \\(3x^2 + 10xy + 3y^2 + 16y + k = 0\\), \\(f = 8\\) and \\(g = 0\\), not \\(f = 16\\).",
        },
        {
          title: "Showing a pair by the determinant alone",
          body: "The textbook warns that the determinant condition is not sufficient. When a question says 'show that the equation represents a pair of lines', factorise it into two linear factors.",
        },
        {
          title: "Forgetting the second condition",
          body: "Both conditions are needed: the determinant zero and \\(h^2 - ab \\geq 0\\). An equation with \\(h^2 - ab < 0\\) is not a pair of lines, whatever its determinant.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmps-general-props",
      name: "Angle, perpendicular and parallel lines, and the point of intersection",
      intuition:
        "Moving a pair of lines away from the origin does not turn them, so the second degree part ax² + 2hxy + by² still decides their directions. The angle, the perpendicular test and the parallel test are the same as for the pair through the origin. Only the meeting point needs the other coefficients.",
      definition:
        "- If \\(ax^2 + 2hxy + by^2 + 2gx + 2fy + c = 0\\) is a pair of lines, the lines are parallel to the lines \\(ax^2 + 2hxy + by^2 = 0\\).\n" +
        "- Acute angle: \\(\\tan\\theta = \\left|\\dfrac{2\\sqrt{h^2 - ab}}{a + b}\\right|\\).\n" +
        "- Perpendicular: \\(a + b = 0\\). Parallel: \\(h^2 - ab = 0\\).\n" +
        "- Intersecting: \\(h^2 - ab > 0\\), and the point of intersection is \\(\\left(\\dfrac{hf - bg}{ab - h^2}, \\dfrac{gh - af}{ab - h^2}\\right)\\).\n" +
        "- For 'find p and q' questions: the perpendicular (or parallel) condition gives one unknown; the determinant condition then gives the other.",
      formula: {
        label: "Point of intersection of the pair",
        latex: "\\left(\\frac{hf - bg}{ab - h^2},\\ \\frac{gh - af}{ab - h^2}\\right)",
      },
      authoredExample: {
        prompt:
          "The equation \\(x^2 - 5xy + 4y^2 + x + 2y - 2 = 0\\) represents a pair of lines. Find the acute angle between them and their point of intersection.",
        steps: [
          "Comparing: \\(a = 1\\), \\(h = -\\dfrac{5}{2}\\), \\(b = 4\\), \\(g = \\dfrac{1}{2}\\), \\(f = 1\\), \\(c = -2\\).",
          "\\(h^2 - ab = \\dfrac{25}{4} - 4 = \\dfrac{9}{4}\\), so \\(\\tan\\theta = \\left|\\dfrac{2 \\times \\frac{3}{2}}{1 + 4}\\right| = \\dfrac{3}{5}\\) and \\(\\theta = \\tan^{-1}\\left(\\dfrac{3}{5}\\right)\\).",
          "\\(ab - h^2 = 4 - \\dfrac{25}{4} = -\\dfrac{9}{4}\\).",
          "\\(x = \\dfrac{hf - bg}{ab - h^2} = \\dfrac{-\\frac{5}{2} - 2}{-\\frac{9}{4}} = \\dfrac{-\\frac{9}{2}}{-\\frac{9}{4}} = 2\\).",
          "\\(y = \\dfrac{gh - af}{ab - h^2} = \\dfrac{-\\frac{5}{4} - 1}{-\\frac{9}{4}} = \\dfrac{-\\frac{9}{4}}{-\\frac{9}{4}} = 1\\).",
          "Check: the equation factorises as \\((x - y - 1)(x - 4y + 2) = 0\\), and \\((2, 1)\\) lies on both lines.",
        ],
        answer: "\\(\\theta = \\tan^{-1}\\left(\\dfrac{3}{5}\\right)\\); the lines meet at \\((2, 1)\\)",
      },
      selfCheckExample: {
        prompt: "The equation \\(ax^2 + 4xy + 2y^2 + 3x + 3y - 2 = 0\\) represents a pair of parallel lines. Find \\(a\\).",
        steps: ["Parallel lines: \\(h^2 - ab = 0\\), with \\(h = 2\\), \\(b = 2\\).", "\\(4 - 2a = 0\\), so \\(a = 2\\). Indeed the equation is then \\((x + y + 2)(2x + 2y - 1) = 0\\)."],
        answer: "\\(a = 2\\)",
      },
      practiceSet: [
        { prompt: "A general second degree equation that is a pair of lines has \\(a = 5\\) and \\(b = -5\\). What can you say about the lines?", answer: "They are perpendicular, since \\(a + b = 0\\)" },
        { prompt: "Use the formula to find the point of intersection of the lines \\(xy - 2x - 3y + 6 = 0\\).", answer: "\\((3, 2)\\)" },
        { prompt: "Find the acute angle between the lines represented by \\(3x^2 + 4xy + y^2 - 2x - 1 = 0\\).", answer: "\\(\\tan\\theta = \\dfrac{1}{2}\\), so \\(\\theta = \\tan^{-1}\\left(\\dfrac{1}{2}\\right)\\)" },
      ],
      pyqExampleId: "84f2e3ec-6822-4832-9f1e-0dcc05569175",
      traps: [
        {
          title: "Turning the denominator round",
          body: "The denominator in the point of intersection is \\(ab - h^2\\), not \\(h^2 - ab\\). Using the wrong one gives the point reflected through the origin.",
        },
        {
          title: "Stopping after the perpendicular condition",
          body: "\\(a + b = 0\\) fixes only the coefficient of \\(x^2\\) or \\(y^2\\). The constant term still has to come from \\(abc + 2fgh - af^2 - bg^2 - ch^2 = 0\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmps-factorise-general",
      name: "Separate equations of a general pair, and where the lines meet",
      intuition:
        "Factorise the second degree part first; it tells you the two directions. Each line is then one of those factors plus an unknown constant. Comparing the x, y and constant terms finds the constants, and the third comparison checks that the equation really is a pair. An equation written in (x − α) and (y − β) is just a pair through the origin moved to the point (α, β).",
      definition:
        "- Factorise \\(ax^2 + 2hxy + by^2 = (l_1x + m_1y)(l_2x + m_2y)\\).\n" +
        "- Write the equation as \\((l_1x + m_1y + p)(l_2x + m_2y + q) = 0\\) and compare the coefficients of \\(x\\), of \\(y\\) and the constant. Two comparisons find \\(p\\) and \\(q\\); the third is the check.\n" +
        "- An equation in \\(X = x - \\alpha\\) and \\(Y = y - \\beta\\): factorise it as a homogeneous equation in \\(X\\) and \\(Y\\), then put back \\(x - \\alpha\\) and \\(y - \\beta\\). Both lines pass through \\((\\alpha, \\beta)\\).\n" +
        "- Lines through \\((\\alpha, \\beta)\\) parallel to the lines \\(ax^2 + 2hxy + by^2 = 0\\): \\(a(x - \\alpha)^2 + 2h(x - \\alpha)(y - \\beta) + b(y - \\beta)^2 = 0\\).\n" +
        "- The point where the lines meet: solve the two separate equations together (or use the formula on the previous concept).",
      formula: {
        label: "Pair through (α, β) parallel to a pair through the origin",
        latex: "a(x - \\alpha)^2 + 2h(x - \\alpha)(y - \\beta) + b(y - \\beta)^2 = 0",
      },
      authoredExample: {
        prompt: "Find the separate equations of the lines represented by \\((x + 1)^2 - 4(x + 1)(y - 3) + 3(y - 3)^2 = 0\\).",
        steps: [
          "Put \\(X = x + 1\\) and \\(Y = y - 3\\): the equation is \\(X^2 - 4XY + 3Y^2 = 0\\).",
          "\\(X^2 - XY - 3XY + 3Y^2 = 0\\), so \\(X(X - Y) - 3Y(X - Y) = 0\\).",
          "\\(\\therefore (X - Y)(X - 3Y) = 0\\).",
          "\\(X - Y = 0\\): \\((x + 1) - (y - 3) = 0\\), that is \\(x - y + 4 = 0\\).",
          "\\(X - 3Y = 0\\): \\((x + 1) - 3(y - 3) = 0\\), that is \\(x - 3y + 10 = 0\\).",
          "Both lines pass through \\((-1, 3)\\), as they should.",
        ],
        answer: "\\(x - y + 4 = 0\\) and \\(x - 3y + 10 = 0\\)",
      },
      selfCheckExample: {
        prompt: "Find the separate equations of the lines represented by \\(x^2 - 4y^2 + 2x + 8y - 3 = 0\\).",
        steps: [
          "Complete the squares: \\((x + 1)^2 - 1 - 4(y - 1)^2 + 4 - 3 = 0\\), so \\((x + 1)^2 - (2y - 2)^2 = 0\\).",
          "Difference of squares: \\((x + 1 - 2y + 2)(x + 1 + 2y - 2) = 0\\).",
        ],
        answer: "\\(x - 2y + 3 = 0\\) and \\(x + 2y - 1 = 0\\)",
      },
      practiceSet: [
        { prompt: "Find the joint equation of the lines through \\((1, 2)\\) parallel to the lines \\(x^2 - y^2 = 0\\).", answer: "\\((x - 1)^2 - (y - 2)^2 = 0\\), that is \\(x^2 - y^2 - 2x + 4y - 3 = 0\\)" },
        { prompt: "Find the separate equations of the lines represented by \\((x - 1)^2 - 9(y + 2)^2 = 0\\).", answer: "\\(x - 3y - 7 = 0\\) and \\(x + 3y + 5 = 0\\)" },
        { prompt: "The pairs of opposite sides of a rectangle are \\(x^2 - 4x + 3 = 0\\) and \\(y^2 - 5y + 4 = 0\\). Find its vertices.", answer: "The sides are \\(x = 1, x = 3, y = 1, y = 4\\); the vertices are \\((1, 1), (3, 1), (3, 4), (1, 4)\\)" },
      ],
      pyqExampleId: "6449ae70-2840-4f78-ab18-ac009189d6ef",
      traps: [
        {
          title: "Comparing only two coefficients",
          body: "Two comparisons are enough to find \\(p\\) and \\(q\\), but the third (usually the constant term) must also be checked. If it fails, the equation is not a pair of lines.",
        },
        {
          title: "The wrong sign when putting x back",
          body: "\\(X = x + 1\\) means \\(\\alpha = -1\\). After factorising in \\(X\\) and \\(Y\\), substitute \\(x + 1\\) and \\(y - 3\\) exactly as written; a sign slip moves the lines off the point \\((-1, 3)\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmps-median",
      name: "Median of the triangle a pair makes with a third line",
      intuition:
        "A pair of lines through the origin and a third line form a triangle OAB. The median from O needs only the midpoint of AB. When you substitute the third line into the pair, the x-coordinates of A and B are the two roots of one quadratic, so their sum, and so the midpoint, comes without solving it.",
      definition:
        "- Let the pair through the origin meet the third line at \\(A(x_1, y_1)\\) and \\(B(x_2, y_2)\\). The midpoint of AB is \\(P\\left(\\dfrac{x_1 + x_2}{2}, \\dfrac{y_1 + y_2}{2}\\right)\\).\n" +
        "- Substitute the third line into the pair to get a quadratic in \\(x\\) (or \\(y\\)). Its roots are \\(x_1\\) and \\(x_2\\), so \\(x_1 + x_2 = -\\dfrac{\\text{coefficient of } x}{\\text{coefficient of } x^2}\\).\n" +
        "- Halve it for the midpoint, find the other co-ordinate from the third line, and write the line through \\(O\\) and \\(P\\).",
      formula: {
        label: "Sum of the roots",
        latex: "Ax^2 + Bx + C = 0 \\;\\Rightarrow\\; x_1 + x_2 = -\\frac{B}{A}",
      },
      authoredExample: {
        prompt:
          "Triangle OAB is formed by the lines \\(x^2 + 6xy + 5y^2 = 0\\) and the line \\(5x + 7y - 9 = 0\\). Find the equation of the median of the triangle drawn from O.",
        steps: [
          "Let \\(A(x_1, y_1)\\) and \\(B(x_2, y_2)\\). From \\(5x + 7y - 9 = 0\\), \\(5x = 9 - 7y\\).",
          "Multiply the pair by 25: \\((5x)^2 + 30y(5x) + 125y^2 = 0\\). Substitute \\(5x = 9 - 7y\\): \\((9 - 7y)^2 + 30y(9 - 7y) + 125y^2 = 0\\), that is \\(-36y^2 + 144y + 81 = 0\\), or \\(4y^2 - 16y - 9 = 0\\).",
          "\\(y_1\\) and \\(y_2\\) are its roots: \\(y_1 + y_2 = \\dfrac{16}{4} = 4\\), so the midpoint P has \\(y = 2\\).",
          "P lies on \\(5x + 7y - 9 = 0\\): \\(5x = 9 - 14 = -5\\), so \\(x = -1\\). So \\(P(-1, 2)\\).",
          "The median OP has slope \\(\\dfrac{2}{-1} = -2\\): \\(y = -2x\\).",
        ],
        answer: "\\(2x + y = 0\\)",
      },
      selfCheckExample: {
        prompt: "Find the points where the line \\(x + 2y = 3\\) meets the lines \\(x^2 - y^2 = 0\\).",
        steps: ["The pair is \\(y = x\\) and \\(y = -x\\).", "With \\(y = x\\): \\(3x = 3\\), the point \\((1, 1)\\). With \\(y = -x\\): \\(-x = 3\\), the point \\((-3, 3)\\)."],
        answer: "\\((1, 1)\\) and \\((-3, 3)\\)",
      },
      practiceSet: [
        { prompt: "The x-coordinates of A and B are the roots of \\(3x^2 - 12x + 5 = 0\\). Find the x-coordinate of the midpoint of AB.", answer: "\\(\\dfrac{1}{2} \\times \\dfrac{12}{3} = 2\\)" },
        { prompt: "Find the equation of the line through the origin and the point \\((2, 5)\\).", answer: "\\(5x - 2y = 0\\)" },
      ],
      pyqExampleId: "bcd43c6a-d308-47ac-b230-acc37de4a088",
      traps: [
        {
          title: "Forgetting to halve the sum",
          body: "The sum of the roots is \\(x_1 + x_2\\); the midpoint needs \\(\\dfrac{x_1 + x_2}{2}\\). Using the sum itself gives a point that is not on AB.",
        },
      ],
    },
  ],
};
