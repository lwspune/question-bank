import type { SubtopicNote } from "@/app/notes/_types";

export const UNITY_CX_NOTE: SubtopicNote = {
  subtopicName: "Roots of Unity",
  title: "Roots of Unity",
  oneLineDefinition:
    "The solutions of z to the power n equal to 1 — above all the cube roots 1, ω and ω squared — and the two facts that simplify every power of them.",
  whyItMatters:
    "Fourteen PYQs, nine of them numerical answers. Ten use the cube roots of unity, usually as the roots of x² + x + 1 = 0, to sum long runs of powers; four use the fifth or sixth roots. Every one reduces a power by its remainder. Two ideas cover the page.",
  concepts: [
    // C1 — cube roots of unity
    {
      kind: "formula" as const,
      slug: "jcx-omega",
      name: "Cube roots of unity",
      intuition:
        "The roots of \\(x^3=1\\) are \\(1\\), \\(\\omega\\) and \\(\\omega^2\\), with \\(\\omega=\\frac{-1+i\\sqrt3}2=e^{2\\pi i/3}\\). Two facts do almost all the work: \\(\\omega^3=1\\), so a power of \\(\\omega\\) depends only on the exponent mod 3; and \\(1+\\omega+\\omega^2=0\\), so \\(1+\\omega=-\\omega^2\\) and \\(1+\\omega^2=-\\omega\\). The non-real roots are exactly the roots of \\(x^2+x+1=0\\).",
      definition:
        "- \\(\\omega=\\frac{-1+i\\sqrt3}2\\), \\(\\omega^2=\\bar\\omega=\\frac1\\omega\\).\n" +
        "- \\(\\omega^3=1\\) and \\(1+\\omega+\\omega^2=0\\).\n" +
        "- \\(\\omega^n+\\omega^{-n}\\) is 2 when \\(3\\mid n\\) and \\(-1\\) otherwise.\n" +
        "- \\(x^2+x+1\\) has roots \\(\\omega,\\omega^2\\); \\(x^2-x+1\\) has roots \\(-\\omega,-\\omega^2\\).\n" +
        "- A real polynomial \\(P\\) is divisible by \\(x^2+x+1\\) exactly when \\(P(\\omega)=0\\).",
      formula: {
        label: "The two facts",
        latex: "\\omega^3=1,\\qquad1+\\omega+\\omega^2=0",
      },
      authoredExample: {
        prompt: "Simplify \\((1+\\omega-\\omega^2)^3\\).",
        steps: [
          "\\(1+\\omega=-\\omega^2\\), so the base is \\(-2\\omega^2\\).",
          "\\((-2\\omega^2)^3=-8\\omega^6=-8\\).",
        ],
        answer: "\\(-8\\).",
      },
      selfCheckExample: {
        prompt: "Find \\(\\omega^{100}+\\omega^{200}+1\\).",
        steps: [
          "\\(100=3\\cdot33+1\\) and \\(200=3\\cdot66+2\\), so this is \\(\\omega+\\omega^2+1\\).",
        ],
        answer: "\\(0\\).",
      },
      practiceSet: [
        { prompt: "\\((1+\\omega)^3\\)?", answer: "\\(-1\\)" },
        { prompt: "\\(\\omega^{2026}\\)?", answer: "\\(\\omega\\)" },
        { prompt: "\\((1-\\omega+\\omega^2)(1+\\omega-\\omega^2)\\)?", answer: "\\(4\\)" },
        { prompt: "\\(\\sum_{k=1}^{6}\\omega^k\\)?", answer: "\\(0\\)" },
      ],
      pyqExampleId: "62a7d105-faf5-41b3-9ac0-818b4100c91d", // 2026 — sum of (x^n + 1/x^n)^4 for n = 1..25 with x^2 + x + 1 = 0
      traps: [
        {
          title: "Count the multiples of 3",
          body: "In a sum over \\(n=1\\) to \\(N\\), the terms with \\(3\\mid n\\) behave differently, and there are \\(\\lfloor N/3\\rfloor\\) of them. Miscounting them by one is the usual slip.",
        },
      ],
    },

    // C2 — nth roots of unity
    {
      kind: "formula" as const,
      slug: "jcx-nth",
      name: "The nth roots of unity",
      intuition:
        "The \\(n\\) solutions of \\(z^n=1\\) are \\(e^{2\\pi ik/n}\\), \\(k=0,1,\\dots,n-1\\): equally spaced on the unit circle, so they add to 0. The polynomial \\(x^{n-1}+\\dots+x+1\\) is \\(\\frac{x^n-1}{x-1}\\), so its roots are the nth roots other than 1, and each satisfies \\(\\alpha^n=1\\): powers reduce mod \\(n\\). Other factorisations lead to the same place, for example \\(x^4+x^2+1=\\frac{x^6-1}{x^2-1}\\).",
      definition:
        "- \\(z^n=1\\): \\(z=e^{2\\pi ik/n}\\), \\(k=0,\\dots,n-1\\); their sum is 0.\n" +
        "- \\(x^{n-1}+\\dots+x+1=\\frac{x^n-1}{x-1}\\).\n" +
        "- \\(z^n=a\\): multiply these by one root of \\(a\\), \\(|a|^{1/n}e^{i\\arg(a)/n}\\).\n" +
        "- The roots form a regular \\(n\\)-gon on the circle.",
      formula: {
        label: "Roots of unity",
        latex: "z^n=1\\ \\Rightarrow\\ z=e^{2\\pi ik/n},\\quad k=0,1,\\dots,n-1",
      },
      authoredExample: {
        prompt: "Find the sum of the 100th powers of the roots of \\(x^3+x^2+x+1=0\\).",
        steps: [
          "\\(x^3+x^2+x+1=\\frac{x^4-1}{x-1}\\), with roots \\(-1,i,-i\\).",
          "Each 100th power is 1, since \\(4\\mid100\\).",
        ],
        answer: "\\(3\\).",
      },
      selfCheckExample: {
        prompt: "Solve \\(z^4=-16\\).",
        steps: [
          "\\(|z|=2\\) and \\(\\arg z=\\frac{\\pi+2k\\pi}4\\).",
        ],
        answer: "\\(\\pm\\sqrt2\\pm\\sqrt2i\\) (all four sign choices).",
      },
      practiceSet: [
        { prompt: "Sum of the fifth roots of unity?", answer: "\\(0\\)" },
        { prompt: "Product of the cube roots of unity?", answer: "\\(1\\)" },
        { prompt: "Non-real roots of \\(z^6=1\\)?", answer: "\\(4\\)" },
        { prompt: "\\(\\alpha^6\\) for a root of \\(x^2-x+1=0\\)?", answer: "\\(1\\)" },
      ],
      pyqExampleId: "82190341-d4f4-4c2d-8bdc-5b034dfaead2", // 2022 — sum of 2021st powers of the roots of x^4 + x^3 + x^2 + x + 1 = 0
      traps: [
        {
          title: "The root 1 is missing",
          body: "\\(x^{n-1}+\\dots+1=0\\) has only the \\(n-1\\) roots other than 1. So the sum of their \\(k\\)th powers is \\(n-1\\) when \\(n\\mid k\\), and \\(-1\\) otherwise.",
        },
      ],
    },
  ],
};
