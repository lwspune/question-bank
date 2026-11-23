import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_MA_PS_COMBINED_NOTE: SubtopicNote = {
  subtopicName: "Combined Equation of a Pair of Lines",
  title: "Combined Equation of a Pair of Lines",
  oneLineDefinition:
    "The product of two line equations is their combined equation. For lines through the origin it is ax² + 2hxy + by² = 0, a pair of lines when h² − ab ≥ 0, with slopes whose sum is −2h/b and product a/b.",
  whyItMatters:
    "109 questions, the largest page of the chapter. Nineteen came from board papers: the proof that ax² + 2hxy + by² = 0 is a pair of lines through the origin when h² − ab ≥ 0 (2016, 2018, 2020, 2025 and twice in 2026), k when the sum of the slopes is twice their product (2015, 2024, 2026) or when 2x + y = 0 is one of the lines (2022, 2026), the pair through the origin perpendicular to a given pair (2017, 2018), the ratio of the slopes when h² = ab (2023), the difference of the slopes (2024), and short questions on writing a combined equation or the separate equations (2022 to 2025). The textbook rows are Exercise 4.1, its solved examples and most of the Miscellaneous Exercise.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscmps-joint",
      name: "Writing the combined equation of two lines",
      intuition:
        "A point lies on one of two lines exactly when it makes one of their equations zero, and that happens exactly when the product of the two equations is zero. So two lines are written as one equation by multiplying their equations. Going the other way, factorise a combined equation to get the two lines back. When a question describes the lines in words, find each line first, then multiply.",
      definition:
        "- **Theorem 4.1:** if \\(u \\equiv a_1x + b_1y + c_1\\) and \\(v \\equiv a_2x + b_2y + c_2\\), then \\(uv = 0\\) is the combined (joint) equation of the lines \\(u = 0\\) and \\(v = 0\\).\n" +
        "- Proof outline: a point \\(P(x_1, y_1)\\) on \\(u = 0\\) makes the first factor zero, so it satisfies \\(uv = 0\\); the same holds for every point of \\(v = 0\\).\n" +
        "- Conversely, if \\(R(x', y')\\) satisfies \\(uv = 0\\), one of the two factors is zero, so \\(R\\) lies on \\(u = 0\\) or on \\(v = 0\\).\n" +
        "- \\(u = 0\\) and \\(v = 0\\) are called the **separate equations** of the lines.\n" +
        "- Lines through \\((p, q)\\) parallel to the co-ordinate axes: \\((x - p)(y - q) = 0\\). The co-ordinate axes themselves: \\(xy = 0\\).\n" +
        "- For a line through a point, use the slope point form \\(y - y_1 = m(x - x_1)\\). A parallel line has the same slope; a perpendicular line has slope \\(-\\dfrac{1}{m}\\).\n" +
        "- To split a combined equation that is not homogeneous, group the terms: \\(x^2 - y^2 + x + y = (x + y)(x - y) + (x + y) = (x + y)(x - y + 1)\\).",
      formula: {
        label: "Combined equation of two lines",
        latex: "(a_1x + b_1y + c_1)(a_2x + b_2y + c_2) = 0",
      },
      authoredExample: {
        prompt:
          "Find the combined equation of the pair of lines passing through \\((1, -2)\\), one of which is parallel to \\(2x - y + 3 = 0\\) and the other perpendicular to \\(x + 3y - 4 = 0\\).",
        steps: [
          "The line parallel to \\(2x - y + 3 = 0\\) is \\(2x - y + c = 0\\). It passes through \\((1, -2)\\): \\(2 + 2 + c = 0\\), so \\(c = -4\\). The line is \\(2x - y - 4 = 0\\).",
          "The slope of \\(x + 3y - 4 = 0\\) is \\(-\\dfrac{1}{3}\\), so the perpendicular line has slope \\(3\\).",
          "By the slope point form, \\(y + 2 = 3(x - 1)\\), that is \\(3x - y - 5 = 0\\).",
          "The combined equation of \\(u = 0\\) and \\(v = 0\\) is \\(uv = 0\\): \\((2x - y - 4)(3x - y - 5) = 0\\).",
          "\\(\\therefore 6x^2 - 2xy - 10x - 3xy + y^2 + 5y - 12x + 4y + 20 = 0\\)",
          "\\(\\therefore 6x^2 - 5xy + y^2 - 22x + 9y + 20 = 0\\)",
        ],
        answer: "\\(6x^2 - 5xy + y^2 - 22x + 9y + 20 = 0\\)",
      },
      selfCheckExample: {
        prompt: "Find the separate equations of the lines represented by \\(xy - 3x + 2y - 6 = 0\\).",
        steps: ["Group the terms: \\(x(y - 3) + 2(y - 3) = 0\\).", "\\(\\therefore (x + 2)(y - 3) = 0\\)."],
        answer: "\\(x + 2 = 0\\) and \\(y - 3 = 0\\)",
      },
      practiceSet: [
        { prompt: "Find the combined equation of the lines \\(x + 2y = 0\\) and \\(3x - y = 0\\).", answer: "\\(3x^2 + 5xy - 2y^2 = 0\\)" },
        { prompt: "Find the combined equation of the lines through \\((-1, 4)\\) parallel to the co-ordinate axes.", answer: "\\((x + 1)(y - 4) = 0\\), that is \\(xy - 4x + y - 4 = 0\\)" },
        { prompt: "Find the combined equation of the lines at a distance of 5 units from the X-axis.", answer: "\\(y^2 - 25 = 0\\)" },
        { prompt: "Find the separate equations of the lines represented by \\(x^2 - y^2 - 2x + 2y = 0\\).", answer: "\\((x - y)(x + y - 2) = 0\\): the lines \\(x - y = 0\\) and \\(x + y - 2 = 0\\)" },
      ],
      pyqExampleId: "4ed141fd-98d0-4e3b-b94c-8d2c3550874c",
      traps: [
        {
          title: "Adding the equations instead of multiplying",
          body: "\\(u + v = 0\\) is a single line through the point where \\(u = 0\\) and \\(v = 0\\) meet. The combined equation of the two lines is the product \\(uv = 0\\).",
        },
        {
          title: "The wrong perpendicular slope",
          body: "A line perpendicular to a line of slope \\(m\\) has slope \\(-\\dfrac{1}{m}\\), not \\(-m\\) and not \\(\\dfrac{1}{m}\\). One sign slip changes both the line and every term of the expanded answer.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmps-homogeneous",
      name: "Homogeneous equation of degree two and when it is a pair of lines",
      intuition:
        "Two lines through the origin have no constant terms, so their product has only x², xy and y² terms: every term has degree two. Such an equation is called homogeneous. But not every homogeneous equation is a pair of lines: x² + y² = 0 is satisfied only by the origin. The test is the sign of h² − ab, and the board asks you to prove it.",
      definition:
        "- The **degree of a term** is the sum of the indices of its variables. An equation in which every term has the same degree is **homogeneous**. A homogeneous equation of degree two in \\(x\\) and \\(y\\) has the form \\(ax^2 + 2hxy + by^2 = 0\\).\n" +
        "- **Theorem 4.2:** the combined equation of two lines through the origin is homogeneous of degree two: \\((a_1x + b_1y)(a_2x + b_2y) = 0\\) gives \\(a = a_1a_2\\), \\(2h = a_1b_2 + a_2b_1\\), \\(b = b_1b_2\\).\n" +
        "- **Theorem:** \\(ax^2 + 2hxy + by^2 = 0\\) represents a pair of lines through the origin if \\(h^2 - ab \\geq 0\\). Proof outline:\n" +
        "- Case 1, \\(b = 0\\): the equation is \\(ax^2 + 2hxy = 0\\), that is \\(x(ax + 2hy) = 0\\), the lines \\(x = 0\\) and \\(ax + 2hy = 0\\), both through the origin.\n" +
        "- Case 2, \\(b \\neq 0\\): multiply by \\(b\\): \\(abx^2 + 2hbxy + b^2y^2 = 0\\), so \\(b^2y^2 + 2hbxy = -abx^2\\).\n" +
        "- Add \\(h^2x^2\\) to both sides: \\((by + hx)^2 = (h^2 - ab)x^2\\).\n" +
        "- As \\(h^2 - ab \\geq 0\\): \\((by + hx)^2 - \\left(\\sqrt{h^2 - ab}\\,x\\right)^2 = 0\\).\n" +
        "- \\(\\therefore \\left[(h + \\sqrt{h^2 - ab})x + by\\right]\\left[(h - \\sqrt{h^2 - ab})x + by\\right] = 0\\): two lines with no constant term, so both pass through the origin.\n" +
        "- If \\(h^2 - ab > 0\\) the lines are **distinct**; if \\(h^2 - ab = 0\\) they are **coincident**; if \\(h^2 - ab < 0\\) the equation is not a pair of lines.\n" +
        "- Separate equations: factorise by splitting the middle term. When it does not split, use the slopes from the auxiliary equation (next concept).",
      formula: {
        label: "Pair of lines through the origin",
        latex: "ax^2 + 2hxy + by^2 = 0 \\text{ is a pair of lines through the origin if } h^2 - ab \\geq 0",
      },
      authoredExample: {
        prompt:
          "Show that \\(2x^2 - 7xy + 3y^2 = 0\\) represents a pair of distinct lines through the origin, and find their separate equations.",
        steps: [
          "Comparing with \\(ax^2 + 2hxy + by^2 = 0\\): \\(a = 2\\), \\(2h = -7\\) so \\(h = -\\dfrac{7}{2}\\), \\(b = 3\\).",
          "\\(h^2 - ab = \\dfrac{49}{4} - 6 = \\dfrac{25}{4} > 0\\), so the equation represents two distinct lines through the origin.",
          "Split the middle term: \\(2x^2 - 6xy - xy + 3y^2 = 0\\).",
          "\\(\\therefore 2x(x - 3y) - y(x - 3y) = 0\\)",
          "\\(\\therefore (2x - y)(x - 3y) = 0\\)",
        ],
        answer: "Distinct lines \\(2x - y = 0\\) and \\(x - 3y = 0\\)",
      },
      selfCheckExample: {
        prompt: "Does \\(x^2 + 2xy + 3y^2 = 0\\) represent a pair of lines?",
        steps: ["\\(a = 1\\), \\(h = 1\\), \\(b = 3\\).", "\\(h^2 - ab = 1 - 3 = -2 < 0\\)."],
        answer: "No. Since \\(h^2 - ab < 0\\), it is not a pair of lines",
      },
      practiceSet: [
        { prompt: "Find the separate equations of the lines represented by \\(x^2 - 16y^2 = 0\\).", answer: "\\(x - 4y = 0\\) and \\(x + 4y = 0\\)" },
        { prompt: "Are the lines represented by \\(9x^2 + 12xy + 4y^2 = 0\\) distinct or coincident?", answer: "Coincident: \\(h^2 - ab = 36 - 36 = 0\\); the equation is \\((3x + 2y)^2 = 0\\)" },
        { prompt: "Find the separate equations of the lines represented by \\(4x^2 + 4xy - 3y^2 = 0\\).", answer: "\\(2x - y = 0\\) and \\(2x + 3y = 0\\)" },
        { prompt: "What is the degree of the term \\(5x^2y\\)?", answer: "Three" },
      ],
      pyqExampleId: "eaeace1d-4da0-4214-8e5e-47ca13448aae",
      traps: [
        {
          title: "Proving only the case b ≠ 0",
          body: "The proof has two cases. Write the case \\(b = 0\\) as well, where the equation becomes \\(x(ax + 2hy) = 0\\). Leaving it out makes the proof incomplete.",
        },
        {
          title: "Taking h as the whole coefficient of xy",
          body: "The middle term is \\(2hxy\\). In \\(2x^2 - 7xy + 3y^2\\), \\(h = -\\dfrac{7}{2}\\), not \\(-7\\). Using \\(-7\\) makes \\(h^2 - ab\\) four times too big.",
        },
        {
          title: "Homogeneous does not mean a pair",
          body: "\\(x^2 + y^2 = 0\\) is homogeneous of degree two, but only the origin satisfies it, since \\(h^2 - ab = -1 < 0\\). Check \\(h^2 - ab\\) before calling an equation a pair of lines.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmps-slopes",
      name: "Sum and product of the slopes, and the auxiliary equation",
      intuition:
        "Put y = mx in ax² + 2hxy + by² = 0 and divide by x²: you get a quadratic in m whose two roots are the slopes of the two lines. So the sum and product of the slopes can be read straight off the coefficients, without finding the lines. Most 'find k' questions are this quadratic in disguise.",
      definition:
        "- When \\(b \\neq 0\\), the slopes \\(m_1, m_2\\) are the roots of the **auxiliary equation** \\(bm^2 + 2hm + a = 0\\).\n" +
        "- \\(m_1 + m_2 = -\\dfrac{2h}{b}\\) and \\(m_1m_2 = \\dfrac{a}{b}\\). The slopes are \\(\\dfrac{-h \\pm \\sqrt{h^2 - ab}}{b}\\).\n" +
        "- If \\(b = 0\\), one line is the Y-axis (no slope) and the other has slope \\(-\\dfrac{a}{2h}\\), provided \\(h \\neq 0\\).\n" +
        "- A given line through the origin is one of the pair exactly when its slope is a root of the auxiliary equation: substitute the slope.\n" +
        "- Slopes in a given relation (one is \\(k\\) times the other, they differ by \\(d\\)): write the slopes as \\(m\\) and \\(km\\), use the sum and the product, and eliminate \\(m\\).\n" +
        "- Difference of the slopes: \\((m_1 - m_2)^2 = (m_1 + m_2)^2 - 4m_1m_2 = \\dfrac{4(h^2 - ab)}{b^2}\\).",
      formula: {
        label: "Auxiliary equation, sum and product of slopes",
        latex: "bm^2 + 2hm + a = 0, \\qquad m_1 + m_2 = -\\frac{2h}{b}, \\qquad m_1m_2 = \\frac{a}{b}",
      },
      authoredExample: {
        prompt:
          "Find the value of \\(k\\) if the slope of one of the lines represented by \\(2x^2 + kxy + y^2 = 0\\) is twice the slope of the other.",
        steps: [
          "Comparing with \\(ax^2 + 2hxy + by^2 = 0\\): \\(a = 2\\), \\(2h = k\\), \\(b = 1\\).",
          "Let the slopes be \\(m\\) and \\(2m\\).",
          "Sum: \\(m + 2m = -\\dfrac{2h}{b}\\), so \\(3m = -k\\) and \\(m = -\\dfrac{k}{3}\\). ... (1)",
          "Product: \\(m \\cdot 2m = \\dfrac{a}{b}\\), so \\(2m^2 = 2\\) and \\(m^2 = 1\\). ... (2)",
          "From (1) and (2): \\(\\dfrac{k^2}{9} = 1\\), so \\(k^2 = 9\\).",
          "\\(\\therefore k = \\pm 3\\). Check \\(k = 3\\): \\(2x^2 + 3xy + y^2 = (2x + y)(x + y)\\), slopes \\(-2\\) and \\(-1\\).",
        ],
        answer: "\\(k = \\pm 3\\)",
      },
      selfCheckExample: {
        prompt: "Find the sum and the product of the slopes of the lines represented by \\(3x^2 - 8xy + 4y^2 = 0\\).",
        steps: ["\\(a = 3\\), \\(2h = -8\\), \\(b = 4\\).", "Sum \\(= -\\dfrac{2h}{b} = \\dfrac{8}{4} = 2\\); product \\(= \\dfrac{a}{b} = \\dfrac{3}{4}\\)."],
        answer: "Sum 2, product \\(\\dfrac{3}{4}\\)",
      },
      practiceSet: [
        { prompt: "Write the auxiliary equation of \\(5x^2 + 4xy - y^2 = 0\\).", answer: "\\(-m^2 + 4m + 5 = 0\\), that is \\(m^2 - 4m - 5 = 0\\)" },
        { prompt: "Find \\(k\\) if \\(x - 2y = 0\\) is one of the lines represented by \\(x^2 + kxy + 2y^2 = 0\\).", answer: "Slope \\(\\dfrac{1}{2}\\) is a root of \\(2m^2 + km + 1 = 0\\): \\(\\dfrac{1}{2} + \\dfrac{k}{2} + 1 = 0\\), so \\(k = -3\\)" },
        { prompt: "Find the difference between the slopes of the lines represented by \\(x^2 - 5xy + 4y^2 = 0\\).", answer: "\\(\\dfrac{3}{4}\\) (the slopes are 1 and \\(\\dfrac{1}{4}\\))" },
        { prompt: "Find the lines represented by \\(3x^2 + 4xy = 0\\).", answer: "\\(x = 0\\) (the Y-axis) and \\(3x + 4y = 0\\)" },
      ],
      pyqExampleId: "33b46424-0cf7-490b-b81f-bc52717dc191",
      traps: [
        {
          title: "Writing the auxiliary equation the wrong way round",
          body: "The auxiliary equation is \\(bm^2 + 2hm + a = 0\\): the coefficient of \\(y^2\\) goes with \\(m^2\\). So the sum of the slopes is \\(-\\dfrac{2h}{b}\\) and the product \\(\\dfrac{a}{b}\\), not \\(\\dfrac{b}{a}\\).",
        },
        {
          title: "Keeping only one value of k",
          body: "Elimination often ends in \\(k^2 = \\) a number. Give both signs, \\(k = \\pm 3\\), unless the question rules one out.",
        },
        {
          title: "Dividing by b when there is no y² term",
          body: "If \\(b = 0\\) the formulas \\(-\\dfrac{2h}{b}\\) and \\(\\dfrac{a}{b}\\) do not exist. Factorise instead: one line is \\(x = 0\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmps-perpendicular",
      name: "Pair through the origin perpendicular to a given pair",
      intuition:
        "Each new line must be perpendicular to one of the given lines, so its slope is minus the reciprocal of that line's slope. Write the two new lines with these slopes, multiply them, and replace the sum and product of the old slopes by −2h/b and a/b. The result is easy to remember: swap a and b, and change the sign of the middle term.",
      definition:
        "- Let \\(m_1, m_2\\) be the slopes of the lines \\(ax^2 + 2hxy + by^2 = 0\\), so \\(m_1 + m_2 = -\\dfrac{2h}{b}\\) and \\(m_1m_2 = \\dfrac{a}{b}\\).\n" +
        "- The required lines have slopes \\(-\\dfrac{1}{m_1}\\) and \\(-\\dfrac{1}{m_2}\\) and pass through the origin: \\(y = -\\dfrac{x}{m_1}\\) and \\(y = -\\dfrac{x}{m_2}\\), that is \\(x + m_1y = 0\\) and \\(x + m_2y = 0\\).\n" +
        "- Combined equation: \\((x + m_1y)(x + m_2y) = 0\\), so \\(x^2 + (m_1 + m_2)xy + m_1m_2y^2 = 0\\).\n" +
        "- \\(\\therefore x^2 - \\dfrac{2h}{b}xy + \\dfrac{a}{b}y^2 = 0\\). Multiply by \\(b\\): \\(bx^2 - 2hxy + ay^2 = 0\\).\n" +
        "- In a board answer, show these steps with the numbers of the question; quote the result as a check.",
      formula: {
        label: "Perpendicular pair through the origin",
        latex: "ax^2 + 2hxy + by^2 = 0 \\;\\longrightarrow\\; bx^2 - 2hxy + ay^2 = 0",
      },
      authoredExample: {
        prompt:
          "Find the joint equation of the pair of lines through the origin which are perpendicular to the lines represented by \\(6x^2 - xy - 2y^2 = 0\\).",
        steps: [
          "Comparing with \\(ax^2 + 2hxy + by^2 = 0\\): \\(a = 6\\), \\(2h = -1\\), \\(b = -2\\).",
          "If \\(m_1, m_2\\) are the slopes of the given lines: \\(m_1 + m_2 = -\\dfrac{2h}{b} = -\\dfrac{-1}{-2} = -\\dfrac{1}{2}\\) and \\(m_1m_2 = \\dfrac{a}{b} = \\dfrac{6}{-2} = -3\\).",
          "The required lines have slopes \\(-\\dfrac{1}{m_1}\\), \\(-\\dfrac{1}{m_2}\\) and pass through the origin: \\(x + m_1y = 0\\) and \\(x + m_2y = 0\\).",
          "Their joint equation: \\(x^2 + (m_1 + m_2)xy + m_1m_2y^2 = 0\\).",
          "\\(\\therefore x^2 - \\dfrac{1}{2}xy - 3y^2 = 0\\)",
          "\\(\\therefore 2x^2 - xy - 6y^2 = 0\\)",
        ],
        answer: "\\(2x^2 - xy - 6y^2 = 0\\)",
      },
      selfCheckExample: {
        prompt:
          "Find the joint equation of the pair of lines through the origin perpendicular to the lines represented by \\(x^2 - 4xy + 3y^2 = 0\\).",
        steps: ["\\(a = 1\\), \\(2h = -4\\), \\(b = 3\\).", "\\(bx^2 - 2hxy + ay^2 = 0\\) gives \\(3x^2 + 4xy + y^2 = 0\\)."],
        answer: "\\(3x^2 + 4xy + y^2 = 0\\)",
      },
      practiceSet: [
        { prompt: "Find the joint equation of the pair of lines through the origin perpendicular to the lines \\(3x^2 + 7xy + 2y^2 = 0\\).", answer: "\\(2x^2 - 7xy + 3y^2 = 0\\)" },
        { prompt: "Find the joint equation of the pair of lines through the origin perpendicular to the lines \\(4x^2 + xy = 0\\).", answer: "\\(4y^2 - xy = 0\\), that is the lines \\(y = 0\\) and \\(x - 4y = 0\\)" },
        { prompt: "Which pair of lines through the origin is perpendicular to the pair \\(x^2 - y^2 = 0\\)?", answer: "The same pair, \\(x^2 - y^2 = 0\\): the lines \\(y = x\\) and \\(y = -x\\) are already perpendicular to each other" },
      ],
      pyqExampleId: "56609e0c-3f59-41a2-a19a-b26849c8a2cf",
      traps: [
        {
          title: "Doing only half of the rule",
          body: "Two things change: \\(a\\) and \\(b\\) swap places, and the middle term changes sign. For \\(2x^2 + 9xy + 4y^2 = 0\\) the answer is \\(4x^2 - 9xy + 2y^2 = 0\\). Writing \\(4x^2 + 9xy + 2y^2 = 0\\) (sign not changed) or \\(2x^2 - 9xy + 4y^2 = 0\\) (not swapped) gives the wrong pair.",
        },
        {
          title: "Taking reciprocal slopes without the minus sign",
          body: "A line perpendicular to slope \\(m\\) has slope \\(-\\dfrac{1}{m}\\). Using \\(\\dfrac{1}{m}\\) gives lines through the origin that are not perpendicular to the given ones.",
        },
      ],
    },
  ],
};
