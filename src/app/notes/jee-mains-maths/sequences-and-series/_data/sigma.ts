import type { SubtopicNote } from "@/app/notes/_types";

export const SIGMA_SEQ_NOTE: SubtopicNote = {
  subtopicName: "Sums by Standard Formulas",
  title: "Sums by Standard Formulas",
  oneLineDefinition:
    "Adding series whose kth term is a polynomial in k: the formulas for Σk, Σk² and Σk³, finding the kth term from differences, and alternating, grouped and greatest-integer sums.",
  whyItMatters:
    "Thirty-four PYQs. Each one adds a series that is not a progression. The work is to find the kth term, from the pattern, from the differences, or from a given sum, and then add it with the three standard formulas. Three ideas cover the page.",
  concepts: [
    // C1 — standard formulas
    {
      kind: "formula" as const,
      slug: "jseq-sigma-formulas",
      name: "Σk, Σk² and Σk³ applied to a polynomial kth term",
      intuition:
        "Write the \\(k\\)th term as a polynomial in \\(k\\), expand, and add each power with its formula. When each term is itself a sum, such as \\(1^2+2^2+\\dots+k^2\\), put in its formula first; it often cancels against the rest of the term.",
      definition:
        "- \\(\\sum_{k=1}^n k=\\frac{n(n+1)}2\\).\n" +
        "- \\(\\sum_{k=1}^n k^2=\\frac{n(n+1)(2n+1)}6\\).\n" +
        "- \\(\\sum_{k=1}^n k^3=\\left[\\frac{n(n+1)}2\\right]^2\\).\n" +
        "- \\(\\sum_{k=1}^n 1=n\\).",
      formula: {
        label: "Sum of cubes",
        latex: "\\sum_{k=1}^{n}k^3=\\left[\\frac{n(n+1)}{2}\\right]^2",
      },
      authoredExample: {
        prompt: "Find \\(\\sum_{k=1}^{10}k(k+1)\\).",
        steps: [
          "\\(\\sum k^2+\\sum k=385+55\\).",
        ],
        answer: "\\(440\\).",
      },
      selfCheckExample: {
        prompt: "Find \\(\\frac{1^3+2^3+\\dots+10^3}{1+2+\\dots+10}\\).",
        steps: [
          "The ratio is \\(\\frac{n(n+1)}2\\) with \\(n=10\\).",
        ],
        answer: "\\(55\\).",
      },
      practiceSet: [
        { prompt: "\\(\\sum_{k=1}^{20}k\\)?", answer: "\\(210\\)" },
        { prompt: "\\(\\sum_{k=1}^{6}k^2\\)?", answer: "\\(91\\)" },
        { prompt: "\\(\\sum_{k=1}^{5}k^3\\)?", answer: "\\(225\\)" },
        { prompt: "\\(\\sum_{k=1}^{10}(2k-1)\\)?", answer: "\\(100\\)" },
      ],
      pyqExampleId: "e72fcb09-a15d-49fa-8903-39f34dde26a1", // 2026 — 1 + (1/2)(1^2 + 2^2) + (1/3)(1^2 + 2^2 + 3^2) + ... to 10 terms
      traps: [
        {
          title: "Sum first, then put in the limit",
          body: "Expand the term in \\(k\\), add over \\(k\\), and only then put in the upper limit. Putting \\(n\\) inside the term too early mixes the running index with the limit.",
        },
      ],
    },

    // C2 — kth term from differences
    {
      kind: "formula" as const,
      slug: "jseq-sigma-differences",
      name: "Finding the kth term from differences or from the sum",
      intuition:
        "When the gaps between terms are themselves in AP (the second differences are constant), the \\(k\\)th term is a quadratic \\(ak^2+bk+c\\); fit it from the first three terms. When the sum \\(S_n\\) is given, the terms are \\(a_n=S_n-S_{n-1}\\). A recurrence such as \\(a_{n+2}-2a_{n+1}+a_n=1\\) says the second differences are constant, so it too gives a quadratic.",
      definition:
        "- **Constant second differences:** \\(T_k=ak^2+bk+c\\), with \\(2a\\) the second difference.\n" +
        "- **Sum given:** \\(a_n=S_n-S_{n-1}\\).\n" +
        "- Fit from three terms, then check against the fourth.",
      formula: {
        label: "Quadratic kth term",
        latex: "T_k=ak^2+bk+c,\\qquad 2a=\\text{second difference}",
      },
      authoredExample: {
        prompt: "Add the first 10 terms of \\(3+7+13+21+\\dots\\).",
        steps: [
          "Differences \\(4,6,8\\): \\(T_k=k^2+k+1\\).",
          "\\(\\sum=385+55+10\\).",
        ],
        answer: "\\(450\\).",
      },
      selfCheckExample: {
        prompt: "\\(S_n=n^3\\). Find \\(a_5\\).",
        steps: [
          "\\(a_n=n^3-(n-1)^3=3n^2-3n+1\\).",
        ],
        answer: "\\(61\\).",
      },
      practiceSet: [
        { prompt: "Next term of \\(2,5,10,17\\)?", answer: "\\(26\\)" },
        { prompt: "\\(k\\)th term of \\(2,5,10,17,\\dots\\)?", answer: "\\(k^2+1\\)" },
        { prompt: "\\(S_n=n^2+2n\\). \\(a_n\\)?", answer: "\\(2n+1\\)" },
        { prompt: "Second difference of \\(3k^2+k\\)?", answer: "\\(6\\)" },
      ],
      pyqExampleId: "3f65f383-18c4-4bca-8173-d6ae0ea3a28e", // 2023 — 5 + 11 + 19 + 29 + 41 + ... to 20 terms
      traps: [
        {
          title: "Check the fourth term",
          body: "Three terms always fit some quadratic. Check the fitted \\(T_k\\) against a fourth term before adding; if it fails, the differences are not in AP.",
        },
      ],
    },

    // C3 — alternating, grouped, floor
    {
      kind: "formula" as const,
      slug: "jseq-sigma-grouped",
      name: "Alternating, grouped and greatest-integer sums",
      intuition:
        "An alternating sum is (all terms) minus twice (the negative ones), or a sum of consecutive pairs. When the \\(k\\)th group holds \\(k\\) numbers, group \\(k\\) ends at \\(1+2+\\dots+k\\); when it holds \\(2k-1\\), it ends at \\(k^2\\). A greatest-integer sum counts how often each value occurs: \\([\\sqrt k]=m\\) for the \\(2m+1\\) values \\(m^2\\le k<(m+1)^2\\). A double sum of \\(\\min\\{i,j\\}\\) counts how many cells hold each value.",
      definition:
        "- **Alternating:** \\(\\sum(-1)^{k+1}t_k=\\sum t_k-2\\sum_{k\\text{ even}}t_k\\).\n" +
        "- \\(1^2-2^2+3^2-\\dots-(2n)^2=-n(2n+1)\\).\n" +
        "- **Groups of size \\(k\\):** group \\(k\\) ends at \\(\\frac{k(k+1)}2\\). **Size \\(2k-1\\):** ends at \\(k^2\\).\n" +
        "- \\([\\sqrt k]=m\\) for \\(2m+1\\) values of \\(k\\).",
      formula: {
        label: "Alternating squares",
        latex: "1^2-2^2+3^2-\\dots-(2n)^2=-n(2n+1)",
      },
      authoredExample: {
        prompt: "Find \\(1^2-2^2+3^2-4^2+\\dots+19^2-20^2\\).",
        steps: [
          "Each pair is \\((2k-1)^2-(2k)^2=-(4k-1)\\).",
          "\\(-\\sum_{k=1}^{10}(4k-1)=-(220-10)\\).",
        ],
        answer: "\\(-210\\).",
      },
      selfCheckExample: {
        prompt: "Find \\([\\sqrt1]+[\\sqrt2]+\\dots+[\\sqrt{15}]\\).",
        steps: [
          "Value 1 three times, 2 five times, 3 seven times (\\(k=9\\) to \\(15\\)).",
          "\\(3+10+21\\).",
        ],
        answer: "\\(34\\).",
      },
      practiceSet: [
        { prompt: "\\(1-2+3-4+\\dots+99-100\\)?", answer: "\\(-50\\)" },
        { prompt: "Groups \\(1\\,|\\,2\\,3\\,|\\,4\\,5\\,6\\,|\\dots\\): first number of group 10?", answer: "\\(46\\)" },
        { prompt: "For how many \\(k\\) is \\([\\sqrt k]=4\\)?", answer: "\\(9\\)" },
        { prompt: "\\(\\sum_{i=1}^3\\sum_{j=1}^3\\min\\{i,j\\}\\)?", answer: "\\(14\\)" },
      ],
      pyqExampleId: "287a8fa8-bab9-4f9e-b633-5a85c919c71d", // 2026 — 1^3 - 2^3 + 3^3 - ... + 15^3
      traps: [
        {
          title: "An odd count leaves one term unpaired",
          body: "Pairing works cleanly only for an even number of terms. With an odd count, pair the rest and add the last term separately.",
        },
      ],
    },
  ],
};
