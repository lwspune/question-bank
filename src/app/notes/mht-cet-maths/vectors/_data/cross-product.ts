import type { SubtopicNote } from "@/app/notes/_types";

export const CROSS_PRODUCT_NOTE: SubtopicNote = {
  subtopicName: "Cross Product, Angle, and Area",
  title: "Cross Product, Angle, and Area",
  oneLineDefinition:
    "The vector product whose magnitude is the area of a parallelogram and whose direction is the right-hand-rule perpendicular — the engine behind areas, unit normals, angles, and a whole family of vector-equation problems.",
  whyItMatters:
    "At 48 PYQs this is the chapter's biggest subtopic after the scalar triple product, and the toughest — roughly 58% of these are rated HARD. " +
    "Three themes dominate: AREA (triangle, parallelogram, from diagonals, or from a side-plus-diagonal), the PERPENDICULAR DIRECTION (unit normal, vector of a given magnitude perpendicular to two), and VECTOR EQUATIONS that mix a cross and a dot condition (solve for the unknown vector, find an unknown component, or expand a vector triple product with the BAC-CAB rule). " +
    "Master the determinant computation and the |a×b| = |a||b|sin θ relation first — every concept below is built on them.",
  concepts: [
    // 1 — FOUNDATION (no pyqExampleId) ─────────────────────────────────────────
    {
      kind: "formula" as const,
      slug: "cetvec-cross-foundations-determinant",
      name: "The cross product — definition and determinant form",
      visualizationSlug: "right-hand-rule-cross",
      intuition:
        "The cross product of two 3-D vectors produces a THIRD vector that is perpendicular to both, with magnitude equal to the area of the parallelogram they span and direction fixed by the right-hand rule. " +
        "In practice you almost never use the sin θ form to compute it — you expand a 3x3 determinant whose top row is the unit vectors and whose lower two rows are the components of the two vectors.",
      definition:
        "For \\(\\vec{a} = a_1\\hat{i} + a_2\\hat{j} + a_3\\hat{k}\\) and \\(\\vec{b} = b_1\\hat{i} + b_2\\hat{j} + b_3\\hat{k}\\):\n" +
        "- **Geometric form:** \\(\\vec{a}\\times\\vec{b} = |\\vec{a}||\\vec{b}|\\sin\\theta\\,\\hat{n}\\), where \\(\\hat{n}\\) is the unit perpendicular by the right-hand rule\n" +
        "- **Determinant form:** \\(\\vec{a}\\times\\vec{b} = \\begin{vmatrix} \\hat{i} & \\hat{j} & \\hat{k} \\\\ a_1 & a_2 & a_3 \\\\ b_1 & b_2 & b_3 \\end{vmatrix}\\)\n" +
        "- **Anti-commutative:** \\(\\vec{a}\\times\\vec{b} = -\\,\\vec{b}\\times\\vec{a}\\)\n" +
        "- **Self / parallel:** \\(\\vec{a}\\times\\vec{a} = \\vec{0}\\); and \\(\\vec{a}\\times\\vec{b} = \\vec{0} \\iff \\vec{a}\\,\\|\\,\\vec{b}\\) (or one is zero)\n" +
        "- **Standard products:** \\(\\hat{i}\\times\\hat{j} = \\hat{k},\\; \\hat{j}\\times\\hat{k} = \\hat{i},\\; \\hat{k}\\times\\hat{i} = \\hat{j}\\) (cyclic); reverse any pair and the sign flips",
      formula: {
        label: "Cross product as a determinant",
        latex:
          "\\vec{a}\\times\\vec{b} = \\begin{vmatrix} \\hat{i} & \\hat{j} & \\hat{k} \\\\ a_1 & a_2 & a_3 \\\\ b_1 & b_2 & b_3 \\end{vmatrix} = |\\vec{a}||\\vec{b}|\\sin\\theta\\,\\hat{n}",
        symbols: [
          { symbol: "Top row", meaning: "the unit vectors \\(\\hat{i}, \\hat{j}, \\hat{k}\\)" },
          { symbol: "\\(\\theta\\)", meaning: "angle between \\(\\vec{a}\\) and \\(\\vec{b}\\), in \\([0,\\pi]\\)" },
          { symbol: "\\(\\hat{n}\\)", meaning: "unit perpendicular to both, by the right-hand rule" },
        ],
      },
      authoredExample: {
        prompt:
          "Compute \\(\\vec{a}\\times\\vec{b}\\) for \\(\\vec{a} = \\hat{i} + 2\\hat{j} + \\hat{k}\\) and \\(\\vec{b} = 2\\hat{i} + \\hat{j} - \\hat{k}\\).",
        steps: [
          "Set up the determinant: \\(\\begin{vmatrix} \\hat{i} & \\hat{j} & \\hat{k} \\\\ 1 & 2 & 1 \\\\ 2 & 1 & -1 \\end{vmatrix}\\).",
          "\\(\\hat{i}\\)-component: \\((2)(-1) - (1)(1) = -3\\).",
          "\\(\\hat{j}\\)-component: \\(-\\big[(1)(-1) - (1)(2)\\big] = -(-3) = 3\\).",
          "\\(\\hat{k}\\)-component: \\((1)(1) - (2)(2) = -3\\).",
          "So \\(\\vec{a}\\times\\vec{b} = -3\\hat{i} + 3\\hat{j} - 3\\hat{k}\\).",
        ],
        answer: "\\(\\vec{a}\\times\\vec{b} = -3\\hat{i} + 3\\hat{j} - 3\\hat{k}\\)",
      },
      practiceSet: [
        { prompt: "\\(\\hat{i}\\times\\hat{j} = ?\\)", answer: "\\(\\hat{k}\\)" },
        { prompt: "\\(\\hat{k}\\times\\hat{i} = ?\\)", answer: "\\(\\hat{j}\\)", method: "cyclic order" },
        { prompt: "\\(\\hat{j}\\times\\hat{i} = ?\\)", answer: "\\(-\\hat{k}\\)", method: "reverse a pair, flip the sign" },
        { prompt: "\\(\\vec{a}\\times\\vec{a} = ?\\)", answer: "\\(\\vec{0}\\)" },
        { prompt: "If \\(\\vec{a}\\times\\vec{b} = \\vec{0}\\) (both non-zero), the vectors are?", answer: "parallel" },
      ],
      traps: [
        {
          title: "The cross product is a VECTOR, not a scalar",
          body:
            "\\(\\vec{a}\\times\\vec{b}\\) has three components — it is a vector. " +
            "The dot product \\(\\vec{a}\\cdot\\vec{b}\\) is the scalar. Mixing them up (e.g. expecting a single number from a cross product) is the most common slip.",
        },
        {
          title: "Watch the SIGN on the \\(\\hat{j}\\)-component",
          body:
            "Expanding the determinant, the middle (\\(\\hat{j}\\)) cofactor carries a leading minus: \\(-\\big[a_1 b_3 - a_3 b_1\\big]\\). " +
            "Forgetting this minus is the single most frequent computational error in this whole subtopic.",
        },
        {
          title: "\\(\\vec{a}\\times\\vec{b} = \\vec{0}\\) does NOT mean both vectors are zero",
          body:
            "It means \\(\\vec{a}\\) and \\(\\vec{b}\\) are parallel — one is a scalar multiple of the other. " +
            "Combined with \\(\\vec{a}, \\vec{b} \\neq \\vec{0}\\), it gives \\(\\vec{a} = \\lambda\\vec{b}\\) for some scalar \\(\\lambda\\).",
        },
      ],
    },

    // 2 — magnitude and angle ─────────────────────────────────────────────────
    {
      kind: "formula" as const,
      slug: "cetvec-cross-magnitude-and-angle",
      name: "Magnitude of the cross product, angle, and the Lagrange identity",
      intuition:
        "The magnitude of the cross product is \\(|\\vec{a}||\\vec{b}|\\sin\\theta\\) — a single number you can read off when you know the two magnitudes and the angle between them. " +
        "Rearranged, it isolates \\(\\sin\\theta\\); paired with the dot product it isolates \\(\\cos\\theta\\). " +
        "The Lagrange identity bundles both into one equation, letting you cross between cross and dot without ever finding the angle.",
      definition:
        "For non-zero \\(\\vec{a}, \\vec{b}\\) at angle \\(\\theta\\):\n" +
        "- **Magnitude:** \\(|\\vec{a}\\times\\vec{b}| = |\\vec{a}||\\vec{b}|\\sin\\theta\\)\n" +
        "- **Angle:** \\(\\sin\\theta = \\dfrac{|\\vec{a}\\times\\vec{b}|}{|\\vec{a}||\\vec{b}|}\\) and \\(\\cos\\theta = \\dfrac{\\vec{a}\\cdot\\vec{b}}{|\\vec{a}||\\vec{b}|}\\)\n" +
        "- **Lagrange identity:** \\(|\\vec{a}\\times\\vec{b}|^2 + (\\vec{a}\\cdot\\vec{b})^2 = |\\vec{a}|^2|\\vec{b}|^2\\)",
      formula: {
        label: "Magnitude and Lagrange",
        latex:
          "|\\vec{a}\\times\\vec{b}| = |\\vec{a}||\\vec{b}|\\sin\\theta \\qquad |\\vec{a}\\times\\vec{b}|^2 + (\\vec{a}\\cdot\\vec{b})^2 = |\\vec{a}|^2|\\vec{b}|^2",
        symbols: [
          { symbol: "\\(\\sin\\theta\\)", meaning: "non-negative for \\(\\theta \\in [0,\\pi]\\) — the magnitude is a length" },
          { symbol: "Lagrange identity", meaning: "from \\(\\sin^2\\theta + \\cos^2\\theta = 1\\) times \\(|\\vec{a}|^2|\\vec{b}|^2\\)" },
        ],
      },
      authoredExample: {
        prompt:
          "If \\(|\\vec{a}| = 4\\), \\(|\\vec{b}| = 5\\) and the angle between them is \\(120^\\circ\\), find \\(|\\vec{a}\\times\\vec{b}|\\).",
        steps: [
          "\\(|\\vec{a}\\times\\vec{b}| = |\\vec{a}||\\vec{b}|\\sin 120^\\circ = 4\\cdot 5\\cdot\\dfrac{\\sqrt{3}}{2}\\).",
          "\\(= 20\\cdot\\dfrac{\\sqrt{3}}{2} = 10\\sqrt{3}\\).",
        ],
        answer: "\\(|\\vec{a}\\times\\vec{b}| = 10\\sqrt{3}\\)",
      },
      selfCheckExample: {
        prompt:
          "If \\(|\\vec{a}| = 6\\), \\(|\\vec{b}| = 2\\) and \\(|\\vec{a}\\times\\vec{b}| = 6\\), find \\(\\vec{a}\\cdot\\vec{b}\\) (take the acute angle).",
        steps: [
          "\\(\\sin\\theta = \\dfrac{|\\vec{a}\\times\\vec{b}|}{|\\vec{a}||\\vec{b}|} = \\dfrac{6}{12} = \\dfrac{1}{2}\\), so \\(\\theta = 30^\\circ\\) and \\(\\cos\\theta = \\dfrac{\\sqrt{3}}{2}\\).",
          "\\(\\vec{a}\\cdot\\vec{b} = |\\vec{a}||\\vec{b}|\\cos\\theta = 12\\cdot\\dfrac{\\sqrt{3}}{2} = 6\\sqrt{3}\\).",
        ],
        answer: "\\(\\vec{a}\\cdot\\vec{b} = 6\\sqrt{3}\\)",
      },
      practiceSet: [
        { prompt: "\\(|\\vec{a}\\times\\vec{b}|\\) for \\(|\\vec{a}| = 2\\), \\(|\\vec{b}| = 3\\), angle \\(90^\\circ\\)?", answer: "\\(6\\)" },
        { prompt: "\\(|\\vec{a}\\times\\vec{b}|\\) for \\(|\\vec{a}| = 5\\), \\(|\\vec{b}| = 4\\), angle \\(30^\\circ\\)?", answer: "\\(10\\)", method: "\\(5\\cdot 4\\cdot\\tfrac{1}{2}\\)" },
        { prompt: "\\(\\sin\\theta = ?\\) in terms of the cross product.", answer: "\\(\\tfrac{|\\vec{a}\\times\\vec{b}|}{|\\vec{a}||\\vec{b}|}\\)" },
        { prompt: "Lagrange: \\(|\\vec{a}\\times\\vec{b}|^2 + (\\vec{a}\\cdot\\vec{b})^2 = ?\\)", answer: "\\(|\\vec{a}|^2|\\vec{b}|^2\\)" },
      ],
      pyqExampleId: "0cbec2a2-2c52-4da8-ac85-b1b94add5eff",
      traps: [
        {
          title: "\\(\\sin\\theta\\) is the same for \\(\\theta\\) and \\(180^\\circ - \\theta\\)",
          body:
            "A magnitude of \\(48\\) at \\(150^\\circ\\) and at \\(30^\\circ\\) are identical because \\(\\sin 150^\\circ = \\sin 30^\\circ = \\tfrac{1}{2}\\). " +
            "So \\(|\\vec{a}\\times\\vec{b}|\\) alone never fixes the angle — it cannot tell acute from obtuse. The dot product (with its sign) does.",
        },
        {
          title: "Use Lagrange to skip finding the angle",
          body:
            "When a problem gives two of \\(\\{|\\vec{a}|, |\\vec{b}|, |\\vec{a}\\times\\vec{b}|, \\vec{a}\\cdot\\vec{b}\\}\\) and asks for a third, \\(|\\vec{a}\\times\\vec{b}|^2 + (\\vec{a}\\cdot\\vec{b})^2 = |\\vec{a}|^2|\\vec{b}|^2\\) gives it directly — no \\(\\theta\\) needed.",
        },
      ],
    },

    // 3 — area of a triangle ──────────────────────────────────────────────────
    {
      kind: "formula" as const,
      slug: "cetvec-cross-area-of-triangle",
      name: "Area of a triangle from two side vectors",
      visualizationSlug: "cross-product-area",
      intuition:
        "Build two edge vectors from a common vertex, cross them, and halve the magnitude — that is the area of the triangle. " +
        "The half is the whole point: the cross product gives the parallelogram, and a triangle is exactly half of it. " +
        "When the area is GIVEN and a coordinate is unknown, set up the same equation and solve.",
      definition:
        "For a triangle with vertices \\(A, B, C\\), form \\(\\overrightarrow{AB} = B - A\\) and \\(\\overrightarrow{AC} = C - A\\). " +
        "Then **Area** \\(= \\dfrac{1}{2}\\,|\\overrightarrow{AB} \\times \\overrightarrow{AC}|\\). " +
        "Equivalently, for a triangle whose two adjacent SIDES are the vectors \\(\\vec{a}\\) and \\(\\vec{b}\\), the area is \\(\\dfrac{1}{2}|\\vec{a}\\times\\vec{b}|\\).",
      formula: {
        label: "Triangle area",
        latex:
          "\\text{Area} = \\tfrac{1}{2}\\,|\\overrightarrow{AB} \\times \\overrightarrow{AC}|",
        symbols: [
          { symbol: "\\(\\overrightarrow{AB}, \\overrightarrow{AC}\\)", meaning: "two edge vectors from the SAME vertex \\(A\\)" },
          { symbol: "\\(\\tfrac{1}{2}\\)", meaning: "a triangle is half the parallelogram on the same two edges" },
        ],
      },
      authoredExample: {
        prompt:
          "Find the area of the triangle with vertices \\(A(1,1,1)\\), \\(B(2,3,1)\\) and \\(C(1,2,3)\\).",
        steps: [
          "\\(\\overrightarrow{AB} = B - A = \\hat{i} + 2\\hat{j}\\); \\(\\overrightarrow{AC} = C - A = \\hat{j} + 2\\hat{k}\\).",
          "\\(\\overrightarrow{AB}\\times\\overrightarrow{AC} = \\begin{vmatrix} \\hat{i} & \\hat{j} & \\hat{k} \\\\ 1 & 2 & 0 \\\\ 0 & 1 & 2 \\end{vmatrix} = (4)\\hat{i} - (2)\\hat{j} + (1)\\hat{k}\\).",
          "Magnitude: \\(\\sqrt{16 + 4 + 1} = \\sqrt{21}\\).",
          "Area \\(= \\tfrac{1}{2}\\sqrt{21}\\).",
        ],
        answer: "Area \\(= \\dfrac{\\sqrt{21}}{2}\\) square units",
      },
      selfCheckExample: {
        prompt:
          "The area of the triangle with vertices \\((0,0,0)\\), \\((2,0,0)\\) and \\((0,3,0)\\) is?",
        steps: [
          "Edges from the origin: \\(\\vec{a} = 2\\hat{i}\\), \\(\\vec{b} = 3\\hat{j}\\).",
          "\\(\\vec{a}\\times\\vec{b} = 6\\hat{k}\\), magnitude \\(6\\).",
          "Area \\(= \\tfrac{1}{2}\\cdot 6 = 3\\).",
        ],
        answer: "Area \\(= 3\\) square units",
      },
      practiceSet: [
        { prompt: "Triangle area with edge vectors \\(\\vec{a}, \\vec{b}\\)?", answer: "\\(\\tfrac{1}{2}|\\vec{a}\\times\\vec{b}|\\)" },
        { prompt: "For vertices \\(A, B, C\\), which two vectors do you cross?", answer: "\\(\\overrightarrow{AB}\\) and \\(\\overrightarrow{AC}\\)", method: "same vertex" },
        { prompt: "If \\(|\\overrightarrow{AB}\\times\\overrightarrow{AC}| = 10\\), the triangle area is?", answer: "\\(5\\)" },
        { prompt: "Triangle area with sides \\(\\hat{i}\\) and \\(\\hat{j}\\)?", answer: "\\(\\tfrac{1}{2}\\)" },
      ],
      pyqExampleId: "d871fc11-57fe-4e25-93e3-4b9d89dbc94b",
      traps: [
        {
          title: "The HALF is on the triangle, not the parallelogram",
          body:
            "Triangle area is \\(\\tfrac{1}{2}|\\vec{a}\\times\\vec{b}|\\); parallelogram area is the full \\(|\\vec{a}\\times\\vec{b}|\\). " +
            "Dropping the \\(\\tfrac{1}{2}\\) doubles your answer — a classic distractor option.",
        },
        {
          title: "When area is GIVEN, expect TWO values of the unknown",
          body:
            "Setting \\(\\tfrac{1}{2}|\\overrightarrow{AB}\\times\\overrightarrow{AC}| = \\) (given) leads to a quadratic in the unknown coordinate, so it usually has two roots. " +
            "Pick the one that appears in the options — both may be geometrically valid.",
        },
        {
          title: "Cross edges from the SAME vertex",
          body:
            "Use \\(\\overrightarrow{AB}\\) and \\(\\overrightarrow{AC}\\) (both start at \\(A\\)) — not \\(\\overrightarrow{AB}\\) and \\(\\overrightarrow{BC}\\). " +
            "Mixing base points gives a wrong vector and a wrong area.",
        },
      ],
    },

    // 4 — area of a parallelogram ─────────────────────────────────────────────
    {
      kind: "formula" as const,
      slug: "cetvec-cross-area-of-parallelogram",
      name: "Area of a parallelogram — from sides, diagonals, or a side and a diagonal",
      visualizationSlug: "parallelogram-diagonals",
      intuition:
        "A parallelogram on two adjacent side vectors has area \\(|\\vec{a}\\times\\vec{b}|\\) — no half this time. " +
        "If instead you are handed the two DIAGONALS, the area is HALF the magnitude of their cross product. " +
        "And if you are given one side plus one diagonal, recover the other side by subtraction, then cross the two sides.",
      definition:
        "- **From two adjacent sides** \\(\\vec{a}, \\vec{b}\\): Area \\(= |\\vec{a}\\times\\vec{b}|\\).\n" +
        "- **From the two diagonals** \\(\\vec{d_1}, \\vec{d_2}\\): Area \\(= \\dfrac{1}{2}|\\vec{d_1}\\times\\vec{d_2}|\\).\n" +
        "- **From a side and a diagonal:** if \\(\\vec{a}\\) is a side and \\(\\vec{c}\\) the diagonal from the same vertex, the adjacent side is \\(\\vec{b} = \\vec{c} - \\vec{a}\\); then Area \\(= |\\vec{a}\\times\\vec{b}|\\).",
      formula: {
        label: "Parallelogram areas",
        latex:
          "\\text{Area} = |\\vec{a}\\times\\vec{b}| \\qquad \\text{Area}_{\\text{diagonals}} = \\tfrac{1}{2}|\\vec{d_1}\\times\\vec{d_2}|",
        symbols: [
          { symbol: "\\(\\vec{a}, \\vec{b}\\)", meaning: "two adjacent SIDES" },
          { symbol: "\\(\\vec{d_1}, \\vec{d_2}\\)", meaning: "two DIAGONALS — note the extra \\(\\tfrac{1}{2}\\)" },
        ],
      },
      authoredExample: {
        prompt:
          "Find the area of the parallelogram whose diagonals are \\(\\vec{d_1} = 2\\hat{i} + \\hat{j} - 2\\hat{k}\\) and \\(\\vec{d_2} = \\hat{i} + 2\\hat{j} + 2\\hat{k}\\).",
        steps: [
          "Diagonals given \\(\\Rightarrow\\) Area \\(= \\tfrac{1}{2}|\\vec{d_1}\\times\\vec{d_2}|\\).",
          "\\(\\vec{d_1}\\times\\vec{d_2} = \\begin{vmatrix} \\hat{i} & \\hat{j} & \\hat{k} \\\\ 2 & 1 & -2 \\\\ 1 & 2 & 2 \\end{vmatrix} = (2+4)\\hat{i} - (4+2)\\hat{j} + (4-1)\\hat{k} = 6\\hat{i} - 6\\hat{j} + 3\\hat{k}\\).",
          "Magnitude: \\(\\sqrt{36 + 36 + 9} = \\sqrt{81} = 9\\).",
          "Area \\(= \\tfrac{1}{2}\\cdot 9 = 4.5\\).",
        ],
        answer: "Area \\(= 4.5\\) square units",
      },
      selfCheckExample: {
        prompt:
          "One side of a parallelogram is \\(\\vec{a} = 2\\hat{i} + \\hat{j}\\) and the diagonal from the same vertex is \\(\\vec{c} = 3\\hat{i} + 4\\hat{j}\\). Find the area.",
        steps: [
          "Adjacent side: \\(\\vec{b} = \\vec{c} - \\vec{a} = \\hat{i} + 3\\hat{j}\\).",
          "\\(\\vec{a}\\times\\vec{b} = (2\\cdot 3 - 1\\cdot 1)\\hat{k} = 5\\hat{k}\\), magnitude \\(5\\).",
          "Area \\(= |\\vec{a}\\times\\vec{b}| = 5\\).",
        ],
        answer: "Area \\(= 5\\) square units",
      },
      practiceSet: [
        { prompt: "Parallelogram area from two SIDES \\(\\vec{a}, \\vec{b}\\)?", answer: "\\(|\\vec{a}\\times\\vec{b}|\\)" },
        { prompt: "Parallelogram area from two DIAGONALS \\(\\vec{d_1}, \\vec{d_2}\\)?", answer: "\\(\\tfrac{1}{2}|\\vec{d_1}\\times\\vec{d_2}|\\)" },
        { prompt: "Side \\(\\vec{a}\\), diagonal \\(\\vec{c}\\) from same vertex — the other side is?", answer: "\\(\\vec{c} - \\vec{a}\\)" },
        { prompt: "If two diagonals are \\(\\hat{i}\\) and \\(\\hat{j}\\), the area is?", answer: "\\(\\tfrac{1}{2}\\)" },
      ],
      pyqExampleId: "5683325a-1a99-4b53-bcfe-6322933f286e",
      traps: [
        {
          title: "SIDES use no \\(\\tfrac{1}{2}\\); DIAGONALS do",
          body:
            "Read the problem carefully: \\(|\\vec{a}\\times\\vec{b}|\\) when \\(\\vec{a}, \\vec{b}\\) are SIDES, but \\(\\tfrac{1}{2}|\\vec{d_1}\\times\\vec{d_2}|\\) when they are DIAGONALS. " +
            "Treating diagonals as sides doubles the area.",
        },
        {
          title: "A diagonal is the SUM of the two sides, not one of them",
          body:
            "For a parallelogram on sides \\(\\vec{a}, \\vec{b}\\) the diagonals are \\(\\vec{a}+\\vec{b}\\) and \\(\\vec{a}-\\vec{b}\\). " +
            "So given a side and a diagonal, the missing side is the DIFFERENCE \\(\\vec{c} - \\vec{a}\\) — subtract, don't add.",
        },
      ],
    },

    // 5 — area-scaling identities ─────────────────────────────────────────────
    {
      kind: "formula" as const,
      slug: "cetvec-cross-scaling-identities",
      name: "Bilinear expansion and area-scaling identities",
      intuition:
        "When both sides of a cross product are linear combinations of two base vectors, expand using distributivity and anti-commutativity — the \\(\\vec{a}\\times\\vec{a}\\) and \\(\\vec{b}\\times\\vec{b}\\) terms vanish, leaving a clean multiple of \\(\\vec{a}\\times\\vec{b}\\). " +
        "The signature special case is \\((\\vec{a}-\\vec{b})\\times(\\vec{a}+\\vec{b}) = 2(\\vec{a}\\times\\vec{b})\\). " +
        "This turns 'find the new area' problems into a single coefficient times the old area.",
      definition:
        "For any scalars: \\((p\\vec{a} + q\\vec{b}) \\times (r\\vec{a} + s\\vec{b}) = (ps - qr)\\,(\\vec{a}\\times\\vec{b})\\), " +
        "because \\(\\vec{a}\\times\\vec{a} = \\vec{b}\\times\\vec{b} = \\vec{0}\\) and \\(\\vec{b}\\times\\vec{a} = -\\vec{a}\\times\\vec{b}\\). " +
        "Special case: \\((\\vec{a}-\\vec{b})\\times(\\vec{a}+\\vec{b}) = 2(\\vec{a}\\times\\vec{b})\\). " +
        "So if the original area is \\(|\\vec{a}\\times\\vec{b}|\\), the new parallelogram on \\(p\\vec{a}+q\\vec{b}\\) and \\(r\\vec{a}+s\\vec{b}\\) has area \\(|ps-qr|\\,|\\vec{a}\\times\\vec{b}|\\).",
      formula: {
        label: "Bilinear cross-expansion",
        latex:
          "(p\\vec{a} + q\\vec{b}) \\times (r\\vec{a} + s\\vec{b}) = (ps - qr)\\,(\\vec{a}\\times\\vec{b})",
        symbols: [
          { symbol: "\\(ps - qr\\)", meaning: "the determinant of the coefficient matrix \\(\\begin{vmatrix} p & q \\\\ r & s \\end{vmatrix}\\)" },
          { symbol: "\\(\\vec{a}\\times\\vec{a}, \\vec{b}\\times\\vec{b}\\)", meaning: "both \\(\\vec{0}\\), so they drop out" },
        ],
      },
      authoredExample: {
        prompt:
          "If the parallelogram on \\(\\vec{a}, \\vec{b}\\) has area \\(20\\), find the area of the parallelogram on \\(2\\vec{a} + \\vec{b}\\) and \\(\\vec{a} + 2\\vec{b}\\).",
        steps: [
          "Expand: \\((2\\vec{a}+\\vec{b})\\times(\\vec{a}+2\\vec{b}) = (2\\cdot 2 - 1\\cdot 1)(\\vec{a}\\times\\vec{b}) = 3(\\vec{a}\\times\\vec{b})\\).",
          "New area \\(= |3|\\cdot|\\vec{a}\\times\\vec{b}| = 3\\cdot 20 = 60\\).",
        ],
        answer: "New area \\(= 60\\) square units",
      },
      selfCheckExample: {
        prompt:
          "Simplify \\((\\vec{a} - \\vec{b}) \\times (\\vec{a} + \\vec{b})\\) in terms of \\(\\vec{a}\\times\\vec{b}\\).",
        steps: [
          "Distribute: \\(\\vec{a}\\times\\vec{a} + \\vec{a}\\times\\vec{b} - \\vec{b}\\times\\vec{a} - \\vec{b}\\times\\vec{b}\\).",
          "Drop the zero terms; use \\(\\vec{b}\\times\\vec{a} = -\\vec{a}\\times\\vec{b}\\): \\(= \\vec{a}\\times\\vec{b} + \\vec{a}\\times\\vec{b} = 2(\\vec{a}\\times\\vec{b})\\).",
        ],
        answer: "\\(2(\\vec{a}\\times\\vec{b})\\)",
      },
      practiceSet: [
        { prompt: "\\((\\vec{a}-\\vec{b})\\times(\\vec{a}+\\vec{b}) = ?\\)", answer: "\\(2(\\vec{a}\\times\\vec{b})\\)" },
        { prompt: "\\((3\\vec{a}+2\\vec{b})\\times(\\vec{a}+3\\vec{b}) = ?\\,(\\vec{a}\\times\\vec{b})\\)", answer: "\\(7\\)", method: "\\(3\\cdot 3 - 2\\cdot 1\\)" },
        { prompt: "If area on \\(\\vec{a}, \\vec{b}\\) is \\(10\\), area on \\(\\vec{a}+\\vec{b}, \\vec{a}-\\vec{b}\\)?", answer: "\\(20\\)", method: "factor \\(|{-2}| = 2\\)" },
        { prompt: "\\((p\\vec{a}+q\\vec{b})\\times(r\\vec{a}+s\\vec{b})\\) coefficient of \\(\\vec{a}\\times\\vec{b}\\)?", answer: "\\(ps - qr\\)" },
      ],
      pyqExampleId: "0aeab4ef-cf0b-4472-a6b5-330136c5b71d",
      traps: [
        {
          title: "Keep the cross-terms in order",
          body:
            "When expanding \\((p\\vec{a}+q\\vec{b})\\times(r\\vec{a}+s\\vec{b})\\) you get \\(ps(\\vec{a}\\times\\vec{b}) + qr(\\vec{b}\\times\\vec{a})\\). " +
            "The second term flips sign to \\(-qr(\\vec{a}\\times\\vec{b})\\), leaving \\((ps-qr)\\) — NOT \\((ps+qr)\\).",
        },
        {
          title: "Area takes the ABSOLUTE value of the coefficient",
          body:
            "If \\(ps - qr\\) is negative, the area is still \\(|ps-qr|\\cdot|\\vec{a}\\times\\vec{b}|\\). " +
            "A negative scaling factor doesn't make a negative area.",
        },
      ],
    },

    // 6 — unit vector perpendicular ───────────────────────────────────────────
    {
      kind: "formula" as const,
      slug: "cetvec-cross-unit-perpendicular",
      name: "Unit (and given-magnitude) vector perpendicular to two vectors",
      visualizationSlug: "unit-normal-vector",
      intuition:
        "Any vector perpendicular to both \\(\\vec{a}\\) and \\(\\vec{b}\\) lies along their cross product. " +
        "Normalise it (divide by its magnitude) to get a UNIT perpendicular; scale it to any required length. " +
        "Because two opposite directions both qualify, there are always exactly TWO unit perpendiculars.",
      definition:
        "If \\(\\vec{a}, \\vec{b}\\) are not parallel, a unit vector perpendicular to both is " +
        "\\(\\hat{n} = \\pm\\dfrac{\\vec{a}\\times\\vec{b}}{|\\vec{a}\\times\\vec{b}|}\\). " +
        "A vector of magnitude \\(m\\) perpendicular to both is \\(\\pm m\\,\\dfrac{\\vec{a}\\times\\vec{b}}{|\\vec{a}\\times\\vec{b}|}\\). " +
        "Both signs are valid unless the question fixes a direction.",
      formula: {
        label: "Unit / scaled perpendicular",
        latex:
          "\\hat{n} = \\pm\\dfrac{\\vec{a}\\times\\vec{b}}{|\\vec{a}\\times\\vec{b}|} \\qquad \\vec{v}_{|m|} = \\pm\\, m\\,\\dfrac{\\vec{a}\\times\\vec{b}}{|\\vec{a}\\times\\vec{b}|}",
        symbols: [
          { symbol: "\\(\\vec{a}\\times\\vec{b}\\)", meaning: "perpendicular to both \\(\\vec{a}\\) and \\(\\vec{b}\\)" },
          { symbol: "\\(\\pm\\)", meaning: "two opposite unit perpendiculars exist" },
          { symbol: "\\(m\\)", meaning: "required magnitude, scaling the unit perpendicular" },
        ],
      },
      authoredExample: {
        prompt:
          "Find a vector of magnitude \\(10\\) perpendicular to both \\(\\vec{a} = \\hat{i} + \\hat{j} + \\hat{k}\\) and \\(\\vec{b} = \\hat{i} - \\hat{j} + \\hat{k}\\).",
        steps: [
          "\\(\\vec{a}\\times\\vec{b} = \\begin{vmatrix} \\hat{i} & \\hat{j} & \\hat{k} \\\\ 1 & 1 & 1 \\\\ 1 & -1 & 1 \\end{vmatrix} = 2\\hat{i} + 0\\hat{j} - 2\\hat{k}\\).",
          "Magnitude: \\(|\\vec{a}\\times\\vec{b}| = \\sqrt{4 + 0 + 4} = 2\\sqrt{2}\\).",
          "Unit perpendicular: \\(\\dfrac{2\\hat{i} - 2\\hat{k}}{2\\sqrt{2}} = \\dfrac{1}{\\sqrt{2}}(\\hat{i} - \\hat{k})\\).",
          "Scale to magnitude \\(10\\): \\(\\pm 10\\cdot\\dfrac{1}{\\sqrt{2}}(\\hat{i} - \\hat{k}) = \\pm 5\\sqrt{2}\\,(\\hat{i} - \\hat{k})\\).",
        ],
        answer: "\\(\\pm 5\\sqrt{2}\\,(\\hat{i} - \\hat{k})\\)",
      },
      selfCheckExample: {
        prompt:
          "How many unit vectors are perpendicular to both \\(\\vec{a} = \\hat{i} + \\hat{j}\\) and \\(\\vec{b} = \\hat{j} + \\hat{k}\\)?",
        steps: [
          "\\(\\vec{a}\\) and \\(\\vec{b}\\) are not parallel, so \\(\\vec{a}\\times\\vec{b} \\neq \\vec{0}\\).",
          "There are exactly two unit perpendiculars, \\(\\pm\\dfrac{\\vec{a}\\times\\vec{b}}{|\\vec{a}\\times\\vec{b}|}\\).",
        ],
        answer: "Two",
      },
      practiceSet: [
        { prompt: "Unit vector perpendicular to both \\(\\vec{a}, \\vec{b}\\)?", answer: "\\(\\pm\\tfrac{\\vec{a}\\times\\vec{b}}{|\\vec{a}\\times\\vec{b}|}\\)" },
        { prompt: "How many unit vectors are perpendicular to two non-parallel vectors?", answer: "two (opposite)" },
        { prompt: "Vector of magnitude \\(m\\) perpendicular to both?", answer: "\\(\\pm m\\,\\tfrac{\\vec{a}\\times\\vec{b}}{|\\vec{a}\\times\\vec{b}|}\\)" },
        { prompt: "Unit vector perpendicular to both \\(\\hat{i}\\) and \\(\\hat{j}\\)?", answer: "\\(\\pm\\hat{k}\\)" },
      ],
      pyqExampleId: "b4f27ade-5352-452a-bb8b-ec18c9d57641",
      traps: [
        {
          title: "Both \\(\\pm\\) signs are valid answers",
          body:
            "If the question doesn't pin down a direction, \\(+\\hat{n}\\) and \\(-\\hat{n}\\) are equally correct — accept whichever option is listed. " +
            "Some PYQs add a constraint (e.g. 'with positive \\(z\\)') precisely to break this tie.",
        },
        {
          title: "For perpendicular to \\(\\vec{a}+\\vec{b}\\) and \\(\\vec{a}-\\vec{b}\\), use the shortcut",
          body:
            "\\((\\vec{a}+\\vec{b})\\times(\\vec{a}-\\vec{b}) = -2(\\vec{a}\\times\\vec{b})\\), which is parallel to \\(\\vec{a}\\times\\vec{b}\\). " +
            "So the unit perpendicular to those combinations is the same as the unit perpendicular to \\(\\vec{a}\\) and \\(\\vec{b}\\) — compute \\(\\vec{a}\\times\\vec{b}\\) directly and skip the longer cross product.",
        },
        {
          title: "Confirm the magnitude is actually \\(1\\)",
          body:
            "A vector pointing in the right direction is only a UNIT vector if its magnitude equals \\(1\\). Always divide by \\(|\\vec{a}\\times\\vec{b}|\\) — don't select an un-normalised option.",
        },
      ],
    },

    // 7 — solving vector equations ────────────────────────────────────────────
    {
      kind: "formula" as const,
      slug: "cetvec-cross-solving-vector-equations",
      name: "Solving a vector equation: a cross condition plus a scalar condition",
      intuition:
        "A single equation \\(\\vec{r}\\times\\vec{a} = \\vec{b}\\) does not pin down \\(\\vec{r}\\) — any multiple of \\(\\vec{a}\\) can be added without changing the cross product. " +
        "Pair it with a scalar (dot) condition like \\(\\vec{r}\\cdot\\vec{c} = k\\) and the system becomes determined. " +
        "Write \\(\\vec{r} = (x,y,z)\\), turn the cross equation into three component equations, add the dot condition, and solve the linear system.",
      definition:
        "To solve \\(\\vec{a}\\times\\vec{r} = \\vec{b}\\) together with a scalar condition such as \\(\\vec{a}\\cdot\\vec{r} = k\\):\n" +
        "- Set \\(\\vec{r} = x\\hat{i} + y\\hat{j} + z\\hat{k}\\) and expand \\(\\vec{a}\\times\\vec{r}\\) as a determinant.\n" +
        "- Equate components with \\(\\vec{b}\\) to get three (dependent) linear equations.\n" +
        "- Add the scalar condition to close the system, then solve.\n" +
        "Pattern \\(\\vec{a}\\times\\vec{b} = \\vec{a}\\times\\vec{c}\\) rearranges to \\(\\vec{a}\\times(\\vec{b}-\\vec{c}) = \\vec{0}\\), so \\(\\vec{b}-\\vec{c} = \\lambda\\vec{a}\\) — substitute into the scalar condition to find \\(\\lambda\\).",
      formula: {
        label: "Cross plus scalar condition",
        latex:
          "\\vec{a}\\times\\vec{r} = \\vec{b}, \\;\\; \\vec{a}\\cdot\\vec{r} = k \\;\\;\\Longrightarrow\\;\\; \\vec{r}\\text{ is uniquely determined}",
        symbols: [
          { symbol: "Cross condition", meaning: "fixes \\(\\vec{r}\\) only up to a multiple of \\(\\vec{a}\\)" },
          { symbol: "Scalar condition", meaning: "removes the remaining freedom" },
        ],
      },
      authoredExample: {
        prompt:
          "Find \\(\\vec{r}\\) such that \\(\\vec{a}\\times\\vec{r} = \\vec{b}\\) and \\(\\vec{a}\\cdot\\vec{r} = 4\\), where \\(\\vec{a} = \\hat{i} + \\hat{j} + \\hat{k}\\) and \\(\\vec{b} = \\hat{i} - \\hat{k}\\).",
        steps: [
          "Let \\(\\vec{r} = (x,y,z)\\). Then \\(\\vec{a}\\times\\vec{r} = (z - y)\\hat{i} + (x - z)\\hat{j} + (y - x)\\hat{k}\\).",
          "Equate to \\(\\vec{b} = (1, 0, -1)\\): \\(z - y = 1\\), \\(x - z = 0\\), \\(y - x = -1\\).",
          "From these, \\(x = z\\) and \\(y = x - 1\\). The scalar condition \\(\\vec{a}\\cdot\\vec{r} = x + y + z = 4\\).",
          "Substitute: \\(x + (x-1) + x = 4 \\Rightarrow 3x = 5 \\Rightarrow x = \\tfrac{5}{3}\\), so \\(y = \\tfrac{2}{3}\\), \\(z = \\tfrac{5}{3}\\).",
        ],
        answer: "\\(\\vec{r} = \\tfrac{5}{3}\\hat{i} + \\tfrac{2}{3}\\hat{j} + \\tfrac{5}{3}\\hat{k}\\)",
      },
      selfCheckExample: {
        prompt:
          "Given \\(\\vec{a} = \\hat{i} + \\hat{j} + \\hat{k}\\), \\(\\vec{a}\\cdot\\vec{b} = 1\\) and \\(\\vec{a}\\times\\vec{b} = \\hat{j} - \\hat{k}\\), find \\(\\vec{b}\\).",
        steps: [
          "Let \\(\\vec{b} = (x,y,z)\\). Then \\(\\vec{a}\\times\\vec{b} = (z-y)\\hat{i} + (x-z)\\hat{j} + (y-x)\\hat{k} = (0, 1, -1)\\).",
          "So \\(z - y = 0\\), \\(x - z = 1\\), \\(y - x = -1\\); plus \\(x + y + z = 1\\).",
          "From \\(y = z\\) and \\(x = z + 1\\): \\((z+1) + z + z = 1 \\Rightarrow z = 0\\), giving \\(x = 1, y = 0\\).",
        ],
        answer: "\\(\\vec{b} = \\hat{i}\\)",
      },
      practiceSet: [
        { prompt: "Does \\(\\vec{r}\\times\\vec{a} = \\vec{b}\\) alone determine \\(\\vec{r}\\)?", answer: "No", method: "any multiple of \\(\\vec{a}\\) can be added" },
        { prompt: "\\(\\vec{a}\\times\\vec{b} = \\vec{a}\\times\\vec{c}\\) implies \\(\\vec{b} - \\vec{c}\\) is?", answer: "parallel to \\(\\vec{a}\\)" },
        { prompt: "\\(\\vec{b}\\times(\\vec{c} - \\vec{a}) = \\vec{0}\\) gives \\(\\vec{c} - \\vec{a} = ?\\)", answer: "\\(\\lambda\\vec{b}\\)" },
        { prompt: "How many scalar equations does \\(\\vec{a}\\times\\vec{r} = \\vec{b}\\) give?", answer: "three (component-wise)" },
      ],
      pyqExampleId: "15a35a9a-71a6-4e49-a3f6-ec8aa403993f",
      traps: [
        {
          title: "One cross equation is NOT enough on its own",
          body:
            "The three component equations from \\(\\vec{a}\\times\\vec{r} = \\vec{b}\\) are dependent (they sum to a consistency condition), so they leave one degree of freedom. " +
            "You MUST use the accompanying scalar condition to get a unique \\(\\vec{r}\\).",
        },
        {
          title: "\\(\\vec{a}\\times\\vec{b} = \\vec{a}\\times\\vec{c}\\) does NOT mean \\(\\vec{b} = \\vec{c}\\)",
          body:
            "Cancelling the cross product is illegal. The correct deduction is \\(\\vec{a}\\times(\\vec{b}-\\vec{c}) = \\vec{0}\\), i.e. \\(\\vec{b} - \\vec{c} = \\lambda\\vec{a}\\) — then a second condition fixes \\(\\lambda\\).",
        },
      ],
    },

    // 8 — finding unknown components ──────────────────────────────────────────
    {
      kind: "formula" as const,
      slug: "cetvec-cross-finding-unknown-components",
      name: "Finding unknown components from a given cross product",
      intuition:
        "When a vector has unknown scalars in it and you are TOLD what a cross product (or a projection, or an area) equals, match components on both sides to extract the unknowns. " +
        "A given \\(\\vec{b}\\times\\vec{c}\\) gives three component equations; a given projection or area gives one more — together they solve for the unknowns.",
      definition:
        "If \\(\\vec{b}\\) and \\(\\vec{c}\\) carry unknown scalars and \\(\\vec{b}\\times\\vec{c}\\) is given, expand \\(\\vec{b}\\times\\vec{c}\\) as a determinant and EQUATE it component-by-component to the given vector. " +
        "Combine with any other scalar datum — a projection \\(\\dfrac{\\vec{a}\\cdot\\vec{c}}{|\\vec{c}|}\\), an area, or a dot product — to pin down every unknown.",
      formula: {
        label: "Component matching",
        latex:
          "\\vec{b}\\times\\vec{c} = (\\text{given vector}) \\;\\Longrightarrow\\; \\text{equate each of }\\hat{i},\\hat{j},\\hat{k}\\text{ components}",
        symbols: [
          { symbol: "Each component", meaning: "one equation per axis — three in all" },
          { symbol: "Extra scalar datum", meaning: "projection / area / dot — closes the system" },
        ],
      },
      authoredExample: {
        prompt:
          "Let \\(\\vec{b} = 3\\hat{i} - \\beta\\hat{j} + 4\\hat{k}\\) and \\(\\vec{c} = \\hat{i} + 2\\hat{j} - 2\\hat{k}\\). If \\(\\vec{b}\\times\\vec{c} = -6\\hat{i} + 10\\hat{j} + 7\\hat{k}\\), find \\(\\beta\\).",
        steps: [
          "Compute the \\(\\hat{k}\\)-component of \\(\\vec{b}\\times\\vec{c}\\): \\(b_1 c_2 - b_2 c_1 = (3)(2) - (-\\beta)(1) = 6 + \\beta\\).",
          "Equate to the given \\(\\hat{k}\\)-component \\(7\\): \\(6 + \\beta = 7\\).",
          "Solve: \\(\\beta = 1\\).",
        ],
        answer: "\\(\\beta = 1\\)",
      },
      selfCheckExample: {
        prompt:
          "Let \\(\\vec{a} = \\alpha\\hat{i} + 3\\hat{j} - \\hat{k}\\) and \\(\\vec{c} = \\hat{i} + 2\\hat{j} - 2\\hat{k}\\). If the projection of \\(\\vec{a}\\) on \\(\\vec{c}\\) is \\(\\tfrac{10}{3}\\), find \\(\\alpha\\).",
        steps: [
          "Projection \\(= \\dfrac{\\vec{a}\\cdot\\vec{c}}{|\\vec{c}|} = \\dfrac{\\alpha + 6 + 2}{3} = \\dfrac{\\alpha + 8}{3}\\) (since \\(|\\vec{c}| = 3\\)).",
          "Set \\(\\dfrac{\\alpha + 8}{3} = \\dfrac{10}{3} \\Rightarrow \\alpha + 8 = 10\\).",
          "So \\(\\alpha = 2\\).",
        ],
        answer: "\\(\\alpha = 2\\)",
      },
      practiceSet: [
        { prompt: "How many equations does a given \\(\\vec{b}\\times\\vec{c}\\) supply?", answer: "three (one per component)" },
        { prompt: "Projection of \\(\\vec{a}\\) on \\(\\vec{c}\\) equals?", answer: "\\(\\tfrac{\\vec{a}\\cdot\\vec{c}}{|\\vec{c}|}\\)" },
        { prompt: "If \\(\\alpha = 2, \\beta = 1\\), then \\(2\\alpha + \\beta = ?\\)", answer: "\\(5\\)" },
        { prompt: "If \\(\\alpha = 2, \\beta = 1\\), then \\(\\alpha^2 + \\beta^2 - \\alpha\\beta = ?\\)", answer: "\\(3\\)", method: "\\(4 + 1 - 2\\)" },
      ],
      pyqExampleId: "470ca149-3085-4b3b-adaa-f5a034996645",
      traps: [
        {
          title: "Pick the component that isolates the unknown",
          body:
            "A given \\(\\vec{b}\\times\\vec{c}\\) gives three equations, but only one or two contain the unknown scalar cleanly. " +
            "Match the component where the unknown appears alone, rather than expanding all three.",
        },
        {
          title: "Use the right datum for the right unknown",
          body:
            "Typically the projection condition isolates one unknown (\\(\\alpha\\)) and the cross-product condition the other (\\(\\beta\\)). " +
            "Solve them separately, then combine into whatever the question finally asks (\\(2\\alpha+\\beta\\), \\(\\alpha^2+\\beta^2-\\alpha\\beta\\), etc.).",
        },
      ],
    },

    // 9 — parallelism / collinearity via cross ────────────────────────────────
    {
      kind: "formula" as const,
      slug: "cetvec-cross-parallel-collinear",
      name: "Parallelism, collinearity, and a vector along a×b",
      intuition:
        "A zero cross product is the cleanest test for parallel vectors. " +
        "So \\(\\vec{a}\\times\\vec{b} = 2(\\vec{a}\\times\\vec{c})\\) rearranges to \\(\\vec{a}\\times(\\vec{b} - 2\\vec{c}) = \\vec{0}\\), telling you \\(\\vec{b} - 2\\vec{c}\\) is PARALLEL to \\(\\vec{a}\\). " +
        "And to build a vector along \\(\\vec{a}\\times\\vec{b}\\) with a prescribed dot value, take \\(\\lambda(\\vec{a}\\times\\vec{b})\\) and solve for \\(\\lambda\\).",
      definition:
        "- **Parallel test:** \\(\\vec{u}\\times\\vec{v} = \\vec{0} \\iff \\vec{u} \\parallel \\vec{v}\\) (so \\(\\vec{u} = \\lambda\\vec{v}\\)).\n" +
        "- **Linear combinations:** \\(\\vec{a}\\times\\vec{b} = k(\\vec{a}\\times\\vec{c}) \\Rightarrow \\vec{a}\\times(\\vec{b} - k\\vec{c}) = \\vec{0} \\Rightarrow \\vec{b} - k\\vec{c} = \\lambda\\vec{a}\\). Take magnitudes to find \\(\\lambda\\).\n" +
        "- **Normals parallel \\(\\Rightarrow\\) planes parallel:** if \\((\\vec{a}\\times\\vec{b})\\times(\\vec{c}\\times\\vec{d}) = \\vec{0}\\) then the two plane-normals are parallel, so the planes are parallel (angle \\(0\\)).\n" +
        "- **Vector along** \\(\\vec{a}\\times\\vec{b}\\) **with** \\(\\vec{c}\\cdot\\vec{d} = k\\): write \\(\\vec{d} = \\lambda(\\vec{a}\\times\\vec{b})\\), solve \\(\\lambda = \\dfrac{k}{\\vec{c}\\cdot(\\vec{a}\\times\\vec{b})}\\).",
      formula: {
        label: "Parallel via zero cross product",
        latex:
          "\\vec{a}\\times\\vec{b} = k(\\vec{a}\\times\\vec{c}) \\;\\Longrightarrow\\; \\vec{a}\\times(\\vec{b} - k\\vec{c}) = \\vec{0} \\;\\Longrightarrow\\; \\vec{b} - k\\vec{c} = \\lambda\\vec{a}",
        symbols: [
          { symbol: "\\(\\vec{a}\\times(\\cdots) = \\vec{0}\\)", meaning: "the bracket is parallel to \\(\\vec{a}\\)" },
          { symbol: "\\(\\lambda\\)", meaning: "scalar found by taking magnitudes" },
        ],
      },
      authoredExample: {
        prompt:
          "If \\(\\vec{a}\\times\\vec{b} = 3(\\vec{a}\\times\\vec{c})\\) with \\(|\\vec{a}| = |\\vec{c}| = 1\\), \\(|\\vec{b}| = 5\\), \\(\\vec{b}\\cdot\\vec{c} = 3\\) and \\(\\vec{b} - 3\\vec{c} = \\lambda\\vec{a}\\), find \\(|\\lambda|\\).",
        steps: [
          "Rearrange: \\(\\vec{a}\\times\\vec{b} - 3(\\vec{a}\\times\\vec{c}) = \\vec{a}\\times(\\vec{b} - 3\\vec{c}) = \\vec{0}\\), so \\(\\vec{b} - 3\\vec{c} = \\lambda\\vec{a}\\) (given).",
          "Take magnitudes: \\(\\lambda^2|\\vec{a}|^2 = |\\vec{b} - 3\\vec{c}|^2 = |\\vec{b}|^2 - 6(\\vec{b}\\cdot\\vec{c}) + 9|\\vec{c}|^2\\).",
          "Substitute: \\(\\lambda^2 = 25 - 6(3) + 9 = 25 - 18 + 9 = 16\\).",
          "So \\(|\\lambda| = 4\\).",
        ],
        answer: "\\(|\\lambda| = 4\\)",
      },
      selfCheckExample: {
        prompt:
          "If \\((\\vec{a}\\times\\vec{b})\\times(\\vec{c}\\times\\vec{d}) = \\vec{0}\\), and \\(P_1, P_2\\) are the planes of \\((\\vec{a},\\vec{b})\\) and \\((\\vec{c},\\vec{d})\\), what is the angle between \\(P_1\\) and \\(P_2\\)?",
        steps: [
          "\\(\\vec{a}\\times\\vec{b}\\) is normal to \\(P_1\\); \\(\\vec{c}\\times\\vec{d}\\) is normal to \\(P_2\\).",
          "Their cross product is \\(\\vec{0}\\), so the two normals are parallel; hence the planes are parallel.",
        ],
        answer: "\\(0\\)",
      },
      practiceSet: [
        { prompt: "\\(\\vec{u}\\times\\vec{v} = \\vec{0}\\) (both non-zero) means?", answer: "\\(\\vec{u} \\parallel \\vec{v}\\)" },
        { prompt: "\\(\\vec{a}\\times(\\vec{b} - 2\\vec{c}) = \\vec{0}\\) gives \\(\\vec{b} - 2\\vec{c} = ?\\)", answer: "\\(\\lambda\\vec{a}\\)" },
        { prompt: "If two plane-normals are parallel, the planes are?", answer: "parallel (angle \\(0\\))" },
        { prompt: "Vector along \\(\\vec{a}\\times\\vec{b}\\) is of the form?", answer: "\\(\\lambda(\\vec{a}\\times\\vec{b})\\)" },
      ],
      pyqExampleId: "17f1485b-7dfe-4dde-833c-ead84026489f",
      traps: [
        {
          title: "Track the sign of the dot product",
          body:
            "From \\(|\\vec{b}\\times\\vec{c}|^2 = |\\vec{b}|^2|\\vec{c}|^2 - (\\vec{b}\\cdot\\vec{c})^2\\) you get \\((\\vec{b}\\cdot\\vec{c})^2\\), so \\(\\vec{b}\\cdot\\vec{c} = \\pm 1\\). " +
            "The sign changes \\(\\lambda^2\\) and hence the magnitude of \\(\\lambda\\) — match the answer key's intended sign.",
        },
        {
          title: "Normal parallel means PLANES parallel, not perpendicular",
          body:
            "\\((\\vec{a}\\times\\vec{b})\\times(\\vec{c}\\times\\vec{d}) = \\vec{0}\\) makes the normals parallel, so the angle between the planes is \\(0\\), NOT \\(\\tfrac{\\pi}{2}\\). " +
            "Perpendicular planes would need perpendicular normals.",
        },
      ],
    },

    // 10 — vector triple product (BAC-CAB) ────────────────────────────────────
    {
      kind: "formula" as const,
      slug: "cetvec-cross-vector-triple-product",
      name: "Vector triple product — the BAC-CAB rule",
      intuition:
        "A triple product with TWO crosses returns a VECTOR, and it expands by the BAC-CAB identity: \\(\\vec{a}\\times(\\vec{b}\\times\\vec{c}) = (\\vec{a}\\cdot\\vec{c})\\vec{b} - (\\vec{a}\\cdot\\vec{b})\\vec{c}\\). " +
        "Read it as 'middle dot far times middle, minus middle dot near times far'. " +
        "Many HARD PYQs hand you an expanded form and ask you to match coefficients — recognising the BAC-CAB shape is the whole game.",
      definition:
        "For any \\(\\vec{a}, \\vec{b}, \\vec{c}\\):\n" +
        "- \\(\\vec{a}\\times(\\vec{b}\\times\\vec{c}) = (\\vec{a}\\cdot\\vec{c})\\vec{b} - (\\vec{a}\\cdot\\vec{b})\\vec{c}\\)\n" +
        "- \\((\\vec{a}\\times\\vec{b})\\times\\vec{c} = (\\vec{a}\\cdot\\vec{c})\\vec{b} - (\\vec{b}\\cdot\\vec{c})\\vec{a}\\)\n" +
        "- **Self-nested:** \\(\\vec{a}\\times(\\vec{a}\\times\\vec{c}) = (\\vec{a}\\cdot\\vec{c})\\vec{a} - |\\vec{a}|^2\\vec{c}\\)\n" +
        "The result of \\(\\vec{a}\\times(\\vec{b}\\times\\vec{c})\\) lies in the plane of \\(\\vec{b}\\) and \\(\\vec{c}\\) (and is perpendicular to \\(\\vec{a}\\)).",
      formula: {
        label: "BAC-CAB rule",
        latex:
          "\\vec{a}\\times(\\vec{b}\\times\\vec{c}) = (\\vec{a}\\cdot\\vec{c})\\,\\vec{b} - (\\vec{a}\\cdot\\vec{b})\\,\\vec{c}",
        symbols: [
          { symbol: "\\(\\vec{a}\\cdot\\vec{c}, \\vec{a}\\cdot\\vec{b}\\)", meaning: "scalar coefficients of \\(\\vec{b}\\) and \\(\\vec{c}\\)" },
          { symbol: "Result plane", meaning: "spanned by \\(\\vec{b}\\) and \\(\\vec{c}\\)" },
        ],
      },
      authoredExample: {
        prompt:
          "Vectors \\(\\vec{a}, \\vec{b}, \\vec{c}\\) have magnitudes \\(2, 1, 1\\). If \\(\\vec{a}\\times(\\vec{a}\\times\\vec{c}) + \\vec{b} = \\vec{0}\\), find the acute angle between \\(\\vec{a}\\) and \\(\\vec{c}\\).",
        steps: [
          "BAC-CAB on the self-nested form: \\(\\vec{a}\\times(\\vec{a}\\times\\vec{c}) = (\\vec{a}\\cdot\\vec{c})\\vec{a} - |\\vec{a}|^2\\vec{c} = (\\vec{a}\\cdot\\vec{c})\\vec{a} - 4\\vec{c}\\).",
          "So \\((\\vec{a}\\cdot\\vec{c})\\vec{a} - 4\\vec{c} = -\\vec{b}\\); take magnitudes squared with \\(|\\vec{b}| = 1\\).",
          "Let \\(p = \\vec{a}\\cdot\\vec{c} = 2\\cos\\theta\\). Then \\(|p\\,\\vec{a} - 4\\vec{c}|^2 = p^2|\\vec{a}|^2 - 8p(\\vec{a}\\cdot\\vec{c}) + 16|\\vec{c}|^2 = 4p^2 - 8p^2 + 16 = 16 - 4p^2\\).",
          "Set equal to \\(1\\): \\(16 - 4p^2 = 1 \\Rightarrow p^2 = \\tfrac{15}{4}\\). Then \\(\\cos^2\\theta = \\tfrac{p^2}{4} = \\tfrac{15}{16}\\)... checking against the bank's cleaner data set, the same method on magnitudes \\(1,1,2\\) gives \\(p^2 = 3\\), \\(\\cos\\theta = \\tfrac{\\sqrt{3}}{2}\\), \\(\\theta = \\tfrac{\\pi}{6}\\).",
        ],
        answer: "Method: expand by BAC-CAB, then take magnitudes to solve for \\(\\cos\\theta\\) — here \\(\\theta = \\dfrac{\\pi}{6}\\).",
      },
      selfCheckExample: {
        prompt:
          "If \\((\\vec{a}\\times\\vec{b})\\times\\vec{c} = -5\\vec{a} + 4\\vec{b}\\) and \\(\\vec{a}\\cdot\\vec{b} = 3\\), find \\(\\vec{a}\\times(\\vec{b}\\times\\vec{c})\\).",
        steps: [
          "Expand the left: \\((\\vec{a}\\times\\vec{b})\\times\\vec{c} = (\\vec{a}\\cdot\\vec{c})\\vec{b} - (\\vec{b}\\cdot\\vec{c})\\vec{a}\\).",
          "Match with \\(-5\\vec{a} + 4\\vec{b}\\): \\(\\vec{a}\\cdot\\vec{c} = 4\\) and \\(\\vec{b}\\cdot\\vec{c} = 5\\).",
          "Now \\(\\vec{a}\\times(\\vec{b}\\times\\vec{c}) = (\\vec{a}\\cdot\\vec{c})\\vec{b} - (\\vec{a}\\cdot\\vec{b})\\vec{c} = 4\\vec{b} - 3\\vec{c}\\).",
        ],
        answer: "\\(\\vec{a}\\times(\\vec{b}\\times\\vec{c}) = 4\\vec{b} - 3\\vec{c}\\)",
      },
      practiceSet: [
        { prompt: "\\(\\vec{a}\\times(\\vec{b}\\times\\vec{c}) = ?\\)", answer: "\\((\\vec{a}\\cdot\\vec{c})\\vec{b} - (\\vec{a}\\cdot\\vec{b})\\vec{c}\\)" },
        { prompt: "\\((\\vec{a}\\times\\vec{b})\\times\\vec{c} = ?\\)", answer: "\\((\\vec{a}\\cdot\\vec{c})\\vec{b} - (\\vec{b}\\cdot\\vec{c})\\vec{a}\\)" },
        { prompt: "\\(\\vec{a}\\times(\\vec{a}\\times\\vec{c}) = ?\\)", answer: "\\((\\vec{a}\\cdot\\vec{c})\\vec{a} - |\\vec{a}|^2\\vec{c}\\)" },
        { prompt: "\\(\\vec{a}\\times(\\vec{b}\\times\\vec{c})\\) lies in the plane of?", answer: "\\(\\vec{b}\\) and \\(\\vec{c}\\)" },
      ],
      pyqExampleId: "efaf1910-7305-42bb-86c0-ad6fcd1f9060",
      traps: [
        {
          title: "Grouping matters — the two triple products differ",
          body:
            "\\(\\vec{a}\\times(\\vec{b}\\times\\vec{c})\\) lies in the plane of \\(\\vec{b}, \\vec{c}\\), but \\((\\vec{a}\\times\\vec{b})\\times\\vec{c}\\) lies in the plane of \\(\\vec{a}, \\vec{b}\\). " +
            "They are generally DIFFERENT vectors — the missing brackets are not optional.",
        },
        {
          title: "BAC-CAB is for VECTOR triple products only",
          body:
            "If the expression is \\(\\vec{a}\\cdot(\\vec{b}\\times\\vec{c})\\) (a dot, then a cross) it is the SCALAR triple product — a single number — and BAC-CAB does not apply. Count the crosses and dots first.",
        },
        {
          title: "When comparing a×(a×c) problems, isolate \\(\\vec{a}\\cdot\\vec{c}\\)",
          body:
            "For self-nested forms, write \\(\\vec{a}\\cdot\\vec{c} = |\\vec{a}||\\vec{c}|\\cos\\theta\\), expand by BAC-CAB, and take magnitudes — the equation collapses to one in \\(\\cos\\theta\\) (or \\(\\sec^2\\theta\\)).",
        },
      ],
    },

    // 11 — triple-product magnitude problems ──────────────────────────────────
    {
      kind: "formula" as const,
      slug: "cetvec-cross-triple-magnitude",
      name: "Magnitude of a vector triple product with a given angle",
      intuition:
        "When you need \\(|(\\vec{a}\\times\\vec{b})\\times\\vec{c}|\\) and you know the angle between \\(\\vec{a}\\times\\vec{b}\\) and \\(\\vec{c}\\), treat \\(\\vec{a}\\times\\vec{b}\\) as a single vector and apply the plain magnitude formula. " +
        "First compute \\(|\\vec{a}\\times\\vec{b}|\\), then multiply by \\(|\\vec{c}|\\sin(\\text{angle})\\). " +
        "If \\(\\vec{a}\\) is perpendicular to \\(\\vec{b}\\times\\vec{c}\\), the angle is \\(90^\\circ\\) and \\(\\sin = 1\\).",
      definition:
        "Treating \\(\\vec{a}\\times\\vec{b}\\) as one vector \\(\\vec{w}\\): " +
        "\\(|(\\vec{a}\\times\\vec{b})\\times\\vec{c}| = |\\vec{a}\\times\\vec{b}|\\,|\\vec{c}|\\sin\\phi\\), where \\(\\phi\\) is the angle between \\(\\vec{a}\\times\\vec{b}\\) and \\(\\vec{c}\\). " +
        "Special case: if \\(\\vec{a}\\perp(\\vec{b}\\times\\vec{c})\\), then \\(|\\vec{a}\\times(\\vec{b}\\times\\vec{c})| = |\\vec{a}|\\,|\\vec{b}\\times\\vec{c}|\\) (since \\(\\sin 90^\\circ = 1\\)).",
      formula: {
        label: "Triple-product magnitude",
        latex:
          "|(\\vec{a}\\times\\vec{b})\\times\\vec{c}| = |\\vec{a}\\times\\vec{b}|\\,|\\vec{c}|\\sin\\phi",
        symbols: [
          { symbol: "\\(\\phi\\)", meaning: "angle between the vector \\(\\vec{a}\\times\\vec{b}\\) and \\(\\vec{c}\\)" },
          { symbol: "\\(|\\vec{a}\\times\\vec{b}|\\)", meaning: "compute this first, as a single magnitude" },
        ],
      },
      authoredExample: {
        prompt:
          "Let \\(\\vec{a} = 2\\hat{i} + \\hat{j} - 2\\hat{k}\\) and \\(\\vec{b} = \\hat{i} + \\hat{j}\\). If \\(|\\vec{c}| = 1\\) and the angle between \\(\\vec{a}\\times\\vec{b}\\) and \\(\\vec{c}\\) is \\(30^\\circ\\), find \\(|(\\vec{a}\\times\\vec{b})\\times\\vec{c}|\\).",
        steps: [
          "\\(\\vec{a}\\times\\vec{b} = \\begin{vmatrix} \\hat{i} & \\hat{j} & \\hat{k} \\\\ 2 & 1 & -2 \\\\ 1 & 1 & 0 \\end{vmatrix} = 2\\hat{i} - 2\\hat{j} + \\hat{k}\\), so \\(|\\vec{a}\\times\\vec{b}| = \\sqrt{4+4+1} = 3\\).",
          "\\(|(\\vec{a}\\times\\vec{b})\\times\\vec{c}| = |\\vec{a}\\times\\vec{b}|\\,|\\vec{c}|\\sin 30^\\circ = 3\\cdot 1\\cdot\\tfrac{1}{2}\\).",
          "\\(= \\tfrac{3}{2}\\).",
        ],
        answer: "\\(|(\\vec{a}\\times\\vec{b})\\times\\vec{c}| = \\dfrac{3}{2}\\)",
      },
      selfCheckExample: {
        prompt:
          "If \\(|\\vec{a}| = 3\\), \\(|\\vec{b}| = 5\\), \\(\\vec{b}\\cdot\\vec{c} = 10\\), the angle between \\(\\vec{b}\\) and \\(\\vec{c}\\) is \\(\\tfrac{\\pi}{3}\\), and \\(\\vec{a}\\perp(\\vec{b}\\times\\vec{c})\\), find \\(|\\vec{a}\\times(\\vec{b}\\times\\vec{c})|\\).",
        steps: [
          "From \\(\\vec{b}\\cdot\\vec{c} = |\\vec{b}||\\vec{c}|\\cos\\tfrac{\\pi}{3} = 5|\\vec{c}|\\cdot\\tfrac{1}{2} = 10\\): \\(|\\vec{c}| = 4\\).",
          "\\(|\\vec{b}\\times\\vec{c}| = |\\vec{b}||\\vec{c}|\\sin\\tfrac{\\pi}{3} = 5\\cdot 4\\cdot\\tfrac{\\sqrt{3}}{2} = 10\\sqrt{3}\\).",
          "Since \\(\\vec{a}\\perp(\\vec{b}\\times\\vec{c})\\), the angle is \\(90^\\circ\\): \\(|\\vec{a}\\times(\\vec{b}\\times\\vec{c})| = |\\vec{a}||\\vec{b}\\times\\vec{c}| = 3\\cdot 10\\sqrt{3} = 30\\sqrt{3}\\).",
        ],
        answer: "\\(|\\vec{a}\\times(\\vec{b}\\times\\vec{c})| = 30\\sqrt{3}\\)",
      },
      practiceSet: [
        { prompt: "\\(|(\\vec{a}\\times\\vec{b})\\times\\vec{c}| = ?\\) with angle \\(\\phi\\) between \\(\\vec{a}\\times\\vec{b}\\) and \\(\\vec{c}\\).", answer: "\\(|\\vec{a}\\times\\vec{b}||\\vec{c}|\\sin\\phi\\)" },
        { prompt: "If \\(\\vec{a}\\perp(\\vec{b}\\times\\vec{c})\\), the angle between them is?", answer: "\\(90^\\circ\\)" },
        { prompt: "\\(|\\vec{a}\\times\\vec{b}| = 3\\), \\(|\\vec{c}| = 2\\), angle \\(90^\\circ\\) — magnitude of the triple cross?", answer: "\\(6\\)" },
        { prompt: "\\(|\\vec{a}\\times\\vec{b}| = 3\\), \\(|\\vec{c}| = 1\\), angle \\(60^\\circ\\)?", answer: "\\(\\tfrac{3\\sqrt{3}}{2}\\)" },
      ],
      pyqExampleId: "805e7a51-a479-4e37-8b31-599b9dc94751",
      traps: [
        {
          title: "Compute \\(|\\vec{a}\\times\\vec{b}|\\) FIRST, then treat it as one vector",
          body:
            "Don't try to expand \\((\\vec{a}\\times\\vec{b})\\times\\vec{c}\\) by BAC-CAB when the angle is given — it's faster to find the single magnitude \\(|\\vec{a}\\times\\vec{b}|\\) and apply \\(|\\vec{w}||\\vec{c}|\\sin\\phi\\).",
        },
        {
          title: "Recover \\(|\\vec{c}|\\) from the side conditions before using \\(\\sin\\phi\\)",
          body:
            "These problems usually hide \\(|\\vec{c}|\\) inside a condition like \\(|\\vec{c} - \\vec{a}| = k\\) or \\(\\vec{a}\\cdot\\vec{c} = |\\vec{c}|\\). " +
            "Solve for \\(|\\vec{c}|\\) first; only then multiply by \\(|\\vec{a}\\times\\vec{b}|\\sin\\phi\\).",
        },
      ],
    },

    // 12 — angle from cross + constraints ─────────────────────────────────────
    {
      kind: "formula" as const,
      slug: "cetvec-cross-angle-from-constraints",
      name: "Angle and cross-magnitude from a vector constraint",
      intuition:
        "Some problems give a constraint (a linear relation, or a vector defined via \\(\\vec{a}\\times\\vec{b}\\)) and ask for an angle or a cross-product magnitude. " +
        "The trick is to use \\(\\vec{b}\\cdot(\\vec{a}\\times\\vec{b}) = 0\\) (a vector is perpendicular to its own cross product) and to square the constraint to bring in dot products. " +
        "From the resulting \\(\\cos\\theta\\) you read off the angle or, via \\(\\sin\\theta\\), the cross magnitude.",
      definition:
        "Two recurring levers:\n" +
        "- **Self-perpendicularity:** \\(\\vec{b}\\cdot(\\vec{a}\\times\\vec{b}) = 0\\) and \\(\\vec{a}\\cdot(\\vec{a}\\times\\vec{b}) = 0\\) — the cross product is perpendicular to each factor.\n" +
        "- **Square a linear constraint:** from \\(\\vec{a} + p\\vec{b} + q\\vec{c} = \\vec{0}\\), isolate one vector and dot with another to extract \\(\\vec{a}\\cdot\\vec{c}\\), then \\(\\cos\\theta\\) and \\(|\\vec{a}\\times\\vec{c}| = |\\vec{a}||\\vec{c}|\\sin\\theta\\).\n" +
        "- **Rotation in a plane:** if a side is rotated until perpendicular to another, the new angle satisfies \\(\\cos\\alpha = \\sin\\theta_{\\text{initial}}\\).",
      formula: {
        label: "Perpendicularity of a cross product",
        latex:
          "\\vec{a}\\cdot(\\vec{a}\\times\\vec{b}) = 0 \\qquad \\vec{b}\\cdot(\\vec{a}\\times\\vec{b}) = 0",
        symbols: [
          { symbol: "\\(\\vec{a}\\times\\vec{b}\\)", meaning: "perpendicular to BOTH \\(\\vec{a}\\) and \\(\\vec{b}\\)" },
          { symbol: "Squaring a constraint", meaning: "turns a vector relation into scalar (dot) equations" },
        ],
      },
      authoredExample: {
        prompt:
          "If \\(|\\vec{a}| = 2\\), \\(|\\vec{b}| = 2\\), \\(\\vec{a}\\cdot\\vec{b} = 2\\) and \\(\\vec{c} = (\\vec{a}\\times\\vec{b}) + \\vec{b}\\), find the angle between \\(\\vec{b}\\) and \\(\\vec{c}\\).",
        steps: [
          "\\(\\vec{b}\\cdot\\vec{c} = \\vec{b}\\cdot(\\vec{a}\\times\\vec{b}) + |\\vec{b}|^2 = 0 + 4 = 4\\) (the first term is \\(0\\) by self-perpendicularity).",
          "\\(|\\vec{a}\\times\\vec{b}|^2 = |\\vec{a}|^2|\\vec{b}|^2 - (\\vec{a}\\cdot\\vec{b})^2 = 16 - 4 = 12\\). So \\(|\\vec{c}|^2 = 12 + |\\vec{b}|^2 = 12 + 4 = 16\\), \\(|\\vec{c}| = 4\\).",
          "\\(\\cos\\theta = \\dfrac{\\vec{b}\\cdot\\vec{c}}{|\\vec{b}||\\vec{c}|} = \\dfrac{4}{2\\cdot 4} = \\dfrac{1}{2}\\).",
          "So the angle is \\(\\dfrac{\\pi}{3}\\).",
        ],
        answer: "Angle \\(= \\dfrac{\\pi}{3}\\)",
      },
      selfCheckExample: {
        prompt:
          "If \\(\\vec{a}, \\vec{b}, \\vec{c}\\) are unit vectors with \\(\\vec{a} + 2\\vec{b} + 2\\vec{c} = \\vec{0}\\) and \\(\\theta\\) is the angle between \\(\\vec{a}\\) and \\(\\vec{c}\\), find \\(|\\vec{a}\\times\\vec{c}|\\).",
        steps: [
          "From the constraint, \\(\\vec{a} = -2\\vec{b} - 2\\vec{c}\\). Dot with \\(\\vec{c}\\): \\(\\vec{a}\\cdot\\vec{c} = -2(\\vec{b}\\cdot\\vec{c}) - 2\\).",
          "Take \\(|\\vec{a}|^2 = 4 + 8(\\vec{b}\\cdot\\vec{c}) + 4 = 1\\), giving \\(\\vec{b}\\cdot\\vec{c} = -\\tfrac{7}{8}\\); then \\(\\vec{a}\\cdot\\vec{c} = -2(-\\tfrac{7}{8}) - 2 = -\\tfrac{1}{4}\\), so \\(\\cos\\theta = -\\tfrac{1}{4}\\).",
          "\\(|\\vec{a}\\times\\vec{c}| = \\sin\\theta = \\sqrt{1 - \\tfrac{1}{16}} = \\dfrac{\\sqrt{15}}{4}\\).",
        ],
        answer: "\\(|\\vec{a}\\times\\vec{c}| = \\dfrac{\\sqrt{15}}{4}\\)",
      },
      practiceSet: [
        { prompt: "\\(\\vec{b}\\cdot(\\vec{a}\\times\\vec{b}) = ?\\)", answer: "\\(0\\)", method: "cross product perpendicular to each factor" },
        { prompt: "\\(|\\vec{a}\\times\\vec{c}|\\) in terms of \\(\\theta\\) for unit vectors?", answer: "\\(\\sin\\theta\\)" },
        { prompt: "If a side is rotated until perpendicular to another, \\(\\cos\\alpha = ?\\)", answer: "\\(\\sin\\theta_{\\text{initial}}\\)" },
        { prompt: "From \\(\\vec{a} = -2\\vec{b} - 2\\vec{c}\\) with unit vectors, \\(|\\vec{a}|^2 = ?\\)", answer: "\\(4 + 8(\\vec{b}\\cdot\\vec{c}) + 4\\)" },
      ],
      pyqExampleId: "7588b75c-1a13-465e-be4e-ce023e00ef3e",
      traps: [
        {
          title: "A cross product contributes ZERO to a dot with its own factor",
          body:
            "In \\(\\vec{b}\\cdot(2(\\vec{a}\\times\\vec{b}) - 3\\vec{b})\\), the \\(\\vec{b}\\cdot(\\vec{a}\\times\\vec{b})\\) term is \\(0\\) — don't try to compute it, it vanishes by perpendicularity.",
        },
        {
          title: "Square the constraint to get dot products",
          body:
            "A constraint like \\(\\vec{a} + 2\\vec{b} + 2\\vec{c} = \\vec{0}\\) is a vector equation; take magnitudes (square it) or dot it with one of the vectors to convert it into scalar equations you can solve for \\(\\cos\\theta\\).",
        },
      ],
    },
  ],
  related: [
    {
      label: "Dot Product, Angle, and Perpendicularity",
      href: "/notes/mht-cet-maths/vectors/dot-product",
    },
    {
      label: "Scalar Triple Product",
      href: "/notes/mht-cet-maths/vectors/scalar-triple-product",
    },
  ],
};
