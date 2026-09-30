import type { SubtopicNote } from "@/app/notes/_types";

export const INFINITY_LIM_NOTE: SubtopicNote = {
  subtopicName: "Limits at Infinity and Limits of Sums",
  title: "Limits at Infinity and Limits of Sums",
  oneLineDefinition:
    "Limits as x or n grows without bound: comparing the fastest-growing terms, summing a finite series before taking the limit, and turning a sum into an integral.",
  whyItMatters:
    "Seventeen PYQs, sixteen of them multiple choice. Six compare the highest powers or rationalise a difference of surds; five sum a series in closed form first; six recognise a Riemann sum and evaluate it as an integral. Three ideas cover the page.",
  concepts: [
    // C1 — dominant terms
    {
      kind: "formula" as const,
      slug: "jlim-dominant",
      name: "The dominant terms",
      intuition:
        "As \\(x\\to\\infty\\), a polynomial behaves like its highest power, so a ratio of polynomials behaves like the ratio of leading terms. A difference like \\(\\sqrt{x^2+x}-x\\) is \\(\\infty-\\infty\\); rationalise it first, then compare leading terms.",
      definition:
        "- Equal degrees: the ratio of leading coefficients.\n" +
        "- Higher degree on top: \\(\\pm\\infty\\); higher below: 0.\n" +
        "- \\(\\sqrt{P}-\\sqrt Q\\): multiply by the conjugate.\n" +
        "- \\(e^x\\) beats any power of \\(x\\), which beats \\(\\ln x\\).",
      formula: {
        label: "Leading terms",
        latex: "\\lim_{x\\to\\infty}\\frac{a_nx^n+\\dots}{b_nx^n+\\dots}=\\frac{a_n}{b_n}",
      },
      authoredExample: {
        prompt: "Find \\(\\lim_{x\\to\\infty}\\frac{3x^2+5}{2x^2-x}\\).",
        steps: [
          "Equal degrees: \\(\\frac32\\).",
        ],
        answer: "\\(\\frac32\\).",
      },
      selfCheckExample: {
        prompt: "Find \\(\\lim_{x\\to\\infty}\\left(\\sqrt{x^2+x}-x\\right)\\).",
        steps: [
          "\\(\\frac{x}{\\sqrt{x^2+x}+x}=\\frac1{\\sqrt{1+1/x}+1}\\).",
        ],
        answer: "\\(\\frac12\\).",
      },
      practiceSet: [
        { prompt: "\\(\\lim\\frac{x^3}{e^x}\\)?", answer: "\\(0\\)" },
        { prompt: "\\(\\lim\\frac{2x+1}{x^2}\\)?", answer: "\\(0\\)" },
        { prompt: "\\(\\lim\\left(\\sqrt{x+1}-\\sqrt x\\right)\\)?", answer: "\\(0\\)" },
        { prompt: "\\(\\lim\\frac{\\ln x}{x}\\)?", answer: "\\(0\\)" },
      ],
      pyqExampleId: "c730ccff-2136-4b6c-b3c9-c1f0d0d9cf94", // 2023 — a limit at infinity by dominant terms
      traps: [
        {
          title: "Infinity minus infinity is not 0",
          body: "\\(\\sqrt{x^2+x}-x\\) tends to \\(\\frac12\\), not 0. Rationalise before comparing.",
        },
      ],
    },

    // C2 — sums in closed form
    {
      kind: "formula" as const,
      slug: "jlim-sums",
      name: "Sum first, then take the limit",
      intuition:
        "When the number of terms grows with \\(n\\), the limit of the sum is not the sum of the limits. Find the sum in closed form — arithmetic or geometric series, \\(\\sum k\\), \\(\\sum k^2\\), telescoping — and then let \\(n\\to\\infty\\).",
      definition:
        "- \\(\\sum_{k=1}^nk=\\frac{n(n+1)}2\\), \\(\\sum k^2=\\frac{n(n+1)(2n+1)}6\\), \\(\\sum k^3=\\left(\\frac{n(n+1)}2\\right)^2\\).\n" +
        "- Telescoping: \\(\\frac1{k(k+1)}=\\frac1k-\\frac1{k+1}\\).\n" +
        "- Geometric: \\(\\sum_{k\\ge0}r^k=\\frac1{1-r}\\) for \\(|r|<1\\).",
      formula: {
        label: "Power sums",
        latex: "\\sum_{k=1}^nk^2=\\frac{n(n+1)(2n+1)}6",
      },
      authoredExample: {
        prompt: "Find \\(\\lim_{n\\to\\infty}\\frac{1+2+\\dots+n}{n^2}\\).",
        steps: [
          "\\(\\frac{n(n+1)}{2n^2}\\to\\frac12\\).",
        ],
        answer: "\\(\\frac12\\).",
      },
      selfCheckExample: {
        prompt: "Find \\(\\lim_{n\\to\\infty}\\frac{1^2+2^2+\\dots+n^2}{n^3}\\).",
        steps: [
          "\\(\\frac{n(n+1)(2n+1)}{6n^3}\\to\\frac26\\).",
        ],
        answer: "\\(\\frac13\\).",
      },
      practiceSet: [
        { prompt: "\\(\\lim\\sum_{k=1}^n\\frac1{k(k+1)}\\)?", answer: "\\(1\\)" },
        { prompt: "\\(\\lim\\frac{1^3+\\dots+n^3}{n^4}\\)?", answer: "\\(\\frac14\\)" },
        { prompt: "\\(\\sum_{k\\ge0}\\left(\\frac13\\right)^k\\)?", answer: "\\(\\frac32\\)" },
        { prompt: "\\(\\lim\\frac1{n^2}\\sum_{k=1}^n k\\) (again)?", answer: "\\(\\frac12\\)" },
      ],
      pyqExampleId: "9ee1d807-c7b1-4d45-b767-6d0741914328", // 2025 — a limit of a sum found in closed form
      traps: [
        {
          title: "Many small terms can add to something",
          body: "Each term \\(\\frac k{n^2}\\) tends to 0, but there are \\(n\\) of them and their sum tends to \\(\\frac12\\). Sum first.",
        },
      ],
    },

    // C3 — Riemann sums
    {
      kind: "formula" as const,
      slug: "jlim-riemann",
      name: "Sums as integrals",
      intuition:
        "A sum \\(\\frac1n\\sum_{k=1}^nf\\left(\\frac kn\\right)\\) adds the areas of \\(n\\) thin rectangles under \\(y=f(x)\\) on \\([0,1]\\), so its limit is \\(\\int_0^1f(x)\\,dx\\). Write the general term as \\(\\frac1n\\) times a function of \\(\\frac kn\\), then integrate.",
      definition:
        "- \\(\\lim_{n\\to\\infty}\\frac1n\\sum_{k=1}^nf\\left(\\frac kn\\right)=\\int_0^1f(x)\\,dx\\).\n" +
        "- Replace \\(\\frac kn\\) by \\(x\\) and \\(\\frac1n\\) by \\(dx\\).\n" +
        "- If \\(k\\) runs to \\(2n\\), the upper limit becomes 2.",
      formula: {
        label: "Riemann sum",
        latex: "\\lim_{n\\to\\infty}\\frac1n\\sum_{k=1}^{n}f\\!\\left(\\frac kn\\right)=\\int_0^1f(x)\\,dx",
      },
      authoredExample: {
        prompt: "Find \\(\\lim_{n\\to\\infty}\\sum_{k=1}^n\\frac1{n+k}\\).",
        steps: [
          "\\(\\frac1n\\sum\\frac1{1+k/n}\\to\\int_0^1\\frac{dx}{1+x}\\).",
        ],
        answer: "\\(\\ln2\\).",
      },
      selfCheckExample: {
        prompt: "Find \\(\\lim_{n\\to\\infty}\\frac1n\\sum_{k=1}^ne^{k/n}\\).",
        steps: [
          "\\(\\int_0^1e^x\\,dx\\).",
        ],
        answer: "\\(e-1\\).",
      },
      practiceSet: [
        { prompt: "\\(\\lim\\frac1n\\sum\\frac kn\\)?", answer: "\\(\\frac12\\)" },
        { prompt: "\\(\\lim\\sum_{k=1}^n\\frac n{n^2+k^2}\\)?", answer: "\\(\\frac\\pi4\\)" },
        { prompt: "\\(\\lim\\frac1n\\sum_{k=1}^{2n}\\frac kn\\)?", answer: "\\(2\\)" },
        { prompt: "\\(\\lim\\frac1n\\sum\\left(\\frac kn\\right)^3\\)?", answer: "\\(\\frac14\\)" },
      ],
      pyqExampleId: "4f35ea04-53f0-46fb-9fd8-2ca662a3d110", // 2023 — a limit of a sum as a definite integral
      traps: [
        {
          title: "Find the right limits of integration",
          body: "The limits come from where \\(\\frac kn\\) starts and ends. If \\(k\\) runs from \\(n\\) to \\(3n\\), the integral is over \\([1,3]\\).",
        },
      ],
    },
  ],
};
