import type { SubtopicNote } from "@/app/notes/_types";

export const ANGLE_BETWEEN_CURVES_NOTE: SubtopicNote = {
  subtopicName: "Angle Between Curves and Orthogonality",
  title: "Angle Between Curves, Orthogonality, and Nearest Distance",
  oneLineDefinition:
    "The angle between two curves is the angle between their tangents at the point where they meet. Find both slopes at the intersection, feed them into the tan formula, and read off the angle — or set the slope product to minus one for a right-angle (orthogonal) intersection.",
  whyItMatters:
    "This is one of MHT-CET Maths' most reliable Applications-of-Derivative pockets: 8 PYQs sit here (1 HARD, 7 MODERATE), and every one reduces to the same two-step drill — get m1 and m2 at the meeting point, then plug into tanθ = |(m1−m2)/(1+m1m2)|. " +
    "The orthogonality variant (solve a parameter so m1m2 = −1) recurs almost every year with the y²=6x, 9x²+by²=16 family, and the parallel-tangent trick for the shortest line-to-curve distance rides on the exact same slope-matching idea.",
  concepts: [
    // 1 — FOUNDATION: slopes of both curves at the intersection point (no PYQ, lint-exempt)
    {
      kind: "formula" as const,
      slug: "cetaod-slopes-at-intersection",
      name: "Tangent Slopes of Two Curves at Their Meeting Point",
      intuition:
        "Two curves that cross share exactly one point there, but each keeps its own direction — its own tangent slope. To compare their directions you first need both slopes AT that shared point. Find the intersection, then evaluate dy/dx of each curve there.",
      definition:
        "Given two curves meeting at a point \\(P(x_0, y_0)\\):\n" +
        "- **Step 1 — the point.** Solve the two curve equations simultaneously to find \\(P\\). Dividing or substituting one equation into the other usually isolates \\(x_0\\) fast.\n" +
        "- **Step 2 — the two slopes.** Differentiate each curve (explicitly or implicitly) and evaluate at \\(P\\): call them \\(m_1\\) and \\(m_2\\).\n" +
        "These two numbers \\(m_1, m_2\\) are everything the angle formulas need. For an implicit curve \\(F(x,y)=0\\), differentiate term by term and solve for \\(\\dfrac{dy}{dx}\\) before substituting the coordinates.",
      formula: {
        label: "Slope at a point on a curve",
        latex: "m = \\left.\\dfrac{dy}{dx}\\right|_{(x_0,\\,y_0)}",
        symbols: [
          { symbol: "m", meaning: "tangent slope of one curve at the shared point" },
          { symbol: "(x_0, y_0)", meaning: "the intersection point, found by solving the two curves together" },
        ],
      },
      authoredExample: {
        prompt:
          "Find the slopes of \\(y = x^2\\) and \\(x = y^2\\) at their common point \\((1,1)\\).",
        steps: [
          "For \\(y = x^2\\): \\(\\dfrac{dy}{dx} = 2x\\); at \\(x = 1\\) this is \\(m_1 = 2\\).",
          "For \\(x = y^2\\): differentiate to \\(1 = 2y\\dfrac{dy}{dx}\\), so \\(\\dfrac{dy}{dx} = \\dfrac{1}{2y}\\); at \\(y = 1\\) this is \\(m_2 = \\dfrac{1}{2}\\).",
        ],
        answer: "\\(m_1 = 2,\\quad m_2 = \\tfrac{1}{2}\\)",
      },
      selfCheckExample: {
        prompt:
          "The curves \\(xy = 6\\) and \\(x^2 y = 12\\) meet at one point. Find that point and the two slopes there.",
        steps: [
          "Divide \\(x^2 y = 12\\) by \\(xy = 6\\): \\(x = 2\\), then \\(y = 6/2 = 3\\). Point \\((2,3)\\).",
          "For \\(xy = 6\\Rightarrow y = 6/x\\): \\(y' = -6/x^2 = -6/4 = -\\tfrac{3}{2} = m_1\\).",
          "For \\(x^2 y = 12\\Rightarrow y = 12/x^2\\): \\(y' = -24/x^3 = -24/8 = -3 = m_2\\).",
        ],
        answer: "Point \\((2,3)\\); \\(m_1 = -\\tfrac{3}{2},\\ m_2 = -3\\).",
      },
      practiceSet: [
        { prompt: "Slope of \\(y = 2x^2\\) at \\((1,1)\\).", answer: "\\(4\\)", method: "\\(y' = 4x\\)" },
        { prompt: "Slope of \\(x = 2y^2\\) at \\((2,1)\\).", answer: "\\(\\tfrac{1}{4}\\)", method: "\\(1 = 4y\\,y'\\Rightarrow y' = 1/(4y)\\)" },
        { prompt: "Slope of \\(y^2 = 6x\\) at a point with \\(y\\)-value \\(y\\).", answer: "\\(\\tfrac{3}{y}\\)", method: "\\(2y\\,y' = 6\\)" },
        { prompt: "Intersection of \\(y = x^2\\) and \\(x = y^2\\) other than the origin.", answer: "\\((1,1)\\)", method: "\\(x = x^4\\Rightarrow x = 1\\)" },
      ],
      traps: [
        {
          title: "You need slopes at the SHARED point, not at any point",
          body:
            "The angle between two curves is defined only where they intersect. Always solve the two equations together for \\(P\\) FIRST, then substitute those coordinates into each dy/dx. Evaluating the slopes at convenient but different points gives a meaningless angle.",
        },
        {
          title: "Differentiate the implicit curve fully",
          body:
            "For a curve like \\(9x^2 + by^2 = 16\\), every term differentiates: \\(18x + 2by\\dfrac{dy}{dx} = 0\\), giving \\(\\dfrac{dy}{dx} = -\\dfrac{9x}{by}\\). Forgetting the \\(\\dfrac{dy}{dx}\\) factor on the \\(y\\)-term drops the slope entirely.",
        },
      ],
    },

    // 2 — angle-between-curves formula (anchored, SVG)
    {
      kind: "formula" as const,
      slug: "cetaod-angle-between-curves",
      name: "The Angle Between Two Curves",
      visualizationSlug: "lines-angle-between-diagram",
      intuition:
        "Once you have the two tangent slopes at the meeting point, the angle between the curves is just the angle between those two lines. The tangent of that angle comes straight from the slope-difference formula — the same one you use for two straight lines.",
      definition:
        "If two curves meet with tangent slopes \\(m_1\\) and \\(m_2\\) at the intersection, the acute angle \\(\\theta\\) between them satisfies\n" +
        "\\[\\tan\\theta = \\left|\\dfrac{m_1 - m_2}{1 + m_1 m_2}\\right|.\\]\n" +
        "So \\(\\theta = \\tan^{-1}\\left|\\dfrac{m_1 - m_2}{1 + m_1 m_2}\\right|\\). Notes on the formula:\n" +
        "- The **modulus** guarantees the acute angle — report that unless the question asks otherwise.\n" +
        "- If \\(1 + m_1 m_2 = 0\\) the tangent is undefined, meaning \\(\\theta = 90^\\circ\\) (orthogonal — see the next concept).\n" +
        "- For exponential curves \\(y = a^x\\) the slope is \\(a^x \\log a\\); at their common point \\((0,1)\\) the slopes are simply \\(\\log a\\).",
      formula: {
        label: "Angle between two curves",
        latex: "\\tan\\theta = \\left|\\dfrac{m_1 - m_2}{1 + m_1 m_2}\\right|",
        symbols: [
          { symbol: "m_1, m_2", meaning: "the two tangent slopes at the intersection point" },
          { symbol: "\\(\\theta\\)", meaning: "the acute angle between the curves" },
        ],
      },
      authoredExample: {
        prompt:
          "Find the acute angle between \\(y = 10 - x^2\\) and \\(y = 2 + x^2\\) at their intersection.",
        steps: [
          "Intersect: \\(10 - x^2 = 2 + x^2\\Rightarrow x^2 = 4\\Rightarrow x = \\pm 2\\), and \\(y = 6\\).",
          "Slopes: \\(y = 10 - x^2\\Rightarrow y' = -2x = -4\\); \\(y = 2 + x^2\\Rightarrow y' = 2x = 4\\). So \\(m_1 = -4,\\ m_2 = 4\\).",
          "Apply the formula: \\(|\\tan\\theta| = \\left|\\dfrac{-4 - 4}{1 + (-4)(4)}\\right| = \\dfrac{8}{|{-15}|} = \\dfrac{8}{15}\\).",
        ],
        answer: "\\(|\\tan\\theta| = \\dfrac{8}{15}\\)",
      },
      selfCheckExample: {
        prompt:
          "At what angle do \\(y = 3^x\\) and \\(y = 7^x\\) intersect?",
        steps: [
          "Both pass through \\((0,1)\\): set \\(3^x = 7^x\\Rightarrow x = 0\\).",
          "Slopes there: \\(\\dfrac{d}{dx}3^x = 3^x\\log 3 \\to \\log 3\\) and \\(\\dfrac{d}{dx}7^x \\to \\log 7\\). So \\(m_1 = \\log 3,\\ m_2 = \\log 7\\).",
          "\\(\\tan\\theta = \\left|\\dfrac{\\log 3 - \\log 7}{1 + (\\log 3)(\\log 7)}\\right| = \\dfrac{\\log(3/7)}{1 + (\\log 3)(\\log 7)}\\).",
        ],
        answer: "\\(\\tan\\theta = \\dfrac{\\log(3/7)}{1 + (\\log 3)(\\log 7)}\\)",
      },
      practiceSet: [
        { prompt: "\\(m_1 = 4,\\ m_2 = \\tfrac14\\): find \\(\\tan\\theta\\).", answer: "\\(\\tfrac{15}{8}\\)", method: "\\(\\left|\\dfrac{4 - 1/4}{1 + 1}\\right| = \\dfrac{15/4}{2}\\)" },
        { prompt: "\\(m_1 = -\\tfrac32,\\ m_2 = -3\\): find \\(\\tan\\theta\\).", answer: "\\(\\tfrac{3}{11}\\)", method: "\\(\\left|\\dfrac{-3/2 + 3}{1 + 9/2}\\right| = \\dfrac{3/2}{11/2}\\)" },
        { prompt: "When is \\(\\tan\\theta\\) undefined?", answer: "when \\(1 + m_1 m_2 = 0\\)", method: "the curves are orthogonal, \\(\\theta = 90^\\circ\\)" },
        { prompt: "Slope of \\(y = a^x\\) at \\(x = 0\\).", answer: "\\(\\log a\\)", method: "\\(a^x\\log a\\) at \\(x=0\\)" },
      ],
      pyqExampleId: "def98e90-b80b-466c-a4bd-7fec6fc538d6", // angle between xy=6 and x^2 y=12
      traps: [
        {
          title: "Keep the modulus for the ACUTE angle",
          body:
            "The formula \\(\\tan\\theta = \\left|\\dfrac{m_1 - m_2}{1 + m_1 m_2}\\right|\\) uses a modulus so \\(\\theta\\) comes out acute. Dropping it can hand you a negative tangent (an obtuse angle) — check the answer options: MHT-CET usually lists the acute value.",
        },
        {
          title: "\\(\\dfrac{d}{dx}a^x = a^x\\log a\\), not \\(x\\,a^{x-1}\\)",
          body:
            "For \\(y = 3^x, y = 7^x\\) the base is constant and the exponent is the variable — the derivative is \\(a^x\\log a\\), so the slopes at \\((0,1)\\) are \\(\\log 3\\) and \\(\\log 7\\). Using the power rule here is a common wipe-out.",
        },
      ],
    },

    // 3 — curve meeting a coordinate axis at an angle (anchored)
    {
      kind: "formula" as const,
      slug: "cetaod-curve-meets-axis-angle",
      name: "The Angle a Curve Makes With a Coordinate Axis",
      intuition:
        "A coordinate axis is itself a straight line with a known slope: the X-axis has slope 0, the Y-axis is vertical. So 'the angle a curve makes with the axis' is just the angle between the curve's tangent there and that axis — and against the X-axis it collapses to \\(\\tan\\theta = |m|\\), the slope itself.",
      definition:
        "To find the angle a curve makes with an axis at a given point:\n" +
        "- Find the curve's tangent slope \\(m\\) at that point (implicit differentiation if needed).\n" +
        "- **Against the X-axis** (slope \\(0\\)): \\(\\tan\\theta = |m|\\), so \\(\\theta = \\tan^{-1}|m|\\). A slope of \\(1\\) gives \\(45^\\circ\\); slope \\(0\\) means the curve is tangent to the axis (\\(\\theta = 0\\)); an infinite slope means \\(\\theta = 90^\\circ\\).\n" +
        "- **Against the Y-axis**: use \\(\\tan\\theta = \\left|\\dfrac{1}{m}\\right|\\) (the Y-axis is the perpendicular reference).\n" +
        "When a curve passes through the origin, substitute \\((0,0)\\) into the implicit derivative to read the slope directly.",
      formula: {
        label: "Angle a curve makes with the X-axis",
        latex: "\\tan\\theta = |m| \\qquad \\theta = \\tan^{-1}|m|",
        symbols: [
          { symbol: "m", meaning: "tangent slope of the curve at the point on the axis" },
        ],
      },
      authoredExample: {
        prompt:
          "The curve \\(x^4 - 2xy^2 + y^2 + 3x - 3y = 0\\) cuts the X-axis at \\((0,0)\\). Find the angle.",
        steps: [
          "Differentiate implicitly: \\(4x^3 - 2y^2 - 4xy\\dfrac{dy}{dx} + 2y\\dfrac{dy}{dx} + 3 - 3\\dfrac{dy}{dx} = 0\\).",
          "Substitute \\((0,0)\\): all \\(x,y\\) terms vanish, leaving \\(3 - 3\\dfrac{dy}{dx} = 0\\), so \\(m = 1\\).",
          "Angle with the X-axis: \\(\\tan\\theta = |m| = 1\\Rightarrow \\theta = \\dfrac{\\pi}{4}\\).",
        ],
        answer: "\\(\\theta = \\dfrac{\\pi}{4}\\)",
      },
      selfCheckExample: {
        prompt:
          "At what angle does \\(y = x^2 - 4x + 4\\) meet the X-axis?",
        steps: [
          "The curve touches the X-axis where \\(y = 0\\): \\((x-2)^2 = 0\\Rightarrow x = 2\\) (a repeated root).",
          "Slope: \\(y' = 2x - 4\\); at \\(x = 2\\), \\(m = 0\\).",
          "\\(\\tan\\theta = |m| = 0\\Rightarrow \\theta = 0\\): the parabola is tangent to the axis.",
        ],
        answer: "\\(\\theta = 0\\) (the curve touches, not crosses, the X-axis).",
      },
      practiceSet: [
        { prompt: "Curve has slope \\(1\\) at a point on the X-axis: angle?", answer: "\\(\\tfrac{\\pi}{4}\\)", method: "\\(\\tan^{-1}1\\)" },
        { prompt: "Slope \\(\\sqrt{3}\\) at the X-axis: angle?", answer: "\\(\\tfrac{\\pi}{3}\\)", method: "\\(\\tan^{-1}\\sqrt3\\)" },
        { prompt: "Angle with X-axis if the tangent is vertical.", answer: "\\(\\tfrac{\\pi}{2}\\)", method: "slope \\(\\to\\infty\\)" },
        { prompt: "Slope of \\(x^4 - 2xy^2 + y^2 + 3x - 3y = 0\\) at \\((0,0)\\).", answer: "\\(1\\)", method: "\\(3 - 3y' = 0\\)" },
      ],
      pyqExampleId: "5310adcd-2bbd-4318-a1a5-e4712637f85f", // curve cuts X-axis at (0,0) at angle
      traps: [
        {
          title: "Angle with the X-axis is \\(\\tan^{-1}|m|\\), not the angle formula",
          body:
            "You do NOT need the full \\(\\left|\\dfrac{m_1-m_2}{1+m_1m_2}\\right|\\) here — the axis has slope \\(0\\), so that formula collapses to \\(\\tan\\theta = |m|\\). Trying to force the two-slope formula wastes time and invites arithmetic slips.",
        },
        {
          title: "At the origin, most terms die — keep only the linear ones",
          body:
            "Substituting \\((0,0)\\) into an implicit derivative kills every term carrying an \\(x\\) or \\(y\\) factor. Only the constant-coefficient linear terms (here \\(3x\\) and \\(-3y\\)) survive, so the slope reads off in one line: \\(3 - 3\\dfrac{dy}{dx} = 0\\).",
        },
      ],
    },

    // 4 — orthogonal intersection: solve a parameter (anchored, HARD)
    {
      kind: "formula" as const,
      slug: "cetaod-orthogonal-intersection",
      name: "Orthogonal Curves and Solving for a Parameter",
      intuition:
        "Two curves cross 'at right angles' (orthogonally) when their tangents are perpendicular there — so the product of the slopes is \\(-1\\). When one curve carries an unknown constant, this single condition \\(m_1 m_2 = -1\\) becomes an equation you solve for that constant.",
      definition:
        "Curves intersect **orthogonally** at \\(P\\) when their tangent slopes satisfy\n" +
        "\\[m_1 \\, m_2 = -1.\\]\n" +
        "This is exactly the '\\(1 + m_1 m_2 = 0\\)' case of the angle formula (\\(\\theta = 90^\\circ\\)). The standard MHT-CET task: one curve has a free parameter (e.g. \\(b\\) in \\(9x^2 + by^2 = 16\\)); impose \\(m_1 m_2 = -1\\) at the intersection and use the curve equations to eliminate the coordinates, leaving one equation in the parameter. Because the intersection relation (like \\(y^2 = 6x\\)) usually appears in \\(m_1 m_2\\), the coordinates cancel and the parameter drops out cleanly.",
      formula: {
        label: "Orthogonality condition",
        latex: "m_1 \\, m_2 = -1",
        symbols: [
          { symbol: "m_1, m_2", meaning: "the two tangent slopes at the point of intersection" },
        ],
      },
      authoredExample: {
        prompt:
          "If \\(y^2 = 4x\\) and \\(2x^2 + ky^2 = 6\\) intersect at right angles, find \\(k\\).",
        steps: [
          "For \\(y^2 = 4x\\): \\(2y\\dfrac{dy}{dx} = 4\\Rightarrow m_1 = \\dfrac{2}{y}\\).",
          "For \\(2x^2 + ky^2 = 6\\): \\(4x + 2ky\\dfrac{dy}{dx} = 0\\Rightarrow m_2 = -\\dfrac{2x}{ky}\\).",
          "Orthogonality: \\(m_1 m_2 = -1\\Rightarrow \\dfrac{2}{y}\\cdot\\left(-\\dfrac{2x}{ky}\\right) = -1\\Rightarrow \\dfrac{4x}{ky^2} = 1\\).",
          "Substitute \\(y^2 = 4x\\): \\(\\dfrac{4x}{k(4x)} = 1\\Rightarrow \\dfrac{1}{k} = 1\\Rightarrow k = 1\\).",
        ],
        answer: "\\(k = 1\\)",
      },
      selfCheckExample: {
        prompt:
          "Show that the curves \\(xy = 2\\) and \\(x^2 - y^2 = 3\\) cut each other at right angles wherever they meet.",
        steps: [
          "For \\(xy = 2\\): differentiate implicitly, \\(y + x\\dfrac{dy}{dx} = 0\\Rightarrow m_1 = -\\dfrac{y}{x}\\).",
          "For \\(x^2 - y^2 = 3\\): \\(2x - 2y\\dfrac{dy}{dx} = 0\\Rightarrow m_2 = \\dfrac{x}{y}\\).",
          "Product: \\(m_1 m_2 = \\left(-\\dfrac{y}{x}\\right)\\left(\\dfrac{x}{y}\\right) = -1\\) — and the coordinates cancel, so this holds at every intersection point.",
        ],
        answer: "\\(m_1 m_2 = -1\\) identically, so the two curves are orthogonal.",
      },
      practiceSet: [
        { prompt: "Orthogonality condition on two slopes?", answer: "\\(m_1 m_2 = -1\\)" },
        { prompt: "\\(m_1 = 2\\): what \\(m_2\\) makes them orthogonal?", answer: "\\(-\\tfrac12\\)", method: "\\(2m_2 = -1\\)" },
        { prompt: "Is \\(\\theta = 90^\\circ\\) the same as \\(1 + m_1 m_2 = 0\\)?", answer: "Yes", method: "\\(\\tan 90^\\circ\\) undefined" },
        { prompt: "For \\(y^2 = 6x\\), the slope in terms of \\(y\\).", answer: "\\(\\tfrac{3}{y}\\)", method: "\\(2y\\,y' = 6\\)" },
      ],
      pyqExampleId: "926d18f3-0827-400b-b223-91c272524832", // HARD: orthogonal y^2=6x, 9x^2+by^2=16, find b
      traps: [
        {
          title: "Orthogonal means slope PRODUCT \\(= -1\\), not slope sum \\(= 0\\)",
          body:
            "Perpendicular tangents satisfy \\(m_1 m_2 = -1\\) (negative reciprocals). Writing \\(m_1 + m_2 = 0\\) or \\(m_1 = m_2\\) is a different condition and gives the wrong parameter value.",
        },
        {
          title: "Let the intersection relation cancel the coordinates",
          body:
            "After imposing \\(m_1 m_2 = -1\\) you are left with \\(x, y\\) in the equation. Don't panic — substitute the simpler curve relation (\\(y^2 = 6x\\)) and the coordinates cancel, leaving a clean equation in the parameter alone.",
        },
      ],
    },

    // 5 — bridge: shortest distance line-to-curve via parallel tangent (anchored)
    {
      kind: "formula" as const,
      slug: "cetaod-shortest-distance-parallel-tangent",
      name: "Shortest Distance From a Line to a Curve (Parallel-Tangent Trick)",
      intuition:
        "The nearest point of a curve to a straight line is where the curve's tangent runs PARALLEL to that line — a small push either way only increases the gap. So set the curve's slope equal to the line's slope, find that point, then use the point-to-line distance formula.",
      definition:
        "To find the shortest distance between a line \\(ax + by + c = 0\\) (slope \\(m_L = -a/b\\)) and a curve:\n" +
        "- **Step 1.** Set the curve's tangent slope equal to the line's slope: \\(\\dfrac{dy}{dx} = m_L\\). Solve for the nearest point \\(P\\) on the curve.\n" +
        "- **Step 2.** Compute the perpendicular distance from \\(P(x_0, y_0)\\) to the line:\n" +
        "\\[d = \\dfrac{|ax_0 + by_0 + c|}{\\sqrt{a^2 + b^2}}.\\]\n" +
        "This uses the slope idea from the whole subtopic — the tangent's DIRECTION — plus the standard distance formula.",
      formula: {
        label: "Point-to-line distance (used at the parallel-tangent point)",
        latex: "d = \\dfrac{|a x_0 + b y_0 + c|}{\\sqrt{a^2 + b^2}}",
        symbols: [
          { symbol: "(x_0, y_0)", meaning: "the point on the curve where its tangent is parallel to the line" },
          { symbol: "a, b, c", meaning: "coefficients of the line written as \\(ax + by + c = 0\\)" },
        ],
      },
      authoredExample: {
        prompt:
          "Find the shortest distance between the line \\(y - x = 1\\) and the curve \\(x = y^2\\).",
        steps: [
          "Line \\(x - y + 1 = 0\\) has slope \\(1\\).",
          "Curve slope: \\(x = y^2\\Rightarrow \\dfrac{dx}{dy} = 2y\\Rightarrow \\dfrac{dy}{dx} = \\dfrac{1}{2y}\\). Set equal to \\(1\\): \\(\\dfrac{1}{2y} = 1\\Rightarrow y = \\dfrac{1}{2}\\), \\(x = \\dfrac{1}{4}\\).",
          "Distance from \\(\\left(\\tfrac14, \\tfrac12\\right)\\) to \\(x - y + 1 = 0\\): \\(d = \\dfrac{\\left|\\tfrac14 - \\tfrac12 + 1\\right|}{\\sqrt{1^2 + (-1)^2}} = \\dfrac{3/4}{\\sqrt2}\\).",
          "Rationalise: \\(d = \\dfrac{3}{4\\sqrt2} = \\dfrac{3\\sqrt2}{8}\\).",
        ],
        answer: "\\(d = \\dfrac{3\\sqrt2}{8}\\)",
      },
      selfCheckExample: {
        prompt:
          "Find the shortest distance from the line \\(y = x - 2\\) to the parabola \\(y = x^2\\).",
        steps: [
          "Line \\(x - y - 2 = 0\\), slope \\(1\\).",
          "Curve slope: \\(y' = 2x = 1\\Rightarrow x = \\tfrac12\\), \\(y = \\tfrac14\\). Nearest point \\(\\left(\\tfrac12, \\tfrac14\\right)\\).",
          "\\(d = \\dfrac{\\left|\\tfrac12 - \\tfrac14 - 2\\right|}{\\sqrt2} = \\dfrac{7/4}{\\sqrt2} = \\dfrac{7\\sqrt2}{8}\\).",
        ],
        answer: "\\(d = \\dfrac{7\\sqrt2}{8}\\)",
      },
      practiceSet: [
        { prompt: "Where on a curve is it nearest to a line?", answer: "where the tangent is parallel to the line", method: "\\(\\dfrac{dy}{dx} = m_{\\text{line}}\\)" },
        { prompt: "Distance from \\((0,0)\\) to \\(x - y + 1 = 0\\).", answer: "\\(\\dfrac{1}{\\sqrt2}\\)", method: "\\(\\dfrac{|1|}{\\sqrt2}\\)" },
        { prompt: "On \\(x = y^2\\), where does the tangent have slope \\(1\\)?", answer: "\\(\\left(\\tfrac14, \\tfrac12\\right)\\)", method: "\\(\\dfrac{1}{2y} = 1\\)" },
        { prompt: "Rationalise \\(\\dfrac{3}{4\\sqrt2}\\).", answer: "\\(\\dfrac{3\\sqrt2}{8}\\)", method: "multiply by \\(\\sqrt2/\\sqrt2\\)" },
      ],
      pyqExampleId: "e7c7e5aa-b578-4a46-93db-12e6abc5bba9", // shortest distance line y-x=1 and curve x=y^2
      traps: [
        {
          title: "Nearest point is the PARALLEL-tangent point, not the closest-looking one",
          body:
            "The minimum gap happens exactly where the curve's tangent is parallel to the line. Guessing a point or plugging in the vertex usually overshoots — set \\(\\dfrac{dy}{dx}\\) equal to the line's slope and solve.",
        },
        {
          title: "Rationalise before matching the options",
          body:
            "\\(\\dfrac{3/4}{\\sqrt2} = \\dfrac{3}{4\\sqrt2} = \\dfrac{3\\sqrt2}{8}\\). MHT-CET options are usually written with a rational denominator, so rationalise or you may not spot your answer in the list.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Differentiation — Implicit & Special Forms",
      href: "/notes/mht-cet-maths/differentiation/implicit-special",
    },
  ],
};
