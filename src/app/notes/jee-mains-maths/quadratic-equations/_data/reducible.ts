import type { SubtopicNote } from "@/app/notes/_types";

export const REDUCIBLE_QE_NOTE: SubtopicNote = {
  subtopicName: "Equations Reducible to Quadratics",
  title: "Equations Reducible to Quadratics",
  oneLineDefinition:
    "Exponential, logarithmic and other equations that turn into a quadratic after one substitution, where the range of the substitution decides which roots survive.",
  whyItMatters:
    "Twenty-six PYQs, sixteen of them multiple choice, and three from 2026. Ten are exponential — put t = eˣ or t = aˣ, often ending in t + 1/t; seven are logarithmic, where taking logs or changing the base gives a quadratic and the domain removes some roots; nine find a quadratic hidden elsewhere — a repeated block such as x² − 9x or x + 1/x, square roots, a continued fraction, or a polynomial that factors. Three ideas cover the page.",
  concepts: [
    // C1 — exponential equations
    {
      kind: "formula" as const,
      slug: "jqe-exponential",
      name: "Exponential equations",
      intuition:
        "Put \\(t=a^x\\). Then \\(a^{2x}=t^2\\), and every \\(t\\) is positive. Two powers whose bases multiply to 1 are \\(t\\) and \\(\\frac1t\\), so their sum gives \\(t+\\frac1t=k\\), a quadratic. A quartic in \\(t\\) whose coefficients read the same both ways divides by \\(t^2\\) into a quadratic in \\(u=t+\\frac1t\\) — and for \\(t>0\\), \\(u\\ge2\\), which removes roots.",
      definition:
        "- \\(t=a^x>0\\): keep only the positive roots in \\(t\\).\n" +
        "- Each positive \\(t\\) gives exactly one \\(x=\\log_a t\\).\n" +
        "- \\(t+\\frac1t=k\\) with \\(t>0\\) has roots only when \\(k\\ge2\\): two if \\(k>2\\), one if \\(k=2\\).\n" +
        "- \\(t^4+pt^3+qt^2+pt+1=0\\): divide by \\(t^2\\) and put \\(u=t+\\frac1t\\).",
      formula: {
        label: "Reciprocal pair",
        latex: "t+\\frac1t=k\\ \\Rightarrow\\ t=\\frac{k\\pm\\sqrt{k^2-4}}{2}",
      },
      authoredExample: {
        prompt: "How many real roots has \\(e^{4x}-3e^{3x}+4e^{2x}-3e^x+1=0\\)?",
        steps: [
          "Put \\(t=e^x>0\\) and divide by \\(t^2\\): \\(\\left(t^2+\\frac{1}{t^2}\\right)-3\\left(t+\\frac1t\\right)+4=0\\).",
          "With \\(u=t+\\frac1t\\ge2\\): \\(u^2-3u+2=0\\), so \\(u=1\\) (rejected) or \\(u=2\\).",
          "\\(t+\\frac1t=2\\) gives \\(t=1\\).",
        ],
        answer: "One real root, \\(x=0\\).",
      },
      selfCheckExample: {
        prompt: "Solve \\(4^x-6\\cdot2^x+8=0\\).",
        steps: [
          "Put \\(t=2^x\\): \\(t^2-6t+8=0\\), so \\(t=2\\) or \\(4\\).",
        ],
        answer: "\\(x=1\\) or \\(x=2\\).",
      },
      practiceSet: [
        { prompt: "Solve \\(9^x-4\\cdot3^x+3=0\\).", answer: "\\(x=0\\) or \\(x=1\\)" },
        { prompt: "Real roots of \\(e^{2x}+e^x-2=0\\)?", answer: "One: \\(x=0\\)" },
        { prompt: "Real roots of \\(e^x+e^{-x}=1\\)?", answer: "None: \\(t+\\frac1t\\ge2\\)" },
        { prompt: "Sum of the roots of \\(5^{2x}-7\\cdot5^x+10=0\\)?", answer: "\\(\\log_5 10\\)" },
      ],
      pyqExampleId: "2a7423e5-cf50-4314-992a-67432990a54f", // 2024 — (√3 + √2)^x + (√3 − √2)^x = 10 as t + 1/t
      traps: [
        {
          title: "Every t must be positive",
          body: "\\(a^x\\) is never \\(0\\) or negative, so such a root in \\(t\\) gives no \\(x\\). The sum of the \\(x\\)-roots is the log of the product of the valid \\(t\\)-roots only — not of every root of the polynomial in \\(t\\).",
        },
      ],
    },

    // C2 — logarithmic equations
    {
      kind: "formula" as const,
      slug: "jqe-logarithmic",
      name: "Logarithmic equations",
      intuition:
        "Two routes. If the unknown sits both in a power and in a log, as in \\(x^{\\log_3 x}\\), take logs so the log itself becomes the unknown \\(t\\). If two logs have swapped bases, \\(\\log_a b\\) and \\(\\log_b a\\), they are \\(y\\) and \\(\\frac1y\\), and the equation becomes \\(y+\\frac cy=k\\), a quadratic. Either way, finish with the domain: every argument positive, every base positive and not 1.",
      definition:
        "- \\(\\log_b a=\\frac{1}{\\log_a b}\\); put \\(y=\\log_a b\\).\n" +
        "- \\(\\log_{a^k}x=\\frac1k\\log_a x\\).\n" +
        "- Unknown in a power and a log: take logs, put \\(t=\\log x\\).\n" +
        "- Domain: arguments \\(>0\\); bases \\(>0\\) and \\(\\ne1\\).",
      formula: {
        label: "Swapped bases",
        latex: "\\log_b a=\\frac{1}{\\log_a b}",
      },
      authoredExample: {
        prompt: "Solve \\(\\log_2 x+2\\log_x 4=5\\).",
        steps: [
          "With \\(y=\\log_2x\\): \\(\\log_x4=2\\log_x2=\\frac2y\\).",
          "\\(y+\\frac4y=5\\): \\(y^2-5y+4=0\\), so \\(y=1\\) or \\(4\\).",
        ],
        answer: "\\(x=2\\) or \\(x=16\\).",
      },
      selfCheckExample: {
        prompt: "Find the product of the roots of \\(x^{\\log_3 x}=9x\\).",
        steps: [
          "Take \\(\\log_3\\): \\(t^2=2+t\\), with \\(t=\\log_3x\\).",
          "\\(t_1+t_2=1\\), so \\(x_1x_2=3^1\\).",
        ],
        answer: "\\(3\\) (roots \\(9\\) and \\(\\frac13\\)).",
      },
      practiceSet: [
        { prompt: "Solve \\(\\log_4 x=3\\).", answer: "\\(x=64\\)" },
        { prompt: "Solve \\(\\log_2(x-1)+\\log_2(x+1)=3\\).", answer: "\\(x=3\\) (\\(-3\\) fails the domain)" },
        { prompt: "Roots of \\((\\ln x)^2-3\\ln x+2=0\\)?", answer: "\\(e\\) and \\(e^2\\)" },
        { prompt: "Roots of \\(\\log_9 x=\\log_3(x-2)\\)?", answer: "\\(x=4\\) (\\(x=1\\) fails)" },
      ],
      pyqExampleId: "71cfcaf5-ee7f-443d-9b84-8f6d3a0dcdce", // 2026 — change of base turns two logs into y + 4/y
      traps: [
        {
          title: "Check every base",
          body: "A root can make a base negative or equal to 1 even when every argument is positive. Test each root in each base and each argument before counting it.",
        },
      ],
    },

    // C3 — a repeated expression as the unknown
    {
      kind: "formula" as const,
      slug: "jqe-substitution",
      name: "A repeated expression as the unknown",
      intuition:
        "Look for a block that appears twice: \\(x^2+5x\\) in \\((x^2+5x+4)(x^2+5x+6)\\), \\(x+\\frac1x\\) inside \\(x^2+\\frac1{x^2}\\), \\(\\sqrt x\\) inside \\(x\\). Call it \\(t\\), solve the quadratic in \\(t\\), then undo \\(t\\) — each block has its own range. A continued fraction that repeats contains a copy of itself, so its value satisfies a quadratic.",
      definition:
        "- Spot a repeated block and call it \\(t\\).\n" +
        "- \\(t=x+\\frac1x\\): \\(x^2+\\frac1{x^2}=t^2-2\\), and real \\(x\\) needs \\(|t|\\ge2\\).\n" +
        "- \\(t=\\sqrt x\\) or \\(t=x^2\\): keep \\(t\\ge0\\).\n" +
        "- A repeating continued fraction \\(y=a+\\frac{1}{b+\\frac1y}\\) gives a quadratic in \\(y\\); keep the positive root.",
      formula: {
        label: "Reciprocal substitution",
        latex: "x^2+\\frac1{x^2}=\\left(x+\\frac1x\\right)^2-2",
      },
      authoredExample: {
        prompt: "Solve \\((x+1)(x+2)(x+3)(x+4)=24\\) over the reals.",
        steps: [
          "Pair the outer and inner factors: \\((x^2+5x+4)(x^2+5x+6)=24\\).",
          "With \\(t=x^2+5x\\): \\(t^2+10t=0\\), so \\(t=0\\) or \\(-10\\).",
          "\\(x^2+5x=0\\) gives \\(x=0,-5\\); \\(x^2+5x+10=0\\) has no real root.",
        ],
        answer: "\\(x=0\\) or \\(x=-5\\).",
      },
      selfCheckExample: {
        prompt: "How many real roots has \\(2\\left(x^2+\\frac1{x^2}\\right)-7\\left(x+\\frac1x\\right)+9=0\\)?",
        steps: [
          "With \\(t=x+\\frac1x\\): \\(2t^2-7t+5=0\\), so \\(t=1\\) or \\(\\frac52\\).",
          "\\(|t|\\ge2\\) rejects \\(t=1\\); \\(t=\\frac52\\) gives \\(x=2\\) and \\(\\frac12\\).",
        ],
        answer: "Two: \\(x=2\\) and \\(x=\\frac12\\).",
      },
      practiceSet: [
        { prompt: "Solve \\(x^4-5x^2+4=0\\).", answer: "\\(x=\\pm1,\\pm2\\)" },
        { prompt: "Solve \\(x-5\\sqrt x+6=0\\).", answer: "\\(x=4\\) or \\(x=9\\)" },
        { prompt: "Value of \\(2+\\frac{1}{2+\\frac{1}{2+\\cdots}}\\)?", answer: "\\(1+\\sqrt2\\)" },
        { prompt: "Real roots of \\(x^4+3x^2+2=0\\)?", answer: "None: both values of \\(x^2\\) are negative" },
      ],
      pyqExampleId: "89026e1b-6520-48bf-a891-7b2ad65bc53d", // 2025 — put t = x^2 − 9x, then keep the rational roots
      traps: [
        {
          title: "Undo the substitution with its range",
          body: "Each root in \\(t\\) must be a value its block can take. \\(x+\\frac1x\\) never lies strictly between \\(-2\\) and \\(2\\), and \\(\\sqrt x\\) and \\(x^2\\) are never negative; such roots give no \\(x\\).",
        },
      ],
    },
  ],
};
