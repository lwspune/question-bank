import type { SubtopicNote } from "@/app/notes/_types";

export const FACTORISATION_NOTE: SubtopicNote = {
  subtopicName: "Sum-to-Product and Product Formulas",
  title: "Sum-to-Product and Product Formulas",
  oneLineDefinition:
    "Turning a sum of two sines or cosines into a product, and a product into a sum — the moves behind ratio conditions, expressions that collapse to 1, and identities under α + β + γ = π.",
  whyItMatters:
    "12 PYQs, seven HARD. Seven turn a sum into a product: a ratio condition through componendo and dividendo, sin(A + B) from sin A + sin B and cos A + cos B, an expression in 20° that collapses to 1 or 4. " +
    "Five go the other way: cos²48° − sin²12° (set twice in 2024), cos(log x), and a triangle identity. Two cards.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cett2-sum-to-product",
      name: "Sums to Products, and Ratio Conditions",
      intuition:
        "A sum of two sines is twice the sine of the average angle times the cosine of the half-difference. That is why a ratio condition like 3 sin α = 5 sin β becomes a statement about half-sums and half-differences: add and subtract the two sides (componendo and dividendo) and each side factorises.",
      definition:
        "- \\(\\sin C + \\sin D = 2\\sin\\frac{C + D}{2}\\cos\\frac{C - D}{2}\\), \\(\\sin C - \\sin D = 2\\cos\\frac{C + D}{2}\\sin\\frac{C - D}{2}\\).\n" +
        "- \\(\\cos C + \\cos D = 2\\cos\\frac{C + D}{2}\\cos\\frac{C - D}{2}\\), \\(\\cos C - \\cos D = -2\\sin\\frac{C + D}{2}\\sin\\frac{C - D}{2}\\).\n" +
        "- **Ratio condition**: \\(p\\sin\\alpha = q\\sin\\beta\\) gives \\(\\dfrac{\\tan\\frac{\\alpha + \\beta}{2}}{\\tan\\frac{\\alpha - \\beta}{2}} = \\dfrac{q + p}{q - p}\\).\n" +
        "- \\(\\dfrac{\\sin A + \\sin B}{\\cos A + \\cos B} = \\tan\\dfrac{A + B}{2}\\); then \\(\\sin(A + B) = \\dfrac{2t}{1 + t^2}\\) with that t.\n" +
        "- Expressions like \\(\\sqrt3\\csc 20^\\circ - \\sec 20^\\circ\\): write \\(\\sqrt3 = 2\\sin 60^\\circ\\) (or \\(2\\cos 30^\\circ\\)) so the numerator becomes a single sine.",
      formula: {
        label: "Sum to product",
        latex:
          "\\sin C+\\sin D=2\\sin\\tfrac{C+D}{2}\\cos\\tfrac{C-D}{2} \\qquad \\cos C-\\cos D=-2\\sin\\tfrac{C+D}{2}\\sin\\tfrac{C-D}{2}",
      },
      authoredExample: {
        prompt: "If \\(2\\sin\\alpha = 3\\sin\\beta\\), find \\(\\dfrac{\\tan\\frac{\\alpha + \\beta}{2}}{\\tan\\frac{\\alpha - \\beta}{2}}\\).",
        steps: [
          "\\(\\dfrac{\\sin\\alpha}{\\sin\\beta} = \\dfrac32\\); componendo and dividendo: \\(\\dfrac{\\sin\\alpha + \\sin\\beta}{\\sin\\alpha - \\sin\\beta} = \\dfrac{3 + 2}{3 - 2}\\).",
          "The left side is \\(\\dfrac{2\\sin\\frac{\\alpha + \\beta}{2}\\cos\\frac{\\alpha - \\beta}{2}}{2\\cos\\frac{\\alpha + \\beta}{2}\\sin\\frac{\\alpha - \\beta}{2}}\\), the ratio asked for.",
        ],
        answer: "5",
      },
      selfCheckExample: {
        prompt: "If \\(\\sin A + \\sin B = 1\\) and \\(\\cos A + \\cos B = 2\\), find \\(\\cos(A + B)\\).",
        steps: [
          "\\(\\tan\\frac{A + B}{2} = \\frac12\\).",
          "\\(\\cos(A + B) = \\dfrac{1 - \\frac14}{1 + \\frac14}\\).",
        ],
        answer: "\\(\\dfrac35\\)",
      },
      practiceSet: [
        { prompt: "\\(\\sin 75^\\circ - \\sin 15^\\circ\\)?", answer: "\\(\\frac{1}{\\sqrt2}\\)", method: "\\(2\\cos 45^\\circ\\sin 30^\\circ\\)." },
        { prompt: "\\(\\cos 20^\\circ - \\cos 100^\\circ\\) as a single sine?", answer: "\\(\\sqrt3\\sin 40^\\circ\\)", method: "\\(2\\sin 60^\\circ\\sin 40^\\circ\\)." },
        { prompt: "\\(\\sqrt3\\csc 20^\\circ - \\sec 20^\\circ\\)?", answer: "4" },
      ],
      pyqExampleId: "d39344f7-ecba-42cd-bddb-1980b02b153c",
      traps: [
        {
          title: "The minus sign in cos C − cos D",
          body: "cos C − cos D = −2 sin((C + D)/2) sin((C − D)/2). Without the minus, cos 20° − cos 110° comes out negative when it is positive.",
        },
        {
          title: "Inverting the ratio in componendo and dividendo",
          body: "3 sin α = 5 sin β means sin α/sin β = 5/3, so the ratio is (5 + 3)/(5 − 3) = 4, not (3 + 5)/(3 − 5) = −4. Check which sine is larger first.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cett2-product-formulas",
      name: "Products to Sums, and the Two Square-Difference Identities",
      intuition:
        "The product formulas are the sum-to-product ones read backwards: 2 cos A cos B is cos(A − B) + cos(A + B). Two special cases come up most often — a difference of squares of a cosine and a sine, or of two sines. Each is a product of a sum-angle and a difference-angle ratio.",
      definition:
        "- \\(2\\sin A\\cos B = \\sin(A + B) + \\sin(A - B)\\), \\(2\\cos A\\cos B = \\cos(A - B) + \\cos(A + B)\\), \\(2\\sin A\\sin B = \\cos(A - B) - \\cos(A + B)\\).\n" +
        "- \\(\\cos^2 A - \\sin^2 B = \\cos(A + B)\\cos(A - B)\\).\n" +
        "- \\(\\sin^2 A - \\sin^2 B = \\sin(A + B)\\sin(A - B) = \\cos^2 B - \\cos^2 A\\).\n" +
        "- \\(\\cos^2 48^\\circ - \\sin^2 12^\\circ = \\cos 60^\\circ\\cos 36^\\circ = \\dfrac{\\sqrt5 + 1}{8}\\).\n" +
        "- If \\(\\alpha + \\beta + \\gamma = \\pi\\): \\(\\sin^2\\alpha - \\sin^2\\gamma = \\sin(\\alpha + \\gamma)\\sin(\\alpha - \\gamma) = \\sin\\beta\\sin(\\alpha - \\gamma)\\).",
      formula: {
        label: "Product to sum",
        latex:
          "2\\cos A\\cos B=\\cos(A-B)+\\cos(A+B) \\qquad \\cos^2 A-\\sin^2 B=\\cos(A+B)\\cos(A-B)",
      },
      authoredExample: {
        prompt: "Find \\(\\sin^2 75^\\circ - \\sin^2 15^\\circ\\).",
        steps: [
          "\\(\\sin^2 A - \\sin^2 B = \\sin(A + B)\\sin(A - B)\\).",
          "\\(= \\sin 90^\\circ\\sin 60^\\circ\\).",
        ],
        answer: "\\(\\dfrac{\\sqrt3}{2}\\)",
      },
      selfCheckExample: {
        prompt: "Find \\(\\cos^2 52.5^\\circ - \\sin^2 22.5^\\circ\\).",
        steps: [
          "\\(\\cos(52.5^\\circ + 22.5^\\circ)\\cos(52.5^\\circ - 22.5^\\circ) = \\cos 75^\\circ\\cos 30^\\circ\\).",
          "\\(\\cos 75^\\circ = \\frac{\\sqrt6 - \\sqrt2}{4}\\), times \\(\\frac{\\sqrt3}{2}\\).",
        ],
        answer: "\\(\\dfrac{3\\sqrt2 - \\sqrt6}{8}\\)",
      },
      practiceSet: [
        { prompt: "\\(2\\cos 75^\\circ\\cos 15^\\circ\\)?", answer: "\\(\\frac12\\)", method: "\\(\\cos 60^\\circ + \\cos 90^\\circ\\)." },
        { prompt: "\\(\\cos^2 18^\\circ - \\cos^2 72^\\circ\\) as one ratio?", answer: "\\(\\sin 54^\\circ\\)" },
      ],
      pyqExampleId: "c0826fc9-ad62-4b4a-b2a4-df82896bc2b6",
      traps: [
        {
          title: "Using the sine pair for a cosine-minus-sine",
          body: "cos²A − sin²B = cos(A + B) cos(A − B), but sin²A − sin²B = sin(A + B) sin(A − B). Mixing them gives cos 60° sin 36° instead of cos 60° cos 36°, and that value is printed too.",
        },
        {
          title: "Using 18° where the value needs 36°",
          body: "The question gives sin 18° = (√5 − 1)/4, but the answer needs cos 36° = 1 − 2sin²18° = (√5 + 1)/4. Quoting the given value unchanged gives (√5 − 1)/8, an option.",
        },
      ],
    },
  ],
  related: [
    { label: "Multiple and Sub-multiple Angles", href: "/notes/mht-cet-maths/trigonometry-ii/cett2-multiple" },
    { label: "Trigonometric Functions — equations solved by factorising", href: "/notes/mht-cet-maths/trigonometric-functions/cettf-equations" },
  ],
};
