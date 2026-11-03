import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH HSC 12 Mathematics (Part I), Ch. 5 Vectors. Definitions and theorems in the
 * Balbharati wording; every formula re-derived. Most-asked years from the 48
 * board past-paper questions in the bank, 2015-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "mh-hsc-12",
  subjectName: "Mathematics",
  subjectRoute: "mathematics",
  chapterName: "Vectors",
  chapterSlug: "vectors",
  source: "Balbharati Mathematics and Statistics Part I Std XII (Maharashtra State Board), Chapter 5",
  keyPoints: [
    {
      term: "Unit vector",
      text: "A vector whose magnitude is unity is called a unit vector. The unit vector along \\(\\bar{a}\\) is \\(\\hat{a} = \\frac{\\bar{a}}{|\\bar{a}|}\\); the one in the opposite direction is \\(-\\hat{a}\\).",
    },
    {
      term: "Collinear vectors",
      text: "Vectors are collinear if they are parallel to the same line or along the same line. Two non-zero vectors are collinear if \\(\\bar{a} = k\\bar{b}\\), that is their components are proportional.",
    },
    {
      term: "Coplanar vectors",
      text: "Three non-zero vectors \\(\\bar{a}, \\bar{b}, \\bar{c}\\) are coplanar if one is a linear combination of the other two: \\(\\bar{a} = m\\bar{b} + n\\bar{c}\\).",
    },
    {
      term: "Coplanar with two vectors (Theorem 2)",
      text: "Let \\(\\bar{a}\\) and \\(\\bar{b}\\) be non-collinear vectors. A vector \\(\\bar{r}\\) is coplanar with \\(\\bar{a}\\) and \\(\\bar{b}\\) if and only if there exist unique scalars \\(t_1, t_2\\) such that \\(\\bar{r} = t_1\\bar{a} + t_2\\bar{b}\\).",
    },
    {
      term: "Any vector in space (Theorem 4)",
      text: "If \\(\\bar{a}, \\bar{b}, \\bar{c}\\) are three non-coplanar vectors, then any vector \\(\\bar{r}\\) in space can be uniquely expressed as a linear combination of \\(\\bar{a}, \\bar{b}, \\bar{c}\\).",
    },
    {
      term: "Position vector",
      text: "For a point \\(P(x, y, z)\\) and origin O, \\(\\overline{OP} = x\\hat{i} + y\\hat{j} + z\\hat{k}\\) is the position vector of P. For points A and B, \\(\\overline{AB} = \\bar{b} - \\bar{a}\\) (terminal minus initial).",
    },
    {
      term: "Direction cosines",
      text: "If a line makes angles \\(\\alpha, \\beta, \\gamma\\) (direction angles) with the X, Y and Z axes, then \\(l = \\cos\\alpha\\), \\(m = \\cos\\beta\\), \\(n = \\cos\\gamma\\) are its direction cosines, and \\(l^2 + m^2 + n^2 = 1\\).",
    },
    {
      term: "Direction ratios",
      text: "Any 3 numbers which are proportional to the direction cosines of a line are called its direction ratios (d.r.s). A line has infinitely many sets of d.r.s but one pair of d.c.s, \\(l, m, n\\) and \\(-l, -m, -n\\).",
    },
    {
      term: "Scalar (dot) product",
      text: "\\(\\bar{a} \\cdot \\bar{b} = |\\bar{a}||\\bar{b}|\\cos\\theta\\), where \\(\\theta\\) is the angle between them. It is a scalar; \\(\\bar{a} \\cdot \\bar{b} = 0\\) if and only if the non-zero vectors are perpendicular.",
    },
    {
      term: "Vector (cross) product",
      text: "\\(\\bar{a} \\times \\bar{b} = |\\bar{a}||\\bar{b}|\\sin\\theta\\,\\hat{n}\\), where \\(\\hat{n}\\) is a unit vector perpendicular to both (right-handed). \\(\\bar{a} \\times \\bar{b} = \\bar{0}\\) if and only if \\(\\bar{a}\\) and \\(\\bar{b}\\) are collinear; \\(\\bar{b} \\times \\bar{a} = -\\bar{a} \\times \\bar{b}\\).",
    },
    {
      term: "Scalar triple product (box product)",
      text: "The dot product of \\(\\bar{a}\\) and \\(\\bar{b} \\times \\bar{c}\\) is the scalar triple product \\([\\bar{a}\\ \\bar{b}\\ \\bar{c}]\\). Cyclic order keeps its value; swapping two vectors changes its sign.",
    },
    {
      term: "When the box product is zero",
      text: "Scalar triple product is zero if at least one of the vectors is a zero vector, or any two vectors are collinear, or all vectors are coplanar. Four points A, B, C, D are coplanar if and only if \\([\\overline{AB}\\ \\overline{AC}\\ \\overline{AD}] = 0\\).",
    },
  ],
  formulas: [
    { label: "Magnitude and unit vector", latex: "|\\bar{a}| = \\sqrt{a_1^2 + a_2^2 + a_3^2} \\qquad \\hat{a} = \\frac{\\bar{a}}{|\\bar{a}|}" },
    {
      label: "Section formula (internal and external)",
      latex: "\\bar{r} = \\frac{m\\bar{b} + n\\bar{a}}{m + n} \\qquad \\bar{r} = \\frac{m\\bar{b} - n\\bar{a}}{m - n}",
    },
    {
      label: "Midpoint and centroids",
      latex: "\\bar{m} = \\frac{\\bar{a} + \\bar{b}}{2} \\qquad \\bar{g}_{\\triangle} = \\frac{\\bar{a} + \\bar{b} + \\bar{c}}{3} \\qquad \\bar{g}_{tetra} = \\frac{\\bar{a} + \\bar{b} + \\bar{c} + \\bar{d}}{4}",
    },
    {
      label: "Incentre of triangle ABC",
      latex: "\\bar{h} = \\frac{BC\\,\\bar{a} + CA\\,\\bar{b} + AB\\,\\bar{c}}{BC + CA + AB}",
    },
    {
      label: "Direction cosines",
      latex: "l^2 + m^2 + n^2 = 1 \\qquad \\cos^2\\alpha + \\cos^2\\beta + \\cos^2\\gamma = 1 \\qquad \\sin^2\\alpha + \\sin^2\\beta + \\sin^2\\gamma = 2",
    },
    {
      label: "From direction ratios a, b, c",
      latex: "l = \\frac{\\pm a}{\\sqrt{a^2 + b^2 + c^2}} \\quad m = \\frac{\\pm b}{\\sqrt{a^2 + b^2 + c^2}} \\quad n = \\frac{\\pm c}{\\sqrt{a^2 + b^2 + c^2}}",
    },
    {
      label: "Dot product and angle",
      latex: "\\bar{a} \\cdot \\bar{b} = a_1b_1 + a_2b_2 + a_3b_3 \\qquad \\cos\\theta = \\frac{\\bar{a} \\cdot \\bar{b}}{|\\bar{a}||\\bar{b}|}",
    },
    {
      label: "Angle between two lines with d.r.s",
      latex: "\\cos\\theta = \\frac{|a_1a_2 + b_1b_2 + c_1c_2|}{\\sqrt{a_1^2 + b_1^2 + c_1^2}\\,\\sqrt{a_2^2 + b_2^2 + c_2^2}}",
    },
    {
      label: "Projections of b on a",
      latex: "\\text{scalar: } \\frac{\\bar{a} \\cdot \\bar{b}}{|\\bar{a}|} \\qquad \\text{vector: } \\left(\\frac{\\bar{a} \\cdot \\bar{b}}{|\\bar{a}|^2}\\right)\\bar{a}",
    },
    {
      label: "Cross product",
      latex: "\\bar{a} \\times \\bar{b} = \\begin{vmatrix} \\hat{i} & \\hat{j} & \\hat{k} \\\\ a_1 & a_2 & a_3 \\\\ b_1 & b_2 & b_3 \\end{vmatrix} \\qquad \\sin\\theta = \\frac{|\\bar{a} \\times \\bar{b}|}{|\\bar{a}||\\bar{b}|}",
    },
    {
      label: "Unit vectors",
      latex: "\\hat{i} \\times \\hat{j} = \\hat{k} \\quad \\hat{j} \\times \\hat{k} = \\hat{i} \\quad \\hat{k} \\times \\hat{i} = \\hat{j} \\qquad \\hat{i} \\cdot \\hat{i} = 1,\\ \\hat{i} \\cdot \\hat{j} = 0",
    },
    {
      label: "Dot and cross together",
      latex: "|\\bar{a} \\times \\bar{b}|^2 + (\\bar{a} \\cdot \\bar{b})^2 = |\\bar{a}|^2|\\bar{b}|^2",
    },
    {
      label: "Areas",
      latex: "\\text{parallelogram} = |\\bar{a} \\times \\bar{b}| \\qquad \\text{triangle} = \\frac{1}{2}|\\bar{a} \\times \\bar{b}|",
    },
    {
      label: "Scalar triple product",
      latex: "[\\bar{a}\\ \\bar{b}\\ \\bar{c}] = \\bar{a} \\cdot (\\bar{b} \\times \\bar{c}) = \\begin{vmatrix} a_1 & a_2 & a_3 \\\\ b_1 & b_2 & b_3 \\\\ c_1 & c_2 & c_3 \\end{vmatrix}",
    },
    {
      label: "Volumes",
      latex: "V_{parallelopiped} = |[\\bar{a}\\ \\bar{b}\\ \\bar{c}]| \\qquad V_{tetrahedron} = \\frac{1}{6}|[\\bar{a}\\ \\bar{b}\\ \\bar{c}]|",
    },
  ],
  derivations: [
    {
      title: "Prove the section formula for internal division: \\(\\bar{r} = \\frac{m\\bar{b} + n\\bar{a}}{m + n}\\)",
      steps: [
        "R lies on AB with \\(\\frac{AR}{RB} = \\frac{m}{n}\\), and \\(\\overline{AR}\\), \\(\\overline{RB}\\) have the same direction, so \\(n\\,\\overline{AR} = m\\,\\overline{RB}\\).",
        "Write in position vectors: \\(n(\\bar{r} - \\bar{a}) = m(\\bar{b} - \\bar{r})\\).",
        "\\(m\\bar{b} + n\\bar{a} = (m + n)\\bar{r}\\), so \\(\\bar{r} = \\frac{m\\bar{b} + n\\bar{a}}{m + n}\\). For external division, \\(\\bar{r} = \\frac{m\\bar{b} - n\\bar{a}}{m - n}\\).",
      ],
    },
    {
      title: "Let \\(\\bar{a}, \\bar{b}\\) be non-collinear. Prove \\(\\bar{r}\\) is coplanar with them if and only if \\(\\bar{r} = t_1\\bar{a} + t_2\\bar{b}\\) for unique scalars",
      steps: [
        "Only if: take \\(\\bar{a}\\) along OA, \\(\\bar{b}\\) along OB, \\(\\overline{OP} = \\bar{r}\\). Through P draw lines parallel to OB and OA, meeting OA in M and OB in N.",
        "\\(\\overline{OM} = t_1\\bar{a}\\), \\(\\overline{ON} = t_2\\bar{b}\\); by the parallelogram law \\(\\bar{r} = t_1\\bar{a} + t_2\\bar{b}\\).",
        "Unique: if also \\(\\bar{r} = s_1\\bar{a} + s_2\\bar{b}\\), then \\((t_1 - s_1)\\bar{a} + (t_2 - s_2)\\bar{b} = \\bar{0}\\); non-collinear gives \\(t_1 = s_1\\), \\(t_2 = s_2\\).",
        "If: \\(t_1\\bar{a}\\) and \\(t_2\\bar{b}\\) lie in the plane of \\(\\bar{a}, \\bar{b}\\), so their sum \\(\\bar{r}\\) does too.",
      ],
    },
    {
      title: "If \\(\\bar{a}, \\bar{b}, \\bar{c}\\) are non-coplanar, prove any \\(\\bar{r}\\) is uniquely a linear combination of them",
      steps: [
        "Take all vectors from one point A, \\(\\overline{AP} = \\bar{r}\\). Through P draw a line parallel to \\(\\bar{c}\\) meeting the plane of \\(\\bar{a}, \\bar{b}\\) at Q.",
        "\\(\\overline{QP} = t_3\\bar{c}\\), and \\(\\overline{AQ}\\) is coplanar with \\(\\bar{a}, \\bar{b}\\), so \\(\\overline{AQ} = t_1\\bar{a} + t_2\\bar{b}\\).",
        "Hence \\(\\bar{r} = t_1\\bar{a} + t_2\\bar{b} + t_3\\bar{c}\\).",
        "Unique: two such forms subtract to \\(x\\bar{a} + y\\bar{b} + z\\bar{c} = \\bar{0}\\); non-coplanar vectors force \\(x = y = z = 0\\).",
      ],
    },
    {
      title: "Prove by vector method that the medians of a triangle are concurrent",
      steps: [
        "D, E, F are midpoints of BC, CA, AB: \\(\\bar{d} = \\frac{\\bar{b} + \\bar{c}}{2}\\), \\(\\bar{e} = \\frac{\\bar{c} + \\bar{a}}{2}\\), \\(\\bar{f} = \\frac{\\bar{a} + \\bar{b}}{2}\\).",
        "The point dividing AD internally in \\(2 : 1\\) is \\(\\frac{2\\bar{d} + \\bar{a}}{3} = \\frac{\\bar{a} + \\bar{b} + \\bar{c}}{3} = \\bar{g}\\).",
        "By symmetry the points dividing BE and CF in \\(2 : 1\\) are also \\(\\bar{g}\\), so G lies on all three medians.",
      ],
    },
    {
      title: "Prove by vector method that the altitudes of a triangle are concurrent",
      steps: [
        "Let the altitudes AD and BE meet at P: \\((\\bar{p} - \\bar{a}) \\cdot (\\bar{c} - \\bar{b}) = 0\\) and \\((\\bar{p} - \\bar{b}) \\cdot (\\bar{a} - \\bar{c}) = 0\\).",
        "Add and simplify: \\(\\bar{p} \\cdot \\bar{a} - \\bar{p} \\cdot \\bar{b} - \\bar{c} \\cdot \\bar{a} + \\bar{c} \\cdot \\bar{b} = 0\\), that is \\((\\bar{p} - \\bar{c}) \\cdot (\\bar{a} - \\bar{b}) = 0\\).",
        "So \\(\\overline{CP} \\perp \\overline{AB}\\): CP lies along the altitude CF, and P lies on all three altitudes.",
      ],
    },
    {
      title: "Prove by vector method that the angle subtended on a semicircle is a right angle",
      steps: [
        "Take the centre O as origin; AB is a diameter, so \\(\\overline{OA} = \\bar{a}\\), \\(\\overline{OB} = -\\bar{a}\\); P on the circle has \\(|\\bar{p}| = |\\bar{a}|\\).",
        "\\(\\overline{AP} \\cdot \\overline{BP} = (\\bar{p} - \\bar{a}) \\cdot (\\bar{p} + \\bar{a}) = |\\bar{p}|^2 - |\\bar{a}|^2 = 0\\).",
        "So \\(\\overline{AP} \\perp \\overline{BP}\\) and \\(\\angle APB = 90^\\circ\\).",
      ],
    },
    {
      title: "Prove that the volume of a parallelopiped is \\([\\bar{a}\\ \\bar{b}\\ \\bar{c}]\\), and of a tetrahedron \\(\\frac{1}{6}[\\bar{a}\\ \\bar{b}\\ \\bar{c}]\\)",
      steps: [
        "Coterminus edges \\(\\overline{OA} = \\bar{a}\\), \\(\\overline{OB} = \\bar{b}\\), \\(\\overline{OC} = \\bar{c}\\). Area of the base parallelogram on \\(\\bar{b}, \\bar{c}\\) is \\(|\\bar{b} \\times \\bar{c}|\\).",
        "Height AP = scalar projection of \\(\\bar{a}\\) on \\(\\bar{b} \\times \\bar{c}\\) \\(= \\frac{|\\bar{a} \\cdot (\\bar{b} \\times \\bar{c})|}{|\\bar{b} \\times \\bar{c}|}\\).",
        "Volume = base area \\(\\times\\) height \\(= |\\bar{a} \\cdot (\\bar{b} \\times \\bar{c})| = |[\\bar{a}\\ \\bar{b}\\ \\bar{c}]|\\).",
        "Tetrahedron: \\(\\frac{1}{3} \\times \\frac{1}{2}|\\bar{b} \\times \\bar{c}| \\times\\) height \\(= \\frac{1}{6}|[\\bar{a}\\ \\bar{b}\\ \\bar{c}]|\\).",
      ],
    },
    {
      title: "If \\(l, m, n\\) are the direction cosines of a line, prove that \\(l^2 + m^2 + n^2 = 1\\)",
      steps: [
        "Take \\(\\overline{OP} = \\bar{r}\\) along the line, \\(P(x, y, z)\\), \\(|\\bar{r}| = r\\), direction angles \\(\\alpha, \\beta, \\gamma\\).",
        "Then \\(x = r\\cos\\alpha = lr\\), \\(y = mr\\), \\(z = nr\\).",
        "\\(r^2 = x^2 + y^2 + z^2 = r^2(l^2 + m^2 + n^2)\\), so \\(l^2 + m^2 + n^2 = 1\\).",
      ],
    },
    {
      title: "Prove that \\([\\bar{a} + \\bar{b}\\ \\ \\bar{b} + \\bar{c}\\ \\ \\bar{c} + \\bar{a}] = 2[\\bar{a}\\ \\bar{b}\\ \\bar{c}]\\)",
      steps: [
        "\\((\\bar{b} + \\bar{c}) \\times (\\bar{c} + \\bar{a}) = \\bar{b} \\times \\bar{c} + \\bar{b} \\times \\bar{a} + \\bar{c} \\times \\bar{a}\\), since \\(\\bar{c} \\times \\bar{c} = \\bar{0}\\).",
        "Dot with \\(\\bar{a} + \\bar{b}\\): every box product with a repeated vector is 0.",
        "What is left is \\([\\bar{a}\\ \\bar{b}\\ \\bar{c}] + [\\bar{b}\\ \\bar{c}\\ \\bar{a}] = 2[\\bar{a}\\ \\bar{b}\\ \\bar{c}]\\) (cyclic order keeps the value).",
      ],
    },
  ],
  diagrams: [],
  mostAsked: [
    {
      topic: "Section formula: prove it, or use it (ratio of division, centroid, incentre)",
      years: [2026, 2024, 2023, 2022, 2019, 2017, 2015],
    },
    {
      topic: "Scalar triple product: its value, a property, or the volume of a parallelopiped or tetrahedron",
      years: [2026, 2025, 2024, 2023, 2022, 2019, 2018, 2017, 2016],
    },
    {
      topic: "Collinear or coplanar: points or vectors (find \\(p\\), or justify)",
      years: [2026, 2024, 2020, 2019],
    },
    {
      topic: "Dot and cross product: perpendicular vectors, \\(|\\bar{a} \\times \\bar{b}|\\), angle between vectors or lines",
      years: [2026, 2025, 2024, 2023, 2018],
    },
    {
      topic: "Vector method in geometry: medians or altitudes concurrent, angle in a semicircle",
      years: [2026, 2025, 2024, 2022],
    },
    { topic: "Direction angles and direction cosines, and \\(l^2 + m^2 + n^2 = 1\\)", years: [2025, 2024, 2020, 2017] },
    {
      topic: "Linear combination: \\(\\bar{r}\\) coplanar with \\(\\bar{a}, \\bar{b}\\), or any \\(\\bar{r}\\) from three non-coplanar vectors",
      years: [2026, 2025, 2024, 2015],
    },
    { topic: "Magnitude, unit vector, or the terminal point of a vector", years: [2025, 2023] },
  ],
  mistakes: [
    {
      title: "Swapping \\(\\bar{a}\\) and \\(\\bar{b}\\) in the section formula",
      body: "For R dividing AB in \\(m : n\\), \\(m\\) goes with \\(\\bar{b}\\) (the far end): \\(\\bar{r} = \\frac{m\\bar{b} + n\\bar{a}}{m + n}\\). Check: when \\(m = 0\\), R is A.",
    },
    {
      title: "Reading a ratio from \\(5\\bar{a} - 3\\bar{b} - 2\\bar{c} = \\bar{0}\\) without rearranging",
      body: "Make the point's coefficient the sum of the others first: \\(2\\bar{c} = 5\\bar{a} - 3\\bar{b}\\) gives \\(\\bar{c} = \\frac{5\\bar{a} - 3\\bar{b}}{5 - 3}\\), so C divides BA externally in \\(5 : 3\\).",
    },
    {
      title: "Ignoring the sign when vectors are swapped",
      body: "\\(\\bar{b} \\times \\bar{a} = -\\bar{a} \\times \\bar{b}\\) and \\([\\bar{b}\\ \\bar{a}\\ \\bar{c}] = -[\\bar{a}\\ \\bar{b}\\ \\bar{c}]\\). Only cyclic order keeps the value: \\(\\hat{p} \\cdot (\\hat{q} \\times \\hat{r}) + \\hat{q} \\cdot (\\hat{p} \\times \\hat{r}) + \\hat{r} \\cdot (\\hat{p} \\times \\hat{q}) = 1 - 1 + 1 = 1\\).",
    },
    {
      title: "Taking a negative volume",
      body: "Volume is the absolute value of the box product. If the determinant comes out negative, write its modulus as the volume.",
    },
    {
      title: "Giving direction ratios as direction cosines",
      body: "Divide d.r.s by \\(\\sqrt{a^2 + b^2 + c^2}\\) to get d.c.s, and check \\(l^2 + m^2 + n^2 = 1\\). For two given direction angles, the third has two values: \\(\\cos\\gamma = \\pm\\sqrt{1 - \\cos^2\\alpha - \\cos^2\\beta}\\).",
    },
  ],
};

export default sheet;
