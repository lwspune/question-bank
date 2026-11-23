import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_MA_VE_TYPES_NOTE: SubtopicNote = {
  subtopicName: "Vectors and Their Types",
  title: "Vectors and Their Types: Algebra, Components, Collinear and Coplanar Vectors",
  oneLineDefinition:
    "A vector has a magnitude and a direction. This page covers the types of vectors, adding and scaling them, components and magnitude in space, unit vectors, and the tests for collinear and coplanar vectors.",
  whyItMatters:
    "68 questions, the largest page of the chapter, eleven of them from board papers: x and y with c = xa + yb (2015), three collinear points (2019), a component from a given magnitude (2023), the theorem on a vector coplanar with two others with its t₁ and t₂ (2024, 2025), the value of p for collinear vectors (2024), a terminal point, a magnitude and a unit vector in the opposite direction (2025), and the unique linear combination of three non-coplanar vectors and the distance of a point from the XZ plane (2026). The textbook rows are Exercise 5.1, its solved examples and the Miscellaneous Exercise questions on these ideas.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscmve-algebra",
      name: "Types of vectors, and adding, subtracting and scaling them",
      intuition:
        "A vector is a directed line segment: it says how far and which way. To go from A to C you may go from A to B and then from B to C, so the two vectors add to the third. That one idea, the triangle law, does almost every question on this concept: walk round the figure along vectors you know.",
      definition:
        "- **Types:** a zero vector has the same initial and terminal point; a unit vector has magnitude 1; equal vectors have the same magnitude and the same direction; the negative of \\(\\vec{a}\\) has the same magnitude and the opposite direction; collinear vectors are parallel to one line; co-initial vectors share an initial point.\n" +
        "- **Triangle law:** \\(\\overrightarrow{AB} + \\overrightarrow{BC} = \\overrightarrow{AC}\\). For a polygon, \\(\\overrightarrow{AB} + \\overrightarrow{BC} + \\overrightarrow{CD} = \\overrightarrow{AD}\\), and the sides of a closed figure taken in order add to \\(\\vec{0}\\).\n" +
        "- **Parallelogram law:** in parallelogram ABCD, \\(\\overrightarrow{AC} = \\overrightarrow{AB} + \\overrightarrow{AD}\\).\n" +
        "- **Subtraction:** \\(\\vec{a} - \\vec{b} = \\vec{a} + (-\\vec{b})\\). If A and B have position vectors \\(\\vec{a}\\) and \\(\\vec{b}\\), then \\(\\overrightarrow{AB} = \\vec{b} - \\vec{a}\\).\n" +
        "- **Scalar multiple:** \\(k\\vec{a}\\) has magnitude \\(|k|\\,|\\vec{a}|\\); it points the same way as \\(\\vec{a}\\) when \\(k > 0\\) and the opposite way when \\(k < 0\\).",
      formula: {
        label: "Triangle law and the vector joining two points",
        latex: "\\overrightarrow{AB} + \\overrightarrow{BC} = \\overrightarrow{AC}, \\qquad \\overrightarrow{AB} = \\vec{b} - \\vec{a}",
      },
      authoredExample: {
        prompt:
          "In parallelogram ABCD, \\(\\overrightarrow{AB} = 2\\hat{i} + \\hat{j} - \\hat{k}\\) and \\(\\overrightarrow{AD} = \\hat{i} - 3\\hat{j} + 2\\hat{k}\\). Find the diagonal vectors \\(\\overrightarrow{AC}\\) and \\(\\overrightarrow{BD}\\).",
        steps: [
          "By the parallelogram law, \\(\\overrightarrow{AC} = \\overrightarrow{AB} + \\overrightarrow{AD}\\).",
          "\\(\\overrightarrow{AC} = (2 + 1)\\hat{i} + (1 - 3)\\hat{j} + (-1 + 2)\\hat{k} = 3\\hat{i} - 2\\hat{j} + \\hat{k}\\).",
          "By the triangle law in triangle ABD, \\(\\overrightarrow{AB} + \\overrightarrow{BD} = \\overrightarrow{AD}\\), so \\(\\overrightarrow{BD} = \\overrightarrow{AD} - \\overrightarrow{AB}\\).",
          "\\(\\overrightarrow{BD} = (1 - 2)\\hat{i} + (-3 - 1)\\hat{j} + (2 + 1)\\hat{k} = -\\hat{i} - 4\\hat{j} + 3\\hat{k}\\).",
          "Check: \\(\\overrightarrow{AB} + \\overrightarrow{BD} = (2 - 1)\\hat{i} + (1 - 4)\\hat{j} + (-1 + 3)\\hat{k} = \\hat{i} - 3\\hat{j} + 2\\hat{k} = \\overrightarrow{AD}\\).",
        ],
        answer: "\\(\\overrightarrow{AC} = 3\\hat{i} - 2\\hat{j} + \\hat{k}\\) and \\(\\overrightarrow{BD} = -\\hat{i} - 4\\hat{j} + 3\\hat{k}\\)",
      },
      selfCheckExample: {
        prompt:
          "Do the vectors \\(2\\hat{i} - \\hat{j} + \\hat{k}\\), \\(\\hat{i} - 3\\hat{j} - 5\\hat{k}\\) and \\(-3\\hat{i} + 4\\hat{j} + 4\\hat{k}\\) form a triangle?",
        steps: ["Add them: \\((2 + 1 - 3)\\hat{i} + (-1 - 3 + 4)\\hat{j} + (1 - 5 + 4)\\hat{k} = \\vec{0}\\)."],
        answer: "Yes, their sum is the zero vector",
      },
      practiceSet: [
        {
          prompt: "A has position vector \\(3\\hat{i} - \\hat{j} + 2\\hat{k}\\) and B has position vector \\(\\hat{i} + 4\\hat{j} - \\hat{k}\\). Find \\(\\overrightarrow{AB}\\).",
          answer: "\\(-2\\hat{i} + 5\\hat{j} - 3\\hat{k}\\)",
        },
        {
          prompt: "What is \\(\\overrightarrow{AB} + \\overrightarrow{BC} + \\overrightarrow{CA}\\) for any triangle ABC?",
          answer: "The zero vector",
        },
        {
          prompt: "If \\(\\vec{a} = \\hat{i} - 2\\hat{j} + 2\\hat{k}\\), write \\(-3\\vec{a}\\) and state how its direction compares with that of \\(\\vec{a}\\).",
          answer: "\\(-3\\hat{i} + 6\\hat{j} - 6\\hat{k}\\), opposite to \\(\\vec{a}\\)",
        },
      ],
      pyqExampleId: "20e47ab8-9736-4783-9200-25ea849a68bc",
      traps: [
        {
          title: "Subtracting the wrong way round",
          body: "\\(\\overrightarrow{AB}\\) is terminal minus initial: \\(\\vec{b} - \\vec{a}\\). Writing \\(\\vec{a} - \\vec{b}\\) gives \\(\\overrightarrow{BA}\\), the same length pointing the other way.",
        },
        {
          title: "Calling two vectors equal because their lengths match",
          body: "Equal vectors need the same magnitude AND the same direction. A vector and its negative have equal magnitudes but are not equal.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmve-magnitude",
      name: "Components, magnitude, unit vectors and distances in space",
      intuition:
        "Every vector in space is a mix of three steps: x along the X-axis, y along the Y-axis and z along the Z-axis. Its length comes from Pythagoras applied twice. Divide a vector by its own length and you keep its direction but shrink it to length 1: that is the unit vector.",
      definition:
        "- The position vector of \\(P(x, y, z)\\) is \\(\\vec{r} = x\\hat{i} + y\\hat{j} + z\\hat{k}\\); \\(x, y, z\\) are its components.\n" +
        "- \\(|\\vec{r}| = \\sqrt{x^2 + y^2 + z^2}\\). The distance between A and B is \\(|\\overrightarrow{AB}|\\).\n" +
        "- The unit vector along \\(\\vec{a}\\) is \\(\\hat{a} = \\dfrac{\\vec{a}}{|\\vec{a}|}\\); the unit vector in the opposite direction is \\(-\\hat{a}\\); a vector of magnitude \\(k\\) along \\(\\vec{a}\\) is \\(k\\hat{a}\\).\n" +
        "- Distance of \\(P(x, y, z)\\) from the XY, YZ and XZ planes: \\(|z|\\), \\(|x|\\) and \\(|y|\\).\n" +
        "- Distance from the X-axis: \\(\\sqrt{y^2 + z^2}\\); from the Y-axis: \\(\\sqrt{x^2 + z^2}\\); from the Z-axis: \\(\\sqrt{x^2 + y^2}\\).\n" +
        "- If A has position vector \\(\\vec{a}\\), the terminal point B of \\(\\overrightarrow{AB}\\) has position vector \\(\\vec{a} + \\overrightarrow{AB}\\).",
      formula: {
        label: "Magnitude and unit vector",
        latex: "|\\vec{r}| = \\sqrt{x^2 + y^2 + z^2}, \\qquad \\hat{a} = \\frac{\\vec{a}}{|\\vec{a}|}",
      },
      authoredExample: {
        prompt: "Find a vector of magnitude 6 units in the direction opposite to \\(\\vec{a} = 2\\hat{i} - \\hat{j} + 2\\hat{k}\\).",
        steps: [
          "\\(|\\vec{a}| = \\sqrt{2^2 + (-1)^2 + 2^2} = \\sqrt{9} = 3\\).",
          "Unit vector along \\(\\vec{a}\\): \\(\\hat{a} = \\dfrac{1}{3}(2\\hat{i} - \\hat{j} + 2\\hat{k})\\).",
          "The opposite unit vector is \\(-\\hat{a}\\), so the required vector is \\(-6\\hat{a} = -2(2\\hat{i} - \\hat{j} + 2\\hat{k})\\).",
          "\\(= -4\\hat{i} + 2\\hat{j} - 4\\hat{k}\\). Check: \\(\\sqrt{16 + 4 + 16} = 6\\).",
        ],
        answer: "\\(-4\\hat{i} + 2\\hat{j} - 4\\hat{k}\\)",
      },
      selfCheckExample: {
        prompt: "Find the distance of the point \\((2, -3, 6)\\) from the origin and from the Z-axis.",
        steps: [
          "From the origin: \\(\\sqrt{4 + 9 + 36} = \\sqrt{49} = 7\\).",
          "From the Z-axis: \\(\\sqrt{x^2 + y^2} = \\sqrt{4 + 9} = \\sqrt{13}\\).",
        ],
        answer: "7 units and \\(\\sqrt{13}\\) units",
      },
      practiceSet: [
        { prompt: "Find the magnitude of \\(\\vec{p} = 2\\hat{i} + 3\\hat{j} - 6\\hat{k}\\).", answer: "7" },
        { prompt: "Write the unit vector along \\(3\\hat{i} - 4\\hat{k}\\).", answer: "\\(\\dfrac{1}{5}(3\\hat{i} - 4\\hat{k})\\)" },
        { prompt: "How far is the point \\((5, -2, 4)\\) from the YZ plane?", answer: "5 units" },
      ],
      pyqExampleId: "4a90a9f7-8f17-4daa-9880-3bc3834f7c52",
      traps: [
        {
          title: "Keeping only the positive root",
          body: "When a magnitude condition gives \\(c^2\\) a value, \\(c\\) has two values, \\(\\pm\\). Give both unless the question rules one out.",
        },
        {
          title: "Mixing up a plane and an axis",
          body: "The distance from the XZ plane is \\(|y|\\) alone, but the distance from the Y-axis is \\(\\sqrt{x^2 + z^2}\\). Name the plane or axis before you write the formula.",
        },
        {
          title: "A 'unit vector' that is not of length 1",
          body: "Dividing by the wrong magnitude is easy to miss. Square and add the components of your answer: they must add to 1.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmve-collinear",
      name: "Collinear vectors and collinear points",
      intuition:
        "Two vectors are collinear when one is just a stretched or reversed copy of the other. In components that means the three components are in the same ratio. Three points lie on one line when the vector from the first to the third is a multiple of the vector from the first to the second, since both start at the same point.",
      definition:
        "- **Theorem 1:** two non-zero vectors \\(\\vec{a}\\) and \\(\\vec{b}\\) are collinear if and only if \\(m\\vec{a} + n\\vec{b} = \\vec{0}\\) for scalars \\(m, n\\), at least one non-zero; that is, \\(\\vec{a} = t\\vec{b}\\) for a scalar \\(t\\).\n" +
        "- In components, \\(\\vec{a}\\) and \\(\\vec{b}\\) are collinear when \\(\\dfrac{a_1}{b_1} = \\dfrac{a_2}{b_2} = \\dfrac{a_3}{b_3}\\).\n" +
        "- If \\(\\vec{a}\\) and \\(\\vec{b}\\) are not collinear and \\(m\\vec{a} + n\\vec{b} = p\\vec{a} + q\\vec{b}\\), then \\(m = p\\) and \\(n = q\\).\n" +
        "- Points A, B, C are collinear when \\(\\overrightarrow{AC} = t\\,\\overrightarrow{AB}\\): the two vectors are parallel and A is common to both.",
      formula: {
        label: "Test for collinear vectors",
        latex: "\\vec{a} = t\\,\\vec{b}, \\qquad \\frac{a_1}{b_1} = \\frac{a_2}{b_2} = \\frac{a_3}{b_3}",
      },
      authoredExample: {
        prompt: "Find \\(p\\) if the vectors \\(2\\hat{i} + p\\hat{j} - 4\\hat{k}\\) and \\(-3\\hat{i} + 6\\hat{j} + 6\\hat{k}\\) are collinear.",
        steps: [
          "For collinear vectors the components are in the same ratio: \\(\\dfrac{2}{-3} = \\dfrac{p}{6} = \\dfrac{-4}{6}\\).",
          "First and third ratios: \\(\\dfrac{2}{-3} = -\\dfrac{2}{3}\\) and \\(\\dfrac{-4}{6} = -\\dfrac{2}{3}\\). They agree, so collinearity is possible.",
          "\\(\\dfrac{p}{6} = -\\dfrac{2}{3}\\), so \\(p = -4\\).",
          "Check: \\(2\\hat{i} - 4\\hat{j} - 4\\hat{k} = -\\dfrac{2}{3}(-3\\hat{i} + 6\\hat{j} + 6\\hat{k})\\).",
        ],
        answer: "\\(p = -4\\)",
      },
      selfCheckExample: {
        prompt:
          "\\(\\vec{a}\\) and \\(\\vec{b}\\) are not collinear and \\((2\\lambda - 1)\\vec{a} + 3\\vec{b} = 5\\vec{a} + (\\mu + 1)\\vec{b}\\). Find \\(\\lambda\\) and \\(\\mu\\).",
        steps: ["Equate coefficients: \\(2\\lambda - 1 = 5\\) and \\(3 = \\mu + 1\\)."],
        answer: "\\(\\lambda = 3\\), \\(\\mu = 2\\)",
      },
      practiceSet: [
        {
          prompt: "Are \\(2\\hat{i} - 3\\hat{j} + \\hat{k}\\) and \\(-4\\hat{i} + 6\\hat{j} - 2\\hat{k}\\) collinear?",
          answer: "Yes, the second is \\(-2\\) times the first",
        },
        { prompt: "For points P, Q, R, \\(\\overrightarrow{PR} = 4\\,\\overrightarrow{PQ}\\). Are P, Q and R collinear?", answer: "Yes" },
      ],
      pyqExampleId: "71d1ae8e-63a4-4d81-89db-12087a5ecc62",
      traps: [
        {
          title: "Stopping at 'the vectors are parallel'",
          body: "Parallel vectors could lie on two different parallel lines. Write that \\(\\overrightarrow{AB}\\) and \\(\\overrightarrow{AC}\\) are parallel AND have the point A in common; only then are A, B, C collinear.",
        },
        {
          title: "Testing only two of the three ratios",
          body: "Find the unknown from one pair of ratios, then check that the remaining ratio agrees. If it does not, no value makes the vectors collinear.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmve-coplanar",
      name: "Coplanar vectors and linear combinations",
      intuition:
        "Two non-collinear vectors span a flat sheet: any vector lying in that sheet is some amount of the first plus some amount of the second, and those amounts are fixed. Three vectors that do not lie in one sheet span all of space, so every vector is a unique mix of them. Finding the amounts always means equating the coefficients of i, j and k.",
      definition:
        "- Vectors are coplanar if they lie in the same plane or in parallel planes.\n" +
        "- **Theorem 2:** if \\(\\vec{a}\\) and \\(\\vec{b}\\) are non-collinear, \\(\\vec{r}\\) is coplanar with them if and only if \\(\\vec{r} = t_1\\vec{a} + t_2\\vec{b}\\) for unique scalars \\(t_1, t_2\\). Proof outline:\n" +
        "- Take \\(\\vec{a}\\) along OA, \\(\\vec{b}\\) along OB and \\(\\overrightarrow{OP} = \\vec{r}\\). Through P draw lines parallel to OB and OA, meeting OA at M and OB at N.\n" +
        "- \\(\\overrightarrow{OM} = t_1\\vec{a}\\) and \\(\\overrightarrow{ON} = t_2\\vec{b}\\), so by the parallelogram law \\(\\vec{r} = t_1\\vec{a} + t_2\\vec{b}\\).\n" +
        "- Conversely, \\(t_1\\vec{a} + t_2\\vec{b}\\) lies in the plane of \\(\\vec{a}\\) and \\(\\vec{b}\\).\n" +
        "- Uniqueness: if also \\(\\vec{r} = s_1\\vec{a} + s_2\\vec{b}\\), subtracting gives \\((t_1 - s_1)\\vec{a} + (t_2 - s_2)\\vec{b} = \\vec{0}\\); as \\(\\vec{a}, \\vec{b}\\) are non-collinear, \\(t_1 = s_1\\) and \\(t_2 = s_2\\).\n" +
        "- **Theorem 3:** \\(\\vec{a}, \\vec{b}, \\vec{c}\\) are coplanar if and only if \\(x\\vec{a} + y\\vec{b} + z\\vec{c} = \\vec{0}\\) with \\(x, y, z\\) not all zero.\n" +
        "- **Theorem 4:** if \\(\\vec{a}, \\vec{b}, \\vec{c}\\) are non-coplanar, every vector \\(\\vec{r}\\) in space is uniquely \\(x\\vec{a} + y\\vec{b} + z\\vec{c}\\); uniqueness follows the same way, from Theorem 3.",
      formula: {
        label: "A vector in the plane of two non-collinear vectors",
        latex: "\\vec{r} = t_1\\vec{a} + t_2\\vec{b}, \\qquad \\vec{r} = x\\vec{a} + y\\vec{b} + z\\vec{c} \\ \\text{for non-coplanar } \\vec{a}, \\vec{b}, \\vec{c}",
      },
      authoredExample: {
        prompt:
          "Express \\(\\vec{r} = 3\\hat{i} + 4\\hat{j} - \\hat{k}\\) as a linear combination of \\(\\vec{a} = \\hat{i} + \\hat{j}\\) and \\(\\vec{b} = \\hat{j} - \\hat{k}\\).",
        steps: [
          "Let \\(\\vec{r} = t_1\\vec{a} + t_2\\vec{b} = t_1\\hat{i} + (t_1 + t_2)\\hat{j} - t_2\\hat{k}\\).",
          "Equate coefficients: \\(t_1 = 3\\) ... (1), \\(t_1 + t_2 = 4\\) ... (2), \\(-t_2 = -1\\) ... (3).",
          "From (1) and (3): \\(t_1 = 3\\), \\(t_2 = 1\\).",
          "Check (2): \\(3 + 1 = 4\\). It holds, so \\(\\vec{r}\\) really is coplanar with \\(\\vec{a}\\) and \\(\\vec{b}\\).",
        ],
        answer: "\\(\\vec{r} = 3\\vec{a} + \\vec{b}\\)",
      },
      selfCheckExample: {
        prompt: "\\(\\vec{a}\\) and \\(\\vec{b}\\) are non-collinear and \\(\\vec{r} = 2\\vec{a} - \\vec{b}\\). Are \\(\\vec{r}\\), \\(\\vec{a}\\) and \\(\\vec{b}\\) coplanar?",
        steps: ["\\(\\vec{r}\\) is a linear combination of \\(\\vec{a}\\) and \\(\\vec{b}\\), so by Theorem 2 it lies in their plane."],
        answer: "Yes",
      },
      practiceSet: [
        {
          prompt: "\\(\\vec{a}, \\vec{b}, \\vec{c}\\) are non-coplanar and \\(x\\vec{a} + y\\vec{b} + z\\vec{c} = \\vec{0}\\). Find \\(x\\), \\(y\\) and \\(z\\).",
          answer: "\\(x = y = z = 0\\)",
        },
        {
          prompt: "Find \\(x\\) and \\(y\\) if \\(5\\hat{i} + 2\\hat{j} = x(\\hat{i} + \\hat{j}) + y(\\hat{i} - \\hat{j})\\).",
          answer: "\\(x = \\dfrac{7}{2}\\), \\(y = \\dfrac{3}{2}\\)",
        },
      ],
      pyqExampleId: "0f649edb-2d3c-4ad9-a760-00d11d97f7ce",
      traps: [
        {
          title: "Proving existence and forgetting uniqueness",
          body: "When the question says 'unique scalars', the uniqueness step carries marks of its own: suppose a second pair, subtract, and use that \\(\\vec{a}\\) and \\(\\vec{b}\\) are non-collinear.",
        },
        {
          title: "Leaving the third equation unchecked",
          body: "In space, \\(\\vec{r} = t_1\\vec{a} + t_2\\vec{b}\\) gives three equations in two unknowns. Solve two and check the third; if it fails, \\(\\vec{r}\\) is not coplanar with \\(\\vec{a}\\) and \\(\\vec{b}\\).",
        },
      ],
    },
  ],
};
