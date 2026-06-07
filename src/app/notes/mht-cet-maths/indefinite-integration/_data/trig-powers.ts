import type { SubtopicNote } from "@/app/notes/_types";

export const TRIG_POWERS_NOTE: SubtopicNote = {
  subtopicName: "Trigonometric Integrals - Powers and Identities",
  title: "Trigonometric Integrals I — Powers and Identities",
  oneLineDefinition:
    "Rewrite powers and sums of trig functions using identities until what remains is a standard integral.",
  whyItMatters:
    "7 PYQs of the chapter's ~66 trig integrals live here — the ones solved by a standard result or one identity, before any heavy substitution. " +
    "Four reflexes: the standard tan/cot/sec/cosec integrals (recall, not re-derive), power-reduction (turning tan⁴x or sin²x into integrable pieces), identity-simplification (collapsing tan x + cot x, or sin(5x/2)/sin(x/2)), and reducing an inverse-trig argument to a linear function of x. " +
    "Master these and the harder rational-in-sin/cos integrals in Trigonometric Integrals II become approachable.",
  concepts: [
    // 1 — standard tan/cot/sec/cosec integrals (foundation)
    {
      kind: "formula" as const,
      slug: "standard-trig-integrals",
      name: "The Standard tan, cot, sec, cosec Integrals",
      intuition:
        "Four trig integrals appear so often they are worth knowing as results, not re-deriving each time. " +
        "\\(\\int\\tan\\) and \\(\\int\\cot\\) are just \\(f'/f\\) logs; \\(\\int\\sec\\) and \\(\\int\\csc\\) come from a one-time multiply-by-the-conjugate trick. Memorise the four answers.",
      definition:
        "The four results, each holding on the domain where the function is defined:\n" +
        "- \\(\\int \\tan x\\,dx = \\log|\\sec x| + C\\) (\\(= -\\log|\\cos x|\\)) — top is \\(-(\\cos x)'\\), an \\(f'/f\\) log\n" +
        "- \\(\\int \\cot x\\,dx = \\log|\\sin x| + C\\) — top is \\((\\sin x)'\\), an \\(f'/f\\) log\n" +
        "- \\(\\int \\sec x\\,dx = \\log|\\sec x + \\tan x| + C\\) — from multiplying by \\(\\dfrac{\\sec x + \\tan x}{\\sec x + \\tan x}\\)\n" +
        "- \\(\\int \\csc x\\,dx = \\log|\\csc x - \\cot x| + C\\) — from multiplying by \\(\\dfrac{\\csc x - \\cot x}{\\csc x - \\cot x}\\)",
      formula: {
        label: "The two that need the conjugate trick",
        latex: "\\int \\sec x\\,dx = \\log|\\sec x + \\tan x| + C,\\qquad \\int \\csc x\\,dx = \\log|\\csc x - \\cot x| + C",
      },
      authoredExample: {
        prompt: "Derive \\(\\displaystyle\\int \\sec x\\,dx\\).",
        steps: [
          "Multiply top and bottom by \\(\\sec x + \\tan x\\): \\(\\displaystyle\\int \\dfrac{\\sec x(\\sec x + \\tan x)}{\\sec x + \\tan x}\\,dx = \\int \\dfrac{\\sec^2 x + \\sec x\\tan x}{\\sec x + \\tan x}\\,dx\\).",
          "The numerator is exactly \\(\\dfrac{d}{dx}(\\sec x + \\tan x) = \\sec x\\tan x + \\sec^2 x\\) — so the integrand is \\(f'/f\\).",
          "Therefore \\(\\int \\dfrac{f'}{f}\\,dx = \\log|f| = \\log|\\sec x + \\tan x| + C\\).",
        ],
        answer: "\\(\\int \\sec x\\,dx = \\log|\\sec x + \\tan x| + C\\)",
      },
      practiceSet: [
        { prompt: "\\(\\int \\tan x\\,dx\\)", answer: "\\(\\log|\\sec x| + C\\)" },
        { prompt: "\\(\\int \\cot x\\,dx\\)", answer: "\\(\\log|\\sin x| + C\\)" },
        { prompt: "\\(\\int \\sec x\\,dx\\)", answer: "\\(\\log|\\sec x + \\tan x| + C\\)" },
        { prompt: "\\(\\int \\csc x\\,dx\\)", answer: "\\(\\log|\\csc x - \\cot x| + C\\)" },
      ],
      traps: [
        {
          title: "∫sec and ∫cosec are NOT plain logs of sec/cosec",
          body:
            "\\(\\int \\sec x\\,dx = \\log|\\sec x + \\tan x|\\), not \\(\\log|\\sec x|\\). The \\(+\\tan x\\) (and \\(-\\cot x\\) for cosec) is exactly what the conjugate trick produces — options drop it to bait you.",
        },
      ],
    },

    // 2 — power reduction
    {
      kind: "formula" as const,
      slug: "power-reduction",
      name: "Power Reduction with Pythagorean Identities",
      intuition:
        "A high power of tan or sec is peeled down using \\(\\tan^2 = \\sec^2 - 1\\) (or \\(\\sin^2 = 1 - \\cos^2\\)) until every piece is either a standard integral or a \\([f]^n f'\\) shape.",
      definition:
        "Use the Pythagorean identities \\(\\sec^2 x = 1 + \\tan^2 x\\) and \\(\\csc^2 x = 1 + \\cot^2 x\\) to split high powers. " +
        "For \\(\\tan^n x\\), repeatedly write \\(\\tan^2 x = \\sec^2 x - 1\\): the \\(\\sec^2 x\\) factor pairs with a \\(\\tan\\)-power as \\([\\tan x]^k \\sec^2 x\\) (integrates by the power rule), and the leftover lowers the degree.",
      formula: {
        label: "Key reduction identity",
        latex: "\\tan^2 x = \\sec^2 x - 1",
      },
      authoredExample: {
        prompt:
          "Evaluate \\(\\displaystyle\\int \\cot^4 x\\,dx\\).",
        steps: [
          "Write \\(\\cot^4 x = \\cot^2 x(\\csc^2 x - 1) = \\cot^2 x\\csc^2 x - \\cot^2 x\\).",
          "Replace the leftover: \\(-\\cot^2 x = -(\\csc^2 x - 1) = -\\csc^2 x + 1\\).",
          "Integrate: \\(\\int \\cot^2 x\\csc^2 x\\,dx = -\\dfrac{\\cot^3 x}{3}\\) (\\(u = \\cot x\\)); \\(\\int -\\csc^2 x\\,dx = \\cot x\\); \\(\\int 1\\,dx = x\\).",
          "So \\(\\int \\cot^4 x\\,dx = -\\dfrac{\\cot^3 x}{3} + \\cot x + x + C\\).",
        ],
        answer: "\\(-\\dfrac{\\cot^3 x}{3} + \\cot x + x + C\\)",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\displaystyle\\int \\tan^2 x\\,dx\\).",
        steps: [
          "Use \\(\\tan^2 x = \\sec^2 x - 1\\).",
          "Integrate: \\(\\int (\\sec^2 x - 1)\\,dx = \\tan x - x + C\\).",
        ],
        answer: "\\(\\tan x - x + C\\)",
      },
      practiceSet: [
        { prompt: "\\(\\int \\sec^2 x\\,dx\\)", answer: "\\(\\tan x + C\\)" },
        { prompt: "\\(\\int (\\sec^2 x - 1)\\,dx\\)", answer: "\\(\\tan x - x + C\\)" },
        { prompt: "\\(\\int \\tan^2 x\\sec^2 x\\,dx\\)", answer: "\\(\\dfrac{\\tan^3 x}{3} + C\\)", method: "\\(u = \\tan x\\)" },
        { prompt: "\\(\\int \\cot^2 x\\,dx\\)", answer: "\\(-\\cot x - x + C\\)", method: "\\(\\cot^2 = \\csc^2 - 1\\)" },
      ],
      pyqExampleId: "c1a74516-2164-4a60-8700-aab99862fbd5",
      traps: [
        {
          title: "Keep one sec²x to pair with the tan-power",
          body:
            "The whole method works because \\(\\sec^2 x\\,dx = d(\\tan x)\\). Each reduction must leave a \\(\\sec^2 x\\) attached to a power of \\(\\tan x\\) so the power rule applies — otherwise you stall.",
        },
      ],
    },

    // 2 — identity simplification
    {
      kind: "formula" as const,
      slug: "identity-simplification",
      name: "Identity Simplification before Integrating",
      intuition:
        "Many trig integrands look exotic but collapse to something standard after ONE identity — a half-angle, a sum-to-product, or just writing everything over \\(\\sin\\) and \\(\\cos\\). Always try to simplify before substituting.",
      definition:
        "Common collapses (after which the integral is a standard form):\n" +
        "- \\(\\tan x + \\cot x = \\dfrac{1}{\\sin x\\cos x} = 2\\csc 2x\\)\n" +
        "- \\(\\dfrac{1}{1+\\cos x} = \\dfrac{1}{2}\\sec^2\\dfrac{x}{2}\\)\n" +
        "- ratios like \\(\\dfrac{\\sin(5x/2)}{\\sin(x/2)}\\) expand into a sum of cosines",
      formula: {
        label: "A workhorse collapse",
        latex: "\\tan x + \\cot x = \\dfrac{\\sin^2 x + \\cos^2 x}{\\sin x\\cos x} = \\dfrac{2}{\\sin 2x} = 2\\csc 2x",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\displaystyle\\int 2\\cos^2 x\\,dx\\).",
        steps: [
          "Use the double-angle identity \\(2\\cos^2 x = 1 + \\cos 2x\\) to collapse the power.",
          "The integrand is now a standard sum: \\(\\int (1 + \\cos 2x)\\,dx\\).",
          "Integrate: \\(x + \\dfrac{\\sin 2x}{2} + C\\).",
        ],
        answer: "\\(x + \\dfrac{\\sin 2x}{2} + C\\)",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\displaystyle\\int (1 - \\cos x)\\csc^2 x\\,dx\\).",
        steps: [
          "Split: \\(\\int \\csc^2 x\\,dx - \\int \\dfrac{\\cos x}{\\sin^2 x}\\,dx\\).",
          "First: \\(\\int \\csc^2 x\\,dx = -\\cot x\\). Second: \\(u = \\sin x\\Rightarrow \\int \\dfrac{du}{u^2} = -\\dfrac{1}{\\sin x} = -\\csc x\\).",
          "So the result is \\(-\\cot x - (-\\csc x) = \\csc x - \\cot x + C\\).",
        ],
        answer: "\\(\\csc x - \\cot x + C\\) (equivalently \\(\\dfrac{1-\\cos x}{\\sin x} + C\\)).",
      },
      practiceSet: [
        { prompt: "Simplify \\(\\tan x + \\cot x\\).", answer: "\\(2\\csc 2x\\)" },
        { prompt: "\\(\\int \\dfrac{dx}{1+\\cos x}\\)", answer: "\\(\\tan\\dfrac{x}{2} + C\\)", method: "\\(\\frac{1}{1+\\cos x} = \\frac12\\sec^2\\frac{x}{2}\\)" },
        { prompt: "\\(\\int 2\\csc 2x\\,dx\\)", answer: "\\(\\log|\\tan x| + C\\)" },
        { prompt: "\\(\\int \\dfrac{dx}{1-\\cos x}\\)", answer: "\\(-\\cot\\dfrac{x}{2} + C\\)", method: "\\(\\frac12\\csc^2\\frac{x}{2}\\)" },
      ],
      pyqExampleId: "7b746537-9bbf-470f-8bcc-b092e40b364a",
      traps: [
        {
          title: "Try an identity before a substitution",
          body:
            "Reaching for Weierstrass on \\(\\int(\\tan x + \\cot x)\\,dx\\) is a long detour — one identity makes it \\(2\\csc 2x\\) instantly. Simplify first; substitute only if no identity collapses it.",
        },
      ],
    },

    // 4 — inverse-trig argument simplification
    {
      kind: "formula" as const,
      slug: "inverse-trig-argument",
      name: "Simplify the Inverse-Trig Argument First",
      intuition:
        "When the integrand is an inverse-trig function OF a trig expression, don't integrate it as written. Use half-angle or double-angle identities to turn the ARGUMENT into \\(\\tan(\\text{linear})\\) or \\(\\sin(\\text{linear})\\); the inverse and the function then cancel (\\(\\tan^{-1}(\\tan\\theta)=\\theta\\)), leaving a linear function of \\(x\\) you integrate in one line.",
      definition:
        "The collapse relies on \\(\\sin^{-1}(\\sin\\theta)=\\theta\\), \\(\\cos^{-1}(\\cos\\theta)=\\theta\\), \\(\\tan^{-1}(\\tan\\theta)=\\theta\\) on the principal range. Standard argument reductions:\n" +
        "- \\(\\dfrac{\\sin 2x}{1+\\cos 2x} = \\tan x\\)\n" +
        "- \\(\\sqrt{\\dfrac{1-\\sin x}{1+\\sin x}} = \\left|\\tan\\!\\left(\\dfrac{\\pi}{4}-\\dfrac{x}{2}\\right)\\right|\\)\n" +
        "- \\(\\dfrac{1+\\cos x}{\\sin x} = \\cot\\dfrac{x}{2}\\), and \\(\\cos 3x = \\sin\\!\\left(\\dfrac{\\pi}{2}-3x\\right)\\)\n" +
        "After the reduction the integrand is linear in \\(x\\), so the integral is a simple polynomial.",
      formula: {
        label: "Cancel, then integrate",
        latex: "\\tan^{-1}(\\tan\\theta) = \\theta,\\quad \\sin^{-1}(\\sin\\theta)=\\theta \\quad (\\theta\\text{ in principal range})",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\displaystyle\\int \\tan^{-1}\\!\\left(\\dfrac{\\sin 2x}{1+\\cos 2x}\\right)dx\\).",
        steps: [
          "Reduce the argument: \\(\\dfrac{\\sin 2x}{1+\\cos 2x} = \\dfrac{2\\sin x\\cos x}{2\\cos^2 x} = \\tan x\\).",
          "So the integrand is \\(\\tan^{-1}(\\tan x) = x\\).",
          "Integrate: \\(\\int x\\,dx = \\dfrac{x^2}{2} + C\\).",
        ],
        answer: "\\(\\dfrac{x^2}{2} + C\\)",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\displaystyle\\int \\sin^{-1}(\\cos x)\\,dx\\) for \\(x\\in(0,\\pi)\\).",
        steps: [
          "Rewrite \\(\\cos x = \\sin\\!\\left(\\dfrac{\\pi}{2} - x\\right)\\).",
          "So \\(\\sin^{-1}(\\cos x) = \\dfrac{\\pi}{2} - x\\) on this interval.",
          "Integrate: \\(\\int\\!\\left(\\dfrac{\\pi}{2} - x\\right)dx = \\dfrac{\\pi}{2}x - \\dfrac{x^2}{2} + C\\).",
        ],
        answer: "\\(\\dfrac{\\pi x}{2} - \\dfrac{x^2}{2} + C\\)",
      },
      practiceSet: [
        { prompt: "Simplify \\(\\dfrac{\\sin 2x}{1+\\cos 2x}\\).", answer: "\\(\\tan x\\)" },
        { prompt: "Simplify \\(\\sqrt{\\dfrac{1-\\sin x}{1+\\sin x}}\\).", answer: "\\(\\left|\\tan\\!\\left(\\dfrac{\\pi}{4}-\\dfrac{x}{2}\\right)\\right|\\)", method: "\\(1\\mp\\sin x = (\\cos\\tfrac x2 \\mp \\sin\\tfrac x2)^2\\)" },
        { prompt: "\\(\\int \\tan^{-1}(\\tan x)\\,dx,\\ 0<x<\\tfrac{\\pi}{2}\\)", answer: "\\(\\dfrac{x^2}{2} + C\\)" },
        { prompt: "\\(\\cos 3x = \\sin(?)\\)", answer: "\\(\\sin\\!\\left(\\dfrac{\\pi}{2}-3x\\right)\\)" },
      ],
      pyqExampleId: "53143fca-b3ad-4cd7-83e3-44b69f9a7cf5",
      traps: [
        {
          title: "Reduce the argument BEFORE integrating",
          body:
            "Never reach for by-parts on \\(\\int\\tan^{-1}(\\cdots)\\,dx\\) until you've tried to collapse the inside. If the argument is a half/double-angle form, the inverse cancels and the integral is a one-line polynomial — by-parts is a needless detour.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Trigonometric Integrals II — rational-in-sin/cos and the half-angle substitution",
      href: "/notes/mht-cet-maths/indefinite-integration/trigonometric-integrals-rational",
    },
  ],
};
