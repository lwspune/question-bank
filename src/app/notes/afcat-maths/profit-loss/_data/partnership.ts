import type { SubtopicNote } from "@/app/notes/_types";

export const AF_PL_PARTNERSHIP_NOTE: SubtopicNote = {
  subtopicName: "Partnership and Profit Sharing",
  title: "Sharing Profit in a Partnership",
  oneLineDefinition:
    "Partners share profit in the ratio of capital multiplied by time; when everyone invests for the same time, in the ratio of capitals alone.",
  whyItMatters:
    "A small page with no AFCAT past-year question, and each row is the dividing skill of Ratio and Proportion applied to money. The marks go on leaving out the time when partners stay for different months, or when one of them takes out part of his capital midway.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "afpl-capital-ratio",
      name: "Same period: share by capital",
      intuition:
        "If every partner's money is in the business for the same time, each rupee earns the same share, so the profit splits in the ratio of the capitals.",
      definition:
        "- Capitals \\(a : b : c\\) and profit \\(P\\): A's share is \\(\\dfrac{a}{a + b + c} \\times P\\), and so on.\n" +
        "- Given one partner's share, the total is that share \\(\\times\\) (sum of the parts) \\(\\div\\) (that partner's parts).\n" +
        "- 'A's capital is twice B's and three times C's': A = 2B = 3C, so take A as 6, B as 3 and C as 2.\n" +
        "- Money taken off the top (to charity, or a manager's salary) comes out before the split.",
      formula: {
        label: "Share of profit",
        latex: "\\text{share of A} = \\dfrac{a}{a + b + c} \\times P",
      },
      authoredExample: {
        prompt: "A, B and C invest ₹24,000, ₹36,000 and ₹60,000 for a year. The profit is ₹14,000. Find each share.",
        steps: [
          "\\(24000 : 36000 : 60000 = 2 : 3 : 5\\), ten parts in all.",
          "One part is ₹1,400: A gets 2800, B 4200 and C 7000.",
        ],
        answer: "₹2,800, ₹4,200 and ₹7,000.",
      },
      selfCheckExample: {
        prompt: "Profits are shared in the ratio \\(4 : 5 : 6\\), and B gets ₹3,000. Find the total profit.",
        steps: ["5 parts are ₹3,000, so one part is ₹600.", "The total is 15 parts."],
        answer: "₹9,000.",
      },
      practiceSet: [
        { prompt: "A and B invest ₹45,000 and ₹30,000 for the same time. The profit is ₹12,500. Find A's share.", answer: "₹7,500" },
        { prompt: "A's capital is twice B's and four times C's. The profit is ₹21,000. Find C's share.", answer: "₹3,000", method: "A : B : C = 4 : 2 : 1." },
        {
          prompt: "A and B invest in the ratio \\(2 : 3\\). After \\(10\\%\\) of the profit goes to charity, A gets ₹3,600. Find the total profit.",
          answer: "₹10,000",
        },
      ],
      pyqExampleId: "938ae4e3-a9ac-48b6-8853-9dd05ac72f85",
      traps: [
        {
          title: "Take out the deduction first",
          body: "If a share of the profit goes to charity, split only what is left. Applying the partners' ratio to the whole profit overstates every share.",
        },
        {
          title: "Chained equalities need the LCM",
          body: "A = 2B = 3C gives \\(6 : 3 : 2\\), not \\(1 : 2 : 3\\). Give A the LCM of 2 and 3 and divide down.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afpl-capital-time",
      name: "Different periods: capital times time",
      intuition:
        "₹1,000 for 6 months earns the same as ₹500 for 12 months. What earns profit is capital multiplied by the months it stays in.",
      definition:
        "- Shares are in the ratio \\(a\\,t_a : b\\,t_b\\).\n" +
        "- Capital that changes midway: add the pieces, capital \\(\\times\\) months for each stretch.\n" +
        "- Working back: the ratio of times is the profit ratio divided by the capital ratio, term by term.\n" +
        "- Equal profits mean equal products: \\(a\\,t_a = b\\,t_b\\).",
      formula: {
        label: "Capital times time",
        latex: "\\text{A} : \\text{B} = a\\,t_a : b\\,t_b",
      },
      authoredExample: {
        prompt: "A invests ₹30,000 for 10 months and B invests ₹40,000 for 6 months. Their profit is ₹9,000. Find B's share.",
        steps: [
          "\\(30000 \\times 10 : 40000 \\times 6 = 300000 : 240000 = 5 : 4\\).",
          "B gets \\(\\tfrac 49 \\times 9000 = 4000\\).",
        ],
        answer: "₹4,000.",
      },
      selfCheckExample: {
        prompt: "A starts with ₹8,000 and takes out ₹2,000 after 4 months. B puts in ₹6,000 for the whole year. Find the ratio of their profits.",
        steps: [
          "A: \\(8000 \\times 4 + 6000 \\times 8 = 80000\\).",
          "B: \\(6000 \\times 12 = 72000\\).",
        ],
        answer: "\\(10 : 9\\).",
      },
      practiceSet: [
        { prompt: "Capitals are in the ratio \\(3 : 4\\), invested for 8 and 6 months. Find the profit ratio.", answer: "\\(1 : 1\\)" },
        {
          prompt: "A and B invest in the ratio \\(5 : 3\\) and share the profit equally. A's money was in for 6 months. For how long was B's?",
          answer: "10 months",
        },
        { prompt: "Profits are in the ratio \\(2 : 3\\) and the times are 4 and 9 months. Find the ratio of capitals.", answer: "\\(3 : 2\\)" },
      ],
      pyqExampleId: "4fa8ac13-548d-435a-8cfc-3c4c3980ebee",
      traps: [
        {
          title: "Time counts",
          body: "Equal capitals in for 12 and 8 months share the profit \\(3 : 2\\), not equally.",
        },
        {
          title: "A withdrawal splits the period",
          body: "A partner who takes out money midway has two products, one before and one after. Using the starting capital for the whole year overstates his share.",
        },
      ],
    },
  ],
};
