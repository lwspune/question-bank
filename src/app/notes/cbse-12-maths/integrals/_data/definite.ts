import type { SubtopicNote } from "@/app/notes/_types";

export const CB_MA_IN_DEFINITE_NOTE: SubtopicNote = {
  subtopicName: "Definite Integrals and the Fundamental Theorem",
  title: "Definite Integrals and the Fundamental Theorem",
  oneLineDefinition:
    "A definite integral is a number: the value of an antiderivative at the upper limit minus its value at the lower limit.",
  whyItMatters:
    "54 questions, twenty-five of them from board papers from 2022 to 2026. The board asks one-mark MCQs that need only the second fundamental theorem (2023, 2024 and 2026), MCQs and a three-mark question that give the value of an integral and ask for a limit or a constant (2023 to 2026), and a modulus integral that must be split where the sign changes, every year from 2022 to 2026. The textbook adds Example 25, Exercise 7.8, Miscellaneous Questions 28 and 31 and Miscellaneous Example 41.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbmin-def-ftc",
      name: "The second fundamental theorem: F(b) minus F(a)",
      intuition:
        "An indefinite integral is a family of functions; a definite integral is one number. Find any antiderivative F, work out F at the upper limit, and subtract F at the lower limit. The constant C cancels in the subtraction, so leave it out.",
      definition:
        "- **Area function:** \\(A(x) = \\int_a^x f(x)\\,dx\\) is the area under \\(y = f(x)\\) from a to x.\n" +
        "- **First fundamental theorem:** if f is continuous on \\([a, b]\\), then \\(A'(x) = f(x)\\) for every x in \\([a, b]\\).\n" +
        "- **Second fundamental theorem:** if F is an antiderivative of f on \\([a, b]\\), then \\(\\int_a^b f(x)\\,dx = \\big[F(x)\\big]_a^b = F(b) - F(a)\\).\n" +
        "- **Steps:** find \\(\\int f(x)\\,dx = F(x)\\) with no constant, write \\(\\big[F(x)\\big]_a^b\\), then work out \\(F(b) - F(a)\\).\n" +
        "- Simplify the integrand first: rationalise a difference of square roots, split a fraction, or use an identity such as \\(\\tan^2 x = \\sec^2 x - 1\\).\n" +
        "- f must be defined and continuous on \\([a, b]\\). NCERT's warning: \\(\\int_{-2}^{3} x(x^2 - 1)^{1/2}\\,dx\\) makes no sense, because the integrand is not defined for \\(-1 < x < 1\\).",
      formula: {
        label: "Second fundamental theorem",
        latex: "\\int_a^b f(x)\\,dx = \\big[F(x)\\big]_a^b = F(b) - F(a)",
        symbols: [
          { symbol: "\\(F\\)", meaning: "any antiderivative of f, that is F′(x) = f(x)" },
          { symbol: "\\(a, b\\)", meaning: "the lower and upper limits" },
        ],
      },
      authoredExample: {
        prompt: "Evaluate \\(\\int_{0}^{\\pi/3} (\\sec^2 x + 2\\sin x)\\,dx\\).",
        steps: [
          "Let \\(I = \\int_{0}^{\\pi/3} (\\sec^2 x + 2\\sin x)\\,dx\\).",
          "\\(\\int (\\sec^2 x + 2\\sin x)\\,dx = \\tan x - 2\\cos x = F(x)\\) (no constant is needed).",
          "By the second fundamental theorem, \\(I = F\\left(\\dfrac{\\pi}{3}\\right) - F(0)\\).",
          "\\(F\\left(\\dfrac{\\pi}{3}\\right) = \\sqrt{3} - 2 \\times \\dfrac{1}{2} = \\sqrt{3} - 1\\).",
          "\\(F(0) = 0 - 2 \\times 1 = -2\\).",
          "\\(I = (\\sqrt{3} - 1) - (-2) = \\sqrt{3} + 1\\).",
        ],
        answer: "\\(\\sqrt{3} + 1\\)",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\int_{1}^{2} \\left(3x^2 - \\dfrac{1}{x}\\right)dx\\).",
        steps: [
          "\\(F(x) = x^3 - \\log x\\).",
          "\\(F(2) - F(1) = (8 - \\log 2) - (1 - 0)\\).",
        ],
        answer: "\\(7 - \\log 2\\)",
      },
      practiceSet: [
        {
          prompt: "Evaluate \\(\\int_{1}^{e} \\dfrac{x^2 + 1}{x}\\,dx\\).",
          answer: "\\(\\left[\\dfrac{x^2}{2} + \\log x\\right]_1^e = \\left(\\dfrac{e^2}{2} + 1\\right) - \\dfrac{1}{2} = \\dfrac{e^2 + 1}{2}\\)",
        },
        {
          prompt: "Evaluate \\(\\int_{0}^{\\log 2} e^{2x}\\,dx\\).",
          answer: "\\(\\left[\\dfrac{e^{2x}}{2}\\right]_0^{\\log 2} = \\dfrac{4 - 1}{2} = \\dfrac{3}{2}\\)",
        },
        {
          prompt: "Evaluate \\(\\int_{0}^{\\pi/4} \\tan^2 x\\,dx\\).",
          answer: "\\(\\int_0^{\\pi/4} (\\sec^2 x - 1)\\,dx = \\big[\\tan x - x\\big]_0^{\\pi/4} = 1 - \\dfrac{\\pi}{4}\\)",
        },
      ],
      pyqExampleId: "ef826878-40f8-4a34-8c1a-79956dac4b1f",
      traps: [
        {
          title: "Subtracting the wrong way round",
          body: "The value is \\(F(\\text{upper}) - F(\\text{lower})\\). Lower minus upper gives the right number with the wrong sign, and an MCQ always offers that wrong sign as an option.",
        },
        {
          title: "Dropping the modulus in the log",
          body: "\\(\\int \\dfrac{dx}{x} = \\log|x|\\). On an interval of negative numbers the modulus matters: \\(\\int_{-6}^{-3} \\dfrac{dx}{x} = \\log 3 - \\log 6 = -\\log 2\\). A log of a negative number is not defined.",
        },
        {
          title: "Losing the factor from the inner function",
          body: "\\(\\int e^{3x}\\,dx = \\dfrac{e^{3x}}{3}\\) and \\(\\int \\sin 5x\\,dx = -\\dfrac{\\cos 5x}{5}\\). Without the \\(\\dfrac{1}{3}\\) or \\(\\dfrac{1}{5}\\) the value is wrong, even though every later step is right.",
        },
        {
          title: "Integrating across a point where f is not defined",
          body: "Check that the integrand is defined on the whole interval before you put in the limits. \\(\\dfrac{1}{x}\\) on an interval that contains 0 cannot be done this way.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmin-def-unknown",
      name: "When the value is given: find the limit or the constant",
      intuition:
        "Some questions give the value of a definite integral and ask for a limit a or a constant k. Evaluate the integral with the letter left in it, set it equal to the given value, and solve the equation. Then keep only the roots that fit the question.",
      definition:
        "- Evaluate with the unknown left as a letter: \\(\\int_0^a 2x\\,dx = \\big[x^2\\big]_0^a = a^2\\).\n" +
        "- Set the result equal to the given value and solve the equation in a (or k).\n" +
        "- An inverse function gives the limit: \\(\\tan^{-1}\\dfrac{a}{3} = \\dfrac{\\pi}{4}\\) means \\(\\dfrac{a}{3} = \\tan\\dfrac{\\pi}{4} = 1\\).\n" +
        "- Two conditions on \\(\\int_a^b\\) give two equations in a and b. If \\(b = a\\), every integral from a to b is 0, so \\(b = a\\) is ruled out when an integral has a non-zero value.\n" +
        "- An inequality: evaluate the integral first, then solve the quadratic inequality. \\((a - p)(a - q) \\le 0\\) holds for a between p and q.\n" +
        "- Reject a root that does not fit, such as a negative value when the question says \\(a > 0\\).",
      formula: {
        label: "Equation for an unknown upper limit",
        latex: "\\int_0^a f(x)\\,dx = F(a) - F(0) = \\text{the given value}",
      },
      authoredExample: {
        prompt: "If \\(\\int_0^{a} (2x + 1)\\,dx = 6\\) and \\(a > 0\\), find a.",
        steps: [
          "\\(\\int_0^a (2x + 1)\\,dx = \\big[x^2 + x\\big]_0^a = a^2 + a\\).",
          "So \\(a^2 + a = 6\\), that is \\(a^2 + a - 6 = 0\\).",
          "\\((a + 3)(a - 2) = 0\\), so \\(a = -3\\) or \\(a = 2\\).",
          "As \\(a > 0\\), reject \\(a = -3\\).",
        ],
        answer: "\\(a = 2\\)",
      },
      selfCheckExample: {
        prompt: "Find k if \\(\\int_0^{2} (3x^2 + kx - 1)\\,dx = 10\\).",
        steps: [
          "\\(\\left[x^3 + \\dfrac{kx^2}{2} - x\\right]_0^2 = 8 + 2k - 2 = 6 + 2k\\).",
          "\\(6 + 2k = 10\\).",
        ],
        answer: "\\(k = 2\\)",
      },
      practiceSet: [
        {
          prompt: "Find a, if \\(\\int_0^{a} \\dfrac{dx}{9 + x^2} = \\dfrac{\\pi}{12}\\).",
          answer: "\\(\\dfrac{1}{3}\\tan^{-1}\\dfrac{a}{3} = \\dfrac{\\pi}{12}\\), so \\(\\tan^{-1}\\dfrac{a}{3} = \\dfrac{\\pi}{4}\\) and \\(a = 3\\)",
        },
        {
          prompt: "Find \\(a > 1\\), if \\(\\int_1^{a} \\dfrac{dx}{x} = 2\\).",
          answer: "\\(\\log a = 2\\), so \\(a = e^2\\)",
        },
        {
          prompt: "For which values of a is \\(\\int_0^{a} 2x\\,dx \\le a + 2\\)?",
          answer: "\\(a^2 \\le a + 2\\), so \\((a - 2)(a + 1) \\le 0\\): \\(-1 \\le a \\le 2\\)",
        },
      ],
      pyqExampleId: "083400c6-ef89-4594-becb-86a638080785",
      traps: [
        {
          title: "Keeping both roots",
          body: "\\(a^2 = 16\\) gives \\(a = 4\\) or \\(a = -4\\). Read the condition in the question (or the options) and keep only the root that fits it.",
        },
        {
          title: "Losing the factor in the inverse tangent",
          body: "\\(\\int \\dfrac{dx}{25 + x^2} = \\dfrac{1}{5}\\tan^{-1}\\dfrac{x}{5}\\). Without the \\(\\dfrac{1}{5}\\) the angle comes out five times too big and the limit is wrong.",
        },
        {
          title: "Taking b equal to a",
          body: "\\(b^4 = a^4\\) allows \\(b = a\\) or \\(b = -a\\). When an integral from a to b is not zero, b cannot equal a: state this to rule it out.",
        },
        {
          title: "Solving the inequality outside the roots",
          body: "\\((a - p)(a - q) \\le 0\\) with \\(p < q\\) holds BETWEEN p and q, end points included. Outside the roots the product is positive.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmin-def-forms",
      name: "Standard forms and partial fractions with limits",
      intuition:
        "Many definite integrals are a standard form in disguise: an inverse sine, an inverse tangent or a log. Find the antiderivative from the table first, then put in the limits. A rational function is split by partial fractions before the limits come in.",
      definition:
        "- \\(\\int \\dfrac{dx}{\\sqrt{a^2 - x^2}} = \\sin^{-1}\\dfrac{x}{a}\\), \\(\\int \\dfrac{dx}{a^2 + x^2} = \\dfrac{1}{a}\\tan^{-1}\\dfrac{x}{a}\\), \\(\\int \\dfrac{dx}{x^2 - a^2} = \\dfrac{1}{2a}\\log\\left|\\dfrac{x - a}{x + a}\\right|\\).\n" +
        "- \\(\\int \\sqrt{a^2 - x^2}\\,dx = \\dfrac{x}{2}\\sqrt{a^2 - x^2} + \\dfrac{a^2}{2}\\sin^{-1}\\dfrac{x}{a}\\).\n" +
        "- Values you need: \\(\\sin^{-1}1 = \\dfrac{\\pi}{2}\\), \\(\\sin^{-1}\\dfrac{1}{2} = \\dfrac{\\pi}{6}\\), \\(\\tan^{-1}1 = \\dfrac{\\pi}{4}\\), \\(\\tan^{-1}\\sqrt{3} = \\dfrac{\\pi}{3}\\), \\(\\sin^{-1}0 = \\tan^{-1}0 = 0\\).\n" +
        "- A linear numerator over a quadratic: split it so that one part is (derivative of the denominator) over the denominator, which gives a log.\n" +
        "- A coefficient on \\(x^2\\): take it out first, as in \\(1 + 16x^2 = 16\\left(x^2 + \\dfrac{1}{16}\\right)\\).\n" +
        "- Partial fractions work as for indefinite integrals; collect the logs into one log at the end.",
      formula: {
        label: "Inverse tangent form with limits",
        latex: "\\int_0^{b} \\dfrac{dx}{a^2 + x^2} = \\dfrac{1}{a}\\tan^{-1}\\dfrac{b}{a}",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\int_0^{\\sqrt{3}} \\dfrac{2x + 1}{x^2 + 1}\\,dx\\).",
        steps: [
          "Split the numerator: \\(\\dfrac{2x + 1}{x^2 + 1} = \\dfrac{2x}{x^2 + 1} + \\dfrac{1}{x^2 + 1}\\).",
          "\\(\\int \\dfrac{2x}{x^2 + 1}\\,dx = \\log(x^2 + 1)\\), as the numerator is the derivative of the denominator.",
          "\\(\\int \\dfrac{dx}{x^2 + 1} = \\tan^{-1}x\\).",
          "So \\(I = \\left[\\log(x^2 + 1) + \\tan^{-1}x\\right]_0^{\\sqrt{3}}\\).",
          "\\(I = (\\log 4 + \\tan^{-1}\\sqrt{3}) - (\\log 1 + \\tan^{-1}0)\\).",
          "\\(I = \\log 4 + \\dfrac{\\pi}{3}\\).",
        ],
        answer: "\\(\\log 4 + \\dfrac{\\pi}{3}\\), that is \\(2\\log 2 + \\dfrac{\\pi}{3}\\)",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\int_3^{5} \\dfrac{dx}{x^2 - 1}\\).",
        steps: [
          "\\(\\dfrac{1}{2}\\left[\\log\\dfrac{x - 1}{x + 1}\\right]_3^5 = \\dfrac{1}{2}\\left(\\log\\dfrac{4}{6} - \\log\\dfrac{2}{4}\\right)\\).",
        ],
        answer: "\\(\\dfrac{1}{2}\\log\\dfrac{4}{3}\\)",
      },
      practiceSet: [
        {
          prompt: "Evaluate \\(\\int_0^{1/3} \\dfrac{dx}{1 + 9x^2}\\).",
          answer: "\\(\\dfrac{1}{3}\\big[\\tan^{-1}3x\\big]_0^{1/3} = \\dfrac{1}{3} \\times \\dfrac{\\pi}{4} = \\dfrac{\\pi}{12}\\)",
        },
        {
          prompt: "Evaluate \\(\\int_1^{2} \\dfrac{dx}{x(x + 1)}\\).",
          answer: "\\(\\dfrac{1}{x(x + 1)} = \\dfrac{1}{x} - \\dfrac{1}{x + 1}\\): \\(\\left[\\log\\dfrac{x}{x + 1}\\right]_1^2 = \\log\\dfrac{2}{3} - \\log\\dfrac{1}{2} = \\log\\dfrac{4}{3}\\)",
        },
        {
          prompt: "Evaluate \\(\\int_0^{4} \\sqrt{16 - x^2}\\,dx\\).",
          answer: "\\(\\left[\\dfrac{x}{2}\\sqrt{16 - x^2} + 8\\sin^{-1}\\dfrac{x}{4}\\right]_0^4 = 8 \\times \\dfrac{\\pi}{2} = 4\\pi\\)",
        },
      ],
      pyqExampleId: "81748d66-c945-49ae-987c-d2092c9895a5",
      traps: [
        {
          title: "Missing the 1/a",
          body: "\\(\\int \\dfrac{dx}{4 + x^2} = \\dfrac{1}{2}\\tan^{-1}\\dfrac{x}{2}\\), not \\(\\tan^{-1}\\dfrac{x}{2}\\). The inverse sine form has no such factor: \\(\\int \\dfrac{dx}{\\sqrt{4 - x^2}} = \\sin^{-1}\\dfrac{x}{2}\\).",
        },
        {
          title: "Mixing up the two log forms",
          body: "\\(\\int \\dfrac{dx}{x^2 - a^2} = \\dfrac{1}{2a}\\log\\left|\\dfrac{x - a}{x + a}\\right|\\), but \\(\\int \\dfrac{dx}{a^2 - x^2} = \\dfrac{1}{2a}\\log\\left|\\dfrac{a + x}{a - x}\\right|\\). Using the wrong one flips the sign of the answer.",
        },
        {
          title: "Wrong exact angle",
          body: "\\(\\tan^{-1}\\sqrt{3} = \\dfrac{\\pi}{3}\\) and \\(\\tan^{-1}\\dfrac{1}{\\sqrt{3}} = \\dfrac{\\pi}{6}\\). Mixing these up is the commonest wrong option in the board MCQs.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmin-def-modulus",
      name: "Integrals with a modulus: split where the sign changes",
      intuition:
        "\\(|g(x)|\\) is g(x) where g is positive and minus g(x) where g is negative. Find where g(x) = 0 inside the interval, cut the interval there, remove the modulus on each piece and add the pieces.",
      definition:
        "- Solve \\(g(x) = 0\\) and keep only the roots inside \\((a, b)\\).\n" +
        "- On each piece, test one point to find the sign of g.\n" +
        "- Write \\(|g(x)| = g(x)\\) where \\(g \\ge 0\\) and \\(|g(x)| = -g(x)\\) where \\(g \\le 0\\), then integrate piece by piece.\n" +
        "- A sum of moduli: split each term at its own point and add the results.\n" +
        "- If the root is an end point, no split is needed: on \\([0, 5]\\), \\(|x - 5| = 5 - x\\) throughout.\n" +
        "- \\(\\dfrac{|g(x)|}{g(x)}\\) is 1 where \\(g > 0\\) and \\(-1\\) where \\(g < 0\\).\n" +
        "- With x in the modulus inside sin or cos: \\(\\sin|x| = -\\sin x\\) and \\(\\cos|x| = \\cos x\\) for \\(x < 0\\).\n" +
        "- An integral of a modulus is never negative. A negative answer means a sign slip.",
      formula: {
        label: "Splitting at the sign change c",
        latex: "\\int_a^b |g(x)|\\,dx = \\int_a^c g(x)\\,dx - \\int_c^b g(x)\\,dx \\quad (g \\ge 0 \\text{ on } [a, c],\\ g \\le 0 \\text{ on } [c, b])",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\int_0^{6} |x^2 - 6x + 8|\\,dx\\).",
        steps: [
          "Let \\(I = \\int_0^6 |x^2 - 6x + 8|\\,dx\\).",
          "\\(x^2 - 6x + 8 = (x - 2)(x - 4)\\) is zero at \\(x = 2\\) and \\(x = 4\\), both inside \\([0, 6]\\).",
          "It is \\(\\ge 0\\) on \\([0, 2]\\), \\(\\le 0\\) on \\([2, 4]\\) and \\(\\ge 0\\) on \\([4, 6]\\).",
          "\\(I = \\int_0^2 (x^2 - 6x + 8)\\,dx - \\int_2^4 (x^2 - 6x + 8)\\,dx + \\int_4^6 (x^2 - 6x + 8)\\,dx\\).",
          "With \\(F(x) = \\dfrac{x^3}{3} - 3x^2 + 8x\\): \\(F(0) = 0\\), \\(F(2) = \\dfrac{20}{3}\\), \\(F(4) = \\dfrac{16}{3}\\), \\(F(6) = 12\\).",
          "\\(I = \\left(\\dfrac{20}{3} - 0\\right) - \\left(\\dfrac{16}{3} - \\dfrac{20}{3}\\right) + \\left(12 - \\dfrac{16}{3}\\right) = \\dfrac{20}{3} + \\dfrac{4}{3} + \\dfrac{20}{3}\\).",
          "\\(I = \\dfrac{44}{3}\\).",
        ],
        answer: "\\(\\dfrac{44}{3}\\)",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\int_{-6}^{0} |x + 4|\\,dx\\).",
        steps: [
          "Split at \\(x = -4\\): \\(\\int_{-6}^{-4} -(x + 4)\\,dx + \\int_{-4}^{0} (x + 4)\\,dx = 2 + 8\\).",
        ],
        answer: "10",
      },
      practiceSet: [
        {
          prompt: "Evaluate \\(\\int_0^{\\pi} |\\cos x|\\,dx\\).",
          answer: "\\(\\int_0^{\\pi/2} \\cos x\\,dx - \\int_{\\pi/2}^{\\pi} \\cos x\\,dx = 1 + 1 = 2\\)",
        },
        {
          prompt: "Evaluate \\(\\int_{-2}^{4} \\dfrac{|x - 5|}{x - 5}\\,dx\\).",
          answer: "\\(x - 5 < 0\\) on the whole interval, so the integrand is \\(-1\\) and the value is \\(-6\\)",
        },
        {
          prompt: "Evaluate \\(\\int_0^{5} |2x - 7|\\,dx\\).",
          answer: "Split at \\(\\dfrac{7}{2}\\): \\(\\big[7x - x^2\\big]_0^{7/2} + \\big[x^2 - 7x\\big]_{7/2}^{5} = \\dfrac{49}{4} + \\dfrac{9}{4} = \\dfrac{29}{2}\\)",
        },
      ],
      pyqExampleId: "4084b519-1f29-4854-9052-b8a4c23b5579",
      traps: [
        {
          title: "Splitting at a point outside the interval",
          body: "Only roots strictly inside the interval matter. On \\([2, 6]\\), \\(|x + 1| = x + 1\\) throughout, because \\(-1\\) is not in the interval.",
        },
        {
          title: "Wrong sign on the middle piece",
          body: "Where g is negative, \\(|g| = -g\\). Write the minus in front of that piece's integral before you integrate, and carry it to the end.",
        },
        {
          title: "Treating sin|x| like cos|x|",
          body: "For \\(x < 0\\), \\(\\sin|x| = -\\sin x\\) but \\(\\cos|x| = \\cos x\\). Split at 0 and write the two pieces separately.",
        },
        {
          title: "A negative answer",
          body: "The integral of \\(|g(x)|\\) is never negative. If yours is, a piece was integrated without its minus sign.",
        },
      ],
    },
  ],
};
