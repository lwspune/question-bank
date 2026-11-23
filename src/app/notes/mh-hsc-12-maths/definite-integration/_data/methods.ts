import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_MA_DI_METHODS_NOTE: SubtopicNote = {
  subtopicName: "Methods of Evaluation of Definite Integrals",
  title: "Methods of Evaluating Definite Integrals",
  oneLineDefinition:
    "Every method of indefinite integration works with limits: substitution (with the limits changed), standard forms, the t = tan(x/2) substitution and integration by parts.",
  whyItMatters:
    "55 questions, the largest page of the chapter, three of them from board papers: find k when the integral of 1/(2 + 8x²) from 0 to k is π/16 (an MCQ in 2018), the integral of 1/((1 − 2x²)√(1 − x²)) from 0 to 1/2 (2025), and the integral of e to the power 1/x over x² from 1 to 2 (an MCQ in 2026). The textbook rows are Solved Examples 1 to 8 of section 4.2, Part II and the rest of Part I of Exercise 4.2, and most of Miscellaneous Exercise 4.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscmdi-substitution",
      name: "Substitution: change the limits too",
      intuition:
        "Substitution works the same way as in indefinite integration, with one extra step: the limits belong to x, so when the variable changes to t, the limits must change to the matching values of t. Once they have, finish the integral in t and stop. There is no need to go back to x.",
      definition:
        "- Put \\(t = g(x)\\), so \\(dt = g'(x)\\,dx\\).\n" +
        "- Change the limits: when \\(x = a\\), \\(t = g(a)\\); when \\(x = b\\), \\(t = g(b)\\).\n" +
        "- Integrate in \\(t\\) and put in the new limits.\n" +
        "- Usual choices: \\(t\\) = the inner function; \\(\\tan x = t\\) after dividing by \\(\\cos^2 x\\); \\(x = \\sin\\theta\\) for \\(\\sqrt{1 - x^2}\\); \\(e^x = t\\); \\(\\sqrt{x} = t\\).\n" +
        "- If the new lower limit is larger than the new upper one, Property II (\\(\\int_a^b = -\\int_b^a\\)) turns them round.",
      formula: {
        label: "Substitution with limits",
        latex: "\\int_a^b f\\left(g(x)\\right)g'(x)\\,dx = \\int_{g(a)}^{g(b)} f(t)\\,dt",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\int_0^{\\pi/2}\\dfrac{\\sin x}{1 + \\cos^2 x}\\,dx\\).",
        steps: [
          "Put \\(\\cos x = t\\), so \\(-\\sin x\\,dx = dt\\), that is \\(\\sin x\\,dx = -dt\\).",
          "Limits: when \\(x = 0\\), \\(t = 1\\); when \\(x = \\dfrac{\\pi}{2}\\), \\(t = 0\\).",
          "\\(I = \\int_1^0 \\dfrac{-dt}{1 + t^2} = \\int_0^1 \\dfrac{dt}{1 + t^2}\\) (turning the limits round removes the minus sign).",
          "\\(= \\left[\\tan^{-1} t\\right]_0^1 = \\dfrac{\\pi}{4} - 0\\).",
        ],
        answer: "\\(\\int_0^{\\pi/2}\\dfrac{\\sin x}{1 + \\cos^2 x}\\,dx = \\dfrac{\\pi}{4}\\)",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\int_1^e \\dfrac{(\\log x)^2}{x}\\,dx\\).",
        steps: [
          "Put \\(\\log x = t\\), \\(\\dfrac{1}{x}\\,dx = dt\\). When \\(x = 1\\), \\(t = 0\\); when \\(x = e\\), \\(t = 1\\).",
          "\\(\\int_0^1 t^2\\,dt = \\left[\\dfrac{t^3}{3}\\right]_0^1\\).",
        ],
        answer: "\\(\\dfrac{1}{3}\\)",
      },
      practiceSet: [
        { prompt: "Evaluate \\(\\int_0^1 \\dfrac{2x}{1 + x^2}\\,dx\\).", answer: "\\(\\log 2\\)", method: "Put \\(1 + x^2 = t\\); \\(t\\) runs from 1 to 2." },
        { prompt: "Evaluate \\(\\int_0^{\\pi/2}\\sin x\\cos^2 x\\,dx\\).", answer: "\\(\\dfrac{1}{3}\\)", method: "Put \\(\\cos x = t\\); \\(\\int_0^1 t^2\\,dt\\)." },
        { prompt: "Evaluate \\(\\int_0^1 x\\,e^{x^2}\\,dx\\).", answer: "\\(\\dfrac{e - 1}{2}\\)", method: "Put \\(x^2 = t\\); \\(\\dfrac{1}{2}\\int_0^1 e^t\\,dt\\)." },
      ],
      pyqExampleId: "4c44eaef-cdd8-45ca-b4ca-f4a24423120d",
      traps: [
        {
          title: "Keeping the old limits",
          body: "After \\(t = g(x)\\), the limits \\(a\\) and \\(b\\) belong to \\(x\\). Putting them into an antiderivative in \\(t\\) gives a wrong number. Write the line 'when \\(x = a\\), \\(t = \\dots\\)' every time.",
        },
        {
          title: "Losing the minus sign in dt",
          body: "With \\(t = \\cos x\\), \\(dt = -\\sin x\\,dx\\). Either carry the minus sign or use it to turn the limits round; dropping it changes the sign of the answer.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmdi-standard-forms",
      name: "Standard forms: complete the square, partial fractions, rationalise",
      intuition:
        "Quadratics under a fraction or a root are made to look like one of a few standard integrals. Complete the square to get x² + a², a² − x² or x² − a²; split a product in the denominator into partial fractions; and when the denominator is a difference of square roots, rationalise it so that it becomes a sum of powers.",
      definition:
        "- \\(\\int\\dfrac{dx}{x^2 + a^2} = \\dfrac{1}{a}\\tan^{-1}\\dfrac{x}{a}\\), \\(\\int\\dfrac{dx}{\\sqrt{a^2 - x^2}} = \\sin^{-1}\\dfrac{x}{a}\\).\n" +
        "- \\(\\int\\dfrac{dx}{\\sqrt{x^2 + a^2}} = \\log\\left|x + \\sqrt{x^2 + a^2}\\right|\\), \\(\\int\\dfrac{dx}{a^2 - x^2} = \\dfrac{1}{2a}\\log\\left|\\dfrac{a + x}{a - x}\\right|\\).\n" +
        "- If the coefficient of \\(x^2\\) is not 1, take it out first; then complete the square.\n" +
        "- Rational functions: split into partial fractions, then integrate each part as a logarithm.\n" +
        "- \\(\\dfrac{1}{\\sqrt{x + k} - \\sqrt{x}}\\): multiply by \\(\\sqrt{x + k} + \\sqrt{x}\\) above and below.",
      formula: {
        label: "Two standard results",
        latex: "\\int \\frac{dx}{x^2 + a^2} = \\frac{1}{a}\\tan^{-1}\\frac{x}{a} + c, \\qquad \\int \\frac{dx}{\\sqrt{a^2 - x^2}} = \\sin^{-1}\\frac{x}{a} + c",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\int_{-1}^{0}\\dfrac{dx}{x^2 + 2x + 2}\\).",
        steps: [
          "Complete the square: \\(x^2 + 2x + 2 = (x + 1)^2 + 1^2\\).",
          "Using \\(\\int\\dfrac{dx}{x^2 + a^2} = \\dfrac{1}{a}\\tan^{-1}\\dfrac{x}{a}\\) with \\(a = 1\\): \\(\\int_{-1}^{0}\\dfrac{dx}{(x + 1)^2 + 1^2} = \\left[\\tan^{-1}(x + 1)\\right]_{-1}^{0}\\).",
          "\\(= \\tan^{-1} 1 - \\tan^{-1} 0 = \\dfrac{\\pi}{4} - 0\\).",
        ],
        answer: "\\(\\int_{-1}^{0}\\dfrac{dx}{x^2 + 2x + 2} = \\dfrac{\\pi}{4}\\)",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\int_0^1 \\dfrac{dx}{\\sqrt{4 - x^2}}\\).",
        steps: ["\\(\\left[\\sin^{-1}\\dfrac{x}{2}\\right]_0^1 = \\sin^{-1}\\dfrac{1}{2} - 0\\)."],
        answer: "\\(\\dfrac{\\pi}{6}\\)",
      },
      practiceSet: [
        { prompt: "Evaluate \\(\\int_0^1 \\dfrac{dx}{\\sqrt{x^2 + 1}}\\).", answer: "\\(\\left[\\log\\left|x + \\sqrt{x^2 + 1}\\right|\\right]_0^1 = \\log\\left(1 + \\sqrt{2}\\right)\\)" },
        { prompt: "Split \\(\\dfrac{1}{x(x + 1)}\\) into partial fractions.", answer: "\\(\\dfrac{1}{x} - \\dfrac{1}{x + 1}\\)" },
        { prompt: "Rationalise \\(\\dfrac{1}{\\sqrt{x + 1} - \\sqrt{x}}\\).", answer: "\\(\\sqrt{x + 1} + \\sqrt{x}\\)" },
      ],
      pyqExampleId: "b4166895-9d08-43f8-be18-da5bb0b0e4b7",
      traps: [
        {
          title: "Leaving the coefficient of x squared inside",
          body: "\\(\\int\\dfrac{dx}{4x^2 + 1} = \\dfrac{1}{4}\\int\\dfrac{dx}{x^2 + \\left(\\frac{1}{2}\\right)^2} = \\dfrac{1}{2}\\tan^{-1}2x\\), not \\(\\tan^{-1}2x\\). Take the coefficient out before you use the formula.",
        },
        {
          title: "Forgetting the 1/a in front",
          body: "\\(\\int\\dfrac{dx}{x^2 + a^2}\\) is \\(\\dfrac{1}{a}\\tan^{-1}\\dfrac{x}{a}\\). The \\(\\dfrac{1}{a}\\) is the step most often lost, and with it the whole answer.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmdi-trig-forms",
      name: "Trigonometric forms: half angles and t = tan(x/2)",
      intuition:
        "Fractions such as 1/(5 + 4 cos x) cannot be handled by a single identity. The substitution t = tan(x/2) turns sin x, cos x and dx into fractions in t, and the integral becomes a standard algebraic form. Simpler forms such as 1 + cos x need only a half-angle identity, and odd powers of sin or cos need sin² x + cos² x = 1.",
      definition:
        "- For \\(\\dfrac{1}{a + b\\cos x}\\) or \\(\\dfrac{1}{a + b\\sin x + c\\cos x}\\): put \\(\\tan\\dfrac{x}{2} = t\\). Then \\(dx = \\dfrac{2\\,dt}{1 + t^2}\\), \\(\\sin x = \\dfrac{2t}{1 + t^2}\\), \\(\\cos x = \\dfrac{1 - t^2}{1 + t^2}\\).\n" +
        "- Limits: \\(x = 0\\) gives \\(t = 0\\); \\(x = \\dfrac{\\pi}{2}\\) gives \\(t = 1\\).\n" +
        "- Half angles: \\(1 + \\cos x = 2\\cos^2\\dfrac{x}{2}\\), \\(1 - \\cos x = 2\\sin^2\\dfrac{x}{2}\\), \\(\\sin x = 2\\sin\\dfrac{x}{2}\\cos\\dfrac{x}{2}\\).\n" +
        "- Odd powers: keep one factor and change the rest, e.g. \\(\\cos^3 x = (1 - \\sin^2 x)\\cos x\\), then put \\(\\sin x = t\\).",
      formula: {
        label: "The t = tan(x/2) substitution",
        latex: "\\tan\\frac{x}{2} = t: \\quad dx = \\frac{2\\,dt}{1 + t^2}, \\quad \\sin x = \\frac{2t}{1 + t^2}, \\quad \\cos x = \\frac{1 - t^2}{1 + t^2}",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\int_0^{\\pi/2}\\dfrac{dx}{2 + \\cos x}\\).",
        steps: [
          "Put \\(\\tan\\dfrac{x}{2} = t\\): \\(dx = \\dfrac{2\\,dt}{1 + t^2}\\), \\(\\cos x = \\dfrac{1 - t^2}{1 + t^2}\\). When \\(x = 0\\), \\(t = 0\\); when \\(x = \\dfrac{\\pi}{2}\\), \\(t = 1\\).",
          "\\(2 + \\cos x = \\dfrac{2(1 + t^2) + 1 - t^2}{1 + t^2} = \\dfrac{3 + t^2}{1 + t^2}\\).",
          "\\(I = \\int_0^1 \\dfrac{1 + t^2}{3 + t^2}\\cdot\\dfrac{2\\,dt}{1 + t^2} = 2\\int_0^1 \\dfrac{dt}{t^2 + (\\sqrt{3})^2}\\).",
          "\\(= \\dfrac{2}{\\sqrt{3}}\\left[\\tan^{-1}\\dfrac{t}{\\sqrt{3}}\\right]_0^1 = \\dfrac{2}{\\sqrt{3}}\\cdot\\dfrac{\\pi}{6}\\).",
        ],
        answer: "\\(\\int_0^{\\pi/2}\\dfrac{dx}{2 + \\cos x} = \\dfrac{\\pi}{3\\sqrt{3}}\\)",
      },
      selfCheckExample: {
        prompt: "Write \\(\\dfrac{1 - \\cos x}{1 + \\cos x}\\) in terms of the half angle.",
        steps: ["\\(\\dfrac{2\\sin^2(x/2)}{2\\cos^2(x/2)}\\)."],
        answer: "\\(\\tan^2\\dfrac{x}{2}\\)",
      },
      practiceSet: [
        { prompt: "Evaluate \\(\\int_0^{\\pi/2}\\dfrac{dx}{1 + \\cos x}\\).", answer: "\\(1\\)", method: "\\(\\dfrac{1}{1 + \\cos x} = \\dfrac{1}{2}\\sec^2\\dfrac{x}{2}\\); \\(\\left[\\tan\\dfrac{x}{2}\\right]_0^{\\pi/2}\\)." },
        { prompt: "Evaluate \\(\\int_0^{\\pi/2}\\sin^3 x\\,dx\\).", answer: "\\(\\dfrac{2}{3}\\)", method: "\\(\\sin^3 x = (1 - \\cos^2 x)\\sin x\\); put \\(\\cos x = t\\)." },
        { prompt: "With \\(\\tan\\dfrac{x}{2} = t\\), write \\(\\sin x\\) in terms of \\(t\\).", answer: "\\(\\dfrac{2t}{1 + t^2}\\)" },
      ],
      pyqExampleId: "f82a32a6-5694-466a-b62a-e89216f754b8",
      traps: [
        {
          title: "Forgetting the 2 in dx",
          body: "\\(dx = \\dfrac{2\\,dt}{1 + t^2}\\). Writing \\(\\dfrac{dt}{1 + t^2}\\) halves the answer, and the mistake cannot be seen in the final line.",
        },
        {
          title: "Changing only part of the integrand",
          body: "Every \\(\\sin x\\), \\(\\cos x\\) and \\(dx\\), and both limits, must be in \\(t\\) before you integrate. A mixture of \\(x\\) and \\(t\\) cannot be integrated.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmdi-by-parts",
      name: "Integration by parts with limits",
      intuition:
        "Integration by parts handles a product, or a single log or inverse trigonometric function, just as in indefinite integration. With limits, the first part [u ∫v dx] gets its limits at once, and the second part stays a definite integral. Choose as u the factor that becomes simpler when differentiated.",
      definition:
        "- \\(\\int_a^b u\\,v\\,dx = \\left[u\\int v\\,dx\\right]_a^b - \\int_a^b \\left(\\dfrac{du}{dx}\\int v\\,dx\\right)dx\\).\n" +
        "- Take as \\(u\\) a log, an inverse trigonometric function or a power of \\(x\\); take as \\(v\\) the factor you can integrate.\n" +
        "- A lone \\(\\log x\\) or \\(\\tan^{-1} x\\): write it as \\(1 \\cdot \\log x\\) and take \\(v = 1\\).\n" +
        "- \\(\\int e^x\\left[f(x) + f'(x)\\right]dx = e^x f(x) + c\\).\n" +
        "- An inverse trigonometric expression such as \\(\\sin^{-1}\\dfrac{2x}{1 + x^2}\\) is often first simplified by \\(x = \\tan\\theta\\).",
      formula: {
        label: "By parts with limits",
        latex: "\\int_a^b u\\,v\\,dx = \\left[u\\int v\\,dx\\right]_a^b - \\int_a^b\\left(\\frac{du}{dx}\\int v\\,dx\\right)dx",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\int_1^e x\\log x\\,dx\\).",
        steps: [
          "Take \\(u = \\log x\\) and \\(v = x\\): \\(\\int x\\,dx = \\dfrac{x^2}{2}\\) and \\(\\dfrac{d}{dx}\\log x = \\dfrac{1}{x}\\).",
          "\\(I = \\left[\\dfrac{x^2}{2}\\log x\\right]_1^e - \\int_1^e \\dfrac{1}{x}\\cdot\\dfrac{x^2}{2}\\,dx\\).",
          "\\(= \\left(\\dfrac{e^2}{2}\\cdot 1 - \\dfrac{1}{2}\\cdot 0\\right) - \\dfrac{1}{2}\\left[\\dfrac{x^2}{2}\\right]_1^e = \\dfrac{e^2}{2} - \\dfrac{e^2 - 1}{4}\\).",
          "\\(= \\dfrac{2e^2 - e^2 + 1}{4} = \\dfrac{e^2 + 1}{4}\\).",
        ],
        answer: "\\(\\int_1^e x\\log x\\,dx = \\dfrac{e^2 + 1}{4}\\)",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\int_0^{\\pi} x\\cos x\\,dx\\).",
        steps: [
          "\\(u = x\\), \\(v = \\cos x\\): \\(\\left[x\\sin x\\right]_0^{\\pi} - \\int_0^{\\pi}\\sin x\\,dx\\).",
          "\\(= 0 - \\left[-\\cos x\\right]_0^{\\pi} = 0 - (1 + 1)\\).",
        ],
        answer: "\\(-2\\)",
      },
      practiceSet: [
        { prompt: "Evaluate \\(\\int_0^1 x\\,e^x\\,dx\\).", answer: "\\(\\left[x e^x - e^x\\right]_0^1 = 0 - (-1) = 1\\)" },
        { prompt: "Evaluate \\(\\int_1^e \\log x\\,dx\\).", answer: "\\(\\left[x\\log x - x\\right]_1^e = 0 - (-1) = 1\\)" },
        {
          prompt: "Evaluate \\(\\int_0^1 e^x\\left(\\dfrac{1}{1 + x} - \\dfrac{1}{(1 + x)^2}\\right)dx\\).",
          answer: "\\(\\left[\\dfrac{e^x}{1 + x}\\right]_0^1 = \\dfrac{e}{2} - 1\\)",
        },
      ],
      pyqExampleId: "6e95ae6d-010a-4be7-a177-ff24cd853518",
      traps: [
        {
          title: "Choosing u the wrong way round",
          body: "In \\(\\int x\\log x\\,dx\\), taking \\(u = x\\) needs \\(\\int\\log x\\,dx\\) first and makes the work longer. Take the log or the inverse trigonometric function as \\(u\\).",
        },
        {
          title: "Putting the limits on one part only",
          body: "Both \\(\\left[u\\int v\\,dx\\right]_a^b\\) and the remaining integral carry the limits. An answer that still contains \\(x\\) shows that one part was left as an indefinite integral.",
        },
      ],
    },
  ],
};
