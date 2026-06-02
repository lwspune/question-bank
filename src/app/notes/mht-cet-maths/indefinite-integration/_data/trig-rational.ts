import type { SubtopicNote } from "@/app/notes/_types";

export const TRIG_RATIONAL_NOTE: SubtopicNote = {
  subtopicName: "Trigonometric Integrals - Rational and Substitution Forms",
  title: "Trigonometric Integrals II — Rational Forms and Substitutions",
  oneLineDefinition:
    "The hard trig core — fractions in sine and cosine, handled by the half-angle (Weierstrass) substitution, the divide-by-cosine-squared move, the fractional-power tangent trick, and numerator-matching.",
  whyItMatters:
    "26 PYQs and the chapter's HARDEST pocket — 25 of the 26 are HARD. These are the integrals that decide a top score. " +
    "Four named techniques cover almost all of them: Weierstrass t = tan(x/2) for 1/(a+b sin x); divide-by-cos² for 1/(a+b sin²x); the fractional-power tan trick for cos/sin power products; and writing a numerator as 'denominator + its derivative'. " +
    "Learn to RECOGNISE which of the four a question wants — that recognition is the whole skill.",
  concepts: [
    // 1 — Weierstrass
    {
      kind: "formula" as const,
      slug: "weierstrass-half-angle",
      name: "The Half-Angle (Weierstrass) Substitution",
      intuition:
        "Any rational function of \\(\\sin x\\) and \\(\\cos x\\) becomes a rational function of one variable \\(t = \\tan(x/2)\\). It is the universal hammer for \\(\\dfrac{1}{a + b\\sin x}\\) and \\(\\dfrac{1}{a + b\\cos x}\\).",
      definition:
        "With \\(t = \\tan\\dfrac{x}{2}\\): " +
        "\\(\\sin x = \\dfrac{2t}{1+t^2}\\), \\(\\cos x = \\dfrac{1-t^2}{1+t^2}\\), and \\(dx = \\dfrac{2\\,dt}{1+t^2}\\). " +
        "Substituting turns the integral into a rational function of \\(t\\), finished by completing the square and an arctan.",
      formula: {
        label: "Weierstrass substitution",
        latex: "t = \\tan\\dfrac{x}{2}:\\quad \\sin x = \\dfrac{2t}{1+t^2},\\ \\cos x = \\dfrac{1-t^2}{1+t^2},\\ dx = \\dfrac{2\\,dt}{1+t^2}",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\displaystyle\\int \\dfrac{dx}{5 + 3\\cos x}\\).",
        steps: [
          "Substitute \\(t = \\tan(x/2)\\): \\(\\cos x = \\dfrac{1-t^2}{1+t^2}\\), \\(dx = \\dfrac{2\\,dt}{1+t^2}\\).",
          "Denominator: \\(5 + 3\\cdot\\dfrac{1-t^2}{1+t^2} = \\dfrac{5(1+t^2) + 3(1-t^2)}{1+t^2} = \\dfrac{8 + 2t^2}{1+t^2}\\).",
          "Integral becomes \\(\\int \\dfrac{2\\,dt}{8 + 2t^2} = \\int \\dfrac{dt}{4 + t^2} = \\dfrac{1}{2}\\tan^{-1}\\dfrac{t}{2}\\) (the cosine form needs no completing-the-square — there is no linear \\(t\\) term).",
          "Back-substitute \\(t = \\tan(x/2)\\).",
        ],
        answer: "\\(\\dfrac{1}{2}\\tan^{-1}\\!\\left(\\dfrac{\\tan(x/2)}{2}\\right) + C\\)",
      },
      selfCheckExample: {
        prompt: "Set up \\(\\displaystyle\\int \\dfrac{dx}{1 + \\sin x}\\) with the half-angle substitution.",
        steps: [
          "Substitute to get \\(\\int \\dfrac{2\\,dt/(1+t^2)}{1 + \\frac{2t}{1+t^2}} = \\int \\dfrac{2\\,dt}{1 + t^2 + 2t} = \\int \\dfrac{2\\,dt}{(1+t)^2}\\).",
          "Integrate: \\(-\\dfrac{2}{1+t} + C\\).",
        ],
        answer: "\\(-\\dfrac{2}{1 + \\tan(x/2)} + C\\)",
      },
      practiceSet: [
        { prompt: "Under \\(t=\\tan(x/2)\\), what is \\(\\sin x\\)?", answer: "\\(\\dfrac{2t}{1+t^2}\\)" },
        { prompt: "Under \\(t=\\tan(x/2)\\), what is \\(dx\\)?", answer: "\\(\\dfrac{2\\,dt}{1+t^2}\\)" },
        { prompt: "Under \\(t=\\tan(x/2)\\), what is \\(\\cos x\\)?", answer: "\\(\\dfrac{1-t^2}{1+t^2}\\)" },
        { prompt: "\\(\\int \\dfrac{dx}{1+\\sin x}\\)", answer: "\\(-\\dfrac{2}{1+\\tan(x/2)} + C\\)" },
      ],
      pyqExampleId: "287f24f2-af70-4982-9f86-e6e316c719c8",
      traps: [
        {
          title: "Weierstrass is for a + b·sin/cos, not a + b·sin²",
          body:
            "If the denominator has \\(\\sin^2 x\\) or \\(\\cos^2 x\\) (an even power), the half-angle substitution gives a messy quartic. Use divide-by-\\(\\cos^2 x\\) instead — the next concept.",
        },
      ],
    },

    // 2 — divide by cos^2
    {
      kind: "formula" as const,
      slug: "divide-by-cos-squared",
      name: "Divide by cos²x for a + b·sin²x Forms",
      intuition:
        "When the denominator is built from \\(\\sin^2 x\\) and \\(\\cos^2 x\\), divide top and bottom by \\(\\cos^2 x\\). Everything turns into \\(\\tan x\\) and \\(\\sec^2 x\\), and \\(t = \\tan x\\) finishes it as an arctan.",
      definition:
        "For \\(\\displaystyle\\int \\dfrac{dx}{a + b\\sin^2 x}\\) (or with \\(\\cos^2 x\\)): divide numerator and denominator by \\(\\cos^2 x\\), using \\(\\dfrac{1}{\\cos^2 x} = \\sec^2 x\\) and \\(\\dfrac{\\sin^2 x}{\\cos^2 x} = \\tan^2 x\\). " +
        "Then \\(t = \\tan x,\\ dt = \\sec^2 x\\,dx\\) gives \\(\\int \\dfrac{dt}{A + Bt^2}\\), a standard arctan.",
      formula: {
        label: "After dividing by cos²x",
        latex: "\\int \\dfrac{\\sec^2 x\\,dx}{A + B\\tan^2 x} \\xrightarrow{\\,t=\\tan x\\,} \\int \\dfrac{dt}{A + Bt^2}",
      },
      authoredExample: {
        prompt:
          "Evaluate \\(\\displaystyle\\int \\dfrac{dx}{4\\cos^2 x + 9\\sin^2 x}\\).",
        steps: [
          "Divide top and bottom by \\(\\cos^2 x\\): \\(\\dfrac{\\sec^2 x}{4 + 9\\tan^2 x}\\).",
          "Let \\(t = \\tan x\\), \\(dt = \\sec^2 x\\,dx\\): the integral becomes \\(\\int \\dfrac{dt}{4 + 9t^2}\\).",
          "Standard arctan-quadratic form: \\(\\int \\dfrac{dt}{4 + 9t^2} = \\dfrac{1}{6}\\tan^{-1}\\dfrac{3t}{2}\\).",
          "Back-substitute \\(t = \\tan x\\).",
        ],
        answer: "\\(\\dfrac{1}{6}\\tan^{-1}\\!\\left(\\dfrac{3\\tan x}{2}\\right) + C\\)",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\displaystyle\\int \\dfrac{dx}{1 + \\tan^2 x}\\) using this idea.",
        steps: [
          "Note \\(1 + \\tan^2 x = \\sec^2 x\\), so the integrand is \\(\\cos^2 x\\).",
          "Use \\(\\cos^2 x = \\dfrac{1 + \\cos 2x}{2}\\): \\(\\int \\dfrac{1+\\cos 2x}{2}\\,dx = \\dfrac{x}{2} + \\dfrac{\\sin 2x}{4} + C\\).",
        ],
        answer: "\\(\\dfrac{x}{2} + \\dfrac{\\sin 2x}{4} + C\\)",
      },
      practiceSet: [
        { prompt: "Divide \\(\\dfrac{1}{a+b\\sin^2 x}\\) by \\(\\cos^2 x\\): numerator becomes?", answer: "\\(\\sec^2 x\\)" },
        { prompt: "\\(\\int \\dfrac{\\sec^2 x}{1 + \\tan^2 x}\\,dx\\)", answer: "\\(\\tan^{-1}(\\tan x) + C = x + C\\)" },
        { prompt: "After \\(t=\\tan x\\), \\(\\int \\dfrac{dt}{1+4t^2}\\)?", answer: "\\(\\tfrac12\\tan^{-1}(2t) + C\\)" },
        { prompt: "\\(\\int \\dfrac{dx}{\\cos^2 x(1+\\tan^2 x)}\\) — simplify the integrand.", answer: "\\(\\sec^2 x\\cdot\\cos^2 x \\cdot ... = 1\\Rightarrow \\int dx = x + C\\)", method: "\\(1+\\tan^2=\\sec^2\\)" },
      ],
      pyqExampleId: "581102aa-41ee-47ab-ac9a-2a16af2ae814",
      traps: [
        {
          title: "Even powers → divide by cos²; odd → Weierstrass",
          body:
            "Denominator has \\(\\sin^2/\\cos^2\\) (even): divide by \\(\\cos^2 x\\), use \\(t=\\tan x\\). Denominator has plain \\(\\sin x/\\cos x\\) (odd): use Weierstrass \\(t=\\tan(x/2)\\). Picking the wrong one makes the algebra explode.",
        },
      ],
    },

    // 3 — fractional power tan trick
    {
      kind: "formula" as const,
      slug: "fractional-power-tan-trick",
      name: "The Fractional-Power tan Trick",
      intuition:
        "For a product of powers of \\(\\sin x\\) and \\(\\cos x\\) whose exponents add up to an even negative integer, factoring out \\(\\sec^2 x\\) and substituting \\(t = \\tan x\\) turns the whole thing into a plain power of \\(t\\) — even when the exponents are fractions.",
      definition:
        "If the integrand is \\(\\sin^m x\\,\\cos^n x\\) with \\(m + n\\) an even negative integer, write it as a power of \\(\\tan x\\) times \\(\\sec^2 x\\): " +
        "\\(\\sin^m x\\cos^n x = \\tan^m x\\cdot\\cos^{m+n}x = (\\tan x)^m(\\sec^2 x)^{-(m+n)/2}\\). " +
        "Then \\(t = \\tan x\\) reduces it to \\(\\int t^m(1+t^2)^{-(m+n)/2 - 1}\\)-type powers — often a single \\(\\int t^p\\,dt\\).",
      formula: {
        label: "The reduction (m + n even)",
        latex: "\\int \\sin^m x\\,\\cos^n x\\,dx \\xrightarrow{\\,t=\\tan x\\,} \\int t^{m}\\,(1+t^2)^{\\frac{m+n}{2}-1}\\,dt",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\displaystyle\\int \\sin^{-5/3}x\\,\\cos^{-1/3}x\\,dx\\).",
        steps: [
          "Exponents: \\(m = -\\tfrac{5}{3}\\) (sin), \\(n = -\\tfrac{1}{3}\\) (cos); sum \\(m+n = -2\\), an even negative integer — the trick applies.",
          "Rewrite: \\(\\sin^{-5/3}x\\,\\cos^{-1/3}x = \\tan^{-5/3}x\\cdot\\cos^{-2}x = \\tan^{-5/3}x\\,\\sec^2 x\\).",
          "Let \\(t = \\tan x,\\ dt = \\sec^2 x\\,dx\\): \\(\\int t^{-5/3}\\,dt = \\dfrac{t^{-2/3}}{-2/3} = -\\dfrac{3}{2}\\,t^{-2/3}\\).",
          "Back-substitute \\(t = \\tan x\\).",
        ],
        answer: "\\(-\\dfrac{3}{2}(\\tan x)^{-2/3} + C\\)",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\displaystyle\\int \\sec^{2/3}x\\,\\csc^{4/3}x\\,dx\\) by the same route.",
        steps: [
          "Write in sin/cos: \\(\\sec^{2/3}x\\,\\csc^{4/3}x = \\cos^{-2/3}x\\,\\sin^{-4/3}x\\); sum of exponents \\(= -2\\). ✓",
          "Reduce: \\(= \\tan^{-4/3}x\\cdot\\cos^{-2}x = \\tan^{-4/3}x\\,\\sec^2 x\\).",
          "Let \\(t = \\tan x\\): \\(\\int t^{-4/3}\\,dt = \\dfrac{t^{-1/3}}{-1/3} = -3\\,t^{-1/3}\\).",
        ],
        answer: "\\(-3(\\tan x)^{-1/3} + C\\)",
      },
      practiceSet: [
        { prompt: "For \\(\\sin^m x\\cos^n x\\), the trick needs \\(m+n\\) to be?", answer: "an even negative integer" },
        { prompt: "Rewrite \\(\\sin^{-1/2}x\\cos^{-3/2}x\\) (sum \\(=-2\\)).", answer: "\\(\\tan^{-1/2}x\\,\\sec^2 x\\)", method: "factor \\(\\cos^{-2}=\\sec^2\\)" },
        { prompt: "\\(\\int \\tan^{-1/2}x\\,\\sec^2 x\\,dx\\)", answer: "\\(2(\\tan x)^{1/2} + C\\)", method: "\\(t=\\tan x\\)" },
        { prompt: "\\(\\int \\tan^{3/2}x\\,\\sec^2 x\\,dx\\)", answer: "\\(\\dfrac{2}{5}(\\tan x)^{5/2} + C\\)" },
      ],
      pyqExampleId: "07ef8dac-0b13-4ccf-bd9a-e7221bbb2148",
      traps: [
        {
          title: "Check m + n is an even integer first",
          body:
            "The trick only collapses cleanly when \\(m + n\\) is an even integer (so \\(\\cos^{m+n}x\\) becomes an integer power of \\(\\sec^2 x\\)). If it is odd, this route leaves a stray \\(\\sec x\\) or \\(\\cos x\\) and you need a different method.",
        },
      ],
    },

    // 4 — linear combination numerator
    {
      kind: "formula" as const,
      slug: "linear-combination-numerator",
      name: "Numerator as Denominator + its Derivative",
      intuition:
        "For \\(\\dfrac{a\\sin x + b\\cos x}{c\\sin x + d\\cos x}\\)-type fractions, write the numerator as a combination of the denominator and the denominator's derivative. The first piece integrates to \\(x\\)-times-a-constant, the second to a clean log.",
      definition:
        "Express \\(\\text{numerator} = A\\,(\\text{denominator}) + B\\,\\dfrac{d}{dx}(\\text{denominator})\\). " +
        "Then \\(\\displaystyle\\int \\dfrac{\\text{num}}{\\text{den}}\\,dx = A\\!\\int 1\\,dx + B\\!\\int \\dfrac{(\\text{den})'}{\\text{den}}\\,dx = Ax + B\\log|\\text{den}| + C\\). " +
        "Solve for \\(A, B\\) by matching the \\(\\sin x\\) and \\(\\cos x\\) coefficients.",
      formula: {
        label: "Decomposition of the numerator",
        latex: "\\text{num} = A\\cdot\\text{den} + B\\cdot(\\text{den})' \\;\\Rightarrow\\; \\int\\dfrac{\\text{num}}{\\text{den}}\\,dx = Ax + B\\log|\\text{den}| + C",
      },
      authoredExample: {
        prompt:
          "Evaluate \\(\\displaystyle\\int \\dfrac{2\\sin x + 3\\cos x}{\\sin x + \\cos x}\\,dx\\).",
        steps: [
          "Denominator \\(D = \\sin x + \\cos x\\), so \\(D' = \\cos x - \\sin x\\). Write \\(2\\sin x + 3\\cos x = A\\,D + B\\,D'\\).",
          "Match coefficients — \\(\\sin x\\): \\(A - B = 2\\); \\(\\cos x\\): \\(A + B = 3\\). Solve: \\(A = \\tfrac52,\\ B = \\tfrac12\\).",
          "Integrate: \\(\\int\\!\\left(A + B\\dfrac{D'}{D}\\right)dx = \\dfrac{5}{2}x + \\dfrac{1}{2}\\log|\\sin x + \\cos x| + C\\).",
        ],
        answer: "\\(\\dfrac{5}{2}x + \\dfrac{1}{2}\\log|\\sin x + \\cos x| + C\\)",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\displaystyle\\int \\dfrac{dx}{\\sin x + \\cos x}\\).",
        steps: [
          "Write \\(\\sin x + \\cos x = \\sqrt{2}\\sin\\!\\left(x + \\dfrac{\\pi}{4}\\right)\\).",
          "So the integral is \\(\\dfrac{1}{\\sqrt{2}}\\int \\csc\\!\\left(x + \\dfrac{\\pi}{4}\\right)dx = \\dfrac{1}{\\sqrt{2}}\\log\\left|\\tan\\!\\left(\\dfrac{x}{2} + \\dfrac{\\pi}{8}\\right)\\right| + C\\).",
        ],
        answer: "\\(\\dfrac{1}{\\sqrt{2}}\\log\\left|\\tan\\!\\left(\\dfrac{x}{2} + \\dfrac{\\pi}{8}\\right)\\right| + C\\)",
      },
      practiceSet: [
        { prompt: "Derivative of \\(\\sin x - 2\\cos x\\)?", answer: "\\(\\cos x + 2\\sin x\\)" },
        { prompt: "Write \\(\\sin x + \\cos x\\) as a single sine.", answer: "\\(\\sqrt2\\sin(x+\\pi/4)\\)" },
        { prompt: "\\(\\int \\dfrac{(\\sin x - 2\\cos x)'}{\\sin x - 2\\cos x}\\,dx\\)", answer: "\\(\\log|\\sin x - 2\\cos x| + C\\)" },
        { prompt: "If num \\(= 1\\cdot D + 2\\cdot D'\\), the integral is?", answer: "\\(x + 2\\log|D| + C\\)" },
      ],
      pyqExampleId: "0caad04a-a782-4f9f-b1e7-163ae2f6409f",
      traps: [
        {
          title: "Convert tan-fractions to sin/cos first",
          body:
            "A ratio in \\(\\tan x\\) is easiest after multiplying through by \\(\\cos x\\) to get a sin/cos ratio — then the 'denominator + its derivative' decomposition is clean.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Trigonometric Integrals I — the identities these build on",
      href: "/notes/mht-cet-maths/indefinite-integration/trigonometric-integrals-powers",
    },
    {
      label: "Integration by Substitution — the engine behind t = tan(x/2)",
      href: "/notes/mht-cet-maths/indefinite-integration/substitution",
    },
  ],
};
