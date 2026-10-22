import type { SubtopicNote } from "@/app/notes/_types";

export const AF_TW_TOGETHER_NOTE: SubtopicNote = {
  subtopicName: "Combined Work",
  title: "Working Together: Adding Rates",
  oneLineDefinition:
    "People working together add their daily rates. Subtract a known rate to find an unknown one, and use pair totals or efficiency ratios when single times are not given.",
  whyItMatters:
    "More AFCAT past-year questions sit on this page than on any other, ten of them, from every year from 2015 to 2019. Rates add but times never do, and most wrong answers come from adding or averaging the days themselves.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "aftw-add-rates",
      name: "Adding rates",
      intuition:
        "In one day A does \\(\\tfrac 1a\\) of the job and B does \\(\\tfrac 1b\\). Working side by side they do both shares every day, so the rates add. The time together is 1 divided by the total rate.",
      definition:
        "- Together: \\(\\tfrac 1T = \\tfrac 1a + \\tfrac 1b\\), so \\(T = \\dfrac{ab}{a + b}\\) for two people.\n" +
        "- Three people: add three rates. The product over sum shortcut is for two people only.\n" +
        "- **LCM units**: call the job the LCM of the times. With times 9 and 18 the job is 18 units; A does 2 a day and B 1, so together 3 a day and 6 days.\n" +
        "- The time together is always less than the fastest person's time alone. An answer above it is wrong.",
      formula: {
        label: "Two people together",
        latex: "T = \\dfrac{ab}{a + b}",
      },
      authoredExample: {
        prompt: "A can do a job in 10 days, B in 15 days and C in 30 days. How long do they take together?",
        steps: [
          "Take the job as 30 units: A does 3 a day, B 2 and C 1.",
          "Together they do 6 units a day, so \\(30 \\div 6 = 5\\) days.",
        ],
        answer: "5 days.",
      },
      selfCheckExample: {
        prompt:
          "P does \\(\\tfrac 14\\) of a job in 5 days and Q does \\(\\tfrac 35\\) of it in 18 days. How long do they take together for the whole job?",
        steps: [
          "P takes \\(5 \\times 4 = 20\\) days for the whole job and Q takes \\(18 \\times \\tfrac 53 = 30\\).",
          "Together \\(\\dfrac{20 \\times 30}{20 + 30} = 12\\) days.",
        ],
        answer: "12 days.",
      },
      practiceSet: [
        { prompt: "A takes 6 days and B 12 days for a job. How long do they take together?", answer: "4 days" },
        { prompt: "A, B and C take 6, 9 and 18 days for a job. How long do they take together?", answer: "3 days" },
        { prompt: "Two workers take 14 and 21 days for a job. How long do they take together?", answer: "8.4 days" },
      ],
      pyqExampleId: "5c10a4f8-7c90-4756-b469-c82c900464a2",
      traps: [
        {
          title: "Never add or average the days",
          body: "A in 10 days and B in 15 days do not take 25 days together, or 12.5. They take \\(\\tfrac{10 \\times 15}{25} = 6\\) days, less than either alone.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "aftw-one-from-joint",
      name: "One person's time from the joint time",
      intuition:
        "If A and B together do \\(\\tfrac 16\\) of a job each day and A alone does \\(\\tfrac 19\\), what is left over is B's share: \\(\\tfrac 16 - \\tfrac 19 = \\tfrac 1{18}\\). Subtracting rates undoes adding them.",
      definition:
        "- B's rate = joint rate minus A's rate: \\(\\tfrac 1b = \\tfrac 1T - \\tfrac 1a\\), so \\(b = \\dfrac{aT}{a - T}\\).\n" +
        "- Three people together take \\(T\\) and two of them take \\(S\\): the third alone does \\(\\tfrac 1T - \\tfrac 1S\\) a day.\n" +
        "- Joint work given as a percentage: 'together they do 45% in 9 days' is 5% a day. Subtract the known person's percentage a day.\n" +
        "- The ratio of the two rates is the efficiency ratio.",
      formula: {
        label: "The other person's time",
        latex: "b = \\dfrac{aT}{a - T}",
      },
      authoredExample: {
        prompt: "A and B together finish a job in 12 days, and A alone takes 18 days. How long does B take alone?",
        steps: [
          "B's rate is \\(\\tfrac 1{12} - \\tfrac 1{18} = \\tfrac{3 - 2}{36} = \\tfrac 1{36}\\).",
          "So B alone takes 36 days.",
        ],
        answer: "36 days.",
      },
      selfCheckExample: {
        prompt:
          "A, B and C together take 4 days for a job, and A and B together take 6 days. How long does C take alone, and how does C's rate compare with that of A and B together?",
        steps: ["C's rate is \\(\\tfrac 14 - \\tfrac 16 = \\tfrac 1{12}\\), so C takes 12 days.", "\\(\\tfrac 1{12}\\) is half of \\(\\tfrac 16\\)."],
        answer: "12 days; half the rate of A and B together.",
      },
      practiceSet: [
        { prompt: "A and B together take 6 days for a job and A alone takes 9 days. How long does B take?", answer: "18 days" },
        { prompt: "A and B together take 14 days and A alone 21 days. How much of the work does B do in a day?", answer: "\\(\\tfrac 1{42}\\)" },
        { prompt: "A father takes 6 days for a job, and 4 days with his son. How long does the son take alone?", answer: "12 days" },
        {
          prompt: "A and B together finish 60% of a job in 6 days, and A alone does 6% of it a day. How long does B take for the whole job?",
          answer: "25 days",
        },
      ],
      pyqExampleId: "94cf24cc-c0a7-455e-b8e7-4ea22b98b330",
      traps: [
        {
          title: "Subtract rates, not days",
          body: "Together 9 days and A alone 12 days does not make B 3 days. B's rate is \\(\\tfrac 19 - \\tfrac 1{12} = \\tfrac 1{36}\\), so B takes 36 days.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "aftw-pair-sums",
      name: "Pairs working together",
      intuition:
        "When only pairs are timed, add the three pair rates. Each person appears in two pairs, so the total is twice the rate of all three together. Halve it, then take away a pair to leave one person.",
      definition:
        "- \\(2(A + B + C) = (A + B) + (B + C) + (C + A)\\), where each letter stands for a daily rate.\n" +
        "- One person alone: \\(A = (A + B + C) - (B + C)\\).\n" +
        "- Two pair rates with a shared member compare the other two: \\((A + B) - (B + C) = A - C\\).",
      formula: {
        label: "All three from the pairs",
        latex: "A + B + C = \\tfrac 12\\left[(A + B) + (B + C) + (C + A)\\right]",
      },
      authoredExample: {
        prompt:
          "A and B take 8 days for a job, B and C take 12 days, and C and A take 8 days. How long do all three take together, and how long does A take alone?",
        steps: [
          "The pair rates add to \\(\\tfrac 18 + \\tfrac 1{12} + \\tfrac 18 = \\tfrac{3 + 2 + 3}{24} = \\tfrac 13\\).",
          "All three together do half of that, \\(\\tfrac 16\\) a day: 6 days.",
          "A alone: \\(\\tfrac 16 - \\tfrac 1{12} = \\tfrac 1{12}\\), so 12 days.",
        ],
        answer: "6 days together; A alone 12 days.",
      },
      selfCheckExample: {
        prompt: "A and B take 12 days, B and C 18 days, and C and A 9 days. How long do all three take together?",
        steps: [
          "\\(\\tfrac 1{12} + \\tfrac 1{18} + \\tfrac 19 = \\tfrac{3 + 2 + 4}{36} = \\tfrac 14\\).",
          "Halve it: \\(\\tfrac 18\\) a day.",
        ],
        answer: "8 days.",
      },
      practiceSet: [
        { prompt: "A and B can do a job in 12 days, B and C in 15 days, and C and A in 20 days. How long does A take alone?", answer: "30 days" },
        {
          prompt: "A and B take 18 days for a job and B and C take 27 days. Who is faster, A or C, and by how much of the job a day?",
          answer: "A, by \\(\\tfrac 1{54}\\) of the job a day",
        },
        {
          prompt: "A and B take 6 days for a job, B and C 8 days, and C and A 12 days. How long do all three take together?",
          answer: "\\(5\\tfrac 13\\) days",
        },
      ],
      pyqExampleId: "286bae44-ca0f-495e-b37d-3e64fd6038e6",
      traps: [
        {
          title: "Halve the total",
          body: "Adding the three pair rates counts everyone twice. For pairs taking 8, 12 and 8 days the sum is \\(\\tfrac 13\\), so all three together take 6 days, not 3.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "aftw-ratio-together",
      name: "Efficiency ratios with a joint time",
      intuition:
        "When you know how much faster one person is and how long they take together, work in units of efficiency. If A is twice as fast as B, give A 2 units a day and B 1. Together that is 3 units a day, and the job is 3 times the joint time in units.",
      definition:
        "- Efficiencies \\(a : b\\) and a joint time \\(T\\): the job is \\((a + b)T\\) units, and A alone takes \\(\\dfrac{(a + b)T}{a}\\) days.\n" +
        "- A does \\(\\tfrac{a}{a + b}\\) of the joint rate.\n" +
        "- 'A takes k times as long as B' means B is k times as efficient as A.\n" +
        "- If a gap in days is given instead of a joint time, use the parts rule from Work and Efficiency first, then add the rates.",
      formula: {
        label: "One person from a ratio",
        latex: "T_A = \\dfrac{(a + b)\\,T}{a}",
      },
      authoredExample: {
        prompt: "A is twice as efficient as B, and together they finish a job in 16 days. How long does each take alone?",
        steps: [
          "Give A 2 units a day and B 1, so together 3 units a day.",
          "The job is \\(3 \\times 16 = 48\\) units.",
          "A takes \\(48 \\div 2 = 24\\) days and B takes \\(48 \\div 1 = 48\\) days.",
        ],
        answer: "A 24 days, B 48 days.",
      },
      selfCheckExample: {
        prompt: "B is 25% more efficient than A. Working together they take 12 days. How long does B take alone?",
        steps: [
          "Efficiencies A : B = 4 : 5, so together 9 units a day.",
          "The job is \\(9 \\times 12 = 108\\) units, and B takes \\(108 \\div 5 = 21.6\\) days.",
        ],
        answer: "21.6 days.",
      },
      practiceSet: [
        { prompt: "A is half as efficient as B. Together they take 10 days. How long does A take alone?", answer: "30 days" },
        {
          prompt: "The efficiencies of A, B and C are \\(2 : 3 : 4\\), and A alone takes 36 days. How long do all three take together?",
          answer: "8 days",
        },
        { prompt: "A takes 50% more time than B. Together they take 18 days. How long does B take alone?", answer: "30 days" },
        {
          prompt: "A is four times as efficient as B and finishes a job 27 days sooner. How long do they take together?",
          answer: "7.2 days",
          method: "A 9 days, B 36 days.",
        },
      ],
      pyqExampleId: "d2158937-4413-4beb-aa2d-a3c181d49a0d",
      traps: [
        {
          title: "Which way the ratio runs",
          body: "'A takes twice as long as B' makes B the faster worker, with efficiencies A : B = 1 : 2. Giving A the 2 units answers for the wrong person.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "aftw-work-in-time",
      name: "Work done in a given time, and each share",
      intuition:
        "Not every question asks for a finishing time. Some ask how much is done after a few days together, or what share of the work, or of the pay, each person earns. Work done is rate × time, and each person's share of the work is their share of the joint rate.",
      definition:
        "- Work done in \\(d\\) days together is \\(d\\left(\\tfrac 1a + \\tfrac 1b\\right)\\), and the work left is 1 minus that.\n" +
        "- Time for part of the job = that part ÷ the joint rate. Two thirds of a job at \\(\\tfrac 19\\) a day takes 6 days.\n" +
        "- When two people do a whole job together, their shares of the work are in the ratio of their rates: times 6 and 12 give shares \\(2 : 1\\).\n" +
        "- **Wages** follow the work done. With different daily wages, the pay is in the ratio of days × daily wage.",
      formula: {
        label: "Work done together",
        latex: "W = d\\left(\\dfrac 1a + \\dfrac 1b\\right)",
      },
      authoredExample: {
        prompt: "A can finish a job in 9 days and B in 18 days. They work together for 4 days. What fraction of the job is left?",
        steps: [
          "Together they do \\(\\tfrac 19 + \\tfrac 1{18} = \\tfrac 3{18} = \\tfrac 16\\) a day.",
          "In 4 days they do \\(\\tfrac 46 = \\tfrac 23\\), so \\(\\tfrac 13\\) is left.",
        ],
        answer: "\\(\\tfrac 13\\).",
      },
      selfCheckExample: {
        prompt: "A takes 10 days and B 15 days for a job. They do it together and are paid ₹6,000. What is A's share?",
        steps: [
          "Their rates are \\(\\tfrac 1{10} : \\tfrac 1{15} = 3 : 2\\), so A does \\(\\tfrac 35\\) of the work.",
          "\\(\\tfrac 35 \\times 6000 = 3600\\).",
        ],
        answer: "₹3,600.",
      },
      practiceSet: [
        { prompt: "P takes 6 hours and Q 12 hours for a job. They work together for 2 hours. What part of the job is done?", answer: "\\(\\tfrac 12\\)" },
        { prompt: "A does 4% of a job a day and B 9%. What percentage do they finish together in 7 days?", answer: "91%" },
        { prompt: "A takes 9 days and B 18 days for a job. Working together, what percentage of the job does B do?", answer: "\\(33\\tfrac 13\\%\\)" },
        {
          prompt:
            "Three workers earn daily wages in the ratio \\(3 : 4 : 6\\) and work for 8, 6 and 2 days. They are paid ₹2,400 in all. How much does the second worker get?",
          answer: "₹960",
          method: "Pay in the ratio \\(24 : 24 : 12\\).",
        },
      ],
      pyqExampleId: "5eba9d4b-862d-4ae8-8a9e-8f5d93d6c7bb",
      traps: [
        {
          title: "Done, or left?",
          body: "After people work for a while, read whether the question asks for the work done or the work left. With \\(\\tfrac 23\\) done, \\(\\tfrac 13\\) is left, and both are usually among the options.",
        },
        {
          title: "Pay follows the work, not the days",
          body: "Two people who work the same number of days at different speeds are not paid equally. Split the money in the ratio of the work each one did.",
        },
      ],
    },
  ],
};
