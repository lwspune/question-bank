import type { SubtopicNote } from "@/app/notes/_types";

export const PARTIAL_FRACTIONS_NOTE: SubtopicNote = {
  subtopicName: "Rational Functions and Partial Fractions",
  title: "Rational Functions and Partial Fractions",
  oneLineDefinition:
    "Break a rational integrand into simple standard pieces — arctan/log quadratic forms, completed squares, and partial fractions.",
  whyItMatters:
    "16 PYQs. Four recognitions cover them: the standard quadratic forms (arctan, log, arcsin); completing the square to reach an arctan/arcsin/log; the numerator-split (px+q over a quadratic or its root); and partial-fraction decomposition for products of linear/quadratic factors. " +
    "MHT-CET also hides quadratic-in-x² shapes (like 1/(x⁴+9x²+16)) that reduce to an arctan after a clever x + k/x substitution.",
  concepts: [
    // 1 — standard quadratic forms
    {
      kind: "formula" as const,
      slug: "standard-quadratic-forms",
      name: "Standard Quadratic Denominator Forms",
      intuition:
        "A short table of quadratic-denominator integrals produces every arctan and quadratic-log answer. Memorise the shapes; most rational integrals are engineered to land on one of them.",
      definition:
        "The core forms the bank draws on:\n" +
        "- \\(\\displaystyle\\int \\dfrac{dx}{x^2 + a^2} = \\dfrac{1}{a}\\tan^{-1}\\dfrac{x}{a} + C\\)\n" +
        "- \\(\\displaystyle\\int \\dfrac{dx}{x^2 - a^2} = \\dfrac{1}{2a}\\log\\left|\\dfrac{x-a}{x+a}\\right| + C\\)\n" +
        "- \\(\\displaystyle\\int \\dfrac{dx}{\\sqrt{a^2 - x^2}} = \\sin^{-1}\\dfrac{x}{a} + C\\)\n" +
        "- \\(\\displaystyle\\int \\dfrac{dx}{\\sqrt{x^2 - a^2}} = \\log\\left|x + \\sqrt{x^2 - a^2}\\right| + C\\)\n" +
        "- \\(\\displaystyle\\int \\dfrac{dx}{\\sqrt{x^2 + a^2}} = \\log\\left|x + \\sqrt{x^2 + a^2}\\right| + C\\)\n" +
        "Quadratic-in-\\(x^2\\) denominators often reduce to the first form via a \\(t = x \\pm \\dfrac{k}{x}\\) substitution.",
      formula: {
        label: "The arctan form",
        latex: "\\int \\dfrac{dx}{x^2 + a^2} = \\dfrac{1}{a}\\tan^{-1}\\dfrac{x}{a} + C",
      },
      authoredExample: {
        prompt:
          "Evaluate \\(\\displaystyle\\int \\dfrac{x^2 - 4}{x^4 + 9x^2 + 16}\\,dx = \\tan^{-1}(f(x)) + c\\) and find \\(f(2)\\).",
        steps: [
          "Divide top and bottom by \\(x^2\\): \\(\\dfrac{1 - 4/x^2}{x^2 + 9 + 16/x^2}\\).",
          "Note \\(\\dfrac{d}{dx}\\!\\left(x + \\dfrac{4}{x}\\right) = 1 - \\dfrac{4}{x^2}\\) — exactly the numerator. Let \\(t = x + \\dfrac{4}{x}\\).",
          "Then \\(t^2 = x^2 + 8 + \\dfrac{16}{x^2}\\), so \\(x^2 + \\dfrac{16}{x^2} = t^2 - 8\\) and the denominator \\(= t^2 - 8 + 9 = t^2 + 1\\).",
          "Integral \\(= \\int \\dfrac{dt}{t^2 + 1} = \\tan^{-1}t = \\tan^{-1}\\!\\left(x + \\dfrac{4}{x}\\right) + c\\).",
        ],
        answer: "\\(f(x) = x + \\dfrac{4}{x}\\), so \\(f(2) = 2 + 2 = 4\\).",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\displaystyle\\int \\dfrac{dx}{x^2 + 9}\\).",
        steps: [
          "Match \\(a^2 = 9\\Rightarrow a = 3\\).",
          "Apply the arctan form: \\(\\dfrac{1}{3}\\tan^{-1}\\dfrac{x}{3} + C\\).",
        ],
        answer: "\\(\\dfrac{1}{3}\\tan^{-1}\\dfrac{x}{3} + C\\)",
      },
      practiceSet: [
        { prompt: "\\(\\int \\dfrac{dx}{x^2+4}\\)", answer: "\\(\\dfrac12\\tan^{-1}\\dfrac{x}{2} + C\\)" },
        { prompt: "\\(\\int \\dfrac{dx}{\\sqrt{9-x^2}}\\)", answer: "\\(\\sin^{-1}\\dfrac{x}{3} + C\\)" },
        { prompt: "\\(\\int \\dfrac{dx}{x^2-1}\\)", answer: "\\(\\dfrac12\\log\\left|\\dfrac{x-1}{x+1}\\right| + C\\)" },
        { prompt: "\\(\\int \\dfrac{dx}{1+x^2}\\)", answer: "\\(\\tan^{-1}x + C\\)" },
      ],
      pyqExampleId: "112de261-be8e-4734-825e-1b08411e8dcd",
      traps: [
        {
          title: "x⁴ + bx² + c → try t = x ± k/x",
          body:
            "A denominator quadratic in \\(x^2\\) with a matching numerator \\((1 \\mp k/x^2)\\) is the signal for \\(t = x \\pm k/x\\). It collapses the quartic to a simple \\(t^2 + 1\\) arctan — a recurring MHT-CET shape.",
        },
      ],
    },

    // 2 — completing the square
    {
      kind: "formula" as const,
      slug: "completing-the-square",
      name: "Completing the Square",
      intuition:
        "A general quadratic under a root or in a denominator is turned into 'constant ± (linear)²' by completing the square. That matches it to an arcsin, arctan, or log standard form.",
      definition:
        "Rewrite \\(ax^2 + bx + c\\) as \\(a\\!\\left(x + \\dfrac{b}{2a}\\right)^2 + \\left(c - \\dfrac{b^2}{4a}\\right)\\). " +
        "Then \\(\\displaystyle\\int \\dfrac{dx}{\\sqrt{k^2 - (x+p)^2}} = \\sin^{-1}\\dfrac{x+p}{k}\\), and \\(\\displaystyle\\int \\dfrac{dx}{(x+p)^2 + k^2} = \\dfrac{1}{k}\\tan^{-1}\\dfrac{x+p}{k}\\).",
      formula: {
        label: "Completing the square",
        latex: "ax^2 + bx + c = a\\left(x + \\dfrac{b}{2a}\\right)^2 + \\left(c - \\dfrac{b^2}{4a}\\right)",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\displaystyle\\int \\dfrac{dx}{\\sqrt{7 - 6x - x^2}}\\).",
        steps: [
          "Complete the square inside the root: \\(7 - 6x - x^2 = -(x^2 + 6x - 7) = -\\big((x+3)^2 - 16\\big) = 16 - (x+3)^2\\).",
          "Match the arcsin form with \\(k = 4\\): \\(\\int \\dfrac{dx}{\\sqrt{16 - (x+3)^2}}\\).",
          "Integrate: \\(\\sin^{-1}\\dfrac{x+3}{4} + C\\).",
        ],
        answer: "\\(\\sin^{-1}\\dfrac{x+3}{4} + C\\)",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\displaystyle\\int \\dfrac{dx}{7 + 6x - x^2}\\).",
        steps: [
          "Complete the square: \\(7 + 6x - x^2 = 16 - (x-3)^2\\).",
          "Use \\(\\int \\dfrac{dx}{a^2 - u^2} = \\dfrac{1}{2a}\\log\\left|\\dfrac{a+u}{a-u}\\right|\\) with \\(a = 4,\\ u = x-3\\).",
          "Result: \\(\\dfrac{1}{8}\\log\\left|\\dfrac{4 + (x-3)}{4 - (x-3)}\\right| + C\\).",
        ],
        answer: "\\(\\dfrac{1}{8}\\log\\left|\\dfrac{x+1}{7-x}\\right| + C\\)",
      },
      practiceSet: [
        { prompt: "Complete the square: \\(x^2 + 6x\\).", answer: "\\((x+3)^2 - 9\\)" },
        { prompt: "Complete the square: \\(7 - 6x - x^2\\).", answer: "\\(16 - (x+3)^2\\)" },
        { prompt: "\\(\\int \\dfrac{dx}{x^2+2x+5}\\)", answer: "\\(\\dfrac12\\tan^{-1}\\dfrac{x+1}{2} + C\\)", method: "\\((x+1)^2+4\\)" },
        { prompt: "\\(\\int \\dfrac{dx}{\\sqrt{4-(x-1)^2}}\\)", answer: "\\(\\sin^{-1}\\dfrac{x-1}{2} + C\\)" },
      ],
      pyqExampleId: "9b638de2-ab85-4890-804a-c7cf843a1297",
      traps: [
        {
          title: "Factor the sign on x² before completing the square",
          body:
            "With \\(-x^2\\) terms, pull out the \\(-1\\) first: \\(7 - 6x - x^2 = -(x^2 + 6x - 7)\\). Forgetting the sign flip turns an arcsin into a (wrong) log or vice versa.",
        },
      ],
    },

    // 3 — px+q over a quadratic / its root (numerator split)
    {
      kind: "formula" as const,
      slug: "linear-numerator-over-quadratic",
      name: "Linear Numerator over a Quadratic (Numerator Split)",
      intuition:
        "When the numerator is linear (px+q) and the denominator is a quadratic or the root of one, split the numerator into 'a constant times the denominator's derivative, plus a leftover constant'. The first piece integrates to a √ or a log; the leftover becomes a complete-the-square standard form.",
      definition:
        "For \\(\\displaystyle\\int \\dfrac{px+q}{\\sqrt{ax^2+bx+c}}\\,dx\\) (or with the quadratic itself in the denominator), write " +
        "\\(px + q = A\\dfrac{d}{dx}(ax^2+bx+c) + B\\). " +
        "Match coefficients to find \\(A, B\\). Then " +
        "\\(\\displaystyle\\int \\dfrac{A\\,(ax^2+bx+c)'}{\\sqrt{ax^2+bx+c}}\\,dx = 2A\\sqrt{ax^2+bx+c}\\), and the leftover " +
        "\\(\\displaystyle B\\!\\int \\dfrac{dx}{\\sqrt{ax^2+bx+c}}\\) is finished by completing the square.",
      formula: {
        label: "Numerator as derivative-of-denominator plus constant",
        latex: "px + q = A\\dfrac{d}{dx}(ax^2+bx+c) + B",
        symbols: [
          { symbol: "A", meaning: "coefficient that reproduces the \\(x\\)-term via \\((ax^2+bx+c)'\\)" },
          { symbol: "B", meaning: "leftover constant — its integral completes the square" },
        ],
      },
      authoredExample: {
        prompt:
          "Evaluate \\(\\displaystyle\\int \\dfrac{2x+5}{\\sqrt{7-6x-x^2}}\\,dx\\) in the form \\(A\\sqrt{7-6x-x^2} + B\\sin^{-1}\\!\\left(\\dfrac{x+3}{4}\\right) + c\\).",
        steps: [
          "Denominator \\(D = 7-6x-x^2\\), so \\(D' = -6-2x\\). Write \\(2x+5 = A(-6-2x) + B\\).",
          "Match: \\(x\\)-coefficient \\(2 = -2A\\Rightarrow A = -1\\); constant \\(5 = -6A + B = 6 + B\\Rightarrow B = -1\\).",
          "First piece: \\(\\displaystyle -\\!\\int \\dfrac{D'}{\\sqrt{D}}\\,dx = -2\\sqrt{D}\\).",
          "Leftover: \\(\\displaystyle -\\!\\int \\dfrac{dx}{\\sqrt{16-(x+3)^2}} = -\\sin^{-1}\\!\\dfrac{x+3}{4}\\) (completing the square).",
        ],
        answer: "\\(-2\\sqrt{7-6x-x^2} - \\sin^{-1}\\!\\left(\\dfrac{x+3}{4}\\right) + c\\) — so \\(A = -2,\\ B = -1\\).",
      },
      selfCheckExample: {
        prompt:
          "Given \\(\\displaystyle\\int \\dfrac{x-7}{\\sqrt{x^2-16x+63}}\\,dx = A\\sqrt{x^2-16x+63} + \\log\\left|(x-8)+\\sqrt{x^2-16x+63}\\right| + c\\), find \\(A\\).",
        steps: [
          "Denominator \\(D = x^2-16x+63\\), \\(D' = 2x-16\\). Write \\(x-7 = A(2x-16) + B\\).",
          "Match: \\(1 = 2A\\Rightarrow A = \\tfrac12\\); \\(-7 = -16A + B = -8 + B\\Rightarrow B = 1\\).",
          "First piece: \\(\\tfrac12\\!\\int \\dfrac{D'}{\\sqrt{D}}\\,dx = \\tfrac12\\cdot 2\\sqrt{D} = \\sqrt{D}\\); leftover \\(\\int \\dfrac{dx}{\\sqrt{(x-8)^2-1}} = \\log|(x-8)+\\sqrt{D}|\\).",
        ],
        answer: "\\(A = \\dfrac{1}{2}\\).",
      },
      practiceSet: [
        { prompt: "For \\(\\int \\dfrac{2x+3}{x^2+3x+1}\\,dx\\), what is the numerator as \\(A D' + B\\)?", answer: "\\(A=1,\\ B=0\\)", method: "\\(D'=2x+3\\) is exactly the numerator → pure log" },
        { prompt: "\\(\\int \\dfrac{2x+3}{x^2+3x+1}\\,dx\\)", answer: "\\(\\log|x^2+3x+1| + C\\)" },
        { prompt: "For \\(\\int \\dfrac{x}{\\sqrt{x^2+4}}\\,dx\\), split \\(x = A(2x) + B\\).", answer: "\\(A=\\tfrac12,\\ B=0\\)" },
        { prompt: "\\(\\int \\dfrac{x}{\\sqrt{x^2+4}}\\,dx\\)", answer: "\\(\\sqrt{x^2+4} + C\\)", method: "\\(\\tfrac12\\int (x^2+4)'/\\sqrt{x^2+4}\\)" },
      ],
      pyqExampleId: "74b316be-445e-47f2-b78e-350513113a0a",
      traps: [
        {
          title: "Split the numerator BEFORE completing the square",
          body:
            "The derivative-piece must come out first (it gives the \\(\\sqrt{}\\) or log term). Only the leftover constant goes through completing the square. Completing the square first leaves the \\(x\\) in the numerator with nowhere to go.",
        },
      ],
    },

    // 4 — partial fractions
    {
      kind: "formula" as const,
      slug: "partial-fraction-decomposition",
      name: "Partial-Fraction Decomposition",
      intuition:
        "Split a proper rational function into a sum of fractions with linear or simple-quadratic denominators. Each piece is then a basic log or arctan. Divide first if the fraction is improper.",
      definition:
        "For a proper rational function, decompose by the denominator's factors:\n" +
        "- **distinct linear** \\((x-a)(x-b)\\): \\(\\dfrac{A}{x-a} + \\dfrac{B}{x-b}\\)\n" +
        "- **repeated linear** \\((x-a)^2\\): \\(\\dfrac{A}{x-a} + \\dfrac{B}{(x-a)^2}\\)\n" +
        "- **irreducible quadratic** \\((x^2 + c)\\): \\(\\dfrac{Ax + B}{x^2 + c}\\)\n" +
        "Find the constants by the cover-up method or by equating coefficients; integrate each piece.",
      formula: {
        label: "Distinct-linear decomposition",
        latex: "\\dfrac{px + q}{(x-a)(x-b)} = \\dfrac{A}{x-a} + \\dfrac{B}{x-b}",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\displaystyle\\int \\dfrac{x}{(x-1)(x-2)}\\,dx\\).",
        steps: [
          "Decompose: \\(\\dfrac{x}{(x-1)(x-2)} = \\dfrac{A}{x-1} + \\dfrac{B}{x-2}\\).",
          "Cover-up at \\(x = 1\\): \\(A = \\dfrac{1}{1-2} = -1\\). At \\(x = 2\\): \\(B = \\dfrac{2}{2-1} = 2\\).",
          "Integrate: \\(-\\log|x-1| + 2\\log|x-2| + C\\).",
        ],
        answer: "\\(2\\log|x-2| - \\log|x-1| + C\\)",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\displaystyle\\int \\dfrac{3x - 2}{(x+1)(x-2)^2}\\,dx\\).",
        steps: [
          "Decompose: \\(\\dfrac{3x-2}{(x+1)(x-2)^2} = \\dfrac{A}{x+1} + \\dfrac{B}{x-2} + \\dfrac{D}{(x-2)^2}\\).",
          "Cover-up at \\(x=-1\\): \\(A = \\dfrac{-5}{9}\\). At \\(x=2\\): \\(D = \\dfrac{4}{3}\\). Compare \\(x^2\\) coefficients: \\(A + B = 0\\Rightarrow B = \\dfrac{5}{9}\\).",
          "Integrate term by term.",
        ],
        answer: "\\(-\\dfrac{5}{9}\\log|x+1| + \\dfrac{5}{9}\\log|x-2| - \\dfrac{4}{3}\\cdot\\dfrac{1}{x-2} + C\\)",
      },
      practiceSet: [
        { prompt: "Decompose \\(\\dfrac{1}{(x-1)(x+1)}\\).", answer: "\\(\\dfrac{1/2}{x-1} - \\dfrac{1/2}{x+1}\\)" },
        { prompt: "\\(\\int \\dfrac{dx}{(x-1)(x-2)}\\)", answer: "\\(\\log\\left|\\dfrac{x-2}{x-1}\\right| + C\\)" },
        { prompt: "Improper \\(\\dfrac{x^2}{x^2-1}\\): first step?", answer: "divide → \\(1 + \\dfrac{1}{x^2-1}\\)" },
        { prompt: "Form for \\(\\dfrac{1}{(x-1)^2}\\) — already simple. \\(\\int\\)?", answer: "\\(-\\dfrac{1}{x-1} + C\\)" },
      ],
      pyqExampleId: "6fcccd15-3c56-4684-b760-0e726de789d3",
      traps: [
        {
          title: "Improper fraction? Divide before decomposing",
          body:
            "Partial fractions require the numerator degree to be LESS than the denominator's. If not, polynomial-divide first, then decompose the proper remainder.",
        },
        {
          title: "Repeated factor needs every power",
          body:
            "For \\((x-a)^2\\) you must include BOTH \\(\\dfrac{A}{x-a}\\) and \\(\\dfrac{B}{(x-a)^2}\\). Dropping the first-power term gives an unsolvable system.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Foundations — divide improper fractions before integrating",
      href: "/notes/mht-cet-maths/indefinite-integration/fundamentals",
    },
    {
      label: "Substitution — where the f'/f leftover term comes from",
      href: "/notes/mht-cet-maths/indefinite-integration/substitution",
    },
  ],
};
