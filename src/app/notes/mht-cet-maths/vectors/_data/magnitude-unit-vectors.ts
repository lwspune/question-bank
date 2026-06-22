import type { SubtopicNote } from "@/app/notes/_types";

export const MAGNITUDE_UNIT_VECTORS_NOTE: SubtopicNote = {
  subtopicName: "Magnitude, Components, and Unit Vectors",
  title: "Magnitude, Components, and Unit Vectors",
  oneLineDefinition:
    "How to write a vector in î ĵ k̂ component form, measure its length, build a unit vector pointing in any direction, and — the MHT-CET workhorse — find the magnitude of a sum of vectors from given angles or perpendicularity conditions.",
  whyItMatters:
    "This is the on-ramp to the whole Vectors chapter: every later technique (dot product, cross product, scalar triple product) starts by writing vectors in component form and reading off a magnitude. " +
    "Across the 9 PYQs here, ONE shape dominates — finding the length of a combination like a + b + c by expanding |a + b + c|² = Σ|·|² + 2Σ(a·b) and using the angle or perpendicularity data to evaluate the dot-product cross terms. " +
    "Master that single identity (plus the unit-vector-along-a-diagonal construction) and you have the entire subtopic; the difficulty mix is MODERATE-to-HARD, but it's the same expansion every time.",
  concepts: [
    // ── FOUNDATION 1 ─────────────────────────────────────────────────────────
    {
      kind: "formula" as const,
      slug: "cetvec-mag-component-form",
      name: "Vectors and component form",
      visualizationSlug: "component-form-basis",
      intuition:
        "Every vector in 3-D space can be built from three standard perpendicular unit vectors \\(\\hat{i}, \\hat{j}, \\hat{k}\\) (pointing along the \\(x, y, z\\) axes). Writing a vector as \\(a_1\\hat{i} + a_2\\hat{j} + a_3\\hat{k}\\) is just saying \"go \\(a_1\\) steps along \\(x\\), \\(a_2\\) along \\(y\\), \\(a_3\\) along \\(z\\).\"",
      definition:
        "A vector \\(\\vec{a}\\) is written in **component form** as \\(\\vec{a} = a_1\\hat{i} + a_2\\hat{j} + a_3\\hat{k}\\), where:\n" +
        "- \\(a_1, a_2, a_3\\) are its **components** (also called scalar components) along the axes,\n" +
        "- \\(\\hat{i}, \\hat{j}, \\hat{k}\\) are the **standard basis** — mutually perpendicular unit vectors of length 1.\n\n" +
        "A **null (zero) vector** \\(\\vec{0}\\) has all components zero and no direction; a **unit vector** has magnitude 1; **collinear (parallel)** vectors are scalar multiples of each other.",
      formula: {
        label: "Component form",
        latex: "\\vec{a} = a_1\\hat{i} + a_2\\hat{j} + a_3\\hat{k}",
        symbols: [
          { symbol: "\\(a_1, a_2, a_3\\)", meaning: "components along \\(\\hat{i}, \\hat{j}, \\hat{k}\\)" },
          { symbol: "\\(\\hat{i}, \\hat{j}, \\hat{k}\\)", meaning: "standard perpendicular unit vectors" },
        ],
      },
      authoredExample: {
        prompt:
          "Write the vector from the origin to the point \\(P(-1, 5, 2)\\) in component form, and state its components.",
        steps: [
          "The position vector of \\(P\\) goes \\(-1\\) along \\(x\\), \\(5\\) along \\(y\\), \\(2\\) along \\(z\\).",
          "In component form: \\(\\overrightarrow{OP} = -\\hat{i} + 5\\hat{j} + 2\\hat{k}\\).",
          "Components: \\(a_1 = -1\\), \\(a_2 = 5\\), \\(a_3 = 2\\).",
        ],
        answer: "\\(\\overrightarrow{OP} = -\\hat{i} + 5\\hat{j} + 2\\hat{k}\\)",
      },
      practiceSet: [
        { prompt: "Component form of the vector to \\(P(3, 0, -4)\\)?", answer: "\\(3\\hat{i} - 4\\hat{k}\\)" },
        { prompt: "What is the magnitude of each of \\(\\hat{i}, \\hat{j}, \\hat{k}\\)?", answer: "\\(1\\)" },
        { prompt: "Are \\(2\\hat{i} + 4\\hat{j}\\) and \\(\\hat{i} + 2\\hat{j}\\) parallel?", answer: "Yes", method: "one is \\(2\\times\\) the other" },
        { prompt: "Components of \\(\\hat{j} - \\hat{k}\\)?", answer: "\\(0, 1, -1\\)" },
      ],
      traps: [
        {
          title: "A missing axis means a zero component, not a 2-D vector",
          body:
            "\\(3\\hat{i} - 4\\hat{k}\\) lives in 3-D with \\(a_2 = 0\\). When you square components for a magnitude, the missing term contributes \\(0^2 = 0\\) — don't drop the slot or miscount the axes.",
        },
      ],
    },

    // ── FOUNDATION 2 ─────────────────────────────────────────────────────────
    {
      kind: "formula" as const,
      slug: "cetvec-mag-magnitude-distance",
      name: "Magnitude of a vector and distance between two points",
      visualizationSlug: "magnitude-right-triangle",
      intuition:
        "The magnitude of a vector is its length — extended Pythagoras on its components. The displacement from \\(A\\) to \\(B\\) is \\(\\overrightarrow{AB} = \\vec{b} - \\vec{a}\\) (head minus tail), and the distance \\(AB\\) is the magnitude of that displacement.",
      definition:
        "For \\(\\vec{a} = a_1\\hat{i} + a_2\\hat{j} + a_3\\hat{k}\\), the **magnitude** is \\(|\\vec{a}| = \\sqrt{a_1^2 + a_2^2 + a_3^2}\\). " +
        "For points \\(A, B\\) with position vectors \\(\\vec{a}, \\vec{b}\\): the **displacement** is \\(\\overrightarrow{AB} = \\vec{b} - \\vec{a}\\) and the **distance** is \\(AB = |\\vec{b} - \\vec{a}|\\).",
      formula: {
        label: "Magnitude and distance",
        latex: "|\\vec{a}| = \\sqrt{a_1^2 + a_2^2 + a_3^2} \\qquad AB = |\\vec{b} - \\vec{a}|",
        symbols: [
          { symbol: "\\(a_1, a_2, a_3\\)", meaning: "components of \\(\\vec{a}\\)" },
          { symbol: "\\(\\vec{a}, \\vec{b}\\)", meaning: "position vectors of \\(A\\) and \\(B\\)" },
        ],
      },
      authoredExample: {
        prompt:
          "Points \\(A\\) and \\(B\\) have position vectors \\(\\vec{a} = \\hat{i} + 2\\hat{j} + 2\\hat{k}\\) and \\(\\vec{b} = 5\\hat{i} + 5\\hat{j} + 14\\hat{k}\\). Find the distance \\(AB\\).",
        steps: [
          "Displacement: \\(\\overrightarrow{AB} = \\vec{b} - \\vec{a} = 4\\hat{i} + 3\\hat{j} + 12\\hat{k}\\).",
          "Square the components: \\(4^2 + 3^2 + 12^2 = 16 + 9 + 144 = 169\\).",
          "Distance: \\(AB = \\sqrt{169} = 13\\).",
        ],
        answer: "\\(AB = 13\\) units",
      },
      selfCheckExample: {
        prompt: "Find the magnitude of \\(\\vec{v} = 6\\hat{i} - 2\\hat{j} + 3\\hat{k}\\).",
        steps: [
          "Square each component: \\(6^2 + (-2)^2 + 3^2 = 36 + 4 + 9 = 49\\).",
          "\\(|\\vec{v}| = \\sqrt{49} = 7\\).",
        ],
        answer: "\\(|\\vec{v}| = 7\\)",
      },
      practiceSet: [
        { prompt: "\\(|\\vec{v}|\\) for \\(\\vec{v} = 3\\hat{i} + 4\\hat{j}\\)?", answer: "\\(5\\)" },
        { prompt: "\\(|\\vec{v}|\\) for \\(\\vec{v} = \\hat{i} - 2\\hat{j} + 2\\hat{k}\\)?", answer: "\\(3\\)" },
        { prompt: "Distance \\(AB\\) for \\(A(0,0,0)\\), \\(B(2,3,6)\\)?", answer: "\\(7\\)" },
        { prompt: "\\(|\\vec{v}|\\) for \\(\\vec{v} = 5\\hat{i} + 12\\hat{j}\\)?", answer: "\\(13\\)" },
      ],
      traps: [
        {
          title: "\\(\\overrightarrow{AB} = \\vec{b} - \\vec{a}\\) — head minus tail",
          body:
            "Reversing it gives \\(\\overrightarrow{BA}\\). The distance (magnitude) is the same either way, but the direction flips — and direction matters the moment the result feeds a dot product or an angle.",
        },
        {
          title: "Magnitude needs every component squared",
          body:
            "For \\(3\\hat{i} + 4\\hat{j}\\), the answer is \\(\\sqrt{9 + 16} = 5\\), not \\(3 + 4 = 7\\). Add the SQUARES, then take ONE square root at the end.",
        },
      ],
    },

    // ── FOUNDATION 3 ─────────────────────────────────────────────────────────
    {
      kind: "formula" as const,
      slug: "cetvec-mag-unit-vector",
      name: "Unit vector along a given direction",
      visualizationSlug: "scalar-multiply",
      intuition:
        "To keep a vector's direction but throw away its length, divide it by its own magnitude — the result is a unit vector (length 1). To go the other way, multiply a unit vector by whatever magnitude you want.",
      definition:
        "For any non-zero \\(\\vec{a}\\), the **unit vector** along it is \\(\\hat{a} = \\dfrac{\\vec{a}}{|\\vec{a}|}\\). " +
        "A vector of magnitude \\(r\\) in the same direction as \\(\\vec{a}\\) is \\(r\\,\\hat{a} = \\dfrac{r}{|\\vec{a}|}\\,\\vec{a}\\). " +
        "Every unit vector's components square-sum to 1.",
      formula: {
        label: "Unit vector",
        latex: "\\hat{a} = \\dfrac{\\vec{a}}{|\\vec{a}|} \\qquad r\\,\\hat{a} = \\dfrac{r}{|\\vec{a}|}\\,\\vec{a}",
        symbols: [
          { symbol: "\\(\\hat{a}\\)", meaning: "unit vector along \\(\\vec{a}\\)" },
          { symbol: "\\(|\\vec{a}|\\)", meaning: "magnitude of \\(\\vec{a}\\)" },
          { symbol: "\\(r\\)", meaning: "desired magnitude of the scaled vector" },
        ],
      },
      authoredExample: {
        prompt:
          "Find a vector of magnitude 10 in the direction of \\(\\vec{a} = 4\\hat{i} - 3\\hat{j}\\).",
        steps: [
          "Magnitude: \\(|\\vec{a}| = \\sqrt{4^2 + (-3)^2} = \\sqrt{25} = 5\\).",
          "Unit vector: \\(\\hat{a} = \\dfrac{1}{5}(4\\hat{i} - 3\\hat{j})\\).",
          "Scale to magnitude 10: \\(10\\,\\hat{a} = 2(4\\hat{i} - 3\\hat{j}) = 8\\hat{i} - 6\\hat{j}\\).",
        ],
        answer: "\\(8\\hat{i} - 6\\hat{j}\\)",
      },
      selfCheckExample: {
        prompt: "Find the unit vector along \\(\\vec{v} = 2\\hat{i} - \\hat{j} + 2\\hat{k}\\).",
        steps: [
          "Magnitude: \\(|\\vec{v}| = \\sqrt{4 + 1 + 4} = 3\\).",
          "Unit vector: \\(\\hat{v} = \\dfrac{1}{3}(2\\hat{i} - \\hat{j} + 2\\hat{k})\\).",
        ],
        answer: "\\(\\hat{v} = \\dfrac{1}{3}(2\\hat{i} - \\hat{j} + 2\\hat{k})\\)",
      },
      practiceSet: [
        { prompt: "Unit vector along \\(\\vec{v} = \\hat{i} + \\hat{j} + \\hat{k}\\)?", answer: "\\(\\tfrac{1}{\\sqrt{3}}(\\hat{i} + \\hat{j} + \\hat{k})\\)" },
        { prompt: "Vector of magnitude \\(15\\) along \\(3\\hat{i} + 4\\hat{j}\\)?", answer: "\\(9\\hat{i} + 12\\hat{j}\\)", method: "\\(15\\,\\hat{v}\\), since \\(|\\vec{v}| = 5\\)" },
        { prompt: "Unit vector along \\(6\\hat{k}\\)?", answer: "\\(\\hat{k}\\)" },
        { prompt: "What does the sum of squares of a unit vector's components equal?", answer: "\\(1\\)" },
      ],
      traps: [
        {
          title: "Divide by the magnitude, don't subtract it",
          body:
            "The unit vector is \\(\\vec{a}/|\\vec{a}|\\) — scale every component by the same \\(1/|\\vec{a}|\\). A common slip is normalising only one component or dividing by the wrong length.",
        },
      ],
    },

    // ── ANCHORED 1 (the workhorse) ───────────────────────────────────────────
    {
      kind: "formula" as const,
      slug: "cetvec-mag-magnitude-of-sum",
      name: "Magnitude of a sum from angles or perpendicularity",
      visualizationSlug: "vector-addition",
      intuition:
        "To find the length of a combination like \\(\\vec{a} + \\vec{b} + \\vec{c}\\), never compute components — instead SQUARE the magnitude. The square expands into the sum of each vector's squared length plus twice every pairwise dot product. " +
        "Here we treat \\(\\vec{a}\\cdot\\vec{b} = |\\vec{a}||\\vec{b}|\\cos\\theta\\) as a **recalled Std-11 fact** (the dot product gets its full treatment on a later page); all you need is that perpendicular vectors have dot product 0, and that a given angle fixes each cross term.",
      definition:
        "Expand the square of the magnitude:\n" +
        "\\[|\\vec{a} + \\vec{b} + \\vec{c}|^2 = |\\vec{a}|^2 + |\\vec{b}|^2 + |\\vec{c}|^2 + 2(\\vec{a}\\cdot\\vec{b} + \\vec{b}\\cdot\\vec{c} + \\vec{c}\\cdot\\vec{a})\\]\n" +
        "Each cross term is \\(\\vec{a}\\cdot\\vec{b} = |\\vec{a}||\\vec{b}|\\cos\\theta\\). Two ways the cross terms get pinned down:\n" +
        "- **Given an angle** \\(\\theta\\) between each pair → each dot product is \\(|\\cdot||\\cdot|\\cos\\theta\\).\n" +
        "- **Perpendicularity conditions** like \\(\\vec{a}\\perp(\\vec{b}+\\vec{c})\\), \\(\\vec{b}\\perp(\\vec{c}+\\vec{a})\\), \\(\\vec{c}\\perp(\\vec{a}+\\vec{b})\\) → adding the three gives \\(2(\\vec{a}\\cdot\\vec{b} + \\vec{b}\\cdot\\vec{c} + \\vec{c}\\cdot\\vec{a}) = 0\\), so ALL cross terms vanish together and \\(|\\vec{a}+\\vec{b}+\\vec{c}|^2 = |\\vec{a}|^2 + |\\vec{b}|^2 + |\\vec{c}|^2\\).",
      formula: {
        label: "Magnitude of a sum (squared)",
        latex:
          "|\\vec{a} + \\vec{b} + \\vec{c}|^2 = \\sum|\\vec{a}|^2 + 2\\sum(\\vec{a}\\cdot\\vec{b}), \\qquad \\vec{a}\\cdot\\vec{b} = |\\vec{a}||\\vec{b}|\\cos\\theta",
        symbols: [
          { symbol: "\\(\\sum|\\vec{a}|^2\\)", meaning: "\\(|\\vec{a}|^2 + |\\vec{b}|^2 + |\\vec{c}|^2\\)" },
          { symbol: "\\(\\sum(\\vec{a}\\cdot\\vec{b})\\)", meaning: "all three pairwise dot products" },
          { symbol: "\\(\\theta\\)", meaning: "angle between the pair of vectors in a dot product" },
        ],
      },
      authoredExample: {
        prompt:
          "If \\(|\\vec{a}| = 1\\), \\(|\\vec{b}| = 2\\), \\(|\\vec{c}| = 2\\) and each angle between pairs is \\(60^\\circ\\), find \\(|\\vec{a} + \\vec{b} + \\vec{c}|\\).",
        steps: [
          "Squared-length terms: \\(|\\vec{a}|^2 + |\\vec{b}|^2 + |\\vec{c}|^2 = 1 + 4 + 4 = 9\\).",
          "Each cross term uses \\(\\cos 60^\\circ = \\tfrac{1}{2}\\): \\(\\vec{a}\\cdot\\vec{b} = 1\\cdot 2\\cdot\\tfrac{1}{2} = 1\\), \\(\\vec{b}\\cdot\\vec{c} = 2\\cdot 2\\cdot\\tfrac{1}{2} = 2\\), \\(\\vec{c}\\cdot\\vec{a} = 2\\cdot 1\\cdot\\tfrac{1}{2} = 1\\).",
          "So \\(2(\\vec{a}\\cdot\\vec{b} + \\vec{b}\\cdot\\vec{c} + \\vec{c}\\cdot\\vec{a}) = 2(1 + 2 + 1) = 8\\).",
          "\\(|\\vec{a}+\\vec{b}+\\vec{c}|^2 = 9 + 8 = 17\\), so \\(|\\vec{a}+\\vec{b}+\\vec{c}| = \\sqrt{17}\\).",
        ],
        answer: "\\(|\\vec{a} + \\vec{b} + \\vec{c}| = \\sqrt{17}\\)",
      },
      selfCheckExample: {
        prompt:
          "Vectors \\(\\vec{a}, \\vec{b}, \\vec{c}\\) have magnitudes 1, 2, 3. Given \\(\\vec{a}\\perp(\\vec{b}+\\vec{c})\\), \\(\\vec{b}\\perp(\\vec{c}+\\vec{a})\\), \\(\\vec{c}\\perp(\\vec{a}+\\vec{b})\\), find \\(|\\vec{a}+\\vec{b}+\\vec{c}|\\).",
        steps: [
          "Adding the three perpendicularity conditions gives \\(2(\\vec{a}\\cdot\\vec{b} + \\vec{b}\\cdot\\vec{c} + \\vec{c}\\cdot\\vec{a}) = 0\\).",
          "So all cross terms vanish: \\(|\\vec{a}+\\vec{b}+\\vec{c}|^2 = 1 + 4 + 9 = 14\\).",
          "\\(|\\vec{a}+\\vec{b}+\\vec{c}| = \\sqrt{14}\\).",
        ],
        answer: "\\(\\sqrt{14}\\)",
      },
      practiceSet: [
        { prompt: "If all three pairwise dot products are 0, \\(|\\vec{a}+\\vec{b}+\\vec{c}|^2 = ?\\)", answer: "\\(|\\vec{a}|^2 + |\\vec{b}|^2 + |\\vec{c}|^2\\)" },
        { prompt: "\\(|\\vec{a}|=1, |\\vec{b}|=2, |\\vec{c}|=2\\), all cross terms zero. \\(|\\vec{a}+\\vec{b}+\\vec{c}|=?\\)", answer: "\\(3\\)", method: "\\(\\sqrt{1+4+4}=3\\)" },
        { prompt: "What does \\(\\vec{a}\\perp\\vec{b}\\) make \\(\\vec{a}\\cdot\\vec{b}\\) equal?", answer: "\\(0\\)" },
        { prompt: "\\(\\cos 60^\\circ = ?\\) (used in every angle version)", answer: "\\(\\tfrac{1}{2}\\)" },
      ],
      pyqExampleId: "0b5a2417-c726-42d3-8cc9-203422560d49",
      traps: [
        {
          title: "Add the cross terms with the factor of 2",
          body:
            "The expansion is \\(\\sum|\\cdot|^2 + 2\\sum(\\vec{a}\\cdot\\vec{b})\\). Forgetting the \\(2\\) halves every cross term — a frequent wrong answer when the angle version has non-zero dot products.",
        },
        {
          title: "Perpendicularity conditions cancel ALL cross terms at once",
          body:
            "The three conditions \\(\\vec{a}\\perp(\\vec{b}+\\vec{c})\\) etc. don't say each individual dot product is zero — they say their SUM is zero. That's all you need: the whole \\(2\\sum(\\vec{a}\\cdot\\vec{b})\\) term drops, leaving just \\(\\sqrt{\\sum|\\cdot|^2}\\).",
        },
        {
          title: "Take the square root at the very end",
          body:
            "You compute \\(|\\vec{a}+\\vec{b}+\\vec{c}|^2\\) first. For magnitudes \\(1, 8, 4\\) with zero cross terms it's \\(81\\), and the answer is \\(\\sqrt{81} = 9\\) — NOT \\(81\\). The distractor that leaves the squared value un-rooted is the classic trap.",
        },
      ],
    },

    // ── ANCHORED 2 (projection-equality variant) ─────────────────────────────
    {
      kind: "formula" as const,
      slug: "cetvec-mag-projection-perpendicular-sum",
      name: "Magnitude of a sum with projection-equality and a perpendicular pair",
      intuition:
        "A second flavour of the same expansion. Instead of stating angles directly, the question gives an indirect handle: \"the projection of \\(\\vec{b}\\) along \\(\\vec{a}\\) equals the projection of \\(\\vec{c}\\) along \\(\\vec{a}\\)\" forces \\((\\vec{b}-\\vec{c})\\cdot\\vec{a} = 0\\), and \"\\(\\vec{b}\\perp\\vec{c}\\)\" forces \\(\\vec{b}\\cdot\\vec{c} = 0\\). Feed both into the squared-magnitude expansion and the cross terms collapse.",
      definition:
        "Two facts unlock these:\n" +
        "- **Equal projections along \\(\\vec{a}\\):** projection of \\(\\vec{b}\\) on \\(\\vec{a}\\) is \\(\\dfrac{\\vec{a}\\cdot\\vec{b}}{|\\vec{a}|}\\); equating it to \\(\\vec{c}\\)'s projection gives \\(\\vec{a}\\cdot\\vec{b} = \\vec{a}\\cdot\\vec{c}\\), i.e. \\((\\vec{b}-\\vec{c})\\cdot\\vec{a} = 0\\).\n" +
        "- **Perpendicular pair:** \\(\\vec{b}\\perp\\vec{c}\\Rightarrow\\vec{b}\\cdot\\vec{c} = 0\\).\n\n" +
        "Then expand the target, grouping the difference: \\(|\\vec{a}+\\vec{b}-\\vec{c}|^2 = |\\vec{a}|^2 + |\\vec{b}-\\vec{c}|^2 + 2\\vec{a}\\cdot(\\vec{b}-\\vec{c})\\). The last term is 0 (equal projections), and \\(|\\vec{b}-\\vec{c}|^2 = |\\vec{b}|^2 + |\\vec{c}|^2\\) (perpendicular pair).",
      formula: {
        label: "Grouped expansion with a perpendicular pair",
        latex:
          "|\\vec{a} + \\vec{b} - \\vec{c}|^2 = |\\vec{a}|^2 + |\\vec{b} - \\vec{c}|^2 + 2\\,\\vec{a}\\cdot(\\vec{b} - \\vec{c})",
        symbols: [
          { symbol: "\\(\\vec{a}\\cdot(\\vec{b}-\\vec{c}) = 0\\)", meaning: "from equal projections of \\(\\vec{b}, \\vec{c}\\) along \\(\\vec{a}\\)" },
          { symbol: "\\(|\\vec{b}-\\vec{c}|^2 = |\\vec{b}|^2 + |\\vec{c}|^2\\)", meaning: "from \\(\\vec{b}\\perp\\vec{c}\\)" },
        ],
      },
      authoredExample: {
        prompt:
          "Let \\(|\\vec{a}| = 3\\), \\(|\\vec{b}| = 6\\), \\(|\\vec{c}| = 6\\). If the projection of \\(\\vec{b}\\) on \\(\\vec{a}\\) equals the projection of \\(\\vec{c}\\) on \\(\\vec{a}\\), and \\(\\vec{b}\\perp\\vec{c}\\), find \\(|\\vec{a} + \\vec{b} - \\vec{c}|\\).",
        steps: [
          "Equal projections: \\(\\vec{a}\\cdot(\\vec{b} - \\vec{c}) = 0\\), so the cross term with \\(\\vec{a}\\) drops.",
          "\\(\\vec{b}\\perp\\vec{c}\\): \\(|\\vec{b} - \\vec{c}|^2 = |\\vec{b}|^2 + |\\vec{c}|^2 = 36 + 36 = 72\\).",
          "Combine: \\(|\\vec{a}+\\vec{b}-\\vec{c}|^2 = |\\vec{a}|^2 + |\\vec{b}-\\vec{c}|^2 = 9 + 72 = 81\\).",
          "\\(|\\vec{a}+\\vec{b}-\\vec{c}| = \\sqrt{81} = 9\\).",
        ],
        answer: "\\(|\\vec{a} + \\vec{b} - \\vec{c}| = 9\\)",
      },
      selfCheckExample: {
        prompt:
          "Vectors \\(\\vec{u}, \\vec{v}, \\vec{w}\\) have magnitudes 1, 2, 3. The projection of \\(\\vec{v}\\) along \\(\\vec{u}\\) equals that of \\(\\vec{w}\\) along \\(\\vec{u}\\), and \\(\\vec{v}\\perp\\vec{w}\\). Find \\(|\\vec{u} - \\vec{v} + \\vec{w}|\\).",
        steps: [
          "Expand: \\(|\\vec{u}-\\vec{v}+\\vec{w}|^2 = |\\vec{u}|^2 + |\\vec{v}|^2 + |\\vec{w}|^2 - 2\\vec{u}\\cdot\\vec{v} + 2\\vec{u}\\cdot\\vec{w} - 2\\vec{v}\\cdot\\vec{w}\\).",
          "Equal projections: \\(\\vec{u}\\cdot\\vec{v} = \\vec{u}\\cdot\\vec{w}\\), so \\(-2\\vec{u}\\cdot\\vec{v} + 2\\vec{u}\\cdot\\vec{w} = 0\\). And \\(\\vec{v}\\perp\\vec{w}\\Rightarrow\\vec{v}\\cdot\\vec{w} = 0\\).",
          "Left with \\(|\\vec{u}|^2 + |\\vec{v}|^2 + |\\vec{w}|^2 = 1 + 4 + 9 = 14\\).",
        ],
        answer: "\\(|\\vec{u} - \\vec{v} + \\vec{w}| = \\sqrt{14}\\)",
      },
      practiceSet: [
        { prompt: "Equal projections of \\(\\vec{b}, \\vec{c}\\) along \\(\\vec{a}\\) give which dot-product equation?", answer: "\\(\\vec{a}\\cdot(\\vec{b}-\\vec{c}) = 0\\)" },
        { prompt: "If \\(\\vec{b}\\perp\\vec{c}\\), then \\(|\\vec{b}-\\vec{c}|^2 = ?\\)", answer: "\\(|\\vec{b}|^2 + |\\vec{c}|^2\\)" },
        { prompt: "\\(|\\vec{a}|=2, |\\vec{b}|=4, |\\vec{c}|=4\\), all relevant cross terms zero. \\(|\\vec{a}+\\vec{b}-\\vec{c}|^2 = ?\\)", answer: "\\(36\\)", method: "\\(4 + (16+16)\\)" },
        { prompt: "\\(|\\vec{a}+\\vec{b}-\\vec{c}|^2 = 36\\) gives \\(|\\vec{a}+\\vec{b}-\\vec{c}| = ?\\)", answer: "\\(6\\)" },
      ],
      pyqExampleId: "0d8ac43b-26fa-455e-af45-551652acea42",
      traps: [
        {
          title: "\"Equal projections along \\(\\vec{a}\\)\" means \\((\\vec{b}-\\vec{c})\\cdot\\vec{a} = 0\\), not \\(\\vec{b} = \\vec{c}\\)",
          body:
            "The projections being equal only forces \\(\\vec{a}\\cdot\\vec{b} = \\vec{a}\\cdot\\vec{c}\\) — \\(\\vec{b}\\) and \\(\\vec{c}\\) can still differ wildly. Use it to kill exactly the \\(\\vec{a}\\)-cross term, nothing more.",
        },
        {
          title: "Watch the sign on the vector you subtract",
          body:
            "In \\(|\\vec{a}+\\vec{b}-\\vec{c}|\\), the \\(\\vec{c}\\) term is subtracted, but \\(|\\vec{b}-\\vec{c}|^2\\) still ADDS the squared lengths when \\(\\vec{b}\\perp\\vec{c}\\) (the cross term \\(-2\\vec{b}\\cdot\\vec{c}\\) is zero). The minus sign only matters through the dot product, which vanishes here.",
        },
      ],
    },

    // ── ANCHORED 3 (diagonal unit vector) ────────────────────────────────────
    {
      kind: "formula" as const,
      slug: "cetvec-mag-diagonal-unit-vector",
      name: "Unit vector parallel to a parallelogram's diagonal",
      visualizationSlug: "vector-addition",
      intuition:
        "If two adjacent sides of a parallelogram are \\(\\vec{a}\\) and \\(\\vec{b}\\), one diagonal runs from the shared vertex to the opposite corner — and by the triangle/parallelogram law that diagonal IS \\(\\vec{a} + \\vec{b}\\). To get a unit vector along it, add the sides, then divide by the resulting magnitude.",
      definition:
        "For a parallelogram with adjacent sides \\(\\vec{a}\\) and \\(\\vec{b}\\) from a common vertex:\n" +
        "- The diagonal through that vertex is \\(\\vec{d} = \\vec{a} + \\vec{b}\\).\n" +
        "- The other diagonal is \\(\\vec{a} - \\vec{b}\\) (or \\(\\vec{b} - \\vec{a}\\)).\n\n" +
        "The **unit vector parallel to the diagonal** is \\(\\hat{d} = \\dfrac{\\vec{a} + \\vec{b}}{|\\vec{a} + \\vec{b}|}\\).",
      formula: {
        label: "Unit vector along a diagonal",
        latex: "\\hat{d} = \\dfrac{\\vec{a} + \\vec{b}}{|\\vec{a} + \\vec{b}|}",
        symbols: [
          { symbol: "\\(\\vec{a}, \\vec{b}\\)", meaning: "adjacent sides from the shared vertex" },
          { symbol: "\\(\\vec{a} + \\vec{b}\\)", meaning: "the diagonal through that vertex" },
        ],
      },
      authoredExample: {
        prompt:
          "Two adjacent sides of a parallelogram are \\(\\vec{a} = \\hat{i} + 2\\hat{j} + 2\\hat{k}\\) and \\(\\vec{b} = 3\\hat{i} + 2\\hat{j} - 6\\hat{k}\\). Find the unit vector parallel to the diagonal \\(\\vec{a} + \\vec{b}\\).",
        steps: [
          "Add the sides: \\(\\vec{a} + \\vec{b} = 4\\hat{i} + 4\\hat{j} - 4\\hat{k}\\).",
          "Magnitude: \\(|\\vec{a} + \\vec{b}| = \\sqrt{16 + 16 + 16} = \\sqrt{48} = 4\\sqrt{3}\\).",
          "Unit vector: \\(\\dfrac{4\\hat{i} + 4\\hat{j} - 4\\hat{k}}{4\\sqrt{3}} = \\dfrac{1}{\\sqrt{3}}(\\hat{i} + \\hat{j} - \\hat{k})\\).",
        ],
        answer: "\\(\\dfrac{1}{\\sqrt{3}}(\\hat{i} + \\hat{j} - \\hat{k})\\)",
      },
      selfCheckExample: {
        prompt:
          "Adjacent sides of a parallelogram are \\(\\hat{i} + \\hat{j}\\) and \\(2\\hat{i} + \\hat{j} + 2\\hat{k}\\). Find the unit vector along the diagonal \\(\\vec{a} + \\vec{b}\\).",
        steps: [
          "Diagonal: \\(\\vec{a} + \\vec{b} = 3\\hat{i} + 2\\hat{j} + 2\\hat{k}\\).",
          "Magnitude: \\(\\sqrt{9 + 4 + 4} = \\sqrt{17}\\).",
          "Unit vector: \\(\\dfrac{1}{\\sqrt{17}}(3\\hat{i} + 2\\hat{j} + 2\\hat{k})\\).",
        ],
        answer: "\\(\\dfrac{1}{\\sqrt{17}}(3\\hat{i} + 2\\hat{j} + 2\\hat{k})\\)",
      },
      practiceSet: [
        { prompt: "Sides \\(\\vec{a}, \\vec{b}\\): which diagonal is \\(\\vec{a} + \\vec{b}\\)?", answer: "the one through the shared vertex" },
        { prompt: "Sides \\(2\\hat{i}\\) and \\(2\\hat{j}\\): diagonal \\(\\vec{a}+\\vec{b}\\) and its magnitude?", answer: "\\(2\\hat{i} + 2\\hat{j}\\), \\(2\\sqrt{2}\\)" },
        { prompt: "The OTHER diagonal of a parallelogram with sides \\(\\vec{a}, \\vec{b}\\)?", answer: "\\(\\vec{a} - \\vec{b}\\)" },
        { prompt: "Unit vector along \\(6\\hat{i} + 8\\hat{j}\\)?", answer: "\\(\\tfrac{1}{5}(6\\hat{i} + 8\\hat{j})\\)", method: "\\(|\\vec{d}| = 10\\)" },
      ],
      pyqExampleId: "345a0bf5-eeab-4e2e-8151-1178c44fb282",
      traps: [
        {
          title: "Diagonal \\(\\vec{a}+\\vec{b}\\), not \\(\\vec{a}-\\vec{b}\\)",
          body:
            "A parallelogram has two diagonals: \\(\\vec{a} + \\vec{b}\\) (through the shared vertex) and \\(\\vec{a} - \\vec{b}\\) (the other one). The question usually wants the SUM; reading it as the difference gives a different unit vector entirely.",
        },
        {
          title: "Normalise the diagonal's own magnitude, not a stray \\(\\sqrt{77}\\)",
          body:
            "Compute \\(|\\vec{a}+\\vec{b}|\\) AFTER adding — for \\(3\\hat{i}-6\\hat{j}+2\\hat{k}\\) that is \\(\\sqrt{9+36+4} = 7\\). Distractors often divide by an unrelated magnitude (like \\(\\sqrt{77}\\) from \\(\\sqrt{49 + 28}\\)); always re-square the summed components.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Vector algebra fundamentals",
      href: "/notes/mht-cet-maths/vectors",
    },
  ],
};
