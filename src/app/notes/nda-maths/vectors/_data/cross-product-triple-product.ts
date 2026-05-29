import type { SubtopicNote } from "@/app/notes/_types";

export const CROSS_PRODUCT_TRIPLE_PRODUCT_NOTE: SubtopicNote = {
  subtopicName: "Cross Product and Triple Product",
  title: "Cross Product and Triple Product",
  oneLineDefinition:
    "The vector product whose magnitude is the area of a parallelogram, its direction the right-hand-rule perpendicular — plus the scalar and vector triple products built from it.",
  whyItMatters:
    "The cross product takes two vectors and produces a THIRD vector — perpendicular to both, with magnitude equal to the area of the parallelogram they span. " +
    "That single idea opens up a family of geometric tools: computing areas of triangles and parallelograms, building unit vectors perpendicular to a plane, expressing torque/moment of a force about a point, and detecting when three vectors lie in one plane (via the scalar triple product). " +
    "The seven concepts below take you from the basic algebra (anti-commutative, NOT associative) through the Lagrange identity, the triple products, and the vector triple product (BAC-CAB rule). " +
    "37 PYQs across 2017–2026, with 27% rated HARD — the densest and toughest Vectors subtopic. Master these seven and the chapter's HARD tail collapses.",
  concepts: [
    // 1 ───────────────────────────────────────────────────────────────────────
    {
      slug: "cross-product-algebra-and-properties",
      name: "Cross product — algebra and properties",
      visualizationSlug: "right-hand-rule-cross",
      intuition:
        "The cross product of two 3-D vectors produces a third vector perpendicular to both, with magnitude equal to the area of the parallelogram they span. " +
        "Algebraically it is anti-commutative (swap and the sign flips) and distributive over addition, but — unlike multiplication of numbers — NOT associative. " +
        "A null cross product means the two vectors are parallel (or one of them is the zero vector).",
      definition:
        "For vectors \\(\\vec{a}, \\vec{b}, \\vec{c}\\) and scalar \\(k\\): " +
        "\\(\\vec{a}\\times\\vec{b} = -\\vec{b}\\times\\vec{a}\\) (anti-commutative); " +
        "\\(\\vec{a}\\times(\\vec{b}+\\vec{c}) = \\vec{a}\\times\\vec{b} + \\vec{a}\\times\\vec{c}\\) (distributive); " +
        "\\((k\\vec{a})\\times\\vec{b} = k(\\vec{a}\\times\\vec{b})\\) (scalar associative); " +
        "\\(\\vec{a}\\times\\vec{a} = \\vec{0}\\); " +
        "\\(\\vec{a}\\times\\vec{b} = \\vec{0} \\iff \\vec{a}\\,\\|\\,\\vec{b}\\) (or one is zero); " +
        "\\((\\vec{a}\\times\\vec{b})\\times\\vec{c} \\neq \\vec{a}\\times(\\vec{b}\\times\\vec{c})\\) in general.",
      formula: {
        label: "Difference-of-squares-style identity",
        latex:
          "(\\vec{a} - \\vec{b}) \\times (\\vec{a} + \\vec{b}) = 2\\,\\vec{a}\\times\\vec{b}",
        symbols: [
          { symbol: "\\(\\vec{a}\\times\\vec{a}, \\vec{b}\\times\\vec{b}\\)", meaning: "both equal \\(\\vec{0}\\)" },
          { symbol: "\\(\\vec{a}\\times\\vec{b}, \\vec{b}\\times\\vec{a}\\)", meaning: "differ in sign — they survive in the expansion" },
        ],
      },
      authoredExample: {
        prompt: "Find \\((\\vec{a} - \\vec{b}) \\times (\\vec{a} + \\vec{b})\\) in terms of \\(\\vec{a}\\times\\vec{b}\\).",
        steps: [
          "Distribute: \\((\\vec{a}-\\vec{b})\\times(\\vec{a}+\\vec{b}) = \\vec{a}\\times\\vec{a} + \\vec{a}\\times\\vec{b} - \\vec{b}\\times\\vec{a} - \\vec{b}\\times\\vec{b}\\).",
          "Apply \\(\\vec{a}\\times\\vec{a} = \\vec{b}\\times\\vec{b} = \\vec{0}\\) to drop the diagonal terms.",
          "Apply anti-commutativity: \\(-\\vec{b}\\times\\vec{a} = +\\vec{a}\\times\\vec{b}\\).",
          "Combine: \\(\\vec{a}\\times\\vec{b} + \\vec{a}\\times\\vec{b} = 2\\,\\vec{a}\\times\\vec{b}\\).",
        ],
        answer: "\\((\\vec{a} - \\vec{b}) \\times (\\vec{a} + \\vec{b}) = 2\\,\\vec{a}\\times\\vec{b}\\)",
      },
      selfCheckExample: {
        prompt: "Express \\((2\\vec{a} + \\vec{b}) \\times (\\vec{a} - \\vec{b})\\) in terms of \\(\\vec{a}\\times\\vec{b}\\).",
        steps: [
          "Distribute: \\(2(\\vec{a}\\times\\vec{a}) - 2(\\vec{a}\\times\\vec{b}) + (\\vec{b}\\times\\vec{a}) - (\\vec{b}\\times\\vec{b})\\).",
          "Drop the zero diagonal terms; use \\(\\vec{b}\\times\\vec{a} = -\\vec{a}\\times\\vec{b}\\): \\(= -2(\\vec{a}\\times\\vec{b}) - (\\vec{a}\\times\\vec{b})\\).",
          "\\(= -3\\,\\vec{a}\\times\\vec{b}\\).",
        ],
        answer: "\\(-3\\,\\vec{a}\\times\\vec{b}\\)",
      },
      practiceSet: [
        { prompt: "\\(\\vec{a}\\times\\vec{a} = ?\\)", answer: "\\(\\vec{0}\\)" },
        { prompt: "\\(\\vec{a}\\times\\vec{b} = ?\\) in terms of \\(\\vec{b}\\times\\vec{a}\\).", answer: "\\(-\\vec{b}\\times\\vec{a}\\)" },
        { prompt: "If \\(\\vec{a}\\times\\vec{b} = \\vec{0}\\) (both non-zero), the vectors are?", answer: "parallel" },
        { prompt: "Is the cross product associative?", answer: "No" },
      ],
      pyqExampleId: "8f4e3041-d0ac-4896-888b-0c3e8edf2416",
      traps: [
        {
          title: "Cross product is NOT associative",
          body:
            "\\((\\vec{a}\\times\\vec{b})\\times\\vec{c}\\) and \\(\\vec{a}\\times(\\vec{b}\\times\\vec{c})\\) are generally different vectors — both are linear combinations of \\(\\vec{a}\\) and \\(\\vec{b}\\) (or \\(\\vec{b}\\) and \\(\\vec{c}\\)), but with different coefficients given by BAC-CAB. " +
            "An MCQ statement \\\"cross product is associative\\\" is always wrong.",
        },
        {
          title: "\\(\\vec{a}\\times\\vec{b} = \\vec{0}\\) does NOT mean both vectors are zero",
          body:
            "It means \\(\\vec{a}\\) and \\(\\vec{b}\\) are parallel — they could be non-zero scalar multiples of each other. " +
            "The right reading: \\(\\vec{a}\\times\\vec{b} = \\vec{0}\\) and \\(\\vec{a}, \\vec{b} \\neq \\vec{0}\\) together imply \\(\\vec{a} = \\lambda\\vec{b}\\) for some scalar \\(\\lambda\\).",
        },
      ],
    },

    // 2 ───────────────────────────────────────────────────────────────────────
    {
      slug: "cross-product-magnitude-area-and-lagrange",
      name: "Cross-product magnitude, area, and the Lagrange identity",
      visualizationSlug: "cross-product-area",
      intuition:
        "The magnitude of \\(\\vec{a}\\times\\vec{b}\\) is the area of the parallelogram on \\(\\vec{a}\\) and \\(\\vec{b}\\), measured by \\(|\\vec{a}||\\vec{b}|\\sin\\theta\\). " +
        "Half of that is the area of the triangle. " +
        "Combining the cross-product magnitude with the dot-product magnitude gives the Lagrange identity — a one-line bridge from one to the other.",
      definition:
        "For non-zero \\(\\vec{a}, \\vec{b}\\) at angle \\(\\theta\\): " +
        "\\(|\\vec{a}\\times\\vec{b}| = |\\vec{a}|\\,|\\vec{b}|\\sin\\theta\\). " +
        "Area of parallelogram with sides \\(\\vec{a}, \\vec{b}\\) is \\(|\\vec{a}\\times\\vec{b}|\\); area of triangle with the same sides is \\(\\tfrac{1}{2}|\\vec{a}\\times\\vec{b}|\\). " +
        "Lagrange identity: \\(|\\vec{a}\\times\\vec{b}|^2 + (\\vec{a}\\cdot\\vec{b})^2 = |\\vec{a}|^2\\,|\\vec{b}|^2\\).",
      formula: {
        label: "Magnitude, area, and Lagrange",
        latex:
          "|\\vec{a}\\times\\vec{b}| = |\\vec{a}||\\vec{b}|\\sin\\theta \\qquad |\\vec{a}\\times\\vec{b}|^2 + (\\vec{a}\\cdot\\vec{b})^2 = |\\vec{a}|^2 |\\vec{b}|^2",
        symbols: [
          { symbol: "\\(\\theta\\)", meaning: "angle between \\(\\vec{a}\\) and \\(\\vec{b}\\)" },
          { symbol: "\\(|\\vec{a}\\times\\vec{b}|\\)", meaning: "parallelogram area; triangle area is half of this" },
          { symbol: "Lagrange identity", meaning: "from \\(\\sin^2\\theta + \\cos^2\\theta = 1\\) multiplied by \\(|\\vec{a}|^2|\\vec{b}|^2\\)" },
        ],
      },
      authoredExample: {
        prompt:
          "Given \\(|\\vec{a}\\times\\vec{b}|^2 + (\\vec{a}\\cdot\\vec{b})^2 = 144\\) and \\(|\\vec{a}| = 4\\), find \\(|\\vec{b}|\\).",
        steps: [
          "Recognise the Lagrange identity: \\(|\\vec{a}\\times\\vec{b}|^2 + (\\vec{a}\\cdot\\vec{b})^2 = |\\vec{a}|^2\\,|\\vec{b}|^2\\).",
          "So \\(144 = |\\vec{a}|^2 |\\vec{b}|^2 = 16\\,|\\vec{b}|^2\\).",
          "Solve: \\(|\\vec{b}|^2 = 9\\), hence \\(|\\vec{b}| = 3\\).",
        ],
        answer: "\\(|\\vec{b}| = 3\\)",
      },
      selfCheckExample: {
        prompt:
          "\\(\\vec{a}\\) and \\(\\vec{b}\\) have magnitudes 3 and 5 with angle \\(30^\\circ\\) between them. Find the area of the parallelogram they span.",
        steps: [
          "Area \\(= |\\vec{a}\\times\\vec{b}| = |\\vec{a}||\\vec{b}|\\sin\\theta = 3\\cdot 5\\cdot\\sin 30^\\circ\\).",
          "\\(= 15\\cdot\\tfrac{1}{2} = 7.5\\).",
        ],
        answer: "Area \\(= 7.5\\) square units",
      },
      practiceSet: [
        { prompt: "Area of the parallelogram on \\(\\vec{a}, \\vec{b}\\)?", answer: "\\(|\\vec{a}\\times\\vec{b}|\\)" },
        { prompt: "\\(|\\vec{a}\\times\\vec{b}|\\) for \\(|\\vec{a}| = 2\\), \\(|\\vec{b}| = 3\\), angle \\(30^\\circ\\)?", answer: "\\(3\\)", method: "\\(2\\cdot 3\\cdot\\tfrac{1}{2}\\)" },
        { prompt: "Triangle area with sides \\(\\vec{a}, \\vec{b}\\)?", answer: "\\(\\tfrac{1}{2}|\\vec{a}\\times\\vec{b}|\\)" },
        { prompt: "Lagrange: \\(|\\vec{a}\\times\\vec{b}|^2 + (\\vec{a}\\cdot\\vec{b})^2 = ?\\)", answer: "\\(|\\vec{a}|^2|\\vec{b}|^2\\)" },
      ],
      pyqExampleId: "50ec4797-d961-44e3-bc2a-f866aa9e95ef",
      traps: [
        {
          title: "Area of a triangle is \\(\\tfrac{1}{2}|\\vec{a}\\times\\vec{b}|\\), NOT \\(|\\vec{a}\\times\\vec{b}|\\)",
          body:
            "A frequently-tested statement: \\\"\\(|\\vec{a}\\times\\vec{b}|\\) is the area of a triangle with sides \\(\\vec{a}\\) and \\(\\vec{b}\\)\\\" — this is FALSE; it's the parallelogram area. " +
            "The factor-of-2 lives here. Halving gives the triangle.",
        },
        {
          title: "\\(\\sin\\theta\\) is always non-negative for \\(\\theta\\in[0,\\pi]\\)",
          body:
            "Unlike \\(\\cos\\theta\\), the sine in the cross-product magnitude formula never goes negative — the magnitude is a length. " +
            "If a question gives \\(\\vec{a}\\times\\vec{b}\\) as a specific vector and asks for the acute angle, take magnitudes of BOTH sides before solving for \\(\\sin\\theta\\).",
        },
      ],
    },

    // 3 ───────────────────────────────────────────────────────────────────────
    {
      slug: "unit-vector-perpendicular-via-cross",
      name: "Unit vector perpendicular to two given vectors",
      visualizationSlug: "unit-normal-vector",
      intuition:
        "Any vector perpendicular to both \\(\\vec{a}\\) and \\(\\vec{b}\\) lies along the cross product direction (or its opposite). " +
        "To get the unit perpendicular, take \\(\\vec{a}\\times\\vec{b}\\) and divide by its magnitude. " +
        "There are exactly two such unit vectors, pointing in opposite directions.",
      definition:
        "If \\(\\vec{a}, \\vec{b}\\) are not parallel, a unit vector perpendicular to both is " +
        "\\(\\hat{n} = \\pm\\dfrac{\\vec{a}\\times\\vec{b}}{|\\vec{a}\\times\\vec{b}|}\\). " +
        "Both signs are valid answers unless the question specifies a direction (right-hand rule, towards a third vector, etc.).",
      formula: {
        label: "Unit perpendicular",
        latex:
          "\\hat{n} = \\pm\\dfrac{\\vec{a}\\times\\vec{b}}{|\\vec{a}\\times\\vec{b}|}",
        symbols: [
          { symbol: "\\(\\vec{a}\\times\\vec{b}\\)", meaning: "vector perpendicular to both \\(\\vec{a}\\) and \\(\\vec{b}\\)" },
          { symbol: "\\(|\\vec{a}\\times\\vec{b}|\\)", meaning: "magnitude — divide to normalise" },
          { symbol: "\\(\\pm\\)", meaning: "two unit perpendiculars exist, in opposite directions" },
        ],
      },
      authoredExample: {
        prompt:
          "Find a unit vector perpendicular to both \\(\\vec{a} = 2\\hat{i} - \\hat{j} + \\hat{k}\\) and \\(\\vec{b} = 3\\hat{i} - 4\\hat{j} - \\hat{k}\\).",
        steps: [
          "Compute \\(\\vec{a}\\times\\vec{b}\\) as a determinant: " +
            "\\(\\begin{vmatrix} \\hat{i} & \\hat{j} & \\hat{k} \\\\ 2 & -1 & 1 \\\\ 3 & -4 & -1 \\end{vmatrix}\\).",
          "Expand: \\(\\hat{i}\\big((-1)(-1) - (1)(-4)\\big) - \\hat{j}\\big((2)(-1) - (1)(3)\\big) + \\hat{k}\\big((2)(-4) - (-1)(3)\\big) = \\hat{i}(1+4) - \\hat{j}(-2-3) + \\hat{k}(-8+3)\\).",
          "Simplify: \\(\\vec{a}\\times\\vec{b} = 5\\hat{i} + 5\\hat{j} - 5\\hat{k}\\).",
          "Magnitude: \\(|\\vec{a}\\times\\vec{b}| = \\sqrt{25+25+25} = 5\\sqrt{3}\\).",
          "Normalise: \\(\\hat{n} = \\pm\\dfrac{5\\hat{i} + 5\\hat{j} - 5\\hat{k}}{5\\sqrt{3}} = \\pm\\dfrac{1}{\\sqrt{3}}(\\hat{i}+\\hat{j}-\\hat{k})\\).",
        ],
        answer: "\\(\\hat{n} = \\pm\\dfrac{1}{\\sqrt{3}}(\\hat{i}+\\hat{j}-\\hat{k})\\)",
      },
      selfCheckExample: {
        prompt:
          "Find a unit vector perpendicular to both \\(\\vec{a} = \\hat{i} + \\hat{j}\\) and \\(\\vec{b} = \\hat{i} - \\hat{j}\\).",
        steps: [
          "Both vectors lie in the \\(xy\\)-plane, so \\(\\vec{a}\\times\\vec{b}\\) points along \\(\\hat{k}\\): \\(\\vec{a}\\times\\vec{b} = (1\\cdot(-1) - 1\\cdot 1)\\hat{k} = -2\\hat{k}\\).",
          "Magnitude is 2; normalise: \\(\\hat{n} = \\pm\\dfrac{-2\\hat{k}}{2} = \\pm\\hat{k}\\).",
        ],
        answer: "\\(\\hat{n} = \\pm\\hat{k}\\)",
      },
      practiceSet: [
        { prompt: "Unit vector perpendicular to both \\(\\vec{a}, \\vec{b}\\)?", answer: "\\(\\pm\\tfrac{\\vec{a}\\times\\vec{b}}{|\\vec{a}\\times\\vec{b}|}\\)" },
        { prompt: "How many unit vectors are perpendicular to two non-parallel vectors?", answer: "two (opposite)" },
        { prompt: "\\(\\hat{i}\\times\\hat{j} = ?\\)", answer: "\\(\\hat{k}\\)" },
        { prompt: "Unit vector perpendicular to both \\(\\hat{i}\\) and \\(\\hat{j}\\)?", answer: "\\(\\pm\\hat{k}\\)" },
      ],
      pyqExampleId: "b60f495b-8969-4983-9278-05af6ef8d00e",
      traps: [
        {
          title: "Both \\(\\pm\\) signs give valid answers",
          body:
            "If an MCQ offers \\(+\\hat{n}\\) and the question doesn't pin down direction, \\(-\\hat{n}\\) is equally correct — accept whichever is listed. " +
            "Some PYQs add a constraint like \\\"with positive \\(z\\)-component\\\" specifically to break this ambiguity.",
        },
        {
          title: "Scalar multiples of a unit perpendicular are not unit",
          body:
            "A vector like \\(\\dfrac{1}{50}(-4\\hat{i}-5\\hat{j}+3\\hat{k})\\) may point in the right direction but if its magnitude isn't 1, it isn't a unit perpendicular. " +
            "Always confirm \\(|\\hat{n}| = 1\\) before selecting an option.",
        },
      ],
    },

    // 4 ───────────────────────────────────────────────────────────────────────
    {
      slug: "moment-of-force",
      name: "Moment of a force (torque)",
      intuition:
        "The moment of a force about a point \\(O\\) measures how strongly the force tends to rotate the body about \\(O\\). " +
        "It is the cross product of the position vector (from \\(O\\) to the point of application) with the force itself. " +
        "Direction follows the right-hand rule; magnitude is the perpendicular distance times the force.",
      definition:
        "If a force \\(\\vec{F}\\) acts at a point \\(P\\) and we measure its moment about a point \\(O\\), then " +
        "\\(\\vec{M} = \\overrightarrow{OP} \\times \\vec{F}\\). " +
        "Moment magnitude is \\(|\\vec{M}| = |\\overrightarrow{OP}||\\vec{F}|\\sin\\theta = d\\,|\\vec{F}|\\) where \\(d\\) is the perpendicular distance from \\(O\\) to the line of action.",
      formula: {
        label: "Moment of a force",
        latex: "\\vec{M} = \\overrightarrow{OP} \\times \\vec{F}",
        symbols: [
          { symbol: "\\(O\\)", meaning: "pivot / reference point for the moment" },
          { symbol: "\\(\\overrightarrow{OP}\\)", meaning: "position vector from \\(O\\) to the point of application \\(P\\)" },
          { symbol: "\\(\\vec{F}\\)", meaning: "applied force vector" },
        ],
      },
      authoredExample: {
        prompt:
          "A force \\(\\vec{F} = 2\\hat{i} - \\lambda\\hat{j} + 5\\hat{k}\\) is applied at \\(A(1,2,5)\\). " +
          "If its moment about \\(B(-1,-2,3)\\) is \\(16\\hat{i} - 6\\hat{j} + 2\\lambda\\hat{k}\\), find \\(\\lambda\\).",
        steps: [
          "Compute \\(\\overrightarrow{BA} = A - B = (1-(-1))\\hat{i} + (2-(-2))\\hat{j} + (5-3)\\hat{k} = 2\\hat{i} + 4\\hat{j} + 2\\hat{k}\\).",
          "Set up the cross product \\(\\overrightarrow{BA} \\times \\vec{F}\\) as a determinant: " +
            "\\(\\begin{vmatrix} \\hat{i} & \\hat{j} & \\hat{k} \\\\ 2 & 4 & 2 \\\\ 2 & -\\lambda & 5 \\end{vmatrix}\\).",
          "Expand: \\(\\hat{i}(4\\cdot 5 - 2\\cdot(-\\lambda)) - \\hat{j}(2\\cdot 5 - 2\\cdot 2) + \\hat{k}(2\\cdot(-\\lambda) - 4\\cdot 2) = (20 + 2\\lambda)\\hat{i} - 6\\hat{j} + (-2\\lambda - 8)\\hat{k}\\).",
          "Match the given moment component-by-component: " +
            "\\(\\hat{i}\\) gives \\(20 + 2\\lambda = 16 \\Rightarrow \\lambda = -2\\). " +
            "Cross-check on \\(\\hat{k}\\): \\(-2(-2) - 8 = 4 - 8 = -4 = 2\\lambda \\Rightarrow \\lambda = -2\\). \\(\\checkmark\\)",
        ],
        answer: "\\(\\lambda = -2\\)",
      },
      selfCheckExample: {
        prompt:
          "A force \\(\\vec{F} = \\hat{i} + 2\\hat{j} + 3\\hat{k}\\) acts at \\(P(1, 1, 1)\\). Find its moment about the origin.",
        steps: [
          "\\(\\overrightarrow{OP} = \\hat{i} + \\hat{j} + \\hat{k}\\).",
          "\\(\\vec{M} = \\overrightarrow{OP}\\times\\vec{F} = (1\\cdot 3 - 1\\cdot 2)\\hat{i} - (1\\cdot 3 - 1\\cdot 1)\\hat{j} + (1\\cdot 2 - 1\\cdot 1)\\hat{k}\\).",
          "\\(\\vec{M} = \\hat{i} - 2\\hat{j} + \\hat{k}\\).",
        ],
        answer: "\\(\\vec{M} = \\hat{i} - 2\\hat{j} + \\hat{k}\\)",
      },
      practiceSet: [
        { prompt: "Moment of force \\(\\vec{F}\\) acting at \\(P\\) about \\(O\\)?", answer: "\\(\\overrightarrow{OP}\\times\\vec{F}\\)" },
        { prompt: "Is the moment \\(\\vec{r}\\times\\vec{F}\\) or \\(\\vec{F}\\times\\vec{r}\\)?", answer: "\\(\\vec{r}\\times\\vec{F}\\)" },
        { prompt: "\\(\\overrightarrow{OP} = \\hat{i}\\), \\(\\vec{F} = \\hat{j}\\). Moment about \\(O\\)?", answer: "\\(\\hat{k}\\)", method: "\\(\\hat{i}\\times\\hat{j}\\)" },
        { prompt: "Moment of a force about a point — vector or scalar?", answer: "vector" },
      ],
      pyqExampleId: "20886e44-e7f6-4075-bee4-904c75029793",
      traps: [
        {
          title: "Order is \\(\\vec{r} \\times \\vec{F}\\), not \\(\\vec{F} \\times \\vec{r}\\)",
          body:
            "Switching the order flips the sign of the moment by the anti-commutative rule. " +
            "The pivot point comes FIRST: position vector from pivot to application point, THEN cross with force.",
        },
        {
          title: "Moment depends on the pivot — moment of a force about a POINT is unique, but about a LINE is also a vector",
          body:
            "MCQ statements like \\\"moment of a force is independent of point of application\\\" or \\\"moment about a line is a scalar\\\" are common wrong options. " +
            "Moment of a force depends on both the line of action AND the pivot; the moment about a line is the projection of \\(\\vec{r}\\times\\vec{F}\\) onto that line — a scalar, not a vector.",
        },
      ],
    },

    // 5 ───────────────────────────────────────────────────────────────────────
    {
      slug: "scalar-triple-product-and-coplanarity",
      name: "Scalar triple product and coplanarity",
      visualizationSlug: "triple-product-box",
      intuition:
        "The scalar triple product \\([\\vec{a}\\,\\vec{b}\\,\\vec{c}] = \\vec{a}\\cdot(\\vec{b}\\times\\vec{c})\\) is the signed volume of the parallelepiped on the three vectors. " +
        "Three vectors are coplanar precisely when that volume is zero — equivalently, the determinant of their component matrix vanishes. " +
        "This is the single most-used test in HARD PYQs.",
      definition:
        "For \\(\\vec{a}, \\vec{b}, \\vec{c}\\) in \\(\\mathbb{R}^3\\), the scalar triple product is " +
        "\\([\\vec{a}\\,\\vec{b}\\,\\vec{c}] = \\vec{a}\\cdot(\\vec{b}\\times\\vec{c}) = " +
        "\\begin{vmatrix} a_1 & a_2 & a_3 \\\\ b_1 & b_2 & b_3 \\\\ c_1 & c_2 & c_3 \\end{vmatrix}\\). " +
        "Coplanarity criterion: \\(\\vec{a}, \\vec{b}, \\vec{c}\\) are coplanar iff \\([\\vec{a}\\,\\vec{b}\\,\\vec{c}] = 0\\). " +
        "Volume of the parallelepiped on the three vectors is \\(|[\\vec{a}\\,\\vec{b}\\,\\vec{c}]|\\).",
      formula: {
        label: "STP as determinant + coplanarity test",
        latex:
          "[\\vec{a}\\,\\vec{b}\\,\\vec{c}] = \\begin{vmatrix} a_1 & a_2 & a_3 \\\\ b_1 & b_2 & b_3 \\\\ c_1 & c_2 & c_3 \\end{vmatrix} = 0 \\iff \\vec{a},\\vec{b},\\vec{c}\\text{ coplanar}",
        symbols: [
          { symbol: "\\([\\vec{a}\\,\\vec{b}\\,\\vec{c}]\\)", meaning: "scalar triple product (a single number)" },
          { symbol: "\\(\\vec{a}\\cdot(\\vec{b}\\times\\vec{c})\\)", meaning: "equivalent dot-cross form" },
          { symbol: "\\(|[\\vec{a}\\,\\vec{b}\\,\\vec{c}]|\\)", meaning: "volume of the parallelepiped on the three vectors" },
        ],
      },
      authoredExample: {
        prompt:
          "Find \\(p\\) such that \\(\\vec{a} = 2\\hat{i} - 3\\hat{j} + \\hat{k}\\), \\(\\vec{b} = \\hat{i} + 2\\hat{j} - 3\\hat{k}\\) and \\(\\vec{c} = \\hat{j} + p\\hat{k}\\) are coplanar.",
        steps: [
          "Coplanar \\(\\Rightarrow\\) the determinant \\([\\vec{a}\\,\\vec{b}\\,\\vec{c}]\\) is zero.",
          "Set up: \\(\\begin{vmatrix} 2 & -3 & 1 \\\\ 1 & 2 & -3 \\\\ 0 & 1 & p \\end{vmatrix} = 0\\).",
          "Expand along the third row: \\(0\\cdot\\big[(-3)(-3) - (1)(2)\\big] - 1\\cdot\\big[(2)(-3) - (1)(1)\\big] + p\\cdot\\big[(2)(2) - (-3)(1)\\big]\\).",
          "Simplify each cofactor: \\(0 - 1\\cdot(-6 - 1) + p(4 + 3) = 0 + 7 + 7p = 0\\).",
          "Solve: \\(7p = -7 \\Rightarrow p = -1\\).",
        ],
        answer: "\\(p = -1\\)",
      },
      selfCheckExample: {
        prompt:
          "Find the volume of the parallelepiped with edge vectors \\(\\vec{a} = \\hat{i}\\), \\(\\vec{b} = \\hat{j}\\), \\(\\vec{c} = \\hat{i} + \\hat{j} + 2\\hat{k}\\).",
        steps: [
          "Volume \\(= |[\\vec{a}\\,\\vec{b}\\,\\vec{c}]| = \\left|\\begin{vmatrix} 1 & 0 & 0 \\\\ 0 & 1 & 0 \\\\ 1 & 1 & 2 \\end{vmatrix}\\right|\\).",
          "Expand along the first row: \\(1\\cdot(1\\cdot 2 - 0\\cdot 1) = 2\\).",
          "Volume \\(= 2\\).",
        ],
        answer: "Volume \\(= 2\\) cubic units",
      },
      practiceSet: [
        { prompt: "\\([\\vec{a}\\,\\vec{b}\\,\\vec{c}] = 0\\) means the vectors are?", answer: "coplanar" },
        { prompt: "Volume of the parallelepiped on \\(\\vec{a}, \\vec{b}, \\vec{c}\\)?", answer: "\\(|[\\vec{a}\\,\\vec{b}\\,\\vec{c}]|\\)" },
        { prompt: "\\([\\hat{i}\\,\\hat{j}\\,\\hat{k}] = ?\\)", answer: "\\(1\\)" },
        { prompt: "Write the STP as a dot-cross: \\([\\vec{a}\\,\\vec{b}\\,\\vec{c}] = ?\\)", answer: "\\(\\vec{a}\\cdot(\\vec{b}\\times\\vec{c})\\)" },
      ],
      pyqExampleId: "33491eff-866f-48f8-9244-f982244f9ed8",
      traps: [
        {
          title: "STP \\(= 0\\) means coplanar — NOT \\\"\\(\\vec{a}\\) parallel to \\(\\vec{b}\\)\\\"",
          body:
            "Three vectors coplanar means they all fit inside some 2-D plane through the origin. They need not be parallel to each other. " +
            "Parallel-pair is a stronger condition that ALSO makes STP zero, but not the only one.",
        },
        {
          title: "Determinant row/column expansion: pick the row with most zeros",
          body:
            "If one row has a zero (very common in coplanarity problems), expand along it — two of the three cofactors drop out immediately, saving an entire \\(2\\times 2\\) minor.",
        },
      ],
    },

    // 6 ───────────────────────────────────────────────────────────────────────
    {
      slug: "triple-product-cyclic-and-derived-identities",
      name: "STP cyclic property and derived linear-combo identities",
      intuition:
        "The scalar triple product is symmetric under cyclic rotation of its three vectors — \\([\\vec{a}\\,\\vec{b}\\,\\vec{c}] = [\\vec{b}\\,\\vec{c}\\,\\vec{a}] = [\\vec{c}\\,\\vec{a}\\,\\vec{b}]\\) — and flips sign under any single swap. " +
        "Combined with linearity, this generates a family of derived identities that PYQs love to test, including the famous \\((\\vec{a}\\times\\vec{b})\\cdot\\vec{c} + (\\vec{b}\\times\\vec{c})\\cdot\\vec{a} + (\\vec{c}\\times\\vec{a})\\cdot\\vec{b} = 3[\\vec{a}\\,\\vec{b}\\,\\vec{c}]\\). " +
        "When given a constraint like \\(\\vec{a}+2\\vec{b}+3\\vec{c}=\\vec{0}\\), cross-multiply and apply linearity to extract a \\(\\lambda\\) value.",
      definition:
        "Cyclic identity: \\(\\vec{a}\\cdot(\\vec{b}\\times\\vec{c}) = \\vec{b}\\cdot(\\vec{c}\\times\\vec{a}) = \\vec{c}\\cdot(\\vec{a}\\times\\vec{b})\\). " +
        "Anti-cyclic: swapping any two negates the value, e.g. \\(\\vec{a}\\cdot(\\vec{c}\\times\\vec{b}) = -\\vec{a}\\cdot(\\vec{b}\\times\\vec{c})\\). " +
        "Linearity in each slot: \\([(\\alpha\\vec{u}+\\beta\\vec{v})\\,\\vec{b}\\,\\vec{c}] = \\alpha[\\vec{u}\\,\\vec{b}\\,\\vec{c}] + \\beta[\\vec{v}\\,\\vec{b}\\,\\vec{c}]\\). " +
        "If \\(\\vec{a}, \\vec{b}, \\vec{c}\\) are coplanar, \\([\\vec{a}\\,\\vec{b}\\,\\vec{c}] = 0\\) and the derived cyclic sum collapses to zero too.",
      formula: {
        label: "Cyclic + sum identity",
        latex:
          "(\\vec{a}\\times\\vec{b})\\cdot\\vec{c} + (\\vec{b}\\times\\vec{c})\\cdot\\vec{a} + (\\vec{c}\\times\\vec{a})\\cdot\\vec{b} = 3[\\vec{a}\\,\\vec{b}\\,\\vec{c}]",
        symbols: [
          { symbol: "Cyclic ordering", meaning: "\\(\\vec{a} \\to \\vec{b} \\to \\vec{c} \\to \\vec{a}\\) — all three terms are STPs of the same value" },
          { symbol: "\\(3[\\vec{a}\\,\\vec{b}\\,\\vec{c}]\\)", meaning: "the cyclic sum is three times any one of them" },
        ],
      },
      authoredExample: {
        prompt:
          "If \\(\\vec{a} + 2\\vec{b} + 3\\vec{c} = \\vec{0}\\) and \\(\\vec{a}\\times\\vec{b} + \\vec{b}\\times\\vec{c} + \\vec{c}\\times\\vec{a} = \\lambda(\\vec{b}\\times\\vec{c})\\), find \\(\\lambda\\).",
        steps: [
          "From \\(\\vec{a} + 2\\vec{b} + 3\\vec{c} = \\vec{0}\\), write \\(\\vec{a} = -2\\vec{b} - 3\\vec{c}\\).",
          "Substitute into each cross product. " +
            "\\(\\vec{a}\\times\\vec{b} = (-2\\vec{b} - 3\\vec{c})\\times\\vec{b} = -2(\\vec{b}\\times\\vec{b}) - 3(\\vec{c}\\times\\vec{b}) = 0 + 3(\\vec{b}\\times\\vec{c}) = 3\\vec{b}\\times\\vec{c}\\).",
          "Similarly \\(\\vec{c}\\times\\vec{a} = \\vec{c}\\times(-2\\vec{b} - 3\\vec{c}) = -2(\\vec{c}\\times\\vec{b}) - 3(\\vec{c}\\times\\vec{c}) = 2(\\vec{b}\\times\\vec{c}) + 0 = 2\\vec{b}\\times\\vec{c}\\).",
          "Sum: \\(\\vec{a}\\times\\vec{b} + \\vec{b}\\times\\vec{c} + \\vec{c}\\times\\vec{a} = (3 + 1 + 2)(\\vec{b}\\times\\vec{c}) = 6\\,\\vec{b}\\times\\vec{c}\\).",
          "Hence \\(\\lambda = 6\\).",
        ],
        answer: "\\(\\lambda = 6\\)",
      },
      selfCheckExample: {
        prompt:
          "Simplify \\([\\vec{a}\\,\\vec{b}\\,\\vec{c}] + [\\vec{b}\\,\\vec{c}\\,\\vec{a}] + [\\vec{c}\\,\\vec{a}\\,\\vec{b}]\\) using the cyclic property of the scalar triple product.",
        steps: [
          "Cyclic property: \\([\\vec{b}\\,\\vec{c}\\,\\vec{a}] = [\\vec{a}\\,\\vec{b}\\,\\vec{c}]\\) and \\([\\vec{c}\\,\\vec{a}\\,\\vec{b}] = [\\vec{a}\\,\\vec{b}\\,\\vec{c}]\\).",
          "Sum \\(= [\\vec{a}\\,\\vec{b}\\,\\vec{c}] + [\\vec{a}\\,\\vec{b}\\,\\vec{c}] + [\\vec{a}\\,\\vec{b}\\,\\vec{c}] = 3[\\vec{a}\\,\\vec{b}\\,\\vec{c}]\\).",
        ],
        answer: "\\(3[\\vec{a}\\,\\vec{b}\\,\\vec{c}]\\)",
      },
      practiceSet: [
        { prompt: "Is \\([\\vec{a}\\,\\vec{b}\\,\\vec{c}] = [\\vec{b}\\,\\vec{c}\\,\\vec{a}]\\)?", answer: "Yes", method: "cyclic rotation" },
        { prompt: "\\([\\vec{a}\\,\\vec{c}\\,\\vec{b}] = ?\\) in terms of \\([\\vec{a}\\,\\vec{b}\\,\\vec{c}]\\).", answer: "\\(-[\\vec{a}\\,\\vec{b}\\,\\vec{c}]\\)", method: "one swap flips the sign" },
        { prompt: "\\([\\vec{a}\\,\\vec{a}\\,\\vec{b}] = ?\\)", answer: "\\(0\\)", method: "repeated vector" },
        { prompt: "\\([\\vec{a}\\,\\vec{b}\\,\\vec{c}] + [\\vec{b}\\,\\vec{c}\\,\\vec{a}] + [\\vec{c}\\,\\vec{a}\\,\\vec{b}] = ?\\)", answer: "\\(3[\\vec{a}\\,\\vec{b}\\,\\vec{c}]\\)" },
      ],
      pyqExampleId: "e3f7b99f-1721-4e19-a674-58538f43a82a",
      traps: [
        {
          title: "Anti-cyclic = sign flip — don't accidentally drop it",
          body:
            "\\(\\vec{c}\\times\\vec{b} = -\\vec{b}\\times\\vec{c}\\). " +
            "If you absorb a cross-product without tracking the sign, you'll be off by a factor of \\(-1\\) on every other term — turning \\(\\lambda = 6\\) into \\(\\lambda = -6\\) or worse.",
        },
        {
          title: "\\((\\vec{a}\\times\\vec{b})\\cdot\\vec{c} = (\\vec{c}\\times\\vec{a})\\cdot\\vec{b}\\)",
          body:
            "Both are cyclic rotations of \\([\\vec{a}\\,\\vec{b}\\,\\vec{c}]\\). " +
            "An MCQ giving \\(2[\\vec{a}\\,\\vec{b}\\,\\vec{c}]\\) as the cyclic sum is a factor-of-3 wrong option. " +
            "(\\((\\vec{a}\\times\\vec{b})\\times(\\vec{b}\\times\\vec{c})\\cdot\\vec{b}\\) is a different beast — that one is zero by orthogonality.)",
        },
      ],
    },

    // 7 ───────────────────────────────────────────────────────────────────────
    {
      slug: "vector-triple-product-bac-cab",
      name: "Vector triple product (BAC-CAB rule)",
      intuition:
        "Triple products of three vectors that return a VECTOR (not a scalar) expand by the BAC-CAB identity: \\(\\vec{a}\\times(\\vec{b}\\times\\vec{c}) = (\\vec{a}\\cdot\\vec{c})\\vec{b} - (\\vec{a}\\cdot\\vec{b})\\vec{c}\\). " +
        "Read it as \\\"middle dot far times middle, minus middle dot near times far\\\" — a mnemonic for the order of the vectors. " +
        "The result lies in the plane of the two innermost vectors, which is a structural fact you can exploit before any algebra.",
      definition:
        "For any \\(\\vec{a}, \\vec{b}, \\vec{c} \\in \\mathbb{R}^3\\): " +
        "\\(\\vec{a}\\times(\\vec{b}\\times\\vec{c}) = (\\vec{a}\\cdot\\vec{c})\\,\\vec{b} - (\\vec{a}\\cdot\\vec{b})\\,\\vec{c}\\). " +
        "By anti-commutativity, \\((\\vec{a}\\times\\vec{b})\\times\\vec{c} = -\\,\\vec{c}\\times(\\vec{a}\\times\\vec{b}) = (\\vec{a}\\cdot\\vec{c})\\,\\vec{b} - (\\vec{b}\\cdot\\vec{c})\\,\\vec{a}\\). " +
        "Either form lies in the plane of the two inner vectors and is perpendicular to the outer one.",
      formula: {
        label: "BAC-CAB rule",
        latex:
          "\\vec{a}\\times(\\vec{b}\\times\\vec{c}) = (\\vec{a}\\cdot\\vec{c})\\,\\vec{b} - (\\vec{a}\\cdot\\vec{b})\\,\\vec{c}",
        symbols: [
          { symbol: "\\(\\vec{a}\\cdot\\vec{c}, \\vec{a}\\cdot\\vec{b}\\)", meaning: "scalar coefficients" },
          { symbol: "\\(\\vec{b}, \\vec{c}\\)", meaning: "vector basis of the resulting plane" },
          { symbol: "Result direction", meaning: "lies in the plane of \\(\\vec{b}\\) and \\(\\vec{c}\\), perpendicular to \\(\\vec{a}\\)" },
        ],
      },
      authoredExample: {
        prompt:
          "Let \\(\\vec{a} = \\hat{i} - \\hat{j} + \\hat{k}\\) and \\(\\vec{b} = \\hat{i} + 2\\hat{j} - \\hat{k}\\). " +
          "Find \\(\\vec{a}\\times(\\vec{b}\\times\\vec{a})\\) and compute the sum of its components.",
        steps: [
          "Apply BAC-CAB with the middle vector \\(\\vec{b}\\) and outer/repeated \\(\\vec{a}\\): " +
            "\\(\\vec{a}\\times(\\vec{b}\\times\\vec{a}) = (\\vec{a}\\cdot\\vec{a})\\vec{b} - (\\vec{a}\\cdot\\vec{b})\\vec{a}\\).",
          "Compute \\(\\vec{a}\\cdot\\vec{a} = 1 + 1 + 1 = 3\\) and \\(\\vec{a}\\cdot\\vec{b} = 1 - 2 - 1 = -2\\).",
          "Substitute: \\(3\\vec{b} - (-2)\\vec{a} = 3\\vec{b} + 2\\vec{a} = 3(\\hat{i}+2\\hat{j}-\\hat{k}) + 2(\\hat{i}-\\hat{j}+\\hat{k}) = (3+2)\\hat{i} + (6-2)\\hat{j} + (-3+2)\\hat{k}\\).",
          "Result: \\(5\\hat{i} + 4\\hat{j} - \\hat{k}\\). Sum of components: \\(5 + 4 + (-1) = 8\\).",
        ],
        answer: "Sum of components \\(= 8\\)",
      },
      selfCheckExample: {
        prompt:
          "Using the BAC-CAB rule, find \\(\\vec{a}\\times(\\vec{b}\\times\\vec{c})\\) for \\(\\vec{a} = \\hat{i}\\), \\(\\vec{b} = \\hat{j}\\), \\(\\vec{c} = \\hat{i} + \\hat{k}\\).",
        steps: [
          "BAC-CAB: \\(\\vec{a}\\times(\\vec{b}\\times\\vec{c}) = (\\vec{a}\\cdot\\vec{c})\\vec{b} - (\\vec{a}\\cdot\\vec{b})\\vec{c}\\).",
          "\\(\\vec{a}\\cdot\\vec{c} = \\hat{i}\\cdot(\\hat{i}+\\hat{k}) = 1\\); \\(\\vec{a}\\cdot\\vec{b} = \\hat{i}\\cdot\\hat{j} = 0\\).",
          "\\(= 1\\cdot\\vec{b} - 0\\cdot\\vec{c} = \\hat{j}\\).",
        ],
        answer: "\\(\\vec{a}\\times(\\vec{b}\\times\\vec{c}) = \\hat{j}\\)",
      },
      practiceSet: [
        { prompt: "\\(\\vec{a}\\times(\\vec{b}\\times\\vec{c}) = ?\\) (BAC-CAB)", answer: "\\((\\vec{a}\\cdot\\vec{c})\\vec{b} - (\\vec{a}\\cdot\\vec{b})\\vec{c}\\)" },
        { prompt: "\\(\\vec{a}\\times(\\vec{b}\\times\\vec{c})\\) lies in the plane of?", answer: "\\(\\vec{b}\\) and \\(\\vec{c}\\)" },
        { prompt: "\\(\\hat{i}\\times(\\hat{i}\\times\\hat{j}) = ?\\)", answer: "\\(-\\hat{j}\\)", method: "\\((\\hat{i}\\cdot\\hat{j})\\hat{i} - (\\hat{i}\\cdot\\hat{i})\\hat{j}\\)" },
        { prompt: "Does BAC-CAB apply to \\(\\vec{a}\\cdot(\\vec{b}\\times\\vec{c})\\)?", answer: "No", method: "that's a scalar triple product" },
      ],
      pyqExampleId: "946f44d7-3367-4879-a8f1-496b0ff8d88e",
      traps: [
        {
          title: "BAC-CAB only applies to vector triple products — not scalar",
          body:
            "If the expression is \\(\\vec{a}\\cdot(\\vec{b}\\times\\vec{c})\\) (no second cross), it's a scalar triple product, not BAC-CAB. " +
            "Identify the SHAPE first: how many crosses, how many dots — that fixes which identity to use.",
        },
        {
          title: "Cross-then-cross is NOT cross-then-dot-with-different-grouping",
          body:
            "\\((\\vec{a}\\times\\vec{b})\\times\\vec{c}\\) lies in the plane of \\(\\vec{a}, \\vec{b}\\) (the innermost pair); " +
            "\\(\\vec{a}\\times(\\vec{b}\\times\\vec{c})\\) lies in the plane of \\(\\vec{b}, \\vec{c}\\). " +
            "The two are different vectors and PYQs use this asymmetry as the load-bearing distractor.",
        },
        {
          title: "Special triples: if \\(\\vec{a}\\times\\vec{b} = \\vec{c}\\) and \\(\\vec{b}\\times\\vec{c} = \\vec{a}\\), the three vectors are an orthonormal pairwise-perpendicular triple",
          body:
            "Take magnitudes of both equations and use \\(|\\vec{a}\\times\\vec{b}| = |\\vec{a}||\\vec{b}|\\sin\\theta\\) with \\(\\sin\\theta \\leq 1\\) to force \\(|\\vec{a}| = |\\vec{b}| = |\\vec{c}| = 1\\) AND pairwise perpendicularity. " +
            "This is the lever behind both the 2017 \\(\\vec{a}\\times\\vec{b}=\\vec{c}, \\vec{b}\\times\\vec{c}=\\vec{a}\\) classic and the 2026 S10 set.",
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
      label: "Magnitude, components, projection, direction cosines",
      href: "/notes/nda-maths/vectors/magnitude-components-projection",
    },
  ],
};
