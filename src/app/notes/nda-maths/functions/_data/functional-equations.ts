import type { SubtopicNote } from "@/app/notes/_types";

export const FUNCTIONS_FUNCTIONAL_EQUATIONS_NOTE: SubtopicNote = {
  subtopicName: "Functional Equations",
  title: "Functional Equations",
  oneLineDefinition:
    "You are given a relation the function must satisfy — substitute clever values to pin down f(x) or a specific value.",
  whyItMatters:
    "Eighteen PYQs, mostly MODERATE — the chapter's 'solve for the unknown function' genre. Three patterns cover " +
    "almost all of them: substitute a second argument (x → 1/x or x → 1−x) and solve the resulting linear system; " +
    "recognise multiplicative/additive forms (f(xy)=f(x)f(y), f(x+y)=f(x)f(y)); or undo an argument shift like " +
    "f(x+1)=… to recover f(x). Substitution is the master tool.",
  concepts: [
    // Substitution systems
    {
      kind: "formula" as const,
      slug: "funcs-fe-substitution",
      name: "Solving by substitution (x → 1/x, x → 1−x)",
      intuition:
        "When one equation mixes \\(f(x)\\) with \\(f(\\text{something})\\), substitute that 'something' for \\(x\\) to " +
        "get a **second** equation. Two equations, two unknowns \\(f(x)\\) and \\(f(\\text{other})\\) — solve like " +
        "simultaneous equations.",
      definition:
        "If a relation links \\(f(x)\\) and \\(f(g(x))\\) where \\(g(g(x))=x\\) (e.g. \\(g(x)=\\tfrac1x\\) or \\(1-x\\)), " +
        "replace \\(x\\) by \\(g(x)\\) to obtain a second relation, then eliminate \\(f(g(x))\\) algebraically to " +
        "isolate \\(f(x)\\).",
      authoredExample: {
        prompt:
          "If \\(f(x)+2f(1-x)=x\\) for all \\(x\\), find \\(f(x)\\).",
        steps: [
          "Replace \\(x\\) by \\(1-x\\): \\(f(1-x)+2f(x)=1-x\\). \\(\\;\\)(2)",
          "Original: \\(f(x)+2f(1-x)=x\\). \\(\\;\\)(1)",
          "Compute \\(2\\times(2)-(1)\\): \\(4f(x)+2f(1-x)-f(x)-2f(1-x)=2(1-x)-x\\Rightarrow 3f(x)=2-3x\\).",
          "Divide by 3.",
        ],
        answer: "\\(f(x)=\\dfrac{2-3x}{3}=\\dfrac{2}{3}-x\\).",
      },
      selfCheckExample: {
        prompt:
          "If \\(2f(x)+f(1-x)=x\\) for all \\(x\\), find \\(f(x)\\).",
        steps: [
          "Swap \\(x\\to1-x\\): \\(2f(1-x)+f(x)=1-x\\).",
          "Solve the pair: \\(2\\times\\) first \\(-\\) second gives \\(3f(x)=2x-(1-x)=3x-1\\).",
        ],
        answer: "\\(f(x)=x-\\dfrac{1}{3}\\).",
      },
      traps: [
        {
          title: "One equation, two unknowns — make a second",
          body:
            "You cannot read off \\(f(x)\\) from a single relation that also contains \\(f(1/x)\\) or \\(f(1-x)\\). " +
            "Generate the partner equation by substituting, then solve the \\(2\\times2\\) system. Substituting a " +
            "value that is its own partner (like \\(x=\\tfrac12\\) for \\(x\\to1-x\\)) can shortcut a single requested value.",
        },
      ],
      pyqExampleId: "f00a8299-db1c-4578-b1c7-4b9257a5161a", // 2022 — 4f(x)−f(1/x)=…, f(2)=4
    },

    // Multiplicative / additive forms
    {
      kind: "formula" as const,
      slug: "funcs-fe-multiplicative-additive",
      name: "Multiplicative and additive forms",
      intuition:
        "A few functional equations have signature solutions. Recognise the form and the function type follows: " +
        "products go to powers, sums-to-products go to exponentials, sums-to-sums go to linear.",
      definition:
        "- \\(f(xy)=f(x)f(y)\\): power-type, \\(f(x)=x^k\\); useful values come from \\(f(1)=1\\) and \\(f(1/a)=1/f(a)\\).\n" +
        "- \\(f(x+y)=f(x)f(y)\\): exponential, \\(f(x)=a^x\\); so \\(f(x)f(y)f(z)=f(x+y+z)\\).\n" +
        "- \\(f(x+y)=f(x)+f(y)\\): additive (Cauchy), \\(f(x)=cx\\).",
      formula: {
        label: "Signature functional-equation solutions",
        latex:
          "f(xy)=f(x)f(y)\\Rightarrow f(x)=x^{k}\\qquad f(x+y)=f(x)f(y)\\Rightarrow f(x)=a^{x}\\qquad f(x+y)=f(x)+f(y)\\Rightarrow f(x)=cx",
      },
      authoredExample: {
        prompt: "If \\(f(x+y)=f(x)f(y)\\) for all \\(x,y\\) and \\(f(1)=3\\), find \\(f(3)\\).",
        steps: [
          "The form \\(f(x+y)=f(x)f(y)\\) means \\(f\\) is exponential: \\(f(x)=f(1)^x\\).",
          "So \\(f(3)=f(1)^3=3^3\\).",
        ],
        answer: "\\(f(3)=27\\).",
      },
      selfCheckExample: {
        prompt:
          "If \\(f(xy)=f(x)f(y)\\) and \\(f(3)=9\\), find \\(f\\!\\left(\\tfrac13\\right)\\).",
        steps: [
          "Put \\(y=\\tfrac1x\\): \\(f(1)=f(x)f(1/x)\\); and \\(f(1)=f(1)^2\\Rightarrow f(1)=1\\).",
          "So \\(f(1/x)=\\dfrac{1}{f(x)}\\Rightarrow f(1/3)=\\dfrac{1}{f(3)}=\\dfrac19\\).",
        ],
        answer: "\\(f\\!\\left(\\tfrac13\\right)=\\dfrac19\\).",
      },
      pyqExampleId: "47a9c1fc-07dc-4bd1-82f2-3f534332bf69", // 2024 — f(xy)=f(x)f(y), f(2)=4 → f(½)=¼
    },

    // Argument shift
    {
      kind: "formula" as const,
      slug: "funcs-fe-argument-shift",
      name: "Undoing an argument shift",
      intuition:
        "When the rule gives \\(f(\\text{shifted } x)\\) instead of \\(f(x)\\), introduce a new variable for the " +
        "shifted argument, solve for the original \\(x\\), and substitute back to read \\(f\\) of a bare variable.",
      definition:
        "Given \\(f(g(x))=h(x)\\), set \\(t=g(x)\\), solve \\(x\\) in terms of \\(t\\), and substitute: \\(f(t)=h(\\,x(t)\\,)\\). " +
        "Renaming \\(t\\to x\\) gives the explicit rule. (E.g. from \\(f(x+1)\\) put \\(t=x+1\\Rightarrow x=t-1\\).)",
      authoredExample: {
        prompt: "If \\(f(x-1)=x^2+1\\), find \\(f(x)\\).",
        steps: [
          "Let \\(t=x-1\\Rightarrow x=t+1\\).",
          "Substitute: \\(f(t)=(t+1)^2+1=t^2+2t+2\\).",
          "Rename \\(t\\to x\\).",
        ],
        answer: "\\(f(x)=x^2+2x+2\\).",
      },
      traps: [
        {
          title: "Solve for the original variable before substituting",
          body:
            "From \\(f(x+1)=x^2-3x+2\\) you must write \\(x=t-1\\) (where \\(t=x+1\\)) and plug **that** in — " +
            "not simply replace \\(x\\) by \\(x\\) in the right side. Getting the shift direction backwards is the usual slip.",
        },
      ],
      pyqExampleId: "7176d419-e3fc-4752-90df-e84ca0e16ac7", // 2021 — f(x+1)=x²−3x+2 → f(x)=x²−5x+6
    },
  ],
};
