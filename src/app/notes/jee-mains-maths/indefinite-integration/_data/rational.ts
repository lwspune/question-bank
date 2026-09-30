import type { SubtopicNote } from "@/app/notes/_types";

export const RATIONAL_II_NOTE: SubtopicNote = {
  subtopicName: "Rational Functions and Standard Forms",
  title: "Rational Functions and Standard Forms",
  oneLineDefinition:
    "Splitting a fraction into partial fractions, completing a square to reach a standard integral, and writing a numerator through the denominator and its derivative.",
  whyItMatters:
    "Eleven PYQs, six of them multiple choice, and one from 2026. Four split a fraction into partial fractions, three of them after putting t = x², t = tan x or t = x eˣ; three complete a square or use x ± 1/x to reach a standard form; four write the numerator as a multiple of the denominator plus a multiple of its derivative. Three ideas cover the page.",
  concepts: [
    // C1 — partial fractions
    {
      kind: "formula" as const,
      slug: "jii-partial",
      name: "Partial fractions",
      intuition:
        "A fraction with a factored denominator is a sum of simpler fractions, one for each factor, and each of those integrates to a log or an inverse tangent. For distinct linear factors, each coefficient is found by covering its factor and putting in the root. Many questions hide the fraction: substitute first, then split.",
      definition:
        "- If the top's degree is not below the bottom's, divide first.\n" +
        "- Distinct linear factors: \\(\\frac{A}{x-a}\\) for each, with \\(A\\) the cover-up value at \\(x=a\\).\n" +
        "- A factor that does not split, such as \\(x^2+1\\), takes \\(\\frac{Bx+C}{x^2+1}\\).\n" +
        "- A function of \\(x^2\\), \\(\\tan x\\) or \\(xe^x\\): put \\(t\\) equal to it first, then split in \\(t\\).",
      formula: {
        label: "Cover-up rule",
        latex: "\\frac{px+q}{(x-a)(x-b)}=\\frac{A}{x-a}+\\frac{B}{x-b},\\quad A=\\frac{pa+q}{a-b}",
      },
      authoredExample: {
        prompt: "Find \\(\\int\\frac{3x+5}{x^2-1}\\,dx\\).",
        steps: [
          "\\(x^2-1=(x-1)(x+1)\\). Cover-up at \\(x=1\\): \\(\\frac82=4\\). At \\(x=-1\\): \\(\\frac{2}{-2}=-1\\).",
          "So the integrand is \\(\\frac{4}{x-1}-\\frac{1}{x+1}\\).",
        ],
        answer: "\\(4\\ln|x-1|-\\ln|x+1|+C\\).",
      },
      selfCheckExample: {
        prompt: "Find \\(\\int\\frac{dx}{x(x^2+1)}\\).",
        steps: [
          "\\(\\frac{1}{x(x^2+1)}=\\frac1x-\\frac{x}{x^2+1}\\).",
        ],
        answer: "\\(\\ln|x|-\\frac12\\ln(x^2+1)+C\\).",
      },
      practiceSet: [
        { prompt: "\\(\\int\\frac{dx}{x^2-4}\\)?", answer: "\\(\\frac14\\ln\\left|\\frac{x-2}{x+2}\\right|+C\\)" },
        { prompt: "Cover-up value of \\(\\frac{1}{x-1}\\) in \\(\\frac{2x+3}{(x-1)(x+4)}\\)?", answer: "\\(1\\)" },
        { prompt: "First step for \\(\\int\\frac{x^3}{x^2-1}\\,dx\\)?", answer: "Divide: \\(x+\\frac{x}{x^2-1}\\)" },
        { prompt: "\\(\\int\\frac{dx}{x(x+1)}\\)?", answer: "\\(\\ln\\left|\\frac{x}{x+1}\\right|+C\\)" },
      ],
      pyqExampleId: "d50eef5d-1084-43ef-a78f-d8baf086699a", // 2026 — two linear factors, then a given value
      traps: [
        {
          title: "Divide before splitting",
          body: "Partial fractions need the top's degree below the bottom's. For \\(\\frac{x^2}{x^2-1}\\), first write \\(1+\\frac{1}{x^2-1}\\); splitting straight away loses the 1.",
        },
      ],
    },

    // C2 — standard forms
    {
      kind: "formula" as const,
      slug: "jii-standard-forms",
      name: "Completing the square and x ± 1/x",
      intuition:
        "A quadratic that does not factor is a square plus a constant, and one over that is an inverse tangent. Complete the square first and the standard table does the rest. When the top is \\(x^2\\pm1\\) and the bottom is a quartic with no odd powers, divide by \\(x^2\\): the top becomes the derivative of \\(x\\mp\\frac1x\\).",
      definition:
        "- \\(\\int\\frac{dx}{x^2+a^2}=\\frac1a\\tan^{-1}\\frac xa\\); \\(\\int\\frac{dx}{x^2-a^2}=\\frac1{2a}\\ln\\left|\\frac{x-a}{x+a}\\right|\\).\n" +
        "- \\(\\int\\frac{dx}{\\sqrt{x^2+a^2}}=\\ln\\left|x+\\sqrt{x^2+a^2}\\right|\\); \\(\\int\\frac{dx}{\\sqrt{a^2-x^2}}=\\sin^{-1}\\frac xa\\).\n" +
        "- \\(\\int\\sqrt{x^2+a^2}\\,dx=\\frac x2\\sqrt{x^2+a^2}+\\frac{a^2}2\\ln\\left|x+\\sqrt{x^2+a^2}\\right|\\).\n" +
        "- For \\(\\frac{x^2\\pm1}{x^4+kx^2+1}\\), divide by \\(x^2\\) and put \\(t=x\\mp\\frac1x\\). Higher powers work the same way: \\(t=x^3+\\frac1{x^3}\\).",
      formula: {
        label: "Complete the square",
        latex: "\\int\\frac{dx}{(x+p)^2+a^2}=\\frac1a\\tan^{-1}\\frac{x+p}{a}+C",
      },
      authoredExample: {
        prompt: "Find \\(\\int\\frac{dx}{x^2+4x+13}\\).",
        steps: [
          "\\(x^2+4x+13=(x+2)^2+9\\).",
          "Use the table with \\(a=3\\).",
        ],
        answer: "\\(\\frac13\\tan^{-1}\\frac{x+2}{3}+C\\).",
      },
      selfCheckExample: {
        prompt: "Find \\(\\int\\frac{x^2+1}{x^4+1}\\,dx\\).",
        steps: [
          "Divide by \\(x^2\\): \\(\\frac{1+x^{-2}}{x^2+x^{-2}}\\). Put \\(t=x-\\frac1x\\), so \\(x^2+x^{-2}=t^2+2\\).",
          "\\(\\int\\frac{dt}{t^2+2}=\\frac{1}{\\sqrt2}\\tan^{-1}\\frac{t}{\\sqrt2}\\).",
        ],
        answer: "\\(\\frac{1}{\\sqrt2}\\tan^{-1}\\frac{x^2-1}{\\sqrt2\\,x}+C\\).",
      },
      practiceSet: [
        { prompt: "\\(\\int\\frac{dx}{x^2+2x+2}\\)?", answer: "\\(\\tan^{-1}(x+1)+C\\)" },
        { prompt: "\\(\\int\\frac{dx}{\\sqrt{x^2+6x+10}}\\)?", answer: "\\(\\ln\\left|x+3+\\sqrt{x^2+6x+10}\\right|+C\\)" },
        { prompt: "\\(\\int\\frac{dx}{\\sqrt{4-x^2}}\\)?", answer: "\\(\\sin^{-1}\\frac x2+C\\)" },
        { prompt: "Substitution for \\(\\int\\frac{x^2-1}{x^4+x^2+1}\\,dx\\)?", answer: "\\(t=x+\\frac1x\\), giving \\(\\int\\frac{dt}{t^2-1}\\)" },
      ],
      pyqExampleId: "19567aa7-ca07-4b70-ac0d-e7758e498092", // 2024 — divide by x^6 and put t = x^3 + 1/x^3
      traps: [
        {
          title: "Match the sign to the top",
          body: "For \\(x^2+1\\) on top, put \\(t=x-\\frac1x\\); for \\(x^2-1\\), put \\(t=x+\\frac1x\\). The other choice leaves no \\(dt\\) in the numerator.",
        },
      ],
    },

    // C3 — numerator through the denominator
    {
      kind: "formula" as const,
      slug: "jii-linear-combo",
      name: "Numerator through the denominator",
      intuition:
        "Write the numerator as a multiple of the denominator plus a multiple of its derivative. The first part integrates to a multiple of \\(x\\), and the second to a log. For a quadratic under a root, the same split turns the integral into a root, a log and \\(\\int\\sqrt Q\\), each from the table.",
      definition:
        "- \\(\\frac{a\\sin x+b\\cos x}{c\\sin x+d\\cos x}\\) or \\(\\frac{ae^x+be^{-x}}{ce^x+de^{-x}}\\): write the top as \\(A\\,g+B\\,g'\\), where \\(g\\) is the bottom.\n" +
        "- Match the coefficients of \\(\\sin x\\) and \\(\\cos x\\) (or \\(e^x\\) and \\(e^{-x}\\)) to find \\(A\\) and \\(B\\).\n" +
        "- \\(\\frac{px+q}{Q}\\) or \\(\\frac{px+q}{\\sqrt Q}\\): top \\(=A\\,Q'+B\\).\n" +
        "- \\(\\frac{\\text{quadratic}}{\\sqrt Q}\\): top \\(=A\\,Q+B\\,Q'+C\\).",
      formula: {
        label: "Split the numerator",
        latex: "\\int\\frac{A\\,g(x)+B\\,g'(x)}{g(x)}\\,dx=Ax+B\\ln|g(x)|+C",
      },
      authoredExample: {
        prompt: "Find \\(\\int\\frac{\\sin x}{\\sin x+\\cos x}\\,dx\\).",
        steps: [
          "Write \\(\\sin x=A(\\sin x+\\cos x)+B(\\cos x-\\sin x)\\): \\(A-B=1\\) and \\(A+B=0\\).",
          "So \\(A=\\frac12\\) and \\(B=-\\frac12\\).",
        ],
        answer: "\\(\\frac x2-\\frac12\\ln|\\sin x+\\cos x|+C\\).",
      },
      selfCheckExample: {
        prompt: "Find \\(\\int\\frac{x+3}{x^2+2x+5}\\,dx\\).",
        steps: [
          "\\(x+3=\\frac12(2x+2)+2\\), and \\(x^2+2x+5=(x+1)^2+4\\).",
          "\\(\\int\\frac{2\\,dx}{(x+1)^2+4}=\\tan^{-1}\\frac{x+1}{2}\\).",
        ],
        answer: "\\(\\frac12\\ln(x^2+2x+5)+\\tan^{-1}\\frac{x+1}{2}+C\\).",
      },
      practiceSet: [
        { prompt: "\\(\\int\\frac{\\cos x}{\\sin x+\\cos x}\\,dx\\)?", answer: "\\(\\frac x2+\\frac12\\ln|\\sin x+\\cos x|+C\\)" },
        { prompt: "\\(\\int\\frac{2x+1}{x^2+x+3}\\,dx\\)?", answer: "\\(\\ln(x^2+x+3)+C\\)" },
        { prompt: "\\(\\int\\frac{x+1}{\\sqrt{x^2+2x+5}}\\,dx\\)?", answer: "\\(\\sqrt{x^2+2x+5}+C\\)" },
        { prompt: "\\(\\int\\frac{2\\sin x+3\\cos x}{\\sin x+\\cos x}\\,dx\\)?", answer: "\\(\\frac52x+\\frac12\\ln|\\sin x+\\cos x|+C\\)" },
      ],
      pyqExampleId: "951c8d9e-69cc-4b48-8323-5ad5328c3975", // 2025 — a quadratic over the root of a quadratic
      traps: [
        {
          title: "Keep the leftover constant",
          body: "A quadratic top needs three pieces: \\(A\\,Q+B\\,Q'+C\\). With only the first two, the constant \\(C\\) is lost, and so is its \\(\\int\\frac{dx}{\\sqrt Q}\\) log term.",
        },
      ],
    },
  ],
};
