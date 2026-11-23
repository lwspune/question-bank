import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_MA_II_SPECIAL_NOTE: SubtopicNote = {
  subtopicName: "Special Integrals of Quadratic Forms",
  title: "Special Integrals of Quadratic Forms",
  oneLineDefinition:
    "Six standard results for 1 over x² ± a², a² − x² and their square roots, with completing the square to bring any quadratic to one of these forms.",
  whyItMatters:
    "39 questions, five of them from board papers: proofs of the integrals of 1/(a² − x²) (2018), 1/√(x² + a²) (2019) and √(a² − x²) (2025), an MCQ on 1/(9x² + 1) (2019), and 1/(25 − 9x²) to evaluate (2025). The textbook rows are Exercise 3.2(B) Part I, its solved examples and one Miscellaneous item.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscmii-six",
      name: "The six standard integrals and their proofs",
      intuition:
        "These six results are the end point of most longer questions in the chapter: after a substitution or completing the square, the integral lands on one of them. Learn them as three pairs, and learn how each is proved, because the board asks for the proofs as questions in their own right.",
      definition:
        "- \\(\\int \\dfrac{dx}{x^2 + a^2} = \\dfrac{1}{a}\\tan^{-1}\\dfrac{x}{a} + c\\)\n" +
        "- \\(\\int \\dfrac{dx}{x^2 - a^2} = \\dfrac{1}{2a}\\log\\left|\\dfrac{x - a}{x + a}\\right| + c\\)\n" +
        "- \\(\\int \\dfrac{dx}{a^2 - x^2} = \\dfrac{1}{2a}\\log\\left|\\dfrac{a + x}{a - x}\\right| + c\\)\n" +
        "- \\(\\int \\dfrac{dx}{\\sqrt{a^2 - x^2}} = \\sin^{-1}\\dfrac{x}{a} + c\\)\n" +
        "- \\(\\int \\dfrac{dx}{\\sqrt{x^2 + a^2}} = \\log\\left|x + \\sqrt{x^2 + a^2}\\right| + c\\)\n" +
        "- \\(\\int \\dfrac{dx}{\\sqrt{x^2 - a^2}} = \\log\\left|x + \\sqrt{x^2 - a^2}\\right| + c\\)\n" +
        "- **Proof of the third:** \\(\\dfrac{1}{a^2 - x^2} = \\dfrac{1}{(a - x)(a + x)} = \\dfrac{1}{2a}\\left[\\dfrac{1}{a - x} + \\dfrac{1}{a + x}\\right]\\).\n" +
        "- Integrate: \\(\\dfrac{1}{2a}\\left[-\\log|a - x| + \\log|a + x|\\right] + c\\), then combine the logs.\n" +
        "- **Proof of the fifth:** put \\(x = a\\tan\\theta\\), so \\(dx = a\\sec^2\\theta\\,d\\theta\\) and \\(\\sqrt{x^2 + a^2} = a\\sec\\theta\\).\n" +
        "- The integral becomes \\(\\int \\sec\\theta\\,d\\theta = \\log|\\sec\\theta + \\tan\\theta| + c_1\\).\n" +
        "- Put back \\(\\sec\\theta = \\dfrac{\\sqrt{x^2 + a^2}}{a}\\), \\(\\tan\\theta = \\dfrac{x}{a}\\): \\(\\log\\left|x + \\sqrt{x^2 + a^2}\\right| - \\log a + c_1\\), and \\(c = c_1 - \\log a\\).\n" +
        "- When \\(x^2\\) has a coefficient, take it out first: \\(\\dfrac{1}{9x^2 + 1} = \\dfrac{1}{9}\\cdot\\dfrac{1}{x^2 + \\frac{1}{9}}\\).",
      formula: {
        label: "Two of the six",
        latex: "\\int \\frac{dx}{a^2 - x^2} = \\frac{1}{2a}\\log\\left|\\frac{a+x}{a-x}\\right| + c, \\qquad \\int \\frac{dx}{\\sqrt{x^2 + a^2}} = \\log\\left|x + \\sqrt{x^2 + a^2}\\right| + c",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\int \\dfrac{1}{\\sqrt{16 - 9x^2}}\\,dx\\).",
        steps: [
          "Take 9 out of the root: \\(\\sqrt{16 - 9x^2} = 3\\sqrt{\\dfrac{16}{9} - x^2}\\).",
          "\\(\\int \\dfrac{dx}{\\sqrt{16 - 9x^2}} = \\dfrac{1}{3}\\int \\dfrac{dx}{\\sqrt{\\left(\\frac{4}{3}\\right)^2 - x^2}}\\).",
          "Use \\(\\int \\dfrac{dx}{\\sqrt{a^2 - x^2}} = \\sin^{-1}\\dfrac{x}{a}\\) with \\(a = \\dfrac{4}{3}\\): \\(\\dfrac{1}{3}\\sin^{-1}\\dfrac{3x}{4} + c\\).",
          "\\(\\therefore \\int \\dfrac{dx}{\\sqrt{16 - 9x^2}} = \\dfrac{1}{3}\\sin^{-1}\\left(\\dfrac{3x}{4}\\right) + c\\).",
        ],
        answer: "\\(\\dfrac{1}{3}\\sin^{-1}\\left(\\dfrac{3x}{4}\\right) + c\\)",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\int \\dfrac{1}{4x^2 + 9}\\,dx\\).",
        steps: ["\\(\\dfrac{1}{4}\\int \\dfrac{dx}{x^2 + \\left(\\frac{3}{2}\\right)^2} = \\dfrac{1}{4}\\cdot\\dfrac{2}{3}\\tan^{-1}\\dfrac{2x}{3}\\)."],
        answer: "\\(\\dfrac{1}{6}\\tan^{-1}\\left(\\dfrac{2x}{3}\\right) + c\\)",
      },
      practiceSet: [
        { prompt: "Evaluate \\(\\int \\dfrac{1}{x^2 - 16}\\,dx\\).", answer: "\\(\\dfrac{1}{8}\\log\\left|\\dfrac{x - 4}{x + 4}\\right| + c\\)" },
        { prompt: "Evaluate \\(\\int \\dfrac{1}{\\sqrt{x^2 + 25}}\\,dx\\).", answer: "\\(\\log\\left|x + \\sqrt{x^2 + 25}\\right| + c\\)" },
        { prompt: "Evaluate \\(\\int \\dfrac{1}{\\sqrt{4x^2 - 1}}\\,dx\\).", answer: "\\(\\dfrac{1}{2}\\int \\dfrac{dx}{\\sqrt{x^2 - \\frac{1}{4}}}\\), so \\(\\dfrac{1}{2}\\log\\left|2x + \\sqrt{4x^2 - 1}\\right| + c\\)" },
      ],
      pyqExampleId: "b5c874ff-c787-4c21-b25e-2502b5713c7b",
      traps: [
        {
          title: "Not taking out the coefficient of x²",
          body: "\\(\\int \\dfrac{dx}{4x^2 + 1}\\) is \\(\\dfrac{1}{2}\\tan^{-1}2x + c\\), not \\(\\tan^{-1}2x + c\\). Take the 4 out, then \\(a = \\dfrac{1}{2}\\).",
        },
        {
          title: "Mixing up x² − a² and a² − x²",
          body: "For \\(x^2 - a^2\\) the log holds \\(\\dfrac{x - a}{x + a}\\); for \\(a^2 - x^2\\) it holds \\(\\dfrac{a + x}{a - x}\\). Both have \\(\\dfrac{1}{2a}\\) in front.",
        },
        {
          title: "A proof that hides the constant",
          body: "In the proof by \\(x = a\\tan\\theta\\), a term \\(-\\log a\\) appears. Say that it is a constant and joins \\(c\\); leaving it unexplained makes the proof look wrong.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmii-square",
      name: "Completing the square",
      intuition:
        "Any quadratic ax² + bx + c can be written as a times a square plus or minus a constant. Once it is in that shape, the shifted variable x + h plays the part of x in one of the six standard results.",
      definition:
        "- Take the coefficient of \\(x^2\\) out: \\(ax^2 + bx + c = a\\left(x^2 + \\dfrac{b}{a}x + \\dfrac{c}{a}\\right)\\) (take \\(\\sqrt{a}\\) out of a root).\n" +
        "- If the coefficient of \\(x^2\\) is negative, take \\(-1\\) out first.\n" +
        "- Add and subtract the square of half the coefficient of \\(x\\).\n" +
        "- Write the quadratic as \\((x + h)^2 + k^2\\), \\((x + h)^2 - k^2\\) or \\(k^2 - (x + h)^2\\).\n" +
        "- Use the standard result with \\(x + h\\) in place of \\(x\\), and put back.",
      formula: {
        label: "Completing the square",
        latex: "x^2 + px + q = \\left(x + \\frac{p}{2}\\right)^2 + \\left(q - \\frac{p^2}{4}\\right)",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\int \\dfrac{1}{x^2 + 6x + 13}\\,dx\\).",
        steps: [
          "Complete the square: \\(x^2 + 6x + 13 = (x + 3)^2 + 4 = (x + 3)^2 + 2^2\\).",
          "\\(\\int \\dfrac{dx}{(x + 3)^2 + 2^2}\\): use \\(\\int \\dfrac{dx}{x^2 + a^2} = \\dfrac{1}{a}\\tan^{-1}\\dfrac{x}{a}\\) with \\(x + 3\\) for \\(x\\) and \\(a = 2\\).",
          "\\(\\therefore \\int \\dfrac{dx}{x^2 + 6x + 13} = \\dfrac{1}{2}\\tan^{-1}\\left(\\dfrac{x + 3}{2}\\right) + c\\).",
        ],
        answer: "\\(\\dfrac{1}{2}\\tan^{-1}\\left(\\dfrac{x + 3}{2}\\right) + c\\)",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\int \\dfrac{1}{\\sqrt{x^2 - 4x + 3}}\\,dx\\).",
        steps: ["\\(x^2 - 4x + 3 = (x - 2)^2 - 1\\); use \\(\\int \\dfrac{dx}{\\sqrt{x^2 - a^2}}\\)."],
        answer: "\\(\\log\\left|x - 2 + \\sqrt{x^2 - 4x + 3}\\right| + c\\)",
      },
      practiceSet: [
        { prompt: "Evaluate \\(\\int \\dfrac{1}{\\sqrt{8 + 2x - x^2}}\\,dx\\).", answer: "\\(8 + 2x - x^2 = 9 - (x - 1)^2\\), so \\(\\sin^{-1}\\left(\\dfrac{x - 1}{3}\\right) + c\\)" },
        { prompt: "Evaluate \\(\\int \\dfrac{1}{2x^2 + 4x + 10}\\,dx\\).", answer: "\\(\\dfrac{1}{2}\\int \\dfrac{dx}{(x+1)^2 + 4} = \\dfrac{1}{4}\\tan^{-1}\\left(\\dfrac{x + 1}{2}\\right) + c\\)" },
      ],
      pyqExampleId: "276f61f8-67a5-4e03-a064-8835a8939116",
      traps: [
        {
          title: "Completing the square with the x² coefficient still inside",
          body: "For \\(2x^2 + 4x + 10\\), take the 2 out first: \\(2[(x + 1)^2 + 4]\\). Halving the 4 without doing so gives the wrong shift.",
        },
        {
          title: "A sign slip with −x²",
          body: "\\(3 + 2x - x^2 = 4 - (x - 1)^2\\), a difference \\(a^2 - u^2\\). Writing it as \\((x - 1)^2 - 4\\) leads to the wrong standard result.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmii-reduce",
      name: "A substitution that leads to a special integral",
      intuition:
        "Many integrands are special integrals in disguise: the quadratic is in eˣ, sin x or tan x instead of x, and its derivative sits in the numerator. Put t equal to that function and the integral becomes one of the six.",
      definition:
        "- Look for a quadratic in \\(f(x)\\) with \\(f'(x)\\) as a factor of the numerator; put \\(t = f(x)\\).\n" +
        "- \\(\\dfrac{e^x}{\\sqrt{1 - e^{2x}}}\\): put \\(t = e^x\\). \\(\\sec^2 x\\sqrt{\\dots\\tan x\\dots}\\): put \\(t = \\tan x\\). \\(\\dfrac{\\sin 2x}{(\\text{quadratic in } \\sin^2 x)}\\): put \\(t = \\sin^2 x\\).\n" +
        "- \\(\\dfrac{1}{a\\sin x + b\\cos x + c}\\): put \\(t = \\tan\\dfrac{x}{2}\\). \\(\\dfrac{1}{a\\sin^2 x + b\\cos^2 x + c}\\): divide by \\(\\cos^2 x\\), put \\(t = \\tan x\\).\n" +
        "- After the substitution, complete the square in \\(t\\) if needed and use a standard result.",
      formula: {
        label: "Reduce, then use a standard result",
        latex: "\\int \\frac{f'(x)\\,dx}{[f(x)]^2 + a^2} = \\frac{1}{a}\\tan^{-1}\\frac{f(x)}{a} + c",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\int \\dfrac{\\cos x}{\\sin^2 x + 4\\sin x + 5}\\,dx\\).",
        steps: [
          "Put \\(t = \\sin x\\), so \\(dt = \\cos x\\,dx\\): \\(\\int \\dfrac{dt}{t^2 + 4t + 5}\\).",
          "Complete the square: \\(t^2 + 4t + 5 = (t + 2)^2 + 1\\).",
          "\\(\\int \\dfrac{dt}{(t + 2)^2 + 1} = \\tan^{-1}(t + 2) + c\\).",
          "\\(\\therefore \\int \\dfrac{\\cos x\\,dx}{\\sin^2 x + 4\\sin x + 5} = \\tan^{-1}(\\sin x + 2) + c\\).",
        ],
        answer: "\\(\\tan^{-1}(\\sin x + 2) + c\\)",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\int \\dfrac{e^x}{e^{2x} + 1}\\,dx\\).",
        steps: ["Put \\(t = e^x\\): \\(\\int \\dfrac{dt}{t^2 + 1} = \\tan^{-1} t\\)."],
        answer: "\\(\\tan^{-1}(e^x) + c\\)",
      },
      practiceSet: [
        { prompt: "Evaluate \\(\\int \\dfrac{\\sec^2 x}{\\sqrt{4 - \\tan^2 x}}\\,dx\\).", answer: "Put \\(t = \\tan x\\): \\(\\sin^{-1}\\left(\\dfrac{\\tan x}{2}\\right) + c\\)" },
        { prompt: "Evaluate \\(\\int \\dfrac{x}{x^4 + 1}\\,dx\\).", answer: "Put \\(t = x^2\\), \\(x\\,dx = \\dfrac{dt}{2}\\): \\(\\dfrac{1}{2}\\tan^{-1}(x^2) + c\\)" },
      ],
      pyqExampleId: "c8d678b1-6257-4117-8255-a65449edda17",
      traps: [
        {
          title: "Substituting without the derivative present",
          body: "\\(t = \\sin x\\) works only if \\(\\cos x\\,dx\\) is there to become \\(dt\\). Check the numerator before you choose \\(t\\).",
        },
        {
          title: "Stopping at t",
          body: "\\(\\tan^{-1}(t + 2)\\) is not the answer to a question in \\(x\\). Put \\(t = \\sin x\\) back in the last line.",
        },
      ],
    },
  ],
};
