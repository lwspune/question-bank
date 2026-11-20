import type { SubtopicNote } from "@/app/notes/_types";

export const SSC2_TW_WORK_NOTE: SubtopicNote = {
  subtopicName: "Work Rates",
  title: "Work Rates",
  oneLineDefinition:
    "Give the job a number of units every worker's time divides, then add daily rates, compare efficiencies, convert men and women into one kind of worker, and run turns cycle by cycle.",
  whyItMatters:
    "18 questions in the Tier II bank, 8 EASY and 10 MODERATE. The MODERATE ones have someone joining, leaving or taking turns, and the units method handles each one the same way.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssc2twwr-units",
      name: "Total work as units",
      visualizationSlug: "ssc-t2-work-units",
      intuition:
        "Give the whole job a number of units that every worker's time divides, usually the LCM of the times. Each worker then does a whole number of units a day, and the rest is plain arithmetic.",
      definition:
        "- Total work \\(=\\) LCM of the separate times.\n" +
        "- A worker's daily units \\(=\\) total \\(\\div\\) that worker's time; workers together add their units.\n" +
        "- Doing a fraction f of the job in d days means the whole job takes \\(d \\div f\\) days.\n" +
        "- Given the pairs A + B, B + C and C + A, add all three to get twice the rate of all three together.\n" +
        "- Someone joins or leaves: work done before \\(+\\) work done after \\(=\\) the whole job.",
      formula: {
        label: "Two workers together",
        latex: "\\text{time together} = \\frac{xy}{x + y} \\text{ for workers taking } x \\text{ and } y \\text{ days}",
      },
      authoredExample: {
        prompt: "A can finish a job in 12 days and B in 18 days. They work together for 4 days, then A leaves. How long does B take to finish the rest?",
        steps: [
          "Take the job as 36 units: A does 3 a day and B does 2.",
          "In 4 days together they do \\(4 \\times 5 = 20\\) units, leaving 16.",
          "B alone: \\(16 \\div 2 = 8\\) days.",
        ],
        answer: "8 days",
      },
      selfCheckExample: {
        prompt: "A and B together take 12 days for a job, B and C 15 days, and C and A 20 days. How long does A alone take?",
        steps: [
          "Take 60 units: A + B do 5 a day, B + C 4, C + A 3.",
          "Adding: twice the total rate is 12, so A + B + C do 6 a day.",
          "A \\(= 6 - 4 = 2\\) a day, so A alone takes 30 days.",
        ],
        answer: "30 days",
      },
      practiceSet: [
        { prompt: "A takes 20 days and B 30 days for a job. How long do they take together?", answer: "12 days" },
        { prompt: "A does \\(\\frac{2}{5}\\) of a job in 8 days. How long does A take for the whole job?", answer: "20 days" },
        { prompt: "A and B together finish a job in 8 days, and A alone in 12 days. How long does B alone take?", answer: "24 days" },
      ],
      pyqExampleId: "03334edd-1e51-422d-b7d6-02b01677fe02",
      traps: [
        {
          title: "Adding the days instead of the rates",
          body: "Workers taking 12 and 18 days do not take 30 days together, or 15. Add their daily units (3 + 2 of 36) to get \\(7\\frac{1}{5}\\) days.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2twwr-efficiency",
      name: "Efficiency and wages",
      intuition:
        "Efficiency is work done per day. If A is 25% more efficient than B, A does 1.25 times B's daily work and so needs B's time divided by 1.25. Wages for a shared job split in the ratio of the work each person did.",
      definition:
        "- A is r% more efficient than B: A's daily work \\(= \\left(1 + \\frac{r}{100}\\right) \\times\\) B's, and A's time \\(=\\) B's time \\(\\div \\left(1 + \\frac{r}{100}\\right)\\).\n" +
        "- Efficiencies in the ratio a : b mean times in the ratio b : a.\n" +
        "- 'A is k times as efficient as B', and together they take T days: B alone takes \\((k + 1)T\\) days.\n" +
        "- Pay for a shared job is split in the ratio of work done (daily rate \\(\\times\\) days worked).",
      formula: {
        label: "Efficiency and time",
        latex: "\\frac{\\text{time}_A}{\\text{time}_B} = \\frac{\\text{efficiency}_B}{\\text{efficiency}_A}",
      },
      authoredExample: {
        prompt: "A takes 24 days for a job, and B is 50% more efficient than A. How long do they take working together?",
        steps: ["B takes \\(24 \\div 1.5 = 16\\) days.", "Together: \\(\\frac{24 \\times 16}{24 + 16} = 9.6\\) days."],
        answer: "9.6 days",
      },
      selfCheckExample: {
        prompt: "A is 3 times as efficient as B, and together they take 15 days. How long does B alone take?",
        steps: ["If B does 1 unit a day, A does 3: together 4 a day, so the job is 60 units.", "B alone: 60 days."],
        answer: "60 days",
      },
      practiceSet: [
        { prompt: "A and B have efficiencies in the ratio 4 : 5. A takes 30 days for a job. How long does B take?", answer: "24 days" },
        { prompt: "A and B earn ₹9,000 for a job, and A does twice as much work each day as B. How much does A get?", answer: "₹6,000" },
        { prompt: "C is 20% less efficient than D, who takes 12 days for a job. How long does C take?", answer: "15 days" },
      ],
      pyqExampleId: "90eb3d07-e70f-4d13-bf78-04082b4a1119",
      traps: [
        {
          title: "Reading '25% more efficient' as '25% less time'",
          body: "25% more efficient divides the time by 1.25, which is 20% less time. 20 days becomes 16, not 15.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2twwr-workers",
      name: "Men, women and man-days",
      intuition:
        "When two groups finish the same job, their total work is equal. Setting the two totals equal tells you how many women one man is worth, and then any group can be written as one kind of worker.",
      definition:
        "- Work \\(=\\) workers \\(\\times\\) days (\\(\\times\\) hours a day).\n" +
        "- Same job by two mixed groups: write each as men and women, set the two totals equal, and read off one man in women.\n" +
        "- Then turn every group into women (or men) and divide the job by the group size.\n" +
        "- For the same job, \\(M_1 D_1 H_1 = M_2 D_2 H_2\\).",
      formula: {
        label: "Same job, different crews",
        latex: "M_1 D_1 H_1 = M_2 D_2 H_2",
      },
      authoredExample: {
        prompt: "2 men and 3 women finish a job in 8 days; 4 men and 2 women finish it in 6 days. How long do 6 women take?",
        steps: [
          "\\(8(2m + 3w) = 6(4m + 2w)\\), so \\(16m + 24w = 24m + 12w\\) and \\(m = 1.5w\\).",
          "The first crew is \\(3w + 3w = 6\\) women, so the job is \\(6 \\times 8 = 48\\) woman-days.",
          "6 women take \\(48 \\div 6 = 8\\) days.",
        ],
        answer: "8 days",
      },
      selfCheckExample: {
        prompt: "Working 8 hours a day, 9 men build a wall in 10 days. How many men, working 6 hours a day, build it in 12 days?",
        steps: ["\\(9 \\times 8 \\times 10 = 720\\) man-hours.", "\\(720 \\div (6 \\times 12) = 10\\) men."],
        answer: "10 men",
      },
      practiceSet: [
        { prompt: "15 men finish a job in 12 days. How many men finish it in 9 days?", answer: "20" },
        { prompt: "One man does the work of 2 women. 4 men and 4 women take 5 days for a job. How long do 6 women take?", answer: "10 days" },
        { prompt: "8 workers take 9 days working 10 hours a day. How many hours a day must 12 workers work to finish in 5 days?", answer: "12 hours" },
      ],
      pyqExampleId: "d8ec5c32-6488-4205-8041-717944689db4",
      traps: [
        {
          title: "Counting men and women as equal workers",
          body: "If one man does the work of 1.5 women, 2 men and 3 women are worth 6 women, not 5 workers. Convert before you add.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2twwr-alternate",
      name: "Working in turns",
      intuition:
        "When workers take turns day by day, find what one full round of turns does, fit in as many whole rounds as you can, and finish the last bit with whoever is next in line.",
      definition:
        "- Units per round \\(=\\) the sum of what each turn does.\n" +
        "- Fit whole rounds without overshooting; then the remainder \\(=\\) total \\(-\\) rounds \\(\\times\\) units per round.\n" +
        "- Finish the remainder turn by turn, in order, using part of a day if needed.\n" +
        "- If someone stops a few days before the end, call the total time T and give each worker T minus their gap.",
      formula: {
        label: "Rounds and the last part",
        latex: "\\text{job} = \\text{whole rounds} \\times \\text{units per round} + \\text{the last part}",
      },
      authoredExample: {
        prompt: "A can do a job in 10 days and B in 15 days. They work on alternate days, A first. In how many days is the job done?",
        steps: [
          "Take 30 units: A does 3 a day, B 2, so each 2-day round does 5.",
          "5 rounds (10 days) do 25 units; day 11 (A) brings it to 28, day 12 (B) to 30.",
        ],
        answer: "12 days",
      },
      selfCheckExample: {
        prompt: "A takes 12 days, B 24 days and C 8 days for a job. They start together, but A stops 2 days before the end and B stops 1 day before the end. How long does the job take?",
        steps: ["Take 24 units: A 2, B 1, C 3 a day.", "\\(2(T - 2) + (T - 1) + 3T = 24\\), so \\(6T = 29\\) and \\(T = 4\\frac{5}{6}\\) days."],
        answer: "\\(4\\frac{5}{6}\\) days",
      },
      practiceSet: [
        { prompt: "P takes 6 days and Q 12 days for a job. They work on alternate days, P first. How long does the job take?", answer: "8 days" },
        { prompt: "A team does 7 units of a 40-unit job in every 2-day round. After how many whole rounds are fewer than 7 units left?", answer: "5 rounds" },
        { prompt: "A worker does 4 units a day and 2 units of the job remain. What part of a day does the worker need?", answer: "Half a day" },
      ],
      pyqExampleId: "abb7d58c-6f43-41ca-a03e-59cbcc4e0469",
      traps: [
        {
          title: "Assuming the job ends at the end of a round",
          body: "After the whole rounds, the next turn may finish the job partway through a round. Step through the remaining turns one at a time.",
        },
      ],
    },
  ],
};
