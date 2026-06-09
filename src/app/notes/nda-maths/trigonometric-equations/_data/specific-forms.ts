import type { SubtopicNote } from "@/app/notes/_types";

export const SPECIFIC_FORMS_NOTE: SubtopicNote = {
  subtopicName: "Solving Specific Forms — Double-Angle, Product, Logarithmic, and Vieta",
  title: "Specific Forms — Vieta, Products & Logarithms",
  oneLineDefinition:
    "A recurring set of disguises: trig ratios appearing as the roots of a quadratic (use Vieta's relations), product equations that collapse via tan(A+B), and logarithmic trig equations solved by a substitution.",
  whyItMatters:
    "13 PYQs. These look different but each has a signature move — Vieta's sum/product when trig values are roots, the tan-sum identity for (1+tan)(1+tan) products, and t + 1/t for logarithmic pairs. Recognise the form and the solution is short.",
  concepts: [
    // Vieta with trig roots
    {
      kind: "formula" as const,
      slug: "te-trig-roots-vieta",
      name: "Trig Values as Roots of a Quadratic (Vieta)",
      pyqExampleId: "6f86d8d9-cbff-4c2f-8b68-9dc0d8d06f02",
      intuition:
        "When sin θ and cos θ (or tan α and tan β) are the roots of a quadratic, Vieta's relations hand you their sum and product directly — and a trig identity (like sin²+cos²=1) connects those to the coefficients without ever finding the angles.",
      definition:
        "If the trig values are roots of \\(ax^2 + bx + c = 0\\), then sum \\(= -\\tfrac{b}{a}\\) and product \\(= \\tfrac{c}{a}\\). Combine with an identity:\n" +
        "- \\(\\sin\\theta, \\cos\\theta\\) roots: \\((\\sin\\theta+\\cos\\theta)^2 = 1 + 2\\sin\\theta\\cos\\theta\\) gives a relation among \\(a,b,c\\) (here \\(a^2 - b^2 + 2ac = 0\\)).\n" +
        "- \\(\\tan\\alpha, \\tan\\beta\\) roots: \\(\\tan(\\alpha+\\beta) = \\dfrac{\\text{sum}}{1 - \\text{product}}\\).\n" +
        "- \\(\\cot\\alpha, \\cot\\beta\\) roots: \\(\\cot(\\alpha+\\beta) = \\dfrac{\\text{product} - 1}{\\text{sum}}\\).",
      formula: {
        label: "Vieta + tan-sum",
        latex: "\\tan(\\alpha+\\beta) = \\dfrac{\\tan\\alpha+\\tan\\beta}{1-\\tan\\alpha\\tan\\beta} = \\dfrac{-b/a}{1-c/a}",
      },
      authoredExample: {
        prompt: "If \\(\\tan\\alpha, \\tan\\beta\\) are roots of \\(x^2 - 5x + 6 = 0\\), find \\(\\tan(\\alpha+\\beta)\\).",
        steps: [
          "Vieta: \\(\\tan\\alpha + \\tan\\beta = 5\\), \\(\\tan\\alpha\\tan\\beta = 6\\).",
          "\\(\\tan(\\alpha+\\beta) = \\dfrac{5}{1 - 6} = \\dfrac{5}{-5}\\).",
        ],
        answer: "\\(-1\\).",
      },
    },

    // product & sum forms
    {
      kind: "formula" as const,
      slug: "te-product-and-sum-forms",
      name: "Product & Sum-to-Product Forms",
      pyqExampleId: "a6087879-ff2c-4426-9870-8ff5120e6d3e",
      intuition:
        "A product like (1+tan θ)(1+tan 9θ)=2 expands into exactly the numerator/denominator of the tan-sum formula — so it secretly says tan(10θ)=1. Sum-to-product turns sums of sines and cosines into products you can divide.",
      definition:
        "- **(1+tan A)(1+tan B) = 2** expands to \\(\\tan A + \\tan B = 1 - \\tan A\\tan B\\), i.e. \\(\\tan(A+B) = 1\\), so \\(A + B = \\tfrac{\\pi}{4}\\) (this is the classic \\(45^\\circ\\) identity).\n" +
        "- **Sum-to-product:** \\(\\sin x + \\sin y = 2\\sin\\tfrac{x+y}{2}\\cos\\tfrac{x-y}{2}\\), \\(\\cos y - \\cos x = 2\\sin\\tfrac{x+y}{2}\\sin\\tfrac{x-y}{2}\\); dividing isolates \\(\\tan\\tfrac{x-y}{2}\\).\n" +
        "- **tan(45° + θ) = 1 + sin 2θ**-type equations: expand both sides in \\(\\tan\\theta\\) and solve the resulting algebraic equation.",
      formula: {
        label: "The product identity",
        latex: "(1+\\tan A)(1+\\tan B) = 2 \\iff A + B = \\tfrac{\\pi}{4}",
      },
      authoredExample: {
        prompt: "If \\((1+\\tan\\theta)(1+\\tan(45^\\circ - \\theta)) = k\\), find \\(k\\).",
        steps: [
          "Here \\(A + B = \\theta + (45^\\circ - \\theta) = 45^\\circ\\), so \\(\\tan(A+B) = 1\\).",
          "The identity \\((1+\\tan A)(1+\\tan B) = 2\\) holds exactly when \\(A + B = 45^\\circ\\).",
        ],
        answer: "\\(k = 2\\).",
      },
    },

    // logarithmic & misc
    {
      kind: "formula" as const,
      slug: "te-logarithmic-and-misc",
      name: "Logarithmic & Special Trig Equations",
      pyqExampleId: "c5f994ab-38be-4eca-bf6b-386753c6e26f",
      intuition:
        "A logarithm with a trig base, log_{cos x} sin x, is just an exponent equation in disguise. When two reciprocal logs add to 2, the t + 1/t = 2 trick forces t = 1, collapsing it to cos x = sin x.",
      definition:
        "- **\\(\\log_{\\cos x}\\sin x = 1\\)** means \\(\\sin x = \\cos x\\), so \\(x = \\tfrac{\\pi}{4}\\) (in the first quadrant).\n" +
        "- **\\(\\log_{\\sin x}\\cos x + \\log_{\\cos x}\\sin x = 2\\):** the two terms are reciprocals \\(t + \\tfrac1t\\), and \\(t + \\tfrac1t = 2 \\Rightarrow t = 1\\), giving \\(\\sin x = \\cos x\\).\n" +
        "- **Special-angle outputs:** equations reducing to \\(\\sin 2\\theta = \\cos 3\\theta\\) give \\(\\theta = 18^\\circ\\), where \\(\\sin 18^\\circ = \\tfrac{\\sqrt5 - 1}{4}\\) — a value worth memorising.",
      formula: {
        label: "Reciprocal-log trick",
        latex: "t + \\tfrac{1}{t} = 2 \\iff t = 1",
      },
      authoredExample: {
        prompt: "Solve \\(\\log_{\\cos x}\\sin x = 1\\) for \\(0 < x < \\tfrac{\\pi}{2}\\).",
        steps: [
          "\\(\\log_{\\cos x}\\sin x = 1\\) means \\((\\cos x)^1 = \\sin x\\), i.e. \\(\\tan x = 1\\).",
        ],
        answer: "\\(x = \\dfrac{\\pi}{4}\\).",
      },
    },
  ],
};
