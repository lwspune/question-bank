import type { SubtopicNote } from "@/app/notes/_types";

export const CB_MA_IN_DEFSUB_NOTE: SubtopicNote = {
  subtopicName: "Definite Integrals by Substitution",
  title: "Definite Integrals by Substitution",
  oneLineDefinition:
    "Substitute t = g(x) in a definite integral and change the limits to values of t, so the value comes straight from t without going back to x.",
  whyItMatters:
    "36 questions, nineteen of them from board papers from 2022 to 2026. The board sets three- and five-mark questions in which the substitution is the whole problem: t = eˣ or e²ˣ (2022, 2023, 2025, 2026), t = log x (2023), t = sin x or tan x (2022, 2023, 2025) and t = sin x − cos x (two in 2024), with one-mark MCQs that need t = sin x, t = cot θ or t = 5x² + 1 (2024, 2025). The textbook adds Examples 26 and 27, Exercise 7.9 and Miscellaneous Questions 25 to 27, 29 and 30.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbmin-def-newlimits",
      name: "Change the limits with the variable",
      intuition:
        "When you put t = g(x) in a definite integral, the limits are still values of x. Change them to values of t at once: when x = a, t = g(a), and when x = b, t = g(b). Then work in t to the end and never go back to x.",
      definition:
        "- **NCERT's steps:** substitute, integrate in the new variable without a constant, write the answer back in x, and put in the old limits.\n" +
        "- **The quicker way (NCERT's note):** keep the integral in the new variable and change the limits, so step three is not needed.\n" +
        "- Write the new limits as a line of the answer: \"when \\(x = 0\\), \\(t = 1\\); when \\(x = 1\\), \\(t = e\\)\".\n" +
        "- If the new lower limit is bigger than the new upper limit, keep it, or use \\(\\int_p^q = -\\int_q^p\\) to swap the limits and the sign together.\n" +
        "- Choices that come up often: \\(t = e^x\\) when \\(e^x\\) and \\(e^{2x}\\) appear; \\(t = \\log x\\) when \\(\\dfrac{dx}{x}\\) appears; \\(t = x^n\\) when \\(x^{n-1}\\,dx\\) appears; \\(t = \\sqrt{x}\\) for \\(\\dfrac{f(\\sqrt{x})}{\\sqrt{x}}\\).\n" +
        "- Never mix the two ways: an answer in t with the old x limits is wrong.",
      formula: {
        label: "Substitution with new limits",
        latex: "\\int_a^b f(g(x))\\,g'(x)\\,dx = \\int_{g(a)}^{g(b)} f(t)\\,dt",
        symbols: [
          { symbol: "\\(t = g(x)\\)", meaning: "the new variable, so dt = g′(x) dx" },
          { symbol: "\\(g(a), g(b)\\)", meaning: "the new lower and upper limits" },
        ],
      },
      authoredExample: {
        prompt: "Evaluate \\(\\int_1^{2} \\dfrac{e^{1/x}}{x^2}\\,dx\\).",
        steps: [
          "Let \\(I = \\int_1^2 \\dfrac{e^{1/x}}{x^2}\\,dx\\).",
          "Put \\(t = \\dfrac{1}{x}\\). Then \\(dt = -\\dfrac{1}{x^2}\\,dx\\), so \\(\\dfrac{dx}{x^2} = -dt\\).",
          "When \\(x = 1\\), \\(t = 1\\); when \\(x = 2\\), \\(t = \\dfrac{1}{2}\\).",
          "\\(I = \\int_1^{1/2} e^t\\,(-dt) = \\int_{1/2}^{1} e^t\\,dt\\).",
          "\\(I = \\big[e^t\\big]_{1/2}^{1} = e - e^{1/2}\\).",
        ],
        answer: "\\(e - \\sqrt{e}\\)",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\int_0^{1} \\dfrac{x^3}{1 + x^8}\\,dx\\).",
        steps: [
          "Put \\(t = x^4\\), so \\(x^3\\,dx = \\dfrac{dt}{4}\\); t runs from 0 to 1.",
          "\\(\\dfrac{1}{4}\\int_0^1 \\dfrac{dt}{1 + t^2} = \\dfrac{1}{4} \\times \\dfrac{\\pi}{4}\\).",
        ],
        answer: "\\(\\dfrac{\\pi}{16}\\)",
      },
      practiceSet: [
        {
          prompt: "Evaluate \\(\\int_0^{1} x^2 e^{x^3}\\,dx\\).",
          answer: "\\(t = x^3\\), t from 0 to 1: \\(\\dfrac{1}{3}\\int_0^1 e^t\\,dt = \\dfrac{e - 1}{3}\\)",
        },
        {
          prompt: "Evaluate \\(\\int_1^{e^2} \\dfrac{dx}{x(1 + \\log x)}\\).",
          answer: "\\(t = 1 + \\log x\\), t from 1 to 3: \\(\\int_1^3 \\dfrac{dt}{t} = \\log 3\\)",
        },
        {
          prompt: "Evaluate \\(\\int_0^{4} \\dfrac{dx}{1 + \\sqrt{x}}\\).",
          answer: "\\(t = \\sqrt{x}\\), \\(dx = 2t\\,dt\\), t from 0 to 2: \\(2\\int_0^2 \\left(1 - \\dfrac{1}{1 + t}\\right)dt = 4 - 2\\log 3\\)",
        },
      ],
      pyqExampleId: "5e97feab-5079-413a-89c4-a75f5eda63d6",
      traps: [
        {
          title: "Keeping the old limits",
          body: "After \\(t = e^x\\), the limits 0 and 2 belong to x. In t they are \\(e^0 = 1\\) and \\(e^2\\). Using 0 and 2 for t is the commonest lost mark in this topic.",
        },
        {
          title: "Losing the minus sign of dt",
          body: "For \\(t = \\cos x\\), \\(t = \\cot x\\) or \\(t = \\dfrac{1}{x}\\), dt carries a minus sign. Keep it until you reverse the limits, which removes it.",
        },
        {
          title: "Mixing the two ways",
          body: "Either go back to x and use the old limits, or stay in t with the new limits. An antiderivative in t with the x limits put in gives a wrong value.",
        },
        {
          title: "Dropping the constant from dt",
          body: "\\(t = x^3\\) gives \\(x^2\\,dx = \\dfrac{dt}{3}\\), and \\(t = 5x^2 + 1\\) gives \\(x\\,dx = \\dfrac{dt}{10}\\). The constant belongs in front of the new integral.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmin-def-trigsub",
      name: "Trigonometric substitutions: t = sin x, cos x or tan x",
      intuition:
        "If the integrand has a factor cos x dx and the rest is in sin x, put t = sin x. If it has sec² x dx and the rest is in tan x, put t = tan x. Limits like 0, π/4 and π/2 then become simple numbers such as 0 and 1.",
      definition:
        "- \\(\\cos x\\,dx\\) with the rest in \\(\\sin x\\): \\(t = \\sin x\\). Limits: \\(x = 0 \\to t = 0\\), \\(x = \\dfrac{\\pi}{2} \\to t = 1\\).\n" +
        "- \\(\\sin x\\,dx\\) with the rest in \\(\\cos x\\): \\(t = \\cos x\\), \\(dt = -\\sin x\\,dx\\). Limits: \\(x = 0 \\to t = 1\\), \\(x = \\dfrac{\\pi}{2} \\to t = 0\\).\n" +
        "- \\(\\sec^2 x\\,dx\\) with the rest in \\(\\tan x\\): \\(t = \\tan x\\). Limits: \\(x = 0 \\to t = 0\\), \\(x = \\dfrac{\\pi}{4} \\to t = 1\\).\n" +
        "- An odd power: keep one factor for dt and write the rest with \\(\\sin^2 x + \\cos^2 x = 1\\), as in \\(\\cos^5 x = (1 - \\sin^2 x)^2\\cos x\\).\n" +
        "- A denominator made of even powers such as \\(\\cos^4 x + \\sin^4 x\\): divide above and below by \\(\\cos^4 x\\) to bring in \\(\\tan x\\) and \\(\\sec^2 x\\).\n" +
        "- \\(\\sin 2x = 2\\sin x\\cos x\\) gives the factor \\(\\cos x\\,dx\\) that \\(t = \\sin x\\) needs.\n" +
        "- After the substitution, another method may follow: partial fractions, a standard form or integration by parts.",
      formula: {
        label: "Sine substitution",
        latex: "t = \\sin x,\\quad dt = \\cos x\\,dx,\\quad x: 0 \\to \\dfrac{\\pi}{2} \\;\\Rightarrow\\; t: 0 \\to 1",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\int_0^{\\pi/2} \\sin^3 x\\cos^2 x\\,dx\\).",
        steps: [
          "Let \\(I = \\int_0^{\\pi/2} \\sin^3 x\\cos^2 x\\,dx\\).",
          "Keep one \\(\\sin x\\): \\(\\sin^3 x = (1 - \\cos^2 x)\\sin x\\), so \\(I = \\int_0^{\\pi/2} (1 - \\cos^2 x)\\cos^2 x\\sin x\\,dx\\).",
          "Put \\(t = \\cos x\\). Then \\(dt = -\\sin x\\,dx\\).",
          "When \\(x = 0\\), \\(t = 1\\); when \\(x = \\dfrac{\\pi}{2}\\), \\(t = 0\\).",
          "\\(I = \\int_1^0 (1 - t^2)t^2\\,(-dt) = \\int_0^1 (t^2 - t^4)\\,dt\\).",
          "\\(I = \\left[\\dfrac{t^3}{3} - \\dfrac{t^5}{5}\\right]_0^1 = \\dfrac{1}{3} - \\dfrac{1}{5}\\).",
          "\\(I = \\dfrac{2}{15}\\).",
        ],
        answer: "\\(\\dfrac{2}{15}\\)",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\int_0^{\\pi/4} \\tan^2 x\\sec^2 x\\,dx\\).",
        steps: ["Put \\(t = \\tan x\\), t from 0 to 1: \\(\\int_0^1 t^2\\,dt = \\dfrac{1}{3}\\)."],
        answer: "\\(\\dfrac{1}{3}\\)",
      },
      practiceSet: [
        {
          prompt: "Evaluate \\(\\int_0^{\\pi/2} \\dfrac{\\cos x}{1 + \\sin^2 x}\\,dx\\).",
          answer: "\\(t = \\sin x\\), t from 0 to 1: \\(\\big[\\tan^{-1}t\\big]_0^1 = \\dfrac{\\pi}{4}\\)",
        },
        {
          prompt: "Evaluate \\(\\int_0^{\\pi/3} \\dfrac{\\sin x}{\\cos^2 x}\\,dx\\).",
          answer: "\\(t = \\cos x\\), t from 1 to \\(\\dfrac{1}{2}\\): \\(\\int_{1/2}^{1} \\dfrac{dt}{t^2} = \\left[-\\dfrac{1}{t}\\right]_{1/2}^{1} = 1\\)",
        },
        {
          prompt: "Evaluate \\(\\int_0^{\\pi/2} \\sin 2x\\,e^{\\sin^2 x}\\,dx\\).",
          answer: "\\(t = \\sin^2 x\\), \\(dt = \\sin 2x\\,dx\\), t from 0 to 1: \\(\\int_0^1 e^t\\,dt = e - 1\\)",
        },
      ],
      pyqExampleId: "7eecea78-d737-411e-91de-c52fc8923e4a",
      traps: [
        {
          title: "Not changing π/2 into 1",
          body: "After \\(t = \\sin x\\), the upper limit is \\(\\sin\\dfrac{\\pi}{2} = 1\\). Writing \\(\\dfrac{\\pi}{2}\\) as a limit for t is a mixed answer and loses marks.",
        },
        {
          title: "Forgetting that t = cos x reverses the limits",
          body: "With \\(t = \\cos x\\) on \\(\\left[0, \\dfrac{\\pi}{2}\\right]\\), t runs from 1 down to 0 and \\(dt = -\\sin x\\,dx\\). The two minus signs cancel only if you write both.",
        },
        {
          title: "Using up the sec² x twice",
          body: "\\(\\sec^4 x = (1 + \\tan^2 x)\\sec^2 x\\). One \\(\\sec^2 x\\) goes into dt; only the other one becomes \\(1 + t^2\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmin-def-sinminuscos",
      name: "The pair t = sin x − cos x and t = sin x + cos x",
      intuition:
        "When the numerator is sin x + cos x and sin 2x sits in the denominator, put t = sin x − cos x. Its derivative is exactly cos x + sin x, and squaring it brings in sin 2x. If the numerator is cos x − sin x, use the partner t = sin x + cos x.",
      definition:
        "- \\(t = \\sin x - \\cos x\\): \\(dt = (\\cos x + \\sin x)\\,dx\\) and \\(t^2 = 1 - \\sin 2x\\), so \\(\\sin 2x = 1 - t^2\\).\n" +
        "- \\(t = \\sin x + \\cos x\\): \\(dt = (\\cos x - \\sin x)\\,dx\\) and \\(t^2 = 1 + \\sin 2x\\), so \\(\\sin 2x = t^2 - 1\\).\n" +
        "- Limits for \\(t = \\sin x - \\cos x\\): \\(x = 0 \\to -1\\), \\(x = \\dfrac{\\pi}{4} \\to 0\\), \\(x = \\dfrac{\\pi}{2} \\to 1\\), \\(x = \\dfrac{\\pi}{6} \\to \\dfrac{1 - \\sqrt{3}}{2}\\), \\(x = \\dfrac{\\pi}{3} \\to \\dfrac{\\sqrt{3} - 1}{2}\\).\n" +
        "- Then use a standard form: \\(\\int \\dfrac{dt}{\\sqrt{1 - t^2}} = \\sin^{-1}t\\), or \\(\\int \\dfrac{dt}{a^2 - t^2} = \\dfrac{1}{2a}\\log\\left|\\dfrac{a + t}{a - t}\\right|\\).\n" +
        "- With limits \\(-p\\) and \\(p\\), \\(\\big[\\sin^{-1}t\\big]_{-p}^{p} = 2\\sin^{-1}p\\), because \\(\\sin^{-1}\\) is an odd function.",
      formula: {
        label: "Sine minus cosine substitution",
        latex: "t = \\sin x - \\cos x,\\quad dt = (\\sin x + \\cos x)\\,dx,\\quad \\sin 2x = 1 - t^2",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\int_0^{\\pi/4} \\dfrac{\\cos x - \\sin x}{1 + \\sin 2x}\\,dx\\).",
        steps: [
          "The numerator is \\(\\cos x - \\sin x\\), so put \\(t = \\sin x + \\cos x\\). Then \\(dt = (\\cos x - \\sin x)\\,dx\\).",
          "\\(t^2 = \\sin^2 x + \\cos^2 x + 2\\sin x\\cos x = 1 + \\sin 2x\\).",
          "When \\(x = 0\\), \\(t = 1\\); when \\(x = \\dfrac{\\pi}{4}\\), \\(t = \\dfrac{1}{\\sqrt{2}} + \\dfrac{1}{\\sqrt{2}} = \\sqrt{2}\\).",
          "\\(I = \\int_1^{\\sqrt{2}} \\dfrac{dt}{t^2} = \\left[-\\dfrac{1}{t}\\right]_1^{\\sqrt{2}}\\).",
          "\\(I = -\\dfrac{1}{\\sqrt{2}} + 1\\).",
        ],
        answer: "\\(1 - \\dfrac{1}{\\sqrt{2}}\\)",
      },
      selfCheckExample: {
        prompt: "With \\(t = \\sin x - \\cos x\\), what do \\(\\sin 2x\\) and the limits \\(x = 0\\) and \\(x = \\dfrac{\\pi}{2}\\) become?",
        steps: ["\\(t^2 = 1 - \\sin 2x\\); at \\(x = 0\\), \\(t = 0 - 1\\); at \\(x = \\dfrac{\\pi}{2}\\), \\(t = 1 - 0\\)."],
        answer: "\\(\\sin 2x = 1 - t^2\\), and t runs from \\(-1\\) to 1",
      },
      practiceSet: [
        {
          prompt: "Find dt and \\(\\sin 2x\\) in terms of t when \\(t = \\sin x + \\cos x\\).",
          answer: "\\(dt = (\\cos x - \\sin x)\\,dx\\) and \\(\\sin 2x = t^2 - 1\\)",
        },
        {
          prompt: "Evaluate \\(\\int_0^{\\pi/2} \\dfrac{\\sin x + \\cos x}{\\sqrt{1 + \\sin 2x}}\\,dx\\).",
          answer: "\\(\\sqrt{1 + \\sin 2x} = \\sin x + \\cos x\\) on this interval, so the integrand is 1 and the value is \\(\\dfrac{\\pi}{2}\\)",
        },
        {
          prompt: "Evaluate \\(\\int_0^{\\pi/4} \\dfrac{\\cos x - \\sin x}{(\\sin x + \\cos x)^3}\\,dx\\).",
          answer: "\\(t = \\sin x + \\cos x\\), t from 1 to \\(\\sqrt{2}\\): \\(\\left[-\\dfrac{1}{2t^2}\\right]_1^{\\sqrt{2}} = -\\dfrac{1}{4} + \\dfrac{1}{2} = \\dfrac{1}{4}\\)",
        },
      ],
      pyqExampleId: "9d6da880-61a8-4b47-9c85-c9892541bce7",
      traps: [
        {
          title: "Choosing the wrong one of the pair",
          body: "For a numerator \\(\\sin x + \\cos x\\), the substitution is \\(t = \\sin x - \\cos x\\), the one whose derivative is that numerator. \\(t = \\sin x + \\cos x\\) gives \\(\\cos x - \\sin x\\) instead.",
        },
        {
          title: "The sign of sin 2x",
          body: "With \\(t = \\sin x - \\cos x\\), \\(t^2 = 1 - \\sin 2x\\), so \\(\\sin 2x = 1 - t^2\\), not \\(t^2 - 1\\). A wrong sign here turns an inverse sine into a log.",
        },
        {
          title: "The limit at x = 0",
          body: "At \\(x = 0\\), \\(\\sin x - \\cos x = 0 - 1 = -1\\), not 0. Work out each new limit from the substitution, never by guessing.",
        },
      ],
    },
  ],
};
