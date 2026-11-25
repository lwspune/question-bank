import type { SubtopicNote } from "@/app/notes/_types";

export const CB_MA_CD_PARAMETRIC_NOTE: SubtopicNote = {
  subtopicName: "Derivatives of Functions in Parametric Form",
  title: "Parametric Forms",
  oneLineDefinition:
    "Finding dy/dx when x and y are both given in terms of a parameter, simplifying the two derivatives with identities, writing the answer back in x and y, and finding the second derivative from a parametric form.",
  whyItMatters:
    "31 questions, fourteen of them from board papers from 2023 to 2026. The board asks dy/dx for pairs such as x = at, y = a/t (2024), x = t + 1/t, y = t − 1/t at t = 2 and x = a sin³ t, y = b cos³ t at t = π/4 (2026); proofs such as x dy/dx + y = 0 (2023) and dy/dx = −y log x/(x log y) (2024); and second derivatives for x = a cos t, y = b sin t (2023), for x = a(cos θ + log tan θ/2), y = sin θ at θ = π/4 (2025) and two longer pairs (2026). Eight of the fourteen come from 2026 alone. The textbook adds Examples 31 to 34, Exercise 5.6, Miscellaneous Example 42 and Miscellaneous Exercise Q12.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbmcd-parametric",
      name: "First derivative from a parametric form",
      intuition:
        "When x and y are both given in terms of a third variable t, find how fast each changes with t. Their ratio is how fast y changes with x, and you never need to eliminate t.",
      definition:
        "- If \\(x = f(t)\\) and \\(y = g(t)\\), then \\(\\dfrac{dy}{dx} = \\dfrac{dy/dt}{dx/dt}\\), provided \\(\\dfrac{dx}{dt} \\ne 0\\).\n" +
        "- The answer is usually in t, as in NCERT Examples 31 to 33. Leave it in t unless the question asks for x and y.\n" +
        "- For a value at a given t, simplify \\(\\dfrac{dy}{dx}\\) first, then substitute.",
      formula: {
        label: "Parametric derivative",
        latex: "\\frac{dy}{dx} = \\frac{dy/dt}{dx/dt}, \\quad \\frac{dx}{dt} \\ne 0",
      },
      authoredExample: {
        prompt: "Find \\(\\dfrac{dy}{dx}\\) at \\(t = 3\\) if \\(x = t^2 + 1\\) and \\(y = t^3 - t\\).",
        steps: [
          "\\(\\dfrac{dx}{dt} = 2t\\) and \\(\\dfrac{dy}{dt} = 3t^2 - 1\\).",
          "\\(\\dfrac{dy}{dx} = \\dfrac{3t^2 - 1}{2t}\\).",
          "At \\(t = 3\\): \\(\\dfrac{dy}{dx} = \\dfrac{27 - 1}{6} = \\dfrac{13}{3}\\).",
        ],
        answer: "\\(\\dfrac{13}{3}\\)",
      },
      selfCheckExample: {
        prompt: "Find \\(\\dfrac{dy}{dx}\\) if \\(x = a(1 - \\cos\\theta)\\) and \\(y = a(\\theta + \\sin\\theta)\\).",
        steps: [
          "\\(\\dfrac{dx}{d\\theta} = a\\sin\\theta\\) and \\(\\dfrac{dy}{d\\theta} = a(1 + \\cos\\theta)\\).",
          "\\(\\dfrac{dy}{dx} = \\dfrac{1 + \\cos\\theta}{\\sin\\theta} = \\dfrac{2\\cos^2\\frac{\\theta}{2}}{2\\sin\\frac{\\theta}{2}\\cos\\frac{\\theta}{2}} = \\cot\\dfrac{\\theta}{2}\\).",
        ],
        answer: "\\(\\cot\\dfrac{\\theta}{2}\\)",
      },
      practiceSet: [
        { prompt: "If \\(x = 2t\\) and \\(y = t^2\\), find \\(\\dfrac{dy}{dx}\\).", answer: "\\(t\\)" },
        { prompt: "If \\(x = \\cos 2t\\) and \\(y = \\sin 2t\\), find \\(\\dfrac{dy}{dx}\\).", answer: "\\(-\\cot 2t\\)" },
        { prompt: "If \\(x = e^t\\) and \\(y = e^{-t}\\), find \\(\\dfrac{dy}{dx}\\).", answer: "\\(-e^{-2t}\\)" },
      ],
      pyqExampleId: "91d7a33e-4a86-4110-b1da-ef839f2e595f",
      traps: [
        {
          title: "The ratio upside down",
          body: "\\(\\dfrac{dy}{dx}\\) is \\(\\dfrac{dy/dt}{dx/dt}\\), not the other way up. Write the formula once before you substitute.",
        },
        {
          title: "Where dx/dt is zero",
          body: "The formula needs \\(\\dfrac{dx}{dt} \\ne 0\\). At a value of t where \\(\\dfrac{dx}{dt} = 0\\), the derivative cannot be found this way.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmcd-parametric-simplify",
      name: "Parametric forms that need simplifying",
      intuition:
        "Many board pairs only look hard. A log of a tangent, a difference of sines or an exponential of a ratio simplifies with one identity, and some questions want the answer back in x and y.",
      definition:
        "- \\(\\dfrac{d}{dt}\\log\\tan\\dfrac{t}{2} = \\dfrac{1}{\\tan\\frac{t}{2}} \\cdot \\dfrac{1}{2}\\sec^2\\dfrac{t}{2} = \\dfrac{1}{2\\sin\\frac{t}{2}\\cos\\frac{t}{2}} = \\dfrac{1}{\\sin t}\\).\n" +
        "- Use \\(1 - \\cos t = 2\\sin^2\\dfrac{t}{2}\\), \\(1 + \\cos t = 2\\cos^2\\dfrac{t}{2}\\), \\(\\sin t = 2\\sin\\dfrac{t}{2}\\cos\\dfrac{t}{2}\\), and the sum-to-product formulas.\n" +
        "- **Back to x and y:** read the parameter's functions off the given equations. For example \\(x = e^{\\cos 3t}\\) gives \\(\\cos 3t = \\log x\\).\n" +
        "- For powers such as \\(x = \\sqrt{a^{\\sin^{-1} t}}\\), write \\(x = a^{\\frac{1}{2}\\sin^{-1} t}\\), or take logs, before differentiating.\n" +
        "- NCERT Example 34 uses a parametric form, \\(x = a\\cos^3\\theta\\), \\(y = a\\sin^3\\theta\\), to differentiate \\(x^{\\frac{2}{3}} + y^{\\frac{2}{3}} = a^{\\frac{2}{3}}\\).",
      formula: {
        label: "Derivative of log tan of half the angle",
        latex: "\\frac{d}{dt}\\log\\tan\\frac{t}{2} = \\frac{1}{\\sin t}",
      },
      authoredExample: {
        prompt: "Find \\(\\dfrac{dy}{dx}\\) if \\(x = 2\\cos t - \\cos 2t\\) and \\(y = 2\\sin t - \\sin 2t\\).",
        steps: [
          "\\(\\dfrac{dx}{dt} = -2\\sin t + 2\\sin 2t\\) and \\(\\dfrac{dy}{dt} = 2\\cos t - 2\\cos 2t\\).",
          "\\(\\dfrac{dy}{dx} = \\dfrac{\\cos t - \\cos 2t}{\\sin 2t - \\sin t}\\).",
          "Sum-to-product: \\(\\cos t - \\cos 2t = 2\\sin\\dfrac{3t}{2}\\sin\\dfrac{t}{2}\\) and \\(\\sin 2t - \\sin t = 2\\cos\\dfrac{3t}{2}\\sin\\dfrac{t}{2}\\).",
          "\\(\\dfrac{dy}{dx} = \\dfrac{\\sin\\frac{3t}{2}}{\\cos\\frac{3t}{2}} = \\tan\\dfrac{3t}{2}\\).",
        ],
        answer: "\\(\\tan\\dfrac{3t}{2}\\)",
      },
      selfCheckExample: {
        prompt: "Find \\(\\dfrac{dy}{dx}\\) in terms of x and y if \\(x = e^{2t}\\) and \\(y = e^{-t}\\).",
        steps: [
          "\\(\\dfrac{dx}{dt} = 2e^{2t} = 2x\\) and \\(\\dfrac{dy}{dt} = -e^{-t} = -y\\).",
          "\\(\\dfrac{dy}{dx} = -\\dfrac{y}{2x}\\).",
        ],
        answer: "\\(-\\dfrac{y}{2x}\\)",
      },
      practiceSet: [
        { prompt: "Find \\(\\dfrac{d}{dt}\\log\\tan\\dfrac{t}{2}\\).", answer: "\\(\\operatorname{cosec} t\\)" },
        {
          prompt: "If \\(x = 4\\cos t\\) and \\(y = 3\\sin t\\), find \\(\\dfrac{dy}{dx}\\) at \\(t = \\dfrac{\\pi}{4}\\).",
          answer: "\\(-\\dfrac{3}{4}\\)",
          method: "\\(\\dfrac{dy}{dx} = -\\dfrac{3}{4}\\cot t\\)",
        },
        {
          prompt: "If \\(x = e^t + e^{-t}\\) and \\(y = e^t - e^{-t}\\), find \\(\\dfrac{dy}{dx}\\) in terms of x and y.",
          answer: "\\(\\dfrac{x}{y}\\)",
          method: "\\(\\dfrac{dx}{dt} = y\\) and \\(\\dfrac{dy}{dt} = x\\)",
        },
      ],
      pyqExampleId: "02c1d3d7-04a2-4bc4-a877-f91c559bc9c7",
      traps: [
        {
          title: "The half in a half angle",
          body: "\\(\\dfrac{d}{dt}\\tan\\dfrac{t}{2} = \\dfrac{1}{2}\\sec^2\\dfrac{t}{2}\\). That factor \\(\\dfrac{1}{2}\\) is what turns the result into \\(\\dfrac{1}{\\sin t}\\).",
        },
        {
          title: "Leaving t in an answer asked in x and y",
          body: "When a 'prove that' ends in x and y, replace every function of t using the given equations. An answer still in t does not prove the result.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmcd-parametric-second",
      name: "Second derivative from a parametric form",
      intuition:
        "The first derivative is a function of t, not of x. To differentiate it with respect to x, differentiate it with respect to t and then multiply by dt/dx.",
      definition:
        "- \\(\\dfrac{d^2y}{dx^2} = \\dfrac{d}{dx}\\left(\\dfrac{dy}{dx}\\right) = \\dfrac{d}{dt}\\left(\\dfrac{dy}{dx}\\right) \\cdot \\dfrac{dt}{dx}\\), and \\(\\dfrac{dt}{dx} = \\dfrac{1}{dx/dt}\\).\n" +
        "- Find \\(\\dfrac{dy}{dx}\\) and simplify it fully before the second step.\n" +
        "- For a value at a given t, substitute only at the very end.\n" +
        "- NCERT's Miscellaneous Exercise Q17 asks this, and the board set it every year from 2023 to 2026.",
      formula: {
        label: "Parametric second derivative",
        latex: "\\frac{d^2y}{dx^2} = \\frac{d}{dt}\\left(\\frac{dy}{dx}\\right) \\cdot \\frac{1}{dx/dt}",
      },
      authoredExample: {
        prompt: "Find \\(\\dfrac{d^2y}{dx^2}\\) if \\(x = t^2\\) and \\(y = t^3\\).",
        steps: [
          "\\(\\dfrac{dx}{dt} = 2t\\) and \\(\\dfrac{dy}{dt} = 3t^2\\), so \\(\\dfrac{dy}{dx} = \\dfrac{3t^2}{2t} = \\dfrac{3t}{2}\\).",
          "\\(\\dfrac{d}{dt}\\left(\\dfrac{3t}{2}\\right) = \\dfrac{3}{2}\\).",
          "\\(\\dfrac{d^2y}{dx^2} = \\dfrac{3}{2} \\cdot \\dfrac{1}{2t} = \\dfrac{3}{4t}\\).",
        ],
        answer: "\\(\\dfrac{3}{4t}\\)",
      },
      selfCheckExample: {
        prompt: "Find \\(\\dfrac{d^2y}{dx^2}\\) if \\(x = at^2\\) and \\(y = 2at\\).",
        steps: [
          "\\(\\dfrac{dy}{dx} = \\dfrac{2a}{2at} = \\dfrac{1}{t}\\).",
          "\\(\\dfrac{d}{dt}\\left(\\dfrac{1}{t}\\right) = -\\dfrac{1}{t^2}\\).",
          "\\(\\dfrac{d^2y}{dx^2} = -\\dfrac{1}{t^2} \\cdot \\dfrac{1}{2at} = -\\dfrac{1}{2at^3}\\).",
        ],
        answer: "\\(-\\dfrac{1}{2at^3}\\)",
      },
      practiceSet: [
        { prompt: "If \\(x = t\\) and \\(y = t^3\\), find \\(\\dfrac{d^2y}{dx^2}\\).", answer: "\\(6t\\)" },
        { prompt: "If \\(x = 2t\\) and \\(y = t^2 + 1\\), find \\(\\dfrac{d^2y}{dx^2}\\).", answer: "\\(\\dfrac{1}{2}\\)" },
        {
          prompt: "Why is \\(\\dfrac{d}{dt}\\left(\\dfrac{dy}{dx}\\right)\\) on its own not the second derivative?",
          answer: "It must still be multiplied by \\(\\dfrac{dt}{dx}\\)",
        },
      ],
      pyqExampleId: "c003d897-ea38-4038-8026-2bbb67861a54",
      traps: [
        {
          title: "The missing dt/dx",
          body: "Differentiating \\(\\dfrac{dy}{dx}\\) with respect to t is only half the step. Multiply by \\(\\dfrac{1}{dx/dt}\\); this is the factor most answers lose marks on.",
        },
        {
          title: "Not a ratio of second derivatives",
          body: "\\(\\dfrac{d^2y}{dx^2}\\) is not \\(\\dfrac{d^2y/dt^2}{d^2x/dt^2}\\). For \\(x = t^2\\), \\(y = t^3\\) that ratio is \\(3t\\), but the second derivative is \\(\\dfrac{3}{4t}\\).",
        },
      ],
    },
  ],
};
