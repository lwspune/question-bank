import type { SubtopicNote } from "@/app/notes/_types";

export const CB_MA_VA_COMPONENTS_NOTE: SubtopicNote = {
  subtopicName: "Components and Direction Cosines",
  title: "Components and Direction Cosines",
  oneLineDefinition:
    "A vector is written xi + yj + zk; its magnitude is the square root of x² + y² + z², the vector from P to Q is the position vector of Q minus that of P, and its direction cosines are its components divided by its magnitude.",
  whyItMatters:
    "41 questions, fourteen of them from board papers. In 2022 the board asked for all vectors of length 5√3 equally inclined to the axes, and asked it again twice in 2025. In 2023 it asked for a unit vector along PQ, the direction cosines of BA, the value that makes a vector equally inclined to the axes, the magnitude of a vector, the angle with the z-axis when the other two are given, and to show a triangle isosceles from position vectors. In 2024 it asked for the vector from an initial to a terminal point. In 2026 it asked for a vector of length 14 along QP, the third angle and the components of a unit vector, an unknown coordinate from a length of 25, and a vector of length 3 equally inclined to two axes. The textbook adds Examples 4 to 10, 12 and 26, most of Exercise 10.2, Exercise 10.4 Question 3 and four Miscellaneous questions.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbmva-components",
      name: "Components, magnitude and the unit vector",
      intuition:
        "The point P\\((x, y, z)\\) has position vector \\(\\overrightarrow{OP} = x\\hat{i} + y\\hat{j} + z\\hat{k}\\). The numbers \\(x, y, z\\) are its scalar components; \\(x\\hat{i}, y\\hat{j}, z\\hat{k}\\) are its vector components. Its length comes from Pythagoras in three dimensions. Dividing a vector by its own length keeps its direction and makes its length 1.",
      definition:
        "- \\(\\vec{r} = x\\hat{i} + y\\hat{j} + z\\hat{k}\\) has **magnitude** \\(|\\vec{r}| = \\sqrt{x^2 + y^2 + z^2}\\).\n" +
        "- **Scalar components** are \\(x, y, z\\); **vector components** are \\(x\\hat{i}, y\\hat{j}, z\\hat{k}\\).\n" +
        "- **Equal vectors** have equal corresponding components. Equal magnitudes alone do not make vectors equal.\n" +
        "- **Unit vector** along \\(\\vec{a}\\): \\(\\hat{a} = \\dfrac{\\vec{a}}{|\\vec{a}|}\\). A vector of magnitude \\(k\\) along \\(\\vec{a}\\) is \\(k\\hat{a}\\).\n" +
        "- A unit vector in the XY-plane at angle \\(\\theta\\) to the x-axis is \\(\\cos\\theta\\,\\hat{i} + \\sin\\theta\\,\\hat{j}\\).",
      formula: {
        label: "Magnitude and unit vector",
        latex: "|\\vec{r}| = \\sqrt{x^2 + y^2 + z^2}, \\qquad \\hat{a} = \\dfrac{\\vec{a}}{|\\vec{a}|}",
      },
      authoredExample: {
        prompt: "Find the unit vector in the direction of \\(\\vec{a} + \\vec{b}\\), where \\(\\vec{a} = 3\\hat{i} - \\hat{j} + 2\\hat{k}\\) and \\(\\vec{b} = -\\hat{i} + 3\\hat{j} - \\hat{k}\\).",
        steps: [
          "\\(\\vec{a} + \\vec{b} = (3 - 1)\\hat{i} + (-1 + 3)\\hat{j} + (2 - 1)\\hat{k} = 2\\hat{i} + 2\\hat{j} + \\hat{k}\\).",
          "\\(|\\vec{a} + \\vec{b}| = \\sqrt{4 + 4 + 1} = 3\\).",
          "Unit vector \\(= \\dfrac{1}{3}(2\\hat{i} + 2\\hat{j} + \\hat{k}) = \\dfrac{2}{3}\\hat{i} + \\dfrac{2}{3}\\hat{j} + \\dfrac{1}{3}\\hat{k}\\).",
        ],
        answer: "\\(\\dfrac{2}{3}\\hat{i} + \\dfrac{2}{3}\\hat{j} + \\dfrac{1}{3}\\hat{k}\\)",
      },
      selfCheckExample: {
        prompt: "Find \\(x\\), \\(y\\) and \\(z\\) if \\(x\\hat{i} + 3\\hat{j} - 4\\hat{k} = 5\\hat{i} + (y - 1)\\hat{j} + 2z\\hat{k}\\).",
        steps: [
          "Equal vectors have equal components.",
          "\\(x = 5\\); \\(3 = y - 1\\), so \\(y = 4\\); \\(-4 = 2z\\), so \\(z = -2\\).",
        ],
        answer: "\\(x = 5\\), \\(y = 4\\), \\(z = -2\\)",
      },
      practiceSet: [
        { prompt: "Find the magnitude of \\(4\\hat{i} - 4\\hat{j} + 7\\hat{k}\\).", answer: "9" },
        { prompt: "Find the scalar and vector components of the vector with initial point \\((3, -1)\\) and terminal point \\((-2, 5)\\).", answer: "Scalar components \\(-5\\) and 6; vector components \\(-5\\hat{i}\\) and \\(6\\hat{j}\\)" },
        { prompt: "Write the unit vector in the XY-plane making \\(60^\\circ\\) with the positive x-axis.", answer: "\\(\\dfrac{1}{2}\\hat{i} + \\dfrac{\\sqrt{3}}{2}\\hat{j}\\)" },
      ],
      pyqExampleId: "cfd273ce-c2d4-4c27-ad2d-d22fa75741fc",
      traps: [
        {
          title: "Scalar components with a hat",
          body: "Scalar components are plain numbers (\\(-5\\) and 6). Vector components carry the unit vectors (\\(-5\\hat{i}\\) and \\(6\\hat{j}\\)). Mixing them loses the mark.",
        },
        {
          title: "Equal length is not equal vector",
          body: "\\(\\hat{i} + 2\\hat{j}\\) and \\(2\\hat{i} + \\hat{j}\\) both have length \\(\\sqrt{5}\\), but they are not equal: their components differ.",
        },
        {
          title: "Forgetting the plus or minus",
          body: "Solving \\(x^2 = 16\\) gives \\(x = \\pm 4\\). Keep both values unless the question rules one out.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmva-joining",
      name: "The vector joining two points",
      intuition:
        "To go from P to Q, subtract the coordinates of the start from the coordinates of the end. The order matters: \\(\\overrightarrow{PQ}\\) and \\(\\overrightarrow{QP}\\) have the same length and opposite signs. Its length is the distance PQ, and dividing by that length gives the unit vector along PQ.",
      definition:
        "- For P\\((x_1, y_1, z_1)\\) and Q\\((x_2, y_2, z_2)\\): \\(\\overrightarrow{PQ} = (x_2 - x_1)\\hat{i} + (y_2 - y_1)\\hat{j} + (z_2 - z_1)\\hat{k}\\).\n" +
        "- **Distance:** \\(PQ = |\\overrightarrow{PQ}| = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2 + (z_2 - z_1)^2}\\).\n" +
        "- \"Initial point B, terminal point A\" means the vector \\(\\overrightarrow{BA}\\) = (A) minus (B).\n" +
        "- **Vector of length \\(k\\) along PQ:** \\(k \\dfrac{\\overrightarrow{PQ}}{|\\overrightarrow{PQ}|}\\).\n" +
        "- Side lengths found this way show a triangle is isosceles or right-angled.",
      formula: {
        label: "Vector from P to Q",
        latex: "\\overrightarrow{PQ} = (x_2 - x_1)\\hat{i} + (y_2 - y_1)\\hat{j} + (z_2 - z_1)\\hat{k}",
        symbols: [
          { symbol: "\\((x_1, y_1, z_1)\\)", meaning: "the initial point P" },
          { symbol: "\\((x_2, y_2, z_2)\\)", meaning: "the terminal point Q" },
        ],
      },
      authoredExample: {
        prompt: "Find a vector of magnitude 9 units in the direction of \\(\\overrightarrow{AB}\\), where A is \\((1, 0, -2)\\) and B is \\((3, 4, 2)\\).",
        steps: [
          "\\(\\overrightarrow{AB} = (3 - 1)\\hat{i} + (4 - 0)\\hat{j} + (2 + 2)\\hat{k} = 2\\hat{i} + 4\\hat{j} + 4\\hat{k}\\).",
          "\\(|\\overrightarrow{AB}| = \\sqrt{4 + 16 + 16} = 6\\).",
          "Unit vector along \\(\\overrightarrow{AB}\\): \\(\\dfrac{1}{6}(2\\hat{i} + 4\\hat{j} + 4\\hat{k}) = \\dfrac{1}{3}(\\hat{i} + 2\\hat{j} + 2\\hat{k})\\).",
          "Required vector \\(= 9 \\times \\dfrac{1}{3}(\\hat{i} + 2\\hat{j} + 2\\hat{k}) = 3\\hat{i} + 6\\hat{j} + 6\\hat{k}\\).",
        ],
        answer: "\\(3\\hat{i} + 6\\hat{j} + 6\\hat{k}\\)",
      },
      selfCheckExample: {
        prompt: "Find the unit vector along \\(\\overrightarrow{PQ}\\), where P is \\((-1, 2, 0)\\) and Q is \\((1, 3, 2)\\).",
        steps: [
          "\\(\\overrightarrow{PQ} = 2\\hat{i} + \\hat{j} + 2\\hat{k}\\).",
          "\\(|\\overrightarrow{PQ}| = \\sqrt{4 + 1 + 4} = 3\\).",
          "Unit vector \\(= \\dfrac{2}{3}\\hat{i} + \\dfrac{1}{3}\\hat{j} + \\dfrac{2}{3}\\hat{k}\\).",
        ],
        answer: "\\(\\dfrac{1}{3}(2\\hat{i} + \\hat{j} + 2\\hat{k})\\)",
      },
      practiceSet: [
        { prompt: "Find the vector with initial point B\\((1, 2, 3)\\) and terminal point A\\((4, 0, 1)\\).", answer: "\\(3\\hat{i} - 2\\hat{j} - 2\\hat{k}\\)" },
        { prompt: "Find the distance between P\\((1, -1, 2)\\) and Q\\((3, 1, 3)\\).", answer: "3" },
        { prompt: "Show that O\\((0, 0, 0)\\), A\\((3, 4, 0)\\) and B\\((4, 3, 0)\\) form an isosceles triangle.", answer: "OA = OB = 5" },
      ],
      pyqExampleId: "56cb4f36-3d27-4aac-a6b0-53998858a495",
      traps: [
        {
          title: "Start minus end",
          body: "\\(\\overrightarrow{QP}\\) is P minus Q. Subtracting the other way gives the opposite vector, and every sign in the answer is then wrong.",
        },
        {
          title: "Initial and terminal swapped",
          body: "When a question names the terminal point first, read it again: the vector still runs from the initial point to the terminal point.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmva-direction-cosines",
      name: "Direction cosines and equally inclined vectors",
      intuition:
        "A vector makes angles \\(\\alpha, \\beta, \\gamma\\) with the positive x, y and z axes. Their cosines \\(l, m, n\\) are the components of the unit vector along it, so \\(l^2 + m^2 + n^2 = 1\\). Any numbers proportional to \\(l, m, n\\), such as the components themselves, are direction ratios. Knowing two angles fixes the third up to a sign.",
      definition:
        "- \\(l = \\cos\\alpha\\), \\(m = \\cos\\beta\\), \\(n = \\cos\\gamma\\) are the **direction cosines**; \\(l^2 + m^2 + n^2 = 1\\).\n" +
        "- For \\(\\vec{r} = a\\hat{i} + b\\hat{j} + c\\hat{k}\\): direction ratios \\(a, b, c\\); direction cosines \\(\\dfrac{a}{|\\vec{r}|}, \\dfrac{b}{|\\vec{r}|}, \\dfrac{c}{|\\vec{r}|}\\).\n" +
        "- A unit vector is \\(l\\hat{i} + m\\hat{j} + n\\hat{k}\\); a vector of magnitude \\(r\\) is \\(r(l\\hat{i} + m\\hat{j} + n\\hat{k})\\).\n" +
        "- **Equally inclined to the axes:** \\(l = m = n = \\pm\\dfrac{1}{\\sqrt{3}}\\).\n" +
        "- Perpendicular to an axis means the cosine for that axis is 0.",
      formula: {
        label: "Direction cosines",
        latex: "l^2 + m^2 + n^2 = 1, \\qquad \\vec{r} = |\\vec{r}|\\,(l\\hat{i} + m\\hat{j} + n\\hat{k})",
        symbols: [
          { symbol: "\\(l, m, n\\)", meaning: "cosines of the angles with the x, y and z axes" },
        ],
      },
      authoredExample: {
        prompt: "A vector \\(\\vec{r}\\) of magnitude 6 makes an angle \\(\\dfrac{\\pi}{3}\\) with the x-axis, \\(\\dfrac{2\\pi}{3}\\) with the y-axis and an acute angle \\(\\gamma\\) with the z-axis. Find \\(\\gamma\\) and \\(\\vec{r}\\).",
        steps: [
          "\\(l = \\cos\\dfrac{\\pi}{3} = \\dfrac{1}{2}\\), \\(m = \\cos\\dfrac{2\\pi}{3} = -\\dfrac{1}{2}\\).",
          "\\(l^2 + m^2 + n^2 = 1\\): \\(\\dfrac{1}{4} + \\dfrac{1}{4} + n^2 = 1\\), so \\(n^2 = \\dfrac{1}{2}\\).",
          "\\(\\gamma\\) is acute, so \\(n = \\dfrac{1}{\\sqrt{2}}\\) and \\(\\gamma = \\dfrac{\\pi}{4}\\).",
          "\\(\\vec{r} = 6\\left(\\dfrac{1}{2}\\hat{i} - \\dfrac{1}{2}\\hat{j} + \\dfrac{1}{\\sqrt{2}}\\hat{k}\\right) = 3\\hat{i} - 3\\hat{j} + 3\\sqrt{2}\\,\\hat{k}\\).",
        ],
        answer: "\\(\\gamma = \\dfrac{\\pi}{4}\\); \\(\\vec{r} = 3\\hat{i} - 3\\hat{j} + 3\\sqrt{2}\\,\\hat{k}\\)",
      },
      selfCheckExample: {
        prompt: "Find the direction cosines of \\(2\\hat{i} - \\hat{j} + 2\\hat{k}\\).",
        steps: [
          "Magnitude \\(= \\sqrt{4 + 1 + 4} = 3\\).",
          "Divide each component by 3.",
        ],
        answer: "\\(\\dfrac{2}{3}, -\\dfrac{1}{3}, \\dfrac{2}{3}\\)",
      },
      practiceSet: [
        { prompt: "A vector makes \\(60^\\circ\\) with the x-axis and \\(45^\\circ\\) with the y-axis. Find the angle it makes with the z-axis.", answer: "\\(60^\\circ\\) or \\(120^\\circ\\)", method: "\\(\\cos^2\\gamma = 1 - \\dfrac{1}{4} - \\dfrac{1}{2} = \\dfrac{1}{4}\\)" },
        { prompt: "Find all vectors of magnitude \\(2\\sqrt{3}\\) that are equally inclined to the axes.", answer: "\\(\\pm(2\\hat{i} + 2\\hat{j} + 2\\hat{k})\\)" },
        { prompt: "Can a vector make \\(45^\\circ\\) with each of the three axes?", answer: "No: \\(\\dfrac{1}{2} + \\dfrac{1}{2} + \\dfrac{1}{2} \\ne 1\\)" },
      ],
      pyqExampleId: "c7dc5f1e-fee7-4b82-a1dd-f3b086b571e7",
      traps: [
        {
          title: "Ratios written as cosines",
          body: "Direction ratios \\(-2, -2, -1\\) are not direction cosines. Divide by the magnitude 3 and check that the squares add up to 1.",
        },
        {
          title: "Losing the negative root",
          body: "Equally inclined gives \\(l = m = n = \\pm\\dfrac{1}{\\sqrt{3}}\\). Unless the angles are said to be acute, write both vectors.",
        },
        {
          title: "Reversing the vector",
          body: "The direction cosines of \\(\\overrightarrow{BA}\\) are those of \\(\\overrightarrow{AB}\\) with every sign changed. Read which way the vector runs.",
        },
      ],
    },
  ],
};
