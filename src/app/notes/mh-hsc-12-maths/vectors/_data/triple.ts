import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_MA_VE_TRIPLE_NOTE: SubtopicNote = {
  subtopicName: "Scalar and Vector Triple Product",
  title: "Scalar and Vector Triple Products: Volume and Coplanarity",
  oneLineDefinition:
    "The scalar triple product [a b c] as a determinant and its properties, the volumes of a parallelepiped and a tetrahedron, the test for coplanar vectors and coplanar points, and the vector triple product a × (b × c) with the rule that expands it.",
  whyItMatters:
    "60 questions, thirteen of them from board papers: the volume of a tetrahedron or a parallelepiped (2016, 2017, 2019, 2024, and in 2023 with the proof of the tetrahedron formula), a · (b × c) for given vectors (2018), the value of p for coplanar vectors (2019), whether four points are coplanar (2020, 2024, 2026), the sum i · (j × k) + j · (k × i) + k · (i × j) (2022) and a similar sum for p, q, r (2026), and [a + b b + c c + a] = 2[a b c] (2025). The textbook rows are Exercise 5.5, its solved examples and the Miscellaneous Exercise questions on these ideas.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscmve-box",
      name: "The scalar triple product and its properties",
      intuition:
        "Cross two vectors, then dot the result with a third: the answer is a single number, and it equals the 3 by 3 determinant of their components. Because it is a determinant, its properties are the determinant rules you already know: swap two rows and the sign flips; two equal rows give zero.",
      definition:
        "- \\([\\vec{a}\\ \\vec{b}\\ \\vec{c}] = \\vec{a}\\cdot(\\vec{b}\\times\\vec{c})\\), a scalar, also called the box product. In components it is the determinant of the three rows of components.\n" +
        "- A cyclic change does not change its value: \\([\\vec{a}\\ \\vec{b}\\ \\vec{c}] = [\\vec{b}\\ \\vec{c}\\ \\vec{a}] = [\\vec{c}\\ \\vec{a}\\ \\vec{b}]\\).\n" +
        "- A single interchange changes its sign: \\([\\vec{a}\\ \\vec{b}\\ \\vec{c}] = -[\\vec{b}\\ \\vec{a}\\ \\vec{c}]\\).\n" +
        "- Dot and cross may be interchanged: \\(\\vec{a}\\cdot(\\vec{b}\\times\\vec{c}) = (\\vec{a}\\times\\vec{b})\\cdot\\vec{c}\\).\n" +
        "- It is 0 if one vector is zero, if two of the vectors are collinear (in particular two are equal), or if the three are coplanar. \\([\\hat{i}\\ \\hat{j}\\ \\hat{k}] = 1\\).\n" +
        "- **Proof that** \\([\\vec{a} + \\vec{b}\\ \\ \\vec{b} + \\vec{c}\\ \\ \\vec{c} + \\vec{a}] = 2[\\vec{a}\\ \\vec{b}\\ \\vec{c}]\\):\n" +
        "- LHS \\(= (\\vec{a} + \\vec{b})\\cdot[(\\vec{b} + \\vec{c})\\times(\\vec{c} + \\vec{a})] = (\\vec{a} + \\vec{b})\\cdot(\\vec{b}\\times\\vec{c} + \\vec{b}\\times\\vec{a} + \\vec{c}\\times\\vec{a})\\), as \\(\\vec{c}\\times\\vec{c} = \\vec{0}\\).\n" +
        "- Expand into six scalar triple products. Four of them have a vector repeated, such as \\([\\vec{a}\\ \\vec{b}\\ \\vec{a}]\\), and are 0.\n" +
        "- What is left is \\([\\vec{a}\\ \\vec{b}\\ \\vec{c}] + [\\vec{b}\\ \\vec{c}\\ \\vec{a}] = 2[\\vec{a}\\ \\vec{b}\\ \\vec{c}]\\), by the cyclic property.\n" +
        "- A dot or a cross needs a vector on each side, and only like things can be added: \\(\\vec{a}\\cdot\\vec{b} + \\vec{c}\\) and \\(\\vec{a}\\times(\\vec{b}\\cdot\\vec{c})\\) have no meaning, while \\((\\vec{a}\\cdot\\vec{b})\\vec{c}\\) is a vector.",
      formula: {
        label: "Scalar triple product",
        latex: "[\\vec{a}\\ \\vec{b}\\ \\vec{c}] = \\vec{a}\\cdot(\\vec{b}\\times\\vec{c}) = \\begin{vmatrix} a_1 & a_2 & a_3 \\\\ b_1 & b_2 & b_3 \\\\ c_1 & c_2 & c_3 \\end{vmatrix}",
      },
      authoredExample: {
        prompt:
          "Find \\([\\vec{a}\\ \\vec{b}\\ \\vec{c}]\\) for \\(\\vec{a} = 2\\hat{i} + \\hat{j} - \\hat{k}\\), \\(\\vec{b} = \\hat{i} - \\hat{j} + 3\\hat{k}\\) and \\(\\vec{c} = 3\\hat{i} + 2\\hat{j} + \\hat{k}\\).",
        steps: [
          "\\([\\vec{a}\\ \\vec{b}\\ \\vec{c}] = \\begin{vmatrix} 2 & 1 & -1 \\\\ 1 & -1 & 3 \\\\ 3 & 2 & 1 \\end{vmatrix}\\).",
          "Expand along the first row: \\(= 2\\big((-1)(1) - (3)(2)\\big) - 1\\big((1)(1) - (3)(3)\\big) + (-1)\\big((1)(2) - (-1)(3)\\big)\\).",
          "\\(= 2(-7) - 1(-8) - 1(5) = -14 + 8 - 5\\).",
        ],
        answer: "\\([\\vec{a}\\ \\vec{b}\\ \\vec{c}] = -11\\)",
      },
      selfCheckExample: {
        prompt: "If \\([\\vec{a}\\ \\vec{b}\\ \\vec{c}] = 5\\), find \\([\\vec{b}\\ \\vec{a}\\ \\vec{c}]\\) and \\([\\vec{c}\\ \\vec{a}\\ \\vec{b}]\\).",
        steps: ["One interchange changes the sign; a cyclic change does not."],
        answer: "\\(-5\\) and \\(5\\)",
      },
      practiceSet: [
        { prompt: "Is \\(\\vec{a}\\cdot\\vec{b} + \\vec{c}\\) meaningful?", answer: "No, a scalar cannot be added to a vector" },
        { prompt: "What is \\([\\vec{a}\\ \\vec{a}\\ \\vec{b}]\\)?", answer: "0" },
        { prompt: "What is \\([\\hat{i}\\ \\hat{j}\\ \\hat{k}]\\)?", answer: "1" },
      ],
      pyqExampleId: "b392c22b-b728-4e7e-8853-4d7c32279142",
      traps: [
        {
          title: "Treating a cyclic change as a swap",
          body: "\\([\\vec{b}\\ \\vec{c}\\ \\vec{a}]\\) is a cyclic change and equals \\([\\vec{a}\\ \\vec{b}\\ \\vec{c}]\\). \\([\\vec{b}\\ \\vec{a}\\ \\vec{c}]\\) is one swap and equals \\(-[\\vec{a}\\ \\vec{b}\\ \\vec{c}]\\).",
        },
        {
          title: "Dropping terms without saying why",
          body: "In a 'prove that' expansion, write the reason each dropped term is 0 (a vector is repeated), and the property used for the terms that remain. The bare result earns little.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmve-volume",
      name: "Volumes of a parallelepiped and a tetrahedron",
      intuition:
        "The parallelogram on b and c has area |b × c|, and the height above it is the projection of a on the direction of b × c. Base times height is exactly a · (b × c). A tetrahedron on the same three edges is a pyramid on half that base, so it takes a third of a half: one sixth.",
      definition:
        "- **Theorem 7:** the volume of a parallelepiped with coterminus edges \\(\\vec{a}, \\vec{b}, \\vec{c}\\) is \\(|[\\vec{a}\\ \\vec{b}\\ \\vec{c}]|\\).\n" +
        "- **Theorem 8:** the volume of a tetrahedron with coterminus edges \\(\\vec{a}, \\vec{b}, \\vec{c}\\) is \\(\\dfrac{1}{6}|[\\vec{a}\\ \\vec{b}\\ \\vec{c}]|\\). Proof outline:\n" +
        "- Let \\(\\overrightarrow{OA} = \\vec{a}\\), \\(\\overrightarrow{OB} = \\vec{b}\\), \\(\\overrightarrow{OC} = \\vec{c}\\) be coterminus edges of tetrahedron OABC, and AP its height on the base OBC.\n" +
        "- Volume \\(= \\dfrac{1}{3}\\) (area of triangle OBC) (height AP).\n" +
        "- Area of triangle OBC \\(= \\dfrac{1}{2}|\\vec{b}\\times\\vec{c}|\\).\n" +
        "- AP is the scalar projection of \\(\\vec{a}\\) on \\(\\vec{b}\\times\\vec{c}\\): \\(AP = \\dfrac{|\\vec{a}\\cdot(\\vec{b}\\times\\vec{c})|}{|\\vec{b}\\times\\vec{c}|}\\).\n" +
        "- Volume \\(= \\dfrac{1}{3}\\cdot\\dfrac{1}{2}|\\vec{b}\\times\\vec{c}|\\cdot\\dfrac{|\\vec{a}\\cdot(\\vec{b}\\times\\vec{c})|}{|\\vec{b}\\times\\vec{c}|} = \\dfrac{1}{6}|[\\vec{a}\\ \\vec{b}\\ \\vec{c}]|\\).\n" +
        "- When the vertices are given, take all three edges from one vertex: \\(\\overrightarrow{AB}\\), \\(\\overrightarrow{AC}\\), \\(\\overrightarrow{AD}\\).",
      formula: {
        label: "Volumes",
        latex: "V_{\\text{parallelepiped}} = |[\\vec{a}\\ \\vec{b}\\ \\vec{c}]|, \\qquad V_{\\text{tetrahedron}} = \\tfrac{1}{6}\\,|[\\vec{a}\\ \\vec{b}\\ \\vec{c}]|",
      },
      authoredExample: {
        prompt: "Find the volume of the tetrahedron with vertices \\(A(1, 0, 1)\\), \\(B(2, 1, 3)\\), \\(C(0, 2, 1)\\) and \\(D(1, 1, 4)\\).",
        steps: [
          "Coterminus edges from A: \\(\\overrightarrow{AB} = \\hat{i} + \\hat{j} + 2\\hat{k}\\), \\(\\overrightarrow{AC} = -\\hat{i} + 2\\hat{j}\\), \\(\\overrightarrow{AD} = \\hat{j} + 3\\hat{k}\\).",
          "\\([\\overrightarrow{AB}\\ \\overrightarrow{AC}\\ \\overrightarrow{AD}] = \\begin{vmatrix} 1 & 1 & 2 \\\\ -1 & 2 & 0 \\\\ 0 & 1 & 3 \\end{vmatrix} = 1(6 - 0) - 1(-3 - 0) + 2(-1 - 0)\\).",
          "\\(= 6 + 3 - 2 = 7\\).",
          "Volume \\(= \\dfrac{1}{6}|7| = \\dfrac{7}{6}\\) cubic units.",
        ],
        answer: "\\(\\dfrac{7}{6}\\) cubic units",
      },
      selfCheckExample: {
        prompt: "The coterminus edges of a parallelepiped are \\(\\hat{i}\\), \\(\\hat{j}\\) and \\(\\hat{i} + \\hat{j} + 3\\hat{k}\\). Find its volume.",
        steps: ["\\(\\begin{vmatrix} 1 & 0 & 0 \\\\ 0 & 1 & 0 \\\\ 1 & 1 & 3 \\end{vmatrix} = 1(3 - 0) = 3\\)."],
        answer: "3 cubic units",
      },
      practiceSet: [
        {
          prompt: "A parallelepiped and a tetrahedron have the same three coterminus edges. How do their volumes compare?",
          answer: "The tetrahedron's volume is one sixth of the parallelepiped's",
        },
        { prompt: "The scalar triple product of three coterminus edges of a parallelepiped is \\(-18\\). Find its volume.", answer: "18 cubic units" },
      ],
      pyqExampleId: "dcb5366f-1df4-4041-8248-74e685d9b291",
      traps: [
        {
          title: "Edges from different vertices",
          body: "The three vectors in the determinant must start at the same vertex. Using \\(\\overrightarrow{AB}\\), \\(\\overrightarrow{BC}\\), \\(\\overrightarrow{CD}\\) gives a wrong volume.",
        },
        {
          title: "A negative volume",
          body: "The determinant may be negative; the volume is its modulus. Write the modulus step and the unit, cubic units.",
        },
        {
          title: "Forgetting the one sixth",
          body: "For a tetrahedron, divide the modulus of the scalar triple product by 6; for a parallelepiped, do not.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmve-coplanarity",
      name: "Coplanar vectors and coplanar points",
      intuition:
        "Three vectors that lie flat in one plane make a box with no height, so its volume, the scalar triple product, is zero. That turns 'are these coplanar?' into 'is this determinant zero?'. For four points, draw three vectors from one of them and test those.",
      definition:
        "- Three vectors \\(\\vec{a}, \\vec{b}, \\vec{c}\\) are coplanar if and only if \\([\\vec{a}\\ \\vec{b}\\ \\vec{c}] = 0\\).\n" +
        "- Four points A, B, C, D are coplanar if and only if \\([\\overrightarrow{AB}\\ \\overrightarrow{AC}\\ \\overrightarrow{AD}] = 0\\).\n" +
        "- To find an unknown that makes vectors coplanar, set the determinant equal to 0 and solve.\n" +
        "- Board layout: the three vectors, the determinant, its value, and a sentence: 'the scalar triple product is (not) zero, so the points are (not) coplanar'.",
      formula: {
        label: "Test for coplanar vectors",
        latex: "\\vec{a}, \\vec{b}, \\vec{c} \\text{ coplanar exactly when } [\\vec{a}\\ \\vec{b}\\ \\vec{c}] = 0",
      },
      authoredExample: {
        prompt:
          "Find \\(\\lambda\\) if the vectors \\(\\hat{i} + 2\\hat{j} + \\hat{k}\\), \\(2\\hat{i} + \\hat{j} + 3\\hat{k}\\) and \\(\\lambda\\hat{i} + 3\\hat{j} + 4\\hat{k}\\) are coplanar.",
        steps: [
          "For coplanar vectors the scalar triple product is 0: \\(\\begin{vmatrix} 1 & 2 & 1 \\\\ 2 & 1 & 3 \\\\ \\lambda & 3 & 4 \\end{vmatrix} = 0\\).",
          "\\(1(4 - 9) - 2(8 - 3\\lambda) + 1(6 - \\lambda) = 0\\).",
          "\\(-5 - 16 + 6\\lambda + 6 - \\lambda = 0\\), so \\(5\\lambda - 15 = 0\\).",
          "\\(\\lambda = 3\\). Check: \\(3\\hat{i} + 3\\hat{j} + 4\\hat{k}\\) is the sum of the first two vectors, so it lies in their plane.",
        ],
        answer: "\\(\\lambda = 3\\)",
      },
      selfCheckExample: {
        prompt: "If \\(\\vec{c} = 2\\vec{a} - 3\\vec{b}\\), what is \\([\\vec{a}\\ \\vec{b}\\ \\vec{c}]\\)?",
        steps: ["\\(\\vec{c}\\) is a linear combination of \\(\\vec{a}\\) and \\(\\vec{b}\\), so the three vectors are coplanar."],
        answer: "0",
      },
      practiceSet: [
        { prompt: "The scalar triple product of three vectors is 4. Are they coplanar?", answer: "No" },
        {
          prompt: "For four points, \\([\\overrightarrow{AB}\\ \\overrightarrow{AC}\\ \\overrightarrow{AD}] = 0\\). What can you say about A, B, C and D?",
          answer: "They are coplanar",
        },
      ],
      pyqExampleId: "40dee4f3-d032-4bd3-9796-af837958326b",
      traps: [
        {
          title: "Testing the position vectors of the four points",
          body: "The test for four points uses \\(\\overrightarrow{AB}\\), \\(\\overrightarrow{AC}\\), \\(\\overrightarrow{AD}\\), not \\(\\vec{a}, \\vec{b}, \\vec{c}\\). Three position vectors can give a non-zero value even when the points lie in one plane.",
        },
        {
          title: "Stopping at the number",
          body: "The determinant's value is only half the answer. End with the sentence that the points are, or are not, coplanar, and why.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmve-vtp",
      name: "Vector triple product",
      intuition:
        "b × c points at right angles to the plane of b and c, and crossing it again with a brings the result back into that plane. So a × (b × c) is some amount of b plus some amount of c, and the rule tells you the amounts: each is a dot product of a with the other vector.",
      definition:
        "- \\(\\vec{a}\\times(\\vec{b}\\times\\vec{c}) = (\\vec{a}\\cdot\\vec{c})\\,\\vec{b} - (\\vec{a}\\cdot\\vec{b})\\,\\vec{c}\\).\n" +
        "- It is a linear combination of \\(\\vec{b}\\) and \\(\\vec{c}\\), so it is coplanar with them.\n" +
        "- In general \\(\\vec{a}\\times(\\vec{b}\\times\\vec{c}) \\neq (\\vec{a}\\times\\vec{b})\\times\\vec{c}\\): the brackets cannot be moved.\n" +
        "- Using the rule three times: \\(\\vec{a}\\times(\\vec{b}\\times\\vec{c}) + \\vec{b}\\times(\\vec{c}\\times\\vec{a}) + \\vec{c}\\times(\\vec{a}\\times\\vec{b}) = \\vec{0}\\).",
      formula: {
        label: "Vector triple product",
        latex: "\\vec{a}\\times(\\vec{b}\\times\\vec{c}) = (\\vec{a}\\cdot\\vec{c})\\,\\vec{b} - (\\vec{a}\\cdot\\vec{b})\\,\\vec{c}",
      },
      authoredExample: {
        prompt:
          "For \\(\\vec{a} = \\hat{i} + \\hat{j}\\), \\(\\vec{b} = \\hat{j} + \\hat{k}\\) and \\(\\vec{c} = \\hat{i} + 2\\hat{k}\\), find \\(\\vec{a}\\times(\\vec{b}\\times\\vec{c})\\) by the rule, and check it directly.",
        steps: [
          "\\(\\vec{a}\\cdot\\vec{c} = 1 + 0 + 0 = 1\\) and \\(\\vec{a}\\cdot\\vec{b} = 0 + 1 + 0 = 1\\).",
          "\\(\\vec{a}\\times(\\vec{b}\\times\\vec{c}) = (1)\\vec{b} - (1)\\vec{c} = (\\hat{j} + \\hat{k}) - (\\hat{i} + 2\\hat{k}) = -\\hat{i} + \\hat{j} - \\hat{k}\\).",
          "Directly: \\(\\vec{b}\\times\\vec{c} = \\hat{i}(2 - 0) - \\hat{j}(0 - 1) + \\hat{k}(0 - 1) = 2\\hat{i} + \\hat{j} - \\hat{k}\\).",
          "\\(\\vec{a}\\times(2\\hat{i} + \\hat{j} - \\hat{k}) = \\hat{i}(-1 - 0) - \\hat{j}(-1 - 0) + \\hat{k}(1 - 2) = -\\hat{i} + \\hat{j} - \\hat{k}\\), the same.",
        ],
        answer: "\\(\\vec{a}\\times(\\vec{b}\\times\\vec{c}) = -\\hat{i} + \\hat{j} - \\hat{k}\\)",
      },
      selfCheckExample: {
        prompt: "\\(\\vec{a}\\) is perpendicular to both \\(\\vec{b}\\) and \\(\\vec{c}\\). Simplify \\(\\vec{a}\\times(\\vec{b}\\times\\vec{c})\\).",
        steps: ["\\(\\vec{a}\\cdot\\vec{c} = 0\\) and \\(\\vec{a}\\cdot\\vec{b} = 0\\), so both terms of the rule vanish."],
        answer: "\\(\\vec{0}\\)",
      },
      practiceSet: [
        { prompt: "Simplify \\(\\hat{i}\\times(\\hat{i}\\times\\hat{j})\\).", answer: "\\(-\\hat{j}\\)" },
        { prompt: "Is \\(\\vec{a}\\times(\\vec{b}\\times\\vec{c})\\) coplanar with \\(\\vec{b}\\) and \\(\\vec{c}\\)?", answer: "Yes, it is a linear combination of \\(\\vec{b}\\) and \\(\\vec{c}\\)" },
      ],
      pyqExampleId: "39fa9147-32fa-45ee-a41c-539088d6151c",
      traps: [
        {
          title: "Pairing the dot products the wrong way",
          body: "In \\(\\vec{a}\\times(\\vec{b}\\times\\vec{c})\\), the vector \\(\\vec{b}\\) is multiplied by \\(\\vec{a}\\cdot\\vec{c}\\) (the OTHER vector in the bracket), and \\(\\vec{c}\\) by \\(\\vec{a}\\cdot\\vec{b}\\). A quick check: the term with \\(\\vec{b}\\) comes first and is positive.",
        },
        {
          title: "Moving the brackets",
          body: "\\((\\vec{a}\\times\\vec{b})\\times\\vec{c}\\) is usually a different vector from \\(\\vec{a}\\times(\\vec{b}\\times\\vec{c})\\). Work out the bracket that is written.",
        },
      ],
    },
  ],
};
