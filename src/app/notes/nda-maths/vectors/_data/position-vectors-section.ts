import type { SubtopicNote } from "@/app/notes/_types";

export const POSITION_VECTORS_SECTION_NOTE: SubtopicNote = {
  subtopicName: "Position Vectors and Section",
  title: "Position Vectors and Section",
  oneLineDefinition:
    "Locating points by vectors from an origin, testing whether three points lie on one line, and dividing a segment in a given ratio.",
  whyItMatters:
    "6 PYQs across 2018–2025, with three of them HARD — small in count but disproportionately " +
    "tricky. Almost every question reduces to one of two lever ideas: a collinearity test " +
    "(coefficient-sum-to-one or scalar-multiple of difference vectors), and the internal/external " +
    "section formula with its sign-flip distractor. The two concepts below cover the entire subtopic.",
  concepts: [
    // 1 ───────────────────────────────────────────────────────────────────────
    {
      slug: "collinearity-and-vector-relations-in-figures",
      name: "Collinearity of three points (and vector relations in regular figures)",
      intuition:
        "Three points are collinear when the line through two of them passes through the third. " +
        "In vector language that means one displacement vector is a scalar multiple of another, " +
        "or equivalently any third point on the line is a weighted average of the first two where " +
        "the weights add to one. The same coefficient-sum-to-one identity hides in many disguises — " +
        "including the famous \\((\\vec{a}\\times\\vec{b})+(\\vec{b}\\times\\vec{c})+(\\vec{c}\\times\\vec{a})=\\vec{0}\\) " +
        "test. Regular polygons obey similar fixed identities — every diagonal and side can be " +
        "expressed as a known scalar multiple of any other.",
      definition:
        "Points \\(A, B, C\\) with position vectors \\(\\vec{a}, \\vec{b}, \\vec{c}\\) are collinear " +
        "if and only if there exist scalars \\(\\alpha, \\beta, \\gamma\\) (not all zero) with " +
        "\\(\\alpha + \\beta + \\gamma = 0\\) and \\(\\alpha\\vec{a} + \\beta\\vec{b} + \\gamma\\vec{c} = \\vec{0}\\). " +
        "Equivalently \\(\\vec{c} = \\lambda\\vec{a} + \\mu\\vec{b}\\) with \\(\\lambda + \\mu = 1\\).",
      formula: {
        label: "Collinearity test",
        latex:
          "\\alpha\\vec{a} + \\beta\\vec{b} + \\gamma\\vec{c} = \\vec{0} \\;\\text{ with }\\; \\alpha + \\beta + \\gamma = 0",
        symbols: [
          { symbol: "\\(\\vec{a},\\vec{b},\\vec{c}\\)", meaning: "position vectors of the three points" },
          { symbol: "\\(\\alpha,\\beta,\\gamma\\)", meaning: "scalars; both the linear-combo and the sum vanish" },
        ],
      },
      authoredExample: {
        prompt:
          "Three points have position vectors \\(\\vec{a}, \\vec{b}, \\vec{c}\\) with " +
          "\\(2\\vec{a} - 3\\vec{b} + \\vec{c} = \\vec{0}\\). Show they are collinear and find the ratio in which \\(B\\) divides \\(AC\\).",
        steps: [
          "The coefficients are \\(2, -3, 1\\). Check their sum: \\(2 + (-3) + 1 = 0\\). Since both the linear combination and the coefficient sum vanish, the three points are collinear.",
          "Rewrite to isolate \\(\\vec{b}\\): \\(3\\vec{b} = 2\\vec{a} + \\vec{c}\\), so \\(\\vec{b} = \\dfrac{2\\vec{a} + \\vec{c}}{3}\\).",
          "Compare with the internal section formula \\(\\vec{b} = \\dfrac{m\\vec{c} + n\\vec{a}}{m + n}\\). Matching gives \\(m = 1\\), \\(n = 2\\), so \\(B\\) divides \\(AC\\) internally in the ratio \\(AB : BC = m : n = 1 : 2\\).",
        ],
        answer: "Collinear; \\(B\\) divides \\(AC\\) internally in the ratio \\(1 : 2\\).",
      },
      pyqExampleId: "bf814f0f-d9fe-405d-92de-cc89ec533d10",
      traps: [
        {
          title: "Coefficient sum must be zero — don't skip the check",
          body:
            "If the scalars in \\(\\alpha\\vec{a}+\\beta\\vec{b}+\\gamma\\vec{c}=\\vec{0}\\) do NOT sum to zero, " +
            "the three points are coplanar with the origin (i.e. \\(\\vec{a},\\vec{b},\\vec{c}\\) are linearly dependent) " +
            "but generally NOT collinear. The sum-to-zero condition is what forces them onto one line.",
        },
        {
          title: "\\((\\vec{a}\\times\\vec{b})+(\\vec{b}\\times\\vec{c})+(\\vec{c}\\times\\vec{a})=\\vec{0}\\) means collinear, not coplanar",
          body:
            "A common HARD-paper trap: this cross-product identity vanishes precisely when the three points are collinear. " +
            "If a question gives \\(\\vec{c} = \\cos^2\\theta\\,\\vec{a} + \\sin^2\\theta\\,\\vec{b}\\) the coefficients sum to " +
            "\\(\\cos^2\\theta + \\sin^2\\theta = 1\\), so \\(C\\) lies on line \\(AB\\) and the cross-product sum is forced to zero.",
        },
      ],
    },

    // 2 ───────────────────────────────────────────────────────────────────────
    {
      slug: "section-formula-internal-external",
      name: "Section Formula — Internal and External Division",
      intuition:
        "A point that divides a segment \\(AB\\) in a ratio \\(m : n\\) is a weighted average of the endpoints. " +
        "When the dividing point lies between \\(A\\) and \\(B\\), the division is internal and the weights add normally. " +
        "When it lies on the extension outside, the division is external and one weight gets a negative sign — that single sign-flip is the most-tested trap in this subtopic.",
      definition:
        "If \\(P\\) divides \\(AB\\) internally in ratio \\(m : n\\), then " +
        "\\(\\vec{p} = \\dfrac{m\\vec{b} + n\\vec{a}}{m + n}\\). If \\(P\\) divides externally in ratio \\(m : n\\), then " +
        "\\(\\vec{p} = \\dfrac{m\\vec{b} - n\\vec{a}}{m - n}\\). Midpoint is the special case \\(m = n\\): " +
        "\\(\\vec{p} = (\\vec{a} + \\vec{b})/2\\).",
      formula: {
        label: "Section formula (internal / external)",
        latex:
          "\\vec{p}_{\\text{int}} = \\dfrac{m\\vec{b} + n\\vec{a}}{m + n} \\qquad \\vec{p}_{\\text{ext}} = \\dfrac{m\\vec{b} - n\\vec{a}}{m - n}",
        symbols: [
          { symbol: "\\(\\vec{a}, \\vec{b}\\)", meaning: "position vectors of the endpoints \\(A, B\\)" },
          { symbol: "\\(m : n\\)", meaning: "ratio in which \\(P\\) divides \\(AB\\)" },
          { symbol: "\\(\\vec{p}\\)", meaning: "position vector of the dividing point" },
        ],
      },
      authoredExample: {
        prompt:
          "Points \\(A\\) and \\(B\\) have position vectors \\(\\vec{a} = 2\\hat{i} + \\hat{j}\\) and \\(\\vec{b} = 4\\hat{i} + 5\\hat{j}\\). " +
          "Find the position vector of the point \\(P\\) that divides \\(AB\\) externally in the ratio \\(3 : 1\\).",
        steps: [
          "Identify the ratio: \\(m = 3\\) (towards \\(B\\)), \\(n = 1\\) (towards \\(A\\)). External division so use the minus-sign formula.",
          "Apply \\(\\vec{p} = \\dfrac{m\\vec{b} - n\\vec{a}}{m - n} = \\dfrac{3(4\\hat{i}+5\\hat{j}) - 1(2\\hat{i}+\\hat{j})}{3 - 1}\\).",
          "Numerator: \\(12\\hat{i} + 15\\hat{j} - 2\\hat{i} - \\hat{j} = 10\\hat{i} + 14\\hat{j}\\). Denominator: \\(2\\).",
          "Divide: \\(\\vec{p} = 5\\hat{i} + 7\\hat{j}\\).",
        ],
        answer: "\\(\\vec{p} = 5\\hat{i} + 7\\hat{j}\\)",
      },
      pyqExampleId: "5cc5d47f-69ab-4105-ad1b-a547313abb07",
      traps: [
        {
          title: "External division: denominator is \\(m - n\\), not \\(m + n\\)",
          body:
            "The most common bug. The external-section formula reverses one sign in the numerator AND swaps the denominator's plus for a minus. " +
            "If \\(m = n\\), external division is undefined (the point is at infinity) — another way to spot you've mis-set up an internal problem as external.",
        },
        {
          title: "Watch the ratio order — \\(m : n\\) means \\(AP : PB\\), not \\(AP : AB\\)",
          body:
            "PYQs often phrase it as \\\"divides \\(AB\\) in ratio \\(2 : 3\\)\\\" — that is \\(AP : PB = 2 : 3\\), so \\(m = 2\\) (the part nearer \\(B\\)) and \\(n = 3\\) (the part nearer \\(A\\)). Reversing them gives the wrong answer.",
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
      label: "Vector geometry — triangles, parallelograms, quadrilaterals",
      href: "/notes/nda-maths/vectors/vector-geometry",
    },
  ],
};
