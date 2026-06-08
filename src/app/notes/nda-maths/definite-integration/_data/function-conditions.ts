import type { SubtopicNote } from "@/app/notes/_types";

export const FUNCTION_CONDITIONS_NOTE: SubtopicNote = {
  subtopicName: "Definite Integrals in Function Conditions",
  title: "Recovering a Function from Integral Conditions",
  oneLineDefinition:
    "When an unknown function has parameters and you are given several integral or derivative conditions, each condition becomes one linear equation — solve the system for the parameters.",
  whyItMatters:
    "A small (3 PYQ) but reliably HARD subtopic. The work is bookkeeping: turn each given condition (a definite integral, a value, a derivative) into an equation in the unknown coefficients, then solve the linear system.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "integral-function-conditions",
      name: "Solving for coefficients from integral conditions",
      intuition:
        "If a function is a combination of known pieces with unknown coefficients (like \\(Pe^x+Qe^{2x}+Re^{3x}\\)), then every integral, value, or derivative you are told gives one equation linking P, Q, R. Collect as many equations as unknowns and solve.",
      definition:
        "The procedure:\n" +
        "- Write the unknown function with its parameters, e.g. \\(f(x)=Pe^x+Qe^{2x}+Re^{3x}\\).\n" +
        "- Convert each condition into an equation: a value \\(f(0)\\), an integral \\(\\int_0^c f\\), or a derivative \\(f'(0)=P+2Q+3R\\).\n" +
        "- Solve the resulting linear system for the parameters, then answer the specific question asked.",
      authoredExample: {
        prompt:
          "Let \\(f(x)=Ae^x+Be^{2x}\\) with \\(f(0)=3\\) and \\(\\int_0^{\\ln 2} f(x)\\,dx = \\tfrac72\\). Find A and B.",
        steps: [
          "\\(f(0)=A+B=3\\).",
          "\\(\\int_0^{\\ln2} f = [Ae^x + \\tfrac{B}{2}e^{2x}]_0^{\\ln2} = (2A+2B)-(A+\\tfrac{B}{2}) = A + \\tfrac32 B = \\tfrac72\\).",
          "Solve \\(A+B=3,\\ A+\\tfrac32 B=\\tfrac72\\): subtract to get \\(\\tfrac12 B=\\tfrac12\\Rightarrow B=1,\\ A=2\\).",
        ],
        answer: "\\(A=2,\\ B=1\\).",
      },
      selfCheckExample: {
        prompt:
          "For \\(f(x)=Pe^x+Qe^{2x}+Re^{3x}\\) it is found that \\(P=1,Q=2,R=3\\). What is \\(f'(0)\\)?",
        steps: [
          "\\(f'(x)=Pe^x+2Qe^{2x}+3Re^{3x}\\).",
          "At \\(x=0\\): \\(f'(0)=P+2Q+3R = 1+4+9\\).",
        ],
        answer: "14.",
      },
      practiceSet: [
        { prompt: "How many independent conditions to fix 3 unknown coefficients?", answer: "3" },
        { prompt: "For \\(f=Pe^x+Qe^{2x}+Re^{3x}\\), write \\(f'(0)\\).", answer: "\\(P+2Q+3R\\)" },
        { prompt: "\\(\\int_0^{c} e^{2x}\\,dx = ?\\)", answer: "\\(\\frac{e^{2c}-1}{2}\\)" },
      ],
      pyqExampleId: "ce0bc079-ab1f-4b84-9988-7da34ddf36db", // f'(0)=14
      traps: [
        {
          title: "One condition, one equation — match the counts",
          body:
            "You need as many independent conditions as unknown parameters. With three unknowns P, Q, R you must extract three equations (e.g. a value, an integral, and a derivative) before the system is solvable.",
        },
      ],
    },
  ],
};
