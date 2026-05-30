import type { SubtopicNote } from "@/app/notes/_types";

export const BY_PARTS_NOTE: SubtopicNote = {
  subtopicName: "Integration by Parts",
  title: "Integration by Parts",
  oneLineDefinition:
    "Integrate a product by trading it for an easier integral — choose u by LIATE, and watch for the cyclic and eˣ[f+f'] shortcuts.",
  whyItMatters:
    "23 PYQs, and the chapter's second-hardest pocket (15 of 23 are HARD). Three patterns dominate: the LIATE choice for ordinary products; the cyclic integrals (∫eˣ sin x, ∫sin(log x)) that return to themselves; and the recurring eˣ[f(x)+f'(x)] → eˣ f(x) family that MHT-CET tests almost every year. " +
    "Recognising the eˣ[f+f'] shape on sight turns a HARD question into a one-line answer.",
  concepts: [
    // 1 — LIATE
    {
      kind: "formula" as const,
      slug: "liate-rule",
      name: "Integration by Parts and the LIATE Rule",
      intuition:
        "To integrate a product, call one factor \\(u\\) (to differentiate) and the other \\(dv\\) (to integrate). Pick \\(u\\) by LIATE — Log, Inverse-trig, Algebraic, Trig, Exponential — so that differentiating \\(u\\) makes the problem simpler.",
      definition:
        "Integration by parts: \\(\\displaystyle\\int u\\,dv = uv - \\int v\\,du\\). " +
        "Choose \\(u\\) as the function that appears EARLIEST in **LIATE** (Logarithmic, Inverse trig, Algebraic, Trigonometric, Exponential) — it differentiates toward something simpler, while the rest is \\(dv\\). " +
        "A lone \\(\\log x\\) or \\(\\tan^{-1}x\\) is integrated by taking \\(dv = dx\\).",
      formula: {
        label: "Integration by parts",
        latex: "\\int u\\,dv = uv - \\int v\\,du",
        symbols: [
          { symbol: "u", meaning: "factor to differentiate (earliest in LIATE)" },
          { symbol: "dv", meaning: "factor to integrate (the rest, including \\(dx\\))" },
        ],
      },
      authoredExample: {
        prompt: "Evaluate \\(\\displaystyle\\int \\log x\\,dx\\).",
        steps: [
          "There is only one function — take \\(u = \\log x\\) and \\(dv = dx\\) (Log is first in LIATE).",
          "Then \\(du = \\dfrac{1}{x}\\,dx\\) and \\(v = x\\).",
          "Apply parts: \\(uv - \\int v\\,du = x\\log x - \\int x\\cdot\\dfrac{1}{x}\\,dx = x\\log x - \\int 1\\,dx\\).",
          "Finish: \\(x\\log x - x + C\\).",
        ],
        answer: "\\(x\\log x - x + C\\)",
      },
      selfCheckExample: {
        prompt:
          "Evaluate \\(\\displaystyle\\int \\sin^{-1}\\!\\left(\\dfrac{2x}{1+x^2}\\right)dx\\).",
        steps: [
          "Recognise \\(\\dfrac{2x}{1+x^2} = \\sin(2\\tan^{-1}x)\\), so \\(\\sin^{-1}\\!\\left(\\dfrac{2x}{1+x^2}\\right) = 2\\tan^{-1}x\\) (for \\(|x|\\le 1\\)).",
          "Now integrate \\(\\int 2\\tan^{-1}x\\,dx\\) by parts with \\(u = \\tan^{-1}x,\\ dv = dx\\): \\(2\\big(x\\tan^{-1}x - \\int \\tfrac{x}{1+x^2}\\,dx\\big)\\).",
          "The leftover is \\(\\tfrac12\\log(1+x^2)\\): result \\(2x\\tan^{-1}x - \\log(1+x^2) + C\\).",
        ],
        answer: "\\(2x\\tan^{-1}x - \\log(1+x^2) + C\\)",
      },
      practiceSet: [
        { prompt: "In \\(\\int x e^x\\,dx\\), what is \\(u\\) by LIATE?", answer: "\\(u = x\\) (Algebraic before Exponential)" },
        { prompt: "\\(\\int x e^x\\,dx\\)", answer: "\\((x-1)e^x + C\\)" },
        { prompt: "\\(\\int \\tan^{-1}x\\,dx\\)", answer: "\\(x\\tan^{-1}x - \\tfrac12\\log(1+x^2) + C\\)" },
        { prompt: "\\(\\int x\\cos x\\,dx\\)", answer: "\\(x\\sin x + \\cos x + C\\)" },
      ],
      pyqExampleId: "4e4b9c8f-5708-4499-84f0-b3d8bd279756",
      traps: [
        {
          title: "A lone log or inverse-trig still uses parts",
          body:
            "\\(\\int \\log x\\,dx\\) and \\(\\int \\tan^{-1}x\\,dx\\) look like single functions, but they are integrated by parts with \\(dv = dx,\\ v = x\\). There is no direct formula.",
        },
      ],
    },

    // 2 — cyclic
    {
      kind: "formula" as const,
      slug: "cyclic-by-parts",
      name: "Cyclic Integrals (Return-to-Self)",
      intuition:
        "For \\(\\int e^{ax}\\sin bx\\,dx\\) and \\(\\int \\sin(\\log x)\\,dx\\), applying parts twice brings back the ORIGINAL integral. Move it to the left side and solve algebraically — no third round needed.",
      definition:
        "Apply integration by parts twice. The same integral \\(I\\) reappears on the right with a coefficient; collect it: \\(I = (\\text{boundary terms}) + kI\\Rightarrow I(1-k) = \\text{terms}\\). " +
        "For \\(\\int \\sin(\\log x)\\,dx\\), the substitution \\(x = e^t\\) turns it into \\(\\int e^t \\sin t\\,dt\\), the classic cyclic form.",
      formula: {
        label: "The cyclic result",
        latex: "\\int e^{ax}\\sin bx\\,dx = \\dfrac{e^{ax}(a\\sin bx - b\\cos bx)}{a^2 + b^2} + C",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\displaystyle\\int \\sin(\\log x)\\,dx\\).",
        steps: [
          "Let \\(x = e^t\\) so \\(\\log x = t\\) and \\(dx = e^t\\,dt\\): the integral becomes \\(\\int e^t \\sin t\\,dt\\).",
          "Apply parts twice (or use the cyclic formula with \\(a = b = 1\\)): \\(\\int e^t\\sin t\\,dt = \\dfrac{e^t(\\sin t - \\cos t)}{2}\\).",
          "Back-substitute \\(t = \\log x,\\ e^t = x\\).",
        ],
        answer: "\\(\\dfrac{x}{2}\\big[\\sin(\\log x) - \\cos(\\log x)\\big] + C\\)",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\displaystyle\\int \\cos(\\log x)\\,dx\\).",
        steps: [
          "Let \\(x = e^t\\): \\(\\int e^t \\cos t\\,dt\\).",
          "Cyclic formula with \\(a = b = 1\\): \\(\\dfrac{e^t(\\cos t + \\sin t)}{2}\\).",
          "Back-substitute.",
        ],
        answer: "\\(\\dfrac{x}{2}\\big[\\cos(\\log x) + \\sin(\\log x)\\big] + C\\)",
      },
      practiceSet: [
        { prompt: "\\(\\int e^x \\sin x\\,dx\\)", answer: "\\(\\dfrac{e^x(\\sin x - \\cos x)}{2} + C\\)" },
        { prompt: "\\(\\int e^x \\cos x\\,dx\\)", answer: "\\(\\dfrac{e^x(\\cos x + \\sin x)}{2} + C\\)" },
        { prompt: "Substitution for \\(\\int \\sin(\\log x)\\,dx\\)?", answer: "\\(x = e^t\\)" },
        { prompt: "After two by-parts rounds, the original integral I is solved by?", answer: "moving \\(kI\\) to the left and dividing" },
      ],
      pyqExampleId: "115dca59-7dc6-48ca-a5fd-8d7495aae59c",
      traps: [
        {
          title: "Stop after two rounds — don't loop forever",
          body:
            "The point of a cyclic integral is that the original \\(I\\) reappears after two rounds. Recognise it and solve algebraically; a third by-parts just sends you in circles.",
        },
      ],
    },

    // 3 — ex[f+f']
    {
      kind: "formula" as const,
      slug: "ex-f-plus-fprime",
      name: "The eˣ[f(x) + f'(x)] Family",
      intuition:
        "Whenever an integrand is \\(e^x\\) times 'some function plus its own derivative', the answer is just \\(e^x\\) times that function. Spotting the \\(f + f'\\) pattern collapses a scary integral to one line.",
      definition:
        "\\(\\displaystyle\\int e^x\\big[f(x) + f'(x)\\big]\\,dx = e^x f(x) + C\\). " +
        "The work is REWRITING the integrand into this shape — using identities so that one part is a function \\(f\\) and the rest is exactly its derivative \\(f'\\). " +
        "A close cousin: \\(\\displaystyle\\int e^x\\dfrac{1 + x\\log x}{x}\\)-style problems all reduce to spotting \\(f + f'\\).",
      formula: {
        label: "The eˣ[f + f'] shortcut",
        latex: "\\int e^x\\big[f(x) + f'(x)\\big]\\,dx = e^x f(x) + C",
        symbols: [
          { symbol: "f(x)", meaning: "the function whose value lands in the answer" },
          { symbol: "f'(x)", meaning: "its derivative — must be the other half of the bracket" },
        ],
      },
      authoredExample: {
        prompt: "Evaluate \\(\\displaystyle\\int e^x\\big(1 - \\cot x + \\cot^2 x\\big)\\,dx\\).",
        steps: [
          "Group using \\(1 + \\cot^2 x = \\csc^2 x\\): the bracket is \\(\\csc^2 x - \\cot x = -\\cot x + \\csc^2 x\\).",
          "Set \\(f(x) = -\\cot x\\). Then \\(f'(x) = \\csc^2 x\\). So the bracket is exactly \\(f(x) + f'(x)\\).",
          "Apply the shortcut: \\(\\int e^x[f + f']\\,dx = e^x f(x) = -e^x\\cot x + C\\).",
        ],
        answer: "\\(-e^x \\cot x + C\\)",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\displaystyle\\int e^x\\!\\left(\\dfrac{x - 1}{x^2}\\right)dx\\).",
        steps: [
          "Split the bracket: \\(\\dfrac{x-1}{x^2} = \\dfrac{1}{x} - \\dfrac{1}{x^2}\\).",
          "Set \\(f(x) = \\dfrac{1}{x}\\). Then \\(f'(x) = -\\dfrac{1}{x^2}\\), so the bracket is \\(f(x) + f'(x)\\).",
          "Apply the shortcut: \\(e^x f(x) = \\dfrac{e^x}{x} + C\\).",
        ],
        answer: "\\(\\dfrac{e^x}{x} + C\\)",
      },
      practiceSet: [
        { prompt: "\\(\\int e^x(\\sin x + \\cos x)\\,dx\\)", answer: "\\(e^x \\sin x + C\\)", method: "\\(f=\\sin x,\\ f'=\\cos x\\)" },
        { prompt: "\\(\\int e^x\\!\\left(\\tan x + \\sec^2 x\\right)dx\\)", answer: "\\(e^x \\tan x + C\\)" },
        { prompt: "\\(\\int e^x\\!\\left(\\dfrac1x - \\dfrac{1}{x^2}\\right)dx\\)", answer: "\\(\\dfrac{e^x}{x} + C\\)" },
        { prompt: "\\(\\int e^x(1 + x)\\,dx\\)", answer: "\\(x e^x + C\\)", method: "\\(f=x,\\ f'=1\\)" },
      ],
      pyqExampleId: "3c70c19c-5d18-42a7-9540-6310b6886b0a",
      traps: [
        {
          title: "Use identities to expose f + f'",
          body:
            "The bracket rarely arrives as a clean \\(f + f'\\). Apply identities first — e.g. \\(1 + \\cot^2 = \\csc^2\\) — so that one term is a function and the other is its exact derivative. Then the answer is immediate.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Substitution — the fallback when no product structure helps",
      href: "/notes/mht-cet-maths/indefinite-integration/substitution",
    },
  ],
};
