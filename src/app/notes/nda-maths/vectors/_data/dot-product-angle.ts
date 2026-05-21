import type { SubtopicNote } from "@/app/notes/_types";

export const DOT_PRODUCT_ANGLE_NOTE: SubtopicNote = {
  subtopicName: "Dot Product and Angle",
  title: "Dot Product and Angle",
  oneLineDefinition:
    "The scalar that captures how aligned two vectors are — used to compute angles, test perpendicularity, and evaluate work done by a force.",
  whyItMatters:
    "The dot product turns two vectors into a single number — and that number contains everything you'd ever want to know about how the two vectors RELATE. " +
    "Are they perpendicular? At what angle do they meet? How aligned are they with each other? " +
    "The five concepts below build that toolkit: starting with the formula itself (and its physical meaning as work done by a force, W = F · d), through the perpendicularity test and the angle formula, ending with the most-tested setup — \"given a constraint on two vectors a and b, find the angle between them.\" " +
    "32 PYQs across 2017–2026 — the second-biggest Vectors subtopic; almost every paper has one — with a difficulty mix of 12 EASY + 16 MODERATE + 4 HARD.",
  concepts: [
    // 1 ───────────────────────────────────────────────────────────────────────
    {
      slug: "dot-product-evaluation-and-work",
      name: "Dot product — components form and work done",
      intuition:
        "The dot product of two vectors is a single number that measures how much they overlap. " +
        "Compute it by multiplying corresponding components and summing — no angles needed. " +
        "Physically, when a constant force \\(\\vec{F}\\) displaces a particle by \\(\\vec{d}\\), the work done is exactly \\(\\vec{F}\\cdot\\vec{d}\\).",
      definition:
        "If \\(\\vec{a} = a_1\\hat{i} + a_2\\hat{j} + a_3\\hat{k}\\) and \\(\\vec{b} = b_1\\hat{i} + b_2\\hat{j} + b_3\\hat{k}\\), then " +
        "\\(\\vec{a}\\cdot\\vec{b} = a_1b_1 + a_2b_2 + a_3b_3\\). " +
        "It is commutative, distributive over addition, and a scalar (not a vector). " +
        "Work done by a constant force is \\(W = \\vec{F}\\cdot\\vec{d}\\) where \\(\\vec{d}\\) is the displacement.",
      formula: {
        label: "Dot product (components form)",
        latex:
          "\\vec{a}\\cdot\\vec{b} = a_1 b_1 + a_2 b_2 + a_3 b_3 \\qquad W = \\vec{F}\\cdot\\vec{d}",
        symbols: [
          { symbol: "\\(a_i, b_i\\)", meaning: "components of \\(\\vec{a}, \\vec{b}\\) along \\(\\hat{i}, \\hat{j}, \\hat{k}\\)" },
          { symbol: "\\(W\\)", meaning: "work done by a constant force \\(\\vec{F}\\) through displacement \\(\\vec{d}\\)" },
        ],
      },
      authoredExample: {
        prompt:
          "A force \\(\\vec{F} = \\hat{i} + 3\\hat{j} + 2\\hat{k}\\) displaces a particle from \\(A(\\hat{i} + 2\\hat{j} - 3\\hat{k})\\) to \\(B(3\\hat{i} - \\hat{j} + 5\\hat{k})\\). Find the work done.",
        steps: [
          "Compute the displacement: \\(\\vec{d} = \\overrightarrow{AB} = (3-1)\\hat{i} + (-1-2)\\hat{j} + (5-(-3))\\hat{k} = 2\\hat{i} - 3\\hat{j} + 8\\hat{k}\\).",
          "Apply \\(W = \\vec{F}\\cdot\\vec{d} = 1\\cdot 2 + 3\\cdot(-3) + 2\\cdot 8 = 2 - 9 + 16\\).",
          "Sum: \\(W = 9\\).",
        ],
        answer: "\\(W = 9\\) units of work",
      },
      pyqExampleId: "3e90da64-69f7-4372-8c82-3889be25fffe",
      traps: [
        {
          title: "Dot product gives a scalar; cross product gives a vector",
          body:
            "An MCQ option that returns a vector for \\(\\vec{a}\\cdot\\vec{b}\\), or a scalar for \\(\\vec{a}\\times\\vec{b}\\), can be eliminated on type grounds alone. " +
            "This dimension-check rejects ~25% of trap options.",
        },
        {
          title: "Work done is signed — negative work is fine",
          body:
            "If the force has any component opposite to the displacement, the dot product (and the work) can come out negative. " +
            "Don't reach for absolute value automatically; the sign tells you whether the force is helping or hindering.",
        },
      ],
    },

    // 2 ───────────────────────────────────────────────────────────────────────
    {
      slug: "perpendicularity-test",
      name: "Perpendicularity Test",
      intuition:
        "Two non-zero vectors are perpendicular precisely when their dot product is zero. " +
        "This single test has three equivalent disguises that PYQs love to switch between: \\(\\vec{a}\\cdot\\vec{b}=0\\) directly; \\(|\\vec{a}+\\vec{b}| = |\\vec{a}-\\vec{b}|\\) (the diagonals of a parallelogram are equal iff it's a rectangle); and \\((\\vec{a}+\\vec{b})\\cdot(\\vec{a}+\\vec{b}) = |\\vec{a}|^2 + |\\vec{b}|^2\\) (the Pythagoras identity).",
      definition:
        "For non-zero \\(\\vec{a}, \\vec{b}\\), all three of the following are equivalent: " +
        "\\(\\vec{a}\\cdot\\vec{b} = 0\\); " +
        "\\(|\\vec{a}+\\vec{b}| = |\\vec{a}-\\vec{b}|\\); " +
        "\\((\\vec{a}+\\vec{b})\\cdot(\\vec{a}+\\vec{b}) = |\\vec{a}|^2 + |\\vec{b}|^2\\). " +
        "Each says \\(\\vec{a} \\perp \\vec{b}\\).",
      formula: {
        label: "Equivalent perpendicularity statements",
        latex:
          "\\vec{a}\\perp\\vec{b} \\;\\Longleftrightarrow\\; \\vec{a}\\cdot\\vec{b} = 0 \\;\\Longleftrightarrow\\; |\\vec{a}+\\vec{b}| = |\\vec{a}-\\vec{b}|",
        symbols: [
          { symbol: "\\(\\vec{a}\\cdot\\vec{b}\\)", meaning: "scalar dot product" },
          { symbol: "\\(|\\vec{a}\\pm\\vec{b}|\\)", meaning: "magnitudes of the diagonals of the parallelogram on \\(\\vec{a}, \\vec{b}\\)" },
        ],
      },
      authoredExample: {
        prompt:
          "Find the value of \\(\\lambda\\) so that \\(\\vec{a} = 3\\hat{i} + 4\\hat{j} - \\hat{k}\\) and \\(\\vec{b} = -2\\hat{i} + \\lambda\\hat{j} + 10\\hat{k}\\) are perpendicular.",
        steps: [
          "Apply the perpendicularity test \\(\\vec{a}\\cdot\\vec{b} = 0\\).",
          "Compute the dot: \\(3\\cdot(-2) + 4\\cdot\\lambda + (-1)\\cdot 10 = -6 + 4\\lambda - 10 = 4\\lambda - 16\\).",
          "Set equal to zero: \\(4\\lambda - 16 = 0 \\;\\Rightarrow\\; \\lambda = 4\\).",
        ],
        answer: "\\(\\lambda = 4\\)",
      },
      pyqExampleId: "40bc2170-f9a9-4afc-9aed-bbf011709b7c",
      traps: [
        {
          title: "\\(|\\vec{a}+\\vec{b}| = |\\vec{a}-\\vec{b}|\\) means \\(\\vec{a}\\perp\\vec{b}\\), not \\(\\vec{a}=\\vec{b}\\)",
          body:
            "Square both sides: \\(|\\vec{a}|^2 + 2\\vec{a}\\cdot\\vec{b} + |\\vec{b}|^2 = |\\vec{a}|^2 - 2\\vec{a}\\cdot\\vec{b} + |\\vec{b}|^2\\) collapses to \\(4\\vec{a}\\cdot\\vec{b} = 0\\). " +
            "Geometrically: the two diagonals of a parallelogram have equal length iff the parallelogram is a rectangle.",
        },
        {
          title: "Zero dot product needs both vectors non-zero",
          body:
            "Technically \\(\\vec{0}\\cdot\\vec{a} = 0\\) for any \\(\\vec{a}\\), but \\(\\vec{0}\\) has no direction, so we don't call it perpendicular. " +
            "PYQs assume non-zero vectors implicitly; double-check the hypothesis if a question opens with \\\"if non-zero...\\\".",
        },
      ],
    },

    // 3 ───────────────────────────────────────────────────────────────────────
    {
      slug: "angle-via-dot-product-formula",
      name: "Angle between two vectors via the dot-product formula",
      intuition:
        "The dot product is the magnitude of one vector times the magnitude of the other times the cosine of the angle between them. " +
        "Rearrange and the angle drops out: divide the dot product by the product of magnitudes. " +
        "Sign of the result tells you acute (\\(>0\\)) versus obtuse (\\(<0\\)); \\(=0\\) is perpendicular, the special case above.",
      definition:
        "For non-zero \\(\\vec{a}, \\vec{b}\\) at angle \\(\\theta\\) (\\(0 \\leq \\theta \\leq \\pi\\)): " +
        "\\(\\vec{a}\\cdot\\vec{b} = |\\vec{a}|\\,|\\vec{b}|\\cos\\theta\\), hence " +
        "\\(\\cos\\theta = \\dfrac{\\vec{a}\\cdot\\vec{b}}{|\\vec{a}|\\,|\\vec{b}|}\\). " +
        "Useful corollary: \\(\\sin^2(\\theta/2) = \\dfrac{1-\\cos\\theta}{2} = \\dfrac{|\\vec{a}-\\vec{b}|^2}{4|\\vec{a}||\\vec{b}|}\\) when \\(\\vec{a}, \\vec{b}\\) are unit vectors.",
      formula: {
        label: "Angle from dot product",
        latex:
          "\\cos\\theta = \\dfrac{\\vec{a}\\cdot\\vec{b}}{|\\vec{a}|\\,|\\vec{b}|}",
        symbols: [
          { symbol: "\\(\\theta\\)", meaning: "angle between \\(\\vec{a}\\) and \\(\\vec{b}\\), measured in \\([0, \\pi]\\)" },
          { symbol: "\\(\\vec{a}\\cdot\\vec{b}\\)", meaning: "dot product (scalar)" },
          { symbol: "\\(|\\vec{a}|, |\\vec{b}|\\)", meaning: "magnitudes (always positive)" },
        ],
      },
      authoredExample: {
        prompt:
          "Find the angle between \\(\\vec{a} = (0, 1, 1)\\) and \\(\\vec{b} = (1, 0, 1)\\).",
        steps: [
          "Dot product: \\(\\vec{a}\\cdot\\vec{b} = 0\\cdot 1 + 1\\cdot 0 + 1\\cdot 1 = 1\\).",
          "Magnitudes: \\(|\\vec{a}| = \\sqrt{0+1+1} = \\sqrt{2}\\); \\(|\\vec{b}| = \\sqrt{1+0+1} = \\sqrt{2}\\).",
          "Apply the formula: \\(\\cos\\theta = \\dfrac{1}{\\sqrt{2}\\cdot\\sqrt{2}} = \\dfrac{1}{2}\\).",
          "Hence \\(\\theta = \\dfrac{\\pi}{3} = 60°\\).",
        ],
        answer: "\\(\\theta = \\dfrac{\\pi}{3}\\) (i.e. \\(60°\\))",
      },
      pyqExampleId: "3da05cd8-adbc-4ef7-bbd1-b60d37b4834c",
      traps: [
        {
          title: "Obtuse angle iff \\(\\vec{a}\\cdot\\vec{b} < 0\\)",
          body:
            "Quadratic-in-\\(x\\) PYQs frequently ask for values of a parameter that make the angle obtuse. " +
            "Set up the inequality \\(\\vec{a}\\cdot\\vec{b} < 0\\), solve as a quadratic, then exclude the boundary case \\(\\vec{a}\\cdot\\vec{b} = 0\\) (which is perpendicular, not obtuse) AND values that make the vectors antiparallel (then \\(\\theta = \\pi\\), the obtuse extreme).",
        },
        {
          title: "Direction matters when comparing two angles",
          body:
            "The angle between \\(\\vec{a}\\) and \\(-\\vec{a}\\) is \\(\\pi\\), not 0. " +
            "If a problem asks for the angle between \\(\\vec{a}\\) and \\(\\vec{a} - \\vec{b}\\), don't carelessly subtract magnitudes — use the formula end-to-end.",
        },
      ],
    },

    // 4 ───────────────────────────────────────────────────────────────────────
    {
      slug: "solve-perpendicularity-constraint-system",
      name: "Solving for an angle from a perpendicularity / magnitude constraint",
      intuition:
        "Many MODERATE PYQs hand you a constraint like \\((\\vec{a}+2\\vec{b}) \\perp (5\\vec{a}-4\\vec{b})\\) or \\(|\\vec{a}+\\vec{b}|=|\\vec{a}-\\vec{b}|=k\\) and ask for the angle between \\(\\vec{a}\\) and \\(\\vec{b}\\). " +
        "The workflow is always the same: expand the constraint as a dot product, collect terms in \\(|\\vec{a}|^2, |\\vec{b}|^2\\) and \\(\\vec{a}\\cdot\\vec{b}\\), substitute the given magnitudes (often both 1 for unit vectors), and solve a single linear equation for \\(\\cos\\theta\\).",
      definition:
        "Given a perpendicularity constraint \\((\\alpha\\vec{a}+\\beta\\vec{b})\\cdot(\\gamma\\vec{a}+\\delta\\vec{b}) = 0\\), expand using distributivity: " +
        "\\(\\alpha\\gamma|\\vec{a}|^2 + (\\alpha\\delta + \\beta\\gamma)\\,\\vec{a}\\cdot\\vec{b} + \\beta\\delta|\\vec{b}|^2 = 0\\). " +
        "Substitute known magnitudes and isolate \\(\\vec{a}\\cdot\\vec{b}\\), then plug into the angle formula.",
      formula: {
        label: "Expansion template",
        latex:
          "(\\alpha\\vec{a}+\\beta\\vec{b})\\cdot(\\gamma\\vec{a}+\\delta\\vec{b}) = \\alpha\\gamma|\\vec{a}|^2 + (\\alpha\\delta+\\beta\\gamma)\\,\\vec{a}\\cdot\\vec{b} + \\beta\\delta|\\vec{b}|^2",
        symbols: [
          { symbol: "\\(\\alpha, \\beta, \\gamma, \\delta\\)", meaning: "given scalar coefficients" },
          { symbol: "\\(|\\vec{a}|, |\\vec{b}|\\)", meaning: "given (often \\(=1\\) for unit vectors)" },
          { symbol: "\\(\\vec{a}\\cdot\\vec{b}\\)", meaning: "unknown — solve for it, then read off \\(\\theta\\)" },
        ],
      },
      authoredExample: {
        prompt:
          "Let \\(\\vec{a}, \\vec{b}\\) be unit vectors such that \\((\\vec{a}+2\\vec{b}) \\perp (5\\vec{a}-4\\vec{b})\\). Find the angle between \\(\\vec{a}\\) and \\(\\vec{b}\\).",
        steps: [
          "Set \\((\\vec{a}+2\\vec{b})\\cdot(5\\vec{a}-4\\vec{b}) = 0\\).",
          "Expand: \\(5|\\vec{a}|^2 + (-4 + 10)\\,\\vec{a}\\cdot\\vec{b} - 8|\\vec{b}|^2 = 5 + 6\\vec{a}\\cdot\\vec{b} - 8\\) (using \\(|\\vec{a}|=|\\vec{b}|=1\\)).",
          "Set equal to zero: \\(-3 + 6\\vec{a}\\cdot\\vec{b} = 0 \\;\\Rightarrow\\; \\vec{a}\\cdot\\vec{b} = \\dfrac{1}{2}\\).",
          "Since \\(|\\vec{a}|=|\\vec{b}|=1\\): \\(\\cos\\theta = \\dfrac{1}{2}\\), so \\(\\theta = \\dfrac{\\pi}{3}\\).",
        ],
        answer: "\\(\\theta = \\dfrac{\\pi}{3}\\) (i.e. \\(60°\\))",
      },
      pyqExampleId: "d9b215a5-3a68-459f-acb4-f0c8f2c5aa49",
      traps: [
        {
          title: "Don't forget the cross terms when expanding",
          body:
            "\\((\\vec{a}+2\\vec{b})\\cdot(5\\vec{a}-4\\vec{b})\\) has four products, not two — there are two \\(\\vec{a}\\cdot\\vec{b}\\) terms that combine into the coefficient \\(\\alpha\\delta + \\beta\\gamma\\). " +
            "A factor-of-2 distractor often results from dropping one of them.",
        },
        {
          title: "Unit vectors mean \\(|\\vec{a}|^2 = 1\\), not \\(\\vec{a} = 1\\)",
          body:
            "When the magnitudes are stated as 1, the \\(|\\vec{a}|^2\\) and \\(|\\vec{b}|^2\\) terms simplify to 1, NOT zero. " +
            "Some students drop them by analogy with \\(\\vec{a}\\cdot\\vec{a}\\) when \\(\\vec{a}\\) is the zero vector — wrong.",
        },
      ],
    },

    // 5 ───────────────────────────────────────────────────────────────────────
    {
      slug: "unit-vector-orthogonal-triple-configurations",
      name: "Unit vectors, orthogonal triples, and decomposition",
      intuition:
        "Three mutually-perpendicular unit vectors form an orthonormal basis — pairwise dot products are zero, self dot products are one. " +
        "Whenever a problem says \\(\\vec{a}, \\vec{b}, \\vec{c}\\) are unit and mutually perpendicular, you can compute any linear combination's magnitude or dot in two lines. " +
        "Decomposing a vector along three given directions reduces to a small linear system once you take dot products with each direction.",
      definition:
        "Vectors \\(\\vec{a}, \\vec{b}, \\vec{c}\\) form an orthonormal triple if " +
        "\\(\\vec{a}\\cdot\\vec{a} = \\vec{b}\\cdot\\vec{b} = \\vec{c}\\cdot\\vec{c} = 1\\) and " +
        "\\(\\vec{a}\\cdot\\vec{b} = \\vec{b}\\cdot\\vec{c} = \\vec{c}\\cdot\\vec{a} = 0\\). " +
        "If \\(\\vec{c} = p\\vec{a} + q\\vec{b} + r(\\vec{a}\\times\\vec{b})\\) with \\(\\{\\vec{a},\\vec{b},\\vec{a}\\times\\vec{b}\\}\\) orthonormal, the coefficients drop out as " +
        "\\(p = \\vec{c}\\cdot\\vec{a}\\), \\(q = \\vec{c}\\cdot\\vec{b}\\), \\(r^2 = |\\vec{c}|^2 - p^2 - q^2\\).",
      formula: {
        label: "Orthonormal-triple identities",
        latex:
          "\\vec{a}\\cdot\\vec{a} = 1, \\quad \\vec{a}\\cdot\\vec{b} = 0 \\;\\;(\\text{if } \\vec{a}\\neq\\vec{b}) \\quad \\text{for an orthonormal triple}",
        symbols: [
          { symbol: "\\(\\vec{a}, \\vec{b}, \\vec{c}\\)", meaning: "three mutually-perpendicular unit vectors" },
          { symbol: "\\(p, q, r\\)", meaning: "decomposition coefficients along \\(\\vec{a}, \\vec{b}, \\vec{a}\\times\\vec{b}\\)" },
        ],
      },
      authoredExample: {
        prompt:
          "Let \\(\\vec{a}, \\vec{b}, \\vec{c}\\) be three mutually perpendicular unit vectors and let \\(\\vec{A} = \\vec{a} + \\vec{b} + \\vec{c}\\). Find \\(|\\vec{A}|\\).",
        steps: [
          "Use the dot-product expansion: \\(|\\vec{A}|^2 = \\vec{A}\\cdot\\vec{A} = (\\vec{a}+\\vec{b}+\\vec{c})\\cdot(\\vec{a}+\\vec{b}+\\vec{c})\\).",
          "Distribute. Self-dots: \\(|\\vec{a}|^2 + |\\vec{b}|^2 + |\\vec{c}|^2 = 1+1+1 = 3\\). Cross-dots: all six pairwise products are zero by mutual perpendicularity.",
          "So \\(|\\vec{A}|^2 = 3\\), giving \\(|\\vec{A}| = \\sqrt{3}\\).",
        ],
        answer: "\\(|\\vec{A}| = \\sqrt{3}\\)",
      },
      pyqExampleId: "9ade7e8b-141c-4e35-96d0-80cc338b424c",
      traps: [
        {
          title: "Three unit vectors at equal pairwise angles need not be orthonormal",
          body:
            "If \\(\\vec{a}\\cdot\\vec{b} = \\vec{b}\\cdot\\vec{c} = \\vec{c}\\cdot\\vec{a} = k\\), the triple is symmetric but only orthonormal when \\(k = 0\\). " +
            "For other \\(k\\) values (e.g. \\(k = -1/2\\) — three coplanar vectors at \\(120°\\)) the magnitudes of linear combinations look quite different.",
        },
        {
          title: "\\(\\{\\vec{a}, \\vec{b}, \\vec{a}\\times\\vec{b}\\}\\) is orthonormal iff \\(\\vec{a}\\perp\\vec{b}\\) and both unit",
          body:
            "If \\(\\vec{a}, \\vec{b}\\) are unit and perpendicular, then \\(|\\vec{a}\\times\\vec{b}| = \\sin 90° = 1\\) — so the triple is orthonormal. " +
            "If \\(\\vec{a}\\cdot\\vec{b} \\neq 0\\), the cross product still produces a perpendicular vector, but it's not a unit vector and the basis isn't orthonormal.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Cross product and triple product",
      href: "/notes/nda-maths/vectors/cross-product-triple-product",
    },
    {
      label: "Magnitude, components, projection, direction cosines",
      href: "/notes/nda-maths/vectors/magnitude-components-projection",
    },
  ],
};
