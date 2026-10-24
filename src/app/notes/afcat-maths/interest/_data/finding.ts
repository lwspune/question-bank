import type { SubtopicNote } from "@/app/notes/_types";

export const AF_CI_FINDING_NOTE: SubtopicNote = {
  subtopicName: "Simple Interest: Finding Principal, Rate or Time",
  title: "Finding the Principal or Rate from Two Facts",
  oneLineDefinition:
    "When a sum is given at two different times, or a rate has to be found in one case and used in another, the first step is one year's interest.",
  whyItMatters:
    "Two of AFCAT's past-year questions are here, from 2016 and 2018, and most of the page is MODERATE. Two amounts give one year's interest at once; the slip is taking off the wrong number of years of it to reach the principal.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "afci-two-amounts",
      name: "A sum given at two different times",
      intuition:
        "Between the two dates the principal does not change; only interest is added. So the difference between the two amounts is the interest for the years in between, and dividing gives one year's interest.",
      definition:
        "- One year's interest: \\(I_1 = \\dfrac{A_2 - A_1}{t_2 - t_1}\\).\n" +
        "- Principal: \\(P = A_1 - t_1 \\times I_1\\). Use the earlier amount with its own number of years.\n" +
        "- Rate: \\(R = \\dfrac{I_1}{P} \\times 100\\).\n" +
        "- When will it reach a third amount? (target minus principal) ÷ \\(I_1\\), counted from the start.\n" +
        "- 'After a further 4 years' means the second date is the first date plus 4.",
      formula: {
        label: "One year's interest",
        latex: "I_1 = \\dfrac{A_2 - A_1}{t_2 - t_1}, \\quad P = A_1 - t_1 I_1",
      },
      authoredExample: {
        prompt: "A sum amounts to ₹1,610 in 3 years and to ₹1,750 in 5 years at simple interest. Find the principal and the rate.",
        steps: [
          "Two years' interest is \\(1750 - 1610 = 140\\), so one year's interest is ₹70.",
          "The principal is \\(1610 - 3 \\times 70 = 1400\\).",
          "The rate is \\(\\dfrac{70}{1400} \\times 100 = 5\\%\\).",
        ],
        answer: "₹1,400 at 5% a year.",
      },
      selfCheckExample: {
        prompt:
          "A sum amounts to ₹2,500 in 2 years and to ₹3,250 in 5 years at simple interest. After how many years from the start will it amount to ₹4,000?",
        steps: [
          "\\(3250 - 2500 = 750\\) in 3 years, so ₹250 a year.",
          "The principal is \\(2500 - 2 \\times 250 = 2000\\).",
          "To reach ₹4,000 it needs ₹2,000 of interest: \\(2000 \\div 250 = 8\\).",
        ],
        answer: "8 years.",
      },
      practiceSet: [
        { prompt: "A sum amounts to ₹900 in 2 years and ₹1,000 in 4 years at simple interest. Find the principal.", answer: "₹800" },
        { prompt: "A sum amounts to ₹5,280 in 4 years and ₹5,940 in 7 years at simple interest. Find the rate.", answer: "5%" },
        {
          prompt: "A sum amounts to ₹3,450 after 3 years and to ₹3,850 after a further 2 years at simple interest. Find the sum.",
          answer: "₹2,850",
          method: "The ₹400 is two years' interest.",
        },
      ],
      pyqExampleId: "e569af54-0cee-4d05-8ade-3fb03f8a38cb",
      traps: [
        {
          title: "Take off the right number of years",
          body: "With ₹1,610 after 3 years and ₹70 a year, the principal is \\(1610 - 3 \\times 70 = 1400\\). Taking off only one year's interest, or the years of the later date, gives a wrong principal that is still among the options.",
        },
        {
          title: "'A further' period",
          body: "'₹2,200 after 2 years and ₹2,600 after a further 4 years' puts the second date at year 6. The ₹400 is four years' interest, not six.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afci-carry-rate",
      name: "Find the rate in one case, use it in another",
      intuition:
        "Many questions give one complete case (a sum, its amount and the time) and then ask about another sum or another time 'at the same rate'. Find the rate from the complete case; the second case is then the plain formula.",
      definition:
        "- From the complete case: \\(R = \\dfrac{100\\,(A - P)}{P \\times T}\\).\n" +
        "- Use that rate with the new principal and time.\n" +
        "- 'The rate is doubled' or 'raised by 2%': change the rate you found before using it.\n" +
        "- Two interests said to be equal: work out the one that is fully given, then solve the other for its missing rate, time or principal.",
      formula: {
        label: "Rate from a complete case",
        latex: "R = \\dfrac{100\\,(A - P)}{P \\times T}",
      },
      authoredExample: {
        prompt: "₹2,500 amounts to ₹2,950 in 3 years at simple interest. What will ₹3,500 amount to in 6 years at the same rate?",
        steps: [
          "The interest is ₹450, so \\(R = \\dfrac{100 \\times 450}{2500 \\times 3} = 6\\%\\).",
          "On ₹3,500 for 6 years: \\(3500 \\times 0.06 \\times 6 = 1260\\).",
          "The amount is \\(3500 + 1260\\).",
        ],
        answer: "₹4,760.",
      },
      selfCheckExample: {
        prompt:
          "₹1,600 amounts to ₹1,888 in 3 years at simple interest. If the rate is raised by 2%, what will ₹1,600 amount to in 3 years?",
        steps: [
          "The interest is ₹288, so \\(R = \\dfrac{28800}{1600 \\times 3} = 6\\%\\). The new rate is 8%.",
          "At 8% for 3 years: \\(1600 \\times 0.24 = 384\\).",
        ],
        answer: "₹1,984.",
      },
      practiceSet: [
        {
          prompt: "The simple interest on ₹5,000 at 6% for 3 years equals the simple interest on ₹3,750 for 4 years. Find the second rate.",
          answer: "6%",
        },
        {
          prompt: "₹800 amounts to ₹920 in 3 years at simple interest. In how many years will ₹1,500 amount to ₹1,800 at the same rate?",
          answer: "4 years",
        },
        {
          prompt: "₹3,000 amounts to ₹3,450 in 3 years at simple interest. If the rate were doubled, what would ₹3,000 amount to in the same time?",
          answer: "₹3,900",
        },
      ],
      pyqExampleId: "233b3e15-0a04-4bfe-8c59-d10b1ec2d88d",
      traps: [
        {
          title: "Change the rate, not the amount",
          body: "If the rate is doubled, a rate of 4% becomes 8% and the interest doubles. Doubling the old amount, principal included, is a different and wrong number.",
        },
      ],
    },
  ],
};
