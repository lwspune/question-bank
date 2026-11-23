import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_MA_AI_UNDER_NOTE: SubtopicNote = {
  subtopicName: "Area Under a Curve",
  title: "Area Under a Curve",
  oneLineDefinition:
    "The area bounded by a curve, an axis and two lines is a definite integral: the integral of y dx between x = a and x = b, or of x dy between y = c and y = d, always taken as a positive number.",
  whyItMatters:
    "50 questions, the larger page of the chapter, ten of them from board papers: the area under a parabola between two lines (2016, 2023, 2024), the area between y = x² and the line y = 4 (2023), the area of an ellipse, derived in general in 2024 and for a given ellipse in 2018, a parabola and its latus rectum (2025), and a line or curve that lies below or crosses the X-axis (MCQs in 2025 and 2026, a written question in 2026). The textbook rows are most of the solved examples, Exercise 5.1 Q.1 and Q.2 and most of the Miscellaneous Exercise.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscmai-strip",
      name: "Area under y = f(x) between x = a and x = b",
      intuition:
        "Cut the region into thin vertical strips. Each strip is almost a rectangle of height y and width dx, so its area is y dx. Adding all the strips from x = a to x = b is exactly what the definite integral does. So the area under a curve is the integral of y with respect to x, with the two given lines as the limits.",
      definition:
        "- Let \\(y = f(x)\\) be continuous on \\([a, b]\\) with \\(f(x) \\geq 0\\) there.\n" +
        "- The area bounded by the curve \\(y = f(x)\\), the X-axis and the lines \\(x = a\\), \\(x = b\\) is \\(A = \\displaystyle\\int_a^b y\\,dx = \\int_a^b f(x)\\,dx\\).\n" +
        "- Board layout: a rough sketch with the region shaded; \\(y\\) written in terms of \\(x\\); the integral with its limits; the integration; the answer in sq. units.\n" +
        "- When a curve such as \\(y^2 = 4x\\) has two branches and the question says \\(y \\geq 0\\) (or names the X-axis as a side), take only the upper branch \\(y = 2\\sqrt{x}\\).",
      formula: {
        label: "Area under a curve",
        latex: "A = \\int_a^b y\\,dx = \\int_a^b f(x)\\,dx",
        symbols: [
          { symbol: "\\(f(x)\\)", meaning: "the curve, written as y in terms of x" },
          { symbol: "\\(a, b\\)", meaning: "the x co-ordinates of the two bounding lines" },
        ],
      },
      authoredExample: {
        prompt: "Find the area of the region bounded by the line \\(y = 2x + 3\\), the X-axis and the lines \\(x = 1\\) and \\(x = 4\\).",
        steps: [
          "On \\([1, 4]\\), \\(y = 2x + 3 > 0\\), so the region lies above the X-axis.",
          "\\(A = \\displaystyle\\int_1^4 y\\,dx = \\int_1^4 (2x + 3)\\,dx\\).",
          "\\(= \\left[x^2 + 3x\\right]_1^4 = (16 + 12) - (1 + 3)\\).",
          "\\(= 28 - 4 = 24\\).",
        ],
        answer: "The required area is \\(24\\) sq. units.",
      },
      selfCheckExample: {
        prompt: "Find the area bounded by the curve \\(y = \\cos x\\), the X-axis and the lines \\(x = 0\\) and \\(x = \\dfrac{\\pi}{2}\\).",
        steps: [
          "\\(\\cos x \\geq 0\\) on \\(\\left[0, \\dfrac{\\pi}{2}\\right]\\).",
          "\\(A = \\displaystyle\\int_0^{\\pi/2} \\cos x\\,dx = \\left[\\sin x\\right]_0^{\\pi/2} = 1 - 0\\).",
        ],
        answer: "\\(1\\) sq. unit",
      },
      practiceSet: [
        { prompt: "Find the area bounded by \\(y = e^x\\), the X-axis and the lines \\(x = 0\\), \\(x = 1\\).", answer: "\\(e - 1\\) sq. units" },
        { prompt: "Find the area bounded by \\(y = \\dfrac{1}{x}\\), the X-axis and the lines \\(x = 1\\), \\(x = e\\).", answer: "\\(1\\) sq. unit" },
        { prompt: "Using integration, find the area of the rectangle bounded by \\(x = 0\\), \\(x = 3\\), \\(y = 0\\) and \\(y = 2\\).", answer: "\\(\\displaystyle\\int_0^3 2\\,dx = 6\\) sq. units" },
      ],
      pyqExampleId: "f0d1cfef-21f9-41e2-b197-067e87777211",
      traps: [
        {
          title: "Leaving out the unit",
          body: "An area is a number of square units. End every answer with 'sq. units'; a bare number loses the final mark.",
        },
        {
          title: "Integrating the curve as it is given",
          body: "If the curve is \\(2y + x = 8\\) or \\(y^2 = 4x\\), first write \\(y\\) in terms of \\(x\\): \\(y = \\dfrac{8 - x}{2}\\) or \\(y = 2\\sqrt{x}\\). Only then can you integrate \\(y\\,dx\\).",
        },
        {
          title: "Swapping the limits",
          body: "The lower limit is the left line and the upper limit the right line. Putting the larger value at the bottom gives a negative number for a region that lies above the X-axis.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmai-yaxis",
      name: "Area between a curve and the Y-axis: x = g(y) from y = c to y = d",
      intuition:
        "Sometimes the region is closed by the Y-axis and two horizontal lines. Then cut it into horizontal strips instead. Each strip has length x and thickness dy, so its area is x dy, and the area is the integral of x with respect to y between the two horizontal lines.",
      definition:
        "- The area bounded by the curve \\(x = g(y)\\), the Y-axis and the lines \\(y = c\\), \\(y = d\\) is \\(A = \\displaystyle\\int_c^d x\\,dy = \\int_c^d g(y)\\,dy\\).\n" +
        "- Write \\(x\\) in terms of \\(y\\) first: \\(x^2 = 16y\\) gives \\(x = 4\\sqrt{y}\\) in the first quadrant.\n" +
        "- The limits are now values of \\(y\\), read from the horizontal lines.\n" +
        "- If the region is symmetric about the Y-axis, find the part in the first quadrant and double it.",
      formula: {
        label: "Area between a curve and the Y-axis",
        latex: "A = \\int_c^d x\\,dy = \\int_c^d g(y)\\,dy",
        symbols: [
          { symbol: "\\(g(y)\\)", meaning: "the curve, written as x in terms of y" },
          { symbol: "\\(c, d\\)", meaning: "the y co-ordinates of the two horizontal lines" },
        ],
      },
      authoredExample: {
        prompt: "Find the area of the region bounded by the curve \\(x^2 = 4y\\), the Y-axis and the lines \\(y = 1\\) and \\(y = 4\\), lying in the first quadrant.",
        steps: [
          "In the first quadrant, \\(x^2 = 4y\\) gives \\(x = 2\\sqrt{y}\\).",
          "\\(A = \\displaystyle\\int_1^4 x\\,dy = \\int_1^4 2\\sqrt{y}\\,dy = 2\\left[\\dfrac{2}{3}y^{3/2}\\right]_1^4\\).",
          "\\(= \\dfrac{4}{3}\\left(4^{3/2} - 1^{3/2}\\right) = \\dfrac{4}{3}(8 - 1)\\).",
          "\\(= \\dfrac{28}{3}\\).",
        ],
        answer: "The required area is \\(\\dfrac{28}{3}\\) sq. units.",
      },
      selfCheckExample: {
        prompt: "Find the area bounded by the line \\(x = 3y\\), the Y-axis and the lines \\(y = 0\\) and \\(y = 2\\).",
        steps: ["\\(A = \\displaystyle\\int_0^2 3y\\,dy = \\left[\\dfrac{3y^2}{2}\\right]_0^2 = 6\\)."],
        answer: "\\(6\\) sq. units",
      },
      practiceSet: [
        { prompt: "Find the area bounded by \\(x = y^2\\), the Y-axis and the lines \\(y = 0\\), \\(y = 3\\).", answer: "\\(9\\) sq. units" },
        { prompt: "Find the area bounded by \\(x = 2y + 1\\), the Y-axis and the lines \\(y = 0\\), \\(y = 2\\).", answer: "\\(6\\) sq. units" },
        { prompt: "A region is closed by a curve, the Y-axis and the lines \\(y = c\\), \\(y = d\\). With respect to which variable do you integrate?", answer: "With respect to \\(y\\), integrating \\(x\\,dy\\)" },
      ],
      pyqExampleId: "bc1ce815-9e5f-453c-9b04-fabe06bc4fcd",
      traps: [
        {
          title: "Using x limits in a y integral",
          body: "In \\(\\displaystyle\\int x\\,dy\\) the limits are the \\(y\\) values of the horizontal lines. Putting in the \\(x\\) co-ordinates of the corners gives the wrong area.",
        },
        {
          title: "Forgetting the other half",
          body: "A region bounded by \\(y = x^2\\) and a horizontal line lies on both sides of the Y-axis. If you integrate \\(\\sqrt{y}\\,dy\\) you have found only the right half; multiply by 2.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmai-below",
      name: "A curve below the X-axis or crossing it",
      intuition:
        "Below the X-axis y is negative, so every strip y dx is negative and the integral comes out negative. But an area is never negative, so take its numerical value. When the curve crosses the X-axis inside the interval, the positive and negative parts would cancel, so split the interval at the crossing point and add the numerical values of the parts.",
      definition:
        "- If \\(f(x) \\leq 0\\) on \\([a, b]\\), the area is \\(\\left|\\displaystyle\\int_a^b f(x)\\,dx\\right|\\).\n" +
        "- If the curve crosses the X-axis at \\(x = t\\) inside \\([a, b]\\), split the region into \\(A_1\\) (from \\(a\\) to \\(t\\)) and \\(A_2\\) (from \\(t\\) to \\(b\\)).\n" +
        "- \\(A = \\left|\\displaystyle\\int_a^t f(x)\\,dx\\right| + \\left|\\displaystyle\\int_t^b f(x)\\,dx\\right|\\).\n" +
        "- Find \\(t\\) by putting \\(y = 0\\) in the equation of the curve.",
      formula: {
        label: "Area when the curve crosses the X-axis at x = t",
        latex: "A = \\left|\\int_a^t f(x)\\,dx\\right| + \\left|\\int_t^b f(x)\\,dx\\right|",
      },
      authoredExample: {
        prompt: "Find the area bounded by the curve \\(y = x^2 - 1\\), the X-axis and the lines \\(x = 0\\) and \\(x = 2\\).",
        steps: [
          "Put \\(y = 0\\): \\(x^2 - 1 = 0\\), so \\(x = 1\\) in \\([0, 2]\\). The curve is below the X-axis on \\([0, 1]\\) and above it on \\([1, 2]\\).",
          "\\(\\displaystyle\\int_0^1 (x^2 - 1)\\,dx = \\left[\\dfrac{x^3}{3} - x\\right]_0^1 = \\dfrac{1}{3} - 1 = -\\dfrac{2}{3}\\), so \\(A_1 = \\dfrac{2}{3}\\).",
          "\\(A_2 = \\displaystyle\\int_1^2 (x^2 - 1)\\,dx = \\left(\\dfrac{8}{3} - 2\\right) - \\left(\\dfrac{1}{3} - 1\\right) = \\dfrac{2}{3} + \\dfrac{2}{3} = \\dfrac{4}{3}\\).",
          "\\(A = A_1 + A_2 = \\dfrac{2}{3} + \\dfrac{4}{3} = 2\\).",
        ],
        answer: "The required area is \\(2\\) sq. units (not \\(\\dfrac{2}{3}\\), which is the integral over \\([0, 2]\\) taken in one go).",
      },
      selfCheckExample: {
        prompt: "Find the area bounded by \\(y = \\cos x\\), the X-axis and the lines \\(x = \\dfrac{\\pi}{2}\\) and \\(x = \\pi\\).",
        steps: [
          "\\(\\displaystyle\\int_{\\pi/2}^{\\pi} \\cos x\\,dx = \\left[\\sin x\\right]_{\\pi/2}^{\\pi} = 0 - 1 = -1\\).",
          "The region is below the X-axis, so take the numerical value.",
        ],
        answer: "\\(1\\) sq. unit",
      },
      practiceSet: [
        { prompt: "Find the area enclosed between \\(y = \\sin x\\) and the X-axis from \\(x = \\pi\\) to \\(x = 2\\pi\\).", answer: "\\(2\\) sq. units" },
        { prompt: "Find the area bounded by \\(y = x^3\\), the X-axis and the lines \\(x = -1\\), \\(x = 1\\).", answer: "\\(\\dfrac{1}{4} + \\dfrac{1}{4} = \\dfrac{1}{2}\\) sq. unit" },
        { prompt: "Find the area bounded by \\(y = 3x\\), the X-axis and the lines \\(x = -2\\), \\(x = 0\\).", answer: "\\(6\\) sq. units" },
      ],
      pyqExampleId: "17067b3b-b7fe-489a-b122-c68f01bb17bc",
      traps: [
        {
          title: "Writing a negative area",
          body: "If the integral comes out negative, the region is below the X-axis. Write its numerical value and say why ('area is always positive'). A final answer like \\(-5\\) sq. units gets no credit.",
        },
        {
          title: "Integrating straight across the crossing point",
          body: "For \\(y = x^3\\) from \\(x = -2\\) to \\(x = 1\\), one integral gives \\(-\\dfrac{15}{4}\\), and its numerical value \\(\\dfrac{15}{4}\\) is still wrong. Split at \\(x = 0\\): \\(4 + \\dfrac{1}{4} = \\dfrac{17}{4}\\).",
        },
        {
          title: "Not looking for a crossing at all",
          body: "Before integrating, put \\(y = 0\\) and check whether the crossing point lies between the two lines. Without a rough sketch this step is easy to miss.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmai-symmetry",
      name: "Parabola, circle and ellipse regions by symmetry",
      intuition:
        "A parabola, a circle and an ellipse are each symmetric about an axis, so their regions split into equal parts. Find the area of one part, usually the one in the first quadrant where y is positive and easy to write, and multiply by the number of parts: 2 for a parabola cut by a line, 4 for a whole circle or ellipse.",
      definition:
        "- The X-axis is an axis of symmetry of a curve if replacing \\(y\\) by \\(-y\\) leaves its equation unchanged; the Y-axis is one if replacing \\(x\\) by \\(-x\\) leaves it unchanged.\n" +
        "- Parabola \\(y^2 = 4ax\\) and its latus rectum \\(x = a\\): \\(A = 2\\displaystyle\\int_0^a 2\\sqrt{a}\\sqrt{x}\\,dx\\).\n" +
        "- Standard integral: \\(\\displaystyle\\int \\sqrt{a^2 - x^2}\\,dx = \\dfrac{x}{2}\\sqrt{a^2 - x^2} + \\dfrac{a^2}{2}\\sin^{-1}\\dfrac{x}{a} + c\\).\n" +
        "- **Area of the ellipse** \\(\\dfrac{x^2}{a^2} + \\dfrac{y^2}{b^2} = 1\\), the derivation:\n" +
        "- The ellipse is symmetric about both axes, so \\(A = 4 \\times\\) (area in the first quadrant).\n" +
        "- In the first quadrant \\(y = \\dfrac{b}{a}\\sqrt{a^2 - x^2}\\), and \\(x\\) runs from \\(0\\) to \\(a\\).\n" +
        "- \\(A = 4\\displaystyle\\int_0^a \\dfrac{b}{a}\\sqrt{a^2 - x^2}\\,dx = \\dfrac{4b}{a}\\left[\\dfrac{x}{2}\\sqrt{a^2 - x^2} + \\dfrac{a^2}{2}\\sin^{-1}\\dfrac{x}{a}\\right]_0^a\\).\n" +
        "- \\(= \\dfrac{4b}{a}\\left[\\dfrac{a^2}{2} \\cdot \\dfrac{\\pi}{2} - 0\\right] = \\pi ab\\) sq. units.\n" +
        "- With \\(a = b = r\\) the same steps give the area of a circle, \\(\\pi r^2\\).",
      formula: {
        label: "Area of an ellipse",
        latex: "A = 4\\int_0^a \\frac{b}{a}\\sqrt{a^2 - x^2}\\,dx = \\pi ab",
      },
      authoredExample: {
        prompt: "Using integration, find the area of the circle \\(x^2 + y^2 = 16\\).",
        steps: [
          "The circle has centre \\((0, 0)\\) and radius \\(4\\), and is symmetric about both axes, so \\(A = 4 \\times\\) (area in the first quadrant).",
          "In the first quadrant \\(y = \\sqrt{16 - x^2}\\), with \\(x\\) from \\(0\\) to \\(4\\).",
          "\\(A = 4\\displaystyle\\int_0^4 \\sqrt{16 - x^2}\\,dx = 4\\left[\\dfrac{x}{2}\\sqrt{16 - x^2} + \\dfrac{16}{2}\\sin^{-1}\\dfrac{x}{4}\\right]_0^4\\).",
          "\\(= 4\\left[(0 + 8\\sin^{-1}1) - (0 + 8\\sin^{-1}0)\\right] = 4 \\times 8 \\times \\dfrac{\\pi}{2}\\).",
          "\\(= 16\\pi\\).",
        ],
        answer: "The area of the circle is \\(16\\pi\\) sq. units.",
      },
      selfCheckExample: {
        prompt: "Find the area of the region bounded by the parabola \\(y^2 = 12x\\) and its latus rectum.",
        steps: [
          "\\(4a = 12\\), so \\(a = 3\\) and the latus rectum is \\(x = 3\\). In the first quadrant \\(y = 2\\sqrt{3}\\sqrt{x}\\).",
          "\\(A = 2\\displaystyle\\int_0^3 2\\sqrt{3}\\sqrt{x}\\,dx = 4\\sqrt{3}\\left[\\dfrac{2}{3}x^{3/2}\\right]_0^3 = 4\\sqrt{3} \\cdot \\dfrac{2}{3} \\cdot 3\\sqrt{3} = 24\\).",
        ],
        answer: "\\(24\\) sq. units",
      },
      practiceSet: [
        { prompt: "Find the area of the circle \\(x^2 + y^2 = 4\\) lying in the first quadrant.", answer: "\\(\\pi\\) sq. units" },
        { prompt: "Find the area of the region bounded by \\(y^2 = 4x\\) and the line \\(x = 1\\).", answer: "\\(2\\displaystyle\\int_0^1 2\\sqrt{x}\\,dx = \\dfrac{8}{3}\\) sq. units" },
        { prompt: "Is the curve \\(y^2 = 9x\\) symmetric about the X-axis? Give the reason.", answer: "Yes: replacing \\(y\\) by \\(-y\\) leaves the equation unchanged" },
      ],
      pyqExampleId: "a620ec98-70bc-4531-8403-29d04cf2a1e9",
      traps: [
        {
          title: "Using the area of a quarter as the whole",
          body: "The integral from \\(0\\) to \\(a\\) of \\(\\dfrac{b}{a}\\sqrt{a^2 - x^2}\\) is only the first-quadrant part, \\(\\dfrac{\\pi ab}{4}\\). Write the factor 4 in the first line so it is not lost.",
        },
        {
          title: "Halves of a parabola: read the question",
          body: "A parabola \\(y^2 = 4ax\\) closed by its latus rectum (or by a line \\(x = k\\)) has two halves, so double the integral. If the question says \\(y \\geq 0\\) or makes the X-axis a side, take only the upper half.",
        },
        {
          title: "Writing only the result when the derivation is asked",
          body: "'Find the area of the ellipse' in a long-answer question wants the integral, the standard formula and the limits. Writing only \\(\\pi ab\\) earns the last mark at most.",
        },
      ],
    },
  ],
};
