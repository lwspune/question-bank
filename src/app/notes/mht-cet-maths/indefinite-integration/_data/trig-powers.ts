import type { SubtopicNote } from "@/app/notes/_types";

export const TRIG_POWERS_NOTE: SubtopicNote = {
  subtopicName: "Trigonometric Integrals - Powers and Identities",
  title: "Trigonometric Integrals I — Powers and Identities",
  oneLineDefinition:
    "Rewrite powers and sums of trig functions using identities until what remains is a standard integral.",
  whyItMatters:
    "7 PYQs of the chapter's ~66 trig integrals live here — the ones solved purely by an identity, before any substitution. " +
    "Power-reduction (turning tan⁴x or sin²x into integrable pieces) and identity-simplification (collapsing tan x + cot x, or sin(5x/2)/sin(x/2)) are the two reflexes. " +
    "Master these and the harder rational-in-sin/cos integrals in the next subtopic become approachable.",
  concepts: [
    // 1 — power reduction
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
          "Evaluate \\(\\displaystyle\\int \\tan^4 x\\,dx = a\\tan^3 x + b\\tan x + cx + k\\) and find \\(a - b + c\\).",
        steps: [
          "Write \\(\\tan^4 x = \\tan^2 x(\\sec^2 x - 1) = \\tan^2 x\\sec^2 x - \\tan^2 x\\).",
          "Replace the leftover: \\(-\\tan^2 x = -(\\sec^2 x - 1) = -\\sec^2 x + 1\\).",
          "Integrate: \\(\\int \\tan^2 x\\sec^2 x\\,dx = \\dfrac{\\tan^3 x}{3}\\); \\(\\int -\\sec^2 x\\,dx = -\\tan x\\); \\(\\int 1\\,dx = x\\).",
          "So the integral is \\(\\dfrac{\\tan^3 x}{3} - \\tan x + x + k\\): \\(a = \\tfrac13,\\ b = -1,\\ c = 1\\).",
        ],
        answer: "\\(a - b + c = \\tfrac13 - (-1) + 1 = \\dfrac{7}{3}\\)",
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
        "Common collapses: " +
        "\\(\\tan x + \\cot x = \\dfrac{1}{\\sin x\\cos x} = 2\\csc 2x\\); " +
        "\\(\\dfrac{1}{1+\\cos x} = \\dfrac{1}{2}\\sec^2\\dfrac{x}{2}\\); " +
        "and ratios like \\(\\dfrac{\\sin(5x/2)}{\\sin(x/2)}\\) expand into a sum of cosines. " +
        "After the identity, the integral is a standard form.",
      formula: {
        label: "A workhorse collapse",
        latex: "\\tan x + \\cot x = \\dfrac{\\sin^2 x + \\cos^2 x}{\\sin x\\cos x} = \\dfrac{2}{\\sin 2x} = 2\\csc 2x",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\displaystyle\\int (\\tan x + \\cot x)\\,dx\\).",
        steps: [
          "Combine over a common denominator: \\(\\tan x + \\cot x = \\dfrac{\\sin^2 x + \\cos^2 x}{\\sin x\\cos x} = \\dfrac{1}{\\sin x\\cos x}\\).",
          "Use \\(\\sin x\\cos x = \\tfrac12\\sin 2x\\): the integrand is \\(\\dfrac{2}{\\sin 2x} = 2\\csc 2x\\).",
          "Integrate: \\(\\int 2\\csc 2x\\,dx = 2\\cdot\\tfrac12\\log\\left|\\tan x\\right| = \\log|\\tan x| + C\\).",
        ],
        answer: "\\(\\log|\\tan x| + C\\)",
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
  ],
  related: [
    {
      label: "Trigonometric Integrals II — rational-in-sin/cos and the half-angle substitution",
      href: "/notes/mht-cet-maths/indefinite-integration/trigonometric-integrals-rational",
    },
  ],
};
