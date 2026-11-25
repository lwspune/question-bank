import type { SubtopicNote } from "@/app/notes/_types";

export const CB_MA_VA_DOT_NOTE: SubtopicNote = {
  subtopicName: "Scalar (Dot) Product and Projection",
  title: "Scalar (Dot) Product and Projection",
  oneLineDefinition:
    "The dot product a · b = |a||b| cos θ = a₁b₁ + a₂b₂ + a₃b₃ is a number; it gives the angle between two vectors, is zero exactly when non-zero vectors are perpendicular, and divided by |b| gives the projection of a on b.",
  whyItMatters:
    "98 questions, sixty-two of them from board papers, the most of any part of this chapter, and every year from 2022 to 2026. The board asks for the angle between two vectors (from components, from a + b + c = 0, or from equal lengths such as the length of a + 2b equal to the length of 2a minus b), for an unknown that makes two vectors perpendicular, for projections (a value, an unknown, or which formula is the projection vector), and for lengths like the length of a + 2b from given magnitudes and a dot product. Proofs come up most years: half-angle results for unit vectors (2022, 2025), a vector equally inclined to two others (2022), and the sum of three squared lengths at most 9 (2026). In 2024 four assertion-reason items tested projections, commutativity and what a dot product gives. The textbook adds Examples 13 to 21 and 27 to 30, all of Exercise 10.3 and five Miscellaneous questions.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbmva-dot-angle",
      name: "The dot product and the angle between two vectors",
      intuition:
        "The dot product multiplies the lengths of two vectors and the cosine of the angle between them, so the answer is a number, not a vector. From components it is just the sum of the products of matching components. Put the two together and you get \\(\\cos\\theta\\): positive for an acute angle, zero for a right angle, negative for an obtuse one.",
      definition:
        "- \\(\\vec{a} \\cdot \\vec{b} = |\\vec{a}||\\vec{b}|\\cos\\theta\\), where \\(0 \\le \\theta \\le \\pi\\).\n" +
        "- In components: \\(\\vec{a} \\cdot \\vec{b} = a_1b_1 + a_2b_2 + a_3b_3\\).\n" +
        "- **Angle:** \\(\\cos\\theta = \\dfrac{\\vec{a} \\cdot \\vec{b}}{|\\vec{a}||\\vec{b}|}\\).\n" +
        "- \\(\\vec{a} \\cdot \\vec{b} = \\vec{b} \\cdot \\vec{a}\\); \\(\\hat{i} \\cdot \\hat{i} = 1\\), \\(\\hat{i} \\cdot \\hat{j} = 0\\); \\(\\vec{a} \\cdot \\vec{a} = |\\vec{a}|^2\\).\n" +
        "- \\(\\vec{a} \\cdot \\vec{b} \\ge 0\\) exactly when \\(0 \\le \\theta \\le \\dfrac{\\pi}{2}\\); the angle is obtuse exactly when \\(\\vec{a} \\cdot \\vec{b} < 0\\) (and the vectors are not opposite).\n" +
        "- \\(|\\vec{a} \\cdot \\vec{b}| \\le |\\vec{a}||\\vec{b}|\\) always.\n" +
        "- **Angle of a triangle at B:** use \\(\\overrightarrow{BA}\\) and \\(\\overrightarrow{BC}\\), both pointing away from B.",
      formula: {
        label: "Angle between two vectors",
        latex: "\\cos\\theta = \\dfrac{\\vec{a} \\cdot \\vec{b}}{|\\vec{a}||\\vec{b}|} = \\dfrac{a_1b_1 + a_2b_2 + a_3b_3}{|\\vec{a}||\\vec{b}|}",
        symbols: [
          { symbol: "\\(\\theta\\)", meaning: "the angle between the vectors, from 0 to pi" },
        ],
      },
      authoredExample: {
        prompt: "Find the angle between \\(\\vec{a} = 2\\hat{i} + \\hat{j} - \\hat{k}\\) and \\(\\vec{b} = \\hat{i} - \\hat{j} + 2\\hat{k}\\).",
        steps: [
          "\\(\\vec{a} \\cdot \\vec{b} = (2)(1) + (1)(-1) + (-1)(2) = 2 - 1 - 2 = -1\\).",
          "\\(|\\vec{a}| = \\sqrt{4 + 1 + 1} = \\sqrt{6}\\) and \\(|\\vec{b}| = \\sqrt{1 + 1 + 4} = \\sqrt{6}\\).",
          "\\(\\cos\\theta = \\dfrac{-1}{\\sqrt{6}\\,\\sqrt{6}} = -\\dfrac{1}{6}\\).",
          "\\(\\theta = \\cos^{-1}\\left(-\\dfrac{1}{6}\\right)\\), an obtuse angle.",
        ],
        answer: "\\(\\theta = \\cos^{-1}\\left(-\\dfrac{1}{6}\\right)\\)",
      },
      selfCheckExample: {
        prompt: "Find \\(\\angle ABC\\) for A\\((2, 1, 0)\\), B\\((1, 1, 1)\\) and C\\((1, 2, 2)\\).",
        steps: [
          "\\(\\overrightarrow{BA} = \\hat{i} - \\hat{k}\\) and \\(\\overrightarrow{BC} = \\hat{j} + \\hat{k}\\).",
          "\\(\\overrightarrow{BA} \\cdot \\overrightarrow{BC} = 0 + 0 - 1 = -1\\); each has length \\(\\sqrt{2}\\).",
          "\\(\\cos B = \\dfrac{-1}{2}\\), so \\(\\angle ABC = \\dfrac{2\\pi}{3}\\).",
        ],
        answer: "\\(\\dfrac{2\\pi}{3}\\)",
      },
      practiceSet: [
        { prompt: "Find the angle between \\(\\vec{a}\\) and \\(\\vec{b}\\) if \\(|\\vec{a}| = 2\\), \\(|\\vec{b}| = 3\\) and \\(\\vec{a} \\cdot \\vec{b} = 3\\).", answer: "\\(\\dfrac{\\pi}{3}\\)" },
        { prompt: "For what values of \\(x\\) is the angle between \\(x\\hat{i} + 2\\hat{j} + \\hat{k}\\) and \\(\\hat{i} - \\hat{j} + x\\hat{k}\\) obtuse?", answer: "\\(x < 1\\)", method: "The dot product is \\(2x - 2\\)." },
        { prompt: "\\(\\hat{a}\\) and \\(\\hat{b}\\) are unit vectors. Can \\(\\hat{a} \\cdot \\hat{b} = 1.5\\)?", answer: "No: \\(\\hat{a} \\cdot \\hat{b} = \\cos\\theta\\) lies between \\(-1\\) and 1" },
      ],
      pyqExampleId: "b4d91ff6-664a-4304-a71a-fc3ca04d605f",
      traps: [
        {
          title: "Vectors pointing into the vertex",
          body: "For the angle at D use \\(\\overrightarrow{DV}\\) and \\(\\overrightarrow{DA}\\), both starting at D. Using \\(\\overrightarrow{VD}\\) changes the sign of the cosine and gives the supplement of the angle.",
        },
        {
          title: "A dot product is a number",
          body: "\\(\\vec{a} \\cdot \\vec{b}\\) is a scalar, but \\((\\vec{b} \\cdot \\vec{c})\\,\\vec{a}\\) is a scalar times a vector, so it is a vector. Board 2024 set this as an assertion-reason item.",
        },
        {
          title: "Reversing one vector",
          body: "Replacing \\(\\vec{b}\\) by \\(-\\vec{b}\\) turns the angle \\(\\theta\\) into \\(\\pi - \\theta\\). Scaling by a positive number does not change the angle at all.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmva-perpendicular",
      name: "Perpendicular vectors: a dot product of zero",
      intuition:
        "Two non-zero vectors are perpendicular exactly when \\(\\cos\\theta = 0\\), that is when their dot product is zero. That turns \"find \\(\\lambda\\) so that the vectors are perpendicular\" into one linear equation. It also proves geometry facts: write the condition as a dot product, expand, and use \\(\\vec{a} \\cdot \\vec{a} = |\\vec{a}|^2\\).",
      definition:
        "- For non-zero \\(\\vec{a}\\), \\(\\vec{b}\\): \\(\\vec{a} \\perp \\vec{b}\\) exactly when \\(\\vec{a} \\cdot \\vec{b} = 0\\).\n" +
        "- \\(\\vec{a} \\cdot \\vec{b} = 0\\) also holds when one vector is \\(\\vec{0}\\), so the converse needs the vectors to be non-zero.\n" +
        "- \\((\\vec{a} + \\lambda\\vec{b}) \\cdot \\vec{c} = \\vec{a} \\cdot \\vec{c} + \\lambda\\,(\\vec{b} \\cdot \\vec{c})\\).\n" +
        "- \\((\\vec{a} + \\vec{b}) \\cdot (\\vec{a} - \\vec{b}) = |\\vec{a}|^2 - |\\vec{b}|^2\\), so \\(\\vec{a} + \\vec{b} \\perp \\vec{a} - \\vec{b}\\) exactly when \\(|\\vec{a}| = |\\vec{b}|\\).\n" +
        "- If \\(\\vec{a} \\cdot \\vec{b} = \\vec{a} \\cdot \\vec{c}\\) with \\(\\vec{a} \\ne \\vec{0}\\) and \\(\\vec{b} \\ne \\vec{c}\\), then \\(\\vec{a} \\perp (\\vec{b} - \\vec{c})\\).",
      formula: {
        label: "Perpendicular vectors",
        latex: "\\vec{a} \\cdot \\vec{b} = a_1b_1 + a_2b_2 + a_3b_3 = 0",
      },
      authoredExample: {
        prompt: "Find \\(\\lambda\\) so that \\(\\vec{a} + \\lambda\\vec{b}\\) is perpendicular to \\(\\vec{c}\\), where \\(\\vec{a} = \\hat{i} + 2\\hat{j} - \\hat{k}\\), \\(\\vec{b} = 2\\hat{i} - \\hat{j} + 3\\hat{k}\\) and \\(\\vec{c} = 3\\hat{i} + \\hat{j} + \\hat{k}\\).",
        steps: [
          "Perpendicular means \\((\\vec{a} + \\lambda\\vec{b}) \\cdot \\vec{c} = 0\\), that is \\(\\vec{a} \\cdot \\vec{c} + \\lambda\\,(\\vec{b} \\cdot \\vec{c}) = 0\\).",
          "\\(\\vec{a} \\cdot \\vec{c} = 3 + 2 - 1 = 4\\).",
          "\\(\\vec{b} \\cdot \\vec{c} = 6 - 1 + 3 = 8\\).",
          "\\(4 + 8\\lambda = 0\\), so \\(\\lambda = -\\dfrac{1}{2}\\).",
        ],
        answer: "\\(\\lambda = -\\dfrac{1}{2}\\)",
      },
      selfCheckExample: {
        prompt: "Show that \\(3\\hat{i} - 2\\hat{j} + \\hat{k}\\) and \\(2\\hat{i} + 5\\hat{j} + 4\\hat{k}\\) are perpendicular.",
        steps: [
          "Dot product \\(= (3)(2) + (-2)(5) + (1)(4) = 6 - 10 + 4 = 0\\).",
          "Both vectors are non-zero, so they are perpendicular.",
        ],
        answer: "The dot product is 0, so they are perpendicular.",
      },
      practiceSet: [
        { prompt: "Find \\(p\\) if \\(2\\hat{i} + 3\\hat{j} - p\\hat{k}\\) and \\(\\hat{i} - 2\\hat{j} + 3\\hat{k}\\) are perpendicular.", answer: "\\(p = -\\dfrac{4}{3}\\)" },
        { prompt: "\\(\\vec{a} \\perp \\vec{b}\\), \\(|\\vec{a}| = 3\\) and \\(|\\vec{b}| = 4\\). Find \\(|\\vec{a} + \\vec{b}|\\).", answer: "5", method: "\\(|\\vec{a} + \\vec{b}|^2 = 9 + 16 + 0\\)" },
        { prompt: "If \\(\\vec{a} \\cdot \\vec{a} = 0\\) and \\(\\vec{a} \\cdot \\vec{b} = 0\\), what can you say about \\(\\vec{b}\\)?", answer: "Nothing: \\(\\vec{a} = \\vec{0}\\), so \\(\\vec{b}\\) can be any vector" },
      ],
      pyqExampleId: "91f5a2c6-3e51-4f2f-92d6-1632779c8a3a",
      traps: [
        {
          title: "A zero dot product with a zero vector",
          body: "\\(\\vec{a} \\cdot \\vec{b} = 0\\) proves perpendicular only when both vectors are non-zero. Say so in the answer.",
        },
        {
          title: "Expanding the bracket wrongly",
          body: "\\((\\vec{a} + \\vec{b}) \\cdot (\\vec{a} - \\vec{b})\\) is \\(|\\vec{a}|^2 - |\\vec{b}|^2\\): the two middle terms cancel because \\(\\vec{a} \\cdot \\vec{b} = \\vec{b} \\cdot \\vec{a}\\).",
        },
        {
          title: "Opposite is not perpendicular",
          body: "\\(\\vec{a}\\) and \\(-\\vec{a}\\) make an angle \\(\\pi\\), and \\(\\vec{a} \\cdot (-\\vec{a}) = -|\\vec{a}|^2\\), not 0.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmva-projection",
      name: "Projection of a vector on another",
      intuition:
        "Shine a light straight down onto the line of \\(\\vec{b}\\): the shadow of \\(\\vec{a}\\) is its projection. Its signed length is \\(|\\vec{a}|\\cos\\theta\\), which equals \\(\\dfrac{\\vec{a} \\cdot \\vec{b}}{|\\vec{b}|}\\). The projection vector is that length times the unit vector along \\(\\vec{b}\\).",
      definition:
        "- **Projection of \\(\\vec{a}\\) on \\(\\vec{b}\\):** \\(\\vec{a} \\cdot \\hat{b} = \\dfrac{\\vec{a} \\cdot \\vec{b}}{|\\vec{b}|}\\). Divide by the length of the vector you project ON.\n" +
        "- **Projection vector:** \\(\\left(\\dfrac{\\vec{a} \\cdot \\vec{b}}{|\\vec{b}|^2}\\right)\\vec{b}\\).\n" +
        "- The projection is negative when the angle is obtuse and 0 when the vectors are perpendicular.\n" +
        "- The projections of \\(\\vec{a} = a_1\\hat{i} + a_2\\hat{j} + a_3\\hat{k}\\) on the axes are \\(a_1, a_2, a_3\\).\n" +
        "- The projection of \\(\\vec{a}\\) on \\(\\vec{b}\\) and of \\(\\vec{b}\\) on \\(\\vec{a}\\) are different unless \\(|\\vec{a}| = |\\vec{b}|\\) or \\(\\vec{a} \\cdot \\vec{b} = 0\\).",
      formula: {
        label: "Projection of a on b",
        latex: "\\text{proj}_{\\vec{b}}\\,\\vec{a} = \\dfrac{\\vec{a} \\cdot \\vec{b}}{|\\vec{b}|}, \\qquad \\text{projection vector} = \\left(\\dfrac{\\vec{a} \\cdot \\vec{b}}{|\\vec{b}|^2}\\right)\\vec{b}",
      },
      authoredExample: {
        prompt: "Find the projection of \\(\\vec{a} = 3\\hat{i} - \\hat{j} + 2\\hat{k}\\) on \\(\\vec{b} = 2\\hat{i} + 2\\hat{j} - \\hat{k}\\), and the projection vector.",
        steps: [
          "\\(\\vec{a} \\cdot \\vec{b} = 6 - 2 - 2 = 2\\).",
          "\\(|\\vec{b}| = \\sqrt{4 + 4 + 1} = 3\\).",
          "Projection \\(= \\dfrac{2}{3}\\).",
          "Projection vector \\(= \\dfrac{2}{9}(2\\hat{i} + 2\\hat{j} - \\hat{k}) = \\dfrac{4}{9}\\hat{i} + \\dfrac{4}{9}\\hat{j} - \\dfrac{2}{9}\\hat{k}\\).",
        ],
        answer: "Projection \\(\\dfrac{2}{3}\\); projection vector \\(\\dfrac{2}{9}(2\\hat{i} + 2\\hat{j} - \\hat{k})\\)",
      },
      selfCheckExample: {
        prompt: "Find \\(\\lambda\\) if the projection of \\(\\lambda\\hat{i} + \\hat{j} + 2\\hat{k}\\) on \\(2\\hat{i} - \\hat{j} + 2\\hat{k}\\) is 3.",
        steps: [
          "Dot product \\(= 2\\lambda - 1 + 4 = 2\\lambda + 3\\); \\(|2\\hat{i} - \\hat{j} + 2\\hat{k}| = 3\\).",
          "\\(\\dfrac{2\\lambda + 3}{3} = 3\\), so \\(2\\lambda + 3 = 9\\).",
          "\\(\\lambda = 3\\).",
        ],
        answer: "\\(\\lambda = 3\\)",
      },
      practiceSet: [
        { prompt: "Find the projection of \\(4\\hat{i} + 2\\hat{j} - \\hat{k}\\) on \\(\\hat{j}\\).", answer: "2" },
        { prompt: "Find the projection of \\(\\hat{i} + \\hat{j}\\) on \\(3\\hat{i} - 4\\hat{k}\\).", answer: "\\(\\dfrac{3}{5}\\)" },
        { prompt: "Is the projection of \\(\\vec{a}\\) on \\(\\vec{b}\\) always equal to the projection of \\(\\vec{b}\\) on \\(\\vec{a}\\)?", answer: "No: they are \\(\\dfrac{\\vec{a} \\cdot \\vec{b}}{|\\vec{b}|}\\) and \\(\\dfrac{\\vec{a} \\cdot \\vec{b}}{|\\vec{a}|}\\)" },
      ],
      pyqExampleId: "19b75148-c28f-4112-8fa5-af1704cbe0f2",
      traps: [
        {
          title: "Dividing by the wrong length",
          body: "The projection of \\(\\vec{a}\\) ON \\(\\vec{b}\\) divides by \\(|\\vec{b}|\\). Dividing by \\(|\\vec{a}|\\) gives the projection of \\(\\vec{b}\\) on \\(\\vec{a}\\).",
        },
        {
          title: "Squaring brings in a false root",
          body: "When the unknown sits under the square root of \\(|\\vec{b}|\\), squaring gives two roots. Put each back: a root that makes the projection negative when the question says positive must be rejected.",
        },
        {
          title: "Scalar asked, vector given",
          body: "\"Projection\" is a number. \"Projection vector\" is that number times \\(\\hat{b}\\). Answer the one the question names.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmva-modulus",
      name: "Lengths of sums and differences",
      intuition:
        "You cannot add lengths, but you can square them: \\(|\\vec{u}|^2 = \\vec{u} \\cdot \\vec{u}\\). Expanding \\(|\\vec{a} + \\vec{b}|^2\\) like \\((x + y)^2\\) gives the two squared lengths plus twice the dot product. Any condition on lengths of sums or differences becomes an equation in \\(\\vec{a} \\cdot \\vec{b}\\), and from it the angle.",
      definition:
        "- \\(|\\vec{a} \\pm \\vec{b}|^2 = |\\vec{a}|^2 + |\\vec{b}|^2 \\pm 2\\,\\vec{a} \\cdot \\vec{b}\\).\n" +
        "- \\(|p\\vec{a} + q\\vec{b}|^2 = p^2|\\vec{a}|^2 + q^2|\\vec{b}|^2 + 2pq\\,\\vec{a} \\cdot \\vec{b}\\).\n" +
        "- \\((\\vec{x} - \\vec{a}) \\cdot (\\vec{x} + \\vec{a}) = |\\vec{x}|^2 - |\\vec{a}|^2\\).\n" +
        "- \\(|\\vec{a} + \\vec{b}| = |\\vec{a} - \\vec{b}|\\) exactly when \\(\\vec{a} \\cdot \\vec{b} = 0\\).\n" +
        "- **Unit vectors at angle \\(\\theta\\):** \\(|\\vec{a} - \\vec{b}| = 2\\sin\\dfrac{\\theta}{2}\\), since \\(|\\vec{a} - \\vec{b}|^2 = 2 - 2\\cos\\theta = 4\\sin^2\\dfrac{\\theta}{2}\\).\n" +
        "- Take the positive square root at the end: a length is never negative.",
      formula: {
        label: "Square of a sum",
        latex: "|\\vec{a} + \\vec{b}|^2 = |\\vec{a}|^2 + |\\vec{b}|^2 + 2\\,\\vec{a} \\cdot \\vec{b}",
      },
      authoredExample: {
        prompt: "If \\(|\\vec{a}| = 3\\), \\(|\\vec{b}| = 2\\) and \\(\\vec{a} \\cdot \\vec{b} = 1\\), find \\(|2\\vec{a} - \\vec{b}|\\).",
        steps: [
          "\\(|2\\vec{a} - \\vec{b}|^2 = 4|\\vec{a}|^2 + |\\vec{b}|^2 - 4\\,\\vec{a} \\cdot \\vec{b}\\).",
          "\\(= 4(9) + 4 - 4(1) = 36 + 4 - 4 = 36\\).",
          "\\(|2\\vec{a} - \\vec{b}| = 6\\).",
        ],
        answer: "6",
      },
      selfCheckExample: {
        prompt: "\\(\\vec{a}\\) and \\(\\vec{b}\\) are unit vectors with \\(|\\vec{a} + \\vec{b}| = \\sqrt{3}\\). Find the angle between them.",
        steps: [
          "\\(|\\vec{a} + \\vec{b}|^2 = 1 + 1 + 2\\cos\\theta = 3\\).",
          "\\(\\cos\\theta = \\dfrac{1}{2}\\).",
          "\\(\\theta = \\dfrac{\\pi}{3}\\).",
        ],
        answer: "\\(\\dfrac{\\pi}{3}\\)",
      },
      practiceSet: [
        { prompt: "\\(\\vec{a}\\) is a unit vector and \\((\\vec{x} - \\vec{a}) \\cdot (\\vec{x} + \\vec{a}) = 15\\). Find \\(|\\vec{x}|\\).", answer: "4" },
        { prompt: "\\(|\\vec{a}| = 4|\\vec{b}|\\) and \\((\\vec{a} + \\vec{b}) \\cdot (\\vec{a} - \\vec{b}) = 60\\). Find \\(|\\vec{a}|\\) and \\(|\\vec{b}|\\).", answer: "\\(|\\vec{a}| = 8\\), \\(|\\vec{b}| = 2\\)" },
        { prompt: "Prove that \\(|\\vec{a} + \\vec{b}|^2 + |\\vec{a} - \\vec{b}|^2 = 2(|\\vec{a}|^2 + |\\vec{b}|^2)\\).", answer: "Add the two expansions; the \\(\\pm 2\\,\\vec{a} \\cdot \\vec{b}\\) terms cancel." },
      ],
      pyqExampleId: "d1ad0b41-22eb-4116-a21a-7db7abf00d49",
      traps: [
        {
          title: "Forgetting the coefficient on the cross term",
          body: "\\(|2\\vec{a} - \\vec{b}|^2\\) has \\(-4\\,\\vec{a} \\cdot \\vec{b}\\), not \\(-2\\,\\vec{a} \\cdot \\vec{b}\\): the cross term is \\(2 \\times 2 \\times (-1)\\) times the dot product.",
        },
        {
          title: "Squaring the vector's coefficient only",
          body: "\\(|2\\vec{a}|^2 = 4|\\vec{a}|^2\\). Writing \\(2|\\vec{a}|^2\\) is a common slip.",
        },
        {
          title: "Half-angle proofs without the sign step",
          body: "From \\(|\\vec{a} - \\vec{b}|^2 = 4\\sin^2\\dfrac{\\theta}{2}\\) you may take the positive root only because \\(\\dfrac{\\theta}{2}\\) lies between 0 and \\(\\dfrac{\\pi}{2}\\). Write that line: it carries a mark.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmva-sum-zero",
      name: "Three vectors adding to zero, and mutually perpendicular vectors",
      intuition:
        "If \\(\\vec{a} + \\vec{b} + \\vec{c} = \\vec{0}\\), squaring the sum gives the three dot products at once. To find the angle between two of them, move the third to the other side and square: the third vector's length is known. Mutually perpendicular vectors make every cross dot product zero, which is what makes their sums easy.",
      definition:
        "- From \\(\\vec{a} + \\vec{b} + \\vec{c} = \\vec{0}\\): \\(|\\vec{a}|^2 + |\\vec{b}|^2 + |\\vec{c}|^2 + 2(\\vec{a} \\cdot \\vec{b} + \\vec{b} \\cdot \\vec{c} + \\vec{c} \\cdot \\vec{a}) = 0\\).\n" +
        "- **Angle between \\(\\vec{a}\\) and \\(\\vec{b}\\):** \\(\\vec{a} + \\vec{b} = -\\vec{c}\\), so \\(|\\vec{a}|^2 + |\\vec{b}|^2 + 2|\\vec{a}||\\vec{b}|\\cos\\theta = |\\vec{c}|^2\\).\n" +
        "- **Mutually perpendicular** \\(\\vec{a}, \\vec{b}, \\vec{c}\\): \\(\\vec{a} \\cdot \\vec{b} = \\vec{b} \\cdot \\vec{c} = \\vec{c} \\cdot \\vec{a} = 0\\), so \\(|p\\vec{a} + q\\vec{b} + r\\vec{c}|^2 = p^2|\\vec{a}|^2 + q^2|\\vec{b}|^2 + r^2|\\vec{c}|^2\\).",
      formula: {
        label: "Square of a sum of three",
        latex: "|\\vec{a} + \\vec{b} + \\vec{c}|^2 = |\\vec{a}|^2 + |\\vec{b}|^2 + |\\vec{c}|^2 + 2(\\vec{a} \\cdot \\vec{b} + \\vec{b} \\cdot \\vec{c} + \\vec{c} \\cdot \\vec{a})",
      },
      authoredExample: {
        prompt: "If \\(\\vec{a} + \\vec{b} + \\vec{c} = \\vec{0}\\) with \\(|\\vec{a}| = 1\\), \\(|\\vec{b}| = 2\\) and \\(|\\vec{c}| = 3\\), find \\(\\vec{a} \\cdot \\vec{b} + \\vec{b} \\cdot \\vec{c} + \\vec{c} \\cdot \\vec{a}\\).",
        steps: [
          "\\(|\\vec{a} + \\vec{b} + \\vec{c}|^2 = 0\\).",
          "So \\(1 + 4 + 9 + 2(\\vec{a} \\cdot \\vec{b} + \\vec{b} \\cdot \\vec{c} + \\vec{c} \\cdot \\vec{a}) = 0\\).",
          "\\(2(\\vec{a} \\cdot \\vec{b} + \\vec{b} \\cdot \\vec{c} + \\vec{c} \\cdot \\vec{a}) = -14\\).",
          "\\(\\vec{a} \\cdot \\vec{b} + \\vec{b} \\cdot \\vec{c} + \\vec{c} \\cdot \\vec{a} = -7\\).",
        ],
        answer: "\\(-7\\)",
      },
      selfCheckExample: {
        prompt: "\\(\\vec{a}, \\vec{b}, \\vec{c}\\) are mutually perpendicular unit vectors. Find the angle between \\(\\vec{a}\\) and \\(\\vec{a} + 2\\vec{b} + 2\\vec{c}\\).",
        steps: [
          "\\(|\\vec{a} + 2\\vec{b} + 2\\vec{c}|^2 = 1 + 4 + 4 = 9\\), so its length is 3.",
          "\\(\\vec{a} \\cdot (\\vec{a} + 2\\vec{b} + 2\\vec{c}) = |\\vec{a}|^2 = 1\\).",
          "\\(\\cos\\theta = \\dfrac{1}{1 \\times 3} = \\dfrac{1}{3}\\), so \\(\\theta = \\cos^{-1}\\dfrac{1}{3}\\).",
        ],
        answer: "\\(\\cos^{-1}\\dfrac{1}{3}\\)",
      },
      practiceSet: [
        { prompt: "\\(\\vec{a} + \\vec{b} + \\vec{c} = \\vec{0}\\), \\(|\\vec{a}| = \\sqrt{19}\\), \\(|\\vec{b}| = 2\\), \\(|\\vec{c}| = 3\\). Find the angle between \\(\\vec{b}\\) and \\(\\vec{c}\\).", answer: "\\(\\dfrac{\\pi}{3}\\)", method: "\\(19 = 4 + 9 + 12\\cos\\theta\\)" },
        { prompt: "\\(\\vec{a} + \\vec{b} + \\vec{c} = \\vec{0}\\) and each has length 2. Find \\(\\vec{a} \\cdot \\vec{b} + \\vec{b} \\cdot \\vec{c} + \\vec{c} \\cdot \\vec{a}\\).", answer: "\\(-6\\)" },
        { prompt: "Each of \\(\\vec{a}, \\vec{b}, \\vec{c}\\) is perpendicular to the sum of the other two, and \\(|\\vec{a}| = 1\\), \\(|\\vec{b}| = 2\\), \\(|\\vec{c}| = 2\\). Find \\(|\\vec{a} + \\vec{b} + \\vec{c}|\\).", answer: "3" },
      ],
      pyqExampleId: "bf2d2aae-08f4-42eb-af1d-615a8ec556eb",
      traps: [
        {
          title: "Squaring the wrong side",
          body: "For the angle between \\(\\vec{a}\\) and \\(\\vec{b}\\), keep \\(\\vec{a} + \\vec{b}\\) together and move \\(\\vec{c}\\) across. Squaring \\(\\vec{a} + \\vec{c}\\) brings in the wrong dot product.",
        },
        {
          title: "The 2 in front of the bracket",
          body: "The expansion has \\(2(\\vec{a} \\cdot \\vec{b} + \\vec{b} \\cdot \\vec{c} + \\vec{c} \\cdot \\vec{a})\\). Forgetting to divide by 2 at the end doubles the answer.",
        },
      ],
    },
  ],
};
