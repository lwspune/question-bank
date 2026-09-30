import type { SubtopicNote } from "@/app/notes/_types";

export const FUNCTIONAL_DIFF_NOTE: SubtopicNote = {
  subtopicName: "Functional Equations and Derivative Constants",
  title: "Functional Equations and Derivative Constants",
  oneLineDefinition:
    "Finding a function from a relation it satisfies, and handling polynomials whose own derivative values appear as their coefficients.",
  whyItMatters:
    "Fifteen PYQs, nine of them multiple choice, and two from 2026. Eight start from a relation the function satisfies — in x and y, in x and 1/x, or in x and x + 1 — and find the function or its derivative; seven are polynomials, four of which carry their own derivative values as coefficients while three match coefficients or evaluate f and f′ directly. Two ideas cover the page.",
  concepts: [
    // C1 — functional equations
    {
      kind: "formula" as const,
      slug: "jdiff-funceq",
      name: "Functional equations",
      intuition:
        "An equation like \\(f(x+y)=f(x)f(y)\\) holds for every \\(x\\) and \\(y\\), so choose convenient values. Put \\(x=y=0\\) to find \\(f(0)\\). Then either recognise the standard solution, or write \\(f(x+h)\\) with the equation and take the limit that defines \\(f'(x)\\): that gives a differential equation for \\(f\\). When \\(f(x)\\) appears with \\(f\\left(\\frac1x\\right)\\), replace \\(x\\) by \\(\\frac1x\\) and solve the two equations together.",
      definition:
        "- \\(f(x+y)=f(x)+f(y)\\), differentiable: \\(f(x)=kx\\).\n" +
        "- \\(f(x+y)=f(x)f(y)\\), never zero: \\(f(x)=e^{kx}\\) with \\(k=f'(0)\\).\n" +
        "- \\(f(xy)=f(x)+f(y)\\) for \\(x>0\\): \\(f(x)=k\\ln x\\).\n" +
        "- \\(f(x)\\) with \\(f\\left(\\frac1x\\right)\\): swap \\(x\\) and \\(\\frac1x\\), then solve two linear equations.",
      formula: {
        label: "Derivative from the equation",
        latex: "f(x+y)=f(x)f(y)\\ \\Rightarrow\\ f'(x)=\\lim_{h\\to0}f(x)\\frac{f(h)-1}{h}=f'(0)\\,f(x)",
      },
      authoredExample: {
        prompt: "\\(f(x+y)=f(x)+f(y)+xy\\) for all \\(x,y\\), and \\(f'(0)=1\\). Find \\(f(x)\\).",
        steps: [
          "\\(x=y=0\\) gives \\(f(0)=0\\).",
          "\\(f(x+h)-f(x)=f(h)+xh\\), so \\(f'(x)=\\lim_{h\\to0}\\frac{f(h)}{h}+x=1+x\\).",
          "Integrate, using \\(f(0)=0\\).",
        ],
        answer: "\\(f(x)=x+\\frac{x^2}{2}\\).",
      },
      selfCheckExample: {
        prompt: "\\(2f(x)+f\\left(\\frac1x\\right)=3x\\) for \\(x\\ne0\\). Find \\(f'(1)\\).",
        steps: [
          "Swap: \\(2f\\left(\\frac1x\\right)+f(x)=\\frac3x\\).",
          "Twice the first minus the second: \\(3f(x)=6x-\\frac3x\\), so \\(f(x)=2x-\\frac1x\\).",
          "\\(f'(x)=2+\\frac{1}{x^2}\\).",
        ],
        answer: "\\(f'(1)=3\\).",
      },
      practiceSet: [
        { prompt: "\\(f(x+y)=f(x)f(y)\\), \\(f\\) never zero, \\(f'(0)=2\\): \\(f(x)\\)?", answer: "\\(e^{2x}\\)" },
        { prompt: "\\(f(x+y)=f(x)+f(y)\\), \\(f'(0)=5\\): \\(f(3)\\)?", answer: "\\(15\\)" },
        { prompt: "\\(f(xy)=f(x)+f(y)\\) for \\(x,y>0\\), \\(f'(1)=2\\): \\(f(e)\\)?", answer: "\\(2\\)" },
        { prompt: "\\(|f(x)-f(y)|\\le(x-y)^2\\) for all \\(x,y\\), \\(f(0)=2\\): \\(f(5)\\)?", answer: "\\(2\\) (\\(f'=0\\) everywhere)" },
      ],
      pyqExampleId: "bf999159-814f-48e5-8b6a-5e507ec64435", // 2025 — f(x + y) = f(x)f′(y) + f′(x)f(y); sum of ln f(n)
      traps: [
        {
          title: "Find f(0) first",
          body: "Most of these equations fix \\(f(0)\\) before anything else: \\(f(0)=f(0)^2\\) gives \\(f(0)=1\\) when \\(f\\) never vanishes, and \\(f(0)=2f(0)\\) gives \\(f(0)=0\\). Skipping it leaves an unknown constant in the answer.",
        },
      ],
    },

    // C2 — derivative values as constants
    {
      kind: "formula" as const,
      slug: "jdiff-constants",
      name: "Derivative values as constants",
      intuition:
        "In \\(f(x)=x^3+x^2f'(1)+xf''(2)+f'''(3)\\), the values \\(f'(1)\\), \\(f''(2)\\) and \\(f'''(3)\\) are just numbers. Name them \\(a\\), \\(b\\), \\(c\\), differentiate the cubic, and evaluate at 1, 2 and 3 to get equations for them. Start from the top: \\(f'''\\) of a cubic is a constant, so \\(c\\) comes first.",
      definition:
        "- Replace each derivative value by a letter: it is a constant.\n" +
        "- Differentiate the polynomial, then evaluate at the stated points.\n" +
        "- Solve from the highest derivative down.\n" +
        "- Given values of \\(f\\), \\(f'\\), \\(f''\\) at one point fix the coefficients the same way.",
      formula: {
        label: "For a cubic",
        latex: "f(x)=x^3+ax^2+bx+c\\ \\Rightarrow\\ f'(x)=3x^2+2ax+b,\\quad f''(x)=6x+2a,\\quad f'''(x)=6",
      },
      authoredExample: {
        prompt: "\\(f(x)=x^3+x^2f'(0)+xf''(1)+f'''(2)\\). Find \\(f(x)\\).",
        steps: [
          "Let \\(a=f'(0),\\ b=f''(1),\\ c=f'''(2)\\), so \\(f(x)=x^3+ax^2+bx+c\\).",
          "\\(f'''=6\\) gives \\(c=6\\); \\(f''(1)=6+2a=b\\); \\(f'(0)=b=a\\).",
          "So \\(a=6+2a\\), which gives \\(a=b=-6\\).",
        ],
        answer: "\\(f(x)=x^3-6x^2-6x+6\\).",
      },
      selfCheckExample: {
        prompt: "\\(f(x)=x^3+x^2f'(1)+f''(1)\\). Find \\(f(1)\\).",
        steps: [
          "Let \\(a=f'(1),\\ b=f''(1)\\). Then \\(f'(x)=3x^2+2ax\\) and \\(f''(x)=6x+2a\\).",
          "\\(a=3+2a\\) gives \\(a=-3\\); then \\(b=6+2a=0\\).",
          "\\(f(x)=x^3-3x^2\\).",
        ],
        answer: "\\(f(1)=-2\\).",
      },
      practiceSet: [
        { prompt: "\\(f(x)=x^2+f'(1)\\): \\(f(0)\\)?", answer: "\\(2\\)" },
        { prompt: "\\(f(x)=x^2+xf''(0)\\): \\(f'(1)\\)?", answer: "\\(4\\)" },
        { prompt: "\\(f(x)=ax^2+bx\\) with \\(f'(1)=5\\), \\(f''(1)=4\\): \\(a\\) and \\(b\\)?", answer: "\\(a=2,\\ b=1\\)" },
        { prompt: "\\(f(x)=x^3+f'''(5)\\): \\(f(0)\\)?", answer: "\\(6\\)" },
      ],
      pyqExampleId: "f8da4b93-6a1e-4122-bb71-5eb9ea12532a", // 2026 — f(x) = x³ + x²f′(1) + 2xf″(2) + f‴(3); f′(5)
      traps: [
        {
          title: "The coefficient is not a function",
          body: "\\(f'(1)\\) is a number, so \\(x^2f'(1)\\) differentiates to \\(2xf'(1)\\). Treating \\(f'(1)\\) as a function of \\(x\\) and using the product rule gives wrong equations.",
        },
      ],
    },
  ],
};
