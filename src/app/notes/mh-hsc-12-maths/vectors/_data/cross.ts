import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_MA_VE_CROSS_NOTE: SubtopicNote = {
  subtopicName: "Cross Product of Vectors",
  title: "Cross Product: Perpendicular Vectors, the Angle and Area",
  oneLineDefinition:
    "The vector product a × b = |a||b| sin θ times the unit normal, its determinant form and properties, unit vectors perpendicular to two given vectors, and the areas of a parallelogram and a triangle.",
  whyItMatters:
    "39 questions, four of them from board papers: the direction ratios of a line perpendicular to two given lines (2023), the angle for which |a · b| = |a × b| (2024), and in 2025 the magnitude of a × b for given vectors and the value of a · b from |a|, |b| and |a × b|. The textbook rows are Exercise 5.4, its solved examples and the Miscellaneous Exercise questions on these ideas.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscmve-cross",
      name: "Vector product: definition, determinant form and properties",
      intuition:
        "The dot product of two vectors is a number; the cross product is a new vector, standing at right angles to both. Curl the fingers of your right hand from a towards b and your thumb points along a × b. Its length is |a||b| sin θ, so parallel vectors give the zero vector.",
      definition:
        "- \\(\\vec{a}\\times\\vec{b} = |\\vec{a}||\\vec{b}|\\sin\\theta\\,\\hat{n}\\), where \\(\\hat{n}\\) is the unit vector perpendicular to the plane of \\(\\vec{a}\\) and \\(\\vec{b}\\), chosen by the right-hand rule.\n" +
        "- \\(\\vec{a}\\times\\vec{b}\\) is perpendicular to both \\(\\vec{a}\\) and \\(\\vec{b}\\).\n" +
        "- \\(\\vec{b}\\times\\vec{a} = -(\\vec{a}\\times\\vec{b})\\): the cross product is anticommutative.\n" +
        "- \\(\\vec{a}\\times\\vec{a} = \\vec{0}\\); for non-zero vectors, \\(\\vec{a}\\times\\vec{b} = \\vec{0}\\) exactly when they are collinear.\n" +
        "- \\(\\hat{i}\\times\\hat{j} = \\hat{k}\\), \\(\\hat{j}\\times\\hat{k} = \\hat{i}\\), \\(\\hat{k}\\times\\hat{i} = \\hat{j}\\); reversing the order changes the sign; \\(\\hat{i}\\times\\hat{i} = \\hat{j}\\times\\hat{j} = \\hat{k}\\times\\hat{k} = \\vec{0}\\).\n" +
        "- Distributive: \\(\\vec{a}\\times(\\vec{b} + \\vec{c}) = \\vec{a}\\times\\vec{b} + \\vec{a}\\times\\vec{c}\\); and \\(m(\\vec{a}\\times\\vec{b}) = (m\\vec{a})\\times\\vec{b}\\).",
      formula: {
        label: "Determinant form of the cross product",
        latex: "\\vec{a}\\times\\vec{b} = \\begin{vmatrix} \\hat{i} & \\hat{j} & \\hat{k} \\\\ a_1 & a_2 & a_3 \\\\ b_1 & b_2 & b_3 \\end{vmatrix} = (a_2b_3 - a_3b_2)\\hat{i} - (a_1b_3 - a_3b_1)\\hat{j} + (a_1b_2 - a_2b_1)\\hat{k}",
      },
      authoredExample: {
        prompt:
          "Find \\(\\vec{a}\\times\\vec{b}\\) for \\(\\vec{a} = 4\\hat{i} - \\hat{j} + \\hat{k}\\) and \\(\\vec{b} = \\hat{i} + \\hat{j} - 5\\hat{k}\\), and verify that it is perpendicular to both.",
        steps: [
          "\\(\\vec{a}\\times\\vec{b} = \\begin{vmatrix} \\hat{i} & \\hat{j} & \\hat{k} \\\\ 4 & -1 & 1 \\\\ 1 & 1 & -5 \\end{vmatrix}\\).",
          "\\(= \\hat{i}\\big((-1)(-5) - (1)(1)\\big) - \\hat{j}\\big((4)(-5) - (1)(1)\\big) + \\hat{k}\\big((4)(1) - (-1)(1)\\big)\\).",
          "\\(= \\hat{i}(5 - 1) - \\hat{j}(-20 - 1) + \\hat{k}(4 + 1) = 4\\hat{i} + 21\\hat{j} + 5\\hat{k}\\).",
          "Check: \\((\\vec{a}\\times\\vec{b})\\cdot\\vec{a} = 16 - 21 + 5 = 0\\) and \\((\\vec{a}\\times\\vec{b})\\cdot\\vec{b} = 4 + 21 - 25 = 0\\).",
        ],
        answer: "\\(\\vec{a}\\times\\vec{b} = 4\\hat{i} + 21\\hat{j} + 5\\hat{k}\\), perpendicular to both",
      },
      selfCheckExample: {
        prompt: "Simplify \\((\\vec{a} + \\vec{b})\\times(\\vec{a} - \\vec{b})\\).",
        steps: [
          "\\(= \\vec{a}\\times\\vec{a} - \\vec{a}\\times\\vec{b} + \\vec{b}\\times\\vec{a} - \\vec{b}\\times\\vec{b}\\).",
          "\\(= \\vec{0} - \\vec{a}\\times\\vec{b} - \\vec{a}\\times\\vec{b} - \\vec{0}\\).",
        ],
        answer: "\\(-2(\\vec{a}\\times\\vec{b})\\)",
      },
      practiceSet: [
        { prompt: "What is \\(\\hat{k}\\times\\hat{j}\\)?", answer: "\\(-\\hat{i}\\)" },
        {
          prompt: "\\(\\vec{a}\\) and \\(\\vec{b}\\) are non-zero and \\(\\vec{a}\\times\\vec{b} = \\vec{0}\\). How are they related?",
          answer: "They are collinear (parallel)",
        },
      ],
      pyqExampleId: "038460a9-e310-4f92-9472-8e9ef2e80663",
      traps: [
        {
          title: "Losing the minus sign on the middle term",
          body: "The \\(\\hat{j}\\) term of the determinant carries a minus sign in front of its bracket. Checking that your answer dots to 0 with both vectors catches this at once.",
        },
        {
          title: "Swapping the order",
          body: "\\(\\vec{b}\\times\\vec{a} = -(\\vec{a}\\times\\vec{b})\\). In an identity, keep every product in the order it was written until you use this rule on purpose.",
        },
        {
          title: "Giving a cross product as a number",
          body: "\\(\\vec{a}\\times\\vec{b}\\) is a vector; only its magnitude \\(|\\vec{a}\\times\\vec{b}|\\) is a number. Read which one the question asks for.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmve-normal",
      name: "Vectors perpendicular to two given vectors",
      intuition:
        "Since a × b is perpendicular to both a and b, it hands you the direction at right angles to both for free. Divide by its length to get a unit vector, and remember the opposite direction works too, so there are always two answers.",
      definition:
        "- The unit vectors perpendicular to both \\(\\vec{a}\\) and \\(\\vec{b}\\) are \\(\\pm\\dfrac{\\vec{a}\\times\\vec{b}}{|\\vec{a}\\times\\vec{b}|}\\).\n" +
        "- The vectors of magnitude \\(k\\) perpendicular to both are \\(\\pm k\\,\\dfrac{\\vec{a}\\times\\vec{b}}{|\\vec{a}\\times\\vec{b}|}\\).\n" +
        "- A line perpendicular to two lines has direction ratios given by the cross product of their direction vectors.\n" +
        "- The sine of the angle between \\(\\vec{a}\\) and \\(\\vec{b}\\): \\(\\sin\\theta = \\dfrac{|\\vec{a}\\times\\vec{b}|}{|\\vec{a}||\\vec{b}|}\\).",
      formula: {
        label: "Unit vectors perpendicular to a and b",
        latex: "\\hat{n} = \\pm\\frac{\\vec{a}\\times\\vec{b}}{|\\vec{a}\\times\\vec{b}|}, \\qquad \\sin\\theta = \\frac{|\\vec{a}\\times\\vec{b}|}{|\\vec{a}||\\vec{b}|}",
      },
      authoredExample: {
        prompt: "Find the unit vectors perpendicular to both \\(\\vec{a} = \\hat{i} + \\hat{j} + \\hat{k}\\) and \\(\\vec{b} = \\hat{i} + 2\\hat{j} + 3\\hat{k}\\).",
        steps: [
          "\\(\\vec{a}\\times\\vec{b} = \\begin{vmatrix} \\hat{i} & \\hat{j} & \\hat{k} \\\\ 1 & 1 & 1 \\\\ 1 & 2 & 3 \\end{vmatrix} = \\hat{i}(3 - 2) - \\hat{j}(3 - 1) + \\hat{k}(2 - 1) = \\hat{i} - 2\\hat{j} + \\hat{k}\\).",
          "\\(|\\vec{a}\\times\\vec{b}| = \\sqrt{1 + 4 + 1} = \\sqrt{6}\\).",
          "Required unit vectors: \\(\\pm\\dfrac{\\vec{a}\\times\\vec{b}}{|\\vec{a}\\times\\vec{b}|}\\).",
        ],
        answer: "\\(\\pm\\dfrac{1}{\\sqrt{6}}(\\hat{i} - 2\\hat{j} + \\hat{k})\\)",
      },
      selfCheckExample: {
        prompt: "Find the vectors of magnitude 6 perpendicular to both \\(\\hat{i} + 2\\hat{k}\\) and \\(\\hat{j} + 2\\hat{k}\\).",
        steps: [
          "\\((\\hat{i} + 2\\hat{k})\\times(\\hat{j} + 2\\hat{k}) = \\hat{i}(0 - 2) - \\hat{j}(2 - 0) + \\hat{k}(1 - 0) = -2\\hat{i} - 2\\hat{j} + \\hat{k}\\), of magnitude 3.",
          "Multiply the unit vector by 6: \\(\\pm\\dfrac{6}{3}(-2\\hat{i} - 2\\hat{j} + \\hat{k})\\).",
        ],
        answer: "\\(\\pm(-4\\hat{i} - 4\\hat{j} + 2\\hat{k})\\)",
      },
      practiceSet: [
        { prompt: "How many unit vectors are perpendicular to two given non-collinear vectors?", answer: "Two, \\(\\hat{n}\\) and \\(-\\hat{n}\\)" },
        {
          prompt: "If \\(|\\vec{a}| = 2\\), \\(|\\vec{b}| = 4\\) and \\(|\\vec{a}\\times\\vec{b}| = 4\\), find the sine of the angle between \\(\\vec{a}\\) and \\(\\vec{b}\\).",
          answer: "\\(\\dfrac{1}{2}\\)",
        },
      ],
      pyqExampleId: "2b3f6d41-e5b2-4d83-b24f-c6d1696feedd",
      traps: [
        {
          title: "Giving only one unit vector",
          body: "Both \\(\\hat{n}\\) and \\(-\\hat{n}\\) are perpendicular to the two vectors. Write the answer with \\(\\pm\\).",
        },
        {
          title: "Stopping at the unit vector",
          body: "When the question asks for a vector of magnitude 5 (or any k), multiply the unit vector by that number. A unit vector answers a different question.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmve-area",
      name: "The magnitude |a × b|, the angle and areas",
      intuition:
        "Draw a and b from one point and complete the parallelogram. Its base is |a| and its height is |b| sin θ, so its area is exactly |a × b|. A triangle on the same two sides is half the parallelogram. And since sin θ and cos θ are linked, knowing |a × b| also tells you a · b, up to a sign.",
      definition:
        "- \\(|\\vec{a}\\times\\vec{b}| = |\\vec{a}||\\vec{b}|\\sin\\theta\\), so \\(|\\vec{a}\\times\\vec{b}|^2 + (\\vec{a}\\cdot\\vec{b})^2 = |\\vec{a}|^2|\\vec{b}|^2\\).\n" +
        "- Area of the parallelogram with adjacent sides \\(\\vec{a}\\) and \\(\\vec{b}\\): \\(|\\vec{a}\\times\\vec{b}|\\).\n" +
        "- Area of triangle ABC: \\(\\dfrac{1}{2}|\\overrightarrow{AB}\\times\\overrightarrow{AC}|\\), both sides taken from the same vertex.\n" +
        "- Exercise 5.4 proves that the vector area of a quadrilateral ABCD is \\(\\dfrac{1}{2}(\\overrightarrow{AC}\\times\\overrightarrow{BD})\\).\n" +
        "- From \\(|\\vec{a}\\times\\vec{b}|\\) you get \\(\\sin\\theta\\); then \\(\\cos\\theta = \\pm\\sqrt{1 - \\sin^2\\theta}\\), so \\(\\vec{a}\\cdot\\vec{b}\\) has two possible values unless the angle is known to be acute or obtuse.",
      formula: {
        label: "Areas from the cross product",
        latex: "\\text{parallelogram} = |\\vec{a}\\times\\vec{b}|, \\qquad \\text{triangle } ABC = \\tfrac{1}{2}\\,|\\overrightarrow{AB}\\times\\overrightarrow{AC}|",
      },
      authoredExample: {
        prompt: "Find the area of the triangle with vertices \\(A(1, 1, 1)\\), \\(B(2, 3, 1)\\) and \\(C(3, 1, 4)\\).",
        steps: [
          "\\(\\overrightarrow{AB} = \\hat{i} + 2\\hat{j}\\) and \\(\\overrightarrow{AC} = 2\\hat{i} + 3\\hat{k}\\).",
          "\\(\\overrightarrow{AB}\\times\\overrightarrow{AC} = \\begin{vmatrix} \\hat{i} & \\hat{j} & \\hat{k} \\\\ 1 & 2 & 0 \\\\ 2 & 0 & 3 \\end{vmatrix} = \\hat{i}(6 - 0) - \\hat{j}(3 - 0) + \\hat{k}(0 - 4) = 6\\hat{i} - 3\\hat{j} - 4\\hat{k}\\).",
          "\\(|\\overrightarrow{AB}\\times\\overrightarrow{AC}| = \\sqrt{36 + 9 + 16} = \\sqrt{61}\\).",
          "Area \\(= \\dfrac{1}{2}|\\overrightarrow{AB}\\times\\overrightarrow{AC}| = \\dfrac{\\sqrt{61}}{2}\\) square units.",
        ],
        answer: "\\(\\dfrac{\\sqrt{61}}{2}\\) square units",
      },
      selfCheckExample: {
        prompt: "Find the area of the parallelogram whose adjacent sides are \\(\\hat{i} + 2\\hat{j}\\) and \\(3\\hat{j} - \\hat{k}\\).",
        steps: [
          "\\((\\hat{i} + 2\\hat{j})\\times(3\\hat{j} - \\hat{k}) = \\hat{i}(-2 - 0) - \\hat{j}(-1 - 0) + \\hat{k}(3 - 0) = -2\\hat{i} + \\hat{j} + 3\\hat{k}\\).",
          "Its magnitude is \\(\\sqrt{4 + 1 + 9}\\).",
        ],
        answer: "\\(\\sqrt{14}\\) square units",
      },
      practiceSet: [
        {
          prompt: "For two adjacent sides of a parallelogram, \\(|\\vec{a}\\times\\vec{b}| = 10\\). Find the area of the parallelogram and of the triangle on the same two sides.",
          answer: "10 and 5 square units",
        },
        {
          prompt: "If \\(|\\vec{a}| = 2\\), \\(|\\vec{b}| = 5\\) and the angle between them is \\(30^{\\circ}\\), find \\(|\\vec{a}\\times\\vec{b}|\\).",
          answer: "5",
        },
      ],
      pyqExampleId: "9c3c432a-e29e-45e6-a1f7-a299b31fa194",
      traps: [
        {
          title: "One value of a · b where there are two",
          body: "\\(|\\vec{a}\\times\\vec{b}|\\) fixes \\(\\sin\\theta\\), and \\(\\sin\\theta\\) is the same for \\(\\theta\\) and \\(\\pi - \\theta\\). In a written answer give both signs of \\(\\vec{a}\\cdot\\vec{b}\\), unless the angle is stated to be acute.",
        },
        {
          title: "Halving for a parallelogram",
          body: "The parallelogram on \\(\\vec{a}\\) and \\(\\vec{b}\\) has area \\(|\\vec{a}\\times\\vec{b}|\\). The half belongs to the triangle only.",
        },
        {
          title: "Using position vectors instead of sides",
          body: "When the vertices are given, first find two sides such as \\(\\overrightarrow{AB}\\) and \\(\\overrightarrow{AC}\\). Crossing the position vectors of B and C gives the area of triangle OBC, not ABC, unless A is the origin.",
        },
      ],
    },
  ],
};
