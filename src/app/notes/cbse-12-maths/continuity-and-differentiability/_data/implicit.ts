import type { SubtopicNote } from "@/app/notes/_types";

export const CB_MA_CD_IMPLICIT_NOTE: SubtopicNote = {
  subtopicName: "Derivatives of Implicit and Inverse Trigonometric Functions",
  title: "Implicit Functions and Inverse Trigonometric Functions",
  oneLineDefinition:
    "Differentiating a relation between x and y without solving it for y, the derivatives of the inverse trigonometric functions, simplifying an inverse trigonometric expression before differentiating it, and relations that a substitution makes simple.",
  whyItMatters:
    "63 questions, thirty-six of them from board papers from 2023 to 2026. The board asks implicit derivatives such as (x² + y²)² = xy (2023), −2x² − 5xy + y³ = 76 (2025) and √3(x² + y²) = 4xy at a point (2026), MCQs on the derivatives of sin⁻¹x, cos⁻¹x and tan⁻¹x (2024, 2026), simplest forms before differentiating such as sin⁻¹(3x − 4x³) (2025), the derivative of one inverse function with respect to another (2023, 2025, 2026), and the proof that √(1 − x²) + √(1 − y²) = a(x − y) gives dy/dx = √((1 − y²)/(1 − x²)) (2024, 2025). The textbook adds Examples 22 to 24, Exercise 5.3, Miscellaneous Example 40 and six Miscellaneous Exercise questions.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbmcd-implicit",
      name: "Implicit differentiation",
      intuition:
        "When y is tied to x by an equation you cannot easily solve for y, differentiate both sides as they stand. Every time you differentiate a term containing y, the chain rule adds a factor \\(\\dfrac{dy}{dx}\\).",
      definition:
        "- Differentiate both sides of the relation with respect to x, treating y as a function of x (NCERT Examples 22 and 23).\n" +
        "- \\(\\dfrac{d}{dx}(y^n) = ny^{n - 1}\\dfrac{dy}{dx}\\), \\(\\dfrac{d}{dx}(\\sin y) = \\cos y\\dfrac{dy}{dx}\\), and \\(\\dfrac{d}{dx}(xy) = x\\dfrac{dy}{dx} + y\\) by the product rule.\n" +
        "- Collect the \\(\\dfrac{dy}{dx}\\) terms on one side, take \\(\\dfrac{dy}{dx}\\) out as a factor and divide.\n" +
        "- If the relation says something is constant, such as \\(\\sin(xy) = 1\\) or \\(\\tan^{-1}(x^2 + y^2) = a^2\\), first write the inside as a constant: \\(xy = c\\) gives \\(\\dfrac{dy}{dx} = -\\dfrac{y}{x}\\).\n" +
        "- For a value at a point, find the general \\(\\dfrac{dy}{dx}\\) first, then substitute the point.",
      formula: {
        label: "Derivative of a power of y",
        latex: "\\frac{d}{dx}\\left(y^n\\right) = n y^{n - 1}\\frac{dy}{dx}",
      },
      authoredExample: {
        prompt: "Find \\(\\dfrac{dy}{dx}\\) if \\(x^3 + y^3 = 6xy\\).",
        steps: [
          "Differentiate both sides: \\(3x^2 + 3y^2\\dfrac{dy}{dx} = 6\\left(x\\dfrac{dy}{dx} + y\\right)\\).",
          "Divide by 3: \\(x^2 + y^2\\dfrac{dy}{dx} = 2x\\dfrac{dy}{dx} + 2y\\).",
          "Collect: \\((y^2 - 2x)\\dfrac{dy}{dx} = 2y - x^2\\).",
          "\\(\\dfrac{dy}{dx} = \\dfrac{2y - x^2}{y^2 - 2x}\\).",
        ],
        answer: "\\(\\dfrac{dy}{dx} = \\dfrac{2y - x^2}{y^2 - 2x}\\)",
      },
      selfCheckExample: {
        prompt: "Find \\(\\dfrac{dy}{dx}\\) at the point \\((1, 2)\\) if \\(x^2 + xy^2 = 5\\).",
        steps: [
          "Differentiate: \\(2x + y^2 + 2xy\\dfrac{dy}{dx} = 0\\).",
          "\\(\\dfrac{dy}{dx} = -\\dfrac{2x + y^2}{2xy}\\).",
          "At \\((1, 2)\\): \\(\\dfrac{dy}{dx} = -\\dfrac{2 + 4}{4} = -\\dfrac{3}{2}\\).",
        ],
        answer: "\\(-\\dfrac{3}{2}\\)",
      },
      practiceSet: [
        { prompt: "Find \\(\\dfrac{dy}{dx}\\) if \\(y^2 = 4ax\\).", answer: "\\(\\dfrac{2a}{y}\\)" },
        { prompt: "Find \\(\\dfrac{dy}{dx}\\) at \\((3, 3)\\) if \\(xy = 9\\).", answer: "\\(-1\\)" },
        { prompt: "Find \\(\\dfrac{dy}{dx}\\) if \\(x^2 - y^2 = 16\\).", answer: "\\(\\dfrac{x}{y}\\)" },
      ],
      pyqExampleId: "67ee9840-f370-4f12-b667-48c4b745c701",
      traps: [
        {
          title: "Forgetting dy/dx on a y term",
          body: "\\(\\dfrac{d}{dx}(y^3) = 3y^2\\dfrac{dy}{dx}\\), not \\(3y^2\\). Every y term you differentiate carries the factor.",
        },
        {
          title: "xy needs the product rule",
          body: "\\(\\dfrac{d}{dx}(5xy) = 5\\left(x\\dfrac{dy}{dx} + y\\right)\\). Writing \\(5\\dfrac{dy}{dx}\\) loses a term and the answer.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmcd-inverse-trig",
      name: "Derivatives of inverse trigonometric functions",
      intuition:
        "To differentiate \\(y = \\sin^{-1}x\\), turn it round: \\(x = \\sin y\\). Differentiate that, and the derivative of the inverse function drops out. The same trick works for every inverse ratio.",
      definition:
        "- NCERT Example 24: let \\(y = \\sin^{-1}x\\), so \\(x = \\sin y\\). Then \\(1 = \\cos y\\dfrac{dy}{dx}\\), so \\(\\dfrac{dy}{dx} = \\dfrac{1}{\\cos y} = \\dfrac{1}{\\sqrt{1 - x^2}}\\), since \\(\\cos y > 0\\) for y in \\(\\left(-\\dfrac{\\pi}{2}, \\dfrac{\\pi}{2}\\right)\\).\n" +
        "- The book's table: \\(\\dfrac{d}{dx}\\sin^{-1}x = \\dfrac{1}{\\sqrt{1 - x^2}}\\) and \\(\\dfrac{d}{dx}\\cos^{-1}x = -\\dfrac{1}{\\sqrt{1 - x^2}}\\) for x in \\((-1, 1)\\); \\(\\dfrac{d}{dx}\\tan^{-1}x = \\dfrac{1}{1 + x^2}\\) for every real x.\n" +
        "- The same method (\\(x = \\cot y\\)) gives \\(\\dfrac{d}{dx}\\cot^{-1}x = -\\dfrac{1}{1 + x^2}\\), which Board 2023 needed.\n" +
        "- With a function inside, add the chain rule factor: \\(\\dfrac{d}{dx}\\tan^{-1}(x^2) = \\dfrac{2x}{1 + x^4}\\).\n" +
        "- The answer may be asked in terms of y: for \\(y = \\sin^{-1}x\\), \\(\\dfrac{dy}{dx} = \\sec y\\).",
      formula: {
        label: "Derivative of tan inverse",
        latex: "\\frac{d}{dx}\\tan^{-1}x = \\frac{1}{1 + x^2}",
      },
      authoredExample: {
        prompt: "Show that \\(\\dfrac{d}{dx}\\tan^{-1}x = \\dfrac{1}{1 + x^2}\\).",
        steps: [
          "Let \\(y = \\tan^{-1}x\\), so \\(x = \\tan y\\), with y in \\(\\left(-\\dfrac{\\pi}{2}, \\dfrac{\\pi}{2}\\right)\\).",
          "Differentiate with respect to x: \\(1 = \\sec^2 y\\dfrac{dy}{dx}\\).",
          "\\(\\dfrac{dy}{dx} = \\dfrac{1}{\\sec^2 y} = \\dfrac{1}{1 + \\tan^2 y}\\).",
          "\\(\\therefore \\dfrac{dy}{dx} = \\dfrac{1}{1 + x^2}\\).",
        ],
        answer: "Shown: \\(\\dfrac{d}{dx}\\tan^{-1}x = \\dfrac{1}{1 + x^2}\\)",
      },
      selfCheckExample: {
        prompt: "Differentiate \\(\\cos^{-1}(x^2)\\), \\(0 < x < 1\\).",
        steps: [
          "Chain rule: \\(\\dfrac{d}{dx}\\cos^{-1}(x^2) = -\\dfrac{1}{\\sqrt{1 - (x^2)^2}} \\cdot 2x\\).",
          "\\(= -\\dfrac{2x}{\\sqrt{1 - x^4}}\\).",
        ],
        answer: "\\(-\\dfrac{2x}{\\sqrt{1 - x^4}}\\)",
      },
      practiceSet: [
        { prompt: "Differentiate \\(\\sin^{-1}(2x)\\).", answer: "\\(\\dfrac{2}{\\sqrt{1 - 4x^2}}\\)" },
        { prompt: "Differentiate \\(\\tan^{-1}\\sqrt{x}\\), \\(x > 0\\).", answer: "\\(\\dfrac{1}{2\\sqrt{x}(1 + x)}\\)" },
        {
          prompt: "If \\(y = \\cos^{-1}x\\), write \\(\\dfrac{dy}{dx}\\) in terms of y.",
          answer: "\\(-\\operatorname{cosec} y\\)",
          method: "\\(x = \\cos y\\), so \\(\\dfrac{dx}{dy} = -\\sin y\\)",
        },
      ],
      pyqExampleId: "35925716-5a69-47ac-a573-c490ea36bbb7",
      traps: [
        {
          title: "The minus sign of cos inverse",
          body: "\\(\\dfrac{d}{dx}\\cos^{-1}x = -\\dfrac{1}{\\sqrt{1 - x^2}}\\). The board's MCQs put the same expression without the minus among the options.",
        },
        {
          title: "Square root or no square root",
          body: "Only the sine and cosine inverses carry a square root. \\(\\dfrac{1}{1 - x^2}\\) as the derivative of \\(\\sin^{-1}x\\) is a wrong option the board printed in 2026.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmcd-simplify-first",
      name: "Simplify an inverse trigonometric expression before differentiating",
      intuition:
        "Expressions such as \\(\\sin^{-1}\\dfrac{2x}{1 + x^2}\\) look hard to differentiate, but a substitution turns them into a multiple of an angle. Then the derivative takes one line.",
      definition:
        "- Spot the identity. \\(\\dfrac{2x}{1 + x^2}\\), \\(\\dfrac{1 - x^2}{1 + x^2}\\), \\(\\dfrac{2x}{1 - x^2}\\): put \\(x = \\tan\\theta\\). \\(3x - 4x^3\\), \\(2x\\sqrt{1 - x^2}\\): put \\(x = \\sin\\theta\\). \\(4x^3 - 3x\\), \\(2x^2 - 1\\): put \\(x = \\cos\\theta\\).\n" +
        "- From the given interval of x, find the interval of the new angle, and check it lies in the principal branch before cancelling, exactly as in Inverse Trigonometric Functions.\n" +
        "- Write y as a multiple of \\(\\theta\\) (or \\(\\dfrac{\\pi}{2}\\) minus one), put \\(\\theta\\) back in terms of x, and differentiate.\n" +
        "- The same simplification answers 'differentiate one inverse function with respect to another': simplify both, then divide their derivatives. The sign of the answer depends on the interval, so state it.",
      formula: {
        label: "Three substitutions with x = tan θ",
        latex: "\\frac{2x}{1 + x^2} = \\sin 2\\theta,\\quad \\frac{1 - x^2}{1 + x^2} = \\cos 2\\theta,\\quad \\frac{2x}{1 - x^2} = \\tan 2\\theta",
      },
      authoredExample: {
        prompt: "Find \\(\\dfrac{dy}{dx}\\) if \\(y = \\tan^{-1}\\dfrac{2x}{1 - x^2}\\), \\(-1 < x < 1\\).",
        steps: [
          "Let \\(x = \\tan\\theta\\), so \\(\\theta = \\tan^{-1}x\\); for \\(-1 < x < 1\\), \\(\\theta\\) lies in \\(\\left(-\\dfrac{\\pi}{4}, \\dfrac{\\pi}{4}\\right)\\).",
          "\\(\\dfrac{2x}{1 - x^2} = \\dfrac{2\\tan\\theta}{1 - \\tan^2\\theta} = \\tan 2\\theta\\).",
          "\\(2\\theta\\) lies in \\(\\left(-\\dfrac{\\pi}{2}, \\dfrac{\\pi}{2}\\right)\\), the branch of \\(\\tan^{-1}\\), so \\(y = \\tan^{-1}(\\tan 2\\theta) = 2\\theta = 2\\tan^{-1}x\\).",
          "\\(\\dfrac{dy}{dx} = \\dfrac{2}{1 + x^2}\\).",
        ],
        answer: "\\(\\dfrac{2}{1 + x^2}\\)",
      },
      selfCheckExample: {
        prompt: "Find \\(\\dfrac{dy}{dx}\\) if \\(y = \\tan^{-1}\\dfrac{1 + x}{1 - x}\\), \\(-1 < x < 1\\).",
        steps: [
          "Let \\(x = \\tan\\theta\\), with \\(\\theta\\) in \\(\\left(-\\dfrac{\\pi}{4}, \\dfrac{\\pi}{4}\\right)\\).",
          "\\(\\dfrac{1 + \\tan\\theta}{1 - \\tan\\theta} = \\tan\\left(\\dfrac{\\pi}{4} + \\theta\\right)\\), and \\(\\dfrac{\\pi}{4} + \\theta\\) lies in \\(\\left(0, \\dfrac{\\pi}{2}\\right)\\), inside the branch.",
          "\\(y = \\dfrac{\\pi}{4} + \\tan^{-1}x\\), so \\(\\dfrac{dy}{dx} = \\dfrac{1}{1 + x^2}\\).",
        ],
        answer: "\\(\\dfrac{1}{1 + x^2}\\)",
      },
      practiceSet: [
        {
          prompt: "Find \\(\\dfrac{dy}{dx}\\) if \\(y = \\tan^{-1}\\sqrt{\\dfrac{1 - \\cos x}{1 + \\cos x}}\\), \\(0 < x < \\pi\\).",
          answer: "\\(\\dfrac{1}{2}\\)",
          method: "The root is \\(\\tan\\dfrac{x}{2}\\), so \\(y = \\dfrac{x}{2}\\)",
        },
        {
          prompt: "Find \\(\\dfrac{dy}{dx}\\) if \\(y = \\cos^{-1}(\\sin x)\\), \\(0 < x < \\dfrac{\\pi}{2}\\).",
          answer: "\\(-1\\)",
          method: "\\(\\sin x = \\cos\\left(\\dfrac{\\pi}{2} - x\\right)\\), so \\(y = \\dfrac{\\pi}{2} - x\\)",
        },
        { prompt: "Which substitution simplifies \\(\\sin^{-1}\\left(2x\\sqrt{1 - x^2}\\right)\\)?", answer: "\\(x = \\sin\\theta\\)" },
      ],
      pyqExampleId: "9d023287-7640-4ac8-9ad2-70dfedaee321",
      traps: [
        {
          title: "Cancelling without the interval",
          body: "\\(\\tan^{-1}(\\tan 2\\theta) = 2\\theta\\) only when \\(2\\theta\\) lies in \\(\\left(-\\dfrac{\\pi}{2}, \\dfrac{\\pi}{2}\\right)\\). Write the interval of the angle; that line carries a mark.",
        },
        {
          title: "A sign that depends on the interval",
          body: "When you differentiate one inverse function with respect to another, the same pair can give \\(\\dfrac{1}{2}\\) on one interval and \\(-\\dfrac{1}{2}\\) on another. Work only in the interval the question prints.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmcd-substitution-proofs",
      name: "Implicit relations made simple by a substitution",
      intuition:
        "Some relations, such as \\(\\sqrt{1 - x^2} + \\sqrt{1 - y^2} = a(x - y)\\), are messy to differentiate as they stand. A substitution or a little algebra first turns them into something simple, often 'something is constant'.",
      definition:
        "- **Roots of \\(1 - x^2\\) and \\(1 - y^2\\):** put \\(x = \\sin A\\), \\(y = \\sin B\\). The sum-to-product formulas reduce the relation to \\(\\cot\\dfrac{A - B}{2} = a\\), so \\(A - B\\) is a constant. Then differentiate \\(\\sin^{-1}x - \\sin^{-1}y = \\) constant.\n" +
        "- **x appears only once:** make x the subject, find \\(\\dfrac{dx}{dy}\\), and use \\(\\dfrac{dy}{dx} = \\dfrac{1}{dx/dy}\\).\n" +
        "- **Squaring a relation** can bring in a factor you must reject: \\(x\\sqrt{1 + y} + y\\sqrt{1 + x} = 0\\) squares to \\((x - y)(x + y + xy) = 0\\), and \\(x \\ne y\\) leaves \\(y = -\\dfrac{x}{1 + x}\\) (NCERT Miscellaneous Exercise Q14).\n" +
        "- Write every step of a 'prove that' on its own line and end with the expression asked for.",
      formula: {
        label: "Sum-to-product formulas",
        latex: "\\cos A + \\cos B = 2\\cos\\frac{A + B}{2}\\cos\\frac{A - B}{2},\\quad \\sin A - \\sin B = 2\\cos\\frac{A + B}{2}\\sin\\frac{A - B}{2}",
      },
      authoredExample: {
        prompt: "If \\(\\sin y = x\\sin(a + y)\\), prove that \\(\\dfrac{dy}{dx} = \\dfrac{\\sin^2(a + y)}{\\sin a}\\).",
        steps: [
          "Make x the subject: \\(x = \\dfrac{\\sin y}{\\sin(a + y)}\\).",
          "Differentiate with respect to y by the quotient rule: \\(\\dfrac{dx}{dy} = \\dfrac{\\cos y\\sin(a + y) - \\sin y\\cos(a + y)}{\\sin^2(a + y)}\\).",
          "The numerator is \\(\\sin[(a + y) - y] = \\sin a\\), so \\(\\dfrac{dx}{dy} = \\dfrac{\\sin a}{\\sin^2(a + y)}\\).",
          "\\(\\dfrac{dy}{dx} = \\dfrac{1}{dx/dy} = \\dfrac{\\sin^2(a + y)}{\\sin a}\\).",
        ],
        answer: "Proved: \\(\\dfrac{dy}{dx} = \\dfrac{\\sin^2(a + y)}{\\sin a}\\)",
      },
      selfCheckExample: {
        prompt: "If \\(\\sin^{-1}x + \\sin^{-1}y = \\dfrac{\\pi}{3}\\), find \\(\\dfrac{dy}{dx}\\).",
        steps: [
          "Differentiate both sides: \\(\\dfrac{1}{\\sqrt{1 - x^2}} + \\dfrac{1}{\\sqrt{1 - y^2}}\\dfrac{dy}{dx} = 0\\).",
          "\\(\\dfrac{dy}{dx} = -\\dfrac{\\sqrt{1 - y^2}}{\\sqrt{1 - x^2}}\\).",
        ],
        answer: "\\(-\\sqrt{\\dfrac{1 - y^2}{1 - x^2}}\\)",
      },
      practiceSet: [
        {
          prompt: "If \\(x = \\tan(y + 1)\\), find \\(\\dfrac{dy}{dx}\\) in terms of x.",
          answer: "\\(\\dfrac{1}{1 + x^2}\\)",
          method: "\\(\\dfrac{dx}{dy} = \\sec^2(y + 1) = 1 + x^2\\)",
        },
        {
          prompt: "Squaring \\(x\\sqrt{1 + y} = -y\\sqrt{1 + x}\\) gives \\((x - y)(x + y + xy) = 0\\). If \\(x \\ne y\\), write y in terms of x.",
          answer: "\\(y = -\\dfrac{x}{1 + x}\\)",
        },
        { prompt: "Which substitution removes the roots in \\(\\sqrt{1 - x^2} + \\sqrt{1 - y^2}\\)?", answer: "\\(x = \\sin A\\), \\(y = \\sin B\\)" },
      ],
      pyqExampleId: "dfeba243-131e-4faa-a0d4-1e70176f4f19",
      traps: [
        {
          title: "Cancelling a factor that may be zero",
          body: "When you cancel \\(2\\cos\\dfrac{A + B}{2}\\) from both sides, you are assuming it is not zero. Say so in a line.",
        },
        {
          title: "Keeping the rejected factor",
          body: "After squaring, the factor \\(x - y\\) gives \\(y = x\\), which the question rules out. State why you reject it before you differentiate.",
        },
      ],
    },
  ],
};
