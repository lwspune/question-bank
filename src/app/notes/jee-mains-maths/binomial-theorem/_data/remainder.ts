import type { SubtopicNote } from "@/app/notes/_types";

export const REMAINDER_BIN_NOTE: SubtopicNote = {
  subtopicName: "Remainders and Divisibility",
  title: "Remainders and Divisibility",
  oneLineDefinition:
    "Using the binomial theorem to find the remainder of a large power: write the base as a multiple of the divisor plus or minus a small number, and keep only the terms the divisor does not swallow.",
  whyItMatters:
    "Twenty-four PYQs, twelve of them numerical answer, and 2023 alone has ten. Twenty-one ask for a remainder or a count of exponents with a given remainder; three ask what an expression is divisible by. Two ideas cover the page.",
  concepts: [
    // C1 — remainders
    {
      kind: "formula" as const,
      slug: "jbin-remainder",
      name: "Remainders of large powers",
      intuition:
        "Find a power of the base that is close to a multiple of the divisor \\(m\\): \\(a^k=mq\\pm1\\) or \\(mq\\pm c\\). Then \\(a^{kn}=(mq\\pm1)^n\\), and every term of the expansion except the last contains \\(m\\). So the remainder comes from \\((\\pm1)^n\\), times whatever power of \\(a\\) is left over. Remainders repeat in a cycle, and a combined divisor like 35 splits into 5 and 7.",
      definition:
        "- \\((mq+c)^n\\equiv c^n\\pmod m\\).\n" +
        "- Look for \\(a^k\\equiv\\pm1\\): e.g. \\(2^3=8\\equiv1\\pmod7\\), \\(3^2=9\\equiv-1\\pmod{10}\\).\n" +
        "- A negative remainder \\(-r\\) means \\(m-r\\).\n" +
        "- \\((mq+c)^n\\equiv c^n+n\\,c^{n-1}mq\\pmod{m^2}\\): two terms survive modulo \\(m^2\\).",
      formula: {
        label: "Base near a multiple",
        latex: "(mq\\pm1)^n=m(\\dots)+(\\pm1)^n",
      },
      authoredExample: {
        prompt: "Find the remainder when \\(2^{100}\\) is divided by 7.",
        steps: [
          "\\(2^{100}=2\\cdot(2^3)^{33}=2(7+1)^{33}\\equiv2\\cdot1\\).",
        ],
        answer: "\\(2\\).",
      },
      selfCheckExample: {
        prompt: "Find the remainder when \\(3^{51}\\) is divided by 8.",
        steps: [
          "\\(3^{51}=3\\cdot(9)^{25}=3(8+1)^{25}\\equiv3\\).",
        ],
        answer: "\\(3\\).",
      },
      practiceSet: [
        { prompt: "\\(6^{n}\\bmod5\\)?", answer: "\\(1\\)" },
        { prompt: "\\(4^{2k}\\bmod15\\)?", answer: "\\(1\\)" },
        { prompt: "\\(10^{k}\\bmod9\\)?", answer: "\\(1\\)" },
        { prompt: "\\(-3\\) as a remainder modulo 11?", answer: "\\(8\\)" },
      ],
      pyqExampleId: "bbdec9c4-dd73-47ee-8a94-4e0072dadca5", // 2022 — remainder of 3^2022 divided by 5
      traps: [
        {
          title: "Leftover factors",
          body: "If the exponent is not a multiple of the cycle, a factor remains outside the bracket: \\(2^{100}=2\\cdot8^{33}\\). Forgetting that factor gives remainder 1 instead of 2.",
        },
      ],
    },

    // C2 — divisibility
    {
      kind: "formula" as const,
      slug: "jbin-divisible",
      name: "What an expression is divisible by",
      intuition:
        "\\(a^n-b^n\\) is always divisible by \\(a-b\\), and by \\(a+b\\) when \\(n\\) is even. Pair the terms of a four-term expression two ways to find factors. For expressions like \\(9^n-8n-1\\), expand \\((1+8)^n\\): the first two terms cancel the \\(8n+1\\), leaving a multiple of \\(64\\).",
      definition:
        "- \\((a-b)\\mid(a^n-b^n)\\); \\((a+b)\\mid(a^n-b^n)\\) for even \\(n\\).\n" +
        "- \\((1+m)^n-mn-1=\\binom n2m^2+\\binom n3m^3+\\dots\\), divisible by \\(m^2\\).\n" +
        "- To show 'not divisible by \\(d\\)', compute the remainder modulo \\(d\\).",
      formula: {
        label: "Removing the first two terms",
        latex: "(1+m)^n-mn-1=m^2\\left[\\binom n2+\\binom n3m+\\dots\\right]",
      },
      authoredExample: {
        prompt: "Show that \\(4^n-3n-1\\) is divisible by 9.",
        steps: [
          "\\((1+3)^n-3n-1=\\binom n2 9+\\binom n3 27+\\dots\\).",
        ],
        answer: "Every remaining term contains \\(9\\).",
      },
      selfCheckExample: {
        prompt: "Is \\(11^{10}-4^{10}\\) divisible by 7? By 15?",
        steps: [
          "\\(11-4=7\\) divides it; \\(11+4=15\\) divides it since 10 is even.",
        ],
        answer: "Yes to both.",
      },
      practiceSet: [
        { prompt: "\\(a^{n}-b^{n}\\) divisible by?", answer: "\\(a-b\\)" },
        { prompt: "\\(9^{n}-8n-1\\) divisible by?", answer: "\\(64\\)" },
        { prompt: "\\(5^{2n}-1\\) divisible by?", answer: "\\(24\\)" },
        { prompt: "\\(2023^{k}-1999^{k}\\) divisible by?", answer: "\\(24\\)" },
      ],
      pyqExampleId: "fcc339bd-528a-4934-9b75-b8a880d97be1", // 2023 — 25^190 - 19^190 - 8^190 + 2^190
      traps: [
        {
          title: "Pair the terms to match the signs",
          body: "\\(a^n-b^n-c^n+d^n\\) can be grouped as \\((a^n-c^n)-(b^n-d^n)\\) or \\((a^n-b^n)-(c^n-d^n)\\). Each grouping gives a different common factor; try both.",
        },
      ],
    },
  ],
};
