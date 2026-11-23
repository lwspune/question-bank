import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_MA_LR_INEQUATIONS_NOTE: SubtopicNote = {
  subtopicName: "Linear Inequations in Two Variables",
  title: "Linear Inequations in Two Variables",
  oneLineDefinition:
    "Showing the solution set of a linear inequation, or of a system of them, as a region of the XY plane: draw the boundary line, use a test point to pick the side, and take the region common to all of them.",
  whyItMatters:
    "57 questions, one of them from a board paper: in 2023 the board asked for four inequations to be solved graphically and the corner points of the feasible region written down, a problem taken straight from Exercise 7.2. The textbook rows are Exercises 7.1 and 7.2, their solved examples and Parts I and II of the Miscellaneous Exercise: single inequations, pairs of inequations, and systems with x ≥ 0 and y ≥ 0, some of them built from word problems. Every later page draws its feasible region this way.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscmlr-axislines",
      name: "Lines parallel to the axes: x ≤ h and y ≥ k",
      intuition:
        "An inequation with only \\(x\\) in it, or only \\(y\\), has a boundary that is a vertical or a horizontal line. Simplify it first to \\(x \\le h\\) or \\(y \\ge k\\), and the answer is simply everything on one side of that line.",
      definition:
        "- Simplify to one of \\(x \\le h\\), \\(x \\ge h\\), \\(y \\le k\\), \\(y \\ge k\\). Dividing both sides by a negative number reverses the sign.\n" +
        "- \\(x = h\\) is a line parallel to the Y-axis; \\(y = k\\) is a line parallel to the X-axis.\n" +
        "- \\(x \\le h\\) is the region on and to the left of \\(x = h\\); \\(x \\ge h\\) is on and to the right.\n" +
        "- \\(y \\le k\\) is the region on and below \\(y = k\\); \\(y \\ge k\\) is on and above.\n" +
        "- \\(x \\ge 0\\) is the Y-axis and everything to its right; \\(y \\ge 0\\) is the X-axis and everything above it. Together, \\(x \\ge 0\\) and \\(y \\ge 0\\) give the first quadrant.\n" +
        "- With \\(\\le\\) or \\(\\ge\\), the boundary line belongs to the solution set.",
      formula: {
        label: "Half planes of lines parallel to the axes",
        latex: "x \\le h:\\ \\text{on and left of } x = h \\qquad y \\ge k:\\ \\text{on and above } y = k",
        symbols: [
          { symbol: "\\(h\\)", meaning: "the point where the vertical line x = h cuts the X-axis" },
          { symbol: "\\(k\\)", meaning: "the point where the horizontal line y = k cuts the Y-axis" },
        ],
      },
      authoredExample: {
        prompt: "Show the solution set of \\(3x - 12 \\le 0\\) graphically.",
        steps: [
          "Simplify: \\(3x \\le 12\\), so \\(x \\le 4\\).",
          "Boundary: the line \\(x = 4\\), parallel to the Y-axis through \\((4, 0)\\).",
          "Test \\(O(0, 0)\\): \\(3(0) - 12 = -12 \\le 0\\) is true, so the region is the origin side of the line.",
          "Shade the half plane on and to the left of \\(x = 4\\); the line itself is included.",
        ],
        answer: "The solution set is the half plane on and to the left of the line \\(x = 4\\)",
      },
      selfCheckExample: {
        prompt: "Show the solution set of \\(4 - 2y \\ge 0\\) graphically.",
        steps: [
          "\\(-2y \\ge -4\\). Divide by \\(-2\\) and reverse the sign: \\(y \\le 2\\).",
          "Boundary: \\(y = 2\\), parallel to the X-axis. Test \\(O(0, 0)\\): \\(4 - 0 = 4 \\ge 0\\) is true, so the origin side.",
        ],
        answer: "The half plane on and below the line \\(y = 2\\)",
      },
      practiceSet: [
        { prompt: "Solve \\(-3x + 6 \\ge 0\\) for \\(x\\) and describe its solution set.", answer: "\\(x \\le 2\\): the half plane on and to the left of the line \\(x = 2\\)" },
        { prompt: "Write the inequation whose solution set is the half plane on and above the line \\(y = 3\\).", answer: "\\(y \\ge 3\\)" },
        { prompt: "Does the point \\((2, -1)\\) lie in the solution set of \\(y \\ge -2\\)?", answer: "Yes, since \\(-1 \\ge -2\\)" },
      ],
      pyqExampleId: "f79ec399-8c09-4319-9ddd-7ebee9b08122",
      traps: [
        {
          title: "Not reversing the sign",
          body: "Dividing by a negative number reverses the inequality: \\(-2y \\ge -6\\) gives \\(y \\le 3\\), not \\(y \\ge 3\\). Check the answer with one point, such as the origin.",
        },
        {
          title: "Shading the wrong side of a vertical line",
          body: "\\(x \\ge h\\) is on and to the RIGHT of \\(x = h\\), even when \\(h\\) is negative. For \\(x \\ge -5\\) the origin is inside the region.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmlr-halfplane",
      name: "One inequation ax + by ≤ c: the test point",
      intuition:
        "The line \\(ax + by = c\\) cuts the plane into two half planes. Every point on one side gives \\(ax + by < c\\), every point on the other side gives \\(ax + by > c\\). So test just one point: if it satisfies the inequation, its whole side does.",
      definition:
        "- Step 1: change the sign to \\(=\\) and draw the line \\(ax + by = c\\) through its two intercepts: put \\(y = 0\\) for the point on the X-axis, \\(x = 0\\) for the point on the Y-axis.\n" +
        "- Step 2: test the origin. If \\(O(0, 0)\\) satisfies the inequation, the region is the **origin side** of the line; if not, it is the **non-origin side**.\n" +
        "- Step 3: shade that half plane. With \\(\\le\\) or \\(\\ge\\) the line itself is part of the solution set.\n" +
        "- If the line passes through the origin (\\(c = 0\\)), the origin cannot be the test point. Take another point not on the line, such as \\((1, 0)\\) or \\((0, 1)\\).\n" +
        "- The line can also be drawn from its double intercept form: dividing \\(3x + 2y = 6\\) by 6 gives \\(\\dfrac{x}{2} + \\dfrac{y}{3} = 1\\), so the intercepts are 2 and 3.",
      formula: {
        label: "Intercepts and the origin test",
        latex: "ax + by = c:\\ \\left(\\tfrac{c}{a}, 0\\right),\\ \\left(0, \\tfrac{c}{b}\\right); \\qquad \\text{test } O(0, 0) \\text{ in the inequation}",
        symbols: [
          { symbol: "\\(a, b\\)", meaning: "the coefficients of x and y, not both zero" },
          { symbol: "\\(c\\)", meaning: "the constant on the right-hand side" },
        ],
      },
      authoredExample: {
        prompt: "Show the solution set of \\(3x + 4y \\ge 12\\) graphically.",
        steps: [
          "Draw the line \\(3x + 4y = 12\\). Put \\(y = 0\\): \\(x = 4\\), giving \\((4, 0)\\). Put \\(x = 0\\): \\(y = 3\\), giving \\((0, 3)\\).",
          "Test \\(O(0, 0)\\): \\(3(0) + 4(0) = 0 \\ge 12\\) is false.",
          "So the region is the non-origin side of the line, and the line is included.",
        ],
        answer: "The half plane on the non-origin side of the line through \\((4, 0)\\) and \\((0, 3)\\), with the line",
      },
      selfCheckExample: {
        prompt: "Show the solution set of \\(x - 3y \\le 0\\) graphically.",
        steps: [
          "The line \\(x - 3y = 0\\) passes through \\((0, 0)\\) and \\((3, 1)\\), so the origin cannot be a test point.",
          "Test \\((0, 1)\\): \\(0 - 3(1) = -3 \\le 0\\) is true, so the region is the side of the line containing \\((0, 1)\\).",
        ],
        answer: "The half plane on the side of \\(x - 3y = 0\\) containing \\((0, 1)\\), with the line",
      },
      practiceSet: [
        { prompt: "Find the points where the line \\(4x + 3y = 24\\) cuts the axes.", answer: "\\((6, 0)\\) and \\((0, 8)\\)" },
        { prompt: "Write the line \\(5x + 4y = 20\\) in double intercept form.", answer: "\\(\\dfrac{x}{4} + \\dfrac{y}{5} = 1\\)" },
        { prompt: "Which of the points \\((0, 0)\\), \\((1, 3)\\) and \\((4, 1)\\) lie in the half plane \\(2x + y > 8\\)?", answer: "Only \\((4, 1)\\), since \\(2(4) + 1 = 9 > 8\\); the others give 0 and 5" },
      ],
      pyqExampleId: "8e130945-febd-4cc1-9395-2ca55614346d",
      traps: [
        {
          title: "Testing the origin on a line through it",
          body: "For \\(3x + 2y \\ge 0\\) the origin lies on the line, and \\(0 \\ge 0\\) tells you nothing about the sides. Test a point off the line, such as \\((1, 0)\\).",
        },
        {
          title: "Writing 'above' or 'below' the line",
          body: "Which side looks 'above' changes with the slope of the line. Say 'origin side' or 'non-origin side', as the textbook does, and decide it by the test point.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmlr-common",
      name: "Two inequations: the common region",
      intuition:
        "Each inequation keeps one half plane. The solution of the pair is the part of the plane kept by both, where the two shadings overlap. The point where the two boundary lines meet is a corner of that region.",
      definition:
        "- Draw both boundary lines from their intercepts.\n" +
        "- Decide the side of each line by its own test point; one region may be the origin side and the other the non-origin side.\n" +
        "- The solution set is the region **common** to both half planes.\n" +
        "- Find where the lines meet by solving their two equations together; that point is a corner of the common region.\n" +
        "- Without \\(x \\ge 0\\) and \\(y \\ge 0\\) the region can stretch into other quadrants, and it is usually unbounded.\n" +
        "- The textbook sets out each line in a table: the equation, two points on it, the sign, and the side on which the region lies.",
      formula: {
        label: "Solution set of a pair of inequations",
        latex: "\\{(x, y) : a_1x + b_1y \\le c_1\\} \\cap \\{(x, y) : a_2x + b_2y \\ge c_2\\}",
      },
      authoredExample: {
        prompt: "Find graphically the common region of \\(x + y \\le 5\\) and \\(x - y \\ge 1\\).",
        steps: [
          "\\(x + y = 5\\) passes through \\((5, 0)\\) and \\((0, 5)\\). At \\(O\\): \\(0 \\le 5\\) is true, so the region is the origin side.",
          "\\(x - y = 1\\) passes through \\((1, 0)\\) and \\((0, -1)\\). At \\(O\\): \\(0 \\ge 1\\) is false, so the region is the non-origin side.",
          "Where the lines meet: adding, \\(2x = 6\\), so \\(x = 3\\) and \\(y = 5 - 3 = 2\\). The corner is \\((3, 2)\\).",
          "Check a point inside, \\((3, 0)\\): \\(3 \\le 5\\) and \\(3 \\ge 1\\), both true.",
        ],
        answer: "The unbounded region on the origin side of \\(x + y = 5\\) and the non-origin side of \\(x - y = 1\\), with corner \\((3, 2)\\)",
      },
      selfCheckExample: {
        prompt: "Find the point where the boundary lines of \\(2x + y \\ge 4\\) and \\(x + 2y \\le 6\\) meet.",
        steps: [
          "Solve \\(2x + y = 4\\) and \\(x + 2y = 6\\). Double the first: \\(4x + 2y = 8\\).",
          "Subtract the second: \\(3x = 2\\), so \\(x = \\dfrac{2}{3}\\) and \\(y = 4 - \\dfrac{4}{3} = \\dfrac{8}{3}\\).",
        ],
        answer: "\\(\\left(\\dfrac{2}{3}, \\dfrac{8}{3}\\right)\\)",
      },
      practiceSet: [
        { prompt: "For \\(x + 3y \\ge 6\\), is the region on the origin side or the non-origin side of \\(x + 3y = 6\\)?", answer: "The non-origin side, since \\(0 \\ge 6\\) is false" },
        { prompt: "Find the point where the lines \\(x + y = 7\\) and \\(x - y = 3\\) meet.", answer: "\\((5, 2)\\)" },
      ],
      pyqExampleId: "d67431a8-ac25-4ab2-bafc-c6d1c7ab48fa",
      traps: [
        {
          title: "Shading each region and stopping",
          body: "The answer is the overlap. Shade or mark the common region clearly; two separate shadings do not show the solution set.",
        },
        {
          title: "One test for both lines",
          body: "Each line needs its own test. The origin can satisfy one inequation and fail the other, so it can be inside one region and outside the other.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmlr-feasible",
      name: "Feasible solution of a system with x ≥ 0, y ≥ 0",
      intuition:
        "Add \\(x \\ge 0\\) and \\(y \\ge 0\\) and the region is cut down to the first quadrant, often to a closed polygon. The board then asks you to name its corner points, and those corners are exactly what the next pages use.",
      definition:
        "- \\(x \\ge 0\\) and \\(y \\ge 0\\) are the **non-negativity constraints**; they keep the region in the first quadrant.\n" +
        "- A solution which satisfies all the constraints is a **feasible solution**. The common region of all the inequations is the **feasible region**.\n" +
        "- Corners on the axes: an intercept is a corner only if it satisfies every other inequation.\n" +
        "- Corners inside the quadrant: solve two boundary equations together, then check the point in the rest.\n" +
        "- A set is **convex** if the segment joining any two of its points lies wholly in the set. A feasible region is always convex.\n" +
        "- In a word problem, let \\(x\\) and \\(y\\) be the numbers of the two items, turn each limit into an inequation, add \\(x \\ge 0\\), \\(y \\ge 0\\), then draw.",
      formula: {
        label: "Corner of the feasible region",
        latex: "\\text{corner} = \\text{meeting point of two boundary lines that satisfies every other constraint}",
      },
      authoredExample: {
        prompt: "Find graphically the feasible region of \\(x + 2y \\le 8\\), \\(3x + y \\le 9\\), \\(x \\ge 0\\), \\(y \\ge 0\\), and write its corner points.",
        steps: [
          "\\(x + 2y = 8\\) passes through \\((8, 0)\\) and \\((0, 4)\\); \\(3x + y = 9\\) passes through \\((3, 0)\\) and \\((0, 9)\\).",
          "At \\(O\\): \\(0 \\le 8\\) and \\(0 \\le 9\\) are true, so both regions are origin sides. With \\(x \\ge 0\\), \\(y \\ge 0\\), the region is in the first quadrant.",
          "X-axis: \\((8, 0)\\) gives \\(3x + y = 24 > 9\\), so it is outside; the corner is \\((3, 0)\\).",
          "Y-axis: \\((0, 9)\\) gives \\(x + 2y = 18 > 8\\), so it is outside; the corner is \\((0, 4)\\).",
          "Meeting point: \\(y = 9 - 3x\\), so \\(x + 18 - 6x = 8\\), \\(x = 2\\), \\(y = 3\\). The corner is \\((2, 3)\\).",
        ],
        answer: "A bounded quadrilateral with corners \\(O(0, 0)\\), \\(A(3, 0)\\), \\(B(2, 3)\\) and \\(C(0, 4)\\)",
      },
      selfCheckExample: {
        prompt:
          "A workshop makes \\(x\\) units of A and \\(y\\) units of B a day. A unit of A needs 2 hours on a machine and a unit of B needs 1 hour; the machine runs at most 10 hours a day. Write the inequations and the corner points of the feasible region.",
        steps: [
          "Machine time: \\(2x + y \\le 10\\). Numbers made cannot be negative: \\(x \\ge 0\\), \\(y \\ge 0\\).",
          "\\(2x + y = 10\\) passes through \\((5, 0)\\) and \\((0, 10)\\); the origin satisfies \\(0 \\le 10\\), so the region is the origin side.",
        ],
        answer: "\\(2x + y \\le 10\\), \\(x \\ge 0\\), \\(y \\ge 0\\); a triangle with corners \\((0, 0)\\), \\((5, 0)\\) and \\((0, 10)\\)",
      },
      practiceSet: [
        {
          prompt: "A shopkeeper has Rs 1200 to buy pens at Rs 20 each and notebooks at Rs 40 each, and room for at most 50 items. Write the inequations for \\(x\\) pens and \\(y\\) notebooks.",
          answer: "\\(20x + 40y \\le 1200\\) (that is \\(x + 2y \\le 60\\)), \\(x + y \\le 50\\), \\(x \\ge 0\\), \\(y \\ge 0\\)",
        },
        { prompt: "Is \\((3, 3)\\) a feasible solution of \\(2x + y \\le 8\\), \\(x \\ge 0\\), \\(y \\ge 0\\)?", answer: "No, since \\(2(3) + 3 = 9 > 8\\)" },
        { prompt: "What is a feasible solution of a system of inequations?", answer: "A solution which satisfies all the constraints" },
      ],
      pyqExampleId: "c929fcae-9399-4a12-a776-c3691a5f9383",
      traps: [
        {
          title: "Keeping an intercept that breaks another inequation",
          body: "Every corner must satisfy every inequation. With \\(\\le\\) constraints the corner on an axis is usually the nearer intercept; check the farther one before you write it down.",
        },
        {
          title: "Leaving out x ≥ 0, y ≥ 0 in a word problem",
          body: "Numbers of articles cannot be negative, so \\(x \\ge 0\\) and \\(y \\ge 0\\) are part of the answer. Without them the region is not the one the question wants.",
        },
      ],
    },
  ],
};
