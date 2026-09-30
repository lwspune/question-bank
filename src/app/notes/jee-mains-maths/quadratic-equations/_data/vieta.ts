import type { SubtopicNote } from "@/app/notes/_types";

export const VIETA_QE_NOTE: SubtopicNote = {
  subtopicName: "Roots and Coefficients",
  title: "Roots and Coefficients",
  oneLineDefinition:
    "Reading the sum and product of the roots straight from the coefficients, and turning any condition on the roots into equations in those two numbers.",
  whyItMatters:
    "Sixteen PYQs, fourteen of them multiple choice, and eight from 2026. Twelve turn a condition on two roots into equations in their sum and product — a fixed difference, one root twice the other, roots in G.P., or a root known in advance; four go past degree two, to Vieta for a cubic, a quadratic divisor, or a cubic fixed by four values. Two ideas cover the page.",
  concepts: [
    // C1 — sum, product, difference
    {
      kind: "formula" as const,
      slug: "jqe-sum-product",
      name: "Sum, product and difference of roots",
      intuition:
        "The roots themselves are rarely needed. Their sum \\(-\\frac ba\\) and product \\(\\frac ca\\) come straight from the coefficients, and any condition that treats the two roots alike — their difference, their ratio, their reciprocals — can be written in those two numbers. The difference comes through its square: \\((\\beta-\\alpha)^2=(\\alpha+\\beta)^2-4\\alpha\\beta\\), which is the discriminant over \\(a^2\\). If one root is known, the other is the product divided by it.",
      definition:
        "- \\(\\alpha+\\beta=-\\frac{b}{a}\\), \\(\\alpha\\beta=\\frac{c}{a}\\).\n" +
        "- \\((\\beta-\\alpha)^2=(\\alpha+\\beta)^2-4\\alpha\\beta=\\frac{D}{a^2}\\).\n" +
        "- \\(a+b+c=0\\): one root is \\(1\\), the other \\(\\frac{c}{a}\\).\n" +
        "- Roots \\(t\\) and \\(kt\\): eliminate \\(t\\) between the sum and the product.",
      formula: {
        label: "Sum, product, difference",
        latex: "\\alpha+\\beta=-\\frac{b}{a},\\quad \\alpha\\beta=\\frac{c}{a},\\quad (\\beta-\\alpha)^2=\\frac{b^2-4ac}{a^2}",
      },
      authoredExample: {
        prompt: "One root of \\(2x^2-9x+k=0\\) is twice the other. Find \\(k\\).",
        steps: [
          "Let the roots be \\(t\\) and \\(2t\\). Sum: \\(3t=\\frac92\\), so \\(t=\\frac32\\).",
          "Product: \\(2t^2=\\frac92\\), and this equals \\(\\frac k2\\).",
        ],
        answer: "\\(k=9\\); the roots are \\(\\frac32\\) and \\(3\\).",
      },
      selfCheckExample: {
        prompt: "The roots of \\(x^2-6x+k=0\\) differ by \\(4\\). Find \\(k\\).",
        steps: [
          "\\((\\beta-\\alpha)^2=36-4k=16\\).",
        ],
        answer: "\\(k=5\\) (roots \\(1\\) and \\(5\\)).",
      },
      practiceSet: [
        { prompt: "Sum and product of the roots of \\(3x^2-7x+2=0\\)?", answer: "\\(\\frac73\\) and \\(\\frac23\\)" },
        { prompt: "Roots of \\(x^2-5x+3=0\\): \\(\\frac1\\alpha+\\frac1\\beta\\)?", answer: "\\(\\frac53\\)" },
        { prompt: "The coefficients of \\(2x^2-5x+3=0\\) add to \\(0\\). The roots?", answer: "\\(1\\) and \\(\\frac32\\)" },
        { prompt: "\\(|\\alpha-\\beta|\\) for \\(x^2-4x+1=0\\)?", answer: "\\(2\\sqrt3\\)" },
      ],
      pyqExampleId: "6ffc0873-6f63-4388-abf5-61663b2ae5cd", // 2026 — bounds on |β − α| give the integer values of λ
      traps: [
        {
          title: "The difference needs its square",
          body: "\\(\\beta-\\alpha\\) changes sign when the roots swap, so it cannot be written in the sum and product directly. Work with \\((\\beta-\\alpha)^2\\), and take the square root only at the end.",
        },
      ],
    },

    // C2 — cubics and divisors
    {
      kind: "formula" as const,
      slug: "jqe-cubic",
      name: "Beyond degree two: cubics and polynomial divisors",
      intuition:
        "The same idea runs for a cubic \\(ax^3+bx^2+cx+d\\): the coefficients give the sum of the roots, the sum of their products in pairs, and their product. A missing \\(x^2\\) term means the roots add to \\(0\\). For divisibility by a quadratic, the roots of the divisor must also be roots of the cubic — substitute them, or divide and set every coefficient of the remainder to \\(0\\).",
      definition:
        "- Cubic: \\(\\alpha+\\beta+\\gamma=-\\frac{b}{a}\\), \\(\\alpha\\beta+\\beta\\gamma+\\gamma\\alpha=\\frac{c}{a}\\), \\(\\alpha\\beta\\gamma=-\\frac{d}{a}\\).\n" +
        "- \\(p(x)\\) divisible by \\(q(x)\\): the remainder is \\(0\\) for every \\(x\\), so each of its coefficients is \\(0\\).\n" +
        "- A polynomial fixed by its values at several points: build a helper that is \\(0\\) at those points, and factor it.",
      formula: {
        label: "Vieta for a cubic",
        latex: "\\alpha+\\beta+\\gamma=-\\frac{b}{a},\\quad \\sum\\alpha\\beta=\\frac{c}{a},\\quad \\alpha\\beta\\gamma=-\\frac{d}{a}",
      },
      authoredExample: {
        prompt: "For which \\(p,q\\) is \\(x^3+px^2+qx+6\\) divisible by \\(x^2-1\\)?",
        steps: [
          "The roots of \\(x^2-1\\) are \\(\\pm1\\), so both make the cubic \\(0\\).",
          "\\(x=1\\): \\(p+q=-7\\). \\(x=-1\\): \\(p-q=-5\\).",
        ],
        answer: "\\(p=-6\\), \\(q=-1\\); the cubic is \\((x-6)(x^2-1)\\).",
      },
      selfCheckExample: {
        prompt: "The roots of \\(x^3-4x^2+x+6=0\\) are \\(\\alpha,\\beta,\\gamma\\). Find \\(\\alpha^2+\\beta^2+\\gamma^2\\).",
        steps: [
          "\\(\\sum\\alpha=4\\) and \\(\\sum\\alpha\\beta=1\\).",
          "\\(\\sum\\alpha^2=4^2-2\\cdot1\\).",
        ],
        answer: "\\(14\\).",
      },
      practiceSet: [
        { prompt: "Sum of the roots of \\(2x^3-5x^2+x-7=0\\)?", answer: "\\(\\frac52\\)" },
        { prompt: "Product of the roots of \\(x^3+2x-5=0\\)?", answer: "\\(5\\)" },
        { prompt: "\\(x^3+bx+c=0\\): \\(\\alpha+\\beta+\\gamma\\)?", answer: "\\(0\\)" },
        { prompt: "Remainder when \\(x^3+x+1\\) is divided by \\(x^2+1\\)?", answer: "\\(1\\)" },
      ],
      pyqExampleId: "3bb486cc-61fa-47b6-ae1e-4e0d1cf009fa", // 2026 — count the cubics divisible by x^2 + 2
      traps: [
        {
          title: "The signs alternate",
          body: "For a cubic the sum of the roots is \\(-\\frac{b}{a}\\), the pair sum \\(+\\frac{c}{a}\\), and the product \\(-\\frac{d}{a}\\) — not \\(\\frac{d}{a}\\). The signs go minus, plus, minus.",
        },
      ],
    },
  ],
};
