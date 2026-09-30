import type { SubtopicNote } from "@/app/notes/_types";

export const SUMS_PRODUCTS_BIN_NOTE: SubtopicNote = {
  subtopicName: "Sums with Fractions and Products of Coefficients",
  title: "Sums with Fractions and Products of Coefficients",
  oneLineDefinition:
    "Sums where each coefficient is divided by r + 1, which integration or the identity C(n, r)/(r + 1) = C(n + 1, r + 1)/(n + 1) handles; and sums of products of two coefficients, which Vandermonde's identity turns into one coefficient.",
  whyItMatters:
    "Seventeen PYQs, and five of them are from 2026. Seven divide by r + 1 and need one identity or one integral; ten multiply two coefficients together, and each is a single coefficient of a product of two expansions. Two ideas cover the page.",
  concepts: [
    // C1 — divide by r + 1
    {
      kind: "formula" as const,
      slug: "jbin-integrate",
      name: "Coefficients divided by r + 1",
      intuition:
        "Dividing by \\(r+1\\) is what integration does to \\(x^r\\). So \\(\\sum\\frac{\\binom nr}{r+1}x^{r+1}=\\int_0^x(1+t)^n\\,dt\\), and at \\(x=1\\) the sum is \\(\\frac{2^{n+1}-1}{n+1}\\). Without integrating, \\(\\frac{\\binom nr}{r+1}=\\frac{\\binom{n+1}{r+1}}{n+1}\\) turns the sum into a plain sum of coefficients of \\((1+x)^{n+1}\\), missing the first term.",
      definition:
        "- \\(\\frac{\\binom nr}{r+1}=\\frac{1}{n+1}\\binom{n+1}{r+1}\\).\n" +
        "- \\(\\sum_{r=0}^{n}\\frac{\\binom nr}{r+1}=\\frac{2^{n+1}-1}{n+1}\\).\n" +
        "- \\(\\sum_{r=0}^{n}\\frac{(-1)^r\\binom nr}{r+1}=\\frac{1}{n+1}\\).\n" +
        "- With powers of \\(x\\): integrate \\((1+x)^n\\) from 0 to the value.",
      formula: {
        label: "Absorption into n + 1",
        latex: "\\sum_{r=0}^{n}\\frac{\\binom nr}{r+1}=\\frac{1}{n+1}\\sum_{r=0}^{n}\\binom{n+1}{r+1}=\\frac{2^{n+1}-1}{n+1}",
      },
      authoredExample: {
        prompt: "Find \\(\\binom50+\\frac{\\binom51}{2}+\\frac{\\binom52}{3}+\\dots+\\frac{\\binom55}{6}\\).",
        steps: [
          "\\(\\frac{2^6-1}{6}\\).",
        ],
        answer: "\\(\\frac{63}{6}=\\frac{21}{2}\\).",
      },
      selfCheckExample: {
        prompt: "Find \\(\\sum_{r=0}^{4}\\frac{(-1)^r\\binom4r}{r+1}\\).",
        steps: [
          "\\(\\int_0^1(1-x)^4\\,dx\\).",
        ],
        answer: "\\(\\frac15\\).",
      },
      practiceSet: [
        { prompt: "\\(\\frac{\\binom{7}{2}}{3}\\) as a multiple of \\(\\binom{8}{3}\\)?", answer: "\\(\\frac18\\binom83\\)" },
        { prompt: "\\(\\int_0^2(1+x)^n\\,dx\\)?", answer: "\\(\\frac{3^{n+1}-1}{n+1}\\)" },
        { prompt: "\\(\\sum_{r=0}^{n}\\frac{\\binom nr2^{r+1}}{r+1}\\)?", answer: "\\(\\frac{3^{n+1}-1}{n+1}\\)" },
        { prompt: "\\(\\sum_{k=0}^{\\infty}\\frac{2^k}{k!}\\)?", answer: "\\(e^2\\)" },
      ],
      pyqExampleId: "9dac746a-9f3a-40ff-aca4-acfb22b2d5c1", // 2024 — 11C1/2 + 11C2/3 + ... + 11C9/10
      traps: [
        {
          title: "Trim the ends you are not given",
          body: "If the sum stops at \\(\\frac{\\binom{11}{9}}{10}\\), the identity gives \\(\\frac{1}{12}\\sum\\binom{12}{j}\\) over \\(j=2,\\dots,10\\) only. Subtract the missing \\(\\binom{12}{0},\\binom{12}{1},\\binom{12}{11},\\binom{12}{12}\\) from \\(2^{12}\\).",
        },
      ],
    },

    // C2 — Vandermonde
    {
      kind: "formula" as const,
      slug: "jbin-vandermonde",
      name: "Products of coefficients: Vandermonde",
      intuition:
        "A sum \\(\\sum\\binom mr\\binom n{k-r}\\), whose lower indices add to a constant \\(k\\), is the coefficient of \\(x^k\\) in \\((1+x)^m(1+x)^n\\), so it equals \\(\\binom{m+n}{k}\\). If the lower indices are equal instead, flip one with \\(\\binom nr=\\binom n{n-r}\\) first. Weights \\(r\\binom nr^2\\) use the pairing trick: add the sum to itself written backwards.",
      definition:
        "- Vandermonde: \\(\\sum_r\\binom mr\\binom n{k-r}=\\binom{m+n}k\\).\n" +
        "- \\(\\sum_r\\binom nr^2=\\binom{2n}n\\).\n" +
        "- \\(\\sum_r\\binom nr\\binom n{r+1}=\\binom{2n}{n+1}\\).\n" +
        "- \\(\\sum_rr\\binom nr^2=\\frac n2\\binom{2n}n\\) (pair \\(r\\) with \\(n-r\\)).",
      formula: {
        label: "Vandermonde's identity",
        latex: "\\sum_{r}\\binom mr\\binom n{k-r}=\\binom{m+n}{k}",
      },
      authoredExample: {
        prompt: "Find \\(\\sum_{r=0}^{5}\\binom5r\\binom7r\\).",
        steps: [
          "Write \\(\\binom7r=\\binom7{7-r}\\): lower indices add to 7.",
        ],
        answer: "\\(\\binom{12}{7}=792\\).",
      },
      selfCheckExample: {
        prompt: "Find \\(\\sum_{r=0}^{4}\\binom4r^2\\).",
        steps: [
          "\\(\\binom84\\).",
        ],
        answer: "\\(70\\).",
      },
      practiceSet: [
        { prompt: "\\(\\sum\\binom{10}{r}\\binom{15}{8-r}\\)?", answer: "\\(\\binom{25}{8}\\)" },
        { prompt: "\\(\\sum_{r=0}^{3}\\binom3r\\binom3{3-r}\\)?", answer: "\\(20\\)" },
        { prompt: "\\(\\sum_{i\\neq j}\\binom ni\\binom nj\\)?", answer: "\\(2^{2n}-\\binom{2n}n\\)" },
        { prompt: "\\(\\sum r\\binom4r^2\\)?", answer: "\\(140\\)" },
      ],
      pyqExampleId: "fec52a2f-add4-4ad8-b837-66b962ce7e0d", // 2023 — sum of 22Cr · 23Cr
      traps: [
        {
          title: "Match the indices before summing",
          body: "\\(\\sum\\binom mr\\binom nr\\) is not \\(\\binom{m+n}{r}\\) — \\(r\\) is the summation variable. Rewrite one factor so the lower indices add to a fixed number; that fixed number is the answer's lower index.",
        },
      ],
    },
  ],
};
