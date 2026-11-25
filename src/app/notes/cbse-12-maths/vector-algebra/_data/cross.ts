import type { SubtopicNote } from "@/app/notes/_types";

export const CB_MA_VA_CROSS_NOTE: SubtopicNote = {
  subtopicName: "Vector (Cross) Product",
  title: "Vector (Cross) Product",
  oneLineDefinition:
    "The cross product a × b is a vector of length |a||b| sin θ perpendicular to both a and b; it is zero exactly when non-zero vectors are parallel, and its length is the area of the parallelogram on a and b.",
  whyItMatters:
    "58 questions, thirty-nine of them from board papers, set every year from 2022 to 2026. The commonest asks are an area (a triangle from its vertices or from two sides, a parallelogram from two adjacent sides or, in 2022 and twice in 2025, from its diagonals) and a vector of given length perpendicular to two vectors (the flag-post of 2026 is one). The board also asks for unknowns that make a cross product zero (2026), for the angle or its sine from a cross product (2023), for the identity linking the cross and dot products (2022 and 2026, and assertion-reason items in 2025 and 2026), and for proofs: two vectors are parallel (2022), b = c when both products with a agree (2022, 2025), and the length of a × b is at most |a||b| (2024). The textbook adds Examples 22 to 25, all of Exercise 10.4 except Question 3, and four Miscellaneous questions.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbmva-cross-compute",
      name: "Computing a cross product",
      intuition:
        "The cross product of two vectors is a new vector standing at right angles to both. In components it is the expansion of a 3 by 3 determinant whose first row is \\(\\hat{i}, \\hat{j}, \\hat{k}\\). For the unit vectors themselves, go round the cycle i, j, k: forward gives the next one, backward gives minus it.",
      definition:
        "- \\(\\vec{a} \\times \\vec{b} = |\\vec{a}||\\vec{b}|\\sin\\theta\\,\\hat{n}\\), where \\(\\hat{n}\\) is the unit vector perpendicular to both, with \\(\\vec{a}, \\vec{b}, \\hat{n}\\) forming a right-handed system.\n" +
        "- \\(\\hat{i} \\times \\hat{j} = \\hat{k}\\), \\(\\hat{j} \\times \\hat{k} = \\hat{i}\\), \\(\\hat{k} \\times \\hat{i} = \\hat{j}\\); reversing the order changes the sign: \\(\\hat{i} \\times \\hat{k} = -\\hat{j}\\).\n" +
        "- \\(\\hat{i} \\times \\hat{i} = \\hat{j} \\times \\hat{j} = \\hat{k} \\times \\hat{k} = \\vec{0}\\), and \\(\\vec{a} \\times \\vec{a} = \\vec{0}\\).\n" +
        "- \\(\\vec{b} \\times \\vec{a} = -(\\vec{a} \\times \\vec{b})\\); \\(\\vec{a} \\times (\\vec{b} + \\vec{c}) = \\vec{a} \\times \\vec{b} + \\vec{a} \\times \\vec{c}\\).\n" +
        "- **Determinant form:** expand along the first row and remember the minus sign on the \\(\\hat{j}\\) term.",
      formula: {
        label: "Cross product in components",
        latex: "\\vec{a} \\times \\vec{b} = \\begin{vmatrix} \\hat{i} & \\hat{j} & \\hat{k} \\\\ a_1 & a_2 & a_3 \\\\ b_1 & b_2 & b_3 \\end{vmatrix} = (a_2b_3 - a_3b_2)\\hat{i} - (a_1b_3 - a_3b_1)\\hat{j} + (a_1b_2 - a_2b_1)\\hat{k}",
      },
      authoredExample: {
        prompt: "Find \\(\\vec{a} \\times \\vec{b}\\) and \\(|\\vec{a} \\times \\vec{b}|\\) for \\(\\vec{a} = 2\\hat{i} - \\hat{j} + \\hat{k}\\) and \\(\\vec{b} = \\hat{i} + 3\\hat{j} - 2\\hat{k}\\).",
        steps: [
          "\\(\\vec{a} \\times \\vec{b} = \\begin{vmatrix} \\hat{i} & \\hat{j} & \\hat{k} \\\\ 2 & -1 & 1 \\\\ 1 & 3 & -2 \\end{vmatrix}\\).",
          "\\(= \\hat{i}[(-1)(-2) - (1)(3)] - \\hat{j}[(2)(-2) - (1)(1)] + \\hat{k}[(2)(3) - (-1)(1)]\\).",
          "\\(= \\hat{i}(2 - 3) - \\hat{j}(-4 - 1) + \\hat{k}(6 + 1) = -\\hat{i} + 5\\hat{j} + 7\\hat{k}\\).",
          "\\(|\\vec{a} \\times \\vec{b}| = \\sqrt{1 + 25 + 49} = \\sqrt{75} = 5\\sqrt{3}\\).",
        ],
        answer: "\\(-\\hat{i} + 5\\hat{j} + 7\\hat{k}\\); \\(5\\sqrt{3}\\)",
      },
      selfCheckExample: {
        prompt: "Find the value of \\((\\hat{i} \\times \\hat{k}) \\cdot \\hat{j} + (\\hat{k} \\times \\hat{j}) \\cdot \\hat{i}\\).",
        steps: [
          "\\(\\hat{i} \\times \\hat{k} = -\\hat{j}\\), so \\((\\hat{i} \\times \\hat{k}) \\cdot \\hat{j} = -1\\).",
          "\\(\\hat{k} \\times \\hat{j} = -\\hat{i}\\), so \\((\\hat{k} \\times \\hat{j}) \\cdot \\hat{i} = -1\\).",
          "Sum \\(= -2\\).",
        ],
        answer: "\\(-2\\)",
      },
      practiceSet: [
        { prompt: "Find \\(|\\vec{a} \\times \\vec{b}|\\) for \\(\\vec{a} = \\hat{i} + 2\\hat{j}\\) and \\(\\vec{b} = 3\\hat{j} - \\hat{k}\\).", answer: "\\(\\sqrt{14}\\)", method: "\\(\\vec{a} \\times \\vec{b} = -2\\hat{i} + \\hat{j} + 3\\hat{k}\\)" },
        { prompt: "Find \\((\\hat{i} + \\hat{j}) \\times \\hat{k}\\).", answer: "\\(\\hat{i} - \\hat{j}\\)" },
        { prompt: "Show that \\((\\vec{a} + \\vec{b}) \\times (\\vec{a} - \\vec{b}) = -2(\\vec{a} \\times \\vec{b})\\).", answer: "Expand: \\(\\vec{a} \\times \\vec{a} - \\vec{a} \\times \\vec{b} + \\vec{b} \\times \\vec{a} - \\vec{b} \\times \\vec{b} = -2(\\vec{a} \\times \\vec{b})\\)" },
      ],
      pyqExampleId: "85ae2a22-7cf4-493f-a6aa-a4af70f5cec7",
      traps: [
        {
          title: "The middle term's sign",
          body: "In the determinant the \\(\\hat{j}\\) term carries a minus: \\(-\\hat{j}(a_1b_3 - a_3b_1)\\). Dropping it is the most common error in this chapter.",
        },
        {
          title: "Order matters",
          body: "\\(\\vec{b} \\times \\vec{a} = -(\\vec{a} \\times \\vec{b})\\). Writing \\(\\vec{a} \\times \\vec{b} = \\vec{b} \\times \\vec{a}\\) is false; Board 2024 used it as a false Reason.",
        },
        {
          title: "Taking every pair as cyclic",
          body: "\\(\\hat{j} \\times \\hat{k} = \\hat{i}\\) but \\(\\hat{i} \\times \\hat{k} = -\\hat{j}\\). Check the order of each pair before you write the sign.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmva-cross-parallel",
      name: "Parallel vectors: a cross product of zero",
      intuition:
        "Since \\(|\\vec{a} \\times \\vec{b}| = |\\vec{a}||\\vec{b}|\\sin\\theta\\), the cross product of two non-zero vectors is zero exactly when \\(\\sin\\theta = 0\\), that is when they are parallel (angle 0 or \\(\\pi\\)). So \"the cross product is zero\" is a quick way to say the components are proportional, and to prove two vectors are parallel.",
      definition:
        "- For non-zero \\(\\vec{a}\\), \\(\\vec{b}\\): \\(\\vec{a} \\times \\vec{b} = \\vec{0}\\) exactly when \\(\\vec{a} \\parallel \\vec{b}\\), so \\(\\dfrac{a_1}{b_1} = \\dfrac{a_2}{b_2} = \\dfrac{a_3}{b_3}\\).\n" +
        "- \\(\\vec{a} \\times \\vec{b} = \\vec{0}\\) does not force \\(\\vec{a} = \\vec{0}\\) or \\(\\vec{b} = \\vec{0}\\).\n" +
        "- If \\(\\vec{a} \\cdot \\vec{b} = 0\\) and \\(\\vec{a} \\times \\vec{b} = \\vec{0}\\), one of the vectors is \\(\\vec{0}\\).\n" +
        "- **Proof of \\(\\vec{b} = \\vec{c}\\):** if \\(\\vec{a} \\cdot \\vec{b} = \\vec{a} \\cdot \\vec{c}\\) and \\(\\vec{a} \\times \\vec{b} = \\vec{a} \\times \\vec{c}\\) with \\(\\vec{a} \\ne \\vec{0}\\), then \\(\\vec{b} - \\vec{c}\\) is both perpendicular and parallel to \\(\\vec{a}\\), so \\(\\vec{b} - \\vec{c} = \\vec{0}\\).\n" +
        "- To show \\(\\vec{p} \\parallel \\vec{q}\\), expand \\(\\vec{p} \\times \\vec{q}\\) and show it is \\(\\vec{0}\\).",
      formula: {
        label: "Parallel vectors",
        latex: "\\vec{a} \\times \\vec{b} = \\vec{0}, \\qquad \\dfrac{a_1}{b_1} = \\dfrac{a_2}{b_2} = \\dfrac{a_3}{b_3}",
      },
      authoredExample: {
        prompt: "Find \\(\\lambda\\) and \\(\\mu\\) if \\((3\\hat{i} - \\lambda\\hat{j} + 2\\hat{k}) \\times (6\\hat{i} + 4\\hat{j} + \\mu\\hat{k}) = \\vec{0}\\).",
        steps: [
          "A zero cross product of two non-zero vectors means they are parallel.",
          "So the components are proportional: \\(\\dfrac{3}{6} = \\dfrac{-\\lambda}{4} = \\dfrac{2}{\\mu}\\).",
          "\\(\\dfrac{-\\lambda}{4} = \\dfrac{1}{2}\\) gives \\(\\lambda = -2\\).",
          "\\(\\dfrac{2}{\\mu} = \\dfrac{1}{2}\\) gives \\(\\mu = 4\\).",
        ],
        answer: "\\(\\lambda = -2\\), \\(\\mu = 4\\)",
      },
      selfCheckExample: {
        prompt: "Use the cross product to show that \\(\\hat{i} - 2\\hat{j} + 3\\hat{k}\\) and \\(-2\\hat{i} + 4\\hat{j} - 6\\hat{k}\\) are parallel.",
        steps: [
          "\\(\\begin{vmatrix} \\hat{i} & \\hat{j} & \\hat{k} \\\\ 1 & -2 & 3 \\\\ -2 & 4 & -6 \\end{vmatrix} = \\hat{i}(12 - 12) - \\hat{j}(-6 + 6) + \\hat{k}(4 - 4)\\).",
          "\\(= \\vec{0}\\), and neither vector is zero, so they are parallel.",
        ],
        answer: "The cross product is \\(\\vec{0}\\), so the vectors are parallel.",
      },
      practiceSet: [
        { prompt: "Find \\(x\\) if \\((x\\hat{i} + 2\\hat{j} - \\hat{k}) \\times (3\\hat{i} + 6\\hat{j} - 3\\hat{k}) = \\vec{0}\\).", answer: "\\(x = 1\\)" },
        { prompt: "Non-zero vectors \\(\\vec{a}\\) and \\(\\vec{b}\\) have \\(\\vec{a} \\times \\vec{b} = \\vec{0}\\). What can the angle between them be?", answer: "0 or \\(\\pi\\)" },
        { prompt: "If \\(\\vec{a} \\times \\vec{b} = \\vec{0}\\), must \\(\\vec{a}\\) or \\(\\vec{b}\\) be the zero vector?", answer: "No: \\(\\vec{b} = 2\\vec{a}\\) with \\(\\vec{a} \\ne \\vec{0}\\) gives a zero cross product" },
      ],
      pyqExampleId: "c22b92a7-91c2-48dd-990d-9989309b839d",
      traps: [
        {
          title: "Zero cross product read as perpendicular",
          body: "A zero DOT product means perpendicular. A zero CROSS product means parallel. Mixing them up reverses the whole answer.",
        },
        {
          title: "Proof that skips the non-zero step",
          body: "In the \\(\\vec{b} = \\vec{c}\\) proof, say why \\(\\vec{b} - \\vec{c}\\) cannot be a non-zero vector: it would have to be both perpendicular and parallel to the non-zero \\(\\vec{a}\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmva-perp-unit",
      name: "A vector perpendicular to two given vectors",
      intuition:
        "\\(\\vec{a} \\times \\vec{b}\\) is perpendicular to both \\(\\vec{a}\\) and \\(\\vec{b}\\), and so is any multiple of it. Divide by its length to get a unit vector; multiply that by \\(k\\) to get length \\(k\\). The other direction, minus that vector, is equally perpendicular. If an extra condition like \\(\\vec{c} \\cdot \\vec{d} = 3\\) is given, write \\(\\vec{d} = \\lambda(\\vec{a} \\times \\vec{b})\\) and use the condition to find \\(\\lambda\\).",
      definition:
        "- Unit vectors perpendicular to both \\(\\vec{a}\\) and \\(\\vec{b}\\): \\(\\pm\\dfrac{\\vec{a} \\times \\vec{b}}{|\\vec{a} \\times \\vec{b}|}\\).\n" +
        "- A vector of length \\(k\\) perpendicular to both: \\(\\pm k\\,\\dfrac{\\vec{a} \\times \\vec{b}}{|\\vec{a} \\times \\vec{b}|}\\).\n" +
        "- A vector \\(\\vec{d}\\) perpendicular to both with one more condition: \\(\\vec{d} = \\lambda(\\vec{a} \\times \\vec{b})\\), then find \\(\\lambda\\).\n" +
        "- Perpendicular to \\(\\vec{a} + \\vec{b}\\) and \\(\\vec{a} - \\vec{b}\\): form those two vectors first, then cross them.\n" +
        "- Check by showing the dot product with each given vector is 0.",
      formula: {
        label: "Unit vector perpendicular to a and b",
        latex: "\\hat{n} = \\pm\\dfrac{\\vec{a} \\times \\vec{b}}{|\\vec{a} \\times \\vec{b}|}",
      },
      authoredExample: {
        prompt: "Find a vector of magnitude 6 perpendicular to both \\(\\vec{a} = \\hat{i} + \\hat{j} - \\hat{k}\\) and \\(\\vec{b} = 2\\hat{i} - \\hat{j} + \\hat{k}\\).",
        steps: [
          "\\(\\vec{a} \\times \\vec{b} = \\hat{i}[(1)(1) - (-1)(-1)] - \\hat{j}[(1)(1) - (-1)(2)] + \\hat{k}[(1)(-1) - (1)(2)]\\).",
          "\\(= 0\\hat{i} - 3\\hat{j} - 3\\hat{k}\\).",
          "\\(|\\vec{a} \\times \\vec{b}| = \\sqrt{9 + 9} = 3\\sqrt{2}\\), so a unit vector is \\(-\\dfrac{1}{\\sqrt{2}}(\\hat{j} + \\hat{k})\\).",
          "Required vector \\(= \\pm 6 \\times \\dfrac{1}{\\sqrt{2}}(\\hat{j} + \\hat{k}) = \\pm 3\\sqrt{2}(\\hat{j} + \\hat{k})\\).",
          "Check: \\(\\vec{a} \\cdot (\\hat{j} + \\hat{k}) = 1 - 1 = 0\\) and \\(\\vec{b} \\cdot (\\hat{j} + \\hat{k}) = -1 + 1 = 0\\).",
        ],
        answer: "\\(\\pm 3\\sqrt{2}(\\hat{j} + \\hat{k})\\)",
      },
      selfCheckExample: {
        prompt: "Find a unit vector perpendicular to both \\(\\vec{a} + \\vec{b}\\) and \\(\\vec{a} - \\vec{b}\\), where \\(\\vec{a} = 2\\hat{i} + \\hat{j}\\) and \\(\\vec{b} = \\hat{j} + 3\\hat{k}\\).",
        steps: [
          "\\(\\vec{a} + \\vec{b} = 2\\hat{i} + 2\\hat{j} + 3\\hat{k}\\) and \\(\\vec{a} - \\vec{b} = 2\\hat{i} - 3\\hat{k}\\).",
          "Their cross product \\(= \\hat{i}(-6 - 0) - \\hat{j}(-6 - 6) + \\hat{k}(0 - 4) = -6\\hat{i} + 12\\hat{j} - 4\\hat{k}\\).",
          "Its length is \\(\\sqrt{36 + 144 + 16} = 14\\).",
          "Unit vector \\(= \\pm\\dfrac{1}{7}(-3\\hat{i} + 6\\hat{j} - 2\\hat{k})\\).",
        ],
        answer: "\\(\\pm\\dfrac{1}{7}(-3\\hat{i} + 6\\hat{j} - 2\\hat{k})\\)",
      },
      practiceSet: [
        { prompt: "Find a unit vector perpendicular to both \\(\\hat{i} + \\hat{j}\\) and \\(\\hat{j} + \\hat{k}\\).", answer: "\\(\\pm\\dfrac{1}{\\sqrt{3}}(\\hat{i} - \\hat{j} + \\hat{k})\\)" },
        { prompt: "How many unit vectors are perpendicular to two non-parallel vectors?", answer: "Two: \\(\\hat{n}\\) and \\(-\\hat{n}\\)" },
        { prompt: "Find a vector of length 2 perpendicular to both \\(3\\hat{i}\\) and \\(4\\hat{j}\\).", answer: "\\(\\pm 2\\hat{k}\\)" },
      ],
      pyqExampleId: "d284dcd7-fa95-41d6-88df-9c088761a113",
      traps: [
        {
          title: "Not dividing by the length",
          body: "\\(\\vec{a} \\times \\vec{b}\\) is perpendicular to both but is rarely a unit vector. Divide by its length before you scale to the required magnitude.",
        },
        {
          title: "Crossing a and b instead of the given pair",
          body: "When the question says perpendicular to \\(\\vec{a} + \\vec{b}\\) and \\(\\vec{a} - \\vec{b}\\), work out those two vectors first. Their cross product is \\(-2(\\vec{a} \\times \\vec{b})\\), so the direction is the same but the working must show it.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmva-area-triangle",
      name: "Area of a triangle",
      intuition:
        "The two sides of a triangle from one vertex span a parallelogram twice the triangle's size. The parallelogram's area is the length of the cross product of those sides, so the triangle's area is half of it. Both sides must start at the same vertex.",
      definition:
        "- Area of triangle ABC \\(= \\dfrac{1}{2}|\\overrightarrow{AB} \\times \\overrightarrow{AC}|\\).\n" +
        "- From vertices: find \\(\\overrightarrow{AB}\\) and \\(\\overrightarrow{AC}\\) (head minus tail) first.\n" +
        "- If the cross product of two sides is given, the area is half its length.\n" +
        "- Area 0 means the three points are collinear.\n" +
        "- Write the answer in square units.",
      formula: {
        label: "Area of a triangle",
        latex: "\\Delta = \\dfrac{1}{2}\\left|\\overrightarrow{AB} \\times \\overrightarrow{AC}\\right|",
      },
      authoredExample: {
        prompt: "Using vectors, find the area of the triangle with vertices A\\((1, 0, 2)\\), B\\((2, 2, 1)\\) and C\\((3, 1, 4)\\).",
        steps: [
          "\\(\\overrightarrow{AB} = \\hat{i} + 2\\hat{j} - \\hat{k}\\) and \\(\\overrightarrow{AC} = 2\\hat{i} + \\hat{j} + 2\\hat{k}\\).",
          "\\(\\overrightarrow{AB} \\times \\overrightarrow{AC} = \\hat{i}[(2)(2) - (-1)(1)] - \\hat{j}[(1)(2) - (-1)(2)] + \\hat{k}[(1)(1) - (2)(2)]\\).",
          "\\(= 5\\hat{i} - 4\\hat{j} - 3\\hat{k}\\).",
          "\\(|\\overrightarrow{AB} \\times \\overrightarrow{AC}| = \\sqrt{25 + 16 + 9} = \\sqrt{50} = 5\\sqrt{2}\\).",
          "Area \\(= \\dfrac{1}{2} \\times 5\\sqrt{2} = \\dfrac{5\\sqrt{2}}{2}\\) square units.",
        ],
        answer: "\\(\\dfrac{5\\sqrt{2}}{2}\\) square units",
      },
      selfCheckExample: {
        prompt: "If \\(\\overrightarrow{PQ} \\times \\overrightarrow{PR} = 2\\hat{i} - 6\\hat{j} + 3\\hat{k}\\), find the area of triangle PQR.",
        steps: [
          "\\(|2\\hat{i} - 6\\hat{j} + 3\\hat{k}| = \\sqrt{4 + 36 + 9} = 7\\).",
          "Area \\(= \\dfrac{1}{2} \\times 7 = \\dfrac{7}{2}\\) square units.",
        ],
        answer: "\\(\\dfrac{7}{2}\\) square units",
      },
      practiceSet: [
        { prompt: "Find the area of the triangle with \\(\\overrightarrow{AB} = \\hat{i} + \\hat{j}\\) and \\(\\overrightarrow{AC} = \\hat{j} + \\hat{k}\\).", answer: "\\(\\dfrac{\\sqrt{3}}{2}\\) square units" },
        { prompt: "Find the area of the triangle with vertices O\\((0, 0, 0)\\), A\\((2, 0, 0)\\) and B\\((0, 3, 0)\\).", answer: "3 square units" },
        { prompt: "The cross product of two sides of a triangle is \\(\\vec{0}\\). What does this say about its vertices?", answer: "The area is 0, so the three points are collinear" },
      ],
      pyqExampleId: "f19c7042-1d83-44d6-95a6-300df618eeca",
      traps: [
        {
          title: "Forgetting the half",
          body: "\\(|\\overrightarrow{AB} \\times \\overrightarrow{AC}|\\) is the area of the parallelogram. The triangle is half of it.",
        },
        {
          title: "Crossing position vectors",
          body: "Both vectors must be sides of the triangle, such as \\(\\overrightarrow{AB}\\) and \\(\\overrightarrow{AC}\\). Crossing the position vectors of two vertices, \\(\\vec{a} \\times \\vec{b}\\), gives the area of a different triangle (the one with a vertex at the origin).",
        },
        {
          title: "Leaving the answer as a vector",
          body: "Area is a number: the length of the cross product, halved. An answer like \\(\\dfrac{1}{2}(5\\hat{i} - 4\\hat{j} - 3\\hat{k})\\) is not an area.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmva-area-parallelogram",
      name: "Area of a parallelogram from its sides or its diagonals",
      intuition:
        "With adjacent sides \\(\\vec{p}\\) and \\(\\vec{q}\\), the area is base times height, \\(|\\vec{p}||\\vec{q}|\\sin\\theta\\), which is \\(|\\vec{p} \\times \\vec{q}|\\). When the diagonals \\(\\vec{a}\\) and \\(\\vec{b}\\) are given instead, their cross product is twice that of the sides, so the area is half of \\(|\\vec{a} \\times \\vec{b}|\\).",
      definition:
        "- Adjacent sides \\(\\vec{p}\\), \\(\\vec{q}\\): area \\(= |\\vec{p} \\times \\vec{q}|\\).\n" +
        "- **Diagonals \\(\\vec{a}\\), \\(\\vec{b}\\): area \\(= \\dfrac{1}{2}|\\vec{a} \\times \\vec{b}|\\).** Proof (board 2025):\n" +
        "- With sides \\(\\vec{p}\\), \\(\\vec{q}\\): \\(\\vec{a} = \\vec{p} + \\vec{q}\\) and \\(\\vec{b} = \\vec{q} - \\vec{p}\\).\n" +
        "- \\(\\vec{a} \\times \\vec{b} = \\vec{p} \\times \\vec{q} - \\vec{p} \\times \\vec{p} + \\vec{q} \\times \\vec{q} - \\vec{q} \\times \\vec{p}\\).\n" +
        "- \\(= \\vec{p} \\times \\vec{q} + \\vec{p} \\times \\vec{q} = 2(\\vec{p} \\times \\vec{q})\\).\n" +
        "- So area \\(= |\\vec{p} \\times \\vec{q}| = \\dfrac{1}{2}|\\vec{a} \\times \\vec{b}|\\).\n" +
        "- Unit vectors along the diagonals come from \\(\\vec{p} + \\vec{q}\\) and \\(\\vec{p} - \\vec{q}\\) divided by their lengths.",
      formula: {
        label: "Area of a parallelogram",
        latex: "\\text{Area} = |\\vec{p} \\times \\vec{q}| = \\dfrac{1}{2}|\\vec{a} \\times \\vec{b}|",
        symbols: [
          { symbol: "\\(\\vec{p}, \\vec{q}\\)", meaning: "adjacent sides" },
          { symbol: "\\(\\vec{a}, \\vec{b}\\)", meaning: "the two diagonals" },
        ],
      },
      authoredExample: {
        prompt: "Find the area of the parallelogram whose adjacent sides are \\(\\vec{p} = 2\\hat{i} + \\hat{j} - \\hat{k}\\) and \\(\\vec{q} = \\hat{i} - \\hat{j} + 2\\hat{k}\\).",
        steps: [
          "\\(\\vec{p} \\times \\vec{q} = \\hat{i}[(1)(2) - (-1)(-1)] - \\hat{j}[(2)(2) - (-1)(1)] + \\hat{k}[(2)(-1) - (1)(1)]\\).",
          "\\(= \\hat{i}(2 - 1) - \\hat{j}(4 + 1) + \\hat{k}(-2 - 1) = \\hat{i} - 5\\hat{j} - 3\\hat{k}\\).",
          "Area \\(= \\sqrt{1 + 25 + 9} = \\sqrt{35}\\) square units.",
        ],
        answer: "\\(\\sqrt{35}\\) square units",
      },
      selfCheckExample: {
        prompt: "The diagonals of a parallelogram are \\(3\\hat{i} + \\hat{j} - 2\\hat{k}\\) and \\(\\hat{i} - 3\\hat{j} + 4\\hat{k}\\). Find its area.",
        steps: [
          "Cross product \\(= \\hat{i}(4 - 6) - \\hat{j}(12 + 2) + \\hat{k}(-9 - 1) = -2\\hat{i} - 14\\hat{j} - 10\\hat{k}\\).",
          "Its length \\(= \\sqrt{4 + 196 + 100} = \\sqrt{300} = 10\\sqrt{3}\\).",
          "Area \\(= \\dfrac{1}{2} \\times 10\\sqrt{3} = 5\\sqrt{3}\\) square units.",
        ],
        answer: "\\(5\\sqrt{3}\\) square units",
      },
      practiceSet: [
        { prompt: "Find the area of the parallelogram with adjacent sides \\(3\\hat{i}\\) and \\(2\\hat{j} + 2\\hat{k}\\).", answer: "\\(6\\sqrt{2}\\) square units" },
        { prompt: "\\(\\vec{a}\\) and \\(\\vec{b}\\) are unit vectors at \\(60^\\circ\\). Find the area of the parallelogram with adjacent sides \\(\\vec{a} + \\vec{b}\\) and \\(\\vec{a} - \\vec{b}\\).", answer: "\\(\\sqrt{3}\\) square units", method: "The cross product is \\(-2(\\vec{a} \\times \\vec{b})\\)." },
        { prompt: "A rectangle has adjacent sides along \\(2\\hat{i}\\) and \\(3\\hat{j} + 4\\hat{k}\\). Find its area.", answer: "10 square units" },
      ],
      pyqExampleId: "122a7baf-2f42-453d-8071-ec24e8545ce2",
      traps: [
        {
          title: "Diagonals treated as sides",
          body: "Read whether the vectors are SIDES or DIAGONALS. For diagonals the area is half the length of their cross product; using the full length doubles the answer.",
        },
        {
          title: "Halving for a parallelogram",
          body: "With adjacent sides, the parallelogram's area is the full \\(|\\vec{p} \\times \\vec{q}|\\). The half belongs to the triangle.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmva-sine",
      name: "The sine of the angle and the link with the dot product",
      intuition:
        "The length of the cross product carries the sine of the angle; the dot product carries the cosine. Square both and add: the angle disappears and you are left with \\(|\\vec{a}|^2|\\vec{b}|^2\\). Dividing one by the other gives \\(\\tan\\theta\\). Since the sine is at most 1, \\(|\\vec{a} \\times \\vec{b}|\\) can never be more than \\(|\\vec{a}||\\vec{b}|\\).",
      definition:
        "- \\(|\\vec{a} \\times \\vec{b}| = |\\vec{a}||\\vec{b}|\\sin\\theta\\), so \\(\\sin\\theta = \\dfrac{|\\vec{a} \\times \\vec{b}|}{|\\vec{a}||\\vec{b}|}\\).\n" +
        "- \\(|\\vec{a} \\times \\vec{b}|^2 + (\\vec{a} \\cdot \\vec{b})^2 = |\\vec{a}|^2|\\vec{b}|^2\\), because \\(\\sin^2\\theta + \\cos^2\\theta = 1\\).\n" +
        "- \\(\\tan\\theta = \\dfrac{|\\vec{a} \\times \\vec{b}|}{\\vec{a} \\cdot \\vec{b}}\\) when \\(\\theta \\ne \\dfrac{\\pi}{2}\\); a negative dot product makes \\(\\theta\\) obtuse.\n" +
        "- \\(|\\vec{a} \\times \\vec{b}| \\le |\\vec{a}||\\vec{b}|\\), with equality exactly when \\(\\vec{a} \\perp \\vec{b}\\).\n" +
        "- \\(\\sin\\theta\\) alone fixes \\(\\theta\\) only up to \\(\\theta\\) or \\(\\pi - \\theta\\); the sign of the dot product decides.",
      formula: {
        label: "Cross and dot products together",
        latex: "|\\vec{a} \\times \\vec{b}|^2 + (\\vec{a} \\cdot \\vec{b})^2 = |\\vec{a}|^2|\\vec{b}|^2",
      },
      authoredExample: {
        prompt: "If \\(|\\vec{a}| = 4\\), \\(|\\vec{b}| = 3\\) and \\(\\vec{a} \\cdot \\vec{b} = 6\\), find \\(|\\vec{a} \\times \\vec{b}|\\) and the angle between the vectors.",
        steps: [
          "\\(|\\vec{a} \\times \\vec{b}|^2 = |\\vec{a}|^2|\\vec{b}|^2 - (\\vec{a} \\cdot \\vec{b})^2 = 144 - 36 = 108\\).",
          "\\(|\\vec{a} \\times \\vec{b}| = \\sqrt{108} = 6\\sqrt{3}\\).",
          "\\(\\cos\\theta = \\dfrac{6}{12} = \\dfrac{1}{2}\\), so \\(\\theta = \\dfrac{\\pi}{3}\\).",
        ],
        answer: "\\(6\\sqrt{3}\\); \\(\\theta = \\dfrac{\\pi}{3}\\)",
      },
      selfCheckExample: {
        prompt: "\\(|\\vec{a}| = 2\\), \\(|\\vec{b}| = 5\\) and \\(|\\vec{a} \\times \\vec{b}| = 5\\). Find the possible angles between \\(\\vec{a}\\) and \\(\\vec{b}\\).",
        steps: [
          "\\(\\sin\\theta = \\dfrac{5}{2 \\times 5} = \\dfrac{1}{2}\\).",
          "In \\([0, \\pi]\\) this gives \\(\\theta = \\dfrac{\\pi}{6}\\) or \\(\\dfrac{5\\pi}{6}\\).",
        ],
        answer: "\\(\\dfrac{\\pi}{6}\\) or \\(\\dfrac{5\\pi}{6}\\)",
      },
      practiceSet: [
        { prompt: "\\(|\\vec{a} \\times \\vec{b}| = 4\\) and \\(\\vec{a} \\cdot \\vec{b} = 4\\sqrt{3}\\). Find the angle between \\(\\vec{a}\\) and \\(\\vec{b}\\).", answer: "\\(\\dfrac{\\pi}{6}\\)", method: "\\(\\tan\\theta = \\dfrac{1}{\\sqrt{3}}\\)" },
        { prompt: "\\(|\\vec{a} \\times \\vec{b}|^2 + (\\vec{a} \\cdot \\vec{b})^2 = 144\\) and \\(|\\vec{a}| = 4\\). Find \\(|\\vec{b}|\\).", answer: "3" },
        { prompt: "When is \\(|\\vec{a} \\times \\vec{b}| = |\\vec{a}||\\vec{b}|\\) for non-zero vectors?", answer: "When they are perpendicular" },
      ],
      pyqExampleId: "5e6f8a59-4cf4-49c5-a1ea-4925427b40ff",
      traps: [
        {
          title: "Taking only the acute angle",
          body: "\\(\\sin\\theta = \\dfrac{1}{2}\\) allows \\(\\dfrac{\\pi}{6}\\) and \\(\\dfrac{5\\pi}{6}\\). If a dot product is given, its sign picks one: negative means obtuse.",
        },
        {
          title: "A true Reason that does not explain",
          body: "Board 2026 paired the identity \\(|\\vec{a} \\times \\vec{b}|^2 + (\\vec{a} \\cdot \\vec{b})^2 = |\\vec{a}|^2|\\vec{b}|^2\\) with \\(|\\vec{a} \\times \\vec{b}| = (\\vec{a} \\cdot \\vec{b})\\tan\\theta\\). Both are true, but the identity comes from \\(\\sin^2\\theta + \\cos^2\\theta = 1\\), so the code is (B).",
        },
      ],
    },
  ],
};
