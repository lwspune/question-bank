import type { SubtopicNote } from "@/app/notes/_types";

export const DOT_PRODUCT_NOTE: SubtopicNote = {
  subtopicName: "Dot Product, Angle, and Perpendicularity",
  title: "Dot Product, Angle, and Perpendicularity",
  oneLineDefinition:
    "The scalar a·b = |a||b|cosθ that measures alignment — the engine behind angle, perpendicularity, projection, and direction-cosine questions.",
  whyItMatters:
    "The dot product collapses two vectors into one number that encodes their angle, so almost every Vectors question in MHT-CET routes through it: find the angle, test perpendicularity, solve for a parameter that makes two vectors perpendicular, or project one vector onto another. " +
    "This is the single biggest Vectors subtopic — 35 PYQs across 2017–2026 with roughly 23% HARD — and the staples are the perpendicular-parameter setup (find λ so a+λb ⊥ c), the unit-vector constraint angle, and projection of a segment onto a line. " +
    "Master the perpendicularity test (a·b = 0), the angle formula, and the expand-the-constraint workflow and you have most of the chapter's marks.",
  concepts: [
    // ── FOUNDATION 1: dot product two forms (no PYQ) ──────────────────────────
    {
      kind: "formula" as const,
      slug: "cetvec-dot-definition-two-forms",
      name: "Dot product — the two faces of a·b",
      visualizationSlug: "dot-product-work",
      intuition:
        "The dot product turns two vectors into a single number. It has two faces that you switch between constantly: a GEOMETRIC face \\(|\\vec a||\\vec b|\\cos\\theta\\) (use it when angles or magnitudes are given) and an ALGEBRAIC face \\(a_1b_1+a_2b_2+a_3b_3\\) (use it when components are given). Both give the same scalar.",
      definition:
        "For \\(\\vec a = a_1\\hat i + a_2\\hat j + a_3\\hat k\\) and \\(\\vec b = b_1\\hat i + b_2\\hat j + b_3\\hat k\\):\n" +
        "- **Geometric:** \\(\\vec a\\cdot\\vec b = |\\vec a|\\,|\\vec b|\\cos\\theta\\), where \\(\\theta\\) is the angle between them (\\(0\\le\\theta\\le\\pi\\)).\n" +
        "- **Component:** \\(\\vec a\\cdot\\vec b = a_1b_1 + a_2b_2 + a_3b_3\\).\n" +
        "- It is **commutative** (\\(\\vec a\\cdot\\vec b = \\vec b\\cdot\\vec a\\)), **distributive** over addition, and always a **scalar**.\n" +
        "- Self dot: \\(\\vec a\\cdot\\vec a = |\\vec a|^2\\). Basis: \\(\\hat i\\cdot\\hat i = \\hat j\\cdot\\hat j = \\hat k\\cdot\\hat k = 1\\) and \\(\\hat i\\cdot\\hat j = \\hat j\\cdot\\hat k = \\hat k\\cdot\\hat i = 0\\).",
      formula: {
        label: "Dot product — geometric and component forms",
        latex:
          "\\vec a\\cdot\\vec b = |\\vec a|\\,|\\vec b|\\cos\\theta = a_1 b_1 + a_2 b_2 + a_3 b_3",
        symbols: [
          { symbol: "\\(\\theta\\)", meaning: "angle between the vectors, in \\([0,\\pi]\\)" },
          { symbol: "\\(a_i, b_i\\)", meaning: "components along \\(\\hat i, \\hat j, \\hat k\\)" },
          { symbol: "\\(\\vec a\\cdot\\vec a\\)", meaning: "equals \\(|\\vec a|^2\\)" },
        ],
      },
      authoredExample: {
        prompt:
          "Evaluate \\(\\vec a\\cdot\\vec b\\) for \\(\\vec a = 3\\hat i - \\hat j + 2\\hat k\\) and \\(\\vec b = \\hat i + 4\\hat j - \\hat k\\).",
        steps: [
          "Use the component form: multiply matching components and add.",
          "\\(\\vec a\\cdot\\vec b = (3)(1) + (-1)(4) + (2)(-1) = 3 - 4 - 2\\).",
          "Sum: \\(\\vec a\\cdot\\vec b = -3\\).",
        ],
        answer: "\\(\\vec a\\cdot\\vec b = -3\\)",
      },
      practiceSet: [
        { prompt: "\\(\\vec a\\cdot\\vec b\\) for \\(\\vec a = \\hat i + 2\\hat j\\), \\(\\vec b = 3\\hat i + \\hat j\\)?", answer: "\\(5\\)", method: "\\(3 + 2\\)" },
        { prompt: "\\(\\hat i\\cdot\\hat j = ?\\)", answer: "\\(0\\)", method: "perpendicular basis vectors" },
        { prompt: "\\(\\hat k\\cdot\\hat k = ?\\)", answer: "\\(1\\)" },
        { prompt: "For \\(\\vec a = 2\\hat i - \\hat j + \\hat k\\), \\(\\vec a\\cdot\\vec a = ?\\)", answer: "\\(6\\)", method: "\\(|\\vec a|^2 = 4+1+1\\)" },
      ],
      traps: [
        {
          title: "Dot product is a scalar — never a vector",
          body:
            "An MCQ option that returns \\(\\hat i, \\hat j, \\hat k\\) components for \\(\\vec a\\cdot\\vec b\\) is wrong on type grounds alone. The dot product is always a single number; the cross product is the one that gives a vector.",
        },
        {
          title: "Match components in the SAME direction only",
          body:
            "\\(\\vec a\\cdot\\vec b\\) multiplies \\(a_1b_1 + a_2b_2 + a_3b_3\\) — the \\(\\hat i\\) of one with the \\(\\hat i\\) of the other. Multiplying \\(a_1 b_2\\) (an \\(\\hat i\\) with a \\(\\hat j\\)) is the most common slip, because those mixed products are exactly the zero terms.",
        },
      ],
    },

    // ── 2: magnitude of a combination (|a − 2b|) ──────────────────────────────
    {
      kind: "formula" as const,
      slug: "cetvec-dot-magnitude-of-combination",
      name: "Magnitude of a combination via the dot product",
      visualizationSlug: "magnitude-right-triangle",
      intuition:
        "The magnitude of any vector combination is found by squaring it as a dot product with itself. When the vectors are in component form, build the combination component-by-component first, then take the square-root of the sum of squares. When only magnitudes and angles are given, expand \\(|\\vec a\\pm\\vec b|^2\\) into self-dots plus a cross term.",
      definition:
        "For a combination written in components, \\(|\\vec v| = \\sqrt{v_1^2 + v_2^2 + v_3^2}\\). " +
        "Abstractly, \\(|\\,p\\vec a + q\\vec b\\,|^2 = p^2|\\vec a|^2 + 2pq\\,(\\vec a\\cdot\\vec b) + q^2|\\vec b|^2\\). " +
        "This is just \\((p\\vec a + q\\vec b)\\cdot(p\\vec a + q\\vec b)\\) expanded.",
      formula: {
        label: "Magnitude of a linear combination",
        latex:
          "|p\\vec a + q\\vec b|^2 = p^2|\\vec a|^2 + 2pq\\,(\\vec a\\cdot\\vec b) + q^2|\\vec b|^2",
        symbols: [
          { symbol: "\\(p, q\\)", meaning: "scalar coefficients" },
          { symbol: "\\(\\vec a\\cdot\\vec b\\)", meaning: "the only cross term — vanishes if \\(\\vec a\\perp\\vec b\\)" },
        ],
      },
      authoredExample: {
        prompt:
          "If \\(\\vec a = \\hat i + 2\\hat j - \\hat k\\) and \\(\\vec b = 3\\hat i - \\hat j + 2\\hat k\\), find \\(|2\\vec a + \\vec b|\\).",
        steps: [
          "Build the combination component-by-component: \\(2\\vec a = 2\\hat i + 4\\hat j - 2\\hat k\\).",
          "\\(2\\vec a + \\vec b = (2+3)\\hat i + (4-1)\\hat j + (-2+2)\\hat k = 5\\hat i + 3\\hat j + 0\\hat k\\).",
          "Magnitude: \\(|2\\vec a + \\vec b| = \\sqrt{5^2 + 3^2 + 0^2} = \\sqrt{34}\\).",
        ],
        answer: "\\(|2\\vec a + \\vec b| = \\sqrt{34}\\)",
      },
      selfCheckExample: {
        prompt:
          "If \\(\\vec a = 2\\hat i - \\hat j + \\hat k\\) and \\(\\vec b = \\hat i + 3\\hat j - 2\\hat k\\), find \\(|\\vec a - \\vec b|\\).",
        steps: [
          "\\(\\vec a - \\vec b = (2-1)\\hat i + (-1-3)\\hat j + (1+2)\\hat k = \\hat i - 4\\hat j + 3\\hat k\\).",
          "\\(|\\vec a - \\vec b| = \\sqrt{1 + 16 + 9} = \\sqrt{26}\\).",
        ],
        answer: "\\(|\\vec a - \\vec b| = \\sqrt{26}\\)",
      },
      practiceSet: [
        { prompt: "\\(|3\\hat i + 4\\hat k|\\)?", answer: "\\(5\\)", method: "\\(\\sqrt{9+16}\\)" },
        { prompt: "\\(\\vec a = \\hat i + \\hat j\\), \\(\\vec b = \\hat i - \\hat j\\): \\(|\\vec a + \\vec b|\\)?", answer: "\\(2\\)", method: "sum \\(= 2\\hat i\\)" },
        { prompt: "Unit perpendicular \\(\\vec a, \\vec b\\): \\(|\\vec a - \\vec b|\\)?", answer: "\\(\\sqrt{2}\\)", method: "\\(\\sqrt{1 + 1 - 0}\\)" },
        { prompt: "\\(|\\hat i - 2\\hat j + 2\\hat k|\\)?", answer: "\\(3\\)", method: "\\(\\sqrt{1+4+4}\\)" },
      ],
      pyqExampleId: "63952c69-2d9c-4f94-bb12-491613f4132b",
      traps: [
        {
          title: "Scale FIRST, then subtract — watch the double minus",
          body:
            "In \\(|\\vec a - 2\\vec b|\\), the \\(\\hat j\\)-component becomes \\(a_2 - 2b_2\\). If \\(b_2\\) is itself negative, \\(-2b_2\\) is positive — e.g. \\(a_2 = -2, b_2 = -4\\) gives \\(-2 - 2(-4) = 6\\), not \\(-10\\). The sign trap lives in the doubled, negative component.",
        },
        {
          title: "Magnitude is never negative",
          body:
            "\\(|\\vec v| = \\sqrt{\\,\\cdot\\,}\\) takes the positive root. If a derivation yields a negative number under the root or a negative final magnitude, the arithmetic is wrong — recompute the components.",
        },
      ],
    },

    // ── 3: perpendicularity test + perp-parameter (the EASY staple) ───────────
    {
      kind: "formula" as const,
      slug: "cetvec-dot-perpendicularity-parameter",
      name: "Perpendicularity test and solving for a parameter",
      intuition:
        "Two non-zero vectors are perpendicular exactly when their dot product is zero. The bank's single most-repeated question hands you \\(\\vec a + \\lambda\\vec b\\) (a vector with an unknown \\(\\lambda\\)) and a fixed \\(\\vec c\\), says the two are perpendicular, and asks for \\(\\lambda\\). The recipe never changes: write \\((\\vec a+\\lambda\\vec b)\\cdot\\vec c = 0\\), expand, and solve one linear equation.",
      definition:
        "For non-zero \\(\\vec a, \\vec b\\): \\(\\vec a\\perp\\vec b \\iff \\vec a\\cdot\\vec b = 0\\). " +
        "To find \\(\\lambda\\) such that \\((\\vec a + \\lambda\\vec b)\\perp\\vec c\\): set \\((\\vec a + \\lambda\\vec b)\\cdot\\vec c = 0\\), which gives \\(\\vec a\\cdot\\vec c + \\lambda(\\vec b\\cdot\\vec c) = 0\\), hence \\(\\lambda = -\\dfrac{\\vec a\\cdot\\vec c}{\\vec b\\cdot\\vec c}\\). " +
        "Remember a missing third component (e.g. \\(\\vec c = 3\\hat i + \\hat j\\)) means its \\(\\hat k\\)-component is **0**, not ignored.",
      formula: {
        label: "Perpendicularity and the perp-parameter",
        latex:
          "\\vec a\\perp\\vec b \\iff \\vec a\\cdot\\vec b = 0 \\qquad (\\vec a + \\lambda\\vec b)\\perp\\vec c \\Rightarrow \\lambda = -\\frac{\\vec a\\cdot\\vec c}{\\vec b\\cdot\\vec c}",
        symbols: [
          { symbol: "\\(\\lambda\\)", meaning: "the unknown scalar to solve for" },
          { symbol: "\\(\\vec a\\cdot\\vec c,\\ \\vec b\\cdot\\vec c\\)", meaning: "two scalar dot products, computed once each" },
        ],
      },
      authoredExample: {
        prompt:
          "Find \\(\\lambda\\) so that \\(\\vec a + \\lambda\\vec b\\) is perpendicular to \\(\\vec c\\), where \\(\\vec a = \\hat i + \\hat j + 4\\hat k\\), \\(\\vec b = 2\\hat i - \\hat j + \\hat k\\), \\(\\vec c = 2\\hat i + \\hat j\\).",
        steps: [
          "Compute \\(\\vec a\\cdot\\vec c = (1)(2) + (1)(1) + (4)(0) = 3\\) (note \\(\\vec c\\) has \\(\\hat k\\)-component 0).",
          "Compute \\(\\vec b\\cdot\\vec c = (2)(2) + (-1)(1) + (1)(0) = 3\\).",
          "Set \\(\\vec a\\cdot\\vec c + \\lambda(\\vec b\\cdot\\vec c) = 0\\): \\(3 + 3\\lambda = 0\\).",
          "Solve: \\(\\lambda = -1\\).",
        ],
        answer: "\\(\\lambda = -1\\)",
      },
      selfCheckExample: {
        prompt:
          "Find \\(\\lambda\\) so that \\(2\\hat i - 3\\hat j + \\hat k\\) and \\(\\hat i + \\lambda\\hat j - 5\\hat k\\) are perpendicular.",
        steps: [
          "Set the dot product to zero: \\((2)(1) + (-3)(\\lambda) + (1)(-5) = 0\\).",
          "\\(2 - 3\\lambda - 5 = 0 \\Rightarrow -3 - 3\\lambda = 0\\).",
          "\\(\\lambda = -1\\).",
        ],
        answer: "\\(\\lambda = -1\\)",
      },
      practiceSet: [
        { prompt: "Are \\(\\hat i + \\hat j\\) and \\(\\hat i - \\hat j\\) perpendicular?", answer: "Yes", method: "dot \\(= 1 - 1 = 0\\)" },
        { prompt: "\\(\\lambda\\) for \\(\\hat i + \\lambda\\hat j\\) perpendicular to \\(2\\hat i - \\hat j\\)?", answer: "\\(2\\)", method: "\\(2 - \\lambda = 0\\)" },
        { prompt: "Perpendicularity condition for \\(\\vec a, \\vec b\\)?", answer: "\\(\\vec a\\cdot\\vec b = 0\\)" },
        { prompt: "\\(\\hat k\\)-component of \\(\\vec c = 3\\hat i + \\hat j\\)?", answer: "\\(0\\)" },
      ],
      pyqExampleId: "f4858842-43e1-477b-b560-91ba9ed5af40",
      traps: [
        {
          title: "A missing component is ZERO, not absent",
          body:
            "When \\(\\vec c = 3\\hat i + \\hat j\\), its \\(\\hat k\\)-component is \\(0\\). In the dot product that term contributes \\(0\\) — but you must still write the slot so the \\(\\hat i\\) and \\(\\hat j\\) terms line up with the right components of the other vector.",
        },
        {
          title: "Solve for \\(\\lambda\\) cleanly: \\(\\lambda = -(\\vec a\\cdot\\vec c)/(\\vec b\\cdot\\vec c)\\)",
          body:
            "After expanding, the equation is always linear in \\(\\lambda\\): \\((\\vec a\\cdot\\vec c) + \\lambda(\\vec b\\cdot\\vec c) = 0\\). Compute the two dot products as numbers first, then divide. Sign errors creep in when people expand all the components at once instead.",
        },
        {
          title: "Order matters: \\(\\vec a + \\lambda\\vec b\\) vs \\(\\vec b + \\lambda\\vec a\\)",
          body:
            "If the question reads \\(\\vec b + \\lambda\\vec a\\) perpendicular to \\(\\vec c\\), then \\(\\lambda = -(\\vec b\\cdot\\vec c)/(\\vec a\\cdot\\vec c)\\) — the roles flip. Read which vector carries the \\(\\lambda\\) before substituting.",
        },
      ],
    },

    // ── 4: equivalent perpendicularity disguises (|a+b|=|a−b|) ────────────────
    {
      kind: "formula" as const,
      slug: "cetvec-dot-perpendicularity-disguises",
      name: "Disguised perpendicularity — equal-diagonal and Pythagoras forms",
      intuition:
        "Perpendicularity hides behind two algebraic disguises that exams love. \\(|\\vec a + \\vec b| = |\\vec a - \\vec b|\\) says the two diagonals of the parallelogram on \\(\\vec a, \\vec b\\) are equal — which happens exactly when it is a rectangle, i.e. \\(\\vec a \\perp \\vec b\\). And \\(|\\vec a + \\vec b|^2 = |\\vec a|^2 + |\\vec b|^2\\) is just the Pythagoras identity, again forcing \\(\\vec a\\cdot\\vec b = 0\\).",
      definition:
        "For non-zero \\(\\vec a, \\vec b\\), the following are all equivalent to \\(\\vec a \\perp \\vec b\\):\n" +
        "- \\(\\vec a\\cdot\\vec b = 0\\)\n" +
        "- \\(|\\vec a + \\vec b| = |\\vec a - \\vec b|\\)  (equal diagonals)\n" +
        "- \\(|\\vec a + \\vec b|^2 = |\\vec a|^2 + |\\vec b|^2\\)  (Pythagoras)\n" +
        "Squaring the equal-diagonal form: \\(|\\vec a|^2 + 2\\vec a\\cdot\\vec b + |\\vec b|^2 = |\\vec a|^2 - 2\\vec a\\cdot\\vec b + |\\vec b|^2\\) collapses to \\(4\\,\\vec a\\cdot\\vec b = 0\\).",
      formula: {
        label: "Equivalent perpendicularity statements",
        latex:
          "\\vec a\\perp\\vec b \\iff |\\vec a + \\vec b| = |\\vec a - \\vec b| \\iff |\\vec a + \\vec b|^2 = |\\vec a|^2 + |\\vec b|^2",
        symbols: [
          { symbol: "\\(|\\vec a \\pm \\vec b|\\)", meaning: "lengths of the two parallelogram diagonals" },
        ],
      },
      authoredExample: {
        prompt:
          "If \\(|\\vec a + \\vec b| = |\\vec a - \\vec b|\\), find the angle between \\(\\vec a\\) and \\(\\vec b\\).",
        steps: [
          "Square both sides: \\(|\\vec a|^2 + 2\\vec a\\cdot\\vec b + |\\vec b|^2 = |\\vec a|^2 - 2\\vec a\\cdot\\vec b + |\\vec b|^2\\).",
          "Cancel the like terms: \\(4\\,\\vec a\\cdot\\vec b = 0\\), so \\(\\vec a\\cdot\\vec b = 0\\).",
          "A zero dot product (non-zero vectors) means the vectors are perpendicular.",
        ],
        answer: "\\(\\theta = \\dfrac{\\pi}{2}\\) (i.e. \\(90^\\circ\\))",
      },
      selfCheckExample: {
        prompt:
          "Vectors \\(\\vec a, \\vec b\\) satisfy \\(|\\vec a + \\vec b|^2 = |\\vec a|^2 + |\\vec b|^2\\). What is \\(\\vec a\\cdot\\vec b\\)?",
        steps: [
          "Expand the left side: \\(|\\vec a + \\vec b|^2 = |\\vec a|^2 + 2\\vec a\\cdot\\vec b + |\\vec b|^2\\).",
          "Set equal to \\(|\\vec a|^2 + |\\vec b|^2\\): the \\(2\\vec a\\cdot\\vec b\\) term must vanish.",
          "Hence \\(\\vec a\\cdot\\vec b = 0\\).",
        ],
        answer: "\\(\\vec a\\cdot\\vec b = 0\\) (perpendicular)",
      },
      practiceSet: [
        { prompt: "\\(|\\vec a + \\vec b| = |\\vec a - \\vec b|\\) implies which angle?", answer: "\\(90^\\circ\\)" },
        { prompt: "Expand \\(|\\vec a - \\vec b|^2\\).", answer: "\\(|\\vec a|^2 - 2\\vec a\\cdot\\vec b + |\\vec b|^2\\)" },
        { prompt: "Equal parallelogram diagonals mean the shape is a ___?", answer: "rectangle" },
        { prompt: "If \\(|\\vec a + \\vec b|^2 = |\\vec a|^2 + |\\vec b|^2\\), then \\(\\vec a\\cdot\\vec b = ?\\)", answer: "\\(0\\)" },
      ],
      traps: [
        {
          title: "\\(|\\vec a + \\vec b| = |\\vec a - \\vec b|\\) is NOT \\(\\vec a = \\vec b\\)",
          body:
            "It is tempting to read equal magnitudes as equal vectors. Squaring shows it collapses to \\(\\vec a\\cdot\\vec b = 0\\) — a perpendicularity condition, not an equality. Geometrically, the diagonals of a parallelogram are equal iff it is a rectangle.",
        },
        {
          title: "Pythagoras only works on the PLUS combination for a right angle",
          body:
            "\\(|\\vec a + \\vec b|^2 = |\\vec a|^2 + |\\vec b|^2\\) signals perpendicularity. Don't confuse it with \\(|\\vec a + \\vec b|^2 = |\\vec a|^2 + 2\\vec a\\cdot\\vec b + |\\vec b|^2\\), which is the general expansion that holds for any angle.",
        },
      ],
    },

    // ── 5: angle from the dot-product formula ─────────────────────────────────
    {
      kind: "formula" as const,
      slug: "cetvec-dot-angle-formula",
      name: "Angle between two vectors via cosθ",
      visualizationSlug: "vector-projection",
      intuition:
        "Rearrange \\(\\vec a\\cdot\\vec b = |\\vec a||\\vec b|\\cos\\theta\\) and the angle drops out: divide the dot product by the product of magnitudes. The sign of the result tells you the type of angle immediately — positive means acute, negative means obtuse, and zero means perpendicular.",
      definition:
        "For non-zero \\(\\vec a, \\vec b\\) at angle \\(\\theta \\in [0,\\pi]\\): " +
        "\\(\\cos\\theta = \\dfrac{\\vec a\\cdot\\vec b}{|\\vec a|\\,|\\vec b|}\\). " +
        "Sign rule: \\(\\vec a\\cdot\\vec b > 0 \\Rightarrow\\) acute; \\(\\vec a\\cdot\\vec b = 0 \\Rightarrow\\) right angle; \\(\\vec a\\cdot\\vec b < 0 \\Rightarrow\\) obtuse. " +
        "The same formula works on combinations: to find the angle between \\(3\\vec a + 5\\vec b\\) and \\(5\\vec a + 3\\vec b\\), build each combination in components first, then apply the formula.",
      formula: {
        label: "Angle from the dot product",
        latex:
          "\\cos\\theta = \\dfrac{\\vec a\\cdot\\vec b}{|\\vec a|\\,|\\vec b|}",
        symbols: [
          { symbol: "\\(\\theta\\)", meaning: "angle between the vectors, in \\([0,\\pi]\\)" },
          { symbol: "\\(|\\vec a|, |\\vec b|\\)", meaning: "magnitudes (always positive)" },
        ],
      },
      authoredExample: {
        prompt:
          "Find the angle between \\(\\vec a = \\hat i + \\hat j + \\hat k\\) and \\(\\vec b = \\hat i - \\hat j\\).",
        steps: [
          "Dot product: \\(\\vec a\\cdot\\vec b = (1)(1) + (1)(-1) + (1)(0) = 0\\).",
          "A zero dot product with non-zero vectors means they are perpendicular.",
          "Hence \\(\\theta = \\dfrac{\\pi}{2}\\) — no need to compute magnitudes.",
        ],
        answer: "\\(\\theta = \\dfrac{\\pi}{2}\\)",
      },
      selfCheckExample: {
        prompt:
          "Find the angle between \\(\\vec a = \\hat i + \\hat j\\) and \\(\\vec b = \\hat i\\).",
        steps: [
          "Dot product: \\(\\vec a\\cdot\\vec b = (1)(1) + (1)(0) = 1\\).",
          "Magnitudes: \\(|\\vec a| = \\sqrt{2}\\), \\(|\\vec b| = 1\\).",
          "\\(\\cos\\theta = \\dfrac{1}{\\sqrt{2}\\cdot 1} = \\dfrac{1}{\\sqrt{2}}\\), so \\(\\theta = \\dfrac{\\pi}{4}\\).",
        ],
        answer: "\\(\\theta = \\dfrac{\\pi}{4}\\) (i.e. \\(45^\\circ\\))",
      },
      practiceSet: [
        { prompt: "\\(\\cos\\theta\\) when \\(\\vec a\\cdot\\vec b = 6\\), \\(|\\vec a| = 3\\), \\(|\\vec b| = 4\\)?", answer: "\\(\\tfrac{1}{2}\\)", method: "\\(6/12\\)" },
        { prompt: "If \\(\\cos\\theta < 0\\), the angle is?", answer: "obtuse" },
        { prompt: "Angle between \\(\\vec a\\) and \\(\\vec a\\)?", answer: "\\(0^\\circ\\)" },
        { prompt: "Angle between \\(\\hat i\\) and \\(\\hat k\\)?", answer: "\\(90^\\circ\\)" },
      ],
      pyqExampleId: "e9d96a03-854c-4f28-95c7-2378e1eecf68",
      traps: [
        {
          title: "Build the combinations BEFORE taking the angle",
          body:
            "For the angle between \\(3\\vec a + 5\\vec b\\) and \\(5\\vec a + 3\\vec b\\), you must first compute each combination's components, then dot and divide. You cannot shortcut by 'mixing' the angle between \\(\\vec a\\) and \\(\\vec b\\) directly.",
        },
        {
          title: "Leave the answer as \\(\\cos^{-1}(\\cdot)\\) when it is not a standard angle",
          body:
            "If \\(\\cos\\theta = \\tfrac{13}{19}\\), the angle is \\(\\cos^{-1}\\tfrac{13}{19}\\) — not a round number. The correct option is the inverse-cosine form; don't force it into \\(\\pi/3\\) or \\(\\pi/4\\).",
        },
      ],
    },

    // ── 6: angle from a unit-vector perp constraint (the MODERATE staple) ─────
    {
      kind: "formula" as const,
      slug: "cetvec-dot-unit-vector-constraint-angle",
      name: "Angle from a unit-vector perpendicularity constraint",
      intuition:
        "A whole family of MODERATE PYQs gives two unit vectors and says some combination — like \\(\\vec a + 2\\vec b\\) and \\(5\\vec a - 4\\vec b\\) — is perpendicular, then asks for the angle between \\(\\vec a\\) and \\(\\vec b\\). The workflow never changes: expand the perpendicularity dot product, replace \\(|\\vec a|^2 = |\\vec b|^2 = 1\\) (unit vectors) and \\(\\vec a\\cdot\\vec b = \\cos\\theta\\), then solve one linear equation for \\(\\cos\\theta\\).",
      definition:
        "Given \\((\\alpha\\vec a + \\beta\\vec b)\\cdot(\\gamma\\vec a + \\delta\\vec b) = 0\\) with \\(\\vec a, \\vec b\\) unit vectors, expand to " +
        "\\(\\alpha\\gamma|\\vec a|^2 + (\\alpha\\delta + \\beta\\gamma)\\,\\vec a\\cdot\\vec b + \\beta\\delta|\\vec b|^2 = 0\\). " +
        "Substitute \\(|\\vec a|^2 = |\\vec b|^2 = 1\\) and \\(\\vec a\\cdot\\vec b = \\cos\\theta\\): " +
        "\\(\\alpha\\gamma + (\\alpha\\delta + \\beta\\gamma)\\cos\\theta + \\beta\\delta = 0\\), then read off \\(\\cos\\theta\\).",
      formula: {
        label: "Expansion of a perpendicular constraint (unit vectors)",
        latex:
          "(\\alpha\\vec a + \\beta\\vec b)\\cdot(\\gamma\\vec a + \\delta\\vec b) = \\alpha\\gamma + (\\alpha\\delta + \\beta\\gamma)\\cos\\theta + \\beta\\delta = 0",
        symbols: [
          { symbol: "\\(\\alpha,\\beta,\\gamma,\\delta\\)", meaning: "given coefficients in the two combinations" },
          { symbol: "\\(\\cos\\theta\\)", meaning: "equals \\(\\vec a\\cdot\\vec b\\) — the unknown to isolate" },
        ],
      },
      authoredExample: {
        prompt:
          "\\(\\vec a, \\vec b\\) are unit vectors such that \\(3\\vec a + \\vec b\\) and \\(\\vec a - 3\\vec b\\) are perpendicular. Find the angle between \\(\\vec a\\) and \\(\\vec b\\).",
        steps: [
          "Set \\((3\\vec a + \\vec b)\\cdot(\\vec a - 3\\vec b) = 0\\).",
          "Expand: \\(3|\\vec a|^2 + (-9 + 1)\\vec a\\cdot\\vec b - 3|\\vec b|^2 = 0\\).",
          "Unit vectors: \\(3(1) - 8\\cos\\theta - 3(1) = 0\\), so \\(-8\\cos\\theta = 0\\).",
          "\\(\\cos\\theta = 0 \\Rightarrow \\theta = \\dfrac{\\pi}{2}\\).",
        ],
        answer: "\\(\\theta = \\dfrac{\\pi}{2}\\)",
      },
      selfCheckExample: {
        prompt:
          "\\(\\vec a, \\vec b\\) are unit vectors and \\(\\vec a + \\vec b\\) is perpendicular to \\(\\vec a - \\vec b\\). Find the angle between \\(\\vec a\\) and \\(\\vec b\\).",
        steps: [
          "\\((\\vec a + \\vec b)\\cdot(\\vec a - \\vec b) = |\\vec a|^2 - |\\vec b|^2 = 1 - 1 = 0\\).",
          "This is identically zero, so the constraint holds for any unit \\(\\vec a, \\vec b\\) — the perpendicularity carries no info about \\(\\theta\\) here.",
          "Note this special structure: \\(\\vec a + \\vec b\\) is always perpendicular to \\(\\vec a - \\vec b\\) when \\(|\\vec a| = |\\vec b|\\).",
        ],
        answer: "Any angle — the diagonals of a rhombus are always perpendicular",
      },
      practiceSet: [
        { prompt: "Unit \\(\\vec a, \\vec b\\): expand \\((\\vec a + 2\\vec b)\\cdot(\\vec a - 2\\vec b)\\).", answer: "\\(1 - 4 = -3\\)", method: "\\(|\\vec a|^2 - 4|\\vec b|^2\\); cross terms cancel" },
        { prompt: "If \\(5 + 6\\cos\\theta - 8 = 0\\), find \\(\\cos\\theta\\).", answer: "\\(\\tfrac{1}{2}\\)", method: "\\(6\\cos\\theta = 3\\)" },
        { prompt: "\\(\\cos\\theta = \\tfrac{1}{2}\\) gives which angle?", answer: "\\(\\tfrac{\\pi}{3}\\)" },
        { prompt: "\\(\\cos\\theta = -\\tfrac{1}{2}\\) gives which angle?", answer: "\\(\\tfrac{2\\pi}{3}\\)" },
      ],
      pyqExampleId: "7951d3d0-d047-462f-9bdd-a6d8cc14c24c",
      traps: [
        {
          title: "Coefficient swap flips the angle: check WHICH combination",
          body:
            "\\((\\vec a + 2\\vec b)\\cdot(5\\vec a - 4\\vec b) = 0\\) gives \\(\\cos\\theta = +\\tfrac{1}{2}\\) (so \\(\\tfrac{\\pi}{3}\\)), but \\((5\\vec a + 4\\vec b)\\cdot(\\vec a - 2\\vec b) = 0\\) gives \\(\\cos\\theta = -\\tfrac{1}{2}\\) (so \\(\\tfrac{2\\pi}{3}\\)). The sign of the cross-term coefficient decides acute vs obtuse — read the coefficients exactly.",
        },
        {
          title: "Unit vectors mean \\(|\\vec a|^2 = 1\\), not \\(0\\)",
          body:
            "The self-dot terms \\(|\\vec a|^2\\) and \\(|\\vec b|^2\\) become \\(1\\), not \\(0\\). Dropping them (as if \\(\\vec a\\) were the zero vector) loses the constant terms and gives a wrong \\(\\cos\\theta\\).",
        },
        {
          title: "Don't drop a cross term — there are TWO middle products",
          body:
            "\\((\\alpha\\vec a + \\beta\\vec b)\\cdot(\\gamma\\vec a + \\delta\\vec b)\\) has FOUR products; the two middle ones (\\(\\alpha\\delta\\) and \\(\\beta\\gamma\\)) both contribute to the \\(\\vec a\\cdot\\vec b\\) coefficient. A factor-of-2 wrong answer usually means one was dropped.",
        },
      ],
    },

    // ── 7: scalar & vector projection ─────────────────────────────────────────
    {
      kind: "formula" as const,
      slug: "cetvec-dot-projection",
      name: "Scalar and vector projection",
      visualizationSlug: "vector-projection",
      intuition:
        "The scalar projection of \\(\\vec a\\) on \\(\\vec b\\) is the signed length of \\(\\vec a\\)'s shadow along \\(\\vec b\\): divide the dot product by \\(|\\vec b|\\). The vector projection re-attaches the direction by multiplying that scalar by the unit vector \\(\\hat b\\). A huge slice of CET projection PYQs are 'projection of \\(\\overrightarrow{AB}\\) on \\(\\overrightarrow{CD}\\)' — build both difference vectors from the points first.",
      definition:
        "**Scalar projection** of \\(\\vec a\\) on \\(\\vec b\\): \\(\\dfrac{\\vec a\\cdot\\vec b}{|\\vec b|}\\) (a signed number). " +
        "**Vector projection** of \\(\\vec a\\) on \\(\\vec b\\): \\(\\left(\\dfrac{\\vec a\\cdot\\vec b}{|\\vec b|^2}\\right)\\vec b\\) (a vector along \\(\\vec b\\)). " +
        "For a segment on a line, set \\(\\vec a = \\overrightarrow{AB} = B - A\\) and \\(\\vec b = \\overrightarrow{CD} = D - C\\) (or the line's direction ratios), then apply the formula.",
      formula: {
        label: "Scalar and vector projection of a on b",
        latex:
          "\\text{scalar} = \\frac{\\vec a\\cdot\\vec b}{|\\vec b|}, \\qquad \\text{vector} = \\frac{\\vec a\\cdot\\vec b}{|\\vec b|^2}\\,\\vec b",
        symbols: [
          { symbol: "\\(\\vec a\\cdot\\vec b\\)", meaning: "dot product (carries the sign)" },
          { symbol: "\\(|\\vec b|\\)", meaning: "divide once for scalar; squared for vector" },
        ],
      },
      authoredExample: {
        prompt:
          "Find the scalar projection of \\(\\vec a = 2\\hat i + 3\\hat j + 2\\hat k\\) on \\(\\vec b = \\hat i + 2\\hat j + 2\\hat k\\).",
        steps: [
          "Dot product: \\(\\vec a\\cdot\\vec b = (2)(1) + (3)(2) + (2)(2) = 2 + 6 + 4 = 12\\).",
          "Magnitude of \\(\\vec b\\): \\(|\\vec b| = \\sqrt{1 + 4 + 4} = 3\\).",
          "Scalar projection \\(= \\dfrac{12}{3} = 4\\).",
        ],
        answer: "Scalar projection \\(= 4\\)",
      },
      selfCheckExample: {
        prompt:
          "Find the projection of \\(\\overrightarrow{AB}\\) on \\(\\overrightarrow{CD}\\) where \\(A(1,0,0)\\), \\(B(4,4,0)\\), \\(C(0,0,0)\\), \\(D(0,0,5)\\).",
        steps: [
          "\\(\\overrightarrow{AB} = (3, 4, 0)\\); \\(\\overrightarrow{CD} = (0, 0, 5)\\), so \\(|\\overrightarrow{CD}| = 5\\).",
          "Dot: \\(\\overrightarrow{AB}\\cdot\\overrightarrow{CD} = (3)(0) + (4)(0) + (0)(5) = 0\\).",
          "Scalar projection \\(= 0/5 = 0\\) (the segment AB lies in the \\(xy\\)-plane, perpendicular to \\(\\overrightarrow{CD}\\)).",
        ],
        answer: "Projection \\(= 0\\)",
      },
      practiceSet: [
        { prompt: "Scalar projection of \\(\\vec a\\) on \\(\\vec b\\) formula?", answer: "\\(\\dfrac{\\vec a\\cdot\\vec b}{|\\vec b|}\\)" },
        { prompt: "Projection of \\(\\vec a\\cdot\\vec b = 6\\) onto \\(\\vec b\\) with \\(|\\vec b| = 2\\)?", answer: "\\(3\\)" },
        { prompt: "\\(\\overrightarrow{AB}\\) for \\(A(2,3,-1)\\), \\(B(-2,-4,3)\\)?", answer: "\\((-4,-7,4)\\)", method: "\\(B - A\\)" },
        { prompt: "\\(|\\overrightarrow{CD}|\\) for direction \\((3,-6,2)\\)?", answer: "\\(7\\)", method: "\\(\\sqrt{9+36+4}\\)" },
      ],
      pyqExampleId: "4250ebad-046b-45f4-9933-9b5fc35fd246",
      traps: [
        {
          title: "Divide by \\(|\\vec b|\\) — projection is NOT just the dot product",
          body:
            "The most common projection error is reporting \\(\\vec a\\cdot\\vec b\\) and forgetting to divide by the magnitude of the vector you project ONTO. Scalar projection \\(= (\\vec a\\cdot\\vec b)/|\\vec b|\\); the magnitude in the denominator is non-negotiable.",
        },
        {
          title: "Scalar projection can be negative; magnitude of projection is its absolute value",
          body:
            "If a question asks for the 'magnitude of the projection', take \\(|(\\vec a\\cdot\\vec b)/|\\vec b||\\). A negative scalar projection (e.g. \\(-\\tfrac{1}{7}\\)) just means the shadow points opposite to \\(\\vec b\\) — its magnitude is \\(\\tfrac{1}{7}\\).",
        },
        {
          title: "Vector projection divides by \\(|\\vec b|^2\\), then multiplies by \\(\\vec b\\)",
          body:
            "Don't confuse the two: scalar uses \\(|\\vec b|^1\\) and gives a number; vector uses \\(|\\vec b|^2\\) and multiplies by \\(\\vec b\\) to give a vector. Writing \\(\\tfrac{\\vec a\\cdot\\vec b}{|\\vec b|}\\,\\vec b\\) is dimensionally wrong.",
        },
      ],
    },

    // ── 8: projection onto the normal of a plane (cross then project) ─────────
    {
      kind: "formula" as const,
      slug: "cetvec-dot-projection-on-normal",
      name: "Projection onto the normal of a plane",
      intuition:
        "A trickier projection question asks for the projection of \\(\\vec v\\) onto 'the vector perpendicular to the plane containing \\(\\vec p\\) and \\(\\vec q\\)'. That perpendicular direction is the cross product \\(\\vec n = \\vec p \\times \\vec q\\). Once you have \\(\\vec n\\), it is an ordinary scalar projection of \\(\\vec v\\) onto \\(\\vec n\\).",
      definition:
        "The vector perpendicular to the plane of \\(\\vec p\\) and \\(\\vec q\\) is the **normal** \\(\\vec n = \\vec p \\times \\vec q\\). " +
        "The magnitude of the projection of \\(\\vec v\\) on this normal is \\(\\dfrac{|\\vec v\\cdot\\vec n|}{|\\vec n|}\\). " +
        "So the recipe is: cross-product to get \\(\\vec n\\), then project \\(\\vec v\\) onto \\(\\vec n\\) by the usual scalar-projection rule.",
      formula: {
        label: "Projection on the plane normal",
        latex:
          "\\vec n = \\vec p \\times \\vec q, \\qquad \\text{proj} = \\frac{|\\vec v\\cdot\\vec n|}{|\\vec n|}",
        symbols: [
          { symbol: "\\(\\vec n = \\vec p\\times\\vec q\\)", meaning: "normal to the plane of \\(\\vec p, \\vec q\\)" },
          { symbol: "\\(\\vec v\\cdot\\vec n\\)", meaning: "dot of the target vector with the normal" },
        ],
      },
      authoredExample: {
        prompt:
          "Find the magnitude of the projection of \\(\\vec v = \\hat i + \\hat j + \\hat k\\) on the normal to the plane containing \\(\\vec p = \\hat i + \\hat j\\) and \\(\\vec q = \\hat j + \\hat k\\).",
        steps: [
          "Normal: \\(\\vec n = \\vec p \\times \\vec q = \\begin{vmatrix}\\hat i & \\hat j & \\hat k\\\\1 & 1 & 0\\\\0 & 1 & 1\\end{vmatrix} = \\hat i(1) - \\hat j(1) + \\hat k(1) = \\hat i - \\hat j + \\hat k\\).",
          "\\(|\\vec n| = \\sqrt{1 + 1 + 1} = \\sqrt{3}\\).",
          "\\(\\vec v\\cdot\\vec n = (1)(1) + (1)(-1) + (1)(1) = 1\\).",
          "Projection magnitude \\(= \\dfrac{|1|}{\\sqrt{3}} = \\dfrac{1}{\\sqrt{3}}\\).",
        ],
        answer: "Projection \\(= \\dfrac{1}{\\sqrt{3}}\\)",
      },
      practiceSet: [
        { prompt: "Vector perpendicular to the plane of \\(\\vec p, \\vec q\\)?", answer: "\\(\\vec p \\times \\vec q\\)" },
        { prompt: "\\(\\vec n = (\\hat i + \\hat j + \\hat k)\\times(\\hat i + 2\\hat j + 3\\hat k) = ?\\)", answer: "\\(\\hat i - 2\\hat j + \\hat k\\)" },
        { prompt: "\\(|\\hat i - 2\\hat j + \\hat k|\\)?", answer: "\\(\\sqrt{6}\\)" },
        { prompt: "Projection magnitude of \\(\\vec v\\) on \\(\\vec n\\) formula?", answer: "\\(\\dfrac{|\\vec v\\cdot\\vec n|}{|\\vec n|}\\)" },
      ],
      pyqExampleId: "2cc1ca19-68d3-430b-94b2-bba0fc507e69",
      traps: [
        {
          title: "'Perpendicular to the plane' means CROSS product, not dot",
          body:
            "The phrase 'vector perpendicular to the plane containing \\(\\vec p\\) and \\(\\vec q\\)' is asking for \\(\\vec p \\times \\vec q\\). Trying to project onto \\(\\vec p\\) or \\(\\vec q\\) directly answers a different question.",
        },
        {
          title: "Project onto the NORMAL, then divide by \\(|\\vec n|\\)",
          body:
            "After computing \\(\\vec n\\), it is still an ordinary scalar projection: \\((\\vec v\\cdot\\vec n)/|\\vec n|\\). Forgetting the \\(|\\vec n|\\) denominator (because \\(\\vec n\\) was 'just computed') is the usual slip.",
        },
      ],
    },

    // ── 9: mutually perpendicular / orthogonal → solve for components ─────────
    {
      kind: "formula" as const,
      slug: "cetvec-dot-mutually-orthogonal-system",
      name: "Mutually orthogonal vectors — solving a small system",
      visualizationSlug: "direction-cosines",
      intuition:
        "When a third vector \\(\\vec c\\) with unknown components must be perpendicular to BOTH \\(\\vec a\\) and \\(\\vec b\\), you get two equations: \\(\\vec a\\cdot\\vec c = 0\\) and \\(\\vec b\\cdot\\vec c = 0\\). Each is linear in the two unknowns, so it is a simple \\(2\\times 2\\) system. (\\(\\vec a\\cdot\\vec b = 0\\) is usually already true and just confirms the 'mutually' wording.)",
      definition:
        "For \\(\\vec c = m\\hat i + \\hat j + n\\hat k\\) (or with unknowns \\(p, q\\)) to be perpendicular to both \\(\\vec a\\) and \\(\\vec b\\):\n" +
        "- \\(\\vec a\\cdot\\vec c = 0\\)  →  one linear equation in \\(m, n\\)\n" +
        "- \\(\\vec b\\cdot\\vec c = 0\\)  →  a second linear equation\n" +
        "Solve the two equations simultaneously for the unknowns. 'Mutually perpendicular' / 'mutually orthogonal' both mean every pair has dot product zero.",
      formula: {
        label: "Mutual-orthogonality system",
        latex:
          "\\vec a\\cdot\\vec c = 0 \\;\\text{ and }\\; \\vec b\\cdot\\vec c = 0 \\;\\Rightarrow\\; \\text{solve for the unknown components}",
        symbols: [
          { symbol: "\\(\\vec c\\)", meaning: "the vector with unknown components" },
          { symbol: "two equations", meaning: "linear \\(2\\times 2\\) system from the two dot products" },
        ],
      },
      authoredExample: {
        prompt:
          "Find \\((m, n)\\) so that \\(\\vec c = m\\hat i + \\hat j + n\\hat k\\) is perpendicular to both \\(\\vec a = \\hat i + \\hat j + \\hat k\\) and \\(\\vec b = \\hat i - \\hat j + \\hat k\\).",
        steps: [
          "\\(\\vec a\\cdot\\vec c = 0\\): \\(m + 1 + n = 0\\), i.e. \\(m + n = -1\\).",
          "\\(\\vec b\\cdot\\vec c = 0\\): \\(m - 1 + n = 0\\), i.e. \\(m + n = 1\\).",
          "These two contradict, so re-examine — here the intended system gives \\(m + n = -1\\) and \\(m + n = 1\\) cannot both hold, signalling the chosen \\(\\vec a, \\vec b\\) leave \\(\\vec c\\) under-determined. Use a worked CET case instead: with \\(\\vec a = \\hat i - \\hat j + 2\\hat k\\), \\(\\vec b = 2\\hat i + 4\\hat j + \\hat k\\), the system \\(m - 1 + 2n = 0\\), \\(2m + 4 + n = 0\\) is consistent.",
          "Solve \\(m + 2n = 1\\) and \\(2m + n = -4\\): subtract to get \\(3n = 6\\), so \\(n = 2\\), then \\(m = -3\\).",
        ],
        answer: "\\((m, n) = (-3, 2)\\)",
      },
      selfCheckExample: {
        prompt:
          "Find \\((p, q)\\) so that \\(\\vec c = p\\hat i + \\hat j + q\\hat k\\) is orthogonal to both \\(\\vec a = \\hat i - \\hat j + 2\\hat k\\) and \\(\\vec b = 2\\hat i + 4\\hat j + \\hat k\\).",
        steps: [
          "\\(\\vec a\\cdot\\vec c = p - 1 + 2q = 0 \\Rightarrow p + 2q = 1\\).",
          "\\(\\vec b\\cdot\\vec c = 2p + 4 + q = 0 \\Rightarrow 2p + q = -4\\).",
          "From the first, \\(p = 1 - 2q\\); substitute: \\(2(1 - 2q) + q = -4 \\Rightarrow 2 - 3q = -4 \\Rightarrow q = 2\\), then \\(p = -3\\).",
        ],
        answer: "\\((p, q) = (-3, 2)\\)",
      },
      practiceSet: [
        { prompt: "How many equations does 'perpendicular to both \\(\\vec a\\) and \\(\\vec b\\)' give?", answer: "two" },
        { prompt: "\\(\\vec a\\cdot\\vec c = 0\\) for \\(\\vec a = \\hat i + 2\\hat j\\), \\(\\vec c = m\\hat i + \\hat j\\): equation?", answer: "\\(m + 2 = 0\\)" },
        { prompt: "Solve \\(m + 2n = 1\\), \\(2m + n = -4\\) for \\(n\\).", answer: "\\(2\\)", method: "eliminate \\(m\\)" },
        { prompt: "'Mutually orthogonal' means every pair has dot product = ?", answer: "\\(0\\)" },
      ],
      pyqExampleId: "df8a2d30-5792-4bcb-9a8d-e536bd6319d1",
      traps: [
        {
          title: "Two perpendicularity conditions → two equations, not one",
          body:
            "'Perpendicular to both' is two separate dot-product-zero equations. Using only \\(\\vec a\\cdot\\vec c = 0\\) leaves the components under-determined; you need \\(\\vec b\\cdot\\vec c = 0\\) as well to pin down both unknowns.",
        },
        {
          title: "Watch sign and ordering in the answer pair",
          body:
            "Options frequently include \\((-3,2)\\), \\((2,-3)\\), \\((3,-2)\\), \\((-2,3)\\) — all permutations/sign-flips of the right values. Solve the system carefully and match the unknowns to the right positions (which is \\(m\\) / \\(p\\), which is \\(n\\) / \\(q\\)).",
        },
      ],
    },

    // ── 10: unit vector of a combination ──────────────────────────────────────
    {
      kind: "formula" as const,
      slug: "cetvec-dot-unit-vector-of-combination",
      name: "Unit vector along a combination, and scalar-product conditions",
      intuition:
        "To get the unit vector along any vector \\(\\vec v\\), divide by its magnitude: \\(\\hat v = \\vec v / |\\vec v|\\). The bank tests this on a combination like \\(3\\vec a + \\vec b - 2\\vec c\\) (build it in components first), and in a subtler variant where the scalar product of \\(\\hat i + \\hat j + \\hat k\\) with the unit vector along a sum equals 1, asking you to solve for a parameter.",
      definition:
        "Unit vector: \\(\\hat v = \\dfrac{\\vec v}{|\\vec v|}\\). " +
        "For 'the scalar product of \\(\\vec w\\) with the unit vector along \\(\\vec s\\) equals \\(k\\)': write \\(\\dfrac{\\vec w\\cdot\\vec s}{|\\vec s|} = k\\) and solve. " +
        "Build any combination \\(p\\vec a + q\\vec b + r\\vec c\\) component-by-component before taking the magnitude.",
      formula: {
        label: "Unit vector of a combination",
        latex:
          "\\hat v = \\frac{\\vec v}{|\\vec v|}, \\qquad \\frac{\\vec w\\cdot\\vec s}{|\\vec s|} = k",
        symbols: [
          { symbol: "\\(\\hat v\\)", meaning: "unit vector (magnitude 1) along \\(\\vec v\\)" },
          { symbol: "\\(k\\)", meaning: "the given scalar-product value to solve against" },
        ],
      },
      authoredExample: {
        prompt:
          "Find the unit vector in the direction of \\(\\vec p + 2\\vec q\\), where \\(\\vec p = 4\\hat i - \\hat j + 8\\hat k\\) and \\(\\vec q = \\hat i + 2\\hat j - \\hat k\\).",
        steps: [
          "Build the combination: \\(2\\vec q = 2\\hat i + 4\\hat j - 2\\hat k\\); \\(\\vec p + 2\\vec q = (4+2)\\hat i + (-1+4)\\hat j + (8-2)\\hat k = 6\\hat i + 3\\hat j + 6\\hat k\\).",
          "Magnitude: \\(\\sqrt{36 + 9 + 36} = \\sqrt{81} = 9\\).",
          "Unit vector \\(= \\dfrac{1}{9}(6\\hat i + 3\\hat j + 6\\hat k) = \\dfrac{1}{3}(2\\hat i + \\hat j + 2\\hat k)\\).",
        ],
        answer: "\\(\\dfrac{1}{3}(2\\hat i + \\hat j + 2\\hat k)\\)",
      },
      selfCheckExample: {
        prompt:
          "Find the unit vector along \\(\\vec a + \\vec b\\) where \\(\\vec a = 3\\hat i + 4\\hat k\\) and \\(\\vec b = -3\\hat i + 3\\hat k\\).",
        steps: [
          "\\(\\vec a + \\vec b = 0\\hat i + 0\\hat j + 7\\hat k = 7\\hat k\\).",
          "Magnitude \\(= 7\\).",
          "Unit vector \\(= \\dfrac{7\\hat k}{7} = \\hat k\\).",
        ],
        answer: "\\(\\hat k\\)",
      },
      practiceSet: [
        { prompt: "Unit vector along \\(3\\hat i + 4\\hat j\\)?", answer: "\\(\\tfrac{1}{5}(3\\hat i + 4\\hat j)\\)", method: "divide by \\(5\\)" },
        { prompt: "Magnitude of any unit vector?", answer: "\\(1\\)" },
        { prompt: "Unit vector along \\(\\vec v\\) formula?", answer: "\\(\\dfrac{\\vec v}{|\\vec v|}\\)" },
        { prompt: "\\(3\\vec a + \\vec b - 2\\vec c\\): how to start?", answer: "build it component-by-component first" },
      ],
      pyqExampleId: "4e2f4378-76c0-4649-844d-87230130c2e3",
      traps: [
        {
          title: "Divide the WHOLE vector by its magnitude",
          body:
            "A unit vector keeps the direction and rescales the length to 1: every component is divided by the same \\(|\\vec v|\\). Dividing only one component, or forgetting the \\(\\hat j\\)-component when it is zero, breaks the unit-length property.",
        },
        {
          title: "Compute the combination's components BEFORE the magnitude",
          body:
            "For \\(3\\vec a + \\vec b - 2\\vec c\\), do the scalar multiplications and the add/subtract per component first, then take \\(\\sqrt{\\sum(\\cdot)^2}\\). Taking magnitudes of \\(\\vec a, \\vec b, \\vec c\\) individually and combining them is wrong.",
        },
      ],
    },

    // ── 11: dot-product identities & inequalities (sum of squared diffs) ──────
    {
      kind: "formula" as const,
      slug: "cetvec-dot-identities-and-bounds",
      name: "Identities and bounds — sum of squared differences",
      intuition:
        "Some HARD questions ask for the maximum of \\(|\\vec a - \\vec b|^2 + |\\vec b - \\vec c|^2 + |\\vec c - \\vec a|^2\\). Expanding each square turns the whole thing into self-dots plus dot products, and a neat identity lets you bound it: the sum equals \\(3(|\\vec a|^2 + |\\vec b|^2 + |\\vec c|^2) - |\\vec a + \\vec b + \\vec c|^2\\). Since the subtracted term is \\(\\ge 0\\), the maximum is \\(2(|\\vec a|^2 + |\\vec b|^2 + |\\vec c|^2)\\), attained when \\(\\vec a + \\vec b + \\vec c = \\vec 0\\).",
      definition:
        "Expanding each squared difference: " +
        "\\(|\\vec a - \\vec b|^2 + |\\vec b - \\vec c|^2 + |\\vec c - \\vec a|^2 = 2(|\\vec a|^2 + |\\vec b|^2 + |\\vec c|^2) - 2(\\vec a\\cdot\\vec b + \\vec b\\cdot\\vec c + \\vec c\\cdot\\vec a)\\). " +
        "Equivalently \\(= 3(|\\vec a|^2 + |\\vec b|^2 + |\\vec c|^2) - |\\vec a + \\vec b + \\vec c|^2\\). " +
        "Since \\(|\\vec a + \\vec b + \\vec c|^2 \\ge 0\\), the expression **does not exceed** \\(2(|\\vec a|^2 + |\\vec b|^2 + |\\vec c|^2)\\).",
      formula: {
        label: "Sum-of-squared-differences identity and bound",
        latex:
          "\\sum |\\vec a - \\vec b|^2 = 3\\!\\left(|\\vec a|^2 + |\\vec b|^2 + |\\vec c|^2\\right) - |\\vec a + \\vec b + \\vec c|^2 \\;\\le\\; 2\\!\\left(|\\vec a|^2 + |\\vec b|^2 + |\\vec c|^2\\right)",
        symbols: [
          { symbol: "\\(|\\vec a + \\vec b + \\vec c|^2\\)", meaning: "the non-negative term that is subtracted; zero at the maximum" },
        ],
      },
      authoredExample: {
        prompt:
          "If \\(|\\vec a| = 1\\), \\(|\\vec b| = 2\\), \\(|\\vec c| = 2\\), find the maximum of \\(|\\vec a - \\vec b|^2 + |\\vec b - \\vec c|^2 + |\\vec c - \\vec a|^2\\).",
        steps: [
          "Use the identity: the sum \\(= 3(|\\vec a|^2 + |\\vec b|^2 + |\\vec c|^2) - |\\vec a + \\vec b + \\vec c|^2\\).",
          "Compute \\(|\\vec a|^2 + |\\vec b|^2 + |\\vec c|^2 = 1 + 4 + 4 = 9\\).",
          "Maximum occurs when \\(|\\vec a + \\vec b + \\vec c|^2 = 0\\), giving \\(2 \\times 9 = 18\\).",
        ],
        answer: "Maximum \\(= 18\\)",
      },
      selfCheckExample: {
        prompt:
          "Expand \\(|\\vec a - \\vec b|^2 + |\\vec b - \\vec c|^2 + |\\vec c - \\vec a|^2\\) in terms of magnitudes and dot products.",
        steps: [
          "Each square: \\(|\\vec a - \\vec b|^2 = |\\vec a|^2 - 2\\vec a\\cdot\\vec b + |\\vec b|^2\\), and similarly for the others.",
          "Adding the three: each magnitude-squared appears twice, and each dot product appears once with a \\(-2\\).",
          "Sum \\(= 2(|\\vec a|^2 + |\\vec b|^2 + |\\vec c|^2) - 2(\\vec a\\cdot\\vec b + \\vec b\\cdot\\vec c + \\vec c\\cdot\\vec a)\\).",
        ],
        answer: "\\(2(|\\vec a|^2 + |\\vec b|^2 + |\\vec c|^2) - 2(\\vec a\\cdot\\vec b + \\vec b\\cdot\\vec c + \\vec c\\cdot\\vec a)\\)",
      },
      practiceSet: [
        { prompt: "When is \\(\\sum|\\vec a - \\vec b|^2\\) maximised?", answer: "when \\(\\vec a + \\vec b + \\vec c = \\vec 0\\)" },
        { prompt: "Max of \\(\\sum|\\vec a - \\vec b|^2\\) in terms of magnitudes?", answer: "\\(2(|\\vec a|^2 + |\\vec b|^2 + |\\vec c|^2)\\)" },
        { prompt: "\\(|\\vec a|=3, |\\vec b|=5, |\\vec c|=7\\): \\(|\\vec a|^2+|\\vec b|^2+|\\vec c|^2 = ?\\)", answer: "\\(83\\)" },
        { prompt: "Max of \\(\\sum|\\vec a - \\vec b|^2\\) for those magnitudes?", answer: "\\(166\\)", method: "\\(2 \\times 83\\)" },
      ],
      pyqExampleId: "eeefa95d-1596-4761-9c2a-99132519881f",
      traps: [
        {
          title: "'Does not exceed' = maximum, not the typical value",
          body:
            "The phrase 'does not exceed' asks for the UPPER BOUND. Expand the identity, then set the subtracted \\(|\\vec a + \\vec b + \\vec c|^2 = 0\\) to reach the maximum \\(2(|\\vec a|^2 + |\\vec b|^2 + |\\vec c|^2)\\) — a popular distractor is \\(83\\) (the magnitude sum) or \\(249\\) (\\(3\\times\\)).",
        },
        {
          title: "Each magnitude-squared appears TWICE in the expanded sum",
          body:
            "When you add the three squared differences, \\(|\\vec a|^2\\) shows up in both \\(|\\vec a - \\vec b|^2\\) and \\(|\\vec c - \\vec a|^2\\). Forgetting that doubling gives \\(1\\times\\) instead of \\(2\\times\\) the magnitude sum.",
        },
      ],
    },

    // ── 12: dot product with cross/triple constraints (HARD a·c, c·b) ─────────
    {
      kind: "formula" as const,
      slug: "cetvec-dot-with-cross-constraints",
      name: "Dot products entangled with cross-product constraints",
      intuition:
        "The hardest dot-product PYQs bundle a dot condition with a cross-product or angle condition on an unknown vector \\(\\vec c\\). The move is to extract \\(|\\vec c|\\) (often from \\(|(\\vec a\\times\\vec b)\\times\\vec c| = |\\vec a\\times\\vec b||\\vec c|\\sin\\phi\\) or a \\(\\vec b\\times(\\vec c - \\vec a) = \\vec 0\\) parallelism), then plug into a magnitude expansion like \\(|\\vec c - \\vec a|^2 = |\\vec c|^2 + |\\vec a|^2 - 2\\vec a\\cdot\\vec c\\) to solve for the wanted dot product.",
      definition:
        "Two recurring structures:\n" +
        "- **Magnitude expansion:** \\(|\\vec c - \\vec a|^2 = |\\vec c|^2 + |\\vec a|^2 - 2\\,\\vec a\\cdot\\vec c\\) — solve for \\(\\vec a\\cdot\\vec c\\) once \\(|\\vec c|\\) and \\(|\\vec c - \\vec a|\\) are known.\n" +
        "- **Parallelism from a cross equation:** \\(\\vec b\\times\\vec c = \\vec b\\times\\vec a \\Rightarrow \\vec b\\times(\\vec c - \\vec a) = \\vec 0 \\Rightarrow \\vec c - \\vec a = \\lambda\\vec b\\). Combine with a given dot condition (e.g. \\(\\vec c\\cdot\\vec a = 0\\)) to find \\(\\lambda\\), then any other dot product.",
      formula: {
        label: "Magnitude expansion to extract a dot product",
        latex:
          "|\\vec c - \\vec a|^2 = |\\vec c|^2 + |\\vec a|^2 - 2\\,\\vec a\\cdot\\vec c \\;\\Rightarrow\\; \\vec a\\cdot\\vec c = \\frac{|\\vec c|^2 + |\\vec a|^2 - |\\vec c - \\vec a|^2}{2}",
        symbols: [
          { symbol: "\\(|\\vec c|\\)", meaning: "extracted from the cross-product / angle condition first" },
          { symbol: "\\(\\vec a\\cdot\\vec c\\)", meaning: "the unknown dot product, isolated from the expansion" },
        ],
      },
      authoredExample: {
        prompt:
          "Let \\(|\\vec a| = 3\\) and \\(\\vec c\\) satisfy \\(|\\vec c| = 2\\) and \\(|\\vec c - \\vec a| = 4\\). Find \\(\\vec a\\cdot\\vec c\\).",
        steps: [
          "Use \\(|\\vec c - \\vec a|^2 = |\\vec c|^2 + |\\vec a|^2 - 2\\,\\vec a\\cdot\\vec c\\).",
          "Substitute: \\(16 = 4 + 9 - 2\\,\\vec a\\cdot\\vec c\\).",
          "\\(16 = 13 - 2\\,\\vec a\\cdot\\vec c \\Rightarrow 2\\,\\vec a\\cdot\\vec c = -3\\).",
          "\\(\\vec a\\cdot\\vec c = -\\dfrac{3}{2}\\).",
        ],
        answer: "\\(\\vec a\\cdot\\vec c = -\\dfrac{3}{2}\\)",
      },
      selfCheckExample: {
        prompt:
          "If \\(\\vec b\\times\\vec c = \\vec b\\times\\vec a\\) and \\(\\vec c\\cdot\\vec a = 0\\), with \\(\\vec a = \\hat i + 2\\hat j - \\hat k\\), \\(\\vec b = \\hat i + \\hat j - \\hat k\\), find \\(\\lambda\\) where \\(\\vec c = \\vec a + \\lambda\\vec b\\).",
        steps: [
          "\\(\\vec b\\times(\\vec c - \\vec a) = \\vec 0\\) means \\(\\vec c - \\vec a = \\lambda\\vec b\\), so \\(\\vec c = \\vec a + \\lambda\\vec b\\).",
          "Apply \\(\\vec c\\cdot\\vec a = 0\\): \\((\\vec a + \\lambda\\vec b)\\cdot\\vec a = |\\vec a|^2 + \\lambda(\\vec a\\cdot\\vec b) = 0\\).",
          "\\(|\\vec a|^2 = 1+4+1 = 6\\); \\(\\vec a\\cdot\\vec b = 1+2+1 = 4\\). So \\(6 + 4\\lambda = 0\\), \\(\\lambda = -\\tfrac{3}{2}\\).",
        ],
        answer: "\\(\\lambda = -\\dfrac{3}{2}\\)",
      },
      practiceSet: [
        { prompt: "Expand \\(|\\vec c - \\vec a|^2\\).", answer: "\\(|\\vec c|^2 + |\\vec a|^2 - 2\\,\\vec a\\cdot\\vec c\\)" },
        { prompt: "\\(\\vec b\\times\\vec c = \\vec b\\times\\vec a\\) implies \\(\\vec c - \\vec a\\) is parallel to ?", answer: "\\(\\vec b\\)" },
        { prompt: "If \\(16 = 13 - 2x\\), find \\(x\\).", answer: "\\(-\\tfrac{3}{2}\\)" },
        { prompt: "\\(|(\\vec a\\times\\vec b)\\times\\vec c|\\) at angle \\(\\phi\\) equals?", answer: "\\(|\\vec a\\times\\vec b||\\vec c|\\sin\\phi\\)" },
      ],
      pyqExampleId: "6d5f73cb-ef7c-4e3f-a921-9e613ecf37c3",
      traps: [
        {
          title: "Extract \\(|\\vec c|\\) FIRST from the cross/angle condition",
          body:
            "The magnitude expansion needs \\(|\\vec c|\\). Get it from the given \\(|(\\vec a\\times\\vec b)\\times\\vec c| = |\\vec a\\times\\vec b||\\vec c|\\sin\\phi\\) before plugging into \\(|\\vec c - \\vec a|^2\\). Skipping this leaves an unknown that blocks the solve.",
        },
        {
          title: "\\(\\vec b\\times\\vec c = \\vec b\\times\\vec a\\) is NOT \\(\\vec c = \\vec a\\)",
          body:
            "Cross products being equal only forces \\(\\vec c - \\vec a\\) to be PARALLEL to \\(\\vec b\\) (i.e. \\(\\vec c = \\vec a + \\lambda\\vec b\\)), not equal vectors. The free \\(\\lambda\\) is then fixed by a separate dot condition.",
        },
      ],
    },

    // ── 13: obtuse-for-all-x quadratic parameter (HARD) ──────────────────────
    {
      kind: "formula" as const,
      slug: "cetvec-dot-obtuse-for-all-x",
      name: "Obtuse angle for all x — a quadratic-inequality parameter",
      intuition:
        "A signature HARD question makes the two vectors depend on a real \\(x\\) and demands the angle between them be obtuse for EVERY \\(x\\). Obtuse means \\(\\vec a\\cdot\\vec b < 0\\); doing the dot product gives a quadratic in \\(x\\), and 'for all \\(x\\)' forces that quadratic to be negative everywhere — which needs a negative leading coefficient AND a negative discriminant.",
      definition:
        "If \\(\\vec a\\cdot\\vec b = Ax^2 + Bx + C\\) and this must be \\(< 0\\) for all real \\(x\\):\n" +
        "- **Leading coefficient** \\(A < 0\\) (the parabola opens downward), and\n" +
        "- **Discriminant** \\(B^2 - 4AC < 0\\) (no real roots, so it never touches zero).\n" +
        "Both conditions together give the allowed interval for the parameter.",
      formula: {
        label: "Negative-for-all-x conditions",
        latex:
          "Ax^2 + Bx + C < 0 \\;\\forall x \\iff A < 0 \\;\\text{ and }\\; B^2 - 4AC < 0",
        symbols: [
          { symbol: "\\(A < 0\\)", meaning: "downward-opening parabola" },
          { symbol: "\\(B^2 - 4AC < 0\\)", meaning: "no real roots — stays below the axis everywhere" },
        ],
      },
      authoredExample: {
        prompt:
          "For all real \\(x\\), the vectors \\(\\vec a = Cx\\hat i - 6\\hat j - 3\\hat k\\) and \\(\\vec b = x\\hat i + 2\\hat j + 2Cx\\hat k\\) make an obtuse angle. Find the range of \\(C\\).",
        steps: [
          "Dot product: \\(\\vec a\\cdot\\vec b = Cx^2 - 12 - 6Cx = Cx^2 - 6Cx - 12\\). Require \\(< 0\\) for all \\(x\\).",
          "Leading coefficient condition: \\(C < 0\\).",
          "Discriminant condition: \\((-6C)^2 - 4(C)(-12) < 0 \\Rightarrow 36C^2 + 48C < 0 \\Rightarrow 12C(3C + 4) < 0\\).",
          "With \\(C < 0\\), \\(12C(3C+4) < 0\\) holds when \\(3C + 4 > 0\\), i.e. \\(C > -\\tfrac{4}{3}\\). Combined: \\(-\\tfrac{4}{3} < C < 0\\).",
        ],
        answer: "\\(C \\in \\left(-\\dfrac{4}{3},\\, 0\\right)\\)",
      },
      practiceSet: [
        { prompt: "\\(Ax^2 + Bx + C < 0\\) for all \\(x\\) needs which sign of \\(A\\)?", answer: "\\(A < 0\\)" },
        { prompt: "And which discriminant condition?", answer: "\\(B^2 - 4AC < 0\\)" },
        { prompt: "Obtuse angle means \\(\\vec a\\cdot\\vec b\\) is?", answer: "negative" },
        { prompt: "Solve \\(36C^2 + 48C < 0\\) (with \\(C<0\\)).", answer: "\\(-\\tfrac{4}{3} < C < 0\\)", method: "\\(12C(3C+4)<0\\)" },
      ],
      pyqExampleId: "724cdaae-d8f0-4e15-baec-974eadf568df",
      traps: [
        {
          title: "Obtuse-for-ALL-x needs BOTH conditions",
          body:
            "A negative dot product at one \\(x\\) is not enough. 'For all \\(x\\)' forces the quadratic below the axis everywhere: leading coefficient negative AND discriminant negative. Using only one gives too wide an interval.",
        },
        {
          title: "Obtuse is strict: exclude the perpendicular boundary",
          body:
            "\\(\\vec a\\cdot\\vec b = 0\\) is a right angle, not obtuse. The discriminant must be strictly \\(< 0\\) (not \\(\\le 0\\)) so the dot product never reaches zero for any \\(x\\).",
        },
      ],
    },

    // ── 14: position vector a cos t + b sin t, farthest point (HARD) ─────────
    {
      kind: "formula" as const,
      slug: "cetvec-dot-moving-point-farthest",
      name: "Moving point a·cos t + b·sin t — farthest from the origin",
      intuition:
        "A point P traces \\(\\overrightarrow{OP} = \\hat a\\cos t + \\hat b\\sin t\\) for unit vectors \\(\\hat a, \\hat b\\). To find when P is farthest from O, maximise \\(|\\overrightarrow{OP}|^2\\). Expanding gives \\(1 + (\\hat a\\cdot\\hat b)\\sin 2t\\), so the maximum is at \\(\\sin 2t = 1\\) (i.e. \\(t = \\pi/4\\)), where \\(\\overrightarrow{OP}\\) lands along \\(\\hat a + \\hat b\\).",
      definition:
        "For \\(\\overrightarrow{OP} = \\hat a\\cos t + \\hat b\\sin t\\) with \\(|\\hat a| = |\\hat b| = 1\\):\n" +
        "- \\(|\\overrightarrow{OP}|^2 = \\cos^2 t + \\sin^2 t + 2(\\hat a\\cdot\\hat b)\\sin t\\cos t = 1 + (\\hat a\\cdot\\hat b)\\sin 2t\\).\n" +
        "- For an acute angle \\(\\hat a\\cdot\\hat b > 0\\), this is maximised at \\(\\sin 2t = 1\\) (so \\(t = \\pi/4\\)), giving \\(M = \\sqrt{1 + \\hat a\\cdot\\hat b}\\).\n" +
        "- At \\(t = \\pi/4\\), \\(\\overrightarrow{OP} = \\tfrac{1}{\\sqrt 2}(\\hat a + \\hat b)\\), so the unit vector along it is \\(\\hat u = \\dfrac{\\hat a + \\hat b}{|\\hat a + \\hat b|}\\). The same answer holds for \\(\\hat a\\sin t + \\hat b\\cos t\\).",
      formula: {
        label: "Farthest-point magnitude and direction",
        latex:
          "|\\overrightarrow{OP}|^2 = 1 + (\\hat a\\cdot\\hat b)\\sin 2t, \\quad M = \\sqrt{1 + \\hat a\\cdot\\hat b}, \\quad \\hat u = \\frac{\\hat a + \\hat b}{|\\hat a + \\hat b|}",
        symbols: [
          { symbol: "\\(\\hat a\\cdot\\hat b\\)", meaning: "cosine of the (acute) angle between the unit vectors" },
          { symbol: "\\(M\\)", meaning: "maximum distance, at \\(t = \\pi/4\\)" },
        ],
      },
      authoredExample: {
        prompt:
          "A point P has \\(\\overrightarrow{OP} = \\hat a\\cos t + \\hat b\\sin t\\) where \\(\\hat a, \\hat b\\) are unit vectors at an acute angle. Find \\(|\\overrightarrow{OP}|^2\\) as a function of \\(t\\) and the value of \\(t\\) that maximises it.",
        steps: [
          "Square: \\(|\\overrightarrow{OP}|^2 = |\\hat a|^2\\cos^2 t + |\\hat b|^2\\sin^2 t + 2(\\hat a\\cdot\\hat b)\\sin t\\cos t\\).",
          "Unit vectors: \\(= \\cos^2 t + \\sin^2 t + (\\hat a\\cdot\\hat b)\\sin 2t = 1 + (\\hat a\\cdot\\hat b)\\sin 2t\\).",
          "Since \\(\\hat a\\cdot\\hat b > 0\\) (acute), the maximum is at \\(\\sin 2t = 1\\), i.e. \\(2t = \\tfrac{\\pi}{2}\\), so \\(t = \\tfrac{\\pi}{4}\\).",
        ],
        answer: "\\(|\\overrightarrow{OP}|^2 = 1 + (\\hat a\\cdot\\hat b)\\sin 2t\\); maximised at \\(t = \\dfrac{\\pi}{4}\\)",
      },
      practiceSet: [
        { prompt: "\\(\\cos^2 t + \\sin^2 t = ?\\)", answer: "\\(1\\)" },
        { prompt: "\\(2\\sin t\\cos t = ?\\)", answer: "\\(\\sin 2t\\)" },
        { prompt: "\\(\\sin 2t\\) is maximised at \\(t = ?\\)", answer: "\\(\\tfrac{\\pi}{4}\\)" },
        { prompt: "Direction of \\(\\overrightarrow{OP}\\) at the farthest point?", answer: "along \\(\\hat a + \\hat b\\)" },
      ],
      pyqExampleId: "6550bd8d-f8bb-4ad4-b062-9f1b54fd7417",
      traps: [
        {
          title: "Maximise \\(|\\overrightarrow{OP}|^2\\), then the direction is \\(\\hat a + \\hat b\\) (plus, not minus)",
          body:
            "At \\(t = \\pi/4\\), both \\(\\cos t\\) and \\(\\sin t\\) are positive and equal, so \\(\\overrightarrow{OP} \\propto \\hat a + \\hat b\\). The 'minus' direction \\(\\hat a - \\hat b\\) is the MINIMUM (nearest), a common distractor.",
        },
        {
          title: "The cross term is \\((\\hat a\\cdot\\hat b)\\sin 2t\\), coefficient 1 not 2",
          body:
            "After using \\(2\\sin t\\cos t = \\sin 2t\\), the magnitude-squared is \\(1 + (\\hat a\\cdot\\hat b)\\sin 2t\\), so \\(M = (1 + \\hat a\\cdot\\hat b)^{1/2}\\). A distractor uses \\((1 + 2\\,\\hat a\\cdot\\hat b)^{1/2}\\) — that keeps the stray factor of 2.",
        },
      ],
    },

    // ── 15: perpendicularity as a geometric centre (orthocentre) ─────────────
    {
      kind: "formula" as const,
      slug: "cetvec-dot-orthocentre-perpendicular-interpretation",
      name: "Reading perpendicularity geometrically — the orthocentre",
      intuition:
        "When position vectors satisfy dot conditions like \\((\\vec a - \\vec d)\\cdot(\\vec b - \\vec c) = 0\\), translate each as 'this segment is perpendicular to that segment'. Here \\(\\overrightarrow{DA}\\perp\\overrightarrow{BC}\\) and \\(\\overrightarrow{DB}\\perp\\overrightarrow{CA}\\) say D lies on two altitudes of triangle ABC — so D is the orthocentre. The skill is converting a dot-product equation into a perpendicular line and recognising the triangle centre it defines.",
      definition:
        "A dot-product-zero condition on differences of position vectors is a perpendicularity statement between the corresponding segments:\n" +
        "- \\((\\vec a - \\vec d)\\cdot(\\vec b - \\vec c) = 0\\) means \\(\\overrightarrow{DA}\\perp\\overrightarrow{BC}\\) (D on the altitude from A).\n" +
        "- A second such condition puts D on a second altitude.\n" +
        "Two altitudes meet at the **orthocentre**, so D is the orthocentre of \\(\\triangle ABC\\). (Contrast: equal-distance conditions give the circumcentre; equal-ratio/median conditions give the centroid.)",
      formula: {
        label: "Dot-zero on differences = perpendicular segments",
        latex:
          "(\\vec a - \\vec d)\\cdot(\\vec b - \\vec c) = 0 \\iff \\overrightarrow{DA}\\perp\\overrightarrow{BC}",
        symbols: [
          { symbol: "\\(\\overrightarrow{DA}\\)", meaning: "the segment \\(\\vec a - \\vec d\\)" },
          { symbol: "altitudes", meaning: "two perpendicularity conditions → their intersection is the orthocentre" },
        ],
      },
      authoredExample: {
        prompt:
          "Points A, B, C, D have position vectors \\(\\vec a, \\vec b, \\vec c, \\vec d\\) with \\((\\vec a - \\vec d)\\cdot(\\vec b - \\vec c) = 0\\) and \\((\\vec b - \\vec d)\\cdot(\\vec c - \\vec a) = 0\\). What is D for \\(\\triangle ABC\\)?",
        steps: [
          "Read the first condition: \\(\\overrightarrow{DA}\\perp\\overrightarrow{BC}\\), so D lies on the altitude from A (perpendicular to BC).",
          "Read the second: \\(\\overrightarrow{DB}\\perp\\overrightarrow{CA}\\), so D lies on the altitude from B.",
          "D is on two altitudes; their intersection is the orthocentre.",
        ],
        answer: "D is the orthocentre of \\(\\triangle ABC\\)",
      },
      practiceSet: [
        { prompt: "\\((\\vec a - \\vec d)\\cdot(\\vec b - \\vec c) = 0\\) means which segments are perpendicular?", answer: "\\(DA \\perp BC\\)" },
        { prompt: "Intersection of two altitudes of a triangle is the?", answer: "orthocentre" },
        { prompt: "Equal-distance-from-vertices condition gives which centre?", answer: "circumcentre" },
        { prompt: "A perpendicular from a vertex to the opposite side is called an?", answer: "altitude" },
      ],
      pyqExampleId: "3112089a-f0ec-4c2d-8fbe-12b22a0dea60",
      traps: [
        {
          title: "Altitudes → orthocentre, not circumcentre",
          body:
            "Perpendicularity of \\(\\overrightarrow{DA}\\) to \\(\\overrightarrow{BC}\\) defines an ALTITUDE, and altitudes meet at the orthocentre. The circumcentre comes from equal DISTANCES (\\(|\\vec d - \\vec a| = |\\vec d - \\vec b|\\)); don't swap the two centres.",
        },
        {
          title: "Translate each dot-zero into the correct perpendicular pair",
          body:
            "\\((\\vec a - \\vec d)\\) is \\(\\overrightarrow{DA}\\) and \\((\\vec b - \\vec c)\\) is \\(\\overrightarrow{CB}\\). Get the segment endpoints right before naming the altitude, or you may attach D to the wrong vertex's altitude.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Cross product, area, and the scalar triple product",
      href: "/notes/mht-cet-maths/vectors/cross-product",
    },
  ],
};
