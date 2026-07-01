import type { SubtopicNote } from "@/app/notes/_types";

export const TANGENTS_NORMALS_NOTE: SubtopicNote = {
  subtopicName: "Tangents, Normals, and the Slope of a Curve",
  title: "Tangents, Normals, and the Slope of a Curve",
  oneLineDefinition:
    "The derivative read geometrically: the slope of the tangent at a point, the perpendicular normal, the special cases where a tangent is horizontal or vertical, and the recurring MHT-CET puzzles that solve for a point or for a curve's constants from tangency conditions.",
  whyItMatters:
    "This subtopic is the whole chapter's workhorse: 35 PYQs sit here, and it is HARD-heavy — roughly a third are HARD, the rest MODERATE, with only a few EASY. The paper reuses a small set of shapes relentlessly: 'normal parallel to a line ⇒ find the point' (the y = x log x family recurs almost every year), parametric tangent/normal, curve-fitting from touch/gradient conditions, and one-line length/intercept/fixed-point facts. " +
    "Master the negative-reciprocal normal slope, the dx/dy = 0 test for a vertical tangent, and the parametric dy/dx = (dy/dθ)/(dx/dθ), and most of these become reliable marks.",
  concepts: [
    // 1 — FOUNDATION: slope of a curve, tangent & normal slope
    {
      kind: "formula" as const,
      slug: "cetaod-slope-of-curve",
      name: "Slope of a Curve: Tangent Slope and Normal Slope",
      visualizationSlug: "diff-tangent-slope",
      intuition:
        "At a point on a curve the derivative dy/dx IS the slope of the tangent line there. The normal is the line perpendicular to the tangent at that same point, so its slope is the negative reciprocal of the tangent slope. Two numbers unlock everything in this subtopic — the slope, and its negative reciprocal.",
      definition:
        "For \\(y = f(x)\\) at the point \\((x_1, y_1)\\):\n" +
        "- **Tangent slope:** \\(m = \\left.\\dfrac{dy}{dx}\\right|_{(x_1, y_1)} = f'(x_1)\\).\n" +
        "- **Normal slope:** \\(-\\dfrac{1}{m}\\) — the **negative reciprocal** (perpendicular lines have slopes multiplying to \\(-1\\)).\n" +
        "- The tangent makes angle \\(\\theta = \\tan^{-1} m\\) with the positive X-axis.\n" +
        "- If a tangent (or normal) is **parallel** to a given line, it has the **same** slope as that line; if **perpendicular** to a line of slope \\(s\\), its slope is \\(-1/s\\).",
      formula: {
        label: "Tangent slope and normal slope",
        latex:
          "m_{\\text{tangent}} = \\left.\\dfrac{dy}{dx}\\right|_{(x_1,y_1)} \\qquad m_{\\text{normal}} = -\\dfrac{1}{m_{\\text{tangent}}}",
        symbols: [
          { symbol: "m", meaning: "slope of the tangent = value of the derivative at the point" },
          { symbol: "-1/m", meaning: "slope of the normal — negative reciprocal of the tangent slope" },
        ],
      },
      authoredExample: {
        prompt: "Find the slope of the tangent and of the normal to \\(y = x^3 - 3x\\) at \\(x = 2\\).",
        steps: [
          "Slope function: \\(\\dfrac{dy}{dx} = 3x^2 - 3\\).",
          "At \\(x = 2\\): tangent slope \\(m = 3(4) - 3 = 9\\).",
          "Normal slope \\(= -\\dfrac{1}{9}\\) (negative reciprocal).",
        ],
        answer: "Tangent slope \\(= 9\\); normal slope \\(= -\\dfrac{1}{9}\\).",
      },
      selfCheckExample: {
        prompt:
          "A curve \\(y = f(x)\\) has \\(f'(3) = 2\\) at the point \\((3, 5)\\). What angle does the tangent make with the X-axis, and what is the normal slope?",
        steps: [
          "Tangent slope \\(= f'(3) = 2\\), so the angle is \\(\\tan^{-1} 2\\).",
          "Normal slope \\(= -\\dfrac{1}{2}\\).",
        ],
        answer: "Angle \\(= \\tan^{-1} 2\\); normal slope \\(= -\\dfrac{1}{2}\\).",
      },
      practiceSet: [
        { prompt: "Tangent slope to \\(y = x^2\\) at \\(x = 3\\).", answer: "\\(6\\)", method: "\\(y' = 2x\\)" },
        { prompt: "If the tangent slope is \\(4\\), what is the normal slope?", answer: "\\(-\\dfrac{1}{4}\\)", method: "negative reciprocal" },
        { prompt: "Normal is parallel to a line of slope \\(1\\). What is the tangent slope?", answer: "\\(-1\\)", method: "tangent slope \\(= -1/(\\text{normal slope})\\)" },
        { prompt: "Tangent slope to \\(y = \\log x\\) at \\(x = e\\).", answer: "\\(\\dfrac{1}{e}\\)", method: "\\(y' = 1/x\\)" },
      ],
      pyqExampleId: "ea183577-05e6-4df2-b432-c12b056d7a16", // normal makes 3π/4 with X-axis → f'(3)
      traps: [
        {
          title: "Normal slope is the NEGATIVE reciprocal, not the reciprocal or the negative",
          body:
            "If the tangent slope is \\(m\\), the normal slope is \\(-\\dfrac{1}{m}\\) — both the minus sign AND the reciprocal. Writing \\(1/m\\) or \\(-m\\) gives a wrong normal line. When the normal itself is given (e.g. its angle with the X-axis), remember the tangent slope is \\(-1/(\\text{normal slope})\\): a normal at \\(\\tfrac{3\\pi}{4}\\) has slope \\(-1\\), so \\(f' = -1/(-1) = 1\\), not \\(-1\\).",
        },
        {
          title: "\"Parallel to a line\" copies the slope; \"perpendicular\" flips it",
          body:
            "A tangent/normal parallel to a line has that line's slope. Perpendicular means negative reciprocal. Read whether it is the TANGENT or the NORMAL that is parallel — that decides which of \\(m\\) or \\(-1/m\\) equals the line's slope.",
        },
      ],
    },

    // 2 — CORE: tangent & normal line equations at a point
    {
      kind: "formula" as const,
      slug: "cetaod-tangent-normal-line",
      name: "Equations of the Tangent and Normal Lines",
      intuition:
        "Once you know a point on the curve and the slope there, both lines follow from point-slope form. The tangent uses the slope m; the normal uses the negative reciprocal -1/m. Everything reduces to 'find the point, find the slope, plug in.'",
      definition:
        "At \\((x_1, y_1)\\) on \\(y = f(x)\\) with tangent slope \\(m = f'(x_1)\\):\n" +
        "- **Tangent line:** \\(y - y_1 = m(x - x_1)\\).\n" +
        "- **Normal line:** \\(y - y_1 = -\\dfrac{1}{m}(x - x_1)\\).\n" +
        "For an **implicit** curve, differentiate implicitly to get \\(\\dfrac{dy}{dx}\\), then evaluate at the point. Always simplify the final line to the option's form (usually \\(Ax + By + C = 0\\)).",
      formula: {
        label: "Tangent and normal at a point",
        latex:
          "\\text{tangent: } y - y_1 = m(x - x_1) \\qquad \\text{normal: } y - y_1 = -\\dfrac{1}{m}(x - x_1)",
      },
      authoredExample: {
        prompt: "Find the equation of the tangent to \\(y = x^2 + 1\\) at \\((1, 2)\\).",
        steps: [
          "\\(\\dfrac{dy}{dx} = 2x\\); at \\(x = 1\\), \\(m = 2\\).",
          "Point-slope: \\(y - 2 = 2(x - 1)\\).",
          "Simplify: \\(y = 2x\\), i.e. \\(2x - y = 0\\).",
        ],
        answer: "\\(2x - y = 0\\)",
      },
      selfCheckExample: {
        prompt: "Find the equation of the normal to \\(y = x^2\\) at \\((2, 4)\\).",
        steps: [
          "\\(\\dfrac{dy}{dx} = 2x\\); at \\(x = 2\\), tangent slope \\(m = 4\\).",
          "Normal slope \\(= -\\dfrac{1}{4}\\).",
          "Normal: \\(y - 4 = -\\dfrac{1}{4}(x - 2) \\Rightarrow x + 4y - 18 = 0\\).",
        ],
        answer: "\\(x + 4y - 18 = 0\\)",
      },
      practiceSet: [
        { prompt: "Tangent to \\(y = x^2\\) at \\((1,1)\\).", answer: "\\(2x - y - 1 = 0\\)", method: "\\(m = 2\\)" },
        { prompt: "Normal to \\(y = x^3\\) at \\((1,1)\\).", answer: "\\(x + 3y - 4 = 0\\)", method: "\\(m = 3\\), normal slope \\(-1/3\\)" },
        { prompt: "Tangent to \\(y = \\log x\\) at \\((1,0)\\).", answer: "\\(y = x - 1\\)", method: "\\(m = 1\\)" },
        { prompt: "Tangent to \\(xy = 1\\) at \\((1,1)\\) (implicit).", answer: "\\(x + y = 2\\)", method: "\\(y + xy' = 0 \\Rightarrow m = -1\\)" },
      ],
      pyqExampleId: "76451af8-4c85-41f3-9877-fd683785dd17", // normal at Y-axis intersection of y(x-2)(x-3)=x+6
      traps: [
        {
          title: "Use the tangent slope for the tangent, the negative reciprocal for the normal",
          body:
            "The single most common slip: writing the normal line with the tangent slope. If the question asks for the NORMAL, substitute \\(-1/m\\) into point-slope, not \\(m\\).",
        },
        {
          title: "Find the point first, then the slope AT that point",
          body:
            "Many stems only describe the point ('where the curve crosses the Y-axis', 'where ordinate = abscissa'). Pin down \\((x_1, y_1)\\) exactly before evaluating the derivative — the slope must be computed at that point, not at a generic \\(x\\).",
        },
      ],
    },

    // 3 — CORE: tangent parallel to axes
    {
      kind: "formula" as const,
      slug: "cetaod-tangent-parallel-to-axes",
      name: "Tangent Parallel to the X-axis or Y-axis",
      intuition:
        "A horizontal tangent has zero slope, so dy/dx = 0. A vertical tangent has infinite slope — cleaner to say the RECIPROCAL slope is zero, dx/dy = 0. So for a vertical tangent, differentiate with respect to y and set dx/dy = 0 instead of fighting an infinite dy/dx.",
      definition:
        "- **Tangent parallel to the X-axis (horizontal):** \\(\\dfrac{dy}{dx} = 0\\). Solve for the point(s).\n" +
        "- **Tangent parallel to the Y-axis (vertical):** \\(\\dfrac{dy}{dx}\\) is undefined; equivalently \\(\\dfrac{dx}{dy} = 0\\). For an implicit curve it is usually easiest to differentiate w.r.t. \\(y\\) and set \\(\\dfrac{dx}{dy} = 0\\).\n" +
        "After finding where the slope condition holds, substitute back into the curve to get the actual point.",
      formula: {
        label: "Horizontal vs vertical tangent",
        latex: "\\text{horizontal: } \\dfrac{dy}{dx} = 0 \\qquad \\text{vertical: } \\dfrac{dx}{dy} = 0",
      },
      authoredExample: {
        prompt: "Find the point on \\(y = x^2 - 4x + 3\\) where the tangent is parallel to the X-axis.",
        steps: [
          "\\(\\dfrac{dy}{dx} = 2x - 4\\).",
          "Set \\(= 0\\): \\(2x - 4 = 0 \\Rightarrow x = 2\\).",
          "Then \\(y = 4 - 8 + 3 = -1\\).",
        ],
        answer: "\\((2, -1)\\)",
      },
      selfCheckExample: {
        prompt: "Find the point on \\(x = y^2 - 2y\\) where the tangent is parallel to the Y-axis.",
        steps: [
          "Vertical tangent \\(\\Rightarrow \\dfrac{dx}{dy} = 0\\).",
          "\\(\\dfrac{dx}{dy} = 2y - 2 = 0 \\Rightarrow y = 1\\).",
          "Then \\(x = 1 - 2 = -1\\).",
        ],
        answer: "\\((-1, 1)\\)",
      },
      practiceSet: [
        { prompt: "Where is the tangent to \\(y = x^2 - 6x\\) horizontal?", answer: "\\((3, -9)\\)", method: "\\(2x - 6 = 0\\)" },
        { prompt: "Condition for a tangent parallel to the Y-axis.", answer: "\\(\\dfrac{dx}{dy} = 0\\)", method: "reciprocal slope zero" },
        { prompt: "Abscissa where \\(y = e^{x} + e^{-x}\\) has a horizontal tangent.", answer: "\\(x = 0\\)", method: "\\(e^x - e^{-x} = 0\\)" },
        { prompt: "Where is the tangent to \\(y = \\sin x\\) horizontal on \\((0, \\pi)\\)?", answer: "\\(x = \\dfrac{\\pi}{2}\\)", method: "\\(\\cos x = 0\\)" },
      ],
      pyqExampleId: "a14ef621-9fe9-49bd-8c41-1e92c04fec0e", // 4y²-4y+2x-1=0 tangent parallel to Y-axis
      traps: [
        {
          title: "Vertical tangent means dx/dy = 0, not dy/dx = 0",
          body:
            "For a tangent parallel to the Y-axis, the slope \\(\\dfrac{dy}{dx}\\) blows up. Instead of setting the (infinite) \\(dy/dx = 0\\), set the reciprocal \\(\\dfrac{dx}{dy} = 0\\). On \\(4y^2 - 4y + 2x - 1 = 0\\), differentiating w.r.t. \\(y\\) gives \\(\\dfrac{dx}{dy} = 2 - 4y = 0 \\Rightarrow y = \\tfrac12\\) — the clean route.",
        },
        {
          title: "Don't stop at the slope condition — substitute back for the point",
          body:
            "Solving \\(dy/dx = 0\\) gives you the x-value (or y-value); the answer is the POINT. Plug back into the curve to get the missing coordinate before matching options.",
        },
      ],
    },

    // 4 — CORE: tangent/normal at an axis-crossing or special point
    {
      kind: "formula" as const,
      slug: "cetaod-tangent-at-special-point",
      name: "Tangent or Normal at an Axis-Crossing or Special Point",
      intuition:
        "Many stems don't hand you the point — they describe it: 'where the curve crosses the Y-axis' (set x = 0), 'where it crosses the X-axis' (set y = 0), or 'where ordinate = abscissa' (set y = x). Locate the point from that description first, then it's a routine tangent/normal line.",
      definition:
        "Translate the description into an equation for the point, then proceed as a standard tangent/normal:\n" +
        "- **Crosses the Y-axis:** put \\(x = 0\\), solve for \\(y\\).\n" +
        "- **Crosses the X-axis:** put \\(y = 0\\), solve for \\(x\\).\n" +
        "- **Ordinate = abscissa:** put \\(y = x\\) into the curve.\n" +
        "Then compute the slope at that point and write the line \\(y - y_1 = m(x - x_1)\\) (tangent) or with slope \\(-1/m\\) (normal).",
      formula: {
        label: "Locate the special point, then the line",
        latex:
          "\\text{Y-axis: } x = 0 \\qquad \\text{X-axis: } y = 0 \\qquad \\text{ordinate = abscissa: } y = x",
      },
      authoredExample: {
        prompt: "Find the tangent to \\(y = e^{2x}\\) at the point where it crosses the Y-axis.",
        steps: [
          "Crosses the Y-axis at \\(x = 0\\): \\(y = e^0 = 1\\), so the point is \\((0, 1)\\).",
          "\\(\\dfrac{dy}{dx} = 2e^{2x}\\); at \\(x = 0\\), \\(m = 2\\).",
          "Tangent: \\(y - 1 = 2(x - 0) \\Rightarrow 2x - y + 1 = 0\\).",
        ],
        answer: "\\(2x - y + 1 = 0\\)",
      },
      selfCheckExample: {
        prompt: "Find the tangent to \\(y = 1 - e^{x/3}\\) at its intersection with the Y-axis.",
        steps: [
          "At \\(x = 0\\): \\(y = 1 - e^0 = 0\\), point \\((0, 0)\\).",
          "\\(\\dfrac{dy}{dx} = -\\dfrac{1}{3}e^{x/3}\\); at \\(x = 0\\), \\(m = -\\dfrac{1}{3}\\).",
          "Tangent: \\(y = -\\dfrac{1}{3}x \\Rightarrow x + 3y = 0\\).",
        ],
        answer: "\\(x + 3y = 0\\)",
      },
      practiceSet: [
        { prompt: "Point where \\(y = 2 - x\\) with \\((1+x^2)y = 2 - x\\) crosses the X-axis.", answer: "\\((2, 0)\\)", method: "set \\(y = 0\\)" },
        { prompt: "Y-intercept point of \\(y = be^{-x/a}\\).", answer: "\\((0, b)\\)", method: "put \\(x = 0\\)" },
        { prompt: "On \\(y = \\sqrt{9 - 2x^2}\\), the point with ordinate = abscissa.", answer: "\\((\\sqrt{3}, \\sqrt{3})\\)", method: "\\(x^2 = 9 - 2x^2\\)" },
        { prompt: "Tangent slope of \\(y = be^{-x/a}\\) at \\((0, b)\\).", answer: "\\(-\\dfrac{b}{a}\\)", method: "\\(y' = -\\tfrac{b}{a}e^{-x/a}\\)" },
      ],
      pyqExampleId: "c9b9ce85-1b21-4585-88f4-3e9a762eb464", // tangent to y=be^{-x/a} at Y-axis
      traps: [
        {
          title: "Read the axis correctly: Y-axis ⇒ x = 0, X-axis ⇒ y = 0",
          body:
            "'Crosses the Y-axis' means the x-coordinate is \\(0\\) (set \\(x = 0\\)); 'crosses the X-axis' means \\(y = 0\\). Swapping these puts you at the wrong point and every later step is wrong.",
        },
        {
          title: "'Ordinate = abscissa' means y = x, not a numerical guess",
          body:
            "Substitute \\(y = x\\) into the curve and solve — e.g. on \\(y = \\sqrt{9 - 2x^2}\\), \\(x = \\sqrt{9 - 2x^2} \\Rightarrow x = \\sqrt{3}\\). Then differentiate at that point.",
        },
      ],
    },

    // 5 — ADVANCED: parametric curves + parametric 2nd derivative
    {
      kind: "formula" as const,
      slug: "cetaod-parametric-tangent-normal",
      name: "Tangents and Normals to Parametric Curves",
      intuition:
        "When x and y are each given in terms of a parameter t (or θ), you get the slope by dividing the two parameter-derivatives: dy/dx = (dy/dt)/(dx/dt). Evaluate that at the given parameter for the slope, get the point by plugging the parameter into x(t) and y(t), then write the line. The second derivative needs an extra chain-rule step.",
      definition:
        "For \\(x = x(t)\\), \\(y = y(t)\\):\n" +
        "- **First derivative (slope):** \\(\\dfrac{dy}{dx} = \\dfrac{dy/dt}{dx/dt}\\).\n" +
        "- **Second derivative:** \\(\\dfrac{d^2y}{dx^2} = \\dfrac{\\frac{d}{dt}\\!\\left(\\frac{dy}{dx}\\right)}{dx/dt}\\) — differentiate the slope w.r.t. \\(t\\), then divide by \\(dx/dt\\) again. **Do not** differentiate \\(dy/dx\\) w.r.t. \\(t\\) and stop.\n" +
        "Get the point by substituting the parameter into \\(x(t), y(t)\\), then form the tangent/normal line.",
      formula: {
        label: "Parametric slope and second derivative",
        latex:
          "\\dfrac{dy}{dx} = \\dfrac{dy/dt}{dx/dt} \\qquad \\dfrac{d^2y}{dx^2} = \\dfrac{1}{dx/dt}\\cdot\\dfrac{d}{dt}\\!\\left(\\dfrac{dy}{dx}\\right)",
      },
      authoredExample: {
        prompt:
          "Find the equation of the tangent to \\(x = a\\cos^3\\theta,\\ y = a\\sin^3\\theta\\) at \\(\\theta = \\dfrac{\\pi}{4}\\).",
        steps: [
          "\\(\\dfrac{dx}{d\\theta} = -3a\\cos^2\\theta\\sin\\theta\\), \\(\\dfrac{dy}{d\\theta} = 3a\\sin^2\\theta\\cos\\theta\\).",
          "\\(\\dfrac{dy}{dx} = \\dfrac{3a\\sin^2\\theta\\cos\\theta}{-3a\\cos^2\\theta\\sin\\theta} = -\\tan\\theta\\); at \\(\\theta = \\tfrac{\\pi}{4}\\), slope \\(= -1\\).",
          "Point: \\(\\left(a\\cos^3\\tfrac{\\pi}{4}, a\\sin^3\\tfrac{\\pi}{4}\\right) = \\left(\\tfrac{a}{2\\sqrt2}, \\tfrac{a}{2\\sqrt2}\\right)\\).",
          "Tangent: \\(y - \\tfrac{a}{2\\sqrt2} = -1\\left(x - \\tfrac{a}{2\\sqrt2}\\right) \\Rightarrow x + y = \\tfrac{a}{\\sqrt2}\\).",
        ],
        answer: "\\(x + y = \\dfrac{a}{\\sqrt2}\\)",
      },
      selfCheckExample: {
        prompt:
          "If \\(x = 3\\tan t\\) and \\(y = 3\\sec t\\), find \\(\\dfrac{d^2y}{dx^2}\\) at \\(t = \\dfrac{\\pi}{4}\\).",
        steps: [
          "\\(\\dfrac{dx}{dt} = 3\\sec^2 t\\), \\(\\dfrac{dy}{dt} = 3\\sec t\\tan t\\), so \\(\\dfrac{dy}{dx} = \\dfrac{\\sec t\\tan t}{\\sec^2 t} = \\sin t\\).",
          "\\(\\dfrac{d^2y}{dx^2} = \\dfrac{1}{dx/dt}\\dfrac{d}{dt}(\\sin t) = \\dfrac{\\cos t}{3\\sec^2 t} = \\dfrac{\\cos^3 t}{3}\\).",
          "At \\(t = \\tfrac{\\pi}{4}\\): \\(\\dfrac{(1/\\sqrt2)^3}{3} = \\dfrac{1}{6\\sqrt2}\\).",
        ],
        answer: "\\(\\dfrac{1}{6\\sqrt2}\\)",
      },
      practiceSet: [
        { prompt: "Slope of \\(x = t^2,\\ y = t^3\\) at \\(t = 2\\).", answer: "\\(3\\)", method: "\\(\\dfrac{3t^2}{2t} = \\dfrac{3t}{2}\\)" },
        { prompt: "Slope of \\(x = \\cos\\theta,\\ y = \\sin\\theta\\) at \\(\\theta = \\tfrac{\\pi}{4}\\).", answer: "\\(-1\\)", method: "\\(\\dfrac{\\cos\\theta}{-\\sin\\theta} = -\\cot\\theta\\)" },
        { prompt: "For \\(x = t + \\sin t,\\ y = 1 + \\cos t\\), \\(dy/dx = ?\\)", answer: "\\(-\\dfrac{\\sin t}{1 + \\cos t}\\)", method: "\\(\\dfrac{-\\sin t}{1 + \\cos t}\\)" },
        { prompt: "First step to get \\(d^2y/dx^2\\) parametrically.", answer: "Differentiate \\(dy/dx\\) w.r.t. \\(t\\), then divide by \\(dx/dt\\).", method: "extra \\(1/(dx/dt)\\) factor" },
      ],
      pyqExampleId: "d699b8c3-7d41-4358-a139-e814eb5d7878", // tangent to x=a cos³θ, y=a sin³θ at π/4
      traps: [
        {
          title: "The parametric second derivative has an extra 1/(dx/dt) factor",
          body:
            "\\(\\dfrac{d^2y}{dx^2} \\neq \\dfrac{d}{dt}\\!\\left(\\dfrac{dy}{dx}\\right)\\). You must divide that by \\(\\dfrac{dx}{dt}\\) again: \\(\\dfrac{d^2y}{dx^2} = \\dfrac{1}{dx/dt}\\dfrac{d}{dt}\\!\\left(\\dfrac{dy}{dx}\\right)\\). Forgetting this factor is the classic error on \\(x = 3\\tan t,\\ y = 3\\sec t\\) type problems.",
        },
        {
          title: "Get the point from the parameter, not from x-alone",
          body:
            "Substitute the given \\(t\\) (or \\(\\theta\\)) into BOTH \\(x(t)\\) and \\(y(t)\\) for the point of contact. Then the tangent/normal line uses that point with the parametric slope.",
        },
      ],
    },

    // 6 — ADVANCED: normal parallel/perpendicular to a given line ⇒ solve for the point
    {
      kind: "formula" as const,
      slug: "cetaod-normal-parallel-to-line",
      name: "Normal Parallel (or Perpendicular) to a Given Line: Solve for the Point",
      intuition:
        "Here the point of contact is unknown. A parallel/perpendicular condition fixes the slope, and setting the curve's slope equal to that value gives an equation for the point. The signature MHT-CET version is y = x log x: 'normal parallel to a line' fixes the normal slope, hence the tangent slope, hence x.",
      definition:
        "When the NORMAL is parallel to a line of slope \\(s\\): normal slope \\(= s\\), so the tangent slope \\(= -\\dfrac{1}{s}\\). Set \\(\\dfrac{dy}{dx} = -\\dfrac{1}{s}\\) and solve for the point, then write the normal line.\n" +
        "- If the normal is **perpendicular** to a line of slope \\(s\\), the normal slope is \\(-1/s\\) and the tangent slope is \\(s\\).\n" +
        "- **The recurring case** \\(y = x\\log x\\): \\(\\dfrac{dy}{dx} = 1 + \\log x\\). A normal parallel to a slope-1 line needs tangent slope \\(-1\\), so \\(1 + \\log x = -1 \\Rightarrow x = e^{-2}\\), \\(y = -2e^{-2}\\).",
      formula: {
        label: "Normal parallel to a line ⇒ tangent slope condition",
        latex:
          "\\text{normal} \\parallel \\text{line of slope } s \\;\\Rightarrow\\; \\dfrac{dy}{dx} = -\\dfrac{1}{s}",
      },
      authoredExample: {
        prompt: "Find the point on \\(y = x\\log x\\) at which the normal is parallel to the line \\(2x - 2y = 3\\).",
        steps: [
          "Line slope: \\(2x - 2y = 3 \\Rightarrow y = x - \\tfrac32\\), slope \\(= 1\\). Normal is parallel, so normal slope \\(= 1\\).",
          "Tangent slope \\(= -\\dfrac{1}{1} = -1\\), i.e. \\(\\dfrac{dy}{dx} = 1 + \\log x = -1\\).",
          "\\(\\log x = -2 \\Rightarrow x = e^{-2}\\); \\(y = e^{-2}\\log(e^{-2}) = -2e^{-2}\\).",
        ],
        answer: "\\((e^{-2}, -2e^{-2})\\)",
      },
      selfCheckExample: {
        prompt: "Find the equation of the normal to \\(3x^2 - y^2 = 8\\) parallel to the line \\(x + 3y = 10\\).",
        steps: [
          "Line slope \\(= -\\dfrac{1}{3}\\), so the normal slope \\(= -\\dfrac{1}{3}\\).",
          "Implicit: \\(6x - 2y\\,y' = 0 \\Rightarrow \\dfrac{dy}{dx} = \\dfrac{3x}{y}\\); normal slope \\(= -\\dfrac{y}{3x} = -\\dfrac{1}{3} \\Rightarrow y = x\\).",
          "Substitute: \\(3x^2 - x^2 = 8 \\Rightarrow x = \\pm 2\\). Take \\((-2, -2)\\): normal \\(y + 2 = -\\tfrac13(x + 2) \\Rightarrow x + 3y + 8 = 0\\).",
        ],
        answer: "\\(x + 3y + 8 = 0\\)",
      },
      practiceSet: [
        { prompt: "Normal to \\(y = x\\log x\\) parallel to \\(2x - 2y + 3 = 0\\).", answer: "\\(x - y = 3e^{-2}\\)", method: "tangent slope \\(-1\\), \\(x = e^{-2}\\)" },
        { prompt: "If a normal is parallel to a line of slope \\(1\\), the tangent slope is?", answer: "\\(-1\\)", method: "\\(-1/(\\text{normal slope})\\)" },
        { prompt: "On \\(y = x\\log x\\), the x where the normal has slope \\(1\\).", answer: "\\(x = e^{-2}\\)", method: "\\(1 + \\log x = -1\\)" },
        { prompt: "Slope of a normal parallel to \\(x + 3y = 10\\).", answer: "\\(-\\dfrac{1}{3}\\)", method: "same slope as the line" },
      ],
      pyqExampleId: "71b22e7c-6602-4f70-b8fe-78f4b1197d1f", // normal to y=x log x parallel to 2x-2y+3=0
      traps: [
        {
          title: "'Normal parallel to the line' means the NORMAL slope equals the line slope",
          body:
            "It's the normal, not the tangent, that matches the given line's slope. So set the tangent slope to the NEGATIVE RECIPROCAL of the line slope. On \\(y = x\\log x\\) with line slope \\(1\\): tangent slope \\(= -1\\), giving \\(1 + \\log x = -1\\). Matching the tangent slope to \\(1\\) instead is the standard wrong turn.",
        },
        {
          title: "For a tangent PARALLEL to a line, match the tangent slope directly",
          body:
            "Don't blanket-apply the negative reciprocal. If the TANGENT is parallel to the line, set \\(\\dfrac{dy}{dx} = \\) line slope. The reciprocal flip is only for a NORMAL-parallel (or tangent-perpendicular) condition. Also watch \\(y = \\cos(x + y)\\): differentiate implicitly to \\(\\dfrac{dy}{dx} = \\dfrac{-\\sin(x+y)}{1 + \\sin(x+y)}\\) before applying the slope condition.",
        },
      ],
    },

    // 7 — ADVANCED: curve-fitting from tangency conditions
    {
      kind: "formula" as const,
      slug: "cetaod-curve-fitting",
      name: "Finding a Curve's Constants from Tangency Conditions",
      intuition:
        "Instead of a fixed curve, you're given a curve with unknown constants (a, b, c) plus conditions like 'touches the X-axis at a point' or 'has gradient 3 at the Y-axis'. Each geometric condition becomes one equation; count them until you can solve for the unknowns. 'Touches an axis' is two conditions in one: the point lies on the curve AND the slope there is zero.",
      definition:
        "Turn every stated condition into an equation in the unknown constants:\n" +
        "- **Passes through \\((x_0, y_0)\\):** substitute into the curve.\n" +
        "- **Gradient \\(= m_0\\) at a point:** \\(y'(x_0) = m_0\\).\n" +
        "- **Touches the X-axis at \\((p, 0)\\):** BOTH \\(y(p) = 0\\) AND \\(y'(p) = 0\\) (a tangent point on the axis is a repeated root — the curve meets and is tangent).\n" +
        "Solve the resulting simultaneous equations for the constants.",
      formula: {
        label: "Touches the X-axis at (p, 0): two conditions",
        latex: "y(p) = 0 \\quad \\text{and} \\quad y'(p) = 0",
      },
      authoredExample: {
        prompt:
          "The curve \\(y = ax^2 - 6x + b\\) passes through \\((0, 4)\\) and has a tangent parallel to the X-axis at \\(x = \\tfrac32\\). Find \\(a\\) and \\(b\\).",
        steps: [
          "Through \\((0, 4)\\): \\(b = 4\\).",
          "Horizontal tangent at \\(x = \\tfrac32\\): \\(y' = 2ax - 6 = 0\\) at \\(x = \\tfrac32\\) gives \\(3a - 6 = 0 \\Rightarrow a = 2\\).",
        ],
        answer: "\\(a = 2,\\ b = 4\\)",
      },
      selfCheckExample: {
        prompt:
          "The curve \\(y = ax^3 + bx^2 + cx + 2\\) touches the X-axis at \\((1, 0)\\) and cuts the Y-axis at a point where its gradient is \\(-3\\). Find \\(a, b, c\\).",
        steps: [
          "Gradient at the Y-axis \\((x = 0)\\): \\(y'(0) = c = -3\\).",
          "Touches X-axis at \\((1, 0)\\): \\(y(1) = 0\\) and \\(y'(1) = 0\\).",
          "\\(y(1) = a + b + c + 2 = 0\\); with \\(c = -3\\), \\(a + b = 1\\).",
          "\\(y'(1) = 3a + 2b + c = 0\\); with \\(c = -3\\), \\(3a + 2b = 3\\).",
          "From \\(a + b = 1\\), \\(b = 1 - a\\); substitute: \\(3a + 2(1 - a) = 3 \\Rightarrow a = 1\\), so \\(b = 0\\).",
        ],
        answer: "\\(a = 1,\\ b = 0,\\ c = -3\\)",
      },
      practiceSet: [
        { prompt: "'Touches the X-axis at \\((p, 0)\\)' gives which two equations?", answer: "\\(y(p) = 0\\) and \\(y'(p) = 0\\)", method: "on the axis + zero slope" },
        { prompt: "'Gradient 3 at the Y-axis' for \\(y = ax^3 + bx^2 + cx + 5\\).", answer: "\\(c = 3\\)", method: "\\(y'(0) = c\\)" },
        { prompt: "\\(y = ax^2 - 6x + b\\) through \\((0,4)\\): value of \\(b\\).", answer: "\\(4\\)", method: "substitute \\(x = 0\\)" },
        { prompt: "For the touch-at-\\((-2,0)\\) cubic, \\(a + b + c = ?\\)", answer: "\\(\\dfrac{7}{4}\\)", method: "\\(-\\tfrac12 - \\tfrac34 + 3\\)" },
      ],
      pyqExampleId: "8159070e-e409-4331-866f-f04f3591c1bb", // cubic touches X-axis at (-2,0), gradient 3 → a,b,c
      traps: [
        {
          title: "'Touches the axis' is TWO conditions, not one",
          body:
            "A curve that touches (is tangent to) the X-axis at \\((p, 0)\\) satisfies both \\(y(p) = 0\\) (point on the axis) and \\(y'(p) = 0\\) (slope zero there). Using only \\(y(p) = 0\\) loses an equation and you can't solve for all the constants.",
        },
        {
          title: "'Gradient at the Y-axis' means evaluate y' at x = 0",
          body:
            "The gradient where the curve cuts the Y-axis is \\(y'(0)\\). For \\(y = ax^3 + bx^2 + cx + 5\\), \\(y'(0) = c\\), so 'gradient 3 at the Y-axis' immediately gives \\(c = 3\\) — the fastest first equation.",
        },
      ],
    },

    // 8 — ADVANCED: tangent line given ⇒ solve curve parameters
    {
      kind: "formula" as const,
      slug: "cetaod-tangent-given-solve-params",
      name: "Tangent Line Given: Solve for the Curve's Parameters",
      intuition:
        "The inverse problem: you're told a specific line is a tangent to a curve with unknowns (like y² = px³ + q) at a stated point. Two facts follow — the point lies on the curve, and the curve's slope there equals the given line's slope. Two equations, two unknowns.",
      definition:
        "If the line \\(y = mx + c\\) is tangent to a curve with parameters at the point \\((x_0, y_0)\\):\n" +
        "- **Point on the curve:** substitute \\((x_0, y_0)\\) into the curve equation.\n" +
        "- **Slope match:** the curve's derivative at \\((x_0, y_0)\\) equals \\(m\\) (the line's slope).\n" +
        "Solve the two equations for the parameters. For an implicit curve, differentiate implicitly to get the slope in terms of the parameters.",
      formula: {
        label: "Given tangent line at a point: two conditions",
        latex: "(x_0, y_0) \\text{ on the curve} \\qquad \\left.\\dfrac{dy}{dx}\\right|_{(x_0,y_0)} = m_{\\text{line}}",
      },
      authoredExample: {
        prompt:
          "If \\(y = 3x - 1\\) is a tangent to \\(y^2 = ax^3 + b\\) at \\((1, 2)\\), find \\(a\\) and \\(b\\).",
        steps: [
          "Slope match: differentiate \\(y^2 = ax^3 + b\\): \\(2y\\,y' = 3ax^2\\), so \\(y' = \\dfrac{3ax^2}{2y}\\). At \\((1, 2)\\): \\(\\dfrac{3a(1)}{4} = 3 \\Rightarrow a = 4\\).",
          "Point on curve: \\(2^2 = a(1^3) + b \\Rightarrow 4 = a + b\\). With \\(a = 4\\): \\(b = 0\\).",
        ],
        answer: "\\(a = 4,\\ b = 0\\)",
      },
      selfCheckExample: {
        prompt:
          "The slope of the tangent to \\(xy + ax + by = 0\\) at \\((1, 1)\\) is 2. Given the point lies on the curve, find \\(a - b\\).",
        steps: [
          "Point on curve: \\(1 + a + b = 0 \\Rightarrow a + b = -1\\).",
          "Implicit slope: \\(y + xy' + a + by' = 0 \\Rightarrow y'(x + b) = -(y + a)\\). At \\((1,1)\\): \\(y' = \\dfrac{-(1 + a)}{1 + b} = 2\\).",
          "So \\(-(1 + a) = 2(1 + b) \\Rightarrow -1 - a = 2 + 2b \\Rightarrow a + 2b = -3\\). With \\(a + b = -1\\): \\(b = -2\\), \\(a = 1\\), so \\(a - b = 3\\).",
        ],
        answer: "\\(a - b = 3\\)",
      },
      practiceSet: [
        { prompt: "Two conditions when a line is tangent to a curve at a point.", answer: "Point on the curve; slope = line slope", method: "substitution + \\(y' = m\\)" },
        { prompt: "For \\(y^2 = px^3 + q\\) at \\((2,3)\\) with slope 4: value of \\(p\\).", answer: "\\(2\\)", method: "\\(2p = 4\\)" },
        { prompt: "Same curve/point: value of \\(q\\).", answer: "\\(-7\\)", method: "\\(9 = 8p + q\\)" },
        { prompt: "\\(p - q\\) for that curve.", answer: "\\(9\\)", method: "\\(2 - (-7)\\)" },
      ],
      pyqExampleId: "b21868e1-c0c0-4de9-ae97-2ec555cf9e29", // y=4x-5 tangent to y²=px³+q at (2,3) → p,q
      traps: [
        {
          title: "You need BOTH the point-on-curve equation and the slope equation",
          body:
            "One condition alone under-determines the two unknowns. Use \\((x_0, y_0)\\) on the curve for one equation, and the curve's slope at that point equal to the line's slope for the other. Skipping the slope match leaves a free parameter.",
        },
        {
          title: "Differentiate the curve implicitly, not the line",
          body:
            "The slope you match is the CURVE's derivative at the point (in terms of \\(p, q, a, b\\)), set equal to the line's known slope. Differentiate \\(y^2 = px^3 + q\\) implicitly as \\(2y\\,y' = 3px^2\\); don't confuse the line's slope with the curve's derivative expression.",
        },
      ],
    },

    // 9 — ADVANCED: lengths, intercepts, fixed point, distance of normal
    {
      kind: "formula" as const,
      slug: "cetaod-lengths-intercepts-fixed-point",
      name: "Lengths of Tangent/Normal, Intercepts, and Fixed Points",
      intuition:
        "A cluster of one-formula results: the length of the tangent/normal segment to the X-axis, the sub-tangent and sub-normal, the sum of the axis intercepts of a tangent, the distance of a normal from the origin, and whether a parametric normal passes through a fixed point. Each is a short plug-in once you know the formula.",
      definition:
        "With \\(y' = \\dfrac{dy}{dx}\\) at the point of contact:\n" +
        "- **Length of tangent** \\(= \\left|\\dfrac{y\\sqrt{1 + y'^2}}{y'}\\right|\\); **length of normal** \\(= \\left|y\\sqrt{1 + y'^2}\\right|\\).\n" +
        "- **Sub-tangent** \\(= \\left|\\dfrac{y}{y'}\\right|\\); **sub-normal** \\(= \\left|y\\,y'\\right|\\).\n" +
        "- **Distance of a line** \\(Ax + By + C = 0\\) from the origin \\(= \\dfrac{|C|}{\\sqrt{A^2 + B^2}}\\).\n" +
        "- **Fixed point:** if a parametric normal reduces to a form that holds for all \\(\\theta\\), the coordinates independent of \\(\\theta\\) give the fixed point.",
      formula: {
        label: "Length of normal and length of tangent",
        latex:
          "\\ell_{\\text{normal}} = \\left|y\\sqrt{1 + y'^2}\\right| \\qquad \\ell_{\\text{tangent}} = \\left|\\dfrac{y\\sqrt{1 + y'^2}}{y'}\\right|",
        symbols: [
          { symbol: "y", meaning: "ordinate at the point of contact" },
          { symbol: "y'", meaning: "slope at the point of contact" },
        ],
      },
      authoredExample: {
        prompt:
          "Find the sum of the intercepts on the coordinate axes made by the tangent to \\(\\sqrt{x} + \\sqrt{y} = \\sqrt{a}\\).",
        steps: [
          "Tangent at \\((x_1, y_1)\\): \\(\\dfrac{x}{\\sqrt{x_1}} + \\dfrac{y}{\\sqrt{y_1}} = \\sqrt{a}\\) (from implicit differentiation).",
          "X-intercept \\(= \\sqrt{a\\,x_1}\\), Y-intercept \\(= \\sqrt{a\\,y_1}\\).",
          "Sum \\(= \\sqrt{a}\\left(\\sqrt{x_1} + \\sqrt{y_1}\\right) = \\sqrt{a}\\cdot\\sqrt{a} = a\\), using \\(\\sqrt{x_1} + \\sqrt{y_1} = \\sqrt{a}\\).",
        ],
        answer: "Sum of intercepts \\(= a\\)",
      },
      selfCheckExample: {
        prompt:
          "For the curve \\(x = 2(\\cos t + t\\sin t),\\ y = 2(\\sin t - t\\cos t)\\), find the distance of the normal at parameter \\(t\\) from the origin.",
        steps: [
          "\\(\\dfrac{dx}{dt} = 2t\\cos t\\), \\(\\dfrac{dy}{dt} = 2t\\sin t\\), so \\(\\dfrac{dy}{dx} = \\tan t\\).",
          "The normal (slope \\(-\\cot t\\)) simplifies to \\(x\\cos t + y\\sin t = 2\\).",
          "Distance from origin \\(= \\dfrac{|2|}{\\sqrt{\\cos^2 t + \\sin^2 t}} = 2\\).",
        ],
        answer: "Distance \\(= 2\\) (independent of \\(t\\)).",
      },
      practiceSet: [
        { prompt: "Length of the normal in terms of \\(y\\) and \\(y'\\).", answer: "\\(\\left|y\\sqrt{1 + y'^2}\\right|\\)", method: "standard formula" },
        { prompt: "Sub-normal at a point.", answer: "\\(\\left|y\\,y'\\right|\\)", method: "\\(y\\) times slope" },
        { prompt: "Distance of \\(x + y = 4\\) from the origin.", answer: "\\(2\\sqrt{2}\\)", method: "\\(\\dfrac{|-4|}{\\sqrt2}\\)" },
        { prompt: "A parametric normal that holds for all \\(\\theta\\) passes through a?", answer: "Fixed point", method: "θ-independent coordinates" },
      ],
      pyqExampleId: "b22f2bd7-402e-419c-9504-bc05532d6a87", // sum of intercepts of tangent to √x+√y=√a
      traps: [
        {
          title: "Length of NORMAL and length of TANGENT are different formulas",
          body:
            "Length of normal \\(= \\left|y\\sqrt{1 + y'^2}\\right|\\); length of tangent \\(= \\left|\\dfrac{y\\sqrt{1 + y'^2}}{y'}\\right|\\) — the tangent version has the extra \\(1/y'\\). Using the tangent formula where the normal is asked (or vice versa) is a classic slip; on 'length of normal from a point' problems, pick the one WITHOUT the \\(1/y'\\).",
        },
        {
          title: "Distance from the origin uses only the constant term",
          body:
            "For a normal written as \\(Ax + By + C = 0\\), the perpendicular distance from the origin is \\(\\dfrac{|C|}{\\sqrt{A^2 + B^2}}\\). After reducing a parametric normal to \\(x\\cos t + y\\sin t = 2\\), the distance is \\(\\dfrac{2}{\\sqrt{\\cos^2 t + \\sin^2 t}} = 2\\) — the \\(\\theta\\)-dependence cancels.",
        },
      ],
    },
  ],
  related: [
    { label: "Differentiation notes", href: "/notes/mht-cet-maths/differentiation/foundations-chain" },
    { label: "NDA Tangents & Slopes", href: "/notes/nda-maths/application-of-derivatives/aod-tangents-normals" },
  ],
};
