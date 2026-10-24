import type { SubtopicNote } from "@/app/notes/_types";

export const AF_TW_RATE_NOTE: SubtopicNote = {
  subtopicName: "Work and Efficiency",
  title: "Work as a Rate, and Efficiency",
  oneLineDefinition:
    "Turn every work statement into a rate, the share of the job done in one day or hour, and read efficiency as the opposite of time.",
  whyItMatters:
    "Most of this page is EASY, and two AFCAT past-year questions sit here, from 2018 and 2019. Marks are lost on the direction of a change: 25% more efficient does not mean 25% less time, and a part of the work done in some days has to be scaled up to the whole job before anything else.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "aftw-part-of-work",
      name: "Part of the work in some days",
      intuition:
        "Treat the whole job as 1, or as 100%. If \\(\\tfrac 27\\) of a job takes 6 days, then \\(\\tfrac 17\\) takes 3 days and the whole job takes 21 days. Every later method in this chapter starts from this step: how long the whole job takes, or how much of it is done in one day.",
      definition:
        "- A fraction \\(\\tfrac pq\\) of the work in \\(d\\) days means the whole work takes \\(d \\times \\tfrac qp\\) days.\n" +
        "- The **rate** is the share done in one day: the whole job in \\(T\\) days means \\(\\tfrac 1T\\) of it a day, or \\(\\tfrac{100}{T}\\%\\) a day.\n" +
        "- Work done is rate × time, and the work left is 1 minus the work done.\n" +
        "- To compare people, change each one to the time for the whole job, then compare.",
      formula: {
        label: "Whole job from a part",
        latex: "\\tfrac pq \\text{ of the job in } d \\text{ days} \\;\\Rightarrow\\; T = d \\times \\dfrac qp",
      },
      authoredExample: {
        prompt:
          "A painter finishes \\(\\tfrac 27\\) of a wall in 6 days. How long does the whole wall take, and how many more days does he need?",
        steps: [
          "\\(\\tfrac 17\\) of the wall takes \\(6 \\div 2 = 3\\) days, so the whole wall takes \\(7 \\times 3 = 21\\) days.",
          "He has already worked 6 of those days, so \\(21 - 6 = 15\\) days remain.",
        ],
        answer: "21 days; 15 more days.",
      },
      selfCheckExample: {
        prompt:
          "A pump does 36% of a job in 9 hours. What share of the job does it do in 11 hours, and how long does the whole job take?",
        steps: [
          "Its rate is \\(36 \\div 9 = 4\\%\\) an hour.",
          "In 11 hours it does \\(44\\%\\). The whole job takes \\(100 \\div 4 = 25\\) hours.",
        ],
        answer: "44%; 25 hours.",
      },
      practiceSet: [
        { prompt: "A man builds \\(\\tfrac 38\\) of a fence in 9 days. How long does the whole fence take?", answer: "24 days" },
        { prompt: "A typist types 45% of a report in 9 hours. What percentage does she type in 14 hours?", answer: "70%", method: "5% an hour." },
        { prompt: "A worker completes \\(\\tfrac 49\\) of a job in 8 days. How many more days does he need?", answer: "10 days", method: "The whole job takes 18 days." },
        {
          prompt: "X does \\(\\tfrac 14\\) of a job in 7 days and Y does 40% of it in 10 days. Who takes less time for the whole job?",
          answer: "Y, 25 days against 28",
        },
      ],
      pyqExampleId: "ef7b9f95-5c44-4f29-a21a-03bb681bf2f0",
      traps: [
        {
          title: "Scale the part the right way",
          body: "If \\(\\tfrac 35\\) of a job takes 9 days, the whole job takes \\(9 \\times \\tfrac 53 = 15\\) days, not \\(9 \\times \\tfrac 35\\). The whole job is bigger than the part, so the days must go up.",
        },
        {
          title: "'More days' is what is left",
          body: "When the question asks how many more days, take away the days already worked. A 15-day job that is 9 days in needs 6 more days, not 15.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "aftw-work-in-stages",
      name: "Work done in stages, in percentages",
      intuition:
        "When a job is done in stages, keep one running total of what is left. The catch is the phrase 'of the remaining work': a percentage of what is left is a smaller share of the whole job.",
      definition:
        "- Stages that are shares of the WHOLE job just add: 25%, then 35%, then 15% leaves 25%.\n" +
        "- 'k% of the remaining work' is k% of what is left at that moment. Change it into a share of the whole job before adding.\n" +
        "- A rate in percent a day works stage by stage: days = percentage still to do ÷ percentage a day.",
      formula: {
        label: "A share of the remainder",
        latex: "\\text{done} = \\tfrac{k}{100} \\times (\\text{work left})",
      },
      authoredExample: {
        prompt:
          "A clears 40% of a backlog. B then clears 75% of what is left, and C finishes the rest. What share of the whole backlog did C clear?",
        steps: [
          "After A, \\(60\\%\\) is left.",
          "B clears \\(75\\%\\) of \\(60\\%\\), which is \\(45\\%\\) of the whole.",
          "C clears \\(100 - 40 - 45 = 15\\%\\).",
        ],
        answer: "15%.",
      },
      selfCheckExample: {
        prompt: "A team does 3% of a job a day for 12 days, then 8% a day. How many more days does the job take?",
        steps: ["In 12 days the team does \\(36\\%\\), so \\(64\\%\\) is left.", "At \\(8\\%\\) a day that takes \\(64 \\div 8 = 8\\) days."],
        answer: "8 days.",
      },
      practiceSet: [
        { prompt: "A does 15% of a job and B does 40% of the job. C does the rest. What share does C do?", answer: "45%" },
        { prompt: "P does 70% of a job, then Q does 50% of the remainder. What percentage is still left?", answer: "15%" },
        { prompt: "A machine does 4% of an order an hour for 7 hours, then 9% an hour. How many more hours does it need?", answer: "8 hours" },
      ],
      pyqExampleId: "fc3fbe35-09a9-499d-bd3d-c8c4588103a6",
      traps: [
        {
          title: "Of the remaining work",
          body: "If X does 75% of a job and Y then does 40% of the remaining work, Y has done only 10% of the whole job. 15% is still left, not none.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "aftw-efficiency-time",
      name: "Efficiency and time",
      intuition:
        "Efficiency is the rate at which someone works. For the same job, twice the efficiency means half the time. So time is efficiency turned upside down: efficiencies \\(3 : 4\\) give times \\(4 : 3\\).",
      definition:
        "- Time × efficiency is fixed for a job, so time is **inversely proportional** to efficiency.\n" +
        "- **x% more efficient**: the rate is \\(\\tfrac{100 + x}{100}\\) times as much, so the time is \\(\\tfrac{100}{100 + x}\\) times as much.\n" +
        "- **x% less efficient**: the rate is \\(\\tfrac{100 - x}{100}\\) times, so the time is \\(\\tfrac{100}{100 - x}\\) times.\n" +
        "- Working at a fraction \\(f\\) of normal efficiency stretches the time to \\(\\tfrac 1f\\) times the normal time.\n" +
        "- Efficiencies \\(a : b : c\\) give times \\(\\tfrac 1a : \\tfrac 1b : \\tfrac 1c\\). Clear the fractions with the LCM.\n" +
        "- 'A is k times as efficient as B and takes d days fewer': B takes \\(k\\) parts of time and A 1 part, so the \\(k - 1\\) parts between them are the d days.",
      formula: {
        label: "Time and efficiency",
        latex: "\\dfrac{T_A}{T_B} = \\dfrac{E_B}{E_A}",
      },
      authoredExample: {
        prompt: "B is 25% more efficient than A, and A takes 30 days for a job. How long does B take?",
        steps: [
          "B's rate is \\(\\tfrac{125}{100}\\) of A's, so B's time is \\(\\tfrac{100}{125}\\) of A's.",
          "\\(30 \\times \\tfrac{100}{125} = 24\\) days.",
        ],
        answer: "24 days.",
      },
      selfCheckExample: {
        prompt: "A is 4 times as efficient as B and takes 36 days fewer than B for a job. How long does each take?",
        steps: [
          "B takes 4 parts of time and A 1 part, so the 3 parts between them are 36 days.",
          "One part is 12 days: A takes 12 days and B takes 48.",
        ],
        answer: "A 12 days, B 48 days.",
      },
      practiceSet: [
        { prompt: "A works at \\(\\tfrac 23\\) of his usual efficiency and takes 27 days. How long would he take at full efficiency?", answer: "18 days" },
        { prompt: "B is 20% less efficient than A, who takes 16 days for a job. How long does B take?", answer: "20 days" },
        { prompt: "The efficiencies of P, Q and R are \\(2 : 3 : 4\\). Find the ratio of their times.", answer: "\\(6 : 4 : 3\\)" },
        {
          prompt: "A is 50% more efficient than B, and B is 20% more efficient than C. C takes 36 days for a job. How long does A take?",
          answer: "20 days",
          method: "Rates 1.8 : 1.2 : 1.",
        },
      ],
      pyqExampleId: "37a6f347-9304-49e8-bd8d-2ae12cc772f6",
      traps: [
        {
          title: "More efficient is not the same percentage less time",
          body: "25% more efficient cuts the time to \\(\\tfrac{100}{125}\\) of it, which is 20% less, not 25% less. 50% more efficient cuts the time by a third.",
        },
        {
          title: "The ratio of times turns round",
          body: "Efficiencies \\(2 : 3\\) mean times \\(3 : 2\\). Writing the times as \\(2 : 3\\) gives the slower worker the shorter time.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "aftw-output-rates",
      name: "Output per hour: machines and shifts",
      intuition:
        "Some questions measure work in units made instead of jobs finished. The rate is then units per hour, and everything above still holds: rates add, efficiency scales the rate, and time is output divided by rate.",
      definition:
        "- Rate = units ÷ hours. Output = rate × hours. Time = units ÷ rate.\n" +
        "- An efficiency of \\(p\\%\\) means the rate is \\(p\\%\\) of the standard rate.\n" +
        "- Shifts or machines working at the same time add their outputs.\n" +
        "- When efficiency falls by the same step every day, the daily outputs are evenly spaced: add them as (first + last) ÷ 2 × number of days.",
      formula: {
        label: "Output",
        latex: "\\text{output} = \\text{rate} \\times \\text{time}",
      },
      authoredExample: {
        prompt:
          "A machine makes 90 bolts in 6 hours. A second machine is 40% more efficient. How long does the second machine take to make 252 bolts?",
        steps: [
          "First machine: \\(90 \\div 6 = 15\\) bolts an hour.",
          "Second machine: \\(15 \\times 1.4 = 21\\) bolts an hour.",
          "\\(252 \\div 21 = 12\\) hours.",
        ],
        answer: "12 hours.",
      },
      selfCheckExample: {
        prompt:
          "A plant runs two 12-hour shifts. The standard rate is 40 units an hour, and the shifts work at 90% and 75% efficiency. Find the output for one day.",
        steps: [
          "First shift: \\(12 \\times 40 \\times 0.9 = 432\\) units.",
          "Second shift: \\(12 \\times 40 \\times 0.75 = 360\\) units.",
          "The day's output is \\(432 + 360\\).",
        ],
        answer: "792 units.",
      },
      practiceSet: [
        {
          prompt: "Machine P makes 150 units an hour and machine Q is 40% less efficient. How many units do they make together in 5 hours?",
          answer: "1,200 units",
        },
        {
          prompt: "A unit makes 360 items in a 9-hour day. How many days does it need for 1,440 items if it can work only 6 hours a day?",
          answer: "6 days",
        },
        {
          prompt: "Planned output is 40 units a day, but efficiency falls by 10 points a day, from 100% on day 1. Find the output over 6 days.",
          answer: "180 units",
          method: "The efficiencies add to 450%.",
        },
      ],
      pyqExampleId: "7997b527-4950-4a45-af2b-ec41af8b1489",
      traps: [
        {
          title: "Efficiency scales the rate",
          body: "A machine 25% less efficient than one making 80 units an hour makes 60 an hour. It needs \\(\\tfrac 43\\) of the time, not 25% more time.",
        },
      ],
    },
  ],
};
