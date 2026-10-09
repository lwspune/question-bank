import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_MAT_NPL_LOGS_NOTE: SubtopicNote = {
  subtopicName: "Scientific Notation and Logarithms",
  title: "Scientific Notation and Logarithms",
  oneLineDefinition:
    "Scientific notation keeps very large and very small numbers under control; a logarithm is the exponent that turns its base into a given number, and its laws turn products into sums.",
  whyItMatters:
    "Calculations in scientific notation appeared in 2014, 2016, 2018 and 2022, and logarithms in 2012, 2013, 2015, 2017 and 2026. The 2026 question needed only the definition of log₁₀; the older ones used the laws to simplify or rearrange.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "imat-npl-sci-notation",
      name: "Scientific notation and orders of magnitude",
      intuition:
        "Writing a number as a value between 1 and 10 times a power of ten splits it into two parts you can handle separately: the digits and the size. Multiply the digit parts, add the powers of ten, then tidy up so the digit part is back between 1 and 10.",
      definition:
        "A number is in **scientific notation** when written \\(a \\times 10^n\\) with \\(1 \\le a < 10\\) and \\(n\\) an integer.\n" +
        "- Multiply: multiply the \\(a\\) parts and **add** the exponents. Divide: divide and **subtract**.\n" +
        "- Renormalise at the end: \\(30 \\times 10^{-3} = 3.0 \\times 10^{-2}\\) (the exponent goes up by one when \\(a\\) is divided by 10).\n" +
        "- Square root: first make the exponent even. \\(\\sqrt{4.9 \\times 10^5} = \\sqrt{49 \\times 10^4} = 7 \\times 10^2\\).\n" +
        "- The **order of magnitude** is the power of ten that sets the size: \\(3.2 \\times 10^6\\) is of order \\(10^6\\).",
      formula: {
        label: "Scientific notation",
        latex: "x = a \\times 10^{n}, \\qquad 1 \\le a < 10, \\quad n \\in \\mathbb{Z}",
        symbols: [
          { symbol: "\\(a\\)", meaning: "the digit part (mantissa)" },
          { symbol: "\\(n\\)", meaning: "the power of ten, a whole number" },
        ],
      },
      authoredExample: {
        prompt: "Evaluate \\(\\dfrac{(6 \\times 10^{4}) \\times (5 \\times 10^{-7})}{\\sqrt{2.5 \\times 10^{-3}}}\\) in scientific notation.",
        steps: [
          "Numerator: \\(6 \\times 5 = 30\\) and \\(10^{4 - 7} = 10^{-3}\\), so \\(30 \\times 10^{-3} = 3.0 \\times 10^{-2}\\).",
          "Denominator: make the exponent even: \\(2.5 \\times 10^{-3} = 25 \\times 10^{-4}\\), so its root is \\(5 \\times 10^{-2}\\).",
          "Divide: \\(\\frac{3.0}{5} \\times 10^{-2 - (-2)} = 0.6 \\times 10^{0} = 6.0 \\times 10^{-1}\\).",
        ],
        answer: "\\(6.0 \\times 10^{-1}\\)",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\dfrac{(4 \\times 10^{-3})^2 \\times (9 \\times 10^{5})}{\\sqrt{3.6 \\times 10^{3}}}\\).",
        options: [
          "\\(2.4 \\times 10^{0}\\)",
          "\\(2.4 \\times 10^{-2}\\)",
          "\\(6.0 \\times 10^{-2}\\)",
          "\\(2.4 \\times 10^{2}\\)",
          "\\(2.4 \\times 10^{-1}\\)",
        ],
        steps: [
          "\\((4 \\times 10^{-3})^2 = 16 \\times 10^{-6}\\). Times \\(9 \\times 10^5\\): \\(144 \\times 10^{-1} = 14.4\\).",
          "\\(3.6 \\times 10^3 = 36 \\times 10^2\\), so the root is \\(6 \\times 10^1 = 60\\).",
          "\\(14.4 / 60 = 0.24 = 2.4 \\times 10^{-1}\\).",
          "Option A adds 2 to the exponent instead of doubling it; B takes the root as 600; C squares only the power of ten; D squares only the 4.",
        ],
        answer: "(E) \\(2.4 \\times 10^{-1}\\)",
      },
      practiceSet: [
        { prompt: "Evaluate \\((2.5 \\times 10^{3}) \\times (8 \\times 10^{-7})\\).", answer: "\\(2 \\times 10^{-3}\\)", method: "\\(20 \\times 10^{-4}\\)" },
        { prompt: "Evaluate \\((9 \\times 10^{8}) \\div (3 \\times 10^{-2})\\).", answer: "\\(3 \\times 10^{10}\\)" },
        { prompt: "Evaluate \\(\\sqrt{1.6 \\times 10^{9}}\\).", answer: "\\(4 \\times 10^{4}\\)", method: "\\(\\sqrt{16 \\times 10^8}\\)" },
        { prompt: "If \\(p = 2 \\times 10^a\\) and \\(q = 6 \\times 10^b\\), write \\(pq\\) in scientific notation.", answer: "\\(1.2 \\times 10^{a+b+1}\\)", method: "\\(12 \\times 10^{a+b}\\), then renormalise" },
      ],
      traps: [
        {
          title: "15 × 10⁴ is not in scientific notation",
          body: "The digit part must be at least 1 and less than 10. \\(15 \\times 10^4 = 1.5 \\times 10^5\\): moving the decimal point one place left raises the exponent by one. Forgetting this gives an option that is ten times too small or too large.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-npl-log-def",
      name: "Logarithm: definition, log₁₀ and ln",
      intuition:
        "A logarithm answers one question: what power do I raise the base to, to get this number? \\(\\log_2 8 = 3\\) because \\(2^3 = 8\\). A logarithm is an exponent, so every fact about logs comes from a fact about powers.",
      definition:
        "For a base \\(b > 0\\), \\(b \\ne 1\\), and a number \\(x > 0\\): \\(\\log_b x\\) is the exponent \\(y\\) with \\(b^y = x\\).\n" +
        "- \\(\\log_b 1 = 0\\), \\(\\log_b b = 1\\), \\(\\log_b (b^k) = k\\) and \\(b^{\\log_b x} = x\\).\n" +
        "- \\(\\log x\\) or \\(\\log_{10} x\\) is the **common logarithm** (base 10): \\(\\log 1000 = 3\\), \\(\\log 0.01 = -2\\).\n" +
        "- \\(\\ln x\\) is the **natural logarithm**, base \\(e \\approx 2.718\\): \\(\\ln e = 1\\), \\(\\ln 1 = 0\\).\n" +
        "- The logarithm of zero or of a negative number is **not defined**. A negative logarithm only means \\(0 < x < 1\\).",
      formula: {
        label: "Definition of the logarithm",
        latex: "\\log_b x = y \\quad\\text{means}\\quad b^{y} = x",
        symbols: [
          { symbol: "\\(b\\)", meaning: "the base, positive and not 1" },
          { symbol: "\\(x\\)", meaning: "the argument, positive" },
        ],
      },
      authoredExample: {
        prompt: "Evaluate (a) \\(\\log_2 32\\), (b) \\(\\log_{10} 0.001\\), (c) \\(\\ln e^4\\), and (d) solve \\(\\log_3 x = 4\\).",
        steps: [
          "(a) \\(2^5 = 32\\), so the answer is 5.",
          "(b) \\(0.001 = 10^{-3}\\), so the answer is \\(-3\\).",
          "(c) \\(\\ln e^4 = 4\\), because \\(\\ln\\) undoes the power of \\(e\\).",
          "(d) Rewrite as a power: \\(x = 3^4 = 81\\).",
        ],
        answer: "(a) 5, (b) \\(-3\\), (c) 4, (d) \\(x = 81\\)",
      },
      selfCheckExample: {
        prompt: "What is the value of \\(\\log_4 8\\)?",
        options: ["2", "\\(\\frac{3}{2}\\)", "\\(\\frac{1}{2}\\)", "4", "\\(\\frac{2}{3}\\)"],
        steps: [
          "Let \\(\\log_4 8 = y\\), so \\(4^y = 8\\).",
          "Common base: \\(2^{2y} = 2^3\\), so \\(2y = 3\\) and \\(y = \\frac{3}{2}\\).",
          "Option E is the reversed ratio (\\(\\log_8 4\\)); option A divides 8 by 4.",
        ],
        answer: "(B) \\(\\frac{3}{2}\\)",
      },
      practiceSet: [
        { prompt: "Evaluate \\(\\log_5 125\\).", answer: "3" },
        { prompt: "Evaluate \\(\\ln \\frac{1}{e^2}\\).", answer: "\\(-2\\)" },
        { prompt: "Solve \\(\\log_2 x = -1\\).", answer: "\\(x = \\frac{1}{2}\\)", method: "\\(x = 2^{-1}\\)" },
        { prompt: "Evaluate \\(10^{\\log_{10} 7}\\).", answer: "7", method: "\\(b^{\\log_b x} = x\\)" },
      ],
      traps: [
        {
          title: "A negative logarithm is fine; a negative argument is not",
          body: "\\(\\log 0.01 = -2\\) is perfectly good: the number is between 0 and 1. But \\(\\log(-2)\\) and \\(\\log 0\\) do not exist, because no power of a positive base is zero or negative.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-npl-log-laws",
      name: "Laws of logarithms and change of base",
      intuition:
        "Logarithms are exponents, and exponents add when numbers multiply. So the log of a product is the sum of the logs, the log of a quotient is the difference, and the log of a power brings the power down in front.",
      definition:
        "For positive \\(x, y\\) and any valid base:\n" +
        "- **Product**: \\(\\log(xy) = \\log x + \\log y\\).\n" +
        "- **Quotient**: \\(\\log \\frac{x}{y} = \\log x - \\log y\\).\n" +
        "- **Power**: \\(\\log x^k = k \\log x\\) (also for roots: \\(\\log \\sqrt{x} = \\frac{1}{2}\\log x\\)).\n" +
        "- **Change of base**: \\(\\log_b x = \\frac{\\log x}{\\log b}\\), using any common base (10, \\(e\\) or 2).\n" +
        "- There is no law for \\(\\log(x + y)\\).",
      formula: {
        label: "Laws of logarithms",
        latex: "\\log(xy) = \\log x + \\log y \\qquad \\log\\frac{x}{y} = \\log x - \\log y \\qquad \\log x^{k} = k\\log x \\qquad \\log_b x = \\frac{\\log x}{\\log b}",
      },
      authoredExample: {
        prompt: "(a) Write \\(\\log \\dfrac{x^3}{100\\,y^2}\\) in terms of \\(\\log x\\) and \\(\\log y\\) (base 10). (b) Given \\(\\log 2 = a\\) and \\(\\log 3 = b\\), write \\(\\log 45\\) in terms of \\(a\\) and \\(b\\). (c) Evaluate \\(\\log_8 32\\).",
        steps: [
          "(a) \\(\\log x^3 - \\log 100 - \\log y^2 = 3\\log x - 2 - 2\\log y\\).",
          "(b) \\(45 = \\frac{9 \\times 10}{2}\\), so \\(\\log 45 = 2\\log 3 + \\log 10 - \\log 2 = 2b + 1 - a\\).",
          "(c) Change to base 2: \\(\\log_8 32 = \\frac{\\log_2 32}{\\log_2 8} = \\frac{5}{3}\\).",
        ],
        answer: "(a) \\(3\\log x - 2\\log y - 2\\); (b) \\(2b + 1 - a\\); (c) \\(\\frac{5}{3}\\)",
      },
      selfCheckExample: {
        prompt: "What is the value of \\(\\log_2 24 - \\log_2 3 + \\log_2 \\frac{1}{4}\\)?",
        options: ["5", "3", "\\(\\log_2 21.25\\)", "1", "\\(-2\\)"],
        steps: [
          "\\(\\log_2 24 - \\log_2 3 = \\log_2 8 = 3\\).",
          "\\(\\log_2 \\frac{1}{4} = -2\\), so the total is \\(3 - 2 = 1\\).",
          "Option A treats \\(\\log_2 \\frac{1}{4}\\) as \\(+2\\); B drops the last term; C subtracts and adds the arguments themselves, which no law allows.",
        ],
        answer: "(D) 1",
      },
      practiceSet: [
        { prompt: "Evaluate \\(\\log 5 + \\log 20\\) (base 10).", answer: "2", method: "\\(\\log 100\\)" },
        { prompt: "Write \\(\\ln 50 - \\ln 2\\) as a multiple of \\(\\ln 5\\).", answer: "\\(2\\ln 5\\)", method: "\\(\\ln 25 = \\ln 5^2\\)" },
        { prompt: "Evaluate \\(\\log_9 27\\).", answer: "\\(\\frac{3}{2}\\)", method: "\\(\\frac{\\log_3 27}{\\log_3 9} = \\frac{3}{2}\\)" },
        { prompt: "Evaluate \\(\\log_3 18 - \\log_3 2\\).", answer: "2", method: "\\(\\log_3 9\\)" },
      ],
      traps: [
        {
          title: "The log of a sum does not split",
          body: "\\(\\log(x + y)\\) is not \\(\\log x + \\log y\\); that sum equals \\(\\log(xy)\\). Likewise \\(\\frac{\\log x}{\\log y}\\) is not \\(\\log \\frac{x}{y}\\): the first is a change of base, the second a difference of logs.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-npl-exp-equations",
      name: "Solving exponential equations and rearranging log relations",
      intuition:
        "When the unknown is in the exponent, either write both sides as powers of one base and match the exponents, or take logarithms to bring the exponent down. A relation between logs undoes into a relation between powers: a sum of logs becomes a product, and a number added on becomes a factor.",
      definition:
        "- **Common base**: if both sides are powers of the same base, set the exponents equal.\n" +
        "- **Take logs**: \\(a^x = c\\) gives \\(x = \\frac{\\log c}{\\log a}\\) for \\(c > 0\\).\n" +
        "- \\(a^x\\) is always positive, so \\(a^x = c\\) with \\(c \\le 0\\) has **no solution**.\n" +
        "- **Undoing a log relation**: \\(\\log y = k \\log x + c\\) means \\(y = 10^c\\, x^k\\); with \\(\\ln\\) it means \\(y = e^c x^k\\).\n" +
        "- Harder equations (a substitution, or a logarithm of an expression in \\(x\\)) are in Equations and Inequalities.",
      formula: {
        label: "Exponential equation by logs",
        latex: "a^{x} = c \\;\\Rightarrow\\; x = \\frac{\\log c}{\\log a} \\qquad (c > 0)",
      },
      authoredExample: {
        prompt: "(a) Solve \\(3^{2x - 1} = 27\\). (b) Solve \\(5^x = 40\\). (c) Given \\(\\log y = 3\\log x - 2\\) (base 10), write \\(y\\) in terms of \\(x\\).",
        steps: [
          "(a) \\(27 = 3^3\\), so \\(2x - 1 = 3\\) and \\(x = 2\\).",
          "(b) 40 is not a power of 5, so take logs: \\(x = \\frac{\\log 40}{\\log 5} \\approx 2.29\\).",
          "(c) \\(3\\log x = \\log x^3\\) and \\(2 = \\log 100\\), so \\(\\log y = \\log \\frac{x^3}{100}\\), giving \\(y = \\frac{x^3}{100}\\).",
        ],
        answer: "(a) \\(x = 2\\); (b) \\(x \\approx 2.29\\); (c) \\(y = \\frac{x^3}{100}\\)",
      },
      selfCheckExample: {
        prompt: "Given that \\(\\ln y = 3 + 2\\ln x\\) for \\(x > 0\\), which expression gives \\(y\\)?",
        options: ["\\(y = e^{3}x^{2}\\)", "\\(y = 3 + x^{2}\\)", "\\(y = e^{3} + x^{2}\\)", "\\(y = 3x^{2}\\)", "\\(y = 2e^{3}x\\)"],
        steps: [
          "\\(2\\ln x = \\ln x^2\\) and \\(3 = \\ln e^3\\).",
          "So \\(\\ln y = \\ln e^3 + \\ln x^2 = \\ln(e^3 x^2)\\), and \\(y = e^3 x^2\\).",
          "Option B drops the logs as if they were not there; C forgets that a sum of logs is the log of a product; D turns the constant into a factor 3 instead of \\(e^3\\).",
        ],
        answer: "(A) \\(y = e^{3}x^{2}\\)",
      },
      practiceSet: [
        { prompt: "Solve \\(4^x = 32\\).", answer: "\\(x = \\frac{5}{2}\\)", method: "\\(2^{2x} = 2^5\\)" },
        { prompt: "Solve \\(2^x = 7\\), to two decimal places.", answer: "\\(x \\approx 2.81\\)", method: "\\(\\frac{\\log 7}{\\log 2}\\)" },
        { prompt: "How many real solutions has \\(3^x = -9\\)?", answer: "None", method: "A power of a positive base is always positive" },
      ],
      traps: [
        {
          title: "The constant in a log relation becomes a factor",
          body: "\\(\\log y = 2\\log x + 1\\) gives \\(y = 10x^2\\), not \\(y = x^2 + 1\\). The 1 is \\(\\log 10\\), and logs that add come from numbers that multiply.",
        },
      ],
    },
  ],
};
