import type { SubtopicNote } from "@/app/notes/_types";

export const CB_MA_LP_GRAPHICAL_NOTE: SubtopicNote = {
  subtopicName: "Graphical Solution and the Feasible Region",
  title: "Graphical Solution of a Linear Programming Problem",
  oneLineDefinition:
    "A linear programming problem asks for the largest or smallest value of a linear function Z = ax + by over the region where all the linear constraints hold: draw that region, find its corner points and compare Z at each.",
  whyItMatters:
    "102 questions, eighty-seven of them from board papers: twenty-two in 2023, twenty-one in 2024, twenty-five in 2025 and nineteen in 2026. Every year a three-mark question says \"solve graphically\", and 2023, 2024 and 2026 also set it as a five-mark long answer. Unbounded regions, where the open half-plane check decides the answer, came in 2023, 2024 and 2025. The one-mark questions name the terms, count corner points, read the constraints off a shaded figure and compare Z at given corners; assertion-reason items came in 2024, 2025 and 2026, a diet case study in 2024, and two-mark \"shade the region and mark the corners\" questions in 2025. The textbook adds Examples 1 to 5 and all ten questions of Exercise 12.1.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cbmlp-terms",
      name: "The terms of an LPP and the corner point theorems",
      intuition:
        "Every linear programming problem has three parts: what you choose (the decision variables), what you want as large or as small as possible (the objective function), and the limits you must obey (the constraints). The one-mark questions ask for these names, and the two theorems tell you where to look for the answer: at the corners.",
      definition:
        "- A **linear programming problem** asks for the optimal value (maximum or minimum) of a linear function of several variables, subject to the variables being non-negative and satisfying a set of linear inequalities.\n" +
        "- **Objective function:** the linear function \\(Z = ax + by\\) (\\(a\\), \\(b\\) constants) to be maximised or minimised. It is linear, so its degree is 1.\n" +
        "- **Decision variables:** \\(x\\) and \\(y\\), the quantities you decide.\n" +
        "- **Constraints:** the linear inequalities or equations or restrictions on the variables. \\(x \\ge 0\\), \\(y \\ge 0\\) are the **non-negative restrictions**.\n" +
        "- **Feasible region:** the common region determined by all the constraints, including \\(x \\ge 0\\), \\(y \\ge 0\\). Every point within and on its boundary is a **feasible solution**; a point outside it is an infeasible solution.\n" +
        "- **Optimal solution:** a point of the feasible region that gives the optimal value of Z.\n" +
        "- **Corner point:** a point of the region where two boundary lines meet.\n" +
        "- A region is **bounded** if it can be enclosed within a circle; otherwise it is **unbounded**.\n" +
        "- **Theorem 1:** when Z has an optimal value, it occurs at a corner point of the feasible region.\n" +
        "- **Theorem 2:** if the feasible region is bounded, Z has both a maximum and a minimum value, and each occurs at a corner point.\n" +
        "- If the region is unbounded, a maximum or a minimum may not exist; if it exists, it is at a corner point.",
      table: {
        columns: ["Term", "What it means", "Example"],
        rows: [
          {
            cells: [
              "Objective function",
              "The linear function to be maximised or minimised",
              "\\(Z = 250x + 75y\\), a dealer's profit on \\(x\\) tables and \\(y\\) chairs",
            ],
            noteAmber:
              "Board 2025 asked what a profit function of this kind measures: the combined profit from both products, not the number of units made.",
            pyqExampleId: "6f4d7b73-e02b-42bc-aef2-28bc0b58fe17",
          },
          { cells: ["Decision variables", "The quantities you choose; they are never negative", "\\(x\\) tables and \\(y\\) chairs"] },
          {
            cells: ["Constraints", "The restrictions on the decision variables", "\\(x + y \\le 60\\): space for at most 60 pieces"],
            noteAmber: "Board 2024 asked for this name as an MCQ: constraints.",
            pyqExampleId: "b2b1855e-b008-4d4f-925a-a26d44baf7a7",
          },
          {
            cells: ["Feasible region", "The common region of all the constraints, including \\(x \\ge 0\\), \\(y \\ge 0\\)", "The shaded region on the graph"],
            noteAmber: "Board 2024 asked for this name as an MCQ: a feasible region.",
            pyqExampleId: "816c9344-545f-482b-b795-c11ff36efa5c",
          },
          {
            cells: ["Feasible solution", "Any point within or on the boundary of the feasible region", "Infinitely many when the region has any area"],
            noteAmber:
              "Board 2023 asked how many feasible solutions a problem with a four-sided region has. Infinitely many: the number of corners answers a different question.",
            pyqExampleId: "4d6f58f1-0630-4c3e-9cfa-b90e8b13dd79",
          },
          { cells: ["Optimal solution", "A feasible point where Z is largest (or smallest)", "The corner with the best value of Z"] },
          {
            cells: ["Bounded region", "Can be enclosed within a circle", "Z has both a maximum and a minimum, each at a corner"],
            noteAmber: "Board 2025 asked this as an MCQ: a bounded region gives both values.",
            pyqExampleId: "6494b963-8465-4aaf-8576-d685d25c250c",
          },
          { cells: ["Unbounded region", "Cannot be enclosed within any circle", "A maximum or minimum may not exist; if it exists, it is at a corner"] },
          { cells: ["Empty feasible region", "No point satisfies all the constraints", "No feasible solution, so the problem has no solution"] },
        ],
      },
      selfCheckExample: {
        prompt:
          "True or false, with a reason: if the feasible region of an LPP is bounded, then \\(Z = ax + by\\) has a maximum value but may have no minimum value.",
        steps: [
          "By Theorem 2, a bounded feasible region gives Z both a maximum and a minimum value.",
          "Each of them occurs at a corner point of the region.",
        ],
        answer: "False: a bounded region gives both a maximum and a minimum, each at a corner point.",
      },
      practiceSet: [
        { prompt: "What name is given to the points within and on the boundary of the feasible region?", answer: "Feasible solutions" },
        { prompt: "When is a feasible region called bounded?", answer: "When it can be enclosed within a circle" },
        { prompt: "The constraints of an LPP have no common point. How many feasible solutions does it have?", answer: "None: the feasible region is empty, so the problem has no solution." },
        { prompt: "What is the degree of the objective function of a linear programming problem?", answer: "1" },
      ],
      pyqExampleId: "816c9344-545f-482b-b795-c11ff36efa5c",
      traps: [
        {
          title: "Counting corners as the feasible solutions",
          body: "Every point inside and on the boundary of the region is a feasible solution, so a region with any area has infinitely many. The corners are only where you look for the optimal value.",
        },
        {
          title: "Code (D) in a Maths assertion-reason item",
          body: "In the Maths paper, code (D) means the Assertion is false and the Reason is true. \"Every point of the feasible region is an optimal solution\" is false (Z takes different values at different points), while the corner point theorem is true: that pair is (D).",
        },
        {
          title: "A Reason that only defines a word",
          body: "For code (A) the Reason must explain the Assertion. \"A feasible region is the region satisfying all the constraints\" is true, but it does not by itself explain why an empty region leaves the problem with no solution, so the answer is (B).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmlp-region",
      name: "Drawing the feasible region and finding its corner points",
      intuition:
        "Each inequality cuts the plane along a straight line, and you keep one side of it. Test one point to see which side. The feasible region is the part where all the kept sides overlap, and its corners are where two boundary lines meet inside every other constraint.",
      definition:
        "- Change each inequality into an equation and draw the line through two points, usually where it meets the axes. Label the line with its equation.\n" +
        "- Test a point not on the line, usually \\((0, 0)\\). If it satisfies the inequality, keep the side containing it; if not, keep the other side.\n" +
        "- If the line passes through the origin (such as \\(x - 2y = 0\\)), test another point such as \\((1, 0)\\).\n" +
        "- With \\(\\le\\) or \\(\\ge\\) the line belongs to the region. With \\(<\\) or \\(>\\) the line is left out: the solution set is an **open** half plane.\n" +
        "- \\(x \\ge 0\\), \\(y \\ge 0\\) keep the region in the first quadrant.\n" +
        "- **Shade** the common region and name its corners A, B, C, ...\n" +
        "- **Corner points:** solve the boundary lines in pairs, and keep a point only if it satisfies every other constraint.\n" +
        "- Say what kind of region it is: **bounded**, **unbounded** (runs off without end), or **empty** (no common point, so no feasible solution).",
      formula: {
        label: "Where a boundary line meets the axes",
        latex: "ax + by = c \\text{ meets the axes at } \\left(\\dfrac{c}{a},\\ 0\\right) \\text{ and } \\left(0,\\ \\dfrac{c}{b}\\right)",
      },
      authoredExample: {
        prompt:
          "Draw the feasible region determined by \\(2x + y \\le 10\\), \\(x + 3y \\le 15\\), \\(x \\ge 0\\), \\(y \\ge 0\\), and find its corner points.",
        steps: [
          "\\(2x + y = 10\\) passes through \\((5, 0)\\) and \\((0, 10)\\).",
          "\\(x + 3y = 15\\) passes through \\((15, 0)\\) and \\((0, 5)\\).",
          "Origin test: \\(0 \\le 10\\) and \\(0 \\le 15\\) are both true, so the region lies on the origin side of both lines.",
          "With \\(x \\ge 0\\), \\(y \\ge 0\\) the feasible region is the four-sided region OABC in the first quadrant, below both lines. Shade it. It is bounded.",
          "Where the lines meet: from \\(x = 15 - 3y\\), \\(2(15 - 3y) + y = 10\\), so \\(-5y = -20\\), \\(y = 4\\) and \\(x = 3\\).",
          "Corner points: \\(O(0, 0)\\); \\(A(5, 0)\\), where \\(2x + y = 10\\) meets the x-axis; \\(B(3, 4)\\); \\(C(0, 5)\\), where \\(x + 3y = 15\\) meets the y-axis.",
          "\\((0, 10)\\) is not a corner: \\(0 + 3(10) = 30 > 15\\). \\((15, 0)\\) is not a corner: \\(2(15) + 0 = 30 > 10\\).",
        ],
        answer: "A bounded region with corner points \\((0, 0)\\), \\((5, 0)\\), \\((3, 4)\\) and \\((0, 5)\\)",
      },
      selfCheckExample: {
        prompt:
          "Describe the feasible region of \\(x + 2y \\ge 8\\), \\(3x + y \\ge 9\\), \\(x \\ge 0\\), \\(y \\ge 0\\). Is it bounded? Find its corner points.",
        steps: [
          "\\(x + 2y = 8\\) passes through \\((8, 0)\\) and \\((0, 4)\\); \\(3x + y = 9\\) passes through \\((3, 0)\\) and \\((0, 9)\\).",
          "The origin fails both inequalities, so the region lies on the far side of both lines from the origin, in the first quadrant.",
          "It runs off upwards and to the right without end, so it is unbounded.",
          "On the y-axis the tighter condition is \\(y \\ge 9\\): corner \\((0, 9)\\). On the x-axis it is \\(x \\ge 8\\): corner \\((8, 0)\\).",
          "The lines meet where \\(x = 8 - 2y\\) and \\(3(8 - 2y) + y = 9\\), so \\(y = 3\\), \\(x = 2\\): corner \\((2, 3)\\).",
        ],
        answer: "Unbounded, with corner points \\((0, 9)\\), \\((2, 3)\\) and \\((8, 0)\\)",
      },
      practiceSet: [
        {
          prompt: "Describe the solution set of \\(4x + 3y < 24\\).",
          answer: "The open half plane containing the origin, without the points of the line \\(4x + 3y = 24\\)",
        },
        {
          prompt: "Is the region \\(x + y \\le 2\\), \\(x + y \\ge 5\\), \\(x \\ge 0\\), \\(y \\ge 0\\) bounded, unbounded or empty?",
          answer: "Empty: no point has \\(x + y\\) at most 2 and at least 5.",
        },
        {
          prompt: "How many corner points does the region \\(2x + y \\ge 6\\), \\(x \\ge 0\\), \\(y \\ge 0\\) have?",
          answer: "2: \\((3, 0)\\) and \\((0, 6)\\)",
        },
        {
          prompt: "Which of \\((1, 1)\\) and \\((4, 1)\\) satisfies both \\(x + y \\le 6\\) and \\(x - y \\ge 2\\)?",
          answer: "\\((4, 1)\\)",
          method: "\\(4 + 1 = 5 \\le 6\\) and \\(4 - 1 = 3 \\ge 2\\); for \\((1, 1)\\), \\(1 - 1 = 0\\) is not \\(\\ge 2\\).",
        },
      ],
      pyqExampleId: "3c1f5ab8-4be5-42fb-b6d7-3abef0fd1944",
      traps: [
        {
          title: "Skipping the graph",
          body: "\"Solve graphically\" and \"shade the feasible region\" give marks for the graph itself. Draw each line through two marked points, write its equation on it, shade the common region and name every corner. A table of Z values with no graph loses those marks.",
        },
        {
          title: "Keeping a point that another constraint rejects",
          body: "Every two lines meet somewhere, but the meeting point is a corner only if it satisfies all the other constraints. Put each candidate into every inequality before you list it.",
        },
        {
          title: "Testing the origin on a line through the origin",
          body: "For \\(x - 2y \\ge 0\\) the origin lies on the line, so it tells you nothing. Test a point such as \\((1, 0)\\): \\(1 \\ge 0\\) is true, so keep the side containing \\((1, 0)\\).",
        },
        {
          title: "Calling every first-quadrant region bounded",
          body: "When the constraints are of the \\(\\ge\\) type and keep the region away from the origin, the region usually runs off without end. Say \"unbounded\" in your answer: it changes the last step of the corner point method.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmlp-read-graph",
      name: "Reading the constraints off a shaded graph",
      intuition:
        "This is the drawing step backwards. Each straight edge of the shaded region lies on a line: find its equation from two points on it, then decide the sign by testing a point that is clearly inside the shading.",
      definition:
        "- List the corner points marked on the graph, in order round the region.\n" +
        "- For each slanted edge, find the line through its two corners: by the two-point form, or by the intercept form when it meets both axes.\n" +
        "- Test a point strictly inside the shading (the origin, if it is shaded). If it makes \\(ax + by\\) less than \\(c\\), the constraint is \\(ax + by \\le c\\); if more, it is \\(ax + by \\ge c\\).\n" +
        "- Edges along the axes give \\(x \\ge 0\\) and \\(y \\ge 0\\). Write them too.\n" +
        "- A dashed line for a value of Z, or a labelled point outside the shading, is not a constraint: only lines that carry an edge of the region are.",
      formula: {
        label: "Line through two corners, and the intercept form",
        latex: "y - y_1 = \\dfrac{y_2 - y_1}{x_2 - x_1}(x - x_1), \\qquad \\dfrac{x}{p} + \\dfrac{y}{q} = 1",
        symbols: [
          { symbol: "\\((x_1, y_1), (x_2, y_2)\\)", meaning: "two corner points on the same edge" },
          { symbol: "\\(p, q\\)", meaning: "where the line meets the x-axis and the y-axis" },
        ],
      },
      authoredExample: {
        prompt:
          "A shaded feasible region has corner points \\(O(0, 0)\\), \\(A(6, 0)\\), \\(B(4, 3)\\) and \\(C(0, 5)\\). Write all the constraints that determine it.",
        steps: [
          "Edge AB, through \\((6, 0)\\) and \\((4, 3)\\): slope \\(= \\dfrac{3 - 0}{4 - 6} = -\\dfrac{3}{2}\\).",
          "So \\(y - 0 = -\\dfrac{3}{2}(x - 6)\\), that is \\(2y = -3x + 18\\), or \\(3x + 2y = 18\\).",
          "Edge BC, through \\((4, 3)\\) and \\((0, 5)\\): slope \\(= \\dfrac{5 - 3}{0 - 4} = -\\dfrac{1}{2}\\).",
          "So \\(y - 5 = -\\dfrac{1}{2}x\\), that is \\(2y - 10 = -x\\), or \\(x + 2y = 10\\).",
          "The origin is in the region: \\(0 \\le 18\\) and \\(0 \\le 10\\), so both constraints are of the \\(\\le\\) type.",
          "Edges OA and OC lie on the axes: \\(y \\ge 0\\) and \\(x \\ge 0\\).",
        ],
        answer: "\\(3x + 2y \\le 18\\), \\(x + 2y \\le 10\\), \\(x \\ge 0\\), \\(y \\ge 0\\)",
      },
      selfCheckExample: {
        prompt:
          "An unbounded shaded region in the first quadrant has boundary running from \\(P(0, 6)\\) to \\(Q(2, 2)\\) and then to \\(R(6, 0)\\), and the origin is not shaded. Write the constraints.",
        steps: [
          "PQ: slope \\(= \\dfrac{2 - 6}{2 - 0} = -2\\), so \\(y = 6 - 2x\\), that is \\(2x + y = 6\\).",
          "QR: slope \\(= \\dfrac{0 - 2}{6 - 2} = -\\dfrac{1}{2}\\), so \\(y - 2 = -\\dfrac{1}{2}(x - 2)\\), that is \\(x + 2y = 6\\).",
          "The origin is not shaded and gives \\(0 < 6\\) in both, so the region needs the \\(\\ge\\) sign.",
          "The shading is in the first quadrant: \\(x \\ge 0\\), \\(y \\ge 0\\).",
        ],
        answer: "\\(2x + y \\ge 6\\), \\(x + 2y \\ge 6\\), \\(x \\ge 0\\), \\(y \\ge 0\\)",
      },
      practiceSet: [
        { prompt: "Write the equation of the line through \\((0, 4)\\) and \\((10, 0)\\).", answer: "\\(2x + 5y = 20\\)", method: "\\(\\dfrac{x}{10} + \\dfrac{y}{4} = 1\\)" },
        { prompt: "A shaded region lies on the side of \\(x + y = 7\\) away from the origin. Write the constraint.", answer: "\\(x + y \\ge 7\\)" },
        {
          prompt: "The point \\((1, 1)\\) lies inside a shaded region with an edge on \\(3x + 4y = 12\\). Which sign does that constraint take?",
          answer: "\\(3x + 4y \\le 12\\)",
          method: "\\(3 + 4 = 7\\), which is less than 12",
        },
      ],
      pyqExampleId: "00a16767-ff91-4a62-bd0c-2d9e728f92a7",
      traps: [
        {
          title: "Turning every drawn line into a constraint",
          body: "A graph may also show a dashed line for a value of Z, or a labelled point outside the region. Write a constraint only for a line that carries an edge of the shaded region.",
        },
        {
          title: "Dropping \\(x \\ge 0\\) and \\(y \\ge 0\\)",
          body: "When the shading stops at the axes, \\(x \\ge 0\\) and \\(y \\ge 0\\) are constraints too, and an answer that leaves them out is incomplete. Writing \\(x \\le 0\\), \\(y \\le 0\\) would put the region in the third quadrant.",
        },
        {
          title: "Testing a point on the boundary",
          body: "A corner lies on its lines, so it makes both sides equal and cannot decide the sign. Test a point that is clearly inside the shading.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmlp-bounded",
      name: "The corner point method on a bounded region",
      intuition:
        "A bounded region has infinitely many points, but you never need to try them all: by the corner point theorems the largest and smallest values of Z sit at corners. So the whole method is: find the corners, make a table of Z, read off the answer.",
      definition:
        "- Write the problem: decision variables, the objective function, every constraint including \\(x \\ge 0\\), \\(y \\ge 0\\). In a word problem \"at most\" gives \\(\\le\\) and \"at least\" gives \\(\\ge\\).\n" +
        "- Draw the lines, shade the feasible region and say that it is bounded.\n" +
        "- Find each corner point, by inspection on an axis or by solving the two lines that meet there.\n" +
        "- Make a table of Z at every corner. Let M be the largest value and m the smallest.\n" +
        "- The region is bounded, so M is the maximum and m is the minimum of Z.\n" +
        "- Finish with the value of Z **and** the point where it occurs; in a word problem, say what the point means.",
      formula: {
        label: "Corner point method, bounded region",
        latex: "Z_{\\max} = M = \\text{largest value of } Z \\text{ at the corners}, \\qquad Z_{\\min} = m = \\text{smallest value}",
      },
      authoredExample: {
        prompt:
          "A shopkeeper sells two kinds of lamps. A lamp of type A costs him ₹ 200 and a lamp of type B costs ₹ 100. He has ₹ 3,200 to spend and space for at most 24 lamps. He makes a profit of ₹ 60 on type A and ₹ 40 on type B. Formulate the problem as an LPP and solve it graphically to find how many of each he should buy for the largest profit.",
        steps: [
          "Let \\(x\\) be the number of type A lamps and \\(y\\) the number of type B lamps: \\(x \\ge 0\\), \\(y \\ge 0\\).",
          "Objective function: maximise \\(Z = 60x + 40y\\).",
          "Money: \\(200x + 100y \\le 3200\\), that is \\(2x + y \\le 32\\). Space: \\(x + y \\le 24\\).",
          "\\(2x + y = 32\\) passes through \\((16, 0)\\) and \\((0, 32)\\); \\(x + y = 24\\) passes through \\((24, 0)\\) and \\((0, 24)\\).",
          "The origin satisfies both, so the feasible region OABC lies on the origin side of both lines in the first quadrant. Shade it: it is bounded.",
          "Corners: \\(O(0, 0)\\); \\(A(16, 0)\\) on the x-axis; \\(C(0, 24)\\) on the y-axis; B where the lines meet: subtracting, \\(x = 8\\), then \\(y = 16\\), so \\(B(8, 16)\\).",
          "\\((24, 0)\\) and \\((0, 32)\\) are not corners: \\(2(24) + 0 = 48 > 32\\) and \\(0 + 32 > 24\\).",
          "Table: \\(Z(O) = 0\\), \\(Z(A) = 960\\), \\(Z(B) = 480 + 640 = 1120\\), \\(Z(C) = 960\\).",
          "The region is bounded, so the maximum is the largest value: \\(Z = 1120\\) at \\(x = 8\\), \\(y = 16\\).",
        ],
        answer: "8 lamps of type A and 16 of type B, for the largest profit of ₹ 1,120",
      },
      selfCheckExample: {
        prompt:
          "Solve graphically: minimise \\(Z = 5x + 2y\\) subject to \\(x + y \\ge 5\\), \\(x \\le 4\\), \\(y \\le 6\\), \\(x \\ge 0\\), \\(y \\ge 0\\).",
        steps: [
          "The region lies on the far side of \\(x + y = 5\\) from the origin, left of \\(x = 4\\) and below \\(y = 6\\): a bounded four-sided region.",
          "\\(x = 4\\) meets \\(x + y = 5\\) at \\((4, 1)\\) and \\(y = 6\\) at \\((4, 6)\\).",
          "\\(y = 6\\) meets the y-axis at \\((0, 6)\\); \\(x + y = 5\\) meets it at \\((0, 5)\\).",
          "\\((5, 0)\\) is not a corner: it breaks \\(x \\le 4\\).",
          "Table: \\(Z(4, 1) = 22\\), \\(Z(4, 6) = 32\\), \\(Z(0, 6) = 12\\), \\(Z(0, 5) = 10\\).",
          "The region is bounded, so the smallest value is the minimum.",
        ],
        answer: "Minimum \\(Z = 10\\) at \\(x = 0\\), \\(y = 5\\)",
      },
      practiceSet: [
        {
          prompt: "The corner points of a bounded feasible region are \\((0, 0)\\), \\((5, 0)\\), \\((3, 4)\\) and \\((0, 6)\\). Find the maximum of \\(Z = 4x + 3y\\).",
          answer: "24, at \\((3, 4)\\)",
          method: "Values 0, 20, 24, 18",
        },
        { prompt: "Find the corner where the boundary lines \\(x + 2y = 14\\) and \\(3x + y = 12\\) meet.", answer: "\\((2, 6)\\)" },
        {
          prompt: "Maximise \\(Z = x + y\\) subject to \\(x + 3y \\le 9\\), \\(2x + y \\le 8\\), \\(x \\ge 0\\), \\(y \\ge 0\\).",
          answer: "Maximum \\(Z = 5\\) at \\((3, 2)\\)",
          method: "Corners \\((0, 0)\\), \\((4, 0)\\), \\((3, 2)\\), \\((0, 3)\\); values 0, 4, 5, 3",
        },
      ],
      pyqExampleId: "2a3363cb-c84c-403a-8722-8b3ba40dc75f",
      traps: [
        {
          title: "Giving the value without the point",
          body: "\"Z is maximum\" needs both parts: the value of Z and where it occurs (\\(x = \\ldots\\), \\(y = \\ldots\\)). In a word problem, also say what the numbers mean, such as how many of each item.",
        },
        {
          title: "Not saying the region is bounded",
          body: "Taking the largest corner value as the maximum is allowed because the region is bounded. Write that sentence before your conclusion; on an unbounded region the same step would be wrong.",
        },
        {
          title: "Picking the corner with the biggest coordinates",
          body: "The corner furthest from the origin is not always the best one. A negative coefficient, such as in \\(Z = 13x - 15y\\), can make a corner near the origin the minimum. Work out Z at every corner.",
        },
        {
          title: "Rounding a fractional corner",
          body: "A corner such as \\(\\left(\\dfrac{30}{13}, \\dfrac{6}{13}\\right)\\) must be kept as fractions. Rounded values can change which corner wins and lose the answer mark.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmlp-ties",
      name: "The same optimum at two corners, and unknown coefficients in Z",
      intuition:
        "Sometimes Z takes its best value at two corners. Then every point on the edge between them gives the same value, because the line Z = constant lies along that edge. The board turns this round too: it gives the corners where the optimum occurs and asks for the coefficients of Z.",
      definition:
        "- If two corner points give the same maximum (or minimum) value, **every point on the line segment joining them** gives that value too: the problem has infinitely many optimal solutions.\n" +
        "- You can often see it coming: on the edge \\(x + 2y = 10\\), \\(Z = 3x + 6y = 3(x + 2y)\\) is the same everywhere.\n" +
        "- Write the answer as \"Z is maximum at all the points on the line segment joining A and B\", not \"at A and B\".\n" +
        "- **Condition for a tie at A and B:** put \\(Z(A) = Z(B)\\) and simplify to a relation between the coefficients. Then make sure the common value really is the largest (or smallest) of all the corners.\n" +
        "- **Values of Z given at corners:** substitute each point into \\(Z = ax + by\\) and solve the two equations for \\(a\\) and \\(b\\).",
      formula: {
        label: "Same value at two corners",
        latex: "Z(A) = Z(B) = M \\;\\Rightarrow\\; Z = M \\text{ at every point of the segment } AB",
      },
      authoredExample: {
        prompt:
          "Solve graphically: maximise \\(Z = 3x + 6y\\) subject to \\(x + 2y \\le 10\\), \\(x + y \\le 7\\), \\(x \\ge 0\\), \\(y \\ge 0\\).",
        steps: [
          "\\(x + 2y = 10\\) passes through \\((10, 0)\\) and \\((0, 5)\\); \\(x + y = 7\\) passes through \\((7, 0)\\) and \\((0, 7)\\).",
          "The origin satisfies both, so the region is the bounded four-sided region on the origin side of both lines, in the first quadrant.",
          "The lines meet where, subtracting, \\(y = 3\\) and \\(x = 4\\): the corner \\((4, 3)\\).",
          "Corners: \\((0, 0)\\), \\((7, 0)\\), \\((4, 3)\\), \\((0, 5)\\).",
          "Table: \\(Z(0, 0) = 0\\), \\(Z(7, 0) = 21\\), \\(Z(4, 3) = 12 + 18 = 30\\), \\(Z(0, 5) = 30\\).",
          "The region is bounded and the largest value 30 occurs at two corners, \\((4, 3)\\) and \\((0, 5)\\).",
          "So Z = 30 at every point of the segment joining them: there \\(Z = 3(x + 2y) = 3 \\times 10 = 30\\).",
        ],
        answer: "Maximum \\(Z = 30\\) at all the points on the line segment joining \\((4, 3)\\) and \\((0, 5)\\)",
      },
      selfCheckExample: {
        prompt:
          "The corner points of a feasible region are \\(O(0, 0)\\), \\(A(5, 0)\\), \\(B(4, 2)\\) and \\(C(0, 4)\\), and \\(Z = px + qy\\) with \\(p, q > 0\\). Find the condition on \\(p\\) and \\(q\\) for the maximum of Z to occur at both A and B.",
        steps: [
          "\\(Z(A) = 5p\\) and \\(Z(B) = 4p + 2q\\).",
          "For a tie, \\(5p = 4p + 2q\\), so \\(p = 2q\\).",
          "Check it is the maximum: with \\(p = 2q\\), \\(Z(A) = Z(B) = 10q\\), while \\(Z(C) = 4q\\) and \\(Z(O) = 0\\).",
        ],
        answer: "\\(p = 2q\\)",
      },
      practiceSet: [
        {
          prompt: "\\(Z = ax + by\\) has the value 12 at \\((2, 3)\\) and 14 at \\((4, 1)\\). Find \\(a\\) and \\(b\\).",
          answer: "\\(a = 3,\\ b = 2\\)",
          method: "\\(2a + 3b = 12\\) and \\(4a + b = 14\\)",
        },
        {
          prompt: "The corner points of a bounded region are \\((0, 0)\\), \\((9, 0)\\), \\((6, 4)\\) and \\((0, 8)\\). Find the maximum of \\(Z = 2x + 3y\\) and where it occurs.",
          answer: "24, at every point of the segment joining \\((6, 4)\\) and \\((0, 8)\\)",
          method: "Values 0, 18, 24, 24",
        },
        {
          prompt: "Z takes its minimum value at two corner points of the feasible region. How many optimal solutions are there?",
          answer: "Infinitely many: every point of the segment joining the two corners",
        },
      ],
      pyqExampleId: "ca70b152-813b-431c-9601-dc69d00e3143",
      traps: [
        {
          title: "Answering \"at two points\"",
          body: "When two corners tie, the optimum is at every point of the segment joining them. Writing only the two corners loses the mark, and NCERT's \"show that the minimum occurs at more than two points\" is asking for exactly this sentence.",
        },
        {
          title: "Stopping at Z(A) = Z(B)",
          body: "Equal values at A and B make a tie, not a maximum. Check that the common value is larger than Z at every other corner (smaller, for a minimum) before you give the condition.",
        },
        {
          title: "A true Reason that does not explain the tie",
          body: "\"The optimal solution of a bounded LPP must occur at corner points\" is true, but it does not explain why the maximum occurs at infinitely many points. With a true Assertion that is code (B), not (A).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmlp-unbounded",
      name: "Unbounded regions: the open half-plane check",
      intuition:
        "On an unbounded region the corner values are only candidates, because Z might keep growing (or falling) as you move off along the region. One more step settles it: draw the open half plane where Z beats the candidate. If it misses the region, the candidate is the answer; if it cuts the region, there is no maximum (or no minimum).",
      definition:
        "- Find the corners and make the table of Z as usual. Let M be the largest and m the smallest corner value.\n" +
        "- **Maximum:** draw the open half plane \\(ax + by > M\\) (dashed line). If it has no point in common with the feasible region, M is the maximum. Otherwise Z has no maximum value.\n" +
        "- **Minimum:** draw the open half plane \\(ax + by < m\\). If it has no point in common with the feasible region, m is the minimum. Otherwise Z has no minimum value.\n" +
        "- With \\(\\ge\\) constraints and positive coefficients in Z, the minimum usually exists and the maximum does not.\n" +
        "- If two corners tie for the minimum and the check passes, the minimum is at every point of the segment joining them.",
      formula: {
        label: "Check for a minimum on an unbounded region",
        latex: "ax + by < m \\text{ has no point in common with the region} \\;\\Rightarrow\\; Z_{\\min} = m",
      },
      authoredExample: {
        prompt:
          "Solve graphically: minimise \\(Z = 2x + 3y\\) subject to \\(x + y \\ge 4\\), \\(x + 3y \\ge 6\\), \\(x \\ge 0\\), \\(y \\ge 0\\).",
        steps: [
          "\\(x + y = 4\\) passes through \\((4, 0)\\) and \\((0, 4)\\); \\(x + 3y = 6\\) passes through \\((6, 0)\\) and \\((0, 2)\\).",
          "The origin fails both inequalities, so the region lies on the far side of both lines, in the first quadrant. It runs off without end: it is unbounded.",
          "On the y-axis the tighter condition is \\(y \\ge 4\\): corner \\((0, 4)\\). On the x-axis it is \\(x \\ge 6\\): corner \\((6, 0)\\).",
          "The lines meet where, subtracting, \\(2y = 2\\): \\(y = 1\\), \\(x = 3\\), the corner \\((3, 1)\\).",
          "Table: \\(Z(0, 4) = 12\\), \\(Z(3, 1) = 6 + 3 = 9\\), \\(Z(6, 0) = 12\\). Smallest value \\(m = 9\\).",
          "The region is unbounded, so draw the open half plane \\(2x + 3y < 9\\), below the dashed line through \\((4.5, 0)\\) and \\((0, 3)\\).",
          "It has no point in common with the feasible region (every feasible point has \\(2x + 3y = \\dfrac{3}{2}(x + y) + \\dfrac{1}{2}(x + 3y) \\ge 6 + 3 = 9\\)).",
          "So 9 is the minimum value of Z.",
        ],
        answer: "Minimum \\(Z = 9\\) at \\(x = 3\\), \\(y = 1\\)",
      },
      selfCheckExample: {
        prompt:
          "Show that \\(Z = 3x + 2y\\) has no maximum value subject to \\(x + 2y \\ge 6\\), \\(x \\ge 0\\), \\(y \\ge 0\\).",
        steps: [
          "The region lies on the far side of \\(x + 2y = 6\\) from the origin, in the first quadrant: unbounded, with corners \\((0, 3)\\) and \\((6, 0)\\).",
          "\\(Z(0, 3) = 6\\) and \\(Z(6, 0) = 18\\), so the largest corner value is \\(M = 18\\).",
          "Draw the open half plane \\(3x + 2y > 18\\). The feasible point \\((10, 0)\\) lies in it, since \\(3(10) = 30 > 18\\).",
          "The half plane has points in common with the region, so 18 is not the maximum.",
        ],
        answer: "Z has no maximum value",
      },
      practiceSet: [
        {
          prompt: "Minimise \\(Z = x + y\\) subject to \\(x + 2y \\ge 4\\), \\(3x + y \\ge 6\\), \\(x \\ge 0\\), \\(y \\ge 0\\).",
          answer: "Minimum \\(Z = \\dfrac{14}{5}\\) at \\(\\left(\\dfrac{8}{5}, \\dfrac{6}{5}\\right)\\)",
          method: "Corners \\((0, 6)\\), \\(\\left(\\dfrac{8}{5}, \\dfrac{6}{5}\\right)\\), \\((4, 0)\\); \\(x + y < \\dfrac{14}{5}\\) misses the region",
        },
        {
          prompt: "On an unbounded region the corner values of Z are 12, 9 and 15, and the half plane \\(Z < 9\\) meets the region. What is the minimum of Z?",
          answer: "Z has no minimum value.",
        },
        {
          prompt: "Which half plane do you draw to test whether 40 is the maximum of \\(Z = 4x + 5y\\) on an unbounded region?",
          answer: "The open half plane \\(4x + 5y > 40\\)",
        },
      ],
      pyqExampleId: "57d9527f-7d3b-4e84-a29c-f1bedce6b307",
      traps: [
        {
          title: "Stopping at the corner table",
          body: "On an unbounded region the smallest corner value is not yet the minimum. Without the half plane check the answer is incomplete, and board answers give a step mark for it.",
        },
        {
          title: "Using \\(\\le\\) or \\(\\ge\\) in the check",
          body: "The test region is open: \\(ax + by < m\\) for a minimum and \\(ax + by > M\\) for a maximum, drawn with a dashed line. Its boundary passes through the best corner, so a closed half plane would always meet the region.",
        },
        {
          title: "Saying \"no solution\" when only one value fails",
          body: "An unbounded region often has a minimum but no maximum. If the question asks for the minimum and the check passes, give it; \"Z has no maximum value\" answers only a maximisation.",
        },
      ],
    },
  ],
};
