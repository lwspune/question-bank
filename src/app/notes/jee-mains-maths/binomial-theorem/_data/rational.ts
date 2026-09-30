import type { SubtopicNote } from "@/app/notes/_types";

export const RATIONAL_BIN_NOTE: SubtopicNote = {
  subtopicName: "Rational and Integral Terms",
  title: "Rational and Integral Terms",
  oneLineDefinition:
    "Expansions of sums of surds: counting or adding the terms that are rational or integral, and finding the integral part of a power of a surd by pairing it with its conjugate.",
  whyItMatters:
    "Ten PYQs, four of them numerical answer. Eight count or add rational terms, which is a divisibility condition on r; two need the integral part of a number like (7 + 4√3) to a power, where the conjugate does the work. Two ideas cover the page.",
  concepts: [
    // C1 — count or sum rational terms
    {
      kind: "formula" as const,
      slug: "jbin-rational",
      name: "Counting and adding rational terms",
      intuition:
        "In \\(\\left(p^{1/a}+q^{1/b}\\right)^n\\) the general term is \\(\\binom nr p^{(n-r)/a}q^{r/b}\\). It is rational exactly when \\(a\\) divides \\(n-r\\) and \\(b\\) divides \\(r\\). So the rational terms are the \\(r\\) in an arithmetic progression; count them, or add those few terms. Irrational terms are the total \\(n+1\\) minus the rational ones.",
      definition:
        "- Rational: \\(a\\mid(n-r)\\) and \\(b\\mid r\\).\n" +
        "- If \\(a\\mid n\\), the condition is \\(\\operatorname{lcm}(a,b)\\mid r\\).\n" +
        "- Number of multiples of \\(m\\) in \\([0,n]\\): \\(\\left\\lfloor\\frac nm\\right\\rfloor+1\\).\n" +
        "- Irrational terms \\(=n+1-\\) rational terms.",
      formula: {
        label: "Rational-term condition",
        latex: "\\binom nr p^{\\frac{n-r}{a}}q^{\\frac rb}\\ \\text{is rational exactly when}\\ a\\mid(n-r)\\ \\text{and}\\ b\\mid r",
      },
      authoredExample: {
        prompt: "How many rational terms are in \\(\\left(3^{1/2}+2^{1/3}\\right)^{12}\\)?",
        steps: [
          "\\(2\\mid(12-r)\\) and \\(3\\mid r\\): \\(r\\) a multiple of 6.",
          "\\(r=0,6,12\\).",
        ],
        answer: "3.",
      },
      selfCheckExample: {
        prompt: "Find the sum of the rational terms of \\(\\left(\\sqrt2+1\\right)^{4}\\).",
        steps: [
          "\\(r\\) (the power of \\(\\sqrt2\\)) even: \\(1+\\binom42\\cdot2+4=1+12+4\\).",
        ],
        answer: "\\(17\\).",
      },
      practiceSet: [
        { prompt: "Multiples of 4 in \\([0,680]\\)?", answer: "\\(171\\)" },
        { prompt: "Terms in \\((a+b)^{60}\\)?", answer: "\\(61\\)" },
        { prompt: "Rational terms of \\((2^{1/5}+3^{1/10})^{20}\\): \\(r\\) a multiple of?", answer: "10" },
        { prompt: "Is \\(\\binom{8}{3}2^{5/2}\\) rational?", answer: "No" },
      ],
      pyqExampleId: "79d618ae-5e84-43e8-ba34-14d6f0f164ae", // 2024 — sum of rational terms of (2^{1/5} + 5^{1/3})^15
      traps: [
        {
          title: "Both exponents must be whole",
          body: "Checking only \\(b\\mid r\\) is not enough: \\(\\frac{n-r}{a}\\) must be an integer too. When \\(a\\) does not divide \\(n\\), the valid \\(r\\) are shifted, not multiples of \\(\\operatorname{lcm}(a,b)\\).",
        },
      ],
    },

    // C2 — conjugates
    {
      kind: "formula" as const,
      slug: "jbin-conjugate",
      name: "Integral parts through the conjugate",
      intuition:
        "Let \\(x=(a+\\sqrt b)^n\\) with conjugate \\(y=(a-\\sqrt b)^n\\). In \\(x+y\\) the surd terms cancel, so \\(x+y\\) is an integer. If \\(0<a-\\sqrt b<1\\), then \\(0<y<1\\) and \\([x]=x+y-1\\). If \\(-1<a-\\sqrt b<0\\), \\(y\\) has the sign of \\((-1)^n\\), and the integral part follows the same way.",
      definition:
        "- \\((a+\\sqrt b)^n+(a-\\sqrt b)^n=2\\left[a^n+\\binom n2a^{n-2}b+\\dots\\right]\\), an even integer.\n" +
        "- \\(0<y<1\\Rightarrow[x]=(x+y)-1\\), odd.\n" +
        "- \\(-1<y<0\\Rightarrow[x]=x+y\\), even.\n" +
        "- \\((7+4\\sqrt3)(7-4\\sqrt3)=1\\).",
      formula: {
        label: "Conjugate pair",
        latex: "x=(a+\\sqrt b)^n,\\ y=(a-\\sqrt b)^n:\\quad x+y\\in\\mathbb Z,\\ \\ 0<y<1\\Rightarrow[x]=x+y-1",
      },
      authoredExample: {
        prompt: "Is the integral part of \\((2+\\sqrt3)^{5}\\) odd or even?",
        steps: [
          "\\(0<2-\\sqrt3<1\\), so \\(0<y<1\\) and \\([x]=(x+y)-1\\).",
          "\\(x+y\\) is twice an integer, so even.",
        ],
        answer: "Odd.",
      },
      selfCheckExample: {
        prompt: "Find \\((3+\\sqrt5)^2+(3-\\sqrt5)^2\\).",
        steps: [
          "\\(2(9+5)\\).",
        ],
        answer: "\\(28\\).",
      },
      practiceSet: [
        { prompt: "\\((\\sqrt2+1)^n+(\\sqrt2-1)^n\\) for even \\(n\\) is?", answer: "An integer" },
        { prompt: "Is \\(13-8\\sqrt3\\) between \\(-1\\) and 0?", answer: "Yes" },
        { prompt: "Fractional part of \\(x\\) if \\(x+y\\) is an integer and \\(0<y<1\\)?", answer: "\\(1-y\\)" },
        { prompt: "\\((5+2\\sqrt6)(5-2\\sqrt6)\\)?", answer: "\\(1\\)" },
      ],
      pyqExampleId: "af0f901a-4824-4453-9602-4214f329a2fa", // 2023 — [ (8√3 + 13)^13 ] + [ (7√2 + 9)^9 ]
      traps: [
        {
          title: "A negative conjugate",
          body: "When \\(a-\\sqrt b\\) is negative, \\(y\\) changes sign with \\(n\\). For odd \\(n\\), \\(y\\) is negative and \\([x]=x+y\\) exactly; subtracting 1 by habit gives the wrong parity.",
        },
      ],
    },
  ],
};
