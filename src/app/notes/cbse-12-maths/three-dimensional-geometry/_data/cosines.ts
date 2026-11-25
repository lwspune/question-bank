import type { SubtopicNote } from "@/app/notes/_types";

export const CB_MA_TG_COSINES_NOTE: SubtopicNote = {
  subtopicName: "Direction Cosines and Direction Ratios",
  title: "Direction Cosines and Direction Ratios",
  oneLineDefinition:
    "The direction cosines of a line are the cosines of the angles it makes with the positive x, y and z axes; any three numbers proportional to them are its direction ratios.",
  whyItMatters:
    "41 questions, thirty-one of them from board papers, set in every year from 2022 to 2026. Most are one-mark MCQs and assertion-reason items: direction cosines from the angles a line makes with the axes and the rule l² + m² + n² = 1 (every year), the direction cosines of a line whose equation is not in standard form (2022, 2023, 2024 and 2026), the foot of a perpendicular on an axis and the distance of a point from an axis (2023 to 2025), and the unknowns that make two lines parallel (2026). The written ones asked for the third angle when two are given (2022) and for the direction cosines and a point of a line given as three equal expressions (2023). The textbook adds Examples 1 to 5 and Exercise 11.1.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbmtg-angles",
      name: "Direction cosines from the angles with the axes",
      intuition:
        "Let a line make angles \\(\\alpha\\), \\(\\beta\\) and \\(\\gamma\\) with the positive x, y and z axes. Their cosines \\(l\\), \\(m\\), \\(n\\) are the components of a unit vector along the line, so the sum of their squares is 1. Turn the line round and each angle becomes its supplement, so every cosine changes sign: a line has two sets of direction cosines, one for each direction along it.",
      definition:
        "- \\(l = \\cos\\alpha\\), \\(m = \\cos\\beta\\), \\(n = \\cos\\gamma\\), where each angle lies from \\(0\\) to \\(\\pi\\).\n" +
        "- **Always** \\(l^2 + m^2 + n^2 = 1\\). Given two of the angles, this gives the square of the third cosine, so the third cosine has two signs and the third angle can be acute or obtuse.\n" +
        "- From the same rule: \\(\\sin^2\\alpha + \\sin^2\\beta + \\sin^2\\gamma = 2\\) and \\(\\cos 2\\alpha + \\cos 2\\beta + \\cos 2\\gamma = -1\\). There is no such rule for \\(\\cos\\alpha + \\cos\\beta + \\cos\\gamma\\).\n" +
        "- A line equally inclined to the three axes has \\(l = m = n = \\pm\\dfrac{1}{\\sqrt{3}}\\).\n" +
        "- No line makes \\(90^\\circ\\) with all three axes, since \\(0 + 0 + 0 \\ne 1\\).\n" +
        "- Three numbers whose squares do not add up to 1, such as \\(1, 1, 1\\), cannot be direction cosines. They can still be direction ratios.",
      formula: {
        label: "Direction cosines",
        latex: "l = \\cos\\alpha,\\quad m = \\cos\\beta,\\quad n = \\cos\\gamma, \\qquad l^2 + m^2 + n^2 = 1",
        symbols: [
          { symbol: "\\(\\alpha, \\beta, \\gamma\\)", meaning: "angles with the positive x, y and z axes" },
          { symbol: "\\(l, m, n\\)", meaning: "direction cosines of the line" },
        ],
      },
      authoredExample: {
        prompt: "A line makes an angle of \\(120^\\circ\\) with the positive x-axis and also with the positive y-axis. Find the angle it makes with the positive z-axis, and write its direction cosines.",
        steps: [
          "\\(l = \\cos 120^\\circ = -\\dfrac{1}{2}\\) and \\(m = \\cos 120^\\circ = -\\dfrac{1}{2}\\).",
          "\\(l^2 + m^2 + n^2 = 1\\), so \\(\\dfrac{1}{4} + \\dfrac{1}{4} + n^2 = 1\\).",
          "\\(n^2 = \\dfrac{1}{2}\\), so \\(n = \\pm\\dfrac{1}{\\sqrt{2}}\\).",
          "\\(\\cos\\gamma = \\dfrac{1}{\\sqrt{2}}\\) gives \\(\\gamma = 45^\\circ\\); \\(\\cos\\gamma = -\\dfrac{1}{\\sqrt{2}}\\) gives \\(\\gamma = 135^\\circ\\).",
          "Direction cosines: \\(-\\dfrac{1}{2}, -\\dfrac{1}{2}, \\dfrac{1}{\\sqrt{2}}\\) or \\(-\\dfrac{1}{2}, -\\dfrac{1}{2}, -\\dfrac{1}{\\sqrt{2}}\\).",
        ],
        answer: "\\(\\gamma = 45^\\circ\\) or \\(135^\\circ\\); direction cosines \\(-\\dfrac{1}{2}, -\\dfrac{1}{2}, \\pm\\dfrac{1}{\\sqrt{2}}\\)",
      },
      selfCheckExample: {
        prompt: "Can a line make angles of \\(30^\\circ\\), \\(60^\\circ\\) and \\(90^\\circ\\) with the x, y and z axes? If it can, write its direction cosines.",
        steps: [
          "\\(\\cos^2 30^\\circ + \\cos^2 60^\\circ + \\cos^2 90^\\circ = \\dfrac{3}{4} + \\dfrac{1}{4} + 0 = 1\\).",
          "The rule \\(l^2 + m^2 + n^2 = 1\\) holds, so such a line exists.",
          "Its direction cosines are \\(\\dfrac{\\sqrt{3}}{2}, \\dfrac{1}{2}, 0\\).",
        ],
        answer: "Yes: \\(\\dfrac{\\sqrt{3}}{2}, \\dfrac{1}{2}, 0\\)",
      },
      practiceSet: [
        { prompt: "A line makes angles of \\(150^\\circ\\), \\(120^\\circ\\) and \\(90^\\circ\\) with the x, y and z axes. Write its direction cosines.", answer: "\\(-\\dfrac{\\sqrt{3}}{2}, -\\dfrac{1}{2}, 0\\)" },
        { prompt: "Two direction cosines of a line are \\(l = \\dfrac{2}{3}\\) and \\(m = -\\dfrac{1}{3}\\). Find \\(n\\).", answer: "\\(n = \\pm\\dfrac{2}{3}\\)", method: "\\(n^2 = 1 - \\dfrac{4}{9} - \\dfrac{1}{9} = \\dfrac{4}{9}\\)" },
        { prompt: "Explain why no line can make an angle of \\(30^\\circ\\) with both the x-axis and the y-axis.", answer: "\\(\\cos^2 30^\\circ + \\cos^2 30^\\circ = \\dfrac{3}{2}\\), which is already more than 1, so \\(l^2 + m^2 + n^2 = 1\\) cannot hold." },
      ],
      pyqExampleId: "e168dba3-170b-4b94-8cc6-fff271c840c4",
      traps: [
        {
          title: "Keeping one sign of the third cosine",
          body: "When you find the third cosine from \\(l^2 + m^2 + n^2 = 1\\), you get its square. Both signs are possible, so the angle can be acute or obtuse. Write both unless the question says which.",
        },
        {
          title: "Calling 1, 1, 1 direction cosines",
          body: "Direction cosines must satisfy \\(l^2 + m^2 + n^2 = 1\\), and \\(1 + 1 + 1 = 3\\). So \\(1, 1, 1\\) are direction ratios; the direction cosines are \\(\\pm\\dfrac{1}{\\sqrt{3}}\\) each.",
        },
        {
          title: "An angle bigger than a straight angle",
          body: "The angle a line makes with an axis lies from \\(0\\) to \\(\\pi\\). An option such as \\(\\dfrac{5\\pi}{4}\\) can never be that angle.",
        },
        {
          title: "Assertion-reason code (D) in Mathematics",
          body: "In CBSE Mathematics papers, code (D) means the Assertion is false and the Reason is true. Decide each statement on its own first, then ask whether the Reason explains the Assertion.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmtg-ratios",
      name: "Direction ratios, and reading them from an equation",
      intuition:
        "Any three numbers \\(a, b, c\\) proportional to \\(l, m, n\\) are direction ratios. To get back the direction cosines, divide each by \\(\\sqrt{a^2 + b^2 + c^2}\\). In the Cartesian equation of a line the denominators are direction ratios, but only once every numerator has the form (variable minus a number) with the variable's coefficient equal to 1.",
      definition:
        "- \\(l = \\pm\\dfrac{a}{\\sqrt{a^2 + b^2 + c^2}}\\), and the same for \\(m\\) and \\(n\\), taking **one sign for all three**.\n" +
        "- If \\(a, b, c\\) are direction ratios, so are \\(ka, kb, kc\\) for any \\(k \\ne 0\\). \\(0, 0, 0\\) is never a set of direction ratios.\n" +
        "- **Standard form first.** \\(\\dfrac{1 - y}{3} = \\dfrac{y - 1}{-3}\\) and \\(\\dfrac{2x - 1}{4} = \\dfrac{x - \\frac{1}{2}}{2}\\).\n" +
        "- For a chain such as \\(2x = 3y = -z\\), divide through: \\(\\dfrac{x}{1/2} = \\dfrac{y}{1/3} = \\dfrac{z}{-1}\\), so the direction ratios are \\(\\dfrac{1}{2}, \\dfrac{1}{3}, -1\\), that is \\(3, 2, -6\\).\n" +
        "- \\(x = ay + b\\), \\(z = cy + d\\) is \\(\\dfrac{x - b}{a} = \\dfrac{y}{1} = \\dfrac{z - d}{c}\\): direction ratios \\(a, 1, c\\).\n" +
        "- The numbers subtracted in the standard form give a point of the line.",
      formula: {
        label: "Direction cosines from direction ratios",
        latex: "l = \\dfrac{a}{\\sqrt{a^2 + b^2 + c^2}},\\quad m = \\dfrac{b}{\\sqrt{a^2 + b^2 + c^2}},\\quad n = \\dfrac{c}{\\sqrt{a^2 + b^2 + c^2}}",
        symbols: [{ symbol: "\\(a, b, c\\)", meaning: "direction ratios of the line" }],
      },
      authoredExample: {
        prompt: "Find the direction cosines of the line \\(3x - 6 = 6 - 6y = 3z + 3\\), and a point through which it passes.",
        steps: [
          "Write each part as a number times (variable minus a number): \\(3x - 6 = 3(x - 2)\\), \\(6 - 6y = -6(y - 1)\\), \\(3z + 3 = 3(z + 1)\\).",
          "So \\(3(x - 2) = -6(y - 1) = 3(z + 1)\\). Divide every part by 6.",
          "\\(\\dfrac{x - 2}{2} = \\dfrac{y - 1}{-1} = \\dfrac{z + 1}{2}\\).",
          "Direction ratios: \\(2, -1, 2\\), and \\(\\sqrt{4 + 1 + 4} = 3\\).",
          "Direction cosines: \\(\\dfrac{2}{3}, -\\dfrac{1}{3}, \\dfrac{2}{3}\\).",
          "The line passes through \\((2, 1, -1)\\).",
        ],
        answer: "\\(\\dfrac{2}{3}, -\\dfrac{1}{3}, \\dfrac{2}{3}\\) (or all three negated); point \\((2, 1, -1)\\)",
      },
      selfCheckExample: {
        prompt: "Find the direction cosines of the line \\(\\dfrac{1 - x}{2} = \\dfrac{2y - 3}{12} = \\dfrac{z + 4}{-9}\\).",
        steps: [
          "\\(\\dfrac{1 - x}{2} = \\dfrac{x - 1}{-2}\\) and \\(\\dfrac{2y - 3}{12} = \\dfrac{y - \\frac{3}{2}}{6}\\).",
          "Direction ratios: \\(-2, 6, -9\\).",
          "\\(\\sqrt{4 + 36 + 81} = \\sqrt{121} = 11\\).",
          "Direction cosines: \\(-\\dfrac{2}{11}, \\dfrac{6}{11}, -\\dfrac{9}{11}\\).",
        ],
        answer: "\\(-\\dfrac{2}{11}, \\dfrac{6}{11}, -\\dfrac{9}{11}\\) (or all three negated)",
      },
      practiceSet: [
        { prompt: "A line has direction ratios \\(4, -4, 7\\). Find its direction cosines.", answer: "\\(\\dfrac{4}{9}, -\\dfrac{4}{9}, \\dfrac{7}{9}\\)" },
        { prompt: "Find the direction ratios of the line \\(x = 2y - 1\\), \\(z = 3y + 4\\), and a point on it.", answer: "\\(2, 1, 3\\); the point \\((-1, 0, 4)\\)", method: "\\(\\dfrac{x + 1}{2} = \\dfrac{y}{1} = \\dfrac{z - 4}{3}\\)" },
        { prompt: "Write direction ratios of the line \\(\\dfrac{x - 1}{3} = -y = \\dfrac{3z + 2}{6}\\).", answer: "\\(3, -1, 2\\)", method: "\\(-y = \\dfrac{y}{-1}\\) and \\(\\dfrac{3z + 2}{6} = \\dfrac{z + \\frac{2}{3}}{2}\\)" },
      ],
      pyqExampleId: "e3cd27ef-fa84-4fba-87c5-cb45c36b9aa9",
      traps: [
        {
          title: "Reading the printed denominators",
          body: "In \\(\\dfrac{2z + 1}{8}\\) the denominator 8 is not a direction ratio: the coefficient of \\(z\\) is 2. Rewrite it as \\(\\dfrac{z + \\frac{1}{2}}{4}\\) first, and change the sign of the denominator when the variable has a minus sign.",
        },
        {
          title: "Mixing signs",
          body: "Divide all three direction ratios by \\(+\\sqrt{a^2 + b^2 + c^2}\\), or all three by \\(-\\sqrt{a^2 + b^2 + c^2}\\). Changing the sign of only one cosine gives a different line.",
        },
        {
          title: "Forgetting to divide",
          body: "Direction ratios such as \\(2, -3, 6\\) are not direction cosines. When the question asks for direction cosines, divide by the square root of the sum of squares, here 7.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cbmtg-axes",
      name: "The coordinate axes: direction cosines, feet and distances",
      intuition:
        "The x-axis makes \\(0^\\circ\\) with itself and \\(90^\\circ\\) with the other two axes, so its direction cosines are \\(1, 0, 0\\). Drop a perpendicular from a point onto an axis and only the coordinate along that axis survives at the foot. The length of that perpendicular is made of the other two coordinates.",
      definition:
        "- Direction cosines: x-axis \\(1, 0, 0\\); y-axis \\(0, 1, 0\\); z-axis \\(0, 0, 1\\).\n" +
        "- A line parallel to an axis has the same direction ratios. In Cartesian form a zero denominator, such as \\(\\dfrac{x - 1}{0}\\), only records that \\(x\\) stays equal to 1 along the line.\n" +
        "- **Foot on an axis:** keep the coordinate of that axis and make the other two zero.\n" +
        "- **Distance from an axis:** leave out the coordinate of that axis. From the y-axis it is \\(\\sqrt{x^2 + z^2}\\).\n" +
        "- A line perpendicular to two of the axes is parallel to the third.",
      table: {
        columns: ["Axis", "Direction cosines", "Foot of the perpendicular from (x, y, z)", "Distance of (x, y, z) from the axis"],
        rows: [
          {
            cells: ["x-axis", "\\(1, 0, 0\\)", "\\((x, 0, 0)\\)", "\\(\\sqrt{y^2 + z^2}\\)"],
          },
          {
            cells: ["y-axis", "\\(0, 1, 0\\)", "\\((0, y, 0)\\)", "\\(\\sqrt{x^2 + z^2}\\)"],
            pyqExampleId: "1c7d2771-3ba2-498c-93a5-cb319bbef055",
            noteAmber: "Board 2023 and 2024 asked the distance of a point from the y-axis: it is √(x² + z²), not |y|.",
          },
          {
            cells: ["z-axis", "\\(0, 0, 1\\)", "\\((0, 0, z)\\)", "\\(\\sqrt{x^2 + y^2}\\)"],
            pyqExampleId: "d02f1852-c72d-41c0-b397-ae7070abb462",
            noteAmber: "Board 2023 asked the direction ratios of a line parallel to the z-axis: 0, 0, 1.",
          },
        ],
      },
      selfCheckExample: {
        prompt: "Find the foot of the perpendicular from \\((4, -3, 6)\\) on the z-axis, and the length of the perpendicular.",
        steps: [
          "On the z-axis only the z-coordinate stays: the foot is \\((0, 0, 6)\\).",
          "Length \\(= \\sqrt{4^2 + (-3)^2} = \\sqrt{25} = 5\\).",
        ],
        answer: "Foot \\((0, 0, 6)\\); length 5 units",
      },
      practiceSet: [
        { prompt: "Find the distance of the point \\((2, -6, 3)\\) from the x-axis.", answer: "\\(3\\sqrt{5}\\) units", method: "\\(\\sqrt{36 + 9} = \\sqrt{45}\\)" },
        { prompt: "Write the direction cosines of a line perpendicular to both the y-axis and the z-axis.", answer: "\\(1, 0, 0\\) (or \\(-1, 0, 0\\)): the line is parallel to the x-axis." },
        { prompt: "Find the distance of \\((3, 4, 12)\\) from the origin and from the z-axis.", answer: "13 units and 5 units" },
      ],
      pyqExampleId: "c33ffa3e-23ea-4c25-b993-6bf8cbaa874d",
      traps: [
        {
          title: "Keeping the wrong coordinate",
          body: "The foot on the y-axis keeps the y-coordinate. The distance from the y-axis leaves the y-coordinate out. Mixing these up gives the option \\(|y|\\) or \\(\\sqrt{y^2 + z^2}\\), both wrong.",
        },
        {
          title: "A zero denominator is not division by zero",
          body: "\\(\\dfrac{x - 1}{0} = \\dfrac{y - 1}{0} = \\dfrac{z - 1}{1}\\) is a line parallel to the z-axis through \\((1, 1, 1)\\). The 0 says \\(x\\) and \\(y\\) do not change along the line.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmtg-two-points",
      name: "The line through two points: collinear points and parallel lines",
      intuition:
        "Going from \\(P(x_1, y_1, z_1)\\) to \\(Q(x_2, y_2, z_2)\\) you move \\(x_2 - x_1\\), \\(y_2 - y_1\\), \\(z_2 - z_1\\) along the axes, so these are direction ratios of \\(PQ\\); dividing by the length \\(PQ\\) gives its direction cosines. Two lines point the same way exactly when their direction ratios are proportional.",
      definition:
        "- Direction ratios of \\(PQ\\): \\(x_2 - x_1, y_2 - y_1, z_2 - z_1\\) (or their negatives).\n" +
        "- Direction cosines of \\(PQ\\): each of these divided by \\(PQ = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2 + (z_2 - z_1)^2}\\).\n" +
        "- **Parallel lines:** \\(\\dfrac{a_1}{a_2} = \\dfrac{b_1}{b_2} = \\dfrac{c_1}{c_2}\\), one common multiplier for all three.\n" +
        "- **Collinear points** \\(A, B, C\\): the direction ratios of \\(AB\\) and \\(BC\\) are proportional, and \\(B\\) is common to both, so the three points lie on one line.",
      formula: {
        label: "Direction cosines of the line through two points",
        latex: "\\dfrac{x_2 - x_1}{PQ},\\ \\dfrac{y_2 - y_1}{PQ},\\ \\dfrac{z_2 - z_1}{PQ}",
      },
      authoredExample: {
        prompt: "Find the direction cosines of the line through \\(A(1, -2, 3)\\) and \\(B(3, -1, 5)\\).",
        steps: [
          "Direction ratios of \\(AB\\): \\(3 - 1, -1 + 2, 5 - 3\\), that is \\(2, 1, 2\\).",
          "\\(AB = \\sqrt{4 + 1 + 4} = 3\\).",
          "Direction cosines: \\(\\dfrac{2}{3}, \\dfrac{1}{3}, \\dfrac{2}{3}\\).",
        ],
        answer: "\\(\\dfrac{2}{3}, \\dfrac{1}{3}, \\dfrac{2}{3}\\)",
      },
      selfCheckExample: {
        prompt: "Show that the points \\(A(1, 2, 3)\\), \\(B(3, 5, 4)\\) and \\(C(-3, -4, 1)\\) are collinear.",
        steps: [
          "Direction ratios of \\(AB\\): \\(2, 3, 1\\).",
          "Direction ratios of \\(BC\\): \\(-6, -9, -3\\), which is \\(-3\\) times \\(2, 3, 1\\).",
          "So \\(AB\\) is parallel to \\(BC\\), and \\(B\\) is common to both.",
          "Hence \\(A\\), \\(B\\), \\(C\\) are collinear.",
        ],
        answer: "\\(BC = -3 \\times AB\\) in direction ratios, with \\(B\\) common, so the points are collinear.",
      },
      practiceSet: [
        { prompt: "Find the direction cosines of the line joining the origin to \\((2, 3, 6)\\).", answer: "\\(\\dfrac{2}{7}, \\dfrac{3}{7}, \\dfrac{6}{7}\\)" },
        { prompt: "Are the points \\((1, 1, 1)\\), \\((2, 3, 0)\\) and \\((4, 7, -2)\\) collinear?", answer: "Yes: the direction ratios \\(1, 2, -1\\) and \\(2, 4, -2\\) are proportional, with \\((2, 3, 0)\\) common." },
        { prompt: "Write direction ratios of the line through \\((5, 0, -2)\\) and \\((1, 3, 2)\\).", answer: "\\(-4, 3, 4\\) (or \\(4, -3, -4\\))" },
      ],
      pyqExampleId: "a7727003-d2c0-4174-8d8f-793c03f149e6",
      traps: [
        {
          title: "Checking only two of the three ratios",
          body: "Parallel needs one common multiplier for all three pairs, signs included. Two ratios agreeing is not enough; check the third as well.",
        },
        {
          title: "Parallel is not collinear",
          body: "Proportional direction ratios of \\(AB\\) and \\(BC\\) show the segments are parallel. Say also that \\(B\\) is common to both; that is what puts the three points on one line.",
        },
      ],
    },
  ],
};
