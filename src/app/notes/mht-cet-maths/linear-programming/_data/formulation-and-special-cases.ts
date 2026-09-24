import type { SubtopicNote } from "@/app/notes/_types";

export const FORMULATION_AND_SPECIAL_CASES_NOTE: SubtopicNote = {
  subtopicName: "Formulation and Special Cases — Word Problems and Infinitely Many Optima",
  title: "Formulation and Special Cases — Word Problems and Infinitely Many Optima",
  oneLineDefinition:
    "Turn a word problem into variables, an objective and inequalities in consistent units; and recognise the tie — when two adjacent corners give the same optimum, every point of the edge between them is optimal.",
  whyItMatters:
    "7 PYQs, none HARD. Two are formulation stems (a machine-time problem and a minimum-cost alloy), and five ask what the solution set of an optimisation LOOKS like — and the answer, every time, has been 'infinitely many points', because the objective was parallel to an edge of the region. " +
    "That pattern has been set in 2023 (twice) and 2025 (three times); it is the one thing on this page worth memorising.",
  concepts: [
    // 1 — formulation
    {
      kind: "formula" as const,
      slug: "cetlpp-formulating-an-lpp",
      name: "Formulating an LPP: Variables, Objective, Constraints in One Unit",
      intuition:
        "Name the decision variables (how many of each item), write profit or cost as the objective, and turn each resource limit into an inequality — after converting every quantity to the same unit. 'At most' is \\(\\le\\), 'at least' is \\(\\ge\\), and \\(x, y \\ge 0\\) is always there.",
      definition:
        "- Machine I: \\(10\\) h \\(40\\) min \\(= 640\\) min; item A takes \\(20\\), B takes \\(15\\): \\(20x + 15y \\le 640\\). Machine II: \\(8\\) h \\(20\\) min \\(= 500\\) min; \\(5x + 8y \\le 500\\). Profit \\(25x + 18y\\), maximise.\n" +
        "- The option with \\(5x + 8y \\ge 500\\) reverses a capacity limit; the option with \\(20x + 5y \\le 8\\) mixed hours and minutes. Both are built from the two standard slips.\n" +
        "- **Minimum cost**: copper \\(x\\) g at ₹8, brass \\(y\\) g at ₹5; chip weight at least \\(5\\) g (\\(x + y \\ge 5\\)), brass at most \\(4\\) (\\(y \\le 4\\)), copper at least \\(2\\) (\\(x \\ge 2\\)). Minimise \\(8x + 5y\\): corners \\((2,3)\\), \\((2,4)\\), \\((5,0)\\) give \\(31, 36, 40\\); minimum ₹31.\n" +
        "- Formulation stems stop at the model; the optimisation stems continue into the corner-point method.",
      formula: {
        label: "Standard form",
        latex:
          "\\text{Maximise/Minimise } Z = px + qy \\quad \\text{subject to } a_ix + b_iy \\le c_i \\ (\\text{or } \\ge),\\ x, y \\ge 0",
      },
      authoredExample: {
        prompt: "A factory makes chairs (\\(x\\)) and tables (\\(y\\)). A chair needs \\(2\\) h of carpentry and \\(1\\) h of finishing; a table needs \\(3\\) h and \\(2\\) h. Carpentry is limited to \\(36\\) h a week and finishing to \\(20\\) h. Profits are ₹500 and ₹800. Formulate.",
        steps: [
          "Objective: maximise \\(Z = 500x + 800y\\).",
          "Carpentry \\(2x + 3y \\le 36\\); finishing \\(x + 2y \\le 20\\); \\(x, y \\ge 0\\).",
        ],
        answer: "Maximise \\(500x + 800y\\) s.t. \\(2x + 3y \\le 36\\), \\(x + 2y \\le 20\\), \\(x, y \\ge 0\\).",
      },
      selfCheckExample: {
        prompt: "A diet needs at least \\(20\\) units of protein and \\(24\\) of fibre. Food P gives \\(4\\) protein and \\(2\\) fibre per kg at ₹60; food Q gives \\(2\\) and \\(6\\) at ₹40. Formulate the minimum-cost problem.",
        steps: [
          "Minimise \\(Z = 60x + 40y\\) subject to \\(4x + 2y \\ge 20\\), \\(2x + 6y \\ge 24\\), \\(x, y \\ge 0\\).",
        ],
        answer: "Minimise \\(60x + 40y\\) s.t. \\(4x + 2y \\ge 20\\), \\(2x + 6y \\ge 24\\), \\(x, y \\ge 0\\).",
      },
      practiceSet: [
        {
          prompt: "\\(10\\) h \\(40\\) min in minutes?",
          answer: "\\(640\\)",
        },
        {
          prompt: "'Must not contain more than \\(4\\) g of brass' is?",
          answer: "\\(y \\le 4\\)",
        },
        {
          prompt: "'Weight at least \\(5\\) g' is?",
          answer: "\\(x + y \\ge 5\\)",
        },
        {
          prompt: "Minimum of \\(8x + 5y\\) over \\((2,3)\\), \\((2,4)\\), \\((5,0)\\)?",
          answer: "\\(31\\)",
        },
      ],
      pyqExampleId: "bfaa7636-2755-4c75-8ea3-084737f3b747",
      traps: [
        {
          title: "Mixing hours and minutes",
          body:
            "\\(20x + 15y \\le 10\\frac23\\) is the same constraint in hours and would be fine — but \\(20x + 5y \\le 8\\) pairs minute coefficients with an hour limit. Convert everything to one unit before writing the inequality.",
        },
      ],
    },

    // 2 — infinitely many optima
    {
      kind: "formula" as const,
      slug: "cetlpp-infinitely-many-optima",
      name: "Infinitely Many Optima: The Objective Parallel to an Edge",
      intuition:
        "If the objective line \\(Z = ax + by\\) has the same slope as an edge of the region, the sliding line touches that whole edge last. Two adjacent corners then give the same optimal value, and every point between them is optimal.",
      definition:
        "- \\(Z = x + y\\), \\(x + y \\le 10\\), \\(5x + 3y \\ge 15\\), \\(x \\le 6\\): corners \\((0,10)\\) and \\((6,4)\\) both give \\(Z = 10\\) because the edge \\(x + y = 10\\) is parallel to the objective. Maximum at **infinitely many points**.\n" +
        "- Minimise \\(Z = 30x + 20y\\), \\(x + y \\le 8\\), \\(x + 2y \\ge 4\\), \\(6x + 4y \\ge 12\\): \\((0,3)\\) and \\(\\left(1, \\frac32\\right)\\) both give \\(60\\) — the edge \\(6x + 4y = 12\\) has slope \\(-\\frac32\\), the same as \\(30x + 20y\\).\n" +
        "- Minimise \\(Z = x + y\\), \\(x + y \\ge 2\\), \\(x + 2y \\le 8\\), \\(y \\le 3\\): \\((2,0)\\) and \\((0,2)\\) tie at \\(2\\); the region is bounded, so 'infinitely many points, bounded set'.\n" +
        "- **Test**: compare the ratio \\(a : b\\) of the objective with the ratio of the coefficients of each binding constraint; a match means a tie. \\(x + y\\) vs \\(x + y \\le 10\\): match.\n" +
        "- 'Unique', 'two distinct points' and 'does not exist' are the distractors; a tie is never at exactly two points.",
      formula: {
        label: "Tie condition",
        latex:
          "Z = ax + by \\ \\parallel\\ \\text{edge } ax + by = c \\ \\Rightarrow\\ \\text{optimum on the whole edge}",
      },
      authoredExample: {
        prompt: "Maximise \\(Z = 2x + 4y\\) subject to \\(x + 2y \\le 8\\), \\(x \\le 6\\), \\(x, y \\ge 0\\). Describe the solution set.",
        steps: [
          "\\(Z = 2(x + 2y)\\) is parallel to the edge \\(x + 2y = 8\\). Corners \\((0,4)\\) and \\((6,1)\\) both give \\(16\\).",
        ],
        answer: "Maximum \\(16\\) at every point of the segment from \\((0, 4)\\) to \\((6, 1)\\) — infinitely many.",
      },
      selfCheckExample: {
        prompt: "Minimise \\(Z = 3x + 3y\\) subject to \\(x + y \\ge 3\\), \\(x \\le 5\\), \\(y \\le 5\\), \\(x, y \\ge 0\\). How many optimal points?",
        steps: [
          "\\(Z = 3(x + y)\\), parallel to \\(x + y = 3\\); \\((3,0)\\) and \\((0,3)\\) both give \\(9\\).",
        ],
        answer: "Infinitely many — the whole segment \\(x + y = 3\\), \\(0 \\le x \\le 3\\).",
      },
      practiceSet: [
        {
          prompt: "Is \\(Z = 30x + 20y\\) parallel to \\(6x + 4y = 12\\)?",
          answer: "Yes (\\(30 : 20 = 6 : 4\\)).",
        },
        {
          prompt: "Is \\(Z = 5x + 2y\\) parallel to \\(x + 2y = 8\\)?",
          answer: "No.",
        },
        {
          prompt: "Two adjacent corners tie: how many optima?",
          answer: "Infinitely many.",
        },
        {
          prompt: "\\(Z = x + y\\) over \\((0,10)\\) and \\((6,4)\\)?",
          answer: "\\(10\\) at both.",
        },
      ],
      pyqExampleId: "bff929b8-d8ac-4a63-b581-478d74ccac95",
      traps: [
        {
          title: "Answering 'two distinct points'",
          body:
            "Two corners tie only because the whole edge between them ties. The optimum is the segment, so the honest count is infinite, never two.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Corner-Point Method — the table the tie is read from",
      href: "/notes/mht-cet-maths/linear-programming/cetlpp-corner-point-method",
    },
  ],
};
