import type { SubtopicNote } from "@/app/notes/_types";

export const PRODUCTS_TI_NOTE: SubtopicNote = {
  subtopicName: "Sum-Product Formulas and Telescoping",
  title: "Sum-Product Formulas and Telescoping",
  oneLineDefinition:
    "Products of sines and cosines that collapse to one value, and sums that turn into products or telescope.",
  whyItMatters:
    "Fourteen PYQs, eleven of them multiple choice, and three from 2026. Four are products of cosines whose angles double, or products of sines that pair up into one; five use sin θ sin(60° − θ) sin(60° + θ) = ¼ sin 3θ, its cosine twin or the factor 4cos²θ − 1; five turn a sum into a product, or split each term into a difference so the sum telescopes. Three ideas cover the page.",
  concepts: [
    // C1 — doubling products
    {
      kind: "formula" as const,
      slug: "jti-doubling",
      name: "Cosine products with doubling angles",
      intuition:
        "Multiply \\(\\cos\\theta\\cos2\\theta\\cos4\\theta\\cdots\\) by \\(\\sin\\theta\\). Then \\(2\\sin\\theta\\cos\\theta=\\sin2\\theta\\), which pairs with \\(\\cos2\\theta\\), and so on. Each step doubles the angle and halves the factor, so after \\(n\\) cosines only \\(\\frac{\\sin2^n\\theta}{2^n\\sin\\theta}\\) is left. Products of sines often become such a chain once \\(\\sin x=\\cos(90^\\circ-x)\\) is used.",
      definition:
        "- \\(\\cos\\theta\\cos2\\theta\\cos4\\theta\\cdots\\cos2^{n-1}\\theta=\\frac{\\sin2^n\\theta}{2^n\\sin\\theta}\\).\n" +
        "- If \\(2^n\\theta=\\pi-\\theta\\), the product is \\(\\frac{1}{2^n}\\); if \\(2^n\\theta=\\pi+\\theta\\), it is \\(-\\frac{1}{2^n}\\).\n" +
        "- \\(\\sin(\\pi-x)=\\sin x\\) pairs equal sines; \\(\\sin x=\\cos\\left(\\frac{\\pi}{2}-x\\right)\\) turns sines into cosines.\n" +
        "- \\(\\cos(\\pi-x)=-\\cos x\\) replaces an angle past \\(\\frac{\\pi}{2}\\) by a smaller one.",
      formula: {
        label: "Doubling product",
        latex: "\\cos\\theta\\cos2\\theta\\cos4\\theta\\cdots\\cos2^{n-1}\\theta=\\frac{\\sin2^n\\theta}{2^n\\sin\\theta}",
      },
      authoredExample: {
        prompt: "Find \\(\\cos\\frac{\\pi}{9}\\cos\\frac{2\\pi}{9}\\cos\\frac{4\\pi}{9}\\).",
        steps: [
          "Three cosines with doubling angles, \\(\\theta=\\frac{\\pi}{9}\\): the product is \\(\\frac{\\sin\\frac{8\\pi}{9}}{8\\sin\\frac{\\pi}{9}}\\).",
          "\\(\\sin\\frac{8\\pi}{9}=\\sin\\left(\\pi-\\frac{\\pi}{9}\\right)=\\sin\\frac{\\pi}{9}\\).",
        ],
        answer: "\\(\\frac18\\).",
      },
      selfCheckExample: {
        prompt: "Find \\(\\cos\\frac{2\\pi}{15}\\cos\\frac{4\\pi}{15}\\cos\\frac{8\\pi}{15}\\cos\\frac{16\\pi}{15}\\).",
        steps: [
          "Four doubling cosines with \\(\\theta=\\frac{2\\pi}{15}\\): the product is \\(\\frac{\\sin\\frac{32\\pi}{15}}{16\\sin\\frac{2\\pi}{15}}\\).",
          "\\(\\frac{32\\pi}{15}=2\\pi+\\frac{2\\pi}{15}\\), so the sines are equal.",
        ],
        answer: "\\(\\frac{1}{16}\\).",
      },
      practiceSet: [
        { prompt: "\\(\\cos12^\\circ\\cos24^\\circ\\cos48^\\circ\\cos96^\\circ\\)?", answer: "\\(-\\frac{1}{16}\\)" },
        { prompt: "\\(\\cos\\frac{\\pi}{7}\\cos\\frac{2\\pi}{7}\\cos\\frac{4\\pi}{7}\\)?", answer: "\\(-\\frac18\\)" },
        { prompt: "\\(\\cos\\frac{\\pi}{5}\\cos\\frac{2\\pi}{5}\\)?", answer: "\\(\\frac14\\)" },
        { prompt: "\\(\\sin\\frac{\\pi}{14}\\sin\\frac{3\\pi}{14}\\sin\\frac{5\\pi}{14}\\)?", answer: "\\(\\frac18\\)" },
      ],
      pyqExampleId: "6b11ac0a-c20e-4f46-8e41-73066af24659", // 2023 — five doubling cosines at π/33
      traps: [
        {
          title: "Check where the last angle lands",
          body: "The product is \\(\\pm\\frac{1}{2^n}\\) only when \\(\\sin2^n\\theta=\\pm\\sin\\theta\\), and the sign matters. At \\(\\theta=\\frac{\\pi}{7}\\), \\(8\\theta=\\pi+\\theta\\), so the three-factor product is \\(-\\frac18\\), not \\(\\frac18\\).",
        },
      ],
    },

    // C2 — the 60° product family
    {
      kind: "formula" as const,
      slug: "jti-sixty",
      name: "The 60° product identities",
      intuition:
        "Expanding \\(\\sin(60^\\circ-\\theta)\\sin(60^\\circ+\\theta)\\) gives \\(\\sin^260^\\circ-\\sin^2\\theta=\\frac34-\\sin^2\\theta\\). Multiplied by \\(\\sin\\theta\\), that is \\(\\frac14\\sin3\\theta\\). So three sines at \\(\\theta\\), \\(60^\\circ-\\theta\\) and \\(60^\\circ+\\theta\\) make a quarter of one sine at \\(3\\theta\\); cosines and tangents work the same way.",
      definition:
        "- \\(\\sin\\theta\\sin(60^\\circ-\\theta)\\sin(60^\\circ+\\theta)=\\frac14\\sin3\\theta\\).\n" +
        "- \\(\\cos\\theta\\cos(60^\\circ-\\theta)\\cos(60^\\circ+\\theta)=\\frac14\\cos3\\theta\\).\n" +
        "- \\(\\tan\\theta\\tan(60^\\circ-\\theta)\\tan(60^\\circ+\\theta)=\\tan3\\theta\\).\n" +
        "- \\(4\\cos^2\\theta-1=3-4\\sin^2\\theta=\\frac{\\sin3\\theta}{\\sin\\theta}\\), so a chain of such factors at \\(\\theta,3\\theta,9\\theta,\\ldots\\) telescopes.",
      formula: {
        label: "The 60° identity",
        latex: "\\sin\\theta\\sin(60^\\circ-\\theta)\\sin(60^\\circ+\\theta)=\\tfrac14\\sin3\\theta",
      },
      authoredExample: {
        prompt: "Find \\(\\cos10^\\circ\\cos50^\\circ\\cos70^\\circ\\).",
        steps: [
          "With \\(\\theta=10^\\circ\\): \\(60^\\circ-\\theta=50^\\circ\\) and \\(60^\\circ+\\theta=70^\\circ\\).",
          "The product is \\(\\frac14\\cos30^\\circ=\\frac14\\cdot\\frac{\\sqrt3}{2}\\).",
        ],
        answer: "\\(\\frac{\\sqrt3}{8}\\).",
      },
      selfCheckExample: {
        prompt: "Find \\(\\tan20^\\circ\\tan40^\\circ\\tan80^\\circ\\).",
        steps: [
          "With \\(\\theta=20^\\circ\\): the angles are \\(\\theta\\), \\(60^\\circ-\\theta\\) and \\(60^\\circ+\\theta\\).",
          "The product is \\(\\tan60^\\circ\\).",
        ],
        answer: "\\(\\sqrt3\\).",
      },
      practiceSet: [
        { prompt: "\\(\\sin15^\\circ\\sin45^\\circ\\sin75^\\circ\\)?", answer: "\\(\\frac{\\sqrt2}{8}\\)" },
        { prompt: "\\(\\cos20^\\circ\\cos40^\\circ\\cos80^\\circ\\)?", answer: "\\(\\frac18\\)" },
        { prompt: "\\(\\tan10^\\circ\\tan50^\\circ\\tan70^\\circ\\)?", answer: "\\(\\frac{1}{\\sqrt3}\\)" },
        { prompt: "\\(4\\cos^220^\\circ-1\\) as a ratio of sines?", answer: "\\(\\frac{\\sin60^\\circ}{\\sin20^\\circ}\\)" },
      ],
      pyqExampleId: "301adf47-b22b-4148-ad8c-d1f1bb639968", // 2026 — sin 10° sin 50° sin 70° = 1/8, then sin 75°
      traps: [
        {
          title: "The angles must fit the pattern",
          body: "\\(\\sin10^\\circ\\sin50^\\circ\\sin70^\\circ\\) fits with \\(\\theta=10^\\circ\\). \\(\\sin10^\\circ\\sin20^\\circ\\sin40^\\circ\\) does not: no \\(\\theta\\) gives those three angles, so the identity does not apply to it directly.",
        },
      ],
    },

    // C3 — sum-to-product and telescoping
    {
      kind: "formula" as const,
      slug: "jti-telescope",
      name: "Sum-to-product and telescoping",
      intuition:
        "The sum-to-product formulas turn a sum of two sines or cosines into one product, which often contains a known value such as \\(\\cos60^\\circ\\). For a long sum, write each term as a difference \\(f(k+1)-f(k)\\): the middle terms cancel and only the two ends remain.",
      definition:
        "- \\(\\sin C+\\sin D=2\\sin\\frac{C+D}{2}\\cos\\frac{C-D}{2}\\); \\(\\sin C-\\sin D=2\\cos\\frac{C+D}{2}\\sin\\frac{C-D}{2}\\).\n" +
        "- \\(\\cos C+\\cos D=2\\cos\\frac{C+D}{2}\\cos\\frac{C-D}{2}\\); \\(\\cos C-\\cos D=-2\\sin\\frac{C+D}{2}\\sin\\frac{C-D}{2}\\).\n" +
        "- For cosines at angles spaced by \\(d\\), multiply by \\(2\\sin\\frac d2\\): \\(2\\sin\\frac d2\\cos x=\\sin\\left(x+\\frac d2\\right)-\\sin\\left(x-\\frac d2\\right)\\).\n" +
        "- \\(\\frac{\\sin(B-A)}{\\sin A\\sin B}=\\cot A-\\cot B\\) and \\(\\tan\\theta+\\cot\\theta=\\frac{2}{\\sin2\\theta}\\).",
      formula: {
        label: "Sum to product",
        latex: "\\sin C+\\sin D=2\\sin\\frac{C+D}{2}\\cos\\frac{C-D}{2},\\quad\\cos C+\\cos D=2\\cos\\frac{C+D}{2}\\cos\\frac{C-D}{2}",
      },
      authoredExample: {
        prompt: "Find \\(\\cos\\frac{\\pi}{5}+\\cos\\frac{3\\pi}{5}\\).",
        steps: [
          "The angles are spaced by \\(\\frac{2\\pi}{5}\\), so multiply by \\(2\\sin\\frac{\\pi}{5}\\).",
          "The terms become \\(\\sin\\frac{2\\pi}{5}-\\sin0\\) and \\(\\sin\\frac{4\\pi}{5}-\\sin\\frac{2\\pi}{5}\\), which add to \\(\\sin\\frac{4\\pi}{5}=\\sin\\frac{\\pi}{5}\\).",
          "So the sum is \\(\\frac{\\sin\\frac{\\pi}{5}}{2\\sin\\frac{\\pi}{5}}\\).",
        ],
        answer: "\\(\\frac12\\).",
      },
      selfCheckExample: {
        prompt: "Find \\(\\sin50^\\circ-\\sin70^\\circ+\\sin10^\\circ\\).",
        steps: [
          "\\(\\sin50^\\circ-\\sin70^\\circ=2\\cos60^\\circ\\sin(-10^\\circ)=-\\sin10^\\circ\\).",
          "Add \\(\\sin10^\\circ\\).",
        ],
        answer: "\\(0\\).",
      },
      practiceSet: [
        { prompt: "\\(\\cos20^\\circ+\\cos100^\\circ+\\cos140^\\circ\\)?", answer: "\\(0\\)" },
        { prompt: "\\(\\tan15^\\circ+\\cot15^\\circ\\)?", answer: "\\(4\\)" },
        { prompt: "\\(\\sin75^\\circ-\\sin15^\\circ\\)?", answer: "\\(\\frac{1}{\\sqrt2}\\)" },
        { prompt: "\\(\\cos80^\\circ+\\cos40^\\circ\\) as one ratio?", answer: "\\(\\cos20^\\circ\\)" },
      ],
      pyqExampleId: "2db372b8-874b-4cef-86c1-7d098bc69c56", // 2026 — sin θ / cos 3θ = ½(tan 3θ − tan θ) telescopes
      traps: [
        {
          title: "Multiply by the right sine",
          body: "For cosines at angles spaced by \\(d\\), multiply by \\(2\\sin\\frac d2\\), not \\(2\\sin d\\). With the wrong factor the new terms do not cancel in pairs.",
        },
      ],
    },
  ],
};
