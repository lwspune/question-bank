import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH HSC 12 Mathematics (Part I), Ch. 4 Pair of Straight Lines. Definitions and
 * theorems in the Balbharati wording; every formula re-derived. Most-asked years
 * from the 30 board past-paper questions in the bank, 2015-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "mh-hsc-12",
  subjectName: "Mathematics",
  subjectRoute: "mathematics",
  chapterName: "Pair of Straight Lines",
  chapterSlug: "pair-of-straight-lines",
  source: "Balbharati Mathematics and Statistics Part I Std XII (Maharashtra State Board), Chapter 4",
  keyPoints: [
    {
      term: "Combined equation",
      text: "An equation which represents two lines is called the combined (joint) equation of those two lines. If \\(u = 0\\) and \\(v = 0\\) are two lines, \\(uv = 0\\) is their combined equation.",
    },
    {
      term: "Homogeneous equation",
      text: "An equation in which the degree of every term is the same. The combined equation of a pair of lines through the origin is a homogeneous equation of degree two in \\(x\\) and \\(y\\).",
    },
    {
      term: "Converse is not true",
      text: "Every homogeneous equation of degree two need not represent a pair of lines: \\(x^2 + y^2 = 0\\) is homogeneous of degree two but does not represent a pair of lines (only the origin satisfies it).",
    },
    {
      term: "Nature of the lines",
      text: "\\(ax^2 + 2hxy + by^2 = 0\\) represents a pair of lines through the origin if \\(h^2 - ab \\ge 0\\). If \\(h^2 - ab > 0\\) the lines are distinct, if \\(h^2 - ab = 0\\) they are coincident, if \\(h^2 - ab < 0\\) it is not a pair of lines.",
    },
    {
      term: "Auxiliary equation",
      text: "Put \\(y = mx\\): the quadratic \\(bm^2 + 2hm + a = 0\\) is the auxiliary equation. Its roots \\(m_1, m_2\\) are the slopes of the two lines.",
    },
    {
      term: "Perpendicular lines",
      text: "Lines represented by \\(ax^2 + 2hxy + by^2 = 0\\) are perpendicular to each other if and only if \\(a + b = 0\\), that is, coefficient of \\(x^2\\) + coefficient of \\(y^2\\) = 0.",
    },
    {
      term: "Coincident lines",
      text: "Lines represented by \\(ax^2 + 2hxy + by^2 = 0\\) are coincident if and only if \\(h^2 = ab\\) (then \\(m_1 = m_2\\)).",
    },
    {
      term: "General second degree equation",
      text: "An equation of the form \\(ax^2 + 2hxy + by^2 + 2gx + 2fy + c = 0\\), where at least one of \\(a, b, h\\) is not zero. The combined equation of any two lines is of this form, but not every such equation is a pair of lines (e.g. \\(x^2 + y^2 = 25\\)).",
    },
    {
      term: "Necessary conditions",
      text: "For the general equation to represent a pair of lines: \\(abc + 2fgh - af^2 - bg^2 - ch^2 = 0\\) and \\(h^2 - ab \\ge 0\\). The first condition is **not sufficient**: to prove a pair, factorise.",
    },
    {
      term: "Lines of the general equation",
      text: "If \\(ax^2 + 2hxy + by^2 + 2gx + 2fy + c = 0\\) is a pair of lines, they are parallel to the lines of \\(ax^2 + 2hxy + by^2 = 0\\): same angle, perpendicular if \\(a + b = 0\\), parallel if \\(h^2 = ab\\).",
    },
    {
      term: "Angle bisectors",
      text: "The joint equation of the bisectors of the angles between the lines of \\(ax^2 + 2hxy + by^2 = 0\\) is \\(hx^2 - (a - b)xy - hy^2 = 0\\). Coefficient of \\(x^2\\) + coefficient of \\(y^2\\) = 0, so the bisectors are perpendicular.",
    },
  ],
  formulas: [
    { label: "Slopes of the lines through the origin", latex: "m_1 + m_2 = -\\frac{2h}{b} \\qquad m_1 m_2 = \\frac{a}{b}" },
    { label: "Auxiliary equation", latex: "bm^2 + 2hm + a = 0" },
    {
      label: "Slopes one by one",
      latex: "m_1 = \\frac{-h + \\sqrt{h^2 - ab}}{b} \\qquad m_2 = \\frac{-h - \\sqrt{h^2 - ab}}{b}",
    },
    { label: "Difference of slopes", latex: "|m_1 - m_2| = \\frac{2\\sqrt{h^2 - ab}}{|b|}" },
    { label: "Acute angle between the lines", latex: "\\tan\\theta = \\left|\\frac{2\\sqrt{h^2 - ab}}{a + b}\\right|" },
    { label: "Perpendicular and coincident", latex: "a + b = 0 \\qquad h^2 = ab" },
    { label: "Lines through the origin with slopes m1 and m2", latex: "m_1 m_2 x^2 - (m_1 + m_2)xy + y^2 = 0" },
    { label: "Pair through the origin perpendicular to the given pair", latex: "bx^2 - 2hxy + ay^2 = 0" },
    { label: "Joint equation of the coordinate axes", latex: "xy = 0" },
    {
      label: "Condition for a pair of lines (general equation)",
      latex:
        "abc + 2fgh - af^2 - bg^2 - ch^2 = 0 \\iff \\begin{vmatrix} a & h & g \\\\ h & b & f \\\\ g & f & c \\end{vmatrix} = 0",
    },
    {
      label: "Point of intersection (general equation)",
      latex: "\\left(\\frac{hf - bg}{ab - h^2},\\ \\frac{gh - af}{ab - h^2}\\right)",
    },
    { label: "Bisectors of the angles", latex: "hx^2 - (a - b)xy - hy^2 = 0" },
  ],
  derivations: [
    {
      title: "Prove that \\(ax^2 + 2hxy + by^2 = 0\\) represents a pair of lines through the origin if \\(h^2 - ab \\ge 0\\)",
      steps: [
        "Case \\(b = 0\\): the equation is \\(x(ax + 2hy) = 0\\), the lines \\(x = 0\\) and \\(ax + 2hy = 0\\), both through the origin.",
        "Case \\(b \\ne 0\\): multiply by \\(b\\): \\(b^2y^2 + 2hbxy = -abx^2\\). Add \\(h^2x^2\\) to both sides: \\((by + hx)^2 = (h^2 - ab)x^2\\).",
        "As \\(h^2 - ab \\ge 0\\), write it as \\((by + hx)^2 - (\\sqrt{h^2 - ab}\\,x)^2 = 0\\) and factorise.",
        "\\([(h + \\sqrt{h^2 - ab})x + by][(h - \\sqrt{h^2 - ab})x + by] = 0\\): two lines through the origin.",
      ],
    },
    {
      title: "Prove that the acute angle \\(\\theta\\) between the lines \\(ax^2 + 2hxy + by^2 = 0\\) is given by \\(\\tan\\theta = \\left|\\frac{2\\sqrt{h^2 - ab}}{a + b}\\right|\\)",
      steps: [
        "Let \\(m_1, m_2\\) be the slopes: roots of \\(bm^2 + 2hm + a = 0\\), so \\(m_1 + m_2 = -\\frac{2h}{b}\\), \\(m_1m_2 = \\frac{a}{b}\\).",
        "\\((m_1 - m_2)^2 = (m_1 + m_2)^2 - 4m_1m_2 = \\frac{4h^2}{b^2} - \\frac{4a}{b} = \\frac{4(h^2 - ab)}{b^2}\\).",
        "\\(1 + m_1m_2 = \\frac{a + b}{b}\\).",
        "\\(\\tan\\theta = \\left|\\frac{m_1 - m_2}{1 + m_1m_2}\\right| = \\left|\\frac{2\\sqrt{h^2 - ab}}{a + b}\\right|\\). Coincident when \\(h^2 = ab\\) (\\(\\theta = 0\\)); perpendicular when \\(a + b = 0\\).",
      ],
    },
    {
      title: "Find \\(k\\) when a given line \\(px + qy = 0\\) is one of the lines of \\(ax^2 + 2hxy + by^2 = 0\\)",
      steps: [
        "Write the auxiliary equation \\(bm^2 + 2hm + a = 0\\).",
        "The slope \\(-\\frac{p}{q}\\) of the given line is a root: substitute it and solve for \\(k\\).",
        "Example: \\(2x + y = 0\\) in \\(3x^2 + kxy + 2y^2 = 0\\): \\(m = -2\\) in \\(2m^2 + km + 3 = 0\\) gives \\(k = \\frac{11}{2}\\).",
      ],
    },
    {
      title: "Find the joint equation of the lines through the origin perpendicular to the lines \\(ax^2 + 2hxy + by^2 = 0\\)",
      steps: [
        "The given lines have slopes \\(m_1, m_2\\) with \\(m_1 + m_2 = -\\frac{2h}{b}\\), \\(m_1m_2 = \\frac{a}{b}\\).",
        "Required lines: \\(y = -\\frac{1}{m_1}x\\) and \\(y = -\\frac{1}{m_2}x\\), that is \\(x + m_1y = 0\\) and \\(x + m_2y = 0\\).",
        "Joint equation: \\(x^2 + (m_1 + m_2)xy + m_1m_2y^2 = 0\\). Substitute and multiply by \\(b\\): \\(bx^2 - 2hxy + ay^2 = 0\\).",
      ],
    },
    {
      title: "Show that a general second degree equation represents a pair of lines, and find their point of intersection",
      steps: [
        "Factorise the degree-two part, e.g. \\(x^2 - 6xy + 5y^2 = (x - 5y)(x - y)\\).",
        "Assume the equation is \\((x - 5y + c)(x - y + k) = 0\\); compare the coefficients of \\(x\\), \\(y\\) and the constant to find \\(c, k\\).",
        "If the values satisfy all three comparisons, it is a pair of lines. Solve the two lines (or use the intersection formula) for the point.",
        "For unknown coefficients (find \\(p, q\\)): use \\(a + b = 0\\) for perpendicular lines and \\(abc + 2fgh - af^2 - bg^2 - ch^2 = 0\\).",
      ],
    },
  ],
  diagrams: [],
  mostAsked: [
    {
      topic: "Prove that \\(ax^2 + 2hxy + by^2 = 0\\) represents a pair of lines through the origin if \\(h^2 - ab \\ge 0\\)",
      years: [2026, 2025, 2020, 2018, 2016],
    },
    {
      topic: "Prove the acute angle formula \\(\\tan\\theta = \\left|\\frac{2\\sqrt{h^2 - ab}}{a + b}\\right|\\), and the condition for coincident lines",
      years: [2025, 2024, 2023, 2017, 2015],
    },
    {
      topic: "Sum, product, ratio or difference of slopes: find \\(k\\) when the sum of slopes is twice their product",
      years: [2026, 2024, 2023, 2015],
    },
    {
      topic: "Write a combined equation from two lines, or separate equations from a combined one",
      years: [2025, 2024, 2023, 2022],
    },
    { topic: "Find the angle between the lines of a given pair", years: [2024, 2022, 2020] },
    {
      topic: "General second degree equation: find \\(p, q\\) for perpendicular lines, the condition, or the point of intersection",
      years: [2025, 2019, 2015],
    },
    { topic: "Find \\(k\\) if \\(2x + y = 0\\) is one of the lines of \\(3x^2 + kxy + 2y^2 = 0\\)", years: [2026, 2022] },
    { topic: "Joint equation of the lines through the origin perpendicular to a given pair", years: [2018, 2017] },
  ],
  mistakes: [
    {
      title: "Taking the coefficient of \\(xy\\) as \\(h\\)",
      body: "The coefficient of \\(xy\\) is \\(2h\\). In \\(x^2 + kxy - 3y^2 = 0\\), \\(h = \\frac{k}{2}\\), so the sum of slopes is \\(\\frac{k}{3}\\) and the product \\(-\\frac{1}{3}\\), giving \\(k = -2\\).",
    },
    {
      title: "Writing the auxiliary equation backwards",
      body: "Putting \\(y = mx\\) and dividing by \\(x^2\\) gives \\(bm^2 + 2hm + a = 0\\), not \\(am^2 + 2hm + b = 0\\). So \\(m_1 + m_2 = -\\frac{2h}{b}\\) and \\(m_1m_2 = \\frac{a}{b}\\).",
    },
    {
      title: "Using \\(abc + 2fgh - af^2 - bg^2 - ch^2 = 0\\) to prove a pair of lines",
      body: "The condition is necessary, not sufficient. To show an equation represents a pair of lines, factorise it into two linear factors.",
    },
    {
      title: "Taking the slope of \\(px + qy = 0\\) as \\(\\frac{p}{q}\\)",
      body: "The slope is \\(-\\frac{p}{q}\\). For \\(2x + y = 0\\) the slope is \\(-2\\), and a wrong sign gives a wrong \\(k\\).",
    },
    {
      title: "Dropping the modulus in the angle formula",
      body: "The acute angle needs \\(\\tan\\theta \\ge 0\\): take the absolute value. If \\(a + b = 0\\) the formula has no value because the lines are perpendicular (\\(\\theta = 90^\\circ\\)).",
    },
  ],
};

export default sheet;
