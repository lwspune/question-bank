import type { SubtopicNote } from "@/app/notes/_types";

export const CB_MA_IN_PARTIAL_NOTE: SubtopicNote = {
  subtopicName: "Integration by Partial Fractions",
  title: "Integration by Partial Fractions",
  oneLineDefinition:
    "A proper rational function whose denominator factorises is split into a sum of simpler fractions, one for each factor, and each of those integrates to a log, a power or an inverse tangent.",
  whyItMatters:
    "63 questions, twenty-seven of them from board papers: three in 2022, five in 2023, seven in 2024, ten in 2025 and two in 2026. This is the board's favourite three-mark integral. It sets distinct linear factors (2022, 2025), a repeated linear factor (2023, 2024 twice, 2025 twice) and a linear factor with a quadratic one (2023 twice, 2024, 2025 three times). Ten of the board items have only x squared in them, such as x squared over (x² + 4)(x² + 9), asked in 2023 and again in 2024. Several start with a substitution in the root of x, log x, sin x or cos x and end in partial fractions (2023 to 2026). The textbook adds Examples 11 to 16, Exercise 7.5 and Miscellaneous questions.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbmin-pf-linear",
      name: "Distinct linear factors",
      intuition:
        "If the denominator is a product of different linear factors, the fraction is a sum of constants over those factors. Multiply up, then put each root of the denominator in turn: every term but one vanishes, and each constant drops out in one line.",
      definition:
        "- **Proper first:** if the degree of the numerator is not less than that of the denominator, divide to get a polynomial plus a proper fraction.\n" +
        "- \\(\\dfrac{px + q}{(x - a)(x - b)} = \\dfrac{A}{x - a} + \\dfrac{B}{x - b}\\), \\(a \\ne b\\).\n" +
        "- \\(\\dfrac{px^2 + qx + r}{(x - a)(x - b)(x - c)} = \\dfrac{A}{x - a} + \\dfrac{B}{x - b} + \\dfrac{C}{x - c}\\).\n" +
        "- Find each constant by putting \\(x = a\\), \\(x = b\\), \\(x = c\\) in the multiplied-up identity.\n" +
        "- \\(\\int \\dfrac{A}{x - a}\\,dx = A\\log|x - a|\\).\n" +
        "- In \\(e^x\\), \\(\\log x\\), \\(\\sin x\\) or \\(\\cos x\\), substitute \\(t\\) first, then split the fraction in \\(t\\).",
      formula: {
        label: "Distinct linear factors",
        latex: "\\dfrac{px + q}{(x - a)(x - b)} = \\dfrac{A}{x - a} + \\dfrac{B}{x - b}",
      },
      authoredExample: {
        prompt: "Find \\(\\int \\dfrac{x + 7}{(x - 1)(x + 3)}\\,dx\\).",
        steps: [
          "Let \\(\\dfrac{x + 7}{(x - 1)(x + 3)} = \\dfrac{A}{x - 1} + \\dfrac{B}{x + 3}\\), so \\(x + 7 = A(x + 3) + B(x - 1)\\).",
          "Put \\(x = 1\\): \\(8 = 4A\\), so \\(A = 2\\).",
          "Put \\(x = -3\\): \\(4 = -4B\\), so \\(B = -1\\).",
          "\\(\\int \\left(\\dfrac{2}{x - 1} - \\dfrac{1}{x + 3}\\right)dx = 2\\log|x - 1| - \\log|x + 3| + C\\).",
        ],
        answer: "\\(2\\log|x - 1| - \\log|x + 3| + C\\)",
      },
      selfCheckExample: {
        prompt: "Find \\(\\int \\dfrac{x^2}{(x - 1)(x - 2)}\\,dx\\).",
        steps: [
          "The fraction is improper. \\(x^2 = (x^2 - 3x + 2) + (3x - 2)\\), so it equals \\(1 + \\dfrac{3x - 2}{(x - 1)(x - 2)}\\).",
          "\\(3x - 2 = A(x - 2) + B(x - 1)\\). Put \\(x = 1\\): \\(A = -1\\). Put \\(x = 2\\): \\(B = 4\\).",
          "\\(\\int \\left(1 - \\dfrac{1}{x - 1} + \\dfrac{4}{x - 2}\\right)dx = x - \\log|x - 1| + 4\\log|x - 2| + C\\).",
        ],
        answer: "\\(x - \\log|x - 1| + 4\\log|x - 2| + C\\)",
      },
      practiceSet: [
        { prompt: "Find \\(\\int \\dfrac{dx}{x(x + 1)}\\).", answer: "\\(\\log\\left|\\dfrac{x}{x + 1}\\right| + C\\)" },
        { prompt: "Find \\(\\int \\dfrac{2x + 1}{(x + 2)(x - 3)}\\,dx\\).", answer: "\\(\\dfrac{3}{5}\\log|x + 2| + \\dfrac{7}{5}\\log|x - 3| + C\\)" },
        { prompt: "Find \\(\\int \\dfrac{e^x}{(e^x + 1)(e^x + 3)}\\,dx\\).", answer: "\\(\\dfrac{1}{2}\\log\\left(\\dfrac{e^x + 1}{e^x + 3}\\right) + C\\)", method: "Put \\(e^x = t\\)." },
      ],
      pyqExampleId: "6154b84f-aa1d-42ef-a0a4-b45c2f88209d",
      traps: [
        {
          title: "Splitting an improper fraction",
          body: "\\(\\dfrac{x^2}{(x - 1)(x - 2)}\\) has numerator and denominator of the same degree. Divide first; splitting it straight away as \\(\\dfrac{A}{x - 1} + \\dfrac{B}{x - 2}\\) can never be right.",
        },
        {
          title: "Dropping the coefficient of x in a log",
          body: "\\(\\int \\dfrac{dx}{2x + 3} = \\dfrac{1}{2}\\log|2x + 3|\\). When a factor is \\(ax + b\\) with \\(a \\ne 1\\), divide by \\(a\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmin-pf-repeated",
      name: "A repeated linear factor",
      intuition:
        "A squared factor \\((x - a)^2\\) needs two fractions, one over \\((x - a)\\) and one over \\((x - a)^2\\). Putting \\(x = a\\) finds the second constant and putting the other root finds the third; one constant is left, and comparing the coefficients of \\(x^2\\) gives it.",
      definition:
        "- \\(\\dfrac{px + q}{(x - a)^2} = \\dfrac{A}{x - a} + \\dfrac{B}{(x - a)^2}\\).\n" +
        "- \\(\\dfrac{px^2 + qx + r}{(x - a)^2(x - b)} = \\dfrac{A}{x - a} + \\dfrac{B}{(x - a)^2} + \\dfrac{C}{x - b}\\).\n" +
        "- Multiply up: \\(px^2 + qx + r = A(x - a)(x - b) + B(x - b) + C(x - a)^2\\).\n" +
        "- \\(x = a\\) gives \\(B\\); \\(x = b\\) gives \\(C\\); the coefficient of \\(x^2\\) gives \\(A + C = p\\).\n" +
        "- \\(\\int \\dfrac{B}{(x - a)^2}\\,dx = -\\dfrac{B}{x - a}\\): a power, **not** a log.",
      formula: {
        label: "Repeated linear factor",
        latex: "\\dfrac{px^2 + qx + r}{(x - a)^2(x - b)} = \\dfrac{A}{x - a} + \\dfrac{B}{(x - a)^2} + \\dfrac{C}{x - b}",
      },
      authoredExample: {
        prompt: "Find \\(\\int \\dfrac{x + 4}{x^2(x + 2)}\\,dx\\).",
        steps: [
          "Let \\(\\dfrac{x + 4}{x^2(x + 2)} = \\dfrac{A}{x} + \\dfrac{B}{x^2} + \\dfrac{C}{x + 2}\\), so \\(x + 4 = Ax(x + 2) + B(x + 2) + Cx^2\\).",
          "Put \\(x = 0\\): \\(4 = 2B\\), so \\(B = 2\\).",
          "Put \\(x = -2\\): \\(2 = 4C\\), so \\(C = \\dfrac{1}{2}\\).",
          "Coefficient of \\(x^2\\): \\(0 = A + C\\), so \\(A = -\\dfrac{1}{2}\\).",
          "\\(\\int \\left(-\\dfrac{1}{2x} + \\dfrac{2}{x^2} + \\dfrac{1}{2(x + 2)}\\right)dx = -\\dfrac{1}{2}\\log|x| - \\dfrac{2}{x} + \\dfrac{1}{2}\\log|x + 2| + C_1\\).",
        ],
        answer: "\\(\\dfrac{1}{2}\\log\\left|\\dfrac{x + 2}{x}\\right| - \\dfrac{2}{x} + C_1\\)",
      },
      selfCheckExample: {
        prompt: "Find \\(\\int \\dfrac{2x + 3}{(x + 1)^2}\\,dx\\).",
        steps: [
          "\\(2x + 3 = 2(x + 1) + 1\\), so the fraction is \\(\\dfrac{2}{x + 1} + \\dfrac{1}{(x + 1)^2}\\).",
          "\\(\\int \\dfrac{2}{x + 1}\\,dx = 2\\log|x + 1|\\).",
          "\\(\\int (x + 1)^{-2}\\,dx = -\\dfrac{1}{x + 1}\\).",
          "\\(\\therefore\\) the integral is \\(2\\log|x + 1| - \\dfrac{1}{x + 1} + C\\).",
        ],
        answer: "\\(2\\log|x + 1| - \\dfrac{1}{x + 1} + C\\)",
      },
      practiceSet: [
        { prompt: "Find \\(\\int \\dfrac{x}{(x + 1)^2}\\,dx\\).", answer: "\\(\\log|x + 1| + \\dfrac{1}{x + 1} + C\\)" },
        { prompt: "Find \\(\\int \\dfrac{dx}{(x - 1)^2(x + 2)}\\).", answer: "\\(-\\dfrac{1}{9}\\log|x - 1| - \\dfrac{1}{3(x - 1)} + \\dfrac{1}{9}\\log|x + 2| + C\\)" },
        { prompt: "Find \\(\\int \\dfrac{x^2 + 1}{x^2(x - 1)}\\,dx\\).", answer: "\\(-\\log|x| + \\dfrac{1}{x} + 2\\log|x - 1| + C\\)" },
      ],
      pyqExampleId: "bc6f977d-5a7a-4926-a46d-5857b8fca894",
      traps: [
        {
          title: "Only one fraction for a squared factor",
          body: "\\((x - a)^2\\) needs both \\(\\dfrac{A}{x - a}\\) and \\(\\dfrac{B}{(x - a)^2}\\). Writing just \\(\\dfrac{B}{(x - a)^2}\\) leaves too few constants, and the identity cannot hold.",
        },
        {
          title: "A log for the squared term",
          body: "\\(\\int \\dfrac{dx}{(x - a)^2} = -\\dfrac{1}{x - a}\\), not \\(\\log(x - a)^2\\). Only a first power below gives a log.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmin-pf-quadratic",
      name: "A linear factor with a quadratic factor",
      intuition:
        "A quadratic that cannot be factorised, such as \\(x^2 + 4\\), gets a linear numerator \\(Bx + C\\) over it. Its integral splits again: the \\(Bx\\) part is a log, and the constant part is an inverse tangent.",
      definition:
        "- \\(\\dfrac{px^2 + qx + r}{(x - a)(x^2 + bx + c)} = \\dfrac{A}{x - a} + \\dfrac{Bx + C}{x^2 + bx + c}\\), where \\(x^2 + bx + c\\) has no real factors.\n" +
        "- Put \\(x = a\\) to get \\(A\\); compare the coefficients of \\(x^2\\) and the constant terms for \\(B\\) and \\(C\\).\n" +
        "- \\(\\int \\dfrac{Bx}{x^2 + k^2}\\,dx = \\dfrac{B}{2}\\log(x^2 + k^2)\\) and \\(\\int \\dfrac{C}{x^2 + k^2}\\,dx = \\dfrac{C}{k}\\tan^{-1}\\dfrac{x}{k}\\).\n" +
        "- \\(x^2 + k^2\\) is always positive, so its log needs no modulus.",
      formula: {
        label: "Quadratic factor",
        latex: "\\dfrac{px^2 + qx + r}{(x - a)(x^2 + bx + c)} = \\dfrac{A}{x - a} + \\dfrac{Bx + C}{x^2 + bx + c}",
      },
      authoredExample: {
        prompt: "Find \\(\\int \\dfrac{x + 1}{x(x^2 + 1)}\\,dx\\).",
        steps: [
          "Let \\(\\dfrac{x + 1}{x(x^2 + 1)} = \\dfrac{A}{x} + \\dfrac{Bx + C}{x^2 + 1}\\), so \\(x + 1 = A(x^2 + 1) + (Bx + C)x\\).",
          "Put \\(x = 0\\): \\(A = 1\\).",
          "Coefficient of \\(x^2\\): \\(0 = A + B\\), so \\(B = -1\\). Coefficient of \\(x\\): \\(1 = C\\).",
          "\\(\\int \\left(\\dfrac{1}{x} - \\dfrac{x}{x^2 + 1} + \\dfrac{1}{x^2 + 1}\\right)dx\\).",
          "\\(= \\log|x| - \\dfrac{1}{2}\\log(x^2 + 1) + \\tan^{-1} x + C_1\\).",
        ],
        answer: "\\(\\log|x| - \\dfrac{1}{2}\\log(x^2 + 1) + \\tan^{-1} x + C_1\\)",
      },
      selfCheckExample: {
        prompt: "Find \\(\\int \\dfrac{3x}{(x - 2)(x^2 + 2)}\\,dx\\).",
        steps: [
          "\\(3x = A(x^2 + 2) + (Bx + C)(x - 2)\\).",
          "Put \\(x = 2\\): \\(6 = 6A\\), so \\(A = 1\\).",
          "Coefficient of \\(x^2\\): \\(0 = A + B\\), so \\(B = -1\\). Constants: \\(0 = 2A - 2C\\), so \\(C = 1\\).",
          "\\(\\int \\left(\\dfrac{1}{x - 2} - \\dfrac{x}{x^2 + 2} + \\dfrac{1}{x^2 + 2}\\right)dx\\).",
          "\\(= \\log|x - 2| - \\dfrac{1}{2}\\log(x^2 + 2) + \\dfrac{1}{\\sqrt{2}}\\tan^{-1}\\dfrac{x}{\\sqrt{2}} + C_1\\).",
        ],
        answer: "\\(\\log|x - 2| - \\dfrac{1}{2}\\log(x^2 + 2) + \\dfrac{1}{\\sqrt{2}}\\tan^{-1}\\dfrac{x}{\\sqrt{2}} + C_1\\)",
      },
      practiceSet: [
        { prompt: "Find \\(\\int \\dfrac{2}{(x + 1)(x^2 + 1)}\\,dx\\).", answer: "\\(\\log|x + 1| - \\dfrac{1}{2}\\log(x^2 + 1) + \\tan^{-1} x + C\\)" },
        { prompt: "Find \\(\\int \\dfrac{dx}{x(x^2 + 4)}\\).", answer: "\\(\\dfrac{1}{4}\\log|x| - \\dfrac{1}{8}\\log(x^2 + 4) + C\\)" },
        { prompt: "Find \\(\\int \\dfrac{x^2}{(x + 1)(x^2 + 1)}\\,dx\\).", answer: "\\(\\dfrac{1}{2}\\log|x + 1| + \\dfrac{1}{4}\\log(x^2 + 1) - \\dfrac{1}{2}\\tan^{-1} x + C\\)" },
      ],
      pyqExampleId: "635dd3bd-7a86-4b43-8c0d-2c471625af97",
      traps: [
        {
          title: "A constant over the quadratic",
          body: "Over \\(x^2 + 4\\) the numerator is \\(Bx + C\\), not just \\(B\\). With a constant alone the identity has too few unknowns and the comparison of coefficients fails.",
        },
        {
          title: "Integrating x over x² + k² as tan⁻¹",
          body: "\\(\\int \\dfrac{x}{x^2 + 4}\\,dx = \\dfrac{1}{2}\\log(x^2 + 4)\\). Only the constant part \\(\\dfrac{C}{x^2 + 4}\\) gives an inverse tangent.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmin-pf-even",
      name: "Fractions in x squared only",
      intuition:
        "When \\(x\\) appears only as \\(x^2\\), as in \\(\\dfrac{x^2}{(x^2 + 2)(x^2 + 7)}\\), write \\(t\\) for \\(x^2\\) just to find the constants, then put \\(x^2\\) back and integrate the two inverse tangents. If there is an extra \\(x\\) on top, as in \\(\\dfrac{2x}{(x^2 + 1)(x^2 + 3)}\\), \\(t = x^2\\) is a real substitution with \\(dt = 2x\\,dx\\).",
      definition:
        "- **Only \\(x^2\\) appears:** put \\(x^2 = t\\) in the fraction only, split \\(\\dfrac{t}{(t + a)(t + b)}\\) into linear fractions in \\(t\\), and put \\(t = x^2\\) back before integrating.\n" +
        "- Each piece is then \\(\\dfrac{k}{x^2 + a}\\), which gives \\(\\dfrac{k}{\\sqrt{a}}\\tan^{-1}\\dfrac{x}{\\sqrt{a}}\\).\n" +
        "- **An extra x on top:** \\(x\\,dx = \\dfrac{dt}{2}\\), so the integral becomes a rational function of \\(t\\), and the answer is in logs.\n" +
        "- For \\(\\dfrac{1}{x(x^n + 1)}\\), multiply top and bottom by \\(x^{n-1}\\) and put \\(x^n = t\\).",
      formula: {
        label: "Splitting in t = x squared",
        latex: "\\dfrac{x^2}{(x^2 + a)(x^2 + b)} = \\dfrac{1}{b - a}\\left[\\dfrac{b}{x^2 + b} - \\dfrac{a}{x^2 + a}\\right]",
      },
      authoredExample: {
        prompt: "Find \\(\\int \\dfrac{x^2 + 2}{(x^2 + 1)(x^2 + 3)}\\,dx\\).",
        steps: [
          "Put \\(x^2 = t\\) in the fraction only: \\(\\dfrac{t + 2}{(t + 1)(t + 3)} = \\dfrac{A}{t + 1} + \\dfrac{B}{t + 3}\\).",
          "\\(t + 2 = A(t + 3) + B(t + 1)\\). Put \\(t = -1\\): \\(A = \\dfrac{1}{2}\\). Put \\(t = -3\\): \\(B = \\dfrac{1}{2}\\).",
          "So the integrand is \\(\\dfrac{1}{2(x^2 + 1)} + \\dfrac{1}{2(x^2 + 3)}\\).",
          "\\(\\int = \\dfrac{1}{2}\\tan^{-1} x + \\dfrac{1}{2\\sqrt{3}}\\tan^{-1}\\dfrac{x}{\\sqrt{3}} + C\\).",
        ],
        answer: "\\(\\dfrac{1}{2}\\tan^{-1} x + \\dfrac{1}{2\\sqrt{3}}\\tan^{-1}\\dfrac{x}{\\sqrt{3}} + C\\)",
      },
      selfCheckExample: {
        prompt: "Find \\(\\int \\dfrac{2x}{(x^2 + 2)(x^2 + 5)}\\,dx\\).",
        steps: [
          "Put \\(x^2 = t\\), so \\(2x\\,dx = dt\\).",
          "\\(\\int \\dfrac{dt}{(t + 2)(t + 5)} = \\dfrac{1}{3}\\int \\left(\\dfrac{1}{t + 2} - \\dfrac{1}{t + 5}\\right)dt\\).",
          "\\(= \\dfrac{1}{3}\\log\\left|\\dfrac{t + 2}{t + 5}\\right| + C\\).",
          "\\(\\therefore\\) the integral is \\(\\dfrac{1}{3}\\log\\left(\\dfrac{x^2 + 2}{x^2 + 5}\\right) + C\\).",
        ],
        answer: "\\(\\dfrac{1}{3}\\log\\left(\\dfrac{x^2 + 2}{x^2 + 5}\\right) + C\\)",
      },
      practiceSet: [
        { prompt: "Find \\(\\int \\dfrac{dx}{(x^2 + 1)(x^2 + 16)}\\).", answer: "\\(\\dfrac{1}{15}\\tan^{-1} x - \\dfrac{1}{60}\\tan^{-1}\\dfrac{x}{4} + C\\)" },
        { prompt: "Find \\(\\int \\dfrac{x^3}{x^4 + 3x^2 + 2}\\,dx\\).", answer: "\\(\\log(x^2 + 2) - \\dfrac{1}{2}\\log(x^2 + 1) + C\\)", method: "Put \\(x^2 = t\\); \\(x^3\\,dx = \\dfrac{t\\,dt}{2}\\)." },
        { prompt: "Find \\(\\int \\dfrac{dx}{x(x^3 + 1)}\\).", answer: "\\(\\dfrac{1}{3}\\log\\left|\\dfrac{x^3}{x^3 + 1}\\right| + C\\)", method: "Multiply by \\(x^2\\) and put \\(x^3 = t\\)." },
      ],
      pyqExampleId: "2ee03270-2f12-4f14-9bdb-84a533ab09db",
      traps: [
        {
          title: "Integrating in t when there is no dt",
          body: "In \\(\\dfrac{x^2}{(x^2 + a)(x^2 + b)}\\) there is no \\(x\\,dx\\) to make \\(dt\\). Use \\(t\\) only to find the constants, put \\(x^2\\) back, then integrate in \\(x\\).",
        },
        {
          title: "Writing \\(\\tan^{-1} x\\) for every piece",
          body: "\\(\\int \\dfrac{dx}{x^2 + 16} = \\dfrac{1}{4}\\tan^{-1}\\dfrac{x}{4}\\). Each piece has its own \\(a\\), and the factor \\(\\dfrac{1}{a}\\) goes in front.",
        },
      ],
    },
  ],
};
