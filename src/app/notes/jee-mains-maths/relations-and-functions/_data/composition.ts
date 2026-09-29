import type { SubtopicNote } from "@/app/notes/_types";

export const COMPOSITION_FN_NOTE: SubtopicNote = {
  subtopicName: "Composition, Inverse and Iterates",
  title: "Composition, Inverse and Iterates",
  oneLineDefinition:
    "Functions built from other functions: composing two, recovering one from a composite, inverting a function, recognising a self-inverse map, and applying the same function many times.",
  whyItMatters:
    "Eighteen PYQs. Some compose two given functions or recover one from the composite; some find an inverse or the value that makes a function its own inverse; a few apply a function ten or a hundred times, which is only possible once a pattern shows. Three ideas cover the page.",
  concepts: [
    // C1 — composition
    {
      kind: "formula" as const,
      slug: "jfn-compose",
      name: "Composing functions, and recovering one from the other",
      intuition:
        "\\((f\\circ g)(x)=f(g(x))\\): apply \\(g\\) first, then \\(f\\). To find \\(f\\) when \\(f(g(x))\\) is given, put \\(t=g(x)\\), write \\(x\\) in terms of \\(t\\), and substitute. When \\(f\\) and \\(g\\) are polynomials, the degree of \\(f\\circ g\\) is the product of the degrees, and matching leading coefficients fixes the unknowns.",
      definition:
        "- \\((f\\circ g)(x)=f(g(x))\\); usually \\(f\\circ g\\ne g\\circ f\\).\n" +
        "- **Recover \\(f\\):** \\(t=g(x)\\), \\(x=g^{-1}(t)\\), then \\(f(t)=(f\\circ g)(g^{-1}(t))\\).\n" +
        "- \\(\\deg(f\\circ g)=\\deg f\\cdot\\deg g\\).",
      formula: {
        label: "Composition",
        latex: "(f\\circ g)(x)=f\\big(g(x)\\big)",
      },
      authoredExample: {
        prompt: "\\(f(x)=2x+1\\), \\(g(x)=x^2\\). Find \\(f(g(2))\\) and \\(g(f(2))\\).",
        steps: [
          "\\(g(2)=4\\), \\(f(4)=9\\). \\(f(2)=5\\), \\(g(5)=25\\).",
        ],
        answer: "\\(9\\) and \\(25\\).",
      },
      selfCheckExample: {
        prompt: "\\(f(x+1)=x^2+3x\\). Find \\(f(2)\\).",
        steps: [
          "Put \\(t=x+1\\): \\(f(t)=(t-1)^2+3(t-1)=t^2+t-2\\).",
        ],
        answer: "\\(f(2)=4\\).",
      },
      practiceSet: [
        { prompt: "\\(f(x)=x+2\\), \\(g(x)=3x\\): \\((g\\circ f)(1)\\)?", answer: "\\(9\\)" },
        { prompt: "\\(f(x)=x^2\\), \\(g(x)=x+1\\): \\(f(g(1))\\) and \\(g(f(1))\\)?", answer: "\\(4\\) and \\(2\\)" },
        { prompt: "\\(f(2x)=4x+1\\). \\(f(x)\\)?", answer: "\\(2x+1\\)" },
        { prompt: "\\(\\deg f=2\\), \\(\\deg g=3\\). \\(\\deg(f\\circ g)\\)?", answer: "\\(6\\)" },
      ],
      pyqExampleId: "8c891c64-b76c-4083-891e-f23b02f39e6b", // 2023 — g = sqrt(x) + 1, f(g(x)) = x + 3 - sqrt(x), find f(0)
      traps: [
        {
          title: "The inner function acts first",
          body: "\\(f\\circ g\\) means \\(g\\) first. Reading it left to right gives \\(g\\circ f\\), a different function.",
        },
      ],
    },

    // C2 — inverse
    {
      kind: "formula" as const,
      slug: "jfn-inverse",
      name: "Inverse functions and self-inverse maps",
      intuition:
        "Write \\(y=f(x)\\) and solve for \\(x\\): that expression in \\(y\\) is \\(f^{-1}(y)\\). Only a one-one onto function has an inverse. A map \\(\\frac{ax+b}{cx+d}\\) is its own inverse, so \\(f(f(x))=x\\), exactly when \\(a+d=0\\). For an increasing function, the graph of \\(f^{-1}\\) is the mirror image in \\(y=x\\), so \\(f(x)=f^{-1}(x)\\) happens only on that line: solve \\(f(x)=x\\).",
      definition:
        "- \\(y=f(x)\\iff x=f^{-1}(y)\\).\n" +
        "- \\(\\frac{ax+b}{cx+d}\\) has inverse \\(\\frac{dx-b}{-cx+a}\\); it is self-inverse iff \\(a+d=0\\).\n" +
        "- \\(f\\) increasing: \\(f(x)=f^{-1}(x)\\iff f(x)=x\\).",
      formula: {
        label: "Self-inverse Möbius map",
        latex: "f(x)=\\frac{ax+b}{cx+d},\\quad f\\circ f=\\mathrm{id}\\iff a+d=0",
      },
      authoredExample: {
        prompt: "Find the inverse of \\(f(x)=\\frac{2x+3}{x-5}\\).",
        steps: [
          "\\(y(x-5)=2x+3\\), so \\(x(y-2)=5y+3\\).",
        ],
        answer: "\\(f^{-1}(x)=\\frac{5x+3}{x-2}\\).",
      },
      selfCheckExample: {
        prompt: "For which \\(k\\) is \\(f(x)=\\frac{3x+1}{2x+k}\\) its own inverse?",
        steps: [
          "\\(a+d=3+k=0\\).",
        ],
        answer: "\\(k=-3\\).",
      },
      practiceSet: [
        { prompt: "Inverse of \\(3x-4\\)?", answer: "\\(\\frac{x+4}3\\)" },
        { prompt: "Inverse of \\(e^{2x}\\)?", answer: "\\(\\frac{\\ln x}2\\)" },
        { prompt: "\\(f\\) increasing and \\(f(x)=f^{-1}(x)\\). Solve which equation?", answer: "\\(f(x)=x\\)" },
        { prompt: "Is \\(\\frac{x+1}{x-1}\\) its own inverse?", answer: "Yes: \\(1+(-1)=0\\)" },
      ],
      pyqExampleId: "02c112b4-c79f-470f-882f-f23f10d88250", // 2021 — alpha with (5x+3)/(6x-alpha) its own inverse
      traps: [
        {
          title: "Only for increasing functions",
          body: "A decreasing function can meet its inverse off the line \\(y=x\\). The shortcut \\(f(x)=x\\) is safe only when \\(f\\) is increasing.",
        },
      ],
    },

    // C3 — iterates
    {
      kind: "formula" as const,
      slug: "jfn-iterates",
      name: "Applying a function many times",
      intuition:
        "Compute \\(f\\circ f\\), then \\(f\\circ f\\circ f\\), until a pattern appears: either a cycle, where some \\(f^k\\) is the identity so only \\(n\\) modulo \\(k\\) matters, or a formula in \\(n\\). A map \\(\\frac{ax+b}{cx+d}\\) composes like the matrix \\(\\begin{pmatrix}a&b\\\\c&d\\end{pmatrix}\\), so \\(f^n\\) comes from the \\(n\\)th power of that matrix.",
      definition:
        "- \\(f^1=f\\), \\(f^{n+1}=f\\circ f^n\\).\n" +
        "- **Cycle:** \\(f^k=\\mathrm{id}\\Rightarrow f^n=f^{\\,n\\bmod k}\\).\n" +
        "- \\(\\frac{ax+b}{cx+d}\\leftrightarrow\\begin{pmatrix}a&b\\\\c&d\\end{pmatrix}\\); composition \\(\\leftrightarrow\\) matrix product.\n" +
        "- \\(f(x)=\\frac{x}{\\sqrt{1+kx^2}}\\Rightarrow f^n(x)=\\frac{x}{\\sqrt{1+nkx^2}}\\).",
      formula: {
        label: "A cycle",
        latex: "f^k=\\mathrm{id}\\ \\Rightarrow\\ f^{n}=f^{\\,n \\bmod k}",
      },
      authoredExample: {
        prompt: "\\(f(x)=\\frac1{1-x}\\). Find \\(f^{10}(2)\\).",
        steps: [
          "\\(f^2(x)=\\frac{x-1}{x}\\), \\(f^3(x)=x\\): a cycle of 3.",
          "\\(10=9+1\\), so \\(f^{10}=f\\).",
        ],
        answer: "\\(f(2)=-1\\).",
      },
      selfCheckExample: {
        prompt: "\\(f(x)=\\frac{x}{\\sqrt{1+x^2}}\\). Find \\(f^5(1)\\).",
        steps: [
          "\\(f^2(x)=\\frac{x}{\\sqrt{1+2x^2}}\\), and so on: \\(f^5(x)=\\frac{x}{\\sqrt{1+5x^2}}\\).",
        ],
        answer: "\\(\\frac1{\\sqrt6}\\).",
      },
      practiceSet: [
        { prompt: "\\(f(x)=-x\\): \\(f^{2025}(3)\\)?", answer: "\\(-3\\)" },
        { prompt: "\\(f(x)=x+2\\): \\(f^{10}(0)\\)?", answer: "\\(20\\)" },
        { prompt: "\\(f(x)=2x\\): \\(f^n(x)\\)?", answer: "\\(2^nx\\)" },
        { prompt: "\\(f^3=\\mathrm{id}\\). \\(f^{100}\\)?", answer: "\\(f\\)" },
      ],
      pyqExampleId: "3bf749c8-ce37-489f-819c-d529beb7bbe9", // 2022 — f = (x-1)/(x+1), f^6(6) + f^7(7)
      traps: [
        {
          title: "Find the cycle on a general x",
          body: "A value that repeats at one particular \\(x\\) proves nothing about the others. Show \\(f^k(x)=x\\) as an identity before reducing \\(n\\).",
        },
      ],
    },
  ],
};
