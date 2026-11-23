import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_MA_PS_ANGLE_NOTE: SubtopicNote = {
  subtopicName: "Angle between a Pair of Lines",
  title: "Angle between a Pair of Lines",
  oneLineDefinition:
    "The acute angle θ between the lines ax² + 2hxy + by² = 0 is given by tan θ = |2√(h² − ab)/(a + b)|. The lines are perpendicular when a + b = 0 and coincident when h² = ab.",
  whyItMatters:
    "35 questions, eight of them from board papers. Five ask for the proof of tan θ = |2√(h² − ab)/(a + b)| (2015, 2017, 2023, 2024, 2025), and in 2017 and 2024 the proof goes on to the condition for coincident lines. The others ask for the angle between the lines 3x² + 4xy − 3y² = 0 (2020) and xy + y² = 0 (2024), and to show that 100(h² − ab) = (a + b)² when two pairs make the same angle (2022). The textbook rows are Exercise 4.2, its solved examples and the Miscellaneous questions on lines at a given angle and equilateral triangles.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscmps-tan-theta",
      name: "Acute angle between the lines",
      intuition:
        "You already know tan θ = |(m₁ − m₂)/(1 + m₁m₂)| for two lines of slopes m₁ and m₂. For a pair given by one equation you do not need the slopes themselves: the sum and product of the slopes give (m₁ − m₂)² and 1 + m₁m₂, and the formula comes out in terms of a, h and b alone.",
      definition:
        "- **Theorem 4.4:** the acute angle \\(\\theta\\) between the lines \\(ax^2 + 2hxy + by^2 = 0\\) is given by \\(\\tan\\theta = \\left|\\dfrac{2\\sqrt{h^2 - ab}}{a + b}\\right|\\), when \\(a + b \\neq 0\\). Proof outline (take \\(b \\neq 0\\)):\n" +
        "- Let \\(m_1, m_2\\) be the slopes. Then \\(m_1 + m_2 = -\\dfrac{2h}{b}\\) and \\(m_1m_2 = \\dfrac{a}{b}\\).\n" +
        "- \\((m_1 - m_2)^2 = (m_1 + m_2)^2 - 4m_1m_2 = \\dfrac{4h^2}{b^2} - \\dfrac{4a}{b} = \\dfrac{4(h^2 - ab)}{b^2}\\).\n" +
        "- \\(\\therefore m_1 - m_2 = \\pm\\dfrac{2\\sqrt{h^2 - ab}}{b}\\).\n" +
        "- As \\(\\theta\\) is acute, \\(\\tan\\theta = \\left|\\dfrac{m_1 - m_2}{1 + m_1m_2}\\right| = \\left|\\dfrac{\\pm 2\\sqrt{h^2 - ab}/b}{1 + a/b}\\right| = \\left|\\dfrac{2\\sqrt{h^2 - ab}}{a + b}\\right|\\).\n" +
        "- To find an angle: compare with \\(ax^2 + 2hxy + by^2 = 0\\), write \\(a\\), \\(h\\), \\(b\\), substitute, and give \\(\\theta\\) in degrees when \\(\\tan\\theta\\) is a standard value, otherwise as \\(\\tan^{-1}\\) of the number.\n" +
        "- If the lines make angles \\(\\alpha\\) and \\(\\beta\\) with the X-axis, \\(\\tan(\\alpha + \\beta) = \\dfrac{m_1 + m_2}{1 - m_1m_2} = \\dfrac{2h}{a - b}\\).",
      formula: {
        label: "Acute angle between the pair",
        latex: "\\tan\\theta = \\left|\\frac{2\\sqrt{h^2 - ab}}{a + b}\\right|, \\qquad a + b \\neq 0",
      },
      authoredExample: {
        prompt: "Find the acute angle between the lines represented by \\(3x^2 + 10xy + 3y^2 = 0\\).",
        steps: [
          "Comparing with \\(ax^2 + 2hxy + by^2 = 0\\): \\(a = 3\\), \\(2h = 10\\) so \\(h = 5\\), \\(b = 3\\).",
          "\\(h^2 - ab = 25 - 9 = 16\\), so \\(\\sqrt{h^2 - ab} = 4\\).",
          "\\(\\tan\\theta = \\left|\\dfrac{2\\sqrt{h^2 - ab}}{a + b}\\right| = \\left|\\dfrac{2 \\times 4}{3 + 3}\\right| = \\dfrac{8}{6} = \\dfrac{4}{3}\\).",
          "\\(\\therefore \\theta = \\tan^{-1}\\left(\\dfrac{4}{3}\\right)\\).",
        ],
        answer: "\\(\\theta = \\tan^{-1}\\left(\\dfrac{4}{3}\\right)\\)",
      },
      selfCheckExample: {
        prompt: "Find the acute angle between the lines represented by \\(4x^2 + 13xy + 3y^2 = 0\\).",
        steps: ["\\(a = 4\\), \\(h = \\dfrac{13}{2}\\), \\(b = 3\\); \\(h^2 - ab = \\dfrac{169}{4} - 12 = \\dfrac{121}{4}\\), so \\(\\sqrt{h^2 - ab} = \\dfrac{11}{2}\\).", "\\(\\tan\\theta = \\left|\\dfrac{2 \\times \\frac{11}{2}}{4 + 3}\\right| = \\dfrac{11}{7}\\)."],
        answer: "\\(\\theta = \\tan^{-1}\\left(\\dfrac{11}{7}\\right)\\)",
      },
      practiceSet: [
        { prompt: "Find the acute angle between the lines represented by \\(x^2 - 3y^2 = 0\\).", answer: "\\(\\tan\\theta = \\left|\\dfrac{2\\sqrt{3}}{-2}\\right| = \\sqrt{3}\\), so \\(\\theta = 60^\\circ\\)" },
        { prompt: "Find the acute angle between the lines represented by \\(6x^2 + xy - y^2 = 0\\).", answer: "\\(\\tan\\theta = 1\\), so \\(\\theta = 45^\\circ\\)" },
        { prompt: "Find \\(\\tan\\theta\\) for the acute angle between the lines \\(x^2 - 7xy + 12y^2 = 0\\).", answer: "\\(\\dfrac{1}{13}\\)" },
      ],
      pyqExampleId: "6ccb617b-4ddd-4459-8f3b-c58464dc4787",
      traps: [
        {
          title: "Dropping the modulus",
          body: "The acute angle has a positive tangent. If \\(a + b\\) is negative, take the absolute value: for \\(x^2 - 3y^2 = 0\\) the formula gives \\(-\\sqrt{3}\\) without the modulus, but the acute angle is \\(60^\\circ\\).",
        },
        {
          title: "Using the whole xy coefficient as h",
          body: "In \\(3x^2 + 10xy + 3y^2 = 0\\), \\(h = 5\\), not 10. With \\(h = 10\\) you would get \\(\\sqrt{91}\\) and a wrong angle.",
        },
        {
          title: "The proof without the step for m₁ − m₂",
          body: "The proof turns on \\((m_1 - m_2)^2 = (m_1 + m_2)^2 - 4m_1m_2\\). Write this line and the square root with \\(\\pm\\); jumping from the slopes to the formula loses the proof marks.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmps-perp-coincident",
      name: "Perpendicular lines and coincident lines",
      intuition:
        "Two special cases come straight from the slopes. The lines are perpendicular when the product of their slopes is −1, that is a/b = −1, so a + b = 0. They are coincident when the two slopes are equal, which makes h² − ab = 0 and the angle zero.",
      definition:
        "- The lines \\(ax^2 + 2hxy + by^2 = 0\\) are **perpendicular** if and only if \\(m_1m_2 = -1\\), that is \\(\\dfrac{a}{b} = -1\\), that is \\(a + b = 0\\) (coefficient of \\(x^2\\) + coefficient of \\(y^2\\) = 0).\n" +
        "- They are **coincident** if and only if \\(m_1 = m_2\\), that is \\(m_1 - m_2 = 0\\), so \\(\\dfrac{2\\sqrt{h^2 - ab}}{b} = 0\\) and \\(h^2 = ab\\).\n" +
        "- When \\(h^2 = ab\\) the expression is a perfect square: the equation is one line counted twice.\n" +
        "- In the angle formula, \\(h^2 = ab\\) gives \\(\\tan\\theta = 0\\), \\(\\theta = 0\\); \\(a + b = 0\\) makes the denominator zero, \\(\\theta = 90^\\circ\\).",
      formula: {
        label: "Perpendicular and coincident",
        latex: "a + b = 0 \\ (\\text{perpendicular}), \\qquad h^2 = ab \\ (\\text{coincident})",
      },
      authoredExample: {
        prompt: "Find \\(k\\) if the lines represented by \\(4x^2 + kxy + 9y^2 = 0\\) are coincident.",
        steps: [
          "Comparing with \\(ax^2 + 2hxy + by^2 = 0\\): \\(a = 4\\), \\(2h = k\\) so \\(h = \\dfrac{k}{2}\\), \\(b = 9\\).",
          "The lines are coincident when \\(h^2 = ab\\): \\(\\dfrac{k^2}{4} = 36\\).",
          "\\(\\therefore k^2 = 144\\) and \\(k = \\pm 12\\).",
          "Check \\(k = 12\\): \\(4x^2 + 12xy + 9y^2 = (2x + 3y)^2\\), one line counted twice.",
        ],
        answer: "\\(k = \\pm 12\\)",
      },
      selfCheckExample: {
        prompt: "Find \\(p\\) if the lines represented by \\(px^2 - 7xy + 5y^2 = 0\\) are perpendicular to each other.",
        steps: ["Perpendicular when \\(a + b = 0\\): \\(p + 5 = 0\\)."],
        answer: "\\(p = -5\\)",
      },
      practiceSet: [
        { prompt: "Show that the lines represented by \\(2x^2 + 3xy - 2y^2 = 0\\) are perpendicular.", answer: "\\(a + b = 2 + (-2) = 0\\)" },
        { prompt: "Are the lines represented by \\(25x^2 - 30xy + 9y^2 = 0\\) coincident?", answer: "Yes: \\(h^2 = 225 = ab\\); the equation is \\((5x - 3y)^2 = 0\\)" },
        { prompt: "Find \\(m\\) if the lines represented by \\(mx^2 + 4xy + 4y^2 = 0\\) are coincident.", answer: "\\(h^2 = ab\\): \\(4 = 4m\\), so \\(m = 1\\)" },
      ],
      pyqExampleId: "8329261d-22a0-42b2-bfe6-0cb0566c6299",
      traps: [
        {
          title: "Looking at h for perpendicular lines",
          body: "The test for perpendicular lines is \\(a + b = 0\\); the value of \\(h\\) plays no part. \\(2x^2 + 3xy - 2y^2 = 0\\) is a perpendicular pair whatever its middle term.",
        },
        {
          title: "Squaring the whole coefficient for coincident lines",
          body: "If the middle term is \\(kxy\\), then \\(h = \\dfrac{k}{2}\\) and the condition is \\(\\dfrac{k^2}{4} = ab\\). Writing \\(k^2 = ab\\) gives half the right value of \\(k\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmps-angle-with-line",
      name: "Lines through the origin at a given angle to a line",
      intuition:
        "If a line through the origin makes a given angle with a known line, its slope m satisfies the angle formula. Squaring removes the modulus and leaves a quadratic in m. Both roots are wanted, because there is one line on each side, so that quadratic is already the auxiliary equation of the pair: turn it back into x and y.",
      definition:
        "- Let \\(m\\) be the slope of a required line and \\(m'\\) the slope of the given line. Then \\(\\tan\\alpha = \\left|\\dfrac{m - m'}{1 + mm'}\\right|\\).\n" +
        "- Square both sides and simplify to a quadratic \\(Bm^2 + 2Hm + A = 0\\). This is the auxiliary equation of the required pair.\n" +
        "- The required combined equation is \\(Ax^2 + 2Hxy + By^2 = 0\\): the coefficient of \\(m^2\\) goes with \\(y^2\\), the constant with \\(x^2\\).\n" +
        "- Angle with an axis: lines making \\(60^\\circ\\) with the X-axis have inclinations \\(60^\\circ\\) and \\(120^\\circ\\), slopes \\(\\pm\\sqrt{3}\\). Lines making \\(60^\\circ\\) with the Y-axis have inclinations \\(30^\\circ\\) and \\(150^\\circ\\), slopes \\(\\pm\\dfrac{1}{\\sqrt{3}}\\).\n" +
        "- A pair through the origin forms an **equilateral triangle** with a third line when each line of the pair makes \\(60^\\circ\\) with the third line.",
      formula: {
        label: "Angle between two lines",
        latex: "\\tan\\alpha = \\left|\\frac{m - m'}{1 + mm'}\\right|",
      },
      authoredExample: {
        prompt:
          "Find the combined equation of the lines through the origin each of which makes an angle of \\(45^\\circ\\) with the line \\(2x - y + 5 = 0\\).",
        steps: [
          "The slope of \\(2x - y + 5 = 0\\) is \\(2\\). Let \\(m\\) be the slope of a required line.",
          "\\(\\tan 45^\\circ = \\left|\\dfrac{m - 2}{1 + 2m}\\right|\\), so \\(1 = \\dfrac{(m - 2)^2}{(1 + 2m)^2}\\).",
          "\\(\\therefore (1 + 2m)^2 = (m - 2)^2\\), that is \\(1 + 4m + 4m^2 = m^2 - 4m + 4\\).",
          "\\(\\therefore 3m^2 + 8m - 3 = 0\\). This is the auxiliary equation \\(bm^2 + 2hm + a = 0\\) with \\(b = 3\\), \\(2h = 8\\), \\(a = -3\\).",
          "The required combined equation is \\(-3x^2 + 8xy + 3y^2 = 0\\), that is \\(3x^2 - 8xy - 3y^2 = 0\\).",
          "Check: \\(3x^2 - 8xy - 3y^2 = (x - 3y)(3x + y)\\), slopes \\(\\dfrac{1}{3}\\) and \\(-3\\), and each makes \\(45^\\circ\\) with slope 2.",
        ],
        answer: "\\(3x^2 - 8xy - 3y^2 = 0\\)",
      },
      selfCheckExample: {
        prompt: "Find the combined equation of the lines through the origin each of which makes an angle of \\(45^\\circ\\) with the X-axis.",
        steps: ["The inclinations are \\(45^\\circ\\) and \\(135^\\circ\\), slopes \\(1\\) and \\(-1\\).", "\\((y - x)(y + x) = 0\\)."],
        answer: "\\(x^2 - y^2 = 0\\)",
      },
      practiceSet: [
        { prompt: "Find the combined equation of the lines through the origin with inclinations \\(30^\\circ\\) and \\(150^\\circ\\).", answer: "Slopes \\(\\pm\\dfrac{1}{\\sqrt{3}}\\): \\(x^2 - 3y^2 = 0\\)" },
        { prompt: "Find the combined equation of the pair of lines through the origin which forms an equilateral triangle with the line \\(y = 4\\).", answer: "Slopes \\(\\pm\\sqrt{3}\\): \\(3x^2 - y^2 = 0\\)" },
        { prompt: "A line through the origin makes \\(45^\\circ\\) with the line \\(y = x\\). Which lines can it be?", answer: "The X-axis (slope 0) or the Y-axis" },
      ],
      pyqExampleId: "a41efe7e-9e5d-4eaf-87a9-b027c871643a",
      traps: [
        {
          title: "Reading 60° with the Y-axis as slope tan 60°",
          body: "A line at \\(60^\\circ\\) to the Y-axis is at \\(30^\\circ\\) to the X-axis, so its slope is \\(\\pm\\dfrac{1}{\\sqrt{3}}\\) and the pair is \\(x^2 - 3y^2 = 0\\), not \\(3x^2 - y^2 = 0\\).",
        },
        {
          title: "Turning the quadratic in m back the wrong way",
          body: "From \\(Bm^2 + 2Hm + A = 0\\) the pair is \\(Ax^2 + 2Hxy + By^2 = 0\\). Putting \\(B\\) with \\(x^2\\) gives the wrong pair, the mirror image of the right one in the line \\(y = x\\).",
        },
        {
          title: "Solving for m when it is not needed",
          body: "The question asks for the combined equation, and the squared quadratic already is its auxiliary equation. Solving for each \\(m\\) and multiplying the lines again is longer and invites slips with surds.",
        },
      ],
    },
  ],
};
