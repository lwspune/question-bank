import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_MA_AD_TANGENTS_NOTE: SubtopicNote = {
  subtopicName: "Tangents and Normals",
  title: "Tangents and Normals to a Curve",
  oneLineDefinition:
    "The slope of the tangent at a point of a curve is dy/dx at that point; the normal is perpendicular to the tangent, and both lines are written in point-slope form.",
  whyItMatters:
    "30 questions, eight of them from board papers: the tangent at a given point (an MCQ in 2017, then 2019 and 2022), the tangent and the normal together (2025), points where the tangent is parallel to a given line (2015, 2024, 2025) and the slope of the tangent to a curve given by a parameter (an MCQ in 2024). The textbook rows are Exercise 2.1 Q.1 to Q.6, the solved examples of section 2.1.2 and the tangent questions of the Miscellaneous Exercise.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscmad-equations",
      name: "Equations of the tangent and the normal at a point",
      intuition:
        "The derivative dy/dx worked out at a point is the slope of the tangent there. The normal is the line at right angles to the tangent through the same point, so its slope is minus one over the tangent's slope. Once you have a point and a slope, the point-slope form gives the line.",
      definition:
        "- Slope of the tangent at \\(P(x_1, y_1)\\): \\(m = \\left(\\dfrac{dy}{dx}\\right)_{(x_1, y_1)}\\).\n" +
        "- Slope of the normal: \\(m' = -\\dfrac{1}{m}\\), when \\(m \\neq 0\\).\n" +
        "- **Tangent:** \\(y - y_1 = m(x - x_1)\\).\n" +
        "- **Normal:** \\(y - y_1 = -\\dfrac{1}{m}(x - x_1)\\).\n" +
        "- If \\(m = 0\\), the tangent is \\(y = y_1\\) (parallel to the X-axis) and the normal is \\(x = x_1\\).\n" +
        "- Board layout: check the point is on the curve, find \\(\\dfrac{dy}{dx}\\), its value at the point, then the tangent and the normal, each written as \\(ax + by + c = 0\\).",
      formula: {
        label: "Tangent and normal at a point",
        latex:
          "y - y_1 = m(x - x_1), \\qquad y - y_1 = -\\frac{1}{m}(x - x_1), \\qquad m = \\left(\\frac{dy}{dx}\\right)_{(x_1,\\,y_1)}",
        symbols: [
          { symbol: "\\(m\\)", meaning: "slope of the tangent at the point" },
          { symbol: "\\((x_1, y_1)\\)", meaning: "the given point on the curve" },
        ],
      },
      authoredExample: {
        prompt: "Find the equations of the tangent and the normal to the curve \\(y = x^2 - 3x + 5\\) at the point \\((2, 3)\\).",
        steps: [
          "Check the point: \\(2^2 - 3(2) + 5 = 4 - 6 + 5 = 3\\), so \\((2, 3)\\) lies on the curve.",
          "Differentiate w.r.t. \\(x\\): \\(\\dfrac{dy}{dx} = 2x - 3\\).",
          "Slope of the tangent at \\((2, 3)\\): \\(m = 2(2) - 3 = 1\\).",
          "Tangent: \\(y - 3 = 1(x - 2)\\), i.e. \\(x - y + 1 = 0\\).",
          "Slope of the normal: \\(m' = -\\dfrac{1}{1} = -1\\).",
          "Normal: \\(y - 3 = -1(x - 2)\\), i.e. \\(x + y - 5 = 0\\).",
        ],
        answer: "Tangent \\(x - y + 1 = 0\\); normal \\(x + y - 5 = 0\\)",
      },
      selfCheckExample: {
        prompt: "Find the slope of the normal to the curve \\(y = x^3\\) at the point \\((1, 1)\\).",
        steps: ["\\(\\dfrac{dy}{dx} = 3x^2 = 3\\) at \\(x = 1\\).", "Slope of the normal \\(= -\\dfrac{1}{3}\\)."],
        answer: "\\(-\\dfrac{1}{3}\\)",
      },
      practiceSet: [
        { prompt: "Find the equation of the tangent to the curve \\(y = x^2\\) at the point \\((3, 9)\\).", answer: "\\(6x - y - 9 = 0\\)" },
        {
          prompt: "The tangent to a curve at the point \\((4, 2)\\) has slope 0. Write the equations of the tangent and the normal at that point.",
          answer: "Tangent \\(y = 2\\); normal \\(x = 4\\)",
        },
        { prompt: "Find the equation of the normal to the curve \\(y = e^{x}\\) at the point \\((0, 1)\\).", answer: "\\(x + y - 1 = 0\\)" },
      ],
      pyqExampleId: "f4177a89-bd8f-4a85-af33-26e25e0c00b3",
      traps: [
        {
          title: "Using the tangent's slope for the normal",
          body: "The normal's slope is \\(-\\dfrac{1}{m}\\), not \\(m\\) and not \\(-m\\). Write the two slopes on separate lines so the examiner sees both.",
        },
        {
          title: "Not checking that the point is on the curve",
          body: "Put the point into the equation of the curve before you differentiate. Board 2022 printed a curve that its given point did not lie on; a student who checked could say so and work the intended curve.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmad-implicit",
      name: "Slopes on implicit and parametric curves",
      intuition:
        "When y is not given on its own, differentiate both sides of the equation with respect to x and then solve for dy/dx. When x and y are both given in terms of a parameter, divide dy/dt by dx/dt. Put in the numbers of the point as soon as you can: numbers are easier to handle than letters.",
      definition:
        "- **Implicit curve:** differentiate every term w.r.t. \\(x\\); each term in \\(y\\) brings a factor \\(\\dfrac{dy}{dx}\\). Collect the \\(\\dfrac{dy}{dx}\\) terms and solve.\n" +
        "- A product such as \\(xy\\) needs the product rule: \\(\\dfrac{d}{dx}(xy) = y + x\\dfrac{dy}{dx}\\).\n" +
        "- **Parametric curve** \\(x = f(t)\\), \\(y = g(t)\\): \\(\\dfrac{dy}{dx} = \\dfrac{dy/dt}{dx/dt}\\), when \\(\\dfrac{dx}{dt} \\neq 0\\).\n" +
        "- For a parametric curve, find the point too: put the given value of the parameter into \\(x\\) and \\(y\\).\n" +
        "- Two curves cut **orthogonally** when their tangents at the common point are perpendicular, so the product of their slopes there is \\(-1\\).",
      formula: {
        label: "Slope of a parametric curve",
        latex: "\\frac{dy}{dx} = \\frac{dy/dt}{dx/dt}, \\qquad \\frac{dx}{dt} \\neq 0",
      },
      authoredExample: {
        prompt: "Find the equation of the tangent to the curve \\(x^2 + xy + y^2 = 7\\) at the point \\((1, 2)\\).",
        steps: [
          "Check the point: \\(1 + 2 + 4 = 7\\), so \\((1, 2)\\) lies on the curve.",
          "Differentiate w.r.t. \\(x\\): \\(2x + y + x\\dfrac{dy}{dx} + 2y\\dfrac{dy}{dx} = 0\\).",
          "At \\((1, 2)\\): \\(2 + 2 + (1 + 4)\\dfrac{dy}{dx} = 0\\), so \\(\\dfrac{dy}{dx} = -\\dfrac{4}{5}\\).",
          "Tangent: \\(y - 2 = -\\dfrac{4}{5}(x - 1)\\), so \\(5y - 10 = -4x + 4\\).",
          "That is \\(4x + 5y - 14 = 0\\).",
        ],
        answer: "\\(4x + 5y - 14 = 0\\)",
      },
      selfCheckExample: {
        prompt: "Find \\(\\dfrac{dy}{dx}\\) at the point \\((3, 4)\\) on the circle \\(x^2 + y^2 = 25\\).",
        steps: ["\\(2x + 2y\\dfrac{dy}{dx} = 0\\), so \\(\\dfrac{dy}{dx} = -\\dfrac{x}{y}\\).", "At \\((3, 4)\\): \\(-\\dfrac{3}{4}\\)."],
        answer: "\\(-\\dfrac{3}{4}\\)",
      },
      practiceSet: [
        {
          prompt: "Find the equation of the tangent to the curve \\(x = t^2\\), \\(y = 2t\\) at \\(t = 1\\).",
          answer: "\\(x - y + 1 = 0\\) (the point is \\((1, 2)\\) and the slope \\(\\dfrac{1}{t} = 1\\))",
        },
        { prompt: "Find the slope of the normal to the curve \\(xy = 4\\) at the point \\((2, 2)\\).", answer: "1 (the tangent's slope is \\(-1\\))" },
        { prompt: "Two curves meet at a point where their slopes are 2 and \\(-\\dfrac{1}{2}\\). Do they cut orthogonally?", answer: "Yes, since \\(2 \\times \\left(-\\dfrac{1}{2}\\right) = -1\\)" },
      ],
      pyqExampleId: "90f3fc38-701e-4a87-abd5-c6a40ce36a76",
      traps: [
        {
          title: "Turning the parametric slope upside down",
          body: "The slope is \\(\\dfrac{dy}{dt}\\) divided by \\(\\dfrac{dx}{dt}\\). Dividing the other way gives the reciprocal, which is the normal's slope with the wrong sign.",
        },
        {
          title: "Dropping dy/dx from a product term",
          body: "In \\(xy\\) or \\(x^2y\\) both factors change, so use the product rule. Writing \\(\\dfrac{d}{dx}(xy) = x\\dfrac{dy}{dx}\\) alone loses the \\(y\\) term and every number after it.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmad-parallel",
      name: "Tangents parallel or perpendicular to a given line",
      intuition:
        "Parallel lines have equal slopes, and perpendicular lines have slopes whose product is minus one. So you set dy/dx equal to the slope the tangent must have, solve for x, and then find y from the curve. The question asks for points, so the answer is a pair of coordinates.",
      definition:
        "- The slope of the line \\(ax + by + c = 0\\) is \\(-\\dfrac{a}{b}\\).\n" +
        "- Tangent parallel to the line: \\(\\dfrac{dy}{dx} = -\\dfrac{a}{b}\\).\n" +
        "- Tangent perpendicular to the line: \\(\\dfrac{dy}{dx} \\times \\left(-\\dfrac{a}{b}\\right) = -1\\).\n" +
        "- Tangent parallel to the X-axis: \\(\\dfrac{dy}{dx} = 0\\).\n" +
        "- Solve for \\(x\\), then put each \\(x\\) into the equation of the curve to get \\(y\\).\n" +
        "- A line that **touches** a curve at a point is the tangent there: the point lies on both, and the slopes are equal.",
      formula: {
        label: "Condition on the slope",
        latex: "\\left(\\frac{dy}{dx}\\right)_P = m_{\\text{line}} \\text{ (parallel)}, \\qquad \\left(\\frac{dy}{dx}\\right)_P \\times m_{\\text{line}} = -1 \\text{ (perpendicular)}",
      },
      authoredExample: {
        prompt: "Find the points on the curve \\(y = x^3 - 3x^2 + 4\\) where the tangent is parallel to the line \\(9x - y + 2 = 0\\).",
        steps: [
          "Slope of the line \\(9x - y + 2 = 0\\) is \\(-\\dfrac{9}{-1} = 9\\).",
          "\\(\\dfrac{dy}{dx} = 3x^2 - 6x\\). For a parallel tangent, \\(3x^2 - 6x = 9\\).",
          "\\(x^2 - 2x - 3 = 0\\), so \\((x - 3)(x + 1) = 0\\) and \\(x = 3\\) or \\(x = -1\\).",
          "When \\(x = 3\\): \\(y = 27 - 27 + 4 = 4\\). When \\(x = -1\\): \\(y = -1 - 3 + 4 = 0\\).",
        ],
        answer: "The points are \\((3, 4)\\) and \\((-1, 0)\\)",
      },
      selfCheckExample: {
        prompt: "Find the point on the curve \\(y = x^2 - 4x + 1\\) where the tangent is parallel to the X-axis.",
        steps: ["\\(\\dfrac{dy}{dx} = 2x - 4 = 0\\), so \\(x = 2\\).", "\\(y = 4 - 8 + 1 = -3\\)."],
        answer: "\\((2, -3)\\)",
      },
      practiceSet: [
        { prompt: "At what point of the curve \\(y = x^2\\) is the tangent perpendicular to the line \\(x + 2y = 3\\)?", answer: "\\((1, 1)\\), where the slope is 2" },
        { prompt: "Is the line \\(y = 2x - 1\\) the tangent to the curve \\(y = x^2\\) at the point \\((1, 1)\\)?", answer: "Yes: the point lies on both, and both slopes are 2" },
        { prompt: "What is the slope of every line parallel to \\(3x - 4y + 7 = 0\\)?", answer: "\\(\\dfrac{3}{4}\\)" },
      ],
      pyqExampleId: "3e41cc68-b552-446f-962f-63165d8f4985",
      traps: [
        {
          title: "Stopping at the values of x",
          body: "The question asks for points. Each value of \\(x\\) must be put back into the curve to find its \\(y\\), and the answer written as coordinates.",
        },
        {
          title: "Reading the slope of ax + by + c = 0 as a",
          body: "Write the line as \\(y = \\ldots\\) or use \\(-\\dfrac{a}{b}\\). For \\(3x - y + 1 = 0\\) the slope is 3, but for \\(x + 3y = 4\\) it is \\(-\\dfrac{1}{3}\\).",
        },
      ],
    },
  ],
};
