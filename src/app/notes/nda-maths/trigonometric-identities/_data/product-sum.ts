import type { SubtopicNote } from "@/app/notes/_types";

export const PRODUCT_SUM_NOTE: SubtopicNote = {
  subtopicName: "Product-to-Sum and Sum-to-Product Identities",
  title: "Product-to-Sum & Sum-to-Product",
  oneLineDefinition:
    "The two conversion families — turn a product of sines/cosines into a sum, or a sum into a product — plus the telescoping product chains and the conditional identities for A + B + C = 90° or 180°.",
  whyItMatters:
    "These conversions are what make otherwise-intractable products like 8 cos 10° cos 20° cos 40° or sums like cos 48° − cos 12° collapse to a clean value. Choosing the right direction (product→sum vs sum→product) is the whole decision.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "trig-product-to-sum",
      name: "Product-to-sum formulas",
      intuition:
        "Turn a product of two sines/cosines into a sum or difference — derived directly by adding and subtracting the compound-angle formulas. Use this when you have a product and want it to telescope or cancel.",
      definition:
        "- \\(2\\sin A\\cos B=\\sin(A+B)+\\sin(A-B)\\).\n" +
        "- \\(2\\cos A\\sin B=\\sin(A+B)-\\sin(A-B)\\).\n" +
        "- \\(2\\cos A\\cos B=\\cos(A+B)+\\cos(A-B)\\).\n" +
        "- \\(2\\sin A\\sin B=\\cos(A-B)-\\cos(A+B)\\).",
      formula: {
        label: "The four product-to-sum identities",
        latex: "2\\sin A\\cos B=\\sin(A+B)+\\sin(A-B),\\qquad 2\\cos A\\cos B=\\cos(A+B)+\\cos(A-B),\\qquad 2\\cos A\\sin B=\\sin(A+B)-\\sin(A-B),\\qquad 2\\sin A\\sin B=\\cos(A-B)-\\cos(A+B)",
      },
      authoredExample: {
        prompt: "Evaluate \\(2\\sin 75°\\cos 15°\\).",
        steps: [
          "\\(2\\sin A\\cos B=\\sin(A+B)+\\sin(A-B)\\) with \\(A=75°,B=15°\\).",
          "\\(=\\sin 90°+\\sin 60°=1+\\tfrac{\\sqrt3}{2}\\).",
        ],
        answer: "\\(1+\\tfrac{\\sqrt3}{2}\\).",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(2\\cos 75°\\cos 15°\\).",
        steps: [
          "\\(2\\cos A\\cos B=\\cos(A+B)+\\cos(A-B)\\) with \\(A=75°,B=15°\\).",
          "\\(=\\cos 90°+\\cos 60°=0+\\tfrac12\\).",
        ],
        answer: "\\(\\tfrac12\\).",
      },
      practiceSet: [
        { prompt: "\\(2\\sin A\\cos B=?\\)", answer: "\\(\\sin(A+B)+\\sin(A-B)\\)" },
        { prompt: "\\(2\\sin A\\sin B=?\\)", answer: "\\(\\cos(A-B)-\\cos(A+B)\\)" },
        { prompt: "\\(2\\cos A\\cos B=?\\)", answer: "\\(\\cos(A+B)+\\cos(A-B)\\)" },
        { prompt: "When do you reach for product-to-sum?", answer: "A product you want to telescope or cancel" },
      ],
      pyqExampleId: "22e36307-6bf1-4ff3-8a64-533f887fc0fc", // 1/sin10 - √3/cos10
    },

    {
      kind: "formula" as const,
      slug: "trig-sum-to-product",
      name: "Sum-to-product formulas",
      intuition:
        "The reverse direction: a sum or difference of two sines/cosines becomes a product. Use this when you want a common factor to cancel or a ratio to simplify to a single tangent.",
      definition:
        "- \\(\\sin C+\\sin D=2\\sin\\tfrac{C+D}{2}\\cos\\tfrac{C-D}{2}\\); \\(\\;\\sin C-\\sin D=2\\cos\\tfrac{C+D}{2}\\sin\\tfrac{C-D}{2}\\).\n" +
        "- \\(\\cos C+\\cos D=2\\cos\\tfrac{C+D}{2}\\cos\\tfrac{C-D}{2}\\); \\(\\;\\cos C-\\cos D=-2\\sin\\tfrac{C+D}{2}\\sin\\tfrac{C-D}{2}\\).\n" +
        "Corollary: \\(\\dfrac{\\sin C+\\sin D}{\\cos C+\\cos D}=\\tan\\tfrac{C+D}{2}\\).",
      formula: {
        label: "The four sum-to-product identities",
        latex: "\\sin C+\\sin D=2\\sin\\tfrac{C+D}{2}\\cos\\tfrac{C-D}{2},\\qquad \\cos C-\\cos D=-2\\sin\\tfrac{C+D}{2}\\sin\\tfrac{C-D}{2},\\qquad \\sin C-\\sin D=2\\cos\\tfrac{C+D}{2}\\sin\\tfrac{C-D}{2},\\qquad \\cos C+\\cos D=2\\cos\\tfrac{C+D}{2}\\cos\\tfrac{C-D}{2}",
      },
      authoredExample: {
        prompt: "Simplify \\(\\dfrac{\\sin 5x-\\sin 3x}{\\cos 5x+\\cos 3x}\\).",
        steps: [
          "Numerator \\(=2\\cos 4x\\sin x\\); denominator \\(=2\\cos 4x\\cos x\\).",
          "Ratio \\(=\\dfrac{\\sin x}{\\cos x}=\\tan x\\).",
        ],
        answer: "\\(\\tan x\\).",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\cos 48°-\\cos 12°\\).",
        steps: [
          "\\(\\cos C-\\cos D=-2\\sin\\tfrac{C+D}{2}\\sin\\tfrac{C-D}{2}=-2\\sin 30°\\sin 18°\\).",
          "\\(=-2\\cdot\\tfrac12\\cdot\\tfrac{\\sqrt5-1}{4}=-\\tfrac{\\sqrt5-1}{4}\\).",
        ],
        answer: "\\(-\\dfrac{\\sqrt5-1}{4}\\).",
      },
      practiceSet: [
        { prompt: "\\(\\sin C+\\sin D=?\\)", answer: "\\(2\\sin\\tfrac{C+D}{2}\\cos\\tfrac{C-D}{2}\\)" },
        { prompt: "\\(\\cos C-\\cos D=?\\)", answer: "\\(-2\\sin\\tfrac{C+D}{2}\\sin\\tfrac{C-D}{2}\\)" },
        { prompt: "\\(\\dfrac{\\sin C+\\sin D}{\\cos C+\\cos D}=?\\)", answer: "\\(\\tan\\tfrac{C+D}{2}\\)" },
        { prompt: "\\(\\sin 5x-\\sin 3x=?\\)", answer: "\\(2\\cos 4x\\sin x\\)" },
      ],
      pyqExampleId: "c71a28f6-e903-4072-928e-e01889413f35", // cos48-cos12
    },

    {
      kind: "formula" as const,
      slug: "trig-telescoping-products",
      name: "Telescoping products of cosines/sines",
      intuition:
        "A chain like cos 10° cos 20° cos 40° collapses by repeatedly using \\(2\\sin\\theta\\cos\\theta=\\sin 2\\theta\\): introduce a sine, and each cosine doubles the angle until the product telescopes.",
      definition:
        "Multiply and divide by \\(2\\sin(\\text{smallest angle})\\), then apply \\(2\\sin\\theta\\cos\\theta=\\sin 2\\theta\\) repeatedly. General result: \\(\\cos\\theta\\cos 2\\theta\\cos 4\\theta\\cdots\\cos 2^{n-1}\\theta=\\dfrac{\\sin 2^n\\theta}{2^n\\sin\\theta}\\). Triple products like \\(\\sin\\theta\\sin(60°-\\theta)\\sin(60°+\\theta)=\\tfrac14\\sin 3\\theta\\) also appear.",
      authoredExample: {
        prompt: "Evaluate \\(\\cos 20°\\cos 40°\\cos 80°\\).",
        steps: [
          "Multiply and divide by \\(2\\sin 20°\\): \\(\\dfrac{2\\sin 20°\\cos 20°\\cos 40°\\cos 80°}{2\\sin 20°}=\\dfrac{\\sin 40°\\cos 40°\\cos 80°}{2\\sin 20°}\\).",
          "Repeat: \\(\\to\\dfrac{\\sin 160°}{8\\sin 20°}=\\dfrac{\\sin 20°}{8\\sin 20°}=\\tfrac18\\).",
        ],
        answer: "\\(\\tfrac18\\).",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\cos 36°\\cos 72°\\).",
        steps: [
          "Multiply and divide by \\(2\\sin 36°\\): \\(\\dfrac{2\\sin 36°\\cos 36°\\cos 72°}{2\\sin 36°}=\\dfrac{\\sin 72°\\cos 72°}{2\\sin 36°}\\).",
          "\\(=\\dfrac{\\tfrac12\\sin 144°}{2\\sin 36°}=\\dfrac{\\sin 36°}{4\\sin 36°}=\\tfrac14\\).",
        ],
        answer: "\\(\\tfrac14\\).",
      },
      practiceSet: [
        { prompt: "Identity to telescope a cosine chain?", answer: "\\(2\\sin\\theta\\cos\\theta=\\sin 2\\theta\\)" },
        { prompt: "\\(\\cos\\theta\\cos 2\\theta\\cos 4\\theta=?\\)", answer: "\\(\\dfrac{\\sin 8\\theta}{8\\sin\\theta}\\)" },
        { prompt: "\\(\\sin\\theta\\sin(60°-\\theta)\\sin(60°+\\theta)=?\\)", answer: "\\(\\tfrac14\\sin 3\\theta\\)" },
        { prompt: "First move for \\(\\cos 20°\\cos 40°\\cos 80°\\)?", answer: "Multiply & divide by \\(2\\sin 20°\\)" },
      ],
      pyqExampleId: "c24cd4bd-82fc-4b50-bf39-d75ebeb18816", // 8cos10cos20cos40
    },

    {
      kind: "formula" as const,
      slug: "trig-conditional-identities",
      name: "Conditional identities (A + B + C = 90° or 180°)",
      intuition:
        "When three angles sum to 90° or 180°, special identities kick in — the staple results for triangle-angle problems. Recognising the angle-sum condition is the trigger.",
      definition:
        "- **\\(A+B+C=180°\\):** \\(\\tan A+\\tan B+\\tan C=\\tan A\\tan B\\tan C\\); \\(\\;\\sin 2A+\\sin 2B+\\sin 2C=4\\sin A\\sin B\\sin C\\).\n" +
        "- **\\(A+B+C=90°\\):** \\(\\tan A\\tan B+\\tan B\\tan C+\\tan C\\tan A=1\\); \\(\\;\\cot A+\\cot B+\\cot C=\\cot A\\cot B\\cot C\\).",
      formula: {
        label: "The two signature conditional identities",
        latex: "A+B+C=\\pi:\\ \\tan A+\\tan B+\\tan C=\\tan A\\tan B\\tan C",
      },
      authoredExample: {
        prompt: "If \\(A+B+C=180°\\) and \\(\\tan A=1,\\tan B=2\\), find \\(\\tan C\\).",
        steps: [
          "\\(\\tan A+\\tan B+\\tan C=\\tan A\\tan B\\tan C\\Rightarrow 1+2+\\tan C=2\\tan C\\).",
          "\\(3=\\tan C\\).",
        ],
        answer: "\\(\\tan C=3\\).",
      },
      selfCheckExample: {
        prompt: "If \\(A+B+C=180°\\), simplify \\(\\sin 2A+\\sin 2B+\\sin 2C\\).",
        steps: [
          "\\(\\sin 2A+\\sin 2B=2\\sin(A+B)\\cos(A-B)=2\\sin C\\cos(A-B)\\) (since \\(A+B=180°-C\\)).",
          "Add \\(\\sin 2C=2\\sin C\\cos C\\): \\(2\\sin C[\\cos(A-B)+\\cos C]\\). Since \\(\\cos C=-\\cos(A+B)\\), the bracket is \\(\\cos(A-B)-\\cos(A+B)=2\\sin A\\sin B\\).",
        ],
        answer: "\\(4\\sin A\\sin B\\sin C\\).",
      },
      practiceSet: [
        { prompt: "\\(A+B+C=180°\\): \\(\\tan A+\\tan B+\\tan C=?\\)", answer: "\\(\\tan A\\tan B\\tan C\\)" },
        { prompt: "\\(A+B+C=90°\\): \\(\\sum\\tan A\\tan B=?\\)", answer: "\\(1\\)" },
        { prompt: "\\(A+B+C=180°\\): \\(\\sin 2A+\\sin 2B+\\sin 2C=?\\)", answer: "\\(4\\sin A\\sin B\\sin C\\)" },
        { prompt: "What triggers these identities?", answer: "An angle-sum condition (90° or 180°)" },
      ],
      pyqExampleId: "4e366b0b-3cb8-4bbb-9f7c-6e8763583d77", // tan25tan15+...=1
    },
  ],
  related: [
    { label: "Double, Triple & Half-Angle", href: "/notes/nda-maths/trigonometric-identities/trig-multiple-half-angle" },
    { label: "Maximum & Minimum Values", href: "/notes/nda-maths/trigonometric-identities/trig-max-min" },
  ],
};
