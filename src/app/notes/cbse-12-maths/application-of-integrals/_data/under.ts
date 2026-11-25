import type { SubtopicNote } from "@/app/notes/_types";

export const CB_MA_AI_UNDER_NOTE: SubtopicNote = {
  subtopicName: "Area Under Simple Curves",
  title: "Area Under Simple Curves",
  oneLineDefinition:
    "The area between a curve y = f(x), the x-axis and the lines x = a and x = b is the integral of y from a to b; a part below the axis is taken with its absolute value, and horizontal strips give the area between a curve and the y-axis.",
  whyItMatters:
    "42 questions, thirty-three of them from board papers. Every year from 2022 to 2026 the board asked the area under a parabola or a line between two ordinates. It asked the curve y = x|x|, which dips below the axis, in 2024, 2025 and 2026, and V-shaped graphs such as y = 2 + |x + 1| in 2025 and 2026. The whole area of an ellipse came in 2024 and 2026 (half of one in 2025), a parabola and its latus rectum in 2023, and a 2026 case study asked the areas of a roundabout and its pond. Since 2024 one-mark MCQs ask for an area or for the integral that gives it. The textbook adds Examples 1 and 2 (the circle and the ellipse), Exercise 8.1 Q1 and Q2, Miscellaneous Example 4 and Miscellaneous Exercise Q2 to Q5.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbmai-vertical-strip",
      name: "Area under a curve with vertical strips",
      intuition:
        "Cut the region into very thin vertical strips. A strip at position \\(x\\) has height \\(y\\) and width \\(dx\\), so its area is \\(y\\,dx\\). Adding all the strips from \\(x = a\\) to \\(x = b\\) is exactly the definite integral of \\(y\\) from \\(a\\) to \\(b\\). The curve must stay above the \\(x\\)-axis on the whole interval for this plain integral to be the area.",
      definition:
        "- **Area** \\(A = \\displaystyle\\int_a^b y\\,dx = \\int_a^b f(x)\\,dx\\), for the region between \\(y = f(x)\\), the \\(x\\)-axis and the ordinates \\(x = a\\), \\(x = b\\), when \\(f(x) \\ge 0\\) on \\([a, b]\\).\n" +
        "- **A full-marks answer** shows: a rough sketch with the region shaded, the limits, the integral set up, the evaluation and the answer in square units.\n" +
        "- For a parabola like \\(y^2 = x\\), the part above the \\(x\\)-axis is \\(y = \\sqrt{x}\\). Use it when the region is bounded by the \\(x\\)-axis.\n" +
        "- Check the answer with a triangle or trapezium formula when the curve is a straight line.",
      formula: {
        label: "Area under a curve between two ordinates",
        latex: "A = \\int_a^b y\\,dx = \\int_a^b f(x)\\,dx",
        symbols: [
          { symbol: "\\(y = f(x)\\)", meaning: "the curve, above the x-axis on the interval" },
          { symbol: "\\(a, b\\)", meaning: "the ordinates (vertical lines) that close the region" },
        ],
      },
      authoredExample: {
        prompt: "Using integration, find the area of the region bounded by the curve \\(y = x^2 + 1\\), the \\(x\\)-axis and the lines \\(x = 1\\) and \\(x = 3\\).",
        steps: [
          "Sketch: \\(y = x^2 + 1\\) is an upward parabola with vertex \\((0, 1)\\). Shade the region under it between \\(x = 1\\) and \\(x = 3\\), down to the \\(x\\)-axis.",
          "\\(x^2 + 1 > 0\\) for every \\(x\\), so the curve is above the \\(x\\)-axis on \\([1, 3]\\).",
          "Area \\(= \\displaystyle\\int_1^3 (x^2 + 1)\\,dx\\).",
          "\\(= \\left[\\dfrac{x^3}{3} + x\\right]_1^3\\).",
          "\\(= (9 + 3) - \\left(\\dfrac{1}{3} + 1\\right) = 12 - \\dfrac{4}{3}\\).",
          "\\(= \\dfrac{32}{3}\\).",
          "The required area is \\(\\dfrac{32}{3}\\) square units.",
        ],
        answer: "\\(\\dfrac{32}{3}\\) square units",
      },
      selfCheckExample: {
        prompt: "Using integration, find the area of the region bounded by the line \\(y = 2x + 1\\), the \\(x\\)-axis and the lines \\(x = 1\\) and \\(x = 3\\).",
        steps: [
          "On \\([1, 3]\\) the line runs from \\(y = 3\\) to \\(y = 7\\), so it is above the \\(x\\)-axis.",
          "Area \\(= \\displaystyle\\int_1^3 (2x + 1)\\,dx = \\left[x^2 + x\\right]_1^3\\).",
          "\\(= 12 - 2 = 10\\).",
          "Check: the region is a trapezium with parallel sides 3 and 7 and width 2, so its area is \\(\\dfrac{1}{2}(3 + 7)(2) = 10\\).",
        ],
        answer: "10 square units",
      },
      practiceSet: [
        { prompt: "Find the area of the region bounded by \\(y = x^3\\), the \\(x\\)-axis and the lines \\(x = 0\\) and \\(x = 2\\).", answer: "4 square units" },
        { prompt: "Find the area of the region bounded by \\(y = 3x^2\\), the \\(x\\)-axis and the lines \\(x = 1\\) and \\(x = 2\\).", answer: "7 square units", method: "\\(\\left[x^3\\right]_1^2 = 8 - 1\\)" },
        { prompt: "Using integration, find the area of the region bounded by \\(y = \\dfrac{x}{2} + 1\\), the \\(x\\)-axis and the lines \\(x = 2\\) and \\(x = 6\\).", answer: "12 square units", method: "\\(\\left[\\dfrac{x^2}{4} + x\\right]_2^6 = 15 - 3\\)" },
      ],
      pyqExampleId: "ca2427dc-e3c0-45fa-b433-9efe50c08fa9",
      traps: [
        {
          title: "No sketch where one is asked",
          body: "When the question says \"draw a rough sketch\" or \"sketch the graph\", the sketch carries marks of its own. Draw the curve, mark the points where it meets the lines, and shade the region you are finding.",
        },
        {
          title: "An answer without units",
          body: "Area is measured in square units. Write \"square units\" (or the unit given, such as \\(\\text{cm}^2\\)) after the final number.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmai-horizontal-strip",
      name: "Area between a curve and the y-axis with horizontal strips",
      intuition:
        "When the region is closed by the \\(y\\)-axis and two horizontal lines, cut it into horizontal strips instead. A strip at height \\(y\\) has length \\(x\\) and width \\(dy\\), so its area is \\(x\\,dy\\). Write the curve as \\(x = g(y)\\) and integrate from \\(y = c\\) to \\(y = d\\).",
      definition:
        "- **Area** \\(A = \\displaystyle\\int_c^d x\\,dy = \\int_c^d g(y)\\,dy\\), for the region between \\(x = g(y)\\), the \\(y\\)-axis and the lines \\(y = c\\), \\(y = d\\).\n" +
        "- First make \\(x\\) the subject: \\(y = \\sqrt{x}\\) becomes \\(x = y^2\\); \\(x^2 = 4y\\) becomes \\(x = 2\\sqrt{y}\\) in the first quadrant.\n" +
        "- The limits are values of \\(y\\), read off the horizontal lines.\n" +
        "- In an MCQ that offers integrals, check three things: the variable (\\(dx\\) or \\(dy\\)), the limits on that variable, and whether the region needs a factor 2.",
      formula: {
        label: "Area between a curve and the y-axis",
        latex: "A = \\int_c^d x\\,dy = \\int_c^d g(y)\\,dy",
        symbols: [
          { symbol: "\\(x = g(y)\\)", meaning: "the curve written with x as the subject" },
          { symbol: "\\(c, d\\)", meaning: "the horizontal lines y = c and y = d" },
        ],
      },
      authoredExample: {
        prompt: "Using integration, find the area of the region in the first quadrant bounded by the curve \\(x^2 = 4y\\), the \\(y\\)-axis and the lines \\(y = 1\\) and \\(y = 4\\).",
        steps: [
          "Sketch: \\(x^2 = 4y\\) is an upward parabola with vertex at the origin. Shade the region between the \\(y\\)-axis and the right half of the parabola, from \\(y = 1\\) up to \\(y = 4\\).",
          "The region is closed by horizontal lines, so use horizontal strips. In the first quadrant \\(x = 2\\sqrt{y}\\).",
          "Area \\(= \\displaystyle\\int_1^4 x\\,dy = \\int_1^4 2\\sqrt{y}\\,dy\\).",
          "\\(= 2\\left[\\dfrac{2}{3}y^{3/2}\\right]_1^4 = \\dfrac{4}{3}\\left(4^{3/2} - 1\\right)\\).",
          "\\(= \\dfrac{4}{3}(8 - 1) = \\dfrac{28}{3}\\).",
          "The required area is \\(\\dfrac{28}{3}\\) square units.",
        ],
        answer: "\\(\\dfrac{28}{3}\\) square units",
      },
      selfCheckExample: {
        prompt: "Using integration, find the area of the region bounded by the line \\(x = y + 2\\), the \\(y\\)-axis and the lines \\(y = 0\\) and \\(y = 2\\).",
        steps: [
          "For \\(0 \\le y \\le 2\\), \\(x = y + 2\\) is positive, so the line is to the right of the \\(y\\)-axis.",
          "Area \\(= \\displaystyle\\int_0^2 (y + 2)\\,dy = \\left[\\dfrac{y^2}{2} + 2y\\right]_0^2\\).",
          "\\(= 2 + 4 = 6\\).",
        ],
        answer: "6 square units",
      },
      practiceSet: [
        { prompt: "Using integration, find the area of the region in the first quadrant bounded by the circle \\(x^2 + y^2 = 16\\), the \\(y\\)-axis and the lines \\(y = 0\\) and \\(y = 2\\).", answer: "\\(2\\sqrt{3} + \\dfrac{4\\pi}{3}\\) square units", method: "\\(\\left[\\dfrac{y}{2}\\sqrt{16 - y^2} + 8\\sin^{-1}\\dfrac{y}{4}\\right]_0^2\\)" },
        { prompt: "Find the area of the region bounded by the line \\(x = 5 - y\\), the \\(y\\)-axis and the lines \\(y = 1\\) and \\(y = 4\\).", answer: "\\(\\dfrac{15}{2}\\) square units" },
        { prompt: "Find the area of the region in the first quadrant between the parabola \\(y = x^2\\) and the \\(y\\)-axis, from \\(y = 1\\) to \\(y = 4\\).", answer: "\\(\\dfrac{14}{3}\\) square units", method: "\\(\\displaystyle\\int_1^4 \\sqrt{y}\\,dy\\)" },
      ],
      pyqExampleId: "b1e37945-fd99-4939-86b4-5474f614754b",
      traps: [
        {
          title: "Limits on the wrong variable",
          body: "With \\(dy\\) the limits must be values of \\(y\\). For the region left of \\(y = x^2\\) up to the point \\((2, 4)\\), the integral is \\(\\displaystyle\\int_0^4 \\sqrt{y}\\,dy\\), not \\(\\displaystyle\\int_0^2 \\sqrt{y}\\,dy\\).",
        },
        {
          title: "Integrating y with dy",
          body: "In a horizontal strip the length is \\(x\\), so you integrate \\(x = g(y)\\) with respect to \\(y\\). Writing \\(\\displaystyle\\int y\\,dy\\) finds nothing useful.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmai-split-sign",
      name: "Curves below the axis, curves that cross it, and modulus graphs",
      intuition:
        "Below the \\(x\\)-axis \\(f(x)\\) is negative, so its integral comes out negative. Area is never negative, so you take the absolute value. If the curve crosses the axis inside the interval, the positive and negative parts would cancel, so you must split at the crossing point and add the two parts as areas. A modulus graph such as \\(y = |x - 2|\\) changes its formula at the corner, so you split there too.",
      definition:
        "- If \\(f(x) \\le 0\\) on \\([a, b]\\), the area is \\(\\left|\\displaystyle\\int_a^b f(x)\\,dx\\right|\\).\n" +
        "- If the curve crosses the axis at \\(x = c\\) inside \\([a, b]\\), the area is \\(|A_1| + A_2\\), where \\(A_1 = \\displaystyle\\int_a^c f(x)\\,dx\\) and \\(A_2 = \\displaystyle\\int_c^b f(x)\\,dx\\).\n" +
        "- **Modulus graphs:** find where the expression inside \\(|\\;|\\) is zero, write the two formulas (one each side) and split the integral there.\n" +
        "- \\(y = x|x|\\) is \\(x^2\\) for \\(x \\ge 0\\) and \\(-x^2\\) for \\(x < 0\\): it is below the axis on the left.",
      formula: {
        label: "Area when the curve crosses the x-axis at c",
        latex: "A = \\left|\\int_a^c f(x)\\,dx\\right| + \\int_c^b f(x)\\,dx",
        symbols: [
          { symbol: "\\(c\\)", meaning: "the point where the curve meets the x-axis, or the corner of a modulus graph" },
        ],
      },
      authoredExample: {
        prompt: "Using integration, find the area of the region bounded by the line \\(y = 2x - 2\\), the \\(x\\)-axis and the ordinates \\(x = -2\\) and \\(x = 2\\).",
        steps: [
          "Sketch: the line meets the \\(x\\)-axis where \\(2x - 2 = 0\\), at \\(x = 1\\). It is below the axis for \\(-2 \\le x < 1\\) and above it for \\(1 < x \\le 2\\). The region is two triangles meeting at \\((1, 0)\\).",
          "Area \\(= \\left|\\displaystyle\\int_{-2}^{1} (2x - 2)\\,dx\\right| + \\int_1^2 (2x - 2)\\,dx\\).",
          "\\(\\displaystyle\\int_{-2}^{1} (2x - 2)\\,dx = \\left[x^2 - 2x\\right]_{-2}^{1} = (1 - 2) - (4 + 4) = -9\\), so this part is 9.",
          "\\(\\displaystyle\\int_1^2 (2x - 2)\\,dx = \\left[x^2 - 2x\\right]_1^2 = 0 - (-1) = 1\\).",
          "Area \\(= 9 + 1 = 10\\).",
          "The required area is 10 square units.",
        ],
        answer: "10 square units",
      },
      selfCheckExample: {
        prompt: "Using integration, find the area of the region bounded by \\(y = |x - 2|\\), the \\(x\\)-axis and the lines \\(x = 0\\) and \\(x = 3\\).",
        steps: [
          "The corner is at \\(x = 2\\). For \\(x \\le 2\\), \\(y = 2 - x\\); for \\(x \\ge 2\\), \\(y = x - 2\\).",
          "Area \\(= \\displaystyle\\int_0^2 (2 - x)\\,dx + \\int_2^3 (x - 2)\\,dx\\).",
          "\\(= \\left[2x - \\dfrac{x^2}{2}\\right]_0^2 + \\left[\\dfrac{x^2}{2} - 2x\\right]_2^3 = 2 + \\dfrac{1}{2}\\).",
          "\\(= \\dfrac{5}{2}\\).",
        ],
        answer: "\\(\\dfrac{5}{2}\\) square units",
      },
      practiceSet: [
        { prompt: "Find the area bounded by \\(y = \\cos x\\) and the \\(x\\)-axis between \\(x = 0\\) and \\(x = \\pi\\).", answer: "2 square units", method: "\\(1 + |-1|\\), split at \\(x = \\dfrac{\\pi}{2}\\)" },
        { prompt: "Find the area of the region bounded by \\(y = x^3\\), the \\(x\\)-axis and the ordinates \\(x = -2\\) and \\(x = 2\\).", answer: "8 square units", method: "\\(4 + 4\\); the signed integral is 0" },
        { prompt: "Using integration, find the area of the region bounded by \\(y = 3 + |x|\\), the \\(x\\)-axis and the lines \\(x = -2\\) and \\(x = 1\\).", answer: "\\(\\dfrac{23}{2}\\) square units", method: "\\(8 + \\dfrac{7}{2}\\), split at \\(x = 0\\)" },
      ],
      pyqExampleId: "aacf1721-c590-4464-97d4-129430750a91",
      traps: [
        {
          title: "Integrating straight through a crossing",
          body: "\\(\\displaystyle\\int_{-2}^{2} x|x|\\,dx = 0\\), because the two halves cancel. The area is \\(\\dfrac{16}{3}\\). Always find where the curve crosses the axis first and split there.",
        },
        {
          title: "A negative area",
          body: "If a part of your integral comes out negative, that part lies below the axis. Take its absolute value before adding. An answer like \\(-\\dfrac{15}{4}\\) square units is never right.",
        },
        {
          title: "One formula for a modulus graph",
          body: "\\(|x + 3|\\) is \\(-(x + 3)\\) to the left of \\(x = -3\\) and \\(x + 3\\) to the right. Integrating \\(x + 3\\) over the whole interval is wrong; write both pieces and split at the corner.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmai-symmetry",
      name: "Symmetry: circles, ellipses and both halves of a parabola",
      intuition:
        "A circle or an ellipse centred at the origin is symmetric about both axes, so its area is four times the part in the first quadrant. A parabola \\(y^2 = 4ax\\) is symmetric about the \\(x\\)-axis, so a region it closes with a vertical line is twice the part above the axis. Work out one piece and multiply.",
      definition:
        "- **Circle** \\(x^2 + y^2 = a^2\\): area \\(= 4\\displaystyle\\int_0^a \\sqrt{a^2 - x^2}\\,dx = \\pi a^2\\).\n" +
        "- **Ellipse** \\(\\dfrac{x^2}{a^2} + \\dfrac{y^2}{b^2} = 1\\): in the first quadrant \\(y = \\dfrac{b}{a}\\sqrt{a^2 - x^2}\\), and the area is \\(4\\displaystyle\\int_0^a \\dfrac{b}{a}\\sqrt{a^2 - x^2}\\,dx = \\pi ab\\).\n" +
        "- First divide the equation so the right side is 1. Then \\(a\\) is under \\(x^2\\) and is the upper limit.\n" +
        "- Use \\(\\displaystyle\\int \\sqrt{a^2 - x^2}\\,dx = \\dfrac{x}{2}\\sqrt{a^2 - x^2} + \\dfrac{a^2}{2}\\sin^{-1}\\dfrac{x}{a} + C\\).\n" +
        "- **Parabola** \\(y^2 = 4ax\\) and the line \\(x = k\\): area \\(= 2\\displaystyle\\int_0^k 2\\sqrt{ax}\\,dx\\). Its latus rectum is the line \\(x = a\\).\n" +
        "- The board wants the integral worked out, not \\(\\pi ab\\) quoted; use \\(\\pi ab\\) only to check.",
      formula: {
        label: "Area of an ellipse",
        latex: "A = 4\\int_0^a \\frac{b}{a}\\sqrt{a^2 - x^2}\\,dx = \\pi ab",
        symbols: [
          { symbol: "\\(a\\)", meaning: "the semi-axis along the x-axis, the upper limit" },
          { symbol: "\\(b\\)", meaning: "the semi-axis along the y-axis" },
        ],
      },
      authoredExample: {
        prompt: "Using integration, find the area of the region enclosed by the ellipse \\(4x^2 + 25y^2 = 100\\).",
        steps: [
          "Divide by 100: \\(\\dfrac{x^2}{25} + \\dfrac{y^2}{4} = 1\\). So \\(a = 5\\) and \\(b = 2\\).",
          "Sketch: an ellipse centred at the origin, meeting the axes at \\((\\pm 5, 0)\\) and \\((0, \\pm 2)\\). It is symmetric about both axes.",
          "In the first quadrant \\(y = \\dfrac{2}{5}\\sqrt{25 - x^2}\\), with \\(x\\) from 0 to 5.",
          "Area \\(= 4\\displaystyle\\int_0^5 \\dfrac{2}{5}\\sqrt{25 - x^2}\\,dx = \\dfrac{8}{5}\\left[\\dfrac{x}{2}\\sqrt{25 - x^2} + \\dfrac{25}{2}\\sin^{-1}\\dfrac{x}{5}\\right]_0^5\\).",
          "At \\(x = 5\\): \\(0 + \\dfrac{25}{2}\\sin^{-1}1 = \\dfrac{25}{2} \\times \\dfrac{\\pi}{2} = \\dfrac{25\\pi}{4}\\). At \\(x = 0\\): 0.",
          "Area \\(= \\dfrac{8}{5} \\times \\dfrac{25\\pi}{4} = 10\\pi\\).",
          "The required area is \\(10\\pi\\) square units.",
        ],
        answer: "\\(10\\pi\\) square units",
      },
      selfCheckExample: {
        prompt: "Using integration, find the area of the region bounded by the parabola \\(y^2 = 8x\\) and its latus rectum.",
        steps: [
          "\\(y^2 = 8x = 4(2)x\\), so \\(a = 2\\) and the latus rectum is the line \\(x = 2\\).",
          "The region is symmetric about the \\(x\\)-axis; above the axis \\(y = \\sqrt{8x} = 2\\sqrt{2}\\sqrt{x}\\).",
          "Area \\(= 2\\displaystyle\\int_0^2 2\\sqrt{2}\\sqrt{x}\\,dx = 4\\sqrt{2}\\left[\\dfrac{2}{3}x^{3/2}\\right]_0^2\\).",
          "\\(= 4\\sqrt{2} \\times \\dfrac{2}{3} \\times 2\\sqrt{2} = \\dfrac{32}{3}\\).",
        ],
        answer: "\\(\\dfrac{32}{3}\\) square units",
      },
      practiceSet: [
        { prompt: "Using integration, find the area enclosed by the circle \\(x^2 + y^2 = 25\\).", answer: "\\(25\\pi\\) square units" },
        { prompt: "Using integration, find the area enclosed by the ellipse \\(25x^2 + 16y^2 = 400\\).", answer: "\\(20\\pi\\) square units", method: "\\(\\dfrac{x^2}{16} + \\dfrac{y^2}{25} = 1\\), so \\(a = 4\\), \\(b = 5\\)" },
        { prompt: "Find the area of the region bounded by the parabola \\(y^2 = 4x\\) and the line \\(x = 9\\).", answer: "72 square units", method: "\\(2\\displaystyle\\int_0^9 2\\sqrt{x}\\,dx\\)" },
      ],
      pyqExampleId: "cf11a7e7-70cc-48fd-b14e-43d04b6e3e04",
      traps: [
        {
          title: "The wrong upper limit",
          body: "After dividing, the upper limit is the number whose square sits under \\(x^2\\). For \\(\\dfrac{x^2}{49} + \\dfrac{y^2}{16} = 1\\) it is 7, not 4 and not 49: \\(\\sqrt{49 - x^2}\\) is not even real beyond \\(x = 7\\).",
        },
        {
          title: "Forgetting the 4 or the 2",
          body: "The integral from 0 to \\(a\\) gives only the first-quadrant part. Multiply by 4 for the whole circle or ellipse, and by 2 for a parabola closed by a vertical line, as the question needs.",
        },
      ],
    },
  ],
};
