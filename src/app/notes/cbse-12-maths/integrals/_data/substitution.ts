import type { SubtopicNote } from "@/app/notes/_types";

export const CB_MA_IN_SUBSTITUTION_NOTE: SubtopicNote = {
  subtopicName: "Integration by Substitution",
  title: "Integration by Substitution",
  oneLineDefinition:
    "Change the variable: put t equal to a part of the integrand whose derivative is also present, so that the integral becomes a standard one in t, then put x back.",
  whyItMatters:
    "79 questions, twenty of them from board papers: four in 2022, two in 2023, seven in 2024, two in 2025 and five in 2026. The board asks integrals in which the numerator is the derivative of the denominator (1 over e to the x plus 1 in 2022, and again in 2026 with a condition to fix C; a quotient of e to the 4x terms in 2024), substitutions in log x (2024), roots cleared by a substitution (the square root and cube root of x in 2022 and 2026, x times the root of 1 + 2x in 2024, the root of x over 1 + x to the power 3/4 in 2025), trigonometric integrands (2022, 2023, 2024 twice) and one-mark items in powers of 2 and e (2025, 2026). The textbook adds Examples 5 and 6, Exercise 7.2 and several Miscellaneous questions.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbmin-log-form",
      name: "The log form: numerator the derivative of the denominator",
      intuition:
        "If the top of a fraction is the derivative of the bottom, put the bottom equal to \\(t\\): the top and \\(dx\\) together become \\(dt\\), and the integral is \\(\\int \\dfrac{dt}{t} = \\log|t|\\). When the top is only a number times that derivative, adjust the number outside. This one idea gives the integrals of \\(\\tan x\\), \\(\\cot x\\), \\(\\sec x\\) and \\(\\operatorname{cosec} x\\).",
      definition:
        "- \\(\\displaystyle\\int \\dfrac{f'(x)}{f(x)}\\,dx = \\log|f(x)| + C\\).\n" +
        "- \\(\\int \\tan x\\,dx = \\log|\\sec x| + C\\), \\(\\int \\cot x\\,dx = \\log|\\sin x| + C\\).\n" +
        "- \\(\\int \\sec x\\,dx = \\log|\\sec x + \\tan x| + C\\), \\(\\int \\operatorname{cosec} x\\,dx = \\log|\\operatorname{cosec} x - \\cot x| + C\\).\n" +
        "- If the numerator is not yet the derivative, divide top and bottom by a suitable term first, for example by \\(e^{x}\\) or \\(e^{2x}\\) in a fraction of exponentials.\n" +
        "- When a fraction has \\(x\\) times a bracket in \\(x^2\\) below, taking \\(x^3\\) out of the denominator often gives a derivative on top.",
      formula: {
        label: "Logarithmic form",
        latex: "\\int \\dfrac{f'(x)}{f(x)}\\,dx = \\log|f(x)| + C",
      },
      authoredExample: {
        prompt: "Show that \\(\\int \\tan x\\,dx = \\log|\\sec x| + C\\).",
        steps: [
          "\\(\\int \\tan x\\,dx = \\int \\dfrac{\\sin x}{\\cos x}\\,dx\\).",
          "Put \\(\\cos x = t\\), so \\(-\\sin x\\,dx = dt\\), that is \\(\\sin x\\,dx = -dt\\).",
          "\\(\\int \\dfrac{\\sin x}{\\cos x}\\,dx = -\\int \\dfrac{dt}{t} = -\\log|t| + C\\).",
          "\\(= -\\log|\\cos x| + C = \\log\\left|\\dfrac{1}{\\cos x}\\right| + C\\).",
          "\\(\\therefore \\int \\tan x\\,dx = \\log|\\sec x| + C\\).",
        ],
        answer: "\\(\\log|\\sec x| + C\\)",
      },
      selfCheckExample: {
        prompt: "Find \\(\\int \\dfrac{6x + 4}{3x^2 + 4x + 7}\\,dx\\).",
        steps: [
          "The derivative of \\(3x^2 + 4x + 7\\) is \\(6x + 4\\), exactly the numerator.",
          "Put \\(3x^2 + 4x + 7 = t\\), so \\((6x + 4)\\,dx = dt\\).",
          "\\(\\int \\dfrac{dt}{t} = \\log|t| + C\\).",
          "\\(\\therefore\\) the integral is \\(\\log|3x^2 + 4x + 7| + C\\).",
        ],
        answer: "\\(\\log|3x^2 + 4x + 7| + C\\)",
      },
      practiceSet: [
        { prompt: "Find \\(\\int \\dfrac{x}{x^2 + 9}\\,dx\\).", answer: "\\(\\dfrac{1}{2}\\log(x^2 + 9) + C\\)" },
        { prompt: "Find \\(\\int \\dfrac{e^x}{e^x + 3}\\,dx\\).", answer: "\\(\\log(e^x + 3) + C\\)" },
        { prompt: "Find \\(\\int \\dfrac{1}{x\\log x}\\,dx\\).", answer: "\\(\\log|\\log x| + C\\)", method: "Put \\(\\log x = t\\)." },
      ],
      pyqExampleId: "4e9eb1c5-71e7-4e5f-8fcb-d1c8db763e84",
      traps: [
        {
          title: "Forgetting the factor that adjusts the derivative",
          body: "For \\(\\int \\dfrac{x}{x^2 + 9}\\,dx\\), \\(dt = 2x\\,dx\\), so the answer is \\(\\dfrac{1}{2}\\log(x^2 + 9)\\), not \\(\\log(x^2 + 9)\\). Differentiate your answer in your head to catch a missing factor.",
        },
        {
          title: "The sign in the integral of tan x",
          body: "\\(\\int \\tan x\\,dx = -\\log|\\cos x| = \\log|\\sec x|\\). Writing \\(\\log|\\cos x|\\) drops the minus sign that came from \\(dt = -\\sin x\\,dx\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmin-chain",
      name: "Substituting t for a function whose derivative is present",
      intuition:
        "Look inside the integrand for a function \\(g(x)\\) sitting next to its own derivative \\(g'(x)\\): \\(\\log x\\) beside \\(\\dfrac{1}{x}\\), \\(\\tan^{-1} x\\) beside \\(\\dfrac{1}{1 + x^2}\\), \\(\\sin x\\) beside \\(\\cos x\\). Put \\(t = g(x)\\); the derivative and \\(dx\\) become \\(dt\\), and what is left is a standard integral in \\(t\\).",
      definition:
        "- Choose \\(t = g(x)\\) so that \\(g'(x)\\,dx\\) is in the integrand, up to a constant factor.\n" +
        "- Write \\(dt = g'(x)\\,dx\\) on its own line; it carries a step mark.\n" +
        "- Rewrite the **whole** integral in \\(t\\). No \\(x\\) may be left.\n" +
        "- Integrate in \\(t\\), then put \\(t = g(x)\\) back in the answer.\n" +
        "- Simplify first where it helps: \\(e^{\\log \\sin x} = \\sin x\\), and dividing top and bottom by \\(\\sin^2 x\\) turns \\(\\dfrac{1}{\\sin x\\cos x}\\) into \\(\\dfrac{\\operatorname{cosec}^2 x}{\\cot x}\\).",
      formula: {
        label: "Change of variable",
        latex: "\\int f(g(x))\\,g'(x)\\,dx = \\int f(t)\\,dt, \\quad t = g(x)",
      },
      authoredExample: {
        prompt: "Find \\(\\int \\dfrac{\\sec^2 x}{(3 + \\tan x)^2}\\,dx\\).",
        steps: [
          "Put \\(3 + \\tan x = t\\), so \\(\\sec^2 x\\,dx = dt\\).",
          "\\(\\int \\dfrac{\\sec^2 x}{(3 + \\tan x)^2}\\,dx = \\int \\dfrac{dt}{t^2} = \\int t^{-2}\\,dt\\).",
          "\\(= \\dfrac{t^{-1}}{-1} + C = -\\dfrac{1}{t} + C\\).",
          "\\(\\therefore\\) the integral is \\(-\\dfrac{1}{3 + \\tan x} + C\\).",
        ],
        answer: "\\(-\\dfrac{1}{3 + \\tan x} + C\\)",
      },
      selfCheckExample: {
        prompt: "Find \\(\\int x^3\\cos(x^4 + 5)\\,dx\\).",
        steps: [
          "Put \\(x^4 + 5 = t\\), so \\(4x^3\\,dx = dt\\), that is \\(x^3\\,dx = \\dfrac{dt}{4}\\).",
          "\\(\\int x^3\\cos(x^4 + 5)\\,dx = \\dfrac{1}{4}\\int \\cos t\\,dt = \\dfrac{1}{4}\\sin t + C\\).",
          "\\(\\therefore\\) the integral is \\(\\dfrac{1}{4}\\sin(x^4 + 5) + C\\).",
        ],
        answer: "\\(\\dfrac{1}{4}\\sin(x^4 + 5) + C\\)",
      },
      practiceSet: [
        { prompt: "Find \\(\\int \\dfrac{(\\log x)^3}{x}\\,dx\\).", answer: "\\(\\dfrac{(\\log x)^4}{4} + C\\)" },
        { prompt: "Find \\(\\int e^{\\sin x}\\cos x\\,dx\\).", answer: "\\(e^{\\sin x} + C\\)" },
        { prompt: "Find \\(\\int \\dfrac{(\\tan^{-1} x)^2}{1 + x^2}\\,dx\\).", answer: "\\(\\dfrac{(\\tan^{-1} x)^3}{3} + C\\)" },
      ],
      pyqExampleId: "9c2c2d41-7430-4bc5-ad5f-c9216527d831",
      traps: [
        {
          title: "Leaving x inside the t-integral",
          body: "After you write \\(dt = g'(x)\\,dx\\), every \\(x\\) must go. An integral such as \\(\\int x\\,t\\,dt\\) cannot be done as it stands; rewrite the stray \\(x\\) in \\(t\\) first.",
        },
        {
          title: "Not putting x back",
          body: "An answer left as \\(-\\dfrac{1}{t} + C\\) is incomplete. The question is in \\(x\\), so the answer must be in \\(x\\).",
        },
        {
          title: "A minus sign from cos x or cot x",
          body: "If \\(t = \\cos x\\) then \\(dt = -\\sin x\\,dx\\); if \\(t = \\cot x\\) then \\(dt = -\\operatorname{cosec}^2 x\\,dx\\). Carry that minus sign to the end.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmin-clear-roots",
      name: "Clearing a root by substitution",
      intuition:
        "A root of a linear expression, such as \\(\\sqrt{2x + 1}\\), is cleared by calling the whole root \\(t\\): then \\(x\\) and \\(dx\\) are both simple in \\(t\\) and the integrand becomes a polynomial. When two different roots of \\(x\\) appear, such as \\(\\sqrt{x}\\) and \\(\\sqrt[3]{x}\\), put \\(x = t^6\\), the power that clears both at once.",
      definition:
        "- For \\(\\sqrt{ax + b}\\): put \\(ax + b = t^2\\), so \\(a\\,dx = 2t\\,dt\\) and \\(x = \\dfrac{t^2 - b}{a}\\).\n" +
        "- For \\(x^{1/m}\\) and \\(x^{1/n}\\) together: put \\(x = t^k\\), where \\(k\\) is the LCM of \\(m\\) and \\(n\\).\n" +
        "- After the substitution, an algebraic fraction in \\(t\\) may need division before it can be integrated.\n" +
        "- A root such as \\(\\sqrt{x + a} + \\sqrt{x + b}\\) in the denominator can instead be rationalised: multiply by \\(\\sqrt{x + a} - \\sqrt{x + b}\\).\n" +
        "- Put the root back at the end: \\(t = \\sqrt{ax + b}\\) or \\(t = x^{1/k}\\).",
      formula: {
        label: "Clearing a linear root",
        latex: "ax + b = t^2 \\Rightarrow dx = \\dfrac{2t}{a}\\,dt",
      },
      authoredExample: {
        prompt: "Find \\(\\int \\dfrac{x + 2}{\\sqrt{x - 1}}\\,dx\\).",
        steps: [
          "Put \\(x - 1 = t^2\\), so \\(dx = 2t\\,dt\\) and \\(x + 2 = t^2 + 3\\).",
          "\\(\\int \\dfrac{x + 2}{\\sqrt{x - 1}}\\,dx = \\int \\dfrac{t^2 + 3}{t} \\cdot 2t\\,dt = 2\\int (t^2 + 3)\\,dt\\).",
          "\\(= 2\\left(\\dfrac{t^3}{3} + 3t\\right) + C = \\dfrac{2t^3}{3} + 6t + C\\).",
          "Put \\(t = \\sqrt{x - 1}\\) back.",
          "\\(\\therefore\\) the integral is \\(\\dfrac{2}{3}(x - 1)^{3/2} + 6\\sqrt{x - 1} + C\\).",
        ],
        answer: "\\(\\dfrac{2}{3}(x - 1)^{3/2} + 6\\sqrt{x - 1} + C\\)",
      },
      selfCheckExample: {
        prompt: "Find \\(\\int \\dfrac{dx}{\\sqrt{x} + 1}\\).",
        steps: [
          "Put \\(\\sqrt{x} = t\\), so \\(x = t^2\\) and \\(dx = 2t\\,dt\\).",
          "\\(\\int \\dfrac{2t\\,dt}{t + 1} = 2\\int \\left(1 - \\dfrac{1}{t + 1}\\right)dt\\).",
          "\\(= 2t - 2\\log|t + 1| + C\\).",
          "\\(\\therefore\\) the integral is \\(2\\sqrt{x} - 2\\log(\\sqrt{x} + 1) + C\\).",
        ],
        answer: "\\(2\\sqrt{x} - 2\\log(\\sqrt{x} + 1) + C\\)",
      },
      practiceSet: [
        { prompt: "Find \\(\\int \\dfrac{x^3}{\\sqrt{1 + x^2}}\\,dx\\).", answer: "\\(\\dfrac{1}{3}(1 + x^2)^{3/2} - \\sqrt{1 + x^2} + C\\)", method: "Put \\(1 + x^2 = t^2\\), so \\(x\\,dx = t\\,dt\\)." },
        { prompt: "Find \\(\\int \\dfrac{dx}{x^{1/2} + x^{1/4}}\\).", answer: "\\(2\\sqrt{x} - 4x^{1/4} + 4\\log(1 + x^{1/4}) + C\\)", method: "Put \\(x = t^4\\)." },
        { prompt: "Find \\(\\int \\dfrac{dx}{\\sqrt{x + 5} + \\sqrt{x + 3}}\\).", answer: "\\(\\dfrac{1}{3}\\left[(x + 5)^{3/2} - (x + 3)^{3/2}\\right] + C\\)", method: "Rationalise; the denominator becomes 2." },
      ],
      pyqExampleId: "a2d379b6-06ac-41ea-9d59-a89bc33f129c",
      traps: [
        {
          title: "Changing the root but not dx",
          body: "With \\(x - 1 = t^2\\), \\(dx\\) is \\(2t\\,dt\\), not \\(dt\\). The factor \\(2t\\) is what cancels the root in the denominator.",
        },
        {
          title: "Using the wrong power for two roots",
          body: "For \\(\\sqrt{x}\\) and \\(\\sqrt[3]{x}\\) put \\(x = t^6\\), so that \\(\\sqrt{x} = t^3\\) and \\(\\sqrt[3]{x} = t^2\\). \\(x = t^5\\) or \\(x = t^3\\) leaves a root behind.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmin-trig-sub",
      name: "Substitution in trigonometric integrands",
      intuition:
        "With an odd power of \\(\\sin x\\) or \\(\\cos x\\), keep one factor for \\(dt\\) and turn the rest into the other function with \\(\\sin^2 x + \\cos^2 x = 1\\). With an angle such as \\(x + a\\), put \\(x + a = t\\) and expand. And when a power of \\(\\sin x\\) can be taken out to leave \\(\\cot x\\) or \\(\\tan x\\), the leftover \\(\\operatorname{cosec}^2 x\\) or \\(\\sec^2 x\\) is ready to be \\(dt\\).",
      definition:
        "- **Odd power of \\(\\cos x\\):** keep one \\(\\cos x\\), write the rest in \\(\\sin x\\), put \\(\\sin x = t\\). Odd power of \\(\\sin x\\): put \\(\\cos x = t\\).\n" +
        "- **Shifted angle:** for \\(\\dfrac{\\sin x}{\\sin(x + a)}\\), put \\(x + a = t\\) and use \\(\\sin(t - a) = \\sin t\\cos a - \\cos t\\sin a\\).\n" +
        "- **\\(\\dfrac{1}{1 + \\tan x}\\):** write it as \\(\\dfrac{\\cos x}{\\cos x + \\sin x}\\) and split the numerator as \\(\\dfrac{1}{2}[(\\cos x + \\sin x) + (\\cos x - \\sin x)]\\).\n" +
        "- **Taking out a power:** \\(\\sin^3 x\\sin(x + \\alpha) = \\sin^4 x(\\cos\\alpha + \\sin\\alpha\\cot x)\\), so its root is \\(\\sin^2 x\\sqrt{\\cos\\alpha + \\sin\\alpha\\cot x}\\), and then \\(t = \\cos\\alpha + \\sin\\alpha\\cot x\\).\n" +
        "- \\(a\\) and \\(\\alpha\\) are constants: they stay outside every integral.",
      formula: {
        label: "Odd power of cos x",
        latex: "\\int \\sin^m x\\cos^{2k+1} x\\,dx = \\int t^m(1 - t^2)^k\\,dt, \\quad t = \\sin x",
      },
      authoredExample: {
        prompt: "Find \\(\\int \\sin^2 x\\cos^3 x\\,dx\\).",
        steps: [
          "The power of \\(\\cos x\\) is odd. Write \\(\\cos^3 x = \\cos^2 x \\cdot \\cos x = (1 - \\sin^2 x)\\cos x\\).",
          "Put \\(\\sin x = t\\), so \\(\\cos x\\,dx = dt\\).",
          "\\(\\int \\sin^2 x(1 - \\sin^2 x)\\cos x\\,dx = \\int (t^2 - t^4)\\,dt\\).",
          "\\(= \\dfrac{t^3}{3} - \\dfrac{t^5}{5} + C\\).",
          "\\(\\therefore\\) the integral is \\(\\dfrac{\\sin^3 x}{3} - \\dfrac{\\sin^5 x}{5} + C\\).",
        ],
        answer: "\\(\\dfrac{\\sin^3 x}{3} - \\dfrac{\\sin^5 x}{5} + C\\)",
      },
      selfCheckExample: {
        prompt: "Find \\(\\int \\dfrac{\\cos x}{\\cos(x - a)}\\,dx\\).",
        steps: [
          "Put \\(x - a = t\\), so \\(dx = dt\\) and \\(\\cos x = \\cos(t + a) = \\cos t\\cos a - \\sin t\\sin a\\).",
          "\\(\\int \\dfrac{\\cos t\\cos a - \\sin t\\sin a}{\\cos t}\\,dt = \\cos a\\int dt - \\sin a\\int \\tan t\\,dt\\).",
          "\\(= t\\cos a - \\sin a\\log|\\sec t| + C_1 = t\\cos a + \\sin a\\log|\\cos t| + C_1\\).",
          "Put \\(t = x - a\\): \\((x - a)\\cos a + \\sin a\\log|\\cos(x - a)| + C_1\\).",
          "\\(\\therefore\\) the integral is \\(x\\cos a + \\sin a\\log|\\cos(x - a)| + C\\), where \\(C = C_1 - a\\cos a\\).",
        ],
        answer: "\\(x\\cos a + \\sin a\\log|\\cos(x - a)| + C\\)",
      },
      practiceSet: [
        { prompt: "Find \\(\\int \\cos^3 x\\,dx\\).", answer: "\\(\\sin x - \\dfrac{\\sin^3 x}{3} + C\\)" },
        { prompt: "Find \\(\\int \\dfrac{\\sec^2 x}{\\sqrt{\\tan x}}\\,dx\\).", answer: "\\(2\\sqrt{\\tan x} + C\\)" },
        { prompt: "Find \\(\\int \\dfrac{\\sin 2x}{1 + \\sin^2 x}\\,dx\\).", answer: "\\(\\log(1 + \\sin^2 x) + C\\)", method: "Put \\(1 + \\sin^2 x = t\\); \\(dt = \\sin 2x\\,dx\\)." },
      ],
      pyqExampleId: "480cbb55-9b59-4fa6-96c3-746cbf1c9466",
      traps: [
        {
          title: "Treating the constant angle as a variable",
          body: "In \\(\\sin(x + a)\\) or \\(\\cos(x - \\alpha)\\), \\(a\\) and \\(\\alpha\\) are fixed numbers. \\(\\cos\\alpha\\) and \\(\\sin\\alpha\\) come outside the integral; they are never integrated.",
        },
        {
          title: "Keeping the wrong factor for dt",
          body: "With \\(\\sin^2 x\\cos^3 x\\), put \\(\\sin x = t\\) and keep one \\(\\cos x\\) for \\(dt\\). Putting \\(\\cos x = t\\) leaves a \\(\\sin x\\) with no \\(dt\\) to match.",
        },
      ],
    },
  ],
};
