import type { SubtopicNote } from "@/app/notes/_types";

export const PROPERTIES_NOTE: SubtopicNote = {
  subtopicName: "Properties of Definite Integrals — Symmetry, King's, Odd/Even",
  title: "Properties — King's, Symmetry and Standard Results",
  oneLineDefinition:
    "The properties of definite integrals — above all King's property and odd/even symmetry — evaluate integrals you could never antidifferentiate, by adding an integral to its own mirror image.",
  whyItMatters:
    "This is the heart of the chapter: 32 PYQs and most of its HARD questions. " +
    "One technique dominates — King's property, the 'replace x by (a−x) and add' move that collapses a fearsome integrand into a constant. " +
    "Add odd/even symmetry, a short list of standard results, and you can do almost every Properties question by inspection.",
  concepts: [
    // 1 — King's property
    {
      kind: "formula" as const,
      slug: "kings-property",
      name: "King's property — the reflection trick",
      intuition:
        "The single most powerful definite-integral move: an integral from 0 to a is unchanged if you replace x by (a−x). When the integrand has a symmetric structure, calling the integral I and adding it to its reflected form makes the messy parts cancel, leaving a trivial integral — you get 2I = something easy.",
      definition:
        "King's property and the 2I technique:\n" +
        "- **King's property**: \\(\\displaystyle\\int_0^a f(x)\\,dx = \\int_0^a f(a-x)\\,dx\\) (and \\(\\int_b^c f(x)\\,dx=\\int_b^c f(b+c-x)\\,dx\\)).\n" +
        "- **The 2I move**: let \\(I=\\int_0^a f(x)\\,dx\\); write a second copy with \\(x\\to a-x\\); ADD them so the denominators match. Often \\(2I=\\int_0^a 1\\,dx = a\\).\n" +
        "- Classic family: \\(\\displaystyle\\int_0^a \\frac{f(x)}{f(x)+f(a-x)}\\,dx = \\frac{a}{2}\\).\n" +
        "- Works on \\(\\int_0^{\\pi/2}\\frac{\\sin x}{\\sin x+\\cos x}\\,dx = \\frac{\\pi}{4}\\) and the whole \\(\\frac{a\\cos x+b\\sin x}{\\sin x+\\cos x}\\) family.",
      visualizationSlug: "defint-kings-reflection",
      formula: {
        label: "King's property and its companions",
        latex:
          "\\int_0^a f(x)\\,dx = \\int_0^a f(a-x)\\,dx \\qquad " +
          "\\int_a^b f(x)\\,dx = \\int_a^b f(a+b-x)\\,dx \\qquad " +
          "\\int_0^{2a} f(x)\\,dx = \\int_0^a \\big[f(x)+f(2a-x)\\big]\\,dx \\qquad " +
          "\\int_0^a \\frac{f(x)}{f(x)+f(a-x)}\\,dx = \\frac{a}{2}",
      },
      authoredExample: {
        prompt:
          "Evaluate \\(I=\\displaystyle\\int_0^{\\pi/2}\\frac{\\sin x}{\\sin x+\\cos x}\\,dx\\).",
        steps: [
          "Apply \\(x\\to \\tfrac{\\pi}{2}-x\\): \\(\\sin x\\to\\cos x\\), \\(\\cos x\\to\\sin x\\), so \\(I=\\int_0^{\\pi/2}\\frac{\\cos x}{\\cos x+\\sin x}\\,dx\\).",
          "Add the two forms: \\(2I=\\int_0^{\\pi/2}\\frac{\\sin x+\\cos x}{\\sin x+\\cos x}\\,dx=\\int_0^{\\pi/2}1\\,dx=\\frac{\\pi}{2}\\).",
          "So \\(I=\\frac{\\pi}{4}\\).",
        ],
        answer: "\\(\\frac{\\pi}{4}\\).",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(I=\\displaystyle\\int_0^{\\pi}\\frac{x\\sin x}{1+\\cos^2x}\\,dx\\).",
        steps: [
          "Apply \\(x\\to\\pi-x\\): \\(\\sin x\\) and \\(\\cos^2x\\) are unchanged, \\(x\\to\\pi-x\\). So \\(I=\\int_0^{\\pi}\\frac{(\\pi-x)\\sin x}{1+\\cos^2x}\\,dx\\).",
          "Add the two forms: \\(2I=\\int_0^{\\pi}\\frac{\\pi\\sin x}{1+\\cos^2x}\\,dx\\).",
          "Substitute \\(u=\\cos x\\): \\(2I=\\pi\\int_{-1}^{1}\\frac{du}{1+u^2}=\\pi[\\tan^{-1}u]_{-1}^{1}=\\pi\\cdot\\frac{\\pi}{2}\\). So \\(I=\\frac{\\pi^2}{4}\\).",
        ],
        answer: "\\(\\frac{\\pi^2}{4}\\).",
      },
      practiceSet: [
        { prompt: "\\(\\int_0^a \\frac{f(a-x)}{f(x)+f(a-x)}\\,dx = ?\\)", answer: "\\(a/2\\)", method: "King's 2I move" },
        { prompt: "\\(\\int_0^{\\pi/2}\\frac{\\cos x}{\\sin x+\\cos x}\\,dx = ?\\)", answer: "\\(\\pi/4\\)" },
        { prompt: "King's property: \\(\\int_0^a f(x)\\,dx = ?\\)", answer: "\\(\\int_0^a f(a-x)\\,dx\\)" },
        { prompt: "\\(\\int_0^1 \\ln\\!\\big(\\tfrac{1-x}{x}\\big)dx = ?\\)", answer: "0", method: "\\(x\\to 1-x\\) flips the log's sign, so \\(2I=0\\)" },
      ],
      pyqExampleId: "c8509c74-fbf1-4366-9500-a27f560e3deb", // (a+sinx)/2(a+sinx+cosx)
      traps: [
        {
          title: "Add the reflected form — don't just substitute and stop",
          body:
            "King's property by itself only rewrites \\(I\\); the magic is ADDING the original and the reflected integral so the numerator becomes the denominator. If you substitute and forget to add, you go in a circle.",
        },
        {
          title: "King's reflection only works with the matching limits",
          body:
            "The reflection is \\(x\\to a+b-x\\) for limits \\([a,b]\\) — NOT a fixed \\(x\\to a-x\\). On \\(\\int_2^5 f\\,dx\\) you must replace \\(x\\) by \\(7-x\\), not \\(2-x\\). Using the wrong reflection sends the limits outside the interval and the cancellation fails.",
        },
      ],
    },

    // 2 — symmetry odd/even
    {
      kind: "formula" as const,
      slug: "symmetry-odd-even",
      name: "Odd/even symmetry over a symmetric interval",
      intuition:
        "On an interval symmetric about zero, an odd function integrates to zero (the left half cancels the right) and an even function integrates to twice the half. A bonus property handles integrands divided by 1 plus an exponential.",
      definition:
        "Symmetry rules on \\([-a,a]\\):\n" +
        "- **Odd** \\(f(-x)=-f(x)\\): \\(\\displaystyle\\int_{-a}^{a} f(x)\\,dx = 0\\).\n" +
        "- **Even** \\(f(-x)=f(x)\\): \\(\\displaystyle\\int_{-a}^{a} f(x)\\,dx = 2\\int_0^{a} f(x)\\,dx\\).\n" +
        "- **The \\(1+c^x\\) property**: for even \\(f\\), \\(\\displaystyle\\int_{-a}^{a}\\frac{f(x)}{1+c^{x}}\\,dx = \\frac12\\int_{-a}^{a} f(x)\\,dx = \\int_0^a f(x)\\,dx\\).\n" +
        "- Also \\(\\displaystyle\\int_{-a}^{a} h(x)\\,dx = \\int_0^a [h(x)+h(-x)]\\,dx\\).",
      visualizationSlug: "defint-area-region",
      formula: {
        label: "Odd/even symmetry over a symmetric interval",
        latex:
          "\\int_{-a}^{a} f(x)\\,dx = 0 \\;\\;(f\\text{ odd}) \\qquad " +
          "\\int_{-a}^{a} f(x)\\,dx = 2\\int_0^a f(x)\\,dx \\;\\;(f\\text{ even}) \\qquad " +
          "\\int_{-a}^{a} \\frac{f(x)}{1+c^{x}}\\,dx = \\int_0^a f(x)\\,dx \\;\\;(f\\text{ even})",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\displaystyle\\int_{-\\pi/4}^{\\pi/4} (\\sin x - \\tan x)\\,dx\\).",
        steps: [
          "Check parity: \\(\\sin(-x)=-\\sin x\\) and \\(\\tan(-x)=-\\tan x\\), so the integrand is odd.",
          "An odd function over a symmetric interval integrates to 0.",
        ],
        answer: "0.",
      },
      selfCheckExample: {
        prompt:
          "Evaluate \\(\\displaystyle\\int_{-\\pi/2}^{\\pi/2}(e^{\\cos x}\\sin x + e^{\\sin x}\\cos x)\\,dx\\).",
        steps: [
          "First term: \\(e^{\\cos x}\\sin x\\) is odd (cos even, sin odd), so its integral is 0.",
          "Second term: substitute \\(u=\\sin x\\), \\(du=\\cos x\\,dx\\), limits \\(-1\\) to \\(1\\): \\(\\int_{-1}^{1}e^u\\,du=e-e^{-1}\\).",
          "Total \\(= 0 + (e-e^{-1}) = \\frac{e^2-1}{e}\\).",
        ],
        answer: "\\(\\frac{e^2-1}{e}\\).",
      },
      practiceSet: [
        { prompt: "\\(\\int_{-a}^{a}\\) of an odd function?", answer: "0" },
        { prompt: "\\(\\int_{-2}^{2} x^3\\cos x\\,dx = ?\\)", answer: "0", method: "odd × even = odd" },
        { prompt: "\\(\\int_{-1}^{1}\\frac{x^2}{1+5^x}\\,dx = ?\\)", answer: "\\(\\int_0^1 x^2\\,dx = 1/3\\)", method: "the \\(1+c^x\\) property" },
      ],
      pyqExampleId: "0886bac8-80a0-4464-ad51-5f0b1382d20b", // e^cosx sinx + e^sinx cosx
      traps: [
        {
          title: "Check parity of the WHOLE integrand",
          body:
            "A sum can have one odd part and one non-odd part. Split it: the odd piece dies, but the rest must still be integrated. Don't declare the whole integral zero just because one term is odd.",
        },
      ],
    },

    // 3 — standard results and reductions (reference-ish but formula variant with worked example)
    {
      kind: "formula" as const,
      slug: "standard-results-and-reductions",
      name: "Standard results and trig reductions",
      intuition:
        "A handful of definite integrals recur so often they are worth knowing as results, and a few power-reduction identities turn an un-integrable trig power into something elementary. Recognising these saves the whole derivation.",
      definition:
        "Results and reductions to memorise:\n" +
        "- \\(\\displaystyle\\int_0^{\\pi}\\frac{dx}{1+\\sin^2x} = \\int_0^{\\pi}\\frac{dx}{1+\\cos^2x} = \\frac{\\pi}{\\sqrt2}\\).\n" +
        "- \\(\\sin^4x+\\cos^4x = \\dfrac{3+\\cos 4x}{4}\\), so \\(\\int_0^{\\pi}(\\sin^4x+\\cos^4x)\\,dx=\\tfrac{3\\pi}{4}\\).\n" +
        "- \\(1+\\cos\\theta = 2\\cos^2\\tfrac{\\theta}{2}\\), \\(1-\\cos\\theta=2\\sin^2\\tfrac{\\theta}{2}\\) (half-angle).\n" +
        "- **Beta function**: \\(\\displaystyle\\int_0^1 x^{m}(1-x)^{n}\\,dx = \\frac{m!\\,n!}{(m+n+1)!}\\).",
      formula: {
        label: "Standard definite-integral results",
        latex:
          "\\int_0^{\\pi}\\frac{dx}{1+\\sin^2x} = \\frac{\\pi}{\\sqrt2} \\qquad " +
          "\\int_0^1 x^{m}(1-x)^{n}\\,dx = \\frac{m!\\,n!}{(m+n+1)!} \\qquad " +
          "\\int_0^{\\pi/2}\\sin^{2}x\\,dx = \\int_0^{\\pi/2}\\cos^{2}x\\,dx = \\frac{\\pi}{4}",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\displaystyle\\int_0^1 x^2(1-x)^3\\,dx\\) using the Beta result.",
        steps: [
          "Here \\(m=2,\\ n=3\\).",
          "Beta function: \\(\\frac{2!\\,3!}{(2+3+1)!} = \\frac{2\\cdot 6}{720} = \\frac{12}{720}\\).",
        ],
        answer: "\\(\\frac{1}{60}\\).",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\displaystyle\\int_0^{\\pi/2}\\frac{d\\theta}{1+\\cos\\theta}\\).",
        steps: [
          "Use \\(1+\\cos\\theta = 2\\cos^2\\tfrac{\\theta}{2}\\).",
          "Integral \\(= \\frac12\\int_0^{\\pi/2}\\sec^2\\tfrac{\\theta}{2}\\,d\\theta = \\big[\\tan\\tfrac{\\theta}{2}\\big]_0^{\\pi/2}=\\tan\\tfrac{\\pi}{4}-0\\).",
        ],
        answer: "1.",
      },
      practiceSet: [
        { prompt: "\\(\\int_0^{\\pi}\\frac{dx}{1+\\sin^2x} = ?\\)", answer: "\\(\\pi/\\sqrt2\\)" },
        { prompt: "Write \\(1-\\cos\\theta\\) as a half-angle square.", answer: "\\(2\\sin^2(\\theta/2)\\)" },
        { prompt: "\\(\\int_0^1 x(1-x)^9\\,dx = ?\\)", answer: "\\(\\frac{1!\\,9!}{11!}=\\frac{1}{110}\\)", method: "Beta function" },
      ],
      pyqExampleId: "e8ec2159-34f8-4930-b8b5-2247faebd00a", // ∫₀^{π/2} dθ/(1+cosθ) = 1
      traps: [
        {
          title: "Reduce the power BEFORE integrating",
          body:
            "Don't integrate \\(\\sin^4x\\) and \\(\\cos^4x\\) separately — combine them via \\(\\sin^4x+\\cos^4x=\\frac{3+\\cos4x}{4}\\) first. The reduction turns a tedious computation into a one-line answer.",
        },
      ],
    },

    // 4 — direct evaluation
    {
      kind: "formula" as const,
      slug: "direct-evaluation",
      name: "Direct evaluation — simplify, then integrate",
      intuition:
        "Many definite integrals are just antiderivative-and-substitute once you simplify the integrand: factor a trig expression, apply by-parts, or substitute. This concept is where the Indefinite Integration toolkit meets definite limits — the only new step is plugging in the bounds.",
      definition:
        "Simplification routes (then apply the limits):\n" +
        "- **Trig factoring**: \\(\\tan^3x+\\tan x = \\tan x\\,\\sec^2x\\), which integrates to \\(\\tfrac{\\tan^2x}{2}\\).\n" +
        "- **By-parts** for products: \\(\\int x\\ln x\\,dx\\), \\(\\int e^x\\sin x\\,dx = \\tfrac{e^x(\\sin x-\\cos x)}{2}\\).\n" +
        "- **Substitution**: \\(\\int_0^{\\pi/2}e^{\\sin x}\\cos x\\,dx\\) via \\(u=\\sin x\\).\n" +
        "(For the full substitution / by-parts technique, see the Indefinite Integration notes — here just carry the limits through.)",
      authoredExample: {
        prompt: "Evaluate \\(\\displaystyle\\int_0^{\\pi/2} e^{\\sin x}\\cos x\\,dx\\).",
        steps: [
          "Substitute \\(u=\\sin x\\), \\(du=\\cos x\\,dx\\); limits \\(x:0\\to\\tfrac{\\pi}{2}\\) give \\(u:0\\to 1\\).",
          "Integral \\(=\\int_0^1 e^u\\,du = [e^u]_0^1 = e-1\\).",
        ],
        answer: "\\(e-1\\).",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\displaystyle\\int_0^{\\pi/4}(\\tan^3x+\\tan x)\\,dx\\).",
        steps: [
          "Factor: \\(\\tan^3x+\\tan x = \\tan x(\\tan^2x+1)=\\tan x\\,\\sec^2x\\).",
          "Substitute \\(t=\\tan x\\) (or recognise the antiderivative \\(\\tfrac{\\tan^2x}{2}\\)).",
          "\\(\\big[\\tfrac{\\tan^2x}{2}\\big]_0^{\\pi/4} = \\tfrac{1}{2}-0\\).",
        ],
        answer: "\\(\\frac12\\).",
      },
      practiceSet: [
        { prompt: "Simplify \\(\\tan^3x+\\tan x\\).", answer: "\\(\\tan x\\,\\sec^2x\\)" },
        { prompt: "\\(\\int e^x\\sin x\\,dx = ?\\)", answer: "\\(\\frac{e^x(\\sin x-\\cos x)}{2}\\)" },
        { prompt: "\\(\\int_1^e x\\ln x\\,dx = ?\\)", answer: "\\(\\frac{e^2+1}{4}\\)", method: "by-parts, \\([\\frac{x^2\\ln x}{2}-\\frac{x^2}{4}]_1^e\\)" },
      ],
      pyqExampleId: "18b9d352-2bc4-4ff8-a939-17eb2e790ea5", // tan³+tan
      traps: [
        {
          title: "Transform the limits when you substitute",
          body:
            "When you substitute \\(u=g(x)\\) in a definite integral, change the limits to \\(g(a)\\) and \\(g(b)\\) and you never need to back-substitute. Forgetting to convert the limits is the classic definite-integral error.",
        },
      ],
    },
  ],
};
