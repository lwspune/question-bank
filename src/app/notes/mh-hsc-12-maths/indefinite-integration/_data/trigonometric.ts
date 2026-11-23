import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_MA_II_TRIGONOMETRIC_NOTE: SubtopicNote = {
  subtopicName: "Integrals of Trigonometric Functions",
  title: "Integrals of Trigonometric Functions",
  oneLineDefinition:
    "Powers of sin, cos and tan, ratios with shifted angles, and denominators in sin x, cos x or their squares, each with its own rewriting or substitution that turns it into a standard integral.",
  whyItMatters:
    "55 questions, five of them from board papers: sin(x + a) over cos(x − b) (2024 and 2025), and in 2026 √(1 + sin 2x), sin x over sin 3x, and 2 over 3 + 2 sin²x + 5 cos²x. The textbook rows are Exercise 3.2(A) Part II, the trigonometric items of Exercise 3.2(B) and many Miscellaneous items.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscmii-powers",
      name: "Powers of sin, cos, tan and sec",
      intuition:
        "An odd power of cos x keeps one cos x aside to be the derivative of sin x; the even power left over is written in sin x with cos² x = 1 − sin² x. The same idea works for sin x with cos x as the new variable, and for tan x with sec² x as the derivative. Then everything is a polynomial in t.",
      definition:
        "- \\(\\int \\tan x\\,dx = \\log|\\sec x| + c\\), \\(\\int \\cot x\\,dx = \\log|\\sin x| + c\\).\n" +
        "- \\(\\int \\sec x\\,dx = \\log|\\sec x + \\tan x| + c\\), \\(\\int \\operatorname{cosec} x\\,dx = \\log|\\operatorname{cosec} x - \\cot x| + c\\).\n" +
        "- Odd power of \\(\\cos x\\): keep one \\(\\cos x\\), change the rest with \\(\\cos^2 x = 1 - \\sin^2 x\\), put \\(t = \\sin x\\).\n" +
        "- Odd power of \\(\\sin x\\): keep one \\(\\sin x\\), use \\(\\sin^2 x = 1 - \\cos^2 x\\), put \\(t = \\cos x\\).\n" +
        "- Powers of \\(\\tan x\\): \\(\\tan^n x = \\tan^{n-2}x(\\sec^2 x - 1)\\); put \\(t = \\tan x\\) where \\(\\sec^2 x\\) appears.\n" +
        "- \\(\\dfrac{\\sin^m x}{\\cos^{m+2} x} = \\tan^m x\\sec^2 x\\): put \\(t = \\tan x\\).",
      formula: {
        label: "Odd power of cos x",
        latex: "\\int \\cos^{2k+1}x\\,dx = \\int (1 - t^2)^k\\,dt, \\qquad t = \\sin x",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\int \\sin^3 x\\cos^2 x\\,dx\\).",
        steps: [
          "Keep one \\(\\sin x\\): \\(\\sin^3 x\\cos^2 x = (1 - \\cos^2 x)\\cos^2 x\\sin x\\).",
          "Put \\(t = \\cos x\\), so \\(dt = -\\sin x\\,dx\\).",
          "\\(\\int \\sin^3 x\\cos^2 x\\,dx = -\\int (1 - t^2)t^2\\,dt = -\\int (t^2 - t^4)\\,dt = -\\dfrac{t^3}{3} + \\dfrac{t^5}{5} + c\\).",
          "\\(\\therefore \\int \\sin^3 x\\cos^2 x\\,dx = \\dfrac{\\cos^5 x}{5} - \\dfrac{\\cos^3 x}{3} + c\\).",
        ],
        answer: "\\(\\dfrac{\\cos^5 x}{5} - \\dfrac{\\cos^3 x}{3} + c\\)",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\int \\tan^3 x\\,dx\\).",
        steps: [
          "\\(\\tan^3 x = \\tan x\\sec^2 x - \\tan x\\).",
          "\\(\\int \\tan x\\sec^2 x\\,dx = \\dfrac{\\tan^2 x}{2}\\) (put \\(t = \\tan x\\)), and \\(\\int \\tan x\\,dx = \\log|\\sec x|\\).",
        ],
        answer: "\\(\\dfrac{\\tan^2 x}{2} - \\log|\\sec x| + c\\)",
      },
      practiceSet: [
        { prompt: "Evaluate \\(\\int \\sec^4 x\\,dx\\).", answer: "\\(\\sec^4 x = (1 + \\tan^2 x)\\sec^2 x\\), put \\(t = \\tan x\\): \\(\\tan x + \\dfrac{\\tan^3 x}{3} + c\\)" },
        { prompt: "Evaluate \\(\\int \\dfrac{\\sin^2 x}{\\cos^4 x}\\,dx\\).", answer: "\\(\\tan^2 x\\sec^2 x\\), so \\(\\dfrac{\\tan^3 x}{3} + c\\)" },
      ],
      pyqExampleId: "3b541aa8-f5ae-459c-8a58-d699b1ac5b9e",
      traps: [
        {
          title: "The integral of sec x is not log sec x",
          body: "\\(\\int \\sec x\\,dx = \\log|\\sec x + \\tan x| + c\\), and \\(\\int \\tan x\\,dx = \\log|\\sec x| + c\\). Mixing these two is a common slip.",
        },
        {
          title: "Choosing the wrong t",
          body: "For an odd power of \\(\\cos x\\), the spare \\(\\cos x\\) is the derivative of \\(\\sin x\\), so \\(t = \\sin x\\). Putting \\(t = \\cos x\\) leaves a \\(\\sin x\\) that cannot be written in \\(t\\) without a root.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmii-angles",
      name: "Shifted angles and splitting the numerator",
      intuition:
        "In sin(x + a) over cos(x − b), the top angle is the bottom angle plus a constant: x + a = (x − b) + (a + b). Expanding the sine of that sum splits the fraction into a constant and a tan, and both integrate at once. The same idea handles a sin x + b cos x over c sin x + d cos x: write the top as so much of the bottom plus so much of the derivative of the bottom.",
      definition:
        "- For \\(\\dfrac{\\sin(x+a)}{\\cos(x-b)}\\): write \\(x + a = (x - b) + (a + b)\\) and expand: the fraction is \\(\\sin(a+b) + \\cos(a+b)\\tan(x-b)\\).\n" +
        "- For \\(\\dfrac{\\cos x}{\\sin(x-a)}\\): write \\(x = (x - a) + a\\) in the same way.\n" +
        "- For \\(\\dfrac{a\\sin x + b\\cos x}{c\\sin x + d\\cos x}\\): write the numerator as \\(A(\\text{denominator}) + B\\dfrac{d}{dx}(\\text{denominator})\\); the answer is \\(Ax + B\\log|\\text{denominator}| + c\\).\n" +
        "- \\(\\dfrac{1}{1 - \\tan x}\\) or \\(\\dfrac{1}{2 + 3\\tan x}\\): write \\(\\tan x = \\dfrac{\\sin x}{\\cos x}\\) first, then split as above.\n" +
        "- Products of sines and cosines become sums. From \\(\\tan 3x = \\tan(2x + x)\\): \\(\\tan 3x\\tan 2x\\tan x = \\tan 3x - \\tan 2x - \\tan x\\).",
      formula: {
        label: "Splitting the angle",
        latex: "\\frac{\\sin(x+a)}{\\cos(x-b)} = \\sin(a+b) + \\cos(a+b)\\tan(x-b)",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\int \\dfrac{\\sin x}{\\sin(x + a)}\\,dx\\).",
        steps: [
          "Write \\(x = (x + a) - a\\): \\(\\sin x = \\sin(x + a)\\cos a - \\cos(x + a)\\sin a\\).",
          "So \\(\\dfrac{\\sin x}{\\sin(x+a)} = \\cos a - \\sin a\\cot(x + a)\\).",
          "\\(\\int \\dfrac{\\sin x}{\\sin(x+a)}\\,dx = \\cos a\\int dx - \\sin a\\int \\cot(x + a)\\,dx\\).",
          "\\(\\therefore \\int \\dfrac{\\sin x}{\\sin(x+a)}\\,dx = x\\cos a - \\sin a\\log|\\sin(x + a)| + c\\).",
        ],
        answer: "\\(x\\cos a - \\sin a\\log|\\sin(x+a)| + c\\)",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\int \\dfrac{2\\sin x + 3\\cos x}{3\\sin x + 2\\cos x}\\,dx\\).",
        steps: [
          "Let \\(2\\sin x + 3\\cos x = A(3\\sin x + 2\\cos x) + B(3\\cos x - 2\\sin x)\\).",
          "\\(\\sin x\\): \\(3A - 2B = 2\\); \\(\\cos x\\): \\(2A + 3B = 3\\). So \\(A = \\dfrac{12}{13}\\), \\(B = \\dfrac{5}{13}\\).",
        ],
        answer: "\\(\\dfrac{12}{13}x + \\dfrac{5}{13}\\log|3\\sin x + 2\\cos x| + c\\)",
      },
      practiceSet: [
        { prompt: "Evaluate \\(\\int \\sin 3x\\cos x\\,dx\\).", answer: "\\(\\dfrac{1}{2}\\int (\\sin 4x + \\sin 2x)\\,dx = -\\dfrac{\\cos 4x}{8} - \\dfrac{\\cos 2x}{4} + c\\)" },
        { prompt: "Evaluate \\(\\int \\dfrac{\\cos x}{\\cos(x - a)}\\,dx\\).", answer: "Write \\(x = (x - a) + a\\): the integrand is \\(\\cos a - \\sin a\\tan(x - a)\\), so \\(x\\cos a + \\sin a\\log|\\cos(x - a)| + c\\)" },
        { prompt: "Evaluate \\(\\int \\dfrac{1}{1 + \\tan x}\\,dx\\).", answer: "\\(\\dfrac{\\cos x}{\\cos x + \\sin x}\\) with \\(A = B = \\dfrac{1}{2}\\): \\(\\dfrac{x}{2} + \\dfrac{1}{2}\\log|\\cos x + \\sin x| + c\\)" },
      ],
      pyqExampleId: "bde0c720-ed14-417e-b877-8508236ca766",
      traps: [
        {
          title: "Expanding the wrong angle",
          body: "Expanding \\(\\sin(x + a)\\) and \\(\\cos(x - b)\\) separately gives a fraction that does not simplify. Write the top angle in terms of the bottom angle, then expand only the top.",
        },
        {
          title: "The sign of the integral of tan",
          body: "\\(\\int \\tan(x - b)\\,dx = -\\log|\\cos(x - b)| = \\log|\\sec(x - b)|\\). Writing \\(+\\log|\\cos(x - b)|\\) is the slip that costs the last mark.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmii-sinsquare",
      name: "Denominators in sin²x and cos²x",
      intuition:
        "When the denominator holds sin² x and cos² x (and perhaps a constant), dividing top and bottom by cos² x turns everything into tan x and sec² x. The sec² x on top is exactly dt for t = tan x, and the bottom becomes a quadratic in t. One standard result then finishes it.",
      definition:
        "- Divide numerator and denominator by \\(\\cos^2 x\\).\n" +
        "- In the denominator, replace \\(\\sec^2 x\\) by \\(1 + \\tan^2 x\\) (a constant \\(c\\) becomes \\(c\\sec^2 x\\)).\n" +
        "- Put \\(t = \\tan x\\), \\(dt = \\sec^2 x\\,dx\\): the integral becomes \\(\\int \\dfrac{dt}{pt^2 + q}\\).\n" +
        "- Finish with \\(\\int \\dfrac{dt}{t^2 + k^2} = \\dfrac{1}{k}\\tan^{-1}\\dfrac{t}{k}\\) or \\(\\int \\dfrac{dt}{k^2 - t^2} = \\dfrac{1}{2k}\\log\\left|\\dfrac{k + t}{k - t}\\right|\\) (both proved with the special integrals).\n" +
        "- \\(\\dfrac{\\sin x}{\\sin 3x} = \\dfrac{1}{3 - 4\\sin^2 x}\\) and \\(\\cos 2x + 3\\sin^2 x = \\cos^2 x + 2\\sin^2 x\\) are of this type once rewritten.",
      formula: {
        label: "Divide by cos² x",
        latex: "\\int \\frac{dx}{a\\sin^2 x + b\\cos^2 x} = \\int \\frac{\\sec^2 x\\,dx}{a\\tan^2 x + b} = \\int \\frac{dt}{at^2 + b}, \\qquad t = \\tan x",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\int \\dfrac{1}{4\\sin^2 x + 9\\cos^2 x}\\,dx\\).",
        steps: [
          "Divide numerator and denominator by \\(\\cos^2 x\\): \\(\\int \\dfrac{\\sec^2 x}{4\\tan^2 x + 9}\\,dx\\).",
          "Put \\(t = \\tan x\\), \\(dt = \\sec^2 x\\,dx\\): \\(\\int \\dfrac{dt}{4t^2 + 9} = \\dfrac{1}{4}\\int \\dfrac{dt}{t^2 + \\left(\\frac{3}{2}\\right)^2}\\).",
          "\\(= \\dfrac{1}{4}\\cdot\\dfrac{2}{3}\\tan^{-1}\\dfrac{2t}{3} + c = \\dfrac{1}{6}\\tan^{-1}\\dfrac{2t}{3} + c\\).",
          "\\(\\therefore \\int \\dfrac{dx}{4\\sin^2 x + 9\\cos^2 x} = \\dfrac{1}{6}\\tan^{-1}\\left(\\dfrac{2\\tan x}{3}\\right) + c\\).",
        ],
        answer: "\\(\\dfrac{1}{6}\\tan^{-1}\\left(\\dfrac{2\\tan x}{3}\\right) + c\\)",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\int \\dfrac{1}{2 + \\sin^2 x}\\,dx\\).",
        steps: [
          "Divide by \\(\\cos^2 x\\): \\(\\dfrac{\\sec^2 x}{2\\sec^2 x + \\tan^2 x} = \\dfrac{\\sec^2 x}{2 + 3\\tan^2 x}\\).",
          "\\(\\int \\dfrac{dt}{3t^2 + 2} = \\dfrac{1}{3}\\int \\dfrac{dt}{t^2 + \\frac{2}{3}} = \\dfrac{1}{\\sqrt{6}}\\tan^{-1}\\dfrac{\\sqrt{3}\\,t}{\\sqrt{2}}\\).",
        ],
        answer: "\\(\\dfrac{1}{\\sqrt{6}}\\tan^{-1}\\left(\\dfrac{\\sqrt{3}\\tan x}{\\sqrt{2}}\\right) + c\\)",
      },
      practiceSet: [
        { prompt: "Evaluate \\(\\int \\dfrac{1}{4 - 3\\sin^2 x}\\,dx\\).", answer: "The denominator becomes \\(4 + \\tan^2 x\\) after dividing: \\(\\dfrac{1}{2}\\tan^{-1}\\left(\\dfrac{\\tan x}{2}\\right) + c\\)" },
        { prompt: "Evaluate \\(\\int \\dfrac{1}{\\cos^2 x - 4\\sin^2 x}\\,dx\\).", answer: "\\(\\int \\dfrac{dt}{1 - 4t^2}\\) with \\(t = \\tan x\\): \\(\\dfrac{1}{4}\\log\\left|\\dfrac{1 + 2\\tan x}{1 - 2\\tan x}\\right| + c\\)" },
      ],
      pyqExampleId: "7c064892-0979-4638-b0a2-bf9da81a1c95",
      traps: [
        {
          title: "Using t = tan(x/2) for squares",
          body: "The half-angle substitution is for first powers, \\(a\\sin x + b\\cos x + c\\). With \\(\\sin^2 x\\) and \\(\\cos^2 x\\), divide by \\(\\cos^2 x\\) and put \\(t = \\tan x\\); the half-angle route also works but is long and error-prone.",
        },
        {
          title: "Forgetting the constant term becomes c sec² x",
          body: "In \\(2 + \\sin^2 x\\), dividing by \\(\\cos^2 x\\) turns the 2 into \\(2\\sec^2 x = 2 + 2\\tan^2 x\\). Writing it as plain 2 gives the wrong quadratic in \\(t\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmii-halfangle",
      name: "Denominators a sin x + b cos x + c: the substitution t = tan(x/2)",
      intuition:
        "Every sine and cosine of x can be written in t = tan(x/2) without roots. So a denominator of first powers of sin x and cos x becomes a quadratic in t, and dx brings its own 1 + t² to cancel. Then complete the square and use a standard result.",
      definition:
        "- Put \\(t = \\tan\\dfrac{x}{2}\\). Then \\(\\sin x = \\dfrac{2t}{1 + t^2}\\), \\(\\cos x = \\dfrac{1 - t^2}{1 + t^2}\\) and \\(dx = \\dfrac{2\\,dt}{1 + t^2}\\).\n" +
        "- Multiply the denominator through by \\(1 + t^2\\); the integral becomes \\(\\int \\dfrac{2\\,dt}{(\\text{quadratic in } t)}\\).\n" +
        "- Complete the square in \\(t\\) and use \\(\\int \\dfrac{dt}{t^2 + k^2}\\), \\(\\int \\dfrac{dt}{t^2 - k^2}\\) or \\(\\int \\dfrac{dt}{k^2 - t^2}\\).\n" +
        "- For the angle \\(2x\\), put \\(t = \\tan x\\): \\(\\sin 2x = \\dfrac{2t}{1+t^2}\\), \\(\\cos 2x = \\dfrac{1 - t^2}{1 + t^2}\\), \\(dx = \\dfrac{dt}{1 + t^2}\\).\n" +
        "- With no constant term, \\(a\\sin x + b\\cos x = r\\sin(x + \\alpha)\\) with \\(r = \\sqrt{a^2 + b^2}\\) is quicker: the integral becomes \\(\\dfrac{1}{r}\\int \\operatorname{cosec}(x + \\alpha)\\,dx\\).",
      formula: {
        label: "Half-angle substitution",
        latex: "t = \\tan\\frac{x}{2}: \\quad \\sin x = \\frac{2t}{1+t^2}, \\quad \\cos x = \\frac{1-t^2}{1+t^2}, \\quad dx = \\frac{2\\,dt}{1+t^2}",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\int \\dfrac{1}{5 + 3\\sin x}\\,dx\\).",
        steps: [
          "Put \\(t = \\tan\\dfrac{x}{2}\\): \\(\\sin x = \\dfrac{2t}{1 + t^2}\\), \\(dx = \\dfrac{2\\,dt}{1 + t^2}\\).",
          "Denominator: \\(5 + 3\\cdot\\dfrac{2t}{1 + t^2} = \\dfrac{5 + 5t^2 + 6t}{1 + t^2} = \\dfrac{5t^2 + 6t + 5}{1 + t^2}\\).",
          "\\(\\int \\dfrac{dx}{5 + 3\\sin x} = \\int \\dfrac{2\\,dt}{5t^2 + 6t + 5} = \\dfrac{2}{5}\\int \\dfrac{dt}{t^2 + \\frac{6}{5}t + 1} = \\dfrac{2}{5}\\int \\dfrac{dt}{\\left(t + \\frac{3}{5}\\right)^2 + \\left(\\frac{4}{5}\\right)^2}\\).",
          "\\(= \\dfrac{2}{5} \\cdot \\dfrac{5}{4}\\tan^{-1}\\left(\\dfrac{t + \\frac{3}{5}}{\\frac{4}{5}}\\right) + c = \\dfrac{1}{2}\\tan^{-1}\\left(\\dfrac{5t + 3}{4}\\right) + c\\).",
          "\\(\\therefore \\int \\dfrac{dx}{5 + 3\\sin x} = \\dfrac{1}{2}\\tan^{-1}\\left(\\dfrac{5\\tan\\frac{x}{2} + 3}{4}\\right) + c\\).",
        ],
        answer: "\\(\\dfrac{1}{2}\\tan^{-1}\\left(\\dfrac{5\\tan\\frac{x}{2} + 3}{4}\\right) + c\\)",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\int \\dfrac{1}{1 + \\sin x + \\cos x}\\,dx\\).",
        steps: [
          "With \\(t = \\tan\\dfrac{x}{2}\\) the denominator is \\(\\dfrac{(1 + t^2) + 2t + (1 - t^2)}{1 + t^2} = \\dfrac{2 + 2t}{1 + t^2}\\).",
          "\\(\\int \\dfrac{2\\,dt}{2 + 2t} = \\log|1 + t|\\).",
        ],
        answer: "\\(\\log\\left|1 + \\tan\\dfrac{x}{2}\\right| + c\\)",
      },
      practiceSet: [
        { prompt: "Evaluate \\(\\int \\dfrac{1}{3 + 2\\sin x + \\cos x}\\,dx\\).", answer: "The denominator becomes \\(\\dfrac{2t^2 + 4t + 4}{1 + t^2}\\), so the integral is \\(\\int \\dfrac{dt}{(t + 1)^2 + 1}\\): \\(\\tan^{-1}\\left(1 + \\tan\\dfrac{x}{2}\\right) + c\\)" },
        { prompt: "Evaluate \\(\\int \\dfrac{1}{\\sin x + \\cos x}\\,dx\\).", answer: "\\(\\sin x + \\cos x = \\sqrt{2}\\sin\\left(x + \\dfrac{\\pi}{4}\\right)\\): \\(\\dfrac{1}{\\sqrt{2}}\\log\\left|\\tan\\left(\\dfrac{x}{2} + \\dfrac{\\pi}{8}\\right)\\right| + c\\)" },
      ],
      pyqExampleId: "715a878e-a53e-40bf-976a-b60dc10dad7a",
      traps: [
        {
          title: "Dropping the 2 in dx",
          body: "\\(dx = \\dfrac{2\\,dt}{1 + t^2}\\). Forgetting the 2 halves the whole answer.",
        },
        {
          title: "Putting back tan x instead of tan(x/2)",
          body: "The substitution was \\(t = \\tan\\dfrac{x}{2}\\), so the last line must read \\(\\tan\\dfrac{x}{2}\\). For an angle \\(2x\\), where \\(t = \\tan x\\), it is the other way round.",
        },
      ],
    },
  ],
};
