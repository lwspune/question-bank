import type { SubtopicNote } from "@/app/notes/_types";

export const SSC2_RA_PARTNERSHIP_NOTE: SubtopicNote = {
  subtopicName: "Partnership",
  title: "Partnership",
  oneLineDefinition:
    "Partners share profit in the ratio of capital times time; when a partner adds, withdraws or leaves partway through, split that partner's year into pieces and add them.",
  whyItMatters:
    "14 questions in the Tier II bank, 8 EASY and 6 MODERATE. The MODERATE ones change a partner's capital during the year, so one product per partner becomes a sum of two.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssc2rapa-capital",
      name: "Profit in the ratio of capital times time",
      intuition:
        "Partners share profit according to how much money each put in and for how long. Multiply each partner's capital by the months it was in the business; those products are the profit ratio.",
      definition:
        "- Profit ratio \\(= C_1 t_1 : C_2 t_2 : C_3 t_3\\).\n" +
        "- Same time for everyone: profits are in the capital ratio. Same capital: profits are in the time ratio.\n" +
        "- Given the profit and capital ratios, time goes as profit \\(\\div\\) capital; given profit and time, capital goes as profit \\(\\div\\) time.\n" +
        "- A salary paid on top of the profit is added after the share is worked out; it is not part of the split.\n" +
        "- '\\(2A = 3B = 5C\\)': set each equal to the LCM, 30, to get \\(A : B : C = 15 : 10 : 6\\).",
      formula: {
        label: "Profit shares",
        latex: "P_1 : P_2 : P_3 = C_1 t_1 : C_2 t_2 : C_3 t_3",
      },
      authoredExample: {
        prompt: "A puts in ₹60,000 for the whole year and B puts in ₹90,000, joining after 6 months. The year's profit is ₹42,000. Find B's share.",
        steps: ["A: \\(60000 \\times 12 = 720000\\); B: \\(90000 \\times 6 = 540000\\).", "Ratio \\(720 : 540 = 4 : 3\\), so B gets \\(\\frac{3}{7} \\times 42000 = 18000\\)."],
        answer: "₹18,000",
      },
      selfCheckExample: {
        prompt: "Capitals are in the ratio 2 : 3 : 4 and profits in the ratio 3 : 4 : 6. Find the ratio of the times.",
        steps: ["Time goes as profit \\(\\div\\) capital: \\(\\frac{3}{2} : \\frac{4}{3} : \\frac{6}{4}\\).", "Multiply by 6: \\(9 : 8 : 9\\)."],
        answer: "9 : 8 : 9",
      },
      practiceSet: [
        { prompt: "If \\(3A = 4B = 6C\\), find \\(A : B : C\\).", answer: "4 : 3 : 2" },
        { prompt: "X and Y invest ₹30,000 and ₹50,000 for a year and earn ₹16,000. Find Y's share.", answer: "₹10,000" },
        { prompt: "P invests for 9 months and Q for 6 months, and their profits are equal. Find the ratio of their capitals.", answer: "2 : 3" },
      ],
      pyqExampleId: "bc09bed8-8bae-4296-85a4-829f76916e49",
      traps: [
        {
          title: "Leaving out the time",
          body: "₹50,000 in the business for 6 months earns the same share as ₹25,000 for 12 months. Multiply every capital by its months before comparing.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2rapa-changes",
      name: "Capital that changes during the year",
      intuition:
        "When a partner adds or takes out money partway through the year, split that partner's year into pieces, multiply each piece's capital by its months, and add the pieces.",
      definition:
        "- A partner's total \\(= C_1 \\times\\) (months before the change) \\(+ C_2 \\times\\) (months after).\n" +
        "- The months must add up to the time that partner was in the business.\n" +
        "- A partner who leaves takes the money out: count only the months before leaving.\n" +
        "- A 50% increase makes the capital 1.5 times; withdrawing a third leaves two thirds.",
      formula: {
        label: "Capital-months with one change",
        latex: "\\text{capital-months} = C_1 m_1 + C_2 m_2",
      },
      authoredExample: {
        prompt: "A and B start with ₹40,000 each. After 3 months A withdraws ₹10,000, and after 6 months B adds ₹20,000. Find the ratio of their profits at the year's end.",
        steps: [
          "A: \\(40000 \\times 3 + 30000 \\times 9 = 390000\\).",
          "B: \\(40000 \\times 6 + 60000 \\times 6 = 600000\\).",
          "Ratio \\(390 : 600 = 13 : 20\\).",
        ],
        answer: "13 : 20",
      },
      selfCheckExample: {
        prompt: "X invests ₹24,000 and Y ₹36,000. After 4 months X doubles his capital. Find their profit ratio for the year.",
        steps: ["X: \\(24 \\times 4 + 48 \\times 8 = 480\\) (thousand rupee-months); Y: \\(36 \\times 12 = 432\\).", "Ratio \\(480 : 432 = 10 : 9\\)."],
        answer: "10 : 9",
      },
      practiceSet: [
        { prompt: "A puts in ₹10,000 and adds ₹5,000 after 6 months; B puts in ₹12,000 for the year. Find A : B.", answer: "25 : 24" },
        { prompt: "C invests ₹50,000 and leaves after 5 months; D invests ₹25,000 for 12 months. Find C : D.", answer: "5 : 6" },
        { prompt: "A capital of ₹30,000 is cut by a third after 6 months. Find its capital-months for the year, in thousands.", answer: "300" },
      ],
      pyqExampleId: "2658d4e3-8d98-4efa-a8a9-33b7ddf8b274",
      traps: [
        {
          title: "Using the final capital for the whole year",
          body: "A partner who starts with ₹40,000 and withdraws ₹10,000 after 3 months had ₹40,000 for 3 months and ₹30,000 for 9. Using ₹30,000 for all 12 months undercounts that partner.",
        },
      ],
    },
  ],
};
