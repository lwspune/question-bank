import type { SubtopicNote } from "@/app/notes/_types";

export const LEIBNIZ_DI_NOTE: SubtopicNote = {
  subtopicName: "Integral Equations and Leibniz's Rule",
  title: "Integral Equations and Leibniz's Rule",
  oneLineDefinition:
    "Integrals whose limits depend on x, differentiated by Leibniz's rule; equations in which a definite integral is an unknown constant; and equations of the form ∫ f(λx) dλ = a f(x), solved by power functions.",
  whyItMatters:
    "Twenty-eight PYQs. Two thirds give an equation containing an integral with a variable limit: differentiating removes the integral and leaves a differential equation. The rest hide constants inside integrals or scale the variable. Three ideas cover the page.",
  concepts: [
    // C1 — Leibniz
    {
      kind: "formula" as const,
      slug: "jdi-leibniz",
      name: "Differentiating an integral with variable limits",
      intuition:
        "\\(\\frac{d}{dx}\\int_{u(x)}^{v(x)}f(t)\\,dt=f(v)\\,v'-f(u)\\,u'\\). Differentiating an equation that contains such an integral removes the integral and leaves an ordinary equation in \\(f\\), usually a first-order linear differential equation. Putting \\(x\\) equal to the lower limit, where the integral is 0, gives the constant. For a limit of an integral over a power of \\((x-a)\\), use L'Hôpital's rule with this derivative.",
      definition:
        "- \\(\\frac{d}{dx}\\int_{u(x)}^{v(x)}f(t)\\,dt=f(v(x))v'(x)-f(u(x))u'(x)\\).\n" +
        "- At the lower limit the integral is 0: this fixes a constant.\n" +
        "- \\(\\int_0^x(x-t)f(t)\\,dt\\): differentiate once to \\(\\int_0^xf\\), twice to \\(f(x)\\).",
      formula: {
        label: "Leibniz's rule",
        latex: "\\frac{d}{dx}\\int_{u(x)}^{v(x)}f(t)\\,dt=f\\big(v(x)\\big)v'(x)-f\\big(u(x)\\big)u'(x)",
      },
      authoredExample: {
        prompt: "\\(F(x)=\\int_0^{x^2}\\sqrt{1+t}\\,dt\\). Find \\(F'(1)\\).",
        steps: [
          "\\(F'(x)=\\sqrt{1+x^2}\\cdot2x\\).",
        ],
        answer: "\\(2\\sqrt2\\).",
      },
      selfCheckExample: {
        prompt: "\\(\\int_0^xf(t)\\,dt=x^2+x\\). Find \\(f(3)\\).",
        steps: [
          "Differentiate: \\(f(x)=2x+1\\).",
        ],
        answer: "\\(7\\).",
      },
      practiceSet: [
        { prompt: "\\(\\frac{d}{dx}\\int_1^x\\ln t\\,dt\\)?", answer: "\\(\\ln x\\)" },
        { prompt: "\\(\\frac{d}{dx}\\int_x^2t^2\\,dt\\)?", answer: "\\(-x^2\\)" },
        { prompt: "\\(\\lim_{x\\to0}\\frac1x\\int_0^x\\cos t\\,dt\\)?", answer: "\\(1\\)" },
        { prompt: "\\(\\int_0^xtf(t)\\,dt=x^3\\). \\(f(x)\\)?", answer: "\\(3x\\)" },
      ],
      pyqExampleId: "5cfd4c41-7470-430d-8a6d-27a6e55fcaf3", // 2025 — integral of t f(t) from 0 to x equals x^2 f(x), f(2) = 3
      traps: [
        {
          title: "The chain factor",
          body: "An upper limit \\(x^2\\) brings a factor \\(2x\\); a lower limit contributes with a minus sign. Forgetting either is the usual slip.",
        },
      ],
    },

    // C2 — integrals as constants
    {
      kind: "formula" as const,
      slug: "jdi-integral-constant",
      name: "Definite integrals as unknown constants",
      intuition:
        "A definite integral with fixed limits is a number. In \\(f(x)=x+\\int_0^1(x-t)f(t)\\,dt\\), take the \\(x\\) out: \\(f(x)=x+Ax-B\\) with \\(A=\\int_0^1f\\) and \\(B=\\int_0^1tf\\). Substitute this form back into the definitions of \\(A\\) and \\(B\\); that gives linear equations for the constants.",
      definition:
        "- Only the part independent of \\(x\\) is constant: split \\(\\sin(x+y)=\\sin x\\cos y+\\cos x\\sin y\\) first.\n" +
        "- Name each integral: \\(A,B,\\dots\\); write \\(f\\) in terms of them.\n" +
        "- Substitute back and solve the linear system.",
      formula: {
        label: "The form it forces",
        latex: "f(x)=g(x)+A\\,h(x),\\qquad A=\\int_a^b k(t)f(t)\\,dt",
      },
      authoredExample: {
        prompt: "\\(f(x)=1+x\\int_0^1f(t)\\,dt\\). Find \\(f(x)\\).",
        steps: [
          "\\(f(x)=1+Ax\\) with \\(A=\\int_0^1(1+At)\\,dt=1+\\frac A2\\).",
          "So \\(A=2\\).",
        ],
        answer: "\\(f(x)=1+2x\\).",
      },
      selfCheckExample: {
        prompt: "\\(f(x)=x^2+\\frac12\\int_0^1f(t)\\,dt\\). Find \\(f(1)\\).",
        steps: [
          "\\(f=x^2+\\frac A2\\), \\(A=\\frac13+\\frac A2\\), so \\(A=\\frac23\\) and \\(f(x)=x^2+\\frac13\\).",
        ],
        answer: "\\(\\frac43\\).",
      },
      practiceSet: [
        { prompt: "\\(f(x)=x+\\int_0^{\\pi/2}\\sin x\\cos y\\,f(y)\\,dy\\): the form of \\(f\\)?", answer: "\\(x+K\\sin x\\)" },
        { prompt: "\\(f(x)=2x+\\frac A2\\) with \\(A=\\int_0^1f\\). \\(A\\)?", answer: "\\(2\\)" },
        { prompt: "\\(f(x)=1+\\int_0^1xt\\,f(t)\\,dt\\): the form of \\(f\\)?", answer: "\\(1+Bx\\)" },
        { prompt: "How many constants in \\(f(x)=x+\\int_0^1(x-t)f(t)\\,dt\\)?", answer: "Two" },
      ],
      pyqExampleId: "05642dd9-7868-45c9-aadb-cc288d3e6751", // 2021 — f(x) = x + integral of sin x cos y f(y) over [0, pi/2]
      traps: [
        {
          title: "x inside the integral is not a constant",
          body: "In \\(\\int_0^1(x-t)f(t)\\,dt\\) the \\(x\\) must come out first: it is \\(x\\int f-\\int tf\\). Naming the whole integral a constant is wrong.",
        },
      ],
    },

    // C3 — scaling
    {
      kind: "formula" as const,
      slug: "jdi-scaling",
      name: "Integrals of f(λx): power-function solutions",
      intuition:
        "Putting \\(s=\\lambda x\\) turns \\(\\int_0^1f(\\lambda x)\\,d\\lambda\\) into \\(\\frac1x\\int_0^xf(s)\\,ds\\). An equation '\\(\\int_0^1f(\\lambda x)\\,d\\lambda=a\\,f(x)\\)' is solved by a power \\(f=cx^k\\), because then the left side is \\(\\frac{f(x)}{k+1}\\). The given values of \\(f\\) fix \\(k\\) and \\(c\\).",
      definition:
        "- \\(\\int_0^1f(\\lambda x)\\,d\\lambda=\\frac1x\\int_0^xf(s)\\,ds\\).\n" +
        "- \\(f=cx^k\\Rightarrow\\int_0^1f(\\lambda x)\\,d\\lambda=\\frac{f(x)}{k+1}\\), so \\(a=\\frac1{k+1}\\).\n" +
        "- Two values of \\(f\\) fix \\(c\\) and \\(k\\).",
      formula: {
        label: "Power functions",
        latex: "f(x)=cx^k\\ \\Rightarrow\\ \\int_0^1 f(\\lambda x)\\,d\\lambda=\\frac{f(x)}{k+1}",
      },
      authoredExample: {
        prompt: "\\(\\int_0^1f(\\lambda x)\\,d\\lambda=\\frac13f(x)\\) and \\(f(1)=2\\). Find \\(f(3)\\).",
        steps: [
          "\\(\\frac1{k+1}=\\frac13\\): \\(k=2\\), \\(f(x)=2x^2\\).",
        ],
        answer: "\\(18\\).",
      },
      selfCheckExample: {
        prompt: "\\(\\int_0^1f(\\lambda x)\\,d\\lambda=\\frac23f(x)\\) and \\(f(4)=2\\). Find \\(f(9)\\).",
        steps: [
          "\\(k=\\frac12\\), \\(f=c\\sqrt x\\), \\(2c=2\\).",
        ],
        answer: "\\(3\\).",
      },
      practiceSet: [
        { prompt: "\\(a\\) for \\(f(x)=x^3\\)?", answer: "\\(\\frac14\\)" },
        { prompt: "\\(a\\) for \\(f(x)=x^{-1/2}\\)?", answer: "\\(2\\)" },
        { prompt: "\\(\\int_0^2f\\left(\\frac{tx}2\\right)dt\\) with \\(s=\\frac{tx}2\\)?", answer: "\\(\\frac2x\\int_0^xf(s)\\,ds\\)" },
        { prompt: "Power law with \\(f(1)=1\\), \\(f(16)=\\frac18\\): \\(k\\)?", answer: "\\(-\\frac34\\)" },
      ],
      pyqExampleId: "a19f378d-be83-4546-a188-422735a33c4f", // 2022 — f(x) = (2/sqrt 3) integral of f(lambda^2 x/3), f(1) = sqrt 3
      traps: [
        {
          title: "Confirm the guess",
          body: "A power function is a guess. Check that it satisfies the equation for every \\(x\\), and that the value of \\(a\\) it forces matches the one given.",
        },
      ],
    },
  ],
};
