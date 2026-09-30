import type { SubtopicNote } from "@/app/notes/_types";

export const MAGNITUDE_VEC_NOTE: SubtopicNote = {
  subtopicName: "Magnitudes and Unit-Vector Identities",
  title: "Magnitudes and Unit-Vector Identities",
  oneLineDefinition:
    "Working with vectors known only by their lengths and the angles between them: expanding the square of a sum, and handling combinations of unit vectors that include their cross product.",
  whyItMatters:
    "Twenty-four PYQs, and none gives a single component. Everything is lengths, angles and dot products, so the only tool is squaring: |v|² = v · v, expanded term by term. Two ideas cover the page.",
  concepts: [
    // C1 — expanding squares
    {
      kind: "formula" as const,
      slug: "jvec-expand",
      name: "Expanding the square of a sum",
      intuition:
        "A length is found through its square: \\(|\\vec a+\\vec b|^2=(\\vec a+\\vec b)\\cdot(\\vec a+\\vec b)=|\\vec a|^2+2\\vec a\\cdot\\vec b+|\\vec b|^2\\). Any condition on lengths of combinations becomes, after squaring, an equation in \\(|\\vec a|\\), \\(|\\vec b|\\) and \\(\\vec a\\cdot\\vec b\\). For a sum of three vectors, the cross terms are the three pairwise dot products. For a maximum of \\(p|\\vec u|+q|\\vec v|\\) when \\(|\\vec u|^2+|\\vec v|^2\\) is fixed, Cauchy–Schwarz gives \\(\\sqrt{p^2+q^2}\\sqrt{|\\vec u|^2+|\\vec v|^2}\\).",
      definition:
        "- \\(|\\vec a\\pm\\vec b|^2=|\\vec a|^2+|\\vec b|^2\\pm2\\,\\vec a\\cdot\\vec b\\).\n" +
        "- \\(|\\vec a+\\vec b|^2+|\\vec a-\\vec b|^2=2(|\\vec a|^2+|\\vec b|^2)\\).\n" +
        "- \\(|\\vec a+\\vec b+\\vec c|^2=|\\vec a|^2+|\\vec b|^2+|\\vec c|^2+2(\\vec a\\cdot\\vec b+\\vec b\\cdot\\vec c+\\vec c\\cdot\\vec a)\\).\n" +
        "- \\(|\\vec a+\\vec b|=|\\vec a-\\vec b|\\) exactly when \\(\\vec a\\perp\\vec b\\).",
      formula: {
        label: "Square of a sum",
        latex: "|\\vec a+\\vec b|^2=|\\vec a|^2+2\\,\\vec a\\cdot\\vec b+|\\vec b|^2",
      },
      authoredExample: {
        prompt: "\\(|\\vec a|=3\\), \\(|\\vec b|=4\\), \\(\\vec a\\cdot\\vec b=6\\). Find \\(|\\vec a-\\vec b|^2\\).",
        steps: [
          "\\(9+16-12\\).",
        ],
        answer: "\\(13\\).",
      },
      selfCheckExample: {
        prompt: "Unit vectors \\(\\vec a,\\vec b,\\vec c\\) have \\(\\vec a+\\vec b+\\vec c=\\vec 0\\). Find \\(\\vec a\\cdot\\vec b+\\vec b\\cdot\\vec c+\\vec c\\cdot\\vec a\\).",
        steps: [
          "\\(0=|\\vec a+\\vec b+\\vec c|^2=3+2(\\text{sum})\\).",
        ],
        answer: "\\(-\\frac32\\).",
      },
      practiceSet: [
        { prompt: "\\(|\\vec a+\\vec b|=|\\vec a-\\vec b|\\) means?", answer: "\\(\\vec a\\perp\\vec b\\)" },
        { prompt: "Unit vectors at \\(60^\\circ\\): \\(|\\vec a+\\vec b|^2\\)?", answer: "\\(3\\)" },
        { prompt: "\\(|\\vec a|=2,|\\vec b|=3\\): \\(|\\vec a+\\vec b|^2+|\\vec a-\\vec b|^2\\)?", answer: "\\(26\\)" },
        { prompt: "\\(|\\vec a+\\vec b+\\vec c|^2=0\\) means?", answer: "\\(\\vec a+\\vec b+\\vec c=\\vec0\\)" },
      ],
      pyqExampleId: "a5b4273b-226e-477c-b945-207fc674e7f8", // 2021 — |2a + 3b| = |3a + b|, angle 60 degrees, a/8 a unit vector
      traps: [
        {
          title: "Square before you add",
          body: "\\(|\\vec a+\\vec b|\\) is \\(|\\vec a|+|\\vec b|\\) only when the vectors point the same way. Always square, expand, and take the root at the end.",
        },
      ],
    },

    // C2 — unit vectors with a cross term
    {
      kind: "formula" as const,
      slug: "jvec-unit",
      name: "Combinations with a cross-product term",
      intuition:
        "\\(\\vec a\\times\\vec b\\) is perpendicular to both \\(\\vec a\\) and \\(\\vec b\\), and for unit vectors its length is \\(\\sin\\theta\\). So in a combination \\(\\lambda\\vec a+\\mu\\vec b+\\nu(\\vec a\\times\\vec b)\\), dotting with \\(\\vec a\\) or \\(\\vec b\\) kills the cross term, and the square of its length splits into the in-plane part plus \\(\\nu^2\\sin^2\\theta\\).",
      definition:
        "- \\((\\vec a\\times\\vec b)\\cdot\\vec a=(\\vec a\\times\\vec b)\\cdot\\vec b=0\\).\n" +
        "- Unit \\(\\vec a,\\vec b\\): \\(|\\vec a\\times\\vec b|=\\sin\\theta\\), \\(\\vec a\\cdot\\vec b=\\cos\\theta\\).\n" +
        "- \\(|\\lambda\\vec a+\\mu\\vec b+\\nu(\\vec a\\times\\vec b)|^2=\\lambda^2+\\mu^2+2\\lambda\\mu\\cos\\theta+\\nu^2\\sin^2\\theta\\).",
      formula: {
        label: "Length with a cross term (unit vectors)",
        latex: "|\\lambda\\vec a+\\mu\\vec b+\\nu(\\vec a\\times\\vec b)|^2=\\lambda^2+\\mu^2+2\\lambda\\mu\\cos\\theta+\\nu^2\\sin^2\\theta",
      },
      authoredExample: {
        prompt: "Unit vectors \\(\\vec a,\\vec b\\) are at \\(60^\\circ\\), and \\(\\vec c=\\vec a+\\vec b+(\\vec a\\times\\vec b)\\). Find \\(|\\vec c|^2\\).",
        steps: [
          "\\(1+1+2\\cdot\\frac12+\\frac34\\).",
        ],
        answer: "\\(\\frac{15}4\\).",
      },
      selfCheckExample: {
        prompt: "With the same \\(\\vec c\\), find \\(\\vec c\\cdot\\vec a\\).",
        steps: [
          "The cross term drops: \\(1+\\cos60^\\circ\\).",
        ],
        answer: "\\(\\frac32\\).",
      },
      practiceSet: [
        { prompt: "\\((\\vec a\\times\\vec b)\\cdot\\vec a\\)?", answer: "\\(0\\)" },
        { prompt: "\\(|\\vec a\\times\\vec b|\\) for unit vectors at \\(30^\\circ\\)?", answer: "\\(\\frac12\\)" },
        { prompt: "Unit \\(\\vec a\\perp\\vec b\\): \\(|\\vec a+(\\vec a\\times\\vec b)|^2\\)?", answer: "\\(2\\)" },
        { prompt: "Unit \\(\\vec a\\perp\\vec b\\): \\(|\\vec a+\\vec b|\\)?", answer: "\\(\\sqrt2\\)" },
      ],
      pyqExampleId: "5005a3c9-6f39-4be6-8c0e-527aad6e3b24", // 2021 — angle between a + b + (a x b) and a, a perpendicular to b
      traps: [
        {
          title: "Only for unit vectors",
          body: "\\(|\\vec a\\times\\vec b|=\\sin\\theta\\) needs \\(|\\vec a|=|\\vec b|=1\\). In general it is \\(|\\vec a||\\vec b|\\sin\\theta\\).",
        },
      ],
    },
  ],
};
