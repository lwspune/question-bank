import type { SubtopicNote } from "@/app/notes/_types";

export const TRIGONOMETRIC_DEFINITE_INTEGRALS_NOTE: SubtopicNote = {
  subtopicName: "Trigonometric Definite Integrals — tan x = t, Half-Angle Forms and Powers",
  title: "Trigonometric Definite Integrals — tan x = t, Half-Angle Forms and Powers",
  oneLineDefinition:
    "Definite integrals of trigonometric expressions reduce to four moves — divide by a power of cos x and put tan x = t, use a half-angle identity, spot a derivative pair, or rewrite sin x ± cos x — with the limits converted alongside.",
  whyItMatters:
    "11 PYQs at 73% HARD — the most expensive page in the chapter, and the one where the difficulty is technique rather than recognition. " +
    "The same integral with tan⁵x and cot⁵x was set in two sittings a fortnight apart, and the sec-and-cosec fractional-power integral in two more; the limits are always π/6, π/4 or π/3, so tan x = t lands on 1/√3, 1 or √3. " +
    "Two printed keys on this page are wrong or garbled in the paper itself; the bank carries the corrected form and the honest note.",
  concepts: [
    // 1 — tan x = t
    {
      kind: "formula" as const,
      slug: "cetdi-tan-x-equals-t-with-sec-squared",
      name: "Divide by cos^n x and Put tan x = t",
      intuition:
        "Any rational expression in \\(\\sin x\\) and \\(\\cos x\\) that is homogeneous — every term of the same total degree — becomes a rational function of \\(\\tan x\\) after dividing top and bottom by a power of \\(\\cos x\\), and then \\(\\sec^2x\\,dx = dt\\) is the missing piece.",
      definition:
        "- **Pattern**: \\(\\dfrac{\\cos^2x\\sin^2x}{(\\cos^3x + \\sin^3x)^2}\\) — divide by \\(\\cos^6x\\) to get \\(\\dfrac{\\tan^2x\\sec^2x}{(1 + \\tan^3x)^2}\\); with \\(u = 1 + \\tan^3x\\), \\(du = 3\\tan^2x\\sec^2x\\,dx\\).\n" +
        "- **Limits convert**: \\(x = 0 \\to t = 0\\), \\(x = \\frac{\\pi}{6} \\to \\frac{1}{\\sqrt3}\\), \\(x = \\frac{\\pi}{4} \\to 1\\), \\(x = \\frac{\\pi}{3} \\to \\sqrt3\\).\n" +
        "- \\(\\dfrac{\\sec^2x}{(1 + \\tan x)(2 + \\tan x)}\\) is already in the form: \\(t = \\tan x\\) gives \\(\\int_0^1\\dfrac{dt}{(1 + t)(2 + t)} = \\log\\dfrac43\\).\n" +
        "- **Fractional powers**: \\(\\sec^{2/3}x\\csc^{4/3}x = \\dfrac{\\sec^2x}{\\tan^{4/3}x}\\) (multiply and divide by \\(\\sec^{4/3}x\\)); then \\(\\int t^{-4/3}dt = -3t^{-1/3}\\).\n" +
        "- \\(\\dfrac{1}{\\sin 2x(\\tan^5x + \\cot^5x)}\\): write \\(\\sin 2x = \\dfrac{2\\tan x}{1 + \\tan^2x}\\), giving \\(\\dfrac{\\tan^4x\\sec^2x}{2(\\tan^{10}x + 1)}\\); with \\(u = \\tan^5x\\), \\(du = 5\\tan^4x\\sec^2x\\,dx\\), the integral is \\(\\dfrac{1}{10}\\left[\\tan^{-1}u\\right]\\).",
      formula: {
        label: "The tan substitution",
        latex:
          "t = \\tan x,\\quad dt = \\sec^2x\\,dx,\\qquad \\sin 2x = \\frac{2t}{1 + t^2},\\qquad x:\\ 0,\\tfrac{\\pi}{6},\\tfrac{\\pi}{4},\\tfrac{\\pi}{3} \\ \\to\\ t:\\ 0,\\tfrac{1}{\\sqrt3},1,\\sqrt3",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\int_0^{\\pi/3}\\dfrac{\\sec^2x}{(1 + \\tan x)^2}\\,dx\\).",
        steps: [
          "Put \\(t = \\tan x\\), \\(dt = \\sec^2x\\,dx\\); limits \\(0 \\to \\sqrt3\\). Integral \\(= \\int_0^{\\sqrt3}\\dfrac{dt}{(1 + t)^2}\\).",
          "\\(= \\left[-\\dfrac{1}{1 + t}\\right]_0^{\\sqrt3} = 1 - \\dfrac{1}{1 + \\sqrt3} = \\dfrac{\\sqrt3}{1 + \\sqrt3}\\).",
          "Rationalise: \\(\\dfrac{\\sqrt3(\\sqrt3 - 1)}{2} = \\dfrac{3 - \\sqrt3}{2}\\).",
        ],
        answer: "\\(\\dfrac{3 - \\sqrt3}{2}\\)",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\int_{\\pi/6}^{\\pi/3}\\dfrac{\\sec^2x}{\\tan^2x}\\,dx\\).",
        steps: [
          "\\(t = \\tan x\\); limits \\(\\dfrac{1}{\\sqrt3} \\to \\sqrt3\\). Integral \\(= \\int t^{-2}dt = \\left[-\\dfrac1t\\right]_{1/\\sqrt3}^{\\sqrt3}\\).",
          "\\(= -\\dfrac{1}{\\sqrt3} + \\sqrt3 = \\dfrac{2}{\\sqrt3}\\).",
        ],
        answer: "\\(\\dfrac{2}{\\sqrt3}\\)",
      },
      practiceSet: [
        {
          prompt: "Under \\(t = \\tan x\\), \\(x = \\pi/6\\) becomes \\(t = ?\\)",
          answer: "\\(\\dfrac{1}{\\sqrt3}\\)",
        },
        {
          prompt: "\\(\\int_0^{\\pi/4}\\tan^3x\\sec^2x\\,dx = ?\\)",
          answer: "\\(\\dfrac14\\)",
        },
        {
          prompt: "\\(\\int_0^{\\pi/4}\\dfrac{\\sec^2x}{1 + \\tan x}\\,dx = ?\\)",
          answer: "\\(\\log 2\\)",
        },
        {
          prompt: "Divide \\(\\dfrac{\\sin^2x}{\\cos^4x}\\) — which power of \\(\\tan x\\) times \\(\\sec^2x\\) is it?",
          answer: "\\(\\tan^2x\\sec^2x\\)",
        },
      ],
      pyqExampleId: "e4f9ea6a-4a2d-42e7-9f9a-5d838c564bfe",
      traps: [
        {
          title: "The paper's own typo: sen^{2/3}",
          body:
            "The 14 May 2024 Shift 1 paper prints \\(\\text{sen}^{2/3}x\\csc^{4/3}x\\); its key works with \\(\\sec^{2/3}x\\) and reaches \\(3^{7/6} - 3^{5/6}\\). With \\(\\sin^{2/3}x\\) the integrand has no elementary antiderivative — if a trig power integral looks impossible, suspect a misprint and try the sec version.",
        },
      ],
    },

    // 2 — half-angle forms
    {
      kind: "formula" as const,
      slug: "cetdi-half-angle-and-weierstrass-forms",
      name: "Half-Angle Forms: 1 + cos x and the a + b cos x Standard Result",
      intuition:
        "\\(1 + \\cos x\\) is \\(2\\cos^2\\dfrac{x}{2}\\), so \\(\\dfrac{1}{1 + \\cos x}\\) is \\(\\dfrac12\\sec^2\\dfrac{x}{2}\\) — integrable on sight. For \\(a + b\\cos x\\) the half-angle substitution \\(t = \\tan\\dfrac{x}{2}\\) does the same job and produces one memorable number.",
      definition:
        "- \\(1 + \\cos x = 2\\cos^2\\dfrac{x}{2}\\), \\(1 - \\cos x = 2\\sin^2\\dfrac{x}{2}\\), \\(1 + \\sin x = \\left(\\sin\\dfrac{x}{2} + \\cos\\dfrac{x}{2}\\right)^2\\).\n" +
        "- \\(\\int\\dfrac{dx}{1 + \\cos x} = \\tan\\dfrac{x}{2}\\); over \\(\\left[\\dfrac{\\pi}{4}, \\dfrac{3\\pi}{4}\\right]\\) this is \\(\\tan\\dfrac{3\\pi}{8} - \\tan\\dfrac{\\pi}{8} = (\\sqrt2 + 1) - (\\sqrt2 - 1) = 2\\).\n" +
        "- **Weierstrass** \\(t = \\tan\\dfrac{x}{2}\\): \\(dx = \\dfrac{2\\,dt}{1 + t^2}\\), \\(\\cos x = \\dfrac{1 - t^2}{1 + t^2}\\); limits \\(0 \\to \\pi\\) become \\(0 \\to \\infty\\).\n" +
        "- **Standard result** (\\(a > |b|\\)): \\(\\int_0^\\pi\\dfrac{dx}{a + b\\cos x} = \\dfrac{\\pi}{\\sqrt{a^2 - b^2}}\\). So \\(\\int_0^\\pi\\dfrac{dx}{4 + 3\\cos x} = \\dfrac{\\pi}{\\sqrt7}\\).\n" +
        "- \\(\\tan\\dfrac{\\pi}{8} = \\sqrt2 - 1\\) and \\(\\tan\\dfrac{3\\pi}{8} = \\sqrt2 + 1\\) are worth knowing cold.",
      formula: {
        label: "Half-angle results",
        latex:
          "\\int\\frac{dx}{1 + \\cos x} = \\tan\\frac{x}{2} \\qquad \\int_0^\\pi\\frac{dx}{a + b\\cos x} = \\frac{\\pi}{\\sqrt{a^2 - b^2}} \\ (a > |b|) \\qquad \\tan\\frac{\\pi}{8} = \\sqrt2 - 1",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\int_0^{\\pi/2}\\dfrac{dx}{1 + \\cos x}\\).",
        steps: [
          "\\(\\dfrac{1}{1 + \\cos x} = \\dfrac{1}{2\\cos^2(x/2)} = \\dfrac12\\sec^2\\dfrac{x}{2}\\).",
          "Antiderivative \\(\\tan\\dfrac{x}{2}\\); evaluate: \\(\\tan\\dfrac{\\pi}{4} - \\tan 0 = 1\\).",
        ],
        answer: "\\(1\\)",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\int_0^\\pi\\dfrac{dx}{5 + 4\\cos x}\\).",
        steps: [
          "Standard result with \\(a = 5\\), \\(b = 4\\): \\(\\dfrac{\\pi}{\\sqrt{25 - 16}}\\).",
        ],
        answer: "\\(\\dfrac{\\pi}{3}\\)",
      },
      practiceSet: [
        {
          prompt: "\\(\\int_0^\\pi\\dfrac{dx}{2 + \\cos x} = ?\\)",
          answer: "\\(\\dfrac{\\pi}{\\sqrt3}\\)",
        },
        {
          prompt: "\\(\\int_0^{\\pi/2}\\dfrac{dx}{1 - \\cos x}\\) — which half-angle identity?",
          answer: "\\(1 - \\cos x = 2\\sin^2(x/2)\\), antiderivative \\(-\\cot(x/2)\\) (the integral diverges at \\(0\\)).",
        },
        {
          prompt: "\\(\\tan\\dfrac{3\\pi}{8} - \\tan\\dfrac{\\pi}{8} = ?\\)",
          answer: "\\(2\\)",
        },
        {
          prompt: "Under \\(t = \\tan(x/2)\\), \\(x = \\pi\\) becomes?",
          answer: "\\(t \\to \\infty\\)",
        },
      ],
      pyqExampleId: "24f93f6a-7fae-44b8-8dfb-1cea7ded527d",
      traps: [
        {
          title: "A positive integrand cannot give a negative answer",
          body:
            "\\(\\int_{\\pi/4}^{3\\pi/4}\\dfrac{dx}{1 + \\cos x} = 2\\); the 2022 sitting's stored key once read \\(-2\\) and the official key says \\(2\\). Sanity-check the sign of every definite integral against the sign of its integrand before choosing.",
        },
        {
          title: "π/7 versus π/√7",
          body:
            "\\(\\dfrac{\\pi}{\\sqrt{a^2 - b^2}}\\) has the ROOT in the denominator. For \\(4 + 3\\cos x\\) that is \\(\\pi/\\sqrt7\\); \\(\\pi/7\\) is the distractor built for students who forget it.",
        },
      ],
    },

    // 3 — derivative pairs
    {
      kind: "formula" as const,
      slug: "cetdi-derivative-pairs-csc-cot-and-one-minus-cos",
      name: "Spot the Derivative Pair: csc x cot x, sin x with 1 − cos x",
      intuition:
        "\\(\\csc x\\cot x\\,dx\\) is \\(-d(\\csc x)\\), and \\(\\sin x\\,dx\\) is \\(-d(\\cos x) = d(1 - \\cos x)\\). When the rest of the integrand is a function of that same quantity, the substitution is already written for you.",
      definition:
        "- \\(\\dfrac{\\csc x\\cot x}{1 + \\csc^2x}\\): with \\(t = \\csc x\\), \\(dt = -\\csc x\\cot x\\,dx\\), limits \\(\\frac{\\pi}{6} \\to 2\\), \\(\\frac{\\pi}{2} \\to 1\\); the integral is \\(\\int_1^2\\dfrac{dt}{1 + t^2} = \\tan^{-1}2 - \\tan^{-1}1 = \\tan^{-1}\\dfrac13\\).\n" +
        "- \\(\\dfrac{\\sqrt{1 + \\cos x}}{(1 - \\cos x)^{5/2}}\\): multiply by \\(\\dfrac{\\sqrt{1 - \\cos x}}{\\sqrt{1 - \\cos x}}\\) to get \\(\\dfrac{\\sin x}{(1 - \\cos x)^3}\\), then \\(t = 1 - \\cos x\\).\n" +
        "- Derivative pairs to keep ready: \\((\\sin x, \\cos x)\\), \\((\\tan x, \\sec^2x)\\), \\((\\sec x, \\sec x\\tan x)\\), \\((\\csc x, \\csc x\\cot x)\\), \\((\\cot x, \\csc^2x)\\).\n" +
        "- The difference of arctangents is simplified with \\(\\tan^{-1}A - \\tan^{-1}B = \\tan^{-1}\\dfrac{A - B}{1 + AB}\\) — the options are written in the collapsed form.",
      formula: {
        label: "Derivative pairs",
        latex:
          "d(\\csc x) = -\\csc x\\cot x\\,dx \\qquad d(1 - \\cos x) = \\sin x\\,dx \\qquad \\tan^{-1}A - \\tan^{-1}B = \\tan^{-1}\\frac{A - B}{1 + AB}",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\int_0^{\\pi/2}\\dfrac{\\sin x}{(1 + \\cos x)^2}\\,dx\\).",
        steps: [
          "Put \\(t = 1 + \\cos x\\), \\(dt = -\\sin x\\,dx\\); limits \\(x = 0 \\to t = 2\\), \\(x = \\frac{\\pi}{2} \\to t = 1\\).",
          "Integral \\(= \\int_2^1\\dfrac{-dt}{t^2} = \\int_1^2 t^{-2}dt = \\left[-\\dfrac1t\\right]_1^2 = -\\dfrac12 + 1\\).",
        ],
        answer: "\\(\\dfrac12\\)",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\int_{\\pi/4}^{\\pi/2}\\dfrac{\\csc^2x}{1 + \\cot^2x}\\,dx\\).",
        steps: [
          "\\(1 + \\cot^2x = \\csc^2x\\), so the integrand is \\(1\\).",
          "Integral \\(= \\dfrac{\\pi}{2} - \\dfrac{\\pi}{4}\\).",
        ],
        answer: "\\(\\dfrac{\\pi}{4}\\)",
      },
      practiceSet: [
        {
          prompt: "\\(\\int_0^{\\pi/4}\\sec x\\tan x\\,dx = ?\\)",
          answer: "\\(\\sqrt2 - 1\\)",
        },
        {
          prompt: "\\(\\int_{\\pi/6}^{\\pi/2}\\csc x\\cot x\\,dx = ?\\)",
          answer: "\\(1\\)",
          method: "\\([-\\csc x]\\): \\(-1 + 2\\).",
        },
        {
          prompt: "\\(\\tan^{-1}2 - \\tan^{-1}1 = \\tan^{-1}(?)\\)",
          answer: "\\(\\dfrac13\\)",
        },
        {
          prompt: "\\(\\int_0^{\\pi/2}\\dfrac{\\cos x}{1 + \\sin x}\\,dx = ?\\)",
          answer: "\\(\\log 2\\)",
        },
      ],
      pyqExampleId: "f90af107-e62d-4e0c-b0dc-2f8df428851f",
      traps: [
        {
          title: "Reading the negative of the integral off the option list",
          body:
            "\\(\\tan^{-1}2 - \\tan^{-1}1\\) is positive, and equals \\(\\tan^{-1}\\frac13\\). The 2021 paper offered \\(\\frac{\\pi}{4} - \\tan^{-1}2\\) — the NEGATIVE — as a distractor, and the stored key once pointed at it. The integrand is positive on the interval, so any negative option is out before you compute.",
        },
      ],
    },

    // 4 — sin ± cos
    {
      kind: "formula" as const,
      slug: "cetdi-sin-plus-cos-and-sin-minus-cos",
      name: "√tan x + √cot x: the sin x − cos x Substitution",
      intuition:
        "\\(\\sqrt{\\tan x} + \\sqrt{\\cot x} = \\dfrac{\\sin x + \\cos x}{\\sqrt{\\sin x\\cos x}}\\), and the numerator is the derivative of \\(\\sin x - \\cos x\\) while \\(\\sin x\\cos x\\) is \\(\\dfrac{1 - (\\sin x - \\cos x)^2}{2}\\). One substitution turns the whole thing into \\(\\sin^{-1}\\).",
      definition:
        "- Identities: \\((\\sin x - \\cos x)^2 = 1 - 2\\sin x\\cos x\\) and \\((\\sin x + \\cos x)^2 = 1 + 2\\sin x\\cos x\\).\n" +
        "- If the numerator is \\(\\sin x + \\cos x\\), substitute \\(t = \\sin x - \\cos x\\) (its derivative); if the numerator is \\(\\sin x - \\cos x\\), substitute \\(t = \\sin x + \\cos x\\).\n" +
        "- \\(\\int_0^{\\pi/4}\\left(\\sqrt{\\tan x} + \\sqrt{\\cot x}\\right)dx = \\sqrt2\\int_{-1}^{0}\\dfrac{dt}{\\sqrt{1 - t^2}} = \\sqrt2\\cdot\\dfrac{\\pi}{2} = \\dfrac{\\pi}{\\sqrt2}\\).\n" +
        "- Limits: at \\(x = 0\\), \\(t = -1\\); at \\(x = \\frac{\\pi}{4}\\), \\(t = 0\\); at \\(x = \\frac{\\pi}{2}\\), \\(t = 1\\).",
      formula: {
        label: "The sin x − cos x substitution",
        latex:
          "t = \\sin x - \\cos x \\ \\Rightarrow\\ dt = (\\cos x + \\sin x)\\,dx,\\quad \\sin x\\cos x = \\frac{1 - t^2}{2}",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\int_0^{\\pi/2}\\dfrac{\\sin x + \\cos x}{\\sqrt{1 + 2\\sin x\\cos x}}\\,dx\\).",
        steps: [
          "\\(1 + 2\\sin x\\cos x = (\\sin x + \\cos x)^2\\), so the integrand is \\(\\dfrac{\\sin x + \\cos x}{|\\sin x + \\cos x|} = 1\\) on \\([0, \\frac{\\pi}{2}]\\).",
          "Integral \\(= \\dfrac{\\pi}{2}\\).",
        ],
        answer: "\\(\\dfrac{\\pi}{2}\\)",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\int_0^{\\pi/2}\\dfrac{\\sin x - \\cos x}{\\sqrt{1 + \\sin 2x}}\\,dx\\).",
        steps: [
          "\\(1 + \\sin 2x = (\\sin x + \\cos x)^2\\); put \\(t = \\sin x + \\cos x\\), \\(dt = (\\cos x - \\sin x)\\,dx\\).",
          "Integral \\(= -\\int\\dfrac{dt}{t} = -[\\log t]\\); \\(t\\) runs \\(1 \\to 1\\) (both ends give \\(1\\)), so the integral is \\(0\\) — the integrand is antisymmetric about \\(\\frac{\\pi}{4}\\).",
        ],
        answer: "\\(0\\)",
      },
      practiceSet: [
        {
          prompt: "\\((\\sin x - \\cos x)^2 = ?\\)",
          answer: "\\(1 - \\sin 2x\\)",
        },
        {
          prompt: "\\(\\int_0^{\\pi/2}\\dfrac{\\cos x - \\sin x}{1 + \\sin x\\cos x}\\,dx = ?\\)",
          answer: "\\(0\\)",
          method: "\\(t = \\sin x + \\cos x\\) runs \\(1 \\to 1\\).",
        },
        {
          prompt: "At \\(x = \\pi/4\\), \\(\\sin x - \\cos x = ?\\)",
          answer: "\\(0\\)",
        },
        {
          prompt: "\\(\\sqrt{\\tan x} + \\sqrt{\\cot x}\\) over a common denominator is?",
          answer: "\\(\\dfrac{\\sin x + \\cos x}{\\sqrt{\\sin x\\cos x}}\\)",
        },
      ],
      pyqExampleId: "89b38b1b-0491-49e4-bbe8-3ae85ad77ce5",
      traps: [
        {
          title: "Rationalising √tan + √cot term by term",
          body:
            "Integrating \\(\\sqrt{\\tan x}\\) alone is a long substitution. The sum is far easier than either part — combine first, then substitute \\(\\sin x - \\cos x\\).",
        },
      ],
    },
  ],
  related: [
    {
      label: "Indefinite Integration — Trigonometric Integrals, Rational and Substitution Forms (the same moves without limits)",
      href: "/notes/mht-cet-maths/indefinite-integration/trigonometric-integrals-rational",
    },
  ],
};
