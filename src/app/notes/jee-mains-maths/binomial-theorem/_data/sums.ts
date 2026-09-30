import type { SubtopicNote } from "@/app/notes/_types";

export const SUMS_BIN_NOTE: SubtopicNote = {
  subtopicName: "Coefficient Sums by Substitution and Differentiation",
  title: "Coefficient Sums by Substitution and Differentiation",
  oneLineDefinition:
    "Adding binomial coefficients, with or without weights: substitute a value of x into the expansion for plain and alternating sums, and pull out the weight r with the identity r·C(n, r) = n·C(n − 1, r − 1) for weighted sums.",
  whyItMatters:
    "Twenty-six PYQs, thirteen of them numerical answer, and 2025 alone has eight. Every sum here is one expansion evaluated at a chosen x — 1, −1, a complex root — or that expansion differentiated. Two ideas cover the page.",
  concepts: [
    // C1 — substitution
    {
      kind: "formula" as const,
      slug: "jbin-substitute",
      name: "Substituting x = 1, −1 and other values",
      intuition:
        "Write \\(f(x)=\\sum a_rx^r\\). Then \\(f(1)\\) is the sum of all coefficients, \\(f(-1)\\) the alternating sum, and \\(\\frac{f(1)\\pm f(-1)}{2}\\) the sums of even- and odd-indexed coefficients. For \\((1+x)^n\\) this gives \\(2^n\\), 0 and \\(2^{n-1}\\). Alternating sums of an odd set of coefficients, or \\(x=i\\) and cube roots of unity, pick out other sub-sums.",
      definition:
        "- \\(\\sum\\binom nr=2^n\\); \\(\\sum(-1)^r\\binom nr=0\\).\n" +
        "- \\(\\binom n0+\\binom n2+\\dots=\\binom n1+\\binom n3+\\dots=2^{n-1}\\).\n" +
        "- Odd-indexed coefficients of \\(f\\): \\(\\frac{f(1)-f(-1)}{2}\\).\n" +
        "- Partial alternating sum: \\(\\sum_{r=0}^{k}(-1)^r\\binom nr=(-1)^k\\binom{n-1}{k}\\).",
      formula: {
        label: "Even and odd parts",
        latex: "\\sum_{r\\ \\text{even}}a_r=\\frac{f(1)+f(-1)}{2},\\qquad\\sum_{r\\ \\text{odd}}a_r=\\frac{f(1)-f(-1)}{2}",
      },
      authoredExample: {
        prompt: "\\((1+x+x^2)^{4}=\\sum_{r=0}^{8}a_rx^r\\). Find \\(a_0+a_2+a_4+a_6+a_8\\).",
        steps: [
          "\\(f(1)=3^4=81\\), \\(f(-1)=1\\).",
        ],
        answer: "\\(\\frac{81+1}{2}=41\\).",
      },
      selfCheckExample: {
        prompt: "Find \\(\\binom{10}{1}+\\binom{10}{3}+\\dots+\\binom{10}{9}\\).",
        steps: [
          "Half of \\(2^{10}\\).",
        ],
        answer: "\\(512\\).",
      },
      practiceSet: [
        { prompt: "Sum of coefficients of \\((1-3x+10x^2)^n\\)?", answer: "\\(8^n\\)" },
        { prompt: "\\(\\sum_{r=0}^{3}(-1)^r\\binom{8}{r}\\)?", answer: "\\(-\\binom73=-35\\)" },
        { prompt: "\\(\\binom{7}{0}+\\binom72+\\binom74+\\binom76\\)?", answer: "\\(64\\)" },
        { prompt: "Mean of the \\(n+1\\) coefficients of \\((1+x)^n\\)?", answer: "\\(\\frac{2^n}{n+1}\\)" },
      ],
      pyqExampleId: "b4559d7f-a7ed-43cc-8f46-b0d7c52aacd9", // 2021 — a1 + a3 + ... + a37 for (1 + x + 2x^2)^20
      traps: [
        {
          title: "Remove the terms outside the range",
          body: "If the sum stops before the last odd coefficient (say at \\(a_{37}\\) out of \\(a_{39}\\)), compute the full odd sum and subtract the missing coefficient separately.",
        },
      ],
    },

    // C2 — weighted sums
    {
      kind: "formula" as const,
      slug: "jbin-weights",
      name: "Weighted sums: r C(n, r) and r² C(n, r)",
      intuition:
        "The identity \\(r\\binom nr=n\\binom{n-1}{r-1}\\) removes a factor \\(r\\), so \\(\\sum r\\binom nr=n2^{n-1}\\). For \\(r^2\\), write \\(r^2=r(r-1)+r\\) and use \\(r(r-1)\\binom nr=n(n-1)\\binom{n-2}{r-2}\\). Equivalently, differentiate \\((1+x)^n\\) and put \\(x=1\\). A weight like \\(n-r\\) is \\(n\\) minus \\(r\\), handled term by term.",
      definition:
        "- \\(r\\binom nr=n\\binom{n-1}{r-1}\\).\n" +
        "- \\(\\sum r\\binom nr=n2^{n-1}\\).\n" +
        "- \\(\\sum r(r-1)\\binom nr=n(n-1)2^{n-2}\\).\n" +
        "- \\(\\sum r^2\\binom nr=n(n+1)2^{n-2}\\).",
      formula: {
        label: "Weighted sums",
        latex: "\\sum_{r}r\\binom nr=n\\,2^{n-1},\\qquad\\sum_{r}r^2\\binom nr=n(n+1)\\,2^{n-2}",
      },
      authoredExample: {
        prompt: "Find \\(\\sum_{r=0}^{8}(2r+1)\\binom8r\\).",
        steps: [
          "\\(2\\cdot8\\cdot2^7+2^8=2048+256\\).",
        ],
        answer: "\\(2304\\).",
      },
      selfCheckExample: {
        prompt: "Find \\(\\sum_{r=0}^{6}r^2\\binom6r\\).",
        steps: [
          "\\(6\\cdot7\\cdot2^4\\).",
        ],
        answer: "\\(672\\).",
      },
      practiceSet: [
        { prompt: "\\(\\sum r\\binom{10}{r}\\)?", answer: "\\(5\\cdot2^{10}\\)" },
        { prompt: "\\(\\sum(n-r)\\binom nr\\)?", answer: "\\(n2^{n-1}\\)" },
        { prompt: "\\(\\sum(-1)^rr\\binom nr\\) for \\(n\\ge2\\)?", answer: "\\(0\\)" },
        { prompt: "\\(\\sum r(r-1)\\binom5r\\)?", answer: "\\(160\\)" },
      ],
      pyqExampleId: "74bc9e17-ab19-435e-8ac3-6a4071a6423e", // 2025 — sum of r^2 · 15Cr as 2^m 3^n 5^k
      traps: [
        {
          title: "r² is not r · r in the identity",
          body: "Applying \\(r\\binom nr=n\\binom{n-1}{r-1}\\) twice needs the second \\(r\\) rewritten as \\((r-1)+1\\). Treating \\(r^2\\binom nr\\) as \\(n^2\\binom{n-2}{r-2}\\) is the standard wrong turn.",
        },
      ],
    },
  ],
};
