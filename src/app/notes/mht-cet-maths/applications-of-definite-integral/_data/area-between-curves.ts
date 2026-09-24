import type { SubtopicNote } from "@/app/notes/_types";

export const AREA_BETWEEN_CURVES_NOTE: SubtopicNote = {
  subtopicName: "Area Between Two Curves — Intersections First",
  title: "Area Between Two Curves — Intersections First",
  oneLineDefinition:
    "The area between two curves is ∫(upper − lower) dx between their intersection points — so the intersections are found first, the top curve is decided over each stretch, and only then is anything integrated.",
  whyItMatters:
    "21 PYQs at 38% HARD — the heart of the chapter, and the page where the difficulty is entirely in the setup. " +
    "A parabola against a line is set every year; two parabolas through the origin, a parabola against |x|, and a region described by inequalities are the HARD variants, and each is wrong at the intersection step far more often than at the integral. " +
    "Horizontal strips turn three of these from a two-piece integral into one piece, which is the single most useful habit on this page.",
  concepts: [
    // 1 — intersections then top minus bottom
    {
      kind: "formula" as const,
      slug: "cetadi-intersections-then-top-minus-bottom",
      name: "Solve for the Intersections, Then Integrate Upper Minus Lower",
      intuition:
        "Between two curves a vertical strip runs from the lower curve up to the upper one, so its height is \\(y_{\\text{upper}} - y_{\\text{lower}}\\). The strips exist only between the points where the curves cross, and those are the limits.",
      definition:
        "- **Step 1**: solve the curves simultaneously for the intersection x-values \\(x_1 < x_2\\).\n" +
        "- **Step 2**: decide which curve is on top on \\((x_1, x_2)\\) — test one point, or sketch.\n" +
        "- **Step 3**: \\(A = \\int_{x_1}^{x_2}\\left(y_{\\text{upper}} - y_{\\text{lower}}\\right)dx\\).\n" +
        "- Parabola and line: \\(y = x^2\\) and \\(y = x + 2\\) meet where \\(x^2 - x - 2 = 0\\), \\(x = -1, 2\\); the line is on top: \\(\\int_{-1}^{2}(x + 2 - x^2)\\,dx = \\dfrac92\\).\n" +
        "- Two lines meeting at \\(x = 0\\), cut off by \\(x = 2\\): \\(\\int_0^2\\left[(4x + 1) - (3x + 1)\\right]dx = 2\\).\n" +
        "- When the stem supplies the vertical limits (\\(x = 0\\) and \\(x = 3\\)) and the curves do NOT cross inside them, there is no intersection step: \\(\\int_0^3\\left[(x^2 + 2) - (x + 1)\\right]dx = \\dfrac{15}{2}\\). Non-crossing pairs like \\(e^x\\) and \\(\\log x\\) on \\([1, 2]\\) work the same way.",
      formula: {
        label: "Area between two curves",
        latex:
          "A = \\int_{x_1}^{x_2}\\left(y_{\\text{upper}} - y_{\\text{lower}}\\right)dx, \\qquad x_1, x_2 \\text{ the roots of } y_1(x) = y_2(x)",
      },
      visualizationSlug: "aoi-area-between-curves-region",
      authoredExample: {
        prompt: "Find the area between \\(y = x^2\\) and \\(y = 2x\\).",
        steps: [
          "Intersections: \\(x^2 = 2x \\Rightarrow x = 0, 2\\). At \\(x = 1\\): line \\(2\\), parabola \\(1\\) — the line is on top.",
          "\\(A = \\int_0^2(2x - x^2)\\,dx = \\left[x^2 - \\dfrac{x^3}{3}\\right]_0^2 = 4 - \\dfrac83\\).",
        ],
        answer: "\\(\\dfrac43\\) sq. units",
      },
      selfCheckExample: {
        prompt: "Find the area bounded by \\(y = x^2 - 4\\) and \\(y = 5\\).",
        steps: [
          "Intersections: \\(x^2 - 4 = 5 \\Rightarrow x = \\pm3\\); the line \\(y = 5\\) is above the parabola between them.",
          "\\(A = \\int_{-3}^{3}\\left(5 - x^2 + 4\\right)dx = 2\\int_0^3(9 - x^2)\\,dx = 2(27 - 9)\\).",
        ],
        answer: "\\(36\\) sq. units",
      },
      practiceSet: [
        {
          prompt: "Where do \\(y = x^2\\) and \\(y = x + 2\\) meet?",
          answer: "\\(x = -1\\) and \\(x = 2\\).",
        },
        {
          prompt: "Area between \\(y = x\\) and \\(y = x^2\\)?",
          answer: "\\(\\dfrac16\\)",
        },
        {
          prompt: "Area between \\(y = 4x + 1\\) and \\(y = 3x + 1\\) from \\(x = 0\\) to \\(x = 2\\)?",
          answer: "\\(2\\)",
        },
        {
          prompt: "On \\((-1, 2)\\), which is on top: \\(y = x^2\\) or \\(y = x + 2\\)?",
          answer: "The line \\(y = x + 2\\).",
        },
      ],
      pyqExampleId: "9b06481f-0b4d-46f9-8eed-3f58f9e99595",
      traps: [
        {
          title: "Lower minus upper",
          body:
            "Reversing the order gives the negative of the area, and the option list contains that negative or its magnitude with the wrong sign attached to another term. Test a single interior point to fix which curve is on top before writing the integrand.",
        },
      ],
    },

    // 2 — two parabolas & symmetric regions
    {
      kind: "formula" as const,
      slug: "cetadi-two-parabolas-and-symmetric-regions",
      name: "Two Parabolas Through the Origin, and Regions With Mirror Symmetry",
      intuition:
        "\\(y^2 = 4ax\\) and \\(x^2 = 4ay\\) cross at \\((0, 0)\\) and \\((4a, 4a)\\); between them the first is on top. For regions symmetric about an axis, compute one half and double — fewer integrals, fewer sign slips.",
      definition:
        "- \\(y^2 = 4ax\\), \\(x^2 = 4ay\\): \\(A = \\int_0^{4a}\\left(2\\sqrt{ax} - \\dfrac{x^2}{4a}\\right)dx = \\dfrac{16a^2}{3}\\). The general \\(y = ax^2\\), \\(x = ay^2\\) pair gives \\(\\dfrac{1}{3a^2}\\); setting that equal to \\(1\\) gives \\(a = \\dfrac{1}{\\sqrt3}\\).\n" +
        "- **Parabola against \\(|x|\\)**: \\(y = x^2\\) and \\(y = |x|\\) meet at \\(x = 0, \\pm1\\); by symmetry \\(A = 2\\int_0^1(x - x^2)\\,dx = \\dfrac13\\). \\(y^2 = 4x\\) against \\(y = |x|\\) lives only in \\(x \\ge 0\\): \\(\\int_0^4(2\\sqrt x - x)\\,dx = \\dfrac83\\).\n" +
        "- **Two shifted parabolas and a horizontal line**: \\(y = (x - 1)^2\\), \\(y = (x + 1)^2\\), \\(y = \\dfrac14\\) — symmetric about the y-axis; the enclosed region is \\(2\\int_0^{1/2}\\left[\\dfrac14 - (x - 1)^2\\right]dx\\)… taken with the correct sign, \\(\\dfrac13\\).\n" +
        "- Always ask: is the region symmetric about the x-axis, the y-axis or \\(y = x\\)? If so, integrate half.",
      formula: {
        label: "Two standard parabola results",
        latex:
          "\\text{Area}\\left(y^2 = 4ax,\\ x^2 = 4ay\\right) = \\frac{16a^2}{3} \\qquad \\text{Area}\\left(y = ax^2,\\ x = ay^2\\right) = \\frac{1}{3a^2}",
      },
      authoredExample: {
        prompt: "Find the area between \\(y^2 = x\\) and \\(x^2 = y\\).",
        steps: [
          "Intersections: \\(x^4 = x \\Rightarrow x = 0, 1\\). On \\((0, 1)\\), \\(\\sqrt x > x^2\\).",
          "\\(A = \\int_0^1(\\sqrt x - x^2)\\,dx = \\dfrac23 - \\dfrac13\\).",
          "Check with the formula \\(\\dfrac{16a^2}{3}\\) at \\(4a = 1\\): \\(\\dfrac{16}{3}\\cdot\\dfrac{1}{16} = \\dfrac13\\).",
        ],
        answer: "\\(\\dfrac13\\) sq. units",
      },
      selfCheckExample: {
        prompt: "Find the area between \\(y = x^2\\) and \\(y = 2|x|\\).",
        steps: [
          "For \\(x \\ge 0\\): \\(x^2 = 2x \\Rightarrow x = 0, 2\\), and \\(2x \\ge x^2\\) there. Half-area \\(= \\int_0^2(2x - x^2)\\,dx = 4 - \\dfrac83 = \\dfrac43\\).",
          "By symmetry about the y-axis, double it.",
        ],
        answer: "\\(\\dfrac83\\) sq. units",
      },
      practiceSet: [
        {
          prompt: "Area between \\(y^2 = 8x\\) and \\(x^2 = 8y\\)?",
          answer: "\\(\\dfrac{64}{3}\\)",
          method: "\\(a = 2\\): \\(16\\cdot4/3\\).",
        },
        {
          prompt: "Area between \\(y = x^2\\) and \\(y = |x|\\)?",
          answer: "\\(\\dfrac13\\)",
        },
        {
          prompt: "If the area between \\(y = ax^2\\) and \\(x = ay^2\\) is \\(3\\), then \\(a = ?\\)",
          answer: "\\(\\dfrac13\\)",
          method: "\\(1/(3a^2) = 3\\).",
        },
        {
          prompt: "Where do \\(y = x^2\\) and \\(y = |x|\\) meet?",
          answer: "\\(x = -1, 0, 1\\).",
        },
      ],
      pyqExampleId: "5424dc41-076d-41bb-9887-91dfd5796882",
      traps: [
        {
          title: "Counting a branch that is not there",
          body:
            "\\(y^2 = 4x\\) has no points with \\(x < 0\\), so its region with \\(y = |x|\\) is NOT doubled — the answer is \\(\\frac83\\), not \\(\\frac{16}{3}\\). Symmetry doubles only when both curves exist on both sides.",
        },
      ],
    },

    // 3 — horizontal strips
    {
      kind: "formula" as const,
      slug: "cetadi-horizontal-strips-right-minus-left",
      name: "Horizontal Strips: Integrate (Right − Left) in y",
      intuition:
        "For \\(y^2 = 2x\\) against \\(x = y + 4\\), vertical strips need two pieces (the top boundary changes where the line takes over). Horizontal strips run from the parabola on the left to the line on the right for every \\(y\\) — one integral.",
      definition:
        "- \\(A = \\int_{y_1}^{y_2}\\left(x_{\\text{right}} - x_{\\text{left}}\\right)dy\\), limits from solving the curves in \\(y\\).\n" +
        "- \\(\\dfrac{y^2}{2} \\le x \\le y + 4\\): \\(y^2 - 2y - 8 = 0 \\Rightarrow y = -2, 4\\); \\(A = \\int_{-2}^{4}\\left(y + 4 - \\dfrac{y^2}{2}\\right)dy = 18\\).\n" +
        "- \\(y^2 = 4x\\) and \\(y = 2x - 4\\): in \\(y\\), \\(x = \\dfrac{y^2}{4}\\) and \\(x = \\dfrac{y + 4}{2}\\), meeting at \\(y = -2, 4\\); \\(A = \\int_{-2}^{4}\\left(\\dfrac{y + 4}{2} - \\dfrac{y^2}{4}\\right)dy = 9\\).\n" +
        "- Two parabolas \\(x^2 = \\dfrac{y}{4}\\), \\(x^2 = 9y\\) capped by \\(y = 2\\): at height \\(y\\) the width is \\(2\\left(3\\sqrt y - \\dfrac{\\sqrt y}{2}\\right) = 5\\sqrt y\\), so \\(A = \\int_0^2 5\\sqrt y\\,dy = \\dfrac{20\\sqrt2}{3}\\); the same shape with \\(y = 9x^2\\), \\(y = \\dfrac{x^2}{16}\\), \\(y = 1\\) gives \\(\\dfrac{44}{9}\\).\n" +
        "- Rule of thumb: when a boundary is a **sideways** parabola or the region is capped by a **horizontal** line, slice horizontally.",
      formula: {
        label: "Horizontal strips between two curves",
        latex:
          "A = \\int_{y_1}^{y_2}\\left(x_{\\text{right}}(y) - x_{\\text{left}}(y)\\right)dy",
      },
      authoredExample: {
        prompt: "Find the area between \\(y^2 = x\\) and \\(x = y + 2\\).",
        steps: [
          "In \\(y\\): \\(x_{\\text{left}} = y^2\\), \\(x_{\\text{right}} = y + 2\\); they meet where \\(y^2 = y + 2\\), i.e. \\(y = -1, 2\\).",
          "\\(A = \\int_{-1}^{2}(y + 2 - y^2)\\,dy = \\left[\\dfrac{y^2}{2} + 2y - \\dfrac{y^3}{3}\\right]_{-1}^{2} = \\left(2 + 4 - \\dfrac83\\right) - \\left(\\dfrac12 - 2 + \\dfrac13\\right)\\).",
          "\\(= \\dfrac{10}{3} + \\dfrac76 = \\dfrac{27}{6}\\).",
        ],
        answer: "\\(\\dfrac92\\) sq. units",
      },
      selfCheckExample: {
        prompt: "Find the area between the parabolas \\(y = x^2\\) and \\(y = 4x^2\\) below the line \\(y = 4\\).",
        steps: [
          "At height \\(y\\) the outer parabola gives \\(x = \\sqrt y\\), the inner \\(x = \\dfrac{\\sqrt y}{2}\\); width \\(2\\left(\\sqrt y - \\dfrac{\\sqrt y}{2}\\right) = \\sqrt y\\).",
          "\\(A = \\int_0^4\\sqrt y\\,dy = \\dfrac23\\cdot8\\).",
        ],
        answer: "\\(\\dfrac{16}{3}\\) sq. units",
      },
      practiceSet: [
        {
          prompt: "\\(y^2 = 4x\\) solved for \\(x\\) is?",
          answer: "\\(x = \\dfrac{y^2}{4}\\)",
        },
        {
          prompt: "Where do \\(x = y^2/2\\) and \\(x = y + 4\\) meet?",
          answer: "\\(y = -2\\) and \\(y = 4\\).",
        },
        {
          prompt: "Width at height \\(y\\) between \\(x = 3\\sqrt y\\) and \\(x = \\sqrt y/2\\) (both sides)?",
          answer: "\\(5\\sqrt y\\)",
        },
        {
          prompt: "Area between \\(y^2 = x\\) and \\(x = 4\\)?",
          answer: "\\(\\dfrac{32}{3}\\)",
          method: "\\(\\int_{-2}^{2}(4 - y^2)\\,dy\\).",
        },
      ],
      pyqExampleId: "949b0d71-d0bd-4864-84a4-13ee71ad3811",
      traps: [
        {
          title: "Vertical strips on a sideways parabola",
          body:
            "For \\(y^2 = 2x\\) against a line, a vertical strip's top boundary switches from the parabola's upper arm to the line partway across — two integrals and a missed switch. One horizontal integral does the whole region.",
        },
      ],
    },

    // 4 — several boundaries
    {
      kind: "formula" as const,
      slug: "cetadi-regions-with-several-boundaries",
      name: "Regions Described by Several Inequalities: Sketch, Then Split Where the Top Changes",
      intuition:
        "\\(\\{x \\ge 0,\\ x + y \\le 3,\\ x^2 \\le 4y,\\ y \\le 1 + \\sqrt x\\}\\) is a region with one floor and two possible ceilings. The ceiling switches where \\(1 + \\sqrt x = 3 - x\\); each stretch gets its own integral with its own top curve.",
      definition:
        "- Translate each inequality into a boundary: \\(x^2 \\le 4y\\) means **above** the parabola \\(y = \\dfrac{x^2}{4}\\); \\(y \\le 1 + \\sqrt x\\) means **below** that curve; \\(x + y \\le 3\\) means below the line \\(y = 3 - x\\).\n" +
        "- Find every pairwise intersection that matters: \\(1 + \\sqrt x = 3 - x\\) at \\(x = 1\\); \\(3 - x = \\dfrac{x^2}{4}\\) at \\(x = 2\\).\n" +
        "- Integrate stretch by stretch: \\(\\int_0^1\\left(1 + \\sqrt x - \\dfrac{x^2}{4}\\right)dx + \\int_1^2\\left(3 - x - \\dfrac{x^2}{4}\\right)dx = \\dfrac{19}{12} + \\dfrac{11}{12} = \\dfrac52\\).\n" +
        "- 'First quadrant, bounded by \\(y = \\sqrt x\\), the line \\(2y - x + 3 = 0\\) and the x-axis': the region under \\(\\sqrt x\\) up to the intersection \\((9, 3)\\), minus the triangle under the line from \\(x = 3\\) to \\(9\\): \\(18 - 9 = 9\\).\n" +
        "- Subtracting a simple shape (triangle, rectangle) from an integral is often quicker than a second integral.",
      formula: {
        label: "Piecewise ceiling",
        latex:
          "A = \\int_{x_0}^{x_1}\\left(\\text{ceiling}_1 - \\text{floor}\\right)dx + \\int_{x_1}^{x_2}\\left(\\text{ceiling}_2 - \\text{floor}\\right)dx",
      },
      authoredExample: {
        prompt: "Find the area of the region \\(\\{(x, y):\\ 0 \\le y \\le x^2,\\ 0 \\le x \\le 1\\} \\cup \\{(x, y):\\ 0 \\le y \\le 2 - x,\\ 1 \\le x \\le 2\\}\\).",
        steps: [
          "Floor is the x-axis throughout; the ceiling is \\(x^2\\) on \\([0, 1]\\) and \\(2 - x\\) on \\([1, 2]\\) (they agree at \\(x = 1\\)).",
          "\\(A = \\int_0^1 x^2\\,dx + \\int_1^2(2 - x)\\,dx = \\dfrac13 + \\dfrac12\\).",
        ],
        answer: "\\(\\dfrac56\\) sq. units",
      },
      selfCheckExample: {
        prompt: "Find the area in the first quadrant bounded by \\(y = \\sqrt x\\), the line \\(y = x - 2\\) and the x-axis.",
        steps: [
          "\\(\\sqrt x = x - 2 \\Rightarrow x = 4\\) (the root \\(x = 1\\) is extraneous). The line meets the axis at \\(x = 2\\).",
          "Region \\(= \\int_0^4\\sqrt x\\,dx - \\text{triangle under the line from } 2 \\text{ to } 4 = \\dfrac{16}{3} - \\dfrac12\\cdot2\\cdot2\\).",
        ],
        answer: "\\(\\dfrac{10}{3}\\) sq. units",
      },
      pyqExampleId: "169a5c86-c1cc-4225-bd02-2acb6eade4ac",
      traps: [
        {
          title: "One ceiling for the whole interval",
          body:
            "With \\(y \\le 1 + \\sqrt x\\) and \\(x + y \\le 3\\) both in force, the ceiling is the LOWER of the two at each \\(x\\), and it changes at \\(x = 1\\). Using either curve alone over \\([0, 2]\\) gives an answer that is not on the list — which is the paper's way of telling you to split.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Area Under a Curve — the single-curve setup this page extends",
      href: "/notes/mht-cet-maths/applications-of-definite-integral/cetadi-area-under-a-curve",
    },
    {
      label: "Areas of Circles, Ellipses and Hyperbolas — the same setup with a root integrand",
      href: "/notes/mht-cet-maths/applications-of-definite-integral/cetadi-conic-regions",
    },
  ],
};
