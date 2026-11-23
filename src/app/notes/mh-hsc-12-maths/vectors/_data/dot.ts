import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_MA_VE_DOT_NOTE: SubtopicNote = {
  subtopicName: "Dot Product of Vectors",
  title: "Dot Product: Angle, Projections, Direction Cosines and Proofs",
  oneLineDefinition:
    "The scalar product a · b = |a||b| cos θ, the angle between two vectors and the test for perpendicular vectors, scalar and vector projections, direction angles, direction cosines and direction ratios, and proofs in geometry by the dot product.",
  whyItMatters:
    "67 questions, eight of them from board papers: the proof that l² + m² + n² = 1 followed by a missing direction angle (2017), the acute angle between lines with given direction ratios (2018), direction cosines from direction angles (2020), the altitudes of a triangle are concurrent (2022), the angle in a semicircle is a right angle and a third direction angle (2024), a missing direction angle (2025) and the value of p for perpendicular vectors (2026). The textbook rows are Exercise 5.3, its solved examples and the Miscellaneous Exercise questions on these ideas.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscmve-angle",
      name: "Scalar product, the angle between vectors and perpendicular vectors",
      intuition:
        "The dot product measures how much two vectors point the same way. It is largest when they are parallel, zero when they are at right angles, and negative when the angle between them is obtuse. Because it is also a simple sum of products of components, it turns 'find the angle' into arithmetic.",
      definition:
        "- \\(\\vec{a}\\cdot\\vec{b} = |\\vec{a}||\\vec{b}|\\cos\\theta\\), where \\(0 \\le \\theta \\le \\pi\\) is the angle between them. The result is a scalar.\n" +
        "- In components: \\(\\vec{a}\\cdot\\vec{b} = a_1b_1 + a_2b_2 + a_3b_3\\), and \\(\\cos\\theta = \\dfrac{\\vec{a}\\cdot\\vec{b}}{|\\vec{a}||\\vec{b}|}\\).\n" +
        "- For non-zero vectors: \\(\\vec{a}\\cdot\\vec{b} = 0\\) means perpendicular; \\(\\vec{a}\\cdot\\vec{b} > 0\\) means \\(\\theta\\) is acute; \\(\\vec{a}\\cdot\\vec{b} < 0\\) means \\(\\theta\\) is more than \\(\\dfrac{\\pi}{2}\\).\n" +
        "- \\(\\hat{i}\\cdot\\hat{i} = \\hat{j}\\cdot\\hat{j} = \\hat{k}\\cdot\\hat{k} = 1\\) and \\(\\hat{i}\\cdot\\hat{j} = \\hat{j}\\cdot\\hat{k} = \\hat{k}\\cdot\\hat{i} = 0\\).\n" +
        "- The dot product is commutative and distributive, and \\(\\vec{a}\\cdot\\vec{a} = |\\vec{a}|^2\\), so \\(|\\vec{a} + \\vec{b}|^2 = |\\vec{a}|^2 + 2\\,\\vec{a}\\cdot\\vec{b} + |\\vec{b}|^2\\).",
      formula: {
        label: "Scalar product and the angle",
        latex: "\\vec{a}\\cdot\\vec{b} = |\\vec{a}||\\vec{b}|\\cos\\theta = a_1b_1 + a_2b_2 + a_3b_3, \\qquad \\cos\\theta = \\frac{\\vec{a}\\cdot\\vec{b}}{|\\vec{a}||\\vec{b}|}",
      },
      authoredExample: {
        prompt: "Find the angle between \\(\\vec{a} = 2\\hat{i} + \\hat{j} - 2\\hat{k}\\) and \\(\\vec{b} = \\hat{i} + \\hat{j}\\).",
        steps: [
          "\\(\\vec{a}\\cdot\\vec{b} = (2)(1) + (1)(1) + (-2)(0) = 3\\).",
          "\\(|\\vec{a}| = \\sqrt{4 + 1 + 4} = 3\\) and \\(|\\vec{b}| = \\sqrt{1 + 1} = \\sqrt{2}\\).",
          "\\(\\cos\\theta = \\dfrac{\\vec{a}\\cdot\\vec{b}}{|\\vec{a}||\\vec{b}|} = \\dfrac{3}{3\\sqrt{2}} = \\dfrac{1}{\\sqrt{2}}\\).",
          "\\(\\theta = \\dfrac{\\pi}{4}\\).",
        ],
        answer: "\\(\\theta = \\dfrac{\\pi}{4}\\), that is \\(45^{\\circ}\\)",
      },
      selfCheckExample: {
        prompt: "If \\(|\\vec{a}| = 2\\), \\(|\\vec{b}| = 3\\) and the angle between them is \\(60^{\\circ}\\), find \\(|\\vec{a} + \\vec{b}|\\).",
        steps: ["\\(|\\vec{a} + \\vec{b}|^2 = 4 + 2(2)(3)\\cos 60^{\\circ} + 9 = 4 + 6 + 9 = 19\\)."],
        answer: "\\(\\sqrt{19}\\)",
      },
      practiceSet: [
        {
          prompt: "Find \\(\\vec{a}\\cdot\\vec{b}\\) for \\(\\vec{a} = 2\\hat{i} - 3\\hat{j} + \\hat{k}\\) and \\(\\vec{b} = \\hat{i} + 2\\hat{j} + 5\\hat{k}\\).",
          answer: "1",
        },
        { prompt: "What is \\(\\hat{i}\\cdot\\hat{k}\\)?", answer: "0" },
        { prompt: "For two non-zero vectors, \\(\\vec{a}\\cdot\\vec{b} < 0\\). Is the angle between them acute or more than a right angle?", answer: "More than a right angle" },
      ],
      pyqExampleId: "651d03ff-4fe1-44d4-a227-73ff028b1b62",
      traps: [
        {
          title: "Writing the dot product as a vector",
          body: "\\(\\vec{a}\\cdot\\vec{b}\\) is a number. An answer with \\(\\hat{i}\\), \\(\\hat{j}\\) or \\(\\hat{k}\\) in it has gone wrong.",
        },
        {
          title: "Squaring a sum without the middle term",
          body: "\\(|\\vec{a} + \\vec{b}|^2 = |\\vec{a}|^2 + 2\\,\\vec{a}\\cdot\\vec{b} + |\\vec{b}|^2\\). Dropping \\(2\\,\\vec{a}\\cdot\\vec{b}\\) is right only when the vectors are perpendicular.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmve-projection",
      name: "Scalar and vector projections",
      intuition:
        "The projection of b on a is the shadow b casts on the line of a when light falls at right angles to that line. Its length is |b| cos θ, which the dot product gives without finding θ. The vector projection is that length laid along the unit vector of a.",
      definition:
        "- Scalar projection of \\(\\vec{b}\\) on \\(\\vec{a}\\): \\(|\\vec{b}|\\cos\\theta = \\dfrac{\\vec{a}\\cdot\\vec{b}}{|\\vec{a}|}\\).\n" +
        "- Vector projection of \\(\\vec{b}\\) on \\(\\vec{a}\\): \\(\\left(\\dfrac{\\vec{a}\\cdot\\vec{b}}{|\\vec{a}|^2}\\right)\\vec{a}\\).\n" +
        "- \\(\\vec{b}\\) splits into a part parallel to \\(\\vec{a}\\), its vector projection, and the rest, which is perpendicular to \\(\\vec{a}\\).\n" +
        "- The projections of \\(p\\hat{i} + q\\hat{j} + r\\hat{k}\\) on the axes are \\(p\\), \\(q\\) and \\(r\\).\n" +
        "- Foot of the perpendicular from P to the line AB: take Q on AB as \\(\\vec{a} + t\\,\\overrightarrow{AB}\\) and solve \\(\\overrightarrow{PQ}\\cdot\\overrightarrow{AB} = 0\\) for \\(t\\).",
      formula: {
        label: "Projections of b on a",
        latex: "\\text{scalar: } \\frac{\\vec{a}\\cdot\\vec{b}}{|\\vec{a}|}, \\qquad \\text{vector: } \\left(\\frac{\\vec{a}\\cdot\\vec{b}}{|\\vec{a}|^2}\\right)\\vec{a}",
      },
      authoredExample: {
        prompt: "Find the scalar and vector projections of \\(\\vec{b} = 3\\hat{i} + \\hat{j} + 2\\hat{k}\\) on \\(\\vec{a} = \\hat{i} + 2\\hat{j} + 2\\hat{k}\\).",
        steps: [
          "\\(\\vec{a}\\cdot\\vec{b} = 3 + 2 + 4 = 9\\) and \\(|\\vec{a}| = \\sqrt{1 + 4 + 4} = 3\\).",
          "Scalar projection \\(= \\dfrac{\\vec{a}\\cdot\\vec{b}}{|\\vec{a}|} = \\dfrac{9}{3} = 3\\).",
          "Vector projection \\(= \\left(\\dfrac{\\vec{a}\\cdot\\vec{b}}{|\\vec{a}|^2}\\right)\\vec{a} = \\dfrac{9}{9}\\vec{a} = \\hat{i} + 2\\hat{j} + 2\\hat{k}\\).",
        ],
        answer: "Scalar projection 3; vector projection \\(\\hat{i} + 2\\hat{j} + 2\\hat{k}\\)",
      },
      selfCheckExample: {
        prompt: "What is the scalar projection of \\(2\\hat{i} - 3\\hat{j} + 6\\hat{k}\\) on \\(\\hat{k}\\)?",
        steps: ["\\(\\dfrac{(2\\hat{i} - 3\\hat{j} + 6\\hat{k})\\cdot\\hat{k}}{|\\hat{k}|} = \\dfrac{6}{1}\\)."],
        answer: "6",
      },
      practiceSet: [
        { prompt: "Find the scalar projection of \\(\\vec{b} = 4\\hat{i} + 3\\hat{j}\\) on \\(\\vec{a} = 3\\hat{i} + 4\\hat{j}\\).", answer: "\\(\\dfrac{24}{5}\\)" },
        { prompt: "If \\(\\vec{a}\\cdot\\vec{b} = 0\\), what is the vector projection of \\(\\vec{b}\\) on \\(\\vec{a}\\)?", answer: "The zero vector" },
      ],
      pyqExampleId: "cf67d24f-7612-4cc0-a2eb-92f69487bee6",
      traps: [
        {
          title: "Dividing by the wrong magnitude",
          body: "The projection of \\(\\vec{b}\\) ON \\(\\vec{a}\\) divides by \\(|\\vec{a}|\\), the vector you project onto. Read 'of' and 'on' carefully.",
        },
        {
          title: "Vector projection with |a| instead of |a|²",
          body: "The vector projection is the scalar projection times the UNIT vector \\(\\hat{a}\\), which makes \\(|\\vec{a}|^2\\) in the denominator.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmve-dircos",
      name: "Direction angles, direction cosines and direction ratios",
      intuition:
        "The direction of a line in space is fixed by the three angles it makes with the axes. Their cosines are the components of a unit vector along the line, and a unit vector has length 1, so the squares of the three cosines must add to 1. That single fact answers most questions here.",
      definition:
        "- Direction angles \\(\\alpha, \\beta, \\gamma\\) (each from \\(0\\) to \\(\\pi\\)) are the angles a vector makes with the positive X, Y and Z axes. Direction cosines: \\(l = \\cos\\alpha\\), \\(m = \\cos\\beta\\), \\(n = \\cos\\gamma\\).\n" +
        "- **Proof of the identity** \\(l^2 + m^2 + n^2 = 1\\):\n" +
        "- For \\(\\vec{a} = a_1\\hat{i} + a_2\\hat{j} + a_3\\hat{k}\\), \\(\\cos\\alpha = \\dfrac{\\vec{a}\\cdot\\hat{i}}{|\\vec{a}||\\hat{i}|} = \\dfrac{a_1}{|\\vec{a}|}\\); likewise \\(\\cos\\beta = \\dfrac{a_2}{|\\vec{a}|}\\) and \\(\\cos\\gamma = \\dfrac{a_3}{|\\vec{a}|}\\).\n" +
        "- Squaring and adding: \\(\\cos^2\\alpha + \\cos^2\\beta + \\cos^2\\gamma = \\dfrac{a_1^2 + a_2^2 + a_3^2}{|\\vec{a}|^2} = 1\\), since \\(|\\vec{a}|^2 = a_1^2 + a_2^2 + a_3^2\\).\n" +
        "- So the direction cosines are the components of the unit vector \\(\\hat{a}\\). A line has direction cosines \\(l, m, n\\) or \\(-l, -m, -n\\).\n" +
        "- Direction ratios \\(a, b, c\\) are any numbers proportional to \\(l, m, n\\); then \\(l = \\pm\\dfrac{a}{\\sqrt{a^2 + b^2 + c^2}}\\), and so on. A line has infinitely many sets of direction ratios.\n" +
        "- Lines with direction ratios \\(a_1, b_1, c_1\\) and \\(a_2, b_2, c_2\\): \\(\\cos\\theta = \\dfrac{|a_1a_2 + b_1b_2 + c_1c_2|}{\\sqrt{a_1^2 + b_1^2 + c_1^2}\\sqrt{a_2^2 + b_2^2 + c_2^2}}\\) for the acute angle; they are perpendicular when \\(a_1a_2 + b_1b_2 + c_1c_2 = 0\\).",
      formula: {
        label: "Direction cosines",
        latex: "l = \\frac{a_1}{|\\vec{a}|},\\ m = \\frac{a_2}{|\\vec{a}|},\\ n = \\frac{a_3}{|\\vec{a}|}, \\qquad l^2 + m^2 + n^2 = 1",
      },
      authoredExample: {
        prompt: "Find the direction cosines of the line from \\(A(1, 2, -1)\\) to \\(B(3, -1, 5)\\).",
        steps: [
          "\\(\\overrightarrow{AB} = (3 - 1)\\hat{i} + (-1 - 2)\\hat{j} + (5 + 1)\\hat{k} = 2\\hat{i} - 3\\hat{j} + 6\\hat{k}\\).",
          "\\(|\\overrightarrow{AB}| = \\sqrt{4 + 9 + 36} = 7\\).",
          "\\(l = \\dfrac{2}{7}\\), \\(m = -\\dfrac{3}{7}\\), \\(n = \\dfrac{6}{7}\\).",
          "Check: \\(\\dfrac{4 + 9 + 36}{49} = 1\\).",
        ],
        answer: "\\(\\dfrac{2}{7}, -\\dfrac{3}{7}, \\dfrac{6}{7}\\)",
      },
      selfCheckExample: {
        prompt: "The direction ratios of a line are \\(1, -2, 2\\). Write its direction cosines.",
        steps: ["\\(\\sqrt{1 + 4 + 4} = 3\\); divide each ratio by 3."],
        answer: "\\(\\pm\\left(\\dfrac{1}{3}, -\\dfrac{2}{3}, \\dfrac{2}{3}\\right)\\)",
      },
      practiceSet: [
        {
          prompt: "Can \\(\\dfrac{1}{2}, \\dfrac{1}{2}, \\dfrac{1}{2}\\) be the direction cosines of a line?",
          answer: "No, their squares add to \\(\\dfrac{3}{4}\\), not 1",
        },
        { prompt: "Find the acute angle between lines with direction ratios \\(1, 1, 0\\) and \\(1, 0, 1\\).", answer: "\\(60^{\\circ}\\)" },
      ],
      pyqExampleId: "4e2e7972-163f-474b-be02-537ca3871580",
      traps: [
        {
          title: "Keeping one root of a squared cosine",
          body: "When \\(\\cos^2\\gamma\\) has a value between 0 and 1, \\(\\cos\\gamma\\) can be positive or negative, so there are two direction angles. Give both unless the question fixes the sign.",
        },
        {
          title: "Using direction ratios as direction cosines",
          body: "Direction ratios must be divided by \\(\\sqrt{a^2 + b^2 + c^2}\\) first. Test: the squares of direction cosines add to 1.",
        },
        {
          title: "Proving the identity with numbers",
          body: "'Prove that \\(l^2 + m^2 + n^2 = 1\\)' needs the general vector \\(a_1\\hat{i} + a_2\\hat{j} + a_3\\hat{k}\\). A numerical example earns no proof marks.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmve-dotproofs",
      name: "Proofs in geometry by the dot product",
      intuition:
        "Many geometry facts are statements about right angles, and a right angle is exactly a dot product of 0. Choose the origin well, write each segment as a difference of position vectors, and expand the dot product. If it collapses to 0, the right angle is proved.",
      definition:
        "- Two segments PA and PB (neither of zero length) are perpendicular if and only if \\(\\overrightarrow{PA}\\cdot\\overrightarrow{PB} = 0\\).\n" +
        "- **The angle in a semicircle is a right angle.** Proof outline:\n" +
        "- Take the centre O as origin; let AB be a diameter with \\(\\vec{a}\\) and \\(-\\vec{a}\\) the position vectors of A and B, and \\(P(\\vec{r})\\) a point on the circle, so \\(|\\vec{r}| = |\\vec{a}|\\) (both are radii).\n" +
        "- \\(\\overrightarrow{PA} = \\vec{a} - \\vec{r}\\) and \\(\\overrightarrow{PB} = -\\vec{a} - \\vec{r}\\).\n" +
        "- \\(\\overrightarrow{PA}\\cdot\\overrightarrow{PB} = -(\\vec{a} - \\vec{r})\\cdot(\\vec{a} + \\vec{r}) = -(|\\vec{a}|^2 - |\\vec{r}|^2) = 0\\).\n" +
        "- So \\(\\overrightarrow{PA} \\perp \\overrightarrow{PB}\\) and \\(\\angle APB = 90^{\\circ}\\).\n" +
        "- **The altitudes of a triangle are concurrent.** Let the altitudes from A and B meet at \\(P(\\vec{p})\\).\n" +
        "- \\(AP \\perp BC\\): \\((\\vec{p} - \\vec{a})\\cdot(\\vec{c} - \\vec{b}) = 0\\). \\(BP \\perp CA\\): \\((\\vec{p} - \\vec{b})\\cdot(\\vec{a} - \\vec{c}) = 0\\).\n" +
        "- Expanding and adding the two gives \\((\\vec{p} - \\vec{c})\\cdot(\\vec{a} - \\vec{b}) = 0\\), so \\(CP \\perp AB\\): the third altitude also passes through P.",
      formula: {
        label: "Test for perpendicular segments",
        latex: "\\overrightarrow{PA}\\cdot\\overrightarrow{PB} = 0 \\ \\Rightarrow\\ PA \\perp PB",
      },
      authoredExample: {
        prompt: "Prove by the vector method that the diagonals of a rhombus are perpendicular.",
        steps: [
          "Let OACB be a rhombus with \\(\\overrightarrow{OA} = \\vec{a}\\) and \\(\\overrightarrow{OB} = \\vec{b}\\), where \\(|\\vec{a}| = |\\vec{b}|\\) (all sides are equal).",
          "The diagonals are \\(\\overrightarrow{OC} = \\vec{a} + \\vec{b}\\) and \\(\\overrightarrow{BA} = \\vec{a} - \\vec{b}\\).",
          "\\(\\overrightarrow{OC}\\cdot\\overrightarrow{BA} = (\\vec{a} + \\vec{b})\\cdot(\\vec{a} - \\vec{b}) = |\\vec{a}|^2 - |\\vec{b}|^2\\).",
          "\\(= 0\\), since \\(|\\vec{a}| = |\\vec{b}|\\).",
          "Hence the diagonals are perpendicular.",
        ],
        answer: "The dot product of the diagonals is 0, so they are perpendicular",
      },
      selfCheckExample: {
        prompt: "Show that the triangle with vertices \\(A(2, 1, 1)\\), \\(B(3, -1, 2)\\) and \\(C(4, 0, 3)\\) has a right angle, and say where.",
        steps: [
          "\\(\\overrightarrow{BA} = -\\hat{i} + 2\\hat{j} - \\hat{k}\\) and \\(\\overrightarrow{BC} = \\hat{i} + \\hat{j} + \\hat{k}\\).",
          "\\(\\overrightarrow{BA}\\cdot\\overrightarrow{BC} = -1 + 2 - 1 = 0\\).",
        ],
        answer: "The right angle is at B",
      },
      practiceSet: [
        {
          prompt: "In a proof, \\(\\overrightarrow{PA}\\cdot\\overrightarrow{PB}\\) comes out as 0 and neither vector is zero. What do you conclude?",
          answer: "PA is perpendicular to PB",
        },
        { prompt: "If \\(|\\vec{a}| = |\\vec{b}|\\), what is \\((\\vec{a} + \\vec{b})\\cdot(\\vec{a} - \\vec{b})\\)?", answer: "0" },
      ],
      pyqExampleId: "79a6fe63-a5ce-4e79-a0e7-1db844d340b8",
      traps: [
        {
          title: "Not saying why the last line is zero",
          body: "In the semicircle proof, \\(|\\vec{a}|^2 - |\\vec{r}|^2 = 0\\) only because both are radii. State it; it is the step the marks hang on.",
        },
        {
          title: "Concluding perpendicular from a zero dot product alone",
          body: "A zero dot product also happens when one vector is zero. Add 'neither vector is zero (P is distinct from A and B)' before concluding the right angle.",
        },
      ],
    },
  ],
};
