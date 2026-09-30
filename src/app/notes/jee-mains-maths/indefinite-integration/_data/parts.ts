import type { SubtopicNote } from "@/app/notes/_types";

export const PARTS_II_NOTE: SubtopicNote = {
  subtopicName: "Integration by Parts and Reverse Differentiation",
  title: "Integration by Parts and Reverse Differentiation",
  oneLineDefinition:
    "Integration by parts, the eˣ(f + f′) pattern, and integrands that are already the derivative of a product or a quotient.",
  whyItMatters:
    "Twelve PYQs, eleven of them multiple choice, and three from 2026. Three integrate by parts, repeatedly or as a reduction formula; four are eˣ(f + f′) in disguise, one of them after putting t = eᵘ; five are the derivative of a product or a quotient, found by guessing its shape and differentiating the guess. Three ideas cover the page.",
  concepts: [
    // C1 — by parts
    {
      kind: "formula" as const,
      slug: "jii-by-parts",
      name: "Integration by parts",
      intuition:
        "Parts trades one integral for another: differentiate one factor and integrate the other. Choose to differentiate the factor that gets simpler, such as a power of \\(x\\) or a log. For a polynomial times \\(\\sin x\\) or \\(e^x\\), repeat until the polynomial is gone. For high powers of \\(\\sec x\\) or \\(\\csc x\\), the original integral comes back, and you solve for it.",
      definition:
        "- \\(\\int u\\,dv=uv-\\int v\\,du\\). Take \\(u\\) in the order: inverse trig, log, algebraic, trig, exponential.\n" +
        "- A polynomial times \\(\\sin x\\), \\(\\cos x\\) or \\(e^x\\): repeat; the signs alternate.\n" +
        "- \\(\\int\\sec^nx\\,dx\\) or \\(\\int\\csc^nx\\,dx\\): take out \\(\\sec^2x\\) (or \\(\\csc^2x\\)), use parts, and solve for the integral that returns.\n" +
        "- \\(\\int\\csc x\\,dx=\\ln\\left|\\tan\\frac x2\\right|\\) and \\(\\int\\sec x\\,dx=\\ln|\\sec x+\\tan x|\\).",
      formula: {
        label: "Integration by parts",
        latex: "\\int u\\,dv=uv-\\int v\\,du",
      },
      authoredExample: {
        prompt: "Find \\(\\int x^2e^x\\,dx\\).",
        steps: [
          "Parts with \\(u=x^2\\): \\(x^2e^x-\\int2xe^x\\,dx\\).",
          "Again: \\(\\int2xe^x\\,dx=2xe^x-2e^x\\).",
        ],
        answer: "\\(e^x(x^2-2x+2)+C\\).",
      },
      selfCheckExample: {
        prompt: "Find \\(\\int\\sec^3x\\,dx\\).",
        steps: [
          "Parts with \\(u=\\sec x\\), \\(dv=\\sec^2x\\,dx\\): \\(I=\\sec x\\tan x-\\int\\sec x\\tan^2x\\,dx\\).",
          "\\(\\tan^2x=\\sec^2x-1\\), so \\(I=\\sec x\\tan x-I+\\ln|\\sec x+\\tan x|\\).",
        ],
        answer: "\\(\\frac12\\left(\\sec x\\tan x+\\ln|\\sec x+\\tan x|\\right)+C\\).",
      },
      practiceSet: [
        { prompt: "\\(\\int xe^x\\,dx\\)?", answer: "\\(e^x(x-1)+C\\)" },
        { prompt: "\\(\\int\\ln x\\,dx\\)?", answer: "\\(x\\ln x-x+C\\)" },
        { prompt: "\\(\\int x\\cos x\\,dx\\)?", answer: "\\(x\\sin x+\\cos x+C\\)" },
        { prompt: "\\(\\int\\tan^{-1}x\\,dx\\)?", answer: "\\(x\\tan^{-1}x-\\frac12\\ln(1+x^2)+C\\)" },
      ],
      pyqExampleId: "9bf49c63-b144-48a3-b08b-7647d85086be", // 2025 — parts three times on a cubic times sin x
      traps: [
        {
          title: "Signs alternate",
          body: "Repeated parts alternates the signs: \\(\\int x^2\\cos x\\,dx=x^2\\sin x+2x\\cos x-2\\sin x\\). One wrong sign changes every value computed from the answer.",
        },
      ],
    },

    // C2 — e^x (f + f')
    {
      kind: "formula" as const,
      slug: "jii-ex-f",
      name: "The pattern eˣ(f + f′)",
      intuition:
        "The derivative of \\(e^xf(x)\\) is \\(e^x(f+f')\\). So when \\(e^x\\) multiplies a bracket, look for a function and its derivative inside it. Fractions often hide the pattern: rewrite the top in terms of the bottom, and the two pieces appear. If the variable sits inside a log, put \\(t=e^u\\) first to bring out the \\(e^u\\).",
      definition:
        "- \\(\\int e^x\\left(f(x)+f'(x)\\right)dx=e^xf(x)+C\\).\n" +
        "- Split a fraction so one piece is the derivative of the other.\n" +
        "- A function of \\(\\ln t\\): put \\(t=e^u\\), \\(dt=e^u\\,du\\).\n" +
        "- More generally, \\(\\int e^{kx}\\left(kf+f'\\right)dx=e^{kx}f+C\\).",
      formula: {
        label: "The eˣ pattern",
        latex: "\\int e^{x}\\big(f(x)+f'(x)\\big)\\,dx=e^{x}f(x)+C",
      },
      authoredExample: {
        prompt: "Find \\(\\int e^x\\left(\\frac1x-\\frac1{x^2}\\right)dx\\).",
        steps: [
          "With \\(f=\\frac1x\\), \\(f'=-\\frac1{x^2}\\), so the bracket is \\(f+f'\\).",
        ],
        answer: "\\(\\frac{e^x}{x}+C\\).",
      },
      selfCheckExample: {
        prompt: "Find \\(\\int\\frac{(x+1)e^x}{(x+2)^2}\\,dx\\).",
        steps: [
          "\\(\\frac{x+1}{(x+2)^2}=\\frac{1}{x+2}-\\frac{1}{(x+2)^2}\\), and \\(\\left(\\frac1{x+2}\\right)'=-\\frac{1}{(x+2)^2}\\).",
        ],
        answer: "\\(\\frac{e^x}{x+2}+C\\).",
      },
      practiceSet: [
        { prompt: "\\(\\int e^x(\\sin x+\\cos x)\\,dx\\)?", answer: "\\(e^x\\sin x+C\\)" },
        { prompt: "\\(\\int e^x(\\tan x+\\sec^2x)\\,dx\\)?", answer: "\\(e^x\\tan x+C\\)" },
        { prompt: "\\(\\int e^x\\left(\\ln x+\\frac1x\\right)dx\\)?", answer: "\\(e^x\\ln x+C\\)" },
        { prompt: "\\(\\int e^{2x}(2\\sin x+\\cos x)\\,dx\\)?", answer: "\\(e^{2x}\\sin x+C\\)" },
      ],
      pyqExampleId: "e1939fca-884c-4109-b13e-4388ed622477", // 2026 — put t = e^u, then half-angle forms give f + f'
      traps: [
        {
          title: "Which piece is f",
          body: "In \\(e^x\\left(\\frac1x-\\frac1{x^2}\\right)\\), \\(f=\\frac1x\\), because its derivative is the other piece. Taking \\(f=-\\frac1{x^2}\\) needs \\(f'=\\frac2{x^3}\\), which is not there.",
        },
      ],
    },

    // C3 — spot a derivative
    {
      kind: "formula" as const,
      slug: "jii-spot-derivative",
      name: "Spotting a product or quotient derivative",
      intuition:
        "Some integrands are already a derivative, and the fastest route is to guess the answer and check it. A squared denominator suggests a quotient; a high power of \\(\\sin x\\) below the line suggests a reciprocal power one lower. Guess the shape, differentiate it, and compare every term. A guess is right only if the derivative matches the integrand exactly.",
      definition:
        "- \\((uv)'=u'v+uv'\\) and \\(\\left(\\frac uv\\right)'=\\frac{u'v-uv'}{v^2}\\).\n" +
        "- \\(\\frac{\\ldots}{\\sin^nx\\cos^mx}\\): try \\(\\frac{1}{\\sin^{n-1}x\\cos^{m-1}x}\\) or \\(\\frac{\\tan x}{\\sin^nx}\\).\n" +
        "- \\(e^{g(x)}\\) times a bracket: try \\(e^{g}h\\), whose derivative is \\(e^{g}(g'h+h')\\).\n" +
        "- \\(\\left(\\frac xa\\right)^x\\) has derivative \\(\\left(\\frac xa\\right)^x\\left(1+\\ln\\frac xa\\right)\\).",
      formula: {
        label: "Quotient in reverse",
        latex: "\\int\\frac{u'v-uv'}{v^2}\\,dx=\\frac{u}{v}+C",
      },
      authoredExample: {
        prompt: "Find \\(\\int\\frac{x\\cos x-\\sin x}{x^2}\\,dx\\).",
        steps: [
          "The squared denominator suggests a quotient over \\(x\\).",
          "\\(\\left(\\frac{\\sin x}{x}\\right)'=\\frac{x\\cos x-\\sin x}{x^2}\\), exactly the integrand.",
        ],
        answer: "\\(\\frac{\\sin x}{x}+C\\).",
      },
      selfCheckExample: {
        prompt: "Find \\(\\int e^{x^2}(2x^2+1)\\,dx\\).",
        steps: [
          "Try \\(xe^{x^2}\\): its derivative is \\(e^{x^2}+2x^2e^{x^2}\\).",
        ],
        answer: "\\(xe^{x^2}+C\\).",
      },
      practiceSet: [
        { prompt: "\\(\\int\\frac{\\sin x-x\\cos x}{\\sin^2x}\\,dx\\)?", answer: "\\(\\frac{x}{\\sin x}+C\\)" },
        { prompt: "\\(\\int\\frac{xe^x}{(1+x)^2}\\,dx\\)?", answer: "\\(\\frac{e^x}{1+x}+C\\)" },
        { prompt: "\\(\\int e^{\\sin x}(x\\cos x+1)\\,dx\\)?", answer: "\\(xe^{\\sin x}+C\\)" },
        { prompt: "\\(\\int x^x(1+\\ln x)\\,dx\\)?", answer: "\\(x^x+C\\)" },
      ],
      pyqExampleId: "8978ed86-9e4f-43dd-ae46-d5b35e9e40d4", // 2026 — the derivative of sec x csc^4 x
      traps: [
        {
          title: "Differentiate the guess",
          body: "A guess that is close is not an antiderivative. Differentiate it and compare term by term: \\(\\ln x\\) and \\(x-1\\) agree at \\(x=1\\) and nowhere else, so one cannot stand in for the other.",
        },
      ],
    },
  ],
};
