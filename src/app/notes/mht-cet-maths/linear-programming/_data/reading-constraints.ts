import type { SubtopicNote } from "@/app/notes/_types";

export const READING_CONSTRAINTS_NOTE: SubtopicNote = {
  subtopicName: "Reading Constraints Off a Shaded Region",
  title: "Reading Constraints Off a Shaded Region",
  oneLineDefinition:
    "Given a shaded region, recover its inequalities: write each boundary line from its intercepts, then pick a point inside the shading and test it against each line to fix ≥ or ≤.",
  whyItMatters:
    "9 PYQs at 22% HARD — the only page in the chapter with HARD questions, and both of them are here. The stems give a figure with three to five boundary lines and four option sets that differ only in the direction of one or two inequalities. " +
    "The method is the half-plane test run backwards: one interior point, tested against one line at a time, eliminates the wrong options without ever sketching.",
  concepts: [
    // 1 — line from intercepts
    {
      kind: "formula" as const,
      slug: "cetlpp-line-from-intercepts",
      name: "The Boundary Line From Its Intercepts: x/a + y/b = 1",
      intuition:
        "A line cutting the axes at \\((a, 0)\\) and \\((0, b)\\) is \\(\\dfrac{x}{a} + \\dfrac{y}{b} = 1\\), i.e. \\(bx + ay = ab\\). Read the intercepts off the figure and the equation writes itself; a line through the origin with slope \\(m\\) is \\(y = mx\\).",
      definition:
        "- Intercepts \\(4\\) and \\(3\\): \\(\\dfrac{x}{4} + \\dfrac{y}{3} = 1 \\Rightarrow 3x + 4y = 12\\). Intercepts \\(8\\) and \\(4\\): \\(x + 2y = 8\\). Intercepts \\(5\\) and \\(2\\): \\(2x + 5y = 10\\).\n" +
        "- A line through the origin and \\((1, 1)\\) is \\(y = x\\), written \\(y - x = 0\\) or \\(x - y = 0\\) in the options.\n" +
        "- A line through \\((-1, 0)\\) and \\((0, 1)\\) is \\(y = x + 1\\), i.e. \\(y - x = 1\\); the sign of the intercept decides the sign of the constant.\n" +
        "- Horizontal and vertical boundaries are \\(y = 3\\) and \\(x = 4\\); these become \\(y \\le 3\\) or \\(y \\ge 3\\) in the constraint set.\n" +
        "- Match each option's lines to the figure's lines FIRST; an option whose line does not appear in the figure at all is eliminated before any inequality is tested.",
      formula: {
        label: "Intercept form",
        latex:
          "\\frac{x}{a} + \\frac{y}{b} = 1 \\iff bx + ay = ab",
      },
      authoredExample: {
        prompt: "A boundary line in a figure crosses the \\(x\\)-axis at \\(6\\) and the \\(y\\)-axis at \\(2\\). Write its equation.",
        steps: [
          "\\(\\dfrac{x}{6} + \\dfrac{y}{2} = 1 \\Rightarrow x + 3y = 6\\).",
        ],
        answer: "\\(x + 3y = 6\\)",
      },
      selfCheckExample: {
        prompt: "A line passes through \\((0, 2)\\) and \\((-2, 0)\\). Write it in the form used by LPP option lists.",
        steps: [
          "Slope \\(1\\), \\(y\\)-intercept \\(2\\): \\(y = x + 2\\), i.e. \\(y - x = 2\\) or \\(x - y = -2\\).",
        ],
        answer: "\\(y - x = 2\\)",
      },
      practiceSet: [
        {
          prompt: "Intercepts \\(7\\) and \\(6\\): line?",
          answer: "\\(6x + 7y = 42\\)",
        },
        {
          prompt: "Intercepts \\(3\\) and \\(-1\\): line?",
          answer: "\\(x - 3y = 3\\)",
        },
        {
          prompt: "\\(x\\)-intercept of \\(2x + 5y = 10\\)?",
          answer: "\\(5\\)",
        },
        {
          prompt: "Line through \\((0,0)\\) and \\((2, 4)\\)?",
          answer: "\\(y = 2x\\)",
        },
      ],
      pyqExampleId: "9111db3a-f95d-4ee3-86e7-b0e6ed7052dd",
      traps: [
        {
          title: "Swapping the intercepts",
          body:
            "\\(3x + 4y = 12\\) has \\(x\\)-intercept \\(4\\), not \\(3\\). The coefficient of \\(x\\) is the \\(y\\)-intercept's number and vice versa; the option built on the swap is always offered.",
        },
      ],
    },

    // 2 — direction from a test point
    {
      kind: "formula" as const,
      slug: "cetlpp-direction-from-a-test-point",
      name: "Fix ≥ or ≤ With One Point Inside the Shading",
      intuition:
        "Pick a point visibly inside the shaded region, away from every boundary. Substitute it into each line's expression: if the value is below the constant the region is on the \\(\\le\\) side, if above, the \\(\\ge\\) side.",
      definition:
        "- Region with boundaries \\(x + 2y = 50\\), \\(2x + y = 100\\), \\(2x - y = 0\\), interior point \\((10, 40)\\): \\(10 + 80 = 90 \\ge 50\\), \\(20 + 40 = 60 \\le 100\\), \\(20 - 40 = -20 \\le 0\\). So \\(x + 2y \\ge 50\\), \\(2x + y \\le 100\\), \\(2x - y \\le 0\\).\n" +
        "- If the origin is NOT inside the shading, the origin test still works in reverse: a line the shading is on the far side of gets the direction the origin FAILS.\n" +
        "- Two constraints of the form \\(x - y \\ge 0\\), \\(x + y \\ge 0\\) describe a wedge to the right of the origin between the lines \\(y = x\\) and \\(y = -x\\); \\((2, 0)\\) settles both signs at once.\n" +
        "- Non-negativity: if the shading touches an axis, \\(x, y \\ge 0\\) is part of the answer; options that omit it or misprint it (\\(xy \\ge 0\\)) are the same option in disguise.",
      formula: {
        label: "Direction test",
        latex:
          "P \\text{ inside the shading:}\\quad aP_x + bP_y < c \\Rightarrow ax + by \\le c,\\qquad > c \\Rightarrow ax + by \\ge c",
      },
      authoredExample: {
        prompt: "A shaded region has boundaries \\(x + y = 6\\), \\(x - y = 2\\) and the axes, and the point \\((3, 1)\\) lies inside it. Write the constraints.",
        steps: [
          "\\(3 + 1 = 4 \\le 6 \\Rightarrow x + y \\le 6\\). \\(3 - 1 = 2\\) is ON the line; choose a better point, \\((3, 2)\\): \\(3 - 2 = 1 \\le 2 \\Rightarrow x - y \\le 2\\); and \\(3 + 2 = 5 \\le 6\\) confirms the first.",
        ],
        answer: "\\(x + y \\le 6\\), \\(x - y \\le 2\\), \\(x, y \\ge 0\\)",
      },
      selfCheckExample: {
        prompt: "A region has boundaries \\(2x + y = 2\\), \\(x - y = 1\\), \\(x + 2y = 8\\) and the axes; \\((1, 2)\\) is inside. Which inequality does each line take?",
        steps: [
          "\\(2 + 2 = 4 \\ge 2\\); \\(1 - 2 = -1 \\le 1\\); \\(1 + 4 = 5 \\le 8\\).",
        ],
        answer: "\\(2x + y \\ge 2\\), \\(x - y \\le 1\\), \\(x + 2y \\le 8\\)",
      },
      practiceSet: [
        {
          prompt: "\\((2, 0)\\) in \\(x - y \\,?\\, 0\\): which sign?",
          answer: "\\(\\ge\\)",
        },
        {
          prompt: "\\((1, 1)\\) in \\(3x + 4y \\,?\\, 12\\)?",
          answer: "\\(\\le\\)",
        },
        {
          prompt: "\\((3, 4)\\) in \\(2x + 3y \\,?\\, 12\\)?",
          answer: "\\(\\ge\\)",
        },
        {
          prompt: "A test point ON the line tells you?",
          answer: "Nothing — pick another.",
        },
      ],
      pyqExampleId: "faac1451-842a-45d9-b8d0-19bcae8494c4",
      traps: [
        {
          title: "Testing a point on the boundary",
          body:
            "\\((10, 40)\\) is a good test point precisely because it is nowhere near a line. A point on a boundary gives equality and decides nothing.",
        },
      ],
    },

    // 3 — multi-constraint figures
    {
      kind: "formula" as const,
      slug: "cetlpp-multi-constraint-figures",
      name: "Four or Five Lines: Eliminate Options One Line at a Time",
      intuition:
        "With five boundaries and four options, do not reconstruct the whole region. Take the options' lines one at a time, decide the direction with your interior point, and strike out every option that disagrees — usually two lines are enough.",
      definition:
        "- Boundaries \\(3x + 8y = 24\\), \\(4x + 5y = 20\\), \\(5x + 3y = 15\\) with the shading above the first line and below the other two: a point inside, \\((1, 2.7)\\), gives \\(3 + 21.6 = 24.6 \\ge 24\\), \\(4 + 13.5 = 17.5 \\le 20\\), \\(5 + 8.1 = 13.1 \\le 15\\). So \\(3x + 8y \\ge 24\\), \\(4x + 5y \\le 20\\), \\(5x + 3y \\le 15\\) — option (D). The region is thin, so the test point must be read off the figure, not guessed; that is what makes these two stems the chapter's only HARD ones.\\n" +
        "- The reliable route: identify which side of EACH line the shading sits by looking at the line and the shading directly (above/below, left/right), then convert: above a line with positive coefficients is \\(\\ge\\), below is \\(\\le\\).\n" +
        "- Six-constraint stem with \\(2x + 3y = 6\\), \\(3x + 6y = 18\\), \\(x - 3y = 3\\), \\(-x + 2y = 2\\): shading is above \\(2x + 3y = 6\\) (\\(\\ge\\)), below \\(3x + 6y = 18\\) (\\(\\le\\)), above \\(x - 3y = 3\\) (\\(x - 3y \\le 3\\), because larger \\(y\\) makes \\(x - 3y\\) smaller), below \\(-x + 2y = 2\\) (\\(\\le\\)).\n" +
        "- Lines with a NEGATIVE coefficient reverse the intuition: 'above' the line \\(x - 3y = 3\\) means \\(x - 3y \\le 3\\). Compute the sign at a point rather than trusting above/below.",
      formula: {
        label: "Elimination",
        latex:
          "\\text{for each line: decide the side} \\to \\text{strike every option with the other sign} \\to \\text{stop when one option is left}",
      },
      authoredExample: {
        prompt: "Options (A)–(D) share the lines \\(x + y = 5\\), \\(x - y = 1\\), \\(y = 3\\) and differ in signs. The shading lies below \\(x + y = 5\\), above \\(x - y = 1\\), and below \\(y = 3\\). Write the constraints.",
        steps: [
          "Below \\(x + y = 5\\): \\(x + y \\le 5\\). Below \\(y = 3\\): \\(y \\le 3\\).",
          "Above \\(x - y = 1\\): larger \\(y\\) makes \\(x - y\\) smaller, so \\(x - y \\le 1\\).",
        ],
        answer: "\\(x + y \\le 5\\), \\(x - y \\le 1\\), \\(y \\le 3\\), \\(x, y \\ge 0\\)",
      },
      selfCheckExample: {
        prompt: "A region lies above \\(2x + 3y = 12\\), below \\(-x + y = 3\\), left of \\(x = 4\\) and above \\(y = 3\\). Write the constraints.",
        steps: [
          "\\(2x + 3y \\ge 12\\); \\(-x + y \\le 3\\); \\(x \\le 4\\); \\(y \\ge 3\\).",
        ],
        answer: "\\(2x + 3y \\ge 12,\\ -x + y \\le 3,\\ x \\le 4,\\ y \\ge 3\\)",
      },
      pyqExampleId: "abfbaaa8-0190-490b-8ef8-431287282063",
      traps: [
        {
          title: "'Above the line' read as ≥ when a coefficient is negative",
          body:
            "Above \\(x - 3y = 3\\) is \\(x - 3y \\le 3\\). Evaluate the expression at a point; never convert above/below to a sign by reflex.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Feasible Region — the half-plane test this page reverses",
      href: "/notes/mht-cet-maths/linear-programming/cetlpp-feasible-region",
    },
  ],
};
