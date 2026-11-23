import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_MA_II_PARTS_NOTE: SubtopicNote = {
  subtopicName: "Integration by Parts",
  title: "Integration by Parts",
  oneLineDefinition:
    "The integral of a product of two functions is found by integrating one and differentiating the other, choosing the first function by the LIATE order; it also gives the integrals that come back to themselves, the root integrals and the eˣ[f(x) + f′(x)] rule.",
  whyItMatters:
    "80 questions, the largest page of the chapter. Fourteen were set in board papers, more than on any other page: the proof of the rule (2017, 2022), log x (2022, 2024), x log x (2026), x tan⁻¹x (2023), x² sin 3x (2024), sec³x (2015), the proofs of the integrals of √(x² − a²) (2015) and √(a² − x²) (2016, 2025), and eˣ[f(x) + f′(x)] forms (2015, 2018, 2025, and an MCQ in 2026). The textbook rows are Exercise 3.3, its solved examples and Miscellaneous items.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscmii-liate",
      name: "The rule of integration by parts and the LIATE order",
      intuition:
        "Parts is the product rule read backwards. Of the two functions, one is integrated and the other differentiated, and the trade is worth making when the differentiated one gets simpler: a power of x drops, a log or an inverse tangent turns into a plain fraction. The LIATE order tells you which one to differentiate.",
      definition:
        "- **Theorem:** if \\(u\\) and \\(v\\) are functions of \\(x\\), then \\(\\int uv\\,dx = u\\int v\\,dx - \\int\\left[\\dfrac{du}{dx}\\int v\\,dx\\right]dx\\).\n" +
        "- **Proof:** let \\(w = \\int v\\,dx\\), so \\(\\dfrac{dw}{dx} = v\\).\n" +
        "- By the product rule, \\(\\dfrac{d}{dx}(uw) = u\\dfrac{dw}{dx} + w\\dfrac{du}{dx} = uv + w\\dfrac{du}{dx}\\).\n" +
        "- Integrate both sides: \\(uw = \\int uv\\,dx + \\int w\\dfrac{du}{dx}\\,dx\\).\n" +
        "- Transpose and put back \\(w = \\int v\\,dx\\) to get the result.\n" +
        "- **LIATE:** take as the first function \\(u\\) whichever comes first in Logarithmic, Inverse trigonometric, Algebraic, Trigonometric, Exponential.\n" +
        "- A lone \\(\\log x\\) or \\(\\tan^{-1} x\\): write it as \\(\\log x \\cdot 1\\) and take 1 as the second function.",
      formula: {
        label: "Integration by parts",
        latex: "\\int uv\\,dx = u\\int v\\,dx - \\int\\left[\\frac{du}{dx}\\int v\\,dx\\right]dx",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\int x^2 e^x\\,dx\\).",
        steps: [
          "By LIATE, \\(u = x^2\\) (algebraic) and \\(v = e^x\\) (exponential).",
          "\\(\\int x^2 e^x\\,dx = x^2 e^x - \\int 2x\\,e^x\\,dx\\).",
          "Parts again on \\(\\int x\\,e^x\\,dx = x e^x - \\int e^x\\,dx = x e^x - e^x\\).",
          "\\(\\int x^2 e^x\\,dx = x^2 e^x - 2(x e^x - e^x) + c\\).",
          "\\(\\therefore \\int x^2 e^x\\,dx = e^x(x^2 - 2x + 2) + c\\).",
        ],
        answer: "\\(e^x(x^2 - 2x + 2) + c\\)",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\int x\\cos x\\,dx\\).",
        steps: ["\\(u = x\\), \\(v = \\cos x\\): \\(x\\sin x - \\int \\sin x\\,dx\\)."],
        answer: "\\(x\\sin x + \\cos x + c\\)",
      },
      practiceSet: [
        { prompt: "Evaluate \\(\\int \\tan^{-1} x\\,dx\\).", answer: "Take \\(\\tan^{-1}x\\cdot 1\\): \\(x\\tan^{-1} x - \\dfrac{1}{2}\\log(1 + x^2) + c\\)" },
        { prompt: "Evaluate \\(\\int x^2\\log x\\,dx\\).", answer: "\\(u = \\log x\\): \\(\\dfrac{x^3}{3}\\log x - \\dfrac{x^3}{9} + c\\)" },
        { prompt: "Evaluate \\(\\int x e^{-x}\\,dx\\).", answer: "\\(-x e^{-x} - e^{-x} + c = -e^{-x}(x + 1) + c\\)" },
      ],
      pyqExampleId: "5a1fc5f7-01da-4006-a4c3-7bb87e414461",
      traps: [
        {
          title: "Choosing the wrong first function",
          body: "In \\(\\int x e^x\\,dx\\), taking \\(e^x\\) as \\(u\\) leads to \\(\\int x^2 e^x\\,dx\\), which is harder. Follow LIATE: the algebraic \\(x\\) comes before the exponential.",
        },
        {
          title: "Losing a sign in the second round",
          body: "When parts is used twice, the minus in front of the second integral changes the sign of every term it produces. Bracket the second round before opening it.",
        },
        {
          title: "Proving the rule without naming the functions",
          body: "A proof asked for marks must state that \\(u\\) and \\(v\\) are functions of \\(x\\), use the product rule, integrate both sides and transpose. Writing the formula and one example is not a proof.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmii-cyclic",
      name: "Integrals that come back: eᵃˣ sin bx, sin(log x) and sec³x",
      intuition:
        "With eᵃˣ sin bx, parts never makes either function simpler: after two rounds the original integral appears again on the right. That is good news. Call the integral I, move the copy to the left, and solve for I like an equation.",
      definition:
        "- Call the integral \\(I\\) and apply parts twice, keeping the same kind of function as \\(u\\) both times.\n" +
        "- For \\(e^{ax}\\sin bx\\) and \\(e^{ax}\\cos bx\\) either function may be taken first.\n" +
        "- When \\(I\\) appears on the right, move it to the left and divide.\n" +
        "- \\(\\int e^{ax}\\sin bx\\,dx = \\dfrac{e^{ax}}{a^2 + b^2}(a\\sin bx - b\\cos bx) + c\\) and \\(\\int e^{ax}\\cos bx\\,dx = \\dfrac{e^{ax}}{a^2 + b^2}(a\\cos bx + b\\sin bx) + c\\).\n" +
        "- \\(\\int \\sec^3 x\\,dx\\): write \\(\\sec x\\cdot\\sec^2 x\\), take \\(u = \\sec x\\), and use \\(\\tan^2 x = \\sec^2 x - 1\\).\n" +
        "- \\(\\int \\sin(\\log x)\\,dx\\): write \\(\\sin(\\log x)\\cdot 1\\).",
      formula: {
        label: "Exponential times sine",
        latex: "\\int e^{ax}\\sin bx\\,dx = \\frac{e^{ax}}{a^2 + b^2}\\left(a\\sin bx - b\\cos bx\\right) + c",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\int e^x\\cos 2x\\,dx\\).",
        steps: [
          "Let \\(I = \\int e^x\\cos 2x\\,dx\\). Take \\(u = \\cos 2x\\): \\(I = e^x\\cos 2x + 2\\int e^x\\sin 2x\\,dx\\).",
          "Again with \\(u = \\sin 2x\\): \\(\\int e^x\\sin 2x\\,dx = e^x\\sin 2x - 2\\int e^x\\cos 2x\\,dx = e^x\\sin 2x - 2I\\).",
          "So \\(I = e^x\\cos 2x + 2e^x\\sin 2x - 4I\\).",
          "\\(5I = e^x(\\cos 2x + 2\\sin 2x)\\).",
          "\\(\\therefore \\int e^x\\cos 2x\\,dx = \\dfrac{e^x}{5}(\\cos 2x + 2\\sin 2x) + c\\).",
        ],
        answer: "\\(\\dfrac{e^x}{5}(\\cos 2x + 2\\sin 2x) + c\\)",
      },
      selfCheckExample: {
        prompt: "Use the standard result for \\(\\int e^{ax}\\sin bx\\,dx\\) to write \\(\\int e^{2x}\\sin x\\,dx\\).",
        steps: ["\\(a = 2\\), \\(b = 1\\), \\(a^2 + b^2 = 5\\)."],
        answer: "\\(\\dfrac{e^{2x}}{5}(2\\sin x - \\cos x) + c\\)",
      },
      practiceSet: [
        { prompt: "Evaluate \\(\\int \\cos(\\log x)\\,dx\\).", answer: "\\(\\dfrac{x}{2}\\left[\\cos(\\log x) + \\sin(\\log x)\\right] + c\\)" },
        { prompt: "Evaluate \\(\\int e^{-x}\\sin x\\,dx\\).", answer: "\\(a = -1\\), \\(b = 1\\): \\(-\\dfrac{e^{-x}}{2}(\\sin x + \\cos x) + c\\)" },
      ],
      pyqExampleId: "61f7584d-3050-456b-ad4f-8a89351e9f98",
      traps: [
        {
          title: "Changing the first function in the second round",
          body: "If you take \\(u = \\cos 2x\\) first and then \\(u = e^x\\), the second round undoes the first and you reach \\(I = I\\). Keep the same kind of function as \\(u\\) both times.",
        },
        {
          title: "Going round forever",
          body: "Stop as soon as the original integral appears again. Collect it on the left; a third round only adds work and sign slips.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmii-roots",
      name: "Integrals of √(a² − x²), √(x² + a²) and √(x² − a²)",
      intuition:
        "These three are proved by parts with 1 as the second function, and each proof uses the same trick: the integral comes back, so collect it and halve. Learn the three results side by side; only the last term changes between them.",
      definition:
        "- \\(\\int \\sqrt{a^2 - x^2}\\,dx = \\dfrac{x}{2}\\sqrt{a^2 - x^2} + \\dfrac{a^2}{2}\\sin^{-1}\\dfrac{x}{a} + c\\)\n" +
        "- \\(\\int \\sqrt{x^2 + a^2}\\,dx = \\dfrac{x}{2}\\sqrt{x^2 + a^2} + \\dfrac{a^2}{2}\\log\\left|x + \\sqrt{x^2 + a^2}\\right| + c\\)\n" +
        "- \\(\\int \\sqrt{x^2 - a^2}\\,dx = \\dfrac{x}{2}\\sqrt{x^2 - a^2} - \\dfrac{a^2}{2}\\log\\left|x + \\sqrt{x^2 - a^2}\\right| + c\\)\n" +
        "- **Proof of the first:** let \\(I = \\int \\sqrt{a^2 - x^2}\\cdot 1\\,dx\\).\n" +
        "- By parts, \\(I = x\\sqrt{a^2 - x^2} - \\int x\\cdot\\dfrac{-x}{\\sqrt{a^2 - x^2}}\\,dx = x\\sqrt{a^2 - x^2} + \\int \\dfrac{x^2}{\\sqrt{a^2 - x^2}}\\,dx\\).\n" +
        "- Write \\(x^2 = a^2 - (a^2 - x^2)\\): \\(\\int \\dfrac{x^2}{\\sqrt{a^2 - x^2}}\\,dx = a^2\\sin^{-1}\\dfrac{x}{a} - I\\).\n" +
        "- So \\(I = x\\sqrt{a^2 - x^2} + a^2\\sin^{-1}\\dfrac{x}{a} - I\\); then \\(2I\\) gives the result.\n" +
        "- For \\(\\sqrt{ax^2 + bx + c}\\), complete the square first.",
      formula: {
        label: "Root of a² − x²",
        latex: "\\int \\sqrt{a^2 - x^2}\\,dx = \\frac{x}{2}\\sqrt{a^2 - x^2} + \\frac{a^2}{2}\\sin^{-1}\\frac{x}{a} + c",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\int \\sqrt{x^2 + 4x + 13}\\,dx\\).",
        steps: [
          "Complete the square: \\(x^2 + 4x + 13 = (x + 2)^2 + 3^2\\).",
          "Use \\(\\int \\sqrt{u^2 + a^2}\\,du\\) with \\(u = x + 2\\), \\(a = 3\\).",
          "\\(= \\dfrac{x + 2}{2}\\sqrt{(x + 2)^2 + 9} + \\dfrac{9}{2}\\log\\left|x + 2 + \\sqrt{(x + 2)^2 + 9}\\right| + c\\).",
          "\\(\\therefore \\int \\sqrt{x^2 + 4x + 13}\\,dx = \\dfrac{x + 2}{2}\\sqrt{x^2 + 4x + 13} + \\dfrac{9}{2}\\log\\left|x + 2 + \\sqrt{x^2 + 4x + 13}\\right| + c\\).",
        ],
        answer: "\\(\\dfrac{x + 2}{2}\\sqrt{x^2 + 4x + 13} + \\dfrac{9}{2}\\log\\left|x + 2 + \\sqrt{x^2 + 4x + 13}\\right| + c\\)",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\int \\sqrt{x^2 - 9}\\,dx\\).",
        steps: ["Use the third result with \\(a = 3\\)."],
        answer: "\\(\\dfrac{x}{2}\\sqrt{x^2 - 9} - \\dfrac{9}{2}\\log\\left|x + \\sqrt{x^2 - 9}\\right| + c\\)",
      },
      practiceSet: [
        { prompt: "Evaluate \\(\\int \\sqrt{9x^2 + 16}\\,dx\\).", answer: "Take 3 out: \\(\\dfrac{x}{2}\\sqrt{9x^2 + 16} + \\dfrac{8}{3}\\log\\left|3x + \\sqrt{9x^2 + 16}\\right| + c\\)" },
        { prompt: "Evaluate \\(\\int \\sqrt{6x - x^2}\\,dx\\).", answer: "\\(6x - x^2 = 9 - (x - 3)^2\\): \\(\\dfrac{x - 3}{2}\\sqrt{6x - x^2} + \\dfrac{9}{2}\\sin^{-1}\\left(\\dfrac{x - 3}{3}\\right) + c\\)" },
      ],
      pyqExampleId: "01670ee9-ba96-4285-8c88-0ec392e9f644",
      traps: [
        {
          title: "The sign of the log term",
          body: "\\(\\int \\sqrt{x^2 + a^2}\\,dx\\) ends in \\(+\\dfrac{a^2}{2}\\log\\), but \\(\\int \\sqrt{x^2 - a^2}\\,dx\\) ends in \\(-\\dfrac{a^2}{2}\\log\\). Check the sign under the root before you write it.",
        },
        {
          title: "Forgetting the factor taken out of the root",
          body: "\\(\\sqrt{9x^2 + 16} = 3\\sqrt{x^2 + \\frac{16}{9}}\\). The 3 multiplies the whole standard result, and \\(a^2\\) is \\(\\dfrac{16}{9}\\), not 16.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmii-exfx",
      name: "The rule for eˣ[f(x) + f′(x)]",
      intuition:
        "The derivative of eˣ f(x) is eˣ f(x) + eˣ f′(x). So when eˣ multiplies a function plus its own derivative, the answer is just eˣ times the function. The work is in spotting the pair: split the bracket, and an identity often shows it.",
      definition:
        "- \\(\\int e^x[f(x) + f'(x)]\\,dx = e^x f(x) + c\\).\n" +
        "- Reason: \\(\\dfrac{d}{dx}[e^x f(x)] = e^x f(x) + e^x f'(x)\\).\n" +
        "- Split the bracket into a function and its derivative. Identities help: \\(\\dfrac{1 + \\sin x}{1 + \\cos x} = \\dfrac{1}{2}\\sec^2\\dfrac{x}{2} + \\tan\\dfrac{x}{2}\\).\n" +
        "- With \\(e^{\\sin^{-1} x}\\) or \\(e^{\\tan^{-1} x}\\), put \\(t = \\sin^{-1} x\\) (or \\(\\tan^{-1} x\\)) first; with \\(\\log x\\) inside, put \\(x = e^t\\).",
      formula: {
        label: "The eˣ rule",
        latex: "\\int e^x\\left[f(x) + f'(x)\\right]dx = e^x f(x) + c",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\int e^x\\left(\\dfrac{1 + x\\log x}{x}\\right)dx\\).",
        steps: [
          "Split the bracket: \\(\\dfrac{1 + x\\log x}{x} = \\log x + \\dfrac{1}{x}\\).",
          "Take \\(f(x) = \\log x\\), so \\(f'(x) = \\dfrac{1}{x}\\): the integrand is \\(e^x[f(x) + f'(x)]\\).",
          "\\(\\int e^x[f(x) + f'(x)]\\,dx = e^x f(x) + c\\).",
          "\\(\\therefore \\int e^x\\left(\\dfrac{1 + x\\log x}{x}\\right)dx = e^x\\log x + c\\).",
        ],
        answer: "\\(e^x\\log x + c\\)",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\int e^x(\\sin x + \\cos x)\\,dx\\).",
        steps: ["\\(f(x) = \\sin x\\), \\(f'(x) = \\cos x\\)."],
        answer: "\\(e^x\\sin x + c\\)",
      },
      practiceSet: [
        { prompt: "Evaluate \\(\\int e^x\\left(\\tan^{-1} x + \\dfrac{1}{1 + x^2}\\right)dx\\).", answer: "\\(e^x\\tan^{-1} x + c\\)" },
        { prompt: "Evaluate \\(\\int e^x(\\sec x + \\sec x\\tan x)\\,dx\\).", answer: "\\(e^x\\sec x + c\\)" },
      ],
      pyqExampleId: "0187fbe6-c81a-46a3-9ea1-30555c262411",
      traps: [
        {
          title: "Taking the wrong part as f",
          body: "In \\(e^x(\\tan x + \\sec^2 x)\\), \\(f(x) = \\tan x\\), because its derivative is \\(\\sec^2 x\\). The answer is \\(e^x\\tan x + c\\), not \\(e^x\\sec^2 x + c\\).",
        },
        {
          title: "Skipping the substitution with e to the power sin⁻¹x",
          body: "The rule is for \\(e^x\\). With \\(e^{\\sin^{-1} x}\\), put \\(t = \\sin^{-1} x\\) and change \\(\\dfrac{dx}{\\sqrt{1 - x^2}}\\) into \\(dt\\) before you look for \\(f(t) + f'(t)\\).",
        },
      ],
    },
  ],
};
