import type { SubtopicNote } from "@/app/notes/_types";

export const AF_CI_CHANGES_NOTE: SubtopicNote = {
  subtopicName: "Simple Interest: Changing the Rate, Time or Sum",
  title: "Changing the Rate, Time or Sum, and Splitting a Sum",
  oneLineDefinition:
    "Simple interest is proportional to the principal, the rate and the time, so a change in any of them scales the interest; a difference of two interests gives the sum, and a sum split between two rates is one equation.",
  whyItMatters:
    "Two of AFCAT's past-year questions are here, from 2016 and 2019: a sum that would earn more at a higher rate, and equal sums lent for different times. Each is one percentage of the sum, so nothing needs computing twice. Most of the HARD rows split one sum between two rates.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "afci-si-change",
      name: "Interest scales with the sum, the rate and the time",
      intuition:
        "Double the rate and the interest doubles; lend for 3 years instead of 2 and it grows by half. There is no need to find the principal: scale the interest you know.",
      definition:
        "- Same principal: new interest = old interest × \\(\\dfrac{R_2 T_2}{R_1 T_1}\\).\n" +
        "- A different principal too: multiply by \\(\\dfrac{P_2 R_2 T_2}{P_1 R_1 T_1}\\).\n" +
        "- On a known sum, a change of rate adds \\(P \\times \\dfrac{(R_2 - R_1)\\,T}{100}\\); a change of time works the same way.",
      formula: {
        label: "Scaling the interest",
        latex: "SI_2 = SI_1 \\times \\dfrac{P_2 R_2 T_2}{P_1 R_1 T_1}",
      },
      authoredExample: {
        prompt: "The simple interest on a sum at 5% a year for 4 years is ₹900. Find the interest on the same sum at 7% for 6 years.",
        steps: ["Rate × time goes from \\(5 \\times 4 = 20\\) to \\(7 \\times 6 = 42\\).", "\\(900 \\times \\dfrac{42}{20} = 900 \\times 2.1 = 1890\\)."],
        answer: "₹1,890.",
      },
      selfCheckExample: {
        prompt: "The simple interest on ₹2,000 for 3 years is ₹480. Find the interest on ₹3,500 for 2 years at the same rate.",
        steps: ["Principal × time goes from \\(2000 \\times 3 = 6000\\) to \\(3500 \\times 2 = 7000\\).", "\\(480 \\times \\dfrac{7000}{6000} = 560\\)."],
        answer: "₹560.",
      },
      practiceSet: [
        { prompt: "The simple interest on a sum at 8% for 4 years is ₹1,600. Find it at 10% for 4 years.", answer: "₹2,000" },
        { prompt: "₹5,000 is lent at 4% simple interest for 3 years. How much more would 7% have earned?", answer: "₹450" },
        { prompt: "The simple interest on a sum for 4 years is ₹1,000. Find the interest for 7 years at the same rate.", answer: "₹1,750" },
      ],
      pyqExampleId: "76d80500-d97d-46ac-b88c-e9438f57011d",
      traps: [
        {
          title: "Scale, do not add",
          body: "Raising the rate from 5% to 7% multiplies the interest by \\(\\tfrac75\\). Adding ₹2 to the interest, or 2% of the interest, is not the same thing.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afci-rate-difference",
      name: "A difference of two interests gives the sum",
      intuition:
        "Two interests on the same sum differ by a percentage of the sum: the difference of rate × time. Divide the rupee difference by that percentage and the sum appears.",
      definition:
        "- Same sum and time, rates \\(R_1\\) and \\(R_2\\): the difference is \\(P \\times \\dfrac{(R_2 - R_1)\\,T}{100}\\).\n" +
        "- Same sum and rate, times \\(T_1\\) and \\(T_2\\): the difference is \\(P \\times \\dfrac{R\\,(T_2 - T_1)}{100}\\).\n" +
        "- Different rates and different times: write each interest as a percentage of the sum (8% for 2 years is 16%, 12% for 3 years is 36%) and subtract.\n" +
        "- An unknown difference of rates: \\(R_2 - R_1 = \\dfrac{100 \\times \\text{difference}}{P \\times T}\\).\n" +
        "- Two sums in a ratio: write them as \\(2x\\) and \\(3x\\) and do the same.",
      formula: {
        label: "Sum from a difference",
        latex: "P = \\dfrac{100 \\times \\text{difference}}{(R_2 - R_1)\\,T}",
      },
      authoredExample: {
        prompt: "The simple interest on a sum at 9% a year for 4 years is ₹360 more than at 7% for 4 years. Find the sum.",
        steps: ["The rates differ by 2%, so over 4 years the interests differ by 8% of the sum.", "\\(P = \\dfrac{360}{0.08} = 4500\\)."],
        answer: "₹4,500.",
      },
      selfCheckExample: {
        prompt: "Equal sums are lent at 6% a year simple interest, one for 3 years and the other for 5 years. The interests differ by ₹240. Find each sum.",
        steps: ["Two extra years at 6% is 12% of the sum.", "\\(P = \\dfrac{240}{0.12} = 2000\\)."],
        answer: "₹2,000.",
      },
      practiceSet: [
        { prompt: "The simple interests on a sum at 5% and at 8% for 2 years differ by ₹150. Find the sum.", answer: "₹2,500" },
        { prompt: "₹4,000 is lent for 3 years at two different rates, and the simple interests differ by ₹180. Find the difference of the rates.", answer: "1.5%" },
        {
          prompt: "Two sums in the ratio \\(2 : 3\\) are lent for 2 years at 10% and 5% simple interest. The interests differ by ₹80. Find the larger sum.",
          answer: "₹2,400",
          method: "\\(0.4x - 0.3x = 80\\).",
        },
      ],
      pyqExampleId: "6fd18eb9-e8c3-4dbf-aad2-aa30171b8692",
      traps: [
        {
          title: "Multiply the rate difference by the time",
          body: "Rates of 5% and 8% for 2 years differ by 6% of the sum, not 3%. Forgetting the time doubles the sum you find.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afci-two-parts",
      name: "One sum split between two rates",
      intuition:
        "Call one part \\(x\\); the other is the total minus \\(x\\). The two interests add up to the total given, or are equal, and either way that is one equation in \\(x\\).",
      definition:
        "- Total interest given: \\(x \\cdot \\dfrac{R_1 T_1}{100} + (S - x) \\cdot \\dfrac{R_2 T_2}{100} = I\\).\n" +
        "- Equal interests: \\(x R_1 T_1 = (S - x) R_2 T_2\\), so the parts are in the ratio \\(R_2 T_2 : R_1 T_1\\).\n" +
        "- A quicker way for a total: put the whole sum at the lower rate. The interest falls short, and the shortfall is earned by the part at the higher rate, at the difference of the rates.\n" +
        "- Fractions of an income at different rates: write each part's interest as a share of the whole and add.\n" +
        "- A rate per quarter is made yearly first, as on the first page.",
      formula: {
        label: "Splitting a sum",
        latex: "x \\cdot \\dfrac{R_1 T_1}{100} + (S - x) \\cdot \\dfrac{R_2 T_2}{100} = I",
      },
      authoredExample: {
        prompt: "₹9,000 is lent partly at 6% and partly at 9% simple interest. The total interest for one year is ₹660. Find the part at 6%.",
        steps: [
          "All at 6% would earn ₹540, so ₹120 is short.",
          "The part at 9% earns 3% more, so it is \\(\\dfrac{120}{0.03} = 4000\\).",
          "The part at 6% is \\(9000 - 4000\\). Check: \\(0.06 \\times 5000 + 0.09 \\times 4000 = 300 + 360 = 660\\).",
        ],
        answer: "₹5,000.",
      },
      selfCheckExample: {
        prompt:
          "₹6,200 is split so that the simple interest on the first part at 5% for 3 years equals the interest on the second part at 8% for 2 years. Find the parts.",
        steps: [
          "\\(15x = 16(6200 - x)\\), so the parts are in the ratio \\(16 : 15\\).",
          "31 parts make ₹6,200, so one part is ₹200.",
        ],
        answer: "₹3,200 and ₹3,000.",
      },
      practiceSet: [
        { prompt: "₹5,000 is lent partly at 4% and partly at 6% simple interest. The yearly interest is ₹260. Find the part at 6%.", answer: "₹3,000" },
        {
          prompt: "₹2,100 is split so that the simple interest on the first part at 9% equals that on the second at 6%, for the same time. Find the first part.",
          answer: "₹840",
        },
        {
          prompt: "₹10,000 is lent partly at 10% and the rest at 12% simple interest. The total interest for 2 years is ₹2,200. Find the part at 12%.",
          answer: "₹5,000",
        },
      ],
      pyqExampleId: "0c29722a-6193-46e2-944d-21cc9b48d331",
      traps: [
        {
          title: "Answer the part that is asked",
          body: "If \\(x\\) is the part at the lower rate, the question may ask for the part at the higher rate, \\(S - x\\). Both are among the options.",
        },
        {
          title: "Equal interest means the inverse ratio",
          body: "Equal interest at 12% and at 4% puts more money at the lower rate: the parts at 12% and at 4% are in the ratio \\(4 : 12 = 1 : 3\\), not \\(3 : 1\\).",
        },
      ],
    },
  ],
};
