import type { SubtopicNote } from "@/app/notes/_types";

export const SUBSTITUTION_NOTE: SubtopicNote = {
  subtopicName: "Integration by Substitution",
  title: "Integration by Substitution — the Workhorse Method",
  oneLineDefinition:
    "Spot an inner function whose derivative also appears in the integrand, substitute to rename it, and the integral collapses to a standard form.",
  whyItMatters:
    "44 PYQs — by far the largest bucket in the chapter, and the method every other technique falls back on. " +
    "The single most-tested pattern is f'(x)/f(x) → log|f(x)|. Beyond that: powers of a function times its derivative, root substitutions, and exponential substitutions. " +
    "Difficulty is steep here (about 60% HARD), but every one of them reduces to 'find u, find du, rewrite, integrate'.",
  concepts: [
    // 1 — u-sub basics
    {
      kind: "formula" as const,
      slug: "u-substitution-basics",
      name: "The Substitution Rule",
      intuition:
        "If the integrand contains some inner function \\(g(x)\\) AND a factor that looks like its derivative \\(g'(x)\\), substitute \\(u = g(x)\\). The \\(g'(x)\\,dx\\) becomes \\(du\\), and the whole integral turns into something standard in \\(u\\).",
      definition:
        "If \\(u = g(x)\\), then \\(du = g'(x)\\,dx\\), and " +
        "\\(\\int f(g(x))\\,g'(x)\\,dx = \\int f(u)\\,du\\). " +
        "The art is choosing \\(g(x)\\) so that its derivative is already present (up to a constant) in the integrand.",
      formula: {
        label: "Substitution rule",
        latex: "\\int f(g(x))\\,g'(x)\\,dx = \\int f(u)\\,du,\\quad u = g(x)",
        symbols: [
          { symbol: "u = g(x)", meaning: "the inner function you rename" },
          { symbol: "du = g'(x)\\,dx", meaning: "its differential, which must appear in the integrand" },
        ],
      },
      authoredExample: {
        prompt: "Evaluate \\(\\displaystyle\\int \\dfrac{\\tan(1/x)}{x^2}\\,dx\\).",
        steps: [
          "Let \\(u = \\dfrac{1}{x}\\). Then \\(du = -\\dfrac{1}{x^2}\\,dx\\), so \\(\\dfrac{dx}{x^2} = -\\,du\\).",
          "Rewrite: \\(\\int \\tan u \\,(-du) = -\\int \\tan u\\,du\\).",
          "Standard form: \\(-\\log|\\sec u| + C = \\log|\\cos u| + C\\).",
          "Back-substitute \\(u = 1/x\\).",
        ],
        answer: "\\(\\log\\left|\\cos\\dfrac{1}{x}\\right| + C\\)",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\displaystyle\\int \\dfrac{(\\log x)^2}{x}\\,dx\\).",
        steps: [
          "Let \\(u = \\log x\\). Then \\(du = \\dfrac{1}{x}\\,dx\\).",
          "Rewrite: \\(\\int u^2\\,du = \\dfrac{u^3}{3} + C\\).",
          "Back-substitute.",
        ],
        answer: "\\(\\dfrac{(\\log x)^3}{3} + C\\)",
      },
      practiceSet: [
        { prompt: "\\(\\int 2x\\,e^{x^2}\\,dx\\)", answer: "\\(e^{x^2} + C\\)", method: "\\(u = x^2\\)" },
        { prompt: "\\(\\int \\cos x\\,e^{\\sin x}\\,dx\\)", answer: "\\(e^{\\sin x} + C\\)", method: "\\(u = \\sin x\\)" },
        { prompt: "\\(\\int \\dfrac{(\\log x)}{x}\\,dx\\)", answer: "\\(\\dfrac{(\\log x)^2}{2} + C\\)", method: "\\(u = \\log x\\)" },
        { prompt: "\\(\\int \\sin x\\,\\cos x\\,dx\\)", answer: "\\(\\dfrac{\\sin^2 x}{2} + C\\)", method: "\\(u = \\sin x\\)" },
      ],
      pyqExampleId: "1379296d-474f-4777-a25d-eb9508efecb3",
      traps: [
        {
          title: "Adjust for the missing constant",
          body:
            "If \\(du = g'(x)\\,dx\\) appears up to a numeric factor (e.g. you have \\(x\\,dx\\) but \\(du = 2x\\,dx\\)), pull the constant out: \\(x\\,dx = \\tfrac12\\,du\\). Forgetting the \\(\\tfrac12\\) is the most common slip.",
        },
      ],
    },

    // 2 — f'/f log
    {
      kind: "formula" as const,
      slug: "f-prime-over-f-log",
      name: "The f'(x)/f(x) → log Pattern",
      intuition:
        "Whenever the numerator is exactly the derivative of the denominator, the integral is just \\(\\log\\) of the denominator. This is the single highest-yield pattern in the chapter — train your eye to spot 'top = derivative of bottom'.",
      definition:
        "If the integrand is a fraction whose numerator is the derivative of its denominator, then " +
        "\\(\\int \\dfrac{f'(x)}{f(x)}\\,dx = \\log|f(x)| + C\\). " +
        "Often you must engineer the numerator: split it into 'a constant times \\(f'(x)\\)' plus a leftover, then integrate each piece.",
      formula: {
        label: "Logarithmic integral",
        latex: "\\int \\dfrac{f'(x)}{f(x)}\\,dx = \\log|f(x)| + C",
        symbols: [
          { symbol: "f(x)", meaning: "the denominator" },
          { symbol: "f'(x)", meaning: "its derivative — must equal the numerator (up to a constant)" },
        ],
      },
      authoredExample: {
        prompt:
          "Evaluate \\(\\displaystyle\\int \\dfrac{4e^x - 25}{2e^x - 5}\\,dx = Ax + B\\log|2e^x - 5| + c\\) and find \\(A, B\\).",
        steps: [
          "Write the numerator as \\(A'(2e^x - 5) + B'(2e^x)\\) so each piece matches the denominator or its derivative \\((2e^x)\\).",
          "Match: \\(4e^x - 25 = 2(2e^x - 5) + (-15)\\). The \\(-15\\) must come from the \\(\\frac{d}{dx}\\) term: \\(\\dfrac{-15}{2}\\cdot\\dfrac{2e^x}{2e^x-5}\\)... instead split directly: \\(\\dfrac{4e^x-25}{2e^x-5} = 2 - \\dfrac{15}{2e^x-5}\\).",
          "For \\(\\int \\dfrac{dx}{2e^x-5}\\), write \\(\\dfrac{1}{2e^x-5} = \\dfrac{1}{5}\\!\\left(\\dfrac{2e^x - (2e^x-5)}{2e^x-5}\\right) = \\dfrac{1}{5}\\!\\left(\\dfrac{2e^x}{2e^x-5} - 1\\right)\\).",
          "Now \\(\\int \\dfrac{2e^x}{2e^x-5}\\,dx = \\log|2e^x-5|\\) (numerator = derivative of denominator). Combine all pieces.",
        ],
        answer: "\\(A = 5,\\ B = -3\\) (so the integral is \\(5x - 3\\log|2e^x-5| + c\\)).",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\displaystyle\\int \\dfrac{2x^3 - 1}{x^4 + x}\\,dx\\).",
        steps: [
          "Denominator \\(f = x^4 + x\\); its derivative is \\(f' = 4x^3 + 1\\).",
          "Hmm — numerator is \\(2x^3 - 1\\), not a clean multiple. Factor instead: \\(x^4 + x = x(x^3+1)\\) and split, OR note \\(\\dfrac{2x^3-1}{x^4+x}\\) can be matched as \\(\\tfrac12\\cdot\\dfrac{4x^3+...}{...}\\). Simplest: divide num and den by \\(x\\): \\(\\dfrac{2x^2 - 1/x}{x^3+1}\\) — not cleaner. Use the f'/f recognition on \\(x^4+x\\) after writing numerator \\(2x^3-1 = \\tfrac12(4x^3+1) - \\tfrac32\\).",
          "So \\(\\int \\dfrac{\\frac12(4x^3+1)}{x^4+x}\\,dx - \\int \\dfrac{3/2}{x^4+x}\\,dx = \\tfrac12\\log|x^4+x| - \\tfrac32\\int\\dfrac{dx}{x(x^3+1)}\\).",
        ],
        answer:
          "\\(\\tfrac12\\log|x^4 + x| - \\tfrac32\\displaystyle\\int\\dfrac{dx}{x(x^3+1)}\\) — the first term is the f'/f piece; the leftover goes to partial fractions.",
      },
      practiceSet: [
        { prompt: "\\(\\int \\dfrac{2x}{x^2+1}\\,dx\\)", answer: "\\(\\log(x^2+1) + C\\)", method: "top = derivative of bottom" },
        { prompt: "\\(\\int \\tan x\\,dx\\)", answer: "\\(\\log|\\sec x| + C\\)", method: "\\(\\int \\frac{\\sin x}{\\cos x} = -\\log|\\cos x|\\)" },
        { prompt: "\\(\\int \\dfrac{e^x}{e^x+1}\\,dx\\)", answer: "\\(\\log(e^x+1) + C\\)" },
        { prompt: "\\(\\int \\cot x\\,dx\\)", answer: "\\(\\log|\\sin x| + C\\)", method: "\\(\\int \\frac{\\cos x}{\\sin x}\\)" },
      ],
      pyqExampleId: "9d663910-ba13-4200-b704-8295c5d319f2",
      traps: [
        {
          title: "Engineer the numerator into f'(x) + leftover",
          body:
            "Rarely is the top exactly \\(f'(x)\\). Write it as 'constant \\(\\times f'(x)\\) + remainder', send the first piece to a clean log, and handle the remainder separately. The whole-number coefficient comes from matching.",
        },
      ],
    },

    // 3 — power of function
    {
      kind: "formula" as const,
      slug: "power-of-a-function",
      name: "Power of a Function times its Derivative",
      intuition:
        "When you see some function raised to a power, multiplied by (a constant times) its derivative, substitution turns it into the plain power rule. The denominator-squared shapes \\(\\int f'/f^2\\) are the same idea with a negative power.",
      definition:
        "If \\(u = f(x)\\) then \\(\\int [f(x)]^n\\,f'(x)\\,dx = \\dfrac{[f(x)]^{n+1}}{n+1} + C\\) for \\(n \\neq -1\\) " +
        "(and the \\(n = -1\\) case is the log pattern). The shape \\(\\displaystyle\\int \\dfrac{f'(x)}{[f(x)]^2}\\,dx = -\\dfrac{1}{f(x)} + C\\) is the \\(n = -2\\) instance.",
      formula: {
        label: "Power-of-a-function rule",
        latex: "\\int [f(x)]^n\\,f'(x)\\,dx = \\dfrac{[f(x)]^{n+1}}{n+1} + C \\quad (n \\neq -1)",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\displaystyle\\int \\dfrac{2 + \\cos x}{(2x + \\sin x)^2}\\,dx\\).",
        steps: [
          "Let \\(u = 2x + \\sin x\\). Then \\(du = (2 + \\cos x)\\,dx\\) — exactly the numerator.",
          "Rewrite: \\(\\int \\dfrac{du}{u^2} = \\int u^{-2}\\,du = -u^{-1} + C\\).",
          "Back-substitute.",
        ],
        answer: "\\(-\\dfrac{1}{2x + \\sin x} + C\\)",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\displaystyle\\int (x^2+1)^3\\,(2x)\\,dx\\).",
        steps: [
          "Let \\(u = x^2 + 1\\), \\(du = 2x\\,dx\\).",
          "\\(\\int u^3\\,du = \\dfrac{u^4}{4} + C\\).",
        ],
        answer: "\\(\\dfrac{(x^2+1)^4}{4} + C\\)",
      },
      practiceSet: [
        { prompt: "\\(\\int (1+x^2)^4\\,2x\\,dx\\)", answer: "\\(\\dfrac{(1+x^2)^5}{5} + C\\)" },
        { prompt: "\\(\\int \\dfrac{\\sec^2 x}{\\tan^2 x}\\,dx\\)", answer: "\\(-\\dfrac{1}{\\tan x} + C\\)", method: "\\(u=\\tan x,\\ n=-2\\)" },
        { prompt: "\\(\\int \\sin^3 x\\,\\cos x\\,dx\\)", answer: "\\(\\dfrac{\\sin^4 x}{4} + C\\)", method: "\\(u=\\sin x\\)" },
        { prompt: "\\(\\int \\dfrac{\\cos x}{\\sin^2 x}\\,dx\\)", answer: "\\(-\\dfrac{1}{\\sin x} + C\\)" },
      ],
      pyqExampleId: "74ca7af4-2b6e-4509-b88d-48353426993a",
      traps: [
        {
          title: "n = −1 is NOT this rule",
          body:
            "If the power is \\(-1\\) (i.e. \\(\\int f'/f\\)), the power rule blows up. That case is the log pattern. Every other integer/fraction power uses \\(\\dfrac{u^{n+1}}{n+1}\\).",
        },
      ],
    },

    // 4 — root substitutions
    {
      kind: "formula" as const,
      slug: "root-substitutions",
      name: "Root and Linear-Radical Substitutions",
      intuition:
        "A square root of a linear (or simple) expression is cleared by substituting the root itself, or the inside of the root, as \\(u\\). The substitution removes the radical and leaves a polynomial or standard form.",
      definition:
        "For integrals containing \\(\\sqrt{ax+b}\\), substitute \\(t = \\sqrt{ax+b}\\) (so \\(x\\) and \\(dx\\) are expressed via \\(t\\)), or substitute \\(u = ax+b\\). " +
        "For \\(\\sqrt{x}\\) shapes, \\(t = \\sqrt{x}\\) gives \\(x = t^2,\\ dx = 2t\\,dt\\). The radical disappears and the integrand becomes rational/polynomial in \\(t\\).",
      formula: {
        label: "Linear-radical substitution",
        latex: "t = \\sqrt{ax+b}\\ \\Rightarrow\\ x = \\dfrac{t^2 - b}{a},\\quad dx = \\dfrac{2t}{a}\\,dt",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\displaystyle\\int \\dfrac{\\sqrt{x}}{x+1}\\,dx\\).",
        steps: [
          "Let \\(t = \\sqrt{x}\\), so \\(x = t^2\\) and \\(dx = 2t\\,dt\\).",
          "Rewrite: \\(\\int \\dfrac{t}{t^2+1}\\,(2t\\,dt) = 2\\int \\dfrac{t^2}{t^2+1}\\,dt = 2\\int\\!\\left(1 - \\dfrac{1}{t^2+1}\\right)dt\\).",
          "Integrate: \\(2\\big(t - \\tan^{-1}t\\big) + C\\).",
          "Back-substitute \\(t = \\sqrt{x}\\).",
        ],
        answer: "\\(2\\sqrt{x} - 2\\tan^{-1}\\!\\sqrt{x} + C\\)",
      },
      selfCheckExample: {
        prompt:
          "If \\(\\displaystyle\\int (2x+4)\\sqrt{x-1}\\,dx = a(x-1)^{5/2} + b(x-1)^{3/2} + c\\), find \\(a + b\\).",
        steps: [
          "Let \\(u = x - 1\\), \\(x = u+1\\), \\(dx = du\\). Then \\(2x + 4 = 2u + 6\\).",
          "Integral becomes \\(\\int (2u+6)\\sqrt{u}\\,du = \\int (2u^{3/2} + 6u^{1/2})\\,du = \\dfrac{4}{5}u^{5/2} + 4u^{3/2} + c\\).",
          "So \\(a = \\dfrac{4}{5},\\ b = 4\\).",
        ],
        answer: "\\(a + b = \\dfrac{4}{5} + 4 = \\dfrac{24}{5}\\)",
      },
      practiceSet: [
        { prompt: "\\(\\int \\dfrac{dx}{\\sqrt{x}+1}\\) — substitution?", answer: "\\(t = \\sqrt{x}\\)", method: "\\(x=t^2,\\ dx=2t\\,dt\\)" },
        { prompt: "\\(\\int \\sqrt{2x+1}\\,dx\\)", answer: "\\(\\dfrac{(2x+1)^{3/2}}{3} + C\\)", method: "\\(u=2x+1\\)" },
        { prompt: "\\(\\int x\\sqrt{x-1}\\,dx\\) — substitution?", answer: "\\(u = x-1\\)", method: "then \\(x = u+1\\)" },
        { prompt: "\\(\\int \\dfrac{dx}{\\sqrt{x+3}}\\)", answer: "\\(2\\sqrt{x+3} + C\\)" },
      ],
      pyqExampleId: "11b4a255-c7c9-409f-926c-21aa1129fecb",
      traps: [
        {
          title: "Re-express EVERY x, including dx",
          body:
            "After \\(t = \\sqrt{x}\\), both the integrand AND \\(dx = 2t\\,dt\\) must be rewritten. Leaving a stray \\(x\\) or the old \\(dx\\) behind is the classic substitution error.",
        },
      ],
    },

    // 5 — exponential / special subs
    {
      kind: "formula" as const,
      slug: "exponential-and-special-subs",
      name: "Exponential and Special Substitutions",
      intuition:
        "When an exponential is buried inside a root or a tower of exponents, substitute the exponential itself. \\(t = e^x\\) (so \\(dt = e^x dx\\)) clears most \\(e^x\\) integrals; nested towers like \\(3^{3^x}\\) substitute the inner power.",
      definition:
        "For integrands built from \\(e^x\\): substitute \\(t = e^x\\), giving \\(dt = e^x\\,dx\\); a stray \\(e^x\\) in the numerator becomes \\(dt\\) and the rest becomes rational in \\(t\\). " +
        "For exponential towers \\(\\int a^{a^x}\\,a^x\\,dx\\), substitute \\(u = a^x\\) (then \\(du = a^x \\log a\\,dx\\)).",
      formula: {
        label: "Exponential substitution",
        latex: "t = e^{x}\\ \\Rightarrow\\ dt = e^{x}\\,dx",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\displaystyle\\int \\sqrt{e^x - 1}\\,dx\\).",
        steps: [
          "Let \\(t = \\sqrt{e^x - 1}\\), so \\(t^2 = e^x - 1\\) and \\(e^x = t^2 + 1\\).",
          "Differentiate: \\(2t\\,dt = e^x\\,dx = (t^2+1)\\,dx\\), so \\(dx = \\dfrac{2t}{t^2+1}\\,dt\\).",
          "Rewrite: \\(\\int t\\cdot\\dfrac{2t}{t^2+1}\\,dt = 2\\int\\!\\left(1 - \\dfrac{1}{t^2+1}\\right)dt = 2\\big(t - \\tan^{-1}t\\big) + C\\).",
          "Back-substitute \\(t = \\sqrt{e^x-1}\\).",
        ],
        answer: "\\(2\\sqrt{e^x - 1} - 2\\tan^{-1}\\!\\sqrt{e^x - 1} + C\\)",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\displaystyle\\int 3^{3^x}\\cdot 3^x\\,dx\\).",
        steps: [
          "Let \\(u = 3^x\\), so \\(du = 3^x \\log 3\\,dx\\), i.e. \\(3^x\\,dx = \\dfrac{du}{\\log 3}\\).",
          "Integral becomes \\(\\dfrac{1}{\\log 3}\\int 3^{u}\\,du = \\dfrac{1}{\\log 3}\\cdot\\dfrac{3^u}{\\log 3}\\).",
          "Back-substitute \\(u = 3^x\\).",
        ],
        answer: "\\(\\dfrac{3^{3^x}}{(\\log 3)^2} + C\\)",
      },
      practiceSet: [
        { prompt: "\\(\\int \\dfrac{e^x}{e^x+1}\\,dx\\)", answer: "\\(\\log(e^x+1)+C\\)", method: "\\(t=e^x+1\\)" },
        { prompt: "\\(\\int e^x(1+e^x)^3\\,dx\\)", answer: "\\(\\dfrac{(1+e^x)^4}{4} + C\\)", method: "\\(t=1+e^x\\)" },
        { prompt: "\\(\\int 2^{2^x}\\,2^x\\,dx\\)", answer: "\\(\\dfrac{2^{2^x}}{(\\log 2)^2} + C\\)" },
        { prompt: "\\(\\int \\dfrac{dx}{1+e^{-x}}\\)", answer: "\\(\\log(e^x+1) + C\\)", method: "multiply by \\(e^x/e^x\\)" },
      ],
      pyqExampleId: "a6c80734-e6c6-4484-b884-a47e1b289760",
      traps: [
        {
          title: "Towers: substitute the INNER exponential",
          body:
            "For \\(\\int a^{a^x} a^x\\,dx\\), the right substitution is \\(u = a^x\\), not \\(u = a^{a^x}\\). The stray \\(a^x\\,dx\\) is what becomes \\(du\\) (up to \\(\\log a\\)).",
        },
      ],
    },
  ],
  related: [
    {
      label: "Trigonometric Integrals II — substitution into rational-in-sin/cos forms",
      href: "/notes/mht-cet-maths/indefinite-integration/trigonometric-integrals-rational",
    },
    {
      label: "Rational Functions & Partial Fractions — where the f'/f leftover goes",
      href: "/notes/mht-cet-maths/indefinite-integration/rational-and-partial-fractions",
    },
  ],
};
