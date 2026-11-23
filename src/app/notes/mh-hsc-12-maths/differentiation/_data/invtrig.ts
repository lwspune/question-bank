import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_MA_DF_INVTRIG_NOTE: SubtopicNote = {
  subtopicName: "Derivatives of Inverse Trigonometric Functions",
  title: "Derivatives of Inverse Trigonometric Functions",
  oneLineDefinition:
    "The six standard results such as the derivative of sin⁻¹ x being 1/√(1 − x²), used with the chain rule, and the identities and substitutions that turn a complicated inverse trigonometric function into a simple one before differentiating.",
  whyItMatters:
    "93 questions, the largest page of the chapter, three of them from board papers: cos⁻¹(2x√(1 − x²)) by a substitution (2016), tan⁻¹ of (5x + 1)/(3 − x − 6x²) split into two inverse tangents (2018), and tan⁻¹ √((3 − x)/(3 + x)) (2024). The textbook rows are Exercise 1.2 Q.5 to Q.10, the solved examples of section 1.2.6, and MCQs and long questions from Miscellaneous Exercise 1.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscmdf-invtable",
      name: "The standard derivatives",
      intuition:
        "Each result comes from the rule for inverse functions. For y = sin⁻¹ x we have x = sin y, so dx/dy = cos y = √(1 − x²), and dy/dx is its reciprocal. Learn the six in pairs: each co-function has the same derivative with a minus sign.",
      definition:
        "- \\(\\dfrac{d}{dx}\\sin^{-1}x = \\dfrac{1}{\\sqrt{1 - x^2}}\\) and \\(\\dfrac{d}{dx}\\cos^{-1}x = -\\dfrac{1}{\\sqrt{1 - x^2}}\\), for \\(|x| < 1\\).\n" +
        "- \\(\\dfrac{d}{dx}\\tan^{-1}x = \\dfrac{1}{1 + x^2}\\) and \\(\\dfrac{d}{dx}\\cot^{-1}x = -\\dfrac{1}{1 + x^2}\\), for every real \\(x\\).\n" +
        "- \\(\\dfrac{d}{dx}\\sec^{-1}x = \\dfrac{1}{x\\sqrt{x^2 - 1}}\\) and \\(\\dfrac{d}{dx}\\operatorname{cosec}^{-1}x = -\\dfrac{1}{x\\sqrt{x^2 - 1}}\\), for \\(x > 1\\).\n" +
        "- With the chain rule: \\(\\dfrac{d}{dx}\\sin^{-1}[f(x)] = \\dfrac{f'(x)}{\\sqrt{1 - [f(x)]^2}}\\), \\(\\dfrac{d}{dx}\\tan^{-1}[f(x)] = \\dfrac{f'(x)}{1 + [f(x)]^2}\\), and so on.\n" +
        "- **Proof of the first:** let \\(y = \\sin^{-1}x\\), so \\(x = \\sin y\\) with \\(-\\dfrac{\\pi}{2} < y < \\dfrac{\\pi}{2}\\).\n" +
        "- \\(\\dfrac{dx}{dy} = \\cos y = \\sqrt{1 - \\sin^2 y} = \\sqrt{1 - x^2}\\), positive because \\(\\cos y > 0\\) in that range.\n" +
        "- Hence \\(\\dfrac{dy}{dx} = \\dfrac{1}{\\dfrac{dx}{dy}} = \\dfrac{1}{\\sqrt{1 - x^2}}\\).",
      formula: {
        label: "Inverse trigonometric derivatives",
        latex: "\\frac{d}{dx}\\sin^{-1}x = \\frac{1}{\\sqrt{1 - x^2}}, \\quad \\frac{d}{dx}\\tan^{-1}x = \\frac{1}{1 + x^2}, \\quad \\frac{d}{dx}\\sec^{-1}x = \\frac{1}{x\\sqrt{x^2 - 1}}",
      },
      authoredExample: {
        prompt: "Differentiate \\(y = \\tan^{-1}(e^{2x})\\) with respect to \\(x\\).",
        steps: [
          "By the chain rule, \\(\\dfrac{dy}{dx} = \\dfrac{1}{1 + (e^{2x})^2} \\cdot \\dfrac{d}{dx}(e^{2x})\\).",
          "\\(\\dfrac{d}{dx}(e^{2x}) = 2e^{2x}\\) and \\((e^{2x})^2 = e^{4x}\\).",
          "\\(\\dfrac{dy}{dx} = \\dfrac{2e^{2x}}{1 + e^{4x}}\\).",
        ],
        answer: "\\(\\dfrac{dy}{dx} = \\dfrac{2e^{2x}}{1 + e^{4x}}\\)",
      },
      selfCheckExample: {
        prompt: "Differentiate \\(\\cos^{-1}(\\sqrt{x})\\) with respect to \\(x\\), for \\(0 < x < 1\\).",
        steps: ["\\(\\dfrac{dy}{dx} = -\\dfrac{1}{\\sqrt{1 - x}} \\cdot \\dfrac{1}{2\\sqrt{x}}\\)."],
        answer: "\\(\\dfrac{dy}{dx} = -\\dfrac{1}{2\\sqrt{x}\\sqrt{1 - x}}\\)",
      },
      practiceSet: [
        {
          prompt: "Differentiate \\(\\sec^{-1}(x^2)\\) with respect to \\(x\\), for \\(x > 1\\).",
          answer: "\\(\\dfrac{2x}{x^2\\sqrt{x^4 - 1}} = \\dfrac{2}{x\\sqrt{x^4 - 1}}\\)",
        },
        { prompt: "Differentiate \\(\\cot^{-1}(3x)\\) with respect to \\(x\\).", answer: "\\(-\\dfrac{3}{1 + 9x^2}\\)" },
        {
          prompt: "Using derivatives, show that \\(\\tan^{-1}x + \\cot^{-1}x\\) is a constant, and find it.",
          answer: "Its derivative is \\(\\dfrac{1}{1 + x^2} - \\dfrac{1}{1 + x^2} = 0\\); at \\(x = 1\\) the value is \\(\\dfrac{\\pi}{4} + \\dfrac{\\pi}{4} = \\dfrac{\\pi}{2}\\)",
        },
      ],
      pyqExampleId: "4ec94b3c-d8ee-4be0-80f1-fc7e0bb9c181",
      traps: [
        {
          title: "Missing the minus sign of a co-function",
          body: "The derivatives of \\(\\cos^{-1}x\\), \\(\\cot^{-1}x\\) and \\(\\operatorname{cosec}^{-1}x\\) are the negatives of those of \\(\\sin^{-1}x\\), \\(\\tan^{-1}x\\) and \\(\\sec^{-1}x\\). Learning them in pairs prevents the slip.",
        },
        {
          title: "Forgetting the inner derivative",
          body: "In \\(\\tan^{-1}(\\log x)\\) the factor \\(\\dfrac{1}{x}\\) from \\(\\log x\\) is part of the answer: \\(\\dfrac{1}{x[1 + (\\log x)^2]}\\). The table gives only the outer layer.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmdf-trigform",
      name: "Inverse of a trigonometric expression: simplify first",
      intuition:
        "When the expression inside is already made of sin x, cos x or tan x, rewrite it as one trigonometric function of a single angle. Then the inverse function cancels it, and you differentiate a simple expression in x, often in one line.",
      definition:
        "- Half-angle forms: \\(\\dfrac{1 - \\cos\\theta}{\\sin\\theta} = \\tan\\dfrac{\\theta}{2}\\), \\(\\dfrac{1 + \\cos\\theta}{\\sin\\theta} = \\cot\\dfrac{\\theta}{2}\\), \\(\\sqrt{\\dfrac{1 + \\cos\\theta}{2}} = \\cos\\dfrac{\\theta}{2}\\).\n" +
        "- \\(\\dfrac{\\cos x}{1 + \\sin x} = \\tan\\left(\\dfrac{\\pi}{4} - \\dfrac{x}{2}\\right)\\).\n" +
        "- \\(a\\sin x + b\\cos x\\): divide by \\(\\sqrt{a^2 + b^2}\\) and write it as \\(\\sin(x + \\alpha)\\), where \\(\\cos\\alpha = \\dfrac{a}{\\sqrt{a^2 + b^2}}\\), \\(\\sin\\alpha = \\dfrac{b}{\\sqrt{a^2 + b^2}}\\) and \\(\\alpha\\) is a constant.\n" +
        "- Co-function swaps: \\(\\cos^{-1}(\\sin\\theta) = \\dfrac{\\pi}{2} - \\theta\\) and \\(\\tan^{-1}(\\cot\\theta) = \\dfrac{\\pi}{2} - \\theta\\).\n" +
        "- Then \\(\\sin^{-1}(\\sin\\theta) = \\theta\\), \\(\\tan^{-1}(\\tan\\theta) = \\theta\\) and so on, for \\(\\theta\\) in the principal range.",
      formula: {
        label: "Cancelling the inverse",
        latex: "\\tan^{-1}(\\tan\\theta) = \\theta, \\quad -\\frac{\\pi}{2} < \\theta < \\frac{\\pi}{2}",
      },
      authoredExample: {
        prompt: "Differentiate \\(y = \\sin^{-1}\\left(\\dfrac{3\\sin x + 4\\cos x}{5}\\right)\\) with respect to \\(x\\).",
        steps: [
          "Since \\(\\left(\\dfrac{3}{5}\\right)^2 + \\left(\\dfrac{4}{5}\\right)^2 = 1\\), put \\(\\dfrac{3}{5} = \\cos\\alpha\\) and \\(\\dfrac{4}{5} = \\sin\\alpha\\), where \\(\\alpha = \\tan^{-1}\\dfrac{4}{3}\\) is a constant.",
          "\\(\\dfrac{3\\sin x + 4\\cos x}{5} = \\sin x\\cos\\alpha + \\cos x\\sin\\alpha = \\sin(x + \\alpha)\\).",
          "\\(y = \\sin^{-1}[\\sin(x + \\alpha)] = x + \\alpha\\).",
          "\\(\\dfrac{dy}{dx} = 1 + 0 = 1\\).",
        ],
        answer: "\\(\\dfrac{dy}{dx} = 1\\)",
      },
      selfCheckExample: {
        prompt: "Differentiate \\(\\cos^{-1}\\left(\\sqrt{\\dfrac{1 + \\cos 2x}{2}}\\right)\\) for \\(0 < x < \\dfrac{\\pi}{2}\\).",
        steps: ["\\(\\sqrt{\\dfrac{1 + \\cos 2x}{2}} = \\sqrt{\\cos^2 x} = \\cos x\\), so \\(y = \\cos^{-1}(\\cos x) = x\\)."],
        answer: "\\(\\dfrac{dy}{dx} = 1\\)",
      },
      practiceSet: [
        {
          prompt: "Differentiate \\(\\cos^{-1}(\\sin 5x)\\) for \\(0 < x < \\dfrac{\\pi}{10}\\).",
          answer: "\\(y = \\dfrac{\\pi}{2} - 5x\\), so \\(\\dfrac{dy}{dx} = -5\\)",
        },
        {
          prompt: "Differentiate \\(\\tan^{-1}\\left(\\dfrac{\\cos x}{1 + \\sin x}\\right)\\) for \\(-\\dfrac{\\pi}{2} < x < \\dfrac{\\pi}{2}\\).",
          answer: "\\(y = \\dfrac{\\pi}{4} - \\dfrac{x}{2}\\), so \\(\\dfrac{dy}{dx} = -\\dfrac{1}{2}\\)",
        },
      ],
      pyqExampleId: "9800fd2d-31c1-4a1c-85d5-62b18cf48193",
      traps: [
        {
          title: "Differentiating before simplifying",
          body: "The chain rule applied straight to \\(\\sin^{-1}\\) of a long trigonometric fraction gives a page of algebra and many chances to slip. The identity reduces it to one line, and the examiner looks for that line.",
        },
        {
          title: "Not writing the constant angle",
          body: "In \\(\\sin(x + \\alpha)\\) the angle \\(\\alpha\\) is a constant only because the coefficients are numbers. Show the line \\(y = x + \\alpha\\) and then say its derivative is 0; do not make \\(\\alpha\\) vanish without a word.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmdf-substitution",
      name: "Algebraic expressions: substitute x = sin θ, tan θ or cos 2θ",
      intuition:
        "Expressions like 2x/(1 + x²), (1 − x²)/(1 + x²) and 2x√(1 − x²) are trigonometric formulas in disguise. Put x = tan θ or x = sin θ and the expression becomes sin 2θ, cos 2θ or tan 2θ; the inverse function then cancels and leaves a multiple of θ.",
      definition:
        "- \\(\\sqrt{1 - x^2}\\): put \\(x = \\sin\\theta\\) or \\(x = \\cos\\theta\\).\n" +
        "- \\(1 + x^2\\), \\(\\dfrac{2x}{1 - x^2}\\), \\(\\dfrac{2x}{1 + x^2}\\), \\(\\dfrac{1 - x^2}{1 + x^2}\\): put \\(x = \\tan\\theta\\).\n" +
        "- \\(\\sqrt{\\dfrac{a - x}{a + x}}\\): put \\(x = a\\cos 2\\theta\\).\n" +
        "- \\(3x - 4x^3\\): put \\(x = \\sin\\theta\\); \\(4x^3 - 3x\\): put \\(x = \\cos\\theta\\).\n" +
        "- Results used: \\(\\dfrac{2\\tan\\theta}{1 + \\tan^2\\theta} = \\sin 2\\theta\\), \\(\\dfrac{1 - \\tan^2\\theta}{1 + \\tan^2\\theta} = \\cos 2\\theta\\), \\(2\\sin\\theta\\cos\\theta = \\sin 2\\theta\\), \\(3\\sin\\theta - 4\\sin^3\\theta = \\sin 3\\theta\\), \\(4\\cos^3\\theta - 3\\cos\\theta = \\cos 3\\theta\\).\n" +
        "- Write \\(\\theta\\) back in terms of \\(x\\) (\\(\\theta = \\tan^{-1}x\\), and so on) before differentiating, and state the interval of \\(x\\) you assumed.",
      formula: {
        label: "A typical substitution",
        latex: "x = \\tan\\theta: \\quad \\sin^{-1}\\frac{2x}{1 + x^2} = \\sin^{-1}(\\sin 2\\theta) = 2\\tan^{-1}x \\quad (|x| \\le 1)",
      },
      authoredExample: {
        prompt: "Differentiate \\(y = \\sin^{-1}(3x - 4x^3)\\) with respect to \\(x\\), for \\(|x| < \\dfrac{1}{2}\\).",
        steps: [
          "Put \\(x = \\sin\\theta\\), so \\(\\theta = \\sin^{-1}x\\) and \\(-\\dfrac{\\pi}{6} < \\theta < \\dfrac{\\pi}{6}\\).",
          "\\(3x - 4x^3 = 3\\sin\\theta - 4\\sin^3\\theta = \\sin 3\\theta\\).",
          "\\(3\\theta\\) lies between \\(-\\dfrac{\\pi}{2}\\) and \\(\\dfrac{\\pi}{2}\\), so \\(y = \\sin^{-1}(\\sin 3\\theta) = 3\\theta = 3\\sin^{-1}x\\).",
          "\\(\\dfrac{dy}{dx} = \\dfrac{3}{\\sqrt{1 - x^2}}\\).",
        ],
        answer: "\\(\\dfrac{dy}{dx} = \\dfrac{3}{\\sqrt{1 - x^2}}\\)",
      },
      selfCheckExample: {
        prompt: "Differentiate \\(\\tan^{-1}\\left(\\dfrac{2x}{1 - x^2}\\right)\\) with respect to \\(x\\), for \\(|x| < 1\\).",
        steps: ["Put \\(x = \\tan\\theta\\): the expression is \\(\\tan^{-1}(\\tan 2\\theta) = 2\\theta = 2\\tan^{-1}x\\)."],
        answer: "\\(\\dfrac{dy}{dx} = \\dfrac{2}{1 + x^2}\\)",
      },
      practiceSet: [
        {
          prompt: "Differentiate \\(\\sin^{-1}\\left(\\dfrac{2x}{1 + x^2}\\right)\\) with respect to \\(x\\), for \\(|x| < 1\\).",
          answer: "\\(\\dfrac{2}{1 + x^2}\\)",
        },
        {
          prompt: "Differentiate \\(\\cos^{-1}(4x^3 - 3x)\\) with respect to \\(x\\), for \\(\\dfrac{1}{2} < x < 1\\).",
          answer: "Put \\(x = \\cos\\theta\\): \\(y = 3\\cos^{-1}x\\), so \\(\\dfrac{dy}{dx} = -\\dfrac{3}{\\sqrt{1 - x^2}}\\)",
        },
      ],
      pyqExampleId: "6c0be44e-5f51-4d54-81ad-1d7ae8a5428d",
      traps: [
        {
          title: "Ignoring the range of θ",
          body: "\\(\\cos^{-1}(\\cos 2\\theta) = 2\\theta\\) only when \\(2\\theta\\) lies in \\([0, \\pi]\\). State the interval of \\(x\\); outside it the answer can change sign, which is why the textbook gives two answers for some parts.",
        },
        {
          title: "Not returning to x",
          body: "After \\(y = 2\\theta\\), write \\(\\theta = \\tan^{-1}x\\) before you differentiate. Differentiating \\(2\\theta\\) as if \\(\\theta\\) were \\(x\\) gives 2, which is wrong.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmdf-split",
      name: "Split into a sum or difference of inverse tangents",
      intuition:
        "A fraction of the form (a + b)/(1 − ab) inside tan⁻¹ is the formula for tan⁻¹ a + tan⁻¹ b. Find two simple expressions whose sum is the numerator and whose product is the term subtracted from 1 in the denominator, and the derivative becomes two short terms.",
      definition:
        "- \\(\\tan^{-1}a + \\tan^{-1}b = \\tan^{-1}\\dfrac{a + b}{1 - ab}\\) and \\(\\tan^{-1}a - \\tan^{-1}b = \\tan^{-1}\\dfrac{a - b}{1 + ab}\\), for suitable \\(a\\) and \\(b\\).\n" +
        "- Make the denominator start with 1: divide the numerator and the denominator by a constant if needed.\n" +
        "- Split the numerator, for example \\(kx = mx + nx\\), so that \\(mx \\cdot nx\\) is the \\(x^2\\) term of the denominator.\n" +
        "- For \\(\\cot^{-1}u\\), first write \\(\\cot^{-1}u = \\tan^{-1}\\dfrac{1}{u}\\), for \\(u > 0\\).",
      formula: {
        label: "Sum of two inverse tangents",
        latex: "\\tan^{-1}\\frac{a + b}{1 - ab} = \\tan^{-1}a + \\tan^{-1}b",
      },
      authoredExample: {
        prompt: "Differentiate \\(y = \\tan^{-1}\\left(\\dfrac{5x}{1 - 6x^2}\\right)\\) with respect to \\(x\\).",
        steps: [
          "Write \\(5x = 3x + 2x\\); then \\((3x)(2x) = 6x^2\\), which is the term in the denominator.",
          "\\(y = \\tan^{-1}\\left(\\dfrac{3x + 2x}{1 - (3x)(2x)}\\right) = \\tan^{-1}(3x) + \\tan^{-1}(2x)\\).",
          "\\(\\dfrac{dy}{dx} = \\dfrac{3}{1 + 9x^2} + \\dfrac{2}{1 + 4x^2}\\).",
        ],
        answer: "\\(\\dfrac{dy}{dx} = \\dfrac{3}{1 + 9x^2} + \\dfrac{2}{1 + 4x^2}\\)",
      },
      selfCheckExample: {
        prompt: "Differentiate \\(\\tan^{-1}\\left(\\dfrac{x}{1 + 2x^2}\\right)\\) with respect to \\(x\\).",
        steps: ["\\(x = 2x - x\\) and \\((2x)(x) = 2x^2\\), so the function is \\(\\tan^{-1}(2x) - \\tan^{-1}x\\)."],
        answer: "\\(\\dfrac{dy}{dx} = \\dfrac{2}{1 + 4x^2} - \\dfrac{1}{1 + x^2}\\)",
      },
      practiceSet: [
        {
          prompt: "Differentiate \\(\\tan^{-1}\\left(\\dfrac{7x}{1 - 10x^2}\\right)\\) with respect to \\(x\\).",
          answer: "\\(\\dfrac{5}{1 + 25x^2} + \\dfrac{2}{1 + 4x^2}\\)",
        },
        {
          prompt: "Differentiate \\(\\tan^{-1}\\left(\\dfrac{a + x}{1 - ax}\\right)\\) with respect to \\(x\\), where \\(a\\) is a constant.",
          answer: "The function is \\(\\tan^{-1}a + \\tan^{-1}x\\), so the derivative is \\(\\dfrac{1}{1 + x^2}\\)",
        },
      ],
      pyqExampleId: "0ba714c5-5adf-484e-a5d7-d636638aa412",
      traps: [
        {
          title: "Forcing a split that does not fit",
          body: "Check the product: the two parts must multiply to give exactly the term subtracted from 1. If they do not, the formula does not apply and the derivative will be wrong.",
        },
        {
          title: "Wrong sign with a difference",
          body: "\\(\\dfrac{a - b}{1 + ab}\\) gives \\(\\tan^{-1}a - \\tan^{-1}b\\). With a plus sign in the denominator, the derivative has a minus sign between its two terms.",
        },
      ],
    },
  ],
};
