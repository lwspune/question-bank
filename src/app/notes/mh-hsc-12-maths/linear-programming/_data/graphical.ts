import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_MA_LR_GRAPHICAL_NOTE: SubtopicNote = {
  subtopicName: "Graphical Solution of a Linear Programming Problem",
  title: "Solving an L.P.P. by the Graphical Method",
  oneLineDefinition:
    "Finding the maximum or minimum of the objective function by drawing the feasible region, listing its corner points and comparing the value of z at each corner: the corner-point method.",
  whyItMatters:
    "44 questions, thirteen of them from board papers, the most of any page: the board set one in every year from 2016 to 2026 except 2021, and two in each of 2024, 2025 and 2026. Seven ask for a maximum (2017, 2019, 2020, 2024 twice, 2025 twice) and five for a minimum (2016, 2018, 2022, 2026 twice); the 2023 question is an MCQ that gives the corner points, and one of the 2024 maximums is a word problem on two machines. The textbook rows are Exercise 7.4, its four solved examples and Parts I and II of the Miscellaneous Exercise.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hscmlr-theorems",
      name: "Feasible region, optimal solution and the corner-point theorem",
      intuition:
        "The feasible region holds every point that obeys all the constraints, and the textbook's theorem says the best value of \\(z\\) is always reached at a vertex. So out of infinitely many feasible points, only the few corners need testing.",
      definition:
        "- The textbook solves an L.P.P. by the **graphical method** only; it names the other method, the simplex method, but does not teach it.\n" +
        "- **Theorem 1:** the set of all feasible solutions of an L.P.P. is a convex set.\n" +
        "- **Theorem 2 (convex polygon theorem):** the objective function attains its optimum value (maximum or minimum) at least at one vertex of the convex polygon.\n" +
        "- Both theorems are stated without proof; quote them, do not prove them.\n" +
        "- The optimum is decided by the values of \\(z\\), not by where a corner sits: it need not be the vertex farthest from the origin.",
      table: {
        columns: ["Term", "What the textbook says"],
        rows: [
          { cells: ["Solution of an L.P.P.", "A set of values of the decision variables which satisfies the conditions of the problem"] },
          { cells: ["Feasible solution", "A solution which satisfies the given constraints"] },
          {
            cells: ["Feasible region", "The common region determined by all the constraints of the L.P.P."],
            pyqExampleId: "b072645c-0765-4985-accc-930bd04d7c63",
            noteAmber: "The Miscellaneous Exercise asks this as an MCQ: the feasible region satisfies ALL of the given constraints, not some of them.",
          },
          { cells: ["Optimal feasible solution", "A feasible solution which maximizes or minimizes the objective function as required"] },
          {
            cells: ["Corner-point theorem", "The optimum value of the objective function occurs at least at one vertex of the feasible region"],
            pyqExampleId: "1f314bcb-2256-485c-a6a9-3e208dee27df",
          },
        ],
        caption: "In a written answer, one line such as 'by the corner-point theorem, z is optimum at a vertex' justifies the table of corner values.",
      },
      selfCheckExample: {
        prompt: "The feasible region of an L.P.P. has the corners \\(O(0, 0)\\), \\(A(4, 0)\\), \\(B(3, 2)\\) and \\(C(0, 3)\\). Find the maximum of \\(z = x + 2y\\).",
        steps: [
          "By the corner-point theorem, only the vertices need testing.",
          "\\(z(O) = 0\\), \\(z(A) = 4\\), \\(z(B) = 3 + 4 = 7\\), \\(z(C) = 6\\).",
        ],
        answer: "Maximum \\(z = 7\\) at \\(B(3, 2)\\)",
      },
      practiceSet: [
        { prompt: "Is the set of all feasible solutions of an L.P.P. ever a non-convex set?", answer: "No. By Theorem 1 it is always a convex set" },
        { prompt: "Which points of a bounded feasible region must be tested to find the optimum value of \\(z\\)?", answer: "Its vertices (corner points)" },
      ],
      pyqExampleId: "1f314bcb-2256-485c-a6a9-3e208dee27df",
      traps: [
        {
          title: "Choosing the vertex farthest from the origin",
          body: "Distance from the origin decides nothing. Work out \\(z\\) at every vertex; the largest value of \\(z\\) gives the maximum, wherever that vertex is.",
        },
        {
          title: "Testing the centre of the region",
          body: "The optimum of a linear objective is never found by testing an inside point. The theorem sends you to the vertices.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmlr-cornermax",
      name: "Corner-point method: the maximum",
      intuition:
        "With '≤' constraints the feasible region is a closed polygon around the origin. Find its corners, put each into \\(z\\), and the largest value is the maximum. A corner where two slanting lines meet often wins, so never skip it.",
      definition:
        "- Step 1: convert every inequation into an equation and draw the lines from their intercepts.\n" +
        "- Step 2: decide each side by the origin test; the common region is the feasible region. Shade it.\n" +
        "- Step 3: find its vertices: the origin, the nearer intercept on each axis, and the meeting point of each pair of slanting lines, found by solving the two equations together. Check each in the other constraints.\n" +
        "- Step 4: make a table of \\(z\\) at every vertex.\n" +
        "- Step 5: the largest value is the maximum. State it with the point: 'z is maximum at x = ..., y = ...'.",
      formula: {
        label: "Corner-point method for a maximum",
        latex: "z_{\\max} = \\max\\{\\,z(O),\\ z(A),\\ z(B),\\ z(C),\\ \\ldots\\} \\ \\text{ over the vertices of the feasible region}",
      },
      authoredExample: {
        prompt: "Solve graphically: Maximize \\(z = 2x + 5y\\) subject to \\(x + y \\le 6\\), \\(x + 3y \\le 12\\), \\(x \\ge 0\\), \\(y \\ge 0\\).",
        steps: [
          "\\(x + y = 6\\) passes through \\((6, 0)\\) and \\((0, 6)\\); \\(x + 3y = 12\\) passes through \\((12, 0)\\) and \\((0, 4)\\). The origin satisfies both, so each region is the origin side.",
          "On the X-axis the corner is \\((6, 0)\\), since \\((12, 0)\\) gives \\(x + y = 12 > 6\\). On the Y-axis it is \\((0, 4)\\), since \\((0, 6)\\) gives \\(x + 3y = 18 > 12\\).",
          "Meeting point: subtracting \\(x + y = 6\\) from \\(x + 3y = 12\\) gives \\(2y = 6\\), \\(y = 3\\), \\(x = 3\\). Corner \\((3, 3)\\).",
          "Corners: \\(O(0, 0)\\), \\(A(6, 0)\\), \\(B(3, 3)\\), \\(C(0, 4)\\). Values of \\(z\\): 0, 12, \\(6 + 15 = 21\\), 20.",
          "The largest value is 21, at \\(B(3, 3)\\).",
        ],
        answer: "The maximum value of \\(z\\) is 21, at \\(x = 3\\), \\(y = 3\\)",
      },
      selfCheckExample: {
        prompt: "Solve graphically: Maximize \\(z = 2x + 3y\\) subject to \\(x \\le 4\\), \\(y \\le 3\\), \\(x + y \\le 6\\), \\(x \\ge 0\\), \\(y \\ge 0\\).",
        steps: [
          "\\(x = 4\\) meets \\(x + y = 6\\) at \\((4, 2)\\); \\(y = 3\\) meets \\(x + y = 6\\) at \\((3, 3)\\).",
          "Corners: \\(O(0, 0)\\), \\((4, 0)\\), \\((4, 2)\\), \\((3, 3)\\), \\((0, 3)\\). Values of \\(z\\): 0, 8, 14, 15, 9.",
        ],
        answer: "Maximum \\(z = 15\\) at \\((3, 3)\\)",
      },
      practiceSet: [
        { prompt: "The corner points of a feasible region are \\((0, 0)\\), \\((5, 0)\\), \\((4, 2)\\) and \\((0, 4)\\). Find the maximum of \\(z = 3x + 4y\\).", answer: "\\(z\\) = 0, 15, 20, 16, so the maximum is 20 at \\((4, 2)\\)" },
        { prompt: "Find the point where the lines \\(3x + 2y = 18\\) and \\(x + 2y = 10\\) meet.", answer: "\\((4, 3)\\)" },
        {
          prompt: "For the region \\(x + y \\le 8\\), \\(2x + y \\le 10\\), \\(x \\ge 0\\), \\(y \\ge 0\\), which point of the X-axis is a corner: \\((8, 0)\\) or \\((5, 0)\\)?",
          answer: "\\((5, 0)\\); \\((8, 0)\\) gives \\(2x + y = 16 > 10\\), so it is outside the region",
        },
      ],
      pyqExampleId: "98a6bff1-7c72-4bf4-b0b4-01352391415e",
      traps: [
        {
          title: "Stopping at the first good corner",
          body: "Two corners can be very close in value (21 against 20 in the worked example above). Work out \\(z\\) at every vertex before you choose.",
        },
        {
          title: "Keeping the far intercept",
          body: "With '≤' constraints, an intercept on an axis is a corner only if it satisfies the other constraints, which is usually the nearer one. A far intercept left in the table can give a false maximum.",
        },
        {
          title: "A table but no graph",
          body: "'Solve by graphical method' asks for the feasible region drawn, shaded and with its corners labelled. The table of \\(z\\) alone is not the graphical method.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmlr-cornermin",
      name: "The minimum, and regions that are not closed",
      intuition:
        "With '≥' constraints (requirements) the origin fails every test, so the feasible region lies away from the origin and runs on without end. The minimum is still at a corner; the corners are where the lines meet the axes and each other.",
      definition:
        "- For a '\\(\\ge\\)' constraint the origin test fails, so its region is the non-origin side of the line.\n" +
        "- Then the feasible region is **unbounded**: it is not a closed polygon.\n" +
        "- On each axis the corner is the intercept that satisfies the other constraints, usually the farther one.\n" +
        "- Put every corner into \\(z\\); the smallest value is the minimum.\n" +
        "- On an unbounded region, check the answer: draw the line \\(z = \\) (least corner value). If the whole feasible region lies on its non-origin side, the minimum is accepted.\n" +
        "- A region can also mix '\\(\\le\\)' and '\\(\\ge\\)' constraints and be bounded; then find the minimum exactly as you find a maximum.",
      formula: {
        label: "Corner-point method for a minimum",
        latex: "z_{\\min} = \\min\\{\\,z(A),\\ z(B),\\ z(C),\\ \\ldots\\} \\ \\text{ over the vertices of the feasible region}",
      },
      authoredExample: {
        prompt: "Solve graphically: Minimize \\(z = 3x + 2y\\) subject to \\(x + y \\ge 5\\), \\(3x + y \\ge 9\\), \\(x \\ge 0\\), \\(y \\ge 0\\).",
        steps: [
          "\\(x + y = 5\\) passes through \\((5, 0)\\) and \\((0, 5)\\); \\(3x + y = 9\\) passes through \\((3, 0)\\) and \\((0, 9)\\). At the origin \\(0 \\ge 5\\) and \\(0 \\ge 9\\) are false, so each region is the non-origin side. The feasible region is unbounded.",
          "Y-axis corner: \\((0, 9)\\), since \\(x + y = 9 \\ge 5\\); the point \\((0, 5)\\) gives \\(3x + y = 5 < 9\\), so it is outside.",
          "X-axis corner: \\((5, 0)\\), since \\(3x + y = 15 \\ge 9\\); the point \\((3, 0)\\) gives \\(x + y = 3 < 5\\), so it is outside.",
          "Meeting point: subtracting \\(x + y = 5\\) from \\(3x + y = 9\\) gives \\(2x = 4\\), \\(x = 2\\), \\(y = 3\\). Corner \\((2, 3)\\).",
          "Values of \\(z\\): at \\((0, 9)\\), 18; at \\((2, 3)\\), \\(6 + 6 = 12\\); at \\((5, 0)\\), 15. The least is 12.",
          "Check: the feasible region lies wholly on the non-origin side of \\(3x + 2y = 12\\), so no feasible point gives less than 12.",
        ],
        answer: "The minimum value of \\(z\\) is 12, at \\(x = 2\\), \\(y = 3\\)",
      },
      selfCheckExample: {
        prompt: "Solve graphically: Minimize \\(z = 2x + 3y\\) subject to \\(x + 2y \\ge 4\\), \\(x + y \\le 6\\), \\(x \\ge 0\\), \\(y \\ge 0\\).",
        steps: [
          "The region lies on the non-origin side of \\(x + 2y = 4\\) and the origin side of \\(x + y = 6\\): a closed quadrilateral.",
          "Corners: \\((4, 0)\\), \\((6, 0)\\), \\((0, 6)\\), \\((0, 2)\\). Values of \\(z\\): 8, 12, 18, 6.",
        ],
        answer: "Minimum \\(z = 6\\) at \\((0, 2)\\)",
      },
      practiceSet: [
        { prompt: "The corner points of a feasible region are \\((0, 8)\\), \\((2, 3)\\) and \\((6, 0)\\). Find the minimum of \\(z = 2x + 3y\\).", answer: "\\(z\\) = 24, 13, 12, so the minimum is 12 at \\((6, 0)\\)" },
        {
          prompt: "The constraints are \\(x + y \\ge 3\\), \\(2x + y \\ge 4\\), \\(x \\ge 0\\), \\(y \\ge 0\\). Which points on the axes are corners of the feasible region?",
          answer: "\\((3, 0)\\) and \\((0, 4)\\); \\((2, 0)\\) and \\((0, 3)\\) each fail the other constraint",
        },
      ],
      pyqExampleId: "60792867-d7bf-49aa-9774-984378220fbf",
      traps: [
        {
          title: "Taking the nearer intercept for '≥'",
          body: "With '≥' constraints, the corner on an axis is the intercept that satisfies the other constraint, usually the farther one. Test both intercepts before writing a corner.",
        },
        {
          title: "Putting the origin in the table",
          body: "The origin fails every '≥' constraint, so it is not a corner of such a region. A minimum of 0 at the origin is a sign the region was drawn on the wrong side.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmlr-special",
      name: "Special cases: infinitely many optimal solutions and no finite maximum",
      intuition:
        "Two things can happen that a plain table does not show. If two corners give the same best value, the line of \\(z\\) lies along an edge, and every point of that edge is optimal. If the region is unbounded and \\(z\\) is to be maximized, the line of \\(z\\) can be pushed away forever, so there is no finite maximum.",
      definition:
        "- **Infinitely many optimal solutions:** if two distinct corners give the same maximum (or minimum) value, \\(z\\) has that value at every point of the segment joining them. Say so in the answer.\n" +
        "- So if an L.P.P. has two optimal solutions, it has an infinite number of them.\n" +
        "- **No finite maximum:** if the feasible region in the first quadrant is unbounded and \\(z = ax + by\\) has positive \\(a\\) and \\(b\\), the line \\(z = c\\) can be moved away from the origin indefinitely, so \\(z\\) has no finite maximum value in the region.\n" +
        "- If a question asks to maximize over a region with only '\\(\\ge\\)' constraints, show the region is unbounded and write that \\(z\\) has no finite maximum.",
      formula: {
        label: "Two optimal corners",
        latex: "z(A) = z(B) = z_{\\text{opt}} \\ \\Rightarrow\\ z = z_{\\text{opt}} \\text{ at every point of the segment } AB",
      },
      authoredExample: {
        prompt: "Solve graphically: Maximize \\(z = 4x + 6y\\) subject to \\(2x + 3y \\le 12\\), \\(x \\le 3\\), \\(x \\ge 0\\), \\(y \\ge 0\\).",
        steps: [
          "\\(2x + 3y = 12\\) passes through \\((6, 0)\\) and \\((0, 4)\\); \\(x = 3\\) is parallel to the Y-axis. The origin satisfies both, so each region is the origin side.",
          "\\(x = 3\\) meets \\(2x + 3y = 12\\) where \\(3y = 6\\), \\(y = 2\\): corner \\((3, 2)\\).",
          "Corners: \\(O(0, 0)\\), \\(A(3, 0)\\), \\(B(3, 2)\\), \\(C(0, 4)\\). Values of \\(z\\): 0, 12, \\(12 + 12 = 24\\), 24.",
          "The maximum, 24, occurs at both \\(B\\) and \\(C\\). Here \\(z = 2(2x + 3y)\\), so the line of \\(z\\) is parallel to the edge \\(BC\\).",
        ],
        answer: "Maximum \\(z = 24\\) at every point of the segment joining \\((3, 2)\\) and \\((0, 4)\\): infinitely many optimal solutions",
      },
      selfCheckExample: {
        prompt: "Maximize \\(z = 3x + 2y\\) subject to \\(x + 2y \\ge 4\\), \\(x \\ge 0\\), \\(y \\ge 0\\).",
        steps: [
          "The region is the non-origin side of \\(x + 2y = 4\\) in the first quadrant: unbounded, with corners \\((4, 0)\\) and \\((0, 2)\\).",
          "The point \\((10, 0)\\) is feasible and gives \\(z = 30\\); larger \\(x\\) gives larger \\(z\\) without limit.",
        ],
        answer: "\\(z\\) has no finite maximum value",
      },
      practiceSet: [
        { prompt: "For an L.P.P., the best value \\(z = 12\\) occurs at the corner \\((2, 3)\\) and also at the corner \\((4, 1)\\). What can you say about the optimal solutions?", answer: "\\(z = 12\\) at every point of the segment joining \\((2, 3)\\) and \\((4, 1)\\): there are infinitely many optimal solutions" },
        { prompt: "True or false: every linear programming problem has exactly one optimal solution.", answer: "False. It can have infinitely many, or no finite optimum at all" },
      ],
      pyqExampleId: "ba69cdb5-3624-4ae6-82c3-7ddb5d26712d",
      traps: [
        {
          title: "Giving one point when two corners tie",
          body: "When two corners give the same best value, write 'at every point of the segment joining them'. Naming only one corner leaves the answer incomplete.",
        },
        {
          title: "A maximum from the table on an unbounded region",
          body: "On an unbounded region the largest value in the corner table is not a maximum: \\(z\\) grows without limit. Decide first whether the region is closed.",
        },
      ],
    },
  ],
};
