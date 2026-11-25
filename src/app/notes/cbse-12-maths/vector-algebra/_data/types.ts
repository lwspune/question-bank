import type { SubtopicNote } from "@/app/notes/_types";

export const CB_MA_VA_TYPES_NOTE: SubtopicNote = {
  subtopicName: "Types of Vectors",
  title: "Types of Vectors",
  oneLineDefinition:
    "A vector has both magnitude and direction; the book names zero, unit, coinitial, collinear, equal and negative vectors, and two vectors are collinear when one is a scalar multiple of the other.",
  whyItMatters:
    "39 questions, ten of them from board papers. In 2023 the board asked the condition for two vectors to be collinear, all vectors of a given length collinear with i + j + k, and a unit vector along 4i minus 3k. In 2024 a case study asked for a unit vector along a side. In 2025 it asked twice for the unknown that makes two vectors parallel, for x when two combinations of non-collinear vectors are collinear, and for a vector of length 21 opposite to a given direction. In 2026 it asked for the value that makes three points collinear and set an assertion-reason item on a and minus 2a. The textbook adds Examples 1 to 3 and all of Exercise 10.1.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cbmva-scalar-vector",
      name: "Scalars and vectors",
      intuition:
        "Some quantities are fixed by one number and a unit: 10 kg, 5 seconds, 40 watt. Others need a direction too: 2 metres north-west, a force of 10 newton pulling upward. The first kind is a **scalar**, the second a **vector**. A vector is drawn as a directed line segment: its length is the magnitude and the arrow gives the direction.",
      definition:
        "- A **scalar** has magnitude only (a real number with a unit).\n" +
        "- A **vector** has magnitude and direction. It is written \\(\\overrightarrow{AB}\\) or \\(\\vec{a}\\), where A is the initial point and B the terminal point.\n" +
        "- The magnitude (length) of \\(\\overrightarrow{AB}\\) is written \\(|\\overrightarrow{AB}|\\). It is never negative.\n" +
        "- Speed is a scalar, velocity is a vector. Distance is a scalar, displacement is a vector.\n" +
        "- To represent a displacement graphically, mark N, S, E, W, draw the ray at the stated angle from the stated direction, choose a scale and put the arrowhead at the end.",
      table: {
        columns: ["Quantity", "Type", "Reason"],
        rows: [
          { cells: ["10 kg (mass)", "Scalar", "Magnitude only"], pyqExampleId: "f6c4beb2-9d76-45c8-ae35-70591f3a0063" },
          { cells: ["2 metres north-west", "Vector", "Magnitude and a direction"] },
          { cells: ["\\(40^\\circ\\) (an angle)", "Scalar", "An angle has no direction"] },
          { cells: ["40 watt (power)", "Scalar", "Magnitude only"] },
          { cells: ["\\(20\\ \\text{m/s}^2\\) (acceleration)", "Vector", "Rate of change of velocity, so it has a direction"] },
          { cells: ["Time period, distance, work done", "Scalar", "No direction can be given"] },
          { cells: ["Force, velocity", "Vector", "Need a direction to be complete"] },
          { cells: ["\\(10^{-19}\\) coulomb (charge)", "Scalar", "Magnitude only"] },
        ],
      },
      selfCheckExample: {
        prompt: "Represent graphically a displacement of 50 km, \\(45^\\circ\\) north of east.",
        steps: [
          "Take O as the origin and mark N, S, E, W in the usual way.",
          "Draw the ray OP making \\(45^\\circ\\) with OE, turned towards the north.",
          "Choose the scale 1 cm = 10 km and cut off OP = 5 cm.",
          "Put the arrowhead at P. Then \\(\\overrightarrow{OP}\\) is the required displacement.",
        ],
        answer: "\\(\\overrightarrow{OP}\\) of length 5 cm (50 km) at \\(45^\\circ\\) north of east",
      },
      practiceSet: [
        { prompt: "Classify as scalar or vector: 15 m/s due east.", answer: "Vector (velocity: a speed with a direction)" },
        { prompt: "Classify as scalar or vector: 300 joule of energy.", answer: "Scalar" },
        { prompt: "Classify as scalar or vector: 12 metres (a distance).", answer: "Scalar. A displacement of 12 metres towards a stated direction would be a vector." },
      ],
      pyqExampleId: "845294a6-9d93-492d-bd76-70357bcd15d8",
      traps: [
        {
          title: "Speed and velocity",
          body: "30 km/hr alone is a speed, a scalar. 20 m/s towards north names a direction, so it is a velocity, a vector. Look for a direction word before you decide.",
        },
        {
          title: "No arrowhead",
          body: "A displacement drawn without an arrowhead, or without the scale written, loses marks. The arrow shows the direction; the scale shows the magnitude.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cbmva-kinds",
      name: "Zero, unit, coinitial, collinear, equal and negative vectors",
      intuition:
        "The names describe how vectors relate to each other. Coinitial vectors start at the same point. Collinear vectors lie along parallel lines, pointing the same way or opposite ways. Equal vectors have the same length and the same direction, wherever they start. The negative of a vector has the same length and the opposite direction.",
      definition:
        "- **Zero vector** \\(\\vec{0}\\): initial and terminal points coincide; magnitude 0, no definite direction.\n" +
        "- **Unit vector**: magnitude 1. The unit vector along \\(\\vec{a}\\) is written \\(\\hat{a}\\).\n" +
        "- **Coinitial vectors**: same initial point.\n" +
        "- **Collinear vectors**: parallel to the same line, whatever their magnitudes and directions.\n" +
        "- **Equal vectors**: same magnitude and same direction, regardless of where they start.\n" +
        "- **Negative of a vector**: \\(\\overrightarrow{BA} = -\\overrightarrow{AB}\\); same magnitude, opposite direction.\n" +
        "- Vectors in this chapter are free vectors: moving one parallel to itself does not change it.",
      table: {
        columns: ["Type", "Test", "Example"],
        rows: [
          { cells: ["Zero vector", "Magnitude 0", "\\(\\overrightarrow{AA}\\)"] },
          { cells: ["Unit vector", "Magnitude 1", "\\(\\dfrac{1}{5}(3\\hat{i} + 4\\hat{j})\\)"] },
          { cells: ["Coinitial", "Same initial point", "\\(\\overrightarrow{OA}\\) and \\(\\overrightarrow{OB}\\)"] },
          {
            cells: ["Collinear", "One is a scalar multiple of the other", "\\(\\vec{a}\\) and \\(3\\vec{a}\\), or \\(\\vec{a}\\) and \\(-\\vec{a}\\)"],
            noteAmber: "Board 2026 (assertion-reason): a vector and a negative multiple of it are collinear (true), but the reason offered, a zero dot product, was false.",
          },
          { cells: ["Equal", "Same magnitude and same direction", "\\(\\overrightarrow{AB} = \\overrightarrow{DC}\\) in a parallelogram ABCD"] },
          { cells: ["Negative", "Same magnitude, opposite direction", "\\(\\overrightarrow{BA} = -\\overrightarrow{AB}\\)"] },
        ],
      },
      selfCheckExample: {
        prompt: "Let \\(\\vec{a} = 2\\hat{i} - \\hat{j}\\). Write \\(-\\vec{a}\\). Are \\(\\vec{a}\\) and \\(-\\vec{a}\\) equal? Are they collinear?",
        steps: [
          "\\(-\\vec{a} = -2\\hat{i} + \\hat{j}\\).",
          "Both have magnitude \\(\\sqrt{4 + 1} = \\sqrt{5}\\), but their directions are opposite, so they are not equal.",
          "\\(-\\vec{a} = (-1)\\vec{a}\\) is a scalar multiple of \\(\\vec{a}\\), so they are collinear.",
        ],
        answer: "Not equal; collinear",
      },
      practiceSet: [
        { prompt: "True or false: two collinear vectors always have the same magnitude.", answer: "False: \\(\\hat{i}\\) and \\(5\\hat{i}\\) are collinear with magnitudes 1 and 5" },
        { prompt: "True or false: \\(\\hat{j}\\) and \\(-\\hat{j}\\) are equal vectors.", answer: "False: same magnitude, opposite directions" },
        { prompt: "True or false: two vectors of magnitude 3 must be collinear.", answer: "False: \\(3\\hat{i}\\) and \\(3\\hat{k}\\) are perpendicular" },
      ],
      pyqExampleId: "c220b8a9-0096-430d-b1d7-e6c692688731",
      traps: [
        {
          title: "Collinear is not equal",
          body: "Collinear vectors may differ in length and may point opposite ways. Equal vectors need the same magnitude AND the same direction.",
        },
        {
          title: "A zero dot product is not collinearity",
          body: "A dot product of zero means two non-zero vectors are perpendicular. It can never be the reason two vectors are collinear. Collinear means one is a scalar multiple of the other.",
        },
        {
          title: "Assertion-reason codes in Maths",
          body: "CBSE's Maths papers use (A) both true and R explains A, (B) both true and R does not explain A, (C) A true and R false, (D) A false and R true. Decide A and R separately first, then ask whether R is the reason.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmva-collinear",
      name: "Collinear vectors and a vector of given length",
      intuition:
        "Two vectors are collinear exactly when one is a stretched (or reversed) copy of the other: \\(\\vec{b} = \\lambda\\vec{a}\\). In components that means the three ratios are equal. To get a vector of length \\(k\\) along \\(\\vec{a}\\), first shrink \\(\\vec{a}\\) to the unit vector \\(\\hat{a}\\), then multiply by \\(k\\). Opposite direction means multiply by \\(-k\\).",
      definition:
        "- \\(\\vec{a} = a_1\\hat{i} + a_2\\hat{j} + a_3\\hat{k}\\) and \\(\\vec{b} = b_1\\hat{i} + b_2\\hat{j} + b_3\\hat{k}\\) are collinear when \\(\\vec{b} = \\lambda\\vec{a}\\), that is \\(\\dfrac{b_1}{a_1} = \\dfrac{b_2}{a_2} = \\dfrac{b_3}{a_3} = \\lambda\\).\n" +
        "- Unit vector: \\(\\hat{a} = \\dfrac{\\vec{a}}{|\\vec{a}|}\\).\n" +
        "- Vector of magnitude \\(k\\) along \\(\\vec{a}\\): \\(k\\hat{a}\\). Opposite to \\(\\vec{a}\\): \\(-k\\hat{a}\\). Collinear with \\(\\vec{a}\\): \\(\\pm k\\hat{a}\\).\n" +
        "- **Three points** A, B, C are collinear when \\(\\overrightarrow{AB} = \\lambda\\overrightarrow{AC}\\).\n" +
        "- If \\(\\vec{a}\\), \\(\\vec{b}\\) are non-collinear, \\(p\\vec{a} + q\\vec{b}\\) and \\(r\\vec{a} + s\\vec{b}\\) are collinear when \\(\\dfrac{p}{r} = \\dfrac{q}{s}\\).",
      formula: {
        label: "Collinear vectors and a vector of length k",
        latex: "\\vec{b} = \\lambda\\vec{a}, \\qquad k\\hat{a} = \\dfrac{k\\,\\vec{a}}{|\\vec{a}|}",
        symbols: [
          { symbol: "\\(\\lambda\\)", meaning: "a scalar; negative when the two vectors point opposite ways" },
          { symbol: "\\(\\hat{a}\\)", meaning: "the unit vector along a" },
        ],
      },
      authoredExample: {
        prompt: "Find a vector of magnitude 18 units in the direction opposite to \\(\\overrightarrow{PQ}\\), where P is \\((2, 1, -3)\\) and Q is \\((3, -3, 5)\\).",
        steps: [
          "\\(\\overrightarrow{PQ} = (3 - 2)\\hat{i} + (-3 - 1)\\hat{j} + (5 + 3)\\hat{k} = \\hat{i} - 4\\hat{j} + 8\\hat{k}\\).",
          "\\(|\\overrightarrow{PQ}| = \\sqrt{1 + 16 + 64} = \\sqrt{81} = 9\\).",
          "The opposite direction is \\(\\overrightarrow{QP} = -\\hat{i} + 4\\hat{j} - 8\\hat{k}\\); its unit vector is \\(\\dfrac{1}{9}(-\\hat{i} + 4\\hat{j} - 8\\hat{k})\\).",
          "Required vector \\(= 18 \\times \\dfrac{1}{9}(-\\hat{i} + 4\\hat{j} - 8\\hat{k}) = -2\\hat{i} + 8\\hat{j} - 16\\hat{k}\\).",
        ],
        answer: "\\(-2\\hat{i} + 8\\hat{j} - 16\\hat{k}\\)",
      },
      selfCheckExample: {
        prompt: "Find \\(\\lambda\\) if the vectors \\(2\\hat{i} - 6\\hat{j} + \\lambda\\hat{k}\\) and \\(-3\\hat{i} + 9\\hat{j} + 6\\hat{k}\\) are collinear.",
        steps: [
          "Collinear vectors have proportional components: \\(\\dfrac{2}{-3} = \\dfrac{-6}{9} = \\dfrac{\\lambda}{6}\\).",
          "The first two ratios are both \\(-\\dfrac{2}{3}\\).",
          "\\(\\dfrac{\\lambda}{6} = -\\dfrac{2}{3}\\), so \\(\\lambda = -4\\).",
        ],
        answer: "\\(\\lambda = -4\\)",
      },
      practiceSet: [
        { prompt: "Find all vectors of magnitude 6 that are collinear with \\(2\\hat{i} - \\hat{j} + 2\\hat{k}\\).", answer: "\\(\\pm(4\\hat{i} - 2\\hat{j} + 4\\hat{k})\\)", method: "The given vector has magnitude 3." },
        { prompt: "\\(\\vec{a}\\) and \\(\\vec{b}\\) are non-collinear. Find \\(k\\) if \\((k + 1)\\vec{a} + 2\\vec{b}\\) and \\((2k - 1)\\vec{a} - 4\\vec{b}\\) are collinear.", answer: "\\(k = -\\dfrac{1}{4}\\)", method: "\\(\\dfrac{k + 1}{2k - 1} = \\dfrac{2}{-4}\\)" },
        { prompt: "Find the unit vector along \\(12\\hat{i} - 5\\hat{j}\\).", answer: "\\(\\dfrac{1}{13}(12\\hat{i} - 5\\hat{j})\\)" },
      ],
      pyqExampleId: "c60ae518-4e80-4b18-b9e9-1324ea538cf3",
      traps: [
        {
          title: "Scaling the wrong vector",
          body: "A vector opposite to \\(\\overrightarrow{AB}\\) runs along \\(\\overrightarrow{BA}\\). Scaling \\(\\overrightarrow{AB}\\) itself gives a vector in the same direction and loses the answer mark.",
        },
        {
          title: "Dropping the minus answer",
          body: "\"Collinear with\" allows both senses, so the answer is \\(\\pm k\\hat{a}\\). \"In the direction of\" allows only \\(+k\\hat{a}\\).",
        },
        {
          title: "Checking one ratio only",
          body: "For collinear vectors all three ratios must be equal. Find \\(\\lambda\\) from two known components, then use it for the unknown one.",
        },
      ],
    },
  ],
};
