import type { SubtopicNote } from "@/app/notes/_types";

export const TRIG_II_NOTE: SubtopicNote = {
  subtopicName: "Trigonometric Integrals",
  title: "Trigonometric Integrals",
  oneLineDefinition:
    "Integrals of powers and combinations of sin x and cos x, turned into algebra by putting t equal to tan x, cot x, sin x, cos x or sin x ± cos x.",
  whyItMatters:
    "Nine PYQs, seven of them multiple choice, and one from 2026. Four divide through by a power of cos x or sin x so that only tan x or cot x is left; five substitute sin x, cos x or sin x ± cos x, often after a double-angle identity. Two ideas cover the page.",
  concepts: [
    // C1 — tan and cot
    {
      kind: "formula" as const,
      slug: "jii-tan-cot",
      name: "Everything in tan x or cot x",
      intuition:
        "When the powers of \\(\\sin x\\) and \\(\\cos x\\) add to a negative even number, divide through by a power of \\(\\cos x\\). What is left is a function of \\(\\tan x\\) times \\(\\sec^2x\\), and \\(\\sec^2x\\,dx\\) is \\(d(\\tan x)\\). The same move works for \\(a\\sin^2x+b\\cos^2x\\) in a denominator. Use \\(\\cot x\\) instead when the larger power is on \\(\\sin x\\).",
      definition:
        "- \\(\\sin^mx\\cos^nx\\) with \\(m+n\\) a negative even integer: write it through \\(\\tan x\\) and \\(\\sec^2x\\), or \\(\\cot x\\) and \\(\\csc^2x\\).\n" +
        "- \\(\\sec^2x=1+\\tan^2x\\) and \\(\\csc^2x=1+\\cot^2x\\) turn the leftover factors into powers of \\(t\\).\n" +
        "- \\(\\frac{1}{a\\sin^2x+b\\cos^2x}\\): divide top and bottom by \\(\\cos^2x\\) and put \\(t=\\tan x\\).\n" +
        "- With \\(t=\\cot x\\), \\(dt=-\\csc^2x\\,dx\\).",
      formula: {
        label: "Tan substitution",
        latex: "\\int\\frac{dx}{a^2\\sin^2x+b^2\\cos^2x}=\\frac1{ab}\\tan^{-1}\\left(\\frac{a\\tan x}{b}\\right)+C",
      },
      authoredExample: {
        prompt: "Find \\(\\int\\frac{dx}{\\sin x\\cos^3x}\\).",
        steps: [
          "\\(\\sin x\\cos^3x=\\tan x\\cos^4x\\), so the integrand is \\(\\frac{\\sec^4x}{\\tan x}\\).",
          "Put \\(t=\\tan x\\), \\(dt=\\sec^2x\\,dx\\): \\(\\int\\frac{1+t^2}{t}\\,dt=\\ln|t|+\\frac{t^2}2\\).",
        ],
        answer: "\\(\\ln|\\tan x|+\\frac12\\tan^2x+C\\).",
      },
      selfCheckExample: {
        prompt: "Find \\(\\int\\frac{dx}{1+3\\sin^2x}\\).",
        steps: [
          "Divide by \\(\\cos^2x\\): \\(\\frac{\\sec^2x}{\\sec^2x+3\\tan^2x}=\\frac{\\sec^2x}{1+4\\tan^2x}\\).",
          "Put \\(t=\\tan x\\): \\(\\int\\frac{dt}{1+4t^2}=\\frac12\\tan^{-1}2t\\).",
        ],
        answer: "\\(\\frac12\\tan^{-1}(2\\tan x)+C\\).",
      },
      practiceSet: [
        { prompt: "\\(\\int\\sec^2x\\tan^3x\\,dx\\)?", answer: "\\(\\frac14\\tan^4x+C\\)" },
        { prompt: "\\(\\int\\frac{dx}{\\sin^2x\\cos^2x}\\)?", answer: "\\(\\tan x-\\cot x+C\\)" },
        { prompt: "\\(\\int\\csc^2x\\cot^2x\\,dx\\)?", answer: "\\(-\\frac13\\cot^3x+C\\)" },
        { prompt: "\\(\\int\\sin^{-3/2}x\\cos^{-1/2}x\\,dx\\)?", answer: "\\(-2\\sqrt{\\cot x}+C\\)" },
      ],
      pyqExampleId: "075a5fed-179f-4723-acaa-f5d49d591855", // 2026 — fractional powers adding to -8, through cot x
      traps: [
        {
          title: "Cot brings a minus sign",
          body: "With \\(t=\\cot x\\), \\(dt=-\\csc^2x\\,dx\\). Every term of the answer changes sign; dropping the minus gives each coefficient the wrong sign.",
        },
      ],
    },

    // C2 — sin, cos, sin ± cos
    {
      kind: "formula" as const,
      slug: "jii-sin-cos",
      name: "Substituting sin x, cos x or sin x ± cos x",
      intuition:
        "If the integrand has a lone \\(\\cos x\\,dx\\), put \\(t=\\sin x\\); if it has a lone \\(\\sin x\\,dx\\), put \\(t=\\cos x\\). If the top is \\(\\cos x\\pm\\sin x\\), it is the derivative of \\(\\sin x\\mp\\cos x\\), and \\(\\sin2x\\) is a square of that sum or difference, less or plus 1. Rewrite double angles through single ones first so the right factor shows.",
      definition:
        "- An odd power of \\(\\cos x\\): put \\(t=\\sin x\\). An odd power of \\(\\sin x\\): put \\(t=\\cos x\\).\n" +
        "- Top \\(\\cos x-\\sin x\\): put \\(t=\\sin x+\\cos x\\), and \\(\\sin2x=t^2-1\\).\n" +
        "- Top \\(\\cos x+\\sin x\\): put \\(t=\\sin x-\\cos x\\), and \\(\\sin2x=1-t^2\\).\n" +
        "- Double angles first: \\(1-\\cos2x=2\\sin^2x\\), \\(\\sin2x=2\\sin x\\cos x\\).",
      formula: {
        label: "Sum substitution",
        latex: "(\\sin x\\pm\\cos x)^2=1\\pm\\sin2x",
      },
      authoredExample: {
        prompt: "Find \\(\\int\\frac{\\sin x+\\cos x}{3+\\sin2x}\\,dx\\).",
        steps: [
          "Put \\(t=\\sin x-\\cos x\\), so \\(dt=(\\cos x+\\sin x)\\,dx\\) and \\(\\sin2x=1-t^2\\).",
          "\\(\\int\\frac{dt}{4-t^2}=\\frac14\\ln\\left|\\frac{2+t}{2-t}\\right|\\).",
        ],
        answer: "\\(\\frac14\\ln\\left|\\frac{2+\\sin x-\\cos x}{2-\\sin x+\\cos x}\\right|+C\\).",
      },
      selfCheckExample: {
        prompt: "Find \\(\\int\\sin^3x\\cos^2x\\,dx\\).",
        steps: [
          "Put \\(t=\\cos x\\), \\(dt=-\\sin x\\,dx\\), and \\(\\sin^2x=1-t^2\\).",
          "\\(-\\int(1-t^2)t^2\\,dt=\\frac{t^5}5-\\frac{t^3}3\\).",
        ],
        answer: "\\(\\frac15\\cos^5x-\\frac13\\cos^3x+C\\).",
      },
      practiceSet: [
        { prompt: "\\(\\int\\cos^3x\\,dx\\)?", answer: "\\(\\sin x-\\frac13\\sin^3x+C\\)" },
        { prompt: "\\(\\int\\frac{\\cos x-\\sin x}{\\sin x+\\cos x}\\,dx\\)?", answer: "\\(\\ln|\\sin x+\\cos x|+C\\)" },
        { prompt: "\\(t=\\sin x-\\cos x\\). Write \\(\\sin2x\\) in \\(t\\).", answer: "\\(1-t^2\\)" },
        { prompt: "\\(\\int\\frac{\\sin x\\cos x}{1+\\sin^2x}\\,dx\\)?", answer: "\\(\\frac12\\ln(1+\\sin^2x)+C\\)" },
      ],
      pyqExampleId: "1d573beb-b744-4364-a746-5e1cb8b77842", // 2024 — multiply through, then t = sin x
      traps: [
        {
          title: "Pick t by the top",
          body: "For \\(\\cos x-\\sin x\\) on top, put \\(t=\\sin x+\\cos x\\); for \\(\\cos x+\\sin x\\), put \\(t=\\sin x-\\cos x\\). The other choice leaves no \\(dt\\).",
        },
      ],
    },
  ],
};
