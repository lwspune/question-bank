import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_MA_AI_BETWEEN_NOTE: SubtopicNote = {
  subtopicName: "Area Between Two Curves",
  title: "Area Between Two Curves",
  oneLineDefinition:
    "The area enclosed by two curves is the integral of (upper curve minus lower curve) between the x co-ordinates of their points of intersection, or of (right curve minus left curve) along y.",
  whyItMatters:
    "25 questions, three of them from board papers: the area between the parabolas y² = 4ax and x² = 4ay (2022) and between y² = 4x and x² = 4y (2025), and the area between the circle x² + y² = 1 and the line x + y = 1 in the first quadrant (2026). All three are long written answers. The textbook rows are solved examples, Exercise 5.1 Q.3 and the Miscellaneous Exercise: a parabola and a line, two parabolas, strips along the Y-axis, and a circle or ellipse cut by a chord.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscmai-upper-lower",
      name: "Upper curve minus lower curve: a parabola and a line",
      intuition:
        "Take the area under the upper curve and remove the area under the lower curve; what is left is the region between them. Both areas run over the same interval, so the two integrals join into one: the integral of (upper minus lower). The interval is not given in the question. You find it by solving the two equations together.",
      definition:
        "- **Step 1:** solve the two equations together to get the points of intersection; their x co-ordinates \\(a\\) and \\(b\\) are the limits.\n" +
        "- **Step 2:** decide which curve is on top, by a sketch or by testing one value of \\(x\\) between \\(a\\) and \\(b\\).\n" +
        "- **Step 3:** \\(A = \\displaystyle\\int_a^b \\left[f(x) - g(x)\\right]dx\\), where \\(y = f(x)\\) is the upper curve and \\(y = g(x)\\) the lower.\n" +
        "- This is \\(A = A_1 - A_2\\): \\(A_1\\) is the area under \\(y = f(x)\\) and \\(A_2\\) the area under \\(y = g(x)\\), both from \\(x = a\\) to \\(x = b\\).",
      formula: {
        label: "Area between two curves",
        latex: "A = \\int_a^b f(x)\\,dx - \\int_a^b g(x)\\,dx = \\int_a^b \\left[f(x) - g(x)\\right]dx",
        symbols: [
          { symbol: "\\(f(x)\\)", meaning: "the upper curve" },
          { symbol: "\\(g(x)\\)", meaning: "the lower curve" },
          { symbol: "\\(a, b\\)", meaning: "x co-ordinates of the points of intersection" },
        ],
      },
      authoredExample: {
        prompt: "Find the area of the region bounded by the parabola \\(y = x^2\\) and the line \\(y = x + 6\\).",
        steps: [
          "Points of intersection: \\(x^2 = x + 6\\), so \\(x^2 - x - 6 = 0\\), \\((x - 3)(x + 2) = 0\\), \\(x = -2\\) or \\(x = 3\\). The points are \\((-2, 4)\\) and \\((3, 9)\\).",
          "At \\(x = 0\\) the line gives \\(6\\) and the parabola \\(0\\), so the line is the upper curve on \\([-2, 3]\\).",
          "\\(A = \\displaystyle\\int_{-2}^{3} \\left[(x + 6) - x^2\\right]dx = \\left[\\dfrac{x^2}{2} + 6x - \\dfrac{x^3}{3}\\right]_{-2}^{3}\\).",
          "At \\(x = 3\\): \\(\\dfrac{9}{2} + 18 - 9 = \\dfrac{27}{2}\\). At \\(x = -2\\): \\(2 - 12 + \\dfrac{8}{3} = -\\dfrac{22}{3}\\).",
          "\\(A = \\dfrac{27}{2} + \\dfrac{22}{3} = \\dfrac{81 + 44}{6} = \\dfrac{125}{6}\\).",
        ],
        answer: "The required area is \\(\\dfrac{125}{6}\\) sq. units.",
      },
      selfCheckExample: {
        prompt: "Find the area enclosed between the line \\(y = x\\) and the curve \\(y = x^3\\) in the first quadrant.",
        steps: [
          "\\(x^3 = x\\) gives \\(x = 0\\) or \\(x = 1\\) in the first quadrant; at \\(x = \\dfrac{1}{2}\\) the line is higher.",
          "\\(A = \\displaystyle\\int_0^1 (x - x^3)\\,dx = \\dfrac{1}{2} - \\dfrac{1}{4}\\).",
        ],
        answer: "\\(\\dfrac{1}{4}\\) sq. unit",
      },
      practiceSet: [
        { prompt: "Find the area enclosed between the parabola \\(y = x^2 + 1\\) and the line \\(y = 2\\).", answer: "\\(\\displaystyle\\int_{-1}^{1} (1 - x^2)\\,dx = \\dfrac{4}{3}\\) sq. units" },
        { prompt: "Where do the parabola \\(y = x^2 - 2\\) and the line \\(y = x\\) meet?", answer: "At \\(x = -1\\) and \\(x = 2\\), the points \\((-1, -1)\\) and \\((2, 2)\\)" },
        { prompt: "\\(f(x) \\geq g(x)\\) on \\([a, b]\\). Write the area between \\(y = f(x)\\) and \\(y = g(x)\\) from \\(x = a\\) to \\(x = b\\).", answer: "\\(\\displaystyle\\int_a^b \\left[f(x) - g(x)\\right]dx\\)" },
      ],
      pyqExampleId: "bed3c73a-b422-4e61-8394-5beb302e0ab3",
      traps: [
        {
          title: "Lower minus upper",
          body: "Subtracting the wrong way round gives the right size with a minus sign. Test one value of \\(x\\) between the limits and write which curve is on top before you set up the integral.",
        },
        {
          title: "Guessing the limits",
          body: "The limits are the x co-ordinates of the points where the curves meet, found by solving the equations together. Do not use 0 out of habit: for \\(y = x^2\\) and \\(y = x + 2\\) the left limit is \\(-1\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmai-parabolas",
      name: "The region between two parabolas",
      intuition:
        "A parabola opening to the right, such as y² = 4ax, and one opening upwards, such as x² = 4ay, both pass through the origin and cross once more. Between those two points the right-opening one is on top. Use its upper branch, the positive square root, and subtract the upward one.",
      definition:
        "- Solve together: from \\(x^2 = 4ay\\), \\(y = \\dfrac{x^2}{4a}\\); put it in \\(y^2 = 4ax\\) to get \\(x^4 = 64a^3x\\), so \\(x(x^3 - 64a^3) = 0\\), \\(x = 0\\) or \\(x = 4a\\).\n" +
        "- The points of intersection are \\(O(0, 0)\\) and \\(P(4a, 4a)\\).\n" +
        "- Upper curve \\(y = \\sqrt{4ax} = 2\\sqrt{a}\\sqrt{x}\\); lower curve \\(y = \\dfrac{x^2}{4a}\\).\n" +
        "- \\(A = \\displaystyle\\int_0^{4a} 2\\sqrt{a}\\sqrt{x}\\,dx - \\int_0^{4a} \\dfrac{x^2}{4a}\\,dx = \\dfrac{32a^2}{3} - \\dfrac{16a^2}{3} = \\dfrac{16a^2}{3}\\) sq. units.\n" +
        "- The two parabolas are mirror images of each other in the line \\(y = x\\).",
      formula: {
        label: "Two parabolas through the origin",
        latex: "A = \\int_0^{k} \\left[\\text{upper parabola} - \\text{lower parabola}\\right]dx",
      },
      authoredExample: {
        prompt: "Find the area of the region lying between the parabolas \\(y^2 = 2x\\) and \\(x^2 = 16y\\).",
        steps: [
          "From \\(x^2 = 16y\\), \\(y = \\dfrac{x^2}{16}\\). Put it in \\(y^2 = 2x\\): \\(\\dfrac{x^4}{256} = 2x\\), so \\(x^4 = 512x\\), \\(x(x^3 - 512) = 0\\), \\(x = 0\\) or \\(x = 8\\).",
          "The points of intersection are \\((0, 0)\\) and \\((8, 4)\\).",
          "At \\(x = 2\\): \\(\\sqrt{2x} = 2\\) and \\(\\dfrac{x^2}{16} = \\dfrac{1}{4}\\), so \\(y = \\sqrt{2x}\\) is the upper curve.",
          "\\(A = \\displaystyle\\int_0^8 \\sqrt{2}\\sqrt{x}\\,dx - \\int_0^8 \\dfrac{x^2}{16}\\,dx = \\sqrt{2}\\left[\\dfrac{2}{3}x^{3/2}\\right]_0^8 - \\left[\\dfrac{x^3}{48}\\right]_0^8\\).",
          "\\(8^{3/2} = 16\\sqrt{2}\\), so the first part is \\(\\sqrt{2} \\cdot \\dfrac{2}{3} \\cdot 16\\sqrt{2} = \\dfrac{64}{3}\\); the second is \\(\\dfrac{512}{48} = \\dfrac{32}{3}\\).",
          "\\(A = \\dfrac{64}{3} - \\dfrac{32}{3} = \\dfrac{32}{3}\\).",
        ],
        answer: "The required area is \\(\\dfrac{32}{3}\\) sq. units.",
      },
      selfCheckExample: {
        prompt: "Find the points of intersection of the parabolas \\(y^2 = 6x\\) and \\(x^2 = 6y\\).",
        steps: [
          "\\(y = \\dfrac{x^2}{6}\\), so \\(\\dfrac{x^4}{36} = 6x\\), \\(x(x^3 - 216) = 0\\), \\(x = 0\\) or \\(x = 6\\).",
        ],
        answer: "\\((0, 0)\\) and \\((6, 6)\\)",
      },
      practiceSet: [
        { prompt: "Between \\(x = 0\\) and \\(x = 3\\), which is the upper curve: \\(y = \\sqrt{3x}\\) or \\(y = \\dfrac{x^2}{3}\\)? Test at \\(x = 1\\).", answer: "\\(y = \\sqrt{3x}\\), since \\(\\sqrt{3} > \\dfrac{1}{3}\\)" },
        { prompt: "Evaluate \\(\\displaystyle\\int_0^1 \\left(\\sqrt{x} - x^2\\right)dx\\).", answer: "\\(\\dfrac{2}{3} - \\dfrac{1}{3} = \\dfrac{1}{3}\\)" },
        { prompt: "In which line are the parabolas \\(y^2 = 4ax\\) and \\(x^2 = 4ay\\) mirror images of each other?", answer: "The line \\(y = x\\)" },
      ],
      pyqExampleId: "3824499d-515f-43c2-8b66-7af022f43175",
      traps: [
        {
          title: "Losing the x = 0 root",
          body: "When the equations give \\(x^4 = kx\\), do not cancel \\(x\\). Factor it as \\(x(x^3 - k) = 0\\) and write both roots; the origin is the lower limit.",
        },
        {
          title: "Simplifying x to the power three halves",
          body: "Write \\(x^{3/2} = x\\sqrt{x}\\) before putting in the limit: \\(8^{3/2} = 8\\sqrt{8} = 16\\sqrt{2}\\), not \\(8\\sqrt{2}\\). Most wrong answers to a two-parabola question come from this one line.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmai-strips-y",
      name: "Strips along the Y-axis: right curve minus left curve",
      intuition:
        "When a parabola opens sideways, a vertical strip may meet it twice and the upper and lower curves change along the way. Horizontal strips avoid this. Write both curves as x in terms of y; each horizontal strip runs from the left curve to the right one, so its length is (right minus left) and the limits are the y co-ordinates of the meeting points.",
      definition:
        "- Write each curve as \\(x\\) in terms of \\(y\\): \\(y^2 = 4x\\) becomes \\(x = \\dfrac{y^2}{4}\\).\n" +
        "- Solve together for the \\(y\\) co-ordinates \\(c\\) and \\(d\\) of the points of intersection.\n" +
        "- \\(A = \\displaystyle\\int_c^d \\left[x_{\\text{right}} - x_{\\text{left}}\\right]dy\\).\n" +
        "- Use this when the region is closed on the left and right by curves given easily as \\(x\\) in terms of \\(y\\).",
      formula: {
        label: "Area along the Y-axis",
        latex: "A = \\int_c^d \\left[x_{\\text{right}} - x_{\\text{left}}\\right]dy",
      },
      authoredExample: {
        prompt: "Find the area of the region bounded by the parabola \\(x = y^2\\) and the line \\(x = y + 2\\).",
        steps: [
          "Points of intersection: \\(y^2 = y + 2\\), \\((y - 2)(y + 1) = 0\\), so \\(y = -1\\) or \\(y = 2\\). The points are \\((1, -1)\\) and \\((4, 2)\\).",
          "At \\(y = 0\\) the line gives \\(x = 2\\) and the parabola \\(x = 0\\), so the line is on the right.",
          "\\(A = \\displaystyle\\int_{-1}^{2} \\left[(y + 2) - y^2\\right]dy = \\left[\\dfrac{y^2}{2} + 2y - \\dfrac{y^3}{3}\\right]_{-1}^{2}\\).",
          "\\(= \\left(2 + 4 - \\dfrac{8}{3}\\right) - \\left(\\dfrac{1}{2} - 2 + \\dfrac{1}{3}\\right) = \\dfrac{10}{3} + \\dfrac{7}{6} = \\dfrac{27}{6} = \\dfrac{9}{2}\\).",
        ],
        answer: "The required area is \\(\\dfrac{9}{2}\\) sq. units.",
      },
      selfCheckExample: {
        prompt: "Using horizontal strips, find the area of the region bounded by the parabola \\(y^2 = x\\) and the line \\(x = 4\\).",
        steps: [
          "They meet where \\(y^2 = 4\\), \\(y = -2\\) and \\(y = 2\\). The line \\(x = 4\\) is on the right, the parabola \\(x = y^2\\) on the left.",
          "\\(A = \\displaystyle\\int_{-2}^{2} (4 - y^2)\\,dy = \\left[4y - \\dfrac{y^3}{3}\\right]_{-2}^{2} = 16 - \\dfrac{16}{3}\\).",
        ],
        answer: "\\(\\dfrac{32}{3}\\) sq. units",
      },
      practiceSet: [
        { prompt: "Find the area of the region bounded by the curve \\(x = 1 - y^2\\) and the Y-axis.", answer: "\\(\\displaystyle\\int_{-1}^{1} (1 - y^2)\\,dy = \\dfrac{4}{3}\\) sq. units" },
        { prompt: "Write \\(4y^2 = 9x\\) with \\(x\\) as the subject.", answer: "\\(x = \\dfrac{4y^2}{9}\\)" },
        { prompt: "With horizontal strips, what are the limits of integration?", answer: "The \\(y\\) co-ordinates of the points of intersection" },
      ],
      pyqExampleId: "a516631f-aaed-4936-afa8-eeaf833669f7",
      traps: [
        {
          title: "Vertical strips on a sideways parabola",
          body: "For \\((y - 1)^2 = 4(x + 1)\\) and a line, a vertical strip meets the parabola twice for part of the region, so one integral in \\(x\\) is wrong. Switch to \\(y\\), or split the region.",
        },
        {
          title: "Taking only the upper branch",
          body: "With horizontal strips, \\(y\\) runs over negative values too. Keep the lower limit negative when a meeting point lies below the X-axis; starting at 0 cuts off part of the region.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmai-chord",
      name: "A circle or ellipse cut by a chord",
      intuition:
        "A line joining two points of a circle cuts off a segment. In the first quadrant the arc is the upper curve and the chord the lower one. The answer is the area under the arc minus the area under the chord, When the chord joins the points where the curve meets the two axes, that is a quarter of the circle or ellipse minus a right-angled triangle, which is also a good way to check the answer.",
      definition:
        "- Solve the circle (or ellipse) and the line together to get the end points of the chord.\n" +
        "- Upper curve: the arc, \\(y = \\sqrt{a^2 - x^2}\\) for a circle, \\(y = \\dfrac{b}{a}\\sqrt{a^2 - x^2}\\) for an ellipse. Lower curve: the line.\n" +
        "- \\(A = \\displaystyle\\int \\left[\\text{arc} - \\text{line}\\right]dx\\), using \\(\\displaystyle\\int \\sqrt{a^2 - x^2}\\,dx = \\dfrac{x}{2}\\sqrt{a^2 - x^2} + \\dfrac{a^2}{2}\\sin^{-1}\\dfrac{x}{a}\\).\n" +
        "- Check: (area of the quarter) minus (area of the triangle under the chord).",
      formula: {
        label: "Segment cut off by a chord",
        latex: "A = \\int_0^a \\left[\\frac{b}{a}\\sqrt{a^2 - x^2} - b\\left(1 - \\frac{x}{a}\\right)\\right]dx = \\frac{\\pi ab}{4} - \\frac{ab}{2}",
      },
      authoredExample: {
        prompt: "Find the area of the smaller region bounded by the ellipse \\(\\dfrac{x^2}{9} + \\dfrac{y^2}{4} = 1\\) and the line \\(\\dfrac{x}{3} + \\dfrac{y}{2} = 1\\).",
        steps: [
          "The line meets the ellipse at \\((3, 0)\\) and \\((0, 2)\\), so the region lies in the first quadrant, from \\(x = 0\\) to \\(x = 3\\).",
          "Upper curve (the ellipse): \\(y = \\dfrac{2}{3}\\sqrt{9 - x^2}\\). Lower curve (the line): \\(y = 2 - \\dfrac{2x}{3}\\).",
          "\\(\\displaystyle\\int_0^3 \\dfrac{2}{3}\\sqrt{9 - x^2}\\,dx = \\dfrac{2}{3}\\left[\\dfrac{x}{2}\\sqrt{9 - x^2} + \\dfrac{9}{2}\\sin^{-1}\\dfrac{x}{3}\\right]_0^3 = \\dfrac{2}{3} \\cdot \\dfrac{9}{2} \\cdot \\dfrac{\\pi}{2} = \\dfrac{3\\pi}{2}\\).",
          "\\(\\displaystyle\\int_0^3 \\left(2 - \\dfrac{2x}{3}\\right)dx = \\left[2x - \\dfrac{x^2}{3}\\right]_0^3 = 6 - 3 = 3\\).",
          "\\(A = \\dfrac{3\\pi}{2} - 3\\).",
        ],
        answer: "The required area is \\(\\left(\\dfrac{3\\pi}{2} - 3\\right)\\) sq. units.",
      },
      selfCheckExample: {
        prompt: "Find the area bounded by the ellipse \\(\\dfrac{x^2}{16} + \\dfrac{y^2}{9} = 1\\) and the line \\(\\dfrac{x}{4} + \\dfrac{y}{3} = 1\\).",
        steps: ["Quarter of the ellipse: \\(\\dfrac{\\pi(4)(3)}{4} = 3\\pi\\). Triangle under the chord: \\(\\dfrac{1}{2}(4)(3) = 6\\)."],
        answer: "\\((3\\pi - 6)\\) sq. units",
      },
      practiceSet: [
        { prompt: "Using integration, find the area of the circle \\(x^2 + y^2 = 9\\) lying in the first quadrant.", answer: "\\(\\dfrac{9\\pi}{4}\\) sq. units" },
        { prompt: "Using integration, find the area of the triangle formed by the line \\(\\dfrac{x}{4} + \\dfrac{y}{2} = 1\\) and the co-ordinate axes.", answer: "\\(\\displaystyle\\int_0^4 \\left(2 - \\dfrac{x}{2}\\right)dx = 4\\) sq. units" },
      ],
      pyqExampleId: "6191e1a8-3bae-41f4-8359-85d50a000a8d",
      traps: [
        {
          title: "Finding the arc area and stopping",
          body: "The integral of the arc alone is the whole quarter. The question asks for the part between the arc and the chord, so the area under the line must be subtracted.",
        },
        {
          title: "Wrong value of the inverse sine",
          body: "At the upper limit \\(x = a\\), \\(\\sin^{-1}1 = \\dfrac{\\pi}{2}\\); at \\(x = 0\\), \\(\\sin^{-1}0 = 0\\). Writing \\(\\pi\\) for \\(\\sin^{-1}1\\) doubles the arc area.",
        },
        {
          title: "Leaving pi inside a decimal",
          body: "Leave the answer in terms of \\(\\pi\\), with its unit, unless the question asks for a decimal. Rounding \\(\\pi\\) early costs accuracy, and a decimal with no exact form shown can lose the final mark.",
        },
      ],
    },
  ],
};
