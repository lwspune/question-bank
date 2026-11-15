import type { SubtopicNote } from "@/app/notes/_types";

export const SSC2_IN_SIMPLE_NOTE: SubtopicNote = {
  subtopicName: "Simple Interest",
  title: "Simple Interest",
  oneLineDefinition:
    "Simple interest is the same every year because it is always worked on the original sum: principal times rate times time over 100, used forwards or backwards.",
  whyItMatters:
    "15 questions in the Tier II bank, 12 EASY and 3 MODERATE. The MODERATE ones split a sum in two or count days between dates, and both come down to the same formula.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssc2insi-basics",
      name: "The simple interest formula",
      intuition:
        "Simple interest is the same every year, because it is always worked on the sum first lent. So interest is principal times rate times time over 100, and any one of the four can be found from the other three.",
      definition:
        "- \\(SI = \\frac{P \\times R \\times T}{100}\\); amount \\(= P + SI\\).\n" +
        "- Working back: \\(R = \\frac{100 \\times SI}{P \\times T}\\) and \\(T = \\frac{100 \\times SI}{P \\times R}\\).\n" +
        "- A sum doubles when \\(R \\times T = 100\\) and triples when \\(R \\times T = 200\\).\n" +
        "- Dates: count the days, including either the first day or the last but not both, and divide by 365.\n" +
        "- With the same P and R, the interest is proportional to the time.",
      formula: {
        label: "Simple interest",
        latex: "SI = \\frac{P \\times R \\times T}{100}",
      },
      authoredExample: {
        prompt: "Find the simple interest on ₹15,000 at 9% per annum for 2 years 8 months.",
        steps: ["2 years 8 months is \\(\\frac{8}{3}\\) years.", "\\(SI = \\frac{15000 \\times 9 \\times 8}{100 \\times 3} = 3600\\)."],
        answer: "₹3,600",
      },
      selfCheckExample: {
        prompt: "At what rate per annum does a sum double itself in 8 years at simple interest?",
        steps: ["Doubling means the interest is 100% of the sum.", "\\(R = \\frac{100}{8} = 12.5\\%\\)."],
        answer: "12.5%",
      },
      practiceSet: [
        { prompt: "Find the simple interest on ₹7,500 at 6% per annum for 4 years.", answer: "₹1,800" },
        { prompt: "In how many years will ₹4,000 earn ₹1,200 at 5% per annum simple interest?", answer: "6 years" },
        { prompt: "Find the simple interest on ₹3,650 at 10% per annum from 1 March to 15 May of the same year, counting the last day but not the first.", answer: "₹75", method: "30 + 30 + 15 = 75 days." },
      ],
      pyqExampleId: "86fd73db-c180-413d-9996-0139d00f2109",
      traps: [
        {
          title: "Reading 'triples' as 300% interest",
          body: "A sum that triples has earned twice itself, 200% interest, not 300%. At 8% per annum that takes 25 years, not 37.5.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2insi-amounts",
      name: "Two amounts, changing rates and split sums",
      intuition:
        "When a sum grows to one amount after a few years and to another later, the gap between the two amounts is pure interest for the gap in years. When the rate changes over time, add up rate times years into one total percentage.",
      definition:
        "- Amounts \\(A_1\\) after \\(T_1\\) years and \\(A_2\\) after \\(T_2\\): yearly interest \\(= \\frac{A_2 - A_1}{T_2 - T_1}\\), and \\(P = A_1 - T_1 \\times\\) yearly interest.\n" +
        "- Changing rates: total percentage \\(= R_1T_1 + R_2T_2 + \\cdots\\), and P \\(=\\) SI \\(\\div\\) that total.\n" +
        "- A sum split in two with interests in a given relation: write each interest as a decimal times its part, then compare the parts.\n" +
        "- Same rate and time on two sums: their interests are in the ratio of the sums.",
      formula: {
        label: "From two amounts",
        latex: "\\text{yearly SI} = \\frac{A_2 - A_1}{T_2 - T_1}, \\quad P = A_1 - T_1 \\times \\text{yearly SI}",
      },
      authoredExample: {
        prompt: "A sum amounts to ₹7,440 in 3 years and to ₹8,400 in 5 years at simple interest. Find the sum and the rate.",
        steps: [
          "The 2 extra years earn \\(8400 - 7440 = 960\\), so ₹480 a year.",
          "Sum \\(= 7440 - 3 \\times 480 = 6000\\).",
          "Rate \\(= \\frac{480}{6000} \\times 100 = 8\\%\\).",
        ],
        answer: "₹6,000 at 8%",
      },
      selfCheckExample: {
        prompt: "₹10,000 is split in two. The first part earns 5% and the second 8% simple interest, and together they earn ₹680 in a year. Find the parts.",
        steps: ["\\(0.05x + 0.08(10000 - x) = 680\\), so \\(800 - 0.03x = 680\\).", "\\(x = 4000\\): the parts are ₹4,000 and ₹6,000."],
        answer: "₹4,000 and ₹6,000",
      },
      practiceSet: [
        { prompt: "A sum is lent at 5% for 2 years and then at 6% for 3 more years. The total simple interest is ₹1,400. Find the sum.", answer: "₹5,000", method: "Total 28%." },
        { prompt: "₹6,000 amounts to ₹7,500 in some years at simple interest. What does ₹8,000 amount to in the same time at the same rate?", answer: "₹10,000" },
        { prompt: "Lent at simple interest, a sum grows to ₹2,640 after 2 years and to ₹3,000 after 5 years. What was lent?", answer: "₹2,400" },
      ],
      pyqExampleId: "a3f8f838-73c0-4bb9-8e31-1e6e1204da53",
      traps: [
        {
          title: "Taking the gap between two amounts as the sum",
          body: "The difference between the amounts after 3 and 5 years is two years' interest, not the principal. Divide it by the gap in years first.",
        },
      ],
    },
  ],
};
