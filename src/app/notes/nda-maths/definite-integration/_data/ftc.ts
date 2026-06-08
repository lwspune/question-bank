import type { SubtopicNote } from "@/app/notes/_types";

export const FTC_NOTE: SubtopicNote = {
  subtopicName: "Fundamental Theorem, Periodic Integrals, and Leibniz Rule",
  title: "Fundamental Theorem, Periodicity and the Leibniz Rule",
  oneLineDefinition:
    "A definite integral is the change in an antiderivative across the limits; periodic integrands repeat over each period, and the Leibniz rule differentiates an integral with a variable limit.",
  whyItMatters:
    "Start here — these are the foundations the rest of the chapter builds on. 11 PYQs, mostly EASY/MODERATE. " +
    "The three ideas: the Fundamental Theorem (evaluate by antiderivative at the limits), periodicity (an integral over many periods is a multiple of one period), and the Leibniz rule (differentiate an integral whose limit is a variable). All quick marks once recognised.",
  concepts: [
    // 1 — fundamental theorem
    {
      kind: "formula" as const,
      slug: "fundamental-theorem",
      name: "The Fundamental Theorem of Calculus",
      intuition:
        "A definite integral measures the net change of an antiderivative between two points. So to evaluate one, find any antiderivative and subtract its values at the limits. Two corollaries the NDA loves: integrating a derivative back gives the original change, and a function that returns to its start over the interval integrates its derivative to zero.",
      definition:
        "The theorem and its corollaries:\n" +
        "- **FTC**: if \\(F'=f\\), then \\(\\displaystyle\\int_a^b f(x)\\,dx = F(b)-F(a)\\).\n" +
        "- \\(\\displaystyle\\int_a^b f'(x)\\,dx = f(b)-f(a)\\). So if \\(f(a)=f(b)\\), the integral is **0**.\n" +
        "- \\(\\displaystyle\\int \\frac{f'(x)}{f(x)}\\,dx = \\ln|f(x)|\\) — spot a derivative over its function.\n" +
        "- Simplify the integrand first: \\(e^{\\ln(\\cos x)} = \\cos x\\); \\(\\frac{d}{dx}\\tan^{-1}\\frac1x = \\frac{-1}{1+x^2}\\).",
      visualizationSlug: "defint-area-region",
      formula: {
        label: "Fundamental Theorem of Calculus",
        latex: "\\int_a^b f(x)\\,dx = F(b)-F(a),\\quad F'=f",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\displaystyle\\int_1^3 (2x-1)\\,dx\\).",
        steps: [
          "An antiderivative of \\(2x-1\\) is \\(F(x)=x^2-x\\).",
          "Apply the limits: \\(F(3)-F(1) = (9-3)-(1-1) = 6-0\\).",
        ],
        answer: "6.",
      },
      selfCheckExample: {
        prompt:
          "If \\(\\displaystyle\\int_a^b x^3\\,dx = 0\\) and \\(\\displaystyle\\int_a^b x^2\\,dx = \\tfrac23\\), find a and b.",
        steps: [
          "\\(\\int_a^b x^3\\,dx = \\tfrac{b^4-a^4}{4} = 0 \\Rightarrow b^4=a^4 \\Rightarrow b=-a\\) (taking \\(b>a\\)).",
          "\\(\\int_a^b x^2\\,dx = \\tfrac{b^3-a^3}{3}\\). With \\(b=-a\\): \\(\\tfrac{-a^3-a^3}{3}=\\tfrac{-2a^3}{3}=\\tfrac23 \\Rightarrow a^3=-1 \\Rightarrow a=-1\\).",
          "So \\(a=-1,\\ b=1\\).",
        ],
        answer: "\\(a=-1,\\ b=1\\).",
      },
      practiceSet: [
        { prompt: "If \\(f(1)=f(4)\\), what is \\(\\int_1^4 f'(x)\\,dx\\)?", answer: "0", method: "\\(f(4)-f(1)=0\\)" },
        { prompt: "\\(\\int_2^{10}\\frac{f'(x)}{f(x)}\\,dx\\) with \\(f(x)=2^x\\) equals?", answer: "\\(\\ln 2^{10}/2^2 = \\ln 2^8 = 8\\ln 2\\)", method: "\\([\\ln f]_2^{10}=\\ln f(10)-\\ln f(2)\\)" },
        { prompt: "Simplify \\(\\int_0^{\\pi/2} e^{\\ln(\\cos x)}\\,dx\\).", answer: "\\(\\int_0^{\\pi/2}\\cos x\\,dx = 1\\)", method: "\\(e^{\\ln u}=u\\)" },
      ],
      pyqExampleId: "c343dcf1-0736-4476-852c-38509e505a27", // ∫x³=0, ∫x²=2/3 → a,b
      traps: [
        {
          title: "Integrating a derivative is not always trivial",
          body:
            "\\(\\int_{-1}^{1}\\frac{d}{dx}\\big(\\tan^{-1}\\frac1x\\big)\\,dx\\) is NOT \\([\\tan^{-1}\\frac1x]_{-1}^1\\) naively, because the function jumps at \\(x=0\\). Compute the derivative \\(\\frac{-1}{1+x^2}\\) first, then integrate to get \\(-\\frac{\\pi}{2}\\).",
        },
      ],
    },

    // 2 — periodic integrals
    {
      kind: "formula" as const,
      slug: "periodic-integrals",
      name: "Integrals of periodic functions",
      intuition:
        "If a function repeats every period T, its integral over a whole number of periods is just that many copies of the integral over one period. So an integral over a huge interval collapses to one period times a count.",
      definition:
        "The periodicity rule:\n" +
        "- If \\(f\\) has period \\(T\\), then \\(\\displaystyle\\int_0^{nT} f(x)\\,dx = n\\int_0^{T} f(x)\\,dx\\).\n" +
        "- Find the period first: \\(\\sin^4x+\\cos^4x\\) has period \\(\\tfrac{\\pi}{2}\\); \\(|\\sin x|\\) has period \\(\\pi\\).\n" +
        "- Two integrals can be **equal** without being computed — a substitution like \\(x=e^t\\) can turn one into the other.",
      authoredExample: {
        prompt: "Given \\(|\\sin x|\\) has period \\(\\pi\\) and \\(\\int_0^{\\pi}|\\sin x|\\,dx = 2\\), find \\(\\int_0^{8\\pi}|\\sin x|\\,dx\\).",
        steps: [
          "\\(|\\sin x|\\) repeats every \\(\\pi\\); the interval \\([0,8\\pi]\\) is exactly 8 periods.",
          "\\(\\int_0^{8\\pi}|\\sin x|\\,dx = 8\\int_0^{\\pi}|\\sin x|\\,dx = 8\\cdot 2\\).",
        ],
        answer: "16.",
      },
      selfCheckExample: {
        prompt:
          "Evaluate \\(\\displaystyle\\int_0^{6\\pi}\\sin^2x\\,dx\\).",
        steps: [
          "\\(\\sin^2x\\) has period \\(\\pi\\), and \\(\\int_0^{\\pi}\\sin^2x\\,dx = \\tfrac{\\pi}{2}\\).",
          "\\([0,6\\pi]\\) contains \\(6\\pi\\div\\pi = 6\\) periods.",
          "So the integral is \\(6\\cdot\\tfrac{\\pi}{2} = 3\\pi\\).",
        ],
        answer: "\\(3\\pi\\).",
      },
      practiceSet: [
        { prompt: "Period of \\(\\sin^4x+\\cos^4x\\)?", answer: "\\(\\pi/2\\)" },
        { prompt: "\\(\\int_0^{4\\pi}|\\sin x|\\,dx\\) given one period gives 2?", answer: "8", method: "4 periods × 2" },
        { prompt: "\\(\\int_0^{nT}f = ?\\) for period-\\(T\\) \\(f\\).", answer: "\\(n\\int_0^T f\\)" },
      ],
      pyqExampleId: "e8dc70ea-37fe-4a09-901a-3a3c5ea4296b", // ∫₀²⁰π(sin⁴+cos⁴)=40k
      traps: [
        {
          title: "Use the function's period, not the trig argument's",
          body:
            "\\(\\sin^4x+\\cos^4x\\) does NOT have period \\(2\\pi\\) — squaring and adding shrinks the period to \\(\\tfrac{\\pi}{2}\\). Always determine the actual period of the whole integrand before counting how many fit.",
        },
      ],
    },

    // 3 — leibniz rule
    {
      kind: "formula" as const,
      slug: "leibniz-rule",
      name: "The Leibniz rule — differentiating an integral",
      intuition:
        "When an integral has a variable in its limit, it defines a function of that variable — and you can differentiate it without computing the integral. The derivative is just the integrand evaluated at the moving limit, times the limit's own derivative.",
      definition:
        "The Leibniz (variable-limit) rule:\n" +
        "- \\(\\displaystyle \\frac{d}{dx}\\int_{a}^{g(x)} f(t)\\,dt = f(g(x))\\cdot g'(x)\\).\n" +
        "- More generally with both limits varying: \\(\\frac{d}{dx}\\int_{u(x)}^{v(x)} f(t)\\,dt = f(v)\\,v' - f(u)\\,u'\\).\n" +
        "- The lower constant limit contributes nothing to the derivative.",
      formula: {
        label: "Leibniz rule (variable upper limit)",
        latex: "\\frac{d}{dx}\\int_{a}^{g(x)} f(t)\\,dt = f(g(x))\\,g'(x)",
      },
      authoredExample: {
        prompt: "If \\(\\phi(x)=\\displaystyle\\int_0^{x^2} \\sin t\\,dt\\), find \\(\\phi'(x)\\).",
        steps: [
          "The upper limit is \\(g(x)=x^2\\), the integrand is \\(\\sin t\\).",
          "By Leibniz: \\(\\phi'(x)=\\sin(g(x))\\cdot g'(x) = \\sin(x^2)\\cdot 2x\\).",
        ],
        answer: "\\(\\phi'(x)=2x\\sin(x^2)\\).",
      },
      selfCheckExample: {
        prompt: "If \\(\\phi(a)=\\displaystyle\\int_0^{a} t f(t)\\,dt\\), what is \\(\\phi'(a)\\)?",
        steps: [
          "Upper limit is \\(a\\) itself, so \\(g(a)=a,\\ g'(a)=1\\).",
          "Leibniz gives \\(\\phi'(a) = a f(a)\\cdot 1\\).",
        ],
        answer: "\\(\\phi'(a)=a\\,f(a)\\).",
      },
      practiceSet: [
        { prompt: "\\(\\frac{d}{dx}\\int_0^{x} e^{t^2}\\,dt = ?\\)", answer: "\\(e^{x^2}\\)" },
        { prompt: "\\(\\frac{d}{dx}\\int_1^{x^3} \\ln t\\,dt = ?\\)", answer: "\\(3x^2\\ln(x^3)\\)", method: "\\(\\ln(x^3)\\cdot 3x^2\\)" },
      ],
      pyqExampleId: "3cd8832a-6dd4-4d95-8390-0b3f424ea44c", // φ'(a)
      traps: [
        {
          title: "Don't forget the chain-rule factor",
          body:
            "\\(\\frac{d}{dx}\\int_a^{g(x)} f\\) is \\(f(g(x))\\cdot g'(x)\\), NOT just \\(f(g(x))\\). The \\(g'(x)\\) factor is the most commonly dropped term.",
        },
      ],
    },
  ],
};
