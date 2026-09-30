import type { SubtopicNote } from "@/app/notes/_types";

export const SERIES_BIN_NOTE: SubtopicNote = {
  subtopicName: "Sums of Expansions: Hockey Stick and Geometric Series",
  title: "Sums of Expansions: Hockey Stick and Geometric Series",
  oneLineDefinition:
    "Finding a coefficient in a sum of many expansions — (1 + x)^3 + (1 + x)^4 + … or (1 + x)^n + x(1 + x)^(n − 1) + … — either by the hockey-stick identity or by summing the geometric series first.",
  whyItMatters:
    "Eleven PYQs, three of them numerical answer. A sum of consecutive binomial coefficients down one column collapses to a single coefficient, and a sum of expansions whose ratio is fixed is a geometric series with a two-term closed form. Two ideas cover the page.",
  concepts: [
    // C1 — hockey stick
    {
      kind: "formula" as const,
      slug: "jbin-hockey",
      name: "The hockey-stick identity",
      intuition:
        "Adding one column of Pascal's triangle gives the entry one row down and one place right: \\(\\binom rr+\\binom{r+1}r+\\dots+\\binom nr=\\binom{n+1}{r+1}\\). So the coefficient of \\(x^r\\) in \\((1+x)^r+(1+x)^{r+1}+\\dots+(1+x)^n\\) is \\(\\binom{n+1}{r+1}\\). A sum that starts later is a difference of two such totals.",
      definition:
        "- \\(\\sum_{k=r}^{n}\\binom kr=\\binom{n+1}{r+1}\\).\n" +
        "- \\(\\sum_{k=m}^{n}\\binom kr=\\binom{n+1}{r+1}-\\binom{m}{r+1}\\).\n" +
        "- \\(\\binom{m+k}{k}=\\binom{m+k}{m}\\): a diagonal sum becomes a column sum.",
      formula: {
        label: "Hockey stick",
        latex: "\\sum_{k=r}^{n}\\binom kr=\\binom{n+1}{r+1}",
      },
      authoredExample: {
        prompt: "Find \\(\\binom{10}{2}+\\binom{11}{2}+\\dots+\\binom{15}{2}\\).",
        steps: [
          "\\(\\binom{16}{3}-\\binom{10}{3}=560-120\\).",
        ],
        answer: "\\(440\\).",
      },
      selfCheckExample: {
        prompt: "Find the coefficient of \\(x^2\\) in \\((1+x)^2+(1+x)^3+\\dots+(1+x)^{8}\\).",
        steps: [
          "\\(\\sum_{k=2}^{8}\\binom k2=\\binom93\\).",
        ],
        answer: "\\(84\\).",
      },
      practiceSet: [
        { prompt: "\\(\\sum_{k=3}^{9}\\binom k3\\)?", answer: "\\(\\binom{10}{4}\\)" },
        { prompt: "\\(\\binom{20}{0}+\\binom{21}{1}+\\dots+\\binom{25}{5}\\)?", answer: "\\(\\binom{26}{5}\\)" },
        { prompt: "\\(\\sum_{k=2}^{n}\\binom k2\\) in closed form?", answer: "\\(\\frac{(n+1)n(n-1)}{6}\\)" },
        { prompt: "\\(\\binom{2}{2}+\\binom32+\\binom42\\)?", answer: "\\(10\\)" },
      ],
      pyqExampleId: "adfe2588-34cd-4ed5-8151-e64f34a32e0a", // 2023 — sum of (45+k)C3 for k = 0..6
      traps: [
        {
          title: "Start the column at the right row",
          body: "The identity needs the sum to start at \\(\\binom rr\\). If it starts at \\(\\binom mr\\) with \\(m>r\\), subtract \\(\\binom m{r+1}\\) — not \\(\\binom{m-1}{r+1}\\) or \\(\\binom{m}{r}\\).",
        },
      ],
    },

    // C2 — geometric series of expansions
    {
      kind: "formula" as const,
      slug: "jbin-geometric",
      name: "Summing a geometric series of expansions",
      intuition:
        "In \\((1+x)^n+x(1+x)^{n-1}+\\dots+x^n\\), each term is the previous one times \\(\\frac{x}{1+x}\\). The geometric-series formula collapses it to \\((1+x)^{n+1}-x^{n+1}\\), and any coefficient is then one binomial coefficient. The same idea with weights, \\(\\sum kt^k\\), uses the arithmetico-geometric sum.",
      definition:
        "- \\(\\sum_{k=0}^{n}x^k(1+x)^{n-k}=(1+x)^{n+1}-x^{n+1}\\).\n" +
        "- \\(\\sum_{k=0}^{n}x^k(a+x)^{n-k}=\\frac{(a+x)^{n+1}-x^{n+1}}{a}\\).\n" +
        "- \\(\\sum_{k=0}^{n-1}(x+3)^{n-1-k}(x+2)^k=(x+3)^n-(x+2)^n\\).\n" +
        "- \\(\\sum_{k=1}^{n}kt^k=\\frac{t\\left(1-(n+1)t^n+nt^{n+1}\\right)}{(1-t)^2}\\).",
      formula: {
        label: "Collapsing the sum",
        latex: "\\sum_{k=0}^{n}x^k(1+x)^{n-k}=(1+x)^{n+1}-x^{n+1}",
      },
      authoredExample: {
        prompt: "Find the coefficient of \\(x^{3}\\) in \\((1+x)^{6}+x(1+x)^{5}+\\dots+x^{6}\\).",
        steps: [
          "The sum is \\((1+x)^7-x^7\\).",
        ],
        answer: "\\(\\binom73=35\\).",
      },
      selfCheckExample: {
        prompt: "Find the sum of all coefficients of \\((x+2)^{3}+(x+2)^2(x+1)+(x+2)(x+1)^2+(x+1)^3\\).",
        steps: [
          "The sum is \\((x+2)^4-(x+1)^4\\); put \\(x=1\\).",
        ],
        answer: "\\(81-16=65\\).",
      },
      practiceSet: [
        { prompt: "Ratio of consecutive terms in \\(\\sum x^k(1+x)^{n-k}\\)?", answer: "\\(\\frac{x}{1+x}\\)" },
        { prompt: "\\(\\frac{a^{n+1}-b^{n+1}}{a-b}\\) with \\(a-b=1\\)?", answer: "\\(a^{n+1}-b^{n+1}\\)" },
        { prompt: "\\([x^{2}]\\,\\left((1+x)^4-x^4\\right)\\)?", answer: "\\(6\\)" },
        { prompt: "\\(\\sum_{k=1}^{3}k2^k\\)?", answer: "\\(34\\)" },
      ],
      pyqExampleId: "cd22ce3f-01b6-44d4-9e55-8ce8c5212d3a", // 2023 — x^301 in (1 + x)^500 + x(1 + x)^499 + ... + x^500
      traps: [
        {
          title: "The top power goes up by one",
          body: "Summing \\(n+1\\) terms produces \\((1+x)^{n+1}\\), not \\((1+x)^n\\). The coefficient of \\(x^r\\) is therefore \\(\\binom{n+1}{r}\\); using \\(\\binom nr\\) is the usual error.",
        },
      ],
    },
  ],
};
