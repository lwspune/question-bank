import type { SubtopicNote } from "@/app/notes/_types";

export const POWERSUMS_QE_NOTE: SubtopicNote = {
  subtopicName: "Symmetric Functions and Power Sums",
  title: "Symmetric Functions and Power Sums",
  oneLineDefinition:
    "Writing any symmetric expression in the roots — sums of squares, fourth powers, reciprocals — in terms of the sum and product, and cutting high powers down with a recurrence.",
  whyItMatters:
    "Twenty-two PYQs, fifteen of them multiple choice. Nine rebuild expressions like α² + β², α⁴ + β⁴ or 1/α² + 1/β² from the sum and product, often to find an unknown coefficient; thirteen handle high powers such as α²⁵ + β²⁵, mostly with the recurrence the equation itself gives. Two ideas cover the page.",
  concepts: [
    // C1 — symmetric expressions
    {
      kind: "formula" as const,
      slug: "jqe-symmetric",
      name: "Symmetric expressions from the sum and product",
      intuition:
        "An expression that stays the same when \\(\\alpha\\) and \\(\\beta\\) swap can always be written in \\(s=\\alpha+\\beta\\) and \\(p=\\alpha\\beta\\). Build it in steps: squares first, then fourth powers from the squares. A sum of reciprocal powers is the same expression divided by a power of \\(p\\). When \\(s\\) or \\(p\\) is unknown, set the given value equal to the expression and solve for it.",
      definition:
        "- \\(\\alpha^2+\\beta^2=s^2-2p\\).\n" +
        "- \\(\\alpha^3+\\beta^3=s^3-3ps\\).\n" +
        "- \\(\\alpha^4+\\beta^4=(s^2-2p)^2-2p^2\\).\n" +
        "- \\(\\frac1{\\alpha^2}+\\frac1{\\beta^2}=\\frac{s^2-2p}{p^2}\\).",
      formula: {
        label: "Squares to fourth powers",
        latex: "\\alpha^4+\\beta^4=\\left(\\alpha^2+\\beta^2\\right)^2-2(\\alpha\\beta)^2",
      },
      authoredExample: {
        prompt: "The roots of \\(x^2-3x+1=0\\) are \\(\\alpha,\\beta\\). Find \\(\\alpha^4+\\beta^4\\).",
        steps: [
          "\\(s=3\\), \\(p=1\\), so \\(\\alpha^2+\\beta^2=9-2=7\\).",
          "\\(\\alpha^4+\\beta^4=7^2-2\\cdot1^2\\).",
        ],
        answer: "\\(47\\).",
      },
      selfCheckExample: {
        prompt: "Real numbers \\(a,b\\) have \\(a+b=4\\) and \\(a^2+b^2=10\\). Find \\(ab\\) and \\(a^3+b^3\\).",
        steps: [
          "\\(ab=\\frac{16-10}{2}=3\\).",
          "\\(a^3+b^3=4^3-3\\cdot3\\cdot4\\).",
        ],
        answer: "\\(ab=3\\), \\(a^3+b^3=28\\).",
      },
      practiceSet: [
        { prompt: "Roots of \\(x^2+2x-4=0\\): \\(\\alpha^2+\\beta^2\\)?", answer: "\\(12\\)" },
        { prompt: "Roots of \\(x^2-x+2=0\\): \\(\\alpha^3+\\beta^3\\)?", answer: "\\(-5\\)" },
        { prompt: "Roots of \\(2x^2-4x+1=0\\): \\(\\frac1{\\alpha^2}+\\frac1{\\beta^2}\\)?", answer: "\\(12\\)" },
        { prompt: "Least value of \\(\\alpha^2+\\beta^2\\) for \\(x^2-kx+k-1=0\\)?", answer: "\\(1\\), at \\(k=1\\)" },
      ],
      pyqExampleId: "3c518347-fcae-40c2-9963-575fc19a6289", // 2025 — extreme values of α^4 + β^4 as θ varies
      traps: [
        {
          title: "Check that the roots can exist",
          body: "Solving for the product often gives two values. For real roots keep only one with \\(s^2-4p\\ge0\\); if the numbers must also be positive, the product must be positive too.",
        },
      ],
    },

    // C2 — recurrence
    {
      kind: "formula" as const,
      slug: "jqe-recurrence",
      name: "High powers by a recurrence",
      intuition:
        "If \\(\\alpha\\) is a root of \\(x^2-sx+p=0\\), then \\(\\alpha^2=s\\alpha-p\\). Multiply by \\(\\alpha^{n-2}\\): \\(\\alpha^n=s\\alpha^{n-1}-p\\alpha^{n-2}\\). The same holds for \\(\\beta\\), so any \\(P_n=k\\alpha^n+m\\beta^n\\) obeys the same rule. A question like \\(\\frac{P_{20}-3P_{19}}{P_{18}}\\) is built to collapse: match its coefficients to the equation and the ratio is a constant.",
      definition:
        "- \\(x^2-sx+p=0\\) gives \\(P_n=sP_{n-1}-pP_{n-2}\\).\n" +
        "- It holds for \\(\\alpha^n+\\beta^n\\), \\(\\alpha^n-\\beta^n\\) and any \\(k\\alpha^n+m\\beta^n\\).\n" +
        "- Match the question's coefficients to the recurrence; the leftover term is what remains.",
      formula: {
        label: "Power-sum recurrence",
        latex: "x^2=sx-p\\ \\Rightarrow\\ P_n=sP_{n-1}-pP_{n-2}",
      },
      authoredExample: {
        prompt: "The roots of \\(x^2-3x-5=0\\) are \\(\\alpha,\\beta\\), and \\(P_n=\\alpha^n+\\beta^n\\). Find \\(\\frac{P_{20}-3P_{19}}{P_{18}}\\).",
        steps: [
          "\\(\\alpha^2=3\\alpha+5\\), so \\(P_n=3P_{n-1}+5P_{n-2}\\).",
          "\\(P_{20}-3P_{19}=5P_{18}\\).",
        ],
        answer: "\\(5\\).",
      },
      selfCheckExample: {
        prompt: "\\(\\alpha+\\beta=2\\), \\(\\alpha\\beta=-1\\) and \\(P_n=\\alpha^n+\\beta^n\\). Given \\(P_4=34\\) and \\(P_5=82\\), find \\(P_6\\).",
        steps: [
          "The equation is \\(x^2-2x-1=0\\), so \\(P_n=2P_{n-1}+P_{n-2}\\).",
          "\\(P_6=2\\cdot82+34\\).",
        ],
        answer: "\\(198\\).",
      },
      practiceSet: [
        { prompt: "\\(x^2-x-1=0\\): \\(P_{10}-P_9\\) equals?", answer: "\\(P_8\\)" },
        { prompt: "\\(x^2+2x-3=0\\): \\(\\frac{P_{12}+2P_{11}}{P_{10}}\\)?", answer: "\\(3\\)" },
        { prompt: "\\(x^2-4x+2=0\\), \\(a_n=\\alpha^n-\\beta^n\\): \\(a_9-4a_8\\)?", answer: "\\(-2a_7\\)" },
        { prompt: "\\(P_0\\) for \\(P_n=\\alpha^n+\\beta^n\\)?", answer: "\\(2\\)" },
      ],
      pyqExampleId: "722e001f-8829-4856-9671-1c0bb13f9d97", // 2024 — a combination of P_10, P_11, P_12 for P_n = α^n − β^n
      traps: [
        {
          title: "Read the sign of the product",
          body: "For \\(x^2-sx+p=0\\) the rule is \\(P_n=sP_{n-1}-pP_{n-2}\\). With \\(x^2-2x-3=0\\), \\(p=-3\\), so \\(P_n=2P_{n-1}+3P_{n-2}\\): the minus sign becomes a plus.",
        },
      ],
    },
  ],
};
