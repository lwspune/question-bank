import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_CG_LINES_NOTE: SubtopicNote = {
  subtopicName: "Area, Slope and Straight Lines",
  title: "Area, Slope and Straight Lines",
  oneLineDefinition:
    "Three corners give a triangle's area by one formula, two points give a line's slope, three points lie on one line when the area they make is zero, and a slope with one point gives the line's equation.",
  whyItMatters:
    "Seven questions in the bank, five EASY and two MODERATE: two areas, one slope, three points that turn out to lie on one line, and three equations of a line. The MODERATE ones hide a trap: a triangle made by lines (find its corners first) and a triangle that is not a triangle at all.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "spicgli-area",
      name: "Area of a triangle from its corners",
      intuition:
        "If a triangle has a side along an axis, half base times height is enough. For any three corners there is one formula that does the same job, and it never needs the height.",
      definition:
        "- Area of the triangle with corners \\((x_1, y_1), (x_2, y_2), (x_3, y_3)\\) is \\(\\frac{1}{2}\\left|x_1(y_2 - y_3) + x_2(y_3 - y_1) + x_3(y_1 - y_2)\\right|\\).\n" +
        "- The bars mean: if the bracket comes out negative, drop the minus sign. An area is never negative.\n" +
        "- A right triangle with legs along the axes, corners (0, 0), (a, 0) and (0, b), has area \\(\\frac{1}{2}ab\\).\n" +
        "- For a triangle made by three lines, first find its corners: each pair of lines meets at one corner. The line \\(y = x\\) holds every point whose two coordinates are equal.",
      formula: {
        label: "Area of a triangle",
        latex: "\\text{Area} = \\frac{1}{2}\\left|x_1(y_2 - y_3) + x_2(y_3 - y_1) + x_3(y_1 - y_2)\\right|",
      },
      authoredExample: {
        prompt: "Find the area of the triangle with vertices (1, 1), (4, 1) and (4, 5).",
        steps: [
          "\\(\\frac{1}{2}\\left|1(1 - 5) + 4(5 - 1) + 4(1 - 1)\\right| = \\frac{1}{2}\\left|-4 + 16 + 0\\right| = 6\\).",
          "Check: it is a right triangle with legs 3 and 4, and \\(\\frac{1}{2} \\times 3 \\times 4 = 6\\).",
        ],
        answer: "6 square units",
      },
      selfCheckExample: {
        prompt: "Find the area of the triangle with vertices (0, 0), (6, 0) and (0, 5).",
        steps: ["The legs lie along the axes, with lengths 6 and 5.", "Area \\(= \\frac{1}{2} \\times 6 \\times 5 = 15\\)."],
        answer: "15 square units",
      },
      practiceSet: [
        { prompt: "Find the area of the triangle with vertices (2, 3), (6, 3) and (2, 8).", answer: "10 square units" },
        { prompt: "Find the area of the triangle with vertices (−1, 0), (3, 0) and (1, 4).", answer: "8 square units" },
        { prompt: "Find the area of the triangle with vertices (1, 2), (3, 6) and (−2, 1).", answer: "5 square units", method: "\\(\\frac{1}{2}|1(5) + 3(-1) + (-2)(-4)| = \\frac{1}{2}(10)\\)." },
      ],
      pyqExampleId: "91d542fb-f1a5-446d-a437-af5ecb9f6b66",
      traps: [
        {
          title: "Forgetting the half",
          body:
            "The bracket in the area formula gives TWICE the area. Without the \\(\\frac{1}{2}\\) the answer is double, and the double is often printed as an option.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spicgli-slope",
      name: "The slope of a line",
      intuition:
        "Slope is steepness: how far the line rises for each step to the right. Rise over run, taken between any two points on the line.",
      definition:
        "- Slope through \\((x_1, y_1)\\) and \\((x_2, y_2)\\): \\(m = \\dfrac{y_2 - y_1}{x_2 - x_1}\\).\n" +
        "- A horizontal line has slope 0; a vertical line has no slope (the bottom would be 0).\n" +
        "- **Parallel lines** have equal slopes.\n" +
        "- The line \\(ax + by + c = 0\\) has slope \\(-\\dfrac{a}{b}\\).",
      formula: {
        label: "Slope",
        latex: "m = \\frac{y_2 - y_1}{x_2 - x_1} \\qquad ax + by + c = 0 \\Rightarrow m = -\\frac{a}{b}",
      },
      authoredExample: {
        prompt: "Find the slope of the line through (1, 2) and (5, 10).",
        steps: ["Rise: \\(10 - 2 = 8\\). Run: \\(5 - 1 = 4\\).", "\\(m = \\frac{8}{4} = 2\\)."],
        answer: "2",
      },
      selfCheckExample: {
        prompt: "Find the slope of the line through (−2, 3) and (4, −6).",
        steps: ["Rise: \\(-6 - 3 = -9\\). Run: \\(4 - (-2) = 6\\).", "\\(m = \\frac{-9}{6} = -\\frac{3}{2}\\)."],
        answer: "\\(-\\frac{3}{2}\\)",
      },
      practiceSet: [
        { prompt: "Find the slope of the line through (3, 4) and (7, 4).", answer: "0" },
        { prompt: "Find the slope of the line \\(2x - 3y + 6 = 0\\).", answer: "\\(\\frac{2}{3}\\)" },
        { prompt: "Find the slope of the line through (0, 0) and (−2, 6).", answer: "\\(-3\\)" },
      ],
      pyqExampleId: "0b8958a2-a67e-40ae-8911-64ed7e9c4e58",
      traps: [
        {
          title: "Subtracting in different orders",
          body:
            "Take both differences from the same point: \\(\\frac{y_2 - y_1}{x_2 - x_1}\\). Mixing \\(y_2 - y_1\\) with \\(x_1 - x_2\\) flips the sign of the slope.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spicgli-collinear",
      name: "Three points on one line",
      intuition:
        "Three points on one straight line cannot make a triangle: the 'triangle' is flat, so its area is zero. Equally, the slope from the first point to the second matches the slope from the second to the third.",
      definition:
        "Points A, B and C are **collinear** (on one line) when any one of these holds:\n" +
        "- the area of triangle ABC is 0;\n" +
        "- slope AB = slope BC;\n" +
        "- the two shorter distances add up to the longest: AB + BC = AC.\n" +
        "Before naming the type of a triangle from its corners, check that the points are not collinear.",
      formula: {
        label: "Collinearity test",
        latex: "x_1(y_2 - y_3) + x_2(y_3 - y_1) + x_3(y_1 - y_2) = 0",
      },
      authoredExample: {
        prompt: "Show that (1, 2), (3, 6) and (5, 10) lie on one line.",
        steps: [
          "Slope from (1, 2) to (3, 6): \\(\\frac{4}{2} = 2\\). Slope from (3, 6) to (5, 10): \\(\\frac{4}{2} = 2\\).",
          "Equal slopes through the shared point (3, 6), so the points are collinear.",
          "Check by area: \\(1(6 - 10) + 3(10 - 2) + 5(2 - 6) = -4 + 24 - 20 = 0\\).",
        ],
        answer: "Collinear",
      },
      selfCheckExample: {
        prompt: "Find k if the points (1, 1), (2, 3) and (k, 5) are collinear.",
        steps: ["Slope from (1, 1) to (2, 3) is 2.", "Slope from (2, 3) to (k, 5) must also be 2: \\(\\frac{2}{k - 2} = 2\\), so \\(k = 3\\)."],
        answer: "\\(k = 3\\)",
      },
      practiceSet: [
        { prompt: "Are the points (0, 0), (2, 3) and (4, 6) collinear?", answer: "Yes (both slopes are \\(\\frac{3}{2}\\))" },
        { prompt: "Are the points (1, 1), (2, 2) and (3, 5) collinear?", answer: "No (slopes 1 and 3)" },
        { prompt: "Find the area of the triangle with vertices (−1, −1), (1, 1) and (3, 3).", answer: "0, the points are collinear" },
      ],
      pyqExampleId: "a8802620-03df-4d18-bcfd-348e781bec5d",
      traps: [
        {
          title: "Naming a triangle that is not there",
          body:
            "Three points with equal slopes between them lie on one line, so they make no triangle at all. When 'none of these' is an option beside isosceles, equilateral and right-angled, test for collinearity first.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spicgli-equation",
      name: "The equation of a line",
      intuition:
        "A line is fixed by its steepness and one point it passes through. Write the slope between that point and any point (x, y) on the line, and you have its equation.",
      definition:
        "- **Slope and y-intercept:** \\(y = mx + c\\), where c is where the line cuts the y-axis.\n" +
        "- **Slope and a point** \\((x_1, y_1)\\): \\(y - y_1 = m(x - x_1)\\).\n" +
        "- A line **parallel** to \\(ax + by + c = 0\\) has the form \\(ax + by + k = 0\\); put the given point in to find k.\n" +
        "- Clear fractions and bring every term to one side to match the options' form.",
      formula: {
        label: "Equation of a line",
        latex: "y = mx + c \\qquad y - y_1 = m(x - x_1)",
      },
      authoredExample: {
        prompt: "Find the equation of the line through (1, 2) with slope 3.",
        steps: [
          "\\(y - 2 = 3(x - 1)\\).",
          "\\(y - 2 = 3x - 3\\), so \\(y = 3x - 1\\), that is \\(3x - y - 1 = 0\\).",
          "Check: at (1, 2), \\(3 - 2 - 1 = 0\\).",
        ],
        answer: "\\(3x - y - 1 = 0\\)",
      },
      selfCheckExample: {
        prompt: "Find the equation of the line through (2, 1) parallel to \\(2x + 3y - 5 = 0\\).",
        steps: ["The line is \\(2x + 3y + k = 0\\).", "At (2, 1): \\(4 + 3 + k = 0\\), so \\(k = -7\\)."],
        answer: "\\(2x + 3y - 7 = 0\\)",
      },
      practiceSet: [
        { prompt: "Write the equation of the line with slope \\(-2\\) and y-intercept 5.", answer: "\\(y = -2x + 5\\)" },
        { prompt: "Write the equation of the line through the origin with slope 4.", answer: "\\(y = 4x\\)" },
        { prompt: "What are the slope and the y-intercept of \\(y = 3x - 7\\)?", answer: "Slope 3, y-intercept \\(-7\\)" },
        { prompt: "Find the equation of the line through (2, 3) with slope \\(\\frac{1}{2}\\).", answer: "\\(x - 2y + 4 = 0\\)" },
      ],
      pyqExampleId: "f8075066-b09d-4385-8009-1e4926b1e20d",
      traps: [
        {
          title: "Sign slips with a negative point",
          body:
            "Through \\((-4, -1)\\) the form is \\(y + 1 = m(x + 4)\\): subtracting a negative coordinate turns into a plus. Writing \\(y - 1\\) or \\(x - 4\\) puts the line through a different point.",
        },
        {
          title: "Checking only the slope",
          body:
            "Several options can share the right slope. After finding the equation, put the given point into it: only the right line gives 0.",
        },
      ],
    },
  ],
};
