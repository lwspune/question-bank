import type { SubtopicNote } from "@/app/notes/_types";

export const CONSECUTIVE_BIN_NOTE: SubtopicNote = {
  subtopicName: "Consecutive Coefficients and Special Terms",
  title: "Consecutive Coefficients and Special Terms",
  oneLineDefinition:
    "Questions about how neighbouring coefficients compare — their ratio, an A.P. or G.P. among them — and about particular terms: the middle term, the greatest term, and terms counted from the end.",
  whyItMatters:
    "Twenty-four PYQs. One identity does most of the work: the ratio of neighbouring binomial coefficients is a simple fraction in n and r, so a condition on three consecutive coefficients becomes two linear equations. The rest use symmetry to handle middle terms and terms from the end. Two ideas cover the page.",
  concepts: [
    // C1 — ratio of consecutive coefficients
    {
      kind: "formula" as const,
      slug: "jbin-ratio",
      name: "The ratio of neighbouring coefficients",
      intuition:
        "Never expand the factorials. The ratio \\(\\frac{\\binom nr}{\\binom n{r-1}}=\\frac{n-r+1}{r}\\) turns 'three consecutive coefficients in the ratio \\(p:q:s\\)' into two linear equations in \\(n\\) and \\(r\\). An A.P. condition \\(2\\binom nr=\\binom n{r-1}+\\binom n{r+1}\\) becomes a quadratic after dividing by \\(\\binom nr\\). Pascal's rule \\(\\binom nr+\\binom n{r+1}=\\binom{n+1}{r+1}\\) handles sums of neighbours.",
      definition:
        "- \\(\\frac{\\binom nr}{\\binom n{r-1}}=\\frac{n-r+1}{r}\\).\n" +
        "- \\(\\frac{\\binom{n+1}{r+1}}{\\binom nr}=\\frac{n+1}{r+1}\\), \\(\\frac{\\binom nr}{\\binom{n-1}{r-1}}=\\frac nr\\).\n" +
        "- Pascal: \\(\\binom nr+\\binom n{r+1}=\\binom{n+1}{r+1}\\).\n" +
        "- A.P. of \\(\\binom n{r-1},\\binom nr,\\binom n{r+1}\\): \\((n-2r)^2=n+2\\).",
      formula: {
        label: "Neighbour ratio",
        latex: "\\frac{\\binom nr}{\\binom n{r-1}}=\\frac{n-r+1}{r}",
      },
      authoredExample: {
        prompt: "Three consecutive coefficients of \\((1+x)^n\\) are in the ratio \\(1:2:3\\). Find \\(n\\).",
        steps: [
          "\\(\\frac{n-r+1}{r}=2\\Rightarrow n=3r-1\\); \\(\\frac{n-r}{r+1}=\\frac32\\Rightarrow2n=5r+3\\).",
          "\\(6r-2=5r+3\\Rightarrow r=5\\).",
        ],
        answer: "\\(n=14\\).",
      },
      selfCheckExample: {
        prompt: "The coefficients of \\(x^2,x^3,x^4\\) in \\((1+x)^n\\) are in A.P. Find \\(n\\).",
        steps: [
          "With \\(r=3\\): \\((n-6)^2=n+2\\Rightarrow n^2-13n+34=0\\).",
        ],
        answer: "No integer \\(n\\) works (\\(n=\\frac{13\\pm\\sqrt{33}}{2}\\)).",
      },
      practiceSet: [
        { prompt: "\\(\\frac{\\binom{10}{4}}{\\binom{10}{3}}\\)?", answer: "\\(\\frac74\\)" },
        { prompt: "\\(\\binom{12}{5}+\\binom{12}{6}\\)?", answer: "\\(\\binom{13}{6}\\)" },
        { prompt: "A.P. of \\(\\binom n4,\\binom n5,\\binom n6\\): \\(n\\)?", answer: "7 or 14" },
        { prompt: "\\(\\frac{\\binom{36}{r+1}}{\\binom{35}{r}}\\)?", answer: "\\(\\frac{36}{r+1}\\)" },
      ],
      pyqExampleId: "07260f65-2fed-4270-8e10-58a1cf960d22", // 2023 — three consecutive coefficients in ratio 1 : 5 : 20
      traps: [
        {
          title: "Which r is which",
          body: "Fix one labelling — say the middle coefficient is \\(\\binom nr\\) — and write both ratios from it. Mixing \\(r\\) for the first term in one ratio and for the middle in the other gives equations with no integer solution.",
        },
      ],
    },

    // C2 — middle, greatest and end terms
    {
      kind: "formula" as const,
      slug: "jbin-middle",
      name: "Middle, greatest and end terms",
      intuition:
        "For even \\(n\\) there is one middle term, \\(T_{n/2+1}\\), with the greatest binomial coefficient \\(\\binom n{n/2}\\); for odd \\(n\\) there are two. The \\(k\\)-th term from the end of \\((a+b)^n\\) is the \\(k\\)-th term from the start of \\((b+a)^n\\), so the ratio of the \\(k\\)-th from the start to the \\(k\\)-th from the end is \\(\\left(\\frac ab\\right)^{n-2k+2}\\). The greatest term is where \\(\\frac{T_{r+1}}{T_r}\\) drops below 1.",
      definition:
        "- Middle term: \\(T_{n/2+1}\\) (\\(n\\) even); \\(T_{(n+1)/2}\\) and \\(T_{(n+3)/2}\\) (\\(n\\) odd).\n" +
        "- \\(k\\)-th from the end \\(=T_{n-k+2}\\).\n" +
        "- \\(\\frac{T_k(\\text{start})}{T_k(\\text{end})}=\\left(\\frac ab\\right)^{n-2k+2}\\).\n" +
        "- \\(\\frac{T_{r+1}}{T_r}=\\frac{n-r+1}{r}\\cdot\\frac ba\\).",
      formula: {
        label: "Start versus end",
        latex: "\\frac{T_k\\ \\text{(from start)}}{T_k\\ \\text{(from end)}}=\\left(\\frac ab\\right)^{n-2k+2}",
      },
      authoredExample: {
        prompt: "In \\(\\left(2+\\frac12\\right)^{n}\\), the 3rd term from the start is 16 times the 3rd term from the end. Find \\(n\\).",
        steps: [
          "Ratio \\(=4^{n-4}=16\\Rightarrow n-4=2\\).",
        ],
        answer: "\\(n=6\\).",
      },
      selfCheckExample: {
        prompt: "Find the middle term of \\(\\left(x+\\frac1x\\right)^{8}\\).",
        steps: [
          "\\(T_5=\\binom84x^4x^{-4}\\).",
        ],
        answer: "\\(70\\).",
      },
      practiceSet: [
        { prompt: "Middle terms of \\((1+x)^{9}\\)?", answer: "\\(T_5,T_6\\)" },
        { prompt: "Greatest coefficient of \\((1+x)^{10}\\)?", answer: "\\(\\binom{10}{5}=252\\)" },
        { prompt: "4th term from the end of \\((a+b)^{10}\\)?", answer: "\\(T_8\\)" },
        { prompt: "\\(\\binom{19}{9}+\\binom{19}{10}\\)?", answer: "\\(\\binom{20}{10}\\)" },
      ],
      pyqExampleId: "cbb27050-2f82-4867-b718-60e3033e6a04", // 2025 — 15th term from start vs end, ratio 1/6
      traps: [
        {
          title: "The exponent is n - 2k + 2",
          body: "Between the \\(k\\)-th term from the start and the \\(k\\)-th from the end, the powers of \\(a\\) differ by \\(n-2k+2\\), not \\(n-2k\\). Test with \\(k=1\\): the first and last terms differ by \\(a^n\\) against \\(b^n\\).",
        },
      ],
    },
  ],
};
