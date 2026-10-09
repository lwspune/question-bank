import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_MAT_FUN_BASICS_NOTE: SubtopicNote = {
  subtopicName: "Domain, Range and Composition",
  title: "Functions, Domain, Range and Composition",
  oneLineDefinition:
    "A function gives exactly one output for each allowed input; the allowed inputs are the domain, the outputs are the range.",
  whyItMatters:
    "The 2024 paper asked for the value of a logarithmic function at a point and then for its reciprocal. Domain conditions also decide the right option in inverse-function items, as in 2023.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "imat-fun-domain-range",
      name: "Function, domain and range",
      intuition:
        "Think of a function as a machine: put in a number, get out exactly one number. Some inputs break the machine, such as dividing by zero or taking the logarithm of a negative number. The domain is the set of inputs that work; the range is the set of outputs the machine can actually produce.",
      definition:
        "A **function** \\(f\\) assigns to each input \\(x\\) exactly one output \\(f(x)\\).\n" +
        "- The **domain** is the set of allowed inputs. Remove any \\(x\\) that makes a denominator zero, puts a negative number under a square root, or makes the argument of a logarithm zero or negative.\n" +
        "- The **range** is the set of outputs. For example \\(x^2 + 4\\) is never below 4, so its range is \\(y \\ge 4\\).\n" +
        "- To **evaluate** \\(f(a)\\), replace every \\(x\\) by \\(a\\), with brackets.",
      authoredExample: {
        prompt:
          "Let \\(f(x) = \\sqrt{x - 3} + \\dfrac{1}{x - 5}\\). Find the domain of \\(f\\) and the value of \\(f(7)\\).",
        steps: [
          "The square root needs \\(x - 3 \\ge 0\\), so \\(x \\ge 3\\).",
          "The fraction needs \\(x - 5 \\ne 0\\), so \\(x \\ne 5\\).",
          "Domain: \\(x \\ge 3\\) and \\(x \\ne 5\\).",
          "\\(f(7) = \\sqrt{4} + \\dfrac{1}{2} = 2 + 0.5 = 2.5\\).",
        ],
        answer: "Domain \\(x \\ge 3,\\ x \\ne 5\\); \\(f(7) = 2.5\\)",
      },
      selfCheckExample: {
        prompt: "What is the largest possible domain of \\(g(x) = \\ln(6 - 2x)\\)?",
        options: [
          "\\(x > 3\\)",
          "\\(x \\le 3\\)",
          "\\(x < 3\\)",
          "\\(x < 6\\)",
          "All real numbers except 3",
        ],
        steps: [
          "A logarithm needs a positive argument: \\(6 - 2x > 0\\).",
          "So \\(2x < 6\\), that is \\(x < 3\\).",
          "Option A reverses the inequality; B lets in \\(x = 3\\), where the argument is 0 and \\(\\ln 0\\) does not exist; D forgets to divide by 2.",
        ],
        answer: "(C) \\(x < 3\\)",
      },
      practiceSet: [
        { prompt: "What is the domain of \\(h(x) = \\dfrac{1}{x + 4}\\)?", answer: "All real \\(x\\) except \\(x = -4\\)" },
        { prompt: "If \\(f(x) = 3x - 1\\), find \\(f(-2)\\).", answer: "\\(-7\\)", method: "\\(3(-2) - 1\\)" },
        { prompt: "What is the range of \\(f(x) = x^2 + 4\\) for all real \\(x\\)?", answer: "\\(y \\ge 4\\)", method: "\\(x^2\\) is never negative" },
        { prompt: "What is the domain of \\(f(x) = \\sqrt{10 - x}\\)?", answer: "\\(x \\le 10\\)" },
      ],
      traps: [
        {
          title: "The argument of a logarithm must be strictly positive",
          body: "\\(\\ln 0\\) does not exist, so the condition is \\(> 0\\), not \\(\\ge 0\\). A square root is different: \\(\\sqrt{0} = 0\\) is allowed, so its condition is \\(\\ge 0\\).",
        },
        {
          title: "The reciprocal of f(a) is a number, found after evaluating",
          body: "The reciprocal of \\(f(a)\\) is \\(1/f(a)\\): first work out \\(f(a)\\), then turn it upside down. It is not \\(f(1/a)\\), and it is not the inverse function.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-fun-composition",
      name: "Composite functions: one function after another",
      intuition:
        "A composite function feeds the output of one machine straight into another. The order matters, because adding then squaring is not the same as squaring then adding. In \\(f(g(x))\\) the function nearest to \\(x\\), here \\(g\\), acts first.",
      definition:
        "The **composite** \\(f \\circ g\\) is defined by \\((f \\circ g)(x) = f(g(x))\\): apply \\(g\\) first, then \\(f\\).\n" +
        "- In general \\(f(g(x)) \\ne g(f(x))\\).\n" +
        "- To find \\(f(g(x))\\) as a formula, write \\(f\\) and replace each \\(x\\) in it by the whole expression \\(g(x)\\), in brackets.\n" +
        "- \\(f(g(x))\\) exists only where \\(g(x)\\) lies in the domain of \\(f\\).",
      formula: {
        label: "Composite function",
        latex: "(f \\circ g)(x) = f\\big(g(x)\\big)",
        symbols: [
          { symbol: "\\(g\\)", meaning: "the inner function, applied first" },
          { symbol: "\\(f\\)", meaning: "the outer function, applied to the result" },
        ],
      },
      authoredExample: {
        prompt:
          "Let \\(f(x) = 2x + 1\\) and \\(g(x) = x^2\\). Find \\(f(g(3))\\), \\(g(f(3))\\), and formulas for \\(f(g(x))\\) and \\(g(f(x))\\).",
        steps: [
          "\\(g(3) = 9\\), so \\(f(g(3)) = 2(9) + 1 = 19\\).",
          "\\(f(3) = 7\\), so \\(g(f(3)) = 7^2 = 49\\).",
          "\\(f(g(x)) = 2x^2 + 1\\) and \\(g(f(x)) = (2x + 1)^2 = 4x^2 + 4x + 1\\).",
          "The two orders give different functions.",
        ],
        answer: "19 and 49; \\(f(g(x)) = 2x^2 + 1\\), \\(g(f(x)) = 4x^2 + 4x + 1\\)",
      },
      selfCheckExample: {
        prompt: "Let \\(f(x) = x - 4\\) and \\(g(x) = 3x^2\\). Which expression is \\(g(f(x))\\)?",
        options: [
          "\\(3x^2 - 4\\)",
          "\\(3(x - 4)^2\\)",
          "\\(3x^2 - 12\\)",
          "\\(9(x - 4)^2\\)",
          "\\((3x - 4)^2\\)",
        ],
        steps: [
          "\\(f\\) acts first: \\(f(x) = x - 4\\).",
          "Put that into \\(g\\): \\(g(x - 4) = 3(x - 4)^2\\).",
          "Option A is \\(f(g(x))\\), the other order. D squares the 3 as well; E puts the 3 inside the bracket.",
        ],
        answer: "(B) \\(3(x - 4)^2\\)",
      },
      practiceSet: [
        { prompt: "\\(f(x) = x + 5\\), \\(g(x) = 2x\\). Find \\(f(g(4))\\).", answer: "13", method: "\\(g(4) = 8\\), then \\(8 + 5\\)" },
        { prompt: "With the same functions, find \\(g(f(4))\\).", answer: "18", method: "\\(f(4) = 9\\), then \\(2 \\times 9\\)" },
        { prompt: "\\(f(x) = \\sqrt{x}\\), \\(g(x) = x + 9\\). Find \\(f(g(16))\\).", answer: "5", method: "\\(\\sqrt{25}\\)" },
        { prompt: "If \\(f(x) = 1/x\\) for \\(x \\ne 0\\), simplify \\(f(f(x))\\).", answer: "\\(x\\)", method: "\\(1/(1/x) = x\\)" },
      ],
      traps: [
        {
          title: "In f(g(x)) the inner function g acts first",
          body: "Read \\(f(g(x))\\) from the inside out: \\(g\\) first, then \\(f\\). Working left to right gives \\(g(f(x))\\), which is usually a different function, and IMAT puts both among the options.",
        },
      ],
    },
  ],
};
