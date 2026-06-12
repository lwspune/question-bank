import type { SubtopicNote } from "@/app/notes/_types";

export const SUBSTITUTION_NOTE: SubtopicNote = {
  subtopicName:
    "Integration by Substitution — Algebraic, Trigonometric, and Composite Forms",
  title: "Integration by Substitution",
  oneLineDefinition:
    "Substitution is the reverse chain rule: rename an inner function as u so that its derivative is already sitting in the integrand, collapsing the integral to a standard form in u.",
  whyItMatters:
    "This is the single highest-yield method in the chapter — 17 PYQs, more than any other technique. " +
    "It splits into a few recognisable shapes: the f′(x)/f(x) → ln pattern, trig-identity reductions, rationalising a surd, and spotting a hidden derivative (xˣ, aˣ). " +
    "Master the reflex of asking 'is the derivative of some inner part already here?' and most of these become one-liners.",
  concepts: [
    // 1 — reverse chain rule (foundation)
    {
      kind: "formula" as const,
      slug: "sub-reverse-chain-rule",
      name: "Why Substitution Works — the Reverse Chain Rule",
      intuition:
        "The chain rule says the derivative of a composite carries an extra factor — the derivative of the inside. Substitution undoes exactly that: if the inside's derivative is already in the integrand, renaming the inside as u sweeps it all into a clean integral in u.",
      definition:
        "If you set \\(u = g(x)\\), then \\(du = g'(x)\\,dx\\). The method:\n" +
        "\\[\\int f\\big(g(x)\\big)\\,g'(x)\\,dx = \\int f(u)\\,du.\\]\n" +
        "**Procedure:** (1) choose \\(u\\) = the inner function; (2) compute \\(du = g'(x)\\,dx\\); (3) replace every \\(x\\)-piece so ONLY \\(u\\) remains; (4) integrate in \\(u\\); (5) substitute \\(x\\) back. If a stray \\(x\\) survives step 3, the choice of \\(u\\) was wrong.",
      formula: {
        label: "Substitution rule",
        latex: "\\int f\\big(g(x)\\big)\\,g'(x)\\,dx = \\int f(u)\\,du,\\quad u=g(x)",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\displaystyle\\int 2x\\,e^{x^2}\\,dx\\).",
        steps: [
          "Inner function: \\(u = x^2\\), so \\(du = 2x\\,dx\\) — and \\(2x\\,dx\\) is exactly present.",
          "Rewrite: \\(\\int e^{u}\\,du\\).",
          "Integrate and back-substitute \\(u = x^2\\).",
        ],
        answer: "\\(e^{x^2} + C\\)",
      },
      practiceSet: [
        {
          prompt: "Evaluate \\(\\displaystyle\\int \\cos(5x)\\,dx\\).",
          answer: "\\(\\dfrac{1}{5}\\sin(5x) + C\\)",
          method: "Substitute \\(u=5x\\), \\(du=5\\,dx\\): the integral is \\(\\tfrac15\\int\\cos u\\,du\\). The \\(\\tfrac15\\) comes from \\(dx=\\tfrac15 du\\).",
        },
        {
          prompt: "Evaluate \\(\\displaystyle\\int (2x+1)^7\\,dx\\).",
          answer: "\\(\\dfrac{(2x+1)^8}{16} + C\\)",
          method: "Let \\(u=2x+1\\), \\(du=2\\,dx\\): \\(\\tfrac12\\int u^7\\,du = \\tfrac12\\cdot\\tfrac{u^8}{8} = \\tfrac{u^8}{16}\\).",
        },
      ],
      traps: [
        {
          title: "Every x must disappear before you integrate in u",
          body:
            "After substituting, the integral must be purely in \\(u\\) and \\(du\\). A leftover \\(x\\) means \\(u\\) was chosen badly or a constant factor was mishandled — fix it before integrating.",
        },
      ],
    },

    // 2 — algebraic / composite substitution (PYQ e6a8ce7c)
    {
      kind: "formula" as const,
      slug: "sub-algebraic-composite",
      name: "Algebraic and Composite Substitutions",
      pyqExampleId: "e6a8ce7c-eea8-4ea4-aa57-878efcb6a94e",
      intuition:
        "When a power of some expression is multiplied by (a constant times) that expression's derivative, substitute the inner expression. This also covers the trick of integrating with respect to a new variable like x-squared.",
      definition:
        "Spot a function raised to a power times its derivative — e.g. \\(\\int (\\sin x)^3\\cos x\\,dx\\): set \\(u=\\sin x\\), \\(du=\\cos x\\,dx\\), giving \\(\\int u^3\\,du\\). " +
        "The same idea reframes the variable: 'integrate \\(f\\) with respect to \\(x^2\\)' means \\(\\int f\\,d(x^2)\\) — treat \\(t = x^2\\) as the variable and use \\(\\int t^n\\,dt\\) directly.",
      formula: {
        label: "Power-times-derivative shape",
        latex:
          "\\int \\big(g(x)\\big)^n\\,g'(x)\\,dx = \\dfrac{\\big(g(x)\\big)^{n+1}}{n+1} + C",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\displaystyle\\int \\cos^4 x\\,\\sin x\\,dx\\).",
        steps: [
          "Let \\(u = \\cos x\\), so \\(du = -\\sin x\\,dx\\), i.e. \\(\\sin x\\,dx = -du\\).",
          "Rewrite: \\(\\int u^4(-du) = -\\int u^4\\,du = -\\dfrac{u^5}{5}\\).",
          "Back-substitute \\(u=\\cos x\\).",
        ],
        answer: "\\(-\\dfrac{\\cos^5 x}{5} + C\\)",
      },
      traps: [
        {
          title: "Carry the sign from du",
          body:
            "With \\(u=\\cos x\\), \\(du=-\\sin x\\,dx\\) — the minus sign is part of the substitution. Dropping it flips the answer's sign, and the wrong-sign option is always offered.",
        },
      ],
    },

    // 3 — f'/f -> ln (PYQ 56e103c2)
    {
      kind: "formula" as const,
      slug: "sub-fprime-over-f",
      name: "The f-prime-over-f to Log Pattern",
      pyqExampleId: "56e103c2-53a7-4969-97fe-3fd2c02b34f2",
      intuition:
        "When the numerator is exactly the derivative of the denominator, the integral is the natural log of the denominator. Train your eye to test the top against the bottom's derivative before doing anything else.",
      definition:
        "The single most-tested substitution shape:\n" +
        "\\[\\int \\dfrac{f'(x)}{f(x)}\\,dx = \\ln|f(x)| + C.\\]\n" +
        "It is just \\(u=f(x)\\), \\(du=f'(x)\\,dx\\), giving \\(\\int \\tfrac{du}{u}\\). The disguise is usually in the numerator: differentiate the denominator mentally and check whether the numerator matches (up to a constant you can pull out).",
      formula: {
        label: "Log pattern",
        latex: "\\int \\dfrac{f'(x)}{f(x)}\\,dx = \\ln|f(x)| + C",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\displaystyle\\int \\dfrac{2x+1}{x^2+x+5}\\,dx\\).",
        steps: [
          "Differentiate the denominator: \\(\\dfrac{d}{dx}(x^2+x+5) = 2x+1\\).",
          "That is exactly the numerator, so the integrand is \\(\\dfrac{f'}{f}\\) with \\(f = x^2+x+5\\).",
          "Apply the pattern.",
        ],
        answer: "\\(\\ln|x^2+x+5| + C\\)",
      },
      practiceSet: [
        {
          prompt: "Evaluate \\(\\displaystyle\\int \\tan x\\,dx\\).",
          answer: "\\(\\ln|\\sec x| + C\\)",
          method: "\\(\\tan x=\\dfrac{\\sin x}{\\cos x}=\\dfrac{-(\\cos x)'}{\\cos x}\\): the \\(f'/f\\) pattern gives \\(-\\ln|\\cos x|=\\ln|\\sec x|\\).",
        },
        {
          prompt: "Evaluate \\(\\displaystyle\\int \\dfrac{2x}{x^2+1}\\,dx\\).",
          answer: "\\(\\ln(x^2+1) + C\\)",
          method: "Numerator \\(2x\\) is exactly \\((x^2+1)'\\): the \\(f'/f\\to\\ln|f|\\) pattern.",
        },
      ],
      traps: [
        {
          title: "Adjust by a constant, never by a variable",
          body:
            "If the numerator is \\(k\\) times \\(f'(x)\\) for a constant \\(k\\), pull \\(k\\) out. But if it differs by a FUNCTION of \\(x\\), the pattern does not apply — do not force it.",
        },
      ],
    },

    // 4 — trig-identity reductions (PYQ 9d1e2c15)
    {
      kind: "formula" as const,
      slug: "sub-trig-identity",
      name: "Trigonometric Substitutions and Identity Reductions",
      pyqExampleId: "9d1e2c15-a96c-4f92-bdce-bb48e2ecfe06",
      intuition:
        "A trig integrand that is not a standard form usually yields to one move: divide through by cos-squared to manufacture sec-squared (the derivative of tan), use a half-angle identity, or simplify a surd of a trig expression into a difference of sine and cosine.",
      definition:
        "Three recurring reductions:\n" +
        "- **Divide by \\(\\cos^2 x\\):** for \\(\\int \\dfrac{dx}{a^2\\sin^2 x + b^2\\cos^2 x}\\), divide top and bottom by \\(\\cos^2 x\\) to get \\(\\int \\dfrac{\\sec^2 x\\,dx}{a^2\\tan^2 x + b^2}\\), then substitute \\(t=\\tan x\\) (\\(dt=\\sec^2x\\,dx\\)) → an arctan form.\n" +
        "- **Half-angle:** \\(1-\\cos x = 2\\sin^2\\tfrac{x}{2}\\) and \\(1+\\cos x = 2\\cos^2\\tfrac{x}{2}\\) turn a fraction into a \\(\\csc^2\\) or \\(\\sec^2\\) you can integrate.\n" +
        "- **Surd identities:** \\(1 \\pm \\sin 2x = (\\sin x \\pm \\cos x)^2\\), so \\(\\sqrt{1-\\sin 2x} = |\\sin x - \\cos x|\\) becomes integrable. The simplification \\(\\sec x + \\tan x\\) inside an inverse-tan also collapses to \\(\\tan(\\tfrac{\\pi}{4}+\\tfrac{x}{2})\\).",
      formula: {
        label: "The divide-by-cos-squared move",
        latex:
          "\\int \\dfrac{dx}{a^2\\sin^2 x + b^2\\cos^2 x} = \\int \\dfrac{\\sec^2 x\\,dx}{a^2\\tan^2 x + b^2},\\ \\ t=\\tan x",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\displaystyle\\int \\dfrac{dx}{1+3\\cos^2 x}\\).",
        steps: [
          "Divide top and bottom by \\(\\cos^2 x\\): \\(\\int \\dfrac{\\sec^2 x\\,dx}{\\sec^2 x + 3}\\), and \\(\\sec^2 x = 1+\\tan^2 x\\), so the denominator is \\(\\tan^2 x + 4\\).",
          "Substitute \\(t=\\tan x\\), \\(dt=\\sec^2 x\\,dx\\): \\(\\int \\dfrac{dt}{t^2 + 4} = \\int\\dfrac{dt}{t^2+2^2}\\).",
          "Arctan form with \\(k=2\\), then \\(t=\\tan x\\) back.",
        ],
        answer: "\\(\\dfrac{1}{2}\\tan^{-1}\\!\\Big(\\dfrac{\\tan x}{2}\\Big) + C\\)",
      },
      traps: [
        {
          title: "A square root forces an absolute value",
          body:
            "\\(\\sqrt{(\\sin x - \\cos x)^2} = |\\sin x - \\cos x|\\), and the sign depends on the given range of \\(x\\). On \\(0<x<\\tfrac{\\pi}{4}\\), \\(\\cos x > \\sin x\\), so it equals \\(\\cos x - \\sin x\\) — read the interval before dropping the modulus.",
        },
      ],
    },

    // 5 — rationalisation (PYQ 0f3dcb59, set S8)
    {
      kind: "formula" as const,
      slug: "sub-rationalisation",
      name: "Rationalising a Surd Denominator",
      pyqExampleId: "0f3dcb59-2fbc-4272-be25-741c26eb225a",
      intuition:
        "A difference of two square roots in the denominator clears the moment you multiply by its conjugate — the difference of squares wipes out the surds and leaves a simple sum of powers to integrate.",
      definition:
        "For \\(\\displaystyle\\int \\dfrac{dx}{\\sqrt{x+a}-\\sqrt{x+b}}\\), multiply numerator and denominator by the conjugate \\(\\sqrt{x+a}+\\sqrt{x+b}\\). The denominator becomes \\((x+a)-(x+b) = a-b\\), a constant, leaving \\(\\dfrac{1}{a-b}\\int\\big(\\sqrt{x+a}+\\sqrt{x+b}\\big)\\,dx\\) — two power-rule integrals. Each \\(\\int (x+c)^{1/2}\\,dx = \\tfrac{2}{3}(x+c)^{3/2}\\).",
      formula: {
        label: "Conjugate clears the surd",
        latex:
          "\\dfrac{1}{\\sqrt{x+a}-\\sqrt{x+b}} = \\dfrac{\\sqrt{x+a}+\\sqrt{x+b}}{a-b}",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\displaystyle\\int \\dfrac{dx}{\\sqrt{x+3}-\\sqrt{x}}\\).",
        steps: [
          "Multiply by the conjugate: denominator \\(=(x+3)-x=3\\), so integrand \\(= \\dfrac{\\sqrt{x+3}+\\sqrt{x}}{3}\\).",
          "Integrate term by term: \\(\\int (x+3)^{1/2}dx = \\tfrac{2}{3}(x+3)^{3/2}\\), \\(\\int x^{1/2}dx = \\tfrac{2}{3}x^{3/2}\\).",
          "Multiply by \\(\\tfrac{1}{3}\\) and combine.",
        ],
        answer: "\\(\\dfrac{2}{9}(x+3)^{3/2} + \\dfrac{2}{9}x^{3/2} + C\\)",
      },
      traps: [
        {
          title: "Do not lose the 1 over (a minus b) factor",
          body:
            "After conjugating, the constant denominator \\(a-b\\) stays as a multiplier on the whole integral. Forgetting it scales every coefficient wrong — the classic error on \\(\\sqrt{x+1}-\\sqrt{x-1}\\) (where \\(a-b=2\\)).",
        },
      ],
    },

    // 6 — spot the hidden derivative: x^x, a^x (PYQ c13e6811)
    {
      kind: "formula" as const,
      slug: "sub-hidden-derivative",
      name: "Spotting a Hidden Derivative",
      pyqExampleId: "c13e6811-e6bf-442e-a695-92dc41d589bf",
      intuition:
        "The hardest substitutions hide the derivative of an unusual function inside the integrand — the derivative of x-to-the-x, or an exponential base whose derivative is itself times a constant. Recognise the derivative, name its parent as u, and the integral collapses.",
      definition:
        "Useful hidden derivatives:\n" +
        "- \\(\\dfrac{d}{dx}\\,x^x = x^x(1+\\ln x)\\). So \\(\\int (x^x)^2(1+\\ln x)\\,dx\\): set \\(u=x^x\\), \\(du = x^x(1+\\ln x)\\,dx\\), giving \\(\\int u\\,du = \\tfrac{u^2}{2}\\).\n" +
        "- \\(\\dfrac{d}{dx}\\,a^x = a^x\\ln a\\). For \\(\\int \\dfrac{dx}{a^x - 1}\\) or \\(\\int \\dfrac{dx}{a^x + a^{-x}}\\), multiply through by \\(a^x\\) and set \\(u=a^x\\) (\\(du = a^x\\ln a\\,dx\\)) to reach a rational or arctan form in \\(u\\).",
      formula: {
        label: "The x-to-the-x derivative",
        latex: "\\dfrac{d}{dx}\\,x^x = x^x(1+\\ln x)",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\displaystyle\\int \\dfrac{4^x}{4^{x}+1}\\,dx\\).",
        steps: [
          "Let \\(u = 4^x + 1\\), so \\(du = 4^x\\ln 4\\,dx\\), i.e. \\(4^x\\,dx = \\dfrac{du}{\\ln 4}\\).",
          "Rewrite: \\(\\dfrac{1}{\\ln 4}\\int \\dfrac{du}{u} = \\dfrac{1}{\\ln 4}\\ln|u|\\).",
          "Back-substitute \\(u = 4^x+1\\) (always positive).",
        ],
        answer: "\\(\\dfrac{1}{\\ln 4}\\ln\\big(4^x+1\\big) + C\\)",
      },
      traps: [
        {
          title: "x-to-the-x is neither a power nor an exponential",
          body:
            "\\(\\dfrac{d}{dx}x^x \\neq x\\cdot x^{x-1}\\) (power rule) and \\(\\neq x^x\\ln x\\) (exponential rule). Both the base and the exponent vary, so its derivative is \\(x^x(1+\\ln x)\\) — derived via logarithmic differentiation.",
        },
      ],
    },
  ],
};
