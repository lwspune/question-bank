import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_CG_PAIRS_NOTE: SubtopicNote = {
  subtopicName: "Parallel and Perpendicular Lines",
  title: "Parallel and Perpendicular Lines",
  oneLineDefinition:
    "Compare the slopes of two lines to tell parallel from perpendicular, build the perpendicular bisector of a segment, and find the shortest distance from a point to a line.",
  whyItMatters:
    "Six questions in the bank, and four of the chapter's six MODERATE rows are here. Each joins two earlier steps (a midpoint and a slope, or a slope and a squared unknown), so the page is where the chapter's speed is won or lost. Two are a single negative-reciprocal step and take seconds.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssccgpp-slopes",
      name: "Slopes of parallel and perpendicular lines",
      intuition:
        "Parallel lines climb at the same rate, so their slopes are equal. Turn a line through a right angle and its slope flips over and changes sign, so the two slopes multiply to minus 1.",
      definition:
        "- **Parallel:** \\(m_1 = m_2\\). For \\(a_1x + b_1y + c_1 = 0\\) and \\(a_2x + b_2y + c_2 = 0\\) this is \\(\\frac{a_1}{a_2} = \\frac{b_1}{b_2}\\). If \\(\\frac{c_1}{c_2}\\) is the same ratio too, the two equations are one line, not two parallel lines.\n" +
        "- **Perpendicular:** \\(m_1 \\times m_2 = -1\\), so the new slope is the negative reciprocal: slope 2 becomes \\(-\\frac{1}{2}\\). In coefficient form, \\(a_1a_2 + b_1b_2 = 0\\).\n" +
        "- **Fast route:** a line parallel to \\(ax + by + c = 0\\) is \\(ax + by + k = 0\\) (keep the coefficients). A line perpendicular to it is \\(bx - ay + k = 0\\) (swap them and change one sign). Then fix \\(k\\) with the given point.\n" +
        "- A horizontal line and a vertical line are perpendicular, though the product rule cannot be used: a vertical line has no slope.",
      formula: {
        label: "Parallel and perpendicular conditions",
        latex: "m_1 = m_2 \\qquad m_1 m_2 = -1 \\qquad \\frac{a_1}{a_2} = \\frac{b_1}{b_2} \\qquad a_1a_2 + b_1b_2 = 0",
        symbols: [
          { symbol: "\\(m_1, m_2\\)", meaning: "the slopes of the two lines" },
          { symbol: "\\(a, b\\)", meaning: "the coefficients of x and y in ax + by + c = 0" },
        ],
      },
      authoredExample: {
        prompt:
          "For the line \\(3x - 4y + 2 = 0\\), find the slope of a parallel line and of a perpendicular line, and write the perpendicular line through the origin.",
        steps: [
          "Slope of the given line: \\(-\\frac{3}{-4} = \\frac{3}{4}\\). A parallel line also has slope \\(\\frac{3}{4}\\).",
          "Perpendicular slope: flip and change sign, \\(-\\frac{4}{3}\\). Check: \\(\\frac{3}{4} \\times \\left(-\\frac{4}{3}\\right) = -1\\).",
          "Fast route: swap the coefficients and change one sign, \\(4x + 3y + k = 0\\). Through the origin, \\(k = 0\\).",
        ],
        answer: "Parallel \\(\\frac{3}{4}\\), perpendicular \\(-\\frac{4}{3}\\); the line is \\(4x + 3y = 0\\)",
      },
      selfCheckExample: {
        prompt: "For what value of \\(k\\) are the lines \\(kx + 2y = 5\\) and \\(3x - y = 1\\) perpendicular?",
        steps: [
          "\\(a_1a_2 + b_1b_2 = 0\\): \\(3k + 2(-1) = 0\\), so \\(k = \\frac{2}{3}\\).",
          "Check with slopes: \\(-\\frac{k}{2} = -\\frac{1}{3}\\) and \\(3\\), product \\(-1\\).",
        ],
        answer: "\\(k = \\frac{2}{3}\\)",
      },
      practiceSet: [
        { prompt: "What is the slope of a line perpendicular to \\(y = 5x - 2\\)?", answer: "\\(-\\frac{1}{5}\\)" },
        { prompt: "Are the lines \\(2x + 3y = 7\\) and \\(4x + 6y = 1\\) parallel?", answer: "Yes", method: "\\(\\frac{2}{4} = \\frac{3}{6}\\), and the constants are not in that ratio, so they are two separate lines." },
        { prompt: "For what value of \\(k\\) is \\(2x + ky = 3\\) parallel to \\(4x + 8y = 9\\)?", answer: "\\(k = 4\\)" },
        { prompt: "Are the lines \\(y = 2x + 1\\) and \\(x + 2y = 6\\) perpendicular?", answer: "Yes", method: "Slopes 2 and \\(-\\frac{1}{2}\\) multiply to \\(-1\\)." },
      ],
      pyqExampleId: "18a85f38-6006-4276-8f04-d99d628ed9e3",
      traps: [
        {
          title: "Taking only the reciprocal, or only the negative",
          body:
            "The perpendicular slope to 6 is \\(-\\frac{1}{6}\\). The options print \\(\\frac{1}{6}\\), \\(-6\\) and 6 as well; check that the two slopes multiply to exactly \\(-1\\).",
        },
        {
          title: "Keeping both roots when the unknown is squared",
          body:
            "A parallel condition such as \\(\\frac{2}{k + 1} = \\frac{k + 1}{8}\\) gives \\(k + 1 = \\pm 4\\), two values of \\(k\\). Keep only the one the question allows (for example \\(k > 0\\)), and check it does not make the two equations the same line.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssccgpp-bisector",
      name: "Perpendicular bisector of a segment",
      intuition:
        "The perpendicular bisector cuts a segment in half at a right angle. Every point on it is the same distance from the two ends, which gives both a way to build it and a fast way to check an option.",
      definition:
        "- **Build it in three steps:** find the midpoint of the segment, find the segment's slope, then write the line through the midpoint with the negative reciprocal slope.\n" +
        "- **Equal-distance check:** any point on the bisector is equally far from both ends. Take the y-intercept of an option and compare its squared distances from the two ends; the right option makes them equal.\n" +
        "- A horizontal segment has a vertical bisector \\(x = \\) (midpoint x), and a vertical segment has a horizontal one.",
      authoredExample: {
        prompt: "Find the perpendicular bisector of the segment joining \\(A(-1, 1)\\) and \\(B(7, 5)\\).",
        steps: [
          "Midpoint: \\(\\left(\\frac{-1 + 7}{2}, \\frac{1 + 5}{2}\\right) = (3, 3)\\).",
          "Slope of AB: \\(\\frac{5 - 1}{7 - (-1)} = \\frac{4}{8} = \\frac{1}{2}\\), so the bisector has slope \\(-2\\).",
          "\\(y - 3 = -2(x - 3)\\), so \\(y = -2x + 9\\).",
          "Check with \\((0, 9)\\): its squared distance from A is \\(1 + 64 = 65\\), and from B it is \\(49 + 16 = 65\\).",
        ],
        answer: "\\(y = -2x + 9\\)",
      },
      selfCheckExample: {
        prompt: "Find the y-intercept of the perpendicular bisector of the segment joining \\((-3, 1)\\) and \\((1, 9)\\).",
        steps: [
          "Midpoint \\((-1, 5)\\). Slope of the segment \\(\\frac{8}{4} = 2\\), so the bisector has slope \\(-\\frac{1}{2}\\).",
          "\\(y - 5 = -\\frac{1}{2}(x + 1)\\), so \\(y = -\\frac{1}{2}x + 4.5\\).",
        ],
        answer: "4.5",
      },
      practiceSet: [
        { prompt: "What is the slope of the perpendicular bisector of the segment joining \\((1, 2)\\) and \\((3, 8)\\)?", answer: "\\(-\\frac{1}{3}\\)" },
        { prompt: "Does the point \\((4, 7)\\) lie on the perpendicular bisector of the segment joining \\((0, 0)\\) and \\((8, 0)\\)?", answer: "Yes", method: "The bisector is the vertical line \\(x = 4\\)." },
        { prompt: "Find the perpendicular bisector of the segment joining \\((2, 0)\\) and \\((0, 2)\\).", answer: "\\(y = x\\)" },
        { prompt: "A point P is at the same distance from \\((1, 0)\\) and \\((5, 0)\\). What is the x-coordinate of P?", answer: "3" },
      ],
      pyqExampleId: "bb1208d4-2b01-44d3-b6f0-9714c6f6c4f8",
      traps: [
        {
          title: "Drawing the bisector through an end instead of the midpoint",
          body:
            "The perpendicular bisector passes through the midpoint of the segment. A line through one end with the perpendicular slope is perpendicular, but it is not the bisector.",
        },
        {
          title: "Giving the bisector the segment's own slope",
          body:
            "The bisector crosses the segment at a right angle, so its slope is the negative reciprocal of the segment's slope. A line with the segment's own slope through the midpoint is the segment's line itself.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssccgpp-distance",
      name: "Shortest distance from a point to a line",
      intuition:
        "The shortest path from a point to a line meets the line at a right angle. The formula measures that perpendicular directly, so you never need to find where it lands.",
      definition:
        "- Write the line as \\(ax + by + c = 0\\). Put the point into the left side, take the absolute value, and divide by \\(\\sqrt{a^2 + b^2}\\).\n" +
        "- From the origin the top is just \\(|c|\\).\n" +
        "- **Two parallel lines** \\(ax + by + c_1 = 0\\) and \\(ax + by + c_2 = 0\\) are \\(\\frac{|c_1 - c_2|}{\\sqrt{a^2 + b^2}}\\) apart. Make the x and y coefficients identical first.\n" +
        "- **Fast route:** a line with intercepts \\(p\\) and \\(q\\) makes a right triangle with the axes, and the distance from the origin is the altitude to its hypotenuse: \\(\\frac{pq}{\\sqrt{p^2 + q^2}}\\).\n" +
        "- **A segment, not a whole line:** the perpendicular distance counts only if its foot lands between the two ends. If it lands outside, the nearest point is the nearer end.",
      formula: {
        label: "Distance from a point to a line",
        latex:
          "d = \\frac{|ax_0 + by_0 + c|}{\\sqrt{a^2 + b^2}} \\qquad d_{\\text{parallel}} = \\frac{|c_1 - c_2|}{\\sqrt{a^2 + b^2}}",
        symbols: [{ symbol: "\\((x_0, y_0)\\)", meaning: "the point" }],
      },
      authoredExample: {
        prompt: "Find the distance of the point \\((1, -2)\\) from the line \\(6x + 8y + 5 = 0\\).",
        steps: [
          "Put the point in: \\(6(1) + 8(-2) + 5 = 6 - 16 + 5 = -5\\), so the top is \\(|-5| = 5\\).",
          "Bottom: \\(\\sqrt{36 + 64} = 10\\).",
          "\\(d = \\frac{5}{10} = 0.5\\).",
        ],
        answer: "0.5",
      },
      selfCheckExample: {
        prompt: "How far apart are the parallel lines \\(5x + 12y = 7\\) and \\(5x + 12y = 33\\)?",
        steps: ["\\(\\frac{|33 - 7|}{\\sqrt{25 + 144}} = \\frac{26}{13} = 2\\)."],
        answer: "2",
      },
      practiceSet: [
        { prompt: "Find the distance of the origin from the line \\(8x + 6y = 20\\).", answer: "2" },
        { prompt: "Find the distance of \\((1, 1)\\) from the line \\(x + y = 5\\).", answer: "\\(\\frac{3}{\\sqrt{2}}\\)" },
        { prompt: "How far is the point \\((3, 7)\\) from the x-axis?", answer: "7" },
        {
          prompt: "Find the distance of the origin from the line through \\((0, 5)\\) and \\((12, 0)\\).",
          answer: "\\(\\frac{60}{13}\\)",
          method: "Legs 5 and 12, hypotenuse 13: \\(\\frac{5 \\times 12}{13}\\).",
        },
      ],
      pyqExampleId: "d6afcf29-3f68-4b2f-9ef2-35739e192b69",
      traps: [
        {
          title: "Leaving out the square root on the bottom",
          body:
            "The bottom is \\(\\sqrt{a^2 + b^2}\\), not \\(a^2 + b^2\\) and not \\(a + b\\). For \\(12x + 5y = 39\\) it is 13, and the distance from the origin is \\(\\frac{39}{13} = 3\\).",
        },
        {
          title: "Using unequal coefficients for parallel lines",
          body:
            "\\(2x + 3y = 1\\) and \\(4x + 6y = 9\\) are parallel, but subtract the constants only after rewriting the first as \\(4x + 6y = 2\\). The distance is then \\(\\frac{7}{\\sqrt{52}}\\).",
        },
      ],
    },
  ],
};
