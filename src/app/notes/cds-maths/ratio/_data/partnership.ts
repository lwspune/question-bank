import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_RA_PARTNERSHIP_NOTE: SubtopicNote = {
  subtopicName: "Partnership",
  title: "Partnership",
  oneLineDefinition:
    "Profit is shared in the ratio of capital × time; when capital changes during the year, add up capital × months for each period.",
  whyItMatters:
    "Five PYQs. One rule — capital multiplied by the months it was invested — handles withdrawals, additions and unequal periods. The 'who gets most' versions pair an increasing capital with a decreasing time; the product is largest in the middle.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdsra-capital-time",
      name: "Capital × time",
      intuition:
        "Rs. 100 invested for two months earns the same share as Rs. 200 for one month. So each partner's claim is capital × months, and profit is divided in the ratio of those claims.",
      definition:
        "- Share \\(\\propto\\) capital \\(\\times\\) time.\n" +
        "- If capital changes, add the pieces: Rs. \\(700\\) for \\(3\\) months then Rs. \\(500\\) for \\(9\\) months is \\(700\\times 3 + 500\\times 9\\).\n" +
        "- Capitals in a fractional ratio (\\(\\tfrac13 : \\tfrac14 : \\tfrac15\\)): convert to whole numbers first.\n" +
        "- Capitals \\(1, 2, \\ldots, n\\) with times \\(n, \\ldots, 1\\): the product \\(k(n + 1 - k)\\) is largest in the middle.",
      formula: {
        label: "Profit share",
        latex: "\\text{share} \\propto \\text{capital}\\times\\text{time}",
      },
      authoredExample: {
        prompt: "A invests Rs. 6,000 for the year; B invests Rs. 8,000 but withdraws Rs. 4,000 after 6 months. The profit is Rs. 5,200. Find B's share.",
        steps: [
          "A: \\(6000\\times 12 = 72{,}000\\). B: \\(8000\\times 6 + 4000\\times 6 = 72{,}000\\).",
          "Equal claims, so the profit is shared equally.",
        ],
        answer: "Rs. \\(2{,}600\\).",
      },
      selfCheckExample: {
        prompt: "Three partners invest in the ratio \\(\\tfrac12 : \\tfrac13 : \\tfrac14\\) for the whole year. What fraction of the profit does the first get?",
        steps: ["Multiply by \\(12\\): \\(6 : 4 : 3\\)."],
        answer: "\\(\\dfrac{6}{13}\\).",
      },
      practiceSet: [
        { prompt: "Rs. 4000 for 6 months vs Rs. 3000 for 12 months. Ratio of shares?", answer: "\\(2 : 3\\)" },
        { prompt: "Capitals \\(1 : 2 : 3\\), times \\(3 : 2 : 1\\). Who gets most?", answer: "The second" },
        { prompt: "A: Rs. 500 for 12 months; B: Rs. 1000 for ? months, equal shares.", answer: "\\(6\\) months" },
        { prompt: "Profit Rs. 900 in the ratio \\(4 : 5\\). Larger share?", answer: "Rs. \\(500\\)" },
      ],
      pyqExampleId: "0965d8e8-3a14-4d30-90fc-f75f4d7f8f58", // 2020 (II) — capitals 1/3 : 1/4 : 1/5, first withdraws half
      traps: [
        {
          title: "Count each period separately",
          body:
            "A partner who withdraws part of the capital after four months holds the full amount for four months and the rest for eight. Using the final capital for the whole year understates the share.",
        },
      ],
    },
  ],
};
