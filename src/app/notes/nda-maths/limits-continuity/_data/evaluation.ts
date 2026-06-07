import type { SubtopicNote } from "@/app/notes/_types";

export const EVALUATION_NOTE: SubtopicNote = {
  subtopicName:
    "Limit Evaluation Techniques — L'Hôpital, Rationalization, Standard Forms",
  title: "Evaluating Limits — Factor, Rationalise, Standard Forms",
  oneLineDefinition:
    "The core toolkit for a 0/0 limit: direct substitution first, then factor-and-cancel, rationalise a surd, apply a standard limit, use L'Hôpital, or handle the 1^∞ form via the exponential trick.",
  whyItMatters:
    "Most limit questions are a single recognition: which tool clears the indeterminate form. Get the standard limits cold and the 0/0 questions become one or two lines.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "lim-foundations",
      name: "What a limit is — and when it exists",
      intuition:
        "A limit describes the value a function **approaches**, not necessarily its value at the point. It exists only when both sides agree — the left-hand limit equals the right-hand limit. Always try **direct substitution** first; only if that gives an indeterminate form (0/0, ∞/∞, 1^∞, …) do you need a technique.",
      definition:
        "\\(\\lim_{x\\to a}f(x)=L\\) means \\(f(x)\\) gets arbitrarily close to \\(L\\) as \\(x\\to a\\). It **exists iff** LHL \\(=\\) RHL. Algebra of limits: limits distribute over sums, products, and quotients (when denominators are non-zero). For \\(n\\to\\infty\\) ratios, the dominant term decides (e.g. \\(\\dfrac{a^n+b^n}{a^{n}}\\to\\) the larger base's contribution).",
      authoredExample: {
        prompt: "Evaluate \\(\\lim_{x\\to 2}(x^2+3x-1)\\).",
        steps: [
          "The function is a polynomial (continuous), so substitute directly.",
          "\\(2^2+3(2)-1=4+6-1=9\\).",
        ],
        answer: "\\(9\\).",
      },
      selfCheckExample: {
        prompt: "Does \\(\\lim_{x\\to 0}\\dfrac{|x|}{x}\\) exist?",
        steps: [
          "RHL \\(=\\lim_{x\\to 0^+}\\dfrac{x}{x}=1\\); LHL \\(=\\lim_{x\\to 0^-}\\dfrac{-x}{x}=-1\\).",
          "LHL \\(\\neq\\) RHL.",
        ],
        answer: "No — the two-sided limit does not exist.",
      },
      practiceSet: [
        { prompt: "A limit exists iff?", answer: "LHL \\(=\\) RHL" },
        { prompt: "First thing to try on any limit?", answer: "Direct substitution" },
        { prompt: "Is \\(\\lim_{x\\to a}f(x)\\) necessarily \\(f(a)\\)?", answer: "Only if \\(f\\) is continuous at \\(a\\)" },
        { prompt: "\\(\\lim_{x\\to 1}(x^2+1)\\)?", answer: "\\(2\\)" },
      ],
    },

    {
      kind: "formula" as const,
      slug: "lim-algebraic-zero-over-zero",
      name: "0/0 by factoring, cancelling, and rationalising",
      intuition:
        "When substitution gives 0/0, the zero factor is shared by numerator and denominator. **Factor and cancel** it (often via \\(x^n-a^n\\)), or — when surds are involved — **rationalise** by multiplying by the conjugate to expose the cancelling factor.",
      definition:
        "- **Factor/cancel:** use \\(x^n-a^n=(x-a)(x^{n-1}+\\cdots+a^{n-1})\\); the standard result \\(\\lim_{x\\to a}\\dfrac{x^n-a^n}{x-a}=n\\,a^{n-1}\\).\n" +
        "- **Rationalise:** multiply numerator and denominator by the conjugate of the surd to turn \\(\\sqrt{A}-\\sqrt{B}\\) into \\(A-B\\), then cancel.",
      authoredExample: {
        prompt: "Evaluate \\(\\lim_{x\\to 2}\\dfrac{x^2-4}{x-2}\\).",
        steps: [
          "Factor: \\(\\dfrac{(x-2)(x+2)}{x-2}=x+2\\) for \\(x\\neq 2\\).",
          "Substitute: \\(2+2=4\\).",
        ],
        answer: "\\(4\\).",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\lim_{x\\to 1}\\dfrac{x^9-1}{x^3-1}\\).",
        steps: [
          "Both \\(\\to 0\\). Use \\(\\lim_{x\\to1}\\dfrac{x^n-1}{x-1}=n\\): the ratio is \\(\\dfrac{9}{3}\\).",
          "\\(=3\\).",
        ],
        answer: "\\(3\\).",
      },
      practiceSet: [
        { prompt: "\\(\\lim_{x\\to a}\\dfrac{x^n-a^n}{x-a}=?\\)", answer: "\\(n\\,a^{n-1}\\)" },
        { prompt: "Tool for \\(\\dfrac{\\sqrt{x}-\\sqrt{a}}{x-a}\\)?", answer: "Rationalise (multiply by the conjugate)" },
        { prompt: "\\(\\lim_{x\\to1}\\dfrac{x^4-1}{x-1}\\)?", answer: "\\(4\\)" },
        { prompt: "\\(\\lim_{x\\to1}\\dfrac{x^9-1}{x^3-1}\\)?", answer: "\\(3\\)" },
      ],
      pyqExampleId: "1909fbfe-3e4f-4cc1-b54d-d167f681a59f", // x^9-1 / x^3-1
    },

    {
      kind: "reference" as const,
      slug: "lim-standard-limits",
      name: "The standard limits to memorise",
      intuition:
        "A fixed list of limits resolves most trigonometric, exponential, and logarithmic 0/0 forms instantly. Reduce the problem to one of these (often by multiplying/dividing by the right variable) and read off the value.",
      definition:
        "Each holds as \\(x\\to 0\\) (angles in radians). For a scaled argument, the factor scales too — e.g. \\(\\lim_{x\\to0}\\dfrac{\\sin ax}{x}=a\\).",
      table: {
        columns: ["Limit (as x → 0)", "Value"],
        rows: [
          { cells: ["sin x / x", "1"] },
          { cells: ["tan x / x", "1"] },
          { cells: ["(1 − cos x) / x²", "1/2"] },
          { cells: ["log(1 + x) / x", "1"] },
          { cells: ["(eˣ − 1) / x", "1"] },
          { cells: ["(aˣ − 1) / x", "ln a"] },
          { cells: ["(1 + x)^(1/x)", "e"] },
        ],
        caption: "Radians only. Scale the argument and the value scales: sin(ax)/x → a.",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\lim_{x\\to 0}\\dfrac{10^{\\sin x}-1}{\\tan x}\\).",
        steps: [
          "Rewrite: \\(\\dfrac{10^{\\sin x}-1}{\\sin x}\\cdot\\dfrac{\\sin x}{\\tan x}\\).",
          "First factor \\(\\to\\ln 10\\); second \\(\\to\\cos x\\to 1\\).",
        ],
        answer: "\\(\\ln 10\\).",
      },
      practiceSet: [
        { prompt: "\\(\\lim_{x\\to0}\\dfrac{\\sin x}{x}\\)?", answer: "\\(1\\)" },
        { prompt: "\\(\\lim_{x\\to0}\\dfrac{1-\\cos x}{x^2}\\)?", answer: "\\(\\tfrac12\\)" },
        { prompt: "\\(\\lim_{x\\to0}\\dfrac{a^x-1}{x}\\)?", answer: "\\(\\ln a\\)" },
        { prompt: "\\(\\lim_{x\\to0}\\dfrac{\\sin 5x}{x}\\)?", answer: "\\(5\\)" },
      ],
      pyqExampleId: "3571c999-e231-43b5-af03-e7dd2dc1619c", // (10^sinx -1)/tan x
    },

    {
      kind: "formula" as const,
      slug: "lim-lhopital",
      name: "L'Hôpital's rule for 0/0 and ∞/∞",
      intuition:
        "When a limit is genuinely 0/0 or ∞/∞ and factoring is awkward, differentiate the top and bottom **separately** and try the limit again. Repeat if it's still indeterminate.",
      definition:
        "If \\(\\lim\\dfrac{f}{g}\\) is \\(\\tfrac00\\) or \\(\\tfrac{\\infty}{\\infty}\\) and \\(f,g\\) are differentiable, then \\(\\lim\\dfrac{f}{g}=\\lim\\dfrac{f'}{g'}\\) (provided the latter exists). Only apply it to a true indeterminate form — never to a determinate one. Series expansion (\\(e^x=1+x+\\tfrac{x^2}{2}+\\cdots\\), \\(\\sin x=x-\\tfrac{x^3}{6}+\\cdots\\)) often does the same job faster.",
      authoredExample: {
        prompt: "Evaluate \\(\\lim_{x\\to 0}\\dfrac{\\sin x - x}{x^3}\\).",
        steps: [
          "It is 0/0. Differentiate top and bottom: \\(\\dfrac{\\cos x-1}{3x^2}\\) (still 0/0).",
          "Again: \\(\\dfrac{-\\sin x}{6x}\\to-\\tfrac16\\) (using \\(\\sin x/x\\to 1\\)).",
        ],
        answer: "\\(-\\tfrac16\\).",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\lim_{x\\to 0}\\dfrac{e^x-(1+x)}{x^2}\\).",
        steps: [
          "0/0. Expand \\(e^x=1+x+\\tfrac{x^2}{2}+\\cdots\\): numerator \\(=\\tfrac{x^2}{2}+\\cdots\\).",
          "Divide by \\(x^2\\): \\(\\to\\tfrac12\\).",
        ],
        answer: "\\(\\tfrac12\\).",
      },
      practiceSet: [
        { prompt: "L'Hôpital applies to which forms?", answer: "\\(\\tfrac00\\) and \\(\\tfrac{\\infty}{\\infty}\\)" },
        { prompt: "After differentiating top & bottom, then?", answer: "Re-try the limit (repeat if still indeterminate)" },
        { prompt: "First-order expansion of \\(e^x\\)?", answer: "\\(1+x+\\tfrac{x^2}{2}+\\cdots\\)" },
        { prompt: "Can you use it on \\(\\tfrac{2}{3}\\)?", answer: "No — only on indeterminate forms" },
      ],
      pyqExampleId: "3ff1f370-7d46-4658-b27e-caa8892a9b14", // (e^x-(1+x))/x^2
    },

    {
      kind: "formula" as const,
      slug: "lim-one-power-infinity",
      name: "The 1^∞ form",
      intuition:
        "A limit of the shape \\([f(x)]^{g(x)}\\) where \\(f\\to 1\\) and \\(g\\to\\infty\\) is the indeterminate \\(1^\\infty\\). Take logs (or use the standard shortcut) to convert it to a 0·∞ product, which becomes an ordinary limit in the exponent.",
      definition:
        "If \\(f(x)\\to 1\\) and \\(g(x)\\to\\infty\\), then \\(\\lim [f(x)]^{g(x)}=e^{\\,\\lim\\, g(x)\\,[f(x)-1]}\\). Equivalently, \\(L=e^{\\lim g\\ln f}\\) — take \\(\\ln\\), evaluate the resulting product, then exponentiate.",
      formula: {
        label: "The 1^∞ shortcut",
        latex: "\\lim [f(x)]^{g(x)} = e^{\\,\\lim\\, g(x)\\,[f(x)-1]}\\quad (f\\to 1,\\ g\\to\\infty)",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\lim_{x\\to 0}(1+2x)^{1/x}\\).",
        steps: [
          "Form \\(1^\\infty\\): use \\(L=e^{\\lim g[f-1]}\\) with \\(f-1=2x\\), \\(g=\\tfrac1x\\).",
          "Exponent \\(=\\lim_{x\\to0}\\tfrac{1}{x}\\cdot 2x=2\\).",
        ],
        answer: "\\(e^2\\).",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\lim_{x\\to\\infty}\\left(1+\\tfrac{3}{x}\\right)^{x}\\).",
        steps: [
          "\\(1^\\infty\\) with \\(f-1=\\tfrac3x\\), \\(g=x\\).",
          "Exponent \\(=\\lim x\\cdot\\tfrac3x=3\\).",
        ],
        answer: "\\(e^3\\).",
      },
      practiceSet: [
        { prompt: "\\(\\lim[f]^{g}\\) with \\(f\\to1,g\\to\\infty\\) equals?", answer: "\\(e^{\\lim g(f-1)}\\)" },
        { prompt: "\\(\\lim_{x\\to0}(1+x)^{1/x}\\)?", answer: "\\(e\\)" },
        { prompt: "\\(\\lim_{x\\to\\infty}(1+\\tfrac2x)^{x}\\)?", answer: "\\(e^2\\)" },
        { prompt: "What indeterminate form is this?", answer: "\\(1^\\infty\\)" },
      ],
      pyqExampleId: "2dfbd7ce-ce98-403a-b988-561443643e1a", // f(x)^{1/g(x)}, 1^∞
    },
  ],
  related: [
    { label: "One-Sided, Greatest-Integer & Modulus Limits", href: "/notes/nda-maths/limits-continuity/lim-one-sided-special" },
    { label: "NDA Maths strategy guide", href: "/guide/nda-maths" },
  ],
};
