import type { SubtopicNote } from "@/app/notes/_types";

export const FOUNDATIONS_NOTE: SubtopicNote = {
  subtopicName: "Foundations and Standard Formulae",
  title: "Foundations — Antiderivatives, the +C, and Standard Formulae",
  oneLineDefinition:
    "Integration is differentiation run backwards: given a rate of change, recover the function — plus an unknown constant C that no derivative can pin down.",
  whyItMatters:
    "Before any technique, you need three reflexes: recognise that an indefinite integral is a FAMILY of functions (the +C), recall the standard-formula table cold, " +
    "and pre-process the integrand with algebra (factor, divide, split) before reaching for a method. " +
    "5 PYQs sit directly here — boundary-value problems where a constant must be solved for, and 'reconstruct the function then integrate' shapes — but these reflexes underpin all 121 questions in the chapter.",
  concepts: [
    // 1 — antiderivative + C (foundation, SVG)
    {
      kind: "formula" as const,
      slug: "antiderivative-and-constant",
      name: "Antiderivative and the Constant of Integration",
      visualizationSlug: "antiderivative-family",
      intuition:
        "Differentiation turns a function into its slope. Integration runs that backwards — given the slope everywhere, find the function. " +
        "But a constant has zero slope, so ANY vertical shift of a correct answer is also correct. That unknown shift is the +C.",
      definition:
        "A function \\(F\\) is an **antiderivative** of \\(f\\) if \\(F'(x) = f(x)\\). " +
        "The **indefinite integral** \\(\\int f(x)\\,dx = F(x) + C\\) denotes the whole family of antiderivatives, where \\(C\\) is an arbitrary constant. " +
        "Because \\(\\dfrac{d}{dx}[F(x) + C] = f(x)\\) for every constant \\(C\\), the constant can never be recovered from \\(f\\) alone — you need an extra condition (a boundary value) to fix it.",
      formula: {
        label: "Indefinite integral",
        latex: "\\int f(x)\\,dx = F(x) + C \\quad\\text{where}\\quad F'(x) = f(x)",
        symbols: [
          { symbol: "F(x)", meaning: "any one antiderivative of \\(f\\)" },
          { symbol: "C", meaning: "arbitrary constant of integration" },
        ],
      },
      authoredExample: {
        prompt:
          "Verify that \\(\\dfrac{x^2}{2} + 5\\) and \\(\\dfrac{x^2}{2} - 3\\) are both antiderivatives of \\(f(x) = x\\).",
        steps: [
          "Differentiate the first: \\(\\dfrac{d}{dx}\\!\\left(\\dfrac{x^2}{2} + 5\\right) = x + 0 = x\\). ✓",
          "Differentiate the second: \\(\\dfrac{d}{dx}\\!\\left(\\dfrac{x^2}{2} - 3\\right) = x + 0 = x\\). ✓",
          "Both give back \\(f(x) = x\\); they differ only by a constant. So \\(\\int x\\,dx = \\dfrac{x^2}{2} + C\\).",
        ],
        answer: "Both are valid antiderivatives — \\(\\int x\\,dx = \\dfrac{x^2}{2} + C\\).",
      },
      traps: [
        {
          title: "Never drop the +C on an indefinite integral",
          body:
            "An indefinite integral with no \\(+C\\) is incomplete. MHT-CET options are written so that the 'no constant' version and a wrong-constant version both appear — only \\(+C\\) (or \\(+k\\)) is correct.",
        },
      ],
    },

    // 2 — standard formulae (foundation)
    {
      kind: "formula" as const,
      slug: "standard-formulae-table",
      name: "The Standard-Formula Table",
      intuition:
        "Roughly a dozen integrals are the alphabet of the whole chapter. Every technique — substitution, parts, partial fractions — exists only to REDUCE a hard integral to one of these. Know them as reflexes.",
      definition:
        "The integrals you must recall instantly:\n" +
        "- \\(\\int x^n\\,dx = \\dfrac{x^{n+1}}{n+1} + C\\) for \\(n \\neq -1\\)\n" +
        "- \\(\\int \\dfrac{1}{x}\\,dx = \\log|x| + C\\)\n" +
        "- \\(\\int e^x\\,dx = e^x + C\\), and \\(\\int a^x\\,dx = \\dfrac{a^x}{\\log a} + C\\)\n" +
        "- \\(\\int \\sin x\\,dx = -\\cos x + C\\), \\(\\int \\cos x\\,dx = \\sin x + C\\)\n" +
        "- \\(\\int \\sec^2 x\\,dx = \\tan x + C\\), \\(\\int \\csc^2 x\\,dx = -\\cot x + C\\)\n" +
        "- \\(\\int \\dfrac{dx}{1+x^2} = \\tan^{-1}x + C\\), \\(\\int \\dfrac{dx}{\\sqrt{1-x^2}} = \\sin^{-1}x + C\\)",
      formula: {
        label: "Power rule (the most-used row)",
        latex: "\\int x^n\\,dx = \\dfrac{x^{n+1}}{n+1} + C \\quad (n \\neq -1)",
        symbols: [
          { symbol: "n \\neq -1", meaning: "the exclusion that makes \\(\\int x^{-1} = \\log|x|\\) a separate row" },
        ],
      },
      authoredExample: {
        prompt: "Integrate \\(\\displaystyle\\int\\left(3x^2 + \\dfrac{1}{x} + e^x\\right)dx\\).",
        steps: [
          "Apply the table term by term (linearity — see the next concept).",
          "\\(\\int 3x^2\\,dx = x^3\\); \\(\\int \\dfrac{1}{x}\\,dx = \\log|x|\\); \\(\\int e^x\\,dx = e^x\\).",
          "Add and attach one constant.",
        ],
        answer: "\\(x^3 + \\log|x| + e^x + C\\)",
      },
      traps: [
        {
          title: "The power rule excludes \\(n = -1\\)",
          body:
            "\\(\\int x^{-1}\\,dx\\) is NOT \\(\\dfrac{x^0}{0}\\) — that is undefined. It is the special row \\(\\int \\dfrac{1}{x}\\,dx = \\log|x| + C\\). This exclusion is tested directly.",
        },
      ],
    },

    // 3 — linearity + algebraic prep (anchored)
    {
      kind: "formula" as const,
      slug: "algebraic-pre-processing",
      name: "Linearity and Algebraic Pre-processing",
      intuition:
        "Most integrands look hard only because they are written badly. Factor, divide out, split a fraction, or use an identity FIRST — and a 'hard' integral often collapses to the standard table. Always simplify before choosing a method.",
      definition:
        "Integration is **linear**: \\(\\int [a\\,f(x) + b\\,g(x)]\\,dx = a\\int f(x)\\,dx + b\\int g(x)\\,dx\\). " +
        "Pre-processing moves that pay off repeatedly:\n" +
        "- **Improper fraction** (degree of top \\(\\geq\\) bottom): do polynomial division first.\n" +
        "- **Factorable numerator**: cancel against the denominator.\n" +
        "- **Split** a single fraction into a sum of simpler ones.",
      formula: {
        label: "Linearity of integration",
        latex: "\\int [a\\,f(x) + b\\,g(x)]\\,dx = a\\!\\int f(x)\\,dx + b\\!\\int g(x)\\,dx",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\displaystyle\\int \\dfrac{x^4 - 1}{x^2 + 1}\\,dx\\).",
        steps: [
          "Factor the numerator: \\(x^4 - 1 = (x^2 - 1)(x^2 + 1)\\).",
          "Cancel the denominator: the integrand becomes \\(x^2 - 1\\).",
          "Integrate term by term: \\(\\int (x^2 - 1)\\,dx = \\dfrac{x^3}{3} - x + C\\).",
        ],
        answer: "\\(\\dfrac{x^3}{3} - x + C\\)",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\displaystyle\\int \\dfrac{x^2}{x+1}\\,dx\\).",
        steps: [
          "Top degree \\(\\geq\\) bottom — divide: \\(\\dfrac{x^2}{x+1} = x - 1 + \\dfrac{1}{x+1}\\).",
          "Integrate each piece: \\(\\dfrac{x^2}{2} - x + \\log|x+1| + C\\).",
        ],
        answer: "\\(\\dfrac{x^2}{2} - x + \\log|x+1| + C\\)",
      },
      practiceSet: [
        { prompt: "\\(\\int (2x+3)^2\\,dx\\) — expand first.", answer: "\\(\\dfrac{(2x+3)^3}{6} + C\\)", method: "or expand to \\(4x^2+12x+9\\) and integrate" },
        { prompt: "\\(\\int \\dfrac{x^2-1}{x-1}\\,dx\\)", answer: "\\(\\dfrac{x^2}{2} + x + C\\)", method: "cancel \\((x-1)\\) to get \\(x+1\\)" },
        { prompt: "\\(\\int \\dfrac{x+1}{x}\\,dx\\)", answer: "\\(x + \\log|x| + C\\)", method: "split into \\(1 + 1/x\\)" },
        { prompt: "\\(\\int \\dfrac{x^3}{x^2+1}\\,dx\\) — set up only (divide).", answer: "\\(\\int\\!\\left(x - \\dfrac{x}{x^2+1}\\right)dx\\)", method: "long division first" },
      ],
      pyqExampleId: "2973219b-3ead-44d0-9b8d-64c1a8ad39fc",
      traps: [
        {
          title: "Divide before you integrate an improper fraction",
          body:
            "If the numerator's degree is \\(\\geq\\) the denominator's, you cannot jump to a log or arctan form. Polynomial-divide first; the remainder term is what carries the log/arctan.",
        },
      ],
    },

    // 4 — boundary value (anchored)
    {
      kind: "formula" as const,
      slug: "boundary-value-problems",
      name: "Finding C from a Boundary Condition",
      intuition:
        "When a question gives you \\(f'(x)\\) AND one value like \\(f(1) = 4\\), it wants the ONE specific antiderivative, not the family. Integrate to get \\(F(x) + C\\), then plug in the known point to solve for \\(C\\).",
      definition:
        "Given \\(f'(x)\\) and a single value \\(f(a) = k\\): integrate to obtain \\(f(x) = F(x) + C\\); " +
        "substitute \\(x = a\\) and set equal to \\(k\\) to solve \\(C = k - F(a)\\). The boundary condition removes the ambiguity of the constant.",
      formula: {
        label: "Solving for the constant",
        latex: "f(x) = F(x) + C,\\qquad C = f(a) - F(a)",
        symbols: [
          { symbol: "f(a) = k", meaning: "the given boundary value" },
          { symbol: "F(a)", meaning: "antiderivative evaluated at the boundary point" },
        ],
      },
      authoredExample: {
        prompt:
          "If \\(f'(x) = 3x^2 + \\dfrac{2}{x^3}\\) and \\(f(1) = 2\\), find \\(f(x)\\).",
        steps: [
          "Integrate: \\(\\int\\!\\left(3x^2 + 2x^{-3}\\right)dx = x^3 + 2\\cdot\\dfrac{x^{-2}}{-2} + C = x^3 - \\dfrac{1}{x^2} + C\\).",
          "Apply \\(f(1) = 2\\): \\(1 - 1 + C = 2\\).",
          "So \\(C = 2\\).",
        ],
        answer: "\\(f(x) = x^3 - \\dfrac{1}{x^2} + 2\\)",
      },
      selfCheckExample: {
        prompt:
          "If \\(\\dfrac{d}{dx}f(x) = 4x^3 - \\dfrac{3}{x^4}\\) and \\(f(2) = 0\\), find \\(f(x)\\).",
        steps: [
          "Integrate: \\(\\int\\!\\left(4x^3 - 3x^{-4}\\right)dx = x^4 + \\dfrac{1}{x^3} + C\\).",
          "Apply \\(f(2) = 0\\): \\(16 + \\dfrac{1}{8} + C = 0 \\Rightarrow C = -\\dfrac{129}{8}\\).",
        ],
        answer: "\\(f(x) = x^4 + \\dfrac{1}{x^3} - \\dfrac{129}{8}\\)",
      },
      practiceSet: [
        { prompt: "\\(f'(x)=2x\\), \\(f(0)=3\\). Find \\(f\\).", answer: "\\(x^2 + 3\\)", method: "\\(C = f(0) = 3\\)" },
        { prompt: "\\(f'(x)=\\cos x\\), \\(f(0)=2\\). Find \\(f\\).", answer: "\\(\\sin x + 2\\)" },
        { prompt: "\\(f'(x)=e^x\\), \\(f(0)=0\\). Find \\(f\\).", answer: "\\(e^x - 1\\)", method: "\\(1 + C = 0\\)" },
        { prompt: "\\(f'(x)=\\dfrac1x\\), \\(f(1)=5\\). Find \\(f\\) for \\(x>0\\).", answer: "\\(\\log x + 5\\)" },
      ],
      pyqExampleId: "45359ba8-6114-4a8b-bb3d-d9282b102130",
      traps: [
        {
          title: "Solve for C only AFTER integrating",
          body:
            "The boundary value applies to \\(f\\), not \\(f'\\). Integrate fully first, keep the \\(C\\), then substitute the known point. Substituting into \\(f'\\) does nothing.",
        },
      ],
    },

    // 5 — reconstruct the function (anchored)
    {
      kind: "formula" as const,
      slug: "reconstruct-the-function",
      name: "Reconstruct the Function, Then Integrate",
      intuition:
        "Some questions hide the integrand: they give a composition like \\((f\\circ f)(x)\\) or define \\(f\\) implicitly through \\(f(\\text{something}) = \\text{expression}\\). Build the explicit function FIRST, simplify, and only then integrate.",
      definition:
        "Two recurring shapes: " +
        "(1) **composition** — compute \\((f\\circ f)(x) = f(f(x))\\) and simplify before integrating; " +
        "(2) **implicit definition** — if \\(f(g(x)) = h(x)\\), substitute \\(t = g(x)\\), express \\(x\\) in terms of \\(t\\), and read off \\(f(t)\\). " +
        "Then integrate the resulting explicit function using the table.",
      formula: {
        label: "Composition of a function with itself",
        latex: "(f\\circ f)(x) = f\\big(f(x)\\big)",
      },
      authoredExample: {
        prompt:
          "If \\(f(x) = \\dfrac{1}{1 - x}\\) and \\((f\\circ f)(x) = F(x)\\), find \\(\\displaystyle\\int F(x)\\,dx\\).",
        steps: [
          "Compute \\(f(f(x)) = \\dfrac{1}{1 - \\frac{1}{1-x}} = \\dfrac{1}{\\frac{1-x-1}{1-x}} = \\dfrac{1-x}{-x} = \\dfrac{x-1}{x}\\).",
          "Rewrite for integration: \\(\\dfrac{x-1}{x} = 1 - \\dfrac{1}{x}\\).",
          "Integrate: \\(\\int\\!\\left(1 - \\dfrac{1}{x}\\right)dx = x - \\log|x| + C\\).",
        ],
        answer: "\\(x - \\log|x| + C\\)",
      },
      selfCheckExample: {
        prompt:
          "If \\(f\\!\\left(\\dfrac{x-4}{x-2}\\right) = 2x + 1\\), find \\(f(x)\\) explicitly.",
        steps: [
          "Let \\(t = \\dfrac{x-4}{x-2}\\). Solve for \\(x\\): \\(t(x-2) = x-4 \\Rightarrow x(t-1) = 2t - 4 \\Rightarrow x = \\dfrac{2t-4}{t-1}\\).",
          "Then \\(f(t) = 2x + 1 = \\dfrac{2(2t-4)}{t-1} + 1 = \\dfrac{4t - 8 + t - 1}{t-1} = \\dfrac{5t - 9}{t-1}\\).",
          "So \\(f(x) = \\dfrac{5x - 9}{x - 1}\\).",
        ],
        answer: "\\(f(x) = \\dfrac{5x-9}{x-1}\\) (then integrate by dividing: \\(5 - \\frac{4}{x-1}\\)).",
      },
      practiceSet: [
        { prompt: "\\(f(x)=2x\\). Find \\((f\\circ f)(x)\\).", answer: "\\(4x\\)", method: "\\(f(2x)=2(2x)\\)" },
        { prompt: "\\(f(x)=x+1\\). \\(\\int (f\\circ f)(x)\\,dx\\)?", answer: "\\(\\dfrac{x^2}{2} + 2x + C\\)", method: "\\(f(f(x))=x+2\\)" },
        { prompt: "\\(f(2x)=4x+1\\). Find \\(f(x)\\).", answer: "\\(2x+1\\)", method: "let \\(t=2x\\)" },
        { prompt: "\\(f(x)=\\dfrac{1}{x}\\). \\((f\\circ f)(x)\\)?", answer: "\\(x\\)", method: "\\(f(1/x)=x\\)" },
      ],
      pyqExampleId: "b36c0dd3-3d90-4bf9-acf2-3fb000742beb",
      traps: [
        {
          title: "Build f explicitly before integrating",
          body:
            "You cannot integrate \\(f(g(x))\\) until you know \\(f\\). Substitute to find the explicit rule first; integrating the composition blind is the most common error on these.",
        },
      ],
    },
  ],
};
