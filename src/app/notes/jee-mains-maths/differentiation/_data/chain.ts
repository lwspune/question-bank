import type { SubtopicNote } from "@/app/notes/_types";

export const CHAIN_DIFF_NOTE: SubtopicNote = {
  subtopicName: "Chain Rule and Inverse-Trig Simplification",
  title: "Chain Rule and Inverse-Trig Simplification",
  oneLineDefinition:
    "Differentiating composite and inverse functions, and simplifying an inverse-trig or algebraic expression first so that its derivative is short.",
  whyItMatters:
    "Thirteen PYQs, eleven of them multiple choice, and one from 2026. Seven simplify first — four collapse an inverse-trig expression and three rewrite a trigonometric or algebraic fraction — and then differentiate; six apply the chain rule to a composite, three of them to an inverse function through g′(f(x)) = 1/f′(x). Two ideas cover the page.",
  concepts: [
    // C1 — simplify first
    {
      kind: "formula" as const,
      slug: "jdiff-simplify",
      name: "Simplify before you differentiate",
      intuition:
        "Many of these functions look heavy but collapse. A substitution \\(x=\\tan\\theta\\) or \\(x=\\sin\\theta\\) turns an inverse-trig expression into a multiple of \\(\\theta\\). Dividing top and bottom by \\(\\cos x\\) turns a ratio of sines and cosines into \\(\\tan(\\alpha-x)\\). An algebraic fraction often shares a factor. Differentiate only after the collapse, and read the interval: it decides which branch the angle is on.",
      definition:
        "- \\(\\tan^{-1}\\frac{2x}{1-x^2}=2\\tan^{-1}x\\) for \\(|x|<1\\).\n" +
        "- \\(\\sin^{-1}\\frac{2x}{1+x^2}=2\\tan^{-1}x\\) for \\(|x|\\le1\\).\n" +
        "- \\(\\tan^{-1}\\frac{a\\cos x-b\\sin x}{b\\cos x+a\\sin x}=\\tan^{-1}\\frac ab-x\\) when the right side lies in \\(\\left(-\\frac\\pi2,\\frac\\pi2\\right)\\).\n" +
        "- \\(\\tan^{-1}(\\tan u)=u\\) only for \\(u\\in\\left(-\\frac\\pi2,\\frac\\pi2\\right)\\).",
      formula: {
        label: "A standard substitution",
        latex: "x=\\tan\\theta:\\quad\\tan^{-1}\\frac{2x}{1-x^2}=2\\theta=2\\tan^{-1}x\\quad(|x|<1)",
      },
      authoredExample: {
        prompt: "Find \\(\\frac{dy}{dx}\\) if \\(y=\\tan^{-1}\\frac{2x}{1-x^2}\\), \\(|x|<1\\).",
        steps: [
          "Put \\(x=\\tan\\theta\\) with \\(\\theta\\in\\left(-\\frac\\pi4,\\frac\\pi4\\right)\\). Then \\(\\frac{2x}{1-x^2}=\\tan2\\theta\\) and \\(2\\theta\\in\\left(-\\frac\\pi2,\\frac\\pi2\\right)\\).",
          "So \\(y=2\\theta=2\\tan^{-1}x\\).",
        ],
        answer: "\\(\\frac{dy}{dx}=\\frac{2}{1+x^2}\\).",
      },
      selfCheckExample: {
        prompt: "Find \\(y'\\) if \\(y=\\frac{x^3-1}{x-1}\\), \\(x\\ne1\\).",
        steps: [
          "\\(x^3-1=(x-1)(x^2+x+1)\\), so \\(y=x^2+x+1\\).",
        ],
        answer: "\\(y'=2x+1\\).",
      },
      practiceSet: [
        { prompt: "\\(\\frac{d}{dx}\\tan^{-1}\\frac{\\cos x-\\sin x}{\\cos x+\\sin x}\\) for \\(x\\in\\left(-\\frac\\pi4,\\frac\\pi4\\right)\\)?", answer: "\\(-1\\)" },
        { prompt: "\\(\\frac{d}{dx}\\sin^{-1}\\frac{2x}{1+x^2}\\) for \\(|x|<1\\)?", answer: "\\(\\frac{2}{1+x^2}\\)" },
        { prompt: "\\(\\frac{d}{dx}\\sin\\left(\\cos^{-1}x\\right)\\)?", answer: "\\(-\\frac{x}{\\sqrt{1-x^2}}\\)" },
        { prompt: "\\(\\frac{d}{dx}\\frac{x^2-4}{x-2}\\)?", answer: "\\(1\\)" },
      ],
      pyqExampleId: "4c9c559d-153c-43b6-b4ba-fd79608eeaa4", // 2026 — tan⁻¹ of a sine-cosine ratio plus 2tan⁻¹ of an algebraic term, derivative at √3/2
      traps: [
        {
          title: "The branch decides the answer",
          body: "\\(\\cos^{-1}(\\cos x)=x\\) only on \\([0,\\pi]\\). On \\([\\pi,2\\pi]\\) it is \\(2\\pi-x\\), whose derivative is \\(-1\\), not \\(1\\). Read the stated interval before you simplify.",
        },
      ],
    },

    // C2 — chain rule and inverses
    {
      kind: "formula" as const,
      slug: "jdiff-chain",
      name: "The chain rule and inverse functions",
      intuition:
        "Differentiate from the outside in, multiplying the derivative of each layer at its own input. If \\(g\\) undoes \\(f\\), then \\(g(f(x))=x\\), and the chain rule gives \\(g'(f(x))\\,f'(x)=1\\). To find \\(g'\\) at a number \\(k\\), first solve \\(f(a)=k\\); then \\(g'(k)=\\frac{1}{f'(a)}\\).",
      definition:
        "- \\(\\big(f(g(x))\\big)'=f'(g(x))\\,g'(x)\\).\n" +
        "- If \\(g(f(x))=x\\) and \\(f(a)=k\\), then \\(g(k)=a\\) and \\(g'(k)=\\frac{1}{f'(a)}\\).\n" +
        "- \\(\\log_ab=\\frac{\\ln b}{\\ln a}\\): change the base before differentiating.",
      formula: {
        label: "Derivative of an inverse",
        latex: "g'(k)=\\frac{1}{f'(a)},\\qquad f(a)=k",
      },
      authoredExample: {
        prompt: "Let \\(f(x)=x^3+2x+1\\) and let \\(g\\) be its inverse. Find \\(g'(4)\\).",
        steps: [
          "Solve \\(a^3+2a+1=4\\): \\(a=1\\).",
          "\\(f'(x)=3x^2+2\\), so \\(f'(1)=5\\).",
        ],
        answer: "\\(g'(4)=\\frac15\\).",
      },
      selfCheckExample: {
        prompt: "Find \\(\\frac{d}{dx}\\sin^2\\left(x^3\\right)\\).",
        steps: [
          "Outside in: \\(2\\sin(x^3)\\cdot\\cos(x^3)\\cdot3x^2\\).",
        ],
        answer: "\\(3x^2\\sin\\left(2x^3\\right)\\).",
      },
      practiceSet: [
        { prompt: "\\(\\frac{d}{dx}e^{\\sin x}\\) at \\(x=0\\)?", answer: "\\(1\\)" },
        { prompt: "\\(f(x)=x^3+x\\) and \\(g\\) its inverse: \\(g'(2)\\)?", answer: "\\(\\frac14\\)" },
        { prompt: "\\(\\frac{d}{dx}\\ln(\\cos x)\\)?", answer: "\\(-\\tan x\\)" },
        { prompt: "\\(\\frac{d}{dx}\\log_2x\\)?", answer: "\\(\\frac{1}{x\\ln2}\\)" },
      ],
      pyqExampleId: "409d31c4-18cd-416b-9b3f-9e79cd0bb5b7", // 2024 — g inverts a quintic; g(7)/g′(7)
      traps: [
        {
          title: "Invert at the right point",
          body: "\\(g'(k)\\) is \\(\\frac{1}{f'(a)}\\) where \\(f(a)=k\\), not \\(\\frac{1}{f'(k)}\\). Solve \\(f(a)=k\\) first; the root is usually a small integer.",
        },
      ],
    },
  ],
};
