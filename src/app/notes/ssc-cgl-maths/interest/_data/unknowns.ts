import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_IN_UNKNOWNS_NOTE: SubtopicNote = {
  subtopicName: "Finding the Rate, Time or Principal",
  title: "Finding the Rate, Time or Principal",
  oneLineDefinition:
    "The simple interest formula links four numbers, so any three of them give the fourth: the rate, the time or the principal.",
  whyItMatters:
    "Twenty-eight questions in the bank, the largest page in the chapter, and twenty-five of them are EASY. Most give a sum and an amount and ask for the rate or the years; the rest give two amounts at two times, two equal interests, or a rate tied to the time. Find one year's interest first and most of them take one division.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscinun-rate-time",
      name: "Finding the rate or the time from the interest",
      intuition:
        "One year's interest is a fixed slice of the principal. Once you know the slice, the number of slices in the total interest is the time, and the slice as a percent of the principal is the rate.",
      definition:
        "- First get the interest: \\(SI = A - P\\).\n" +
        "- **Rate:** \\(R = \\frac{100 \\times SI}{P \\times T}\\). **Time:** \\(T = \\frac{100 \\times SI}{P \\times R}\\). **Principal:** \\(P = \\frac{100 \\times SI}{R \\times T}\\).\n" +
        "- **Fast route for time:** one year's interest is \\(R\\%\\) of \\(P\\); time \\(=\\) total interest \\(\\div\\) one year's interest.\n" +
        "- **Same rate, new sum:** find the rate from the first deal, then use it on the second sum and time.\n" +
        "- When the options differ only in a fraction, divide exactly and leave the answer as a mixed number. Do not round.",
      formula: {
        label: "Rate, time and principal",
        latex: "R = \\frac{100 \\times SI}{P \\times T} \\qquad T = \\frac{100 \\times SI}{P \\times R} \\qquad P = \\frac{100 \\times SI}{R \\times T}",
      },
      authoredExample: {
        prompt: "In how many years will ₹6,000 amount to ₹7,260 at 7% per annum simple interest?",
        steps: [
          "Interest \\(= 7260 - 6000 = 1260\\).",
          "One year's interest \\(= 7\\%\\) of 6000 \\(= 420\\).",
          "Time \\(= \\frac{1260}{420} = 3\\) years.",
        ],
        answer: "3 years",
      },
      selfCheckExample: {
        prompt: "At what rate of simple interest does ₹4,800 amount to ₹5,880 in 3 years?",
        steps: [
          "Interest \\(= 5880 - 4800 = 1080\\).",
          "\\(R = \\frac{1080 \\times 100}{4800 \\times 3} = \\frac{108000}{14400} = 7.5\\%\\).",
          "Check: \\(7.5\\%\\) of 4800 is 360 a year, and \\(360 \\times 3 = 1080\\).",
        ],
        answer: "7.5% per annum",
      },
      practiceSet: [
        { prompt: "₹1,500 earns simple interest of ₹450 in 5 years. Find the rate.", answer: "6% per annum" },
        { prompt: "In how many years does ₹2,500 earn ₹600 simple interest at 8% per annum?", answer: "3 years", method: "One year earns 200." },
        {
          prompt: "₹3,000 becomes ₹3,600 in 4 years at simple interest. What will ₹5,000 become in 3 years at the same rate?",
          answer: "₹5,750",
          method: "Rate \\(= \\frac{600 \\times 100}{3000 \\times 4} = 5\\%\\); \\(15\\%\\) of 5000 is 750.",
        },
        { prompt: "What principal earns ₹960 simple interest in 4 years at 6% per annum?", answer: "₹4,000" },
      ],
      pyqExampleId: "81270be9-a6f8-4e7a-a75e-39a52fd093f3",
      traps: [
        {
          title: "Using the amount as the interest",
          body:
            "When a question says a sum becomes or amounts to a figure, that figure includes the principal. Subtract the principal before you divide, or the rate comes out far too large.",
        },
        {
          title: "Rounding the rate too early",
          body:
            "SSC prints rate options that share a whole number and differ only in the fraction, such as \\(10\\frac{2}{63}\\%\\), \\(10\\frac{5}{63}\\%\\), \\(10\\frac{10}{63}\\%\\) and \\(10\\frac{13}{63}\\%\\). Keep the fraction exact to the end; a rounded decimal cannot pick between them.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscinun-two-amounts",
      name: "Two amounts after two different times",
      intuition:
        "Under simple interest the amount climbs by the same step every year. Two amounts at two times show you the step, and stepping back to year 0 gives the principal.",
      definition:
        "- Interest per year \\(= \\frac{A_2 - A_1}{t_2 - t_1}\\), the rise divided by the gap in years.\n" +
        "- Principal \\(= A_1 - t_1 \\times\\) interest per year.\n" +
        "- Rate \\(= \\frac{\\text{interest per year}}{P} \\times 100\\).\n" +
        "- **Fast route for the principal:** \\(P = \\frac{t_2 A_1 - t_1 A_2}{t_2 - t_1}\\), one line with no rate needed.",
      formula: {
        label: "Two amounts at two times",
        latex: "\\text{Interest per year} = \\frac{A_2 - A_1}{t_2 - t_1} \\qquad P = \\frac{t_2 A_1 - t_1 A_2}{t_2 - t_1}",
        symbols: [
          { symbol: "\\(A_1, A_2\\)", meaning: "the amounts after \\(t_1\\) and \\(t_2\\) years" },
          { symbol: "\\(t_1, t_2\\)", meaning: "the two times in years, \\(t_1 < t_2\\)" },
        ],
      },
      authoredExample: {
        prompt: "A sum at simple interest amounts to ₹2,360 in 3 years and to ₹2,600 in 5 years. Find the sum and the rate.",
        steps: [
          "Interest per year \\(= \\frac{2600 - 2360}{5 - 3} = 120\\).",
          "Sum \\(= 2360 - 3 \\times 120 = 2000\\).",
          "Rate \\(= \\frac{120}{2000} \\times 100 = 6\\%\\).",
        ],
        answer: "₹2,000 at 6% per annum",
      },
      selfCheckExample: {
        prompt: "A sum at simple interest becomes ₹5,760 in 2 years and ₹6,720 in 5 years. Find the sum and the rate.",
        steps: [
          "Interest per year \\(= \\frac{6720 - 5760}{3} = 320\\).",
          "Sum \\(= 5760 - 2 \\times 320 = 5120\\). Fast route: \\(\\frac{5 \\times 5760 - 2 \\times 6720}{3} = \\frac{15360}{3} = 5120\\).",
          "Rate \\(= \\frac{320}{5120} \\times 100 = 6.25\\%\\).",
        ],
        answer: "₹5,120 at 6.25% per annum",
      },
      practiceSet: [
        { prompt: "A sum at simple interest amounts to ₹1,120 in 2 years and ₹1,240 in 4 years. Find the sum.", answer: "₹1,000" },
        { prompt: "A sum at simple interest amounts to ₹920 in 3 years and ₹1,000 in 5 years. Find the rate.", answer: "5% per annum" },
        { prompt: "A sum at simple interest gains ₹90 every year and stands at ₹1,170 after 3 years. Find the sum.", answer: "₹900" },
      ],
      pyqExampleId: "d58ed842-790a-462e-b60e-1663bad45fa4",
      traps: [
        {
          title: "Dividing the rise by the later time",
          body:
            "The rise between the two amounts covers only the years between them. From ₹2,240 at 3 years to ₹2,400 at 5 years, one year earns \\(\\frac{160}{2} = 80\\), not \\(\\frac{160}{5}\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscinun-equal",
      name: "Equal simple interest on two sums",
      intuition:
        "Interest depends on principal, rate and time together. Two loans earn the same interest when the product of the three is the same, so a smaller sum needs a higher rate or more years.",
      definition:
        "- Equal interest: \\(\\frac{P_1 R_1 T_1}{100} = \\frac{P_2 R_2 T_2}{100}\\), so \\(P_1 R_1 T_1 = P_2 R_2 T_2\\). The 100s cancel.\n" +
        "- Put in the five known numbers and solve for the sixth.\n" +
        "- **Ratio of the sums:** \\(\\frac{P_1}{P_2} = \\frac{R_2 T_2}{R_1 T_1}\\). The sum with the smaller rate times time is the larger sum.",
      formula: {
        label: "Equal simple interest",
        latex: "P_1 R_1 T_1 = P_2 R_2 T_2",
      },
      authoredExample: {
        prompt: "In how many years will ₹6,000 at 5% per annum earn the same simple interest as ₹4,000 earns in 6 years at 10% per annum?",
        steps: [
          "\\(6000 \\times 5 \\times t = 4000 \\times 10 \\times 6\\).",
          "\\(30000t = 240000\\), so \\(t = 8\\).",
        ],
        answer: "8 years",
      },
      selfCheckExample: {
        prompt: "The simple interest on ₹5,000 at 9% per annum for 4 years equals the simple interest on ₹6,000 for 5 years. Find the rate on ₹6,000.",
        steps: [
          "\\(5000 \\times 9 \\times 4 = 6000 \\times R \\times 5\\).",
          "\\(180000 = 30000R\\), so \\(R = 6\\%\\).",
        ],
        answer: "6% per annum",
      },
      practiceSet: [
        {
          prompt: "₹3,000 at 6% per annum for 4 years and ₹2,400 at 5% per annum earn the same simple interest. For how many years is ₹2,400 lent?",
          answer: "6 years",
        },
        {
          prompt: "The simple interest on ₹A at 5% per annum for 6 years equals that on ₹B at 10% per annum for 2 years. Find A : B.",
          answer: "2 : 3",
          method: "\\(30A = 20B\\).",
        },
        {
          prompt: "₹8,000 for 3 years at 5% per annum and ₹6,000 for 4 years earn equal simple interest. Find the second rate.",
          answer: "5% per annum",
        },
      ],
      pyqExampleId: "347abea1-7669-4738-99e3-31c898fe2c2d",
      traps: [
        {
          title: "Turning the ratio of sums upside down",
          body:
            "For equal interest the sums are in the inverse ratio of rate times time. If one loan runs at rate times time 12 and the other at 24, the first sum is twice the second, not half.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscinun-tied",
      name: "Rate tied to the number of years",
      intuition:
        "When the stem links the rate to the time, there is really only one unknown. Write both with one letter and the formula gives its square.",
      definition:
        "- If the time in years equals the rate percent, \\(SI = \\frac{P \\times R \\times R}{100}\\), so \\(R^2 = \\frac{100 \\times SI}{P}\\).\n" +
        "- If the rate is \\(k\\) times the years (or the years are \\(k\\) times the rate), write both through one letter and solve the square in the same way.\n" +
        "- Take the positive square root, then read the question again: it may ask for the time, not the rate.",
      formula: {
        label: "Rate equal to the years",
        latex: "R^2 = \\frac{100 \\times SI}{P}",
      },
      authoredExample: {
        prompt: "₹2,500 is borrowed at simple interest for as many years as the rate percent. The interest is ₹625. Find the rate.",
        steps: [
          "\\(\\frac{2500 \\times R \\times R}{100} = 25R^2 = 625\\).",
          "\\(R^2 = 25\\), so \\(R = 5\\%\\).",
          "Check: \\(2500 \\times 5\\% \\times 5 = 625\\).",
        ],
        answer: "5% per annum",
      },
      selfCheckExample: {
        prompt: "The rate percent of a loan is twice the number of years. ₹4,000 earns ₹1,280 simple interest. Find the time and the rate.",
        steps: [
          "Let the time be \\(t\\) years; the rate is \\(2t\\%\\).",
          "\\(\\frac{4000 \\times 2t \\times t}{100} = 80t^2 = 1280\\), so \\(t^2 = 16\\) and \\(t = 4\\).",
          "Rate \\(= 8\\%\\). Check: \\(4000 \\times 8\\% \\times 4 = 1280\\).",
        ],
        answer: "4 years at 8% per annum",
      },
      practiceSet: [
        {
          prompt: "₹900 is lent at simple interest for as many years as the rate percent, and earns ₹324. Find the rate.",
          answer: "6% per annum",
          method: "\\(9R^2 = 324\\).",
        },
        {
          prompt: "The years of a loan are half the rate percent. ₹2,000 earns ₹640 simple interest. Find the rate.",
          answer: "8% per annum",
          method: "\\(\\frac{2000 \\times R \\times \\frac{R}{2}}{100} = 10R^2 = 640\\).",
        },
        {
          prompt: "A loan runs for as many years as its rate percent, and the simple interest is 16% of the principal. Find the rate.",
          answer: "4% per annum",
        },
      ],
      pyqExampleId: "a231532f-a3f9-4d79-9ebe-3b457d2997d9",
      traps: [
        {
          title: "Answering the time when the rate is asked",
          body:
            "When the rate is a multiple of the years, the options print both numbers. If the time is four times the rate, a 3% rate means 12 years, and both 3 and 12 sit among the options: check which one the question wants.",
        },
      ],
    },
  ],
};
