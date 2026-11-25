import type { SubtopicNote } from "@/app/notes/_types";

export const CB_MA_AI_BOUNDED_NOTE: SubtopicNote = {
  subtopicName: "Area Bounded by a Curve and a Line",
  title: "Area Bounded by a Curve and a Line",
  oneLineDefinition:
    "When a line closes the region, find where the line meets the curve, decide which boundary is on top over each part, and add the areas under the simple curves part by part.",
  whyItMatters:
    "46 questions, forty-one of them from board papers. The board asked a strip or segment of a circle or ellipse cut off by vertical lines every year from 2023 to 2026, and a parabola cut by a line in 2022, 2024, 2025 and 2026. Regions closed only by straight lines (a triangle from three lines or three vertices, a trapezium, a line crossing the x-axis) came every year from 2023 to 2026, including the 2026 case study on a triangular park. A line through the origin meeting a circle came in 2022, 2023 and 2025. In 2022 and 2023 the board also asked the area between a parabola, circle or ellipse and a line crossing it twice, which the present book no longer teaches. The textbook adds Exercise 8.1 Q3 and Q4, Miscellaneous Example 3 and Miscellaneous Exercise Q1.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbmai-cut-by-line",
      name: "A circle, ellipse or parabola cut by a line parallel to an axis",
      intuition:
        "A vertical line \\(x = k\\) cuts a circle, an ellipse or a sideways parabola above and below the \\(x\\)-axis. The piece it cuts off is symmetric about the \\(x\\)-axis, so find the part above the axis and double it. A horizontal line \\(y = k\\) across an upward parabola or a circle is easier with horizontal strips, again doubled because of the symmetry about the \\(y\\)-axis.",
      definition:
        "- Find where the line meets the curve: put \\(x = k\\) (or \\(y = k\\)) into the equation.\n" +
        "- **Segment of a circle** \\(x^2 + y^2 = a^2\\) cut off by \\(x = k\\) (\\(0 < k < a\\)): the minor segment is the part from \\(x = k\\) to \\(x = a\\), and its area is \\(2\\displaystyle\\int_k^a \\sqrt{a^2 - x^2}\\,dx\\).\n" +
        "- **Strip between** \\(x = -k\\) and \\(x = k\\): the area is \\(4\\displaystyle\\int_0^k y\\,dx\\) for a circle or ellipse, \\(2\\displaystyle\\int_0^k y\\,dx\\) if only the part above the \\(x\\)-axis is asked.\n" +
        "- **Parabola** \\(y^2 = 4ax\\) and \\(x = k\\): area \\(= 2\\displaystyle\\int_0^k 2\\sqrt{ax}\\,dx\\).\n" +
        "- Read the question for the boundaries: if the \\(x\\)-axis is one of them, do not double.",
      formula: {
        label: "Minor segment of a circle cut off by x = k",
        latex: "A = 2\\int_k^a \\sqrt{a^2 - x^2}\\,dx",
        symbols: [
          { symbol: "\\(a\\)", meaning: "the radius of the circle" },
          { symbol: "\\(x = k\\)", meaning: "the chord, with k between 0 and a" },
        ],
      },
      authoredExample: {
        prompt: "Using integration, find the area of the region of the circle \\(x^2 + y^2 = 36\\) that lies between the lines \\(x = -3\\) and \\(x = 3\\).",
        steps: [
          "Sketch: a circle of radius 6 about the origin, with the vertical lines \\(x = -3\\) and \\(x = 3\\) cutting it. Shade the band between the two lines.",
          "The lines meet the circle where \\(y^2 = 36 - 9 = 27\\), at \\((\\pm 3, \\pm 3\\sqrt{3})\\).",
          "The band is symmetric about both axes, so Area \\(= 4\\displaystyle\\int_0^3 \\sqrt{36 - x^2}\\,dx\\).",
          "\\(= 4\\left[\\dfrac{x}{2}\\sqrt{36 - x^2} + 18\\sin^{-1}\\dfrac{x}{6}\\right]_0^3\\).",
          "At \\(x = 3\\): \\(\\dfrac{3}{2}\\sqrt{27} + 18\\sin^{-1}\\dfrac{1}{2} = \\dfrac{9\\sqrt{3}}{2} + 18 \\times \\dfrac{\\pi}{6} = \\dfrac{9\\sqrt{3}}{2} + 3\\pi\\). At \\(x = 0\\): 0.",
          "Area \\(= 4\\left(\\dfrac{9\\sqrt{3}}{2} + 3\\pi\\right) = 18\\sqrt{3} + 12\\pi\\).",
          "The required area is \\(18\\sqrt{3} + 12\\pi\\) square units.",
        ],
        answer: "\\(18\\sqrt{3} + 12\\pi\\) square units",
      },
      selfCheckExample: {
        prompt: "Using integration, find the area of the region bounded by the parabola \\(y^2 = 6x\\) and the line \\(x = 6\\).",
        steps: [
          "The line meets the parabola where \\(y^2 = 36\\), at \\((6, 6)\\) and \\((6, -6)\\).",
          "The region is symmetric about the \\(x\\)-axis; above it \\(y = \\sqrt{6x}\\).",
          "Area \\(= 2\\displaystyle\\int_0^6 \\sqrt{6}\\sqrt{x}\\,dx = 2\\sqrt{6} \\times \\dfrac{2}{3}\\left[x^{3/2}\\right]_0^6\\).",
          "\\(= \\dfrac{4\\sqrt{6}}{3} \\times 6\\sqrt{6} = \\dfrac{4 \\times 36}{3} = 48\\).",
        ],
        answer: "48 square units",
      },
      practiceSet: [
        { prompt: "Using integration, find the area of the region bounded by the parabola \\(y = x^2\\) and the line \\(y = 9\\).", answer: "36 square units", method: "\\(2\\displaystyle\\int_0^9 \\sqrt{y}\\,dy\\)" },
        { prompt: "Using integration, find the area of the part of the ellipse \\(\\dfrac{x^2}{16} + \\dfrac{y^2}{9} = 1\\) that lies above the \\(x\\)-axis between \\(x = 0\\) and \\(x = 2\\).", answer: "\\(\\left(\\dfrac{3\\sqrt{3}}{2} + \\pi\\right)\\) square units", method: "\\(\\dfrac{3}{4}\\displaystyle\\int_0^2 \\sqrt{16 - x^2}\\,dx\\)" },
        { prompt: "Using integration, find the area of the region bounded by the parabola \\(y = x^2\\) and the line \\(y = 1\\).", answer: "\\(\\dfrac{4}{3}\\) square units" },
      ],
      pyqExampleId: "4e8a9026-de57-46dd-9c7c-8351413bf3fc",
      traps: [
        {
          title: "Finding the major segment",
          body: "The minor segment is the smaller piece, on the far side of the chord from the centre. For \\(x^2 + y^2 = 36\\) cut by \\(x = 3\\) it runs from \\(x = 3\\) to \\(x = 6\\), not from \\(x = -6\\) to \\(x = 3\\).",
        },
        {
          title: "Using one half of a parabola",
          body: "The line \\(x = k\\) cuts \\(y^2 = 4ax\\) above and below the axis. Unless the \\(x\\)-axis is named as a boundary, double the integral of the upper half; forgetting the 2 gives half the answer.",
        },
        {
          title: "An ellipse that is a circle",
          body: "\\(\\dfrac{x^2}{36} + \\dfrac{y^2}{36} = 1\\) has equal denominators, so it is the circle \\(x^2 + y^2 = 36\\). Say so in your sketch and use the circle's radius.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmai-straight-lines",
      name: "Regions closed by straight lines",
      intuition:
        "A triangle or a trapezium can be found by integration too: each side is a line, and the area is the area under the top sides minus the area under the bottom side. The board asks for it by integration, so the triangle formula is only your check.",
      definition:
        "- **Find the vertices** by solving the lines in pairs, or **find the lines** from the vertices (two-point or intercept form).\n" +
        "- Over the whole span the bottom side is one line; the top changes at the middle vertex, so split the integral there.\n" +
        "- Area \\(= \\displaystyle\\int (\\text{top line})\\,dx - \\int (\\text{bottom line})\\,dx\\), each over its own interval.\n" +
        "- Between two horizontal lines and the \\(y\\)-axis, write the slanting line as \\(x = g(y)\\) and integrate in \\(y\\).\n" +
        "- A line that crosses the \\(x\\)-axis inside the strip is split at the crossing, as for any curve below the axis.",
      formula: {
        label: "Triangle whose top side changes at x = q",
        latex: "A = \\int_p^q y_1\\,dx + \\int_q^r y_2\\,dx - \\int_p^r y_3\\,dx",
        symbols: [
          { symbol: "\\(y_1, y_2\\)", meaning: "the two top sides, meeting at the middle vertex x = q" },
          { symbol: "\\(y_3\\)", meaning: "the bottom side, from x = p to x = r" },
        ],
      },
      authoredExample: {
        prompt: "Using integration, find the area of the triangle with vertices \\(A(1, 1)\\), \\(B(2, 4)\\) and \\(C(4, 2)\\).",
        steps: [
          "Side \\(AB\\): slope \\(\\dfrac{4 - 1}{2 - 1} = 3\\), so \\(y = 3x - 2\\).",
          "Side \\(BC\\): slope \\(\\dfrac{2 - 4}{4 - 2} = -1\\), so \\(y = 6 - x\\).",
          "Side \\(AC\\): slope \\(\\dfrac{2 - 1}{4 - 1} = \\dfrac{1}{3}\\), so \\(y = \\dfrac{x + 2}{3}\\).",
          "Sketch: \\(AC\\) is the bottom side from \\(x = 1\\) to \\(x = 4\\); the top is \\(AB\\) on \\([1, 2]\\) and \\(BC\\) on \\([2, 4]\\).",
          "Area \\(= \\displaystyle\\int_1^2 (3x - 2)\\,dx + \\int_2^4 (6 - x)\\,dx - \\int_1^4 \\dfrac{x + 2}{3}\\,dx\\).",
          "\\(\\left[\\dfrac{3x^2}{2} - 2x\\right]_1^2 = 2 + \\dfrac{1}{2} = \\dfrac{5}{2}\\); \\(\\left[6x - \\dfrac{x^2}{2}\\right]_2^4 = 16 - 10 = 6\\); \\(\\dfrac{1}{3}\\left[\\dfrac{x^2}{2} + 2x\\right]_1^4 = \\dfrac{1}{3} \\times \\dfrac{27}{2} = \\dfrac{9}{2}\\).",
          "Area \\(= \\dfrac{5}{2} + 6 - \\dfrac{9}{2} = 4\\).",
          "The area of the triangle is 4 square units.",
        ],
        answer: "4 square units",
      },
      selfCheckExample: {
        prompt: "Using integration, find the area of the region bounded by the line \\(3x + y = 12\\), the \\(y\\)-axis and the lines \\(y = 0\\) and \\(y = 3\\).",
        steps: [
          "Write the line as \\(x = \\dfrac{12 - y}{3}\\) and use horizontal strips.",
          "Area \\(= \\displaystyle\\int_0^3 \\dfrac{12 - y}{3}\\,dy = \\dfrac{1}{3}\\left[12y - \\dfrac{y^2}{2}\\right]_0^3\\).",
          "\\(= \\dfrac{1}{3}\\left(36 - \\dfrac{9}{2}\\right) = \\dfrac{21}{2}\\).",
          "Check: a trapezium with parallel sides 4 and 3 and height 3 has area \\(\\dfrac{1}{2}(4 + 3)(3) = \\dfrac{21}{2}\\).",
        ],
        answer: "\\(\\dfrac{21}{2}\\) square units",
      },
      practiceSet: [
        { prompt: "Using integration, find the area of the region bounded by the line \\(y = x - 3\\), the \\(x\\)-axis and the lines \\(x = 0\\) and \\(x = 2\\).", answer: "4 square units", method: "The line is below the axis, so the area is \\(\\displaystyle\\int_0^2 (3 - x)\\,dx\\)." },
        { prompt: "Using integration, find the area of the triangle formed by the line \\(\\dfrac{x}{6} + \\dfrac{y}{2} = 1\\) and the coordinate axes.", answer: "6 square units" },
        { prompt: "Find the equation of the line joining \\((0, 6)\\) and \\((-3, 0)\\).", answer: "\\(y = 2x + 6\\)" },
      ],
      pyqExampleId: "4ea84f44-ba5b-4941-9b2e-0580565045f2",
      traps: [
        {
          title: "Subtracting the bottom side over half the span",
          body: "The bottom side of the triangle runs under the whole region. Subtract its integral over the full span from the first vertex to the last, not only over one of the two pieces.",
        },
        {
          title: "One top line for the whole triangle",
          body: "The top boundary changes at the middle vertex. Using one line across the whole span counts a region that is not in the triangle; split the integral at that vertex.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmai-line-meets-curve",
      name: "A line meeting a circle or parabola: split at the meeting point",
      intuition:
        "A region in the first quadrant between the \\(x\\)-axis, a line through the origin and a circle has two tops: the line up to the point where it meets the circle, and the circle after it. So find the meeting point, then add the area under the line and the area under the circle, each over its own interval.",
      definition:
        "- Put the line into the curve's equation to find the meeting point; keep the root in the quadrant asked.\n" +
        "- Area \\(= \\displaystyle\\int_0^{\\alpha} (\\text{line})\\,dx + \\int_{\\alpha}^{a} (\\text{curve})\\,dx\\), where \\(x = \\alpha\\) is the meeting point.\n" +
        "- If the \\(y\\)-axis is the boundary instead of the \\(x\\)-axis, use horizontal strips and split at the meeting point's \\(y\\).\n" +
        "- The same split works for a parabola, a line and the \\(x\\)-axis: under the line on one side of the meeting point, under the parabola on the other.\n" +
        "- Check: between the \\(x\\)-axis, a line through the origin at angle \\(\\theta\\) and a circle of radius \\(r\\), the region is a sector of area \\(\\dfrac{1}{2}r^2\\theta\\).",
      formula: {
        label: "Region with two tops meeting at x = α",
        latex: "A = \\int_0^{\\alpha} y_{\\text{line}}\\,dx + \\int_{\\alpha}^{a} y_{\\text{curve}}\\,dx",
        symbols: [
          { symbol: "\\(\\alpha\\)", meaning: "the x-coordinate where the line meets the curve" },
          { symbol: "\\(a\\)", meaning: "where the curve meets the x-axis" },
        ],
      },
      authoredExample: {
        prompt: "Using integration, find the area of the region in the first quadrant bounded by the \\(x\\)-axis, the line \\(y = \\sqrt{3}\\,x\\) and the circle \\(x^2 + y^2 = 16\\).",
        steps: [
          "Meeting point: \\(x^2 + 3x^2 = 16\\), so \\(x^2 = 4\\) and, in the first quadrant, \\(x = 2\\), \\(y = 2\\sqrt{3}\\).",
          "Sketch: shade the region under the line from \\(x = 0\\) to \\(x = 2\\), then under the circle from \\(x = 2\\) to \\(x = 4\\), down to the \\(x\\)-axis.",
          "Area \\(= \\displaystyle\\int_0^2 \\sqrt{3}\\,x\\,dx + \\int_2^4 \\sqrt{16 - x^2}\\,dx\\).",
          "First part: \\(\\sqrt{3}\\left[\\dfrac{x^2}{2}\\right]_0^2 = 2\\sqrt{3}\\).",
          "Second part: \\(\\left[\\dfrac{x}{2}\\sqrt{16 - x^2} + 8\\sin^{-1}\\dfrac{x}{4}\\right]_2^4 = 4\\pi - \\left(2\\sqrt{3} + \\dfrac{4\\pi}{3}\\right) = \\dfrac{8\\pi}{3} - 2\\sqrt{3}\\).",
          "Area \\(= 2\\sqrt{3} + \\dfrac{8\\pi}{3} - 2\\sqrt{3} = \\dfrac{8\\pi}{3}\\).",
          "The required area is \\(\\dfrac{8\\pi}{3}\\) square units.",
        ],
        answer: "\\(\\dfrac{8\\pi}{3}\\) square units",
      },
      selfCheckExample: {
        prompt: "Using integration, find the area of the region in the first quadrant bounded by the parabola \\(y = x^2\\), the line \\(y = 6 - x\\) and the \\(x\\)-axis.",
        steps: [
          "Meeting point: \\(x^2 = 6 - x\\), so \\((x + 3)(x - 2) = 0\\); in the first quadrant \\(x = 2\\). The line meets the \\(x\\)-axis at \\(x = 6\\).",
          "Area \\(= \\displaystyle\\int_0^2 x^2\\,dx + \\int_2^6 (6 - x)\\,dx\\).",
          "\\(= \\dfrac{8}{3} + \\left[6x - \\dfrac{x^2}{2}\\right]_2^6 = \\dfrac{8}{3} + 8 = \\dfrac{32}{3}\\).",
        ],
        answer: "\\(\\dfrac{32}{3}\\) square units",
      },
      practiceSet: [
        { prompt: "Using integration, find the area of the region in the first quadrant bounded by \\(y = x^2\\), the line \\(y = 4 - 3x\\) and the \\(x\\)-axis.", answer: "\\(\\dfrac{1}{2}\\) square unit", method: "Meeting point \\(x = 1\\): \\(\\dfrac{1}{3} + \\dfrac{1}{6}\\)" },
        { prompt: "Using integration, find the area of the region in the first quadrant bounded by the \\(y\\)-axis, the line \\(y = x\\) and the circle \\(x^2 + y^2 = 2\\).", answer: "\\(\\dfrac{\\pi}{4}\\) square unit", method: "Horizontal strips, split at \\(y = 1\\)" },
        { prompt: "Using integration, find the area of the region to the left of the \\(y\\)-axis bounded by \\(y = x^2\\), the line \\(y = 2x + 3\\) and the \\(x\\)-axis.", answer: "\\(\\dfrac{7}{12}\\) square unit", method: "Under the line on \\(\\left[-\\dfrac{3}{2}, -1\\right]\\), under the parabola on \\([-1, 0]\\)" },
      ],
      pyqExampleId: "a2173f26-3672-4ef2-a4c4-16f81b19d596",
      traps: [
        {
          title: "Using the circle all the way",
          body: "Before the meeting point the region is capped by the line, not the circle. Integrating the circle from 0 gives the whole quarter circle, which is too big.",
        },
        {
          title: "The wrong root",
          body: "\\(x^2 + 3x^2 = 16\\) gives \\(x = \\pm 2\\). In the first quadrant keep \\(x = 2\\); the negative root belongs to the third quadrant.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmai-between-curves",
      name: "Area between two curves (older board papers)",
      intuition:
        "When a line crosses a parabola, circle or ellipse twice, it closes a region between them. Between the two meeting points one boundary is on top all the way, so the area is the area under the top boundary minus the area under the bottom one. **The present NCERT book does not teach area between two curves.** The board asked it in 2022 (seven times) and 2023 (three times) and not since, so give it less time than the rest of this chapter.",
      definition:
        "- Solve the two equations together to find the meeting points; their \\(x\\)-values are the limits.\n" +
        "- Test one \\(x\\) between them to see which boundary is on top.\n" +
        "- Area \\(= \\displaystyle\\int_{\\alpha}^{\\beta} \\big(y_{\\text{top}} - y_{\\text{bottom}}\\big)\\,dx\\).\n" +
        "- A set like \\(\\{(x, y) : x^2 \\le y \\le 2x\\}\\) names the bottom curve first and the top curve last.\n" +
        "- If both boundaries are simpler as \\(x = g(y)\\), use \\(\\displaystyle\\int (x_{\\text{right}} - x_{\\text{left}})\\,dy\\).",
      formula: {
        label: "Area between two curves",
        latex: "A = \\int_{\\alpha}^{\\beta} \\big(y_{\\text{top}} - y_{\\text{bottom}}\\big)\\,dx",
        symbols: [
          { symbol: "\\(\\alpha, \\beta\\)", meaning: "the x-coordinates where the two curves meet" },
        ],
      },
      authoredExample: {
        prompt: "Using integration, find the area of the region enclosed by the parabola \\(y = x^2\\) and the line \\(y = 2x\\).",
        steps: [
          "Sketch: an upward parabola through the origin and a line through the origin, crossing it again higher up.",
          "Meeting points: \\(x^2 = 2x\\), so \\(x(x - 2) = 0\\): \\((0, 0)\\) and \\((2, 4)\\).",
          "At \\(x = 1\\) the line gives 2 and the parabola gives 1, so the line is on top on \\([0, 2]\\).",
          "Area \\(= \\displaystyle\\int_0^2 (2x - x^2)\\,dx = \\left[x^2 - \\dfrac{x^3}{3}\\right]_0^2\\).",
          "\\(= 4 - \\dfrac{8}{3} = \\dfrac{4}{3}\\).",
          "The required area is \\(\\dfrac{4}{3}\\) square units.",
        ],
        answer: "\\(\\dfrac{4}{3}\\) square units",
      },
      selfCheckExample: {
        prompt: "Using integration, find the area of the smaller region bounded by the circle \\(x^2 + y^2 = 16\\) and the line \\(x + y = 4\\).",
        steps: [
          "The line meets the axes at \\((4, 0)\\) and \\((0, 4)\\), which lie on the circle; these are the meeting points.",
          "The smaller region lies above the chord in the first quadrant: Area \\(= \\displaystyle\\int_0^4 \\sqrt{16 - x^2}\\,dx - \\int_0^4 (4 - x)\\,dx\\).",
          "\\(\\left[\\dfrac{x}{2}\\sqrt{16 - x^2} + 8\\sin^{-1}\\dfrac{x}{4}\\right]_0^4 = 4\\pi\\) and \\(\\left[4x - \\dfrac{x^2}{2}\\right]_0^4 = 8\\).",
          "Area \\(= 4\\pi - 8\\).",
        ],
        answer: "\\((4\\pi - 8)\\) square units",
      },
      practiceSet: [
        { prompt: "Using integration, find the area enclosed by the parabolas \\(y = x^2\\) and \\(y = 4x - x^2\\).", answer: "\\(\\dfrac{8}{3}\\) square units", method: "They meet at \\(x = 0\\) and \\(x = 2\\); \\(\\displaystyle\\int_0^2 (4x - 2x^2)\\,dx\\)" },
        { prompt: "Using integration, find the area of the smaller region cut off from the ellipse \\(\\dfrac{x^2}{16} + \\dfrac{y^2}{4} = 1\\) by the line \\(\\dfrac{x}{4} + \\dfrac{y}{2} = 1\\).", answer: "\\((2\\pi - 4)\\) square units", method: "Quarter ellipse \\(2\\pi\\) minus the triangle 4" },
        { prompt: "Using integration, find the area of the region enclosed by \\(y = \\sqrt{x}\\) and \\(y = x^2\\).", answer: "\\(\\dfrac{1}{3}\\) square unit" },
      ],
      pyqExampleId: "30371255-1c64-4b15-b791-280419bd9f9a",
      traps: [
        {
          title: "Bottom minus top",
          body: "Subtracting the upper curve from the lower one gives a negative number. Test a point between the meeting points to see which curve is on top, and write top minus bottom.",
        },
        {
          title: "The larger region",
          body: "\"The smaller region\" between a circle and a chord is the cap on the side of the chord away from the centre. The quarter circle minus the triangle under the chord gives it; the rest of the disc is the larger region.",
        },
      ],
    },
  ],
};
