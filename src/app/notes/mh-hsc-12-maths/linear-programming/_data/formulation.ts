import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_MA_LR_FORMULATION_NOTE: SubtopicNote = {
  subtopicName: "Formulation of a Linear Programming Problem",
  title: "Formulating a Linear Programming Problem",
  oneLineDefinition:
    "Turning a word problem into an L.P.P.: name the decision variables, write the objective function to be maximized or minimized, and write every condition as a linear inequation, with x ≥ 0 and y ≥ 0.",
  whyItMatters:
    "23 questions, two of them from board papers: a diet problem (two foods, two vitamins) to be formulated and then solved for the minimum cost (2015), and a problem on two machines to be formulated and then solved for the maximum profit (2024). The textbook rows are Exercise 7.3 and its solved examples, which ask for the formulation only, and the word problems of Part II of the Miscellaneous Exercise, which ask for the formulation and then the graphical solution.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hscmlr-terms",
      name: "The parts of a linear programming problem",
      intuition:
        "Every L.P.P. has the same three parts: the unknowns you choose (decision variables), the one quantity you want as large or as small as possible (objective function), and the limits on the unknowns (constraints). Name all three in your answer and the formulation marks are safe.",
      definition:
        "- A **linear programming problem** is the problem of maximizing or minimizing a linear function subject to linear constraints.\n" +
        "- **Linear** means every variable appears with index at most one: no \\(x^2\\), no \\(xy\\).\n" +
        "- The textbook studies L.P.P.s with at most two variables and with non-negativity constraints.\n" +
        "- Linear programming is used to make the best use of limited resources: raw materials, man-power, machine time, money.",
      table: {
        columns: ["Part", "What the textbook says", "In a profit problem"],
        rows: [
          { cells: ["Decision variables", "The variables involved in the L.P.P.", "\\(x\\), \\(y\\) = numbers of items A and B made"] },
          {
            cells: ["Objective function", "A linear function of the variables which is to be maximized or minimized", "\\(z = 30x + 20y\\), the total profit in Rs"],
            pyqExampleId: "a8d9cf3f-1f4d-4f4b-95fd-0e048fa72e2d",
            noteAmber: "The Miscellaneous Exercise asks this as an MCQ: the objective function is the function to be maximized or minimized, not a constraint.",
          },
          { cells: ["Constraints", "Conditions under which the objective function is optimized, written as equations or inequations", "Machine hours or raw material used, at most what is available"] },
          { cells: ["Non-negativity constraints", "\\(x \\ge 0\\), \\(y \\ge 0\\)", "Numbers of items made cannot be negative"] },
        ],
        caption: "Write all four in a formulation: 'Let x and y be ...', the objective function, the constraints, and x ≥ 0, y ≥ 0.",
      },
      selfCheckExample: {
        prompt: "In the L.P.P. 'Maximize \\(z = 4x + 5y\\) subject to \\(x + y \\le 8\\), \\(2x + y \\le 10\\), \\(x \\ge 0\\), \\(y \\ge 0\\)', name the decision variables, the objective function and the constraints.",
        steps: [
          "The decision variables are \\(x\\) and \\(y\\).",
          "The objective function is \\(z = 4x + 5y\\), to be maximized.",
          "The constraints are \\(x + y \\le 8\\) and \\(2x + y \\le 10\\); \\(x \\ge 0\\), \\(y \\ge 0\\) are the non-negativity constraints.",
        ],
        answer: "Variables \\(x, y\\); objective \\(z = 4x + 5y\\); constraints \\(x + y \\le 8\\), \\(2x + y \\le 10\\), \\(x \\ge 0\\), \\(y \\ge 0\\)",
      },
      practiceSet: [
        { prompt: "What are the non-negativity constraints of an L.P.P. in \\(x\\) and \\(y\\)?", answer: "\\(x \\ge 0\\) and \\(y \\ge 0\\)" },
        { prompt: "Can \\(z = x^2 + 3y\\) be the objective function of a linear programming problem?", answer: "No, \\(x^2\\) has index 2, so the function is not linear" },
      ],
      pyqExampleId: "a8d9cf3f-1f4d-4f4b-95fd-0e048fa72e2d",
      traps: [
        {
          title: "Calling a constraint the objective",
          body: "The objective function is the one quantity to be maximized or minimized (profit, cost, distance). The inequations are the constraints, not the objective.",
        },
        {
          title: "Not saying what x and y stand for",
          body: "Start with 'Let x be the number of ... and y the number of ...'. Without this line the inequations have no meaning and the first mark is lost.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmlr-maxprofit",
      name: "Maximum profit: limited resources give ≤ constraints",
      intuition:
        "In a profit problem every resource (machine time, labour, raw material) is limited, so the amount used must be at most what is available. Each resource gives one '≤' constraint, and the profit is the objective to be maximized.",
      definition:
        "- Step 1: let \\(x\\) and \\(y\\) be the numbers of the two items; write \\(x \\ge 0\\), \\(y \\ge 0\\).\n" +
        "- Step 2: put the data in a table: one row for each resource, one column for each item, and a column for what is available.\n" +
        "- Step 3: each resource row gives one constraint: amount used \\(\\le\\) amount available.\n" +
        "- Step 4: the objective: Maximize \\(z\\) = (profit on one A)\\(x\\) + (profit on one B)\\(y\\).\n" +
        "- Step 5: write the L.P.P. in full: 'Maximize \\(z = \\ldots\\) subject to ...'.\n" +
        "- Use one unit on both sides of a constraint: if times are in minutes, change the hours available into minutes.",
      formula: {
        label: "A maximum-profit L.P.P.",
        latex: "\\text{Maximize } z = px + qy \\ \\text{ subject to } a_1x + b_1y \\le c_1,\\ a_2x + b_2y \\le c_2,\\ x \\ge 0,\\ y \\ge 0",
        symbols: [
          { symbol: "\\(p, q\\)", meaning: "profit on one unit of each item" },
          { symbol: "\\(a_1, b_1\\)", meaning: "amount of the first resource used by one unit of each item" },
          { symbol: "\\(c_1\\)", meaning: "amount of the first resource available" },
        ],
      },
      authoredExample: {
        prompt:
          "A workshop makes chairs and stools. A chair needs 3 hours of carpentry and 1 hour of painting; a stool needs 1 hour of carpentry and 2 hours of painting. At most 30 hours of carpentry and 20 hours of painting are available in a week. The profit is Rs 80 on a chair and Rs 50 on a stool. Formulate the L.P.P. to maximize the profit.",
        steps: [
          "Let the workshop make \\(x\\) chairs and \\(y\\) stools in a week. Then \\(x \\ge 0\\), \\(y \\ge 0\\).",
          "Table: carpentry 3 (chair), 1 (stool), 30 available; painting 1 (chair), 2 (stool), 20 available.",
          "Carpentry: \\(3x + y \\le 30\\). Painting: \\(x + 2y \\le 20\\).",
          "Total profit: \\(z = 80x + 50y\\), to be maximized.",
        ],
        answer: "Maximize \\(z = 80x + 50y\\) subject to \\(3x + y \\le 30\\), \\(x + 2y \\le 20\\), \\(x \\ge 0\\), \\(y \\ge 0\\)",
      },
      selfCheckExample: {
        prompt:
          "A unit of A needs 2 minutes of cutting and a unit of B needs 4 minutes. Cutting is available for 2 hours. Write the cutting constraint for \\(x\\) units of A and \\(y\\) units of B.",
        steps: ["2 hours = 120 minutes, so \\(2x + 4y \\le 120\\).", "Dividing by 2: \\(x + 2y \\le 60\\)."],
        answer: "\\(2x + 4y \\le 120\\), that is \\(x + 2y \\le 60\\)",
      },
      practiceSet: [
        { prompt: "The profit is Rs 25 on each item A and Rs 40 on each item B. Write the objective function for \\(x\\) items A and \\(y\\) items B.", answer: "Maximize \\(z = 25x + 40y\\)" },
        { prompt: "A unit of A uses 5 kg of raw material and a unit of B uses 3 kg; at most 150 kg is available. Write the constraint.", answer: "\\(5x + 3y \\le 150\\)" },
      ],
      pyqExampleId: "adedb232-dbbf-4514-94f3-4b9f9edf8ad1",
      traps: [
        {
          title: "Mixing hours and minutes",
          body: "If each item takes minutes and the machine is free for hours, change the hours into minutes first (3 hours = 180 minutes). A constraint with minutes on one side and hours on the other is wrong.",
        },
        {
          title: "Reading the table the wrong way round",
          body: "The coefficient of \\(x\\) in every constraint comes from item A's column, the coefficient of \\(y\\) from item B's. Write which letter stands for which item before reading off the numbers.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmlr-mincost",
      name: "Minimum cost: requirements give ≥ constraints",
      intuition:
        "In a diet or mixture problem the person or the product needs at least so much of each nutrient, so each nutrient gives a '≥' constraint, and the cost is the objective to be minimized.",
      definition:
        "- Let \\(x\\) and \\(y\\) be the units of the two foods (fertilizers, fodders, compounds) mixed; \\(x \\ge 0\\), \\(y \\ge 0\\).\n" +
        "- Table: one row for each nutrient, a column for each food, and a last column for the minimum requirement.\n" +
        "- Each nutrient row gives: amount supplied \\(\\ge\\) minimum requirement.\n" +
        "- 'At least' and 'minimum of' give \\(\\ge\\); 'at most' and 'not more than' give \\(\\le\\).\n" +
        "- Objective: Minimize \\(z\\) = (cost of one unit of the first food)\\(x\\) + (cost of one unit of the second)\\(y\\).\n" +
        "- A constraint may be divided by a common factor: \\(4x + 2y \\ge 16\\) is the same as \\(2x + y \\ge 8\\).",
      formula: {
        label: "A minimum-cost L.P.P.",
        latex: "\\text{Minimize } z = px + qy \\ \\text{ subject to } a_1x + b_1y \\ge c_1,\\ a_2x + b_2y \\ge c_2,\\ x \\ge 0,\\ y \\ge 0",
        symbols: [
          { symbol: "\\(p, q\\)", meaning: "cost of one unit of each food" },
          { symbol: "\\(a_1, b_1\\)", meaning: "units of the first nutrient in one unit of each food" },
          { symbol: "\\(c_1\\)", meaning: "minimum requirement of the first nutrient" },
        ],
      },
      authoredExample: {
        prompt:
          "A farmer mixes two feeds P and Q. Each kg of P contains 2 units of protein and 3 units of fat; each kg of Q contains 4 units of protein and 1 unit of fat. The mixture must contain at least 20 units of protein and 12 units of fat. P costs Rs 30 per kg and Q costs Rs 25 per kg. Formulate the L.P.P. to minimize the cost.",
        steps: [
          "Let \\(x\\) kg of P and \\(y\\) kg of Q be mixed. Then \\(x \\ge 0\\), \\(y \\ge 0\\).",
          "Table: protein 2 (P), 4 (Q), at least 20; fat 3 (P), 1 (Q), at least 12.",
          "Protein: \\(2x + 4y \\ge 20\\), that is \\(x + 2y \\ge 10\\). Fat: \\(3x + y \\ge 12\\).",
          "Cost: \\(z = 30x + 25y\\), to be minimized.",
        ],
        answer: "Minimize \\(z = 30x + 25y\\) subject to \\(x + 2y \\ge 10\\), \\(3x + y \\ge 12\\), \\(x \\ge 0\\), \\(y \\ge 0\\)",
      },
      selfCheckExample: {
        prompt: "A brick must weigh at least 6 kg and contain not more than 2 kg of sand. If a brick uses \\(x\\) kg of cement and \\(y\\) kg of sand, write these two constraints.",
        steps: ["Weight at least 6 kg: \\(x + y \\ge 6\\).", "Sand not more than 2 kg: \\(y \\le 2\\)."],
        answer: "\\(x + y \\ge 6\\) and \\(y \\le 2\\)",
      },
      practiceSet: [
        {
          prompt: "One unit of food A has 3 units of vitamin C and one unit of food B has 5 units. The diet needs at least 15 units of vitamin C. Write the constraint for \\(x\\) units of A and \\(y\\) units of B.",
          answer: "\\(3x + 5y \\ge 15\\)",
        },
        { prompt: "A cost problem has only '≥' constraints. Is its cost to be maximized or minimized?", answer: "Minimized; over such a region the cost has no finite maximum" },
      ],
      pyqExampleId: "fa07d334-4e64-44be-b2ac-dc4adb263c36",
      traps: [
        {
          title: "Writing ≤ for 'at least'",
          body: "'At least 14 units' means 14 or more, so the constraint is \\(\\ge 14\\). Read each phrase: 'at least' and 'minimum' give \\(\\ge\\), 'at most' and 'not more than' give \\(\\le\\).",
        },
        {
          title: "Maximizing a cost",
          body: "A cost is minimized and a profit is maximized. With all constraints of the '≥' kind, 'maximize the cost' has no finite answer, which is a sign the objective is the wrong way round.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmlr-formsolve",
      name: "Formulate and solve: the full board answer",
      intuition:
        "When a word problem asks 'how many of each should be made' or 'find the minimum cost', the formulation is only the first half. You must then draw the feasible region, find its corners, compare \\(z\\) at each and answer the question in words.",
      definition:
        "- **Formulation**: let \\(x\\), \\(y\\) be ...; the table; the constraints; the objective; the L.P.P. in full.\n" +
        "- **Graph**: draw each boundary line from its intercepts, decide each side by the origin test, and shade the feasible region.\n" +
        "- **Corners**: name each vertex; find a meeting point of two lines by solving their equations, and check it in the other constraints.\n" +
        "- **Table**: the value of \\(z\\) at every corner; choose the largest for a maximum, the smallest for a minimum.\n" +
        "- **Answer in words**: how many of each item, and the maximum profit or minimum cost in Rs.",
      formula: {
        label: "Order of a full answer",
        latex: "\\text{L.P.P.} \\to \\text{feasible region} \\to \\text{corner points} \\to z \\text{ at each corner} \\to \\text{answer in words}",
      },
      authoredExample: {
        prompt:
          "A potter makes pots and vases. A pot takes 1 hour on the wheel and 2 hours in the kiln; a vase takes 1 hour on the wheel and 1 hour in the kiln. The wheel is free for at most 12 hours and the kiln for at most 16 hours a day. The profit is Rs 40 on a pot and Rs 30 on a vase. How many of each should be made for the maximum profit?",
        steps: [
          "Let \\(x\\) pots and \\(y\\) vases be made a day; \\(x \\ge 0\\), \\(y \\ge 0\\). Wheel: \\(x + y \\le 12\\). Kiln: \\(2x + y \\le 16\\). Maximize \\(z = 40x + 30y\\).",
          "\\(x + y = 12\\) passes through \\((12, 0)\\) and \\((0, 12)\\); \\(2x + y = 16\\) through \\((8, 0)\\) and \\((0, 16)\\). The origin satisfies both, so each region is the origin side.",
          "Corners on the axes: \\((8, 0)\\) (since \\((12, 0)\\) gives \\(2x + y = 24 > 16\\)) and \\((0, 12)\\) (since \\((0, 16)\\) gives \\(x + y = 16 > 12\\)).",
          "Meeting point: subtracting \\(x + y = 12\\) from \\(2x + y = 16\\) gives \\(x = 4\\), then \\(y = 8\\). Corner \\((4, 8)\\).",
          "\\(z\\) at \\(O(0, 0)\\) is 0; at \\((8, 0)\\), 320; at \\((4, 8)\\), \\(160 + 240 = 400\\); at \\((0, 12)\\), 360.",
          "The largest value is 400, at \\((4, 8)\\).",
        ],
        answer: "Make 4 pots and 8 vases a day for the maximum profit of Rs 400",
      },
      selfCheckExample: {
        prompt: "The corner points of the feasible region of an L.P.P. are \\((0, 0)\\), \\((6, 0)\\), \\((4, 3)\\) and \\((0, 5)\\). Find the maximum of \\(z = 20x + 30y\\) and where it occurs.",
        steps: ["\\(z\\) at the corners: 0, 120, \\(80 + 90 = 170\\) and 150.", "The largest is 170."],
        answer: "Maximum \\(z = 170\\) at \\((4, 3)\\)",
      },
      practiceSet: [
        {
          prompt: "In a profit problem, \\(x\\) and \\(y\\) are the numbers of items A and B made, and the maximum \\(z = 1800\\) occurs at \\(x = 20\\), \\(y = 15\\). Write the concluding sentence.",
          answer: "Make 20 items of A and 15 items of B for the maximum profit of Rs 1800",
        },
        { prompt: "Find the minimum of \\(z = 5x + 4y\\) over the corner points \\((0, 8)\\), \\((2, 4)\\) and \\((6, 0)\\).", answer: "\\(z\\) = 32, 26, 30, so the minimum is 26 at \\((2, 4)\\)" },
      ],
      pyqExampleId: "b5844f8f-3e35-4b89-bba4-c83fd66ba4d9",
      traps: [
        {
          title: "Stopping at the formulation",
          body: "'Find the number of units' or 'find the minimum cost' asks for the solution too: the graph, the corners, the table of \\(z\\) and the answer. The formulation alone earns only part of the marks.",
        },
        {
          title: "No final sentence",
          body: "End by answering the question asked, in words and with units: 'make 4 pots and 8 vases a day; the maximum profit is Rs 400', not just '\\(z = 400\\)'.",
        },
      ],
    },
  ],
};
