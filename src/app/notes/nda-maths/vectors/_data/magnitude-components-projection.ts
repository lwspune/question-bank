import type { SubtopicNote } from "@/app/notes/_types";

export const MAGNITUDE_COMPONENTS_PROJECTION_NOTE: SubtopicNote = {
  subtopicName: "Magnitude, Components, Projection, and Direction Cosines",
  title: "Magnitude, Components, Projection, Direction Cosines",
  oneLineDefinition:
    "How to measure a vector's length, decompose it along axes, project it onto another vector, and read off the angles it makes with the coordinate axes.",
  whyItMatters:
    "This is where you learn to MEASURE vectors. How long is one (its magnitude)? At what angles to the coordinate axes does it point (its direction cosines)? " +
    "How much of one vector lies along another (its scalar projection)? And how do you build a unit vector pointing exactly where you want it? " +
    "Each of these turns the geometric arrow from the foundations into a number you can compute with. " +
    "11 PYQs across 2018–2024, almost entirely EASY or MODERATE — the formulas are short and the trap surface is narrow, so it's also the lowest-hanging-fruit subtopic in the chapter.",
  concepts: [
    // 1 ───────────────────────────────────────────────────────────────────────
    {
      kind: "formula" as const,
      slug: "magnitude-and-distance",
      name: "Magnitude of a vector and distance between two points",
      visualizationSlug: "magnitude-right-triangle",
      intuition:
        "The magnitude of a vector is its length — extended Pythagoras applied to its components. The distance between two points is the magnitude of the displacement vector joining them, which is also why \\(\\overrightarrow{AB}=\\vec{b}-\\vec{a}\\): subtract the tail's position vector from the head's.",
      definition:
        "If \\(\\vec{v} = v_1\\hat{i} + v_2\\hat{j} + v_3\\hat{k}\\), then \\(|\\vec{v}| = \\sqrt{v_1^2 + v_2^2 + v_3^2}\\). " +
        "For two points \\(A, B\\) with position vectors \\(\\vec{a}, \\vec{b}\\): " +
        "\\(\\overrightarrow{AB} = \\vec{b} - \\vec{a}\\) and \\(AB = |\\vec{b} - \\vec{a}|\\).",
      formula: {
        label: "Magnitude and distance",
        latex:
          "|\\vec{v}| = \\sqrt{v_1^2 + v_2^2 + v_3^2} \\qquad AB = |\\vec{b} - \\vec{a}|",
        symbols: [
          { symbol: "\\(v_1, v_2, v_3\\)", meaning: "components of \\(\\vec{v}\\) along \\(\\hat{i}, \\hat{j}, \\hat{k}\\)" },
          { symbol: "\\(\\vec{a}, \\vec{b}\\)", meaning: "position vectors of the endpoints" },
        ],
      },
      authoredExample: {
        prompt:
          "Position vectors of points \\(A\\) and \\(B\\) are \\(\\vec{a} = 3\\hat{i} - 2\\hat{j} + \\hat{k}\\) and \\(\\vec{b} = 2\\hat{i} + 4\\hat{j} - 3\\hat{k}\\). Find the length \\(AB\\).",
        steps: [
          "Subtract position vectors: \\(\\overrightarrow{AB} = \\vec{b} - \\vec{a} = (2-3)\\hat{i} + (4-(-2))\\hat{j} + (-3-1)\\hat{k} = -\\hat{i} + 6\\hat{j} - 4\\hat{k}\\).",
          "Square each component: \\((-1)^2 + 6^2 + (-4)^2 = 1 + 36 + 16 = 53\\).",
          "Take the square root: \\(AB = \\sqrt{53}\\).",
        ],
        answer: "\\(AB = \\sqrt{53}\\) units",
      },
      selfCheckExample: {
        prompt: "Find the magnitude of \\(\\vec{v} = 2\\hat{i} - 3\\hat{j} + 6\\hat{k}\\).",
        steps: [
          "Square each component: \\(2^2 + (-3)^2 + 6^2 = 4 + 9 + 36 = 49\\).",
          "\\(|\\vec{v}| = \\sqrt{49} = 7\\).",
        ],
        answer: "\\(|\\vec{v}| = 7\\)",
      },
      practiceSet: [
        { prompt: "\\(|\\vec{v}|\\) for \\(\\vec{v} = 3\\hat{i} + 4\\hat{j}\\)?", answer: "\\(5\\)" },
        { prompt: "\\(|\\vec{v}|\\) for \\(\\vec{v} = \\hat{i} + 2\\hat{j} + 2\\hat{k}\\)?", answer: "\\(3\\)" },
        { prompt: "Distance \\(AB\\) for \\(A(0,0,0)\\), \\(B(1,2,2)\\)?", answer: "\\(3\\)" },
        { prompt: "\\(|\\vec{v}|\\) for \\(\\vec{v} = 6\\hat{i} + 8\\hat{j}\\)?", answer: "\\(10\\)" },
      ],
      pyqExampleId: "8b636e01-9ae1-42a2-8eb6-fbf5b24e7a53",
      traps: [
        {
          title: "\\(\\overrightarrow{AB}\\) is \\(\\vec{b} - \\vec{a}\\) — head minus tail",
          body:
            "Reverse the subtraction and you get \\(\\overrightarrow{BA}\\) — the magnitude is the same but the displacement points the other way. " +
            "Direction matters whenever the result feeds into a dot product or angle.",
        },
        {
          title: "Lagrange identity gives you the missing magnitude",
          body:
            "Whenever a question gives \\(|\\vec{a}\\times\\vec{b}|^2 + (\\vec{a}\\cdot\\vec{b})^2 = k\\) together with one magnitude, " +
            "use the identity \\(|\\vec{a}|^2|\\vec{b}|^2 = |\\vec{a}\\times\\vec{b}|^2 + (\\vec{a}\\cdot\\vec{b})^2\\) to read the other magnitude off directly. " +
            "(The same identity is the central formula of \\(\\vec{a}\\times\\vec{b}\\) magnitude work — see the cross-product note.)",
        },
      ],
    },

    // 2 ───────────────────────────────────────────────────────────────────────
    {
      kind: "formula" as const,
      slug: "direction-cosines",
      name: "Direction Cosines",
      visualizationSlug: "direction-cosines",
      intuition:
        "If a vector makes angles \\(\\alpha, \\beta, \\gamma\\) with the positive \\(x, y, z\\) axes, its direction cosines are \\(\\cos\\alpha, \\cos\\beta, \\cos\\gamma\\) — exactly the components of the unit vector along \\(\\vec{v}\\). " +
        "Their squares sum to 1 (Pythagoras on the unit sphere). " +
        "From this, the sum of the sines squared is forced to be 2 — the most-tested sister identity.",
      definition:
        "For \\(\\vec{v} = v_1\\hat{i} + v_2\\hat{j} + v_3\\hat{k}\\) of magnitude \\(|\\vec{v}|\\), the direction cosines are " +
        "\\(l = \\cos\\alpha = \\dfrac{v_1}{|\\vec{v}|}, \\; m = \\cos\\beta = \\dfrac{v_2}{|\\vec{v}|}, \\; n = \\cos\\gamma = \\dfrac{v_3}{|\\vec{v}|}\\). " +
        "They satisfy \\(l^2 + m^2 + n^2 = 1\\), and consequently \\(\\sin^2\\alpha + \\sin^2\\beta + \\sin^2\\gamma = 2\\).",
      formula: {
        label: "Direction-cosine identities",
        latex:
          "\\cos^2\\alpha + \\cos^2\\beta + \\cos^2\\gamma = 1 \\qquad \\sin^2\\alpha + \\sin^2\\beta + \\sin^2\\gamma = 2",
        symbols: [
          { symbol: "\\(\\alpha, \\beta, \\gamma\\)", meaning: "angles between \\(\\vec{v}\\) and the positive \\(x, y, z\\) axes" },
          { symbol: "\\(l, m, n\\)", meaning: "direction cosines (the unit vector's components)" },
        ],
      },
      authoredExample: {
        prompt:
          "A vector \\(\\vec{a} = 4\\hat{i} - 8\\hat{j} + \\hat{k}\\) makes angles \\(\\alpha, \\beta, \\gamma\\) with the positive axes. Find \\(\\cos\\alpha\\) and verify the identity \\(\\cos^2\\alpha + \\cos^2\\beta + \\cos^2\\gamma = 1\\).",
        steps: [
          "Magnitude: \\(|\\vec{a}| = \\sqrt{16 + 64 + 1} = \\sqrt{81} = 9\\).",
          "Direction cosines: \\(\\cos\\alpha = \\tfrac{4}{9}\\), \\(\\cos\\beta = -\\tfrac{8}{9}\\), \\(\\cos\\gamma = \\tfrac{1}{9}\\).",
          "Sum of squares: \\(\\dfrac{16}{81} + \\dfrac{64}{81} + \\dfrac{1}{81} = \\dfrac{81}{81} = 1\\). \\(\\checkmark\\)",
        ],
        answer: "\\(\\cos\\alpha = \\dfrac{4}{9}\\); identity holds.",
      },
      selfCheckExample: {
        prompt:
          "A vector makes \\(60^\\circ\\) with the \\(x\\)-axis and \\(60^\\circ\\) with the \\(y\\)-axis. Find \\(\\cos\\gamma\\), where \\(\\gamma\\) is the angle with the \\(z\\)-axis.",
        steps: [
          "Use \\(\\cos^2\\alpha + \\cos^2\\beta + \\cos^2\\gamma = 1\\): \\(\\tfrac{1}{4} + \\tfrac{1}{4} + \\cos^2\\gamma = 1\\).",
          "So \\(\\cos^2\\gamma = \\tfrac{1}{2}\\), giving \\(\\cos\\gamma = \\tfrac{1}{\\sqrt{2}}\\) (i.e. \\(\\gamma = 45^\\circ\\) or \\(135^\\circ\\)).",
        ],
        answer: "\\(\\cos\\gamma = \\dfrac{1}{\\sqrt{2}}\\)",
      },
      practiceSet: [
        { prompt: "\\(\\cos\\alpha\\) for \\(\\vec{a} = \\hat{i} + 2\\hat{j} + 2\\hat{k}\\)?", answer: "\\(\\tfrac{1}{3}\\)", method: "\\(v_1/|\\vec{a}|\\)" },
        { prompt: "What does \\(l^2 + m^2 + n^2\\) equal?", answer: "\\(1\\)" },
        { prompt: "If \\(l = \\tfrac{1}{3}\\), \\(m = \\tfrac{2}{3}\\), find \\(n\\) (positive).", answer: "\\(\\tfrac{2}{3}\\)", method: "\\(l^2 + m^2 + n^2 = 1\\)" },
        { prompt: "\\(\\sin^2\\alpha + \\sin^2\\beta + \\sin^2\\gamma = ?\\)", answer: "\\(2\\)" },
      ],
      pyqExampleId: "a9ea0282-913e-41b1-ba3a-9bc58a0add3c",
      traps: [
        {
          title: "Factor-of-2 trap: \\(\\sin^2\\alpha + \\sin^2\\beta + \\sin^2\\gamma = 2\\), not 1",
          body:
            "From \\(\\sum\\cos^2 = 1\\) and \\(\\sin^2 = 1 - \\cos^2\\), summing three times: " +
            "\\(\\sum\\sin^2 = 3 - \\sum\\cos^2 = 3 - 1 = 2\\). " +
            "The distractor \\(= 1\\) (copying the cosine identity) is the single most common wrong answer in this concept.",
        },
        {
          title: "Direction cosines can be negative",
          body:
            "An obtuse angle with an axis gives a negative cosine — totally fine. " +
            "Some students try to force \\(l, m, n \\geq 0\\); don't. The identity \\(l^2 + m^2 + n^2 = 1\\) holds with signs.",
        },
      ],
    },

    // 3 ───────────────────────────────────────────────────────────────────────
    {
      kind: "formula" as const,
      slug: "scalar-projection",
      name: "Scalar projection of one vector on another",
      intuition:
        "The scalar projection of \\(\\vec{a}\\) on \\(\\vec{b}\\) measures how far \\(\\vec{a}\\) reaches in the direction of \\(\\vec{b}\\) — drop a perpendicular from the tip of \\(\\vec{a}\\) onto the line through \\(\\vec{b}\\), and the signed length from the foot back to the origin is the projection. " +
        "Algebraically it's just \\((\\vec{a}\\cdot\\vec{b})/|\\vec{b}|\\): the dot product divided by the length you're projecting onto.",
      definition:
        "The scalar projection of \\(\\vec{a}\\) on \\(\\vec{b}\\) is \\(\\text{proj}_{\\vec{b}}\\vec{a} = \\dfrac{\\vec{a}\\cdot\\vec{b}}{|\\vec{b}|}\\). " +
        "It is a signed scalar (positive when the projection lands in the direction of \\(\\vec{b}\\), negative when opposite). " +
        "The corresponding vector projection — projecting and keeping a vector — is " +
        "\\(\\dfrac{\\vec{a}\\cdot\\vec{b}}{|\\vec{b}|^2}\\vec{b}\\).",
      formula: {
        label: "Scalar and vector projection",
        latex:
          "\\text{proj}_{\\vec{b}}\\vec{a} = \\dfrac{\\vec{a}\\cdot\\vec{b}}{|\\vec{b}|} \\qquad \\overrightarrow{\\text{proj}_{\\vec{b}}\\vec{a}} = \\dfrac{\\vec{a}\\cdot\\vec{b}}{|\\vec{b}|^2}\\,\\vec{b}",
        symbols: [
          { symbol: "\\(\\vec{a}\\)", meaning: "vector being projected" },
          { symbol: "\\(\\vec{b}\\)", meaning: "vector providing the direction" },
          { symbol: "\\(|\\vec{b}|\\)", meaning: "magnitude of \\(\\vec{b}\\) (NOT \\(|\\vec{b}|^2\\) for scalar version)" },
        ],
      },
      authoredExample: {
        prompt:
          "Find the length of the projection of \\(\\hat{i} + 2\\hat{j} + 3\\hat{k}\\) on \\(2\\hat{i} + 3\\hat{j} - 2\\hat{k}\\).",
        steps: [
          "Dot product: \\(1\\cdot 2 + 2\\cdot 3 + 3\\cdot(-2) = 2 + 6 - 6 = 2\\).",
          "Magnitude of the direction vector: \\(|\\vec{b}| = \\sqrt{4 + 9 + 4} = \\sqrt{17}\\).",
          "Projection length: \\(\\dfrac{\\vec{a}\\cdot\\vec{b}}{|\\vec{b}|} = \\dfrac{2}{\\sqrt{17}}\\).",
        ],
        answer: "\\(\\dfrac{2}{\\sqrt{17}}\\)",
      },
      selfCheckExample: {
        prompt:
          "Find the scalar projection of \\(\\vec{a} = \\hat{i} + \\hat{j} + \\hat{k}\\) on \\(\\vec{b} = 2\\hat{i} + 2\\hat{j} + \\hat{k}\\).",
        steps: [
          "Dot product: \\(1\\cdot 2 + 1\\cdot 2 + 1\\cdot 1 = 5\\).",
          "\\(|\\vec{b}| = \\sqrt{4 + 4 + 1} = 3\\).",
          "Projection: \\(\\dfrac{5}{3}\\).",
        ],
        answer: "\\(\\dfrac{5}{3}\\)",
      },
      practiceSet: [
        { prompt: "Scalar projection of \\(\\vec{a}\\) on \\(\\vec{b}\\) — formula?", answer: "\\(\\tfrac{\\vec{a}\\cdot\\vec{b}}{|\\vec{b}|}\\)" },
        { prompt: "\\(\\vec{a}\\cdot\\vec{b} = 6\\), \\(|\\vec{b}| = 3\\). Scalar projection?", answer: "\\(2\\)" },
        { prompt: "Projection of \\(\\vec{a} = 2\\hat{i} + \\hat{j}\\) on \\(\\vec{b} = \\hat{i}\\)?", answer: "\\(2\\)", method: "\\((\\vec{a}\\cdot\\vec{b})/|\\vec{b}| = 2/1\\)" },
        { prompt: "If the scalar projection is negative, the angle is?", answer: "obtuse" },
      ],
      pyqExampleId: "3a42bc1e-6815-4bed-9c20-a8317c806cee",
      traps: [
        {
          title: "Divide by \\(|\\vec{b}|\\), not \\(|\\vec{b}|^2\\), for the scalar projection",
          body:
            "Vector projection has \\(|\\vec{b}|^2\\) in the denominator because it carries the direction \\(\\vec{b}\\) back into the answer; scalar projection drops the direction and divides only once. Mixing the two is a frequent factor-of-\\(|\\vec{b}|\\) bug.",
        },
        {
          title: "Sign of the scalar projection encodes obtuse/acute",
          body:
            "If the projection comes out negative, the angle between \\(\\vec{a}\\) and \\(\\vec{b}\\) is obtuse. " +
            "Don't reach for absolute value automatically — the sign is the information.",
        },
      ],
    },

    // 4 ───────────────────────────────────────────────────────────────────────
    {
      kind: "formula" as const,
      slug: "unit-vector-and-direction-construction",
      name: "Unit vectors and direction-given construction",
      intuition:
        "To strip a vector of its length and keep only its direction, divide by its magnitude — the result is a unit vector. To go the other way, multiply a unit vector by the desired magnitude. " +
        "When a question describes a vector by its angles with axes, use the cosines of those angles as the components of its unit form, then scale.",
      definition:
        "For any non-zero \\(\\vec{v}\\), the unit vector along \\(\\vec{v}\\) is \\(\\hat{v} = \\dfrac{\\vec{v}}{|\\vec{v}|}\\). " +
        "A vector of magnitude \\(r\\) making angles \\(\\alpha, \\beta, \\gamma\\) with the positive axes is " +
        "\\(\\vec{v} = r(\\cos\\alpha\\,\\hat{i} + \\cos\\beta\\,\\hat{j} + \\cos\\gamma\\,\\hat{k})\\). " +
        "Special 2-D case: a unit vector in the \\(xy\\)-plane at angle \\(\\theta\\) to the \\(x\\)-axis is \\(\\cos\\theta\\,\\hat{i} + \\sin\\theta\\,\\hat{j}\\).",
      formula: {
        label: "Unit vector and direction construction",
        latex:
          "\\hat{v} = \\dfrac{\\vec{v}}{|\\vec{v}|} \\qquad \\vec{v} = r(\\cos\\alpha\\,\\hat{i} + \\cos\\beta\\,\\hat{j} + \\cos\\gamma\\,\\hat{k})",
        symbols: [
          { symbol: "\\(\\hat{v}\\)", meaning: "unit vector along \\(\\vec{v}\\)" },
          { symbol: "\\(r\\)", meaning: "desired magnitude of the constructed vector" },
          { symbol: "\\(\\alpha, \\beta, \\gamma\\)", meaning: "angles with the positive coordinate axes" },
        ],
      },
      authoredExample: {
        prompt:
          "A vector \\(\\vec{r} = a\\hat{i} + b\\hat{j}\\) is equally inclined to both \\(x\\) and \\(y\\) axes. If its magnitude is 2 units, find the values of \\(a\\) and \\(b\\).",
        steps: [
          "Equally inclined to \\(x\\) and \\(y\\) axes means \\(\\cos\\alpha = \\cos\\beta\\), i.e. \\(|a| = |b|\\). Take both positive: \\(a = b\\).",
          "Apply the magnitude condition: \\(|\\vec{r}| = \\sqrt{a^2 + b^2} = 2\\), so \\(\\sqrt{2a^2} = 2\\).",
          "Square: \\(2a^2 = 4 \\Rightarrow a^2 = 2 \\Rightarrow a = \\sqrt{2}\\). Hence \\(a = b = \\sqrt{2}\\).",
        ],
        answer: "\\(a = b = \\sqrt{2}\\)",
      },
      selfCheckExample: {
        prompt: "Find the unit vector along \\(\\vec{v} = 3\\hat{i} - 4\\hat{j}\\).",
        steps: [
          "Magnitude: \\(|\\vec{v}| = \\sqrt{9 + 16} = 5\\).",
          "Unit vector: \\(\\hat{v} = \\dfrac{\\vec{v}}{|\\vec{v}|} = \\dfrac{3\\hat{i} - 4\\hat{j}}{5}\\).",
        ],
        answer: "\\(\\hat{v} = \\dfrac{1}{5}(3\\hat{i} - 4\\hat{j})\\)",
      },
      practiceSet: [
        { prompt: "Unit vector along \\(\\vec{v} = \\hat{i} + \\hat{j} + \\hat{k}\\)?", answer: "\\(\\tfrac{1}{\\sqrt{3}}(\\hat{i} + \\hat{j} + \\hat{k})\\)" },
        { prompt: "Vector of magnitude \\(10\\) along \\(3\\hat{i} + 4\\hat{j}\\)?", answer: "\\(6\\hat{i} + 8\\hat{j}\\)", method: "\\(10\\,\\hat{v}\\), since \\(|\\vec{v}| = 5\\)" },
        { prompt: "Unit vector in the \\(xy\\)-plane at angle \\(\\theta\\) to the \\(x\\)-axis?", answer: "\\(\\cos\\theta\\,\\hat{i} + \\sin\\theta\\,\\hat{j}\\)" },
        { prompt: "Unit vector along \\(5\\hat{i}\\)?", answer: "\\(\\hat{i}\\)" },
      ],
      pyqExampleId: "ecbcd264-d509-4acd-9a45-99e5e7986700",
      traps: [
        {
          title: "Check that the given angles are consistent with \\(\\sum\\cos^2 = 1\\)",
          body:
            "A vector cannot make \\(\\alpha = 60^\\circ\\) and \\(\\beta = 45^\\circ\\) with the \\(x\\) and \\(y\\) axes AND have \\(\\gamma\\) acute unless the third cosine fits. " +
            "From \\(\\cos^2\\alpha + \\cos^2\\beta + \\cos^2\\gamma = 1\\): \\(\\cos^2\\gamma = 1 - \\tfrac{1}{4} - \\tfrac{1}{2} = \\tfrac{1}{4}\\), so \\(\\gamma = 60^\\circ\\) (acute) or \\(120^\\circ\\).",
        },
        {
          title: "Equally inclined to two axes only fixes one component pair",
          body:
            "\\\"Vector inclined equally to \\(x\\) and \\(y\\) axes\\\" means \\(a_1 = a_2\\), which combined with the magnitude pins down both. " +
            "Don't read it as \\(a_1 = a_2 = a_3\\) — that's three axes, a different constraint.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Dot product and angle",
      href: "/notes/nda-maths/vectors/dot-product-angle",
    },
    {
      label: "Cross product and triple product",
      href: "/notes/nda-maths/vectors/cross-product-triple-product",
    },
  ],
};
