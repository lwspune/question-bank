import type { SubtopicNote } from "@/app/notes/_types";

export const BY_PARTS_NOTE: SubtopicNote = {
  subtopicName: "Integration by Parts",
  title: "Integration by Parts",
  oneLineDefinition:
    "Integrate a product by trading it for an easier integral — choose u by LIATE, and watch for the cyclic and eˣ[f+f'] shortcuts.",
  whyItMatters:
    "23 PYQs, and the chapter's second-hardest pocket (15 of 23 are HARD). Three patterns dominate: the LIATE choice for ordinary products; the cyclic integrals (∫eˣ sin x, ∫sin(log x)) that return to themselves; and the recurring eˣ[f(x)+f'(x)] → eˣ f(x) family that MHT-CET tests almost every year. " +
    "Recognising the eˣ[f+f'] shape on sight turns a HARD question into a one-line answer.",
  concepts: [
    // 1 — LIATE
    {
      kind: "formula" as const,
      slug: "liate-rule",
      name: "Integration by Parts and the LIATE Rule",
      intuition:
        "To integrate a product, call one factor \\(u\\) (to differentiate) and the other \\(dv\\) (to integrate). Pick \\(u\\) by LIATE — Log, Inverse-trig, Algebraic, Trig, Exponential — so that differentiating \\(u\\) makes the problem simpler.",
      definition:
        "Integration by parts: \\(\\displaystyle\\int u\\,dv = uv - \\int v\\,du\\). " +
        "Choose \\(u\\) as the function that appears EARLIEST in **LIATE** (Logarithmic, Inverse trig, Algebraic, Trigonometric, Exponential) — it differentiates toward something simpler, while the rest is \\(dv\\). " +
        "A lone \\(\\log x\\) or \\(\\tan^{-1}x\\) is integrated by taking \\(dv = dx\\).",
      formula: {
        label: "Integration by parts",
        latex: "\\int u\\,dv = uv - \\int v\\,du",
        symbols: [
          { symbol: "u", meaning: "factor to differentiate (earliest in LIATE)" },
          { symbol: "dv", meaning: "factor to integrate (the rest, including \\(dx\\))" },
        ],
      },
      authoredExample: {
        prompt: "Evaluate \\(\\displaystyle\\int \\log x\\,dx\\).",
        steps: [
          "There is only one function — take \\(u = \\log x\\) and \\(dv = dx\\) (Log is first in LIATE).",
          "Then \\(du = \\dfrac{1}{x}\\,dx\\) and \\(v = x\\).",
          "Apply parts: \\(uv - \\int v\\,du = x\\log x - \\int x\\cdot\\dfrac{1}{x}\\,dx = x\\log x - \\int 1\\,dx\\).",
          "Finish: \\(x\\log x - x + C\\).",
        ],
        answer: "\\(x\\log x - x + C\\)",
      },
      selfCheckExample: {
        prompt:
          "Evaluate \\(\\displaystyle\\int x^2 e^x\\,dx\\).",
        steps: [
          "By LIATE, take \\(u = x^2\\) (Algebraic) and \\(dv = e^x\\,dx\\), so \\(du = 2x\\,dx,\\ v = e^x\\).",
          "Apply parts: \\(\\int x^2 e^x\\,dx = x^2 e^x - \\int 2x\\,e^x\\,dx\\).",
          "The leftover \\(\\int 2x\\,e^x\\,dx = 2(x e^x - e^x)\\) (parts again), so the result is \\(x^2 e^x - 2x e^x + 2e^x\\).",
        ],
        answer: "\\(e^x(x^2 - 2x + 2) + C\\)",
      },
      practiceSet: [
        { prompt: "In \\(\\int x e^x\\,dx\\), what is \\(u\\) by LIATE?", answer: "\\(u = x\\) (Algebraic before Exponential)" },
        { prompt: "\\(\\int x e^x\\,dx\\)", answer: "\\((x-1)e^x + C\\)" },
        { prompt: "\\(\\int \\tan^{-1}x\\,dx\\)", answer: "\\(x\\tan^{-1}x - \\tfrac12\\log(1+x^2) + C\\)" },
        { prompt: "\\(\\int x\\cos x\\,dx\\)", answer: "\\(x\\sin x + \\cos x + C\\)" },
      ],
      pyqExampleId: "4e4b9c8f-5708-4499-84f0-b3d8bd279756",
      traps: [
        {
          title: "A lone log or inverse-trig still uses parts",
          body:
            "\\(\\int \\log x\\,dx\\) and \\(\\int \\tan^{-1}x\\,dx\\) look like single functions, but they are integrated by parts with \\(dv = dx,\\ v = x\\). There is no direct formula.",
        },
      ],
    },

    // 2 — cyclic
    {
      kind: "formula" as const,
      slug: "cyclic-by-parts",
      name: "Cyclic Integrals (Return-to-Self)",
      intuition:
        "For \\(\\int e^{ax}\\sin bx\\,dx\\) and \\(\\int \\sin(\\log x)\\,dx\\), applying parts twice brings back the ORIGINAL integral. Move it to the left side and solve algebraically — no third round needed.",
      definition:
        "Apply integration by parts twice. The same integral \\(I\\) reappears on the right with a coefficient; collect it: \\(I = (\\text{boundary terms}) + kI\\Rightarrow I(1-k) = \\text{terms}\\). " +
        "For \\(\\int \\sin(\\log x)\\,dx\\), the substitution \\(x = e^t\\) turns it into \\(\\int e^t \\sin t\\,dt\\), the classic cyclic form.",
      formula: {
        label: "The cyclic result",
        latex: "\\int e^{ax}\\sin bx\\,dx = \\dfrac{e^{ax}(a\\sin bx - b\\cos bx)}{a^2 + b^2} + C",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\displaystyle\\int e^{2x} \\sin 3x\\,dx\\).",
        steps: [
          "This is a cyclic integral — applying parts twice returns the original integral, so use the cyclic formula directly.",
          "\\(\\int e^{ax}\\sin bx\\,dx = \\dfrac{e^{ax}(a\\sin bx - b\\cos bx)}{a^2 + b^2}\\).",
          "Substitute \\(a = 2,\\ b = 3\\): \\(\\dfrac{e^{2x}(2\\sin 3x - 3\\cos 3x)}{4 + 9}\\).",
        ],
        answer: "\\(\\dfrac{e^{2x}(2\\sin 3x - 3\\cos 3x)}{13} + C\\)",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\displaystyle\\int \\cos(\\log x)\\,dx\\).",
        steps: [
          "Let \\(x = e^t\\): \\(\\int e^t \\cos t\\,dt\\).",
          "Cyclic formula with \\(a = b = 1\\): \\(\\dfrac{e^t(\\cos t + \\sin t)}{2}\\).",
          "Back-substitute.",
        ],
        answer: "\\(\\dfrac{x}{2}\\big[\\cos(\\log x) + \\sin(\\log x)\\big] + C\\)",
      },
      practiceSet: [
        { prompt: "\\(\\int e^x \\sin x\\,dx\\)", answer: "\\(\\dfrac{e^x(\\sin x - \\cos x)}{2} + C\\)" },
        { prompt: "\\(\\int e^x \\cos x\\,dx\\)", answer: "\\(\\dfrac{e^x(\\cos x + \\sin x)}{2} + C\\)" },
        { prompt: "Substitution for \\(\\int \\sin(\\log x)\\,dx\\)?", answer: "\\(x = e^t\\)" },
        { prompt: "After two by-parts rounds, the original integral I is solved by?", answer: "moving \\(kI\\) to the left and dividing" },
      ],
      pyqExampleId: "115dca59-7dc6-48ca-a5fd-8d7495aae59c",
      traps: [
        {
          title: "Stop after two rounds — don't loop forever",
          body:
            "The point of a cyclic integral is that the original \\(I\\) reappears after two rounds. Recognise it and solve algebraically; a third by-parts just sends you in circles.",
        },
      ],
    },

    // 3 — ex[f+f']
    {
      kind: "formula" as const,
      slug: "ex-f-plus-fprime",
      name: "The eˣ[f(x) + f'(x)] Family",
      intuition:
        "Whenever an integrand is \\(e^x\\) times 'some function plus its own derivative', the answer is just \\(e^x\\) times that function. Spotting the \\(f + f'\\) pattern collapses a scary integral to one line.",
      definition:
        "\\(\\displaystyle\\int e^x\\big[f(x) + f'(x)\\big]\\,dx = e^x f(x) + C\\). " +
        "The work is REWRITING the integrand into this shape — using identities so that one part is a function \\(f\\) and the rest is exactly its derivative \\(f'\\). " +
        "A close cousin: \\(\\displaystyle\\int e^x\\dfrac{1 + x\\log x}{x}\\)-style problems all reduce to spotting \\(f + f'\\).",
      formula: {
        label: "The eˣ[f + f'] shortcut",
        latex: "\\int e^x\\big[f(x) + f'(x)\\big]\\,dx = e^x f(x) + C",
        symbols: [
          { symbol: "f(x)", meaning: "the function whose value lands in the answer" },
          { symbol: "f'(x)", meaning: "its derivative — must be the other half of the bracket" },
        ],
      },
      authoredExample: {
        prompt: "Evaluate \\(\\displaystyle\\int e^x\\!\\left(\\log x + \\dfrac{1}{x}\\right)dx\\).",
        steps: [
          "The bracket is \\(f(x) + f'(x)\\) with \\(f(x) = \\log x\\), since \\(f'(x) = \\dfrac{1}{x}\\).",
          "Apply the shortcut \\(\\int e^x[f + f']\\,dx = e^x f(x)\\).",
          "So the integral is \\(e^x \\log x + C\\).",
        ],
        answer: "\\(e^x \\log x + C\\)",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\displaystyle\\int e^x\\!\\left(\\dfrac{x - 1}{x^2}\\right)dx\\).",
        steps: [
          "Split the bracket: \\(\\dfrac{x-1}{x^2} = \\dfrac{1}{x} - \\dfrac{1}{x^2}\\).",
          "Set \\(f(x) = \\dfrac{1}{x}\\). Then \\(f'(x) = -\\dfrac{1}{x^2}\\), so the bracket is \\(f(x) + f'(x)\\).",
          "Apply the shortcut: \\(e^x f(x) = \\dfrac{e^x}{x} + C\\).",
        ],
        answer: "\\(\\dfrac{e^x}{x} + C\\)",
      },
      practiceSet: [
        { prompt: "\\(\\int e^x(\\sin x + \\cos x)\\,dx\\)", answer: "\\(e^x \\sin x + C\\)", method: "\\(f=\\sin x,\\ f'=\\cos x\\)" },
        { prompt: "\\(\\int e^x\\!\\left(\\tan x + \\sec^2 x\\right)dx\\)", answer: "\\(e^x \\tan x + C\\)" },
        { prompt: "\\(\\int e^x\\!\\left(\\dfrac1x - \\dfrac{1}{x^2}\\right)dx\\)", answer: "\\(\\dfrac{e^x}{x} + C\\)" },
        { prompt: "\\(\\int e^x(1 + x)\\,dx\\)", answer: "\\(x e^x + C\\)", method: "\\(f=x,\\ f'=1\\)" },
      ],
      pyqExampleId: "3c70c19c-5d18-42a7-9540-6310b6886b0a",
      traps: [
        {
          title: "Use identities to expose f + f'",
          body:
            "The bracket rarely arrives as a clean \\(f + f'\\). Apply identities first — e.g. \\(1 + \\cot^2 = \\csc^2\\) — so that one term is a function and the other is its exact derivative. Then the answer is immediate.",
        },
      ],
    },

    // 4 — ∫√(quadratic) dx standard forms (syllabus reference)
    {
      kind: "formula" as const,
      slug: "root-quadratic-standard-results",
      name: "Integrals of √(quadratic) — Standard Results (syllabus reference)",
      intuition:
        "These three results — proved by integration by parts in the textbook — give the integral of a square root of a quadratic. " +
        "Recent MHT-CET papers in this bank have not tested them directly, but they are on the syllabus and a question can reduce to one after completing the square, so keep them on hand.",
      definition:
        "The three standard results (each derived by taking \\(\\sqrt{\\,\\cdot\\,}\\) as the first function and \\(1\\) as the second):\n" +
        "- \\(\\displaystyle\\int \\sqrt{a^2 - x^2}\\,dx = \\dfrac{x}{2}\\sqrt{a^2 - x^2} + \\dfrac{a^2}{2}\\sin^{-1}\\dfrac{x}{a} + C\\)\n" +
        "- \\(\\displaystyle\\int \\sqrt{a^2 + x^2}\\,dx = \\dfrac{x}{2}\\sqrt{a^2 + x^2} + \\dfrac{a^2}{2}\\log\\left|x + \\sqrt{a^2 + x^2}\\right| + C\\)\n" +
        "- \\(\\displaystyle\\int \\sqrt{x^2 - a^2}\\,dx = \\dfrac{x}{2}\\sqrt{x^2 - a^2} - \\dfrac{a^2}{2}\\log\\left|x + \\sqrt{x^2 - a^2}\\right| + C\\)\n" +
        "For a general \\(\\sqrt{ax^2+bx+c}\\), complete the square first, then match one of these three.",
      formula: {
        label: "Square root of a quadratic — the three results",
        latex:
          "\\int \\sqrt{a^2 - x^2}\\,dx = \\dfrac{x}{2}\\sqrt{a^2 - x^2} + \\dfrac{a^2}{2}\\sin^{-1}\\dfrac{x}{a} + C",
        symbols: [
          { symbol: "a^2 - x^2", meaning: "arcsin result" },
          { symbol: "a^2 + x^2,\\ x^2 - a^2", meaning: "log results (signs differ)" },
        ],
      },
      authoredExample: {
        prompt: "Evaluate \\(\\displaystyle\\int \\sqrt{9 - x^2}\\,dx\\).",
        steps: [
          "Match the first result with \\(a^2 = 9\\Rightarrow a = 3\\).",
          "\\(\\displaystyle\\int \\sqrt{9 - x^2}\\,dx = \\dfrac{x}{2}\\sqrt{9 - x^2} + \\dfrac{9}{2}\\sin^{-1}\\dfrac{x}{3} + C\\).",
        ],
        answer: "\\(\\dfrac{x}{2}\\sqrt{9 - x^2} + \\dfrac{9}{2}\\sin^{-1}\\dfrac{x}{3} + C\\)",
      },
      practiceSet: [
        { prompt: "\\(\\int \\sqrt{a^2-x^2}\\,dx\\) uses which inverse-trig term?", answer: "\\(\\sin^{-1}(x/a)\\)" },
        { prompt: "\\(\\int \\sqrt{x^2-a^2}\\,dx\\) — sign before the log term?", answer: "minus", method: "\\(-\\tfrac{a^2}{2}\\log|x+\\sqrt{x^2-a^2}|\\)" },
        { prompt: "\\(\\int \\sqrt{4-x^2}\\,dx\\)", answer: "\\(\\dfrac{x}{2}\\sqrt{4-x^2} + 2\\sin^{-1}\\dfrac{x}{2} + C\\)", method: "\\(a=2\\)" },
        { prompt: "For \\(\\int\\sqrt{x^2+16}\\,dx\\), the constant before log is?", answer: "\\(8\\)", method: "\\(a^2/2 = 16/2\\)" },
      ],
      traps: [
        {
          title: "Syllabus result, not a current bank pattern",
          body:
            "This bank's recent CET questions keep the square root in a DENOMINATOR (handled by the numerator-split + completing-the-square concepts). The \\(\\int\\sqrt{\\text{quadratic}}\\,dx\\) form here is on the syllabus and could appear — but don't expect it among the tagged drills, because the live bank has none yet.",
        },
      ],
    },

    // 5 — tabular by-parts (syllabus reference / shortcut)
    {
      kind: "formula" as const,
      slug: "tabular-by-parts",
      name: "Generalised (Tabular) By-Parts — a shortcut",
      intuition:
        "When the first function is a polynomial, repeated by-parts produces an alternating pattern that you can write in one line: differentiate the polynomial down to zero, integrate the other factor repeatedly, and alternate signs. It is the same answer as ordinary by-parts, faster.",
      definition:
        "If \\(u\\) is a polynomial (so some derivative \\(u^{(n)} = 0\\)) and \\(v\\) the second function, then " +
        "\\(\\displaystyle\\int u\\,v\\,dx = u\\,v_1 - u'\\,v_2 + u''\\,v_3 - u'''\\,v_4 + \\cdots\\), " +
        "where a prime is a derivative of \\(u\\) and a subscript \\(k\\) means integrate \\(v\\) \\(k\\) times. The series terminates because the polynomial's derivatives reach zero.",
      formula: {
        label: "Tabular by-parts series",
        latex:
          "\\int u\\,v\\,dx = u\\,v_1 - u'\\,v_2 + u''\\,v_3 - u'''\\,v_4 + \\cdots",
        symbols: [
          { symbol: "u', u'', \\ldots", meaning: "successive derivatives of the polynomial \\(u\\)" },
          { symbol: "v_1, v_2, \\ldots", meaning: "successive integrals of \\(v\\)" },
        ],
      },
      authoredExample: {
        prompt: "Evaluate \\(\\displaystyle\\int x^2 \\cos 3x\\,dx\\) by the tabular method.",
        steps: [
          "Derivatives of \\(u = x^2\\): \\(x^2,\\ 2x,\\ 2,\\ 0\\). Integrals of \\(\\cos 3x\\): \\(\\tfrac13\\sin 3x,\\ -\\tfrac19\\cos 3x,\\ -\\tfrac{1}{27}\\sin 3x\\).",
          "Alternate signs \\(+,-,+\\): \\(x^2\\cdot\\tfrac13\\sin 3x - 2x\\cdot(-\\tfrac19\\cos 3x) + 2\\cdot(-\\tfrac{1}{27}\\sin 3x)\\).",
          "Simplify.",
        ],
        answer: "\\(\\dfrac{1}{3}x^2\\sin 3x + \\dfrac{2}{9}x\\cos 3x - \\dfrac{2}{27}\\sin 3x + C\\)",
      },
      practiceSet: [
        { prompt: "Tabular by-parts terminates when?", answer: "a derivative of the polynomial \\(u\\) becomes 0" },
        { prompt: "Sign pattern across the terms?", answer: "\\(+, -, +, -, \\ldots\\)" },
        { prompt: "\\(\\int x e^x\\,dx\\) by table: derivatives \\(x,1,0\\); integrals \\(e^x, e^x\\).", answer: "\\(x e^x - e^x + C\\)" },
        { prompt: "Which factor should be \\(u\\) (the one you differentiate)?", answer: "the polynomial", method: "so its derivatives hit zero and the series ends" },
      ],
      traps: [
        {
          title: "Only for a polynomial first function",
          body:
            "The shortcut relies on the polynomial's derivatives reaching zero. If neither factor is a polynomial (e.g. \\(\\int e^x\\sin x\\,dx\\)), the table never terminates — use ordinary or cyclic by-parts instead.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Substitution — the fallback when no product structure helps",
      href: "/notes/mht-cet-maths/indefinite-integration/substitution",
    },
  ],
};
