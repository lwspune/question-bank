import type { SubtopicNote } from "@/app/notes/_types";

export const TERM_BIN_NOTE: SubtopicNote = {
  subtopicName: "The General Term",
  title: "The General Term",
  oneLineDefinition:
    "Finding one coefficient or the term independent of x in a single binomial expansion: write the general term, set its power of x, and read off r.",
  whyItMatters:
    "Thirty-four PYQs, eighteen of them numerical answer, and 2023 alone has fourteen. Most ask for one coefficient or the constant term; some first simplify the bracket, and some equate a coefficient from two different expansions. Three ideas cover the page.",
  concepts: [
    // C1 — find r from the power
    {
      kind: "formula" as const,
      slug: "jbin-power",
      name: "Setting the power of x",
      intuition:
        "The \\((r+1)\\)-th term of \\((a+b)^n\\) is \\(T_{r+1}=\\binom nr a^{n-r}b^r\\). When \\(a\\) and \\(b\\) carry powers of \\(x\\), collect the exponent of \\(x\\) as a linear expression in \\(r\\), set it equal to the power asked for, and solve. A non-integer \\(r\\) means that term does not exist. Keep the signs and the numerical factors of \\(a\\) and \\(b\\) inside the coefficient.",
      definition:
        "- \\(T_{r+1}=\\binom nr a^{n-r}b^{r}\\), \\(r=0,1,\\dots,n\\).\n" +
        "- \\(a=px^{\\alpha}\\), \\(b=qx^{\\beta}\\): power of \\(x\\) is \\(\\alpha(n-r)+\\beta r\\).\n" +
        "- Term independent of \\(x\\): set the power to 0.\n" +
        "- No integer \\(r\\) in \\([0,n]\\): the coefficient is 0.",
      formula: {
        label: "General term",
        latex: "T_{r+1}=\\binom nr\\,a^{\\,n-r}\\,b^{\\,r}",
      },
      authoredExample: {
        prompt: "Find the term independent of \\(x\\) in \\(\\left(x^2-\\frac{2}{x}\\right)^{6}\\).",
        steps: [
          "\\(T_{r+1}=\\binom6r(-2)^rx^{12-3r}\\); \\(12-3r=0\\Rightarrow r=4\\).",
          "\\(\\binom64\\cdot16=15\\cdot16\\).",
        ],
        answer: "\\(240\\).",
      },
      selfCheckExample: {
        prompt: "Find the coefficient of \\(x^5\\) in \\(\\left(x+\\frac{3}{x}\\right)^{9}\\).",
        steps: [
          "Power \\(9-2r=5\\Rightarrow r=2\\): \\(\\binom92\\cdot3^2\\).",
        ],
        answer: "\\(324\\).",
      },
      practiceSet: [
        { prompt: "Number of terms in \\((a+b)^{n}\\)?", answer: "\\(n+1\\)" },
        { prompt: "Power of \\(x\\) in \\(T_{r+1}\\) of \\(\\left(x^3+\\frac1x\\right)^{8}\\)?", answer: "\\(24-4r\\)" },
        { prompt: "Constant term of \\(\\left(x+\\frac1x\\right)^{4}\\)?", answer: "\\(6\\)" },
        { prompt: "Coefficient of \\(x^2\\) in \\(\\left(x+\\frac1x\\right)^{5}\\)?", answer: "\\(0\\)" },
      ],
      pyqExampleId: "78a6f5bf-8ad1-433f-bcbe-f5b2989b231c", // 2026 — coefficient of x^2 in (2x^2 + 1/x)^10
      traps: [
        {
          title: "T with index r + 1",
          body: "The term containing \\(b^r\\) is the \\((r+1)\\)-th. 'The 7th term' means \\(r=6\\); using \\(r=7\\) shifts every answer.",
        },
      ],
    },

    // C2 — simplify first, or a parameter in the bracket
    {
      kind: "formula" as const,
      slug: "jbin-simplify-first",
      name: "Simplify the bracket first",
      intuition:
        "Some brackets are designed to collapse. \\(\\frac{x+1}{x^{2/3}-x^{1/3}+1}\\) is \\(x^{1/3}+1\\) by the sum of cubes, and \\(\\frac{x-1}{x-\\sqrt x}\\) is \\(1+x^{-1/2}\\). Others carry a parameter: a term containing \\(x^{\\log_2x}\\) becomes an equation in \\(t=\\log_2x\\), and a term such as \\(\\binom{10}{5}x(1-x)\\) is maximised like any function.",
      definition:
        "- \\(x+1=(x^{1/3}+1)(x^{2/3}-x^{1/3}+1)\\).\n" +
        "- \\(x-1=(\\sqrt x-1)(\\sqrt x+1)\\), \\(x-\\sqrt x=\\sqrt x(\\sqrt x-1)\\).\n" +
        "- \\(3^{\\log_3u}=u\\): simplify such bases before expanding.\n" +
        "- Maximum of \\(x(1-x)\\) on \\([0,1]\\) is \\(\\frac14\\).",
      formula: {
        label: "A common collapse",
        latex: "\\frac{x+1}{x^{2/3}-x^{1/3}+1}-\\frac{x-1}{x-\\sqrt x}=x^{1/3}-x^{-1/2}",
      },
      authoredExample: {
        prompt: "Find the term independent of \\(x\\) in \\(\\left(\\frac{x-1}{\\sqrt x-1}-1\\right)^{8}\\) for \\(x>1\\).",
        steps: [
          "\\(\\frac{x-1}{\\sqrt x-1}=\\sqrt x+1\\), so the bracket is \\(\\sqrt x\\).",
          "\\((\\sqrt x)^8=x^4\\) has no constant term.",
        ],
        answer: "\\(0\\).",
      },
      selfCheckExample: {
        prompt: "The term independent of \\(t\\) in \\(\\left(t\\sqrt x+\\frac{\\sqrt{1-x}}{t}\\right)^{2}\\) is \\(2\\sqrt{x(1-x)}\\). Find its maximum on \\([0,1]\\).",
        steps: [
          "\\(x(1-x)\\) is largest at \\(x=\\frac12\\), value \\(\\frac14\\).",
        ],
        answer: "\\(1\\).",
      },
      practiceSet: [
        { prompt: "\\(\\frac{x+1}{x^{2/3}-x^{1/3}+1}\\)?", answer: "\\(x^{1/3}+1\\)" },
        { prompt: "\\(\\frac{x-1}{x-\\sqrt x}\\)?", answer: "\\(1+x^{-1/2}\\)" },
        { prompt: "\\(3^{\\log_3 5}\\)?", answer: "\\(5\\)" },
        { prompt: "\\(x^{\\log_2x}\\) at \\(x=2\\)?", answer: "\\(2\\)" },
      ],
      pyqExampleId: "4957b4cc-68e5-4a01-ac8e-f268124fe96b", // 2021 — the (x + 1)/(x^{2/3} - x^{1/3} + 1) bracket, power 10
      traps: [
        {
          title: "Check the numerator's sign",
          body: "\\(\\frac{x-1}{x-\\sqrt x}\\) collapses; \\(\\frac{x+1}{x-\\sqrt x}\\) does not. If the bracket will not simplify, re-read it before expanding a messy expression.",
        },
      ],
    },

    // C3 — equate coefficients from two expansions
    {
      kind: "formula" as const,
      slug: "jbin-equate",
      name: "Equating coefficients from two expansions",
      intuition:
        "When the coefficient of one power in one expansion equals that of another power in a second, find each \\(r\\) separately, write both coefficients, and divide. Often the binomial coefficients are equal by symmetry, \\(\\binom{n}{r}=\\binom{n}{n-r}\\), and cancel, leaving a relation such as \\(ab=1\\).",
      definition:
        "- Find \\(r\\) in each expansion from its own power of \\(x\\).\n" +
        "- \\(\\binom nr=\\binom n{n-r}\\): the two binomial coefficients often cancel.\n" +
        "- Ratio of two terms of one expansion: \\(\\frac{T_{s+1}}{T_{r+1}}\\) keeps only the changed powers.",
      formula: {
        label: "Symmetry of coefficients",
        latex: "\\binom nr=\\binom n{n-r}",
      },
      authoredExample: {
        prompt: "The coefficient of \\(x^4\\) in \\(\\left(ax+\\frac1x\\right)^{6}\\) equals that of \\(x^{-2}\\) in \\(\\left(x+\\frac{a}{x}\\right)^{6}\\), \\(a>0\\). Find \\(a\\).",
        steps: [
          "First: \\(6-2r=4\\Rightarrow r=1\\), coefficient \\(\\binom61a^5=6a^5\\).",
          "Second: \\(6-2r=-2\\Rightarrow r=4\\), coefficient \\(\\binom64a^4=15a^4\\).",
        ],
        answer: "\\(6a^5=15a^4\\), so \\(a=\\frac52\\).",
      },
      selfCheckExample: {
        prompt: "In \\((1+ax)^{10}\\), the coefficient of \\(x^2\\) is 5 times that of \\(x\\). Find \\(a\\).",
        steps: [
          "\\(\\binom{10}2a^2=5\\binom{10}1a\\Rightarrow45a=50\\).",
        ],
        answer: "\\(a=\\frac{10}{9}\\).",
      },
      practiceSet: [
        { prompt: "\\(\\binom{11}{5}\\) vs \\(\\binom{11}{6}\\)?", answer: "Equal" },
        { prompt: "\\(a^6b^{-9}=a^9b^{-6}\\) gives?", answer: "\\((ab)^3=1\\)" },
        { prompt: "\\(\\frac{T_{13}}{T_7}\\) in \\((p+q)^{18}\\)?", answer: "\\(\\left(\\frac qp\\right)^{6}\\)" },
        { prompt: "\\(b^{-5}=b^{-6}\\), \\(b\\neq0\\): \\(b\\)?", answer: "\\(1\\)" },
      ],
      pyqExampleId: "b20c0253-7349-40e9-b18d-dc708f84c6b2", // 2023 — x^7 in (ax - 1/(bx^2))^13 and x^-5 in (ax + 1/(bx^2))^13
      traps: [
        {
          title: "Signs from the second term",
          body: "In \\(\\left(ax-\\frac{1}{bx^2}\\right)^{n}\\) the term carries \\((-1)^r\\). If the two coefficients have opposite signs, they cannot be equal for positive \\(a,b\\) — check the parity of each \\(r\\).",
        },
      ],
    },
  ],
};
