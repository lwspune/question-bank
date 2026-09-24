import type { SubtopicNote } from "@/app/notes/_types";

export const EVALUATION_AND_SUBSTITUTION_NOTE: SubtopicNote = {
  subtopicName: "Evaluating Definite Integrals — Standard Forms, Algebraic Substitution and By Parts",
  title: "Evaluating Definite Integrals — Standard Forms, Algebraic Substitution and By Parts",
  oneLineDefinition:
    "A definite integral is an antiderivative evaluated between two limits — every Indefinite Integration technique carries over, with one new discipline: when you substitute, move the limits with you.",
  whyItMatters:
    "14 PYQs at 43% HARD, and every one of them is a technique from the Indefinite Integration chapter with limits attached: splitting a numerator against a quadratic, completing a square, partial fractions, a root substitution, by parts on an inverse trig function. " +
    "What is new is bookkeeping — changing the limits with the substitution and evaluating cleanly — and the reduction formula for powers of tan, which appears here and nowhere else. " +
    "The page is worth working slowly once, because the three property pages that follow assume you can finish an integral once the property has reduced it.",
  concepts: [
    // 1 — foundation
    {
      kind: "formula" as const,
      slug: "cetdi-fundamental-theorem",
      name: "The Fundamental Theorem: Evaluate the Antiderivative at the Limits",
      intuition:
        "A definite integral is a number, not a family of functions: find any antiderivative \\(F\\), and the integral from \\(a\\) to \\(b\\) is \\(F(b) - F(a)\\). The constant of integration cancels, which is why it never appears in a definite answer.",
      definition:
        "- \\(\\int_a^b f(x)\\,dx = \\big[F(x)\\big]_a^b = F(b) - F(a)\\), where \\(F' = f\\).\n" +
        "- **Reversing the limits** changes the sign: \\(\\int_b^a = -\\int_a^b\\). **Splitting** at any point \\(c\\): \\(\\int_a^b = \\int_a^c + \\int_c^b\\) — this is what makes piecewise integrands possible.\n" +
        "- The answer is a **number** (or an expression in the given constants); a \\(+c\\) in a definite answer is always wrong.\n" +
        "- Use the same standard formulae as Indefinite Integration: \\(\\int x^n = \\frac{x^{n+1}}{n+1}\\), \\(\\int\\frac{dx}{x^2 + a^2} = \\frac1a\\tan^{-1}\\frac{x}{a}\\), \\(\\int\\frac{f'}{f} = \\log|f|\\), and so on.\n" +
        "- Keep every sign: \\(F(b) - F(a)\\) with a negative \\(F(a)\\) is where marks are lost.",
      formula: {
        label: "Fundamental theorem and two properties",
        latex:
          "\\int_a^b f(x)\\,dx = F(b) - F(a) \\qquad \\int_b^a f = -\\int_a^b f \\qquad \\int_a^b f = \\int_a^c f + \\int_c^b f",
        symbols: [{ symbol: "\\(F\\)", meaning: "any antiderivative of \\(f\\)" }],
      },
      authoredExample: {
        prompt: "Evaluate \\(\\int_1^2 (3x^2 + 1)\\,dx\\).",
        steps: [
          "Antiderivative: \\(F(x) = x^3 + x\\).",
          "\\(F(2) - F(1) = (8 + 2) - (1 + 1) = 10 - 2\\).",
        ],
        answer: "\\(8\\)",
      },
      practiceSet: [
        {
          prompt: "\\(\\int_0^1 (2x + 3)\\,dx = ?\\)",
          answer: "\\(4\\)",
          method: "\\([x^2 + 3x]_0^1\\).",
        },
        {
          prompt: "\\(\\int_0^{\\pi/2}\\cos x\\,dx = ?\\)",
          answer: "\\(1\\)",
        },
        {
          prompt: "\\(\\int_1^e \\dfrac{dx}{x} = ?\\)",
          answer: "\\(1\\)",
          method: "\\([\\log x]_1^e\\).",
        },
        {
          prompt: "\\(\\int_2^0 x\\,dx = ?\\)",
          answer: "\\(-2\\)",
          method: "Reversed limits: \\(-[x^2/2]_0^2\\).",
        },
      ],
      traps: [
        {
          title: "Dropping the lower limit's sign",
          body:
            "\\([x^3/3]_{-1}^{1} = \\frac13 - \\left(-\\frac13\\right) = \\frac23\\), not \\(0\\). A negative value of \\(F(a)\\) is subtracted, which adds. This single slip is behind most wrong answers on otherwise easy definite integrals.",
        },
      ],
    },

    // 2 — standard forms with limits
    {
      kind: "formula" as const,
      slug: "cetdi-standard-forms-with-limits",
      name: "Standard Forms with Limits — Split the Numerator, Complete the Square, Partial Fractions",
      intuition:
        "\\(\\dfrac{3x + 1}{x^2 + 4}\\) is two integrals in one: the \\(3x\\) part is \\(\\frac{f'}{f}\\) and gives a log, the \\(1\\) part is the arctan standard form. Recognising the split is the whole question; the limits are then plugged into each piece.",
      definition:
        "- **Linear over quadratic**: write \\(\\dfrac{px + q}{x^2 + a^2} = \\dfrac{p}{2}\\cdot\\dfrac{2x}{x^2 + a^2} + \\dfrac{q}{x^2 + a^2}\\); the first gives \\(\\frac{p}{2}\\log(x^2 + a^2)\\), the second \\(\\frac{q}{a}\\tan^{-1}\\frac{x}{a}\\).\n" +
        "- **Complete the square** for \\(x^2 - 2x + 4 = (x - 1)^2 + 3\\); with a \\(3/2\\) power below use \\(\\int\\dfrac{dx}{(u^2 + k^2)^{3/2}} = \\dfrac{u}{k^2\\sqrt{u^2 + k^2}}\\).\n" +
        "- **Partial fractions** for \\(\\dfrac{x}{(x + 2)(x + 3)} = \\dfrac{-2}{x + 2} + \\dfrac{3}{x + 3}\\); the answer is a combination of logs that the options write as a single \\(\\log\\dfrac{p}{q}\\), so combine: \\(-2\\log\\frac43 + 3\\log\\frac54 = \\log\\dfrac{(5/4)^3}{(4/3)^2}\\).\n" +
        "- Evaluate each piece at both limits **before** simplifying logs — \\(\\log 8 - \\log 4 = \\log 2\\) is cleaner than carrying \\(\\log(x^2 + 4)\\) around.",
      formula: {
        label: "Linear numerator over a quadratic",
        latex:
          "\\int\\frac{px + q}{x^2 + a^2}\\,dx = \\frac{p}{2}\\log\\left(x^2 + a^2\\right) + \\frac{q}{a}\\tan^{-1}\\frac{x}{a} \\qquad \\int\\frac{dx}{(u^2 + k^2)^{3/2}} = \\frac{u}{k^2\\sqrt{u^2 + k^2}}",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\int_0^1 \\dfrac{2x + 3}{x^2 + 1}\\,dx\\).",
        steps: [
          "Split: \\(\\dfrac{2x}{x^2 + 1} + \\dfrac{3}{x^2 + 1}\\).",
          "First piece: \\([\\log(x^2 + 1)]_0^1 = \\log 2 - \\log 1 = \\log 2\\).",
          "Second piece: \\(3[\\tan^{-1}x]_0^1 = 3\\cdot\\dfrac{\\pi}{4}\\).",
        ],
        answer: "\\(\\log 2 + \\dfrac{3\\pi}{4}\\)",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\int_0^1 \\dfrac{dx}{(x + 1)(x + 2)}\\).",
        steps: [
          "Partial fractions: \\(\\dfrac{1}{(x + 1)(x + 2)} = \\dfrac{1}{x + 1} - \\dfrac{1}{x + 2}\\).",
          "\\([\\log(x + 1) - \\log(x + 2)]_0^1 = (\\log 2 - \\log 3) - (0 - \\log 2) = 2\\log 2 - \\log 3\\).",
          "As a single log: \\(\\log\\dfrac{4}{3}\\).",
        ],
        answer: "\\(\\log\\dfrac{4}{3}\\)",
      },
      practiceSet: [
        {
          prompt: "\\(\\int_0^1 \\dfrac{dx}{x^2 + 1} = ?\\)",
          answer: "\\(\\dfrac{\\pi}{4}\\)",
        },
        {
          prompt: "\\(\\int_0^2 \\dfrac{x}{x^2 + 4}\\,dx = ?\\)",
          answer: "\\(\\dfrac12\\log 2\\)",
          method: "\\(\\frac12[\\log(x^2 + 4)]_0^2 = \\frac12\\log\\frac84\\).",
        },
        {
          prompt: "\\(\\int_0^2 \\dfrac{dx}{x^2 + 4} = ?\\)",
          answer: "\\(\\dfrac{\\pi}{8}\\)",
          method: "\\(\\frac12[\\tan^{-1}(x/2)]_0^2\\).",
        },
        {
          prompt: "\\(\\int_1^2 \\dfrac{dx}{x(x + 1)} = ?\\)",
          answer: "\\(\\log\\dfrac{4}{3}\\)",
          method: "\\([\\log x - \\log(x + 1)]_1^2\\).",
        },
      ],
      pyqExampleId: "5517ff93-abaa-4ce2-b3dd-62462d8f9b0c",
      traps: [
        {
          title: "Forgetting the half in the log piece",
          body:
            "\\(\\int\\dfrac{3x}{x^2 + 4}\\,dx = \\dfrac32\\log(x^2 + 4)\\), because the derivative of the denominator is \\(2x\\), not \\(x\\). The option built from \\(3\\log(\\dots)\\) is always present.",
        },
      ],
    },

    // 3 — substitution, change the limits
    {
      kind: "formula" as const,
      slug: "cetdi-substitution-change-the-limits",
      name: "Substitution — Change the Limits, Never Substitute Back",
      intuition:
        "When you put \\(x + 1 = t^2\\), the integral becomes an integral in \\(t\\), and its limits must become \\(t\\)-limits: \\(x = 0\\) is \\(t = 1\\), \\(x = 3\\) is \\(t = 2\\). Then you never return to \\(x\\) at all, which is faster and removes a whole class of errors.",
      definition:
        "- **Procedure**: choose \\(t\\); write \\(dx\\) in terms of \\(dt\\); convert **both limits**; integrate in \\(t\\); evaluate. Do not convert the antiderivative back to \\(x\\).\n" +
        "- **Root substitutions**: \\(\\sqrt{x + 1} = t\\) turns \\(\\dfrac{dx}{(x + 2)\\sqrt{x + 1}}\\) into \\(\\dfrac{2\\,dt}{t^2 + 1}\\); \\(2 + \\sqrt{x} = t\\) turns \\(\\dfrac{dx}{2 + \\sqrt x}\\) into \\(\\dfrac{2(t - 2)\\,dt}{t}\\).\n" +
        "- **Trigonometric substitution**: \\(x = \\sin\\theta\\) for \\(\\sqrt{1 - x^2}\\) (then \\(\\dfrac{x^2}{(1 - x^2)^{3/2}}\\,dx = \\tan^2\\theta\\,d\\theta\\)); \\(x = \\cos\\theta\\) for \\(\\sqrt{\\dfrac{1 - x}{1 + x}}\\) — or rationalise it to \\(\\dfrac{1 - x}{\\sqrt{1 - x^2}}\\) and integrate directly.\n" +
        "- **Manufactured substitutions**: \\(\\dfrac{(x - x^3)^{1/3}}{x^4} = \\dfrac{\\left(\\frac{1}{x^2} - 1\\right)^{1/3}}{x^3}\\), so \\(t = \\dfrac{1}{x^2} - 1\\) with \\(dt = -\\dfrac{2}{x^3}dx\\). Look for the derivative of the bracket sitting outside it.\n" +
        "- A **negative** \\(dt\\) or reversed limits after substitution is normal — carry the sign, then flip the limits.",
      formula: {
        label: "Substitution with limits",
        latex:
          "\\int_a^b f(g(x))\\,g'(x)\\,dx = \\int_{g(a)}^{g(b)} f(t)\\,dt \\qquad \\int_0^1\\sqrt{\\frac{1 - x}{1 + x}}\\,dx = \\int_0^1\\frac{1 - x}{\\sqrt{1 - x^2}}\\,dx = \\frac{\\pi}{2} - 1",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\int_0^3 \\dfrac{dx}{\\sqrt{x + 1}\\,(x + 5)}\\).",
        steps: [
          "Put \\(x + 1 = t^2\\), \\(dx = 2t\\,dt\\); limits: \\(x = 0 \\Rightarrow t = 1\\), \\(x = 3 \\Rightarrow t = 2\\). Also \\(x + 5 = t^2 + 4\\).",
          "Integral \\(= \\int_1^2\\dfrac{2t\\,dt}{t\\,(t^2 + 4)} = 2\\int_1^2\\dfrac{dt}{t^2 + 4} = 2\\cdot\\dfrac12\\left[\\tan^{-1}\\dfrac{t}{2}\\right]_1^2\\).",
          "\\(= \\tan^{-1}1 - \\tan^{-1}\\dfrac12 = \\dfrac{\\pi}{4} - \\tan^{-1}\\dfrac12\\), which equals \\(\\tan^{-1}\\dfrac{1 - 1/2}{1 + 1/2} = \\tan^{-1}\\dfrac13\\).",
        ],
        answer: "\\(\\tan^{-1}\\dfrac{1}{3}\\)",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\int_0^{1/2}\\dfrac{dx}{\\sqrt{1 - x^2}}\\) by the substitution \\(x = \\sin\\theta\\).",
        steps: [
          "\\(dx = \\cos\\theta\\,d\\theta\\), \\(\\sqrt{1 - x^2} = \\cos\\theta\\); limits \\(x = 0 \\Rightarrow \\theta = 0\\), \\(x = \\frac12 \\Rightarrow \\theta = \\frac{\\pi}{6}\\).",
          "Integral \\(= \\int_0^{\\pi/6} d\\theta = \\dfrac{\\pi}{6}\\).",
        ],
        answer: "\\(\\dfrac{\\pi}{6}\\)",
      },
      practiceSet: [
        {
          prompt: "With \\(t = \\sqrt{x + 1}\\), the limits \\(x = 0\\) to \\(x = 8\\) become?",
          answer: "\\(t = 1\\) to \\(t = 3\\).",
        },
        {
          prompt: "\\(\\int_0^1 \\dfrac{2x}{(x^2 + 1)^2}\\,dx = ?\\)",
          answer: "\\(\\dfrac12\\)",
          method: "\\(t = x^2 + 1\\): \\(\\int_1^2 t^{-2}dt\\).",
        },
        {
          prompt: "\\(\\int_0^{\\pi/2}\\sin^3x\\cos x\\,dx = ?\\)",
          answer: "\\(\\dfrac14\\)",
          method: "\\(t = \\sin x\\), limits \\(0\\) to \\(1\\).",
        },
        {
          prompt: "\\(\\int_1^4 \\dfrac{dx}{\\sqrt{x}(1 + \\sqrt{x})} = ?\\)",
          answer: "\\(2\\log\\dfrac32\\)",
          method: "\\(t = 1 + \\sqrt x\\), \\(dx = 2(t - 1)dt\\): \\(2[\\log t]_2^3\\).",
        },
      ],
      pyqExampleId: "0e91f7b7-c21c-4e8e-9675-0d07e807fe47",
      traps: [
        {
          title: "Substituting back and using the old limits on the new variable",
          body:
            "After \\(t = \\tan x\\), evaluating \\([\\tan^{-1}t]\\) at \\(x = \\frac{\\pi}{4}\\) instead of at \\(t = 1\\) gives nonsense. Either convert the limits, or convert the antiderivative back — never mix the two.",
        },
        {
          title: "The option that hides in the log",
          body:
            "\\(2 - 4\\log\\frac32\\) is the same number as \\(2\\log\\dfrac{4e}{9}\\): write \\(2 = 2\\log e\\) and combine. When your answer is not in the list, rewrite it before deciding it is wrong.",
        },
      ],
    },

    // 4 — by parts
    {
      kind: "formula" as const,
      slug: "cetdi-by-parts-inverse-trig-and-ex-f-plus-f-prime",
      name: "By Parts with Limits — Inverse Trig Integrands and eˣ(f + f′)",
      intuition:
        "\\(\\int_0^1\\tan^{-1}x\\,dx\\) has no standard formula, but treating it as \\(1\\cdot\\tan^{-1}x\\) and differentiating the inverse function turns it into an ordinary rational integral. The boundary term \\([x\\tan^{-1}x]_0^1\\) is evaluated on the spot.",
      definition:
        "- **By parts with limits**: \\(\\int_a^b u\\,dv = \\big[uv\\big]_a^b - \\int_a^b v\\,du\\). Evaluate the bracket immediately; only the remaining integral needs work.\n" +
        "- **Inverse trig alone**: take \\(u = \\tan^{-1}x\\) (or \\(\\cos^{-1}x\\)), \\(dv = dx\\). Then \\(\\int_0^1\\tan^{-1}x\\,dx = \\dfrac{\\pi}{4} - \\int_0^1\\dfrac{x}{1 + x^2}dx = \\dfrac{\\pi}{4} - \\dfrac12\\log 2\\); \\(\\int_0^1\\cos^{-1}x\\,dx = 0 + \\int_0^1\\dfrac{x}{\\sqrt{1 - x^2}}dx = 1\\).\n" +
        "- **\\(e^x(f + f')\\)**: \\(\\int e^x[f(x) + f'(x)]\\,dx = e^x f(x)\\). Recognise it before integrating: \\(\\dfrac{e^x}{x}(1 + x\\log x) = e^x\\left(\\log x + \\dfrac1x\\right)\\), so the answer is \\([e^x\\log x]_1^e = e^e\\).\n" +
        "- **Polynomial times exponential** (\\(x^2e^x\\)): by parts twice, or the tabular method; \\(\\int_0^1 x^2e^x\\,dx = [x^2e^x - 2xe^x + 2e^x]_0^1 = e - 2\\).\n" +
        "- A stem that defines \\(f\\) by \\(f' = f\\), \\(f(0) = 1\\) means \\(f = e^x\\); read the definition, then integrate.",
      formula: {
        label: "By parts and the e^x(f + f′) shortcut",
        latex:
          "\\int_a^b u\\,dv = \\big[uv\\big]_a^b - \\int_a^b v\\,du \\qquad \\int e^x\\left[f(x) + f'(x)\\right]dx = e^x f(x) \\qquad \\int_0^1\\tan^{-1}x\\,dx = \\frac{\\pi}{4} - \\frac12\\log 2",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\int_0^1 x\\,e^{x}\\,dx\\).",
        steps: [
          "By parts with \\(u = x\\), \\(dv = e^x dx\\): \\([xe^x]_0^1 - \\int_0^1 e^x\\,dx\\).",
          "\\([xe^x]_0^1 = e\\); \\(\\int_0^1 e^x dx = e - 1\\).",
          "\\(e - (e - 1) = 1\\).",
        ],
        answer: "\\(1\\)",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\int_0^{1/2}\\sin^{-1}x\\,dx\\).",
        steps: [
          "By parts, \\(u = \\sin^{-1}x\\), \\(dv = dx\\): \\([x\\sin^{-1}x]_0^{1/2} - \\int_0^{1/2}\\dfrac{x}{\\sqrt{1 - x^2}}\\,dx\\).",
          "Bracket: \\(\\dfrac12\\cdot\\dfrac{\\pi}{6} = \\dfrac{\\pi}{12}\\). Remaining integral: \\([-\\sqrt{1 - x^2}]_0^{1/2} = -\\dfrac{\\sqrt3}{2} + 1\\).",
          "Total: \\(\\dfrac{\\pi}{12} - 1 + \\dfrac{\\sqrt3}{2}\\).",
        ],
        answer: "\\(\\dfrac{\\pi}{12} + \\dfrac{\\sqrt3}{2} - 1\\)",
      },
      practiceSet: [
        {
          prompt: "\\(\\int_1^e \\log x\\,dx = ?\\)",
          answer: "\\(1\\)",
          method: "\\([x\\log x - x]_1^e\\).",
        },
        {
          prompt: "\\(\\int_0^1 e^x(x + 1)\\,dx = ?\\)",
          answer: "\\(e\\)",
          method: "\\(f = x\\), \\(f' = 1\\): \\([xe^x]_0^1\\).",
        },
        {
          prompt: "\\(\\int_0^{\\pi/2} x\\cos x\\,dx = ?\\)",
          answer: "\\(\\dfrac{\\pi}{2} - 1\\)",
          method: "\\([x\\sin x + \\cos x]_0^{\\pi/2}\\).",
        },
        {
          prompt: "\\(\\int_0^1 e^x\\left(\\sin x + \\cos x\\right)dx = ?\\)",
          answer: "\\(e\\sin 1\\)",
          method: "\\(f = \\sin x\\).",
        },
      ],
      pyqExampleId: "447960cf-4650-4026-a8b3-6ba1f918e295",
      traps: [
        {
          title: "Not spotting f + f′",
          body:
            "\\(\\dfrac{e^x}{x}(1 + x\\log x)\\) integrated by parts from scratch is three lines of work that should be one: distribute to \\(e^x(\\log x + 1/x)\\) and read off \\(e^x\\log x\\). Whenever \\(e^x\\) multiplies a sum, test whether one term is the derivative of the other.",
        },
      ],
    },

    // 5 — reduction
    {
      kind: "formula" as const,
      slug: "cetdi-reduction-tan-n-plus-tan-n-minus-2",
      name: "Reduction: I_n + I_{n−2} for Powers of tan",
      intuition:
        "\\(\\tan^{12}\\theta\\) on its own is hopeless, but \\(\\tan^{12}\\theta + \\tan^{10}\\theta = \\tan^{10}\\theta\\sec^2\\theta\\), and that is a one-line substitution. The question asks for the SUM precisely because the sum is easy and the parts are not.",
      definition:
        "- With \\(I_n = \\int_0^{\\pi/4}\\tan^n\\theta\\,d\\theta\\): \\(I_n + I_{n-2} = \\int_0^{\\pi/4}\\tan^{n-2}\\theta\\,\\sec^2\\theta\\,d\\theta = \\left[\\dfrac{\\tan^{n-1}\\theta}{n - 1}\\right]_0^{\\pi/4} = \\dfrac{1}{n - 1}\\).\n" +
        "- So \\(I_{12} + I_{10} = \\dfrac{1}{11}\\), \\(I_8 + I_6 = \\dfrac17\\): the answer is \\(\\dfrac{1}{(\\text{larger index}) - 1}\\).\n" +
        "- The same trick with \\(\\cot^n\\) on \\([\\pi/4, \\pi/2]\\), and with \\(\\sec^n\\) via \\(\\sec^2 = 1 + \\tan^2\\).\n" +
        "- If a single \\(I_n\\) is asked, apply the relation repeatedly down to \\(I_0 = \\dfrac{\\pi}{4}\\) or \\(I_1 = \\dfrac12\\log 2\\).",
      formula: {
        label: "tan-power reduction on [0, π/4]",
        latex:
          "I_n = \\int_0^{\\pi/4}\\tan^n\\theta\\,d\\theta \\ \\Rightarrow\\ I_n + I_{n-2} = \\frac{1}{n - 1} \\qquad I_0 = \\frac{\\pi}{4},\\ I_1 = \\frac12\\log 2",
      },
      authoredExample: {
        prompt: "If \\(I_n = \\int_0^{\\pi/4}\\tan^n\\theta\\,d\\theta\\), find \\(I_8 + I_6\\).",
        steps: [
          "\\(I_8 + I_6 = \\int_0^{\\pi/4}\\tan^6\\theta(\\tan^2\\theta + 1)\\,d\\theta = \\int_0^{\\pi/4}\\tan^6\\theta\\sec^2\\theta\\,d\\theta\\).",
          "Put \\(t = \\tan\\theta\\): \\(\\int_0^1 t^6\\,dt = \\dfrac17\\).",
        ],
        answer: "\\(\\dfrac{1}{7}\\)",
      },
      selfCheckExample: {
        prompt: "With the same \\(I_n\\), find \\(I_4\\).",
        steps: [
          "\\(I_4 + I_2 = \\dfrac13\\) and \\(I_2 + I_0 = 1\\), with \\(I_0 = \\dfrac{\\pi}{4}\\).",
          "\\(I_2 = 1 - \\dfrac{\\pi}{4}\\), so \\(I_4 = \\dfrac13 - 1 + \\dfrac{\\pi}{4} = \\dfrac{\\pi}{4} - \\dfrac23\\).",
        ],
        answer: "\\(\\dfrac{\\pi}{4} - \\dfrac{2}{3}\\)",
      },
      practiceSet: [
        {
          prompt: "\\(I_{10} + I_8 = ?\\)",
          answer: "\\(\\dfrac19\\)",
        },
        {
          prompt: "\\(I_2 = ?\\)",
          answer: "\\(1 - \\dfrac{\\pi}{4}\\)",
          method: "\\(\\int_0^{\\pi/4}(\\sec^2\\theta - 1)\\,d\\theta\\).",
        },
        {
          prompt: "\\(I_1 = ?\\)",
          answer: "\\(\\dfrac12\\log 2\\)",
          method: "\\([\\log\\sec\\theta]_0^{\\pi/4}\\).",
        },
        {
          prompt: "\\(\\int_0^{\\pi/4}\\tan^5\\theta\\sec^2\\theta\\,d\\theta = ?\\)",
          answer: "\\(\\dfrac16\\)",
        },
      ],
      pyqExampleId: "43adde47-2b29-49c1-9b25-d35e9b1a65e1",
      traps: [
        {
          title: "Answering 1/(n+1) instead of 1/(n−1)",
          body:
            "\\(\\tan^{n-2}\\sec^2\\) integrates to \\(\\dfrac{\\tan^{n-1}}{n - 1}\\). For \\(I_{12} + I_{10}\\) the answer is \\(\\dfrac{1}{11}\\); \\(\\dfrac{1}{13}\\) and \\(\\dfrac{1}{12}\\) are the distractors.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Indefinite Integration — Integration by Substitution (the techniques this page applies with limits)",
      href: "/notes/mht-cet-maths/indefinite-integration/substitution",
    },
    {
      label: "Indefinite Integration — Integration by Parts",
      href: "/notes/mht-cet-maths/indefinite-integration/integration-by-parts",
    },
  ],
};
