import type { SubtopicNote } from "@/app/notes/_types";

export const KINGS_PROPERTY_NOTE: SubtopicNote = {
  subtopicName: "King's Property — f(a + b − x) and the f/(f + g) Family",
  title: "King's Property — f(a + b − x) and the f/(f + g) Family",
  oneLineDefinition:
    "Replacing x by a + b − x leaves a definite integral unchanged — and adding the two forms cancels the awkward part, turning an unintegrable-looking expression into a constant times the interval.",
  whyItMatters:
    "17 PYQs at 47% HARD, the largest page in the chapter and the highest-leverage recognition in MHT-CET calculus: eleven of the seventeen are answered by writing the reflected integral, adding, and dividing by two. " +
    "Five distinct families recur — f/(f + g) over an interval, x·f(sin x) over 0 to π, integrands with 1/(1 + eˣ), functional equations like f(x) = f(1 − x), and an inverse-trig identity applied before the reflection — and each has a one-line closed form worth knowing. " +
    "The tell is always the same: the interval's endpoints add to something that makes the reflected integrand look like the original.",
  concepts: [
    // 1 — statement
    {
      kind: "formula" as const,
      slug: "cetdi-kings-property-statement",
      name: "King's Property: ∫ f(x) = ∫ f(a + b − x)",
      intuition:
        "Reflecting the graph across the midpoint of \\([a, b]\\) does not change the area under it. So \\(\\int_a^b f(x)\\,dx = \\int_a^b f(a + b - x)\\,dx\\) — and if the reflected integrand is simpler, or combines nicely with the original, the question is over.",
      definition:
        "- \\(\\int_a^b f(x)\\,dx = \\int_a^b f(a + b - x)\\,dx\\); in particular \\(\\int_0^a f(x)\\,dx = \\int_0^a f(a - x)\\,dx\\).\n" +
        "- **Method**: write \\(I\\) with \\(x \\to a + b - x\\), call it the same \\(I\\), ADD the two expressions, simplify the sum, and divide by \\(2\\).\n" +
        "- \\(\\int_0^{\\pi/4}\\log(1 + \\tan x)\\,dx\\): with \\(x \\to \\frac{\\pi}{4} - x\\), \\(1 + \\tan\\left(\\frac{\\pi}{4} - x\\right) = \\dfrac{2}{1 + \\tan x}\\), so \\(2I = \\int_0^{\\pi/4}\\log 2\\,dx = \\dfrac{\\pi}{4}\\log 2\\) and \\(I = \\dfrac{\\pi}{8}\\log 2\\). The same question is set as \\(\\log\\dfrac{\\sin x + \\cos x}{\\cos x}\\).\n" +
        "- Handy reflections: on \\([0, \\frac{\\pi}{2}]\\), \\(\\sin \\leftrightarrow \\cos\\), \\(\\tan \\leftrightarrow \\cot\\); on \\([0, \\pi]\\), \\(\\sin x\\) is unchanged and \\(\\cos x \\to -\\cos x\\); on \\([a, b]\\) with \\(a + b = 8\\), \\(\\sqrt{x} \\leftrightarrow \\sqrt{8 - x}\\).",
      formula: {
        label: "King's property",
        latex:
          "\\int_a^b f(x)\\,dx = \\int_a^b f(a + b - x)\\,dx \\qquad \\int_0^{\\pi/4}\\log(1 + \\tan x)\\,dx = \\frac{\\pi}{8}\\log 2",
      },
      visualizationSlug: "defint-kings-reflection",
      authoredExample: {
        prompt: "Evaluate \\(\\int_0^{\\pi/2}\\log\\!\\left(\\dfrac{\\sin x}{\\sin x + \\cos x}\\right)dx\\) given that \\(\\int_0^{\\pi/2}\\log\\sin x\\,dx = -\\dfrac{\\pi}{2}\\log 2\\).",
        steps: [
          "Let \\(I = \\int_0^{\\pi/2}\\log\\dfrac{\\sin x}{\\sin x + \\cos x}\\,dx\\). Reflect \\(x \\to \\frac{\\pi}{2} - x\\): \\(I = \\int_0^{\\pi/2}\\log\\dfrac{\\cos x}{\\cos x + \\sin x}\\,dx\\).",
          "Add: \\(2I = \\int_0^{\\pi/2}\\log\\dfrac{\\sin x\\cos x}{(\\sin x + \\cos x)^2}\\,dx\\) — still awkward, so subtract instead: \\(I - I = \\int\\log\\dfrac{\\sin x}{\\cos x} = 0\\), which only confirms symmetry. Use the split: \\(I = \\int_0^{\\pi/2}\\log\\sin x\\,dx - \\int_0^{\\pi/2}\\log(\\sin x + \\cos x)\\,dx\\).",
          "For the second, \\(\\sin x + \\cos x = \\sqrt2\\sin\\left(x + \\frac{\\pi}{4}\\right)\\), and \\(\\int_0^{\\pi/2}\\log\\sin\\left(x + \\frac{\\pi}{4}\\right)dx = \\int_0^{\\pi/2}\\log\\sin u\\,du\\) over a shifted half-period, which by the same symmetry equals \\(-\\dfrac{\\pi}{2}\\log 2\\). So the second integral is \\(\\dfrac{\\pi}{2}\\log\\sqrt2 - \\dfrac{\\pi}{2}\\log 2 = -\\dfrac{\\pi}{4}\\log 2\\).",
          "\\(I = -\\dfrac{\\pi}{2}\\log 2 + \\dfrac{\\pi}{4}\\log 2 = -\\dfrac{\\pi}{4}\\log 2\\).",
        ],
        answer: "\\(-\\dfrac{\\pi}{4}\\log 2\\)",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\int_0^{\\pi/2}\\log\\tan x\\,dx\\).",
        steps: [
          "Reflect \\(x \\to \\frac{\\pi}{2} - x\\): \\(\\log\\tan x \\to \\log\\cot x = -\\log\\tan x\\), so \\(I = -I\\).",
        ],
        answer: "\\(0\\)",
      },
      practiceSet: [
        {
          prompt: "Under \\(x \\to \\pi - x\\) on \\([0, \\pi]\\), \\(\\cos x\\) becomes?",
          answer: "\\(-\\cos x\\)",
        },
        {
          prompt: "\\(\\int_0^{\\pi/4}\\log(1 + \\tan x)\\,dx = ?\\)",
          answer: "\\(\\dfrac{\\pi}{8}\\log 2\\)",
        },
        {
          prompt: "\\(1 + \\tan\\left(\\frac{\\pi}{4} - x\\right) = ?\\)",
          answer: "\\(\\dfrac{2}{1 + \\tan x}\\)",
        },
        {
          prompt: "\\(\\int_2^6 f(x)\\,dx = \\int_2^6 f(?)\\,dx\\)",
          answer: "\\(f(8 - x)\\)",
        },
      ],
      pyqExampleId: "2f90d9e5-b7b0-42dc-b886-8f28c95cada9",
      traps: [
        {
          title: "Reflecting about the wrong point",
          body:
            "On \\([\\pi/3, 2\\pi/3]\\) the reflection is \\(x \\to \\pi - x\\) (endpoints add to \\(\\pi\\)), not \\(x \\to \\frac{\\pi}{2} - x\\). Always add the two endpoints first; that sum is the only thing the substitution uses.",
        },
      ],
    },

    // 2 — f/(f+g) family
    {
      kind: "formula" as const,
      slug: "cetdi-f-over-f-plus-g-family",
      name: "The f/(f + g) Family: ∫ f(x)/(f(x) + f(a + b − x)) = (b − a)/2",
      intuition:
        "If the denominator is the numerator plus its own reflection, then adding \\(I\\) to its reflected copy gives \\(\\int 1\\,dx = b - a\\). Half of that is the answer — no integration performed at all.",
      definition:
        "- \\(\\int_a^b\\dfrac{f(x)}{f(x) + f(a + b - x)}\\,dx = \\dfrac{b - a}{2}\\).\n" +
        "- On \\([0, \\frac{\\pi}{2}]\\): \\(\\dfrac{\\cot^n x}{\\cot^n x + \\tan^n x}\\), \\(\\dfrac{1}{1 + \\cot^{101}x}\\), \\(\\dfrac{\\sqrt{\\sin x}}{\\sqrt{\\sin x} + \\sqrt{\\cos x}}\\) all give \\(\\dfrac{\\pi}{4}\\).\n" +
        "- On \\([3, 5]\\): \\(\\dfrac{\\sqrt{x}}{\\sqrt{x} + \\sqrt{8 - x}} \\to 1\\). On \\([2, 4]\\): \\(\\dfrac{\\log x^2}{\\log x^2 + \\log(6 - x)^2} \\to 1\\), after factoring \\(36 - 12x + x^2 = (6 - x)^2\\); on \\([1, 3]\\) with \\(16x^2 - 8x^3 + x^4 = x^2(4 - x)^2\\) likewise.\n" +
        "- **Weighted numerators**: \\(\\int_0^{\\pi/2}\\dfrac{a\\sin x + b\\cos x}{\\sin x + \\cos x}\\,dx = \\dfrac{\\pi}{4}(a + b)\\) — reflect, add, the numerators sum to \\((a + b)(\\sin x + \\cos x)\\).\n" +
        "- The \\(\\sin(x^2)\\) version on \\([\\sqrt{\\log 2}, \\sqrt{\\log 3}]\\): substitute \\(t = x^2\\) first so the limits become \\(\\log 2, \\log 3\\) with sum \\(\\log 6\\), then the family applies with an extra \\(\\dfrac12\\) from \\(dt = 2x\\,dx\\).",
      formula: {
        label: "The f/(f + g) result",
        latex:
          "\\int_a^b\\frac{f(x)}{f(x) + f(a + b - x)}\\,dx = \\frac{b - a}{2} \\qquad \\int_0^{\\pi/2}\\frac{a\\sin x + b\\cos x}{\\sin x + \\cos x}\\,dx = \\frac{\\pi}{4}(a + b)",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\int_1^4\\dfrac{\\sqrt{x}}{\\sqrt{x} + \\sqrt{5 - x}}\\,dx\\).",
        steps: [
          "Endpoints add to \\(5\\), and the denominator is \\(f(x) + f(5 - x)\\) with \\(f(x) = \\sqrt{x}\\).",
          "By the family result the integral is \\(\\dfrac{b - a}{2} = \\dfrac{4 - 1}{2}\\).",
        ],
        answer: "\\(\\dfrac32\\)",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\int_0^{\\pi/2}\\dfrac{5\\sin x + 3\\cos x}{\\sin x + \\cos x}\\,dx\\).",
        steps: [
          "Weighted-numerator form with \\(a = 5\\), \\(b = 3\\): \\(\\dfrac{\\pi}{4}(5 + 3)\\).",
        ],
        answer: "\\(2\\pi\\)",
      },
      practiceSet: [
        {
          prompt: "\\(\\int_0^{\\pi/2}\\dfrac{\\tan^3x}{\\tan^3x + \\cot^3x}\\,dx = ?\\)",
          answer: "\\(\\dfrac{\\pi}{4}\\)",
        },
        {
          prompt: "\\(\\int_2^5\\dfrac{\\sqrt{7 - x}}{\\sqrt{x} + \\sqrt{7 - x}}\\,dx = ?\\)",
          answer: "\\(\\dfrac32\\)",
        },
        {
          prompt: "\\(\\int_0^{\\pi/2}\\dfrac{\\sin x}{\\sin x + \\cos x}\\,dx = ?\\)",
          answer: "\\(\\dfrac{\\pi}{4}\\)",
        },
        {
          prompt: "\\(36 - 12x + x^2\\) factors as?",
          answer: "\\((6 - x)^2\\)",
        },
      ],
      pyqExampleId: "4a08773f-f087-4733-b20d-1c671f87f184",
      traps: [
        {
          title: "Missing the disguised reflection in the denominator",
          body:
            "\\(\\log(16x^2 - 8x^3 + x^4) = \\log x^2 + \\log(4 - x)^2\\): on \\([1, 3]\\) the second term IS the reflection of the first (\\(1 + 3 = 4\\)). Factor the quartic before deciding the family does not apply.",
        },
      ],
    },

    // 3 — x f(sin x) on [0, π]
    {
      kind: "formula" as const,
      slug: "cetdi-x-times-f-of-sin-x",
      name: "The x·f(sin x) Trick on [0, π]: Pull the x Out as π/2",
      intuition:
        "Reflecting \\(x \\to \\pi - x\\) leaves \\(\\sin x\\) alone and turns \\(x\\) into \\(\\pi - x\\). Adding the two copies replaces \\(x\\) by \\(\\pi\\), so the \\(x\\) factor comes out as \\(\\dfrac{\\pi}{2}\\) and an integral you can do is left.",
      definition:
        "- \\(\\int_0^\\pi x\\,f(\\sin x)\\,dx = \\dfrac{\\pi}{2}\\int_0^\\pi f(\\sin x)\\,dx\\). More generally, on any interval where \\(f(a + b - x) = f(x)\\), \\(\\int_a^b x f(x)\\,dx = \\dfrac{a + b}{2}\\int_a^b f(x)\\,dx\\).\n" +
        "- \\(\\dfrac{x\\tan x}{\\sec x + \\cos x} = \\dfrac{x\\sin x}{1 + \\cos^2x}\\): the remaining \\(\\int_0^\\pi\\dfrac{\\sin x}{1 + \\cos^2x}\\,dx = \\left[-\\tan^{-1}(\\cos x)\\right]_0^\\pi = \\dfrac{\\pi}{2}\\), so the total is \\(\\dfrac{\\pi}{2}\\cdot\\dfrac{\\pi}{2} = \\dfrac{\\pi^2}{4}\\).\n" +
        "- \\(\\int_{\\pi/3}^{2\\pi/3}\\dfrac{x}{1 + \\sin x}\\,dx\\): endpoints add to \\(\\pi\\) and \\(\\sin(\\pi - x) = \\sin x\\), so \\(2I = \\pi\\int_{\\pi/3}^{2\\pi/3}\\dfrac{dx}{1 + \\sin x} = \\pi[\\tan x - \\sec x]_{\\pi/3}^{2\\pi/3} = 2\\pi(2 - \\sqrt3)\\).\n" +
        "- \\(\\dfrac{1}{1 + \\sin x} = \\dfrac{1 - \\sin x}{\\cos^2x} = \\sec^2x - \\sec x\\tan x\\) is the standard way to integrate that piece.",
      formula: {
        label: "Pulling x out",
        latex:
          "\\int_0^\\pi x\\,f(\\sin x)\\,dx = \\frac{\\pi}{2}\\int_0^\\pi f(\\sin x)\\,dx \\qquad \\int_0^\\pi\\frac{\\sin x}{1 + \\cos^2x}\\,dx = \\frac{\\pi}{2}",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\int_0^\\pi x\\sin x\\,dx\\) using the reflection.",
        steps: [
          "Reflect \\(x \\to \\pi - x\\): \\(I = \\int_0^\\pi(\\pi - x)\\sin x\\,dx\\). Add: \\(2I = \\pi\\int_0^\\pi\\sin x\\,dx = 2\\pi\\).",
          "So \\(I = \\pi\\) — with no integration by parts.",
        ],
        answer: "\\(\\pi\\)",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\int_0^\\pi\\dfrac{x\\sin x}{1 + \\sin x}\\,dx\\).",
        steps: [
          "Pull out \\(\\dfrac{\\pi}{2}\\): \\(I = \\dfrac{\\pi}{2}\\int_0^\\pi\\dfrac{\\sin x}{1 + \\sin x}\\,dx = \\dfrac{\\pi}{2}\\int_0^\\pi\\left(1 - \\dfrac{1}{1 + \\sin x}\\right)dx\\).",
          "\\(\\int_0^\\pi\\dfrac{dx}{1 + \\sin x} = [\\tan x - \\sec x]_0^\\pi\\) — evaluate as a limit around \\(\\frac{\\pi}{2}\\), or use \\(x \\to \\frac{\\pi}{2} - x\\) to get \\(\\int_{-\\pi/2}^{\\pi/2}\\dfrac{dx}{1 + \\cos x} = [\\tan\\frac{x}{2}]_{-\\pi/2}^{\\pi/2} = 2\\).",
          "\\(I = \\dfrac{\\pi}{2}(\\pi - 2)\\).",
        ],
        answer: "\\(\\dfrac{\\pi}{2}(\\pi - 2)\\)",
      },
      practiceSet: [
        {
          prompt: "\\(\\int_0^\\pi x\\cos^2x\\,dx = ?\\)",
          answer: "\\(\\dfrac{\\pi^2}{4}\\)",
          method: "\\(\\frac{\\pi}{2}\\int_0^\\pi\\cos^2x = \\frac{\\pi}{2}\\cdot\\frac{\\pi}{2}\\).",
        },
        {
          prompt: "\\(\\dfrac{\\tan x}{\\sec x + \\cos x}\\) simplifies to?",
          answer: "\\(\\dfrac{\\sin x}{1 + \\cos^2x}\\)",
        },
        {
          prompt: "\\(\\int_0^\\pi\\dfrac{\\sin x}{1 + \\cos^2x}\\,dx = ?\\)",
          answer: "\\(\\dfrac{\\pi}{2}\\)",
        },
        {
          prompt: "On \\([\\pi/3, 2\\pi/3]\\), \\(\\int x\\,g(\\sin x)\\,dx = ? \\cdot \\int g(\\sin x)\\,dx\\)",
          answer: "\\(\\dfrac{\\pi}{2}\\)",
        },
      ],
      pyqExampleId: "4beb0228-5a64-4742-afa2-14c1f500225b",
      traps: [
        {
          title: "Using the trick with cos x",
          body:
            "\\(\\cos(\\pi - x) = -\\cos x\\), so \\(\\int_0^\\pi x\\,g(\\cos x)\\,dx\\) does NOT reduce this way unless \\(g\\) is even. The trick needs the rest of the integrand to be unchanged by the reflection.",
        },
      ],
    },

    // 4 — functional equations
    {
      kind: "formula" as const,
      slug: "cetdi-functional-symmetry-f-x-equals-f-1-minus-x",
      name: "Functional Symmetry Given in the Stem: f(x) = f(1 − x), g(x) + g(a − x) = 4",
      intuition:
        "When the stem hands you \\(f(x) = f(1 - x)\\), it is telling you the reflection leaves \\(f\\) alone. Reflect the integral, add, and the \\(x\\) or \\(g\\) factor collapses to a constant.",
      definition:
        "- \\(f(x) = f(1 - x)\\) on \\([-1, 2]\\) (endpoints add to \\(1\\)): \\(R_1 = \\int_{-1}^{2}x f(x)\\,dx = \\int_{-1}^{2}(1 - x)f(x)\\,dx\\), so \\(2R_1 = \\int_{-1}^{2}f(x)\\,dx = R_2\\) and \\(R_2 = 2R_1\\).\n" +
        "- \\(I_1 = \\int_{1-h}^{h}x f(x(1 - x))\\,dx\\), \\(I_2\\) the same without \\(x\\): the reflection \\(x \\to 1 - x\\) fixes \\(x(1 - x)\\), so \\(I_1 = I_2 - I_1\\) and \\(\\dfrac{I_1}{I_2} = \\dfrac12\\).\n" +
        "- \\(f(x) = f(a - x)\\) and \\(g(x) + g(a - x) = 4\\): \\(I = \\int_0^a f g = \\int_0^a f(4 - g)\\), so \\(2I = 4\\int_0^a f\\) and \\(I = 2\\int_0^a f\\).\n" +
        "- Read the given identity as 'the reflection is free'; the rest is the add-and-halve routine.",
      formula: {
        label: "Symmetry handed to you",
        latex:
          "f(a + b - x) = f(x) \\ \\Rightarrow\\ \\int_a^b x f(x)\\,dx = \\frac{a + b}{2}\\int_a^b f(x)\\,dx",
      },
      authoredExample: {
        prompt: "If \\(f(x) = f(4 - x)\\) for all \\(x\\) and \\(\\int_0^4 f(x)\\,dx = 6\\), find \\(\\int_0^4 x f(x)\\,dx\\).",
        steps: [
          "\\(I = \\int_0^4 x f(x)\\,dx = \\int_0^4(4 - x)f(4 - x)\\,dx = \\int_0^4(4 - x)f(x)\\,dx\\).",
          "Add: \\(2I = 4\\int_0^4 f(x)\\,dx = 24\\).",
        ],
        answer: "\\(12\\)",
      },
      selfCheckExample: {
        prompt: "If \\(g(x) + g(2 - x) = 6\\) and \\(f(x) = f(2 - x)\\) on \\([0, 2]\\) with \\(\\int_0^2 f = 5\\), find \\(\\int_0^2 f(x)g(x)\\,dx\\).",
        steps: [
          "Reflect: \\(I = \\int_0^2 f(x)g(2 - x)\\,dx = \\int_0^2 f(x)(6 - g(x))\\,dx\\).",
          "Add: \\(2I = 6\\int_0^2 f = 30\\).",
        ],
        answer: "\\(15\\)",
      },
      pyqExampleId: "bfd8197c-03e4-4369-bf09-5197f6496fd8",
      traps: [
        {
          title: "Treating R₂ as an integral of x f(x)",
          body:
            "\\(R_2\\) is the AREA under \\(f\\), i.e. \\(\\int f\\), with no \\(x\\). The relation \\(R_2 = 2R_1\\) comes from \\(2R_1 = \\int f\\); reading it the other way round gives \\(\\frac12 R_1\\), which is offered.",
        },
      ],
    },

    // 5 — 1/(1+a^x)
    {
      kind: "formula" as const,
      slug: "cetdi-one-over-one-plus-a-to-the-x",
      name: "Integrands with 1/(1 + aˣ) over Symmetric Limits",
      intuition:
        "\\(\\dfrac{1}{1 + e^{x}}\\) and \\(\\dfrac{1}{1 + e^{-x}}\\) add up to exactly \\(1\\). So over \\([-a, a]\\), reflecting \\(x \\to -x\\) and adding wipes the exponential out, leaving the even factor integrated over half the interval.",
      definition:
        "- \\(\\dfrac{1}{1 + a^{x}} + \\dfrac{1}{1 + a^{-x}} = 1\\) for any base \\(a\\) (\\(e\\), \\(2\\), anything).\n" +
        "- For even \\(f\\): \\(\\int_{-a}^{a}\\dfrac{f(x)}{1 + e^{x}}\\,dx = \\int_0^a f(x)\\,dx\\). Reflect \\(x \\to -x\\), add: \\(2I = \\int_{-a}^{a}f = 2\\int_0^a f\\).\n" +
        "- \\(\\int_{-\\pi/2}^{\\pi/2}\\dfrac{\\sin^2x}{1 + 2^{x}}\\,dx = \\int_0^{\\pi/2}\\sin^2x\\,dx = \\dfrac{\\pi}{4}\\).\n" +
        "- \\(\\int_{-\\pi/2}^{\\pi/2}\\dfrac{x^2\\cos x}{1 + e^{-x}}\\,dx = \\int_0^{\\pi/2}x^2\\cos x\\,dx = \\dfrac{\\pi^2}{4} - 2\\) (by parts twice for the last step).",
      formula: {
        label: "The 1/(1 + aˣ) cancellation",
        latex:
          "\\frac{1}{1 + a^{x}} + \\frac{1}{1 + a^{-x}} = 1 \\qquad f \\text{ even}:\\ \\int_{-a}^{a}\\frac{f(x)}{1 + e^{x}}\\,dx = \\int_0^a f(x)\\,dx",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\int_{-1}^{1}\\dfrac{x^2}{1 + e^{x}}\\,dx\\).",
        steps: [
          "\\(x^2\\) is even, so the result is \\(\\int_0^1 x^2\\,dx\\).",
          "\\(= \\dfrac13\\).",
        ],
        answer: "\\(\\dfrac13\\)",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\int_{-\\pi/4}^{\\pi/4}\\dfrac{\\cos x}{1 + 3^{x}}\\,dx\\).",
        steps: [
          "\\(\\cos x\\) is even; the integral equals \\(\\int_0^{\\pi/4}\\cos x\\,dx = \\sin\\dfrac{\\pi}{4}\\).",
        ],
        answer: "\\(\\dfrac{1}{\\sqrt2}\\)",
      },
      practiceSet: [
        {
          prompt: "\\(\\dfrac{1}{1 + 2^{x}} + \\dfrac{1}{1 + 2^{-x}} = ?\\)",
          answer: "\\(1\\)",
        },
        {
          prompt: "\\(\\int_{-2}^{2}\\dfrac{dx}{1 + e^{x}} = ?\\)",
          answer: "\\(2\\)",
          method: "\\(f = 1\\): \\(\\int_0^2 1\\,dx\\).",
        },
        {
          prompt: "\\(\\int_{-\\pi/2}^{\\pi/2}\\dfrac{\\cos^2x}{1 + e^{x}}\\,dx = ?\\)",
          answer: "\\(\\dfrac{\\pi}{4}\\)",
        },
        {
          prompt: "\\(\\int_0^{\\pi/2}x^2\\cos x\\,dx = ?\\)",
          answer: "\\(\\dfrac{\\pi^2}{4} - 2\\)",
        },
      ],
      pyqExampleId: "2e6c7630-5034-4851-9df9-7974bea8a530",
      traps: [
        {
          title: "Forgetting the halving",
          body:
            "After adding, \\(2I = \\int_{-a}^{a}f\\), which for even \\(f\\) is \\(2\\int_0^a f\\) — so \\(I = \\int_0^a f\\), not \\(2\\int_0^a f\\). The option \\(\\frac{\\pi}{2}\\) beside the correct \\(\\frac{\\pi}{4}\\) is this slip.",
        },
      ],
    },

    // 6 — inverse trig identity first
    {
      kind: "formula" as const,
      slug: "cetdi-inverse-trig-identity-before-reflecting",
      name: "An Inverse-Trig Identity Before the Reflection",
      intuition:
        "\\(\\tan^{-1}(1 - x + x^2)\\) hides \\(\\tan^{-1}x + \\tan^{-1}(1 - x)\\) inside a \\(\\cot^{-1}\\); once unpacked, the two arctangents are reflections of each other on \\([0, 1]\\) and integrate to the same thing.",
      definition:
        "- \\(\\tan^{-1}u = \\dfrac{\\pi}{2} - \\cot^{-1}u\\), and \\(\\cot^{-1}(1 - x + x^2) = \\tan^{-1}\\dfrac{1}{1 - x + x^2} = \\tan^{-1}\\dfrac{x + (1 - x)}{1 - x(1 - x)} = \\tan^{-1}x + \\tan^{-1}(1 - x)\\).\n" +
        "- So \\(\\int_0^1\\tan^{-1}(1 - x + x^2)\\,dx = \\dfrac{\\pi}{2} - \\int_0^1\\tan^{-1}x\\,dx - \\int_0^1\\tan^{-1}(1 - x)\\,dx = \\dfrac{\\pi}{2} - 2\\int_0^1\\tan^{-1}x\\,dx\\) (the last two are equal by King's property).\n" +
        "- With \\(\\int_0^1\\tan^{-1}x\\,dx = \\dfrac{\\pi}{4} - \\dfrac12\\log 2\\): the result is \\(\\dfrac{\\pi}{2} - \\dfrac{\\pi}{2} + \\log 2 = \\log 2\\).\n" +
        "- The addition formula \\(\\tan^{-1}A + \\tan^{-1}B = \\tan^{-1}\\dfrac{A + B}{1 - AB}\\) (for \\(AB < 1\\)) is the tool; look for a quadratic argument that factors as \\(1 - AB\\) with \\(A + B\\) upstairs.",
      formula: {
        label: "Unpack, then reflect",
        latex:
          "\\cot^{-1}(1 - x + x^2) = \\tan^{-1}x + \\tan^{-1}(1 - x) \\qquad \\int_0^1\\tan^{-1}(1 - x + x^2)\\,dx = \\log 2",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\int_0^1\\cot^{-1}(1 - x + x^2)\\,dx\\).",
        steps: [
          "Unpack: \\(\\cot^{-1}(1 - x + x^2) = \\tan^{-1}x + \\tan^{-1}(1 - x)\\).",
          "By King's property on \\([0, 1]\\), \\(\\int_0^1\\tan^{-1}(1 - x)\\,dx = \\int_0^1\\tan^{-1}x\\,dx\\), so the integral is \\(2\\int_0^1\\tan^{-1}x\\,dx = 2\\left(\\dfrac{\\pi}{4} - \\dfrac12\\log 2\\right)\\).",
        ],
        answer: "\\(\\dfrac{\\pi}{2} - \\log 2\\)",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\int_0^1\\left[\\tan^{-1}x + \\tan^{-1}(1 - x)\\right]dx\\) using \\(\\int_0^1\\tan^{-1}x\\,dx = \\dfrac{\\pi}{4} - \\dfrac12\\log 2\\).",
        steps: [
          "The two terms are reflections of each other on \\([0, 1]\\), so the integral is \\(2\\left(\\dfrac{\\pi}{4} - \\dfrac12\\log 2\\right)\\).",
        ],
        answer: "\\(\\dfrac{\\pi}{2} - \\log 2\\)",
      },
      pyqExampleId: "894f10d4-f0c0-4578-9f86-c475d67e28f3",
      traps: [
        {
          title: "Integrating tan⁻¹(1 − x + x²) directly",
          body:
            "By parts on the quadratic argument produces a rational integral that takes minutes. The identity is the intended route and reduces the question to a known value of \\(\\int_0^1\\tan^{-1}x\\,dx\\).",
        },
      ],
    },
  ],
  related: [
    {
      label: "Odd and Even Integrands — the symmetry about 0 that this page generalises",
      href: "/notes/mht-cet-maths/definite-integration/cetdi-odd-even-symmetry",
    },
    {
      label: "Evaluating Definite Integrals — by parts for the ∫ tan⁻¹x and ∫ x² cos x pieces",
      href: "/notes/mht-cet-maths/definite-integration/cetdi-evaluation-and-substitution",
    },
  ],
};
