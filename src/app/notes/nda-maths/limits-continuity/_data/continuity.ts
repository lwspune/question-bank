import type { SubtopicNote } from "@/app/notes/_types";

export const CONTINUITY_NOTE: SubtopicNote = {
  subtopicName:
    "Continuity and Differentiability — Piecewise, Modulus, Composed, Oscillatory",
  title: "Continuity & Differentiability",
  oneLineDefinition:
    "A function is continuous at a point when the left limit, the right limit, and the function's value all agree — and continuity is the necessary (not sufficient) condition for differentiability.",
  whyItMatters:
    "Most continuity questions either ask you to fix a parameter so the pieces meet, or to classify a discontinuity. The recurring trap is the continuous-but-not-differentiable corner, and oscillatory functions like sin(1/x) that have no limit at all.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "lim-continuity-definition",
      name: "The definition of continuity",
      intuition:
        "Continuous at \\(a\\) means the graph has no break there: the value you approach equals the value you land on. Three things must all be equal — the left limit, the right limit, and \\(f(a)\\).",
      definition:
        "\\(f\\) is **continuous at \\(a\\)** iff \\(\\lim_{x\\to a^-}f(x)=\\lim_{x\\to a^+}f(x)=f(a)\\) (all three exist and are equal). Polynomials, \\(\\sin\\), \\(\\cos\\), \\(e^x\\) are continuous everywhere; rational functions are continuous except where the denominator vanishes. A **removable** discontinuity (a 0/0 hole) is patched by defining \\(f(a)=\\lim_{x\\to a}f(x)\\).",
      authoredExample: {
        prompt: "Is \\(f(x)=\\begin{cases}\\dfrac{x^2-1}{x-1},&x\\neq 1\\\\ 2,&x=1\\end{cases}\\) continuous at \\(x=1\\)?",
        steps: [
          "\\(\\lim_{x\\to1}\\dfrac{x^2-1}{x-1}=\\lim_{x\\to1}(x+1)=2\\).",
          "This equals \\(f(1)=2\\).",
        ],
        answer: "Yes — continuous at \\(x=1\\).",
      },
      selfCheckExample: {
        prompt: "\\(f(x)=\\dfrac{x^2-25}{x-5}\\) (\\(x\\neq 5\\)) is made continuous at \\(x=5\\). What value must \\(f(5)\\) take?",
        steps: [
          "Factor: \\(\\dfrac{(x-5)(x+5)}{x-5}=x+5\\) for \\(x\\neq5\\).",
          "\\(\\lim_{x\\to5}(x+5)=10\\).",
        ],
        answer: "\\(f(5)=10\\).",
      },
      practiceSet: [
        { prompt: "Continuity at \\(a\\) needs which three equal?", answer: "LHL, RHL, and \\(f(a)\\)" },
        { prompt: "Are polynomials continuous everywhere?", answer: "Yes" },
        { prompt: "A removable discontinuity is patched by?", answer: "Setting \\(f(a)=\\lim_{x\\to a}f(x)\\)" },
        { prompt: "Where can a rational function be discontinuous?", answer: "Where the denominator is 0" },
      ],
      pyqExampleId: "e83db430-6b41-4737-861c-5241637785a2", // (x^2-9)/(x^2-2x-3) removable
    },

    {
      kind: "formula" as const,
      slug: "lim-continuity-parameters",
      name: "Finding parameters so f is continuous",
      intuition:
        "When a piecewise function carries unknown constants and is declared continuous, set the one-sided limits equal to each other and to \\(f\\) at every join. Each join gives one equation; solve the system for the unknowns.",
      definition:
        "At each join \\(x=c\\): impose \\(\\lim_{x\\to c^-}f=\\lim_{x\\to c^+}f=f(c)\\). With \\(k\\) joins and \\(k\\) unknowns you get \\(k\\) equations — solve simultaneously. (Continuity needs only value-matching; differentiability would additionally need slope-matching.)",
      authoredExample: {
        prompt: "Find \\(k\\) so \\(f(x)=\\begin{cases}kx+1,&x\\le 2\\\\ 3x-1,&x>2\\end{cases}\\) is continuous.",
        steps: [
          "Match at \\(x=2\\): \\(k(2)+1=3(2)-1\\Rightarrow 2k+1=5\\).",
          "\\(k=2\\).",
        ],
        answer: "\\(k=2\\).",
      },
      selfCheckExample: {
        prompt: "Find \\(k\\) so \\(f(x)=\\begin{cases}\\dfrac{\\sin x}{x},&x\\neq 0\\\\ k,&x=0\\end{cases}\\) is continuous at 0.",
        steps: [
          "Continuity needs \\(k=\\lim_{x\\to0}\\dfrac{\\sin x}{x}\\).",
          "\\(=1\\).",
        ],
        answer: "\\(k=1\\).",
      },
      practiceSet: [
        { prompt: "Each join contributes how many equations?", answer: "One (value-match)" },
        { prompt: "Continuity matches values; differentiability also matches?", answer: "Slopes (derivatives)" },
        { prompt: "\\(kx+1\\) & \\(3x-1\\) meet at \\(x=2\\): \\(k\\)?", answer: "\\(2\\)" },
        { prompt: "\\(\\frac{\\sin x}{x}\\) patched at 0 needs \\(k=?\\)", answer: "\\(1\\)" },
      ],
      pyqExampleId: "1264ec7b-6334-4a87-8f08-1c5678a0c360", // find k for continuity
    },

    {
      kind: "formula" as const,
      slug: "lim-discontinuity-types",
      name: "Types of discontinuity (removable, jump, oscillatory)",
      intuition:
        "Discontinuities come in flavours: a **removable** hole (the limit exists but ≠ f(a)), a **jump** (LHL and RHL both exist but differ), and an **oscillatory/essential** break where no limit exists — the classic being sin(1/x) near 0. Greatest-integer functions create jump discontinuities at every integer.",
      definition:
        "- **Removable:** \\(\\lim_{x\\to a}f\\) exists but \\(\\neq f(a)\\) (or \\(f(a)\\) undefined) — patchable.\n" +
        "- **Jump:** LHL \\(\\neq\\) RHL, both finite (e.g. \\(\\lfloor x\\rfloor\\) at integers).\n" +
        "- **Oscillatory/essential:** no limit — \\(\\sin\\tfrac1x\\) and \\(\\sin\\tfrac{1}{x^2}\\) oscillate infinitely near 0.\n" +
        "Greatest-integer-built functions like \\(\\lfloor x\\rfloor^2-\\lfloor x^2\\rfloor\\) are discontinuous at integers.",
      visualizationSlug: "lim-discontinuity-types",
      authoredExample: {
        prompt: "Classify the discontinuity of \\(f(x)=\\sin\\tfrac1x\\) at \\(x=0\\).",
        steps: [
          "As \\(x\\to0\\), \\(\\tfrac1x\\to\\pm\\infty\\) and \\(\\sin\\tfrac1x\\) oscillates between \\(-1\\) and \\(1\\) without settling.",
          "No limit exists from either side.",
        ],
        answer: "Oscillatory (essential) discontinuity.",
      },
      selfCheckExample: {
        prompt: "Is \\(\\lim_{x\\to 0}\\sin\\tfrac{1}{x^2}\\) defined? Classify.",
        steps: [
          "\\(\\tfrac{1}{x^2}\\to+\\infty\\) and the sine oscillates infinitely — no approach value.",
          "Limit does not exist.",
        ],
        answer: "No limit; oscillatory discontinuity at 0.",
      },
      practiceSet: [
        { prompt: "Removable discontinuity: limit exists but?", answer: "\\(\\neq f(a)\\)" },
        { prompt: "Jump discontinuity: LHL and RHL are?", answer: "Both finite but unequal" },
        { prompt: "Does \\(\\lim_{x\\to0}\\sin\\tfrac1x\\) exist?", answer: "No (oscillatory)" },
        { prompt: "\\(\\lfloor x\\rfloor\\) has which discontinuity at integers?", answer: "Jump" },
      ],
      pyqExampleId: "53071075-d332-4eea-95f8-553a9261ce04", // sin(1/x^2) statements
    },

    {
      kind: "formula" as const,
      slug: "lim-continuity-vs-differentiability",
      name: "Continuity vs differentiability",
      intuition:
        "Differentiability is strictly stronger: differentiable ⇒ continuous, but not the reverse. The standard counter-examples are corners (\\(|x|\\)) and steps (\\(\\lfloor x\\rfloor\\)) — continuous (for the corner) yet not differentiable. Continuity is also preserved by sums, products, and composition of continuous functions.",
      definition:
        "- **Differentiable at \\(a\\) ⇒ continuous at \\(a\\)** (not conversely). \\(|x|\\) is continuous at 0 but not differentiable (corner).\n" +
        "- **Closure:** if \\(f,g\\) are continuous at \\(a\\), so are \\(f\\pm g\\), \\(fg\\), \\(f\\circ g\\), and \\(f/g\\) (where \\(g(a)\\neq0\\)).\n" +
        "- A product can be continuous even when a factor is awkward (e.g. \\(x\\sin\\tfrac1x\\to 0\\) by the squeeze).",
      authoredExample: {
        prompt: "Is \\(f(x)=|x|\\) continuous and differentiable at \\(x=0\\)?",
        steps: [
          "Continuity: \\(\\lim_{x\\to0}|x|=0=f(0)\\) — continuous.",
          "Differentiability: left slope \\(-1\\), right slope \\(+1\\) — a corner, not differentiable.",
        ],
        answer: "Continuous but not differentiable at 0.",
      },
      selfCheckExample: {
        prompt: "If \\(f\\) is differentiable at \\(x=a\\), is it continuous there?",
        steps: [
          "Differentiability requires the limit defining \\(f'(a)\\) to exist, which forces \\(f(x)\\to f(a)\\).",
          "So differentiable \\(\\Rightarrow\\) continuous.",
        ],
        answer: "Yes — always.",
      },
      practiceSet: [
        { prompt: "Differentiable ⇒ ?", answer: "Continuous" },
        { prompt: "Continuous ⇒ differentiable?", answer: "No" },
        { prompt: "\\(|x|\\) at 0: continuous? differentiable?", answer: "Continuous yes, differentiable no" },
        { prompt: "Is \\(f\\circ g\\) continuous if \\(f,g\\) are?", answer: "Yes" },
      ],
      pyqExampleId: "6f4eb4a1-ec23-4550-9701-2ae0e01fec8e", // differentiable ⇒ continuous
    },
  ],
  related: [
    { label: "One-Sided, Greatest-Integer & Modulus Limits", href: "/notes/nda-maths/limits-continuity/lim-one-sided-special" },
    { label: "Differentiation notes", href: "/notes/nda-maths/differentiation/diff-differentiability" },
  ],
};
