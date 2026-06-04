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
        prompt: "Evaluate \\(\\displaystyle\\int \\dfrac{\\sin(1/x)}{x^2}\\,dx\\).",
        steps: [
          "Let \\(u = \\dfrac{1}{x}\\). Then \\(du = -\\dfrac{1}{x^2}\\,dx\\), so \\(\\dfrac{dx}{x^2} = -\\,du\\).",
          "Rewrite: \\(\\int \\sin u \\,(-du) = -\\int \\sin u\\,du\\).",
          "Standard form: \\(-(-\\cos u) + C = \\cos u + C\\).",
          "Back-substitute \\(u = 1/x\\).",
        ],
        answer: "\\(\\cos\\dfrac{1}{x} + C\\)",
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
          "Evaluate \\(\\displaystyle\\int \\dfrac{2x + 3}{x^2 + 3x + 5}\\,dx\\).",
        steps: [
          "The denominator is \\(f = x^2 + 3x + 5\\); its derivative is \\(f' = 2x + 3\\) — exactly the numerator.",
          "So the integrand has the form \\(f'/f\\), which integrates to \\(\\log|f|\\).",
          "\\(\\int \\dfrac{2x+3}{x^2+3x+5}\\,dx = \\log|x^2+3x+5| + C\\).",
        ],
        answer: "\\(\\log|x^2 + 3x + 5| + C\\)",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\displaystyle\\int \\dfrac{3x^2 + 2x}{x^3 + x^2 + 1}\\,dx\\).",
        steps: [
          "Denominator \\(f = x^3 + x^2 + 1\\); its derivative \\(f' = 3x^2 + 2x\\) is exactly the numerator.",
          "So \\(\\int \\dfrac{f'}{f}\\,dx = \\log|x^3 + x^2 + 1| + C\\).",
        ],
        answer: "\\(\\log|x^3 + x^2 + 1| + C\\)",
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
        prompt: "Evaluate \\(\\displaystyle\\int (x^3 + 2x + 1)^4\\,(3x^2 + 2)\\,dx\\).",
        steps: [
          "Let \\(u = x^3 + 2x + 1\\). Then \\(du = (3x^2 + 2)\\,dx\\) — exactly the second factor.",
          "Rewrite: \\(\\int u^4\\,du = \\dfrac{u^5}{5} + C\\).",
          "Back-substitute.",
        ],
        answer: "\\(\\dfrac{(x^3 + 2x + 1)^5}{5} + C\\)",
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
        prompt: "Evaluate \\(\\displaystyle\\int \\dfrac{1}{1 + \\sqrt{x}}\\,dx\\).",
        steps: [
          "Let \\(t = \\sqrt{x}\\), so \\(x = t^2\\) and \\(dx = 2t\\,dt\\).",
          "Rewrite: \\(\\int \\dfrac{1}{1+t}\\,(2t\\,dt) = 2\\int \\dfrac{t}{1+t}\\,dt = 2\\int\\!\\left(1 - \\dfrac{1}{1+t}\\right)dt\\).",
          "Integrate: \\(2\\big(t - \\log|1+t|\\big) + C\\).",
          "Back-substitute \\(t = \\sqrt{x}\\).",
        ],
        answer: "\\(2\\sqrt{x} - 2\\log\\!\\left|1 + \\sqrt{x}\\right| + C\\)",
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

    // 5 — reciprocal / take-out-the-power substitutions (the HARD signature)
    {
      kind: "formula" as const,
      slug: "reciprocal-power-substitution",
      name: "Reciprocal and Take-out-the-Power Substitutions",
      intuition:
        "When \\(x\\) is trapped inside high powers or a root, divide through by a power of \\(x\\) (or factor the dominant power out of the root). What's left is a reciprocal combination like \\(1+x^{-4}\\) or \\(x\\pm\\dfrac{k}{x}\\) whose derivative is sitting right there in the numerator — substitute it and the mess collapses. This is the chapter's single most-repeated HARD substitution.",
      definition:
        "Two faces of the same idea:\n" +
        "- **Take-out-the-power**: for \\(\\displaystyle\\int \\dfrac{dx}{x^2(x^4+1)^{3/4}}\\)-type integrals, pull the dominant power out of the root — \\((x^4+1)^{3/4}=x^3(1+x^{-4})^{3/4}\\) — then substitute \\(u = 1 + x^{-4}\\).\n" +
        "- **Reciprocal \\(t = x \\pm \\dfrac{k}{x}\\)**: for a denominator quadratic in \\(x^2\\) with a matching numerator, divide top and bottom by \\(x^2\\). Then \\(\\dfrac{d}{dx}\\!\\left(x\\mp\\dfrac{k}{x}\\right) = 1\\pm\\dfrac{k}{x^2}\\) is exactly the new numerator, and the integral becomes a standard \\(t^2+1\\) arctan (or a clean power).",
      formula: {
        label: "The reciprocal substitution",
        latex: "t = x \\pm \\dfrac{k}{x} \\;\\Rightarrow\\; dt = \\left(1 \\mp \\dfrac{k}{x^2}\\right)dx",
        symbols: [
          { symbol: "\\pm k/x", meaning: "sign chosen so \\(dt\\) matches the numerator after dividing by \\(x^2\\)" },
        ],
      },
      authoredExample: {
        prompt: "Evaluate \\(\\displaystyle\\int \\dfrac{dx}{x^2(x^4+1)^{3/4}}\\).",
        steps: [
          "Take the dominant power out of the root: \\((x^4+1)^{3/4} = x^3\\,(1+x^{-4})^{3/4}\\).",
          "Integrand \\(= \\dfrac{1}{x^2\\cdot x^3(1+x^{-4})^{3/4}} = x^{-5}\\,(1+x^{-4})^{-3/4}\\).",
          "Let \\(u = 1 + x^{-4}\\), so \\(du = -4x^{-5}\\,dx\\), i.e. \\(x^{-5}\\,dx = -\\tfrac14\\,du\\).",
          "Integrate: \\(-\\tfrac14\\!\\int u^{-3/4}\\,du = -\\tfrac14\\cdot 4u^{1/4} = -u^{1/4}\\). Back-substitute.",
        ],
        answer: "\\(-\\dfrac{(x^4+1)^{1/4}}{x} + C\\)",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\displaystyle\\int \\dfrac{x^2-1}{x^3\\sqrt{2x^4-2x^2+1}}\\,dx\\).",
        steps: [
          "Take \\(x^4\\) out of the root: \\(\\sqrt{2x^4-2x^2+1} = x^2\\sqrt{2 - \\tfrac{2}{x^2} + \\tfrac{1}{x^4}}\\).",
          "Integrand \\(= \\dfrac{x^2-1}{x^3\\cdot x^2\\sqrt{\\,\\cdot\\,}} = \\dfrac{\\tfrac{1}{x^3}-\\tfrac{1}{x^5}}{\\sqrt{2 - \\tfrac{2}{x^2} + \\tfrac{1}{x^4}}}\\).",
          "Let \\(u = 2 - \\tfrac{2}{x^2} + \\tfrac{1}{x^4}\\); then \\(du = \\left(\\tfrac{4}{x^3} - \\tfrac{4}{x^5}\\right)dx\\), so the numerator \\(dx = \\tfrac14\\,du\\).",
          "Integrate: \\(\\tfrac14\\!\\int u^{-1/2}\\,du = \\tfrac14\\cdot 2\\sqrt{u} = \\tfrac12\\sqrt{u}\\).",
        ],
        answer: "\\(\\dfrac{\\sqrt{2x^4-2x^2+1}}{2x^2} + C\\)",
      },
      practiceSet: [
        { prompt: "In \\(\\int \\dfrac{dx}{x^2(x^4+1)^{3/4}}\\), what do you pull out of the root?", answer: "\\(x^4\\Rightarrow x^3(1+x^{-4})^{3/4}\\)" },
        { prompt: "Derivative of \\(x + \\dfrac{4}{x}\\)?", answer: "\\(1 - \\dfrac{4}{x^2}\\)", method: "the reciprocal-substitution signal" },
        { prompt: "\\(\\int \\dfrac{x^2-4}{x^4+9x^2+16}\\,dx\\) — which substitution?", answer: "\\(t = x + \\dfrac{4}{x}\\)", method: "divide N,D by \\(x^2\\); numerator \\(=1-4/x^2=t'\\)" },
        { prompt: "After \\(t = x + \\dfrac{4}{x}\\), \\(\\dfrac{x^4+9x^2+16}{x^2}\\) becomes?", answer: "\\(t^2 + 1\\)", method: "\\(x^2+16/x^2 = t^2-8\\), then \\(+9\\)" },
      ],
      pyqExampleId: "fe26934e-b655-4968-99e1-07dcce2b63c3",
      traps: [
        {
          title: "Pick the sign of t = x ± k/x from the numerator",
          body:
            "After dividing by \\(x^2\\), if the numerator is \\(1 - \\dfrac{k}{x^2}\\) use \\(t = x + \\dfrac{k}{x}\\); if it is \\(1 + \\dfrac{k}{x^2}\\) use \\(t = x - \\dfrac{k}{x}\\). The substitution only works when \\(dt\\) reproduces the numerator exactly.",
        },
      ],
    },

    // 6 — exponential / special subs
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
        prompt: "Evaluate \\(\\displaystyle\\int \\dfrac{e^x}{1 + e^{2x}}\\,dx\\).",
        steps: [
          "Let \\(t = e^x\\), so \\(dt = e^x\\,dx\\). Note \\(e^{2x} = (e^x)^2 = t^2\\).",
          "Rewrite: \\(\\int \\dfrac{dt}{1 + t^2} = \\tan^{-1}t + C\\).",
          "Back-substitute \\(t = e^x\\).",
        ],
        answer: "\\(\\tan^{-1}(e^x) + C\\)",
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
