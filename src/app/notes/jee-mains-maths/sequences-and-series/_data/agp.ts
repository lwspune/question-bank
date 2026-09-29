import type { SubtopicNote } from "@/app/notes/_types";

export const AGP_SEQ_NOTE: SubtopicNote = {
  subtopicName: "Arithmetico-Geometric and Exponential Series",
  title: "Arithmetico-Geometric and Exponential Series",
  oneLineDefinition:
    "Series whose terms are a polynomial times a power, summed by multiplying by the ratio and subtracting, and series with factorials or k in the denominator, summed through e and the logarithm series.",
  whyItMatters:
    "Twenty-three PYQs. Two thirds are arithmetico-geometric: numerators in AP, or with differences in AP, over powers of one number. The rest divide by n! or by n and are summed through e or the logarithm series. Three ideas cover the page.",
  concepts: [
    // C1 — AGP by subtraction
    {
      kind: "formula" as const,
      slug: "jseq-agp-sum",
      name: "Multiply by the ratio and subtract",
      intuition:
        "In \\(\\sum\\big(a+(k-1)d\\big)r^{k-1}\\), multiply the whole series by \\(r\\) and subtract it from the original. Matching powers line up, the numerators differ by \\(d\\) every time, and a plain GP is left. For \\(|r|<1\\) the infinite sum is \\(\\frac a{1-r}+\\frac{dr}{(1-r)^2}\\).",
      definition:
        "- \\(S-rS=a+d(r+r^2+\\dots)\\) minus the last term (finite case).\n" +
        "- **Infinite, \\(|r|<1\\):** \\(S=\\frac a{1-r}+\\frac{dr}{(1-r)^2}\\).\n" +
        "- \\(\\sum_{k\\ge1}kx^{k-1}=\\frac1{(1-x)^2}\\); \\(\\sum_{k\\ge1}kx^k=\\frac x{(1-x)^2}\\).\n" +
        "- **Finite:** \\(\\sum_{k=1}^nk\\,2^{k-1}=(n-1)2^n+1\\).",
      formula: {
        label: "Infinite AGP",
        latex: "S_\\infty=\\frac{a}{1-r}+\\frac{dr}{(1-r)^2}",
      },
      authoredExample: {
        prompt: "Find \\(1+\\frac32+\\frac54+\\frac78+\\dots\\).",
        steps: [
          "\\(a=1\\), \\(d=2\\), \\(r=\\frac12\\).",
          "\\(\\frac{1}{1/2}+\\frac{2\\cdot\\frac12}{1/4}=2+4\\).",
        ],
        answer: "\\(6\\).",
      },
      selfCheckExample: {
        prompt: "Find \\(\\sum_{k=1}^{\\infty}\\frac{k}{2^k}\\).",
        steps: [
          "\\(\\frac{x}{(1-x)^2}\\) at \\(x=\\frac12\\): \\(\\frac{1/2}{1/4}\\).",
        ],
        answer: "\\(2\\).",
      },
      practiceSet: [
        { prompt: "\\(\\sum_{k\\ge1}kx^{k-1}\\), \\(|x|<1\\)?", answer: "\\(\\frac1{(1-x)^2}\\)" },
        { prompt: "\\(1+\\frac23+\\frac39+\\dots\\)?", answer: "\\(\\frac94\\)" },
        { prompt: "\\(1+2\\cdot2+3\\cdot4+4\\cdot8+5\\cdot16\\)?", answer: "\\(129\\)" },
        { prompt: "After subtracting \\(rS\\) from \\(S\\), what is left besides the first term?", answer: "A GP with ratio \\(r\\) (and, if finite, a last-term correction)" },
      ],
      pyqExampleId: "0074a59e-6195-4cfe-9bfb-bb35a0870401", // 2022 — 1 + 2·3 + 3·3^2 + ... + 10·3^9
      traps: [
        {
          title: "The finite case has a last term",
          body: "For a finite AGP, the subtraction leaves \\(-\\big(a+(n-1)d\\big)r^n\\) at the end. Dropping it gives the infinite formula, which is wrong here.",
        },
      ],
    },

    // C2 — second-order numerators
    {
      kind: "formula" as const,
      slug: "jseq-agp-second",
      name: "Numerators whose differences are in AP",
      intuition:
        "When the numerators' differences are themselves in AP, as in \\(1,4,8,13,19\\) (differences \\(3,4,5,6\\)), one subtraction gives an arithmetico-geometric series, and a second gives a GP. Numerators \\(k(k+1)\\) or \\(\\frac{k(k+1)}2\\) have closed forms from differentiating the geometric series twice.",
      definition:
        "- **Subtract twice** for a quadratic numerator: \\(S(1-r)^2\\) leaves a GP.\n" +
        "- \\(\\sum_{k\\ge1}\\frac{k(k+1)}2x^{k-1}=\\frac1{(1-x)^3}\\).\n" +
        "- \\(\\sum_{k\\ge1}k(k+1)x^{k-1}=\\frac2{(1-x)^3}\\).\n" +
        "- \\(\\sum_{k\\ge1}k^2x^{k-1}=\\frac{1+x}{(1-x)^3}\\).",
      formula: {
        label: "Quadratic numerators",
        latex: "\\sum_{k\\ge1}k(k+1)\\,x^{k-1}=\\frac{2}{(1-x)^3}",
      },
      authoredExample: {
        prompt: "Find \\(1+3x+6x^2+10x^3+\\dots\\) at \\(x=\\frac12\\).",
        steps: [
          "Triangular numerators: the sum is \\(\\frac1{(1-x)^3}\\).",
          "\\(\\frac{1}{(1/2)^3}\\).",
        ],
        answer: "\\(8\\).",
      },
      selfCheckExample: {
        prompt: "Find \\(1+4x+9x^2+16x^3+\\dots\\) at \\(x=\\frac12\\).",
        steps: [
          "\\(\\frac{1+x}{(1-x)^3}=\\frac{3/2}{1/8}\\).",
        ],
        answer: "\\(12\\).",
      },
      practiceSet: [
        { prompt: "\\(\\sum_{k\\ge1}k(k+1)\\left(\\frac12\\right)^{k-1}\\)?", answer: "\\(16\\)" },
        { prompt: "Differences of \\(1,4,8,13,19\\)?", answer: "\\(3,4,5,6\\)" },
        { prompt: "\\(1+3x+6x^2+\\dots\\) at \\(x=\\frac13\\)?", answer: "\\(\\frac{27}8\\)" },
        { prompt: "Subtractions needed for a quadratic numerator?", answer: "Two" },
      ],
      pyqExampleId: "79a571e9-aa3d-464e-8bb9-a7a5dcb891d3", // 2022 — 2 + 6/7 + 12/7^2 + 20/7^3 + ..., find 4S
      traps: [
        {
          title: "One subtraction is not enough",
          body: "After the first subtraction the numerators are in AP, so it is still an arithmetico-geometric series. Subtract again before using the GP formula.",
        },
      ],
    },

    // C3 — e and log
    {
      kind: "formula" as const,
      slug: "jseq-exp-log",
      name: "Series summed through e and the logarithm series",
      intuition:
        "\\(e=\\sum_{n\\ge0}\\frac1{n!}\\) and \\(\\frac1e=\\sum_{n\\ge0}\\frac{(-1)^n}{n!}\\). For \\(\\sum\\frac{P(n)}{n!}\\), rewrite \\(P(n)\\) in the pieces \\(n(n-1)\\), \\(n\\), \\(1\\): each piece cancels against the factorial and leaves another copy of \\(e\\). Only even or only odd factorials give \\(\\frac12\\left(e\\pm\\frac1e\\right)\\). For \\(n\\) in the denominator use \\(-\\ln(1-x)=x+\\frac{x^2}2+\\frac{x^3}3+\\dots\\); a term like \\(\\frac{k+1}{k}x^k\\) splits into a GP plus this series.",
      definition:
        "- \\(\\sum_{n\\ge0}\\frac{n(n-1)}{n!}=\\sum_{n\\ge0}\\frac{n}{n!}=\\sum_{n\\ge0}\\frac1{n!}=e\\).\n" +
        "- \\(\\sum_{n\\ge0}\\frac1{(2n)!}=\\frac12\\left(e+\\frac1e\\right)\\); \\(\\sum_{n\\ge0}\\frac1{(2n+1)!}=\\frac12\\left(e-\\frac1e\\right)\\).\n" +
        "- \\(\\sum_{n\\ge1}\\frac{x^n}n=-\\ln(1-x)\\), \\(|x|<1\\).",
      formula: {
        label: "The exponential pieces",
        latex: "\\sum_{n\\ge0}\\frac{n(n-1)}{n!}=\\sum_{n\\ge0}\\frac{n}{n!}=e",
      },
      authoredExample: {
        prompt: "Find \\(\\sum_{n=0}^{\\infty}\\frac{n^2+1}{n!}\\).",
        steps: [
          "\\(n^2+1=n(n-1)+n+1\\).",
          "Each piece gives \\(e\\).",
        ],
        answer: "\\(3e\\).",
      },
      selfCheckExample: {
        prompt: "Find \\(x+\\frac{x^2}2+\\frac{x^3}3+\\dots\\) at \\(x=\\frac12\\).",
        steps: [
          "\\(-\\ln\\left(1-\\frac12\\right)\\).",
        ],
        answer: "\\(\\ln2\\).",
      },
      practiceSet: [
        { prompt: "\\(\\sum_{n\\ge0}\\frac{n}{n!}\\)?", answer: "\\(e\\)" },
        { prompt: "\\(\\sum_{n\\ge0}\\frac1{(2n)!}\\)?", answer: "\\(\\frac12\\left(e+\\frac1e\\right)\\)" },
        { prompt: "\\(\\sum_{n\\ge0}\\frac{(-1)^n}{n!}\\)?", answer: "\\(\\frac1e\\)" },
        { prompt: "\\(\\sum_{n\\ge1}\\frac{x^n}n\\) at \\(x=\\frac13\\)?", answer: "\\(\\ln\\frac32\\)" },
      ],
      pyqExampleId: "2b991b0a-5dd4-449a-a9e1-3971d4e6b811", // 2023 — sum of (2n^2 + 3n + 4)/(2n)! from n = 1
      traps: [
        {
          title: "Watch where the sum starts",
          body: "A sum from \\(n=1\\) leaves out the \\(n=0\\) term of the \\(e\\) series. Subtract that term, or the answer is off by a constant.",
        },
      ],
    },
  ],
};
